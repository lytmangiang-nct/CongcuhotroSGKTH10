import { TermDefinition } from './lessonData';
import { QuizQuestion } from './lesson2Data';

export const LESSON_8_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: 'Theo phạm vi địa lí, mạng máy tính có thể phân loại thành hai nhóm chính là gì?',
    questionEn: 'Based on geographic scope, computer networks are primarily classified into which two categories?',
    optionsVi: [
      'A. Mạng có dây và Mạng không dây',
      'B. Mạng cục bộ (LAN) và Mạng diện rộng (WAN)',
      'C. Mạng Internet và Mạng vệ tinh',
      'D. Mạng máy tính cá nhân và Mạng máy tính công ty'
    ],
    optionsEn: [
      'A. Wired networks and Wireless networks',
      'B. Local Area Network (LAN) and Wide Area Network (WAN)',
      'C. Internet and Satellite networks',
      'D. Personal computer networks and Enterprise networks'
    ],
    correctIndex: 1,
    explanationVi: 'Theo SGK Tin học 10 (Trang 38), căn cứ vào phạm vi địa lí, mạng máy tính được chia thành Mạng cục bộ (Local Area Network - LAN, phạm vi nhỏ như gia đình, trường học) và Mạng diện rộng (Wide Area Network - WAN, liên kết nhiều LAN hoặc máy tính trên phạm vi rộng).',
    explanationEn: 'According to the textbook (Page 38), by geographic coverage, computer networks are categorized into Local Area Network (LAN) and Wide Area Network (WAN).'
  },
  {
    id: 2,
    questionVi: 'Trong mạng máy tính, thiết bị nào dùng để kết nối các mạng LAN với nhau và chuyển tiếp dữ liệu ra Internet?',
    questionEn: 'In a computer network, which device interconnects different LANs and routes data to the Internet?',
    optionsVi: [
      'A. Bộ chia tín hiệu (Hub)',
      'B. Bộ chuyển mạch (Switch)',
      'C. Bộ định tuyến (Router)',
      'D. Card mạng (Network Interface Card)'
    ],
    optionsEn: [
      'A. Network Hub',
      'B. Network Switch',
      'C. Router',
      'D. Network Interface Card (NIC)'
    ],
    correctIndex: 2,
    explanationVi: 'Bộ chia (Hub) và bộ chuyển mạch (Switch) chỉ chuyển tiếp dữ liệu nội bộ trong một mạng LAN. Còn bộ định tuyến (Router) dùng để kết nối các mạng LAN với nhau và định tuyến gói tin ra Internet nếu địa chỉ nơi nhận không nằm trong LAN.',
    explanationEn: 'Hubs and Switches only forward packets within a single local LAN. A Router interconnects multiple LANs and forwards packets outside the local subnet to the Internet.'
  },
  {
    id: 3,
    questionVi: 'Điểm khác biệt căn bản nhất về mặt sở hữu giữa mạng cục bộ LAN và Internet là gì?',
    questionEn: 'What is the most fundamental difference regarding ownership between a local LAN and the Internet?',
    optionsVi: [
      'A. LAN do nhà nước sở hữu, còn Internet do các công ty viễn thông sở hữu',
      'B. LAN có chủ sở hữu xác định (cá nhân, cơ quan), còn Internet không thuộc quyền sở hữu của riêng ai',
      'C. LAN không có ai sở hữu, còn Internet thuộc sở hữu của tổ chức phi lợi nhuận quốc tế',
      'D. Cả LAN và Internet đều do nhà cung cấp dịch vụ viễn thông sở hữu hoàn toàn'
    ],
    optionsEn: [
      'A. LAN is state-owned, while the Internet is corporate-owned',
      'B. A LAN has a specific designated owner (individual/organization), whereas the Internet has no single owner',
      'C. A LAN has no owner, while the Internet is exclusively owned by international non-profits',
      'D. Both LAN and Internet are fully owned by telecommunication ISPs'
    ],
    correctIndex: 1,
    explanationVi: 'Theo SGK Trang 39, mạng LAN thuộc quyền sở hữu của một cá nhân, gia đình hoặc cơ quan xác định. Trong khi đó, Internet không của riêng ai, không có cơ quan quản lý tập trung mà hoạt động dựa trên các chuẩn kỹ thuật chung và sự điều phối của một số tổ chức phi lợi nhuận quốc tế.',
    explanationEn: 'A LAN has an identified owner (individual, school, or business). In contrast, the Internet has no central owner and operates cooperatively across standardized technical protocols coordinated by non-profit entities.'
  },
  {
    id: 4,
    questionVi: 'Tổ chức hoặc doanh nghiệp cung cấp dịch vụ kết nối người dùng với Internet (như Viettel, VNPT, FPT) được gọi là gì?',
    questionEn: 'What is an organization or company providing Internet connectivity services to users (e.g., Viettel, VNPT, FPT) called?',
    optionsVi: [
      'A. ISP (Internet Service Provider)',
      'B. ICP (Internet Content Provider)',
      'C. ASP (Application Service Provider)',
      'D. DNS (Domain Name System)'
    ],
    optionsEn: [
      'A. ISP (Internet Service Provider)',
      'B. ICP (Internet Content Provider)',
      'C. ASP (Application Service Provider)',
      'D. DNS (Domain Name System)'
    ],
    correctIndex: 0,
    explanationVi: 'ISP (Internet Service Provider - Nhà cung cấp dịch vụ Internet) là các đơn vị cung cấp đường truyền và hạ tầng để kết nối thiết bị của người dùng cá nhân và tổ chức vào mạng Internet toàn cầu.',
    explanationEn: 'An ISP (Internet Service Provider) provides the telecommunications infrastructure and gateway allowing subscribers to connect to the global Internet.'
  },
  {
    id: 5,
    questionVi: 'Điện toán đám mây (Cloud Computing) được định nghĩa là gì?',
    questionEn: 'How is Cloud Computing defined?',
    optionsVi: [
      'A. Việc sử dụng mạng không dây để kết nối máy tính ở mọi điều kiện thời tiết',
      'B. Việc phân phối các tài nguyên công nghệ thông tin theo nhu cầu qua Internet với chính sách trả tiền theo mức sử dụng',
      'C. Việc cài đặt các phần mềm soạn thảo văn bản miễn phí vào ổ cứng máy tính cá nhân',
      'D. Việc sao lưu dữ liệu máy tính ra đĩa CD và thẻ nhớ USB'
    ],
    optionsEn: [
      'A. Using wireless networks to connect computers in all atmospheric conditions',
      'B. On-demand delivery of IT resources over the Internet with pay-as-you-go pricing',
      'C. Installing free word-processing software directly onto local hard drives',
      'D. Backing up personal computer data to CD-ROMs and USB flash drives'
    ],
    correctIndex: 1,
    explanationVi: 'Theo Hộp Ghi nhớ Trang 41 SGK, điện toán đám mây là việc phân phối các tài nguyên Công nghệ thông tin theo nhu cầu qua Internet với chính sách thanh toán theo mức sử dụng (Pay-as-you-go).',
    explanationEn: 'Cloud computing is the on-demand delivery of computing power, database storage, applications, and other IT resources via the Internet with pay-as-you-go pricing.'
  },
  {
    id: 6,
    questionVi: 'Dịch vụ phần mềm soạn thảo Google Docs hoặc phòng học trực tuyến Zoom thuộc loại mô hình đám mây nào?',
    questionEn: 'Which cloud service model do applications like Google Docs or Zoom online classrooms belong to?',
    optionsVi: [
      'A. IaaS (Hạ tầng như một dịch vụ)',
      'B. PaaS (Nền tảng như một dịch vụ)',
      'C. SaaS (Phần mềm như một dịch vụ)',
      'D. DaaS (Dữ liệu như một dịch vụ)'
    ],
    optionsEn: [
      'A. IaaS (Infrastructure as a Service)',
      'B. PaaS (Platform as a Service)',
      'C. SaaS (Software as a Service)',
      'D. DaaS (Data as a Service)'
    ],
    correctIndex: 2,
    explanationVi: 'Theo SGK Trang 41, các phần mềm ứng dụng dùng trực tiếp cho công việc hàng ngày như Google Docs, Zoom, Gmail được xếp vào mô hình SaaS (Software as a Service - Phần mềm như là dịch vụ).',
    explanationEn: 'End-user ready applications delivered directly over browsers without local installations, like Google Docs or Zoom, are classified as SaaS (Software as a Service).'
  },
  {
    id: 7,
    questionVi: 'Dịch vụ lưu trữ tệp trên Internet như Google Drive hay Dropbox thuộc về loại hình dịch vụ đám mây nào?',
    questionEn: 'Online file storage services like Google Drive or Dropbox represent which type of cloud service?',
    optionsVi: [
      'A. IaaS (Hạ tầng như một dịch vụ - Cho thuê không gian lưu trữ và máy chủ)',
      'B. PaaS (Nền tảng như một dịch vụ)',
      'C. SaaS (Phần mềm như một dịch vụ)',
      'D. CaaS (Giao tiếp như một dịch vụ)'
    ],
    optionsEn: [
      'A. IaaS (Infrastructure as a Service - Storage and server provisioning)',
      'B. PaaS (Platform as a Service)',
      'C. SaaS (Software as a Service)',
      'D. CaaS (Communication as a Service)'
    ],
    correctIndex: 0,
    explanationVi: 'Theo SGK Trang 41: "Lưu trữ thông tin trên Internet thông qua Dropbox hay Google Drive là một trong các ví dụ thuê phần cứng đơn giản nhất", thuộc mô hình IaaS (Infrastructure as a Service - Hạ tầng như là dịch vụ).',
    explanationEn: 'The textbook (Page 41) states that leasing online storage via Dropbox or Google Drive exemplifies hardware rental, falling under IaaS (Infrastructure as a Service).'
  },
  {
    id: 8,
    questionVi: 'Khái niệm Internet vạn vật (Internet of Things - IoT) được hiểu chính xác nhất là gì?',
    questionEn: 'What is the most accurate understanding of the Internet of Things (IoT)?',
    optionsVi: [
      'A. Mạng lưới nối các máy tính bảng và điện thoại thông minh để đọc báo điện tử',
      'B. Hệ thống liên mạng gồm các phương tiện, vật dụng gắn cảm biến và vi xử lý có thể tự động kết nối, thu thập và trao đổi dữ liệu mà không cần con người can thiệp trực tiếp',
      'C. Mạng Internet nối các trang web thương mại điện tử mua bán đồ cũ trên mạng',
      'D. Hệ thống cáp quang ngầm dưới đáy biển nối tất cả các châu lục'
    ],
    optionsEn: [
      'A. A network connecting tablets and phones for reading online newspapers',
      'B. An internetworked system of physical devices embedded with sensors and processors that autonomously connect, collect, and exchange data without direct human intervention',
      'C. An e-commerce website network for buying and selling second-hand goods',
      'D. The submarine fiber-optic cable network interconnecting all continents'
    ],
    correctIndex: 1,
    explanationVi: 'Theo Hộp Ghi nhớ Trang 43 SGK: "IoT là hệ thống liên mạng bao gồm các phương tiện và vật dụng, các thiết bị thông minh được cài đặt cảm biến, phần mềm chuyên dụng giúp chúng tự động kết nối, thu thập và trao đổi dữ liệu qua mạng mà không nhất thiết có sự tương tác trực tiếp của con người".',
    explanationEn: 'According to the official summary on Page 43, IoT interconnects physical objects embedded with sensors and software to autonomously collect and exchange data without human intervention.'
  },
  {
    id: 9,
    questionVi: 'Trong hệ thống thu phí tự động không dừng (ETC) trên các tuyến cao tốc, công nghệ nào được sử dụng để đọc thẻ dán trên kính xe?',
    questionEn: 'In Electronic Toll Collection (ETC) systems on expressways, which technology reads vehicle windshield transponders?',
    optionsVi: [
      'A. Công nghệ nhận dạng qua sóng vô tuyến (RFID)',
      'B. Công nghệ quét mã vạch quang học (Barcode)',
      'C. Công nghệ Bluetooth tầm ngắn',
      'D. Công nghệ định vị vệ tinh GPS cục bộ'
    ],
    optionsEn: [
      'A. Radio Frequency Identification (RFID)',
      'B. Optical Barcode Scanning',
      'C. Short-range Bluetooth',
      'D. Local GPS Satellite Positioning'
    ],
    correctIndex: 0,
    explanationVi: 'Hệ thống thu phí không dừng ETC sử dụng công nghệ nhận dạng đối tượng bằng sóng vô tuyến RFID (Radio Frequency Identification). Đầu đọc RFID tại trạm thu phí nhận tín hiệu phát ra từ thẻ e-Tag dán trên xe để trừ tiền tự động trong vài phần mười giây.',
    explanationEn: 'ETC utilizes Radio Frequency Identification (RFID) technology. Toll plaza gantries broadcast radio waves that read windshield RFID tags and automatically deduct tolls in fractions of a second.'
  },
  {
    id: 10,
    questionVi: 'Trong một hệ thống mạng IoT, các thiết bị thông minh có bắt buộc phải kết nối trực tiếp với nhau qua mạng Internet toàn cầu hay không?',
    questionEn: 'In an IoT network, must smart devices connect directly to each other strictly over the global Internet?',
    optionsVi: [
      'A. Bắt buộc, nếu không có Internet thì các thiết bị IoT hoàn toàn vô dụng',
      'B. Không nhất thiết, các thiết bị có thể kết nối nội bộ qua Bluetooth, Wi-Fi, Zigbee hoặc mạng LAN cục bộ trước khi truyền qua thiết bị định tuyến trung tâm',
      'C. Bắt buộc kết nối qua cáp mạng LAN có dây với khoảng cách dưới 100m',
      'D. Không nhất thiết, vì các thiết bị IoT không cần bất kì giao tiếp sóng nào'
    ],
    optionsEn: [
      'A. Mandatory, without the Internet IoT devices are completely inoperative',
      'B. Not necessarily; devices can interconnect locally via Bluetooth, Wi-Fi, Zigbee, or local subnets before bridging through a central gateway',
      'C. Mandatory to connect via wired Ethernet cables under 100 meters',
      'D. Not necessarily, because IoT devices require no wireless transmission whatsoever'
    ],
    correctIndex: 1,
    explanationVi: 'Theo câu hỏi củng cố Trang 43 SGK, trong mạng IoT, các thiết bị không nhất thiết phải nối trực tiếp qua Internet. Chúng có thể giao tiếp cục bộ qua các giao thức trường gần (Bluetooth, Zigbee, Z-Wave, mạng nội bộ LAN) rồi một trạm điều khiển trung tâm (Gateway/Hub) mới chuyển tiếp dữ liệu lên máy chủ Internet.',
    explanationEn: 'Devices in an IoT mesh can communicate locally using lightweight protocols (Zigbee, Bluetooth, LAN) before a central IoT gateway bridges aggregated data to Internet servers.'
  }
];

