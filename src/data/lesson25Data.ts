import { QuizQuestion } from './lesson2Data';
import { TermDefinition } from './lessonData';

export const LESSON_25_GLOSSARY: TermDefinition[] = [
  {
    id: 't25-1',
    termVi: 'Phương thức (Method)',
    termEn: 'Method',
    ipa: '/ˈmeθ.əd/',
    definitionVi: 'Lệnh đặc biệt gắn liền với kiểu dữ liệu đối tượng trong Python, được gọi theo cú pháp: <đối tượng>.<phương thức>(tham số).',
    definitionEn: 'A function associated with an object data type in Python, invoked using the syntax: <object>.<method>(arguments).',
    exampleVi: 's.find("b"), s.split(), " ".join(A)',
    exampleEn: 's.find("b"), s.split(), " ".join(A)',
    sgkContext: 'SGK Trang 124: "Tương tự danh sách, Python cũng có một số lệnh đặc biệt dành riêng cho xâu kí tự (phương thức). Cách thực hiện phương thức là: <xâu>.<phương thức>"'
  },
  {
    id: 't25-2',
    termVi: 'Phương thức find()',
    termEn: 'find() method',
    ipa: '/faɪnd/',
    definitionVi: 'Phương thức tìm kiếm vị trí xuất hiện đầu tiên của xâu con trong xâu mẹ. Trả về chỉ số vị trí (bắt đầu từ 0) hoặc -1 nếu không tìm thấy.',
    definitionEn: 'String method searching for the first occurrence of a substring. Returns the index (0-based) or -1 if not found.',
    exampleVi: 's = "ab bc"; s.find("b") -> 1; s.find("AB") -> -1',
    exampleEn: 's.find("th") -> 2, s.find("x") -> -1',
    sgkContext: 'SGK Trang 123 & 124: "Lệnh sẽ tìm vị trí đầu tiên của xâu con trong xâu mẹ và trả về vị trí đó. Nếu không tìm thấy thì trả về -1."'
  },
  {
    id: 't25-3',
    termVi: 'Tham số start trong find()',
    termEn: 'start parameter in find()',
    ipa: '/stɑːrt pəˈræm.ɪ.tər/',
    definitionVi: 'Tham số tuỳ chọn quy định chỉ số bắt đầu tìm kiếm trong xâu mẹ theo cú pháp: <xâu mẹ>.find(<xâu con>, start).',
    definitionEn: 'Optional parameter specifying the starting index for search in the target string: <target>.find(<sub_string>, start).',
    exampleVi: 's.find("Đà Nẵng", 10) -> -1',
    exampleEn: '"ababab".find("ab", 4) -> 4',
    sgkContext: 'SGK Trang 124: "Cú pháp đầy đủ của lệnh find(): <xâu mẹ>.find(<xâu con>, start). Lệnh sẽ tìm vị trí xâu con bắt đầu từ vị trí start."'
  },
  {
    id: 't25-4',
    termVi: 'Phương thức split()',
    termEn: 'split() method',
    ipa: '/splɪt/',
    definitionVi: 'Phương thức tách một xâu thành danh sách các từ. Kí tự phân tách mặc định là khoảng trắng (tự động gộp nhiều khoảng trắng liên tiếp).',
    definitionEn: 'String method splitting a string into a list of words. The default separator is whitespace (automatically handling consecutive spaces).',
    exampleVi: '"Tiên học lễ".split() -> [\'Tiên\', \'học\', \'lễ\']',
    exampleEn: '"Hello World".split() -> [\'Hello\', \'World\']',
    sgkContext: 'SGK Trang 124 & 125: "Lệnh split() tách một xâu thành các từ và đưa vào một danh sách. Kí tự tách dùng để phân tách các từ mặc định là dấu cách."'
  },
  {
    id: 't25-5',
    termVi: 'Kí tự phân tách (Delimiter/Separator)',
    termEn: 'Delimiter / Separator',
    ipa: '/dɪˈlɪm.ɪ.tər/',
    definitionVi: 'Kí tự hoặc chuỗi kí tự dùng làm mốc phân chia các từ trong lệnh split(<kí tự tách>).',
    definitionEn: 'A character or string used as the boundary marker to divide words in split(<separator>).',
    exampleVi: '"0,1,2,3,4,5".split(",") -> [\'0\', \'1\', \'2\', \'3\', \'4\', \'5\']',
    exampleEn: '"a,b,c".split(",") -> [\'a\', \'b\', \'c\']',
    sgkContext: 'SGK Trang 125: "Kí tự tách dùng để phân tách các từ mặc định là dấu cách, tuy nhiên có thể thay thế kí tự tách bằng kí tự khác."'
  },
  {
    id: 't25-6',
    termVi: 'Phương thức join()',
    termEn: 'join() method',
    ipa: '/dʒɔɪn/',
    definitionVi: 'Phương thức nối các phần tử xâu trong một danh sách thành một xâu duy nhất, ngăn cách bởi xâu nối: "<kí tự nối>".join(<danh sách>).',
    definitionEn: 'String method joining list elements (strings) into a single string separated by a connector: "<connector>".join(<list>).',
    exampleVi: '" ".join([\'Tiên\', \'học\', \'lễ\']) -> \'Tiên học lễ\'',
    exampleEn: '"-".join([\'2026\', \'10\', \'31\']) -> \'2026-10-31\'',
    sgkContext: 'SGK Trang 125: "Lệnh join() có tác dụng ngược với lệnh split(), có chức năng nối các phần tử (là xâu) của một danh sách thành một xâu."'
  },
  {
    id: 't25-7',
    termVi: 'Toán tử in (Xâu con)',
    termEn: 'Membership "in" operator',
    ipa: '/ɪn/',
    definitionVi: 'Toán tử kiểm tra một xâu có nằm trọn vẹn trong xâu khác hay không. Trả về True nếu là xâu con, ngược lại trả về False.',
    definitionEn: 'Operator checking whether a string is contained within another string. Returns True if substring, otherwise False.',
    exampleVi: '"abc" in "123abc" -> True; "010" in "1101" -> False',
    exampleEn: '"sub" in "substring" -> True',
    sgkContext: 'SGK Trang 123: "Biểu thức kiểm tra <xâu 1> nằm trong <xâu 2> là: <xâu 1> in <xâu 2>. Nếu đúng thì trả lại giá trị True, nếu sai trả lại giá trị False."'
  },
  {
    id: 't25-8',
    termVi: 'Chuẩn hoá khoảng trắng',
    termEn: 'Whitespace Normalization',
    ipa: '/ˈwaɪt.speɪs ˌnɔːr.mə.laɪˈzeɪ.ʃən/',
    definitionVi: 'Kỹ thuật rút gọn các chuỗi nhiều khoảng trắng thừa giữa các từ về đúng một khoảng trắng bằng cách kết hợp: " ".join(s.split()).',
    definitionEn: 'Technique reducing redundant whitespace between words down to a single space using the idiom: " ".join(s.split()).',
    exampleVi: 's = "  Học   hành  "; " ".join(s.split()) -> "Học hành"',
    exampleEn: '" ".join(s.split()) cleans extra spaces.',
    sgkContext: 'SGK Trang 126 Nhiệm vụ 2: "Chuyển xâu kí tự ban đầu thành danh sách các từ đơn bằng lệnh split(), sau đó nối các từ đơn này bằng lệnh join()."'
  },
  {
    id: 't25-9',
    termVi: 'Tách Tên và Họ Đệm',
    termEn: 'Name Decomposition',
    ipa: '/neɪm ˌdiː.kɒm.pəˈzɪʃ.ən/',
    definitionVi: 'Kỹ thuật tách họ tên học sinh: tên luôn là từ cuối cùng ở chỉ số len(sline)-1, phần còn lại ghép lại bằng " ".join() thành họ đệm.',
    definitionEn: 'Vietnamese name separation: the last token at len(sline)-1 is the given name, and the remaining joined words form the surname/middle name.',
    exampleVi: 'ten = sline[len(sline)-1]; hodem = " ".join(sline[:len(sline)-1])',
    exampleEn: 'last element is given name, remainder is surname/middle.',
    sgkContext: 'SGK Trang 126 Nhiệm vụ 3: "Họ tên ban đầu tách ra thành tên và họ đệm bằng lệnh split(). Các tên được đưa vào danh sách ten, các họ đệm đưa vào hodem."'
  },
  {
    id: 't25-10',
    termVi: 'Nhập mảng số trên 1 dòng',
    termEn: 'Single-line Multiple Input',
    ipa: '/ˈsɪŋ.ɡəl laɪn ˈɪn.pʊt/',
    definitionVi: 'Mô hình nhập nhiều số cách nhau bởi dấu cách qua input().split(), sau đó duyệt ép kiểu int() hoặc float() đưa vào danh sách số.',
    definitionEn: 'Standard Python pattern for reading space-separated numbers via input().split(), then converting elements via int() or float().',
    exampleVi: 'for x in input().split(): nline.append(int(x))',
    exampleEn: '[int(x) for x in input().split()]',
    sgkContext: 'SGK Trang 125 Nhiệm vụ 1: "Dữ liệu nhập vào là một xâu. Dùng lệnh split() để tách thành danh sách. Chuyển các phần tử của danh sách này thành số và in ra."'
  }
];

