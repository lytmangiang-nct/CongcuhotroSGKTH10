export interface PythonExecutionResult {
  status: 'success' | 'error' | 'timeout' | 'stopped';
  stdout: string;
  errorType?: string;
  errorMessage?: string;
  errorLine?: number;
  durationMs: number;
  stepsExecuted: number;
}

export interface PythonWorkerHandle {
  promise: Promise<PythonExecutionResult>;
  stop: () => void;
}

/**
 * Self-contained Python-subset VM source string so it can run identically inside
 * an isolated browser Web Worker (via Blob URL) AND in synchronous verification tests.
 */
export const PYTHON_VM_CORE_SOURCE = `
function createPythonError(type, message, line) {
  return { __pyErr: true, type: type, message: message, line: line || 1 };
}

function isPyErr(v) {
  return Boolean(v && typeof v === 'object' && v.__pyErr);
}

function formatPyValue(val, inContainer) {
  if (val === null || val === undefined) return 'None';
  if (val === true) return 'True';
  if (val === false) return 'False';
  if (typeof val === 'number') return String(val);
  if (typeof val === 'string') {
    return inContainer ? "'" + val.replace(/'/g, "\\\\'") + "'" : val;
  }
  if (Array.isArray(val)) {
    return '[' + val.map(function(item) { return formatPyValue(item, true); }).join(', ') + ']';
  }
  if (val && val.__pyType === 'func') {
    return '<function ' + val.name + '>';
  }
  return String(val);
}

function isTruthy(val) {
  if (val === null || val === undefined || val === false || val === 0 || val === '') return false;
  if (Array.isArray(val) && val.length === 0) return false;
  return true;
}

function pyEqual(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; i++) {
      if (!pyEqual(a[i], b[i])) return false;
    }
    return true;
  }
  return a === b;
}

function tokenizeLine(src, lineNum) {
  var tokens = [];
  var i = 0;
  while (i < src.length) {
    var ch = src[i];
    if (ch === ' ' || ch === '\\t' || ch === '\\r') {
      i++;
      continue;
    }
    if (ch === '#') {
      break;
    }
    if (ch === '"' || ch === "'") {
      var quote = ch;
      i++;
      var str = '';
      var closed = false;
      while (i < src.length) {
        if (src[i] === '\\\\' && i + 1 < src.length) {
          var next = src[i + 1];
          if (next === 'n') str += '\\n';
          else if (next === 't') str += '\\t';
          else str += next;
          i += 2;
        } else if (src[i] === quote) {
          closed = true;
          i++;
          break;
        } else {
          str += src[i];
          i++;
        }
      }
      if (!closed) {
        throw createPythonError('SyntaxError', 'Unterminated string literal', lineNum);
      }
      tokens.push({ type: 'STR', value: str });
      continue;
    }
    if ((ch >= '0' && ch <= '9') || (ch === '.' && i + 1 < src.length && src[i + 1] >= '0' && src[i + 1] <= '9')) {
      var numStr = '';
      var hasDot = false;
      while (i < src.length && ((src[i] >= '0' && src[i] <= '9') || (src[i] === '.' && !hasDot))) {
        if (src[i] === '.') hasDot = true;
        numStr += src[i];
        i++;
      }
      tokens.push({ type: 'NUM', value: parseFloat(numStr) });
      continue;
    }
    if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || ch === '_') {
      var id = '';
      while (i < src.length && ((src[i] >= 'a' && src[i] <= 'z') || (src[i] >= 'A' && src[i] <= 'Z') || (src[i] >= '0' && src[i] <= '9') || src[i] === '_')) {
        id += src[i];
        i++;
      }
      if (id === 'True') tokens.push({ type: 'BOOL', value: true });
      else if (id === 'False') tokens.push({ type: 'BOOL', value: false });
      else if (id === 'None') tokens.push({ type: 'NONE', value: null });
      else if (id === 'and' || id === 'or' || id === 'not' || id === 'in') tokens.push({ type: 'OP', value: id });
      else tokens.push({ type: 'ID', value: id });
      continue;
    }
    var two = src.slice(i, i + 2);
    if (two === '//' || two === '**' || two === '==' || two === '!=' || two === '<=' || two === '>=') {
      tokens.push({ type: 'OP', value: two });
      i += 2;
      continue;
    }
    if ('+-*/%<>()[]{},:.='.indexOf(ch) !== -1) {
      tokens.push({ type: 'OP', value: ch });
      i++;
      continue;
    }
    throw createPythonError('SyntaxError', 'Unexpected character: ' + ch, lineNum);
  }
  return tokens;
}

function splitTopLevelCommas(expr) {
  var parts = [];
  var depth = 0;
  var inQuote = null;
  var current = '';
  for (var i = 0; i < expr.length; i++) {
    var ch = expr[i];
    if (inQuote) {
      current += ch;
      if (ch === '\\\\' && i + 1 < expr.length) {
        current += expr[i + 1];
        i++;
      } else if (ch === inQuote) {
        inQuote = null;
      }
    } else {
      if (ch === '"' || ch === "'") {
        inQuote = ch;
        current += ch;
      } else if (ch === '(' || ch === '[' || ch === '{') {
        depth++;
        current += ch;
      } else if (ch === ')' || ch === ']' || ch === '}') {
        depth--;
        current += ch;
      } else if (ch === ',' && depth === 0) {
        parts.push(current.trim());
        current = '';
      } else {
        current += ch;
      }
    }
  }
  if (current.trim().length > 0) parts.push(current.trim());
  return parts;
}

function stripComment(line) {
  var inQuote = null;
  for (var i = 0; i < line.length; i++) {
    var ch = line[i];
    if (inQuote) {
      if (ch === '\\\\') { i++; continue; }
      if (ch === inQuote) inQuote = null;
    } else {
      if (ch === '"' || ch === "'") inQuote = ch;
      else if (ch === '#') return line.slice(0, i);
    }
  }
  return line;
}

function findTopLevelAssign(line) {
  var depth = 0;
  var inQuote = null;
  for (var i = 0; i < line.length; i++) {
    var ch = line[i];
    if (inQuote) {
      if (ch === '\\\\') { i++; continue; }
      if (ch === inQuote) inQuote = null;
    } else {
      if (ch === '"' || ch === "'") inQuote = ch;
      else if (ch === '(' || ch === '[' || ch === '{') depth++;
      else if (ch === ')' || ch === ']' || ch === '}') depth--;
      else if (depth === 0) {
        var two = line.slice(i, i + 2);
        if (two === '+=' || two === '-=' || two === '*=' || two === '/=' || two === '%=') {
          return { op: two, idx: i };
        }
        if (line.slice(i, i + 3) === '//=') {
          return { op: '//=', idx: i };
        }
        if (ch === '=' && line[i + 1] !== '=' && (i === 0 || '!<>='.indexOf(line[i - 1]) === -1)) {
          return { op: '=', idx: i };
        }
      }
    }
  }
  return null;
}

function parseStatements(lines, startIdx, baseIndent) {
  var stmts = [];
  var i = startIdx;
  while (i < lines.length) {
    var raw = lines[i];
    var stripped = stripComment(raw);
    if (stripped.trim() === '') {
      i++;
      continue;
    }
    var indent = raw.search(/\\S/);
    if (indent < baseIndent) break;
    if (indent > baseIndent) {
      throw createPythonError('IndentationError', 'Unexpected indent', i + 1);
    }

    var text = stripped.trim();
    var lineNum = i + 1;

    if (text.startsWith('def ') && text.endsWith(':')) {
      var m = text.match(/^def\\s+([a-zA-Z_][a-zA-Z0-9_]*)\\s*\\((.*)\\)\\s*:$/);
      if (!m) throw createPythonError('SyntaxError', 'Invalid function definition', lineNum);
      var fnName = m[1];
      var params = m[2].trim() ? m[2].split(',').map(function(p) { return p.trim(); }) : [];
      i++;
      while (i < lines.length && stripComment(lines[i]).trim() === '') i++;
      if (i >= lines.length || lines[i].search(/\\S/) <= indent) {
        throw createPythonError('IndentationError', 'Expected an indented block after def', lineNum);
      }
      var fnIndent = lines[i].search(/\\S/);
      var parsedBody = parseStatements(lines, i, fnIndent);
      i = parsedBody.nextIdx;
      stmts.push({ kind: 'def', name: fnName, params: params, body: parsedBody.stmts, line: lineNum });
      continue;
    }

    if (text.startsWith('if ') && text.endsWith(':')) {
      var branches = [];
      var condExpr = text.slice(3, -1).trim();
      i++;
      while (i < lines.length && stripComment(lines[i]).trim() === '') i++;
      if (i >= lines.length || lines[i].search(/\\S/) <= indent) {
        throw createPythonError('IndentationError', 'Expected an indented block after if', lineNum);
      }
      var ifIndent = lines[i].search(/\\S/);
      var resIf = parseStatements(lines, i, ifIndent);
      i = resIf.nextIdx;
      branches.push({ cond: condExpr, body: resIf.stmts, line: lineNum });

      while (i < lines.length) {
        var lookIdx = i;
        while (lookIdx < lines.length && stripComment(lines[lookIdx]).trim() === '') lookIdx++;
        if (lookIdx >= lines.length) break;
        var nextIndent = lines[lookIdx].search(/\\S/);
        if (nextIndent !== indent) break;
        var nextText = stripComment(lines[lookIdx]).trim();
        if (nextText.startsWith('elif ') && nextText.endsWith(':')) {
          var elifCond = nextText.slice(5, -1).trim();
          var elifLine = lookIdx + 1;
          i = lookIdx + 1;
          while (i < lines.length && stripComment(lines[i]).trim() === '') i++;
          if (i >= lines.length || lines[i].search(/\\S/) <= indent) {
            throw createPythonError('IndentationError', 'Expected an indented block after elif', elifLine);
          }
          var elifRes = parseStatements(lines, i, lines[i].search(/\\S/));
          i = elifRes.nextIdx;
          branches.push({ cond: elifCond, body: elifRes.stmts, line: elifLine });
        } else if (nextText === 'else:') {
          var elseLine = lookIdx + 1;
          i = lookIdx + 1;
          while (i < lines.length && stripComment(lines[i]).trim() === '') i++;
          if (i >= lines.length || lines[i].search(/\\S/) <= indent) {
            throw createPythonError('IndentationError', 'Expected an indented block after else', elseLine);
          }
          var elseRes = parseStatements(lines, i, lines[i].search(/\\S/));
          i = elseRes.nextIdx;
          branches.push({ cond: null, body: elseRes.stmts, line: elseLine });
          break;
        } else {
          break;
        }
      }
      stmts.push({ kind: 'if', branches: branches, line: lineNum });
      continue;
    }

    if (text.startsWith('while ') && text.endsWith(':')) {
      var wCond = text.slice(6, -1).trim();
      i++;
      while (i < lines.length && stripComment(lines[i]).trim() === '') i++;
      if (i >= lines.length || lines[i].search(/\\S/) <= indent) {
        throw createPythonError('IndentationError', 'Expected an indented block after while', lineNum);
      }
      var wRes = parseStatements(lines, i, lines[i].search(/\\S/));
      i = wRes.nextIdx;
      stmts.push({ kind: 'while', cond: wCond, body: wRes.stmts, line: lineNum });
      continue;
    }

    if (text.startsWith('for ') && text.endsWith(':')) {
      var fm = text.match(/^for\\s+([a-zA-Z_][a-zA-Z0-9_]*)\\s+in\\s+(.+):$/);
      if (!fm) throw createPythonError('SyntaxError', 'Invalid for-loop syntax', lineNum);
      i++;
      while (i < lines.length && stripComment(lines[i]).trim() === '') i++;
      if (i >= lines.length || lines[i].search(/\\S/) <= indent) {
        throw createPythonError('IndentationError', 'Expected an indented block after for', lineNum);
      }
      var fRes = parseStatements(lines, i, lines[i].search(/\\S/));
      i = fRes.nextIdx;
      stmts.push({ kind: 'for', varName: fm[1], iterExpr: fm[2].trim(), body: fRes.stmts, line: lineNum });
      continue;
    }

    if (text === 'try:') {
      i++;
      while (i < lines.length && stripComment(lines[i]).trim() === '') i++;
      if (i >= lines.length || lines[i].search(/\\S/) <= indent) {
        throw createPythonError('IndentationError', 'Expected an indented block after try', lineNum);
      }
      var tryRes = parseStatements(lines, i, lines[i].search(/\\S/));
      i = tryRes.nextIdx;
      while (i < lines.length && stripComment(lines[i]).trim() === '') i++;
      if (i >= lines.length || lines[i].search(/\\S/) !== indent) {
        throw createPythonError('SyntaxError', 'Expected except block after try', lineNum);
      }
      var excText = stripComment(lines[i]).trim();
      var excMatch = excText.match(/^except(?:\\s+([a-zA-Z_][a-zA-Z0-9_]*))?\\s*:$/);
      if (!excMatch) throw createPythonError('SyntaxError', 'Expected except block', i + 1);
      var catchType = excMatch[1] || null;
      i++;
      while (i < lines.length && stripComment(lines[i]).trim() === '') i++;
      if (i >= lines.length || lines[i].search(/\\S/) <= indent) {
        throw createPythonError('IndentationError', 'Expected an indented block after except', i + 1);
      }
      var excRes = parseStatements(lines, i, lines[i].search(/\\S/));
      i = excRes.nextIdx;
      stmts.push({ kind: 'try', tryBody: tryRes.stmts, catchType: catchType, exceptBody: excRes.stmts, line: lineNum });
      continue;
    }

    if (text.startsWith('global ')) {
      var names = text.slice(7).split(',').map(function(s) { return s.trim(); }).filter(Boolean);
      stmts.push({ kind: 'global', names: names, line: lineNum });
      i++;
      continue;
    }
    if (text === 'break') { stmts.push({ kind: 'break', line: lineNum }); i++; continue; }
    if (text === 'continue') { stmts.push({ kind: 'continue', line: lineNum }); i++; continue; }
    if (text === 'pass') { stmts.push({ kind: 'pass', line: lineNum }); i++; continue; }
    if (text === 'return' || text.startsWith('return ')) {
      stmts.push({ kind: 'return', expr: text === 'return' ? 'None' : text.slice(7).trim(), line: lineNum });
      i++;
      continue;
    }
    if (text.endsWith(':')) {
      throw createPythonError('SyntaxError', 'Unsupported or invalid block header: ' + text, lineNum);
    }

    var assign = findTopLevelAssign(text);
    if (assign) {
      var lhs = text.slice(0, assign.idx).trim();
      var rhs = text.slice(assign.idx + assign.op.length).trim();
      if (!rhs) throw createPythonError('SyntaxError', 'Missing right-hand expression', lineNum);
      stmts.push({ kind: 'assign', op: assign.op, lhs: lhs, rhs: rhs, line: lineNum });
      i++;
      continue;
    }

    stmts.push({ kind: 'expr', expr: text, line: lineNum });
    i++;
  }
  return { stmts: stmts, nextIdx: i };
}

function runPythonProgramCore(code, stdinStr, maxSteps) {
  var startTime = Date.now();
  var stepBudget = typeof maxSteps === 'number' && maxSteps > 0 ? maxSteps : 25000;
  var steps = 0;
  var stdoutLines = [];
  var currentLineBuffer = '';
  var inputLines = String(stdinStr || '').replace(/\\r\\n/g, '\\n').split('\\n');
  var inputCursor = 0;

  function appendOutput(str) {
    currentLineBuffer += str;
    var parts = currentLineBuffer.split('\\n');
    while (parts.length > 1) {
      stdoutLines.push(parts.shift());
    }
    currentLineBuffer = parts[0];
  }

  var globalEnv = { vars: Object.create(null), globalsSet: null, parent: null };

  function lookupVar(env, name, lineNum) {
    if (env.globalsSet && env.globalsSet.has(name)) {
      if (Object.prototype.hasOwnProperty.call(globalEnv.vars, name)) return globalEnv.vars[name];
      throw createPythonError('NameError', "name '" + name + "' is not defined", lineNum);
    }
    if (Object.prototype.hasOwnProperty.call(env.vars, name)) return env.vars[name];
    if (Object.prototype.hasOwnProperty.call(globalEnv.vars, name)) return globalEnv.vars[name];
    throw createPythonError('NameError', "name '" + name + "' is not defined", lineNum);
  }

  function setVar(env, name, val) {
    if (env.globalsSet && env.globalsSet.has(name)) {
      globalEnv.vars[name] = val;
    } else {
      env.vars[name] = val;
    }
  }

  function callBuiltinOrFunc(callee, args, kwargs, env, lineNum) {
    if (callee && callee.__pyType === 'func') {
      if (args.length !== callee.params.length) {
        throw createPythonError('TypeError', callee.name + '() takes ' + callee.params.length + ' positional arguments but ' + args.length + ' were given', lineNum);
      }
      var fnEnv = { vars: Object.create(null), globalsSet: new Set(), parent: globalEnv };
      for (var p = 0; p < callee.params.length; p++) {
        fnEnv.vars[callee.params[p]] = args[p];
      }
      var sig = execBlock(callee.body, fnEnv);
      if (sig && sig.signal === 'return') return sig.value;
      return null;
    }
    if (callee && callee.__pyType === 'method') {
      var target = callee.target;
      var mname = callee.name;
      if (typeof target === 'string') {
        if (mname === 'split') {
          var sep = args.length > 0 ? args[0] : null;
          if (sep === null || sep === undefined) {
            var t = target.trim();
            return t === '' ? [] : t.split(/\\s+/);
          }
          return target.split(String(sep));
        }
        if (mname === 'join') {
          var arr = args[0];
          if (!Array.isArray(arr)) throw createPythonError('TypeError', 'join() expects a list', lineNum);
          return arr.map(function(x) { return String(x); }).join(target);
        }
        if (mname === 'find') {
          return target.indexOf(String(args[0]), args[1] || 0);
        }
        if (mname === 'replace') {
          return target.split(String(args[0])).join(String(args[1]));
        }
        if (mname === 'lower') return target.toLowerCase();
        if (mname === 'upper') return target.toUpperCase();
        if (mname === 'strip') return target.trim();
      }
      if (Array.isArray(target)) {
        if (mname === 'append') { target.push(args[0]); return null; }
        if (mname === 'insert') { target.splice(Number(args[0]), 0, args[1]); return null; }
        if (mname === 'pop') {
          if (target.length === 0) throw createPythonError('IndexError', 'pop from empty list', lineNum);
          if (args.length === 0) return target.pop();
          var pidx = Number(args[0]);
          if (pidx < 0) pidx = target.length + pidx;
          if (pidx < 0 || pidx >= target.length) throw createPythonError('IndexError', 'pop index out of range', lineNum);
          return target.splice(pidx, 1)[0];
        }
        if (mname === 'remove') {
          var idx = target.findIndex(function(item) { return pyEqual(item, args[0]); });
          if (idx === -1) throw createPythonError('ValueError', 'list.remove(x): x not in list', lineNum);
          target.splice(idx, 1);
          return null;
        }
        if (mname === 'clear') { target.length = 0; return null; }
        if (mname === 'sort') { target.sort(function(a, b) { return a < b ? -1 : a > b ? 1 : 0; }); return null; }
        if (mname === 'count') {
          return target.filter(function(item) { return pyEqual(item, args[0]); }).length;
        }
        if (mname === 'index') {
          var fIdx = target.findIndex(function(item) { return pyEqual(item, args[0]); });
          if (fIdx === -1) throw createPythonError('ValueError', 'x is not in list', lineNum);
          return fIdx;
        }
      }
      throw createPythonError('AttributeError', "object has no attribute '" + mname + "'", lineNum);
    }

    if (typeof callee === 'string') {
      if (callee === 'print') {
        var sepVal = kwargs && kwargs.sep !== undefined ? String(kwargs.sep) : ' ';
        var endVal = kwargs && kwargs.end !== undefined ? String(kwargs.end) : '\\n';
        appendOutput(args.map(function(a) { return formatPyValue(a, false); }).join(sepVal) + endVal);
        return null;
      }
      if (callee === 'input') {
        if (args.length > 0) appendOutput(formatPyValue(args[0], false) + '\\n');
        var val = inputCursor < inputLines.length ? inputLines[inputCursor++] : '';
        return val;
      }
      if (callee === 'len') {
        var obj = args[0];
        if (typeof obj === 'string' || Array.isArray(obj)) return obj.length;
        throw createPythonError('TypeError', 'object has no len()', lineNum);
      }
      if (callee === 'int') {
        var rawV = args[0];
        if (typeof rawV === 'boolean') return rawV ? 1 : 0;
        if (typeof rawV === 'number') return Math.trunc(rawV);
        var trimmed = String(rawV).trim();
        if (!/^-?\\d+$/.test(trimmed)) throw createPythonError('ValueError', "invalid literal for int(): '" + trimmed + "'", lineNum);
        return parseInt(trimmed, 10);
      }
      if (callee === 'float') {
        var f = Number(args[0]);
        if (isNaN(f) || String(args[0]).trim() === '') throw createPythonError('ValueError', "could not convert string to float: '" + args[0] + "'", lineNum);
        return f;
      }
      if (callee === 'str') return formatPyValue(args[0], false);
      if (callee === 'bool') return isTruthy(args[0]);
      if (callee === 'abs') return Math.abs(Number(args[0]));
      if (callee === 'round') {
        var digits = args.length > 1 ? Number(args[1]) : 0;
        var factor = Math.pow(10, digits);
        return Math.round(Number(args[0]) * factor) / factor;
      }
      if (callee === 'range') {
        var start = 0, stop = 0, step = 1;
        if (args.length === 1) { stop = Number(args[0]); }
        else if (args.length === 2) { start = Number(args[0]); stop = Number(args[1]); }
        else if (args.length >= 3) { start = Number(args[0]); stop = Number(args[1]); step = Number(args[2]); }
        if (step === 0) throw createPythonError('ValueError', 'range() arg 3 must not be zero', lineNum);
        var arrOut = [];
        for (var r = start; step > 0 ? r < stop : r > stop; r += step) {
          arrOut.push(r);
          if (arrOut.length > 20000) throw createPythonError('MemoryError', 'range() exceeded playground limit', lineNum);
        }
        return arrOut;
      }
      if (callee === 'sum') {
        var listA = args[0];
        if (!Array.isArray(listA)) throw createPythonError('TypeError', 'sum() expects a list', lineNum);
        return listA.reduce(function(acc, cur) { return acc + Number(cur); }, 0);
      }
      if (callee === 'min') {
        var itemsMin = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
        if (itemsMin.length === 0) throw createPythonError('ValueError', 'min() arg is an empty sequence', lineNum);
        return Math.min.apply(null, itemsMin);
      }
      if (callee === 'max') {
        var itemsMax = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
        if (itemsMax.length === 0) throw createPythonError('ValueError', 'max() arg is an empty sequence', lineNum);
        return Math.max.apply(null, itemsMax);
      }
      if (callee === 'ord') {
        var s = String(args[0]);
        if (s.length !== 1) throw createPythonError('TypeError', 'ord() expected a character', lineNum);
        return s.charCodeAt(0);
      }
      if (callee === 'chr') {
        return String.fromCharCode(Number(args[0]));
      }
      if (callee === 'sorted') {
        if (!Array.isArray(args[0])) throw createPythonError('TypeError', 'sorted() expects a list', lineNum);
        return args[0].slice().sort(function(a, b) { return a < b ? -1 : a > b ? 1 : 0; });
      }
      if (callee === 'list') {
        if (args.length === 0) return [];
        if (typeof args[0] === 'string') return args[0].split('');
        if (Array.isArray(args[0])) return args[0].slice();
      }
      if (callee === 'type') {
        var v = args[0];
        if (v === null) return "<class 'NoneType'>";
        if (typeof v === 'boolean') return "<class 'bool'>";
        if (typeof v === 'number') return Number.isInteger(v) ? "<class 'int'>" : "<class 'float'>";
        if (typeof v === 'string') return "<class 'str'>";
        if (Array.isArray(v)) return "<class 'list'>";
      }
    }
    throw createPythonError('TypeError', 'Object is not callable', lineNum);
  }

  var BUILTINS = new Set(['print','input','len','int','float','str','bool','abs','round','range','sum','min','max','ord','chr','sorted','list','type']);

  function evalExpr(exprStr, env, lineNum) {
    var tokens = tokenizeLine(exprStr, lineNum);
    if (tokens.length === 0) return null;
    var pos = 0;

    function peek() { return tokens[pos]; }
    function consume() { return tokens[pos++]; }

    function parseOr() {
      var left = parseAnd();
      while (peek() && peek().type === 'OP' && peek().value === 'or') {
        consume();
        var right = parseAnd();
        left = isTruthy(left) ? left : right;
      }
      return left;
    }

    function parseAnd() {
      var left = parseNot();
      while (peek() && peek().type === 'OP' && peek().value === 'and') {
        consume();
        var right = parseNot();
        left = isTruthy(left) ? right : left;
      }
      return left;
    }

    function parseNot() {
      if (peek() && peek().type === 'OP' && peek().value === 'not') {
        consume();
        return !isTruthy(parseNot());
      }
      return parseCompare();
    }

    function parseCompare() {
      var left = parseAddSub();
      var res = true;
      var matched = false;
      while (peek() && peek().type === 'OP') {
        var op = peek().value;
        if (op === '==' || op === '!=' || op === '<' || op === '<=' || op === '>' || op === '>=' || op === 'in') {
          consume();
          var right = parseAddSub();
          matched = true;
          var ok = false;
          if (op === '==') ok = pyEqual(left, right);
          else if (op === '!=') ok = !pyEqual(left, right);
          else if (op === '<') ok = left < right;
          else if (op === '<=') ok = left <= right;
          else if (op === '>') ok = left > right;
          else if (op === '>=') ok = left >= right;
          else if (op === 'in') {
            if (typeof right === 'string') ok = right.indexOf(String(left)) !== -1;
            else if (Array.isArray(right)) ok = right.some(function(x) { return pyEqual(x, left); });
            else throw createPythonError('TypeError', 'argument is not iterable', lineNum);
          }
          res = res && ok;
          left = right;
        } else if (op === 'not' && tokens[pos + 1] && tokens[pos + 1].value === 'in') {
          consume(); consume();
          var rNotIn = parseAddSub();
          matched = true;
          var found = false;
          if (typeof rNotIn === 'string') found = rNotIn.indexOf(String(left)) !== -1;
          else if (Array.isArray(rNotIn)) found = rNotIn.some(function(x) { return pyEqual(x, left); });
          else throw createPythonError('TypeError', 'argument is not iterable', lineNum);
          res = res && !found;
          left = rNotIn;
        } else {
          break;
        }
      }
      return matched ? res : left;
    }

    function parseAddSub() {
      var left = parseMulDiv();
      while (peek() && peek().type === 'OP' && (peek().value === '+' || peek().value === '-')) {
        var op = consume().value;
        var right = parseMulDiv();
        if (op === '+') {
          if (typeof left === 'number' && typeof right === 'number') left = left + right;
          else if (typeof left === 'string' && typeof right === 'string') left = left + right;
          else if (Array.isArray(left) && Array.isArray(right)) left = left.concat(right);
          else throw createPythonError('TypeError', 'unsupported operand type(s) for +', lineNum);
        } else {
          if (typeof left !== 'number' || typeof right !== 'number') {
            throw createPythonError('TypeError', 'unsupported operand type(s) for -', lineNum);
          }
          left = left - right;
        }
      }
      return left;
    }

    function parseMulDiv() {
      var left = parseUnary();
      while (peek() && peek().type === 'OP' && (peek().value === '*' || peek().value === '/' || peek().value === '//' || peek().value === '%')) {
        var op = consume().value;
        var right = parseUnary();
        if (op === '*') {
          if (typeof left === 'string' && typeof right === 'number') left = left.repeat(Math.max(0, Math.trunc(right)));
          else if (typeof left === 'number' && typeof right === 'string') left = right.repeat(Math.max(0, Math.trunc(left)));
          else if (Array.isArray(left) && typeof right === 'number') {
            var out = [];
            for (var k = 0; k < Math.trunc(right); k++) out = out.concat(left);
            left = out;
          } else left = Number(left) * Number(right);
        } else {
          if (Number(right) === 0) throw createPythonError('ZeroDivisionError', 'division by zero', lineNum);
          if (op === '/') left = Number(left) / Number(right);
          else if (op === '//') left = Math.floor(Number(left) / Number(right));
          else if (op === '%') left = ((Number(left) % Number(right)) + Number(right)) % Number(right);
        }
      }
      return left;
    }

    function parseUnary() {
      if (peek() && peek().type === 'OP' && (peek().value === '-' || peek().value === '+')) {
        var op = consume().value;
        var val = parseUnary();
        return op === '-' ? -Number(val) : +Number(val);
      }
      return parsePower();
    }

    function parsePower() {
      var left = parsePostfix();
      if (peek() && peek().type === 'OP' && peek().value === '**') {
        consume();
        var right = parseUnary();
        return Math.pow(Number(left), Number(right));
      }
      return left;
    }

    function parsePostfix() {
      var val = parsePrimary();
      while (peek() && peek().type === 'OP') {
        if (peek().value === '.') {
          consume();
          var attrTok = consume();
          if (!attrTok || attrTok.type !== 'ID') throw createPythonError('SyntaxError', 'Expected attribute name', lineNum);
          val = { __pyType: 'method', target: val, name: attrTok.value };
        } else if (peek().value === '(') {
          consume();
          var args = [];
          var kwargs = {};
          while (peek() && !(peek().type === 'OP' && peek().value === ')')) {
            if (peek().type === 'ID' && tokens[pos + 1] && tokens[pos + 1].type === 'OP' && tokens[pos + 1].value === '=') {
              var kwName = consume().value;
              consume();
              kwargs[kwName] = parseOr();
            } else {
              args.push(parseOr());
            }
            if (peek() && peek().type === 'OP' && peek().value === ',') consume();
            else break;
          }
          if (!peek() || peek().value !== ')') throw createPythonError('SyntaxError', 'Missing closing parenthesis )', lineNum);
          consume();
          val = callBuiltinOrFunc(val, args, kwargs, env, lineNum);
        } else if (peek().value === '[') {
          consume();
          var isSlice = false;
          var startIdx = null;
          var stopIdx = null;
          var stepVal = null;
          if (!(peek() && peek().type === 'OP' && peek().value === ':')) {
            startIdx = parseOr();
          }
          if (peek() && peek().type === 'OP' && peek().value === ':') {
            isSlice = true;
            consume();
            if (!(peek() && peek().type === 'OP' && (peek().value === ']' || peek().value === ':'))) {
              stopIdx = parseOr();
            }
            if (peek() && peek().type === 'OP' && peek().value === ':') {
              consume();
              if (!(peek() && peek().type === 'OP' && peek().value === ']')) {
                stepVal = parseOr();
              }
            }
          }
          if (!peek() || peek().value !== ']') throw createPythonError('SyntaxError', 'Missing closing bracket ]', lineNum);
          consume();

          if (!Array.isArray(val) && typeof val !== 'string') {
            throw createPythonError('TypeError', 'object is not subscriptable', lineNum);
          }
          var len = val.length;
          if (!isSlice) {
            var idx = Number(startIdx);
            if (idx < 0) idx = len + idx;
            if (idx < 0 || idx >= len || !Number.isInteger(idx)) {
              throw createPythonError('IndexError', 'index out of range', lineNum);
            }
            val = val[idx];
          } else {
            var st = stepVal === null ? 1 : Number(stepVal);
            if (st === 0) throw createPythonError('ValueError', 'slice step cannot be zero', lineNum);
            var sFrom = startIdx === null ? (st > 0 ? 0 : len - 1) : Number(startIdx);
            var sTo = stopIdx === null ? (st > 0 ? len : -len - 1) : Number(stopIdx);
            if (sFrom < 0) sFrom = Math.max(st > 0 ? 0 : -1, len + sFrom);
            if (sTo < 0 && stopIdx !== null) sTo = Math.max(st > 0 ? 0 : -1, len + sTo);
            if (sFrom > len) sFrom = st > 0 ? len : len - 1;
            if (sTo > len) sTo = len;
            var resSeq = [];
            for (var si = sFrom; st > 0 ? si < sTo : si > sTo; si += st) {
              if (si >= 0 && si < len) resSeq.push(val[si]);
            }
            val = typeof val === 'string' ? resSeq.join('') : resSeq;
          }
        } else {
          break;
        }
      }
      return val;
    }

    function parsePrimary() {
      var tok = peek();
      if (!tok) throw createPythonError('SyntaxError', 'Unexpected end of expression', lineNum);
      if (tok.type === 'NUM' || tok.type === 'STR' || tok.type === 'BOOL' || tok.type === 'NONE') {
        consume();
        return tok.value;
      }
      if (tok.type === 'ID') {
        consume();
        if (BUILTINS.has(tok.value) && !(Object.prototype.hasOwnProperty.call(env.vars, tok.value) || Object.prototype.hasOwnProperty.call(globalEnv.vars, tok.value))) {
          return tok.value;
        }
        return lookupVar(env, tok.value, lineNum);
      }
      if (tok.type === 'OP' && tok.value === '(') {
        consume();
        var inner = parseOr();
        if (!peek() || peek().value !== ')') throw createPythonError('SyntaxError', 'Unclosed (', lineNum);
        consume();
        return inner;
      }
      if (tok.type === 'OP' && tok.value === '[') {
        consume();
        var items = [];
        while (peek() && !(peek().type === 'OP' && peek().value === ']')) {
          items.push(parseOr());
          if (peek() && peek().type === 'OP' && peek().value === ',') consume();
          else break;
        }
        if (!peek() || peek().value !== ']') throw createPythonError('SyntaxError', 'Unclosed [', lineNum);
        consume();
        return items;
      }
      throw createPythonError('SyntaxError', 'Invalid syntax near ' + tok.value, lineNum);
    }

    var res = parseOr();
    if (pos < tokens.length) {
      throw createPythonError('SyntaxError', 'Unexpected token: ' + tokens[pos].value, lineNum);
    }
    return res;
  }

  function execBlock(stmts, env) {
    for (var idx = 0; idx < stmts.length; idx++) {
      var s = stmts[idx];
      steps++;
      if (steps > stepBudget) {
        throw createPythonError('TimeoutError', 'Exceeded maximum execution steps (' + stepBudget + ') — possible infinite loop', s.line);
      }
      if (s.kind === 'pass') continue;
      if (s.kind === 'break') return { signal: 'break' };
      if (s.kind === 'continue') return { signal: 'continue' };
      if (s.kind === 'return') {
        return { signal: 'return', value: evalExpr(s.expr, env, s.line) };
      }
      if (s.kind === 'global') {
        if (!env.globalsSet) env.globalsSet = new Set();
        for (var g = 0; g < s.names.length; g++) env.globalsSet.add(s.names[g]);
        continue;
      }
      if (s.kind === 'def') {
        var fnObj = { __pyType: 'func', name: s.name, params: s.params, body: s.body };
        setVar(env, s.name, fnObj);
        continue;
      }
      if (s.kind === 'expr') {
        evalExpr(s.expr, env, s.line);
        continue;
      }
      if (s.kind === 'assign') {
        if (s.op === '=') {
          var lhsParts = splitTopLevelCommas(s.lhs);
          if (lhsParts.length > 1) {
            var rhsParts = splitTopLevelCommas(s.rhs);
            var vals = rhsParts.length > 1
              ? rhsParts.map(function(re) { return evalExpr(re, env, s.line); })
              : evalExpr(s.rhs, env, s.line);
            if (!Array.isArray(vals) || vals.length !== lhsParts.length) {
              throw createPythonError('ValueError', 'Cannot unpack values', s.line);
            }
            for (var u = 0; u < lhsParts.length; u++) {
              setVar(env, lhsParts[u], vals[u]);
            }
          } else {
            var idxMatch = s.lhs.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\\[(.+)\\]$/);
            var rhsVal = evalExpr(s.rhs, env, s.line);
            if (idxMatch) {
              var arrObj = lookupVar(env, idxMatch[1], s.line);
              var arrIdx = Number(evalExpr(idxMatch[2], env, s.line));
              if (!Array.isArray(arrObj)) throw createPythonError('TypeError', 'object does not support item assignment', s.line);
              if (arrIdx < 0) arrIdx = arrObj.length + arrIdx;
              if (arrIdx < 0 || arrIdx >= arrObj.length) throw createPythonError('IndexError', 'list assignment index out of range', s.line);
              arrObj[arrIdx] = rhsVal;
            } else {
              setVar(env, s.lhs, rhsVal);
            }
          }
        } else {
          var cur = lookupVar(env, s.lhs, s.line);
          var delta = evalExpr(s.rhs, env, s.line);
          if (s.op === '+=') setVar(env, s.lhs, cur + delta);
          else if (s.op === '-=') setVar(env, s.lhs, cur - delta);
          else if (s.op === '*=') setVar(env, s.lhs, cur * delta);
          else if (s.op === '/=') {
            if (Number(delta) === 0) throw createPythonError('ZeroDivisionError', 'division by zero', s.line);
            setVar(env, s.lhs, cur / delta);
          } else if (s.op === '//=') {
            if (Number(delta) === 0) throw createPythonError('ZeroDivisionError', 'division by zero', s.line);
            setVar(env, s.lhs, Math.floor(cur / delta));
          } else if (s.op === '%=') {
            if (Number(delta) === 0) throw createPythonError('ZeroDivisionError', 'division by zero', s.line);
            setVar(env, s.lhs, ((cur % delta) + delta) % delta);
          }
        }
        continue;
      }
      if (s.kind === 'if') {
        for (var b = 0; b < s.branches.length; b++) {
          var br = s.branches[b];
          if (br.cond === null || isTruthy(evalExpr(br.cond, env, br.line))) {
            var ifSig = execBlock(br.body, env);
            if (ifSig) return ifSig;
            break;
          }
        }
        continue;
      }
      if (s.kind === 'while') {
        while (isTruthy(evalExpr(s.cond, env, s.line))) {
          steps++;
          if (steps > stepBudget) {
            throw createPythonError('TimeoutError', 'Exceeded maximum execution steps (' + stepBudget + ') — possible infinite loop', s.line);
          }
          var wSig = execBlock(s.body, env);
          if (wSig) {
            if (wSig.signal === 'break') break;
            if (wSig.signal === 'continue') continue;
            if (wSig.signal === 'return') return wSig;
          }
        }
        continue;
      }
      if (s.kind === 'for') {
        var iterable = evalExpr(s.iterExpr, env, s.line);
        var items = typeof iterable === 'string' ? iterable.split('') : Array.isArray(iterable) ? iterable : null;
        if (!items) throw createPythonError('TypeError', 'object is not iterable', s.line);
        for (var fi = 0; fi < items.length; fi++) {
          setVar(env, s.varName, items[fi]);
          var fSig = execBlock(s.body, env);
          if (fSig) {
            if (fSig.signal === 'break') break;
            if (fSig.signal === 'continue') continue;
            if (fSig.signal === 'return') return fSig;
          }
        }
        continue;
      }
      if (s.kind === 'try') {
        try {
          var tSig = execBlock(s.tryBody, env);
          if (tSig) return tSig;
        } catch (err) {
          if (isPyErr(err) && (!s.catchType || s.catchType === err.type || s.catchType === 'Exception')) {
            var eSig = execBlock(s.exceptBody, env);
            if (eSig) return eSig;
          } else {
            throw err;
          }
        }
        continue;
      }
    }
    return null;
  }

  try {
    var lines = String(code || '').replace(/\\r\\n/g, '\\n').split('\\n');
    var parsed = parseStatements(lines, 0, 0);
    execBlock(parsed.stmts, globalEnv);
    if (currentLineBuffer.length > 0) stdoutLines.push(currentLineBuffer);
    return {
      status: 'success',
      stdout: stdoutLines.join('\\n'),
      durationMs: Date.now() - startTime,
      stepsExecuted: steps
    };
  } catch (err) {
    if (currentLineBuffer.length > 0) stdoutLines.push(currentLineBuffer);
    if (isPyErr(err)) {
      return {
        status: err.type === 'TimeoutError' ? 'timeout' : 'error',
        stdout: stdoutLines.join('\\n'),
        errorType: err.type,
        errorMessage: err.message,
        errorLine: err.line,
        durationMs: Date.now() - startTime,
        stepsExecuted: steps
      };
    }
    return {
      status: 'error',
      stdout: stdoutLines.join('\\n'),
      errorType: 'RuntimeError',
      errorMessage: String(err && err.message ? err.message : err),
      errorLine: 1,
      durationMs: Date.now() - startTime,
      stepsExecuted: steps
    };
  }
}
`;

