// Data definitions and quiz questions for Bài 20: Câu lệnh lặp for
// Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 105 – 107)

import { TermDefinition } from './lessonData';
import { QuizQuestion } from './lesson2Data';

export const LESSON_20_GLOSSARY: TermDefinition[] = [
  {
    id: 't20-1',
    termVi: 'Cấu trúc lặp (Loop Structure)',
    termEn: 'Loop Structure / Iteration',
    ipa: '/luːp ˈstrʌktʃər/',
    definitionVi: 'Cấu trúc điều khiển trong lập trình cho phép lặp đi lặp lại một hoặc một khối lệnh nhiều lần theo một điều kiện hoặc số lần xác định.',
    definitionEn: 'A control structure in programming that repeats a statement or block of statements multiple times according to a condition or fixed count.',
    exampleVi: 'Điểm danh 30 học sinh hoặc đếm các số chia hết cho 3 từ 1 đến 50.',
    exampleEn: 'Calling attendance for 30 students or counting multiples of 3 between 1 and 50.',
    sgkContext: 'SGK Tin học 10, Trang 105 – Khởi động: Cấu trúc lặp.'
  },
  {
    id: 't20-2',
    termVi: 'Câu lệnh lặp for (for Loop Statement)',
    termEn: 'for Loop Statement',
    ipa: '/fɔːr luːp ˈsteɪtmənt/',
    definitionVi: 'Câu lệnh lặp với số lần biết trước trong Python. Biến chạy lần lượt nhận các giá trị trong một vùng dữ liệu (thường tạo bởi lệnh range()).',
    definitionEn: 'A definite iteration loop statement in Python where the loop variable sequentially takes values from a sequence or range.',
    exampleVi: 'for i in range(n): print(i)',
    exampleEn: 'for i in range(n): print(i)',
    sgkContext: 'SGK Tin học 10, Trang 105 – Mục 1: Lệnh lặp for.'
  },
  {
    id: 't20-3',
    termVi: 'Hàm range() (range Function)',
    termEn: 'range() Built-in Function',
    ipa: '/reɪndʒ ˈfʌŋkʃən/',
    definitionVi: 'Hàm tích hợp sẵn trong Python dùng để tạo ra một vùng giá trị (dãy số nguyên liên tiếp) phục vụ cho vòng lặp.',
    definitionEn: 'A built-in Python function that generates an immutable sequence of integers over a specified interval.',
    exampleVi: 'range(10) tạo dãy số 0, 1, 2, ..., 9 gồm đúng 10 số.',
    exampleEn: 'range(10) generates integers 0, 1, 2, ..., 9 containing 10 items.',
    sgkContext: 'SGK Tin học 10, Trang 105 – 106 – Mục 2: Lệnh range.'
  },
  {
    id: 't20-4',
    termVi: 'Biến lặp / Biến chạy (Loop Counter Variable)',
    termEn: 'Loop Counter Variable',
    ipa: '/luːp ˈkaʊntər ˈveəriəbl/',
    definitionVi: 'Biến được khai báo ngay sau từ khoá for, nhận lần lượt từng giá trị trong vùng giá trị sau mỗi chu kỳ lặp.',
    definitionEn: 'The variable declared immediately after the for keyword, assigned sequentially to each element of the sequence during each iteration.',
    exampleVi: 'for k in range(10): ở mỗi vòng lặp k nhận lần lượt từ 0 đến 9.',
    exampleEn: 'for k in range(10): k sequentially takes values from 0 to 9.',
    sgkContext: 'SGK Tin học 10, Trang 105 – Mục 1 & Hình 20.1.'
  },
  {
    id: 't20-5',
    termVi: 'range(stop)',
    termEn: 'range with Single Argument',
    ipa: '/reɪndʒ stɑːp/',
    definitionVi: 'Tạo vùng giá trị gồm các số nguyên liên tiếp bắt đầu từ 0 và kết thúc tại stop - 1. Số lượng phần tử đúng bằng stop.',
    definitionEn: 'Generates a sequence of integers starting from 0 and ending at stop - 1, producing exactly stop elements.',
    exampleVi: 'range(5) cho dãy: 0, 1, 2, 3, 4.',
    exampleEn: 'range(5) produces sequence: 0, 1, 2, 3, 4.',
    sgkContext: 'SGK Tin học 10, Trang 106 – Dạng 1: range(stop).'
  },
  {
    id: 't20-6',
    termVi: 'range(start, stop)',
    termEn: 'range with Start and Stop',
    ipa: '/reɪndʒ stɑːrt stɑːp/',
    definitionVi: 'Tạo vùng giá trị gồm các số nguyên liên tiếp bắt đầu từ start và kết thúc tại stop - 1. Số phần tử bằng stop - start.',
    definitionEn: 'Generates consecutive integers starting at start up to stop - 1, containing stop - start elements.',
    exampleVi: 'range(3, 10) cho các số: 3, 4, 5, 6, 7, 8, 9 (gồm 7 số).',
    exampleEn: 'range(3, 10) yields integers: 3, 4, 5, 6, 7, 8, 9 (7 elements).',
    sgkContext: 'SGK Tin học 10, Trang 106 – Dạng 2: range(start, stop).'
  },
  {
    id: 't20-7',
    termVi: 'Vùng rỗng (Empty Range)',
    termEn: 'Empty Range Sequence',
    ipa: '/ˈɛmpti reɪndʒ/',
    definitionVi: 'Vùng giá trị không chứa bất kỳ phần tử nào, xảy ra khi start >= stop (với bước nhảy dương mặc định). Khi đó vòng lặp for không thực hiện lần nào.',
    definitionEn: 'A range containing no elements, occurring when start >= stop with positive step. The for loop body will not execute.',
    exampleVi: 'range(100, 1) là dãy rỗng.',
    exampleEn: 'range(100, 1) evaluates to an empty sequence.',
    sgkContext: 'SGK Tin học 10, Trang 106 – Bảng ví dụ tạo vùng giá trị.'
  },
  {
    id: 't20-8',
    termVi: 'Tham số end trong print()',
    termEn: 'end Parameter in print()',
    ipa: '/ɛnd pəˈræmɪtər/',
    definitionVi: 'Tham số quy định kí tự được in ra ở cuối thay vì xuống dòng mặc định. Thường dùng end = " " để in dữ liệu trên một hàng ngang.',
    definitionEn: 'Parameter in print() specifying what to print at the end instead of the default newline. Commonly set to end = " " for horizontal layout.',
    exampleVi: 'print(k, end = " ") in giá trị k kèm khoảng trắng, không xuống dòng.',
    exampleEn: 'print(k, end = " ") outputs k followed by space without newline.',
    sgkContext: 'SGK Tin học 10, Trang 106 – 107 – Hoạt động 2 & Thực hành.'
  },
  {
    id: 't20-9',
    termVi: 'Ước số thực sự (Proper Divisor)',
    termEn: 'Proper Divisor',
    ipa: '/ˈprɒpər dɪˈvaɪzər/',
    definitionVi: 'Ước số của số nguyên tự nhiên n thoả mãn nhỏ hơn n (k < n và n % k == 0). Ước số thực sự không bao gồm chính số n.',
    definitionEn: 'A positive divisor of natural number n that is strictly less than n (k < n and n % k == 0), excluding n itself.',
    exampleVi: 'Ước thực sự của 10 là 1, 2, 5 (không tính 10).',
    exampleEn: 'Proper divisors of 10 are 1, 2, 5 (excluding 10).',
    sgkContext: 'SGK Tin học 10, Trang 107 – Thực hành Nhiệm vụ 2.'
  },
  {
    id: 't20-10',
    termVi: 'Kỹ thuật tích luỹ (Accumulator Pattern)',
    termEn: 'Accumulator Pattern',
    ipa: '/əˈkjuːmjəleɪtər ˈpætərn/',
    definitionVi: 'Kỹ thuật lập trình dùng một biến khởi tạo (như S = 0 hoặc P = 1) rồi cập nhật dồn giá trị sau mỗi vòng lặp (S = S + k hoặc P = P * k).',
    definitionEn: 'Programming pattern where a variable is initialized (e.g. S = 0 or P = 1) and iteratively updated inside a loop to aggregate results.',
    exampleVi: 'S = 0; for k in range(10): S = S + k',
    exampleEn: 'S = 0; for k in range(10): S = S + k',
    sgkContext: 'SGK Tin học 10, Trang 105 – Hoạt động 1 & Luyện tập 2.'
  }
];

