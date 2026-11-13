import { QuizQuestion } from './lesson2Data';
import { TermDefinition } from './lessonData';

export const LESSON_33_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: 'Theo SGK Tin học 10, thiết kế đồ hoạ là gì?',
    questionEn: 'According to Informatics 10 textbook, what is graphic design?',
    optionsVi: [
      'Chỉ là việc dùng máy tính để vẽ các bức tranh phong cảnh nghệ thuật',
      'Việc dàn dựng bố cục, sắp xếp, chỉnh sửa hình ảnh, lựa chọn màu sắc để sáng tạo các thông điệp truyền thông hấp dẫn phục vụ tuyên truyền hoặc kinh doanh',
      'Quá trình lập trình mã nguồn bằng Python để tạo trò chơi điện tử',
      'Việc in ấn các tài liệu văn bản đen trắng từ máy in văn phòng'
    ],
    optionsEn: [
      'Merely using a computer to draw artistic landscape paintings',
      'Composing layouts, arranging, editing images, and selecting colors to create compelling media communications for promotion or business',
      'Writing Python source code to build electronic video games',
      'Printing black-and-white text documents from office printers'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 156 định nghĩa: "Thiết kế đồ hoạ là việc dàn dựng bố cục, sắp xếp, chỉnh sửa hình ảnh, lựa chọn màu sắc để sáng tạo các thông điệp truyền thông hấp dẫn và thu hút, đáp ứng yêu cầu truyền đạt thông tin một cách hiệu quả nhằm phục vụ mục đích tuyên truyền hoặc kinh doanh."',
    explanationEn: 'Textbook page 156 defines: "Graphic design is the composition of layout, arranging, editing images, and choosing colors to create attractive media communications that convey information effectively for advocacy or commercial purposes."'
  },
  {
    id: 2,
    questionVi: 'Các thành phần cơ bản cấu tạo nên một hình ảnh đồ hoạ bao gồm những gì?',
    questionEn: 'What are the fundamental components comprising a graphic visual?',
    optionsVi: [
      'Chỉ gồm các con số và phép toán logic',
      'Văn bản, các đối tượng hình ảnh (đường nét, hình cơ bản, hình vẽ, ảnh chụp), và màu sắc',
      'Chỉ bao gồm các bức ảnh chụp kỹ thuật số từ máy ảnh',
      'Chỉ gồm các khối văn bản thuần tuý không có kiểu chữ'
    ],
    optionsEn: [
      'Only numbers and logical arithmetic operations',
      'Text, visual elements (lines, basic shapes, illustrations, photos), and color palettes',
      'Only digital photographs taken from cameras',
      'Only plain unformatted text blocks'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 156 nêu rõ: "Các hình ảnh đồ hoạ thường bao gồm nhiều thành phần như văn bản, các đối tượng hình ảnh như các đường, các hình cơ bản hay hình vẽ, ảnh chụp, màu sắc,... Nhiệm vụ của người thiết kế đồ hoạ là lựa chọn, vẽ, cắt, ghép, sắp xếp các thành phần trên để tạo thành sản phẩm hoàn chỉnh."',
    explanationEn: 'Textbook page 156 specifies: "Graphic visuals typically incorporate multiple elements including typography text, visual shapes like lines, geometric primitives or illustrations, photographs, and color schemes. The designer selects, draws, crops, merges, and arranges these parts into a unified whole."'
  },
  {
    id: 3,
    questionVi: 'Trong các công việc sau ở Hình 33.1 SGK, công việc nào liên quan TRỰC TIẾP và mật thiết nhất đến thiết kế đồ hoạ?',
    questionEn: 'Among the occupations shown in Figure 33.1 of the textbook, which one is most DIRECTLY related to graphic design?',
    optionsVi: [
      'Phát thanh viên truyền hình',
      'Thư kí văn phòng',
      'Kiến trúc sư',
      'Thợ sửa xe cơ khí'
    ],
    optionsEn: [
      'Television news broadcaster',
      'Office secretary',
      'Architect',
      'Automotive mechanic'
    ],
    correctIndex: 2,
    explanationVi: 'SGK Trang 156 và 157 chỉ ra Kiến trúc sư (Hình 33.1) liên quan trực tiếp đến thiết kế đồ hoạ vì cần vẽ phối cảnh, thiết kế mặt bằng 2D/3D, phối màu và trình bày hồ sơ kiến trúc trực quan. (Bên cạnh đó, thợ may cũng ứng dụng đồ hoạ trong thiết kế mẫu rập và hoa văn).',
    explanationEn: 'Textbook pages 156 and 157 highlight that Architects directly apply graphic design for 2D/3D floor planning, spatial perspective rendering, color palettes, and presentation dossiers.'
  },
  {
    id: 4,
    questionVi: 'Theo Hộp ghi nhớ Trang 157 SGK, thiết kế đồ hoạ đem lại những lợi ích cốt lõi nào?',
    questionEn: 'According to the summary box on page 157, what core benefits does graphic design bring?',
    optionsVi: [
      'Chỉ giúp máy tính chạy nhanh hơn và tăng dung lượng RAM',
      'Tạo dựng hình ảnh chuyên nghiệp cho tổ chức/cá nhân, mang lại trải nghiệm thu hút cho độc giả, và tăng hiệu quả tiếp thị/doanh thu',
      'Thay thế hoàn toàn nhu cầu giao tiếp trực tiếp giữa con người',
      'Giảm thiểu hoàn toàn lỗi cú pháp trong lập trình phần mềm'
    ],
    optionsEn: [
      'Only accelerates computer processing speeds and increases RAM',
      'Builds professional branding for entities/individuals, delivers compelling reader experiences, and increases marketing efficacy & sales',
      'Completely replaces the need for face-to-face human interactions',
      'Entirely eliminates syntax errors in software programming'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 157 liệt kê 3 lợi ích lớn: (1) Tạo dựng hình ảnh chuyên nghiệp qua logo, ấn phẩm, mạng xã hội; (2) Mang lại trải nghiệm thị giác ấn tượng cho người xem; (3) Tăng hiệu quả tiếp thị và doanh thu qua tờ rơi, áp phích quảng cáo.',
    explanationEn: 'Textbook page 157 details three major benefits: building professional brand identity, delivering memorable viewer experiences, and elevating marketing impact and commercial revenues.'
  },
  {
    id: 5,
    questionVi: 'Trong số các phần mềm sau, phần mềm nào KHÔNG PHẢI là phần mềm thiết kế đồ hoạ máy tính được nhắc tới trong SGK?',
    questionEn: 'Among the following software applications, which one is NOT a graphic design software mentioned in the textbook?',
    optionsVi: [
      'Adobe Photoshop, GIMP',
      'CorelDraw, InDesign, Scribus',
      'AutoCAD, SolidWorks, Corel Designer',
      'Microsoft Excel, IDLE Python Shell'
    ],
    optionsEn: [
      'Adobe Photoshop, GIMP',
      'CorelDraw, InDesign, Scribus',
      'AutoCAD, SolidWorks, Corel Designer',
      'Microsoft Excel, IDLE Python Shell'
    ],
    correctIndex: 3,
    explanationVi: 'SGK Trang 157 liệt kê các phần mềm đồ hoạ phổ biến: Adobe Photoshop, CorelDraw, GIMP, InDesign, Scribus, AutoCAD, Corel Designer, Solid Works,... Excel là bảng tính và IDLE là môi trường lập trình Python, không phải phần mềm chuyên dụng thiết kế đồ họa.',
    explanationEn: 'Textbook page 157 lists graphic design tools including Photoshop, CorelDraw, GIMP, InDesign, Scribus, AutoCAD, Corel Designer, SolidWorks. Excel is a spreadsheet and IDLE is a Python development environment.'
  },
  {
    id: 6,
    questionVi: 'Người làm nghề thiết kế đồ hoạ cần trang bị những kĩ năng và tố chất nào sau đây theo SGK Trang 158?',
    questionEn: 'Which skills and qualities must a computer graphic designer acquire according to textbook page 158?',
    optionsVi: [
      'Khả năng sáng tạo và cảm nhận cái đẹp',
      'Thành thạo máy tính, thiết bị thông minh và các phần mềm đồ họa',
      'Kiến thức rộng về khoa học, xã hội, kĩ năng tự học và tư duy phản biện',
      'Tất cả các yếu tố trên đều cần thiết'
    ],
    optionsEn: [
      'Creativity and aesthetic sensibility',
      'Proficiency in computers, smart devices, and specialized graphic design software',
      'Broad knowledge of science, society, self-learning agility, and critical thinking',
      'All of the above are essential'
    ],
    correctIndex: 3,
    explanationVi: 'SGK Trang 158 khẳng định người thiết kế đồ hoạ cần sự kết hợp toàn diện giữa: khả năng sáng tạo, cảm nhận cái đẹp, thành thạo công cụ phần mềm, hiểu biết công nghệ in ấn, kiến thức rộng liên ngành và năng lực tự học cập nhật xu hướng mới.',
    explanationEn: 'Textbook page 158 confirms that a designer requires a comprehensive blend of aesthetic creativity, software mastery, printing knowledge, interdisciplinary awareness, and lifelong learning.'
  },
  {
    id: 7,
    questionVi: 'Tại sao người làm thiết kế đồ hoạ cần có hiểu biết nhất định về công nghệ in ấn (Printing Technology)?',
    questionEn: 'Why do graphic designers benefit from understanding printing technology?',
    optionsVi: [
      'Để trực tiếp đi sửa máy in khi hỏng linh kiện điện tử',
      'Để thiết kế ra các ấn phẩm phù hợp với khổ giấy, hệ màu in (CMYK), độ phân giải (DPI) và chất liệu in thực tế mà không bị sai màu hay mờ vỡ',
      'Vì phần mềm đồ hoạ chỉ hoạt động khi kết nối với máy in công nghiệp',
      'Để học cách lập trình chip điều khiển cho đầu phun mực'
    ],
    optionsEn: [
      'To physically repair printer circuit boards when damaged',
      'To design publications aligned with standard page dimensions, printing color modes (CMYK), resolution (DPI), and physical substrates to prevent color drift or pixelation',
      'Because graphic software functions only when tethered to an industrial press',
      'To program microcontroller firmware for printheads'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 157 nhấn mạnh: "kiến thức về công nghệ in ấn cũng là điểm cộng đối với những người làm thiết kế đồ hoạ". Hiểu biết in ấn giúp nhà thiết kế chuẩn bị đúng hệ màu CMYK, độ phân giải 300 DPI, bù lề xén (bleed) để ấn phẩm in ra chuẩn xác như trên màn hình.',
    explanationEn: 'Textbook page 157 notes printing tech is a key asset. It ensures proper CMYK conversion, 300 DPI print resolution, and cutting bleeds, preventing real-world production defects.'
  },
  {
    id: 8,
    questionVi: 'Theo SGK Trang 158 – 159, các cơ sở đào tạo nào cung cấp chương trình học về thiết kế đồ hoạ?',
    questionEn: 'According to textbook pages 158–159, what institutions provide training in graphic design?',
    optionsVi: [
      'Chỉ có thể tự học qua xem video trên mạng, không có trường nào đào tạo',
      'Các trung tâm dạy nghề, trường nghề, và các trường đại học, cao đẳng về mĩ thuật, kiến trúc, thiết kế hoặc công nghệ thông tin',
      'Chỉ duy nhất các trường đại học y khoa',
      'Chỉ các học viện âm nhạc và múa cổ truyền'
    ],
    optionsEn: [
      'Only informal online videos as no formal schools offer graphic design',
      'Vocational training centers, colleges, and universities specializing in fine arts, architecture, design, or information technology',
      'Exclusively medical universities',
      'Only traditional music and dance academies'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 158 chỉ rõ: Học sinh có thể học tại các trung tâm, trường dạy nghề, hoặc theo học bậc ĐH, CĐ tại các trường về mĩ thuật, kiến trúc, thiết kế hoặc các khoa Công nghệ thông tin có đào tạo Thiết kế đồ hoạ máy tính.',
    explanationEn: 'Textbook page 158 outlines diverse pathways: vocational training colleges, or university degree programs in Fine Arts, Architecture, Industrial/Graphic Design, and IT departments.'
  },
  {
    id: 9,
    questionVi: 'Câu 1 phần Luyện tập SGK Trang 159: "Thiết kế đồ hoạ là thao tác nào sau đây?"',
    questionEn: 'Practice Question 1 on page 159: "Graphic design involves which of the following operations?"',
    optionsVi: [
      'A. Tạo ra các thành phần đồ hoạ',
      'B. Lựa chọn các thành phần đồ hoạ',
      'C. Sắp xếp các thành phần đồ hoạ',
      'D. Tất cả các thao tác trên'
    ],
    optionsEn: [
      'A. Creating graphical elements',
      'B. Selecting graphical elements',
      'C. Arranging graphical elements',
      'D. All of the above operations'
    ],
    correctIndex: 3,
    explanationVi: 'Đáp án chuẩn SGK: D. Thiết kế đồ hoạ là quá trình tổng hợp bao gồm tạo mới (vẽ, chụp, gõ chữ), lựa chọn thành phần phù hợp và sắp xếp, dàn dựng bố cục hài hoà thành ấn phẩm hoàn chỉnh.',
    explanationEn: 'Standard textbook answer: D. Graphic design integrates creating assets, curating relevant elements, and harmoniously composing layouts into final deliverables.'
  },
  {
    id: 10,
    questionVi: 'Sau khi tốt nghiệp ngành thiết kế đồ hoạ, người học có thể làm việc ở những đâu (SGK Trang 159)?',
    questionEn: 'Upon graduating with a degree in graphic design, where can professionals work (Textbook page 159)?',
    optionsVi: [
      'Công ty quảng cáo, truyền thông, sự kiện, studio nghệ thuật, xưởng phim, đài truyền hình, toà soạn báo chí',
      'Tự mở doanh nghiệp thiết kế riêng, làm studio dịch vụ, giảng dạy hoặc tư vấn',
      'Làm thêm tại nhà (Freelance) nhận dự án thiết kế website, logo thương hiệu độc lập',
      'Tất cả các môi trường và hình thức làm việc nêu trên'
    ],
    optionsEn: [
      'Advertising, PR and media agencies, event organizers, art studios, animation studios, television networks, publishing houses',
      'Founding a private design studio, consulting, or teaching in educational institutes',
      'Working from home as a freelance designer on website branding and identity projects',
      'All of the above workplaces and flexible employment models'
    ],
    correctIndex: 3,
    explanationVi: 'SGK Trang 159 khẳng định: "Nhu cầu lao động trong ngành rất cao... sinh viên có thể làm tại công ty quảng cáo, toà soạn, đài truyền hình, studio, xưởng phim; tự lập doanh nghiệp; hoặc làm việc tự do tại nhà (freelance) nhận dự án."',
    explanationEn: 'Textbook page 159 highlights the vast demand: corporate agencies, broadcasting networks, publishing houses, founding independent studios, or working remotely as freelance creators.'
  }
];

export const LESSON_33_GLOSSARY: TermDefinition[] = [
  {
    id: 'graphic-design',
    termVi: 'Thiết kế đồ hoạ máy tính (Computer Graphic Design)',
    termEn: 'Computer Graphic Design',
    ipa: '/kəmˈpjuː.tər ˈɡræf.ɪk dɪˈzaɪn/',
    definitionVi: 'Lĩnh vực nghệ thuật ứng dụng sử dụng máy tính và phần mềm chuyên dụng để dàn dựng bố cục, chỉnh sửa hình ảnh, lựa chọn kiểu chữ và màu sắc nhằm tạo ra thông điệp truyền thông thị giác hấp dẫn phục vụ tuyên truyền hoặc kinh doanh.',
    definitionEn: 'An applied visual arts field utilizing computers and specialized software to compose layouts, manipulate images, select typography, and curate color palettes to produce engaging visual communication for promotion or business.',
    exampleVi: 'Dàn dựng áp phích du lịch Việt Nam, tạo logo và biểu ngữ website.',
    exampleEn: 'Designing Vietnam tourism posters, logos, and digital web banners.',
    sgkContext: 'SGK Trang 156 – Mục 1'
  },
  {
    id: 'visual-media-message',
    termVi: 'Thông điệp truyền thông thị giác (Visual Media Message)',
    termEn: 'Visual Media Message',
    ipa: '/ˈvɪʒ.u.əl ˈmiː.di.ə ˈmes.ɪdʒ/',
    definitionVi: 'Nội dung thông tin, ý tưởng hay cảm xúc được mã hoá qua sự kết hợp hài hoà giữa văn bản (typography), hình ảnh (illustrations/photos), bố cục và màu sắc để truyền tải đến người xem một cách trực quan, thuyết phục.',
    definitionEn: 'Informational content or conceptual narrative encoded through harmonious synergy of typography, visual imagery, layout hierarchy, and color harmony to persuasively connect with audiences.',
    exampleVi: 'Áp phích quảng bá du lịch kích thích mong muốn trải nghiệm văn hoá.',
    exampleEn: 'Tourism promotion posters evoking desire for cultural travel.',
    sgkContext: 'SGK Trang 156 – Hoạt động 1'
  },
  {
    id: 'graphic-publications',
    termVi: 'Ấn phẩm đồ hoạ (Graphic Publications)',
    termEn: 'Graphic Publications',
    ipa: '/ˈɡræf.ɪk ˌpʌb.lɪˈkeɪ.ʃənz/',
    definitionVi: 'Các sản phẩm thiết kế đồ hoạ đa dạng dưới dạng in ấn hoặc kỹ thuật số, bao gồm: logo, danh thiếp, bìa sách, áp phích, tờ rơi, biển hiệu quảng cáo, bao bì sản phẩm, giao diện website, ứng dụng di động.',
    definitionEn: 'Diverse physical or digital communication deliverables crafted by designers, including logos, business cards, book covers, posters, brochures, billboards, packaging, and digital web/app interfaces.',
    exampleVi: 'Tờ rơi, catalogue giới thiệu sản phẩm và bìa sách Tin học 10.',
    exampleEn: 'Flyers, product catalogues, and textbook covers.',
    sgkContext: 'SGK Trang 156 – Mục 1'
  },
  {
    id: 'brand-identity',
    termVi: 'Bộ nhận diện thương hiệu (Brand Identity Suite)',
    termEn: 'Brand Identity Suite',
    ipa: '/brænd aɪˈden.tə.ti swiːt/',
    definitionVi: 'Hệ thống các yếu tố thị giác đồng bộ (logo, màu sắc chủ đạo, font chữ chuẩn, danh thiếp, phong bì thư, thẻ nhân viên, biển hiệu) giúp nhận diện và khắc sâu hình ảnh chuyên nghiệp, độc đáo của một tổ chức hoặc thương hiệu trong tâm trí công chúng.',
    definitionEn: 'A coherent visual system (logo, color system, typography guidelines, stationery, employee badges, signage) establishing an authoritative and distinctive identity for an organization in the public mind.',
    exampleVi: 'Bộ nhận diện với logo hoa sen vàng của Hãng hàng không Quốc gia.',
    exampleEn: 'A corporate identity system with golden lotus emblem for national airline.',
    sgkContext: 'SGK Trang 157 – Lợi ích thiết kế'
  },
  {
    id: 'raster-vector-software',
    termVi: 'Phần mềm đồ hoạ Raster & Vector (Raster vs. Vector Software)',
    termEn: 'Raster vs. Vector Software',
    ipa: '/ˈræs.tər vɜː.səs ˈvek.tər ˈsɒft.weər/',
    definitionVi: 'Hai nhóm phần mềm nền tảng: phần mềm xử lý điểm ảnh Raster (như Photoshop, GIMP) chuyên xử lý ảnh chụp, đổ bóng; và phần mềm đồ họa toạ độ Vector (như Illustrator, CorelDraw, Inkscape) chuyên vẽ logo, hình học có thể phóng to vô hạn mà không vỡ hạt.',
    definitionEn: 'Two foundational software paradigms: pixel-based Raster editors (e.g., Photoshop, GIMP) for photography and shading; and geometric Vector tools (e.g., Illustrator, CorelDraw, Inkscape) for infinitely scalable logos and line-art.',
    exampleVi: 'Photoshop dùng chỉnh sửa ảnh; Illustrator dùng vẽ logo và icon.',
    exampleEn: 'Photoshop for photo retouching; Illustrator for logos and vector icons.',
    sgkContext: 'SGK Trang 157 – Mục 2'
  },
  {
    id: 'cmyk-printing-tech',
    termVi: 'Công nghệ in ấn & Hệ màu CMYK (Printing Tech & CMYK)',
    termEn: 'Printing Tech & CMYK Color Space',
    ipa: '/ˈprɪn.tɪŋ tek ænd ˌsiː.em.waɪˈkeɪ/',
    definitionVi: 'Kiến thức về kỹ thuật in công nghiệp (in Offset, in Flexo, in kỹ thuật số), chế bản, độ phân giải in tiêu chuẩn 300 DPI và hệ 4 màu mực in Cyan-Magenta-Yellow-Black (CMYK) khác biệt với hệ màu phát quang Red-Green-Blue (RGB) trên màn hình máy tính.',
    definitionEn: 'Industrial printing processes (Offset, Flexo, Digital), prepress output, 300 DPI resolution standards, and the 4-ink subtractive CMYK color model distinct from luminous screen-based RGB.',
    exampleVi: 'Chuyển ảnh từ RGB sang CMYK trước khi gửi tệp đến xưởng in sách.',
    exampleEn: 'Converting graphics from RGB to CMYK prior to press output.',
    sgkContext: 'SGK Trang 157 – Mục 2'
  },
  {
    id: 'layout-grid-system',
    termVi: 'Bố cục & Hệ thống lưới (Layout & Grid System)',
    termEn: 'Layout & Grid System',
    ipa: '/ˈleɪ.aʊt ænd ɡrɪd ˈsɪs.təm/',
    definitionVi: 'Quy tắc tổ chức, phân chia không gian và sắp đặt các thành phần thị giác (tiêu đề, hình khối, khoảng trắng) theo trật tự logic, hướng dẫn mắt người xem lướt qua thông điệp chính một cách tự nhiên và mạch lạc nhất.',
    definitionEn: 'Principles for partitioning spatial surfaces and organizing visual hierarchy (headlines, graphics, negative whitespace) along geometric grids to naturally guide viewer focal attention.',
    exampleVi: 'Áp dụng hệ thống lưới 12 cột để dàn trang tạp chí chuyên nghiệp.',
    exampleEn: 'Applying a 12-column grid layout for editorial magazine spreads.',
    sgkContext: 'SGK Trang 156 – Mục 1'
  },
  {
    id: 'cad-3d-tools',
    termVi: 'Phần mềm CAD & Mô hình 3D (CAD & 3D Modeling Tools)',
    termEn: 'CAD & 3D Modeling Tools',
    ipa: '/kæd ænd θriː diː ˈmɒd.əl.ɪŋ tuːlz/',
    definitionVi: 'Các phần mềm đồ hoạ chuyên dụng hỗ trợ thiết kế kĩ thuật và kiến trúc (như AutoCAD, SolidWorks, Corel Designer), cho phép dựng mô hình 3D, bản vẽ kĩ thuật chính xác từng milimet cho sản xuất công nghiệp và xây dựng.',
    definitionEn: 'Specialized drafting and engineering graphic suites (e.g., AutoCAD, SolidWorks) empowering precise millimeter-accurate 2D/3D modeling for architecture, construction, and mechanical prototyping.',
    exampleVi: 'Kiến trúc sư dùng AutoCAD vẽ mặt bằng nhà và SolidWorks vẽ chi tiết máy.',
    exampleEn: 'Architects use AutoCAD for floor plans and SolidWorks for machine assemblies.',
    sgkContext: 'SGK Trang 157 – Hình 33.1 & Mục 2'
  },
  {
    id: 'freelance-designer',
    termVi: 'Thiết kế tự do / Freelancing (Freelance Graphic Designer)',
    termEn: 'Freelance Graphic Designer',
    ipa: '/ˈfriː.lɑːns ˈɡræf.ɪk dɪˈzaɪ.nər/',
    definitionVi: 'Phương thức làm việc tự chủ, linh hoạt trong đó người thiết kế đồ hoạ không bị ràng buộc bởi một hợp đồng lao động cố định mà độc lập nhận dự án theo hợp đồng dịch vụ từ nhiều khách hàng trên toàn cầu qua internet.',
    definitionEn: 'An autonomous employment model wherein designers work independently, securing contractual design engagements from diverse domestic and international clients remotely over digital channels.',
    exampleVi: 'Làm việc tại nhà thiết kế giao diện web và nhận thù lao theo từng dự án.',
    exampleEn: 'Working from home on web UI contracts paid per milestone.',
    sgkContext: 'SGK Trang 159 – Mục 3'
  },
  {
    id: 'digital-career-gateways',
    termVi: 'Cổng thông tin hướng nghiệp số (Digital Career Gateways)',
    termEn: 'Digital Career Gateways',
    ipa: '/ˈdɪdʒ.ɪ.təl kəˈrɪər ˈɡeɪt.weɪz/',
    definitionVi: 'Các nền tảng trực tuyến (Google Search, Bing, LinkedIn, Vietnamworks, Behance, Dribbble) kết nối nhà thiết kế với cộng đồng nghề nghiệp, cung cấp thông tin tuyển dụng, xu hướng thiết kế và cơ hội phỏng vấn việc làm thời đại 4.0.',
    definitionEn: 'Online job boards and professional creative networks (LinkedIn, Vietnamworks, Behance, Dribbble) connecting creators with employers, portfolio feedback, market compensation data, and remote gigs.',
    exampleVi: 'Tìm việc làm bằng từ khoá "thiết kế đồ hoạ" trên LinkedIn và Vietnamworks.',
    exampleEn: 'Searching for graphic design roles on LinkedIn and recruitment platforms.',
    sgkContext: 'SGK Trang 159 – Mục 3'
  }
];
