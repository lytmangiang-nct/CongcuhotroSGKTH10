import { TermDefinition } from './lessonData';
import { QuizQuestion } from './lesson2Data';

export const LESSON_13_GLOSSARY: TermDefinition[] = [
  {
    id: 'primitive-shapes',
    termVi: 'Đối tượng hình khối cơ bản',
    termEn: 'Geometric Primitive Shapes',
    ipa: '/ˌdʒiːəˈmɛtrɪk ˈprɪmətɪv ʃeɪps/',
    definitionVi: 'Các hình học định sẵn trong Hộp công cụ Inkscape như hình chữ nhật, hình vuông, hình tròn, elip, cung tròn, đa giác và ngôi sao có thể dễ dàng tùy biến thông số.',
    definitionEn: 'Predefined geometric entities in Inkscape (rectangles, ellipses, arcs, polygons, stars) whose dimensions and geometries are parameterized mathematically.',
    exampleVi: 'Sử dụng công cụ Rectangle (F4) và Stars/Polygons (*) để tạo các đối tượng hình khối cơ bản cho bản vẽ.',
    exampleEn: 'Use the Rectangle (F4) and Stars/Polygons (*) tools to generate primitive geometric objects.',
    sgkContext: 'Mục 1, SGK Tin học 10 Kết nối tri thức - Trang 69'
  },
  {
    id: 'rounded-corner',
    termVi: 'Bán kính bo góc (Rx, Ry)',
    termEn: 'Corner Radius (Rx, Ry)',
    ipa: '/ˈkɔːnər ˈreɪdiəs/',
    definitionVi: 'Thuộc tính xác định độ cong tại các góc của hình chữ nhật/hình vuông; giá trị bằng 0 tạo góc vuông sắc nhọn, giá trị càng lớn góc càng tròn mịn.',
    definitionEn: 'Parameters dictating the curvature radii along rectangle vertices; zero produces sharp corners while higher values yield rounded corners.',
    exampleVi: 'Kéo hai điểm điều khiển hình tròn ở góc trên bên phải của hình chữ nhật để thay đổi giá trị Rx, Ry.',
    exampleEn: 'Drag the circular handles at the top-right vertex of a rectangle to adjust Rx and Ry radii.',
    sgkContext: 'Mục 1, SGK Tin học 10 Kết nối tri thức - Trang 69'
  },
  {
    id: 'spoke-ratio',
    termVi: 'Tỉ lệ nan hoa (Spoke Ratio)',
    termEn: 'Spoke Ratio',
    ipa: '/spoʊk ˈreɪʃioʊ/',
    definitionVi: 'Tỉ lệ giữa bán kính từ tâm đến góc lõm bên trong so với bán kính từ tâm đến đỉnh nhọn bên ngoài của hình sao; giá trị 0.38 - 0.40 tạo ngôi sao 5 cánh cân đối chuẩn.',
    definitionEn: 'The ratio between inner cavity radius and outer tip radius of a star polygon; a ratio of approximately 0.4 yields standard 5-point stars.',
    exampleVi: 'Để vẽ ngôi sao vàng cờ Tổ quốc cân đối, ta thiết lập Corners = 5 và Spoke ratio = 0.4 trên thanh thuộc tính.',
    exampleEn: 'To draw a balanced 5-point star, configure Corners = 5 and Spoke ratio = 0.4 in the tool control bar.',
    sgkContext: 'Mục 1, SGK Tin học 10 Kết nối tri thức - Trang 70'
  },
  {
    id: 'star-rounded',
    termVi: 'Độ cong đỉnh hình sao (Rounded)',
    termEn: 'Star Vertex Curvature (Rounded)',
    ipa: '/ˈraʊndɪd/',
    definitionVi: 'Thuộc tính làm mềm và uốn cong các cánh và đỉnh của hình sao; khi tăng giá trị Rounded, các cánh nhọn biến thành các cánh hoa tròn mềm mại.',
    definitionEn: 'A parameter that curves and softens star vertices; increasing Rounded transforms sharp spokes into rounded organic flower petals.',
    exampleVi: 'Trong bài Luyện tập 1, thay đổi giá trị Rounded dương sẽ biến hình sao 12 cánh thành bông hoa cúc đẹp mắt.',
    exampleEn: 'In Practice Task 1, setting a positive Rounded value morphs a 12-point star into a blossom.',
    sgkContext: 'Mục 1 & Luyện tập, SGK Tin học 10 Kết nối tri thức - Trang 70 & 74'
  },
  {
    id: 'fill-and-stroke-dialog',
    termVi: 'Hộp thoại Fill and Stroke',
    termEn: 'Fill and Stroke Dialog (Ctrl+Shift+F)',
    ipa: '/fɪl ænd stroʊk ˈdaɪəlɒɡ/',
    definitionVi: 'Bảng điều khiển chuyên sâu gồm 3 trang (Fill, Stroke paint, Stroke style) cho phép tùy chỉnh màu tô, màu vẽ viền, độ dày, kiểu nét đứt và độ trong suốt của đối tượng.',
    definitionEn: 'A comprehensive styling panel with 3 tabs (Fill, Stroke paint, Stroke style) to manage fills, outlines, line widths, dashes, and alpha opacity.',
    exampleVi: 'Nhấn Ctrl + Shift + F để mở hộp thoại Fill and Stroke khi cần chỉnh nét đứt hoặc tô màu chuyển sắc.',
    exampleEn: 'Press Ctrl + Shift + F to summon the Fill and Stroke dialog for dashes and gradient coloring.',
    sgkContext: 'Mục 2, SGK Tin học 10 Kết nối tri thức - Trang 70 – 71'
  },
  {
    id: 'linear-gradient',
    termVi: 'Màu chuyển tuyến tính (Linear Gradient)',
    termEn: 'Linear Gradient',
    ipa: '/ˈlɪniər ˈɡreɪdiənt/',
    definitionVi: 'Kiểu tô màu chuyển tiếp mượt mà từ màu này sang màu khác theo một đường thẳng định hướng trong không gian.',
    definitionEn: 'A color progression that smoothly transitions between two or more color stops along a linear vector.',
    exampleVi: 'Tô dải màu chuyển tuyến tính từ cam sang vàng để tạo hiệu ứng ánh hoàng hôn trên nền trời.',
    exampleEn: 'Apply a linear gradient transitioning from orange to yellow to mimic sunset lighting.',
    sgkContext: 'Mục 2, SGK Tin học 10 Kết nối tri thức - Trang 70 – 71'
  },
  {
    id: 'radial-gradient',
    termVi: 'Màu chuyển xuyên tâm (Radial Gradient)',
    termEn: 'Radial Gradient',
    ipa: '/ˈreɪdiəl ˈɡreɪdiənt/',
    definitionVi: 'Kiểu tô màu chuyển dần lan tỏa từ tâm ra xung quanh theo hình tròn hoặc elip, thường dùng để tạo hiệu ứng chiếu sáng 3D cho hình khối cầu.',
    definitionEn: 'A color transition spreading outward radially from a focal center point, essential for rendering 3D volume on spheres.',
    exampleVi: 'Áp dụng Radial gradient với điểm sáng trắng ở tâm lệch và màu đen ở viền ngoài để tạo khối cầu 3D sống động.',
    exampleEn: 'Utilize a radial gradient with an off-center white highlight and dark perimeter to render a 3D sphere.',
    sgkContext: 'Mục 2 & Thực hành Nhiệm vụ 3, SGK Tin học 10 Kết nối tri thức - Trang 70 & 73'
  },
  {
    id: 'boolean-union',
    termVi: 'Phép hợp (Union - Ctrl + +)',
    termEn: 'Path Union Operation',
    ipa: '/ˈjuːniən ˌɒpəˈreɪʃn/',
    definitionVi: 'Lệnh gộp hai hoặc nhiều đối tượng được chọn thành một đối tượng đường bao duy nhất bao gồm tất cả các phần thuộc các hình đơn.',
    definitionEn: 'A Boolean constructive path command that merges two or more overlapping shapes into a single unified outline.',
    exampleVi: 'Chọn 3 hình tròn xếp kề nhau và bấm Ctrl + + để hợp nhất thành một đám mây liền mạch.',
    exampleEn: 'Select overlapping circles and press Ctrl + + to combine them into a single cloud contour.',
    sgkContext: 'Mục 3, SGK Tin học 10 Kết nối tri thức - Trang 71 – 72'
  },
  {
    id: 'boolean-difference',
    termVi: 'Phép hiệu (Difference - Ctrl + -)',
    termEn: 'Path Difference Operation',
    ipa: '/ˈdɪfrəns ˌɒpəˈreɪʃn/',
    definitionVi: 'Lệnh lấy phần thuộc hình ở lớp dưới nhưng không thuộc hình ở lớp trên (hình trên đóng vai trò là khuôn đục khoét hình dưới).',
    definitionEn: 'A Boolean subtraction command removing the overlapping area of the top shape from the underlying bottom shape.',
    exampleVi: 'Đặt hình tròn lên mép hình chữ nhật và nhấn Ctrl + - để khoét thân cây cong lõm ở hai bên.',
    exampleEn: 'Place a circle over a rectangle edge and press Ctrl + - to carve concave sides for a tree trunk.',
    sgkContext: 'Mục 3, SGK Tin học 10 Kết nối tri thức - Trang 71 – 72'
  },
  {
    id: 'boolean-intersection',
    termVi: 'Phép giao (Intersection - Ctrl + *)',
    termEn: 'Path Intersection Operation',
    ipa: '/ˌɪntəˈsɛkʃn ˌɒpəˈreɪʃn/',
    definitionVi: 'Lệnh chỉ giữ lại phần diện tích chung trùng nhau giữa tất cả các hình đang chọn, các phần còn lại bị loại bỏ hoàn toàn.',
    definitionEn: 'A Boolean command retaining solely the intersecting shared volume or area common to all selected shapes.',
    exampleVi: 'Tạo hình chiếc lá bằng cách lấy phép giao (Ctrl + *) giữa hai hình tròn đặt đè lên nhau một phần.',
    exampleEn: 'Construct a leaf shape by executing an intersection (Ctrl + *) on two partially overlapping circles.',
    sgkContext: 'Mục 3, SGK Tin học 10 Kết nối tri thức - Trang 71 – 72'
  }
];

