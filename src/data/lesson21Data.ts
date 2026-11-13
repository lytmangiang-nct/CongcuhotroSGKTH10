// Data definitions and quiz questions for Bài 21: Câu lệnh lặp while
// Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 108 – 110)

import { TermDefinition } from './lessonData';
import { QuizQuestion } from './lesson2Data';

export const LESSON_21_GLOSSARY: TermDefinition[] = [
  {
    id: 't21-1',
    termVi: 'Câu lệnh lặp while (while Loop Statement)',
    termEn: 'while Loop Statement',
    ipa: '/waɪl luːp ˈsteɪtmənt/',
    definitionVi: 'Câu lệnh lặp với số lần không biết trước trong Python. Khối lệnh lặp được thực hiện chừng nào điều kiện lặp còn nhận giá trị True và chỉ dừng khi điều kiện nhận giá trị False.',
    definitionEn: 'An indefinite iteration statement in Python that repeatedly executes a block of code as long as a specified boolean condition remains True.',
    exampleVi: 'while k < 100: S = S + k; k = k + 7',
    exampleEn: 'while k < 100: S = S + k; k = k + 7',
    sgkContext: 'SGK Tin học 10, Trang 108 – Mục 1: Lệnh lặp while.'
  },
  {
    id: 't21-2',
    termVi: 'Lặp với số lần không biết trước (Indefinite Iteration)',
    termEn: 'Indefinite Iteration',
    ipa: '/ɪnˈdɛfɪnɪt ˌɪtəˈreɪʃən/',
    definitionVi: 'Dạng lặp mà tại thời điểm bắt đầu không thể xác định chính xác số chu kỳ lặp, số lần lặp hoàn toàn phụ thuộc vào việc kiểm tra điều kiện sau mỗi bước.',
    definitionEn: 'A loop where the exact number of iterations is not known beforehand and depends on a dynamic condition being satisfied.',
    exampleVi: 'Chạy nhiều vòng quanh sân trong 2 tiếng hoặc xách nước đến khi đầy thùng.',
    exampleEn: 'Jogging for 2 hours or carrying buckets until the reservoir is completely full.',
    sgkContext: 'SGK Tin học 10, Trang 108 – Hoạt động Khởi động (Cột B).'
  },
  {
    id: 't21-3',
    termVi: 'Điều kiện lặp (Loop Condition)',
    termEn: 'Loop Continuation Condition',
    ipa: '/luːp kənˈdɪʃən/',
    definitionVi: 'Biểu thức lôgic đặt ngay sau từ khoá while. Trước mỗi vòng lặp, Python kiểm tra điều kiện này: nếu True thì thực hiện thân vòng lặp, nếu False thì kết thúc.',
    definitionEn: 'The boolean expression evaluated before each iteration: if True the loop body executes; if False the loop terminates.',
    exampleVi: 'Trong "while k <= 90:", biểu thức "k <= 90" là điều kiện lặp.',
    exampleEn: 'In "while k <= 90:", the expression "k <= 90" is the loop condition.',
    sgkContext: 'SGK Tin học 10, Trang 108 – Cú pháp & Sơ đồ khối Hình 21.1.'
  },
  {
    id: 't21-4',
    termVi: 'Lặp vô hạn (Infinite Loop)',
    termEn: 'Infinite Loop',
    ipa: '/ˈɪnfɪnɪt luːp/',
    definitionVi: 'Hiện tượng vòng lặp chạy mãi mãi không dừng do điều kiện lặp không bao giờ trở thành False, khiến chương trình bị treo hoặc tràn tài nguyên.',
    definitionEn: 'A programming flaw where a loop repeats endlessly because the termination condition is never reached or evaluated to False.',
    exampleVi: 'k = 1; while k > 0: print(k); k = k + 1 (k luôn dương, lặp vô tận).',
    exampleEn: 'k = 1; while k > 0: print(k); k = k + 1 (k remains positive forever).',
    sgkContext: 'SGK Tin học 10, Trang 109 – Hộp Lưu ý 1: Tránh lặp vô hạn.'
  },
  {
    id: 't21-5',
    termVi: 'Lệnh break (break Statement)',
    termEn: 'break Statement',
    ipa: '/breɪk ˈsteɪtmənt/',
    definitionVi: 'Câu lệnh dùng để dừng ngay lập tức và thoát hoàn toàn ra khỏi vòng lặp (for hoặc while) gần nhất, bỏ qua các vòng lặp còn lại.',
    definitionEn: 'A control statement used to immediately terminate and exit the enclosing for or while loop.',
    exampleVi: 'for k in range(10): if k == 5: break (chỉ in từ 0 đến 5 rồi dừng).',
    exampleEn: 'for k in range(10): if k == 5: break (prints 0 to 5 then halts).',
    sgkContext: 'SGK Tin học 10, Trang 109 – Hộp Lưu ý 2: Lệnh break.'
  },
  {
    id: 't21-6',
    termVi: 'Cấu trúc tuần tự (Sequential Structure)',
    termEn: 'Sequential Control Structure',
    ipa: '/sɪˈkwɛnʃəl ˈstrʌktʃər/',
    definitionVi: 'Cấu trúc lập trình cơ bản trong đó các câu lệnh được máy tính thực hiện theo đúng trình tự từ trên xuống dưới một cách liên tục.',
    definitionEn: 'The fundamental programming structure where instructions execute in strict sequential order from top to bottom.',
    exampleVi: 'Khối lệnh gán giá trị, nhập dữ liệu input() và xuất dữ liệu print().',
    exampleEn: 'Blocks of assignment statements, input() and print() calls.',
    sgkContext: 'SGK Tin học 10, Trang 109 – 110 – Mục 2: Cấu trúc lập trình.'
  },
  {
    id: 't21-7',
    termVi: 'Cấu trúc rẽ nhánh (Selection Structure)',
    termEn: 'Selection / Branching Structure',
    ipa: '/sɪˈlɛkʃən ˈstrʌktʃər/',
    definitionVi: 'Cấu trúc lập trình chỉ thực hiện một khối lệnh tuỳ thuộc vào điều kiện kiểm tra là đúng hay sai (thể hiện bằng câu lệnh if, if-else).',
    definitionEn: 'A control structure executing specific code blocks conditionally based on truth evaluation of a boolean expression.',
    exampleVi: 'if i % 10 == 0: print(chr(k)) else: print(chr(k), end = " ").',
    exampleEn: 'if i % 10 == 0: print(chr(k)) else: print(chr(k), end = " ").',
    sgkContext: 'SGK Tin học 10, Trang 110 – Mục 2 & Hộp Ghi nhớ 2.'
  },
  {
    id: 't21-8',
    termVi: 'Cấu trúc lặp (Iterative / Repetition Structure)',
    termEn: 'Repetition / Iterative Structure',
    ipa: '/ˈɪtərətɪv ˈstrʌktʃər/',
    definitionVi: 'Cấu trúc lập trình thực hiện lặp đi lặp lại một khối lệnh tuỳ theo một điều kiện nào đó vẫn còn đúng (thể hiện bằng for hoặc while).',
    definitionEn: 'A control structure repeating a statement block continuously while a designated condition holds true.',
    exampleVi: 'Các vòng lặp for i in range(...) và while <điều kiện>:.',
    exampleEn: 'for i in range(...) and while <condition>: loop blocks.',
    sgkContext: 'SGK Tin học 10, Trang 110 – Ba cấu trúc lập trình cơ bản.'
  },
  {
    id: 't21-9',
    termVi: 'Hàm chr() (Character from ASCII Code)',
    termEn: 'chr() Built-in Function',
    ipa: '/kær ˈfʌŋkʃən/',
    definitionVi: 'Hàm trả lại ký tự tương ứng với mã số nguyên trong bảng mã chuẩn ASCII/Unicode. Chẳng hạn chr(65) trả về ký tự chữ cái \'A\'.',
    definitionEn: 'A built-in function returning the string representing a character whose Unicode/ASCII integer code is passed as argument.',
    exampleVi: 'chr(65) -> \'A\', chr(90) -> \'Z\'.',
    exampleEn: 'chr(65) -> \'A\', chr(90) -> \'Z\'.',
    sgkContext: 'SGK Tin học 10, Trang 110 – Thực hành Nhiệm vụ 2.'
  },
  {
    id: 't21-10',
    termVi: 'Bảng mã ASCII (ASCII Table)',
    termEn: 'ASCII Character Encoding Standard',
    ipa: '/ˈæski ˈteɪbəl/',
    definitionVi: 'Chuẩn mã hoá ký tự cho máy tính, trong đó các chữ cái tiếng Anh in hoa từ \'A\' đến \'Z\' chiếm các vị trí số nguyên liên tiếp từ 65 đến 90.',
    definitionEn: 'Standard character encoding where uppercase English letters \'A\' through \'Z\' occupy consecutive integer codepoints 65 to 90.',
    exampleVi: '\'A\' có mã 65, \'B\' có mã 66, ..., \'Z\' có mã 90.',
    exampleEn: '\'A\' has code 65, \'B\' has code 66, ..., \'Z\' has code 90.',
    sgkContext: 'SGK Tin học 10, Trang 110 – Thực hành Nhiệm vụ 2.'
  }
];

