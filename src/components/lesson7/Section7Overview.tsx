import React, { useState } from 'react';
import {
  Volume2,
  Sparkles,
  Target,
  ArrowRight,
  Tablet,
  Smartphone,
  Watch,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Layers,
  Lightbulb,
  Info,
  Radio,
  Compass
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section7Overview: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    nextPage,
    setOriginalPageTarget,
    setShowOriginalModal
  } = useBook();

  // Interactive Activity: Device Matcher Sandbox
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const speechOverviewVi =
    'Bài 7: Thực hành sử dụng thiết bị số thông dụng. Sau bài này học sinh sẽ biết được thiết bị số cá nhân thông dụng gồm những gì, biết một số tính năng tiêu biểu và khai thác sử dụng các ứng dụng, dữ liệu trên máy tính bảng và điện thoại thông minh.';

  const speechOverviewEn =
    'Lesson 7: Practice: Using Common Digital Devices. After this lesson, students will identify common personal digital devices, understand typical features, and effectively exploit applications and data on tablets and smartphones.';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(bilingualMode === 'en' ? speechOverviewEn : speechOverviewVi);
    }
  };

  const devices = [
    {
      id: 'tablet',
      nameVi: 'Máy tính bảng (Tablet)',
      nameEn: 'Tablet Computer',
      icon: Tablet,
      descVi: 'Màn hình cảm ứng lớn (7 – 12 inch), hỗ trợ học tập, duyệt web, giải trí đa phương tiện và vẽ đồ hoạ.',
      descEn: 'Large multi-touch screen (7–12 inches), ideal for e-learning, web browsing, multimedia, and digital sketching.',
      color: 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200'
    },
    {
      id: 'ebook',
      nameVi: 'Máy đọc sách (E-reader)',
      nameEn: 'E-book Reader',
      icon: BookOpen,
      descVi: 'Sử dụng công nghệ mực điện tử (E-ink) chống mỏi mắt, pin dùng nhiều tuần, chuyên dùng để đọc sách.',
      descEn: 'Features electronic ink (E-ink) display reducing eye strain with multi-week battery life tailored for reading.',
      color: 'border-amber-500 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200'
    },
    {
      id: 'smartphone',
      nameVi: 'Điện thoại thông minh (Smartphone)',
      nameEn: 'Smartphone',
      icon: Smartphone,
      descVi: 'Thiết bị liên lạc di động đa năng, máy ảnh sắc nét, cài đặt hàng triệu ứng dụng từ App Store/CH Play.',
      descEn: 'All-in-one mobile communication device featuring high-res cameras and millions of installable apps.',
      color: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200'
    },
    {
      id: 'smartwatch',
      nameVi: 'Đồng hồ thông minh (Smartwatch)',
      nameEn: 'Smartwatch',
      icon: Watch,
      descVi: 'Đeo trên cổ tay, theo dõi sức khoẻ, đo nhịp tim, đếm bước chân, nhận thông báo cuộc gọi và tin nhắn.',
      descEn: 'Wrist-worn wearable tracking health metrics, heart rate, daily steps, and mirroring smartphone notifications.',
      color: 'border-purple-500 bg-purple-50 dark:bg-purple-950/30 text-purple-900 dark:text-purple-200'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-linear-to-r from-amber-500 via-orange-500 to-rose-500 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-white/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold tracking-wider uppercase">
                {bilingualMode === 'en' ? 'Topic 1: Computers & Knowledge Society' : 'Chủ đề 1: Máy tính & Xã hội tri thức'}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-900/30 text-white text-xs font-semibold border border-white/20">
                {bilingualMode === 'en' ? 'Textbook Pages 33 – 37' : 'Trang 33 – 37 SGK'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setOriginalPageTarget(33);
                  setShowOriginalModal(true);
                }}
                className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-semibold border border-white/30 transition-colors cursor-pointer flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{bilingualMode === 'en' ? 'View Page 33 Scan' : 'Xem bản quét Tr. 33'}</span>
              </button>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              {bilingualMode === 'en'
                ? 'Lesson 7: Practice: Using Common Digital Devices'
                : 'Bài 7: Thực hành sử dụng thiết bị số thông dụng'}
            </h1>
            <p className="text-amber-100 text-sm sm:text-base max-w-2xl">
              {bilingualMode === 'en'
                ? 'Mastering mobile operating systems, physical controls, navigation bars, file managers, and cloud connectivity on modern PDAs.'
                : 'Làm chủ hệ điều hành di động, phím vật lý, thanh điều hướng, quản lý tệp tin và kết nối đám mây trên các thiết bị số cá nhân.'}
            </p>
          </div>
        </div>
      </div>

      {/* 3 Learning Objectives */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              <BilingualText
                vi="Mục tiêu bài học (SGK Trang 33)"
                en="Learning Objectives (Textbook Page 33)"
              />
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <BilingualText
                vi="Sau bài học này, em sẽ đạt được các năng lực công nghệ cốt lõi:"
                en="Upon completion, students will master fundamental digital competencies:"
              />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/50 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
                <span className="w-6 h-6 rounded-full bg-amber-200 dark:bg-amber-900/60 flex items-center justify-center text-xs">
                  1
                </span>
                <BilingualText vi="Nhận diện thiết bị số" en="Device Identification" />
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                <BilingualText
                  vi="Biết được thiết bị số cá nhân thông dụng thường có những gì (smartphone, tablet, smartwatch, e-reader)."
                  en="Recognize common personal digital devices (smartphones, tablets, smartwatches, e-readers)."
                />
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-amber-100 dark:border-amber-900/30 text-[11px] text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Personal Digital Assistants (PDA)</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/50 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-bold text-xs uppercase tracking-wider">
                <span className="w-6 h-6 rounded-full bg-orange-200 dark:bg-orange-900/60 flex items-center justify-center text-xs">
                  2
                </span>
                <BilingualText vi="Tính năng tiêu biểu" en="Core Feature Mastery" />
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                <BilingualText
                  vi="Biết được một số tính năng tiêu biểu của thiết bị số cá nhân: phím vật lý, thanh trạng thái, thanh điều hướng."
                  en="Understand typical features: hardware buttons, status bars, and navigation bars."
                />
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-orange-100 dark:border-orange-900/30 text-[11px] text-orange-600 dark:text-orange-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Hardware & Android/iOS UI</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/50 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
                <span className="w-6 h-6 rounded-full bg-rose-200 dark:bg-rose-900/60 flex items-center justify-center text-xs">
                  3
                </span>
                <BilingualText vi="Khai thác ứng dụng & tệp" en="File & Cloud Operations" />
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                <BilingualText
                  vi="Khai thác sử dụng một số ứng dụng và quản lý dữ liệu trên thiết bị di động (thư mục DCIM, đám mây, học online)."
                  en="Operate mobile applications and manage hierarchical files (DCIM folder, cloud sync, online classes)."
                />
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-rose-100 dark:border-rose-900/30 text-[11px] text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>File Management & Cloud Sync</span>
            </div>
          </div>
        </div>
      </div>

      {/* Warm-up Inquiry & Interactive Device Gallery (Hình 7.1 SGK Trang 33) */}
      <div className="bg-slate-950 text-white rounded-2xl p-6 shadow-xl border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {bilingualMode === 'en' ? 'Warm-up Activity (Textbook Figure 7.1)' : 'Phần Khởi động (Hình 7.1 SGK Trang 33)'}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-100">
              <BilingualText
                vi="Em có biết các thiết bị hỗ trợ cá nhân trong hình dưới đây có tên gọi là gì không?"
                en="Do you know the names of the personal assistant devices shown below?"
              />
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          <BilingualText
            vi="Nhấp vào từng thiết bị dưới đây để khám phá vai trò và đặc điểm nổi bật của từng trợ thủ số cá nhân trong cuộc sống hiện đại:"
            en="Click each device card below to explore its specific capabilities and role in daily personal computing:"
          />
        </p>

        {/* 4 Interactive Device Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {devices.map((dev) => {
            const Icon = dev.icon;
            const isSelected = selectedDevice === dev.id;
            return (
              <div
                key={dev.id}
                onClick={() => setSelectedDevice(dev.id)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'border-amber-400 bg-slate-900 shadow-lg scale-102 ring-2 ring-amber-400/30'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    {isSelected && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                        Đang chọn
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-sm text-slate-100">
                    {bilingualMode === 'en' ? dev.nameEn : dev.nameVi}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {bilingualMode === 'en' ? dev.descEn : dev.descVi}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] font-semibold text-amber-400">
                  {bilingualMode === 'en' ? 'Personal Assistant' : 'Trợ thủ số cá nhân'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity 1 (Hoạt động 1 SGK Trang 33) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-800 dark:bg-orange-950/70 dark:text-orange-300">
                {bilingualMode === 'en' ? 'Activity 1' : 'Hoạt động 1'}
              </span>
              <span className="text-xs text-slate-400 font-mono">SGK Trang 33</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              <BilingualText
                vi="Tìm hiểu thiết bị trợ thủ số cá nhân (Personal Digital Assistant - PDA)"
                en="Exploring Personal Digital Assistants (PDAs)"
              />
            </h3>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
          <p>
            <BilingualText
              vi="Sự phát triển của Công nghệ thông tin và vi điện tử đã dẫn tới sự ra đời của hàng loạt các thiết bị số hỗ trợ cá nhân, còn gọi là trợ thủ số cá nhân (PDA)."
              en="Rapid advancements in Information Technology and microelectronics have yielded diverse personal digital assistants (PDAs)."
            />
          </p>
          <p className="font-semibold text-amber-800 dark:text-amber-300">
            <BilingualText
              vi="Ban đầu, PDA thường có các chức năng cơ bản: sổ lịch ghi công tác, đồng hồ xem giờ & báo thức, sổ danh bạ liên hệ, danh sách việc cần làm (to-do list), sổ ghi nhớ (notes), máy tính bỏ túi..."
              en="Initially, early PDAs offered core utilities: calendar schedules, alarm clocks, contact address books, task to-do lists, memo note pads, and pocket calculators..."
            />
          </p>
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={0} lessonId={7} />

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {bilingualMode === 'en' ? 'Section 1 of 6' : 'Phần 1 / 6'}
        </div>
        <button
          type="button"
          onClick={nextPage}
          className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer"
        >
          <span>{bilingualMode === 'en' ? 'Next: PDA Evolution & OS' : 'Tiếp theo: Sự phát triển của PDA & Hệ điều hành'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
