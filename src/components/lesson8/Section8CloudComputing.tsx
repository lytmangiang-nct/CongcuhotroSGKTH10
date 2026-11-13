import React, { useState } from 'react';
import {
  Cloud,
  Server,
  Layers,
  Database,
  Code,
  HardDrive,
  CheckCircle2,
  HelpCircle,
  Volume2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Lightbulb,
  ShieldCheck,
  Zap,
  DollarSign,
  FileText
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section8CloudComputing: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    nextPage,
    prevPage,
    setOriginalPageTarget
  } = useBook();

  // Active cloud model pyramid layer
  const [activeModel, setActiveModel] = useState<'saas' | 'paas' | 'iaas'>('saas');

  // Activity 2 interactive answers
  const [act2Answer, setAct2Answer] = useState<{ an: string | null; binh: string | null }>({
    an: null,
    binh: null
  });

  // Checkpoint question answers
  const [checkpoint1, setCheckpoint1] = useState<boolean | null>(null);
  const [checkpoint2, setCheckpoint2] = useState<boolean | null>(null);

  const sectionSpeechVi =
    'Mục 3: Điện toán đám mây. Điện toán đám mây được định nghĩa là việc phân phối các tài nguyên Công nghệ thông tin theo nhu cầu qua Internet với chính sách thanh toán theo mức sử dụng. Ba mô hình dịch vụ chủ yếu gồm có: SaaS - phần mềm như một dịch vụ, PaaS - nền tảng như một dịch vụ, và IaaS - hạ tầng như một dịch vụ. Sử dụng dịch vụ đám mây mang lại tính mềm dẻo cao, chất lượng ổn định và tiết kiệm chi phí so với tự đầu tư phần cứng cục bộ. Hộp ghi nhớ trang 41 SGK.';
  const sectionSpeechEn =
    'Section 3: Cloud Computing. Cloud computing represents the on-demand delivery of IT resources over the Internet with pay-as-you-go pricing. The three fundamental delivery models are SaaS (Software as a Service), PaaS (Platform as a Service), and IaaS (Infrastructure as a Service). Cloud adoption unlocks superior flexibility, carrier-grade reliability, and cost-effective scalability compared to on-premise hardware procurement. Official Summary Box on Page 41.';

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
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400 font-mono font-bold text-xs uppercase">
              {bilingualMode === 'en' ? 'Section 3 • Pages 40–41' : 'Mục 3 • Trang 40 – 41 SGK'}
            </span>
            <button
              type="button"
              onClick={() => setOriginalPageTarget(41)}
              className="text-xs text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 font-semibold cursor-pointer underline"
            >
              {bilingualMode === 'en' ? 'View Textbook p. 41' : 'Xem trang 41 SGK gốc'}
            </button>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">
            <BilingualText
              vi="3. ĐIỆN TOÁN ĐÁM MÂY (CLOUD COMPUTING)"
              en="3. CLOUD COMPUTING AND ESSENTIAL SERVICE MODELS"
            />
          </h2>
        </div>
      </div>

      {/* Activity 2: "Buy or Subscribe?" (Hoạt động 2 Trang 40 SGK) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
            <Cloud className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              {bilingualMode === 'en' ? 'Activity 2 (Textbook p. 40)' : 'Hoạt động 2 (Trang 40 SGK)'}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              <BilingualText
                vi="Mua sắm phần cứng hay sử dụng dịch vụ thuê bao đám mây?"
                en="Procuring On-Premise Assets vs Cloud Subscription Services?"
              />
            </h3>
          </div>
        </div>

        {/* 2 Scenarios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Scenario 1: An */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase text-sky-700 dark:text-sky-400">
                {bilingualMode === 'en' ? 'Case 1: Student An' : 'Tình huống 1: Bạn An'}
              </span>
              <HardDrive className="w-4 h-4 text-sky-600" />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <BilingualText
                vi="Bạn An có rất nhiều ảnh cần lưu nhưng ổ cứng sắp hết chỗ. Thay vì bỏ tiền mua thêm ổ cứng vật lí gắn ngoài, An đăng ký dịch vụ lưu trữ trên Internet (Google Drive, Dropbox). Khi cần, An chỉ cần có mạng là truy cập được ngay."
                en="Student An needs to archive thousands of high-res photos but local storage is full. Instead of purchasing an expensive external HDD, An subscribes to Google Drive and Dropbox to access files on-demand."
              />
            </p>
            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {bilingualMode === 'en' ? 'An is subscribing to which resource?' : 'An đang thuê bao loại tài nguyên nào?'}
              </div>
              <div className="flex gap-2">
                {[
                  { key: 'hardware', label: 'Phần cứng (Lưu trữ)', correct: true },
                  { key: 'software', label: 'Phần mềm', correct: false }
                ].map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setAct2Answer((prev) => ({ ...prev, an: opt.key }))}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      act2Answer.an === opt.key
                        ? opt.correct
                          ? 'bg-emerald-500 text-slate-950 shadow-xs font-black'
                          : 'bg-rose-500 text-white font-black'
                        : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Scenario 2: Binh */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase text-indigo-700 dark:text-indigo-400">
                {bilingualMode === 'en' ? 'Case 2: Teacher Binh' : 'Tình huống 2: Cô Bình'}
              </span>
              <FileText className="w-4 h-4 text-indigo-600" />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <BilingualText
                vi="Công việc của cô Bình phải làm tài liệu nhiều và di chuyển liên tục. Thay vì mua phần mềm văn phòng Word cài chết trên một máy tính ở nhà, cô đăng ký sử dụng Google Docs trên đám mây để soạn thảo mọi lúc mọi nơi."
                en="Teacher Binh constantly travels and drafts coursework. Rather than buying single-license desktop office software installed only at home, she uses cloud-hosted Google Docs on any connected terminal."
              />
            </p>
            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {bilingualMode === 'en' ? 'Binh is subscribing to which resource?' : 'Cô Bình đang thuê bao loại tài nguyên nào?'}
              </div>
              <div className="flex gap-2">
                {[
                  { key: 'hardware', label: 'Phần cứng', correct: false },
                  { key: 'software', label: 'Phần mềm ứng dụng', correct: true }
                ].map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setAct2Answer((prev) => ({ ...prev, binh: opt.key }))}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      act2Answer.binh === opt.key
                        ? opt.correct
                          ? 'bg-emerald-500 text-slate-950 shadow-xs font-black'
                          : 'bg-rose-500 text-white font-black'
                        : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Synthesis */}
        <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
          <strong className="text-sky-800 dark:text-sky-300">Định nghĩa Điện toán đám mây: </strong>
          Là việc chia sẻ các tài nguyên công nghệ thông tin (mạng, máy chủ, dung lượng lưu trữ, phần mềm ứng dụng) theo nhu cầu qua mạng Internet miễn phí hoặc trả phí theo hạn mức sử dụng (Pay-as-you-go).
        </div>
      </div>

      {/* 3 Cloud Service Models (SaaS - PaaS - IaaS Pyramid) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            {bilingualMode === 'en' ? 'Cloud Architecture' : 'Kiến trúc dịch vụ đám mây chuẩn quốc tế'}
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
            <BilingualText
              vi="Ba mô hình dịch vụ đám mây cơ bản: SaaS • PaaS • IaaS"
              en="Three Foundational Cloud Delivery Models: SaaS • PaaS • IaaS"
            />
          </h3>
        </div>

        {/* Model Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setActiveModel('saas')}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              activeModel === 'saas'
                ? 'bg-sky-600 text-white border-sky-600 shadow-md font-bold'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-sky-400 text-slate-700 dark:text-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs uppercase tracking-wider opacity-80">Cấp độ 1 (Ứng dụng)</span>
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-base font-black">SaaS</div>
            <div className="text-xs opacity-90 mt-1">Software as a Service</div>
          </button>

          <button
            type="button"
            onClick={() => setActiveModel('paas')}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              activeModel === 'paas'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md font-bold'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-400 text-slate-700 dark:text-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs uppercase tracking-wider opacity-80">Cấp độ 2 (Nền tảng)</span>
              <Code className="w-4 h-4" />
            </div>
            <div className="text-base font-black">PaaS</div>
            <div className="text-xs opacity-90 mt-1">Platform as a Service</div>
          </button>

          <button
            type="button"
            onClick={() => setActiveModel('iaas')}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              activeModel === 'iaas'
                ? 'bg-teal-600 text-white border-teal-600 shadow-md font-bold'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-teal-400 text-slate-700 dark:text-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs uppercase tracking-wider opacity-80">Cấp độ 3 (Hạ tầng)</span>
              <Server className="w-4 h-4" />
            </div>
            <div className="text-base font-black">IaaS</div>
            <div className="text-xs opacity-90 mt-1">Infrastructure as a Service</div>
          </button>
        </div>

        {/* Detailed Model Card */}
        <div className="p-6 rounded-2xl bg-linear-to-br from-slate-50 to-slate-100/60 dark:from-slate-950 dark:to-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          {activeModel === 'saas' && (
            <div className="space-y-3 animate-in fade-in">
              <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold text-base">
                <FileText className="w-5 h-5" />
                <span>SaaS - Phần mềm như một dịch vụ (Software as a Service)</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <BilingualText
                  vi="Cho thuê các phần mềm ứng dụng hoàn chỉnh chạy trên máy chủ đám mây. Người dùng cuối chỉ cần mở trình duyệt web hoặc app di động để làm việc ngay mà không cần cài đặt phức tạp, không cần lo cập nhật bản vá hay bảo trì hệ thống."
                  en="Delivers turnkey software applications hosted entirely on cloud servers. End-users interact directly via web browsers or mobile apps without installation or patch maintenance."
                />
              </p>
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <strong className="text-slate-900 dark:text-slate-100">
                  {bilingualMode === 'en' ? 'Textbook Examples: ' : 'Ví dụ tiêu biểu trong SGK: '}
                </strong>
                <span className="text-slate-600 dark:text-slate-300">
                  <BilingualText
                    vi="Google Docs (soạn thảo văn bản cộng tác), Zoom / Microsoft Teams (phòng học ảo tương tác), Gmail (thư điện tử)."
                    en="Google Docs (collaborative document editing), Zoom / Microsoft Teams (interactive virtual classrooms), Gmail (electronic mail)."
                  />
                </span>
              </div>
            </div>
          )}

          {activeModel === 'paas' && (
            <div className="space-y-3 animate-in fade-in">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-base">
                <Code className="w-5 h-5" />
                <span>
                  {bilingualMode === 'en'
                    ? 'PaaS - Platform as a Service'
                    : 'PaaS - Nền tảng như một dịch vụ (Platform as a Service)'}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <BilingualText
                  vi="Cung cấp cả một hệ thống các phần mềm nền tảng để các tổ chức và lập trình viên phát triển, vận hành ứng dụng mới. Ví dụ: Dịch vụ bản đồ số Google Maps API được các hãng taxi công nghệ thuê để tích hợp định vị dẫn đường."
                  en="Provides developers and enterprises with managed platform environments and APIs to build and run custom applications, eliminating backend server configuration."
                />
              </p>
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <strong className="text-slate-900 dark:text-slate-100">
                  {bilingualMode === 'en' ? 'Textbook Examples: ' : 'Ví dụ tiêu biểu trong SGK: '}
                </strong>
                <span className="text-slate-600 dark:text-slate-300">
                  <BilingualText
                    vi="Nền tảng bản đồ số Google Maps, hệ quản trị cơ sở dữ liệu trên đám mây, Firebase, nền tảng AI dịch tự động."
                    en="Google Maps digital mapping platform, cloud database management systems, Firebase, automated AI translation platform."
                  />
                </span>
              </div>
            </div>
          )}

          {activeModel === 'iaas' && (
            <div className="space-y-3 animate-in fade-in">
              <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-base">
                <Server className="w-5 h-5" />
                <span>
                  {bilingualMode === 'en'
                    ? 'IaaS - Infrastructure as a Service'
                    : 'IaaS - Hạ tầng như một dịch vụ (Infrastructure as a Service)'}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <BilingualText
                  vi="Cho thuê các tài nguyên phần cứng máy tính và hạ tầng công nghệ thông tin qua mạng: Máy chủ ảo hóa (Virtual Machines), không gian ổ đĩa lưu trữ, băng thông mạng. Đây là dạng thuê tài nguyên phần cứng đơn giản và linh hoạt nhất."
                  en="Provisions raw computational infrastructure over the Internet: virtual servers, elastic block storage, and software-defined networking."
                />
              </p>
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <strong className="text-slate-900 dark:text-slate-100">
                  {bilingualMode === 'en' ? 'Textbook Examples: ' : 'Ví dụ tiêu biểu trong SGK: '}
                </strong>
                <span className="text-slate-600 dark:text-slate-300">
                  <BilingualText
                    vi="Dịch vụ lưu trữ trực tuyến Dropbox, Google Drive; máy chủ ảo Amazon AWS EC2, Microsoft Azure VMs, Viettel Cloud Storage."
                    en="Online storage services Dropbox, Google Drive; virtual servers Amazon AWS EC2, Microsoft Azure VMs, Viettel Cloud Storage."
                  />
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3 Core Benefits of Cloud Services */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
            {bilingualMode === 'en'
              ? '1. Flexibility and Availability'
              : '1. Tính mềm dẻo & Sẵn sàng'}
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <BilingualText
              vi="Người dùng không bị ràng buộc vào một thiết bị cá nhân hay vị trí cố định. Bất cứ khi nào có Internet đều có thể làm việc ngay."
              en="Users are not tethered to a single personal device or fixed physical location. Work can be accessed anytime, anywhere with an Internet connection."
            />
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
            {bilingualMode === 'en'
              ? '2. Quality and Security'
              : '2. Chất lượng cao & An toàn'}
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <BilingualText
              vi="Được vận hành bởi các trung tâm dữ liệu đạt chuẩn quốc tế, có hệ thống sao lưu dự phòng liên tục chống mất mát dữ liệu."
              en="Operated by international-standard data centers with continuous automated backups preventing data loss and ensuring high reliability."
            />
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
            {bilingualMode === 'en'
              ? '3. Cost Efficiency'
              : '3. Tính kinh tế vượt trội'}
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <BilingualText
              vi="Không phải bỏ chi phí khổng lồ mua sắm máy chủ hay bảo trì phần cứng. Chỉ chi trả đúng dung lượng và thời gian thực tế sử dụng."
              en="Eliminates massive upfront capital expenses for servers and hardware maintenance. Only pay for the exact resources and duration consumed."
            />
          </p>
        </div>
      </div>

      {/* Official Summary Box 2 (Trang 41 SGK) */}
      <div className="p-6 rounded-3xl bg-amber-500/10 dark:bg-amber-500/15 border-2 border-amber-500/40 space-y-3">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-sm uppercase tracking-wider">
          <Lightbulb className="w-5 h-5 text-amber-600" />
          <span>{bilingualMode === 'en' ? 'Official Textbook Summary Box (Page 41)' : 'Hộp Ghi nhớ cốt lõi (Trang 41 SGK)'}</span>
        </div>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
          <li className="flex items-start gap-2.5">
            <span className="text-amber-600 font-bold">•</span>
            <span>
              <BilingualText
                vi="Điện toán đám mây được định nghĩa như là việc phân phối các tài nguyên Công nghệ thông tin theo nhu cầu qua Internet với chính sách thanh toán theo mức sử dụng. SaaS, PaaS, IaaS là các loại hình dịch vụ chủ yếu của điện toán đám mây."
                en="Cloud computing is defined as the on-demand distribution of IT resources over the Internet with pay-as-you-go pricing. SaaS, PaaS, and IaaS are its principal delivery models."
              />
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-amber-600 font-bold">•</span>
            <span>
              <BilingualText
                vi="Sử dụng dịch vụ đám mây linh hoạt hơn, tin cậy hơn, chi phí nói chung rẻ hơn so với tự mua sắm phần cứng và phần mềm."
                en="Leveraging cloud services is more agile, dependable, and generally less costly than procuring and administering on-premise hardware and software."
              />
            </span>
          </li>
        </ul>
      </div>

      {/* Checkpoint Questions 1 & 2 (Page 41 SGK) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Question 1: Online Newspapers */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-sky-500" />
            <span>{bilingualMode === 'en' ? 'Question 1: Are online newspapers cloud services?' : 'Câu hỏi 1: Báo điện tử có phải là dịch vụ đám mây? (Tr. 41)'}</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            <BilingualText
              vi="Báo điện tử giúp mọi người có thể đọc tin tức hàng ngày có phải là một dịch vụ đám mây hay không?"
              en="Are online newspapers that provide daily news classified as cloud computing services?"
            />
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setCheckpoint1(true)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                checkpoint1 === true ? 'bg-rose-500 text-white font-black' : 'bg-slate-100 dark:bg-slate-800'
              }`}
            >
              {bilingualMode === 'en' ? 'Yes' : 'Phải'}
            </button>
            <button
              type="button"
              onClick={() => setCheckpoint1(false)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                checkpoint1 === false ? 'bg-emerald-500 text-white font-bold' : 'bg-slate-100 dark:bg-slate-800'
              }`}
            >
              {bilingualMode === 'en' ? 'No' : 'Không phải'}
            </button>
          </div>
          {checkpoint1 === false && (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed border border-slate-200 dark:border-slate-700">
              <strong>{bilingualMode === 'en' ? 'Textbook Explanation:' : 'Giải thích chuẩn SGK:'} </strong>
              <BilingualText
                vi="Báo điện tử chỉ là dịch vụ cung cấp thông tin/nội dung trên web (Internet Content Provider), không phải là dịch vụ chia sẻ tài nguyên CNTT (máy chủ, lưu trữ, phần mềm xử lý) để người dùng tự tính toán hoặc lưu trữ dữ liệu riêng."
                en="Online newspapers are Internet Content Providers (ICPs) delivering editorial content, not cloud services providing shared computing resources (servers, storage, processing software) for users to execute computing or store custom data."
              />
            </div>
          )}
        </div>

        {/* Question 2: Gmail */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-indigo-500" />
            <span>{bilingualMode === 'en' ? 'Question 2: Is Gmail a cloud service?' : 'Câu hỏi 2: Thư điện tử Gmail có phải dịch vụ đám mây? (Tr. 41)'}</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            <BilingualText
              vi="Dịch vụ thư điện tử Gmail của Google có phải là một dịch vụ đám mây hay không?"
              en="Is Google's Gmail webmail service considered a cloud computing service?"
            />
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setCheckpoint2(true)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                checkpoint2 === true ? 'bg-emerald-500 text-white font-bold' : 'bg-slate-100 dark:bg-slate-800'
              }`}
            >
              {bilingualMode === 'en' ? 'Yes' : 'Phải'}
            </button>
            <button
              type="button"
              onClick={() => setCheckpoint2(false)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                checkpoint2 === false ? 'bg-rose-500 text-white font-black' : 'bg-slate-100 dark:bg-slate-800'
              }`}
            >
              {bilingualMode === 'en' ? 'No' : 'Không phải'}
            </button>
          </div>
          {checkpoint2 === true && (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed border border-slate-200 dark:border-slate-700">
              <strong>{bilingualMode === 'en' ? 'Textbook Explanation:' : 'Giải thích chuẩn SGK:'} </strong>
              <BilingualText
                vi="Đúng! Gmail là dịch vụ đám mây mô hình SaaS (Software as a Service) kết hợp IaaS, cung cấp ứng dụng quản lý thư trực tuyến và 15 GB dung lượng lưu trữ thư từ trên máy chủ đám mây của Google."
                en="Correct! Gmail is a cloud service combining SaaS (Software as a Service) with IaaS storage, delivering online webmail applications and 15 GB of cloud mail storage hosted on Google's infrastructure."
              />
            </div>
          )}
        </div>
      </div>

      {/* Pedagogical Prompts */}
      <TeacherPromptsWidget sectionIndex={3} lessonId={8} />

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={prevPage}
          className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm flex items-center gap-2 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'Back: Internet Impact' : 'Quay lại: Vai trò Internet'}</span>
        </button>

        <button
          type="button"
          onClick={nextPage}
          className="px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-sky-600/20 transition-all cursor-pointer"
        >
          <span>{bilingualMode === 'en' ? 'Section 4: Internet of Things' : 'Tiếp tục Mục 4: Kết nối vạn vật (IoT)'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
