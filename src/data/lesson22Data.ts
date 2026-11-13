import { QuizQuestion } from './lesson2Data';
import { TermDefinition } from './lessonData';

export const LESSON_22_GLOSSARY: TermDefinition[] = [
  {
    id: 't22-1',
    termVi: 'Kiểu dữ liệu danh sách (List)',
    termEn: 'List Data Type',
    ipa: '/lɪst ˈdeɪtə taɪp/',
    definitionVi: 'Kiểu dữ liệu tập hợp các phần tử theo thứ tự trong Python, được bao bọc trong cặp ngoặc vuông []. Các phần tử có thể thuộc các kiểu dữ liệu khác nhau.',
    definitionEn: 'An ordered, mutable collection of items in Python enclosed in square brackets []. Elements can have different data types.',
    exampleVi: 'A = [1, 2, "Python", True, 3.14]',
    exampleEn: 'scores = [8.5, 9.0, 7.5, 10.0]',
    sgkContext: 'SGK Tin học 10 Kết nối tri thức - Trang 111: "Kiểu dữ liệu danh sách được dùng nhiều nhất trong Python là kiểu list."'
  },
  {
    id: 't22-2',
    termVi: 'Chỉ số phần tử (Index)',
    termEn: 'Element Index',
    ipa: '/ˈɛlɪmənt ˈɪndɛks/',
    definitionVi: 'Vị trí thứ tự của phần tử trong danh sách, bắt đầu đánh số từ 0 đến len() - 1.',
    definitionEn: 'The numerical position of an item in a list, zero-indexed from 0 up to len() - 1.',
    exampleVi: 'A = [10, 20, 30] -> A[0] là 10, A[1] là 20, A[2] là 30',
    exampleEn: 'fruits = ["apple", "banana"] -> fruits[0] == "apple"',
    sgkContext: 'SGK Trang 111 & 112: "Có thể truy cập từng phần tử của danh sách thông qua chỉ số. Chỉ số của list đánh số từ 0."'
  },
  {
    id: 't22-3',
    termVi: 'Hàm len()',
    termEn: 'len() Function (Length)',
    ipa: '/lɛn ˈfʌŋkʃən/',
    definitionVi: 'Hàm dựng sẵn trong Python trả về số lượng phần tử (độ dài) của một danh sách hoặc xâu kí tự.',
    definitionEn: 'Built-in Python function that returns the total count of elements (length) of a sequence.',
    exampleVi: 'A = [1, 2, 3, 4, 5] -> len(A) = 5',
    exampleEn: 'items = [] -> len(items) == 0',
    sgkContext: 'SGK Trang 111 & 112: "Lệnh len() tính độ dài của danh sách. Chỉ số của danh sách bắt đầu từ 0 đến len() - 1."'
  },
  {
    id: 't22-4',
    termVi: 'Lệnh xoá del',
    termEn: 'del Statement (Delete)',
    ipa: '/dɪˈliːt ˈsteɪtmənt/',
    definitionVi: 'Câu lệnh dùng để xoá một phần tử tại vị trí chỉ số xác định trong danh sách, các phần tử phía sau sẽ dịch chuyển sang trái.',
    definitionEn: 'Statement used to remove an item at a specific index in a list; subsequent elements shift left.',
    exampleVi: 'A = [1, "One", 3, 4, 5]; del A[4] -> [1, "One", 3, 4]',
    exampleEn: 'colors = ["red", "green", "blue"]; del colors[0]',
    sgkContext: 'SGK Trang 112: "Lệnh del để xoá một phần tử của danh sách."'
  },
  {
    id: 't22-5',
    termVi: 'Danh sách rỗng (Empty List)',
    termEn: 'Empty List',
    ipa: '/ˈɛmpti lɪst/',
    definitionVi: 'Danh sách không chứa bất kỳ phần tử nào, ký hiệu là [], có độ dài bằng 0.',
    definitionEn: 'A list containing zero elements, represented by [], having len() equal to 0.',
    exampleVi: 'a = []; len(a) = 0',
    exampleEn: 'queue = []',
    sgkContext: 'SGK Trang 112: "Lệnh tạo một danh sách rỗng có độ dài bằng 0: a = []"'
  },
  {
    id: 't22-6',
    termVi: 'Phép ghép danh sách (+)',
    termEn: 'List Concatenation',
    ipa: '/lɪst kənˌkætəˈneɪʃən/',
    definitionVi: 'Phép toán dấu cộng (+) dùng để nối hai hay nhiều danh sách lại với nhau tạo thành một danh sách mới dài hơn.',
    definitionEn: 'The addition operator (+) that joins two or more lists together into a newly combined list.',
    exampleVi: '[1, 2] + [3, 4, 5, 6] -> [1, 2, 3, 4, 5, 6]',
    exampleEn: 'listA + listB',
    sgkContext: 'SGK Trang 112: "Phép ghép danh sách (phép +): [1, 2] + [3, 4, 5, 6]"'
  },
  {
    id: 't22-7',
    termVi: 'Duyệt danh sách (List Traversal)',
    termEn: 'List Traversal / Iteration',
    ipa: '/lɪst trəˈvɜːrsəl/',
    definitionVi: 'Hành động lần lượt đi qua từng phần tử của danh sách bằng vòng lặp for kết hợp với hàm range(len(A)).',
    definitionEn: 'The process of visiting each element in a list sequentially using a for loop with range(len(A)).',
    exampleVi: 'for i in range(len(A)): print(A[i])',
    exampleEn: 'for i in range(len(items)): process(items[i])',
    sgkContext: 'SGK Trang 112 & 113: "Có thể duyệt lần lượt các phần tử của danh sách bằng lệnh for kết hợp với vùng giá trị của lệnh range()."'
  },
  {
    id: 't22-8',
    termVi: 'Phương thức (Method)',
    termEn: 'Method',
    ipa: '/ˈmɛθəd/',
    definitionVi: 'Các hàm hoặc câu lệnh được thiết kế dành riêng cho một kiểu dữ liệu cụ thể (như list), được gọi thông qua dấu chấm: <đối tượng>.<phương thức>().',
    definitionEn: 'Special functions designed specifically for an object type, invoked via dot notation: <object>.<method>().',
    exampleVi: 'A.append(10)',
    exampleEn: 'list.append(value)',
    sgkContext: 'SGK Trang 113: "Python có những lệnh đặc biệt để thêm phần tử vào một danh sách... còn được gọi là phương thức (method) của danh sách."'
  },
  {
    id: 't22-9',
    termVi: 'Phương thức append()',
    termEn: 'append() Method',
    ipa: '/əˈpɛnd ˈmɛθəd/',
    definitionVi: 'Phương thức đặc trưng của danh sách dùng để thêm một phần tử mới vào vị trí cuối cùng của danh sách, làm tăng độ dài lên 1.',
    definitionEn: 'List method that appends an element to the very end of the list, increasing length by 1.',
    exampleVi: 'A = [1, 2]; A.append(10) -> A = [1, 2, 10]',
    exampleEn: 'students.append("Nguyen Van A")',
    sgkContext: 'SGK Trang 113: "Lệnh thêm phần tử vào cuối danh sách là <danh sách>.append()."'
  },
  {
    id: 't22-10',
    termVi: 'Lỗi vượt quá chỉ số (IndexError)',
    termEn: 'IndexError: list index out of range',
    ipa: '/ˈɪndɛks ˈɛrər/',
    definitionVi: 'Lỗi runtime xảy ra khi chương trình cố gắng truy cập vào một chỉ số không tồn tại trong danh sách (ví dụ A[len(A)]).',
    definitionEn: 'A runtime error raised when attempting to access an index that falls outside list bounds.',
    exampleVi: 'A = [10, 20]; print(A[2]) -> Báo lỗi IndexError',
    exampleEn: 'A[len(A)] raises IndexError',
    sgkContext: 'SGK Trang 112: Câu hỏi củng cố 1d kiểm tra A[len(A)] dẫn đến vượt quá chỉ số hợp lệ.'
  }
];

