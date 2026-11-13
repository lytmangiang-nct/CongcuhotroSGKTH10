import { LESSONS_REGISTRY } from './lessonsRegistry';
import { getTeacherPrompts } from './teacherPromptsData';

export type GuidingPromptCategory = 'warmup' | 'prediction' | 'application';

export interface CategorizedGuidingPrompt {
  id: string;
  lessonId: number;
  category: GuidingPromptCategory;
  categoryLabelVi: string;
  categoryLabelEn: string;
  sectionIndex: number;
  questionVi: string;
  questionEn: string;
  hintVi: string;
  hintEn: string;
  answerVi: string;
  answerEn: string;
}

interface LessonPredictionOverride {
  questionVi: string;
  questionEn: string;
  hintVi: string;
  hintEn: string;
  answerVi: string;
  answerEn: string;
  sectionIndex?: number;
}

const SIMULATION_PREDICTIONS: Record<number, LessonPredictionOverride> = {
  1: {
    sectionIndex: 1,
    questionVi: 'Trước khi chạy mô phỏng Hình 1.1, theo em dữ liệu từ bàn phím sau khi qua CPU xử lí sẽ đi tiếp tới thành phần nào trước khi xuất ra màn hình?',
    questionEn: 'Before running Figure 1.1 simulation, where does keyboard data travel after CPU processing before reaching the monitor?',
    hintVi: 'Quan sát 4 khối trong chu trình xử lí thông tin: Thu nhận → Lưu trữ ↔ Xử lí → Xuất.',
    hintEn: 'Inspect the four blocks in the information processing cycle: Input → Storage ↔ Processing → Output.',
    answerVi: 'Dữ liệu được lưu trữ tạm thời trong bộ nhớ (RAM) để CPU truy xuất xử lí rồi chuyển sang khối thiết bị ra (màn hình / máy in).',
    answerEn: 'Data passes through memory (RAM) for CPU computation and then routes to the Output module (display / printer).'
  },
  19: {
    sectionIndex: 0,
    questionVi: 'Trước khi chạy mô phỏng rẽ nhánh 3D, nếu biến điều kiện x = 15 với câu lệnh `if x % 2 == 0:`, luồng tín hiệu sẽ đi vào nhánh nào?',
    questionEn: 'Before running the 3D branching gate, if x = 15 in `if x % 2 == 0:`, which execution branch activates?',
    hintVi: 'Tính số dư của 15 chia cho 2 rồi kiểm tra biểu thức lôgic có giá trị True hay False.',
    hintEn: 'Evaluate the remainder of 15 % 2 and check whether the boolean condition is True or False.',
    answerVi: '15 % 2 == 1 != 0 nên điều kiện nhận giá trị False; luồng thực thi bỏ qua khối if và đi vào nhánh else (nếu có).',
    answerEn: 'Since 15 % 2 == 1 != 0, the condition evaluates to False; execution skips the if block and follows the else branch.'
  },
  21: {
    sectionIndex: 0,
    questionVi: 'Trước khi chạy mô phỏng vòng lặp while: `k = 1; S = 0; while k < 100: S += k; k += 7`, vòng lặp sẽ dừng khi biến k đạt giá trị đầu tiên bằng bao nhiêu?',
    questionEn: 'Before running the while loop simulator (`k = 1; S = 0; while k < 100: S += k; k += 7`), what is the first value of k that stops the loop?',
    hintVi: 'Mỗi vòng k tăng thêm 7: 1, 8, 15, ... Tìm số hạng đầu tiên >= 100.',
    hintEn: 'k increases by 7 on each iteration: 1, 8, 15, ... Find the first term >= 100.',
    answerVi: 'Khi k = 99 vẫn thoả mãn k < 100 nên chạy thêm 1 vòng thành k = 99 + 7 = 106; điều kiện 106 < 100 sai nên vòng lặp dừng ở k = 106.',
    answerEn: 'At k = 99, 99 < 100 is True so one more step runs, updating k = 106; then 106 < 100 is False and the loop terminates.'
  },
  28: {
    sectionIndex: 0,
    questionVi: 'Trước khi bật/tắt từ khoá `global t` trong mô phỏng 3D (`t = 10; def f(n): t = 2*n + 1; f(1)`), nếu KHÔNG có `global t` thì biến `t` bên ngoài hàm bằng bao nhiêu?',
    questionEn: 'Before toggling `global t` in the 3D scope lab (`t = 10; def f(n): t = 2*n + 1; f(1)`), what is outer `t` WITHOUT `global t`?',
    hintVi: 'Khi gán biến mới bên trong hàm mà không khai báo `global`, Python tạo biến cục bộ mới che khuất biến ngoài.',
    hintEn: 'Assigning inside a function without `global` creates a separate local variable inside the function chamber.',
    answerVi: 'Biến t bên ngoài vẫn giữ nguyên giá trị 10; phép gán trong hàm chỉ thay đổi biến cục bộ bên trong thân hàm.',
    answerEn: 'Outer t remains unchanged at 10 because the inner assignment only creates and mutates a local variable.'
  },
  29: {
    sectionIndex: 0,
    questionVi: 'Trước khi chọn ngoại lệ trên Radar 3D, nếu chương trình viết `a = int("abc")` hoặc `print(x)` khi `x` chưa được gán giá trị, Python ném ra lỗi ngoại lệ tên gì?',
    questionEn: 'Before selecting an exception on the 3D Radar, which exception names are raised by `int("abc")` vs `print(x)` for an undefined `x`?',
    hintVi: 'Phân biệt giữa "sai định dạng giá trị chuyển đổi" và "tên biến chưa tồn tại".',
    hintEn: 'Distinguish between an invalid conversion value and an undefined identifier.',
    answerVi: '`int("abc")` gây lỗi ValueError (giá trị không hợp lệ), còn `print(x)` khi chưa khai báo gây lỗi NameError.',
    answerEn: '`int("abc")` raises ValueError, while referencing an undefined variable `x` raises NameError.'
  },
  30: {
    sectionIndex: 2,
    questionVi: 'Trước khi bấm "Bước tiếp" (Step Over) qua vòng lặp 1 của thuật toán Euclid với m = 20, n = 16, tại điểm dừng Breakpoint lần 2 cặp giá trị (m, n) sẽ là bao nhiêu?',
    questionEn: 'Before clicking Step Over through iteration 1 of Euclidean GCD with m = 20, n = 16, what will (m, n) be at Breakpoint Stop 2?',
    hintVi: 'Kiểm tra nhánh nào thực hiện khi m > n (20 > 16): m = m - n hay n = n - m?',
    hintEn: 'Check which branch runs when m > n (20 > 16): m = m - n or n = n - m?',
    answerVi: 'Vì 20 > 16 nên thực hiện nhánh else `m = m - n = 20 - 16 = 4`; tại lần dừng thứ 2 ở dòng while, ta có m = 4 và n = 16.',
    answerEn: 'Because 20 > 16, the else branch updates `m = m - n = 4`; at Breakpoint Stop 2, m = 4 and n = 16.'
  }
};

