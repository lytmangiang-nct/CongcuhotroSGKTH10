
import React from 'react';
import { renderToString } from 'react-dom/server';
import { BookProvider, useBook } from '../src/context/BookContext';
import { QuickTranslationProvider } from '../src/context/QuickTranslationContext';
import { Section11Overview } from '../src/components/lesson11/Section11Overview';
import { Section11CyberEthicsIssues } from '../src/components/lesson11/Section11CyberEthicsIssues';
import { Section11LegalFramework } from '../src/components/lesson11/Section11LegalFramework';
import { Section11CopyrightBasics } from '../src/components/lesson11/Section11CopyrightBasics';
import { Section11SoftwareCopyrightCompliance } from '../src/components/lesson11/Section11SoftwareCopyrightCompliance';
import { Section11PracticeApply } from '../src/components/lesson11/Section11PracticeApply';

function TestWrapper({ comp, enMode }: { comp: React.ReactElement; enMode: boolean }) {
  // Mock localStorage
  if (typeof global.localStorage === 'undefined') {
    global.localStorage = {
      getItem: (k: string) => k === 'sgk_bilingual_mode' ? (enMode ? 'en' : 'vi') : null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {}
    } as any;
  } else {
    global.localStorage.getItem = (k: string) => k === 'sgk_bilingual_mode' ? (enMode ? 'en' : 'vi') : null;
  }

  return (
    <BookProvider>
      <QuickTranslationProvider>
        {comp}
      </QuickTranslationProvider>
    </BookProvider>
  );
}

try {
  console.log('Testing EN mode rendering for Lesson 11 components:');
  const comps = [
    { name: 'Section11Overview', elem: <Section11Overview /> },
    { name: 'Section11CyberEthicsIssues', elem: <Section11CyberEthicsIssues /> },
    { name: 'Section11LegalFramework', elem: <Section11LegalFramework /> },
    { name: 'Section11CopyrightBasics', elem: <Section11CopyrightBasics /> },
    { name: 'Section11SoftwareCopyrightCompliance', elem: <Section11SoftwareCopyrightCompliance /> },
    { name: 'Section11PracticeApply', elem: <Section11PracticeApply /> },
  ];

  for (const c of comps) {
    const htmlEn = renderToString(<TestWrapper comp={c.elem} enMode={true} />);
    console.log(c.name + ' EN rendered successfully. Length: ' + htmlEn.length);
  }
} catch (e) {
  console.error('Render error:', e);
}
