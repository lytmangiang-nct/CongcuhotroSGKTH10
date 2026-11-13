import { TermDefinition } from './lessonData';
import { QuizQuestion } from './lesson2Data';

export const LESSON_15_GLOSSARY: TermDefinition[] = [
  {
    id: 'l15-graphic-assembly',
    termVi: 'Hoàn thiện & Lắp ráp đồ hoạ (Graphic Assembly)',
    termEn: 'Graphic Project Assembly',
    ipa: '/ˈɡræf.ɪk əˈsɛm.bli/',
    definitionVi: 'Quy trình kết hợp nhiều nhóm đối tượng đồ hoạ (hình khối, đường dẫn, văn bản, hiệu ứng chuyển màu và xếp lớp) thành một ấn phẩm thiết kế hoàn chỉnh như áp phích, tờ rơi, thiệp mời.',
    definitionEn: 'The systematic workflow of integrating heterogeneous vector elements (primitives, paths, typography, gradients, and z-order layering) into a cohesive digital publication.',
    exampleVi: 'Áp dụng quy trình lắp ráp các nhóm đối tượng nền, sách, cờ và văn bản để hoàn thiện tờ rơi Hội sách Hà Nội.',
    exampleEn: 'Apply the assembly workflow integrating background, books, bunting, and typography to produce the Hanoi Book Fair flyer.',
    sgkContext: 'SGK Trang 82: Tạo được sản phẩm số đơn giản, hữu ích và thực tế như logo, banner, áp phích, poster và thiệp chúc mừng.'
  },
  {
    id: 'l15-speech-bubble',
    termVi: 'Bóng hội thoại (Speech Bubble / Callout)',
    termEn: 'Speech Bubble / Callout',
    ipa: '/spiːtʃ ˈbʌb.əl/',
    definitionVi: 'Đối tượng đồ hoạ tạo bởi phép hợp (Union) giữa một hình elip/chữ nhật và một hình tam giác nhọn để đóng khung lời thoại hoặc thông điệp nổi bật.',
    definitionEn: 'A graphic callout created via Boolean Union of an ellipse/rectangle and an indicator triangle to highlight promotional announcements or dialogue.',
    exampleVi: 'Ghép hình elip với hình tam giác bằng lệnh Path / Union để tạo bóng hội thoại Giảm giá tới 70%.',
    exampleEn: 'Fuse an ellipse and a triangle using Path / Union to construct the up-to-70%-discount speech bubble.',
    sgkContext: 'SGK Trang 84 (Hình 15.6): Vẽ hình elip và hình tam giác, xếp hai hình chồng nhau và chọn Union để tạo bóng hội thoại.'
  },
  {
    id: 'l15-bunting-banner',
    termVi: 'Dây cờ tam giác (Bunting / Pennant Banner)',
    termEn: 'Bunting / Pennant Banner',
    ipa: '/ˈbʌn.tɪŋ ˈbæn.ɚ/',
    definitionVi: 'Dãy các lá cờ tam giác đa sắc được nhân bản liên tiếp (Duplicate), nhóm lại (Group) để co dãn kích thước và rã nhóm (Ungroup) để tô màu xen kẽ.',
    definitionEn: 'A decorative celebratory chain of multicolored triangular pennants produced via consecutive duplication, grouping for scaling, and ungrouping for custom palette fills.',
    exampleVi: 'Nhân bản một hình tam giác sang bên cạnh rồi nhóm lại (Ctrl+G) để kéo dãn vừa khít chiều rộng của khung tờ rơi.',
    exampleEn: 'Duplicate a triangle horizontally and group them (Ctrl+G) to scale the banner to match the flyer canvas width.',
    sgkContext: 'SGK Trang 82 – 83 (Hình 15.3): Vẽ dây cờ tam giác bằng lệnh Duplicate, Group, co dãn và Ungroup tô màu phù hợp.'
  },
  {
    id: 'l15-dashed-stroke',
    termVi: 'Đường nét đứt (Dashed Stroke)',
    termEn: 'Dashed Stroke Pattern',
    ipa: '/dæʃt stroʊk/',
    definitionVi: 'Kiểu nét vẽ phân đoạn ngắt quãng được thiết lập trong trang Stroke style của hộp thoại Fill and Stroke, thường dùng làm vách ngăn hoặc đường phân cách tinh tế.',
    definitionEn: 'A discontinuous broken stroke pattern configured within the Stroke style tab of Fill and Stroke dialog, ideal for subtle content dividers.',
    exampleVi: 'Mở hộp thoại Fill and Stroke, chọn Stroke style rồi thiết lập ô Dashes dạng gạch đứt với độ dày Width = 1.000 mm để làm vách ngăn thời gian và địa điểm.',
    exampleEn: 'Open the Fill and Stroke dialog, access Stroke style, and select a dashed pattern with Width = 1.000 mm to separate time and venue.',
    sgkContext: 'SGK Trang 84 (Hình 15.7): Chọn công cụ Pen vẽ đoạn thẳng đứng, mở Stroke style điều chỉnh Width 1 mm và Dashes kiểu nét đứt.'
  },
  {
    id: 'l15-export-png',
    termVi: 'Xuất ảnh PNG (Export PNG Image)',
    termEn: 'Export PNG Image',
    ipa: '/ˈɛk.spɔːrt piː-ɛn-dʒiː ˈɪm.ɪdʒ/',
    definitionVi: 'Lệnh chuyển đổi sản phẩm đồ hoạ vector thành tệp đồ hoạ điểm ảnh định dạng PNG có nền trong suốt và chất lượng cao để in ấn hoặc đưa lên web.',
    definitionEn: 'Inkscape feature (Shift+Ctrl+E) that renders scalable vector graphics into raster PNG images with transparent alpha channels and custom resolution.',
    exampleVi: 'Nhấn tổ hợp phím Shift+Ctrl+E để mở bảng lệnh Export PNG Image và xuất bản thiết kế ra tệp To_roi.png.',
    exampleEn: 'Press Shift+Ctrl+E to reveal the Export PNG Image pane and export the digital flyer as To_roi.png.',
    sgkContext: 'SGK Trang 85 (Hình 15.8): Chọn lệnh File / Export PNG Image để xuất sản phẩm hoàn thiện ra định dạng đồ hoạ điểm ảnh.'
  },
  {
    id: 'l15-export-area',
    termVi: 'Vùng xuất ảnh (Export Area)',
    termEn: 'Export Area (Page / Drawing / Selection / Custom)',
    ipa: '/ˈɛk.spɔːrt ˈeə.ri.ə/',
    definitionVi: 'Khu vực toạ độ được chỉ định để xuất sang ảnh raster trong Inkscape gồm: Page (trang in), Drawing (vùng vẽ chứa mọi đối tượng), Selection (chỉ đối tượng đang chọn), và Custom (toạ độ tuỳ biến).',
    definitionEn: 'The spatial bounding region designated for rendering in Inkscape: Page, Drawing, Selection, or Custom user-specified rectangular coordinates.',
    exampleVi: 'Chọn chế độ Page để ảnh xuất ra vừa vặn chuẩn kích thước khung giấy tờ rơi đã thiết kế.',
    exampleEn: 'Select Page mode so the rendered bitmap matches the exact boundary of the document paper canvas.',
    sgkContext: 'SGK Trang 85: Export area - Vùng xuất ảnh: thường dùng nhất là Page (trang giấy in được đóng khung) và Selection (chỉ xuất các đối tượng đang chọn).'
  },
  {
    id: 'l15-dpi-resolution',
    termVi: 'Độ phân giải DPI (Dots Per Inch)',
    termEn: 'DPI Resolution (Dots Per Inch)',
    ipa: '/diː-piː-aɪ ˌrɛz.əˈluː.ʃən/',
    definitionVi: 'Số lượng điểm ảnh trên mỗi inch vuông của tệp ảnh xuất ra; giá trị càng cao (200 dpi, 300 dpi) thì ảnh in ra càng sắc nét, không bị vỡ hạt.',
    definitionEn: 'Measurement of spatial printing dot density; higher values (200–300 dpi) deliver crisp, professional print reproduction without pixelation.',
    exampleVi: 'Thiết lập độ phân giải 200 dpi trong ô dpi của bảng Export PNG Image để tờ rơi in ra không bị mờ nhòe.',
    exampleEn: 'Specify 200 dpi in the Export PNG Image dialog to guarantee that printed promotional flyers maintain sharp fidelity.',
    sgkContext: 'SGK Trang 85 (Hình 15.8): Ô dpi xác định độ phân giải xuất ảnh (mặc định 200 dpi hoặc 300 dpi cho in ấn).'
  },
  {
    id: 'l15-curved-book-spine',
    termVi: 'Hiệu ứng gáy sách cong 3D (Curved Spine Shading)',
    termEn: '3D Curved Book Spine Shading',
    ipa: '/kɜːrvd spaɪn ˈʃeɪ.dɪŋ/',
    definitionVi: 'Kỹ thuật xếp một dải chữ nhật hẹp có tô dải màu chuyển tiếp (Gradient) từ đậm ở mép ngoài sang nhạt ở phía trong để tạo ảo giác chiều sâu khối trụ tròn của gáy quyển sách.',
    definitionEn: 'Vector design technique combining a narrow margin rectangle with linear gradient shading (dark rim to light core) to mimic realistic cylindrical volume on book spines.',
    exampleVi: 'Tô dải màu chuyển tiếp cho hình chữ nhật rìa mép ngoài đậm hơn màu gáy sách để tạo độ cong tròn chân thực.',
    exampleEn: 'Apply a linear gradient on the outer margin strip transitioning from deep tone to body color to simulate realistic spine curvature.',
    sgkContext: 'SGK Trang 83 (Hình 15.4b): Thêm một hình chữ nhật có chiều rộng hẹp và tô màu chuyển sắc rìa ngoài đậm hơn để tạo độ cong mép sách.'
  },
  {
    id: 'l15-sawtooth-cutout',
    termVi: 'Đục mép răng cưa bằng Difference (Sawtooth Cutout)',
    termEn: 'Sawtooth Cutout via Difference',
    ipa: '/ˈsɔː.tuːθ ˈkʌt.aʊt/',
    definitionVi: 'Thủ thuật ghép một dãy tam giác bằng phép Union rồi đặt lên mép trên hình chữ nhật và bấm Path / Difference (Ctrl + -) để khoét thành đường viền răng cưa thẩm mỹ.',
    definitionEn: 'Vector workflow fusing a series of triangles via Union and subtracting them from a rectangle via Path / Difference to carve a sawtooth decorative margin.',
    exampleVi: 'Xếp dãy tam giác đã Union lên đỉnh hình chữ nhật xanh rồi chọn Difference để tạo đường viền chân cờ răng cưa.',
    exampleEn: 'Place the fused triangle chain atop the blue rectangle and apply Difference to slice out a decorative sawtooth border.',
    sgkContext: 'SGK Trang 83 (Hình 15.2c): Xếp dây tam giác đã Union vào trên đỉnh của hình chữ nhật và thực hiện Difference.'
  },
  {
    id: 'l15-interleaved-shapes',
    termVi: 'Lồng ghép khối hai màu (Interlocking Colored Blocks)',
    termEn: 'Interlocking Color Field Composition',
    ipa: '/ˌɪn.tɚˈlɑːk.ɪŋ ˈkʌl.ɚ fiːld/',
    definitionVi: 'Kỹ thuật ghép hai mảng màu (xanh và vàng) khít khao nhờ vết cắt răng cưa đối xứng âm bản - dương bản, tạo bố cục trang trọng, bắt mắt cho áp phích quảng cáo.',
    definitionEn: 'The alignment of complementary colored background blocks where a carved sawtooth perimeter locks cleanly into an adjacent colored backdrop.',
    exampleVi: 'Đặt khối chữ nhật vàng ở trên và khối xanh răng cưa ở dưới để tạo sự phân tầng rực rỡ cho tờ rơi Hội sách.',
    exampleEn: 'Stack the upper gold rectangle over the lower blue sawtooth block to create a vibrant bipartite poster layout.',
    sgkContext: 'SGK Trang 83 (Hình 15.2d-e): Vẽ hình chữ nhật màu vàng và đưa kết quả của bước 4 (khối răng cưa xanh) vào phía dưới.'
  }
];

