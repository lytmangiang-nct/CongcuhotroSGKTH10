import { TermDefinition } from './lessonData';
import { QuizQuestion } from './lesson2Data';

export const LESSON_18_GLOSSARY: TermDefinition[] = [
  {
    id: 't18-1',
    termVi: 'Lệnh input()',
    termEn: 'input() Function',
    ipa: '/ˈɪnpʊt ˈfʌŋkʃən/',
    definitionVi: 'Lệnh nhập dữ liệu từ thiết bị vào chuẩn (bàn phím). Cho phép kèm thông báo hướng dẫn và LUÔN LUÔN trả về giá trị là một xâu kí tự (str), kể cả khi người dùng gõ số.',
    definitionEn: 'A built-in function that prompts and reads input from the standard input device (keyboard). It ALWAYS returns the entered data as a string (str), even if digits were typed.',
    exampleVi: 'n = input("Nhập tên: ") nhận xâu người dùng gõ vào bàn phím và gán cho biến n.',
    exampleEn: 'n = input("Enter name: ") receives user text from keyboard and stores it into variable n.',
    sgkContext: 'SGK Tin học 10, Trang 97 – Mục 1: Các lệnh vào ra đơn giản.'
  },
  {
    id: 't18-2',
    termVi: 'Lệnh print()',
    termEn: 'print() Function',
    ipa: '/prɪnt ˈfʌŋkʃən/',
    definitionVi: 'Lệnh xuất dữ liệu ra thiết bị ra chuẩn (màn hình). Có thể in đồng thời nhiều giá trị, biến, xâu hoặc biểu thức tính toán ngăn cách nhau bởi dấu phẩy.',
    definitionEn: 'A standard output function that displays data onto the screen. Can output multiple variables, literals, and mathematical expressions separated by commas.',
    exampleVi: 'print("Tổng ba số đã nhập là", m + n + p) in dòng chữ kèm kết quả tổng ra màn hình.',
    exampleEn: 'print("Sum is", m + n + p) displays prompt text alongside the computed sum.',
    sgkContext: 'SGK Tin học 10, Trang 97 – Mục 1 & Trang 100.'
  },
  {
    id: 't18-3',
    termVi: 'Lệnh type()',
    termEn: 'type() Function',
    ipa: '/taɪp ˈfʌŋkʃən/',
    definitionVi: 'Hàm dùng để nhận biết và trả về kiểu dữ liệu thực tế của biến hoặc giá trị biểu thức trong Python (ví dụ <class \'int\'>, <class \'float\'>, <class \'str\'>, <class \'bool\'>).',
    definitionEn: 'A built-in inspection function that returns the data type class of any given variable or expression in Python.',
    exampleVi: 'type(10) trả về <class \'int\'>; type(3 > 2) trả về <class \'bool\'>.',
    exampleEn: 'type(10) returns <class \'int\'>; type(3 > 2) returns <class \'bool\'>.',
    sgkContext: 'SGK Tin học 10, Trang 98 – Hoạt động 2.'
  },
  {
    id: 't18-4',
    termVi: 'Kiểu lôgic (bool)',
    termEn: 'Boolean Data Type (bool)',
    ipa: '/ˈbuːliən ˈdeɪtə taɪp/',
    definitionVi: 'Kiểu dữ liệu cơ bản chỉ có đúng hai giá trị là True (đúng) và False (sai), thường là kết quả của các phép so sánh toán học như >, <, ==, !=, >=, <=.',
    definitionEn: 'A primitive data type having exactly two truth values: True and False, commonly produced by logical comparisons and relational operations.',
    exampleVi: '32 > 45 cho kết quả False; 13 != 8 + 5 cho kết quả False vì 13 == 13.',
    exampleEn: '32 > 45 yields False; 13 != 8 + 5 yields False since 13 equals 13.',
    sgkContext: 'SGK Tin học 10, Trang 98 – Kiểu dữ liệu lôgic.'
  },
  {
    id: 't18-5',
    termVi: 'Ép kiểu int()',
    termEn: 'int() Type Conversion',
    ipa: '/ˈɪntɪdʒər kənˈvɜːrʒən/',
    definitionVi: 'Hàm chuyển đổi số thực hoặc xâu chứa số nguyên thành số nguyên. Lưu ý: int() sẽ báo lỗi ValueError nếu xâu chứa số thực như "10.35" hoặc biểu thức toán như "12+45".',
    definitionEn: 'Converts a float (truncating decimals) or a clean numeric string representing an integer into an integer type. Raises ValueError if given decimal strings or expressions.',
    exampleVi: 'int(12.6) cho kết quả 12; int("123") cho kết quả 123; int("10.35") báo lỗi ValueError.',
    exampleEn: 'int(12.6) yields 12; int("123") yields 123; int("10.35") raises ValueError.',
    sgkContext: 'SGK Tin học 10, Trang 99 – Các hàm chuyển đổi kiểu.'
  },
  {
    id: 't18-6',
    termVi: 'Ép kiểu float()',
    termEn: 'float() Type Conversion',
    ipa: '/floʊt kənˈvɜːrʒən/',
    definitionVi: 'Hàm chuyển đổi số nguyên hoặc xâu chứa số thành số thực. Chỉ chuyển đổi các xâu ghi giá trị số trực tiếp, không chuyển đổi xâu chứa công thức toán.',
    definitionEn: 'Converts an integer or a numeric string into a floating-point number. Only converts direct numeric literals, not expressions.',
    exampleVi: 'float(8) thành 8.0; float("10.23") thành 10.23; float("123,5.5") báo lỗi.',
    exampleEn: 'float(8) becomes 8.0; float("10.23") becomes 10.23; float("123,5.5") throws an error.',
    sgkContext: 'SGK Tin học 10, Trang 99 – Hàm float().'
  },
  {
    id: 't18-7',
    termVi: 'Ép kiểu str()',
    termEn: 'str() Type Conversion',
    ipa: '/strɪŋ kənˈvɜːrʒən/',
    definitionVi: 'Hàm chuyển đổi bất kỳ giá trị nào (số nguyên, số thực, giá trị logic bool, biểu thức) thành dạng xâu kí tự để ghép nối hoặc in ấn.',
    definitionEn: 'Converts any data value (integer, float, boolean, expression result) into its string textual representation.',
    exampleVi: 'str(12+34) trả về \'46\'; str(2 > 3) trả về \'False\'; str(150) trả về \'150\'.',
    exampleEn: 'str(12+34) returns \'46\'; str(2 > 3) returns \'False\'; str(150) returns \'150\'.',
    sgkContext: 'SGK Tin học 10, Trang 99 – Hàm str().'
  },
  {
    id: 't18-8',
    termVi: 'Lỗi ValueError',
    termEn: 'ValueError Exception',
    ipa: '/ˈvæljuː ˈɛrər/',
    definitionVi: 'Lỗi phát sinh khi một hàm nhận tham số có kiểu dữ liệu đúng (ví dụ chuỗi kí tự cho hàm int) nhưng giá trị nội dung không hợp lệ để chuyển đổi (như xâu số thập phân hoặc biểu thức toán).',
    definitionEn: 'A runtime error raised when an operation receives an argument that has the right type but an inappropriate value, such as converting "10.35" or "12+45" with int().',
    exampleVi: 'int("12+45") gây lỗi ValueError: invalid literal for int() with base 10: \'12+45\'.',
    exampleEn: 'int("12+45") raises ValueError: invalid literal for int() with base 10: \'12+45\'.',
    sgkContext: 'SGK Tin học 10, Trang 99 – Lỗi ValueError và Chú ý quan trọng.'
  },
  {
    id: 't18-9',
    termVi: 'Lồng lệnh int(input()) & float(input())',
    termEn: 'Nested input() Conversion',
    ipa: '/ˈnɛstɪd ˈɪnpʊt kənˈvɜːrʒən/',
    definitionVi: 'Kĩ thuật lồng hàm chuyển kiểu bao bọc quanh input() để đọc và chuyển đổi ngay giá trị người dùng nhập từ bàn phím từ xâu sang số nguyên hoặc số thực phục vụ tính toán.',
    definitionEn: 'The standard idiom of wrapping input() inside int() or float() to directly convert raw string keyboard input into numeric values for calculation.',
    exampleVi: 'tuoi = int(input("Nhập tuổi: ")) nhận xâu từ bàn phím và ép ngay thành số nguyên.',
    exampleEn: 'age = int(input("Enter age: ")) takes keyboard string and casts directly to integer.',
    sgkContext: 'SGK Tin học 10, Trang 100 – Hoạt động 4 & Thực hành.'
  },
  {
    id: 't18-10',
    termVi: 'Công thức Heron',
    termEn: 'Heron\'s Formula',
    ipa: '/ˈhɛrənz ˈfɔːrmjələ/',
    definitionVi: 'Công thức toán học tính diện tích tam giác S = sqrt(p*(p-a)*(p-b)*(p-c)) với a, b, c là độ dài 3 cạnh thoả mãn bất đẳng thức tam giác và p = (a+b+c)/2 là nửa chu vi.',
    definitionEn: 'A mathematical formula giving the area of a triangle S = sqrt(p*(p-a)*(p-b)*(p-c)) where a, b, c are side lengths satisfying triangle inequality and p = (a+b+c)/2 is semi-perimeter.',
    exampleVi: 'Trong Python: S = (p * (p - a) * (p - b) * (p - c)) ** 0.5',
    exampleEn: 'In Python: S = (p * (p - a) * (p - b) * (p - c)) ** 0.5',
    sgkContext: 'SGK Tin học 10, Trang 100 – Vận dụng Bài 2.'
  }
];

