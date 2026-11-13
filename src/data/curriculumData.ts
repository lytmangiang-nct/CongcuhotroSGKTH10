export interface SgkLesson {
  id: number;
  lessonNumber: number;
  titleVi: string;
  titleEn?: string;
  page: number;
  status: 'active' | 'ready_for_content';
  tag?: string;
  descriptionVi?: string;
  descriptionEn?: string;
}

export interface SgkTopic {
  id: number;
  topicNumber: number;
  titleVi: string;
  titleEn?: string;
  page: number;
  iconName: string;
  color: string;
  lessons: SgkLesson[];
}

export const SGK_TOPICS: SgkTopic[] = [
  {
    id: 1,
    topicNumber: 1,
    titleVi: 'MÁY TÍNH VÀ XÃ HỘI TRI THỨC',
    titleEn: 'COMPUTERS AND THE KNOWLEDGE SOCIETY',
    page: 6,
    iconName: 'Cpu',
    color: 'indigo',
    lessons: [
      {
        id: 1,
        lessonNumber: 1,
        titleVi: 'Thông tin và xử lí thông tin',
        titleEn: 'Information and Information Processing',
        page: 6,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Quá trình xử lí thông tin, phân biệt dữ liệu và thông tin, đơn vị lưu trữ, ưu điểm thiết bị số.',
        descriptionEn: 'Information processing model, distinction between data and information, digital storage units, digital advantages.'
      },
      {
        id: 2,
        lessonNumber: 2,
        titleVi: 'Vai trò của thiết bị thông minh và tin học đối với xã hội',
        titleEn: 'Role of Smart Devices and Informatics in Society',
        page: 11,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Thiết bị thông minh, CMCN 4.0, Internet vạn vật (IoT), đóng góp của tin học và các thành tựu lịch sử.',
        descriptionEn: 'Smart devices, Industry 4.0, Internet of Things (IoT), societal contributions of informatics and historical milestones.'
      },
      {
        id: 3,
        lessonNumber: 3,
        titleVi: 'Một số kiểu dữ liệu và dữ liệu văn bản',
        titleEn: 'Data Types and Text Data',
        page: 16,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Phân loại 4 kiểu dữ liệu (văn bản, số, lôgic, đa phương tiện), bảng mã ASCII, Unicode, UTF-8 và số hoá văn bản.',
        descriptionEn: 'Classification of 4 data types (text, numbers, logic, multimedia), ASCII, Unicode, UTF-8 character encodings, and text digitization.'
      },
      {
        id: 4,
        lessonNumber: 4,
        titleVi: 'Hệ nhị phân và dữ liệu số nguyên',
        titleEn: 'Binary System and Integer Data',
        page: 20,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Hệ đếm nhị phân (cơ số 2), chuyển đổi giữa hệ thập phân và nhị phân, biểu diễn số nguyên có dấu (mã thuận, bù 1, bù 2) và các phép tính số học.',
        descriptionEn: 'Binary base-2 numeral system, conversions with decimal, signed integer representations (signed magnitude, one\'s and two\'s complement), and ALU operations.'
      },
      {
        id: 5,
        lessonNumber: 5,
        titleVi: 'Dữ liệu lôgic',
        titleEn: 'Logic Data',
        page: 24,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Giá trị lôgic True/False, các phép toán lôgic cơ bản (AND, OR, XOR, NOT), bảng chân trị, biểu diễn trong máy tính và mạch điện lôgic.',
        descriptionEn: 'Boolean logic data, fundamental logic operations (AND, OR, XOR, NOT), truth tables, computer representations, and logic circuits.'
      },
      {
        id: 6,
        lessonNumber: 6,
        titleVi: 'Dữ liệu âm thanh và hình ảnh',
        titleEn: 'Audio and Image Data',
        page: 28,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Mã hóa hình ảnh (pixel, RGB), số hóa âm thanh (lấy mẫu PCM), tốc độ bit (bit-rate), các định dạng tệp đa phương tiện (WAV, MP3, BMP, JPEG, PNG).',
        descriptionEn: 'Image encoding (pixel, RGB), audio sampling and quantization (PCM), bit-rate, and multimedia formats (WAV, MP3, BMP, JPEG, PNG).'
      },
      {
        id: 7,
        lessonNumber: 7,
        titleVi: 'Thực hành sử dụng thiết bị số thông dụng',
        titleEn: 'Practice: Using Common Digital Devices',
        page: 33,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Trợ thủ số cá nhân PDA, phần cứng điện thoại thông minh, màn hình chính & điều hướng cảm ứng, quản lí tệp thư mục DCIM/Camera và lưu trữ đám mây.',
        descriptionEn: 'Personal Digital Assistant (PDA) evolution, smartphone hardware buttons, home screen & touch navigation, DCIM/Camera hierarchical file management, and cloud backup.'
      }
    ]
  },
  {
    id: 2,
    topicNumber: 2,
    titleVi: 'MẠNG MÁY TÍNH VÀ INTERNET',
    titleEn: 'COMPUTER NETWORKS AND THE INTERNET',
    page: 38,
    iconName: 'Globe',
    color: 'emerald',
    lessons: [
      {
        id: 8,
        lessonNumber: 8,
        titleVi: 'Mạng máy tính trong cuộc sống hiện đại',
        titleEn: 'Computer Networks in Modern Life',
        page: 38,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Phân biệt mạng LAN vs Internet, vai trò của Internet trong đời sống, điện toán đám mây (SaaS, PaaS, IaaS) và kết nối vạn vật (IoT).',
        descriptionEn: 'Differentiating LAN from the Internet, societal impact, Cloud Computing models (SaaS, PaaS, IaaS), and the Internet of Things (IoT).'
      },
      {
        id: 9,
        lessonNumber: 9,
        titleVi: 'An toàn trên không gian mạng',
        titleEn: 'Cybersecurity in Cyberspace',
        page: 44,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Nhận diện nguy cơ trên mạng, phòng vệ bắt nạt số, cơ chế virus, worm, trojan với mô hình 3D tương tác và thực hành Windows Defender.',
        descriptionEn: 'Recognizing cyber hazards, cyberbullying defense, 3D interactive malware anatomy (virus, worm, trojan), and Windows Defender practical lab.'
      },
      {
        id: 10,
        lessonNumber: 10,
        titleVi: 'Thực hành khai thác tài nguyên trên Internet',
        titleEn: 'Practice: Exploiting Internet Resources',
        page: 50,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Khai thác phần mềm dịch máy đa ngữ Google Translate (nhập liệu, micro, tệp Excel), truy cập kho học liệu mở igiaoduc.vn của Bộ GD&ĐT với mô hình 3D quả cầu tri thức.',
        descriptionEn: 'Harnessing Google Translate machine translation (text, voice, Excel), exploring MOET national OER portal igiaoduc.vn, and interactive 3D global knowledge sphere.'
      }
    ]
  },
  {
    id: 3,
    topicNumber: 3,
    titleVi: 'ĐẠO ĐỨC, PHÁP LUẬT VÀ VĂN HOÁ TRONG MÔI TRƯỜNG SỐ',
    titleEn: 'ETHICS, LAW, AND CULTURE IN THE DIGITAL ENVIRONMENT',
    page: 55,
    iconName: 'Scale',
    color: 'amber',
    lessons: [
      {
        id: 11,
        lessonNumber: 11,
        titleVi: 'Ứng xử trên môi trường số. Nghĩa vụ tôn trọng bản quyền',
        titleEn: 'Behavior in the Digital Environment and Copyright Compliance',
        page: 55,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: '7 hành vi xấu trên không gian mạng, các luật CNTT & An ninh mạng, Nghị định 15/2020 phạt tin giả, Luật SHTT 2019 quyền nhân thân vs quyền tài sản, bản quyền phần mềm và mô hình 3D Cán cân Pháp lý Three.js.',
        descriptionEn: '7 online misconducts, IT & Cybersecurity laws, Decree 15/2020 sanctions, 2019 IP Law moral vs economic rights, software copyright compliance, and interactive 3D WebGL Balance of Justice.'
      }
    ]
  },
  {
    id: 4,
    topicNumber: 4,
    titleVi: 'ỨNG DỤNG TIN HỌC',
    titleEn: 'APPLIED INFORMATICS',
    page: 63,
    iconName: 'Palette',
    color: 'sky',
    lessons: [
      {
        id: 12,
        lessonNumber: 12,
        titleVi: 'Phần mềm thiết kế đồ hoạ',
        titleEn: 'Graphic Design Software',
        page: 63,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Phân biệt đồ họa vector vs bitmap, 10 thành phần giao diện Inkscape 1.0.1, quy tắc màu Fill/Stroke, kỹ thuật nhân bản xoay và mô hình 3D Three.js mô phỏng voxel vs đường cong Bézier.',
        descriptionEn: 'Differentiating vector vs bitmap graphics, Inkscape 1.0.1 10-component GUI, Fill/Stroke color stacking rules, duplicate & rotate lab, and interactive Three.js 3D voxel vs Bézier model.'
      },
      {
        id: 13,
        lessonNumber: 13,
        titleVi: 'Bổ sung các đối tượng đồ hoạ',
        titleEn: 'Adding Graphic Objects',
        page: 69,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Vẽ và tuỳ biến hình khối cơ bản (W, H, Rx, Ry, Corners, Rounded, Spoke ratio), 3 tab Fill & Stroke, tô màu Gradient toả tròn khối cầu 3D, 6 phép ghép đối tượng trong menu Path và mô phỏng tương tác Three.js.',
        descriptionEn: 'Creating and styling geometric primitives (W, H, Rx, Ry, Corners, Rounded, Spoke ratio), Fill & Stroke 3 tabs, 3D radial sphere gradient, 6 Boolean path operations in Path menu, and interactive Three.js 3D simulation.'
      },
      {
        id: 14,
        lessonNumber: 14,
        titleVi: 'Làm việc với đối tượng đường và văn bản',
        titleEn: 'Working with Paths and Text Objects',
        page: 75,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Biến hình khối thành đường (Object to Path), giải phẫu đoạn cong Bézier, công cụ Pen & F2 chỉnh neo trơn/neo góc, định dạng chữ và uốn chữ theo đường dẫn (Put on Path) với mô phỏng 3D Three.js.',
        descriptionEn: 'Converting primitives to paths (Object to Path), cubic Bézier curve anatomy, Pen & F2 Node tools for smooth/corner nodes, typography controls and Put on Path kinetic text with Three.js 3D simulation.'
      },
      {
        id: 15,
        lessonNumber: 15,
        titleVi: 'Hoàn thiện hình ảnh đồ hoạ',
        titleEn: 'Finalizing Graphic Images',
        page: 82,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Thực hành thiết kế tờ rơi Hội sách Hà Nội (nền hai màu răng cưa, cờ tam giác, gáy sách cong 3D chuyển sắc, giá sách, bóng thoại Union, vách ngăn nét đứt), xuất tệp ảnh PNG chuẩn 200–300 dpi và mô phỏng 3D Three.js tách lớp.',
        descriptionEn: 'Practical design of Hanoi Book Fair flyer (sawtooth backdrop, bunting banner, 3D gradient book spine, bookshelf, Union speech bubbles, dashed divider), high-res PNG rasterization (200-300 dpi), and Three.js 3D exploded layer diorama.'
      }
    ]
  },
  {
    id: 5,
    topicNumber: 5,
    titleVi: 'GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH (LẬP TRÌNH PYTHON)',
    titleEn: 'PROBLEM SOLVING WITH COMPUTERS (PYTHON PROGRAMMING)',
    page: 86,
    iconName: 'Code',
    color: 'violet',
    lessons: [
      {
        id: 16,
        lessonNumber: 16,
        titleVi: 'Ngôn ngữ lập trình bậc cao và Python',
        titleEn: 'High-Level Programming Languages and Python',
        page: 86,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Khái niệm ngôn ngữ bậc cao, lịch sử Python (Guido van Rossum 1991), 2 chế độ IDLE (trực tiếp >>> và soạn thảo .py), tự nhận biết kiểu dữ liệu (int, float, str), hàm print(), tạo và chạy Bai1.py với mô phỏng 3D Three.js.',
        descriptionEn: 'High-level language concepts, Python history (Guido van Rossum 1991), IDLE dual modes (interactive >>> and script .py), dynamic data types (int, float, str), print() function, and authoring Bai1.py with Three.js 3D simulation.'
      },
      {
        id: 17,
        lessonNumber: 17,
        titleVi: 'Biến và lệnh gán',
        titleEn: 'Variables and Assignment Statements',
        page: 91,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Khái niệm biến là định danh vùng nhớ, cú pháp lệnh gán và gán đồng thời (x, y = y, x), quy tắc đặt tên hợp lệ, thứ tự ưu tiên toán tử (lũy thừa ** từ phải sang trái), các phép toán trên số và xâu, bảng 33 từ khoá và mô phỏng 3D Three.js.',
        descriptionEn: 'Variables as memory identifiers, assignment and simultaneous swap (x, y = y, x), naming rules, operator precedence (right-to-left exponentiation **), number and string operations, 33 reserved keywords, and Three.js 3D simulation.'
      },
      {
        id: 18,
        lessonNumber: 18,
        titleVi: 'Các lệnh vào ra đơn giản',
        titleEn: 'Simple Input/Output Statements',
        page: 97,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Lệnh input() và print(), 4 kiểu dữ liệu cơ bản (int, float, str, bool), hàm type(), các phép chuyển đổi kiểu int(), float(), str(), xử lý lỗi ValueError và mô phỏng đường ống 3D Three.js.',
        descriptionEn: 'input() and print() statements, 4 basic data types (int, float, str, bool), type() inspection, type conversions (int, float, str), ValueError diagnosis, and Three.js 3D data pipeline simulation.'
      },
      {
        id: 19,
        lessonNumber: 19,
        titleVi: 'Câu lệnh rẽ nhánh if',
        titleEn: 'Conditional Statement: if',
        page: 101,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Biểu thức lôgic (bool), các phép toán and, or, not, lệnh if dạng thiếu, if-else dạng đủ, quy tắc thụt lề Indentation, bài toán chẵn lẻ, tiền điện luỹ kế và năm nhuận với mô phỏng 3D Three.js.',
        descriptionEn: 'Boolean expressions, logical operators (and, or, not), single if and two-way if-else statements, mandatory indentation, even/odd parity, tiered electricity bill, and leap year algorithm with Three.js 3D simulation.'
      },
      {
        id: 20,
        lessonNumber: 20,
        titleVi: 'Câu lệnh lặp for',
        titleEn: 'Loop Statement: for',
        page: 105,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Vòng lặp xác định với hàm range(), cơ chế luân chuyển biến lặp k, sơ đồ khối Hình 20.1, tham số end=" ", bài toán tìm ước số, ước thực sự, giai thừa và mô phỏng 3D Three.js bánh chuyền.',
        descriptionEn: 'Definite iteration with range() function, loop variable k mechanics, Figure 20.1 flowchart, end=" " parameter, divisor algorithms, proper divisors, factorials, and Three.js 3D carousel simulation.'
      },
      {
        id: 21,
        lessonNumber: 21,
        titleVi: 'Câu lệnh lặp while',
        titleEn: 'Loop Statement: while',
        page: 108,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Vòng lặp chưa biết trước số lần với lệnh while, sơ đồ khối Hình 21.1, cảnh báo lặp vô hạn, lệnh break, 3 cấu trúc lập trình cơ bản (tuần tự, rẽ nhánh, lặp), in bảng mã ASCII chr() 3 hàng, ma trận 10x10 và mô phỏng 3D Three.js vòng xoáy & cổng kiểm tra sentinel.',
        descriptionEn: 'Indefinite iteration with while loop, Figure 21.1 flowchart, infinite loop hazard alarm, break statement, 3 fundamental control structures (sequential, selection, iteration), 3-row ASCII chr() formatting, 10x10 matrix, and Three.js 3D vortex & sentinel gate simulation.'
      },
      {
        id: 22,
        lessonNumber: 22,
        titleVi: 'Kiểu dữ liệu danh sách',
        titleEn: 'List Data Type in Python',
        page: 111,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Khởi tạo danh sách bằng cặp ngoặc [], chỉ số 0 đến len()-1, hàm len(), lệnh xoá del, phép ghép +, duyệt danh sách bằng for và range(), phương thức append(), thuật toán tìm max/min kèm chỉ số và mô phỏng 3D Three.js thanh ghi ô nhớ & đầu đọc laser.',
        descriptionEn: 'List initialization with [], zero-based indexing 0..len()-1, len() function, del statement, concatenation (+), for traversal with range(), append() method, max/min algorithm with indices, and Three.js 3D memory slot & laser scanner simulation.'
      },
      {
        id: 23,
        lessonNumber: 23,
        titleVi: 'Một số lệnh làm việc với dữ liệu danh sách',
        titleEn: 'List Operations and Methods',
        page: 115,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Toán tử in kiểm tra thành viên, duyệt trực tiếp for k in A, bộ tứ phương thức: clear(), remove() và lỗi ValueError, insert() và quy tắc ngoài biên (k < 0, k > len()), đảo ngược thứ tự học sinh, xoá số âm không tăng biến i, tìm mẫu con liên tiếp [1, 2, 3], dãy Fibonacci và mô phỏng 3D Three.js.',
        descriptionEn: 'Membership "in" operator, direct element iteration with for k in A, list methods quartet: clear(), remove() with ValueError, insert() with out-of-bounds rules (k < 0, k > len()), reverse student order prepending, removing negative numbers without incrementing i, consecutive pattern matching [1, 2, 3], Fibonacci sequence, and Three.js 3D simulation.'
      },
      {
        id: 24,
        lessonNumber: 24,
        titleVi: 'Xâu kí tự',
        titleEn: 'String Data Type',
        page: 119,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Xâu kí tự Unicode cơ bản, 3 cách tạo xâu (nháy đơn, kép, ba), tính bất biến (immutable) và lỗi TypeError, duyệt bằng chỉ số vs for ch in s, toán tử in kiểm tra xâu con, giải thuật trích kí tự, phát hiện chữ số, chèn giữa và đếm tên học sinh với mô phỏng 3D Three.js.',
        descriptionEn: 'Unicode string fundamentals, 3 quote styles (single, double, triple), immutability and TypeError item assignment, index-based vs direct element iteration, substring membership with "in" operator, practical character extraction, digit detector, middle insertion, and student name counter with 3D Three.js simulation.'
      },
      {
        id: 25,
        lessonNumber: 25,
        titleVi: 'Một số lệnh làm việc với xâu kí tự',
        titleEn: 'String Methods and Operations',
        page: 123,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Phương thức find() tìm kiếm vị trí xâu con kèm tham số start và giá trị -1 khi không tìm thấy, bộ đôi phương thức đối ngẫu split() và join() chuyển hoá xâu và danh sách, thuật toán chuẩn hoá khoảng trắng văn bản, quy trình tách 2 cột họ đệm và tên học sinh với mô phỏng 3D WebGL Three.js.',
        descriptionEn: 'find() method for locating substring positions with start parameter and -1 return value, split() and join() dual methods bridging strings and lists, text whitespace normalization, two-column name separation pipeline, and interactive 3D WebGL Three.js simulation.'
      },
      {
        id: 26,
        lessonNumber: 26,
        titleVi: 'Hàm trong Python',
        titleEn: 'Functions in Python',
        page: 127,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Bản chất chương trình con trong tổ chức mã nguồn, 15 hàm thiết kế sẵn Bảng 26.1, cú pháp định nghĩa hàm def với thụt lề, phân biệt hàm trả lại giá trị (return) vs hàm không trả lại giá trị, giải thuật hàm prime(n) đếm ước thực sự C = 1, kỹ thuật thoát sớm (early return) tối ưu hoá và phòng thí nghiệm 3D Three.js mô phỏng cơ chế ống dẫn hàm.',
        descriptionEn: 'Subroutines in software architecture, 15 built-in functions in Table 26.1, def function declaration syntax with indentation, return value vs void procedures, prime(n) proper divisor counting (C = 1), multi-return early exit optimization, and interactive 3D Three.js black-box pipeline lab.'
      },
      {
        id: 27,
        lessonNumber: 27,
        titleVi: 'Tham số của hàm',
        titleEn: 'Function Parameters and Arguments',
        page: 131,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Phân biệt bản chất tham số (parameter) khi khai báo def vs đối số (argument) khi gọi hàm, cơ chế ánh xạ giá trị theo vị trí, quy tắc số lượng đối số bắt buộc khớp số tham số (lỗi TypeError & NameError), 4 ưu điểm cấu trúc chương trình con, hàm f_sum(A, b), hàm đếm từ f_dem(msg, sep), hàm đan xen xâu merge_str(s1, s2) và phòng thí nghiệm 3D WebGL Three.js.',
        descriptionEn: 'Distinction between formal parameters and runtime arguments, positional value-mapping mechanism, strict argument count matching rules (TypeError & NameError prevention), 4 modular software engineering advantages of subroutines, conditional sum f_sum(A, b), word counter f_dem(msg, sep), alternating interleaving merge_str(s1, s2), and interactive 3D WebGL Three.js simulation.'
      },
      {
        id: 28,
        lessonNumber: 28,
        titleVi: 'Phạm vi của biến',
        titleEn: 'Variable Scope: Local and Global',
        page: 136,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Quy tắc phạm vi biến khai báo trong hàm (tính cục bộ local, độc lập với ngoài hàm, giải phóng khi kết thúc hàm), phạm vi biến khai báo ngoài hàm (toàn cục global, hàm được phép đọc nhưng gán lại sẽ tạo biến cục bộ mới), từ khoá global để thay đổi biến toàn cục từ trong hàm, thiết kế pipeline module hoá với Select(A, x), Tach_tu(Str, c), Tach_day(A), thuật toán ƯCLN-BCNN qua tuple và phòng thí nghiệm 3D WebGL Three.js.',
        descriptionEn: 'Scoping rules of variables defined inside functions (local scope, isolation from outer scope, memory destruction upon exit), global variables declared in outer scope (read access inside functions vs shadowing upon assignment), global keyword to mutate outer variables, modular subprogram pipelines with Select(A, x), Tach_tu(Str, c), Tach_day(A), tuple multi-return GCD/LCM algorithms, and interactive 3D WebGL Three.js simulation.'
      },
      {
        id: 29,
        lessonNumber: 29,
        titleVi: 'Nhận biết lỗi chương trình',
        titleEn: 'Syntax and Runtime Errors',
        page: 141,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Phân loại 3 nhóm lỗi chính: Lỗi cú pháp SyntaxError, Lỗi ngoại lệ thời gian chạy Runtime/Exceptions Error, và Lỗi lôgic ngữ nghĩa; Khám phá bảng 7 mã ngoại lệ phổ biến (ZeroDivisionError, IndexError, NameError, TypeError, ValueError, IndentationError, SyntaxError); Thực hành phân tích kịch bản sinh lỗi với phép toán số học và nhập danh sách số nguyên; Phòng thí nghiệm 3D Three.js mô phỏng 3 trụ cột lỗi và radar chẩn đoán.',
        descriptionEn: 'Taxonomy of 3 core program error categories: SyntaxError, Runtime Exceptions, and Semantic Logic Errors; Diagnostic matrix of 7 frequent exceptions (ZeroDivisionError, IndexError, NameError, TypeError, ValueError, IndentationError, SyntaxError); Practical failure analysis on arithmetic operations and array ingestion pipelines; Interactive 3D Three.js diagnostic radar.'
      },
      {
        id: 30,
        lessonNumber: 30,
        titleVi: 'Kiểm thử và gỡ lỗi chương trình',
        titleEn: 'Testing and Debugging Programs',
        page: 145,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Khám phá 4 phương pháp kiểm thử: quan sát mã lỗi Runtime, sinh bộ dữ liệu test (nhiều bộ test, test ngẫu nhiên, test vùng biên 0 ≤ x, y ≤ 1), in giá trị biến trung gian print() và thiết lập điểm dừng (break point); Minh họa chi tiết thuật toán tìm ƯCLN qua phép trừ Euclid (m=20, n=16) với bảng theo dõi biến qua 4 vòng lặp; Phân tích lỗi ZeroDivisionError, nối xâu input() và 2 lỗi trong sắp xếp chèn Insertion Sort; Phòng thí nghiệm 3D Three.js mô phỏng buồng laser điểm dừng và tháp trừ Euclid.',
        descriptionEn: 'Explore 4 testing methodologies: runtime error code analysis, test suite generation (diverse sets, randomized testing, boundary tests for 0 ≤ x, y ≤ 1), intermediate print() instrumentation, and IDE break point inspection; Step-by-step case study on Euclidean subtraction GCD (m=20, n=16) with 4-iteration memory watch table; In-depth diagnosis of ZeroDivisionError, input() type coercion, and dual logic bugs in Insertion Sort; 3D WebGL Three.js interactive debugger chamber.'
      },
      {
        id: 31,
        lessonNumber: 31,
        titleVi: 'Thực hành viết chương trình đơn giản',
        titleEn: 'Practice: Writing Simple Python Programs',
        page: 149,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Thực hành viết chương trình giải quyết hai bài toán kinh điển: Phân tích số tự nhiên ra thừa số nguyên tố (xét n = 1, thiết lập breakpoint dòng 20 và bảng theo dõi 4 biến n = 100) và Giải phương trình bậc hai ax² + bx + c = 0 (module hoá NhapDL, GiaiPT1, GiaiPT2 và kỹ thuật rút gọn if...elif...else lồng nhau); Luyện tập kiểm soát số dương a > 0, in bảng cửu chương 2 hàng, tính 24 năm nhuận thế kỉ XXI và thuật toán Euclid modulo O(log n); Phòng thí nghiệm 3D Three.js mô phỏng cây thừa số và không gian biệt thức Delta.',
        descriptionEn: 'Hands-on development of two foundational algorithmic projects: Prime Factorization (handling edge case n = 1, breakpoint at line 20, and 4-variable watch table for n = 100) and Quadratic Equation solver ax² + bx + c = 0 (modular architecture with NhapDL, GiaiPT1, GiaiPT2, and nested if...elif...else flattening); Practice with positive float validation loops, dual-row multiplication tables, counting 24 leap years in the 21st century, and logarithmic modulo Euclidean GCD; Interactive 3D WebGL laboratory.'
      },
      {
        id: 32,
        lessonNumber: 32,
        titleVi: 'Ôn tập lập trình Python',
        titleEn: 'Review: Python Programming',
        page: 153,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Tổng ôn tập lập trình Python toàn diện qua 3 dự án liên môn: Tách phần họ, đệm, tên xâu tiếng Việt bằng split() và join(slist[1:n-1]); Tính trọng lượng vật thể trên 6 hành tinh Hệ Mặt Trời P = P0 × g / 9.8 liên môn Vật lý với weight.py; Thẩm định tính hợp lệ ngày-tháng-năm lịch thiên văn xét năm nhuận với date.py; Thực hành thuật toán sắp xếp học sinh ưu tiên Tên -> Họ -> Đệm theo 89 kí tự tiếng Việt có dấu, chuyển đổi ngày tuần tự bảng tính điện tử từ 1-1-1900 và tối ưu hoá thừa số nguyên tố O(√n); Phòng thí nghiệm 3D Three.js trường trọng lực hành tinh.',
        descriptionEn: 'Comprehensive Python programming review through 3 interdisciplinary capstone projects: Vietnamese name dissection via split() and join(slist[1:n-1]); Physics weight simulation across 6 celestial gravitational wells P = P0 * g / 9.8 via weight.py; Perpetual calendar date validation adjusting leap year February via date.py; Vietnamese student collation prioritizing Given->Surname->Middle, spreadsheet serial dates from 1-1-1900, and square-root prime factorization bound O(√n); Interactive 3D WebGL solar system laboratory.'
      }
    ]
  },
  {
    id: 6,
    topicNumber: 6,
    titleVi: 'HƯỚNG NGHIỆP VỚI TIN HỌC',
    titleEn: 'CAREER ORIENTATION IN INFORMATICS',
    page: 156,
    iconName: 'Briefcase',
    color: 'rose',
    lessons: [
      {
        id: 33,
        lessonNumber: 33,
        titleVi: 'Nghề thiết kế đồ hoạ máy tính',
        titleEn: 'Careers in Computer Graphic Design',
        page: 156,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Khám phá toàn diện nghề thiết kế đồ hoạ máy tính: Bản chất dàn dựng bố cục, chỉnh sửa hình ảnh, lựa chọn màu sắc để truyền tải thông điệp; 5 thành phần cấu tạo hình ảnh và 3 lợi ích cốt lõi cho mọi ngành nghề; Hệ sinh thái phần mềm chuyên dụng (Photoshop, CorelDraw, GIMP, InDesign, AutoCAD, SolidWorks); Kiến thức công nghệ in ấn CMYK và liên môn rộng lớn; Lộ trình đào tạo đại học, cổng hướng nghiệp số (Google, LinkedIn, Vietnamworks) và cơ hội việc làm tự do (Freelance); Phòng thí nghiệm 3D Three.js mô phỏng xưởng đồ họa đa tầng và bản đồ kĩ năng.',
        descriptionEn: 'Comprehensive exploration of computer graphic design careers: layout composition, image editing, and color theory for compelling communication; 5 visual building blocks and 3 core organizational benefits; Professional software ecosystem (Photoshop, CorelDraw, GIMP, InDesign, AutoCAD, SolidWorks); Prepress CMYK printing and interdisciplinary foundations; Academic university pathways, digital career gateways (LinkedIn, Vietnamworks), and flexible freelance opportunities; Interactive 3D Three.js layered studio and career constellation.'
      },
      {
        id: 34,
        lessonNumber: 34,
        titleVi: 'Nghề phát triển phần mềm',
        titleEn: 'Careers in Software Development',
        page: 160,
        status: 'active',
        tag: 'Đã hoàn thiện',
        descriptionVi: 'Khám phá trọn vẹn nghề phát triển phần mềm (Software Development): Bản chất phần mềm công nghiệp hàng vạn/hàng triệu dòng lệnh; Quy trình 7 công đoạn SDLC (Khảo sát, Phân tích, Thiết kế, Lập trình, Kiểm thử, Chuyển giao, Bảo trì) dưới sự bao trùm của Quản trị dự án; 3 vị trí nhân sự nòng cốt (Lập trình viên, Kĩ sư phần mềm / Kiến trúc sư, Quản trị dự án - phép so sánh Kiến trúc sư vs Thợ xây); 6 lĩnh vực nghề nghiệp (Ứng dụng, UI/UX, Web/Cloud, AI/ML, Game, Mobile); Nhu cầu STEM trong CMCN 4.0 tại Việt Nam; Khối thi A00, A01, D01 và các trường đại học công nghệ hàng đầu; Phòng thí nghiệm 3D Three.js mô phỏng bánh xe SDLC, 3 trụ cột nhân lực và hệ sinh thái 4.0.',
        descriptionEn: 'Comprehensive guide to software development careers: industrial scale systems with millions of lines of code; 7-stage SDLC cycle (Survey, Analysis, Design, Coding, Testing, Deployment, Maintenance) under overarching Project Management; 3 core human pillars (Programmer, Software Engineer / Architect, Project Manager - Architect vs Builder analogy); 6 tech domains (Applications, UI/UX, Web/Cloud, AI/ML, Game, Mobile); STEM demand in Vietnam 4.0; University admission codes A00, A01, D01; Interactive 3D Three.js lab visualizing SDLC wheel, human pillars, and 4.0 tech constellation.'
      }
    ]
  }
];

