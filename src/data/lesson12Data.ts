import { TermDefinition } from './lessonData';
import { QuizQuestion } from './lesson2Data';

export const LESSON_12_GLOSSARY: TermDefinition[] = [
  {
    id: 'graphic-design',
    termVi: 'Thiết kế đồ hoạ',
    termEn: 'Graphic Design',
    ipa: '/ˈɡræf.ɪk dɪˈzaɪn/',
    definitionVi: 'Quá trình thiết kế các thông điệp truyền thông bằng hình ảnh; giải quyết vấn đề thông qua sự kết hợp giữa hình ảnh, kiểu chữ với ý tưởng để truyền tải thông tin đến người xem.',
    definitionEn: 'The art and practice of planning and projecting ideas and experiences with visual and textual content to communicate messages effectively.',
    exampleVi: 'Thiết kế áp phích tuyên truyền phòng chống dịch bệnh hoặc logo nhận diện trường học là các sản phẩm của thiết kế đồ hoạ.',
    exampleEn: 'Designing health campaign posters or school identity logos are prominent products of graphic design.',
    sgkContext: 'SGK Tin học 10 Kết nối tri thức - Trang 63'
  },
  {
    id: 'bitmap-graphics',
    termVi: 'Đồ hoạ điểm ảnh (Raster/Bitmap)',
    termEn: 'Raster / Bitmap Graphics',
    ipa: '/ˈræstər / ˈbɪtmæp ˈɡræfɪks/',
    definitionVi: 'Loại đồ hoạ biểu diễn hình ảnh bằng một lưới các điểm ảnh (pixel), mỗi điểm ảnh có màu sắc và tọa độ riêng. Khi phóng to sẽ bị vỡ hình, nhòe và răng cưa.',
    definitionEn: 'Digital images created from a grid of individual colored pixels; scaling up causes pixelation, blurring, and loss of clarity.',
    exampleVi: 'Ảnh chụp chân dung từ máy ảnh hoặc điện thoại thông minh là đồ hoạ điểm ảnh.',
    exampleEn: 'Portrait photographs taken with digital cameras or smartphones are raster bitmap graphics.',
    sgkContext: 'SGK Tin học 10 Kết nối tri thức - Trang 63 – 64'
  },
  {
    id: 'vector-graphics',
    termVi: 'Đồ hoạ vectơ',
    termEn: 'Vector Graphics',
    ipa: '/ˈvɛktər ˈɡræfɪks/',
    definitionVi: 'Loại đồ hoạ biểu diễn hình ảnh bằng các đường nét, hình khối được xác định theo phương trình toán học (điểm đầu, điểm cuối, bán kính, đường cong). Có thể co giãn tùy ý mà không bị vỡ hình.',
    definitionEn: 'Digital artwork defined by mathematical formulas (lines, curves, coordinates, nodes) allowing infinite scaling without quality degradation.',
    exampleVi: 'Logo công ty hoặc biểu tượng quốc kỳ được vẽ bằng đồ hoạ vectơ để in ấn mọi kích cỡ.',
    exampleEn: 'Corporate logos and national flags are crafted in vector graphics for scalable multi-format reproduction.',
    sgkContext: 'SGK Tin học 10 Kết nối tri thức - Trang 63 – 64'
  },
  {
    id: 'pixel',
    termVi: 'Điểm ảnh (Pixel)',
    termEn: 'Picture Element (Pixel)',
    ipa: '/ˈpɪksəl/',
    definitionVi: 'Phần tử cơ bản nhỏ nhất cấu tạo nên một bức ảnh kỹ thuật số dạng điểm ảnh, mang thông tin về màu sắc và độ sáng.',
    definitionEn: 'The smallest addressable element in a raster image, holding specific color and brightness values.',
    exampleVi: 'Một bức ảnh độ phân giải Full HD chứa hơn 2 triệu điểm ảnh pixel ghép lại.',
    exampleEn: 'A Full HD image comprises over two million discrete pixels assembled into a continuous scene.',
    sgkContext: 'SGK Tin học 10 Kết nối tri thức - Trang 63'
  },
  {
    id: 'inkscape',
    termVi: 'Phần mềm Inkscape',
    termEn: 'Inkscape Software',
    ipa: '/ˈɪŋkˌskeɪp ˈsɔːftweər/',
    definitionVi: 'Phần mềm mã nguồn mở và miễn phí chuyên nghiệp dùng để tạo, chỉnh sửa và xử lý các sản phẩm đồ hoạ vectơ, sử dụng định dạng chuẩn W3C SVG.',
    definitionEn: 'A free and open-source professional vector graphics editor utilizing the World Wide Web Consortium (W3C) SVG file standard.',
    exampleVi: 'Học sinh có thể tải miễn phí phần mềm Inkscape từ trang web inkscape.org để học vẽ đồ hoạ.',
    exampleEn: 'Students can download Inkscape at no charge from inkscape.org to master digital vector illustration.',
    sgkContext: 'SGK Tin học 10 Kết nối tri thức - Trang 64 – 65'
  },
  {
    id: 'canvas-page',
    termVi: 'Vùng làm việc & Trang in',
    termEn: 'Canvas & Page Border',
    ipa: '/ˈkænvəs ænd peɪdʒ ˈbɔːrdər/',
    definitionVi: 'Toàn bộ vùng nền trắng trong Inkscape gọi là vùng làm việc (Canvas) để vẽ tự do; khung hình chữ nhật ở giữa là trang in tương ứng với kích thước khổ giấy khi in xuất sản phẩm.',
    definitionEn: 'The infinite white background in Inkscape where objects are drawn, containing a bordered rectangular page representing print dimensions.',
    exampleVi: 'Khi vẽ trong Inkscape, ta nên căn chỉnh các hình vào trong khung trang in để thuận tiện xuất file PDF.',
    exampleEn: 'In Inkscape, aligning finished objects within the page border ensures proper pagination upon PDF export.',
    sgkContext: 'SGK Tin học 10 Kết nối tri thức - Trang 65'
  },
  {
    id: 'layer-z-order',
    termVi: 'Thứ tự lớp (Lớp vẽ / Z-Order)',
    termEn: 'Layer Stacking Order (Z-Order)',
    ipa: '/ˈleɪər ˈstækɪŋ ˈɔːrdər/',
    definitionVi: 'Thứ tự hiển thị trước - sau của các đối tượng đồ họa trong bản vẽ: đối tượng vẽ trước mặc định ở lớp dưới, đối tượng vẽ sau nằm ở lớp trên đè lên.',
    definitionEn: 'The front-to-back arrangement of overlapping graphic objects on the drawing plane, determining which elements obscure others.',
    exampleVi: 'Dùng lệnh Lower to bottom để hạ hình chữ nhật đỏ xuống dưới cho ngôi sao vàng nổi lên trong lá cờ Tổ quốc.',
    exampleEn: 'Use the Lower to bottom command to sink the red field beneath the yellow star when assembling the Vietnam flag.',
    sgkContext: 'SGK Tin học 10 Kết nối tri thức - Trang 66 – 67'
  },
  {
    id: 'fill-stroke',
    termVi: 'Màu tô & Màu vẽ (Màu viền)',
    termEn: 'Fill Color & Stroke Color',
    ipa: '/fɪl ˈkʌlər ænd stroʊk ˈkʌlər/',
    definitionVi: 'Màu tô (Fill) là màu lấp đầy bên trong hình khép kín (nhấp chuột vào bảng màu); màu vẽ (Stroke) là màu của đường viền bao quanh đối tượng (nhấn giữ phím Shift khi nhấp màu).',
    definitionEn: 'Fill color fills the interior of a closed shape (direct click), while stroke color colors the perimeter outline (Shift + click).',
    exampleVi: 'Hình tròn có ruột màu cam và đường viền màu đỏ được tạo bằng cách nhấp màu cam rồi giữ Shift nhấp màu đỏ.',
    exampleEn: 'A circle with orange interior and red outline is styled by clicking orange, then holding Shift and clicking red.',
    sgkContext: 'SGK Tin học 10 Kết nối tri thức - Trang 67'
  },
  {
    id: 'duplicate',
    termVi: 'Nhân bản đối tượng (Duplicate)',
    termEn: 'Object Duplication',
    ipa: '/ˈdjuːplɪkeɪt ˈɒbdʒɛkt/',
    definitionVi: 'Thao tác tạo ra một bản sao y hệt của đối tượng đang chọn, bản sao nằm đè ngay phía trên đối tượng gốc (phím tắt Ctrl + D).',
    definitionEn: 'An operation producing an exact clone placed directly on top of the original element (shortcut Ctrl + D).',
    exampleVi: 'Nhấn Ctrl + D để nhân bản cánh hoa nhiều lần rồi xoay quanh tâm để tạo thành bông hoa đều đặn.',
    exampleEn: 'Press Ctrl + D to duplicate a petal repeatedly, rotating around the pivot to generate a symmetrical flower.',
    sgkContext: 'SGK Tin học 10 Kết nối tri thức - Trang 67'
  },
  {
    id: 'svg-format',
    termVi: 'Định dạng SVG',
    termEn: 'Scalable Vector Graphics (SVG)',
    ipa: '/ˈskeɪləbəl ˈvɛktər ˈɡræfɪks/',
    definitionVi: 'Định dạng tệp đồ hoạ vectơ tiêu chuẩn mở dựa trên XML, cho phép hiển thị hình ảnh 2D sắc nét ở mọi kích cỡ màn hình và thiết bị in ấn.',
    definitionEn: 'An XML-based open standard vector image format for two-dimensional graphics with support for interactivity and infinite scalability.',
    exampleVi: 'Tệp logo lưu dưới định dạng .svg có thể mở và phóng to thu nhỏ trực tiếp trên mọi trình duyệt web mà không vỡ hạt.',
    exampleEn: 'A logo saved as .svg renders cleanly at any zoom level in modern web browsers without rasterization blur.',
    sgkContext: 'SGK Tin học 10 Kết nối tri thức - Trang 67'
  }
];

