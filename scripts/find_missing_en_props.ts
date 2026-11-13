import fs from 'fs';
import path from 'path';

function walkDir(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        walkDir(fullPath, fileList);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const allFiles = walkDir('./src');
const trueMissingEn: { file: string; line: number; snippet: string }[] = [];

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  // Match full <BilingualText ... /> spanning multiple lines
  const regex = /<BilingualText\s+([\s\S]*?)\/>/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const props = match[1];
    // check if 'en=' or 'en={' is present in props
    if (!props.includes('en=') && !props.includes('en={')) {
      const lineNum = content.slice(0, match.index).split('\n').length;
      trueMissingEn.push({ file, line: lineNum, snippet: match[0].replace(/\s+/g, ' ').slice(0, 150) });
    }
  }
}

console.log(`True missing 'en' in <BilingualText>: ${trueMissingEn.length}`);
trueMissingEn.forEach(m => console.log(`${m.file}:${m.line} => ${m.snippet}`));
