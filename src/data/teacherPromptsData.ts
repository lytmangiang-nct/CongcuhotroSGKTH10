import { SGK_TOPICS } from './curriculumData';

export interface TeacherPromptItem {
  id: string;
  questionVi: string;
  questionEn: string;
  suggestedAnswerVi: string;
  suggestedAnswerEn: string;
  pedagogicalTipVi: string;
  pedagogicalTipEn: string;
  targetCognitiveLevel: 'Nhận biết' | 'Thông hiểu' | 'Vận dụng' | 'Vận dụng cao';
  targetCognitiveLevelEn: 'Remember' | 'Understand' | 'Apply' | 'Analyze';
}

export interface SectionTeacherPrompts {
  sectionId: string;
  sectionTitleVi: string;
  sectionTitleEn: string;
  prompts: TeacherPromptItem[];
}

// -------------------------------------------------------------
// BÀI 1: THÔNG TIN VÀ XỬ LÍ THÔNG TIN (Trang 6 – 10 SGK)
// -------------------------------------------------------------
export const TEACHER_PROMPTS_LESSON_1: Record<number, SectionTeacherPrompts> = {
  // Trang 0: Khởi động & Mục tiêu bài học
  0: {
    sectionId: 'muc-tieu-khoi-dong',
    sectionTitleVi: 'Khởi động & Mục tiêu bài học',
    sectionTitleEn: 'Objectives & Warm-up Challenge',
    prompts: [
      {
        id: 'p0-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Sau khi đọc các mục tiêu ở đầu bài, theo em mục tiêu nào là mới mẻ và khác biệt nhất so với kiến thức Tin học ở cấp THCS?',
        questionEn: 'After reviewing the lesson objectives, which one appears most novel compared to what you studied in Middle School?',
        suggestedAnswerVi: 'Học sinh nêu việc phân biệt bản chất giữa "dữ liệu" và "thông tin", cũng như hiểu được tính toàn vẹn của dữ liệu và các ưu thế vượt bậc của thiết bị số trong lưu trữ, truyền thông tin hiện đại.',
        suggestedAnswerEn: 'Students identify distinguishing between "data" and "information", understanding data integrity, and recognizing modern digital devices’ superior storage and telecommunication capabilities.',
        pedagogicalTipVi: 'Giáo viên khích lệ học sinh tự đặt mục tiêu học tập, kết nối trải nghiệm công nghệ hàng ngày của học sinh (smartphone, mạng xã hội) vào bài học.',
        pedagogicalTipEn: 'Teacher encourages students to set personal learning goals, connecting everyday digital experiences with informatics theory.'
      },
      {
        id: 'p0-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Trong phần Khởi động, con người thu nhận thông tin từ thế giới xung quanh qua các giác quan nào và xử lý bằng bộ phận nào?',
        questionEn: 'In the Warm-up activity, through which human senses do we receive environmental information, and which organ processes it?',
        suggestedAnswerVi: 'Con người thu nhận thông tin qua 5 giác quan: thị giác (mắt), thính giác (tai), khứu giác (mũi), vị giác (lưỡi), xúc giác (da); sau đó não bộ sẽ tiếp nhận, phân tích, ghi nhớ và ra quyết định xử lý.',
        suggestedAnswerEn: 'Humans acquire information through 5 senses (sight, hearing, smell, taste, touch); the brain then receives, analyzes, stores, and makes decisions.',
        pedagogicalTipVi: 'Dẫn dắt so sánh: Giác quan con người tương ứng với thiết bị vào (bàn phím, camera, micro), não bộ tương ứng với CPU và bộ nhớ máy tính.',
        pedagogicalTipEn: 'Lead a comparison: Human senses correspond to input devices (keyboards, cameras, mics), and the brain corresponds to the computer CPU and memory.'
      },
      {
        id: 'p0-3',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Tại sao việc nắm chắc khái niệm Thông tin và Xử lí thông tin lại quan trọng đối với một công dân trong kỷ nguyên chuyển đổi số?',
        questionEn: 'Why is mastering the concepts of Information and Information Processing vital for citizens in the digital transformation era?',
        suggestedAnswerVi: 'Giúp học sinh có tư duy dữ liệu (data literacy), biết chọn lọc thông tin đáng tin cậy, tránh tin giả, sử dụng công cụ số an toàn, hiệu quả trong học tập và đời sống.',
        suggestedAnswerEn: 'It equips students with data literacy, enabling them to evaluate trustworthy sources, avoid misinformation, and effectively use digital tools in life.',
        pedagogicalTipVi: 'Khơi gợi thảo luận nhóm 2 phút về một trường hợp học sinh bị ảnh hưởng bởi tin tức trên mạng xã hội.',
        pedagogicalTipEn: 'Spark a 2-minute quick pair discussion on how social media algorithms deliver information to users.'
      }
    ]
  },

  // Trang 1: Mục 1a. Quá trình xử lí thông tin (Hình 1.1)
  1: {
    sectionId: 'muc-1a-qua-trinh',
    sectionTitleVi: 'Mục 1a. Quá trình xử lí thông tin (Hình 1.1 SGK)',
    sectionTitleEn: 'Section 1a. Information Processing Cycle (Figure 1.1)',
    prompts: [
      {
        id: 'p1a-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Dựa vào Hình 1.1 SGK, quá trình xử lí thông tin bằng máy tính gồm những bước nào? Bước nào là trọng tâm nhất?',
        questionEn: 'Based on Figure 1.1, what are the steps in the computer information processing cycle? Which step is the core?',
        suggestedAnswerVi: 'Gồm 3 bước: 1. Thu nhận dữ liệu (Đầu vào / Input) → 2. Xử lí dữ liệu (Processing - trọng tâm của máy tính với CPU/RAM) → 3. Xuất thông tin (Đầu ra / Output). Ngoài ra còn có lưu trữ trung gian.',
        suggestedAnswerEn: 'Comprises 3 steps: 1. Data acquisition (Input) → 2. Data processing (Processing - executed by CPU/RAM) → 3. Information distribution (Output), supported by intermediate storage.',
        pedagogicalTipVi: 'Yêu cầu học sinh mở mô phỏng Hình 1.1 trên ứng dụng để bấm chạy từng luồng dữ liệu bit 0/1 đi từ thiết bị vào đến CPU và màn hình.',
        pedagogicalTipEn: 'Ask students to launch the interactive Figure 1.1 simulator to watch binary bits stream from input devices into the CPU and monitor.'
      },
      {
        id: 'p1a-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Khi em gõ một bài văn bằng phần mềm Word rồi in ra giấy, hãy chỉ rõ thiết bị nào làm nhiệm vụ đầu vào, xử lý và đầu ra?',
        questionEn: 'When typing an essay in MS Word and printing it, identify which devices perform the input, processing, and output roles.',
        suggestedAnswerVi: 'Đầu vào: Bàn phím (gõ phím Telex) và chuột; Xử lí: CPU và RAM của máy tính thực hiện mã hóa chữ cái thành chuỗi bit; Đầu ra: Màn hình hiển thị văn bản và Máy in (in trang giấy).',
        suggestedAnswerEn: 'Input: Keyboard and mouse; Processing: Computer CPU and RAM encoding keystrokes into binary; Output: Monitor display and physical printer.',
        pedagogicalTipVi: 'Nhấn mạnh: Bàn phím không trực tiếp đưa "chữ" vào máy mà đưa tín hiệu quét phím (mã nhị phân) để CPU chuyển đổi thành ký tự tương ứng.',
        pedagogicalTipEn: 'Emphasize that keystrokes are transmitted as binary scan codes for the CPU to interpret into characters.'
      },
      {
        id: 'p1a-3',
        targetCognitiveLevel: 'Vận dụng cao',
        targetCognitiveLevelEn: 'Analyze',
        questionVi: 'Em hiểu câu châm ngôn công nghệ "Garbage In, Garbage Out" (Dữ liệu vào rác thì đầu ra rác) như thế nào trong chu trình xử lí thông tin?',
        questionEn: 'How do you interpret the tech adage "Garbage In, Garbage Out" in the context of the information processing cycle?',
        suggestedAnswerVi: 'Nếu dữ liệu đầu vào không chính xác, thiếu sót hoặc bị nhiễu, dù máy tính có xử lí nhanh và thuật toán tối ưu đến đâu thì thông tin đầu ra cũng sai lệch và không có giá trị sử dụng.',
        suggestedAnswerEn: 'If input data is flawed or corrupted, no matter how fast or powerful the processor is, the output will inevitably be inaccurate and untrustworthy.',
        pedagogicalTipVi: 'Liên hệ thực tế: Việc nhập sai số đo nhiệt độ hoặc sai điểm số sẽ dẫn đến kết quả xếp loại học lực hoặc chẩn đoán y tế bị sai lệch hoàn toàn.',
        pedagogicalTipEn: 'Provide practical examples like erroneous medical vitals or sensor misreadings creating invalid alerts.'
      }
    ]
  },

  // Trang 2: Mục 1b. Phân biệt dữ liệu & thông tin (HĐ1)
  2: {
    sectionId: 'muc-1b-phan-biet',
    sectionTitleVi: 'Mục 1b. Phân biệt dữ liệu và thông tin (Hoạt động 1)',
    sectionTitleEn: 'Section 1b. Distinguishing Data from Information (Activity 1)',
    prompts: [
      {
        id: 'p1b-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Hãy phân biệt sự khác nhau căn bản giữa "Dữ liệu" (Data) và "Thông tin" (Information) qua ví dụ con số "39°C"?',
        questionEn: 'Explain the fundamental difference between "Data" and "Information" using the example of "39°C"?',
        suggestedAnswerVi: 'Dữ liệu là con số 39°C được ghi lại (chưa có ngữ cảnh). Thông tin là ý nghĩa khi đặt vào ngữ cảnh: nếu là nhiệt độ bệnh nhân thì mang thông tin "người đó đang bị sốt cao cần hạ sốt"; nếu là dự báo thời tiết mùa hè thì là "trời nắng nóng oi bức".',
        suggestedAnswerEn: 'Data is the raw recorded reading "39°C". Information is its context-dependent meaning: for a patient it means "high fever requiring medication"; for weather forecast it means "scorching summer heat".',
        pedagogicalTipVi: 'Dùng thẻ tương tác Hoạt động 1 trên màn hình để chuyển đổi ngữ cảnh Bệnh viện ↔ Thời tiết cho cả lớp quan sát trực quan.',
        pedagogicalTipEn: 'Use the on-screen Activity 1 context switcher to toggle between Medical Clinic and Weather Forecast live.'
      },
      {
        id: 'p1b-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Tại sao SGK khẳng định: "Dữ liệu và thông tin có tính độc lập tương đối"? Nêu 2 khía cạnh minh họa.',
        questionEn: 'Why does the textbook state that "Data and information have relative independence"? Give two illustrative aspects.',
        suggestedAnswerVi: '1) Cùng một thông tin có thể biểu diễn bằng nhiều dạng dữ liệu khác nhau (bài giảng có thể là chữ viết tay, file Word, ghi âm mp3 hoặc video mp4). 2) Cùng một dữ liệu có thể mang thông tin khác nhau tùy người tiếp nhận và ngữ cảnh xử lý.',
        suggestedAnswerEn: '1) The same information can be represented by multiple data formats (handwritten notes, Word doc, audio, video). 2) The same data can convey different information depending on context and recipient.',
        pedagogicalTipVi: 'Mời 2 học sinh cùng nghe một hồi trống trường và hỏi mỗi bạn rút ra thông tin gì (bạn vào lớp, bạn ra chơi, bạn trực nhật chuẩn bị).',
        pedagogicalTipEn: 'Ask two students how the sound of the school bell conveys different instructions depending on the time of day.'
      },
      {
        id: 'p1b-3',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Tính "toàn vẹn của dữ liệu" (Data Integrity) là gì? Nếu dữ liệu bị mờ hoặc mất mát một phần thì điều gì sẽ xảy ra với thông tin?',
        questionEn: 'What is "Data Integrity"? If data becomes partially degraded or lost, what happens to the resulting information?',
        suggestedAnswerVi: 'Tính toàn vẹn là sự đầy đủ, chính xác, không bị biến dạng của dữ liệu. Nếu dữ liệu bị mất một phần (ví dụ tờ bệnh án bị mờ nét số hoặc file ảnh chụp bị nhiễu), thông tin rút ra sẽ bị sai lệch hoặc không thể nhận biết được.',
        suggestedAnswerEn: 'Data integrity refers to the completeness, accuracy, and consistency of data. If corrupted or illegible, the extracted information becomes unreliable or unobtainable.',
        pedagogicalTipVi: 'Nhắc học sinh đọc kỹ Hộp Ghi Nhớ màu vàng ở trang 7 SGK để ghi nhớ công thức tư duy cốt lõi này.',
        pedagogicalTipEn: 'Guide students to review the yellow Memorization Box on Page 7 to consolidate this foundational rule.'
      }
    ]
  },

  // Trang 3: Mục 2. Đơn vị lưu trữ dữ liệu (Bảng 1.1)
  3: {
    sectionId: 'muc-2-don-vi',
    sectionTitleVi: 'Mục 2. Đơn vị lưu trữ dữ liệu (Bảng 1.1 SGK)',
    sectionTitleEn: 'Section 2. Data Storage Units (Table 1.1)',
    prompts: [
      {
        id: 'p2-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Đơn vị nhỏ nhất để đo lượng dữ liệu trong máy tính là gì? Và đơn vị nhỏ nhất mà máy tính có thể truy cập được là gì?',
        questionEn: 'What is the smallest unit of data in computing, and what is the smallest accessible storage unit?',
        suggestedAnswerVi: 'Đơn vị nhỏ nhất để đo lượng thông tin/dữ liệu là bit (nhận 0 hoặc 1). Đơn vị nhỏ nhất mà bộ nhớ máy tính có thể truy cập trực tiếp là Byte (1 Byte = 8 bit).',
        suggestedAnswerEn: 'The smallest unit of data is the bit (0 or 1). The smallest directly addressable storage unit is the Byte (1 Byte = 8 bits).',
        pedagogicalTipVi: 'Lưu ý học sinh tránh nhầm lẫn giữa ký hiệu b (viết thường là bit) và B (viết hoa là Byte).',
        pedagogicalTipEn: 'Remind students of the distinction between lowercase "b" (bit) and uppercase "B" (Byte).'
      },
      {
        id: 'p2-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Tại sao các đơn vị lưu trữ dữ liệu liền kề trong Bảng 1.1 (Byte, KB, MB, GB, TB...) lại có tỉ số là 1024 chứ không phải là 1000 tròn như hệ thập phân?',
        questionEn: 'Why do adjacent storage units in Table 1.1 (Byte, KB, MB, GB, TB...) scale by 1024 rather than 1000 as in decimal units?',
        suggestedAnswerVi: 'Vì máy tính hoạt động hoàn toàn trên hệ nhị phân (cơ số 2). Số 1024 chính là lũy thừa đúng của 2: 2¹⁰ = 1024, rất gần với 1000 (kilo) nên được dùng làm tiền tố tiêu chuẩn trong máy tính.',
        suggestedAnswerEn: 'Computers operate exclusively in binary (base-2). 1024 equals 2¹⁰, which approximates 1000 (kilo) and serves as the natural scaling factor in computer memory.',
        pedagogicalTipVi: 'Sử dụng Bảng 1.1 và máy tính chuyển đổi trực quan trên trang để thử quy đổi 1 GB = 1 024 MB = 1 048 576 KB.',
        pedagogicalTipEn: 'Use the interactive Table 1.1 converter on screen to demonstrate 1 GB = 1,024 MB = 1,048,576 KB.'
      },
      {
        id: 'p2-3',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Một tệp tài liệu văn bản có kích thước 2 048 Byte thì bằng bao nhiêu KB? Và bao nhiêu bit?',
        questionEn: 'If a text file is 2,048 Bytes in size, how many Kilobytes is it? And how many bits?',
        suggestedAnswerVi: 'Quy đổi: 2 048 Byte = 2 048 / 1 024 = 2 KB. Tính theo bit: 2 048 Byte × 8 = 16 384 bit.',
        suggestedAnswerEn: 'Calculation: 2,048 Bytes = 2,048 / 1,024 = 2 KB. In bits: 2,048 Bytes × 8 = 16,384 bits.',
        pedagogicalTipVi: 'Mời một học sinh thực hành nhập trực tiếp giá trị vào ô Công cụ quy đổi thông minh trên màn hình để kiểm chứng.',
        pedagogicalTipEn: 'Invite a student to test and verify their calculation using the on-page Smart Unit Converter.'
      }
    ]
  },

  // Trang 4: Mục 3. Thiết bị số & Ưu điểm vượt trội (Hình 1.2)
  4: {
    sectionId: 'muc-3-thiet-bi-so',
    sectionTitleVi: 'Mục 3. Thiết bị số & Ưu điểm vượt trội (Hình 1.2 SGK)',
    sectionTitleEn: 'Section 3. Digital Devices & Superiorities (Figure 1.2)',
    prompts: [
      {
        id: 'p3-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Thiết bị số là gì? Kể tên 4 thiết bị số quen thuộc trong học tập và đời sống hàng ngày của em.',
        questionEn: 'What is a digital device? Name 4 digital devices you frequently use in studies and daily life.',
        suggestedAnswerVi: 'Thiết bị số là thiết bị có khả năng lưu trữ, xử lí và truyền dữ liệu ở dạng số (mã nhị phân). Ví dụ: Máy tính xách tay (laptop), điện thoại thông minh (smartphone), máy tính bảng (tablet), máy ảnh số, đồng hồ thông minh (smartwatch).',
        suggestedAnswerEn: 'A digital device can store, process, and transmit data digitally (in binary). Examples: Laptops, smartphones, tablets, digital cameras, smartwatches.',
        pedagogicalTipVi: 'Cho học sinh bấm vào các huy hiệu phân loại ở Hoạt động 2 để phân biệt thiết bị số với thiết bị cơ học (đồng hồ cơ, đĩa than).',
        pedagogicalTipEn: 'Direct students to toggle the badges in Activity 2 to contrast digital gadgets with legacy analog/mechanical tools.'
      },
      {
        id: 'p3-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Theo SGK Tin học 10, thiết bị số có 3 ưu điểm vượt trội cốt lõi nào so với các phương thức truyền thống?',
        questionEn: 'According to the Grade 10 Informatics textbook, what are the three core superiorities of digital devices?',
        suggestedAnswerVi: '1) Khả năng lưu trữ dung lượng khổng lồ với kích thước nhỏ gọn. 2) Tốc độ xử lí thông tin cực nhanh và chính xác. 3) Khả năng truyền thông tin tức thời và kết nối toàn cầu qua mạng Internet.',
        suggestedAnswerEn: '1) Massive storage capacity in compact form factor. 2) High-speed, highly accurate computational processing. 3) Instant worldwide telecommunication over networks.',
        pedagogicalTipVi: 'Nhấn mạnh ví dụ trực quan trong SGK: Một ổ cứng 2 TB chỉ bằng bàn tay có thể chứa tương đương toàn bộ sách của một thư viện trường đại học lớn.',
        pedagogicalTipEn: 'Highlight the textbook figure: a pocket-sized 2 TB hard drive can hold an entire university library’s books.'
      },
      {
        id: 'p3-3',
        targetCognitiveLevel: 'Vận dụng cao',
        targetCognitiveLevelEn: 'Analyze',
        questionVi: 'Hãy so sánh ưu thế của việc gửi thư điện tử (Email) so với việc gửi thư tay qua đường bưu điện truyền thống về chi phí, tốc độ và tính toàn vẹn dữ liệu?',
        questionEn: 'Compare email with postal mail in terms of transmission speed, cost, and content integrity.',
        suggestedAnswerVi: 'Email: Tốc độ tức thời (vài giây), chi phí gần như bằng 0 (chỉ cần kết nối internet), nội dung đính kèm đa phương tiện (ảnh, âm thanh, video) và bản sao giữ nguyên vẹn 100%. Bưu điện: Mất nhiều ngày, tốn cước phí gửi, dễ rách hỏng do thời tiết hoặc thất lạc.',
        suggestedAnswerEn: 'Email: Near instantaneous delivery, virtually zero incremental cost, supports multimedia attachments, and maintains 100% digital integrity. Postal mail: Takes days, requires postage fees, and risks physical damage or loss.',
        pedagogicalTipVi: 'Yêu cầu học sinh mở bảng so sánh tương tác ở Mục 3 trên màn hình để kiểm tra từng tiêu chí.',
        pedagogicalTipEn: 'Ask students to expand the interactive comparative table in Section 3 to review comparison metrics.'
      }
    ]
  },

  // Trang 5: Luyện tập & Vận dụng
  5: {
    sectionId: 'luyen-tap-van-dung',
    sectionTitleVi: 'Luyện tập & Vận dụng (Trang 10 SGK)',
    sectionTitleEn: 'Practice & Application (Page 10)',
    prompts: [
      {
        id: 'p5-1',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Trong bài tập Luyện tập 1, từ bảng điểm các môn của học sinh (Toán, Văn, Anh, Tin), ta có thể rút ra những thông tin giá trị nào?',
        questionEn: 'In Practice Exercise 1, what actionable information can be drawn from a student’s subject grade records?',
        suggestedAnswerVi: 'Thông tin rút ra: Điểm trung bình học kỳ, xếp loại học lực (Giỏi, Khá, Đạt), môn thế mạnh (ví dụ Tin học 9.5), môn cần cải thiện (ví dụ Ngữ văn 7.0), và xu hướng tiến bộ để định hướng chọn khối thi đại học sau này.',
        suggestedAnswerEn: 'Information extracted: Semester GPA, academic standing, individual subject strengths, subjects needing reinforcement, and career pathway orientation.',
        pedagogicalTipVi: 'Cho học sinh nhập thử các con điểm vào bộ mô phỏng tính điểm trung bình tương tác để thấy công thức chuyển dữ liệu thô thành thông tin xếp loại.',
        pedagogicalTipEn: 'Have students adjust grades in the GPA interactive widget to see raw numbers transform into academic honors and standing.'
      },
      {
        id: 'p5-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Trong bài tập Luyện tập 2 (Hình 1.3), hãy nêu các bước tính toán để biết thẻ nhớ 16 GB chứa được bao nhiêu bức ảnh?',
        questionEn: 'In Practice Exercise 2 (Figure 1.3), explain the step-by-step calculation to determine how many photos fit on a 16 GB SD card.',
        suggestedAnswerVi: 'Bước 1: Tính dung lượng trung bình của 1 bức ảnh từ mẫu trong SGK: (10 144 + 9 888 + 10 016 + 9 440) / 4 ≈ 9 872 KB. Bước 2: Đổi 16 GB ra KB: 16 × 1 024 × 1 024 = 16 777 216 KB. Bước 3: Lấy tổng dung lượng chia cho dung lượng 1 ảnh: 16 777 216 / 9 872 ≈ 1 699 bức ảnh.',
        suggestedAnswerEn: 'Step 1: Calculate average photo size from the 4 samples: ~9,872 KB. Step 2: Convert 16 GB to KB: 16 × 1,024 × 1,024 = 16,777,216 KB. Step 3: Divide total capacity by average photo size: ~1,699 photos.',
        pedagogicalTipVi: 'Dùng thanh trượt dung lượng thẻ nhớ (4 GB - 128 GB) trong phần thực hành để học sinh thấy sự thay đổi số lượng ảnh chụp theo thời gian thực.',
        pedagogicalTipEn: 'Adjust the interactive SD Card slider (4 GB - 128 GB) to observe realtime photo capacity calculation.'
      },
      {
        id: 'p5-3',
        targetCognitiveLevel: 'Vận dụng cao',
        targetCognitiveLevelEn: 'Analyze',
        questionVi: 'Trong bài Vận dụng 2, thẻ Căn cước công dân gắn chip điện tử của Việt Nam lưu trữ những dữ liệu gì và đem lại lợi ích gì so với chứng minh nhân dân giấy cũ?',
        questionEn: 'In Application Task 2, what data does the Vietnamese chip-based citizen ID card store, and what advantages does it offer over traditional paper IDs?',
        suggestedAnswerVi: 'Lưu trữ dữ liệu: Số định danh cá nhân, họ tên, ngày sinh, quê quán, dấu vân tay, đặc điểm sinh trắc học, chữ ký số. Ưu điểm: Bảo mật cao chống làm giả, dung lượng lưu trữ an toàn, quét mã QR và xác thực số nhanh chóng khi làm thủ tục hành chính, khám chữa bệnh BHYT không cần giấy tờ rườm rà.',
        suggestedAnswerEn: 'Data stored: National ID, full name, birth date, biometric fingerprints, digital certificates. Advantages: High anti-counterfeit encryption, secure microchip, fast QR/NFC validation for public services and healthcare without cumbersome paperwork.',
        pedagogicalTipVi: 'Gợi mở liên hệ chuyển đổi số quốc gia (Đề án 06 và ứng dụng VNeID) để học sinh thấy kiến thức tin học gắn chặt với thực tiễn đời sống.',
        pedagogicalTipEn: 'Connect to national digital transformation initiatives (VNeID app) so students appreciate practical applications of data systems.'
      }
    ]
  }
};

// -------------------------------------------------------------
// BÀI 2: VAI TRÒ CỦA THIẾT BỊ THÔNG MINH VÀ TIN HỌC ĐỐI VỚI XÃ HỘI (Trang 11 – 15 SGK)
// -------------------------------------------------------------
export const TEACHER_PROMPTS_LESSON_2: Record<number, SectionTeacherPrompts> = {
  // Trang 0: Khởi động & Mục tiêu bài học (Trang 11 SGK)
  0: {
    sectionId: 'bai-2-muc-tieu-khoi-dong',
    sectionTitleVi: 'Mục tiêu & Khởi động bài học (Trang 11 SGK)',
    sectionTitleEn: 'Lesson 2 Objectives & Warm-up (Page 11)',
    prompts: [
      {
        id: 'p2-0-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Dựa vào 4 mục tiêu bài học ở trang 11 SGK, theo em đâu là khái niệm trung tâm tạo nên sự bứt phá của cuộc Cách mạng công nghiệp lần thứ tư (CMCN 4.0)?',
        questionEn: 'Based on the 4 lesson objectives on page 11, which core concept drives the breakthrough of the Fourth Industrial Revolution (Industry 4.0)?',
        suggestedAnswerVi: 'Khái niệm "Thiết bị thông minh" (Smart devices) và vai trò của Tin học trong kết nối vạn vật (IoT), tự động hóa thông minh và nền kinh tế tri thức.',
        suggestedAnswerEn: 'The concept of "Smart Devices" and the role of informatics in IoT connectivity, smart automation, and the knowledge economy.',
        pedagogicalTipVi: 'Giáo viên nhấn mạnh mục tiêu: không chỉ nhận diện thiết bị mà còn hiểu vai trò của tin học trong biến đổi xã hội và nghề nghiệp tương lai.',
        pedagogicalTipEn: 'Emphasize the objective: not only recognizing devices but understanding informatics transforming societal careers.'
      },
      {
        id: 'p2-0-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Trong phần Khởi động, em hãy kể tên 3 thiết bị thông minh trong gia đình hoặc trường học có thể tự động tiếp nhận và xử lí thông tin mà không cần con người can thiệp từng bước?',
        questionEn: 'In the Warm-up activity, name 3 smart devices in homes or schools that autonomously capture and process information without step-by-step human intervention?',
        suggestedAnswerVi: 'Ví dụ: Robot hút bụi tự vẽ bản đồ phòng và tránh chướng ngại vật; Máy điều hòa inverter tự cảm biến nhiệt độ phòng để tăng giảm công suất; Hệ thống camera giám sát tự bật đèn khi có người chuyển động.',
        suggestedAnswerEn: 'Examples: Robotic vacuum mapping rooms and avoiding obstacles; Inverter air conditioner adjusting cooling based on room occupancy; Smart security camera turning on lights upon detecting human motion.',
        pedagogicalTipVi: 'Dẫn dắt so sánh: Thiết bị thông minh khác thiết bị điện tử thông thường ở chỗ: nó có thể tự thích ứng hoàn cảnh và kết nối mạng trao đổi dữ liệu.',
        pedagogicalTipEn: 'Guide comparison: Smart devices differ from basic electronics by autonomously adapting to contexts and exchanging data wirelessly.'
      },
      {
        id: 'p2-0-3',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Tại sao hiểu biết về thiết bị thông minh lại trở thành năng lực công dân số thiết yếu của học sinh THPT hiện nay?',
        questionEn: 'Why is understanding smart devices an essential digital citizenship competency for high school students today?',
        suggestedAnswerVi: 'Giúp học sinh làm chủ công nghệ, khai thác tối đa công cụ số phục vụ học tập suốt đời, bảo vệ dữ liệu cá nhân khi kết nối mạng và định hướng nghề nghiệp trong kỷ nguyên số.',
        suggestedAnswerEn: 'It equips students to harness digital tools for lifelong learning, protect personal data on networks, and orient career pathways in the digital era.',
        pedagogicalTipVi: 'Tổ chức thảo luận nhanh 2 phút: Thiết bị thông minh đang giúp ích gì nhiều nhất cho việc học tập của các em ở trường?',
        pedagogicalTipEn: 'Hold a 2-minute quick discussion: How are smart devices currently assisting students in school studies?'
      }
    ]
  },

  // Trang 1: Mục 1a. Thiết bị thông minh là hệ thống xử lí thông tin (Hình 2.1 SGK)
  1: {
    sectionId: 'bai-2-muc-1a-thiet-bi-thong-minh',
    sectionTitleVi: 'Mục 1a. Thiết bị thông minh là hệ thống xử lí thông tin (Hình 2.1 SGK)',
    sectionTitleEn: 'Section 1a. Smart Devices as Processing Systems (Figure 2.1)',
    prompts: [
      {
        id: 'p2-1-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Theo SGK Tin học 10, thiết bị thông minh là gì? Nêu 3 đặc điểm nhận diện then chốt.',
        questionEn: 'According to the Grade 10 Informatics textbook, what is a smart device? List 3 key identifying characteristics.',
        suggestedAnswerVi: 'Thiết bị thông minh là thiết bị điện tử có thể hoạt động tự chủ không cần sự can thiệp của con người, tự thích ứng với hoàn cảnh và có khả năng kết nối với các thiết bị khác để trao đổi dữ liệu. 3 đặc điểm: 1) Tự chủ; 2) Thích ứng; 3) Kết nối mạng.',
        suggestedAnswerEn: 'A smart device is an electronic device that operates autonomously without human intervention, adapts to its environment, and connects with other devices to exchange data. 3 traits: Autonomous, Adaptive, Connected.',
        pedagogicalTipVi: 'Yêu cầu học sinh mở Hộp ghi nhớ trang 12 SGK và liên hệ trực tiếp với 3 thẻ khái niệm (Tự chủ, Kết nối mạng, Trí tuệ AI) trên ứng dụng.',
        pedagogicalTipEn: 'Prompt students to consult the Page 12 memorization card and link with the 3 interactive concept cards on screen.'
      },
      {
        id: 'p2-1-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Quan sát Hình 2.1 SGK, tại sao đồng hồ lịch vạn niên kỹ thuật số (Hình 2.1a) KHÔNG phải là thiết bị thông minh, trong khi điện thoại di động (Hình 2.1b) lại là thiết bị thông minh?',
        questionEn: 'Observing Figure 2.1, why is the perpetual digital calendar clock (Fig 2.1a) NOT a smart device, whereas the smartphone (Fig 2.1b) is a smart device?',
        suggestedAnswerVi: 'Đồng hồ lịch vạn niên chỉ chạy theo mạch điện tử định sẵn, không kết nối mạng, không thích ứng môi trường và không trao đổi dữ liệu. Điện thoại di động có hệ điều hành, chip xử lý, kết nối 4G/5G/Wi-Fi/Bluetooth và tiếp nhận xử lý tương tác thông minh.',
        suggestedAnswerEn: 'The calendar clock operates strictly on fixed circuitry, lacks network connectivity, cannot adapt, and cannot exchange data. The smartphone possesses an OS, processing chip, wireless radios, and performs autonomous interactive processing.',
        pedagogicalTipVi: 'Cho học sinh bấm vào bảng trắc nghiệm Hình 2.1 tương tác để kiểm tra đáp án và phân tích lý do cụ thể từng thiết bị.',
        pedagogicalTipEn: 'Have students engage with the interactive Figure 2.1 classifier widget to test their answers and review explanations.'
      },
      {
        id: 'p2-1-3',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Robot hút bụi thông minh trong gia đình xử lí thông tin theo chu trình nào (Đầu vào → Xử lí → Đầu ra)?',
        questionEn: 'What information processing cycle (Input → Processing → Output) does a robotic vacuum cleaner follow?',
        suggestedAnswerVi: 'Đầu vào: Cảm biến laser/LiDAR, cảm biến va chạm, camera nhận diện sàn nhà. Xử lí: Vi xử lí tính toán vẽ bản đồ phòng và lập đường đi tối ưu tránh vật cản. Đầu ra: Điều khiển động cơ bánh xe di chuyển, bật lực hút và gửi báo cáo hoàn thành về smartphone.',
        suggestedAnswerEn: 'Input: Laser/LiDAR sensors, collision bumper, floor detection cameras. Processing: Onboard microprocessor computes room map and optimal path. Output: Motor driving wheels, activating suction, and sending completion alerts to smartphone.',
        pedagogicalTipVi: 'Dẫn dắt học sinh thấy thiết bị thông minh chính là một hệ thống xử lí thông tin thu nhỏ hoàn chỉnh.',
        pedagogicalTipEn: 'Guide students to realize that every smart device is a miniature, complete information processing system.'
      }
    ]
  },

  // Trang 2: Mục 1b. Vai trò trong CMCN 4.0, IoT & Kinh tế tri thức (Hình 2.2, 2.3 SGK)
  2: {
    sectionId: 'bai-2-muc-1b-iot-cmcn4',
    sectionTitleVi: 'Mục 1b. CMCN 4.0, IoT & Kinh tế tri thức (Hình 2.2, 2.3 SGK)',
    sectionTitleEn: 'Section 1b. Industry 4.0, IoT & Knowledge Economy (Figures 2.2 & 2.3)',
    prompts: [
      {
        id: 'p2-2-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Dựa vào Hình 2.2 SGK, hãy nêu tên 4 cuộc Cách mạng công nghiệp trong lịch sử nhân loại và yếu tố đặc trưng của cuộc Cách mạng công nghiệp lần thứ tư (CMCN 4.0)?',
        questionEn: 'Based on Figure 2.2, name the four Industrial Revolutions in human history and the defining factor of the Fourth Industrial Revolution (Industry 4.0)?',
        suggestedAnswerVi: '1.0 (Động cơ hơi nước & cơ giới hóa) → 2.0 (Điện năng & dây chuyền sản xuất) → 3.0 (Máy tính & tự động hóa) → 4.0 (Công nghệ số, IoT, AI, Big Data, thiết bị thông minh làm mờ ranh giới giữa thế giới thực và ảo).',
        suggestedAnswerEn: '1.0 (Steam & mechanization) → 2.0 (Electricity & assembly lines) → 3.0 (Computing & automation) → 4.0 (Digital tech, IoT, AI, Big Data, smart devices blurring physical and cyber lines).',
        pedagogicalTipVi: 'Cho học sinh bấm vào dòng thời gian 4 cuộc cách mạng trên ứng dụng để quan sát bước nhảy vọt của năng suất lao động qua từng thời kỳ.',
        pedagogicalTipEn: 'Direct students to toggle the 4 revolutions on the interactive timeline to observe exponential productivity growth.'
      },
      {
        id: 'p2-2-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Khái niệm Internet vạn vật (Internet of Things - IoT) là gì? Các thiết bị thông minh đóng vai trò gì trong hệ thống IoT?',
        questionEn: 'What is the Internet of Things (IoT)? What role do smart devices play in an IoT ecosystem?',
        suggestedAnswerVi: 'IoT là mạng lưới kết nối các thiết bị thông minh với nhau để thu thập và xử lí thông tin tự động, tức thời trên diện rộng. Thiết bị thông minh đóng vai trò là "mắt xích cốt lõi" vừa thu nhận dữ liệu cảm biến, vừa tự thực thi mệnh lệnh điều khiển.',
        suggestedAnswerEn: 'IoT is the network interconnecting smart devices to collect and process data automatically and instantaneously across vast scopes. Smart devices act as the fundamental nodes capturing sensor data and executing commands.',
        pedagogicalTipVi: 'Lấy ví dụ trực quan hệ thống đèn giao thông thông minh: các cảm biến và camera đếm xe trên đường chính là các thiết bị thông minh tạo nên mạng IoT giao thông đô thị.',
        pedagogicalTipEn: 'Illustrate with smart traffic lights: road sensors and cameras constitute the smart nodes of the urban traffic IoT grid.'
      },
      {
        id: 'p2-2-3',
        targetCognitiveLevel: 'Vận dụng cao',
        targetCognitiveLevelEn: 'Analyze',
        questionVi: 'Vì sao trong một sản phẩm công nghệ cao như smartphone, chi phí phần mềm, thiết kế và bản quyền tri thức lại chiếm hơn nửa giá bán của sản phẩm (nền kinh tế tri thức)?',
        questionEn: 'Why do software, design, and intellectual property constitute more than half of a high-tech smartphone’s retail price (knowledge economy)?',
        suggestedAnswerVi: 'Trong nền kinh tế tri thức, giá trị sản phẩm không nằm ở nguyên vật liệu thô (nhựa, kính, nhôm) mà nằm ở hàm lượng chất xám: thuật toán AI, hệ điều hành tinh vi, bằng sáng chế chip bán dẫn và thiết kế trải nghiệm người dùng.',
        suggestedAnswerEn: 'In a knowledge economy, product value stems not from raw materials (aluminum, glass) but from intellectual capital: AI algorithms, sophisticated OS, semiconductor patents, and UX design.',
        pedagogicalTipVi: 'Mở biểu đồ cơ cấu giá bán smartphone ở Mục 1b để học sinh thấy minh chứng trực quan về giá trị tri thức.',
        pedagogicalTipEn: 'Open the smartphone price breakdown chart in Section 1b to visually show students the dominance of knowledge value.'
      }
    ]
  },

  // Trang 3: Mục 2a. Đóng góp của Tin học với đời sống xã hội (5 lĩnh vực)
  3: {
    sectionId: 'bai-2-muc-2a-dong-gop-tin-hoc',
    sectionTitleVi: 'Mục 2a. Đóng góp của Tin học với xã hội (5 lĩnh vực, Trang 13–14 SGK)',
    sectionTitleEn: 'Section 2a. Contributions of Informatics to Society (5 Domains)',
    prompts: [
      {
        id: 'p2-3-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Theo SGK Tin học 10, tin học đem lại đóng góp to lớn trong 5 lĩnh vực đời sống xã hội nào?',
        questionEn: 'According to Grade 10 Informatics textbook, in which five societal domains has informatics made monumental contributions?',
        suggestedAnswerVi: '1) Quản lí điều hành; 2) Tự động hóa sản xuất; 3) Giải quyết các bài toán khoa học kỹ thuật; 4) Thay đổi cách thức làm việc của nhiều ngành nghề; 5) Giao tiếp cộng đồng và xã hội số.',
        suggestedAnswerEn: '1) Administrative management; 2) Industrial automation; 3) Scientific and engineering problem solving; 4) Transforming work methods across industries; 5) Community communication and social networking.',
        pedagogicalTipVi: 'Cho học sinh bấm vào 5 thẻ lĩnh vực tương tác trên màn hình để tìm hiểu từng ví dụ thực tiễn trong đời sống Việt Nam.',
        pedagogicalTipEn: 'Ask students to click through the 5 interactive domain tabs on screen to explore real-world Vietnamese examples.'
      },
      {
        id: 'p2-3-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Trong lĩnh vực tự động hóa sản xuất, việc sử dụng robot công nghiệp và thiết bị thông minh mang lại những lợi ích vượt trội nào so với lao động thủ công của con người?',
        questionEn: 'In industrial automation, what superior advantages does the deployment of industrial robots and smart devices offer over manual human labor?',
        suggestedAnswerVi: 'Tốc độ sản xuất vượt trội, độ chính xác tuyệt đối (hạn chế tối đa lỗi sản phẩm), hoạt động liên tục 24/7 không mệt mỏi và đặc biệt là thay thế con người làm việc an toàn trong môi trường độc hại, phóng xạ hoặc hỏa hoạn.',
        suggestedAnswerEn: 'Superior speed, pinpoint precision, continuous 24/7 operation, and crucially replacing human workers in hazardous, toxic, radioactive, or extreme disaster environments.',
        pedagogicalTipVi: 'Liên hệ ví dụ cánh tay robot trong dây chuyền lắp ráp ô tô hoặc robot thám hiểm đáy biển sâu.',
        pedagogicalTipEn: 'Connect to examples of automotive robotic assembly arms or deep-sea exploration submersible robots.'
      },
      {
        id: 'p2-3-3',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Hãy phân tích sự thay đổi phương thức làm việc của nghề dạy học hoặc nghề làm báo sau khi có ứng dụng của công nghệ tin học?',
        questionEn: 'Analyze the transformation of working methods in teaching or journalism following the widespread adoption of informatics?',
        suggestedAnswerVi: 'Dạy học: Chuyển từ phấn trắng bảng đen sang giáo án điện tử, bài giảng tương tác đa phương tiện, lớp học trực tuyến qua Google Meet/Teams. Làm báo: Chuyển từ công nghệ in sắp chữ chì chậm chạp sang chế bản điện tử đồ họa máy tính, xuất bản báo điện tử tức thời toàn cầu.',
        suggestedAnswerEn: 'Teaching: Shifted from chalkboard to multimedia interactive slides and online classes (Teams/Meet). Journalism: Shifted from slow hot-metal typesetting to desktop publishing and instant worldwide online news portals.',
        pedagogicalTipVi: 'Khơi gợi học sinh nhận xét chính lớp học thông minh và ứng dụng học tập các em đang sử dụng là minh chứng cho sự thay đổi này.',
        pedagogicalTipEn: 'Remind students that their interactive app and smart classroom directly embody this transformation.'
      }
    ]
  },

  // Trang 4: Mục 2b. Một số thành tựu phát triển của Tin học (Các mốc lịch sử)
  4: {
    sectionId: 'bai-2-muc-2b-thanh-tuu-tin-hoc',
    sectionTitleVi: 'Mục 2b. Thành tựu phát triển của Tin học (Trang 14–15 SGK)',
    sectionTitleEn: 'Section 2b. Historical Milestones of Informatics (Pages 14–15)',
    prompts: [
      {
        id: 'p2-4-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Hệ điều hành OS/360 ra đời năm nào, của tập đoàn nào và có ý nghĩa lịch sử như thế nào đối với nền tảng máy tính hiện đại?',
        questionEn: 'In which year and by which corporation was OS/360 developed, and what historical significance does it hold for modern computing?',
        suggestedAnswerVi: 'Ra đời năm 1964 của tập đoàn IBM dành cho dòng máy IBM/360. Ý nghĩa: Là hệ điều hành đầu tiên đưa ra hầu hết nguyên lí của hệ điều hành hiện đại (quản lý phần cứng, đa nhiệm, quản lý tệp tin).',
        suggestedAnswerEn: 'Introduced in 1964 by IBM for the IBM/360 mainframe family. It pioneered virtually all fundamental principles of modern operating systems.',
        pedagogicalTipVi: 'Nhấn mạnh: Không có hệ điều hành thì con người không thể sử dụng máy tính dễ dàng như Windows, macOS, Android ngày nay.',
        pedagogicalTipEn: 'Emphasize that without operating systems, intuitive computing like Windows, macOS, and Android would not exist.'
      },
      {
        id: 'p2-4-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Giao thức TCP/IP (1983) và phát minh World Wide Web (1992) đóng vai trò như thế nào trong sự bùng nổ của mạng Internet toàn cầu?',
        questionEn: 'How did the TCP/IP protocol (1983) and the invention of the World Wide Web (1992) catalyze the explosion of the global Internet?',
        suggestedAnswerVi: 'TCP/IP (1983) chuẩn hóa quy tắc truyền dữ liệu giúp các máy tính khắp thế giới nói chung một ngôn ngữ mạng. WWW (1992 của Tim Berners-Lee) tạo ra phương tiện duyệt trang web trực quan bằng siêu liên kết, giúp mọi người dân dễ dàng truy cập kho tri thức nhân loại.',
        suggestedAnswerEn: 'TCP/IP (1983) standardized communication protocols unifying global computing. WWW (1992 by Tim Berners-Lee) provided intuitive hyperlink browsing, democratizing global knowledge access.',
        pedagogicalTipVi: 'Cho học sinh phân biệt: Internet là hạ tầng mạng kết nối các máy tính, còn Web (WWW) là dịch vụ thông tin chạy trên nền mạng Internet.',
        pedagogicalTipEn: 'Clarify the distinction: the Internet is the physical network infrastructure, while the Web is an information service operating atop it.'
      },
      {
        id: 'p2-4-3',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Vì sao sự ra đời của các ngôn ngữ lập trình bậc cao (bắt đầu từ FORTRAN năm 1957) lại là một cuộc cách mạng giải phóng sức sáng tạo của lập trình viên?',
        questionEn: 'Why was the emergence of high-level programming languages (beginning with FORTRAN in 1957) a revolutionary leap for developer productivity?',
        suggestedAnswerVi: 'Trước đây phải viết mã máy bằng chuỗi nhị phân 0 và 1 rất khó khăn và phụ thuộc cấu trúc phần cứng từng máy. Ngôn ngữ bậc cao dùng từ ngữ gần gũi tiếng Anh và ký hiệu toán học, độc lập với phần cứng, giúp viết chương trình nhanh hơn, ít lỗi hơn và tái sử dụng dễ dàng.',
        suggestedAnswerEn: 'Previously, programmers had to write machine code in binary 0s and 1s tied to specific hardware. High-level languages use English words and math notations, abstracting hardware details, making coding far faster, reliable, and portable.',
        pedagogicalTipVi: 'Liên hệ việc học sinh sắp được học lập trình ngôn ngữ bậc cao Python ở các chủ đề tiếp theo của môn Tin học 10.',
        pedagogicalTipEn: 'Connect to the upcoming Python programming topics that students will study in later units of Informatics 10.'
      }
    ]
  },

  // Trang 5: Luyện tập & Vận dụng (Trang 15 SGK)
  5: {
    sectionId: 'bai-2-luyen-tap-van-dung',
    sectionTitleVi: 'Luyện tập & Vận dụng (Trang 15 SGK)',
    sectionTitleEn: 'Practice & Real-World Applications (Page 15)',
    prompts: [
      {
        id: 'p2-5-1',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Trong bài Luyện tập 1, hãy giải thích cơ chế nhận dạng hình ảnh của Camera giao thông thông minh và Xe tự hành trên đường phố?',
        questionEn: 'In Practice Task 1, explain the image recognition mechanism of smart traffic cameras and autonomous vehicles on urban streets?',
        suggestedAnswerVi: 'Thu nhận hình ảnh từ thấu kính camera quang học → Chip xử lý AI sử dụng mạng nơ-ron thị giác máy tính để phân tích từng khung hình → Nhận dạng và đọc ký tự biển số xe (ALPR), nhận diện người đi bộ, làn đường, đèn tín hiệu.',
        suggestedAnswerEn: 'Capturing optical imagery via camera lenses → AI chips with computer vision neural networks analyze frame-by-frame → Detecting license plates (ALPR), pedestrian silhouettes, road lane markings, and traffic lights.',
        pedagogicalTipVi: 'Cho học sinh dùng công cụ kiểm tra thiết bị nhận dạng ảnh tương tác ở bài Luyện tập 1 để phân tích từng thiết bị.',
        pedagogicalTipEn: 'Have students test devices using the Practice 1 interactive tester to analyze their technical vision capabilities.'
      },
      {
        id: 'p2-5-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Trong bài Luyện tập 2, hãy nêu vai trò cụ thể của phần mềm bảng tính điện tử (Excel/Sheets) trong công tác quản lí điểm số của nhà trường?',
        questionEn: 'In Practice Task 2, detail the specific role of spreadsheet software (Excel/Sheets) in school grade management?',
        suggestedAnswerVi: 'Tự động tính điểm trung bình môn, điểm trung bình học kỳ bằng công thức chuẩn xác; tự động xếp loại học lực; sắp xếp thứ hạng học sinh và vẽ biểu đồ phân tích chất lượng học tập của toàn khối.',
        suggestedAnswerEn: 'Automating subject and semester GPA calculations via formulas; automated academic standing categorization; student ranking and visual grade distribution charts.',
        pedagogicalTipVi: 'Nhấn mạnh: Bảng tính điện tử giúp tiết kiệm hàng trăm giờ tính toán thủ công và triệt tiêu sai sót số học.',
        pedagogicalTipEn: 'Highlight that spreadsheets eliminate human arithmetic errors and save hundreds of administrative work hours.'
      },
      {
        id: 'p2-5-3',
        targetCognitiveLevel: 'Vận dụng cao',
        targetCognitiveLevelEn: 'Analyze',
        questionVi: 'Trong bài Vận dụng 2, hãy phân tích vì sao xe tự hành trong CMCN 4.0 lại đồng thời đạt được 3 mục tiêu lớn: giảm ô nhiễm, giảm ùn tắc và tiết kiệm chi phí xã hội?',
        questionEn: 'In Application Task 2, analyze why autonomous vehicles in Industry 4.0 simultaneously achieve three major goals: less pollution, less congestion, and lower societal costs?',
        suggestedAnswerVi: '1) Động cơ điện không khí thải (giảm ô nhiễm); 2) Mạng V2V giúp xe chạy đều tốc độ, tối ưu giãn cách, không lấn làn vượt ẩu (giảm ùn tắc); 3) Mô hình xe chia sẻ Robotaxi giúp người dân không cần mua xe riêng, giảm chi phí xăng, bảo dưỡng và bãi đỗ xe (tiết kiệm chi phí).',
        suggestedAnswerEn: '1) Clean electric drive with zero emissions (pollution); 2) V2V networking maintains optimal flow without reckless cuts (congestion); 3) Robotaxi ride-sharing eliminates vehicle ownership, maintenance, parking and fuel costs (societal savings).',
        pedagogicalTipVi: 'Khuyến khích học sinh tổng hợp kiến thức liên môn (Vật lí, Tin học, Giáo dục công dân và Môi trường) để trả lời trọn vẹn.',
        pedagogicalTipEn: 'Encourage interdisciplinary synthesis (Physics, CS, Civics, Ecology) for a well-rounded response.'
      }
    ]
  }
};

// -------------------------------------------------------------
// BÀI 3: MỘT SỐ KIỂU DỮ LIỆU VÀ DỮ LIỆU VĂN BẢN (Trang 16 – 19 SGK)
// -------------------------------------------------------------
export const TEACHER_PROMPTS_LESSON_3: Record<number, SectionTeacherPrompts> = {
  0: {
    sectionId: 'bai-3-muc-tieu-khoi-dong',
    sectionTitleVi: 'Mục tiêu & Khởi động bài học (Trang 16 SGK)',
    sectionTitleEn: 'Lesson 3 Objectives & Warm-up (Page 16)',
    prompts: [
      {
        id: 'p3-0-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Tại sao máy tính chỉ lưu trữ các dãy bit 0 và 1 nhưng con người lại có thể làm việc với văn bản, số, hình ảnh và âm thanh phong phú?',
        questionEn: 'Why do computers only store sequences of binary bits (0 and 1) yet humans can interact with rich text, numbers, images, and audio?',
        suggestedAnswerVi: 'Nhờ cơ chế biểu diễn thông tin (mã hoá): con người quy ước gán mỗi loại dữ liệu thành các dãy bit tương ứng theo các bảng mã chuẩn như ASCII, Unicode.',
        suggestedAnswerEn: 'Through information representation and encoding: standard character tables such as ASCII and Unicode map real-world data into binary sequences.',
        pedagogicalTipVi: 'Dẫn dắt học sinh thực hành thử nghiệm bộ giải mã mẫu bit trên màn hình để thấy 1 dãy bit có thể được hiểu theo nhiều kiểu dữ liệu khác nhau.',
        pedagogicalTipEn: 'Direct students to test the bit decoder widget on screen to observe how a bit sequence is interpreted across different types.'
      }
    ]
  },
  1: {
    sectionId: 'bai-3-phan-loai',
    sectionTitleVi: '1. Phân loại và biểu diễn thông tin (Hình 3.1 & 3.2 SGK)',
    sectionTitleEn: '1. Information Classification & Representation (Figures 3.1 & 3.2)',
    prompts: [
      {
        id: 'p3-1-1',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Dựa vào thẻ CCCD (Hình 3.1), tại sao "Số CCCD" gồm 12 chữ số lại được xếp vào kiểu Văn bản chứ không phải kiểu Số?',
        questionEn: 'Looking at the Citizen ID card (Fig 3.1), why is the 12-digit ID classified as Text rather than Number?',
        suggestedAnswerVi: 'Vì số CCCD không dùng để thực hiện các phép toán số học (cộng, trừ, nhân, chia) và cần giữ nguyên các chữ số 0 ở đầu (nếu là số thì số 0 đầu tiên sẽ bị mất).',
        suggestedAnswerEn: 'Because ID numbers undergo no arithmetic operations and leading zeros must be strictly preserved, which numeric types would discard.',
        pedagogicalTipVi: 'Nhấn mạnh tiêu chí phân loại: Dữ liệu kiểu số chỉ dành cho các đại lượng tham gia tính toán toán học.',
        pedagogicalTipEn: 'Emphasize the classification criterion: numeric types are reserved for quantities involved in arithmetic computation.'
      }
    ]
  },
  2: {
    sectionId: 'bai-3-ascii',
    sectionTitleVi: '2a. Bảng mã ASCII (Trang 17 SGK)',
    sectionTitleEn: '2a. ASCII Character Table (Page 17)',
    prompts: [
      {
        id: 'p3-2-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Bảng mã ASCII chuẩn 7-bit và mở rộng 8-bit có ưu điểm và hạn chế lớn nhất là gì?',
        questionEn: 'What are the main advantages and greatest limitation of standard 7-bit and 8-bit ASCII?',
        suggestedAnswerVi: 'Ưu điểm: Gọn nhẹ, chiếm ít bộ nhớ (1 byte/kí tự). Hạn chế: Chỉ có tối đa 256 vị trí, không đủ để biểu diễn tiếng Việt có dấu và hàng nghìn ngôn ngữ khác trên thế giới.',
        suggestedAnswerEn: 'Advantage: Compact (1 byte/char). Limitation: Only 256 code points, insufficient for accented Vietnamese and world languages.',
        pedagogicalTipVi: 'Cho học sinh tra cứu mã ASCII của ký tự A (65 = 01000001) trên bảng tương tác.',
        pedagogicalTipEn: 'Have students look up character A (65 = 01000001) in the interactive ASCII table.'
      }
    ]
  },
  3: {
    sectionId: 'bai-3-unicode',
    sectionTitleVi: '2b. Bảng mã Unicode & Tiếng Việt trong UTF-8 (Trang 17 – 18 SGK)',
    sectionTitleEn: '2b. Unicode & Vietnamese in UTF-8 (Pages 17 – 18)',
    prompts: [
      {
        id: 'p3-3-1',
        targetCognitiveLevel: 'Vận dụng cao',
        targetCognitiveLevelEn: 'Analyze',
        questionVi: 'Tại sao Việt Nam ban hành quy định bắt buộc áp dụng chuẩn UTF-8 trong trao đổi văn bản điện tử cơ quan nhà nước từ năm 2017?',
        questionEn: 'Why did Vietnam mandate the UTF-8 standard for official government electronic document exchange in 2017?',
        suggestedAnswerVi: 'Để thống nhất một chuẩn duy nhất, khắc phục triệt để tình trạng lỗi phông chữ khi trao đổi văn bản giữa các hệ điều hành và phần mềm khác nhau, tương thích toàn cầu.',
        suggestedAnswerEn: 'To standardize on a single global encoding, completely eliminating font corruption across heterogeneous operating systems and platforms.',
        pedagogicalTipVi: 'Mở bài tập so sánh các chuẩn mã cũ (TCVN3, VNI) với Unicode để học sinh thấy rõ bước tiến.',
        pedagogicalTipEn: 'Demonstrate legacy encoding issues (TCVN3, VNI) compared to seamless Unicode rendering.'
      }
    ]
  },
  4: {
    sectionId: 'bai-3-so-hoa',
    sectionTitleVi: '2c. Số hoá văn bản & Công nghệ nhập liệu (Trang 18 SGK)',
    sectionTitleEn: '2c. Text Digitization & Input Technologies (Page 18)',
    prompts: [
      {
        id: 'p3-4-1',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Công nghệ nhận dạng chữ quang học OCR và nhận dạng tiếng nói giúp gì cho quá trình số hoá tài liệu lịch sử và sách cổ?',
        questionEn: 'How do Optical Character Recognition (OCR) and speech recognition assist the digitization of historical archives and books?',
        suggestedAnswerVi: 'Tự động quét trang sách in/chữ viết tay thành tệp văn bản có thể tìm kiếm, biên tập nhanh gấp hàng trăm lần việc người gõ lại thủ công.',
        suggestedAnswerEn: 'Automating the scanning of paper books into searchable, editable text files hundreds of times faster than manual typing.',
        pedagogicalTipVi: 'Khuyến khích học sinh dùng thử tính năng quét chữ bằng camera trên điện thoại thông minh.',
        pedagogicalTipEn: 'Encourage students to test optical text scanning using camera apps on smartphones.'
      }
    ]
  },
  5: {
    sectionId: 'bai-3-luyen-tap',
    sectionTitleVi: 'Luyện tập & Vận dụng (Trang 19 SGK)',
    sectionTitleEn: 'Practice & Application (Page 19)',
    prompts: [
      {
        id: 'p3-5-1',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Khi kiểm tra bài Luyện tập 1 về Giấy phép lái xe, học sinh hay nhầm lẫn trường dữ liệu nào nhất và cách sửa chữa?',
        questionEn: 'In Practice Task 1 on driver licenses, which data field do students confuse most often, and how to clarify it?',
        suggestedAnswerVi: 'Học sinh hay nhầm "Hạng lái xe" (A1, B2) thành kiểu số. Giáo viên cần nhắc nhở vì có chữ cái B, A nên bắt buộc là kiểu văn bản.',
        suggestedAnswerEn: 'Students often mistake "License Class" (A1, B2) as numeric. Remind them that alphabetic characters require text data type.',
        pedagogicalTipVi: 'Yêu cầu học sinh làm bài tập ghép nối trên ứng dụng và kiểm tra độ chính xác.',
        pedagogicalTipEn: 'Ask students to complete the matching exercise on screen and verify their score.'
      }
    ]
  }
};

// -------------------------------------------------------------
// BÀI 4: HỆ NHỊ PHÂN VÀ DỮ LIỆU SỐ NGUYÊN (Trang 20 – 23 SGK)
// -------------------------------------------------------------
export const TEACHER_PROMPTS_LESSON_4: Record<number, SectionTeacherPrompts> = {
  0: {
    sectionId: 'bai-4-muc-tieu-khoi-dong',
    sectionTitleVi: 'Mục tiêu & Khởi động bài học (Trang 20 SGK)',
    sectionTitleEn: 'Lesson 4 Objectives & Warm-up (Page 20)',
    prompts: [
      {
        id: 'p4-0-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Tại sao máy tính lại chọn hệ nhị phân (chỉ dùng 0 và 1) làm ngôn ngữ nền tảng thay vì dùng hệ thập phân quen thuộc của con người?',
        questionEn: 'Why do computers utilize the binary numeral system (0 and 1) rather than our familiar human decimal system?',
        suggestedAnswerVi: 'Vì mạch điện tử chỉ có hai trạng thái vật lý ổn định và dễ phân biệt nhất: đóng/mở mạch, có điện áp/không có điện áp, tương ứng hoàn hảo với hai chữ số 0 và 1.',
        suggestedAnswerEn: 'Because electronic components have two highly reliable physical states: on/off, high/low voltage, matching binary 0 and 1 perfectly.',
        pedagogicalTipVi: 'Cho học sinh bật tắt các công tắc bit trong bàn chuyển mạch 8-bit trên màn hình để hiểu trực quan.',
        pedagogicalTipEn: 'Have students toggle the 8-bit switchboard widget to experience positional power weights.'
      }
    ]
  },
  1: {
    sectionId: 'bai-4-doi-co-so',
    sectionTitleVi: '1a & 1b. Hệ nhị phân & Đổi cơ số (Hình 4.1 SGK)',
    sectionTitleEn: '1a & 1b. Binary System & Base Conversion (Figure 4.1)',
    prompts: [
      {
        id: 'p4-1-1',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Khi đổi một số thập phân sang nhị phân theo thuật toán chia 2 liên tiếp, tại sao phải đọc dãy số dư NGƯỢC từ dưới lên?',
        questionEn: 'When converting decimal to binary via successive division by 2, why must remainders be read in REVERSE from bottom to top?',
        suggestedAnswerVi: 'Vì số dư của phép chia đầu tiên tương ứng với luỹ thừa 2⁰ (hàng đơn vị bên phải nhất), số dư của các phép chia sau tương ứng với luỹ thừa 2¹, 2²... có trọng số cao hơn.',
        suggestedAnswerEn: 'Because the first remainder corresponds to 2⁰ (least significant bit on the far right), and subsequent remainders scale to higher powers 2¹, 2².',
        pedagogicalTipVi: 'Dùng công cụ chia liên tiếp tương tác trên màn hình với số 19 và 155 để học sinh thấy hoạt ảnh mũi tên chỉ ngược lên.',
        pedagogicalTipEn: 'Use the interactive division tool with 19 and 155 to highlight the upward reading arrow.'
      }
    ]
  },
  2: {
    sectionId: 'bai-4-so-nguyen-co-dau',
    sectionTitleVi: '1c. Biểu diễn số nguyên có dấu: Mã thuận, Mã bù 1 & 2 (Trang 21 SGK)',
    sectionTitleEn: "1c. Signed Integers: Sign-Mag & Two's Complement (Page 21)",
    prompts: [
      {
        id: 'p4-2-1',
        targetCognitiveLevel: 'Vận dụng cao',
        targetCognitiveLevelEn: 'Analyze',
        questionVi: 'Mã bù 2 được lập như thế nào và tại sao nó lại được chọn làm chuẩn lưu trữ số nguyên âm trong hầu hết CPU hiện đại?',
        questionEn: "How is two's complement constructed, and why is it the universal standard for negative integers in modern CPUs?",
        suggestedAnswerVi: 'Cách lập: Lấy mã bù 1 (đảo tất cả các bit của số dương) rồi cộng thêm 1. Lý do: Giúp mạch số học ALU thực hiện phép trừ A - B thông qua phép cộng A + (-B), không cần thiết kế mạch trừ riêng.',
        suggestedAnswerEn: "Formed by inverting all bits (one's complement) then adding 1. It enables the CPU ALU to execute subtraction A - B as simple addition A + (-B).",
        pedagogicalTipVi: 'Cho học sinh nhập số -19 vào công cụ sinh mã bù 2 để kiểm chứng kết quả 11101101₂ khớp SGK trang 21.',
        pedagogicalTipEn: 'Have students enter -19 into the two’s complement generator to verify 11101101₂ matching Page 21.'
      }
    ]
  },
  3: {
    sectionId: 'bai-4-phep-cong',
    sectionTitleVi: '2a & 2b. Bảng số học & Phép cộng nhị phân (Hình 4.2 SGK)',
    sectionTitleEn: '2a & 2b. Arithmetic Tables & Binary Addition (Figure 4.2)',
    prompts: [
      {
        id: 'p4-3-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Trong phép cộng hai số nhị phân, quy tắc nhớ khi 1 + 1 và khi 1 + 1 + 1 (có nhớ) được thực hiện như thế nào?',
        questionEn: 'In binary column addition, how do carry rules operate for 1 + 1 and for 1 + 1 + 1 (with carry)?',
        suggestedAnswerVi: '1 + 1 = 10₂ (viết 0, nhớ 1 sang cột bên trái). Nếu có bit nhớ chuyển sang thì 1 + 1 + 1 = 11₂ (viết 1, nhớ 1 sang cột bên trái).',
        suggestedAnswerEn: '1 + 1 = 10₂ (write 0, carry 1 to left column). With carry-in: 1 + 1 + 1 = 11₂ (write 1, carry 1).',
        pedagogicalTipVi: 'Bật mô phỏng đặt tính cộng cột dọc ví dụ 27 + 26 = 53 trên ứng dụng để học sinh xem dòng bit nhớ màu vàng.',
        pedagogicalTipEn: 'Launch the vertical column addition simulator for 27 + 26 = 53 to show the yellow carry bit row.'
      }
    ]
  },
  4: {
    sectionId: 'bai-4-phep-nhan',
    sectionTitleVi: '2c & Quy trình tính toán máy tính (Hình 4.3 & 4.4 SGK)',
    sectionTitleEn: '2c & Computer Calculation Pipeline (Figures 4.3 & 4.4)',
    prompts: [
      {
        id: 'p4-4-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Quy trình tính toán 3 bước của máy tính trong Hình 4.4 SGK diễn ra như thế nào?',
        questionEn: 'How does the three-stage computing pipeline operate as shown in Figure 4.4?',
        suggestedAnswerVi: 'Bước 1: Mã hoá (chuyển số thập phân sang nhị phân) → Bước 2: Xử lí (bộ ALU thực hiện phép tính nhị phân) → Bước 3: Giải mã (chuyển kết quả nhị phân về thập phân để hiển thị lên màn hình).',
        suggestedAnswerEn: 'Stage 1: Encode decimal to binary → Stage 2: Processing in the CPU ALU → Stage 3: Decode binary results back to decimal for screen display.',
        pedagogicalTipVi: 'Cho học sinh thử nghiệm phép tính 125 + 17 trong bộ mô phỏng đường ống ALU tương tác.',
        pedagogicalTipEn: 'Have students test 125 + 17 in the interactive ALU pipeline simulator.'
      }
    ]
  },
  5: {
    sectionId: 'bai-4-luyen-tap',
    sectionTitleVi: 'Luyện tập & Vận dụng (Trang 23 SGK)',
    sectionTitleEn: 'Practice & Application (Page 23)',
    prompts: [
      {
        id: 'p4-5-1',
        targetCognitiveLevel: 'Vận dụng cao',
        targetCognitiveLevelEn: 'Analyze',
        questionVi: 'Trong bài Vận dụng 1, thuật toán đổi phần thập phân của một số thực (ví dụ 0.625) sang nhị phân khác gì so với đổi phần nguyên?',
        questionEn: 'In Application Task 1, how does converting fractional decimals (e.g. 0.625) to binary differ from integer conversion?',
        suggestedAnswerVi: 'Đổi phần nguyên thì CHIA liên tiếp cho 2 và đọc số dư NGƯỢC từ dưới lên; còn đổi phần thập phân thì NHÂN liên tiếp với 2, lấy phần nguyên và đọc XUÔI từ trên xuống dưới (0.625 × 2 = 1.25 lấy 1; 0.25 × 2 = 0.5 lấy 0; 0.5 × 2 = 1.0 lấy 1 ➔ 0.101₂).',
        suggestedAnswerEn: 'Integers use successive division by 2 reading remainders upward; fractions use successive multiplication by 2 taking integer parts and reading downward.',
        pedagogicalTipVi: 'Mở công cụ chuyển đổi phân số trên màn hình để học sinh tự nhập các số thập phân lẻ khác.',
        pedagogicalTipEn: 'Open the fractional converter on screen for students to test additional decimal fractions.'
      }
    ]
  }
};

// -------------------------------------------------------------
// BÀI 5: DỮ LIỆU LÔGIC (Trang 24 – 27 SGK)
// -------------------------------------------------------------
export const TEACHER_PROMPTS_LESSON_5: Record<number, SectionTeacherPrompts> = {
  0: {
    sectionId: 'bai-5-muc-tieu-khoi-dong',
    sectionTitleVi: 'Mục tiêu & Khởi động: George Boole & Lôgic mệnh đề (Trang 24 SGK)',
    sectionTitleEn: 'Lesson 5 Objectives & George Boole (Page 24)',
    prompts: [
      {
        id: 'p5-0-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Nhà toán học George Boole (Hình 5.1) đã có đóng góp lịch sử mang tính đột phá gì cho ngành Khoa học máy tính?',
        questionEn: 'What historic contribution did George Boole (Fig 5.1) make to computer science?',
        suggestedAnswerVi: 'Ông đã xây dựng nên đại số lôgic (Boolean algebra) với các phép toán trên hai giá trị chân lí "Đúng" và "Sai", tạo cơ sở lý thuyết toán học cho việc thiết kế vi mạch điện tử máy tính.',
        suggestedAnswerEn: 'He formulated Boolean algebra operating on truth values True and False, providing the mathematical foundation for digital electronic circuit design.',
        pedagogicalTipVi: 'Giáo viên nhấn mạnh: Không có đại số Boole thì không thể thiết kế cổng logic bên trong vi xử lý CPU ngày nay.',
        pedagogicalTipEn: 'Emphasize that without Boolean algebra, modern microprocessors and logic gates could not be engineered.'
      },
      {
        id: 'p5-0-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Trong Hoạt động 1 về dự báo thời tiết "Ngày mai trời lạnh và có mưa", tại sao chỉ có trường hợp Đúng - Đúng thì dự báo mới đúng?',
        questionEn: 'In Activity 1 regarding the weather forecast "Tomorrow will be cold AND rainy", why is the forecast true only when both cold and rain occur?',
        suggestedAnswerVi: 'Vì liên từ "VÀ" đòi hỏi đồng thời cả hai vế "trời lạnh" và "có mưa" phải cùng xảy ra. Nếu chỉ lạnh mà không mưa hoặc chỉ mưa mà không lạnh thì lời dự báo đã không trọn vẹn (sai).',
        suggestedAnswerEn: 'Because the conjunction "AND" requires both conditions to hold simultaneously. If it is only cold or only rainy, the compound forecast is false.',
        pedagogicalTipVi: 'Dẫn dắt chuyển giao: Đó chính là bản chất của phép toán lôgic AND trong Tin học.',
        pedagogicalTipEn: 'Bridge to theory: this illustrates the exact definition of the logical AND operator in informatics.'
      }
    ]
  },
  1: {
    sectionId: 'bai-5-cac-phep-toan',
    sectionTitleVi: '1b. Các phép toán lôgic cơ bản & Bảng 5.2 (Trang 25 SGK)',
    sectionTitleEn: '1b. Logic Operators & Truth Table 5.2 (Page 25)',
    prompts: [
      {
        id: 'p5-1-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Hãy phân biệt điểm khác biệt then chốt giữa phép OR (cộng lôgic) và phép XOR (cộng loại trừ) khi cả hai mệnh đề p và q đều Đúng (1)?',
        questionEn: 'What is the crucial difference between OR and XOR when both operands p and q are True (1)?',
        suggestedAnswerVi: 'Khi p = 1 và q = 1: Phép p OR q cho kết quả là 1 (vì chỉ cần ít nhất một vế đúng); còn phép p XOR q cho kết quả là 0 (vì XOR yêu cầu hai vế phải có giá trị khác nhau).',
        suggestedAnswerEn: 'When p = 1 and q = 1: p OR q evaluates to 1 (at least one is true); but p XOR q evaluates to 0 (XOR requires operands to have differing truth values).',
        pedagogicalTipVi: 'Cho học sinh quan sát hàng đầu tiên của Bảng 5.2 trên ứng dụng và bấm thử nút bật tắt cổng logic tương tác.',
        pedagogicalTipEn: 'Direct students to examine the first row of Table 5.2 and interact with the logic gate simulator.'
      },
      {
        id: 'p5-1-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Trong biểu thức lôgic không có ngoặc như "p AND NOT q OR r", thứ tự các phép tính được thực hiện như thế nào?',
        questionEn: 'In an unparenthesized Boolean expression like "p AND NOT q OR r", what is the evaluation sequence?',
        suggestedAnswerVi: 'Bước 1: Thực hiện phép NOT q trước. Bước 2: Thực hiện phép AND (p AND (NOT q)). Bước 3: Thực hiện phép OR cuối cùng từ trái sang phải.',
        suggestedAnswerEn: 'Step 1: Evaluate NOT q first. Step 2: Evaluate AND: p AND (NOT q). Step 3: Evaluate OR with r from left to right.',
        pedagogicalTipVi: 'Nhắc học sinh quy tắc ưu tiên: Dấu ngoặc > Phép NOT > Phép AND và OR.',
        pedagogicalTipEn: 'Reinforce the precedence hierarchy: Parentheses > NOT > AND and OR.'
      }
    ]
  },
  2: {
    sectionId: 'bai-5-bitwise-ghi-nho',
    sectionTitleVi: 'Phép toán lôgic trên dãy bit & Hộp Ghi nhớ 1 (Trang 26 SGK)',
    sectionTitleEn: 'Bitwise Logic Operations & Memorization Box 1 (Page 26)',
    prompts: [
      {
        id: 'p5-2-1',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Trong Hình 5.3 SGK, phép toán OR trên 2 byte được thực hiện theo nguyên tắc nào?',
        questionEn: 'In Figure 5.3, what principle governs bitwise OR operations between two bytes?',
        suggestedAnswerVi: 'Thực hiện phép OR độc lập trên từng cặp bit ở cùng một vị trí tương ứng từ phải sang trái. Cặp nào có ít nhất một bit 1 thì bit kết quả bằng 1.',
        suggestedAnswerEn: 'Bitwise OR is applied independently to each corresponding bit pair. If either bit is 1, the resulting bit at that position is 1.',
        pedagogicalTipVi: 'Mời học sinh thực hành trên máy tính bitwise trực quan của ứng dụng.',
        pedagogicalTipEn: 'Invite students to test custom binary strings in the on-screen Bitwise Calculator.'
      }
    ]
  },
  3: {
    sectionId: 'bai-5-bieu-dien-logic',
    sectionTitleVi: '2. Biểu diễn dữ liệu lôgic & Quy ước lập trình (Trang 26 – 27 SGK)',
    sectionTitleEn: '2. Logic Data Representation & Programming Conventions (Pages 26–27)',
    prompts: [
      {
        id: 'p5-3-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Tại sao chỉ cần duy nhất 1 bit là đủ để lưu trữ một đại lượng lôgic trong máy tính?',
        questionEn: 'Why is a single bit fundamentally sufficient to store a logic value in computer memory?',
        suggestedAnswerVi: 'Vì dữ liệu lôgic chỉ có 2 trạng thái chân lí đối lập là Đúng và Sai, khớp hoàn hảo với 2 giá trị 1 và 0 của một bit.',
        suggestedAnswerEn: 'Because logic data has only two mutually exclusive states (True and False), perfectly encoded by the binary values 1 and 0 of a single bit.',
        pedagogicalTipVi: 'Liên hệ ngôn ngữ Python: số 0 là False, mọi số khác 0 đều được coi là True.',
        pedagogicalTipEn: 'Connect to Python semantics where 0 evaluates to False and any non-zero value evaluates to True.'
      }
    ]
  },
  4: {
    sectionId: 'bai-5-mach-dien',
    sectionTitleVi: 'Vận dụng: Mạch điện công tắc nối tiếp & song song (Hình 5.5 & 5.6 SGK)',
    sectionTitleEn: 'Application: Series & Parallel Switching Circuits (Figures 5.5 & 5.6)',
    prompts: [
      {
        id: 'p5-4-1',
        targetCognitiveLevel: 'Vận dụng cao',
        targetCognitiveLevelEn: 'Analyze',
        questionVi: 'Tại sao mạch điện có 2 công tắc mắc nối tiếp (Hình 5.5) lại là hiện thực hoá vật lý của cổng AND, còn mắc song song (Hình 5.6) là cổng OR?',
        questionEn: 'Why are series switches (Fig 5.5) a physical implementation of an AND gate, while parallel switches (Fig 5.6) represent an OR gate?',
        suggestedAnswerVi: 'Mắc nối tiếp: Dòng điện chỉ có thể chạy qua làm bóng đèn sáng khi CẢ K1 VÀ K2 CÙNG ĐÓNG (K1 AND K2 = 1). Mắc song song: Dòng điện có 2 nhánh rẽ, chỉ cần K1 ĐÓNG HOẶC K2 ĐÓNG là đèn đã sáng (K1 OR K2 = 1).',
        suggestedAnswerEn: 'Series: Current passes and lights the bulb only when BOTH K1 and K2 are closed (K1 AND K2 = 1). Parallel: Alternate paths allow current if EITHER K1 OR K2 is closed (K1 OR K2 = 1).',
        pedagogicalTipVi: 'Bật mô phỏng mạch điện ảo có bóng đèn và công tắc đóng ngắt trên màn hình để học sinh tự tay click công tắc xem đèn bật sáng.',
        pedagogicalTipEn: 'Launch the virtual circuit sandbox for students to click switches and watch the light bulb glow.'
      }
    ]
  },
  5: {
    sectionId: 'bai-5-luyen-tap',
    sectionTitleVi: 'Luyện tập & Vận dụng (Trang 27 SGK)',
    sectionTitleEn: 'Practice & Application (Page 27)',
    prompts: [
      {
        id: 'p5-5-1',
        targetCognitiveLevel: 'Vận dụng cao',
        targetCognitiveLevelEn: 'Analyze',
        questionVi: 'Trong bài Luyện tập 2, tại sao p AND NOT p luôn luôn bằng 0, còn p OR NOT p luôn luôn bằng 1?',
        questionEn: 'In Practice Task 2, why is (p AND NOT p) always 0, whereas (p OR NOT p) is always 1?',
        suggestedAnswerVi: 'Vì p và NOT p luôn có một vế bằng 1 và một vế bằng 0. Phép AND cần cả hai vế cùng bằng 1 nên kết quả luôn bằng 0 (Luật phi mâu thuẫn). Phép OR chỉ cần một vế bằng 1 nên kết quả luôn bằng 1 (Luật bài trung).',
        suggestedAnswerEn: 'Between p and NOT p, one is always 1 and the other is 0. AND requires both to be 1, so it always yields 0 (Law of Non-Contradiction). OR requires only one to be 1, so it always yields 1 (Law of Excluded Middle).',
        pedagogicalTipVi: 'Khuyến khích học sinh lập bảng chân trị 2 dòng cho p = 1 và p = 0 để chứng minh mệnh đề một cách chặt chẽ.',
        pedagogicalTipEn: 'Guide students to construct a quick 2-row truth table for p = 1 and p = 0 to prove the tautology mathematically.'
      }
    ]
  }
};

// -------------------------------------------------------------
// BÀI 6: DỮ LIỆU ÂM THANH VÀ HÌNH ẢNH (Trang 28 – 32 SGK)
// -------------------------------------------------------------
export const TEACHER_PROMPTS_LESSON_6: Record<number, SectionTeacherPrompts> = {
  0: {
    sectionId: 'bai-6-tong-quan',
    sectionTitleVi: 'Mục tiêu, Khởi động & Hoạt động 1 (Trang 28 SGK)',
    sectionTitleEn: 'Objectives, Warm-up & Activity 1 (Page 28)',
    prompts: [
      {
        id: 'p6-0-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Âm thanh trong không khí và hình ảnh tự nhiên là loại tín hiệu gì, và vì sao máy tính không thể trực tiếp lưu trữ chúng mà phải qua số hoá?',
        questionEn: 'What type of signals are natural sound waves and images, and why cannot digital computers store them directly without digitization?',
        suggestedAnswerVi: 'Âm thanh và ánh sáng tự nhiên là các tín hiệu tương tự (analog) liên tục với vô số mức biên độ. Máy tính là thiết bị điện tử số chỉ hoạt động trên các tín hiệu rời rạc nhị phân (0 và 1), do đó bắt buộc phải chuyển đổi tín hiệu tương tự thành các dãy số nhị phân.',
        suggestedAnswerEn: 'Natural acoustic waves and light are continuous analog signals with infinite variations. Digital computers are discrete electronic devices functioning strictly on binary 0 and 1, necessitating analog-to-digital conversion.',
        pedagogicalTipVi: 'Dùng hoạt động trải nghiệm trên màn hình: Chuyển đổi giữa sóng cong liên tục và các điểm lấy mẫu rời rạc để học sinh trực quan nhận biết.',
        pedagogicalTipEn: 'Use the interactive canvas toggling between smooth continuous curves and discrete samples for intuitive comprehension.'
      }
    ]
  },
  1: {
    sectionId: 'bai-6-pcm',
    sectionTitleVi: '1a. Số hoá âm thanh & Điều chế mã xung PCM (Trang 28 SGK)',
    sectionTitleEn: '1a. Audio Digitization & PCM (Page 28)',
    prompts: [
      {
        id: 'p6-1-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Nêu và giải thích tóm tắt 3 bước trong quy trình điều chế mã xung (PCM) để số hoá âm thanh?',
        questionEn: 'State and briefly explain the 3 steps of Pulse Code Modulation (PCM) in digitizing audio?',
        suggestedAnswerVi: 'Bước 1 Lấy mẫu (Sampling): Đo biên độ tín hiệu ở những khoảng thời gian rời rạc cách đều nhau (chu kì lấy mẫu T). Bước 2 Lượng tử hoá (Quantization): Chia thang biên độ thành các mức rời rạc và làm tròn giá trị đo về mức gần nhất. Bước 3 Mã hoá (Binary Encoding): Đổi các giá trị mức thành các số nhị phân và ghép thành chuỗi bit.',
        suggestedAnswerEn: 'Step 1 Sampling: Measure amplitudes at discrete equidistant time intervals (sampling period T). Step 2 Quantization: Discretize amplitude into finite levels and round sample values to nearest level. Step 3 Encoding: Convert quantized levels to binary and concatenate into a bitstream.',
        pedagogicalTipVi: 'Cho học sinh điều chỉnh thanh trượt Chu kì lấy mẫu và Độ sâu bit trong phòng thí nghiệm ảo để xem bậc thang số hoá ôm sát đường cong âm thanh gốc ra sao.',
        pedagogicalTipEn: 'Direct students to adjust the sampling rate and bit depth sliders to observe how quantized staircases converge towards original waveforms.'
      }
    ]
  },
  2: {
    sectionId: 'bai-6-bitrate',
    sectionTitleVi: '1b. Tốc độ bit & Định dạng âm thanh WAV vs MP3 (Trang 29 SGK)',
    sectionTitleEn: '1b. Bit-rate & Audio Formats WAV vs MP3 (Page 29)',
    prompts: [
      {
        id: 'p6-2-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Tốc độ bit (bit-rate) là gì? Vì sao tệp định dạng MP3 lại nhỏ hơn tệp WAV khoảng 10 lần mà tai người nghe vẫn thấy tốt?',
        questionEn: 'What is bit-rate? Why is an MP3 file ~10 times smaller than a WAV file while still sounding acceptable to human ears?',
        suggestedAnswerVi: 'Tốc độ bit là số bit cần thiết để biểu diễn 1 giây âm thanh. Tệp WAV lưu trữ toàn bộ dữ liệu PCM thô không nén nên kích thước rất lớn. MP3 dùng thuật toán nén có mất mát, loại bỏ những tần số âm thanh quá cao hoặc quá trầm mà tai người bình thường khó nhận biết, giúp giảm dung lượng xuống khoảng 1/10.',
        suggestedAnswerEn: 'Bit-rate is the number of bits required to represent one second of audio. WAV stores raw uncompressed PCM. MP3 employs psychoacoustic lossy compression, stripping frequencies imperceptible to normal human hearing, reducing size by ~10x.',
        pedagogicalTipVi: 'Sử dụng công cụ tính dung lượng trên ứng dụng: So sánh 3.5 phút bài hát giữa WAV (~36 MB) và MP3 (~3.3 MB).',
        pedagogicalTipEn: 'Utilize the on-screen bitrate calculator: compare 3.5 minutes of audio between WAV (~36 MB) and MP3 (~3.3 MB).'
      }
    ]
  },
  3: {
    sectionId: 'bai-6-rgb',
    sectionTitleVi: '2a. Biểu diễn hình ảnh & Hệ màu RGB (Trang 30 SGK)',
    sectionTitleEn: '2a. Image Representation & RGB Model (Page 30)',
    prompts: [
      {
        id: 'p6-3-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Trong hệ màu RGB 24 bit, mỗi màu cơ bản được mã hoá bởi bao nhiêu bit và tại sao lại tạo ra được khoảng 16,7 triệu màu sắc?',
        questionEn: 'In standard 24-bit RGB, how many bits encode each channel and why does it generate ~16.7 million distinct colors?',
        suggestedAnswerVi: 'Mỗi màu cơ bản (Red, Green, Blue) được mã hoá bởi 8 bit (2⁸ = 256 mức sáng từ 0 đến 255). Ba màu kết hợp độc lập tạo ra 256 × 256 × 256 = 16.777.216 tổ hợp màu sắc khác nhau (xấp xỉ 16,7 triệu màu).',
        suggestedAnswerEn: 'Each primary channel (Red, Green, Blue) is encoded by 8 bits (2⁸ = 256 levels from 0 to 255). Their independent combinations yield 256³ = 16,777,216 distinct color shades (~16.7 million).',
        pedagogicalTipVi: 'Bật kính hiển vi Subpixel trên phần mềm: Kéo thanh trượt R, G, B để quan sát 3 đi-ốt quang phát sáng tương ứng.',
        pedagogicalTipEn: 'Open the Subpixel Microscope widget: adjust R, G, B sliders to watch individual subpixel diodes glow proportionally.'
      }
    ]
  },
  4: {
    sectionId: 'bai-6-bitmap',
    sectionTitleVi: '2b. Ảnh Bitmap & Các định dạng tệp BMP, JPEG, PNG (Trang 31 SGK)',
    sectionTitleEn: '2b. Bitmap Graphics & File Formats (Page 31)',
    prompts: [
      {
        id: 'p6-4-1',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Khi nào nên lưu tệp ảnh dưới dạng .jpeg và khi nào nên lưu dưới dạng .png?',
        questionEn: 'When should an image be saved as .jpeg versus .png?',
        suggestedAnswerVi: 'Nên dùng .jpeg cho ảnh chụp phong cảnh, chân dung có hàng triệu màu phức tạp để có dung lượng nhẹ nhất tải web nhanh. Nên dùng .png cho ảnh logo, biểu tượng, sơ đồ đồ hoạ cần viền chữ sắc nét và nền trong suốt.',
        suggestedAnswerEn: 'Use .jpeg for photographic captures with complex continuous gradients to minimize file size on web. Use .png for logos, graphics, and text requiring lossless sharp edges and transparent backgrounds.',
        pedagogicalTipVi: 'Cho học sinh vẽ thử trên lưới ma trận 8x8 của ứng dụng để thấy ảnh bitmap lưu trực tiếp giá trị từng pixel.',
        pedagogicalTipEn: 'Have students draw on the 8x8 pixel grid canvas to see how bitmap graphics record individual pixel values.'
      }
    ]
  },
  5: {
    sectionId: 'bai-6-luyen-tap',
    sectionTitleVi: 'Luyện tập & Vận dụng (Trang 32 SGK)',
    sectionTitleEn: 'Practice & Application (Page 32)',
    prompts: [
      {
        id: 'p6-5-1',
        targetCognitiveLevel: 'Vận dụng cao',
        targetCognitiveLevelEn: 'Analyze',
        questionVi: 'Giải thích tại sao một đĩa CD dung lượng 650 MB với tốc độ bit 1411 Kb/s lại có thể phát liên tục khoảng 63 phút?',
        questionEn: 'Explain why a 650 MB CD recording at 1411 Kb/s can play continuously for approximately 63 minutes?',
        suggestedAnswerVi: 'Đổi 650 MB = 650 × 1024 × 8 = 5.324.800 Kbit. Thời gian t = 5.324.800 / 1411 ≈ 3773,78 giây. Chia cho 60 giây ta được 62,9 phút ≈ 63 phút.',
        suggestedAnswerEn: 'Convert 650 MB = 650 × 1024 × 8 = 5,324,800 Kbit. Duration t = 5,324,800 / 1411 ≈ 3773.78 seconds. Dividing by 60 gives 62.9 minutes ≈ 63 minutes.',
        pedagogicalTipVi: 'Nhắc học sinh lưu ý đơn vị đo: Byte và Bit (1 Byte = 8 Bit) và quy đổi 1 MB = 1024 KB để tránh sai số.',
        pedagogicalTipEn: 'Remind students of unit conversions: bytes versus bits (1 Byte = 8 bits) and 1 MB = 1024 KB to avoid arithmetic mistakes.'
      }
    ]
  }
};

// -------------------------------------------------------------
// BÀI 7: THỰC HÀNH SỬ DỤNG THIẾT BỊ SỐ THÔNG DỤNG (Trang 33 – 37 SGK)
// -------------------------------------------------------------
export const TEACHER_PROMPTS_LESSON_7: Record<number, SectionTeacherPrompts> = {
  0: {
    sectionId: 'bai-7-tong-quan',
    sectionTitleVi: 'Mục tiêu, Khởi động & Hoạt động 1 (Trang 33 SGK)',
    sectionTitleEn: 'Objectives, Warm-up & Activity 1 (Page 33)',
    prompts: [
      {
        id: 'p7-0-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Thuật ngữ PDA viết tắt của cụm từ tiếng Anh nào và ban đầu được chế tạo nhằm phục vụ mục đích gì?',
        questionEn: 'What does the acronym PDA stand for, and what primary purpose was it originally designed to serve?',
        suggestedAnswerVi: 'PDA là viết tắt của Personal Digital Assistant (Trợ thủ số cá nhân). Ban đầu, PDA được chế tạo nhằm giúp người dùng quản lý công việc cá nhân như: sổ lịch ghi công tác, danh bạ điện thoại, sổ ghi nhớ (notes), danh sách việc cần làm (to-do list) và máy tính bỏ túi.',
        suggestedAnswerEn: 'PDA stands for Personal Digital Assistant. It was originally engineered to assist users in managing personal schedules, address books, quick notes, to-do lists, and pocket calculator functions.',
        pedagogicalTipVi: 'Cho học sinh bấm vào các thẻ thiết bị số ở phần Khởi động (Máy tính bảng, Máy đọc sách, Điện thoại thông minh, Đồng hồ thông minh) để nhận diện các dạng trợ thủ số hiện đại.',
        pedagogicalTipEn: 'Direct students to interact with the device cards in the Warm-up section to identify diverse contemporary personal digital assistants.'
      },
      {
        id: 'p7-0-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Tại sao máy đọc sách (E-reader) và đồng hồ thông minh (Smartwatch) cũng được coi là các thiết bị trợ thủ số cá nhân hữu ích?',
        questionEn: 'Why are e-readers and smartwatches categorized as beneficial personal digital assistants?',
        suggestedAnswerVi: 'Bởi vì chúng tích hợp các chức năng số chuyên biệt phục vụ cá nhân: Máy đọc sách lưu trữ cả thư viện sách, màn hình E-ink chống mỏi mắt; Đồng hồ thông minh theo dõi nhịp tim, bước chân, giấc ngủ và đồng bộ thông báo cuộc gọi, nhắc nhở lịch trình hàng ngày.',
        suggestedAnswerEn: 'Because they integrate dedicated digital functions for personal use: e-readers store vast libraries with glare-free E-ink screens; smartwatches track vitals, step counts, sleep cycles, and sync timely notifications and calendar reminders.',
        pedagogicalTipVi: 'Khuyến khích học sinh chia sẻ trải nghiệm thực tế về việc sử dụng đồng hồ thông minh hoặc ứng dụng theo dõi sức khoẻ.',
        pedagogicalTipEn: 'Encourage students to share personal experiences using smartbands or health tracking features in daily routines.'
      }
    ]
  },
  1: {
    sectionId: 'bai-7-pda-evolution',
    sectionTitleVi: '1. Trợ thủ số cá nhân & Sự hội tụ công nghệ (Trang 33 – 34 SGK)',
    sectionTitleEn: '1. Personal Digital Assistant & Tech Convergence (Pages 33 – 34)',
    prompts: [
      {
        id: 'p7-1-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Theo SGK, ngày nay các thiết bị nào đã thay thế hoàn toàn máy PDA truyền thống và vì sao lại có sự thay thế này?',
        questionEn: 'According to the textbook, which devices have largely superseded traditional PDAs and what drove this evolution?',
        suggestedAnswerVi: 'Điện thoại thông minh (smartphone) và máy tính bảng (tablet) đã thay thế PDA. Nguyên nhân do sự hội tụ công nghệ: smartphone tích hợp vi xử lý mạnh mẽ, màn hình cảm ứng độ nét cao, hệ điều hành hiện đại, kết nối mạng Internet tốc độ cao (4G/5G, Wi-Fi) và kho ứng dụng khổng lồ.',
        suggestedAnswerEn: 'Smartphones and tablets have superseded dedicated PDAs. Technological convergence combined powerful SoCs, high-definition touch displays, modern mobile OS, ubiquitous high-speed cellular/Wi-Fi connectivity, and extensive app ecosystems.',
        pedagogicalTipVi: 'Dẫn dắt học sinh quan sát Hình 7.2 (màn hình PDA ban đầu) và so sánh với giao diện smartphone hiện đại ở Bảng tiến hóa.',
        pedagogicalTipEn: 'Guide students to contrast Figure 7.2 (early PDA display) with modern smartphone user interfaces in the interactive evolution timeline.'
      },
      {
        id: 'p7-1-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Hãy so sánh hai phương thức kết nối không dây phổ biến trên điện thoại thông minh: Bluetooth và Wi-Fi về tầm phủ sóng, tốc độ và trường hợp sử dụng điển hình?',
        questionEn: 'Compare two prevalent wireless connectivity protocols on smartphones: Bluetooth and Wi-Fi regarding range, speed, and typical use cases?',
        suggestedAnswerVi: 'Bluetooth: Cự ly ngắn (dưới 10m), tiêu thụ ít năng lượng, tốc độ vừa phải, dùng kết nối phụ kiện như tai nghe không dây, chuột, bàn phím, đồng hồ thông minh. Wi-Fi: Cự ly trung bình (30-100m trong nhà), tốc độ truyền cao, kết nối vào mạng cục bộ và Internet để duyệt web, xem video trực tuyến, sao lưu đám mây.',
        suggestedAnswerEn: 'Bluetooth: Short range (<10m), ultra-low power consumption, moderate speed, ideal for wireless peripherals (earbuds, smartwatch). Wi-Fi: Medium range (30-100m indoors), high-throughput data transfer, connects to local LAN and global Internet for browsing, video streaming, and cloud sync.',
        pedagogicalTipVi: 'Yêu cầu học sinh mở bộ thử nghiệm kết nối tương tác (Bluetooth vs Wi-Fi vs Cáp USB-C) trên màn hình để kiểm tra thông số kỹ thuật.',
        pedagogicalTipEn: 'Ask students to open the interactive connectivity module (Bluetooth vs Wi-Fi vs USB-C) to review transfer rates and range.'
      }
    ]
  },
  2: {
    sectionId: 'bai-7-smartphone-hardware',
    sectionTitleVi: 'Nhiệm vụ 1: Nhận biết phần cứng điện thoại thông minh (Trang 34 – 35 SGK)',
    sectionTitleEn: 'Task 1: Recognizing Smartphone Hardware Components (Pages 34 – 35)',
    prompts: [
      {
        id: 'p7-2-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Em hãy kể tên các nút bấm vật lí và các cổng kết nối ngoại vi cơ bản thường gặp trên thân máy điện thoại thông minh?',
        questionEn: 'Identify the essential physical buttons and peripheral ports commonly found on a smartphone body?',
        suggestedAnswerVi: 'Nút bấm vật lí: Nút Nguồn/Khoá màn hình (Power/Lock), nút Tăng/Giảm âm lượng (Volume Up/Down), một số máy có phím gạt im lặng hoặc phím chức năng Action. Cổng kết nối & phụ kiện: Cổng sạc/truyền dữ liệu (USB Type-C hoặc Lightning), khay SIM/thẻ nhớ MicroSD, loa ngoài, mic thu âm, camera trước/sau.',
        suggestedAnswerEn: 'Physical buttons: Power/Lock button, Volume Up/Down rockers, optional mute/action sliders. Ports & peripherals: USB Type-C or Lightning charging/data port, SIM/MicroSD tray, external speaker grills, microphones, and camera arrays.',
        pedagogicalTipVi: 'Dùng bộ mô phỏng 3D/tương tác thiết bị số: Cho học sinh bấm trực tiếp vào nút Nguồn và nút Âm lượng để quan sát phản hồi trên màn hình ảo.',
        pedagogicalTipEn: 'Use the interactive device simulator: prompt students to click the physical Power and Volume buttons to observe virtual screen responses.'
      },
      {
        id: 'p7-2-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Nút Khoá màn hình (Lock/Power) trên điện thoại có các tác dụng gì trong các tình huống: nhấn 1 lần ngắn, nhấn giữ lâu, hoặc nhấn kèm nút giảm âm lượng?',
        questionEn: 'What functions does the Lock/Power button perform when pressed briefly, held down, or pressed simultaneously with the Volume Down button?',
        suggestedAnswerVi: 'Nhấn 1 lần ngắn: Tắt/bật sáng màn hình (khoá/mở khoá tạm thời tiết kiệm pin). Nhấn giữ lâu: Hiện menu nguồn để Tắt nguồn (Power off), Khởi động lại (Restart) hoặc gọi khẩn cấp (SOS). Nhấn đồng thời nút Nguồn + Giảm âm lượng: Chụp ảnh màn hình (Screenshot).',
        suggestedAnswerEn: 'Single short press: Turns screen display off/on (locks/wakes device). Long press: Invokes power menu (Power off, Restart, SOS emergency). Simultaneous Power + Volume Down press: Captures a screenshot.',
        pedagogicalTipVi: 'Hướng dẫn học sinh thực hành thao tác chụp ảnh màn hình ngay trên điện thoại hoặc trình mô phỏng nhiệm vụ 1.',
        pedagogicalTipEn: 'Guide students to practice screenshot shortcuts directly on physical smartphones or the interactive task simulator.'
      }
    ]
  },
  3: {
    sectionId: 'bai-7-home-screen-navigation',
    sectionTitleVi: 'Nhiệm vụ 2 & 3: Màn hình chính & Điều hướng cảm ứng (Trang 35 – 36 SGK)',
    sectionTitleEn: 'Tasks 2 & 3: Home Screen & Navigation Gestures (Pages 35 – 36)',
    prompts: [
      {
        id: 'p7-3-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Dựa vào Hình 7.5 SGK, màn hình làm việc chính của điện thoại thông minh gồm những thành phần thông tin cơ bản nào?',
        questionEn: 'Based on Figure 7.5, what key interface components constitute the smartphone home screen?',
        suggestedAnswerVi: '1) Thanh trạng thái (Status bar): hiển thị giờ, vạch sóng Wi-Fi/di động, tỉ lệ % pin; 2) Tiện ích (Widget) thời gian và thời tiết; 3) Các biểu tượng ứng dụng (App icons); 4) Thanh truy cập nhanh (Dock): cố định ở đáy màn hình; 5) Thanh điều hướng (Navigation bar): nút Quay lại, nút Home, nút Tổng quan.',
        suggestedAnswerEn: '1) Status Bar: displays current clock, Wi-Fi/cellular bars, battery percentage; 2) Time/weather widgets; 3) Application shortcut icons; 4) Quick Access Dock anchored at bottom; 5) Navigation Bar: Back, Home, and Overview/Recent apps buttons.',
        pedagogicalTipVi: 'Mời học sinh tương tác với sơ đồ giải phẫu màn hình Hình 7.5 trên web để nhận biết vị trí và công dụng từng vùng.',
        pedagogicalTipEn: 'Invite students to explore the interactive Figure 7.5 visual anatomy diagram to identify each on-screen region.'
      },
      {
        id: 'p7-3-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Phân biệt chức năng của 3 phím cảm ứng trên thanh điều hướng Android: nút Quay lại (Back), nút Home và nút Tổng quan (Overview)?',
        questionEn: 'Distinguish the functions of the 3 navigation keys on Android: Back, Home, and Overview (Recent Apps)?',
        suggestedAnswerVi: 'Nút Quay lại (tam giác/mũi tên): Trở về màn hình trước đó hoặc đóng bàn phím/hộp thoại. Nút Home (tròn): Thoát ứng dụng hiện tại và quay ngay về màn hình chính (ứng dụng vẫn chạy ngầm). Nút Tổng quan (hình vuông/ba gạch): Mở danh sách các ứng dụng đang chạy gần đây để chuyển đổi nhanh hoặc đóng giải phóng RAM.',
        suggestedAnswerEn: 'Back key: Navigates to previous screen or dismisses keyboard/dialog. Home key: Exits current app to home screen (app suspends in RAM). Overview/Recents key: Shows multitasking stack to switch between running apps or swipe to close them.',
        pedagogicalTipVi: 'Cho học sinh thử bấm lần lượt 3 nút này trên thanh điều hướng ảo của ứng dụng để thấy sự thay đổi giao diện.',
        pedagogicalTipEn: 'Let students press each of the 3 navigation keys in the virtual device to experience instantaneous UI state transitions.'
      }
    ]
  },
  4: {
    sectionId: 'bai-7-file-manager-cloud',
    sectionTitleVi: 'Nhiệm vụ 4: Quản lí tệp & Dịch vụ lưu trữ đám mây (Trang 36 – 37 SGK)',
    sectionTitleEn: 'Task 4: File Management & Cloud Storage Services (Pages 36 – 37)',
    prompts: [
      {
        id: 'p7-4-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Hệ thống tệp trên điện thoại thông minh được tổ chức như thế nào? Thư mục DCIM và Camera có ý nghĩa gì?',
        questionEn: 'How is the file system structured on a smartphone? What is the significance of the DCIM and Camera directories?',
        suggestedAnswerVi: 'Hệ thống tệp được tổ chức theo cấu trúc hình cây phân cấp tương tự máy tính, bắt đầu từ thư mục gốc (Root / Bộ nhớ trong). Thư mục DCIM (viết tắt của Digital Camera Images) là thư mục chuẩn quốc tế để lưu trữ toàn bộ ảnh chụp và video từ máy ảnh; thư mục con Camera bên trong chứa ảnh chụp trực tiếp từ ứng dụng máy ảnh của điện thoại.',
        suggestedAnswerEn: 'Smartphone files are structured in a hierarchical tree directory starting from root internal storage, identical to PCs. DCIM (Digital Camera Images) is the global standard directory holding camera imagery, where the Camera subfolder contains photos snapped directly by the camera app.',
        pedagogicalTipVi: 'Dẫn dắt học sinh khám phá cây thư mục ảo: Bộ nhớ trong → DCIM → Camera để kiểm tra đường dẫn lưu ảnh.',
        pedagogicalTipEn: 'Guide students through the virtual folder tree: Internal Storage → DCIM → Camera to inspect image paths.'
      },
      {
        id: 'p7-4-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Khi muốn sao chép, di chuyển hoặc xoá một tệp trên ứng dụng Quản lí tệp của điện thoại, người dùng cần thực hiện thao tác cử chỉ cảm ứng nào?',
        questionEn: 'To copy, move, or delete a file in a smartphone File Manager app, what touch gesture must the user perform?',
        suggestedAnswerVi: 'Chạm và giữ lâu (Long Press) vào tệp hoặc thư mục cần xử lý cho đến khi xuất hiện dấu chọn và thanh menu điều khiển phía dưới hoặc phía trên gồm các nút: Di chuyển (Move), Sao chép (Copy), Chia sẻ (Share), Xoá (Delete).',
        suggestedAnswerEn: 'Touch and hold (Long Press) the target file or folder until checkmarks appear alongside contextual action bars displaying Move, Copy, Share, and Delete buttons.',
        pedagogicalTipVi: 'Cho học sinh thực hành tương tác nhấn giữ lâu vào tệp ảnh trong trình quản lý tệp ảo ở Nhiệm vụ 4.',
        pedagogicalTipEn: 'Have students perform the long-press interaction on sample image files in the virtual Task 4 file explorer.'
      }
    ]
  },
  5: {
    sectionId: 'bai-7-luyen-tap-van-dung',
    sectionTitleVi: 'Luyện tập & Vận dụng thực tiễn (Trang 37 SGK)',
    sectionTitleEn: 'Practice & Practical Applications (Page 37)',
    prompts: [
      {
        id: 'p7-5-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Trong bài Luyện tập 1, điểm khác biệt căn bản nhất giữa điện thoại thông minh (smartphone) với điện thoại di động thông thường (feature phone) là gì?',
        questionEn: 'In Practice Task 1, what is the most fundamental distinction between a smartphone and a basic feature phone?',
        suggestedAnswerVi: 'Điện thoại thông minh có Hệ điều hành hoàn chỉnh (như Android, iOS) và có thể cài đặt thêm các ứng dụng đa dạng từ kho ứng dụng trên mạng; trong khi điện thoại thường chỉ chạy phần mềm cố định do nhà sản xuất nạp sẵn.',
        suggestedAnswerEn: 'A smartphone runs a fully capable mobile operating system (e.g., Android, iOS) enabling installation of custom apps from online stores; feature phones run fixed, non-extensible firmware.',
        pedagogicalTipVi: 'Nhấn mạnh đáp án đúng là phương án D trong bài tập Luyện tập 1 trang 37 SGK.',
        pedagogicalTipEn: 'Emphasize that Option D is the correct answer in Practice Exercise 1 on page 37.'
      },
      {
        id: 'p7-5-2',
        targetCognitiveLevel: 'Vận dụng cao',
        targetCognitiveLevelEn: 'Analyze',
        questionVi: 'Hãy nêu quy trình 3 bước để sao chép ảnh từ điện thoại thông minh sang máy tính bằng cáp USB (Bài Vận dụng 1)?',
        questionEn: 'Outline the 3-step workflow to copy photos from a smartphone to a computer using a USB cable (Application Task 1)?',
        suggestedAnswerVi: 'Bước 1: Cắm cáp USB nối điện thoại với máy tính, trên màn hình điện thoại chọn chế độ "Truyền tệp / MTP". Bước 2: Trên máy tính mở File Explorer, truy cập vào ổ thiết bị điện thoại → Bộ nhớ trong → Thư mục DCIM/Camera. Bước 3: Chọn các tệp ảnh cần lấy, nhấn Ctrl+C (Sao chép) và mở thư mục đích trên máy tính nhấn Ctrl+V (Dán).',
        suggestedAnswerEn: 'Step 1: Connect phone to PC via USB cable, tap prompt on phone to select "File Transfer / MTP". Step 2: Open PC File Explorer, navigate to Phone device → Internal storage → DCIM/Camera. Step 3: Select image files, press Ctrl+C (Copy), navigate to target PC folder, and press Ctrl+V (Paste).',
        pedagogicalTipVi: 'Nhắc học sinh lưu ý mở khoá màn hình điện thoại thì máy tính mới được cấp quyền truy cập hệ thống tệp.',
        pedagogicalTipEn: 'Remind students to unlock the smartphone screen so the computer is granted permission to access internal directories.'
      }
    ]
  }
};

// -------------------------------------------------------------
// BÀI 8: MẠNG MÁY TÍNH TRONG CUỘC SỐNG HIỆN ĐẠI (Trang 38 – 43 SGK)
// -------------------------------------------------------------
export const TEACHER_PROMPTS_LESSON_8: Record<number, SectionTeacherPrompts> = {
  0: {
    sectionId: 'bai-8-tong-quan',
    sectionTitleVi: 'Mục tiêu, Khởi động & Hoạt động 1 (Trang 38 SGK)',
    sectionTitleEn: 'Objectives, Warm-up & Activity 1 (Page 38)',
    prompts: [
      {
        id: 'p8-0-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Trong mô hình mạng máy tính (Hình 8.1 SGK), hãy kể tên các thiết bị đầu cuối và các thiết bị kết nối?',
        questionEn: 'In the computer network model (Figure 8.1), name the terminal end-devices and the networking hardware devices?',
        suggestedAnswerVi: 'Thiết bị đầu cuối: Máy chủ (Server), máy tính để bàn (PC), máy in. Thiết bị kết nối: Bộ chia (Hub), bộ chuyển mạch (Switch), bộ định tuyến (Router).',
        suggestedAnswerEn: 'Terminal devices: Servers, desktop PCs, and network printers. Networking devices: Hubs, Switches, and Routers.',
        pedagogicalTipVi: 'Cho học sinh tương tác với sơ đồ mạng Hình 8.1 trên màn hình để quan sát vị trí của từng loại thiết bị.',
        pedagogicalTipEn: 'Direct students to interact with Figure 8.1 on screen to observe device topologies and classifications.'
      },
      {
        id: 'p8-0-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Tại sao trên bộ định tuyến (Router) lại có sự phân biệt rõ ràng giữa các cổng LAN (màu vàng) và cổng INTERNET (WAN)?',
        questionEn: 'Why do routers distinctly differentiate between internal LAN ports and the external INTERNET (WAN) port?',
        suggestedAnswerVi: 'Cổng LAN dùng để kết nối với các thiết bị trong mạng cục bộ nội bộ (Switch, máy tính, máy in) với tốc độ cao và bảo mật nội bộ. Cổng INTERNET (WAN) là cổng duy nhất kết nối với modem nhà mạng ISP để định tuyến lưu lượng ra mạng toàn cầu.',
        suggestedAnswerEn: 'LAN ports connect internal devices within the local subnet at wire speed. The WAN/Internet port is the dedicated uplink connecting to the ISP modem for routing global traffic.',
        pedagogicalTipVi: 'Mời học sinh bấm vào hai chế độ Cổng LAN và Cổng INTERNET ở hộp mô phỏng trên màn hình để kiểm chứng.',
        pedagogicalTipEn: 'Invite students to toggle the LAN and WAN port inspection buttons in the simulator to see operational distinctions.'
      }
    ]
  },
  1: {
    sectionId: 'bai-8-lan-vs-internet',
    sectionTitleVi: '1. Mạng LAN và Internet (Trang 38 – 39 SGK)',
    sectionTitleEn: '1. Local Area Network (LAN) and the Internet (Pages 38 – 39)',
    prompts: [
      {
        id: 'p8-1-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Nêu nguyên lí hoạt động của Bộ chuyển mạch (Switch) và Bộ định tuyến (Router) khi xử lí một gói tin dữ liệu?',
        questionEn: 'Explain the operating principles of a Switch versus a Router when handling a data packet?',
        suggestedAnswerVi: 'Switch chỉ chuyển tiếp dữ liệu nội bộ trong cùng một mạng LAN theo địa chỉ MAC. Router làm nhiệm vụ kiểm tra địa chỉ IP đích: nếu địa chỉ thuộc mạng khác ngoài LAN thì Router sẽ định tuyến gói tin gửi ra cổng Internet (WAN).',
        suggestedAnswerEn: 'A Switch forwards frames strictly within the local LAN using MAC addresses. A Router inspects the destination IP: if it belongs to an external subnet, the Router routes it through the WAN gateway to the Internet.',
        pedagogicalTipVi: 'Cho học sinh bấm nút chạy mô phỏng gửi gói tin in nội bộ và gửi gói tin truy cập Google trên ứng dụng.',
        pedagogicalTipEn: 'Have students run both the local print simulation and global Google query simulation to visualize packet flow.'
      },
      {
        id: 'p8-1-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Dựa vào bảng so sánh ở trang 39 SGK, hãy phân biệt mạng LAN và Internet về 3 tiêu chí: Quy mô, Cách kết nối và Quyền sở hữu?',
        questionEn: 'Based on the comparison table on Page 39, contrast LAN and Internet across 3 criteria: Scope, Connectivity, and Ownership?',
        suggestedAnswerVi: '1) Quy mô: LAN phạm vi nhỏ (gia đình, trường học); Internet toàn cầu. 2) Cách kết nối: LAN nối trực tiếp qua Hub/Switch/Wi-Fi; Internet kết nối qua Router thông qua các nhà mạng ISP. 3) Quyền sở hữu: LAN có chủ sở hữu xác định; Internet không của riêng ai, không có cơ quan quản lí tập trung.',
        suggestedAnswerEn: '1) Scope: LAN is local; Internet is global. 2) Connectivity: LAN connects via switches/APs; Internet routes via ISPs and routers. 3) Ownership: LAN has designated owners; the Internet has no central owner.',
        pedagogicalTipVi: 'Nhấn mạnh vai trò của ISP (Viettel, VNPT, FPT) là cầu nối giúp mọi hộ gia đình và trường học truy cập Internet.',
        pedagogicalTipEn: 'Emphasize the role of ISPs (Viettel, VNPT, FPT) bridging private LANs to the global Internet.'
      }
    ]
  },
  2: {
    sectionId: 'bai-8-internet-impact',
    sectionTitleVi: '2. Vai trò của Internet trong đời sống hiện đại (Trang 39 – 40 SGK)',
    sectionTitleEn: '2. Transformative Role of the Internet (Pages 39 – 40)',
    prompts: [
      {
        id: 'p8-2-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Theo Hộp Ghi nhớ trang 40 SGK, Internet mang lại những giá trị cốt lõi nào cho đời sống xã hội?',
        questionEn: 'According to the summary box on Page 40, what foundational values does the Internet deliver to modern society?',
        suggestedAnswerVi: '1) Là kho tri thức khổng lồ thường xuyên cập nhật, truy cập bất cứ ở đâu, bất cứ lúc nào. 2) Giúp con người kết nối và giao tiếp dễ dàng, tiện lợi. 3) Ảnh hưởng sâu sắc tới mọi lĩnh vực, làm thay đổi cách làm việc, học tập và giao tiếp.',
        suggestedAnswerEn: '1) Boundless, continuously updated knowledge accessible anywhere, anytime. 2) Effortless and convenient global human connection. 3) Profound transformation of workplace, educational, and social paradigms.',
        pedagogicalTipVi: 'Cho học sinh liên hệ thực tế việc các em đang học trực tuyến và tra cứu bài giảng trên môi trường số.',
        pedagogicalTipEn: 'Ask students to reflect on how online classes and digital research shape their daily learning habits.'
      },
      {
        id: 'p8-2-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Internet đã thay đổi công tác chăm sóc sức khỏe và y tế cộng đồng (Telemedicine) như thế nào?',
        questionEn: 'How has the Internet revolutionized healthcare delivery and public telemedicine?',
        suggestedAnswerVi: 'Bác sĩ tuyến trên có thể hội chẩn từ xa cho bệnh nhân ở vùng sâu vùng xa; người dân đặt lịch khám và tra cứu bệnh án điện tử qua ứng dụng (VNeID); thiết bị đeo thông minh gửi cảnh báo nhịp tim bất thường tức thời.',
        suggestedAnswerEn: 'Enables remote specialist teleconsultations for rural clinics, mobile appointment and digital prescription management, and wearable devices streaming realtime cardiac alerts.',
        pedagogicalTipVi: 'Khơi gợi học sinh thảo luận về ứng dụng Sổ sức khỏe điện tử và quét mã BHYT qua thẻ CCCD gắn chip.',
        pedagogicalTipEn: 'Prompt discussion around digital health records and chip-based citizen health card verification.'
      }
    ]
  },
  3: {
    sectionId: 'bai-8-cloud-computing',
    sectionTitleVi: '3. Điện toán đám mây & 3 mô hình SaaS, PaaS, IaaS (Trang 40 – 41 SGK)',
    sectionTitleEn: '3. Cloud Computing & SaaS, PaaS, IaaS Models (Pages 40 – 41)',
    prompts: [
      {
        id: 'p8-3-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Nêu định nghĩa Điện toán đám mây và kể tên 3 mô hình dịch vụ đám mây chủ yếu theo SGK trang 41?',
        questionEn: 'Define Cloud Computing and state its three primary delivery models according to Page 41?',
        suggestedAnswerVi: 'Điện toán đám mây là việc phân phối các tài nguyên CNTT theo nhu cầu qua Internet với chính sách thanh toán theo mức sử dụng. 3 mô hình: SaaS (Phần mềm như một dịch vụ), PaaS (Nền tảng như một dịch vụ), IaaS (Hạ tầng như một dịch vụ).',
        suggestedAnswerEn: 'Cloud computing is the on-demand distribution of IT resources over the Internet with pay-as-you-go pricing. The 3 models are SaaS, PaaS, and IaaS.',
        pedagogicalTipVi: 'Cho học sinh bấm vào 3 tầng kim tự tháp SaaS, PaaS, IaaS trên ứng dụng để xem ví dụ minh họa từng loại.',
        pedagogicalTipEn: 'Have students click the three pyramid layers on screen to inspect concrete examples of SaaS, PaaS, and IaaS.'
      },
      {
        id: 'p8-3-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Tại sao sử dụng dịch vụ đám mây lại linh hoạt, tin cậy và tiết kiệm chi phí hơn so với tự mua sắm phần cứng, phần mềm?',
        questionEn: 'Why is cloud adoption more flexible, reliable, and cost-effective than procuring on-premise hardware and software?',
        suggestedAnswerVi: 'Linh hoạt: truy cập mọi nơi trên mọi thiết bị. Tin cậy: dữ liệu được lưu tại các trung tâm dữ liệu lớn có sao lưu dự phòng, không sợ hỏng ổ cứng cá nhân. Tiết kiệm: không phải đầu tư ban đầu lớn mua máy chủ, chỉ trả tiền theo đúng mức sử dụng thực tế.',
        suggestedAnswerEn: 'Flexible: accessible from any device anywhere. Reliable: enterprise datacenters maintain automated redundancy against hardware loss. Economical: eliminates upfront capital expenses, paying strictly for utilized capacity.',
        pedagogicalTipVi: 'Dẫn chứng câu hỏi củng cố: Phân tích vì sao Gmail là dịch vụ đám mây SaaS, còn báo điện tử thì không.',
        pedagogicalTipEn: 'Walk through the checkpoint questions: contrast why Gmail is a SaaS cloud service while online news portals are content providers.'
      }
    ]
  },
  4: {
    sectionId: 'bai-8-iot-integration',
    sectionTitleVi: '4. Kết nối vạn vật (Internet of Things - IoT) (Trang 42 – 43 SGK)',
    sectionTitleEn: '4. The Internet of Things (IoT) (Pages 42 – 43)',
    prompts: [
      {
        id: 'p8-4-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Theo Hộp Ghi nhớ trang 43 SGK, Internet vạn vật (IoT) là gì và đóng vai trò gì trong CMCN 4.0?',
        questionEn: 'According to the summary box on Page 43, what is IoT and what role does it play in Industry 4.0?',
        suggestedAnswerVi: 'IoT là hệ thống liên mạng gồm các phương tiện, vật dụng, thiết bị thông minh được cài đặt cảm biến, phần mềm chuyên dụng giúp chúng tự động kết nối, thu thập và trao đổi dữ liệu mà không cần con người can thiệp trực tiếp. IoT là một nội dung chủ chốt của cuộc CMCN lần thứ tư.',
        suggestedAnswerEn: 'IoT is an internetworked ecosystem of objects embedded with sensors and software that autonomously connect, capture, and exchange data without direct human mediation. It is a cornerstone of Industry 4.0.',
        pedagogicalTipVi: 'Cho học sinh thử nghiệm bảng điều khiển Nhà thông minh (Smart Home) để thấy các thiết bị tự động phối hợp hoạt động.',
        pedagogicalTipEn: 'Direct students to manipulate the Smart Home simulator to see automated cross-device coordination.'
      },
      {
        id: 'p8-4-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Hãy giải thích quy trình hoạt động của hệ thống thu phí tự động không dừng (ETC) qua sóng RFID ở Hình 8.4 SGK?',
        questionEn: 'Explain the operational workflow of the Electronic Toll Collection (ETC) system using RFID in Figure 8.4?',
        suggestedAnswerVi: 'Xe dán thẻ RFID trên kính lái. Khi xe chạy qua trạm thu phí ở tốc độ cao, đầu đọc RFID tại giá long môn phát sóng vô tuyến đọc mã thẻ, gửi dữ liệu lên máy chủ để trừ tiền tự động trong tài khoản giao thông và nâng barie mở đường trong 0.2 giây mà xe không cần dừng lại.',
        suggestedAnswerEn: 'An RFID tag affixed to the windshield is scanned by overhead toll gantries via radio waves. The toll management server automatically deducts the toll fee and opens the barrier in 0.2 seconds without halting the vehicle.',
        pedagogicalTipVi: 'Cho học sinh bấm nút "Lái xe qua trạm" trong bộ mô phỏng để quan sát chu trình quét thẻ và nâng barie.',
        pedagogicalTipEn: 'Prompt students to click the "Drive through toll" button to observe the automated RFID scanning and barrier opening.'
      }
    ]
  },
  5: {
    sectionId: 'bai-8-luyen-tap-van-dung',
    sectionTitleVi: 'Luyện tập & Vận dụng thực tiễn (Trang 43 SGK)',
    sectionTitleEn: 'Practice & Practical Applications (Page 43)',
    prompts: [
      {
        id: 'p8-5-1',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Trong bài Luyện tập 2, vì sao mạng xã hội Facebook hay YouTube cho người dùng miễn phí nhưng vẫn được coi là dịch vụ điện toán đám mây?',
        questionEn: 'In Practice Task 2, why are ad-supported platforms like Facebook and YouTube categorized as cloud computing services?',
        suggestedAnswerVi: 'Vì chúng cung cấp toàn bộ phần mềm ứng dụng và hạ tầng lưu trữ dữ liệu khổng lồ trên máy chủ đám mây (mô hình SaaS + IaaS). Người dùng không cần mua sắm máy chủ riêng. Mô hình doanh thu là Freemium và Ad-funded (thu tiền từ quảng cáo và dịch vụ doanh nghiệp để tài trợ cho người dùng cá nhân).',
        suggestedAnswerEn: 'Because they deliver full applications and massive storage hosted entirely on cloud clusters (SaaS + IaaS). Users require no local servers. Their business model pairs Freemium with Ad-funding from commercial sponsors.',
        pedagogicalTipVi: 'Giúp học sinh phân biệt giữa mô hình kỹ thuật (công nghệ đám mây) và mô hình kinh doanh (quảng cáo/thu phí).',
        pedagogicalTipEn: 'Help students distinguish between the technical delivery model (cloud hosting) and monetization models (freemium/advertising).'
      },
      {
        id: 'p8-5-2',
        targetCognitiveLevel: 'Vận dụng cao',
        targetCognitiveLevelEn: 'Analyze',
        questionVi: 'Trong bài Vận dụng 2, với dữ liệu GPS và tốc độ gửi về máy chủ mỗi 30 giây từ hộp đen xe khách, cơ quan quản lí có thể phát hiện những vi phạm giao thông nào?',
        questionEn: 'In Application Task 2, with GPS coordinates and speeds transmitted every 30 seconds from a vehicle black box, which traffic violations can authorities detect?',
        suggestedAnswerVi: '1) Chạy quá tốc độ tối đa cho phép trên từng đoạn đường. 2) Lái xe liên tục quá 4 giờ mà không nghỉ. 3) Lái xe quá 10 giờ trong một ngày. 4) Đi sai tuyến đường đăng ký, đi vào đường cấm. 5) Dừng đỗ đón trả khách sai quy định.',
        suggestedAnswerEn: '1) Exceeding road-specific speed limits. 2) Driving over 4 consecutive hours without rest. 3) Exceeding 10 total daily driving hours. 4) Off-route deviations or entering prohibited roads. 5) Illegal stopping or passenger boarding outside designated depots.',
        pedagogicalTipVi: 'Cho học sinh kéo thanh trượt tốc độ và thời gian lái xe trong bộ mô phỏng hộp đen để thấy hệ thống tự động phát hiện vi phạm theo thời gian thực.',
        pedagogicalTipEn: 'Have students adjust speed and driving duration sliders in the black box simulator to witness realtime algorithmic violation detection.'
      }
    ]
  }
};

// ============================================================================
// BÀI 9: AN TOÀN TRÊN KHÔNG GIAN MẠNG (CYBERSECURITY IN CYBERSPACE)
// SGK Tin học 10 Kết nối tri thức - Trang 44 – 49
// ============================================================================
export const TEACHER_PROMPTS_LESSON_9: Record<number, SectionTeacherPrompts> = {
  0: {
    sectionId: 'bai-9-gioi-thieu-muc-tieu',
    sectionTitleVi: 'Mục tiêu bài học & Hoạt động 1: Nguy cơ trên mạng (Trang 44 SGK)',
    sectionTitleEn: 'Lesson Objectives & Activity 1: Online Hazards (Page 44)',
    prompts: [
      {
        id: 'p9-0-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Tại sao không gian mạng vừa là môi trường giao tiếp nhanh chóng, thuận tiện nhưng đồng thời lại tiềm ẩn vô số cạm bẫy?',
        questionEn: 'Why is cyberspace both a fast, convenient communication environment and simultaneously filled with digital traps?',
        suggestedAnswerVi: 'Vì Internet là môi trường mở toàn cầu, bất kỳ ai cũng có thể tham gia chia sẻ thông tin mà không cần xác minh danh tính. Kẻ xấu lợi dụng sự cởi mở, ẩn danh và thiếu cảnh giác của người dùng để giăng bẫy lừa đảo và phát tán mã độc.',
        suggestedAnswerEn: 'Because the Internet is a globally open domain where anyone can share content anonymously without identity verification. Malicious actors exploit this openness and user carelessness to stage fraud and deploy malware.',
        pedagogicalTipVi: 'Yêu cầu học sinh mở mô hình 3D Pháo đài Không gian mạng và bấm vào từng nhóm nguy cơ trong Hoạt động 1 để quan sát trực quan.',
        pedagogicalTipEn: 'Ask students to open the 3D Cyber Defense model and inspect each hazard tab in Activity 1 for visual reinforcement.'
      },
      {
        id: 'p9-0-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Trong 3 hoạt động thường ngày của học sinh (kết bạn, xem tin tức, tải phần mềm), hoạt động nào tiềm ẩn rủi ro lây nhiễm phần mềm độc hại cao nhất? Vì sao?',
        questionEn: 'Among three everyday student activities (connecting with friends, browsing news, downloading software), which carries the highest malware risk? Why?',
        suggestedAnswerVi: 'Tải các phần mềm tiềm ẩn rủi ro cao nhất vì nhiều tệp tin tải về từ nguồn không chính thống (như game bẻ khóa, phần mềm crack) thường bị kẻ xấu cố tình chèn mã độc trojan, sâu máy tính hoặc keylogger trực tiếp vào mã nguồn tệp tin.',
        suggestedAnswerEn: 'Downloading software carries the highest risk because unverified executables (cracked warez, free games) are frequently repackaged with embedded trojans, worms, or keyloggers.',
        pedagogicalTipVi: 'Nhắc nhở học sinh luôn tải ứng dụng từ các kho ứng dụng chính thống như Google Play, App Store hoặc trang chủ của nhà sản xuất.',
        pedagogicalTipEn: 'Remind students to exclusively download applications from official platforms such as Google Play, App Store, or official vendor portals.'
      }
    ]
  },
  1: {
    sectionId: 'bai-9-nguy-co-tren-mang',
    sectionTitleVi: '1. Một số nguy cơ trên mạng (Trang 44 – 45 SGK)',
    sectionTitleEn: '1. Critical Risks in Cyberspace (Pages 44 – 45)',
    prompts: [
      {
        id: 'p9-1-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Tại sao việc truy cập Internet qua trạm Wi-Fi công cộng không có mật khẩu (tại quán cafe, bến xe) lại rất dễ bị lộ dữ liệu cá nhân?',
        questionEn: 'Why does accessing the Internet over unencrypted public Wi-Fi hotspots expose personal credentials to high breach risks?',
        suggestedAnswerVi: 'Theo hộp Biện pháp bảo vệ trang 44 SGK: Hầu hết các trạm Wi-Fi công cộng không mã hóa thông tin khi truyền. Bất kỳ kẻ xấu nào ở gần cùng kết nối vào mạng Wi-Fi đó đều có thể sử dụng các công cụ bắt gói tin (packet sniffing) để đọc trộm tài khoản và mật khẩu.',
        suggestedAnswerEn: 'According to the personal data box on Page 44: Most public Wi-Fi access points do not encrypt transmissions over the air. Anyone on the same subnet using packet sniffers can intercept plaintext credentials.',
        pedagogicalTipVi: 'Cho học sinh bấm nút gạt "Mã hóa HTTPS / VPN" trong bộ mô phỏng tương tác để thấy rõ sự khác biệt giữa gói tin bản rõ và gói tin mã hóa.',
        pedagogicalTipEn: 'Instruct students to toggle the "HTTPS / VPN Encryption" button in the interactive sandbox to observe plaintext versus ciphertext packets.'
      },
      {
        id: 'p9-1-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Khi phát hiện một bạn cùng lớp đang bị bắt nạt, xúc phạm hoặc bị đe dọa tung ảnh riêng tư trên mạng xã hội, em sẽ khuyên bạn thực hiện 5 bước nào theo SGK trang 45?',
        questionEn: 'When discovering a classmate subjected to cyberbullying or extortion on social networks, what 5-step response would you advise per Page 45?',
        suggestedAnswerVi: '1) Không kết bạn dễ dãi qua mạng. 2) Tuyệt đối không trả lời, không tranh cãi đôi co với kẻ bắt nạt. 3) Lưu giữ tất cả các bằng chứng số (chụp ảnh màn hình tin nhắn, bình luận). 4) Chia sẻ ngay với bố mẹ hoặc thầy cô. 5) Báo cho cơ quan công an khi sự việc nghiêm trọng.',
        suggestedAnswerEn: '1) Refrain from indiscriminate friendships. 2) Never reply or argue with bullies. 3) Archive digital evidence (screenshots, links, timestamps). 4) Confide immediately in parents or teachers. 5) Report to police authorities if severity escalates.',
        pedagogicalTipVi: 'Nhấn mạnh với học sinh rằng lưu giữ bằng chứng và tâm sự với người lớn tin cậy là chìa khóa để giải quyết triệt để bắt nạt mạng.',
        pedagogicalTipEn: 'Emphasize that collecting digital evidence and confiding in trusted adults is crucial to effectively combating cyber harassment.'
      }
    ]
  },
  2: {
    sectionId: 'bai-9-phan-mem-doc-hai-khai-niem',
    sectionTitleVi: '2a. Tìm hiểu về virus, trojan, worm và cơ chế hoạt động (Trang 45 – 46 SGK)',
    sectionTitleEn: '2a. Anatomy of Viruses, Trojans, and Worms (Pages 45 – 46)',
    prompts: [
      {
        id: 'p9-2-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Dựa vào mô hình 3D bóc tách mã độc, hãy so sánh sự khác nhau căn bản về tính hoàn chỉnh và cơ chế lây nhiễm giữa Virus và Worm?',
        questionEn: 'Based on the 3D malware model, contrast the fundamental differences in completeness and propagation between Viruses and Worms?',
        suggestedAnswerVi: 'Virus không phải là phần mềm hoàn chỉnh mà chỉ là các đoạn mã độc ký sinh, buộc phải gắn vào một phần mềm chủ (.EXE) mới lây lan được khi phần mềm đó chạy. Ngược lại, Worm là một phần mềm hoàn chỉnh độc lập, có thể tự nhân bản và tự bò qua các cổng mạng mà không cần tệp chủ.',
        suggestedAnswerEn: 'A virus is an incomplete parasitic code fragment that must inject into a host file to execute. Conversely, a worm is an autonomous standalone executable that self-replicates across open network ports without needing a host program.',
        pedagogicalTipVi: 'Hướng dẫn học sinh chuyển góc nhìn sang "Virus .EXE 3D" và "Worm Tunnel 3D" trong viewer để thấy cơ chế bám ký sinh và bò qua cổng mạng.',
        pedagogicalTipEn: 'Guide students to switch camera presets to "Virus .EXE 3D" and "Worm Tunnel 3D" to visually inspect parasitic attachment and network tunneling.'
      },
      {
        id: 'p9-2-2',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Kể tên 4 biến thể nội gián của phần mềm Trojan và phân tích sự nguy hiểm đặc thù của Keylogger?',
        questionEn: 'Name 4 espionage variants of Trojan software and analyze the specific menace of Keyloggers?',
        suggestedAnswerVi: '4 biến thể: Spyware (phần mềm gián điệp), Keylogger (trình ghi phím), Backdoor (cửa sau bí mật) và Rootkit (chiếm quyền tối cao). Keylogger cực kỳ nguy hiểm vì nó ghi lại chính xác từng phím người dùng gõ, từ đó đánh cắp được mọi tài khoản ngân hàng, mật khẩu mạng xã hội và nội dung trò chuyện riêng tư.',
        suggestedAnswerEn: '4 variants: Spyware, Keylogger, Backdoor, and Rootkit. Keyloggers are exceptionally perilous because they capture exact physical keystrokes, intercepting banking credentials and confidential chats as they are typed.',
        pedagogicalTipVi: 'Cho học sinh bấm nút "Mở nắp bụng Ngựa Trojan" trong mô hình 3D để thấy chip gián điệp ẩn giấu bên trong vỏ bọc con ngựa gỗ.',
        pedagogicalTipEn: 'Direct students to click the "Open Trojan Belly Hatch" button on the 3D horse model to reveal the covert espionage chip.'
      }
    ]
  },
  3: {
    sectionId: 'bai-9-tac-hai-ma-doc-dos',
    sectionTitleVi: '2b. Tác hại của phần mềm độc hại & Tấn công DoS (Trang 46 SGK)',
    sectionTitleEn: '2b. Malware Damages & Denial of Service (DoS) (Page 46)',
    prompts: [
      {
        id: 'p9-3-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Em hãy nêu tác hại nổi bật của 3 sâu máy tính nổi tiếng: Melissa (1999), Code Red (2001) và WannaCry (2017)?',
        questionEn: 'State the notable damages of three famous computer worms: Melissa (1999), Code Red (2001), and WannaCry (2017)?',
        suggestedAnswerVi: '1) Melissa (1999): lây qua email tự gửi tới 50 địa chỉ trong danh bạ, làm sập hệ thống thư điện tử toàn cầu, thiệt hại hơn 1 tỉ USD. 2) Code Red (2001): chiếm quyền các máy chủ Windows trong 10 ngày gây thiệt hại 2 tỉ USD. 3) WannaCry (2017): sâu tống tiền mã hóa toàn bộ dữ liệu ổ đĩa, làm tê liệt bệnh viện và dịch vụ y tế toàn cầu.',
        suggestedAnswerEn: '1) Melissa (1999): self-propagated via emails to top 50 contacts, causing over 1 billion USD in disruption. 2) Code Red (2001): seized Windows web servers causing 2 billion USD within 10 days. 3) WannaCry (2017): encrypted drive files demanding Bitcoin ransoms, crippling hospitals.',
        pedagogicalTipVi: 'Liên hệ thực tiễn cho học sinh thấy mã độc ngày nay không chỉ làm chậm máy mà có thể đe dọa an ninh quốc gia và tính mạng con người.',
        pedagogicalTipEn: 'Connect with real-world context showing students modern malware threatens national critical infrastructure and human lives.'
      },
      {
        id: 'p9-3-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Trong cuộc tấn công từ chối dịch vụ (DoS / DDoS), các máy tính của người dùng bình thường có thể bị biến thành "đội quân ngầm" (botnet zombie) như thế nào?',
        questionEn: 'In a Denial of Service (DoS / DDoS) attack, how can regular users’ computers be co-opted into a zombie botnet army?',
        suggestedAnswerVi: 'Khi máy tính cá nhân bị nhiễm virus hoặc sâu máy tính mà chủ nhân không hề hay biết, kẻ tấn công cài đặt cửa sau và biến máy tính đó thành một "zombie". Khi nhận lệnh đồng loạt từ máy chủ điều khiển, hàng trăm nghìn máy tính zombie này sẽ cùng gửi yêu cầu dồn dập vào máy chủ mục tiêu khiến máy chủ bị tê liệt.',
        suggestedAnswerEn: 'When personal computers contract malware silently, attackers install backdoors turning them into "zombies." Upon receiving synchronized broadcast signals, hundreds of thousands of zombie nodes blast target servers until crash.',
        pedagogicalTipVi: 'Cho học sinh trải nghiệm bộ mô phỏng DDoS tương tác trên màn hình: quan sát CPU máy chủ tăng vọt từ 18% lên 100% khi botnet kích hoạt.',
        pedagogicalTipEn: 'Prompt students to run the interactive DDoS simulator: witness the server CPU gauge spike from 18% to 100% under botnet flood.'
      }
    ]
  },
  4: {
    sectionId: 'bai-9-phong-chong-windows-defender',
    sectionTitleVi: '2c & Thực hành: Phòng chống mã độc & Windows Defender (Trang 47 – 49 SGK)',
    sectionTitleEn: '2c & Lab: Antivirus Protection & Windows Defender (Pages 47 – 49)',
    prompts: [
      {
        id: 'p9-4-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Theo Hộp Ghi nhớ trang 47 SGK, những biện pháp cốt lõi nào giúp người dùng phòng ngừa phần mềm độc hại hiệu quả?',
        questionEn: 'According to the summary box on Page 47, which core measures effectively safeguard users against malware?',
        suggestedAnswerVi: '1) Cẩn trọng khi sao chép tệp từ thiết bị nhớ ngoài (USB, thẻ nhớ) hoặc tải từ mạng; 2) Tuyệt đối không dùng phần mềm bẻ khóa (crack); 3) Không mở liên kết không rõ nguồn gốc trong email hoặc tin nhắn; 4) Không để lộ mật khẩu; 5) Luôn sử dụng phần mềm phòng chống mã độc (như Windows Defender).',
        suggestedAnswerEn: '1) Exercise caution when transferring files from removable drives or web downloads; 2) Avoid cracked software; 3) Never open unsolicited links in messages; 4) Keep credentials confidential; 5) Continuously operate trusted antivirus shields.',
        pedagogicalTipVi: 'Yêu cầu học sinh đối chiếu bảng so sánh Virus - Trojan - Worm trên màn hình để củng cố triệt để 3 tiêu chí: tính hoàn chỉnh, cơ chế lây và tác hại.',
        pedagogicalTipEn: 'Instruct students to cross-examine the Virus-Trojan-Worm matrix to solidify the 3 criteria: completeness, propagation, and damages.'
      },
      {
        id: 'p9-4-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Trong 4 kiểu quét của Windows Defender (Hình 9.3 SGK), em sẽ chọn kiểu quét nào khi vừa tải một thư mục tài liệu từ trên mạng về máy tính? Trình bày thao tác quét nhanh thư mục đó bằng chuột phải?',
        questionEn: 'Among Windows Defender’s 4 scan options (Figure 9.3), which would you choose for newly downloaded folders? Describe the right-click shortcut method.',
        suggestedAnswerVi: 'Em chọn Custom scan (Quét theo yêu cầu) để chỉ định đúng thư mục vừa tải về mà không mất thời gian quét toàn bộ ổ đĩa. Thao tác nhanh bằng chuột phải: Nhấp chuột phải vào thư mục cần quét ➔ chọn lệnh "Scan with Windows Defender..." từ menu ngữ cảnh (Hình 9.4 SGK).',
        suggestedAnswerEn: 'Choose Custom scan to target specifically the downloaded folder without scanning entire physical disks. Shortcut method: Right-click the folder and select "Scan with Windows Defender..." from the context menu (Figure 9.4).',
        pedagogicalTipVi: 'Cho học sinh thực hành tương tác trực tiếp trên bảng điều khiển Windows Defender mô phỏng và nhấp chuột phải vào thư mục mẫu Downloads.',
        pedagogicalTipEn: 'Have students directly interact with the simulated Windows Defender console and test the right-click shortcut on sample folders.'
      }
    ]
  },
  5: {
    sectionId: 'bai-9-luyen-tap-van-dung',
    sectionTitleVi: 'Luyện tập & Vận dụng thực tiễn (Trang 49 SGK)',
    sectionTitleEn: 'Practice & Practical Applications (Page 49)',
    prompts: [
      {
        id: 'p9-5-1',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Trong bài Luyện tập 2, hãy giải thích vì sao phần mềm bẻ khóa (crack) được chia sẻ miễn phí trên mạng lại tiềm ẩn nguy cơ nhiễm mã độc cao nhất?',
        questionEn: 'In Practice Task 2, explain why cracked software shared freely online poses the highest malware infection risk?',
        suggestedAnswerVi: 'Vì các hacker bẻ khóa phần mềm thương mại thường có chủ đích chèn sẵn các mã độc gián điệp (Trojan, Keylogger, Ransomware) vào các tệp patch hoặc file kích hoạt .exe. Khi người dùng tải về và tắt phần mềm diệt virus để cài đặt, mã độc sẽ ngay lập tức xâm nhập kiểm soát toàn bộ máy tính.',
        suggestedAnswerEn: 'Because crackers intentionally inject espionage payloads (Trojans, keyloggers, ransomware) into patch files and crack executables. When users disable antivirus to install them, malware immediately seizes total system control.',
        pedagogicalTipVi: 'Khuyên học sinh luôn sử dụng phần mềm có bản quyền hoặc các giải pháp mã nguồn mở miễn phí hợp pháp (như LibreOffice thay thế Office crack).',
        pedagogicalTipEn: 'Advise students to adopt licensed software or legitimate free open-source alternatives (such as LibreOffice instead of cracked Office suites).'
      },
      {
        id: 'p9-5-2',
        targetCognitiveLevel: 'Vận dụng cao',
        targetCognitiveLevelEn: 'Analyze',
        questionVi: 'Trong bài Vận dụng 2, sâu máy tính Stuxnet năm 2010 khác biệt gì so với các sâu máy tính thông thường, và sự kiện này mở ra kỷ nguyên chiến tranh mạng như thế nào?',
        questionEn: 'In Application Task 2, how did the 2010 Stuxnet worm differ from conventional worms, and how did it inaugurate the era of cyber warfare?',
        suggestedAnswerVi: 'Stuxnet là sâu máy tính đầu tiên trên thế giới được thiết kế chuyên biệt để tấn công và phá hủy phần cứng công nghiệp vật lý (hệ thống SCADA điều khiển máy ly tâm hạt nhân tại Iran) thay vì chỉ phá hoại phần mềm. Sự kiện này chứng minh mã độc có thể gây ra sức tàn phá tương đương bom đạn quân sự thực tế.',
        suggestedAnswerEn: 'Stuxnet was the world’s first worm engineered specifically to sabotage physical industrial machinery (SCADA PLCs governing uranium centrifuges in Iran) rather than just software data, proving cyber weapons match physical explosives.',
        pedagogicalTipVi: 'Mở thẻ hồ sơ sâu Stuxnet trong phần Vận dụng để học sinh nắm được bức tranh toàn cảnh về an ninh mạng hiện đại và động viên các em làm bài thi 10 câu nhận chứng chỉ KNTT10-B9.',
        pedagogicalTipEn: 'Open the Stuxnet dossier in Application Task 2 to show students modern cybersecurity breadth, encouraging them to achieve certificate KNTT10-B9.'
      }
    ]
  }
};

// -------------------------------------------------------------
// BÀI 10: THỰC HÀNH KHAI THÁC TÀI NGUYÊN TRÊN INTERNET (Trang 50 – 54 SGK)
// -------------------------------------------------------------
export const TEACHER_PROMPTS_LESSON_10: Record<number, SectionTeacherPrompts> = {
  0: {
    sectionId: 'bai-10-muc-tieu-khoi-dong',
    sectionTitleVi: 'Mục tiêu & Khởi động bài học (Trang 50 SGK)',
    sectionTitleEn: 'Lesson 10 Objectives & Warm-up (Page 50)',
    prompts: [
      {
        id: 'p10-0-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Phân tích vai trò kết hợp giữa phần mềm dịch thuật đa ngữ và kho học liệu mở trong việc tự học của học sinh THPT hiện nay?',
        questionEn: 'Analyze the complementary roles of multilingual machine translation and open educational resources in high school self-directed learning?',
        suggestedAnswerVi: 'Kho học liệu mở (OER) cung cấp nguồn tài nguyên học tập phong phú, chuẩn mực từ các trường học và tổ chức giáo dục hàng đầu. Phần mềm dịch đa ngữ (như Google Translate) đóng vai trò là chiếc chìa khóa phá bỏ rào cản ngôn ngữ, giúp học sinh dễ dàng tiếp cận giáo trình quốc tế bằng tiếng Anh, Nga, Pháp, Trung,...',
        suggestedAnswerEn: 'OER delivers standardized, high-quality educational assets from premier academic bodies. Multilingual translation acts as the key that dismantles language barriers, unlocking international curricula across English, Russian, French, and Chinese.',
        pedagogicalTipVi: 'Khuyến khích học sinh xoay mô hình 3D quả cầu tri thức trên màn hình để hình dung mạng lưới liên kết dữ liệu toàn cầu.',
        pedagogicalTipEn: 'Guide students to manipulate the 3D knowledge globe to visually connect global nodes and translation satellites.'
      },
      {
        id: 'p10-0-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Trong phần Khởi động trang 50 SGK, em hãy kể tên 3 phần mềm hoặc nền tảng trực tuyến hỗ trợ rèn luyện đồng thời 4 kỹ năng Nghe - Nói - Đọc - Viết khi học ngoại ngữ?',
        questionEn: 'In the Warm-up prompt on page 50, name 3 online platforms or apps that support practicing all four language skills (Listening, Speaking, Reading, Writing)?',
        suggestedAnswerVi: 'Google Translate (hỗ trợ nhập văn bản, đọc to bằng giọng đọc chuẩn, nhận diện micro nói, và dịch tài liệu); Duolingo (luyện tập tương tác 4 kỹ năng); và Khan Academy / BBC Learning English (bài giảng đa phương tiện có phụ đề kèm bài tập).',
        suggestedAnswerEn: 'Google Translate (text translation, text-to-speech, microphone recognition, file parsing); Duolingo (interactive 4-skill gamification); and Khan Academy / BBC Learning English (multimedia lectures with subtitles).',
        pedagogicalTipVi: 'Yêu cầu học sinh mở rộng liên hệ với trải nghiệm học tập thực tế trên điện thoại hoặc máy tính của bản thân.',
        pedagogicalTipEn: 'Ask students to connect the discussion to their actual smartphone and computer language-learning habits.'
      }
    ]
  },
  1: {
    sectionId: 'bai-10-giao-dien-dich-may',
    sectionTitleVi: 'Nhiệm vụ 1: Giao diện dịch đa ngữ Google Translate (Trang 50 – 51 SGK)',
    sectionTitleEn: 'Task 1: Multilingual Translation Interface Anatomy (Pages 50 – 51)',
    prompts: [
      {
        id: 'p10-1-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Dựa vào Hình 10.1 SGK, hãy chỉ rõ vị trí và chức năng của khung ngôn ngữ nguồn và khung ngôn ngữ đích?',
        questionEn: 'Based on Figure 10.1, identify the position and primary role of the source language box and target language box?',
        suggestedAnswerVi: 'Khung bên trái là khung ngôn ngữ nguồn: nơi người dùng nhập văn bản, nói vào micro hoặc tải tệp cần dịch. Khung bên phải là khung ngôn ngữ đích: nơi phần mềm hiển thị kết quả dịch tự động tương ứng.',
        suggestedAnswerEn: 'Left box: Source language pane where input is entered, spoken, or uploaded. Right box: Target language pane where automated translation output is rendered.',
        pedagogicalTipVi: 'Cho học sinh nhấp vào các điểm chú thích trên giao diện mô phỏng Hình 10.1 để ghi nhớ trực quan từng thành phần.',
        pedagogicalTipEn: 'Have students click interactive hot-spots on simulated Figure 10.1 to visually reinforce each interface element.'
      },
      {
        id: 'p10-1-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Nút hoán đổi hai chiều (⇄) ở giữa hai thanh chọn ngôn ngữ có công dụng gì trong quá trình đối chiếu bản dịch hai chiều?',
        questionEn: 'What is the function of the bidirectional swap button (⇄) when performing round-trip translation verification?',
        suggestedAnswerVi: 'Nút ⇄ có chức năng đảo ngược vị trí giữa ngôn ngữ nguồn và ngôn ngữ đích ngay lập tức, chuyển toàn bộ văn bản kết quả thành đầu vào mới, giúp người học kiểm tra xem câu dịch có bị sai lệch nghĩa gốc khi dịch ngược lại hay không.',
        suggestedAnswerEn: 'The swap button (⇄) instantly reverses source and target language roles, enabling learners to inspect whether semantic distortion occurs during round-trip translation.',
        pedagogicalTipVi: 'Cho học sinh thử bấm nút ⇄ trên trình giả lập để quan sát phản hồi đảo chiều tức thì.',
        pedagogicalTipEn: 'Prompt students to click the ⇄ button in the simulator to observe instantaneous state reversal.'
      }
    ]
  },
  2: {
    sectionId: 'bai-10-phuong-thuc-nhap-lieu',
    sectionTitleVi: 'Nhiệm vụ 1: Các phương thức nhập liệu & Dịch tệp (Trang 51 – 52 SGK)',
    sectionTitleEn: 'Task 1: Input Methods & Document File Translation (Pages 51 – 52)',
    prompts: [
      {
        id: 'p10-2-1',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Trong Hình 10.4 SGK, câu nói trích trong tiểu thuyết "Thép đã tôi thế đấy" của Ostrovski được dịch bằng giọng nói. Hãy trình bày cách điều chỉnh để máy tính đọc lại bản dịch tiếng Nga với tốc độ chậm hơn?',
        questionEn: 'In Figure 10.4, Ostrovski’s literary quote is translated via speech. How do you adjust settings so the engine reads the Russian output at a slower tempo?',
        suggestedAnswerVi: 'Theo hướng dẫn trang 52 SGK: Khi nháy vào biểu tượng chiếc loa (🔊) lần thứ nhất, máy sẽ đọc ở tốc độ bình thường; nháy chuột tiếp lần thứ hai, máy sẽ tự động đọc ở tốc độ chậm hơn (khoảng 0.65x) để người học nghe rõ từng âm tiết.',
        suggestedAnswerEn: 'Per page 52 guidelines: Clicking the speaker icon (🔊) the first time reads at normal speed; clicking it a second time prompts the engine to speak slower (~0.65x) for phonetic clarity.',
        pedagogicalTipVi: 'Cho học sinh nhấn vào nút biểu tượng loa trong bài để trải nghiệm trực tiếp sự khác biệt giữa tốc độ 1.0x và 0.65x.',
        pedagogicalTipEn: 'Invite students to toggle the speaker widget to aurally experience the speed shift between 1.0x and 0.65x.'
      },
      {
        id: 'p10-2-2',
        targetCognitiveLevel: 'Vận dụng cao',
        targetCognitiveLevelEn: 'Analyze',
        questionVi: 'Khi dịch một tệp bảng tính Excel (Hình 10.5 & 10.6 SGK), công cụ dịch tự động mang lại ưu thế gì so với copy-paste từng ô, và người dùng cần chú ý điều gì trước khi đưa vào báo cáo chính thức?',
        questionEn: 'When translating an Excel file (Figures 10.5 & 10.6), what advantages does full-file parsing provide over manual copy-pasting, and what precautions must be taken?',
        suggestedAnswerVi: 'Ưu thế: Giữ nguyên bố cục bảng tính, màu sắc ô và cấu trúc hàng cột của bảng dữ liệu. Lưu ý: Bản dịch máy đối với các thuật ngữ kỹ thuật viết tắt (như PART, RESERVE, QTY) có thể bị dịch thô hoặc sai nghĩa chuyên ngành, nên người dùng bắt buộc phải rà soát và hiệu đính thủ công (Hình 10.6 SGK).',
        suggestedAnswerEn: 'Advantages: Preserves layout styling, table borders, and tabular grid alignment. Precaution: Technical abbreviations (e.g., PART, RESERVE) may be translated literally, necessitating expert human proofreading.',
        pedagogicalTipVi: 'Chỉ ra ô "Không PHỤ TÙNG" trong Hình 10.6 SGK trên màn hình để minh họa trực quan sự thiếu tự nhiên của máy dịch khi dịch từ viết tắt.',
        pedagogicalTipEn: 'Highlight the translated header "Không PHỤ TÙNG" in Figure 10.6 to visually prove why algorithmic translation requires human curation.'
      }
    ]
  },
  3: {
    sectionId: 'bai-10-kho-hoc-lieu-mo-igiaoduc',
    sectionTitleVi: 'Nhiệm vụ 2: Khai thác kho học liệu số iGiaoDuc.vn (Trang 52 – 53 SGK)',
    sectionTitleEn: 'Task 2: Exploiting National OER at iGiaoDuc.vn (Pages 52 – 53)',
    prompts: [
      {
        id: 'p10-3-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Trình bày cấu trúc cây thư mục 3 cấp của kho học liệu trực tuyến igiaoduc.vn (Hình 10.7 SGK) và giải thích vì sao cách tổ chức này giúp học sinh tra cứu bài giảng thuận tiện?',
        questionEn: 'Describe the 3-tier hierarchical directory of igiaoduc.vn (Figure 10.7) and explain why this architecture streamlines student navigation?',
        suggestedAnswerVi: 'Cấp 1: Phân loại danh mục học liệu (Bài giảng điện tử, Sách giáo khoa, Dư địa chí, Ngân hàng câu hỏi); Cấp 2: Phân loại theo khối lớp từ Mầm non đến Lớp 12; Cấp 3: Phân loại theo từng môn học (Đại số, Hình học, Tin học, Ngữ văn,...). Cấu trúc cây giúp thu hẹp phạm vi tìm kiếm nhanh chóng chỉ qua 3 lần nhấp chuột.',
        suggestedAnswerEn: 'Tier 1: High-level repository type (e-Lectures, Textbooks, Topography, Question Banks); Tier 2: Academic grades (K-12); Tier 3: Specific subjects (Informatics, Math, etc.). This tree narrows down target content in just 3 clicks.',
        pedagogicalTipVi: 'Yêu cầu học sinh thực hành chọn Cấp 1 ➔ Lớp 10 ➔ Môn Tin học trên giao diện tương tác mô phỏng của hệ thống.',
        pedagogicalTipEn: 'Ask students to interactively browse Tier 1 ➔ Grade 10 ➔ Informatics on the simulated portal.'
      },
      {
        id: 'p10-3-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Khi bấm vào nút "Học trực tuyến" trên một bài giảng của igiaoduc.vn (Hình 10.9 SGK), học sinh có thể tương tác với những nội dung đa phương tiện nào?',
        questionEn: 'When clicking "Online Study" on an igiaoduc.vn lecture (Figure 10.9), what multimedia assets can students interact with?',
        suggestedAnswerVi: 'Học sinh có thể xem video bài giảng truyền hình chất lượng cao (do VTV7 hoặc giáo viên cốt cán ghi hình), theo dõi slide giáo án trình chiếu đồng bộ, xem phụ đề và làm bài tập trắc nghiệm củng cố ngay dưới video.',
        suggestedAnswerEn: 'Students can watch televised broadcast lectures (produced with VTV7 or master teachers), view synchronized presentation slides, read captions, and solve embedded self-check quizzes.',
        pedagogicalTipVi: 'Mở cửa sổ video mô phỏng trong bài để học sinh xem giao diện bài giảng truyền hình số hóa chuẩn.',
        pedagogicalTipEn: 'Trigger the interactive televised video modal to demonstrate the standardized e-lecture player.'
      }
    ]
  },
  4: {
    sectionId: 'bai-10-hoc-lieu-mo-toan-cau',
    sectionTitleVi: 'Kho học liệu mở toàn cầu & Bản quyền số Creative Commons (Trang 53 – 54 SGK)',
    sectionTitleEn: 'Global OER Commons & Creative Commons Licensing (Pages 53 – 54)',
    prompts: [
      {
        id: 'p10-4-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Sáng kiến OpenCourseWare của Viện Công nghệ Massachusetts (MIT) vào năm 2002 có ý nghĩa lịch sử như thế nào đối với phong trào học liệu mở (OER) toàn cầu?',
        questionEn: 'What historic significance did the 2002 MIT OpenCourseWare initiative hold for the global Open Educational Resources movement?',
        suggestedAnswerVi: 'MIT là trường đại học danh tiếng đầu tiên trên thế giới quyết định công khai miễn phí 100% giáo trình, bài giảng, đề thi và bài giải của hàng nghìn môn học lên Internet. Hành động này đã khởi xướng làn sóng OER toàn cầu, biến tri thức hàn lâm từ tài sản độc quyền thành tài sản chung của nhân loại.',
        suggestedAnswerEn: 'MIT became the world’s first premier university to publish 100% of its course syllabi, lecture notes, and exams openly on the web, catalyzing the global OER wave and turning proprietary academia into a public commons.',
        pedagogicalTipVi: 'Kết nối mốc lịch sử MIT 2002 với ngọn tháp ánh sáng 2002 trong mô hình 3D quả cầu tri thức.',
        pedagogicalTipEn: 'Connect the MIT 2002 milestone to the light beacon tower rendered in the 3D knowledge sphere.'
      },
      {
        id: 'p10-4-2',
        targetCognitiveLevel: 'Vận dụng cao',
        targetCognitiveLevelEn: 'Analyze',
        questionVi: 'Phân tích sự khác biệt giữa hai loại giấy phép Creative Commons: CC BY (Ghi nhận tác giả) và CC BY-NC-SA (Phi thương mại - Chia sẻ tương tự)? Học sinh cần tuân thủ những quy tắc nào khi sử dụng tài liệu mang hai giấy phép này?',
        questionEn: 'Analyze the distinction between Creative Commons CC BY and CC BY-NC-SA licenses. What obligations must students respect under each?',
        suggestedAnswerVi: 'CC BY là giấy phép tự do nhất: Người dùng được tự do tái sử dụng, chỉnh sửa, dịch thuật, thậm chí dùng vào mục đích thương mại, chỉ cần ghi rõ tên tác giả ban đầu. CC BY-NC-SA nghiêm ngặt hơn: Bắt buộc ghi nhận tác giả, TUYỆT ĐỐI không được dùng để kinh doanh thu tiền (NC) và mọi tác phẩm chỉnh sửa phái sinh bắt buộc phải phát hành lại dưới đúng giấy phép mở tương tự (SA).',
        suggestedAnswerEn: 'CC BY is the most permissive: allows reuse, remixing, and commercialization provided attribution is preserved. CC BY-NC-SA requires attribution, strictly prohibits commercial monetization (NC), and mandates that derivative adaptations be released under the identical open license (SA).',
        pedagogicalTipVi: 'Cho học sinh nhấp vào ma trận giải mã bản quyền Creative Commons trên màn hình để tự kiểm tra các điều kiện cấp phép.',
        pedagogicalTipEn: 'Direct students to click items in the Creative Commons matrix simulator to inspect legal terms.'
      }
    ]
  },
  5: {
    sectionId: 'bai-10-luyen-tap-van-dung',
    sectionTitleVi: 'Luyện tập & Vận dụng thực tế (Trang 54 SGK)',
    sectionTitleEn: 'Practice & Practical Applications (Page 54)',
    prompts: [
      {
        id: 'p10-5-1',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Trong bài Luyện tập 1 trang 54 SGK, tại sao khi dịch một đoạn văn bản tin học hai chiều Việt - Anh, chúng ta phải kiểm tra kỹ các cặp từ đồng âm hoặc thuật ngữ có nhiều nghĩa?',
        questionEn: 'In Practice Task 1 (page 54), why must we rigorously verify polysemous words and technical jargon during round-trip translation?',
        suggestedAnswerVi: 'Vì máy dịch thuật toán có thể hiểu nhầm ngữ cảnh chuyên môn. Ví dụ từ "bộ nhớ" trong đời sống có thể là "memory/recollection", nhưng trong tin học bắt buộc phải là "computer memory/RAM". Việc đối chiếu hai chiều giúp phát hiện sớm các lỗi sai lệch ngữ cảnh này.',
        suggestedAnswerEn: 'Because translation algorithms can misjudge context. For example, "memory" can denote human recollection, whereas in computer science it strictly designates RAM/storage. Two-way checks catch semantic divergence.',
        pedagogicalTipVi: 'Mời một học sinh đọc to câu dịch mẫu trong phần Luyện tập 1 và thảo luận nhóm về chất lượng bản dịch.',
        pedagogicalTipEn: 'Invite a student to read the sample translated paragraph aloud in Practice 1 and evaluate its quality.'
      },
      {
        id: 'p10-5-2',
        targetCognitiveLevel: 'Vận dụng cao',
        targetCognitiveLevelEn: 'Analyze',
        questionVi: 'Trong bài Vận dụng 2 trang 54 SGK, hãy chứng minh việc chủ động khai thác các nền tảng học liệu mở (như Khan Academy, ViOLET, MIT OCW, Coursera) sẽ giúp phát triển "Năng lực tự học suốt đời" của công dân số như thế nào?',
        questionEn: 'In Application Task 2 (page 54), substantiate how actively mining open platforms (Khan Academy, ViOLET, MIT OCW, Coursera) fosters lifelong learning for digital citizens?',
        suggestedAnswerVi: 'Trong kỷ nguyên số, kiến thức công nghệ thay đổi từng ngày. Việc thành thạo kỹ năng tìm kiếm, chọn lọc học liệu mở giúp học sinh không bị giới hạn trong sách vở nhà trường, có khả năng tự bổ túc kỹ năng mới, tiếp cận tri thức toàn cầu mà không phụ thuộc vào điều kiện tài chính cá nhân, hiện thực hóa mục tiêu học tập suốt đời.',
        suggestedAnswerEn: 'In the digital era, tech knowledge evolves exponentially. Mastering OER curation empowers learners to break beyond standard textbooks, continuously self-upskill, and absorb global intellect free of financial barriers.',
        pedagogicalTipVi: 'Động viên học sinh hoàn thành bài kiểm tra 10 câu hỏi để nhận Giấy chứng nhận năng lực điện tử KNTT10-B10.',
        pedagogicalTipEn: 'Encourage students to complete the 10-question assessment to unlock electronic certificate KNTT10-B10.'
      }
    ]
  }
};

// -------------------------------------------------------------
// BÀI 11: ỨNG XỬ TRÊN MÔI TRƯỜNG SỐ. NGHĨA VỤ TÔN TRỌNG BẢN QUYỀN (Trang 55 – 62 SGK)
// -------------------------------------------------------------
export const TEACHER_PROMPTS_LESSON_11: Record<number, SectionTeacherPrompts> = {
  0: {
    sectionId: 'bai-11-muc-tieu-khoi-dong',
    sectionTitleVi: 'Mục tiêu & Khởi động: Đạo đức vs Pháp luật (Trang 55 SGK)',
    sectionTitleEn: 'Objectives & Warm-up: Ethics vs Law (Page 55)',
    prompts: [
      {
        id: 'p11-0-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Khi dẫn dắt phần Khởi động và Hoạt động 1 trang 55, giáo viên cần làm rõ ranh giới khác biệt cốt lõi giữa "Vi phạm đạo đức" và "Vi phạm pháp luật" như thế nào?',
        questionEn: 'In Warm-up and Activity 1 (page 55), how should teachers articulate the core distinction between moral breaches and statutory legal violations?',
        suggestedAnswerVi: 'Đạo đức là chuẩn mực xã hội mà con người tự giác tuân thủ, điều chỉnh bởi lương tâm, dư luận xã hội và giáo dục. Pháp luật là quy tắc xử sự chung do Nhà nước ban hành, có tính bắt buộc và bảo đảm thực hiện bằng quyền lực cưỡng chế của Nhà nước.',
        suggestedAnswerEn: 'Ethics comprise societal norms observed through voluntary self-discipline, conscience, and social censure. Law is state-enacted mandatory regulation backed by sovereign coercive enforcement.',
        pedagogicalTipVi: 'Yêu cầu học sinh quan sát mô hình 3D Cán cân Pháp lý & Khiên Bản quyền số để thấy sự cân bằng giữa chuẩn mực đạo đức và chế tài luật pháp.',
        pedagogicalTipEn: 'Direct students to interact with the 3D Balance of Justice model to visualize the equilibrium between ethics and statutory law.'
      },
      {
        id: 'p11-0-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Trong tình huống Hoạt động 1 (nữ sinh xích mích, quay video phát tán lên mạng), yếu tố đặc thù nào của không gian mạng đã biến một mâu thuẫn học đường cục bộ thành thảm kịch sỉ nhục quy mô lớn?',
        questionEn: 'In Activity 1 (school altercation recorded and posted online), which specific cyber traits exacerbated a local dispute into a public humiliation ordeal?',
        suggestedAnswerVi: 'Tính ẩn danh khiến cư dân mạng bình luận ác ý thiếu kiểm soát; tốc độ phát tán tức thời không biên giới; và tính lưu trữ lâu dài của dữ liệu số khiến nạn nhân bị sỉ nhục kéo dài không lối thoát.',
        suggestedAnswerEn: 'Anonymity emboldening reckless toxic cruelty, instantaneous viral diffusion without boundaries, and persistent digital footprint trapping the victim in chronic humiliation.',
        pedagogicalTipVi: 'Gợi mở cho học sinh thảo luận về hậu quả tâm lý của nạn nhân bạo lực ngôn từ trên mạng.',
        pedagogicalTipEn: 'Lead a classroom empathy reflection on the emotional trauma inflicted by cyberbullying mobs.'
      }
    ]
  },
  1: {
    sectionId: 'bai-11-nhung-van-de-dao-duc-van-hoa',
    sectionTitleVi: '1. Những vấn đề đạo đức, pháp luật và văn hoá (Trang 56 SGK)',
    sectionTitleEn: '1. Cyber Ethics, Legal & Cultural Dilemmas (Page 56)',
    prompts: [
      {
        id: 'p11-1-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Hãy nêu 7 hành vi vi phạm đạo đức, pháp luật và văn hoá khi giao tiếp qua không gian mạng được nêu trong SGK trang 56?',
        questionEn: 'List the 7 categories of ethical, legal, and cultural misconduct in cyberspace defined on page 56 of the textbook?',
        suggestedAnswerVi: '1. Đưa tin không phù hợp lên mạng; 2. Công bố thông tin cá nhân/tổ chức không được phép; 3. Phát tán thư điện tử/tin nhắn rác; 4. Vi phạm bản quyền; 5. Bắt nạt qua mạng; 6. Lừa đảo qua mạng; 7. Ứng xử thiếu văn hoá (chửi tục, công kích).',
        suggestedAnswerEn: '1. Inappropriate/false postings; 2. Unauthorized private data disclosure; 3. Spam email/messaging; 4. Copyright infringement; 5. Cyberbullying; 6. Online scams; 7. Uncivilized behavior (swearing, toxic attacks).',
        pedagogicalTipVi: 'Cho học sinh nhấp vào từng thẻ hành vi trong giao diện để xem mức độ nghiêm trọng và ví dụ thực tế tương ứng.',
        pedagogicalTipEn: 'Prompt students to click each misconduct card to examine severity classifications and real-world case examples.'
      },
      {
        id: 'p11-1-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Tại sao việc gửi thư rác hoặc tin nhắn quảng cáo hàng loạt lại biến từ một hành vi tiếp thị bình thường thành hành vi quấy nhiễu vi phạm chuẩn mực ứng xử số?',
        questionEn: 'Why does mass spam messaging cross the line from standard commercial marketing into harassing misconduct?',
        suggestedAnswerVi: 'Về bản chất quảng cáo không sai phạm, nhưng việc gửi đến người nhận không có nhu cầu hoặc đã từ chối tiếp nhận với tần suất dày đặc sẽ xâm phạm thời gian riêng tư, gây phiền toái, quá tải hòm thư và lãng phí băng thông xã hội.',
        suggestedAnswerEn: 'While advertising is lawful, forcing unwanted mass messages upon users who opted out breaches digital courtesy, wastes bandwidth, and disrupts personal communication channels.',
        pedagogicalTipVi: 'Liên hệ với quy định về chống thư rác trong Nghị định 90/2008 và Nghị định 15/2020 của Chính phủ.',
        pedagogicalTipEn: 'Connect to anti-spam decrees 90/2008 and 15/2020 enforced by the Ministry of Information and Communications.'
      }
    ]
  },
  2: {
    sectionId: 'bai-11-quy-dinh-phap-li',
    sectionTitleVi: '2. Một số quy định pháp lí đối với người dùng trên mạng (Trang 57 – 58 SGK)',
    sectionTitleEn: '2. Statutory Legal Framework for Netizens (Pages 57–58)',
    prompts: [
      {
        id: 'p11-2-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Theo Điều 101 Khoản 1 Nghị định 15/2020/NĐ-CP, hành vi cung cấp, chia sẻ thông tin giả mạo, sai sự thật trên mạng xã hội bị xử phạt tiền ở khung mức nào?',
        questionEn: 'Under Article 101 Clause 1 of Decree 15/2020/ND-CP, what fine bracket applies to distributing false hoaxes on social media?',
        suggestedAnswerVi: 'Khung tiền phạt từ 10.000.000 đồng đến 20.000.000 đồng đối với tổ chức (cá nhân vi phạm áp dụng mức phạt bằng 1/2 từ 5.000.000 đến 10.000.000 đồng theo quy định chung) cùng biện pháp khắc phục hậu quả buộc gỡ bỏ thông tin sai sự thật.',
        suggestedAnswerEn: 'Administrative fine bracket of 10,000,000 to 20,000,000 VND for organizations (half for individuals) plus mandatory immediate takedown of false content.',
        pedagogicalTipVi: 'Cho học sinh mở mục tra cứu văn bản pháp luật trên bài học để đọc nguyên văn Điều 101 Nghị định 15/2020.',
        pedagogicalTipEn: 'Guide students through the interactive law browser widget to read Article 101 verbatim.'
      },
      {
        id: 'p11-2-2',
        targetCognitiveLevel: 'Vận dụng cao',
        targetCognitiveLevelEn: 'Analyze',
        questionVi: 'Hãy giải thích 4 nguyên tắc vàng trong Hộp Ghi nhớ 2 trang 58 để nâng cao tính an toàn và đạo đức khi chia sẻ thông tin trên môi trường số?',
        questionEn: 'Explain the 4 golden safety rules in Summary Box 2 (page 58) for ethical and lawful information sharing online?',
        suggestedAnswerVi: '1. Kiểm tra kĩ thông tin trước khi đăng có vi phạm pháp luật không; 2. Không chia sẻ tin bài vi phạm pháp luật; 3. Xác minh tính chính xác trước khi share để không tiếp tay cho tin giả; 4. Cân nhắc khía cạnh đạo đức và hậu quả đối với người khác ngay cả khi tin không vi phạm luật.',
        suggestedAnswerEn: '1. Screen against legal violations prior to posting; 2. Never re-share unlawful posts; 3. Rigorously verify factual accuracy to halt fake news contagion; 4. Scrutinize ethical impacts on others even when legally compliant.',
        pedagogicalTipVi: 'Tổ chức cho học sinh thực hành phân tích tình huống đăng lịch trình giả bệnh nhân Covid-19 trong câu hỏi số 1 trang 59.',
        pedagogicalTipEn: 'Engage students in dissecting the Covid-19 itinerary leak case in question 1 on page 59.'
      }
    ]
  },
  3: {
    sectionId: 'bai-11-quyen-tac-gia-ban-quyen',
    sectionTitleVi: '3. Quyền tác giả và bản quyền — a) Quyền tác giả (Trang 59 SGK)',
    sectionTitleEn: '3. Authorship & Copyright — a) Copyright Foundations (Page 59)',
    prompts: [
      {
        id: 'p11-3-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Theo Luật Sở hữu trí tuệ 2019, quyền tác giả gồm 2 nhóm quyền nào? Sự khác nhau căn bản về khả năng chuyển giao thương mại giữa hai nhóm quyền này là gì?',
        questionEn: 'Under the 2019 IP Law, what are the two core branches of copyright, and how do they differ regarding commercial transferability?',
        suggestedAnswerVi: 'Bao gồm Quyền nhân thân (Điều 19) và Quyền tài sản (Điều 20). Quyền nhân thân (đặt tên, đứng tên, bảo vệ toàn vẹn) gắn liền vĩnh viễn với tác giả, không thể chuyển giao, bán hay từ bỏ. Quyền tài sản (sao chép, làm tác phẩm phái sinh, cho thuê, phân phối) có thể chuyển nhượng, cấp phép hoặc kinh doanh thương mại.',
        suggestedAnswerEn: 'Comprises Moral Rights (Art. 19) and Economic Rights (Art. 20). Moral rights (naming, attribution, integrity) belong inalienably to the author and cannot be sold. Economic rights (reproduction, derivatives, rental, distribution) can be assigned, licensed, and commercially monetized.',
        pedagogicalTipVi: 'Yêu cầu học sinh thực hiện bài test phân loại 4 tình huống nhân thân và tài sản trong giao diện tương tác.',
        pedagogicalTipEn: 'Have students complete the interactive 4-scenario classification widget contrasting moral vs economic claims.'
      },
      {
        id: 'p11-3-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Khi dịch một cuốn sách Tin học sang tiếng nước ngoài hoặc chuyển thể một phần mềm từ máy tính sang chạy trên điện thoại di động, đó là tác phẩm gì và cần tuân thủ quy định nào?',
        questionEn: 'When translating a computer science book into another language or porting desktop software to mobile devices, what type of work is produced and what rules apply?',
        suggestedAnswerVi: 'Đó là "Tác phẩm phái sinh" (Derivative work). Người làm tác phẩm phái sinh bắt buộc phải có sự cho phép bằng văn bản của chủ sở hữu bản quyền tác phẩm gốc và phải bảo đảm quyền nhân thân, ghi rõ tên tác giả và tác phẩm gốc.',
        suggestedAnswerEn: 'It is a "Derivative Work". The creator must obtain written authorization/licensing from the original copyright holder and uphold moral rights by explicitly citing the original author and title.',
        pedagogicalTipVi: 'Cho học sinh xem sơ đồ 3 bước cấp phép tác phẩm phái sinh trên màn hình bài học.',
        pedagogicalTipEn: 'Demonstrate the 3-step derivative licensing workflow animation on the interactive canvas.'
      }
    ]
  },
  4: {
    sectionId: 'bai-11-vi-pham-ban-quyen-tin-hoc',
    sectionTitleVi: '4. Vi phạm bản quyền & Tôn trọng bản quyền trong tin học (Trang 60 – 61 SGK)',
    sectionTitleEn: '4. Software Copyright Infringement & Compliance (Pages 60–61)',
    prompts: [
      {
        id: 'p11-4-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Hãy phân biệt sự khác nhau giữa "Mua bản quyền" và "Mua quyền sử dụng (Licence)" khi người dùng mua các sản phẩm phần mềm tin học?',
        questionEn: 'How does purchasing full copyright ownership differ from acquiring an end-user license for software products?',
        suggestedAnswerVi: 'Mua bản quyền là mua toàn bộ quyền sở hữu và khai thác kinh tế (như Google mua lại YouTube). Còn mua quyền sử dụng (Licence) chỉ là mua quyền cài đặt sử dụng trên số lượng máy tính quy định (như mua Windows, Office, Photoshop); bản quyền vẫn hoàn toàn thuộc về công ty sản xuất.',
        suggestedAnswerEn: 'Purchasing full copyright transfers total economic exploitation and ownership (e.g. Google acquiring YouTube). Purchasing a license merely grants limited operational rights on designated seats (e.g. Windows, Photoshop), while copyright remains with the software publisher.',
        pedagogicalTipVi: 'Nhấn mạnh với học sinh tình huống Lan cài đĩa bản quyền 1 máy sang máy thứ hai của bạn là hành vi vi phạm bản quyền phổ biến mà nhiều người không nhận thức được.',
        pedagogicalTipEn: 'Highlight the scenario where Lan installs a single-seat CD onto a friend’s computer as a widespread unintentional copyright infringement.'
      },
      {
        id: 'p11-4-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Tại sao hành vi bẻ khóa phần mềm (crack), kể cả khi chỉ thử nghiệm trình độ kỹ thuật chứ không sử dụng, vẫn cấu thành vi phạm pháp luật theo Nghị định 131/2013/NĐ-CP?',
        questionEn: 'Why does software cracking, even if conducted purely to test reverse engineering skills without utilization, violate Decree 131/2013/ND-CP?',
        suggestedAnswerVi: 'Nghị định 131/2013 cấm hành vi "cố ý hủy bỏ hoặc làm vô hiệu các biện pháp kĩ thuật do chủ sở hữu thiết lập để bảo vệ quyền tác giả". Bản thân hành vi bẻ khóa đã là hành vi phá vỡ cơ chế bảo vệ và xâm phạm tính toàn vẹn của phần mềm, bất kể động cơ cá nhân.',
        suggestedAnswerEn: 'Decree 131 explicitly outlaws intentionally bypassing technological DRM locks installed by copyright owners. The act of circumvention itself dismantles integrity protections, regardless of subjective intent.',
        pedagogicalTipVi: 'Định hướng học sinh tiếp cận phong trào Phần mềm nguồn mở (FOSS) và Giấy phép Creative Commons/GPL thay vì dùng công cụ bẻ khóa crack.',
        pedagogicalTipEn: 'Guide students toward Free and Open-Source Software (FOSS) and Creative Commons/GPL alternatives instead of illegal warez cracks.'
      }
    ]
  },
  5: {
    sectionId: 'bai-11-luyen-tap-van-dung',
    sectionTitleVi: '5. Luyện tập & Vận dụng thực tế (Trang 62 SGK)',
    sectionTitleEn: '5. Practice Exercises & Real-World Applications (Page 62)',
    prompts: [
      {
        id: 'p11-5-1',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Trong bài Vận dụng 2 trang 62 SGK, câu nói của Bình: "Trước đây mình không biết, mà không biết là không có lỗi" sai ở điểm căn bản nào trong nguyên lý thực thi pháp luật?',
        questionEn: 'In Application Task 2 (page 62), what fundamental flaw exists in Binh’s claim: "I didn’t know earlier, and ignorance bears no blame"?',
        suggestedAnswerVi: 'Sai với nguyên tắc pháp lý phổ quát "Ignorantia juris non excusat" (Không biết luật không phải là căn cứ để miễn trừ trách nhiệm). Pháp luật đã được công bố công khai thì mọi cá nhân trong xã hội đều có nghĩa vụ tìm hiểu và nghiêm túc tuân thủ.',
        suggestedAnswerEn: 'Violates the universal legal maxim "Ignorantia juris non excusat" (Ignorance of the law excuses not). Promulgated statutes impose a mandatory civic obligation of compliance upon every citizen.',
        pedagogicalTipVi: 'Gợi ý học sinh cách hành xử đúng đắn: gỡ bỏ phần mềm lậu, tìm giải pháp mã nguồn mở thay thế hoặc xin cấp phép bản quyền học sinh sinh viên.',
        pedagogicalTipEn: 'Encourage students to outline proactive corrective steps: removing warez and adopting educational licenses or open-source software.'
      },
      {
        id: 'p11-5-2',
        targetCognitiveLevel: 'Vận dụng cao',
        targetCognitiveLevelEn: 'Analyze',
        questionVi: 'Làm thế nào để học sinh hình thành thói quen "Văn hóa bản quyền và Ứng xử số chuẩn mực" trong học tập và đời sống hàng ngày?',
        questionEn: 'How can high school students build an enduring culture of digital etiquette and copyright integrity in daily cyber interactions?',
        suggestedAnswerVi: 'Luôn trích dẫn nguồn khi sử dụng tài liệu; tôn trọng quyền sở hữu trí tuệ của tác giả; không chia sẻ thông tin chưa kiểm chứng; bình luận văn minh, tôn trọng người khác; và tích cực lan tỏa thông tin tích cực, lan tỏa hình ảnh đẹp về đất nước con người Việt Nam theo Quyết định 874/QĐ-BTTTT.',
        suggestedAnswerEn: 'Consistently cite academic sources; respect author royalties and software licenses; avoid resharing unverified rumors; communicate respectfully online; and foster positive contributions per Decision 874.',
        pedagogicalTipVi: 'Khuyến khích học sinh hoàn thành bài kiểm tra 10 câu hỏi để nhận Chứng chỉ năng lực điện tử KNTT10-B11.',
        pedagogicalTipEn: 'Prompt students to complete the 10-question evaluation to unlock certificate KNTT10-B11.'
      }
    ]
  }
};

// -------------------------------------------------------------
// BÀI 12: PHẦN MỀM THIẾT KẾ ĐỒ HOẠ (Trang 63 – 68 SGK)
// -------------------------------------------------------------
export const TEACHER_PROMPTS_LESSON_12: Record<number, SectionTeacherPrompts> = {
  0: {
    sectionId: 'bai-12-muc-tieu-khoi-dong',
    sectionTitleVi: 'Mục tiêu & Khởi động: So sánh ảnh chụp và hình vẽ (Trang 63 SGK)',
    sectionTitleEn: 'Lesson 12 Objectives & Warm-up: Photo vs Vector Comparison (Page 63)',
    prompts: [
      {
        id: 'p12-0-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'So sánh sự khác nhau về bản chất và tính chất hiển thị khi phóng to giữa ảnh chụp bông hoa Cosmos (Hình 12.1a) và hình vẽ bông hoa vector (Hình 12.1b)?',
        questionEn: 'Compare the fundamental nature and zoom behavior between the real Cosmos photograph (Figure 12.1a) and the vector flower illustration (Figure 12.1b)?',
        suggestedAnswerVi: 'Ảnh chụp 12.1a là đồ hoạ điểm ảnh (bitmap), tạo từ lưới các điểm màu (pixel) có độ chi tiết cao, màu sắc chuyển tiếp tự nhiên nhưng khi phóng to sẽ bị vỡ hạt, răng cưa và nhòe hình. Hình vẽ 12.1b là đồ hoạ vecto (vector), tạo từ các đường nét và hình khối được tính bằng phương trình toán học, số màu ít hơn nhưng khi phóng to thu nhỏ tùy ý vẫn giữ nguyên độ sắc nét hoàn hảo.',
        suggestedAnswerEn: 'Photograph 12.1a is bitmap graphics made of a pixel grid with high photographic depth, which suffers jagged pixelation and blur upon magnification. Drawing 12.1b is vector graphics calculated via mathematical geometry curves, which retains infinite resolution and crisp contours at any zoom level.',
        pedagogicalTipVi: 'Yêu cầu học sinh tương tác với mô hình 3D Three.js mô phỏng voxel pixel và đường cong Bézier toán học trên màn hình để quan sát trực tiếp sự khác biệt.',
        pedagogicalTipEn: 'Direct students to manipulate the interactive Three.js 3D model contrasting voxel cubes with continuous mathematical Bézier surfaces.'
      },
      {
        id: 'p12-0-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Trong thực tế dự án trường học, khi nào học sinh nên chọn đồ hoạ điểm ảnh và khi nào bắt buộc phải dùng đồ hoạ vector?',
        questionEn: 'In school project workflows, when should students select bitmap graphics versus mandatory vector graphics?',
        suggestedAnswerVi: 'Dùng đồ hoạ điểm ảnh (bitmap - ảnh chụp, Photoshop, GIMP) khi xử lý ảnh kỷ yếu, phong cảnh, chân dung cần dải màu chân thực và hiệu ứng đổ bóng phức tạp. Bắt buộc dùng đồ hoạ vector (Inkscape, Illustrator) khi thiết kế logo đoàn trường, biểu trưng huy hiệu, bảng hiệu quảng cáo ngoài trời khổ lớn để in ấn ở mọi kích thước mà không bị suy hao chất lượng.',
        suggestedAnswerEn: 'Choose bitmap for photography, realistic portraits, and yearbook shots requiring rich gradients and textural subtleties. Vector graphics is mandatory for logos, icons, emblems, badges, and large outdoor print banners requiring infinite resolution scaling.',
        pedagogicalTipVi: 'Khơi gợi cho học sinh phát biểu ví dụ cụ thể về logo lớp hoặc áo đồng điệu cần in ấn để liên hệ thực tiễn.',
        pedagogicalTipEn: 'Prompt students to share real examples such as school club logos or custom class T-shirt graphics needing clean vector print files.'
      }
    ]
  },
  1: {
    sectionId: 'bai-12-thiet-ke-do-hoa-vector-bitmap',
    sectionTitleVi: '1. Thiết kế đồ hoạ & So sánh Vector vs Bitmap (Trang 63 – 64 SGK)',
    sectionTitleEn: '1. Graphic Design & Vector vs. Bitmap Matrix (Pages 63 – 64)',
    prompts: [
      {
        id: 'p12-1-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Dựa vào Bảng so sánh chuẩn trang 64 SGK, hãy phân tích 5 tiêu chí đối chiếu giữa đồ hoạ điểm ảnh và đồ hoạ vecto?',
        questionEn: 'Based on the textbook comparison table on Page 64, analyze the 5 criteria contrasting bitmap and vector graphics?',
        suggestedAnswerVi: '1) Định nghĩa: Bitmap định nghĩa bằng tập điểm ảnh (pixel); Vector định nghĩa bằng phương trình toán học. 2) Ứng dụng: Bitmap hợp sửa ảnh, nhiều chi tiết, màu chân thực; Vector hợp tạo logo, minh hoạ, bản vẽ kỹ thuật. 3) Phóng to: Bitmap bị ảnh hưởng chất lượng (vỡ hạt); Vector co giãn tùy ý không vỡ. 4) Kích thước tệp: Bitmap tệp lớn khi ảnh chi tiết cao; Vector kích thước tệp nhẹ và không đổi theo khổ in. 5) Chuyển đổi: Bitmap không thể chuyển sang vector giữ nguyên chất lượng; Vector rất dễ dàng chuyển đổi sang bitmap.',
        suggestedAnswerEn: '1) Definition: Pixels collection vs. Mathematical equations. 2) Purpose: Photo retouching/complex color vs. Logos, technical sketches. 3) Zooming: Pixelated artifacts vs. Resolution-independent scaling. 4) File size: Proportional to pixel count vs. Compact/independent of dimensions. 5) Interoperability: Cannot convert to vector losslessly vs. Effortlessly exportable to bitmap.',
        pedagogicalTipVi: 'Cho học sinh kéo thanh kính lúp điện tử Hình 12.2 để so sánh pixel hạt vỡ bên trái với đường viền trơn tru bên phải.',
        pedagogicalTipEn: 'Have students drag the interactive electronic loupe magnifier in Figure 12.2 to contrast pixelation against smooth vector contours.'
      },
      {
        id: 'p12-1-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Giải thích vì sao một tệp vector vẽ logo có thể in ra tấm biển quảng cáo dài 20 mét mà dung lượng tệp lưu trữ trên đĩa cứng vẫn giữ nguyên?',
        questionEn: 'Explain why a vector logo file can be printed onto a 20-meter billboard while hard drive file size remains practically identical?',
        suggestedAnswerVi: 'Bởi vì tệp vector chỉ lưu trữ công thức toán học mô tả tọa độ điểm nút (anchor nodes), bán kính cong, màu tô và màu viền (dưới dạng thẻ XML/SVG). Khi in ra khổ 20 mét hay khổ tem thư nhỏ 2 cm, máy tính chỉ việc nhân hệ số tỉ lệ vào phương trình để tính toán và kết xuất lại mà không phải lưu thêm hàng triệu điểm ảnh pixel như ảnh bitmap.',
        suggestedAnswerEn: 'Because vector files only store mathematical formulae describing node coordinates, curve tangents, and style attributes in XML/SVG tags. Printing at 20 meters merely multiplies coordinate factors in the equations without storing billions of extra RGB raster bytes.',
        pedagogicalTipVi: 'Yêu cầu học sinh quan sát mã nguồn SVG mô phỏng để thấy các câu lệnh thẻ <circle>, <rect>, <polygon> biểu diễn hình học.',
        pedagogicalTipEn: 'Direct students to examine the underlying SVG markup representation with mathematical <circle> and <polygon> element parameters.'
      }
    ]
  },
  2: {
    sectionId: 'bai-12-phan-mem-do-hoa-inkscape',
    sectionTitleVi: '2. Phần mềm đồ hoạ & 10 thành phần giao diện Inkscape (Trang 64 – 66 SGK)',
    sectionTitleEn: '2. Graphics Software & Inkscape 1.0.1 Interface Anatomy (Pages 64 – 66)',
    prompts: [
      {
        id: 'p12-2-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Dựa vào Hình 12.3 SGK, hãy nêu tên và chức năng của 4 thành phần quan trọng: Hộp công cụ, Thanh điều khiển thuộc tính, Bảng màu và Vùng làm việc?',
        questionEn: 'Based on Figure 12.3, identify the name and function of 4 vital GUI elements: Tool box, Tool control bar, Color Palette, and Canvas?',
        suggestedAnswerVi: '1) Hộp công cụ (Tool box): chứa các công cụ khởi tạo, vẽ và điều chỉnh đối tượng đồ hoạ. 2) Thanh điều khiển thuộc tính (Tool control bar): hiển thị các tham số đặc thù của công cụ đang chọn (như số góc, bán kính, kích thước). 3) Bảng màu (Color palette): thanh chứa các màu có sẵn ở đáy màn hình để thiết lập màu tô (Fill) và màu viền (Stroke). 4) Vùng làm việc (Canvas): toàn bộ nền trắng thực hiện vẽ, chứa khung trang in ấn.',
        suggestedAnswerEn: '1) Tool box: houses essential object creation and manipulation tools. 2) Tool control bar: displays context-specific properties for the active tool. 3) Color palette: bottom bar providing swatches for Fill and Stroke. 4) Canvas: entire workspace area containing the page print boundary.',
        pedagogicalTipVi: 'Cho học sinh nhấp vào các nút tương tác trên bản đồ giao diện Inkscape để xem mô tả chi tiết của từng thành phần.',
        pedagogicalTipEn: 'Instruct students to click interactive hotspots on the Inkscape interface schematic to reinforce component spatial awareness.'
      },
      {
        id: 'p12-2-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Inkscape và GIMP là phần mềm thuộc loại bản quyền nào? Định dạng tệp mặc định của Inkscape là gì và có ưu thế gì?',
        questionEn: 'What software licensing model applies to Inkscape and GIMP? What is Inkscape’s default file format and what are its advantages?',
        suggestedAnswerVi: 'Inkscape và GIMP là phần mềm mã nguồn mở miễn phí (FOSS/GPL), cho phép mọi người tải về sử dụng hợp pháp mà không tốn chi phí. Định dạng mặc định của Inkscape là Scalable Vector Graphics (.svg), là tiêu chuẩn đồ hoạ vector mở toàn cầu của tổ chức W3C, hỗ trợ hiển thị gốc trên mọi trình duyệt web hiện đại.',
        suggestedAnswerEn: 'Inkscape and GIMP are free open-source software (FOSS) compliant with GPL. Inkscape’s default storage format is Scalable Vector Graphics (.svg), an open W3C international vector standard renderable natively across all modern web browsers.',
        pedagogicalTipVi: 'Nhấn mạnh với học sinh liên hệ bài 11: việc dùng Inkscape giúp học sinh tôn trọng bản quyền phần mềm tuyệt đối mà không cần tìm cách bẻ khóa crack.',
        pedagogicalTipEn: 'Bridge to Lesson 11: utilizing Inkscape ensures 100% copyright compliance without resorting to cracked pirated alternatives.'
      }
    ]
  },
  3: {
    sectionId: 'bai-12-doi-tuong-do-hoa-lop',
    sectionTitleVi: '3. Các đối tượng đồ hoạ & Quy tắc tô màu Fill/Stroke (Trang 66 – 67 SGK)',
    sectionTitleEn: '3. Graphic Objects & Fill/Stroke Color Stacking Rules (Pages 66 – 67)',
    prompts: [
      {
        id: 'p12-3-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Trình bày 3 bước tạo một hình khối cơ bản trên Inkscape và sự khác biệt về các điểm điều khiển khi nháy chuột 1 lần so với 2 lần lên đối tượng bằng công cụ Select (F1)?',
        questionEn: 'Describe the 3 steps to create a basic shape in Inkscape, and contrast the bounding control handles when clicking once versus twice with the Select tool (F1)?',
        suggestedAnswerVi: '3 bước tạo hình: 1) Chọn công cụ trong Hộp công cụ; 2) Kéo thả chuột trên vùng làm việc để định kích thước; 3) Thiết lập màu sắc và thuộc tính. Với công cụ Select (F1): nháy chuột 1 lần xuất hiện 8 mũi tên thẳng để co giãn, thay đổi kích thước; nháy chuột lần thứ 2 xuất hiện 8 mũi tên cong ở góc để xoay đối tượng quanh tâm và bẻ nghiêng (skew).',
        suggestedAnswerEn: '3 steps: 1) Select tool in Tool box; 2) Click and drag on canvas to define size; 3) Customize colors and properties. In Select mode (F1): first click reveals 8 straight arrows for scaling/resizing; second click reveals curved arrows for rotation around pivot and shearing.',
        pedagogicalTipVi: 'Yêu cầu học sinh thực hành trên bảng vẽ tương tác: thử kéo mũi tên thẳng để phóng to, sau đó nhấp lần nữa để xoay cánh hoa.',
        pedagogicalTipEn: 'Guide students on the interactive canvas: scale petals via straight arrows, then click once more to rotate via corner arcs.'
      },
      {
        id: 'p12-3-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Phân biệt thao tác chuột khi gán màu tô (Fill) và gán màu viền (Stroke) từ Bảng màu? Làm thế nào để loại bỏ hoàn toàn màu viền hoặc màu tô?',
        questionEn: 'Distinguish the mouse operations when assigning Fill versus Stroke colors from the Palette? How does one eliminate stroke or fill altogether?',
        suggestedAnswerVi: 'Nháy chuột bình thường vào ô màu: đổi màu tô bên trong (Fill). Nhấn giữ phím Shift và nháy chuột vào ô màu: đổi màu đường viền (Stroke). Để loại bỏ màu tô: nháy chuột vào ô vuông dấu X gạch chéo ở đầu bảng màu; để bỏ màu viền: giữ Shift và nháy vào ô dấu X đó.',
        suggestedAnswerEn: 'Left-click swatch: assigns interior Fill color. Hold Shift + left-click swatch: assigns boundary Stroke color. To remove Fill: click the "X" swatch at palette head. To remove Stroke: Shift-click the "X" swatch.',
        pedagogicalTipVi: 'Cho học sinh thử nghiệm ngay trong bài Luyện tập 1 trên màn hình để củng cố thao tác Shift+Click.',
        pedagogicalTipEn: 'Prompt students to test the interactive color sequence simulator in Practice Task 1 to solidify the Shift+Click reflex.'
      }
    ]
  },
  4: {
    sectionId: 'bai-12-thuc-hanh-ve-hoa-co-to-quoc',
    sectionTitleVi: 'Thực hành: Nhiệm vụ 1 Vẽ bông hoa & Nhiệm vụ 2 Vẽ lá cờ Tổ quốc (Trang 67 – 68 SGK)',
    sectionTitleEn: 'Lab: Task 1 Flower Drawing & Task 2 Vietnam Flag Assembly (Pages 67 – 68)',
    prompts: [
      {
        id: 'p12-4-1',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Trong Nhiệm vụ 1, hãy trình bày tổ hợp phím và quy trình nhân bản (duplicate) cánh hoa kết hợp xoay để tạo thành một bông hoa cân đối?',
        questionEn: 'In Task 1, describe the shortcut key and workflow for duplicating and rotating petals to assemble a symmetrical blossom?',
        suggestedAnswerVi: 'Quy trình: 1) Vẽ 1 hình elip cánh hoa bằng F5, tô màu đỏ viền hồng; 2) Nhấn tổ hợp phím Ctrl + D để nhân bản cánh hoa đè lên vị trí cũ; 3) Nháy chuột lần thứ hai vào cánh hoa vừa tạo để hiện mũi tên xoay và điểm tâm quay; 4) Kéo điểm tâm quay xuống gốc cánh hoa rồi kéo mũi tên cong xoay cánh hoa đi một góc; 5) Lặp lại Ctrl+D và xoay cho đủ các cánh hoa xung quanh; 6) Vẽ hình tròn nhị hoa màu vàng xếp lên trên cùng.',
        suggestedAnswerEn: 'Workflow: 1) Draw initial petal ellipse (F5) with fill/stroke; 2) Press Ctrl+D to duplicate in-place; 3) Click second time to activate rotation handles and pivot; 4) Relocate rotation pivot to bottom base and rotate petal; 5) Repeat Ctrl+D and angular offset for remaining petals; 6) Draw center yellow circle on top.',
        pedagogicalTipVi: 'Cho học sinh điều chỉnh thanh trượt số cánh hoa (5 đến 12 cánh) trên bộ mô phỏng để thấy thuật toán nhân bản góc xoay tự động.',
        pedagogicalTipEn: 'Direct students to adjust the petal slider (5 to 12 petals) on the simulator to witness automated angular distribution.'
      },
      {
        id: 'p12-4-2',
        targetCognitiveLevel: 'Vận dụng cao',
        targetCognitiveLevelEn: 'Analyze',
        questionVi: 'Trong Nhiệm vụ 2 vẽ cờ Tổ quốc (Hình 12.6), vì sao sau khi vẽ hình chữ nhật đỏ che mất ngôi sao vàng, ta phải dùng lệnh "Lower to bottom" (End) và khái niệm thứ tự lớp (Z-order) có ý nghĩa sống còn như thế nào trong đồ hoạ vector?',
        questionEn: 'In Task 2 Vietnam Flag (Figure 12.6), why does the red rectangle occlude the yellow star requiring "Lower to bottom" (End), and why is Z-order vital in vector graphics?',
        suggestedAnswerVi: 'Trong Inkscape, đối tượng nào được vẽ sau sẽ mặc định được đặt ở lớp trên cùng (Z-order cao hơn) và che khuất các đối tượng vẽ trước nằm bên dưới. Khi vẽ hình chữ nhật nền cờ sau ngôi sao, hình chữ nhật sẽ che phủ hoàn toàn ngôi sao. Lệnh "Lower to bottom" (hoặc phím End) hạ hình chữ nhật xuống lớp đáy cùng để ngôi sao vàng nổi lên trên. Khái niệm lớp Z-order là nguyên lý cơ bản giúp sắp xếp trật tự thị giác cho các hình ảnh phức tạp.',
        suggestedAnswerEn: 'Inkscape defaults new objects to the uppermost layer (higher Z-index), occluding existing geometries beneath them. Drawing the flag field after the star completely obscures it. The "Lower to bottom" command (or End key) sinks the rectangle to the lowest stacking tier, surfacing the star. Z-order governs visual hierarchy in all vector artwork.',
        pedagogicalTipVi: 'Chuyển sang chế độ "Xếp lớp không gian 3D" trong mô hình Three.js để học sinh kéo thanh trượt Z-separation và quan sát lá cờ tách thành 2 tầng không gian tách biệt.',
        pedagogicalTipEn: 'Switch to the 3D Stacking Layer mode in Three.js so students can pull the Z-separation slider to inspect the exploded layers.'
      }
    ]
  },
  5: {
    sectionId: 'bai-12-luyen-tap-van-dung',
    sectionTitleVi: '5. Luyện tập & Vận dụng thực tế (Trang 68 SGK)',
    sectionTitleEn: '5. Practice Exercises & Real-World Applications (Page 68)',
    prompts: [
      {
        id: 'p12-5-1',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Trong bài Luyện tập 1, giải thích sự thay đổi màu sắc của hình tròn qua chuỗi thao tác: Đỏ -> Vàng -> Cam -> Shift + Đỏ?',
        questionEn: 'In Practice 1, detail how the circle’s colors transform through the sequence: Red -> Yellow -> Orange -> Shift + Red?',
        suggestedAnswerVi: 'Nháy Đỏ: ruột hình biến thành màu Đỏ (Fill=Red). Nháy Vàng: ruột hình chuyển sang Vàng (Fill=Yellow). Nháy Cam: ruột hình chuyển sang Cam (Fill=Orange). Nhấn giữ Shift và nháy Đỏ: thiết lập màu đường viền là Đỏ (Stroke=Red) trong khi ruột hình vẫn giữ nguyên màu Cam.',
        suggestedAnswerEn: 'Click Red: circle interior becomes Red (Fill=Red). Click Yellow: interior shifts to Yellow (Fill=Yellow). Click Orange: interior switches to Orange (Fill=Orange). Shift+Click Red: border outline becomes Red (Stroke=Red) while the interior stays Orange.',
        pedagogicalTipVi: 'Yêu cầu học sinh thực nghiệm trực tiếp trên ô mô phỏng Luyện tập 1 để tự kiểm chứng dự đoán của mình.',
        pedagogicalTipEn: 'Instruct students to verify their prediction on the interactive step-by-step canvas in Practice 1.'
      },
      {
        id: 'p12-5-2',
        targetCognitiveLevel: 'Vận dụng cao',
        targetCognitiveLevelEn: 'Analyze',
        questionVi: 'Để hoàn thành bài Vận dụng 1 (vẽ quốc kỳ Thái Lan, Lào, Myanmar, Anh) và Vận dụng 2 (vẽ con thú từ hình khối cơ bản), học sinh cần phối hợp những kỹ năng đồ hoạ cốt lõi nào?',
        questionEn: 'To complete Application 1 (Thailand, Laos, Myanmar, UK flags) and Application 2 (geometric animal drawings), what core vector skills must students integrate?',
        suggestedAnswerVi: '1) Sử dụng thành thạo các công cụ tạo hình cơ bản trong Hộp công cụ (F4 chữ nhật, F5 elip/tròn, * đa giác/sao); 2) Giữ phím Ctrl để vẽ hình chuẩn (vuông, tròn hoàn hảo, góc quay cố định); 3) Sử dụng phím Shift để phối hợp màu Fill và Stroke; 4) Điều chỉnh thứ tự lớp Z-order (Home, End, PageUp, PageDown) để các chi tiết trước - sau không bị che khuất; 5) Sử dụng công cụ chọn F1 để co giãn và căn chỉnh tỉ lệ.',
        suggestedAnswerEn: '1) Mastery of primitive drawing tools (F4 rectangle, F5 circle, * polygon); 2) Holding Ctrl for geometric constraints (squares, true circles, constrained rotation); 3) Shift modifier for Fill/Stroke assignment; 4) Z-order management (Home/End/PgUp/PgDn); 5) Transform scaling and alignment via the Select tool (F1).',
        pedagogicalTipVi: 'Động viên học sinh làm bài thi trắc nghiệm 10 câu để kiểm tra độ hiểu sâu và mở khóa Chứng chỉ thiết kế đồ hoạ số KNTT10-B12.',
        pedagogicalTipEn: 'Encourage students to take the 10-question evaluation to solidify competence and unlock digital certificate KNTT10-B12.'
      }
    ]
  }
};

// ==========================================
// LESSON 13: BỔ SUNG CÁC ĐỐI TƯỢNG ĐỒ HOẠ (ADDING GRAPHIC OBJECTS)
// SGK Tin học 10 Kết nối tri thức - Chủ đề 4: Ứng dụng tin học (Trang 69 – 74)
// ==========================================
export const TEACHER_PROMPTS_LESSON_13: Record<number, SectionTeacherPrompts> = {
  0: {
    sectionId: 'bai-13-muc-tieu-khoi-dong',
    sectionTitleVi: 'Mục tiêu bài học & Hoạt động Khởi động (Trang 69 SGK)',
    sectionTitleEn: 'Lesson Objectives & Warm-Up: Watermelon Slice (Page 69)',
    prompts: [
      {
        id: 'p13-0-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Sau bài học 13 này, học sinh cần đạt được 2 mục tiêu kiến thức và kỹ năng cơ bản nào theo SGK trang 69?',
        questionEn: 'According to Page 69, what two fundamental knowledge and skill objectives must students master in Lesson 13?',
        suggestedAnswerVi: '1) Biết và sử dụng được một số chức năng của các lệnh tạo, điều chỉnh các đối tượng đồ hoạ đơn giản (các tham số hình khối có sẵn); 2) Biết và thực hiện được các phép ghép đối tượng đồ hoạ trong menu Path (hợp, hiệu, giao, hiệu đối xứng, chia, cắt).',
        suggestedAnswerEn: '1) Understand and utilize key functions to generate and modify primitive geometric objects; 2) Understand and execute Boolean graphic combination operations in the Path menu (Union, Difference, Intersection, Exclusion, Division, Cut Path).',
        pedagogicalTipVi: 'Yêu cầu học sinh mở mô hình 3D Three.js và bấm nút Khám phá 3 chế độ để hình dung trước các phép toán hình học không gian.',
        pedagogicalTipEn: 'Direct students to interact with the Three.js 3D viewer to gain intuitive spatial appreciation of Boolean operations and radial volumetric shading.'
      },
      {
        id: 'p13-0-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Quan sát hình vẽ miếng dưa hấu ở Hình 13.1, hãy xác định thứ tự xếp chồng các lớp (Z-order) của các đối tượng từ dưới lên trên?',
        questionEn: 'Observing the watermelon slice in Figure 13.1, determine the exact bottom-to-top Z-order layer sequence of its constituent shapes?',
        suggestedAnswerVi: 'Lớp 1 (dưới cùng): Cung tròn/hình quạt màu xanh lá cây (vỏ ngoài). Lớp 2: Cung tròn màu trắng ngà/xanh nhạt (cùi dưa). Lớp 3: Cung tròn màu đỏ tươi (ruột dưa). Lớp 4 (trên cùng): Các hình elip/giọt nước nhỏ màu đen (hạt dưa hấu).',
        suggestedAnswerEn: 'Layer 1 (bottom): Green outer arc (rind). Layer 2: White/pale arc (pulp rind). Layer 3: Crimson red arc (flesh). Layer 4 (topmost): Small black ellipses (seeds).',
        pedagogicalTipVi: 'Cho học sinh nhấp vào từng lớp trong bảng phân rã dưa hấu tương tác để thấy rõ sự che khuất giữa các lớp.',
        pedagogicalTipEn: 'Have students click each layer in the interactive slice diagram to visualize how stacking order dictates visibility.'
      }
    ]
  },
  1: {
    sectionId: 'bai-13-cac-doi-tuong-hinh-khoi',
    sectionTitleVi: '1. Các đối tượng hình khối và bảng thuộc tính (Trang 69 – 70 SGK)',
    sectionTitleEn: '1. Primitive Geometric Shapes & Property Parameters (Pages 69 – 70)',
    prompts: [
      {
        id: 'p13-1-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Khi vẽ hình chữ nhật hoặc hình vuông, hai tham số Rx và Ry trên thanh điều khiển thuộc tính dùng để làm gì? Nếu đặt Rx = Ry = 0 thì hình có đặc điểm gì?',
        questionEn: 'When creating rectangles or squares, what do parameters Rx and Ry control? What happens when Rx = Ry = 0?',
        suggestedAnswerVi: 'Rx và Ry xác định bán kính bo góc theo phương ngang và phương thẳng đứng. Nếu đặt Rx = Ry = 0 thì hình có các góc vuông sắc cạnh (90 độ) không bị bo tròn.',
        suggestedAnswerEn: 'Rx and Ry govern the horizontal and vertical corner rounding radii. When Rx = Ry = 0, corners remain sharp 90-degree right angles without rounding.',
        pedagogicalTipVi: 'Cho học sinh kéo thanh trượt Rx/Ry trong bộ thử nghiệm 2D để quan sát góc chuyển từ vuông nhọn sang bo tròn.',
        pedagogicalTipEn: 'Prompt students to manipulate the Rx/Ry sliders in the 2D sandbox to observe instantaneous corner rounding.'
      },
      {
        id: 'p13-1-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Theo câu hỏi củng cố trang 70: Nếu trên hình vẽ có sẵn một hình sao 5 cánh nhọn, em cần thay đổi tham số nào để các đỉnh ngôi sao trở nên cong tròn mềm mại?',
        questionEn: 'Per the concept check on Page 70: Given a 5-pointed sharp star, which parameter must be adjusted to round its vertex tips?',
        suggestedAnswerVi: 'Cần tăng tham số Rounded (độ cong tại các đỉnh) từ 0 lên giá trị dương (khoảng 0.2 đến 0.5) trên thanh điều khiển thuộc tính của công cụ Stars and Polygons.',
        suggestedAnswerEn: 'Increase the Rounded parameter (vertex curvature) from 0 to a positive number (approx. 0.2 to 0.5) on the tool controls bar.',
        pedagogicalTipVi: 'Nhấn mạnh sự khác biệt giữa Rounded (bo góc đỉnh) và Spoke ratio (tỉ lệ bán kính trong/ngoài quyết định độ béo gầy của cánh sao).',
        pedagogicalTipEn: 'Contrast Rounded (tip curvature) with Spoke ratio (inner/outer radius ratio controlling star fatness).'
      }
    ]
  },
  2: {
    sectionId: 'bai-13-thiet-lap-mau-to-mau-ve',
    sectionTitleVi: '2. Thiết lập màu tô, màu vẽ và tô màu cho đối tượng (Trang 70 – 71 SGK)',
    sectionTitleEn: '2. Setting Fill, Stroke & Gradient Shading (Pages 70 – 71)',
    prompts: [
      {
        id: 'p13-2-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Hộp thoại Fill and Stroke (Shift+Ctrl+F) gồm có 3 trang (tab) chính nào và chức năng của từng trang là gì?',
        questionEn: 'What are the 3 main tabs in the Fill and Stroke dialog (Shift+Ctrl+F) and what is the role of each tab?',
        suggestedAnswerVi: '1) Fill (Màu tô): Thiết lập màu bên trong đối tượng; 2) Stroke paint (Màu vẽ): Thiết lập màu viền bao quanh đối tượng; 3) Stroke style (Kiểu nét vẽ): Thiết lập độ dày (Width), dạng nét đứt (Dashes) và kiểu đầu mút/góc nối.',
        suggestedAnswerEn: '1) Fill: Configures the interior fill style and color; 2) Stroke paint: Sets boundary stroke color; 3) Stroke style: Controls stroke thickness (Width), dash patterns, and end cap terminals.',
        pedagogicalTipVi: 'Cho học sinh mở hộp thoại mô phỏng Fill and Stroke trong ứng dụng để trực tiếp chuyển đổi qua lại giữa 3 thẻ.',
        pedagogicalTipEn: 'Have students navigate between the 3 simulated tabs in the interactive dialog to experience realistic Inkscape settings.'
      },
      {
        id: 'p13-2-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Phân biệt sự khác nhau cơ bản giữa kiểu tô màu chuyển sắc tuyến tính (Linear Gradient) và tô màu toả tròn (Radial Gradient)?',
        questionEn: 'Distinguish the core mechanical difference between Linear Gradient and Radial Gradient shading?',
        suggestedAnswerVi: 'Linear Gradient chuyển đổi màu mượt mà theo một đường thẳng (từ điểm đầu đến điểm cuối theo phương ngang, dọc hoặc chéo). Radial Gradient chuyển đổi màu toả tròn từ tâm ra ngoài theo các vòng đồng tâm hoặc elip, rất thích hợp để tạo khối cầu 3D.',
        suggestedAnswerEn: 'Linear Gradient blends colors linearly along a straight line vector. Radial Gradient radiates colors outward from a focal center in concentric circular or elliptical halos, ideal for volumetric 3D sphere shading.',
        pedagogicalTipVi: 'Cho học sinh kéo điểm sáng trong mô hình Quả cầu 3D để quan sát trực tiếp hiệu ứng phản xạ ánh sáng.',
        pedagogicalTipEn: 'Guide students to drag the highlight node in the 3D sphere viewer to understand directional specular illumination.'
      }
    ]
  },
  3: {
    sectionId: 'bai-13-cac-phep-ghep-doi-tuong',
    sectionTitleVi: '3. Các phép ghép đối tượng đồ hoạ trong menu Path (Trang 71 – 72 SGK)',
    sectionTitleEn: '3. Boolean Path Operations in Inkscape (Pages 71 – 72)',
    prompts: [
      {
        id: 'p13-3-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Nêu tên và tác dụng của 6 phép ghép trong bảng chọn Path (Hình 13.6 SGK trang 71 – 72)?',
        questionEn: 'Enumerate the names and geometric outcomes of the 6 Boolean operations in the Path menu (Fig 13.6, pp. 71–72)?',
        suggestedAnswerVi: '1) Hợp (Union, Ctrl + +): Hợp nhất tất cả phần của các hình; 2) Hiệu (Difference, Ctrl + -): Giữ lại phần thuộc hình lớp dưới trừ đi phần giao với hình lớp trên; 3) Giao (Intersection, Ctrl + *): Chỉ giữ lại phần chung; 4) Hiệu đối xứng (Exclusion, Ctrl + ^): Lấy toàn bộ trừ đi phần giao nhau; 5) Chia (Division, Ctrl + /): Cắt hình dưới thành các mảnh bởi đường biên hình trên; 6) Cắt (Cut Path, Ctrl + Alt + /): Cắt đường nét viền của hình dưới thành các đoạn mở.',
        suggestedAnswerEn: '1) Union (Ctrl++): Combines all parts; 2) Difference (Ctrl+-): Subtracts topmost shape from bottom shape; 3) Intersection (Ctrl+*): Keeps only overlapping areas; 4) Exclusion (Ctrl+^): Keeps everything except intersection; 5) Division (Ctrl+/): Slices bottom shape into independent pieces; 6) Cut Path (Ctrl+Alt+/): Cuts bottom stroke into open sub-paths.',
        pedagogicalTipVi: 'Yêu cầu học sinh bấm lần lượt 6 thẻ phép ghép trong bộ mô phỏng trực quan để so sánh kết quả trên cùng 2 hình vuông - tròn.',
        pedagogicalTipEn: 'Have students cycle through the 6 operation tabs in the interactive sandbox to observe results on identical square-circle primitives.'
      },
      {
        id: 'p13-3-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Theo câu hỏi củng cố trang 72 (Hình 13.7): Hình đám mây được ghép từ các hình tròn bằng cách sử dụng phép ghép nào trong Inkscape?',
        questionEn: 'Per the checkpoint question on Page 72 (Figure 13.7): What Boolean operation fuses circles into a fluffy cloud shape?',
        suggestedAnswerVi: 'Sử dụng phép Hợp (Union, phím tắt Ctrl + +). Các hình tròn được xếp chồng giao nhau một phần ở các vị trí khác nhau, sau đó chọn toàn bộ và bấm Union để gộp thành một đường viền đám mây duy nhất khép kín.',
        suggestedAnswerEn: 'Apply Path -> Union (Ctrl + +). Overlapping circles of varying radii are fused into a unified closed contour cloud silhouette.',
        pedagogicalTipVi: 'Gợi ý học sinh thử ghép trái tim (Hoạt động 3) bằng phép Hợp từ 1 hình vuông và 2 hình tròn để củng cố nguyên lý.',
        pedagogicalTipEn: 'Suggest students assemble the heart (Activity 3) using Union of a rotated square and 2 circles to reinforce the concept.'
      }
    ]
  },
  4: {
    sectionId: 'bai-13-thuc-hanh-tao-ghep-doi-tuong',
    sectionTitleVi: '4. Thực hành: Tạo và ghép các đối tượng đồ hoạ (Trang 72 – 73 SGK)',
    sectionTitleEn: '4. Practical Lab: Logo, Tree, & 3D Sphere (Pages 72 – 73)',
    prompts: [
      {
        id: 'p13-4-1',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Trong Nhiệm vụ 1 (vẽ logo 3 cung tròn Hình 13.8 & 13.9), tại sao cần xoay một góc chính xác 120 độ sau mỗi lần nhân bản bằng Ctrl+D?',
        questionEn: 'In Task 1 (3-arc logo, Figs 13.8 & 13.9), why must duplicated arcs be rotated precisely 120 degrees?',
        suggestedAnswerVi: 'Vì một vòng tròn hoàn chỉnh có 360 độ. Để 3 cung tròn phân bổ đều đối xứng qua tâm và lồng khít vào nhau thành logo cân đối, góc xoay giữa mỗi cung tròn là 360 độ chia 3 bằng 120 độ.',
        suggestedAnswerEn: 'Because a complete circle spans 360 degrees. To symmetrically interlock 3 arcs uniformly around the origin, the rotation interval is 360° / 3 = 120°.',
        pedagogicalTipVi: 'Cho học sinh điều chỉnh thanh trượt Stroke width trong bộ mô phỏng để thấy nét vẽ dày lên mà không bị vỡ hình vector.',
        pedagogicalTipEn: 'Prompt students to adjust Stroke Width in the live simulator to demonstrate vector resolution independence.'
      },
      {
        id: 'p13-4-2',
        targetCognitiveLevel: 'Vận dụng cao',
        targetCognitiveLevelEn: 'Analyze',
        questionVi: 'Trong Nhiệm vụ 2 (vẽ hình cây Hình 13.11), hãy phân tích vai trò kết hợp của hai phép ghép Difference và Union?',
        questionEn: 'In Task 2 (tree drawing, Fig 13.11), analyze the synergistic roles of Difference and Union operations?',
        suggestedAnswerVi: 'Phép Difference (Ctrl + -) đóng vai trò trừ bớt: Lấy hình chữ nhật thân cây trừ đi 2 hình tròn đặt ở 2 bên mép để khoét thành eo cong thắt tự nhiên. Sau đó, phép Union (Ctrl + +) đóng vai trò gộp lại: Hợp nhất thân cây đã khoét với 3 hình tròn tán lá thành một đường bao kín duy nhất để tô màu xanh lá đồng nhất.',
        suggestedAnswerEn: 'Difference (Ctrl + -) carves away material: subtracting 2 side circles from the trunk rectangle yields a stylish concave waist. Then, Union (Ctrl + +) fuses the carved trunk with the 3 canopy circles into an uninterrupted single path ready for solid fill.',
        pedagogicalTipVi: 'Yêu cầu học sinh thực hành chuyển qua từng bước 1 đến 5 của Nhiệm vụ 2 trong mô phỏng để nắm vững quy trình.',
        pedagogicalTipEn: 'Have students step sequentially through steps 1 to 5 of Task 2 in the interactive simulation.'
      }
    ]
  },
  5: {
    sectionId: 'bai-13-luyen-tap-van-dung',
    sectionTitleVi: '5. Luyện tập & Vận dụng sáng tạo (Trang 74 SGK)',
    sectionTitleEn: '5. Creative Practice & Application (Page 74)',
    prompts: [
      {
        id: 'p13-5-1',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Để hoàn thành bài Luyện tập 1 (vẽ bông hoa Hình 13.14) và Luyện tập 2 (vẽ quân bích Hình 13.15), học sinh cần vận dụng linh hoạt những thủ thuật nào?',
        questionEn: 'To complete Practice 1 (flower Fig 13.14) and Practice 2 (spade Fig 13.15), what graphical techniques must be deployed?',
        suggestedAnswerVi: 'Với bông hoa: Chọn Star tool, đặt Corners = 8, kéo Rounded lên khoảng 0.4 để biến đỉnh nhọn thành cánh hoa tròn mềm mại; Với quân bích: Lấy trái tim lật ngược (Flip vertically) kết hợp chân đế loe bằng phép Union (Ctrl + +).',
        suggestedAnswerEn: 'For the flower: Select Star tool, set Corners = 8, increase Rounded to ~0.4 to morph sharp points into rounded petals; For the spade: Flip a heart vertically, add a flared pedestal base, and merge via Union (Ctrl + +).',
        pedagogicalTipVi: 'Cho học sinh tương tác với thanh trượt tham số bông hoa và nút bấm hợp nhất quân bích trong giao diện.',
        pedagogicalTipEn: 'Guide students to experiment with petal curvature sliders and the spade union toggle button in the practice sandbox.'
      },
      {
        id: 'p13-5-2',
        targetCognitiveLevel: 'Vận dụng cao',
        targetCognitiveLevelEn: 'Analyze',
        questionVi: 'Trong bài Luyện tập 3 (chùm bóng bay Hình 13.16), yếu tố đồ hoạ nào giúp hình elip đơn giản tạo cảm giác như một quả bóng căng tròn ba chiều bắt mắt?',
        questionEn: 'In Practice 3 (balloon bouquet, Fig 13.16), what visual element transforms flat ellipses into believable 3D balloons?',
        suggestedAnswerVi: 'Vệt sáng phản quang hình trăng khuyết màu trắng mờ (specular crescent highlight) đặt ở góc mép trên bên trái của quả bóng, kết hợp với các lớp bóng trước sau che khuất (Z-order) và dây bóng cong mềm mại.',
        suggestedAnswerEn: 'The semi-transparent white crescent highlight on the upper-left perimeter mimicking specular reflection, combined with overlapping Z-order depth and graceful curved string paths.',
        pedagogicalTipVi: 'Khuyến khích học sinh làm bài thi trắc nghiệm 10 câu để đánh giá toàn diện năng lực và nhận Chứng chỉ thiết kế đồ hoạ số KNTT10-B13.',
        pedagogicalTipEn: 'Encourage students to complete the 10-question evaluation to earn digital credential KNTT10-B13.'
      }
    ]
  }
};

// ============================================================================
// BÀI 14: LÀM VIỆC VỚI ĐỐI TƯỢNG ĐƯỜNG VÀ VĂN BẢN (WORKING WITH PATHS & TEXT)
// SGK Tin học 10 Kết nối tri thức - Trang 75 – 81
// ============================================================================
export const TEACHER_PROMPTS_LESSON_14: Record<number, SectionTeacherPrompts> = {
  0: {
    sectionId: 'bai-14-muc-tieu-khoi-dong',
    sectionTitleVi: 'Mục tiêu bài học & Hoạt động Khởi động (Trang 75 SGK)',
    sectionTitleEn: 'Lesson Objectives & Warm-up: Points to Curves (Page 75)',
    prompts: [
      {
        id: 'p14-0-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Sau bài học 14, học sinh cần làm chủ 3 mục tiêu kiến thức và kỹ năng nào theo SGK trang 75?',
        questionEn: 'According to Page 75, what 3 knowledge and competency objectives must students achieve in Lesson 14?',
        suggestedAnswerVi: '1) Biết các thao tác chỉnh sửa hình (biến hình khối thành đường và chỉnh điểm neo); 2) Thực hiện được việc vẽ, chỉnh sửa hình để được đường cong mong muốn (sử dụng Pen tool và Edit paths nodes); 3) Biết tạo và định dạng văn bản (đặt chữ uốn theo đường uốn cong bằng Put on Path).',
        suggestedAnswerEn: '1) Master object path operations (converting primitives to paths and node adjustments); 2) Draw and manipulate paths to sculpt desired curves (Pen tool and Edit paths by nodes); 3) Create and format typography (placing kinetic text along curved paths using Put on Path).',
        pedagogicalTipVi: 'Cho học sinh xoay mô hình 3D Three.js và bấm thử 3 chế độ (Điêu khắc đường cong Bézier 3D, Chữ uốn lượn 3D, Dải cờ & lá cây 3D).',
        pedagogicalTipEn: 'Direct students to manipulate the Three.js 3D viewer across all 3 modes (3D Bézier Curve Sculptor, 3D Kinetic Text on Path, 3D Leaf & Banners).'
      },
      {
        id: 'p14-0-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Trong phần Khởi động trang 75: Cần ít nhất bao nhiêu điểm để xác định một đường thẳng? Đường parabol? Một đoạn cong Bézier?',
        questionEn: 'In the warm-up question on Page 75: How many points are required to uniquely define a straight line? A parabola? A cubic Bézier curve segment?',
        suggestedAnswerVi: 'Đường thẳng cần ít nhất 2 điểm phân biệt; Đường parabol cần ít nhất 3 điểm (1 đỉnh và 2 điểm đối xứng qua trục); Một đoạn cong Bézier bậc 3 chuẩn trong đồ họa vector cần 4 điểm (2 điểm mút đầu cuối P0, P3 và 2 điểm điều khiển P1, P2).',
        suggestedAnswerEn: 'A straight line requires at least 2 points; A parabola needs at least 3 points; A standard cubic Bézier segment in vector graphics requires 4 points (2 endpoints P0, P3 and 2 control handle points P1, P2).',
        pedagogicalTipVi: 'Cho học sinh tương tác với hộp so sánh hình học trong bài để kiểm chứng số điểm tối thiểu của từng loại đường.',
        pedagogicalTipEn: 'Prompt students to interact with the geometry comparator widget on screen to verify minimum control point counts.'
      }
    ]
  },
  1: {
    sectionId: 'bai-14-lam-quen-doi-tuong-duong',
    sectionTitleVi: '1. Làm quen với đối tượng dạng đường (Trang 75 – 76 SGK)',
    sectionTitleEn: '1. Introduction to Path Objects & Pen Tool (Pages 75 – 76)',
    prompts: [
      {
        id: 'p14-1-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Dựa vào Hoạt động 1 và Hình 14.1, 14.2 SGK, hãy phân biệt sự khác nhau giữa đối tượng hình khối và đối tượng tự do dạng đường?',
        questionEn: 'Based on Activity 1 and Figures 14.1 & 14.2, contrast primitive shape objects with freeform path objects?',
        suggestedAnswerVi: 'Hình khối được định nghĩa sẵn bởi các quy luật toán học chặt chẽ (khi chỉnh một góc bo thì cả 4 góc đều đổi đồng loạt và giữ nguyên đặc trưng khối chữ nhật). Đối tượng đường là tổ hợp tự do của các đoạn thẳng/đoạn cong nối với nhau, cho phép chỉnh sửa từng điểm nút và từng đoạn hoàn toàn độc lập để tạo hình thù bất kỳ.',
        suggestedAnswerEn: 'Primitive shapes are constrained by rigid geometric rules (rounding one corner updates all corners symmetrically). Freeform paths consist of joined independent line and curve segments where individual nodes can be manipulated freely into organic shapes.',
        pedagogicalTipVi: 'Cho học sinh tương tác với hộp kéo thả điểm neo 2D để thấy cách chuyển đổi từ hình chữ nhật sang hình lượn sóng tự do.',
        pedagogicalTipEn: 'Have students drag the 2D Bézier sandbox handles to experience transforming a rigid box into an arbitrary organic contour.'
      },
      {
        id: 'p14-1-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Nêu 4 bước vẽ đối tượng đường bằng công cụ Pen (Shift + F6) và giải thích câu hỏi củng cố: Để vẽ hình chữ nhật bo tròn góc, ta nên dùng công cụ Rectangles hay Pen?',
        questionEn: 'State the 4 steps to draw path objects with the Pen tool (Shift+F6) and answer the checkpoint: Should we use Rectangles or Pen for a rounded rectangle?',
        suggestedAnswerVi: '4 bước: 1. Chọn Pen (Shift+F6); 2. Chọn kiểu tạo đường cong; 3. Nháy chuột/kéo thả đặt các điểm neo; 4. Nhấn Enter hoặc nháy đúp tại neo cuối. Để vẽ HCN bo tròn góc, nên dùng công cụ Rectangles (F4) rồi kéo chốt tròn (hoặc chỉnh Rx, Ry) vì nhanh, chuẩn xác và đối xứng hoàn hảo hơn dùng Pen.',
        suggestedAnswerEn: '4 steps: 1. Select Pen (Shift+F6); 2. Set curve mode; 3. Click/drag anchor points; 4. Press Enter or double-click last node. For rounded rectangles, use Rectangles (F4) with Rx/Ry because it is mathematically exact, faster, and perfectly symmetrical compared to drawing manually with Pen.',
        pedagogicalTipVi: 'Nhấn mạnh nguyên tắc: Dùng công cụ hình khối có sẵn khi vẽ hình kỷ hà chuẩn, chỉ dùng Pen khi vẽ nét tự do hoặc uốn lượn đặc thù.',
        pedagogicalTipEn: 'Reinforce rule of thumb: Prefer primitive tools for standard geometric shapes; use Pen for freehand, organic, or custom contour paths.'
      }
    ]
  },
  2: {
    sectionId: 'bai-14-tinh-chinh-duong-node',
    sectionTitleVi: '2. Sử dụng công cụ tinh chỉnh đường (Trang 76 – 77 SGK)',
    sectionTitleEn: '2. Fine-Tuning Paths with the Node Tool (Pages 76 – 77)',
    prompts: [
      {
        id: 'p14-2-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Phân biệt điểm neo trơn (smooth node) và điểm neo góc (corner node) về hình dáng hiển thị và đặc điểm của 2 đường chỉ hướng (Hình 14.4 & 14.5 SGK)?',
        questionEn: 'Differentiate smooth nodes from corner nodes regarding on-canvas shapes and tangent handle alignments (Figures 14.4 & 14.5)?',
        suggestedAnswerVi: 'Điểm neo trơn (thể hiện bởi hình vuông hoặc hình tròn) có hai đường chỉ hướng luôn cùng phương nằm trên một đường thẳng đối đỉnh (khi xoay một bên thì bên kia xoay ngược lại), giúp đường cong trơn mịn. Điểm neo góc (thể hiện bởi hình thoi) có hai đường chỉ hướng hoạt động độc lập không cùng phương, tạo thành góc gấp khúc nhọn.',
        suggestedAnswerEn: 'Smooth nodes (represented as squares or circles) have two collinear tangent handles locked on a single line (rotating one handle rotates the other), maintaining smooth curvature. Corner nodes (diamonds) have independent non-collinear handles, creating sharp kinks or cusps.',
        pedagogicalTipVi: 'Cho học sinh bấm chuyển đổi giữa Điểm neo trơn và Điểm neo góc trên mô hình trái tim tương tác.',
        pedagogicalTipEn: 'Prompt students to toggle between smooth and corner node modes on the interactive heart model to witness handle decoupling.'
      },
      {
        id: 'p14-2-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Quan sát thanh điều khiển thuộc tính điểm neo (Hình 14.6 SGK), hãy nêu công dụng của lệnh Path -> Object to Path (Shift+Ctrl+C) và trả lời câu hỏi củng cố Hình 14.7?',
        questionEn: 'Observing the node control bar (Figure 14.6), explain Path -> Object to Path (Shift+Ctrl+C) and resolve checkpoint Figure 14.7?',
        suggestedAnswerVi: 'Lệnh Path -> Object to Path (Shift+Ctrl+C) biến đổi một hình khối định nghĩa sẵn (chữ nhật, elip, đa giác) thành đối tượng đường tự do để có thể kéo thả từng điểm neo bằng công cụ F2. Trong Hình 14.7: Có 3 đoạn cong; Các điểm ở giữa uốn mềm là neo trơn (hình vuông), điểm gập góc nhọn ở đầu mút là neo góc (hình thoi).',
        suggestedAnswerEn: 'Path -> Object to Path (Shift+Ctrl+C) converts geometric primitives into editable vector paths with freely manipulable nodes. In Figure 14.7: There are 3 curve segments; the smoothly arched middle nodes are smooth nodes (squares), and the sharp kink nodes are corner nodes (diamonds).',
        pedagogicalTipVi: 'Hướng dẫn học sinh nhận biết 8 nhóm nút lệnh trên thanh công cụ F2 mô phỏng trong ứng dụng.',
        pedagogicalTipEn: 'Guide students to identify the 8 button clusters on the simulated F2 Node tool control bar.'
      }
    ]
  },
  3: {
    sectionId: 'bai-14-doi-tuong-van-ban',
    sectionTitleVi: '3. Đối tượng văn bản & Uốn chữ theo đường (Trang 78 – 79 SGK)',
    sectionTitleEn: '3. Text Objects & Put on Path Typography (Pages 78 – 79)',
    prompts: [
      {
        id: 'p14-3-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Nêu tên và công dụng của 5 ô điều chỉnh cụm kí tự trên thanh điều khiển thuộc tính của công cụ Text (Hình 14.10 SGK trang 78)?',
        questionEn: 'Name and explain the functions of the 5 character adjustment inputs on the Text controls bar (Figure 14.10, Page 78)?',
        suggestedAnswerVi: '1) Khoảng cách giữa các kí tự (Letter spacing/Kerning); 2) Khoảng cách giữa các từ (Word spacing); 3) Độ dịch chuyển ngang kí tự (Horizontal kerning - dx); 4) Độ dịch chuyển dọc kí tự (Vertical shift - dy); 5) Độ nghiêng xoay của kí tự (Character rotation).',
        suggestedAnswerEn: '1) Spacing between letters (Kerning); 2) Spacing between words (Word spacing); 3) Horizontal kerning offset (dx); 4) Vertical character shift (dy); 5) Character rotation angle.',
        pedagogicalTipVi: 'Cho học sinh nhập thử từ "ĐIỆN NƯỚC" và kéo thanh trượt dx, dy, xoay chữ trong bộ giả lập Typography.',
        pedagogicalTipEn: 'Have students test typing "ĐIỆN NƯỚC" and tweaking dx, dy, and rotation sliders in the Typography simulator.'
      },
      {
        id: 'p14-3-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Để uốn một dòng chữ chạy theo một đường cong bất kỳ (hoặc đường viền hình tròn), ta sử dụng lệnh nào trong menu Text? Nêu cách hủy bỏ hiệu ứng này?',
        questionEn: 'To flow text along an arbitrary curve or circle circumference, which command in the Text menu is used? How do you revert it?',
        suggestedAnswerVi: 'Chọn đồng thời cả đối tượng văn bản và đối tượng đường, rồi vào bảng chọn Text -> Put on Path (Đặt chữ theo đường). Để hủy bỏ và đưa chữ trở lại dạng nằm ngang thẳng đứng bình thường, chọn đối tượng văn bản rồi vào Text -> Remove from Path.',
        suggestedAnswerEn: 'Select both the text object and the path simultaneously, then choose Text -> Put on Path. To revert the text back to a standard straight baseline, select the text and choose Text -> Remove from Path.',
        pedagogicalTipVi: 'Dẫn chứng câu hỏi củng cố trang 79: Khẳng định "Không thể tách chữ ra khỏi đường sau khi đã uốn" là sai vì có lệnh Remove from Path.',
        pedagogicalTipEn: 'Reference checkpoint question Page 79: Statement "Cannot detach text from path" is false because Text -> Remove from Path exists.'
      }
    ]
  },
  4: {
    sectionId: 'bai-14-thuc-hanh-ve-la-va-chu-uon-cong',
    sectionTitleVi: '4. Thực hành: Vẽ chiếc lá & Viết chữ uốn cong theo dải cờ (Trang 79 – 80 SGK)',
    sectionTitleEn: '4. Practical Lab: Leaf Drawing & Curved Banner Text (Pages 79 – 80)',
    prompts: [
      {
        id: 'p14-4-1',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Trong Nhiệm vụ 1 (vẽ chiếc lá Hình 14.11 & 14.12), hãy phân tích vai trò của lệnh Path -> Object to Path và thao tác xoá 2 điểm neo đối diện?',
        questionEn: 'In Task 1 (leaf drawing, Figs 14.11 & 14.12), analyze the role of Path -> Object to Path and deleting two opposing corners?',
        suggestedAnswerVi: 'Khởi đầu từ một hình chữ nhật, lệnh Path -> Object to Path biến 4 góc thành 4 điểm neo tự do. Khi chọn 2 điểm neo đối diện ở góc trên-phải và dưới-trái rồi nhấn nút Xoá điểm (Delete node), hình chữ nhật lập tức quy về dạng thoi nhọn 2 đầu mút. Sau đó chuyển 2 neo còn lại thành neo trơn để uốn cong thành mép cong mềm mại của phiến lá.',
        suggestedAnswerEn: 'Starting from a rectangle, Object to Path unlocks 4 corner nodes. Deleting two opposite corner nodes collapses the box into a 2-pointed diamond. Transforming the remaining 2 opposite nodes into smooth nodes creates the organic convex curvatures of a leaf.',
        pedagogicalTipVi: 'Cho học sinh bấm từng bước từ 1 đến 6 của Nhiệm vụ 1 trong trình mô phỏng tương tác để nắm chắc thao tác.',
        pedagogicalTipEn: 'Direct students to step through all 6 phases of Task 1 in the interactive step stepper.'
      },
      {
        id: 'p14-4-2',
        targetCognitiveLevel: 'Vận dụng cao',
        targetCognitiveLevelEn: 'Analyze',
        questionVi: 'Trong Nhiệm vụ 2 (viết chữ "CHÚC MỪNG NĂM MỚI!" trên dải cờ tiệc tùng Hình 14.13 & 14.14), tại sao sau khi áp dụng Put on Path ta không được xoá đường uốn lượn bên dưới?',
        questionEn: 'In Task 2 (festive banner "CHÚC MỪNG NĂM MỚI!", Figs 14.13 & 14.14), why must you not delete the guide curve after Put on Path?',
        suggestedAnswerVi: 'Vì văn bản uốn lượn vẫn liên kết phụ thuộc với đường dẫn (path guide). Nếu xoá đường dẫn, dòng chữ sẽ lập tức mất khuôn dạng cong và quay về đường thẳng. Nếu không muốn nhìn thấy đường dẫn trên bản thiết kế hoàn thiện, ta chỉ cần bỏ màu viền (Stroke paint = No paint / ô X) chứ không xoá đối tượng đường.',
        suggestedAnswerEn: 'Because text on path maintains a dynamic parametric binding to the path geometry. Deleting the path abruptly collapses the text back to a flat line. To hide the guide path, set Stroke to No paint (transparent) instead of deleting it.',
        pedagogicalTipVi: 'Nhấn mạnh thủ thuật đồ họa chuyên nghiệp: "Ẩn nét chứ không xoá đối tượng" khi dùng đường dẫn làm xương sống định vị.',
        pedagogicalTipEn: 'Emphasize the professional technique: "Hide stroke, do not delete guide" when paths serve as structural skeletons.'
      }
    ]
  },
  5: {
    sectionId: 'bai-14-luyen-tap-van-dung',
    sectionTitleVi: '5. Luyện tập & Vận dụng sáng tạo (Trang 81 SGK)',
    sectionTitleEn: '5. Practice & Creative Application (Page 81)',
    prompts: [
      {
        id: 'p14-5-1',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Trong bài Luyện tập 1 và Luyện tập 2 (trang 81 SGK), hãy trình bày các bước tạo dòng chữ uốn theo hình sóng lượn chữ S và cách biến đổi hình tròn thành quả táo?',
        questionEn: 'In Practice 1 and Practice 2 (Page 81), describe creating S-curve wave text and morphing a circle into an apple?',
        suggestedAnswerVi: 'LT1 (Sóng chữ S): Dùng Pen vẽ đường cong uốn lượn hình chữ S gồm 3-4 neo trơn; Gõ dòng chữ bằng Text tool; Chọn cả hai rồi Text -> Put on Path; Ẩn màu viền đường dẫn. LT2 (Quả táo): Vẽ hình tròn -> Path -> Object to Path; Chọn điểm neo trên cùng kéo lõm xuống và chuyển thành neo góc lõm; Kéo neo dưới lõm nhẹ lên; Vẽ thêm cuống táo và chiếc lá bằng kỹ thuật của Bài 14.',
        suggestedAnswerEn: 'Practice 1 (S-wave): Draw an S-shaped spline with Pen; type text; select both -> Text -> Put on Path; set path stroke to None. Practice 2 (Apple): Draw circle -> Object to Path; drag top node down into a cusp cleft; indent bottom node; add stem and leaf using Lesson 14 techniques.',
        pedagogicalTipVi: 'Cho học sinh tương tác với mô hình uốn chữ trực tiếp trong tab Luyện tập để xem phản hồi tức thì.',
        pedagogicalTipEn: 'Prompt students to test the S-curve typography generator live in the Practice sandbox.'
      },
      {
        id: 'p14-5-2',
        targetCognitiveLevel: 'Vận dụng cao',
        targetCognitiveLevelEn: 'Analyze',
        questionVi: 'Trong bài Vận dụng 1 (thiết kế huy hiệu logo trường học hình tròn có chữ uốn cong), làm thế nào để chữ nằm nửa trên uốn thuận chiều kim đồng hồ và chữ nửa dưới không bị lộn ngược đầu?',
        questionEn: 'In Application 1 (circular school crest emblem), how do you arrange top text clockwise and bottom text right-side up without being inverted?',
        suggestedAnswerVi: 'Sử dụng 2 đường tròn (hoặc 2 cung tròn) độc lập: Đường tròn thứ nhất cho chữ phía trên (chữ uốn thuận tự nhiên). Đường tròn thứ hai cho chữ phía dưới: Sau khi gán Put on Path, dùng lệnh lật đối xứng (Flip horizontally/vertically) hoặc điều chỉnh thông số dịch dọc dy âm để chữ đảo vào bên trong và đứng thẳng thuận mắt người đọc.',
        suggestedAnswerEn: 'Use 2 concentric circles or arcs: The top arc hosts the header text naturally. The bottom arc uses horizontal/vertical flipping and negative dy baseline shifting so bottom text renders upright instead of upside down.',
        pedagogicalTipVi: 'Khuyến khích học sinh làm bài kiểm tra trắc nghiệm 10 câu để đánh giá toàn diện năng lực và nhận Chứng chỉ thiết kế đồ hoạ số KNTT10-B14.',
        pedagogicalTipEn: 'Encourage students to complete the 10-question evaluation to earn digital credential KNTT10-B14.'
      }
    ]
  }
};

// -------------------------------------------------------------
// BÀI 15: HOÀN THIỆN HÌNH ẢNH ĐỒ HOẠ (Trang 82 – 85 SGK)
// -------------------------------------------------------------
export const TEACHER_PROMPTS_LESSON_15: Record<number, SectionTeacherPrompts> = {
  // Trang 0: Khởi động & Mục tiêu bài học (Trang 82)
  0: {
    sectionId: 'muc-tieu-khoi-dong',
    sectionTitleVi: 'Khởi động & Phân tích cấu trúc tờ rơi (Hình 15.1)',
    sectionTitleEn: 'Objectives & Warm-up: Flyer Decomposition (Fig 15.1)',
    prompts: [
      {
        id: 'p15-0-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Sau bài học này, em sẽ có khả năng tự tạo ra những sản phẩm đồ họa ứng dụng thực tế nào?',
        questionEn: 'After completing this lesson, what real-world applied graphic products will you be able to produce?',
        suggestedAnswerVi: 'Học sinh nêu các sản phẩm số thiết thực: thiết kế logo, biểu trưng, tạo banner quảng cáo, băng rôn, áp phích, poster sự kiện và thiệp chúc mừng.',
        suggestedAnswerEn: 'Students identify practical digital artifacts: designing logos, promotional banners, event posters, flyers, and celebratory greeting cards.',
        pedagogicalTipVi: 'Nhấn mạnh đây là bài thực hành tổng hợp tích hợp toàn bộ kiến thức của Chủ đề 4: vẽ hình khối, màu tô chuyển sắc, đường cong Bézier, phép ghép đối tượng và xử lý văn bản.',
        pedagogicalTipEn: 'Emphasize that this is an integrative capstone practical project combining primitives, gradient fills, Bézier paths, booleans, and typography.'
      },
      {
        id: 'p15-0-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Khi quan sát mẫu tờ rơi "Hội sách Hà Nội" ở Hình 15.1, em hãy liệt kê 6 nhóm đối tượng cấu thành nên bản vẽ hoàn chỉnh?',
        questionEn: 'Examining the "Hanoi Book Fair" flyer model in Fig 15.1, what are the 6 constituent object groups forming the complete composition?',
        suggestedAnswerVi: '6 nhóm đối tượng gồm: (1) Nền tờ rơi với mép răng cưa hai màu; (2) Dây cờ tam giác trang trí phía trên; (3) Sách và giá sách; (4) Các đoạn văn bản thông tin; (5) Hai hộp thoại bong bóng ("Vào cửa tự do", "Giảm giá tới 70%"); (6) Đoạn nét đứt làm vách ngăn giữa thời gian và địa điểm.',
        suggestedAnswerEn: 'The 6 constituent object groups are: (1) Two-tone backdrop with sawtooth divider; (2) Decorative triangle bunting banner; (3) Books and bookshelf; (4) Textual information blocks; (5) Two speech bubble callouts; (6) Vertical dashed separator line between time and venue.',
        pedagogicalTipVi: 'Yêu cầu học sinh mở Mô phỏng 3D tách lớp (Exploded View) để trực quan hóa thứ tự các lớp từ Z-index thấp nhất đến cao nhất.',
        pedagogicalTipEn: 'Direct students to interact with the 3D Exploded Layer Assembly viewer to visualize layering order and Z-index depth.'
      }
    ]
  },

  // Trang 1: Nhiệm vụ 1 & 2: Vẽ nền & Dây cờ tam giác (Trang 82 - 83)
  1: {
    sectionId: 've-nen-day-co',
    sectionTitleVi: 'Nhiệm vụ 1 & 2: Vẽ nền & Dây cờ tam giác (Hình 15.2 & 15.3)',
    sectionTitleEn: 'Tasks 1 & 2: Canvas Backdrop & Triangle Bunting (Fig 15.2 & 15.3)',
    prompts: [
      {
        id: 'p15-1-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Tại sao trong Nhiệm vụ 1, ta cần dùng lệnh Union cho dãy tam giác trước khi thực hiện lệnh Difference với hình chữ nhật màu xanh?',
        questionEn: 'In Task 1, why must we execute Union across the triangle chain before applying Difference with the cyan rectangle?',
        suggestedAnswerVi: 'Vì lệnh Difference (Ctrl + -) trong Inkscape chỉ tác dụng giữa đúng hai đối tượng đường (đối tượng cắt nằm trên và đối tượng bị cắt nằm dưới). Nếu các tam giác chưa được Union gộp thành một đường duy nhất, Difference sẽ chỉ cắt được một tam giác đơn lẻ.',
        suggestedAnswerEn: 'Because Difference (Ctrl + -) operates strictly between two path objects (top cutter and bottom canvas). Union fuses the multiple triangles into a single compound path so the entire sawtooth edge is carved simultaneously.',
        pedagogicalTipVi: 'Nhắc học sinh quy tắc: Luôn nhân bản (Duplicate) một dãy tam giác dự phòng trước khi Union để tái sử dụng cho Nhiệm vụ 2 làm dây cờ.',
        pedagogicalTipEn: 'Remind students of the textbook tip: Always Duplicate a spare triangle chain before Union to reuse for Task 2 bunting banner.'
      },
      {
        id: 'p15-1-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Trong Nhiệm vụ 2, thao tác Group -> co dãn -> Ungroup mang lại lợi ích gì khi xử lý dãy cờ tam giác?',
        questionEn: 'In Task 2, what advantage does the Group -> scale -> Ungroup workflow offer when managing the triangle bunting?',
        suggestedAnswerVi: 'Nhóm (Group) giúp co dãn đồng loạt tất cả các lá cờ tam giác cùng tỉ lệ cho vừa khít mép trên tờ rơi mà không bị xô lệch khoảng cách; sau đó rã nhóm (Ungroup) để có thể chọn từng lá cờ riêng lẻ và tô các màu sắc xen kẽ sinh động.',
        suggestedAnswerEn: 'Grouping scales all triangle pennants uniformly to fit the canvas width without altering spacing; Ungrouping subsequently enables selecting each individual triangle to assign varied vibrant colors.',
        pedagogicalTipVi: 'Cho học sinh đổi thử màu sắc từng lá cờ trên trình mô phỏng tương tác để hiểu rõ nguyên lý rã nhóm.',
        pedagogicalTipEn: 'Have students recolor individual pennants in the interactive canvas to reinforce the ungrouping principle.'
      }
    ]
  },

  // Trang 2: Nhiệm vụ 3: Sách & Giá sách (Trang 83 - 84)
  2: {
    sectionId: 've-sach-gia-sach',
    sectionTitleVi: 'Nhiệm vụ 3: Vẽ sách gáy cong 3D & Giá sách (Hình 15.4)',
    sectionTitleEn: 'Task 3: 3D Curved Book Spine & Bookshelf (Fig 15.4)',
    prompts: [
      {
        id: 'p15-2-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Để tạo cảm giác gáy sách có độ cong tròn 3D như thật, tác giả SGK đã sử dụng thủ thuật đồ họa nào ở mép rìa?',
        questionEn: 'To create the realistic optical illusion of a rounded 3D book spine, what graphic shading technique does the textbook employ?',
        suggestedAnswerVi: 'Tác giả thêm một hình chữ nhật hẹp chạy dọc mép rìa ngoài của gáy sách và tô màu chuyển sắc (gradient) sao cho mép ngoài cùng đậm hơn và chuyển dần vào màu thân sách ở bên trong. Hiệu ứng tối sáng này đánh lừa thị giác tạo độ cong tròn 3 chiều.',
        suggestedAnswerEn: 'A narrow vertical strip is placed along the outer spine edge with a gradient fill shading from a darker tone on the rim to the book’s base color inwards, rendering a cylindrical shadow illusion.',
        pedagogicalTipVi: 'Cho học sinh quan sát mẫu gáy sách trong tab tương tác 3D để xoay và thấy góc nhìn lập thể chân thực.',
        pedagogicalTipEn: 'Direct students to examine the 3D book model in the viewer to view cylindrical highlights and bevel edges interactively.'
      },
      {
        id: 'p15-2-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Khi sắp xếp các quyển sách lên giá nằm ngang, cần chú ý kỹ thuật gì để bố cục trông tự nhiên, không bị cứng nhắc?',
        questionEn: 'When arranging multiple books on the wooden horizontal shelf, what design technique ensures an organic, natural appearance?',
        suggestedAnswerVi: 'Nhân bản (Duplicate) sách và thay đổi kích thước chiều cao/bề dày, đổi màu sắc gáy sách và vạch trang trí, đồng thời xoay nghiêng một vài quyển tựa vào nhau để tạo nhịp điệu sinh động.',
        suggestedAnswerEn: 'Duplicate books and vary heights, widths, and spine colors/motifs; rotate a few books at slight tilt angles leaning against adjacent volumes to create dynamic visual rhythm.',
        pedagogicalTipVi: 'Yêu cầu học sinh nhóm (Group) toàn bộ cụm sách và giá trước khi đặt vào nền chung để tránh thất lạc các chi tiết nhỏ.',
        pedagogicalTipEn: 'Prompt students to group the shelf and books together before positioning them onto the flyer canvas.'
      }
    ]
  },

  // Trang 3: Nhiệm vụ 4, 5, 6: Văn bản, Bóng thoại & Vách ngăn (Trang 84)
  3: {
    sectionId: 'dinh-dang-van-ban-bong-hoi-thoai-vach-ngan',
    sectionTitleVi: 'Nhiệm vụ 4, 5, 6: Văn bản, Bóng hội thoại & Vách ngăn nét đứt (Hình 15.5 - 15.7)',
    sectionTitleEn: 'Tasks 4, 5, 6: Typography, Speech Bubbles & Dashed Stroke (Fig 15.5 - 15.7)',
    prompts: [
      {
        id: 'p15-3-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Tại sao các đoạn văn bản (Tiêu đề, Thời gian, Địa điểm, Khuyến mại) nên được nhập thành các khối chữ độc lập thay vì một đoạn văn bản duy nhất?',
        questionEn: 'Why should text elements (Headline, Schedule, Venue, Discounts) be keyed in as independent text objects rather than a single text block?',
        suggestedAnswerVi: 'Nhập độc lập giúp người thiết kế dễ dàng di chuyển, đổi phông chữ, chỉnh cỡ chữ to nhỏ theo phân cấp thị giác (visual hierarchy), đổi màu sắc và sắp xếp vào các vị trí khác nhau trên bố cục mà không làm ảnh hưởng đến các khối chữ khác.',
        suggestedAnswerEn: 'Independent text objects allow granular control over font sizes for visual hierarchy, individualized positioning, and distinct color schemes without affecting neighboring copy.',
        pedagogicalTipVi: 'Giải thích nguyên tắc phân cấp thị giác trong thiết kế: Tiêu đề chính to nhất, thông tin phụ trợ nhỏ hơn và gọn gàng.',
        pedagogicalTipEn: 'Explain typographic hierarchy: Major headings demand primary scale, while logistical details remain concise.'
      },
      {
        id: 'p15-3-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Trình bày cách vẽ bóng hội thoại (speech bubble) và cách vẽ vách ngăn nét đứt giữa thời gian và địa điểm theo SGK trang 84?',
        questionEn: 'Explain how to construct a speech bubble and draw the dashed divider between time and venue per textbook page 84?',
        suggestedAnswerVi: 'Bóng hội thoại: Vẽ hình elip và hình tam giác, xếp chồng tam giác chỉ hướng vào mép elip rồi chọn Path / Union (Ctrl + +) để hàn liền. Vách ngăn nét đứt: Dùng bút Pen vẽ đoạn thẳng đứng, mở hộp thoại Fill and Stroke -> chọn tab Stroke style -> đặt Width = 1.000 mm và chọn kiểu nét đứt trong danh sách Dashes.',
        suggestedAnswerEn: 'Speech bubble: Draw an ellipse and a small triangle, overlap them at the desired pointer orientation, and apply Path / Union (Ctrl + +). Dashed divider: Draw a vertical line with Pen, open Fill and Stroke -> Stroke style, set Width = 1.000 mm and select a dashed dash pattern from the Dashes dropdown.',
        pedagogicalTipVi: 'Cho học sinh điều chỉnh trực tiếp thanh trượt Dashes trong tab mô phỏng để thấy thay đổi thời gian thực.',
        pedagogicalTipEn: 'Guide students to manipulate the stroke dashed slider in the interactive widget to see live rendering changes.'
      }
    ]
  },

  // Trang 4: Nhiệm vụ 7: Xuất tệp ảnh PNG & Thiết lập DPI (Trang 85)
  4: {
    sectionId: 'xuat-anh-png-dpi',
    sectionTitleVi: 'Nhiệm vụ 7: Xuất tệp ảnh PNG & Thiết lập DPI (Hình 15.8)',
    sectionTitleEn: 'Task 7: Exporting Raster PNG & DPI Calibration (Fig 15.8)',
    prompts: [
      {
        id: 'p15-4-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Nêu phím tắt mở hộp thoại Export PNG Image trong Inkscape và phân biệt ý nghĩa giữa 2 vùng xuất Page và Selection?',
        questionEn: 'State the shortcut to open Inkscape’s Export PNG Image dialog and distinguish between Page and Selection export areas?',
        suggestedAnswerVi: 'Phím tắt là Shift + Ctrl + E. Vùng "Page" xuất toàn bộ kích thước của trang in tiêu chuẩn (kể cả phần trắng thừa). Vùng "Selection" chỉ xuất duy nhất các đối tượng đang được chọn bằng chuột và lưu kèm kênh trong suốt (Alpha channel).',
        suggestedAnswerEn: 'Shortcut is Shift + Ctrl + E. "Page" renders the full predefined canvas bounds including whitespace margins. "Selection" crops strictly to the bounding box of highlighted objects with an alpha transparent background.',
        pedagogicalTipVi: 'Cho học sinh thử nghiệm 4 chế độ vùng xuất trong phòng thí nghiệm tương tác (Export Raster Lab).',
        pedagogicalTipEn: 'Encourage students to test all 4 export area options in the Export Raster Lab.'
      },
      {
        id: 'p15-4-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Tại sao khi chuẩn bị tệp ảnh để in ấn tờ rơi, SGK khuyến nghị chọn độ phân giải từ 200 đến 300 dpi thay vì 96 dpi?',
        questionEn: 'Why does the textbook recommend selecting 200 to 300 dpi resolution instead of 96 dpi when exporting flyers for physical printing?',
        suggestedAnswerVi: 'Màn hình máy tính thường chỉ cần 96 dpi để hiển thị rõ, nhưng máy in vật lý đòi hỏi mật độ điểm ảnh dày từ 200–300 dpi (dots per inch) để các hạt mực in ra mịn màng, chữ nhỏ và các đường nét không bị vỡ hạt hay mờ nhòe.',
        suggestedAnswerEn: 'Screen displays look clear at 96 dpi, but physical printing presses require high dot density (200–300 dpi) to ensure crisp typography, sharp vector edges, and smooth color ink gradations without pixelation.',
        pedagogicalTipVi: 'Dẫn dắt học sinh tính toán: Khi tăng từ 96 dpi lên 300 dpi, kích thước pixel của ảnh tăng hơn 3 lần, làm tệp ảnh sắc nét hơn đáng kể.',
        pedagogicalTipEn: 'Guide students to observe how increasing from 96 dpi to 300 dpi multiplies pixel dimensions by over 3x, greatly enhancing sharpness.'
      }
    ]
  },

  // Trang 5: Luyện tập, Vận dụng & Đánh giá năng lực (Trang 85)
  5: {
    sectionId: 'luyen-tap-van-dung-chung-chi',
    sectionTitleVi: 'Luyện tập, Vận dụng & Đánh giá năng lực (Hình 15.9 & 15.10)',
    sectionTitleEn: 'Practice, Application & Credential Assessment (Fig 15.9 & 15.10)',
    prompts: [
      {
        id: 'p15-5-1',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Trong bài Luyện tập 1 (thiệp chúc mừng sinh nhật) và Vận dụng (bãi biển mùa hè), em đã vận dụng kết hợp những công cụ nào của Inkscape?',
        questionEn: 'In Practice 1 (birthday card) and Application (summer beach scene), which combined Inkscape tools did you utilize?',
        suggestedAnswerVi: 'Luyện tập 1 kết hợp: Hình elip + tam giác (bóng bay), Pen đường cong Bézier (dải ruy băng), Text tool (chữ Happy Birthday). Vận dụng kết hợp: Pen vẽ sóng biển Bézier uốn lượn nhiều tầng, nan tam giác xoay quanh tâm (ô che nắng), hình tròn cắt cung sọc màu (bóng bãi biển 3D).',
        suggestedAnswerEn: 'Practice 1 combines Ellipse + Triangle (balloons), Pen Bézier curves (ribbons), Text tool (typography). Application combines Pen Bézier waves, radial rotated wedges (parasol), and striped spheres (3D beach ball).',
        pedagogicalTipVi: 'Khuyến khích học sinh thỏa sức sáng tạo màu sắc và bố cục theo sở thích cá nhân.',
        pedagogicalTipEn: 'Encourage students to personalize color palettes and diorama layouts creatively.'
      },
      {
        id: 'p15-5-2',
        targetCognitiveLevel: 'Vận dụng cao',
        targetCognitiveLevelEn: 'Analyze',
        questionVi: 'Hãy đánh giá vai trò của định dạng vector gốc (.svg) so với định dạng bitmap (.png) trong quy trình thiết kế chuyên nghiệp?',
        questionEn: 'Evaluate the role of the master vector format (.svg) compared to the raster output (.png) in professional design workflows?',
        suggestedAnswerVi: 'Tệp SVG là tệp nguồn lưu trữ đầy đủ các đối tượng, lớp, màu tô và đường nét độc lập, cho phép chỉnh sửa vô hạn mà không suy giảm chất lượng. Tệp PNG là thành phẩm xuất cuối cùng (đã làm phẳng), dùng để phân phối đa nền tảng, in ấn hoặc đưa lên web.',
        suggestedAnswerEn: 'The SVG file serves as the master source preserving editable layers, paths, and vectors losslessly. The exported PNG is the flattened publication artifact ready for web distribution, presentation embedding, or physical printing.',
        pedagogicalTipVi: 'Động viên học sinh làm bài trắc nghiệm 10 câu để hoàn thành xuất sắc chứng chỉ KNTT10-B15.',
        pedagogicalTipEn: 'Motivate students to take the 10-question quiz to earn digital certification KNTT10-B15.'
      }
    ]
  }
};

// -------------------------------------------------------------
// BÀI 16: NGÔN NGỮ LẬP TRÌNH BẬC CAO VÀ PYTHON (Trang 86 – 90 SGK)
// -------------------------------------------------------------
export const TEACHER_PROMPTS_LESSON_16: Record<number, SectionTeacherPrompts> = {
  // Trang 0: Khởi động & Mục tiêu bài học (Trang 86)
  0: {
    sectionId: 'muc-tieu-khoi-dong',
    sectionTitleVi: 'Khởi động & So sánh 3 cấp độ ngôn ngữ (Hình 16.1)',
    sectionTitleEn: 'Objectives & Warm-up: 3 Language Tiers (Fig 16.1)',
    prompts: [
      {
        id: 'p16-0-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Khi quan sát Hình 16.1 (trang 86 SGK), câu lệnh viết bằng ngôn ngữ nào dễ hiểu nhất đối với con người? Vì sao?',
        questionEn: 'Observing Figure 16.1 (page 86), which language statement is easiest for humans to understand? Why?',
        suggestedAnswerVi: 'Câu lệnh viết bằng ngôn ngữ Python là dễ hiểu nhất vì các câu lệnh được viết bằng từ ngữ tiếng Anh thông dụng (input, print, range) và biểu thức toán học tự nhiên (s = s + a), thay vì các chuỗi số nhị phân 0-1 hay mã viết tắt hợp ngữ.',
        suggestedAnswerEn: 'Python statements are easiest because they use standard English words (input, print, range) and natural mathematical expressions (s = s + a), unlike binary 0s/1s or assembly mnemonics.',
        pedagogicalTipVi: 'Giáo viên hướng dẫn học sinh so sánh 3 đoạn mã cùng giải quyết 1 bài toán tính tổng để thấy rõ sự tiến hóa của ngôn ngữ lập trình.',
        pedagogicalTipEn: 'Direct students to compare how the exact same summation problem is authored across binary, assembly, and Python.'
      },
      {
        id: 'p16-0-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Sau khi học xong Bài 16, học sinh cần đạt được 3 yêu cầu cần đạt (mục tiêu) cốt lõi nào?',
        questionEn: 'After completing Lesson 16, which 3 core learning objectives must students achieve?',
        suggestedAnswerVi: '3 mục tiêu cốt lõi gồm: (1) Biết khái niệm ngôn ngữ lập trình bậc cao và ngôn ngữ lập trình bậc cao Python; (2) Phân biệt được chế độ gõ lệnh trực tiếp và chế độ soạn thảo chương trình trong môi trường Python; (3) Biết cách tạo và thực hiện một chương trình Python hoàn chỉnh.',
        suggestedAnswerEn: 'The 3 core objectives: (1) Grasp concepts of high-level languages and Python; (2) Distinguish between interactive mode and script mode in IDLE; (3) Know how to create, save, and execute a Python program.',
        pedagogicalTipVi: 'Khuyến khích học sinh mở Mô phỏng 3D tương tác để quan sát luồng biên dịch từ mã nguồn sang mã máy.',
        pedagogicalTipEn: 'Encourage students to inspect the 3D Compiler pipeline simulation to understand hardware translation.'
      }
    ]
  },

  // Trang 1: 1. Ngôn ngữ lập trình bậc cao & Python (Trang 86 – 87)
  1: {
    sectionId: 'ngon-ngu-bac-cao-python',
    sectionTitleVi: '1. Ngôn ngữ lập trình bậc cao & Python (Trang 86 – 87)',
    sectionTitleEn: '1. High-Level Programming Languages & Python (Pages 86–87)',
    prompts: [
      {
        id: 'p16-1-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Tại sao khi lập trình bằng ngôn ngữ bậc cao, máy tính lại bắt buộc phải có một "chương trình dịch" (compiler/interpreter)?',
        questionEn: 'Why does a computer strictly require a "translator program" (compiler/interpreter) when running high-level code?',
        suggestedAnswerVi: 'Vì phần cứng máy tính (vi xử lý CPU) chỉ có thể trực tiếp hiểu và thực thi các chỉ thị ở dạng ngôn ngữ máy (mã nhị phân gồm các số 0 và 1). Do đó, chương trình dịch đóng vai trò trung gian chuyển đổi các câu lệnh bậc cao gần với tiếng Anh sang mã nhị phân tương ứng.',
        suggestedAnswerEn: 'Because CPU hardware only understands binary machine instructions (0s and 1s). The translator program acts as an intermediary translating English-like high-level statements into binary opcodes.',
        pedagogicalTipVi: 'Lấy ví dụ so sánh: Chương trình dịch giống như một người phiên dịch viên ngoại giao dịch tiếng Việt sang ngôn ngữ của người đối thoại.',
        pedagogicalTipEn: 'Use an analogy: A compiler acts like an interpreter translating a diplomat\'s native speech into the listener\'s language.'
      },
      {
        id: 'p16-1-2',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Ai là người phát minh ra ngôn ngữ Python và nó được ra mắt vào năm nào? Nêu một số ưu điểm nổi bật của Python?',
        questionEn: 'Who invented Python and when was it released? What are some prominent advantages of Python?',
        suggestedAnswerVi: 'Python do Guido van Rossum (người Hà Lan) tạo ra và ra mắt năm 1991. Ưu điểm nổi bật: Cú pháp đơn giản, không phụ thuộc hệ điều hành (chạy trên PC, điện thoại, robot), mã nguồn mở, cộng đồng phát triển lớn, có thư viện phong phú về AI, phân tích dữ liệu, được dùng rộng rãi trong nghiên cứu và giáo dục.',
        suggestedAnswerEn: 'Python was created by Guido van Rossum (Netherlands) in 1991. Key advantages: clean syntax, cross-platform portability, open-source license, rich libraries for AI/data science, and global prominence in education.',
        pedagogicalTipVi: 'Nhấn mạnh tính đa năng của Python từ giáo dục phổ thông đến các tập đoàn công nghệ lớn như Google, NASA, OpenAI.',
        pedagogicalTipEn: 'Highlight Python\'s versatility from K-12 education to tech giants like Google, NASA, and OpenAI.'
      }
    ]
  },

  // Trang 2: 2. Môi trường lập trình Python (Trang 87 – 88)
  2: {
    sectionId: 'moi-truong-lap-trinh-python',
    sectionTitleVi: '2. Môi trường lập trình Python: Trực tiếp & Soạn thảo (Trang 87 – 88)',
    sectionTitleEn: '2. Python Programming Environment: Interactive vs Script (Pages 87–88)',
    prompts: [
      {
        id: 'p16-2-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Dấu nhắc lệnh `>>>` trong IDLE Shell có ý nghĩa gì? Nó có phải là con trỏ soạn thảo văn bản không?',
        questionEn: 'What does the `>>>` prompt signify in IDLE Shell? Is it identical to a text cursor?',
        suggestedAnswerVi: 'Dấu nhắc lệnh `>>>` là tín hiệu của môi trường Python báo rằng phần mềm đã sẵn sàng tiếp nhận câu lệnh trực tiếp từ người dùng. Nó KHÔNG phải là con trỏ soạn thảo (con trỏ là vạch thẳng nhấp nháy chỉ vị trí ký tự tiếp theo).',
        suggestedAnswerEn: 'The `>>>` prompt is Python\'s signal that it is ready to receive direct commands. It is NOT a text cursor (a cursor is the blinking bar indicating insertion position).',
        pedagogicalTipVi: 'Cho học sinh gõ thử vào ô nhập liệu interactive trong bài học để thấy dấu nhắc giữ nguyên và con trỏ di chuyển.',
        pedagogicalTipEn: 'Have students type into the interactive prompt in the applet to distinguish the fixed prompt from the cursor.'
      },
      {
        id: 'p16-2-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Khi nào ta nên dùng chế độ gõ lệnh trực tiếp và khi nào nên dùng chế độ soạn thảo chương trình?',
        questionEn: 'When should we use interactive mode versus script mode in practical programming?',
        suggestedAnswerVi: 'Dùng chế độ gõ lệnh trực tiếp khi cần tính toán nhanh, thử nghiệm từng câu lệnh hoặc kiểm tra cú pháp ngắn. Dùng chế độ soạn thảo khi cần viết chương trình hoàn chỉnh gồm nhiều dòng lệnh, cần lưu lại thành tệp (.py) để sử dụng nhiều lần hoặc chia sẻ cho người khác.',
        suggestedAnswerEn: 'Use interactive mode for quick calculations, experimenting with single statements, or debugging expressions. Use script mode for multi-line logic that must be saved (.py), reused, and distributed.',
        pedagogicalTipVi: 'Yêu cầu học sinh làm bài tập phân biệt 2 chế độ trong tab mô phỏng IDLE.',
        pedagogicalTipEn: 'Guide students to test both modes in the live IDLE simulator.'
      }
    ]
  },

  // Trang 3: 3. Một số lệnh Python đầu tiên (Trang 88 – 89)
  3: {
    sectionId: 'mot-so-lenh-dau-tien',
    sectionTitleVi: '3. Một số lệnh Python đầu tiên & Hàm print() (Trang 88 – 89)',
    sectionTitleEn: '3. First Python Commands & print() Function (Pages 88–89)',
    prompts: [
      {
        id: 'p16-3-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Python phân biệt các kiểu dữ liệu số nguyên (int), số thực (float) và xâu ký tự (str) như thế nào? Phép chia `/` luôn trả về kiểu dữ liệu gì?',
        questionEn: 'How does Python distinguish int, float, and str? What data type does the division operator `/` always produce?',
        suggestedAnswerVi: 'Python tự nhận biết kiểu dữ liệu: Số không có phần thập phân là số nguyên (int, ví dụ 5); số có dấu chấm thập phân là số thực (float, ví dụ 2.6); dãy ký tự đặt trong cặp nháy đơn hoặc nháy kép là xâu ký tự (str). Đặc biệt, phép toán chia thông thường `/` trong Python luôn luôn trả về kiểu số thực (float, ví dụ 5/2 cho kết quả 2.5).',
        suggestedAnswerEn: 'Python dynamically infers types: whole numbers are int (5), decimal numbers are float (2.6), and quoted text is str. The division operator `/` always evaluates to a float (e.g., 5/2 yields 2.5).',
        pedagogicalTipVi: 'Nhắc học sinh lưu ý: Dù chia hết (ví dụ 4/2), Python vẫn trả về số thực 2.0 chứ không phải số nguyên 2.',
        pedagogicalTipEn: 'Highlight to students that even exact division like 4/2 produces float 2.0 rather than integer 2.'
      },
      {
        id: 'p16-3-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Trình bày cú pháp của hàm `print()` và giải thích cách hiển thị khi truyền nhiều đối số cách nhau bằng dấu phẩy?',
        questionEn: 'Explain the syntax of `print()` and how multiple comma-separated arguments are rendered on screen?',
        suggestedAnswerVi: 'Cú pháp: `print(v1, v2, ..., vn)`. Hàm print đưa dữ liệu ra màn hình. Khi truyền nhiều đối số cách nhau bởi dấu phẩy, Python sẽ tự động tính toán giá trị của các biểu thức và in tất cả các giá trị trên cùng một dòng, ngăn cách giữa các giá trị bằng một dấu cách trống.',
        suggestedAnswerEn: 'Syntax: `print(v1, v2, ..., vn)`. Outputs arguments to console. When given multiple arguments separated by commas, Python evaluates expressions and outputs them on a single line separated by single spaces.',
        pedagogicalTipVi: 'Cho học sinh thử nghiệm trong phòng thí nghiệm Hàm print() để thay đổi các đối số và thấy kết quả trực tiếp.',
        pedagogicalTipEn: 'Prompt students to adjust inputs in the interactive print sandbox to observe space formatting.'
      }
    ]
  },

  // Trang 4: 4. Thực hành: Tạo & chạy Bai1.py (Trang 89 – 90)
  4: {
    sectionId: 'thuc-hanh-bai1-py',
    sectionTitleVi: '4. Thực hành: Tạo và chạy chương trình Bai1.py (Trang 89 – 90)',
    sectionTitleEn: '4. Practical Lab: Authoring and Running Bai1.py (Pages 89–90)',
    prompts: [
      {
        id: 'p16-4-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Ký tự `#` trong mã nguồn Python có ý nghĩa gì và chương trình dịch xử lý dòng có ký tự này như thế nào?',
        questionEn: 'What does the `#` character signify in Python source code and how does the interpreter handle it?',
        suggestedAnswerVi: 'Kí hiệu `#` là vị trí bắt đầu dòng chú thích lệnh (comment) của Python. Dòng chú thích dùng để giải thích ý nghĩa câu lệnh cho người đọc mã nguồn, và chương trình dịch sẽ hoàn toàn bỏ qua dòng này khi thực thi chương trình.',
        suggestedAnswerEn: 'The `#` symbol marks the beginning of a comment in Python. Comments explain logic to human developers and are completely ignored by the Python interpreter during execution.',
        pedagogicalTipVi: 'Tập cho học sinh thói quen viết chú thích rõ ràng ngay từ chương trình đầu tiên.',
        pedagogicalTipEn: 'Instill clean coding habits by encouraging clear comments starting from day one.'
      },
      {
        id: 'p16-4-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Nêu phím tắt để lưu tệp và phím tắt để chạy chương trình Python trong cửa sổ soạn thảo? Để thoát một phiên làm việc ta gõ lệnh gì?',
        questionEn: 'State the hotkeys to save and execute a script in IDLE. Which commands exit a Python session?',
        suggestedAnswerVi: 'Phím tắt lưu tệp: `Ctrl + S` (menu File / Save). Phím tắt chạy chương trình: `F5` (menu Run / Run Module). Để kết thúc phiên làm việc: nháy nút đóng [x] hoặc gõ lệnh `quit()` hoặc `exit()` rồi nhấn ENTER.',
        suggestedAnswerEn: 'Save hotkey: `Ctrl + S`. Run hotkey: `F5` (Run Module). Terminate session: click [x] close button or execute `quit()` or `exit()` at the prompt.',
        pedagogicalTipVi: 'Yêu cầu học sinh thực hành đầy đủ 6 bước trên trình mô phỏng IDE ảo.',
        pedagogicalTipEn: 'Ensure students walk through all 6 steps in the virtual IDE sandbox.'
      }
    ]
  },

  // Trang 5: 5. Luyện tập & Vận dụng (Trang 90)
  5: {
    sectionId: 'luyen-tap-van-dung-chung-chi',
    sectionTitleVi: '5. Luyện tập, Vận dụng & Đánh giá năng lực (Trang 90)',
    sectionTitleEn: '5. Practice, Application & Credential Assessment (Page 90)',
    prompts: [
      {
        id: 'p16-5-1',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Tại sao câu lệnh `>>> 3 + * 5` và `>>> "Bạn là học sinh, bạn tên là "Nguyễn Việt Anh""` lại bị báo lỗi SyntaxError? Hãy sửa lại cho đúng?',
        questionEn: 'Why do statements `>>> 3 + * 5` and nested quotes trigger SyntaxError? Provide correct revisions?',
        suggestedAnswerVi: 'Lệnh 1 lỗi vì hai toán tử số học (+ *) đứng liền nhau không có toán hạng; sửa thành `3 + 5` hoặc `3 * 5`. Lệnh 2 lỗi vì dấu ngoặc kép lồng nhau khiến Python hiểu chuỗi kết thúc ở chữ "là "; sửa thành dùng dấu nháy đơn bao ngoài: `\'Bạn là học sinh, bạn tên là "Nguyễn Việt Anh"\'`.',
        suggestedAnswerEn: 'Statement 1 fails due to consecutive operators without an operand; fix: `3 + 5` or `3 * 5`. Statement 2 fails due to conflicting unescaped double quotes; fix: enclose with single quotes: `\'Bạn là học sinh, bạn tên là "Nguyễn Việt Anh"\'`.',
        pedagogicalTipVi: 'Nhấn mạnh quy tắc quy định xâu: Nếu bên trong xâu có nháy kép thì bên ngoài dùng nháy đơn, và ngược lại.',
        pedagogicalTipEn: 'Reinforce quoting rules: If internal text contains double quotes, wrap with single quotes, and vice-versa.'
      },
      {
        id: 'p16-5-2',
        targetCognitiveLevel: 'Vận dụng cao',
        targetCognitiveLevelEn: 'Analyze',
        questionVi: 'Trong bài Vận dụng 1 và 2 (trang 90 SGK), xâu ba dấu nháy kép `"""..."""` có ưu điểm gì và làm thế nào để in bảng cửu chương nhân trong phạm vi 10?',
        questionEn: 'In Applications 1 and 2 (page 90), what advantage do triple quotes offer, and how do you print a multiplication table up to 10?',
        suggestedAnswerVi: 'Xâu ba dấu nháy kép `"""..."""` cho phép viết xâu nhiều dòng và giữ nguyên các dấu xuống dòng khi gõ Enter mà không cần ký tự đặc biệt \\n (rất tiện để in thơ hay văn bản dài). Để in bảng cửu chương nhân (ví dụ bảng 9), ta dùng vòng lặp `for i in range(1, 11): print("9 x", i, "=", 9 * i)`.',
        suggestedAnswerEn: 'Triple quotes `"""..."""` allow native multi-line strings preserving Enter linebreaks without explicit \\n escapes (ideal for poems). A multiplication table uses a loop: `for i in range(1, 11): print(k, "x", i, "=", k * i)`.',
        pedagogicalTipVi: 'Khích lệ học sinh hoàn thành bài kiểm tra 10 câu để nhận chứng chỉ lập trình số KNTT10-B16.',
        pedagogicalTipEn: 'Motivate students to complete the 10-question evaluation to claim verified credential KNTT10-B16.'
      }
    ]
  }
};

// -------------------------------------------------------------
// BÀI 17: BIẾN VÀ LỆNH GÁN (Trang 91 – 96 SGK)
// -------------------------------------------------------------
export const TEACHER_PROMPTS_LESSON_17: Record<number, SectionTeacherPrompts> = {
  // Trang 0: Mục tiêu & Khởi động (Trang 91)
  0: {
    sectionId: 'muc-tieu-khoi-dong-bien-lenh-gan',
    sectionTitleVi: 'Mục tiêu & Khởi động bài học (Trang 91)',
    sectionTitleEn: 'Lesson 17 Objectives & Warm-up (Page 91)',
    prompts: [
      {
        id: 'p17-0-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Dựa vào phần mục tiêu (trang 91 SGK), sau bài học này em sẽ nắm được những năng lực cốt lõi nào?',
        questionEn: 'Based on the objectives on page 91, what core competencies will you achieve after this lesson?',
        suggestedAnswerVi: '1) Biết cách thiết lập biến và phân biệt được biến với từ khoá; 2) Biết sử dụng lệnh gán và thực hiện các phép toán trên kiểu số nguyên, số thực và xâu kí tự.',
        suggestedAnswerEn: '1) Know how to create variables and distinguish them from keywords; 2) Know how to use assignment statements and compute operations across integers, floats, and strings.',
        pedagogicalTipVi: 'Yêu cầu học sinh quan sát mô hình 3D ô nhớ và con trỏ biến ngay từ trang khởi động.',
        pedagogicalTipEn: 'Direct students to interact with the 3D memory bank and pointer laser arcs from the warm-up view.'
      },
      {
        id: 'p17-0-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Trong phần Khởi động (trang 91), tác giả so sánh việc dùng biến trong lập trình với chữ cái trong Đại số toán học như thế nào?',
        questionEn: 'In the Warm-up section on page 91, how does the author compare programming variables to algebraic symbols?',
        suggestedAnswerVi: 'Trong Đại số, dùng chữ cái (như a, b trong hằng đẳng thức (a+b)² = a² + 2ab + b²) để đại diện cho mọi số cụ thể. Trong lập trình, biến đại diện cho các giá trị dữ liệu cụ thể, giúp thuật toán khái quát hoá và chạy được trên vô số bộ dữ liệu khác nhau.',
        suggestedAnswerEn: 'In Algebra, letters (like a, b in (a+b)²) generalize mathematical formulas. In computing, variables abstract away concrete data values, allowing one algorithm to process unlimited dynamic inputs.',
        pedagogicalTipVi: 'Gợi mở cho học sinh lấy thêm ví dụ trong Vật lí (vận tốc v, thời gian t, quãng đường s) để thấy tính tương đồng.',
        pedagogicalTipEn: 'Prompt students with Physics examples (velocity v, time t, distance s) to reinforce conceptual mapping.'
      }
    ]
  },

  // Trang 1: 1. Biến và lệnh gán (Trang 91 – 93)
  1: {
    sectionId: 'bien-va-lenh-gan-quy-tac',
    sectionTitleVi: '1. Biến và lệnh gán (Trang 91 – 93)',
    sectionTitleEn: '1. Variables & Assignment Statements (Pages 91 – 93)',
    prompts: [
      {
        id: 'p17-1-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Biến trong Python là gì, và nó được tạo ra vào thời điểm nào trong chương trình?',
        questionEn: 'What is a variable in Python, and at what moment is it instantiated during execution?',
        suggestedAnswerVi: 'Biến là tên (định danh) của một vùng nhớ dùng để lưu trữ giá trị (dữ liệu) và giá trị đó có thể được thay đổi. Trong Python, biến không cần khai báo kiểu dữ liệu từ trước mà được tự động tạo ra ngay khi câu lệnh gán được thực hiện.',
        suggestedAnswerEn: 'A variable is an identifier for a memory storage location holding data that can change. In Python, variables do not require upfront type declarations; they are instantiated dynamically upon executing the assignment statement.',
        pedagogicalTipVi: 'Nhấn mạnh tính năng kiểu động (dynamic typing) của Python so với C/C++ và Pascal.',
        pedagogicalTipEn: 'Highlight Python dynamic typing advantage compared to static typed languages like C++ or Pascal.'
      },
      {
        id: 'p17-1-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Trình bày 3 quy tắc bắt buộc khi đặt tên biến trong Python (Hộp Ghi nhớ 1, trang 93)? Hãy giải thích vì sao `12abc` và `My country` lại không hợp lệ?',
        questionEn: 'State the 3 mandatory naming rules for Python identifiers (Summary Box 1, page 93)? Why are `12abc` and `My country` invalid?',
        suggestedAnswerVi: '3 quy tắc: 1) Chỉ gồm chữ cái, chữ số (0-9) và gạch dưới `_`; 2) Không bắt đầu bằng chữ số; 3) Phân biệt chữ hoa và chữ thường. `12abc` sai vì bắt đầu bằng chữ số 12; `My country` sai vì chứa dấu khoảng trắng.',
        suggestedAnswerEn: '3 rules: 1) Only alphanumeric chars and underscores; 2) Cannot begin with a digit; 3) Case-sensitive. `12abc` fails rule 2 (starts with digits); `My country` fails rule 1 (contains illegal space).',
        pedagogicalTipVi: 'Cho học sinh thử nghiệm ngay trên công cụ máy quét tên biến ở mô phỏng 3D để nhận phản hồi trực quan.',
        pedagogicalTipEn: 'Have students test their proposed names on the 3D identifier scanner for instant visual feedback.'
      }
    ]
  },

  // Trang 2: 2. Các phép toán trên một số kiểu dữ liệu cơ bản (Trang 93 – 94)
  2: {
    sectionId: 'phep-toan-kieu-du-lieu-co-ban',
    sectionTitleVi: '2. Các phép toán trên một số kiểu dữ liệu cơ bản (Trang 93 – 94)',
    sectionTitleEn: '2. Operations on Basic Data Types (Pages 93 – 94)',
    prompts: [
      {
        id: 'p17-2-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Trong các phép toán số học của Python, phép toán nào có thứ tự ưu tiên cao nhất và nó được tính toán theo hướng nào (từ trái sang phải hay từ phải sang trái)?',
        questionEn: 'Among Python arithmetic operations, which operator has highest precedence and in which direction is it evaluated?',
        suggestedAnswerVi: 'Phép luỹ thừa `**` có thứ tự ưu tiên cao nhất trong các phép toán số học, và nó được thực hiện từ PHẢI SANG TRÁI (ví dụ: `4**2**3` = `4**(2**3)` = `4**8` = `65536`).',
        suggestedAnswerEn: 'Exponentiation `**` has the highest arithmetic precedence, and evaluates from RIGHT TO LEFT (e.g., `4**2**3` = `4**(2**3)` = `4**8` = `65536`).',
        pedagogicalTipVi: 'Nhấn mạnh sự khác biệt giữa `4**2**3 = 65536` và `(4**2)**3 = 4096` bằng mô phỏng tháp toán tử 3D.',
        pedagogicalTipEn: 'Reinforce the distinction between `4**2**3 = 65536` and `(4**2)**3 = 4096` using the 3D operator precedence tower.'
      },
      {
        id: 'p17-2-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Hai toán tử `//` và `%` có ý nghĩa gì trong số học? Giải thích kết quả của biểu thức `(10 // 3) * 3 + (10 % 3)`?',
        questionEn: 'What do operators `//` and `%` represent? Explain the result of `(10 // 3) * 3 + (10 % 3)`?',
        suggestedAnswerVi: '`//` là phép chia lấy phần nguyên (10 // 3 = 3); `%` là phép chia lấy phần dư (10 % 3 = 1). Biểu thức trên tái lập lại định lý chia Euclide: (thương nguyên * số chia) + số dư = 3 * 3 + 1 = 10 (chính là số bị chia ban đầu).',
        suggestedAnswerEn: '`//` is floor division (10 // 3 = 3); `%` is modulus/remainder (10 % 3 = 1). The expression reconstructs division identity: (quotient * divisor) + remainder = 3 * 3 + 1 = 10.',
        pedagogicalTipVi: 'Liên hệ công thức này với bài toán đổi thời gian (giây sang ngày, giờ, phút) ở phần Vận dụng.',
        pedagogicalTipEn: 'Link this identity directly to the time-conversion challenge in the Application section.'
      }
    ]
  },

  // Trang 3: 3. Từ khoá (Trang 95)
  3: {
    sectionId: 'tu-khoa-python-keywords',
    sectionTitleVi: '3. Từ khoá (Keywords) trong Python (Trang 95)',
    sectionTitleEn: '3. Python Reserved Keywords (Page 95)',
    prompts: [
      {
        id: 'p17-3-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Thế nào là "từ khoá" trong Python? Kể tên ít nhất 5 từ khoá phổ biến trong bảng 33 từ khoá ở trang 95 SGK?',
        questionEn: 'What are keywords in Python? Name at least 5 common keywords from the 33-keyword table on page 95?',
        suggestedAnswerVi: 'Từ khoá là các từ tiếng Anh đặc biệt được dành riêng để tham gia vào cấu trúc ngữ pháp của ngôn ngữ lập trình. 5 từ khoá phổ biến: `if`, `else`, `for`, `while`, `def` (hoặc `return`, `class`, `import`, `global`, `True`, `False`).',
        suggestedAnswerEn: 'Keywords are reserved words predefined to construct language syntax. Common examples: `if`, `else`, `for`, `while`, `def`, `return`, `class`, `import`.',
        pedagogicalTipVi: 'Cho học sinh quan sát bảng từ khoá 3D và dùng tính năng tìm kiếm từ khoá trong bài.',
        pedagogicalTipEn: 'Direct students to observe the keyword firewall in 3D and test search filtering.'
      },
      {
        id: 'p17-3-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Tại sao từ `True` là từ khoá cấm đặt làm tên biến, nhưng từ `true` (chữ thường) lại là tên biến hoàn toàn hợp lệ?',
        questionEn: 'Why is `True` a prohibited keyword, yet lowercase `true` is a completely valid identifier?',
        suggestedAnswerVi: 'Vì ngôn ngữ Python có tính chất phân biệt chữ hoa và chữ thường (case-sensitive). Từ khoá chuẩn của Python là `True` (viết hoa chữ T). Do đó từ `true` viết thường không trùng với từ khoá và được chấp nhận như một định danh bình thường.',
        suggestedAnswerEn: 'Because Python is strictly case-sensitive. The reserved boolean keyword is capitalized `True`. Lowercase `true` does not match the token and is accepted as an ordinary identifier.',
        pedagogicalTipVi: 'Dặn học sinh lưu ý tuy `true` hợp lệ nhưng trong thực tế nên tránh đặt để không gây nhầm lẫn khi đọc mã nguồn.',
        pedagogicalTipEn: 'Advise students that while `true` is technically legal, avoiding such names prevents confusion in collaborative codebases.'
      }
    ]
  },

  // Trang 4: 4. Thực hành (Trang 95 – 96)
  4: {
    sectionId: 'thuc-hanh-bien-hinh-tron',
    sectionTitleVi: '4. Thực hành: Tạo & Làm việc với biến trong Python (Trang 95 – 96)',
    sectionTitleEn: '4. Practice Lab: Working with Variables & Circle Script (Pages 95 – 96)',
    prompts: [
      {
        id: 'p17-4-1',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Trong Nhiệm vụ 1d, hãy giải thích cú pháp gán đồng thời `a, b, c = 2, 3, 4` và cách tính giá trị `(a+b+c)*(a+b-c)`?',
        questionEn: 'In Task 1d, explain simultaneous assignment `a, b, c = 2, 3, 4` and how `(a+b+c)*(a+b-c)` is evaluated?',
        suggestedAnswerVi: 'Cú pháp `a, b, c = 2, 3, 4` gán đồng thời: a = 2, b = 3, c = 4 trên một dòng lệnh duy nhất. Khi tính: (2+3+4) * (2+3-4) = 9 * 1 = 9. Dấu `*` giữa 2 ngoặc là bắt buộc trong Python.',
        suggestedAnswerEn: '`a, b, c = 2, 3, 4` maps three values concurrently to three variables. Then: (2+3+4) * (2+3-4) = 9 * 1 = 9. The explicit `*` operator between brackets is mandatory.',
        pedagogicalTipVi: 'Cho học sinh tự thay đổi giá trị a, b, c trong sandbox để quan sát kết quả tự động cập nhật.',
        pedagogicalTipEn: 'Prompt students to alter values in the sandbox to observe dynamic recalculations.'
      },
      {
        id: 'p17-4-2',
        targetCognitiveLevel: 'Vận dụng cao',
        targetCognitiveLevelEn: 'Analyze',
        questionVi: 'Trong Nhiệm vụ 2 (tệp HinhTron.py), tại sao ta nên khai báo các biến `R = 4.5` và `pi = 3.14` thay vì viết trực tiếp số vào câu lệnh print?',
        questionEn: 'In Task 2 (HinhTron.py), why define variables `R = 4.5` and `pi = 3.14` rather than hardcoding numbers into print statements?',
        suggestedAnswerVi: '1) Tính rõ ràng, trong sáng của mã nguồn: Người đọc hiểu ngay R là bán kính và pi là hằng số Pi; 2) Tính tái sử dụng và dễ bảo trì: Khi muốn đổi sang bán kính hình tròn khác (ví dụ R = 10), ta chỉ cần sửa đúng 1 dòng lệnh khai báo R, toàn bộ các phép tính chu vi và diện tích bên dưới sẽ tự động thay đổi theo.',
        suggestedAnswerEn: '1) Clarity: self-documenting names explain their geometric roles; 2) Maintainability: changing radius for a new circle requires updating only one line (`R = 10`), automatically updating all dependent formulas.',
        pedagogicalTipVi: 'Yêu cầu học sinh thực hành chạy tệp với nút F5 trên màn hình IDE mô phỏng.',
        pedagogicalTipEn: 'Ensure students execute the script using the simulated F5 Run Module button in the virtual IDE.'
      }
    ]
  },

  // Trang 5: 5. Luyện tập & Vận dụng (Trang 96)
  5: {
    sectionId: 'luyen-tap-van-dung-bai-17',
    sectionTitleVi: '5. Luyện tập, Vận dụng & Đánh giá năng lực (Trang 96)',
    sectionTitleEn: '5. Practice, Application & Credential Assessment (Page 96)',
    prompts: [
      {
        id: 'p17-5-1',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Trong bài Vận dụng 1 (trang 96 SGK), hãy phân tích thuật toán đổi 684 500 giây sang ngày, giờ, phút, giây bằng các phép toán `//` và `%`?',
        questionEn: 'In Application Task 1 (page 96), analyze the algorithm converting 684,500 seconds into days, hours, minutes, and seconds using `//` and `%`?',
        suggestedAnswerVi: '1) `ngay = ss // 86400; ss = ss % 86400` (lấy số ngày và giữ lại giây dư); 2) `gio = ss // 3600; ss = ss % 3600` (lấy số giờ và giữ lại giây dư); 3) `phut = ss // 60; giay = ss % 60` (lấy số phút và giây cuối cùng). Với 684 500 giây, ta được chính xác 7 ngày 22 giờ 8 phút 20 giây.',
        suggestedAnswerEn: '1) `days = ss // 86400; ss = ss % 86400`; 2) `hours = ss // 3600; ss = ss % 3600`; 3) `mins = ss // 60; secs = ss % 60`. For 684,500 seconds, this yields 7 days, 22 hours, 8 minutes, and 20 seconds.',
        pedagogicalTipVi: 'Khuyến khích học sinh nhập thử các giá trị số giây khác trong hộp công cụ tương tác để kiểm chứng.',
        pedagogicalTipEn: 'Encourage students to input custom second counts into the interactive tool to verify algorithmic consistency.'
      },
      {
        id: 'p17-5-2',
        targetCognitiveLevel: 'Vận dụng cao',
        targetCognitiveLevelEn: 'Analyze',
        questionVi: 'Trong bài Vận dụng 2 (trang 96 SGK), lệnh gán `x, y = y, x` có tác dụng gì đặc biệt? So sánh với cách làm truyền thống trong các ngôn ngữ lập trình khác?',
        questionEn: 'In Application Task 2 (page 96), what special effect does `x, y = y, x` accomplish? Compare it with traditional swapping in other languages?',
        suggestedAnswerVi: 'Lệnh `x, y = y, x` tráo đổi (hoán vị) giá trị của hai biến x và y tức thì. Trong các ngôn ngữ khác (C++, Pascal), ta bắt buộc phải dùng biến trung gian tạm thời: `temp = x; x = y; y = temp` (tốn thêm bộ nhớ và 3 dòng lệnh). Python dùng cơ chế gán đồng thời (tuple packing/unpacking) nên thực hiện an toàn trên đúng 1 dòng lệnh mà không lo bị ghi đè dữ liệu.',
        suggestedAnswerEn: '`x, y = y, x` performs an instantaneous variable swap. In C++ or Pascal, an auxiliary temp variable is needed (`temp = x; x = y; y = temp`). Python utilizes simultaneous tuple packing and unpacking, evaluating the right-hand side first before assigning, allowing a clean, atomic swap on a single line.',
        pedagogicalTipVi: 'Dẫn dắt học sinh hoàn thành bài kiểm tra 10 câu trắc nghiệm để nhận chứng chỉ KNTT10-B17.',
        pedagogicalTipEn: 'Guide students to complete the 10-question assessment to earn verified credential KNTT10-B17.'
      },
      {
        id: 'p17-5-3',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Khi thực hiện các phép toán số học trong Python, kiểu dữ liệu của kết quả phụ thuộc như thế nào vào các toán hạng và phép chia `/` so với `//`?',
        questionEn: 'When performing arithmetic operations in Python, how does the result data type depend on operands and float division `/` versus integer division `//`?',
        suggestedAnswerVi: 'Phép chia `/` luôn luôn trả về kiểu số thực (float) ngay cả khi chia hết (ví dụ 6 / 2 = 3.0). Phép chia nguyên `//` và chia lấy dư `%` trả về số nguyên (int) nếu hai toán hạng là int, và trả về float nếu có ít nhất một toán hạng là float.',
        suggestedAnswerEn: 'Division `/` always returns a float even if exactly divisible (e.g., 6 / 2 = 3.0). Floor division `//` and modulus `%` yield an int if both operands are ints, and a float if at least one operand is a float.',
        pedagogicalTipVi: 'Nhắc học sinh lưu ý bẫy thường gặp khi tính toán chỉ số danh sách hoặc vòng lặp: bắt buộc phải dùng số nguyên `int`.',
        pedagogicalTipEn: 'Warn students against common pitfalls when computing list indices or loops: integer indices are strictly required.'
      }
    ]
  }
};

export const TEACHER_PROMPTS_LESSON_19: Record<number, SectionTeacherPrompts> = {
  0: {
    sectionId: 'khoi-dong-19',
    sectionTitleVi: 'Khởi động & Mô phỏng Ngã ba Rẽ nhánh 3D (Trang 101 SGK)',
    sectionTitleEn: 'Warm-up & 3D Railroad Switch Simulation (Page 101)',
    prompts: [
      {
        id: 'p19-0-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Trong tình huống dự báo thời tiết ở phần Khởi động trang 101 SGK, điều kiện nào quyết định hành động đi cắm trại hay ở nhà đọc sách?',
        questionEn: 'In the weather forecast warm-up on page 101, what condition determines whether to go camping or stay home reading?',
        suggestedAnswerVi: 'Điều kiện là "Nếu ngày mai trời không mưa". Nếu điều kiện đúng (True) thì đi cắm trại, nếu sai (False) thì ở nhà đọc sách.',
        suggestedAnswerEn: 'The condition is "If it does not rain tomorrow". If True, go camping; if False, stay home reading.',
        pedagogicalTipVi: 'Yêu cầu học sinh vẽ sơ đồ khối rẽ nhánh Hình 19.1 để minh họa trực quan điều kiện và hai nhánh hành động.',
        pedagogicalTipEn: 'Ask students to sketch flowchart Figure 19.1 illustrating the decision condition and two action branches.'
      },
      {
        id: 'p19-0-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Cấu trúc rẽ nhánh trong ngôn ngữ lập trình khác với cấu trúc tuần tự cơ bản như thế nào?',
        questionEn: 'How does a conditional branching structure differ fundamentally from sequential execution in programming?',
        suggestedAnswerVi: 'Cấu trúc tuần tự thực hiện các lệnh lần lượt từ trên xuống dưới. Cấu trúc rẽ nhánh kiểm tra một biểu thức điều kiện lôgic và chỉ thực hiện khối lệnh tương ứng khi điều kiện thoả mãn.',
        suggestedAnswerEn: 'Sequential execution runs commands line-by-line. Conditional branching evaluates a boolean expression and executes instructions only when the condition is met.',
        pedagogicalTipVi: 'Cho học sinh liên hệ với mô phỏng ngã ba đường ray xe lửa 3D để hình dung việc đổi hướng dòng điều khiển.',
        pedagogicalTipEn: 'Connect with the 3D railroad switch simulation to help students visualize control flow redirection.'
      },
      {
        id: 'p19-0-3',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Hãy nêu một ví dụ về tình huống rẽ nhánh trong quản lý điểm học sinh hoặc đăng nhập tài khoản mà em thường gặp?',
        questionEn: 'Give an everyday example of conditional branching in student grade evaluation or account authentication?',
        suggestedAnswerVi: 'Ví dụ đăng nhập: Nếu mật khẩu nhập vào khớp với mật khẩu đã lưu thì cho phép đăng nhập thành công; ngược lại thì thông báo sai mật khẩu và yêu cầu nhập lại.',
        suggestedAnswerEn: 'Authentication example: If entered password matches stored credential, grant access; otherwise display error and prompt retry.',
        pedagogicalTipVi: 'Khuyến khích học sinh viết biểu thức điều kiện bằng lời và xác định rõ hai nhánh True/False.',
        pedagogicalTipEn: 'Encourage students to formulate the condition in plain words and identify the True and False branches.'
      }
    ]
  },
  1: {
    sectionId: 'bieu-thuc-logic',
    sectionTitleVi: '1. Biểu thức lôgic: and, or, not (Trang 101 – 102 SGK)',
    sectionTitleEn: '1. Boolean Expressions: and, or, not (Pages 101 – 102)',
    prompts: [
      {
        id: 'p19-1-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Trong Python, biểu thức lôgic là gì và nó chỉ có thể nhận những giá trị nào?',
        questionEn: 'In Python, what is a Boolean expression and what values can it evaluate to?',
        suggestedAnswerVi: 'Biểu thức lôgic là biểu thức chỉ nhận giá trị Đúng (True) hoặc Sai (False) thuộc kiểu dữ liệu bool trong Python.',
        suggestedAnswerEn: 'A Boolean expression is an expression that evaluates strictly to True or False, belonging to Python\'s bool data type.',
        pedagogicalTipVi: 'Nhắc học sinh viết hoa chữ cái đầu của True và False trong Python.',
        pedagogicalTipEn: 'Remind students to capitalize True and False in Python.'
      },
      {
        id: 'p19-1-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Hãy so sánh sự khác nhau về bảng chân trị giữa hai phép toán lôgic `and` và `or`?',
        questionEn: 'Compare the truth tables between the `and` and `or` logical operators in Python?',
        suggestedAnswerVi: 'Phép `and` chỉ cho kết quả True khi TẤT CẢ các biểu thức con đều True. Phép `or` cho kết quả True khi có ÍT NHẤT MỘT biểu thức con là True.',
        suggestedAnswerEn: '`and` yields True only when ALL operands are True. `or` yields True when AT LEAST ONE operand is True.',
        pedagogicalTipVi: 'Yêu cầu học sinh điền nhanh bảng chân trị trên màn hình tương tác để khắc sâu kiến thức.',
        pedagogicalTipEn: 'Prompt students to fill out the interactive truth table to reinforce understanding.'
      },
      {
        id: 'p19-1-3',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Để kiểm tra một số thực x có nằm trong khoảng (0, 10] hay không, ta viết biểu thức lôgic trong Python như thế nào?',
        questionEn: 'To verify whether a float x lies within interval (0, 10], how is the boolean expression written in Python?',
        suggestedAnswerVi: 'Biểu thức viết là: `x > 0 and x <= 10` hoặc có thể viết gọn trong Python là `0 < x <= 10`.',
        suggestedAnswerEn: 'Written as `x > 0 and x <= 10` or chained in Python as `0 < x <= 10`.',
        pedagogicalTipVi: 'Lưu ý học sinh bẫy toán học: không được viết `x > 0 and <= 10` vì thiếu toán hạng cho phép so sánh thứ hai.',
        pedagogicalTipEn: 'Warn students against writing `x > 0 and <= 10` which omits the operand for the second comparison.'
      }
    ]
  },
  2: {
    sectionId: 'cau-lenh-if',
    sectionTitleVi: '2. Câu lệnh rẽ nhánh if (Trang 102 – 103 SGK)',
    sectionTitleEn: '2. Conditional Branching Statement: if (Pages 102 – 103)',
    prompts: [
      {
        id: 'p19-2-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Hãy nêu cú pháp chuẩn của câu lệnh if dạng thiếu và câu lệnh if-else dạng đủ trong Python?',
        questionEn: 'State the formal syntax of single if and two-way if-else statements in Python?',
        suggestedAnswerVi: 'Dạng thiếu: `if <điều kiện>:\n    <khối lệnh>`. Dạng đủ: `if <điều kiện>:\n    <khối lệnh 1>\nelse:\n    <khối lệnh 2>`. Sau `if` và `else` bắt buộc phải có dấu hai chấm `:`.',
        suggestedAnswerEn: 'Single: `if <condition>:\n    <block>`. Two-way: `if <condition>:\n    <block 1>\nelse:\n    <block 2>`. Colons `:` are strictly mandatory after if and else.',
        pedagogicalTipVi: 'Nhấn mạnh quy tắc thụt lề (Indentation): các lệnh trong cùng khối phải thụt lề bằng nhau (chuẩn 4 dấu cách).',
        pedagogicalTipEn: 'Emphasize indentation rules: statements in the same block must share uniform indentation (4 spaces).'
      },
      {
        id: 'p19-2-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Tại sao dấu hai chấm `:` và quy tắc thụt lề lại là điểm khác biệt độc đáo và bắt buộc của Python so với các ngôn ngữ khác như C++ hay Pascal?',
        questionEn: 'Why are colons `:` and indentation unique and strictly mandatory in Python compared to C++ or Pascal?',
        suggestedAnswerVi: 'Các ngôn ngữ khác dùng cặp ngoặc nhọn `{}` hoặc từ khóa `begin...end` để phân chia khối lệnh. Python loại bỏ các cặp ngoặc này và dùng trực tiếp thụt lề để xác định phạm vi khối lệnh, giúp mã nguồn luôn ngăn nắp và dễ đọc.',
        suggestedAnswerEn: 'Other languages use curly braces `{}` or `begin...end`. Python dispenses with delimiters and uses indentation to delineate blocks, enforcing clean and readable code.',
        pedagogicalTipVi: 'Cho học sinh xem ví dụ lỗi `IndentationError` khi các dòng lệnh trong khối if không thẳng hàng.',
        pedagogicalTipEn: 'Show students a live `IndentationError` when statements within an if block are misaligned.'
      },
      {
        id: 'p19-2-3',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Trong bài toán tính giá trị tuyệt đối |a - b| (Ví dụ trang 103 SGK), ta có thể dùng câu lệnh if dạng thiếu hay dạng đủ?',
        questionEn: 'In computing absolute difference |a - b| (Page 103 example), can we use a single if or a two-way if-else?',
        suggestedAnswerVi: 'Cả hai cách đều được: Dạng thiếu khởi tạo `d = a - b`, nếu `d < 0` thì `d = -d`. Dạng đủ: nếu `a >= b` thì `d = a - b`, ngược lại thì `d = b - a`.',
        suggestedAnswerEn: 'Both are valid: Single if initializes `d = a - b`, and if `d < 0` sets `d = -d`. Two-way sets `d = a - b` if `a >= b`, else `d = b - a`.',
        pedagogicalTipVi: 'Yêu cầu học sinh so sánh số dòng lệnh và tính ngắn gọn của hai cách giải.',
        pedagogicalTipEn: 'Ask students to compare code length and conciseness between the two implementations.'
      }
    ]
  },
  3: {
    sectionId: 'thuc-hanh-19',
    sectionTitleVi: '3. Thực hành: Kiểm tra chẵn lẻ & Tiền điện (Trang 103 – 104 SGK)',
    sectionTitleEn: '3. Hands-on Lab: Parity Check & Electricity Billing (Pages 103 – 104)',
    prompts: [
      {
        id: 'p19-3-1',
        targetCognitiveLevel: 'Nhận biết',
        targetCognitiveLevelEn: 'Remember',
        questionVi: 'Để thực hiện bài thực hành ‘Câu lệnh điều kiện if’, cần thực hiện lần lượt những bước nào trong môi trường phần mềm?',
        questionEn: 'To execute the hands-on lab in ‘Conditional Statement: if’, what sequential steps must be performed in the software environment?',
        suggestedAnswerVi: 'Thực hiện 3 bước chuẩn SGK: 1. Khởi động môi trường Python IDLE; 2. Nhập và lưu tệp mã nguồn (.py); 3. Nhấn F5 (Run Module) để thực thi chương trình và kiểm tra kết quả hiển thị trên Shell.',
        suggestedAnswerEn: 'Follow 3 standard textbook steps: 1. Launch Python IDLE; 2. Enter and save the script file (.py); 3. Press F5 (Run Module) to execute the code and inspect Shell outputs.',
        pedagogicalTipVi: 'Yêu cầu học sinh nhắc lại quy trình mở cửa sổ Editor mới và lưu tệp có đuôi mở rộng .py trước khi nhấn F5.',
        pedagogicalTipEn: 'Ask students to recall the procedure for opening a new Editor window and saving the file with .py extension before pressing F5.'
      },
      {
        id: 'p19-3-2',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Trong bài toán tính tiền điện sinh hoạt luỹ kế, tại sao công thức tính ở bậc 2 và bậc 3 lại phải cộng dồn tiền điện của các bậc thang trước đó?',
        questionEn: 'In progressive electricity billing, why must calculations for Tier 2 and Tier 3 accumulate the costs of preceding tiers?',
        suggestedAnswerVi: 'Vì biểu giá luỹ kế tính riêng từng mức tiêu thụ: 50 kWh đầu tính giá bậc 1, 50 kWh tiếp theo tính giá bậc 2, chỉ phần vượt 100 kWh mới tính giá bậc 3.',
        suggestedAnswerEn: 'Because tiered tariffs bill each bracket separately: the first 50 kWh at Tier 1, the next 50 kWh at Tier 2, and only excess beyond 100 kWh at Tier 3.',
        pedagogicalTipVi: 'Hướng dẫn học sinh phân tích sơ đồ bậc thang để tránh nhầm lẫn nhân toàn bộ số kWh với một đơn giá duy nhất.',
        pedagogicalTipEn: 'Guide students to analyze the tiered ladder diagram to prevent multiplying total kWh by a single rate.'
      },
      {
        id: 'p19-3-3',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Khi kiểm tra số chẵn lẻ, tại sao biểu thức điều kiện n % 2 == 0 lại là cách viết chuẩn xác nhất trong Python?',
        questionEn: 'When checking parity, why is the condition n % 2 == 0 the most accurate implementation in Python?',
        suggestedAnswerVi: 'Phép chia lấy dư n % 2 trả về 0 nếu n chia hết cho 2 (số chẵn) và trả về 1 nếu n chia 2 dư 1 (số lẻ). So sánh quan hệ == 0 cho kết quả kiểu bool True/False chính xác.',
        suggestedAnswerEn: 'The modulo operation n % 2 yields 0 if n is divisible by 2 (even) and 1 if remainder is 1 (odd). Comparison == 0 evaluates to True/False accurately.',
        pedagogicalTipVi: 'Yêu cầu học sinh giải thích sự khác biệt giữa toán tử so sánh bằng (==) và toán tử gán (=).',
        pedagogicalTipEn: 'Ask students to explain the distinction between equality comparison (==) and assignment (=).'
      }
    ]
  },
  4: {
    sectionId: 'luyen-tap-van-dung-19',
    sectionTitleVi: '4. Luyện tập, Vận dụng & Đánh giá (Trang 104 SGK)',
    sectionTitleEn: '4. Exercises, Application & Assessment (Page 104)',
    prompts: [
      {
        id: 'p19-4-1',
        targetCognitiveLevel: 'Thông hiểu',
        targetCognitiveLevelEn: 'Understand',
        questionVi: 'Trong bài Vận dụng 2 trang 104 SGK, quy tắc kiểm tra năm nhuận dương lịch được phát biểu như thế nào dưới dạng biểu thức lôgic?',
        questionEn: 'In Application Task 2 on page 104, how is the Gregorian leap year rule formulated as a Boolean expression?',
        suggestedAnswerVi: 'Năm y là năm nhuận nếu y chia hết cho 400 HOẶC (y chia hết cho 4 VÀ không chia hết cho 100). Biểu thức Python: `(y % 400 == 0) or (y % 4 == 0 and y % 100 != 0)`.',
        suggestedAnswerEn: 'Year y is leap if divisible by 400 OR (divisible by 4 AND not divisible by 100): `(y % 400 == 0) or (y % 4 == 0 and y % 100 != 0)`.',
        pedagogicalTipVi: 'Giải thích lý do lịch thiên văn cần quy tắc loại trừ năm tròn thế kỷ không chia hết cho 400.',
        pedagogicalTipEn: 'Explain astronomical reasons why century years not divisible by 400 are excluded.'
      },
      {
        id: 'p19-4-2',
        targetCognitiveLevel: 'Vận dụng',
        targetCognitiveLevelEn: 'Apply',
        questionVi: 'Trong bài toán giảm giá cam ở siêu thị (dưới 5kg giá 20 nghìn/kg, từ 5kg giá 18 nghìn/kg), cấu trúc lệnh if-else được thiết kế ra sao?',
        questionEn: 'In the supermarket orange discount pricing (under 5kg at 20k/kg, 5kg or above at 18k/kg), how is the if-else structured?',
        suggestedAnswerVi: '`if w < 5: tien = w * 20\nelse: tien = w * 18`. Với w là khối lượng cam nhập từ bàn phím.',
        suggestedAnswerEn: '`if w < 5: tien = w * 20\nelse: tien = w * 18`, where w is the weight entered by user.',
        pedagogicalTipVi: 'Yêu cầu học sinh chạy thử nghiệm các giá trị biên như w = 4.9, w = 5.0, w = 5.1 để kiểm chứng tính đúng đắn.',
        pedagogicalTipEn: 'Prompt students to test boundary values like w = 4.9, 5.0, 5.1 to verify correctness.'
      },
      {
        id: 'p19-4-3',
        targetCognitiveLevel: 'Vận dụng cao',
        targetCognitiveLevelEn: 'Analyze',
        questionVi: 'Khi cần giải quyết bài toán có nhiều hơn hai nhánh lựa chọn, em sẽ tổ chức lồng ghép các câu lệnh if-else như thế nào cho trong sáng và hiệu quả?',
        questionEn: 'When solving problems with more than two branches, how do you nest if-else statements cleanly and effectively?',
        suggestedAnswerVi: 'Sử dụng cấu trúc `if... else: if... else:` lồng nhau có thụt lề chuẩn, hoặc dùng cấu trúc `if... elif... else:` để mã nguồn thẳng hàng, dễ theo dõi và tránh thụt lề quá sâu.',
        suggestedAnswerEn: 'Use clean nested `if... else: if... else:` with strict indentation, or `if... elif... else:` to avoid excessive indentation nesting.',
        pedagogicalTipVi: 'Động viên học sinh làm bài trắc nghiệm 10 câu đạt từ 80% để nhận chứng chỉ KNTT10-B19.',
        pedagogicalTipEn: 'Encourage students to achieve 80%+ on the 10-question quiz to earn credential KNTT10-B19.'
      }
    ]
  }
};

// Map of all lessons' teacher prompts
export const TEACHER_PROMPTS_BY_LESSON: Record<number, Record<number, SectionTeacherPrompts>> = {
  1: TEACHER_PROMPTS_LESSON_1,
  2: TEACHER_PROMPTS_LESSON_2,
  3: TEACHER_PROMPTS_LESSON_3,
  4: TEACHER_PROMPTS_LESSON_4,
  5: TEACHER_PROMPTS_LESSON_5,
  6: TEACHER_PROMPTS_LESSON_6,
  7: TEACHER_PROMPTS_LESSON_7,
  8: TEACHER_PROMPTS_LESSON_8,
  9: TEACHER_PROMPTS_LESSON_9,
  10: TEACHER_PROMPTS_LESSON_10,
  11: TEACHER_PROMPTS_LESSON_11,
  12: TEACHER_PROMPTS_LESSON_12,
  13: TEACHER_PROMPTS_LESSON_13,
  14: TEACHER_PROMPTS_LESSON_14,
  15: TEACHER_PROMPTS_LESSON_15,
  16: TEACHER_PROMPTS_LESSON_16,
  17: TEACHER_PROMPTS_LESSON_17,
  19: TEACHER_PROMPTS_LESSON_19
};

// Backward-compatible export for Lesson 1
export const TEACHER_PROMPTS_BY_SECTION = TEACHER_PROMPTS_LESSON_1;

// Universal helper to retrieve teacher prompts for any lesson and section, strictly guaranteeing exactly 3 questions
export const getTeacherPrompts = (lessonId: number, sectionIndex: number): SectionTeacherPrompts => {
  const existing = TEACHER_PROMPTS_BY_LESSON[lessonId]?.[sectionIndex] || (lessonId === 1 ? TEACHER_PROMPTS_BY_SECTION[sectionIndex] : null);

  // Find lesson info from SGK_TOPICS
  let lessonInfo: { lessonNumber: number; titleVi: string; titleEn?: string; page: number } | null = null;
  for (const topic of SGK_TOPICS) {
    const found = topic.lessons.find((l) => l.lessonNumber === lessonId);
    if (found) {
      lessonInfo = found;
      break;
    }
  }

  const titleVi = lessonInfo?.titleVi || `Bài ${lessonId}`;
  const titleEn = lessonInfo?.titleEn || `Lesson ${lessonId}`;
  const pageNum = lessonInfo?.page || 10;

  // Build base prompts ensuring at least 3 high-quality pedagogical prompts
  const basePrompts: TeacherPromptItem[] = existing?.prompts ? [...existing.prompts] : [];

  // If handcrafted prompts don't cover all 3, generate pedagogical prompts aligned with the 6 section stages
  if (basePrompts.length < 3) {
    const isPythonTopic = lessonId >= 16 && lessonId <= 32;
    const isCareerTopic = lessonId >= 33;
    const isDesignTopic = lessonId >= 12 && lessonId <= 15;

    // Pedagogical templates based on section phase (0: Warm-up, 1: Core Theory, 2: Deep Mechanism, 3: Practical Lab, 4: Reinforcement, 5: Real-world Application)
    const stage = Math.min(Math.max(sectionIndex, 0), 5);

    const stageTemplates: Record<number, TeacherPromptItem[]> = {
      // Stage 0: Khởi động & Kích hoạt trải nghiệm
      0: [
        {
          id: `p${lessonId}-${sectionIndex}-1`,
          targetCognitiveLevel: 'Nhận biết',
          targetCognitiveLevelEn: 'Remember',
          questionVi: `Trước khi bước vào bài học "${titleVi}", em hãy nhớ lại hoặc nêu một tình huống thực tế thường gặp liên quan đến chủ đề này?`,
          questionEn: `Before exploring "${titleEn}", what real-world scenario or digital experience can you recall relating to this topic?`,
          suggestedAnswerVi: `Học sinh liên hệ tình huống thực tế gần gũi trong học tập và đời sống số (SGK Tin học 10, trang ${pageNum}), nhận diện vấn đề cần giải quyết bằng công nghệ.`,
          suggestedAnswerEn: `Students connect familiar everyday digital experiences from learning and daily life (Grade 10 Textbook, page ${pageNum}), identifying the computing problem to solve.`,
          pedagogicalTipVi: `Giáo viên khơi gợi trải nghiệm cá nhân của học sinh, tạo cầu nối tự nhiên dẫn dắt vào bài học mới.`,
          pedagogicalTipEn: `Teacher activates students' prior knowledge, creating an engaging transition into the new lesson.`
        },
        {
          id: `p${lessonId}-${sectionIndex}-2`,
          targetCognitiveLevel: 'Thông hiểu',
          targetCognitiveLevelEn: 'Understand',
          questionVi: isPythonTopic
            ? `Tại sao việc viết chương trình máy tính giải quyết bài toán trong "${titleVi}" lại ưu việt hơn tính toán thủ công?`
            : `Tại sao việc ứng dụng giải pháp trong bài "${titleVi}" lại giúp công việc xử lý dữ liệu nhanh chóng và chính xác hơn?`,
          questionEn: isPythonTopic
            ? `Why is writing a computer program in "${titleEn}" superior to performing manual calculations?`
            : `Why does applying the solution in "${titleEn}" make data processing significantly faster and more accurate?`,
          suggestedAnswerVi: isPythonTopic
            ? `Chương trình máy tính có thể tự động hóa phép tính lặp lại hàng triệu lần với độ chính xác tuyệt đối và tiết kiệm thời gian đáng kể.`
            : `Hệ thống số hóa giúp xử lý khối lượng dữ liệu khổng lồ trong thời gian ngắn, loại bỏ sai sót và tự động lưu trữ an toàn.`,
          suggestedAnswerEn: isPythonTopic
            ? `A computer program automates repetitive computations millions of times with perfect precision and saves substantial time.`
            : `Digital systems process vast volumes of data quickly, eliminate human errors, and provide secure automated storage.`,
          pedagogicalTipVi: `Yêu cầu học sinh so sánh thời gian và độ chính xác giữa cách làm thủ công và cách làm tự động bằng máy tính.`,
          pedagogicalTipEn: `Ask students to compare time and accuracy between manual execution and automated computer solutions.`
        },
        {
          id: `p${lessonId}-${sectionIndex}-3`,
          targetCognitiveLevel: 'Vận dụng',
          targetCognitiveLevelEn: 'Apply',
          questionVi: `Mục tiêu kỹ năng trọng tâm nhất mà em cần đạt được sau khi hoàn thành bài học "${titleVi}" là gì?`,
          questionEn: `What is the core practical skill you aim to achieve after completing "${titleEn}"?`,
          suggestedAnswerVi: `Nắm vững lý thuyết cốt lõi, thành thạo thao tác thực hành và tự tin vận dụng để giải quyết bài toán thực tế trên máy tính.`,
          suggestedAnswerEn: `Master core theoretical principles, execute hands-on procedures accurately, and solve practical computing tasks with confidence.`,
          pedagogicalTipVi: `Giáo viên định hướng học sinh cam kết mục tiêu học tập và ghi chép các từ khóa trọng tâm của bài.`,
          pedagogicalTipEn: `Teacher guides students to commit to personal learning goals and highlight key textbook keywords.`
        }
      ],

      // Stage 1: Khám phá lý thuyết & Khái niệm cốt lõi
      1: [
        {
          id: `p${lessonId}-${sectionIndex}-1`,
          targetCognitiveLevel: 'Nhận biết',
          targetCognitiveLevelEn: 'Remember',
          questionVi: isPythonTopic
            ? `Trong phần lý thuyết trọng tâm của "${titleVi}", cú pháp chuẩn hoặc từ khóa bắt buộc nào được SGK trang ${pageNum} quy định?`
            : isDesignTopic
            ? `Trong phần lý thuyết của "${titleVi}", công cụ hoặc thuộc tính cơ bản nào được giới thiệu tại trang ${pageNum} SGK?`
            : `Trong phần lý thuyết của "${titleVi}", khái niệm trọng tâm hoặc quy tắc cơ bản nhất được định nghĩa ở trang ${pageNum} SGK là gì?`,
          questionEn: isPythonTopic
            ? `In the core theory of "${titleEn}", what standard syntax rule or keyword is specified on textbook page ${pageNum}?`
            : `In the theory section of "${titleEn}", what core concept or foundational rule is defined on textbook page ${pageNum}?`,
          suggestedAnswerVi: `Học sinh nêu chính xác định nghĩa, cú pháp hoặc từ khóa chuẩn theo SGK Tin học 10, phân biệt rõ các thành phần cấu tạo.`,
          suggestedAnswerEn: `Students articulate the precise textbook definition, syntax, or keyword from Grade 10 textbook, noting key components.`,
          pedagogicalTipVi: `Yêu cầu học sinh gạch chân từ khóa trong SGK và viết lại cú pháp chuẩn vào vở ghi.`,
          pedagogicalTipEn: `Prompt students to underline keywords in their textbook and write the formal syntax in their notebooks.`
        },
        {
          id: `p${lessonId}-${sectionIndex}-2`,
          targetCognitiveLevel: 'Thông hiểu',
          targetCognitiveLevelEn: 'Understand',
          questionVi: `Hãy giải thích cơ chế hoạt động bên trong: Máy tính xử lý và quản lý dữ liệu như thế nào khi thực hiện nội dung này trong "${titleVi}"?`,
          questionEn: `Explain the internal mechanism: How does the computer process and manage data when executing this concept in "${titleEn}"?`,
          suggestedAnswerVi: `Dữ liệu được cấp phát ô nhớ trong RAM, bộ xử lý CPU phân tích mã lệnh theo tuần tự logic và trả về kết quả tương ứng.`,
          suggestedAnswerEn: `Data is allocated memory cells in RAM, and the CPU interprets and executes instructions sequentially according to logical rules.`,
          pedagogicalTipVi: `Sử dụng sơ đồ minh họa dòng dữ liệu hoặc mô hình hộp đen để học sinh hình dung cơ chế bên trong.`,
          pedagogicalTipEn: `Use data-flow diagrams or black-box models to help students visualize internal processing mechanics.`
        },
        {
          id: `p${lessonId}-${sectionIndex}-3`,
          targetCognitiveLevel: 'Vận dụng',
          targetCognitiveLevelEn: 'Apply',
          questionVi: isPythonTopic
            ? `Khi viết mã nguồn cho phần này, lỗi cú pháp hoặc lỗi kiểu dữ liệu phổ biến nhất là gì và cách phòng tránh ra sao?`
            : `Khi áp dụng quy tắc này, tình huống nhầm lẫn phổ biến nhất là gì và làm thế nào để phân biệt chính xác?`,
          questionEn: isPythonTopic
            ? `When writing code for this section, what is the most common syntax or type error, and how can it be avoided?`
            : `When applying this rule, what is the most common misconception, and how can it be clearly differentiated?`,
          suggestedAnswerVi: isPythonTopic
            ? `Thường gặp lỗi thiếu dấu hai chấm (:), sai thụt lề (IndentationError) hoặc ép sai kiểu dữ liệu; phòng tránh bằng cách rà soát kỹ từng dòng lệnh.`
            : `Thường nhầm lẫn giữa định dạng và dữ liệu gốc; phòng tránh bằng cách kiểm tra bản chất lưu trữ và bảng mã chuẩn.`,
          suggestedAnswerEn: isPythonTopic
            ? `Common errors include missing colons, indentation errors, or incorrect type conversions; prevented by careful inspection of each code line.`
            : `Common misconceptions involve confusing formatting with raw data; prevented by inspecting underlying representations.`,
          pedagogicalTipVi: `Đưa ra một đoạn mã hoặc tình huống có lỗi để học sinh phát hiện và đề xuất phương án sửa chữa.`,
          pedagogicalTipEn: `Present a sample snippet containing a mistake for students to diagnose and correct collaboratively.`
        }
      ],

      // Stage 2: Phân tích cơ chế & So sánh đối chiếu
      2: [
        {
          id: `p${lessonId}-${sectionIndex}-1`,
          targetCognitiveLevel: 'Nhận biết',
          targetCognitiveLevelEn: 'Remember',
          questionVi: `Trong nội dung này của "${titleVi}", có những thành phần, phương thức hoặc trường hợp nào được đưa ra để phân loại?`,
          questionEn: `In this section of "${titleEn}", what elements, methods, or categories are introduced for classification?`,
          suggestedAnswerVi: `Học sinh liệt kê đầy đủ các nhóm hoặc phân loại theo cấu trúc bài học trong SGK trang ${pageNum}.`,
          suggestedAnswerEn: `Students enumerate the complete classifications or categories presented in the textbook on page ${pageNum}.`,
          pedagogicalTipVi: `Vẽ bảng phân loại trên bảng lớp để học sinh tổng hợp hệ thống các đối tượng.`,
          pedagogicalTipEn: `Construct a classification chart on the board for students to synthesize the concepts.`
        },
        {
          id: `p${lessonId}-${sectionIndex}-2`,
          targetCognitiveLevel: 'Thông hiểu',
          targetCognitiveLevelEn: 'Understand',
          questionVi: `Hãy so sánh điểm giống và khác biệt bản chất giữa các trường hợp hoặc câu lệnh được trình bày trong phần này của "${titleVi}"?`,
          questionEn: `Compare the fundamental similarities and operational differences between the options or statements presented in "${titleEn}"?`,
          suggestedAnswerVi: `Phân tích rõ điểm chung về mục tiêu xử lý, nhưng khác nhau về cú pháp, điều kiện kích hoạt và phạm vi áp dụng.`,
          suggestedAnswerEn: `Analyze common processing goals while contrasting their syntax, trigger conditions, and operational scopes.`,
          pedagogicalTipVi: `Cho học sinh thảo luận cặp đôi (Think-Pair-Share) để lập bảng so sánh ưu nhược điểm.`,
          pedagogicalTipEn: `Facilitate a Think-Pair-Share discussion to build a comparative pros-and-cons table.`
        },
        {
          id: `p${lessonId}-${sectionIndex}-3`,
          targetCognitiveLevel: 'Vận dụng',
          targetCognitiveLevelEn: 'Apply',
          questionVi: `Trong một bài toán thực tế, khi nào em nên lựa chọn giải pháp này thay vì các giải pháp khác đã học?`,
          questionEn: `In a practical scenario, under what specific criteria would you choose this approach over alternatives?`,
          suggestedAnswerVi: `Lựa chọn dựa trên độ phức tạp bài toán, yêu cầu bộ nhớ, tốc độ thực thi và tính dễ đọc, dễ bảo trì của mã nguồn.`,
          suggestedAnswerEn: `Select based on problem constraints, memory footprint, runtime efficiency, and code clarity for long-term maintenance.`,
          pedagogicalTipVi: `Đặt câu hỏi tình huống thực tế để học sinh rèn luyện tư duy phản biện và năng lực ra quyết định.`,
          pedagogicalTipEn: `Pose scenario-based challenge questions to develop students' critical thinking and architectural decision-making.`
        }
      ],

      // Stage 3: Thực hành thao tác & Thí nghiệm kỹ thuật
      3: [
        {
          id: `p${lessonId}-${sectionIndex}-1`,
          targetCognitiveLevel: 'Nhận biết',
          targetCognitiveLevelEn: 'Remember',
          questionVi: `Để thực hiện bài thực hành ‘${titleVi}’, cần thực hiện lần lượt những bước nào trong môi trường phần mềm?`,
          questionEn: `To execute the hands-on lab in ‘${titleEn}’, what sequential steps must be performed in the software environment?`,
          suggestedAnswerVi: `Gồm 3 bước chuẩn: 1. Khởi tạo tệp/môi trường; 2. Nhập lệnh hoặc thiết lập tham số theo hướng dẫn; 3. Thực thi và kiểm tra kết quả.`,
          suggestedAnswerEn: `Follow three standard steps: 1. Initialize file/environment; 2. Enter commands or configure parameters; 3. Execute and inspect outputs.`,
          pedagogicalTipVi: `Chiếu màn hình mẫu hoặc cung cấp danh sách checklist các bước để học sinh theo dõi.`,
          pedagogicalTipEn: `Project a live demonstration or provide a checklist to guide students step-by-step.`
        },
        {
          id: `p${lessonId}-${sectionIndex}-2`,
          targetCognitiveLevel: 'Thông hiểu',
          targetCognitiveLevelEn: 'Understand',
          questionVi: `Khi thay đổi một tham số đầu vào trong bài thực hành, em quan sát thấy kết quả đầu ra biến đổi như thế nào và vì sao?`,
          questionEn: `When modifying an input parameter during practice, how does the output change, and what explains this behavior?`,
          suggestedAnswerVi: `Kết quả đầu ra phản ánh chính xác quy tắc toán học và logic lập trình; mỗi giá trị đầu vào tạo ra một trạng thái xử lý tương ứng.`,
          suggestedAnswerEn: `Outputs directly reflect underlying mathematical and logical rules; each input change shifts system state accordingly.`,
          pedagogicalTipVi: `Khuyến khích học sinh chủ động thử nghiệm các giá trị biên để quan sát hiện tượng.`,
          pedagogicalTipEn: `Encourage students to test boundary values and observe system reactions firsthand.`
        },
        {
          id: `p${lessonId}-${sectionIndex}-3`,
          targetCognitiveLevel: 'Vận dụng',
          targetCognitiveLevelEn: 'Apply',
          questionVi: `Nếu trong quá trình thực hành xảy ra lỗi chương trình hoặc sai lệch kết quả, em sử dụng kỹ thuật nào để chẩn đoán và sửa lỗi?`,
          questionEn: `If an unexpected runtime error or output discrepancy occurs, what technique do you use to diagnose and debug it?`,
          suggestedAnswerVi: `Đọc kỹ dòng thông báo lỗi, in kiểm tra giá trị các biến trung gian hoặc đặt điểm dừng (breakpoint) để cô lập vị trí phát sinh lỗi.`,
          suggestedAnswerEn: `Carefully examine error traceback lines, print intermediate variable states, or set breakpoints to isolate the fault.`,
          pedagogicalTipVi: `Hướng dẫn học sinh biến việc gặp lỗi thành cơ hội học tập qua quy trình kiểm thử khoa học.`,
          pedagogicalTipEn: `Coach students to treat debugging as an essential learning opportunity using scientific testing methods.`
        }
      ],

      // Stage 4: Luyện tập củng cố & Rèn luyện kỹ năng
      4: [
        {
          id: `p${lessonId}-${sectionIndex}-1`,
          targetCognitiveLevel: 'Nhận biết',
          targetCognitiveLevelEn: 'Remember',
          questionVi: `Bài tập luyện tập của "${titleVi}" yêu cầu xác định những yếu tố đầu vào (Input) và dữ liệu cần xuất ra (Output) nào?`,
          questionEn: `What input parameters and target output specifications are defined in the practice task for "${titleEn}"?`,
          suggestedAnswerVi: `Học sinh chỉ rõ định dạng dữ liệu đầu vào, kiểu dữ liệu kết quả đầu ra và các điều kiện ràng buộc nêu trong SGK trang ${pageNum}.`,
          suggestedAnswerEn: `Students specify input formats, target output data types, and boundary constraints outlined on textbook page ${pageNum}.`,
          pedagogicalTipVi: `Rèn luyện cho học sinh thói quen phân tích bài toán (Input - Process - Output) trước khi bắt tay thực hiện.`,
          pedagogicalTipEn: `Cultivate the habit of analyzing Input - Process - Output structures before beginning implementation.`
        },
        {
          id: `p${lessonId}-${sectionIndex}-2`,
          targetCognitiveLevel: 'Thông hiểu',
          targetCognitiveLevelEn: 'Understand',
          questionVi: `Hãy giải thích từng bước logic để xử lý và biến đổi dữ liệu đầu vào thành kết quả đầu ra mong muốn?`,
          questionEn: `Explain the step-by-step logic required to transform input data into the desired output result?`,
          suggestedAnswerVi: `Mô tả mạch lạc: Khởi tạo biến lưu trữ, duyệt và xử lý từng phần tử, kiểm tra điều kiện thỏa mãn và tổng hợp kết quả cuối cùng.`,
          suggestedAnswerEn: `Articulate clearly: Initialize state variables, process elements sequentially, evaluate conditions, and aggregate final results.`,
          pedagogicalTipVi: `Yêu cầu 1 học sinh lên bảng vẽ sơ đồ khối hoặc viết mã giả (pseudo-code) cho cả lớp nhận xét.`,
          pedagogicalTipEn: `Invite a student to sketch a flowchart or write pseudo-code on the board for peer review.`
        },
        {
          id: `p${lessonId}-${sectionIndex}-3`,
          targetCognitiveLevel: 'Vận dụng cao',
          targetCognitiveLevelEn: 'Analyze',
          questionVi: `Làm thế nào để tối ưu hóa giải pháp này nhằm giảm thiểu thời gian thực thi hoặc xử lý tốt các bộ dữ liệu lớn?`,
          questionEn: `How can this solution be optimized to reduce execution time or handle large-scale datasets gracefully?`,
          suggestedAnswerVi: `Loại bỏ các vòng lặp dư thừa, sử dụng cấu trúc dữ liệu thích hợp và kiểm tra trước các trường hợp đặc biệt để thoát sớm.`,
          suggestedAnswerEn: `Eliminate redundant loop iterations, choose efficient data structures, and implement early-exit validations for special edge cases.`,
          pedagogicalTipVi: `Gợi mở cho học sinh khá giỏi suy nghĩ về độ phức tạp thuật toán và cách viết mã sạch, tối ưu.`,
          pedagogicalTipEn: `Challenge advanced students to consider algorithmic time complexity and clean, performant coding practices.`
        }
      ],

      // Stage 5: Vận dụng thực tiễn & Tình huống sư phạm
      5: [
        {
          id: `p${lessonId}-${sectionIndex}-1`,
          targetCognitiveLevel: 'Nhận biết',
          targetCognitiveLevelEn: 'Remember',
          questionVi: `Trong đời sống thực tế hoặc hoạt động tại trường học, kiến thức bài "${titleVi}" có thể ứng dụng vào lĩnh vực nào?`,
          questionEn: `In daily life or school activities, what domains can benefit directly from applying knowledge of "${titleEn}"?`,
          suggestedAnswerVi: `Ứng dụng tự động hóa tính điểm, quản lý thời khóa biểu, xử lý ảnh tài liệu học tập hoặc thống kê dữ liệu đoàn hội.`,
          suggestedAnswerEn: `Applied to automated grade calculation, timetable scheduling, document image processing, or student club analytics.`,
          pedagogicalTipVi: `Kết nối bài học với các hoạt động thực tế của nhà trường để tạo hứng thú học tập lâu dài.`,
          pedagogicalTipEn: `Connect lesson concepts with real school projects to cultivate long-term intrinsic motivation.`
        },
        {
          id: `p${lessonId}-${sectionIndex}-2`,
          targetCognitiveLevel: 'Thông hiểu',
          targetCognitiveLevelEn: 'Understand',
          questionVi: `Khi triển khai ứng dụng tin học này vào đời sống số, những yêu cầu nào về an toàn dữ liệu, bản quyền và đạo đức cần tuân thủ?`,
          questionEn: `When deploying informatics solutions into the digital world, what data privacy, copyright, and ethical rules must be followed?`,
          suggestedAnswerVi: `Bảo vệ dữ liệu cá nhân, tuân thủ Luật An ninh mạng, tôn trọng bản quyền phần mềm và phòng tránh việc sử dụng công nghệ cho mục đích xấu.`,
          suggestedAnswerEn: `Safeguard personal data, adhere to cybersecurity laws, respect software copyright, and prevent misuse of computing tools.`,
          pedagogicalTipVi: `Tích hợp giáo dục đạo đức số (Digital Citizenship) và văn hóa ứng xử trên không gian mạng.`,
          pedagogicalTipEn: `Integrate digital citizenship education and responsible conduct in cyberspace.`
        },
        {
          id: `p${lessonId}-${sectionIndex}-3`,
          targetCognitiveLevel: 'Vận dụng cao',
          targetCognitiveLevelEn: 'Analyze',
          questionVi: `Em hãy đề xuất một ý tưởng dự án liên môn (Tin học với Toán học, Vật lí hoặc Tiếng Anh) ứng dụng kiến thức bài học này?`,
          questionEn: `Propose an interdisciplinary project idea (combining Informatics with Math, Physics, or English) applying this lesson?`,
          suggestedAnswerVi: `Xây dựng phần mềm mô phỏng chuyển động Vật lý, bảng tính giải phương trình Toán học hoặc từ điển tra cứu thuật ngữ Tin học bằng Tiếng Anh.`,
          suggestedAnswerEn: `Develop a physics motion simulation, an automated math solver, or an English-Vietnamese computing terminology glossarizer.`,
          pedagogicalTipVi: `Khuyến khích học sinh làm việc nhóm thực hiện dự án mini, phát triển năng lực STEM và giải quyết vấn đề.`,
          pedagogicalTipEn: `Encourage collaborative mini-projects to nurture interdisciplinary STEM skills and problem-solving.`
        }
      ]
    };

    const templates = stageTemplates[stage] || stageTemplates[1];
    const existingIds = new Set(basePrompts.map((p) => p.id));

    for (const prompt of templates) {
      if (basePrompts.length >= 3) break;
      let uniqueId = prompt.id;
      let counter = basePrompts.length + 1;
      while (existingIds.has(uniqueId)) {
        uniqueId = `p${lessonId}-${sectionIndex}-gen-${counter++}`;
      }
      existingIds.add(uniqueId);
      basePrompts.push({
        ...prompt,
        id: uniqueId
      });
    }
  }

  return {
    sectionId: existing?.sectionId || `section-${lessonId}-${sectionIndex}`,
    sectionTitleVi: existing?.sectionTitleVi || `${titleVi} - Phần ${sectionIndex + 1}`,
    sectionTitleEn: existing?.sectionTitleEn || `${titleEn} - Section ${sectionIndex + 1}`,
    prompts: basePrompts.slice(0, 3)
  };
};





