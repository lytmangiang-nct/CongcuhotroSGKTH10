export interface TermDefinition {
  id: string;
  termEn: string;
  termVi: string;
  ipa: string;
  definitionVi: string;
  definitionEn: string;
  exampleVi: string;
  exampleEn: string;
  sgkContext?: string;
}

export interface TextbookSection {
  id: string;
  page: number;
  sectionNumber?: string;
  titleVi: string;
  titleEn: string;
  badge?: string;
}

export const GLOSSARY: TermDefinition[] = [
  {
    id: "information",
    termEn: "Information",
    termVi: "Thông tin",
    ipa: "/ˌɪn.fəˈmeɪ.ʃən/",
    definitionVi: "Tất cả những gì mang lại cho chúng ta hiểu biết về thế giới xung quanh và về chính con người.",
    definitionEn: "Data that has been processed, organized, or structured in a given context so as to make it useful and meaningful.",
    exampleVi: "Dự báo thời tiết thông báo: 'Hôm nay trời nắng nóng 39°C'.",
    exampleEn: "The weather forecast states: 'Today is sunny and hot at 39°C'."
  },
  {
    id: "data",
    termEn: "Data",
    termVi: "Dữ liệu",
    ipa: "/ˈdeɪ.tə/ or /ˈdɑː.tə/",
    definitionVi: "Thông tin (văn bản, số, hình ảnh, âm thanh,...) đã được đưa vào máy tính để máy tính có thể nhận biết và xử lí được.",
    definitionEn: "Raw facts, figures, text, numbers, images, or audio represented in a form suitable for processing by a computer.",
    exampleVi: "Con số 39°C được nhập vào bảng tính Excel là dữ liệu.",
    exampleEn: "The number 39°C entered into an Excel spreadsheet is data."
  },
  {
    id: "bit",
    termEn: "Bit (Binary Digit)",
    termVi: "Bit (Chữ số nhị phân)",
    ipa: "/bɪt/",
    definitionVi: "Đơn vị cơ bản nhỏ nhất của thông tin trong máy tính, chỉ nhận một trong hai giá trị 0 hoặc 1.",
    definitionEn: "The most basic unit of information in computing and digital communications, taking a value of either 0 or 1.",
    exampleVi: "Một tín hiệu điện bật (1) hoặc tắt (0) tương ứng với 1 bit.",
    exampleEn: "An electrical signal on (1) or off (0) corresponds to 1 bit."
  },
  {
    id: "byte",
    termEn: "Byte",
    termVi: "Byte",
    ipa: "/baɪt/",
    definitionVi: "Đơn vị dữ liệu nhỏ nhất mà máy tính truy cập được. Một byte gồm 8 bit liên tiếp.",
    definitionEn: "A unit of digital information that most commonly consists of eight bits; the smallest addressable unit of memory in most computers.",
    exampleVi: "Một kí tự La-tinh như chữ 'A' thường chiếm dung lượng 1 byte trong bộ nhớ.",
    exampleEn: "A single Latin character such as 'A' typically occupies 1 byte of memory."
  },
  {
    id: "data-processing",
    termEn: "Data Processing",
    termVi: "Xử lí dữ liệu",
    ipa: "/ˈdeɪ.tə ˈprəʊ.ses.ɪŋ/",
    definitionVi: "Quá trình biến đổi dữ liệu trong bộ nhớ máy tính để tạo ra dữ liệu mới hoặc thông tin hữu ích.",
    definitionEn: "The collection and manipulation of digital data to produce meaningful output and information.",
    exampleVi: "Máy tính tính toán nhiệt độ trung bình từ số liệu thu thập được qua 10 năm.",
    exampleEn: "The computer computes the average temperature from data collected over 10 years."
  },
  {
    id: "digital-device",
    termEn: "Digital Device",
    termVi: "Thiết bị số",
    ipa: "/ˈdɪdʒ.ɪ.təl dɪˈvaɪs/",
    definitionVi: "Các thiết bị làm việc với thông tin số như lưu trữ, truyền dữ liệu hay xử lí thông tin số.",
    definitionEn: "Electronic hardware devices that use digital data to store, process, or transmit information.",
    exampleVi: "Máy tính xách tay, điện thoại thông minh, thẻ nhớ và router wifi là các thiết bị số.",
    exampleEn: "Laptops, smartphones, memory cards, and Wi-Fi routers are digital devices."
  },
  {
    id: "data-integrity",
    termEn: "Data / Information Integrity",
    termVi: "Tính toàn vẹn của thông tin",
    ipa: "/ɪnˈteɡ.rə.ti/",
    definitionVi: "Đặc tính thông tin chỉ được hiểu đúng và chính xác khi có đầy đủ dữ liệu và đúng ngữ cảnh; nếu thiếu dữ liệu sẽ bị sai lệch.",
    definitionEn: "The accuracy, completeness, and consistency of data and information in its proper context.",
    exampleVi: "Dữ liệu '39°C' nếu thiếu ngữ cảnh (thời tiết hay sốt cao) thì không thể xác định được thông tin chính xác.",
    exampleEn: "The data '39°C' without context (weather or fever) cannot establish accurate information."
  },
  {
    id: "telecommunication",
    termEn: "Telecommunication",
    termVi: "Truyền thông",
    ipa: "/ˌtel.ɪ.kəˌmjuː.nɪˈkeɪ.ʃən/",
    definitionVi: "Quá trình truyền tải thông tin, dữ liệu từ nơi này đến nơi khác thông qua các phương tiện kĩ thuật số hoặc viễn thông.",
    definitionEn: "Transmission of signals, messages, or information over distance by electronic or optical means.",
    exampleVi: "Mạng cáp quang truyền dữ liệu với tốc độ hàng chục Megabit trên giây.",
    exampleEn: "Fiber optic networks transmit data at speeds of tens of Megabits per second."
  },
  {
    id: "storage-capacity",
    termEn: "Storage Capacity",
    termVi: "Dung lượng lưu trữ",
    ipa: "/ˈstɔː.rɪdʒ kəˈpæs.ə.ti/",
    definitionVi: "Khả năng chứa dữ liệu tối đa của một thiết bị nhớ, thường đo bằng Byte, KB, MB, GB, TB.",
    definitionEn: "The maximum amount of data that a storage medium or device can hold.",
    exampleVi: "Một ổ đĩa cứng 2 TB có thể chứa hàng triệu trang sách điện tử.",
    exampleEn: "A 2 TB hard drive can store millions of e-book pages."
  }
];

export const LESSON_HEADER = {
  themeNumber: 1,
  themeTitleVi: "Máy tính và xã hội tri thức",
  themeTitleEn: "Computers and the Knowledge-Based Society",
  lessonNumber: 1,
  lessonTitleVi: "THÔNG TIN VÀ XỬ LÍ THÔNG TIN",
  lessonTitleEn: "INFORMATION AND INFORMATION PROCESSING",
  pages: "Trang 6 – 10 (Sách giáo khoa Tin học 10 Kết nối tri thức với cuộc sống)"
};

export const LEARNING_OBJECTIVES = [
  {
    id: 1,
    vi: "Phân biệt được thông tin và dữ liệu.",
    en: "Distinguish between information and data."
  },
  {
    id: 2,
    vi: "Chuyển đổi giữa các đơn vị lưu trữ dữ liệu.",
    en: "Convert between various data storage units."
  },
  {
    id: 3,
    vi: "Nêu được sự ưu việt của việc lưu trữ, xử lí và truyền thông tin bằng thiết bị số.",
    en: "Explain the superiority of storing, processing, and communicating information using digital devices."
  }
];

