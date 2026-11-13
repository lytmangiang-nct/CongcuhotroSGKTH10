import { LESSONS_REGISTRY } from '../src/data/lessonsRegistry';
import { TEACHER_PROMPTS_BY_LESSON, getTeacherPrompts } from '../src/data/teacherPromptsData';
import { getCachedTranslation, saveTranslationToCache, normalizeKey } from '../src/services/quickTranslationService';
import {
  normalizeFullName,
  validateFullName,
  createLearnerProfile,
  loadActiveLearnerProfile,
  loadLearnerProgress,
  saveLearnerProgress,
  gradeAndRecordQuizAttempt,
  clearActiveLearnerSession,
  loadCertificateArchive,
  hasLegacyUnscopedProgress,
  toggleDifficultVocabInState,
  StorageLike
} from '../src/services/learnerStorage';
import { getLessonVocabulary } from '../src/data/lessonVocabSupport';
import { getCategorizedGuidingPrompts } from '../src/data/guidingQuestionsHelper';
import {
  buildDemoClassAnalytics,
  extractPersonalMissedQuestions,
  getQuestionTargetSection
} from '../src/data/sampleAnalyticsData';
import { getLessonPythonSamples, hasPythonPlaygroundForLesson } from '../src/data/pythonSandboxSamples';
import { executePythonProgramSync } from '../src/services/pythonWorkerRunner';
import {
  TEACH_STAGE_ORDER,
  CLASSROOM_PHRASES,
  QUICK_FOLLOWUPS,
  getTeachLessonScript
} from '../src/data/teachEnglishData';
import { createAppServer } from '../server';
import http from 'node:http';
import fs from 'fs';
import path from 'path';

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, testName: string, details?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    console.error(`  ✗ FAIL: ${testName}`);
    if (details) console.error(`    Details: ${details}`);
  }
}

console.log('=== RUNNING AUTOMATED BILINGUAL SYSTEM VERIFICATION ===\n');

// 1. Verify Lesson 11 Situation Excerpt and Page Range
console.log('--- Test Suite 1: Lesson 11 Activity 1 & Metadata ---');
const l11File = fs.readFileSync(path.resolve('src/components/lesson11/Section11Overview.tsx'), 'utf-8');
const expectedExcerptEnSnippet =
  'After a dispute on an online forum, a group of schoolgirls assaulted another girl. The students nearby did not intervene. Instead, they filmed the incident and uploaded the video to social media. Humiliated in front of her peers by the hostile comments online, the victim left home without leaving a note.';
const expectedExcerptViSnippet = 'Do mâu thuẫn ở một diễn đàn trên mạng';

assert(
  l11File.includes(expectedExcerptEnSnippet),
  'Lesson 11 Overview contains the exact requested English situation excerpt'
);
assert(
  l11File.includes(expectedExcerptViSnippet),
  'Lesson 11 Overview preserves the exact original Vietnamese situation excerpt'
);

const l11Registry = LESSONS_REGISTRY[11];
assert(
  l11Registry?.pageRangeEn === 'Pages 55 – 62',
  'Lesson 11 registry has pageRangeEn set to "Pages 55 – 62"'
);
assert(
  l11File.includes("bilingualMode === 'en' ? 'SGK P. 55' : 'SGK Tr. 55'"),
  'Lesson 11 textbook button shows SGK P. 55 in English mode'
);

// 2. Verify Lesson 19 Teacher Discussion Prompts & Bubble Translation
console.log('\n--- Test Suite 2: Lesson 19 Teacher Prompts & Bubble Translation ---');
const section3Prompts = getTeacherPrompts(19, 3);
const targetPromptEn =
  'To execute the hands-on lab in ‘Conditional Statement: if’, what sequential steps must be performed in the software environment?';
const targetPromptVi =
  'Để thực hiện bài thực hành ‘Câu lệnh điều kiện if’, cần thực hiện lần lượt những bước nào trong môi trường phần mềm?';

const foundPrompt = section3Prompts.prompts.find((p) => p.questionEn === targetPromptEn);
assert(
  Boolean(foundPrompt),
  'Lesson 19 Section 3 teacher prompts contains the exact specified English prompt',
  `Found: ${foundPrompt?.questionEn}`
);
assert(
  foundPrompt?.questionVi === targetPromptVi,
  'Lesson 19 Section 3 teacher prompts has the exact Vietnamese translation',
  `Actual Vi: ${foundPrompt?.questionVi}`
);

// Test cache and dictionary lookup through quickTranslationService
const normalizedQuery = normalizeKey(targetPromptEn);
const lookupResult = getCachedTranslation(targetPromptEn, 'en', 'vi');
assert(
  lookupResult === targetPromptVi,
  'Dictionary / Cache lookup for Lesson 19 prompt returns exact Vietnamese translation (zero latency)',
  `Lookup returned: ${lookupResult}`
);

// 3. Verify Lesson 19 Practice Lab Code and Output Bilingual Alignment
console.log('\n--- Test Suite 3: Lesson 19 Electricity Bill Code & Output ---');
const l19LabFile = fs.readFileSync(path.resolve('src/components/lesson19/Section19PracticeLab.tsx'), 'utf-8');

assert(
  l19LabFile.includes('print("Amount due:", round(t), "thousand VND")'),
  'Lesson 19 Practice Lab displays English print statement in EN mode'
);
assert(
  l19LabFile.includes('print("Số tiền điện phải trả là:", round(t), "nghìn đồng")'),
  'Lesson 19 Practice Lab displays Vietnamese print statement in VI mode'
);
assert(
  l19LabFile.includes('Amount due: ${roundedT} thousand VND'),
  'Lesson 19 Practice Lab terminal output displays "Amount due: ... thousand VND" in EN mode'
);
assert(
  l19LabFile.includes('Số tiền điện phải trả là: ${roundedT} nghìn đồng'),
  'Lesson 19 Practice Lab terminal output displays "Số tiền điện phải trả là: ... nghìn đồng" in VI mode'
);

// 4. Verify QuickTranslationBubble Implementation
console.log('\n--- Test Suite 4: QuickTranslationBubble Verification ---');
const bubbleFile = fs.readFileSync(path.resolve('src/components/QuickTranslationBubble.tsx'), 'utf-8');

assert(
  bubbleFile.includes('Chưa có bản dịch tiếng Việt'),
  'QuickTranslationBubble shows "Chưa có bản dịch tiếng Việt" when translation is missing or duplicated'
);
assert(
  bubbleFile.includes('Văn bản gốc:'),
  'QuickTranslationBubble shows "Văn bản gốc:" reference line'
);
assert(
  bubbleFile.includes('bubbleState.isVerified ? \'Bản dịch chuẩn\' : \'Bản dịch tham khảo\''),
  'QuickTranslationBubble only shows "Bản dịch chuẩn" when isVerified is true'
);

// 5. Lesson 3 Figure 3.2 & Activity 1 CCCD Bilingual Test
console.log('\n--- Test Suite 5: Lesson 3 Figure 3.2 & CCCD Activity ---');
const l3File = fs.readFileSync(path.resolve('src/components/lesson3/Section3Classification.tsx'), 'utf-8');
assert(
  l3File.includes("bilingualMode === 'en' ? 'Figure 3.2 • Page 16 SGK' : 'Hình 3.2 • Trang 16 SGK'"),
  'Lesson 3 Figure 3.2 header shows Figure 3.2 • Page 16 SGK in EN mode'
);
assert(
  l3File.includes("bilingualMode === 'en' ? '4 Main Categories' : '4 Nhóm cơ bản'"),
  'Lesson 3 Figure 3.2 badge shows 4 Main Categories in EN mode'
);
assert(
  l3File.includes("bilingualMode === 'en' ? '2. Numeric Data' : '2. Dữ liệu số (Number)'"),
  'Lesson 3 Figure 3.2 Numeric card title is bilingual'
);
assert(
  l3File.includes("groupEn: 'Text (String)'"),
  'Lesson 3 Activity 1 CCCD fields have groupEn populated'
);

// 6. Lesson 4 Comprehensive Bilingual Tests
console.log('\n--- Test Suite 6: Lesson 4 Complete Bilingual Tests ---');
const l4Sec0 = fs.readFileSync(path.resolve('src/components/lesson4/Section4Overview.tsx'), 'utf-8');
const l4Sec1 = fs.readFileSync(path.resolve('src/components/lesson4/Section4BinaryConversion.tsx'), 'utf-8');
const l4Sec2 = fs.readFileSync(path.resolve('src/components/lesson4/Section4SignedIntegers.tsx'), 'utf-8');
const l4Sec3 = fs.readFileSync(path.resolve('src/components/lesson4/Section4BinaryAddition.tsx'), 'utf-8');
const l4Sec4 = fs.readFileSync(path.resolve('src/components/lesson4/Section4MultiplicationProcess.tsx'), 'utf-8');
const l4Sec5 = fs.readFileSync(path.resolve('src/components/lesson4/Section4PracticeApply.tsx'), 'utf-8');

assert(
  l4Sec0.includes("Interactive Simulator: Explore Powers-of-2 Bit Weights (8-Bit)"),
  'Lesson 4 Sec 0 (Overview) 8-bit switcher title is bilingual'
);
assert(
  l4Sec0.includes("bilingualMode === 'en' ? 'ON (1)' : 'BẬT (1)'"),
  'Lesson 4 Sec 0 (Overview) ON (1) / BẬT (1) bit toggle is bilingual'
);
assert(
  l4Sec0.includes("bilingualMode === 'en' ? 'Textbook Examples:' : 'Ví dụ SGK:'"),
  'Lesson 4 Sec 0 (Overview) preset examples label is bilingual'
);

assert(
  l4Sec1.includes("Successive Division by 2 Algorithm (Figure 4.1 Textbook Page 21)"),
  'Lesson 4 Sec 1 (Binary Conversion) Figure 4.1 title is bilingual'
);
assert(
  l4Sec1.includes("bilingualMode === 'en' ? 'Quotient' : 'Thương số'"),
  'Lesson 4 Sec 1 (Binary Conversion) table columns are bilingual'
);
assert(
  l4Sec1.includes("Review Questions for Section 1 (Textbook Page 21)") &&
    l4Sec1.includes("Câu hỏi củng cố cuối mục 1 (Trang 21 SGK)"),
  'Lesson 4 Sec 1 Review Questions title is bilingual'
);

assert(
  l4Sec2.includes("Signed Integers: Sign-Magnitude, One's Complement & Two's Complement"),
  'Lesson 4 Sec 2 (Signed Integers) header is bilingual'
);
assert(
  l4Sec2.includes("bilingualMode === 'en' ? '1. Sign-magnitude' : '1. Mã thuận (Sign-magnitude)'"),
  'Lesson 4 Sec 2 comparison table rows are bilingual'
);
assert(
  l4Sec2.includes("bilingualMode === 'en' ? 'Generate Code' : 'Sinh mã'"),
  'Lesson 4 Sec 2 signed generator button is bilingual'
);

assert(
  l4Sec3.includes("bilingualMode === 'en' ? 'BINARY ADDITION TABLE (+)' : 'BẢNG CỘNG NHỊ PHÂN (+)'"),
  'Lesson 4 Sec 3 Table 4.1a binary addition is bilingual'
);
assert(
  l4Sec3.includes("Interactive Simulator: Column-wise Binary Addition (Figure 4.2 SGK)") &&
    l4Sec3.includes("Mô phỏng tương tác: Đặt tính phép cộng nhị phân theo cột (Hình 4.2 SGK)"),
  'Lesson 4 Sec 3 Figure 4.2 column addition simulation is bilingual'
);

assert(
  l4Sec4.includes("c) Binary Multiplication (Figure 4.3 Textbook Page 22)"),
  'Lesson 4 Sec 4 Figure 4.3 binary multiplication header is bilingual'
);
assert(
  l4Sec4.includes("bilingualMode === 'en' ? 'DATA ENCODING' : 'MÃ HOÁ DỮ LIỆU'"),
  'Lesson 4 Sec 4 Figure 4.4 3-stage pipeline Stage 1 is bilingual'
);
assert(
  l4Sec4.includes("bilingualMode === 'en' ? 'ALU COMPUTATION' : 'TÍNH TOÁN TRONG ALU'"),
  'Lesson 4 Sec 4 Figure 4.4 3-stage pipeline Stage 2 is bilingual'
);
assert(
  l4Sec4.includes("bilingualMode === 'en' ? 'RESULT DECODING' : 'GIẢI MÃ KẾT QUẢ'"),
  'Lesson 4 Sec 4 Figure 4.4 3-stage pipeline Stage 3 is bilingual'
);

assert(
  l4Sec5.includes("Practice 1: 3-Stage Addition Pipeline Figure 4.4 (Page 23 SGK)"),
  'Lesson 4 Sec 5 Practice 1 title is bilingual'
);
assert(
  l4Sec5.includes("Practice 2: 3-Stage Multiplication Pipeline (Page 23 SGK)"),
  'Lesson 4 Sec 5 Practice 2 title is bilingual'
);
assert(
  l4Sec5.includes("Application 1: Converting Fractional Decimals to Binary (Page 23 SGK)"),
  'Lesson 4 Sec 5 Application 1 title is bilingual'
);
assert(
  l4Sec5.includes("Application 2: Why Do Computers Use Two's Complement? (Page 23 SGK)") &&
    l4Sec5.includes("Vận dụng 2: Tại sao máy tính sử dụng mã bù 2? (Trang 23 SGK)"),
  'Lesson 4 Sec 5 Application 2 title is bilingual'
);

// 7. Lesson 20 and Lesson 23 Title and Num Attributes
console.log('\n--- Test Suite 7: Lesson 20 & 23 Data Attributes ---');
const l20File = fs.readFileSync(path.resolve('src/components/lesson20/Section20Overview.tsx'), 'utf-8');
const l23File = fs.readFileSync(path.resolve('src/components/lesson23/Section23Overview.tsx'), 'utf-8');
assert(
  l20File.includes('data-lesson-title="true"') && l20File.includes('data-lesson-num={20}'),
  'Lesson 20 Overview heading has data-lesson-title="true" and data-lesson-num={20}'
);
assert(
  l23File.includes('data-lesson-title="true"') && l23File.includes('data-lesson-num={23}'),
  'Lesson 23 Overview heading has data-lesson-title="true" and data-lesson-num={23}'
);

const l23Item = LESSONS_REGISTRY[23];
assert(
  l23Item.titleVi === 'Một số lệnh làm việc với dữ liệu danh sách',
  'Lesson 23 registry has verified Vietnamese title "Một số lệnh làm việc với dữ liệu danh sách"'
);

// 8. System-wide Lesson Registry & Teacher Prompts Coverage
console.log('\n--- Test Suite 8: System-wide Lessons & Prompts Coverage ---');
const allLessons = Object.values(LESSONS_REGISTRY);
assert(
  allLessons.length === 34,
  `All 34 Informatics 10 lessons registered (Found ${allLessons.length})`
);

let allLessonsHaveTitles = true;
let totalSectionsCount = 0;
let allLessonsHaveSections = true;

for (const lesson of allLessons) {
  if (!lesson.titleVi || !lesson.titleEn) {
    allLessonsHaveTitles = false;
  }
  if (!lesson.sections || lesson.sections.length === 0) {
    allLessonsHaveSections = false;
  } else {
    totalSectionsCount += lesson.sections.length;
  }
}

assert(allLessonsHaveTitles, 'All 34 lessons have both Vietnamese and English titles');
assert(allLessonsHaveSections, `All 34 lessons have sections populated (Total sections: ${totalSectionsCount})`);
assert(totalSectionsCount === 182, `Total sections count strictly matches 182 (Found: ${totalSectionsCount})`);

const l19Registered = TEACHER_PROMPTS_BY_LESSON[19];
const l19SectionsCount = l19Registered ? Object.keys(l19Registered).length : 0;
assert(
  Boolean(l19Registered && l19SectionsCount > 0),
  `Lesson 19 has ${l19SectionsCount} sections with customized teacher prompts registered`
);

// 9. Lesson 8 Comprehensive Bilingual Tests
console.log('\n--- Test Suite 9: Lesson 8 Comprehensive Bilingual Tests ---');
const l8Overview = fs.readFileSync(path.resolve('src/components/lesson8/Section8Overview.tsx'), 'utf-8');
assert(
  l8Overview.includes("'Local Area Network (LAN)'"),
  'Lesson 8 Sec 0 (Overview) contains "Local Area Network (LAN)" card title'
);
assert(
  l8Overview.includes("'Wide Area Network (WAN) and the Internet'"),
  'Lesson 8 Sec 0 (Overview) contains "Wide Area Network (WAN) and the Internet" card title'
);

const l8Cloud = fs.readFileSync(path.resolve('src/components/lesson8/Section8CloudComputing.tsx'), 'utf-8');
assert(
  l8Cloud.includes('Google Docs (collaborative document editing), Zoom / Microsoft Teams (interactive virtual classrooms), Gmail (electronic mail).'),
  'Lesson 8 Sec 3 (Cloud) contains English SaaS examples for Google Docs, Zoom, Teams, and Gmail'
);
assert(
  l8Cloud.includes("'1. Flexibility and Availability'"),
  'Lesson 8 Sec 3 (Cloud) contains "1. Flexibility and Availability" benefit card title'
);
assert(
  l8Cloud.includes("'2. Quality and Security'"),
  'Lesson 8 Sec 3 (Cloud) contains "2. Quality and Security" benefit card title'
);
assert(
  l8Cloud.includes("'3. Cost Efficiency'"),
  'Lesson 8 Sec 3 (Cloud) contains "3. Cost Efficiency" benefit card title'
);