export const getCategorizedGuidingPrompts = (
  lessonId: number,
  activeSectionIndex: number = 0
): CategorizedGuidingPrompt[] => {
  const lesson = LESSONS_REGISTRY[lessonId] || LESSONS_REGISTRY[1];
  const totalSections = lesson.sections.length;
  const lastIdx = Math.max(0, totalSections - 1);

  const warmupSource = getTeacherPrompts(lesson.id, 0);
  const activeSource = getTeacherPrompts(lesson.id, Math.min(lastIdx, Math.max(0, activeSectionIndex)));
  const applySource = getTeacherPrompts(lesson.id, lastIdx);

  const firstWarmup = warmupSource.prompts[0] || activeSource.prompts[0];
  const predictionOverride = SIMULATION_PREDICTIONS[lesson.id];
  const midSectionPrompt =
    getTeacherPrompts(lesson.id, Math.min(lastIdx, 1)).prompts[0] || warmupSource.prompts[1] || firstWarmup;
  const lastApply = applySource.prompts[applySource.prompts.length - 1] || applySource.prompts[0];

  const list: CategorizedGuidingPrompt[] = [
    {
      id: `gp-${lesson.id}-warmup`,
      lessonId: lesson.id,
      category: 'warmup',
      categoryLabelVi: 'Khởi động',
      categoryLabelEn: 'Warm-up',
      sectionIndex: 0,
      questionVi: firstWarmup.questionVi,
      questionEn: firstWarmup.questionEn,
      hintVi: firstWarmup.pedagogicalTipVi,
      hintEn: firstWarmup.pedagogicalTipEn,
      answerVi: firstWarmup.suggestedAnswerVi,
      answerEn: firstWarmup.suggestedAnswerEn
    },
    predictionOverride
      ? {
          id: `gp-${lesson.id}-prediction`,
          lessonId: lesson.id,
          category: 'prediction',
          categoryLabelVi: 'Dự đoán trước khi mô phỏng',
          categoryLabelEn: 'Pre-Simulation Prediction',
          sectionIndex: predictionOverride.sectionIndex ?? 0,
          questionVi: predictionOverride.questionVi,
          questionEn: predictionOverride.questionEn,
          hintVi: predictionOverride.hintVi,
          hintEn: predictionOverride.hintEn,
          answerVi: predictionOverride.answerVi,
          answerEn: predictionOverride.answerEn
        }
      : {
          id: `gp-${lesson.id}-prediction`,
          lessonId: lesson.id,
          category: 'prediction',
          categoryLabelVi: 'Dự đoán trước khi mô phỏng',
          categoryLabelEn: 'Pre-Simulation Prediction',
          sectionIndex: Math.min(lastIdx, 1),
          questionVi: `Trước khi chạy mô phỏng / ví dụ trong "${lesson.titleVi}", em dự đoán kết quả hoặc trạng thái đầu ra sẽ thay đổi ra sao khi thay đổi dữ liệu đầu vào? (${midSectionPrompt.questionVi})`,
          questionEn: `Before running the interactive simulation/example in "${lesson.titleEn}", what output or state shift do you predict when inputs change? (${midSectionPrompt.questionEn})`,
          hintVi: midSectionPrompt.pedagogicalTipVi,
          hintEn: midSectionPrompt.pedagogicalTipEn,
          answerVi: midSectionPrompt.suggestedAnswerVi,
          answerEn: midSectionPrompt.suggestedAnswerEn
        },
    {
      id: `gp-${lesson.id}-application`,
      lessonId: lesson.id,
      category: 'application',
      categoryLabelVi: 'Vận dụng sau khi học',
      categoryLabelEn: 'Post-Lesson Application',
      sectionIndex: lastIdx,
      questionVi: lastApply.questionVi,
      questionEn: lastApply.questionEn,
      hintVi: lastApply.pedagogicalTipVi,
      hintEn: lastApply.pedagogicalTipEn,
      answerVi: lastApply.suggestedAnswerVi,
      answerEn: lastApply.suggestedAnswerEn
    }
  ];

  // Include active section contextual prompt as extra item if reading a middle section
  if (activeSectionIndex > 0 && activeSectionIndex < lastIdx && activeSource.prompts[1]) {
    const extra = activeSource.prompts[1];
    list.push({
      id: `gp-${lesson.id}-sec-${activeSectionIndex}`,
      lessonId: lesson.id,
      category: 'application',
      categoryLabelVi: `Thảo luận Mục ${activeSectionIndex + 1}`,
      categoryLabelEn: `Section ${activeSectionIndex + 1} Discussion`,
      sectionIndex: activeSectionIndex,
      questionVi: extra.questionVi,
      questionEn: extra.questionEn,
      hintVi: extra.pedagogicalTipVi,
      hintEn: extra.pedagogicalTipEn,
      answerVi: extra.suggestedAnswerVi,
      answerEn: extra.suggestedAnswerEn
    });
  }

  return list;
};