export const LESSON_13_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: 'Trong phần Khởi động (Hình 13.1 SGK Trang 69), hình vẽ miếng dưa hấu được cấu tạo từ các lớp đối tượng theo thứ tự từ dưới lên trên như thế nào?',
    questionEn: 'In the Warm-up (Figure 13.1, Page 69), what is the correct bottom-to-top layer stacking order of the watermelon slice illustration?',
    optionsVi: [
      'Lớp 1: Cung tròn đỏ (ruột) ➔ Lớp 2: Cung tròn xanh (vỏ) ➔ Lớp 3: Các hạt dưa đen',
      'Lớp 1: Cung tròn xanh (vỏ ngoài) ➔ Lớp 2: Cung tròn xanh nhạt (cùi) ➔ Lớp 3: Cung tròn đỏ (ruột dưa) ➔ Lớp 4: Các hạt dưa đen',
      'Lớp 1: Các hạt dưa đen ➔ Lớp 2: Ruột dưa đỏ ➔ Lớp 3: Vỏ dưa xanh ngoài cùng',
      'Tất cả các thành phần nằm trên một lớp phẳng duy nhất cắt rời nhau'
    ],
    optionsEn: [
      'Layer 1: Red arc (flesh) ➔ Layer 2: Green arc (rind) ➔ Layer 3: Black seeds',
      'Layer 1: Outer green arc (rind) ➔ Layer 2: Light green arc (pith) ➔ Layer 3: Red arc (flesh) ➔ Layer 4: Black seeds on top',
      'Layer 1: Black seeds ➔ Layer 2: Red flesh ➔ Layer 3: Outer green rind',
      'All components reside on a single flattened layer without overlapping'
    ],
    correctIndex: 1,
    explanationVi: 'Theo SGK Trang 69: Miếng dưa hấu gồm các hình quạt/cung tròn xếp chồng: vỏ ngoài màu xanh ở lớp đáy cùng, tiếp đến cùi dưa, ruột dưa đỏ và các hạt dưa nằm ở lớp trên cùng.',
    explanationEn: 'Textbook page 69: Watermelon is layered with the outer green rind at the base, followed by pith, red flesh, and black seeds on top.'
  },
  {
    id: 2,
    questionVi: 'Để bo tròn các góc nhọn của một hình chữ nhật trong Inkscape, ta cần điều chỉnh cặp tham số nào trên thanh điều khiển thuộc tính?',
    questionEn: 'To round the sharp corners of a rectangle in Inkscape, which parameter pair in the tool control bar must be adjusted?',
    optionsVi: [
      'W (Width) và H (Height)',
      'Rx (Bán kính góc ngang) và Ry (Bán kính góc dọc)',
      'Start và End (Góc cung mở)',
      'Corners và Spoke ratio'
    ],
    optionsEn: [
      'W (Width) and H (Height)',
      'Rx (Horizontal corner radius) and Ry (Vertical corner radius)',
      'Start and End (Arc opening angles)',
      'Corners and Spoke ratio'
    ],
    correctIndex: 1,
    explanationVi: 'Bảng thuộc tính trang 69: Với hình chữ nhật, Rx và Ry là bán kính của góc bo. Nếu bằng 0 thì góc hình là góc vuông, tăng giá trị sẽ làm góc bo tròn.',
    explanationEn: 'Table on page 69: Rx and Ry dictate the corner curvature radii. When set to 0 the corners are square; increasing values rounds the corners.'
  },
  {
    id: 3,
    questionVi: 'Nếu có một hình sao 5 cánh nhọn, em cần thay đổi tham số nào để các cánh và đỉnh của ngôi sao trở nên cong tròn mềm mại (Hình 13.2 SGK Trang 70)?',
    questionEn: 'For a sharp 5-point star, which parameter must be altered to soften and curve its spokes into rounded petals (Figure 13.2, Page 70)?',
    optionsVi: [
      'Corners',
      'Spoke ratio',
      'Rounded',
      'Randomized'
    ],
    optionsEn: [
      'Corners',
      'Spoke ratio',
      'Rounded',
      'Randomized'
    ],
    correctIndex: 2,
    explanationVi: 'SGK Trang 70: Tham số Rounded điều chỉnh độ cong tại các đỉnh của hình sao. Thay đổi Rounded giúp các đỉnh nhọn uốn cong mềm mại thành hình bông hoa.',
    explanationEn: 'Page 70: The Rounded parameter governs vertex curvature on star polygons, bending sharp tips into smooth flower petals.'
  },
  {
    id: 4,
    questionVi: 'Trong hộp thoại Fill and Stroke (Hình 13.4 SGK Trang 70), muốn thiết lập đường viền thành dạng nét đứt (Dashes) và thay đổi độ dày của nét vẽ, em chọn trang nào?',
    questionEn: 'In the Fill and Stroke dialog (Figure 13.4, Page 70), which tab allows configuring dashed stroke outlines and line widths?',
    optionsVi: [
      'Trang Fill (Màu tô)',
      'Trang Stroke paint (Màu vẽ)',
      'Trang Stroke style (Kiểu nét vẽ)',
      'Trang Layer settings'
    ],
    optionsEn: [
      'Fill tab',
      'Stroke paint tab',
      'Stroke style tab',
      'Layer settings tab'
    ],
    correctIndex: 2,
    explanationVi: 'SGK Trang 70 – 71: Trang Stroke style dùng để thiết lập độ dày mỏng của nét vẽ (Width), kiểu nét (nét liền hay nét đứt Dashes), kiểu đầu mút và góc nối.',
    explanationEn: 'Textbook pp. 70–71: The Stroke style tab controls outline thickness (Width), dash patterns, line caps, and join corners.'
  },
  {
    id: 5,
    questionVi: 'Sự khác nhau căn bản giữa kiểu tô màu chuyển tuyến tính (Linear gradient) và màu chuyển xuyên tâm (Radial gradient) là gì?',
    questionEn: 'What is the fundamental difference between a Linear gradient and a Radial gradient in Inkscape?',
    optionsVi: [
      'Linear gradient chỉ tô được màu đen trắng; Radial gradient tô được nhiều màu',
      'Linear gradient chuyển màu theo một đường thẳng định hướng; Radial gradient chuyển màu lan tỏa từ tâm ra xung quanh',
      'Linear gradient dùng cho ảnh bitmap; Radial gradient dùng cho đồ hoạ vector',
      'Linear gradient làm trong suốt đối tượng; Radial gradient làm mờ nét vẽ'
    ],
    optionsEn: [
      'Linear gradients are strictly monochrome; Radial gradients support polychrome palettes',
      'Linear gradients transition color along a directional straight line; Radial gradients radiate outward from a central focal point',
      'Linear gradients apply only to raster bitmaps; Radial gradients apply to vector paths',
      'Linear gradients adjust global opacity; Radial gradients blur strokes'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 70: Kiểu tô chuyển tuyến tính chuyển dần màu giữa hai hoặc nhiều màu theo một chiều; kiểu tô xuyên tâm chuyển dần màu từ tâm tỏa tròn ra xung quanh đối tượng.',
    explanationEn: 'Page 70: Linear gradients interpolate hues along a straight axis, whereas radial gradients spread outward circularly from a central origin.'
  },
  {
    id: 6,
    questionVi: 'Theo Hoạt động 3 (SGK Trang 71), hình trái tim (Hình 13.5) có thể được ghép lại từ những hình cơ bản nào?',
    questionEn: 'According to Activity 3 (Page 71), which primitive shapes can be assembled to form a heart shape (Figure 13.5)?',
    optionsVi: [
      'Một hình chữ nhật và ba hình tam giác cân',
      'Hai hình tròn bằng nhau và một hình vuông xoay góc 45 độ',
      'Ba hình elip và một hình đa giác 5 cạnh',
      'Một hình sao bo tròn kết hợp với một hình quạt mở'
    ],
    optionsEn: [
      'One rectangle and three isosceles triangles',
      'Two equal circles and one square rotated by 45 degrees',
      'Three ellipses and one pentagon',
      'One rounded star paired with an open arc'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 71 (Hình 13.5): Hình trái tim được tạo bằng cách xếp hai hình tròn ở hai bên tai trên và một hình vuông xoay 45 độ ở phần đáy dưới rồi thực hiện phép hợp (Union).',
    explanationEn: 'Page 71 (Figure 13.5): A heart is constructed by placing two identical circles atop a 45-degree rotated square and executing a Union operation.'
  },
  {
    id: 7,
    questionVi: 'Trong 6 phép ghép đối tượng của Inkscape (Hình 13.6 SGK Trang 72), phép toán nào lấy phần thuộc hình lớp dưới nhưng KHÔNG thuộc hình lớp trên (hình trên khoét hình dưới)?',
    questionEn: 'Among Inkscape’s 6 Boolean path operations (Figure 13.6, Page 72), which command subtracts the top shape from the bottom shape?',
    optionsVi: [
      'Phép hợp (Union, Ctrl + +)',
      'Phép hiệu (Difference, Ctrl + -)',
      'Phép giao (Intersection, Ctrl + *)',
      'Phép hiệu đối xứng (Exclusion, Ctrl + ^)'
    ],
    optionsEn: [
      'Union (Ctrl + +)',
      'Difference (Ctrl + -)',
      'Intersection (Ctrl + *)',
      'Exclusion (Ctrl + ^)'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 71 – 72: "Phép hiệu (Difference, nhấn tổ hợp phím Ctrl + -): là phần thuộc hình lớp dưới nhưng không thuộc hình lớp trên."',
    explanationEn: 'Textbook pp. 71–72: "Difference (Ctrl + -): retains the portion belonging to the bottom shape that does not belong to the top shape."'
  },
  {
    id: 8,
    questionVi: 'Để vẽ một đám mây bồng bềnh từ nhiều hình tròn lồng ghép nhau như Hình 13.7 (SGK Trang 72), ta sử dụng phép ghép nào trong menu Path?',
    questionEn: 'To draw a fluffy cloud from several overlapping circles as shown in Figure 13.7 (Page 72), which Path operation is used?',
    optionsVi: [
      'Phép hợp (Union, Ctrl + +) tất cả các hình tròn lại thành một đường viền duy nhất',
      'Phép hiệu (Difference, Ctrl + -) giữa hình tròn to nhất và các hình tròn nhỏ',
      'Phép chia (Division, Ctrl + /) các hình tròn thành từng mảnh rời',
      'Phép cắt (Cut Path, Ctrl + Alt + /) các đường viền giao nhau'
    ],
    optionsEn: [
      'Union (Ctrl + +) combining all overlapping circles into a unified single outline',
      'Difference (Ctrl + -) subtracting smaller circles from the main circle',
      'Division (Ctrl + /) slicing circles into isolated fragments',
      'Cut Path (Ctrl + Alt + /) detaching stroke segments at intersections'
    ],
    correctIndex: 0,
    explanationVi: 'SGK Trang 72 (Hình 13.7): Chọn tất cả các hình tròn lồng nhau và thực hiện lệnh Path ➔ Union (Ctrl + +) để gộp chúng lại thành một khối hình đám mây duy nhất.',
    explanationEn: 'Page 72: Selecting all intersecting circles and executing Path ➔ Union (Ctrl + +) fuses them into a single cloud geometry.'
  },
  {
    id: 9,
    questionVi: 'Trong bài thực hành Nhiệm vụ 2 vẽ hình cây xanh (Hình 13.11 SGK Trang 73), thân cây cong lõm hai bên được tạo ra bằng cách nào?',
    questionEn: 'In Task 2 drawing a tree (Figure 13.11, Page 73), how are the concave side notches of the tree trunk constructed?',
    optionsVi: [
      'Dùng công cụ vẽ tự do chì mềm vẽ uốn lượn',
      'Vẽ hình chữ nhật làm thân và dùng 2 hình tròn hai bên thực hiện phép hiệu (Path / Difference) lần lượt để khoét lõm',
      'Dùng lệnh chia (Division) cắt thân cây thành 3 phần rồi xóa 2 phần bên',
      'Vẽ hình tam giác xoay ngược rồi kéo dài cạnh đáy'
    ],
    optionsEn: [
      'Hand-drawing wavy curves with the freehand pencil tool',
      'Drawing a rectangle and using two flanking circles with Path / Difference to subtract the concave indentations',
      'Applying Division to slice the trunk and discarding lateral fragments',
      'Inverting an isosceles triangle and stretching its baseline'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 73: Bước 2 & 3: Vẽ hình chữ nhật làm thân cây và 2 hình tròn hai bên. Chọn hình chữ nhật và lần lượt thực hiện lệnh Path ➔ Difference với 2 hình tròn để khoét 2 bên thân cây cong.',
    explanationEn: 'Page 73: Steps 2 & 3: Place a rectangle and two flanking circles; apply Path ➔ Difference sequentially to subtract concave side curves.'
  },
  {
    id: 10,
    questionVi: 'Trong bài thực hành Nhiệm vụ 3 vẽ hình cầu 3D (Hình 13.12 & 13.13 SGK Trang 73 – 74), kỹ thuật chính nào giúp tạo cảm giác nổi khối ba chiều?',
    questionEn: 'In Task 3 drawing a 3D sphere (Figures 13.12 & 13.13, Pages 73–74), which core graphic technique creates the realistic 3D volumetric illusion?',
    optionsVi: [
      'Dùng công cụ Create 3D boxes để kéo thành khối hộp lập phương',
      'Tô màu chuyển xuyên tâm (Radial gradient) từ điểm sáng trắng lệch tâm lan dần sang màu đen bóng tối và bóng phản xạ',
      'Vẽ nhiều hình tròn đồng tâm xếp chồng từ nhỏ đến lớn',
      'Sử dụng phép hiệu đối xứng Exclusion trên hai hình cầu'
    ],
    optionsEn: [
      'Extruding a cube using the Create 3D boxes tool',
      'Applying a Radial gradient transitioning from an off-center white highlight to dark shadow with ambient bounce',
      'Stacking numerous concentric circles from smallest to largest',
      'Performing an Exclusion operation between two overlapping spheres'
    ],
    correctIndex: 1,
    explanationVi: 'SGK Trang 73 – 74: Để tạo hình cầu có cảm giác khối 3D, ta dùng kiểu tô Radial gradient trong hộp thoại Fill and Stroke và kéo điểm điều khiển tâm sáng lệch lên góc trên để tạo vùng sáng, vùng tối và bóng đổ.',
    explanationEn: 'Pages 73–74: Volumetric illusion is achieved by applying a Radial gradient and offsetting the highlight handle to generate realistic light, shadow, and shading.'
  }
];
