import fs from 'fs';
import path from 'path';

const VIETNAMESE_CHAR_REGEX = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/i;

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

const componentFiles = walkDir('./src/components');

interface Issue {
  file: string;
  line: number;
  text: string;
}

const allIssues: Issue[] = [];

for (const file of componentFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (!VIETNAMESE_CHAR_REGEX.test(trimmed)) return;

    // Skip comments
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return;

    // Skip BilingualText props
    if (trimmed.includes('vi=') || trimmed.includes('vi:') || trimmed.includes('titleVi:') || trimmed.includes('speechVi:') || trimmed.includes('termVi:') || trimmed.includes('definitionVi:')) return;
    if (trimmed.includes('questionVi:') || trimmed.includes('optionsVi:') || trimmed.includes('explanationVi:')) return;

    // Skip ternary conditional where bilingualMode is on the same line or line has 'en' check
    if (trimmed.includes("bilingualMode === 'en'") || trimmed.includes("bilingualMode !== 'en'") || trimmed.includes("bilingualMode === 'vi'")) return;

    // If it's a bilingual dictionary object like { vi: '...', en: '...' }
    if (trimmed.startsWith("vi: '") || trimmed.startsWith('vi: "') || trimmed.startsWith('vi: `')) return;

    allIssues.push({
      file,
      line: idx + 1,
      text: trimmed
    });
  });
}

console.log(`Total potential hardcoded VN lines across all components: ${allIssues.length}`);

// Group by file
const byFile: Record<string, Issue[]> = {};
for (const iss of allIssues) {
  if (!byFile[iss.file]) byFile[iss.file] = [];
  byFile[iss.file].push(iss);
}

const sortedFiles = Object.entries(byFile).sort((a, b) => b[1].length - a[1].length);

for (const [f, issues] of sortedFiles) {
  console.log(`\n=== ${f} (${issues.length} hardcoded lines) ===`);
  issues.slice(0, 8).forEach(i => console.log(`  L${i.line}: ${i.text.slice(0, 100)}`));
}