export const WARM_UP = {
  questionVi: "Tin học được định nghĩa là khoa học nghiên cứu các phương pháp và quá trình xử lí thông tin tự động bằng các phương tiện kĩ thuật, chủ yếu bằng máy tính. Chúng ta đã biết ở lớp dưới, thông tin được biểu diễn trong máy tính bằng các dãy bit (gồm các kí hiệu 0, 1), máy tính xử lí dữ liệu là các dãy bit trong bộ nhớ. Vậy dữ liệu và thông tin khác nhau như thế nào?",
  questionEn: "Informatics is defined as the science that studies methods and processes of automated information processing by technological means, primarily computers. As learned in earlier grades, information in a computer is represented as sequences of bits (0s and 1s), and the computer processes data as bit sequences in its memory. How, then, do data and information differ from each other?",
  hintVi: "Gợi ý: Dữ liệu là dạng thô (số, chữ, tín hiệu nhị phân) được nạp vào máy tính, còn thông tin là ý nghĩa mà con người tiếp nhận và thấu hiểu được sau khi xử lí.",
  hintEn: "Hint: Data is the raw representation (numbers, text, binary signals) fed into the computer, whereas information is the meaning understood by human beings."
};

export const SECTION_1 = {
  partA: {
    titleVi: "1. THÔNG TIN VÀ DỮ LIỆU",
    titleEn: "1. INFORMATION AND DATA",
    subTitleVi: "a) Quá trình xử lí thông tin",
    subTitleEn: "a) The Information Processing Cycle",
    introVi: "Thông tin là tất cả những gì mang lại cho chúng ta hiểu biết. Như vậy thông tin gắn với quá trình nhận thức. Máy tính không tự nhận thức được mà chỉ là công cụ hỗ trợ cho con người trong quá trình nhận thức.",
    introEn: "Information is everything that brings us knowledge and understanding. Thus, information is inextricably linked to cognitive processes. Computers cannot perform cognitive thinking on their own; they merely serve as instruments supporting humans in their cognitive journey.",
    steps: [
      {
        step: 1,
        nameVi: "Bước 1: Tiếp nhận dữ liệu",
        nameEn: "Step 1: Data Input (Acquisition)",
        contentVi: "Máy tính tiếp nhận dữ liệu theo hai cách thường gặp là:\n- Từ các thiết bị, ví dụ tệp hình ảnh từ máy quét là dữ liệu.\n- Từ bàn phím do con người nhập, ví dụ khi soạn một văn bản, thông tin của người nhập chuyển thành dữ liệu.",
        contentEn: "The computer receives data through two common methods:\n- From peripheral devices, for example, image files obtained from a scanner are data.\n- From keyboards entered by humans, for example, when composing a text, the user's intended information is converted into digital data."
      },
      {
        step: 2,
        nameVi: "Bước 2: Xử lí dữ liệu",
        nameEn: "Step 2: Data Processing",
        contentVi: "Biến đổi dữ liệu trong bộ nhớ máy tính để tạo ra dữ liệu mới. Ví dụ: từ nhiệt độ trung bình của nhiều năm gần đây, các phần mềm chuyên dụng có thể cho chúng ta biết khuynh hướng Trái Đất đang nóng dần lên.",
        contentEn: "Transforming and manipulating data residing in computer memory to generate new data. For example: from average annual temperatures over recent decades, dedicated software calculates long-term climate trends showing that the Earth is steadily warming up."
      },
      {
        step: 3,
        nameVi: "Bước 3: Đưa ra kết quả",
        nameEn: "Step 3: Result Output",
        contentVi: "Máy tính có thể đưa ra kết quả theo hai cách:\n- Dữ liệu được thể hiện dưới dạng văn bản, âm thanh, hình ảnh,... mà con người có thể hiểu được. Như vậy dữ liệu đã được chuyển thành thông tin.\n- Lưu dữ liệu lên một vật mang tin như thẻ nhớ hoặc chuyển thành dữ liệu đầu vào cho một hoạt động xử lí khác.",
        contentEn: "The computer can deliver output in two ways:\n- Data is rendered as human-readable text, audio, images, etc. In doing so, data has been transformed into information.\n- Storing data onto storage media (such as memory cards) or passing it as input data to another downstream processing task."
      }
    ],
    summaryVi: "Trong tin học, dữ liệu là thông tin (âm thanh, hình ảnh, văn bản, số,...) đã được đưa vào máy tính để máy tính có thể nhận biết và xử lí được. Trong máy tính, xử lí thông tin chính là xử lí dữ liệu.",
    summaryEn: "In computer science, data represents information (audio, graphics, text, numbers, etc.) encoded into the computer so that the computer can recognize and process it. Inside a computer, information processing is fundamentally data processing."
  },
  partB: {
    titleVi: "b) Phân biệt dữ liệu và thông tin",
    titleEn: "b) Distinguishing Data and Information",
    activity1: {
      titleVi: "Hoạt động 1: Có thể đồng nhất thông tin với dữ liệu được không?",
      titleEn: "Activity 1: Can information and data be equated?",
      promptVi: "Có các ý kiến như sau về dữ liệu của một bài giảng môn Tin học:\n- An: Bài ghi trong vở của em là dữ liệu.\n- Minh: Tệp bài soạn bằng Word của cô giáo là dữ liệu.\n- Khoa: Dữ liệu là tệp video ghi lại tiết giảng của cô giáo.\nTheo em bạn nào nói đúng?",
      promptEn: "There are varying viewpoints regarding the data of an Informatics lecture:\n- An: The handwritten notes in my notebook are data.\n- Minh: The teacher's lesson plan Word file is data.\n- Khoa: The video recording of the teacher's lesson is data.\nIn your opinion, who is correct?",
      explanationVi: "Cả ba bạn đều đúng! Cùng một nội dung bài giảng (thông tin), nhưng có thể được thể hiện qua nhiều hình thức dữ liệu khác nhau: chữ viết tay trên giấy, tệp văn bản .docx, hay tệp video kĩ thuật số.",
      explanationEn: "All three students are correct! The same lecture content (information) can be represented by multiple distinct data formats: handwritten ink on paper, a .docx file on a computer, or a digital video recording."
    },
    keyInsights: [
      {
        id: "rel-independence",
        titleVi: "Tính độc lập tương đối giữa thông tin và dữ liệu",
        titleEn: "Relative independence of information and data",
        points: [
          {
            vi: "Có thể có nhiều loại dữ liệu khác nhau của một thông tin: bài ghi trong vở của trò, tệp bài soạn của cô giáo hay video ghi lại tiết giảng đều là dữ liệu của bài giảng.",
            en: "There can exist multiple different data representations for the same information: student notes, teacher's slide file, and recorded classroom video are all valid data of that lesson."
          },
          {
            vi: "Nếu dữ liệu không đầy đủ thì không xác định được chính xác thông tin. Ví dụ, dữ liệu \"39°C\" trong bộ dữ liệu về thời tiết mang thông tin \"trời rất nóng\" nhưng dữ liệu \"39°C\" trong bộ dữ liệu của bệnh án lại mang thông tin \"sốt cao\". Như vậy, thông tin có tính toàn vẹn, được hiểu đúng khi có đầy đủ dữ liệu, nếu thiếu dữ liệu thì có thể làm thông tin bị sai hoặc không xác định được.",
            en: "If data is incomplete or devoid of context, the exact information cannot be ascertained. For instance, the data \"39°C\" in a meteorological dataset indicates \"very hot weather\", whereas \"39°C\" in a clinical medical record signifies a \"high fever\". Thus, information possesses integrity: it is properly understood only when accompanied by full context and data; incomplete data can lead to erroneous or indeterminable information."
          },
          {
            vi: "Với cùng một bộ dữ liệu, cách xử lí khác nhau có thể đem lại những thông tin khác nhau. Ví dụ dữ liệu thời tiết một ngày nào đó có thể được tổng hợp theo vùng để biết phân bố lượng mưa trong ngày, nhưng cũng có thể xử lí để cho dự báo thời tiết ngày hôm sau.",
            en: "With the identical dataset, distinct processing algorithms yield distinct information. For example, daily weather records can be aggregated by region to map daily rainfall, or ingested into predictive atmospheric models for tomorrow's forecast."
          },
          {
            vi: "Việc xử lí các bộ dữ liệu khác nhau cũng có thể đưa đến cùng một thông tin. Ví dụ, xử lí dữ liệu về băng tan ở Bắc Cực hay cường độ bão ở vùng nhiệt đới đều có thể dẫn đến kết luận về sự nóng lên của Trái Đất.",
            en: "Processing disparate datasets can converge toward the identical conclusion/information. For example, analyzing Arctic sea ice retreat data and tracking increasing tropical storm intensity both lead to the same conclusion: global warming."
          }
        ]
      }
    ],
    memorizeBox: {
      titleVi: "HỘP GHI NHỚ (TRANG 7)",
      titleEn: "KEY TAKEAWAY (PAGE 7)",
      bullets: [
        {
          vi: "Trong tin học, dữ liệu là thông tin đã được đưa vào máy tính để máy tính có thể nhận biết và xử lí được.",
          en: "In computing, data is information that has been encoded into a computer so that it can recognize and process it."
        },
        {
          vi: "Thông tin là ý nghĩa của dữ liệu. Dữ liệu là các yếu tố thể hiện, xác định thông tin. Thông tin và dữ liệu có tính độc lập tương đối. Cùng một thông tin có thể được thể hiện bởi nhiều loại dữ liệu khác nhau. Ngược lại, một dữ liệu có thể mang nhiều thông tin khác nhau.",
          en: "Information represents the meaning of data. Data constitutes the symbols and representations that convey information. Information and data are relatively independent: identical information can be manifested via diverse data formats, and conversely, a single datum can signify distinct information depending on context."
        },
        {
          vi: "Với vai trò là ý nghĩa, thông tin có tính toàn vẹn. Dữ liệu không đầy đủ có thể làm thông tin sai lệch, thậm chí không xác định được.",
          en: "As meaning, information has integrity. Incomplete data can distort the resulting information or render it completely indeterminable."
        }
      ]
    },
    quickReview: [
      {
        questionNumber: 1,
        questionVi: "Em hãy cho ví dụ về một thông tin nhưng có nhiều cách thể hiện dữ liệu khác nhau.",
        questionEn: "Give an example where one piece of information is expressed via multiple different data forms.",
        solutionVi: "Ví dụ: Thông tin về \"Thời gian bắt đầu một trận bóng đá vào lúc 19:30 tối nay\" có thể thể hiện bằng:\n- Chữ viết: Thông báo \"Trận đấu bắt đầu lúc 19h30\".\n- Hình ảnh: Áp-phích trận đấu ghi giờ thi đấu.\n- Âm thanh: Lời bình luận viên phát thanh qua loa.",
        solutionEn: "Example: The information that \"A football match starts at 7:30 PM tonight\" can be expressed through:\n- Text: Written announcement \"Match kickoff at 19:30\".\n- Image: A digital poster with the kickoff time.\n- Audio: The stadium announcer's spoken voice."
      },
      {
        questionNumber: 2,
        questionVi: "Em hãy cho ví dụ về một dữ liệu có trong nhiều thông tin khác nhau. Tính toàn vẹn của thông tin được thể hiện như thế nào trong ví dụ này?",
        questionEn: "Give an example of a single datum appearing in multiple distinct information contexts. How is information integrity demonstrated?",
        solutionVi: "Ví dụ: Con số \"100\".\n- Trong thông tin về cuộc thi chạy: \"100 m\" nghĩa là cự li chạy ngắn.\n- Trong thông tin về giá sách: \"100 nghìn đồng\" nghĩa là giá tiền của cuốn sách.\n- Trong bảng điểm thi: \"100 điểm\" nghĩa là điểm số tối đa hoàn hảo.\n* Tính toàn vẹn: Con số 100 nếu đứng một mình (thiếu đơn vị đo và ngữ cảnh) sẽ vô nghĩa hoặc bị hiểu sai. Phải có đầy đủ dữ liệu đi kèm mới bảo đảm được tính toàn vẹn của thông tin.",
        solutionEn: "Example: The number \"100\".\n- In sprinting: \"100 m\" means a sprint distance.\n- In book pricing: \"100 thousand VND\" means the price of the book.\n- In test scoring: \"100 points\" indicates a perfect score.\n* Integrity: The raw number 100 on its own without context or measurement units is ambiguous or easily misinterpreted. Full contextual data is required to preserve information integrity."
      }
    ]
  }
};

