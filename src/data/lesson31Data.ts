import { TermDefinition } from './lessonData';
import { QuizQuestion } from './lesson2Data';

export const LESSON_31_GLOSSARY: TermDefinition[] = [
  {
    id: 'prime-factorization',
    termVi: 'Phân tích thừa số nguyên tố',
    termEn: 'Prime Factorization',
    ipa: '/praɪm ˌfæk.tər.aɪˈzeɪ.ʃən/',
    definitionVi: 'Quá trình phân tách một hợp số n > 1 thành tích các số nguyên tố dạng n = p1 * p2 * ... * pk.',
    definitionEn: 'The process of decomposing a composite number n > 1 into a product of prime numbers of the form n = p1 * p2 * ... * pk.',
    exampleVi: 'Ví dụ: 100 = 2 * 2 * 5 * 5, danh sách NT = [2, 2, 5, 5].',
    exampleEn: 'Example: 100 = 2 * 2 * 5 * 5, list NT = [2, 2, 5, 5].',
    sgkContext: 'SGK Trang 149 – Nhiệm vụ 1: phantichnt.py'
  },
  {
    id: 'composite-number',
    termVi: 'Hợp số',
    termEn: 'Composite Number',
    ipa: '/ˈkɒm.pə.zɪt ˈnʌm.bər/',
    definitionVi: 'Số tự nhiên lớn hơn 1 có nhiều hơn hai ước số (tức là có ước số khác 1 và chính nó). Số 1 không phải là số nguyên tố và cũng không phải là hợp số.',
    definitionEn: 'A positive integer greater than 1 that has more than two positive divisors (i.e. divisible by numbers other than 1 and itself). Number 1 is neither prime nor composite.',
    exampleVi: 'n = 1: len(NT) = 0; n là nguyên tố: len(NT) = 1; n là hợp số: len(NT) > 1.',
    exampleEn: 'n = 1: len(NT) = 0; n is prime: len(NT) = 1; n is composite: len(NT) > 1.',
    sgkContext: 'SGK Trang 149 – Chú ý về số 1, số nguyên tố và hợp số'
  },
  {
    id: 'breakpoint-inspection',
    termVi: 'Điểm dừng gỡ lỗi (Breakpoint)',
    termEn: 'Debugging Breakpoint',
    ipa: '/ˈdiː.bʌɡ.ɪŋ ˈbreɪk.pɔɪnt/',
    definitionVi: 'Vị trí dòng lệnh được đánh dấu để tạm dừng thực thi chương trình trong chế độ Debug, giúp lập trình viên kiểm tra giá trị các biến bộ nhớ.',
    definitionEn: 'A designated line marker in source code that suspends program execution in Debug mode to let developers inspect in-memory variables.',
    exampleVi: 'Thiết lập breakpoint tại dòng 20 (m = m // k) để kiểm tra mảng NT và biến k.',
    exampleEn: 'Set breakpoint at line 20 (m = m // k) to inspect list NT and variable k.',
    sgkContext: 'SGK Trang 150 – Gỡ lỗi chương trình phantichnt.py'
  },
  {
    id: 'quadratic-equation',
    termVi: 'Phương trình bậc hai',
    termEn: 'Quadratic Equation',
    ipa: '/kwɒdˈræt.ɪk ɪˈkweɪ.ʒən/',
    definitionVi: 'Phương trình dạng ax² + bx + c = 0 với a, b, c là các hệ số thực. Cần biện luận đầy đủ trường hợp suy biến a = 0 và biệt thức delta.',
    definitionEn: 'An algebraic equation of the form ax² + bx + c = 0 where a, b, c are real coefficients. Requires complete case handling for degenerate a = 0 and discriminant delta.',
    exampleVi: 'a = 1, b = -3, c = 2 có hai nghiệm phân biệt x1 = 2.0, x2 = 1.0.',
    exampleEn: 'a = 1, b = -3, c = 2 yields two distinct roots x1 = 2.0, x2 = 1.0.',
    sgkContext: 'SGK Trang 150 – Nhiệm vụ 2: giaipt.py'
  },
  {
    id: 'discriminant-delta',
    termVi: 'Biệt thức Delta',
    termEn: 'Discriminant (Delta)',
    ipa: '/dɪˈskrɪm.ɪ.nənt ˈdel.tə/',
    definitionVi: 'Giá trị delta = b² - 4ac dùng để xác định số lượng và tính chất nghiệm của phương trình bậc hai (vô nghiệm nếu delta < 0, nghiệm kép nếu delta = 0, 2 nghiệm phân biệt nếu delta > 0).',
    definitionEn: 'The value delta = b² - 4ac used to determine the nature and number of real roots of a quadratic equation (no roots if delta < 0, double root if delta = 0, two distinct roots if delta > 0).',
    exampleVi: 'delta = b*b - 4*a*c; x1 = (-b + sqrt(delta))/(2*a).',
    exampleEn: 'delta = b*b - 4*a*c; x1 = (-b + sqrt(delta))/(2*a).',
    sgkContext: 'SGK Trang 150 – 152'
  },
  {
    id: 'nested-conditional',
    termVi: 'Cấu trúc rẽ nhánh lồng nhau',
    termEn: 'Nested Conditional / elif',
    ipa: '/ˈnes.tɪd kənˈdɪʃ.ən.əl/',
    definitionVi: 'Kỹ thuật đặt câu lệnh rẽ nhánh bên trong một nhánh khác. Trong Python, cấu trúc if...else lồng nhau được viết gọn sáng sủa bằng cấu trúc if...elif...else.',
    definitionEn: 'Technique of nesting conditional statements inside branches. In Python, deeply nested if...else constructs are streamlined using the if...elif...else structure.',
    exampleVi: 'Thay vì else: if condition: ... viết thành elif condition: ...',
    exampleEn: 'Instead of else: if condition: ... written cleanly as elif condition: ...',
    sgkContext: 'SGK Trang 151 – Mô hình rút gọn rẽ nhánh'
  },
  {
    id: 'subprogram-modularization',
    termVi: 'Module hoá chương trình con',
    termEn: 'Subprogram Modularization',
    ipa: '/ˈsʌbˌprəʊ.ɡræm ˌmɒdʒ.ə.lə.raɪˈzeɪ.ʃən/',
    definitionVi: 'Tách bài toán phức tạp thành các hàm độc lập có trách nhiệm rõ ràng như NhapDL(), GiaiPT1(b, c), GiaiPT2(a, b, c).',
    definitionEn: 'Decomposing complex logic into self-contained subprograms with dedicated responsibilities such as NhapDL(), GiaiPT1(b, c), GiaiPT2(a, b, c).',
    exampleVi: 'GiaiPT2 gọi GiaiPT1 khi hệ số a == 0.',
    exampleEn: 'GiaiPT2 invokes GiaiPT1 when coefficient a == 0.',
    sgkContext: 'SGK Trang 151 – Thiết kế chương trình thông qua các hàm'
  },
  {
    id: 'input-validation-loop',
    termVi: 'Vòng lặp kiểm soát đầu vào',
    termEn: 'Input Validation Loop',
    ipa: '/ˈɪn.pʊt ˌvæl.ɪˈdeɪ.ʃən luːp/',
    definitionVi: 'Vòng lặp (thường dùng while) kiểm tra điều kiện dữ liệu nhập, nếu không thoả mãn yêu cầu (ví dụ a <= 0) thì bắt người dùng nhập lại cho đến khi hợp lệ.',
    definitionEn: 'A loop (typically using while) that validates user input, prompting for re-entry until valid constraints (e.g. positive number a > 0) are met.',
    exampleVi: 'while a <= 0: print("Hãy nhập lại"); a = float(input()).',
    exampleEn: 'while a <= 0: print("Please re-enter"); a = float(input()).',
    sgkContext: 'SGK Trang 152 – Luyện tập 1'
  },
  {
    id: 'leap-year-rule',
    termVi: 'Quy tắc năm nhuận',
    termEn: 'Leap Year Algorithm',
    ipa: '/liːp jɪər ˈæl.ɡə.rɪ.ðəm/',
    definitionVi: 'Năm dương lịch là năm nhuận nếu chia hết cho 400 hoặc (chia hết cho 4 và không chia hết cho 100).',
    definitionEn: 'A Gregorian calendar year is a leap year if divisible by 400 or (divisible by 4 and not divisible by 100).',
    exampleVi: '(Y % 400 == 0) or (Y % 4 == 0 and Y % 100 != 0). Thế kỉ XXI có 24 năm nhuận.',
    exampleEn: '(Y % 400 == 0) or (Y % 4 == 0 and Y % 100 != 0). The 21st century contains 24 leap years.',
    sgkContext: 'SGK Trang 152 – Vận dụng 1'
  },
  {
    id: 'euclidean-modulo-algorithm',
    termVi: 'Thuật toán Euclid modulo',
    termEn: 'Euclidean Modulo Algorithm',
    ipa: '/juːˈklɪd.i.ən ˈmɒd.jʊ.ləʊ ˈæl.ɡə.rɪ.ðəm/',
    definitionVi: 'Thuật toán tìm ƯCLN tối ưu dựa trên công thức UCLN(a, b) = UCLN(b, a % b) nếu b > 0 và UCLN(a, 0) = a, nhanh hơn đáng kể so với thuật toán trừ lặp.',
    definitionEn: 'Optimal GCD algorithm based on the identity GCD(a, b) = GCD(b, a % b) if b > 0 and GCD(a, 0) = a, drastically faster than subtraction iterations.',
    exampleVi: 'while b > 0: a, b = b, a % b; return a.',
    exampleEn: 'while b > 0: a, b = b, a % b; return a.',
    sgkContext: 'SGK Trang 152 – Vận dụng 2'
  }
];

