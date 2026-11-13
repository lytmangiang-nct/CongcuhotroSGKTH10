import React, { useState } from 'react';
import {
  Globe,
  Network,
  Router,
  Server,
  ArrowRight,
  ArrowLeft,
  Volume2,
  CheckCircle2,
  HelpCircle,
  Shield,
  Building,
  Users,
  Send,
  Sparkles,
  Layers,
  ArrowRightLeft
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section8LanVsInternet: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    nextPage,
    prevPage,
    setOriginalPageTarget
  } = useBook();

  // Packet Simulator State
  const [packetTarget, setPacketTarget] = useState<'local' | 'internet'>('local');
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [packetStep, setPacketStep] = useState<number>(0);

  // Checkpoint question state
  const [ispSelected, setIspSelected] = useState<number | null>(null);

  const sectionSpeechVi =
    'Mục 1: Mạng LAN và Internet. Bộ chia hoặc bộ chuyển mạch chỉ chuyển tiếp dữ liệu nội bộ trong LAN. Bộ định tuyến Router có vai trò kết nối các LAN với nhau và chuyển tiếp dữ liệu ra Internet nếu địa chỉ người nhận không nằm trong mạng cục bộ. Mạng LAN thuộc sở hữu xác định của cá nhân hoặc cơ quan, trong khi Internet có quy mô toàn cầu và không của riêng ai. Người dùng kết nối vào Internet thông qua các nhà cung cấp dịch vụ viễn thông ISP.';
  const sectionSpeechEn =
    'Section 1: LAN and the Internet. Hubs and switches only forward packets internally within a local LAN. A router interconnects local networks and routes packets out to the global Internet whenever the destination IP lies outside the local subnet. While a LAN belongs to a specific owner, the Internet spans globally without any centralized owner. Users access the Internet through Internet Service Providers (ISPs).';

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

  const runPacketSimulation = (target: 'local' | 'internet') => {
    setPacketTarget(target);
    setIsTransmitting(true);
    setPacketStep(1);

    setTimeout(() => {
      setPacketStep(2);
    }, 900);

    setTimeout(() => {
      setPacketStep(3);
      setIsTransmitting(false);
    }, 1800);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-mono font-bold text-xs uppercase">
              {bilingualMode === 'en' ? 'Section 1 • Pages 38–39' : 'Mục 1 • Trang 38 – 39 SGK'}
            </span>
            <button
              type="button"
              onClick={() => setOriginalPageTarget(39)}
              className="text-xs text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold cursor-pointer underline"
            >
              {bilingualMode === 'en' ? 'View Textbook p. 39' : 'Xem trang 39 SGK gốc'}
            </button>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">
            <BilingualText
              vi="1. MẠNG LAN VÀ INTERNET"
              en="1. LOCAL AREA NETWORK (LAN) AND THE INTERNET"
            />
          </h2>
        </div>
      </div>

      {/* Core Principle: Switch vs Router */}
      <div className="p-6 sm:p-7 rounded-3xl bg-linear-to-br from-white to-slate-50/70 dark:from-slate-900 dark:to-slate-950 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-600" />
          <BilingualText
            vi="Nguyên lí hoạt động: Switch chuyển tiếp nội bộ vs Router định tuyến ra Internet"
            en="Operating Principles: Local Switch Switching vs Edge Router Routing"
          />
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <BilingualText
            vi="Bộ chia (Hub) hoặc bộ chuyển mạch (Switch) chỉ chuyển tiếp dữ liệu nội bộ trong một mạng LAN. Khi cần gửi thông tin ra ngoài mạng LAN hoặc truy cập vào mạng toàn cầu, bộ định tuyến (Router) sẽ kiểm tra địa chỉ người nhận. Nếu địa chỉ không nằm trong dải mạng LAN cục bộ, Router sẽ lập tức định tuyến gói tin gửi ra cổng Internet (WAN)."
            en="A hub or switch strictly shuttles frames within a local LAN. To transmit data beyond the local broadcast domain or reach external servers, the edge router checks the recipient's destination IP. If foreign to the local subnet, the router routes the packet through its WAN uplink to the Internet."
          />
        </p>
      </div>

      {/* Interactive Packet Routing Simulator */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              {bilingualMode === 'en' ? 'Interactive Laboratory' : 'Thí nghiệm mô phỏng trực quan'}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              <BilingualText
                vi="Mô phỏng đường đi của gói tin: Gửi nội bộ vs Gửi ra Internet"
                en="Packet Path Simulator: Local Transmission vs Internet Routing"
              />
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isTransmitting}
              onClick={() => runPacketSimulation('local')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                packetTarget === 'local'
                  ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-100'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{bilingualMode === 'en' ? '1. Send to Local Printer' : '1. In tài liệu nội bộ LAN'}</span>
            </button>
            <button
              type="button"
              disabled={isTransmitting}
              onClick={() => runPacketSimulation('internet')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                packetTarget === 'internet'
                  ? 'bg-blue-600 text-white shadow-xs font-black'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-100'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{bilingualMode === 'en' ? '2. Query Google.com' : '2. Truy cập web Google.com'}</span>
            </button>
          </div>
        </div>

        {/* Visual Pipeline Display */}
        <div className="p-6 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            {/* Step 1: Workstation */}
            <div className={`p-4 rounded-xl border transition-all text-center space-y-2 ${
              packetStep >= 1 ? 'border-amber-400 bg-amber-950/30' : 'border-slate-800 bg-slate-900/60 text-slate-400'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                <Server className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-white">{bilingualMode === 'en' ? 'Source Workstation' : 'Máy tính nguồn'}</div>
              <div className="text-[10px] font-mono text-slate-400">IP: 192.168.1.10</div>
            </div>

            {/* Step 2: Switch */}
            <div className={`p-4 rounded-xl border transition-all text-center space-y-2 ${
              packetStep >= 2 ? 'border-emerald-400 bg-emerald-950/30' : 'border-slate-800 bg-slate-900/60 text-slate-400'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Network className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-white">{bilingualMode === 'en' ? 'Network Switch' : 'Bộ chuyển mạch (Switch)'}</div>
              <div className="text-[10px] text-emerald-300">
                {packetTarget === 'local'
                  ? (bilingualMode === 'en' ? '→ Direct to printer' : '→ Chuyển thẳng máy in')
                  : (bilingualMode === 'en' ? '→ Forward to Router' : '→ Đẩy lên Router')}
              </div>
            </div>

            {/* Step 3: Router */}
            <div className={`p-4 rounded-xl border transition-all text-center space-y-2 ${
              packetTarget === 'internet' && packetStep >= 2
                ? 'border-blue-400 bg-blue-950/30'
                : 'border-slate-800 bg-slate-900/30 text-slate-600 opacity-60'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
                <Router className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-white">{bilingualMode === 'en' ? 'Network Router' : 'Bộ định tuyến (Router)'}</div>
              <div className="text-[10px] text-blue-300">
                {packetTarget === 'internet'
                  ? (bilingualMode === 'en' ? 'Route via WAN port' : 'Định tuyến qua cổng WAN')
                  : (bilingualMode === 'en' ? 'Bypassed (unused)' : 'Bỏ qua (không dùng)')}
              </div>
            </div>

            {/* Step 4: Destination */}
            <div className={`p-4 rounded-xl border transition-all text-center space-y-2 ${
              packetStep >= 3 ? 'border-cyan-400 bg-cyan-950/40 ring-2 ring-cyan-400/40' : 'border-slate-800 bg-slate-900/60 text-slate-400'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
                {packetTarget === 'local' ? <Network className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
              </div>
              <div className="text-xs font-bold text-white">
                {packetTarget === 'local'
                  ? (bilingualMode === 'en' ? 'Office Printer' : 'Máy in văn phòng')
                  : (bilingualMode === 'en' ? 'Google Web Server' : 'Máy chủ Google Web')}
              </div>
              <div className="text-[10px] font-mono text-cyan-300">
                {packetTarget === 'local' ? 'IP: 192.168.1.50 (LAN)' : 'IP: 142.250.71.46 (Global)'}
              </div>
            </div>
          </div>

          {/* Status readout */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isTransmitting ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
              <span>
                {packetTarget === 'local'
                  ? (bilingualMode === 'en'
                    ? 'LAN packet transmission: Switch forwards directly via local MAC address; packet never exits the WAN Router port.'
                    : 'Gói tin gửi trong mạng LAN: Switch chuyển tiếp trực tiếp theo địa chỉ MAC cục bộ, dữ liệu không đi ra khỏi cổng Router WAN.')
                  : (bilingualMode === 'en'
                    ? 'Internet packet transmission: Switch recognizes destination IP (142.250.71.46) is outside the LAN and forwards to Router; Router directs traffic via WAN port to global ISP.'
                    : 'Gói tin gửi ra Internet: Switch nhận thấy IP đích (142.250.71.46) ngoài mạng LAN nên gửi lên Router; Router định tuyến qua cổng WAN ra ISP toàn cầu.')}
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-400">
              {isTransmitting ? 'TRANSMITTING...' : 'DELIVERED'}
            </span>
          </div>
        </div>
      </div>

      {/* Comparative Matrix: Textbook Table on Page 39 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            {bilingualMode === 'en' ? 'Textbook Comparison (Page 39)' : 'Bảng so sánh chuẩn SGK (Trang 39)'}
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
            <BilingualText
              vi="So sánh Mạng cục bộ (LAN) và Mạng Internet"
              en="Comparison between Local Area Network (LAN) and the Internet"
            />
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100">
                <th className="p-3 sm:p-4 text-left font-bold border-b border-slate-200 dark:border-slate-700 w-1/4">
                  <BilingualText vi="Tiêu chí so sánh" en="Comparison Metric" />
                </th>
                <th className="p-3 sm:p-4 text-left font-bold border-b border-slate-200 dark:border-slate-700 w-3/8 text-emerald-700 dark:text-emerald-400">
                  <BilingualText vi="Mạng cục bộ (LAN)" en="Local Area Network (LAN)" />
                </th>
                <th className="p-3 sm:p-4 text-left font-bold border-b border-slate-200 dark:border-slate-700 w-3/8 text-blue-700 dark:text-blue-400">
                  <BilingualText vi="Mạng Internet" en="The Internet" />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="p-3 sm:p-4 font-bold text-slate-900 dark:text-slate-100">
                  <BilingualText vi="1. Phạm vi, quy mô" en="1. Geographic Scope" />
                </td>
                <td className="p-3 sm:p-4">
                  <BilingualText
                    vi="Phạm vi nhỏ: Gia đình, cơ quan, phòng máy, trường học."
                    en="Small local scale: Residences, classrooms, schools, offices."
                  />
                </td>
                <td className="p-3 sm:p-4 font-medium text-blue-900 dark:text-blue-300">
                  <BilingualText
                    vi="Quy mô toàn cầu: Liên kết hàng triệu mạng LAN trên khắp các châu lục."
                    en="Worldwide scale: Interconnecting millions of subnets globally."
                  />
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="p-3 sm:p-4 font-bold text-slate-900 dark:text-slate-100">
                  <BilingualText vi="2. Cách kết nối" en="2. Connectivity Mode" />
                </td>
                <td className="p-3 sm:p-4">
                  <BilingualText
                    vi="Kết nối trực tiếp thông qua các thiết bị phần cứng như Hub, Switch hoặc điểm phát sóng Wi-Fi cục bộ."
                    en="Direct hardware interconnect via switches, hubs, or local Wi-Fi APs."
                  />
                </td>
                <td className="p-3 sm:p-4 font-medium text-blue-900 dark:text-blue-300">
                  <BilingualText
                    vi="Kết nối qua bộ định tuyến (Router) thông qua hạ tầng của các nhà cung cấp dịch vụ Internet (ISP)."
                    en="Routed via edge routers across telecommunication ISP infrastructures."
                  />
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="p-3 sm:p-4 font-bold text-slate-900 dark:text-slate-100">
                  <BilingualText vi="3. Quyền sở hữu" en="3. Ownership & Governance" />
                </td>
                <td className="p-3 sm:p-4">
                  <BilingualText
                    vi="Có chủ sở hữu xác định rõ ràng (cá nhân gia đình hoặc cơ quan/doanh nghiệp chịu trách nhiệm quản trị)."
                    en="Belongs to an identified owner (individual, enterprise, institution)."
                  />
                </td>
                <td className="p-3 sm:p-4 font-medium text-blue-900 dark:text-blue-300">
                  <BilingualText
                    vi="Không có chủ sở hữu duy nhất; không có cơ quan chỉ huy tập trung; điều phối bởi các tổ chức phi lợi nhuận (ICANN, IETF)."
                    en="No single owner or centralized governing body; technically harmonized by international non-profit consortia."
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Checkpoint Question: ISPs in Vietnam */}
      <div className="p-6 rounded-3xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-4">
        <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
          <HelpCircle className="w-5 h-5" />
          <span>{bilingualMode === 'en' ? 'Textbook Checkpoint Question (p. 39)' : 'Câu hỏi củng cố (Trang 39 SGK)'}</span>
        </div>
        <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">
          <BilingualText
            vi="Khi gia đình hoặc trường học của em muốn hòa mạng Internet toàn cầu, ta bắt buộc phải đăng ký hợp đồng dịch vụ với đơn vị nào?"
            en="When a household or school wishes to connect to the global Internet, which entity must they register an access subscription with?"
          />
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { id: 1, vi: 'A. Cửa hàng bán máy in và máy photocopy', en: 'A. Local printer retail store', correct: false },
            { id: 2, vi: 'B. Nhà cung cấp dịch vụ Internet - ISP (VNPT, Viettel, FPT)', en: 'B. Internet Service Provider - ISP (VNPT, Viettel, FPT)', correct: true },
            { id: 3, vi: 'C. Cơ quan xuất bản sách giáo khoa', en: 'C. Educational textbook publisher', correct: false },
            { id: 4, vi: 'D. Trạm phát thanh phường xã', en: 'D. Local ward radio station', correct: false }
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setIspSelected(item.id)}
              className={`p-3.5 rounded-2xl border text-left font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                ispSelected === item.id
                  ? item.correct
                    ? 'bg-emerald-500 text-slate-950 border-emerald-600 shadow-md font-black'
                    : 'bg-rose-500 text-white border-rose-600 shadow-md font-black'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-500'
              }`}
            >
              <BilingualText vi={item.vi} en={item.en} />
            </button>
          ))}
        </div>

        {ispSelected === 2 && (
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 text-xs text-emerald-800 dark:text-emerald-300 space-y-1">
            <strong>Giải thích chuẩn SGK:</strong> ISP (Internet Service Provider) như Viettel, VNPT, FPT Telecom kéo đường cáp quang tới nhà và cấp phát đường truyền kết nối vào mạng lưới toàn cầu.
          </div>
        )}
      </div>

      {/* Pedagogical Prompts */}
      <TeacherPromptsWidget sectionIndex={1} lessonId={8} />

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={prevPage}
          className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm flex items-center gap-2 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'Back: Overview' : 'Quay lại: Khởi động'}</span>
        </button>

        <button
          type="button"
          onClick={nextPage}
          className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
        >
          <span>{bilingualMode === 'en' ? 'Section 2: Internet Impact' : 'Tiếp tục Mục 2: Vai trò của Internet'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