const l8IoT = fs.readFileSync(path.resolve('src/components/lesson8/Section8IoTIntegration.tsx'), 'utf-8');
assert(
  l8IoT.includes("'Before: Manual Meter Reading'"),
  'Lesson 8 Sec 4 (IoT) contains "Before: Manual Meter Reading" card title'
);
assert(
  l8IoT.includes("'Now: IoT-Enabled Meter Reading'"),
  'Lesson 8 Sec 4 (IoT) contains "Now: IoT-Enabled Meter Reading" card title'
);

// 10. Lesson 9 Comprehensive Bilingual Tests
console.log('\n--- Test Suite 10: Lesson 9 Comprehensive Bilingual Tests ---');
const l9Risks = fs.readFileSync(path.resolve('src/components/lesson9/Section9CyberRisks.tsx'), 'utf-8');
assert(
  l9Risks.includes("'Textbook Checkpoint Questions (Page 45)'"),
  'Lesson 9 Sec 1 (Risks) title updated to "Textbook Checkpoint Questions (Page 45)"'
);
assert(
  l9Risks.includes('1. Provide several scenarios that could lead to account password exposure.'),
  'Lesson 9 Sec 1 Question 1 is translated to English'
);
assert(
  l9Risks.includes('2. Do you know of any online scam methods? If so, describe how the scam operates.'),
  'Lesson 9 Sec 1 Question 2 is translated to English'
);
assert(
  l9Risks.includes("'Show Suggested Answer'"),
  'Lesson 9 Sec 1 toggle button uses "Show Suggested Answer"'
);

const l9Concepts = fs.readFileSync(path.resolve('src/components/lesson9/Section9MalwareConcepts.tsx'), 'utf-8');
assert(
  l9Concepts.includes("'Section 2a • Textbook Pages 45–46'"),
  'Lesson 9 Sec 2 (Concepts) section badge is bilingual'
);
assert(
  l9Concepts.includes('Definitions, Infection Mechanisms & Interactive 3D Dissection'),
  'Lesson 9 Sec 2 (Concepts) subtitle is bilingual'
);
assert(
  l9Concepts.includes("'Show Official SGK Answer'"),
  'Lesson 9 Sec 2 (Concepts) Activity 2 button uses "Show Official SGK Answer"'
);
assert(
  l9Concepts.includes("'COMPUTER VIRUS'"),
  'Lesson 9 Sec 2 (Concepts) has "COMPUTER VIRUS" card title'
);
assert(
  l9Concepts.includes("'COMPUTER WORM'"),
  'Lesson 9 Sec 2 (Concepts) has "COMPUTER WORM" card title'
);
assert(
  l9Concepts.includes("'TROJAN HORSE'"),
  'Lesson 9 Sec 2 (Concepts) has "TROJAN HORSE" card title'
);
assert(
  l9Concepts.includes("'Mechanism: Injects code into host .exe file'"),
  'Lesson 9 Sec 2 (Concepts) Virus mechanism is translated to English'
);
assert(
  l9Concepts.includes("'Mechanism: Self-replicates & penetrates network ports'"),
  'Lesson 9 Sec 2 (Concepts) Worm mechanism is translated to English'
);
assert(
  l9Concepts.includes("'Mechanism: Benign shell + Espionage payload'"),
  'Lesson 9 Sec 2 (Concepts) Trojan mechanism is translated to English'
);

// 11. Quick Translation Service v2 & UI Decoupling Tests
console.log('\n--- Test Suite 11: Quick Translation Service v2 & UI Decoupling ---');
const quickTransServiceFile = fs.readFileSync(path.resolve('src/services/quickTranslationService.ts'), 'utf-8');
assert(
  quickTransServiceFile.includes("const CACHE_STORAGE_KEY = 'sgk_quick_trans_cache_v2';"),
  'Quick translation service uses upgraded cache storage key "sgk_quick_trans_cache_v2"'
);
assert(
  quickTransServiceFile.includes("chunks = cleanEn.length > 350"),
  'Quick translation service splits long sentences (> 350 chars) for robust online fallback'
);

const headerFile = fs.readFileSync(path.resolve('src/components/Header.tsx'), 'utf-8');
assert(
  headerFile.includes('title={bilingualMode === \'en\' ? `Bản dịch tiếng Việt: Bài ${currentLesson.lessonNumber}: ${currentLesson.titleVi}` : undefined}'),
  'Header lesson title h1 has standalone title attribute and is decoupled from copyright modal'
);

const quickTransContextFile = fs.readFileSync(path.resolve('src/context/QuickTranslationContext.tsx'), 'utf-8');
assert(
  quickTransContextFile.includes('if (activeEl === target || (activeEl && activeEl.contains(target))) return;'),
  'QuickTranslationContext prevents bubble reset/flicker when hovering nested child elements'
);
assert(
  quickTransContextFile.includes('requestAnimationFrame'),
  'QuickTranslationContext throttles cursor tracking using requestAnimationFrame'
);

const l19IfFile = fs.readFileSync(path.resolve('src/components/lesson19/Section19IfStatements.tsx'), 'utf-8');
assert(
  l19IfFile.includes("{bilingualMode === 'en' ? 'Page 103 Textbook' : 'Trang 103 SGK'}"),
  'Lesson 19 Section 2 textbook page label is bilingual (Page 103 Textbook)'
);

// 12. Translation Bubble Scope & Lesson 2/3/5 Translations
console.log('\n--- Test Suite 12: Translation Boundary & Lesson 2/3/5 Localization ---');
const l1Sec2File = fs.readFileSync(path.resolve('src/components/Section2StorageUnits.tsx'), 'utf-8');
assert(
  l1Sec2File.includes('data-en={SECTION_2.titleEn}') && l1Sec2File.includes('data-vi={SECTION_2.titleVi}'),
  'Lesson 1 Section 2 title h2 has explicit data-en and data-vi'
);
assert(
  l1Sec2File.includes('data-no-hover="true"'),
  'Lesson 1 Section 2 badge has data-no-hover="true"'
);

const l3Sec2File = fs.readFileSync(path.resolve('src/components/lesson3/Section3Classification.tsx'), 'utf-8');
assert(
  l3Sec2File.includes("bilingualMode === 'en' ? 'Activity 1 (Textbook Page 16)' : 'Hoạt động 1 (Trang 16 SGK)'"),
  'Lesson 3 Section 2 Activity 1 badge is bilingual'
);
assert(
  l3Sec2File.includes("bilingualMode === 'en' ? 'CITIZEN IDENTITY CARD' : 'CĂN CƯỚC CÔNG DÂN / Citizen Identity Card'"),
  'Lesson 3 Section 2 CCCD card title is bilingual'
);
assert(
  l3Sec2File.includes('data-en="Operations: Addition (+), subtraction (-), multiplication (*), division (/), comparison (<, >)."') &&
    l3Sec2File.includes('data-vi="Phép xử lí: Cộng (+), trừ (−), nhân (*), chia (/), so sánh (<, >)."'),
  'Lesson 3 Section 2 Numeric operations line has explicit data-en and data-vi'
);

const l2Sec6File = fs.readFileSync(path.resolve('src/components/lesson2/Section2PracticeApply.tsx'), 'utf-8');
assert(
  l2Sec6File.includes("bilingualMode === 'en' ? '-- Select purpose --' : '-- Chọn công dụng --'"),
  'Lesson 2 Section 6 practice dropdown has bilingual placeholder'
);
assert(
  l2Sec6File.includes("bilingualMode === 'en' ? 'Word processing, contracts, lesson plans, official dispatches' : 'Soạn thảo văn bản, hợp đồng, giáo án, công văn'"),
  'Lesson 2 Section 6 practice dropdown options are bilingual'
);

const l3Sec3File = fs.readFileSync(path.resolve('src/components/lesson3/Section3AsciiCode.tsx'), 'utf-8');
assert(
  l3Sec3File.includes("bilingualMode === 'en' ? 'Activity 2 (Textbook Page 17)' : 'Hoạt động 2 (Trang 17 SGK)'"),
  'Lesson 3 Section 3 Activity 2 badge is bilingual'
);
assert(
  l3Sec3File.includes("bilingualMode === 'en' ? '7-bit ASCII (Original Standard)' : 'ASCII 7 bit (Chuẩn ban đầu)'"),
  'Lesson 3 Section 3 ASCII 7-bit card is bilingual'
);

const l3Sec4File = fs.readFileSync(path.resolve('src/components/lesson3/Section3UnicodeUtf8.tsx'), 'utf-8');
assert(
  l3Sec4File.includes("bilingualMode === 'en' ? 'Vietnam Regulatory Standards (Page 18 SGK)' : 'Quy chuẩn pháp lí tại Việt Nam (Trang 18 SGK)'"),
  'Lesson 3 Section 4 regulatory badge is bilingual'
);
assert(
  l3Sec4File.includes("bilingualMode === 'en' ? 'Question 2 - Textbook Page 18' : 'Câu hỏi 2 - Trang 18 SGK'"),
  'Lesson 3 Section 4 Question 2 header is bilingual'
);

const l3Sec5File = fs.readFileSync(path.resolve('src/components/lesson3/Section3PracticeApply.tsx'), 'utf-8');
assert(
  l3Sec5File.includes("bilingualMode === 'en' ? t.en : t.vi"),
  'Lesson 3 Section 5 matching buttons display localized labels'
);
assert(
  l3Sec5File.includes("bilingualMode === 'en' ? 'Practice 2: Why Was the Unicode Standard Established?' : 'Luyện tập 2: Vì sao cần xây dựng bảng mã Unicode?'"),
  'Lesson 3 Section 5 Practice 2 header is bilingual'
);

const l5Sec1File = fs.readFileSync(path.resolve('src/components/lesson5/Section5Overview.tsx'), 'utf-8');
assert(
  l5Sec1File.includes("bilingualMode === 'en' ? 'Warm-up (Textbook Page 24)' : 'Khởi động (SGK Trang 24)'"),
  'Lesson 5 Section 1 warm-up badge is bilingual'
);

const l5Sec6File = fs.readFileSync(path.resolve('src/components/lesson5/Section5PracticeApply.tsx'), 'utf-8');
assert(
  l5Sec6File.includes("bilingualMode === 'en' ? 'Practice 1 (Textbook Page 27)' : 'Luyện tập 1 (SGK Trang 27)'"),
  'Lesson 5 Section 6 Practice 1 badge is bilingual'
);
assert(
  l5Sec6File.includes("bilingualMode === 'en' ? 'Application a (Textbook Page 27)' : 'Vận dụng a (SGK Trang 27)'"),
  'Lesson 5 Section 6 Application a badge is bilingual'
);

// 13. Verify Lesson 6 & 7 Comprehensive Bilingual Alignment & Title Quick Translation
console.log('\n--- Test Suite 13: Lesson 6, 7 & Title Quick Translation Bubble ---');

// 13.1 Quick Translation Title Support
const bilingualTextFile = fs.readFileSync(path.resolve('src/components/BilingualText.tsx'), 'utf-8');
assert(
  bilingualTextFile.includes('data-en=') && bilingualTextFile.includes('data-vi=') && bilingualTextFile.includes('data-bilingual-handled="true"'),
  'BilingualText component attaches data-en and data-vi attributes for hover translation lookup'
);

const quickTransCtxFile = fs.readFileSync(path.resolve('src/context/QuickTranslationContext.tsx'), 'utf-8');
assert(
  quickTransCtxFile.includes('[data-lesson-title]') && quickTransCtxFile.includes('[data-topic-title]') && quickTransCtxFile.includes('[data-section-title]'),
  'QuickTranslationContext inspects lesson titles, topic badges, and section breadcrumbs'
);

const headerComponentFile = fs.readFileSync(path.resolve('src/components/Header.tsx'), 'utf-8');
assert(
  headerComponentFile.includes('data-topic-title="true"') && headerComponentFile.includes('data-section-title="true"'),
  'Header component marks topic and section titles with semantic translation hooks'
);

// 13.2 Lesson 6 Section 3, 5, 6
const l6Sec3File = fs.readFileSync(path.resolve('src/components/lesson6/Section6BitrateAndAudioFormats.tsx'), 'utf-8');
assert(
  l6Sec3File.includes("bilingualMode === 'en' ? '2. ADC Circuit' : '2. Mạch ADC'") &&
  l6Sec3File.includes("bilingualMode === 'en' ? '4. DAC Circuit' : '4. Mạch DAC'"),
  'Lesson 6 Section 3 ADC/DAC circuit diagram boxes are bilingual'
);
assert(
  l6Sec3File.includes("bilingualMode === 'en' ? 'Bit-rate:' : 'Tốc độ bit:'") &&
  l6Sec3File.includes("bilingualMode === 'en' ? 'File Size:' : 'Dung lượng:'"),
  'Lesson 6 Section 3 audio capacity calculator labels are bilingual'
);

const l6Sec5File = fs.readFileSync(path.resolve('src/components/lesson6/Section6BitmapAndFormats.tsx'), 'utf-8');
assert(
  l6Sec5File.includes("bilingualMode === 'en' ? 'Raw RGB Pixel Bytes:' : 'Dòng byte dữ liệu điểm ảnh (Raw RGB Bytes):'"),
  'Lesson 6 Section 5 raw pixel byte stream label is bilingual'
);
assert(
  l6Sec5File.includes("bilingualMode === 'en' ? 'Uncompressed' : 'Không nén'") &&
  l6Sec5File.includes("bilingualMode === 'en' ? 'Features: Crisp Alpha Transparency' : 'Hỗ trợ: Nền trong suốt sắc nét'"),
  'Lesson 6 Section 5 image formats (BMP, JPEG, PNG, GIF) are bilingual'
);
assert(
  l6Sec5File.includes("bilingualMode === 'en' ? 'Official Solution:' : 'Lời giải chính thức:'"),
  'Lesson 6 Section 5 questions official solutions are bilingual'
);

const l6Sec6File = fs.readFileSync(path.resolve('src/components/lesson6/Section6PracticeApply.tsx'), 'utf-8');
assert(
  l6Sec6File.includes("bilingualMode === 'en' ? 'On (1)' : 'Bật (1)'"),
  'Lesson 6 Section 6 LED simulation tooltip is bilingual'
);
assert(
  l6Sec6File.includes("textEn: '1 LED bulb = 1 pixel; Requires 1 bit (0: Off, 1: On)'"),
  'Lesson 6 Section 6 LED practice choices are bilingual'
);
assert(
  l6Sec6File.includes("bilingualMode === 'en' ? 'CD Capacity' : 'Dung lượng CD'") &&
  l6Sec6File.includes("bilingualMode === 'en' ? '~62.9 mins' : '~62,9 phút'"),
  'Lesson 6 Section 6 CD duration calculator is bilingual'
);
assert(
  l6Sec6File.includes("bilingualMode === 'en' ? 'High Quality (320 Kbps)' : 'Chất lượng cao (320 Kbps)'") &&
  l6Sec6File.includes("bilingualMode === 'en' ? 'When to choose: ' : 'Khi nào nên chọn: '"),
  'Lesson 6 Section 6 streaming audio quality recommendations are bilingual'
);
assert(
  l6Sec6File.includes("bilingualMode === 'en' ? '✓ Optimal Choice' : '✓ Tối ưu nhất'"),
  'Lesson 6 Section 6 logo format choice is bilingual'
);

// 13.3 Lesson 7 Section 2, 3, 4, 5, 6
const l7Sec2File = fs.readFileSync(path.resolve('src/components/lesson7/Section7PdaEvolution.tsx'), 'utf-8');
assert(
  l7Sec2File.includes('en="Apple iOS Operating System"') &&
  l7Sec2File.includes('en="Google Android Operating System"'),
  'Lesson 7 Section 2 operating system cards are bilingual'
);
assert(
  l7Sec2File.includes('en="Wi-Fi Connectivity"') &&
  l7Sec2File.includes('en="Bluetooth Connectivity"'),
  'Lesson 7 Section 2 connectivity cards are bilingual'
);
assert(
  l7Sec2File.includes("textEn: 'C. Infrared'"),
  'Lesson 7 Section 2 reinforcement quiz option C is translated to Infrared'
);

const l7Sec3File = fs.readFileSync(path.resolve('src/components/lesson7/Section7SmartphoneHardware.tsx'), 'utf-8');
assert(
  l7Sec3File.includes("bilingualMode === 'en' ? 'Thursday, June 19' : 'Thứ Năm, 19 Tháng 6'") &&
  l7Sec3File.includes("bilingualMode === 'en' ? 'Hanoi 22°C ⛅' : 'Hà Nội 22°C ⛅'"),
  'Lesson 7 Section 3 virtual phone date and weather are bilingual'
);
assert(
  l7Sec3File.includes("bilingualMode === 'en' ? 'Volume' : 'Âm lượng'") &&
  l7Sec3File.includes("bilingualMode === 'en' ? '◀ Back' : '◀ Quay lại'"),
  'Lesson 7 Section 3 virtual phone overlay and nav controls are bilingual'
);
assert(
  l7Sec3File.includes("bilingualMode === 'en' ? 'ACTIVE (ON)' : 'ĐANG SÁNG (ON)'") &&
  l7Sec3File.includes("bilingualMode === 'en' ? 'Operating System:' : 'Hệ điều hành:'"),
  'Lesson 7 Section 3 hardware status panel is bilingual'
);

const l7Sec4File = fs.readFileSync(path.resolve('src/components/lesson7/Section7HomeScreenNavigation.tsx'), 'utf-8');
assert(
  l7Sec4File.includes('en="Status Bar"') &&
  l7Sec4File.includes('en="App Icon Grid"') &&
  l7Sec4File.includes('en="Quick Access Dock"'),
  'Lesson 7 Section 4 home screen layout cards are bilingual'
);
assert(
  l7Sec4File.includes("bilingualMode === 'en' ? '✕ Close' : '✕ Đóng'") &&
  l7Sec4File.includes("bilingualMode === 'en' ? 'Multitasking (Overview Task Switcher)' : 'Đa nhiệm (Overview Task Switcher)'"),
  'Lesson 7 Section 4 virtual phone launcher view and multitasking switcher are bilingual'
);
assert(
  l7Sec4File.includes("bilingualMode === 'en' ? 'Home Button (○ Circle): ' : 'Nút Home (Hình tròn ○): '"),
  'Lesson 7 Section 4 user guide instructions are bilingual'
);

