import { TermDefinition } from './lessonData';
import { QuizQuestion } from './lesson2Data';

export const LESSON_10_GLOSSARY: TermDefinition[] = [
  {
    id: 'open-educational-resources',
    termVi: 'Kho học liệu mở (OER)',
    termEn: 'Open Educational Resources (OER)',
    ipa: '/ˈəʊpən ˌedʒuˈkeɪʃənl rɪˈsɔːsɪz/',
    definitionVi: 'Các tài nguyên giảng dạy, học tập và nghiên cứu ở mọi định dạng được công bố công khai miễn phí hoặc phát hành theo giấy phép mở cho phép cộng đồng tiếp cận, sử dụng và tái sử dụng.',
    definitionEn: 'Teaching, learning, and research materials in any medium that reside in the public domain or have been released under an open license permitting no-cost access, use, and adaptation.',
    exampleVi: 'Phong trào học liệu mở bắt đầu từ sáng kiến của Viện Công nghệ Massachusetts (MIT) vào năm 2002.',
    exampleEn: 'The open educational resources movement gained worldwide momentum with the MIT initiative in 2002.',
    sgkContext: 'Mục Hướng dẫn Nhiệm vụ 2, SGK Tin học 10 Kết nối tri thức trang 53.'
  },
  {
    id: 'machine-translation',
    termVi: 'Dịch máy đa ngữ',
    termEn: 'Multilingual Machine Translation',
    ipa: '/məˈʃiːn trænsˈleɪʃn/',
    definitionVi: 'Công nghệ sử dụng trí tuệ nhân tạo và xử lý ngôn ngữ tự nhiên để tự động chuyển đổi văn bản hoặc giọng nói từ ngôn ngữ nguồn sang ngôn ngữ đích mà không cần sự can thiệp thủ công tức thời của con người.',
    definitionEn: 'The automated conversion of text or spoken words from a source language to a target language using computational linguistics and neural artificial intelligence.',
    exampleVi: 'Google Translate là công cụ dịch máy đa ngữ phổ biến hỗ trợ hơn 100 ngôn ngữ trên thế giới.',
    exampleEn: 'Google Translate represents a ubiquitous machine translation platform supporting over 100 global languages.',
    sgkContext: 'Nhiệm vụ 1: Sử dụng phần mềm dịch đa ngữ Google Translate, SGK Tin học 10 trang 50.'
  },
  {
    id: 'source-language',
    termVi: 'Ngôn ngữ nguồn',
    termEn: 'Source Language',
    ipa: '/sɔːs ˈlæŋɡwɪdʒ/',
    definitionVi: 'Ngôn ngữ đầu vào của văn bản, âm thanh hoặc tệp tài liệu gốc mà người dùng muốn chuyển ngữ.',
    definitionEn: 'The original language of a text, audio clip, or document submitted for translation into another tongue.',
    exampleVi: 'Khi dịch một câu từ tiếng Việt sang tiếng Anh, tiếng Việt đóng vai trò là ngôn ngữ nguồn.',
    exampleEn: 'When translating a sentence from Vietnamese to English, Vietnamese serves as the source language.',
    sgkContext: 'Bước 2: Xác định ngôn ngữ nguồn và ngôn ngữ đích, SGK Tin học 10 trang 50.'
  },
  {
    id: 'target-language',
    termVi: 'Ngôn ngữ đích',
    termEn: 'Target Language',
    ipa: '/ˈtɑːɡɪt ˈlæŋɡwɪdʒ/',
    definitionVi: 'Ngôn ngữ đầu ra mà người dùng mong muốn nhận được sau khi hệ thống dịch xử lý xong kết quả.',
    definitionEn: 'The output language into which the original source content is converted by the translation engine.',
    exampleVi: 'Người học có thể linh hoạt chuyển đổi ngôn ngữ đích sang tiếng Nga, tiếng Pháp hoặc tiếng Trung.',
    exampleEn: 'Learners can flexibly change the target language to Russian, French, or Chinese.',
    sgkContext: 'Bước 2: Xác định ngôn ngữ nguồn và ngôn ngữ đích, SGK Tin học 10 trang 50.'
  },
  {
    id: 'speech-to-text',
    termVi: 'Nhận dạng giọng nói (STT)',
    termEn: 'Speech-to-Text (STT)',
    ipa: '/spiːtʃ tuː tekst/',
    definitionVi: 'Khả năng của hệ thống máy tính thu âm giọng nói qua micro và tự động nhận diện, chuyển đổi âm thanh thành văn bản tương ứng.',
    definitionEn: 'The capability of a computer system to capture vocal audio via a microphone and automatically transcribe it into written alphanumeric text.',
    exampleVi: 'Học sinh có thể nhấp vào biểu tượng micro để đọc câu cần dịch thay vì gõ bàn phím.',
    exampleEn: 'Students can click the microphone icon to dictate sentences for translation instead of typing.',
    sgkContext: 'Mục 2: Nhập bằng giọng nói (Hình 10.4), SGK Tin học 10 trang 51.'
  },
  {
    id: 'text-to-speech',
    termVi: 'Tổng hợp giọng nói (TTS)',
    termEn: 'Text-to-Speech (TTS)',
    ipa: '/tekst tuː spiːtʃ/',
    definitionVi: 'Công nghệ chuyển đổi văn bản kỹ thuật số thành âm thanh tiếng nói nhân tạo tự nhiên, hỗ trợ người dùng luyện phát âm và kỹ năng nghe.',
    definitionEn: 'A technology that translates digital text into natural-sounding synthesized speech, assisting learners in pronunciation and listening comprehension.',
    exampleVi: 'Google Translate có biểu tượng loa để nghe máy phát âm với hai tốc độ bình thường và chậm.',
    exampleEn: 'Google Translate features a speaker icon allowing users to hear pronunciations at normal or slower speeds.',
    sgkContext: 'Mục Google Translate không chỉ nghe được mà còn nói được, SGK Tin học 10 trang 52.'
  },
  {
    id: 'document-translation',
    termVi: 'Dịch tệp tài liệu',
    termEn: 'Document Translation',
    ipa: '/ˈdɒkjumənt trænsˈleɪʃn/',
    definitionVi: 'Chức năng tải lên các tệp tin hoàn chỉnh (.docx, .xlsx, .pptx, .pdf) để hệ thống dịch toàn bộ nội dung mà vẫn giữ nguyên bố cục bảng biểu và hình thức trình bày.',
    definitionEn: 'A feature enabling users to upload whole files (.docx, .xlsx, .pptx, .pdf) so the engine translates the entire content while preserving document formatting.',
    exampleVi: 'Hình 10.6 trong SGK minh họa việc dịch nguyên bảng tính Excel phụ tùng dự trữ từ tiếng Anh sang tiếng Việt.',
    exampleEn: 'Figure 10.6 illustrates translating an entire Excel spare parts spreadsheet from English into Vietnamese.',
    sgkContext: 'Mục 3: Nhập từ một tệp & Hình 10.5, 10.6, SGK Tin học 10 trang 52.'
  },
  {
    id: 'national-edu-portal',
    termVi: 'Kho học liệu số Giáo dục (igiaoduc.vn)',
    termEn: 'National Educational Repository (igiaoduc.vn)',
    ipa: '/ˈnæʃnəl ˌedʒuˈkeɪʃənl rɪˈpɒzɪtri/',
    definitionVi: 'Cổng học liệu số trực tuyến quốc gia do Bộ Giáo dục và Đào tạo Việt Nam xây dựng, lưu trữ hàng vạn bài giảng số, sách giáo khoa và tư liệu dư địa chí mở cho mọi cấp học.',
    definitionEn: 'The national online digital learning repository established by Vietnam’s Ministry of Education and Training, hosting tens of thousands of open lectures and e-textbooks.',
    exampleVi: 'Học sinh lớp 10 có thể truy cập igiaoduc.vn để theo dõi các bài giảng video môn Toán và Tin học chất lượng cao.',
    exampleEn: 'Grade 10 students can access igiaoduc.vn to watch high-quality video lectures in Mathematics and Computer Science.',
    sgkContext: 'Mục Nhiệm vụ 2: Khai thác kho học liệu igiaoduc.vn, SGK Tin học 10 trang 53.'
  },
  {
    id: 'hierarchical-taxonomy',
    termVi: 'Cây thư mục phân cấp học liệu',
    termEn: 'Hierarchical Educational Taxonomy',
    ipa: '/ˌhaɪəˈrɑːkɪkl tækˈsɒnəmi/',
    definitionVi: 'Cấu trúc sắp xếp tài nguyên học tập dạng cây thư mục đa cấp từ Cấp 1 (Chuyên mục lớn: Học liệu số, Sách giáo khoa) đến Cấp 2 (Khối lớp) và Cấp 3 (Môn học cụ thể).',
    definitionEn: 'A multi-tier organizational tree classifying learning assets from Tier 1 (Broad categories) down to Tier 2 (Grade level) and Tier 3 (Specific academic subject).',
    exampleVi: 'Trên trang chủ igiaoduc.vn, cây thư mục phân cấp bên trái giúp học sinh nhanh chóng định vị bài giảng Đại số 10.',
    exampleEn: 'On igiaoduc.vn, the left-hand hierarchical directory tree helps students quickly locate Algebra 10 lectures.',
    sgkContext: 'Bước 2: Tìm kiếm, truy cập các học liệu, SGK Tin học 10 trang 53.'
  },
  {
    id: 'online-lecture-stream',
    termVi: 'Bài giảng số trực tuyến',
    termEn: 'Online Digital Lecture',
    ipa: '/ˈɒnlaɪn ˈdɪdʒɪtl ˈlektʃər/',
    definitionVi: 'Bài giảng được thiết kế dưới dạng video quay trực tiếp lớp học, hoạt ảnh minh họa hoặc bài trình chiếu đa phương tiện có giọng thuyết minh của giáo viên được truyền phát qua mạng.',
    definitionEn: 'A digital instructional unit rendered as live-recorded video, animations, or multimedia slide decks accompanied by voiceovers streamed over the web.',
    exampleVi: 'Nháy chuột vào nút Học trực tuyến ở Hình 10.9 để xem video bài giảng Dấu của tam thức bậc 2.',
    exampleEn: 'Clicking the "Online Study" button in Figure 10.9 opens the video lecture on quadratic trinomial signs.',
    sgkContext: 'Bước 3: Xem bài giảng (Hình 10.9), SGK Tin học 10 trang 54.'
  }
];

