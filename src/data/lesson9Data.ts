import { TermDefinition } from './lessonData';
import { QuizQuestion } from './lesson2Data';

export const LESSON_9_GLOSSARY: TermDefinition[] = [
  {
    id: 'cybersecurity',
    termVi: 'An toàn trên không gian mạng',
    termEn: 'Cybersecurity',
    ipa: '/ˌsaɪbəsɪˈkjʊərəti/',
    definitionVi: 'Tập hợp các biện pháp, công nghệ và quy tắc nhằm bảo vệ hệ thống mạng, thiết bị, phần mềm và dữ liệu cá nhân khỏi các nguy cơ tấn công hoặc đánh cắp thông tin.',
    definitionEn: 'The collection of technologies, processes, and practices designed to protect networks, devices, programs, and data from attack, damage, or unauthorized access.',
    exampleVi: 'Học sinh cần nắm vững các nguyên tắc an toàn trên không gian mạng khi sử dụng mạng xã hội.',
    exampleEn: 'Students must master cybersecurity best practices when interacting on social media networks.',
    sgkContext: 'Mục tiêu bài học, SGK Tin học 10 Kết nối tri thức trang 44.'
  },
  {
    id: 'malware',
    termVi: 'Phần mềm độc hại (Mã độc)',
    termEn: 'Malware (Malicious Software)',
    ipa: '/ˈmælweər/',
    definitionVi: 'Các phần mềm được viết ra với ý đồ xấu, nhằm xâm nhập, phá hoại hệ thống, làm hỏng phần mềm hoặc đánh cắp dữ liệu người dùng.',
    definitionEn: 'Software specifically designed to disrupt, damage, or gain unauthorized access to a computer system or digital assets.',
    exampleVi: 'Malware bao gồm các chủng loại chính là virus, sâu máy tính (worm) và phần mềm gián điệp trojan.',
    exampleEn: 'Malware encompasses primary categories including viruses, computer worms, and trojan spyware.',
    sgkContext: 'Mục 2: Phần mềm độc hại, SGK Tin học 10 Kết nối tri thức trang 45.'
  },
  {
    id: 'computer-virus',
    termVi: 'Virus máy tính',
    termEn: 'Computer Virus',
    ipa: '/kəmˈpjuːtə ˈvaɪrəs/',
    definitionVi: 'Đoạn mã độc không hoàn chỉnh, phải gắn ký sinh vào một phần mềm máy chủ khác để lây lan và phát tác khi phần mềm đó được thực thi.',
    definitionEn: 'A piece of malicious code that attaches itself to another host program and propagates when that host program is executed.',
    exampleVi: 'Virus máy tính chèn đoạn mã của nó vào các tệp thực thi .exe để lây sang tệp khác.',
    exampleEn: 'A computer virus injects its malicious code into executable .exe files to infect other programs.',
    sgkContext: 'Mục 2a: Tìm hiểu về virus, trojan, worm, SGK Tin học 10 Kết nối tri thức trang 46.'
  },
  {
    id: 'computer-worm',
    termVi: 'Sâu máy tính',
    termEn: 'Computer Worm',
    ipa: '/kəmˈpjuːtə wɜːm/',
    definitionVi: 'Một phần mềm độc hại hoàn chỉnh, có khả năng tự nhân bản và tự lan truyền độc lập qua mạng bằng cách khai thác lỗ hổng bảo mật của hệ điều hành mà không cần tệp chủ.',
    definitionEn: 'A standalone malware program that replicates autonomously and spreads across networks by exploiting operating system vulnerabilities.',
    exampleVi: 'Sâu WannaCry năm 2017 đã lây lan nhanh chóng qua các cổng mạng chưa vá lỗi của hệ điều hành Windows.',
    exampleEn: 'The WannaCry worm in 2017 rapidly propagated across unpatched network ports on Windows machines.',
    sgkContext: 'Mục 2a: Tìm hiểu về virus, trojan, worm, SGK Tin học 10 Kết nối tri thức trang 46.'
  },
  {
    id: 'trojan-horse',
    termVi: 'Phần mềm nội gián (Trojan)',
    termEn: 'Trojan Horse',
    ipa: '/ˈtrəʊdʒən hɔːs/',
    definitionVi: 'Phần mềm độc hại ngụy trang dưới dạng một ứng dụng hữu ích hoặc lành tính để lừa người dùng cài đặt, nhằm đánh cắp thông tin hoặc chiếm quyền điều khiển máy tính.',
    definitionEn: 'A type of malware disguised as legitimate software to trick users into installing it, thereby stealing sensitive credentials or establishing remote control.',
    exampleVi: 'Kẻ xấu gửi tệp trò chơi miễn phí nhưng bên trong ẩn chứa trojan mở cửa sau vào máy nạn nhân.',
    exampleEn: 'Attackers distribute free games concealing a trojan that opens an unauthorized backdoor into the victim’s PC.',
    sgkContext: 'Mục 2a: Tìm hiểu về virus, trojan, worm, SGK Tin học 10 Kết nối tri thức trang 46.'
  },
  {
    id: 'spyware',
    termVi: 'Phần mềm gián điệp',
    termEn: 'Spyware',
    ipa: '/ˈspaɪweər/',
    definitionVi: 'Loại mã độc âm thầm theo dõi thói quen, thông tin duyệt web và đánh cắp dữ liệu cá nhân của người dùng rồi chuyển lén lút về cho kẻ tấn công.',
    definitionEn: 'Malicious software secretly installed on a computer to record personal activity, browsing habits, and credentials, relaying them to malicious actors.',
    exampleVi: 'Phần mềm gián điệp có thể theo dõi vị trí và các tài khoản mạng xã hội của nạn nhân.',
    exampleEn: 'Spyware can monitor the victim’s location and track their logged-in social media accounts.',
    sgkContext: 'Mục 2a: Các loại trojan, SGK Tin học 10 Kết nối tri thức trang 46.'
  },
  {
    id: 'keylogger',
    termVi: 'Trình ghi thao tác bàn phím',
    termEn: 'Keylogger',
    ipa: '/ˈkiːlɒɡər/',
    definitionVi: 'Loại phần mềm gián điệp ngầm ghi lại toàn bộ các phím bấm và thao tác chuột nhằm đánh cắp mật khẩu tài khoản, số thẻ tín dụng hoặc tin nhắn riêng tư.',
    definitionEn: 'A surveillance spyware tool that records every keystroke and mouse interaction to intercept passwords, credit card credentials, and confidential messages.',
    exampleVi: 'Keylogger ngầm ghi lại tên đăng nhập và mật khẩu ngân hàng khi người dùng nhập từ bàn phím.',
    exampleEn: 'A keylogger silently captures banking usernames and passwords as the user types them on the physical keyboard.',
    sgkContext: 'Mục 2a: Các loại trojan, SGK Tin học 10 Kết nối tri thức trang 46.'
  },
  {
    id: 'cyberbullying',
    termVi: 'Bắt nạt trên không gian mạng',
    termEn: 'Cyberbullying',
    ipa: '/ˈsaɪbəˌbʊliɪŋ/',
    definitionVi: 'Hành vi sử dụng công nghệ số và mạng xã hội để đe dọa, xỉ vả, bôi nhọ, tống tiền hoặc cô lập tinh thần nạn nhân một cách dai dẳng.',
    definitionEn: 'The use of digital devices and social networks to harass, threaten, humiliate, or extort an individual, causing severe psychological harm.',
    exampleVi: 'Khi bị bắt nạt trên mạng, học sinh cần giữ nguyên bằng chứng và chia sẻ ngay với phụ huynh hoặc thầy cô giáo.',
    exampleEn: 'When targeted by cyberbullying, students must preserve evidence and immediately confide in parents or educators.',
    sgkContext: 'Mục 1: Một số nguy cơ trên mạng, SGK Tin học 10 Kết nối tri thức trang 45.'
  },
  {
    id: 'dos-ddos',
    termVi: 'Tấn công từ chối dịch vụ (DoS / DDoS)',
    termEn: 'Denial of Service (DoS / DDoS)',
    ipa: '/dɪˈnaɪəl əv ˈsɜːvɪs/',
    definitionVi: 'Hình thức tấn công mạng làm nghẽn máy chủ mục tiêu bằng cách huy động hàng loạt máy tính bị nhiễm mã độc gửi đồng thời lượng yêu cầu khổng lồ vượt quá tải chịu đựng.',
    definitionEn: 'A cyberattack technique that floods a target server with an overwhelming volume of traffic from compromised botnet nodes, rendering it inaccessible.',
    exampleVi: 'Mạng lưới botnet zombie thực hiện cuộc tấn công DDoS khiến cổng thông tin điện tử bị tê liệt tạm thời.',
    exampleEn: 'A zombie botnet launched a distributed denial of service attack, incapacitating the digital web portal.',
    sgkContext: 'Mục 2b: Tác hại của phần mềm độc hại, SGK Tin học 10 Kết nối tri thức trang 46.'
  },
  {
    id: 'firewall',
    termVi: 'Tường lửa & Phần mềm diệt virus',
    termEn: 'Firewall & Antivirus',
    ipa: '/ˈfaɪəwɔːl ænd ˌæntiˈvaɪrəs/',
    definitionVi: 'Hệ thống rào chắn bảo mật và công cụ quét tệp giúp giám sát lưu lượng vào ra, phát hiện, cách ly và tiêu diệt các phần mềm độc hại bảo vệ máy tính.',
    definitionEn: 'A security barrier and threat protection system that monitors incoming and outgoing network traffic, detecting and neutralizing malware intrusions.',
    exampleVi: 'Windows Defender là giải pháp tường lửa và bảo vệ máy tính chống virus được tích hợp sẵn trên hệ điều hành Windows.',
    exampleEn: 'Windows Defender serves as a built-in firewall and antivirus shield embedded within the Windows operating system.',
    sgkContext: 'Mục Thực hành: Dùng phần mềm chống virus Windows Defender, SGK Tin học 10 trang 47.'
  }
];

