import { TermDefinition } from './lessonData';
import { QuizQuestion } from './lesson2Data';

export const LESSON_3_GLOSSARY: TermDefinition[] = [
  {
    id: 'data-type',
    termEn: 'Data Type',
    termVi: 'Kiểu dữ liệu',
    ipa: '/ˈdeɪ.tə taɪp/',
    definitionVi: 'Tập hợp các giá trị mà một dữ liệu có thể nhận và tập hợp các phép toán có thể thực hiện trên các giá trị đó (như kiểu số, văn bản, lôgic, đa phương tiện).',
    definitionEn: 'A classification of data that tells the compiler or interpreter how the programmer intends to use the data and what operations can be performed on it.',
    exampleVi: 'Kiểu số thực hiện được phép cộng, trừ; kiểu văn bản thực hiện được phép nối xâu, tìm kiếm.',
    exampleEn: 'Numeric types support arithmetic addition and subtraction; text types support string concatenation and search.'
  },
  {
    id: 'text-data',
    termEn: 'Text Data',
    termVi: 'Dữ liệu văn bản',
    ipa: '/tekst ˈdeɪ.tə/',
    definitionVi: 'Dữ liệu bao gồm các ký tự chữ cái, chữ số, dấu câu và các ký hiệu đặc biệt, dùng để thể hiện ngôn ngữ viết của con người trong máy tính.',
    definitionEn: 'Data consisting of alphabetic characters, digits, punctuation marks, and special symbols used to represent written human language in computers.',
    exampleVi: 'Họ tên "Nguyễn Thành Công", địa chỉ "Hà Nội" là dữ liệu dạng văn bản.',
    exampleEn: 'Names such as "Nguyen Thanh Cong" and addresses are examples of text data.'
  },
  {
    id: 'character-encoding',
    termEn: 'Character Encoding / Representation',
    termVi: 'Biểu diễn thông tin & Mã hoá kí tự',
    ipa: '/ˈkær.ək.tər ɪnˈkəʊ.dɪŋ/',
    definitionVi: 'Quá trình gán một mã nhị phân (dãy các bit 0 và 1) duy nhất cho mỗi kí tự trong một tập kí tự đã cho theo quy ước chuẩn.',
    definitionEn: 'The process of assigning a unique binary sequence of bits to each character in a character set according to standardized conventions.',
    exampleVi: 'Kí tự "A" được mã hoá thành dãy bit 01000001 (mã số 65 trong bảng ASCII).',
    exampleEn: 'Character "A" is encoded as binary 01000001 (decimal 65 in the ASCII table).'
  },
  {
    id: 'ascii',
    termEn: 'ASCII (American Standard Code for Information Interchange)',
    termVi: 'Bảng mã ASCII',
    ipa: '/ˈæski/',
    definitionVi: 'Chuẩn mã hoá kí tự phổ biến nhất ban đầu dùng 7 bit (biểu diễn 128 kí tự từ 0 đến 127) phục vụ tiếng Anh và các lệnh điều khiển.',
    definitionEn: 'The most widespread early character encoding standard using 7 bits (representing 128 characters from 0 to 127) for English text and control codes.',
    exampleVi: 'Bảng mã 7 bit gồm 26 chữ cái in hoa, 26 chữ in thường, 10 chữ số (0-9) và các dấu câu.',
    exampleEn: 'Standard 7-bit ASCII includes 26 uppercase letters, 26 lowercase letters, 10 digits (0-9), and punctuation.'
  },
  {
    id: 'extended-ascii',
    termEn: 'Extended ASCII (8-bit ASCII)',
    termVi: 'Bảng mã ASCII mở rộng',
    ipa: '/ɪkˈstendɪd ˈæski/',
    definitionVi: 'Bảng mã sử dụng 8 bit (256 kí tự, từ 0 đến 255), trong đó 128 vị trí đầu giữ nguyên ASCII chuẩn, 128 vị trí bổ sung dùng cho ký tự các quốc gia khác.',
    definitionEn: 'An 8-bit character encoding (256 characters from 0 to 255) retaining the original 128 ASCII codes while adding 128 positions for regional characters.',
    exampleVi: 'Ghép 4 bit chỉ số hàng với 4 bit chỉ số cột trong bảng mã để có mã nhị phân 8 bit.',
    exampleEn: 'Combining the 4-bit row index with the 4-bit column index yields an 8-bit binary code.'
  },
  {
    id: 'unicode',
    termEn: 'Unicode (Universal Character Set)',
    termVi: 'Bảng mã Unicode',
    ipa: '/ˈjuː.nɪ.kəʊd/',
    definitionVi: 'Bộ mã tiêu chuẩn quốc tế nhất quán được thiết kế để mã hoá mọi kí tự của tất cả các ngôn ngữ viết trên thế giới, hỗ trợ hàng trăm nghìn kí tự.',
    definitionEn: 'An international encoding standard designed to represent every character from every written language in the world consistently, accommodating hundreds of thousands of characters.',
    exampleVi: 'Unicode giúp một trang web hiển thị đồng thời cả tiếng Việt, tiếng Anh, tiếng Trung, tiếng Nhật và tiếng Ả Rập mà không bị lỗi phông.',
    exampleEn: 'Unicode allows a webpage to display Vietnamese, English, Chinese, Japanese, and Arabic simultaneously without font errors.'
  },
  {
    id: 'utf-8',
    termEn: 'UTF-8 (8-bit Unicode Transformation Format)',
    termVi: 'Định dạng mã hoá UTF-8',
    ipa: '/ˌjuː.tiː.ef ˈeɪt/',
    definitionVi: 'Hệ thống định dạng chuyển đổi mã hoá Unicode có độ dài biến thiên (từ 1 đến 4 byte). Tiếng Việt thường được mã hoá từ 1 đến 3 byte.',
    definitionEn: 'A variable-width character encoding format for Unicode using 1 to 4 bytes. Vietnamese characters typically require 1 to 3 bytes.',
    exampleVi: 'Chữ cái La-tinh không dấu dùng 1 byte; nguyên âm tiếng Việt có dấu và đ/Đ dùng 2 byte.',
    exampleEn: 'Unaccented Latin characters use 1 byte; accented Vietnamese vowels and đ/Đ use 2 bytes.'
  },
  {
    id: 'tcvn-6909',
    termEn: 'TCVN 6909:2001 Standard',
    termVi: 'Tiêu chuẩn TCVN 6909:2001',
    ipa: '/ˌtiː.siː.viːˈen/',
    definitionVi: 'Tiêu chuẩn quốc gia Việt Nam ban hành năm 2001 quy định Bộ mã kí tự chữ Việt 16 bit phù hợp hoàn toàn với bộ mã quốc tế Unicode.',
    definitionEn: 'Vietnamese national standard issued in 2001 specifying a 16-bit Vietnamese character set fully compliant with international Unicode.',
    exampleVi: 'Năm 2017, Việt Nam ban hành quy định bắt buộc sử dụng UTF-8 trong trao đổi văn bản điện tử cơ quan nhà nước.',
    exampleEn: 'In 2017, Vietnam mandated the use of UTF-8 for official electronic document exchange.'
  },
  {
    id: 'digitization',
    termEn: 'Text Digitization',
    termVi: 'Số hoá văn bản',
    ipa: '/ˌdɪdʒ.ɪ.taɪˈzeɪ.ʃən/',
    definitionVi: 'Quá trình chuyển đổi văn bản từ dạng tài liệu in ấn hay chữ viết tay trên giấy sang dạng dữ liệu điện tử lưu trữ trong máy tính.',
    definitionEn: 'The process of converting printed or handwritten text on paper into digital data stored and processed in computers.',
    exampleVi: 'Sử dụng phần mềm soạn thảo Word/Writer, công nghệ nhận dạng ký tự quang học (OCR) hoặc nhận dạng giọng nói để tạo tệp văn bản.',
    exampleEn: 'Using Word/Writer processors, Optical Character Recognition (OCR), or speech-to-text recognition to create text files.'
  },
  {
    id: 'vscii',
    termEn: 'VSCII / TCVN 5712:1993',
    termVi: 'Bảng mã VSCII (TCVN 5712:1993)',
    ipa: '/vɪsˈkaɪ/',
    definitionVi: 'Bảng mã tiêu chuẩn Việt Nam cũ dựa trên ASCII 8-bit, sử dụng các mã điều khiển không in được để đưa một số ký tự tiếng Việt vào.',
    definitionEn: 'An early Vietnamese standard 8-bit character encoding based on ASCII, utilizing non-printable control positions to include Vietnamese characters.',
    exampleVi: 'VSCII không đủ vị trí thuận lợi cho mọi ký tự hoa-thường và thường xung đột với các lệnh điều khiển.',
    exampleEn: 'VSCII lacked sufficient positions for full case mapping and often conflicted with ASCII control codes.'
  },
  {
    id: 'font',
    termEn: 'Typeface / Font',
    termVi: 'Phông chữ',
    ipa: '/fɒnt/',
    definitionVi: 'Tập hợp các hình ảnh đồ hoạ (glyph) thể hiện hình dạng hiển thị của các ký tự tương ứng với mã số của chúng trong bảng mã.',
    definitionEn: 'A set of graphical representations (glyphs) that determine the visual display of characters corresponding to their code points in a character set.',
    exampleVi: 'Phông chữ Times New Roman, Arial, Roboto, Open Sans được thiết kế hiển thị chuẩn Unicode tiếng Việt.',
    exampleEn: 'Typefaces like Times New Roman, Arial, Roboto, and Open Sans are designed to render Vietnamese Unicode characters accurately.'
  }
];

