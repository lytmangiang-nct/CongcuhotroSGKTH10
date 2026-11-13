/**
 * Quick English -> Vietnamese Hover Translation Service
 * Pre-indexes all 34 lessons (titles, objectives, warmup, content, questions, choices, glossary)
 * with 0ms local lookup, smart prefix handling, and abortable online fallback.
 */

import { LESSONS_REGISTRY } from '../data/lessonsRegistry';
import { SGK_TOPICS } from '../data/curriculumData';
import { SGK_OFFICIAL_GLOSSARY } from '../data/sgkGlossaryData';
import { GLOSSARY as LESSON1_GLOSSARY, LEARNING_OBJECTIVES as LESSON1_OBJECTIVES } from '../data/lessonData';
import { TEACHER_PROMPTS_BY_LESSON } from '../data/teacherPromptsData';

import { getLessonVocabulary } from '../data/lessonVocabSupport';
import { getCategorizedGuidingPrompts } from '../data/guidingQuestionsHelper';
import { CLASSROOM_PHRASES, QUICK_FOLLOWUPS, getTeachLessonScript } from '../data/teachEnglishData';

const CACHE_STORAGE_KEY = 'sgk_quick_trans_cache_v2';
const MAX_CACHE_ENTRIES = 6000;

// In-memory cache with strict directional keys (en:vi:... / vi:en:...)
const memoryCache = new Map<string, string>();
// Track dynamically fetched runtime translations separately so they persist cleanly
const runtimeCache = new Map<string, string>();

