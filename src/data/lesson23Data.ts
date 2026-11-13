import { QuizQuestion } from './lesson2Data';
import { TermDefinition } from './lessonData';

export const LESSON_23_GLOSSARY: TermDefinition[] = [
  {
    id: 't23-1',
    termVi: 'Toán tử in (in Operator)',
    termEn: 'in Membership Operator',
    ipa: '/ɪn ˈɒpəreɪtə/',
    definitionVi: 'Toán tử kiểm tra xem một giá trị có nằm trong danh sách hay tập hợp không, trả về True nếu có và False nếu không có.',
    definitionEn: 'A membership operator in Python that evaluates whether a value exists within a sequence, returning True or False.',
    exampleVi: 'A = [1, 2, 3]; 2 in A -> True; 10 in A -> False',
    exampleEn: 'item in list',
    sgkContext: 'SGK Tin học 10 Kết nối tri thức - Trang 115: "Toán tử in dùng để kiểm tra một phần tử có nằm trong danh sách đã cho không."'
  },
  {
    id: 't23-2',
    termVi: 'Duyệt trực tiếp bằng in (Direct Traversal)',
    termEn: 'Direct Element Traversal with in',
    ipa: '/dɪˈrɛkt trəˈvɜːrsəl/',
    definitionVi: 'Cách duyệt qua từng phần tử của danh sách bằng vòng lặp "for x in A:", biến lặp x nhận trực tiếp từng giá trị mà không cần thông qua chỉ số range().',
    definitionEn: 'Iterating directly through elements using "for x in A:" without generating integer indices via range().',
    exampleVi: 'for k in A: print(k, end=" ")',
    exampleEn: 'for item in items: print(item)',
    sgkContext: 'SGK Trang 115: "Có thể duyệt nhanh từng phần tử của danh sách bằng toán tử in và lệnh for mà không cần sử dụng lệnh range()."'
  },
  {
    id: 't23-3',
    termVi: 'Phương thức clear()',
    termEn: 'clear() Method',
    ipa: '/klɪər ˈmɛθəd/',
    definitionVi: 'Phương thức xoá sạch toàn bộ các phần tử trong danh sách, đưa danh sách về trạng thái rỗng [].',
    definitionEn: 'A list method that removes all elements from the list, making it an empty list [].',
    exampleVi: 'A = [1, 2, 3]; A.clear() -> A = []',
    exampleEn: 'my_list.clear()',
    sgkContext: 'SGK Trang 116: "Lệnh clear() xoá toàn bộ một danh sách... danh sách gốc trở thành rỗng."'
  },
  {
    id: 't23-4',
    termVi: 'Phương thức remove(value)',
    termEn: 'remove() Method',
    ipa: '/rɪˈmuːv ˈmɛθəd/',
    definitionVi: 'Phương thức tìm và xoá phần tử đầu tiên trong danh sách có giá trị bằng value; nếu không tìm thấy sẽ phát sinh lỗi ValueError.',
    definitionEn: 'Removes the first occurrence of the specified value from the list; raises a ValueError if value is not present.',
    exampleVi: 'A = [1, 2, 3, 2]; A.remove(2) -> [1, 3, 2]',
    exampleEn: 'items.remove("target")',
    sgkContext: 'SGK Trang 116: "Lệnh remove(value) sẽ xoá phần tử đầu tiên của danh sách có giá trị value. Nếu không có phần tử nào như vậy thì sẽ báo lỗi."'
  },
  {
    id: 't23-5',
    termVi: 'Lỗi ValueError',
    termEn: 'ValueError Exception',
    ipa: '/ˈvæljuː ˈɛrər/',
    definitionVi: 'Lỗi phát sinh khi thực hiện lệnh remove(x) mà giá trị x hoàn toàn không tồn tại trong danh sách.',
    definitionEn: 'An exception raised in Python when list.remove(x) cannot find element x in the sequence.',
    exampleVi: 'A = [1, 2, 3]; A.remove(10) -> ValueError: list.remove(x): x not in list',
    exampleEn: 'ValueError: list.remove(x): x not in list',
    sgkContext: 'SGK Trang 116: "Lệnh báo lỗi nếu giá trị không có trong danh sách: ValueError: list.remove(x): x not in list."'
  },
  {
    id: 't23-6',
    termVi: 'Phương thức insert(index, value)',
    termEn: 'insert() Method',
    ipa: '/ɪnˈsɜːrt ˈmɛθəd/',
    definitionVi: 'Phương thức chèn giá trị value vào vị trí chỉ số index chỉ định và tự động đẩy các phần tử từ vị trí đó sang bên phải.',
    definitionEn: 'Inserts an element at a given index, shifting all subsequent elements to the right.',
    exampleVi: 'A = [1, 2, 6]; A.insert(2, 5) -> [1, 2, 5, 6]',
    exampleEn: 'list.insert(0, first_item)',
    sgkContext: 'SGK Trang 116 & 117: "Lệnh insert(index, value) sẽ chèn giá trị value vào danh sách tại vị trí index và đẩy các phần tử từ vị trí này sang phải."'
  },
  {
    id: 't23-7',
    termVi: 'Chỉ số chèn ngoài biên',
    termEn: 'Out-of-Bounds Insert Index Handling',
    ipa: '/aʊt əv baʊndz ˈɪndɛks/',
    definitionVi: 'Quy tắc đặc biệt của insert trong Python: nếu k < 0 thì chèn vào đầu danh sách; nếu k > len() thì chèn vào cuối danh sách.',
    definitionEn: 'Python insert behavior where index < 0 prepends to head and index > len() appends to tail.',
    exampleVi: 'A = [1, 2]; A.insert(-10, 0) -> [0, 1, 2]; A.insert(100, 9) -> [0, 1, 2, 9]',
    exampleEn: 'items.insert(-99, x)',
    sgkContext: 'SGK Trang 116: "Nếu k < 0 thì chèn vào đầu danh sách, nếu k > len() thì chèn vào cuối danh sách."'
  },
  {
    id: 't23-8',
    termVi: 'Đảo ngược thứ tự nhập (Reverse Order Input)',
    termEn: 'Reverse Order Prepending',
    ipa: '/rɪˈvɜːrs ˈɔːrdər/',
    definitionVi: 'Kỹ thuật chèn liên tục các phần tử mới nhập vào vị trí đầu danh sách bằng lệnh insert(0, x), giúp danh sách thu được có thứ tự ngược hoàn toàn so với thứ tự nhập.',
    definitionEn: 'Technique of continuously inserting incoming items at index 0 via insert(0, x) to reverse sequence.',
    exampleVi: 'dsLop.insert(0, name)',
    exampleEn: 'stack.insert(0, val)',
    sgkContext: 'SGK Trang 117 - Thực hành Nhiệm vụ 1: Nhập danh sách học sinh theo thứ tự ngược.'
  },
  {
    id: 't23-9',
    termVi: 'Đối sánh mẫu con (Subsequence Pattern Matching)',
    termEn: 'Pattern Matching in List',
    ipa: '/ˈpætərn ˈmætʃɪŋ/',
    definitionVi: 'Thuật toán tìm kiếm vị trí xuất hiện đầu tiên của một mẫu gồm nhiều phần tử liên tiếp (như [1, 2, 3]) trong một danh sách lớn.',
    definitionEn: 'Algorithm finding the starting index of a consecutive sequence pattern (e.g., [1, 2, 3]) within an array.',
    exampleVi: 'A[i] == p[0] and A[i+1] == p[1] and A[i+2] == p[2]',
    exampleEn: 'matches pattern at index i',
    sgkContext: 'SGK Trang 118 - Thực hành Nhiệm vụ 3: Tìm và chỉ ra vị trí đầu tiên của mẫu ba số hạng liên tiếp 1, 2, 3.'
  },
  {
    id: 't23-10',
    termVi: 'Dãy số Fibonacci (Fibonacci Sequence)',
    termEn: 'Fibonacci Sequence',
    ipa: '/ˌfɪbəˈnɑːtʃi ˈsiːkwəns/',
    definitionVi: 'Dãy số kinh điển bắt đầu từ F0 = 0, F1 = 1, các số hạng tiếp theo bằng tổng hai số hạng liền trước: Fn = Fn-1 + Fn-2.',
    definitionEn: 'Famous sequence defined as F0 = 0, F1 = 1, and Fn = Fn-1 + Fn-2 for n >= 2.',
    exampleVi: '0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55...',
    exampleEn: 'F = [0, 1]; F.append(F[i-1] + F[i-2])',
    sgkContext: 'SGK Trang 118 - Vận dụng 2: Tạo và in ra n số hạng đầu tiên của dãy số Fibonacci.'
  }
];