export const LESSON_3_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: "Trong máy tính, việc mã hoá thông tin thành dữ liệu nhị phân được gọi là gì?",
    questionEn: "In computers, what is the process of converting information into binary data called?",
    optionsVi: [
      "Biểu diễn thông tin",
      "Tính toán số học",
      "Lưu trữ đám mây",
      "Phân giải đồ hoạ"
    ],
    optionsEn: [
      "Information representation / encoding",
      "Arithmetic computation",
      "Cloud storage",
      "Graphic resolution"
    ],
    correctIndex: 0,
    explanationVi: "Theo SGK Tin học 10 (Trang 16): Việc mã hoá thông tin thành dữ liệu nhị phân được gọi là biểu diễn thông tin. Biểu diễn thông tin là bước đầu để đưa thông tin vào máy tính.",
    explanationEn: "According to Informatics 10 (Page 16): Encoding information into binary data is called information representation. It is the prerequisite step for inputting data into computers."
  },
  {
    id: 2,
    questionVi: "Sơ đồ phân loại các kiểu dữ liệu thường gặp trong chương trình tin học phổ thông (Hình 3.2 SGK) gồm 4 nhóm chính nào?",
    questionEn: "What are the four main data types introduced in high school informatics (Figure 3.2)?",
    optionsVi: [
      "Văn bản, Số, Lôgic, Đa phương tiện (âm thanh, hình ảnh)",
      "Số nguyên, Số thực, Phân số, Số phức",
      "Bàn phím, Chuột, Màn hình, Máy in",
      "Byte, Kilobyte, Megabyte, Gigabyte"
    ],
    optionsEn: [
      "Text, Number, Logic, Multimedia (audio, image)",
      "Integer, Real, Fraction, Complex number",
      "Keyboard, Mouse, Monitor, Printer",
      "Byte, Kilobyte, Megabyte, Gigabyte"
    ],
    correctIndex: 0,
    explanationVi: "Hình 3.2 SGK Trang 16 phân loại dữ liệu thành 4 nhóm: Văn bản, Số, Lôgic và Đa phương tiện (âm thanh, hình ảnh).",
    explanationEn: "Figure 3.2 (Page 16) categorizes data into four groups: Text, Numbers, Logic, and Multimedia (audio, image)."
  },
  {
    id: 3,
    questionVi: "Tại sao số Thẻ Căn cước công dân (12 chữ số) hay số điện thoại nên được lưu trữ dưới kiểu văn bản thay vì kiểu số?",
    questionEn: "Why should Citizen Identity Card numbers (12 digits) or phone numbers be stored as text data rather than numeric data?",
    optionsVi: [
      "Vì không cần thực hiện các phép tính số học (cộng, trừ), cần giữ số 0 ở đầu và hỗ trợ tìm kiếm, so sánh, tách chuỗi",
      "Vì máy tính không thể lưu được số có 12 chữ số",
      "Vì kiểu số luôn tốn dung lượng gấp 10 lần kiểu văn bản",
      "Vì căn cước công dân bắt buộc phải in ra giấy"
    ],
    optionsEn: [
      "Because they do not require arithmetic calculations, preserve leading zeros, and need searching, comparison, and string slicing",
      "Because computers cannot store 12-digit numbers",
      "Because numeric types always consume 10 times more memory than text",
      "Because identity cards must be printed on paper"
    ],
    correctIndex: 0,
    explanationVi: "Số CCCD không dùng để cộng trừ nhân chia. Kiểu văn bản giúp giữ nguyên chữ số '0' ở đầu (ví dụ: '001000456789') và dễ dàng tra cứu, so sánh xâu.",
    explanationEn: "Citizen ID numbers do not undergo arithmetic operations. Text format retains leading zeros (e.g., '001...') and enables string matching and searching."
  },
  {
    id: 4,
    questionVi: "Bảng mã ASCII chuẩn ban đầu sử dụng bao nhiêu bit để biểu diễn một kí tự, và thể hiện được tối đa bao nhiêu kí tự khác nhau?",
    questionEn: "How many bits did the original standard ASCII table use per character, and how many unique characters could it represent?",
    optionsVi: [
      "7 bit, thể hiện được đúng 128 (2^7) kí tự",
      "8 bit, thể hiện được 256 kí tự",
      "16 bit, thể hiện được 65536 kí tự",
      "4 bit, thể hiện được 16 kí tự"
    ],
    optionsEn: [
      "7 bits, representing exactly 128 (2^7) characters",
      "8 bits, representing 256 characters",
      "16 bits, representing 65536 characters",
      "4 bits, representing 16 characters"
    ],
    correctIndex: 0,
    explanationVi: "SGK Trang 17 nêu rõ: Ban đầu bảng mã ASCII dùng 7 bit, với 128 (2^7) mã khác nhau (từ 0 đến 127), chỉ đủ dùng cho bảng chữ cái tiếng Anh.",
    explanationEn: "Textbook page 17 states: Originally ASCII used 7 bits with 128 (2^7) distinct codes (0 to 127), sufficient only for the English alphabet."
  },
  {
    id: 5,
    questionVi: "Trong bảng mã ASCII mở rộng (8 bit), kí tự chữ hoa 'A' có số thứ tự thập phân là 65. Mã nhị phân 8 bit tương ứng của 'A' là:",
    questionEn: "In the 8-bit extended ASCII table, uppercase 'A' has decimal code 65. What is its corresponding 8-bit binary representation?",
    optionsVi: [
      "01000001",
      "01000010",
      "01100001",
      "10000001"
    ],
    optionsEn: [
      "01000001",
      "01000010",
      "01100001",
      "10000001"
    ],
    correctIndex: 0,
    explanationVi: "Số 65 trong hệ nhị phân bằng 64 + 1 = 01000001 (ghép 4 bit chỉ số hàng 0100 với 4 bit chỉ số cột 0001).",
    explanationEn: "Decimal 65 converts to binary as 64 + 1 = 01000001 (combining 4-bit row 0100 with 4-bit column 0001)."
  },
  {
    id: 6,
    questionVi: "Tại sao bảng mã ASCII mở rộng (8 bit với 256 kí tự) không đáp ứng được đầy đủ nhu cầu của tất cả các ngôn ngữ trên thế giới?",
    questionEn: "Why is extended 8-bit ASCII (256 characters) inadequate for all world languages?",
    optionsVi: [
      "Vì chỉ có 128 vị trí mở rộng, trong khi riêng tiếng Việt đã có 134 nguyên âm có dấu và đ/Đ, còn chữ tượng hình (Trung, Nhật) có tới hàng chục nghìn kí tự",
      "Vì ASCII mở rộng chạy quá chậm trên máy tính hiện đại",
      "Vì ASCII không hỗ trợ các chữ số từ 0 đến 9",
      "Vì Mỹ cấm các nước khác sử dụng bảng mã ASCII"
    ],
    optionsEn: [
      "Because only 128 extended slots exist, whereas Vietnamese alone has 134 accented vowels and d-stroke characters, and ideographic scripts (Chinese, Japanese) have tens of thousands",
      "Because extended ASCII runs too slowly on modern computers",
      "Because ASCII does not support digits from 0 to 9",
      "Because the US restricted foreign use of ASCII"
    ],
    correctIndex: 0,
    explanationVi: "SGK Trang 17-18 giải thích: 128 vị trí mở rộng không đủ chứa 134 ký tự tiếng Việt có dấu, và hoàn toàn bất lực trước hàng chục nghìn chữ tượng hình Á Đông.",
    explanationEn: "Textbook pages 17-18 explain: 128 extended slots cannot accommodate 134 Vietnamese accented characters, and are vastly insufficient for Asian ideographs."
  },
  {
    id: 7,
    questionVi: "Lí do chính dẫn đến sự ra đời của bảng mã Unicode là gì? (Câu hỏi Luyện tập 2 - Trang 19 SGK)",
    questionEn: "What is the primary reason for developing the Unicode standard? (Practice Question 2 - Page 19)",
    optionsVi: [
      "Dùng một bảng mã chung cho mọi quốc gia, giải quyết vấn đề thiếu vị trí cho bộ kí tự của một số quốc gia, đáp ứng nhu cầu dùng nhiều ngôn ngữ đồng thời trong cùng một ứng dụng",
      "Để giảm giá thành phần cứng và bộ nhớ máy tính",
      "Chỉ dành riêng cho các quốc gia sử dụng chữ tượng hình",
      "Để thay thế hoàn toàn mạng Internet và phần mềm văn phòng"
    ],
    optionsEn: [
      "To provide a single unified character set for all nations, solving character space shortages and enabling multilingual support in single applications",
      "To reduce computer hardware and memory costs",
      "Strictly for nations using ideographic scripts",
      "To completely replace the Internet and office software"
    ],
    correctIndex: 0,
    explanationVi: "Theo SGK Trang 18 & 19: Unicode là bảng mã hợp nhất quốc tế, tránh tình trạng xung đột mã, cho phép hiển thị đồng thời nhiều ngôn ngữ trong cùng một ứng dụng.",
    explanationEn: "According to pages 18 & 19: Unicode is a unified international standard preventing encoding conflicts and enabling concurrent multilingual applications."
  },
  {
    id: 8,
    questionVi: "Trong bảng mã UNICODE theo định dạng UTF-8, mỗi kí tự Tiếng Việt được biểu diễn bởi bao nhiêu byte? (Câu hỏi 2 - Trang 18 SGK)",
    questionEn: "In Unicode under UTF-8 format, how many bytes are used to represent a Vietnamese character? (Question 2 - Page 18)",
    optionsVi: [
      "Từ 1 đến 3 byte",
      "Đúng 1 byte",
      "Đúng 2 byte",
      "Cố định 4 byte"
    ],
    optionsEn: [
      "From 1 to 3 bytes",
      "Exactly 1 byte",
      "Exactly 2 bytes",
      "Fixed 4 bytes"
    ],
    correctIndex: 0,
    explanationVi: "Đáp án D trang 18 SGK: Kí tự La-tinh không dấu dùng 1 byte, nguyên âm có dấu và đ/Đ dùng 2 byte, một số rất ít kí tự đặc biệt dùng 3 byte. Do đó từ 1 đến 3 byte.",
    explanationEn: "Answer D (Page 18): Plain Latin letters use 1 byte, accented vowels and d-stroke letters use 2 bytes, and rare symbols use 3 bytes. Hence, 1 to 3 bytes."
  },
  {
    id: 9,
    questionVi: "Việc số hoá văn bản trong máy tính có thể được thực hiện qua các hình thức nào? (Mục 2c Trang 18 SGK)",
    questionEn: "Through which methods can text digitization be performed in modern computers? (Section 2c Page 18)",
    optionsVi: [
      "Nhập từ bàn phím bằng phần mềm soạn thảo (Word, Writer), quét ảnh nhận dạng quang học (OCR) hoặc đọc lời bằng nhận dạng tiếng nói",
      "Chỉ duy nhất gõ thủ công từng chữ bằng bàn phím",
      "Chụp ảnh màn hình điện thoại mà không lưu thành văn bản",
      "Ghi âm vào băng cassette tương tự"
    ],
    optionsEn: [
      "Keyboard entry via word processors (Word, Writer), optical character recognition (OCR) scanning, or voice speech-to-text recognition",
      "Exclusively by manual keyboard typing",
      "Taking screenshots without storing text data",
      "Recording onto analog cassette tapes"
    ],
    correctIndex: 0,
    explanationVi: "SGK Trang 18 nêu rõ: Số hoá văn bản thực hiện bằng phần mềm soạn thảo (Word, Writer) và gần đây có thể nhập văn bản trực tiếp bằng công nghệ nhận dạng tiếng nói.",
    explanationEn: "Textbook page 18 highlights word processors (Word, Writer) and modern voice speech-to-text recognition as key digitization methods."
  },
  {
    id: 10,
    questionVi: "Phông chữ (Font) có mối quan hệ như thế nào với bảng mã ký tự? (Mục Vận dụng 2 - Trang 19 SGK)",
    questionEn: "What is the relationship between fonts and character encoding sets? (Application Question 2 - Page 19)",
    optionsVi: [
      "Phông chữ là hình ảnh đồ họa của kí tự ứng với mã số của kí tự trong bảng mã. Phông chữ phải được thiết kế tương thích với bảng mã (ví dụ: phông Unicode cho bảng mã Unicode)",
      "Phông chữ chính là bảng mã, hai khái niệm này hoàn toàn đồng nhất",
      "Mọi phông chữ đều tự động hiển thị đúng tiếng Việt không cần bảng mã",
      "Bảng mã quy định kiểu dáng chữ nghiêng hay đậm của phông chữ"
    ],
    optionsEn: [
      "A font is the visual representation of characters matching their code points; fonts must be designed to support the target encoding (e.g. Unicode fonts for Unicode)",
      "Fonts and character encodings are identical concepts",
      "All fonts automatically render Vietnamese correctly without encoding",
      "Character encodings define font styles like italics or bold"
    ],
    correctIndex: 0,
    explanationVi: "SGK Trang 19 khẳng định: Phông chữ là hình ảnh của kí tự ứng với mã của kí tự. Phông chữ phải có đủ bản vẽ (glyph) cho các mã tiếng Việt Unicode (như Times New Roman, Arial, Roboto).",
    explanationEn: "Textbook page 19 confirms: Fonts provide visual glyphs corresponding to character code points and must include glyphs for Vietnamese Unicode code points."
  }
];

