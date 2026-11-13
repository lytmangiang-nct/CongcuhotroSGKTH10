import React, { useState } from 'react';
import {
  Volume2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Wifi,
  Bluetooth,
  Usb,
  Radio,
  CheckCircle2,
  HelpCircle,
  Cpu,
  Layers,
  Info,
  Apple,
  Globe
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section7PdaEvolution: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    nextPage,
    prevPage,
    setOriginalPageTarget,
    setShowOriginalModal
  } = useBook();

  // Reinforcement Question State
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Connectivity interactive tabs
  const [activeTab, setActiveTab] = useState<'os' | 'connections'>('os');

  const speechVi =
    'Mục 1: Trợ thủ số cá nhân PDA hiện đại. Phần lớn PDA dạng điện thoại di động và máy tính bảng hiện nay đều chạy trên hai hệ điều hành phổ biến là iOS của hãng Apple và Android của hãng Google. Các kết nối phổ biến gồm Wi-Fi, Bluetooth và USB. Hộp ghi nhớ: PDA là thiết bị số tích hợp nhiều chức năng hữu ích với đặc điểm nhỏ gọn và khả năng kết nối mạng.';

  const speechEn =
    'Section 1: Modern Personal Digital Assistants (PDAs). The majority of modern mobile PDAs and tablets operate on two predominant operating systems: Apple\'s iOS and Google\'s Android. Common connectivity standards include Wi-Fi, Bluetooth, and USB. Summary: A PDA is a compact networked digital device integrating rich personal utility applications.';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(bilingualMode === 'en' ? speechEn : speechVi);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-800 dark:bg-orange-950/70 dark:text-orange-300">
              {bilingualMode === 'en' ? 'Section 1' : 'Mục 1'}
            </span>
            <span className="text-xs text-slate-500 font-mono">SGK Trang 34</span>
            <button
              type="button"
              onClick={() => {
                setOriginalPageTarget(34);
                setShowOriginalModal(true);
              }}
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>{bilingualMode === 'en' ? 'Page 34 Scan' : 'Bản quét Tr. 34'}</span>
            </button>
          </div>
          <h2
            data-en="1. Personal Digital Assistants: Modern Evolution & Two Dominant Mobile OS (iOS / Android)"
            data-vi="1. Trợ thủ số cá nhân: Sự phát triển & Hai hệ điều hành di động (iOS / Android)"
            className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100"
          >
            <BilingualText
              vi="1. Trợ thủ số cá nhân: Sự phát triển & Hai hệ điều hành di động (iOS / Android)"
              en="1. Personal Digital Assistants: Modern Evolution & Two Dominant Mobile OS (iOS / Android)"
            />
          </h2>
        </div>
      </div>

      {/* Two Dominant Mobile Operating Systems & Connectivity (SGK Trang 34) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('os')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'os'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <BilingualText vi="Hai hệ điều hành: iOS & Android" en="Two Mobile OS: iOS & Android" />
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('connections')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'connections'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <BilingualText vi="Các cổng & Chuẩn kết nối PDA" en="Connectivity & Hardware Ports" />
            </button>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {bilingualMode === 'en' ? 'Figures 7.2 – 7.3 Textbook' : 'Hình 7.2 – 7.3 SGK'}
          </span>
        </div>

        {/* Tab 1: Operating Systems Comparison */}
        {activeTab === 'os' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
            {/* iOS by Apple */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
                    <Apple className="w-5 h-5" />
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-300">
                    Apple Ecosystem
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                  <BilingualText
                    vi="Hệ điều hành iOS (Apple)"
                    en="Apple iOS Operating System"
                  />
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  <BilingualText
                    vi="Hệ điều hành độc quyền của hãng Apple được cài đặt sẵn trên dòng điện thoại iPhone và máy tính bảng iPad (iPadOS). Giao diện mượt mà, tính bảo mật cao và kho ứng dụng App Store được kiểm duyệt chặt chẽ."
                    en="Apple's proprietary operating system preinstalled on iPhone and iPad (iPadOS). Known for smooth animations, rigorous security sandboxing, and curated App Store ecosystem."
                  />
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200 dark:border-slate-700 text-[11px] font-mono text-slate-500">
                {bilingualMode === 'en' ? 'Typical Devices: iPhone, iPad' : 'Thiết bị tiêu biểu: iPhone, iPad'}
              </div>
            </div>

            {/* Android by Google */}
            <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                    <Globe className="w-5 h-5" />
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    Open Source
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                  <BilingualText
                    vi="Hệ điều hành Android (Google)"
                    en="Google Android Operating System"
                  />
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  <BilingualText
                    vi="Hệ điều hành mã nguồn mở do Google phát triển, vận hành trên phần lớn điện thoại thông minh và máy tính bảng của nhiều hãng sản xuất toàn cầu (Samsung, Xiaomi, Oppo, Vivo,...). Kho ứng dụng khổng lồ Google Play Store (CH Play)."
                    en="Open-source mobile operating system developed by Google, powering billions of devices from global hardware manufacturers. Features Google Play Store ecosystem."
                  />
                </p>
              </div>
              <div className="pt-3 border-t border-emerald-200 dark:border-emerald-800 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                {bilingualMode === 'en' ? 'Typical Devices: Samsung Galaxy, Xiaomi, Oppo Tablet' : 'Thiết bị tiêu biểu: Samsung Galaxy, Xiaomi, Oppo Tablet'}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Connections */}
        {activeTab === 'connections' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in">
            {/* Wi-Fi */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Wifi className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                <BilingualText vi="Kết nối Wi-Fi" en="Wi-Fi Connectivity" />
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <BilingualText
                  vi="Kết nối mạng Internet không dây tốc độ cao, hỗ trợ lướt web, học trực tuyến qua Zoom/Meet và xem video chất lượng cao."
                  en="High-speed wireless local networking providing broadband Internet access for web browsing and live video classrooms."
                />
              </p>
            </div>

            {/* Bluetooth */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Bluetooth className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                <BilingualText vi="Kết nối Bluetooth" en="Bluetooth Connectivity" />
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <BilingualText
                  vi="Kết nối không dây tầm ngắn (khoảng 10 mét) với tai nghe không dây, loa di động, đồng hồ thông minh và bàn phím ngoài."
                  en="Short-range wireless personal area network pairing with wireless earbuds, speakers, smartwatches, and accessories."
                />
              </p>
            </div>

            {/* USB */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Usb className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                <BilingualText vi="Cổng cắm USB (Type-C / Lightning)" en="USB Port (Type-C / Lightning)" />
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <BilingualText
                  vi="Cổng truyền dữ liệu có dây và sạc pin; dùng để kết nối điện thoại với máy tính để sao chép ảnh, tài liệu tốc độ cao."
                  en="Physical interface for fast charging and high-bandwidth wired data transfer to computers and external drives."
                />
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Official Summary Box 1 (Hộp Ghi nhớ 1 SGK Trang 34) */}
      <div className="p-5 rounded-2xl bg-linear-to-r from-amber-500/10 via-amber-500/5 to-transparent border-2 border-amber-500/40 dark:border-amber-500/30 space-y-3">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <BilingualText vi="Hộp Ghi nhớ 1 (SGK Trang 34)" en="Official Summary Box 1 (Page 34)" />
        </div>
        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
          <BilingualText
            vi="Trợ thủ số cá nhân hay PDA là thiết bị số tích hợp nhiều chức năng và phần mềm ứng dụng hữu ích cho người dùng với đặc điểm quan trọng là nhỏ gọn, có khả năng kết nối mạng."
            en="A Personal Digital Assistant (PDA) is a digital device integrating rich functional utilities and user applications, distinguished by its compact portability and networking capabilities."
          />
        </p>
      </div>

      {/* SGK Page 34 Reinforcement Question */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-orange-600 uppercase tracking-wider">
              {bilingualMode === 'en' ? 'Checkpoint Question (Page 34 SGK)' : 'Câu hỏi củng cố (Trang 34 SGK)'}
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              <BilingualText
                vi="Kết nối nào không phải là kết nối phổ biến trên các PDA hiện nay?"
                en="Which connection is NOT common on modern PDAs?"
              />
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {[
            { id: 'A', textVi: 'A. Wifi', textEn: 'A. Wi-Fi', correct: false },
            { id: 'B', textVi: 'B. Bluetooth', textEn: 'B. Bluetooth', correct: false },
            { id: 'C', textVi: 'C. Hồng ngoại', textEn: 'C. Infrared', correct: true },
            { id: 'D', textVi: 'D. USB', textEn: 'D. USB', correct: false }
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                setSelectedAnswer(opt.id);
                setShowExplanation(true);
              }}
              className={`p-3 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${
                selectedAnswer === opt.id
                  ? opt.correct
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-orange-400 text-slate-800 dark:text-slate-200'
              }`}
            >
              <span>{bilingualMode === 'en' ? opt.textEn : opt.textVi}</span>
            </button>
          ))}
        </div>

        {showExplanation && selectedAnswer === 'C' && (
          <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800 text-xs sm:text-sm text-orange-950 dark:text-orange-200 space-y-1 animate-in fade-in">
            <div className="font-bold flex items-center gap-1.5 text-orange-800 dark:text-orange-300">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>
                <BilingualText vi="Giải thích đáp án chuẩn SGK:" en="Official Textbook Explanation:" />
              </span>
            </div>
            <p className="leading-relaxed">
              <BilingualText
                vi="Đáp án chính xác là C. Hồng ngoại. Các PDA hiện đại đều sử dụng kết nối không dây tầm xa (Wifi), kết nối tầm ngắn (Bluetooth) và kết nối có dây (USB). Kết nối hồng ngoại là công nghệ cũ tốc độ rất chậm, đòi hỏi hai thiết bị phải thẳng hàng đối diện nhau ở khoảng cách gần, nên không còn là kết nối phổ biến trên các smartphone hay tablet ngày nay."
                en="The correct answer is C. Infrared. Modern PDAs universally feature high-speed Wi-Fi, Bluetooth, and USB ports. Infrared is an obsolete optical protocol with low bandwidth and line-of-sight constraints, virtually retired from mainstream smartphones."
              />
            </p>
          </div>
        )}
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={1} lessonId={7} />

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={prevPage}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'Previous: Overview' : 'Quay lại: Mục tiêu bài học'}</span>
        </button>

        <button
          type="button"
          onClick={nextPage}
          className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer"
        >
          <span>{bilingualMode === 'en' ? 'Next: Hardware Buttons' : 'Tiếp theo: Nhận biết nút bấm phần cứng'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
