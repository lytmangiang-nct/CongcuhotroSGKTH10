import { QuizQuestion } from './lesson2Data';
import { TermDefinition } from './lessonData';

export const LESSON_29_GLOSSARY: TermDefinition[] = [
  {
    id: 't29-1',
    termVi: 'Lỗi cú pháp (Syntax Error)',
    termEn: 'Syntax Error',
    ipa: '/ˈsɪn.tæks ˈer.ər/',
    definitionVi: 'Lỗi xảy ra khi câu lệnh viết sai quy tắc ngữ pháp hoặc cấu trúc của ngôn ngữ Python. Trình thông dịch phát hiện và dừng chương trình ngay trước khi thực thi.',
    definitionEn: 'Error occurring when statements violate Python grammatical rules or structure. The interpreter halts execution before running the code.',
    exampleVi: 'while True print("Hello") -> Thiếu dấu hai chấm ":" và thụt lề.',
    exampleEn: 'while True print("Hello") -> SyntaxError: invalid syntax.',
    sgkContext: 'SGK Trang 141 – 142: "Lỗi khi có lệnh viết sai cú pháp hoặc sai cấu trúc ngôn ngữ Python quy định."'
  },
  {
    id: 't29-2',
    termVi: 'Lỗi ngoại lệ / Thời gian chạy (Runtime Error / Exception)',
    termEn: 'Runtime Error / Exception',
    ipa: '/ˈrʌn.taɪm ɪkˈsep.ʃən/',
    definitionVi: 'Lỗi xuất hiện trong quá trình chương trình đang chạy khi gặp một thao tác không thể thực hiện được (như chia cho 0, ép kiểu sai, truy cập chỉ số ngoài phạm vi).',
    definitionEn: 'Error raised during program execution when encountering an impossible operation (e.g., division by zero, invalid casting, out-of-bounds indexing).',
    exampleVi: 'ZeroDivisionError, ValueError, IndexError, TypeError, NameError.',
    exampleEn: 'ZeroDivisionError, ValueError, IndexError, TypeError, NameError.',
    sgkContext: 'SGK Trang 142 (Hộp Ghi nhớ): "Lỗi khi không thể thực hiện một lệnh trong chương trình... mã lỗi trả lại là mã lỗi ngoại lệ."'
  },
  {
    id: 't29-3',
    termVi: 'Lỗi ngữ nghĩa / Lỗi lôgic (Semantic / Logic Error)',
    termEn: 'Semantic / Logic Error',
    ipa: '/sɪˈmæn.tɪk ˈlɒdʒ.ɪk ˈer.ər/',
    definitionVi: 'Chương trình chạy bình thường không phát sinh lỗi ngoại lệ, nhưng kết quả tính toán trả về sai so với yêu cầu bài toán do sai sót trong giải thuật hoặc công thức.',
    definitionEn: 'The program runs smoothly without runtime exceptions, but the computed output is incorrect due to algorithmic flaws or incorrect mathematical logic.',
    exampleVi: 'for i in range(3): s += i -> s = 0+1+2 = 3 thay vì 1+2+3 = 6.',
    exampleEn: 'range(3) produces 0, 1, 2 instead of 1, 2, 3 resulting in wrong sum.',
    sgkContext: 'SGK Trang 142: "Chương trình chạy không lỗi ngoại lệ, nhưng kết quả đưa ra sai, không chính xác."'
  },
  {
    id: 't29-4',
    termVi: 'Lỗi chia cho 0 (ZeroDivisionError)',
    termEn: 'ZeroDivisionError',
    ipa: '/ˈzɪə.rəʊ dɪˈvɪʒ.ən ˈer.ər/',
    definitionVi: 'Mã lỗi ngoại lệ xảy ra khi thực hiện phép toán chia số học (/, //, %) với số chia bằng 0.',
    definitionEn: 'Exception raised when executing an arithmetic division operation (/, //, %) with a divisor equal to zero.',
    exampleVi: '10 / 0 -> ZeroDivisionError: division by zero.',
    exampleEn: '10 / 0 -> ZeroDivisionError: division by zero.',
    sgkContext: 'SGK Trang 143 (Bảng lỗi ngoại lệ): "Lỗi này xảy ra khi lệnh thực hiện phép chia cho giá trị 0."'
  },
  {
    id: 't29-5',
    termVi: 'Lỗi chỉ số vượt quá giới hạn (IndexError)',
    termEn: 'IndexError',
    ipa: '/ˈɪn.deks ˈer.ər/',
    definitionVi: 'Lỗi ngoại lệ khi cố gắng truy cập phần tử trong danh sách hoặc xâu kí tự tại vị trí chỉ số không tồn tại.',
    definitionEn: 'Exception raised when attempting to access a list element or string character at an out-of-range index.',
    exampleVi: 'A = [1, 2]; print(A[5]) -> IndexError: list index out of range.',
    exampleEn: 'A = [1, 2]; print(A[5]) -> IndexError: list index out of range.',
    sgkContext: 'SGK Trang 143: "Lỗi xảy ra khi lệnh cố gắng truy cập phần tử của danh sách nhưng chỉ số vượt quá giới hạn."'
  },
  {
    id: 't29-6',
    termVi: 'Lỗi biến/hàm chưa định nghĩa (NameError)',
    termEn: 'NameError',
    ipa: '/neɪm ˈer.ər/',
    definitionVi: 'Lỗi ngoại lệ khi chương trình cố gắng sử dụng một định danh (biến, hàm) chưa được gán giá trị hoặc nằm ngoài phạm vi truy cập.',
    definitionEn: 'Exception raised when attempting to evaluate an identifier (variable or function) that is not defined in the current scope.',
    exampleVi: 'print(total) khi chưa gán total = 0.',
    exampleEn: 'print(total) -> NameError: name "total" is not defined.',
    sgkContext: 'SGK Trang 143: "Lỗi xảy ra khi chương trình muốn tìm một tên nhưng không thấy."'
  },
  {
    id: 't29-7',
    termVi: 'Lỗi kiểu dữ liệu (TypeError)',
    termEn: 'TypeError',
    ipa: '/taɪp ˈer.ər/',
    definitionVi: 'Lỗi ngoại lệ xảy ra khi thao tác hoặc hàm được áp dụng cho một đối tượng có kiểu dữ liệu không thích hợp.',
    definitionEn: 'Exception raised when an operation or function is applied to an object of inappropriate data type.',
    exampleVi: 'A[1.5] (chỉ số float) hoặc "10" * 3.5.',
    exampleEn: 'A[1.5] -> TypeError: list indices must be integers or slices, not float.',
    sgkContext: 'SGK Trang 143: "Lỗi kiểu dữ liệu: truy cập phần tử bằng chỉ số không là số nguyên, hoặc biểu thức có toán hạng không phải số."'
  },
  {
    id: 't29-8',
    termVi: 'Lỗi giá trị (ValueError)',
    termEn: 'ValueError',
    ipa: '/ˈvæl.juː ˈer.ər/',
    definitionVi: 'Lỗi ngoại lệ xảy ra khi hàm nhận được đối số đúng kiểu dữ liệu nhưng mang giá trị không phù hợp để xử lý.',
    definitionEn: 'Exception raised when a function receives an argument that has the right type but an inappropriate value.',
    exampleVi: 'int("1.55") hoặc int("abc") -> ValueError.',
    exampleEn: 'int("1.55") -> ValueError: invalid literal for int() with base 10.',
    sgkContext: 'SGK Trang 143: "Lỗi liên quan đến giá trị của đối tượng... đối số của hàm có giá trị mà hàm không hỗ trợ."'
  },
  {
    id: 't29-9',
    termVi: 'Lỗi thụt lề (IndentationError)',
    termEn: 'IndentationError',
    ipa: '/ˌɪn.denˈteɪ.ʃən ˈer.ər/',
    definitionVi: 'Lỗi con của cú pháp khi các dòng lệnh bên trong khối lệnh không thẳng hàng hoặc thụt lề sai quy cách.',
    definitionEn: 'A syntax error subclass raised when indentation levels in statement blocks are misaligned or incorrect.',
    exampleVi: 'if True:\nprint("Hi") -> IndentationError: expected an indented block.',
    exampleEn: 'if True:\nprint("Hi") -> IndentationError.',
    sgkContext: 'SGK Trang 143: "Lỗi khi các dòng lệnh thụt vào không thẳng hàng hoặc không đúng vị trí."'
  },
  {
    id: 't29-10',
    termVi: 'Lần vết lỗi (Traceback)',
    termEn: 'Traceback',
    ipa: '/ˈtreɪs.bæk/',
    definitionVi: 'Bản ghi thông tin do Python tự động in ra khi xảy ra lỗi ngoại lệ, chỉ rõ tệp, dòng lệnh và ngăn xếp gọi hàm dẫn đến lỗi.',
    definitionEn: 'Diagnostic report printed by Python when an unhandled exception occurs, showing file, line number, and call stack history.',
    exampleVi: 'Traceback (most recent call last): File "main.py", line 3...',
    exampleEn: 'Traceback (most recent call last): File "main.py", line 3...',
    sgkContext: 'SGK Trang 141 – 142: Khung thông báo lỗi chuẩn của Python khi phát sinh ngoại lệ.'
  }
];