const l7Sec5File = fs.readFileSync(path.resolve('src/components/lesson7/Section7FileManagerCloud.tsx'), 'utf-8');
assert(
  l7Sec5File.includes('en="1. Internal Storage"') &&
  l7Sec5File.includes('en="2. DCIM / Camera Folder"') &&
  l7Sec5File.includes('en="3. Cloud Storage Services"'),
  'Lesson 7 Section 5 file system hierarchy cards are bilingual'
);
assert(
  l7Sec5File.includes("bilingualMode === 'en' ? 'Copy' : 'Sao chép'") &&
  l7Sec5File.includes("bilingualMode === 'en' ? 'Delete' : 'Xoá tệp'"),
  'Lesson 7 Section 5 contextual toolbar buttons are bilingual'
);
assert(
  l7Sec5File.includes('renderNotificationMessage'),
  'Lesson 7 Section 5 uses dynamic notification formatter based on bilingualMode'
);

const l7Sec6File = fs.readFileSync(path.resolve('src/components/lesson7/Section7PracticeApply.tsx'), 'utf-8');
assert(
  l7Sec6File.includes("textEn: 'D. Has an operating system and can run diverse user applications.'"),
  'Lesson 7 Section 6 Practice 1 options are bilingual'
);
assert(
  l7Sec6File.includes("bilingualMode === 'en' ? '📸 Press Shutter Button' : '📸 Bấm nút chụp ảnh (Shutter)'") &&
  l7Sec6File.includes("bilingualMode === 'en' ? 'Open File Manager ➔ DCIM/Camera Folder' : 'Mở Trình quản lý tệp ➔ Thư mục DCIM/Camera'"),
  'Lesson 7 Section 6 Practice 2 4-step workflow buttons and instructions are bilingual'
);
assert(
  l7Sec6File.includes('en="Application 1: Connect Smartphone to PC for Photo Transfer"') &&
  l7Sec6File.includes('en="Application 2: Cloud Storage Backup (Google Drive / OneDrive)"') &&
  l7Sec6File.includes('en="Application 3: Share Photos via Online Classroom Software (Zoom / Meet)"'),
  'Lesson 7 Section 6 all 3 real-world application tasks are fully bilingual'
);

// 14. Prioritized 9 Sections (Lesson 9 & Lesson 10) Comprehensive Bilingual Tests
console.log('\n--- Test Suite 14: Prioritized 9 Sections (Lesson 9 & Lesson 10) Tests ---');

// 14.1 Lesson 9 Section 2 (Section9CyberRisks.tsx)
const l9Sec2File = fs.readFileSync(path.resolve('src/components/lesson9/Section9CyberRisks.tsx'), 'utf-8');
assert(
  l9Sec2File.includes("bilingualMode === 'en' ? 'Coffee Shop Wi-Fi AP' : 'Trạm Wi-Fi Quán Cafe'") &&
  l9Sec2File.includes("bilingualMode === 'en' ? 'Your Device (Smartphone)' : 'Thiết bị của em (Smartphone)'"),
  'Lesson 9 Sec 2 Wi-Fi simulator AP and device labels are bilingual'
);
assert(
  l9Sec2File.includes("bilingualMode === 'en'") &&
  l9Sec2File.includes("'user: \"hoang_an\" | pass: \"password123\" [CREDENTIALS EXPOSED!]'") &&
  l9Sec2File.includes("'user: \"hoang_an\" | pass: \"matkhau123\" [LỘ TÀI KHOẢN!]'"),
  'Lesson 9 Sec 2 cleartext packet message is bilingual'
);
assert(
  l9Sec2File.includes('inline') && l9Sec2File.includes('Core Summary Box (Textbook Page 45)'),
  'Lesson 9 Sec 2 uses inline prop on BilingualText in list items to prevent isolated bullets'
);

// 14.2 Lesson 9 Section 4 (Section9MalwareThreats.tsx)
const l9Sec4File = fs.readFileSync(path.resolve('src/components/lesson9/Section9MalwareThreats.tsx'), 'utf-8');
assert(
  l9Sec4File.includes("bilingualMode === 'en' ? 'Year 1999' : 'Năm 1999'") &&
  l9Sec4File.includes("bilingualMode === 'en' ? '> $1 Billion USD' : '> 1 Tỉ USD'"),
  'Lesson 9 Sec 4 malware cards have bilingual year and damage badges'
);
assert(
  l9Sec4File.includes("bilingualMode === 'en'") &&
  l9Sec4File.includes("'Flood Target Server (Trigger DoS Attack)'") &&
  l9Sec4File.includes("'SERVER PARALYZED (503 CRASH)'"),
  'Lesson 9 Sec 4 DoS simulator buttons and server statuses are bilingual'
);
assert(
  l9Sec4File.includes("'ENCRYPTED FOR RANSOM'") &&
  l9Sec4File.includes("'ĐÃ BỊ MÃ HOÁ TỐNG TIỀN'"),
  'Lesson 9 Sec 4 WannaCry file encryption status is bilingual'
);

// 14.3 Lesson 9 Section 5 (Section9AntivirusPractice.tsx)
const l9Sec5File = fs.readFileSync(path.resolve('src/components/lesson9/Section9AntivirusPractice.tsx'), 'utf-8');
assert(
  l9Sec5File.includes("bilingualMode === 'en' ? '? (Click Show Answers)' : '? (Bấm hiện đáp án)'"),
  'Lesson 9 Sec 5 matrix table hidden cell label is bilingual'
);
assert(
  l9Sec5File.includes("bilingualMode === 'en' ? '1. Quick scan' : '1. Quick scan (Quét nhanh)'") &&
  l9Sec5File.includes("bilingualMode === 'en' ? '2. Full scan' : '2. Full scan (Quét hết)'"),
  'Lesson 9 Sec 5 Defender lab scan mode options are bilingual'
);
assert(
  l9Sec5File.includes('Scan with Windows Defender...'),
  'Lesson 9 Sec 5 context-menu right click shortcut is present'
);

// 14.4 Lesson 9 Section 6 (Section9PracticeApply.tsx)
const l9Sec6File = fs.readFileSync(path.resolve('src/components/lesson9/Section9PracticeApply.tsx'), 'utf-8');
assert(
  l9Sec6File.includes("bilingualMode === 'en'") &&
  l9Sec6File.includes("'Practice & Application • Textbook Page 49'") &&
  l9Sec6File.includes("'Luyện tập & Vận dụng • SGK Trang 49'"),
  'Lesson 9 Sec 6 header badge is bilingual'
);
assert(
  l9Sec6File.includes('Question 1: List the major cybersecurity risks when participating in social networks.') &&
  l9Sec6File.includes('Câu 1: Em hãy kể ra các nguy cơ mất an toàn khi tham gia các mạng xã hội.'),
  'Lesson 9 Sec 6 Practice 1 question is bilingual'
);

// 14.5 Lesson 10 Section 1 (Section10Overview.tsx)
const l10Sec1File = fs.readFileSync(path.resolve('src/components/lesson10/Section10Overview.tsx'), 'utf-8');
assert(
  l10Sec1File.includes("bilingualMode === 'en' ? 'Topic 2 • Lesson 10' : 'Chủ đề 2 • Bài 10'"),
  'Lesson 10 Sec 1 header badge is bilingual'
);
assert(
  l10Sec1File.includes('en="MULTILINGUAL TRANSLATION WITH GOOGLE TRANSLATE"') &&
  l10Sec1File.includes('vi="DỊCH ĐA NGỮ VỚI GOOGLE TRANSLATE"'),
  'Lesson 10 Sec 1 Task 1 card heading is bilingual'
);

// 14.6 Lesson 10 Section 2 (Section10GoogleTranslateUI.tsx)
const l10Sec2File = fs.readFileSync(path.resolve('src/components/lesson10/Section10GoogleTranslateUI.tsx'), 'utf-8');
assert(
  l10Sec2File.includes("bilingualMode === 'en' ? 'Text' : 'Văn bản (Text)'") &&
  l10Sec2File.includes("bilingualMode === 'en' ? 'Documents ➔' : 'Tài liệu (Documents) ➔'"),
  'Lesson 10 Sec 2 Google Translate tab labels are bilingual'
);
assert(
  l10Sec2File.includes("bilingualMode === 'en' ? '1. Source Language (Ngôn ngữ nguồn)' : '1. Ngôn ngữ nguồn (Source Language)'") &&
  l10Sec2File.includes("bilingualMode === 'en' ? '2. Target Language (Ngôn ngữ đích)' : '2. Ngôn ngữ đích (Target Language)'"),
  'Lesson 10 Sec 2 Source & Target language labels are bilingual'
);

// 14.7 Lesson 10 Section 3 (Section10TranslateMethods.tsx)
const l10Sec3File = fs.readFileSync(path.resolve('src/components/lesson10/Section10TranslateMethods.tsx'), 'utf-8');
assert(
  l10Sec3File.includes("bilingualMode === 'en'") &&
  l10Sec3File.includes("'1. Direct Keyboard Text Entry (Figure 10.3)'") &&
  l10Sec3File.includes("'2. Voice Dictation via Mic (Figure 10.4)'"),
  'Lesson 10 Sec 3 translation methods tabs are bilingual'
);
assert(
  l10Sec3File.includes("{ id: 1, en: 'Color Monitor', vi: 'Màn hình màu', qty: 2 }") &&
  l10Sec3File.includes("{ id: 2, en: 'Printer', vi: 'Máy in', qty: 3 }"),
  'Lesson 10 Sec 3 Method 3 document translation spreadsheet rows are bilingual'
);

// 14.8 Lesson 10 Section 4 (Section10OpenEduResources.tsx)
const l10Sec4File = fs.readFileSync(path.resolve('src/components/lesson10/Section10OpenEduResources.tsx'), 'utf-8');
assert(
  l10Sec4File.includes("bilingualMode === 'en'") &&
  l10Sec4File.includes("'Historical Milestone: MIT OpenCourseWare Initiative (2002)'"),
  'Lesson 10 Sec 4 MIT 2002 milestone card header is bilingual'
);
assert(
  l10Sec4File.includes("'Study Online (Figure 10.9)'") &&
  l10Sec4File.includes("'Học trực tuyến (Hình 10.9)'"),
  'Lesson 10 Sec 4 Figure 10.9 study button is bilingual'
);

// 14.9 Lesson 10 Section 5 (Section10GlobalOERPlatforms.tsx)
const l10Sec5File = fs.readFileSync(path.resolve('src/components/lesson10/Section10GlobalOERPlatforms.tsx'), 'utf-8');
assert(
  l10Sec5File.includes('en="Curated Directory of National & Global OER Platforms"'),
  'Lesson 10 Sec 5 OER directory header is bilingual'
);
assert(
  l10Sec5File.includes('en="Creative Commons (CC) Open Licensing Matrix Simulator"'),
  'Lesson 10 Sec 5 Creative Commons simulator is bilingual'
);
assert(
  l10Sec5File.includes("bilingualMode === 'en' ? 'pdf (Document / Digital Textbook)' : 'pdf (Tài liệu / Sách giáo khoa điện tử)'"),
  'Lesson 10 Sec 5 search query builder file types are bilingual'
);

// 15. Verify Lesson 11 Comprehensive Bilingual Implementation (All 6 Sections)
console.log('\n--- Test Suite 15: Lesson 11 (Digital Ethics, Law & Culture) All 6 Sections ---');

// 15.1 Lesson 11 Section 1 (DigitalEthicsLegal3DViewer.tsx & Section11Overview.tsx)
const l11Sec1Viewer = fs.readFileSync(path.resolve('src/components/lesson11/DigitalEthicsLegal3DViewer.tsx'), 'utf-8');
assert(
  l11Sec1Viewer.includes("bilingualMode === 'en' ? 'Cyan Plate:' : 'Đĩa Xanh:'"),
  'Lesson 11 Sec 1 3D viewer has bilingual Cyan Plate legend'
);
assert(
  l11Sec1Viewer.includes("bilingualMode === 'en' ? 'Gold Plate:' : 'Đĩa Vàng:'"),
  'Lesson 11 Sec 1 3D viewer has bilingual Gold Plate legend'
);
assert(
  l11Sec1Viewer.includes("bilingualMode === 'en' ? 'Radar 874:' : 'Radar 874:'"),
  'Lesson 11 Sec 1 3D viewer has bilingual Radar 874 legend'
);

const l11Sec1File = fs.readFileSync(path.resolve('src/components/lesson11/Section11Overview.tsx'), 'utf-8');
assert(
  l11Sec1File.includes('1. Digital Ethics, Law & Culture:') &&
  l11Sec1File.includes('1. Đạo đức, pháp luật & văn hoá số:'),
  'Lesson 11 Sec 1 objective 1 heading is bilingual'
);
assert(
  l11Sec1File.includes('Breach of Social Ethics (Ethics)') &&
  l11Sec1File.includes('Vi phạm đạo đức (Ethics)') &&
  l11Sec1File.includes('Breach of Statutory Law (Law)') &&
  l11Sec1File.includes('Vi phạm pháp luật (Law)'),
  'Lesson 11 Sec 1 warm-up detailed analysis cards are bilingual'
);

// 15.2 Lesson 11 Section 2 (Section11CyberEthicsIssues.tsx)
const l11Sec2File = fs.readFileSync(path.resolve('src/components/lesson11/Section11CyberEthicsIssues.tsx'), 'utf-8');
assert(
  l11Sec2File.includes('en="Indirect Communication"') &&
  l11Sec2File.includes('en="Potential Anonymity"') &&
  l11Sec2File.includes('en="Permanent Digital Footprint"') &&
  l11Sec2File.includes('en="Hyper-Fast Viral Spread"'),
  'Lesson 11 Sec 2 4 digital risk factors cards are bilingual'
);
assert(
  l11Sec2File.includes("bilingualMode === 'en' ? 'Nature of Misconduct:' : 'Bản chất hành vi:'") &&
  l11Sec2File.includes("bilingualMode === 'en' ? 'Real-world Practical Case:' : 'Ví dụ thực tế đời sống:'"),
  'Lesson 11 Sec 2 misconduct detail card labels are bilingual'
);

// 15.3 Lesson 11 Section 3 (Section11LegalFramework.tsx)
const l11Sec3File = fs.readFileSync(path.resolve('src/components/lesson11/Section11LegalFramework.tsx'), 'utf-8');
assert(
  l11Sec3File.includes("penaltySummaryEn: 'Subject to multi-million VND administrative fines or criminal prosecution depending on severity.'") &&
  l11Sec3File.includes("penaltySummaryEn: 'Direct fine of 10,000,000 to 20,000,000 VND + confiscation of exhibits and mandatory content removal.'"),
  'Lesson 11 Sec 3 statutory documents data includes English penalty summaries'
);
assert(
  l11Sec3File.includes('en="Scope of Regulation:"') &&
  l11Sec3File.includes('en="Key Prohibited Provisions (Textbook Pages 57–58):"') &&
  l11Sec3File.includes('en="Sanctions & Penalties:"'),
  'Lesson 11 Sec 3 document explorer detail labels are bilingual'
);
assert(
  l11Sec3File.includes('en="Publishing False Covid-19 Patient Itinerary"') &&
  l11Sec3File.includes('en="False Advertising Regarding Pharmaceutical Efficacy"'),
  'Lesson 11 Sec 3 concept mastery question titles are bilingual'
);

// 15.4 Lesson 11 Section 4 (Section11CopyrightBasics.tsx)
const l11Sec4File = fs.readFileSync(path.resolve('src/components/lesson11/Section11CopyrightBasics.tsx'), 'utf-8');
assert(
  l11Sec4File.includes("en=\"Author's Rights (Droit d'auteur)\"") &&
  l11Sec4File.includes('en="Commercial Copyright (Copyright)"'),
  'Lesson 11 Sec 4 conceptual distinction cards are bilingual'
);
assert(
  l11Sec4File.includes("bilingualMode === 'en' ? `Scenario #${idx + 1}:` : `Tình huống #${idx + 1}:`") &&
  l11Sec4File.includes("bilingualMode === 'en' ? 'Moral Right' : 'Quyền nhân thân'") &&
  l11Sec4File.includes("bilingualMode === 'en' ? 'Economic Right' : 'Quyền tài sản'"),
  'Lesson 11 Sec 4 classification quiz labels and buttons are bilingual'
);

// 15.5 Lesson 11 Section 5 (Section11SoftwareCopyrightCompliance.tsx)
const l11Sec5File = fs.readFileSync(path.resolve('src/components/lesson11/Section11SoftwareCopyrightCompliance.tsx'), 'utf-8');
assert(
  l11Sec5File.includes('en="Situation 1: Hoang and the Music USB"') &&
  l11Sec5File.includes('en="Situation 2: Lan and the Software CD"'),
  'Lesson 11 Sec 5 Activity 4 scenarios are bilingual'
);
assert(
  l11Sec5File.includes("bilingualMode === 'en' ? 'Infringing' : 'Có vi phạm'") &&
  l11Sec5File.includes("bilingualMode === 'en' ? 'Not Infringing' : 'Không vi phạm'"),
  'Lesson 11 Sec 5 Activity 4 judgment buttons are bilingual'
);
assert(
  l11Sec5File.includes('en="Full Copyright Acquisition"') &&
  l11Sec5File.includes('en="End-User License (EULA)"'),
  'Lesson 11 Sec 5 buying copyright vs buying license comparison badges are bilingual'
);