/**
 * Synchronous execution helper used for Node/TSX automated unit verification.
 */
export const executePythonProgramSync = (
  code: string,
  stdin: string = '',
  maxSteps: number = 25000
): PythonExecutionResult => {
  const fn = new Function(
    'code',
    'stdinStr',
    'maxSteps',
    `${PYTHON_VM_CORE_SOURCE}\nreturn runPythonProgramCore(code, stdinStr, maxSteps);`
  );
  return fn(code, stdin, maxSteps) as PythonExecutionResult;
};

/**
 * Runs Python inside an isolated Web Worker with hard wall-clock timeout and explicit stop().
 * Falls back cleanly if Worker API is unavailable (e.g., SSR/non-browser test runtimes).
 */
export const runPythonInWorker = (
  code: string,
  stdin: string = '',
  options: { timeoutMs?: number; maxSteps?: number } = {}
): PythonWorkerHandle => {
  const timeoutMs = options.timeoutMs ?? 2000;
  const maxSteps = options.maxSteps ?? 120000;

  let worker: Worker | null = null;
  let blobUrl: string | null = null;
  let timerId: ReturnType<typeof setTimeout> | null = null;
  let settled = false;
  let resolvePromise: ((res: PythonExecutionResult) => void) | null = null;
  const startTime = Date.now();

  const cleanup = () => {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
    }
    if (worker) {
      try {
        worker.terminate();
      } catch {
        // ignore
      }
      worker = null;
    }
    if (blobUrl) {
      try {
        URL.revokeObjectURL(blobUrl);
      } catch {
        // ignore
      }
      blobUrl = null;
    }
  };

  const finish = (result: PythonExecutionResult) => {
    if (settled) return;
    settled = true;
    cleanup();
    if (resolvePromise) resolvePromise(result);
  };

  const promise = new Promise<PythonExecutionResult>((resolve) => {
    resolvePromise = resolve;

    if (typeof Worker === 'undefined' || typeof Blob === 'undefined' || typeof URL.createObjectURL !== 'function') {
      finish(executePythonProgramSync(code, stdin, maxSteps));
      return;
    }

    const workerScript = `
${PYTHON_VM_CORE_SOURCE}
self.onmessage = function(e) {
  var payload = e.data || {};
  var res = runPythonProgramCore(payload.code, payload.stdin, payload.maxSteps);
  self.postMessage(res);
};
`;
    const blob = new Blob([workerScript], { type: 'application/javascript' });
    blobUrl = URL.createObjectURL(blob);
    worker = new Worker(blobUrl);

    timerId = setTimeout(() => {
      finish({
        status: 'timeout',
        stdout: '',
        errorType: 'TimeoutError',
        errorMessage: `Execution timed out after ${timeoutMs}ms (terminated isolated Web Worker cleanly).`,
        durationMs: Date.now() - startTime,
        stepsExecuted: maxSteps
      });
    }, timeoutMs);

    worker.onmessage = (event: MessageEvent<PythonExecutionResult>) => {
      finish(event.data);
    };

    worker.onerror = (err: ErrorEvent) => {
      finish({
        status: 'error',
        stdout: '',
        errorType: 'WorkerError',
        errorMessage: err.message || 'Web Worker execution error',
        durationMs: Date.now() - startTime,
        stepsExecuted: 0
      });
    };

    worker.postMessage({ code, stdin, maxSteps });
  });

  const stop = () => {
    finish({
      status: 'stopped',
      stdout: '',
      errorType: 'Interrupted',
      errorMessage: 'Execution stopped by user.',
      durationMs: Date.now() - startTime,
      stepsExecuted: 0
    });
  };

  return { promise, stop };
};