export const LESSON_20_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: 'Trong Python, câu lệnh lặp for có cú pháp chuẩn với số lần lặp biết trước là gì?',
    questionEn: 'In Python, what is the standard syntax for a for loop with a known number of iterations?',
    optionsVi: [
      'for <i> in range(n): <khối lệnh>',
      'for <i> = 1 to n do <khối lệnh>',
      'for (i = 0; i < n; i++) <khối lệnh>',
      'loop <i> from 0 to n: <khối lệnh>'
    ],
    optionsEn: [
      'for <i> in range(n): <code block>',
      'for <i> = 1 to n do <code block>',
      'for (i = 0; i < n; i++) <code block>',
      'loop <i> from 0 to n: <code block>'
    ],
    correctIndex: 0,
    explanationVi: 'Cú pháp chuẩn của Python (SGK Trang 105): for <i> in range(n): theo sau là dấu hai chấm và khối lệnh thụt lề.',
    explanationEn: 'Python standard syntax (Page 105): for <i> in range(n): followed by a colon and indented block.'
  },
  {
    id: 2,
    questionVi: 'Lệnh range(10) trong Python trả lại vùng giá trị gồm các số nào?',
    questionEn: 'What sequence of numbers does range(10) return in Python?',
    optionsVi: [
      '1, 2, 3, 4, 5, 6, 7, 8, 9, 10',
      '0, 1, 2, 3, 4, 5, 6, 7, 8, 9',
      '0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10',
      '1, 2, 3, 4, 5, 6, 7, 8, 9'
    ],
    optionsEn: [
      '1, 2, 3, 4, 5, 6, 7, 8, 9, 10',
      '0, 1, 2, 3, 4, 5, 6, 7, 8, 9',
      '0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10',
      '1, 2, 3, 4, 5, 6, 7, 8, 9'
    ],
    correctIndex: 1,
    explanationVi: 'range(10) bắt đầu từ 0 và kết thúc tại 10 - 1 = 9, gồm đúng 10 số nguyên liên tiếp: 0, 1, 2, ..., 9 (SGK Trang 105).',
    explanationEn: 'range(10) starts at 0 and stops at 10 - 1 = 9, producing exactly 10 integers: 0 to 9.'
  },
  {
    id: 3,
    questionVi: 'Sau khi thực hiện đoạn lệnh sau, biến S có giá trị bằng bao nhiêu?\nS = 0\nfor k in range(10):\n    S = S + k\nprint(S)',
    questionEn: 'After executing the snippet above, what is the final value of S?',
    optionsVi: [
      '55',
      '50',
      '45',
      '40'
    ],
    optionsEn: [
      '55',
      '50',
      '45',
      '40'
    ],
    correctIndex: 2,
    explanationVi: 'Vòng lặp cộng dồn các giá trị k từ 0 đến 9: 0 + 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 = 45 (Hoạt động 1, SGK Trang 105).',
    explanationEn: 'The loop sums k from 0 to 9: 0+1+2+3+4+5+6+7+8+9 = 45.'
  },
  {
    id: 4,
    questionVi: 'Lệnh range(3, 10) sinh ra vùng giá trị gồm bao nhiêu số và gồm những số nào?',
    questionEn: 'How many numbers and which values does range(3, 10) generate?',
    optionsVi: [
      '7 số: 3, 4, 5, 6, 7, 8, 9',
      '8 số: 3, 4, 5, 6, 7, 8, 9, 10',
      '10 số: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9',
      '6 số: 4, 5, 6, 7, 8, 9'
    ],
    optionsEn: [
      '7 numbers: 3, 4, 5, 6, 7, 8, 9',
      '8 numbers: 3, 4, 5, 6, 7, 8, 9, 10',
      '10 numbers: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9',
      '6 numbers: 4, 5, 6, 7, 8, 9'
    ],
    correctIndex: 0,
    explanationVi: 'range(start, stop) chạy từ start (3) đến stop - 1 (9), gồm 10 - 3 = 7 số: 3, 4, 5, 6, 7, 8, 9 (SGK Trang 106).',
    explanationEn: 'range(start, stop) yields from start (3) to stop - 1 (9), giving 7 numbers.'
  },
  {
    id: 5,
    questionVi: 'Để in các giá trị k trên cùng một dòng ngang cách nhau bởi dấu cách, ta dùng lệnh print() như thế nào?',
    questionEn: 'To print k values horizontally separated by spaces, how should print() be called?',
    optionsVi: [
      'print(k, sep = " ")',
      'print(k, end = " ")',
      'print(k, line = False)',
      'print.horizontal(k)'
    ],
    optionsEn: [
      'print(k, sep = " ")',
      'print(k, end = " ")',
      'print(k, line = False)',
      'print.horizontal(k)'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 106: Thêm tham số end = " " trong lệnh print() để dữ liệu in ra không bị xuống dòng mà phân cách bởi khoảng trắng.',
    explanationEn: 'Page 106: Supply parameter end = " " in print() to replace default newline with space.'
  },
  {
    id: 6,
    questionVi: 'Vùng giá trị tạo bởi lệnh range(100, 1) là gì?',
    questionEn: 'What sequence does range(100, 1) generate?',
    optionsVi: [
      'Dãy các số từ 100 giảm dần về 1',
      'Dãy các số từ 1 đến 100',
      'Vùng rỗng (không chứa phần tử nào)',
      'Báo lỗi ValueError trong Python'
    ],
    optionsEn: [
      'Decreasing sequence from 100 down to 1',
      'Increasing sequence from 1 to 100',
      'Empty range (contains no elements)',
      'Raises a ValueError in Python'
    ],
    correctIndex: 2,
    explanationVi: 'Khi start >= stop (100 >= 1) với bước nhảy mặc định dương (+1), range(100, 1) là vùng rỗng (SGK Trang 106).',
    explanationEn: 'When start >= stop with default positive step, range(100, 1) produces an empty sequence.'
  },
  {
    id: 7,
    questionVi: 'Để tạo dãy số nguyên 1, 2, 3, ..., 50 bằng lệnh range(), câu lệnh nào dưới đây là đúng?',
    questionEn: 'Which command correctly generates the integers 1, 2, 3, ..., 50?',
    optionsVi: [
      'range(1, 50)',
      'range(50)',
      'range(1, 51)',
      'range(0, 50)'
    ],
    optionsEn: [
      'range(1, 50)',
      'range(50)',
      'range(1, 51)',
      'range(0, 50)'
    ],
    correctIndex: 2,
    explanationVi: 'Vì range(start, stop) chỉ lấy đến stop - 1 nên để lấy đến 50 thì stop phải là 51: range(1, 51) (SGK Trang 107 Câu củng cố 2a).',
    explanationEn: 'Since range stops at stop - 1, to include 50 we need stop = 51: range(1, 51).'
  },
  {
    id: 8,
    questionVi: 'Điều kiện trong Python để kiểm tra số tự nhiên k có phải là ước số của n là gì?',
    questionEn: 'What is the Python condition to test if natural number k is a divisor of n?',
    optionsVi: [
      'k % n == 0',
      'n % k == 0',
      'n // k == 0',
      'k // n == 0'
    ],
    optionsEn: [
      'k % n == 0',
      'n % k == 0',
      'n // k == 0',
      'k // n == 0'
    ],
    correctIndex: 1,
    explanationVi: 'k là ước số của n nếu n chia hết cho k, tức phép chia lấy dư n % k có số dư bằng 0 (SGK Trang 107).',
    explanationEn: 'k divides n evenly if the remainder n % k equals 0.'
  },
  {
    id: 9,
    questionVi: 'Cho đoạn mã sau với n = 3:\nS = 0\nfor k in range(n + 1):\n    S = S + k\nprint(S * S)\nKết quả in ra màn hình là gì?',
    questionEn: 'For the snippet above with n = 3, what output is printed to screen?',
    optionsVi: [
      '9',
      '16',
      '36',
      '64'
    ],
    optionsEn: [
      '9',
      '16',
      '36',
      '64'
    ],
    correctIndex: 2,
    explanationVi: 'Với n = 3, range(4) sinh 0, 1, 2, 3. Tổng S = 0 + 1 + 2 + 3 = 6. Kết quả in ra S * S = 6 * 6 = 36 (Luyện tập 1, SGK Trang 107).',
    explanationEn: 'With n = 3, range(4) generates 0, 1, 2, 3. S = 6. Output S * S = 36.'
  },
  {
    id: 10,
    questionVi: 'Điểm khác biệt giữa "ước số của n" và "ước số thực sự của n" trong SGK Bài 20 là gì?',
    questionEn: 'What is the distinction between a "divisor of n" and a "proper divisor of n"?',
    optionsVi: [
      'Ước số thực sự chỉ bao gồm các số lẻ',
      'Ước số thực sự chỉ bao gồm số nguyên tố',
      'Ước số thực sự là các ước số tự nhiên k < n (không tính chính số n)',
      'Ước số thực sự bao gồm cả các ước âm'
    ],
    optionsEn: [
      'Proper divisors include only odd numbers',
      'Proper divisors include only prime numbers',
      'Proper divisors are divisors strictly less than n (excluding n itself)',
      'Proper divisors also include negative divisors'
    ],
    correctIndex: 2,
    explanationVi: 'SGK Trang 107: "Ước số thực sự của n là số tự nhiên k < n và là ước của n" (loại bỏ n). Do đó vòng lặp duyệt range(1, n).',
    explanationEn: 'Page 107: Proper divisors are positive divisors k < n, excluding n itself.'
  }
];