export const SECTION_2 = {
  titleVi: "2. ĐƠN VỊ LƯU TRỮ DỮ LIỆU",
  titleEn: "2. DATA STORAGE UNITS",
  contentVi: "Máy tính tổ chức lưu trữ và truy cập dữ liệu không theo từng bit mà theo nhóm bit. Byte là đơn vị dữ liệu nhỏ nhất mà máy tính truy cập được. Một byte gồm 8 bit.\n\nCác máy tính ngày nay đều tổ chức bộ nhớ trong thành những đơn vị lưu trữ có độ dài bằng bội của byte như 2, 4 hay 8 byte. Cách tổ chức như vậy rất tiện cho lưu trữ và truy cập dữ liệu. Chẳng hạn, một đơn vị nhớ 4 byte có thể biểu diễn một số thực, hoặc hai số nguyên 16 bit hoặc vừa đúng 4 kí tự La-tinh. Chính vì vậy có thể lấy byte, vốn là đơn vị tổ chức dữ liệu, làm đơn vị đo lượng lưu trữ dữ liệu (thường được gọi là đơn vị lưu trữ dữ liệu hoặc đơn vị lưu trữ thông tin).\n\nCác đơn vị đo dữ liệu hơn kém nhau 2¹⁰ = 1024 lần.",
  contentEn: "Computers organize, store, and access data not bit-by-bit, but in groups of bits. The Byte is the smallest addressable unit of data that a computer can access. One Byte consists of 8 bits.\n\nModern computers structure internal memory into storage units whose lengths are multiples of bytes, such as 2, 4, or 8 bytes (words). Such organization is exceptionally convenient for storing and fetching data. For instance, a 4-byte memory location can represent a 32-bit floating-point number, two 16-bit integers, or exactly 4 Latin ASCII characters. Therefore, the byte—originally a data organization unit—is adopted as the base unit for measuring data storage capacity (frequently termed data storage units or information storage units).\n\nData measurement units in computing differ from each adjacent unit by 2¹⁰ = 1,024 times.",
  unitsTable: [
    { nameVi: "bit", nameEn: "bit", symbol: "bit", valueVi: "1 bit", valueEn: "1 bit", powerOfTwo: "1 bit", exactBytes: 0.125 },
    { nameVi: "Byte", nameEn: "Byte", symbol: "B", valueVi: "8 bit", valueEn: "8 bits", powerOfTwo: "8 bits", exactBytes: 1 },
    { nameVi: "Kilobyte", nameEn: "Kilobyte", symbol: "KB", valueVi: "2¹⁰ B (1 024 B)", valueEn: "2¹⁰ B (1,024 B)", powerOfTwo: "2¹⁰ B", exactBytes: 1024 },
    { nameVi: "Megabyte", nameEn: "Megabyte", symbol: "MB", valueVi: "2¹⁰ KB (1 024 KB)", valueEn: "2¹⁰ KB (1,024 KB)", powerOfTwo: "2²⁰ B", exactBytes: 1024 ** 2 },
    { nameVi: "Gigabyte", nameEn: "Gigabyte", symbol: "GB", valueVi: "2¹⁰ MB (1 024 MB)", valueEn: "2¹⁰ MB (1,024 MB)", powerOfTwo: "2³⁰ B", exactBytes: 1024 ** 3 },
    { nameVi: "Terabyte", nameEn: "Terabyte", symbol: "TB", valueVi: "2¹⁰ GB (1 024 GB)", valueEn: "2¹⁰ GB (1,024 GB)", powerOfTwo: "2⁴⁰ B", exactBytes: 1024 ** 4 },
    { nameVi: "Petabyte", nameEn: "Petabyte", symbol: "PB", valueVi: "2¹⁰ TB (1 024 TB)", valueEn: "2¹⁰ TB (1,024 TB)", powerOfTwo: "2⁵⁰ B", exactBytes: 1024 ** 5 },
    { nameVi: "Exabyte", nameEn: "Exabyte", symbol: "EB", valueVi: "2¹⁰ PB (1 024 PB)", valueEn: "2¹⁰ PB (1,024 PB)", powerOfTwo: "2⁶⁰ B", exactBytes: 1024 ** 6 },
    { nameVi: "Zettabyte", nameEn: "Zettabyte", symbol: "ZB", valueVi: "2¹⁰ EB (1 024 EB)", valueEn: "2¹⁰ EB (1,024 EB)", powerOfTwo: "2⁷⁰ B", exactBytes: 1024 ** 7 },
    { nameVi: "Yottabyte", nameEn: "Yottabyte", symbol: "YB", valueVi: "2¹⁰ ZB (1 024 ZB)", valueEn: "2¹⁰ ZB (1,024 ZB)", powerOfTwo: "2⁸⁰ B", exactBytes: 1024 ** 8 }
  ],
  exercises: [
    {
      id: "q1-def-byte",
      type: "multiple-choice",
      questionVi: "1. Định nghĩa nào về Byte là đúng?",
      questionEn: "1. Which definition of Byte is correct?",
      optionsVi: [
        "A. Là một kí tự.",
        "B. Là đơn vị dữ liệu 8 bit.",
        "C. Là đơn vị đo tốc độ của máy tính.",
        "D. Là một dãy 8 chữ số."
      ],
      optionsEn: [
        "A. It is a single character.",
        "B. It is an 8-bit unit of data.",
        "C. It is a unit measuring computer speed.",
        "D. It is a sequence of 8 digits."
      ],
      correctIndex: 1,
      explanationVi: "Đáp án đúng là B: Byte là đơn vị dữ liệu gồm 8 bit (đơn vị nhỏ nhất máy tính truy cập được).",
      explanationEn: "Correct answer is B: A Byte is an 8-bit data unit (the smallest unit addressable by a computer)."
    },
    {
      id: "q2-conversions",
      type: "conversion",
      questionVi: "2. Quy đổi các lượng tin sau ra KB:",
      questionEn: "2. Convert the following data quantities into KB:",
      items: [
        {
          label: "a) 3 MB",
          correctValue: 3072,
          stepVi: "3 MB = 3 × 1024 KB = 3 072 KB",
          stepEn: "3 MB = 3 × 1,024 KB = 3,072 KB"
        },
        {
          label: "b) 2 GB",
          correctValue: 2097152,
          stepVi: "2 GB = 2 × 1024 MB = 2 × 1024 × 1024 KB = 2 097 152 KB",
          stepEn: "2 GB = 2 × 1,024 MB = 2 × 1,024 × 1,024 KB = 2,097,152 KB"
        },
        {
          label: "c) 2048 B",
          correctValue: 2,
          stepVi: "2048 B = 2048 / 1024 KB = 2 KB",
          stepEn: "2,048 B = 2,048 / 1,024 KB = 2 KB"
        }
      ]
    }
  ]
};