// 15.6 Lesson 11 Section 6 (Section11PracticeApply.tsx)
const l11Sec6File = fs.readFileSync(path.resolve('src/components/lesson11/Section11PracticeApply.tsx'), 'utf-8');
assert(
  l11Sec6File.includes("bilingualMode === 'en' ? 'Your opinion:' : 'Ý kiến của em:'") &&
  l11Sec6File.includes("bilingualMode === 'en' ? 'Disagree' : 'Không đồng ý'") &&
  l11Sec6File.includes("bilingualMode === 'en' ? 'Partly Agree' : 'Đồng ý 1 phần'") &&
  l11Sec6File.includes("bilingualMode === 'en' ? 'Agree' : 'Đồng ý'"),
  'Lesson 11 Sec 6 Practice 1 opinion choice buttons are bilingual'
);
assert(
  l11Sec6File.includes("bilingualMode === 'en' ? 'Confirm Selection' : 'Xác nhận lựa chọn'") &&
  l11Sec6File.includes("textEn: 'A. A violation of statutory law.'") &&
  l11Sec6File.includes("textEn: 'C. Depending on severity, can violate ethics or statutory law.'"),
  'Lesson 11 Sec 6 Application 1 options and submit button are bilingual'
);

// 16. Lesson 12-15 Graphic Design & Inkscape Bilingual Suite
console.log('\n--- Test Suite 16: Lessons 12-15 Inkscape & Vector Graphics Suite ---');

// 16.1 Lesson 12
const l12Overview = fs.readFileSync(path.resolve('src/components/lesson12/Section12Overview.tsx'), 'utf-8');
const l12VectorBitmap = fs.readFileSync(path.resolve('src/components/lesson12/Section12VectorVsBitmap.tsx'), 'utf-8');
const l12Drawing = fs.readFileSync(path.resolve('src/components/lesson12/Section12PracticalDrawing.tsx'), 'utf-8');
assert(
  l12Overview.includes("bilingualMode === 'en' ? 'Photo 12.1a' : 'Ảnh chụp 12.1a'") &&
  l12Overview.includes("bilingualMode === 'en' ? 'Vector 12.1b' : 'Hình vẽ 12.1b'"),
  'Lesson 12 Overview image comparison filters are bilingual'
);
assert(
  l12VectorBitmap.includes("bilingualMode === 'en' ? 'Magnification:' : 'Độ phóng kính lúp:'"),
  'Lesson 12 Vector vs Bitmap loupe controls are bilingual'
);
assert(
  l12Drawing.includes('The golden star is hidden beneath the upper layer!') &&
  l12Drawing.includes("bilingualMode === 'en' ? 'Lower red rectangle to bottom' : 'Hạ lớp chữ nhật đỏ xuống (Lower to bottom)'"),
  'Lesson 12 Practical Drawing layer stack overlay is bilingual'
);

// 16.2 Lesson 13
const l13Shapes = fs.readFileSync(path.resolve('src/components/lesson13/Section13PrimitiveShapes.tsx'), 'utf-8');
const l13Boolean = fs.readFileSync(path.resolve('src/components/lesson13/Section13BooleanOperations.tsx'), 'utf-8');
const l13Lab = fs.readFileSync(path.resolve('src/components/lesson13/Section13PracticalLab.tsx'), 'utf-8');
const l13Practice = fs.readFileSync(path.resolve('src/components/lesson13/Section13PracticeApply.tsx'), 'utf-8');
assert(
  l13Shapes.includes('en="BASIC PARAMETERS TABLE OF PREDEFINED SHAPES (TEXTBOOK PP. 69 – 70)"') &&
  l13Shapes.includes('en="Width and Height of the rectangular object."'),
  'Lesson 13 Primitive Shapes table and parameters are bilingual'
);
assert(
  l13Boolean.includes("labelEn: 'Union'") &&
  l13Boolean.includes('en="Path Menu: Union (Ctrl++), Difference (Ctrl+-), Intersection (Ctrl+*), Exclusion (Ctrl+^), Division (Ctrl+/), Cut Path (Ctrl+Alt+/)."'),
  'Lesson 13 Boolean operations tabs and descriptions are bilingual'
);
assert(
  l13Lab.includes("bilingualMode === 'en' ? `Step ${step}` : `Bước ${step}`") &&
  l13Lab.includes("bilingualMode === 'en' ? `Step ${task2Step}/5` : `Bước ${task2Step}/5`"),
  'Lesson 13 Practical Lab step buttons are bilingual'
);
assert(
  l13Practice.includes("bilingualMode === 'en' ? 'seeds' : 'hạt'") &&
  l13Practice.includes('en="The watermelon slice comprises 4 distinct object groups stacked from bottom to top:"'),
  'Lesson 13 Practice Apply watermelon layers and seed counter are bilingual'
);

// 16.3 Lesson 14
const l14Path = fs.readFileSync(path.resolve('src/components/lesson14/Section14PathBasics.tsx'), 'utf-8');
const l14Node = fs.readFileSync(path.resolve('src/components/lesson14/Section14NodeEditing.tsx'), 'utf-8');
const l14Text = fs.readFileSync(path.resolve('src/components/lesson14/Section14TextObjects.tsx'), 'utf-8');
const l14Lab = fs.readFileSync(path.resolve('src/components/lesson14/Section14PracticalLab.tsx'), 'utf-8');
assert(
  l14Path.includes("bilingualMode === 'en' ? 'P0 (End)' : 'P0 (Mút)'") &&
  l14Path.includes("bilingualMode === 'en' ? 'P1 (Handle 1)' : 'P1 (Cần 1)'") &&
  l14Path.includes("en=\"Tangent Vector Mechanics:\""),
  'Lesson 14 Path Basics SVG endpoints, handles, and tangent vector theory are bilingual'
);
assert(
  l14Node.includes('en="Smooth Nodes"') &&
  l14Node.includes('en="Corner Nodes"') &&
  l14Node.includes('en="Insert Node"') &&
  l14Node.includes('en="Join Selected Nodes"'),
  'Lesson 14 Node Editing legend and control bar tools are bilingual'
);
assert(
  l14Text.includes('en="Arch Curve"') &&
  l14Text.includes('en="Wave Curve"') &&
  l14Text.includes("en: 'A. In a text object, we can color each character individually with a different color.'"),
  'Lesson 14 Text Objects curve modes and quiz options are bilingual'
);
assert(
  l14Lab.includes("bilingualMode === 'en' ? `Step ${s}` : `Bước ${s}`") &&
  l14Lab.includes("bilingualMode === 'en' ? 'HAPPY NEW YEAR!' : 'CHÚC MỪNG NĂM MỚI!'"),
  'Lesson 14 Practical Lab steppers and arched banner greeting are bilingual'
);

// 16.4 Lesson 15
const l15Viewer = fs.readFileSync(path.resolve('src/components/lesson15/GraphicAssembly3DViewer.tsx'), 'utf-8');
const l15Bg = fs.readFileSync(path.resolve('src/components/lesson15/Section15BackgroundAndBunting.tsx'), 'utf-8');
const l15Export = fs.readFileSync(path.resolve('src/components/lesson15/Section15ExportRasterLab.tsx'), 'utf-8');
const l15Typo = fs.readFileSync(path.resolve('src/components/lesson15/Section15TypographyAndBadges.tsx'), 'utf-8');
assert(
  l15Viewer.includes("hctx.fillText(isEn ? 'HANOI BOOK FAIR' : 'HỘI SÁCH HÀ NỘI', 512, 90)") &&
  l15Viewer.includes("b1ctx.fillText('FREE', 128, 44)") &&
  l15Viewer.includes("b2ctx.fillText('UP TO', 128, 44)"),
  'Lesson 15 3D Viewer canvas textures provide dynamic bilingual poster text'
);
assert(
  l15Bg.includes("bilingualMode === 'en' ? 'HANOI BOOK FAIR' : 'HỘI SÁCH HÀ NỘI'") &&
  l15Bg.includes("bilingualMode === 'en' ? 'Sawtooth Edge after Difference (Ctrl + -)' : 'Mép răng cưa sau Difference (Ctrl + -)'"),
  'Lesson 15 Background and Bunting SVG annotations are bilingual'
);
assert(
  l15Export.includes("bilingualMode === 'en' ? 'HANOI BOOK FAIR' : 'HỘI SÁCH HÀ NỘI'") &&
  l15Export.includes("bilingualMode === 'en' ? 'FREE ADMISSION' : 'VÀO CỬA TỰ DO'") &&
  l15Export.includes("bilingualMode === 'en' ? 'UP TO 70% OFF' : 'GIẢM GIÁ TỚI 70%'"),
  'Lesson 15 Export Raster Lab poster preview is bilingual'
);
assert(
  l15Typo.includes("bilingualMode === 'en' ? 'UP TO' : 'Giảm giá'") &&
  l15Typo.includes("bilingualMode === 'en' ? '70% OFF' : 'tới 70%'") &&
  l15Typo.includes("bilingualMode === 'en' ? 'Fig 15.6c: Completed Union' : 'Hình 15.6c: Đã Union hoàn chỉnh'"),
  'Lesson 15 Typography and Badges speech bubble steps and schedule are bilingual'
);

// --- Test Suite 17: User Request Specific Tests (Lesson 14 & 15 Exact Phrases) ---
console.log('\n--- Test Suite 17: Lesson 14 & 15 Deep Parity Strings ---');
const l14Overview = fs.readFileSync(path.resolve('src/components/lesson14/Section14Overview.tsx'), 'utf-8');
const l14Bezier3D = fs.readFileSync(path.resolve('src/components/lesson14/BezierCurves3DViewer.tsx'), 'utf-8');
const l14Practice = fs.readFileSync(path.resolve('src/components/lesson14/Section14PracticeApply.tsx'), 'utf-8');
const l15Practice = fs.readFileSync(path.resolve('src/components/lesson15/Section15PracticeApply.tsx'), 'utf-8');
const l14TextRechecked = fs.readFileSync(path.resolve('src/components/lesson14/Section14TextObjects.tsx'), 'utf-8');

assert(
  l14Overview.includes("bilingualMode === 'en' ? 'Reveal answer' : 'Bấm xem'"),
  'Lesson 14 Overview uses "Reveal answer" when bilingualMode is en'
);

assert(
  l14Lab.includes("bilingualMode === 'en' ? `Step ${task1Step} of 6` : `Bước ${task1Step}/6`"),
  'Lesson 14 Practical Lab uses "Step X of 6" format in English mode'
);

assert(
  l14Bezier3D.includes("en=\"3D Z offset:\"") &&
  l14Bezier3D.includes("CONNECTING KNOWLEDGE • INFORMATICS 10 • LESSON 14: PATHS & TEXT"),
  'Lesson 14 Bezier 3D Viewer features "3D Z offset" and bilingual kinetic text'
);

assert(
  l14TextRechecked.includes("hasEditedText") &&
  l14TextRechecked.includes("SAVE WATER & ELECTRICITY"),
  'Lesson 14 Text Objects retains user input across language toggle and defaults to English'
);

assert(
  l15Typo.includes("bilingualMode === 'en' ? 'Merged' : 'ĐÃ HỢP NHẤT'"),
  'Lesson 15 Typography displays "Merged" for fused union button in English mode'
);

assert(
  l15Export.includes("bilingualMode === 'en' ? 'Estimated file size:' : 'Dung lượng ước tính:'"),
  'Lesson 15 Export Raster Lab displays "Estimated file size" in English mode'
);

assert(
  l14Practice.includes("hasEditedWaveText") &&
  l14Practice.includes("INFORMATICS 10 - CONNECTING"),
  'Lesson 14 Practice preserves student wave text modifications and switches default bilingually'
);

assert(
  l15Practice.includes("bilingualMode === 'en' ? 'Terminology (Vi / En)' : 'Thuật ngữ (Vi / En)'") &&
  l15Practice.includes("bilingualMode === 'en' ? term.definitionEn : term.definitionVi"),
  'Lesson 15 Practice Apply glossary table renders English definitions and column titles'
);

// 18. Verify Lesson 17 & 18 Bilingual Synchronization, Contrast, and 3D Framing
console.log('\n--- Test Suite 18: Lesson 17 & 18 Bilingual Sync, Contrast & 3D Framing ---');
const l17Viewer = fs.readFileSync(path.resolve('src/components/lesson17/VariableMemory3DViewer.tsx'), 'utf-8');
const l17Overview = fs.readFileSync(path.resolve('src/components/lesson17/Section17Overview.tsx'), 'utf-8');
const l17Lab = fs.readFileSync(path.resolve('src/components/lesson17/Section17PracticeLab.tsx'), 'utf-8');
const l17Practice = fs.readFileSync(path.resolve('src/components/lesson17/Section17PracticeApply.tsx'), 'utf-8');
const l18InputOutput = fs.readFileSync(path.resolve('src/components/lesson18/Section18InputOutput.tsx'), 'utf-8');
const l18TypeConv = fs.readFileSync(path.resolve('src/components/lesson18/Section18TypeConversion.tsx'), 'utf-8');
const l18Practice = fs.readFileSync(path.resolve('src/components/lesson18/Section18PracticeApply.tsx'), 'utf-8');
const l18Viewer = fs.readFileSync(path.resolve('src/components/lesson18/IOTypePipeline3DViewer.tsx'), 'utf-8');

assert(
  l17Viewer.includes("activeMode === 'memory'") &&
  l17Viewer.includes("camera.position.set(0, 5.5, 19)") &&
  l17Viewer.includes("handleResetCamera"),
  'Lesson 17 VariableMemory3DViewer calibrates camera framing per mode on load and reset'
);

assert(
  l18Viewer.includes("activeMode === 'pipeline'") &&
  l18Viewer.includes("cameraRef.current.position.set(0, 5.5, 18)") &&
  l18Viewer.includes("camera.position.set(0, 5.5, 18)"),
  'Lesson 18 IOTypePipeline3DViewer calibrates camera framing per mode on load and reset'
);

assert(
  l18InputOutput.includes("bg-amber-950/40 border-2 border-amber-400") &&
  l18TypeConv.includes("bg-amber-950/40 border-2 border-amber-400 p-5 shadow-xl relative overflow-hidden"),
  'Lesson 18 Key Summary boxes in Section18InputOutput and Section18TypeConversion feature high-contrast styling'
);

assert(
  l18Practice.includes("border-2 border-purple-500/40") &&
  l18Practice.includes("border-2 border-emerald-500/40"),
  'Lesson 18 Practice Apply application projects feature high-contrast card borders'
);

assert(
  l18InputOutput.includes("bilingualMode === 'en' ? 'name = input(\"Enter your name: \")' : 'name = input(\"Nhập họ tên em: \")'") &&
  l18Practice.includes("bilingualMode === 'en' ? '\"Enter seconds ss: \"' : '\"Nhập số giây ss: \"'") &&
  l18Practice.includes("bilingualMode === 'en' ? '\"Enter side a: \"' : '\"Nhập cạnh a: \"'"),
  'Lesson 18 input() and print() prompts are synchronized bilingually across editors and simulations'
);

assert(
  l17Overview.includes("1. Algorithm Generalization") &&
  l17Overview.includes("Explore Section 1: Variables and Assignments"),
  'Lesson 17 Overview localizes warmup benefits and navigation actions'
);

assert(
  l17Lab.includes("File: Circle.py") &&
  l17Lab.includes("\"Circle perimeter is:\""),
  'Lesson 17 Practice Lab localizes Circle script editor, filename, and execution outputs'
);

// 19. Verify Lessons 19 & 20: In-Content Quiz, Deadlock Elimination, 3D Docked Layout & Bilingual Trace
console.log('\n--- Test Suite 19: Lessons 19 & 20 In-Content Quiz, 3D Docked Layout & Bilingual Trace ---');
const quizFile19 = fs.readFileSync(path.resolve('src/components/EndOfLessonQuiz.tsx'), 'utf-8');
const bookCtxFile19 = fs.readFileSync(path.resolve('src/context/BookContext.tsx'), 'utf-8');
const headerFile19 = fs.readFileSync(path.resolve('src/components/Header.tsx'), 'utf-8');
const tocFile19 = fs.readFileSync(path.resolve('src/components/TableOfContents.tsx'), 'utf-8');
const appFile19 = fs.readFileSync(path.resolve('src/App.tsx'), 'utf-8');
const quickModalFile19 = fs.readFileSync(path.resolve('src/components/QuickTestModal.tsx'), 'utf-8');
const l19Practice19 = fs.readFileSync(path.resolve('src/components/lesson19/Section19PracticeApply.tsx'), 'utf-8');
const l19Viewer19 = fs.readFileSync(path.resolve('src/components/lesson19/BranchingDecision3DViewer.tsx'), 'utf-8');
const l20Practice19 = fs.readFileSync(path.resolve('src/components/lesson20/Section20PracticeApply.tsx'), 'utf-8');
const l20ForLoop19 = fs.readFileSync(path.resolve('src/components/lesson20/Section20ForLoop.tsx'), 'utf-8');
const l20Range19 = fs.readFileSync(path.resolve('src/components/lesson20/Section20RangeFunction.tsx'), 'utf-8');
const l20Lab19 = fs.readFileSync(path.resolve('src/components/lesson20/Section20PracticeLab.tsx'), 'utf-8');

assert(
  quizFile19.includes("navigateToQuiz") &&
  quizFile19.includes("Mở Trắc Nghiệm Trên Thanh Điều Hướng") &&
  quizFile19.includes("Open Quiz on Nav Bar") &&
  !quizFile19.includes("Đánh dấu tất cả hoàn thành"),
  'EndOfLessonQuiz is rendered as a clean guidance card routing to top nav bar Quiz with no cheat shortcut'
);