export const LESSON_21_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: 'Khối lệnh trong câu lệnh lặp while của Python được thực hiện khi nào và dừng lại khi nào?',
    questionEn: 'When is the code block inside a Python while loop executed, and when does it terminate?',
    optionsVi: [
      'Thực hiện khi <điều kiện> = True và dừng khi <điều kiện> = False',
      'Thực hiện khi <điều kiện> = False và dừng khi <điều kiện> = True',
      'Thực hiện đúng 10 lần rồi tự động dừng lại',
      'Thực hiện ít nhất một lần trước khi kiểm tra điều kiện'
    ],
    optionsEn: [
      'Executes when condition is True and stops when condition is False',
      'Executes when condition is False and stops when condition is True',
      'Executes exactly 10 times then automatically halts',
      'Executes at least once before inspecting the condition'
    ],
    correctIndex: 0,
    explanationVi: 'Theo SGK Trang 108: Lệnh lặp while thực hiện khối lệnh lặp cho đến khi <điều kiện> = False. Khi điều kiện Sai, vòng lặp dừng ngay lập tức.',
    explanationEn: 'Page 108: The while loop executes its body as long as condition evaluates to True, and halts immediately when it turns False.'
  },
  {
    id: 2,
    questionVi: 'Trong Python, câu lệnh while kiểm tra điều kiện lặp vào thời điểm nào?',
    questionEn: 'In Python, at what moment does the while loop evaluate its continuation condition?',
    optionsVi: [
      'Kiểm tra trước khi thực hiện khối lệnh lặp',
      'Kiểm tra sau khi thực hiện xong toàn bộ khối lệnh lặp',
      'Kiểm tra ngẫu nhiên giữa chừng',
      'Không kiểm tra điều kiện mà lặp theo số lần'
    ],
    optionsEn: [
      'Evaluates prior to executing the loop body',
      'Evaluates after completing the loop body',
      'Evaluates randomly midway',
      'Does not evaluate conditions and repeats by count'
    ],
    correctIndex: 0,
    explanationVi: 'Theo sơ đồ khối Hình 21.1 (Trang 108) và Câu hỏi củng cố 1 (Trang 109): Lệnh while luôn kiểm tra điều kiện trước. Nếu đúng mới thực hiện khối lệnh, nếu sai từ đầu thì khối lệnh không được chạy lần nào.',
    explanationEn: 'According to Figure 21.1 (Page 108): Python while loop is a pre-test loop evaluating the condition before entering the body.'
  },
  {
    id: 3,
    questionVi: 'Sau khi thực hiện đoạn chương trình sau, biến S có giá trị là bao nhiêu?',
    questionEn: 'After executing the following code snippet, what is the final value of variable S?',
    codeSnippet: 'S = 0\nk = 1\nwhile k < 100:\n    S = S + k\n    k = k + 7\nprint(S)',
    optionsVi: [
      '750',
      '700',
      '100',
      '15'
    ],
    optionsEn: [
      '750',
      '700',
      '100',
      '15'
    ],
    correctIndex: 0,
    explanationVi: 'Hoạt động 1 (SGK Trang 108): Biến k nhận các giá trị: 1, 8, 15, ..., 99 (tổng cộng 15 số). Tổng S = 1 + 8 + 15 + ... + 99 = 750. Vòng lặp dừng khi k = 106 >= 100.',
    explanationEn: 'Activity 1 (Page 108): Variable k takes values 1, 8, 15, ..., 99 (15 arithmetic progression terms). Total sum S = 750. Loop halts when k reaches 106 >= 100.'
  },
  {
    id: 4,
    questionVi: 'Đoạn chương trình sau đây thực hiện công việc gì?',
    questionEn: 'What computation does the following code snippet perform?',
    codeSnippet: 'S = 0\nk = 1\nwhile k*k < 100:\n    S = S + k*k\n    k = k + 1',
    optionsVi: [
      'Tính tổng bình phương các số tự nhiên nhỏ hơn 10 (1² + 2² + ... + 9²)',
      'Tính tổng các số tự nhiên từ 1 đến 100',
      'Tính căn bậc hai của 100',
      'Đếm số lượng các số chính phương lớn hơn 100'
    ],
    optionsEn: [
      'Calculate sum of squares of natural numbers less than 10 (1² + 2² + ... + 9²)',
      'Calculate sum of natural numbers from 1 to 100',
      'Calculate the square root of 100',
      'Count the number of perfect squares greater than 100'
    ],
    correctIndex: 0,
    explanationVi: 'Ví dụ 1 (SGK Trang 109): Điều kiện k*k < 100 tương đương k < 10. Do đó S = 1² + 2² + ... + 9² là tổng bình phương các số tự nhiên nhỏ hơn 10.',
    explanationEn: 'Example 1 (Page 109): The condition k*k < 100 restricts k from 1 to 9, computing 1² + 2² + ... + 9² = 285.'
  },
  {
    id: 5,
    questionVi: 'Đoạn lệnh sau in ra dãy số nào trên màn hình?',
    questionEn: 'Which sequence of numbers does the following code snippet print on the screen?',
    codeSnippet: 'k = 2\nwhile k < 50:\n    print(k, end = " ")\n    k = k + 3',
    optionsVi: [
      '2 5 8 11 14 17 20 23 26 29 32 35 38 41 44 47',
      '2 4 6 8 ... 48',
      '3 6 9 12 ... 48',
      '2 5 8 ... 50'
    ],
    optionsEn: [
      '2 5 8 11 14 17 20 23 26 29 32 35 38 41 44 47',
      '2 4 6 8 ... 48',
      '3 6 9 12 ... 48',
      '2 5 8 ... 50'
    ],
    correctIndex: 0,
    explanationVi: 'Ví dụ 2 (SGK Trang 109): Dãy bắt đầu từ k = 2, mỗi bước cộng thêm 3 và dừng khi k vượt quá 50 (số cuối cùng in ra là 47 vì 47 + 3 = 50 không còn < 50).',
    explanationEn: 'Example 2 (Page 109): Sequence starts at k = 2, steps by +3 each iteration, printing up to 47 since 47 + 3 = 50 violates k < 50.'
  },
  {
    id: 6,
    questionVi: 'Nguyên nhân chủ yếu nào dẫn tới hiện tượng "Lặp vô hạn" (Infinite Loop) trong câu lệnh while?',
    questionEn: 'What is the primary cause of an infinite loop in while constructs?',
    optionsVi: [
      'Khối lệnh lặp không cập nhật giá trị của biến điều kiện khiến điều kiện luôn luôn True',
      'Sử dụng từ khoá for thay vì while',
      'Trong khối lệnh có sử dụng hàm print()',
      'Không đặt tên chương trình là .py'
    ],
    optionsEn: [
      'The loop body fails to update conditional variables, keeping condition perpetually True',
      'Using keyword for instead of while',
      'Calling print() inside the body',
      'Not naming file with .py extension'
    ],
    correctIndex: 0,
    explanationVi: 'Lưu ý 1 (SGK Trang 109): Vì lệnh while không biết trước số lần lặp mà phụ thuộc vào điều kiện, nếu biến điều kiện không được thay đổi về phía làm sai điều kiện thì vòng lặp sẽ lặp vô hạn.',
    explanationEn: 'Page 109: Infinite loops occur when the state variables controlling the condition never change towards False.'
  },
  {
    id: 7,
    questionVi: 'Trong Python, câu lệnh nào cho phép dừng và thoát ngay lập tức khỏi vòng lặp for hoặc while?',
    questionEn: 'In Python, which statement immediately terminates and exits a for or while loop?',
    optionsVi: [
      'break',
      'stop',
      'exit',
      'continue'
    ],
    optionsEn: [
      'break',
      'stop',
      'exit',
      'continue'
    ],
    correctIndex: 0,
    explanationVi: 'Lưu ý 2 (SGK Trang 109): Trong trường hợp nếu muốn dừng và thoát ngay khỏi vòng lặp while hoặc for, có thể dùng lệnh break.',
    explanationEn: 'Page 109: The break keyword immediately halts execution and exits the current loop.'
  },
  {
    id: 8,
    questionVi: 'Ba cấu trúc lập trình cơ bản của mọi ngôn ngữ lập trình bậc cao là gì?',
    questionEn: 'What are the three fundamental control structures of high-level programming languages?',
    optionsVi: [
      'Cấu trúc tuần tự, cấu trúc rẽ nhánh, cấu trúc lặp',
      'Cấu trúc số nguyên, cấu trúc số thực, cấu trúc xâu ký tự',
      'Cấu trúc nhập dữ liệu, cấu trúc tính toán, cấu trúc in ấn',
      'Cấu trúc IDLE, cấu trúc tệp tin, cấu trúc hàm'
    ],
    optionsEn: [
      'Sequential structure, selection structure, iterative structure',
      'Integer, float, and string structures',
      'Input, calculation, and print structures',
      'IDLE, file, and function structures'
    ],
    correctIndex: 0,
    explanationVi: 'Hộp Ghi nhớ 2 (SGK Trang 110): Ba cấu trúc lập trình cơ bản của các ngôn ngữ lập trình bậc cao gồm: cấu trúc tuần tự, cấu trúc rẽ nhánh, cấu trúc lặp.',
    explanationEn: 'Summary Box 2 (Page 110): Sequence, selection (branching), and iteration (looping) are the 3 foundational structures.'
  },
  {
    id: 9,
    questionVi: 'Trong Python, hàm chr(65) trả lại kết quả là gì?',
    questionEn: 'In Python, what result is returned by chr(65)?',
    optionsVi: [
      'Ký tự chữ cái in hoa "A"',
      'Số nguyên 65',
      'Ký tự chữ cái thường "a"',
      'Ký tự số "0"'
    ],
    optionsEn: [
      'Uppercase letter character "A"',
      'Integer 65',
      'Lowercase letter character "a"',
      'Digit character "0"'
    ],
    correctIndex: 0,
    explanationVi: 'Thực hành Nhiệm vụ 2 (SGK Trang 110): Trong bảng mã ASCII, chữ cái "A" chiếm vị trí 65 (đến "Z" là 90). Hàm chr(k) trả lại ký tự tương ứng nên chr(65) cho "A".',
    explanationEn: 'Task 2 (Page 110): In ASCII table, letter "A" corresponds to codepoint 65; chr(65) returns \'A\'.'
  },
  {
    id: 10,
    questionVi: 'Cho đoạn mã sau, kết quả in ra màn hình là gì?',
    questionEn: 'Given the following code snippet, what sequence is printed on the screen?',
    codeSnippet: 'for k in range(10):\n    print(k, end = " ")\n    if k == 5:\n        break',
    optionsVi: [
      '0 1 2 3 4 5',
      '0 1 2 3 4',
      '0 1 2 3 4 5 6 7 8 9',
      '5'
    ],
    optionsEn: [
      '0 1 2 3 4 5',
      '0 1 2 3 4',
      '0 1 2 3 4 5 6 7 8 9',
      '5'
    ],
    correctIndex: 0,
    explanationVi: 'Ví dụ lệnh break (SGK Trang 109): Khi k chạy từ 0 đến 5, lệnh print in k trước; sau đó gặp if k == 5 lệnh break kích hoạt thoát vòng lặp ngay, do đó in "0 1 2 3 4 5".',
    explanationEn: 'Break statement example (Page 109): print executes before the if statement; when k reaches 5, break terminates the loop immediately, printing "0 1 2 3 4 5".'
  }
];
