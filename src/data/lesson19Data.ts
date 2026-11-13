import { TermDefinition } from './lessonData';
import { QuizQuestion } from './lesson2Data';

export const LESSON_19_GLOSSARY: TermDefinition[] = [
  {
    id: 't19-1',
    termVi: 'Biểu thức Boolean',
    termEn: 'Boolean Expression',
    ipa: '/ˈbuːliən ɪkˈsprɛʃən/',
    definitionVi: 'Biểu thức chỉ nhận một trong hai giá trị là True (đúng) hoặc False (sai). Biểu thức lôgic đơn giản nhất là các phép so sánh số hoặc xâu kí tự.',
    definitionEn: 'An expression that evaluates exclusively to either True or False, commonly constructed from relational comparisons and logical operators.',
    exampleVi: '100 % 4 == 0 cho kết quả True; a > 10 cho kết quả False khi a = 10.',
    exampleEn: '100 % 4 == 0 evaluates to True; a > 10 evaluates to False when a = 10.',
    sgkContext: 'SGK Tin học 10, Trang 101 – Mục 1: Biểu thức lôgic.'
  },
  {
    id: 't19-2',
    termVi: 'Toán tử quan hệ',
    termEn: 'Relational Operators',
    ipa: '/rɪˈleɪʃənəl ˈɑːpəreɪtərz/',
    definitionVi: 'Các phép so sánh trong Python gồm: < (nhỏ hơn), <= (nhỏ hơn hoặc bằng), > (lớn hơn), >= (lớn hơn hoặc bằng), == (bằng nhau), != (khác nhau).',
    definitionEn: 'Operators comparing operands: < (less than), <= (less than or equal), > (greater than), >= (greater than or equal), == (equal to), != (not equal to).',
    exampleVi: '111 // 5 != 20 cho kết quả True vì 22 != 20.',
    exampleEn: '111 // 5 != 20 yields True because 22 is not equal to 20.',
    sgkContext: 'SGK Tin học 10, Trang 101 – Bảng các phép so sánh giá trị số.'
  },
  {
    id: 't19-3',
    termVi: 'Phép toán and (Logical AND)',
    termEn: 'Logical AND Operator',
    ipa: '/ˈlɑːdʒɪkəl ænd/',
    definitionVi: 'Phép toán lôgic "và". Biểu thức X and Y chỉ nhận giá trị True khi cả X và Y cùng có giá trị True; nếu ít nhất một trong hai là False thì kết quả là False.',
    definitionEn: 'A logical operator returning True only if both operands are True; if either operand is False, it returns False.',
    exampleVi: 'x > 0 and x < 10 đúng khi x nằm trong khoảng (0; 10).',
    exampleEn: 'x > 0 and x < 10 is True when x falls inside (0; 10).',
    sgkContext: 'SGK Tin học 10, Trang 102 – Bảng phép toán and.'
  },
  {
    id: 't19-4',
    termVi: 'Phép toán or (Logical OR)',
    termEn: 'Logical OR Operator',
    ipa: '/ˈlɑːdʒɪkəl ɔːr/',
    definitionVi: 'Phép toán lôgic "hoặc". Biểu thức X or Y chỉ nhận giá trị False khi cả X và Y cùng False; chỉ cần một trong hai là True thì kết quả là True.',
    definitionEn: 'A logical operator returning False only if both operands are False; returns True if at least one operand is True.',
    exampleVi: 'y < 1 or y > 2 đúng khi y nằm ngoài đoạn [1; 2].',
    exampleEn: 'y < 1 or y > 2 evaluates to True when y lies outside [1; 2].',
    sgkContext: 'SGK Tin học 10, Trang 102 – Bảng phép toán or.'
  },
  {
    id: 't19-5',
    termVi: 'Phép toán not (Logical NOT)',
    termEn: 'Logical NOT Operator',
    ipa: '/ˈlɑːdʒɪkəl nɑːt/',
    definitionVi: 'Phép toán lôgic phủ định. Đảo ngược giá trị: not True thành False, not False thành True.',
    definitionEn: 'A unary logical operator that inverts truth values: not True becomes False, not False becomes True.',
    exampleVi: 'not (x > 10) tương đương với x <= 10.',
    exampleEn: 'not (x > 10) is logically equivalent to x <= 10.',
    sgkContext: 'SGK Tin học 10, Trang 102 – Bảng phép toán not.'
  },
  {
    id: 't19-6',
    termVi: 'Cấu trúc rẽ nhánh (Selection Structure)',
    termEn: 'Conditional Branching Structure',
    ipa: '/kənˈdɪʃənl ˈbræntʃɪŋ ˈstrʌktʃər/',
    definitionVi: 'Cấu trúc điều khiển chương trình cho phép lựa chọn thực hiện một hoặc nhiều khối lệnh khác nhau tùy thuộc vào điều kiện đúng hay sai.',
    definitionEn: 'A control flow structure allowing the execution of different code paths depending on whether a conditional expression evaluates to True or False.',
    exampleVi: 'Nếu trời mưa thì ở nhà học bài, ngược lại thì đi chơi.',
    exampleEn: 'If it rains then study at home, else hang out with friends.',
    sgkContext: 'SGK Tin học 10, Trang 101 – Khởi động & Hình 19.1.'
  },
  {
    id: 't19-7',
    termVi: 'Lệnh if dạng thiếu (One-way if Statement)',
    termEn: 'Single-alternative if Statement',
    ipa: '/ˈsɪŋɡəl ɔːlˈtɜːrnətɪv ɪf/',
    definitionVi: 'Cú pháp: if <điều kiện>: <khối lệnh>. Nếu điều kiện Đúng thì thực hiện khối lệnh; nếu Sai thì bỏ qua và chuyển sang lệnh tiếp theo.',
    definitionEn: 'A branch statement executing its block only when the condition evaluates to True, otherwise skipping directly to following code.',
    exampleVi: 'if k <= 0: print("Bạn nhập sai rồi!")',
    exampleEn: 'if k <= 0: print("Invalid positive input!")',
    sgkContext: 'SGK Tin học 10, Trang 102 – Mục 2: Câu lệnh rẽ nhánh dạng thiếu (Hình 19.2).'
  },
  {
    id: 't19-8',
    termVi: 'Lệnh if dạng đủ (Two-way if-else Statement)',
    termEn: 'Two-alternative if-else Statement',
    ipa: '/tuː ɔːlˈtɜːrnətɪv ɪf ɛls/',
    definitionVi: 'Cú pháp: if <điều kiện>: <khối lệnh 1> else: <khối lệnh 2>. Nếu điều kiện Đúng thì thực hiện khối lệnh 1; nếu Sai thì thực hiện khối lệnh 2.',
    definitionEn: 'A branching structure executing block 1 when True and block 2 when False.',
    exampleVi: 'if n % 2 == 0: print("Chẵn") else: print("Lẻ")',
    exampleEn: 'if n % 2 == 0: print("Even") else: print("Odd")',
    sgkContext: 'SGK Tin học 10, Trang 103 – Câu lệnh rẽ nhánh dạng đủ (Hình 19.3).'
  },
  {
    id: 't19-9',
    termVi: 'Quy tắc thụt lề (Indentation)',
    termEn: 'Python Indentation',
    ipa: '/ˌɪndenˈteɪʃən/',
    definitionVi: 'Đặc trưng cú pháp bắt buộc của Python: các khối lệnh con phải được viết lùi đầu dòng và thẳng hàng nhau sau dấu hai chấm (:), mặc định là 1 phím Tab hoặc 4 dấu cách.',
    definitionEn: 'A mandatory Python syntax rule where code blocks inside statements like if/else must be indented consistently (standard 4 spaces).',
    exampleVi: 'Sau if điều kiện: dòng lệnh tiếp theo phải thụt lề lùi vào 4 dấu cách.',
    exampleEn: 'After if condition: subsequent block lines must be indented by 4 spaces.',
    sgkContext: 'SGK Tin học 10, Trang 102–103 – Chú ý về dấu ":" và lùi vào thẳng hàng.'
  },
  {
    id: 't19-10',
    termVi: 'Thuật toán năm nhuận (Leap Year Algorithm)',
    termEn: 'Leap Year Algorithm',
    ipa: '/liːp jɪər ˈælɡərɪðəm/',
    definitionVi: 'Quy tắc lịch Gregory: năm n là năm nhuận nếu n chia hết cho 400 hoặc (n chia hết cho 4 đồng thời không chia hết cho 100): n % 400 == 0 or (n % 4 == 0 and n % 100 != 0).',
    definitionEn: 'The astronomical rule: year n is a leap year if divisible by 400, or divisible by 4 while not divisible by 100.',
    exampleVi: 'Năm 2000 là năm nhuận (chia hết cho 400); Năm 1900 không nhuận (chia hết 100 nhưng không chia hết 400); Năm 2024 là năm nhuận (chia hết cho 4 và không chia hết 100).',
    exampleEn: 'Year 2000 is leap; 1900 is not leap; 2024 is leap.',
    sgkContext: 'SGK Tin học 10, Trang 104 – Vận dụng Bài 2.'
  }
];

