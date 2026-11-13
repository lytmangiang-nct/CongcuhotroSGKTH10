import React, { useState } from 'react';
import {
  Volume2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Compass,
  Layers,
  CheckCircle2,
  Phone,
  MessageSquare,
  Users,
  Camera,
  Chrome,
  Mail,
  Calculator,
  Calendar,
  Clock,
  Video,
  Cloud,
  ChevronLeft,
  Circle,
  Square,
  Grid,
  Info
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section7HomeScreenNavigation: React.FC = () => {
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

  // Interactive OS Launcher States
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0); // 0: Page 1, 1: Page 2
  const [showOverviewModal, setShowOverviewModal] = useState<boolean>(false);

  const speechVi =
    'Mục 2: Nhiệm vụ 2 và 3. Màn hình làm việc chính của điện thoại gồm: Thanh trạng thái ở trên cùng hiển thị giờ, pin và sóng; Các biểu tượng ứng dụng; Thanh truy cập nhanh dock ở cuối trang; và Thanh điều hướng gồm nút Quay lại, Home và nút Tổng quan. Các ứng dụng có sẵn gồm Camera, Gọi điện, Tin nhắn, Lịch và có thể cài thêm Zoom, Meet, Google Drive.';

  const speechEn =
    'Section 2: Tasks 2 and 3. The smartphone home screen features: Top Status Bar showing time, battery, and signal; App Icon grids; Quick Access Dock for essential dialer and messages; and bottom Navigation Bar with Back, Home, and Overview controls. Essential apps include Phone, Camera, Calendar, and downloadable tools like Zoom, Meet, and Google Drive.';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(bilingualMode === 'en' ? speechEn : speechVi);
    }
  };

  const page1Apps = [
    { id: 'phone', nameVi: 'Điện thoại', nameEn: 'Phone', icon: Phone, color: 'bg-emerald-500 text-white' },
    { id: 'messages', nameVi: 'Tin nhắn', nameEn: 'Messages', icon: MessageSquare, color: 'bg-blue-500 text-white' },
    { id: 'contacts', nameVi: 'Danh bạ', nameEn: 'Contacts', icon: Users, color: 'bg-amber-500 text-white' },
    { id: 'camera', nameVi: 'Máy ảnh', nameEn: 'Camera', icon: Camera, color: 'bg-rose-500 text-white' },
    { id: 'browser', nameVi: 'Chrome', nameEn: 'Chrome', icon: Chrome, color: 'bg-amber-600 text-white' },
    { id: 'mail', nameVi: 'Email', nameEn: 'Email', icon: Mail, color: 'bg-red-500 text-white' },
    { id: 'calc', nameVi: 'Máy tính', nameEn: 'Calculator', icon: Calculator, color: 'bg-indigo-500 text-white' },
    { id: 'calendar', nameVi: 'Lịch', nameEn: 'Calendar', icon: Calendar, color: 'bg-teal-500 text-white' }
  ];

  const page2Apps = [
    { id: 'clock', nameVi: 'Hẹn giờ', nameEn: 'Clock', icon: Clock, color: 'bg-slate-700 text-white' },
    { id: 'zoom', nameVi: 'Zoom Meet', nameEn: 'Zoom Meet', icon: Video, color: 'bg-sky-500 text-white' },
    { id: 'drive', nameVi: 'Google Drive', nameEn: 'Drive', icon: Cloud, color: 'bg-emerald-600 text-white' },
    { id: 'teams', nameVi: 'MS Teams', nameEn: 'MS Teams', icon: Users, color: 'bg-purple-600 text-white' }
  ];

  const handleOpenApp = (appId: string) => {
    setActiveApp(appId);
    setShowOverviewModal(false);
  };

  const handleHomeButton = () => {
    setActiveApp(null);
    setShowOverviewModal(false);
  };

  const handleBackButton = () => {
    if (showOverviewModal) {
      setShowOverviewModal(false);
    } else if (activeApp) {
      setActiveApp(null);
    }
  };

  const handleOverviewButton = () => {
    setShowOverviewModal(!showOverviewModal);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300">
              {bilingualMode === 'en' ? 'Section 3 • Tasks 2 & 3' : 'Mục 3 • Nhiệm vụ 2 & 3'}
            </span>
            <span className="text-xs text-slate-500 font-mono">SGK Trang 35 – 36</span>
            <button
              type="button"
              onClick={() => {
                setOriginalPageTarget(35);
                setShowOriginalModal(true);
              }}
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>{bilingualMode === 'en' ? 'Page 35 Scan' : 'Bản quét Tr. 35'}</span>
            </button>
          </div>
          <h2
            data-en="Home Screen Layout, Navigation Controls & Application Ecosystem"
            data-vi="Màn hình làm việc, Thanh điều hướng (Navigation Bar) & Kho ứng dụng"
            className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100"
          >
            <BilingualText
              vi="Màn hình làm việc, Thanh điều hướng (Navigation Bar) & Kho ứng dụng"
              en="Home Screen Layout, Navigation Controls & Application Ecosystem"
            />
          </h2>
        </div>
      </div>

      {/* 4 Anatomical Areas of Home Screen (Hình 7.5 SGK Trang 35) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Status bar */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            <BilingualText vi="Mép trên cùng" en="Top Edge" />
          </span>
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
            <BilingualText vi="Thanh trạng thái (Status Bar)" en="Status Bar" />
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <BilingualText
              vi="Hiển thị thời gian hiện tại, phần trăm pin, cường độ sóng mạng di động, biểu tượng Wi-Fi và các thông báo mới."
              en="Shows clock time, battery percentage, cellular signal bars, Wi-Fi, and incoming application notifications."
            />
          </p>
        </div>

        {/* App icons grid */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
            <BilingualText vi="Khu vực chính" en="Main Area" />
          </span>
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
            <BilingualText vi="Lưới biểu tượng ứng dụng" en="App Icon Grid" />
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <BilingualText
              vi="Các ứng dụng cài sẵn và cài thêm được phân bổ trên các trang màn hình. Vuốt sang trái/phải để chuyển trang."
              en="Preinstalled and downloaded app icons distributed across swipeable screen pages."
            />
          </p>
        </div>

        {/* Quick Access Dock */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
            <BilingualText vi="Cố định ở đáy" en="Fixed Bottom" />
          </span>
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
            <BilingualText vi="Thanh truy cập nhanh (Dock)" en="Quick Access Dock" />
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <BilingualText
              vi="Chứa các ứng dụng hay dùng nhất (Điện thoại, Tin nhắn, Danh bạ). Thanh này luôn cố định ở mọi trang màn hình chính."
              en="Fixed bottom dock hosting frequent tools (Phone, SMS, Contacts) persisting across all pages."
            />
          </p>
        </div>

        {/* Navigation Bar */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
            <BilingualText vi="Hàng phím ảo" en="Virtual Control Row" />
          </span>
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
            <BilingualText vi="Thanh điều hướng (Navigation)" en="Navigation Bar" />
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <BilingualText
              vi="3 phím cảm ứng quan trọng: Nút Quay lại (Back), Nút Màn hình chính (Home) và Nút Tổng quan đa nhiệm (Overview)."
              en="3 vital virtual touch controls: Back key, Home launcher key, and Multitasking Overview key."
            />
          </p>
        </div>
      </div>

      {/* Interactive Mobile OS Sandbox Canvas */}
      <div className="bg-slate-950 text-white rounded-2xl p-6 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              {bilingualMode === 'en' ? 'Interactive App Launcher' : 'Mô phỏng màn hình cảm ứng tương tác'}
            </span>
            <h3 className="font-bold text-base sm:text-lg text-slate-100">
              <BilingualText
                vi="Trải nghiệm Màn hình chính, Mở ứng dụng & Điều hướng ảo"
                en="Experience Home Launcher, App Execution & Virtual Navigation"
              />
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPageIndex(0)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentPageIndex === 0 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {bilingualMode === 'en' ? 'Page 1' : 'Trang 1'}
            </button>
            <button
              type="button"
              onClick={() => setCurrentPageIndex(1)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentPageIndex === 1 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {bilingualMode === 'en' ? 'Page 2' : 'Trang 2'}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 py-2">
          {/* Virtual Mobile Screen */}
          <div className="w-72 sm:w-80 h-[520px] rounded-[38px] bg-slate-900 border-4 border-slate-700 p-3 shadow-2xl relative flex flex-col justify-between overflow-hidden">
            {/* Top Speaker / Camera Notch */}
            <div className="w-28 h-4 bg-black mx-auto rounded-b-xl flex items-center justify-center gap-2 z-20">
              <span className="w-10 h-1 bg-slate-800 rounded-full" />
              <span className="w-2.5 h-2.5 bg-slate-900 border border-slate-700 rounded-full" />
            </div>

            {/* Screen Inner Display */}
            <div className="w-full h-full rounded-[28px] bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 p-3 flex flex-col justify-between relative overflow-hidden">
              {/* 1. Status Bar */}
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 pt-0.5 shrink-0 border-b border-white/5 pb-1">
                <span>16:10</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px]">4G</span>
                  <span className="text-[10px]">Wi-Fi</span>
                  <span className="text-[10px] font-bold text-emerald-400">92%</span>
                </div>
              </div>

              {/* Active Application View or Home Screen View */}
              {activeApp ? (
                <div className="flex-1 my-2 bg-slate-900/90 rounded-2xl p-4 border border-slate-700 flex flex-col justify-between animate-in zoom-in-95">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="font-bold text-sm text-amber-400">
                        {activeApp.toUpperCase()} APP
                      </span>
                      <button
                        type="button"
                        onClick={handleHomeButton}
                        className="text-xs text-slate-400 hover:text-white cursor-pointer"
                      >
                        {bilingualMode === 'en' ? '✕ Close' : '✕ Đóng'}
                      </button>
                    </div>
                    <div className="text-xs text-slate-300 space-y-2 pt-2">
                      <p>
                        {bilingualMode === 'en' ? 'Active application: ' : 'Đang mở ứng dụng: '}
                        <strong className="text-white">{activeApp}</strong>
                      </p>
                      <p className="text-[11px] text-slate-400">
                        <BilingualText
                          vi="Học sinh có thể bấm nút Home (○) hoặc Quay lại (◀) ở thanh điều hướng phía dưới để quay lại màn hình chính."
                          en="Tap the Home button (○) or Back button (◀) on the bottom navigation bar to return to the home screen."
                        />
                      </p>
                    </div>
                  </div>
                  <div className="p-3 bg-black/50 rounded-xl text-center text-xs font-mono text-emerald-400">
                    {bilingualMode === 'en' ? 'Application is running normally' : 'Ứng dụng đang hoạt động bình thường'}
                  </div>
                </div>
              ) : showOverviewModal ? (
                /* Multitasking Overview Window */
                <div className="flex-1 my-2 bg-slate-900/95 rounded-2xl p-4 border border-slate-700 flex flex-col justify-between animate-in fade-in">
                  <div className="space-y-2">
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-400">
                      {bilingualMode === 'en' ? 'Multitasking (Overview Task Switcher)' : 'Đa nhiệm (Overview Task Switcher)'}
                    </span>
                    <div className="space-y-2 pt-2">
                      {['Camera', 'Zoom Meet', 'Chrome'].map((app) => (
                        <div
                          key={app}
                          onClick={() => handleOpenApp(app.toLowerCase())}
                          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 cursor-pointer flex items-center justify-between text-xs font-bold transition-colors"
                        >
                          <span>{app}</span>
                          <span className="text-[10px] text-indigo-400 font-normal">
                            {bilingualMode === 'en' ? 'Tap to switch' : 'Chạm để mở'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleHomeButton}
                    className="w-full py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
                  >
                    {bilingualMode === 'en' ? 'Close all apps' : 'Đóng tất cả ứng dụng'}
                  </button>
                </div>
              ) : (
                /* Home Launcher Grid View */
                <div className="flex-1 flex flex-col justify-between py-2">
                  {/* Weather & Clock Widget */}
                  <div className="text-center py-2 space-y-0.5">
                    <div className="text-3xl font-black font-mono">16:10</div>
                    <div className="text-[11px] text-slate-400">
                      {bilingualMode === 'en' ? 'Thursday, June 19 • Hanoi 22°C ⛅' : 'Thứ Năm, 19 Tháng 6 • Hà Nội 22°C ⛅'}
                    </div>
                  </div>

                  {/* App Icons Grid */}
                  <div className="grid grid-cols-4 gap-3 py-2">
                    {(currentPageIndex === 0 ? page1Apps : page2Apps).map((app) => {
                      const Icon = app.icon;
                      return (
                        <button
                          key={app.id}
                          type="button"
                          onClick={() => handleOpenApp(app.id)}
                          className="flex flex-col items-center gap-1 group cursor-pointer transition-transform hover:scale-110 active:scale-95"
                        >
                          <div
                            className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-md ${app.color}`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-medium text-slate-200 group-hover:text-amber-300 truncate max-w-[58px]">
                            {bilingualMode === 'en' ? app.nameEn : app.nameVi}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Page Indicator Dots */}
                  <div className="flex justify-center items-center gap-1.5 py-1">
                    <button
                      type="button"
                      onClick={() => setCurrentPageIndex(0)}
                      className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                        currentPageIndex === 0 ? 'bg-white w-4' : 'bg-slate-600'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setCurrentPageIndex(1)}
                      className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                        currentPageIndex === 1 ? 'bg-white w-4' : 'bg-slate-600'
                      }`}
                    />
                  </div>

                  {/* Fixed Quick Access Dock */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 flex justify-around items-center border border-white/10">
                    {[
                      { id: 'phone', icon: Phone, color: 'bg-emerald-500' },
                      { id: 'messages', icon: MessageSquare, color: 'bg-blue-500' },
                      { id: 'browser', icon: Chrome, color: 'bg-amber-600' },
                      { id: 'camera', icon: Camera, color: 'bg-rose-500' }
                    ].map((dockApp) => {
                      const Icon = dockApp.icon;
                      return (
                        <button
                          key={dockApp.id}
                          type="button"
                          onClick={() => handleOpenApp(dockApp.id)}
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm cursor-pointer transition-transform hover:scale-110 ${dockApp.color}`}
                        >
                          <Icon className="w-5 h-5" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Navigation Bar (Virtual Controls: Back, Home, Overview) */}
              <div className="flex justify-around items-center pt-2 border-t border-white/10 text-slate-400 shrink-0">
                <button
                  type="button"
                  onClick={handleBackButton}
                  className="p-1.5 hover:text-white transition-colors cursor-pointer"
                  title={bilingualMode === 'en' ? 'Back' : 'Quay lại (Back)'}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleHomeButton}
                  className="p-1.5 hover:text-white transition-colors cursor-pointer"
                  title={bilingualMode === 'en' ? 'Home' : 'Màn hình chính (Home)'}
                >
                  <Circle className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleOverviewButton}
                  className="p-1.5 hover:text-white transition-colors cursor-pointer"
                  title={bilingualMode === 'en' ? 'Overview' : 'Tổng quan đa nhiệm (Overview)'}
                >
                  <Square className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* User Guide Instructions */}
          <div className="space-y-4 max-w-sm text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="font-bold text-blue-400 uppercase tracking-wider text-[11px]">
                {bilingualMode === 'en' ? 'Interactive Guide:' : 'Hướng dẫn thao tác thực hành:'}
              </span>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 mt-1" />
                  <span>
                    <strong>{bilingualMode === 'en' ? 'Tap App Icon: ' : 'Chạm vào biểu tượng: '}</strong>
                    {bilingualMode === 'en' ? 'Click any app icon to launch that application.' : 'Nhấp vào bất kỳ ứng dụng nào để khởi chạy ứng dụng đó.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0 mt-1" />
                  <span>
                    <strong>{bilingualMode === 'en' ? 'Home Button (○ Circle): ' : 'Nút Home (Hình tròn ○): '}</strong>
                    {bilingualMode === 'en' ? 'Immediately minimize app and return to Home Screen.' : 'Thoát ngay ứng dụng về màn hình chính.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0 mt-1" />
                  <span>
                    <strong>{bilingualMode === 'en' ? 'Overview Button (■ Square): ' : 'Nút Tổng quan (Hình vuông ■): '}</strong>
                    {bilingualMode === 'en' ? 'Inspect and switch between background running apps.' : 'Xem các tác vụ đang chạy nền.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 mt-1" />
                  <span>
                    <strong>{bilingualMode === 'en' ? 'Bottom Dock: ' : 'Thanh Dock ở đáy: '}</strong>
                    {bilingualMode === 'en' ? 'Persists 4 core tools across all desktop pages.' : 'Luôn cố định 4 ứng dụng cốt lõi ở mọi trang.'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={3} lessonId={7} />

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={prevPage}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'Previous: Hardware Buttons' : 'Quay lại: Nút bấm phần cứng'}</span>
        </button>

        <button
          type="button"
          onClick={nextPage}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer"
        >
          <span>{bilingualMode === 'en' ? 'Next: File Manager & Cloud' : 'Tiếp theo: Quản lý tệp & Lưu trữ đám mây'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
