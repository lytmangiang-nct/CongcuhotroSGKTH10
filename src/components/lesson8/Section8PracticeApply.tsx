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
  Truck,
  Car,
  Cloud,
  Check,
  X,
  Lightbulb,
  Info,
  Compass,
  MapPin,
  Clock,
  ShieldAlert,
  Share2
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section8PracticeApply: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    prevPage,
    setOriginalPageTarget,
    setShowQuizModal,
    certificate,
    isAllSectionsComplete
  } = useBook();

  // Practice 1 & 2 toggles
  const [showPractice1Answer, setShowPractice1Answer] = useState(false);
  const [showPractice2Answer, setShowPractice2Answer] = useState(false);

  // Application 1 & 2 toggles
  const [showApp1Answer, setShowApp1Answer] = useState(false);
  const [showApp2Answer, setShowApp2Answer] = useState(false);

  // Interactive Black Box Vehicle Tracker simulator (Vận dụng 2)
  const [simSpeed, setSimSpeed] = useState(88); // km/h
  const [simDriveHours, setSimDriveHours] = useState(4.2); // hours continuous
  const [simRoadLimit] = useState(80); // km/h

  const sectionSpeechVi =
    'Phần Luyện tập và Vận dụng Bài 8. Phân tích ích lợi của thu phí không dừng ETC; nhận diện mô hình đám mây của mạng xã hội Facebook, YouTube; khám phá các dịch vụ đám mây Make-in-Vietnam; và phân tích dữ liệu hộp đen giám sát hành trình xe tải để phát hiện vi phạm giao thông. Hoàn thành bài kiểm tra 10 câu để nhận Giấy chứng nhận chính thức KNTT10-B8.';
  const sectionSpeechEn =
    'Section 5: Practice and Real-World Applications for Lesson 8. Analyze advantages of RFID electronic toll collection, recognize cloud delivery models in YouTube and Facebook, explore Vietnamese cloud platforms, and analyze commercial vehicle tracking black boxes to detect traffic violations. Complete the 10-question evaluation to unlock certificate KNTT10-B8.';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(
        bilingualMode === 'en' ? sectionSpeechEn : sectionSpeechVi,
        bilingualMode === 'en' ? 'en' : 'vi'
      );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-mono font-bold text-xs uppercase">
              {bilingualMode === 'en' ? 'Practice & Apply • Page 43' : 'Luyện tập & Vận dụng • Trang 43 SGK'}
            </span>
            <button
              type="button"
              onClick={() => setOriginalPageTarget(43)}
              className="text-xs text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold cursor-pointer underline"
            >
              {bilingualMode === 'en' ? 'View Textbook p. 43' : 'Xem trang 43 SGK gốc'}
            </button>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">
            <BilingualText
              vi="LUYỆN TẬP, VẬN DỤNG & ĐÁNH GIÁ NĂNG LỰC"
              en="PRACTICE, REAL-WORLD APPLICATIONS & EVALUATION"
            />
          </h2>
        </div>
      </div>

      {/* Practice Exercises (SGK Trang 43) */}
      <div className="space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          <BilingualText vi="Phần Luyện tập (SGK Trang 43)" en="Practice Exercises (Page 43)" />
        </h3>

        {/* Practice 1 */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-slate-100">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center">1</span>
              <span>
                <BilingualText
                  vi="Phân tích ích lợi của giải pháp thu phí không dừng (ETC) trên đường cao tốc"
                  en="Analyze the Benefits of Electronic Toll Collection (ETC) on Expressways"
                />
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowPractice1Answer(!showPractice1Answer)}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              {showPractice1Answer ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showPractice1Answer ? 'Ẩn phân tích' : 'Xem phân tích chuẩn SGK'}</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Hãy liệt kê ít nhất 4 lợi ích thiết thực của việc áp dụng toàn diện hệ thống thu phí tự động không dừng ETC bằng sóng RFID đối với tài xế, doanh nghiệp vận tải và xã hội.
          </p>

          {showPractice1Answer && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
              <div className="font-bold text-emerald-700 dark:text-emerald-400">4 Lợi ích cốt lõi chuẩn hoá:</div>
              <ul className="space-y-1 list-disc list-inside">
                <li><strong>Triệt tiêu ùn tắc giao thông:</strong> Xe lưu thông liên tục qua trạm với vận tốc 60 km/h, không còn cảnh xếp hàng dài chờ mua vé xé tay.</li>
                <li><strong>Tiết kiệm thời gian & chi phí vận tải:</strong> Rút ngắn thời gian hành trình liên tỉnh, giúp xe quay vòng nhanh hơn.</li>
                <li><strong>Tiết kiệm nhiên liệu & bảo vệ môi trường:</strong> Xe không phải phanh dừng rồi tăng ga khởi động lại, giảm hao mòn phanh lốp và giảm lượng khí thải CO₂ độc hại.</li>
                <li><strong>Minh bạch tài chính 100%:</strong> Giao dịch số qua tài khoản ngân hàng, lưu vết điện tử chính xác, chống thất thoát tiền mặt tại các dự án BOT.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Practice 2 */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-slate-100">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center">2</span>
              <span>
                <BilingualText
                  vi="Mạng xã hội Facebook, YouTube miễn phí nhưng thu tiền quảng cáo có phải là dịch vụ đám mây?"
                  en="Are Ad-Funded Social Networks (Facebook, YouTube) Cloud Services?"
                />
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowPractice2Answer(!showPractice2Answer)}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              {showPractice2Answer ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showPractice2Answer ? 'Ẩn phân tích' : 'Xem lời giải chuẩn SGK'}</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Các mạng xã hội như Facebook, YouTube cho mọi người dùng miễn phí, nhưng nếu ai sử dụng để bán hàng hay quảng cáo thì phải trả tiền. Đây có phải là dịch vụ đám mây không?
          </p>

          {showPractice2Answer && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
              <strong className="text-emerald-700 dark:text-emerald-400">Kết luận: HOÀN TOÀN LÀ DỊCH VỤ ĐÁM MÂY (Mô hình SaaS kết hợp IaaS).</strong>
              <p>
                Người dùng không cần mua sắm máy chủ lưu trữ hàng triệu gigabyte video mà mọi tài nguyên đều nằm trên đám mây của Google và Meta. Về mặt kinh tế, đây là mô hình kinh doanh kết hợp <em>Freemium</em> và <em>Ad-funded (Quảng cáo tài trợ)</em>: dịch vụ cơ bản được miễn phí cho người dùng phổ thông, và nhà cung cấp thu lợi nhuận từ các tổ chức mua quảng cáo hoặc dịch vụ nâng cao (YouTube Premium, Facebook Ads).
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Real-World Applications (SGK Trang 43) */}
      <div className="space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Compass className="w-5 h-5 text-indigo-600" />
          <BilingualText vi="Phần Vận dụng thực tế (SGK Trang 43)" en="Real-World Application Tasks (Page 43)" />
        </h3>

        {/* Application 1 */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-slate-100">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">1</span>
              <span>
                <BilingualText
                  vi="Ứng dụng điện toán đám mây của doanh nghiệp Việt Nam"
                  en="Cloud Computing Platforms Built by Vietnamese Enterprises"
                />
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowApp1Answer(!showApp1Answer)}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              {showApp1Answer ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showApp1Answer ? 'Ẩn dẫn chứng' : 'Xem các nền tảng Make in Vietnam'}</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Tìm qua Internet một ứng dụng điện toán đám mây của một doanh nghiệp Việt Nam phục vụ cơ quan nhà nước hoặc người dân.
          </p>

          {showApp1Answer && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
              <ul className="space-y-1.5">
                <li><strong>Viettel Cloud:</strong> Hệ sinh thái đám mây hoàn chỉnh nhất Việt Nam gồm IaaS, PaaS, SaaS với 13 trung tâm dữ liệu lớn, phục vụ chuyển đổi số chính phủ và ngân hàng.</li>
                <li><strong>VNPT Cloud:</strong> Dịch vụ máy chủ ảo và lưu trữ an toàn thông tin cấp độ 4, phục vụ cổng Dịch vụ công quốc gia và ngành Giáo dục.</li>
                <li><strong>FPT Smart Cloud:</strong> Nền tảng đám mây tích hợp trí tuệ nhân tạo (AI Platform) tối ưu cho quản trị doanh nghiệp.</li>
                <li><strong>VNG Cloud:</strong> Cung cấp hạ tầng lưu trữ media và game trực tuyến tốc độ cao trong nước.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Application 2: Black Box Vehicle Tracker */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-slate-100">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">2</span>
              <span>
                <BilingualText
                  vi="Bộ giám sát hành trình (Hộp đen) xe tải/xe khách: Cứ 30 giây gửi dữ liệu tốc độ và toạ độ"
                  en="Commercial Vehicle Black Box Tracker: Transmitting GPS & Speed Every 30 Seconds"
                />
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowApp2Answer(!showApp2Answer)}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              {showApp2Answer ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showApp2Answer ? 'Ẩn phân tích' : 'Xem các vi phạm phát hiện được'}</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Bộ giám sát hành trình trên xe tải hoặc xe khách hiện nay, cứ 30 giây một lần lại gửi dữ liệu tốc độ, toạ độ cùng thời điểm lấy toạ độ của xe về máy chủ giám sát. Với dữ liệu đó, có thể biết được những vi phạm giao thông nào của lái xe?
          </p>

          {/* Interactive Tracker Simulator Widget */}
          <div className="p-4 rounded-xl bg-slate-950 text-white border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Truck className="w-4 h-4" />
                Mô phỏng dữ liệu GPS hộp đen xe khách (Cập nhật chu kỳ 30s)
              </span>
              <span className="font-mono text-slate-400 text-[11px]">Giao thức: Cellular 4G IoT</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Tốc độ xe tức thời:</span>
                  <span className={`font-mono font-bold ${simSpeed > simRoadLimit ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {simSpeed} km/h (Giới hạn: {simRoadLimit} km/h)
                  </span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={120}
                  value={simSpeed}
                  onChange={(e) => setSimSpeed(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Thời gian lái xe liên tục:</span>
                  <span className={`font-mono font-bold ${simDriveHours > 4.0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {simDriveHours.toFixed(1)} giờ (Quy định: ≤ 4.0h)
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={8}
                  step={0.1}
                  value={simDriveHours}
                  onChange={(e) => setSimDriveHours(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Live violation alerts */}
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] flex flex-wrap gap-2 items-center">
              <span className="font-bold text-slate-400">Kết quả phân tích máy chủ:</span>
              {simSpeed > simRoadLimit && (
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40">
                  ⚠ CHẠY QUÁ TỐC ĐỘ (+{simSpeed - simRoadLimit} km/h)
                </span>
              )}
              {simDriveHours > 4.0 && (
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                  ⚠ VI PHẠM LÁI LIÊN TỤC QUÁ 4 TIẾNG
                </span>
              )}
              {simSpeed <= simRoadLimit && simDriveHours <= 4.0 && (
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                  ✓ VẬN HÀNH ĐÚNG QUY CHUẨN AN TOÀN
                </span>
              )}
            </div>
          </div>

          {showApp2Answer && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
              <div className="font-bold text-indigo-700 dark:text-indigo-400">Các vi phạm giao thông mà máy chủ giám sát phát hiện ngay lập tức:</div>
              <ul className="space-y-1 list-disc list-inside">
                <li><strong>Chạy quá tốc độ tối đa cho phép:</strong> Đối chiếu toạ độ GPS của xe trên đoạn đường cụ thể với biển báo tốc độ quy định trên bản đồ số.</li>
                <li><strong>Lái xe liên tục quá 4 giờ:</strong> Luật Giao thông đường bộ quy định tài xế không được lái xe liên tục quá 4 tiếng mà không nghỉ.</li>
                <li><strong>Lái xe quá 10 giờ trong một ngày:</strong> Tổng hợp thời gian nổ máy lăn bánh của xe trong 24 giờ.</li>
                <li><strong>Đi sai luồng tuyến, đi vào đường cấm:</strong> Kiểm tra toạ độ vị trí xe có nằm ngoài tuyến đường đăng ký hoặc đi vào đường cấm tải trọng.</li>
                <li><strong>Dừng đỗ đón trả khách sai quy định:</strong> Xe dừng đỗ kéo dài tại các vị trí cấm dừng đỗ hoặc ngoài trạm dừng nghỉ.</li>
              </ul>
            </div>
          )}
        </div>
      </div>



      {/* Pedagogical Prompts */}
      <TeacherPromptsWidget sectionIndex={5} lessonId={8} />

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={prevPage}
          className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm flex items-center gap-2 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'Back: Internet of Things' : 'Quay lại: Kết nối vạn vật'}</span>
        </button>

        <button
          type="button"
          onClick={() => setShowQuizModal(true)}
          className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
        >
          <Award className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'Take Lesson 8 Quiz' : 'Làm bài kiểm tra năng lực'}</span>
        </button>
      </div>
    </div>
  );
};
