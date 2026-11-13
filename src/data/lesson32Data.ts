import { TermDefinition } from './lessonData';
import { QuizQuestion } from './lesson2Data';

export const LESSON_32_GLOSSARY: TermDefinition[] = [
  {
    id: 'name-tokenization',
    termVi: 'Tách họ, đệm và tên',
    termEn: 'Name Tokenization & Slicing',
    ipa: '/neɪm ˌtəʊ.kən.aɪˈzeɪ.ʃən ænd ˈslaɪ.sɪŋ/',
    definitionVi: 'Kỹ thuật dùng hàm split() tách chuỗi họ tên thành danh sách các từ, sau đó lấy họ slist[0], tên slist[n-1] và dùng " ".join(slist[1:n-1]) để gộp phần đệm.',
    definitionEn: 'Technique using split() to break a full name into words, retrieving surname slist[0], given name slist[n-1], and slicing " ".join(slist[1:n-1]) for middle names.',
    exampleVi: 'hoten = "Nguyễn Thị Mai Hương" -> ho = "Nguyễn", ten = "Hương", dem = "Thị Mai".',
    exampleEn: 'hoten = "Nguyen Thi Mai Huong" -> ho = "Nguyen", ten = "Huong", dem = "Thi Mai".',
    sgkContext: 'SGK Trang 153 – Nhiệm vụ 1'
  },
  {
    id: 'gravitational-acceleration',
    termVi: 'Gia tốc trọng trường hành tinh',
    termEn: 'Planetary Gravitational Acceleration',
    ipa: '/ˌplæn.ɪ.tər.i ˌɡræv.ɪˈteɪ.ʃən.əl əkˌsel.əˈreɪ.ʃən/',
    definitionVi: 'Gia tốc g tác dụng lên vật thể trên bề mặt mỗi thiên thể. Trên Trái Đất g = 9.8 m/s², Mặt Trăng g = 1.62 m/s², Mộc tinh g = 24.79 m/s², Mặt Trời g = 274.0 m/s².',
    definitionEn: 'Acceleration g exerted on objects on celestial surfaces. On Earth g = 9.8 m/s², Moon g = 1.62 m/s², Jupiter g = 24.79 m/s², Sun g = 274.0 m/s².',
    exampleVi: 'Công thức đổi trọng lượng: P = P_earth * g_planet / 9.8 (N).',
    exampleEn: 'Weight conversion formula: P = P_earth * g_planet / 9.8 (N).',
    sgkContext: 'SGK Trang 153 – 154 – Nhiệm vụ 2: weight.py'
  },
  {
    id: 'interdisciplinary-computing',
    termVi: 'Lập trình liên môn',
    termEn: 'Interdisciplinary Computing',
    ipa: '/ˌɪn.təˌdɪs.əˈplɪn.ər.i kəmˈpjuː.tɪŋ/',
    definitionVi: 'Vận dụng ngôn ngữ lập trình để giải quyết các bài toán khoa học thực tế từ các môn học khác như Vật lý (trọng lượng hành tinh), Thiên văn (lịch & năm nhuận), Địa lý và Ngôn ngữ học.',
    definitionEn: 'Applying programming concepts to solve cross-disciplinary scientific problems from Physics (planetary weight), Astronomy (calendars & leap years), Geography, and Linguistics.',
    exampleVi: 'Tính trọng lượng trên các hành tinh (Vật lý) và thẩm định ngày tháng lịch thiên văn.',
    exampleEn: 'Calculating planetary weights (Physics) and validating astronomical calendar dates.',
    sgkContext: 'SGK Trang 153 – Mục tiêu bài học'
  },
  {
    id: 'calendar-date-validation',
    termVi: 'Kiểm tra tính hợp lệ của ngày tháng',
    termEn: 'Calendar Date Validation',
    ipa: '/ˈkæl.ən.dər deɪt ˌvæl.ɪˈdeɪ.ʃən/',
    definitionVi: 'Kiểm tra bộ ba (day, month, year) có thoả mãn quy chuẩn lịch: year > 0, 1 <= month <= 12 và 1 <= day <= thang[month-1], có xét năm nhuận cho tháng 2.',
    definitionEn: 'Verifying triad (day, month, year) against calendar rules: year > 0, 1 <= month <= 12, and 1 <= day <= thang[month-1], adjusting February for leap years.',
    exampleVi: '29-02-2020 là hợp lệ (năm nhuận); 29-02-2021 là không hợp lệ.',
    exampleEn: '29-02-2020 is valid (leap year); 29-02-2021 is invalid.',
    sgkContext: 'SGK Trang 154 – 155 – Nhiệm vụ 3: date.py'
  },
  {
    id: 'vietnamese-alphabetical-sorting',
    termVi: 'Sắp xếp chữ cái tiếng Việt (Tên - Họ - Đệm)',
    termEn: 'Vietnamese Alphabetical Collation',
    ipa: '/ˌvjet.nəˈmiːz ˌæl.fəˈbet.ɪ.kəl kəˈleɪ.ʃən/',
    definitionVi: 'Quy chuẩn sắp xếp danh sách học sinh theo thứ tự ưu tiên: tên trước, rồi đến họ, rồi đến đệm; tuân thủ thứ tự 89 kí tự bảng chữ cái tiếng Việt có dấu thanh.',
    definitionEn: 'Standard student sorting hierarchy: Given name first, then surname, then middle names; adhering to the 89-character Vietnamese diacritical alphabet sequence.',
    exampleVi: 'Ưu tiên tên: "Hương" trước "Nam", nếu cùng tên "Hương" so sánh họ "Lê" trước "Nguyễn".',
    exampleEn: 'Given name prioritized: "Huong" before "Nam", if both "Huong", compare surname "Le" before "Nguyen".',
    sgkContext: 'SGK Trang 155 – Luyện tập & Vận dụng 2'
  },
  {
    id: 'excel-serial-date',
    termVi: 'Số ngày tuần tự bảng tính điện tử',
    termEn: 'Spreadsheet Serial Date System',
    ipa: '/ˈspred.ʃiːt ˈsɪə.ri.əl deɪt ˈsɪs.təm/',
    definitionVi: 'Quy ước trong phần mềm bảng tính (Excel/Calc) coi ngày tháng là số nguyên đếm số ngày liên tục bắt đầu từ mốc chuẩn 1-1-1900 (ngày 1).',
    definitionEn: 'Convention in spreadsheet software (Excel/Calc) storing dates as sequential serial integers starting from epoch 1-1-1900 (Day 1).',
    exampleVi: 'Ví dụ ngày 8-10-2021 ứng với số ngày tuần tự trong bảng tính điện tử.',
    exampleEn: 'Example: date 08-10-2021 corresponds to an integer serial day count in spreadsheets.',
    sgkContext: 'SGK Trang 155 – Vận dụng 1'
  },
  {
    id: 'prime-sqrt-optimization',
    termVi: 'Tối ưu hoá căn bậc hai nguyên tố O(√n)',
    termEn: 'O(√n) Prime Trial Division Bound',
    ipa: '/əʊ skweər ruːt en praɪm traɪəl dɪˈvɪʒ.ən baʊnd/',
    definitionVi: 'Định lý số học: Nếu n là hợp số thì bắt buộc phải có ước số nguyên tố nhỏ hơn hoặc bằng căn bậc hai của n (k <= √n). Nếu duyệt đến √n không có ước thì n là số nguyên tố.',
    definitionEn: 'Number theory theorem: If n is composite, it must have a prime factor <= √n. If no factor divides n up to √n, n is guaranteed to be prime.',
    exampleVi: 'Để kiểm tra n = 1000000, chỉ cần thử các số nguyên tố đến 1000 thay vì duyệt 1 triệu lần.',
    exampleEn: 'To test n = 1000000, trial division only checks primes up to 1000 instead of 1 million.',
    sgkContext: 'SGK Trang 155 – Vận dụng 3'
  },
  {
    id: 'string-slicing-middle',
    termVi: 'Trích xuất đoạn con slist[1:n-1]',
    termEn: 'Sublist Slicing slist[1:n-1]',
    ipa: '/ˈsʌb.lɪst ˈslaɪ.sɪŋ/',
    definitionVi: 'Toán tử cắt lát danh sách từ chỉ số 1 (bỏ phần tử đầu slist[0]) đến trước chỉ số n-1 (bỏ phần tử cuối slist[n-1]), trả về toàn bộ phần tử nằm ở giữa.',
    definitionEn: 'List slicing from index 1 (skipping first element slist[0]) to before index n-1 (skipping last element slist[n-1]), yielding all intermediate elements.',
    exampleVi: 'slist = ["Nguyễn", "Thị", "Mai", "Hương"] -> slist[1:3] là ["Thị", "Mai"].',
    exampleEn: 'slist = ["Nguyen", "Thi", "Mai", "Huong"] -> slist[1:3] is ["Thi", "Mai"].',
    sgkContext: 'SGK Trang 153 – dem = " ".join(slist[1:n-1])'
  },
  {
    id: 'parallel-lists-lookup',
    termVi: 'Tra cứu danh sách song song',
    termEn: 'Parallel Lists Lookup',
    ipa: '/ˈpær.ə.lel lɪsts ˈlʊk.aʊt/',
    definitionVi: 'Kỹ thuật lưu trữ hai hay nhiều danh sách có các phần tử tương ứng cùng chỉ số, ví dụ planet[k-1] chứa tên và gravities[k-1] chứa trọng lực.',
    definitionEn: 'Technique maintaining two or more lists where elements at identical indices correlate, e.g. planet[k-1] and gravities[k-1].',
    exampleVi: 'k = 2: planet[1] = "Hoả tinh", gravities[1] = 3.711 m/s².',
    exampleEn: 'k = 2: planet[1] = "Mars", gravities[1] = 3.711 m/s².',
    sgkContext: 'SGK Trang 154 – weight.py'
  },
  {
    id: 'composite-condition-guard',
    termVi: 'Điều kiện logic tổng hợp',
    termEn: 'Composite Boolean Guard',
    ipa: '/kəmˈpɒz.ɪt ˈbuː.li.ən ɡɑːd/',
    definitionVi: 'Biểu thức điều kiện kết hợp nhiều tiêu chí bằng toán tử and/or để kiểm tra tính toàn vẹn của dữ liệu trong một dòng lệnh duy nhất.',
    definitionEn: 'Boolean expression combining multiple criteria via and/or operators to ensure data integrity in a single concise line.',
    exampleVi: 'year > 0 and 1 <= month <= 12 and 1 <= day <= thang[month-1].',
    exampleEn: 'year > 0 and 1 <= month <= 12 and 1 <= day <= thang[month-1].',
    sgkContext: 'SGK Trang 155 – date.py'
  }
];

