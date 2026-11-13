import { getLesson } from './lessonsRegistry';
import { getCategorizedGuidingPrompts } from './guidingQuestionsHelper';
import { getLessonVocabulary } from './lessonVocabSupport';

export type TeachStageId = 'warmup' | 'hands_on' | 'discussion' | 'wrap_up';

export type ClassroomSituationId =
  | 'opening'
  | 'task_instruction'
  | 'pair_work'
  | 'invite_answer'
  | 'follow_up'
  | 'feedback';

export type FollowUpGroupId = 'evidence' | 'rephrase' | 'reason' | 'invite_peer';

export interface ClassroomPhraseItem {
  id: string;
  situation: ClassroomSituationId;
  en: string;
  vi: string;
  tipVi: string;
  tipEn: string;
  tags: string[];
}

export interface QuickFollowUpItem {
  id: string;
  group: FollowUpGroupId;
  en: string;
  vi: string;
  hintVi: string;
  hintEn: string;
}

export interface AnswerScaffold {
  keywordsEn: string[];
  keywordsVi: string[];
  starterEn: string;
  starterVi: string;
  fullSampleEn: string;
  fullSampleVi: string;
}

export interface TeachSimPromptItem {
  id: string;
  stage: TeachStageId;
  sectionIndex: number;
  simId?: string;
  simMode?: 'breakpoint' | 'boundary' | 'euclid';
  targetLine?: number;
  targetStep?: number;
  codeContext?: string;
  variableWatchNoteEn?: string;
  variableWatchNoteVi?: string;
  questionEn: string;
  questionVi: string;
  teacherHintEn: string;
  teacherHintVi: string;
  explanationEn: string;
  explanationVi: string;
  scaffold: AnswerScaffold;
}

export interface PairDialogueCard {
  id: string;
  sectionIndex: number;
  titleEn: string;
  titleVi: string;
  roleA: {
    labelEn: string;
    labelVi: string;
    taskEn: string;
    taskVi: string;
    promptLinesEn: string[];
    promptLinesVi: string[];
  };
  roleB: {
    labelEn: string;
    labelVi: string;
    taskEn: string;
    taskVi: string;
    promptLinesEn: string[];
    promptLinesVi: string[];
  };
  teacherHintEn: string;
  teacherHintVi: string;
}

export interface TeachPollOption {
  id: string;
  labelEn: string;
  labelVi: string;
}

export interface TeachPollQuestion {
  id: string;
  sectionIndex: number;
  questionEn: string;
  questionVi: string;
  options: TeachPollOption[];
  correctOptionId?: string;
  explanationEn: string;
  explanationVi: string;
}

export interface ExitTicketFrame {
  id: string;
  sectionIndex: number;
  frameEn: string;
  frameVi: string;
  sampleEn: string;
  sampleVi: string;
  teacherHintVi: string;
  teacherHintEn: string;
}

export interface TeachLessonScript {
  lessonId: number;
  isAuthoredSample: boolean;
  titleEn: string;
  titleVi: string;
  stages: Record<
    TeachStageId,
    {
      labelEn: string;
      labelVi: string;
      goalEn: string;
      goalVi: string;
      defaultSectionIndex: number;
    }
  >;
  prompts: TeachSimPromptItem[];
  pairDialogue: PairDialogueCard;
  pollQuestions: TeachPollQuestion[];
  exitTicketFrames: ExitTicketFrame[];
}

export const TEACH_STAGE_ORDER: TeachStageId[] = [
  'warmup',
  'hands_on',
  'discussion',
  'wrap_up'
];

export const CLASSROOM_SITUATION_LABELS: Record<
  ClassroomSituationId,
  { en: string; vi: string }
> = {
  opening: { en: 'Opening Lesson', vi: 'Mở bài' },
  task_instruction: { en: 'Assigning Tasks', vi: 'Giao thao tác' },
  pair_work: { en: 'Pair Work', vi: 'Làm việc theo cặp' },
  invite_answer: { en: 'Inviting Answers', vi: 'Mời trả lời' },
  follow_up: { en: 'Follow-up Questions', vi: 'Hỏi tiếp' },
  feedback: { en: 'Feedback & Praise', vi: 'Nhận xét' }
};

