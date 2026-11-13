import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Volume1,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Power,
  Sliders,
  CheckCircle2,
  HelpCircle,
  Cpu,
  Layers,
  RotateCcw,
  Info
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section7SmartphoneHardware: React.FC = () => {
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

  // Interactive Smartphone Simulator State
  const [isScreenOn, setIsScreenOn] = useState<boolean>(true);
  const [volumeLevel, setVolumeLevel] = useState<number>(65); // 0 to 100
  const [simulatedOs, setSimulatedOs] = useState<'android' | 'ios'>('android');
  const [showVolumeToast, setShowVolumeToast] = useState<boolean>(false);

  const speechVi =
    'Mục 2: Nhiệm vụ 1: Nhận biết các nút bấm vật lý của điện thoại thông minh. Phía hai bên thân máy thường có nút khoá dùng để bật hoặc tắt màn hình, khởi động máy; và nút tăng giảm âm lượng để điều chỉnh độ to nhỏ của chuông và âm thanh.';

  const speechEn =
    'Section 2: Task 1: Identifying smartphone hardware buttons. Along the sides of the device frame reside the lock/power key to wake, lock, or power up the device, and volume rockers to adjust audio and ringtone levels.';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(bilingualMode === 'en' ? speechEn : speechVi);
    }
  };

  const handleToggleLock = () => {
    setIsScreenOn(!isScreenOn);
  };

  const handleVolumeUp = () => {
    setVolumeLevel((prev) => Math.min(100, prev + 10));
    setShowVolumeToast(true);
    setTimeout(() => setShowVolumeToast(false), 2000);
  };

  const handleVolumeDown = () => {
    setVolumeLevel((prev) => Math.max(0, prev - 10));
    setShowVolumeToast(true);
    setTimeout(() => setShowVolumeToast(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300">
              {bilingualMode === 'en' ? 'Section 2 • Task 1' : 'Mục 2 • Nhiệm vụ 1'}
            </span>
            <span className="text-xs text-slate-500 font-mono">SGK Trang 34 – 35</span>
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
            data-en="Task 1: Identifying Physical Buttons & Device Booting"
            data-vi="Nhiệm vụ 1: Nhận biết nút bấm phần cứng & Khởi động điện thoại"
            className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100"
          >
            <BilingualText
              vi="Nhiệm vụ 1: Nhận biết nút bấm phần cứng & Khởi động điện thoại"
              en="Task 1: Identifying Physical Buttons & Device Booting"
            />
          </h2>
        </div>
      </div>

      {/* Guide Steps (SGK Trang 34 – 35) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Step 1 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center font-black text-sm">
              1
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {bilingualMode === 'en' ? 'Figure 7.4 Textbook' : 'Hình 7.4 SGK'}
            </span>
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            <BilingualText vi="Bước 1: Quan sát vị trí nút bấm" en="Step 1: Observe Physical Buttons" />
          </h3>
          <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-2 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="font-bold text-amber-600 dark:text-amber-400 shrink-0">•</span>
              <span>
                <strong>{bilingualMode === 'en' ? 'Lock/Power Key: ' : 'Nút khoá (Power/Lock key): '}</strong>
                <BilingualText
                  vi="Dùng để bật máy hoặc tắt/bật màn hình hiển thị. Nhấn giữ khoảng 3 giây để mở menu tắt nguồn hoặc khởi động lại."
                  en="Used to power up the device or toggle the display on/off. Press and hold ~3 seconds to open the shutdown/restart menu."
                />
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-amber-600 dark:text-amber-400 shrink-0">•</span>
              <span>
                <strong>{bilingualMode === 'en' ? 'Volume Rocker (Up/Down): ' : 'Nút điều chỉnh âm lượng (Volume Up/Down): '}</strong>
                <BilingualText
                  vi="Gồm 2 phím riêng biệt hoặc 1 phím dài có 2 đầu tăng/giảm để chỉnh âm lượng chuông gọi và đa phương tiện."
                  en="Comprises separate keys or a rocker bar to adjust ringer, notifications, and media playback sound levels."
                />
              </span>
            </li>
          </ul>
        </div>

        {/* Step 2 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 flex items-center justify-center font-black text-sm">
              2
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {bilingualMode === 'en' ? 'Device Booting' : 'Khởi động máy'}
            </span>
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            <BilingualText vi="Bước 2: Khởi động & Nhận biết hệ điều hành" en="Step 2: Boot & Detect Mobile OS" />
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <BilingualText
              vi="Bấm và giữ nút khoá để khởi động điện thoại. Quan sát logo xuất hiện trên màn hình khởi động để nhận biết hệ điều hành của máy: Logo quả táo khuyết (iOS) hoặc Logo Robot xanh (Android)."
              en="Press and hold the power button to boot. Observe the boot screen logo to identify the underlying operating system: Apple's Apple logo (iOS) or the green Android mascot."
            />
          </p>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-400 font-mono">
            <BilingualText
              vi="💡 Mẹo: Khi điện thoại đang chạy, bấm nhanh nút khoá 1 lần sẽ khoá màn hình và đưa máy về chế độ chờ (Standby) tiết kiệm pin."
              en="💡 Tip: While running, pressing the lock key once sleeps the display and switches the device to battery-saving Standby mode."
            />
          </div>
        </div>
      </div>

      {/* Interactive Smartphone Hardware Simulator */}
      <div className="bg-slate-950 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {bilingualMode === 'en' ? 'Interactive Hardware Sandbox' : 'Phòng thực hành ảo'}
            </span>
            <h3 className="font-bold text-base sm:text-lg text-slate-100">
              <BilingualText
                vi="Mô phỏng tương tác: Thử nghiệm các nút bấm phần cứng điện thoại"
                en="Interactive Simulation: Testing Physical Smartphone Controls"
              />
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSimulatedOs('android')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                simulatedOs === 'android' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              Android
            </button>
            <button
              type="button"
              onClick={() => setSimulatedOs('ios')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                simulatedOs === 'ios' ? 'bg-slate-700 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              iOS
            </button>
          </div>
        </div>

        {/* Smartphone Hardware Frame Representation */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 py-4">
          {/* Virtual Phone Canvas */}
          <div className="relative flex items-center">
            {/* Left Volume Buttons */}
            <div className="flex flex-col gap-2 -mr-1 z-10">
              <button
                type="button"
                onClick={handleVolumeUp}
                className="w-3.5 h-12 rounded-l-md bg-slate-700 hover:bg-amber-500 active:scale-95 transition-colors cursor-pointer shadow-md"
                title={bilingualMode === 'en' ? 'Volume Up button' : 'Nút tăng âm lượng'}
              />
              <button
                type="button"
                onClick={handleVolumeDown}
                className="w-3.5 h-12 rounded-l-md bg-slate-700 hover:bg-amber-500 active:scale-95 transition-colors cursor-pointer shadow-md"
                title={bilingualMode === 'en' ? 'Volume Down button' : 'Nút giảm âm lượng'}
              />
            </div>

            {/* Phone Body Chassis */}
            <div className="w-64 sm:w-72 h-[440px] rounded-[36px] bg-slate-900 border-4 border-slate-700 p-3 shadow-2xl relative flex flex-col justify-between overflow-hidden">
              {/* Speaker earpiece & front camera notch */}
              <div className="w-24 h-4 bg-black mx-auto rounded-b-xl flex items-center justify-center gap-2 z-20">
                <span className="w-8 h-1 bg-slate-800 rounded-full" />
                <span className="w-2 h-2 bg-slate-900 border border-slate-700 rounded-full" />
              </div>

              {/* Screen Area */}
              <div
                className={`w-full h-full rounded-[26px] transition-all duration-300 flex flex-col justify-between p-3 relative overflow-hidden ${
                  isScreenOn
                    ? simulatedOs === 'android'
                      ? 'bg-gradient-to-b from-blue-900 via-indigo-950 to-slate-950 text-white'
                      : 'bg-gradient-to-b from-purple-900 via-slate-900 to-black text-white'
                    : 'bg-black text-transparent'
                }`}
              >
                {isScreenOn && (
                  <>
                    {/* Status Bar */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 pt-1">
                      <span>16:10</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px]">Wi-Fi</span>
                        <span className="text-[10px] font-bold text-emerald-400">92%</span>
                      </div>
                    </div>

                    {/* Clock & Weather Widget */}
                    <div className="text-center my-auto space-y-1">
                      <div className="text-4xl font-black font-mono tracking-tight">16:10</div>
                      <div className="text-xs text-slate-300">
                        {bilingualMode === 'en' ? 'Thursday, June 19' : 'Thứ Năm, 19 Tháng 6'}
                      </div>
                      <div className="text-xs text-amber-300 font-semibold">
                        {bilingualMode === 'en' ? 'Hanoi 22°C ⛅' : 'Hà Nội 22°C ⛅'}
                      </div>
                    </div>

                    {/* Volume Overlay Toast */}
                    {showVolumeToast && (
                      <div className="absolute top-12 left-4 right-4 bg-slate-900/95 border border-slate-700 rounded-xl p-2.5 flex items-center gap-3 shadow-xl animate-in fade-in">
                        {volumeLevel === 0 ? (
                          <VolumeX className="w-4 h-4 text-rose-400 shrink-0" />
                        ) : (
                          <Volume2 className="w-4 h-4 text-amber-400 shrink-0" />
                        )}
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between text-[10px] font-mono text-slate-400">
                            <span>{bilingualMode === 'en' ? 'Volume' : 'Âm lượng'}</span>
                            <span>{volumeLevel}%</span>
                          </div>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-amber-400 h-full rounded-full transition-all"
                              style={{ width: `${volumeLevel}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bottom Nav Simulation */}
                    <div className="flex justify-around items-center pt-2 border-t border-white/10 text-xs text-slate-400">
                      <span>{bilingualMode === 'en' ? '◀ Back' : '◀ Quay lại'}</span>
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-white/40" />
                      <span>{bilingualMode === 'en' ? '■ Overview' : '■ Tổng quan'}</span>
                    </div>
                  </>
                )}

                {!isScreenOn && (
                  <div className="my-auto text-center text-xs text-slate-700">
                    {bilingualMode === 'en' ? 'Screen is off (Standby)' : 'Màn hình đang tắt (Standby)'}
                  </div>
                )}
              </div>
            </div>

            {/* Right Power/Lock Button */}
            <div className="-ml-1 z-10">
              <button
                type="button"
                onClick={handleToggleLock}
                className={`w-3.5 h-16 rounded-r-md transition-colors cursor-pointer shadow-md flex items-center justify-center ${
                  isScreenOn ? 'bg-slate-700 hover:bg-rose-500' : 'bg-emerald-600 hover:bg-emerald-500'
                }`}
                title={bilingualMode === 'en' ? 'Power/Lock button' : 'Nút khoá / Nguồn'}
              >
                <Power className="w-2.5 h-2.5 text-white" />
              </button>
            </div>
          </div>

          {/* Interactive Instructions & Control Panel */}
          <div className="space-y-4 max-w-sm text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">
                {bilingualMode === 'en' ? 'Try Click on Buttons:' : 'Thử bấm các nút trên điện thoại ảo:'}
              </span>
              <ul className="space-y-1.5 text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span>
                    <strong>{bilingualMode === 'en' ? 'Right key (Power/Lock): ' : 'Nút bên phải (Nút khoá): '}</strong>
                    {bilingualMode === 'en' ? 'Click to toggle display on/off.' : 'Nhấp để bật/tắt màn hình hiển thị.'}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>
                    <strong>{bilingualMode === 'en' ? 'Left 2 keys (Volume): ' : '2 Nút bên trái (Âm lượng): '}</strong>
                    {bilingualMode === 'en' ? 'Click to increase/decrease speaker volume.' : 'Nhấp để tăng/giảm âm lượng loa.'}
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <span className="font-bold text-slate-200">
                {bilingualMode === 'en' ? 'Current Status:' : 'Trạng thái hiện tại:'}
              </span>
              <div className="flex justify-between text-slate-400 font-mono">
                <span>{bilingualMode === 'en' ? 'Screen:' : 'Màn hình:'}</span>
                <span className={isScreenOn ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                  {isScreenOn
                    ? (bilingualMode === 'en' ? 'ACTIVE (ON)' : 'ĐANG SÁNG (ON)')
                    : (bilingualMode === 'en' ? 'LOCKED (OFF)' : 'ĐANG KHOÁ (OFF)')}
                </span>
              </div>
              <div className="flex justify-between text-slate-400 font-mono">
                <span>{bilingualMode === 'en' ? 'Speaker Volume:' : 'Âm lượng loa:'}</span>
                <span className="text-amber-400 font-bold">{volumeLevel}%</span>
              </div>
              <div className="flex justify-between text-slate-400 font-mono">
                <span>{bilingualMode === 'en' ? 'Operating System:' : 'Hệ điều hành:'}</span>
                <span className="text-indigo-400 font-bold uppercase">{simulatedOs}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={2} lessonId={7} />

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={prevPage}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'Previous: PDA Evolution' : 'Quay lại: Sự phát triển PDA'}</span>
        </button>

        <button
          type="button"
          onClick={nextPage}
          className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer"
        >
          <span>{bilingualMode === 'en' ? 'Next: Home Screen & Navigation' : 'Tiếp theo: Màn hình chính & Điều hướng'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