export const LESSON_10_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: 'Hai nguồn dịch vụ và tài nguyên chính trên Internet phục vụ học tập được giới thiệu trong bài học này là gì?',
    questionEn: 'Which two primary internet resources and services supporting education are highlighted in this lesson?',
    optionsVi: [
      'Phần mềm dịch đa ngữ và Kho học liệu mở',
      'Mạng xã hội giải trí và Sàn thương mại điện tử',
      'Các trang web chơi trò chơi trực tuyến và nghe nhạc số',
      'Phần mềm chỉnh sửa video và ứng dụng đồ họa 3D'
    ],
    optionsEn: [
      'Multilingual machine translation software and Open Educational Resources (OER)',
      'Entertainment social networks and e-commerce shopping portals',
      'Online multiplayer gaming platforms and streaming music channels',
      'Video editing software and standalone 3D graphics applications'
    ],
    correctIndex: 0,
    explanationVi: 'Theo mục tiêu bài học SGK trang 50: Sau bài học này em sẽ khai thác được một số dịch vụ và tài nguyên trên Internet phục vụ học tập gồm: phần mềm dịch, kho học liệu mở.',
    explanationEn: 'According to learning objectives on Page 50: Students will exploit internet services for learning, specifically translation tools and open educational resources.'
  },
  {
    id: 2,
    questionVi: 'Trong giao diện của Google Translate, "Ngôn ngữ nguồn" và "Ngôn ngữ đích" được hiểu chính xác như thế nào?',
    questionEn: 'In Google Translate, how are "Source Language" and "Target Language" precisely defined?',
    optionsVi: [
      'Ngôn ngữ nguồn là ngôn ngữ đầu vào cần dịch; Ngôn ngữ đích là ngôn ngữ đầu ra thể hiện kết quả dịch',
      'Ngôn ngữ nguồn là tiếng Việt; Ngôn ngữ đích bắt buộc phải là tiếng Anh',
      'Ngôn ngữ nguồn là tiếng nói phát qua loa; Ngôn ngữ đích là văn bản gõ phím',
      'Ngôn ngữ nguồn là ngôn ngữ của nhà sản xuất; Ngôn ngữ đích là ngôn ngữ của người dùng'
    ],
    optionsEn: [
      'Source language is the input language to be translated; target language is the resulting output language',
      'Source language is always Vietnamese; target language is mandatorily English',
      'Source language is audio spoken through speakers; target language is typed text',
      'Source language belongs to software developers; target language belongs to device users'
    ],
    correctIndex: 0,
    explanationVi: 'Theo SGK trang 50: Ngôn ngữ nguồn là ngôn ngữ đầu vào cần dịch và ngôn ngữ đích là ngôn ngữ đầu ra thể hiện kết quả của việc dịch.',
    explanationEn: 'According to Page 50: The source language represents the input language requiring translation, whereas the target language is the output result.'
  },
  {
    id: 3,
    questionVi: 'Khi sử dụng tính năng phát âm (nghe máy đọc) trên Google Translate, thao tác nhấp chuột vào biểu tượng chiếc loa có đặc điểm gì?',
    questionEn: 'When using the audio pronunciation feature on Google Translate, what happens upon consecutive clicks on the speaker icon?',
    optionsVi: [
      'Nháy chuột lần thứ nhất máy đọc với tốc độ bình thường; nháy chuột lần thứ hai máy sẽ đọc với tốc độ chậm hơn',
      'Nháy lần một máy đọc bằng giọng nam; nháy lần hai máy đọc bằng giọng nữ',
      'Nháy lần một máy đọc tiếng Anh; nháy lần hai máy tự động dịch sang tiếng Nga',
      'Nháy chuột sẽ lập tức tải tệp âm thanh định dạng .mp3 về máy tính'
    ],
    optionsEn: [
      'The first click plays audio at standard speed; the second click plays it at a slower speed',
      'The first click produces a male voice; the second click switches to a female voice',
      'The first click speaks English; the second click translates dynamically to Russian',
      'Clicking automatically downloads an MP3 audio recording to local storage'
    ],
    correctIndex: 0,
    explanationVi: 'Theo SGK trang 52: Để nghe máy đọc, ta chỉ cần nháy vào biểu tượng loa. Nháy chuột lần thứ nhất, máy sẽ đọc tốc độ bình thường, nháy chuột lần thứ hai thì máy sẽ đọc chậm hơn.',
    explanationEn: 'According to Page 52: Clicking the speaker icon once pronounces at normal speed; clicking it a second time pronounces at a deliberately slower pace.'
  },
  {
    id: 4,
    questionVi: 'Ba cách nhập văn bản đầu vào để dịch trên công cụ Google Translate bao gồm những cách nào?',
    questionEn: 'What are the three supported input methods for translation in Google Translate?',
    optionsVi: [
      'Nhập trực tiếp từ bàn phím, Nhập bằng giọng nói qua micro, và Nhập từ một tệp tài liệu',
      'Chỉ có thể nhập bằng bàn phím máy tính',
      'Gửi tin nhắn SMS, gọi điện thoại tổng đài, và gửi thư bưu điện',
      'Chụp ảnh quét vân tay, quét mống mắt, và quét mã vạch'
    ],
    optionsEn: [
      'Direct keyboard typing, voice input via microphone, and uploading a document file',
      'Keyboard typing exclusively',
      'SMS text messaging, hotline call center, and postal mailing',
      'Fingerprint scanning, retina scanning, and barcode reading'
    ],
    correctIndex: 0,
    explanationVi: 'Theo SGK trang 51 – 52: Có 3 cách nhập: 1. Nhập trực tiếp văn bản vào khung ngôn ngữ nguồn; 2. Nhập bằng giọng nói (qua micro); 3. Nhập từ một tệp tài liệu (Word, Excel, PowerPoint, PDF).',
    explanationEn: 'According to Pages 51–52: Three input methods are provided: 1. Direct text entry; 2. Speech-to-text via microphone; 3. Document file upload.'
  },
  {
    id: 5,
    questionVi: 'Khi nhập văn bản bằng tệp (Document translation) trên Google Translate, những loại định dạng tệp nào sau đây được hỗ trợ?',
    questionEn: 'Which file formats are supported when using the document translation tool on Google Translate?',
    optionsVi: [
      'Tệp văn bản Word (.docx), tệp bảng tính Excel (.xlsx), tệp trình chiếu PowerPoint (.pptx) hoặc tệp PDF',
      'Chỉ hỗ trợ tệp ảnh định dạng .gif động',
      'Chỉ hỗ trợ tệp âm thanh bài hát .mp3',
      'Chỉ hỗ trợ tệp chương trình thực thi .exe'
    ],
    optionsEn: [
      'Word documents (.docx), Excel spreadsheets (.xlsx), PowerPoint slides (.pptx), or PDF files',
      'Animated .gif image files only',
      '.mp3 audio files exclusively',
      'Executable program files (.exe) only'
    ],
    correctIndex: 0,
    explanationVi: 'Theo SGK trang 52: Tệp được chọn có thể là một tệp văn bản Word, tệp bảng tính Excel, tệp trình chiếu PowerPoint hay tệp PDF.',
    explanationEn: 'According to Page 52: Users can select Word documents, Excel spreadsheets, PowerPoint presentations, or PDF documents.'
  },
  {
    id: 6,
    questionVi: 'Sự kiện mang tính bước ngoặt khởi đầu cho phong trào học liệu mở (OER) trên phạm vi toàn cầu là sự kiện nào?',
    questionEn: 'Which milestone event marked the worldwide launch of the Open Educational Resources (OER) movement?',
    optionsVi: [
      'Viện Công nghệ Massachusetts (MIT) của Mỹ năm 2002 đưa toàn bộ nội dung giảng dạy của mình lên Internet để sử dụng miễn phí',
      'Google ra mắt công cụ tìm kiếm vào năm 1998',
      'Sự xuất hiện của chiếc điện thoại iPhone đầu tiên năm 2007',
      'Tổ chức Liên Hợp Quốc ban hành luật bảo vệ bản quyền sách giấy năm 1950'
    ],
    optionsEn: [
      'MIT published its entire academic curriculum on the Internet for free public use in 2002',
      'Google launched its web search engine in 1998',
      'Apple released the first iPhone in 2007',
      'The United Nations passed paper copyright legislation in 1950'
    ],
    correctIndex: 0,
    explanationVi: 'Theo SGK trang 53: Khái niệm học liệu mở được dùng rộng rãi khi Học viện Công nghệ Massachusetts của Mỹ năm 2002 đưa toàn bộ nội dung giảng dạy của mình lên Internet để sử dụng miễn phí.',
    explanationEn: 'According to Page 53: The OER movement gained worldwide adoption when MIT published all its course materials freely online in 2002.'
  },
  {
    id: 7,
    questionVi: 'Ở Việt Nam, địa chỉ trang web của kho học liệu số trực tuyến do Bộ Giáo dục và Đào tạo xây dựng là gì?',
    questionEn: 'In Vietnam, what is the official URL of the national digital educational repository created by the Ministry of Education and Training?',
    optionsVi: [
      'https://igiaoduc.vn/',
      'https://google.com.vn/',
      'https://facebook.com/giaoduc',
      'https://wikipedia.org/vietnam'
    ],
    optionsEn: [
      'https://igiaoduc.vn/',
      'https://google.com.vn/',
      'https://facebook.com/giaoduc',
      'https://wikipedia.org/vietnam'
    ],
    correctIndex: 0,
    explanationVi: 'Theo SGK trang 53: Ở Việt Nam, Bộ Giáo dục và Đào tạo cũng có một kho học liệu với hàng vạn học liệu mở đặt tại địa chỉ https://igiaoduc.vn/.',
    explanationEn: 'According to Page 53: In Vietnam, the Ministry of Education and Training maintains a vast open repository at https://igiaoduc.vn/.'
  },
  {
    id: 8,
    questionVi: 'Cây thư mục phân cấp trên trang kho học liệu số igiaoduc.vn gồm những cấp bậc nào để người dùng tìm bài giảng?',
    questionEn: 'How is the hierarchical classification tree organized on igiaoduc.vn for learners to navigate resources?',
    optionsVi: [
      'Cấp 1: Chuyên mục (Học liệu số, Sách giáo khoa, Dư địa chí) ➔ Cấp 2: Cấp học / Khối lớp ➔ Cấp 3: Môn học cụ thể',
      'Chỉ sắp xếp theo thứ tự bảng chữ cái tên tác giả',
      'Sắp xếp ngẫu nhiên theo dung lượng tệp tải về từ lớn đến bé',
      'Chỉ chia theo hai miền Bắc và Nam'
    ],
    optionsEn: [
      'Tier 1: Category (Digital Assets, Textbooks, Topography) ➔ Tier 2: Grade Level ➔ Tier 3: Academic Subject',
      'Alphabetical sorting by author names exclusively',
      'Random ordering based on file size from largest to smallest',
      'Partitioned merely by geographic North and South regions'
    ],
    correctIndex: 0,
    explanationVi: 'Theo SGK trang 53: Thư mục cấp 1 gồm ba loại là Học liệu số, Sách giáo khoa và Dư địa chí; Cấp 2 chia theo khối lớp; Cấp 3 chia theo từng môn học cụ thể.',
    explanationEn: 'According to Page 53: Tier 1 comprises Digital Lessons, Textbooks, and Topography; Tier 2 categorizes by Grade level; Tier 3 organizes by specific subject matter.'
  },
  {
    id: 9,
    questionVi: 'Khi cần chuyển đổi qua lại giữa ngôn ngữ nguồn và ngôn ngữ đích trên Google Translate (ví dụ từ Việt ➔ Anh sang Anh ➔ Việt), người dùng sử dụng thao tác nào?',
    questionEn: 'To swap the source and target languages in Google Translate (e.g., from Vietnamese ➔ English to English ➔ Vietnamese), what action should you take?',
    optionsVi: [
      'Nháy chuột vào biểu tượng hai mũi tên ngược chiều (⇄) nằm giữa hai khung ngôn ngữ',
      'Tắt trình duyệt web đi và mở lại từ đầu',
      'Nhấn phím F5 để tải lại toàn bộ trang web',
      'Xóa toàn bộ lịch sử duyệt web của máy tính'
    ],
    optionsEn: [
      'Click the two-way swap arrows icon (⇄) situated between the language selectors',
      'Close the browser entirely and reopen it from scratch',
      'Press F5 to force a complete web page refresh',
      'Clear all web browser caching and history'
    ],
    correctIndex: 0,
    explanationVi: 'Theo SGK trang 54 (bài Luyện tập 2): Đảo lại vai trò của ngôn ngữ nguồn và đích bằng cách nháy chuột vào biểu tượng hai mũi tên ngược chiều ⇄.',
    explanationEn: 'According to Page 54 (Practice 2): Invert source and target languages by clicking the bidirectional swap arrows icon (⇄).'
  },
  {
    id: 10,
    questionVi: 'Nhận định nào sau đây là ĐÚNG ĐẮN NHẤT khi sử dụng kết quả dịch của các phần mềm dịch máy trên Internet?',
    questionEn: 'Which of the following statements is MOST accurate regarding machine translation output from online tools?',
    optionsVi: [
      'Bản dịch máy có thể chưa thực sự trau chuốt và vẫn có thể có nhầm lẫn; người học nên dùng để hỗ trợ, đối chiếu và cần hoàn thiện lại bản dịch',
      'Bản dịch máy luôn hoàn hảo 100% trong mọi ngữ cảnh và có thể nộp trực tiếp bài luận không cần đọc lại',
      'Phần mềm dịch máy chỉ dịch được đúng một từ đơn lẻ, không bao giờ dịch được cả câu văn',
      'Chỉ có người lớn mới được phép dùng phần mềm dịch máy trên Internet'
    ],
    optionsEn: [
      'Machine translations may lack nuance and contain errors; learners should use them as assistive aids requiring verification and refinement',
      'Machine translation is universally 100% flawless across all contexts and suitable for unreviewed formal submission',
      'Machine translation tools only process isolated single words, incapable of sentence parsing',
      'Only adults are legally permitted to use online translation tools'
    ],
    correctIndex: 0,
    explanationVi: 'Theo SGK trang 52: Bản dịch có thể chưa thực sự trau chuốt và vẫn còn có thể nhầm nhưng có thể dùng để hỗ trợ hoàn thiện bản dịch. Người dùng cần chủ động đọc, chỉnh sửa để văn phong tự nhiên.',
    explanationEn: 'According to Page 52: Translations might lack stylistic elegance or contain inaccuracies, but remain highly valuable assistive aids requiring human editing.'
  }
];