export const CLASSROOM_PHRASES: ClassroomPhraseItem[] = [
  // Opening
  {
    id: 'cp-open-1',
    situation: 'opening',
    en: "Good morning, everyone. Today we are exploring how to test and debug a program.",
    vi: 'Chào cả lớp. Hôm nay chúng ta sẽ khám phá cách kiểm thử và gỡ lỗi một chương trình.',
    tipVi: 'Nói chậm 0.7x để học sinh bắt từ khóa "test" và "debug".',
    tipEn: 'Play at 0.7x speed so students catch key terms "test" and "debug".',
    tags: ['greeting', 'objective', 'lesson 30']
  },
  {
    id: 'cp-open-2',
    situation: 'opening',
    en: 'Look at the screen. Before we run the code, what do you think happens first?',
    vi: 'Hãy nhìn lên màn hình. Trước khi chạy mã, theo em điều gì xảy ra trước tiên?',
    tipVi: 'Dừng lại 5 giây chờ học sinh giơ tay trước khi bật từ khóa.',
    tipEn: 'Pause 5 seconds for predictions before revealing keywords.',
    tags: ['warmup', 'predict', 'screen']
  },
  {
    id: 'cp-open-3',
    situation: 'opening',
    en: 'A program without crash errors can still contain a hidden logic bug.',
    vi: 'Một chương trình không báo lỗi dừng đột ngột vẫn có thể chứa lỗi lôgic tiềm ẩn.',
    tipVi: 'Liên hệ với phần Khởi động SGK Trang 145.',
    tipEn: 'Connect to Textbook Warm-up on page 145.',
    tags: ['bug', 'silent error', 'warmup']
  },
  // Task instruction
  {
    id: 'cp-task-1',
    situation: 'task_instruction',
    en: 'Please open the 3D simulation and click Step Over one line at a time.',
    vi: 'Hãy mở mô phỏng 3D và bấm Step Over từng dòng lệnh một.',
    tipVi: 'Chỉ rõ nút Step Over / Bước tiếp trên bảng mô phỏng.',
    tipEn: 'Point to the Step Over button on the simulation panel.',
    tags: ['step over', 'simulation', 'hands-on']
  },
  {
    id: 'cp-task-2',
    situation: 'task_instruction',
    en: 'Watch the variable table carefully and compare it with your prediction.',
    vi: 'Quan sát kĩ bảng theo dõi biến và đối chiếu với dự đoán của em.',
    tipVi: 'Hướng sự chú ý của lớp vào các biến m, n, k hoặc x, y.',
    tipEn: 'Direct student attention to watch variables m, n, k or x, y.',
    tags: ['watch', 'variables', 'observe']
  },
  {
    id: 'cp-task-3',
    situation: 'task_instruction',
    en: 'Pause at the breakpoint on line 4 and check the loop condition.',
    vi: 'Hãy dừng ở điểm dừng tại dòng 4 và kiểm tra điều kiện vòng lặp.',
    tipVi: 'Dùng nút Dừng (Pause) ngay trước khi chạy tiếp.',
    tipEn: 'Use the Pause action right before stepping through.',
    tags: ['breakpoint', 'line 4', 'pause']
  },
  // Pair work
  {
    id: 'cp-pair-1',
    situation: 'pair_work',
    en: 'Work in pairs for two minutes. Student A explains the bug; Student B asks for the input.',
    vi: 'Làm việc theo cặp trong 2 phút. Bạn A mô tả lỗi; bạn B hỏi dữ liệu đầu vào đã dùng.',
    tipVi: 'Sau 1 phút, bấm nút Đổi vai để cả hai luyện nói.',
    tipEn: 'After 1 minute, click Swap Roles so both practice.',
    tags: ['pair', 'role', 'dialogue']
  },
  {
    id: 'cp-pair-2',
    situation: 'pair_work',
    en: 'Now swap roles! Student B becomes the debugger and Student A suggests a boundary test.',
    vi: 'Bây giờ đổi vai nhé! Bạn B đóng vai người gỡ lỗi và bạn A đề xuất bộ test vùng biên.',
    tipVi: 'Nhấn nút Đổi vai trên màn hình trình chiếu.',
    tipEn: 'Press the Swap Roles button on the controller.',
    tags: ['swap roles', 'boundary', 'pair']
  },
  // Invite answer
  {
    id: 'cp-inv-1',
    situation: 'invite_answer',
    en: 'Who would like to share their prediction using the sentence starter on the board?',
    vi: 'Bạn nào muốn chia sẻ dự đoán bằng câu mở đầu trên bảng?',
    tipVi: 'Bật nút "Hiện câu mở đầu" trước khi gọi học sinh.',
    tipEn: 'Reveal Sentence Starter before calling on a student.',
    tags: ['prediction', 'starter', 'share']
  },
  {
    id: 'cp-inv-2',
    situation: 'invite_answer',
    en: 'Scan the QR code on your phone and submit your vote. No name is required.',
    vi: 'Quét mã QR trên điện thoại và gửi bình chọn của em. Không cần nhập họ tên.',
    tipVi: 'Nếu lớp không dùng điện thoại, chuyển sang chế độ Bình chọn tại lớp.',
    tipEn: 'If phones are unavailable, switch to In-Class Hand-Raise mode.',
    tags: ['poll', 'qr', 'vote']
  },
  // Follow up
  {
    id: 'cp-fu-1',
    situation: 'follow_up',
    en: 'Which line supports your answer?',
    vi: 'Dòng lệnh nào chứng minh cho câu trả lời của em?',
    tipVi: 'Yêu cầu học sinh đọc số dòng (ví dụ: dòng 4 hoặc dòng 9).',
    tipEn: 'Ask the student to point to the exact line number.',
    tags: ['evidence', 'line', 'follow-up']
  },
  {
    id: 'cp-fu-2',
    situation: 'follow_up',
    en: 'Can you explain why the output changed when we added that condition?',
    vi: 'Em có thể giải thích vì sao kết quả thay đổi khi chúng ta thêm điều kiện đó không?',
    tipVi: 'Dùng khi học sinh trả lời đúng nhưng chưa nêu lý do.',
    tipEn: 'Use when a student gives the right answer without reasoning.',
    tags: ['reason', 'condition', 'why']
  },
  // Feedback
  {
    id: 'cp-fb-1',
    situation: 'feedback',
    en: 'Great observation! You spotted the exact line where the variable changed.',
    vi: 'Quan sát rất tốt! Em đã chỉ đúng dòng lệnh làm giá trị biến thay đổi.',
    tipVi: 'Khen ngợi ngắn gọn và nhắc lại từ khóa chuẩn.',
    tipEn: 'Praise concisely and reinforce the core keyword.',
    tags: ['praise', 'observation', 'variable']
  },
  {
    id: 'cp-fb-2',
    situation: 'feedback',
    en: 'Good attempt! Look closely at the index starting at zero and try again.',
    vi: 'Cố gắng tốt lắm! Hãy nhìn kĩ chỉ số bắt đầu từ 0 và thử lại nhé.',
    tipVi: 'Phản hồi tích cực khi học sinh đoán nhầm chỉ số danh sách.',
    tipEn: 'Constructive feedback when students miss 0-based indexing.',
    tags: ['encourage', 'index 0', 'retry']
  }
];

export const FOLLOWUP_GROUP_LABELS: Record<
  FollowUpGroupId,
  { en: string; vi: string }
> = {
  evidence: { en: 'Ask for Evidence', vi: 'Nêu bằng chứng' },
  rephrase: { en: 'Ask to Rephrase', vi: 'Diễn đạt lại' },
  reason: { en: 'Add Reasoning', vi: 'Bổ sung lý do' },
  invite_peer: { en: 'Invite Another Student', vi: 'Mời HS khác' }
};

