import { TermDefinition } from './lessonData';
import { QuizQuestion } from './lesson2Data';

export const LESSON_7_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: 'Thuật ngữ PDA (viết tắt của Personal Digital Assistant) trong tiếng Việt có nghĩa là gì?',
    questionEn: 'What does the abbreviation PDA (Personal Digital Assistant) mean in Vietnamese?',
    optionsVi: [
      'A. Thiết bị chuyển đổi tín hiệu số',
      'B. Trợ thủ số cá nhân',
      'C. Mạng máy tính cục bộ không dây',
      'D. Bộ vi xử lý trung tâm cá nhân'
    ],
    optionsEn: [
      'A. Digital signal converter',
      'B. Personal Digital Assistant',
      'C. Wireless local area network',
      'D. Personal central processing unit'
    ],
    correctIndex: 1,
    explanationVi: 'Theo mục 1 Trang 33 SGK Tin học 10: "Trợ thủ số cá nhân (Personal Digital Assistant – PDA) là các thiết bị số trong đó tích hợp một số chức năng hữu ích cho người dùng trong đời sống hằng ngày."',
    explanationEn: 'According to Section 1, Page 33 of Textbook 10: "Personal Digital Assistant (PDA) refers to digital devices integrating multiple helpful everyday utilities for users."'
  },
  {
    id: 2,
    questionVi: 'Hai hệ điều hành phổ biến nhất đang vận hành phần lớn điện thoại thông minh và máy tính bảng hiện nay là gì?',
    questionEn: 'What are the two most prevalent operating systems powering modern smartphones and tablets?',
    optionsVi: [
      'A. Windows và macOS',
      'B. iOS của Apple và Android của Google',
      'C. Linux và Ubuntu',
      'D. MS-DOS và Symbian'
    ],
    optionsEn: [
      'A. Windows and macOS',
      'B. iOS by Apple and Android by Google',
      'C. Linux and Ubuntu',
      'D. MS-DOS and Symbian'
    ],
    correctIndex: 1,
    explanationVi: 'Theo Trang 34 SGK: "Phần lớn các PDA dạng điện thoại di động và máy tính bảng hiện nay đều chạy trên hai hệ điều hành phổ biến là iOS của hãng Apple và Android của hãng Google."',
    explanationEn: 'According to Page 34: "The majority of mobile PDA devices and tablets today run on two mainstream operating systems: Apple\'s iOS and Google\'s Android."'
  },
  {
    id: 3,
    questionVi: 'Theo câu hỏi củng cố mục 1 trang 34 SGK, kết nối nào sau đây KHÔNG PHẢI là kết nối phổ biến trên các PDA hiện nay?',
    questionEn: 'According to the reinforcement question on Page 34, which connection is NOT common on modern PDAs?',
    optionsVi: [
      'A. Wi-Fi',
      'B. Bluetooth',
      'C. Hồng ngoại (Infrared)',
      'D. USB'
    ],
    optionsEn: [
      'A. Wi-Fi',
      'B. Bluetooth',
      'C. Infrared',
      'D. USB'
    ],
    correctIndex: 2,
    explanationVi: 'Theo câu hỏi củng cố Trang 34 SGK: Các PDA hiện đại chủ yếu dùng kết nối không dây tầm xa (Wi-Fi), tầm ngắn (Bluetooth) và kết nối có dây (USB Type-C/Lightning); kết nối hồng ngoại là công nghệ cũ tốc độ thấp và rất hiếm khi được trang bị.',
    explanationEn: 'According to the Page 34 checkpoint: Modern PDAs rely heavily on Wi-Fi, Bluetooth, and USB ports; legacy optical infrared connections are virtually obsolete on modern devices.'
  },
  {
    id: 4,
    questionVi: 'Phía hai bên thân của điện thoại thông minh thường được trang bị các nút bấm vật lý nào?',
    questionEn: 'Which physical hardware buttons are typically placed along the sides of a smartphone chassis?',
    optionsVi: [
      'A. Nút chuột trái và chuột phải',
      'B. Nút khoá (nguồn) và các nút tăng/giảm âm lượng',
      'C. Nút in ảnh và nút xóa tệp',
      'D. Nút bàn phím số từ 0 đến 9'
    ],
    optionsEn: [
      'A. Left and right mouse buttons',
      'B. Power/Lock key and volume up/down buttons',
      'C. Print and delete buttons',
      'D. Numeric keypad keys 0 to 9'
    ],
    correctIndex: 1,
    explanationVi: 'Theo Nhiệm vụ 1 Trang 34 SGK (Hình 7.4): Phía hai bên thân máy thường có nút khoá (dùng để bật máy hoặc tắt/bật màn hình) và nút tăng/giảm âm lượng (một số máy có thêm cần gạt bật/tắt âm thanh).',
    explanationEn: 'According to Task 1 on Page 34 (Figure 7.4): Along the device frame reside the Lock/Power button (to boot or toggle screen display) and volume control rockers.'
  },
  {
    id: 5,
    questionVi: 'Khu vực nào trên màn hình điện thoại thông minh hiển thị tình trạng kết nối sóng mạng, thời gian hiện tại và tỉ lệ % pin còn lại?',
    questionEn: 'Which area at the top of a smartphone display indicates network signal, current time, and remaining battery percentage?',
    optionsVi: [
      'A. Thanh điều hướng (Navigation bar)',
      'B. Thanh truy cập nhanh (Dock)',
      'C. Thanh trạng thái (Status bar)',
      'D. Thư mục gốc bộ nhớ trong'
    ],
    optionsEn: [
      'A. Navigation bar',
      'B. Quick access dock',
      'C. Status bar',
      'D. Root internal storage folder'
    ],
    correctIndex: 2,
    explanationVi: 'Theo Nhiệm vụ 2 Trang 35 SGK (Hình 7.5): Thanh trạng thái (Status bar) ở cạnh trên màn hình hiển thị tình trạng kết nối sóng, Wi-Fi, thời gian hiện tại, tỉ lệ % pin còn lại, các thông báo ứng dụng,...',
    explanationEn: 'According to Task 2 on Page 35 (Figure 7.5): The Status bar at the top edge shows signal reception, Wi-Fi, current clock time, battery level percentage, and system alerts.'
  },
  {
    id: 6,
    questionVi: 'Trên các thiết bị Android, thanh điều hướng (navigation bar) ở cuối màn hình thường có các nút cảm ứng quan trọng nào?',
    questionEn: 'On Android smartphones, what primary virtual keys are hosted on the bottom navigation bar?',
    optionsVi: [
      'A. Nút In (Print), Nút Quét (Scan), Nút Lưu (Save)',
      'B. Nút Quay lại (Back), Nút Home (Màn hình chính) và Nút Tổng quan (Overview)',
      'C. Nút Tắt nguồn, Nút Chụp ảnh và Nút Quay phim',
      'D. Nút Bật đèn flash, Nút Khởi động lại và Nút Cài đặt'
    ],
    optionsEn: [
      'A. Print, Scan, and Save keys',
      'B. Back key, Home key, and Overview key',
      'C. Power off, Camera shutter, and Camcorder keys',
      'D. Flashlight, Reboot, and Settings keys'
    ],
    correctIndex: 1,
    explanationVi: 'Theo Trang 35 SGK (Hình 7.5): Thanh điều hướng ảo ở dưới màn hình gồm nút Home (về màn hình chính), nút Quay lại (Back) và nút Tổng quan (Overview - hiển thị danh sách các ứng dụng đang chạy đa nhiệm).',
    explanationEn: 'According to Page 35 (Figure 7.5): The virtual navigation bar consists of the Home key, the Back key, and the Overview key (multitasking application switcher).'
  },
  {
    id: 7,
    questionVi: 'Khi chụp ảnh bằng camera trên điện thoại thông minh, các tệp ảnh thường được hệ thống tự động lưu vào thư mục nào?',
    questionEn: 'When capturing photos using a smartphone camera, which storage directory holds the images by default?',
    optionsVi: [
      'A. Thư mục C:\\Windows\\System32',
      'B. Thư mục DCIM/Camera trong bộ nhớ trong',
      'C. Thư mục Download/Music',
      'D. Thư mục Documents/Word'
    ],
    optionsEn: [
      'A. C:\\Windows\\System32 directory',
      'B. DCIM/Camera directory in internal storage',
      'C. Download/Music directory',
      'D. Documents/Word directory'
    ],
    correctIndex: 1,
    explanationVi: 'Theo Hình 7.7 Trang 36 SGK: Trong bộ nhớ trong của điện thoại, ảnh chụp từ camera được lưu trữ theo quy chuẩn quốc tế trong thư mục "DCIM" (Digital Camera Images) -> thư mục con "Camera".',
    explanationEn: 'According to Figure 7.7 on Page 36: Device camera snapshots are systematically stored in the "DCIM" (Digital Camera Images) -> "Camera" subfolder.'
  },
  {
    id: 8,
    questionVi: 'Để xuất hiện thanh công cụ cho phép Di chuyển, Sao chép, Chia sẻ hoặc Xoá tệp trên điện thoại thông minh (Hình 7.8 SGK), người dùng cần thao tác như thế nào?',
    questionEn: 'How does a user trigger the contextual action toolbar (Move, Copy, Share, Delete) in a smartphone file manager (Figure 7.8)?',
    optionsVi: [
      'A. Nhấp đúp chuột thật nhanh 5 lần',
      'B. Chạm và giữ lâu một chút vào biểu tượng thư mục hoặc tệp (Long press)',
      'C. Lắc mạnh điện thoại 3 lần',
      'D. Tắt nguồn điện thoại rồi bật lại'
    ],
    optionsEn: [
      'A. Double-click rapidly 5 times',
      'B. Tap and hold the folder or file icon for a moment (Long press)',
      'C. Shake the smartphone 3 times',
      'D. Restart the smartphone power'
    ],
    correctIndex: 1,
    explanationVi: 'Theo Trang 37 SGK (Hình 7.8): "Nếu chọn thư mục hay tệp bằng cách chạm và giữ lâu một chút, sẽ xuất hiện các nút điều khiển để ta có thể di chuyển, sao chép, chia sẻ hoặc xoá thư mục hay tệp."',
    explanationEn: 'According to Page 37 (Figure 7.8): Long-pressing (touching and holding) a folder or file selects it and presents action icons: Move, Copy, Share, and Delete.'
  },
  {
    id: 9,
    questionVi: 'Theo bài Luyện tập 1 trang 37 SGK, điểm khác biệt then chốt giữa điện thoại thông minh (smartphone) và điện thoại di động thường là gì?',
    questionEn: 'According to Practice Task 1 on Page 37, what is the crucial distinction between a smartphone and a basic mobile phone?',
    optionsVi: [
      'A. Điện thoại thông minh có danh bạ liên hệ',
      'B. Điện thoại thông minh có thể gửi và nhận tin nhắn SMS',
      'C. Điện thoại thông minh có hệ điều hành và có thể cài đặt thêm các ứng dụng phần mềm đa dạng',
      'D. Điện thoại thông minh dùng pin sạc'
    ],
    optionsEn: [
      'A. Smartphones possess a contact book',
      'B. Smartphones can send SMS text messages',
      'C. Smartphones feature full operating systems capable of downloading and executing rich third-party applications',
      'D. Smartphones use rechargeable batteries'
    ],
    correctIndex: 2,
    explanationVi: 'Theo bài Luyện tập 1 Trang 37 SGK (Đáp án D): Điện thoại thường chỉ thực hiện các chức năng cố định do nhà sản xuất nạp sẵn. Điện thoại thông minh có hệ điều hành hoàn chỉnh (iOS, Android) và cho phép cài đặt thêm hàng triệu ứng dụng từ kho phần mềm.',
    explanationEn: 'According to Practice Task 1 on Page 37 (Option D): Basic feature phones only execute pre-flashed firmware routines. Smartphones feature robust operating systems and rich app ecosystems.'
  },
  {
    id: 10,
    questionVi: 'Dịch vụ nào sau đây là dịch vụ lưu trữ đám mây trực tuyến phổ biến giúp sao lưu và truy cập dữ liệu từ điện thoại thông minh trên máy tính?',
    questionEn: 'Which of the following represents a widespread cloud storage service enabling cross-device synchronization between smartphones and PCs?',
    optionsVi: [
      'A. Microsoft Word 2003',
      'B. Google Drive và Microsoft OneDrive',
      'C. Phần mềm Paint trên Windows',
      'D. Ứng dụng Bấm giờ trên điện thoại'
    ],
    optionsEn: [
      'A. Microsoft Word 2003',
      'B. Google Drive and Microsoft OneDrive',
      'C. Windows Paint application',
      'D. Smartphone Stopwatch utility'
    ],
    correctIndex: 1,
    explanationVi: 'Theo Trang 36 SGK và bài Vận dụng 2 Trang 37: Google Drive và OneDrive là các dịch vụ lưu trữ đám mây trực tuyến, giúp sao lưu ảnh, tài liệu từ điện thoại và đồng bộ sang máy tính mọi lúc mọi nơi.',
    explanationEn: 'According to Page 36 and Application Task 2 on Page 37: Cloud storage services like Google Drive and Microsoft OneDrive provide synchronized off-site storage accessible across mobile devices and computers.'
  }
];

