import { QuizQuestion } from './lesson2Data';
import { TermDefinition } from './lessonData';

export const LESSON_30_GLOSSARY: TermDefinition[] = [
  {
    id: 't30-1',
    termVi: 'Kiểm thử chương trình (Software Testing)',
    termEn: 'Software Testing',
    ipa: '/ˈsɒft.weər ˈtes.tɪŋ/',
    definitionVi: 'Quá trình thực thi chương trình với các bộ dữ liệu đầu vào đặc thù nhằm mục đích phát hiện ra lỗi (bug), đồng thời phòng ngừa và ngăn chặn các lỗi phát sinh tiếp trong tương lai.',
    definitionEn: 'The process of executing a program with specific test inputs to detect defects (bugs) and prevent future errors.',
    exampleVi: 'Chạy thử chương trình tìm ƯCLN với các cặp số (20, 16), (7, 13), (0, 5).',
    exampleEn: 'Running GCD program with test pairs (20, 16), (7, 13), (0, 5).',
    sgkContext: 'SGK Trang 145: "Các công cụ này không những có mục đích tìm ra lỗi (hay bug) của chương trình mà còn có tác dụng phòng ngừa và ngăn chặn các lỗi phát sinh tiếp trong tương lai."'
  },
  {
    id: 't30-2',
    termVi: 'Gỡ lỗi (Debugging)',
    termEn: 'Debugging',
    ipa: '/diːˈbʌɡ.ɪŋ/',
    definitionVi: 'Quá trình xác định vị trí chính xác, tìm nguyên nhân gốc rễ và sửa chữa các lỗi (cú pháp, ngoại lệ, hoặc lỗi lôgic) được phát hiện trong mã nguồn chương trình.',
    definitionEn: 'The multistep process of locating, analyzing root causes, and correcting software defects or bugs.',
    exampleVi: 'Tìm vị trí lỗi điều kiện j > 1 trong vòng lặp while của thuật toán sắp xếp và sửa thành j > 0.',
    exampleEn: 'Locating the bug j > 1 in insertion sort while-loop and fixing it to j > 0.',
    sgkContext: 'SGK Trang 145: "Theo em, làm thế nào để kiểm tra (test) và gỡ lỗi (debug) một chương trình?"'
  },
  {
    id: 't30-3',
    termVi: 'Bộ dữ liệu kiểm thử (Test Case / Test Dataset)',
    termEn: 'Test Dataset / Test Case',
    ipa: '/test deɪ.tə.set/',
    definitionVi: 'Tập hợp các giá trị đầu vào tiêu biểu phụ thuộc đặc thù của bài toán và kết quả đầu ra đã biết trước, dùng để đối chiếu tính chính xác của chương trình.',
    definitionEn: 'A set of characteristic input data along with known expected output values used to verify program correctness.',
    exampleVi: 'Test case: Đầu vào m=20, n=16; Kết quả mong đợi: 4.',
    exampleEn: 'Test case: Input m=20, n=16; Expected output: 4.',
    sgkContext: 'SGK Trang 145: "Chương trình cần được thử với một số bộ dữ liệu test gồm đầu vào tiêu biểu... và kết quả đầu ra đã biết trước."'
  },
  {
    id: 't30-4',
    termVi: 'Dữ liệu vùng biên (Boundary / Edge Cases)',
    termEn: 'Boundary / Edge Cases',
    ipa: '/ˈbaʊn.dər.i keɪs/',
    definitionVi: 'Các giá trị đầu vào nằm ở ranh giới cực đại, cực tiểu hoặc cận biên của miền xác định (như số 0, số âm, danh sách rỗng, hoặc số rất lớn). Đây là vùng thường phát sinh lỗi nhất.',
    definitionEn: 'Input values at the extreme limits or edge transitions of a domain (e.g. 0, negatives, empty collections, very large numbers) where bugs most frequently occur.',
    exampleVi: 'Bộ test vùng biên: (0, 0), (0, 1), (1, 0), (1, 1) khi 0 <= x, y <= 1.',
    exampleEn: 'Boundary test dataset: (0, 0), (0, 1), (1, 0), (1, 1).',
    sgkContext: 'SGK Trang 145: "Cần có bộ test dữ liệu ở vùng biên... Thực tế cho thấy thường phát sinh lỗi tại các vùng biên hoặc lân cận của biên."'
  },
  {
    id: 't30-5',
    termVi: 'Điểm dừng (Breakpoint)',
    termEn: 'Breakpoint',
    ipa: '/ˈbreɪk.pɔɪnt/',
    definitionVi: 'Công cụ gỡ lỗi trong môi trường lập trình (IDE) cho phép tạm dừng chương trình tại một dòng lệnh định trước để người lập trình quan sát giá trị biến và trạng thái bộ nhớ.',
    definitionEn: 'An intentional stopping or pausing place in a program, put in place for debugging purposes to inspect variable states.',
    exampleVi: 'Đặt breakpoint tại dòng 4 lệnh while m != n: để theo dõi m, n trước mỗi vòng lặp.',
    exampleEn: 'Setting a breakpoint at line 4 while m != n: to trace m and n.',
    sgkContext: 'SGK Trang 146 & 147: "Công cụ break point cho phép tạo ra các \'điểm dừng\' bên trong chương trình. Khi chạy, chương trình sẽ tạm dừng lại tại các \'điểm dừng\'."'
  },
  {
    id: 't30-6',
    termVi: 'In biến trung gian (Print Debugging)',
    termEn: 'Print Debugging',
    ipa: '/prɪnt diːˈbʌɡ.ɪŋ/',
    definitionVi: 'Phương pháp gỡ lỗi bằng cách bổ sung lệnh print() vào giữa các bước tính toán để hiển thị các giá trị trung gian, từ đó kiểm soát luồng thực thi và phát hiện bước sai lệch.',
    definitionEn: 'The debugging technique of inserting print() statements within algorithm steps to monitor intermediate variable values.',
    exampleVi: 'print("Vòng lặp", k, ":", m, n) để xem m, n thay đổi qua từng bước trừ.',
    exampleEn: 'print("Loop", k, ":", m, n) to track values in each step.',
    sgkContext: 'SGK Trang 146 & 147: "Bổ sung vào giữa các dòng lệnh các lệnh print() để in ra các biến trung gian, qua đó kiểm tra quy trình hay thuật toán."'
  },
  {
    id: 't30-7',
    termVi: 'Kiểm thử ngẫu nhiên (Random / Fuzz Testing)',
    termEn: 'Random Testing',
    ipa: '/ˈræn.dəm ˈtes.tɪŋ/',
    definitionVi: 'Sinh ngẫu nhiên các bộ dữ liệu đầu vào trong miền xác định của bài toán để tăng khả năng phát hiện các kịch bản lỗi bất thường mà lập trình viên chưa dự tính.',
    definitionEn: 'Generating pseudo-random inputs across the problem domain to increase the likelihood of discovering unanticipated edge defects.',
    exampleVi: 'Sinh 100 cặp số ngẫu nhiên random.randint(1, 1000) để kiểm tra hàm tính ƯCLN.',
    exampleEn: 'Generating 100 random pairs to stress-test the GCD routine.',
    sgkContext: 'SGK Trang 145: "Cần có bộ test ngẫu nhiên. Việc sinh ngẫu nhiên dữ liệu đầu vào trong miền xác định của chương trình làm tăng khả năng tìm lỗi nếu có."'
  },
  {
    id: 't30-8',
    termVi: 'Thuật toán trừ Euclid (Euclidean Subtraction GCD)',
    termEn: 'Euclidean Subtraction Algorithm',
    ipa: '/juːˈklɪd.i.ən səbˈtræk.ʃən/',
    definitionVi: 'Thuật toán tìm ước chung lớn nhất của hai số tự nhiên m, n bằng cách lặp lại phép trừ số lớn cho số bé (n = n - m hoặc m = m - n) cho đến khi hai số bằng nhau.',
    definitionEn: 'The classical algorithm for finding the greatest common divisor by iteratively subtracting the smaller number from the larger until both are equal.',
    exampleVi: 'm=20, n=16 -> 4, 16 -> 4, 12 -> 4, 8 -> 4, 4 -> UCLN = 4.',
    exampleEn: 'm=20, n=16 -> GCD = 4 after 4 subtraction steps.',
    sgkContext: 'SGK Trang 146: "gcd(m, m) = m; Nếu n > m thì gcd(m, n) = gcd(m, n-m); Nếu n < m thì gcd(m, n) = gcd(m-n, n)."'
  },
  {
    id: 't30-9',
    termVi: 'Bảng theo dõi biến (Variable Watch Table)',
    termEn: 'Variable Watch Table',
    ipa: '/ˈveə.ri.ə.bəl wɒtʃ ˈteɪ.bəl/',
    definitionVi: 'Bảng ghi lại giá trị của các biến tại mỗi bước lặp hoặc mỗi điểm dừng của chương trình, giúp người lập trình đối chiếu diễn biến thực tế với diễn biến trên lý thuyết.',
    definitionEn: 'A tabulated log tracking variable values across loop iterations or breakpoint stops to trace execution flow.',
    exampleVi: 'Bảng theo dõi các vòng lặp 1, 2, 3, 4 với giá trị (m, n) tương ứng (20, 16), (4, 16), (4, 12), (4, 8), (4, 4).',
    exampleEn: 'Tracking table for iterations 1..4 with (m, n) values.',
    sgkContext: 'SGK Trang 148: "Chúng ta sẽ ghi lại các giá trị m, n vào một bảng... Khi kết thúc hết vòng lặp thì kết quả chính là giá trị m."'
  },
  {
    id: 't30-10',
    termVi: 'Nguyên lý Dijkstra về kiểm thử (Dijkstra Testing Principle)',
    termEn: 'Dijkstra Testing Principle',
    ipa: '/ˈdaɪk.strə ˈtes.tɪŋ ˈprɪn.sə.pəl/',
    definitionVi: 'Nguyên lý khoa học máy tính khẳng định: Kiểm thử chỉ có thể chứng minh sự hiện diện của lỗi, chứ không thể chứng minh một chương trình hoàn toàn không có lỗi.',
    definitionEn: 'The famous computer science axiom: "Program testing can be used to show the presence of bugs, but never to show their absence."',
    exampleVi: 'Dù kiểm tra 1000 bộ test đúng, vẫn có thể có bộ test thứ 1001 làm chương trình bị lỗi.',
    exampleEn: 'Passing 1000 tests does not mathematically guarantee the 1001st test will not fail.',
    sgkContext: 'SGK Trang 148 (Vận dụng 2): "Để kiểm thử một chương trình, nếu chỉ bằng việc kiểm tra thông qua các bộ dữ liệu test thì có bảo đảm tìm ra hết lỗi của chương trình hay không? Vì sao?"'
  }
];