export const LESSON_23_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: 'Toán tử in trong biểu thức "x in A" của Python có chức năng gì?',
    questionEn: 'What is the function of the in operator in Python expression "x in A"?',
    optionsVi: [
      'Gán giá trị của x vào trong danh sách A',
      'Kiểm tra xem x có nằm trong danh sách A hay không, trả về True hoặc False',
      'Xoá phần tử x ra khỏi danh sách A',
      'Đếm số lần xuất hiện của x trong danh sách A'
    ],
    optionsEn: [
      'Assigns x into list A',
      'Checks whether x is in list A, returning True or False',
      'Deletes element x from list A',
      'Counts the occurrences of x in list A'
    ],
    correctIndex: 1,
    explanationVi: 'Theo SGK Trang 115, toán tử in dùng để kiểm tra một phần tử có nằm trong danh sách không, trả về True nếu có và False nếu không.',
    explanationEn: 'According to page 115, the in operator checks membership and returns True or False.'
  },
  {
    id: 2,
    questionVi: 'Cho danh sách A = ["0", "1", "01", "10"]. Giá trị của biểu thức (1 in A) là gì?',
    questionEn: 'Given list A = ["0", "1", "01", "10"]. What is the value of expression (1 in A)?',
    optionsVi: [
      'True',
      'False',
      'Báo lỗi kiểu dữ liệu',
      'None'
    ],
    optionsEn: [
      'True',
      'False',
      'Type error',
      'None'
    ],
    correctIndex: 1,
    explanationVi: '1 là số nguyên (int), trong khi danh sách A chỉ chứa các xâu kí tự (str: "0", "1", "01", "10"). Trong Python, 1 != "1" nên kết quả là False (SGK Trang 116 Củng cố 1a).',
    explanationEn: 'Integer 1 does not match string "1". In Python, int and str are different types, so 1 in A evaluates to False.'
  },
  {
    id: 3,
    questionVi: 'Cách viết nào sau đây duyệt trực tiếp từng phần tử của danh sách A mà không cần dùng hàm range()?',
    questionEn: 'Which syntax iterates directly through list elements without using the range() function?',
    optionsVi: [
      'for i in range(len(A)):',
      'for k in A:',
      'while k in A:',
      'for A in k:'
    ],
    optionsEn: [
      'for i in range(len(A)):',
      'for k in A:',
      'while k in A:',
      'for A in k:'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 115: Có thể duyệt nhanh từng phần tử của danh sách bằng toán tử in và lệnh for: "for k in A: print(k)".',
    explanationEn: 'Page 115: "for k in A:" directly visits each element in list A.'
  },
  {
    id: 4,
    questionVi: 'Phương thức nào dùng để xoá toàn bộ dữ liệu, biến danh sách thành danh sách rỗng []?',
    questionEn: 'Which method removes all elements, turning the list into an empty list []?',
    optionsVi: [
      'A.delete_all()',
      'A.clear()',
      'A.remove()',
      'A.empty()'
    ],
    optionsEn: [
      'A.delete_all()',
      'A.clear()',
      'A.remove()',
      'A.empty()'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 116 & 117: Lệnh A.clear() xoá toàn bộ dữ liệu của danh sách A, danh sách gốc trở thành rỗng.',
    explanationEn: 'Page 116 & 117: A.clear() removes all elements from the list.'
  },
  {
    id: 5,
    questionVi: 'Nếu thực hiện lệnh A.remove(x) mà giá trị x không có trong danh sách A thì điều gì xảy ra?',
    questionEn: 'What happens if A.remove(x) is called but value x is not present in list A?',
    optionsVi: [
      'Chương trình không làm gì và bỏ qua',
      'Danh sách A bị xoá rỗng',
      'Phát sinh lỗi ValueError: list.remove(x): x not in list',
      'Thêm phần tử x vào danh sách'
    ],
    optionsEn: [
      'Does nothing and ignores',
      'The list is cleared',
      'Raises a ValueError: list.remove(x): x not in list',
      'Appends x to the list'
    ],
    correctIndex: 2,
    explanationVi: 'SGK Trang 116 Ví dụ 2: Lệnh remove(value) sẽ báo lỗi ValueError nếu giá trị không có trong danh sách.',
    explanationEn: 'Page 116: If x is not found in the list, Python raises a ValueError.'
  },
  {
    id: 6,
    questionVi: 'Cho A = [1, 2, 6, 10]. Sau khi thực hiện lệnh A.insert(2, 5), danh sách A trở thành gì?',
    questionEn: 'Given A = [1, 2, 6, 10]. After executing A.insert(2, 5), what does list A become?',
    optionsVi: [
      '[1, 2, 5, 6, 10]',
      '[1, 5, 2, 6, 10]',
      '[1, 2, 6, 10, 5]',
      '[5, 1, 2, 6, 10]'
    ],
    optionsEn: [
      '[1, 2, 5, 6, 10]',
      '[1, 5, 2, 6, 10]',
      '[1, 2, 6, 10, 5]',
      '[5, 1, 2, 6, 10]'
    ],
    correctIndex: 0,
    explanationVi: 'Lệnh A.insert(2, 5) chèn giá trị 5 vào vị trí chỉ số 2 và đẩy các phần tử 6, 10 sang phải, kết quả là [1, 2, 5, 6, 10] (SGK Trang 116).',
    explanationEn: 'A.insert(2, 5) inserts 5 at index 2, shifting remaining elements right, yielding [1, 2, 5, 6, 10].'
  },
  {
    id: 7,
    questionVi: 'Trong trường hợp nào thì hai lệnh A.append(1) và A.insert(0, 1) có kết quả hoàn toàn giống nhau?',
    questionEn: 'Under what condition do A.append(1) and A.insert(0, 1) produce the exact same result?',
    optionsVi: [
      'Khi danh sách A có 1 phần tử',
      'Khi danh sách A là danh sách rỗng (A == [])',
      'Khi danh sách A = [2, 3]',
      'Không bao giờ giống nhau'
    ],
    optionsEn: [
      'When list A has 1 element',
      'When list A is an empty list (A == [])',
      'When list A = [2, 3]',
      'They never produce the same result'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 117 Củng cố 1: Khi A là danh sách rỗng ([]), cả hai lệnh đều đưa số 1 vào làm phần tử duy nhất, kết quả là [1]. Với A = [2, 3], append(1) cho [2, 3, 1] còn insert(0, 1) cho [1, 2, 3].',
    explanationEn: 'Page 117: When A is empty, both adding to head and adding to tail produce [1]. For A = [2, 3], append(1) yields [2, 3, 1] while insert(0, 1) yields [1, 2, 3].'
  },
  {
    id: 8,
    questionVi: 'Danh sách A ban đầu là [1, 4, 10, 0]. Sau lệnh insert nào thì A trở thành [1, 4, 10, 5, 0]?',
    questionEn: 'Initial list A is [1, 4, 10, 0]. Which insert command transforms A into [1, 4, 10, 5, 0]?',
    optionsVi: [
      'A.insert(3, 5)',
      'A.insert(4, 5)',
      'A.insert(5, 3)',
      'A.insert(0, 5)'
    ],
    optionsEn: [
      'A.insert(3, 5)',
      'A.insert(4, 5)',
      'A.insert(5, 3)',
      'A.insert(0, 5)'
    ],
    correctIndex: 0,
    explanationVi: 'Trong dãy [1, 4, 10, 0], số 0 đang ở chỉ số 3. Để số 5 đứng trước số 0, ta chèn số 5 vào vị trí chỉ số 3: A.insert(3, 5) (SGK Trang 117 Củng cố 2).',
    explanationEn: 'In [1, 4, 10, 0], 0 is at index 3. To insert 5 before 0, call A.insert(3, 5).'
  },
  {
    id: 9,
    questionVi: 'Để nhập danh sách n tên học sinh và lưu trữ theo thứ tự ngược lại so với khi nhập, ta dùng lệnh nào trong vòng lặp?',
    questionEn: 'To store input student names in reverse order, which statement should be placed inside the loop?',
    optionsVi: [
      'dsLop.append(name)',
      'dsLop.insert(0, name)',
      'dsLop.insert(-1, name)',
      'dsLop.remove(name)'
    ],
    optionsEn: [
      'dsLop.append(name)',
      'dsLop.insert(0, name)',
      'dsLop.insert(-1, name)',
      'dsLop.remove(name)'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 117 Thực hành Nhiệm vụ 1: Lệnh dsLop.insert(0, name) luôn chèn tên mới vào đầu danh sách, tạo ra thứ tự ngược lại.',
    explanationEn: 'Page 117: dsLop.insert(0, name) continuously prepends incoming items to index 0, reversing the order.'
  },
  {
    id: 10,
    questionVi: 'Trong bài toán xoá các số âm (A[i] < 0) bằng while và A.remove(A[i]), vì sao khi xoá ta không tăng biến chỉ số i (không thực hiện i = i + 1)?',
    questionEn: 'When removing negative numbers using while and A.remove(A[i]), why must we NOT increment i upon deletion?',
    optionsVi: [
      'Vì biến i tự động tăng trong ngôn ngữ Python',
      'Vì khi xoá phần tử tại chỉ số i, các phần tử phía sau tự động dồn sang trái chiếm vị trí i',
      'Vì nếu tăng i thì vòng lặp while sẽ lặp vô hạn',
      'Vì lệnh remove làm tăng độ dài danh sách'
    ],
    optionsEn: [
      'Because Python automatically increments i',
      'Because deleting element at index i causes subsequent elements to shift left to position i',
      'Because incrementing i causes an infinite loop',
      'Because remove increases list length'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 117 & 118 Thực hành Nhiệm vụ 2: Khi xoá A[i], phần tử tiếp theo lập tức dịch sang vị trí chỉ số i hiện tại. Nếu tăng i sẽ bỏ sót kiểm tra phần tử vừa dồn tới!',
    explanationEn: 'When removing A[i], the next element shifts into index i. Incrementing i would skip evaluating that newly shifted item.'
  }
];