export const QUICK_FOLLOWUPS: QuickFollowUpItem[] = [
  {
    id: 'fu-ev-1',
    group: 'evidence',
    en: 'Which line supports your answer?',
    vi: 'Dòng lệnh nào chứng minh cho câu trả lời của em?',
    hintVi: 'Yêu cầu học sinh chỉ số dòng cụ thể trong code hoặc bảng Watch.',
    hintEn: 'Have the student cite the specific line number or Watch table row.'
  },
  {
    id: 'fu-ev-2',
    group: 'evidence',
    en: 'What value in the watch table proves your idea?',
    vi: 'Giá trị nào trong bảng theo dõi biến chứng minh cho ý kiến của em?',
    hintVi: 'Hướng dẫn nhìn vào giá trị m, n hoặc k.',
    hintEn: 'Point to m, n, or k values in the watch window.'
  },
  {
    id: 'fu-rep-1',
    group: 'rephrase',
    en: 'Can you put that in your own words in English?',
    vi: 'Em có thể diễn đạt lại ý đó bằng cách nói ngắn gọn của riêng em không?',
    hintVi: 'Cho phép học sinh dùng 1 câu ngắn theo khung.',
    hintEn: 'Encourage a short sentence using the scaffold frame.'
  },
  {
    id: 'fu-rep-2',
    group: 'rephrase',
    en: 'How would you explain this bug to your partner?',
    vi: 'Em sẽ giải thích lỗi này cho bạn cùng bàn như thế nào?',
    hintVi: 'Khuyến khích dùng từ khóa đơn giản.',
    hintEn: 'Encourage simple step-by-step phrasing.'
  },
  {
    id: 'fu-rea-1',
    group: 'reason',
    en: 'Why did the program enter the else branch instead of the if branch?',
    vi: 'Vì sao chương trình rẽ vào nhánh else thay vì nhánh if?',
    hintVi: 'Kiểm tra phép so sánh điều kiện m < n.',
    hintEn: 'Check the comparison condition m < n.'
  },
  {
    id: 'fu-rea-2',
    group: 'reason',
    en: 'Why do boundary values like 0 or 1 often reveal hidden bugs?',
    vi: 'Tại sao các giá trị vùng biên như 0 hay 1 thường làm lộ lỗi tiềm ẩn?',
    hintVi: 'Liên hệ với phép chia cho 0 hoặc điều kiện biên < và <=.',
    hintEn: 'Connect to division by zero and < vs <= boundaries.'
  },
  {
    id: 'fu-peer-1',
    group: 'invite_peer',
    en: 'Who agrees or has a different prediction? Please add on.',
    vi: 'Bạn nào đồng ý hoặc có dự đoán khác? Hãy bổ sung giúp bạn.',
    hintVi: 'Mời một học sinh khác nhận xét ngắn gọn.',
    hintEn: 'Call on another student to build on or challenge the idea.'
  },
  {
    id: 'fu-peer-2',
    group: 'invite_peer',
    en: 'Can another student suggest a different test case for this code?',
    vi: 'Một bạn khác có thể đề xuất một trường hợp kiểm thử khác cho đoạn mã này không?',
    hintVi: 'Gợi ý chọn test vùng biên hoặc test ngẫu nhiên.',
    hintEn: 'Prompt for a boundary or randomized test case.'
  }
];

