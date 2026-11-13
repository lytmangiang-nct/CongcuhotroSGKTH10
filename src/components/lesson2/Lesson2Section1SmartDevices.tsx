import React, { useState } from 'react';
import {
  Smartphone,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Wifi,
  Bot,
  Eye,
  Camera,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

interface DeviceItem {
  id: string;
  nameVi: string;
  nameEn: string;
  imageLabel: string;
  isSmart: boolean;
  reasonVi: string;
  reasonEn: string;
}

const DEVICES_H21: DeviceItem[] = [
  {
    id: 'clock',
    nameVi: 'a) Đồng hồ lịch vạn niên',
    nameEn: 'a) Perpetual electronic calendar clock',
    imageLabel: 'Đồng hồ LED',
    isSmart: false,
    reasonVi: 'Không có khả năng kết nối mạng và không thể trao đổi dữ liệu với các thiết bị khác, không tự chủ xử lí linh hoạt.',
    reasonEn: 'Lacks network connectivity and cannot interact or exchange data with other devices autonomously.'
  },
  {
    id: 'phone',
    nameVi: 'b) Điện thoại di động (Smartphone)',
    nameEn: 'b) Mobile phone (Smartphone)',
    imageLabel: 'Smartphone',
    isSmart: true,
    reasonVi: 'Là thiết bị thông minh tiêu biểu nhất: có hệ điều hành, cài đặt ứng dụng linh hoạt, kết nối wifi/bluetooth, hoạt động tự chủ.',
    reasonEn: 'Prime smart device: runs advanced OS, executes third-party apps, connects via Wi-Fi/Bluetooth, operates autonomously.'
  },
  {
    id: 'camera',
    nameVi: 'c) Camera kết nối Internet',
    nameEn: 'c) Internet-connected IP camera',
    imageLabel: 'IP Camera',
    isSmart: true,
    reasonVi: 'Truyền dữ liệu tự động qua mạng, có cảm biến lọc và chỉ tự kích hoạt ghi hình khi phát hiện chuyển động của con người hoặc vật thể.',
    reasonEn: 'Autonomously transmits data over Internet and selectively records footage upon detecting motion.'
  },
  {
    id: 'camera_stand',
    nameVi: 'd) Máy ảnh số thông thường',
    nameEn: 'd) Standalone digital camera',
    imageLabel: 'Máy ảnh compact',
    isSmart: false,
    reasonVi: 'Chỉ ghi lại hình ảnh khi có người bấm nút chụp cơ học, không tự chủ phân tích hành vi và không tự kết nối trao đổi dữ liệu qua mạng.',
    reasonEn: 'Requires manual shutter press, lacks autonomous decision-making and automated network data exchange.'
  }
];

export const Lesson2Section1SmartDevices: React.FC = () => {
  const { setOriginalPageTarget, setShowOriginalModal, setCurrentPage } = useBook();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, boolean | null>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const handleToggleDevice = (id: string, userChoice: boolean) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [id]: userChoice
    }));
  };

  const handleCheckAll = () => {
    setShowExplanation(true);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
          <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-black text-xs uppercase tracking-wider">
            Mục 1 • Trang 11 SGK
          </span>
          <button
            type="button"
            onClick={() => {
              setOriginalPageTarget(11);
              setShowOriginalModal(true);
            }}
            className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Xem trang 11 gốc</span>
          </button>
        </div>

        <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          1. Thiết Bị Thông Minh Là Một Hệ Thống Xử Lí Thông Tin
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Khái niệm, bản chất hoạt động tự chủ và nhận biết thiết bị thông minh thông dụng
        </p>
      </div>

      {/* Hoạt động 1: Nhận biết thiết bị thông minh (Hình 2.1 SGK) */}
      <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border-2 border-indigo-200 dark:border-indigo-900/60 shadow-sm space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm">
            HĐ1
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
              Hoạt Động 1: Nhận Biết Thiết Bị Thông Minh (Hình 2.1 SGK)
            </h3>
            <p className="text-xs text-slate-500">Trong 4 thiết bị dưới đây, thiết bị nào là thiết bị thông minh?</p>
          </div>
        </div>

        {/* Interactive Device Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {DEVICES_H21.map((item) => {
            const currentChoice = selectedAnswers[item.id];
            const isCorrect = currentChoice !== undefined && currentChoice === item.isSmart;

            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between gap-3 ${
                  showExplanation
                    ? item.isSmart
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-800'
                      : 'bg-slate-50 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700'
                    : 'bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
                      {item.imageLabel}
                    </span>
                    {showExplanation && (
                      <span className={`text-[11px] font-black uppercase px-2 py-0.5 rounded-full ${
                        item.isSmart ? 'bg-emerald-600 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}>
                        {item.isSmart ? '✓ Là thiết bị thông minh' : '✗ Không phải'}
                      </span>
                    )}
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {item.nameVi}
                  </h4>
                  <div className="text-[11px] text-slate-500 italic mt-0.5">
                    {item.nameEn}
                  </div>
                </div>

                {/* User selection buttons */}
                {!showExplanation ? (
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => handleToggleDevice(item.id, true)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        currentChoice === true
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-100'
                      }`}
                    >
                      Là TB thông minh
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleDevice(item.id, false)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        currentChoice === false
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-100'
                      }`}
                    >
                      Không phải
                    </button>
                  </div>
                ) : (
                  <div className="text-xs text-slate-700 dark:text-slate-300 bg-white/70 dark:bg-slate-900/60 p-2.5 rounded-xl border border-current/20 leading-relaxed">
                    <strong>Giải thích chuẩn SGK:</strong> {item.reasonVi}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action button */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-500">
            {showExplanation ? 'Đã hiển thị đáp án và lý giải chi tiết.' : 'Bấm dự đoán cho từng thiết bị rồi bấm "Kiểm tra đáp án".'}
          </span>
          <button
            type="button"
            onClick={handleCheckAll}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs transition-colors"
          >
            {showExplanation ? 'Xem lại chuẩn SGK' : 'Kiểm tra đáp án HĐ1 →'}
          </button>
        </div>
      </div>

      {/* Core Concept Theory Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>a) Định Nghĩa &amp; Đặc Điểm Bản Chất Của Thiết Bị Thông Minh</span>
        </h3>

        <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40">
            <BilingualText
              id="l2-s1-def"
              vi="Có thể hiểu một cách đơn giản: Thiết bị thông minh là các thiết bị điện tử có thể hoạt động một cách tự chủ trong một mức độ nhất định nhờ các phần mềm điều khiển được cài đặt sẵn."
              en="Simply understood: Smart devices are electronic devices that can operate autonomously to a certain degree thanks to pre-installed control software."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                <Wifi className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white text-xs">Giao tiếp không dây tự động</h5>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Khả năng tương tác tự động với các thiết bị khác qua Bluetooth, Wi-Fi để tiếp nhận, xử lí và truyền dữ liệu.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white text-xs">Tích hợp Trí tuệ nhân tạo (AI)</h5>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Bắt chước tư duy con người: người máy hiểu tiếng nói tự nhiên, xe tự hành dự đoán va chạm và tránh vật cản.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <span className="text-xs text-slate-400">Trang 11 SGK Tin học 10</span>
          <button
            type="button"
            onClick={() => setCurrentPage(2)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <span>Sang 1b. Vai trò trong CMCN 4.0</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