// Interactive matching data for Lesson 3 Practice Question 1 (Giấy phép lái xe)
export interface LicenseMatchItem {
  id: string;
  fieldVi: string;
  fieldEn: string;
  exampleValue: string;
  correctType: 'Số' | 'Văn bản' | 'Hình ảnh' | 'Âm thanh';
  explanationVi: string;
}

export const LICENSE_MATCH_ITEMS: LicenseMatchItem[] = [
  {
    id: 'photo',
    fieldVi: 'Ảnh chân dung',
    fieldEn: 'Portrait Photo',
    exampleValue: 'Ảnh thẻ 3x4 của người lái xe',
    correctType: 'Hình ảnh',
    explanationVi: 'Ảnh chân dung trên GPLX là dữ liệu đồ hoạ hình ảnh (đa phương tiện).'
  },
  {
    id: 'license_num',
    fieldVi: 'Số Giấy phép lái xe (Số / No.)',
    fieldEn: 'Driver License Number',
    exampleValue: '1357924680',
    correctType: 'Văn bản',
    explanationVi: 'Số GPLX là dãy ký tự số dùng để định danh, không dùng để tính toán cộng trừ và cần giữ nguyên chuỗi số, do đó thuộc kiểu Văn bản.'
  },
  {
    id: 'full_name',
    fieldVi: 'Họ tên (Full name)',
    fieldEn: 'Full Name',
    exampleValue: 'NGUYỄN THÀNH CÔNG',
    correctType: 'Văn bản',
    explanationVi: 'Họ tên là chuỗi các ký tự chữ cái, thuộc kiểu dữ liệu Văn bản.'
  },
  {
    id: 'birth_date',
    fieldVi: 'Ngày sinh (Date of birth)',
    fieldEn: 'Date of Birth',
    exampleValue: '01/01/2000',
    correctType: 'Văn bản',
    explanationVi: 'Ngày tháng năm sinh có dấu gạch chéo phân cách, được lưu trữ dưới dạng chuỗi ký tự văn bản hoặc kiểu ngày tháng chuyên biệt.'
  },
  {
    id: 'nationality',
    fieldVi: 'Quốc tịch (Nationality)',
    fieldEn: 'Nationality',
    exampleValue: 'VIỆT NAM',
    correctType: 'Văn bản',
    explanationVi: 'Tên quốc gia là các ký tự chữ cái, thuộc kiểu Văn bản.'
  },
  {
    id: 'residence',
    fieldVi: 'Nơi cư trú (Place of residence)',
    fieldEn: 'Place of Residence',
    exampleValue: 'Phường Mộ Lao, Quận Hà Đông, Hà Nội',
    correctType: 'Văn bản',
    explanationVi: 'Địa chỉ nơi ở là văn bản mô tả gồm nhiều từ và dấu phẩy.'
  }
];

