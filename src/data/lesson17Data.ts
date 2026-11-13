import { TermDefinition } from './lessonData';
import { QuizQuestion } from './lesson2Data';

export const LESSON_17_GLOSSARY: TermDefinition[] = [
  {
    id: 't17-1',
    termVi: 'Biến (Variable)',
    termEn: 'Variable',
    ipa: '/ˈvɛəriəbəl/',
    definitionVi: 'Tên định danh của một vùng nhớ trong máy tính dùng để lưu trữ dữ liệu (giá trị), và giá trị đó có thể thay đổi linh hoạt trong quá trình thực hiện chương trình.',
    definitionEn: 'A named storage location in computer memory that holds data values which can be modified during program execution.',
    exampleVi: 'Lệnh gán n = 5 tạo ra biến n có kiểu số nguyên và lưu trữ giá trị 5.',
    exampleEn: 'The assignment statement n = 5 creates an integer variable n holding the value 5.',
    sgkContext: 'SGK Tin học 10, Trang 91 – Khái niệm biến và lệnh gán.'
  },
  {
    id: 't17-2',
    termVi: 'Lệnh gán (Assignment Statement)',
    termEn: 'Assignment Statement',
    ipa: '/əˈsaɪnmənt ˈsteɪtmənt/',
    definitionVi: 'Câu lệnh dùng toán tử dấu bằng (=) để tính toán giá trị của biểu thức bên phải rồi nạp vào biến ở bên trái dấu bằng. Cú pháp: <biến> = <biểu thức>.',
    definitionEn: 'A statement using the equal sign (=) operator that evaluates the right-hand expression and assigns the resulting value to the variable on the left.',
    exampleVi: 'x = y + 1 tính giá trị y + 1 rồi gán kết quả vào biến x.',
    exampleEn: 'x = y + 1 evaluates y + 1 and stores the result in variable x.',
    sgkContext: 'SGK Tin học 10, Trang 91–92 – Cú pháp lệnh gán.'
  },
  {
    id: 't17-3',
    termVi: 'Gán đồng thời (Multiple Assignment)',
    termEn: 'Multiple / Simultaneous Assignment',
    ipa: '/ˈmʌltɪpəl əˈsaɪnmənt/',
    definitionVi: 'Cú pháp cho phép gán nhiều giá trị cho nhiều biến cùng một lúc trên một dòng lệnh, các phần tử cách nhau bằng dấu phẩy: <var1>, <var2> = <gt1>, <gt2>.',
    definitionEn: 'A Python syntax allowing multiple variables to be assigned their corresponding values concurrently on a single line separated by commas.',
    exampleVi: 'x, y = y, x giúp tráo đổi giá trị của hai biến x và y tức thì mà không cần dùng thêm biến phụ.',
    exampleEn: 'x, y = y, x swaps the values of x and y instantaneously without requiring an auxiliary temporary variable.',
    sgkContext: 'SGK Tin học 10, Trang 92 & 96 – Cú pháp gán đồng thời và Vận dụng 2.'
  },
  {
    id: 't17-4',
    termVi: 'Quy tắc đặt tên biến (Identifier Naming Rules)',
    termEn: 'Variable Naming Rules',
    ipa: '/ˈvɛəriəbəl ˈneɪmɪŋ ruːlz/',
    definitionVi: 'Quy tắc bắt buộc khi đặt tên định danh trong Python: chỉ gồm chữ cái, chữ số (0-9) và dấu gạch dưới (_); không bắt đầu bằng chữ số; phân biệt chữ hoa và chữ thường; không trùng từ khóa.',
    definitionEn: 'Strict syntax rules for identifiers: only alphanumeric characters and underscores; cannot start with a digit; case-sensitive; cannot be a reserved keyword.',
    exampleVi: '_name, diem_toan, x1 là tên hợp lệ; 12abc, my name, if là tên không hợp lệ.',
    exampleEn: '_name, math_score, x1 are valid names; 12abc, my name, if are invalid identifiers.',
    sgkContext: 'SGK Tin học 10, Trang 93 – Hộp Ghi nhớ Mục 1.'
  },
  {
    id: 't17-5',
    termVi: 'Từ khoá (Keyword)',
    termEn: 'Reserved Keyword',
    ipa: '/rɪˈzɜːrvd ˈkiːwɜːrd/',
    definitionVi: 'Tập hợp các từ đặc biệt được dành riêng để xây dựng cấu trúc cú pháp của ngôn ngữ lập trình Python (như if, for, while, def, class, return), người dùng tuyệt đối không được dùng làm tên biến.',
    definitionEn: 'Special reserved words predefined by the language syntax to define code structures, which cannot be used as ordinary variable names.',
    exampleVi: 'Cố tình gán if = 12 sẽ lập tức gây ra lỗi SyntaxError: invalid syntax.',
    exampleEn: 'Attempting to assign if = 12 immediately raises a SyntaxError: invalid syntax.',
    sgkContext: 'SGK Tin học 10, Trang 95 – Mục 3 Từ khoá.'
  },
  {
    id: 't17-6',
    termVi: 'Phép chia lấy phần nguyên (Floor Division //)',
    termEn: 'Floor Division Operator (//)',
    ipa: '/flɔːr dɪˈvɪʒən/',
    definitionVi: 'Toán tử chia lấy phần nguyên của phép chia số, làm tròn xuống số nguyên gần nhất nhỏ hơn hoặc bằng kết quả thực tế.',
    definitionEn: 'An arithmetic operator (//) that divides operands and truncates decimal fractions, returning the largest integer less than or equal to the quotient.',
    exampleVi: '10 // 3 cho kết quả là 3; 30 // 12 cho kết quả là 2.',
    exampleEn: '10 // 3 yields 3; 30 // 12 yields 2.',
    sgkContext: 'SGK Tin học 10, Trang 93 – Ví dụ 1 phép chia nguyên.'
  },
  {
    id: 't17-7',
    termVi: 'Phép chia lấy phần dư (Modulus Operator %)',
    termEn: 'Modulus Operator (%)',
    ipa: '/ˈmɑːdʒələs ˈɑːpəreɪtər/',
    definitionVi: 'Toán tử tìm số dư còn lại sau phép chia số nguyên: a % b trả về phần dư của phép chia a cho b.',
    definitionEn: 'An arithmetic operator (%) that yields the remainder after integer division of the left operand by the right operand.',
    exampleVi: '10 % 3 cho kết quả là 1; công thức kiểm tra số chẵn n % 2 == 0.',
    exampleEn: '10 % 3 produces 1; used to test evenness via n % 2 == 0.',
    sgkContext: 'SGK Tin học 10, Trang 93 – Ví dụ 1 phép lấy số dư.'
  },
  {
    id: 't17-8',
    termVi: 'Toán tử lũy thừa (Exponentiation **)',
    termEn: 'Exponentiation Operator (**)',
    ipa: '/ˌɛkspoʊnɛnʃiˈeɪʃən/',
    definitionVi: 'Toán tử nâng một số lên lũy thừa mũ: a ** b tương đương a^b. Có độ ưu tiên cao nhất trong các phép toán số học và tính toán theo thứ tự từ PHẢI SANG TRÁI.',
    definitionEn: 'The exponentiation operator (**) raising base to power; has highest arithmetic precedence and evaluates right-to-left.',
    exampleVi: '4**2**3 được tính là 4**(2**3) = 4**8 = 65536.',
    exampleEn: '4**2**3 evaluates right-to-left as 4**(2**3) = 4**8 = 65536.',
    sgkContext: 'SGK Tin học 10, Trang 93–94 – Thứ tự ưu tiên lũy thừa.'
  },
  {
    id: 't17-9',
    termVi: 'Nối xâu và Lặp xâu (String Concatenation & Replication)',
    termEn: 'String Concatenation and Replication',
    ipa: '/kənˌkætəˈneɪʃən & ˌrɛplɪˈkeɪʃən/',
    definitionVi: 'Hai phép toán thao tác trên xâu kí tự: toán tử + ghép nối hai xâu thành một; toán tử * nhân xâu với số nguyên n để lặp lại xâu đó n lần.',
    definitionEn: 'String operations where + concatenates two strings end-to-end, and * replicates a string n times consecutively.',
    exampleVi: '"Hà Nội" + "Việt Nam" cho "Hà NộiViệt Nam"; "123"*3 cho "123123123".',
    exampleEn: '"Hello" + "World" gives "HelloWorld"; "abc"*3 produces "abcabcabc".',
    sgkContext: 'SGK Tin học 10, Trang 94 – Ví dụ 2 phép toán trên xâu.'
  },
  {
    id: 't17-10',
    termVi: 'Phân biệt chữ hoa chữ thường (Case Sensitivity)',
    termEn: 'Case Sensitivity',
    ipa: '/keɪs ˌsɛnsəˈtɪvəti/',
    definitionVi: 'Đặc tính của ngôn ngữ lập trình Python coi các chữ cái viết hoa và viết thường là hoàn toàn khác biệt nhau.',
    definitionEn: 'The property of treating uppercase and lowercase letters as distinctly unique identifiers.',
    exampleVi: 'Bien, bien, BIEN là 3 biến khác nhau; True là từ khóa boolean nhưng true là tên biến hợp lệ.',
    exampleEn: 'Variables count, Count, and COUNT are three distinct variables in memory.',
    sgkContext: 'SGK Tin học 10, Trang 93 & 95 – Quy tắc tên biến và phân biệt từ khóa.'
  }
];

