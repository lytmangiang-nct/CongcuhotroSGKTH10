import { TermDefinition } from './lessonData';
import { QuizQuestion } from './lesson2Data';

export const LESSON_6_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: 'Phương pháp cơ bản và phổ biến nhất để số hoá âm thanh trong máy tính là gì?',
    questionEn: 'What is the most fundamental and common method for digitizing audio in computers?',
    optionsVi: [
      'A. Điều chế mã xung (Pulse Code Modulation - PCM)',
      'B. Mã hoá ký tự Unicode (UTF-8)',
      'C. Nén ảnh ma trận điểm ảnh Bitmap',
      'D. Điều chế tần số FM Analog'
    ],
    optionsEn: [
      'A. Pulse Code Modulation (PCM)',
      'B. Unicode Character Encoding (UTF-8)',
      'C. Bitmap Pixel Matrix Compression',
      'D. Analog FM Frequency Modulation'
    ],
    correctIndex: 0,
    explanationVi: 'Theo mục 1a Trang 28 SGK Tin học 10, phương pháp cơ bản số hoá âm thanh là điều chế mã xung (Pulse Code Modulation, viết tắt là PCM) thực hiện qua các bước: lấy mẫu, biểu diễn giá trị mẫu và biểu diễn âm thanh.',
    explanationEn: 'According to Section 1a, Page 28 of Informatics 10 Textbook, the fundamental method of digitizing audio is Pulse Code Modulation (PCM), performed via sampling, quantization/value representation, and binary representation.'
  },
  {
    id: 2,
    questionVi: 'Khoảng thời gian giữa hai lần lấy mẫu liên tiếp trong quá trình số hoá âm thanh được gọi là gì?',
    questionEn: 'What is the time interval between two consecutive samples in audio digitization called?',
    optionsVi: [
      'A. Biên độ tín hiệu (Signal amplitude)',
      'B. Chu kì lấy mẫu (Sampling period)',
      'C. Tốc độ bit (Bit-rate)',
      'D. Độ sâu màu (Bit depth)'
    ],
    optionsEn: [
      'A. Signal amplitude',
      'B. Sampling period',
      'C. Bit-rate',
      'D. Bit depth'
    ],
    correctIndex: 1,
    explanationVi: 'Theo Bước 1 mục 1a Trang 28 SGK, lấy giá trị biên độ tín hiệu ở những thời điểm rời rạc cách đều nhau; khoảng thời gian giữa hai lần lấy mẫu gọi là chu kì lấy mẫu.',
    explanationEn: 'According to Step 1 of Section 1a on Page 28, signal amplitude values are measured at discrete, equidistant moments; the time interval between two sample measurements is called the sampling period.'
  },
  {
    id: 3,
    questionVi: 'Khi số hoá âm thanh, nếu chu kì lấy mẫu tăng lên (thời gian giữa 2 lần lấy mẫu lâu hơn) thì lượng thông tin lưu trữ sẽ thay đổi thế nào?',
    questionEn: 'When digitizing audio, if the sampling period increases (longer intervals between samples), how does the amount of stored information change?',
    optionsVi: [
      'A. Tăng lên vì cần nhiều bit hơn',
      'B. Giảm đi vì số lượng mẫu trong 1 giây ít hơn',
      'C. Không thay đổi vì biên độ vẫn giữ nguyên',
      'D. Tăng gấp đôi do tín hiệu tương tự'
    ],
    optionsEn: [
      'A. Increases because more bits are needed',
      'B. Decreases because fewer samples are recorded per second',
      'C. Remains unchanged because amplitude stays the same',
      'D. Doubles due to analog signal behavior'
    ],
    correctIndex: 1,
    explanationVi: 'Theo câu hỏi 1 trang 29 SGK, khi chu kì lấy mẫu tăng thì số lượng mẫu lấy được trong một đơn vị thời gian giảm đi, do đó lượng thông tin lưu trữ sẽ giảm (nhưng âm thanh sẽ kém trung thực hơn).',
    explanationEn: 'According to Question 1 on Page 29, when the sampling period increases, fewer samples are collected per second, thereby decreasing the amount of stored data (though fidelity is reduced).'
  },
  {
    id: 4,
    questionVi: 'Tốc độ bit (Bit-rate, ví dụ 128 Kb/s hay 128 Kbps) trong biểu diễn âm thanh có ý nghĩa là gì?',
    questionEn: 'What does bit-rate (e.g., 128 Kb/s or 128 Kbps) represent in digital audio?',
    optionsVi: [
      'A. Số bit cần thiết để biểu diễn một giây âm thanh',
      'B. Tổng dung lượng của toàn bộ tệp bài hát tính theo Megabyte',
      'C. Số lượng loa tối đa có thể phát cùng lúc',
      'D. Tần số sóng âm cao nhất mà tai người nghe được'
    ],
    optionsEn: [
      'A. The number of bits required to represent one second of audio',
      'B. The total file size of a music file in Megabytes',
      'C. The maximum number of speakers playing simultaneously',
      'D. The highest sound frequency audible to the human ear'
    ],
    correctIndex: 0,
    explanationVi: 'Theo mục 1a Trang 29 SGK, số bit cần thiết để biểu diễn được một giây âm thanh gọi là tốc độ bit (bit-rate). 128 Kb/s nghĩa là mỗi giây âm thanh cần 128 Kilobit dữ liệu.',
    explanationEn: 'According to Section 1a, Page 29 of the textbook, the number of bits required to represent one second of audio is called the bit-rate. 128 Kb/s means 128 Kilobits of data are processed every second.'
  },
  {
    id: 5,
    questionVi: 'Định dạng tệp âm thanh nào sau đây là định dạng nén có mất mát thông tin (lossy compression) phổ biến nhất?',
    questionEn: 'Which of the following audio file formats is the most common lossy compressed format?',
    optionsVi: [
      'A. .wav (PCM nguyên gốc)',
      'B. .mp3 (MPEG Audio Layer III)',
      'C. .flac (Free Lossless Audio Codec)',
      'D. .alac (Apple Lossless Audio Codec)'
    ],
    optionsEn: [
      'A. .wav (Raw PCM)',
      'B. .mp3 (MPEG Audio Layer III)',
      'C. .flac (Free Lossless Audio Codec)',
      'D. .alac (Apple Lossless Audio Codec)'
    ],
    correctIndex: 1,
    explanationVi: 'Theo mục 1b Trang 29 SGK, Mp3 là định dạng nén bỏ bớt một phần thông tin âm thanh nhưng chất lượng vẫn chấp nhận được, làm giảm kích thước tệp khoảng 10 lần so với định dạng wav của PCM.',
    explanationEn: 'According to Section 1b on Page 29, MP3 is a lossy compression format that removes imperceptible audio data while preserving acceptable quality, reducing file size approximately 10 times compared to uncompressed PCM WAV.'
  },
  {
    id: 6,
    questionVi: 'Hình ảnh hiển thị trên màn hình máy tính, điện thoại hay ti vi hiện đại sử dụng hệ màu cơ bản nào?',
    questionEn: 'Which fundamental color model is used to display images on computer monitors, smartphones, and TVs?',
    optionsVi: [
      'A. Đỏ - Vàng - Lam (RBY)',
      'B. Đỏ - Lục - Lam (Red - Green - Blue / RGB)',
      'C. Xanh lơ - Hồng sẫm - Vàng (CMY)',
      'D. Đen - Trắng - Xám (Monochrome)'
    ],
    optionsEn: [
      'A. Red - Yellow - Blue (RBY)',
      'B. Red - Green - Blue (RGB)',
      'C. Cyan - Magenta - Yellow (CMY)',
      'D. Black - White - Gray (Monochrome)'
    ],
    correctIndex: 1,
    explanationVi: 'Theo Hoạt động 2 và mục 2 Trang 30 SGK, màn hình máy tính hay ti vi dùng hệ 3 màu cơ bản: Đỏ (Red) - Xanh lá cây (Green) - Xanh dương (Blue), viết tắt là hệ màu RGB.',
    explanationEn: 'According to Activity 2 and Section 2 on Page 30, computer screens and TVs use the three primary additive colors: Red, Green, and Blue, abbreviated as the RGB color model.'
  },
  {
    id: 7,
    questionVi: 'Phần tử ảnh nhỏ nhất cấu thành nên hình ảnh kỹ thuật số trong tiếng Anh được gọi là gì?',
    questionEn: 'What is the smallest individual picture element composing a digital image called in English?',
    optionsVi: [
      'A. Bit (Binary digit)',
      'B. Pixel (Picture element)',
      'C. Byte',
      'D. Diode'
    ],
    optionsEn: [
      'A. Bit (Binary digit)',
      'B. Pixel (Picture element)',
      'C. Byte',
      'D. Diode'
    ],
    correctIndex: 1,
    explanationVi: 'Theo mục 2 Trang 30 SGK, điểm ảnh trong tiếng Anh gọi là pixel (viết tắt của picture element – phần tử ảnh). Ảnh lưu thông tin theo từng điểm ảnh gọi là ảnh bitmap.',
    explanationEn: 'According to Section 2 on Page 30, an image dot in English is called a pixel (short for picture element). An image storing individual pixel data is known as a bitmap image.'
  },
  {
    id: 8,
    questionVi: 'Trong ảnh màu 24 bit thông dụng (hệ RGB), mỗi màu cơ bản (R, G, B) được mã hoá bởi bao nhiêu bit và tạo ra bao nhiêu màu?',
    questionEn: 'In a standard 24-bit color image (RGB system), how many bits encode each primary color and how many total colors are possible?',
    optionsVi: [
      'A. Mỗi màu 4 bit, tạo ra 4.096 màu',
      'B. Mỗi màu 8 bit (256 sắc độ), tạo ra khoảng 16,7 triệu màu (256³)',
      'C. Mỗi màu 16 bit, tạo ra 65.536 màu',
      'D. Mỗi màu 1 bit, tạo ra 8 màu'
    ],
    optionsEn: [
      'A. 4 bits per channel, producing 4,096 colors',
      'B. 8 bits per channel (256 shades), producing ~16.7 million colors (256³)',
      'C. 16 bits per channel, producing 65,536 colors',
      'D. 1 bit per channel, producing 8 colors'
    ],
    correctIndex: 1,
    explanationVi: 'Theo mục 2 Trang 30 SGK, ảnh màu thông dụng có độ sâu màu 24 bit, mỗi màu cơ bản được mã hoá bởi 8 bit (từ 0 đến 255). Tổng cộng có 256³ tổ hợp tạo ra khoảng 16,7 triệu sắc độ màu khác nhau.',
    explanationEn: 'According to Section 2 on Page 30, standard color images use a 24-bit depth, where each primary channel is encoded by 8 bits (0 to 255). There are 256³ combinations, yielding ~16.7 million distinct color shades.'
  },
  {
    id: 9,
    questionVi: 'Nếu một bảng quảng cáo đèn LED (Hình 6.9 SGK) chỉ có 2 trạng thái sáng (bật) hoặc tắt tại mỗi vị trí bóng đèn thì độ sâu màu là bao nhiêu?',
    questionEn: 'If an LED display board (Textbook Figure 6.9) only has 2 states (ON or OFF) at each lamp position, what is its bit depth?',
    optionsVi: [
      'A. 1 bit (vì 2¹ = 2 trạng thái: bật/tắt)',
      'B. 8 bit (vì dùng 1 byte)',
      'C. 24 bit (hệ RGB)',
      'D. 16 bit (High Color)'
    ],
    optionsEn: [
      'A. 1 bit (since 2¹ = 2 states: on/off)',
      'B. 8 bits (since 1 byte is used)',
      'C. 24 bits (RGB system)',
      'D. 16 bits (High Color)'
    ],
    correctIndex: 0,
    explanationVi: 'Theo bài Luyện tập 1 Trang 32 SGK, mỗi vị trí bóng LED chỉ có 2 trạng thái là sáng hoặc tối (tương tự 1 và 0), do đó số bit cần thiết để mã hóa trạng thái của 1 điểm ảnh là 1 bit.',
    explanationEn: 'According to Practice Exercise 1 on Page 32, each LED lamp position only has two states: on or off (equivalent to 1 and 0), hence the bit depth required is 1 bit.'
  },
  {
    id: 10,
    questionVi: 'Phát biểu nào sau đây là ĐÚNG khi nói về định dạng tệp ảnh .png?',
    questionEn: 'Which statement is TRUE regarding the .png image file format?',
    optionsVi: [
      'A. .png là định dạng nén có mất mát chất lượng ảnh rất nhiều',
      'B. .png có độ nén tốt, không mất mát chất lượng và có thể có nền trong suốt',
      'C. .png không thể hiển thị được trên các trình duyệt web hiện đại',
      'D. .png chỉ lưu trữ được ảnh đen trắng với độ sâu màu 1 bit'
    ],
    optionsEn: [
      'A. .png is a lossy compression format causing significant quality degradation',
      'B. .png has good lossless compression and supports transparent backgrounds',
      'C. .png cannot be rendered on modern web browsers',
      'D. .png can only store monochrome images with 1-bit depth'
    ],
    correctIndex: 1,
    explanationVi: 'Theo mục Biểu diễn ảnh bitmap Trang 31 SGK, định dạng ".png" có độ nén tốt, không mất mát chất lượng (lossless) và có thể có nền trong suốt để chồng ảnh mà không che ảnh dưới nền.',
    explanationEn: 'According to the Bitmap Representation section on Page 31, the .png format provides excellent lossless compression and supports alpha-channel transparency, allowing overlay without obscuring underlying imagery.'
  }
];

