import fs from 'fs';
import path from 'path';
import { LESSONS_REGISTRY } from '../src/data/lessonsRegistry';

console.log('=== LESSONS REGISTRY OVERVIEW ===');

for (let id = 1; id <= 34; id++) {
  const lesson = LESSONS_REGISTRY[id];
  if (!lesson) {
    console.log(`Lesson ${id}: NOT REGISTERED!`);
    continue;
  }
  const sectionCount = lesson.sections.length;
  const sectionTitles = lesson.sections.map(s => s.titleVi).join(' | ');
  console.log(`Lesson ${id}: "${lesson.titleVi}" (${sectionCount} sections)`);
}