// ASCII interactive lookup data
export interface AsciiLookupRecord {
  char: string;
  dec: number;
  hex: string;
  bin: string;
  description: string;
}

export const SAMPLE_ASCII_RECORDS: AsciiLookupRecord[] = [
  { char: 'A', dec: 65, hex: '41', bin: '01000001', description: 'Chữ in hoa A (Ví dụ SGK Trang 17)' },
  { char: 'B', dec: 66, hex: '42', bin: '01000010', description: 'Chữ in hoa B' },
  { char: 'C', dec: 67, hex: '43', bin: '01000011', description: 'Chữ in hoa C' },
  { char: 'G', dec: 71, hex: '47', bin: '01000111', description: 'Chữ G trong từ SGK (Câu hỏi 1 Tr. 18)' },
  { char: 'K', dec: 75, hex: '4B', bin: '01001011', description: 'Chữ K trong từ SGK (Câu hỏi 1 Tr. 18)' },
  { char: 'S', dec: 83, hex: '53', bin: '01010011', description: 'Chữ S trong từ SGK (Câu hỏi 1 Tr. 18)' },
  { char: 'a', dec: 97, hex: '61', bin: '01100001', description: 'Chữ thường a' },
  { char: '0', dec: 48, hex: '30', bin: '00110000', description: 'Chữ số 0' },
  { char: '9', dec: 57, hex: '39', bin: '00111001', description: 'Chữ số 9' },
  { char: 'Space', dec: 32, hex: '20', bin: '00100000', description: 'Ký tự khoảng trắng (Space)' }
];