export const LESSON_29_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: 'Theo SGK Tin học 10 (Trang 142), lỗi chương trình trong Python được phân thành mấy loại chính?',
    questionEn: 'According to Informatics 10 Textbook (Page 142), how many main categories are Python program errors classified into?',
    optionsVi: [
      '2 loại: Lỗi cú pháp và Lỗi ngoại lệ',
      '3 loại: Lỗi cú pháp, Lỗi ngoại lệ (thời gian chạy) và Lỗi lôgic (ngữ nghĩa)',
      '4 loại: Lỗi cú pháp, Lỗi biến, Lỗi mảng và Lỗi hệ điều hành',
      'Chỉ có 1 loại duy nhất là lỗi thời gian chạy'
    ],
    optionsEn: [
      '2 types: Syntax Errors and Exceptions',
      '3 types: Syntax Errors, Exceptions (Runtime), and Logic (Semantic) Errors',
      '4 types: Syntax, Variable, Array, and OS Errors',
      'Only 1 type: Runtime Errors'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 142 nêu rõ: Tổng thể có thể phân biệt lỗi chương trình Python làm 3 loại: 1. Lỗi cú pháp (Syntax Error); 2. Lỗi ngoại lệ (Exceptions Error / Runtime); 3. Lỗi lôgic bên trong chương trình.',
    explanationEn: 'Textbook page 142 clearly categorizes Python errors into 3 types: Syntax Error, Exception (Runtime Error), and Logic / Semantic Error.'
  },
  {
    id: 2,
    questionVi: 'Khi người lập trình gõ dòng lệnh "while True print(\'Hello\')", chương trình dừng lại và thông báo loại lỗi nào?',
    questionEn: 'When a programmer writes "while True print(\'Hello\')", the program halts and raises which error?',
    optionsVi: [
      'SyntaxError: invalid syntax',
      'ZeroDivisionError',
      'NameError: name is not defined',
      'ValueError: invalid literal'
    ],
    optionsEn: [
      'SyntaxError: invalid syntax',
      'ZeroDivisionError',
      'NameError: name is not defined',
      'ValueError: invalid literal'
    ],
    correctIndex: 0,
    explanationVi: 'Câu lệnh `while True` thiếu dấu hai chấm `:` và khối lệnh phía sau không được xuống dòng thụt lề, vi phạm cú pháp ngôn ngữ nên Python báo SyntaxError ngay trước khi chạy.',
    explanationEn: 'Missing colon `:` and indentation after `while True` violates Python syntax rules, causing SyntaxError before runtime.'
  },
  {
    id: 3,
    questionVi: 'Lệnh n = int(input()) khi người dùng nhập vào số thực 1.5 sẽ sinh ra mã lỗi ngoại lệ nào?',
    questionEn: 'What exception is raised when executing n = int(input()) and the user enters 1.5?',
    optionsVi: [
      'TypeError',
      'ValueError',
      'IndexError',
      'ZeroDivisionError'
    ],
    optionsEn: [
      'TypeError',
      'ValueError',
      'IndexError',
      'ZeroDivisionError'
    ],
    correctIndex: 1,
    explanationVi: 'Hàm int() chỉ chuyển đổi được các xâu chứa chữ số nguyên. Xâu "1.5" chứa dấu chấm thập phân nên hàm int() báo lỗi ValueError: invalid literal for int() with base 10: "1.5".',
    explanationEn: 'int() only converts integer digit strings. The string "1.5" contains a decimal dot, raising ValueError: invalid literal for int().'
  },
  {
    id: 4,
    questionVi: 'Đoạn chương trình: A = [1, 3, 10, 0]; for i in range(5): print(A[i]) sẽ gặp lỗi ngoại lệ nào khi i = 4?',
    questionEn: 'Which exception will occur when i = 4 in: A = [1, 3, 10, 0]; for i in range(5): print(A[i])?',
    optionsVi: [
      'IndexError: list index out of range',
      'KeyError: 4',
      'IndentationError',
      'SyntaxError'
    ],
    optionsEn: [
      'IndexError: list index out of range',
      'KeyError: 4',
      'IndentationError',
      'SyntaxError'
    ],
    correctIndex: 0,
    explanationVi: 'Danh sách A có 4 phần tử với các chỉ số hợp lệ là 0, 1, 2, 3. Khi vòng lặp chạy đến i = 4, truy cập A[4] vượt quá độ dài danh sách nên sinh lỗi IndexError: list index out of range.',
    explanationEn: 'List A has 4 elements with indices 0, 1, 2, 3. Accessing A[4] is beyond the bounds, triggering IndexError: list index out of range.'
  },
  {
    id: 5,
    questionVi: 'Một chương trình yêu cầu tính tổng 3 số nguyên dương đầu tiên (1+2+3=6), nhưng lập trình viên viết "for i in range(3): s += i" cho ra kết quả s = 3. Đây là loại lỗi gì?',
    questionEn: 'A program intended to sum first 3 positive integers (1+2+3=6) was written as "for i in range(3): s += i" giving s = 3. What kind of error is this?',
    optionsVi: [
      'Lỗi cú pháp (Syntax Error)',
      'Lỗi ngoại lệ thời gian chạy (Runtime Error)',
      'Lỗi lôgic (ngữ nghĩa) bên trong chương trình',
      'Lỗi phần cứng máy tính'
    ],
    optionsEn: [
      'Syntax Error',
      'Runtime Exception',
      'Logic (Semantic) Error',
      'Hardware malfunction'
    ],
    correctIndex: 2,
    explanationVi: 'Chương trình chạy hoàn chỉnh không có lỗi cú pháp hay ngoại lệ dừng chương trình, nhưng kết quả tính toán sai do hàm range(3) sinh ra dãy 0, 1, 2. Đây chính là lỗi lôgic.',
    explanationEn: 'The program runs smoothly without stopping, but produces incorrect output because range(3) produces 0, 1, 2. This is a classic logic error.'
  },
  {
    id: 6,
    questionVi: 'Câu lệnh truy cập phần tử A[1.5] vào danh sách A sẽ sinh ra mã lỗi nào?',
    questionEn: 'What exception is raised when executing A[1.5] on a list A?',
    optionsVi: [
      'TypeError: list indices must be integers or slices, not float',
      'ValueError: invalid index',
      'IndexError: index out of bounds',
      'ZeroDivisionError'
    ],
    optionsEn: [
      'TypeError: list indices must be integers or slices, not float',
      'ValueError: invalid index',
      'IndexError: index out of bounds',
      'ZeroDivisionError'
    ],
    correctIndex: 0,
    explanationVi: 'Chỉ số danh sách trong Python bắt buộc phải là số nguyên (int). Giá trị 1.5 là số thực (float) nên Python báo lỗi TypeError.',
    explanationEn: 'List indices in Python must be integers. Using float 1.5 raises TypeError.'
  },
  {
    id: 7,
    questionVi: 'Phép tính "10" * 3.5 trong Python sẽ sinh ra lỗi gì?',
    questionEn: 'What error does "10" * 3.5 produce in Python?',
    optionsVi: [
      'SyntaxError',
      'TypeError: can\'t multiply sequence by non-int of type \'float\'',
      'ValueError: float multiplication',
      'Trả về kết quả "35"'
    ],
    optionsEn: [
      'SyntaxError',
      'TypeError: can\'t multiply sequence by non-int of type \'float\'',
      'ValueError: float multiplication',
      'Returns string "35"'
    ],
    correctIndex: 1,
    explanationVi: 'Xâu kí tự chỉ có thể nhân lặp với số nguyên (int). Phép nhân xâu với số thực float 3.5 bị cấm và gây lỗi TypeError.',
    explanationEn: 'Strings can only be multiplied by integers for repetition. Multiplying by float 3.5 raises TypeError.'
  },
  {
    id: 8,
    questionVi: 'Lệnh gttb = sum(A) / len(A) tính giá trị trung bình của danh sách A có thể sinh ra lỗi ZeroDivisionError trong trường hợp nào?',
    questionEn: 'Under what condition can the statement gttb = sum(A) / len(A) raise ZeroDivisionError?',
    optionsVi: [
      'Khi danh sách A rỗng (A = []), độ dài len(A) = 0',
      'Khi tổng sum(A) = 0',
      'Khi danh sách A chỉ chứa các số 0',
      'Khi danh sách A có nhiều hơn 100 phần tử'
    ],
    optionsEn: [
      'When list A is empty (A = []), causing len(A) == 0',
      'When the sum sum(A) == 0',
      'When list A only contains zeros',
      'When list A has over 100 elements'
    ],
    correctIndex: 0,
    explanationVi: 'Khi danh sách A rỗng, hàm len(A) trả về 0. Phép chia sum(A) cho 0 sẽ kích hoạt ngoại lệ ZeroDivisionError: division by zero.',
    explanationEn: 'If list A is empty, len(A) evaluates to 0, causing division by zero and raising ZeroDivisionError.'
  },
  {
    id: 9,
    questionVi: 'Cho đoạn mã: s1, s2 = "101010", 1010101; s = s1 + s2. Khi thực hiện lệnh s = s1 + s2, Python sẽ báo lỗi gì?',
    questionEn: 'Given: s1, s2 = "101010", 1010101; s = s1 + s2. What error will Python report on s = s1 + s2?',
    optionsVi: [
      'TypeError: can only concatenate str (not "int") to str',
      'ValueError: invalid literal',
      'SyntaxError: cannot add string and number',
      'Tự động cộng thành số 2020111'
    ],
    optionsEn: [
      'TypeError: can only concatenate str (not "int") to str',
      'ValueError: invalid literal',
      'SyntaxError: cannot add string and number',
      'Automatically evaluates to 2020111'
    ],
    correctIndex: 0,
    explanationVi: 'Toán tử `+` giữa xâu `s1` (str) và số nguyên `s2` (int) không tương thích kiểu dữ liệu, Python không tự động ép kiểu và sẽ ném lỗi TypeError.',
    explanationEn: 'Operator `+` between str and int is incompatible in Python, resulting in TypeError.'
  },
  {
    id: 10,
    questionVi: 'Để phát sinh lỗi NameError: name \'x\' is not defined, trường hợp nào sau đây là nguyên nhân trực tiếp?',
    questionEn: 'Which of the following is the direct cause of NameError: name \'x\' is not defined?',
    optionsVi: [
      'Sử dụng biến hoặc hàm x mà trước đó chưa được gán giá trị hay định nghĩa',
      'Truy cập mảng ngoài chỉ số',
      'Chia một số cho 0',
      'Quên viết thụt đầu dòng trong lệnh if'
    ],
    optionsEn: [
      'Using variable or function x before it has been assigned or defined',
      'Out of bound array access',
      'Dividing by zero',
      'Forgetting to indent an if block'
    ],
    correctIndex: 0,
    explanationVi: 'NameError xảy ra khi trình thông dịch tìm kiếm định danh x trong bảng ký hiệu (cục bộ, toàn cục, built-in) nhưng không tìm thấy.',
    explanationEn: 'NameError occurs when Python looks up identifier x in local, global, or built-in namespaces and cannot find it.'
  }
];
