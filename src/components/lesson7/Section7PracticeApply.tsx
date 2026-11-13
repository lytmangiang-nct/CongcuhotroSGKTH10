import React, { useState } from 'react';
import {
  Award,
  Volume2,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Camera,
  FolderOpen,
  Trash2,
  Usb,
  Cloud,
  Video,
  Check,
  X,
  Lightbulb,
  Info,
  Compass
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section7PracticeApply: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    prevPage,
    setOriginalPageTarget,
    setShowOriginalModal,
    setShowQuizModal,
    setShowCertificateModal,
    certificate,
    isCertificateEarned,
    isAllSectionsComplete,
    currentLesson,
    completedSections
  } = useBook();

  // Practice 1 State (MCQ)
  const [p1Answer, setP1Answer] = useState<string | null>(null);
  const [showP1Solution, setShowP1Solution] = useState<boolean>(false);

  // Practice 2 Interactive Step-by-Step State
  const [p2Step, setP2Step] = useState<number>(1); // 1: Shoot photo, 2: Find file, 3: View photo, 4: Delete photo
  const [hasPhoto, setHasPhoto] = useState<boolean>(false);

  // Application Solution Toggles
  const [showApp1Solution, setShowApp1Solution] = useState<boolean>(false);
  const [showApp2Solution, setShowApp2Solution] = useState<boolean>(false);
  const [showApp3Solution, setShowApp3Solution] = useState<boolean>(false);

  const speechVi =
    'Phần Luyện tập và Vận dụng Bài 7. Luyện tập 1: Điểm khác biệt của điện thoại thông minh là có hệ điều hành và chạy được nhiều ứng dụng phong phú. Luyện tập 2: Quy trình chụp ảnh, mở trình quản lý tệp, xem ảnh trong thư mục DCIM Camera và xoá ảnh. Vận dụng 1: Kết nối USB sang máy tính. Vận dụng 2: Lưu trữ đám mây. Vận dụng 3: Gửi ảnh qua phần mềm học trực tuyến Zoom.';

  const speechEn =
    'Lesson 7 Practice and Application. Practice 1: Smartphones are fundamentally distinguished by operating systems executing diverse applications. Practice 2: Camera capture, DCIM/Camera file browsing, preview, and deletion workflow. Application 1: USB file transfer to PC. Application 2: Cloud storage synchronization. Application 3: File sharing in Zoom online classes.';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(bilingualMode === 'en' ? speechEn : speechVi);
    }
  };

  const handleCapturePhoto = () => {
    setHasPhoto(true);
    setP2Step(2);
  };

  const handleDeletePhoto = () => {
    setHasPhoto(false);
    setP2Step(4);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300">
              {bilingualMode === 'en' ? 'Section 5 • Practice & Apply' : 'Mục 5 • Luyện tập & Vận dụng'}
            </span>
            <span className="text-xs text-slate-500 font-mono">SGK Trang 37</span>
            <button
              type="button"
              onClick={() => {
                setOriginalPageTarget(37);
                setShowOriginalModal(true);
              }}
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>{bilingualMode === 'en' ? 'Page 37 Scan' : 'Bản quét Tr. 37'}</span>
            </button>
          </div>
          <h2
            data-en="Practice, Real-World Application & Competency Evaluation"
            data-vi="Luyện tập, Vận dụng thực tế & Đánh giá năng lực Bài 7"
            className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100"
          >
            <BilingualText
              vi="Luyện tập, Vận dụng thực tế & Đánh giá năng lực Bài 7"
              en="Practice, Real-World Application & Competency Evaluation"
            />
          </h2>
        </div>
      </div>

      {/* Practice 1: Smartphone vs Feature phone (Luyện tập 1 SGK Trang 37) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded">
                  {bilingualMode === 'en' ? 'Practice 1' : 'Luyện tập 1'}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {bilingualMode === 'en' ? 'Textbook Page 37' : 'SGK Trang 37'}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                <BilingualText
                  vi="Điện thoại thông minh khác với điện thoại di động thường ở điểm nào?"
                  en="How does a smartphone differ from a conventional mobile phone?"
                />
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowP1Solution(!showP1Solution)}
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            {showP1Solution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showP1Solution ? (bilingualMode === 'en' ? 'Hide Solution' : 'Ẩn lời giải') : (bilingualMode === 'en' ? 'Show Solution' : 'Xem lời giải SGK')}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {[
            {
              id: 'A',
              textVi: 'A. Có danh bạ.',
              textEn: 'A. Has a contact directory.',
              correct: false
            },
            {
              id: 'B',
              textVi: 'B. Có thể nhắn tin.',
              textEn: 'B. Can send text messages.',
              correct: false
            },
            {
              id: 'C',
              textVi: 'C. Có thể kết nối Internet.',
              textEn: 'C. Can connect to the Internet.',
              correct: false
            },
            {
              id: 'D',
              textVi: 'D. Có hệ điều hành và có thể chạy được một số ứng dụng.',
              textEn: 'D. Has an operating system and can run diverse user applications.',
              correct: true
            }
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                setP1Answer(opt.id);
                setShowP1Solution(true);
              }}
              className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${
                p1Answer === opt.id
                  ? opt.correct
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-amber-400 text-slate-800 dark:text-slate-200'
              }`}
            >
              <span>{bilingualMode === 'en' ? opt.textEn : opt.textVi}</span>
            </button>
          ))}
        </div>

        {showP1Solution && p1Answer === 'D' && (
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 space-y-1.5 animate-in fade-in">
            <div className="font-bold text-amber-900 dark:text-amber-300">
              <BilingualText vi="Giải thích chuẩn SGK (Đáp án D):" en="Official Textbook Explanation (Option D):" />
            </div>
            <p className="leading-relaxed">
              <BilingualText
                vi="Cả điện thoại thường và điện thoại thông minh đều có danh bạ, gửi được tin nhắn và một số dòng máy đời sau có thể kết nối Internet cơ bản. Tuy nhiên, điểm khác biệt mang tính bản chất nhất là điện thoại thông minh có một hệ điều hành hoàn chỉnh (như Android, iOS) và cho phép người dùng tự do cài đặt thêm vô số phần mềm ứng dụng từ kho ứng dụng trực tuyến."
                en="Both basic phones and smartphones manage contacts and messaging. However, the fundamental differentiator is that smartphones possess a robust mobile operating system capable of executing installable third-party applications."
              />
            </p>
          </div>
        )}
      </div>

      {/* Practice 2: Capture, Browse & Delete Workflow (Luyện tập 2 SGK Trang 37) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 px-2 py-0.5 rounded">
                {bilingualMode === 'en' ? 'Practice 2' : 'Luyện tập 2'}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {bilingualMode === 'en' ? 'Textbook Page 37' : 'SGK Trang 37'}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              <BilingualText
                vi="Quy trình thực hành: Chụp ảnh ➔ Mở quản lý tệp (DCIM/Camera) ➔ Xoá ảnh"
                en="Interactive Practical Workflow: Capture Photo ➔ Browse DCIM/Camera ➔ Delete File"
              />
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <BilingualText
            vi="Em hãy chụp một tấm ảnh bằng điện thoại thông minh. Sau đó vào hệ thống quản lý tệp để tìm đến thư mục ảnh chứa ảnh đã chụp. Em hãy mở xem ảnh đó, sau đó xoá đi."
            en="Capture a photograph with your smartphone. Launch the file manager, navigate to the camera folder, view the captured image, and then delete it."
          />
        </p>

        {/* Guided Interactive 4 Steps */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-white space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
            <span className="font-bold text-amber-400">
              {bilingualMode === 'en' ? `Step ${p2Step} / 4: ` : `Bước ${p2Step} / 4: `}{
                p2Step === 1
                  ? (bilingualMode === 'en' ? 'Capture new photo via virtual camera' : 'Chụp ảnh mới bằng camera ảo')
                  : p2Step === 2
                  ? (bilingualMode === 'en' ? 'Open File Manager ➔ DCIM ➔ Camera' : 'Vào File Manager ➔ DCIM ➔ Camera')
                  : p2Step === 3
                  ? (bilingualMode === 'en' ? 'View details of captured photo' : 'Xem chi tiết tệp ảnh vừa chụp')
                  : (bilingualMode === 'en' ? 'Successfully deleted file' : 'Đã hoàn thành xoá tệp thành công')
              }
            </span>
            <span className="text-slate-400 font-mono">
              {bilingualMode === 'en' ? 'Standard Textbook Workflow' : 'Quy trình chuẩn SGK'}
            </span>
          </div>

          {p2Step === 1 && (
            <div className="py-4 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-900 border-2 border-slate-700 mx-auto flex items-center justify-center text-rose-400">
                <Camera className="w-8 h-8" />
              </div>
              <p className="text-xs text-slate-300">
                <BilingualText
                  vi="Nhấp nút bên dưới để mô phỏng thao tác chụp 1 bức ảnh phong cảnh:"
                  en="Click the button below to simulate capturing a landscape photograph:"
                />
              </p>
              <button
                type="button"
                onClick={handleCapturePhoto}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 font-bold text-xs text-white shadow-md cursor-pointer transition-all"
              >
                {bilingualMode === 'en' ? '📸 Press Shutter Button' : '📸 Bấm nút chụp ảnh (Shutter)'}
              </button>
            </div>
          )}

          {p2Step === 2 && (
            <div className="py-3 space-y-3">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400">
                  {bilingualMode === 'en' ? '✓ Captured: IMG_20261027_001.jpg (2.8 MB)' : '✓ Đã chụp: IMG_20261027_001.jpg (2.8 MB)'}
                </span>
                <span className="text-slate-500">
                  {bilingualMode === 'en' ? 'Auto-saved to DCIM/Camera' : 'Lưu tự động vào DCIM/Camera'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setP2Step(3)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white shadow-md cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                <FolderOpen className="w-4 h-4" />
                <span>{bilingualMode === 'en' ? 'Open File Manager ➔ DCIM/Camera Folder' : 'Mở Trình quản lý tệp ➔ Thư mục DCIM/Camera'}</span>
              </button>
            </div>
          )}

          {p2Step === 3 && (
            <div className="py-3 space-y-3">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                <div className="font-bold text-amber-400">
                  {bilingualMode === 'en' ? 'Photo Metadata:' : 'Thông tin tệp ảnh:'}
                </div>
                <div className="font-mono text-slate-300 space-y-1">
                  <div>
                    {bilingualMode === 'en' ? 'File Name: ' : 'Tên tệp: '}
                    <strong>IMG_20261027_001.jpg</strong>
                  </div>
                  <div>
                    {bilingualMode === 'en' ? 'Directory: ' : 'Đường dẫn: '}
                    <code>{bilingualMode === 'en' ? '/Internal Storage/DCIM/Camera/' : '/Bộ nhớ trong/DCIM/Camera/'}</code>
                  </div>
                  <div>
                    {bilingualMode === 'en' ? 'Size: 2.8 MB • JPEG Format' : 'Dung lượng: 2.8 MB • Định dạng JPEG'}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleDeletePhoto}
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 font-bold text-xs text-white shadow-md cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>{bilingualMode === 'en' ? 'Long-press and tap "Delete File"' : 'Chạm giữ và bấm "Xoá tệp"'}</span>
              </button>
            </div>
          )}

          {p2Step === 4 && (
            <div className="py-3 text-center space-y-3 animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <p className="text-xs text-emerald-300 font-bold">
                <BilingualText
                  vi="Tuyệt vời! Em đã hoàn thành trọn vẹn quy trình: Chụp ảnh ➔ Mở thư mục DCIM/Camera ➔ Xoá tệp giải phóng bộ nhớ."
                  en="Awesome! You have completed the full workflow: Capture photo ➔ Locate in DCIM/Camera ➔ Delete file to free storage."
                />
              </p>
              <button
                type="button"
                onClick={() => setP2Step(1)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 cursor-pointer"
              >
                {bilingualMode === 'en' ? 'Restart Practice from Step 1' : 'Thực hành lại từ đầu'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3 Real-World Application Tasks (Vận dụng 1, 2, 3 SGK Trang 37) */}
      <div className="space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Compass className="w-5 h-5 text-indigo-600" />
          <BilingualText vi="Phần Vận dụng thực tế (SGK Trang 37)" en="Real-World Application Tasks (Page 37)" />
        </h3>

        {/* Application 1 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-slate-100">
              <Usb className="w-4 h-4 text-indigo-600" />
              <span>
                <BilingualText
                  vi="Vận dụng 1: Kết nối điện thoại với máy tính để sao chép ảnh"
                  en="Application 1: Connect Smartphone to PC for Photo Transfer"
                />
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowApp1Solution(!showApp1Solution)}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              {showApp1Solution ? (bilingualMode === 'en' ? 'Hide Guide' : 'Ẩn hướng dẫn') : (bilingualMode === 'en' ? 'Show Detailed Guide' : 'Xem hướng dẫn chi tiết')}
            </button>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <BilingualText
              vi="Em hãy kết nối điện thoại thông minh với máy tính để sao chép ảnh chụp vào thư mục trên máy tính."
              en="Connect your smartphone to a personal computer to transfer photos into a local computer folder."
            />
          </p>
          {showApp1Solution && (
            <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs text-slate-700 dark:text-slate-300 space-y-1.5 animate-in fade-in">
              <div className="font-bold text-indigo-900 dark:text-indigo-300">
                {bilingualMode === 'en' ? 'Standard Procedure Steps:' : 'Các bước thực hiện chuẩn:'}
              </div>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  <BilingualText
                    vi="Dùng dây cáp USB (Type-C hoặc Lightning) cắm một đầu vào điện thoại, đầu kia cắm vào cổng USB máy tính."
                    en="Connect one end of a USB cable (Type-C or Lightning) to the smartphone and the other end to the computer USB port."
                  />
                </li>
                <li>
                  <BilingualText
                    vi="Trên màn hình điện thoại, chọn thông báo USB và chọn chế độ 'Truyền tệp / MTP' (hoặc bấm 'Tin cậy máy tính này' trên iPhone)."
                    en="On the phone display, tap the USB notification and select 'File Transfer / MTP' mode (or tap 'Trust This Computer' on iPhone)."
                  />
                </li>
                <li>
                  <BilingualText
                    vi="Trên máy tính, mở File Explorer (This PC), nhấp vào biểu tượng tên điện thoại."
                    en="On the computer, launch File Explorer (This PC) and click the smartphone device icon."
                  />
                </li>
                <li>
                  <BilingualText
                    vi="Truy cập vào Bộ nhớ trong ➔ DCIM ➔ Camera, sao chép (Ctrl+C) các bức ảnh muốn lấy và dán (Ctrl+V) vào thư mục Pictures hoặc Desktop trên máy tính."
                    en="Navigate into Internal Storage ➔ DCIM ➔ Camera, copy (Ctrl+C) the desired photos, and paste (Ctrl+V) into Pictures or Desktop."
                  />
                </li>
              </ol>
            </div>
          )}
        </div>

        {/* Application 2 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-slate-100">
              <Cloud className="w-4 h-4 text-sky-600" />
              <span>
                <BilingualText
                  vi="Vận dụng 2: Lưu trữ ảnh trên dịch vụ đám mây (Google Drive / OneDrive)"
                  en="Application 2: Cloud Storage Backup (Google Drive / OneDrive)"
                />
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowApp2Solution(!showApp2Solution)}
              className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
            >
              {showApp2Solution ? (bilingualMode === 'en' ? 'Hide Guide' : 'Ẩn hướng dẫn') : (bilingualMode === 'en' ? 'Show Detailed Guide' : 'Xem hướng dẫn chi tiết')}
            </button>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <BilingualText
              vi="Hãy thực hành lưu trữ các ảnh đó trên dịch vụ lưu trữ đám mây."
              en="Practice backing up those photographs to a cloud storage service."
            />
          </p>
          {showApp2Solution && (
            <div className="p-3.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs text-slate-700 dark:text-slate-300 space-y-1.5 animate-in fade-in">
              <div className="font-bold text-sky-900 dark:text-sky-300">
                {bilingualMode === 'en' ? 'Standard Procedure Steps:' : 'Các bước thực hiện chuẩn:'}
              </div>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  <BilingualText
                    vi="Mở ứng dụng Google Drive hoặc Microsoft OneDrive trên điện thoại (đã đăng nhập tài khoản)."
                    en="Open the Google Drive or Microsoft OneDrive app on the smartphone (logged into your account)."
                  />
                </li>
                <li>
                  <BilingualText
                    vi="Bấm vào biểu tượng dấu cộng (+) ở góc dưới màn hình ➔ chọn Tải lên (Upload)."
                    en="Tap the plus icon (+) at the corner ➔ select Upload."
                  />
                </li>
                <li>
                  <BilingualText
                    vi="Chọn các bức ảnh chụp cần sao lưu từ Bộ sưu tập."
                    en="Select the captured photos you wish to backup from the photo gallery."
                  />
                </li>
                <li>
                  <BilingualText
                    vi="Đợi hệ thống tải lên. Sau đó, em có thể mở máy tính đăng nhập vào drive.google.com để xem và tải ảnh về bất cứ khi nào."
                    en="Wait for upload completion. You can subsequently sign in on your PC at drive.google.com to access and download photos anytime."
                  />
                </li>
              </ol>
            </div>
          )}
        </div>

        {/* Application 3 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-slate-100">
              <Video className="w-4 h-4 text-purple-600" />
              <span>
                <BilingualText
                  vi="Vận dụng 3: Gửi ảnh qua phần mềm học trực tuyến Zoom / Meet"
                  en="Application 3: Share Photos via Online Classroom Software (Zoom / Meet)"
                />
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowApp3Solution(!showApp3Solution)}
              className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
            >
              {showApp3Solution ? (bilingualMode === 'en' ? 'Hide Guide' : 'Ẩn hướng dẫn') : (bilingualMode === 'en' ? 'Show Detailed Guide' : 'Xem hướng dẫn chi tiết')}
            </button>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <BilingualText
              vi="Hãy thực hành gửi các ảnh này qua phần mềm hỗ trợ học trực tuyến như Zoom."
              en="Practice submitting or sharing these photos through remote learning software such as Zoom."
            />
          </p>
          {showApp3Solution && (
            <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs text-slate-700 dark:text-slate-300 space-y-1.5 animate-in fade-in">
              <div className="font-bold text-purple-900 dark:text-purple-300">
                {bilingualMode === 'en' ? 'Standard Procedure Steps:' : 'Các bước thực hiện chuẩn:'}
              </div>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  <BilingualText
                    vi="Trong phòng học trực tuyến Zoom, mở khung trò chuyện (Chat)."
                    en="In the active Zoom classroom meeting, open the in-call Chat window."
                  />
                </li>
                <li>
                  <BilingualText
                    vi="Bấm vào biểu tượng đính kèm tệp (File / Biểu tượng kẹp giấy) hoặc nút Ảnh."
                    en="Tap the file attachment icon (paperclip / File icon) or the Photo button."
                  />
                </li>
                <li>
                  <BilingualText
                    vi="Chọn tệp ảnh bài tập cần nộp từ thư mục ảnh của điện thoại và bấm Gửi (Send) cho thầy cô hoặc cả lớp."
                    en="Select the homework photo from your device camera folder and click Send to teachers or classmates."
                  />
                </li>
                <li>
                  <BilingualText
                    vi="Ngoài ra, em có thể bấm nút Chia sẻ màn hình (Share Screen) ➔ chọn mở ảnh trực tiếp để thuyết trình trước lớp."
                    en="Alternatively, tap Share Screen ➔ display the photo directly to give an oral class presentation."
                  />
                </li>
              </ol>
            </div>
          )}
        </div>
      </div>



      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={5} lessonId={7} />

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={prevPage}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'Previous: File Manager' : 'Quay lại: Quản lý tệp'}</span>
        </button>

        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          {bilingualMode === 'en' ? 'End of Lesson 7 • Ready for Quiz' : 'Kết thúc Bài 7 • Sẵn sàng làm bài kiểm tra'}
        </div>
      </div>
    </div>
  );
};
