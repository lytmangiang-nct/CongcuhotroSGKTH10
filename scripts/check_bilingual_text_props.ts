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
const missingEnUsages: { file: string; line: number; text: string }[] = [];

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  // Find <BilingualText ... />
  // Regex match <BilingualText[\s\S]*?>
  const regex = /<BilingualText\b([^>]*)\/?>/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const props = match[1];
    // Check if props has 'en=' or 'en={'
    if (!props.includes('en=') && !props.includes('en={')) {
      // Find line number
      const lineNum = content.slice(0, match.index).split('\n').length;
      missingEnUsages.push({ file, line: lineNum, text: match[0].slice(0, 100) });
    }
  }
}

console.log(`Found ${missingEnUsages.length} <BilingualText> usages without 'en' prop!`);
missingEnUsages.forEach(u => {
  console.log(`- ${u.file}:${u.line} => ${u.text}`);
});
