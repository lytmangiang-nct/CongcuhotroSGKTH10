import fs from 'fs';
import path from 'path';

// Extract all component paths from lessonsRegistry.tsx
const registryPath = path.resolve('./src/data/lessonsRegistry.tsx');
const registryContent = fs.readFileSync(registryPath, 'utf-8');

const importRegex = /import\s+\{\s*(\w+)\s*\}\s+from\s+['"]([^'"]+)['"]/g;
let match;
const imports: { name: string; file: string }[] = [];

while ((match = importRegex.exec(registryContent)) !== null) {
  const [, name, relPath] = match;
  // Resolve path relative to src/data
  let absPath = path.resolve('./src/data', relPath);
  if (!absPath.endsWith('.tsx') && !absPath.endsWith('.ts')) {
    if (fs.existsSync(absPath + '.tsx')) absPath += '.tsx';
    else if (fs.existsSync(absPath + '.ts')) absPath += '.ts';
    else if (fs.existsSync(path.join(absPath, 'index.tsx'))) absPath = path.join(absPath, 'index.tsx');
  }
  if (fs.existsSync(absPath) && absPath.endsWith('.tsx')) {
    imports.push({ name, file: absPath });
  }
}

console.log(`Found ${imports.length} section components in lessonsRegistry.tsx`);

let withoutBilingual = 0;
for (const item of imports) {
  const code = fs.readFileSync(item.file, 'utf-8');
  const hasUseBook = code.includes('useBook');
  const hasBilingual = code.includes('bilingualMode') || code.includes('isEn') || code.includes('lang');
  
  if (!hasUseBook || !hasBilingual) {
    console.log(`[NON-BILINGUAL COMPONENT] ${item.name} in ${item.file}: useBook=${hasUseBook}, hasBilingual=${hasBilingual}`);
    withoutBilingual++;
  }
}

console.log(`Total components without bilingual handling: ${withoutBilingual}`);
