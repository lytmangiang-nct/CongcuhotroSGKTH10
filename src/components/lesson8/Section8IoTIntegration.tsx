import React, { useState } from 'react';
import {
  Cpu,
  Wifi,
  Radio,
  Car,
  Home,
  CheckCircle2,
  HelpCircle,
  Volume2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Lightbulb,
  Zap,
  ShieldCheck,
  Eye,
  Sliders,
  Thermometer,
  Lock,
  Sun,
  Activity
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section8IoTIntegration: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    nextPage,
    prevPage,
    setOriginalPageTarget
  } = useBook();

  // Smart Home Simulator states
  const [smartLights, setSmartLights] = useState(true);
  const [smartDoorLocked, setSmartDoorLocked] = useState(true);
  const [smartAcTemp, setSmartAcTemp] = useState(25);
  const [smartSecurityActive, setSmartSecurityActive] = useState(true);

  // RFID Expressway Toll Simulator states
  const [tollStatus, setTollStatus] = useState<'approaching' | 'scanned' | 'passed'>('approaching');
  const [rfidBalance, setRfidBalance] = useState(500000);
  const [tollFee] = useState(35000);

  // Checkpoint question state
  const [checkpointAnswer, setCheckpointAnswer] = useState<boolean | null>(null);

  const sectionSpeechVi =
    'Mục 4: Kết nối vạn vật Internet of Things. IoT là hệ thống liên mạng bao gồm các phương tiện và vật dụng, thiết bị thông minh được cài đặt cảm biến và phần mềm chuyên dụng giúp chúng tự động kết nối, thu thập và trao đổi dữ liệu mà không nhất thiết có sự tương tác trực tiếp của con người. Hai ví dụ thực tiễn tiêu biểu gồm hệ thống thu phí không dừng ETC qua sóng RFID và nhà thông minh Smart Home. Hộp ghi nhớ trang 43 SGK.';
  const sectionSpeechEn =
    'Section 4: The Internet of Things (IoT). IoT is an interconnected network of physical devices and everyday objects embedded with sensors and specialized software that autonomously collect and exchange data without requiring human-to-human or human-to-computer intervention. Hallmark real-world deployments include RFID electronic toll collection (ETC) and Smart Home automation. Official Summary Box on Page 43.';

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

  const handleDriveThroughToll = () => {
    if (tollStatus !== 'approaching') {
      setTollStatus('approaching');
      return;
    }

    setTollStatus('scanned');
    setTimeout(() => {
      setRfidBalance((b) => Math.max(0, b - tollFee));
      setTollStatus('passed');
    }, 900);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 font-mono font-bold text-xs uppercase">
              {bilingualMode === 'en' ? 'Section 4 • Pages 42–43' : 'Mục 4 • Trang 42 – 43 SGK'}
            </span>
            <button
              type="button"
              onClick={() => setOriginalPageTarget(42)}
              className="text-xs text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 font-semibold cursor-pointer underline"
            >
              {bilingualMode === 'en' ? 'View Textbook p. 42' : 'Xem trang 42 SGK gốc'}
            </button>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">
            <BilingualText
              vi="4. KẾT NỐI VẠN VẬT (INTERNET OF THINGS - IoT)"
              en="4. THE INTERNET OF THINGS (IoT) & AUTONOMOUS SENSING"
            />
          </h2>
        </div>
      </div>

      {/* Activity 3: Electronic Electric Meter (Hoạt động 3 Trang 42 SGK) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              {bilingualMode === 'en' ? 'Activity 3 (Textbook p. 42)' : 'Hoạt động 3 (Trang 42 SGK)'}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              <BilingualText
                vi="Công tơ điện tử thông minh hoạt động như thế nào?"
                en="How Do Smart Electronic Utility Meters Function?"
              />
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
            <span className="text-xs font-bold uppercase text-slate-500">
              {bilingualMode === 'en'
                ? 'Before: Manual Meter Reading'
                : 'Trước đây (Thủ công)'}
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <BilingualText
                vi="Hằng tháng nhân viên điện lực phải đi đến từng cột điện hoặc từng hộ gia đình, trèo lên đọc chỉ số, chép tay vào sổ rồi đem về nhập lại vào máy tính để in hoá đơn. Tốn nhiều nhân công, dễ nhầm lẫn số liệu."
                en="Every month, electric utility personnel had to physically visit each utility pole or household, climb up to read meter dials, record numbers manually in a ledger, and return to type them into a computer to print invoices. This required extensive labor and was error-prone."
              />
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs text-teal-900 dark:text-teal-200 space-y-2">
            <span className="text-xs font-bold uppercase text-teal-700 dark:text-teal-400">
              {bilingualMode === 'en'
                ? 'Now: IoT-Enabled Meter Reading'
                : 'Hiện nay (Hệ thống IoT)'}
            </span>
            <p className="leading-relaxed">
              <BilingualText
                vi="Công tơ điện tử gắn vi xử lý và mô-đun truyền sóng vô tuyến (RF/Cellular). Cứ định kỳ, công tơ tự động đo và truyền số điện trực tiếp về trung tâm dữ liệu qua Internet. Tự động tính tiền điện tức thời, minh bạch và chính xác 100%."
                en="Electronic meters embedded with microprocessors and wireless transmission modules (RF/Cellular) automatically measure and transmit electricity consumption directly to data centers over the Internet. Utility billing is calculated instantaneously, transparently, and with 100% precision."
              />
            </p>
          </div>
        </div>
      </div>

      {/* Example 1: RFID Electronic Toll Collection (Hình 8.4 SGK Trang 42) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              {bilingualMode === 'en' ? 'Real-world Deployment 1 (Figure 8.4)' : 'Ví dụ 1 SGK • Hình 8.4 (Trang 42)'}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Car className="w-5 h-5 text-indigo-600" />
              <BilingualText
                vi="Thu phí tự động không dừng (ETC) trên các tuyến cao tốc qua sóng RFID"
                en="Electronic Toll Collection (ETC) via RFID Radio Frequency Waves"
              />
            </h3>
          </div>
          <button
            type="button"
            onClick={handleDriveThroughToll}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Radio className="w-4 h-4 animate-pulse" />
            <span>
              {tollStatus === 'approaching'
                ? (bilingualMode === 'en' ? 'Drive through toll plaza' : 'Lái xe qua trạm thu phí')
                : tollStatus === 'scanned'
                ? (bilingualMode === 'en' ? 'Scanning RFID tag...' : 'Đang quét thẻ RFID...')
                : (bilingualMode === 'en' ? 'Reset for next vehicle' : 'Cho xe khác đi qua')}
            </span>
          </button>
        </div>

        {/* ETC Interactive Visual Stage */}
        <div className="p-6 rounded-2xl bg-linear-to-b from-slate-900 to-slate-950 text-white border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 text-xs font-mono">
            <div>
              <span className="text-slate-400">{bilingualMode === 'en' ? 'e-Pass / VETC Balance: ' : 'Tài khoản e-Pass / VETC: '}</span>
              <span className="text-emerald-400 font-bold">{rfidBalance.toLocaleString(bilingualMode === 'en' ? 'en-US' : 'vi-VN')} {bilingualMode === 'en' ? 'VND' : 'đ'}</span>
            </div>
            <div>
              <span className="text-slate-400">{bilingualMode === 'en' ? 'Toll Fee: ' : 'Mức cước qua trạm: '}</span>
              <span className="text-amber-400 font-bold">-{tollFee.toLocaleString(bilingualMode === 'en' ? 'en-US' : 'vi-VN')} {bilingualMode === 'en' ? 'VND' : 'đ'}</span>
            </div>
            <div>
              <span className="text-slate-400">{bilingualMode === 'en' ? 'Technology: ' : 'Công nghệ: '}</span>
              <span className="text-cyan-400 font-bold">RFID Passive Transponder</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Step 1: Windshield Tag */}
            <div className={`p-4 rounded-xl border text-center space-y-2 transition-all ${
              tollStatus === 'scanned' || tollStatus === 'passed'
                ? 'border-emerald-500 bg-emerald-950/30'
                : 'border-slate-800 bg-slate-900/60'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
                <Radio className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold">
                {bilingualMode === 'en' ? 'Windshield RFID Tag' : 'Thẻ RFID dán kính lái'}
              </div>
              <div className="text-[11px] text-slate-400">
                {bilingualMode === 'en' ? 'Contains unique vehicle identifier' : 'Chứa mã định danh xe duy nhất'}
              </div>
            </div>

            {/* Step 2: Toll Plaza Antenna */}
            <div className={`p-4 rounded-xl border text-center space-y-2 transition-all ${
              tollStatus === 'scanned'
                ? 'border-amber-400 bg-amber-950/40 ring-2 ring-amber-400/40 animate-pulse'
                : tollStatus === 'passed'
                ? 'border-emerald-500 bg-emerald-950/30'
                : 'border-slate-800 bg-slate-900/60'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold">
                {bilingualMode === 'en' ? 'Gantry Overhead RFID Reader' : 'Đầu đọc RFID giá long môn'}
              </div>
              <div className="text-[11px] text-slate-400">
                {tollStatus === 'scanned'
                  ? (bilingualMode === 'en' ? 'Reading tag & debiting account...' : 'Đang đọc thẻ & trừ tiền...')
                  : (bilingualMode === 'en' ? 'Emits RF waves to detect car' : 'Phát sóng vô tuyến quét xe')}
              </div>
            </div>

            {/* Step 3: Automated Barrier */}
            <div className={`p-4 rounded-xl border text-center space-y-2 transition-all ${
              tollStatus === 'passed'
                ? 'border-emerald-400 bg-emerald-950/40 ring-2 ring-emerald-400/40'
                : 'border-slate-800 bg-slate-900/60'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold">
                {bilingualMode === 'en' ? 'Automated Barrier Gate' : 'Thanh chắn Barie tự động'}
              </div>
              <div className="text-[11px] text-emerald-400 font-bold">
                {tollStatus === 'passed'
                  ? (bilingualMode === 'en' ? 'RAISED • VEHICLE PASSES FREELY' : 'NÂNG LÊN • XE ĐI QUA TỨC THÌ')
                  : (bilingualMode === 'en' ? 'CLOSED (Awaiting auth)' : 'ĐÓNG (Chờ xác thực)')}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <strong className="text-teal-400">{bilingualMode === 'en' ? 'IoT Mechanism: ' : 'Cơ chế IoT: '}</strong>
            <BilingualText
              vi="Sóng vô tuyến quét thẻ RFID khi xe đang chạy ở tốc độ 60 km/h, gửi lệnh trừ tiền lên máy chủ trung tâm qua mạng Internet và mở thanh chắn tự động trong vòng 0.2 giây mà xe không cần dừng lại."
              en="Radio waves scan the RFID tag as vehicles travel at highway speeds, transmitting debit commands to central servers via the Internet and lifting barriers within 0.2 seconds without stopping."
            />
          </div>
        </div>
      </div>

      {/* Example 2: Smart Home Dashboard (Hình 8.5 SGK Trang 43) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            {bilingualMode === 'en' ? 'Real-world Deployment 2 (Figure 8.5)' : 'Ví dụ 2 SGK • Hình 8.5 (Trang 43)'}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Home className="w-5 h-5 text-teal-600" />
            <BilingualText
              vi="Ngôi nhà thông minh (Smart Home) điều khiển qua điện thoại"
              en="Interactive Smart Home Dashboard Managed Remotely"
            />
          </h3>
        </div>

        {/* Interactive Smart Home Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Light toggle */}
          <div className={`p-4 rounded-2xl border transition-all ${
            smartLights
              ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-400 text-amber-900 dark:text-amber-200'
              : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <Sun className={`w-5 h-5 ${smartLights ? 'text-amber-500' : 'text-slate-400'}`} />
              <button
                type="button"
                onClick={() => setSmartLights(!smartLights)}
                className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                  smartLights ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                  smartLights ? 'right-0.5' : 'left-0.5'
                }`} />
              </button>
            </div>
            <div className="font-bold text-xs">
              {bilingualMode === 'en' ? 'Smart Lighting' : 'Chiếu sáng thông minh'}
            </div>
            <div className="text-[11px] opacity-80 mt-1">
              {smartLights
                ? (bilingualMode === 'en' ? 'ON (Occupancy detected)' : 'BẬT (Cảm biến có người)')
                : (bilingualMode === 'en' ? 'OFF (Power saving)' : 'TẮT (Tiết kiệm điện)')}
            </div>
          </div>

          {/* AC Temp control */}
          <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/30 border border-sky-300 dark:border-sky-800 text-sky-900 dark:text-sky-200 space-y-2">
            <div className="flex items-center justify-between">
              <Thermometer className="w-5 h-5 text-sky-500" />
              <span className="font-bold text-sm font-mono">{smartAcTemp}°C</span>
            </div>
            <div className="font-bold text-xs">
              {bilingualMode === 'en' ? 'Auto Inverter AC' : 'Điều hòa Inverter tự động'}
            </div>
            <div className="flex items-center gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => setSmartAcTemp((t) => Math.max(16, t - 1))}
                className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 font-bold text-xs border border-sky-300 cursor-pointer"
              >
                -
              </button>
              <span className="text-[10px] text-slate-500 flex-1 text-center">
                {bilingualMode === 'en' ? 'Auto-adjusted by thermostat' : 'Tự chỉnh theo nhiệt kế'}
              </span>
              <button
                type="button"
                onClick={() => setSmartAcTemp((t) => Math.min(30, t + 1))}
                className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 font-bold text-xs border border-sky-300 cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Smart Lock */}
          <div className={`p-4 rounded-2xl border transition-all ${
            smartDoorLocked
              ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-400 text-emerald-900 dark:text-emerald-200'
              : 'bg-rose-50 dark:bg-rose-950/30 border-rose-400 text-rose-900 dark:text-rose-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <Lock className={`w-5 h-5 ${smartDoorLocked ? 'text-emerald-500' : 'text-rose-500'}`} />
              <button
                type="button"
                onClick={() => setSmartDoorLocked(!smartDoorLocked)}
                className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                  smartDoorLocked ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                  smartDoorLocked ? 'right-0.5' : 'left-0.5'
                }`} />
              </button>
            </div>
            <div className="font-bold text-xs">
              {bilingualMode === 'en' ? 'Facial Recognition Smart Lock' : 'Khóa nhận diện khuôn mặt'}
            </div>
            <div className="text-[11px] opacity-80 mt-1">
              {smartDoorLocked
                ? (bilingualMode === 'en' ? 'SECURELY LOCKED' : 'ĐÃ KHÓA AN TOÀN')
                : (bilingualMode === 'en' ? 'UNLOCKED REMOTELY' : 'MỞ KHÓA TỪ XA')}
            </div>
          </div>

          {/* Security AI Camera */}
          <div className={`p-4 rounded-2xl border transition-all ${
            smartSecurityActive
              ? 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-400 text-indigo-900 dark:text-indigo-200'
              : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <Eye className={`w-5 h-5 ${smartSecurityActive ? 'text-indigo-500' : 'text-slate-400'}`} />
              <button
                type="button"
                onClick={() => setSmartSecurityActive(!smartSecurityActive)}
                className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                  smartSecurityActive ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-600'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                  smartSecurityActive ? 'right-0.5' : 'left-0.5'
                }`} />
              </button>
            </div>
            <div className="font-bold text-xs">
              {bilingualMode === 'en' ? 'AI Intrusion Detection Camera' : 'Camera AI chống đột nhập'}
            </div>
            <div className="text-[11px] opacity-80 mt-1">
              {smartSecurityActive
                ? (bilingualMode === 'en' ? 'ALERTS ARMED (Push to mobile)' : 'CẢNH BÁO BẬT (Báo qua smartphone)')
                : (bilingualMode === 'en' ? 'ALERTS MUTED' : 'TẮT CẢNH BÁO')}
            </div>
          </div>
        </div>
      </div>

      {/* Official Summary Box IoT (Trang 43 SGK) */}
      <div className="p-6 rounded-3xl bg-amber-500/10 dark:bg-amber-500/15 border-2 border-amber-500/40 space-y-3">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-sm uppercase tracking-wider">
          <Lightbulb className="w-5 h-5 text-amber-600" />
          <span>{bilingualMode === 'en' ? 'Official Textbook Summary Box (Page 43)' : 'Hộp Ghi nhớ cốt lõi (Trang 43 SGK)'}</span>
        </div>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
          <li className="flex items-start gap-2.5">
            <span className="text-amber-600 font-bold">•</span>
            <span>
              <BilingualText
                vi="IoT là hệ thống liên mạng bao gồm các phương tiện và vật dụng, các thiết bị thông minh được cài đặt các cảm biến, phần mềm chuyên dụng giúp chúng có thể tự động kết nối, thu thập và trao đổi dữ liệu qua mạng mà không nhất thiết có sự tương tác trực tiếp giữa con người với con người, hay con người với máy tính."
                en="The Internet of Things (IoT) is an internetworked ecosystem of objects, vehicles, and smart appliances equipped with sensors and firmware that autonomously connect, capture, and exchange data without requiring human mediation."
              />
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-amber-600 font-bold">•</span>
            <span>
              <BilingualText
                vi="Với khả năng thu thập dữ liệu tự động trên diện rộng, phát hiện và xử lí kịp thời các vụ việc phát sinh, IoT mang lại nhiều lợi ích trong các hoạt động nghiệp vụ và đem lại nhiều tiện nghi cho cuộc sống. Vì vậy, IoT được xem là một nội dung chủ chốt của cuộc cách mạng công nghiệp lần thứ tư (CMCN 4.0)."
                en="Thanks to autonomous large-scale data collection and instantaneous response capabilities, IoT delivers enormous operational efficiencies and lifestyle comforts, serving as a pillar of Industry 4.0."
              />
            </span>
          </li>
        </ul>
      </div>

      {/* Checkpoint Question (Page 43 SGK) */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-teal-600" />
          <BilingualText
            vi="Câu hỏi củng cố (Trang 43 SGK)"
            en="Checkpoint Question (Page 43 SGK)"
          />
        </div>
        <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <BilingualText
            vi="Trong một mạng IoT, có nhất thiết là các thiết bị thông minh chỉ nối với nhau qua mạng Internet toàn cầu hay không?"
            en="In an IoT network, is it mandatory that smart devices only interconnect via the global Internet?"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setCheckpointAnswer(true)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              checkpointAnswer === true ? 'bg-rose-500 text-white font-black' : 'bg-slate-100 dark:bg-slate-800'
            }`}
          >
            {bilingualMode === 'en' ? 'Internet is mandatory' : 'Nhất thiết phải có Internet'}
          </button>
          <button
            type="button"
            onClick={() => setCheckpointAnswer(false)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              checkpointAnswer === false ? 'bg-emerald-500 text-white font-bold' : 'bg-slate-100 dark:bg-slate-800'
            }`}
          >
            {bilingualMode === 'en' ? 'Not necessarily' : 'Không nhất thiết'}
          </button>
        </div>
        {checkpointAnswer === false && (
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed border border-slate-200 dark:border-slate-700">
            <BilingualText
              vi="Giải thích chuẩn SGK: Không nhất thiết! Các thiết bị IoT có thể liên lạc nội bộ qua sóng vô tuyến cục bộ như Bluetooth Mesh, Zigbee, Z-Wave hoặc mạng LAN nội bộ trong nhà mà không cần Internet liên tục. Chỉ khi cần gửi báo cáo lên đám mây hoặc điều khiển từ xa ngoài gia đình thì trạm trung tâm (Gateway) mới cần kết nối Internet."
              en="Official Textbook Explanation: Not necessarily! IoT devices can communicate locally via wireless mesh protocols such as Bluetooth Mesh, Zigbee, Z-Wave, or local LAN without constant Internet access. A gateway only requires Internet connectivity when relaying telemetry to the cloud or executing remote external control."
            />
          </div>
        )}
      </div>

      {/* Pedagogical Prompts */}
      <TeacherPromptsWidget sectionIndex={4} lessonId={8} />

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={prevPage}
          className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm flex items-center gap-2 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'Back: Cloud Computing' : 'Quay lại: Điện toán đám mây'}</span>
        </button>

        <button
          type="button"
          onClick={nextPage}
          className="px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-teal-600/20 transition-all cursor-pointer"
        >
          <span>{bilingualMode === 'en' ? 'Section 5: Practice & Quiz' : 'Tiếp tục Mục 5: Luyện tập & Vận dụng'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