export const SECTION_3 = {
  titleVi: "3. LƯU TRỮ, XỬ LÍ VÀ TRUYỀN THÔNG BẰNG THIẾT BỊ SỐ",
  titleEn: "3. STORING, PROCESSING, AND COMMUNICATING VIA DIGITAL DEVICES",
  activity2: {
    titleVi: "Hoạt động 2: Thiết bị số và ưu điểm của thiết bị số",
    titleEn: "Activity 2: Digital Devices and Their Advantages",
    introVi: "1. Các thiết bị làm việc với thông tin số như lưu trữ, truyền dữ liệu hay xử lí thông tin số đều được gọi là thiết bị số. Trong các thiết bị dưới đây, thiết bị nào là thiết bị số? Nếu thiết bị không thuộc loại số thì thiết bị số tương ứng với nó (nếu có) là gì?",
    introEn: "1. Devices that operate on digital information—such as storing, transmitting, or processing digital signals—are called digital devices. Among the devices shown, which are digital devices? For non-digital devices, what is their digital counterpart (if any)?",
    devices: [
      {
        id: "watch",
        nameVi: "a) Đồng hồ (kim cơ)",
        nameEn: "a) Mechanical Clock / Watch",
        isDigital: false,
        counterpartVi: "Đồng hồ thông minh (Smartwatch) hoặc đồng hồ điện tử hiển thị số.",
        counterpartEn: "Smartwatch or digital LED/LCD watch.",
        notesVi: "Đồng hồ cơ dùng bánh răng cơ khí, hoạt động tương tự (analog), không dùng tín hiệu nhị phân.",
        notesEn: "Mechanical clocks use physical gears and analog springs, not binary digits."
      },
      {
        id: "vinyl",
        nameVi: "b) Đĩa hát (đĩa than vinyl)",
        nameEn: "b) Vinyl Gramophone Record",
        isDigital: false,
        counterpartVi: "Đĩa CD, thẻ nhớ, ổ USB, hoặc dịch vụ nghe nhạc số trực tuyến (Spotify, Apple Music).",
        counterpartEn: "CD, SD card, USB flash drive, or digital streaming platforms.",
        notesVi: "Đĩa than ghi âm thanh bằng rãnh cơ học tương tự (analog groove), dễ bị xước và suy giảm chất lượng theo thời gian.",
        notesEn: "Vinyl records store audio via mechanical analog grooves, prone to wear and tear."
      },
      {
        id: "wifi",
        nameVi: "c) Bộ thu phát Wifi",
        nameEn: "c) Wi-Fi Router / Access Point",
        isDigital: true,
        counterpartVi: "Là thiết bị số (truyền nhận gói tin số).",
        counterpartEn: "Inherently a digital device (transmits/receives digital data packets).",
        notesVi: "Thiết bị số dùng để truyền nhận thông tin dạng số hóa qua sóng vô tuyến điện.",
        notesEn: "A digital device transmitting digitized data over radio frequencies."
      },
      {
        id: "sdcard",
        nameVi: "d) Thẻ nhớ (Memory Card)",
        nameEn: "d) Flash Memory Card (SD / MicroSD)",
        isDigital: true,
        counterpartVi: "Là thiết bị số (lưu trữ dữ liệu số).",
        counterpartEn: "Inherently a digital device (stores binary data).",
        notesVi: "Thiết bị số sử dụng chip nhớ flash để lưu trữ hàng gigabyte dữ liệu số nhỏ gọn.",
        notesEn: "Solid-state digital storage chip holding gigabytes of binary data in a tiny form factor."
      },
      {
        id: "laptop",
        nameVi: "e) Máy tính xách tay (Laptop)",
        nameEn: "e) Laptop Computer",
        isDigital: true,
        counterpartVi: "Là thiết bị số đa năng (xử lí, lưu trữ, truyền thông).",
        counterpartEn: "General-purpose digital computer (processes, stores, transmits).",
        notesVi: "Thiết bị số hoàn chỉnh bao gồm CPU, RAM, ổ cứng, màn hình, bàn phím và kết nối mạng.",
        notesEn: "A complete digital computing system comprising CPU, RAM, storage, and networking."
      }
    ],
    comparisonPromptVi: "2. Hãy so sánh thiết bị không thuộc loại số ở Hình 1.2 với thiết bị số tương ứng, nếu có.",
    comparisonPromptEn: "2. Compare the non-digital devices in Figure 1.2 with their digital counterparts."
  },
  advantages: {
    storage: {
      titleVi: "Về lưu trữ",
      titleEn: "Regarding Storage",
      contentVi: "Với thiết bị số, người ta có thể lưu trữ một lượng thông tin rất lớn trong một thiết bị nhớ gọn nhẹ với chi phí thấp. Một đĩa cứng khoảng 2 TB có thể chứa một khối lượng thông tin ngang với một thư viện sách của một trường đại học.\nInternet kết nối rất nhiều thiết bị số tạo thành những kho lưu trữ thông tin khổng lồ trong đó có các website chứa rất nhiều thông tin hữu ích. Trên Internet, có thể tìm được hầu hết mọi thông tin bằng các công cụ tìm kiếm.\nLưu trữ thông tin trên thiết bị số còn giúp cho việc tìm kiếm thông tin dễ dàng và nhanh chóng.",
      contentEn: "With digital devices, enormous volumes of information can be preserved inside compact, lightweight media at minimal cost. A 2 TB hard drive can store an amount of text equivalent to an entire university library.\nThe Internet interconnects vast numbers of digital devices into colossal information repositories including millions of knowledge websites. Search engines make virtually all human information discoverable within seconds.\nDigital storage also renders retrieval instantaneous, keyword-searchable, and non-degrading over time."
    },
    processing: {
      titleVi: "Về xử lí",
      titleEn: "Regarding Processing",
      contentVi: "Máy tính xử lí thông tin với tốc độ nhanh và chính xác. Tốc độ xử lí ngày càng được nâng cao. Một máy tính cỡ trung bình ngày nay có thể thực hiện vài chục tỉ phép tính một giây. Thậm chí, một số siêu máy tính đã đạt tốc độ tính toán lên tới hàng trăm triệu tỉ phép tính số học mỗi giây.\nĐể dự báo thời tiết một tuần, các máy tính phải xử lí các dữ liệu lưu trữ từ nhiều năm trước và các thông tin nhiệt độ, khí áp, độ ẩm, hướng và tốc độ gió từ hàng trăm trạm khí tượng chuyển về với hàng trăm tỉ phép tính cần thực hiện. Siêu máy tính là công cụ hỗ trợ hiệu quả để giải quyết các bài toán có khối lượng tính toán lớn như vậy.\nBên cạnh đó, máy tính có thể thực hiện các lệnh một cách chính xác, không sai sót; các máy chủ có thể làm việc nhiều tháng, nhiều năm cung cấp dịch vụ liên tục cho người dùng (người sử dụng). Tóm lại, thực hiện tính toán nhanh, cho kết quả chính xác và ổn định là các ưu điểm tuyệt đối của máy tính so với tính toán thủ công của con người.",
      contentEn: "Computers process information at blazing speed and absolute precision. Computing throughput continues to advance dramatically. An average consumer computer executes tens of billions of instructions per second, while modern supercomputers reach hundreds of quadrillions of floating-point operations per second (petaflops/exaflops).\nTo produce a 7-day weather forecast, computers assimilate decades of climate archives together with real-time temperature, barometric pressure, humidity, and wind vectors from hundreds of meteorological stations, solving complex atmospheric fluid dynamics across billions of numerical computations. Supercomputers are indispensable engines for such heavy calculations.\nFurthermore, computers carry out operations deterministically without human fatigue or calculation mistakes; servers operate continuously 24/7 across months and years providing non-stop services. In summary, ultra-fast computation, absolute accuracy, and enduring reliability represent unmatched superiority over manual human calculation."
    },
    communication: {
      titleVi: "Về truyền thông",
      titleEn: "Regarding Telecommunication",
      contentVi: "Trước đây, tốc độ truyền tin bằng telex chỉ đạt 60 từ một phút. Nhờ tin học và thiết bị số, công nghệ truyền thông đã có những bước tiến dài, tốc độ và độ tin cậy truyền thông tin được cải thiện nhanh chóng. Ngày nay chúng ta đã có thể xem phim qua Internet, có thể tương tác với nhau trên mạng xã hội \"một cách tức thời\". Các gia đình có thể sở hữu các đường cáp quang với tốc độ vài chục Mb/s, tương đương với vài triệu kí tự một giây, điều khó tưởng tượng nếu so với đầu những năm 2000.",
      contentEn: "In the past, telegraph/telex transmission crawled at a mere 60 words per minute. Thanks to informatics and digital devices, communication technology has made monumental leaps; transmission speed and data fidelity have surged exponentially. Today we stream high-definition movies over the Internet and interact globally on social networks instantaneously. Ordinary households enjoy fiber-optic lines transmitting tens to hundreds of Megabits per second—equivalent to millions of characters per second—a feat unimaginable in the early 2000s."
    }
  },
  memorizeBox: {
    titleVi: "HỘP GHI NHỚ (TRANG 10)",
    titleEn: "KEY TAKEAWAY (PAGE 10)",
    bullets: [
      {
        vi: "Giúp xử lí thông tin rất nhanh với độ chính xác cao và có thể làm việc liên tục.",
        en: "Enables ultra-fast information processing with pinpoint accuracy and uninterrupted operation."
      },
      {
        vi: "Có khả năng lưu trữ dữ liệu với dung lượng lớn, giá thành rẻ, tìm kiếm nhanh và dễ dàng.",
        en: "Possesses massive data storage capacity at low cost, with instantaneous and effortless searchability."
      },
      {
        vi: "Có khả năng truyền tin với tốc độ rất lớn.",
        en: "Transmits data across the globe at incredible speeds."
      },
      {
        vi: "Giúp thực hiện tự động nhiều công việc một cách chính xác, chi phí thấp và tiện lợi.",
        en: "Automates complex tasks with precision, reduced operational expenses, and high convenience."
      }
    ]
  },
  reviewQuestions: [
    {
      num: 1,
      questionVi: "1. Em hãy so sánh việc gửi thư theo đường bưu điện và gửi thư điện tử theo các tiêu chí tốc độ, chi phí, khả năng lưu trữ.",
      questionEn: "1. Compare postal mail (traditional mail) and electronic mail (email) across the criteria of speed, cost, and storage capacity.",
      comparisonTable: [
        {
          criteriaVi: "Tốc độ (Speed)",
          criteriaEn: "Speed",
          postalVi: "Chậm (vài ngày đến vài tuần tùy khoảng cách)",
          postalEn: "Slow (days to weeks depending on geographical distance)",
          emailVi: "Gần như tức thời (vài giây)",
          emailEn: "Near-instantaneous (a few seconds globally)"
        },
        {
          criteriaVi: "Chi phí (Cost)",
          criteriaEn: "Cost",
          postalVi: "Tốn tem, phong bì, phí vận chuyển cho mỗi bức thư",
          postalEn: "Requires stamps, envelopes, and postal fees per delivery",
          emailVi: "Gần như miễn phí (chỉ cần kết nối Internet có sẵn)",
          emailEn: "Effectively free (requires only existing internet access)"
        },
        {
          criteriaVi: "Khả năng lưu trữ (Storage)",
          criteriaEn: "Storage",
          postalVi: "Chiếm diện tích vật lí trong tủ, dễ ố vàng, mục nát, thất lạc",
          postalEn: "Takes up physical shelf/cabinet space, susceptible to decay and loss",
          emailVi: "Lưu trữ hàng vạn bức thư trên mây dung lượng lớn, tìm kiếm từ khóa trong 1 giây",
          emailEn: "Stores tens of thousands of messages in the cloud with sub-second keyword search"
        }
      ]
    },
    {
      num: 2,
      questionVi: "2. Giả sử để số hoá một cuốn sách kể cả văn bản và hình ảnh cần khối lượng dữ liệu khoảng 50 MB. Thư viện của một trường có khoảng 2 000 cuốn sách. Nếu số hoá thì cần khoảng bao nhiêu GB để lưu trữ? Có thể chứa nội dung đó trong thẻ nhớ 256 GB hay không?",
      questionEn: "2. Suppose digitizing an illustrated book requires approximately 50 MB. A school library holds about 2,000 books. How many GB are needed to store the entire digital library? Can this be accommodated within a 256 GB memory card?",
      solutionStepsVi: [
        "Bước 1: Tính tổng dung lượng cần thiết bằng MB:",
        "Tổng dung lượng = 2 000 cuốn × 50 MB = 100 000 MB.",
        "Bước 2: Quy đổi từ MB sang GB (theo chuẩn 1 GB = 1024 MB):",
        "100 000 MB ÷ 1024 ≈ 97.66 GB (hoặc ước lượng 100 000 ÷ 1000 = 100 GB theo hệ thập phân).",
        "Bước 3: So sánh với dung lượng thẻ nhớ 256 GB:",
        "Vì 97.66 GB < 256 GB, nên hoàn toàn có thể lưu trữ toàn bộ 2 000 cuốn sách số hoá đó vào một thẻ nhớ 256 GB duy nhất (thậm chí còn dư hơn 158 GB để lưu thêm hàng ngàn cuốn sách mới)!"
      ],
      solutionStepsEn: [
        "Step 1: Calculate total storage required in MB:",
        "Total = 2,000 books × 50 MB = 100,000 MB.",
        "Step 2: Convert from MB to GB (using 1 GB = 1,024 MB):",
        "100,000 MB ÷ 1,024 ≈ 97.66 GB (or roughly 100 GB in decimal system).",
        "Step 3: Compare with the 256 GB memory card:",
        "Since 97.66 GB is much smaller than 256 GB, the entire digitized library of 2,000 volumes easily fits into a single 256 GB card, leaving over 158 GB of spare room!"
      ]
    }
  ]
};