export const LESSON_22_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: 'Trong Python, kiểu dữ liệu danh sách (list) được khai báo bằng cặp dấu ngoặc nào?',
    questionEn: 'In Python, which bracket pair is used to declare a list data type?',
    optionsVi: [
      'Cặp ngoặc tròn ()',
      'Cặp ngoặc vuông []',
      'Cặp ngoặc nhọn {}',
      'Cặp dấu ngoặc kép ""'
    ],
    optionsEn: [
      'Parentheses ()',
      'Square brackets []',
      'Curly braces {}',
      'Double quotes ""'
    ],
    correctIndex: 1,
    explanationVi: 'Theo SGK Trang 111 & 112, tạo danh sách (list) bằng lệnh gán với các phần tử nằm trong cặp dấu ngoặc vuông [].',
    explanationEn: 'According to page 111 & 112, lists in Python are defined by enclosing comma-separated elements in square brackets [].'
  },
  {
    id: 2,
    questionVi: 'Chỉ số (index) của các phần tử trong danh sách Python được đánh số bắt đầu từ bao nhiêu?',
    questionEn: 'What number does the indexing of list elements in Python start from?',
    optionsVi: [
      'Bắt đầu từ số 1',
      'Bắt đầu từ số 0',
      'Bắt đầu từ số -1',
      'Bắt đầu từ độ dài len()'
    ],
    optionsEn: [
      'Starting from 1',
      'Starting from 0',
      'Starting from -1',
      'Starting from len()'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 111 & 112 nêu rõ: "Chỉ số của danh sách bắt đầu từ 0 đến len() - 1".',
    explanationEn: 'Python lists are zero-indexed: valid indices range from 0 to len() - 1.'
  },
  {
    id: 3,
    questionVi: 'Cho danh sách A = [1, 0, "One", 9, 15, "Two", True, False]. Giá trị của phần tử A[2] là gì?',
    questionEn: 'Given list A = [1, 0, "One", 9, 15, "Two", True, False]. What is the value of A[2]?',
    optionsVi: [
      '0',
      '"One"',
      '9',
      '1'
    ],
    optionsEn: [
      '0',
      '"One"',
      '9',
      '1'
    ],
    correctIndex: 1,
    explanationVi: 'Chỉ số 0 là 1, chỉ số 1 là 0, chỉ số 2 là xâu kí tự "One" (SGK Trang 112 Câu hỏi củng cố 1b).',
    explanationEn: 'A[0] is 1, A[1] is 0, and A[2] is string "One".'
  },
  {
    id: 4,
    questionVi: 'Nếu danh sách A có 5 phần tử, điều gì sẽ xảy ra khi thực hiện lệnh print(A[len(A)])?',
    questionEn: 'If list A has 5 elements, what happens when executing print(A[len(A)])?',
    optionsVi: [
      'In ra phần tử cuối cùng của danh sách',
      'In ra số 5',
      'Báo lỗi IndexError: list index out of range vì vượt quá chỉ số tối đa',
      'In ra giá trị None'
    ],
    optionsEn: [
      'Prints the last element',
      'Prints the number 5',
      'Raises an IndexError: list index out of range because it exceeds the maximum index',
      'Prints None'
    ],
    correctIndex: 2,
    explanationVi: 'Độ dài là 5 thì chỉ số hợp lệ chỉ từ 0 đến 4 (len(A)-1). Truy cập A[5] sẽ báo lỗi IndexError.',
    explanationEn: 'With 5 elements, valid indices are 0 to 4. Accessing A[len(A)] = A[5] triggers an IndexError.'
  },
  {
    id: 5,
    questionVi: 'Để xoá phần tử tại vị trí chỉ số 4 trong danh sách A, câu lệnh Python nào sau đây đúng?',
    questionEn: 'Which Python statement correctly removes the element at index 4 in list A?',
    optionsVi: [
      'remove A[4]',
      'del A[4]',
      'delete(A[4])',
      'A.clear(4)'
    ],
    optionsEn: [
      'remove A[4]',
      'del A[4]',
      'delete(A[4])',
      'A.clear(4)'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 112: "Lệnh del để xoá một phần tử của danh sách, cú pháp: del A[4]".',
    explanationEn: 'The built-in del statement in Python deletes an element by index: del A[4].'
  },
  {
    id: 6,
    questionVi: 'Kết quả của phép ghép hai danh sách [1, 2] + [3, 4, 5] trong Python là gì?',
    questionEn: 'What is the result of the list concatenation [1, 2] + [3, 4, 5] in Python?',
    optionsVi: [
      '[4, 6, 5]',
      '[[1, 2], [3, 4, 5]]',
      '[1, 2, 3, 4, 5]',
      'Báo lỗi cú pháp'
    ],
    optionsEn: [
      '[4, 6, 5]',
      '[[1, 2], [3, 4, 5]]',
      '[1, 2, 3, 4, 5]',
      'SyntaxError'
    ],
    correctIndex: 2,
    explanationVi: 'Toán tử + dùng để ghép nối các phần tử của hai danh sách thành một danh sách mới: [1, 2, 3, 4, 5] (SGK Trang 112).',
    explanationEn: 'List concatenation joins the items in sequential order, yielding [1, 2, 3, 4, 5].'
  },
  {
    id: 7,
    questionVi: 'Đoạn chương trình sau in ra những giá trị nào? A = [3, 2, 1, 5, 6, 10]; for i in range(2, 5): print(A[i], end=" ")',
    questionEn: 'What values are printed by: A = [3, 2, 1, 5, 6, 10]; for i in range(2, 5): print(A[i], end=" ")?',
    optionsVi: [
      '3 2 1',
      '1 5 6',
      '2 1 5',
      '1 5 6 10'
    ],
    optionsEn: [
      '3 2 1',
      '1 5 6',
      '2 1 5',
      '1 5 6 10'
    ],
    correctIndex: 1,
    explanationVi: 'range(2, 5) sinh ra các chỉ số 2, 3, 4. Các phần tử tương ứng là A[2]=1, A[3]=5, A[4]=6 (SGK Trang 113 Ví dụ 2).',
    explanationEn: 'range(2, 5) iterates over indices 2, 3, 4, yielding A[2]=1, A[3]=5, A[4]=6.'
  },
  {
    id: 8,
    questionVi: 'Phương thức nào dùng để bổ sung một phần tử vào vị trí cuối cùng của danh sách?',
    questionEn: 'Which method is used to add an element to the end of a list?',
    optionsVi: [
      'A.insert_last()',
      'A.push()',
      'A.append()',
      'A.add()'
    ],
    optionsEn: [
      'A.insert_last()',
      'A.push()',
      'A.append()',
      'A.add()'
    ],
    correctIndex: 2,
    explanationVi: 'SGK Trang 113: "Lệnh thêm phần tử vào cuối danh sách là <danh sách>.append()".',
    explanationEn: 'The append() method appends an item directly to the end of the list.'
  },
  {
    id: 9,
    questionVi: 'Cho A = [2, 4, 10, 1, 0]. Sau khi thực hiện lần lượt A.append(100) và del A[1], danh sách A trở thành gì?',
    questionEn: 'Given A = [2, 4, 10, 1, 0]. After executing A.append(100) then del A[1], what does A become?',
    optionsVi: [
      '[2, 10, 1, 0, 100]',
      '[4, 10, 1, 0, 100]',
      '[2, 4, 10, 1, 0]',
      '[2, 10, 1, 0]'
    ],
    optionsEn: [
      '[2, 10, 1, 0, 100]',
      '[4, 10, 1, 0, 100]',
      '[2, 4, 10, 1, 0]',
      '[2, 10, 1, 0]'
    ],
    correctIndex: 0,
    explanationVi: 'Sau A.append(100), A thành [2, 4, 10, 1, 0, 100]. Sau del A[1] (xoá số 4 tại chỉ số 1), A còn lại [2, 10, 1, 0, 100] (SGK Trang 113).',
    explanationEn: 'A.append(100) yields [2, 4, 10, 1, 0, 100]; del A[1] removes 4 at index 1, leaving [2, 10, 1, 0, 100].'
  },
  {
    id: 10,
    questionVi: 'Để thêm một phần tử x vào vị trí đầu tiên của danh sách A trong phạm vi bài học, ta có thể dùng cách nào?',
    questionEn: 'To prepend an element x to the front of list A within the scope of this lesson, which method is used?',
    optionsVi: [
      'A = A + [x]',
      'A = [x] + A',
      'A.append_front(x)',
      'A[0] = x'
    ],
    optionsEn: [
      'A = A + [x]',
      'A = [x] + A',
      'A.append_front(x)',
      'A[0] = x'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 114 Luyện tập 2: Có thể thêm một phần tử vào đầu danh sách bằng phép ghép danh sách: A = [x] + A.',
    explanationEn: 'List concatenation [x] + A prepends [x] before existing list A.'
  }
];
