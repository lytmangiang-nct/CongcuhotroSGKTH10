import React, { useState } from 'react';
import {
  Layers,
  Volume2,
  CheckCircle2,
  HelpCircle,
  Eye,
  CreditCard,
  Hash,
  FileText,
  ToggleLeft,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

export const Section3Classification: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    setOriginalPageTarget,
    setShowOriginalModal,
    nextPage
  } = useBook();

  // Active Hotspot on CCCD Card (Activity 1)
  const [selectedField, setSelectedField] = useState<string>('id_num');

  // Answers collapse toggle for questions on page 17
  const [showAnswerQ1, setShowAnswerQ1] = useState<boolean>(false);
  const [showAnswerQ2, setShowAnswerQ2] = useState<boolean>(false);

  // Student answer selection for Q1
  const [selectedQ1Choice, setSelectedQ1Choice] = useState<'text' | 'number' | null>(null);

  const speechText =
    "Section 1: Classification and representation of information in computers. Converting information into binary data is called information representation. Data in computers is categorized to suit machine operations: numbers for arithmetic and comparisons; text for string concatenation, comparison, and searching. The four primary data types in high school informatics are Text, Numbers, Logic, and Multimedia (audio and images).";

  const cccdFields = [
    {
      id: 'id_num',
      nameVi: 'Số Căn cước công dân',
      nameEn: 'Citizen Identity Number',
      val: '001000456789',
      groupVi: 'Văn bản (Text)',
      groupEn: 'Text (String)',
      reasonVi: 'Dùng để định danh, tra cứu, tìm kiếm; không dùng để cộng, trừ; bắt buộc giữ chữ số 0 ở đầu.',
      reasonEn: 'Used for identification, lookup, and searching; not used for arithmetic; leading zeros must be preserved.'
    },
    {
      id: 'name',
      nameVi: 'Họ và tên',
      nameEn: 'Full Name',
      val: 'NGUYỄN THÀNH CÔNG',
      groupVi: 'Văn bản (Text)',
      groupEn: 'Text (String)',
      reasonVi: 'Chuỗi ký tự chữ cái tiếng Việt có dấu, dùng để hiển thị và sắp xếp theo bảng chữ cái.',
      reasonEn: 'Vietnamese diacritical text string, used for display and alphabetical sorting.'
    },
    {
      id: 'dob',
      nameVi: 'Ngày sinh',
      nameEn: 'Date of Birth',
      val: '01/01/2000',
      groupVi: 'Văn bản / Ngày tháng (Date/Text)',
      groupEn: 'Date / Text String',
      reasonVi: 'Dãy ký tự có định dạng ngày/tháng/năm để xác định tuổi và đối chiếu hồ sơ.',
      reasonEn: 'Formatted date/month/year sequence used to determine age and match official records.'
    },
    {
      id: 'gender',
      nameVi: 'Giới tính',
      nameEn: 'Gender',
      val: 'Nam',
      groupVi: 'Văn bản / Lôgic (Boolean)',
      groupEn: 'Text / Boolean Flag',
      reasonVi: 'Chỉ nhận một trong hai trạng thái phân loại.',
      reasonEn: 'Takes one of two discrete classification states.'
    },
    {
      id: 'photo',
      nameVi: 'Ảnh chân dung',
      nameEn: 'Portrait Photo',
      val: 'Ảnh kỹ thuật số 3x4',
      groupVi: 'Đa phương tiện (Hình ảnh)',
      groupEn: 'Multimedia (Image)',
      reasonVi: 'Ma trận các điểm ảnh số biểu diễn nhận dạng khuôn mặt.',
      reasonEn: 'Digital pixel matrix representing facial features.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header section with SGK Page Badge and English TTS */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 px-2.5 py-0.5 rounded-lg border border-indigo-200 dark:border-indigo-800">
              {bilingualMode === 'en' ? 'Section 1 • Pages 16 – 17 SGK' : 'Mục 1 • Trang 16 – 17 SGK'}
            </span>
            <button
              type="button"
              onClick={() => {
                setOriginalPageTarget(16);
                setShowOriginalModal(true);
              }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>{bilingualMode === 'en' ? 'View scan page 16' : 'Xem scan trang 16'}</span>
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
            {bilingualMode === 'en'
              ? '1. Classification and Representation of Information in Computers'
              : '1. Phân loại và biểu diễn thông tin trong máy tính'}
          </h2>
        </div>

        {bilingualMode !== 'vi' && (
          <button
            type="button"
            onClick={() => {
              if (isSpeaking) {
                stopSpeaking();
              } else {
                speak(speechText, 'en');
              }
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
              isSpeaking
                ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
            title={bilingualMode === 'en' ? 'Listen to English pronunciation' : 'Nghe phát âm chuẩn tiếng Anh đoạn kiến thức trọng tâm'}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{isSpeaking ? 'STOP' : 'EN'}</span>
          </button>
        )}
      </div>

      {/* Activity 1: Citizen Identity Card Analysis (Hình 3.1 SGK) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {bilingualMode === 'en' ? 'Activity 1 (Textbook Page 16)' : 'Hoạt động 1 (Trang 16 SGK)'}
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {bilingualMode === 'en'
                ? 'Information Classification on Citizen Identity Card (Figure 3.1)'
                : 'Phân loại thông tin trên Thẻ Căn cước công dân (Hình 3.1)'}
            </h3>
          </div>
        </div>

        <BilingualText
          vi="Hình 3.1 minh hoạ một thẻ căn cước công dân. Trên đó có những thông tin gì? Hãy chia những thông tin đó thành các nhóm, ví dụ nhóm các thông tin có thể tách ghép được hay so sánh được để tìm kiếm và nhóm các thông tin có thể thực hiện được với các phép tính số học."
          en="Figure 3.1 illustrates a citizen identity card. What information is present on it? Divide this information into groups: for instance, information that can be sliced, concatenated, or compared for searching, versus information subject to arithmetic operations."
        />

        {/* Interactive CCCD Card Simulation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
          {/* Card Mockup (Col 7) */}
          <div className="lg:col-span-7 p-5 rounded-2xl bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-900 text-white shadow-lg border border-emerald-500/30 relative overflow-hidden flex flex-col justify-between min-h-[220px]">
            {/* Header of CCCD */}
            <div className="flex items-start justify-between pb-3 border-b border-white/20">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-red-600 border border-amber-300 flex items-center justify-center text-[10px] font-bold text-amber-300 shadow-xs">
                  ★
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-amber-200 font-extrabold">
                    {bilingualMode === 'en' ? 'Socialist Republic of Vietnam' : 'Cộng hoà Xã hội Chủ nghĩa Việt Nam'}
                  </div>
                  <div className="text-[11px] font-black tracking-wide">
                    {bilingualMode === 'en' ? 'CITIZEN IDENTITY CARD' : 'CĂN CƯỚC CÔNG DÂN / Citizen Identity Card'}
                  </div>
                </div>
              </div>
              <span className="text-[9px] font-mono bg-white/20 px-2 py-0.5 rounded text-amber-200">
                {bilingualMode === 'en' ? 'Figure 3.1 SGK' : 'Hình 3.1 SGK'}
              </span>
            </div>

            {/* Body of CCCD with click hotspots */}
            <div className="grid grid-cols-12 gap-3 py-3 items-center">
              {/* Photo Area */}
              <div
                onClick={() => setSelectedField('photo')}
                className={`col-span-4 p-2 rounded-xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center ${
                  selectedField === 'photo'
                    ? 'border-amber-400 bg-white/20 shadow-md ring-2 ring-amber-300/40'
                    : 'border-white/30 bg-white/10 hover:border-white/60'
                }`}
                title={bilingualMode === 'en' ? 'Click to inspect portrait photo analysis' : 'Bấm để xem phân tích ảnh chân dung'}
              >
                <div className="w-12 h-14 rounded-lg bg-slate-300/40 border border-white/40 flex items-center justify-center mb-1">
                  <ImageIcon className="w-6 h-6 text-amber-200" />
                </div>
                <span className="text-[10px] font-bold">
                  {bilingualMode === 'en' ? '3x4 Photo (Image)' : 'Ảnh 3x4 (Hình ảnh)'}
                </span>
              </div>

              {/* Text Fields */}
              <div className="col-span-8 space-y-1.5 text-xs">
                <div
                  onClick={() => setSelectedField('id_num')}
                  className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                    selectedField === 'id_num'
                      ? 'border-amber-400 bg-white/20 ring-1 ring-amber-300'
                      : 'border-transparent hover:bg-white/10'
                  }`}
                >
                  <span className="text-[10px] text-amber-200 font-bold">{bilingualMode === 'en' ? 'No.:' : 'Số / No.:'}</span>
                  <span className="font-mono font-black text-amber-300 tracking-wider">001000456789</span>
                </div>

                <div
                  onClick={() => setSelectedField('name')}
                  className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                    selectedField === 'name'
                      ? 'border-amber-400 bg-white/20 ring-1 ring-amber-300'
                      : 'border-transparent hover:bg-white/10'
                  }`}
                >
                  <span className="text-[10px] text-amber-200 font-bold">{bilingualMode === 'en' ? 'Full name:' : 'Họ và tên:'}</span>
                  <span className="font-bold">NGUYỄN THÀNH CÔNG</span>
                </div>

                <div
                  onClick={() => setSelectedField('dob')}
                  className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                    selectedField === 'dob'
                      ? 'border-amber-400 bg-white/20 ring-1 ring-amber-300'
                      : 'border-transparent hover:bg-white/10'
                  }`}
                >
                  <span className="text-[10px] text-amber-200 font-bold">{bilingualMode === 'en' ? 'Date of birth:' : 'Ngày sinh:'}</span>
                  <span className="font-mono">01/01/2000</span>
                </div>

                <div
                  onClick={() => setSelectedField('gender')}
                  className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                    selectedField === 'gender'
                      ? 'border-amber-400 bg-white/20 ring-1 ring-amber-300'
                      : 'border-transparent hover:bg-white/10'
                  }`}
                >
                  <span className="text-[10px] text-amber-200 font-bold">{bilingualMode === 'en' ? 'Gender:' : 'Giới tính:'}</span>
                  <span>{bilingualMode === 'en' ? 'Male • Nationality: Vietnamese' : 'Nam • Quốc tịch: Việt Nam'}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/20 text-[10px] text-emerald-200 flex items-center justify-between">
              <span>{bilingualMode === 'en' ? 'Click each field to inspect data type analysis' : 'Bấm vào từng trường thông tin để xem phân tích kiểu dữ liệu'}</span>
              <span>{bilingualMode === 'en' ? 'Permanent Address: Hanoi' : 'Nơi thường trú: Hà Nội'}</span>
            </div>
          </div>

          {/* Field Analysis Detail Box (Col 5) */}
          <div className="lg:col-span-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-3">
            {(() => {
              const current = cccdFields.find((f) => f.id === selectedField) || cccdFields[0];
              const isEn = bilingualMode === 'en';
              return (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-xs font-bold text-slate-500">
                      {isEn ? 'Field Analysis:' : 'Phân tích trường dữ liệu:'}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white text-[10px] font-black uppercase">
                      {isEn ? current.groupEn : current.groupVi}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white text-base">
                      {isEn ? current.nameEn : current.nameVi}
                    </h4>
                    <p className="text-xs text-slate-400 italic">
                      {isEn ? current.nameVi : current.nameEn}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">
                      {isEn ? 'Sample Value:' : 'Giá trị mẫu:'}
                    </div>
                    <div className="font-mono font-bold text-indigo-700 dark:text-indigo-400 text-sm">
                      {current.val}
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    <strong>{isEn ? 'Pedagogical Reason:' : 'Giải thích sư phạm:'}</strong>{' '}
                    {isEn ? current.reasonEn : current.reasonVi}
                  </div>
                </div>
              );
            })()}

            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-[11px] text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>
                {bilingualMode === 'en'
                  ? 'Conclusion: Citizen ID is not used for arithmetic, so it belongs to the Text data type!'
                  : 'Kết luận: Số CCCD không dùng để cộng/trừ nên thuộc nhóm Văn bản!'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Knowledge: Figure 3.2 Classification Diagram */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {bilingualMode === 'en' ? 'Figure 3.2 • Page 16 SGK' : 'Hình 3.2 • Trang 16 SGK'}
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {bilingualMode === 'en'
                ? 'Classification Diagram of Data Types in High School Informatics'
                : 'Sơ đồ phân loại các kiểu dữ liệu trong chương trình Tin học phổ thông'}
            </h3>
          </div>
          <span className="text-xs font-mono font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800">
            {bilingualMode === 'en' ? '4 Main Categories' : '4 Nhóm cơ bản'}
          </span>
        </div>

        <BilingualText
          vi="Khi đưa vào máy tính thông tin được chuyển thành dữ liệu. Dữ liệu trên máy cũng cần được phân loại cho phù hợp với các phép xử lí trong máy tính. Ví dụ, đối với các dữ liệu là số có thể tính toán và so sánh. Còn đối với các dữ liệu dạng văn bản thì có thể tách, ghép, so sánh. Việc mã hoá thông tin thành dữ liệu nhị phân được gọi là biểu diễn thông tin. Biểu diễn thông tin là bước đầu để có thể đưa thông tin vào máy tính."
          en="When entered into a computer, information is converted into data. Data must be classified to suit operations inside the computer: numerical data for arithmetic and comparison; text data for splitting, concatenation, and searching. Encoding information into binary data is called information representation, the prerequisite step to ingest information into computers."
        />

        {/* Interactive Diagram: 4 Branches */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
          {/* Branch 1: Văn bản */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border-2 border-indigo-200 dark:border-indigo-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-xs">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono font-bold bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded-full">
                Text / String
              </span>
            </div>
            <h4 className="font-black text-slate-900 dark:text-white text-base">
              {bilingualMode === 'en' ? '1. Text (String)' : '1. Văn bản (Text)'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {bilingualMode === 'en' ? 'Characters, words, sentences, text files.' : 'Kí tự, từ ngữ, câu văn, tệp văn bản.'}
            </p>
            <div className="pt-2 border-t border-indigo-200/60 dark:border-indigo-800/60 text-[11px] text-indigo-950 dark:text-indigo-200 font-semibold space-y-1">
              <div
                data-en="Operations: Concatenation, slicing, searching, lexicographical comparison."
                data-vi="Phép xử lí: Nối xâu, cắt tách, tìm kiếm, so sánh thứ tự từ điển."
              >
                <strong>{bilingualMode === 'en' ? '• Operations:' : '• Phép xử lí:'}</strong>{' '}
                {bilingualMode === 'en' ? 'Concatenation, slicing, searching, lexicographical comparison.' : 'Nối xâu, cắt tách, tìm kiếm, so sánh thứ tự từ điển.'}
              </div>
              <div
                data-en="Examples: Full name, Address, Citizen ID."
                data-vi="Ví dụ: Họ tên, Địa chỉ, Số CCCD."
              >
                <strong>{bilingualMode === 'en' ? '• Examples:' : '• Ví dụ:'}</strong>{' '}
                {bilingualMode === 'en' ? 'Full name, Address, Citizen ID.' : 'Họ tên, Địa chỉ, Số CCCD.'}
              </div>
            </div>
          </div>

          {/* Branch 2: Số */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border-2 border-emerald-200 dark:border-emerald-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-xs">
                <Hash className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full">
                Number
              </span>
            </div>
            <h4 className="font-black text-slate-900 dark:text-white text-base">
              {bilingualMode === 'en' ? '2. Numeric Data' : '2. Dữ liệu số (Number)'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {bilingualMode === 'en' ? 'Integers (Integer) & Floating-point numbers (Float).' : 'Số nguyên (Integer) & Số thực (Float).'}
            </p>
            <div className="pt-2 border-t border-emerald-200/60 dark:border-emerald-800/60 text-[11px] text-emerald-950 dark:text-emerald-200 font-semibold space-y-1">
              <div
                data-en="Operations: Addition (+), subtraction (-), multiplication (*), division (/), comparison (<, >)."
                data-vi="Phép xử lí: Cộng (+), trừ (−), nhân (*), chia (/), so sánh (<, >)."
              >
                <strong>{bilingualMode === 'en' ? '• Operations:' : '• Phép xử lí:'}</strong>{' '}
                {bilingualMode === 'en' ? 'Addition (+), subtraction (-), multiplication (*), division (/), comparison (<, >).' : 'Cộng (+), trừ (-), nhân (*), chia (/), so sánh lớn/nhỏ.'}
              </div>
              <div
                data-en="Examples: GPA (8.5), Currency, Weight."
                data-vi="Ví dụ: Điểm TB (8.5), Tiền, Cân nặng."
              >
                <strong>{bilingualMode === 'en' ? '• Examples:' : '• Ví dụ:'}</strong>{' '}
                {bilingualMode === 'en' ? 'GPA (8.5), Currency, Weight.' : 'Điểm TB (8.5), Tiền, Cân nặng.'}
              </div>
            </div>
          </div>

          {/* Branch 3: Lôgic */}
          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border-2 border-purple-200 dark:border-purple-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-purple-600 text-white shadow-xs">
                <ToggleLeft className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono font-bold bg-purple-100 text-purple-900 px-2 py-0.5 rounded-full">
                Boolean
              </span>
            </div>
            <h4 className="font-black text-slate-900 dark:text-white text-base">
              {bilingualMode === 'en' ? '3. Boolean (Logic)' : '3. Lôgic (Boolean)'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {bilingualMode === 'en' ? 'Two truth values: True or False.' : 'Hai giá trị chân lí: Đúng (True) hoặc Sai (False).'}
            </p>
            <div className="pt-2 border-t border-purple-200/60 dark:border-purple-800/60 text-[11px] text-purple-950 dark:text-purple-200 font-semibold space-y-1">
              <div
                data-en="Operations: AND, OR, NOT."
                data-vi="Phép xử lí: AND (VÀ), OR (HOẶC), NOT (PHỦ ĐỊNH)."
              >
                <strong>{bilingualMode === 'en' ? '• Operations:' : '• Phép xử lí:'}</strong>{' '}
                {bilingualMode === 'en' ? 'AND, OR, NOT.' : 'AND (VÀ), OR (HOẶC), NOT (PHỦ ĐỊNH).'}
              </div>
              <div
                data-en="Examples: Submitted? (True), Score > 5?"
                data-vi="Ví dụ: Đã nộp bài? (True), Điểm > 5?"
              >
                <strong>{bilingualMode === 'en' ? '• Examples:' : '• Ví dụ:'}</strong>{' '}
                {bilingualMode === 'en' ? 'Submitted? (True), Score > 5?' : 'Đã nộp bài? (True), Điểm > 5?'}
              </div>
            </div>
          </div>

          {/* Branch 4: Đa phương tiện */}
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border-2 border-amber-200 dark:border-amber-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-amber-600 text-white shadow-xs">
                <ImageIcon className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                Multimedia
              </span>
            </div>
            <h4 className="font-black text-slate-900 dark:text-white text-base">
              {bilingualMode === 'en' ? '4. Multimedia' : '4. Đa phương tiện'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {bilingualMode === 'en' ? 'Audio, Image, Video.' : 'Âm thanh (Audio), Hình ảnh (Image), Video.'}
            </p>
            <div className="pt-2 border-t border-amber-200/60 dark:border-amber-800/60 text-[11px] text-amber-950 dark:text-amber-200 font-semibold space-y-1">
              <div
                data-en="Operations: Compression, filtering, color adjustment, facial/voice recognition."
                data-vi="Phép xử lí: Nén, lọc nhiễu, chỉnh màu, nhận dạng khuôn mặt, giọng nói."
              >
                <strong>{bilingualMode === 'en' ? '• Operations:' : '• Phép xử lí:'}</strong>{' '}
                {bilingualMode === 'en' ? 'Compression, filtering, color adjustment, facial/voice recognition.' : 'Nén, lọc nhiễu, chỉnh màu, nhận dạng khuôn mặt, giọng nói.'}
              </div>
              <div
                data-en="Examples: ID photo, Lecture video."
                data-vi="Ví dụ: Ảnh thẻ CCCD, Video bài giảng."
              >
                <strong>{bilingualMode === 'en' ? '• Examples:' : '• Ví dụ:'}</strong>{' '}
                {bilingualMode === 'en' ? 'ID photo, Lecture video.' : 'Ảnh thẻ CCCD, Video bài giảng.'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Official SGK Remember Box (Hộp Ghi nhớ mục 1 - Trang 17) */}
      <div className="p-5 rounded-3xl bg-amber-50/80 dark:bg-amber-950/40 border-2 border-dashed border-amber-400 dark:border-amber-700/80 space-y-2.5 shadow-xs">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-black text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <BilingualText vi="Em ghi nhớ (Trang 17 SGK Tin học 10):" en="Key Takeaways (Textbook Page 17):" />
        </div>
        <div className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
          <BilingualText
            vi="• Biểu diễn thông tin trong máy tính là cách mã hoá thông tin."
            en="• Representing information in computers is the method of encoding information."
          />
          <BilingualText
            vi="• Các kiểu dữ liệu thường gặp là văn bản, số, hình ảnh, âm thanh và lôgic."
            en="• Common data types include text, number, image, sound, and logic."
          />
          <BilingualText
            vi="• Việc phân loại dữ liệu để có cách biểu diễn phù hợp nhằm tạo thuận lợi cho việc xử lí thông tin trong máy tính."
            en="• Classifying data enables appropriate representations, facilitating efficient computational processing."
          />
        </div>
      </div>

      {/* Pedagogical Check Questions (Câu hỏi củng cố 1 & 2 - Trang 17 SGK) */}
      <div className="bg-white dark:bg-slate-850 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white uppercase tracking-wide">
            <BilingualText
              vi="Câu hỏi củng cố mục 1 (Trang 17 SGK)"
              en="Checkpoint Questions for Section 1 (Page 17)"
            />
          </h3>
        </div>

        {/* Question 1: Citizen ID Type */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
            <BilingualText
              vi="1. Theo em số căn cước công dân có kiểu số hay kiểu văn bản?"
              en="1. In your opinion, is a citizen identity card number of number type or text type?"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedQ1Choice('text')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedQ1Choice === 'text'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-100'
              }`}
            >
              <BilingualText vi="Kiểu văn bản (Text)" en="Text type" />
            </button>

            <button
              type="button"
              onClick={() => setSelectedQ1Choice('number')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedQ1Choice === 'number'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-100'
              }`}
            >
              <BilingualText vi="Kiểu số (Number)" en="Number type" />
            </button>

            <button
              type="button"
              onClick={() => setShowAnswerQ1(!showAnswerQ1)}
              className="ml-auto px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center gap-1 hover:bg-indigo-100 cursor-pointer"
            >
              <span>{showAnswerQ1 ? (bilingualMode === 'en' ? 'Hide explanation' : 'Ẩn lời giải') : (bilingualMode === 'en' ? 'View textbook solution' : 'Xem lời giải chuẩn SGK')}</span>
              {showAnswerQ1 ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {selectedQ1Choice === 'text' && (
            <div className="p-3 rounded-xl text-xs font-semibold bg-emerald-100/70 text-emerald-900 border border-emerald-300">
              <BilingualText
                vi="Giải thích chuẩn SGK: Số CCCD là kiểu văn bản vì không dùng để thực hiện các phép toán cộng, trừ, nhân, chia và cần giữ lại chữ số 0 ở đầu."
                en="Official Textbook Explanation: A citizen ID number is of text type because it is not used in arithmetic calculations (addition, subtraction, multiplication, division) and leading zeros must be preserved."
              />
            </div>
          )}

          {showAnswerQ1 && (
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <BilingualText
                vi="Đáp án chuẩn SGK: Số căn cước công dân có kiểu văn bản. Lí do: Số CCCD dùng với mục đích định danh, nhận dạng chủ thể; các phép xử lí trên số CCCD là tìm kiếm, tra cứu, đối chiếu chứ không bao giờ thực hiện các phép tính số học (cộng, trừ). Ngoài ra, kiểu văn bản giúp giữ nguyên vẹn các chữ số '0' ở đầu (ví dụ mã tỉnh Hà Nội là 001)."
                en="Official Textbook Answer: A citizen ID number has text type. Reason: It is used for identity verification and identification; operations are searches and lookups rather than arithmetic computations. Furthermore, text type preserves leading zeros (e.g. Hanoi code is 001)."
              />
            </div>
          )}
        </div>

        {/* Question 2: Real numbers in records */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
            <BilingualText
              vi="2. Kiểu số thực thường dùng để biểu diễn các số có phần thập phân (phần lẻ). Em hãy cho ví dụ một loại hồ sơ có dữ liệu kiểu số thực."
              en="2. Real number types typically represent values with fractional components. Give an example of a record containing real number data."
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">
              <BilingualText
                vi="Ví dụ: Học bạ học sinh, Bệnh án y tế, Hồ sơ tuyển sinh..."
                en="Example: Student transcript, Medical records, Admission dossiers..."
              />
            </span>
            <button
              type="button"
              onClick={() => setShowAnswerQ2(!showAnswerQ2)}
              className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center gap-1 hover:bg-indigo-100 cursor-pointer"
            >
              <span>{showAnswerQ2 ? (bilingualMode === 'en' ? 'Hide explanation' : 'Ẩn lời giải') : (bilingualMode === 'en' ? 'View suggested examples' : 'Xem ví dụ gợi ý')}</span>
              {showAnswerQ2 ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {showAnswerQ2 && (
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 space-y-1.5">
              <div className="font-bold">
                <BilingualText
                  vi="Ví dụ gợi ý chuẩn SGK:"
                  en="Official Textbook Suggested Examples:"
                />
              </div>
              <div>
                <BilingualText
                  vi="• Hồ sơ học bạ học sinh: Điểm trung bình môn (ĐTB = 8.6), Điểm thi tuyển sinh (25.75)."
                  en="• Student Academic Transcript: Subject GPA (GPA = 8.6), Entrance exam score (25.75)."
                />
              </div>
              <div>
                <BilingualText
                  vi="• Hồ sơ sức khỏe / Bệnh án y tế: Chiều cao (1.68 m), Cân nặng (55.5 kg), Thân nhiệt (37.2 °C), Chỉ số khối cơ thể BMI (19.8)."
                  en="• Health Record / Medical Record: Height (1.68 m), Weight (55.5 kg), Body temperature (37.2 °C), Body mass index BMI (19.8)."
                />
              </div>
              <div>
                <BilingualText
                  vi="• Hồ sơ trắc địa / Địa lí: Toạ độ kinh độ / vĩ độ (10.762622, 106.660172), Độ cao so với mực nước biển (12.5 m)."
                  en="• Topographic / Geographic Record: Longitude / Latitude coordinates (10.762622, 106.660172), Elevation above sea level (12.5 m)."
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Next Step Nav Card */}
      <div className="p-4 rounded-3xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between">
        <div>
          <div className="text-xs text-indigo-700 dark:text-indigo-400 font-bold uppercase">
            Tiếp theo: Mục 2a
          </div>
          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
            Biểu diễn dữ liệu văn bản &amp; Bảng mã ASCII (Trang 17 SGK)
          </h4>
        </div>
        <button
          type="button"
          onClick={nextPage}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
        >
          <span>Sang Mục 2a</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