const LESSON_30_SCRIPT: TeachLessonScript = {
  lessonId: 30,
  isAuthoredSample: true,
  titleEn: 'Lesson 30: Testing and Debugging Programs',
  titleVi: 'Bài 30: Kiểm thử và gỡ lỗi chương trình',
  stages: {
    warmup: {
      labelEn: '1. Warm-up',
      labelVi: '1. Khởi động',
      goalEn: 'Activate curiosity about silent bugs and IDE breakpoints before inspecting code.',
      goalVi: 'Khởi động tư duy về lỗi logic ẩn và tác dụng của điểm dừng (breakpoint).',
      defaultSectionIndex: 0
    },
    hands_on: {
      labelEn: '2. Hands-on & 3D Lab',
      labelVi: '2. Thao tác & Mô phỏng 3D',
      goalEn: 'Pause, predict variable values, step through the 3D Debugger & Watch table, then explain.',
      goalVi: 'Dừng mô phỏng, dự đoán biến, chạy từng bước qua bảng Watch và giải thích.',
      defaultSectionIndex: 2
    },
    discussion: {
      labelEn: '3. Pair & Live Discussion',
      labelVi: '3. Thảo luận & Bình chọn',
      goalEn: 'Practice speaking in pairs (driver/tester), ask for line evidence, and run a live poll.',
      goalVi: 'Thực hành hội thoại theo cặp, hỏi bằng chứng theo dòng và bình chọn trực tiếp.',
      defaultSectionIndex: 3
    },
    wrap_up: {
      labelEn: '4. Wrap-up & Exit Ticket',
      labelVi: '4. Tổng kết & Phiếu cuối tiết',
      goalEn: 'Consolidate vocabulary and collect one concise English reflection sentence.',
      goalVi: 'Tổng kết kiến thức và thu phiếu cuối tiết bằng 1 câu tiếng Anh ngắn.',
      defaultSectionIndex: 3
    }
  },
  prompts: [
    {
      id: 'l30-p-warmup',
      stage: 'warmup',
      sectionIndex: 0,
      simId: 'debugger3d-breakpoint',
      simMode: 'breakpoint',
      targetLine: 4,
      codeContext: `m = 20\nn = 16\nk = 0\nwhile m != n:   # Line 4 [BREAKPOINT]`,
      variableWatchNoteEn: 'Linked to Debugger3DLab (Breakpoint Chamber, Line 4)',
      variableWatchNoteVi: 'Gắn với Buồng Điểm Dừng 3D (Dòng 4: while m != n:)',
      questionEn: 'What do you think a breakpoint does?',
      questionVi: 'Theo em, điểm dừng (breakpoint) dùng để làm gì?',
      teacherHintEn:
        'Guide students toward "pausing execution" at Line 4 so programmers can inspect m, n, and k in memory.',
      teacherHintVi:
        'Gợi ý học sinh ý "tạm dừng chương trình" tại dòng 4 để kiểm tra giá trị biến m, n, k trong bộ nhớ.',
      explanationEn:
        'A breakpoint pauses program execution at a chosen line (such as Line 4: while m != n:) so we can inspect variable values and trace program logic step by step.',
      explanationVi:
        'Điểm dừng tạm ngưng chương trình tại dòng lệnh được chọn (ví dụ dòng 4: while m != n:) để người lập trình quan sát giá trị biến và kiểm tra lôgic.',
      scaffold: {
        keywordsEn: ['breakpoint', 'pause', 'line 4', 'inspect variables', 'm, n, k'],
        keywordsVi: ['điểm dừng', 'tạm dừng', 'dòng 4', 'kiểm tra biến'],
        starterEn: 'I think a breakpoint pauses the program at … so we can …',
        starterVi: 'Em nghĩ điểm dừng giúp tạm ngưng chương trình tại … để chúng ta có thể …',
        fullSampleEn:
          'I think a breakpoint pauses the program at Line 4 (while m != n:) so we can inspect the values of m, n, and k before each loop iteration.',
        fullSampleVi:
          'Em nghĩ điểm dừng giúp tạm ngưng chương trình tại Dòng 4 (while m != n:) để kiểm tra giá trị các biến m, n và k trước mỗi vòng lặp.'
      }
    },
    {
      id: 'l30-p-predict-x',
      stage: 'hands_on',
      sectionIndex: 1,
      simId: 'boundary-radar-xy',
      simMode: 'boundary',
      codeContext: `# Section 1 Boundary Check (0 <= x, y <= 1) & Line Trace\nx = 20\ny = 16\nx = x - y   # Inspect x after this line runs\n# In Section 1 Radar (0 <= x, y <= 1): boundary corners are (0,0), (0,1), (1,0), (1,1)`,
      variableWatchNoteEn:
        'Aligns the prediction prompt variable x with Section 1 Boundary Radar (0 <= x, y <= 1) and Section 2 subtraction m = m - n (where m plays the role of x).',
      variableWatchNoteVi:
        'Đối chiếu biến x với Radar Vùng Biên Mục 1 (0 <= x, y <= 1) và phép trừ Euclid m = m - n ở Mục 2.',
      questionEn: 'What will the value of `x` be after this line runs?',
      questionVi: 'Giá trị của biến `x` sau khi dòng lệnh này chạy sẽ là bao nhiêu?',
      teacherHintEn:
        'Pause before running `x = x - y` (or Line 9 `m = m - n` in Euclid Debug). Remind students that x starts at 20 and y is 16 (and in Boundary Radar, x sits on boundary 0 or 1).',
      teacherHintVi:
        'Dừng trước khi chạy dòng `x = x - y` (tương ứng dòng 9 `m = m - n` trong Euclid Debug với m=20, n=16). Cho học sinh đối chiếu giá trị cũ trước khi tính.',
      explanationEn:
        'Because x = 20 and y = 16, executing `x = x - y` updates x to 20 - 16 = 4 while y remains 16. Likewise, in Section 1 Boundary Radar (0 <= x, y <= 1), edge tests check corner values x = 0 and x = 1.',
      explanationVi:
        'Vì x = 20 và y = 16, sau khi chạy `x = x - y` thì x được gán bằng 20 - 16 = 4 (giống biến m ở dòng 9 Euclid Debug), còn y giữ nguyên 16.',
      scaffold: {
        keywordsEn: ['x = 4', 'subtract', '20 - 16', 'assign', 'unchanged y'],
        keywordsVi: ['x = 4', 'phép trừ', 'gán giá trị mới', '20 - 16'],
        starterEn: 'I predict that `x` will be … because …',
        starterVi: 'Em dự đoán biến `x` sẽ có giá trị … vì …',
        fullSampleEn:
          'I predict that `x` will be 4 because 20 minus 16 equals 4 and the assignment stores the new result back into `x`.',
        fullSampleVi:
          'Em dự đoán `x` sẽ bằng 4 vì 20 trừ 16 bằng 4 và lệnh gán lưu kết quả mới vào biến `x`.'
      }
    },
    {
      id: 'l30-p-predict-mn',
      stage: 'hands_on',
      sectionIndex: 2,
      simId: 'euclid-stepper',
      simMode: 'euclid',
      targetLine: 9,
      targetStep: 4,
      codeContext: `1: m = 20\n2: n = 16\n3: k = 0\n4: while m != n:   ● BREAKPOINT\n5:     k = k + 1\n6:     if m < n:\n7:         n = n - m\n8:     else:\n9:         m = m - n   <-- Predict here!\n10:    print("Vòng lặp", k, ":", m, n)`,
      variableWatchNoteEn:
        'Directly controls Section 2 Step Over Debugger (`euclid_debug.py`, Lines 1–11) & Debugger3DLab Euclid Towers.',
      variableWatchNoteVi:
        'Điều khiển trực tiếp Trình mô phỏng Step Over Mục 2 (`euclid_debug.py`, dòng 1–11) và Tháp Euclid 3D.',
      questionEn: 'At Line 9 (`m = m - n`) with `m = 20, n = 16`, what are `m` and `n` at Stop 2?',
      questionVi: 'Tại Dòng 9 (`m = m - n`) với `m = 20, n = 16`, giá trị `m` và `n` ở lần dừng 2 là bao nhiêu?',
      teacherHintEn:
        'Pause at Step 4 (Line 9). Ask students whether `m < n` is True or False first before clicking Step Over.',
      teacherHintVi:
        'Dừng ở bước trước Dòng 9. Hỏi học sinh `if m < n:` đúng hay sai trước khi bấm Step Over.',
      explanationEn:
        'Since m = 20 is NOT less than n = 16, Python enters the `else` branch at Line 9 and computes m = 20 - 16 = 4. Variable n stays 16, and k becomes 1.',
      explanationVi:
        'Do m = 20 không nhỏ hơn n = 16, chương trình vào nhánh else ở Dòng 9 và tính m = 20 - 16 = 4; biến n giữ nguyên 16 và k = 1.',
      scaffold: {
        keywordsEn: ['else branch', 'm = 4', 'n = 16', 'k = 1', 'False'],
        keywordsVi: ['nhánh else', 'm = 4', 'n = 16', 'điều kiện sai'],
        starterEn: 'I predict that `m` will be … and `n` will be … because Line 6 is …',
        starterVi: 'Em dự đoán `m` sẽ là … và `n` sẽ là … vì điều kiện ở dòng 6 …',
        fullSampleEn:
          'I predict that `m` will be 4 and `n` will stay 16 because `20 < 16` is False, so Line 9 in the `else` branch subtracts 16 from 20.',
        fullSampleVi:
          'Em dự đoán `m` sẽ là 4 và `n` vẫn là 16 vì `20 < 16` sai nên Dòng 9 ở nhánh `else` lấy 20 trừ 16.'
      }
    },
    {
      id: 'l30-p-insertion-bug',
      stage: 'discussion',
      sectionIndex: 3,
      simId: 'practice-insertion-sort',
      targetLine: 7,
      codeContext: `A = [3, 1, 0, 10, 2]\nfor i in range(len(A) - 1):   # Bug 1: skips last element\n    value = A[i]\n    j = i\n    while j > 1 and A[j - 1] > value:  # Bug 2: skips index 0!\n        A[j] = A[j - 1]\n        j = j - 1\n    A[j] = value`,
      variableWatchNoteEn:
        'Linked to Section 3 Application 1 (`insertion_sort.py` in Section30PracticeApply).',
      variableWatchNoteVi:
        'Gắn với Vận dụng 1 Mục 3 (`insertion_sort.py` trong Luyện tập & Vận dụng).',
      questionEn: 'Which line supports your answer about why `0` fails to reach index `0`?',
      questionVi: 'Dòng lệnh nào chứng minh vì sao phần tử `0` không thể về vị trí chỉ số `0`?',
      teacherHintEn:
        'Point to `while j > 1 and A[j - 1] > value:` and remind students Python lists start at index 0.',
      teacherHintVi:
        'Chỉ vào dòng `while j > 1 and A[j - 1] > value:` và nhắc chỉ số mảng Python bắt đầu từ 0.',
      explanationEn:
        'The line `while j > 1 and A[j - 1] > value:` stops when j = 1, so element `A[0]` is never swapped with `A[1]`. Changing `j > 1` to `j > 0` fixes this bug (and changing the outer loop to `range(1, len(A))` includes the last item).',
      explanationVi:
        'Dòng `while j > 1 and A[j - 1] > value:` dừng khi j = 1 nên `A[0]` không bao giờ được xét. Cần sửa thành `while j > 0` (và vòng ngoài thành `range(1, len(A))`).',
      scaffold: {
        keywordsEn: ['while j > 1', 'index 0', 'stops early', 'change to j > 0'],
        keywordsVi: ['while j > 1', 'chỉ số 0', 'dừng sớm', 'sửa thành j > 0'],
        starterEn: 'The line that supports my answer is … because when j equals 1, …',
        starterVi: 'Dòng lệnh chứng minh là … vì khi j bằng 1 thì …',
        fullSampleEn:
          'The line `while j > 1 and A[j - 1] > value:` supports my answer because when `j` reaches 1 the loop stops, so index 0 (`A[0]`) is never compared; changing it to `j > 0` fixes the bug.',
        fullSampleVi:
          'Dòng `while j > 1 and A[j - 1] > value:` chứng minh câu trả lời vì khi `j = 1` vòng lặp dừng, bỏ qua `A[0]`; cần sửa thành `j > 0`.'
      }
    }
  ],
  pairDialogue: {
    id: 'l30-pair-1',
    sectionIndex: 3,
    titleEn: 'Bug Triage & Test Case Pair Dialogue (Lesson 30 Practice)',
    titleVi: 'Hội thoại theo cặp: Mô tả lỗi & Đề xuất ca kiểm thử (Luyện tập Bài 30)',
    roleA: {
      labelEn: 'Role A — Programmer (Bug Reporter)',
      labelVi: 'Vai A — Lập trình viên (Mô tả lỗi)',
      taskEn:
        'Describe a real bug from Lesson 30 Practice (e.g., `m + n` outputs "1234" for `12` and `34`, OR `100 / b` crashes with `ZeroDivisionError`).',
      taskVi:
        'Mô tả một lỗi thực tế trong Bài 30 (ví dụ: `m + n` in ra "1234" khi nhập `12`, `34` hoặc `100 / b` gây lỗi `ZeroDivisionError`).',
      promptLinesEn: [
        'I ran my program, and instead of getting 46, it printed "1234".',
        'I think the bug is on the line with `m + n` because `input()` returns strings.'
      ],
      promptLinesVi: [
        'Mình chạy chương trình và thay vì ra 46, nó lại in "1234".',
        'Mình nghĩ lỗi ở dòng `m + n` vì `input()` trả về xâu kí tự.'
      ]
    },
    roleB: {
      labelEn: 'Role B — Tester (Questioner)',
      labelVi: 'Vai B — Kiểm thử viên (Hỏi & Đề xuất test)',
      taskEn:
        'Ask "What input did you use?" first, then suggest a concrete test case (normal or boundary) and check the fix (`int(input())` or `if b != 0:`).',
      taskVi:
        'Hỏi "What input did you use?" trước, sau đó đề xuất một bộ test cụ thể (thông thường hoặc vùng biên) và kiểm tra cách sửa.',
      promptLinesEn: [
        'What input did you use?',
        'Let us test with boundary inputs `0` and `5`, and convert both inputs using `int()`.'
      ],
      promptLinesVi: [
        'Bạn đã dùng dữ liệu đầu vào nào?',
        'Hãy thử với bộ kiểm thử vùng biên `0` và `5`, và ép kiểu bằng `int()`.'
      ]
    },
    teacherHintEn:
      'Have pairs speak for 60 seconds, then press "Swap Roles" so Role B describes the Insertion Sort (`while j > 1`) bug and Role A suggests a boundary list like `[3, 1, 0, 10, 2]`.',
    teacherHintVi:
      'Cho mỗi cặp nói 60 giây rồi bấm "Đổi vai" để bạn B mô tả lỗi khác (ví dụ `ZeroDivisionError` hoặc `while j > 1`) và bạn A đề xuất test case.'
  },
  pollQuestions: [
    {
      id: 'l30-poll-1',
      sectionIndex: 2,
      questionEn:
        'In euclid_debug.py (m = 20, n = 16), after Line 9 (m = m - n) runs, what are (m, n)?',
      questionVi:
        'Trong euclid_debug.py (m = 20, n = 16), sau khi dòng 9 (m = m - n) chạy, (m, n) bằng bao nhiêu?',
      options: [
        { id: 'a', labelEn: 'A. m = 4, n = 16', labelVi: 'A. m = 4, n = 16' },
        { id: 'b', labelEn: 'B. m = 20, n = 4', labelVi: 'B. m = 20, n = 4' },
        { id: 'c', labelEn: 'C. m = 16, n = 4', labelVi: 'C. m = 16, n = 4' },
        { id: 'd', labelEn: 'D. m = 4, n = 4', labelVi: 'D. m = 4, n = 4' }
      ],
      correctOptionId: 'a',
      explanationEn: '20 > 16 triggers the else branch (Line 9): m = 20 - 16 = 4 while n remains 16.',
      explanationVi: 'Vì 20 > 16 nên vào nhánh else (dòng 9): m = 20 - 16 = 4, còn n giữ nguyên 16.'
    },
    {
      id: 'l30-poll-2',
      sectionIndex: 3,
      questionEn:
        'In insertion_sort.py, which line causes element A[0] to be skipped during comparisons?',
      questionVi:
        'Trong insertion_sort.py, dòng nào khiến phần tử A[0] bị bỏ qua khi so sánh?',
      options: [
        { id: 'a', labelEn: 'A. value = A[i]', labelVi: 'A. value = A[i]' },
        { id: 'b', labelEn: 'B. while j > 1 and A[j - 1] > value:', labelVi: 'B. while j > 1 and A[j - 1] > value:' },
        { id: 'c', labelEn: 'C. j = j - 1', labelVi: 'C. j = j - 1' },
        { id: 'd', labelEn: 'D. print(A)', labelVi: 'D. print(A)' }
      ],
      correctOptionId: 'b',
      explanationEn: 'Stopping at j > 1 leaves index 0 uncompared; it must be while j > 0.',
      explanationVi: 'Điều kiện j > 1 dừng sớm khi j = 1 nên bỏ qua chỉ số 0; cần sửa thành j > 0.'
    }
  ],
  exitTicketFrames: [
    {
      id: 'l30-et-1',
      sectionIndex: 3,
      frameEn: 'One bug I found today was … I fixed it by …',
      frameVi: 'Một lỗi em phát hiện hôm nay là … Em đã sửa bằng cách …',
      sampleEn:
        'One bug I found today was string concatenation in `m + n`. I fixed it by converting inputs with `int()`.',
      sampleVi:
        'Một lỗi em phát hiện hôm nay là nối xâu ở `m + n`. Em đã sửa bằng cách ép kiểu với `int()`.',
      teacherHintVi: 'Chọn khung này để học sinh viết hoặc nói 1 câu tổng kết cuối tiết.',
      teacherHintEn: 'Select this frame for students to speak or submit via phone at lesson wrap-up.'
    },
    {
      id: 'l30-et-2',
      sectionIndex: 2,
      frameEn: 'At the breakpoint on line …, the variable … changed from … to …',
      frameVi: 'Tại điểm dừng ở dòng …, biến … đã đổi từ … thành …',
      sampleEn:
        'At the breakpoint on line 9, the variable `m` changed from 20 to 4.',
      sampleVi:
        'Tại điểm dừng ở dòng 9, biến `m` đã đổi từ 20 thành 4.',
      teacherHintVi: 'Phù hợp khi muốn củng cố kĩ năng đọc bảng Watch.',
      teacherHintEn: 'Useful for reinforcing watch-table tracing.'
    },
    {
      id: 'l30-et-3',
      sectionIndex: 1,
      frameEn: 'A good boundary test case for this program is … because …',
      frameVi: 'Một bộ kiểm thử vùng biên tốt cho chương trình này là … vì …',
      sampleEn:
        'A good boundary test case for this program is `b = 0` because dividing by zero triggers `ZeroDivisionError`.',
      sampleVi:
        'Một bộ test vùng biên tốt là `b = 0` vì phép chia cho 0 sẽ gây lỗi `ZeroDivisionError`.',
      teacherHintVi: 'Giúp liên hệ Mục 1 (Vùng biên) với Bài tập thực hành.',
      teacherHintEn: 'Connects Section 1 (Boundary Testing) with practice code.'
    }
  ]
};