export const SGK_EXTRAS = [
  {
    id: 'appendix',
    titleVi: 'Phụ lục: Bảng mã ASCII mở rộng',
    titleEn: 'Appendix: Extended ASCII Table',
    page: 165,
    tag: 'Tài liệu tra cứu',
    descriptionVi: 'Bảng mã ASCII mở rộng 256 ký tự (0 – 255), mã hóa nhị phân 8-bit và mã Hexa đối chiếu chuẩn SGK.',
    descriptionEn: 'Complete 256-code extended ASCII table with binary nibbles, hex values, and character decoders.'
  },
  {
    id: 'glossary',
    titleVi: 'Bảng giải thích thuật ngữ',
    titleEn: 'Glossary of Informatics Terms',
    page: 166,
    tag: 'Từ điển thuật ngữ',
    descriptionVi: 'Hệ thống 29 thuật ngữ chính thức SGK Tin học 10 (Trang 166 – 167) từ Biến (Variable) đến Virus kèm số trang đối chiếu.',
    descriptionEn: '29 official Grade 10 textbook terms from pages 166–167 from Variable to Virus with verified page references.'
  },
  {
    id: 'publication',
    titleVi: 'Thông tin xuất bản & Bản quyền',
    titleEn: 'Publication & Copyright Details',
    page: 168,
    tag: 'Hồ sơ bản quyền',
    descriptionVi: 'Lời cảm ơn, Ban cố vấn & Ban biên tập, Bản quyền © NXB Giáo dục Việt Nam, Mã số ISBN 978-604-0-31089-7.',
    descriptionEn: 'Publishing leadership, editorial board, copyright notices, and official ISBN 978-604-0-31089-7.'
  }
];
