import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Award,
  Printer,
  Share2,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Calendar,
  Download,
  FileText,
  Loader2,
  Check,
  Lock,
  ShieldAlert
} from 'lucide-react';
import { useBook } from '../context/BookContext';
import confetti from 'canvas-confetti';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

export const CertificateModal: React.FC = () => {
  const {
    currentLesson,
    showCertificateModal,
    setShowCertificateModal,
    certificate,
    activeProfile,
    getLessonQuizResult,
    isAllSectionsComplete,
    isCertificateEarned,
    completedSections,
    setShowQuizModal,
    bilingualMode
  } = useBook();

  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isExportingImage, setIsExportingImage] = useState<boolean>(false);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showCertificateModal && isCertificateEarned) {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 }
      });
    }
  }, [showCertificateModal, isCertificateEarned]);

  if (!showCertificateModal) return null;

  const savedQuizAttempt = getLessonQuizResult(currentLesson.id);

  // STRICT REQUIREMENT CHECK: Must have completed 100% sections AND scored >= 8/10 on the quiz
  if (!isCertificateEarned) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
        <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-3xl w-full max-w-lg p-6 sm:p-8 flex flex-col items-center text-center shadow-2xl border border-slate-200 dark:border-slate-800">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-2 border-amber-300 dark:border-amber-700 flex items-center justify-center shadow-md mb-4">
            <Lock className="w-8 h-8" />
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mb-2">
            {bilingualMode === 'en'
              ? 'Certificate Requirements Not Met'
              : `Chưa Đủ Điều Kiện Nhận Giấy Chứng Nhận`}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            {bilingualMode === 'en'
              ? `To receive the official Certificate of Completion for Lesson ${currentLesson.lessonNumber} (${currentLesson.titleEn}), you must fulfill both requirements below:`
              : `Để được cấp Giấy chứng nhận hoàn thành Bài ${currentLesson.lessonNumber} (${currentLesson.titleVi}), em cần hoàn thành đủ cả 2 điều kiện sau:`}
          </p>

          {/* 2 Requirements Checklist */}
          <div className="w-full space-y-3 text-left bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs mb-6">
            <div className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 ${
                isAllSectionsComplete ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
              }`}>
                {isAllSectionsComplete ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '1'}
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                  <span>{bilingualMode === 'en' ? '1. Complete all sections of the lesson' : '1. Hoàn thành 100% các phần bài học'}</span>
                  <span className={`font-mono text-[11px] ${isAllSectionsComplete ? 'text-emerald-600 font-bold' : 'text-amber-600'}`}>
                    {completedSections.length}/{currentLesson.sections.length}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {isAllSectionsComplete
                    ? (bilingualMode === 'en' ? 'Completed all sections ✓' : 'Đã học đủ tất cả các phần bài học ✓')
                    : (bilingualMode === 'en' ? `Missing ${currentLesson.sections.length - completedSections.length} sections` : `Còn ${currentLesson.sections.length - completedSections.length} phần chưa hoàn thành`)}
                </p>
              </div>
            </div>

            <div className="pt-2.5 border-t border-slate-200 dark:border-slate-700 flex items-start gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 ${
                savedQuizAttempt && savedQuizAttempt.score >= 8 ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
              }`}>
                {savedQuizAttempt && savedQuizAttempt.score >= 8 ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '2'}
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                  <span>{bilingualMode === 'en' ? '2. Score at least 8/10 on the quiz' : '2. Đạt từ 8/10 điểm trắc nghiệm 10 câu'}</span>
                  <span className={`font-mono text-[11px] ${savedQuizAttempt && savedQuizAttempt.score >= 8 ? 'text-emerald-600 font-bold' : 'text-amber-600'}`}>
                    {savedQuizAttempt ? `${savedQuizAttempt.score}/${savedQuizAttempt.totalQuestions}` : (bilingualMode === 'en' ? 'Not taken' : 'Chưa thi')}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {savedQuizAttempt && savedQuizAttempt.score >= 8
                    ? (bilingualMode === 'en' ? 'Score requirement passed ✓' : 'Đã đạt điều kiện điểm số trắc nghiệm ✓')
                    : savedQuizAttempt
                    ? (bilingualMode === 'en'
                        ? `Current score ${savedQuizAttempt.score}/${savedQuizAttempt.totalQuestions} — score ≥ 8/10 required to earn certificate`
                        : `Điểm hiện tại ${savedQuizAttempt.score}/${savedQuizAttempt.totalQuestions} — cần đạt từ 8/10 trở lên để cấp chứng chỉ`)
                    : (bilingualMode === 'en' ? 'Need score ≥ 8/10 in 10-question assessment' : 'Cần đạt từ 8/10 điểm trở lên trong bài trắc nghiệm 10 câu')}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
            {isAllSectionsComplete ? (
              <button
                type="button"
                onClick={() => {
                  setShowCertificateModal(false);
                  setShowQuizModal(true);
                }}
                className="w-full sm:flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{bilingualMode === 'en' ? 'Take 10-Question Quiz' : 'Làm bài kiểm tra 10 câu (Quiz)'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowCertificateModal(false)}
                className="w-full sm:flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
              >
                <span>{bilingualMode === 'en' ? 'Continue Lesson' : 'Tiếp tục học bài để mở khóa'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowCertificateModal(false)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold cursor-pointer transition-colors"
            >
              {bilingualMode === 'en' ? 'Close' : 'Đóng'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!certificate) return null;

  const studentName = certificate.studentName;
  const learnerId = certificate.learnerId;
  const lessonCode = certificate.lessonCode;
  const currentScore = certificate.score;
  const certId = certificate.certId;
  const issueDate = certificate.date;
  const recipientRoleLabel =
    certificate.role === 'teacher'
      ? bilingualMode === 'en'
        ? 'teacher'
        : 'giáo viên'
      : bilingualMode === 'en'
      ? 'student'
      : 'học sinh';

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const getCleanFileName = (ext: string) => {
    const safeName = studentName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .replace(/[^a-zA-Z0-9]/g, '_')
      .replace(/_+/g, '_');
    return `Giay_Chung_Nhan_${safeName || 'HocSinh'}_TinHoc10_Bai${currentLesson.lessonNumber}.${ext}`;
  };

  // Export high-resolution PNG image
  const handleExportImage = async () => {
    if (!certificateRef.current || isExportingImage) return;
    try {
      setIsExportingImage(true);
      if (document.fonts) {
        await document.fonts.ready;
      }
      await new Promise((r) => setTimeout(r, 100));

      const dataUrl = await toPng(certificateRef.current, {
        quality: 1,
        pixelRatio: 2.5,
        cacheBust: true
      });

      const downloadLink = document.createElement('a');
      downloadLink.href = dataUrl;
      downloadLink.download = getCleanFileName('png');
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();

      showNotification(bilingualMode === 'en' ? 'Certificate image (PNG) exported and downloaded successfully!' : 'Đã xuất và tải thành công file ảnh Giấy chứng nhận (PNG)!');
    } catch (err) {
      console.error('Lỗi khi xuất ảnh chứng nhận:', err);
      showNotification(bilingualMode === 'en' ? 'Error generating image. You can use the Print button to save as PDF.' : 'Có lỗi khi tạo ảnh. Bạn có thể bấm nút In để lưu PDF.');
    } finally {
      setIsExportingImage(false);
    }
  };

  // Export Landscape A4 PDF
  const handleExportPdf = async () => {
    if (!certificateRef.current || isExportingPdf) return;
    try {
      setIsExportingPdf(true);
      if (document.fonts) {
        await document.fonts.ready;
      }
      await new Promise((r) => setTimeout(r, 100));

      const dataUrl = await toPng(certificateRef.current, {
        quality: 1,
        pixelRatio: 2,
        cacheBust: true
      });

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const margin = 10;
      const printableWidth = pdfWidth - margin * 2;
      const printableHeight = pdfHeight - margin * 2;

      const imgProps = pdf.getImageProperties(dataUrl);
      const imgRatio = imgProps.width / imgProps.height;

      let renderWidth = printableWidth;
      let renderHeight = renderWidth / imgRatio;

      if (renderHeight > printableHeight) {
        renderHeight = printableHeight;
        renderWidth = renderHeight * imgRatio;
      }

      const xPos = margin + (printableWidth - renderWidth) / 2;
      const yPos = margin + (printableHeight - renderHeight) / 2;

      pdf.addImage(dataUrl, 'PNG', xPos, yPos, renderWidth, renderHeight, undefined, 'FAST');
      pdf.save(getCleanFileName('pdf'));

      showNotification(bilingualMode === 'en' ? 'Landscape A4 Certificate PDF exported and downloaded successfully!' : 'Đã xuất và tải thành công file PDF Giấy chứng nhận khổ A4!');
    } catch (err) {
      console.error('Lỗi khi xuất PDF chứng nhận:', err);
      showNotification(bilingualMode === 'en' ? 'Error generating PDF file. You can use the Print button to save.' : 'Có lỗi khi tạo file PDF. Bạn có thể sử dụng nút In để lưu.');
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        bilingualMode === 'en'
          ? `Congratulations ${studentName} on successfully completing Lesson ${currentLesson.lessonNumber} (${currentLesson.titleEn}) Grade 10 Informatics with a score of ${currentScore}/10! Certificate ID: ${certId}`
          : `Chúc mừng ${studentName} đã xuất sắc hoàn thành Bài ${currentLesson.lessonNumber} (${currentLesson.titleVi}) Tin học 10 KNTT với điểm số ${currentScore}/10! Mã chứng nhận: ${certId}`
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
      showNotification(bilingualMode === 'en' ? 'Copied congratulation message and certificate ID to clipboard!' : 'Đã sao chép lời chúc mừng và mã chứng nhận vào bộ nhớ tạm!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-3xl w-full max-w-4xl max-h-[96vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Top Control Bar (Hidden when printing) */}
        <div className="print:hidden p-3 sm:p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-sm">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
                {bilingualMode === 'en' ? 'Certificate of Lesson Completion' : 'Giấy Chứng Nhận Hoàn Thành Bài Học'}
              </h3>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                {bilingualMode === 'en'
                  ? `Lesson ${currentLesson.lessonNumber}: ${currentLesson.titleEn} • Informatics 10`
                  : `Bài ${currentLesson.lessonNumber}: ${currentLesson.titleVi} • Tin học 10 KNTT`}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {/* Export PNG */}
            <button
              type="button"
              onClick={handleExportImage}
              disabled={isExportingImage || isExportingPdf}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
              title={bilingualMode === 'en' ? 'Download high-resolution image (PNG)' : 'Tải về file ảnh chất lượng cao (PNG)'}
            >
              {isExportingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              <span>{bilingualMode === 'en' ? 'Download PNG' : 'Tải file Ảnh (PNG)'}</span>
            </button>

            {/* Export PDF */}
            <button
              type="button"
              onClick={handleExportPdf}
              disabled={isExportingImage || isExportingPdf}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
              title={bilingualMode === 'en' ? 'Download printable A4 PDF' : 'Tải về file văn bản PDF khổ ngang A4'}
            >
              {isExportingPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
              <span>{bilingualMode === 'en' ? 'Download PDF' : 'Tải file PDF'}</span>
            </button>

            {/* Print */}
            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
              title={bilingualMode === 'en' ? 'Print Certificate' : 'In chứng nhận bằng máy in'}
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">{bilingualMode === 'en' ? 'Print' : 'In'}</span>
            </button>

            {/* Share */}
            <button
              type="button"
              onClick={handleShare}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title={bilingualMode === 'en' ? 'Copy congratulations and certificate ID' : 'Sao chép lời chúc mừng và mã chứng nhận'}
            >
              {copiedLink ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden md:inline">{copiedLink ? (bilingualMode === 'en' ? 'Copied!' : 'Đã sao chép!') : (bilingualMode === 'en' ? 'Share' : 'Chia sẻ')}</span>
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={() => setShowCertificateModal(false)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title={bilingualMode === 'en' ? 'Close (Esc)' : 'Đóng (Esc)'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notification Toast */}
        {toastMessage && (
          <div className="print:hidden bg-emerald-50 dark:bg-emerald-950/80 border-b border-emerald-200 dark:border-emerald-800 px-4 py-2 flex items-center justify-between text-xs text-emerald-900 dark:text-emerald-200 animate-in fade-in">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="font-semibold">{toastMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline"
            >
              {bilingualMode === 'en' ? 'Close' : 'Đóng'}
            </button>
          </div>
        )}

        {/* Scrollable Certificate Preview Canvas */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100 dark:bg-slate-950 flex justify-center items-center">
          
          {/* Printable & Exportable Certificate Frame (The beloved classic design, completely perfected) */}
          <div
            ref={certificateRef}
            id="official-certificate"
            className="w-full max-w-3xl bg-gradient-to-br from-amber-50/50 via-white to-orange-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-850 p-6 sm:p-10 rounded-2xl border-8 border-double border-amber-600/70 dark:border-amber-500/50 shadow-2xl relative text-center text-slate-800 dark:text-slate-100 overflow-hidden"
          >
            {/* Ornate Corner Accents */}
            <div className="absolute top-2 left-2 w-10 h-10 border-t-2 border-l-2 border-amber-600 pointer-events-none" />
            <div className="absolute top-2 right-2 w-10 h-10 border-t-2 border-r-2 border-amber-600 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-10 h-10 border-b-2 border-l-2 border-amber-600 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-10 h-10 border-b-2 border-r-2 border-amber-600 pointer-events-none" />

            {/* Background Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none">
              <ShieldCheck className="w-96 h-96" />
            </div>

            {/* Header: Organization & Curriculum */}
            <div className="space-y-1 mb-4 border-b border-amber-200 dark:border-slate-800 pb-3">
              <div className="text-[11px] sm:text-xs font-black tracking-widest text-slate-600 dark:text-slate-400 uppercase">
                {bilingualMode === 'en'
                  ? 'MINISTRY OF EDUCATION AND TRAINING • 2018 GENERAL EDUCATION CURRICULUM'
                  : 'BỘ GIÁO DỤC VÀ ĐÀO TẠO • CHƯƠNG TRÌNH GDPT 2018'}
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">
                {bilingualMode === 'en'
                  ? 'SERIES: CONNECTING KNOWLEDGE WITH LIFE — VIETNAM EDUCATION PUBLISHING HOUSE'
                  : 'BỘ SÁCH: KẾT NỐI TRI THỨC VỚI CUỘC SỐNG — NHÀ XUẤT BẢN GIÁO DỤC VIỆT NAM'}
              </div>
            </div>

            {/* Certificate Title */}
            <div className="my-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-widest mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                {bilingualMode === 'en'
                  ? 'SMART TEXTBOOK ASSISTANT SYSTEM'
                  : 'HỆ THỐNG TRỢ LÍ SÁCH GIÁO KHOA THÔNG MINH'}
              </div>
              <h1 className="text-2xl sm:text-4xl font-serif font-black tracking-wide text-amber-700 dark:text-amber-400 uppercase drop-shadow-xs">
                {bilingualMode === 'en' ? 'CERTIFICATE OF COMPLETION' : 'GIẤY CHỨNG NHẬN'}
              </h1>
              <p className="text-xs sm:text-sm font-sans uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                CERTIFICATE OF COMPLETION &amp; MASTERY
              </p>
            </div>

            {/* Congratulation statement */}
            <p className="text-xs sm:text-sm italic text-slate-600 dark:text-slate-400 mt-2">
              {bilingualMode === 'en'
                ? `Certifies that ${recipientRoleLabel} has successfully completed 100% of the textbook learning curriculum and exercises:`
                : `Chứng nhận ${recipientRoleLabel} đã hoàn thành đủ 100% nội dung học tập và bài tập chuẩn SGK:`}
            </p>

            {/* Locked Profile Recipient Name (Read-only) */}
            <div className="my-3 flex flex-col items-center gap-1.5">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white underline decoration-amber-500 decoration-2 underline-offset-8">
                {studentName}
              </h2>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                <Lock className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                <span>
                  {bilingualMode === 'en' ? 'Profile ID:' : 'Mã người học:'}{' '}
                  <strong className="text-slate-700 dark:text-slate-200">{learnerId}</strong>
                  {activeProfile?.learnerId === learnerId ? '' : ''}
                </span>
              </div>
            </div>

            {/* Achievement details */}
            <div className="max-w-2xl mx-auto space-y-2 mt-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                {bilingualMode === 'en' ? (
                  <>
                    Successfully studied and mastered <strong>all {currentLesson.sections.length} curriculum sections</strong> and passed the 10-question assessment in:
                  </>
                ) : (
                  <>
                    Đã học và hoàn thành xuất sắc <strong>toàn bộ {currentLesson.sections.length} phần kiến thức</strong>, vượt qua bài kiểm tra đánh giá năng lực 10 câu trắc nghiệm thuộc:
                  </>
                )}
              </p>
              <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-slate-800/80 border border-amber-200 dark:border-amber-900/40">
                <div className="text-base sm:text-lg font-black text-indigo-900 dark:text-indigo-200 uppercase">
                  {bilingualMode === 'en'
                    ? (currentLesson.titleEn ? `LESSON ${currentLesson.lessonNumber}: ${currentLesson.titleEn}` : currentLesson.certTitle)
                    : (currentLesson.certTitle || `BÀI ${currentLesson.lessonNumber}: ${currentLesson.titleVi}`)}
                </div>
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  {bilingualMode === 'en'
                    ? `Topic ${currentLesson.topicNumber} • Grade 10 Informatics (Connecting Knowledge With Life)`
                    : (currentLesson.certSub || 'Chủ đề 1: Máy tính và xã hội tri thức • Tin học lớp 10 (Bộ Kết nối tri thức với cuộc sống)')}
                </div>
              </div>
            </div>

            {/* Score & Evaluation Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 my-5">
              <div className="px-4 py-2 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-400">
                    {bilingualMode === 'en' ? 'Quiz Score:' : 'Điểm Trắc Nghiệm:'}
                  </div>
                  <div className="text-sm font-black text-emerald-900 dark:text-emerald-200">
                    {bilingualMode === 'en'
                      ? `${currentScore} / 10 Points (${currentScore * 10}%)`
                      : `${currentScore} / 10 Điểm (${currentScore * 10}%)`}
                  </div>
                </div>
              </div>

              <div className="px-4 py-2 rounded-xl bg-amber-100/80 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-400">
                    {bilingualMode === 'en' ? 'Achievement Rating:' : 'Xếp Loại Đạt Được:'}
                  </div>
                  <div className="text-sm font-black text-amber-900 dark:text-amber-200">
                    {bilingualMode === 'en'
                      ? (currentScore >= 9 ? 'DISTINCTION' : 'MERIT / PASSED')
                      : (currentScore >= 9 ? 'XUẤT SẮC' : 'GIỎI / ĐẠT CHUẨN')}
                  </div>
                </div>
              </div>
            </div>

            {/* Signature, Stamp & Official Verification */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-amber-200 dark:border-slate-800 text-xs">
              <div className="text-left space-y-1">
                <div className="text-[11px] font-mono text-slate-500">
                  {bilingualMode === 'en' ? 'Certificate ID:' : 'Mã chứng nhận:'} <strong className="text-slate-800 dark:text-slate-200">{certId}</strong>
                </div>
                <div className="text-[11px] font-mono text-slate-500">
                  {bilingualMode === 'en' ? 'Lesson Code:' : 'Mã bài học:'} <strong className="text-slate-800 dark:text-slate-200">{lessonCode}</strong>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{bilingualMode === 'en' ? 'Issue Date:' : 'Ngày cấp:'} {issueDate}</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  {bilingualMode === 'en' ? 'Practice record issued on browser textbook companion' : 'Chứng chỉ luyện tập trên sách số hóa trình duyệt'}
                </div>
              </div>

              <div className="text-right flex flex-col items-end">
                <div className="relative">
                  {/* Digital Red Stamp */}
                  <div className="w-24 h-24 rounded-full border-2 border-rose-600 border-dashed p-1 flex flex-col items-center justify-center text-rose-600 transform -rotate-12 select-none shadow-xs">
                    <div className="text-[7px] font-black uppercase text-center leading-tight">
                      {bilingualMode === 'en' ? 'INFORMATICS 10' : 'SGK TIN HỌC 10'}
                    </div>
                    <ShieldCheck className="w-6 h-6 my-0.5 text-rose-600" />
                    <div className="text-[8px] font-black uppercase tracking-wider">
                      {bilingualMode === 'en' ? 'PRACTICE' : 'LUYỆN TẬP'}
                    </div>
                    <div className="text-[6px] font-bold">{bilingualMode === 'en' ? 'MOET • CURRICULUM 2018' : 'KNTT • GDPT 2018'}</div>
                  </div>
                </div>
                <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400 mt-1">
                  {bilingualMode === 'en' ? 'Informatics 10 Companion' : 'Hệ thống SGK Tin học 10'}
                </div>
              </div>
            </div>

            {/* Transparent Practice Mode Disclaimer inside exported Certificate */}
            <div className="mt-4 pt-3 border-t border-amber-200/70 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed text-center">
              {bilingualMode === 'en'
                ? 'Practice Mode Notice: This certificate reflects browser-local practice results. Official tamper-proof certification requires authenticated accounts and server-side grading.'
                : 'Lưu ý: Đây là chứng chỉ ghi nhận kết quả luyện tập trên trình duyệt; dữ liệu trình duyệt có thể bị chỉnh sửa hoặc xóa. Chứng chỉ chính thức không thể giả mạo cần tài khoản đăng nhập và chấm/lưu trên máy chủ.'}
            </div>

          </div>

        </div>

        {/* Bottom Helper Bar (Hidden when printing) */}
        <div className="print:hidden p-3.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400 shrink-0">
          <div className="flex items-center gap-2 max-w-xl">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              {bilingualMode === 'en' ? (
                <>
                  Practice certificate locked to <strong>{studentName}</strong> ({learnerId}). Name cannot be edited here — use <strong>Profile → Start Over</strong> to switch user.
                </>
              ) : (
                <>
                  Chứng chỉ luyện tập khóa theo hồ sơ <strong>{studentName}</strong> ({learnerId}). Không cho sửa tên tại đây — dùng <strong>Hồ sơ → Học lại từ đầu</strong> để đổi người dùng.
                </>
              )}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportImage}
              disabled={isExportingImage || isExportingPdf}
              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold cursor-pointer flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              {isExportingImage ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
              <span>{bilingualMode === 'en' ? 'Download PNG' : 'Tải file Ảnh (PNG)'}</span>
            </button>

            <button
              type="button"
              onClick={handleExportPdf}
              disabled={isExportingImage || isExportingPdf}
              className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold cursor-pointer flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              {isExportingPdf ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileText className="w-3.5 h-3.5" />}
              <span>{bilingualMode === 'en' ? 'Download PDF' : 'Tải file PDF'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