export const LESSON_12_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: 'Đồ hoạ vectơ được định nghĩa và biểu diễn dựa trên yếu tố cốt lõi nào?',
    questionEn: 'On what foundational mathematical principle are vector graphics defined and rendered?',
    optionsVi: [
      'Một ma trận lưới gồm hàng triệu điểm ảnh pixel độc lập',
      'Các đường nét và hình khối được tính bằng các phương trình toán học',
      'Tập hợp các khối màu được nén theo thuật toán DCT',
      'Các chấm mực in quang học được quét từ máy quét ảnh Scanner'
    ],
    optionsEn: [
      'A grid matrix composed of millions of discrete colored pixels',
      'Mathematical equations defining lines, curves, coordinates, and geometrical paths',
      'Clusters of quantized blocks compressed via Discrete Cosine Transform',
      'Optical ink dots captured directly from a flatbed hardware scanner'
    ],
    correctIndex: 1,
    explanationVi: 'Theo SGK Trang 63: "Trong đồ hoạ vectơ, hình ảnh được xác định theo đường nét, mỗi một đường có điểm đầu và điểm cuối, được tính bằng một phương trình toán học."',
    explanationEn: 'According to page 63: "In vector graphics, images are defined along lines and curves calculated through mathematical formulas."'
  },
  {
    id: 2,
    questionVi: 'Ưu điểm vượt trội nhất của đồ hoạ vectơ so với đồ hoạ điểm ảnh (bitmap) khi thiết kế logo, biển quảng cáo là gì?',
    questionEn: 'What is the greatest advantage of vector graphics over bitmap images when designing logos and billboards?',
    optionsVi: [
      'Thể hiện màu sắc tự nhiên, chuyển tông chân thực như ảnh chụp đời thực',
      'Kích thước tệp luôn nhỏ hơn ảnh bitmap bất kể độ phức tạp của chi tiết',
      'Có thể co giãn phóng to, thu nhỏ tùy ý mà không hề bị vỡ hình hay giảm độ nét',
      'Dễ dàng chụp và quét trực tiếp từ môi trường tự nhiên bằng máy ảnh số'
    ],
    optionsEn: [
      'Rendering ultra-realistic gradients and photo-realistic organic textures',
      'File size is always minuscule regardless of scene complexity',
      'Can be scaled up or down infinitely without pixelation or clarity loss',
      'Can be captured directly from the physical environment with digital cameras'
    ],
    correctIndex: 2,
    explanationVi: 'SGK Trang 63 – 64: Hình ảnh vectơ giữ nguyên độ nét khi phóng to hay thu nhỏ vì các đường nét được máy tính tính toán lại theo phương trình toán học ở mọi kích cỡ.',
    explanationEn: 'Textbook pp. 63–64: Vector graphics preserve absolute razor-sharp edges at any magnification because paths are recalculated mathematically.'
  },
  {
    id: 3,
    questionVi: 'Trong các phần mềm sau đây, cặp phần mềm nào chuyên dùng để tạo và xử lý đồ hoạ vectơ?',
    questionEn: 'Among the following software applications, which pair is dedicated to vector graphics creation and editing?',
    optionsVi: [
      'Adobe Photoshop và GIMP',
      'Inkscape và Adobe Illustrator',
      'Paint và Windows Photos',
      'Microsoft Word và PowerPoint'
    ],
    optionsEn: [
      'Adobe Photoshop and GIMP',
      'Inkscape and Adobe Illustrator',
      'Paint and Windows Photos',
      'Microsoft Word and PowerPoint'
    ],
    correctIndex: 1,
    explanationVi: 'Theo SGK Trang 64: Phần mềm tạo, chỉnh sửa hình vectơ tiêu biểu gồm Adobe Illustrator, CorelDRAW, Inkscape,... trong khi Photoshop và GIMP chuyên xử lý ảnh bitmap.',
    explanationEn: 'Textbook page 64: Leading vector editing suites include Adobe Illustrator, CorelDRAW, and Inkscape; Photoshop and GIMP specialize in raster bitmaps.'
  },
  {
    id: 4,
    questionVi: 'Vùng nền trắng vô hạn trong cửa sổ phần mềm Inkscape được gọi là gì và người dùng có thể vẽ vào đâu?',
    questionEn: 'What is the expansive white workspace in Inkscape called, and where can users create drawings?',
    optionsVi: [
      'Chỉ được vẽ trong khu vực khung hình chữ nhật của Trang in (Page border)',
      'Vùng làm việc (Canvas), và người dùng có thể vẽ vào toàn bộ vùng làm việc',
      'Hộp công cụ (Tool box), chỉ vẽ được khi mở hộp thoại xuất bản',
      'Thanh điều khiển thuộc tính, chỉ vẽ được trên các điểm neo có sẵn'
    ],
    optionsEn: [
      'Strictly inside the rectangular Page Border area',
      'The Canvas, and users can draw anywhere across the entire canvas',
      'The Tool box, exclusively accessible via export dialogs',
      'The Tool control bar, restricted solely to predefined anchor nodes'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 65 & 66: Toàn bộ phần nền trắng gọi là Vùng làm việc (Canvas), ta thực hiện việc thêm các đối tượng vào toàn bộ vùng làm việc để thu được hình vẽ.',
    explanationEn: 'Textbook pp. 65–66: The entire white background is the Canvas; users can draw graphics across the entire canvas area.'
  },
  {
    id: 5,
    questionVi: 'Khi thêm các đối tượng đồ hoạ vào bản vẽ Inkscape, quy luật xếp lớp mặc định diễn ra như thế nào?',
    questionEn: 'When adding multiple graphic shapes in Inkscape, what is the default layer stacking rule?',
    optionsVi: [
      'Đối tượng vẽ sau sẽ tự động hòa trộn trong suốt với đối tượng trước',
      'Đối tượng có kích thước lớn hơn sẽ luôn tự động chìm xuống lớp dưới',
      'Đối tượng vẽ trước sẽ ở lớp dưới, đối tượng vẽ sau sẽ ở lớp trên đè lên',
      'Các đối tượng luôn nằm trên cùng một lớp duy nhất và cắt rời lẫn nhau'
    ],
    optionsEn: [
      'Newer shapes automatically blend with 50% opacity into older shapes',
      'Larger shapes automatically sink to the bottom layer below smaller ones',
      'Earlier drawn objects sit on lower layers; newly drawn objects sit on top',
      'All shapes flatten onto a single layer and permanently slice each other'
    ],
    correctIndex: 2,
    explanationVi: 'Hộp Ghi nhớ Trang 67: "Mỗi hình vẽ bao gồm các đối tượng đồ hoạ. Các đối tượng này sẽ xuất hiện theo thứ tự lớp, các đối tượng vẽ trước sẽ ở lớp dưới, đối tượng vẽ sau sẽ ở lớp trên. Ta có thể thay đổi thứ tự lớp."',
    explanationEn: 'Summary Box page 67: "Objects appear in layer order: previously drawn objects reside below, while subsequently drawn objects sit above. Layer stacking order can be altered."'
  },
  {
    id: 6,
    questionVi: 'Trong Inkscape, để chọn màu tô (Fill) và màu viền (Stroke) cho một đối tượng từ bảng màu, thao tác chuẩn xác là gì?',
    questionEn: 'In Inkscape, what is the precise mouse and keyboard interaction to set Fill and Stroke colors from the palette?',
    optionsVi: [
      'Nháy đúp chuột để chọn màu viền, nháy chuột phải để chọn màu tô',
      'Nháy chuột vào ô màu để chọn màu tô (Fill); giữ phím Shift và nháy chuột vào ô màu để chọn màu viền (Stroke)',
      'Giữ phím Ctrl nháy chuột để chọn màu tô; giữ phím Alt nháy chuột để chọn màu viền',
      'Kéo thả ô màu vào tâm đối tượng để tô viền; kéo thả ra ngoài để tô nền'
    ],
    optionsEn: [
      'Double-click for stroke color; right-click for fill color',
      'Click color swatch for Fill; hold Shift + click color swatch for Stroke',
      'Hold Ctrl to assign Fill; hold Alt to assign Stroke',
      'Drag swatch onto center for Stroke; drag outside for Fill'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 67: "Ta chọn màu tô và màu vẽ trên bảng màu (lưu ý để chọn màu vẽ cần nhấn giữ phím Shift khi chọn màu)."',
    explanationEn: 'Textbook page 67: Select Fill color by clicking the palette; hold Shift while clicking a palette swatch to set Stroke outline color.'
  },
  {
    id: 7,
    questionVi: 'Khi sử dụng công cụ Select (phím F1), việc nháy chuột lần thứ nhất và lần thứ hai lên đối tượng đã chọn khác nhau ở điểm nào?',
    questionEn: 'When using the Select tool (F1), how do the first click and second click on an already selected shape differ?',
    optionsVi: [
      'Lần 1 để đổi màu, lần 2 để xóa đối tượng khỏi bản vẽ',
      'Lần 1 hiển thị các mũi tên để phóng to/thu nhỏ; lần 2 hiển thị các mũi tên cong để xoay và tâm xoay',
      'Lần 1 để khóa vị trí, lần 2 để chuyển đổi thành văn bản',
      'Lần 1 để xuất file ảnh, lần 2 để đổi tên layer'
    ],
    optionsEn: [
      'Click 1 changes palette hues; Click 2 deletes the shape from canvas',
      'Click 1 displays sizing handles (scale/stretch); Click 2 displays rotation arrows and rotation pivot',
      'Click 1 locks coordinates; Click 2 converts paths into editable text',
      'Click 1 exports raster PNG; Click 2 renames the selected layer'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 67 (Hình 12.5c & 12.5d): "Nháy lần một để hiển thị chế độ phóng to thu nhỏ; nháy lần hai để hiển thị chế độ xoay."',
    explanationEn: 'Textbook page 67 (Figures 12.5c & 12.5d): Click once to toggle scaling handles; click a second time to show rotation arrows and rotational pivot.'
  },
  {
    id: 8,
    questionVi: 'Trong bài thực hành vẽ Quốc kì Việt Nam (Trang 67 – 68), thao tác nào sau đây là bắt buộc để lá cờ hiển thị đúng chuẩn ngôi sao vàng trên nền đỏ?',
    questionEn: 'In the practical task of drawing the National Flag of Vietnam (pp. 67–68), which action is required so the golden star displays properly on the red background?',
    optionsVi: [
      'Xóa hình chữ nhật đỏ và dùng công cụ Fill tô màu cả trang in',
      'Chọn hình chữ nhật đỏ và nháy nút lệnh hạ xuống lớp dưới cùng (Lower to bottom / PageDown) để ngôi sao vàng nổi lên trên',
      'Chuyển đổi ngôi sao thành ảnh bitmap rồi dán vào trung tâm',
      'Nhấn tổ hợp phím Ctrl + Shift + D để đảo ngược thứ tự màu'
    ],
    optionsEn: [
      'Deleting the red rectangle and flooding the entire canvas with the bucket fill tool',
      'Selecting the red rectangle and lowering it to the bottom layer so the golden star surfaces on top',
      'Converting the star into a raster bitmap and stamping it centrally',
      'Pressing Ctrl + Shift + D to invert global document color channels'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 68: Vì hình chữ nhật đỏ vẽ sau nên nó ở lớp trên và che khuất ngôi sao vàng vẽ trước. Cần chọn hình chữ nhật và bấm nút hạ xuống lớp dưới để ngôi sao vàng hiển thị nổi lên.',
    explanationEn: 'Textbook page 68: Because the red field was drawn after the star, it overlays on top. One must select the red rectangle and lower it to bottom so the star is visible.'
  },
  {
    id: 9,
    questionVi: 'Trong bài Luyện tập 1 trang 68: Sau khi vẽ một hình tròn, ta nhấp lần lượt các màu Đỏ, Vàng, Cam rồi giữ phím Shift nháy chuột vào màu Đỏ. Kết quả hình tròn sẽ có màu sắc như thế nào?',
    questionEn: 'In Practice 1 (page 68): After drawing a circle, you click swatches Red, Yellow, Orange, then hold Shift and click Red. What will the circle look like?',
    optionsVi: [
      'Màu tô là màu đỏ, không có màu viền',
      'Màu tô là màu vàng, đường viền màu cam',
      'Màu tô (Fill) là màu cam, đường viền (Stroke) là màu đỏ',
      'Cả màu tô và đường viền đều chuyển thành màu đỏ'
    ],
    optionsEn: [
      'Solid red fill with transparent outline stroke',
      'Yellow fill with an orange perimeter stroke',
      'Orange interior fill with a red boundary stroke',
      'Both fill and stroke concurrently become solid red'
    ],
    correctIndex: 2,
    explanationVi: 'Các lần nhấp chuột không giữ Shift sẽ thay đổi màu tô (Fill), lần cuối cùng nhấp màu Cam nên màu tô là Cam. Sau đó giữ Shift nhấp màu Đỏ sẽ đặt màu viền (Stroke) là màu Đỏ.',
    explanationEn: 'Clicking changes Fill (last clicked is Orange); holding Shift and clicking Red assigns the boundary Stroke color to Red.'
  },
  {
    id: 10,
    questionVi: 'Định dạng tệp mặc định chuẩn khi lưu trữ các sản phẩm đồ hoạ vẽ bằng phần mềm Inkscape là gì?',
    questionEn: 'What is the default standard file format when saving vector graphics projects created in Inkscape?',
    optionsVi: [
      '.JPG / .JPEG',
      '.PNG (Portable Network Graphics)',
      '.SVG (Scalable Vector Graphics)',
      '.BMP (Bitmap Picture)'
    ],
    optionsEn: [
      '.JPG / .JPEG',
      '.PNG (Portable Network Graphics)',
      '.SVG (Scalable Vector Graphics)',
      '.BMP (Bitmap Picture)'
    ],
    correctIndex: 2,
    explanationVi: 'SGK Trang 67: "Sau khi hoàn thành việc vẽ hình, em lưu tệp bằng lệnh File/Save hoặc nhấn tổ hợp phím Ctrl + S. Phần mềm Inkscape lưu lại sản phẩm đã tạo dưới dạng tệp hình vectơ có phần mở rộng là .svg."',
    explanationEn: 'Textbook page 67: Inkscape natively stores vector graphic creations under the open Scalable Vector Graphics (.svg) format extension.'
  }
];
