import { TermDefinition } from './lessonData';

export interface QuizQuestion {
  id: number;
  questionVi: string;
  questionEn: string;
  codeSnippet?: string;
  optionsVi: string[];
  optionsEn: string[];
  correctIndex: number;
  explanationVi: string;
  explanationEn: string;
}

export const LESSON_2_GLOSSARY: TermDefinition[] = [
  {
    id: 'smart-device',
    termEn: 'Smart Device',
    termVi: 'Thiết bị thông minh',
    ipa: '/smɑːt dɪˈvaɪs/',
    definitionVi: 'Thiết bị điện tử có thể hoạt động tự chủ không cần sự can thiệp của con người, tự thích ứng với hoàn cảnh và có khả năng kết nối với các thiết bị khác để trao đổi dữ liệu.',
    definitionEn: 'An electronic device that can operate autonomously without human intervention, adapt to its environment, and connect to other devices to exchange data.',
    exampleVi: 'Điện thoại thông minh, camera kết nối Internet, robot hút bụi là các thiết bị thông minh phổ biến.',
    exampleEn: 'Smartphones, Internet-connected cameras, and robotic vacuum cleaners are common smart devices.'
  },
  {
    id: 'iot',
    termEn: 'Internet of Things (IoT)',
    termVi: 'Internet vạn vật (IoT)',
    ipa: '/ˈɪn.tə.net əv θɪŋz/',
    definitionVi: 'Việc kết nối các thiết bị thông minh với nhau nhằm thu thập và xử lí thông tin một cách tự động, tức thời trên diện rộng.',
    definitionEn: 'The interconnection of smart devices to collect, exchange, and process data automatically and instantaneously across a wide network.',
    exampleVi: 'Hệ thống đèn đường thông minh tự động bật khi trời tối và cảm biến giám sát giao thông là ứng dụng của IoT.',
    exampleEn: 'Smart streetlights automatically turning on at dusk and traffic monitoring sensors are applications of IoT.'
  },
  {
    id: 'industry-4',
    termEn: 'Fourth Industrial Revolution (Industry 4.0)',
    termVi: 'Cách mạng công nghiệp lần thứ tư (CMCN 4.0)',
    ipa: '/ˈfɔːθ ɪnˈdʌs.tri.əl ˌrev.əˈluː.ʃən/',
    definitionVi: 'Cuộc cách mạng công nghiệp dựa trên nền tảng công nghệ số, tích hợp các công nghệ thông minh (AI, IoT, Cloud, Big Data) làm mờ ranh giới giữa thế giới thực và thế giới ảo.',
    definitionEn: 'The industrial revolution built upon digital technologies, integrating AI, IoT, Cloud Computing, and Big Data, blurring the lines between physical and cyber-physical systems.',
    exampleVi: 'Nhà máy sản xuất thông minh và xe tự hành là thành tựu điển hình của CMCN 4.0.',
    exampleEn: 'Smart manufacturing plants and autonomous vehicles are quintessential achievements of Industry 4.0.'
  },
  {
    id: 'knowledge-economy',
    termEn: 'Knowledge Economy',
    termVi: 'Nền kinh tế tri thức',
    ipa: '/ˈnɒl.ɪdʒ ɪˈkɒn.ə.mi/',
    definitionVi: 'Nền kinh tế chủ yếu dựa vào tri thức, trên cơ sở phát triển khoa học và công nghệ cao, lấy tri thức làm động lực chủ yếu tăng trưởng kinh tế.',
    definitionEn: 'An economy primarily based on knowledge, high technology, and science, where intellectual capital is the key engine of growth.',
    exampleVi: 'Trong giá bán smartphone, chi phí thiết kế, phần mềm và bản quyền chiếm hơn nửa giá trị sản phẩm.',
    exampleEn: 'In smartphone pricing, design, software, and intellectual property rights account for more than half the value.'
  },
  {
    id: 'ai',
    termEn: 'Artificial Intelligence (AI)',
    termVi: 'Trí tuệ nhân tạo (AI)',
    ipa: '/ˌɑː.tɪˈfɪʃ.əl ɪnˈtel.ɪ.dʒəns/',
    definitionVi: 'Khả năng của thiết bị thông minh và máy móc bắt chước một vài hành vi hay cách tư duy của con người (giao tiếp ngôn ngữ tự nhiên, nhận dạng hình ảnh, tự ra quyết định).',
    definitionEn: 'The simulation of human intelligence processes by machines and smart devices, including learning, reasoning, natural language processing, and computer vision.',
    exampleVi: 'Người máy giao tiếp bằng tiếng Việt hoặc xe tự hành tự né chướng ngại vật sử dụng trí tuệ nhân tạo.',
    exampleEn: 'A robot conversing in natural language or a self-driving car avoiding obstacles utilizes artificial intelligence.'
  },
  {
    id: 'high-level-lang',
    termEn: 'High-Level Programming Language',
    termVi: 'Ngôn ngữ lập trình bậc cao',
    ipa: '/haɪ ˈlev.əl ˈprəʊ.ɡræm.ɪŋ ˈlæŋ.ɡwɪdʒ/',
    definitionVi: 'Ngôn ngữ lập trình gần gũi với ngôn ngữ tự nhiên, giúp người lập trình thể hiện thuật toán mà không cần quan tâm đến cấu trúc phần cứng cụ thể.',
    definitionEn: 'A programming language designed to be easy for humans to read and write, abstracting away machine hardware details.',
    exampleVi: 'FORTRAN (1957) là ngôn ngữ bậc cao đầu tiên, sau này là C, Pascal, Python.',
    exampleEn: 'FORTRAN (1957) was the first high-level language, followed by C, Pascal, and Python.'
  },
  {
    id: 'dbms',
    termEn: 'Database Management System (DBMS)',
    termVi: 'Hệ quản trị cơ sở dữ liệu',
    ipa: '/ˈdeɪ.tə.beɪs ˈmæn.ɪdʒ.mənt ˈsɪs.təm/',
    definitionVi: 'Phần mềm cung cấp công cụ tổ chức, lưu trữ, truy cập và quản lí dữ liệu một cách độc lập với các chương trình ứng dụng.',
    definitionEn: 'Software that handles the storage, retrieval, and updating of data in a database independently of application programs.',
    exampleVi: 'Hệ quản trị CSDL quan hệ như DB2, Microsoft SQL Server, Oracle, MySQL.',
    exampleEn: 'Relational database management systems like DB2, Microsoft SQL Server, Oracle, and MySQL.'
  },
  {
    id: 'operating-system',
    termEn: 'Operating System (OS)',
    termVi: 'Hệ điều hành',
    ipa: '/ˈɒp.ər.eɪ.tɪŋ ˈsɪs.təm/',
    definitionVi: 'Phần mềm nền tảng giúp quản lí thông tin, quản lí phần cứng, quản lí các tiến trình xử lí và cung cấp giao diện làm việc với người dùng.',
    definitionEn: 'System software that manages computer hardware, software resources, and provides common services and interfaces for user interaction.',
    exampleVi: 'Hệ điều hành OS/360 (1964) của IBM, Windows, macOS, Android, iOS, UNIX.',
    exampleEn: 'IBM OS/360 (1964), Windows, macOS, Android, iOS, and UNIX.'
  }
];

