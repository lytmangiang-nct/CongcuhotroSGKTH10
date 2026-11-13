import { QuizQuestion } from './lesson2Data';
import { TermDefinition } from './lessonData';

export const LESSON_24_GLOSSARY: TermDefinition[] = [
  {
    id: 't24-1',
    termVi: 'Xâu kí tự (String)',
    termEn: 'String Data Type',
    ipa: '/strɪŋ/',
    definitionVi: 'Kiểu dữ liệu cơ bản trong Python biểu diễn một dãy các kí tự Unicode đặt trong cặp dấu nháy đơn, nháy kép hoặc ba dấu nháy kép.',
    definitionEn: 'A fundamental data type in Python representing a sequence of Unicode characters enclosed in single, double, or triple quotes.',
    exampleVi: 's = "Thời khoá biểu"',
    exampleEn: 's = "Hello World"',
    sgkContext: 'SGK Tin học 10 Kết nối tri thức - Trang 119: "Một xâu kí tự được hiểu là một dãy các kí tự... Xâu kí tự trong Python là dãy các kí tự Unicode."'
  },
  {
    id: 't24-2',
    termVi: 'Tính bất biến của xâu (Immutability)',
    termEn: 'String Immutability',
    ipa: '/ɪˌmjuːtəˈbɪlɪti/',
    definitionVi: 'Đặc tính không thể thay đổi từng phần tử hoặc kí tự riêng lẻ của một xâu sau khi đã tạo; việc gán s[0] = "A" sẽ gây ra lỗi TypeError.',
    definitionEn: 'A property where individual characters cannot be modified in-place; attempting s[0] = "A" raises a TypeError.',
    exampleVi: 's = "abc"; s[0] = "A" -> TypeError: \'str\' object does not support item assignment',
    exampleEn: 'Strings cannot be modified in-place.',
    sgkContext: 'SGK Trang 119 & 120: "Python không cho phép thay đổi từng kí tự của một xâu. Điều này khác với danh sách."'
  },
  {
    id: 't24-3',
    termVi: 'Xâu rỗng (Empty String)',
    termEn: 'Empty String',
    ipa: '/ˈɛmpti strɪŋ/',
    definitionVi: 'Xâu không chứa bất kì kí tự nào, có độ dài bằng 0, được biểu diễn bằng hai dấu nháy liền nhau: "" hoặc \'\'.',
    definitionEn: 'A string with length zero containing no characters, represented by two adjacent quotation marks: "" or \'\'.',
    exampleVi: 'empty = ""; len(empty) -> 0',
    exampleEn: 'empty_str = ""',
    sgkContext: 'SGK Trang 120: "Python không có kiểu dữ liệu kí tự. Kí tự chính là xâu có độ dài 1. Xâu rỗng được định nghĩa: empty = \'\'"'
  },
  {
    id: 't24-4',
    termVi: 'Độ dài của xâu len(s)',
    termEn: 'String Length: len()',
    ipa: '/strɪŋ lɛŋkθ/',
    definitionVi: 'Hàm trả về tổng số lượng các kí tự có trong xâu, bao gồm cả dấu cách, dấu câu và các kí tự đặc biệt.',
    definitionEn: 'Built-in function returning the total count of characters in a string, including spaces, punctuation, and symbols.',
    exampleVi: 'len("Thời khoá biểu") -> 14',
    exampleEn: 'len("Python") -> 6',
    sgkContext: 'SGK Trang 119: "Lệnh len() sẽ tính độ dài của xâu hay số lượng các kí tự có trong xâu."'
  },
  {
    id: 't24-5',
    termVi: 'Chỉ số của xâu (Zero-based Indexing)',
    termEn: 'String Character Indexing',
    ipa: '/ˈɪndɛksɪŋ/',
    definitionVi: 'Vị trí đánh số thứ tự của từng kí tự trong xâu, bắt đầu từ 0 cho kí tự đầu tiên đến len(s) - 1 cho kí tự cuối cùng.',
    definitionEn: 'Zero-based position of each character within a string sequence, ranging from 0 to len(s) - 1.',
    exampleVi: 's = "Thời khoá biểu"; s[0] -> \'T\'; s[10] -> \'b\'',
    exampleEn: 'word[0]',
    sgkContext: 'SGK Trang 119 & 120: "Có thể truy cập từng kí tự của xâu thông qua chỉ số. Chỉ số bắt đầu từ 0 đến độ dài len() - 1."'
  },
  {
    id: 't24-6',
    termVi: 'Duyệt xâu theo chỉ số (Indexed Traversal)',
    termEn: 'Index-based String Traversal',
    ipa: '/ˈɪndɛkst trəˈvɜːrsəl/',
    definitionVi: 'Cách duyệt qua từng kí tự của xâu bằng vòng lặp "for i in range(len(s)):", truy cập kí tự bằng s[i].',
    definitionEn: 'Iterating through character indices using range(len(s)), accessing characters via s[i].',
    exampleVi: 'for i in range(len(s)): print(s[i], end=" ")',
    exampleEn: 'for i in range(len(s)): process(s[i])',
    sgkContext: 'SGK Trang 120: "Cách thứ nhất, biến i lần lượt chạy theo chỉ số của xâu kí tự s, từ 0 đến len(s) - 1. Kí tự tại chỉ số i là s[i]."'
  },
  {
    id: 't24-7',
    termVi: 'Duyệt xâu theo kí tự (Direct Character Traversal)',
    termEn: 'Direct Character Traversal',
    ipa: '/dɪˈrɛkt ˈkærɪktər trəˈvɜːrsəl/',
    definitionVi: 'Cách duyệt trực tiếp từng kí tự bằng vòng lặp "for ch in s:", biến ch lần lượt nhận giá trị từng kí tự của xâu từ đầu đến cuối mà không cần range().',
    definitionEn: 'Direct iteration over characters using "for ch in s:", where variable ch sequentially takes each character from start to end.',
    exampleVi: 'for ch in s: print(ch, end=" ")',
    exampleEn: 'for ch in text: print(ch)',
    sgkContext: 'SGK Trang 120: "Cách thứ hai duyệt theo từng kí tự của xâu s. Biến ch sẽ được gán lần lượt các kí tự của xâu s từ đầu đến cuối."'
  },
  {
    id: 't24-8',
    termVi: 'Toán tử xâu con in (Substring Membership)',
    termEn: 'Substring Membership Operator',
    ipa: '/ˈsʌbstrɪŋ ˈmɛmbərʃɪp/',
    definitionVi: 'Biểu thức s1 in s2 trả về True nếu xâu s1 xuất hiện như một xâu con liên tiếp bên trong xâu s2, ngược lại trả về False.',
    definitionEn: 'Expression s1 in s2 evaluating to True if string s1 exists as a contiguous substring within s2, otherwise False.',
    exampleVi: '"abc" in "abcd" -> True; "10" in "81723" -> False',
    exampleEn: 'sub in full_text',
    sgkContext: 'SGK Trang 120 & 121: "s1 in s2 trả lại giá trị True nếu s1 là xâu con của s2."'
  },
  {
    id: 't24-9',
    termVi: 'Phép ghép xâu (+)',
    termEn: 'String Concatenation',
    ipa: '/kənˌkætəˈneɪʃən/',
    definitionVi: 'Phép toán nối hai hay nhiều xâu kí tự lại với nhau thành một xâu mới liền mạch bằng toán tử cộng (+).',
    definitionEn: 'Operation linking two or more strings together into a new combined string using the addition (+) operator.',
    exampleVi: 'skq = skq + ch; s1 + s2',
    exampleEn: 'greeting = "Hello " + "World"',
    sgkContext: 'SGK Trang 121 - Củng cố 1: "skq = skq + ch" tích luỹ ghép các kí tự thoả mãn điều kiện.'
  },
  {
    id: 't24-10',
    termVi: 'Xâu đa dòng (Triple-Quoted String)',
    termEn: 'Triple-Quoted Multi-line String',
    ipa: '/ˈtrɪpəl kwoʊtɪd strɪŋ/',
    definitionVi: 'Cách khởi tạo xâu trải dài trên nhiều dòng văn bản bằng cách bao quanh bởi 3 dấu nháy kép """ hoặc 3 dấu nháy đơn \'\'\'.',
    definitionEn: 'Creating strings spanning across multiple lines by enclosing them in triple double or triple single quotes.',
    exampleVi: 'Cau_tho = """Mình về mình có nhớ ta\nMười lăm năm ấy thiết tha mặn nồng"""',
    exampleEn: 'text = """Line 1\nLine 2"""',
    sgkContext: 'SGK Trang 119 - Khởi động: Sử dụng ba dấu nháy kép """ để viết các dòng thơ liền mạch.'
  }
];

