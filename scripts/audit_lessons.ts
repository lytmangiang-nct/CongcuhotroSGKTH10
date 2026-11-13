import fs from 'fs';
import path from 'path';

// Regex for Vietnamese characters
const VIETNAMESE_CHAR_REGEX = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/i;

function hasVietnamese(str: string): boolean {
  return VIETNAMESE_CHAR_REGEX.test(str);
}

async function runAudit() {
  console.log('=== STARTING LESSON DATA AUDIT ===');
  
  // 1. Audit LESSONS_REGISTRY
  const registryFile = path.resolve('./src/data/lessonsRegistry.tsx');
  const registryContent = fs.readFileSync(registryFile, 'utf-8');
  
  // Dynamically import lessonsRegistry
  const { LESSONS_REGISTRY } = await import('../src/data/lessonsRegistry');
  
  let totalRegistryIssues = 0;
  for (let id = 1; id <= 34; id++) {
    const lesson = LESSONS_REGISTRY[id];
    if (!lesson) {
      console.log(`[REGISTRY ERROR] Lesson ${id} not found in LESSONS_REGISTRY!`);
      totalRegistryIssues++;
      continue;
    }

    if (!lesson.titleEn || hasVietnamese(lesson.titleEn)) {
      console.log(`[Lesson ${id}] Invalid or missing titleEn: "${lesson.titleEn}"`);
      totalRegistryIssues++;
    }

    if (!lesson.topicTitleEn || hasVietnamese(lesson.topicTitleEn)) {
      console.log(`[Lesson ${id}] Invalid or missing topicTitleEn: "${lesson.topicTitleEn}"`);
      totalRegistryIssues++;
    }

    lesson.sections.forEach((sec, sIdx) => {
      if (!sec.titleEn || hasVietnamese(sec.titleEn)) {
        console.log(`[Lesson ${id} Sec ${sIdx}] Invalid or missing titleEn: "${sec.titleEn}"`);
        totalRegistryIssues++;
      }
      if (!sec.speechEn || hasVietnamese(sec.speechEn)) {
        console.log(`[Lesson ${id} Sec ${sIdx}] Invalid or missing speechEn: "${sec.speechEn?.slice(0, 30)}..."`);
        totalRegistryIssues++;
      }
    });

    // Check quizQuestions
    if (!lesson.quizQuestions || lesson.quizQuestions.length === 0) {
      console.log(`[Lesson ${id}] No quizQuestions found!`);
      totalRegistryIssues++;
    } else {
      lesson.quizQuestions.forEach((q, qIdx) => {
        if (!q.questionEn || hasVietnamese(q.questionEn)) {
          console.log(`[Lesson ${id} Quiz Q${qIdx + 1}] Missing/VN questionEn: "${q.questionEn?.slice(0, 30)}"`);
          totalRegistryIssues++;
        }
        if (!q.optionsEn || q.optionsEn.length !== q.optionsVi.length) {
          console.log(`[Lesson ${id} Quiz Q${qIdx + 1}] optionsEn length mismatch (${q.optionsEn?.length} vs ${q.optionsVi.length})`);
          totalRegistryIssues++;
        } else {
          q.optionsEn.forEach((opt, optIdx) => {
            if (!opt || hasVietnamese(opt)) {
              console.log(`[Lesson ${id} Quiz Q${qIdx + 1} Opt ${optIdx}] Missing/VN optionEn: "${opt}"`);
              totalRegistryIssues++;
            }
          });
        }
        if (q.explanationVi && (!q.explanationEn || hasVietnamese(q.explanationEn))) {
          console.log(`[Lesson ${id} Quiz Q${qIdx + 1}] Missing/VN explanationEn: "${q.explanationEn?.slice(0, 30)}"`);
          totalRegistryIssues++;
        }
      });
    }

    // Check glossary
    if (lesson.glossary) {
      lesson.glossary.forEach((g, gIdx) => {
        if (!g.termEn || hasVietnamese(g.termEn)) {
          console.log(`[Lesson ${id} Glossary ${gIdx}] Missing/VN termEn: "${g.termEn}" (vi: ${g.termVi})`);
          totalRegistryIssues++;
        }
        if (g.definitionVi && (!g.definitionEn || hasVietnamese(g.definitionEn))) {
          console.log(`[Lesson ${id} Glossary ${gIdx}] Missing/VN definitionEn: "${g.definitionEn?.slice(0, 30)}"`);
          totalRegistryIssues++;
        }
      });
    }
  }

  console.log(`Total Registry issues flagged: ${totalRegistryIssues}`);
}

runAudit().catch(console.error);
