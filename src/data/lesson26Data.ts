import { QuizQuestion } from './lesson2Data';
import { TermDefinition } from './lessonData';

export const LESSON_26_GLOSSARY: TermDefinition[] = [
  {
    id: 't26-1',
    termVi: 'Chương trình con (Subroutine / Function)',
    termEn: 'Subroutine / Function',
    ipa: '/ˈsʌb.ruːˌtiːn/',
    definitionVi: 'Khối lệnh thực hiện một thao tác độc lập được đặt tên để có thể gọi thực hiện nhiều lần ở những vị trí khác nhau trong chương trình mà không cần viết lại.',
    definitionEn: 'A named sequence of code instructions that performs a specific task, packaged as a unit to be called repeatedly from various program locations.',
    exampleVi: 'def meeting(): ...',
    exampleEn: 'def greet(): ...',
    sgkContext: 'SGK Tin học 10 Kết nối tri thức - Trang 127: "Người ta thường gom các khối lệnh như vậy thành những chương trình con... Trong Python, các hàm chính là các chương trình con."'
  },
  {
    id: 't26-2',
    termVi: 'Hàm thiết kế sẵn (Built-in Function)',
    termEn: 'Built-in Function',
    ipa: '/ˌbɪlt.ɪn ˈfʌŋk.ʃən/',
    definitionVi: 'Các hàm được Python định nghĩa và tích hợp sẵn trong nhân ngôn ngữ, người dùng có thể gọi trực tiếp bất cứ lúc nào mà không cần tự viết.',
    definitionEn: 'Functions that are built into Python and always available for use without needing definition or external imports.',
    exampleVi: 'print(), len(), int(), float(), str(), abs(), range()',
    exampleEn: 'len(), print(), abs(), round()',
    sgkContext: 'SGK Trang 127 & 128 (Bảng 26.1): "Các lệnh trong Bảng 26.1 chính là các chương trình con được thiết kế sẵn của Python, cho phép người dùng tuỳ ý sử dụng."'
  },
  {
    id: 't26-3',
    termVi: 'Hàm tự định nghĩa (User-defined Function)',
    termEn: 'User-defined Function',
    ipa: '/ˈjuː.zər dɪˈfaɪnd ˈfʌŋk.ʃən/',
    definitionVi: 'Hàm do người lập trình tự tạo ra bằng từ khóa def để giải quyết những yêu cầu xử lý riêng của bài toán.',
    definitionEn: 'A function defined by the programmer using the def keyword to perform customized logic.',
    exampleVi: 'def inc(n): return n + 1',
    exampleEn: 'def add(a, b): return a + b',
    sgkContext: 'SGK Trang 128: "Ngoài các hàm thiết kế sẵn, Python còn cho phép người dùng tự thiết lập các hàm của riêng mình (còn gọi là các hàm tự định nghĩa)."'
  },
  {
    id: 't26-4',
    termVi: 'Từ khoá def',
    termEn: 'def keyword',
    ipa: '/dɛf/',
    definitionVi: 'Từ khóa bắt buộc trong Python dùng để bắt đầu khai báo định nghĩa một hàm mới, theo sau là tên hàm, cặp ngoặc chứa tham số và dấu hai chấm (:).',
    definitionEn: 'The Python keyword used to declare a function, followed by the function name, parameter list in parentheses, and a colon (:).',
    exampleVi: 'def prime(n):',
    exampleEn: 'def square(x):',
    sgkContext: 'SGK Trang 128: "Hàm trong Python được định nghĩa bằng từ khoá def, theo sau là tên hàm (tên hàm sẽ theo quy tắc đặt tên định danh)."'
  },
  {
    id: 't26-5',
    termVi: 'Tham số của hàm (Parameter)',
    termEn: 'Function Parameter',
    ipa: '/pəˈræm.ɪ.tər/',
    definitionVi: 'Các biến được khai báo bên trong cặp dấu ngoặc đơn của định nghĩa hàm, nhận dữ liệu truyền vào khi hàm được gọi để thực hiện tính toán.',
    definitionEn: 'Variables listed inside the parentheses in a function definition, which receive input values when the function is invoked.',
    exampleVi: 'Trong def inc(n): thì n là tham số.',
    exampleEn: 'In def inc(n):, n is the parameter.',
    sgkContext: 'SGK Trang 128: "xâu kí tự bên trong ngoặc của các hàm int() và print() là tham số của hàm. Cú pháp: <tên hàm>(<danh sách tham số hàm>)"'
  },
  {
    id: 't26-6',
    termVi: 'Từ khoá return',
    termEn: 'return statement',
    ipa: '/rɪˈtɜːrn/',
    definitionVi: 'Lệnh kết thúc ngay lập tức việc thực thi hàm và trả kết quả tính toán về nơi gọi hàm (hoặc trả về None nếu không có giá trị đi kèm).',
    definitionEn: 'A statement that exits a function immediately and optionally sends a value back to the caller.',
    exampleVi: 'return n + 1, return True, return',
    exampleEn: 'return x * 2',
    sgkContext: 'SGK Trang 129: "Cần có lệnh return <giá trị>. Hàm sẽ kết thúc khi gặp lệnh return và trả lại <giá trị>."'
  },
  {
    id: 't26-7',
    termVi: 'Hàm có trả lại giá trị',
    termEn: 'Function with Return Value',
    ipa: '/ˈfʌŋk.ʃən wɪð rɪˈtɜːrn ˈvæl.juː/',
    definitionVi: 'Hàm sử dụng lệnh return <giá trị> để gửi kết quả về cho biểu thức gọi hàm tiếp tục xử lý hoặc gán vào biến.',
    definitionEn: 'A function that uses return <value> to pass computed results back to the caller for assignment or expressions.',
    exampleVi: 'def inc(n): return n + 1; x = inc(3) -> x nhận giá trị 4',
    exampleEn: 'result = inc(3)',
    sgkContext: 'SGK Trang 128 & 129: "Để thiết lập hàm trả lại giá trị, câu lệnh return trong khai báo hàm cần có <giá trị> đi kèm."'
  },
  {
    id: 't26-8',
    termVi: 'Hàm không trả lại giá trị (Thủ tục)',
    termEn: 'Void Function / Procedure',
    ipa: '/vɔɪd ˈfʌŋk.ʃən/',
    definitionVi: 'Hàm thực hiện một loạt các hành động (như in ra màn hình) mà không trả về kết quả số hay xâu cho biến nhận; trả về giá trị đặc biệt None.',
    definitionEn: 'A function performing side effects (like printing) without returning a payload; implicitly evaluates to None.',
    exampleVi: 'def thong_bao(msg): print("Xin chào", msg)',
    exampleEn: 'def greet(): print("Hello")',
    sgkContext: 'SGK Trang 128 & 129: "Để thiết lập hàm không trả lại giá trị có thể dùng lệnh return không có <giá trị> hoặc không cần có return."'
  },
  {
    id: 't26-9',
    termVi: 'Hàm kiểm tra số nguyên tố prime(n)',
    termEn: 'Prime Check Function prime(n)',
    ipa: '/praɪm tʃɛk/',
    definitionVi: 'Hàm nhận số tự nhiên n và trả lại True nếu n là số nguyên tố, trả lại False nếu không phải, dựa trên việc đếm số ước thực sự từ 1 đến n-1.',
    definitionEn: 'A function taking integer n and returning True if n is prime, False otherwise, based on proper divisor counting.',
    exampleVi: 'prime(7) -> True, prime(9) -> False',
    exampleEn: 'prime(11) -> True',
    sgkContext: 'SGK Trang 129 & 130: "Nhiệm vụ 2: Viết hàm prime(n) với tham số là số tự nhiên n và trả lại True nếu n là số nguyên tố, trả lại False nếu n không phải số nguyên tố."'
  },
  {
    id: 't26-10',
    termVi: 'Kỹ thuật thoát sớm (Early Return)',
    termEn: 'Early Return Pattern',
    ipa: '/ˈɜːrli rɪˈtɜːrn/',
    definitionVi: 'Kỹ thuật đặt nhiều lệnh return trong hàm để lập tức kết thúc hàm ngay khi điều kiện được thỏa mãn, giúp tối ưu hóa hiệu năng chương trình.',
    definitionEn: 'The practice of returning from a function as soon as a condition is satisfied, avoiding unnecessary computations.',
    exampleVi: 'if n < 2: return False; if n % k == 0: return False',
    exampleEn: 'if condition: return early',
    sgkContext: 'SGK Trang 130 Vận dụng 1: "Trong khi viết hàm có thể có nhiều lệnh return... khi gặp n % k == 0 lập tức return False mà không cần kiểm tra tiếp."'
  }
];

