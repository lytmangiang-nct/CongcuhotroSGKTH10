import { TermDefinition } from './lessonData';
import { QuizQuestion } from './lesson2Data';

export const LESSON_14_GLOSSARY: TermDefinition[] = [
  {
    id: 'l14-node',
    termVi: 'Điểm neo / Điểm nút (Node)',
    termEn: 'Node / Anchor Point',
    ipa: '/noʊd/ • /ˈæŋ.kɚ pɔɪnt/',
    definitionVi: 'Điểm mốc xác định vị trí nối giữa các đoạn thẳng hoặc đoạn cong trong một đối tượng dạng đường (Path).',
    definitionEn: 'A foundational anchor point defining the junction between segments of straight lines or curves in a vector path.',
    exampleVi: 'Dùng công cụ Edit paths by nodes (F2) để nhấp chọn và di chuyển điểm neo trên nét vẽ.',
    exampleEn: 'Use the Edit paths by nodes tool (F2) to select and translate anchor nodes on a path.',
    sgkContext: 'SGK Trang 75 – 76: Đối tượng đường gồm một chuỗi các đoạn thẳng hoặc đoạn cong nối với nhau qua các điểm neo.'
  },
  {
    id: 'l14-smooth-node',
    termVi: 'Điểm neo trơn (Smooth Node)',
    termEn: 'Smooth Node',
    ipa: '/smuːð noʊd/',
    definitionVi: 'Điểm nối giữa hai đoạn cong mà tại đó hai đường chỉ hướng luôn cùng phương (nằm trên cùng một đường thẳng), tạo đường cong chuyển tiếp trơn tru, không gấp khúc.',
    definitionEn: 'A junction node where both directional handle tangents remain collinear (180°), ensuring continuous, seamless curvature without sharp corners.',
    exampleVi: 'Chuyển điểm neo giữa hai mép cánh hoa thành neo trơn để tạo đường cong uốn lượn mượt mà.',
    exampleEn: 'Convert an anchor into a smooth node to render a continuous, harmonious curvature across curve segments.',
    sgkContext: 'SGK Trang 76 – 77: Điểm neo trơn có hai đường chỉ hướng luôn cùng phương với nhau, thể hiện bởi hình vuông hoặc tròn.'
  },
  {
    id: 'l14-corner-node',
    termVi: 'Điểm neo góc (Corner Node / Cusp)',
    termEn: 'Corner Node / Cusp Node',
    ipa: '/ˈkɔːr.nɚ noʊd/ • /kʌsp noʊd/',
    definitionVi: 'Điểm nối giữa hai đoạn mà tại đó hai đường chỉ hướng có thể lệch hướng nhau độc lập, tạo thành góc nhọn, góc vuông hoặc điểm gấp khúc.',
    definitionEn: 'An anchor node where adjacent tangent handles move independently, permitting sharp angles, cusps, or abrupt changes in trajectory.',
    exampleVi: 'Đỉnh nhọn trên cùng và dưới cùng của hình trái tim là điểm neo góc thể hiện bởi hình thoi.',
    exampleEn: 'The top cusp and bottom tip of the heart contour are corner nodes displayed as diamonds.',
    sgkContext: 'SGK Trang 76 – 77: Điểm neo góc thể hiện bởi hình thoi, cho phép bẻ gập hướng tiếp tuyến tại đỉnh.'
  },
  {
    id: 'l14-direction-handle',
    termVi: 'Điểm chỉ hướng / Cần điều khiển (Handle)',
    termEn: 'Direction Handle / Tangent Handle',
    ipa: '/dɪˈrek.ʃən ˈhæn.dəl/',
    definitionVi: 'Điểm điều khiển gắn liền với điểm neo bằng đường chỉ hướng, dùng để xác định tiếp tuyến và độ căng phình của đường cong.',
    definitionEn: 'A control node offset from the anchor defining the tangent direction and tensile magnitude of the adjoining curve segment.',
    exampleVi: 'Kéo điểm chỉ hướng ra xa điểm neo để tăng độ phồng cung tròn của phiến lá.',
    exampleEn: 'Drag the direction handle further away from the anchor to inflate the curvature span of the leaf.',
    sgkContext: 'SGK Trang 75 – 76 (Hình 14.3 & 14.5): Mỗi điểm điều khiển kết hợp với một điểm đầu mút tạo ra tiếp tuyến của đường cong.'
  },
  {
    id: 'l14-bezier-curve',
    termVi: 'Đường cong Bézier (Bézier Curve)',
    termEn: 'Bezier Curve',
    ipa: '/ˈbez.i.eɪ kɜːrv/',
    definitionVi: 'Đường cong tham số được tạo thành từ các điểm mút và các điểm chỉ hướng tiếp tuyến, là nền tảng toán học của đồ hoạ vector.',
    definitionEn: 'A parametric curve defined by polynomial equations utilizing anchor endpoints and tangent handles, forming vector graphics core.',
    exampleVi: 'Đoạn cong Bézier bậc ba được xác định bởi 4 điểm: 2 điểm mút đầu cuối và 2 điểm điều khiển.',
    exampleEn: 'A cubic Bezier segment is mathematically defined by 4 control points: 2 endpoints and 2 tangent handles.',
    sgkContext: 'SGK Trang 75 – 76: Công cụ Pen (Bézier tool) cho phép vẽ các đường cong mềm mại nối các điểm neo.'
  },
  {
    id: 'l14-object-to-path',
    termVi: 'Chuyển khối thành đường (Object to Path)',
    termEn: 'Object to Path',
    ipa: '/ˈɑːb.dʒɪkt tuː pæθ/',
    definitionVi: 'Lệnh biến đổi một hình khối định nghĩa sẵn (chữ nhật, elip, sao) thành đối tượng đường tự do gồm các điểm neo rời rạc để tuỳ biến.',
    definitionEn: 'Command (Shift+Ctrl+C) converting geometric parametric primitives into customizable vector paths with independent nodes.',
    exampleVi: 'Chọn hình chữ nhật rồi thực hiện Path / Object to Path để có thể kéo dãn từng đỉnh góc độc lập.',
    exampleEn: 'Select a rectangle and execute Path / Object to Path to allow independent vertex node manipulation.',
    sgkContext: 'SGK Trang 77 & 80: Lệnh Path / Object to Path đưa hình chữ nhật thành 4 cạnh với các điểm neo tự do để chỉnh sửa.'
  },
  {
    id: 'l14-pen-tool',
    termVi: 'Công cụ vẽ đường (Pen / Bézier Tool)',
    termEn: 'Draw Bezier Curves and Straight Lines (Pen Tool)',
    ipa: '/pen tuːl/ • /Shift + F6/',
    definitionVi: 'Công cụ cho phép tạo các đường gấp khúc hoặc uốn lượn đường cong bằng cách nháy chuột đặt điểm neo và kéo thả cần điều khiển.',
    definitionEn: 'Inkscape tool (Shift+F6 or B) allowing users to draft open/closed polygons and smooth Bezier curve paths by placing nodes.',
    exampleVi: 'Dùng Pen tool vẽ đường dẫn uốn lượn hình chữ S để làm xương sống định vị dòng chữ nghệ thuật.',
    exampleEn: 'Use the Pen tool to draft an S-shaped guide curve serving as the structural spine for flowing text.',
    sgkContext: 'SGK Trang 76: Chọn công cụ Pen trên hộp công cụ, chọn kiểu đường cong trên thanh điều khiển thuộc tính.'
  },
  {
    id: 'l14-put-on-path',
    termVi: 'Đặt văn bản theo đường cong (Put on Path)',
    termEn: 'Text / Put on Path',
    ipa: '/tɛkst pʊt ɑn pæθ/',
    definitionVi: 'Lệnh uốn lượn một dòng chữ nghệ thuật chạy bám sát theo hình dáng của một đường cong dẫn hướng bất kỳ.',
    definitionEn: 'Command binding a text element along an arbitrary vector guide curve, causing glyphs to follow the trajectory of the path.',
    exampleVi: 'Chọn dòng chữ CHÚC MỪNG NĂM MỚI và dải cờ rồi bấm Text / Put on Path để chữ uốn cong theo dải cờ.',
    exampleEn: 'Select greeting text and festive banner curve, then apply Text / Put on Path to curve text over the banner.',
    sgkContext: 'SGK Trang 78 – 80: Muốn đặt văn bản uốn lượn theo đường đã có, chọn cả hai đối tượng và dùng lệnh Text / Put on Path.'
  },
  {
    id: 'l14-remove-from-path',
    termVi: 'Bỏ đặt văn bản theo đường (Remove from Path)',
    termEn: 'Text / Remove from Path',
    ipa: '/tɛkst rɪˈmuːv frʌm pæθ/',
    definitionVi: 'Lệnh gỡ dòng chữ ra khỏi đường cong dẫn hướng, đưa văn bản quay trở lại trạng thái thẳng ngang ban đầu.',
    definitionEn: 'Command releasing text from its curved trajectory guide, restoring normal linear horizontal orientation.',
    exampleVi: 'Để phục hồi dòng chữ về dạng hàng ngang bình thường, chọn đối tượng chữ rồi dùng lệnh Text / Remove from Path.',
    exampleEn: 'To restore curved text back to flat horizontal orientation, select it and run Text / Remove from Path.',
    sgkContext: 'SGK Trang 79: Muốn bỏ đặt văn bản theo đường, chọn đối tượng và chọn lệnh Text / Remove from Path.'
  },
  {
    id: 'l14-kerning',
    termVi: 'Khoảng cách & Căn chỉnh kí tự (Kerning)',
    termEn: 'Kerning & Character Spacing',
    ipa: '/ˈkɜːr.nɪŋ/',
    definitionVi: 'Việc điều chỉnh khoảng cách giữa các kí tự, khoảng cách từ, độ dịch chuyển ngang dọc (dx, dy) và góc xoay riêng cho từng kí tự.',
    definitionEn: 'Typographic adjustment of spacing between individual glyphs, words, horizontal/vertical baseline shifts, and character rotations.',
    exampleVi: 'Điều chỉnh ô dy và góc xoay trên thanh thuộc tính Text để tạo hiệu ứng các chữ nhảy múa vui nhộn.',
    exampleEn: 'Adjust dy offsets and rotation inputs on the Text controls bar to produce playful kinetic dancing letters.',
    sgkContext: 'SGK Trang 78 – 79: Các ô điều chỉnh khoảng cách kí tự, khoảng cách từ, dịch chuyển ngang/đứng và xoay góc kí tự.'
  }
];

