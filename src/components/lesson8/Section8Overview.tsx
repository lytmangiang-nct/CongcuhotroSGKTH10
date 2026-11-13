import React, { useState } from 'react';
import {
  Globe,
  Network,
  Server,
  Printer,
  Monitor,
  Router,
  Wifi,
  Smartphone,
  CheckCircle2,
  HelpCircle,
  Volume2,
  ArrowRight,
  Info,
  Layers,
  Sparkles,
  ShieldCheck,
  Radio
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section8Overview: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    nextPage,
    setOriginalPageTarget
  } = useBook();

  // Router port explorer state
  const [selectedPort, setSelectedPort] = useState<'lan' | 'wan' | null>('wan');

  // Activity 1 interactive quiz states
  const [act1Ans1, setAct1Ans1] = useState<string | null>(null);
  const [act1Ans2, setAct1Ans2] = useState<string | null>(null);
  const [showAct1Feedback, setShowAct1Feedback] = useState(false);

  // Sound narration for section
  const sectionSpeechVi =
    'Chủ đề 2: Mạng máy tính và Internet. Bài 8: Mạng máy tính trong cuộc sống hiện đại. Sau bài học này, em sẽ hiểu được sự khác biệt giữa mạng cục bộ LAN và Internet toàn cầu; trình bày được những biến đổi về chất lượng cuộc sống, học tập và làm việc; đồng thời nêu được các công nghệ đột phá như điện toán đám mây và kết nối vạn vật IoT.';
  const sectionSpeechEn =
    'Topic 2: Computer Networks and the Internet. Lesson 8: Computer Networks in Modern Life. After this lesson, you will understand the key differences between LAN and the global Internet, articulate changes in lifestyle and learning, and describe breakthrough technologies including Cloud Computing and the Internet of Things.';

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
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Lesson Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-emerald-100 text-xs font-bold tracking-wide uppercase">
              <Network className="w-3.5 h-3.5" />
              <span>{bilingualMode === 'en' ? 'Topic 2 • Computer Networks' : 'Chủ đề 2 • Mạng máy tính & Internet'}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setOriginalPageTarget(38)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 hover:bg-emerald-950/60 border border-emerald-300/30 text-xs font-bold text-white transition-all cursor-pointer"
                title={bilingualMode === 'en' ? 'Compare with original textbook page 38' : 'Đối chiếu trang 38 SGK gốc'}
              >
                <span>{bilingualMode === 'en' ? 'Textbook Page 38' : 'Trang 38 SGK'}</span>
              </button>
            </div>
          </div>

          <div>
            <h1
              className="text-2xl sm:text-4xl font-black tracking-tight text-white drop-shadow-xs"
              data-lesson-title="true"
              data-lesson-num={8}
            >
              <BilingualText
                vi="BÀI 8: MẠNG MÁY TÍNH TRONG CUỘC SỐNG HIỆN ĐẠI"
                en="LESSON 8: COMPUTER NETWORKS IN MODERN LIFE"
              />
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 font-medium mt-1">
              <BilingualText
                vi="Sự khác biệt giữa mạng LAN và Internet • Vai trò biến đổi xã hội • Điện toán đám mây & Internet vạn vật (IoT)"
                en="Distinguishing LAN vs Internet • Transformative Societal Impact • Cloud Computing & The Internet of Things (IoT)"
              />
            </p>
          </div>

          {/* Core Objectives Card */}
          <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-200 flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{bilingualMode === 'en' ? 'Lesson Learning Objectives (Textbook p. 38)' : 'Sau bài học này em sẽ (Trang 38 SGK)'}</span>
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm text-emerald-50">
              <li className="flex items-start gap-2.5 bg-black/15 p-3 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                <span>
                  <BilingualText
                    vi="Hiểu được sự khác biệt cốt lõi giữa mạng cục bộ LAN và mạng toàn cầu Internet."
                    en="Understand the fundamental distinction between Local Area Networks (LAN) and the global Internet."
                  />
                </span>
              </li>
              <li className="flex items-start gap-2.5 bg-black/15 p-3 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                <span>
                  <BilingualText
                    vi="Trình bày được những thay đổi về chất lượng cuộc sống, phương thức học tập và làm việc trong xã hội hiện đại."
                    en="Articulate transformative shifts in living standards, learning modalities, and workplace productivity."
                  />
                </span>
              </li>
              <li className="flex items-start gap-2.5 bg-black/15 p-3 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                <span>
                  <BilingualText
                    vi="Nêu được một số công nghệ nền tảng dựa trên Internet: Điện toán đám mây (Cloud) và Kết nối vạn vật (IoT)."
                    en="Describe breakthrough Internet technologies: Cloud Computing services and the Internet of Things (IoT)."
                  />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Warm-Up: Figure 8.1 Interactive Local Network Architecture */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {bilingualMode === 'en' ? 'Warm-up Inquiry (Textbook p. 38)' : 'Khởi động bài học (Trang 38 SGK)'}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                <BilingualText
                  vi="Hình 8.1: Mô hình của một mạng máy tính cục bộ"
                  en="Figure 8.1: Local Computer Network Architecture"
                />
              </h2>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            {bilingualMode === 'en' ? 'Interactive Lab' : 'Phòng thí nghiệm tương tác'}
          </span>
        </div>

        {/* Narrative Context */}
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <BilingualText
            vi="Hình 8.1 mô tả một mạng máy tính cục bộ: Máy chủ, máy tính để bàn và máy in là các thiết bị đầu cuối; còn bộ chia (HUB), bộ chuyển mạch (Switch), bộ định tuyến (Router) là các thiết bị kết nối. Trên bộ định tuyến thường phân biệt rõ cổng LAN và cổng INTERNET (WAN). Tại sao lại phải phân biệt như vậy?"
            en="Figure 8.1 illustrates a local network model: Servers, PCs, and printers represent terminal end-devices; whereas Hubs, Switches, and Routers serve as networking hardware. Routers strictly distinguish between LAN and INTERNET (WAN) ports. Why is this distinction vital?"
          />
        </p>

        {/* Visual Network Architecture Diagram */}
        <div className="p-6 rounded-2xl bg-linear-to-b from-slate-50 to-slate-100/70 dark:from-slate-950/70 dark:to-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Terminal End-Devices */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Monitor className="w-3.5 h-3.5 text-blue-500" />
                <span>{bilingualMode === 'en' ? 'Terminal End-Devices' : '1. Thiết bị đầu cuối'}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900 dark:text-slate-100">
                      <BilingualText vi="Máy chủ (Server)" en="Local Server" />
                    </div>
                    <div className="text-[11px] text-slate-500">
                      <BilingualText vi="Lưu trữ dữ liệu chung, phần mềm quản lí" en="Central database & local file share" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
                  <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                    <Monitor className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900 dark:text-slate-100">
                      <BilingualText vi="Máy tính để bàn / Laptop" en="Workstation / Laptop" />
                    </div>
                    <div className="text-[11px] text-slate-500">
                      <BilingualText vi="Thiết bị người dùng soạn thảo, làm việc" en="User work terminals" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                    <Printer className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900 dark:text-slate-100">
                      <BilingualText vi="Máy in mạng (Network Printer)" en="Shared Network Printer" />
                    </div>
                    <div className="text-[11px] text-slate-500">
                      <BilingualText vi="Mọi máy trong phòng cùng in ấn chung" en="Shared printing service for entire office" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Central Connectivity: Hub / Switch */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-center space-y-3">
              <div className="inline-flex p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mx-auto">
                <Network className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  <BilingualText vi="Bộ chia (Hub) / Chuyển mạch (Switch)" en="Hub / Switch (LAN Core)" />
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <BilingualText
                    vi="Gom tất cả đường cáp mạng nội bộ, chuyển tiếp dữ liệu tức thời giữa các máy tính trong phòng"
                    en="Aggregates local Ethernet lines, switching frames directly between LAN terminals"
                  />
                </p>
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                <BilingualText vi="Phạm vi mạng nội bộ LAN" en="Local LAN Domain" />
              </div>
            </div>

            {/* Edge Gateway: Router (LAN vs Internet) */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Router className="w-3.5 h-3.5 text-amber-500" />
                <span>{bilingualMode === 'en' ? 'Gateway Router & Ports' : '2. Bộ định tuyến Router'}</span>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Router className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
                      <BilingualText vi="Cổng kết nối Router" en="Router Port Analyzer" />
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm bg-slate-100 dark:bg-slate-700 text-slate-600">
                    RJ-45
                  </span>
                </div>

                {/* Interactive Port Toggle Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPort('lan')}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedPort === 'lan'
                        ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-900 dark:text-amber-200 ring-2 ring-amber-300/40'
                        : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span>{bilingualMode === 'en' ? 'LAN Ports (Yellow)' : 'Cổng LAN (Màu vàng)'}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">1, 2, 3, 4</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPort('wan')}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedPort === 'wan'
                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-900 dark:text-blue-200 ring-2 ring-blue-300/40'
                        : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-400'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      <span>{bilingualMode === 'en' ? 'INTERNET / WAN' : 'Cổng INTERNET (Xanh)'}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">WAN Uplink</div>
                  </button>
                </div>

                {/* Explanation Output */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedPort === 'lan' ? (
                    <div>
                      <strong className="text-amber-600 dark:text-amber-400">
                        {bilingualMode === 'en' ? 'LAN Ports Role: ' : 'Vai trò Cổng LAN: '}
                      </strong>
                      <BilingualText
                        vi="Kết nối trực tiếp với Switch hoặc các máy tính, máy in trong gia đình/phòng học. Dữ liệu trao đổi qua các cổng này chỉ lưu thông cục bộ, bảo mật và tốc độ cao (1 Gbps)."
                        en="Directly connects to switches or local client PCs/printers. Traffic across these ports remains strictly internal with high wire-speed throughput (1 Gbps)."
                      />
                    </div>
                  ) : (
                    <div>
                      <strong className="text-blue-600 dark:text-blue-400">
                        {bilingualMode === 'en' ? 'INTERNET / WAN Port Role: ' : 'Vai trò Cổng INTERNET: '}
                      </strong>
                      <BilingualText
                        vi="Kết nối với đường cáp quang của nhà mạng (ISP) để đi ra mạng toàn cầu Internet. Router sẽ định tuyến mọi yêu cầu truy cập trang web (Google, YouTube) ra ngoài qua cổng duy nhất này."
                        en="Connects directly to the ISP optical modem uplink. The router directs all outbound web queries (Google, YouTube) outside the local network via this dedicated WAN port."
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity 1: Differentiating Internet from LAN */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {bilingualMode === 'en' ? 'Activity 1 (Textbook p. 38)' : 'Hoạt động 1 (Trang 38 SGK)'}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              <BilingualText
                vi="Phân biệt Internet với mạng LAN"
                en="Differentiating the Internet from a Local LAN"
              />
            </h3>
          </div>
        </div>

        <div className="space-y-6">
          {/* Question 1 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">1</span>
              <span>
                <BilingualText
                  vi="Phạm vi sử dụng của Internet là gì?"
                  en="What is the geographic scope of the Internet?"
                />
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { key: 'A', vi: 'A. Chỉ trong gia đình', en: 'A. Only within a home' },
                { key: 'B', vi: 'B. Chỉ trong một cơ quan', en: 'B. Only within an organization' },
                { key: 'C', vi: 'C. Toàn cầu (Global)', en: 'C. Worldwide Global Scope' }
              ].map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setAct1Ans1(opt.key)}
                  className={`p-3 rounded-xl border text-left font-medium text-xs sm:text-sm transition-all cursor-pointer ${
                    act1Ans1 === opt.key
                      ? opt.key === 'C'
                        ? 'bg-emerald-500 text-white font-bold border-emerald-500 shadow-sm'
                        : 'bg-rose-500 text-white font-bold border-rose-500 shadow-sm'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                  }`}
                >
                  <BilingualText vi={opt.vi} en={opt.en} />
                </button>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">2</span>
              <span>
                <BilingualText
                  vi="Điện thoại thông minh được kết nối với Internet bằng cách nào?"
                  en="How does a smartphone connect to the Internet?"
                />
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { key: 'A', vi: 'A. Qua dịch vụ di động 3G, 4G, 5G', en: 'A. Via mobile cellular 3G, 4G, 5G' },
                { key: 'B', vi: 'B. Kết nối gián tiếp qua sóng Wi-Fi', en: 'B. Indirectly via local Wi-Fi router' },
                { key: 'C', vi: 'C. Cả phương án A và B đều đúng', en: 'C. Both A and B are correct' }
              ].map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setAct1Ans2(opt.key)}
                  className={`p-3 rounded-xl border text-left font-medium text-xs sm:text-sm transition-all cursor-pointer ${
                    act1Ans2 === opt.key
                      ? opt.key === 'C'
                        ? 'bg-emerald-500 text-white font-bold border-emerald-500 shadow-sm'
                        : 'bg-rose-500 text-white font-bold border-rose-500 shadow-sm'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                  }`}
                >
                  <BilingualText vi={opt.vi} en={opt.en} />
                </button>
              ))}
            </div>
          </div>

          {/* Verification feedback */}
          {act1Ans1 === 'C' && act1Ans2 === 'C' && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm text-emerald-800 dark:text-emerald-200 space-y-1">
              <div className="font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>
                  {bilingualMode === 'en' ? 'Official Textbook Conclusion (p. 38):' : 'Kết luận chuẩn SGK (Trang 38):'}
                </span>
              </div>
              <p className="leading-relaxed">
                <BilingualText
                  vi="Giải thích chuẩn SGK: Internet là mạng diện rộng (WAN) có quy mô toàn cầu (Đáp án 1.C). Điện thoại thông minh có thể kết nối Internet vừa qua mạng viễn thông di động 3G/4G/5G trực tiếp, vừa có thể kết nối gián tiếp qua sóng Wi-Fi vào một mạng LAN cục bộ (Đáp án 2.C)."
                  en="Textbook Explanation: The Internet is a global Wide Area Network (Answer 1.C). Smartphones connect either directly via cellular data (3G/4G/5G) or indirectly through local Wi-Fi LANs (Answer 2.C)."
                />
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Network Geographic Scope: LAN vs WAN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
            <Layers className="w-4 h-4" />
            <span>
              {bilingualMode === 'en'
                ? 'Local Area Network (LAN)'
                : 'Mạng cục bộ (LAN)'}
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <BilingualText
              vi="Có phạm vi địa lí nhỏ như gia đình, trường học, công ty. Được thiết lập bởi cá nhân hoặc tổ chức để chia sẻ tài nguyên phần cứng (máy in) và dữ liệu nội bộ với tốc độ truyền cực cao."
              en="Covers a small geographical area such as a home, school, or company. Established by an individual or organization to share hardware resources (printers) and internal data at high transmission speeds."
            />
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-sm">
            <Globe className="w-4 h-4" />
            <span>
              {bilingualMode === 'en'
                ? 'Wide Area Network (WAN) and the Internet'
                : 'Mạng diện rộng (WAN) và Internet'}
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <BilingualText
              vi="Được hình thành bằng cách liên kết nhiều mạng LAN hay các máy tính đơn lẻ trên phạm vi thành phố, quốc gia hoặc toàn cầu. Internet chính là mạng diện rộng có quy mô lớn nhất hành tinh."
              en="Constructed by interconnecting myriad LANs and independent computers across countries or continents. The Internet is the most expansive global WAN on Earth."
            />
          </p>
        </div>
      </div>

      {/* Pedagogical Prompts */}
      <TeacherPromptsWidget sectionIndex={0} lessonId={8} />

      {/* Navigation Footer */}
      <div className="flex items-center justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={nextPage}
          className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
        >
          <span>{bilingualMode === 'en' ? 'Section 1: LAN vs Internet' : 'Tiếp tục Mục 1: Mạng LAN và Internet'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