export const LESSON_26_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: 'Trong ngôn ngữ lập trình Python, "chương trình con" được tổ chức dưới dạng nào?',
    questionEn: 'In Python programming language, how are subroutines structured?',
    optionsVi: [
      'Dưới dạng các vòng lặp lồng nhau',
      'Dưới dạng các hàm (functions)',
      'Dưới dạng các biến toàn cục',
      'Dưới dạng các danh sách (lists)'
    ],
    optionsEn: [
      'As nested loops',
      'As functions',
      'As global variables',
      'As lists'
    ],
    correctIndex: 1,
    explanationVi: 'Theo phần Khởi động trang 127 SGK: "Trong tổ chức chương trình viết bằng ngôn ngữ lập trình bậc cao, người ta gom các khối lệnh thành những chương trình con... Trong Python, các hàm chính là các chương trình con."',
    explanationEn: 'According to page 127: In high-level languages, reusable blocks are packaged into subroutines. In Python, functions are the subroutines.'
  },
  {
    id: 2,
    questionVi: 'Từ khoá nào được sử dụng để bắt đầu khai báo một hàm tự định nghĩa trong Python?',
    questionEn: 'Which keyword is used to declare a user-defined function in Python?',
    optionsVi: [
      'function',
      'def',
      'define',
      'procedure'
    ],
    optionsEn: [
      'function',
      'def',
      'define',
      'procedure'
    ],
    correctIndex: 1,
    explanationVi: 'Theo mục 2 trang 128 SGK: Hàm trong Python được định nghĩa bằng từ khoá def, theo sau là tên hàm và cặp ngoặc đơn.',
    explanationEn: 'According to page 128: Functions in Python are defined using the "def" keyword.'
  },
  {
    id: 3,
    questionVi: 'Lệnh nào sau đây trong Bảng 26.1 (trang 127 SGK) là hàm trả về kiểu số thực (float)?',
    questionEn: 'Which command from Table 26.1 (p. 127) returns a floating-point number?',
    optionsVi: [
      'int()',
      'len()',
      'float()',
      'str()'
    ],
    optionsEn: [
      'int()',
      'len()',
      'float()',
      'str()'
    ],
    correctIndex: 2,
    explanationVi: 'Theo Bảng 26.1 và câu hỏi củng cố trang 128: Hàm float() nhận tham số là một số hoặc xâu biểu diễn số và trả lại giá trị kiểu số thực.',
    explanationEn: 'According to Table 26.1 and page 128 review: float() converts its argument into a floating-point number.'
  },
  {
    id: 4,
    questionVi: 'Quan sát hàm sau:\ndef inc(n):\n    return n + 1\nKhi gọi inc(3), giá trị trả lại là bao nhiêu? (Ví dụ 1 trang 128 SGK)',
    questionEn: 'Given function:\ndef inc(n):\n    return n + 1\nWhen calling inc(3), what value is returned? (Example 1, p. 128)',
    optionsVi: [
      '3',
      '4',
      'n + 1',
      'None'
    ],
    optionsEn: [
      '3',
      '4',
      'n + 1',
      'None'
    ],
    correctIndex: 1,
    explanationVi: 'Với n = 3, biểu thức return n + 1 sẽ tính toán 3 + 1 = 4 và trả kết quả 4 về cho biểu thức gọi hàm.',
    explanationEn: 'With n = 3, return n + 1 evaluates to 3 + 1 = 4 and returns 4.'
  },
  {
    id: 5,
    questionVi: 'Khối lệnh mô tả phần thân của hàm trong Python bắt buộc phải tuân theo quy tắc nào sau đây?',
    questionEn: 'What syntax rule must the body block of a Python function strictly adhere to?',
    optionsVi: [
      'Đặt trong cặp dấu ngoặc nhọn { }',
      'Viết sau dấu hai chấm (:) và được viết lùi vào, thẳng hàng (Indentation)',
      'Kết thúc bằng từ khoá end',
      'Đặt trong cặp dấu nháy kép " "'
    ],
    optionsEn: [
      'Enclosed in curly braces { }',
      'Written after a colon (:) with uniform indentation',
      'Terminated with the end keyword',
      'Enclosed in double quotation marks " "'
    ],
    correctIndex: 1,
    explanationVi: 'Theo Hộp Ghi nhớ trang 128 SGK: Khối lệnh mô tả hàm được viết sau dấu ":" và viết lùi vào, thẳng hàng (Indentation).',
    explanationEn: 'According to page 128: Function body blocks are placed after a colon (:) and must be consistently indented.'
  },
  {
    id: 6,
    questionVi: 'Để một hàm KHÔNG trả lại giá trị cho nơi gọi, ta có thể thiết lập hàm như thế nào? (Hộp Ghi nhớ 3 trang 129 SGK)',
    questionEn: 'How can a function be configured so that it does NOT return a value? (Summary Box 3, p. 129)',
    optionsVi: [
      'Chỉ được dùng lệnh return 0',
      'Dùng lệnh return không có <giá trị> hoặc không cần viết return (hàm ngầm định trả về None)',
      'Bắt buộc phải xoá tên hàm',
      'Bắt buộc dùng từ khoá void'
    ],
    optionsEn: [
      'Must use return 0',
      'Use return without an expression or omit return (function implicitly returns None)',
      'Must delete function name',
      'Must use the void keyword'
    ],
    correctIndex: 1,
    explanationVi: 'Theo SGK trang 129 và cơ chế Python: Để thiết lập hàm không trả lại giá trị, ta có thể dùng lệnh return không kèm biểu thức hoặc để hàm chạy hết thân hàm; khi đó hàm ngầm định trả về giá trị None.',
    explanationEn: 'According to page 129 and Python runtime semantics: A function executing return with no expression or completing its body implicitly returns None.'
  },
  {
    id: 7,
    questionVi: 'Quan sát hàm sau (Câu hỏi củng cố a trang 129 SGK):\ndef Nhap_xau():\n    msg = input("Nhập một xâu: ")\n    return msg\nĐặc điểm về tham số và chức năng của hàm này là gì?',
    questionEn: 'Analyze function (Review Qa, p. 129):\ndef input_str():\n    msg = input("Enter a string: ")\n    return msg\nWhat are its parameters and function?',
    optionsVi: [
      'Có 1 tham số là msg, không trả lại giá trị',
      'Không có tham số, yêu cầu nhập xâu từ bàn phím và trả lại xâu vừa nhập',
      'Có 2 tham số, tính độ dài xâu',
      'Báo lỗi cú pháp vì thiếu tham số trong ngoặc'
    ],
    optionsEn: [
      'Has 1 parameter msg, void return',
      'Has no parameters, reads input from keyboard and returns the entered string',
      'Has 2 parameters, measures length',
      'Syntax error because parameter is missing'
    ],
    correctIndex: 1,
    explanationVi: 'Cặp ngoặc tròn của def Nhap_xau() rỗng nên hàm không có tham số. Lệnh input() yêu cầu nhập dữ liệu và return msg trả xâu vừa nhập về nơi gọi.',
    explanationEn: 'Parentheses are empty so it has zero parameters; it prompts keyboard input and returns the entered string.'
  },
  {
    id: 8,
    questionVi: 'Trong hàm prime(n) ở Nhiệm vụ 2 trang 129 SGK, biến C đếm các ước thực sự từ 1 đến n - 1. Số n là số nguyên tố khi và chỉ khi giá trị biến C bằng bao nhiêu?',
    questionEn: 'In prime(n) (Task 2, p. 129), variable C counts proper divisors from 1 to n - 1. n is prime if and only if C equals what?',
    optionsVi: [
      'C == 0',
      'C == 1',
      'C == 2',
      'C == n'
    ],
    optionsEn: [
      'C == 0',
      'C == 1',
      'C == 2',
      'C == n'
    ],
    correctIndex: 1,
    explanationVi: 'Số nguyên tố chỉ có 2 ước là 1 và chính nó. Khi chỉ xét các ước thực sự từ 1 đến n - 1, ước duy nhất thỏa mãn là 1. Do đó n là số nguyên tố khi và chỉ khi C == 1.',
    explanationEn: 'A prime has divisors 1 and n. Looking only at 1 to n - 1, the only divisor is 1, so the proper divisor count C must equal exactly 1.'
  },
  {
    id: 9,
    questionVi: 'Cho hàm sau (Luyện tập 2 trang 130 SGK):\ndef numbers(s):\n    ... # đếm số các chữ số có trong xâu s\nVới lệnh gọi numbers("0101abc"), kết quả trả về là bao nhiêu?',
    questionEn: 'For numbers(s) (Practice 2, p. 130): numbers("0101abc"). What is the returned result?',
    optionsVi: [
      '7',
      '3',
      '4',
      '0'
    ],
    optionsEn: [
      '7',
      '3',
      '4',
      '0'
    ],
    correctIndex: 2,
    explanationVi: 'Xâu "0101abc" có 4 kí tự là chữ số: \'0\', \'1\', \'0\', \'1\', và 3 kí tự chữ cái (\'a\', \'b\', \'c\'). Hàm numbers(s) đếm chữ số nên trả về 4.',
    explanationEn: '"0101abc" has 4 digits (\'0\', \'1\', \'0\', \'1\') and 3 letters. The function counting digits returns 4.'
  },
  {
    id: 10,
    questionVi: 'Trong hàm prime(n) cải tiến ở Vận dụng 1 trang 130 SGK, ưu điểm của việc sử dụng nhiều lệnh "return False" ngay trong vòng lặp là gì?',
    questionEn: 'In optimized prime(n) (Application 1, p. 130), what is the advantage of using multiple "return False" statements?',
    optionsVi: [
      'Giúp chương trình in ra nhiều kết quả cùng một lúc',
      'Thoát hàm ngay khi phát hiện n có ước số mà không cần kiểm tra các số còn lại, tiết kiệm thời gian chạy',
      'Làm cho hàm không bị báo lỗi cú pháp',
      'Tự động chuyển số nguyên thành số thực'
    ],
    optionsEn: [
      'Prints multiple results at once',
      'Exits immediately upon discovering a factor without testing remaining numbers, optimizing execution speed',
      'Prevents syntax errors',
      'Automatically converts integer to float'
    ],
    correctIndex: 1,
    explanationVi: 'Ngay khi n chia hết cho k (n % k == 0), n chắc chắn là hợp số, lệnh return False lập tức dừng hàm và thoát ra ngay, không cần lặp tiếp đến n-1, giúp thuật toán chạy nhanh hơn rất nhiều.',
    explanationEn: 'As soon as n % k == 0, n is confirmed composite; return False terminates immediately without unnecessary further checks.'
  }
];