export const PRACTICE_SECTION = {
  titleVi: "LUYỆN TẬP (TRANG 10)",
  titleEn: "PRACTICE EXERCISES (PAGE 10)",
  exercises: [
    {
      num: 1,
      titleVi: "Bài tập 1: Dữ liệu điểm học tập của học sinh",
      titleEn: "Exercise 1: Student Academic Grade Data",
      promptVi: "Từ dữ liệu điểm các môn học của học sinh, có thể rút ra những thông tin gì? Mô tả sơ bộ xử lí để rút ra một thông tin trong số đó.",
      promptEn: "From students' subject grade data, what information can be derived? Describe a preliminary procedure to extract one such piece of information.",
      possibleInfoVi: [
        "Điểm trung bình các môn học (ĐTB học kì, cả năm) của từng học sinh.",
        "Xếp loại học lực của học sinh (Tốt, Khá, Đạt, Chưa đạt).",
        "Danh sách học sinh đạt danh hiệu học sinh xuất sắc, học sinh giỏi.",
        "Môn học nào có điểm trung bình chung cả lớp cao nhất / thấp nhất.",
        "Tỉ lệ học sinh cần phụ đạo ở từng môn."
      ],
      possibleInfoEn: [
        "Semester and annual grade point averages (GPA) for each individual student.",
        "Academic ranking and classification (Excellent, Good, Satisfactory, Needs Improvement).",
        "Honor roll student list.",
        "Subjects with highest/lowest class averages.",
        "Remedial intervention requirements per subject."
      ],
      sampleProcessVi: "Mô tả sơ bộ xử lí tính Điểm trung bình môn học kì:\n1. Đầu vào: Bảng điểm gồm điểm thường xuyên (hệ số 1), điểm giữa kì (hệ số 2) và điểm cuối kì (hệ số 3).\n2. Xử lí: Áp dụng công thức tính tổng điểm có trọng số, chia cho tổng hệ số:\n   ĐTB = (Tổng điểm thường xuyên + 2 × Điểm giữa kì + 3 × Điểm cuối kì) / (Số bài thường xuyên + 5).\n3. Đầu ra: Một con số thực đại diện cho điểm trung bình môn, giúp rút ra thông tin về mức độ tiếp thu môn học của học sinh.",
      sampleProcessEn: "Preliminary procedure to compute Subject Semester GPA:\n1. Input: Grade table containing ongoing test marks (weight 1), midterm mark (weight 2), and final exam mark (weight 3).\n2. Processing: Apply weighted formula: GPA = (Sum of regular marks + 2 × Midterm + 3 × Final) / Total weights.\n3. Output: A single numerical score indicating the student's mastery in that subject."
    },
    {
      num: 2,
      titleVi: "Bài tập 2: Tính toán dung lượng thẻ nhớ máy ảnh số (Hình 1.3)",
      titleEn: "Exercise 2: Calculating Digital Camera Memory Card Capacity (Figure 1.3)",
      promptVi: "Hình 1.3 là danh sách các tệp ảnh lấy ra từ thẻ nhớ của một máy ảnh số. Em hãy tính toán một thẻ nhớ 16 GB có thể chứa được tối đa bao nhiêu ảnh tính theo độ lớn trung bình của ảnh.",
      promptEn: "Figure 1.3 displays a list of photo files extracted from a digital camera's memory card. Calculate the maximum number of photos a 16 GB memory card can hold based on the average file size.",
      figureTable: [
        { name: "DSC0005", date: "4/6/2022 6:51 AM", type: "JPG File", sizeKB: 10144 },
        { name: "DSC00113", date: "4/6/2022 7:04 AM", type: "JPG File", sizeKB: 9888 },
        { name: "DSC00112", date: "4/6/2022 7:11 AM", type: "JPG File", sizeKB: 10016 },
        { name: "DSC00124", date: "4/6/2022 7:15 AM", type: "JPG File", sizeKB: 9440 }
      ],
      stepByStepVi: [
        "Bước 1: Tính kích thước trung bình của một tệp ảnh trong mẫu:",
        "Kích thước TB = (10 144 + 9 888 + 10 016 + 9 440) ÷ 4 = 39 488 ÷ 4 = 9 872 KB.",
        "Bước 2: Quy đổi dung lượng thẻ nhớ 16 GB sang KB:",
        "16 GB = 16 × 1024 MB = 16 × 1024 × 1024 KB = 16 777 216 KB.",
        "Bước 3: Tính số lượng ảnh tối đa có thể lưu trữ:",
        "Số ảnh tối đa = 16 777 216 KB ÷ 9 872 KB ≈ 1 699,47 ảnh.",
        "Kết luận: Thẻ nhớ 16 GB có thể chứa tối đa khoảng 1 699 bức ảnh chụp với chất lượng trung bình như trên."
      ],
      stepByStepEn: [
        "Step 1: Calculate the average file size of the sample photos:",
        "Average size = (10,144 + 9,888 + 10,016 + 9,440) ÷ 4 = 39,488 ÷ 4 = 9,872 KB.",
        "Step 2: Convert the 16 GB memory card capacity into KB:",
        "16 GB = 16 × 1,024 MB = 16 × 1,024 × 1,024 KB = 16,777,216 KB.",
        "Step 3: Calculate maximum allowable photos:",
        "Max photos = 16,777,216 KB ÷ 9,872 KB ≈ 1,699.47 photos.",
        "Conclusion: A 16 GB memory card can accommodate up to approximately 1,699 photos of this average quality."
      ]
    }
  ]
};