export const RANGE_MATCHING_CHALLENGES = [
  {
    id: 'c1',
    sequence: '1, 2, 3, ..., 50',
    correctRange: 'range(1, 51)',
    explanation: 'Bắt đầu từ 1, kết thúc tại 50 nên stop = 50 + 1 = 51.'
  },
  {
    id: 'c2',
    sequence: '5, 6, 7, 8, 9, 10',
    correctRange: 'range(5, 11)',
    explanation: 'Bắt đầu từ 5, kết thúc tại 10 nên stop = 10 + 1 = 11.'
  },
  {
    id: 'c3',
    sequence: '0, 1',
    correctRange: 'range(2) hoặc range(0, 2)',
    explanation: 'Gồm 2 phần tử 0 và 1, có thể viết ngắn gọn là range(2).'
  },
  {
    id: 'c4',
    sequence: 'Dãy chỉ có số 10',
    correctRange: 'range(10, 11)',
    explanation: 'Bắt đầu từ 10 và chỉ lấy đúng 1 phần tử nên stop = 11.'
  },
  {
    id: 'c5',
    sequence: '0, 1, 2, ..., n - 1',
    correctRange: 'range(n)',
    explanation: 'Chuẩn vùng giá trị n phần tử từ 0 đến n - 1.'
  },
  {
    id: 'c6',
    sequence: '1, 2, ..., n',
    correctRange: 'range(1, n + 1)',
    explanation: 'Dãy n số tự nhiên liên tiếp từ 1 đến n.'
  }
];
