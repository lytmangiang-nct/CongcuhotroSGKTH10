import React, { useState } from 'react';
import { Watch, Disc, Wifi, Smartphone, Laptop, CheckCircle2, XCircle, ArrowRight, Info, BookOpen, HardDrive } from 'lucide-react';
import { useBook } from '../context/BookContext';
import { SECTION_3 } from '../data/lessonData';
import confetti from 'canvas-confetti';

export const DeviceClassifier: React.FC = () => {
  const { bilingualMode, completeSectionTasks, currentLessonId } = useBook();
  const [selectedDevice, setSelectedDevice] = useState<string>('watch');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  // Library calculation interactive widget
  const [bookCount, setBookCount] = useState<number>(2000);
  const [bookSizeMB, setBookSizeMB] = useState<number>(50);
  const [cardSizeGB, setCardSizeGB] = useState<number>(256);

  const totalRequiredMB = bookCount * bookSizeMB;
  const totalRequiredGB = totalRequiredMB / 1024;
  const canFit = totalRequiredGB <= cardSizeGB;
  const maxPossibleBooks = Math.floor((cardSizeGB * 1024) / bookSizeMB);

  const toggleReveal = (id: string) => {
    setRevealedAnswers((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
    completeSectionTasks(currentLessonId, 3);
  };

  const revealAll = () => {
    const all: Record<string, boolean> = {};
    SECTION_3.activity2.devices.forEach((d) => (all[d.id] = true));
    setRevealedAnswers(all);
    completeSectionTasks(currentLessonId, 3);
    confetti({ particleCount: 40, spread: 50 });
  };

  const getDeviceIcon = (id: string) => {
    switch (id) {
      case 'watch':
        return <Watch className="w-6 h-6 text-amber-600" />;
      case 'vinyl':
        return <Disc className="w-6 h-6 text-slate-700 dark:text-slate-300" />;
      case 'wifi':
        return <Wifi className="w-6 h-6 text-sky-600" />;
      case 'sdcard':
        return <HardDrive className="w-6 h-6 text-rose-600" />;
      case 'laptop':
        return <Laptop className="w-6 h-6 text-indigo-600" />;
      default:
        return <Smartphone className="w-6 h-6 text-slate-600" />;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 md:p-6 shadow-xs my-6">
      {/* Activity 2 Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200/50">
            <Info className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            {bilingualMode === 'en' ? (
              <span>Activity 2: Digital vs Non-Digital Devices</span>
            ) : (
              <>
                <span>Hoạt động 2 Tương tác: Hình 1.2 SGK</span>
                <span className="text-slate-400">|</span>
                <span className="italic font-normal">Activity 2: Digital vs Non-Digital Devices</span>
              </>
            )}
          </span>
          <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 mt-1">
            {bilingualMode === 'en'
              ? 'Classify Digital Devices & Digital Counterparts'
              : 'Phân biệt Thiết bị số & Thiết bị số tương ứng'}
          </h3>
        </div>

        <button
          type="button"
          onClick={revealAll}
          className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-xs"
        >
          {bilingualMode === 'en' ? 'Reveal All Answers' : 'Hiện toàn bộ đáp án SGK'}
        </button>
      </div>

      {/* 5 Devices Grid from Hình 1.2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        {SECTION_3.activity2.devices.map((device) => {
          const isRevealed = revealedAnswers[device.id];
          const isSelected = selectedDevice === device.id;

          return (
            <div
              key={device.id}
              onClick={() => setSelectedDevice(device.id)}
              className={`cursor-pointer rounded-xl p-3 border-2 transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-sky-500 bg-sky-50/80 dark:bg-sky-950/40 shadow-xs ring-2 ring-sky-200 dark:ring-sky-900'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700/60">
                    {getDeviceIcon(device.id)}
                  </div>
                  {isRevealed && (
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        device.isDigital
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {device.isDigital
                        ? bilingualMode === 'en'
                          ? 'Digital'
                          : 'Thiết bị số'
                        : bilingualMode === 'en'
                        ? 'Non-digital'
                        : 'Không số'}
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100">
                  {bilingualMode === 'en' ? device.nameEn : device.nameVi}
                </h4>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleReveal(device.id);
                  }}
                  className="w-full text-center text-[11px] text-sky-600 dark:text-sky-400 font-semibold hover:underline"
                >
                  {isRevealed
                    ? bilingualMode === 'en'
                      ? 'Hide Details'
                      : 'Ẩn lời giải'
                    : bilingualMode === 'en'
                    ? 'Check Classification'
                    : 'Xem phân loại & Thiết bị số'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Device Deep-dive Card */}
      {(() => {
        const dev = SECTION_3.activity2.devices.find((d) => d.id === selectedDevice);
        if (!dev) return null;
        return (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 mb-6">
            <div className="flex items-center gap-2 mb-2">
              {getDeviceIcon(dev.id)}
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                {bilingualMode === 'en' ? dev.nameEn : dev.nameVi} —{' '}
                <span className={dev.isDigital ? 'text-emerald-600' : 'text-amber-600'}>
                  {dev.isDigital
                    ? bilingualMode === 'en'
                      ? 'Digital Device'
                      : 'Thiết bị số'
                    : bilingualMode === 'en'
                    ? 'Non-Digital Device (Analog/Mechanical)'
                    : 'Thiết bị cơ khí / Tương tự (Không dùng dữ liệu số)'}
                </span>
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-lg">
                <span className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  {bilingualMode === 'en' ? 'Characteristics:' : 'Đặc điểm bản chất:'}
                </span>
                <p className="text-slate-800 dark:text-slate-200">
                  {bilingualMode === 'en' ? dev.notesEn : dev.notesVi}
                </p>
              </div>

              <div className="bg-sky-50 dark:bg-sky-950/40 p-2.5 rounded-lg border border-sky-100 dark:border-sky-900/40">
                <span className="font-semibold text-sky-700 dark:text-sky-300 block mb-1">
                  {bilingualMode === 'en' ? 'Corresponding Digital Counterpart:' : 'Thiết bị số tương ứng hiện đại:'}
                </span>
                <p className="text-sky-900 dark:text-sky-200 font-medium">
                  {bilingualMode === 'en' ? dev.counterpartEn : dev.counterpartVi}
                </p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Library 2,000 Books Simulation Widget (Page 10 Review Question 2) */}
      <div className="bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl p-4 border border-emerald-200 dark:border-emerald-900">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
            {bilingualMode === 'en'
              ? 'Interactive Simulation: 2,000 Books Library Digitization vs 256 GB Memory Card'
              : 'Mô phỏng Tính toán Thực tế: Số hoá 2 000 Cuốn sách & Thẻ nhớ 256 GB'}
          </h4>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
          {bilingualMode === 'en'
            ? 'Adjust the sliders below to explore how digital capacity enables an entire school library to fit inside a fingernail-sized memory card.'
            : 'Kéo thanh trượt bên dưới để tự mình kiểm nghiệm bài toán trang 10 SGK: 2 000 cuốn sách có thực sự nằm gọn trong thẻ nhớ 256 GB không?'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {bilingualMode === 'en' ? 'Number of books:' : 'Số lượng cuốn sách:'}{' '}
              <span className="font-mono text-emerald-600">
                {bookCount.toLocaleString()} {bilingualMode === 'en' ? 'books' : 'cuốn'}
              </span>
            </label>
            <input
              type="range"
              min="500"
              max="10000"
              step="100"
              value={bookCount}
              onChange={(e) => setBookCount(parseInt(e.target.value))}
              className="w-full accent-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {bilingualMode === 'en' ? 'Average size per book:' : 'Dung lượng mỗi cuốn:'}{' '}
              <span className="font-mono text-emerald-600">{bookSizeMB} MB</span>
            </label>
            <input
              type="range"
              min="10"
              max="200"
              step="10"
              value={bookSizeMB}
              onChange={(e) => setBookSizeMB(parseInt(e.target.value))}
              className="w-full accent-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {bilingualMode === 'en' ? 'Memory Card Capacity:' : 'Dung lượng thẻ nhớ:'}{' '}
              <span className="font-mono text-emerald-600">{cardSizeGB} GB</span>
            </label>
            <input
              type="range"
              min="32"
              max="512"
              step="32"
              value={cardSizeGB}
              onChange={(e) => setCardSizeGB(parseInt(e.target.value))}
              className="w-full accent-emerald-600"
            />
          </div>
        </div>

        {/* Calculation output card */}
        <div className="bg-white dark:bg-slate-900 rounded-lg p-3.5 border border-slate-200 dark:border-slate-800 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="font-mono text-slate-700 dark:text-slate-300">
              {bilingualMode === 'en' ? 'Total size' : 'Tổng dung lượng'} = {bookCount.toLocaleString()} × {bookSizeMB} MB ={' '}
              <strong className="text-emerald-600">{totalRequiredMB.toLocaleString()} MB</strong> ≈{' '}
              <strong className="text-emerald-600 font-bold">
                {totalRequiredGB.toFixed(2)} GB
              </strong>
            </span>

            <span
              className={`font-bold px-2.5 py-1 rounded-full text-xs flex items-center gap-1 ${
                canFit
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
              }`}
            >
              {canFit ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
              {canFit
                ? bilingualMode === 'en'
                  ? `FITS EASILY! (Card holds up to ${maxPossibleBooks.toLocaleString()} books)`
                  : `CHỨA HOÀN TOÀN ĐƯỢC! (Thẻ nhớ chứa tối đa ${maxPossibleBooks.toLocaleString()} cuốn)`
                : bilingualMode === 'en'
                ? 'EXCEEDS CAPACITY'
                : 'VƯỢT QUÁ DUNG LƯỢNG THẺ'}
            </span>
          </div>

          <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div
              className={`h-2.5 rounded-full transition-all duration-300 ${
                canFit ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
              style={{ width: `${Math.min(100, (totalRequiredGB / cardSizeGB) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>0 GB</span>
            <span>
              {bilingualMode === 'en'
                ? `Using ${((totalRequiredGB / cardSizeGB) * 100).toFixed(1)}% of card capacity (${totalRequiredGB.toFixed(1)} GB / ${cardSizeGB} GB)`
                : `Sử dụng ${((totalRequiredGB / cardSizeGB) * 100).toFixed(1)}% dung lượng thẻ (${totalRequiredGB.toFixed(1)} GB / ${cardSizeGB} GB)`}
            </span>
            <span>{cardSizeGB} GB</span>
          </div>
        </div>
      </div>
    </div>
  );
};