export const LESSON_14_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: 'Theo Hoạt động 1 trang 75 SGK, điểm khác biệt cơ bản giữa đối tượng hình khối chữ nhật (Hình 14.1a) và đối tượng tự do dạng đường (Hình 14.1b) là gì?',
    questionEn: 'According to Activity 1 on Page 75, what is the fundamental difference between a predefined rectangle primitive (Fig 14.1a) and a freeform path object (Fig 14.1b)?',
    optionsVi: [
      'Hình khối có các tính chất toán học cố định không đổi, trong khi đối tượng dạng đường cho phép nắn chỉnh các đoạn và điểm neo độc lập',
      'Hình khối không thể tô màu, chỉ đối tượng dạng đường mới tô màu được',
      'Hình khối luôn có kích thước lớn hơn đối tượng dạng đường',
      'Đối tượng dạng đường không thể xuất ra tệp SVG'
    ],
    optionsEn: [
      'Primitives maintain rigid mathematical constraints, whereas path objects allow independent editing of segments and nodes',
      'Primitives cannot be filled with color, only paths can have fill',
      'Primitives are always larger in physical size than path objects',
      'Path objects cannot be exported to SVG format'
    ],
    correctIndex: 0,
    explanationVi: 'Hình khối được định nghĩa sẵn bởi tính chất toán học chặt chẽ (chỉ đổi W, H, Rx, Ry). Đối tượng tự do dạng đường là tổ hợp các đoạn cong/thẳng cho phép tuỳ ý kéo nắn từng điểm neo rời.',
    explanationEn: 'Geometric primitives have fixed invariant characteristics, while freeform paths are assembled from independent line or curve segments with individually editable nodes.'
  },
  {
    id: 2,
    questionVi: 'Để xác định một đoạn cong Bézier đơn lẻ (Hình 14.3 SGK trang 75), cần có bao nhiêu điểm?',
    questionEn: 'How many points are required to define a single cubic Bezier curve segment (Figure 14.3, Page 75)?',
    optionsVi: [
      '2 điểm: chỉ gồm 2 điểm đầu mút',
      '3 điểm: gồm 2 điểm đầu mút và 1 điểm trung tâm',
      '4 điểm: gồm 2 điểm đầu mút và 2 điểm điều khiển (điểm chỉ hướng)',
      'Vô số điểm rời rạc như ảnh bitmap'
    ],
    optionsEn: [
      '2 points: only two endpoints',
      '3 points: two endpoints and one midpoint',
      '4 points: two endpoints and two control points (direction handles)',
      'Infinite discrete points like a bitmap image'
    ],
    correctIndex: 2,
    explanationVi: 'Theo SGK trang 75: Mỗi đoạn cong được biểu diễn bởi 4 điểm: hai điểm đầu mút và hai điểm điều khiển. Mỗi điểm điều khiển kết hợp với một điểm đầu mút tạo ra tiếp tuyến của đường cong.',
    explanationEn: 'According to Page 75: Each curve segment is represented by four points: two endpoints and two control points (direction handles) creating tangent vectors.'
  },
  {
    id: 3,
    questionVi: 'Để vẽ một hình chữ nhật bo tròn 4 góc, cách thực hiện nào sau đây là tối ưu và chính xác nhất theo câu hỏi củng cố trang 76 SGK?',
    questionEn: 'To draw a rectangle with rounded corners, which approach is optimal per the checkpoint question on Page 76?',
    optionsVi: [
      'Dùng công cụ Pen vẽ từng đoạn rồi nắn cong bằng tay',
      'Dùng công cụ Rectangles (F4) và điều chỉnh giá trị Rx, Ry trên thanh điều khiển thuộc tính',
      'Dùng công cụ Text gõ ký tự hình hộp',
      'Dùng công cụ Stars and Polygons với Corners = 4'
    ],
    optionsEn: [
      'Use the Pen tool to draw segments and manually curve corners by hand',
      'Use the Rectangles tool (F4) and adjust Rx, Ry values on the tool controls bar',
      'Use the Text tool to type a box glyph',
      'Use the Stars and Polygons tool with Corners = 4'
    ],
    correctIndex: 1,
    explanationVi: 'Nên dùng công cụ Rectangles (F4) vì nó là hình khối định nghĩa sẵn, việc nhập số Rx, Ry đảm bảo cả 4 góc được bo tròn hoàn hảo, đối xứng và chính xác tuyệt đối mà không mất công nắn thủ công.',
    explanationEn: 'Use Rectangles tool (F4) with Rx, Ry parameters because mathematical primitives guarantee perfectly uniform, symmetrical corner curvature instantly.'
  },
  {
    id: 4,
    questionVi: 'Đặc điểm then chốt của Điểm neo trơn (Smooth Node) theo SGK trang 76 – 77 là gì?',
    questionEn: 'What is the defining characteristic of a Smooth Node according to textbook Pages 76 – 77?',
    optionsVi: [
      'Hai đường chỉ hướng luôn cùng phương (nằm trên một đường thẳng đối đỉnh)',
      'Hai đường chỉ hướng luôn vuông góc 90 độ với nhau',
      'Không có đường chỉ hướng nào',
      'Được hiển thị bằng biểu tượng hình thoi màu đỏ'
    ],
    optionsEn: [
      'The two direction lines are always collinear (lie along the same straight line)',
      'The two direction lines are always perpendicular at 90 degrees',
      'It possesses no direction handles whatsoever',
      'It is depicted by a red diamond icon'
    ],
    correctIndex: 0,
    explanationVi: 'SGK trang 77 ghi rõ: "Điểm neo trơn có hai đường chỉ hướng luôn cùng phương với nhau". Khi xoay một cần gạt điều khiển thì cần gạt phía đối diện sẽ tự động quay theo để giữ đường cong trơn láng.',
    explanationEn: 'Textbook Page 77 explicitly notes: "Smooth nodes possess two direction lines that always share the same orientation (collinear)", preserving smooth continuity.'
  },
  {
    id: 5,
    questionVi: 'Quan sát Hình 14.4 (Hình trái tim) trang 76 SGK, hai điểm neo tại chóp đáy nhọn và khe lõm trên cùng thuộc loại điểm neo nào?',
    questionEn: 'Observing Figure 14.4 (the heart shape) on Page 76, what node type are the bottom sharp tip and the upper cleft notch?',
    optionsVi: [
      'Điểm neo trơn (Smooth nodes)',
      'Điểm neo góc (Corner nodes / Cusp nodes)',
      'Điểm neo tự động (Auto nodes)',
      'Điểm mút mở không liên kết'
    ],
    optionsEn: [
      'Smooth nodes',
      'Corner nodes (Cusp nodes)',
      'Auto nodes',
      'Open unconnected endpoints'
    ],
    correctIndex: 1,
    explanationVi: 'Tại chóp đáy nhọn và khe lõm giữa hai nửa tim có sự chuyển hướng đột ngột (tạo góc nhọn), do đó hai điểm này là Điểm neo góc (thể hiện bằng hình thoi). Các điểm còn lại ở sườn cong là điểm neo trơn.',
    explanationEn: 'At the sharp bottom point and the upper central indentation, the contour makes an abrupt directional fold, classifying them as Corner nodes (diamonds).'
  },
  {
    id: 6,
    questionVi: 'Để biến một hình khối định nghĩa sẵn (như hình chữ nhật) thành đối tượng đường tự do có các điểm neo rời rạc, ta sử dụng lệnh nào trong menu Path (Hình 14.6 & Trang 80)?',
    questionEn: 'To convert a predefined shape primitive (like a rectangle) into a freeform path with discrete editable nodes, which command in Path menu is used (Fig 14.6 & p. 80)?',
    optionsVi: [
      'Path -> Object to Path (Shift + Ctrl + C)',
      'Path -> Stroke to Path (Ctrl + Alt + C)',
      'Path -> Union (Ctrl + +)',
      'Path -> Difference (Ctrl + -)'
    ],
    optionsEn: [
      'Path -> Object to Path (Shift + Ctrl + C)',
      'Path -> Stroke to Path (Ctrl + Alt + C)',
      'Path -> Union (Ctrl + +)',
      'Path -> Difference (Ctrl + -)'
    ],
    correctIndex: 0,
    explanationVi: 'Lệnh Path -> Object to Path (phím tắt Shift+Ctrl+C hoặc biểu tượng trên thanh điều khiển của công cụ Node) chuyển hình khối thành đường kín có 4 điểm neo để tự do di chuyển và uốn cong.',
    explanationEn: 'Path -> Object to Path (Shift+Ctrl+C) converts the parametric geometric shape into an editable vector path with independent draggable nodes.'
  },
  {
    id: 7,
    questionVi: 'Trong 5 ô điều chỉnh thuộc tính cụm kí tự trên thanh thuộc tính của công cụ Text (Hình 14.10 & Trang 78 – 79), ô thứ tư có biểu tượng 2 chữ A xếp lệch đứng dùng để làm gì?',
    questionEn: 'Among the 5 glyph adjustment boxes on the Text tool control bar (Fig 14.10 & pp. 78–79), what does the 4th box with vertically offset AA glyphs control?',
    optionsVi: [
      'Thay đổi khoảng cách giữa các kí tự (Letter spacing)',
      'Thay đổi khoảng cách giữa các từ (Word spacing)',
      'Dịch chuyển cụm kí tự theo phương thẳng đứng (Vertical shift / dy)',
      'Quay các kí tự được chọn một góc (Character rotation)'
    ],
    optionsEn: [
      'Adjust spacing between characters (Letter spacing)',
      'Adjust spacing between words (Word spacing)',
      'Shift selected glyphs along the vertical direction (Vertical shift / dy)',
      'Rotate selected glyphs by a specified angle (Character rotation)'
    ],
    correctIndex: 2,
    explanationVi: 'Theo Hình 14.10 và bảng trang 79: Ô thứ 4 biểu diễn dịch chuyển cụm kí tự theo phương thẳng đứng (đẩy cao hoặc hạ thấp dòng chữ so với đường cơ sở baseline).',
    explanationEn: 'According to Figure 14.10 and Page 79: The 4th input field shifts character clusters vertically relative to the baseline.'
  },
  {
    id: 8,
    questionVi: 'Để uốn một dòng chữ nghệ thuật chạy uốn lượn bám dọc theo một đường cong dẫn hướng, ta chọn cả dòng chữ và đường cong rồi dùng lệnh nào (Trang 79 – 80)?',
    questionEn: 'To curve text along an arbitrary guide trajectory, which command is executed after selecting both the text and curve (pp. 79–80)?',
    optionsVi: [
      'Text -> Put on Path',
      'Text -> Remove from Path',
      'Path -> Combine',
      'Object -> Group'
    ],
    optionsEn: [
      'Text -> Put on Path',
      'Text -> Remove from Path',
      'Path -> Combine',
      'Object -> Group'
    ],
    correctIndex: 0,
    explanationVi: 'SGK trang 79: "Muốn đặt văn bản theo đường đã có, ta chọn đối tượng văn bản và đối tượng đường, sau đó chọn lệnh Text / Put on Path".',
    explanationEn: 'Textbook Page 79: To bind text to a guide curve, select both the text and path objects, then choose menu command Text / Put on Path.'
  },
  {
    id: 9,
    questionVi: 'Theo câu hỏi củng cố trang 79 SGK, phát biểu nào sau đây là SAI khi làm việc với đối tượng văn bản trong Inkscape?',
    questionEn: 'According to the checkpoint question on Page 79, which of the following statements is FALSE regarding text objects in Inkscape?',
    optionsVi: [
      'Trong một đoạn văn có nhiều chữ ta có thể tô mỗi chữ bằng một màu khác nhau',
      'Nếu đặt đoạn văn uốn lượn theo một đường, ta không thể thay đổi định dạng đó',
      'Trong một đoạn văn có nhiều chữ, ta có thể tuỳ chỉnh để mỗi chữ độ cao thấp khác nhau',
      'Ta có thể đặt đoạn văn bản theo một khuôn dạng nhất định'
    ],
    optionsEn: [
      'In a text block, individual characters can be styled with distinct colors',
      'If text is curved along a path, that formatting cannot be altered anymore',
      'In a text block, characters can have customized vertical baselines',
      'Text can be constrained inside a designated boundary shape'
    ],
    correctIndex: 1,
    explanationVi: 'Phát biểu B là SAI vì sau khi đặt văn bản uốn lượn theo đường (Put on Path), ta vẫn hoàn toàn có thể chọn văn bản để đổi phông chữ, cỡ chữ, màu sắc, thậm chí chọn lệnh Text / Remove from Path để đưa về dạng thẳng ban đầu.',
    explanationEn: 'Statement B is FALSE because text bound to a path remains live and fully editable; its font, size, kerning, and colors can be modified, or detached via Remove from Path.'
  },
  {
    id: 10,
    questionVi: 'Trong bài thực hành Nhiệm vụ 1 vẽ chiếc lá (Hình 14.12 SGK trang 80), bước biến đổi then chốt từ hình chữ nhật ban đầu thành hình chiếc lá là gì?',
    questionEn: 'In Practical Task 1 drawing a leaf (Figure 14.12, Page 80), what is the key node modification turning the rectangle into a leaf?',
    optionsVi: [
      'Gộp 2 điểm neo đỉnh trên thành 1 điểm nhọn đỉnh lá, và chuyển 2 điểm neo đáy thành điểm neo trơn rồi kéo phình bầu lá',
      'Xoá bỏ hoàn toàn hình chữ nhật và dùng công cụ Ellipses',
      'Dùng phép ghép Path -> Difference cắt đôi hình chữ nhật',
      'Tăng độ dày viền Stroke style lên 100px'
    ],
    optionsEn: [
      'Merge the 2 top nodes into a single sharp apex node, and convert the 2 bottom nodes into smooth nodes curving outward',
      'Delete the rectangle completely and switch to the Ellipses tool',
      'Apply Path -> Difference to cut the rectangle in half',
      'Increase the stroke outline thickness to 100px'
    ],
    correctIndex: 0,
    explanationVi: 'Theo Bước 2-4 trang 80: Dùng Object to Path, chọn 2 neo đỉnh gộp thành 1 điểm nhọn đỉnh lá (Hình 14.12c), chọn 2 neo đáy chuyển sang neo trơn kéo đường chỉ hướng phình bầu chiếc lá (Hình 14.12d).',
    explanationEn: 'According to Steps 2-4 on Page 80: Apply Object to Path, merge the 2 top nodes into an apex tip, then convert bottom nodes to smooth nodes with handles expanded for leaf fullness.'
  }
];