export const LESSON_15_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: 'Theo SGK Tin học 10 trang 82, sản phẩm đồ hoạ số nào sau đây KHÔNG PHẢI là mục tiêu ứng dụng thực tế của Bài 15?',
    questionEn: 'According to Page 82, which of the following is NOT an intended real-world digital graphics target for Lesson 15?',
    optionsVi: [
      'Thiết kế logo và nhãn hiệu nhận diện',
      'Tạo banner, áp phích, poster và thiệp chúc mừng',
      'Lập trình mã nguồn trò chơi 3D bằng C++',
      'Thiết kế tờ rơi quảng bá sự kiện cộng đồng'
    ],
    optionsEn: [
      'Designing logos and brand identity emblems',
      'Creating banners, posters, and greeting cards',
      'Programming 3D game source code in C++',
      'Designing promotional flyers for community events'
    ],
    correctIndex: 2,
    explanationVi: 'Bài 15 hướng đến mục tiêu tạo sản phẩm đồ hoạ ứng dụng thực tế bằng phần mềm đồ hoạ vector như logo, banner, băng-rôn, áp phích, poster, tờ rơi và thiệp chúc mừng. Lập trình trò chơi C++ thuộc lĩnh vực khoa học máy tính chuyên sâu, không thuộc bài học này.',
    explanationEn: 'Lesson 15 focuses on creating practical applied vector graphics products such as logos, banners, posters, flyers, and greeting cards. C++ game programming is not part of this lesson.'
  },
  {
    id: 2,
    questionVi: 'Để tạo đường viền răng cưa cho khối nền xanh ở Nhiệm vụ 1 (Hình 15.2c SGK), ta thực hiện lần lượt hai phép ghép nào trong menu Path?',
    questionEn: 'To carve the decorative sawtooth edge on the blue background block in Task 1 (Fig 15.2c), which two Path operations are performed sequentially?',
    optionsVi: [
      'Union tất cả các tam giác lại với nhau, sau đó lấy khối chữ nhật xanh Difference với dãy tam giác đó',
      'Intersection giữa hình chữ nhật và từng tam giác riêng lẻ',
      'Exclusion giữa hình chữ nhật và dây tam giác',
      'Cut Path để cắt đứt rời mép trên của hình chữ nhật'
    ],
    optionsEn: [
      'Union all triangles together into one path, then Difference the blue rectangle with that fused triangle chain',
      'Intersection between the rectangle and individual triangles',
      'Exclusion between the rectangle and the triangle row',
      'Cut Path to sever the top border of the rectangle'
    ],
    correctIndex: 0,
    explanationVi: 'Theo hướng dẫn Bước 3 và Bước 4 trang 83 SGK: Đầu tiên chọn tất cả các tam giác trong dây và thực hiện Union (Ctrl + +) để hợp nhất thành một đối tượng duy nhất. Sau đó xếp dây tam giác lên đỉnh hình chữ nhật xanh và thực hiện Difference (Ctrl + -) để khoét rãnh răng cưa.',
    explanationEn: 'According to Steps 3 and 4 on Page 83: First select all triangles in the chain and execute Union (Ctrl + +) to fuse them into one object. Then position the fused chain atop the blue rectangle and apply Difference (Ctrl + -) to carve the sawtooth indentation.'
  },
  {
    id: 3,
    questionVi: 'Trong Nhiệm vụ 2 (vẽ dây cờ tam giác Hình 15.3 SGK), lệnh Group (Ctrl + G) được sử dụng nhằm mục đích chủ yếu gì?',
    questionEn: 'In Task 2 (drawing the triangular bunting banner, Fig 15.3), what is the primary purpose of the Group command (Ctrl + G)?',
    optionsVi: [
      'Gộp vĩnh viễn các tam giác thành một đường duy nhất không thể đổi màu riêng từng lá cờ',
      'Gom tạm thời các tam giác thành một cụm duy nhất để dễ dàng co dãn kích thước vừa vặn với chiều rộng khung tờ rơi',
      'Chuyển đổi các tam giác thành văn bản',
      'Khoét rãnh các tam giác vào giá sách'
    ],
    optionsEn: [
      'Permanently merge triangles into a single contour preventing individual coloring',
      'Temporarily bundle triangles together to resize and stretch them uniformly across the flyer frame width',
      'Convert triangles into editable text characters',
      'Carve triangle slots into the bookshelf'
    ],
    correctIndex: 1,
    explanationVi: 'Theo Bước 2 trang 83 SGK: Nhóm các tam giác lại bằng lệnh Group (Ctrl + G) giúp người thiết kế có thể co dãn (scale) đồng loạt toàn bộ dây cờ sao cho vừa khít với bề ngang khung thiết kế. Sau khi co dãn xong, ta chọn Ungroup (Shift + Ctrl + G) để tô màu riêng cho từng lá cờ.',
    explanationEn: 'Per Step 2 on Page 83: Grouping triangles via Group (Ctrl + G) allows uniform proportional scaling across the canvas width. After scaling, Ungroup (Shift + Ctrl + G) is called to paint each individual pennant with distinct colors.'
  },
  {
    id: 4,
    questionVi: 'Để tạo ảo giác độ cong tròn 3D cho gáy quyển sách (Hình 15.4b SGK), người thiết kế đã áp dụng kỹ thuật tinh tế nào?',
    questionEn: 'To simulate a realistic 3D cylindrical curve on the book spine (Fig 15.4b), which graphic technique is applied?',
    optionsVi: [
      'Vẽ một hình cầu 3D rồi dán đè lên trên gáy sách',
      'Thêm một hình chữ nhật hẹp ở mép rìa và tô màu chuyển sắc (gradient) với mép ngoài đậm hơn và mép trong tiệp màu gáy sách',
      'Dùng công cụ Pen vẽ các đường gạch chéo đen trắng',
      'Dùng bộ lọc Filter / Distort làm méo hình'
    ],
    optionsEn: [
      'Drawing a 3D sphere and superimposing it atop the spine',
      'Adding a narrow margin rectangle with linear gradient shading transitioning from dark outer rim to spine body color',
      'Using the Pen tool to hatch black and white diagonal stripes',
      'Applying a Filter / Distort distortion preset'
    ],
    correctIndex: 1,
    explanationVi: 'Theo Bước 2 trang 83 SGK: "Để gáy sách có độ cong ở mép ta sẽ thêm một hình chữ nhật có chiều cao bằng hình trên, chiều rộng tương ứng với đoạn rìa và tô màu chuyển sắc sao cho màu ở rìa ngoài đậm hơn và màu phía trong bằng với màu tô gáy sách".',
    explanationEn: 'According to Step 2 on Page 83: "To impart curvature on spine edges, add a narrow rectangle matching the spine height, and apply a gradient with a darker outer perimeter and an inner color matching the book spine fill."'
  },
  {
    id: 5,
    questionVi: 'Hai bóng hội thoại "Vào cửa tự do" và "Giảm giá tới 70%" (Nhiệm vụ 5, Hình 15.6 SGK) được tạo ra từ phép ghép nào giữa những hình khối nào?',
    questionEn: 'The two speech bubbles in Task 5 (Fig 15.6) are forged through which Boolean operation between which geometric primitives?',
    optionsVi: [
      'Phép Hợp (Union) giữa một hình elip và một hình tam giác nhọn',
      'Phép Hiệu (Difference) lấy hình tròn khoét hình vuông',
      'Phép Giao (Intersection) giữa hai hình ngôi sao',
      'Vẽ thủ công bằng công cụ bút chì Pencil'
    ],
    optionsEn: [
      'Boolean Union of an ellipse and a pointed triangle',
      'Boolean Difference subtracting a square from a circle',
      'Boolean Intersection between two star polygons',
      'Freehand sketching with the Pencil tool'
    ],
    correctIndex: 0,
    explanationVi: 'Theo hướng dẫn trang 84 SGK: Bước 1: Vẽ hình elip và hình tam giác (Hình 15.6a); Bước 2: Xếp hai hình chồng lên nhau và chọn lệnh Path / Union (Hình 15.6b); Bước 3: Dùng công cụ Node F2 chỉnh sửa điểm neo cho mềm mại và tô màu phù hợp.',
    explanationEn: 'According to Page 84 guidelines: Step 1: Draw an ellipse and a triangle (Fig 15.6a); Step 2: Overlap them and execute Path / Union (Fig 15.6b); Step 3: Fine-tune nodes with the F2 Node tool and apply fill color.'
  },
  {
    id: 6,
    questionVi: 'Để vẽ vách ngăn nét đứt phân tách giữa mục "THỜI GIAN" và "ĐỊA ĐIỂM" (Nhiệm vụ 6, Hình 15.7 SGK), cần thiết lập những thông số nào trong hộp thoại Fill and Stroke?',
    questionEn: 'To draw the dashed divider separating the "TIME" and "LOCATION" sections (Task 6, Fig 15.7), which parameters must be configured in Fill and Stroke?',
    optionsVi: [
      'Trang Fill: chọn Radial gradient và đặt độ mờ Opacity = 50%',
      'Trang Stroke paint: chọn No paint (bỏ viền)',
      'Trang Stroke style: thiết lập độ dày Width (ví dụ 1.000 mm) và chọn kiểu vạch nét đứt tại danh sách Dashes',
      'Trang Stroke style: chọn Join = Miter join và bỏ chọn mũi tên'
    ],
    optionsEn: [
      'Fill tab: select Radial gradient and set Opacity = 50%',
      'Stroke paint tab: select No paint',
      'Stroke style tab: specify stroke thickness Width (e.g. 1.000 mm) and select a dashed pattern from the Dashes dropdown',
      'Stroke style tab: configure Join = Miter join and remove arrows'
    ],
    correctIndex: 2,
    explanationVi: 'Theo Bước 2 trang 84 SGK: Vẽ đoạn thẳng đứng bằng Pen, sau đó mở hộp thoại Fill and Stroke (Shift+Ctrl+F), chuyển sang trang Stroke style và điều chỉnh độ dày Width = 1.000 mm, đồng thời chọn mẫu nét đứt tại menu Dashes (Hình 15.7).',
    explanationEn: 'Per Step 2 on Page 84: Draw a vertical segment with Pen, open Fill and Stroke dialog, switch to Stroke style, set Width = 1.000 mm, and choose a dashed pattern in the Dashes selector (Fig 15.7).'
  },
  {
    id: 7,
    questionVi: 'Trong cửa sổ Export PNG Image (Hình 15.8 trang 85 SGK), tuỳ chọn "Page" ở mục Export area có ý nghĩa gì?',
    questionEn: 'In the Export PNG Image pane (Fig 15.8, Page 85), what does the "Page" option under Export area signify?',
    optionsVi: [
      'Chỉ xuất các đối tượng đang được chọn bằng chuột',
      'Xuất toàn bộ các đối tượng có trong vùng vẽ (Drawing), bất kể nằm trong hay ngoài trang giấy',
      'Xuất chính xác phần hình ảnh nằm trọn trong khuôn khổ trang giấy in đã thiết lập',
      'Xuất bản vẽ ra tệp văn bản Word'
    ],
    optionsEn: [
      'Only export objects currently selected by the pointer',
      'Export all graphic objects across the entire canvas (Drawing), even those beyond the page boundary',
      'Export precisely the content bounded within the defined document page rectangle',
      'Export the graphic project to a Word document'
    ],
    correctIndex: 2,
    explanationVi: 'Theo giải thích trang 85 SGK: Tuỳ chọn "Page" giới hạn vùng xuất ảnh đúng theo kích thước trang giấy in được đóng khung của tệp thiết kế, giúp ấn phẩm không bị thừa khoảng trắng hay lẹm hình khi in ấn hoặc đăng tải.',
    explanationEn: 'According to Page 85 explanations: "Page" restricts the export bounding box strictly to the framed document page boundary, ensuring consistent margins and eliminating stray off-canvas artifacts.'
  },
  {
    id: 8,
    questionVi: 'Để ảnh xuất ra định dạng PNG có chất lượng in ấn chuyên nghiệp, rõ nét và không bị răng cưa mờ hạt, thông số độ phân giải (dpi) nên được thiết lập ở mức nào?',
    questionEn: 'To achieve professional crisp print reproduction without pixelation, at what dpi resolution should the PNG export be set?',
    optionsVi: [
      '72 dpi (mức mặc định của màn hình đời cũ)',
      '10 dpi đến 30 dpi để tệp cực nhẹ',
      '200 dpi đến 300 dpi (theo Hình 15.8 SGK)',
      'Không quan trọng vì ảnh PNG tự động nét trong mọi trường hợp'
    ],
    optionsEn: [
      '72 dpi (legacy screen resolution)',
      '10 dpi to 30 dpi for ultra-small file sizes',
      '200 dpi to 300 dpi (per Fig 15.8)',
      'Irrelevant because PNG is always sharp regardless of settings'
    ],
    correctIndex: 2,
    explanationVi: 'Trong ấn loát và đồ hoạ chuyên nghiệp (như thể hiện trong Hình 15.8 trang 85 SGK), độ phân giải xuất ảnh đạt chuẩn in ấn sắc nét cần từ 200 dpi đến 300 dpi (Dots Per Inch). Mức 72 dpi chỉ phù hợp xem lướt web trên màn hình máy tính.',
    explanationEn: 'In professional print publishing (as shown in Figure 15.8 on Page 85), resolution for crisp print output must reach 200 to 300 dpi. Standard 72 dpi is only suited for low-resolution legacy web screens.'
  },
  {
    id: 9,
    questionVi: 'Trong bài Luyện tập 1 (trang 85 SGK), thiệp mời sinh nhật (Hình 15.9) kế thừa những kỹ thuật thiết kế đồ hoạ nào từ Bài 13 và Bài 14?',
    questionEn: 'In Practice Task 1 (Page 85), the birthday invitation card (Fig 15.9) synthesizes which techniques from Lessons 13 and 14?',
    optionsVi: [
      'Vẽ chùm bóng bay có vệt phản quang ánh sáng (Bài 13) và uốn dòng chữ theo đường dẫn (Bài 14)',
      'Tạo cơ sở dữ liệu quan hệ SQL và kết nối cáp mạng',
      'Lập trình thuật toán chia nhị phân lấy số dư',
      'Quét virus máy tính bằng Windows Defender'
    ],
    optionsEn: [
      'Drawing balloon clusters with specular highlights (Lesson 13) and flowing text along paths (Lesson 14)',
      'Creating relational SQL databases and terminating network cables',
      'Programming binary division with remainder calculations',
      'Scanning computer malware using Windows Defender'
    ],
    correctIndex: 0,
    explanationVi: 'Thiệp mời sinh nhật ở Hình 15.9 kết hợp nhuần nhuyễn chùm bóng bay đa sắc có điểm sáng phản quang (đã học ở Luyện tập 3 Bài 13) cùng kỹ thuật định dạng văn bản, uốn chữ cong mềm mại và sắp xếp bố cục phân lớp Z-order (Bài 14 và 15).',
    explanationEn: 'The birthday card in Fig 15.9 seamlessly synthesizes balloon bouquets with specular highlights (from Lesson 13 Practice 3) with text formatting, curved path typography, and layered Z-order composition (Lessons 14 and 15).'
  },
  {
    id: 10,
    questionVi: 'Trong bài Vận dụng (Hình 15.10 trang 85 SGK), bức tranh bãi biển mùa hè được cấu thành từ những yếu tố đồ hoạ cốt lõi nào?',
    questionEn: 'In the Application Task (Fig 15.10, Page 85), the summer beach illustration is composed of which foundational graphic elements?',
    optionsVi: [
      'Bờ cát và các đợt sóng biển uốn lượn bằng đường cong Bézier, ô dù che nắng nhiều màu tạo từ các cung quạt tròn, và quả bóng bãi biển sọc phản quang',
      'Ảnh chụp bitmap từ máy ảnh chuyên nghiệp dán vào',
      'Mô hình 3D xuất từ máy scan quang học',
      'Bảng số liệu thống kê doanh thu bán vé du lịch'
    ],
    optionsEn: [
      'Sand shore and ocean waves sculpted with Bezier curves, multicolored parasol umbrella built from radial circular wedges, and a striped beach ball with highlights',
      'A bitmap raster photo pasted from a DSLR camera',
      'A 3D laser-scanned mesh model',
      'A statistical spreadsheet of tourism revenues'
    ],
    correctIndex: 0,
    explanationVi: 'Hình 15.10 là một tác phẩm đồ hoạ vector hoàn chỉnh được vẽ hoàn toàn trong Inkscape: sóng biển dạt dào vẽ bằng đường cong Bézier (Pen tool), tán ô che nắng tròn chia múi màu xen kẽ, quả bóng sọc tròn và bầu trời trong xanh có mây trôi.',
    explanationEn: 'Figure 15.10 is a complete vector composition created in Inkscape: ocean wave ripples drawn with Bezier curves (Pen tool), a segmented multicolored parasol canopy, a striped beach ball, and clear skies with clouds.'
  }
];