export const LESSON_2_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: "Theo SGK Tin học 10, thiết bị thông minh là:",
    questionEn: "According to the Grade 10 Informatics textbook, a smart device is:",
    optionsVi: [
      "A. Mọi thiết bị điện tử có gắn màn hình cảm ứng hoặc đèn LED phát sáng.",
      "B. Thiết bị điện tử có thể hoạt động tự chủ, tự thích ứng với hoàn cảnh và có khả năng kết nối trao đổi dữ liệu.",
      "C. Mọi loại đồng hồ đếm giờ và máy tính bỏ túi thông thường.",
      "D. Thiết bị chỉ có thể hoạt động khi luôn luôn có con người bấm nút điều khiển trực tiếp từng bước."
    ],
    optionsEn: [
      "A. Any electronic device equipped with a touchscreen or LED display.",
      "B. An electronic device that operates autonomously, adapts to its environment, and can connect to exchange data.",
      "C. Any conventional digital stopwatch or handheld pocket calculator.",
      "D. A device that can only function under continuous direct manual human control."
    ],
    correctIndex: 1,
    explanationVi: "Hộp ghi nhớ (Trang 13 SGK) định nghĩa: 'Thiết bị thông minh là thiết bị điện tử có thể hoạt động tự chủ không cần sự can thiệp của con người, tự thích ứng với hoàn cảnh và có khả năng kết nối với các thiết bị khác để trao đổi dữ liệu'.",
    explanationEn: "Key Takeaway (Page 13): 'A smart device is an electronic device that can operate autonomously without human intervention, adapt to its environment, and connect to other devices to exchange data.'"
  },
  {
    id: 2,
    questionVi: "Quan sát Hình 2.1 SGK (Trang 11), những thiết bị nào dưới đây là THIẾT BỊ THÔNG MINH?",
    questionEn: "Looking at Figure 2.1 (Page 11), which of the following are SMART DEVICES?",
    optionsVi: [
      "A. Đồng hồ lịch vạn niên và máy ảnh số cơ bản.",
      "B. Điện thoại di động (smartphone) và camera kết nối Internet.",
      "C. Chỉ duy nhất đồng hồ lịch vạn niên vì có bảng led hiển thị ngày tháng.",
      "D. Cả 4 thiết bị đều là thiết bị thông minh."
    ],
    optionsEn: [
      "A. The perpetual calendar digital clock and basic digital camera.",
      "B. The mobile phone (smartphone) and the Internet-connected camera.",
      "C. Exclusively the perpetual calendar clock because it displays dates.",
      "D. All 4 devices are smart devices."
    ],
    correctIndex: 1,
    explanationVi: "Đồng hồ lịch vạn niên không có khả năng kết nối mạng; máy ảnh số thông thường không tự chủ hoạt động. Chỉ có smartphone và camera kết nối Internet (tự truyền dữ liệu, lọc chuyển động) là thiết bị thông minh.",
    explanationEn: "The perpetual clock cannot connect to networks; basic digital cameras lack autonomy. Only smartphones and Internet-connected cameras qualify as smart devices."
  },
  {
    id: 3,
    questionVi: "Cuộc cách mạng công nghiệp lần thứ tư (CMCN 4.0) có đặc trưng nổi bật nào?",
    questionEn: "What is the defining characteristic of the Fourth Industrial Revolution (Industry 4.0)?",
    optionsVi: [
      "A. Chuyển từ lao động thủ công sang cơ giới với dấu ấn động cơ hơi nước.",
      "B. Ứng dụng điện năng vào sản xuất dây chuyền tập trung quy mô lớn.",
      "C. Máy tính hỗ trợ hoạt động trí tuệ của con người ở cuối thế kỉ XX.",
      "D. Hệ thống kết nối vạn vật (IoT) và các hệ thống kết hợp thực - ảo (CPS) trở nên phổ biến trên nền tảng công nghệ số."
    ],
    optionsEn: [
      "A. Transition from manual labor to mechanization driven by steam engines.",
      "B. Widespread use of electric power in centralized assembly-line production.",
      "C. Computers supporting human intellectual work in the late 20th century.",
      "D. Internet of Things (IoT) and Cyber-Physical Systems (CPS) becoming ubiquitous upon a digital foundation."
    ],
    correctIndex: 3,
    explanationVi: "Hình 2.2 SGK chỉ rõ: CMCN 1 (Động cơ hơi nước) -> CMCN 2 (Điện năng, dây chuyền) -> CMCN 3 (Máy tính hỗ trợ trí tuệ) -> CMCN 4 (Hệ thống IoT và các hệ thống kết hợp thực - ảo).",
    explanationEn: "Figure 2.2 shows: Ind. 1 (Steam power) -> Ind. 2 (Electricity & assembly lines) -> Ind. 3 (Computers) -> Ind. 4 (IoT and Cyber-Physical Systems)."
  },
  {
    id: 4,
    questionVi: "Thuật ngữ 'IoT' (Internet of Things - Internet vạn vật) được hiểu là:",
    questionEn: "The term 'IoT' (Internet of Things) is defined as:",
    optionsVi: [
      "A. Việc kết nối các thiết bị thông minh với nhau nhằm thu thập và xử lí thông tin tự động, tức thời trên diện rộng.",
      "B. Chỉ việc mua sắm hàng hóa đồ gia dụng qua các trang thương mại điện tử.",
      "C. Việc nối dây mạng LAN nội bộ giữa hai máy vi tính để chơi trò chơi điện tử.",
      "D. Quá trình sản xuất động cơ hơi nước và dây chuyền công nghiệp thế kỉ XIX."
    ],
    optionsEn: [
      "A. Connecting smart devices together to collect and process information automatically and instantaneously on a broad scale.",
      "B. Merely shopping for household goods on e-commerce websites.",
      "C. Connecting two computers with a local LAN cable to play video games.",
      "D. The 19th-century manufacturing of steam engines and assembly lines."
    ],
    correctIndex: 0,
    explanationVi: "SGK Trang 13: 'IoT là việc kết nối các thiết bị thông minh với nhau nhằm thu thập và xử lí thông tin một cách tự động, tức thời trên diện rộng'.",
    explanationEn: "Textbook page 13: 'IoT is the interconnection of smart devices to collect and process data automatically and instantaneously across a wide network.'"
  },
  {
    id: 5,
    questionVi: "Trong một nền kinh tế tri thức, yếu tố nào chiếm tỉ trọng lớn nhất trong giá thành một chiếc điện thoại thông minh?",
    questionEn: "In a knowledge economy, which component accounts for the greatest share of a smartphone's value?",
    optionsVi: [
      "A. Giá trị của nguyên vật liệu kim loại và nhựa làm vỏ máy.",
      "B. Tiền lương trả cho công nhân lắp ráp thủ công tại nhà máy.",
      "C. Chi phí chất xám: thiết kế, nghiên cứu phần mềm và mua bản quyền công nghệ sáng chế.",
      "D. Tiền đóng hộp giấy và cước phí vận chuyển hàng hóa."
    ],
    optionsEn: [
      "A. The cost of raw metal and plastic materials for the casing.",
      "B. The wages paid to manual assembly workers at the factory.",
      "C. Intellectual capital: design costs, software engineering, and technological patent licensing.",
      "D. Paper packaging and freight shipping fees."
    ],
    correctIndex: 2,
    explanationVi: "SGK Trang 12 nêu rõ: 'trong giá thành sản xuất một chiếc điện thoại thông minh thì giá trị nguyên vật liệu, nhân công chỉ chiếm chưa đến một nửa; phần còn lại là chi phí thiết kế, phần mềm và mua các bản quyền công nghệ - đó chính là giá trị của tri thức'.",
    explanationEn: "Page 12: 'Raw materials and manual labor make up less than half of a smartphone's production cost; the remainder consists of design, software, and intellectual property fees—which represent the value of knowledge.'"
  },
  {
    id: 6,
    questionVi: "Quan sát Hình 2.3 SGK (Trang 13), thiết bị nào sau đây là THIẾT BỊ THÔNG MINH? Tại sao?",
    questionEn: "Examining Figure 2.3 (Page 13), which of the following is a SMART DEVICE and why?",
    optionsVi: [
      "A. Cân điện tử, vì hiển thị số cân nặng bằng màn hình LCD.",
      "B. Máy tính cầm tay Casio, vì có thể tính toán căn bậc hai và lượng giác.",
      "C. Đồng hồ kết nối với điện thoại qua Bluetooth, vì có thể trao đổi dữ liệu và đồng bộ thông tin tự động.",
      "D. Cả ba thiết bị trong hình đều là thiết bị thông minh."
    ],
    optionsEn: [
      "A. The digital scale, because it displays weight figures on an LCD.",
      "B. The handheld calculator, because it can compute square roots and trigonometry.",
      "C. The smartwatch connected via Bluetooth, because it autonomously synchronizes and exchanges data.",
      "D. All three devices in the figure are smart devices."
    ],
    correctIndex: 2,
    explanationVi: "Cân điện tử và máy tính cầm tay không có khả năng kết nối mạng trao đổi dữ liệu tự động với thiết bị khác. Đồng hồ kết nối Bluetooth đồng bộ dữ liệu thông báo và cuộc gọi tự động nên là thiết bị thông minh.",
    explanationEn: "Digital scales and pocket calculators cannot communicate across wireless networks. The smartwatch synchronizes data automatically over Bluetooth, making it a smart device."
  },
  {
    id: 7,
    questionVi: "Đâu là ví dụ về thành tựu của Tin học trong việc THAY ĐỔI CÁCH THỨC LÀM VIỆC của xã hội?",
    questionEn: "Which of the following exemplifies Informatics CHANGING WORKING METHODS in society?",
    optionsVi: [
      "A. Chế bản điện tử trên máy tính thay thế cho công nghệ in ấn sắp chữ chì truyền thống.",
      "B. Việc học tập và làm việc trực tuyến từ xa qua mạng Internet.",
      "C. Ứng dụng tin học văn phòng giúp xử lý tài liệu hành chính nhanh gọn và khoa học.",
      "D. Tất cả các phương án trên đều đúng."
    ],
    optionsEn: [
      "A. Desktop publishing replacing traditional hot-lead typesetting in printing.",
      "B. Remote online learning and remote working via the Internet.",
      "C. Office software streamlining administrative documents efficiently.",
      "D. All of the above options are correct."
    ],
    correctIndex: 3,
    explanationVi: "SGK Trang 14 nêu rõ: Nhiều ngành nghề thay đổi hoàn toàn nhờ tin học (chế bản điện tử thay sắp chữ chì, chụp ảnh số thay chụp phim, dạy học & mua sắm trực tuyến, tin học văn phòng).",
    explanationEn: "Page 14 illustrates multiple industries radically transformed by informatics (desktop publishing, digital photography, e-learning, e-commerce, office suites)."
  },
  {
    id: 8,
    questionVi: "Ngôn ngữ lập trình bậc cao ĐẦU TIÊN được công bố chính thức vào năm 1957 có tên là gì?",
    questionEn: "What was the FIRST high-level programming language officially released in 1957?",
    optionsVi: [
      "A. Python",
      "B. FORTRAN",
      "C. Pascal",
      "D. Java"
    ],
    optionsEn: [
      "A. Python",
      "B. FORTRAN",
      "C. Pascal",
      "D. Java"
    ],
    correctIndex: 1,
    explanationVi: "SGK Trang 14 ghi nhận: 'FORTRAN là ngôn ngữ lập trình bậc cao đầu tiên được công bố chính thức vào năm 1957 và vẫn được dùng tới ngày nay cho những người lập trình khoa học kĩ thuật'.",
    explanationEn: "Page 14 states: 'FORTRAN was the first high-level programming language officially published in 1957 and remains in use today for scientific computing.'"
  },
  {
    id: 9,
    questionVi: "Mốc lịch sử ra đời của giao thức trao đổi dữ liệu toàn cầu TCP/IP trên Internet là vào năm nào?",
    questionEn: "In which year was the pivotal global TCP/IP communication protocol established for the Internet?",
    optionsVi: [
      "A. Năm 1957",
      "B. Năm 1964",
      "C. Năm 1983",
      "D. Năm 1992"
    ],
    optionsEn: [
      "A. Year 1957",
      "B. Year 1964",
      "C. Year 1983",
      "D. Year 1992"
    ],
    correctIndex: 2,
    explanationVi: "SGK Trang 14: 'Một thành tựu nổi bật là Internet cho phép kết nối toàn cầu nhờ thiết lập được các quy tắc trao đổi dữ liệu (được biết đến với tên gọi là giao thức TCP/IP) vào năm 1983'. (Năm 1992 là mốc ra đời WWW).",
    explanationEn: "Page 14: 'A milestone achievement was the Internet enabling global connection through standardized data exchange rules (TCP/IP) in 1983' (1992 marked the advent of WWW)."
  },
  {
    id: 10,
    questionVi: "Lợi ích lớn nhất của việc ứng dụng robot tự động hóa trong công nghiệp là gì?",
    questionEn: "What is the primary benefit of employing automated industrial robots?",
    optionsVi: [
      "A. Robot có thể làm việc liên tục, chính xác ở những môi trường nguy hiểm (nhà máy điện hạt nhân, dưới nước).",
      "B. Robot có thể tự sinh ra cảm xúc và viết thơ thay cho thi sĩ.",
      "C. Robot chỉ tốn điện chứ không giúp ích gì cho năng suất lao động.",
      "D. Robot thay thế toàn bộ con người và con người không cần học tập nữa."
    ],
    optionsEn: [
      "A. Robots work continuously and precisely in hazardous environments (nuclear plants, underwater).",
      "B. Robots develop human emotions and write poetry autonomously.",
      "C. Robots consume electricity without improving productivity.",
      "D. Robots eliminate the need for human education completely."
    ],
    correctIndex: 0,
    explanationVi: "SGK Trang 13 khẳng định: 'Robot là một ví dụ điển hình về thành công của tự động hoá. Không những hoạt động chính xác, thông minh, robot còn có thể làm việc ở những nơi có môi trường nguy hiểm như trong nhà máy điện hạt nhân hay dưới nước'.",
    explanationEn: "Page 13 highlights: 'Robots are prime examples of automation success. Beyond precision and intelligence, robots can operate in dangerous environments such as nuclear facilities or underwater.'"
  }
];
