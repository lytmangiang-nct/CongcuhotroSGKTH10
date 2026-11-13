import { QuizQuestion } from './lesson2Data';
import { TermDefinition } from './lessonData';

export const LESSON_34_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: 'Theo SGK Tin học 10, phát biểu nào sau đây là ĐÚNG NHẤT về phát triển phần mềm?',
    questionEn: 'According to Informatics 10 textbook, which statement is MOST ACCURATE regarding software development?',
    optionsVi: [
      'Phát triển phần mềm đơn thuần chỉ là việc viết code bằng một ngôn ngữ lập trình',
      'Phát triển phần mềm là quá trình gồm nhiều công việc và hoạt động, có tính chu trình lặp đi lặp lại',
      'Phát triển phần mềm chỉ bao gồm khâu cài đặt và bàn giao sản phẩm cho người dùng',
      'Phát triển phần mềm chỉ là hoạt động quản trị dự án của giám đốc công ty'
    ],
    optionsEn: [
      'Software development is merely writing code in a programming language',
      'Software development is a multi-stage process comprising diverse activities that can iterate cyclically',
      'Software development only entails software installation and client delivery',
      'Software development is solely the project management function of an executive'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 160 và 161 (Câu hỏi củng cố Mục 1) khẳng định: Phát triển phần mềm là một quá trình tổng thể gồm nhiều công đoạn (điều tra, phân tích, thiết kế, lập trình, kiểm thử, chuyển giao, bảo trì) và có tính chu trình lặp lại qua các phiên bản cập nhật, nâng cấp.',
    explanationEn: 'Textbook pages 160–161 state that software development is a comprehensive iterative lifecycle encompassing requirement surveying, analysis, design, coding, testing, deployment, and ongoing maintenance.'
  },
  {
    id: 2,
    questionVi: 'Quy trình sản xuất phần mềm cơ bản (SDLC) theo SGK Trang 160 gồm mấy công đoạn chính?',
    questionEn: 'How many core sequential stages comprise the fundamental software development lifecycle according to page 160?',
    optionsVi: [
      '3 công đoạn: Lập trình, Chạy thử và Bàn giao',
      '5 công đoạn: Ý tưởng, Viết code, Bán hàng, Sửa lỗi và Nâng cấp',
      '7 công đoạn: Điều tra khảo sát, Phân tích hệ thống, Thiết kế hệ thống, Lập trình, Kiểm thử, Chuyển giao và Bảo trì',
      '2 công đoạn: Thiết kế giao diện và Lập trình cơ sở dữ liệu'
    ],
    optionsEn: [
      '3 stages: Coding, Trial run, and Handover',
      '5 stages: Ideation, Coding, Sales, Bug fixing, and Upgrading',
      '7 stages: Requirement surveying, Systems analysis, Systems design, Coding, Testing, Handover/Deployment, and Maintenance',
      '2 stages: UI design and Database programming'
    ],
    correctIndex: 2,
    explanationVi: 'Hình lục giác tại Trang 160 SGK minh họa chuẩn xác 7 công đoạn: 1. Điều tra khảo sát; 2. Phân tích hệ thống; 3. Thiết kế hệ thống; 4. Lập trình; 5. Kiểm thử; 6. Chuyển giao; 7. Bảo trì.',
    explanationEn: 'The 7-stage diagram on textbook page 160 delineates: 1. Requirement surveying; 2. Systems analysis; 3. Systems design; 4. Implementation/Coding; 5. Testing; 6. Deployment; 7. Maintenance.'
  },
  {
    id: 3,
    questionVi: 'Hoạt động nào có tính chất bao trùm lên toàn bộ các công việc cơ bản của sản xuất phần mềm?',
    questionEn: 'Which overarching activity encompasses and governs all foundational software production stages?',
    optionsVi: [
      'Quản trị dự án phần mềm (Project Management)',
      'Viết tài liệu hướng dẫn sử dụng',
      'Cài đặt hệ điều hành cho máy chủ',
      'Mua sắm bàn ghế cho văn phòng công ty'
    ],
    optionsEn: [
      'Software Project Management',
      'Writing end-user user manuals',
      'Installing operating systems on servers',
      'Purchasing office furniture'
    ],
    correctIndex: 0,
    explanationVi: 'SGK Trang 161 nêu rõ: "Hoạt động có tính bao trùm lên toàn bộ các công việc cơ bản của sản xuất phần mềm là quản trị dự án phần mềm, bao gồm lập kế hoạch, điều phối nhân sự, tài chính, phương tiện, kiểm soát chất lượng, để đảm bảo thành công của dự án."',
    explanationEn: 'Textbook page 161 states: "The overarching activity spanning all software production tasks is project management, covering scheduling, human resources, budget allocation, tools, and quality assurance."'
  },
  {
    id: 4,
    questionVi: 'Trong xây dựng phần mềm, sự khác biệt giữa "Kĩ sư phần mềm" và "Lập trình viên" được SGK ví tương tự như mối quan hệ giữa ai với ai?',
    questionEn: 'In software engineering, the distinction between a Software Engineer and a Programmer is likened to which relationship in construction?',
    optionsVi: [
      'Giữa Bác sĩ và Dược sĩ',
      'Giữa Kiến trúc sư và Thợ xây',
      'Giữa Đạo diễn và Diễn viên',
      'Giữa Phi công và Tiếp viên hàng không'
    ],
    optionsEn: [
      'Between a Doctor and a Pharmacist',
      'Between an Architect and a Builder/Mason',
      'Between a Film Director and an Actor',
      'Between a Pilot and a Flight Attendant'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 162 viết: "Sự khác biệt giữa kĩ sư phần mềm và lập trình viên tương tự như giữa kiến trúc sư và thợ xây trong xây dựng công trình. Kĩ sư phần mềm thiết lập kiến trúc, thành phần và giải pháp, còn lập trình viên hiện thực hoá thành các đoạn mã lệnh."',
    explanationEn: 'Textbook page 162 emphasizes: "The distinction between software engineers and programmers resembles that between architects and builders in construction. The engineer blueprints architecture, while programmers implement the code."'
  },
  {
    id: 5,
    questionVi: 'Công việc nào sau đây thuộc về công đoạn "Kiểm thử" (Testing) trong phát triển phần mềm?',
    questionEn: 'Which of the following responsibilities falls under the Testing stage in software development?',
    optionsVi: [
      'Tiếp xúc với khách hàng để ký hợp đồng tài chính',
      'Phát hiện để loại bỏ các lỗi cũng như các bất hợp lí trong sử dụng chương trình; kiểm tra kết quả thực hiện theo đúng chức năng đã thiết kế',
      'Tạo cơ sở dữ liệu và viết câu lệnh SQL',
      'Đóng gói đĩa cài đặt và giao cho khách hàng'
    ],
    optionsEn: [
      'Meeting clients to sign commercial financial contracts',
      'Detecting and removing bugs and usability flaws; verifying that execution results strictly match designed functional specifications',
      'Creating database schemas and authoring SQL statements',
      'Packaging installation media and delivering to customers'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 160 định nghĩa: "Kiểm thử: Phát hiện để loại bỏ các lỗi cũng như các bất hợp lí trong sử dụng chương trình nếu có; kiểm tra kết quả thực hiện theo chức năng đã thiết kế,..."',
    explanationEn: 'Textbook page 160 defines testing as identifying and eliminating software bugs and usability defects, ensuring execution aligns precisely with design blueprints.'
  },
  {
    id: 6,
    questionVi: 'Theo SGK Trang 162, người làm công tác "Phân tích và thiết kế hệ thống" cần có tố chất nổi bật nào?',
    questionEn: 'According to page 162, what prominent quality is vital for Systems Analysis and Design professionals?',
    optionsVi: [
      'Chỉ cần gõ bàn phím tốc độ thật nhanh',
      'Khả năng học hỏi, nắm bắt sâu sắc nghiệp vụ của lĩnh vực ứng dụng, tư duy logic và kiến thức thuật toán tốt',
      'Biết sửa chữa phần cứng và thay thế chip máy tính',
      'Có giọng nói truyền cảm trên truyền hình'
    ],
    optionsEn: [
      'Only typing at extremely high speeds',
      'Ability to rapidly learn and grasp domain business logic, strong logical thinking, and deep algorithmic foundations',
      'Hardware repair and microchip replacement',
      'Charismatic television broadcasting voice'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 162 nhấn mạnh: Người phân tích và thiết kế phần mềm không chỉ biết giải pháp tin học mà còn phải có khả năng tìm hiểu nghiệp vụ chuyên sâu. Ví dụ viết phần mềm kế toán thì chuyên viên phân tích phải hiểu nghiệp vụ như một kế toán giỏi.',
    explanationEn: 'Textbook page 162 notes system analysts must comprehend domain business rules deeply (e.g., understanding finance like an accountant when designing accounting systems).'
  },
  {
    id: 7,
    questionVi: 'Lĩnh vực nghề nghiệp nào dưới đây KHÔNG PHẢI là một chuyên ngành phát triển phần mềm được nêu trong SGK Trang 163?',
    questionEn: 'Which of the following is NOT one of the software development career specializations enumerated on page 163?',
    optionsVi: [
      'Lập trình ứng dụng web, phần mềm hệ thống và cơ sở dữ liệu',
      'Lập trình trí tuệ nhân tạo (AI) và máy học (Machine Learning)',
      'Phát triển games và ứng dụng di động',
      'Lắp ráp linh kiện máy in công nghiệp và bảo trì đường dây điện cao thế'
    ],
    optionsEn: [
      'Web application development, system software, and databases',
      'Artificial Intelligence (AI) and Machine Learning programming',
      'Game development and mobile application engineering',
      'Industrial printer mechanical assembly and high-voltage powerline maintenance'
    ],
    correctIndex: 3,
    explanationVi: 'SGK Trang 163 liệt kê 6 lĩnh vực phần mềm: Lập trình ứng dụng, Phát triển giao diện người dùng (UI), Ứng dụng web/hệ thống/dữ liệu, Lập trình trí tuệ nhân tạo/máy học, Phát triển games, Phát triển ứng dụng di động. Lắp ráp máy in và điện cao thế thuộc ngành kỹ thuật cơ điện.',
    explanationEn: 'Textbook page 163 lists 6 software branches: Application dev, UI dev, Web/systems/databases, AI & Machine learning, Game development, and Mobile app development.'
  },
  {
    id: 8,
    questionVi: 'Các nền tảng tuyển dụng trực tuyến chuyên ngành CNTT phổ biến được SGK Trang 164 gợi ý bao gồm:',
    questionEn: 'Which IT recruitment portals are specifically highlighted on textbook page 164?',
    optionsVi: [
      'TopDev, Vietnamworks, LinkedIn',
      'Tiktok, Instagram, Zalo',
      'Shopee, Lazada, Tiki',
      'Youtube, Netflix, Spotify'
    ],
    optionsEn: [
      'TopDev, Vietnamworks, LinkedIn',
      'Tiktok, Instagram, Zalo',
      'Shopee, Lazada, Tiki',
      'Youtube, Netflix, Spotify'
    ],
    correctIndex: 0,
    explanationVi: 'SGK Trang 164 nêu rõ: "Người muốn tham gia phát triển phần mềm có thể tìm kiếm cơ hội... thông qua các trang thông tin tuyển dụng trực tuyến của các doanh nghiệp, hay các chuyên trang về tuyển dụng như TopDev, Vietnamworks, LinkedIn."',
    explanationEn: 'Textbook page 164 explicitly mentions digital career networks including TopDev, Vietnamworks, and LinkedIn.'
  },
  {
    id: 9,
    questionVi: 'Câu 2 phần Luyện tập SGK Trang 164: "Để theo học ngành phát triển phần mềm, học sinh THPT cần chuẩn bị tốt những môn học nào?"',
    questionEn: 'Practice Question 2 on page 164: "Which high school subjects best prepare students to pursue software development?"',
    optionsVi: [
      'Chỉ cần học môn Thể dục và Giáo dục quốc phòng',
      'Toán học (tư duy logic, giải thuật), Tin học (kĩ năng lập trình, sử dụng máy tính) và Ngoại ngữ/Tiếng Anh (tra cứu tài liệu quốc tế)',
      'Chỉ cần học môn Lịch sử và Địa lí',
      'Không cần học môn nào, chỉ cần chơi game giỏi'
    ],
    optionsEn: [
      'Only Physical Education and National Defense',
      'Mathematics (logical rigor & algorithms), Informatics (coding & digital mastery), and Foreign Language/English (global technical literature)',
      'Only History and Geography',
      'No preparation needed other than playing games'
    ],
    correctIndex: 1,
    explanationVi: 'Để phát triển phần mềm, Toán học rèn luyện tư duy logic giải thuật; Tin học rèn luyện kỹ năng thực hành máy tính; Tiếng Anh là chìa khóa đọc hiểu tài liệu công nghệ và giao tiếp quốc tế.',
    explanationEn: 'Software engineering requires Mathematics for logical algorithms, Informatics for programming competence, and English for international technical documentation.'
  },
  {
    id: 10,
    questionVi: 'Tại sao công đoạn "Bảo trì phần mềm" (Maintenance) có thể được coi là khởi đầu của một vòng phát triển mới?',
    questionEn: 'Why can software maintenance be viewed as the commencement of a new development cycle?',
    optionsVi: [
      'Vì khi bảo trì, lập trình viên sẽ xóa toàn bộ mã nguồn cũ đi viết lại từ đầu',
      'Vì bảo trì không chỉ sửa lỗi mà còn tiếp nhận yêu cầu mới, phân tích, thiết kế lại tính năng và kiểm thử nâng cấp phần mềm',
      'Vì công đoạn bảo trì chỉ dành cho nhân viên kinh doanh làm việc',
      'Vì phần mềm không bao giờ cần cập nhật sau khi đã xuất xưởng'
    ],
    optionsEn: [
      'Because during maintenance developers discard all existing code to start over',
      'Because maintenance addresses bug fixes, user feedback, new feature analysis, redesign, coding, and regression testing',
      'Because maintenance is handled solely by sales representatives',
      'Because software never requires updates once released'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 161 giải thích: Bảo trì nhằm khắc phục lỗi, nâng cấp cả về tính năng và giao diện. Khi phát sinh tính năng mới, nhóm phát triển lại phải khảo sát, phân tích, thiết kế, lập trình và kiểm thử từ đầu.',
    explanationEn: 'Textbook page 161 explains that maintenance encompasses resolving defects and evolving features/interfaces, effectively initiating a new iteration across the entire SDLC.'
  }
];

export const LESSON_34_GLOSSARY: TermDefinition[] = [
  {
    id: 'software-development',
    termVi: 'Phát triển phần mềm (Software Development)',
    termEn: 'Software Development',
    ipa: '/ˈsɒft.weər dɪˈvel.əp.mənt/',
    definitionVi: 'Toàn bộ quá trình từ tiếp nhận yêu cầu, phân tích, thiết kế kiến trúc, lập trình viết mã, kiểm thử chất lượng, cài đặt chuyển giao cho đến bảo trì và quản trị dự án phần mềm ứng dụng.',
    definitionEn: 'The end-to-end engineering discipline encompassing requirement gathering, analysis, architectural design, coding, quality assurance testing, deployment, maintenance, and project governance.',
    exampleVi: 'Xây dựng ứng dụng ngân hàng số, hệ thống quản lý bệnh viện hay mạng xã hội.',
    exampleEn: 'Building mobile banking apps, hospital management systems, or social platforms.',
    sgkContext: 'SGK Trang 160 – Mục 1'
  },
  {
    id: 'sdlc-stages',
    termVi: 'Vòng đời phát triển phần mềm (SDLC - 7 Công đoạn)',
    termEn: 'Software Development Life Cycle (SDLC)',
    ipa: '/ˈsɒft.weər dɪˈvel.əp.mənt laɪf ˈsaɪ.kəl/',
    definitionVi: 'Chu trình sản xuất phần mềm chuẩn mực gồm 7 công đoạn nối tiếp: (1) Điều tra khảo sát, (2) Phân tích hệ thống, (3) Thiết kế hệ thống, (4) Lập trình, (5) Kiểm thử, (6) Chuyển giao và (7) Bảo trì.',
    definitionEn: 'The structured 7-stage production lifecycle: (1) Survey & Requirements, (2) Systems Analysis, (3) Systems Design, (4) Coding, (5) Testing, (6) Handover/Deployment, and (7) Maintenance.',
    exampleVi: 'Mô hình thác nước (Waterfall) hoặc mô hình linh hoạt (Agile/Scrum).',
    exampleEn: 'Waterfall methodology or iterative Agile/Scrum sprints.',
    sgkContext: 'SGK Trang 160 – Hình minh hoạ SDLC'
  },
  {
    id: 'software-engineer',
    termVi: 'Kĩ sư phần mềm (Software Engineer / Architect)',
    termEn: 'Software Engineer / Architect',
    ipa: '/ˈsɒft.weər ˌen.dʒɪˈnɪər/',
    definitionVi: 'Người tổ chức sản xuất phần mềm, giữ vai trò như "kiến trúc sư trưởng", phụ trách phân tích nghiệp vụ, thiết lập kiến trúc hệ thống, lựa chọn công nghệ, tổ chức cấu trúc dữ liệu và định ra giải thuật tối ưu.',
    definitionEn: 'The technical leader who designs software architecture, determines functional modules, selects technology stacks, models data schemas, and formulates high-level algorithms.',
    exampleVi: 'Kĩ sư phần mềm thiết kế sơ đồ vi dịch vụ (Microservices) cho hệ thống thương mại điện tử.',
    exampleEn: 'A software architect designing microservice topologies for e-commerce platforms.',
    sgkContext: 'SGK Trang 162 – Mục 2'
  },
  {
    id: 'programmer-coder',
    termVi: 'Lập trình viên (Programmer / Software Developer)',
    termEn: 'Programmer / Software Developer',
    ipa: '/ˈprəʊ.ɡræm.ər/',
    definitionVi: 'Người trực tiếp sử dụng ngôn ngữ lập trình (như Python, Java, C++, TypeScript) để biến bản vẽ thiết kế thành các đoạn mã lệnh chạy được trên máy tính, xây dựng cơ sở dữ liệu và xử lý logic chức năng.',
    definitionEn: 'The technical specialist writing executable code in languages such as Python, Java, C++, or TypeScript to bring system blueprints and database logic to fruition.',
    exampleVi: 'Lập trình viên viết mã kiểm tra tài khoản đăng nhập và tính tiền giỏ hàng.',
    exampleEn: 'A developer implementing authentication endpoints and cart calculation logic.',
    sgkContext: 'SGK Trang 161 – 162 – Mục 2'
  },
  {
    id: 'project-manager',
    termVi: 'Người quản trị dự án phần mềm (Project Manager - PM)',
    termEn: 'Software Project Manager (PM)',
    ipa: '/ˈprɒdʒ.ekt ˈmæn.ɪ.dʒər/',
    definitionVi: 'Người chịu trách nhiệm xuyên suốt sự thành công của dự án phần mềm; có tầm nhìn công nghệ, lập kế hoạch tiến độ, điều phối nhân lực và tài chính, giám sát chất lượng và kiểm soát rủi ro.',
    definitionEn: 'The executive responsible for overall project delivery, managing milestones, cross-functional engineering teams, budget allocation, quality benchmarks, and stakeholder communication.',
    exampleVi: 'PM điều phối đội ngũ 15 kĩ sư hoàn thành ứng dụng giao đồ ăn đúng thời hạn 6 tháng.',
    exampleEn: 'A PM guiding a 15-engineer squad to ship a food delivery platform in 6 months.',
    sgkContext: 'SGK Trang 161 – 162 – Mục 2'
  },
  {
    id: 'software-testing-qa',
    termVi: 'Kiểm thử phần mềm & Đảm bảo chất lượng (Software Testing / QA)',
    termEn: 'Software Testing & Quality Assurance (QA)',
    ipa: '/ˈsɒft.weər ˈtest.ɪŋ/',
    definitionVi: 'Công đoạn thiết kế các kịch bản thử nghiệm (test cases), chạy thử chương trình với dữ liệu biên, phát hiện sai sót (bugs), kiểm tra hiệu năng và đảm bảo phần mềm hoạt động trơn tru đúng thiết kế.',
    definitionEn: 'The discipline of designing test suites, simulating edge-case workloads, uncovering functional bugs, measuring system latency, and verifying conformance with user requirements.',
    exampleVi: 'Kiểm thử tự động kiểm tra hệ thống chịu tải được 10.000 người truy cập cùng lúc.',
    exampleEn: 'Automated load testing validating 10,000 concurrent user requests.',
    sgkContext: 'SGK Trang 160 – Công đoạn 5'
  },
  {
    id: 'software-maintenance',
    termVi: 'Bảo trì phần mềm (Software Maintenance)',
    termEn: 'Software Maintenance',
    ipa: '/ˈsɒft.weər ˈmeɪn.tən.əns/',
    definitionVi: 'Công việc khắc phục lỗi phát sinh sau khi đưa vào vận hành thực tế, vá lỗ hổng bảo mật, tối ưu hóa tốc độ và cập nhật tính năng mới theo nhu cầu người dùng, mở ra một chu trình phát triển mới.',
    definitionEn: 'Post-deployment engineering activities to remediate reported bugs, patch security vulnerabilities, optimize throughput, and integrate feature enhancements.',
    exampleVi: 'Phát hành bản cập nhật 2.0 vá lỗi bảo mật và bổ sung thanh toán quét mã QR.',
    exampleEn: 'Releasing patch v2.0 to resolve zero-day vulnerabilities and add QR payments.',
    sgkContext: 'SGK Trang 161 – Công đoạn 7'
  },
  {
    id: 'ai-machine-learning',
    termVi: 'Lập trình Trí tuệ nhân tạo (AI & Machine Learning)',
    termEn: 'Artificial Intelligence & Machine Learning',
    ipa: '/ˌɑː.tɪˈfɪʃ.əl ɪnˈtel.ɪ.dʒəns/',
    definitionVi: 'Lĩnh vực phần mềm tiên tiến xây dựng các thuật toán có khả năng bắt chước hành vi thông minh của con người, tự học hỏi từ dữ liệu lớn, nhận dạng khuôn mặt, xử lý ngôn ngữ tự nhiên và xe tự lái.',
    definitionEn: 'An advanced computing domain engineering algorithms that mimic cognitive functions, learn from large datasets, perform computer vision, and execute natural language processing.',
    exampleVi: 'Hệ thống gợi ý video thông minh trên YouTube và trợ lý ảo nhận diện giọng nói.',
    exampleEn: 'Recommendation algorithms on YouTube and voice recognition assistants.',
    sgkContext: 'SGK Trang 163 – Mục 3'
  },
  {
    id: 'stem-careers',
    termVi: 'Nhân lực STEM & Công nghiệp 4.0 (STEM & Industry 4.0)',
    termEn: 'STEM & Industry 4.0 Workforce',
    ipa: '/stem ænd ˈɪn.də.stri fɔːr/',
    definitionVi: 'Lực lượng lao động chất lượng cao trong các lĩnh vực Khoa học (Science), Công nghệ (Technology), Kĩ thuật (Engineering) và Toán học (Mathematics), đóng vai trò động lực phát triển kinh tế số.',
    definitionEn: 'High-skilled technical talent in Science, Technology, Engineering, and Mathematics powering digital transformation, cloud computing, IoT, and blockchain economies.',
    exampleVi: 'Kĩ sư phần mềm Việt Nam làm việc cho các tập đoàn công nghệ toàn cầu.',
    exampleEn: 'Vietnamese software engineers contributing to international technology firms.',
    sgkContext: 'SGK Trang 163 – Mục 3'
  },
  {
    id: 'digital-recruitment-channels',
    termVi: 'Chuyên trang tuyển dụng CNTT số (IT Recruitment Gateways)',
    termEn: 'IT Recruitment Gateways',
    ipa: '/aɪˈtiː rɪˈkruːt.mənt ˈɡeɪt.weɪz/',
    definitionVi: 'Các nền tảng số uy tín kết nối kĩ sư phần mềm với các nhà tuyển dụng công nghệ (như TopDev, Vietnamworks, LinkedIn, GitHub), cung cấp dữ liệu báo cáo thị trường lương và cơ hội việc làm toàn cầu.',
    definitionEn: 'Specialized digital career networks connecting software talent with technology enterprises (e.g., TopDev, Vietnamworks, LinkedIn), offering market compensation insights and remote job postings.',
    exampleVi: 'Ứng tuyển vị trí Junior Python Developer qua mạng xã hội nghề nghiệp LinkedIn.',
    exampleEn: 'Applying for a Junior Python Developer opening via LinkedIn professional network.',
    sgkContext: 'SGK Trang 164 – Mục 3'
  }
];

export const LESSON_34_TERMS = LESSON_34_GLOSSARY;
