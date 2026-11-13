import React, { useState } from 'react';
import {
  Sparkles,
  Volume2,
  BookOpen,
  ArrowRight,
  Layers,
  Shapes,
  CheckCircle2,
  HelpCircle,
  Eye,
  Type,
  Compass,
  MoveUpRight
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { BezierCurves3DViewer } from './BezierCurves3DViewer';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section14Overview: React.FC = () => {
  const { speak, isSpeaking, stopSpeaking, bilingualMode, nextPage } = useBook();

  // Warm-up question interactive answer state
  const [warmupAnswers, setWarmupAnswers] = useState<{
    line: boolean;
    parabola: boolean;
    ellipse: boolean;
  }>({ line: false, parabola: false, ellipse: false });

  const sectionSpeechVi =
    'Bài 14: Làm việc với đối tượng đường và văn bản, thuộc Chủ đề 4: Ứng dụng tin học, SGK Tin học 10 Kết nối tri thức với cuộc sống, Trang 75. Sau bài học này em sẽ: Biết các thao tác chỉnh sửa hình; Thực hiện được việc vẽ, chỉnh sửa hình để được đường cong mong muốn; Biết tạo và định dạng văn bản. Hoạt động Khởi động: Cần ít nhất bao nhiêu điểm để xác định một đường thẳng? Đường parabol? Đường elip? Mời các em tương tác với mô hình 3D Three.js để trải nghiệm uốn cong tiếp tuyến Bézier và dòng chữ nghệ thuật uốn lượn.';
  const sectionSpeechEn =
    'Lesson 14: Working with Paths and Text Objects, under Topic 4: Applied Informatics, Grade 10 Textbook Connecting Knowledge to Life, Page 75. Learning Objectives: Master path editing operations; draw and modify shapes to achieve desired curvature; create and format typographic text. Warm-up: How many points are required to define a straight line? A parabola? An ellipse? Interact with the professional Three.js 3D simulation below to explore 3D Bézier tangent dynamics and kinetic text flowing along spatial paths.';

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
    <div className="space-y-8 animate-fadeIn text-slate-800 dark:text-slate-200">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-cyan-700 via-blue-800 to-indigo-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-200 text-xs font-semibold backdrop-blur-md border border-cyan-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {bilingualMode === 'en'
                  ? 'Topic 4: Applied Informatics • Grade 10 Textbook (Pages 75 – 81)'
                  : 'Chủ đề 4: Ứng dụng tin học • SGK Tin học 10 (Trang 75 – 81)'}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              <BilingualText
                vi="BÀI 14: LÀM VIỆC VỚI ĐỐI TƯỢNG ĐƯỜNG VÀ VĂN BẢN"
                en="LESSON 14: WORKING WITH PATHS AND TEXT OBJECTS"
              />
            </h1>
            <p className="text-cyan-100/90 text-sm md:text-base max-w-2xl">
              <BilingualText
                vi="Khám phá bản chất đường cong Bézier, công cụ tinh chỉnh điểm neo trơn & neo góc, và kỹ thuật uốn lượn dòng chữ nghệ thuật theo đường dẫn cong trong Inkscape."
                en="Explore the mathematical essence of Bézier curves, smooth & corner node sculpting, and advanced typography bound to curved paths in Inkscape."
              />
            </p>
          </div>
        </div>
      </div>

      {/* Learning Objectives Box (Page 75) */}
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-slate-800/90 dark:to-cyan-950/40 p-6 rounded-3xl border border-cyan-200 dark:border-cyan-800/60 shadow-sm space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-cyan-600 text-white rounded-2xl shadow-md">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-cyan-950 dark:text-cyan-200">
              <BilingualText vi="Mục tiêu bài học (Sau bài này em sẽ:)" en="Learning Objectives" />
            </h2>
            <p className="text-xs text-cyan-800 dark:text-cyan-300">
              SGK Tin học 10 Kết nối tri thức - Trang 75
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-cyan-100 dark:border-slate-700 shadow-xs flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-sm">
              <strong className="block text-slate-800 dark:text-slate-100 font-semibold mb-1">
                <BilingualText vi="1. Thao tác chỉnh sửa hình" en="1. Master Path Manipulation" />
              </strong>
              <span className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                <BilingualText
                  vi="Hiểu sự khác biệt giữa hình khối cố định và đối tượng đường tự do; biết chuyển hình khối thành đường (Object to Path)."
                  en="Understand the divergence between rigid primitives and freeform paths; convert primitives via Object to Path."
                />
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-cyan-100 dark:border-slate-700 shadow-xs flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-sm">
              <strong className="block text-slate-800 dark:text-slate-100 font-semibold mb-1">
                <BilingualText vi="2. Uốn cong đường như ý muốn" en="2. Curve Sculpting & Nodes" />
              </strong>
              <span className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                <BilingualText
                  vi="Sử dụng công cụ Node (F2), phân biệt và chuyển đổi linh hoạt giữa điểm neo trơn (smooth) và điểm neo góc (corner)."
                  en="Utilize Node tool (F2) to sculpt curves, mastering smooth vs corner node transitions and tangent handles."
                />
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-cyan-100 dark:border-slate-700 shadow-xs flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-sm">
              <strong className="block text-slate-800 dark:text-slate-100 font-semibold mb-1">
                <BilingualText vi="3. Tạo & định dạng văn bản" en="3. Typography on Curved Path" />
              </strong>
              <span className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                <BilingualText
                  vi="Sử dụng công cụ Text (F8), điều chỉnh khoảng cách kí tự (kerning) và thực hiện uốn lượn chữ nghệ thuật (Put on Path)."
                  en="Deploy Text tool (F8), fine-tune letter kerning, and execute text curving along guide trajectories (Put on Path)."
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Warm-up Problem (Page 75) */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-2xl">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              <BilingualText
                vi="Khởi động (Trang 75): Xác định số điểm tối thiểu của đường cong"
                en="Warm-up (Page 75): Minimum Points to Define Geometric Curves"
              />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <BilingualText
                vi="Suy nghĩ và bấm để kiểm tra câu trả lời"
                en="Ponder and click to reveal the exact mathematical answer"
              />
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 italic bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
          <BilingualText
            vi="« Cần ít nhất bao nhiêu điểm để xác định một đường thẳng? Đường parabol? Đường elip? »"
            en="« How many points at minimum are required to define a straight line? A parabola? An ellipse? »"
          />
        </p>

        {/* 3 Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* 1. Straight Line */}
          <div
            onClick={() => setWarmupAnswers((prev) => ({ ...prev, line: !prev.line }))}
            className="p-4 rounded-2xl bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800/50 cursor-pointer hover:border-cyan-400 transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-900 dark:text-cyan-200 text-sm">
                <BilingualText vi="Đường thẳng (Line)" en="Straight Line" />
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-200 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200">
                {warmupAnswers.line
                  ? bilingualMode === 'en' ? '2 Points' : '2 Điểm'
                  : bilingualMode === 'en' ? 'Reveal answer' : 'Bấm xem'}
              </span>
            </div>
            {warmupAnswers.line && (
              <p className="text-xs text-slate-600 dark:text-slate-300 animate-fadeIn">
                <BilingualText
                  vi="Cần ít nhất 2 điểm phân biệt để xác định duy nhất một đường thẳng đi qua chúng (tiên đề Euclid)."
                  en="At least 2 distinct points are required to uniquely define a straight line."
                />
              </p>
            )}
          </div>

          {/* 2. Parabola */}
          <div
            onClick={() => setWarmupAnswers((prev) => ({ ...prev, parabola: !prev.parabola }))}
            className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/50 cursor-pointer hover:border-blue-400 transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-900 dark:text-blue-200 text-sm">
                <BilingualText vi="Đường Parabol (Parabola)" en="Parabola" />
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                {warmupAnswers.parabola
                  ? bilingualMode === 'en' ? '3 Points' : '3 Điểm'
                  : bilingualMode === 'en' ? 'Reveal answer' : 'Bấm xem'}
              </span>
            </div>
            {warmupAnswers.parabola && (
              <p className="text-xs text-slate-600 dark:text-slate-300 animate-fadeIn">
                <BilingualText
                  vi="Cần ít nhất 3 điểm không thẳng hàng để xác định hệ số phương trình bậc hai y = ax² + bx + c."
                  en="At least 3 non-collinear points are needed to uniquely solve the quadratic curve coefficients."
                />
              </p>
            )}
          </div>

          {/* 3. Ellipse / Bézier */}
          <div
            onClick={() => setWarmupAnswers((prev) => ({ ...prev, ellipse: !prev.ellipse }))}
            className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/50 cursor-pointer hover:border-indigo-400 transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-900 dark:text-indigo-200 text-sm">
                <BilingualText vi="Đoạn cong Bézier (Cubic)" en="Cubic Bézier Segment" />
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-200 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                {warmupAnswers.ellipse
                  ? bilingualMode === 'en' ? '4 Points (2 ends + 2 handles)' : '4 Điểm (2 mút + 2 cần)'
                  : bilingualMode === 'en' ? 'Reveal answer' : 'Bấm xem'}
              </span>
            </div>
            {warmupAnswers.ellipse && (
              <p className="text-xs text-slate-600 dark:text-slate-300 animate-fadeIn">
                <BilingualText
                  vi="Trong Inkscape, một đoạn cong Bézier bậc 3 được xác định bởi 4 điểm: 2 điểm đầu mút và 2 điểm điều khiển (điểm chỉ hướng)!"
                  en="In Inkscape vector graphics, a cubic Bézier curve segment is strictly defined by 4 points: 2 endpoints + 2 control handles!"
                />
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Embedded 3D Three.js Simulation */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-cyan-500 animate-ping" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base md:text-lg">
              <BilingualText
                vi="Mô phỏng 3D tương tác: Đường cong Bézier & Văn bản không gian (Three.js)"
                en="Interactive 3D Simulation: Bézier Tangents & Kinetic Text on Path"
              />
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            Three.js WebGL Engine
          </span>
        </div>

        <BezierCurves3DViewer />
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={0} lessonId={14} />

      {/* Pagination Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-700">
        <div className="text-xs text-slate-400">
          <BilingualText vi="Trang 1 / 6 • Tổng quan Bài 14" en="Page 1 of 6 • Lesson 14 Overview" />
        </div>

        <button
          onClick={nextPage}
          className="flex items-center space-x-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-700 hover:to-indigo-700 text-white font-semibold transition-all shadow-md cursor-pointer"
        >
          <span>
            <BilingualText
              vi="Mục 1: Làm quen với đối tượng dạng đường"
              en="Section 1: Freeform Paths"
            />
          </span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
