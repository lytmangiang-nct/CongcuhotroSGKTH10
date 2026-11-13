import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Eye,
  Volume2,
  Camera,
  Car,
  Radio,
  FileText,
  Table,
  Presentation,
  Check,
  X,
  HelpCircle,
  Cpu,
  Layers,
  ShieldCheck,
  Activity,
  Lightbulb,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

interface ImageRecognitionDevice {
  id: string;
  nameVi: string;
  nameEn: string;
  canRecognizeImage: boolean;
  descVi: string;
  descEn: string;
  aiTechVi: string;
  aiTechEn: string;
}

export const Section2PracticeApply: React.FC = () => {
  const { bilingualMode, speak, setOriginalPageTarget, setShowOriginalModal } = useBook();
  const [activeTab, setActiveTab] = useState<'practice' | 'apply'>('practice');

  // Interactive state for Practice 1: Device Image Recognition Checker
  const [selectedDevice, setSelectedDevice] = useState<string>('phone');
  const [testedDevices, setTestedDevices] = useState<Record<string, boolean>>({});
  const [p1SelectedDevs, setP1SelectedDevs] = useState<string[]>([]);
  const [p1Checked, setP1Checked] = useState(false);
  const [showP1Solution, setShowP1Solution] = useState(false);

  // Interactive state for Practice 2: Office Software Matching & Tabs
  const [selectedOfficeTool, setSelectedOfficeTool] = useState<'word' | 'excel' | 'powerpoint'>('word');
  const [p2Matches, setP2Matches] = useState<Record<string, string>>({
    word: '',
    excel: '',
    powerpoint: ''
  });
  const [p2Checked, setP2Checked] = useState(false);
  const [showP2Solution, setShowP2Solution] = useState(false);

  // Interactive state for Application 1: Traffic Camera scenario
  const [activeTrafficScenario, setActiveTrafficScenario] = useState<'lights' | 'fine' | 'investigation'>('lights');
  const [app1Choice, setApp1Choice] = useState<number | null>(null);
  const [app1Checked, setApp1Checked] = useState(false);
  const [showApp1Solution, setShowApp1Solution] = useState(false);

  // Interactive state for Application 2: Autonomous vehicle benefit
  const [activeVehicleBenefit, setActiveVehicleBenefit] = useState<'environment' | 'congestion' | 'cost'>('environment');
  const [app2Selected, setApp2Selected] = useState<number[]>([]);
  const [app2Checked, setApp2Checked] = useState(false);
  const [showApp2Solution, setShowApp2Solution] = useState(false);

  const recognitionDevices: ImageRecognitionDevice[] = [
    {
      id: 'phone',
      nameVi: 'Điện thoại thông minh (Smartphone)',
      nameEn: 'Smartphone with AI camera',
      canRecognizeImage: true,
      descVi: 'Mở khóa khuôn mặt (FaceID), quét mã QR thanh toán, tìm kiếm vật thể với Google Lens và nhận diện chữ viết trong ảnh (OCR).',
      descEn: 'Facial recognition unlock (FaceID), QR code payment scanning, visual search via Google Lens, and optical character recognition (OCR).',
      aiTechVi: 'Mạng nơ-ron tích chập (CNN) xử lí hình ảnh trực tiếp trên chip AI chuyên dụng (NPU).',
      aiTechEn: 'Convolutional Neural Networks (CNN) processed directly on dedicated AI hardware (NPU).'
    },
    {
      id: 'camera_ai',
      nameVi: 'Camera an ninh AI thông minh',
      nameEn: 'AI Smart Surveillance Camera',
      canRecognizeImage: true,
      descVi: 'Tự động nhận diện biển số xe vi phạm giao thông, phát hiện người lạ đột nhập ban đêm và cảnh báo qua ứng dụng tức thì.',
      descEn: 'Automatically recognizes license plates, detects unauthorized night intruders, and triggers instant mobile alerts.',
      aiTechVi: 'Thuật toán thị giác máy tính nhận dạng biển số (ALPR) và phân loại đối tượng thời gian thực.',
      aiTechEn: 'Automated License Plate Recognition (ALPR) and real-time object classification computer vision.'
    },
    {
      id: 'car',
      nameVi: 'Xe ô tô tự hành (Self-driving Car)',
      nameEn: 'Autonomous Self-Driving Vehicle',
      canRecognizeImage: true,
      descVi: 'Nhận dạng vạch kẻ làn đường, đèn tín hiệu giao thông, biển báo tốc độ và phát hiện người đi bộ để tự động hãm phanh hoặc đánh lái.',
      descEn: 'Identifies road lane markings, traffic signals, speed limit signs, and pedestrians to autonomously steer and brake.',
      aiTechVi: 'Hệ thống đa camera kết hợp cảm biến LiDAR & Radar tạo mô hình 3D nhận thức môi trường quanh xe.',
      aiTechEn: 'Multi-camera vision fusion with LiDAR & Radar creating a 3D real-time environmental perception model.'
    },
    {
      id: 'egate',
      nameVi: 'Cửa kiểm soát xuất nhập cảnh sân bay',
      nameEn: 'Airport Biometric E-Gate',
      canRecognizeImage: true,
      descVi: 'Quét khuôn mặt hành khách và đối chiếu với dữ liệu sinh trắc học lưu trong chip hộ chiếu điện tử (e-Passport).',
      descEn: 'Scans passenger faces and cross-verifies against biometric data stored in electronic passports (e-Passports).',
      aiTechVi: 'So khớp mẫu vân khuôn mặt sinh trắc học 3D độ bảo mật cao đạt chuẩn hàng không quốc tế.',
      aiTechEn: 'High-security 3D facial biometric template verification compliant with international aviation standards.'
    },
    {
      id: 'thermometer',
      nameVi: 'Nhiệt kế điện tử kỹ thuật số',
      nameEn: 'Digital Electronic Thermometer',
      canRecognizeImage: false,
      descVi: 'Chỉ đo nhiệt độ qua cảm biến nhiệt hồng ngoại hoặc điện trở nhiệt; không có thấu kính camera và không có chức năng xử lí ảnh.',
      descEn: 'Only measures temperature via thermal/infrared sensors; lacks camera lenses and has no image processing capabilities.',
      aiTechVi: 'Chỉ chuyển đổi tín hiệu điện áp thành chỉ số nhiệt độ số thập phân đơn giản.',
      aiTechEn: 'Simply converts voltage analog signals into decimal temperature numerical values.'
    },
    {
      id: 'projector',
      nameVi: 'Máy chiếu thông thường (Basic Projector)',
      nameEn: 'Standard Video Projector',
      canRecognizeImage: false,
      descVi: 'Là thiết bị đầu ra (output) phát tín hiệu hình ảnh lên màn chiếu, không có cảm biến thu nhận và không xử lí phân tích hình ảnh.',
      descEn: 'An output display device projecting visual signals onto a screen; lacks optical sensors and does not analyze images.',
      aiTechVi: 'Thiết bị xuất quang học thuần túy, không có bộ vi xử lí thị giác máy tính.',
      aiTechEn: 'Pure optical output display without computer vision microprocessors.'
    }
  ];

  const currentDev = recognitionDevices.find((d) => d.id === selectedDevice) || recognitionDevices[0];

  const handleTestDevice = (devId: string) => {
    setSelectedDevice(devId);
    setTestedDevices((prev) => ({ ...prev, [devId]: true }));
  };

  const handleCheckP1 = () => {
    setP1Checked(true);
    const correctIds = ['phone', 'camera_ai', 'car', 'egate'];
    const hasAllCorrect = correctIds.every((id) => p1SelectedDevs.includes(id));
    const noIncorrect = !p1SelectedDevs.includes('thermometer') && !p1SelectedDevs.includes('projector');
    if (hasAllCorrect && noIncorrect) {
      confetti({ particleCount: 40, spread: 60 });
    }
  };

  const handleCheckP2 = () => {
    setP2Checked(true);
    if (p2Matches.word === 'doc' && p2Matches.excel === 'sheet' && p2Matches.powerpoint === 'slide') {
      confetti({ particleCount: 40, spread: 60 });
    }
  };

  const handleCheckApp1 = () => {
    setApp1Checked(true);
    if (app1Choice === 0) {
      confetti({ particleCount: 40, spread: 60 });
    }
  };

  const handleCheckApp2 = () => {
    setApp2Checked(true);
    if (app2Selected.includes(0) && app2Selected.includes(1) && app2Selected.includes(2) && !app2Selected.includes(3)) {
      confetti({ particleCount: 40, spread: 60 });
    }
  };

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700">
            {bilingualMode === 'en' ? 'End of Lesson 2 • Page 15 Textbook' : 'Cuối Bài 2 • Trang 15 SGK'}
          </span>
          <h2 className="text-lg sm:text-xl font-black text-slate-900">
            {bilingualMode === 'en' ? 'PRACTICE & REAL-WORLD APPLICATIONS' : 'LUYỆN TẬP VÀ VẬN DỤNG KIẾN THỨC'}
          </h2>
          <p className="text-xs text-slate-600 font-medium">
            {bilingualMode === 'en'
              ? 'Solve practical exercises on smart devices, office productivity software, smart traffic cameras, and Industry 4.0 autonomous vehicles.'
              : 'Giải quyết các bài tập thực tiễn về thiết bị thông minh, tin học văn phòng, camera giao thông và xe tự hành 4.0.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setOriginalPageTarget(15);
              setShowOriginalModal(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 text-xs font-bold flex items-center gap-1.5 hover:bg-amber-100 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4 text-amber-600" />
            <span>{bilingualMode === 'en' ? 'Compare Page 15 SGK' : 'Đối chiếu Trang 15 SGK'}</span>
          </button>

          <button
            type="button"
            onClick={() =>
              speak(
                'Lesson 2 Practice and Real-World Applications. Practical exercises on smart devices with image recognition, office software productivity, intelligent urban traffic monitoring cameras, and Industry 4.0 autonomous vehicles.',
                'en'
              )
            }
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            title="Listen in English"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>EN</span>
          </button>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <button
          type="button"
          onClick={() => setActiveTab('practice')}
          className={`py-2 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'practice'
              ? 'bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-300 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'PRACTICE EXERCISES (2 Tasks)' : 'PHẦN LUYỆN TẬP (2 Bài)'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('apply')}
          className={`py-2 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'apply'
              ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'APPLICATIONS IN LIFE (2 Projects)' : 'PHẦN VẬN DỤNG (2 Bài)'}</span>
        </button>
      </div>

      {/* Tab 1: Practice Questions */}
      {activeTab === 'practice' && (
        <div className="space-y-5 animate-in fade-in">
          {/* Practice 1 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-amber-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                1
              </span>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                  {bilingualMode === 'en'
                    ? 'Practice 1: Which smart devices are capable of image recognition?'
                    : 'Luyện tập 1: Thiết bị thông minh nào có thể nhận dạng được hình ảnh?'}
                </h3>
              </div>
            </div>

            {/* Interactive Device Tester Widget */}
            <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-slate-800/80 border border-amber-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-amber-600" />
                  <span>
                    {bilingualMode === 'en'
                      ? 'Interactive Check: Click a device to analyze image recognition capability'
                      : 'Thử nghiệm tương tác: Bấm chọn thiết bị để kiểm tra khả năng nhận dạng ảnh'}
                  </span>
                </span>
                <span className="text-[11px] text-slate-500">
                  {Object.keys(testedDevices).length} / {recognitionDevices.length}{' '}
                  {bilingualMode === 'en' ? 'analyzed' : 'đã kiểm tra'}
                </span>
              </div>

              {/* Device Selector Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {recognitionDevices.map((dev) => {
                  const isCurrent = dev.id === selectedDevice;
                  const hasBeenTested = !!testedDevices[dev.id];

                  return (
                    <button
                      key={dev.id}
                      type="button"
                      onClick={() => handleTestDevice(dev.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-1.5 ${
                        isCurrent
                          ? 'bg-amber-600 text-white border-amber-600 shadow-xs font-bold'
                          : hasBeenTested
                          ? dev.canRecognizeImage
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
                          : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-amber-50/50'
                      }`}
                    >
                      <span className="text-xs truncate">
                        {bilingualMode === 'en' ? dev.nameEn : dev.nameVi}
                      </span>
                      {dev.canRecognizeImage ? (
                        <Check className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                      ) : (
                        <X className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Selected Device Result Inspection Panel */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      {bilingualMode === 'en' ? currentDev.nameEn : currentDev.nameVi}
                    </span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 ${
                      currentDev.canRecognizeImage
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400 border border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {currentDev.canRecognizeImage ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{bilingualMode === 'en' ? 'Image Recognition: YES' : 'Nhận dạng ảnh: CÓ'}</span>
                      </>
                    ) : (
                      <>
                        <X className="w-3 h-3 text-slate-500" />
                        <span>{bilingualMode === 'en' ? 'Image Recognition: NO' : 'Nhận dạng ảnh: KHÔNG'}</span>
                      </>
                    )}
                  </span>
                </div>

                <BilingualText
                  vi={currentDev.descVi}
                  en={currentDev.descEn}
                  viClassName="text-xs text-slate-700 dark:text-slate-300"
                />

                <div className="pt-1 text-[11px] text-indigo-700 dark:text-indigo-400 flex items-start gap-1.5 font-medium">
                  <Cpu className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>
                    {bilingualMode === 'en'
                      ? `AI & Vision Technology: ${currentDev.aiTechEn}`
                      : `Công nghệ AI & Thị giác máy tính: ${currentDev.aiTechVi}`}
                  </span>
                </div>
              </div>
            </div>

              {/* Interactive Device Identification Question */}
              <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-slate-800/90 border border-indigo-200 dark:border-indigo-900/60 space-y-3">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-bold text-xs sm:text-sm text-indigo-950 dark:text-indigo-200">
                    {bilingualMode === 'en'
                      ? 'Interactive Check: Which of the following devices possess image recognition capabilities?'
                      : 'Câu hỏi tương tác: Trong các thiết bị sau, những thiết bị nào CÓ KHẢ NĂNG nhận dạng hình ảnh?'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  {bilingualMode === 'en'
                    ? 'Check all devices with AI / computer vision image recognition:'
                    : 'Hãy chọn tất cả các thiết bị có tích hợp thị giác máy tính / camera AI nhận dạng:'}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {recognitionDevices.map((dev) => {
                    const isSelected = p1SelectedDevs.includes(dev.id);
                    return (
                      <button
                        key={dev.id}
                        type="button"
                        onClick={() => {
                          setP1Checked(false);
                          if (isSelected) {
                            setP1SelectedDevs(p1SelectedDevs.filter((id) => id !== dev.id));
                          } else {
                            setP1SelectedDevs([...p1SelectedDevs, dev.id]);
                          }
                        }}
                        className={`p-2.5 rounded-xl border text-left flex items-start gap-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                            : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-amber-400'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded mt-0.5 border flex items-center justify-center shrink-0 text-[10px] font-bold ${
                          isSelected ? 'bg-white text-amber-700 border-white' : 'border-slate-400'
                        }`}>
                          {isSelected && '✓'}
                        </span>
                        <span className="text-xs truncate">
                          {bilingualMode === 'en' ? dev.nameEn : dev.nameVi}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleCheckP1}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{bilingualMode === 'en' ? 'Check Selection' : 'Kiểm tra đáp án'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowP1Solution(!showP1Solution)}
                    className="px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200 dark:hover:bg-amber-900/80 border border-amber-300 dark:border-amber-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>
                      {showP1Solution
                        ? (bilingualMode === 'en' ? 'Hide Textbook Model Answer' : 'Ẩn gợi ý & Đáp án chuẩn SGK')
                        : (bilingualMode === 'en' ? 'Show Textbook Model Answer' : 'Xem gợi ý & Đáp án chuẩn SGK')}
                    </span>
                    {showP1Solution ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {p1Checked && (
                  <div className={`p-3 rounded-xl border text-xs ${
                    ['phone', 'camera_ai', 'car', 'egate'].every((id) => p1SelectedDevs.includes(id)) &&
                    !p1SelectedDevs.includes('thermometer') && !p1SelectedDevs.includes('projector')
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800'
                      : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-800'
                  }`}>
                    {['phone', 'camera_ai', 'car', 'egate'].every((id) => p1SelectedDevs.includes(id)) &&
                    !p1SelectedDevs.includes('thermometer') && !p1SelectedDevs.includes('projector') ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>
                          <BilingualText
                            vi="4 thiết bị có khả năng nhận dạng hình ảnh là: Smartphone (FaceID/QR/Lens), Camera AI (biển số xe), Xe tự hành (làn đường/biển báo) và Cửa E-Gate sân bay (so khớp khuôn mặt)!"
                            en="The 4 image-recognition devices are: Smartphone (FaceID/QR/Lens), AI Camera (license plates), Autonomous Vehicles (lanes/signs), and Airport E-Gate (facial verification)!"
                          />
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>
                          <BilingualText
                            vi="Nhiệt kế điện tử chỉ có cảm biến nhiệt, máy chiếu chỉ là thiết bị xuất quang học (output), cả hai đều không nhận dạng ảnh."
                            en="Digital thermometers only feature thermal sensors and projectors are optical output devices; neither performs image recognition."
                          />
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

            {/* Standard Textbook Synthesis Summary (Hidden by default, toggleable) */}
            {showP1Solution && (
              <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-slate-800 border border-amber-200 dark:border-slate-700 space-y-2 text-xs sm:text-sm animate-in fade-in">
                <div className="font-bold text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>
                    {bilingualMode === 'en'
                      ? 'Textbook Model Answer & Key Takeaways:'
                      : 'Gợi ý trả lời & Ví dụ cụ thể chuẩn SGK:'}
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-1.5 text-slate-700 dark:text-slate-300 pl-1 leading-relaxed text-xs">
                  <li>
                    <BilingualText
                      inline
                      vi="Điện thoại thông minh (Smartphone): Nhận diện mở khóa khuôn mặt (FaceID), quét mã QR thanh toán, ứng dụng tìm kiếm đồ vật qua Google Lens, nhận diện chữ viết từ hình ảnh."
                      en="Smartphones: Facial recognition unlock (FaceID), QR code scanning for payments, visual object search via Google Lens, optical character recognition (OCR) from images."
                    />
                  </li>
                  <li>
                    <BilingualText
                      inline
                      vi="Camera an ninh AI thông minh: Tự động nhận diện biển số xe vi phạm, phát hiện người lạ đột nhập vào ban đêm để kích hoạt còi báo động."
                      en="AI Smart Security Cameras: Automated license plate recognition, unauthorized intruder detection at night triggering automated alarms."
                    />
                  </li>
                  <li>
                    <BilingualText
                      inline
                      vi="Xe tự hành (Self-driving cars): Hệ thống camera và cảm biến thị giác máy tính nhận dạng vạch kẻ đường, đèn tín hiệu giao thông, biển báo và người đi bộ để tự động giảm tốc độ."
                      en="Autonomous Vehicles (Self-driving cars): Computer vision cameras and sensors detecting road lane markings, traffic lights, traffic signs, and pedestrians to automatically brake and steer."
                    />
                  </li>
                  <li>
                    <BilingualText
                      inline
                      vi="Cửa kiểm soát xuất nhập cảnh tại sân bay: Tự động quét và đối chiếu khuôn mặt hành khách với ảnh hộ chiếu điện tử (e-Passport)."
                      en="Automated Airport E-Gates: High-speed facial scanning matching passenger faces against biometric e-Passports."
                    />
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Practice 2 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-amber-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                2
              </span>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                  {bilingualMode === 'en'
                    ? 'Practice 2: Office productivity software has become the most widely used software. State the benefits and impact of office productivity software.'
                    : 'Luyện tập 2: Các phần mềm tin học văn phòng đã trở thành các phần mềm được dùng nhiều nhất. Em hãy nêu tác dụng của các phần mềm tin học văn phòng.'}
                </h3>
              </div>
            </div>

            {/* Interactive Matching Challenge */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {bilingualMode === 'en'
                    ? 'Interactive Matching: Match each software category to its primary purpose'
                    : 'Thử thách tương tác: Ghép nối đúng phần mềm với chức năng cốt lõi'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {/* Word Match */}
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-indigo-700 dark:text-indigo-400">
                    <FileText className="w-4 h-4" />
                    <span>1. Word / Docs</span>
                  </div>
                  <select
                    value={p2Matches.word}
                    onChange={(e) => {
                      setP2Checked(false);
                      setP2Matches({ ...p2Matches, word: e.target.value });
                    }}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg p-2 text-xs font-medium"
                  >
                    <option value="">{bilingualMode === 'en' ? '-- Select purpose --' : '-- Chọn công dụng --'}</option>
                    <option value="doc">
                      {bilingualMode === 'en' ? 'Word processing, contracts, lesson plans, official dispatches' : 'Soạn thảo văn bản, hợp đồng, giáo án, công văn'}
                    </option>
                    <option value="sheet">
                      {bilingualMode === 'en' ? 'Spreadsheet calculations, accounting, data charts' : 'Tính toán bảng tính số liệu, kế toán, biểu đồ'}
                    </option>
                    <option value="slide">
                      {bilingualMode === 'en' ? 'Slide presentations, visual animations, interactive lectures' : 'Trình chiếu slide thuyết trình, hiệu ứng sinh động'}
                    </option>
                  </select>
                </div>

                {/* Excel Match */}
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400">
                    <Table className="w-4 h-4" />
                    <span>2. Excel / Sheets</span>
                  </div>
                  <select
                    value={p2Matches.excel}
                    onChange={(e) => {
                      setP2Checked(false);
                      setP2Matches({ ...p2Matches, excel: e.target.value });
                    }}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg p-2 text-xs font-medium"
                  >
                    <option value="">{bilingualMode === 'en' ? '-- Select purpose --' : '-- Chọn công dụng --'}</option>
                    <option value="doc">
                      {bilingualMode === 'en' ? 'Word processing, contracts, lesson plans, official dispatches' : 'Soạn thảo văn bản, hợp đồng, giáo án, công văn'}
                    </option>
                    <option value="sheet">
                      {bilingualMode === 'en' ? 'Spreadsheet calculations, accounting, data charts' : 'Tính toán bảng tính số liệu, kế toán, biểu đồ'}
                    </option>
                    <option value="slide">
                      {bilingualMode === 'en' ? 'Slide presentations, visual animations, interactive lectures' : 'Trình chiếu slide thuyết trình, hiệu ứng sinh động'}
                    </option>
                  </select>
                </div>

                {/* PowerPoint Match */}
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400">
                    <Presentation className="w-4 h-4" />
                    <span>3. PowerPoint / Slides</span>
                  </div>
                  <select
                    value={p2Matches.powerpoint}
                    onChange={(e) => {
                      setP2Checked(false);
                      setP2Matches({ ...p2Matches, powerpoint: e.target.value });
                    }}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg p-2 text-xs font-medium"
                  >
                    <option value="">{bilingualMode === 'en' ? '-- Select purpose --' : '-- Chọn công dụng --'}</option>
                    <option value="doc">
                      {bilingualMode === 'en' ? 'Word processing, contracts, lesson plans, official dispatches' : 'Soạn thảo văn bản, hợp đồng, giáo án, công văn'}
                    </option>
                    <option value="sheet">
                      {bilingualMode === 'en' ? 'Spreadsheet calculations, accounting, data charts' : 'Tính toán bảng tính số liệu, kế toán, biểu đồ'}
                    </option>
                    <option value="slide">
                      {bilingualMode === 'en' ? 'Slide presentations, visual animations, interactive lectures' : 'Trình chiếu slide thuyết trình, hiệu ứng sinh động'}
                    </option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCheckP2}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{bilingualMode === 'en' ? 'Check Matching' : 'Kiểm tra kết quả ghép nối'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowP2Solution(!showP2Solution)}
                  className="px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200 dark:hover:bg-amber-900/80 border border-amber-300 dark:border-amber-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>
                    {showP2Solution
                      ? (bilingualMode === 'en' ? 'Hide Comprehensive Breakdown' : 'Ẩn gợi ý tác dụng chuẩn SGK')
                      : (bilingualMode === 'en' ? 'Show Comprehensive Breakdown' : 'Xem gợi ý tác dụng chuẩn SGK')}
                  </span>
                  {showP2Solution ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {p2Checked && (
                <div className={`p-3 rounded-xl border text-xs ${
                  p2Matches.word === 'doc' && p2Matches.excel === 'sheet' && p2Matches.powerpoint === 'slide'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800'
                    : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-800'
                }`}>
                  {p2Matches.word === 'doc' && p2Matches.excel === 'sheet' && p2Matches.powerpoint === 'slide' ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        <strong>{bilingualMode === 'en' ? 'Excellent match!' : 'Rất chính xác!'}</strong>{' '}
                        {bilingualMode === 'en'
                          ? 'Word specializes in word processing, Excel in numerical spreadsheets and calculation, and PowerPoint in visual slide presentations!'
                          : 'Word chuyên soạn thảo văn bản, Excel chuyên xử lý bảng tính số liệu tính toán, PowerPoint chuyên trình chiếu thuyết trình sinh động!'}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>
                        <strong>{bilingualMode === 'en' ? 'Not quite matched yet:' : 'Chưa hoàn toàn khớp:'}</strong>{' '}
                        {bilingualMode === 'en'
                          ? 'Pair Word with word processing, Excel with numerical spreadsheets, and PowerPoint with presentation slides. Click "Show Comprehensive Breakdown" for detailed guidance!'
                          : 'Hãy ghép Word với văn bản, Excel với tính toán số liệu và PowerPoint với slide trình chiếu. Bấm "Xem gợi ý tác dụng chuẩn SGK" để tham khảo phân tích chi tiết nhé!'}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 3 Categories Explorer (Hidden by default, toggleable) */}
            {showP2Solution && (
              <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-slate-800 border border-emerald-200 dark:border-slate-700 space-y-3 animate-in fade-in">
                <div className="font-bold text-emerald-950 dark:text-emerald-200 flex items-center gap-1.5 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>
                    {bilingualMode === 'en'
                      ? 'Major Benefits Across 3 Core Office Applications:'
                      : 'Tác dụng to lớn của 3 nhóm phần mềm tin học văn phòng:'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Word */}
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300 flex items-center justify-center font-bold">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="font-black text-indigo-700 dark:text-indigo-300 text-xs">
                        {bilingualMode === 'en' ? 'Word Processing (Word, Docs)' : 'Soạn thảo văn bản (Word, Docs)'}
                      </div>
                    </div>
                    <BilingualText
                      vi="Tạo tài liệu, công văn, hợp đồng, bài báo cáo; kiểm tra chính tả, định dạng phông chữ chuyên nghiệp và in ấn chuẩn xác."
                      en="Drafting documents, official dispatches, contracts, and reports; spell checking, professional typography formatting, and precise printing."
                      viClassName="text-[11px] text-slate-600 dark:text-slate-300"
                      enClassName="text-[10px]"
                    />
                    <div className="pt-1 border-t border-slate-100 dark:border-slate-600 text-[10px] text-slate-500 font-medium">
                      {bilingualMode === 'en'
                        ? 'Example: Teachers draft syllabi, lawyers write legal briefs.'
                        : 'Ví dụ: Giáo viên soạn giáo án, luật sư soạn hợp đồng.'}
                    </div>
                  </div>

                  {/* Excel */}
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300 flex items-center justify-center font-bold">
                        <Table className="w-4 h-4" />
                      </div>
                      <div className="font-black text-emerald-700 dark:text-emerald-300 text-xs">
                        {bilingualMode === 'en' ? 'Spreadsheets (Excel, Sheets)' : 'Bảng tính điện tử (Excel, Sheets)'}
                      </div>
                    </div>
                    <BilingualText
                      vi="Tính toán số liệu kế toán, quản lí điểm số, tự động tính tổng, trung bình bằng công thức và vẽ biểu đồ trực quan hóa dữ liệu."
                      en="Financial accounting calculations, grade management, automated formulas for sums and averages, and visual data charting."
                      viClassName="text-[11px] text-slate-600 dark:text-slate-300"
                      enClassName="text-[10px]"
                    />
                    <div className="pt-1 border-t border-slate-100 dark:border-slate-600 text-[10px] text-slate-500 font-medium">
                      {bilingualMode === 'en'
                        ? 'Example: Accountants calculate payroll, stores track stock.'
                        : 'Ví dụ: Kế toán tính lương, cửa hàng theo dõi tồn kho.'}
                    </div>
                  </div>

                  {/* PowerPoint */}
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300 flex items-center justify-center font-bold">
                        <Presentation className="w-4 h-4" />
                      </div>
                      <div className="font-black text-amber-700 dark:text-amber-300 text-xs">
                        {bilingualMode === 'en'
                          ? 'Presentation Software (PowerPoint, Slides)'
                          : 'Trình chiếu thuyết trình (PowerPoint, Slides)'}
                      </div>
                    </div>
                    <BilingualText
                      vi="Trình bày ý tưởng với hiệu ứng chuyển động, video, hình ảnh minh họa sinh động phục vụ giảng dạy, hội thảo và kinh doanh."
                      en="Presenting ideas dynamically with animations, videos, and vivid visuals for teaching, seminars, and business pitches."
                      viClassName="text-[11px] text-slate-600 dark:text-slate-300"
                      enClassName="text-[10px]"
                    />
                    <div className="pt-1 border-t border-slate-100 dark:border-slate-600 text-[10px] text-slate-500 font-medium">
                      {bilingualMode === 'en'
                        ? 'Example: Interactive classroom lectures, business pitch decks.'
                        : 'Ví dụ: Bài giảng tương tác tại lớp, dự án khởi nghiệp.'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Apply Questions */}
      {activeTab === 'apply' && (
        <div className="space-y-5 animate-in fade-in">
          {/* Apply 1 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                1
              </span>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                  {bilingualMode === 'en'
                    ? 'Application 1: Explore smart traffic monitoring camera systems in smart cities'
                    : 'Vận dụng 1: Tìm hiểu hệ thống camera thông minh giám sát giao thông đô thị'}
                </h3>
              </div>
            </div>

            {/* Interactive App 1 Prompt */}
            <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-slate-800/90 border border-indigo-200 dark:border-indigo-900/60 space-y-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="font-bold text-xs sm:text-sm text-indigo-950 dark:text-indigo-200">
                  {bilingualMode === 'en'
                    ? 'Interactive Scenario: How does the AI camera system handle an automated red-light violation?'
                    : 'Câu hỏi tình huống: Khi một phương tiện vượt đèn đỏ tại ngã tư thông minh, quy trình xử lý tự động của camera AI diễn ra như thế nào?'}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { id: 0, textVi: 'A. Camera AI ghi hình thời gian thực -> Nhận diện biển số (ALPR) qua mạng 4G/5G/cáp quang về trung tâm điều hành ITS -> Tự động đối chiếu CSDL đăng kiểm và gửi thông báo phạt nguội minh bạch.', textEn: 'A. Real-time capture -> Automated license plate recognition (ALPR) over 4G/5G/fiber to ITS command center -> Automated vehicle registry lookup and transparent citation issuance.', correct: true },
                  { id: 1, textVi: 'B. Camera tự động phóng tia cản trở bánh xe hoặc ngắt nguồn điện trên đường để phương tiện dừng lại.', textEn: 'B. Camera triggers mechanical road blocks or cuts roadside electricity to force a stop.', correct: false },
                  { id: 2, textVi: 'C. Camera chỉ lưu video vào thẻ nhớ nội bộ và cần cảnh sát tới tận nơi trèo lên cột đèn tháo thẻ nhớ ra xem.', textEn: 'C. Video remains trapped in internal memory requiring officers to physically dismantle the camera.', correct: false },
                ].map((opt) => {
                  const isSelected = app1Choice === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setApp1Checked(false);
                        setApp1Choice(opt.id);
                      }}
                      className={`w-full p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs font-semibold'
                          : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-[10px] ${
                        isSelected ? 'border-white bg-white text-indigo-700 font-bold' : 'border-slate-400'
                      }`}>
                        {isSelected ? '✓' : ''}
                      </span>
                      <span>{bilingualMode === 'en' ? opt.textEn : opt.textVi}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCheckApp1}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{bilingualMode === 'en' ? 'Check My Choice' : 'Kiểm tra nhận định'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowApp1Solution(!showApp1Solution)}
                  className="px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200 dark:hover:bg-amber-900/80 border border-amber-300 dark:border-amber-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>
                    {showApp1Solution
                      ? (bilingualMode === 'en' ? 'Hide Architecture & Benefits' : 'Ẩn gợi ý phân tích chuẩn SGK')
                      : (bilingualMode === 'en' ? 'Show Architecture & Benefits' : 'Xem gợi ý phân tích chuẩn SGK')}
                  </span>
                  {showApp1Solution ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {app1Checked && (
                <div className={`p-3 rounded-xl border text-xs ${
                  app1Choice === 0
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800'
                    : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-800'
                }`}>
                  {app1Choice === 0 ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        <BilingualText
                          vi="Camera AI truyền video về máy chủ trung tâm qua mạng quang/5G, dùng thị giác máy tính nhận dạng biển số và tự động xử phạt nguội chuẩn xác, minh bạch!"
                          en="AI Cameras stream video to cloud servers via optical/5G links, using computer vision to recognize license plates and automate traffic penalties transparently!"
                        />
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>
                        <BilingualText
                          vi="Camera giao thông ứng dụng đường truyền số liệu tốc độ cao (4G/5G/cáp quang) và AI nhận diện biển số tự động."
                          en="Traffic cameras utilize broadband telecommunications (4G/5G/fiber) and AI computer vision for autonomous license recognition."
                        />
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Architecture & Benefits (Hidden by default, toggleable) */}
            {showApp1Solution && (
              <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-slate-800 border border-indigo-200 dark:border-slate-700 space-y-3 animate-in fade-in">
                <div className="font-bold text-indigo-950 dark:text-indigo-200 flex items-center gap-1.5 text-xs sm:text-sm">
                  <Radio className="w-4 h-4 text-indigo-600" />
                  <span>
                    {bilingualMode === 'en'
                      ? 'Connectivity Architecture & Societal Benefits:'
                      : 'Phương thức kết nối & Lợi ích xã hội chuẩn SGK:'}
                  </span>
                </div>

                <div className="space-y-3 text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
                  <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-indigo-100 dark:border-slate-700 space-y-1">
                    <strong className="text-indigo-900 dark:text-indigo-300 font-bold block text-xs">
                      {bilingualMode === 'en' ? '1. Connectivity Architecture:' : '1. Cách thức kết nối mạng:'}
                    </strong>
                    <BilingualText
                      vi="Các camera AI được gắn trên cột đèn tại các ngã tư, kết nối qua mạng cáp quang tốc độ cao hoặc mạng di động 4G/5G chuyên dụng để truyền dữ liệu video thời gian thực về Trung tâm điều hành giao thông thông minh (ITS). Dữ liệu được xử lí bởi máy chủ AI để nhận diện biển số xe và phân tích lưu lượng."
                      en="AI cameras mounted on traffic light poles at intersections connect via high-speed fiber-optic or dedicated 4G/5G networks to stream real-time video to the Intelligent Transportation System (ITS) control center. Video streams are analyzed by AI servers to recognize license plates and track traffic flow."
                      viClassName="text-xs"
                    />
                  </div>

                  <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-indigo-100 dark:border-slate-700 space-y-2">
                    <strong className="text-indigo-900 dark:text-indigo-300 font-bold block text-xs">
                      {bilingualMode === 'en' ? '2. Major Societal Benefits:' : '2. Lợi ích to lớn đối với xã hội:'}
                    </strong>
                    <ul className="list-disc list-inside space-y-1.5 pl-1 text-xs">
                      <li>
                        <BilingualText
                          inline
                          vi="Tự động điều tiết chu kì đèn xanh/đèn đỏ linh hoạt theo lượng xe thực tế, giúp giảm ùn tắc giao thông giờ cao điểm."
                          en="Dynamically adjusting green/red traffic light timings based on real-time vehicle density, drastically reducing rush-hour congestion."
                        />
                      </li>
                      <li>
                        <BilingualText
                          inline
                          vi="Tự động phát hiện lỗi vi phạm (vượt đèn đỏ, lấn làn, quá tốc độ) để gửi biên bản phạt nguội chính xác, minh bạch."
                          en="Automatically detecting violations (running red lights, improper lane usage, speeding) to issue accurate, transparent automated fine citations."
                        />
                      </li>
                      <li>
                        <BilingualText
                          inline
                          vi="Hỗ trợ điều tra, truy vết nhanh các phương tiện liên quan đến tai nạn giao thông hoặc tội phạm hình sự."
                          en="Assisting law enforcement in rapid tracing and forensic investigation of vehicles involved in traffic incidents or criminal activities."
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Apply 2 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                2
              </span>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                  {bilingualMode === 'en'
                    ? 'Application 2: Autonomous vehicles in Industry 4.0 (Reducing pollution, congestion, and costs)'
                    : 'Vận dụng 2: Xe tự hành trong CMCN 4.0 (Giảm ô nhiễm, ùn tắc và chi phí)'}
                </h3>
              </div>
            </div>

            {/* Interactive App 2 Quiz */}
            <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-slate-800/90 border border-emerald-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {bilingualMode === 'en'
                    ? 'Interactive Analysis: Select the true drivers enabling autonomous vehicles to reduce congestion, pollution, and costs:'
                    : 'Câu hỏi phân tích: Hãy chọn các yếu tố giúp xe tự hành giảm ô nhiễm môi trường, giảm ùn tắc và tiết kiệm chi phí:'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  { id: 0, textVi: '1. Sử dụng động cơ điện (EV) không phát thải khí độc hại và AI điều tiết năng lượng mượt mà', textEn: '1. Clean electric powertrains (EV) with zero tailpipe emissions and smooth AI energy usage', correct: true },
                  { id: 1, textVi: '2. Kết nối mạng giữa các xe (V2V) giúp duy trì cự ly an toàn, chống lấn làn và tự động chuyển hướng đường vắng', textEn: '2. Vehicle-to-vehicle (V2V) networks keeping safe spacing and dynamically avoiding gridlock', correct: true },
                  { id: 2, textVi: '3. Mô hình dịch vụ chia sẻ xe (Robotaxi) giúp giảm nhu cầu mua xe cá nhân, phí đỗ xe và chi phí xã hội', textEn: '3. Shared autonomous mobility (Robotaxis) eliminating high personal car ownership costs', correct: true },
                  { id: 3, textVi: '4. Xe tự hành có thể chạy trên vỉa hè dành cho người đi bộ khi đường bị tắc', textEn: '4. Autonomous cars can drive on pedestrian sidewalks to bypass traffic', correct: false },
                ].map((item) => {
                  const isSelected = app2Selected.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setApp2Checked(false);
                        if (isSelected) {
                          setApp2Selected(app2Selected.filter((id) => id !== item.id));
                        } else {
                          setApp2Selected([...app2Selected, item.id]);
                        }
                      }}
                      className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-emerald-300'
                      }`}
                    >
                      <span className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 text-xs font-bold border ${
                        isSelected ? 'bg-white text-emerald-700 border-white' : 'border-slate-400 dark:border-slate-600'
                      }`}>
                        {isSelected && '✓'}
                      </span>
                      <span className="text-xs font-medium">
                        {bilingualMode === 'en' ? item.textEn : item.textVi}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCheckApp2}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{bilingualMode === 'en' ? 'Check Analysis' : 'Kiểm tra phân tích'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowApp2Solution(!showApp2Solution)}
                  className="px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200 dark:hover:bg-amber-900/80 border border-amber-300 dark:border-amber-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>
                    {showApp2Solution
                      ? (bilingualMode === 'en' ? 'Hide 3 Core Pillars' : 'Ẩn gợi ý phân tích chuẩn SGK')
                      : (bilingualMode === 'en' ? 'Show 3 Core Pillars' : 'Xem gợi ý phân tích chuẩn SGK')}
                  </span>
                  {showApp2Solution ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {app2Checked && (
                <div className={`p-3 rounded-xl border text-xs ${
                  app2Selected.includes(0) && app2Selected.includes(1) && app2Selected.includes(2) && !app2Selected.includes(3)
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800'
                    : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-800'
                }`}>
                  {app2Selected.includes(0) && app2Selected.includes(1) && app2Selected.includes(2) && !app2Selected.includes(3) ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        <strong>{bilingualMode === 'en' ? 'Outstanding analysis!' : 'Phân tích xuất sắc!'}</strong>{' '}
                        {bilingualMode === 'en'
                          ? 'All 3 pillars (1, 2, 3) are revolutionary benefits of autonomous vehicles for smart cities in the Industry 4.0 era!'
                          : 'Cả 3 trụ cột (1, 2, 3) đều là lợi ích mang tính cách mạng của xe tự hành đối với đô thị thông minh trong thời đại 4.0!'}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>
                        <strong>{bilingualMode === 'en' ? 'Hint:' : 'Gợi ý:'}</strong>{' '}
                        {bilingualMode === 'en'
                          ? 'Autonomous vehicles follow strict safety rules and do not drive on sidewalks (4). Items 1, 2, and 3 are correct core pillars. Click "Show 3 Core Pillars" for full details!'
                          : 'Xe tự hành tuân thủ luật an toàn nghiêm ngặt, không chạy trên vỉa hè (4). Các ý 1, 2, 3 là các trụ cột chính xác. Bấm "Xem gợi ý phân tích chuẩn SGK" để xem chi tiết nhé!'}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Analysis of 3 Core Pillars (Hidden by default, toggleable) */}
            {showApp2Solution && (
              <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-slate-800 border border-emerald-200 dark:border-slate-700 space-y-3 animate-in fade-in">
                <div className="font-bold text-emerald-950 dark:text-emerald-200 flex items-center gap-1.5 text-xs sm:text-sm">
                  <Car className="w-4 h-4 text-emerald-600" />
                  <span>
                    {bilingualMode === 'en'
                      ? 'Analysis of 3 Core Pillars of Autonomous Mobility:'
                      : 'Phân tích 3 lợi ích cốt lõi của xe tự hành chuẩn SGK:'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                  {/* Environment */}
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 space-y-1.5">
                    <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1 text-xs">
                      <span>🌱</span>
                      <span>
                        {bilingualMode === 'en'
                          ? 'Environmental Pollution Reduction'
                          : 'Giảm ô nhiễm môi trường'}
                      </span>
                    </div>
                    <BilingualText
                      vi="Đa số xe tự hành sử dụng động cơ điện (EV). Thuật toán AI điều khiển ga phanh nhịp nhàng, tối ưu hóa năng lượng và không thải khí độc hại ra đường phố."
                      en="Most autonomous vehicles run on clean electric powertrains (EV). AI algorithms optimize smooth acceleration and braking, saving energy with zero street emissions."
                      viClassName="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed"
                      enClassName="text-[10px]"
                    />
                  </div>

                  {/* Congestion */}
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 space-y-1.5">
                    <div className="font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-1 text-xs">
                      <span>🚦</span>
                      <span>
                        {bilingualMode === 'en' ? 'Traffic Congestion Mitigation' : 'Giảm ùn tắc giao thông'}
                      </span>
                    </div>
                    <BilingualText
                      vi="Các xe tự hành giao tiếp với nhau qua mạng (V2V), duy trì khoảng cách tối ưu, không lấn làn hay vượt ẩu, tự động chuyển sang tuyến đường vắng hơn."
                      en="Autonomous vehicles communicate via vehicle-to-vehicle (V2V) networks, maintaining optimal spacing, avoiding reckless lane cuts, and dynamically rerouting to clear roads."
                      viClassName="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed"
                      enClassName="text-[10px]"
                    />
                  </div>

                  {/* Cost */}
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 space-y-1.5">
                    <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1 text-xs">
                      <span>💰</span>
                      <span>
                        {bilingualMode === 'en' ? 'Economic & Societal Cost Savings' : 'Tiết kiệm chi phí xã hội'}
                      </span>
                    </div>
                    <BilingualText
                      vi="Người dân không cần mua xe, không tốn tiền gửi xe, tiền bảo dưỡng hay tiền xăng. Mô hình chia sẻ xe (Robotaxi) giúp chi phí đi lại rẻ hơn rất nhiều."
                      en="Citizens save on car ownership, parking fees, insurance, and fuel costs. Autonomous ride-sharing fleets (Robotaxis) make transportation remarkably affordable."
                      viClassName="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed"
                      enClassName="text-[10px]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Teacher Pedagogical Question Prompts & Guidance */}
      <TeacherPromptsWidget sectionIndex={5} lessonId={2} className="mt-4" />
    </div>
  );
};
