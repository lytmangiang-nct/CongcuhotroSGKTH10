export interface SgkGlossaryTerm {
  id: string;
  letter: string;
  termVi: string;
  termEn?: string;
  definitionVi: string;
  definitionEn?: string;
  page: number;
  category?: string;
}

export const SGK_OFFICIAL_GLOSSARY: SgkGlossaryTerm[] = [
  // Trang 166
  {
    id: 'bien-variable',
    letter: 'B',
    termVi: 'Biến (Variable)',
    termEn: 'Variable',
    definitionVi: 'Một tên (định danh) được tạo ra khi lập trình để tham chiếu dữ liệu trong bộ nhớ.',
    definitionEn: 'An identifier created during programming to reference data stored in computer memory.',
    page: 91,
    category: 'Lập trình Python'
  },
  {
    id: 'dich-vu-dam-may',
    letter: 'D',
    termVi: 'Dịch vụ đám mây (Cloud Service)',
    termEn: 'Cloud Service',
    definitionVi: 'Dịch vụ phân phối/chia sẻ các tài nguyên tin học (phần cứng, phần mềm,...) theo nhu cầu qua Internet với chính sách thanh toán theo hạn mức sử dụng.',
    definitionEn: 'On-demand delivery and sharing of computing resources (hardware, software, etc.) over the Internet with usage-based payment.',
    page: 41,
    category: 'Mạng & Internet'
  },
  {
    id: 'diem-chi-huong',
    letter: 'Đ',
    termVi: 'Điểm chỉ hướng (Node handles)',
    termEn: 'Node handles',
    definitionVi: 'Điểm có thể tác động để điều khiển hình dạng của đoạn cong kề với điểm neo ở phía tương ứng.',
    definitionEn: 'Control points used to adjust the curvature and shape of the curved segment adjacent to the node.',
    page: 76,
    category: 'Đồ họa Vectơ (Inkscape)'
  },
  {
    id: 'diem-neo',
    letter: 'Đ',
    termVi: 'Điểm neo (Nodes)',
    termEn: 'Nodes',
    definitionVi: 'Điểm đầu mút hoặc điểm nối giữa các đoạn của đối tượng dạng đường thường được dùng để biến đổi hình. Điểm neo trơn có hai đường chỉ hướng của hai đoạn có phương trùng nhau. Điểm neo góc không bắt buộc phương của hai đường chỉ hướng (nếu có) phải cùng phương.',
    definitionEn: 'Endpoints or junctions between path segments used to transform shapes. Smooth nodes have collinear direction lines; corner nodes allow independent direction lines.',
    page: 76,
    category: 'Đồ họa Vectơ (Inkscape)'
  },
  {
    id: 'dieu-che-ma-xung',
    letter: 'Đ',
    termVi: 'Điều chế mã xung (Pulse Code Modulation - PCM)',
    termEn: 'Pulse Code Modulation (PCM)',
    definitionVi: 'Mã hoá tín hiệu âm thanh bằng cách lấy mẫu biên độ tín hiệu theo những khoảng thời gian đều đặn. Biên độ tức thời của tín hiệu tại mỗi lần lấy mẫu được làm tròn gần nhất với các mức đã định trước. PCM là dạng tiêu chuẩn của âm thanh kĩ thuật số.',
    definitionEn: 'A digital audio encoding technique sampling signal amplitudes at regular intervals and quantizing each sample to predefined levels; the standard form of digital audio.',
    page: 28,
    category: 'Số hóa dữ liệu'
  },
  {
    id: 'do-sau-mau',
    letter: 'Đ',
    termVi: 'Độ sâu màu (bit depth)',
    termEn: 'Color Depth / Bit Depth',
    definitionVi: 'Số bit cần thiết để mang thông tin màu của một điểm ảnh trong biểu diễn ảnh.',
    definitionEn: 'The number of bits used to represent the color information of a single pixel in a digital image.',
    page: 30,
    category: 'Số hóa dữ liệu'
  },
  {
    id: 'doi-so-cua-ham',
    letter: 'Đ',
    termVi: 'Đối số (Argument) của hàm',
    termEn: 'Function Argument',
    definitionVi: 'Giá trị thực tế truyền vào cho tham số khi gọi hàm.',
    definitionEn: 'The actual value supplied to a parameter when invoking a function.',
    page: 131,
    category: 'Lập trình Python'
  },
  {
    id: 'doi-tuong-dang-duong',
    letter: 'Đ',
    termVi: 'Đối tượng dạng đường (Paths)',
    termEn: 'Paths',
    definitionVi: 'Một chuỗi các đoạn thẳng hay đoạn cong nối với nhau.',
    definitionEn: 'A sequence of interconnected straight or curved line segments.',
    page: 75,
    category: 'Đồ họa Vectơ (Inkscape)'
  },
  {
    id: 'duong-chi-huong',
    letter: 'Đ',
    termVi: 'Đường chỉ hướng (Direction lines)',
    termEn: 'Direction lines',
    definitionVi: 'Đường xác định hướng của đường tiếp tuyến và cung trên đoạn cong kề với điểm neo ở phía tương ứng.',
    definitionEn: 'Lines defining tangent vectors and curvature of segments adjacent to an anchor node.',
    page: 76,
    category: 'Đồ họa Vectơ (Inkscape)'
  },
  {
    id: 'ham-function',
    letter: 'H',
    termVi: 'Hàm (Function)',
    termEn: 'Function',
    definitionVi: 'Một nhóm các lệnh có liên quan được đóng gói thành một đơn vị độc lập để thực hiện một tác vụ/nhiệm vụ cụ thể nào đó.',
    definitionEn: 'A packaged block of related statements structured as an independent unit to perform a specific task.',
    page: 127,
    category: 'Lập trình Python'
  },
  {
    id: 'ket-noi-van-vat',
    letter: 'K',
    termVi: 'Kết nối vạn vật (Internet of things)',
    termEn: 'Internet of Things (IoT)',
    definitionVi: 'Liên kết các thiết bị thông minh để tự động thu thập, truyền và xử lí dữ liệu phục vụ cho mục đích ứng dụng.',
    definitionEn: 'Interconnecting smart devices to autonomously collect, transmit, and process data for diverse applications.',
    page: 12,
    category: 'Máy tính & Xã hội'
  },
  {
    id: 'kiem-thu-test',
    letter: 'K',
    termVi: 'Kiểm thử (Test)',
    termEn: 'Software Testing',
    definitionVi: 'Công việc kiểm tra và chạy thử chương trình với mục đích tìm ra lỗi của chương trình.',
    definitionEn: 'The execution and examination of software programs aimed at detecting defects and bugs.',
    page: 145,
    category: 'Kỹ thuật Lập trình'
  },
  {
    id: 'kieu-du-lieu',
    letter: 'K',
    termVi: 'Kiểu dữ liệu (Data type)',
    termEn: 'Data Type',
    definitionVi: 'Phân loại dữ liệu sử dụng trong chương trình có chung cách biểu diễn và các phép xử lí, ví dụ: số nguyên (int), số thực (float), xâu kí tự (str), lôgic (bool), danh sách (list).',
    definitionEn: 'A classification of data items determining internal representation and permissible operations (e.g. int, float, str, bool, list).',
    page: 88,
    category: 'Lập trình Python'
  },
  {
    id: 'mau-to',
    letter: 'M',
    termVi: 'Màu tô (Fill color)',
    termEn: 'Fill color',
    definitionVi: 'Màu tô phía trong đối tượng được chọn.',
    definitionEn: 'The interior color rendered inside a selected vector object or shape.',
    page: 65,
    category: 'Đồ họa Vectơ (Inkscape)'
  },
  {
    id: 'mau-ve',
    letter: 'M',
    termVi: 'Màu vẽ (Stroke color)',
    termEn: 'Stroke color',
    definitionVi: 'Màu vẽ đường viền của đối tượng.',
    definitionEn: 'The exterior outline or border color applied to a shape or path.',
    page: 65,
    category: 'Đồ họa Vectơ (Inkscape)'
  },

  // Trang 167
  {
    id: 'lop-layer',
    letter: 'L',
    termVi: 'Lớp (Layer)',
    termEn: 'Layer',
    definitionVi: 'Thuộc tính cho phép người dùng tổ chức các đối tượng theo thứ tự hiển thị được mong muốn trên vùng làm việc.',
    definitionEn: 'An organizational construct allowing graphic elements to be stacked and arranged hierarchically on the canvas.',
    page: 66,
    category: 'Đồ họa Vectơ (Inkscape)'
  },
  {
    id: 'loi-ngoai-le',
    letter: 'L',
    termVi: 'Lỗi ngoại lệ (Exception error)',
    termEn: 'Exception Error',
    definitionVi: 'Lỗi gây ra do điều kiện xử lí không thích hợp như chia cho 0, mất tín hiệu mạng, mở một tệp không tồn tại,... Việc bắt các lỗi ngoại lệ giúp có thể kiểm soát được hoạt động xử lí, ví dụ thông báo lỗi và dừng xử lí.',
    definitionEn: 'Errors triggered by improper execution states (division by zero, missing file, network failure); catching exceptions enables graceful handling.',
    page: 141,
    category: 'Kỹ thuật Lập trình'
  },
  {
    id: 'loi-runtime',
    letter: 'L',
    termVi: 'Lỗi trong khi đang chạy (Runtime error)',
    termEn: 'Runtime Error',
    definitionVi: 'Lỗi xảy ra khi chương trình đang chạy.',
    definitionEn: 'An error that surfaces during the actual execution of a program.',
    page: 142,
    category: 'Kỹ thuật Lập trình'
  },
  {
    id: 'loi-chuong-trinh-debug',
    letter: 'L',
    termVi: 'Lỗi chương trình (Bug) và gỡ lỗi (Debug)',
    termEn: 'Software Bug & Debugging',
    definitionVi: 'Lỗi trong chương trình dẫn đến chương trình không chạy được hoặc chạy không đúng. Debug là tìm để khắc phục các bug.',
    definitionEn: 'A program defect causing crash or incorrect output. Debugging is the systematic process of finding and fixing bugs.',
    page: 141,
    category: 'Kỹ thuật Lập trình'
  },
  {
    id: 'phan-mem-doc-hai',
    letter: 'P',
    termVi: 'Phần mềm độc hại (Malware)',
    termEn: 'Malware',
    definitionVi: 'Phần mềm được viết ra với ý đồ xấu, gây hại cho người dùng.',
    definitionEn: 'Malicious software engineered with adverse intent to harm, exploit, or compromise users and devices.',
    page: 45,
    category: 'An toàn mạng'
  },
  {
    id: 'phan-mem-noi-gian',
    letter: 'P',
    termVi: 'Phần mềm nội gián (Trojan)',
    termEn: 'Trojan Horse',
    definitionVi: 'Phần mềm độc hại, thực hiện các hành vi nội gián như ăn cắp thông tin hay chiếm đoạt quyền sử dụng máy tính.',
    definitionEn: 'Malicious software disguised as legitimate utility executing unauthorized spy actions or remote system hijacking.',
    page: 46,
    category: 'An toàn mạng'
  },
  {
    id: 'phuong-thuc-method',
    letter: 'P',
    termVi: 'Phương thức (Method)',
    termEn: 'Method',
    definitionVi: 'Hàm đặc biệt được thiết lập riêng cho từng kiểu dữ liệu.',
    definitionEn: 'A specialized function inherently bound to a specific data type or class.',
    page: 113,
    category: 'Lập trình Python'
  },
  {
    id: 'sau-may-tinh-worm',
    letter: 'S',
    termVi: 'Sâu máy tính (Worm)',
    termEn: 'Computer Worm',
    definitionVi: 'Phần mềm độc hại, hoàn chỉnh, tồn tại độc lập, có khả năng nhân bản và lây lan nhờ khai thác lỗ hổng bảo mật của hệ điều hành hay sự bất cẩn của người dùng.',
    definitionEn: 'Autonomous malware capable of self-replicating and spreading across networks by exploiting security flaws.',
    page: 46,
    category: 'An toàn mạng'
  },
  {
    id: 'tham-so-parameters',
    letter: 'T',
    termVi: 'Tham số (Parameters)',
    termEn: 'Function Parameters',
    definitionVi: 'Biến được mô tả trong khai báo của hàm.',
    definitionEn: 'Variables declared in a function definition signature to accept incoming arguments.',
    page: 131,
    category: 'Lập trình Python'
  },
  {
    id: 'thiet-bi-so',
    letter: 'T',
    termVi: 'Thiết bị số',
    termEn: 'Digital Devices',
    definitionVi: 'Thiết bị dùng với thông tin số - thông tin được mã hoá trong hệ nhị phân.',
    definitionEn: 'Electronic appliances operating on digital information encoded in binary system.',
    page: 6,
    category: 'Thông tin & Xử lý'
  },
  {
    id: 'thiet-bi-thong-minh',
    letter: 'T',
    termVi: 'Thiết bị thông minh',
    termEn: 'Smart Devices',
    definitionVi: 'Thiết bị có khả năng kết nối với thiết bị khác qua mạng, có khả năng hoạt động tự động, thích ứng với bối cảnh không cần sự can thiệp của con người; thiết bị tính toán thông dụng; thiết bị có các yếu tố trí tuệ nhân tạo.',
    definitionEn: 'Networked electronic devices operating autonomously, adapting to environmental contexts without human intervention, incorporating computation and AI elements.',
    page: 11,
    category: 'Máy tính & Xã hội'
  },
  {
    id: 'toc-do-bit',
    letter: 'T',
    termVi: 'Tốc độ bit (Bit rate)',
    termEn: 'Bit Rate',
    definitionVi: 'Số bit cần thiết lưu âm thanh để phát âm thanh trong một giây.',
    definitionEn: 'The number of bits processed or transferred per second to reproduce continuous digital audio.',
    page: 29,
    category: 'Số hóa dữ liệu'
  },
  {
    id: 'tu-khoa-keyword',
    letter: 'T',
    termVi: 'Từ khoá (Keyword)',
    termEn: 'Reserved Keyword',
    definitionVi: 'Từ dành riêng quy định ý nghĩa câu lệnh của chương trình, không được dùng để đặt tên cho các đối tượng của chương trình.',
    definitionEn: 'Reserved identifiers in programming syntax with predefined semantics, prohibited from being used as variable or function names.',
    page: 91,
    category: 'Lập trình Python'
  },
  {
    id: 'virus-malware',
    letter: 'V',
    termVi: 'Virus',
    termEn: 'Computer Virus',
    definitionVi: 'Một đoạn mã độc hại, lây lan bằng cách gắn vào một chương trình, khi thực hiện chương trình, đoạn mã sẽ thực hiện chức năng gây hại và giải phóng mã độc để gắn vào các chương trình khác.',
    definitionEn: 'Parasitic malicious code spreading by attaching itself to host executables, replicating upon execution.',
    page: 46,
    category: 'An toàn mạng'
  }
];
