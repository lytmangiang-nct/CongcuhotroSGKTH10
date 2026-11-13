import { TermDefinition } from './lessonData';
import { QuizQuestion } from './lesson2Data';

export const LESSON_4_GLOSSARY: TermDefinition[] = [
  {
    id: 'binary-system',
    termEn: 'Binary Numeral System (Base-2)',
    termVi: 'Hệ nhị phân (Hệ đếm cơ số 2)',
    ipa: '/ˈbaɪ.nər.i ˈsɪs.təm/',
    definitionVi: 'Hệ đếm cơ số 2 chỉ sử dụng hai chữ số là 0 và 1. Mỗi vị trí chữ số có giá trị bằng luỹ thừa của 2, gấp 2 lần vị trí ngay bên phải nó.',
    definitionEn: 'A base-2 numeral system that represents numeric values using two symbols: 0 and 1. Each positional digit represents a power of 2, twice the value of the position to its right.',
    exampleVi: 'Số 1101₂ = 1×2³ + 1×2² + 0×2¹ + 1×2⁰ = 8 + 4 + 0 + 1 = 13 trong hệ thập phân.',
    exampleEn: 'Binary number 1101₂ equals 1×2³ + 1×2² + 0×2¹ + 1×2⁰ = 8 + 4 + 0 + 1 = 13 in decimal.',
    sgkContext: 'Mục 1a - Trang 20 SGK Tin học 10'
  },
  {
    id: 'bit',
    termEn: 'Bit (Binary Digit)',
    termVi: 'Bit (Chữ số nhị phân)',
    ipa: '/bɪt/',
    definitionVi: 'Đơn vị thông tin cơ bản nhất trong máy tính, viết tắt từ binary digit. Mỗi bit chỉ có thể nhận một trong hai trạng thái: 0 hoặc 1.',
    definitionEn: 'The most basic unit of information in computing and digital communications, a portmanteau of binary digit. A bit can hold only one of two values: 0 or 1.',
    exampleVi: 'Một byte gồm 8 bit liên tiếp, ví dụ 10010011.',
    exampleEn: 'One byte consists of 8 consecutive bits, such as 10010011.',
    sgkContext: 'Mục 1a - Trang 20 SGK Tin học 10'
  },
  {
    id: 'successive-division',
    termEn: 'Successive Division by 2 Algorithm',
    termVi: 'Thuật toán chia liên tiếp cho 2',
    ipa: '/səkˈses.ɪv dɪˈvɪʒ.ən baɪ tuː/',
    definitionVi: 'Thuật toán chuyển đổi một số nguyên dương từ hệ thập phân sang hệ nhị phân bằng cách chia liên tiếp cho 2 lấy số dư cho tới khi thương bằng 0, sau đó viết các số dư theo thứ tự ngược lại từ dưới lên.',
    definitionEn: 'The algorithm to convert a positive integer from decimal to binary by repeatedly dividing by 2 and recording the remainders until the quotient reaches zero, then reading the remainders in reverse order.',
    exampleVi: 'Đổi 19 sang nhị phân: 19:2=9 dư 1, 9:2=4 dư 1, 4:2=2 dư 0, 2:2=1 dư 0, 1:2=0 dư 1. Đọc ngược: 10011₂.',
    exampleEn: 'Converting 19 to binary: 19/2=9 r1, 9/2=4 r1, 4/2=2 r0, 2/2=1 r0, 1/2=0 r1. Reading upward yields 10011₂.',
    sgkContext: 'Mục 1b - Trang 21 SGK Tin học 10 (Hình 4.1)'
  },
  {
    id: 'fixed-point',
    termEn: 'Fixed-Point Representation',
    termVi: 'Biểu diễn dấu phẩy tĩnh',
    ipa: '/fɪkst pɔɪnt ˌreprɪzenˈteɪʃn/',
    definitionVi: 'Phương pháp biểu diễn số trong máy tính với vị trí dấu phân cách (dấu phẩy) được ấn định cố định. Số nguyên được biểu diễn dưới dạng dấu phẩy tĩnh với dấu phẩy ngầm định ở cuối cùng bên phải.',
    definitionEn: 'A method of representing numbers in computers where the radix point has a fixed position. Integers are represented in fixed-point form with the radix point implicitly at the far right.',
    exampleVi: 'Biểu diễn số nguyên trong 1 byte hoặc 2 byte dấu phẩy tĩnh.',
    exampleEn: 'Integer representation in 1 byte or 2 bytes using fixed-point format.',
    sgkContext: 'Mục 1c - Trang 21 SGK Tin học 10'
  },
  {
    id: 'floating-point',
    termEn: 'Floating-Point Representation',
    termVi: 'Biểu diễn dấu phẩy động',
    ipa: '/ˈfləʊ.tɪŋ pɔɪnt ˌreprɪzenˈteɪʃn/',
    definitionVi: 'Phương pháp biểu diễn số thực trong máy tính cho phép dấu phẩy có thể thay đổi vị trí tự do theo dạng khoa học m × 2^e, giúp biểu diễn được các số cực lớn hoặc cực nhỏ.',
    definitionEn: 'A method of representing real numbers where the radix point can float dynamically, typically formatted as m × 2^e, enabling representation of very large or tiny quantities.',
    exampleVi: 'Số thực 3.14159 được lưu trong bộ nhớ dưới dạng chuẩn IEEE 754 dấu phẩy động.',
    exampleEn: 'Real number 3.14159 is stored in memory using the IEEE 754 floating-point standard.',
    sgkContext: 'Mục 1c - Trang 21 SGK Tin học 10'
  },
  {
    id: 'unsigned-integer',
    termEn: 'Unsigned Integer',
    termVi: 'Số nguyên không dấu',
    ipa: '/ʌnˈsaɪnd ˈɪn.tɪ.dʒər/',
    definitionVi: 'Số nguyên chỉ nhận giá trị không âm (≥ 0). Toàn bộ các bit đều được dùng để biểu diễn độ lớn của số. 1 byte biểu diễn từ 0 đến 255; 2 byte từ 0 đến 65535.',
    definitionEn: 'An integer that represents only non-negative numbers (≥ 0). All bits are utilized to encode the magnitude. An 8-bit unsigned integer spans 0 to 255; a 16-bit spans 0 to 65535.',
    exampleVi: 'Với 1 byte (8 bit): giá trị nhỏ nhất là 00000000₂ = 0, lớn nhất là 11111111₂ = 255.',
    exampleEn: 'In 1 byte (8 bits): minimum is 00000000₂ = 0, maximum is 11111111₂ = 255.',
    sgkContext: 'Mục 1c - Trang 21 SGK Tin học 10'
  },
  {
    id: 'signed-integer',
    termEn: 'Signed Integer',
    termVi: 'Số nguyên có dấu',
    ipa: '/saɪnd ˈɪn.tɪ.dʒər/',
    definitionVi: 'Số nguyên có thể nhận cả giá trị âm và dương. Bit có trọng số lớn nhất (tận cùng bên trái) được quy ước làm bit dấu: 0 biểu diễn số dương (+), 1 biểu diễn số âm (-).',
    definitionEn: 'An integer data type that can represent both positive and negative values. The most significant bit (far left) is reserved as the sign bit: 0 for positive (+), 1 for negative (-).',
    exampleVi: 'Bit đầu tiên là 0 quy ước dấu (+), bit đầu tiên là 1 quy ước dấu (-).',
    exampleEn: 'The first bit 0 denotes positive (+), while 1 denotes negative (-).',
    sgkContext: 'Mục 1c - Trang 21 SGK Tin học 10'
  },
  {
    id: 'sign-magnitude',
    termEn: 'Sign-Magnitude Representation',
    termVi: 'Mã thuận (Dấu - Lượng)',
    ipa: '/saɪn ˈmæɡ.nɪ.tʃuːd/',
    definitionVi: 'Cách biểu diễn số nguyên có dấu trong đó bit tận cùng bên trái là bit dấu (0: dương, 1: âm), các bit còn lại giữ nguyên giá trị độ lớn nhị phân tuyệt đối của số đó.',
    definitionEn: 'A signed number representation where the leftmost bit indicates the sign (0: positive, 1: negative), while the remaining bits represent the absolute magnitude of the number.',
    exampleVi: 'Trong 1 byte: +19 biểu diễn là 00010011₂; -19 biểu diễn mã thuận là 10010011₂.',
    exampleEn: 'In 1 byte: +19 is encoded as 00010011₂; -19 in sign-magnitude is 10010011₂.',
    sgkContext: 'Mục 1c - Trang 21 SGK Tin học 10'
  },
  {
    id: 'ones-complement',
    termEn: "One's Complement",
    termVi: 'Mã bù 1 (Mã đảo)',
    ipa: '/wʌnz ˈkɒm.plɪ.mənt/',
    definitionVi: 'Cách biểu diễn số âm bằng cách giữ nguyên bit dấu là 1 và đảo ngược tất cả các bit độ lớn của số dương tương ứng (0 đổi thành 1, 1 đổi thành 0).',
    definitionEn: "A binary signed number representation where negative numbers are formed by preserving sign bit 1 and inverting all bits of the corresponding positive binary number (0s become 1s, 1s become 0s).",
    exampleVi: 'Số +19 là 00010011₂, mã bù 1 của -19 là 11101100₂.',
    exampleEn: 'Positive +19 is 00010011₂; the one\'s complement of -19 is 11101100₂.',
    sgkContext: 'Mục 1c - Trang 21 SGK Tin học 10'
  },
  {
    id: 'twos-complement',
    termEn: "Two's Complement",
    termVi: 'Mã bù 2',
    ipa: '/tuːz ˈkɒm.plɪ.mənt/',
    definitionVi: 'Cách biểu diễn số âm trong máy tính hiện đại được tạo thành bằng cách lấy mã bù 1 cộng thêm 1. Cho phép mạch cộng số học (ALU) thực hiện phép trừ thông qua phép cộng.',
    definitionEn: "The standard binary signed number representation in modern computers formed by adding 1 to the one's complement. It allows the ALU to perform subtraction using simple addition circuitry.",
    exampleVi: 'Mã bù 1 của -19 là 11101100₂, cộng thêm 1 ta được mã bù 2 là 11101101₂.',
    exampleEn: "One's complement of -19 is 11101100₂; adding 1 yields the two's complement 11101101₂.",
    sgkContext: 'Mục 1c - Trang 21 SGK Tin học 10 & Vận dụng 2 Trang 23'
  },
  {
    id: 'binary-addition',
    termEn: 'Binary Addition & Carry Bit',
    termVi: 'Phép cộng nhị phân & Bit nhớ',
    ipa: '/ˈbaɪ.nər.i əˈdɪʃ.ən ænd ˈkær.i bɪt/',
    definitionVi: 'Phép cộng hai số nhị phân thực hiện theo cột từ phải sang trái. Khi 1 + 1 = 10₂, ta viết 0 và nhớ 1 sang vị trí bên trái. Nếu có bit nhớ cộng thêm 1 + 1 + 1 = 11₂, viết 1 nhớ 1.',
    definitionEn: 'Column addition of binary numbers from right to left. When 1 + 1 = 10₂, write 0 and carry 1 to the next left column. With carry, 1 + 1 + 1 = 11₂, write 1 and carry 1.',
    exampleVi: '11011₂ (27) + 11010₂ (26) = 110101₂ (53).',
    exampleEn: '11011₂ (27) + 11010₂ (26) = 110101₂ (53).',
    sgkContext: 'Mục 2a & 2b - Trang 22 SGK Tin học 10 (Hình 4.2)'
  },
  {
    id: 'binary-multiplication',
    termEn: 'Binary Multiplication',
    termVi: 'Phép nhân nhị phân',
    ipa: '/ˈbaɪ.nər.i ˌmʌl.tɪ.plɪˈkeɪ.ʃən/',
    definitionVi: 'Phép nhân hai số nhị phân tương tự hệ thập phân, mỗi tích riêng bằng chính thừa số thứ nhất (nếu nhân với 1) hoặc toàn 0 (nếu nhân với 0), lùi dần sang trái và cộng dồn lại.',
    definitionEn: 'Binary multiplication works like decimal multiplication, where each partial product is either identical to the multiplicand (multiplied by 1) or all zeros (multiplied by 0), shifted left and summed.',
    exampleVi: '1101₂ (13) × 101₂ (5) = 1000001₂ (65).',
    exampleEn: '1101₂ (13) × 101₂ (5) = 1000001₂ (65).',
    sgkContext: 'Mục 2c - Trang 22 SGK Tin học 10 (Hình 4.3)'
  },
  {
    id: 'calculation-pipeline',
    termEn: 'Computer Calculation Pipeline',
    termVi: 'Quy trình tính toán 3 bước của máy tính',
    ipa: '/kəmˈpjuː.tər ˌkæl.kjəˈleɪ.ʃən ˈpaɪp.laɪn/',
    definitionVi: 'Quy trình xử lý phép tính của máy tính gồm 3 bước: 1. Mã hoá dữ liệu từ thập phân sang nhị phân; 2. Thực hiện phép tính số học bằng nhị phân trong ALU; 3. Giải mã kết quả sang thập phân để hiển thị.',
    definitionEn: 'The three-stage computing pipeline: 1. Encode human decimal data into binary; 2. Execute binary calculation in the ALU; 3. Decode binary results back to decimal for user display.',
    exampleVi: 'Nhập "125 + 17" -> Máy tính đổi sang 1111101₂ + 10001₂ = 10001110₂ -> Giải mã hiển thị 142.',
    exampleEn: 'Input "125 + 17" -> Encoded to 1111101₂ + 10001₂ = 10001110₂ -> Decoded to display 142.',
    sgkContext: 'Mục Luyện tập - Trang 23 SGK Tin học 10 (Hình 4.4)'
  }
];

