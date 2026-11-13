import { QuizQuestion } from './lesson2Data';
import { TermDefinition } from './lessonData';

export const LESSON_28_GLOSSARY: TermDefinition[] = [
  {
    id: 't28-1',
    termVi: 'Phạm vi của biến (Variable Scope)',
    termEn: 'Variable Scope',
    ipa: '/ˈveə.ri.ə.bəl skoʊp/',
    definitionVi: 'Vùng không gian mã nguồn trong chương trình mà một biến có hiệu lực, có thể truy cập, đọc hoặc gán giá trị.',
    definitionEn: 'The region of a program code where a variable is recognized, accessible, and valid for reference or modification.',
    exampleVi: 'Biến n khai báo trong hàm func() chỉ có phạm vi bên trong func().',
    exampleEn: 'Variable n declared inside func() has local scope.',
    sgkContext: 'SGK Trang 136: "Biết và trình bày được ý nghĩa của phạm vi hoạt động của biến trong chương trình và hàm."'
  },
  {
    id: 't28-2',
    termVi: 'Biến cục bộ / địa phương (Local Variable)',
    termEn: 'Local Variable',
    ipa: '/ˈloʊ.kəl ˈveə.ri.ə.bəl/',
    definitionVi: 'Biến được khai báo hoặc tạo ra bên trong phần thân của một hàm. Biến cục bộ chỉ tồn tại và có tác dụng bên trong hàm đó, không thể truy cập từ chương trình chính.',
    definitionEn: 'A variable declared inside the body of a function, accessible only within that function and deleted once the function finishes executing.',
    exampleVi: 'def func(): n = 10 -> n là biến cục bộ.',
    exampleEn: 'Inside def f(): x = 5, x is local.',
    sgkContext: 'SGK Trang 136 & 137 (Hộp Ghi nhớ 1): "Trong Python tất cả các biến khai báo bên trong hàm đều có tính địa phương (cục bộ), không có hiệu lực ở bên ngoài hàm."'
  },
  {
    id: 't28-3',
    termVi: 'Biến toàn cục (Global Variable)',
    termEn: 'Global Variable',
    ipa: '/ˈɡloʊ.bəl ˈveə.ri.ə.bəl/',
    definitionVi: 'Biến được khai báo bên ngoài tất cả các hàm (trong chương trình chính), có phạm vi hiệu lực xuyên suốt toàn bộ chương trình.',
    definitionEn: 'A variable declared at the module level outside of any function, accessible throughout the entire program.',
    exampleVi: 'N = 10; a, b = 1, 2 ở chương trình chính là biến toàn cục.',
    exampleEn: 'TOTAL = 100 defined at top level.',
    sgkContext: 'SGK Trang 137: "Một biến được định nghĩa trong chương trình chính (bên ngoài các hàm)..."'
  },
  {
    id: 't28-4',
    termVi: 'Từ khoá global (global Keyword)',
    termEn: 'global Keyword',
    ipa: '/ˈɡloʊ.bəl ˈkiː.wɜːrd/',
    definitionVi: 'Từ khóa dùng bên trong thân hàm để thông báo cho Python biết rằng một biến đang được tham chiếu tới biến toàn cục bên ngoài, cho phép hàm thay đổi giá trị của biến toàn cục đó.',
    definitionEn: 'A keyword used inside a function to declare that a variable refers to the global scope, enabling the function to modify its global value.',
    exampleVi: 'def f(): global t; t = 2 * n + 1',
    exampleEn: 'def modify(): global count; count += 1',
    sgkContext: 'SGK Trang 138 (Hộp Ghi nhớ 2): "Nếu muốn biến bên ngoài vẫn có tác dụng bên trong hàm thì cần khai báo lại biến này bên trong hàm với từ khoá global."'
  },
  {
    id: 't28-5',
    termVi: 'Che khuất tên biến (Variable Shadowing)',
    termEn: 'Variable Shadowing',
    ipa: '/ˈʃæd.oʊ.ɪŋ/',
    definitionVi: 'Hiện tượng một biến cục bộ bên trong hàm được đặt tên trùng với một biến toàn cục bên ngoài; bên trong hàm biến cục bộ sẽ được ưu tiên sử dụng mà không làm thay đổi biến ngoài.',
    definitionEn: 'A situation where a local variable inside a function shares the same name as an outer global variable, masking the global one inside the local scope without modifying it.',
    exampleVi: 'a = 1; def f(a): a = a + 2 -> a trong hàm không đổi a ngoài hàm.',
    exampleEn: 'Local variable x shadows global x.',
    sgkContext: 'SGK Trang 137 (Câu hỏi 2): "Ta có thể khai báo một biến bên trong hàm trùng tên với biến đã khai báo trước đó bên ngoài hàm không? -> Hoàn toàn được."'
  },
  {
    id: 't28-6',
    termVi: 'Đọc biến toàn cục trong hàm',
    termEn: 'Accessing Global Variables for Reading',
    ipa: '/ˈæk.sɛs ˈɡloʊ.bəl/',
    definitionVi: 'Hàm trong Python có thể tự do đọc và sử dụng giá trị của biến toàn cục trong các biểu thức tính toán mà không cần từ khoá global, miễn là không thực hiện phép gán thay đổi nó.',
    definitionEn: 'Python functions can freely read values of outer global variables in expressions without needing the global keyword, provided no assignment is made to that name.',
    exampleVi: 'def f(a, b): return a + b + N (với N = 10 ở ngoài hàm).',
    exampleEn: 'return x + GLOBAL_TAX',
    sgkContext: 'SGK Trang 137 (Ví dụ 2): "Bên trong hàm có thể truy cập để sử dụng giá trị của biến đã khai báo trước đó ở bên ngoài hàm."'
  },
  {
    id: 't28-7',
    termVi: 'Phương thức Str.title()',
    termEn: 'String title() Method',
    ipa: '/ˈtaɪ.təl ˈmɛθ.əd/',
    definitionVi: 'Phương thức tích hợp sẵn của kiểu dữ liệu xâu, chuyển đổi kí tự đầu tiên của mỗi từ thành chữ in hoa và tất cả các kí tự còn lại thành chữ thường.',
    definitionEn: 'A built-in string method that capitalizes the first character of every word while lowering the rest.',
    exampleVi: '"nguyen van an".title() -> "Nguyen Van An"',
    exampleEn: '"hello world".title() -> "Hello World"',
    sgkContext: 'SGK Trang 139: "Str.title() – chuyển kí tự đầu mỗi từ của xâu thành chữ in hoa, các kí tự khác chuyển về chữ thường."'
  },
  {
    id: 't28-8',
    termVi: 'Lọc danh sách theo điều kiện (List Filtering)',
    termEn: 'List Filtering Function',
    ipa: '/lɪst ˈfɪl.tər.ɪŋ/',
    definitionVi: 'Hàm duyệt qua danh sách A và bổ sung các phần tử thỏa mãn điều kiện so sánh vào danh sách kết quả B được khởi tạo cục bộ bên trong hàm.',
    definitionEn: 'Pattern where a local result list is populated by iterating through an input list and appending items matching a condition.',
    exampleVi: 'def Select(A, x): B = [k for k in A if k >= x]; return B',
    exampleEn: 'def filter_positive(arr): return [x for x in arr if x > 0]',
    sgkContext: 'SGK Trang 138 (Nhiệm vụ 1): "Biến B kiểu danh sách cần được định nghĩa trong hàm và được bổ sung thêm các phần tử từ A nếu thoả mãn điều kiện."'
  },
  {
    id: 't28-9',
    termVi: 'Hàm trả lại nhiều giá trị (Multi-value Return)',
    termEn: 'Multi-value Return Function',
    ipa: '/ˈmʌl.ti ˈvæl.juː rɪˈtɜːrn/',
    definitionVi: 'Khả năng của hàm trong Python trả về đồng thời nhiều giá trị (dưới dạng tuple) qua cú pháp "return val1, val2", cho phép nơi gọi nhận đồng thời nhiều biến.',
    definitionEn: 'The feature in Python allowing a function to return multiple values separated by commas, packed as a tuple.',
    exampleVi: 'return ucln, bcnn; u, b = f(m, n)',
    exampleEn: 'return gcd_val, lcm_val',
    sgkContext: 'SGK Trang 140 (Vận dụng 1): "Viết hàm có hai tham số đầu vào là m, n. Đầu ra trả lại hai giá trị: ƯCLN của m, n và BCNN của m, n."'
  },
  {
    id: 't28-10',
    termVi: 'Kiểm tra ngày tháng năm hợp lệ (Date Validation)',
    termEn: 'Date Validity Verification',
    ipa: '/deɪt ˌvæl.ɪˈdeɪ.ʃən/',
    definitionVi: 'Thuật toán kiểm tra 3 giá trị day, month, year có tạo thành một ngày có thật trên lịch Gregory hay không, bao gồm quy tắc năm nhuận và số ngày trong từng tháng.',
    definitionEn: 'Algorithmic logic determining whether a given day, month, and year form a valid calendar date, accounting for leap years and month lengths.',
    exampleVi: '29/2/2024 hợp lệ (năm nhuận), 29/2/2023 không hợp lệ.',
    exampleEn: 'validate_date(day, month, year)',
    sgkContext: 'SGK Trang 140 (Vận dụng 2): "Viết chương trình nhập ba số tự nhiên... kiểm tra và in ra thông báo số liệu đã nhập vào đó có hợp lệ hay không."'
  }
];

