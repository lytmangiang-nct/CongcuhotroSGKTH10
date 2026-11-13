import fs from 'fs';

const labFiles = [
  'src/components/lesson12/VectorGraphics3DViewer.tsx',
  'src/components/lesson16/PythonEnvironment3DViewer.tsx',
  'src/components/lesson17/VariableMemory3DViewer.tsx',
  'src/components/lesson18/IOTypePipeline3DViewer.tsx',
  'src/components/lesson19/BranchingDecision3DViewer.tsx',
  'src/components/lesson20/LoopFor3DViewer.tsx',
  'src/components/lesson21/WhileLoop3DViewer.tsx',
  'src/components/lesson22/List3DViewer.tsx',
  'src/components/lesson23/ListMethods3DViewer.tsx',
  'src/components/lesson23/Section23PracticeLab.tsx',
  'src/components/lesson24/Section24PracticeLab.tsx',
  'src/components/lesson24/String3DViewer.tsx',
  'src/components/lesson25/StringMethods3DViewer.tsx',
  'src/components/lesson26/Function3DLab.tsx',
  'src/components/lesson27/Parameter3DLab.tsx',
  'src/components/lesson28/Scope3DLab.tsx',
  'src/components/lesson29/Error3DLab.tsx',
  'src/components/lesson30/Debugger3DLab.tsx',
  'src/components/lesson31/Lab3DVisualizer.tsx',
  'src/components/lesson32/SolarSystem3DLab.tsx',
  'src/components/lesson33/GraphicDesign3DStudio.tsx',
  'src/components/lesson34/SoftwareDev3DLab.tsx',
  'src/components/lesson9/CyberDefense3DViewer.tsx',
  'src/components/three/Activity1Devices3DViewer.tsx',
  'src/components/three/ComputingCycle3DViewer.tsx',
  'src/components/three/IndustrialRevolutions3DViewer.tsx',
  'src/components/three/SmartDevice3DViewer.tsx'
];

for (const file of labFiles) {
  if (!fs.existsSync(file)) {
    console.log(`[NOT FOUND] ${file}`);
    continue;
  }
  const content = fs.readFileSync(file, 'utf-8');
  const hasBilingual = content.includes('bilingualMode');
  const vnLines = content.split('\n').filter(l => /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/i.test(l)).length;
  console.log(`${file}: uses bilingualMode = ${hasBilingual}, VN lines count = ${vnLines}`);
}