export const LESSON_25_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: 'Để kiểm tra xâu s1 có nằm trong xâu s2 hay không mà chỉ cần kết quả Đúng/Sai (True/False), biểu thức nào là chuẩn xác nhất?',
    questionEn: 'Which expression is best to test if substring s1 is inside s2 returning only True/False?',
    optionsVi: [
      's1 in s2',
      's2 in s1',
      's1.find(s2) == True',
      's1.has(s2)'
    ],
    optionsEn: [
      's1 in s2',
      's2 in s1',
      's1.find(s2) == True',
      's1.has(s2)'
    ],
    correctIndex: 0,
    explanationVi: 'Theo mục 1 trang 123 SGK, cú pháp kiểm tra xâu con là <xâu 1> in <xâu 2>. Nếu xâu 1 nằm trong xâu 2 sẽ trả về True, ngược lại False.',
    explanationEn: 'According to page 123 of the textbook, the substring containment expression is <str1> in <str2>, returning True or False.'
  },
  {
    id: 2,
    questionVi: 'Khi sử dụng phương thức find(), nếu xâu con không xuất hiện trong xâu mẹ, kết quả trả về là gì?',
    questionEn: 'When using the find() method, what value is returned if the substring is not found?',
    optionsVi: [
      'False',
      '0',
      '-1',
      'Báo lỗi ValueError'
    ],
    optionsEn: [
      'False',
      '0',
      '-1',
      'Raises a ValueError'
    ],
    correctIndex: 2,
    explanationVi: 'Theo SGK trang 123 và 124: Nếu không tìm thấy xâu con trong xâu mẹ, lệnh find() trả về giá trị số nguyên -1.',
    explanationEn: 'According to pages 123-124: If the substring is not found in the target string, find() returns -1.'
  },
  {
    id: 3,
    questionVi: 'Cho câu lệnh: >>> "ababababab".find("ab", 4). Kết quả trả về của lệnh này là bao nhiêu? (Câu hỏi củng cố 2 trang 124 SGK)',
    questionEn: 'For the statement: >>> "ababababab".find("ab", 4). What is the returned result? (Review Q2, p. 124)',
    optionsVi: [
      '0',
      '2',
      '4',
      '6'
    ],
    optionsEn: [
      '0',
      '2',
      '4',
      '6'
    ],
    correctIndex: 2,
    explanationVi: 'Xâu có "ab" tại các vị trí chỉ số 0, 2, 4, 6, 8. Khi truyền tham số start = 4, tìm kiếm bắt đầu từ chỉ số 4, tại đây bắt đầu ngay xâu "ab" nên trả về 4.',
    explanationEn: '"ab" occurs at indices 0, 2, 4, 6, 8. With start=4, search begins at index 4 where "ab" begins immediately, returning 4.'
  },
  {
    id: 4,
    questionVi: 'Cho lệnh: >>> "010" in "001100". Biểu thức lôgic này trả lại giá trị gì? (Câu hỏi củng cố 1 trang 124 SGK)',
    questionEn: 'For: >>> "010" in "001100". What boolean value does this expression return? (Review Q1, p. 124)',
    optionsVi: [
      'True',
      'False',
      'None',
      'Báo lỗi cú pháp SyntaxError'
    ],
    optionsEn: [
      'True',
      'False',
      'None',
      'Raises SyntaxError'
    ],
    correctIndex: 1,
    explanationVi: 'Trong xâu "001100", các xâu con 3 kí tự liên tiếp gồm: "001", "011", "110", "100". Không có xâu con nào là "010", do đó trả về False.',
    explanationEn: 'The 3-character substrings of "001100" are "001", "011", "110", "100". None is "010", so the operator evaluates to False.'
  },
  {
    id: 5,
    questionVi: 'Nếu gọi phương thức split() mà không truyền tham số: s.split(), Python sẽ sử dụng kí tự nào làm mốc phân tách mặc định?',
    questionEn: 'If split() is called with no arguments: s.split(), what delimiter is used by default in Python?',
    optionsVi: [
      'Dấu phẩy (",")',
      'Dấu chấm (".")',
      'Khoảng trắng (dấu cách, tab, xuống dòng)',
      'Dấu gạch ngang ("-")'
    ],
    optionsEn: [
      'Comma (",")',
      'Period (".")',
      'Whitespace (spaces, tabs, newlines)',
      'Hyphen ("-")'
    ],
    correctIndex: 2,
    explanationVi: 'Theo trang 124-125 SGK: Kí tự tách dùng để phân tách các từ mặc định là dấu cách (khoảng trắng).',
    explanationEn: 'According to pages 124-125: The default splitting delimiter is whitespace (space characters).'
  },
  {
    id: 6,
    questionVi: 'Cú pháp chuẩn xác của phương thức join() trong Python là cú pháp nào sau đây?',
    questionEn: 'What is the correct syntax for the join() method in Python?',
    optionsVi: [
      '<danh sách>.join(<kí tự nối>)',
      '"<kí tự nối>".join(<danh sách>)',
      'join(<kí tự nối>, <danh sách>)',
      '<danh sách>.concat(<kí tự nối>)'
    ],
    optionsEn: [
      '<list>.join(<connector>)',
      '"<connector>".join(<list>)',
      'join(<connector>, <list>)',
      '<list>.concat(<connector>)'
    ],
    correctIndex: 1,
    explanationVi: 'Theo hộp Ghi nhớ và quy tắc cú pháp trang 125 SGK: Cú pháp là "<kí tự nối>".join(<danh sách>). Phương thức join là của xâu nối, nhận danh sách làm đối số.',
    explanationEn: 'According to page 125: The syntax is "<connector>".join(<list>). join is a string method taking a list of strings as argument.'
  },
  {
    id: 7,
    questionVi: 'Cho xâu s = "gà,vịt,chó,lợn,ngựa,cá". Cách nào sau đây chuẩn xác nhất để xoá các dấu "," và thay bằng dấu cách " "? (Củng cố trang 125 SGK)',
    questionEn: 'Given string s = "gà,vịt,chó,lợn,ngựa,cá". Which approach correctly removes "," and replaces them with spaces " "? (Review, p. 125)',
    optionsVi: [
      '" ".join(s.split(","))',
      's.split(" ").join(",")',
      's.replace(" ", ",")',
      's.join(",")'
    ],
    optionsEn: [
      '" ".join(s.split(","))',
      's.split(" ").join(",")',
      's.replace(" ", ",")',
      's.join(",")'
    ],
    correctIndex: 0,
    explanationVi: 'Tách xâu bởi dấu phẩy qua s.split(",") thu được danh sách các con vật, sau đó dùng " ".join(...) để nối lại bằng dấu cách.',
    explanationEn: 'Splitting by comma s.split(",") yields the list of words, then " ".join(...) joins them with spaces.'
  },
  {
    id: 8,
    questionVi: 'Trong Nhiệm vụ 2 trang 126, để chuẩn hoá văn bản có nhiều dấu cách liên tiếp giữa các từ về đúng một dấu cách duy nhất, ta dùng lệnh gì?',
    questionEn: 'In Task 2 page 126, how do we normalize text with multiple irregular consecutive spaces down to a single space?',
    optionsVi: [
      'skq = " ".join(s.split(" "))',
      'skq = " ".join(s.split())',
      'skq = s.delete("  ")',
      'skq = s.trim()'
    ],
    optionsEn: [
      'skq = " ".join(s.split(" "))',
      'skq = " ".join(s.split())',
      'skq = s.delete("  ")',
      'skq = s.trim()'
    ],
    correctIndex: 1,
    explanationVi: 's.split() khi không truyền tham số sẽ tự động gộp và loại bỏ mọi khoảng trắng thừa (nhiều dấu cách liền nhau). Sau đó " ".join(sline) nối các từ lại với đúng một dấu cách.',
    explanationEn: 's.split() with no argument automatically collapses arbitrary consecutive whitespaces. " ".join(sline) then reconnects words with single spaces.'
  },
  {
    id: 9,
    questionVi: 'Trong Nhiệm vụ 3 trang 126, sau lệnh sline = s.split(), phần tử tên của học sinh luôn nằm ở vị trí chỉ số nào trong danh sách sline?',
    questionEn: 'In Task 3 page 126, after sline = s.split(), at which index is the student\'s first name always located?',
    optionsVi: [
      'Chỉ số 0',
      'Chỉ số 1',
      'Chỉ số len(sline) - 1',
      'Chỉ số len(sline)'
    ],
    optionsEn: [
      'Index 0',
      'Index 1',
      'Index len(sline) - 1',
      'Index len(sline)'
    ],
    correctIndex: 2,
    explanationVi: 'Trong họ tên tiếng Việt, tên luôn là từ cuối cùng của chuỗi họ tên, do đó tương ứng với phần tử cuối cùng của danh sách tại chỉ số len(sline) - 1.',
    explanationEn: 'In Vietnamese naming order, the given name is always the last word, corresponding to the last element at index len(sline) - 1.'
  },
  {
    id: 10,
    questionVi: 'Quan sát đoạn mã sau:\ns = "Hà Nội - Đà Nẵng - Hồ Chí Minh"\nprint(s.find("Đà Nẵng", 10))\nKết quả in ra màn hình là gì? (Ví dụ 3 trang 124 SGK)',
    questionEn: 'Given code snippet:\ns = "Hà Nội - Đà Nẵng - Hồ Chí Minh"\nprint(s.find("Đà Nẵng", 10))\nWhat will be printed? (Example 3, p. 124)',
    optionsVi: [
      '9',
      '-1',
      '10',
      'Báo lỗi IndexError'
    ],
    optionsEn: [
      '9',
      '-1',
      '10',
      'Raises IndexError'
    ],
    correctIndex: 1,
    explanationVi: 'Từ "Đà Nẵng" xuất hiện tại vị trí chỉ số 9. Khi chỉ định tìm bắt đầu từ chỉ số 10 (start = 10), trong phần xâu còn lại không còn xâu "Đà Nẵng" nào nữa, do đó lệnh trả về -1.',
    explanationEn: 'The substring "Đà Nẵng" first appears at index 9. By specifying search start at index 10 (start = 10), no further occurrence of "Đà Nẵng" exists in the remainder of the string, so find() returns -1.'
  }
];