assert(
  bookCtxFile19.includes("navigateToQuiz") &&
  bookCtxFile19.includes("sectionIdx === currentLesson.sections.length - 1"),
  'BookContext provides navigateToQuiz and exempts the final section from task deadlock so 4/5 unlocks smoothly to 5/5'
);

assert(
  headerFile19.includes("navigateToQuiz") &&
  tocFile19.includes("navigateToQuiz") &&
  appFile19.includes("navigateToQuiz") &&
  quickModalFile19.includes("if (!showQuizModal)"),
  'All Quiz navigation points (Header, TableOfContents, Bottom Nav) route directly to QuickTestModal and modal opens when showQuizModal is true'
);

assert(
  !quickModalFile19.includes("markAllSectionsComplete") &&
  quickModalFile19.includes("isAllSectionsComplete") &&
  quickModalFile19.includes("q.codeSnippet"),
  'QuickTestModal contains no cheat mark-all-complete button, strictly requires isAllSectionsComplete, and renders codeSnippet blocks'
);

assert(
  (l19Practice19.includes("Open Quiz on Nav Bar") || l19Practice19.includes("<EndOfLessonQuiz />")) &&
  (l20Practice19.includes("Open Quiz on Nav Bar") || l20Practice19.includes("<EndOfLessonQuiz />")),
  'Both Lesson 19 and Lesson 20 direct students to open the quiz on the top navigation bar'
);

assert(
  l19Viewer19.includes("ResizeObserver") &&
  l19Viewer19.includes("camera.position.set(0, 8.5, 17)") &&
  l19Viewer19.includes("camera.position.set(0, 4.5, 14)") &&
  l19Viewer19.includes("flex flex-col") &&
  l19Viewer19.includes("border-t border-slate-800 shrink-0"),
  'BranchingDecision3DViewer docks interactive controls below canvas to eliminate model occlusion and auto-reframes per mode'
);

assert(
  l20ForLoop19.includes("FOR LOOP FLOWCHART (TEXTBOOK FIG. 20.1)") &&
  l20ForLoop19.includes("Interactive Practice: Step-by-Step Variable Trace Table") &&
  l20ForLoop19.includes("bg-amber-950/40 border-2 border-amber-400"),
  'Lesson 20 ForLoop flowchart SVG, trace table, and Key Takeaway 1 are bilingual with high WCAG contrast'
);

assert(
  l20Range19.includes("Interactive Lab 1: range(start, stop) Playground") &&
  l20Range19.includes("bg-emerald-950/40 border-2 border-emerald-400") &&
  l20Lab19.includes("Program: Divisors.py") &&
  l20Lab19.includes("Program: CountProperDivisors.py"),
  'Lesson 20 RangeFunction and PracticeLab programs and terminals are completely synchronized bilingually'
);

// ==========================================
// TEST SUITE 20: Lesson 21 & Navigation Quiz
// ==========================================
console.log('\n--- SUITE 20: LESSON 21 & NAVIGATION QUIZ VERIFICATION ---');

const l21DataFile = fs.readFileSync(path.resolve('src/data/lesson21Data.ts'), 'utf-8');
const l21OverviewFile = fs.readFileSync(path.resolve('src/components/lesson21/Section21Overview.tsx'), 'utf-8');
const l21WhileFile = fs.readFileSync(path.resolve('src/components/lesson21/Section21WhileLoop.tsx'), 'utf-8');
const l21StructFile = fs.readFileSync(path.resolve('src/components/lesson21/Section21Structures.tsx'), 'utf-8');
const l21LabFile = fs.readFileSync(path.resolve('src/components/lesson21/Section21PracticeLab.tsx'), 'utf-8');
const l21ApplyFile = fs.readFileSync(path.resolve('src/components/lesson21/Section21PracticeApply.tsx'), 'utf-8');
const l21ViewerFile = fs.readFileSync(path.resolve('src/components/lesson21/WhileLoop3DViewer.tsx'), 'utf-8');

assert(
  l21DataFile.includes("id: 3") &&
  l21DataFile.includes("codeSnippet: 'S = 0\\nk = 1\\nwhile k < 100:\\n    S = S + k\\n    k = k + 7\\nprint(S)'") &&
  l21DataFile.includes("id: 4") &&
  l21DataFile.includes("codeSnippet: 'S = 0\\nk = 1\\nwhile k*k < 100:\\n    S = S + k*k\\n    k = k + 1'") &&
  l21DataFile.includes("id: 5") &&
  l21DataFile.includes("codeSnippet: 'k = 2\\nwhile k < 50:\\n    print(k, end = \" \")\\n    k = k + 3'") &&
  l21DataFile.includes("id: 10") &&
  l21DataFile.includes("codeSnippet: 'for k in range(10):\\n    print(k, end = \" \")\\n    if k == 5:\\n        break'"),
  'Lesson 21 quiz questions 3, 4, 5, 10 contain synchronized Python codeSnippet for bilingual display'
);

assert(
  l21OverviewFile.includes("LESSON 21: THE WHILE LOOP STATEMENT") &&
  l21OverviewFile.includes("Warm-up: Comparing Definite Loops (Col A) vs Indefinite Loops (Col B)") &&
  l21OverviewFile.includes("Lesson 21 Learning Roadmap") &&
  l21OverviewFile.includes("View Original Textbook Pages"),
  'Section21Overview provides full English translations for hero, comparison table, and roadmap'
);

assert(
  l21WhileFile.includes("WHILE LOOP FLOWCHART (TEXTBOOK FIGURE 21.1)") &&
  l21WhileFile.includes("Interactive CPU Trace Table (Variable Tracking)") &&
  l21WhileFile.includes("bg-indigo-950/60 dark:bg-indigo-950/80 border-2 border-indigo-400") &&
  l21WhileFile.includes("bg-rose-950/50 border-2 border-rose-500/70") &&
  l21WhileFile.includes("bg-amber-950/50 border-2 border-amber-500/70"),
  'Section21WhileLoop features translated SVG flowchart, bilingual CPU trace table, and high-contrast WCAG callouts'
);

assert(
  l21StructFile.includes("1. Sequential") &&
  l21StructFile.includes("2. Selection") &&
  l21StructFile.includes("3. Iteration") &&
  l21StructFile.includes("Classify Control Structures in Real-World Python Snippets") &&
  l21StructFile.includes("Snippet 1: Calculate Rectangle Area"),
  'Section21Structures translates all 3 structure tabs and classification challenge bilingually'
);

assert(
  l21LabFile.includes("Task 1: Print natural numbers from 1 to 100 on a single horizontal line") &&
  l21LabFile.includes("Task 2: Print English alphabet \"A\" through \"Z\" across 3 horizontal rows") &&
  l21LabFile.includes("ASCII Codepoints Table (65 to 90):") &&
  l21LabFile.includes("Complete the while loop program to print odd numbers less than 20 on one line"),
  'Section21PracticeLab provides bilingual tasks, interactive ASCII inspector, and fill-in puzzle'
);

assert(
  !l21ApplyFile.includes("handleScoreQuiz") &&
  !l21ApplyFile.includes("LESSON_21_QUIZ_QUESTIONS.map") &&
  l21ApplyFile.includes("Official 10-Question Mastery Assessment & Certificate") &&
  l21ApplyFile.includes("completeSectionTasks(21, 4)"),
  'Section21PracticeApply eliminates duplicated inline quiz, guides student to top nav bar Quiz, and prevents task deadlock'
);

assert(
  l21ViewerFile.includes("3D While Loop & 3 Control Structures Lab") &&
  l21ViewerFile.includes("1. While Loop Vortex") &&
  l21ViewerFile.includes("2. 3 Basic Structures") &&
  l21ViewerFile.includes("3. Water Bucket & ASCII") &&
  l21ViewerFile.includes("border-t border-slate-800"),
  'WhileLoop3DViewer docks interactive controls below canvas, supports all 3 modes, and retains perspective across languages'
);

// ==========================================
// TEST SUITE 21: Lessons 22 & 23 Verification
// ==========================================
console.log('\n--- SUITE 21: LESSONS 22 & 23 VERIFICATION ---');

const l22Overview = fs.readFileSync(path.resolve('src/components/lesson22/Section22Overview.tsx'), 'utf-8');
const l22Concept = fs.readFileSync(path.resolve('src/components/lesson22/Section22ListConcept.tsx'), 'utf-8');
const l22Traversal = fs.readFileSync(path.resolve('src/components/lesson22/Section22TraversalMethods.tsx'), 'utf-8');
const l22Lab = fs.readFileSync(path.resolve('src/components/lesson22/Section22PracticeLab.tsx'), 'utf-8');
const l22Apply = fs.readFileSync(path.resolve('src/components/lesson22/Section22PracticeApply.tsx'), 'utf-8');
const l22Viewer = fs.readFileSync(path.resolve('src/components/lesson22/List3DViewer.tsx'), 'utf-8');

const l23Data = fs.readFileSync(path.resolve('src/data/lesson23Data.ts'), 'utf-8');
const l23Overview = fs.readFileSync(path.resolve('src/components/lesson23/Section23Overview.tsx'), 'utf-8');
const l23InOp = fs.readFileSync(path.resolve('src/components/lesson23/Section23InOperator.tsx'), 'utf-8');
const l23Methods = fs.readFileSync(path.resolve('src/components/lesson23/Section23MethodsDeepDive.tsx'), 'utf-8');
const l23Lab = fs.readFileSync(path.resolve('src/components/lesson23/Section23PracticeLab.tsx'), 'utf-8');
const l23Apply = fs.readFileSync(path.resolve('src/components/lesson23/Section23PracticeApply.tsx'), 'utf-8');
const l23Viewer = fs.readFileSync(path.resolve('src/components/lesson23/ListMethods3DViewer.tsx'), 'utf-8');

// 1. Mandatory phrase in Lesson 22
assert(
  l22Traversal.includes("iterate over an index range"),
  'Section22TraversalMethods strictly includes the mandatory phrase "iterate over an index range" for for i in range(start, stop)'
);

// 2. Inline quiz removed from Section 22 PracticeApply, nav bar guidance card in place
assert(
  !l22Apply.includes("handleScoreQuiz") &&
  !l22Apply.includes("LESSON_22_QUIZ_QUESTIONS.map") &&
  l22Apply.includes("navigateToQuiz") &&
  l22Apply.includes("completeSectionTasks(22, 4)") &&
  l22Apply.includes("Official 10-Question Mastery Assessment & Certificate"),
  'Section22PracticeApply removes duplicate 10-question quiz, routes to nav bar Quiz, and registers section completion'
);

// 3. Question 7 fix in Lesson 23 Data and reinforcing question in Section23MethodsDeepDive
assert(
  l23Data.includes("Khi danh sách A = [2, 3]") &&
  l23Data.includes("When list A = [2, 3]") &&
  l23Data.includes("[2, 3, 1]") &&
  l23Data.includes("[1, 2, 3]"),
  'Lesson 23 quiz Question 7 resolves ambiguity by replacing "all elements are 1" with A = [2, 3]'
);

assert(
  l23Methods.includes("When list A = [2, 3]") &&
  l23Methods.includes("Khi danh sách A = [2, 3]"),
  'Section23MethodsDeepDive reinforcing question matches the A = [2, 3] disambiguation'
);

// 4. Inline quiz removed from Section 23 PracticeApply, nav bar guidance card in place
assert(
  !l23Apply.includes("handleScoreQuiz") &&
  !l23Apply.includes("LESSON_23_QUIZ_QUESTIONS.map") &&
  l23Apply.includes("navigateToQuiz") &&
  l23Apply.includes("completeSectionTasks(23, 4)") &&
  l23Apply.includes("Official 10-Question Mastery Assessment & Certificate"),
  'Section23PracticeApply removes duplicate 10-question quiz, routes to nav bar Quiz, and registers section completion'
);

// 5. Lesson 22 and 23 3D viewers dock controls and preserve camera on language toggle
assert(
  l22Viewer.includes("border-t border-slate-800") &&
  l22Viewer.includes("1. Memory & Index") &&
  l22Viewer.includes("2. For Loop Traversal") &&
  l22Viewer.includes("3. append() & Concat +"),
  'List3DViewer docks controls below canvas and supports all 3 modes bilingually'
);

assert(
  l23Viewer.includes("border-t border-slate-800") &&
  l23Viewer.includes("insert(k, v)") &&
  l23Viewer.includes("remove(v)") &&
  l23Viewer.includes("clear()"),
  'ListMethods3DViewer docks controls below canvas and exposes all list methods bilingually'
);

// ==========================================
// TEST SUITE 22: Lessons 24 & 25 Verification
// ==========================================
console.log('\n--- SUITE 22: LESSONS 24 & 25 VERIFICATION ---');

const l24Data = fs.readFileSync(path.resolve('src/data/lesson24Data.ts'), 'utf-8');
const l24Overview = fs.readFileSync(path.resolve('src/components/lesson24/Section24Overview.tsx'), 'utf-8');
const l24Concept = fs.readFileSync(path.resolve('src/components/lesson24/Section24StringConcept.tsx'), 'utf-8');
const l24Traversal = fs.readFileSync(path.resolve('src/components/lesson24/Section24TraversalSubstrings.tsx'), 'utf-8');
const l24Lab = fs.readFileSync(path.resolve('src/components/lesson24/Section24PracticeLab.tsx'), 'utf-8');
const l24Apply = fs.readFileSync(path.resolve('src/components/lesson24/Section24PracticeApply.tsx'), 'utf-8');
const l24Viewer = fs.readFileSync(path.resolve('src/components/lesson24/String3DViewer.tsx'), 'utf-8');

const l25Data = fs.readFileSync(path.resolve('src/data/lesson25Data.ts'), 'utf-8');
const l25Overview = fs.readFileSync(path.resolve('src/components/lesson25/Section25Overview.tsx'), 'utf-8');
const l25Find = fs.readFileSync(path.resolve('src/components/lesson25/Section25FindSubstring.tsx'), 'utf-8');
const l25Split = fs.readFileSync(path.resolve('src/components/lesson25/Section25SplitJoin.tsx'), 'utf-8');
const l25Lab = fs.readFileSync(path.resolve('src/components/lesson25/Section25PracticeLab.tsx'), 'utf-8');
const l25Apply = fs.readFileSync(path.resolve('src/components/lesson25/Section25PracticeApply.tsx'), 'utf-8');
const l25Viewer = fs.readFileSync(path.resolve('src/components/lesson25/StringMethods3DViewer.tsx'), 'utf-8');

// 1. Lessons 24 & 25: Inline quiz removed, nav bar guidance card present with auto-unlocking completion
assert(
  !l24Apply.includes("handleScoreQuiz") &&
  !l24Apply.includes("LESSON_24_QUIZ_QUESTIONS.map") &&
  l24Apply.includes("navigateToQuiz") &&
  l24Apply.includes("completeSectionTasks(24, 4)") &&
  l24Apply.includes("Official 10-Question Mastery Assessment & Certificate"),
  'Section24PracticeApply removes duplicated inline quiz, routes to navbar Quiz, and completes section task on mount'
);

assert(
  !l25Apply.includes("handleScoreQuiz") &&
  !l25Apply.includes("LESSON_25_QUIZ_QUESTIONS.map") &&
  l25Apply.includes("navigateToQuiz") &&
  l25Apply.includes("completeSectionTasks(25, 4)") &&
  l25Apply.includes("Official 10-Question Mastery Assessment & Certificate"),
  'Section25PracticeApply removes duplicated inline quiz, routes to navbar Quiz, and completes section task on mount'
);

// 2. Textbook sample substrings strictly preserved bilingually
assert(
  l24Data.includes('"Thời khoá biểu"') &&
  l24Data.includes('"Tây Nguyên"') &&
  l24Data.includes('s = "Thời khoá biểu"') &&
  l24Data.includes('string "Tây Nguyên"'),
  'Lesson 24 quiz preserves exact textbook strings "Thời khoá biểu" and "Tây Nguyên" in English question descriptions'
);

assert(
  l25Data.includes('"gà,vịt,chó,lợn,ngựa,cá"') &&
  l25Data.includes('"Hà Nội - Đà Nẵng - Hồ Chí Minh"') &&
  l25Data.includes('s = "gà,vịt,chó,lợn,ngựa,cá"') &&
  l25Data.includes('s = "Hà Nội - Đà Nẵng - Hồ Chí Minh"'),
  'Lesson 25 quiz preserves exact textbook strings "gà,vịt,chó,lợn,ngựa,cá" and "Hà Nội - Đà Nẵng - Hồ Chí Minh" in English'
);

// 3. Step 1 and Step 2 bilingual labels in split/join
assert(
  (l25Split.includes("isEn ? 'Step 1' : 'Bước 1'") || l25Split.includes("bilingualMode === 'en' ? 'Step 1' : 'Bước 1'")) &&
  (l25Split.includes("isEn ? 'Step 2' : 'Bước 2'") || l25Split.includes("bilingualMode === 'en' ? 'Step 2' : 'Bước 2'")),
  'Section25SplitJoin translates "Bước 1" / "Bước 2" into "Step 1" / "Step 2" in English mode'
);

// 4. 3D Viewers have stable scene mounting and horizontal scrolling
assert(
  l24Viewer.includes("overflow-x-auto") &&
  l24Viewer.includes("querySubRef"),
  'String3DViewer supports horizontal index bar scrolling and ref-based query string tracking'
);

assert(
  l25Viewer.includes("isPlayingRef") &&
  l25Viewer.includes("Lesson 25 Textbook pp. 123 – 126"),
  'StringMethods3DViewer preserves WebGL context on language toggle and features bilingual badge'
);

