import { TermDefinition } from './lessonData';
import { QuizQuestion } from './lesson2Data';

export const LESSON_16_GLOSSARY: TermDefinition[] = [
  {
    id: 't16-1',
    termVi: 'Ngôn ngữ lập trình bậc cao',
    termEn: 'High-Level Programming Language',
    ipa: '/haɪ ˈlɛvəl ˈproʊɡræmɪŋ ˈlæŋɡwɪdʒ/',
    definitionVi: 'Ngôn ngữ lập trình có các câu lệnh được viết gần với ngôn ngữ tự nhiên (tiếng Anh) và ký hiệu toán học, độc lập với phần cứng máy tính, giúp việc đọc, viết và bảo trì chương trình dễ dàng.',
    definitionEn: 'A programming language with syntax close to natural human language (English) and mathematics, abstracting away machine architecture for easier readability and development.',
    exampleVi: 'Python, C++, Java là các ngôn ngữ lập trình bậc cao phổ biến nhất hiện nay.',
    exampleEn: 'Python, C++, and Java are the most popular high-level programming languages today.',
    sgkContext: 'SGK Tin học 10, Trang 86 – Hộp Ghi nhớ Mục 1.'
  },
  {
    id: 't16-2',
    termVi: 'Ngôn ngữ máy',
    termEn: 'Machine Language',
    ipa: '/məˈʃiːn ˈlæŋɡwɪdʒ/',
    definitionVi: 'Ngôn ngữ duy nhất mà phần cứng máy tính (CPU) có thể trực tiếp hiểu và thực thi, bao gồm các chuỗi số nhị phân 0 và 1.',
    definitionEn: 'The lowest-level programming language directly understood and executed by the CPU, consisting exclusively of binary 0s and 1s.',
    exampleVi: 'Chỉ thị nhị phân 01101101 01101001 điều khiển trực tiếp các cổng logic trong vi xử lý.',
    exampleEn: 'Binary instruction 01101101 01101001 directly controls logic gates inside the processor.',
    sgkContext: 'SGK Tin học 10, Trang 86 – Hình 16.1 so sánh 3 cấp độ ngôn ngữ.'
  },
  {
    id: 't16-3',
    termVi: 'Hợp ngữ',
    termEn: 'Assembly Language',
    ipa: '/əˈsɛmbli ˈlæŋɡwɪdʒ/',
    definitionVi: 'Ngôn ngữ lập trình bậc thấp sử dụng các từ viết tắt tiếng Anh (mã gợi nhớ mnemonic như LDA, STA, ADD, JMP) thay thế cho các chuỗi nhị phân máy tính.',
    definitionEn: 'A low-level programming language using English mnemonic abbreviations (such as LDA, STA, ADD, JMP) instead of raw binary strings.',
    exampleVi: 'Lệnh STA ACIA lưu trữ thanh ghi A vào địa chỉ cổng vào/ra.',
    exampleEn: 'Command STA ACIA stores register A into the I/O port address.',
    sgkContext: 'SGK Tin học 10, Trang 86 – Hình 16.1.'
  },
  {
    id: 't16-4',
    termVi: 'Chương trình dịch',
    termEn: 'Compiler / Interpreter',
    ipa: '/kəmˈpaɪlər / ɪnˈtɜːrprɪtər/',
    definitionVi: 'Chương trình chuyên dụng thực hiện nhiệm vụ chuyển đổi toàn bộ hoặc từng câu lệnh từ ngôn ngữ lập trình bậc cao sang ngôn ngữ máy để máy tính hiểu và thực hiện được.',
    definitionEn: 'A translator program that converts high-level source code into machine language instructions that the computer hardware can execute.',
    exampleVi: 'Trình thông dịch Python đọc từng dòng mã nguồn và chuyển thành bytecode thực thi trên máy ảo Python (PVM).',
    exampleEn: 'The Python interpreter parses source code line by line and executes bytecode on the Python Virtual Machine (PVM).',
    sgkContext: 'SGK Tin học 10, Trang 86 – Khái niệm chương trình dịch.'
  },
  {
    id: 't16-5',
    termVi: 'Dấu nhắc lệnh Python',
    termEn: 'Python Prompt (>>>)',
    ipa: '/ˈpaɪθɑːn prɑːmpt/',
    definitionVi: 'Ký hiệu gồm ba dấu lớn hơn (>>>) hiển thị trên màn hình IDLE Shell, báo hiệu môi trường Python đã sẵn sàng nhận và thực thi ngay câu lệnh người dùng nhập vào.',
    definitionEn: 'The three greater-than characters (>>>) in IDLE Shell indicating that Python is ready to accept and immediately evaluate user commands.',
    exampleVi: 'Sau dấu nhắc >>>, gõ 3 + 7 và nhấn Enter, màn hình hiển thị ngay kết quả 10.',
    exampleEn: 'At the >>> prompt, typing 3 + 7 and pressing Enter immediately outputs 10.',
    sgkContext: 'SGK Tin học 10, Trang 87 – Hình 16.2 Màn hình làm việc của Python.'
  },
  {
    id: 't16-6',
    termVi: 'Chế độ gõ lệnh trực tiếp',
    termEn: 'Interactive Mode',
    ipa: '/ˌɪntərˈæktɪv moʊd/',
    definitionVi: 'Chế độ làm việc tương tác trực tiếp trong IDLE Shell, nơi người dùng gõ từng câu lệnh sau dấu nhắc >>> và nhận kết quả tức thì sau khi bấm Enter, dùng để tính toán và kiểm tra nhanh.',
    definitionEn: 'The interactive execution mode in IDLE Shell where each line entered after >>> is evaluated immediately upon pressing Enter, ideal for quick math and testing.',
    exampleVi: 'Dùng chế độ tương tác để thử nghiệm nhanh phép tính chia số thực: >>> 12/5 cho kết quả 2.4.',
    exampleEn: 'Using interactive mode to quickly evaluate float division: >>> 12/5 produces 2.4.',
    sgkContext: 'SGK Tin học 10, Trang 87 – Mục 2a Chế độ gõ lệnh trực tiếp.'
  },
  {
    id: 't16-7',
    termVi: 'Chế độ soạn thảo',
    termEn: 'Script Mode',
    ipa: '/skrɪpt moʊd/',
    definitionVi: 'Chế độ cho phép viết một tệp chương trình gồm nhiều dòng lệnh (mở qua File / New File), lưu lại thành tệp đuôi .py và thực thi toàn bộ bằng phím F5 (Run Module).',
    definitionEn: 'The development mode where multi-line code is composed in an editor window, saved as a .py file, and executed sequentially via F5 (Run Module).',
    exampleVi: 'Soạn thảo tệp Bai1.py gồm nhiều câu lệnh in ấn và xử lý dữ liệu rồi nhấn F5 để chạy.',
    exampleEn: 'Composing the multi-line file Bai1.py and pressing F5 to run all statements sequentially.',
    sgkContext: 'SGK Tin học 10, Trang 88 – Mục 2b Chế độ soạn thảo.'
  },
  {
    id: 't16-8',
    termVi: 'Lệnh print()',
    termEn: 'print() Function',
    ipa: '/prɪnt ˈfʌŋkʃən/',
    definitionVi: 'Hàm tiêu chuẩn trong Python có chức năng xuất dữ liệu (số, xâu ký tự, kết quả biểu thức) ra màn hình; có thể in nhiều giá trị cùng lúc cách nhau bằng dấu cách.',
    definitionEn: 'A built-in Python function used to output data (numbers, strings, expression results) to standard output, separating multiple arguments by spaces.',
    exampleVi: 'print("3 + 7 =", 3 + 7) xuất ra màn hình dòng chữ "3 + 7 = 10".',
    exampleEn: 'print("3 + 7 =", 3 + 7) outputs the string "3 + 7 = 10".',
    sgkContext: 'SGK Tin học 10, Trang 89 – Ví dụ 3 và cú pháp lệnh print().'
  },
  {
    id: 't16-9',
    termVi: 'Xâu kí tự',
    termEn: 'String (str)',
    ipa: '/strɪŋ/',
    definitionVi: 'Kiểu dữ liệu biểu diễn dãy các ký tự được đặt bên trong cặp dấu nháy đơn (\'\') hoặc nháy kép (""), hoặc ba cặp dấu nháy kép ("""...""") cho xâu nhiều dòng.',
    definitionEn: 'A data type representing a sequence of characters enclosed within single (\'\'), double (""), or triple-double quotes ("""...""") for multiline strings.',
    exampleVi: '"học sinh lớp 10" và \'Xin chào!\' là hai xâu ký tự hợp lệ trong Python.',
    exampleEn: '"học sinh lớp 10" and \'Xin chào!\' are two valid string literals in Python.',
    sgkContext: 'SGK Tin học 10, Trang 88 & 90 – Ví dụ 1 và Vận dụng 1.'
  },
  {
    id: 't16-10',
    termVi: 'Dòng chú thích',
    termEn: 'Comment (#)',
    ipa: '/ˈkɑːmɛnt/',
    definitionVi: 'Đoạn văn bản bắt đầu bằng ký tự dấu thăng (#) dùng để giải thích ý nghĩa mã nguồn cho con người đọc, được trình biên dịch/thông dịch Python bỏ qua khi chạy chương trình.',
    definitionEn: 'Text beginning with the hash symbol (#) intended for human programmers, completely ignored by the Python interpreter during execution.',
    exampleVi: '# Đây là dòng chú thích giúp bạn bè hiểu mã nguồn dễ dàng hơn.',
    exampleEn: '# This is a comment helping collaborators understand the codebase effortlessly.',
    sgkContext: 'SGK Tin học 10, Trang 89 – Khung ghi nhớ Thực hành.'
  }
];