export const APPLICATION_SECTION = {
  titleVi: "VẬN DỤNG (TRANG 10)",
  titleEn: "REAL-WORLD APPLICATION (PAGE 10)",
  tasks: [
    {
      num: 1,
      titleVi: "Vận dụng 1: Thẻ căn cước công dân gắn chíp điện tử",
      titleEn: "Application 1: Chip-embedded Citizen Identity Card",
      promptVi: "Trong thẻ căn cước công dân có gắn chip có thông tin về số căn cước, họ tên, ngày sinh, giới tính, quê quán,... được in trên thẻ để đọc trực tiếp. Ngoài ra, các thông tin ấy còn được mã hoá trong QR code và ghi vào chíp nhớ. Theo em, điều đó có lợi gì?",
      promptEn: "On a chip-embedded citizen ID card, identity number, full name, date of birth, gender, and hometown are printed on the surface for direct human reading. In addition, that information is encoded in a QR code and recorded inside the electronic chip. In your opinion, what benefits does this multi-format representation offer?",
      benefitsVi: [
        "1. Đa dạng phương thức tiếp nhận: Con người có thể đọc nhanh bằng mắt thường, điện thoại có thể quét mã QR tức thì, và các cơ quan an ninh có thể đọc dữ liệu mã hóa cấp cao qua đầu đọc thẻ chip.",
        "2. Bảo mật và chống làm giả tuyệt đối: Dữ liệu trong chip và mã QR có chữ ký số điện tử của Bộ Công an, kẻ gian không thể tẩy xóa hay làm giả mạo thẻ vật lý.",
        "3. Tính toàn vẹn và tích hợp đa dữ liệu: Ngoài thông tin cơ bản in trên mặt trước/sau, chip nhớ dung lượng lớn có thể lưu thêm vân tay, nhận diện khuôn mặt sinh trắc học, thẻ bảo hiểm y tế, bằng lái xe,...",
        "4. Tự động hóa thủ tục hành chính: Cho phép xác thực tự động tại sân bay, ngân hàng, bệnh viện mà không cần nhập liệu thủ công bằng tay."
      ],
      benefitsEn: [
        "1. Multi-modal accessibility: Citizens read printed text instantly, mobile cameras scan QR codes for quick verification, while authorities read encrypted cryptographic chip data via specialized readers.",
        "2. Counterfeit prevention & high security: Chip and QR data contain cryptographic signatures from state authorities that cannot be tampered with or forged.",
        "3. Data integrity & comprehensive integration: Beyond basic printed text, the secure microchip stores biometric fingerprints, facial data, health insurance, and driver license integration.",
        "4. Administrative automation: Enables automated paperless authentication at airports, banking counters, and hospitals without tedious manual clerical work."
      ]
    },
    {
      num: 2,
      titleVi: "Vận dụng 2: Vai trò của thiết bị số trong việc làm thay đổi cơ bản việc chụp ảnh",
      titleEn: "Application 2: How Digital Devices Revolutionized Photography",
      promptVi: "Hãy tìm hiểu và mô tả vai trò của thiết bị số trong việc làm thay đổi cơ bản việc chụp ảnh.",
      promptEn: "Investigate and describe the role of digital devices in fundamentally revolutionizing photography.",
      changesVi: [
        "Từ phim hóa học sang cảm biến số: Trước đây chụp máy phim phải cẩn thận từng kiểu (cuộn phim chỉ 24-36 tấm), không được xem trước, phải mang vào phòng tối tráng rửa tốn kém và mất nhiều ngày. Nay cảm biến số (CMOS/CCD) cho phép chụp hàng ngàn kiểu và xem lại ngay trên màn hình.",
        "Chỉnh sửa và xử lí thuật toán tức thì: Máy ảnh số và điện thoại thông minh tích hợp trí tuệ nhân tạo (AI), tự động xóa phông, chống rung, cân bằng sáng HDR và làm đẹp ngay lúc bấm máy.",
        "Lưu trữ khổng lồ và chi phí gần bằng 0: Không cần mua phim, thẻ nhớ và lưu trữ đám mây (Google Photos, iCloud) lưu được hàng triệu bức ảnh qua nhiều năm mà không sợ ẩm mốc hư hại.",
        "Truyền thông và chia sẻ tức thời: Ảnh số có thể gửi qua mạng xã hội, tin nhắn cho bạn bè ở nửa vòng Trái Đất chỉ trong 1 giây."
      ],
      changesEn: [
        "From chemical film to digital sensors: Traditional film required extreme caution (limited to 24–36 frames per roll) with no preview, requiring days of expensive darkroom chemical processing. Digital sensors allow instant preview and thousands of continuous shots.",
        "Real-time algorithmic enhancement: Modern digital cameras and smartphones use digital signal processors and AI for instant autofocus, HDR balancing, optical stabilization, and portrait rendering.",
        "Zero-marginal-cost massive storage: No need to purchase recurring film rolls; solid-state memory cards and cloud vaults preserve millions of photos without chemical deterioration.",
        "Instantaneous global sharing: Digital photos can be transmitted across the world via instant messaging and social platforms within seconds."
      ]
    }
  ]
};

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    questionVi: "Trong tin học, 'dữ liệu' được định nghĩa chính xác là gì?",
    questionEn: "In informatics, what is the precise definition of 'data'?",
    optionsVi: [
      "A. Là tất cả những gì mang lại hiểu biết cho con người.",
      "B. Là thông tin đã được đưa vào máy tính để máy tính có thể nhận biết và xử lí được.",
      "C. Là các thông báo thời tiết trên tivi hàng ngày.",
      "D. Là khả năng tự nhận thức của máy tính."
    ],
    optionsEn: [
      "A. Everything that brings understanding to humans.",
      "B. Information that has been inputted into a computer so it can recognize and process it.",
      "C. Daily television weather announcements.",
      "D. The cognitive self-awareness of computers."
    ],
    correctIndex: 1,
    explanationVi: "Trong tin học, dữ liệu là thông tin đã được số hóa và đưa vào máy tính để xử lí.",
    explanationEn: "In computing, data is information that has been digitized and loaded into a computer for processing."
  },
  {
    id: 2,
    questionVi: "Quá trình xử lí thông tin của máy tính gồm những bước nào theo đúng thứ tự?",
    questionEn: "What are the steps of the computer information processing cycle in correct order?",
    optionsVi: [
      "A. Xử lí dữ liệu -> Tiếp nhận dữ liệu -> Đưa ra kết quả",
      "B. Đưa ra kết quả -> Tiếp nhận dữ liệu -> Xử lí dữ liệu",
      "C. Tiếp nhận dữ liệu -> Xử lí dữ liệu -> Đưa ra kết quả",
      "D. Lưu trữ dữ liệu -> Nhận thức -> Xóa dữ liệu"
    ],
    optionsEn: [
      "A. Process data -> Acquire data -> Output result",
      "B. Output result -> Acquire data -> Process data",
      "C. Receive/Input data -> Process data -> Output result",
      "D. Store data -> Cognitive perception -> Erase data"
    ],
    correctIndex: 2,
    explanationVi: "Theo Hình 1.1 SGK: Tiếp nhận dữ liệu -> Xử lí dữ liệu -> Đưa ra kết quả.",
    explanationEn: "According to Figure 1.1: Data Input -> Data Processing -> Output Result."
  },
  {
    id: 3,
    questionVi: "Một Byte bao gồm bao nhiêu bit?",
    questionEn: "How many bits are there in one Byte?",
    optionsVi: [
      "A. 4 bit",
      "B. 8 bit",
      "C. 10 bit",
      "D. 1024 bit"
    ],
    optionsEn: [
      "A. 4 bits",
      "B. 8 bits",
      "C. 10 bits",
      "D. 1024 bits"
    ],
    correctIndex: 1,
    explanationVi: "1 Byte = 8 bit liên tiếp, là đơn vị dữ liệu nhỏ nhất máy tính truy cập được.",
    explanationEn: "1 Byte = 8 consecutive bits, the smallest addressable data unit."
  },
  {
    id: 4,
    questionVi: "Hai đơn vị đo dữ liệu liền kề nhau trong tin học hơn kém nhau bao nhiêu lần?",
    questionEn: "By what factor do adjacent data storage measurement units differ in computing?",
    optionsVi: [
      "A. 10 lần (10¹)",
      "B. 100 lần (10²)",
      "C. 1000 lần (10³)",
      "D. 1024 lần (2¹⁰)"
    ],
    optionsEn: [
      "A. 10 times (10¹)",
      "B. 100 times (10²)",
      "C. 1,000 times (10³)",
      "D. 1,024 times (2¹⁰)"
    ],
    correctIndex: 3,
    explanationVi: "Các đơn vị đo dữ liệu trong tin học hơn kém nhau 2¹⁰ = 1024 lần.",
    explanationEn: "Digital storage units differ by factors of 2¹⁰ = 1,024."
  },
  {
    id: 5,
    questionVi: "1 Gigabyte (GB) bằng bao nhiêu Megabyte (MB)?",
    questionEn: "How many Megabytes (MB) are in 1 Gigabyte (GB)?",
    optionsVi: [
      "A. 100 MB",
      "B. 1000 MB",
      "C. 1024 MB",
      "D. 2048 MB"
    ],
    optionsEn: [
      "A. 100 MB",
      "B. 1,000 MB",
      "C. 1,024 MB",
      "D. 2,048 MB"
    ],
    correctIndex: 2,
    explanationVi: "1 GB = 2¹⁰ MB = 1024 MB.",
    explanationEn: "1 GB = 2¹⁰ MB = 1,024 MB."
  },
  {
    id: 6,
    questionVi: "Trong các thiết bị sau, thiết bị nào KHÔNG PHẢI là thiết bị số?",
    questionEn: "Which of the following devices is NOT a digital device?",
    optionsVi: [
      "A. Máy tính xách tay (Laptop)",
      "B. Thẻ nhớ MicroSD",
      "C. Đĩa hát than vinyl cổ điển",
      "D. Bộ thu phát sóng Wi-Fi"
    ],
    optionsEn: [
      "A. Laptop computer",
      "B. MicroSD memory card",
      "C. Vintage vinyl gramophone record",
      "D. Wi-Fi router"
    ],
    correctIndex: 2,
    explanationVi: "Đĩa hát than lưu trữ âm thanh bằng rãnh cơ học tương tự (analog), không dùng dữ liệu số nhị phân.",
    explanationEn: "Vinyl records store analog mechanical vibrations, not digital binary data."
  },
  {
    id: 7,
    questionVi: "Câu nào sau đây mô tả đúng nhất về 'tính toàn vẹn' của thông tin?",
    questionEn: "Which statement best describes the 'integrity' of information?",
    optionsVi: [
      "A. Dữ liệu luôn tự động biến thành thông tin mà không cần bất kì ngữ cảnh nào.",
      "B. Thông tin chỉ được hiểu đúng khi có đầy đủ dữ liệu; thiếu dữ liệu có thể làm thông tin sai lệch.",
      "C. Dữ liệu và thông tin hoàn toàn giống hệt nhau.",
      "D. Thông tin không bao giờ bị sai lệch dù dữ liệu bị mất mát."
    ],
    optionsEn: [
      "A. Data automatically becomes information without needing context.",
      "B. Information is only understood accurately when full data and context are present; incomplete data causes distortion.",
      "C. Data and information are strictly identical concepts.",
      "D. Information never changes regardless of missing data."
    ],
    correctIndex: 1,
    explanationVi: "Thông tin có tính toàn vẹn: nếu dữ liệu không đầy đủ hoặc thiếu ngữ cảnh thì thông tin sẽ bị hiểu sai hoặc không xác định được.",
    explanationEn: "Information integrity means accurate meaning relies on complete, uncorrupted data and context."
  },
  {
    id: 8,
    questionVi: "Quy đổi lượng tin 2048 Byte ra đơn vị Kilobyte (KB) ta được kết quả là:",
    questionEn: "Converting 2,048 Bytes into Kilobytes (KB) gives:",
    optionsVi: [
      "A. 1 KB",
      "B. 2 KB",
      "C. 4 KB",
      "D. 20.48 KB"
    ],
    optionsEn: [
      "A. 1 KB",
      "B. 2 KB",
      "C. 4 KB",
      "D. 20.48 KB"
    ],
    correctIndex: 1,
    explanationVi: "2048 B ÷ 1024 = 2 KB.",
    explanationEn: "2,048 B ÷ 1,024 = 2 KB."
  },
  {
    id: 9,
    questionVi: "Đâu KHÔNG PHẢI là ưu điểm của thiết bị số trong lưu trữ và xử lí thông tin?",
    questionEn: "Which of the following is NOT an advantage of digital devices?",
    optionsVi: [
      "A. Tốc độ tính toán siêu nhanh và độ chính xác tuyệt đối.",
      "B. Dung lượng lưu trữ khổng lồ với chi phí thấp.",
      "C. Có cảm xúc và khả năng tự nhận thức độc lập như con người.",
      "D. Khả năng truyền tin toàn cầu với tốc độ cao."
    ],
    optionsEn: [
      "A. Blazing calculation speed and pinpoint accuracy.",
      "B. Massive storage capacity at low cost.",
      "C. Having human-like emotions and independent cognitive awareness.",
      "D. High-speed global telecommunication."
    ],
    correctIndex: 2,
    explanationVi: "Máy tính không tự nhận thức được và không có cảm xúc, máy tính chỉ là công cụ hỗ trợ nhận thức cho con người.",
    explanationEn: "Computers have no self-awareness or emotions; they are tools assisting human cognition."
  },
  {
    id: 10,
    questionVi: "Một đĩa cứng 2 TB có dung lượng tương đương với:",
    questionEn: "A 2 TB hard drive has a storage capacity approximately equivalent to:",
    optionsVi: [
      "A. Một cuốn tập học sinh 96 trang.",
      "B. Một kệ sách nhỏ trong phòng ngủ.",
      "C. Toàn bộ thư viện sách của một trường đại học.",
      "D. 60 từ telex một phút."
    ],
    optionsEn: [
      "A. A 96-page school notebook.",
      "B. A tiny bedroom bookshelf.",
      "C. An entire university library collection.",
      "D. 60 telex words per minute."
    ],
    correctIndex: 2,
    explanationVi: "SGK nêu rõ: 'Một đĩa cứng khoảng 2 TB có thể chứa một khối lượng thông tin ngang với một thư viện sách của một trường đại học'.",
    explanationEn: "The textbook highlights: 'A hard disk of about 2 TB can hold information equivalent to an entire university library.'"
  }
];