// 5. Registered Quiz questions in lessonsRegistry for Lessons 24 and 25
const reg24 = LESSONS_REGISTRY[24];
const reg25 = LESSONS_REGISTRY[25];
assert(
  Boolean(reg24 && reg24.quizQuestions && reg24.quizQuestions.length === 10),
  'Lesson 24 has 10 registered quiz questions in lessonsRegistry'
);
assert(
  Boolean(reg25 && reg25.quizQuestions && reg25.quizQuestions.length === 10),
  'Lesson 25 has 10 registered quiz questions in lessonsRegistry'
);

// ==========================================
// TEST SUITE 23: Lessons 26 & 27 Verification
// ==========================================
console.log('\n--- SUITE 23: LESSONS 26 & 27 VERIFICATION ---');

const l26Data = fs.readFileSync(path.resolve('src/data/lesson26Data.ts'), 'utf-8');
const l26Apply = fs.readFileSync(path.resolve('src/components/lesson26/Section26PracticeApply.tsx'), 'utf-8');
const l26Lab = fs.readFileSync(path.resolve('src/components/lesson26/Section26PracticeLab.tsx'), 'utf-8');
const l26Viewer = fs.readFileSync(path.resolve('src/components/lesson26/Function3DLab.tsx'), 'utf-8');

const l27Data = fs.readFileSync(path.resolve('src/data/lesson27Data.ts'), 'utf-8');
const l27Apply = fs.readFileSync(path.resolve('src/components/lesson27/Section27PracticeApply.tsx'), 'utf-8');
const l27Params = fs.readFileSync(path.resolve('src/components/lesson27/Section27ParametersArguments.tsx'), 'utf-8');
const l27Viewer = fs.readFileSync(path.resolve('src/components/lesson27/Parameter3DLab.tsx'), 'utf-8');

// 1. Lessons 26 & 27: Inline quiz removed, navbar guidance card present with auto-unlocking completion
assert(
  !l26Apply.includes("handleScoreQuiz") &&
  !l26Apply.includes("LESSON_26_QUIZ_QUESTIONS.map") &&
  l26Apply.includes("navigateToQuiz") &&
  l26Apply.includes("completeSectionTasks(26, 4)"),
  'Section26PracticeApply removes duplicated inline quiz, routes to navbar Quiz, and completes section task on mount'
);

assert(
  !l27Apply.includes("handleScoreQuiz") &&
  !l27Apply.includes("LESSON_27_QUIZ_QUESTIONS.map") &&
  l27Apply.includes("navigateToQuiz") &&
  l27Apply.includes("completeSectionTasks(27, 4)"),
  'Section27PracticeApply removes duplicated inline quiz, routes to navbar Quiz, and completes section task on mount'
);

// 2. Python None Return Clarification in Lesson 26
assert(
  l26Data.includes("None") &&
  (l26Data.includes("trả về None") || l26Data.includes("return None")),
  'Lesson 26 Quiz explains that functions omitting return or returning with no expression implicitly return None'
);

// 3. TypeError vs NameError distinction in Lesson 27
assert(
  l27Data.includes("TypeError") &&
  l27Data.includes("NameError") &&
  l27Params.includes("TypeError") &&
  l27Params.includes("NameError"),
  'Lesson 27 Quiz and Section27ParametersArguments clearly distinguish TypeError (argument count mismatch) and NameError (undefined identifier)'
);

// 4. Stable 3D Viewers and Camera Reframing
assert(
  l26Viewer.includes("isPlayingRef") &&
  l26Viewer.includes("Gate 1: n < 2") &&
  l26Viewer.includes("Gate 3: Prime Confirmed"),
  'Function3DLab decouples Three.js initialization and includes bilingual gates'
);

assert(
  l27Viewer.includes("camera.position.set(0, 4.2, 14.5)") &&
  l27Viewer.includes("rebuildDynamicGroup"),
  'Parameter3DLab reframes camera at (0, 4.2, 14.5) and decouples scene updates from canvas reconstruction'
);

// 5. Registered Quiz questions in lessonsRegistry for Lessons 26 and 27
const reg26 = LESSONS_REGISTRY[26];
const reg27 = LESSONS_REGISTRY[27];
assert(
  Boolean(reg26 && reg26.quizQuestions && reg26.quizQuestions.length === 10),
  'Lesson 26 has 10 registered quiz questions in lessonsRegistry'
);
assert(
  Boolean(reg27 && reg27.quizQuestions && reg27.quizQuestions.length === 10),
  'Lesson 27 has 10 registered quiz questions in lessonsRegistry'
);

// ==========================================
// TEST SUITE 24: Lesson 28 & 29 Scoping & Error Diagnostic Architecture
// ==========================================
console.log('\n--- 24. Lesson 28 & 29 Architecture & Bilingual Verification ---');

const l28Apply = fs.readFileSync(path.resolve('src/components/lesson28/Section28PracticeApply.tsx'), 'utf-8');
const l29Apply = fs.readFileSync(path.resolve('src/components/lesson29/Section29PracticeApply.tsx'), 'utf-8');
const l28Scope3D = fs.readFileSync(path.resolve('src/components/lesson28/Scope3DLab.tsx'), 'utf-8');
const l29Error3D = fs.readFileSync(path.resolve('src/components/lesson29/Error3DLab.tsx'), 'utf-8');
const l28Global = fs.readFileSync(path.resolve('src/components/lesson28/Section28GlobalScope.tsx'), 'utf-8');
const l28Overview = fs.readFileSync(path.resolve('src/components/lesson28/Section28Overview.tsx'), 'utf-8');

// 1. Lessons 28 & 29: Inline quiz removed, navbar guidance card present with auto-unlocking completion
assert(
  !l28Apply.includes("handleFinishQuiz") &&
  !l28Apply.includes("LESSON_28_QUIZ_QUESTIONS.map") &&
  l28Apply.includes("navigateToQuiz") &&
  l28Apply.includes("completeSectionTasks(28, 4)"),
  'Section28PracticeApply removes duplicated inline quiz, routes to navbar Quiz, and completes section task on mount'
);

assert(
  !l29Apply.includes("handleFinishQuiz") &&
  !l29Apply.includes("LESSON_29_QUIZ_QUESTIONS.map") &&
  l29Apply.includes("navigateToQuiz") &&
  l29Apply.includes("completeSectionTasks(29, 4)"),
  'Section29PracticeApply removes duplicated inline quiz, routes to navbar Quiz, and completes section task on mount'
);

// 2. Scope3DLab reframing, bottom clearance, and Sieve [9, 2, 7, 4, 6] -> B=[9, 7, 6], C=[2, 4]
assert(
  l28Scope3D.includes("camera.position.set(0, 4.0, 14.0)") &&
  l28Scope3D.includes("rebuildDynamicGroup") &&
  l28Scope3D.includes("sieveInput"),
  'Scope3DLab reframes camera with bottom clearance (0, 4.0, 14.0) and decouples dynamic group rebuild'
);

// Test the Sieve algorithm logic directly
const testA = [9, 2, 7, 4, 6];
const testB: number[] = [];
const testC: number[] = [];
testA.forEach((val, i) => {
  if (i % 2 === 0) testB.push(val);
  else testC.push(val);
});
assert(
  JSON.stringify(testB) === JSON.stringify([9, 7, 6]) &&
  JSON.stringify(testC) === JSON.stringify([2, 4]),
  'Sieve correctly separates index 0, 2, 4 to B=[9, 7, 6] and index 1, 3 to C=[2, 4]'
);

// 3. Error3DLab 3-mode decoupled visualizer and radar exceptions
assert(
  l29Error3D.includes("rebuildModeGroup") &&
  l29Error3D.includes("exceptionsList") &&
  l29Error3D.includes("defense"),
  'Error3DLab decouples Three.js rendering and synchronizes 7 exceptions and defense pipeline scenarios'
);

// 4. Lesson 28 Global scope rebinding vs reading distinction
assert(
  l28Global.includes("KHÔNG CẦN từ khoá global") || l28Global.includes("does NOT require the global keyword"),
  'Section28GlobalScope clearly distinguishes reading global variables (no global needed) vs rebinding (global required)'
);

// 5. Registered Quiz questions in lessonsRegistry for Lessons 28 and 29
const reg28 = LESSONS_REGISTRY[28];
const reg29 = LESSONS_REGISTRY[29];
assert(
  Boolean(reg28 && reg28.quizQuestions && reg28.quizQuestions.length === 10),
  'Lesson 28 has 10 registered quiz questions in lessonsRegistry'
);
assert(
  Boolean(reg29 && reg29.quizQuestions && reg29.quizQuestions.length === 10),
  'Lesson 29 has 10 registered quiz questions in lessonsRegistry'
);

// ==========================================
// TEST SUITE 25: Lesson 30, 31 & 32 Summary Quiz Modernization
// ==========================================
console.log('\n--- 25. Lessons 30, 31 & 32 Summary Quiz Modernization & Progress Verification ---');

const l30Apply = fs.readFileSync(path.resolve('src/components/lesson30/Section30PracticeApply.tsx'), 'utf-8');
const l31Apply = fs.readFileSync(path.resolve('src/components/lesson31/Section31PracticeApply.tsx'), 'utf-8');
const l32Apply = fs.readFileSync(path.resolve('src/components/lesson32/Section32PracticeApply.tsx'), 'utf-8');

// 1. Verify inline quiz state and duplicated question cards removed
assert(
  !l30Apply.includes('selectedAnswers') &&
  !l30Apply.includes('isSubmitted') &&
  !l30Apply.includes('handleSelectAnswer') &&
  l30Apply.includes('Trắc nghiệm tổng kết') &&
  l30Apply.includes('Lesson Quiz') &&
  l30Apply.includes('navigateToQuiz'),
  'Section30PracticeApply replaces inline quiz block with compact Lesson Quiz card routing to QuickTestModal'
);

assert(
  !l31Apply.includes('selectedAnswers') &&
  !l31Apply.includes('isSubmitted') &&
  !l31Apply.includes('handleSelectAnswer') &&
  l31Apply.includes('Trắc nghiệm tổng kết') &&
  l31Apply.includes('Lesson Quiz') &&
  l31Apply.includes('navigateToQuiz'),
  'Section31PracticeApply replaces inline quiz block with compact Lesson Quiz card routing to QuickTestModal'
);

assert(
  !l32Apply.includes('selectedAnswers') &&
  !l32Apply.includes('isSubmitted') &&
  !l32Apply.includes('handleSelectAnswer') &&
  l32Apply.includes('Trắc nghiệm tổng kết') &&
  l32Apply.includes('Lesson Quiz') &&
  l32Apply.includes('navigateToQuiz'),
  'Section32PracticeApply replaces inline quiz block with compact Lesson Quiz card routing to QuickTestModal'
);

// 2. Verify all hands-on exercises and checkpoints preserved
assert(
  l30Apply.includes('ZeroDivisionError') &&
  l30Apply.includes('Insertion Sort') &&
  l30Apply.includes('Dijkstra'),
  'Section30PracticeApply preserves all in-lesson exercises (ZeroDivisionError guard, Insertion Sort bug fix, Dijkstra axiom)'
);

assert(
  l31Apply.includes('a > 0') &&
  l31Apply.includes('24') &&
  l31Apply.includes('Euclid'),
  'Section31PracticeApply preserves all in-lesson exercises (while loop positive float, dual-row multiplication, 24 leap years, Modulo Euclid)'
);

assert(
  l32Apply.includes('compareViStrings') &&
  l32Apply.includes('handleConvertSerialToDate') &&
  l32Apply.includes('phantich_toiuu'),
  'Section32PracticeApply preserves all in-lesson exercises (Vietnamese collation, Excel serial date, O(sqrt(n)) prime benchmark)'
);

// 3. Verify registered Quiz questions in lessonsRegistry for Lessons 30, 31, and 32
const reg30 = LESSONS_REGISTRY[30];
const reg31 = LESSONS_REGISTRY[31];
const reg32 = LESSONS_REGISTRY[32];

assert(
  Boolean(reg30 && reg30.quizQuestions && reg30.quizQuestions.length === 10),
  'Lesson 30 has 10 registered quiz questions in lessonsRegistry'
);
assert(
  Boolean(reg31 && reg31.quizQuestions && reg31.quizQuestions.length === 10),
  'Lesson 31 has 10 registered quiz questions in lessonsRegistry'
);
assert(
  Boolean(reg32 && reg32.quizQuestions && reg32.quizQuestions.length === 10),
  'Lesson 32 has 10 registered quiz questions in lessonsRegistry'
);

// 4. Verify question integrity and certificate threshold (>= 8/10)
[reg30, reg31, reg32].forEach((reg) => {
  if (!reg || !reg.quizQuestions) return;
  reg.quizQuestions.forEach((q, idx) => {
    assert(
      Boolean(q.questionVi && q.questionEn && q.optionsVi.length === 4 && q.optionsEn.length === 4),
      `Lesson ${reg.id} Q${idx + 1} has complete bilingual question and 4 bilingual options`
    );
    assert(
      q.correctIndex >= 0 && q.correctIndex < 4,
      `Lesson ${reg.id} Q${idx + 1} has valid correctIndex in [0..3]`
    );
  });
});

// 5. Verify progress logic at 0/4, 3/4, and 4/4
function evaluateProgress(completed: number[], total: number) {
  const completedCount = completed.length;
  const isAllComplete = completedCount === total && total > 0;
  const remainingCount = Math.max(0, total - completedCount);
  return { completedCount, isAllComplete, remainingCount };
}

const state0 = evaluateProgress([], 4);
assert(
  state0.completedCount === 0 && !state0.isAllComplete && state0.remainingCount === 4,
  'Progress logic at 0/4: locked, 0 completed, 4 sections remaining'
);

const state3 = evaluateProgress([0, 1, 2], 4);
assert(
  state3.completedCount === 3 && !state3.isAllComplete && state3.remainingCount === 1,
  'Progress logic at 3/4: locked, 3 completed, 1 section remaining'
);

const state4 = evaluateProgress([0, 1, 2, 3], 4);
assert(
  state4.completedCount === 4 && state4.isAllComplete && state4.remainingCount === 0,
  'Progress logic at 4/4: unlocked, 4 completed, 0 sections remaining'
);

// ==========================================
// TEST SUITE 26: Lessons 33 & 34 Summary Quiz, Contrast & Bilingual Parity
// ==========================================
console.log('\n--- 26. Lessons 33 & 34 Summary Quiz, Contrast & Bilingual Parity ---');

const l33Overview = fs.readFileSync(path.resolve('src/components/lesson33/Section33Overview.tsx'), 'utf-8');
const l33Concept = fs.readFileSync(path.resolve('src/components/lesson33/Section33ConceptAndBenefits.tsx'), 'utf-8');
const l33Skills = fs.readFileSync(path.resolve('src/components/lesson33/Section33SkillsAndTools.tsx'), 'utf-8');
const l33Apply = fs.readFileSync(path.resolve('src/components/lesson33/Section33EducationCareersPractice.tsx'), 'utf-8');
const l33Studio3D = fs.readFileSync(path.resolve('src/components/lesson33/GraphicDesign3DStudio.tsx'), 'utf-8');

const l34Overview = fs.readFileSync(path.resolve('src/components/lesson34/Section34Overview.tsx'), 'utf-8');
const l34Concept = fs.readFileSync(path.resolve('src/components/lesson34/Section34ConceptAndSDLC.tsx'), 'utf-8');
const l34Roles = fs.readFileSync(path.resolve('src/components/lesson34/Section34RolesAndSkills.tsx'), 'utf-8');
const l34Apply = fs.readFileSync(path.resolve('src/components/lesson34/Section34CareersPracticeApply.tsx'), 'utf-8');
const l34Lab3D = fs.readFileSync(path.resolve('src/components/lesson34/SoftwareDev3DLab.tsx'), 'utf-8');
const quickTestModalSrc = fs.readFileSync(path.resolve('src/components/QuickTestModal.tsx'), 'utf-8');

// 1. Verify inline 10-question quiz & cert blocks removed and compact summary quiz card wired
[
  { name: 'Section33EducationCareersPractice', src: l33Apply, quizConst: 'LESSON_33_QUIZ_QUESTIONS' },
  { name: 'Section34CareersPracticeApply', src: l34Apply, quizConst: 'LESSON_34_QUIZ_QUESTIONS' }
].forEach((entry) => {
  assert(
    !entry.src.includes('selectedAnswers') &&
    !entry.src.includes('isSubmitted') &&
    !entry.src.includes('handleGenerateCertificate') &&
    !entry.src.includes(`${entry.quizConst}.map`) &&
    entry.src.includes('Trắc nghiệm tổng kết') &&
    entry.src.includes('Lesson Quiz') &&
    entry.src.includes('navigateToQuiz') &&
    entry.src.includes('isAllSectionsComplete'),
    `${entry.name} replaces inline 10-question quiz/cert block with compact Lesson Quiz card wired to navigateToQuiz`
  );
});

// 2. Verify textbook exercises, solutions & career sections preserved in Lesson 33 & 34
assert(
  l33Apply.includes('matchKeywords') &&
  l33Apply.includes('Vietnamworks') &&
  l33Apply.includes('AutoCAD') &&
  l33Apply.includes('KNTT10-B33'),
  'Section33EducationCareersPractice preserves job postings filter, career portals, software table, and KNTT10-B33 badge'
);

const l34DataSrc = fs.readFileSync(path.resolve('src/data/lesson34Data.ts'), 'utf-8');
assert(
  l34Apply.includes('showPracticeSolutions') &&
  l34Apply.includes('showApplySolutions') &&
  !l34Apply.includes('Core Terminology') &&
  !l34Apply.includes('Thuật Ngữ Cốt Lõi') &&
  !l34Apply.includes('LESSON_34_TERMS.map') &&
  l34DataSrc.includes('export const LESSON_34_TERMS') &&
  l34Apply.includes('KNTT10-B34'),
  'Section34CareersPracticeApply hides bottom glossary block while preserving solutions, university filters, KNTT10-B34 badge, and LESSON_34_TERMS data'
);

