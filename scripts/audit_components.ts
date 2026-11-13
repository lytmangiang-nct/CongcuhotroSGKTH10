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

async function auditComponents() {
  console.log('=== AUDITING COMPONENTS FOR BILINGUAL SUPPORT ===');
  const componentFiles = walkDir('./src/components');
  
  const filesWithoutBilingual: { file: string; vnLines: { line: number; text: string }[] }[] = [];
  const filesWithBilingual: { file: string; totalLines: number; hasEnCheck: boolean }[] = [];

  for (const file of componentFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');
    const usesBilingualMode = content.includes('bilingualMode') || content.includes('BilingualText');

    const vnLines: { line: number; text: string }[] = [];
    lines.forEach((line, idx) => {
      // Exclude comments and console.logs and speechVi
      const trimmed = line.trim();
      if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return;
      if (trimmed.includes('speechVi:') || trimmed.includes('titleVi:') || trimmed.includes('termVi:') || trimmed.includes('definitionVi:')) return;
      if (trimmed.includes('questionVi:') || trimmed.includes('optionsVi:') || trimmed.includes('explanationVi:')) return;
      
      // If line contains Vietnamese text
      if (VIETNAMESE_CHAR_REGEX.test(line)) {
        // Check if line is inside a ternary or conditional for 'vi' or 'en'
        // e.g. bilingualMode === 'en' ? ... : ...
        vnLines.push({ line: idx + 1, text: trimmed.slice(0, 100) });
      }
    });

    if (!usesBilingualMode && vnLines.length > 0) {
      filesWithoutBilingual.push({ file, vnLines });
    } else {
      filesWithBilingual.push({ file, totalLines: lines.length, hasEnCheck: content.includes("=== 'en'") || content.includes("!== 'en'") });
    }
  }

  console.log(`\nFound ${filesWithoutBilingual.length} component files that DO NOT use bilingualMode or BilingualText AT ALL despite containing Vietnamese:`);
  filesWithoutBilingual.forEach(f => {
    console.log(`- ${f.file} (${f.vnLines.length} VN lines, e.g.: line ${f.vnLines[0]?.line}: ${f.vnLines[0]?.text})`);
  });

  console.log(`\nAuditing files that use bilingualMode to see if they have raw VN strings not switched...`);
  // Let's inspect files in each lesson directory
}

auditComponents().catch(console.error);
