import React, { useState } from 'react';
import { Cpu, CheckCircle2, XCircle, Info, Sparkles, Smartphone, Video, Clock, Camera, Bot, Car, ArrowRight, ShieldCheck, Eye, Volume2 } from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';
import { SmartDevice3DViewer } from '../three/SmartDevice3DViewer';
import { Activity1Devices3DViewer, Activity1DeviceId } from '../three/Activity1Devices3DViewer';

interface DeviceItem {
  id: Activity1DeviceId;
  nameVi: string;
  nameEn: string;
  figure: string;
  isSmart: boolean;
  reasonVi: string;
  reasonEn: string;
  icon: React.ElementType;
}

export const Section2SmartDevices: React.FC = () => {
  const { bilingualMode, speak, setOriginalPageTarget, setShowOriginalModal } = useBook();
  const [active3DDeviceId, setActive3DDeviceId] = useState<Activity1DeviceId>('clock');
  const [userSelections, setUserSelections] = useState<Record<string, boolean>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const devices: DeviceItem[] = [
    {
      id: 'clock',
      nameVi: 'a) Đồng hồ lịch vạn niên',
      nameEn: 'a) Perpetual calendar digital clock',
      figure: 'Hình 2.1a',
      isSmart: false,
      reasonVi: 'Không có khả năng kết nối mạng không dây và không tự chủ thích ứng hay trao đổi dữ liệu với các thiết bị khác.',
      reasonEn: 'Lacks wireless networking, cannot autonomously adapt or exchange data with other devices.',
      icon: Clock
    },
    {
      id: 'phone',
      nameVi: 'b) Điện thoại di động (Smartphone)',
      nameEn: 'b) Mobile phone (Smartphone)',
      figure: 'Hình 2.1b',
      isSmart: true,
      reasonVi: 'Là hệ thống xử lí thông tin tự chủ có hệ điều hành, kết nối 4G/5G/Wi-Fi/Bluetooth, tiếp nhận, xử lí và trao đổi dữ liệu thông minh.',
      reasonEn: 'An autonomous information system with an OS, connecting via cellular/Wi-Fi/Bluetooth, processing and sharing data intelligently.',
      icon: Smartphone
    },
    {
      id: 'camera',
      nameVi: 'c) Camera kết nối Internet',
      nameEn: 'c) Internet-connected smart camera',
      figure: 'Hình 2.1c',
      isSmart: true,
      reasonVi: 'Tự động truyền dữ liệu qua Internet, có thuật toán tự động nhận diện chuyển động và chỉ ghi hình/gửi cảnh báo khi phát hiện bất thường.',
      reasonEn: 'Autonomously transmits video via the Internet, uses motion detection algorithms to trigger alerts and record intelligently.',
      icon: Video
    },
    {
      id: 'cam_digital',
      nameVi: 'd) Máy ảnh số cơ bản',
      nameEn: 'd) Standalone digital camera',
      figure: 'Hình 2.1d',
      isSmart: false,
      reasonVi: 'Không hoạt động tự chủ, phải có người bấm nút chụp và không tự động kết nối trao đổi dữ liệu qua mạng.',
      reasonEn: 'Does not operate autonomously without direct human shutter clicks and lacks independent network data exchange.',
      icon: Camera
    }
  ];

  const handleSelect = (id: Activity1DeviceId, choice: boolean) => {
    setActive3DDeviceId(id);
    setUserSelections((prev) => ({
      ...prev,
      [id]: choice
    }));
  };

  const handleCheckAll = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setUserSelections({});
    setShowResults(false);
  };

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700">
            {bilingualMode === 'en' ? 'Section 1 • Pages 11 – 12 Textbook' : 'Mục 1 • Trang 11 – 12 SGK'}
          </span>
          <h2 className="text-lg sm:text-xl font-black text-slate-900">
            {bilingualMode === 'en' ? '1. SMART DEVICES' : '1. THIẾT BỊ THÔNG MINH'}
          </h2>
          <p className="text-xs text-slate-600 font-medium">
            {bilingualMode === 'en'
              ? 'a) Smart device as an autonomous information processing system'
              : 'a) Thiết bị thông minh là một hệ thống xử lí thông tin'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setOriginalPageTarget(11);
              setShowOriginalModal(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-300 text-xs font-bold flex items-center gap-1.5 hover:bg-amber-100 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4 text-amber-600" />
            <span>{bilingualMode === 'en' ? 'Compare Figure 2.1 (p. 11)' : 'Đối chiếu Hình 2.1 (Tr. 11)'}</span>
          </button>
          <button
            type="button"
            onClick={() => speak('Smart devices are electronic devices that can operate autonomously to a certain degree thanks to pre-installed control software.', 'en')}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            title="Listen in English"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>EN</span>
          </button>
        </div>
      </div>

      {/* Interactive Activity 1 (Hình 2.1 SGK) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-amber-50/60 border-2 border-amber-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-amber-600 text-white font-black text-xs">
              {bilingualMode === 'en' ? 'Activity 1' : 'Hoạt động 1'}
            </span>
            <h3 className="font-bold text-base sm:text-lg text-slate-900">
              {bilingualMode === 'en'
                ? 'Recognizing Smart Devices (Figure 2.1 Textbook)'
                : 'Nhận biết thiết bị thông minh (Hình 2.1 SGK)'}
            </h3>
          </div>
          <span className="text-xs text-amber-900 font-semibold">
            {bilingualMode === 'en'
              ? 'Inspect each 3D model and select whether it is a smart device:'
              : 'Xoay mô hình 3D và chọn xem thiết bị nào là thiết bị thông minh:'}
          </span>
        </div>

        {/* 3D Model for Activity 1 Devices */}
        <Activity1Devices3DViewer
          selectedDeviceId={active3DDeviceId}
          onSelectDevice={(id) => setActive3DDeviceId(id)}
          userChoices={userSelections}
          onMakeChoice={(id, choice) => handleSelect(id as Activity1DeviceId, choice)}
          showResults={showResults}
        />

        {/* 4 Interactive Device Cards for Activity 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {devices.map((dev) => {
            const Icon = dev.icon;
            const userChoice = userSelections[dev.id];
            const isCorrect = userChoice === dev.isSmart;
            const isCurrentlySelected3D = active3DDeviceId === dev.id;

            return (
              <div
                key={dev.id}
                onClick={() => setActive3DDeviceId(dev.id)}
                className={`p-4 rounded-2xl border-2 transition-all bg-white flex flex-col justify-between space-y-3 cursor-pointer ${
                  isCurrentlySelected3D
                    ? 'ring-2 ring-indigo-500 border-indigo-400 shadow-md scale-[1.01]'
                    : showResults
                    ? isCorrect
                      ? 'border-emerald-500 bg-emerald-50/40'
                      : 'border-rose-400 bg-rose-50/40'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-indigo-700">
                        {dev.figure}
                      </span>
                      {isCurrentlySelected3D && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-indigo-100 text-indigo-700">
                          {bilingualMode === 'en' ? 'Viewing 3D' : 'Đang xem 3D'}
                        </span>
                      )}
                    </div>
                    <BilingualText
                      vi={dev.nameVi}
                      en={dev.nameEn}
                      viClassName="text-xs sm:text-sm font-bold text-slate-900 leading-tight"
                      enClassName="text-[11px] text-slate-600"
                    />
                  </div>
                </div>

                {/* Interaction choice */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">
                    {bilingualMode === 'en' ? 'Smart device?' : 'Là thiết bị thông minh?'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(dev.id, true);
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        userChoice === true
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {bilingualMode === 'en' ? 'Yes' : 'Đúng'}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(dev.id, false);
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        userChoice === false
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {bilingualMode === 'en' ? 'No' : 'Sai'}
                    </button>
                  </div>
                </div>

                {/* Explanation upon check */}
                {showResults && (
                  <div
                    className={`p-2.5 rounded-xl text-xs leading-relaxed animate-in fade-in ${
                      dev.isSmart
                        ? 'bg-emerald-50 text-emerald-950 border border-emerald-200'
                        : 'bg-slate-100 text-slate-800 border border-slate-200'
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1 mb-0.5">
                      {dev.isSmart ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-rose-500" />
                      )}
                      <span>
                        {dev.isSmart
                          ? (bilingualMode === 'en' ? 'IS A SMART DEVICE' : 'LÀ THIẾT BỊ THÔNG MINH')
                          : (bilingualMode === 'en' ? 'NOT A SMART DEVICE' : 'KHÔNG PHẢI THIẾT BỊ THÔNG MINH')}
                      </span>
                    </div>
                    <BilingualText
                      vi={dev.reasonVi}
                      en={dev.reasonEn}
                      viClassName="text-[11px] text-slate-800"
                      enClassName="text-[10px] text-slate-600"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="pt-2 flex items-center justify-end gap-2">
          {!showResults ? (
            <button
              type="button"
              onClick={handleCheckAll}
              disabled={Object.keys(userSelections).length === 0}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
            >
              {bilingualMode === 'en' ? 'Check Activity 1 Answers' : 'Kiểm tra đáp án Hoạt động 1'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer"
            >
              {bilingualMode === 'en' ? 'Reset Activity 1' : 'Làm lại Hoạt động 1'}
            </button>
          )}
        </div>
      </div>

      {/* Interactive 3D Simulation of Smart Devices (Three.js WebGL) */}
      <SmartDevice3DViewer />

      {/* Core Concept Theory Box */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
            <Cpu className="w-4 h-4" />
          </div>
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
            {bilingualMode === 'en'
              ? 'Core Nature of Smart Devices (Pages 11 – 12 Textbook)'
              : 'Bản chất của thiết bị thông minh (SGK Trang 11 – 12)'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-2">
            <div className="font-black text-indigo-950 flex items-center gap-1.5">
              <span>{bilingualMode === 'en' ? '1. Autonomous Operation' : '1. Tự chủ hoạt động'}</span>
            </div>
            <BilingualText
              vi="Hoạt động tự chủ trong một mức độ nhất định nhờ các phần mềm điều khiển được cài đặt sẵn, không cần con người can thiệp liên tục từng thao tác."
              en="Operates autonomously to a certain extent thanks to pre-installed control software, without requiring continuous human intervention."
              viClassName="text-slate-800 text-xs leading-relaxed"
              enClassName="text-[11px] text-slate-600"
            />
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
            <div className="font-black text-emerald-950 flex items-center gap-1.5">
              <span>{bilingualMode === 'en' ? '2. Wireless Connectivity' : '2. Kết nối không dây'}</span>
            </div>
            <BilingualText
              vi="Có khả năng tương tác với các thiết bị khác một cách tự động qua mạng không dây như Bluetooth, Wi-Fi,... để tiếp nhận, xử lí và truyền dữ liệu."
              en="Capable of interacting with other devices automatically via wireless networks such as Bluetooth, Wi-Fi,... to receive, process, and transmit data."
              viClassName="text-slate-800 text-xs leading-relaxed"
              enClassName="text-[11px] text-slate-600"
            />
          </div>

          <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 space-y-2">
            <div className="font-black text-purple-950 flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-purple-600" />
              <span>{bilingualMode === 'en' ? '3. Artificial Intelligence (AI)' : '3. Tích hợp Trí tuệ nhân tạo (AI)'}</span>
            </div>
            <BilingualText
              vi="Tích hợp khả năng bắt chước một vài hành vi hay cách tư duy của con người (người máy giao tiếp ngôn ngữ tự nhiên, xe tự hành dự đoán va chạm để giữ khoảng cách an toàn)."
              en="Integrates the ability to simulate human behavior and cognition (robots communicating via natural language, autonomous vehicles predicting collisions to maintain safe headway)."
              viClassName="text-slate-800 text-xs leading-relaxed"
              enClassName="text-[11px] text-slate-600"
            />
          </div>
        </div>
      </div>

      {/* Teacher Pedagogical Question Prompts & Guidance */}
      <TeacherPromptsWidget sectionIndex={1} lessonId={2} className="mt-4" />
    </div>
  );
};