export const LESSON_31_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: 'Trong bài toán phân tích thừa số nguyên tố (Nhiệm vụ 1), tại sao biến danh sách NT lại rỗng khi n = 1?',
    questionEn: 'In the prime factorization problem (Task 1), why is list NT empty when n = 1?',
    optionsVi: [
      'Vì số 1 không phải là số nguyên tố và cũng không phải là hợp số theo định nghĩa toán học',
      'Vì biến n bị lỗi cú pháp khi n = 1',
      'Vì vòng lặp while m > 1 không thực hiện khi m = 1',
      'Cả A và C đều đúng'
    ],
    optionsEn: [
      'Because 1 is neither prime nor composite by mathematical definition',
      'Because variable n encounters a syntax error when n = 1',
      'Because loop while m > 1 does not execute when m = 1',
      'Both A and C are correct'
    ],
    correctIndex: 3,
    explanationVi: 'Theo toán học số 1 không phải nguyên tố cũng không phải hợp số. Trong code, điều kiện while m > 1 sẽ là False ngay từ đầu khi n = m = 1, do đó không thêm phần tử nào vào NT, len(NT) = 0.',
    explanationEn: 'Mathematically 1 is neither prime nor composite. In code, condition while m > 1 is False initially when n = m = 1, so no element is added to NT, resulting in len(NT) = 0.'
  },
  {
    id: 2,
    questionVi: 'Trong chương trình phantichnt.py, khi nhập n = 100, danh sách NT thu được sau khi kết thúc vòng lặp while m > 1 là gì?',
    questionEn: 'In phantichnt.py, when entering n = 100, what is list NT after while m > 1 finishes?',
    optionsVi: [
      '[2, 5, 10]',
      '[2, 2, 5, 5]',
      '[4, 25]',
      '[1, 2, 4, 5, 10, 20, 25, 50, 100]'
    ],
    optionsEn: [
      '[2, 5, 10]',
      '[2, 2, 5, 5]',
      '[4, 25]',
      '[1, 2, 4, 5, 10, 20, 25, 50, 100]'
    ],
    correctIndex: 1,
    explanationVi: 'Phân tích 100 ra thừa số nguyên tố: 100 = 2 * 2 * 5 * 5. Danh sách NT lưu các thừa số nguyên tố theo thứ tự tăng dần là [2, 2, 5, 5].',
    explanationEn: 'Prime factorization of 100 is 100 = 2 * 2 * 5 * 5. List NT records all prime factors in ascending order: [2, 2, 5, 5].'
  },
  {
    id: 3,
    questionVi: 'Khi đặt breakpoint tại dòng 20 (m = m // k) của phantichnt.py với n = 100, ở lần dừng thứ 3, các biến có giá trị là bao nhiêu?',
    questionEn: 'When setting a breakpoint at line 20 (m = m // k) with n = 100, what are the variable values at the 3rd stop?',
    optionsVi: [
      'k = 2, m = 100, NT = [2]',
      'k = 2, m = 50, NT = [2, 2]',
      'k = 5, m = 25, NT = [2, 2, 5]',
      'k = 5, m = 5, NT = [2, 2, 5, 5]'
    ],
    optionsEn: [
      'k = 2, m = 100, NT = [2]',
      'k = 2, m = 50, NT = [2, 2]',
      'k = 5, m = 25, NT = [2, 2, 5]',
      'k = 5, m = 5, NT = [2, 2, 5, 5]'
    ],
    correctIndex: 2,
    explanationVi: 'Theo bảng theo dõi SGK trang 150: Dừng lần 1: k=2, m=100, NT=[2]; Dừng lần 2: k=2, m=50, NT=[2,2]; Dừng lần 3: k=5, m=25, NT=[2,2,5].',
    explanationEn: 'According to SGK page 150 trace table: 1st stop: k=2, m=100, NT=[2]; 2nd stop: k=2, m=50, NT=[2,2]; 3rd stop: k=5, m=25, NT=[2,2,5].'
  },
  {
    id: 4,
    questionVi: 'Trong bài toán giải phương trình bậc hai ax² + bx + c = 0, nếu a = 0 và b != 0 thì phương trình trở thành gì và có nghiệm như thế nào?',
    questionEn: 'In solving quadratic equation ax² + bx + c = 0, if a = 0 and b != 0, what does it become and what is its root?',
    optionsVi: [
      'Phương trình bậc nhất bx + c = 0 có nghiệm duy nhất x = -c/b',
      'Phương trình vô số nghiệm',
      'Phương trình vô nghiệm',
      'Phương trình bậc hai có nghiệm kép x = -b/(2a)'
    ],
    optionsEn: [
      'Linear equation bx + c = 0 with unique root x = -c/b',
      'Infinitely many solutions',
      'No real solution',
      'Quadratic equation with double root x = -b/(2a)'
    ],
    correctIndex: 0,
    explanationVi: 'Khi hệ số a = 0, số hạng ax² triệt tiêu, phương trình suy biến thành phương trình bậc nhất bx + c = 0. Do b != 0 nên có nghiệm duy nhất x = -c/b.',
    explanationEn: 'When coefficient a = 0, ax² vanishes and it degrades into a linear equation bx + c = 0. Since b != 0, it has a unique root x = -c/b.'
  },
  {
    id: 5,
    questionVi: 'Hàm sqrt(x) được định nghĩa trong chương trình giaipt.py bằng cú pháp nào mà không cần thư viện math?',
    questionEn: 'How is sqrt(x) defined in giaipt.py without importing math library?',
    optionsVi: [
      'def sqrt(x): return x ** 2',
      'def sqrt(x): return x ** 0.5',
      'def sqrt(x): return x // 2',
      'def sqrt(x): return math.sqrt(x)'
    ],
    optionsEn: [
      'def sqrt(x): return x ** 2',
      'def sqrt(x): return x ** 0.5',
      'def sqrt(x): return x // 2',
      'def sqrt(x): return math.sqrt(x)'
    ],
    correctIndex: 1,
    explanationVi: 'Trong toán học căn bậc hai của x chính là x^(1/2) hay x^0.5. Python dùng toán tử luỹ thừa **: return x**0.5.',
    explanationEn: 'Mathematically the square root of x is x^(1/2) or x^0.5. Python uses exponentiation operator **: return x**0.5.'
  },
  {
    id: 6,
    questionVi: 'Ưu điểm nổi bật của cấu trúc if...elif...else so với các khối if...else lồng nhau sâu là gì?',
    questionEn: 'What is the prominent advantage of if...elif...else over deeply nested if...else?',
    optionsVi: [
      'Code chạy nhanh hơn gấp 10 lần',
      'Không cần thụt lề liên tục sang phải, chương trình ngắn gọn, rõ ràng và dễ đọc',
      'Không cần kiểm tra điều kiện',
      'Cho phép bỏ qua các trường hợp ngoại lệ'
    ],
    optionsEn: [
      'Executes 10 times faster',
      'Avoids excessive rightward indentation staircase, keeping code concise, clean, and legible',
      'Does not need condition evaluation',
      'Allows skipping runtime exceptions'
    ],
    correctIndex: 1,
    explanationVi: 'SGK trang 151 chỉ ra mô hình if...elif...else giúp thay thế các lệnh rẽ nhánh lồng nhau thụt lề bậc thang phức tạp bằng cú pháp thẳng hàng, sáng sủa và dễ bảo trì.',
    explanationEn: 'Textbook page 151 demonstrates that if...elif...else replaces rightward indentation staircase ladders with flat, clean, and maintainable syntax.'
  },
  {
    id: 7,
    questionVi: 'Trong phần Luyện tập 1 (Trang 152), cấu trúc lặp nào phù hợp nhất để kiểm tra và bắt buộc nhập số thực dương a > 0?',
    questionEn: 'In Practice 1 (Page 152), which loop construct is best suited to enforce positive input a > 0?',
    optionsVi: [
      'for i in range(10): nhập a',
      'Vòng lặp while kiểm tra a <= 0 và yêu cầu nhập lại đến khi a > 0',
      'Chỉ dùng một lệnh if đơn giản',
      'Dùng lệnh try...except ValueError'
    ],
    optionsEn: [
      'for i in range(10): input a',
      'A while loop checking a <= 0 prompting re-entry until a > 0',
      'A single if statement',
      'Using try...except ValueError'
    ],
    correctIndex: 1,
    explanationVi: 'Để lặp lại số lần không biết trước cho đến khi người dùng nhập đúng số thực dương (a > 0), ta dùng vòng lặp while với điều kiện lặp a <= 0 (hoặc while True và break khi a > 0).',
    explanationEn: 'To repeat an indeterminate number of times until user inputs a valid positive float (a > 0), use a while loop with condition a <= 0 (or while True with break when a > 0).'
  },
  {
    id: 8,
    questionVi: 'Trong thế kỉ XXI (từ năm 2001 đến năm 2100), có bao nhiêu năm nhuận?',
    questionEn: 'In the 21st century (from year 2001 to year 2100), how many leap years are there?',
    optionsVi: [
      '25 năm',
      '24 năm',
      '26 năm',
      '20 năm'
    ],
    optionsEn: [
      '25 years',
      '24 years',
      '26 years',
      '20 years'
    ],
    correctIndex: 1,
    explanationVi: 'Khoảng từ 2001 đến 2100 có 25 năm chia hết cho 4 (từ 2004 đến 2100). Nhưng năm 2100 chia hết cho 100 mà KHÔNG chia hết cho 400 nên không phải năm nhuận! Vì vậy chỉ có 25 - 1 = 24 năm nhuận.',
    explanationEn: 'Between 2001 and 2100 there are 25 years divisible by 4 (from 2004 to 2100). However, year 2100 is divisible by 100 but NOT by 400, so it is NOT a leap year! Thus exactly 25 - 1 = 24 leap years.'
  },
  {
    id: 9,
    questionVi: 'Công thức thuật toán Euclid modulo tính ƯCLN (Vận dụng 2) là gì?',
    questionEn: 'What is the Euclidean modulo identity for GCD in Application 2?',
    optionsVi: [
      'UCLN(a, b) = a + b',
      'UCLN(a, b) = UCLN(b, a % b) nếu b > 0 và UCLN(a, 0) = a',
      'UCLN(a, b) = UCLN(a - b, b)',
      'UCLN(a, b) = a * b'
    ],
    optionsEn: [
      'GCD(a, b) = a + b',
      'GCD(a, b) = GCD(b, a % b) if b > 0 and GCD(a, 0) = a',
      'GCD(a, b) = GCD(a - b, b)',
      'GCD(a, b) = a * b'
    ],
    correctIndex: 1,
    explanationVi: 'SGK trang 152: UCLN(a, b) = UCLN(b, a % b) nếu b > 0 và UCLN(a, 0) = a. Thuật toán này dùng phép chia lấy dư % thay cho phép trừ liên tiếp nên tốc độ hội tụ cực nhanh.',
    explanationEn: 'Textbook page 152 states: GCD(a, b) = GCD(b, a % b) if b > 0 and GCD(a, 0) = a. Using modulo reduction instead of repeated subtraction achieves logarithmic convergence.'
  },
  {
    id: 10,
    questionVi: 'Khi in bảng cửu chương theo yêu cầu Luyện tập 2, làm thế nào để in bảng nhân 1, 2, 3, 4, 5 trên cùng một hàng ngang?',
    questionEn: 'In Practice 2 multiplication table, how can we print tables 1..5 aligned horizontally on the same rows?',
    optionsVi: [
      'Dùng tham số end="\\t" hoặc định dạng khoảng cách trong lệnh print()',
      'Dùng 100 câu lệnh print() riêng biệt',
      'Dùng lệnh input() ngắt dòng',
      'Không thể in các bảng nhân trên cùng hàng ngang trong Python'
    ],
    optionsEn: [
      'Using end="\\t" parameter or formatted column padding in print()',
      'Using 100 individual print() statements',
      'Using input() to break lines',
      'Impossible to print tables horizontally in Python'
    ],
    correctIndex: 0,
    explanationVi: 'Trong Python, lệnh print(..., end="\\t") hoặc f"{val:15}" cho phép in liên tiếp các phần tử trên cùng hàng ngang với khoảng cách tab đều đặn giữa các cột.',
    explanationEn: 'In Python, print(..., end="\\t") or column format specifiers allow continuous horizontal printing with uniform tab separation across columns.'
  }
];
