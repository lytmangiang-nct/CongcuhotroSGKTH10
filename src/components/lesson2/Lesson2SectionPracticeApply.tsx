import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  HelpCircle,
  Eye,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Award,
  Lock,
  Car,
  Camera,
  FileSpreadsheet,
  FileText
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

export const Lesson2SectionPracticeApply: React.FC = () => {
  const {
    isAllSectionsComplete,
    setShowQuizModal,
    setShowCertificateModal,
    certificate,
    isCertificateEarned,
    bilingualMode,
    currentLesson,
    completedSections,
    setOriginalPageTarget,
    setShowOriginalModal
  } = useBook();

  const [openPractice, setOpenPractice] = useState<Record<number, boolean>>({ 1: true, 2: false });
  const [openApply, setOpenApply] = useState<Record<number, boolean>>({ 1: true, 2: false });

  const togglePractice = (idx: number) => {
    setOpenPractice((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleApply = (idx: number) => {
    setOpenApply((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
          <span className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 font-black text-xs uppercase tracking-wider">
            Luyện tập &amp; Vận dụng • Trang 15 SGK
          </span>
          <button
            type="button"
            onClick={() => {
              setOriginalPageTarget(15);
              setShowOriginalModal(true);
            }}
            className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Xem trang 15 gốc</span>
          </button>
        </div>

        <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Luyện Tập &amp; Vận Dụng Kiến Thức Bài 2
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Thiết bị nhận dạng hình ảnh, phần mềm tin học văn phòng, camera giao thông AI &amp; xe tự hành CMCN 4.0
        </p>
      </div>

      {/* Phần 1: Luyện tập (2 Câu hỏi) */}
      <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 text-rose-600 dark:text-rose-400">
          <GraduationCap className="w-6 h-6" />
          <h3 className="font-extrabold text-base sm:text-lg">
            A. BÀI TẬP LUYỆN TẬP (TRANG 15 SGK)
          </h3>
        </div>

        {/* Luyện tập 1 */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 overflow-hidden">
          <div
            onClick={() => togglePractice(1)}
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-100/70 dark:hover:bg-slate-800/80 transition-colors"
          >
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-lg bg-rose-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                1
              </span>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Thiết bị thông minh nào có thể nhận dạng được hình ảnh?
                </h4>
                <div className="text-[11px] text-slate-500 italic mt-0.5">
                  Which smart devices can recognize images?
                </div>
              </div>
            </div>
            {openPractice[1] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </div>

          {openPractice[1] && (
            <div className="p-4 pt-0 border-t border-slate-200/60 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
              <p className="font-semibold text-emerald-700 dark:text-emerald-400">
                ✓ Hướng dẫn giải chi tiết chuẩn SGK:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Điện thoại thông minh (Smartphone):</strong> Nhận dạng khuôn mặt (Face ID) để mở khóa máy, quét mã QR thanh toán, tìm kiếm thông tin bằng hình ảnh (Google Lens), nhận diện nụ cười khi chụp ảnh.
                </li>
                <li>
                  <strong>Camera an ninh AI thông minh:</strong> Tự động nhận diện biển số xe ô tô, xe máy; phát hiện người lạ đột nhập hoặc theo dõi hành vi đáng ngờ.
                </li>
                <li>
                  <strong>Xe tự hành (Self-driving cars):</strong> Camera và cảm biến AI nhận dạng biển báo giao thông, vạch kẻ đường, người đi bộ và chướng ngại vật để điều hướng an toàn.
                </li>
                <li>
                  <strong>Robot thông minh:</strong> Nhận dạng hình ảnh môi trường để tự động tránh vật cản và lập bản đồ di chuyển trong phòng.
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Luyện tập 2 */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 overflow-hidden">
          <div
            onClick={() => togglePractice(2)}
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-100/70 dark:hover:bg-slate-800/80 transition-colors"
          >
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-lg bg-rose-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                2
              </span>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Các phần mềm tin học văn phòng đã trở thành các phần mềm được dùng nhiều nhất. Em hãy nêu tác dụng của các phần mềm tin học văn phòng.
                </h4>
                <div className="text-[11px] text-slate-500 italic mt-0.5">
                  Explain the utility and impact of office productivity software suites.
                </div>
              </div>
            </div>
            {openPractice[2] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </div>

          {openPractice[2] && (
            <div className="p-4 pt-0 border-t border-slate-200/60 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
              <p className="font-semibold text-emerald-700 dark:text-emerald-400">
                ✓ Hướng dẫn giải chi tiết chuẩn SGK:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
                  <div className="font-bold text-blue-900 dark:text-blue-200 text-xs flex items-center gap-1.5 mb-1">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Soạn thảo (Word, Docs)</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    Tạo văn bản, công văn, hợp đồng, tài liệu, giáo án nhanh chóng, định dạng đẹp mắt, kiểm tra chính tả.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                  <div className="font-bold text-emerald-900 dark:text-emerald-200 text-xs flex items-center gap-1.5 mb-1">
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>Bảng tính (Excel, Sheets)</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    Xử lí số liệu, tính điểm trung bình, bảng lương, báo cáo tài chính và trực quan hóa qua biểu đồ.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                  <div className="font-bold text-amber-900 dark:text-amber-200 text-xs flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Trình chiếu (PowerPoint)</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    Thiết kế bài giảng điện tử, bài thuyết trình hội thảo trực quan, sinh động với hình ảnh và âm thanh.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Phần 2: Vận dụng (2 Bài tập mở rộng) */}
      <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400">
          <Sparkles className="w-6 h-6" />
          <h3 className="font-extrabold text-base sm:text-lg">
            B. BÀI TẬP VẬN DỤNG THỰC TẾ (TRANG 15 SGK)
          </h3>
        </div>

        {/* Vận dụng 1: Camera giao thông thông minh */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 overflow-hidden">
          <div
            onClick={() => toggleApply(1)}
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-100/70 dark:hover:bg-slate-800/80 transition-colors"
          >
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                1
              </span>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Tìm hiểu cách kết nối và lợi ích của hệ thống giám sát giao thông bằng camera thông minh
                </h4>
                <div className="text-[11px] text-slate-500 italic mt-0.5">
                  AI traffic monitoring cameras: connectivity and city benefits
                </div>
              </div>
            </div>
            {openApply[1] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </div>

          {openApply[1] && (
            <div className="p-4 pt-0 border-t border-slate-200/60 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
              <p>
                <strong>Cách kết nối:</strong> Các camera AI gắn trên cột đèn giao thông được kết nối qua cáp quang hoặc mạng di động 4G/5G truyền dữ liệu về <em>Trung tâm điều hành thông minh đô thị (IOC)</em>.
              </p>
              <p>
                <strong>Lợi ích vượt trội:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Tự động ghi hình và phạt nguội các lỗi vi phạm (vượt đèn đỏ, lấn làn, quá tốc độ).</li>
                <li>Đo đếm lưu lượng phương tiện theo thời gian thực để tự động điều chỉnh chu kỳ đèn xanh/đèn đỏ, giảm ùn tắc giờ cao điểm.</li>
                <li>Giảm áp lực trực chiến cho cảnh sát giao thông và nâng cao ý thức tuân thủ pháp luật của người dân.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Vận dụng 2: Xe tự hành trong CMCN 4.0 */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 overflow-hidden">
          <div
            onClick={() => toggleApply(2)}
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-100/70 dark:hover:bg-slate-800/80 transition-colors"
          >
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                2
              </span>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Lợi ích của xe tự hành: Hạn chế ô nhiễm, giảm ùn tắc và giảm chi phí đi lại
                </h4>
                <div className="text-[11px] text-slate-500 italic mt-0.5">
                  Autonomous vehicles: emission reduction, traffic optimization and cost savings
                </div>
              </div>
            </div>
            {openApply[2] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </div>

          {openApply[2] && (
            <div className="p-4 pt-0 border-t border-slate-200/60 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Hạn chế ô nhiễm môi trường:</strong> Đa phần xe tự hành chạy bằng động cơ điện (EV). Phần mềm tự động tính toán cung đường ngắn nhất và tốc độ tối ưu, giảm hao phí năng lượng và không xả khí thải độc hại.
                </li>
                <li>
                  <strong>Giảm ùn tắc và tai nạn:</strong> Xe tự hành giao tiếp với nhau (V2X) và hệ thống đèn giao thông, giữ cự ly an toàn chuẩn xác từng milimet, loại bỏ 94% các vụ tai nạn do lỗi con người (ngủ gật, phóng nhanh vượt ẩu, say rượu).
                </li>
                <li>
                  <strong>Giảm chi phí đi lại:</strong> Người dân không cần bỏ hàng trăm triệu mua xe cá nhân, không lo phí gửi xe hay sửa chữa. Khi cần di chuyển chỉ cần gọi xe tự hành qua ứng dụng Internet, chi phí chia sẻ rẻ hơn nhiều lần.
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>


    </div>
  );
};
