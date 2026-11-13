import React from 'react';
import { renderToString } from 'react-dom/server';
import { BookProvider } from '../src/context/BookContext';
import { QuickTranslationProvider } from '../src/context/QuickTranslationContext';
import { Section11Overview } from '../src/components/lesson11/Section11Overview';
import { Section11CyberEthicsIssues } from '../src/components/lesson11/Section11CyberEthicsIssues';
import { Section11LegalFramework } from '../src/components/lesson11/Section11LegalFramework';
import { Section11CopyrightBasics } from '../src/components/lesson11/Section11CopyrightBasics';
import { Section11SoftwareCopyrightCompliance } from '../src/components/lesson11/Section11SoftwareCopyrightCompliance';
import { Section11PracticeApply } from '../src/components/lesson11/Section11PracticeApply';

function TestWrapper({ comp }: { comp: React.ReactElement }) {
  if (typeof global.localStorage === 'undefined') {
    global.localStorage = {
      getItem: (k: string) => (k === 'sgk_bilingual_mode' ? 'en' : null),
      setItem: () => {},
      removeItem: () => {},
      clear: () => {}
    } as any;
  } else {
    global.localStorage.getItem = (k: string) => (k === 'sgk_bilingual_mode' ? 'en' : null);
  }

  return (
    <BookProvider>
      <QuickTranslationProvider>
        {comp}
      </QuickTranslationProvider>
    </BookProvider>
  );
}

const comps = [
  { name: 'Section11Overview', elem: <Section11Overview /> },
  { name: 'Section11CyberEthicsIssues', elem: <Section11CyberEthicsIssues /> },
  { name: 'Section11LegalFramework', elem: <Section11LegalFramework /> },
  { name: 'Section11CopyrightBasics', elem: <Section11CopyrightBasics /> },
  { name: 'Section11SoftwareCopyrightCompliance', elem: <Section11SoftwareCopyrightCompliance /> },
  { name: 'Section11PracticeApply', elem: <Section11PracticeApply /> },
];

const viRegex = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/;

for (const c of comps) {
  const html = renderToString(<TestWrapper comp={c.elem} />);
  
  // Extract text outside of tags:
  // Strip tags but keep text chunks
  // Notice we need to ignore attributes like data-vi="..." or title="..."
  // First strip all <tag attr="..." ...> by replacing them with a delimiter
  const textOnly = html.replace(/<[^>]+>/g, '\n');
  const lines = textOnly.split('\n').map(l => l.trim()).filter(Boolean);

  console.log(`\n=== Checking ${c.name} visible text for remaining Vietnamese ===`);
  const found: string[] = [];
  for (const line of lines) {
    if (viRegex.test(line)) {
      found.push(line);
    }
  }

  if (found.length === 0) {
    console.log(`  ✓ PERFECT: Zero visible Vietnamese text found in ${c.name} in EN mode!`);
  } else {
    console.log(`  ✗ Found ${found.length} visible Vietnamese lines in ${c.name}:`);
    found.slice(0, 15).forEach(f => console.log(`    - "${f}"`));
  }
}
