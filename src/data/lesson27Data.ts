import { QuizQuestion } from './lesson2Data';
import { TermDefinition } from './lessonData';

export const LESSON_27_GLOSSARY: TermDefinition[] = [
  {
    id: 't27-1',
    termVi: 'Tham số của hàm (Parameter)',
    termEn: 'Function Parameter',
    ipa: '/pəˈræm.ɪ.tər/',
    definitionVi: 'Các biến được khai báo trong cặp ngoặc đơn của định nghĩa hàm (sau từ khoá def), dùng như biến cục bộ trong thân hàm để tiếp nhận dữ liệu khi hàm được gọi.',
    definitionEn: 'Variables declared within the parentheses of a function definition, used as local variables to receive values when the function is invoked.',
    exampleVi: 'def f_sum(a, b, c): -> a, b, c là 3 tham số của hàm',
    exampleEn: 'def greet(name, title): -> name and title are parameters',
    sgkContext: 'SGK Trang 131 & 132: "Tham số của hàm được định nghĩa khi khai báo hàm và được dùng như biến trong định nghĩa hàm."'
  },
  {
    id: 't27-2',
    termVi: 'Đối số của hàm (Argument)',
    termEn: 'Function Argument',
    ipa: '/ˈɑːrɡ.jə.mənt/',
    definitionVi: 'Giá trị, biến hoặc biểu thức cụ thể được truyền vào hàm tại thời điểm gọi hàm, tương ứng với vị trí các tham số được khai báo.',
    definitionEn: 'The actual value, variable, or expression supplied to a function when it is called, mapped to the corresponding parameters.',
    exampleVi: 'f_sum(10, x, y) -> 10, x, y là các đối số truyền vào hàm',
    exampleEn: 'f_sum(10, 5, 3) -> 10, 5, 3 are arguments',
    sgkContext: 'SGK Trang 131 & 132: "Đối số là giá trị được truyền vào khi gọi hàm. Khi gọi hàm, các tham số (parameter) sẽ được truyền bằng giá trị thông qua đối số (argument) của hàm."'
  },
  {
    id: 't27-3',
    termVi: 'Quy tắc số lượng đối số',
    termEn: 'Argument Count Matching Rule',
    ipa: '/ˈɑːrɡ.jə.mənt kaʊnt/',
    definitionVi: 'Quy tắc bắt buộc số lượng đối số truyền vào khi gọi hàm phải bằng đúng số lượng tham số trong khai báo hàm; nếu thừa hoặc thiếu Python sẽ báo lỗi TypeError.',
    definitionEn: 'The strict rule requiring the number of arguments passed in a call to match exactly the number of declared parameters; mismatches trigger a TypeError.',
    exampleVi: 'def f(x, y): ... -> f(10) hoặc f(1, 2, 3) đều gây lỗi TypeError',
    exampleEn: 'TypeError: takes 2 positional arguments but 3 were given',
    sgkContext: 'SGK Trang 132: "số lượng giá trị được truyền vào hàm bằng với số tham số trong khai báo của hàm."'
  },
  {
    id: 't27-4',
    termVi: 'Lỗi NameError khi truyền đối số',
    termEn: 'NameError on Undefined Argument',
    ipa: '/neɪm ˈɛr.ər/',
    definitionVi: 'Lỗi phát sinh khi đối số truyền vào là một tên biến nhưng biến đó chưa từng được gán giá trị hoặc không tồn tại trong phạm vi gọi hàm.',
    definitionEn: 'An error raised when an argument is an identifier that has not been defined or bound to a value in the current scope.',
    exampleVi: 'f(a, b, c) -> NameError: name \'a\' is not defined',
    exampleEn: 'f(x) without defining x first raises NameError',
    sgkContext: 'SGK Trang 131 & 132 (Dòng 8-12): "Lời gọi hàm bị lỗi nếu các tham số được truyền vào chưa có giá trị. NameError: name \'a\' is not defined."'
  },
  {
    id: 't27-5',
    termVi: 'Chia bài toán lớn thành bài toán nhỏ (Decomposition)',
    termEn: 'Functional Decomposition',
    ipa: '/ˌdiː.kɒm.pəˈzɪʃ.ən/',
    definitionVi: 'Phương pháp phân rã một bài toán phức tạp thành nhiều bài toán con độc lập, mỗi bài toán con được giải quyết gọn gàng bởi một chương trình con (hàm).',
    definitionEn: 'The architectural design technique of breaking a complex problem into smaller, self-contained sub-problems, each addressed by a dedicated function.',
    exampleVi: 'Bài toán in số nguyên tố -> Tách thành hàm prime(n) và vòng lặp duyệt',
    exampleEn: 'Decomposing a payroll program into calculate_tax(), calculate_bonus(), etc.',
    sgkContext: 'SGK Trang 133 (Hộp Ghi nhớ 2): "Sử dụng chương trình con có thể giúp phân chia việc giải một bài toán lớn thành giải quyết các bài toán nhỏ và phát huy được tinh thần làm việc nhóm."'
  },
  {
    id: 't27-6',
    termVi: 'Cấu trúc chương trình rõ ràng & Dễ bảo trì',
    termEn: 'Code Readability & Maintainability',
    ipa: '/meɪnˌteɪ.nəˈbɪl.ə.ti/',
    definitionVi: 'Lợi ích của hàm giúp mã nguồn trong sáng, tránh trùng lặp, khi cần sửa đổi thuật toán chỉ cần sửa tại một nơi duy nhất bên trong hàm.',
    definitionEn: 'The software quality wherein modular functions make programs intuitive to understand, test, debug, and upgrade without side effects.',
    exampleVi: 'Sửa thuật toán kiểm tra số nguyên tố chỉ cần sửa bên trong hàm prime(n)',
    exampleEn: 'Modifying algorithm logic solely within the function body',
    sgkContext: 'SGK Trang 133: "Chương trình chính có cấu trúc rõ ràng, dễ hiểu hơn; Nếu cần hiệu chỉnh, phát triển và nâng cấp cũng thuận tiện hơn."'
  },
  {
    id: 't27-7',
    termVi: 'Hàm đan xen xâu merge_str(s1, s2)',
    termEn: 'Interleaving String Function',
    ipa: '/ˌɪn.tərˈliːv.ɪŋ/',
    definitionVi: 'Hàm nhận 2 xâu s1, s2 và lần lượt lấy từng kí tự xen kẽ của s1 và s2 vào xâu mới; phần đuôi dư của xâu dài hơn được chắp nối tiếp vào cuối.',
    definitionEn: 'A function that merges two strings by taking alternating characters from each, appending any leftover suffix from the longer string.',
    exampleVi: 'merge_str("1111", "0000") -> "10101010"',
    exampleEn: 'merge_str("abc", "12345") -> "a1b2c345"',
    sgkContext: 'SGK Trang 134 & 135: "Nhiệm vụ 3: Thiết lập hàm merge_str(s1, s2)... lấy lần lượt từng kí tự của s1, s2 đưa vào xâu kết quả."'
  },
  {
    id: 't27-8',
    termVi: 'Hàm đếm từ tuỳ biến f_dem(msg, sep)',
    termEn: 'Custom Delimiter Word Counter',
    ipa: '/wɜːrd ˈkaʊn.tər/',
    definitionVi: 'Hàm nhận xâu văn bản msg và kí tự phân tách sep, sử dụng msg.split(sep) rồi trả về độ dài danh sách từ len(xlist).',
    definitionEn: 'A function that takes text msg and delimiter sep, decomposes it via msg.split(sep), and returns the word count using len(xlist).',
    exampleVi: 'f_dem("Mùa thu lịch sử", " ") -> 4; f_dem("Mùa thu lịch sử", "-") -> 1',
    exampleEn: 'f_dem("apple,banana,orange", ",") -> 3',
    sgkContext: 'SGK Trang 134: "Nhiệm vụ 2: Thiết lập hàm f_dem(msg, sep) có chức năng đếm số các từ của một xâu msg với kí tự tách từ là sep."'
  },
  {
    id: 't27-9',
    termVi: 'Phương thức chuyển chữ hoa .upper()',
    termEn: 'String upper() Method',
    ipa: '/ˈʌp.ər/',
    definitionVi: 'Phương thức tích hợp sẵn của kiểu dữ liệu xâu trong Python, trả về một bản sao mới của xâu với toàn bộ các chữ cái được chuyển thành chữ in hoa.',
    definitionEn: 'A built-in string method returning a copy of the string converted to uppercase.',
    exampleVi: '"nguyen an".upper() -> "NGUYEN AN"',
    exampleEn: '"python".upper() -> "PYTHON"',
    sgkContext: 'SGK Trang 135 (Vận dụng 2): "Gợi ý: Sử dụng các phương thức s.upper() và s.lower() để chuyển đổi các kí tự của xâu s sang chữ in hoa và in thường."'
  },
  {
    id: 't27-10',
    termVi: 'Phương thức chuyển chữ thường .lower()',
    termEn: 'String lower() Method',
    ipa: '/ˈloʊ.ər/',
    definitionVi: 'Phương thức tích hợp sẵn của kiểu dữ liệu xâu trong Python, trả về một bản sao mới của xâu với toàn bộ các chữ cái được chuyển thành chữ in thường.',
    definitionEn: 'A built-in string method returning a copy of the string converted to lowercase.',
    exampleVi: '"NGUYEN AN".lower() -> "nguyen an"',
    exampleEn: '"HELLO".lower() -> "hello"',
    sgkContext: 'SGK Trang 135 (Vận dụng 2): "Nếu tham số c khác 0 thì hàm trả lại xâu ho_ten là chữ in thường bằng phương thức s.lower()."'
  }
];