export const LESSON_4_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: 'Hệ nhị phân (hệ đếm cơ số 2) sử dụng bao nhiêu chữ số để biểu diễn mọi giá trị?',
    questionEn: 'How many digits does the binary numeral system (base-2) use to represent all values?',
    optionsVi: ['2 chữ số: 0 và 1', '10 chữ số: từ 0 đến 9', '8 chữ số: từ 0 đến 7', '16 chữ số: từ 0 đến F'],
    optionsEn: ['2 digits: 0 and 1', '10 digits: 0 through 9', '8 digits: 0 through 7', '16 digits: 0 through F'],
    correctIndex: 0,
    explanationVi: 'Hệ nhị phân là hệ đếm cơ số 2, chỉ sử dụng hai chữ số duy nhất là 0 và 1. Mỗi chữ số nhị phân được gọi là một bit (binary digit).',
    explanationEn: 'The binary numeral system is a base-2 system that uses only two digits: 0 and 1. Each binary digit is called a bit.'
  },
  {
    id: 2,
    questionVi: 'Trong hệ nhị phân, giá trị của mỗi vị trí chữ số có đặc điểm gì so với vị trí ngay bên phải nó?',
    questionEn: 'In the binary system, what is the value relationship of a positional digit compared to the digit immediately to its right?',
    optionsVi: [
      'Gấp 2 lần vị trí ngay bên phải nó',
      'Gấp 10 lần vị trí ngay bên phải nó',
      'Bằng đúng vị trí ngay bên phải nó',
      'Gấp 8 lần vị trí ngay bên phải nó'
    ],
    optionsEn: [
      'Twice (2x) the value of the position to its right',
      'Ten times (10x) the value of the position to its right',
      'Equal to the position to its right',
      'Eight times (8x) the value of the position to its right'
    ],
    correctIndex: 0,
    explanationVi: 'Tương tự hệ thập phân mỗi vị trí gấp 10 lần bên phải (10⁰, 10¹, 10²...), trong hệ nhị phân mỗi vị trí có giá trị gấp 2 lần vị trí ngay bên phải nó (2⁰, 2¹, 2², 2³...).',
    explanationEn: 'Just as each decimal position is worth 10x its right neighbor, each binary position is worth 2x the position to its right (powers of 2: 2⁰, 2¹, 2²...).'
  },
  {
    id: 3,
    questionVi: 'Số nhị phân 1101₂ có giá trị tương ứng bằng bao nhiêu trong hệ thập phân?',
    questionEn: 'What is the equivalent decimal value of the binary number 1101₂?',
    optionsVi: ['13', '11', '15', '9'],
    optionsEn: ['13', '11', '15', '9'],
    correctIndex: 0,
    explanationVi: 'Phân tích: 1101₂ = 1×2³ + 1×2² + 0×2¹ + 1×2⁰ = 8 + 4 + 0 + 1 = 13 (SGK Trang 20).',
    explanationEn: 'Calculation: 1101₂ = 1×2³ + 1×2² + 0×2¹ + 1×2⁰ = 8 + 4 + 0 + 1 = 13.'
  },
  {
    id: 4,
    questionVi: 'Khi đổi số nguyên dương 19 từ hệ thập phân sang hệ nhị phân bằng thuật toán chia 2 liên tiếp, ta thu được kết quả là:',
    questionEn: 'When converting positive integer 19 from decimal to binary via successive division by 2, what is the result?',
    optionsVi: ['10011₂', '11001₂', '10101₂', '11101₂'],
    optionsEn: ['10011₂', '11001₂', '10101₂', '11101₂'],
    correctIndex: 0,
    explanationVi: '19:2=9 dư 1; 9:2=4 dư 1; 4:2=2 dư 0; 2:2=1 dư 0; 1:2=0 dư 1. Đọc số dư ngược từ dưới lên ta được: 10011₂ (Hình 4.1 SGK Trang 21).',
    explanationEn: '19/2=9 r1; 9/2=4 r1; 4/2=2 r0; 2/2=1 r0; 1/2=0 r1. Reading remainders bottom-to-top gives 10011₂.'
  },
  {
    id: 5,
    questionVi: 'Một byte (8 bit) có thể biểu diễn được bao nhiêu giá trị số nguyên không dấu (unsigned integer)?',
    questionEn: 'How many unsigned integer values can be represented in a single byte (8 bits)?',
    optionsVi: [
      '256 giá trị (từ 0 đến 255)',
      '128 giá trị (từ 0 đến 127)',
      '512 giá trị (từ 0 đến 511)',
      '65536 giá trị (từ 0 đến 65535)'
    ],
    optionsEn: [
      '256 values (from 0 to 255)',
      '128 values (from 0 to 127)',
      '512 values (from 0 to 511)',
      '65536 values (from 0 to 65535)'
    ],
    correctIndex: 0,
    explanationVi: 'Với n bit, số lượng số nguyên không dấu biểu diễn được là 2ⁿ giá trị từ 0 đến 2ⁿ - 1. Với 1 byte (8 bit), biểu diễn từ 0 đến 2⁸ - 1 = 255 (tổng cộng 256 giá trị, SGK Trang 21).',
    explanationEn: 'With n bits, an unsigned integer spans 0 to 2ⁿ - 1. For 1 byte (8 bits), the range is 0 to 255, giving 256 total values.'
  },
  {
    id: 6,
    questionVi: 'Khi biểu diễn số nguyên có dấu trong máy tính, bit tận cùng bên trái quy ước điều gì?',
    questionEn: 'When representing signed integers in computers, what does the leftmost bit indicate?',
    optionsVi: [
      'Bit dấu: 0 biểu diễn dấu dương (+), 1 biểu diễn dấu âm (-)',
      'Bit dấu: 1 biểu diễn dấu dương (+), 0 biểu diễn dấu âm (-)',
      'Chỉ số độ ưu tiên tính toán của vi xử lý',
      'Độ dài số lượng bit còn lại'
    ],
    optionsEn: [
      'Sign bit: 0 denotes positive (+), 1 denotes negative (-)',
      'Sign bit: 1 denotes positive (+), 0 denotes negative (-)',
      'Processor computational priority flag',
      'Length descriptor of remaining bits'
    ],
    correctIndex: 0,
    explanationVi: 'Theo quy ước quốc tế chuẩn SGK Tin học 10 Trang 21, bit ngoài cùng bên trái là bit dấu: bit 0 biểu diễn số dương (+), bit 1 biểu diễn số âm (-).',
    explanationEn: 'Under computer architecture standards and SGK page 21, the leftmost bit is the sign bit: 0 indicates positive (+) and 1 indicates negative (-).'
  },
  {
    id: 7,
    questionVi: 'Mã bù 2 của một số nguyên âm được tạo lập bằng cách nào?',
    questionEn: "How is the two's complement of a negative integer formed?",
    optionsVi: [
      'Lấy mã bù 1 (đảo tất cả các bit của số dương tương ứng) rồi cộng thêm 1',
      'Đảo bit dấu từ 0 thành 1 và giữ nguyên tất cả các bit độ lớn',
      'Chỉ đảo ngược các bit 0 thành 1 mà không cộng thêm gì',
      'Lấy số dương trừ đi 1 rồi đảo bit'
    ],
    optionsEn: [
      "Invert all bits to form one's complement, then add 1",
      'Change only the sign bit from 0 to 1 and keep magnitude bits',
      'Only invert 0s to 1s without adding anything',
      'Subtract 1 from the positive number then invert bits'
    ],
    correctIndex: 0,
    explanationVi: 'Theo SGK Trang 21: Mã bù 2 được lập bằng cách lấy mã bù 1 cộng thêm 1 (Mã bù 2 = Mã bù 1 + 1). Ví dụ: số -19 có mã bù 1 là 11101100, cộng thêm 1 thành mã bù 2 là 11101101.',
    explanationEn: "According to SGK page 21: Two's complement is formed by adding 1 to the one's complement (Two's complement = One's complement + 1)."
  },
  {
    id: 8,
    questionVi: 'Kết quả của phép cộng hai số nhị phân: 1 + 1 trong hệ nhị phân bằng bao nhiêu?',
    questionEn: 'What is the result of binary addition 1 + 1 in the binary system?',
    optionsVi: ['10₂ (viết 0, nhớ 1 sang hàng bên trái)', '2', '11₂', '0'],
    optionsEn: ['10₂ (write 0, carry 1 to the left column)', '2', '11₂', '0'],
    correctIndex: 0,
    explanationVi: 'Trong hệ nhị phân không có chữ số 2. Vì 1 + 1 = 2₁₀ = 10₂, ta viết chữ số 0 ở hàng hiện tại và nhớ 1 sang hàng có trọng số cao hơn bên trái (Bảng 4.1 SGK Trang 22).',
    explanationEn: 'The binary digit 2 does not exist. Since 1 + 1 = 2 in decimal = 10₂, we write 0 and carry 1 to the next left column.'
  },
  {
    id: 9,
    questionVi: 'Thực hiện phép tính cộng nhị phân: 11011₂ + 11010₂ ta được kết quả là:',
    questionEn: 'Perform binary addition: 11011₂ + 11010₂. What is the result?',
    optionsVi: ['110101₂ (tương ứng 27 + 26 = 53)', '101101₂ (tương ứng 45)', '111101₂ (tương ứng 61)', '100101₂ (tương ứng 37)'],
    optionsEn: ['110101₂ (equivalent to 27 + 26 = 53)', '101101₂ (equivalent to 45)', '111101₂ (equivalent to 61)', '100101₂ (equivalent to 37)'],
    correctIndex: 0,
    explanationVi: 'Hình 4.2 SGK Trang 22: 11011₂ (27) + 11010₂ (26) = 110101₂ (53). Cộng từng cột từ phải sang trái có các bit nhớ chính xác.',
    explanationEn: 'Figure 4.2 SGK Page 22: 11011₂ (27) + 11010₂ (26) = 110101₂ (53).'
  },
  {
    id: 10,
    questionVi: 'Tại sao hầu hết các máy tính hiện nay đều sử dụng mã bù 2 để biểu diễn số nguyên có dấu?',
    questionEn: "Why do virtually all modern computers use two's complement representation for signed integers?",
    optionsVi: [
      'Cho phép mạch cộng ALU thực hiện cả phép cộng và phép trừ mà không cần thiết kế mạch trừ riêng',
      'Vì mã bù 2 tiết kiệm dung lượng bộ nhớ hơn mã thuận gấp 2 lần',
      'Vì mã bù 2 không cần dùng bit dấu bên trái',
      'Vì mã bù 2 chỉ áp dụng được với số dương'
    ],
    optionsEn: [
      'Allows the ALU adder to handle both addition and subtraction without dedicated subtraction hardware',
      "Because two's complement uses half the storage memory of sign-magnitude",
      "Because two's complement eliminates the need for a sign bit",
      "Because two's complement only applies to positive numbers"
    ],
    correctIndex: 0,
    explanationVi: 'Theo mục Vận dụng 2 (SGK Trang 23): Sử dụng mã bù 2 cho phép biến phép trừ A - B thành phép cộng A + (-B), nhờ đó bộ số học lôgic (ALU) của CPU chỉ cần duy nhất mạch cộng, giúp tối giản mạch điện tử và tăng tốc độ xử lý.',
    explanationEn: "Two's complement transforms subtraction A - B into addition A + (-B), enabling the CPU's ALU to execute all operations using only adder circuits, simplifying hardware and boosting speed."
  }
];