export function normalizeKey(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .replace(/[.,:;!?•·\-–—_/\\()\[\]{}'"`]+/g, ' ')
    .replace(/[‘’“”]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isUsableTranslation(source: string, candidate: string | null | undefined): boolean {
  if (!candidate) return false;
  const cleanCandidate = candidate.trim();
  const cleanSource = source.trim();
  if (!cleanCandidate) return false;
  if (cleanCandidate.toLowerCase() === cleanSource.toLowerCase()) return false;
  if (/MYMEMORY WARNING|QUERY LENGTH LIMIT|PLEASE SELECT TWO DISTINCT|YOU USED ALL AVAILABLE FREE/i.test(cleanCandidate)) {
    return false;
  }
  return true;
}

function setDirectionalCache(
  sourceText: string,
  targetText: string,
  sourceLang: 'en' | 'vi',
  targetLang: 'en' | 'vi'
): void {
  const key = normalizeKey(sourceText);
  if (!key || !isUsableTranslation(sourceText, targetText)) return;
  const langKey = `${sourceLang}:${targetLang}:${key}`;
  memoryCache.set(langKey, targetText.trim());
}

// Pre-seeded Grade 10 Informatics comprehensive dictionary
const INFORMATICS_DICTIONARY: Record<string, string> = {
  // Learning Objectives & Pedagogy Headings (EN <-> VI)
  'learning objectives': 'Mục tiêu bài học (Sau bài này em sẽ)',
  'sau bài này em sẽ': 'Learning Objectives',
  'sau bài này em se': 'Learning Objectives',
  'sau bài học này em sẽ': 'Learning Objectives',
  'sau bài học này em se': 'Learning Objectives',
  'mục tiêu bài học': 'Learning Objectives',
  'muc tieu bai hoc': 'Learning Objectives',
  'key learning objectives': 'Mục tiêu trọng tâm bài học',
  'core learning objectives': 'Mục tiêu trọng tâm bài học',
  'lesson objectives': 'Mục tiêu bài học',
  'core objectives': 'Mục tiêu cốt lõi của bài học',
  'standard outcomes according to the 2018 general education informatics curriculum': 'Chuẩn đầu ra theo Chương trình GDPT 2018 môn Tin học',
  'chuẩn đầu ra theo chương trình gdpt 2018 môn tin học': 'Standard outcomes according to the 2018 General Education Informatics Curriculum',
  'knowledge and skill standard objectives': 'Mục tiêu chuẩn kiến thức kĩ năng bài học',
  'knowledge skill standard objectives': 'Mục tiêu chuẩn kiến thức kĩ năng bài học',
  'mục tiêu chuẩn kiến thức kĩ năng bài học': 'Knowledge & skill standard objectives',
  '3 standard objectives from grade 10 informatics': '3 Mục tiêu chuẩn kiến thức SGK Tin học 10',
  '3 mục tiêu chuẩn kiến thức sgk tin học 10': '3 Standard Objectives from Grade 10 Informatics',
  'completed': 'Hoàn thành',
  'hoàn thành': 'Completed',
  'studying': 'Đang xem',
  'đang xem': 'Studying',
  'active': 'Đang học',
  'đang học': 'Active',
  'objective 1': 'Mục tiêu 1',
  'objective 2': 'Mục tiêu 2',
  'objective 3': 'Mục tiêu 3',
  'objective 4': 'Mục tiêu 4',
  'mục tiêu 1': 'Objective 1',
  'mục tiêu 2': 'Objective 2',
  'mục tiêu 3': 'Objective 3',
  'mục tiêu 4': 'Objective 4',

  // Warm-up, Activities & Questions
  'warm up': 'Khởi động',
  'khởi động': 'Warm-up',
  'warm up activity': 'Hoạt động khởi động',
  'hoạt động khởi động': 'Warm-up Activity',
  'textbook discussion question': 'Câu hỏi thảo luận SGK',
  'câu hỏi thảo luận sgk': 'Textbook Discussion Question',
  'activity 1': 'Hoạt động 1',
  'activity 2': 'Hoạt động 2',
  'hoạt động 1': 'Activity 1',
  'hoạt động 2': 'Activity 2',
  'read and reflect': 'Đọc & Suy ngẫm',
  'đọc và suy ngẫm': 'Read & Reflect',
  'hint': 'Gợi ý giải bài',
  'gợi ý': 'Hint',
  'model answer': 'Đáp án mẫu chuẩn SGK',
  'hướng dẫn giải': 'Model Answer Guidelines',
  'detailed model answer according to textbook guidelines': 'Hướng dẫn trả lời chuẩn SGK & Phân tích chuyên sâu',
  'hướng dẫn trả lời chuẩn sgk và phân tích chuyên sâu': 'Detailed Model Answer according to Textbook Guidelines',

  // Summaries & Practice
  'review questions': 'Câu hỏi ôn tập & củng cố',
  'câu hỏi ôn tập và củng cố': 'Review Questions',
  'practice exercises': 'Bài tập luyện tập',
  'bài tập luyện tập': 'Practice Exercises',
  'real world application': 'Vận dụng thực tiễn',
  'vận dụng thực tiễn': 'Real-world Application',
  'core knowledge': 'Kiến thức cốt lõi',
  'kiến thức cốt lõi': 'Core Knowledge',
  'key takeaways': 'Em hãy ghi nhớ (Kiến thức trọng tâm)',
  'em hãy ghi nhớ': 'Key Takeaways',
  'summary': 'Tóm tắt bài học & Ghi nhớ',
  'tóm tắt bài học': 'Lesson Summary',
  'to execute the hands on lab in conditional statement if what sequential steps must be performed in the software environment': 'Để thực hiện bài thực hành ‘Câu lệnh điều kiện if’, cần thực hiện lần lượt những bước nào trong môi trường phần mềm?',
  'to execute the hands-on lab in conditional statement if what sequential steps must be performed in the software environment': 'Để thực hiện bài thực hành ‘Câu lệnh điều kiện if’, cần thực hiện lần lượt những bước nào trong môi trường phần mềm?',
  'check my choices': 'Kiểm tra đáp án của em',
  'kiểm tra đáp án': 'Check Answer',
  'check answer': 'Kiểm tra đáp án',
  'show textbook model answer': 'Xem gợi ý & Đáp án chuẩn SGK',
  'hide textbook model answer': 'Ẩn gợi ý & Đáp án SGK',
  'xem gợi ý và đáp án chuẩn sgk': 'Show Textbook Model Answer',
  'ẩn gợi ý và đáp án sgk': 'Hide Textbook Model Answer',
  'quick mastery assessment': 'Kiểm tra Củng cố Kiến thức',
  'kiểm tra củng cố kiến thức': 'Quick Mastery Assessment',
  'view page scan': 'Xem bản quét SGK gốc',
  'xem bản quét sgk gốc': 'View Page Scan',
  'textbook pages': 'Các trang Sách giáo khoa',
  'next lesson': 'Bài học tiếp theo',
  'previous lesson': 'Bài học trước',
  'table of contents': 'Mục lục SGK',
  'mục lục': 'Table of Contents',
  'cover page': 'Trang bìa chính',
  'trang bìa': 'Cover Page',
  'credits and authors': 'Xuất bản & Tác giả',
  'xuất bản và tác giả': 'Credits & Authors',
  'correct': 'Chính xác! Xuất sắc.',
  'incorrect': 'Chưa chính xác, hãy thử lại.',
  'explanation': 'Giải thích chi tiết:',

  // General & Hardware
  'informatics': 'Tin học',
  'computer science': 'Khoa học máy tính',
  'information technology': 'Công nghệ thông tin',
  'information': 'Thông tin',
  'data': 'Dữ liệu',
  'knowledge': 'Tri thức',
  'bit': 'Bit (đơn vị thông tin cơ bản)',
  'bits': 'Các bit',
  'byte': 'Byte (đơn vị lưu trữ 8 bit)',
  'bytes': 'Các byte',
  'data storage units': 'Đơn vị lưu trữ dữ liệu',
  '2 data storage units': '2. Đơn vị lưu trữ dữ liệu',
  'numeric operations': 'Phép xử lí: Cộng (+), trừ (−), nhân (*), chia (/), so sánh (<, >).',
  'numeric examples': 'Ví dụ: Điểm trung bình môn học, nhiệt độ, số học sinh trong lớp.',
  'text operations': 'Phép xử lí: Ghép nối chuỗi, tìm kiếm chuỗi con, trích xuất, thay thế.',
  'text examples': 'Ví dụ: Họ và tên học sinh, địa chỉ nhà, tên bài học SGK.',
  'image operations': 'Phép xử lí: Thu phóng tỉ lệ, cắt ảnh, chỉnh độ tương phản/độ sáng, xoay ảnh.',
  'image examples': 'Ví dụ: Ảnh chân dung trên thẻ CCCD, ảnh chụp trang sách giáo khoa.',
  'audio operations': 'Phép xử lí: Thu âm, lọc tạp âm, thay đổi âm lượng, nhận dạng giọng nói.',
  'audio examples': 'Ví dụ: File ghi âm bài thuyết trình, podcast bài giảng, hiệu ứng âm thanh.',
  'kilobyte': 'Kilobyte (KB = 1024 bytes)',
  'megabyte': 'Megabyte (MB = 1024 KB)',
  'gigabyte': 'Gigabyte (GB = 1024 MB)',
  'terabyte': 'Terabyte (TB = 1024 GB)',
  'petabyte': 'Petabyte (PB = 1024 TB)',
  'binary': 'Nhị phân',
  'binary numeral system': 'Hệ nhị phân (hệ đếm cơ số 2)',
  'binary system': 'Hệ nhị phân',
  'base-2': 'Cơ số 2 (hệ nhị phân)',
  'hexadecimal': 'Hệ thập lục phân (cơ số 16)',
  'decimal': 'Hệ thập phân (cơ số 10)',
  'hardware': 'Phần cứng',
  'software': 'Phần mềm',
  'operating system': 'Hệ điều hành',
  'central processing unit': 'Bộ vi xử lí trung tâm (CPU)',
  'cpu': 'Bộ xử lí trung tâm (CPU)',
  'ram': 'Bộ nhớ truy cập ngẫu nhiên (RAM)',
  'rom': 'Bộ nhớ chỉ đọc (ROM)',
  'motherboard': 'Bo mạch chủ',
  'storage device': 'Thiết bị lưu trữ',
  'storage units': 'Các đơn vị lưu trữ dữ liệu',
  'storage capacity': 'Dung lượng lưu trữ',
  'hard drive': 'Ổ đĩa cứng',
  'ssd': 'Ổ cứng thể rắn (SSD)',
  'input device': 'Thiết bị vào (bàn phím, chuột, micro...)',
  'output device': 'Thiết bị ra (màn hình, loa, máy in...)',
  'digital device': 'Thiết bị số',
  'digital devices': 'Các thiết bị số',
  'smart device': 'Thiết bị thông minh',
  'smart devices': 'Các thiết bị thông minh',
  'telecommunication': 'Viễn thông / Truyền thông',
  'telecommunications': 'Ngành truyền thông & viễn thông',
  'data integrity': 'Tính toàn vẹn của dữ liệu',
  'information integrity': 'Tính toàn vẹn của thông tin',
  'data processing': 'Xử lí dữ liệu',
  'information processing': 'Xử lí thông tin',

  // Logic & Math
  'logic gate': 'Cổng lôgic',
  'logic gates': 'Các cổng lôgic',
  'logic circuit': 'Mạch lôgic',
  'digital circuit': 'Mạch số',
  'half adder': 'Mạch cộng bán phần (1 bit)',
  'half-adder': 'Mạch cộng bán phần',
  'full adder': 'Mạch cộng toàn phần',
  'truth table': 'Bảng chân lí (bảng chân trị)',
  'truth tables': 'Các bảng chân lí',
  'and operator': 'Phép toán AND (phép hội)',
  'or operator': 'Phép toán OR (phép tuyển)',
  'not operator': 'Phép toán NOT (phép phủ định)',
  'xor operator': 'Phép toán XOR (phép tuyển loại)',
  'bitwise operator': 'Phép toán lôgic theo từng bit (bitwise)',
  'fixed-point': 'Dấu phẩy tĩnh',
  'floating-point': 'Dấu phẩy động',
  'signed integer': 'Số nguyên có dấu',
  'unsigned integer': 'Số nguyên không dấu',
  'sign-magnitude': 'Mã thuận (dấu - độ lớn)',
  "one's complement": 'Mã bù 1 (mã đảo)',
  "two's complement": 'Mã bù 2',
  'binary addition': 'Phép cộng nhị phân',
  'binary multiplication': 'Phép nhân nhị phân',

  // Audio & Image
  'sampling period': 'Chu kì lấy mẫu',
  'sampling rate': 'Tần số lấy mẫu',
  'bit rate': 'Tốc độ bit (bit-rate)',
  'bit-rate': 'Tốc độ bit',
  'bit depth': 'Độ sâu màu / Độ sâu bit',
  'pixel': 'Điểm ảnh (Pixel)',
  'pixels': 'Các điểm ảnh',
  'rgb': 'Hệ màu RGB (Đỏ - Lục - Lam)',
  'bitmap': 'Ảnh điểm ảnh (Bitmap)',
  'raster graphics': 'Đồ hoạ điểm ảnh (Raster)',
  'vector graphics': 'Đồ hoạ vectơ',
  'pulse code modulation': 'Điều chế mã xung (PCM)',
  'pcm': 'Điều chế mã xung (PCM)',
  'wav': 'Định dạng âm thanh WAV (không nén)',
  'mp3': 'Định dạng âm thanh MP3 (nén)',
  'bmp': 'Định dạng ảnh BMP (bitmap)',
  'jpeg': 'Định dạng ảnh JPEG (nén mất dữ liệu)',
  'png': 'Định dạng ảnh PNG (nén không mất dữ liệu, hỗ trợ trong suốt)',

  // Python Programming
  'algorithm': 'Thuật toán',
  'flowchart': 'Sơ đồ khối',
  'variable': 'Biến trong lập trình',
  'constant': 'Hằng số',
  'expression': 'Biểu thức',
  'function': 'Hàm (chương trình con)',
  'loop': 'Vòng lặp',
  'for loop': 'Vòng lặp for (lặp với số lần biết trước)',
  'while loop': 'Vòng lặp while (lặp với điều kiện)',
  'condition': 'Điều kiện',
  'conditional statement': 'Câu lệnh điều kiện (if-else)',
  'data type': 'Kiểu dữ liệu',
  'data types': 'Các kiểu dữ liệu',
  'integer': 'Số nguyên (int)',
  'float': 'Số thực dấu phẩy động (float)',
  'string': 'Xâu kí tự (str)',
  'boolean': 'Kiểu lôgic (bool: True/False)',
  'list': 'Danh sách trong Python (list)',
  'array': 'Mảng dữ liệu',
  'index': 'Chỉ số phần tử',
  'slice': 'Cắt lát danh sách / xâu (slicing)',
  'interpreter': 'Trình thông dịch (Python interpreter)',
  'compiler': 'Trình biên dịch',
  'syntax error': 'Lỗi cú pháp',
  'runtime error': 'Lỗi khi đang chạy chương trình',
  'logic error': 'Lỗi ngữ nghĩa / lỗi lôgic',
  'debugging': 'Gỡ lỗi chương trình',
  'indentation': 'Thụt lề khối lệnh',
  'scope': 'Phạm vi của biến (toàn cục / cục bộ)',
  'parameter': 'Tham số của hàm',
  'argument': 'Đối số truyền vào hàm',
  'return statement': 'Lệnh trả về giá trị (return)',

  // Networking, Cloud & Security
  'lan': 'Mạng cục bộ (LAN)',
  'wan': 'Mạng diện rộng (WAN)',
  'internet': 'Mạng Internet toàn cầu',
  'cloud computing': 'Điện toán đám mây',
  'cloud storage': 'Lưu trữ đám mây',
  'cloud service': 'Dịch vụ đám mây',
  'cybersecurity': 'An toàn thông tin / An ninh mạng',
  'malware': 'Phần mềm độc hại (Mã độc)',
  'virus': 'Vi-rút máy tính',
  'trojan': 'Mã độc Trojan',
  'worm': 'Sâu máy tính (Worm)',
  'ransomware': 'Mã độc tống tiền',
  'spyware': 'Phần mềm gián điệp',
  'phishing': 'Tấn công lừa đảo trực tuyến',
  'copyright': 'Bản quyền tác giả',
  'intellectual property': 'Sở hữu trí tuệ',
  'digital citizenship': 'Trách nhiệm và văn hóa công dân số',
  'internet of things': 'Internet vạn vật (IoT)',
  'iot': 'Internet vạn vật (IoT)',
  'artificial intelligence': 'Trí tuệ nhân tạo (AI)',
  'ai': 'Trí tuệ nhân tạo (AI)',

  // Lesson 6 Audio & Visual Data terms
  'bit rate & audio storage formats (.wav, .mp3)': 'Tốc độ bit & Định dạng lưu trữ âm thanh (.wav, .mp3)',
  'bit rate and audio storage formats': 'Tốc độ bit và Định dạng tệp âm thanh',
  'hardware conversion pipeline: adc & dac circuits': 'Sơ đồ chuyển đổi phần cứng: Mạch ADC và DAC',
  'hardware conversion pipeline adc & dac circuits': 'Sơ đồ chuyển đổi phần cứng: Mạch ADC và DAC',
  'adc circuit': 'Mạch ADC',
  'dac circuit': 'Mạch DAC',
  'computer & storage': 'Máy tính & Ổ đĩa',
  'digital audio file': 'Tệp nhạc số',
  'raw rgb pixel bytes': 'Dòng byte dữ liệu điểm ảnh (Raw RGB Bytes)',
  'bitmap graphics & file formats (.bmp, .jpeg, .png)': 'Ảnh Bitmap & Các định dạng tệp (.bmp, .jpeg, .png)',
  'comparative matrix of standard image file formats': 'Bảng đối sánh các định dạng tệp hình ảnh thông dụng',
  'practice, application & lesson 6 evaluation': 'Luyện tập, Vận dụng & Đánh giá năng lực Bài 6',
  'led billboard matrix (1-bit depth analysis)': 'Bảng quảng cáo đèn LED ma trận (Bit Depth 1-bit)',
  'calculate playback duration of a 650 mb cd (1411 kb/s)': 'Tính thời gian phát âm thanh của đĩa CD 650 MB (1411 Kb/s)',

  // Lesson 7 PDA & Smartphone terms
  '1. personal digital assistants: modern evolution & two dominant mobile os (ios / android)': '1. Trợ thủ số cá nhân: Sự phát triển & Hai hệ điều hành di động (iOS / Android)',
  'personal digital assistant (pda)': 'Trợ thủ số cá nhân (PDA)',
  'personal digital assistant': 'Trợ thủ số cá nhân (PDA)',
  'apple ios operating system': 'Hệ điều hành iOS (Apple)',
  'google android operating system': 'Hệ điều hành Android (Google)',
  'wi fi connectivity': 'Kết nối Wi-Fi',
  'bluetooth connectivity': 'Kết nối Bluetooth',
  'usb port (type-c / lightning)': 'Cổng cắm USB (Type-C / Lightning)',
  'task 1: identifying physical buttons & device booting': 'Nhiệm vụ 1: Nhận biết nút bấm phần cứng & Khởi động điện thoại',
  'task 1 identifying physical buttons & device booting': 'Nhiệm vụ 1: Nhận biết nút bấm phần cứng & Khởi động điện thoại',
  'home screen layout, navigation controls & application ecosystem': 'Màn hình làm việc, Thanh điều hướng (Navigation Bar) & Kho ứng dụng',
  'file manager, dcim/camera hierarchy & cloud storage operations': 'Ứng dụng quản lý tệp, Thư mục DCIM/Camera & Lưu trữ đám mây',
  'practice, real-world application & competency evaluation': 'Luyện tập, Vận dụng thực tế & Đánh giá năng lực Bài 7',

  // Relational & Boolean operators (Lesson 19 & Curriculum Standard)
  'relational operators': 'toán tử quan hệ',
  'relational operator': 'toán tử quan hệ',
  'toán tử quan hệ': 'relational operators',
  'boolean expression': 'biểu thức Boolean',
  'boolean expressions': 'biểu thức Boolean',
  'biểu thức boolean': 'Boolean expression',
  'biểu thức lôgic': 'Boolean expression',
  'logical operators': 'các phép toán lôgic',
  'logical operator': 'phép toán lôgic',
  'các phép toán lôgic': 'logical operators',
  'numeric relational operators in python': 'Các phép so sánh các giá trị số trong Python',
  'string comparison case-sensitive unicode matching': 'So sánh xâu kí tự (Phân biệt chữ hoa / chữ thường)',
  'truth tables: and, or, not operators': 'Bảng các phép toán lôgic: and, or, not',
  'truth tables and or not operators': 'Bảng các phép toán lôgic: and, or, not',
  'activity 1: understanding boolean expressions': 'Hoạt động 1: Khái niệm biểu thức lôgic',
  'activity 1 understanding boolean expressions': 'Hoạt động 1: Khái niệm biểu thức lôgic',
  'checkpoint questions': 'Câu hỏi củng cố',
  'key summary 1': 'Ghi nhớ 1',
  'key summary 2': 'Ghi nhớ 2',

  // Software Engineering & Careers
  'software development': 'Phát triển phần mềm',
  'software engineer': 'Kĩ sư phần mềm / Kiến trúc sư phần mềm',
  'programmer': 'Lập trình viên',
  'developer': 'Nhà phát triển phần mềm',
  'project manager': 'Người quản trị dự án phần mềm',
  'software development life cycle': 'Vòng đời phát triển phần mềm (SDLC)',
  'sdlc': 'Vòng đời phát triển phần mềm (SDLC)',
  'requirements analysis': 'Khảo sát và phân tích yêu cầu',
  'software design': 'Thiết kế hệ thống phần mềm',
  'coding': 'Lập trình / Viết mã nguồn',
  'testing': 'Kiểm thử phần mềm',
  'deployment': 'Chuyển giao & Triển khai',
  'maintenance': 'Bảo trì và nâng cấp phần mềm'
};

// Initialize runtime cache from localStorage (ignoring legacy polluted or warning values)
try {
  const stored = localStorage.getItem(CACHE_STORAGE_KEY);
  if (stored) {
    const parsed = JSON.parse(stored);
    if (parsed && typeof parsed === 'object') {
      Object.entries(parsed).forEach(([k, v]) => {
        if (
          typeof k === 'string' &&
          typeof v === 'string' &&
          (k.startsWith('en:vi:') || k.startsWith('vi:en:')) &&
          !/MYMEMORY WARNING|QUERY LENGTH LIMIT/i.test(v)
        ) {
          runtimeCache.set(k, v);
          memoryCache.set(k, v);
        }
      });
    }
  }
} catch {
  // Ignore localStorage parsing errors in private/iframe environments
}

// Auto-index all 34 lessons, curriculum topics, vocabulary, guiding prompts, teach scripts, and official glossary
function indexAllCurriculumSources(): boolean {
  try {
    // 0. Seed INFORMATICS_DICTIONARY safely with explicit directional keys
    Object.entries(INFORMATICS_DICTIONARY).forEach(([k, val]) => {
      const hasViDiacritics = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(k);
      if (hasViDiacritics) {
        memoryCache.set(`vi:en:${k}`, val);
      } else {
        memoryCache.set(`en:vi:${k}`, val);
      }
    });

    // 1. Index official textbook glossary (Trang 166-167 SGK)
    SGK_OFFICIAL_GLOSSARY.forEach((g) => {
      if (g.termEn && g.termVi) {
        const fullVi = `${g.termVi}: ${g.definitionVi}`;
        setDirectionalCache(g.termEn, fullVi, 'en', 'vi');
        setDirectionalCache(g.termVi, g.termEn, 'vi', 'en');

        const cleanTerm = g.termEn.replace(/\s*\([^)]*\)/g, '').trim();
        if (cleanTerm) {
          setDirectionalCache(cleanTerm, fullVi, 'en', 'vi');
        }
      }
      if (g.definitionEn && g.definitionVi) {
        setDirectionalCache(g.definitionEn, g.definitionVi, 'en', 'vi');
        setDirectionalCache(g.definitionVi, g.definitionEn, 'vi', 'en');
      }
    });

    // 2. Index Lesson 1 Glossary & Learning Objectives (strictly separated EN->VI vs VI->EN)
    LESSON1_GLOSSARY.forEach((g) => {
      if (g.termEn && g.termVi) {
        setDirectionalCache(g.termEn, `${g.termVi}: ${g.definitionVi}`, 'en', 'vi');
        setDirectionalCache(g.termVi, g.termEn, 'vi', 'en');
      }
    });

    LESSON1_OBJECTIVES.forEach((obj) => {
      if (obj.en && obj.vi) {
        setDirectionalCache(obj.en, obj.vi, 'en', 'vi');
        setDirectionalCache(obj.vi, obj.en, 'vi', 'en');
      }
    });

    // 3. Index Topics & Lessons from SGK_TOPICS
    SGK_TOPICS.forEach((t) => {
      if (t.titleEn && t.titleVi) {
        setDirectionalCache(t.titleEn, t.titleVi, 'en', 'vi');
        setDirectionalCache(t.titleVi, t.titleEn, 'vi', 'en');
        setDirectionalCache(`Topic ${t.topicNumber}: ${t.titleEn}`, `Chủ đề ${t.topicNumber}: ${t.titleVi}`, 'en', 'vi');
        setDirectionalCache(`Chủ đề ${t.topicNumber}: ${t.titleVi}`, `Topic ${t.topicNumber}: ${t.titleEn}`, 'vi', 'en');
      }
      t.lessons?.forEach((l) => {
        if (l.titleEn && l.titleVi) {
          setDirectionalCache(l.titleEn, l.titleVi, 'en', 'vi');
          setDirectionalCache(l.titleVi, l.titleEn, 'vi', 'en');
          setDirectionalCache(`Lesson ${l.lessonNumber}: ${l.titleEn}`, `Bài ${l.lessonNumber}: ${l.titleVi}`, 'en', 'vi');
          setDirectionalCache(`Lesson ${l.lessonNumber} - ${l.titleEn}`, `Bài ${l.lessonNumber} - ${l.titleVi}`, 'en', 'vi');
          setDirectionalCache(`Bài ${l.lessonNumber}: ${l.titleVi}`, `Lesson ${l.lessonNumber}: ${l.titleEn}`, 'vi', 'en');
          setDirectionalCache(`Bài ${l.lessonNumber} - ${l.titleVi}`, `Lesson ${l.lessonNumber} - ${l.titleEn}`, 'vi', 'en');
          setDirectionalCache(`Lesson ${l.lessonNumber}`, `Bài ${l.lessonNumber}`, 'en', 'vi');
          setDirectionalCache(`Bài ${l.lessonNumber}`, `Lesson ${l.lessonNumber}`, 'vi', 'en');
        }
        if (l.descriptionEn && l.descriptionVi) {
          setDirectionalCache(l.descriptionEn, l.descriptionVi, 'en', 'vi');
          setDirectionalCache(l.descriptionVi, l.descriptionEn, 'vi', 'en');
        }
      });
    });

    // 4. Index Lessons 1-34 from LESSONS_REGISTRY, Vocabulary, and Categorized Guiding Prompts
    Object.values(LESSONS_REGISTRY).forEach((lesson) => {
      if (lesson.titleEn && lesson.titleVi) {
        setDirectionalCache(lesson.titleEn, lesson.titleVi, 'en', 'vi');
        setDirectionalCache(`Lesson ${lesson.lessonNumber}: ${lesson.titleEn}`, `Bài ${lesson.lessonNumber}: ${lesson.titleVi}`, 'en', 'vi');
        setDirectionalCache(`Lesson ${lesson.lessonNumber} - ${lesson.titleEn}`, `Bài ${lesson.lessonNumber} - ${lesson.titleVi}`, 'en', 'vi');
        setDirectionalCache(`Lesson ${lesson.lessonNumber}`, `Bài ${lesson.lessonNumber}`, 'en', 'vi');

        setDirectionalCache(lesson.titleVi, lesson.titleEn, 'vi', 'en');
        setDirectionalCache(`Bài ${lesson.lessonNumber}: ${lesson.titleVi}`, `Lesson ${lesson.lessonNumber}: ${lesson.titleEn}`, 'vi', 'en');
        setDirectionalCache(`Bài ${lesson.lessonNumber} - ${lesson.titleVi}`, `Lesson ${lesson.lessonNumber} - ${lesson.titleEn}`, 'vi', 'en');
        setDirectionalCache(`Bài ${lesson.lessonNumber}`, `Lesson ${lesson.lessonNumber}`, 'vi', 'en');
      }
      if (lesson.topicTitleEn && lesson.topicTitleVi) {
        setDirectionalCache(lesson.topicTitleEn, lesson.topicTitleVi, 'en', 'vi');
        setDirectionalCache(lesson.topicTitleVi, lesson.topicTitleEn, 'vi', 'en');
      }
      if (lesson.certTitle) {
        setDirectionalCache(`Certificate of Completion - Lesson ${lesson.lessonNumber}`, lesson.certTitle, 'en', 'vi');
        setDirectionalCache(lesson.certTitle, `Certificate of Completion - Lesson ${lesson.lessonNumber}`, 'vi', 'en');
      }

      lesson.sections?.forEach((sec) => {
        if (sec.titleEn && sec.titleVi) {
          setDirectionalCache(sec.titleEn, sec.titleVi, 'en', 'vi');
        }
        if (sec.speechEn && sec.speechVi) {
          setDirectionalCache(sec.speechEn, sec.speechVi, 'en', 'vi');
        }
      });

      lesson.quizQuestions?.forEach((q) => {
        if (q.questionEn && q.questionVi) {
          setDirectionalCache(q.questionEn, q.questionVi, 'en', 'vi');
        }
        if (q.explanationEn && q.explanationVi) {
          setDirectionalCache(q.explanationEn, q.explanationVi, 'en', 'vi');
        }
        q.optionsEn?.forEach((optEn, idx) => {
          const optVi = q.optionsVi?.[idx];
          if (optEn && optVi) {
            setDirectionalCache(optEn, optVi, 'en', 'vi');
          }
        });
      });

      lesson.glossary?.forEach((g) => {
        if (g.termEn && g.termVi) {
          setDirectionalCache(g.termEn, `${g.termVi}: ${g.definitionVi}`, 'en', 'vi');
        }
        if (g.definitionEn && g.definitionVi) {
          setDirectionalCache(g.definitionEn, g.definitionVi, 'en', 'vi');
        }
      });

      // Vocabulary support cards per lesson
      getLessonVocabulary(lesson.lessonNumber).forEach((v) => {
        if (v.termEn && v.termVi) {
          setDirectionalCache(v.termEn, v.definitionVi ? `${v.termVi}: ${v.definitionVi}` : v.termVi, 'en', 'vi');
        }
        if (v.definitionEn && v.definitionVi) {
          setDirectionalCache(v.definitionEn, v.definitionVi, 'en', 'vi');
        }
        if (v.exampleEn && v.exampleVi) {
          setDirectionalCache(v.exampleEn, v.exampleVi, 'en', 'vi');
        }
      });

      // Categorized guiding prompts per lesson
      getCategorizedGuidingPrompts(lesson.lessonNumber, 0).forEach((gp) => {
        if (gp.questionEn && gp.questionVi) setDirectionalCache(gp.questionEn, gp.questionVi, 'en', 'vi');
        if (gp.hintEn && gp.hintVi) setDirectionalCache(gp.hintEn, gp.hintVi, 'en', 'vi');
        if (gp.answerEn && gp.answerVi) setDirectionalCache(gp.answerEn, gp.answerVi, 'en', 'vi');
      });
    });

    // 5. Index Teacher Discussion Prompts (EN -> VI)
    Object.values(TEACHER_PROMPTS_BY_LESSON).forEach((lessonPrompts) => {
      Object.values(lessonPrompts).forEach((sectionPrompts) => {
        sectionPrompts.prompts?.forEach((p) => {
          if (p.questionEn && p.questionVi) {
            setDirectionalCache(p.questionEn, p.questionVi, 'en', 'vi');
          }
          if (p.suggestedAnswerEn && p.suggestedAnswerVi) {
            setDirectionalCache(p.suggestedAnswerEn, p.suggestedAnswerVi, 'en', 'vi');
          }
        });
      });
    });

    // 6. Index Teach in English classroom phrases, follow-ups & Lesson 30 script
    CLASSROOM_PHRASES.forEach((p) => {
      setDirectionalCache(p.en, p.vi, 'en', 'vi');
      setDirectionalCache(p.tipEn, p.tipVi, 'en', 'vi');
    });
    QUICK_FOLLOWUPS.forEach((f) => {
      setDirectionalCache(f.en, f.vi, 'en', 'vi');
      setDirectionalCache(f.hintEn, f.hintVi, 'en', 'vi');
    });
    const script30 = getTeachLessonScript(30);
    script30.prompts.forEach((p) => {
      setDirectionalCache(p.questionEn, p.questionVi, 'en', 'vi');
      setDirectionalCache(p.explanationEn, p.explanationVi, 'en', 'vi');
      setDirectionalCache(p.scaffold.starterEn, p.scaffold.starterVi, 'en', 'vi');
      setDirectionalCache(p.scaffold.fullSampleEn, p.scaffold.fullSampleVi, 'en', 'vi');
    });
    script30.exitTicketFrames.forEach((f) => {
      setDirectionalCache(f.frameEn, f.frameVi, 'en', 'vi');
      setDirectionalCache(f.sampleEn, f.sampleVi, 'en', 'vi');
    });
  } catch {
    return false;
  }
  return true;
}

let isCurriculumIndexed = false;

export function initializeCurriculumTranslations(): void {
  const ok = indexAllCurriculumSources();
  if (ok) {
    isCurriculumIndexed = true;
  }
}

function ensureCurriculumTranslationsIndexed(): void {
  if (!isCurriculumIndexed) {
    initializeCurriculumTranslations();
  }
}

// Schedule deferred microtask warm-up after all ESM modules finish circular evaluation
if (typeof queueMicrotask === 'function') {
  queueMicrotask(() => {
    ensureCurriculumTranslationsIndexed();
  });
}

/**
 * Save translation entry into memory and persistent storage with source & target language isolation
 */
export function saveTranslationToCache(
  sourceText: string,
  targetText: string,
  sourceLang = 'en',
  targetLang = 'vi'
): void {
  if (!sourceText || !targetText) return;
  if (!isUsableTranslation(sourceText, targetText)) return;

  const key = normalizeKey(sourceText);
  if (!key) return;
  const langKey = `${sourceLang}:${targetLang}:${key}`;
  const trimmed = targetText.trim();

  memoryCache.set(langKey, trimmed);
  runtimeCache.set(langKey, trimmed);

  try {
    if (memoryCache.size > MAX_CACHE_ENTRIES) {
      const firstKey = memoryCache.keys().next().value;
      if (firstKey) memoryCache.delete(firstKey);
    }
    if (runtimeCache.size > 400) {
      const firstRuntimeKey = runtimeCache.keys().next().value;
      if (firstRuntimeKey) runtimeCache.delete(firstRuntimeKey);
    }

    const obj: Record<string, string> = {};
    for (const [k, v] of runtimeCache.entries()) {
      obj[k] = v;
    }
    localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(obj));
  } catch {
    // Ignore storage quota errors
  }
}

function lookupDirectional(key: string, sourceLang: string, targetLang: string): string | null {
  if (!key) return null;
  const langKey = `${sourceLang}:${targetLang}:${key}`;
  if (memoryCache.has(langKey)) {
    return memoryCache.get(langKey) || null;
  }
  if (sourceLang === 'en' && targetLang === 'vi' && INFORMATICS_DICTIONARY[key]) {
    const val = INFORMATICS_DICTIONARY[key];
    memoryCache.set(langKey, val);
    return val;
  }
  return null;
}

/**
 * Retrieve translation from local cache, glossary dictionary, or normalized prefixes (0ms latency)
 */
export function getCachedTranslation(
  sourceText: string,
  sourceLang = 'en',
  targetLang = 'vi'
): string | null {
  ensureCurriculumTranslationsIndexed();
  if (!sourceText) return null;
  const rawClean = sourceText.trim();
  const key = normalizeKey(rawClean);

  // 1. Direct directional hit
  const direct = lookupDirectional(key, sourceLang, targetLang);
  if (direct && isUsableTranslation(rawClean, direct)) {
    return direct;
  }

  // 2. Trailing parenthetical stripped (e.g. "Learning Objectives (Page 20 SGK)")
  const parenMatch = rawClean.match(/^(.+?)\s*\(([^)]+)\)[:\s]*$/);
  if (parenMatch) {
    const base = parenMatch[1].trim();
    const parenContent = parenMatch[2].trim();
    const baseTrans = lookupDirectional(normalizeKey(base), sourceLang, targetLang);
    if (baseTrans) {
      const translatedParen = parenContent
        .replace(/page\s+(\d+)\s*sgk/i, 'Trang $1 SGK')
        .replace(/trang\s+(\d+)\s*sgk/i, 'Page $1 SGK')
        .replace(/textbook\s*p\.?\s*(\d+)/i, 'Trang $1 SGK');
      return `${baseTrans} (${translatedParen})`;
    }
  }

  // 3. Leading symbol or emoji stripped (e.g. "❓ Textbook Discussion Question:")
  const symbolMatch = rawClean.match(/^([❓✓✔✗●•→★⚡🔍💡🎯📌📚✨\s]+)(.+)$/);
  if (symbolMatch) {
    const symbol = symbolMatch[1];
    const rest = symbolMatch[2].trim();
    const restTrans = lookupDirectional(normalizeKey(rest), sourceLang, targetLang);
    if (restTrans) {
      return `${symbol}${restTrans}`;
    }
  }

  // 4. Smart prefix stripper (e.g. "A. Data is...", "1. Introduction", "Task 1: ...", "Objective 1: ...")
  const prefixMatch = rawClean.match(/^([A-Da-d0-9]+[.):\s]+|(?:Task|Step|Lesson|Topic|Section|Objective|Activity|Question|Example)\s+\d+[:.\-\s]+)(.+)$/i);
  if (prefixMatch) {
    const prefix = prefixMatch[1];
    const rest = prefixMatch[2].trim();
    const restTrans = lookupDirectional(normalizeKey(rest), sourceLang, targetLang);
    if (restTrans) {
      return `${prefix}${restTrans}`;
    }
  }

  // 5. Trailing punctuation stripped
  const noPunct = rawClean.replace(/[:.!?]+$/, '').trim();
  if (noPunct !== rawClean) {
    const noPunctTrans = lookupDirectional(normalizeKey(noPunct), sourceLang, targetLang);
    if (noPunctTrans) {
      return noPunctTrans;
    }
  }

  return null;
}