export const LESSON_30_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: 'Theo Hộp Ghi nhớ SGK Tin học 10 (Trang 146), có những phương pháp cơ bản nào để kiểm thử và gỡ lỗi chương trình?',
    questionEn: 'According to the Textbook Summary Box (Page 146), what are the basic methods for software testing and debugging?',
    optionsVi: [
      'Chỉ duy nhất phương pháp đọc lại mã nguồn bằng mắt thường',
      'Quan sát mã lỗi runtime; Sử dụng các bộ dữ liệu test; In các biến trung gian; Sử dụng công cụ điểm dừng (breakpoint)',
      'Chỉ cần kiểm thử với 1 bộ dữ liệu duy nhất và gỡ lỗi bằng cách viết lại chương trình',
      'Sử dụng mạng xã hội và hỏi các lập trình viên khác'
    ],
    optionsEn: [
      'Only manual code reading by eye',
      'Inspect runtime errors; Use test datasets; Print intermediate variables; Use breakpoints in IDE',
      'Test only once with a single input and rewrite from scratch',
      'Rely on social media and internet forums'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 146 nêu rõ 4 phương pháp: 1. Sử dụng công cụ in các biến trung gian; 2. Sử dụng công cụ sinh các bộ dữ liệu test; 3. Sử dụng công cụ điểm dừng trong phần mềm soạn thảo; 4. Quan sát các mã lỗi của chương trình nếu phát sinh.',
    explanationEn: 'Textbook page 146 explicitly lists 4 methods: print intermediate variables, generate test datasets, use breakpoints, and observe runtime exception codes.'
  },
  {
    id: 2,
    questionVi: 'Khi chuẩn bị các bộ dữ liệu test để kiểm thử chương trình, lập trình viên cần lưu ý những tiêu chí nào theo SGK Trang 145?',
    questionEn: 'When preparing test datasets, which criteria must a programmer consider according to Textbook Page 145?',
    optionsVi: [
      'Cần có nhiều bộ test, có bộ test ngẫu nhiên, và đặc biệt cần có bộ test ở vùng biên',
      'Chỉ cần các số nguyên dương nhỏ hơn 10',
      'Chỉ cần các bộ test có đầu vào và đầu ra đều bằng 0',
      'Không cần bộ test vì Python luôn tự động sửa lỗi'
    ],
    optionsEn: [
      'Multiple diverse tests, random test cases, and boundary/edge case datasets',
      'Only small positive integers under 10',
      'Only test cases where inputs and outputs are 0',
      'No tests needed because Python auto-fixes errors'
    ],
    correctIndex: 0,
    explanationVi: 'SGK Trang 145 nhấn mạnh 3 điểm: 1. Cần có nhiều bộ test (độ lớn, đa dạng); 2. Cần có bộ test ngẫu nhiên; 3. Cần có bộ test dữ liệu ở vùng biên vì thực tế lỗi thường phát sinh tại vùng biên hoặc lân cận của biên.',
    explanationEn: 'Textbook page 145 highlights 3 criteria: multiple diverse datasets, random generation, and edge/boundary values where bugs concentrate.'
  },
  {
    id: 3,
    questionVi: 'Nếu biến đầu vào (x, y) được xác định trên miền 0 <= x, y <= 1, các bộ dữ liệu kiểm thử ở vùng biên là gì?',
    questionEn: 'If input variables (x, y) are bounded by 0 <= x, y <= 1, what are the boundary test cases?',
    optionsVi: [
      '(0.5; 0.5), (0.2; 0.8)',
      '(0; 0), (0; 1), (1; 0), (1; 1)',
      '(10; 10), (-1; -1)',
      '(100; 100), (2; 2)'
    ],
    optionsEn: [
      '(0.5; 0.5), (0.2; 0.8)',
      '(0; 0), (0; 1), (1; 0), (1; 1)',
      '(10; 10), (-1; -1)',
      '(100; 100), (2; 2)'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 145 chỉ rõ: Ví dụ dữ liệu đầu vào là cặp (x, y) xác định trên miền 0 <= x, y <= 1 thì bộ dữ liệu biên là (0; 0), (0; 1), (1; 0) và (1; 1).',
    explanationEn: 'Page 145 gives the exact boundary set for 0 <= x, y <= 1: (0, 0), (0, 1), (1, 0), and (1, 1).'
  },
  {
    id: 4,
    questionVi: 'Công cụ điểm dừng (break point) trong phần mềm soạn thảo lập trình có tác dụng gì?',
    questionEn: 'What is the function of a breakpoint in an IDE?',
    optionsVi: [
      'Xoá vĩnh viễn dòng lệnh đó khỏi chương trình',
      'Tạm dừng chương trình tại dòng định trước để quan sát giá trị các biến và kiểm tra tính đúng đắn của thuật toán',
      'Tự động tăng tốc độ xử lý của CPU',
      'Đổi tên các biến trong chương trình'
    ],
    optionsEn: [
      'Permanently delete that statement from the file',
      'Pause execution at the designated line to inspect variables and verify algorithm logic',
      'Automatically overclock the CPU',
      'Rename all program variables'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 146: Công cụ break point cho phép tạo ra các điểm dừng bên trong chương trình. Khi chạy, chương trình tạm dừng lại để người kiểm thử có thể quan sát thông tin các biến.',
    explanationEn: 'A breakpoint pauses program execution at a specific line so developers can examine memory state and variable values.'
  },
  {
    id: 5,
    questionVi: 'Trong thuật toán tìm ƯCLN của m = 20 và n = 16 bằng phép trừ (SGK Trang 147), sau vòng lặp thứ nhất, giá trị của m và n lần lượt là bao nhiêu?',
    questionEn: 'In Euclidean subtraction GCD with m = 20 and n = 16 (Page 147), what are the values of m and n after the 1st iteration?',
    optionsVi: [
      'm = 20, n = 16',
      'm = 4, n = 16',
      'm = 4, n = 12',
      'm = 4, n = 4'
    ],
    optionsEn: [
      'm = 20, n = 16',
      'm = 4, n = 16',
      'm = 4, n = 12',
      'm = 4, n = 4'
    ],
    correctIndex: 1,
    explanationVi: 'Vì m = 20 > n = 16, nhánh else thực hiện: m = m - n = 20 - 16 = 4. Do đó sau vòng lặp 1, m = 4 và n = 16.',
    explanationEn: 'Since m = 20 > n = 16, the else branch executes: m = m - n = 20 - 16 = 4. Thus m = 4, n = 16.'
  },
  {
    id: 6,
    questionVi: 'Chương trình phát sinh lỗi ZeroDivisionError. Cách xử lý phù hợp và chuẩn nhất là gì (SGK Trang 148 Luyện tập 1)?',
    questionEn: 'What is the best practice to handle a ZeroDivisionError (Textbook Page 148 Exercise 1)?',
    optionsVi: [
      'Tắt máy tính và khởi động lại',
      'Sử dụng câu lệnh rẽ nhánh if kiểm tra số chia khác 0 trước khi thực hiện phép chia (hoặc dùng cấu trúc try-except)',
      'Đổi tất cả số chia thành số 1',
      'Bỏ qua phép chia và in ra kết quả bằng 0'
    ],
    optionsEn: [
      'Reboot the computer',
      'Use an if statement to check that divisor != 0 before dividing (or use try-except)',
      'Replace all divisors with 1',
      'Skip the division and print 0'
    ],
    correctIndex: 1,
    explanationVi: 'ZeroDivisionError là lỗi chia cho 0. Lập trình viên cần kiểm tra dữ liệu đầu vào hoặc thêm điều kiện rẽ nhánh `if mau_so != 0:` trước khi thực hiện phép chia.',
    explanationEn: 'Guard the division operation with an `if divisor != 0:` condition or exception handling block.'
  },
  {
    id: 7,
    questionVi: 'Chương trình: m = input("Nhập m: "); n = input("Nhập n: "); print("Tổng là:", m+n) có lỗi gì khi nhập m = 3 và n = 5 (SGK Trang 148 Luyện tập 2)?',
    questionEn: 'What bug occurs when running m = input(); n = input(); print(m+n) with m = 3, n = 5 (Page 148 Exercise 2)?',
    optionsVi: [
      'Lỗi cú pháp SyntaxError',
      'Lỗi ngoại lệ ValueError',
      'Lỗi lôgic: input() trả về xâu kí tự nên phép + nối xâu thành "35" thay vì tính tổng 8',
      'Chương trình hoàn toàn đúng không có lỗi'
    ],
    optionsEn: [
      'SyntaxError',
      'ValueError',
      'Logic error: input() returns str, so + concatenates to "35" instead of adding to 8',
      'The program is completely correct'
    ],
    correctIndex: 2,
    explanationVi: 'Lệnh input() luôn trả về xâu str. Do đó m+n thực hiện phép nối xâu "3" + "5" = "35". Để sửa đúng, phải ép kiểu sang số: m = int(input()) và n = int(input()).',
    explanationEn: 'input() yields string literals, causing "3" + "5" = "35" concatenation instead of arithmetic addition. Must cast with int().'
  },
  {
    id: 8,
    questionVi: 'Trong bài Vận dụng 1 (SGK Trang 148) về sắp xếp chèn, lệnh "while j > 1 and A[j] < A[j-1]:" bị sai sót gì?',
    questionEn: 'In Application 1 (Page 148) insertion sort, what is flawed in "while j > 1 and A[j] < A[j-1]:"?',
    optionsVi: [
      'Không có lỗi gì',
      'Điều kiện j > 1 dừng quá sớm, khiến phần tử ở vị trí chỉ số 0 (A[0]) không bao giờ được so sánh với A[1]',
      'Thiếu dấu hai chấm :',
      'Phải viết là j == 1'
    ],
    optionsEn: [
      'No flaw at all',
      'Condition j > 1 stops too early, preventing element at index 0 (A[0]) from ever being compared with A[1]',
      'Missing colon :',
      'Must be written as j == 1'
    ],
    correctIndex: 1,
    explanationVi: 'Chỉ số danh sách trong Python bắt đầu từ 0. Nếu viết `j > 1`, khi j giảm về 1 vòng lặp dừng lại ngay, nên phần tử A[0] không bao giờ được xét đến. Điều kiện đúng phải là `j > 0`.',
    explanationEn: 'Python list indices start at 0. `j > 1` stops when j=1, leaving index 0 unsorted. The correct condition is `j > 0`.'
  },
  {
    id: 9,
    questionVi: 'Cũng trong bài Vận dụng 1 (SGK Trang 148), lệnh vòng lặp ngoài "for i in range(len(A)-1):" gặp lỗi gì khi sắp xếp danh sách A?',
    questionEn: 'In Application 1 (Page 148), what bug does the outer loop "for i in range(len(A)-1):" introduce?',
    optionsVi: [
      'Lỗi IndexOutOfBounds ngay từ đầu',
      'Bỏ sót phần tử cuối cùng của danh sách A (chỉ số len(A)-1) không được đưa vào thuật toán sắp xếp',
      'Vòng lặp bị lặp vô tận',
      'Làm danh sách bị đảo ngược'
    ],
    optionsEn: [
      'Immediate IndexOutOfBounds',
      'Omits the last element of list A (index len(A)-1) from being processed by insertion sort',
      'Infinite loop',
      'Reverses the entire array'
    ],
    correctIndex: 1,
    explanationVi: 'Hàm range(len(A)-1) chỉ duyệt đến chỉ số len(A)-2, bỏ sót phần tử cuối cùng của danh sách A không được sắp xếp. Vòng lặp ngoài chuẩn của Insertion Sort là `for i in range(1, len(A)):`.',
    explanationEn: 'range(len(A)-1) stops at len(A)-2, completely ignoring the final element. Insertion sort requires `for i in range(1, len(A)):`.'
  },
  {
    id: 10,
    questionVi: 'Theo câu hỏi Vận dụng 2 (SGK Trang 148) và nguyên lý của nhà khoa học máy tính Edsger Dijkstra, việc kiểm thử bằng các bộ test có bảo đảm tìm ra hết lỗi không?',
    questionEn: 'According to Application 2 (Page 148) and Dijkstra principle, does passing test cases guarantee zero bugs?',
    optionsVi: [
      'Có, nếu chạy qua 5 bộ test đúng thì chương trình chắc chắn không còn lỗi',
      'Không thể bảo đảm tìm ra hết lỗi, vì miền dữ liệu thường vô hạn/quá lớn, kiểm thử chỉ chứng minh được sự hiện diện của lỗi chứ không thể chứng minh sự vắng mặt của lỗi',
      'Có, vì máy tính hiện đại có thể tự động kiểm tra mọi tổ hợp',
      'Chỉ cần kiểm thử lỗi cú pháp là đủ đảm bảo không có lỗi'
    ],
    optionsEn: [
      'Yes, 5 passing test cases mathematically guarantee zero bugs',
      'No, because input domains are vast/infinite; testing can show the presence of bugs, but never their absence',
      'Yes, because modern computers test all combinations',
      'Checking syntax errors alone is sufficient'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 148 Vận dụng 2 và câu danh ngôn kinh điển của Dijkstra khẳng định: Kiểm thử không thể bảo đảm tìm hết lỗi do không thể thử hết vô số trường hợp đầu vào. Kiểm thử chỉ cho thấy có lỗi tồn tại chứ không chứng minh được chương trình hoàn toàn không có lỗi.',
    explanationEn: 'As formulated by Edsger W. Dijkstra, testing shows the presence of bugs, not their absence, since exhaustive input testing is practically impossible.'
  }
];