export const LESSON_17_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: 'Trong ngôn ngữ lập trình Python, "biến" (variable) được hiểu là gì?',
    questionEn: 'In Python programming, what is a "variable"?',
    optionsVi: [
      'Một hằng số toán học không bao giờ thay đổi giá trị trong suốt chương trình',
      'Tên (định danh) của một vùng nhớ dùng để lưu trữ giá trị và giá trị đó có thể thay đổi khi thực hiện chương trình',
      'Một câu lệnh dùng để in dữ liệu ra máy in văn phòng',
      'Một tệp tin văn bản chứa mã nguồn có đuôi mở rộng là .exe'
    ],
    optionsEn: [
      'A mathematical constant whose value never alters throughout the entire program',
      'A named identifier for a memory location storing data that can change during execution',
      'A hardware command routing text output directly to an office printer',
      'An executable program file ending with an .exe extension'
    ],
    correctIndex: 1,
    explanationVi: 'Theo SGK trang 91, Biến là tên (định danh) của một vùng nhớ dùng để lưu trữ giá trị (dữ liệu) và giá trị đó có thể được thay đổi khi thực hiện chương trình.',
    explanationEn: 'According to page 91, a variable is the identifier for a memory storage location holding data that may be updated during runtime.'
  },
  {
    id: 2,
    questionVi: 'Cú pháp chuẩn của một câu lệnh gán giá trị cho biến trong Python là gì?',
    questionEn: 'What is the correct syntax of a variable assignment statement in Python?',
    optionsVi: [
      '<giá trị> = <biến>',
      '<biến> == <biểu thức>',
      '<biến> = <biểu thức>',
      '<biến> := <giá trị>'
    ],
    optionsEn: [
      '<value> = <variable>',
      '<variable> == <expression>',
      '<variable> = <expression>',
      '<variable> := <value>'
    ],
    correctIndex: 2,
    explanationVi: 'SGK trang 91–92 ghi rõ cú pháp lệnh gán: <biến> = <biểu thức>. Khi thực hiện, Python tính giá trị biểu thức bên phải rồi gán kết quả cho biến bên trái.',
    explanationEn: 'Textbook page 91–92 states the general assignment syntax: <variable> = <expression>.'
  },
  {
    id: 3,
    questionVi: 'Tên biến nào sau đây là HỢP LỆ theo quy tắc đặt tên của Python?',
    questionEn: 'Which of the following variable names is VALID under Python identifier rules?',
    optionsVi: [
      '12abc (bắt đầu bằng chữ số)',
      'My country (chứa dấu khoảng trắng)',
      '_name (bắt đầu bằng dấu gạch dưới)',
      'm123&b (chứa ký tự đặc biệt &)'
    ],
    optionsEn: [
      '12abc (starts with a digit)',
      'My country (contains whitespace)',
      '_name (starts with an underscore)',
      'm123&b (contains special character &)'
    ],
    correctIndex: 2,
    explanationVi: 'Quy tắc đặt tên biến (SGK trang 93): Chỉ gồm chữ cái, chữ số (0-9) và dấu gạch dưới (_); không bắt đầu bằng chữ số. Do đó `_name` là tên biến hợp lệ.',
    explanationEn: 'Identifiers may only contain letters, numbers, and underscores, and must not begin with a digit. Therefore, `_name` is valid.'
  },
  {
    id: 4,
    questionVi: 'Sau khi thực hiện hai lệnh sau trong Python: `x = 10` và `y = x**2 - 1`, sau đó `x = x/2 + y`, giá trị cuối cùng của biến x là bao nhiêu?',
    questionEn: 'After executing `x = 10`, `y = x**2 - 1`, and then `x = x/2 + y`, what is the final value of variable x?',
    optionsVi: [
      '99',
      '104',
      '104.0 (kiểu số thực float)',
      '54.5'
    ],
    optionsEn: [
      '99',
      '104',
      '104.0 (float type)',
      '54.5'
    ],
    correctIndex: 2,
    explanationVi: 'x = 10; y = 10**2 - 1 = 99. Tiếp theo x/2 = 10/2 = 5.0 (phép chia / luôn sinh số thực), do đó x = 5.0 + 99 = 104.0 (SGK trang 93 - Câu hỏi củng cố 2).',
    explanationEn: 'x=10; y=99. 10/2 evaluates to 5.0 (float division). 5.0 + 99 yields 104.0.'
  },
  {
    id: 5,
    questionVi: 'Trong Python, biểu thức lũy thừa kép `4**2**3` được tính toán theo thứ tự nào và cho kết quả là bao nhiêu?',
    questionEn: 'In Python, in what associativity order is `4**2**3` evaluated, and what is its result?',
    optionsVi: [
      'Tính từ trái sang phải: (4**2)**3 = 16**3 = 4096',
      'Tính từ phải sang trái: 4**(2**3) = 4**8 = 65536',
      'Báo lỗi cú pháp vì không được viết hai dấu lũy thừa liền nhau',
      'Tính ngẫu nhiên tùy thuộc vào hệ điều hành'
    ],
    optionsEn: [
      'Left-to-right: (4**2)**3 = 16**3 = 4096',
      'Right-to-left: 4**(2**3) = 4**8 = 65536',
      'SyntaxError because double exponents are prohibited',
      'Random order depending on underlying CPU architecture'
    ],
    correctIndex: 1,
    explanationVi: 'SGK trang 93 ghi rõ: Tất cả các phép toán đều thực hiện từ trái sang phải, riêng phép luỹ thừa (**) thì thực hiện từ PHẢI SANG TRÁI. 4**2**3 = 4**(2**3) = 4**8 = 65536.',
    explanationEn: 'Exponentiation in Python is right-associative: 4**2**3 evaluates as 4**(2**3) = 4**8 = 65536.'
  },
  {
    id: 6,
    questionVi: 'Kết quả của hai phép toán số học `10 // 3` và `10 % 3` trong Python lần lượt là:',
    questionEn: 'What are the respective results of `10 // 3` and `10 % 3` in Python?',
    optionsVi: [
      '3.333 và 1',
      '3 và 1',
      '1 và 3',
      '3 và 0'
    ],
    optionsEn: [
      '3.333 and 1',
      '3 and 1',
      '1 and 3',
      '3 and 0'
    ],
    correctIndex: 1,
    explanationVi: 'Toán tử `//` chia lấy phần nguyên (10 // 3 = 3), còn `%` lấy số dư (10 % 3 = 1). (SGK trang 93 - Ví dụ 1).',
    explanationEn: 'The floor division `//` operator gives 3, while the modulus `%` operator gives remainder 1.'
  },
  {
    id: 7,
    questionVi: 'Kết quả của biểu thức xâu kí tự `""*20 + "010"` và `"10" + "0"*5` lần lượt là:',
    questionEn: 'What are the evaluations of string expressions `""*20 + "010"` and `"10" + "0"*5`?',
    optionsVi: [
      '"010" và "100000"',
      '"" và "50"',
      '"20010" và "100000"',
      'Báo lỗi TypeError'
    ],
    optionsEn: [
      '"010" and "100000"',
      '"" and "50"',
      '"20010" and "100000"',
      'TypeError exception'
    ],
    correctIndex: 0,
    explanationVi: 'Xâu rỗng nhân 20 vẫn là xâu rỗng, nối với "010" cho kết quả "010". Còn "0"*5 cho "00000", nối sau "10" cho "100000" (SGK trang 94 - Câu hỏi 2).',
    explanationEn: 'Empty string multiplied by 20 remains empty, concatenated with "010" gives "010". "10" + "00000" gives "100000".'
  },
  {
    id: 8,
    questionVi: 'Từ nào sau đây KHÔNG THỂ sử dụng làm tên biến vì trùng với từ khoá (keyword) của Python?',
    questionEn: 'Which of the following words CANNOT be used as a variable name because it is a reserved Python keyword?',
    optionsVi: [
      '_if',
      'nolocal',
      'global',
      'true'
    ],
    optionsEn: [
      '_if',
      'nolocal',
      'global',
      'true'
    ],
    correctIndex: 2,
    explanationVi: '`global` là từ khoá chuẩn trong Python 3 (SGK trang 95). `_if` có dấu gạch dưới nên hợp lệ; `nolocal` viết sai từ khóa nonlocal nên là tên thường hợp lệ; `true` viết chữ thường (từ khóa là `True` viết hoa) nên hợp lệ.',
    explanationEn: '`global` is a reserved Python keyword. `_if`, `nolocal`, and lowercase `true` are valid identifiers.'
  },
  {
    id: 9,
    questionVi: 'Sau khi chạy đoạn lệnh gán đồng thời: `a, b = 2, 3` và `a, b = a + b, a - b`, giá trị của a và b lần lượt là:',
    questionEn: 'After running the simultaneous assignment `a, b = 2, 3` followed by `a, b = a + b, a - b`, what are the values of a and b?',
    optionsVi: [
      'a = 5 và b = 1',
      'a = 5 và b = -1',
      'a = 2 và b = 3',
      'a = 6 và b = -1'
    ],
    optionsEn: [
      'a = 5 and b = 1',
      'a = 5 and b = -1',
      'a = 2 and b = 3',
      'a = 6 and b = -1'
    ],
    correctIndex: 1,
    explanationVi: 'Trong phép gán đồng thời, vế phải được tính toán trước: a+b = 2+3 = 5, a-b = 2-3 = -1. Sau đó gán vào a và b, ta được a = 5, b = -1 (SGK trang 93 - Câu hỏi 3).',
    explanationEn: 'Right-hand side evaluates first using initial values: a+b=5, a-b=-1. Then assigned simultaneously to a and b.'
  },
  {
    id: 10,
    questionVi: 'Cách nào sau đây tráo đổi (hoán vị) giá trị của hai biến x và y một cách ngắn gọn, chuẩn Python nhất?',
    questionEn: 'Which statement concisely and idiomaticly swaps the values of two variables x and y in Python?',
    optionsVi: [
      'x = y; y = x',
      'x, y = y, x',
      'temp = x; x = y; y = temp',
      'swap(x, y)'
    ],
    optionsEn: [
      'x = y; y = x',
      'x, y = y, x',
      'temp = x; x = y; y = temp',
      'swap(x, y)'
    ],
    correctIndex: 1,
    explanationVi: 'Cú pháp gán đồng thời `x, y = y, x` cho phép tráo đổi trực tiếp giá trị của hai biến trong Python mà không cần dùng biến phụ temp (SGK trang 96 - Vận dụng 2).',
    explanationEn: 'The tuple unpacking syntax `x, y = y, x` elegantly swaps variables in one line without temporary storage.'
  }
];