export const LESSON_32_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: 'Trong Nhiệm vụ 1, khi nhập họ tên "Nguyễn Thị Mai Hương", câu lệnh dem = " ".join(slist[1:n-1]) sẽ cho kết quả biến dem là gì?',
    questionEn: 'In Task 1, given full name "Nguyen Thi Mai Huong", what is the value of dem = " ".join(slist[1:n-1])?',
    optionsVi: [
      '"Thị Mai"',
      '"Nguyễn Thị"',
      '"Mai Hương"',
      '"Thị Mai Hương"'
    ],
    optionsEn: [
      '"Thi Mai"',
      '"Nguyen Thi"',
      '"Mai Huong"',
      '"Thi Mai Huong"'
    ],
    correctIndex: 0,
    explanationVi: 'Danh sách slist có 4 phần tử: [0]: "Nguyễn", [1]: "Thị", [2]: "Mai", [3]: "Hương". slist[1:3] lấy từ chỉ số 1 đến trước 3 là ["Thị", "Mai"]. Lệnh join() nối lại thành "Thị Mai".',
    explanationEn: 'slist contains 4 elements: [0]: "Nguyen", [1]: "Thi", [2]: "Mai", [3]: "Huong". slist[1:3] slices indices 1 and 2, yielding ["Thi", "Mai"]. join() merges them into "Thi Mai".'
  },
  {
    id: 2,
    questionVi: 'Nếu người dùng chỉ nhập họ tên có 2 từ như "Trần Nam" (n = 2), điều kiện if n > 2 trong chương trình Nhiệm vụ 1 có tác dụng gì?',
    questionEn: 'If a user inputs a 2-word name like "Tran Nam" (n = 2), what does condition if n > 2 do in Task 1?',
    optionsVi: [
      'Báo lỗi IndexError',
      'Không in dòng "Đệm của em là" vì người này không có phần tên đệm',
      'Tự động thêm chữ "Văn" vào đệm',
      'Yêu cầu người dùng nhập lại họ tên'
    ],
    optionsEn: [
      'Raises IndexError',
      'Skips printing "Dem cua em la" because the person has no middle name',
      'Automatically inserts "Van" as middle name',
      'Prompts user to re-enter name'
    ],
    correctIndex: 1,
    explanationVi: 'Khi n = 2 (chỉ có họ và tên), phần tử đệm không tồn tại (slist[1:1] là danh sách rỗng). Lệnh if n > 2 bảo đảm chỉ in thông báo tên đệm khi họ tên có từ 3 từ trở lên.',
    explanationEn: 'When n = 2, middle name slice slist[1:1] is empty. if n > 2 ensures the middle name output line only prints when the full name has 3 or more words.'
  },
  {
    id: 3,
    questionVi: 'Công thức chuyển đổi trọng lượng từ Trái Đất (P0) sang hành tinh khác (P) với gia tốc Grp trong Nhiệm vụ 2 là gì?',
    questionEn: 'What is the formula converting Earth weight (P0) to planetary weight (P) with gravity Grp in Task 2?',
    optionsVi: [
      'P = P0 * Grp * 9.8',
      'P = P0 * Grp / 9.8',
      'P = P0 / (Grp * 9.8)',
      'P = Grp / 9.8'
    ],
    optionsEn: [
      'P = P0 * Grp * 9.8',
      'P = P0 * Grp / 9.8',
      'P = P0 / (Grp * 9.8)',
      'P = Grp / 9.8'
    ],
    correctIndex: 1,
    explanationVi: 'Vì khối lượng không đổi m = P0 / 9.8, nên trọng lượng trên hành tinh khác là P = m * Grp = P0 * Grp / 9.8.',
    explanationEn: 'Since mass is constant m = P0 / 9.8, the weight on another celestial body is P = m * Grp = P0 * Grp / 9.8.'
  },
  {
    id: 4,
    questionVi: 'Gia tốc trọng trường trên Mặt Trăng là 1.62 m/s². Một bạn có trọng lượng 490 N trên Trái Đất thì trên Mặt Trăng nặng bao nhiêu Newton?',
    questionEn: 'Moon gravity is 1.62 m/s². A student weighing 490 N on Earth weighs how many Newtons on the Moon?',
    optionsVi: [
      '81 N',
      '490 N',
      '162 N',
      '24.79 N'
    ],
    optionsEn: [
      '81 N',
      '490 N',
      '162 N',
      '24.79 N'
    ],
    correctIndex: 0,
    explanationVi: 'Khối lượng m = 490 / 9.8 = 50 kg. Trọng lượng trên Mặt Trăng P = 50 * 1.62 = 81 N (nhẹ hơn khoảng 6 lần so với Trái Đất).',
    explanationEn: 'Mass m = 490 / 9.8 = 50 kg. Moon weight P = 50 * 1.62 = 81 N (approximately 6 times lighter than on Earth).'
  },
  {
    id: 5,
    questionVi: 'Hàm nhuan(year) trong chương trình date.py (Nhiệm vụ 3) được viết bằng biểu thức lôgic nào?',
    questionEn: 'What boolean expression implements function nhuan(year) in date.py (Task 3)?',
    optionsVi: [
      'return year % 4 == 0',
      'return year % 400 == 0 or (year % 4 == 0 and year % 100 != 0)',
      'return year % 100 != 0',
      'return year % 400 == 0 and year % 4 == 0'
    ],
    optionsEn: [
      'return year % 4 == 0',
      'return year % 400 == 0 or (year % 4 == 0 and year % 100 != 0)',
      'return year % 100 != 0',
      'return year % 400 == 0 and year % 4 == 0'
    ],
    correctIndex: 1,
    explanationVi: 'Năm nhuận dương lịch là năm chia hết cho 400 hoặc (chia hết cho 4 và không chia hết cho 100).',
    explanationEn: 'A Gregorian leap year is divisible by 400 or (divisible by 4 and not divisible by 100).'
  },
  {
    id: 6,
    questionVi: 'Trong date.py, tại sao số ngày của tháng được kiểm tra bằng điều kiện: 1 <= day <= thang[month-1]?',
    questionEn: 'In date.py, why are the day limits checked using 1 <= day <= thang[month-1]?',
    optionsVi: [
      'Vì danh sách thang trong Python đánh chỉ số từ 0, nên tháng 1 ở thang[0], tháng m ở thang[m-1]',
      'Vì tháng 12 không có trong danh sách',
      'Vì để trừ bớt 1 ngày nhuận',
      'Vì hàm split() tự động giảm 1 đơn vị'
    ],
    optionsEn: [
      'Because Python lists are 0-indexed, so month 1 is at thang[0] and month m is at thang[m-1]',
      'Because month 12 is omitted from the list',
      'To deduct 1 leap day',
      'Because split() automatically decrements by 1'
    ],
    correctIndex: 0,
    explanationVi: 'Trong Python, danh sách có chỉ số từ 0 đến len-1. Tháng 1 ứng với chỉ số 0, do đó tháng m ứng với vị trí thang[month-1].',
    explanationEn: 'Python lists are 0-indexed. Month 1 corresponds to index 0, so month m corresponds to element thang[month-1].'
  },
  {
    id: 7,
    questionVi: 'Khi nhập ngày "29-02-2024", chương trình date.py sẽ đưa ra kết luận gì?',
    questionEn: 'When entering "29-02-2024", what conclusion does date.py output?',
    optionsVi: [
      'Bộ dữ liệu đã nhập không hợp lệ',
      '29 - 2 - 2024 là hợp lệ',
      'Báo lỗi ValueError',
      'Báo lỗi IndexError'
    ],
    optionsEn: [
      'Dataset entered is invalid',
      '29 - 2 - 2024 is valid',
      'ValueError exception',
      'IndexError exception'
    ],
    correctIndex: 1,
    explanationVi: 'Năm 2024 chia hết cho 4 và không chia hết cho 100 nên là năm nhuận. Khi đó thang[1] = 29, ngày 29 tháng 2 hoàn toàn hợp lệ.',
    explanationEn: 'Year 2024 is divisible by 4 and not 100, hence a leap year. thang[1] = 29, so day 29 is completely valid.'
  },
  {
    id: 8,
    questionVi: 'Theo quy định sắp xếp học sinh trong phần Luyện tập và Vận dụng 2, thứ tự ưu tiên sắp xếp là gì?',
    questionEn: 'According to student sorting rules in Practice and Application 2, what is the priority order?',
    optionsVi: [
      'Họ -> Đệm -> Tên',
      'Tên -> Họ -> Đệm',
      'Đệm -> Tên -> Họ',
      'Tên -> Đệm -> Họ'
    ],
    optionsEn: [
      'Surname -> Middle name -> Given name',
      'Given name -> Surname -> Middle name',
      'Middle name -> Given name -> Surname',
      'Given name -> Middle name -> Surname'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 155 (Vận dụng 2) quy định: Việc sắp xếp thứ tự phải ưu tiên tính theo TÊN trước, rồi đến HỌ, rồi đến ĐỆM theo bảng chữ cái tiếng Việt.',
    explanationEn: 'Textbook page 155 specifies: Sorting priority must evaluate GIVEN NAME first, then SURNAME, then MIDDLE NAME using Vietnamese alphabet.'
  },
  {
    id: 9,
    questionVi: 'Định lý số học trong Vận dụng 3 giúp tối ưu hoá thuật toán kiểm tra số nguyên tố n như thế nào?',
    questionEn: 'How does the number theory theorem in Application 3 optimize prime checking for number n?',
    optionsVi: [
      'Chỉ cần tìm ước số nguyên tố nhỏ hơn hoặc bằng căn bậc hai của n (k <= √n), giảm độ phức tạp từ O(n) xuống O(√n)',
      'Chỉ cần kiểm tra xem n có phải số chẵn không',
      'Chỉ cần kiểm tra với số 2 và số 3',
      'Không thể tối ưu hoá thuật toán kiểm tra số nguyên tố'
    ],
    optionsEn: [
      'Only checks prime trial divisors up to square root of n (k <= √n), reducing complexity from O(n) to O(√n)',
      'Only checks if n is even',
      'Only checks 2 and 3',
      'Prime checking cannot be optimized'
    ],
    correctIndex: 0,
    explanationVi: 'Nếu n là hợp số thì n = a * b với a <= b, suy ra a^2 <= a * b = n, do đó a <= √n. Vì vậy ước nguyên tố nhỏ nhất chắc chắn <= √n. Ta chỉ cần duyệt đến √n.',
    explanationEn: 'If n is composite, n = a * b with a <= b, meaning a^2 <= n, so a <= √n. The smallest prime factor must be <= √n, cutting iterations drastically to O(√n).'
  },
  {
    id: 10,
    questionVi: 'Trong các phần mềm bảng tính điện tử (Vận dụng 1), mốc thời gian ngày số 1 tương ứng với ngày nào?',
    questionEn: 'In electronic spreadsheets (Application 1), Day 1 corresponds to which date epoch?',
    optionsVi: [
      'Ngày 01-01-2000',
      'Ngày 01-01-1970 (Unix Epoch)',
      'Ngày 01-01-1900',
      'Ngày 01-01-2021'
    ],
    optionsEn: [
      'January 1, 2000',
      'January 1, 1970 (Unix Epoch)',
      'January 1, 1900',
      'January 1, 2021'
    ],
    correctIndex: 2,
    explanationVi: 'SGK Trang 155 ghi rõ: Trong các phần mềm bảng tính điện tử, dữ liệu ngày tháng được coi là số ngày tính từ mốc ngày 1-1-1900 (ngày 1-1-1900 là ngày số 1).',
    explanationEn: 'Textbook page 155 specifies: In electronic spreadsheet software, date values represent sequential days starting from January 1, 1900 as Day 1.'
  }
];