export const LESSON_9_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: 'Đặc điểm phân biệt cơ bản nhất giữa Virus máy tính và Sâu máy tính (Worm) là gì?',
    questionEn: 'What is the most fundamental distinction between a computer virus and a computer worm?',
    optionsVi: [
      'Virus là đoạn mã độc không hoàn chỉnh cần tệp chủ để lây lan; còn Worm là phần mềm hoàn chỉnh có thể tự nhân bản và lây qua mạng',
      'Virus chỉ lây qua Internet; còn Worm chỉ lây qua cổng kết nối USB cơ học',
      'Virus phá hỏng phần cứng; còn Worm chỉ làm chậm tốc độ hiển thị màn hình máy tính',
      'Virus do cá nhân viết; còn Worm do các công ty công nghệ lớn hợp pháp tạo ra'
    ],
    optionsEn: [
      'A virus is incomplete code needing a host file to propagate; a worm is a standalone program that self-replicates across networks autonomously',
      'Viruses only spread via the Internet; worms only spread through physical USB ports',
      'Viruses destroy physical hardware; worms merely decelerate the screen refresh rate',
      'Viruses are created by individuals; worms are created legally by corporate tech enterprises'
    ],
    correctIndex: 0,
    explanationVi: 'Theo SGK trang 46: Virus không phải phần mềm hoàn chỉnh, mà chỉ là các đoạn mã độc phải gắn với một phần mềm mới phát tác và lây lan. Ngược lại, Worm là một phần mềm hoàn chỉnh, tự lây lan bằng cách khai thác lỗ hổng hệ điều hành.',
    explanationEn: 'According to page 46: A virus is an incomplete code snippet that must attach to a host program to activate and propagate. Conversely, a worm is an autonomous standalone software that self-spreads by exploiting OS flaws.'
  },
  {
    id: 2,
    questionVi: 'Phần mềm Trojan Horse (Ngựa thành Troa) được đặt tên theo truyền thuyết Hy Lạp vì đặc tính nổi bật nào sau đây?',
    questionEn: 'Why is a Trojan Horse named after ancient Greek mythology?',
    optionsVi: [
      'Nó chạy với tốc độ siêu nhanh tương tự như những cỗ xe ngựa cổ đại',
      'Nó ngụy trang dưới vỏ bọc một phần mềm hữu ích, lành tính để lừa người dùng cài đặt, bên trong bí mật thực hiện hoạt động nội gián',
      'Nó chỉ tấn công các trang web tại đất nước Hy Lạp',
      'Nó tự phân chia thành hàng nghìn tệp nhỏ trên đĩa cứng'
    ],
    optionsEn: [
      'It executes at blazing speeds resembling ancient war chariots',
      'It disguises itself as benign, useful software to trick the user into installing it while concealing malicious espionage payloads inside',
      'It exclusively attacks websites hosted in Greece',
      'It automatically splits into thousands of fragmented files across disk drives'
    ],
    correctIndex: 1,
    explanationVi: 'Theo SGK trang 46: Trojan ngụy trang dưới vẻ bề ngoài của phần mềm lành tính hoặc trò chơi hấp dẫn. Khi người dùng tải về cài đặt, nó sẽ thực hiện các hành vi nội gián như đánh cắp mật khẩu, mở cửa sau hoặc ghi phím.',
    explanationEn: 'According to page 46: A Trojan disguises itself as harmless software or appealing games. Once installed, it executes espionage actions such as stealing credentials, opening backdoors, or recording keystrokes.'
  },
  {
    id: 3,
    questionVi: 'Loại phần mềm gián điệp nào chuyên ngầm ghi lại toàn bộ các thao tác gõ phím và di chuột của người dùng?',
    questionEn: 'Which specific spyware variant covertly monitors and logs all user keystrokes and mouse actions?',
    optionsVi: [
      'Backdoor (Cửa sau)',
      'Rootkit',
      'Keylogger',
      'Worm'
    ],
    optionsEn: [
      'Backdoor',
      'Rootkit',
      'Keylogger',
      'Worm'
    ],
    correctIndex: 2,
    explanationVi: 'Theo SGK trang 46: Keylogger là một loại spyware ngầm ghi hoạt động của bàn phím và chuột để tìm hiểu người sử dụng máy tính làm gì, nhằm đánh cắp thông tin đăng nhập và mật khẩu cá nhân.',
    explanationEn: 'According to page 46: A keylogger is a spyware variant that secretly records keyboard strokes and mouse interactions to monitor user operations and intercept authentication credentials.'
  },
  {
    id: 4,
    questionVi: 'Khi sử dụng mạng Wi-Fi tại các địa điểm công cộng (quán cà phê, bến xe, công viên), rủi ro an ninh mạng tiềm ẩn lớn nhất là gì?',
    questionEn: 'What is the greatest cybersecurity vulnerability when connecting to public Wi-Fi access points (cafes, transit hubs, parks)?',
    optionsVi: [
      'Làm pin điện thoại thông minh bị chai hỏng nhanh hơn',
      'Hầu hết các trạm Wi-Fi công cộng không mã hóa thông tin khi truyền, dễ bị kẻ xấu nghe lén và đánh cắp thông tin tài khoản',
      'Màn hình thiết bị sẽ bị đổi màu sang tông đỏ',
      'Tốc độ tải video luôn bị giảm về mức 0 kbps'
    ],
    optionsEn: [
      'Accelerating the physical degradation of device batteries',
      'Most public Wi-Fi hotspots do not encrypt transmitted data, enabling eavesdroppers to intercept credentials and personal tokens',
      'The display screen tint will permanently turn red',
      'Video download speeds are invariably throttled to 0 kbps'
    ],
    correctIndex: 1,
    explanationVi: 'Theo hộp Biện pháp bảo vệ trang 44 SGK: Hầu hết những trạm Wi-Fi công cộng không mã hóa thông tin khi truyền, khiến kẻ xấu cùng mạng có thể dùng công cụ bắt gói tin để trộm dữ liệu nhạy cảm.',
    explanationEn: 'According to the personal data protection box on page 44: Most public Wi-Fi routers transmit unencrypted data over the air, allowing adversaries on the same subnet to capture sensitive packets.'
  },
  {
    id: 5,
    questionVi: 'Khi phát hiện bản thân bị bắt nạt, xúc phạm hoặc đe dọa tống tiền trên không gian mạng, hành động nào sau đây là KHÔNG nên làm?',
    questionEn: 'When targeted by cyberbullying, defamation, or extortion online, which response should you AVOID doing?',
    optionsVi: [
      'Chụp ảnh màn hình lưu giữ tất cả chứng cứ, tin nhắn và bình luận',
      'Chia sẻ và tìm kiếm sự hỗ trợ ngay từ bố mẹ hoặc thầy cô giáo',
      'Nhắn tin lại chửi bới, đôi co tranh luận gay gắt và khiêu khích kẻ bắt nạt trên diễn đàn',
      'Báo cáo cho cơ quan công an hoặc cơ quan chức năng kèm bằng chứng xác thực'
    ],
    optionsEn: [
      'Taking screenshots to preserve all messages, posts, and time stamps as digital evidence',
      'Immediately confiding in and seeking guidance from parents or educators',
      'Replying angrily, engaging in flame wars, or provoking the bully on public forums',
      'Reporting the incident with gathered evidence to competent law enforcement authorities'
    ],
    correctIndex: 2,
    explanationVi: 'Theo SGK trang 45: Khi bị bắt nạt, tuyệt đối KHÔNG trả lời thư từ hay tin nhắn, KHÔNG tranh luận đôi co với kẻ bắt nạt trên diễn đàn vì sẽ khiến tình huống càng thêm phức tạp và leo thang.',
    explanationEn: 'According to page 45: Victims should NOT reply to hostile messages or engage in argumentative public disputes with bullies, as retaliatory engagement escalates harassment.'
  },
  {
    id: 6,
    questionVi: 'Sâu máy tính WannaCry xuất hiện vào năm 2017 đã gây chấn động toàn cầu bằng thủ đoạn phá hoại nào?',
    questionEn: 'How did the notorious WannaCry worm of 2017 extort victims worldwide?',
    optionsVi: [
      'Xóa sạch hệ điều hành máy tính ngay lập tức sau 1 phút',
      'Tự động mã hóa toàn bộ dữ liệu trên đĩa cứng và tống tiền chuộc bằng tiền ảo mới cấp phần mềm giải mã',
      'Làm hỏng quạt tản nhiệt của bo mạch chủ máy tính',
      'Tự động gửi ảnh chụp màn hình máy tính lên tất cả các mạng xã hội'
    ],
    optionsEn: [
      'Instantaneously wiping out the operating system within 60 seconds',
      'Encrypting all hard drive files and demanding cryptocurrency ransoms in exchange for decryption software',
      'Burning out motherboard cooling fans',
      'Broadcasting desktop screenshots across public social platforms'
    ],
    correctIndex: 1,
    explanationVi: 'Theo SGK trang 46: Sâu WannaCry (2017) tống tiền bằng cách mã hoá toàn bộ thông tin trên đĩa cứng và đòi tiền chuộc mới cho phần mềm hoá giải.',
    explanationEn: 'According to page 46: The WannaCry ransomware worm (2017) extorted victims by encrypting drive storage and demanding ransom payments for decryption software.'
  },
  {
    id: 7,
    questionVi: 'Hình thức tấn công từ chối dịch vụ (DoS / Denial of Service) khiến máy chủ mục tiêu bị tê liệt bằng cách nào?',
    questionEn: 'How does a Denial of Service (DoS) attack incapacitate target web servers?',
    optionsVi: [
      'Kẻ tấn công đột nhập trực tiếp vào phòng máy cắt dây nguồn điện',
      'Huy động các đội quân ngầm (máy tính nhiễm mã độc) đồng thời truy cập gửi lượng yêu cầu khổng lồ gây quá tải hệ thống',
      'Thay đổi tên miền trang web sang một địa chỉ khác',
      'Chèn các banner quảng cáo che kín toàn bộ giao diện web'
    ],
    optionsEn: [
      'Intruders physically break into data centers to sever power lines',
      'Mobilizing infected zombie computers to simultaneously flood target servers with excessive requests, exceeding capacity limits',
      'Silently modifying the registered DNS domain name',
      'Displaying intrusive advertisement popups covering web pages'
    ],
    correctIndex: 1,
    explanationVi: 'Theo SGK trang 46: Nhiều virus hoặc sâu phát tán rộng tạo thành các đội quân ngầm (botnet), mỗi khi nhận lệnh sẽ truy cập đồng thời vào một máy chủ chỉ định, gây quá tải làm tê liệt máy chủ.',
    explanationEn: 'According to page 46: Distributed malware unites compromised computers into zombie armies that concurrently blast designated servers with traffic, causing catastrophic service outages.'
  },
  {
    id: 8,
    questionVi: 'Công cụ bảo mật Windows Defender được tích hợp sẵn trong hệ điều hành nào và có vai trò gì?',
    questionEn: 'In which operating system is Windows Defender natively embedded, and what is its role?',
    optionsVi: [
      'Chỉ có trong Android; dùng để sao lưu ảnh lên mây',
      'Tích hợp sẵn trong Windows 10/11; tự động chạy ngầm để quét, phát hiện, cách ly và phòng chống phần mềm độc hại',
      'Chỉ chạy trên hệ điều hành macOS; dùng để tăng tốc độ game 3D',
      'Là phần cứng cắm qua cổng USB để lọc bụi bẩn'
    ],
    optionsEn: [
      'Exclusively in Android; used to backup gallery photos to the cloud',
      'Natively integrated into Windows 10/11; runs automatically in the background to detect, isolate, and neutralize malware',
      'Exclusively for macOS; used to optimize 3D gaming performance',
      'A physical USB dongle engineered to filter physical dust'
    ],
    correctIndex: 1,
    explanationVi: 'Theo SGK trang 47: Windows Defender được tích hợp sẵn trong hệ điều hành Windows 10/11, tự động chạy ngầm để bảo vệ máy tính và cập nhật mẫu virus mới qua Windows Update.',
    explanationEn: 'According to page 47: Windows Defender is built into Windows 10/11, operating seamlessly in the background to inspect files and downloading updated threat signatures via Windows Update.'
  },
  {
    id: 9,
    questionVi: 'Trong giao diện chức năng quét của Windows Defender (Hình 9.3 SGK trang 49), kiểu quét nào giúp người dùng tự chỉ định cụ thể một thư mục hoặc tệp cần kiểm tra?',
    questionEn: 'In the Windows Defender Scan Options screen (Figure 9.3, page 49), which option allows specifying a dedicated folder or file to scan?',
    optionsVi: [
      'Quick scan (Quét nhanh)',
      'Full scan (Quét hết)',
      'Custom scan (Quét theo yêu cầu)',
      'Windows Defender Offline scan'
    ],
    optionsEn: [
      'Quick scan',
      'Full scan',
      'Custom scan',
      'Windows Defender Offline scan'
    ],
    correctIndex: 2,
    explanationVi: 'Theo SGK trang 49: Quét theo yêu cầu (Custom scan) chỉ quét trên một thư mục nào đó. Khi đó, Defender sẽ yêu cầu người dùng chỉ ra thư mục muốn quét.',
    explanationEn: 'According to page 49: Custom scan evaluates targeted directories selected explicitly by the user, rather than the entire disk structure.'
  },
  {
    id: 10,
    questionVi: 'Biện pháp nào sau đây là hiệu quả nhất để phòng tránh bị lây nhiễm mã độc khi sử dụng máy tính và Internet?',
    questionEn: 'Which of the following practices is most effective in safeguarding against malware contamination online?',
    optionsVi: [
      'Thường xuyên tải và cài đặt các phần mềm bẻ khóa (crack) từ các diễn đàn chia sẻ miễn phí',
      'Không tải tệp lạ, không bấm vào liên kết trong email/tin nhắn không rõ nguồn gốc, thận trọng khi cắm USB và luôn bật phần mềm diệt virus',
      'Mở tất cả các tệp đính kèm trong thư rác để kiểm tra nội dung xem có gì nguy hiểm không',
      'Ghi mật khẩu ngân hàng và mã OTP dán lên vỏ ngoài máy tính tại quán net'
    ],
    optionsEn: [
      'Regularly downloading and executing cracked software packages from unsecured warez forums',
      'Refraining from downloading suspicious files, avoiding untrusted links in unsolicited messages, scanning removable drives, and keeping antivirus active',
      'Opening every attachment inside spam emails to inspect whether dangerous content is present',
      'Writing banking credentials and OTP codes on sticky notes attached to cybercafe monitors'
    ],
    correctIndex: 1,
    explanationVi: 'Theo hộp Ghi nhớ trang 47 SGK: Cần thận trọng khi sao chép tệp qua thiết bị nhớ di động, không mở liên kết lạ trong email/tin nhắn, không dùng phần mềm bẻ khóa và luôn dùng phần mềm chống mã độc bảo vệ máy tính.',
    explanationEn: 'According to page 47: Users must exercise vigilance with portable storage, refrain from clicking unverified message links, avoid cracked software, and consistently operate trusted antivirus shields.'
  }
];