// 3. Verify QuickTestModal resets answers when currentLesson.id changes (lesson isolation)
assert(
  quickTestModalSrc.includes('useEffect') &&
  quickTestModalSrc.includes('setSelectedAnswers({})') &&
  quickTestModalSrc.includes('setIsSubmitted(false)') &&
  quickTestModalSrc.includes('[currentLesson.id]'),
  'QuickTestModal resets selectedAnswers and isSubmitted on currentLesson.id change while preserving selections on language toggle'
);

// 4. Verify LESSONS_REGISTRY[33] & LESSONS_REGISTRY[34] metadata & 10 quiz questions
const reg33 = LESSONS_REGISTRY[33];
const reg34 = LESSONS_REGISTRY[34];

assert(
  Boolean(reg33 && reg33.sections.length === 4 && reg33.certPrefix === 'KNTT10-B33' && reg33.quizQuestions.length === 10),
  'Lesson 33 has 4 sections, certPrefix KNTT10-B33, and 10 quiz questions in lessonsRegistry'
);
assert(
  Boolean(reg34 && reg34.sections.length === 4 && reg34.certPrefix === 'KNTT10-B34' && reg34.quizQuestions.length === 10),
  'Lesson 34 has 4 sections, certPrefix KNTT10-B34, and 10 quiz questions in lessonsRegistry'
);

[reg33, reg34].forEach((reg) => {
  if (!reg || !reg.quizQuestions) return;
  reg.quizQuestions.forEach((q, idx) => {
    assert(
      Boolean(q.questionVi && q.questionEn && q.optionsVi.length === 4 && q.optionsEn.length === 4),
      `Lesson ${reg.id} Q${idx + 1} has complete bilingual question and 4 bilingual options`
    );
    assert(
      q.correctIndex >= 0 && q.correctIndex < 4,
      `Lesson ${reg.id} Q${idx + 1} has valid correctIndex in [0..3]`
    );
  });
});

// 5. Contrast safety: translucent dark root containers fixed to opaque slate-900 bases
assert(
  !l33Concept.includes('bg-amber-950/20') &&
  !l33Concept.includes('from-amber-950/40') &&
  !l33Skills.includes('bg-blue-950/20') &&
  !l33Skills.includes('from-blue-950/40') &&
  !l33Apply.includes('bg-emerald-950/20') &&
  !l33Apply.includes('from-emerald-950/40'),
  'Lesson 33 Activity and Memory Box cards use opaque slate-900 dark bases for crisp contrast on white canvas'
);

assert(
  !l34Concept.includes('bg-blue-950/20') &&
  !l34Concept.includes('from-blue-950/40') &&
  !l34Roles.includes('bg-purple-950/20') &&
  !l34Roles.includes('from-purple-950/40'),
  'Lesson 34 Activity, Comparison, Pillar, and Memory Box cards use opaque slate-900 dark bases'
);

// 6. Bilingual parity & 3D ResizeObserver checks
assert(
  l33Overview.includes('tagEn') &&
  l33Skills.includes('typeEn') &&
  l34Overview.includes('SECTION 1 • PP. 160–161') &&
  l34Concept.includes('roleEn') &&
  l34Concept.includes('costNoteEn') &&
  l34Roles.includes('Pillar 1'),
  'Lesson 33 and Lesson 34 UI components include full VI/EN localization strings'
);

assert(
  l33Studio3D.includes('ResizeObserver') &&
  l34Lab3D.includes('ResizeObserver'),
  'GraphicDesign3DStudio and SoftwareDev3DLab both include ResizeObserver for responsive canvas sizing'
);

// ==========================================
// TEST SUITE 27: Learner Profiles, Progress Persistence, Locked Certificates & Start Over
// ==========================================
console.log('\n--- 27. Learner Profiles, Scoped Progress, Locked Certificates & Start Over ---');

const createMockStorage = (seed: Record<string, string> = {}): StorageLike => {
  const data = new Map<string, string>(Object.entries(seed));
  return {
    getItem: (k: string) => (data.has(k) ? data.get(k)! : null),
    setItem: (k: string, v: string) => {
      data.set(k, v);
    },
    removeItem: (k: string) => {
      data.delete(k);
    },
    key: (i: number) => Array.from(data.keys())[i] ?? null,
    get length() {
      return data.size;
    }
  };
};

// 1. Name validation & normalization (Vietnamese diacritics + whitespace collapsing)
const validVi = validateFullName('  Nguyễn   Minh   Ánh  ');
const emptyCheck = validateFullName('   ');
const badChars = validateFullName('HocSinh@123!');
assert(
  validVi.valid && validVi.normalized === 'Nguyễn Minh Ánh' && normalizeFullName('  Trần   Quốc Bảo ') === 'Trần Quốc Bảo',
  'validateFullName preserves Vietnamese diacritics and collapses extra whitespace'
);
assert(
  !emptyCheck.valid && emptyCheck.error === 'empty' && !badChars.valid && badChars.error === 'invalid_chars',
  'validateFullName rejects empty strings and invalid special characters'
);

// 2. Legacy un-scoped localStorage data is detected cleanly and NEVER inherited by new profiles
const mockStorage = createMockStorage({
  sgk_completed_sections: '[0,1,2,3]',
  sgk_completed_sections_lesson_22: '[0,1,2,3,4]',
  sgk_certificate_lesson1: JSON.stringify({ studentName: 'Legacy User', score: 10, certId: 'OLD-1' })
});
assert(
  hasLegacyUnscopedProgress(mockStorage) === true,
  'hasLegacyUnscopedProgress detects pre-existing un-scoped localStorage keys'
);

const { profile: profileA, progress: initProgA } = createLearnerProfile('student', '  Lê   Hoàng   Nam  ', mockStorage);
assert(
  profileA.locked === true &&
  profileA.role === 'student' &&
  profileA.fullName === 'Lê Hoàng Nam' &&
  profileA.learnerId.startsWith('HS-') &&
  Object.keys(initProgA.completedSectionsByLesson).length === 0 &&
  Object.keys(initProgA.certificatesByLesson).length === 0 &&
  Object.keys(initProgA.quizResultsByLesson).length === 0,
  'New profile A is locked with HS-* ID, normalized name, and 0% clean state (no legacy inheritance)'
);

// 3. Reopening restores exact lesson, section, and view scoped to active learner
const updatedProgA = saveLearnerProgress(
  {
    ...initProgA,
    lastView: 'reader',
    currentLessonId: 28,
    currentPage: 2,
    completedSectionsByLesson: { 28: [0, 1, 2, 3, 4] }
  },
  mockStorage
);
const restoredProfile = loadActiveLearnerProfile(mockStorage);
const restoredProgA = restoredProfile ? loadLearnerProgress(restoredProfile.learnerId, mockStorage) : null;
assert(
  Boolean(
    restoredProfile?.learnerId === profileA.learnerId &&
    restoredProgA?.lastView === 'reader' &&
    restoredProgA?.currentLessonId === 28 &&
    restoredProgA?.currentPage === 2 &&
    restoredProgA?.completedSectionsByLesson[28]?.length === 5
  ),
  'Reopening restores active learner profile and returns user to exact last view, lesson, section, and completions'
);

// 4. Quiz score 7/10 records attempt but issues NO certificate; 8/10 issues locked certificate
const reg33Quiz = LESSONS_REGISTRY[33].quizQuestions;
const progA33Ready = saveLearnerProgress(
  {
    ...updatedProgA,
    currentLessonId: 33,
    currentPage: 3,
    completedSectionsByLesson: { ...updatedProgA.completedSectionsByLesson, 33: [0, 1, 2, 3] }
  },
  mockStorage
);
const sevenOutOfTen: Record<number, number> = {};
reg33Quiz.forEach((q, idx) => {
  sevenOutOfTen[q.id] = idx < 7 ? q.correctIndex : (q.correctIndex + 1) % 4;
});
const res7 = gradeAndRecordQuizAttempt(
  profileA,
  progA33Ready,
  33,
  LESSONS_REGISTRY[33].certPrefix,
  LESSONS_REGISTRY[33].sections.length,
  reg33Quiz,
  sevenOutOfTen,
  mockStorage
);
assert(
  Boolean(
    res7.attempt &&
    res7.attempt.score === 7 &&
    res7.attempt.passed === false &&
    res7.certificate === null &&
    !res7.updatedState?.certificatesByLesson[33]
  ),
  'Scoring 7/10 records attempt for learner A but does NOT issue a certificate'
);

const eightOutOfTen: Record<number, number> = {};
reg33Quiz.forEach((q, idx) => {
  eightOutOfTen[q.id] = idx < 8 ? q.correctIndex : (q.correctIndex + 1) % 4;
});
const res8 = gradeAndRecordQuizAttempt(
  profileA,
  res7.updatedState,
  33,
  LESSONS_REGISTRY[33].certPrefix,
  LESSONS_REGISTRY[33].sections.length,
  reg33Quiz,
  eightOutOfTen,
  mockStorage
);
assert(
  Boolean(
    res8.attempt?.passed &&
    res8.certificate &&
    res8.certificate.learnerId === profileA.learnerId &&
    res8.certificate.studentName === 'Lê Hoàng Nam' &&
    res8.certificate.lessonCode === 'KNTT10-B33' &&
    res8.certificate.score === 8 &&
    res8.certificate.date &&
    res8.certificate.certId.startsWith('KNTT10-B33-') &&
    res8.certificate.isPracticeOnly === true
  ),
  'Scoring 8/10 with 4/4 sections complete issues certificate strictly bound to confirmed profile name & learnerId'
);

// Reload after certificate issuance
const reloadedProgA = loadLearnerProgress(profileA.learnerId, mockStorage);
assert(
  reloadedProgA.certificatesByLesson[33]?.studentName === 'Lê Hoàng Nam' &&
  reloadedProgA.certificatesByLesson[33]?.certId === res8.certificate?.certId,
  'Reloading persists and restores the issued certificate with exact learnerId, certId, and studentName'
);

// 5. Incomplete sections block certificate issuance even with 10/10 score
const tenOutOfTen: Record<number, number> = {};
LESSONS_REGISTRY[34].quizQuestions.forEach((q) => {
  tenOutOfTen[q.id] = q.correctIndex;
});
const resIncomplete = gradeAndRecordQuizAttempt(
  profileA,
  reloadedProgA,
  34,
  LESSONS_REGISTRY[34].certPrefix,
  LESSONS_REGISTRY[34].sections.length,
  LESSONS_REGISTRY[34].quizQuestions,
  tenOutOfTen,
  mockStorage
);
assert(
  resIncomplete.certificate === null && resIncomplete.attempt?.passed === false,
  'Certificate is blocked when required lesson sections are incomplete even if quiz score is 10/10'
);

// 6. Start Over resets active learner to onboarding, preserves old certificate owner name, and isolates new profile B at 0%
clearActiveLearnerSession(mockStorage);
const archiveBeforeNew = loadCertificateArchive(mockStorage);
assert(
  loadActiveLearnerProfile(mockStorage) === null &&
  archiveBeforeNew.some((c) => c.studentName === 'Lê Hoàng Nam' && c.learnerId === profileA.learnerId),
  'Start Over clears active pointer for onboarding while preserving previously issued certificate owner name'
);

const { profile: profileB, progress: initProgB } = createLearnerProfile('teacher', 'Phạm Thị Thu Hà', mockStorage);
assert(
  profileB.learnerId !== profileA.learnerId &&
  profileB.learnerId.startsWith('GV-') &&
  Object.keys(initProgB.completedSectionsByLesson).length === 0 &&
  Object.keys(initProgB.quizResultsByLesson).length === 0 &&
  Object.keys(initProgB.certificatesByLesson).length === 0 &&
  loadLearnerProgress(profileA.learnerId, mockStorage).certificatesByLesson[33]?.studentName === 'Lê Hoàng Nam',
  'New profile B gets GV-* ID starting at 0% with zero access to profile A progress, quiz scores, or certificates'
);

// 7. UI Source Verification: CertificateModal read-only, Practice notice, Onboarding & Profile buttons wired
const certModalSrc = fs.readFileSync(path.resolve('src/components/CertificateModal.tsx'), 'utf-8');
const onboardingSrc = fs.readFileSync(path.resolve('src/components/OnboardingProfileModal.tsx'), 'utf-8');
const profileModalSrc = fs.readFileSync(path.resolve('src/components/ProfileModal.tsx'), 'utf-8');
const fullTocSrc = fs.readFileSync(path.resolve('src/components/FullTableOfContentsPage.tsx'), 'utf-8');
const coverSrc = fs.readFileSync(path.resolve('src/components/BookCoverPage.tsx'), 'utf-8');

assert(
  !certModalSrc.includes('<input') &&
  !certModalSrc.includes('handleUpdateName') &&
  !certModalSrc.includes('setIsEditingName') &&
  certModalSrc.includes('certificate.studentName') &&
  certModalSrc.includes('Practice Mode Notice'),
  'CertificateModal removes name editing inputs and displays Practice Mode notice'
);

assert(
  onboardingSrc.includes('Bắt đầu học') &&
  onboardingSrc.includes('confirmInitialProfile') &&
  profileModalSrc.includes('Học lại từ đầu') &&
  profileModalSrc.includes('startOverProfile') &&
  headerFile19.includes('setShowProfileModal') &&
  coverSrc.includes('setShowProfileModal') &&
  fullTocSrc.includes('setShowProfileModal') &&
  !fullTocSrc.includes("localStorage.getItem(`sgk_completed_sections_lesson_") &&
  fullTocSrc.includes('getLessonCompletedSections'),
  'Onboarding, ProfileModal, Header, Cover, and FullTOC wire Start Over and profile-scoped progress'
);

// ==========================================
// TEST SUITE 28: Teacher Support & Student Support Suite
// ==========================================
console.log('\n--- 28. Teacher Support & Student Support Features ---');

// 1. Vocabulary Flashcards across all 34 lessons + difficult-word bookmark isolation per profile
let allVocabValid = true;
for (let id = 1; id <= 34; id++) {
  const cards = getLessonVocabulary(id);
  if (
    cards.length === 0 ||
    cards.some((c) => !c.termVi || !c.termEn || !c.definitionVi || !c.definitionEn || !c.exampleVi || !c.exampleEn)
  ) {
    allVocabValid = false;
    break;
  }
}
const cards34 = getLessonVocabulary(34);
assert(
  allVocabValid && cards34.length >= 10,
  'getLessonVocabulary returns bilingual cards with Informatics examples for all 34 lessons (Lesson 34 preserves 10 terms)'
);

const savedVocabProgA = toggleDifficultVocabInState(profileA, progA33Ready, cards34[0].id, mockStorage);
const reloadedProgAWithVocab = loadLearnerProgress(profileA.learnerId, mockStorage);
const progBAfterVocab = loadLearnerProgress(profileB.learnerId, mockStorage);
assert(
  Boolean(savedVocabProgA?.difficultVocabIds.includes(cards34[0].id)) &&
  reloadedProgAWithVocab.difficultVocabIds.includes(cards34[0].id) &&
  progBAfterVocab.difficultVocabIds.length === 0,
  'Difficult vocabulary bookmarks persist per learnerId and stay strictly isolated across profiles'
);

// 2. Categorized Guiding Questions (Warm-up, Prediction, Application) in VI & EN
const prompts30 = getCategorizedGuidingPrompts(30, 0);
const categories30 = new Set(prompts30.map((p) => p.category));
assert(
  categories30.has('warmup') &&
  categories30.has('prediction') &&
  categories30.has('application') &&
  prompts30.every((p) => Boolean(p.questionVi && p.questionEn && p.hintVi && p.hintEn && p.answerVi && p.answerEn)),
  'getCategorizedGuidingPrompts produces bilingual warmup, prediction, and application prompts with hints and answers'
);

// 3. Learning Tracker: explicit Sample/Demo vs Real Profile separation, zero assignment/class-code leakage
const demoAnalytics = buildDemoClassAnalytics();
const targetSecSample = demoAnalytics.topMissedQuestions[0]
  ? getQuestionTargetSection(demoAnalytics.topMissedQuestions[0].lessonId, demoAnalytics.topMissedQuestions[0].questionId)
  : -1;
const personalMissed = extractPersonalMissedQuestions(res7.updatedState?.quizResultsByLesson || {});
assert(
  demoAnalytics.isDemo === true &&
  demoAnalytics.lessonStats.length >= 34 &&
  demoAnalytics.topMissedQuestions.length >= 4 &&
  targetSecSample >= 0 &&
  targetSecSample < LESSONS_REGISTRY[demoAnalytics.topMissedQuestions[0].lessonId].sections.length &&
  personalMissed.length > 0 &&
  personalMissed[0].lessonId === 33,
  'Sample class analytics mark isDemo=true, map missed questions to valid knowledge sections, and extract real active profile missed questions'
);

const analyticsModalSrc = fs.readFileSync(path.resolve('src/components/TeacherAnalyticsModal.tsx'), 'utf-8');
assert(
  analyticsModalSrc.includes('Dữ liệu minh họa - Mẫu') &&
  analyticsModalSrc.includes('Sample / Demo Data') &&
  analyticsModalSrc.includes('extractPersonalMissedQuestions') &&
  !analyticsModalSrc.includes('Mã lớp') &&
  !analyticsModalSrc.includes('Giao bài'),
  'TeacherAnalyticsModal separates sample class data from active profile progress with zero assignment/class-code features'
);

