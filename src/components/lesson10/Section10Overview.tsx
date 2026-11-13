import React, { useState } from 'react';
import {
  Globe,
  Languages,
  BookOpen,
  Sparkles,
  Volume2,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  Bookmark,
  Share2,
  School,
  FileText,
  Search
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';
import { GlobalResource3DViewer } from './GlobalResource3DViewer';

export const Section10Overview: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    nextPage,
    setOriginalPageTarget
  } = useBook();

  // Warm-up interactive answer toggle
  const [showWarmupAnswer, setShowWarmupAnswer] = useState<boolean>(false);

  const sectionSpeechVi =
    'Chủ đề 2: Mạng máy tính và Internet. Bài 10: Thực hành khai thác tài nguyên trên Internet. Sau bài học này, em sẽ khai thác được một số dịch vụ và tài nguyên quan trọng trên Internet phục vụ học tập gồm: phần mềm dịch đa ngữ Google Translate để rèn luyện 4 kỹ năng nghe, nói, đọc, viết ngoại ngữ; và kho học liệu số mở igiaoduc.vn của Bộ Giáo dục và Đào tạo để tra cứu sách giáo khoa, bài giảng số và tư liệu học tập trực tuyến.';
  const sectionSpeechEn =
    'Topic 2: Computer Networks and the Internet. Lesson 10: Practice Exploiting Internet Resources. After this lesson, you will successfully leverage vital online educational resources and services: multilingual machine translation with Google Translate to develop listening, speaking, reading, and writing skills; and the national open digital repository igiaoduc.vn to explore video lectures, electronic textbooks, and curriculum materials.';

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
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-300">
            {bilingualMode === 'en' ? 'Topic 2 • Lesson 10' : 'Chủ đề 2 • Bài 10'}
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            <BilingualText
              vi="THỰC HÀNH KHAI THÁC TÀI NGUYÊN TRÊN INTERNET"
              en="PRACTICE: EXPLOITING INTERNET RESOURCES"
            />
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {bilingualMode === 'en'
              ? 'Informatics 10 Textbook (Connecting Knowledge to Life) • Pages 50–54'
              : 'SGK Tin học 10 Kết nối tri thức với cuộc sống • Trang 50 – 54'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOriginalPageTarget(50)}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-cyan-600" />
            <span>{bilingualMode === 'en' ? 'Textbook Page 50' : 'SGK Trang 50'}</span>
          </button>
        </div>
      </div>

      {/* Learning Objectives Box (Sau bài này em sẽ) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-linear-to-br from-cyan-500/10 via-slate-50 to-emerald-500/10 dark:from-cyan-950/30 dark:via-slate-900 dark:to-emerald-950/20 border border-cyan-500/30 shadow-xs">
        <div className="flex items-center gap-2.5 font-black text-sm sm:text-base text-cyan-700 dark:text-cyan-400 mb-3">
          <Sparkles className="w-5 h-5 text-cyan-500" />
          <span>
            {bilingualMode === 'en'
              ? 'Learning Objectives (Page 50 SGK)'
              : 'Mục tiêu học tập (Sau bài này em sẽ:)'}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-cyan-200 dark:border-cyan-800/50 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <strong className="text-slate-900 dark:text-slate-100">
              {bilingualMode === 'en'
                ? 'Exploit Internet Educational Resources: '
                : 'Khai thác dịch vụ và tài nguyên học tập trên Internet: '}
            </strong>
            {bilingualMode === 'en'
              ? 'Proficiently operate multilingual translation software (Google Translate) and open educational resource repositories (igiaoduc.vn) to advance autonomous learning.'
              : 'Biết cách khai thác một số dịch vụ và tài nguyên trên Internet phục vụ học tập gồm: phần mềm dịch đa ngữ (Google Translate) và kho học liệu mở (igiaoduc.vn).'}
          </div>
        </div>
      </div>

      {/* Warm-up Question (Khởi động SGK trang 50) */}
      <div className="p-5 rounded-3xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700/50 text-slate-800 dark:text-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-sm text-amber-800 dark:text-amber-300">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>
              {bilingualMode === 'en'
                ? 'Opening Inquiry (Page 50 SGK)'
                : 'Khởi động (SGK Trang 50)'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowWarmupAnswer(!showWarmupAnswer)}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 dark:text-amber-400 cursor-pointer"
          >
            {showWarmupAnswer
              ? (bilingualMode === 'en' ? 'Hide Answer' : 'Ẩn câu trả lời')
              : (bilingualMode === 'en' ? 'Show Suggested Answer' : 'Xem câu trả lời gợi ý')}
          </button>
        </div>

        <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          {bilingualMode === 'en'
            ? 'There is a vast abundance of software and resources on the Internet. Do you know which software supports listening, speaking, reading, and writing skills when learning foreign languages? Where can you find Grade 10 Informatics digital video lectures?'
            : 'Trên Internet có rất nhiều tài nguyên và phần mềm hỗ trợ cho học tập. Em có biết phần mềm nào hỗ trợ kĩ năng nghe, nói, đọc, viết khi học ngoại ngữ không? Các bài giảng số Tin học 10 có thể tìm ở đâu?'}
        </p>

        {showWarmupAnswer && (
          <div className="p-4 rounded-2xl bg-amber-100/70 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1.5 animate-in fade-in">
            <div className="font-bold text-amber-900 dark:text-amber-200">
              {bilingualMode === 'en' ? 'Suggested Answer:' : 'Gợi ý trả lời chuẩn:'}
            </div>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>
                  {bilingualMode === 'en'
                    ? 'Multimodal language learning apps: '
                    : 'Phần mềm học ngoại ngữ đa kỹ năng: '}
                </strong>
                <BilingualText
                  inline
                  vi="Google Translate (dịch văn bản, nhận dạng giọng nói, phát âm chuẩn 2 tốc độ, dịch tệp tài liệu); Duolingo, Quizlet, Oxford Learner’s Dictionaries..."
                  en="Google Translate (text translation, voice recognition, two-speed pronunciation, document translation); Duolingo, Quizlet, Oxford Learner’s Dictionaries..."
                />
              </li>
              <li>
                <strong>
                  {bilingualMode === 'en'
                    ? 'Where to find Grade 10 Informatics video lectures: '
                    : 'Nơi tìm bài giảng số Tin học 10: '}
                </strong>
                <BilingualText
                  inline
                  vi="Kho học liệu số của Bộ Giáo dục và Đào tạo tại https://igiaoduc.vn/, Kênh truyền hình Hà Nội TV2, Kênh YouTube Giáo dục và các cổng học trực tuyến (Hocmai, OLM, K12Online)."
                  en="National digital repository of MOET at https://igiaoduc.vn/, Hanoi TV2 educational channel, Educational YouTube channels, and e-learning portals."
                />
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* FEATURED: Interactive Three.js 3D Global Resource Matrix Viewer */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
            <Globe className="w-5 h-5 text-cyan-600" />
            <span>
              {bilingualMode === 'en'
                ? 'Interactive 3D Global Internet Resource Sphere'
                : 'Mô hình 3D: Quả cầu Mạng Tri thức & Học liệu số Toàn cầu'}
            </span>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300 font-bold">
            WebGL • Three.js 3D
          </span>
        </div>

        {/* 3D Component */}
        <GlobalResource3DViewer initialMode="overview" />
      </div>

      {/* Two Core Tasks Overview Cards (Nhiệm vụ 1 & Nhiệm vụ 2) */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Task 1 */}
        <div className="p-5 rounded-3xl bg-linear-to-b from-blue-50 to-white dark:from-blue-950/30 dark:to-slate-900 border-2 border-blue-300/80 dark:border-blue-800 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300">
              {bilingualMode === 'en' ? 'Task 1 • Pages 50–52' : 'Nhiệm vụ 1 • Trang 50 – 52'}
            </span>
            <Languages className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-slate-100">
            <BilingualText
              vi="DỊCH ĐA NGỮ VỚI GOOGLE TRANSLATE"
              en="MULTILINGUAL TRANSLATION WITH GOOGLE TRANSLATE"
            />
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {bilingualMode === 'en'
              ? 'Master the Google Translate interface, select source and target languages, input via text, speech dictation (microphone), and translate entire documents (.docx, .xlsx, .pptx, .pdf).'
              : 'Làm chủ giao diện Google Translate, xác định ngôn ngữ nguồn và đích, thực hành 3 phương thức nhập liệu (gõ phím, micro thu âm, dịch tệp tài liệu) và nghe phát âm chuẩn 2 tốc độ.'}
          </p>
        </div>

        {/* Task 2 */}
        <div className="p-5 rounded-3xl bg-linear-to-b from-emerald-50 to-white dark:from-emerald-950/30 dark:to-slate-900 border-2 border-emerald-300/80 dark:border-emerald-800 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
              {bilingualMode === 'en' ? 'Task 2 • Pages 53–54' : 'Nhiệm vụ 2 • Trang 53 – 54'}
            </span>
            <BookOpen className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-slate-100">
            <BilingualText
              vi="KHAI THÁC KHO HỌC LIỆU MỞ IGIAODUC.VN"
              en="EXPLORE OPEN REPOSITORY IGIAODUC.VN"
            />
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {bilingualMode === 'en'
              ? 'Explore the history of Open Educational Resources (OER) originating from MIT in 2002, navigate the 3-tier taxonomy tree of igiaoduc.vn, and access streaming video lectures.'
              : 'Tìm hiểu nguồn gốc phong trào học liệu mở từ sáng kiến của Viện Công nghệ Massachusetts (MIT) năm 2002, định vị tài nguyên qua cây thư mục 3 cấp của igiaoduc.vn và xem bài giảng số.'}
          </p>
        </div>
      </div>

      {/* Pedagogical Prompts */}
      <TeacherPromptsWidget sectionIndex={0} lessonId={10} />

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="text-xs text-slate-500">
          {bilingualMode === 'en'
            ? 'Section 0 of 5 • Lesson Overview'
            : 'Phần 0 / 5 • Giới thiệu Bài 10'}
        </div>
        <button
          type="button"
          onClick={nextPage}
          className="px-4 py-2.5 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-cyan-500/25"
        >
          <span>
            {bilingualMode === 'en' ? 'Section 1: Google Translate UI' : 'Mục 1: Giao diện Google Translate'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