export const LESSON_19_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: 'Trong Python, biểu thức lôgic là biểu thức chỉ có thể nhận những giá trị nào?',
    questionEn: 'In Python, what values can a boolean/logical expression evaluate to?',
    optionsVi: [
      'Chỉ nhận một trong hai giá trị là True (đúng) hoặc False (sai)',
      'Nhận giá trị 1 hoặc 0 dưới dạng số nguyên',
      'Nhận bất kỳ giá trị số thực nào lớn hơn 0',
      'Nhận chuỗi kí tự "ĐÚNG" hoặc "SAI"'
    ],
    optionsEn: [
      'Exclusively either True or False',
      'Integer 1 or 0',
      'Any float greater than 0',
      'String "TRUE" or "FALSE"'
    ],
    correctIndex: 0,
    explanationVi: 'Theo SGK Tin học 10 Trang 101 (Mục 1): Trong Python, biểu thức lôgic là biểu thức chỉ nhận giá trị True (đúng) hoặc False (sai). Các giá trị này thuộc kiểu dữ liệu bool.',
    explanationEn: 'According to page 101: Boolean expressions evaluate exclusively to True or False, belonging to the bool type.'
  },
  {
    id: 2,
    questionVi: 'Toán tử nào sau đây dùng để so sánh "bằng nhau" trong Python?',
    questionEn: 'Which operator is used to test equality in Python?',
    optionsVi: [
      '== (hai dấu bằng liên tiếp)',
      '= (một dấu bằng)',
      ':= (dấu hai chấm kèm dấu bằng)',
      'equal'
    ],
    optionsEn: [
      '== (two consecutive equal signs)',
      '= (single equal sign)',
      ':= (walrus operator)',
      'equal'
    ],
    correctIndex: 0,
    explanationVi: 'Theo SGK Trang 101 (Bảng các phép so sánh): Phép so sánh bằng nhau trong Python ký hiệu là ==. Dấu = là lệnh gán giá trị chứ không phải phép so sánh.',
    explanationEn: 'According to page 101: The equality comparison operator is ==. A single = represents assignment.'
  },
  {
    id: 3,
    questionVi: 'Biểu thức lôgic: 100 % 4 == 0 trong Python cho kết quả là gì?',
    questionEn: 'What is the evaluated result of 100 % 4 == 0 in Python?',
    optionsVi: [
      'True (vì 100 chia hết cho 4, số dư là 0, 0 == 0 là Đúng)',
      'False (vì 100 chia 4 được 25)',
      '25',
      '0'
    ],
    optionsEn: [
      'True (since 100 mod 4 is 0, and 0 == 0 is True)',
      'False (since 100 divided by 4 is 25)',
      '25',
      '0'
    ],
    correctIndex: 0,
    explanationVi: 'Theo câu hỏi kiểm tra SGK Trang 102: Phép lấy số dư 100 % 4 bằng 0. Phép so sánh 0 == 0 là Đúng nên biểu thức trả về True.',
    explanationEn: '100 % 4 yields 0. Then 0 == 0 evaluates to True.'
  },
  {
    id: 4,
    questionVi: 'Biểu thức: 111 // 5 != 20 or 20 % 3 != 0 có giá trị là gì?',
    questionEn: 'What is the evaluated value of 111 // 5 != 20 or 20 % 3 != 0?',
    optionsVi: [
      'True',
      'False',
      'Lỗi cú pháp',
      '22'
    ],
    optionsEn: [
      'True',
      'False',
      'SyntaxError',
      '22'
    ],
    correctIndex: 0,
    explanationVi: 'Theo câu hỏi kiểm tra SGK Trang 102: 111 // 5 = 22, 22 != 20 là True. Vì mệnh đề bên trái phép "or" đã là True, toàn bộ biểu thức nhận giá trị True.',
    explanationEn: '111 // 5 = 22, and 22 != 20 is True. In an "or" operation, if the first operand is True, the result is True.'
  },
  {
    id: 5,
    questionVi: 'Khi thực hiện câu lệnh rẽ nhánh dạng thiếu: if <điều kiện>: <khối lệnh>, nếu <điều kiện> có giá trị False thì chương trình sẽ làm gì?',
    questionEn: 'In a single-alternative if statement (if <cond>: <block>), what happens if <cond> evaluates to False?',
    optionsVi: [
      'Bỏ qua <khối lệnh> và chuyển sang thực hiện câu lệnh tiếp theo sau lệnh if',
      'Báo lỗi dừng chương trình',
      'Tự động lặp lại việc kiểm tra điều kiện',
      'Thực hiện khối lệnh một lần rồi dừng'
    ],
    optionsEn: [
      'Skips the <block> and proceeds to the next statement after if',
      'Raises a fatal runtime error',
      'Automatically repeats the check',
      'Executes the block once then stops'
    ],
    correctIndex: 0,
    explanationVi: 'Theo SGK Trang 102–103 (Hình 19.2): Python sẽ kiểm tra <điều kiện>, nếu đúng thì thực hiện <khối lệnh>, ngược lại (sai) thì bỏ qua chuyển sang lệnh tiếp theo sau lệnh if.',
    explanationEn: 'According to page 102-103: When the condition is False, the block is bypassed and execution continues with the subsequent statement.'
  },
  {
    id: 6,
    questionVi: 'Điểm khác biệt quan trọng về mặt cú pháp của các khối lệnh trong Python (như trong lệnh if, else) so với nhiều ngôn ngữ khác là gì?',
    questionEn: 'What is a critical syntax distinction of code blocks in Python (such as in if/else) compared to many other languages?',
    optionsVi: [
      'Các khối lệnh đều cần viết sau dấu hai chấm ":" và phải lùi vào, thẳng hàng (thụt lề Indentation)',
      'Phải đặt trong cặp dấu ngoặc nhọn { } như ngôn ngữ C/C++',
      'Phải kết thúc bằng từ khóa end if',
      'Phải có dấu chấm phẩy ; ở cuối mỗi dòng lệnh'
    ],
    optionsEn: [
      'Code blocks must be written after a colon ":" and indented consistently (Indentation)',
      'Must be enclosed in curly braces { } as in C/C++',
      'Must end with an "end if" keyword',
      'Must terminate with semicolons ;'
    ],
    correctIndex: 0,
    explanationVi: 'Theo SGK Trang 103 (Chú ý & Hộp Ghi nhớ 2): "Các khối lệnh trong Python đều cần viết sau dấu \":\" và lùi vào, thẳng hàng. Đây là điểm khác biệt của Python với các ngôn ngữ lập trình khác."',
    explanationEn: 'According to page 103: Python uses colons and mandatory indentation instead of curly braces or end markers.'
  },
  {
    id: 7,
    questionVi: 'Đoạn chương trình sau thực hiện công việc gì?\nk = int(input("Nhập một số nguyên dương: "))\nif k <= 0:\n    print("Bạn nhập sai rồi!")',
    questionEn: 'What does this code snippet accomplish?\nk = int(input("Enter a positive integer: "))\nif k <= 0:\n    print("Invalid input!")',
    optionsVi: [
      'Kiểm tra tính hợp lệ của số nguyên dương k: nếu k <= 0 thì thông báo người dùng đã nhập sai',
      'Tính tổng các số nguyên dương từ 1 đến k',
      'In ra các số nguyên âm nhỏ hơn 0',
      'Đổi số k thành số nguyên dương đối xứng'
    ],
    optionsEn: [
      'Validates that input k is a positive integer: if k <= 0, alerts the user that input is invalid',
      'Computes the sum of integers up to k',
      'Prints negative integers less than 0',
      'Converts k into an absolute positive value'
    ],
    correctIndex: 0,
    explanationVi: 'Theo SGK Trang 103 (Câu hỏi củng cố): Chương trình yêu cầu nhập số nguyên dương (k > 0). Lệnh if kiểm tra nếu k <= 0 (nhập sai quy định) thì thông báo nhắc nhở "Bạn nhập sai rồi!".',
    explanationEn: 'The prompt requires a positive integer (k > 0). The condition if k <= 0 detects non-positive inputs and displays a warning.'
  },
  {
    id: 8,
    questionVi: 'Để diễn đạt bằng biểu thức lôgic trong Python: "Số x nằm trong khoảng (0; 10)" (Luyện tập 1a trang 104), cách viết nào đúng?',
    questionEn: 'How to express "Number x lies in interval (0; 10)" as a Python boolean expression (Practice 1a page 104)?',
    optionsVi: [
      'x > 0 and x < 10 (hoặc 0 < x < 10)',
      'x > 0 or x < 10',
      'x >= 0 and x <= 10',
      '0 <= x <= 10'
    ],
    optionsEn: [
      'x > 0 and x < 10 (or 0 < x < 10)',
      'x > 0 or x < 10',
      'x >= 0 and x <= 10',
      '0 <= x <= 10'
    ],
    correctIndex: 0,
    explanationVi: 'Theo Luyện tập 1a SGK Trang 104: Khoảng (0; 10) là tập hợp các số lớn hơn 0 và nhỏ hơn 10 (không lấy 2 đầu mút), do đó viết là: x > 0 and x < 10 (hoặc cú pháp ghép 0 < x < 10 trong Python).',
    explanationEn: 'Open interval (0; 10) excludes endpoints: x > 0 and x < 10.'
  },
  {
    id: 9,
    questionVi: 'Để diễn đạt bằng biểu thức lôgic: "Số y nằm ngoài đoạn [1; 2]" (Luyện tập 1b trang 104), cách viết nào đúng?',
    questionEn: 'How to express "Number y lies outside the closed segment [1; 2]" in Python (Practice 1b page 104)?',
    optionsVi: [
      'y < 1 or y > 2',
      'y <= 1 and y >= 2',
      '1 < y < 2',
      'y < 1 and y > 2'
    ],
    optionsEn: [
      'y < 1 or y > 2',
      'y <= 1 and y >= 2',
      '1 < y < 2',
      'y < 1 and y > 2'
    ],
    correctIndex: 0,
    explanationVi: 'Theo Luyện tập 1b SGK Trang 104: Nằm ngoài đoạn [1; 2] nghĩa là nhỏ hơn 1 HOẶC lớn hơn 2: y < 1 or y > 2. (Không thể dùng and vì một số không thể vừa nhỏ hơn 1 vừa lớn hơn 2).',
    explanationEn: 'Outside [1; 2] means strictly less than 1 OR strictly greater than 2: y < 1 or y > 2.'
  },
  {
    id: 10,
    questionVi: 'Theo quy tắc lịch thiên văn (Bài 2 Vận dụng trang 104), biểu thức điều kiện để kiểm tra năm n có phải năm nhuận hay không trong Python là gì?',
    questionEn: 'According to astronomical calendar rules (Application 2 page 104), what is the Python condition to test if year n is a leap year?',
    optionsVi: [
      'n % 400 == 0 or (n % 4 == 0 and n % 100 != 0)',
      'n % 4 == 0 and n % 100 == 0',
      'n % 4 == 0 or n % 100 == 0',
      'n % 400 == 0 and n % 4 == 0'
    ],
    optionsEn: [
      'n % 400 == 0 or (n % 4 == 0 and n % 100 != 0)',
      'n % 4 == 0 and n % 100 == 0',
      'n % 4 == 0 or n % 100 == 0',
      'n % 400 == 0 and n % 4 == 0'
    ],
    correctIndex: 0,
    explanationVi: 'Theo SGK Trang 104 (Vận dụng 2): "Năm n là năm nhuận nếu giá trị n thoả mãn điều kiện: n chia hết cho 400 hoặc n chia hết cho 4 đồng thời không chia hết cho 100". Biểu thức Python tương ứng: n % 400 == 0 or (n % 4 == 0 and n % 100 != 0).',
    explanationEn: 'A leap year is divisible by 400 OR (divisible by 4 AND not divisible by 100): n % 400 == 0 or (n % 4 == 0 and n % 100 != 0).'
  }
];