export const LESSON_28_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: 'Trong ngôn ngữ Python, các biến được khai báo bên trong một hàm có phạm vi hoạt động như thế nào? (Mục 1 trang 136 & Hộp Ghi nhớ 1 trang 137 SGK)',
    questionEn: 'In Python, what is the scope of variables declared inside a function? (Section 1, p. 136 & Summary Box 1, p. 137)',
    optionsVi: [
      'Có hiệu lực trong toàn bộ chương trình kể cả sau khi hàm kết thúc',
      'Chỉ có tính địa phương (cục bộ) bên trong hàm đó, không có hiệu lực ở bên ngoài hàm',
      'Tự động trở thành biến toàn cục nếu không có lỗi',
      'Được lưu vĩnh viễn vào bộ nhớ máy tính'
    ],
    optionsEn: [
      'Valid everywhere in the program even after function ends',
      'Local to that function only, with no effect outside the function',
      'Automatically become global variables',
      'Permanently stored in computer disk'
    ],
    correctIndex: 1,
    explanationVi: 'Theo Hộp Ghi nhớ 1 trang 137 SGK: "Trong Python tất cả các biến khai báo bên trong hàm đều có tính địa phương (cục bộ), không có hiệu lực ở bên ngoài hàm."',
    explanationEn: 'According to Summary Box 1, page 137: All variables declared inside a function are local and have no scope outside that function.'
  },
  {
    id: 2,
    questionVi: 'Quan sát đoạn mã sau (Trang 136 SGK):\ndef func(a, b):\n    n = 10\n    return a + b + n\na, b = 1, 2\nfunc(a, b)\nSau đó, lệnh "print(n)" ở chương trình chính sẽ dẫn đến kết quả gì?',
    questionEn: 'Given the code from page 136:\ndef func(a, b):\n    n = 10\n    return a + b + n\na, b = 1, 2\nfunc(a, b)\nWhat happens when executing "print(n)" in the main program?',
    optionsVi: [
      'In ra số 10',
      'Báo lỗi NameError: name \'n\' is not defined',
      'In ra None',
      'In ra số 0'
    ],
    optionsEn: [
      'Prints 10',
      'Raises NameError: name \'n\' is not defined',
      'Prints None',
      'Prints 0'
    ],
    correctIndex: 1,
    explanationVi: 'Biến n được khai báo bên trong hàm func nên là biến cục bộ. Khi hàm kết thúc, biến n không tồn tại ở phạm vi ngoài hàm. Do đó gọi print(n) sẽ báo lỗi NameError: name \'n\' is not defined.',
    explanationEn: 'Variable n is local to func. Outside the function, n does not exist, raising NameError: name \'n\' is not defined.'
  },
  {
    id: 3,
    questionVi: 'Cho đoạn mã sau (Câu hỏi củng cố 1 trang 137 SGK):\na, b = 1, 2\ndef f(a, b):\n    a = a + b\n    b = b * a\n    return a + b\nf(10, 20)\nSau khi chạy lệnh f(10, 20), giá trị của hai biến a, b ở chương trình chính là bao nhiêu?',
    questionEn: 'Given code (Review Q1, p. 137):\na, b = 1, 2\ndef f(a, b):\n    a = a + b\n    b = b * a\n    return a + b\nf(10, 20)\nAfter f(10, 20), what are values of a and b in the main program?',
    optionsVi: [
      'a = 30, b = 600',
      'a = 1, b = 2',
      'a = 10, b = 20',
      'a = 3, b = 6'
    ],
    optionsEn: [
      'a = 30, b = 600',
      'a = 1, b = 2',
      'a = 10, b = 20',
      'a = 3, b = 6'
    ],
    correctIndex: 1,
    explanationVi: 'Các biến a, b trong hàm f là các tham số cục bộ. Mọi thao tác gán và thay đổi giá trị của a, b chỉ diễn ra bên trong hàm f, hoàn toàn không làm thay đổi giá trị của biến a, b ở chương trình chính (vẫn là 1, 2).',
    explanationEn: 'a and b inside f are local parameters. Modifications inside f do not alter global a and b, which remain 1 and 2.'
  },
  {
    id: 4,
    questionVi: 'Ta có thể khai báo một biến bên trong hàm trùng tên với một biến đã khai báo trước đó bên ngoài hàm hay không? (Câu hỏi củng cố 2 trang 137 SGK)',
    questionEn: 'Can we declare a variable inside a function with the same name as a pre-existing outer variable? (Review Q2, p. 137)',
    optionsVi: [
      'Không thể, Python sẽ báo lỗi SyntaxError trùng tên biến',
      'Hoàn toàn được; biến bên trong hàm là biến cục bộ độc lập với biến toàn cục bên ngoài',
      'Chỉ được nếu biến đó mang kiểu số nguyên',
      'Được nhưng bắt buộc phải có từ khoá global'
    ],
    optionsEn: [
      'No, Python raises a SyntaxError',
      'Yes, local variables are independent of outer global variables',
      'Only if it is an integer',
      'Yes, but global keyword is mandatory'
    ],
    correctIndex: 1,
    explanationVi: 'Theo câu hỏi củng cố 2 trang 137: Ta hoàn toàn có thể đặt tên biến trong hàm trùng với tên biến ngoài hàm. Python coi biến bên trong là biến cục bộ và ưu tiên sử dụng trong hàm đó (hiện tượng shadowing).',
    explanationEn: 'Yes. Python allows local variables to share names with global ones; the local variable shadows the outer one within the function.'
  },
  {
    id: 5,
    questionVi: 'Quan sát đoạn mã sau (Ví dụ 2 trang 137 SGK):\ndef f(a, b):\n    return a + b + N\nN = 10\nprint(f(1, 2))\nKết quả in ra màn hình là bao nhiêu?',
    questionEn: 'Given code (Example 2, p. 137):\ndef f(a, b):\n    return a + b + N\nN = 10\nprint(f(1, 2))\nWhat is printed to screen?',
    optionsVi: [
      '3',
      '13',
      'Báo lỗi NameError vì N chưa khai báo trong hàm',
      '10'
    ],
    optionsEn: [
      '3',
      '13',
      'Raises NameError because N is not declared in f',
      '10'
    ],
    correctIndex: 1,
    explanationVi: 'Theo ví dụ 2 trang 137: Bên trong hàm có thể truy cập để đọc giá trị của biến N đã khai báo trước đó ở bên ngoài hàm. Với a = 1, b = 2 và N = 10, biểu thức 1 + 2 + 10 = 13.',
    explanationEn: 'A function can freely read the value of an outer global variable N. 1 + 2 + 10 = 13.'
  },
  {
    id: 6,
    questionVi: 'Nếu muốn thay đổi giá trị của một biến toàn cục từ bên trong một hàm, người lập trình bắt buộc phải sử dụng từ khoá nào? (Trang 138 SGK)',
    questionEn: 'If a programmer wants to modify a global variable from within a function, which keyword must be used? (p. 138)',
    optionsVi: [
      'local',
      'global',
      'static',
      'public'
    ],
    optionsEn: [
      'local',
      'global',
      'static',
      'public'
    ],
    correctIndex: 1,
    explanationVi: 'Theo Hộp Ghi nhớ 2 trang 138 SGK: "Biến đã khai báo bên ngoài sẽ không có tác dụng bên trong hàm như một biến. Nếu muốn có tác dụng thì cần khai báo lại biến này trong hàm với từ khoá global."',
    explanationEn: 'According to page 138: To rebind/modify a global variable inside a function, declare it with the "global" keyword.'
  },
  {
    id: 7,
    questionVi: 'Cho đoạn mã sau (Trang 138 SGK):\ndef f(n):\n    global t\n    t = 2 * n + 1\n    return t\nt = 10\nf(1)\nprint(t)\nKết quả in ra màn hình của lệnh print(t) là bao nhiêu?',
    questionEn: 'Given code (p. 138):\ndef f(n):\n    global t\n    t = 2 * n + 1\n    return t\nt = 10\nf(1)\nprint(t)\nWhat is printed by print(t)?',
    optionsVi: [
      '10',
      '3',
      '1',
      '21'
    ],
    optionsEn: [
      '10',
      '3',
      '1',
      '21'
    ],
    correctIndex: 1,
    explanationVi: 'Vì trong hàm f có khai báo "global t", lệnh gán t = 2 * 1 + 1 = 3 đã trực tiếp thay đổi giá trị của biến t toàn cục ngoài hàm. Khi hàm kết thúc, biến t ngoài hàm mang giá trị mới là 3.',
    explanationEn: 'Because of "global t", the assignment t = 2 * 1 + 1 = 3 updates the global variable t to 3.'
  },
  {
    id: 8,
    questionVi: 'Trong bài thực hành Nhiệm vụ 2 trang 138–139 SGK, phương thức nào được dùng để chuyển kí tự đầu mỗi từ thành chữ in hoa, các kí tự khác chuyển về chữ thường?',
    questionEn: 'In Practice Task 2 (pp. 138–139), which method capitalizes the first letter of each word while lowercasing the rest?',
    optionsVi: [
      'Str.upper()',
      'Str.lower()',
      'Str.title()',
      'Str.capitalize()'
    ],
    optionsEn: [
      'Str.upper()',
      'Str.lower()',
      'Str.title()',
      'Str.capitalize()'
    ],
    correctIndex: 2,
    explanationVi: 'Theo hướng dẫn trang 139 SGK: "Str.title() – chuyển kí tự đầu mỗi từ của xâu thành chữ in hoa, các kí tự khác chuyển về chữ thường."',
    explanationEn: 'Page 139 states: Str.title() capitalizes the first character of each word and lowers all other characters.'
  },
  {
    id: 9,
    questionVi: 'Cho hàm sau (Luyện tập 2 trang 140 SGK):\ndef Tach_day(A):\n    B = [A[i] for i in range(len(A)) if i % 2 == 0]\n    C = [A[i] for i in range(len(A)) if i % 2 != 0]\n    return B, C\nVới danh sách A = [10, 20, 30, 40, 50], danh sách B nhận các phần tử nào?',
    questionEn: 'For Tach_day(A) (Practice 2, p. 140) where B takes even indices and C takes odd indices: With A = [10, 20, 30, 40, 50], what elements does B receive?',
    optionsVi: [
      '[20, 40]',
      '[10, 30, 50]',
      '[10, 20, 30]',
      '[30, 40, 50]'
    ],
    optionsEn: [
      '[20, 40]',
      '[10, 30, 50]',
      '[10, 20, 30]',
      '[30, 40, 50]'
    ],
    correctIndex: 1,
    explanationVi: 'Các chỉ số chẵn của danh sách A là 0, 2, 4. Tương ứng với các phần tử A[0] = 10, A[2] = 30, A[4] = 50. Do đó danh sách B = [10, 30, 50].',
    explanationEn: 'Even indices are 0, 2, 4, corresponding to elements A[0]=10, A[2]=30, A[4]=50. Hence B = [10, 30, 50].'
  },
  {
    id: 10,
    questionVi: 'Trong Vận dụng 1 trang 140 SGK, mối quan hệ giữa ƯCLN(m, n) và BCNN(m, n) của hai số tự nhiên m, n là gì?',
    questionEn: 'In Application 1 (p. 140), what is the relationship between GCD(m, n) and LCM(m, n) for natural numbers m and n?',
    optionsVi: [
      'ƯCLN(m, n) + BCNN(m, n) = m + n',
      'ƯCLN(m, n) × BCNN(m, n) = m × n',
      'BCNN(m, n) = (m + n) // ƯCLN(m, n)',
      'ƯCLN(m, n) = BCNN(m, n) // 2'
    ],
    optionsEn: [
      'GCD(m, n) + LCM(m, n) = m + n',
      'GCD(m, n) × LCM(m, n) = m × n',
      'LCM(m, n) = (m + n) // GCD(m, n)',
      'GCD(m, n) = LCM(m, n) // 2'
    ],
    correctIndex: 1,
    explanationVi: 'Theo gợi ý trang 140 SGK: "Sử dụng công thức ƯCLN(m, n) × BCNN(m, n) = m × n", từ đó ta tính được BCNN(m, n) = (m × n) // ƯCLN(m, n).',
    explanationEn: 'Page 140 explicitly provides: GCD(m, n) * LCM(m, n) = m * n, which yields LCM(m, n) = (m * n) // GCD(m, n).'
  }
];
