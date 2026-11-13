import React, { useState } from 'react';
import {
  Volume2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Folder,
  FolderOpen,
  FileImage,
  HardDrive,
  Cloud,
  Share2,
  Copy,
  Move,
  Trash2,
  CheckCircle2,
  RotateCcw,
  Info,
  Layers,
  ChevronRight,
  Check
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section7FileManagerCloud: React.FC = () => {
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

  // Initial file list inside DCIM/Camera based on Textbook Figure 7.7 & 7.8
  const INITIAL_FILES = [
    { id: 'f1', name: '2020-07-28 00-42-30.png', dateVi: '28 Th7, 2020 00:42', dateEn: 'Jul 28, 2020 00:42', size: '696 KB' },
    { id: 'f2', name: '20191003_093329.jpg', dateVi: '3 Th10, 2019 09:33', dateEn: 'Oct 3, 2019 09:33', size: '2.97 MB' },
    { id: 'f3', name: '20191003_093336.jpg', dateVi: '3 Th10, 2019 09:33', dateEn: 'Oct 3, 2019 09:33', size: '2.70 MB' },
    { id: 'f4', name: '20191003_093340.jpg', dateVi: '3 Th10, 2019 09:33', dateEn: 'Oct 3, 2019 09:33', size: '2.92 MB' }
  ];

  type NotificationType =
    | { type: 'deleted'; fileName: string }
    | { type: 'copied'; fileName: string }
    | { type: 'share'; fileName: string }
    | { type: 'moving' }
    | { type: 'reset' };

  const [files, setFiles] = useState(INITIAL_FILES);
  const [selectedFileId, setSelectedFileId] = useState<string | null>('f1');
  const [actionNotification, setActionNotification] = useState<NotificationType | null>(null);

  const speechVi =
    'Mục 2: Nhiệm vụ 4: Quản lý tệp và thư mục trên điện thoại. Hệ thống tệp trên điện thoại có cấu trúc phân cấp tương tự máy tính. Ảnh chụp từ máy ảnh được lưu vào thư mục DCIM rồi đến thư mục con Camera. Chạm và giữ lâu vào tệp sẽ xuất hiện thanh điều khiển để di chuyển, sao chép, chia sẻ hoặc xoá tệp.';

  const speechEn =
    'Section 2: Task 4: File and Folder Management. Mobile file systems organize files hierarchically like personal computers. Camera photos reside under the DCIM directory within the Camera subfolder. Long-pressing any file reveals action buttons: Move, Copy, Share, and Delete.';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(bilingualMode === 'en' ? speechEn : speechVi);
    }
  };

  const notify = (notif: NotificationType) => {
    setActionNotification(notif);
    setTimeout(() => setActionNotification(null), 2500);
  };

  const renderNotificationMessage = (notif: NotificationType) => {
    switch (notif.type) {
      case 'deleted':
        return bilingualMode === 'en'
          ? `Deleted file "${notif.fileName}" from storage!`
          : `Đã xoá tệp "${notif.fileName}" khỏi bộ nhớ!`;
      case 'copied':
        return bilingualMode === 'en'
          ? `Successfully copied: ${notif.fileName}`
          : `Đã sao chép thành công: ${notif.fileName}`;
      case 'share':
        return bilingualMode === 'en'
          ? `Share menu opened: Send "${notif.fileName}" via Zalo, Drive, Gmail...`
          : `Mở bảng chia sẻ: Gửi "${notif.fileName}" qua Zalo, Drive, Gmail...`;
      case 'moving':
        return bilingualMode === 'en'
          ? 'Moving file to new directory...'
          : 'Đang di chuyển tệp sang thư mục mới...';
      case 'reset':
        return bilingualMode === 'en'
          ? 'Restored default sample file list!'
          : 'Đã khôi phục lại danh sách tệp mẫu ban đầu!';
    }
  };

  const handleDelete = () => {
    if (!selectedFileId) return;
    const target = files.find((f) => f.id === selectedFileId);
    setFiles(files.filter((f) => f.id !== selectedFileId));
    setSelectedFileId(null);
    if (target) {
      notify({ type: 'deleted', fileName: target.name });
    }
  };

  const handleCopy = () => {
    if (!selectedFileId) return;
    const target = files.find((f) => f.id === selectedFileId);
    if (!target) return;
    const copyFile = {
      id: `copy_${Date.now()}`,
      name: `Copy_${target.name}`,
      dateVi: 'Vừa xong',
      dateEn: 'Just now',
      size: target.size
    };
    setFiles([...files, copyFile]);
    notify({ type: 'copied', fileName: copyFile.name });
  };

  const handleShare = () => {
    if (!selectedFileId) return;
    const target = files.find((f) => f.id === selectedFileId);
    if (target) {
      notify({ type: 'share', fileName: target.name });
    }
  };

  const handleReset = () => {
    setFiles(INITIAL_FILES);
    setSelectedFileId('f1');
    notify({ type: 'reset' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
              {bilingualMode === 'en' ? 'Section 4 • Task 4' : 'Mục 4 • Nhiệm vụ 4'}
            </span>
            <span className="text-xs text-slate-500 font-mono">SGK Trang 36 – 37</span>
            <button
              type="button"
              onClick={() => {
                setOriginalPageTarget(36);
                setShowOriginalModal(true);
              }}
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>{bilingualMode === 'en' ? 'Page 36 Scan' : 'Bản quét Tr. 36'}</span>
            </button>
          </div>
          <h2
            data-en="File Manager, DCIM/Camera Hierarchy & Cloud Storage Operations"
            data-vi="Ứng dụng quản lý tệp, Thư mục DCIM/Camera & Lưu trữ đám mây"
            className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100"
          >
            <BilingualText
              vi="Ứng dụng quản lý tệp, Thư mục DCIM/Camera & Lưu trữ đám mây"
              en="File Manager, DCIM/Camera Hierarchy & Cloud Storage Operations"
            />
          </h2>
        </div>
      </div>

      {/* Hierarchical Structure Theory (Hình 7.7 SGK Trang 36) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100">
              <BilingualText
                vi="Cấu trúc tổ chức hệ thống tệp phân cấp trên điện thoại"
                en="Hierarchical File System Architecture on Mobile Devices"
              />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <BilingualText
                vi="Quy chuẩn quản lý tệp tương tự máy tính cá nhân (PC / Laptop)"
                en="Standardized directory hierarchy mirroring personal computer storage"
              />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
              <HardDrive className="w-4 h-4 text-emerald-600" />
              <span>
                <BilingualText vi="1. Bộ nhớ trong (Internal Storage)" en="1. Internal Storage" />
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <BilingualText
                vi="Không gian lưu trữ chính của máy (ví dụ 128 GB, 256 GB, 512 GB). Chứa hệ điều hành, các ứng dụng cài đặt và dữ liệu người dùng."
                en="Primary storage space (e.g. 128 GB, 256 GB, 512 GB). Contains operating system files, installed applications, and user media."
              />
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
              <Folder className="w-4 h-4 text-amber-500" />
              <span>
                <BilingualText vi="2. Thư mục DCIM / Camera" en="2. DCIM / Camera Folder" />
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <BilingualText
                vi="DCIM viết tắt của Digital Camera Images. Mọi bức ảnh chụp và video quay từ camera đều được lưu tại thư mục này."
                en="DCIM stands for Digital Camera Images. All photos captured and videos recorded by the camera hardware are saved here."
              />
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
              <Cloud className="w-4 h-4 text-sky-500" />
              <span>
                <BilingualText vi="3. Dịch vụ đám mây (Cloud)" en="3. Cloud Storage Services" />
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <BilingualText
                vi="OneDrive, Google Drive, iCloud được tích hợp ngay trong trình quản lý tệp, giúp tự động sao lưu dữ liệu lên mạng Internet."
                en="OneDrive, Google Drive, and iCloud integrate directly into the file explorer to automatically sync and back up files to the cloud."
              />
            </p>
          </div>
        </div>
      </div>

      {/* Interactive File Manager Sandbox (Hình 7.7 & 7.8 SGK) */}
      <div className="bg-slate-950 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              {bilingualMode === 'en' ? 'Interactive File Explorer Sandbox' : 'Thực hành thao tác tệp trực quan'}
            </span>
            <h3 className="font-bold text-base sm:text-lg text-slate-100">
              <BilingualText
                vi="Mô phỏng Trình duyệt tệp DCIM/Camera & Thao tác chọn tệp (Hình 7.7 – 7.8)"
                en="Interactive DCIM/Camera File Explorer & Long-Press Actions (Figures 7.7 – 7.8)"
              />
            </h3>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{bilingualMode === 'en' ? 'Reset Sample Files' : 'Khôi phục tệp mẫu'}</span>
          </button>
        </div>

        {/* Action Notification Alert Toast */}
        {actionNotification && (
          <div className="p-3 bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs rounded-xl flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{renderNotificationMessage(actionNotification)}</span>
          </div>
        )}

        {/* Breadcrumb Path Bar */}
        <div className="flex items-center gap-2 text-xs font-mono bg-slate-900 p-3 rounded-xl border border-slate-800 overflow-x-auto text-slate-300">
          <HardDrive className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{bilingualMode === 'en' ? 'Internal Storage (105 GB / 512 GB)' : 'Bộ nhớ trong (105 GB / 512 GB)'}</span>
          <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
          <Folder className="w-4 h-4 text-amber-400 shrink-0" />
          <span>DCIM</span>
          <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
          <FolderOpen className="w-4 h-4 text-amber-300 shrink-0" />
          <span className="font-bold text-white">
            {bilingualMode === 'en' ? `Camera (${files.length} files)` : `Camera (${files.length} tệp)`}
          </span>
        </div>

        {/* File List Grid & Action Toolbar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* File Items Column */}
          <div className="lg:col-span-8 space-y-2">
            {files.map((file) => {
              const isSelected = selectedFileId === file.id;
              return (
                <div
                  key={file.id}
                  onClick={() => setSelectedFileId(isSelected ? null : file.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-emerald-950/40 border-emerald-500 ring-1 ring-emerald-500'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${
                        isSelected ? 'bg-emerald-600 border-emerald-400 text-white' : 'border-slate-600'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 shrink-0">
                      <FileImage className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-xs font-bold text-slate-200 truncate">
                        {file.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {bilingualMode === 'en' ? file.dateEn : file.dateVi}
                      </div>
                    </div>
                  </div>

                  <span className="font-mono text-xs text-slate-400 shrink-0">
                    {file.size}
                  </span>
                </div>
              );
            })}

            {files.length === 0 && (
              <div className="p-8 text-center text-slate-500 text-xs bg-slate-900/40 rounded-xl border border-dashed border-slate-800">
                {bilingualMode === 'en'
                  ? 'Camera directory is empty. Click "Reset Sample Files" to reload.'
                  : 'Thư mục Camera trống. Bấm nút "Khôi phục tệp mẫu" ở góc phải để nạp lại.'}
              </div>
            )}
          </div>

          {/* Contextual Action Bar Column (Hình 7.8 SGK) */}
          <div className="lg:col-span-4 bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {bilingualMode === 'en' ? 'Contextual Controls (Fig 7.8)' : 'Thanh điều khiển tệp (Hình 7.8 SGK)'}
              </span>
              <h4 className="font-bold text-sm text-slate-200 mt-1">
                {selectedFileId
                  ? (bilingualMode === 'en' ? 'Selected: 1 file' : 'Đã chọn: 1 tệp')
                  : (bilingualMode === 'en' ? 'No file selected (Tap any file to select)' : 'Chưa chọn tệp nào (Chạm vào tệp bên cạnh)')}
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                disabled={!selectedFileId}
                onClick={handleCopy}
                className={`p-2.5 rounded-lg border font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  selectedFileId
                    ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-white cursor-pointer active:scale-95'
                    : 'bg-slate-950 border-slate-800 text-slate-600 cursor-not-allowed'
                }`}
              >
                <Copy className="w-3.5 h-3.5 text-blue-400" />
                <span>{bilingualMode === 'en' ? 'Copy' : 'Sao chép'}</span>
              </button>

              <button
                type="button"
                disabled={!selectedFileId}
                onClick={() => notify({ type: 'moving' })}
                className={`p-2.5 rounded-lg border font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  selectedFileId
                    ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-white cursor-pointer active:scale-95'
                    : 'bg-slate-950 border-slate-800 text-slate-600 cursor-not-allowed'
                }`}
              >
                <Move className="w-3.5 h-3.5 text-amber-400" />
                <span>{bilingualMode === 'en' ? 'Move' : 'Di chuyển'}</span>
              </button>

              <button
                type="button"
                disabled={!selectedFileId}
                onClick={handleShare}
                className={`p-2.5 rounded-lg border font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  selectedFileId
                    ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-white cursor-pointer active:scale-95'
                    : 'bg-slate-950 border-slate-800 text-slate-600 cursor-not-allowed'
                }`}
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{bilingualMode === 'en' ? 'Share' : 'Chia sẻ'}</span>
              </button>

              <button
                type="button"
                disabled={!selectedFileId}
                onClick={handleDelete}
                className={`p-2.5 rounded-lg border font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  selectedFileId
                    ? 'bg-rose-950/80 hover:bg-rose-900 border-rose-800 text-rose-200 cursor-pointer active:scale-95'
                    : 'bg-slate-950 border-slate-800 text-slate-600 cursor-not-allowed'
                }`}
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                <span>{bilingualMode === 'en' ? 'Delete' : 'Xoá tệp'}</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-800 pt-3">
              💡 <strong>{bilingualMode === 'en' ? 'Standard Textbook Practice: ' : 'Quy tắc thao tác chuẩn SGK: '}</strong>
              <BilingualText
                vi="Chạm và giữ lâu một chút (Long press) vào biểu tượng tệp sẽ kích hoạt thanh công cụ này."
                en="Long-pressing on any file icon activates this contextual action toolbar."
              />
            </p>
          </div>
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={4} lessonId={7} />

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={prevPage}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'Previous: Home Screen' : 'Quay lại: Màn hình chính'}</span>
        </button>

        <button
          type="button"
          onClick={nextPage}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer"
        >
          <span>{bilingualMode === 'en' ? 'Next: Practice & Application' : 'Tiếp theo: Luyện tập & Vận dụng'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
