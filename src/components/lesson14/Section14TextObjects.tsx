import React, { useState } from 'react';
import {
  Type,
  Volume2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sliders,
  RotateCw,
  Sparkles,
  HelpCircle,
  Eye,
  Layers,
  Wand2,
  MoveHorizontal,
  MoveVertical
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section14TextObjects: React.FC = () => {
  const { speak, isSpeaking, stopSpeaking, bilingualMode, nextPage, prevPage } = useBook();

  // Interactive Typography Studio state with user-edit detection
  const [hasEditedText, setHasEditedText] = useState<boolean>(false);
  const [customText, setCustomText] = useState<string>('TIẾT KIỆM ĐIỆN, NƯỚC');
  const [letterSpacing, setLetterSpacing] = useState<number>(2);
  const [verticalShift, setVerticalShift] = useState<number>(0);
  const [charRotate, setCharRotate] = useState<number>(0);
  const [isPutOnPath, setIsPutOnPath] = useState<boolean>(true);
  const [curveType, setCurveType] = useState<'circle' | 'wave'>('circle');

  // Sync default text on language toggle only if student hasn't edited
  React.useEffect(() => {
    if (!hasEditedText) {
      setCustomText(bilingualMode === 'en' ? 'SAVE WATER & ELECTRICITY' : 'TIẾT KIỆM ĐIỆN, NƯỚC');
    }
  }, [bilingualMode, hasEditedText]);

  // Checkpoint Multiple Choice (Page 79)
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [quizChecked, setQuizChecked] = useState<boolean>(false);

  const sectionSpeechVi =
    'Mục 3: Đối tượng văn bản - Trang 78 và 79 SGK Tin học 10. Inkscape có thể tạo các đối tượng văn bản như tiêu đề và chú thích một cách đơn giản, đồng thời có thể điều chỉnh để cho sinh động và phù hợp với nội dung. Để bổ sung đối tượng văn bản, ta chọn biểu tượng chữ A trên hộp công cụ. Thanh điều khiển thuộc tính cung cấp các chức năng chọn phông chữ, kiểu chữ, cỡ chữ, khoảng cách giữa các dòng và 5 ô điều chỉnh chi tiết cụm kí tự: khoảng cách giữa các kí tự, khoảng cách giữa các từ, dịch chuyển ngang, dịch chuyển đứng và xoay góc kí tự. Muốn bỏ các tuỳ chỉnh đã đặt, ta chọn lệnh Text / Remove Manual Kerns. Muốn đặt văn bản theo đường đã có, ta chọn đối tượng văn bản và đối tượng đường, sau đó chọn lệnh Text / Put on Path. Muốn bỏ đặt văn bản theo đường, chọn lệnh Text / Remove from Path.';
  const sectionSpeechEn =
    'Section 3: Text Objects & Typography - Pages 78 and 79 of Informatics 10 Textbook. Inkscape creates versatile typographic titles and annotations that integrate seamlessly with vector artwork. Select the Text tool (A or F8) to generate text objects. The controls bar offers font family, font weight, font size, line spacing, and 5 fine-tuning kerning inputs: letter spacing, word spacing, horizontal shift (dx), vertical baseline shift (dy), and character rotation. To reset custom adjustments, choose Text / Remove Manual Kerns. To bind text to a guide vector path, select both elements and execute Text / Put on Path. To release text, select Text / Remove from Path.';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(
        bilingualMode === 'en' ? sectionSpeechEn : sectionSpeechVi,
        bilingualMode === 'en' ? 'en' : 'vi'
      );
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-800 dark:text-slate-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-800 to-blue-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <Type className="w-8 h-8 text-purple-300" />
            </div>
            <div>
              <div className="inline-block px-3 py-1 bg-purple-500/30 border border-purple-300/40 rounded-full text-xs font-semibold text-purple-200 uppercase tracking-wider mb-1">
                <BilingualText
                  vi="Phần 3 • Trang 78 – 79 SGK"
                  en="Section 3 • Pages 78 – 79 Textbook"
                />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                <BilingualText
                  vi="3. Đối tượng văn bản (Text Objects & Put on Path)"
                  en="3. Text Objects & Typography on Path"
                />
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Activity 3: Horizontal vs Curved Text (Figure 14.8) */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/80 pb-4">
          <div className="flex items-center space-x-3">
            <span className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-600 dark:text-purple-400 font-black flex items-center justify-center text-lg">
              HĐ3
            </span>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                <BilingualText
                  vi="Hoạt động 3: So sánh trình bày văn bản trên hình (Hình 14.8)"
                  en="Activity 3: Comparing Text Presentation on Shapes (Figure 14.8)"
                />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                <BilingualText
                  vi="Trong các cách trình bày văn bản sau, em thấy cách nào đẹp hơn? Có thể thiết kế văn bản như vậy không?"
                  en="Which text presentation is more visually appealing? Can vector software curve text seamlessly?"
                />
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Layout A: Flat Horizontal */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-center space-y-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Hình 14.8a: Đặt văn bản thẳng ngang đơn thuần
            </span>
            <div className="py-2 text-xs font-bold tracking-tight text-slate-700 dark:text-slate-200">
              TIẾT KIỆM ĐIỆN, NƯỚC LÀ GÓP PHẦN BẢO VỆ MÔI TRƯỜNG
            </div>
            <div className="w-28 h-28 mx-auto rounded-full bg-emerald-600 flex items-center justify-center shadow-md">
              <span className="text-white text-3xl">🌱</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
              Dòng chữ đơn điệu, tách rời khỏi huy hiệu trung tâm, không tạo được sự gắn kết thương hiệu.
            </p>
          </div>

          {/* Layout B: Curved on Path (Put on Path) */}
          <div className="p-5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border-2 border-purple-300 dark:border-purple-800 text-center space-y-3 shadow-sm">
            <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider block">
              Hình 14.8b: Đặt văn bản uốn lượn theo đường (Text / Put on Path)
            </span>

            {/* SVG Curved Text Preview */}
            <div className="w-48 h-48 mx-auto relative flex items-center justify-center">
              <svg viewBox="-80 -80 160 160" className="w-44 h-44 select-none">
                <defs>
                  {/* Path guide for text */}
                  <path id="badgeArc" d="M -65,0 A 65,65 0 1,1 65,0 A 65,65 0 1,1 -65,0" fill="none" />
                </defs>

                {/* Central Emblem */}
                <circle cx="0" cy="0" r="42" fill="#15803d" stroke="#166534" strokeWidth="2" />
                <text x="0" y="10" fontSize="24" textAnchor="middle" fill="#ffffff">🌱</text>

                {/* Curved Text running around circle */}
                <text fill="#a855f7" fontSize="8.5" fontWeight="bold" letterSpacing="1">
                  <textPath href="#badgeArc" startOffset="50%" textAnchor="middle">
                    {bilingualMode === 'en'
                      ? 'CONSERVE WATER & ELECTRICITY TO PROTECT THE EARTH'
                      : 'TIẾT KIỆM ĐIỆN, NƯỚC LÀ GÓP PHẦN BẢO VỆ MÔI TRƯỜNG'}
                  </textPath>
                </text>
              </svg>
            </div>

            <p className="text-xs text-purple-900 dark:text-purple-200 font-semibold pt-1">
              <BilingualText
                vi="Dòng chữ ôm tròn lấy biểu tượng, cân đối thẩm mỹ cao, đậm chất logo huy hiệu chuyên nghiệp!"
                en="The text curves gracefully around the icon, delivering balanced harmony for professional badge emblems!"
              />
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Text & Kerning Playground (Figures 14.9 & 14.10, Page 78–79) */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/80 pb-4 flex-wrap gap-3">
          <div className="flex items-center space-x-3">
            <span className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-black flex items-center justify-center text-lg">
              LAB
            </span>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                <BilingualText
                  vi="Phòng thí nghiệm: Căn chỉnh kí tự (Kerning) & Text / Put on Path"
                  en="Typography Lab: Kerning Adjustments & Text / Put on Path"
                />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Thử nghiệm trực quan 5 tham số cụm kí tự (Hình 14.10) và uốn dòng chữ theo quỹ đạo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPutOnPath(!isPutOnPath)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${
                isPutOnPath
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>{isPutOnPath ? 'Text / Remove from Path' : 'Text / Put on Path'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Dynamic SVG Text Viewer */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col items-center justify-center min-h-[300px] relative shadow-inner">
            <div className="absolute top-3 left-4 text-xs font-mono text-purple-400 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping" />
              <span>Inkscape Live SVG Text Renderer</span>
            </div>

            <svg viewBox="-150 -80 300 160" className="w-full max-w-md h-52 select-none drop-shadow-2xl">
              <defs>
                {/* Curved wave path definition */}
                <path id="wavePath" d="M -130,20 Q -65,-50 0,20 T 130,20" fill="none" />
                {/* Circular arc path definition */}
                <path id="archPath" d="M -120,40 A 130,130 0 0,1 120,40" fill="none" />
              </defs>

              {/* Guide wire representation (dashed when text is bound) */}
              <path
                d={curveType === 'circle' ? 'M -120,40 A 130,130 0 0,1 120,40' : 'M -130,20 Q -65,-50 0,20 T 130,20'}
                fill="none"
                stroke={isPutOnPath ? '#475569' : '#38bdf8'}
                strokeWidth={isPutOnPath ? '1.5' : '3'}
                strokeDasharray={isPutOnPath ? '4 4' : 'none'}
              />

              {/* Text Render */}
              {!isPutOnPath ? (
                // Linear text
                <text
                  x="0"
                  y={verticalShift}
                  fontSize="16"
                  fontWeight="bold"
                  fill="#f43f5e"
                  textAnchor="middle"
                  letterSpacing={letterSpacing}
                  transform={`rotate(${charRotate}, 0, ${verticalShift})`}
                >
                  {customText}
                </text>
              ) : (
                // Text on Path
                <text
                  fill="#c084fc"
                  fontSize="15"
                  fontWeight="bold"
                  letterSpacing={letterSpacing}
                  transform={`translate(0, ${verticalShift})`}
                >
                  <textPath
                    href={curveType === 'circle' ? '#archPath' : '#wavePath'}
                    startOffset="50%"
                    textAnchor="middle"
                  >
                    {customText}
                  </textPath>
                </text>
              )}
            </svg>

            {/* Path mode switch */}
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => setCurveType('circle')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                  curveType === 'circle' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                <BilingualText vi="Cung tròn vòm (Arch)" en="Arch Curve" />
              </button>
              <button
                onClick={() => setCurveType('wave')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                  curveType === 'wave' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                <BilingualText vi="Lượn sóng (Wave)" en="Wave Curve" />
              </button>
            </div>
          </div>

          {/* Interactive Sliders */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-3 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  <BilingualText vi="Nội dung dòng chữ (Text string):" en="Text content (Text string):" />
                </label>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => {
                    setHasEditedText(true);
                    setCustomText(e.target.value);
                  }}
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>
                    <BilingualText vi="Khoảng cách kí tự (Letter spacing):" en="Letter spacing:" />
                  </span>
                  <span className="font-mono text-purple-600 dark:text-purple-400">{letterSpacing}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="12"
                  value={letterSpacing}
                  onChange={(e) => setLetterSpacing(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>
                    <BilingualText vi="Dịch chuyển thẳng đứng (dy):" en="Vertical shift (dy):" />
                  </span>
                  <span className="font-mono text-purple-600 dark:text-purple-400">{verticalShift}px</span>
                </div>
                <input
                  type="range"
                  min="-25"
                  max="25"
                  value={verticalShift}
                  onChange={(e) => setVerticalShift(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>
                    <BilingualText vi="Góc xoay kí tự (Rotation):" en="Character rotation:" />
                  </span>
                  <span className="font-mono text-purple-600 dark:text-purple-400">{charRotate}°</span>
                </div>
                <input
                  type="range"
                  min="-45"
                  max="45"
                  value={charRotate}
                  onChange={(e) => setCharRotate(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-800/50 text-xs text-purple-900 dark:text-purple-300 space-y-1">
              <strong>
                <BilingualText vi="Mẹo thao tác SGK Trang 79:" en="Textbook Tip (Page 79):" />
              </strong>
              <p>
                <BilingualText
                  vi="Để huỷ bỏ toàn bộ các khoảng cách và góc xoay đã chỉnh tay cho cụm từ, chọn dòng chữ rồi vào menu Text / Remove Manual Kerns!"
                  en="To discard all manual kerning, offsets, and character rotations, select the text and choose Text / Remove Manual Kerns!"
                />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Box 3 (Page 79) */}
      <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border-2 border-dashed border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200 shadow-sm flex items-start gap-3">
        <span className="p-2 bg-amber-200 dark:bg-amber-900 rounded-xl text-amber-900 dark:text-amber-200 shrink-0 font-bold text-xs uppercase">
          {bilingualMode === 'en' ? 'Summary 3' : 'Ghi nhớ 3'}
        </span>
        <p className="text-sm font-semibold leading-relaxed">
          <BilingualText
            vi="Trong Inkscape, văn bản được bổ sung có thể tuỳ chỉnh theo từng kí tự và có thể đặt đoạn văn bản theo đường hoặc vào một khuôn dạng."
            en="In Inkscape, text objects can be styled per individual character and constrained along paths or within arbitrary frames."
          />
        </p>
      </div>

      {/* Checkpoint Question (Page 79) */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-2xl">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">
              <BilingualText
                vi="Câu hỏi củng cố (Trang 79 SGK): Phát biểu nào sau đây là SAI?"
                en="Concept Check Question (Page 79): Which Statement is FALSE?"
              />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <BilingualText
                vi="Chọn đáp án bạn cho là sai khi làm việc với đối tượng văn bản trong Inkscape"
                en="Choose the false statement when working with text objects in Inkscape"
              />
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {[
            {
              id: 'A',
              vi: 'A. Trong một đoạn văn có nhiều chữ ta có thể tô mỗi chữ bằng một màu khác nhau.',
              en: 'A. In a text object, we can color each character individually with a different color.'
            },
            {
              id: 'B',
              vi: 'B. Nếu đặt đoạn văn uốn lượn theo một đường, ta không thể thay đổi định dạng đó.',
              en: 'B. If text is placed on a path, we cannot change its formatting.'
            },
            {
              id: 'C',
              vi: 'C. Trong một đoạn văn có nhiều chữ, ta có thể tuỳ chỉnh để mỗi chữ độ cao thấp khác nhau.',
              en: 'C. In a text object, we can adjust the vertical baseline shift of each character.'
            },
            {
              id: 'D',
              vi: 'D. Ta có thể đặt đoạn văn bản theo một khuôn dạng nhất định.',
              en: 'D. We can flow text into an arbitrary frame or shape.'
            }
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setQuizAnswer(item.id);
                setQuizChecked(true);
              }}
              className={`p-3.5 rounded-2xl border text-sm font-medium cursor-pointer transition-all flex items-center justify-between ${
                quizAnswer === item.id
                  ? item.id === 'B'
                    ? 'bg-emerald-500 text-white border-emerald-600 font-bold shadow-md'
                    : 'bg-rose-500 text-white border-rose-600 font-bold shadow-md'
                  : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700/80 hover:border-purple-400'
              }`}
            >
              <span>{bilingualMode === 'en' ? item.en : item.vi}</span>
            </div>
          ))}
        </div>

        {quizChecked && quizAnswer === 'B' && (
          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-950 dark:text-indigo-200 leading-relaxed">
            <strong>
              <BilingualText vi="Giải thích chuẩn SGK: " en="Textbook Explanation: " />
            </strong>
            <BilingualText
              vi="Phát biểu B là SAI vì sau khi dùng lệnh Text / Put on Path để uốn cong văn bản theo đường, đoạn văn bản đó vẫn là đối tượng văn bản sống (live text) hoàn toàn chỉnh sửa được bình thường (đổi màu, đổi phông chữ, cỡ chữ, thậm chí có thể dùng lệnh Text / Remove from Path để đưa dòng chữ trở về dạng thẳng ban đầu)!"
              en="Statement B is FALSE because after using Text / Put on Path to curve text along a path, the text remains live and editable (color, font, size can still be modified, and Text / Remove from Path can revert it to a straight line)!"
            />
          </div>
        )}
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={3} lessonId={14} />

      {/* Pagination Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={prevPage}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold transition-all shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>
            <BilingualText
              vi="Mục 2: Công cụ tinh chỉnh đường"
              en="Section 2: Node Editing"
            />
          </span>
        </button>

        <button
          onClick={nextPage}
          className="flex items-center space-x-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold transition-all shadow-md"
        >
          <span>
            <BilingualText
              vi="Mục 4: Thực hành vẽ lá & Dải cờ tiệc"
              en="Section 4: Practical Lab (Leaf & Banners)"
            />
          </span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
