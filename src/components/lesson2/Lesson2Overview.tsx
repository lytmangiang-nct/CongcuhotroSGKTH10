import React from 'react';
import { Target, Sparkles, HelpCircle, CheckCircle2, Smartphone, Cpu, Globe, Award, ArrowRight } from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

export const Lesson2Overview: React.FC = () => {
  const { bilingualMode, setCurrentPage, setOriginalPageTarget, setShowOriginalModal } = useBook();

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Lesson Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-indigo-600 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider">
            Chủ đề 1 • Máy tính và xã hội tri thức
          </span>
          <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
            Bài 2 • Trang 11 SGK
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-2">
          Vai Trò Của Thiết Bị Thông Minh Và Tin Học Đối Với Xã Hội
        </h1>
        <p className="text-sm sm:text-base text-amber-100 font-medium italic mb-6 max-w-2xl">
          Role of Smart Devices and Informatics in Society • Grade 10 Informatics (KNTT)
        </p>

        {/* 4 Core Objectives */}
        <div className="bg-slate-950/40 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/20">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider mb-3">
            <Target className="w-4 h-4" />
            <span>Sau bài học này em sẽ:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                1
              </span>
              <span>Nhận biết được một số <strong>thiết bị thông minh</strong> thông dụng. Nêu được ví dụ cụ thể.</span>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                2
              </span>
              <span>Biết được vai trò của thiết bị thông minh trong xã hội và <strong>cuộc Cách mạng công nghiệp lần thứ tư (CMCN 4.0)</strong>.</span>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                3
              </span>
              <span>Biết <strong>vai trò của tin học</strong> đối với xã hội trong quản lí, tự động hóa, khoa học và đời sống.</span>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                4
              </span>
              <span>Biết các <strong>thành tựu nổi bật</strong> của ngành Tin học: Hệ điều hành, Internet/WWW, Ngôn ngữ bậc cao, Hệ CSDL.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Warm-up Scenario (Khởi động) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
              Khởi Động: Thế Nào Là Một &ldquo;Thiết Bị Thông Minh&rdquo;?
            </h2>
            <p className="text-xs text-slate-500">Khám phá khái niệm từ thực tế công nghệ hàng ngày</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-slate-800 dark:text-slate-200 text-sm leading-relaxed space-y-2">
          <BilingualText
            id="l2-warmup-p1"
            vi="Chúng ta từng được nghe rất nhiều thứ gắn với từ 'smart' như 'smart TV', 'smart phone', 'smart watch',... Đó là tên gọi của các thiết bị thông minh."
            en="We have heard many things associated with the word 'smart' such as 'smart TV', 'smart phone', 'smart watch',... Those are the names of smart devices."
          />
          <BilingualText
            id="l2-warmup-p2"
            vi="Máy tính xách tay (Laptop) có phải là thiết bị thông minh không? Chúng ta sẽ cùng tìm hiểu thiết bị thông minh và vai trò của chúng trong cuộc cách mạng công nghiệp lần thứ tư."
            en="Is a laptop a smart device? We will explore smart devices and their pivotal role in the fourth industrial revolution."
          />
        </div>

        {/* Quick interactive thought check */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center gap-3">
            <Smartphone className="w-8 h-8 text-indigo-600 shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-slate-900 dark:text-white">Smart Phone / TV</div>
              <div className="text-slate-500">Tự kết nối &amp; cài ứng dụng</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center gap-3">
            <Cpu className="w-8 h-8 text-amber-600 shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-slate-900 dark:text-white">Hệ Thống Tự Chủ</div>
              <div className="text-slate-500">Hoạt động không cần người can thiệp</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center gap-3">
            <Globe className="w-8 h-8 text-emerald-600 shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-slate-900 dark:text-white">Mạng IoT &amp; 4.0</div>
              <div className="text-slate-500">Kết nối thực - ảo trên diện rộng</div>
            </div>
          </div>
        </div>

        {/* Action Button: Go to Section 1 */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              setOriginalPageTarget(11);
              setShowOriginalModal(true);
            }}
            className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer"
          >
            Đối chiếu SGK Trang 11 gốc →
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <span>Bắt đầu Phần 1: Thiết bị thông minh</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
