import React, { useState } from 'react';
import {
  Layers,
  Layout,
  MousePointer,
  Download,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Volume2,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Palette,
  ExternalLink,
  Sliders,
  PanelRight,
  Maximize2
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

interface UIComponentItem {
  id: string;
  nameVi: string;
  nameEn: string;
  locationVi: string;
  locationEn: string;
  descriptionVi: string;
  descriptionEn: string;
  color: string;
}

const INKSCAPE_UI_COMPONENTS: UIComponentItem[] = [
  {
    id: 'menu_bar',
    nameVi: 'Thanh bảng chọn (Menu bar)',
    nameEn: 'Menu Bar',
    locationVi: 'Phía trên cùng của cửa sổ',
    locationEn: 'Topmost horizontal bar',
    descriptionVi: 'Chứa các lệnh thường dùng liên quan đến quản lý tệp tin (File), chỉnh sửa (Edit), các lệnh tạo và biến đổi đối tượng (Object, Path, Layer, Filters).',
    descriptionEn: 'Houses essential dropdown menus for file management, editing commands, path transformations, layers, and visual filters.',
    color: 'from-blue-600 to-indigo-600'
  },
  {
    id: 'tool_controls',
    nameVi: 'Thanh điều khiển thuộc tính (Tool control bar)',
    nameEn: 'Tool Controls Bar',
    locationVi: 'Nằm ngay bên dưới thanh bảng chọn',
    locationEn: 'Directly below the Menu Bar',
    descriptionVi: 'Chứa các thuộc tính tùy chỉnh của đối tượng hoặc công cụ đang được lựa chọn. Các thuộc tính này thay đổi linh hoạt tùy theo công cụ đang kích hoạt.',
    descriptionEn: 'Displays context-sensitive options and parametric properties corresponding to the currently active tool or selected object.',
    color: 'from-cyan-600 to-sky-600'
  },
  {
    id: 'tool_box',
    nameVi: 'Hộp công cụ (Tool box)',
    nameEn: 'Tool Box',
    locationVi: 'Dải dọc sát mép bên trái cửa sổ',
    locationEn: 'Vertical bar on the far left edge',
    descriptionVi: 'Chứa toàn bộ các công cụ để khởi tạo, vẽ, căn chỉnh và biến đổi các đối tượng đồ hoạ (Select, Node, Shape, Pen, Text,...). Đây là thanh công cụ làm việc chính và được sử dụng nhiều nhất.',
    descriptionEn: 'Contains primary creation and manipulation instruments (Select, Shapes, Pen, Text). This is the most frequently utilized workstation bar.',
    color: 'from-rose-600 to-amber-600'
  },
  {
    id: 'canvas',
    nameVi: 'Vùng làm việc (Canvas)',
    nameEn: 'Canvas (Drawing Workspace)',
    locationVi: 'Toàn bộ không gian nền trắng rộng lớn',
    locationEn: 'The entire expansive white background',
    descriptionVi: 'Toàn bộ phần nền trắng, nơi người dùng tự do thực hiện việc thêm, vẽ, dàn trang và sắp xếp các đối tượng đồ họa.',
    descriptionEn: 'The infinite white drawing ground where designers freely construct, sketch, and assemble graphic vector primitives.',
    color: 'from-emerald-600 to-teal-600'
  },
  {
    id: 'page_border',
    nameVi: 'Trang in (Page border)',
    nameEn: 'Page Border (Print Boundary)',
    locationVi: 'Khung viền chữ nhật có bóng đổ ở trung tâm',
    locationEn: 'Black-bordered rectangle at the center',
    descriptionVi: 'Vùng khung hình chữ nhật ở giữa màn hình ứng với kích thước khổ giấy thực tế khi in hoặc xuất bản sản phẩm đồ hoạ.',
    descriptionEn: 'The bordered rectangular boundary representing the actual physical sheet size during printing or raster document export.',
    color: 'from-purple-600 to-violet-600'
  },
  {
    id: 'palette',
    nameVi: 'Bảng màu (Color Palette)',
    nameEn: 'Color Palette Swatches',
    locationVi: 'Dải ngang nằm sát mép dưới màn hình',
    locationEn: 'Horizontal swatch bar along the bottom',
    descriptionVi: 'Chứa các dải màu có sẵn để thiết lập màu tô (Fill - nhấp chuột) và màu vẽ đường viền (Stroke - giữ Shift + nhấp chuột) cho đối tượng.',
    descriptionEn: 'Displays color swatches for quick Fill assignment (click) and Stroke boundary color assignment (Shift + click).',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'status_bar',
    nameVi: 'Thanh trạng thái (Status bar)',
    nameEn: 'Status Bar',
    locationVi: 'Nằm ở hàng dưới cùng của cửa sổ',
    locationEn: 'Bottommost horizontal bar',
    descriptionVi: 'Chứa các chỉ báo kiểu tô/viền, độ mờ đục (Opacity), lớp vẽ hiện tại (Layer), tọa độ con trỏ (X, Y), mức thu phóng (Zoom %) và xoay trang.',
    descriptionEn: 'Monitors active Fill/Stroke, Opacity, current Layer index, cursor coordinates (X, Y), zoom level percentage, and canvas rotation.',
    color: 'from-slate-600 to-slate-800'
  },
  {
    id: 'snap_bar',
    nameVi: 'Thanh thiết lập chế độ kết dính (Snap controls)',
    nameEn: 'Snap Controls Bar',
    locationVi: 'Dải dọc ở mép bên phải cửa sổ',
    locationEn: 'Vertical bar on the far right edge',
    descriptionVi: 'Bật/tắt các chế độ tự động hút dính (snapping) con trỏ vào điểm neo (node), lưới tọa độ (grid), đường gióng (guide) và tâm đối tượng.',
    descriptionEn: 'Toggles magnetic alignment snapping of anchor points, path intersections, bounding box corners, and guideline centers.',
    color: 'from-pink-600 to-rose-700'
  }
];

export const Section12InkscapeInterface: React.FC = () => {
  const { speak, isSpeaking, stopSpeaking, bilingualMode, nextPage, prevPage } = useBook();

  // Selected UI component state
  const [selectedComp, setSelectedComp] = useState<UIComponentItem>(INKSCAPE_UI_COMPONENTS[2]); // Default Tool Box
  const [act2Answer, setAct2Answer] = useState<string | null>(null);

  // End of section quiz
  const [q1, setQ1] = useState<'A' | 'B' | null>(null);
  const [q2, setQ2] = useState<'A' | 'B' | null>(null);
  const [submittedCheck, setSubmittedCheck] = useState(false);

  const sectionSpeechVi =
    'Mục 2: Phần mềm đồ hoạ và Giao diện Inkscape. Có hai loại phần mềm đồ hoạ: phần mềm tạo chỉnh sửa hình vectơ như Inkscape, Illustrator và phần mềm xử lý ảnh bitmap như Photoshop, GIMP. Inkscape là phần mềm miễn phí và mã nguồn mở. Màn hình làm việc của Inkscape gồm 10 thành phần chính: Thanh bảng chọn, Thanh điều khiển thuộc tính, Hộp thoại lệnh, Các nút lệnh nhanh, Trang in, Vùng làm việc Canvas, Hộp công cụ, Bảng màu, Thanh trạng thái và Thanh thiết lập chế độ kết dính.';
  const sectionSpeechEn =
    'Section 2: Graphics Software and Inkscape Interface. Software packages divide into vector editors (Inkscape, Illustrator) and raster bitmap editors (Photoshop, GIMP). Inkscape is a premier free open-source vector suite. The Inkscape 1.0.1 GUI comprises ten vital elements: Menu Bar, Tool Controls, Dialogs, Command Bar, Page Border, Canvas, Tool Box, Color Palette, Status Bar, and Snap Controls.';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(bilingualMode === 'en' ? sectionSpeechEn : sectionSpeechVi, bilingualMode === 'en' ? 'en' : 'vi');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-800 dark:text-slate-200">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-sky-500/10 to-indigo-500/10 border border-sky-300 dark:border-sky-700/50 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-200 border border-sky-300 dark:border-sky-700">
              <Layout className="w-3.5 h-3.5" />
              <span>{bilingualMode === 'en' ? 'Section 2 • SGK Pages 64–66' : 'Mục 2 • SGK Trang 64–66'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              <BilingualText
                vi="2. PHẦN MỀM ĐỒ HOẠ & MÀN HÌNH LÀM VIỆC INKSCAPE"
                en="2. GRAPHICS SOFTWARE & INKSCAPE WORKSPACE GUI"
              />
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <BilingualText
                vi="Phân loại phần mềm đồ hoạ; hướng dẫn tải cài đặt và giải mã cấu trúc 10 thành phần giao diện Inkscape 1.0.1 (Hình 12.3)."
                en="Software taxonomy, installation guidelines, and interactive breakdown of the 10 core Inkscape GUI panels (Figure 12.3)."
              />
            </p>
          </div>
        </div>
      </div>

      {/* Activity 2: Minh muốn thiết kế logo (Trang 64) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-100 dark:bg-sky-950 border border-sky-300 dark:border-sky-800 flex items-center justify-center text-sky-700 dark:text-sky-300 font-black">
            HĐ2
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
              <BilingualText
                vi="Hoạt động 2: Lựa chọn phần mềm đồ hoạ (SGK Trang 64)"
                en="Activity 2: Selecting the Appropriate Graphics Tool (Page 64)"
              />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <BilingualText
                vi="Minh muốn thiết kế logo cho câu lạc bộ bóng đá của trường nhưng bạn ấy không biết bắt đầu từ đâu. Theo em, Minh cần những gì?"
                en="Minh wishes to design a logo for the school football club but does not know where to start. What does Minh need?"
              />
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-sky-50/70 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-900/40 space-y-3">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <BilingualText
              vi="Để tạo một logo sắc nét in được trên áo đấu, cờ lưu niệm, poster sân vận động, bạn Minh cần:"
              en="To produce a crisp logo printable on jerseys, commemorative pennants, and stadium posters, Minh needs:"
            />
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-sky-800 dark:text-sky-300">
                <BilingualText vi="1. Phần mềm đồ hoạ vectơ:" en="1. Vector Graphics Software:" />
              </span>
              <p className="text-slate-600 dark:text-slate-400">
                <BilingualText
                  vi="Cài đặt phần mềm đồ hoạ vectơ như Inkscape (miễn phí), Adobe Illustrator hoặc CorelDRAW để logo co giãn không vỡ hình."
                  en="Install vector graphics software such as Inkscape (free open-source), Adobe Illustrator, or CorelDRAW to scale the logo without distortion."
                />
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-indigo-800 dark:text-indigo-300">
                <BilingualText vi="2. Ý tưởng & bản phác thảo:" en="2. Creative Concepts & Sketches:" />
              </span>
              <p className="text-slate-600 dark:text-slate-400">
                <BilingualText
                  vi="Phác thảo biểu tượng quả bóng, tên CLB, màu sắc chủ đạo và phối hợp các hình khối cơ bản (tròn, đa giác, chữ)."
                  en="Sketch soccer ball emblems, club title, primary colors, and combine basic geometrical shapes (circles, polygons, typography)."
                />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Inkscape 1.0.1 Interactive UI Explorer (Hình 12.3 SGK) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Layout className="w-5 h-5 text-sky-600" />
            <BilingualText
              vi="Hình 12.3: Khám phá màn hình làm việc của Inkscape 1.0.1 (Trang 65)"
              en="Figure 12.3: Interactive Inkscape 1.0.1 GUI Explorer (Page 65)"
            />
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            <BilingualText
              vi="Nhấp vào từng thành phần để xem vị trí và chức năng tương ứng trong SGK Tin học 10:"
              en="Click each component to inspect its location and pedagogical function from the textbook:"
            />
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Component Tabs List */}
          <div className="lg:col-span-5 space-y-2 max-h-[460px] overflow-y-auto pr-1">
            {INKSCAPE_UI_COMPONENTS.map((comp) => {
              const isSelected = selectedComp.id === comp.id;
              return (
                <button
                  type="button"
                  key={comp.id}
                  onClick={() => setSelectedComp(comp)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? 'bg-sky-50 dark:bg-sky-950/50 border-sky-500 shadow-sm ring-1 ring-sky-500/30'
                      : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full shrink-0 bg-gradient-to-r ${comp.color}`} />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                      {bilingualMode === 'en' ? comp.nameEn : comp.nameVi}
                    </h4>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate block">
                      {bilingualMode === 'en' ? comp.locationEn : comp.locationVi}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Preview Card */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-sky-600 text-white uppercase tracking-wider">
                  <BilingualText vi="Thành phần giao diện Inkscape" en="Inkscape Interface Component" />
                </span>
                <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-2">
                  <BilingualText vi={selectedComp.nameVi} en={selectedComp.nameEn} />
                </h4>
                <p className="text-xs text-sky-700 dark:text-sky-400 font-semibold mt-1">
                  {bilingualMode === 'en' ? '📍 Location: ' : '📍 Vị trí: '}
                  <BilingualText vi={selectedComp.locationVi} en={selectedComp.locationEn} />
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  <BilingualText vi="Chức năng sư phạm theo SGK:" en="Pedagogical Function from Textbook:" />
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <BilingualText vi={selectedComp.descriptionVi} en={selectedComp.descriptionEn} />
                </p>
              </div>

              {/* Special tip for Tool box & Canvas */}
              {selectedComp.id === 'tool_box' && (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>
                    <strong>
                      <BilingualText vi="Điểm nhấn SGK Trang 67: " en="Textbook Note Page 67: " />
                    </strong>
                    <BilingualText
                      vi="Hộp công cụ là thanh công cụ được sử dụng nhiều nhất trong Inkscape!"
                      en="The Tool Box is the most frequently used toolbar in Inkscape!"
                    />
                  </span>
                </div>
              )}

              {selectedComp.id === 'canvas' && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>
                    <strong>
                      <BilingualText vi="Điểm nhấn SGK Trang 66: " en="Textbook Note Page 66: " />
                    </strong>
                    <BilingualText
                      vi="Em có thể vẽ hình vào toàn bộ vùng làm việc, không bị giới hạn trong khung trang in!"
                      en="You can draw across the entire workspace, not restricted to the printable page border!"
                    />
                  </span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
              <span>
                <BilingualText vi="Định dạng tệp lưu trữ mặc định: " en="Default file format: " />
                <strong>.SVG</strong>
              </span>
              <span className="font-mono text-sky-600 dark:text-sky-400">Inkscape 1.0.1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Box 2 (Hộp Ghi nhớ 2 - SGK Trang 66) */}
      <div className="p-6 rounded-3xl bg-amber-50/90 dark:bg-amber-950/30 border-2 border-dashed border-amber-400 dark:border-amber-700/80 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h3 className="font-black text-amber-950 dark:text-amber-200 text-base sm:text-lg">
            <BilingualText
              vi="Hộp Ghi nhớ 2: Hai loại phần mềm đồ hoạ & Inkscape (SGK Trang 66)"
              en="Summary Box 2: Software Categories & Inkscape (Page 66)"
            />
          </h3>
        </div>

        <ul className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
          <li className="flex items-start gap-2.5">
            <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
            <span>
              <strong>
                <BilingualText vi="Hai loại phần mềm đồ hoạ: " en="Two Graphics Software Types: " />
              </strong>
              <BilingualText
                vi="Phần mềm tạo, chỉnh sửa hình vectơ và phần mềm xử lí ảnh bitmap."
                en="Software for creating and editing vector graphics, and software for processing raster bitmaps."
              />
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
            <span>
              <strong>
                <BilingualText vi="Inkscape: " en="Inkscape: " />
              </strong>
              <BilingualText
                vi="Là phần mềm miễn phí để tạo, chỉnh sửa sản phẩm đồ hoạ vectơ."
                en="Free and open-source software for authoring and manipulating vector graphics."
              />
            </span>
          </li>
        </ul>
      </div>

      {/* End of Section Questions (Trang 66) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-sky-600" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
              <BilingualText
                vi="Câu hỏi củng cố kiến thức (SGK Trang 66)"
                en="Concept Mastery Check (Textbook Page 66)"
              />
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            {bilingualMode === 'en' ? '2 textbook questions' : '2 câu hỏi SGK'}
          </span>
        </div>

        {/* Q1 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
          <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
            <BilingualText
              vi="1. Cần thiết kế một bộ các sản phẩm bút, sổ, danh thiếp, bì thư, túi giấy. Theo em nên dùng phần mềm nào?"
              en="1. To design a branding kit (pens, notebooks, business cards, envelopes, tote bags), which software should be used?"
            />
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'A', text: 'A. Photoshop', correct: false },
              { key: 'B', text: 'B. Inkscape', correct: true }
            ].map((opt) => (
              <button
                type="button"
                key={opt.key}
                onClick={() => !submittedCheck && setQ1(opt.key as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  q1 === opt.key
                    ? 'bg-sky-600 text-white'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                }`}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>

        {/* Q2 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
          <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
            <BilingualText
              vi="2. Em hãy cho biết có thể vẽ hình vào đâu trên màn hình làm việc của Inkscape?"
              en="2. Where can you draw graphics within Inkscape's workspace?"
            />
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'A', viText: 'A. Toàn bộ vùng làm việc', enText: 'A. Entire workspace area', correct: true },
              { key: 'B', viText: 'B. Trong khu vực trang in', enText: 'B. Within page border only', correct: false }
            ].map((opt) => (
              <button
                type="button"
                key={opt.key}
                onClick={() => !submittedCheck && setQ2(opt.key as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  q2 === opt.key
                    ? 'bg-sky-600 text-white'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                }`}
              >
                {bilingualMode === 'en' ? opt.enText : opt.viText}
              </button>
            ))}
          </div>
        </div>

        {submittedCheck && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 space-y-1 animate-fadeIn">
            <p className="font-bold">
              <BilingualText
                vi="✓ Hoàn toàn chính xác! Đáp án đúng là 1-B (Inkscape) và 2-A (Toàn bộ vùng làm việc)."
                en="✓ Absolutely correct! Correct answers are 1-B (Inkscape) and 2-A (Entire workspace area)."
              />
            </p>
            <p>
              <BilingualText
                vi="Bộ ấn phẩm nhận diện thương hiệu gồm nhiều kích thước in khác nhau nên bắt buộc phải thiết kế bằng đồ họa vectơ (Inkscape) để giữ chất lượng; và trên Inkscape ta được tự do vẽ vào toàn bộ vùng làm việc Canvas."
                en="Branding suites require scaling across diverse print mediums, making vector graphics (Inkscape) essential for quality retention; and Inkscape allows unrestricted drawing across the entire Canvas."
              />
            </p>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2">
          {!submittedCheck ? (
            <button
              type="button"
              onClick={() => {
                if (q1 && q2) setSubmittedCheck(true);
              }}
              disabled={!q1 || !q2}
              className="px-5 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-bold text-xs transition cursor-pointer shadow-sm"
            >
              {bilingualMode === 'en' ? 'Check Results' : 'Kiểm tra kết quả'}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setQ1(null);
                setQ2(null);
                setSubmittedCheck(false);
              }}
              className="px-4 py-2 rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs transition cursor-pointer"
            >
              {bilingualMode === 'en' ? 'Retry' : 'Làm lại'}
            </button>
          )}
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={2} lessonId={12} />

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={prevPage}
          className="px-5 py-3 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'Section 1: Vector vs Bitmap' : 'Mục 1: Thiết kế đồ hoạ'}</span>
        </button>

        <button
          type="button"
          onClick={nextPage}
          className="px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-sky-500/25"
        >
          <span>{bilingualMode === 'en' ? 'Section 3: Graphic Objects & Layers' : 'Mục 3: Các đối tượng đồ hoạ của hình vẽ'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