export const TEACH_SCRIPTS_BY_LESSON: Record<number, TeachLessonScript> = {
  30: LESSON_30_SCRIPT
};

export function getTeachLessonScript(lessonId: number): TeachLessonScript {
  const authored = TEACH_SCRIPTS_BY_LESSON[lessonId];
  if (authored) return authored;

  const lesson = getLesson(lessonId);
  const guiding = getCategorizedGuidingPrompts(lessonId, 0);
  const vocab = getLessonVocabulary(lessonId);

  const warmupPrompt = guiding.find((g) => g.category === 'warmup') || guiding[0];
  const predictPrompt = guiding.find((g) => g.category === 'prediction') || guiding[1] || guiding[0];
  const applyPrompt = guiding.find((g) => g.category === 'application') || guiding[guiding.length - 1] || guiding[0];

  const topKeywordsEn = vocab.slice(0, 4).map((v) => v.termEn);
  const topKeywordsVi = vocab.slice(0, 4).map((v) => v.termVi);

  const firstQuiz = lesson.quizQuestions[0];
  const secondQuiz = lesson.quizQuestions[1] || lesson.quizQuestions[0];
  const lastSecIdx = Math.max(0, lesson.sections.length - 1);

  return {
    lessonId,
    isAuthoredSample: false,
    titleEn: `Lesson ${lesson.lessonNumber}: ${lesson.titleEn}`,
    titleVi: `Bài ${lesson.lessonNumber}: ${lesson.titleVi}`,
    stages: {
      warmup: {
        labelEn: '1. Warm-up',
        labelVi: '1. Khởi động',
        goalEn: `Introduce core concepts of ${lesson.titleEn} in simple English.`,
        goalVi: `Khởi động khái niệm trọng tâm của ${lesson.titleVi} bằng tiếng Anh ngắn gọn.`,
        defaultSectionIndex: 0
      },
      hands_on: {
        labelEn: '2. Hands-on & Simulation',
        labelVi: '2. Thao tác & Mô phỏng',
        goalEn: 'Guide students to predict, interact with the visual model, and explain.',
        goalVi: 'Hướng dẫn học sinh dự đoán, thao tác trên mô hình và giải thích.',
        defaultSectionIndex: Math.min(1, lastSecIdx)
      },
      discussion: {
        labelEn: '3. Pair & Live Discussion',
        labelVi: '3. Thảo luận & Bình chọn',
        goalEn: 'Check understanding via pair speaking and quick live polling.',
        goalVi: 'Kiểm tra hiểu bài qua nói theo cặp và bình chọn nhanh.',
        defaultSectionIndex: Math.min(2, lastSecIdx)
      },
      wrap_up: {
        labelEn: '4. Wrap-up & Exit Ticket',
        labelVi: '4. Tổng kết & Phiếu cuối tiết',
        goalEn: 'Collect a one-sentence English summary before closing the lesson.',
        goalVi: 'Thu nhận 1 câu tóm tắt tiếng Anh trước khi kết thúc tiết học.',
        defaultSectionIndex: lastSecIdx
      }
    },
    prompts: [
      {
        id: `l${lessonId}-auto-warmup`,
        stage: 'warmup',
        sectionIndex: warmupPrompt?.sectionIndex ?? 0,
        questionEn: warmupPrompt?.questionEn || `What do you already know about ${lesson.titleEn}?`,
        questionVi: warmupPrompt?.questionVi || `Em đã biết gì về chủ đề ${lesson.titleVi}?`,
        teacherHintEn: warmupPrompt?.hintEn || 'Let students brainstorm 2–3 keywords before showing definitions.',
        teacherHintVi: warmupPrompt?.hintVi || 'Cho học sinh nêu 2–3 từ khóa trước khi mở khái niệm.',
        explanationEn: warmupPrompt?.answerEn || lesson.sections[0]?.speechEn || lesson.titleEn,
        explanationVi: warmupPrompt?.answerVi || lesson.sections[0]?.speechVi || lesson.titleVi,
        scaffold: {
          keywordsEn: topKeywordsEn.length ? topKeywordsEn : [lesson.titleEn],
          keywordsVi: topKeywordsVi.length ? topKeywordsVi : [lesson.titleVi],
          starterEn: 'I think this concept means … because …',
          starterVi: 'Em nghĩ khái niệm này có nghĩa là … vì …',
          fullSampleEn: warmupPrompt?.answerEn || `Today we learn how ${lesson.titleEn} works in Informatics.`,
          fullSampleVi: warmupPrompt?.answerVi || `Hôm nay chúng ta tìm hiểu cách hoạt động của ${lesson.titleVi}.`
        }
      },
      {
        id: `l${lessonId}-auto-predict`,
        stage: 'hands_on',
        sectionIndex: predictPrompt?.sectionIndex ?? Math.min(1, lastSecIdx),
        questionEn: predictPrompt?.questionEn || 'What do you predict will happen before we run this step?',
        questionVi: predictPrompt?.questionVi || 'Em dự đoán điều gì sẽ xảy ra trước khi chạy bước này?',
        teacherHintEn: predictPrompt?.hintEn || 'Pause the interactive activity first, ask for a prediction, then run.',
        teacherHintVi: predictPrompt?.hintVi || 'Dừng mô phỏng trước khi chạy để học sinh dự đoán.',
        explanationEn: predictPrompt?.answerEn || 'Observe the state update and verify against your prediction.',
        explanationVi: predictPrompt?.answerVi || 'Quan sát trạng thái cập nhật và đối chiếu với dự đoán ban đầu.',
        scaffold: {
          keywordsEn: topKeywordsEn.length ? topKeywordsEn : ['predict', 'result', 'step'],
          keywordsVi: topKeywordsVi.length ? topKeywordsVi : ['dự đoán', 'kết quả', 'bước'],
          starterEn: 'I predict that the output will be … because …',
          starterVi: 'Em dự đoán kết quả sẽ là … vì …',
          fullSampleEn: predictPrompt?.answerEn || 'I predict the output will update according to the rule shown on screen.',
          fullSampleVi: predictPrompt?.answerVi || 'Em dự đoán kết quả sẽ cập nhật theo quy tắc hiển thị trên màn hình.'
        }
      },
      {
        id: `l${lessonId}-auto-apply`,
        stage: 'discussion',
        sectionIndex: applyPrompt?.sectionIndex ?? lastSecIdx,
        questionEn: applyPrompt?.questionEn || 'Which detail or step in the lesson supports your answer?',
        questionVi: applyPrompt?.questionVi || 'Chi tiết hoặc bước nào trong bài chứng minh cho câu trả lời của em?',
        teacherHintEn: applyPrompt?.hintEn || 'Ask students to point directly to evidence in the textbook section.',
        teacherHintVi: applyPrompt?.hintVi || 'Yêu cầu học sinh chỉ rõ dẫn chứng trong mục kiến thức.',
        explanationEn: applyPrompt?.answerEn || 'Connecting evidence from the simulation reinforces accurate reasoning.',
        explanationVi: applyPrompt?.answerVi || 'Đối chiếu dẫn chứng từ mô phỏng giúp củng cố lập luận chính xác.',
        scaffold: {
          keywordsEn: topKeywordsEn.length ? topKeywordsEn : ['evidence', 'reason', 'apply'],
          keywordsVi: topKeywordsVi.length ? topKeywordsVi : ['dẫn chứng', 'lý do', 'vận dụng'],
          starterEn: 'My answer is supported by … because …',
          starterVi: 'Câu trả lời của em dựa trên … vì …',
          fullSampleEn: applyPrompt?.answerEn || 'My answer is supported by the main rule demonstrated in this section.',
          fullSampleVi: applyPrompt?.answerVi || 'Câu trả lời của em dựa trên quy tắc đã minh họa trong mục này.'
        }
      }
    ],
    pairDialogue: {
      id: `l${lessonId}-pair`,
      sectionIndex: Math.min(2, lastSecIdx),
      titleEn: `Pair Speaking Activity — Lesson ${lesson.lessonNumber}`,
      titleVi: `Hoạt động nói theo cặp — Bài ${lesson.lessonNumber}`,
      roleA: {
        labelEn: 'Role A — Explainer',
        labelVi: 'Vai A — Người giải thích',
        taskEn: `Summarize one key idea from "${lesson.titleEn}" using at least one keyword.`,
        taskVi: `Nêu ngắn gọn một ý chính của "${lesson.titleVi}" và dùng ít nhất 1 từ khóa.`,
        promptLinesEn: [
          `In this lesson, "${topKeywordsEn[0] || lesson.titleEn}" helps us ...`,
          'Here is an example from the screen.'
        ],
        promptLinesVi: [
          `Trong bài này, "${topKeywordsVi[0] || lesson.titleVi}" giúp chúng ta ...`,
          'Đây là một ví dụ trên màn hình.'
        ]
      },
      roleB: {
        labelEn: 'Role B — Questioner',
        labelVi: 'Vai B — Người đặt câu hỏi',
        taskEn: 'Ask one follow-up question ("Why?" or "Can you give an example?") and respond.',
        taskVi: 'Đặt một câu hỏi tiếp ("Why?" hoặc "Can you give an example?") rồi đổi vai.',
        promptLinesEn: [
          'What example supports your idea?',
          'Can you show me which step comes next?'
        ],
        promptLinesVi: [
          'Ví dụ nào chứng minh cho ý của bạn?',
          'Bạn chỉ cho mình bước tiếp theo được không?'
        ]
      },
      teacherHintEn: 'Switch roles after 1 minute so every student both explains and asks questions.',
      teacherHintVi: 'Đổi vai sau 1 phút để cả hai học sinh đều luyện giải thích và đặt câu hỏi.'
    },
    pollQuestions: [firstQuiz, secondQuiz]
      .filter(Boolean)
      .map((q, idx) => ({
        id: `l${lessonId}-poll-${q.id}-${idx}`,
        sectionIndex: idx === 0 ? Math.min(1, lastSecIdx) : lastSecIdx,
        questionEn: q.questionEn,
        questionVi: q.questionVi,
        options: (q.optionsEn || q.optionsVi).map((optEn, oIdx) => ({
          id: String.fromCharCode(97 + oIdx),
          labelEn: `${String.fromCharCode(65 + oIdx)}. ${optEn}`,
          labelVi: `${String.fromCharCode(65 + oIdx)}. ${q.optionsVi[oIdx] || optEn}`
        })),
        correctOptionId: String.fromCharCode(97 + (q.correctIndex ?? 0)),
        explanationEn: q.explanationEn || q.explanationVi,
        explanationVi: q.explanationVi
      })),
    exitTicketFrames: [
      {
        id: `l${lessonId}-et-1`,
        sectionIndex: lastSecIdx,
        frameEn: 'One key idea I learned today was … It matters because …',
        frameVi: 'Một ý chính em học được hôm nay là … Điều này quan trọng vì …',
        sampleEn: `One key idea I learned today was ${topKeywordsEn[0] || lesson.titleEn}. It matters because it helps solve computing tasks accurately.`,
        sampleVi: `Một ý chính em học hôm nay là ${topKeywordsVi[0] || lesson.titleVi}.`,
        teacherHintVi: 'Cho học sinh hoàn thành nhanh bằng 1 câu tiếng Anh.',
        teacherHintEn: 'Have students complete this frame in one short sentence.'
      },
      {
        id: `l${lessonId}-et-2`,
        sectionIndex: lastSecIdx,
        frameEn: 'Before today I thought …, now I know …',
        frameVi: 'Trước bài học em nghĩ …, giờ em đã biết …',
        sampleEn: `Before today I thought computers fixed errors automatically, now I know we use ${topKeywordsEn[0] || 'testing'}.`,
        sampleVi: 'Trước bài học em nghĩ máy tự sửa lỗi, giờ em đã biết cách kiểm tra và xử lý.',
        teacherHintVi: 'Khuyến khích học sinh so sánh nhận thức trước và sau bài học.',
        teacherHintEn: 'Encourages metacognitive comparison before vs after.'
      }
    ]
  };
}
