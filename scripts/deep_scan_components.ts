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

// Let's inspect all files in src/components/
const files = walkDir('./src/components');

console.log(`Total component files: ${files.length}`);

interface ProblemFile {
  file: string;
  hasBilingualModeImport: boolean;
  untranslatedStrings: string[];
}

const problemFiles: ProblemFile[] = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');
  const hasBilingualModeImport = content.includes('bilingualMode');

  // Let's check how many lines have VN text
  const rawVnLines: string[] = [];
  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return;
    if (trimmed.includes('speechVi:') || trimmed.includes('titleVi:') || trimmed.includes('termVi:') || trimmed.includes('definitionVi:')) return;
    if (trimmed.includes('questionVi:') || trimmed.includes('optionsVi:') || trimmed.includes('explanationVi:')) return;
    if (VIETNAMESE_CHAR_REGEX.test(trimmed)) {
      // Check if it's part of a bilingual check: e.g. bilingualMode === 'en' ? ... : 'Vietnamese'
      // Or BilingualText vi="..." en="..."
      const isInsideBilingualText = trimmed.includes('<BilingualText') || trimmed.includes('vi=') || trimmed.includes('vi:');
      const isTernary = (trimmed.includes("bilingualMode === 'en'") || trimmed.includes("bilingualMode !== 'en'")) && (trimmed.includes('?') || trimmed.includes(':'));
      if (!isInsideBilingualText && !isTernary) {
        rawVnLines.push(`L${idx + 1}: ${trimmed.slice(0, 90)}`);
      }
    }
  });

  if (rawVnLines.length > 0) {
    problemFiles.push({
      file,
      hasBilingualModeImport,
      untranslatedStrings: rawVnLines
    });
  }
}

console.log(`\nFound ${problemFiles.length} files with potentially untranslated raw VN strings:`);
for (const pf of problemFiles) {
  console.log(`\n--- ${pf.file} (bilingualMode imported: ${pf.hasBilingualModeImport}, raw VN lines: ${pf.untranslatedStrings.length}) ---`);
  pf.untranslatedStrings.slice(0, 5).forEach(s => console.log(`  ${s}`));
  if (pf.untranslatedStrings.length > 5) {
    console.log(`  ... and ${pf.untranslatedStrings.length - 5} more`);
  }
}