export const LESSON_8_GLOSSARY: TermDefinition[] = [
  {
    id: 'lan',
    termVi: 'Mạng cục bộ (LAN)',
    termEn: 'Local Area Network (LAN)',
    ipa: '/ˈloʊ.kəl ˈer.i.ə ˈnet.wɜːrk/',
    definitionVi: 'Mạng máy tính kết nối các thiết bị trong một phạm vi địa lí giới hạn như gia đình, phòng học, toà nhà văn phòng hoặc khuôn viên trường học.',
    definitionEn: 'A computer network that interconnects computers within a limited geographic area such as a residence, school laboratory, or office building.',
    exampleVi: 'Mạng Wi-Fi tại phòng máy trường học là một mạng cục bộ (LAN).',
    exampleEn: 'The Wi-Fi network in the school computer lab is a Local Area Network (LAN).',
    sgkContext: 'Mục 1 – Trang 38, 39 SGK Tin học 10'
  },
  {
    id: 'wan',
    termVi: 'Mạng diện rộng (WAN)',
    termEn: 'Wide Area Network (WAN)',
    ipa: '/waɪd ˈer.i.ə ˈnet.wɜːrk/',
    definitionVi: 'Mạng máy tính trải rộng trên một vùng địa lí rộng lớn như một quận, thành phố, quốc gia hoặc toàn cầu được liên kết từ nhiều mạng LAN nhỏ hơn.',
    definitionEn: 'A telecommunications network that extends over a large geographic area (cities, countries, continents) by interconnecting multiple LANs.',
    exampleVi: 'Mạng Internet là mạng diện rộng (WAN) lớn nhất hành tinh.',
    exampleEn: 'The global Internet is the largest Wide Area Network (WAN) on Earth.',
    sgkContext: 'Mục 1 – Trang 38, 39 SGK Tin học 10'
  },
  {
    id: 'router',
    termVi: 'Bộ định tuyến (Router)',
    termEn: 'Router',
    ipa: '/ˈruː.tər/ hoặc /ˈraʊ.tər/',
    definitionVi: 'Thiết bị mạng chuyển tiếp các gói dữ liệu giữa các mạng máy tính khác nhau, định tuyến lưu lượng từ mạng LAN ra Internet qua cổng WAN.',
    definitionEn: 'A networking device that forwards data packets between computer networks, directing traffic from local LANs to the wider Internet.',
    exampleVi: 'Router gia đình nhận tín hiệu từ nhà mạng viễn thông và cấp phát địa chỉ IP cho máy tính.',
    exampleEn: 'The home router receives optic signals from the ISP and assigns IP addresses to devices.',
    sgkContext: 'Khởi động & Mục 1 – Trang 38, 39 SGK Tin học 10'
  },
  {
    id: 'switch',
    termVi: 'Bộ chuyển mạch (Switch)',
    termEn: 'Switch',
    ipa: '/swɪtʃ/',
    definitionVi: 'Thiết bị phần cứng dùng để kết nối nhiều máy tính và thiết bị đầu cuối với nhau trong cùng một mạng LAN bằng cách chuyển tiếp khung dữ liệu theo địa chỉ MAC.',
    definitionEn: 'A networking hardware device that connects devices on a computer network by using packet switching to receive and forward data to the destination.',
    exampleVi: 'Bộ chuyển mạch 24 cổng trong phòng máy giúp các máy tính học sinh trao đổi tệp tốc độ cao.',
    exampleEn: 'A 24-port switch connects all student desktop terminals in the computer lab.',
    sgkContext: 'Khởi động & Mục 1 – Trang 38, 39 SGK Tin học 10'
  },
  {
    id: 'isp',
    termVi: 'Nhà cung cấp dịch vụ Internet (ISP)',
    termEn: 'Internet Service Provider (ISP)',
    ipa: '/ˈɪn.tə.net ˈsɜː.vɪs prəˈvaɪ.dər/',
    definitionVi: 'Tổ chức hoặc công ty kinh doanh viễn thông cung cấp hạ tầng kết nối để người dùng truy cập vào mạng Internet toàn cầu.',
    definitionEn: 'An organization that provides services for accessing, using, or participating in the Internet.',
    exampleVi: 'Tại Việt Nam, VNPT, Viettel và FPT Telecom là những ISP hàng đầu.',
    exampleEn: 'In Vietnam, VNPT, Viettel, and FPT Telecom are leading ISPs.',
    sgkContext: 'Mục 1 – Trang 39 SGK Tin học 10'
  },
  {
    id: 'cloud-computing',
    termVi: 'Điện toán đám mây',
    termEn: 'Cloud Computing',
    ipa: '/klaʊd kəmˈpjuː.tɪŋ/',
    definitionVi: 'Mô hình phân phối các tài nguyên công nghệ thông tin (máy chủ, lưu trữ, phần mềm) theo nhu cầu qua mạng Internet với hình thức chi trả theo mức sử dụng.',
    definitionEn: 'The on-demand availability of computer system resources, especially data storage and computing power, without direct active management by the user.',
    exampleVi: 'Lưu trữ tài liệu trên Google Drive là ứng dụng phổ biến của điện toán đám mây.',
    exampleEn: 'Document sharing on Google Drive is a ubiquitous cloud computing use case.',
    sgkContext: 'Mục 3 – Trang 40, 41 SGK Tin học 10'
  },
  {
    id: 'saas',
    termVi: 'Phần mềm như một dịch vụ (SaaS)',
    termEn: 'Software as a Service (SaaS)',
    ipa: '/ˈsɒft.weər æz ə ˈsɜː.vɪs/',
    definitionVi: 'Mô hình phân phối phần mềm trong đó ứng dụng được lưu trữ trên máy chủ đám mây và người dùng truy cập trực tiếp qua trình duyệt web.',
    definitionEn: 'A software licensing and delivery model in which software is centrally hosted and accessed via a web browser.',
    exampleVi: 'Google Docs và Microsoft Office 365 trực tuyến là các dịch vụ SaaS tiêu biểu.',
    exampleEn: 'Google Docs and Microsoft 365 online represent classic SaaS offerings.',
    sgkContext: 'Mục 3b – Trang 41 SGK Tin học 10'
  },
  {
    id: 'iaas',
    termVi: 'Hạ tầng như một dịch vụ (IaaS)',
    termEn: 'Infrastructure as a Service (IaaS)',
    ipa: '/ˌɪn.frəˈstrʌk.tʃər æz ə ˈsɜː.vɪs/',
    definitionVi: 'Dịch vụ điện toán đám mây cung cấp các tài nguyên máy tính cơ bản như máy chủ ảo, dung lượng ổ đĩa lưu trữ và hạ tầng mạng qua Internet.',
    definitionEn: 'A cloud computing offering where a vendor provides users with access to computing resources such as servers, storage, and networking.',
    exampleVi: 'Thuê ổ cứng lưu trữ đám mây hoặc máy chủ ảo VPS là ví dụ về IaaS.',
    exampleEn: 'Renting elastic cloud block storage or virtual servers exemplifies IaaS.',
    sgkContext: 'Mục 3b – Trang 41 SGK Tin học 10'
  },
  {
    id: 'iot',
    termVi: 'Internet vạn vật (IoT)',
    termEn: 'Internet of Things (IoT)',
    ipa: '/ˈɪn.tə.net əv θɪŋz/',
    definitionVi: 'Mạng lưới các vật thể vật lí được nhúng cảm biến, phần mềm và công nghệ để kết nối và trao đổi dữ liệu với các thiết bị và hệ thống khác qua mạng.',
    definitionEn: 'A network of physical objects embedded with sensors, software, and other technologies for the purpose of connecting and exchanging data with other devices over the Internet.',
    exampleVi: 'Hệ thống đèn đường tự động bật tắt theo cảm biến ánh sáng là một ứng dụng của IoT.',
    exampleEn: 'Streetlamps that illuminate automatically based on ambient light sensors utilize IoT.',
    sgkContext: 'Mục 4 – Trang 42, 43 SGK Tin học 10'
  },
  {
    id: 'rfid',
    termVi: 'Nhận dạng qua tần số sóng vô tuyến (RFID)',
    termEn: 'Radio Frequency Identification (RFID)',
    ipa: '/ˈreɪ.di.oʊ ˈfriː.kwən.si aɪˌden.tɪ.fɪˈkeɪ.ʃən/',
    definitionVi: 'Công nghệ sử dụng trường điện từ của sóng vô tuyến để tự động nhận dạng và theo dõi các thẻ đính kèm với vật thể.',
    definitionEn: 'A technology that uses electromagnetic fields to automatically identify and track tags attached to objects.',
    exampleVi: 'Thẻ e-Pass thu phí tự động không dừng (ETC) dán trên kính ô tô sử dụng chip RFID.',
    exampleEn: 'Windshield e-Pass toll tags utilize RFID chips for non-stop expressway transactions.',
    sgkContext: 'Mục 4 (Hình 8.4) – Trang 42, 43 SGK Tin học 10'
  }
];