export const LESSON_24_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: 'Trong Python, chỉ số (index) của xâu kí tự bắt đầu từ số mấy?',
    questionEn: 'In Python, what number does string indexing start from?',
    optionsVi: [
      'Bắt đầu từ 1',
      'Bắt đầu từ 0',
      'Bắt đầu từ -1',
      'Tuỳ thuộc vào độ dài của xâu'
    ],
    optionsEn: [
      'Starts from 1',
      'Starts from 0',
      'Starts from -1',
      'Depends on string length'
    ],
    correctIndex: 1,
    explanationVi: 'Theo SGK Trang 119: Tương tự danh sách, ta có thể truy cập từng kí tự của xâu thông qua chỉ số, chỉ số bắt đầu từ 0 đến len() - 1.',
    explanationEn: 'According to page 119, string indexing is zero-based, running from 0 to len() - 1.'
  },
  {
    id: 2,
    questionVi: 'Cho câu lệnh s = "Thời khoá biểu". Giá trị trả về của lệnh len(s) là bao nhiêu?',
    questionEn: 'Given statement s = "Thời khoá biểu". What is the return value of len(s)?',
    optionsVi: [
      '12',
      '13',
      '14',
      '15'
    ],
    optionsEn: [
      '12',
      '13',
      '14',
      '15'
    ],
    correctIndex: 2,
    explanationVi: 'SGK Trang 119 Ví dụ 1: Xâu "Thời khoá biểu" có tổng cộng 14 kí tự (bao gồm 12 chữ cái tiếng Việt và 2 dấu cách), do đó len(s) = 14.',
    explanationEn: 'Textbook page 119 Example 1: The string "Thời khoá biểu" contains 14 characters (including 12 letters and 2 spaces), so len(s) = 14.'
  },
  {
    id: 3,
    questionVi: 'Khi thực hiện lệnh s[0] = "A" đối với xâu s = "abc", điều gì sẽ xảy ra trong Python?',
    questionEn: 'What happens when executing s[0] = "A" on string s = "abc" in Python?',
    optionsVi: [
      'Xâu s đổi thành "Abc"',
      'Chương trình phát sinh lỗi TypeError: \'str\' object does not support item assignment',
      'Kí tự "A" được chèn vào trước xâu s',
      'Xâu s bị xoá rỗng'
    ],
    optionsEn: [
      'String becomes "Abc"',
      'Raises TypeError: \'str\' object does not support item assignment',
      'Character "A" is prepended',
      'String is cleared'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 119 & 120 Ví dụ 2: Xâu kí tự trong Python là đối tượng bất biến (immutable), không cho phép thay đổi từng kí tự nên sẽ báo lỗi TypeError.',
    explanationEn: 'Pages 119-120: Strings in Python are immutable; modifying characters in-place triggers a TypeError.'
  },
  {
    id: 4,
    questionVi: 'Trong các cách khai báo sau, cách nào KHÔNG PHẢI là một xâu kí tự hợp lệ trong Python?',
    questionEn: 'Among the following, which is NOT a valid string declaration in Python?',
    optionsVi: [
      '"123&*()+-ABC"',
      '\'Hoa học trò\'',
      '11111111 = 256',
      '"""Mình về mình có nhớ ta"""'
    ],
    optionsEn: [
      '"123&*()+-ABC"',
      '\'School student\'',
      '11111111 = 256',
      '"""Poetry verse string"""'
    ],
    correctIndex: 2,
    explanationVi: 'SGK Trang 120 Củng cố 1d: 11111111 = 256 không có dấu nháy đơn hay nháy kép bao quanh, là một cú pháp lệnh gán sai, không phải xâu kí tự.',
    explanationEn: 'Page 120 Question 1d: 11111111 = 256 lacks quotes and is an invalid assignment statement, not a string.'
  },
  {
    id: 5,
    questionVi: 'Độ dài của xâu kí tự "Tây Nguyên" là bao nhiêu?',
    questionEn: 'What is the length of the string "Tây Nguyên"?',
    optionsVi: [
      '8',
      '9',
      '10',
      '11'
    ],
    optionsEn: [
      '8',
      '9',
      '10',
      '11'
    ],
    correctIndex: 2,
    explanationVi: 'SGK Trang 120 Củng cố 2c: Xâu "Tây Nguyên" gồm từ "Tây" (3 kí tự) + 1 dấu cách + "Nguyên" (6 kí tự) = 10 kí tự.',
    explanationEn: 'Textbook page 120 Question 2c: The string "Tây Nguyên" consists of "Tây" (3 characters) + 1 space + "Nguyên" (6 characters) = 10 characters.'
  },
  {
    id: 6,
    questionVi: 'Cú pháp nào sau đây duyệt trực tiếp từng kí tự của xâu s mà không cần dùng hàm range()?',
    questionEn: 'Which syntax iterates directly through each character of string s without range()?',
    optionsVi: [
      'for i in range(len(s)):',
      'for ch in s:',
      'while ch in s:',
      'for s in ch:'
    ],
    optionsEn: [
      'for i in range(len(s)):',
      'for ch in s:',
      'while ch in s:',
      'for s in ch:'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 120 Hoạt động 2: "for ch in s: print(ch, end = \' \')" duyệt trực tiếp theo từng kí tự của xâu mà không cần dùng hàm range().',
    explanationEn: 'Page 120 Activity 2: "for ch in s:" directly visits each character in sequence without generating indices.'
  },
  {
    id: 7,
    questionVi: 'Biểu thức "abc" in "abcd" trong Python trả về giá trị gì?',
    questionEn: 'What does expression "abc" in "abcd" return in Python?',
    optionsVi: [
      'True',
      'False',
      'None',
      'Báo lỗi cú pháp'
    ],
    optionsEn: [
      'True',
      'False',
      'None',
      'Syntax error'
    ],
    correctIndex: 0,
    explanationVi: 'SGK Trang 120 & 121: Toán tử in kiểm tra xâu con; vì "abc" là xâu con của "abcd" nên kết quả trả lại là True.',
    explanationEn: 'Pages 120-121: The in operator tests for substring existence; "abc" is inside "abcd", returning True.'
  },
  {
    id: 8,
    questionVi: 'Sau khi thực hiện đoạn lệnh sau, biến skq có giá trị là gì?\ns = "81723"\nskq = ""\nfor ch in s:\n    if int(ch) % 2 != 0:\n        skq = skq + ch',
    questionEn: 'After executing the following code, what is the value of skq?\ns = "81723"\nskq = ""\nfor ch in s:\n    if int(ch) % 2 != 0:\n        skq = skq + ch',
    optionsVi: [
      '"82"',
      '"173"',
      '"81723"',
      '11'
    ],
    optionsEn: [
      '"82"',
      '"173"',
      '"81723"',
      '11'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 121 Củng cố 1: Lệnh lọc ra các kí tự là chữ số lẻ (1, 7, 3) và ghép lại thành xâu "173".',
    explanationEn: 'Page 121 Question 1: The loop filters odd digits (1, 7, 3) and concatenates them into "173".'
  },
  {
    id: 9,
    questionVi: 'Cho s1 = "abc", s2 = "ababcabca". Biểu thức nào sau đây trả về giá trị False?',
    questionEn: 'Given s1 = "abc", s2 = "ababcabca". Which expression evaluates to False?',
    optionsVi: [
      's1 in s2',
      's1 + s1 in s2',
      '"abcabca" in s2',
      '"abc123" in s2'
    ],
    optionsEn: [
      's1 in s2',
      's1 + s1 in s2',
      '"abcabca" in s2',
      '"abc123" in s2'
    ],
    correctIndex: 3,
    explanationVi: 'SGK Trang 121 Củng cố 2: Xâu s2 chỉ gồm các chữ cái a, b, c, hoàn toàn không chứa "123" nên "abc123" in s2 trả về False.',
    explanationEn: 'Page 121 Question 2: String s2 contains only letters a, b, c without numbers, so "abc123" in s2 evaluates to False.'
  },
  {
    id: 10,
    questionVi: 'Trong bài toán kiểm tra xâu S có chứa xâu con "10" hay không bằng vòng lặp chỉ số (Cách 1, Trang 121), điều kiện lặp của biến i là gì?',
    questionEn: 'In Task 2 testing if S contains "10" using index iteration (Method 1, p. 121), what is the loop range for i?',
    optionsVi: [
      'for i in range(len(S)):',
      'for i in range(len(S) - 1):',
      'for i in range(len(S) + 1):',
      'for i in range(2):'
    ],
    optionsEn: [
      'for i in range(len(S)):',
      'for i in range(len(S) - 1):',
      'for i in range(len(S) + 1):',
      'for i in range(2):'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 121 & 122: Vì ta so sánh cặp kí tự liên tiếp S[i] và S[i+1], nên biến i chỉ chạy đến len(S) - 2 bằng cú pháp range(len(S) - 1) để tránh lỗi tràn chỉ số IndexError.',
    explanationEn: 'Pages 121-122: Since code checks pair S[i] and S[i+1], i must stop at len(S) - 2 via range(len(S) - 1) to avoid an IndexError.'
  }
];