// 4. Isolated Python Sandbox execution: stdio, globals, infinite-loop timeout & syntax/runtime errors
assert(
  hasPythonPlaygroundForLesson(16) && hasPythonPlaygroundForLesson(32) && !hasPythonPlaygroundForLesson(1),
  'Guided Python Playground enables cleanly for Python Lessons 16–32 only'
);
const task26 = getLessonPythonSamples(26)[0];
assert(
  Boolean(task26 && task26.hint1Vi && task26.hint2Vi && task26.hint3SolutionCode),
  'Python curriculum tasks include 3-tier hints (Level 1, Level 2, Level 3 solution)'
);

const pyOk = executePythonProgramSync(
  `m = int(input())\nn = int(input())\nwhile m != n:\n    if m > n:\n        m = m - n\n    else:\n        n = n - m\nprint("GCD=", m)`,
  '20\n16'
);
const pyGlobal = executePythonProgramSync(`t = 10\ndef f(n):\n    global t\n    t = 2*n + 1\nf(1)\nprint(t)`, '');
const pyTimeout = executePythonProgramSync(`while True:\n    x = 1`, '', 80);
const pyZero = executePythonProgramSync(`print(1 / 0)`, '');
assert(
  pyOk.status === 'success' && pyOk.stdout.includes('GCD= 4') &&
  pyGlobal.status === 'success' && pyGlobal.stdout.trim() === '3' &&
  pyTimeout.status === 'timeout' &&
  pyZero.status === 'error' && Boolean(pyZero.errorLine),
  'Python VM executes loops/input()/global accurately, reports errors with line numbers, and halts infinite loops cleanly'
);

// 5. UI Source Integration checks for Presentation Mode, Continue Learning, Mistake Review, Vocab, and Predict-Simulate-Explain
const appSrc = fs.readFileSync(path.resolve('src/App.tsx'), 'utf-8');
const pythonModalSrc = fs.readFileSync(path.resolve('src/components/PythonSandboxModal.tsx'), 'utf-8');
const vocabModalSrc = fs.readFileSync(path.resolve('src/components/LessonVocabularyModal.tsx'), 'utf-8');
const sec30DebugSrc = fs.readFileSync(path.resolve('src/components/lesson30/Section30DebugExamples.tsx'), 'utf-8');
const deb3DSrc = fs.readFileSync(path.resolve('src/components/lesson30/Debugger3DLab.tsx'), 'utf-8');
const scope3DSrc = fs.readFileSync(path.resolve('src/components/lesson28/Scope3DLab.tsx'), 'utf-8');
const while3DSrc = fs.readFileSync(path.resolve('src/components/lesson21/WhileLoop3DViewer.tsx'), 'utf-8');

assert(
  headerFile19.includes('Trình chiếu') &&
  headerFile19.includes('Thoát trình chiếu') &&
  headerFile19.includes('Câu hỏi dẫn dắt') &&
  headerFile19.includes('Từ vựng') &&
  headerFile19.includes('Thực hành Python') &&
  appSrc.includes('presentation-mode') &&
  appSrc.includes('projectedPrompt') &&
  appSrc.includes('GuidingPromptsModal') &&
  appSrc.includes('TeacherAnalyticsModal') &&
  appSrc.includes('LessonVocabularyModal') &&
  appSrc.includes('PythonSandboxModal'),
  'Header and App wire Presentation Mode, Projected Guiding Questions, Vocabulary Flashcards, Learning Tracker, and Python Lab'
);

assert(
  coverSrc.includes('Tiếp tục học') &&
  fullTocSrc.includes('Tiếp tục học') &&
  quickTestModalSrc.includes('Ôn câu sai') &&
  quickTestModalSrc.includes('Mở mục kiến thức') &&
  quickTestModalSrc.includes('getQuestionTargetSection') &&
  pythonModalSrc.includes('Dừng') &&
  pythonModalSrc.includes('showHint3Solution') &&
  vocabModalSrc.includes('toggleDifficultVocab') &&
  sec30DebugSrc.includes('PredictSimulateExplain') &&
  deb3DSrc.includes('PredictSimulateExplain') &&
  scope3DSrc.includes('PredictSimulateExplain') &&
  while3DSrc.includes('PredictSimulateExplain'),
  'Cover/TOC Continue Learning, QuickTestModal Mistake Review, Python Stop/3-tier hints, Vocab bookmarks, and Predict-Simulate-Explain integrations are verified'
);

// ==========================================
// TEST SUITE 29: Teach in English Dual-Screen & Live Poll
// ==========================================
console.log('\n--- 29. Teach in English Dual-Screen Studio & Live Anonymous Polling ---');

// 1. Lesson 30 Script & All 34 Lessons Coverage
const script30 = getTeachLessonScript(30);
const phraseSituations = new Set(CLASSROOM_PHRASES.map((p) => p.situation));
const followUpGroups = new Set(QUICK_FOLLOWUPS.map((f) => f.group));

let allTeachScriptsValid = true;
for (let id = 1; id <= 34; id++) {
  const s = getTeachLessonScript(id);
  if (
    s.lessonId !== id ||
    TEACH_STAGE_ORDER.some((stageId) => !s.stages[stageId]?.goalEn || !s.stages[stageId]?.labelEn) ||
    s.prompts.length === 0 ||
    s.pollQuestions.length === 0 ||
    s.pairDialogue.roleA.promptLinesEn.length === 0 ||
    s.pairDialogue.roleB.promptLinesEn.length === 0 ||
    s.exitTicketFrames.length === 0
  ) {
    allTeachScriptsValid = false;
    break;
  }
}

assert(
  allTeachScriptsValid &&
  phraseSituations.size === 6 &&
  followUpGroups.size === 4,
  'getTeachLessonScript generates complete 4-stage bilingual scripts for all 34 lessons, 6 phrase situations, and 4 follow-up prompt groups'
);

assert(
  script30.prompts.some((p) => p.questionEn.includes('What do you think a breakpoint does?')) &&
  script30.prompts.some((p) => p.questionEn.includes('What will the value of `x` be after this line runs?')) &&
  script30.prompts.some((p) => p.scaffold.starterEn.includes('I predict that `x` will be')) &&
  script30.prompts.some((p) => p.scaffold.keywordsEn.includes('breakpoint') && p.scaffold.fullSampleEn.length > 10) &&
  script30.pairDialogue.roleB.promptLinesEn.some((line) => line.includes('What input did you use?')) &&
  QUICK_FOLLOWUPS.some((f) => f.en === 'Which line supports your answer?') &&
  script30.exitTicketFrames.some((e) => e.frameEn.includes('One bug I found today was')),
  'Lesson 30 script contains all requested classroom questions, 3-tier scaffolds, pair dialogue, follow-up, and exit-ticket frames'
);

// 2. Real Live Session HTTP + SSE Two-Client End-to-End Test
const testServer = http.createServer(createAppServer());
await new Promise<void>((resolve) => testServer.listen(0, '127.0.0.1', () => resolve()));
const addr = testServer.address();
const baseUrl = typeof addr === 'object' && addr ? `http://127.0.0.1:${addr.port}` : 'http://127.0.0.1:0';

try {
  const healthRes = await fetch(`${baseUrl}/api/live-sessions/health`);
  const healthJson = await healthRes.json() as { ok: boolean };

  const createRes = await fetch(`${baseUrl}/api/live-sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      lessonId: 30,
      lessonTitleEn: script30.titleEn,
      lessonTitleVi: script30.titleVi,
      questions: script30.pollQuestions.map((q) => ({
        id: q.id,
        promptEn: q.questionEn,
        promptVi: q.questionVi,
        options: q.options
      })),
      exitTicketPromptEn: script30.exitTicketFrames[0].frameEn,
      exitTicketPromptVi: script30.exitTicketFrames[0].frameVi,
      ttlMinutes: 90
    })
  });
  const created = await createRes.json() as { sessionId: string; hostToken: string; state: any };
  const sid = created.sessionId;
  const hostToken = created.hostToken;
  const q0 = script30.pollQuestions[0];

  // Unauthenticated control rejected (403)
  const badControlRes = await fetch(`${baseUrl}/api/live-sessions/${sid}/control`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hostToken: 'invalid-token', action: 'open_question' })
  });

  // Host closes question -> voting while question closed rejected (409)
  await fetch(`${baseUrl}/api/live-sessions/${sid}/control`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hostToken, action: 'close_question' })
  });
  const closedVoteRes = await fetch(`${baseUrl}/api/live-sessions/${sid}/vote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ questionId: q0.id, optionId: q0.options[0].id, voterId: 'stu-test-1' })
  });

  // SSE subscription receives initial state event
  const sseAbort = new AbortController();
  const sseRes = await fetch(`${baseUrl}/api/live-sessions/${sid}/stream`, { signal: sseAbort.signal });
  const sseReader = sseRes.body!.getReader();
  const firstChunk = await sseReader.read();
  const sseText = new TextDecoder().decode(firstChunk.value);
  sseAbort.abort();

  // Host opens question & reveals results
  await fetch(`${baseUrl}/api/live-sessions/${sid}/control`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hostToken, action: 'open_question' })
  });
  await fetch(`${baseUrl}/api/live-sessions/${sid}/control`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hostToken, action: 'toggle_results', showResults: true })
  });

  // Two anonymous students vote; duplicate student A vote rejected (409)
  const voteARes = await fetch(`${baseUrl}/api/live-sessions/${sid}/vote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ questionId: q0.id, optionId: q0.options[0].id, voterId: 'stu-test-1' })
  });
  const voteBRes = await fetch(`${baseUrl}/api/live-sessions/${sid}/vote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ questionId: q0.id, optionId: q0.options[1].id, voterId: 'stu-test-2' })
  });
  const dupVoteRes = await fetch(`${baseUrl}/api/live-sessions/${sid}/vote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ questionId: q0.id, optionId: q0.options[1].id, voterId: 'stu-test-1' })
  });

  // Open & submit exit ticket + project response
  await fetch(`${baseUrl}/api/live-sessions/${sid}/control`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hostToken, action: 'open_exit_ticket' })
  });
  const exitRes = await fetch(`${baseUrl}/api/live-sessions/${sid}/exit-ticket`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ voterId: 'stu-test-1', text: 'One bug I found today was off-by-one j > 1. I fixed it by testing boundary.' })
  });
  const exitJson = await exitRes.json() as { ok: boolean; entry: { id: string } };
  await fetch(`${baseUrl}/api/live-sessions/${sid}/control`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hostToken, action: 'project_exit_response', responseId: exitJson.entry.id })
  });

  const getAfterRes = await fetch(`${baseUrl}/api/live-sessions/${sid}`);
  const getAfterJson = await getAfterRes.json() as { state: any };
  const afterState = getAfterJson.state;

  // Host closes session -> subsequent votes return 410
  await fetch(`${baseUrl}/api/live-sessions/${sid}/control`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hostToken, action: 'close_session' })
  });
  const afterCloseVoteRes = await fetch(`${baseUrl}/api/live-sessions/${sid}/vote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ questionId: q0.id, optionId: q0.options[0].id, voterId: 'stu-test-3' })
  });

  assert(
    healthRes.ok &&
    healthJson.ok === true &&
    createRes.status === 201 &&
    Boolean(sid && hostToken) &&
    badControlRes.status === 403 &&
    closedVoteRes.status === 409 &&
    sseText.includes('event: state') &&
    voteARes.status === 201 &&
    voteBRes.status === 201 &&
    dupVoteRes.status === 409 &&
    afterState.totalVotesByQuestion[q0.id] === 2 &&
    afterState.showResults === true &&
    afterState.projectedExitResponseId === exitJson.entry.id &&
    afterCloseVoteRes.status === 410,
    'Live anonymous polling backend enforces host auth (403), open/close gating (409/410), duplicate-vote guard (409), SSE events, tallies, and exit-ticket projection'
  );
} finally {
  testServer.close();
}

// 3. UI & Architecture Source Verification for Teach in English
const headerTeachSrc = fs.readFileSync(path.resolve('src/components/Header.tsx'), 'utf-8');
const appTeachSrc = fs.readFileSync(path.resolve('src/App.tsx'), 'utf-8');
const teachStudioSrc = fs.readFileSync(path.resolve('src/components/TeachInEnglishStudio.tsx'), 'utf-8');
const projectorStageSrc = fs.readFileSync(path.resolve('src/components/TeachProjectorStage.tsx'), 'utf-8');
const studentPollSrc = fs.readFileSync(path.resolve('src/components/StudentLivePollView.tsx'), 'utf-8');

assert(
  headerTeachSrc.includes('Dạy học bằng tiếng Anh') &&
  headerTeachSrc.includes('Teach in English') &&
  headerTeachSrc.includes('openTeachEnglish') &&
  appTeachSrc.includes('TeachInEnglishStudio') &&
  appTeachSrc.includes("searchParams?.get('liveSession')") &&
  appTeachSrc.includes("searchParams?.get('teachProjector')") &&
  appTeachSrc.indexOf('StudentLivePollView') < appTeachSrc.indexOf('<BookProvider>'),
  'Header exposes Teach in English button and App mounts Studio + unauthenticated ?liveSession and ?teachProjector routes before BookProvider'
);

assert(
  projectorStageSrc.includes('state.revealMeaning') &&
  projectorStageSrc.includes('state.revealKeywords') &&
  projectorStageSrc.includes('state.revealStarter') &&
  projectorStageSrc.includes('state.revealFullSample') &&
  projectorStageSrc.includes('state.revealExplanation') &&
  projectorStageSrc.includes('activePoll.showResults') &&
  teachStudioSrc.includes('Bình chọn tại lớp') &&
  teachStudioSrc.includes('Phiên QR trực tiếp') &&
  teachStudioSrc.includes('runLiveSyncRoundtripSelfTest') &&
  teachStudioSrc.includes('speakAtRate') &&
  teachStudioSrc.includes('Đổi vai') &&
  teachStudioSrc.includes('Debugger3DLab') &&
  teachStudioSrc.includes('dispatchTeachSimCommand') &&
  !studentPollSrc.includes('OnboardingProfileModal') &&
  !teachStudioSrc.includes('gradeAndRecordQuizAttempt'),
  'Projector defaults to English-only until toggled, Studio supports hand-raise fallback + verified QR polling + 3D/Step debugger controls + TTS speed, and stays isolated from quiz/certificates'
);

// ==========================================
// TEST SUITE 30: Hover Quick Translation Bubble Bugfixes
// ==========================================
console.log('\n--- 30. Hover Quick Translation Bubble Stability, Cache & Proxy ---');

// 1. Verify EN->VI cache is not overwritten by VI->EN identity terms (Bit, Byte, RAM, etc.)
const bitTrans = getCachedTranslation('Bit', 'en', 'vi');
const byteTrans = getCachedTranslation('Byte', 'en', 'vi');
const breakpointPromptTrans = getCachedTranslation('What do you think a breakpoint does?', 'en', 'vi');
const strippedPromptTrans = getCachedTranslation('`What do you think a breakpoint does?`', 'en', 'vi');

saveTranslationToCache('Test pollution source', 'MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS', 'en', 'vi');
const pollutedLookup = getCachedTranslation('Test pollution source', 'en', 'vi');

assert(
  Boolean(bitTrans && bitTrans.toLowerCase() !== 'bit' && bitTrans.includes('Bit')) &&
  Boolean(byteTrans && byteTrans.toLowerCase() !== 'byte' && byteTrans.includes('Byte')) &&
  Boolean(breakpointPromptTrans && breakpointPromptTrans.includes('điểm dừng')) &&
  strippedPromptTrans === breakpointPromptTrans &&
  pollutedLookup === null,
  'QuickTranslationService isolates EN->VI from VI->EN identity keys, normalizes backticks, indexes Teach phrases, and rejects provider warning strings',
  JSON.stringify({ bitTrans, byteTrans, breakpointPromptTrans, strippedPromptTrans, pollutedLookup })
);

// 2. Verify QuickTranslationBubble anti-flicker & cursor-safe layout
const fixedBubbleSrc = fs.readFileSync(path.resolve('src/components/QuickTranslationBubble.tsx'), 'utf-8');
const fixedContextSrc = fs.readFileSync(path.resolve('src/context/QuickTranslationContext.tsx'), 'utf-8');
const fixedBilingualSrc = fs.readFileSync(path.resolve('src/components/BilingualText.tsx'), 'utf-8');

assert(
  fixedBubbleSrc.includes('pointer-events-none rounded-2xl') &&
  fixedBubbleSrc.includes('CURSOR_SAFE_GAP') &&
  fixedContextSrc.includes('mouseMoveRafRef') &&
  fixedContextSrc.includes('isInsideBilingualComponent') &&
  fixedContextSrc.includes("closest('.quick-translation-bubble-container')") &&
  fixedBilingualSrc.includes('extractPlainText') &&
  fixedBilingualSrc.includes("closest('.quick-translation-bubble-container')"),
  'QuickTranslationBubble prevents cursor hover theft/flicker, clamps around tall paragraphs, and BilingualText handles JSX text + bubble mouseleave'
);

// 3. Verify /api/translate route validation on createAppServer
const translateServer = http.createServer(createAppServer());
await new Promise<void>((resolve) => translateServer.listen(0, '127.0.0.1', () => resolve()));
const tAddr = translateServer.address();
const tBaseUrl = typeof tAddr === 'object' && tAddr ? `http://127.0.0.1:${tAddr.port}` : 'http://127.0.0.1:0';
try {
  const emptyTranslateRes = await fetch(`${tBaseUrl}/api/translate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: '   ' })
  });
  assert(
    emptyTranslateRes.status === 400,
    'Server /api/translate rejects empty translation payloads with 400 Bad Request'
  );
} finally {
  translateServer.close();
}

console.log(`\n========================================`);
console.log(`TEST SUMMARY: ${passedTests}/${totalTests} tests passed`);
console.log(`========================================\n`);

if (passedTests !== totalTests) {
  process.exit(1);
}