export const LESSON_6_GLOSSARY: TermDefinition[] = [
  {
    id: 'pcm',
    termVi: 'Điều chế mã xung (PCM)',
    termEn: 'Pulse Code Modulation (PCM)',
    ipa: '/pʌls koʊd ˌmɑːdʒəˈleɪʃn/',
    definitionVi: 'Phương pháp tiêu chuẩn để số hoá tín hiệu âm thanh tương tự (analog) thành chuỗi bit nhị phân thông qua lấy mẫu, lượng tử hoá và mã hoá.',
    definitionEn: 'The standard method used to digitally represent analog audio signals by sampling, quantizing, and binary encoding.',
    exampleVi: 'Định dạng tệp .wav trên máy tính Windows lưu trữ âm thanh theo phương pháp PCM.',
    exampleEn: 'The .wav format on Windows computers stores raw audio data using PCM.',
    sgkContext: 'Mục 1a – Trang 28 SGK Tin học 10'
  },
  {
    id: 'sampling-rate',
    termVi: 'Lấy mẫu & Tần số lấy mẫu',
    termEn: 'Sampling & Sampling Rate',
    ipa: '/ˈsæmplɪŋ reɪt/',
    definitionVi: 'Quá trình đo biên độ tín hiệu âm thanh ở các khoảng thời gian rời rạc đều nhau (chu kì lấy mẫu). Số mẫu đo trong 1 giây gọi là tần số lấy mẫu (Hz).',
    definitionEn: 'The process of measuring analog signal amplitudes at discrete equidistant time intervals. The number of samples collected per second is the sampling rate (Hz).',
    exampleVi: 'Âm thanh chất lượng đĩa CD được lấy mẫu ở tần số 44.1 kHz (44.100 lần mỗi giây).',
    exampleEn: 'CD-quality audio is sampled at 44.1 kHz (44,100 samples per second).',
    sgkContext: 'Mục 1a – Trang 28 SGK Tin học 10'
  },
  {
    id: 'bitrate',
    termVi: 'Tốc độ bit',
    termEn: 'Bit-rate',
    ipa: '/ˈbɪt reɪt/',
    definitionVi: 'Số lượng bit dữ liệu cần thiết để biểu diễn một giây âm thanh hoặc truyền qua mạng trong một giây, thường đo bằng Kbps (Kilobit per second).',
    definitionEn: 'The number of bits used to represent one second of audio or transmitted across a network per second, commonly measured in Kbps.',
    exampleVi: 'Nhạc nén MP3 phổ biến có tốc độ bit 128 Kbps (tiêu chuẩn) hoặc 320 Kbps (chất lượng cao).',
    exampleEn: 'Popular MP3 audio streams at 128 Kbps (standard) or 320 Kbps (high quality).',
    sgkContext: 'Mục 1a & 1b – Trang 29 SGK Tin học 10'
  },
  {
    id: 'adc-dac',
    termVi: 'Bộ chuyển đổi ADC & DAC',
    termEn: 'ADC & DAC Converters',
    ipa: '/ˌeɪ diː ˈsiː & ˌdiː eɪ ˈsiː/',
    definitionVi: 'ADC (Analog-to-Digital Converter) đổi sóng âm tương tự thành tín hiệu số; DAC (Digital-to-Analog Converter) đổi tín hiệu số thành sóng tương tự phát ra loa/tai nghe.',
    definitionEn: 'ADC converts analog audio waveforms into digital binary data; DAC synthesizes digital data back into analog signals for speakers/headphones.',
    exampleVi: 'Microphone kết nối qua mạch ADC, còn cổng tai nghe 3.5mm phát âm thanh qua mạch DAC.',
    exampleEn: 'Microphones record via an ADC circuit, while audio jacks play sound via a DAC circuit.',
    sgkContext: 'Mục 1a – Trang 29 SGK Tin học 10'
  },
  {
    id: 'lossless-lossy',
    termVi: 'Nén không mất mát & Nén có mất mát',
    termEn: 'Lossless vs Lossy Compression',
    ipa: '/ˈlɔːsləs vərsəs ˈlɔːsi kəmˈprɛʃn/',
    definitionVi: 'Nén không mất mát (Lossless) giữ nguyên vẹn 100% dữ liệu gốc (FLAC, PNG). Nén có mất mát (Lossy) loại bỏ bớt phần thông tin tai/mắt khó nhận biết để giảm mạnh dung lượng (MP3, JPEG).',
    definitionEn: 'Lossless compression preserves 100% original data without loss (FLAC, PNG). Lossy compression discards imperceptible data to drastically reduce file sizes (MP3, JPEG).',
    exampleVi: 'Tệp MP3 nhỏ hơn tệp WAV khoảng 10 lần nhưng tai người nghe hầu như không nhận ra sự khác biệt.',
    exampleEn: 'An MP3 file is roughly 10 times smaller than a WAV file with negligible perceptual difference.',
    sgkContext: 'Mục 1b & 2b – Trang 29, 31 SGK Tin học 10'
  },
  {
    id: 'pixel',
    termVi: 'Điểm ảnh (Pixel)',
    termEn: 'Pixel (Picture Element)',
    ipa: '/ˈpɪksəl/',
    definitionVi: 'Phần tử ảnh nhỏ nhất cấu thành nên hình ảnh kỹ thuật số trên màn hình hoặc tệp ảnh bitmap.',
    definitionEn: 'The smallest addressable element in a digital raster image or display screen.',
    exampleVi: 'Màn hình độ phân giải Full HD gồm 1920 × 1080 = hơn 2 triệu điểm ảnh.',
    exampleEn: 'A Full HD monitor consists of 1920 × 1080 = over 2 million pixels.',
    sgkContext: 'Mục 2 – Trang 30 SGK Tin học 10'
  },
  {
    id: 'rgb',
    termVi: 'Hệ màu RGB',
    termEn: 'RGB Color Model',
    ipa: '/ˌɑːr dʒiː ˈbiː ˈkʌlər ˈmɑːdl/',
    definitionVi: 'Mô hình màu cộng gồm ba màu cơ bản: Đỏ (Red), Xanh lá cây (Green), Xanh dương (Blue). Khi phối hợp cả 3 màu ở cường độ tối đa tạo ra màu trắng.',
    definitionEn: 'An additive color model using Red, Green, and Blue light. Combining all three at maximum intensity creates white light.',
    exampleVi: 'Mã màu (255, 0, 0) biểu diễn màu đỏ nguyên chất; mã (255, 255, 255) là màu trắng.',
    exampleEn: 'RGB value (255, 0, 0) is pure red; (255, 255, 255) represents pure white.',
    sgkContext: 'Hoạt động 2 & Mục 2 – Trang 30 SGK Tin học 10'
  },
  {
    id: 'bit-depth',
    termVi: 'Độ sâu màu',
    termEn: 'Bit Depth (Color Depth)',
    ipa: '/ˈbɪt dɛpθ/',
    definitionVi: 'Số lượng bit dùng để mã hoá thông tin màu sắc của một điểm ảnh (pixel). Độ sâu màu càng lớn thì sắc độ màu càng phong phú và tinh tế.',
    definitionEn: 'The number of bits used to specify the color of a single pixel. Higher bit depths yield more subtle color shades.',
    exampleVi: 'Độ sâu màu 24 bit (True Color) tạo ra 16,7 triệu màu; độ sâu màu 1 bit chỉ có 2 màu đen và trắng.',
    exampleEn: '24-bit True Color produces 16.7 million colors; 1-bit depth only supports black and white.',
    sgkContext: 'Mục 2 – Trang 30 SGK Tin học 10'
  },
  {
    id: 'bitmap',
    termVi: 'Ảnh Bitmap',
    termEn: 'Bitmap Image (Raster Graphics)',
    ipa: '/ˈbɪtmæp ˈɪmɪdʒ/',
    definitionVi: 'Định dạng ảnh biểu diễn hình ảnh dưới dạng lưới gồm các điểm ảnh (pixel) độc lập, mỗi điểm có vị trí và giá trị màu xác định.',
    definitionEn: 'An image represented as a grid of individual pixels, each holding specific coordinate and color data.',
    exampleVi: 'Tệp ảnh đuôi .bmp là định dạng bitmap gốc không nén, có kích thước tệp rất lớn.',
    exampleEn: 'Uncompressed .bmp files are raw bitmaps with very large file sizes.',
    sgkContext: 'Mục 2 – Trang 30 SGK Tin học 10'
  },
  {
    id: 'jpeg-png',
    termVi: 'Định dạng JPEG & PNG',
    termEn: 'JPEG & PNG Formats',
    ipa: '/ˈdʒeɪpɛɡ & ˌpiː ɛn ˈdʒiː/',
    definitionVi: 'JPEG nén có mất mát, dung lượng nhẹ, tối ưu cho ảnh chụp nhiều màu. PNG nén không mất mát, sắc nét và hỗ trợ độ trong suốt (alpha channel).',
    definitionEn: 'JPEG is a lossy format optimal for photography. PNG is a lossless format supporting sharp graphics and transparent backgrounds.',
    exampleVi: 'Ảnh logo trong suốt trên website thường lưu dưới dạng .png; ảnh phong cảnh lưu dạng .jpeg.',
    exampleEn: 'Transparent website logos are saved as .png, while landscape photos use .jpeg.',
    sgkContext: 'Mục Biểu diễn ảnh bitmap – Trang 31 SGK Tin học 10'
  }
];
