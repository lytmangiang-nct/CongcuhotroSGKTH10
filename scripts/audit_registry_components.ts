import fs from 'fs';
import path from 'path';

// Let's inspect the imports in src/data/lessonsRegistry.tsx
const content = fs.readFileSync('./src/data/lessonsRegistry.tsx', 'utf-8');
const lines = content.split('\n');

const componentImports: { name: string; path: string }[] = [];
for (const line of lines) {
  const match = line.match(/import\s*\{\s*([A-Za-z0-9_]+)\s*\}\s*from\s*['"]([^'"]+)['"]/);
  if (match && (match[2].startsWith('../components') || match[2].startsWith('./'))) {
    componentImports.push({ name: match[1], path: match[2] });
  }
}

console.log(`Found ${componentImports.length} imported components in lessonsRegistry.tsx`);

// For each imported component file, check if it exists, read it, and check:
// 1. Does it use bilingualMode?
// 2. Does it contain raw Vietnamese text when bilingualMode === 'en'?
const VIETNAMESE_CHAR_REGEX = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/i;

const flaggedComponents: { name: string; file: string; issues: string[] }[] = [];

for (const comp of componentImports) {
  let resolvedPath = path.resolve('./src/data', comp.path);
  if (!resolvedPath.endsWith('.tsx') && !resolvedPath.endsWith('.ts')) {
    if (fs.existsSync(resolvedPath + '.tsx')) resolvedPath += '.tsx';
    else if (fs.existsSync(resolvedPath + '.ts')) resolvedPath += '.ts';
  }

  if (!fs.existsSync(resolvedPath)) {
    // Might not be a component or file not found
    continue;
  }

  const fileContent = fs.readFileSync(resolvedPath, 'utf-8');
  const fileLines = fileContent.split('\n');
  const usesBilingual = fileContent.includes('bilingualMode');
  const issues: string[] = [];

  if (!usesBilingual) {
    // Check if it has Vietnamese
    const vnCount = fileLines.filter(l => VIETNAMESE_CHAR_REGEX.test(l)).length;
    if (vnCount > 0) {
      issues.push(`DOES NOT USE bilingualMode AT ALL! Contains ${vnCount} Vietnamese lines.`);
    }
  }

  if (issues.length > 0) {
    flaggedComponents.push({ name: comp.name, file: resolvedPath, issues });
  }
}

console.log(`Flagged ${flaggedComponents.length} components registered in lessons:`);
flaggedComponents.forEach(fc => {
  console.log(`- ${fc.name} (${fc.file}): ${fc.issues.join('; ')}`);
});