export const LESSON_7_GLOSSARY: TermDefinition[] = [
  {
    id: 'pda',
    termVi: 'Trợ thủ số cá nhân (PDA)',
    termEn: 'Personal Digital Assistant (PDA)',
    ipa: '/ˈpɜːrsənl ˈdɪdʒɪtl əˈsɪstənt/',
    definitionVi: 'Thiết bị số tích hợp nhiều chức năng và ứng dụng hữu ích trong đời sống, có đặc điểm nhỏ gọn và khả năng kết nối mạng.',
    definitionEn: 'A compact digital device integrating personal utility applications with wireless networking capabilities.',
    exampleVi: 'Điện thoại thông minh và máy tính bảng hiện đại là những dạng PDA phổ biến nhất.',
    exampleEn: 'Modern smartphones and tablets are the most prominent manifestations of PDAs.',
    sgkContext: 'Mục 1 – Trang 33, 34 SGK Tin học 10'
  },
  {
    id: 'smartphone',
    termVi: 'Điện thoại thông minh',
    termEn: 'Smartphone',
    ipa: '/ˈsmɑːrtfoʊn/',
    definitionVi: 'Điện thoại di động chạy hệ điều hành tiên tiến, tích hợp màn hình cảm ứng, máy ảnh kỹ thuật số và khả năng cài đặt ứng dụng phong phú.',
    definitionEn: 'A mobile phone featuring an advanced operating system, multi-touch display, digital camera, and application store integration.',
    exampleVi: 'Học sinh sử dụng điện thoại thông minh để tra cứu tài liệu học tập và học trực tuyến.',
    exampleEn: 'Students utilize smartphones to look up learning materials and attend online classes.',
    sgkContext: 'Hình 7.3, 7.4 – Trang 34 SGK Tin học 10'
  },
  {
    id: 'tablet',
    termVi: 'Máy tính bảng',
    termEn: 'Tablet Computer',
    ipa: '/ˈtæblət kəmˈpjuːtər/',
    definitionVi: 'Thiết bị máy tính cá nhân dạng bảng phẳng với màn hình cảm ứng từ 7 đến 12 inch, lớn hơn smartphone và không có bàn phím cơ gắn liền.',
    definitionEn: 'A wireless touch-screen personal computer larger than a smartphone, without a permanently attached physical keyboard.',
    exampleVi: 'Máy tính bảng iPad hoặc máy tính bảng Android rất thích hợp để đọc sách điện tử (E-book).',
    exampleEn: 'iPad and Android tablets are well-suited for interactive e-textbook reading.',
    sgkContext: 'Hình 7.1, 7.3 – Trang 33, 34 SGK Tin học 10'
  },
  {
    id: 'mobile-os',
    termVi: 'Hệ điều hành di động',
    termEn: 'Mobile Operating System',
    ipa: '/ˈmoʊbl ˌɑːpəreɪtɪŋ ˈsɪstəm/',
    definitionVi: 'Phần mềm nền tảng điều khiển phần cứng của thiết bị di động và cung cấp môi trường chạy các ứng dụng (tiêu biểu là iOS và Android).',
    definitionEn: 'System software managing mobile hardware resources and providing runtime environments for mobile apps (e.g., iOS and Android).',
    exampleVi: 'iOS là hệ điều hành độc quyền của Apple, còn Android là hệ điều hành mã nguồn mở của Google.',
    exampleEn: 'iOS is Apple’s proprietary mobile OS, whereas Android is an open-source platform led by Google.',
    sgkContext: 'Mục 1 – Trang 34 SGK Tin học 10'
  },
  {
    id: 'status-bar',
    termVi: 'Thanh trạng thái',
    termEn: 'Status Bar',
    ipa: '/ˈsteɪtəs bɑːr/',
    definitionVi: 'Thanh dải nằm ở mép trên cùng của màn hình hiển thị giờ, trạng thái sóng mạng, Wi-Fi, pin và biểu tượng thông báo.',
    definitionEn: 'A thin strip at the top of a mobile screen showing clock time, network strength, battery percentage, and notification alerts.',
    exampleVi: 'Thanh trạng thái báo pin còn 15% nhắc nhở người dùng cần sạc điện thoại.',
    exampleEn: 'The status bar indicates 15% battery remaining, prompting the user to charge.',
    sgkContext: 'Nhiệm vụ 2 – Trang 35 SGK Tin học 10'
  },
  {
    id: 'navigation-bar',
    termVi: 'Thanh điều hướng',
    termEn: 'Navigation Bar',
    ipa: '/ˌnævɪˈɡeɪʃn bɑːr/',
    definitionVi: 'Thanh dải ở đáy màn hình gồm các nút ảo: Quay lại (Back), Màn hình chính (Home) và Đa nhiệm tổng quan (Overview).',
    definitionEn: 'A bar located at the bottom of the screen hosting essential controls: Back, Home, and Multitasking Overview.',
    exampleVi: 'Bấm nút Home để thoát nhanh về màn hình chính; bấm nút Overview để chuyển sang ứng dụng khác.',
    exampleEn: 'Tap Home to return to the launcher; tap Overview to switch among running apps.',
    sgkContext: 'Nhiệm vụ 2 – Trang 35 SGK Tin học 10'
  },
  {
    id: 'quick-access-dock',
    termVi: 'Thanh truy cập nhanh (Dock)',
    termEn: 'Quick Access Dock',
    ipa: '/kwɪk ˈæksɛs dɑːk/',
    definitionVi: 'Hàng biểu tượng cố định ở dưới cùng màn hình chính chứa các ứng dụng thiết yếu (gọi điện, tin nhắn, danh bạ) xuất hiện ở mọi trang màn hình.',
    definitionEn: 'A fixed row of favorite app icons at the bottom of the home screen persisting across multiple screen pages.',
    exampleVi: 'Biểu tượng ứng dụng Điện thoại và Tin nhắn luôn nằm trên thanh truy cập nhanh.',
    exampleEn: 'The Phone and Messages icons reside permanently on the quick access dock.',
    sgkContext: 'Nhiệm vụ 2 – Trang 35 SGK Tin học 10'
  },
  {
    id: 'file-manager',
    termVi: 'Trình quản lý tệp',
    termEn: 'File Manager',
    ipa: '/faɪl ˈmænɪdʒər/',
    definitionVi: 'Ứng dụng cho phép duyệt, sắp xếp, đổi tên, sao chép, di chuyển và xoá các tệp tin cũng như thư mục theo cấu trúc cây phân cấp.',
    definitionEn: 'An application providing a user interface to browse, organize, copy, move, and delete files within a hierarchical file system.',
    exampleVi: 'Học sinh mở ứng dụng "Files" hoặc "Quản lý tệp" để tìm ảnh chụp lưu trong thư mục DCIM.',
    exampleEn: 'Students launch the Files app to browse snapshots stored in the DCIM directory.',
    sgkContext: 'Nhiệm vụ 4 – Trang 36, 37 SGK Tin học 10'
  },
  {
    id: 'cloud-storage',
    termVi: 'Lưu trữ đám mây',
    termEn: 'Cloud Storage',
    ipa: '/klaʊd ˈstɔːrɪdʒ/',
    definitionVi: 'Mô hình lưu trữ dữ liệu trên các máy chủ từ xa qua mạng Internet, cho phép sao lưu và đồng bộ dữ liệu giữa smartphone, tablet và máy tính.',
    definitionEn: 'A model of computer data storage where digital data is stored on remote servers maintained by cloud providers and synchronized over the Internet.',
    exampleVi: 'Tải ảnh lên Google Drive giúp bảo vệ ảnh an toàn kể cả khi điện thoại bị mất hoặc hỏng.',
    exampleEn: 'Uploading photos to Google Drive safeguards memories even if a phone is lost or damaged.',
    sgkContext: 'Nhiệm vụ 4 & Vận dụng 2 – Trang 36, 37 SGK Tin học 10'
  },
  {
    id: 'online-learning-app',
    termVi: 'Ứng dụng học tập trực tuyến',
    termEn: 'Online Learning Platform',
    ipa: '/ˈɑːnlaɪn ˈlɜːrnɪŋ ˈplætfɔːrm/',
    definitionVi: 'Phần mềm hỗ trợ tổ chức lớp học ảo, truyền phát âm thanh/hình ảnh video trực tiếp và chia sẻ bài giảng từ xa (như Zoom, Google Meet, MS Teams).',
    definitionEn: 'Software facilitating virtual classrooms with real-time video conferencing, screen sharing, and remote pedagogical collaboration.',
    exampleVi: 'Giáo viên gửi đường link Google Meet để cả lớp tham gia thảo luận bài thực hành tin học.',
    exampleEn: 'Teachers provide Google Meet links for classroom informatics practical sessions.',
    sgkContext: 'Nhiệm vụ 3 & Vận dụng 3 – Trang 36, 37 SGK Tin học 10'
  }
];