export const LESSON_16_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: 'Ngôn ngữ lập trình bậc cao là gì?',
    questionEn: 'What is a high-level programming language?',
    optionsVi: [
      'Ngôn ngữ chỉ gồm các chuỗi nhị phân 0 và 1 mà phần cứng máy tính hiểu được trực tiếp',
      'Ngôn ngữ có các câu lệnh được viết gần với ngôn ngữ tự nhiên, giúp con người dễ đọc hiểu và không phụ thuộc phần cứng',
      'Ngôn ngữ chỉ dùng các từ viết tắt tiếng Anh như LDA, STA, ADD dành riêng cho vi xử lý',
      'Ngôn ngữ chỉ chạy được trên một dòng máy tính duy nhất mà không cần chương trình dịch'
    ],
    optionsEn: [
      'A language consisting only of binary 0s and 1s directly understood by computer chips',
      'A language whose statements resemble natural human language, making it easy to read, write, and hardware-independent',
      'A language using mnemonic abbreviations like LDA and STA exclusively for one microprocessor',
      'A language that runs on only one specific machine without requiring any translator program'
    ],
    correctIndex: 1,
    explanationVi: 'Theo SGK trang 86–87, ngôn ngữ lập trình bậc cao có các câu lệnh được viết gần với ngôn ngữ tự nhiên (tiếng Anh) giúp cho việc đọc, hiểu chương trình dễ dàng hơn.',
    explanationEn: 'According to textbook page 86–87, high-level languages have syntax close to natural language, greatly enhancing readability and accessibility.'
  },
  {
    id: 2,
    questionVi: 'Ngôn ngữ lập trình Python do ai phát minh và ra mắt lần đầu tiên vào năm nào?',
    questionEn: 'Who invented the Python programming language and in which year was it first released?',
    optionsVi: [
      'Do James Gosling (người Canada) tạo ra và ra mắt năm 1995',
      'Do Bjarne Stroustrup (người Đan Mạch) tạo ra và ra mắt năm 1985',
      'Do Guido van Rossum (người Hà Lan) tạo ra và ra mắt năm 1991',
      'Do Dennis Ritchie (người Mỹ) tạo ra và ra mắt năm 1972'
    ],
    optionsEn: [
      'Created by James Gosling in 1995',
      'Created by Bjarne Stroustrup in 1985',
      'Created by Guido van Rossum (Netherlands) and released in 1991',
      'Created by Dennis Ritchie in 1972'
    ],
    correctIndex: 2,
    explanationVi: 'SGK trang 87 nêu rõ: Python là ngôn ngữ lập trình bậc cao do Guido van Rossum, người Hà Lan tạo ra và ra mắt lần đầu năm 1991.',
    explanationEn: 'Textbook page 87 states: Python was created by Dutch programmer Guido van Rossum and first released in 1991.'
  },
  {
    id: 3,
    questionVi: 'Tại sao cần phải có "chương trình dịch" (compiler/interpreter) khi lập trình bằng ngôn ngữ bậc cao?',
    questionEn: 'Why is a "translator program" (compiler/interpreter) necessary when programming in a high-level language?',
    optionsVi: [
      'Để dịch chương trình sang ngôn ngữ tiếng Việt cho học sinh dễ hiểu',
      'Vì máy tính chỉ hiểu và thực thi được trực tiếp ngôn ngữ máy (mã nhị phân 0 và 1), nên cần chuyển đổi các câu lệnh bậc cao sang ngôn ngữ máy',
      'Để kiểm tra tốc độ đường truyền mạng Internet',
      'Để chuyển đổi giao diện từ màu trắng sang màu đen'
    ],
    optionsEn: [
      'To translate source code into Vietnamese for students',
      'Because computers only understand machine language (binary 0s and 1s), so high-level code must be translated into machine instructions',
      'To measure Internet broadband connection latency',
      'To toggle the application UI between light and dark themes'
    ],
    correctIndex: 1,
    explanationVi: 'Máy tính chỉ hiểu ngôn ngữ máy (chuỗi nhị phân). Để máy tính hiểu và thực hiện được các câu lệnh viết bằng ngôn ngữ bậc cao, chương trình dịch đóng vai trò chuyển mã nguồn thành ngôn ngữ máy (SGK trang 86).',
    explanationEn: 'Hardware CPUs only execute binary machine code. Translators convert human-readable source into binary instructions executable by the hardware.'
  },
  {
    id: 4,
    questionVi: 'Môi trường lập trình Python chuẩn (IDLE) có hai chế độ làm việc cơ bản nào?',
    questionEn: 'Which two fundamental working modes does the standard Python IDLE environment provide?',
    optionsVi: [
      'Chế độ xem trước (Preview) và chế độ xuất bản (Publish)',
      'Chế độ đơn luồng và chế độ đa luồng',
      'Chế độ gõ lệnh trực tiếp (Interactive Mode) và chế độ soạn thảo (Script Mode)',
      'Chế độ đồ họa véc tơ và chế độ đồ họa điểm ảnh'
    ],
    optionsEn: [
      'Preview mode and Publish mode',
      'Single-threaded mode and Multi-threaded mode',
      'Interactive Mode (direct execution) and Script Mode (file editing)',
      'Vector graphics mode and Bitmap raster mode'
    ],
    correctIndex: 2,
    explanationVi: 'SGK trang 87–88 nêu: Môi trường lập trình của Python có hai chế độ: chế độ gõ lệnh trực tiếp (sau dấu nhắc >>>) và chế độ soạn thảo (mở tệp .py).',
    explanationEn: 'Textbook page 87–88 highlights the two modes: Interactive Mode (typing commands after >>> prompt) and Script Mode (writing multi-line code in .py files).'
  },
  {
    id: 5,
    questionVi: 'Ký hiệu dấu nhắc `>>>` trong cửa sổ IDLE Shell của Python có ý nghĩa gì?',
    questionEn: 'What does the prompt symbol `>>>` in Python\'s IDLE Shell signify?',
    optionsVi: [
      'Là con trỏ chuột cho biết chương trình đang gặp lỗi cú pháp',
      'Báo hiệu môi trường Python đã sẵn sàng nhận câu lệnh trực tiếp từ người dùng',
      'Là dấu kết thúc một tệp chương trình Python',
      'Là ký hiệu bắt đầu một khối lệnh lặp for'
    ],
    optionsEn: [
      'A cursor indicating that the current program encountered a fatal syntax error',
      'A signal that Python is ready to receive and execute direct commands from the user',
      'An end-of-file token marking completion of a script',
      'A syntax token initiating a for-loop statement'
    ],
    correctIndex: 1,
    explanationVi: 'Dấu nhắc `>>>` là dấu hiệu báo cho người lập trình biết Python đang ở chế độ gõ lệnh trực tiếp và sẵn sàng tiếp nhận lệnh mới (SGK trang 87).',
    explanationEn: 'The `>>>` prompt indicates Python interactive REPL is listening for incoming user statements.'
  },
  {
    id: 6,
    questionVi: 'Trong chế độ gõ lệnh trực tiếp, kết quả của phép toán `>>> 5/2` và kiểu dữ liệu của nó là gì?',
    questionEn: 'In interactive mode, what is the result and data type of `>>> 5/2`?',
    optionsVi: [
      'Kết quả là 2, kiểu số nguyên (int)',
      'Kết quả là 2.5, kiểu số thực (float)',
      'Kết quả là 2 dư 1, kiểu xâu kí tự',
      'Bị lỗi vì phép chia chỉ nhận số thực'
    ],
    optionsEn: [
      'Result is 2, integer type (int)',
      'Result is 2.5, floating-point type (float)',
      'Result is 2 remainder 1, string type',
      'Throws an error because division only accepts floats'
    ],
    correctIndex: 1,
    explanationVi: 'Trong Python, phép chia thông thường bằng toán tử `/` luôn trả về số thực (float). Do đó `5/2` bằng `2.5` (SGK trang 89 - Câu hỏi củng cố 1).',
    explanationEn: 'In Python, the true division operator `/` always evaluates to a float. Hence, `5/2` produces `2.5`.'
  },
  {
    id: 7,
    questionVi: 'Trong Python, lệnh `print("13 + 10*3/2 - 3*2 = ", 13 + 10*3/2 - 3*2)` sẽ in ra kết quả nào trên màn hình?',
    questionEn: 'In Python, what will the statement `print("13 + 10*3/2 - 3*2 = ", 13 + 10*3/2 - 3*2)` print to the console?',
    optionsVi: [
      '13 + 10*3/2 - 3*2 = 22',
      '13 + 10*3/2 - 3*2 = 22.0',
      '13 + 10*3/2 - 3*2 = 13 + 10*3/2 - 3*2',
      'Báo lỗi cú pháp SyntaxError'
    ],
    optionsEn: [
      '13 + 10*3/2 - 3*2 = 22',
      '13 + 10*3/2 - 3*2 = 22.0',
      '13 + 10*3/2 - 3*2 = 13 + 10*3/2 - 3*2',
      'SyntaxError exception'
    ],
    correctIndex: 1,
    explanationVi: '10*3/2 = 15.0; 3*2 = 6; 13 + 15.0 - 6 = 22.0. Vì phép chia `/` sinh ra số thực nên kết quả là 22.0 và được in kèm xâu văn bản (SGK trang 89 - Câu hỏi 2).',
    explanationEn: '10*3/2 = 15.0; 3*2 = 6; 13 + 15.0 - 6 = 22.0. Float division yields 22.0 appended after the label string.'
  },
  {
    id: 8,
    questionVi: 'Để thực hiện (chạy) một chương trình Python đang mở trong cửa sổ soạn thảo (Script Mode), ta nhấn phím tắt nào?',
    questionEn: 'Which hotkey is used to execute (run) an open Python program in the script editor window?',
    optionsVi: [
      'Phím F1',
      'Phím F3',
      'Phím F5 (hoặc chọn menu Run / Run Module)',
      'Phím F12'
    ],
    optionsEn: [
      'F1 key',
      'F3 key',
      'F5 key (or menu Run / Run Module)',
      'F12 key'
    ],
    correctIndex: 2,
    explanationVi: 'Theo hướng dẫn Bước 5 trong phần Thực hành (SGK trang 90): Chọn Run / Run module hoặc nhấn phím F5 để thực hiện chương trình.',
    explanationEn: 'Per Step 5 on textbook page 90: Select Run / Run Module or press the F5 key to execute the program.'
  },
  {
    id: 9,
    questionVi: 'Dòng nào sau đây chứa lỗi cú pháp (SyntaxError) trong Python?',
    questionEn: 'Which of the following statements contains a syntax error in Python?',
    optionsVi: [
      'print("Xin chao cac ban")',
      '3 + * 5',
      'print(10, 20, 30)',
      '12/5 + 13/6'
    ],
    optionsEn: [
      'print("Xin chao cac ban")',
      '3 + * 5',
      'print(10, 20, 30)',
      '12/5 + 13/6'
    ],
    correctIndex: 1,
    explanationVi: 'Trong biểu thức `3 + * 5`, hai toán tử nhị phân `+` và `*` đặt liền kề nhau mà không có toán hạng ở giữa là vi phạm ngữ pháp của Python, dẫn đến lỗi SyntaxError (SGK trang 90 - Luyện tập 2).',
    explanationEn: 'In `3 + * 5`, placing two binary operators `+` and `*` consecutively without an operand violates Python syntax, raising a SyntaxError.'
  },
  {
    id: 10,
    questionVi: 'Ký tự nào được dùng để bắt đầu một dòng chú thích (comment) trong mã nguồn Python?',
    questionEn: 'Which symbol is used to initiate a single-line comment in Python source code?',
    optionsVi: [
      'Ký tự hai dấu gạch chéo //',
      'Ký tự dấu chấm than !',
      'Ký tự dấu thăng #',
      'Ký tự dấu phần trăm %'
    ],
    optionsEn: [
      'Double slash //',
      'Exclamation mark !',
      'Hash symbol #',
      'Percent symbol %'
    ],
    correctIndex: 2,
    explanationVi: 'SGK trang 89 chỉ rõ: Kí hiệu # là vị trí bắt đầu dòng chú thích lệnh của Python (ví dụ: # Chương trình đầu tiên).',
    explanationEn: 'Textbook page 89 highlights: The hash symbol (#) marks the start of a comment in Python.'
  }
];