export const LESSON_27_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: 'Trong định nghĩa hàm "def f_sum(a, b, c):", các đại lượng a, b, c được gọi là gì? (Khởi động trang 131 SGK)',
    questionEn: 'In the function definition "def f_sum(a, b, c):", what are a, b, c called? (Warm-up, p. 131)',
    optionsVi: [
      'Đối số (Arguments)',
      'Tham số (Parameters)',
      'Biến toàn cục (Global variables)',
      'Hằng số (Constants)'
    ],
    optionsEn: [
      'Arguments',
      'Parameters',
      'Global variables',
      'Constants'
    ],
    correctIndex: 1,
    explanationVi: 'Theo phần Khởi động và mục 1 trang 131 SGK: Trong khai báo hàm def f_sum(a, b, c), các biến a, b, c được đặt trong cặp ngoặc đơn là các tham số (parameters) của hàm.',
    explanationEn: 'According to page 131: Variables in parentheses during function definition are parameters.'
  },
  {
    id: 2,
    questionVi: 'Khi thực hiện lệnh gọi hàm "f_sum(10, x, y)", các giá trị 10, x, y được gọi là gì? (Khởi động trang 131 SGK)',
    questionEn: 'When executing the call "f_sum(10, x, y)", what are 10, x, y called? (Warm-up, p. 131)',
    optionsVi: [
      'Tham số (Parameters)',
      'Đối số (Arguments)',
      'Kiểu dữ liệu (Data types)',
      'Tên hàm (Function names)'
    ],
    optionsEn: [
      'Parameters',
      'Arguments',
      'Data types',
      'Function names'
    ],
    correctIndex: 1,
    explanationVi: 'Theo SGK trang 131: Giá trị, biến hoặc biểu thức được truyền vào khi gọi hàm được gọi là đối số (arguments) của hàm.',
    explanationEn: 'According to page 131: Values supplied during a function call are arguments.'
  },
  {
    id: 3,
    questionVi: 'Cho hàm "def f(a, b, c): return a + b + c". Điều gì sẽ xảy ra khi thực hiện lệnh gọi "f(a, b, c)" khi các biến a, b, c chưa từng được gán giá trị ở chương trình chính? (Dòng 8–12 trang 131 SGK)',
    questionEn: 'Given "def f(a, b, c): return a + b + c". What happens on "f(a, b, c)" if variables a, b, c were never defined? (p. 131)',
    optionsVi: [
      'Hàm tự động coi a = 0, b = 0, c = 0 và trả về 0',
      'Chương trình báo lỗi NameError: name \'a\' is not defined',
      'Chương trình báo lỗi TypeError: missing arguments',
      'Hàm yêu cầu người dùng nhập giá trị từ bàn phím'
    ],
    optionsEn: [
      'Defaults to a = 0, b = 0, c = 0 and returns 0',
      'Raises NameError: name \'a\' is not defined',
      'Raises TypeError: missing arguments',
      'Prompts user keyboard input'
    ],
    correctIndex: 1,
    explanationVi: 'Theo ví dụ trang 131 SGK: Lời gọi hàm bị lỗi nếu các đối số truyền vào chưa có giá trị xác định; Python báo lỗi "NameError: name \'a\' is not defined".',
    explanationEn: 'According to page 131: Calling with undefined variable identifiers raises NameError.'
  },
  {
    id: 4,
    questionVi: 'Với các hàm có tham số bắt buộc đang học trong chương trình, khi khai báo có 1 tham số nhưng khi gọi hàm lại truyền vào 2 đối số thì kết quả như thế nào? (Câu hỏi củng cố 1 trang 132 SGK)',
    questionEn: 'For functions with required positional parameters as studied in the curriculum, if declared with 1 parameter but invoked with 2 arguments, what happens? (Review Q1, p. 132)',
    optionsVi: [
      'Hàm bỏ qua đối số thứ hai và thực hiện bình thường',
      'Không được, Python sẽ báo lỗi TypeError vì số lượng đối số không khớp với số tham số',
      'Hàm tự động nhân đôi kết quả tính toán',
      'Hàm gộp hai đối số thành một danh sách'
    ],
    optionsEn: [
      'Ignores the second argument and proceeds',
      'Not allowed; Python raises TypeError due to argument count mismatch',
      'Automatically doubles the result',
      'Bundles both arguments into a list'
    ],
    correctIndex: 1,
    explanationVi: 'Theo Hộp Ghi nhớ 1 trang 132 SGK: Với dạng hàm có tham số bắt buộc đang học, số lượng đối số truyền vào phải bằng đúng số tham số. Thừa hoặc thiếu đối số gây lỗi TypeError (phân biệt với NameError khi truyền tên biến chưa định nghĩa).',
    explanationEn: 'According to Summary Box 1, p. 132: For required positional parameters, the argument count must match declared parameters exactly. Passing too few or too many arguments raises TypeError (distinct from NameError when argument variables are undefined).'
  },
  {
    id: 5,
    questionVi: 'Giả sử hàm f có hai tham số x, y và trả lại x + 2y. Lời gọi hàm f(10, a) có gây lỗi hay không? (Câu hỏi củng cố 2 trang 132 SGK)',
    questionEn: 'Given f(x, y) returns x + 2y. Does f(10, a) cause an error? (Review Q2, p. 132)',
    optionsVi: [
      'Luôn luôn không có lỗi vì đã có số 10',
      'Sẽ báo lỗi NameError nếu biến đối số a chưa được định nghĩa/gán giá trị trước đó; nếu a đã có giá trị thì không lỗi',
      'Luôn luôn báo lỗi vì tham số và đối số không được khác tên nhau',
      'Báo lỗi cú pháp SyntaxError'
    ],
    optionsEn: [
      'Never errors because 10 is valid',
      'Raises NameError if argument variable a has not been defined/assigned beforehand; executes normally if a exists',
      'Always errors because argument and parameter names differ',
      'SyntaxError'
    ],
    correctIndex: 1,
    explanationVi: 'Theo câu hỏi củng cố 2 trang 132: f(10, a) có 2 đối số khớp đúng số lượng 2 tham số x, y (không bị lỗi TypeError). Tuy nhiên nếu biến đối số a chưa được gán giá trị ở chương trình gọi thì sẽ phát sinh lỗi NameError.',
    explanationEn: 'Review Q2, p. 132: f(10, a) has 2 arguments matching 2 parameters (no TypeError). However, if argument variable a is undefined in the calling scope, Python raises NameError.'
  },
  {
    id: 6,
    questionVi: 'Ý nào sau đây KHÔNG PHẢI là lợi ích của việc sử dụng chương trình con (hàm)? (Hộp Ghi nhớ 2 trang 133 SGK)',
    questionEn: 'Which of the following is NOT a benefit of using subroutines/functions? (Summary Box 2, p. 133)',
    optionsVi: [
      'Phân chia bài toán lớn thành các bài toán nhỏ, phát huy tinh thần làm việc nhóm',
      'Chương trình chính có cấu trúc rõ ràng, dễ hiểu hơn',
      'Làm cho chương trình luôn chạy nhanh hơn gấp 10 lần so với không dùng hàm',
      'Khi cần hiệu chỉnh, phát triển và nâng cấp chương trình sẽ thuận tiện hơn'
    ],
    optionsEn: [
      'Decomposing large tasks into small modules, empowering team collaboration',
      'Main program gains clear and readable structure',
      'Makes code execute 10 times faster than without functions',
      'Convenient maintenance, debugging, and future upgrades'
    ],
    correctIndex: 2,
    explanationVi: 'Theo Hộp Ghi nhớ trang 133 SGK: 3 ưu điểm chính của chương trình con là: (1) Phân chia bài toán lớn thành các bài toán nhỏ; (2) Chương trình chính có cấu trúc rõ ràng, dễ hiểu; (3) Hiệu chỉnh, phát triển nâng cấp thuận tiện. Hàm không đảm bảo tăng tốc độ gấp 10 lần.',
    explanationEn: 'Summary Box 2 lists modular decomposition, readability, and maintainability. A 10x speed boost is not a property of functions.'
  },
  {
    id: 7,
    questionVi: 'Trong bài thực hành Nhiệm vụ 1 trang 134 SGK, hàm f_sum(A, b) xử lý danh sách A như thế nào khi b != 0?',
    questionEn: 'In Practice Task 1 (p. 134), how does f_sum(A, b) process list A when b != 0?',
    optionsVi: [
      'Tính tổng tất cả các phần tử trong A',
      'Chỉ tính tổng các số hạng lớn hơn 0 (số dương) của danh sách A',
      'Tính tích các phần tử trong A',
      'Đếm số lượng phần tử bằng 0'
    ],
    optionsEn: [
      'Sums all elements in A',
      'Calculates the sum of positive elements (x > 0) in list A only',
      'Multiplies all elements',
      'Counts zeroes'
    ],
    correctIndex: 1,
    explanationVi: 'Theo đề bài Nhiệm vụ 1 trang 134 SGK: Nếu b = 0 thì tính tổng các số của A; Nếu b khác 0 thì chỉ tính tổng các số dương của A (if x > 0: S = S + x).',
    explanationEn: 'Task 1 specifies: if b == 0 calculate total sum; else if b != 0 sum positive numbers (x > 0) only.'
  },
  {
    id: 8,
    questionVi: 'Cho hàm sau (Nhiệm vụ 2 trang 134 SGK):\ndef f_dem(msg, sep):\n    xlist = msg.split(sep)\n    return len(xlist)\nKết quả của lệnh gọi f_dem("Mùa thu lịch sử", "-") là bao nhiêu?',
    questionEn: 'Given function:\ndef f_dem(msg, sep):\n    xlist = msg.split(sep)\n    return len(xlist)\nWhat is f_dem("Historic autumn", "-")? (Task 2, p. 134)',
    optionsVi: [
      '4',
      '1',
      '0',
      '14'
    ],
    optionsEn: [
      '4',
      '1',
      '0',
      '14'
    ],
    correctIndex: 1,
    explanationVi: 'Xâu "Mùa thu lịch sử" không chứa dấu gạch nối "-", nên msg.split("-") trả về danh sách có đúng 1 phần tử là ["Mùa thu lịch sử"]. Do đó len(xlist) trả lại giá trị 1.',
    explanationEn: 'The delimiter "-" does not occur in "Historic autumn", so split("-") produces a 1-element list ["Historic autumn"], giving length 1.'
  },
  {
    id: 9,
    questionVi: 'Với hàm merge_str(s1, s2) ở Nhiệm vụ 3 trang 134–135 SGK, khi gọi merge_str("1111", "0000"), kết quả trả về là gì?',
    questionEn: 'With merge_str(s1, s2) (Task 3, pp. 134–135), calling merge_str("1111", "0000") returns what?',
    optionsVi: [
      '"11110000"',
      '"10101010"',
      '"01010101"',
      '"11001100"'
    ],
    optionsEn: [
      '"11110000"',
      '"10101010"',
      '"01010101"',
      '"11001100"'
    ],
    correctIndex: 1,
    explanationVi: 'Theo ví dụ trang 134 SGK: Hàm đan xen từng kí tự của s1 và s2: s1[0] + s2[0] + s1[1] + s2[1] + ... cho kết quả xâu "10101010".',
    explanationEn: 'Alternating characters from "1111" and "0000" produces "10101010".'
  },
  {
    id: 10,
    questionVi: 'Trong Vận dụng 2 trang 135 SGK, phương thức nào được sử dụng để chuyển toàn bộ xâu ho_ten thành chữ in hoa khi c = 0?',
    questionEn: 'In Application 2 (p. 135), which method converts string ho_ten to uppercase when c = 0?',
    optionsVi: [
      'ho_ten.upper()',
      'ho_ten.lower()',
      'ho_ten.title()',
      'ho_ten.capitalize()'
    ],
    optionsEn: [
      'ho_ten.upper()',
      'ho_ten.lower()',
      'ho_ten.title()',
      'ho_ten.capitalize()'
    ],
    correctIndex: 0,
    explanationVi: 'Theo gợi ý Vận dụng 2 trang 135 SGK: Sử dụng phương thức s.upper() để chuyển đổi các kí tự của xâu s sang chữ in hoa, và s.lower() để chuyển sang chữ in thường.',
    explanationEn: 'Page 135 explicitly notes: use s.upper() to convert characters to uppercase, and s.lower() for lowercase.'
  }
];