export const LESSON_18_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: 'Dữ liệu nhập từ bàn phím bằng câu lệnh input() trong Python luôn trả về giá trị thuộc kiểu dữ liệu nào?',
    questionEn: 'Data entered from the keyboard using the input() function in Python always returns a value of which data type?',
    optionsVi: [
      'Kiểu xâu kí tự (str), kể cả khi người dùng nhập các chữ số',
      'Kiểu số nguyên (int) nếu gõ số nguyên',
      'Kiểu số thực (float) nếu gõ số có dấu chấm',
      'Tự động nhận biết kiểu dữ liệu tương ứng với nội dung gõ'
    ],
    optionsEn: [
      'String (str), even if the user types numeric digits',
      'Integer (int) if typing whole numbers',
      'Float (float) if typing numbers with decimals',
      'Automatically detects data type based on typed content'
    ],
    correctIndex: 0,
    explanationVi: 'Theo SGK Tin học 10 Trang 97 (Mục 1 & Hoạt động 1): Lệnh input() có chức năng nhập dữ liệu từ bàn phím và CHO KẾT QUẢ LUÔN LÀ MỘT XÂU KÍ TỰ (str). Muốn dùng cho tính toán, bắt buộc phải ép kiểu bằng int() hoặc float().',
    explanationEn: 'According to page 97 of the textbook: input() always returns a string (str). To use it in calculations, explicit casting via int() or float() is required.'
  },
  {
    id: 2,
    questionVi: 'Để kiểm tra và nhận biết kiểu dữ liệu của một biến x trong Python, ta sử dụng câu lệnh nào?',
    questionEn: 'To inspect and determine the data type of a variable x in Python, which statement do we use?',
    optionsVi: [
      'type(x)',
      'datatype(x)',
      'typeof(x)',
      'check(x)'
    ],
    optionsEn: [
      'type(x)',
      'datatype(x)',
      'typeof(x)',
      'check(x)'
    ],
    correctIndex: 0,
    explanationVi: 'Theo SGK Trang 98 (Hộp Ghi nhớ 2A): Lệnh type() dùng để nhận biết kiểu dữ liệu của biến hoặc biểu thức trong Python (ví dụ: type(10) -> <class \'int\'>).',
    explanationEn: 'According to page 98: The type() function is used to inspect the data type of a variable or expression in Python.'
  },
  {
    id: 3,
    questionVi: 'Biểu thức "15 + 20 - 7" (được đặt trong cặp dấu nháy kép) trong Python có kiểu dữ liệu và giá trị là gì?',
    questionEn: 'What are the data type and value of the expression "15 + 20 - 7" (enclosed in double quotes) in Python?',
    optionsVi: [
      'Kiểu str, giá trị là xâu kí tự "15 + 20 - 7"',
      'Kiểu int, giá trị là 28',
      'Kiểu float, giá trị là 28.0',
      'Bị báo lỗi SyntaxError vì chứa phép cộng trừ'
    ],
    optionsEn: [
      'Type str, value is string "15 + 20 - 7"',
      'Type int, value is 28',
      'Type float, value is 28.0',
      'SyntaxError because it contains plus/minus operators'
    ],
    correctIndex: 0,
    explanationVi: 'Theo câu hỏi kiểm tra SGK Trang 98: Bất kỳ nội dung nào đặt trong cặp dấu nháy đơn (\'\') hoặc kép ("") đều được Python coi là xâu kí tự (str) nguyên văn, không thực hiện tính toán số học.',
    explanationEn: 'Any expression wrapped inside quotation marks is treated as a literal string (str) without arithmetic evaluation.'
  },
  {
    id: 4,
    questionVi: 'Giá trị và kiểu dữ liệu của biểu thức so sánh 13 != 8 + 5 trong Python là gì?',
    questionEn: 'What are the value and data type of the comparison expression 13 != 8 + 5 in Python?',
    optionsVi: [
      'False, thuộc kiểu bool',
      'True, thuộc kiểu bool',
      'True, thuộc kiểu int',
      'Lỗi không thể so sánh số với phép toán'
    ],
    optionsEn: [
      'False, type bool',
      'True, type bool',
      'True, type int',
      'Error cannot compare number with operation'
    ],
    correctIndex: 0,
    explanationVi: 'Theo SGK Trang 98: Phép toán cộng được ưu tiên trước: 8 + 5 = 13. Phép so sánh khác (!=) kiểm tra: 13 != 13 là Sai (False), kết quả thuộc kiểu lôgic bool.',
    explanationEn: 'Arithmetic addition takes precedence: 8 + 5 = 13. Then 13 != 13 evaluates to False with type bool.'
  },
  {
    id: 5,
    questionVi: 'Khi thực hiện lệnh int("12.0") trong Python, kết quả nhận được sẽ là gì?',
    questionEn: 'When executing the statement int("12.0") in Python, what will be the result?',
    optionsVi: [
      'Báo lỗi ValueError (invalid literal for int() with base 10: \'12.0\')',
      'Số nguyên 12',
      'Số thực 12.0',
      'Xâu kí tự "12"'
    ],
    optionsEn: [
      'Raises ValueError (invalid literal for int() with base 10: \'12.0\')',
      'Integer 12',
      'Float 12.0',
      'String "12"'
    ],
    correctIndex: 0,
    explanationVi: 'Theo SGK Trang 99 (Câu hỏi củng cố 2 & Chú ý): Lệnh int() chỉ có thể chuyển đổi các xâu ghi giá trị số nguyên trực tiếp (như "123"). Xâu "12.0" chứa dấu chấm thập phân nên int() không thể ép kiểu trực tiếp và sẽ báo lỗi ValueError. Nếu muốn chuyển phải dùng int(float("12.0")).',
    explanationEn: 'According to page 99: int() can only parse strings representing pure integers. Strings containing decimal points like "12.0" trigger a ValueError.'
  },
  {
    id: 6,
    questionVi: 'Khi thực hiện lệnh int("12+45") trong Python, vì sao lại xuất hiện thông báo lỗi ValueError?',
    questionEn: 'When executing int("12+45") in Python, why does a ValueError occur?',
    optionsVi: [
      'Vì int() chỉ chuyển đổi xâu ghi giá trị số trực tiếp, không chuyển đổi xâu chứa công thức/biểu thức toán',
      'Vì phép cộng trong xâu kí tự không hợp lệ',
      'Vì số 45 lớn hơn số 12',
      'Vì thiếu dấu cách quanh dấu cộng'
    ],
    optionsEn: [
      'Because int() only converts strings with direct numeric digits, not strings containing formulas or expressions',
      'Because plus operator inside string is invalid',
      'Because 45 is greater than 12',
      'Because spaces are missing around the plus sign'
    ],
    correctIndex: 0,
    explanationVi: 'Theo SGK Trang 99 (Chú ý quan trọng): Các lệnh int(), float() chỉ có thể chuyển đổi các xâu ghi giá trị số trực tiếp, không chuyển đổi xâu có công thức. int("12+45") chứa dấu \'+\' không phải là chữ số hợp lệ của số nguyên cơ số 10.',
    explanationEn: 'According to textbook page 99: int() and float() only parse literal numeric strings and do not evaluate mathematical formulas inside strings.'
  },
  {
    id: 7,
    questionVi: 'Để nhập một số nguyên n từ bàn phím phục vụ cho việc tính toán số học, cách viết nào sau đây là ĐÚNG chuẩn SGK?',
    questionEn: 'To input an integer n from the keyboard for arithmetic computation, which syntax is textbook-compliant?',
    optionsVi: [
      'n = int(input("Nhập số tự nhiên n: "))',
      'n = input(int("Nhập số tự nhiên n: "))',
      'n = input("Nhập số tự nhiên n: ")',
      'n = int(print("Nhập số tự nhiên n: "))'
    ],
    optionsEn: [
      'n = int(input("Enter natural number n: "))',
      'n = input(int("Enter natural number n: "))',
      'n = input("Enter natural number n: ")',
      'n = int(print("Enter natural number n: "))'
    ],
    correctIndex: 0,
    explanationVi: 'Theo SGK Trang 100 (Mục Thực hành & Hướng dẫn): Vì input() luôn trả về chuỗi str, ta phải lồng hàm int() bao bọc bên ngoài input(): n = int(input("Dòng thông báo")).',
    explanationEn: 'Wrapping input() inside int() casts the user string immediately into an integer: n = int(input(...)).'
  },
  {
    id: 8,
    questionVi: 'Trong các lệnh sau đây, lệnh nào KHÔNG bị báo lỗi khi chạy?',
    questionEn: 'Among the following statements, which one executes WITHOUT raising an error?',
    optionsVi: [
      'float(13 + 1)',
      'int("12+45")',
      'int("10.35")',
      'float("123,5.5")'
    ],
    optionsEn: [
      'float(13 + 1)',
      'int("12+45")',
      'int("10.35")',
      'float("123,5.5")'
    ],
    correctIndex: 0,
    explanationVi: 'Theo SGK Trang 99 (Câu 2 củng cố): float(13+1) tính 13+1=14 rồi ép sang số thực thành 14.0 (hợp lệ). Các phương án còn lại đều bị ValueError vì xâu chứa biểu thức ("12+45"), xâu số thực đưa vào int ("10.35"), hoặc xâu chứa dấu phẩy không hợp lệ ("123,5.5").',
    explanationEn: 'float(13 + 1) calculates 14 and yields 14.0 cleanly. All other options trigger ValueError.'
  },
  {
    id: 9,
    questionVi: 'Để đổi tổng số giây ss nhập từ bàn phím ra số ngày, số giờ, số phút và số giây còn lại (Bài 1 Vận dụng trang 100), công thức tính số ngày (ngay) là gì?',
    questionEn: 'To convert total seconds ss into days, hours, minutes, and remaining seconds (Application 1 page 100), what is the formula for days (ngay)?',
    optionsVi: [
      'ngay = ss // 86400 (vì 1 ngày có 24 * 3600 = 86400 giây)',
      'ngay = ss % 86400',
      'ngay = ss // 3600',
      'ngay = ss / 86400'
    ],
    optionsEn: [
      'ngay = ss // 86400 (since 1 day has 24 * 3600 = 86400 seconds)',
      'ngay = ss % 86400',
      'ngay = ss // 3600',
      'ngay = ss / 86400'
    ],
    correctIndex: 0,
    explanationVi: 'Theo SGK Trang 100 (Vận dụng 1): 1 ngày = 24 giờ * 3600 giây = 86400 giây. Số ngày trọn vẹn được tính bằng phép chia lấy thương nguyên //: ngay = ss // 86400; phần giây còn lại tính bằng ss = ss % 86400.',
    explanationEn: '1 day = 86400 seconds. The full integer day count uses floor division: ngay = ss // 86400.'
  },
  {
    id: 10,
    questionVi: 'Trong công thức Heron tính diện tích tam giác S = sqrt(p*(p-a)*(p-b)*(p-c)) (Bài 2 Vận dụng trang 100), đại lượng p là gì và được tính như thế nào trong Python?',
    questionEn: 'In Heron\'s formula for triangle area S = sqrt(p*(p-a)*(p-b)*(p-c)) (Application 2 page 100), what is p and how is it calculated in Python?',
    optionsVi: [
      'p là nửa chu vi tam giác: p = (a + b + c) / 2',
      'p là chu vi toàn phần: p = a + b + c',
      'p là tích ba cạnh: p = a * b * c / 2',
      'p là cạnh dài nhất của tam giác: p = max(a, b, c)'
    ],
    optionsEn: [
      'p is semi-perimeter: p = (a + b + c) / 2',
      'p is total perimeter: p = a + b + c',
      'p is product of 3 sides: p = a * b * c / 2',
      'p is the longest side: p = max(a, b, c)'
    ],
    correctIndex: 0,
    explanationVi: 'Theo gợi ý SGK Trang 100 (Vận dụng 2): "Gợi ý: Công thức Heron tính diện tích tam giác: S = sqrt(p(p-a)(p-b)(p-c)) với p là nửa chu vi tam giác". Trong Python: p = (a + b + c) / 2, và S = (p*(p-a)*(p-b)*(p-c))**0.5.',
    explanationEn: 'Heron\'s formula defines p as the semi-perimeter: p = (a + b + c) / 2. In Python, square root can be computed as ** 0.5.'
  }
];