/**
 * Translate English text to Vietnamese with same-origin proxy + client fallback (strictly EN -> VI)
 * Returns null if translation is unavailable or duplicates source English
 */
export async function translateEnglishToVietnamese(
  textEn: string,
  signal?: AbortSignal
): Promise<string | null> {
  const cleanEn = textEn.trim();
  if (!cleanEn) return null;

  // 1. Check local dictionary & cache first (0ms)
  const cached = getCachedTranslation(cleanEn, 'en', 'vi');
  if (cached && isUsableTranslation(cleanEn, cached)) {
    return cached;
  }

  // 2. Multi-sentence split helper: reuse local cache for known sentences and batch unknown text via /api/translate
  try {
    if (typeof fetch !== 'function') return null;

    // Split longer blocks into <= 240 char segments so server/external API stays accurate
    const chunks = cleanEn.length > 350
      ? cleanEn.match(/[^.!?]+[.!?]+|\s*[^.!?]+$/g)?.map((s) => s.trim()).filter(Boolean) || [cleanEn]
      : [cleanEn];

    const translatedParts: string[] = [];

    for (const chunk of chunks.slice(0, 3)) {
      if (signal?.aborted) return null;

      const cachedChunk = getCachedTranslation(chunk, 'en', 'vi');
      if (cachedChunk && isUsableTranslation(chunk, cachedChunk)) {
        translatedParts.push(cachedChunk);
        continue;
      }

      // Primary network path: same-origin Express proxy (/api/translate) - no browser CORS issues
      let translatedChunk: string | null = null;
      try {
        const proxyRes = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: chunk.slice(0, 500) }),
          signal
        });
        if (proxyRes.ok) {
          const proxyData = (await proxyRes.json()) as { translatedText?: string };
          if (proxyData?.translatedText && isUsableTranslation(chunk, proxyData.translatedText)) {
            translatedChunk = proxyData.translatedText.trim();
          }
        }
      } catch (err) {
        if (signal?.aborted) throw err;
      }

      // Fallback if running pure static Vite preview without Express /api/translate
      if (!translatedChunk && !signal?.aborted) {
        const encoded = encodeURIComponent(chunk.slice(0, 300));
        const url = `https://api.mymemory.translated.net/get?q=${encoded}&langpair=en|vi`;
        const res = await fetch(url, { signal });
        if (res.ok) {
          const data = await res.json();
          const rawTranslated = data?.responseData?.translatedText;
          if (typeof rawTranslated === 'string' && rawTranslated.trim()) {
            const decoded =
              typeof DOMParser !== 'undefined'
                ? (new DOMParser().parseFromString(rawTranslated, 'text/html').body.textContent || rawTranslated).trim()
                : rawTranslated.trim();
            if (isUsableTranslation(chunk, decoded)) {
              translatedChunk = decoded;
            }
          }
        }
      }

      if (translatedChunk && isUsableTranslation(chunk, translatedChunk)) {
        saveTranslationToCache(chunk, translatedChunk, 'en', 'vi');
        translatedParts.push(translatedChunk);
      } else {
        translatedParts.push(chunk);
      }
    }

    if (translatedParts.length > 0) {
      const fullTranslated = translatedParts.join(' ').trim();
      if (isUsableTranslation(cleanEn, fullTranslated)) {
        saveTranslationToCache(cleanEn, fullTranslated, 'en', 'vi');
        return fullTranslated;
      }
    }
  } catch (err: unknown) {
    if (signal?.aborted) {
      throw err;
    }
  }

  return null;
}
