import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  HelpCircle,
  Volume2,
  ChevronDown,
  ChevronUp,
  FileQuestion,
  Sparkles,
  BookOpen,
  Share2,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Check,
  Lock,
  ArrowLeft,
  Scale
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section11PracticeApply: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    setShowQuizModal,
    setShowCertificateModal,
    certificate,
    isAllSectionsComplete,
    prevPage
  } = useBook();

  // Accordion toggle states for textbook items (SGK Trang 62)
  const [showPractice1, setShowPractice1] = useState(true);
  const [showPractice2, setShowPractice2] = useState(false);
  const [showApply1, setShowApply1] = useState(true);
  const [showApply2, setShowApply2] = useState(false);

  // Interactive quick practice on Apply 1
  const [apply1Choice, setApply1Choice] = useState<string | null>(null);
  const [apply1Submitted, setApply1Submitted] = useState(false);

  // Interactive evaluation on Practice 1 (a, b, c)
  const [opinionA, setOpinionA] = useState<'agree' | 'disagree' | 'partial' | null>(null);
  const [opinionB, setOpinionB] = useState<'agree' | 'disagree' | 'partial' | null>(null);
  const [opinionC, setOpinionC] = useState<'agree' | 'disagree' | 'partial' | null>(null);
  const [showPractice1Key, setShowPractice1Key] = useState(false);

  const sectionSpeechVi =
    'Mục 5: Luyện tập và Vận dụng Bài 11. Giải quyết 2 bài tập Luyện tập và 2 bài tập Vận dụng theo SGK Trang 62: Đánh giá 3 quan điểm về quyền đưa tin lên mạng xã hội; phân tích trách nhiệm pháp lí khi chia sẻ tin phong tỏa Covid-19 sai sự thật theo Nghị định 15; phân biệt mức độ vi phạm đạo đức hay pháp luật khi xúc phạm người khác trên mạng; và bác bỏ quan điểm không biết luật là không có lỗi khi dùng phần mềm bẻ khóa. Hãy hoàn thành bài kiểm tra 10 câu hỏi để nhận Chứng chỉ KNTT10-B11.';
  const sectionSpeechEn =
    'Section 5: Practice and Real-World Application for Lesson 11. Complete 2 practice and 2 application dilemmas from page 62: evaluating 3 opinions on online posting rights; analyzing legal accountability when recirculating Covid-19 hoaxes under Decree 15; distinguishing ethical from legal culpability in online defamation; and refuting claims that ignorance of the law excuses pirated software usage. Finish the 10-question evaluation to unlock certificate KNTT10-B11.';

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

  const isEligibleForCert =
    isAllSectionsComplete && certificate && certificate.score >= 8;

  return (
    <div className="space-y-8 animate-fadeIn text-slate-800 dark:text-slate-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-orange-800 to-indigo-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/30 text-amber-100 text-xs font-semibold backdrop-blur-sm mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>
                <BilingualText
                  vi="Tổng kết, Luyện tập & Đánh giá năng lực số"
                  en="Summary, Practice & Digital Competency Assessment"
                />
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              <BilingualText
                vi="5. LUYỆN TẬP VÀ VẬN DỤNG THỰC TẾ"
                en="5. PRACTICE EXERCISES & REAL-WORLD APPLICATIONS"
              />
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              <BilingualText
                vi="Vận dụng Luật An ninh mạng, Nghị định 15/2020 và Luật Sở hữu trí tuệ để giải quyết các tình huống pháp lý và đạo đức số trong SGK Trang 62."
                en="Apply the Cybersecurity Law, Decree 15/2020, and Intellectual Property Law to resolve realistic legal and cyber-ethical dilemmas from Page 62."
              />
            </p>
          </div>
        </div>
      </div>

      {/* Part 1: LUYỆN TẬP (SGK Trang 62) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider">
            <BilingualText vi="Phần 1: Luyện tập (SGK Trang 62)" en="Part 1: Practice Exercises (Page 62)" />
          </h3>
        </div>

        {/* Practice Item 1 */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => setShowPractice1(!showPractice1)}
            className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 font-black flex items-center justify-center text-xs">
                LT1
              </div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                <BilingualText
                  vi="Luyện tập 1: Đánh giá 3 quan điểm về quyền đưa tin lên mạng xã hội"
                  en="Practice 1: Evaluating 3 viewpoints on online posting rights"
                />
              </h4>
            </div>
            {showPractice1 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>

          {showPractice1 && (
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 space-y-4 text-xs sm:text-sm">
              <p className="text-slate-700 dark:text-slate-300 italic">
                <BilingualText
                  vi="«Trong các ý kiến sau, em đồng ý, không đồng ý hay chỉ đồng ý một phần với các ý kiến nào? Tại sao?»"
                  en="«Among the following viewpoints, do you agree, disagree, or partly agree? Why?»"
                />
              </p>

              <div className="space-y-3">
                {/* Option a */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    <BilingualText
                      vi="a) Chúng ta có quyền đưa lên mạng xã hội tất cả các tin không phải là tin giả."
                      en="a) We have the right to post on social networks any news that is not fake news."
                    />
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">
                      {bilingualMode === 'en' ? 'Your opinion:' : 'Ý kiến của em:'}
                    </span>
                    {(['disagree', 'partial', 'agree'] as const).map((choice) => (
                      <button
                        type="button"
                        key={choice}
                        onClick={() => setOpinionA(choice)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                          opinionA === choice
                            ? 'bg-amber-600 text-white'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {choice === 'disagree'
                          ? (bilingualMode === 'en' ? 'Disagree' : 'Không đồng ý')
                          : choice === 'partial'
                          ? (bilingualMode === 'en' ? 'Partly Agree' : 'Đồng ý 1 phần')
                          : (bilingualMode === 'en' ? 'Agree' : 'Đồng ý')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Option b */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    <BilingualText
                      vi="b) Chúng ta có quyền đưa lên mạng xã hội tất cả các tin miễn là không có hại đến cá nhân ai."
                      en="b) We have the right to post on social networks any news as long as it does not harm any specific individual."
                    />
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">
                      {bilingualMode === 'en' ? 'Your opinion:' : 'Ý kiến của em:'}
                    </span>
                    {(['disagree', 'partial', 'agree'] as const).map((choice) => (
                      <button
                        type="button"
                        key={choice}
                        onClick={() => setOpinionB(choice)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                          opinionB === choice
                            ? 'bg-amber-600 text-white'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {choice === 'disagree'
                          ? (bilingualMode === 'en' ? 'Disagree' : 'Không đồng ý')
                          : choice === 'partial'
                          ? (bilingualMode === 'en' ? 'Partly Agree' : 'Đồng ý 1 phần')
                          : (bilingualMode === 'en' ? 'Agree' : 'Đồng ý')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Option c */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    <BilingualText
                      vi="c) Chúng ta có quyền đưa lên mạng xã hội tất cả các tin miễn là không vi phạm pháp luật."
                      en="c) We have the right to post on social networks any news as long as it does not violate statutory law."
                    />
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">
                      {bilingualMode === 'en' ? 'Your opinion:' : 'Ý kiến của em:'}
                    </span>
                    {(['disagree', 'partial', 'agree'] as const).map((choice) => (
                      <button
                        type="button"
                        key={choice}
                        onClick={() => setOpinionC(choice)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                          opinionC === choice
                            ? 'bg-amber-600 text-white'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {choice === 'disagree'
                          ? (bilingualMode === 'en' ? 'Disagree' : 'Không đồng ý')
                          : choice === 'partial'
                          ? (bilingualMode === 'en' ? 'Partly Agree' : 'Đồng ý 1 phần')
                          : (bilingualMode === 'en' ? 'Agree' : 'Đồng ý')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowPractice1Key(!showPractice1Key)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition cursor-pointer shadow-sm"
                >
                  {showPractice1Key
                    ? (bilingualMode === 'en' ? 'Hide Analysis' : 'Ẩn phân tích chuẩn')
                    : (bilingualMode === 'en' ? 'View Textbook Explanation' : 'Xem phân tích chuẩn SGK')}
                </button>
              </div>

              {showPractice1Key && (
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 space-y-2 animate-fadeIn text-slate-800 dark:text-slate-200">
                  <h5 className="font-bold text-amber-900 dark:text-amber-200">
                    <BilingualText
                      vi="Phân tích toàn diện của chuyên gia sư phạm:"
                      en="Pedagogical Expert Analysis:"
                    />
                  </h5>
                  <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
                    <li>
                      <BilingualText
                        vi={<><strong>Ý kiến a - Không đồng ý:</strong> Dù là tin thật (ví dụ: thông tin bí mật đời tư của người khác, tài liệu mật quốc gia, hồ sơ bệnh án), việc đưa lên mạng không xin phép vẫn là vi phạm pháp luật nghiêm trọng.</>}
                        en={<><strong>Viewpoint a - Disagree:</strong> Even if true (e.g., private personal secrets, classified state archives, medical records), unauthorized posting constitutes a severe legal violation.</>}
                      />
                    </li>
                    <li>
                      <BilingualText
                        vi={<><strong>Ý kiến b - Không đồng ý:</strong> Một tin có thể không hại một cá nhân cụ thể nào, nhưng có thể xâm hại đến lợi ích chung của cộng đồng, an ninh quốc gia, trật tự xã hội hoặc thuần phong mỹ tục.</>}
                        en={<><strong>Viewpoint b - Disagree:</strong> News might not hurt a single identifiable person, yet can severely damage public order, national security, or societal welfare.</>}
                      />
                    </li>
                    <li>
                      <BilingualText
                        vi={<><strong>Ý kiến c - Chỉ đồng ý một phần:</strong> Không vi phạm pháp luật là điều kiện cần tối thiểu. Tuy nhiên, một thông tin không vi phạm pháp luật vẫn có thể vi phạm các <em>chuẩn mực đạo đức</em>, làm tổn thương tình cảm bạn bè, hoặc thiếu tính nhân văn.</>}
                        en={<><strong>Viewpoint c - Partly Agree:</strong> Lawful compliance is only the minimum prerequisite. Content that is not illegal may still breach <em>ethical norms</em>, harm human relationships, or lack civic compassion.</>}
                      />
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Practice Item 2 */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => setShowPractice2(!showPractice2)}
            className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 font-black flex items-center justify-center text-xs">
                LT2
              </div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                <BilingualText
                  vi="Luyện tập 2: Phân tích vụ chia sẻ tin giả phong tỏa TP. Hồ Chí Minh trong Covid-19"
                  en="Practice 2: Accountability when recirculating Covid-19 lockdown hoaxes"
                />
              </h4>
            </div>
            {showPractice2 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>

          {showPractice2 && (
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-2">
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed italic">
                  <BilingualText
                    vi="«Trong đại dịch Covid-19, một người dùng Facebook đã chia sẻ tin 'Bắt đầu từ ngày 28/3/2020, toàn thành phố Hồ Chí Minh sẽ bị phong toả trong 14 ngày,...'. Khi bị triệu tập để xử phạt, người này đã chứng minh rằng anh ta chỉ đưa lại một tin chứ không bịa. Người này sai ở đâu?»"
                    en="«During the Covid-19 pandemic, a Facebook user shared: 'Starting March 28, 2020, the entire Ho Chi Minh City will be placed under lockdown for 14 days...'. Summoned for sanctioning, he argued he merely recirculated existing news without making it up. Where did he err?»"
                  />
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2 text-slate-700 dark:text-slate-300">
                <h5 className="font-bold text-slate-900 dark:text-white">
                  <BilingualText
                    vi="Phân tích lỗi sai theo quy định của pháp luật Việt Nam:"
                    en="Analysis of Legal Culpability under Vietnamese Law:"
                  />
                </h5>
                <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
                  <li>
                    <BilingualText
                      vi={<><strong>Sai phạm theo Điều 101 Nghị định 15/2020/NĐ-CP:</strong> Pháp luật cấm cả hành vi <em>"cung cấp"</em> lẫn <em>"chia sẻ"</em> thông tin giả mạo, thông tin sai sự thật gây hoang mang trong nhân dân. Hành vi re-post (chia sẻ lại) bản thân nó đã là một hành vi phát tán độc lập.</>}
                      en={<><strong>Violation under Decree 15/2020/ND-CP Article 101:</strong> The law prohibits both <em>originating</em> and <em>circulating/sharing</em> fabricated falsehoods inducing public panic. Reposting is an autonomous dissemination offense.</>}
                    />
                  </li>
                  <li>
                    <BilingualText
                      vi={<><strong>Tiếp tay lan truyền nguy hại:</strong> Việc biện hộ "chỉ chia sẻ lại chứ không tự nghĩ ra" không có giá trị miễn trừ trách nhiệm. Người dùng mạng có nghĩa vụ phải xác minh tính chính xác của thông tin trước khi nhấn nút "Share".</>}
                      en={<><strong>Aiding Harmful Disinformation:</strong> Pleading 'I only recirculated without fabricating' provides no legal exemption. Netizens hold a civic duty to verify factual integrity before clicking 'Share'.</>}
                    />
                  </li>
                  <li>
                    <BilingualText
                      vi={<><strong>Mức xử phạt:</strong> Phạt tiền từ <strong>10.000.000 đến 20.000.000 đồng</strong> và buộc gỡ bỏ thông tin sai sự thật ngay lập tức.</>}
                      en={<><strong>Prescribed Penalties:</strong> Administrative fine of <strong>10,000,000 to 20,000,000 VND</strong> plus immediate mandatory content takedown.</>}
                    />
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Part 2: VẬN DỤNG (SGK Trang 62) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider">
            <BilingualText vi="Phần 2: Vận dụng thực tế (SGK Trang 62)" en="Part 2: Real-World Applications (Page 62)" />
          </h3>
        </div>

        {/* Application Item 1 (Interactive) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => setShowApply1(!showApply1)}
            className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200 font-black flex items-center justify-center text-xs">
                VD1
              </div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                <BilingualText
                  vi="Vận dụng 1: Nhận xét có tính xúc phạm người khác trên mạng xã hội"
                  en="Application 1: Defamatory comments against others online"
                />
              </h4>
            </div>
            {showApply1 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>

          {showApply1 && (
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 space-y-4 text-xs sm:text-sm">
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                <BilingualText
                  vi="Nếu đăng trên mạng xã hội nhận xét có tính xúc phạm đến một người khác thì hành vi này là:"
                  en="Posting insulting or defamatory comments targeting another individual on social networks is:"
                />
              </p>

              <div className="space-y-2">
                {[
                  { key: 'A', textVi: 'A. Vi phạm pháp luật.', textEn: 'A. A violation of statutory law.' },
                  { key: 'B', textVi: 'B. Vi phạm đạo đức.', textEn: 'B. A violation of moral ethics.' },
                  { key: 'C', textVi: 'C. Tuỳ theo mức độ, có thể vi phạm đạo đức hay pháp luật.', textEn: 'C. Depending on severity, can violate ethics or statutory law.' },
                  { key: 'D', textVi: 'D. Không vi phạm gì.', textEn: 'D. Not a violation of anything.' }
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.key}
                    onClick={() => {
                      if (!apply1Submitted) setApply1Choice(opt.key);
                    }}
                    disabled={apply1Submitted}
                    className={`w-full text-left p-3.5 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                      apply1Choice === opt.key
                        ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-500 font-bold ring-1 ring-indigo-500/30'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <span>
                      <BilingualText vi={opt.textVi} en={opt.textEn} />
                    </span>
                    {apply1Submitted && opt.key === 'C' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              {apply1Submitted && (
                <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-1.5 animate-fadeIn">
                  <p className="font-bold text-indigo-900 dark:text-indigo-200">
                    <BilingualText
                      vi={apply1Choice === 'C' ? '✓ Hoàn toàn đúng!' : '✗ Chưa đúng. Đáp án đúng là C.'}
                      en={apply1Choice === 'C' ? '✓ Perfectly correct!' : '✗ Incorrect. The correct answer is C.'}
                    />
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    <BilingualText
                      vi="Xúc phạm người khác luôn là hành vi vi phạm đạo đức. Tuy nhiên, nếu mức độ nghiêm trọng xúc phạm danh dự nhân phẩm, vu khống hoặc gây hậu quả tâm lý thì sẽ cấu thành hành vi vi phạm pháp luật (Điều 101 Nghị định 15/2020 và Điều 155 Bộ luật Hình sự về tội Làm nhục người khác)."
                      en="Insulting others is inherently an ethical violation. Furthermore, severe slander or psychological harm constitutes a legal offense (Article 101 Decree 15/2020 and Article 155 Criminal Code on defamation)."
                    />
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                {!apply1Submitted ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (apply1Choice) setApply1Submitted(true);
                    }}
                    disabled={!apply1Choice}
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs transition cursor-pointer shadow-sm"
                  >
                    {bilingualMode === 'en' ? 'Confirm Selection' : 'Xác nhận lựa chọn'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setApply1Choice(null);
                      setApply1Submitted(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs transition cursor-pointer"
                  >
                    {bilingualMode === 'en' ? 'Retry' : 'Thử lại'}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Application Item 2 */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => setShowApply2(!showApply2)}
            className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-black flex items-center justify-center text-xs">
                VD2
              </div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                <BilingualText
                  vi="Vận dụng 2: Quan niệm 'Không biết là không có lỗi' của Bình khi dùng phần mềm bẻ khóa"
                  en="Application 2: Refuting 'Ignorance is an excuse' when using cracked software"
                />
              </h4>
            </div>
            {showApply2 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>

          {showApply2 && (
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 space-y-2">
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed italic">
                  <BilingualText
                    vi="«An nhắc Bình về việc Bình dùng phần mềm lậu và giảng giải cho Bình biết các quy định về quyền tác giả. Nghe xong Bình bảo: 'Trước đây mình không biết, mà không biết là không có lỗi'. Quan niệm của Bình như vậy có đúng không?»"
                    en="«An cautions Binh against using pirated software and explains copyright laws. Binh retorts: 'I didn’t know before, and ignorance is no crime'. Is Binh's viewpoint correct?»"
                  />
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2 text-slate-700 dark:text-slate-300">
                <h5 className="font-bold text-slate-900 dark:text-white">
                  <BilingualText vi="Kết luận & Lời khuyên công dân số:" en="Conclusion & Digital Citizenship Advice:" />
                </h5>
                <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
                  <li>
                    <BilingualText
                      vi={<><strong>Quan niệm của Bình là hoàn toàn sai:</strong> Trong nguyên tắc pháp lý quốc tế cũng như tại Việt Nam, <em>"Ignorantia juris non excusat" (Không hiểu biết pháp luật không phải là căn cứ miễn trừ trách nhiệm pháp lí)</em>. Mọi công dân đều có nghĩa vụ tự tìm hiểu và tuân thủ pháp luật đã được ban hành công khai.</>}
                      en={<><strong>Binh's claim is completely false:</strong> Under international and Vietnamese jurisprudence, <em>"Ignorantia juris non excusat" (Ignorance of the law excuses not)</em>. Every citizen holds an affirmative obligation to know and adhere to promulgated laws.</>}
                    />
                  </li>
                  <li>
                    <BilingualText
                      vi={<><strong>Vi phạm thực tế:</strong> Hành vi sử dụng phần mềm lậu (crack) đã trực tiếp gây thiệt hại kinh tế cho tác giả và nhà phát triển phần mềm.</>}
                      en={<><strong>Actual Infringement:</strong> Utilizing pirated (cracked) software directly causes financial and intellectual property damages to creators and publishers.</>}
                    />
                  </li>
                  <li>
                    <BilingualText
                      vi={<><strong>Hành động đúng đắn:</strong> Sau khi được bạn An giải thích, Bình cần gỡ bỏ ngay phần mềm lậu, tìm kiếm các phần mềm mã nguồn mở/miễn phí thay thế (FOSS) hoặc mua bản quyền sử dụng hợp pháp.</>}
                      en={<><strong>Righteous Remedial Action:</strong> Once advised by An, Binh must uninstall cracked software immediately, transition to free/open-source alternatives (FOSS), or purchase genuine licenses.</>}
                    />
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={5} lessonId={11} />

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={prevPage}
          className="px-5 py-3 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'Section 4: Software Copyright' : 'Mục 4: Vi phạm bản quyền & Tôn trọng bản quyền'}</span>
        </button>

        <button
          type="button"
          onClick={() => setShowQuizModal(true)}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md"
        >
          <Award className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'Take Final Assessment' : 'Làm bài kiểm tra đánh giá'}</span>
        </button>
      </div>
    </div>
  );
};
