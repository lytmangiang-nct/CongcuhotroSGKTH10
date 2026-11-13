import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  Binary, 
  Code2, 
  BookOpen, 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight,
  Filter,
  Eye,
  Terminal,
  Grid3X3,
  Volume2
} from 'lucide-react';
import { useBook } from '../context/BookContext';
import { EXTENDED_ASCII_TABLE, NIBBLES, AsciiEntry } from '../data/asciiData';

interface AsciiTableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AsciiTableModal: React.FC<AsciiTableModalProps> = ({ isOpen, onClose }) => {
  const { bilingualMode, setShowOriginalModal, setOriginalPageTarget, speak } = useBook();
  const isEn = bilingualMode === 'en';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<AsciiEntry>(EXTENDED_ASCII_TABLE[65]); // Default 'A' (65)
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'control' | 'printable' | 'extended'>('all');
  const [activeTab, setActiveTab] = useState<'grid' | 'converter' | 'search'>('grid');
  const [converterText, setConverterText] = useState('Tin hoc 10');
  const [copied, setCopied] = useState(false);

  // Filtered entries for search / list tab
  const filteredList = useMemo(() => {
    return EXTENDED_ASCII_TABLE.filter((e) => {
      if (categoryFilter !== 'all' && e.category !== categoryFilter) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        e.dec.toString().includes(q) ||
        e.hex.toLowerCase().includes(q) ||
        e.bin.includes(q) ||
        e.display.toLowerCase().includes(q) ||
        e.nameVi.toLowerCase().includes(q) ||
        e.nameEn.toLowerCase().includes(q)
      );
    });
  }, [categoryFilter, searchQuery]);

  // Live conversion of text to ASCII codes
  const convertedCodes = useMemo(() => {
    return Array.from(converterText).map((char) => {
      const code = char.charCodeAt(0);
      const hex = code.toString(16).toUpperCase().padStart(2, '0');
      const bin = code.toString(2).padStart(8, '0');
      return { char, code, hex, bin };
    });
  }, [converterText]);

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleOpenScan = () => {
    onClose();
    setOriginalPageTarget(165);
    setShowOriginalModal(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 text-white rounded-2xl w-full max-w-6xl h-[94vh] flex flex-col shadow-2xl border border-slate-700/80 overflow-hidden">
        {/* Top Control Bar */}
        <div className="p-3 sm:p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-900/95">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
              <Binary className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                  {isEn ? 'APPENDIX • TEXTBOOK P. 165' : 'PHỤ LỤC • TRANG 165 SGK'}
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  {isEn ? 'Extended ASCII Table (256 codes: 0 – 255)' : 'Bảng mã ASCII mở rộng (256 mã: 0 – 255)'}
                </span>
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-white truncate">
                {isEn ? 'Interactive Extended ASCII Code Explorer' : 'Tra Cứu & Khám Phá Bảng Mã ASCII Mở Rộng 8-bit'}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleOpenScan}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
              title={isEn ? 'View original textbook scan page 165' : 'Xem bản scan gốc trang 165 SGK'}
            >
              <Eye className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">{isEn ? 'View Page 165 Scan' : 'Bản scan gốc Tr. 165'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-rose-900/50 transition-colors cursor-pointer"
              title={isEn ? 'Close (Esc)' : 'Đóng (Esc)'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="px-4 py-2 bg-slate-800/90 border-b border-slate-700/60 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('grid')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'grid'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span>{isEn ? '16x16 Full Matrix' : 'Ma trận 16x16 (Chuẩn SGK Tr. 165)'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('converter')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'converter'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>{isEn ? 'Text ↔ ASCII Converter' : 'Bộ chuyển đổi Văn bản ↔ ASCII'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('search')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'search'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>{isEn ? 'Search & List' : 'Tìm kiếm & Danh sách chi tiết'}</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1">
            {(['all', 'control', 'printable', 'extended'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-slate-700 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat === 'all'
                  ? isEn ? 'All (256)' : 'Tất cả (256)'
                  : cat === 'control'
                  ? isEn ? 'Control (33)' : 'Điều khiển (33)'
                  : cat === 'printable'
                  ? isEn ? 'Standard (95)' : 'In chuẩn (95)'
                  : isEn ? 'Extended (128)' : 'Mở rộng (128)'}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* Main Display / Interactive Matrix */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
            {activeTab === 'grid' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                  <span>
                    {isEn 
                      ? 'Row: 4 high bits (Nibble cao) • Column: 4 low bits (Nibble thấp). Click any cell to inspect.'
                      : 'Hàng: 4 bit cao (High Nibble) • Cột: 4 bit thấp (Low Nibble). Nhấp vào ô bất kỳ để xem chi tiết.'}
                  </span>
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded bg-rose-900/60 border border-rose-600" />
                      <span>{isEn ? 'Control' : 'Điều khiển'}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded bg-blue-900/40 border border-blue-500" />
                      <span>{isEn ? 'Standard 7-bit' : 'Chuẩn 7-bit'}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded bg-emerald-900/40 border border-emerald-500" />
                      <span>{isEn ? 'Extended 8-bit' : 'Mở rộng 8-bit'}</span>
                    </span>
                  </div>
                </div>

                {/* 16x16 Table */}
                <div className="overflow-x-auto border border-slate-700 rounded-xl bg-slate-950 shadow-inner">
                  <table className="w-full text-center border-collapse font-mono text-xs select-none">
                    <thead>
                      <tr className="bg-slate-800 text-amber-300 font-bold border-b border-slate-700">
                        <th className="p-1.5 sm:p-2 border-r border-slate-700 text-[10px] sm:text-xs">
                          High \ Low
                        </th>
                        {NIBBLES.map((nibble) => (
                          <th key={nibble} className="p-1 sm:p-1.5 border-r border-slate-700 text-[10px] sm:text-xs min-w-[34px]">
                            {nibble}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {NIBBLES.map((highNibble, rowIdx) => (
                        <tr key={highNibble} className="border-b border-slate-800 hover:bg-slate-800/40">
                          {/* Row Header: High Nibble */}
                          <td className="p-1.5 bg-slate-800/80 text-amber-300 font-bold border-r border-slate-700 text-[10px] sm:text-xs">
                            {highNibble}
                          </td>

                          {/* 16 Cells in Row */}
                          {NIBBLES.map((lowNibble, colIdx) => {
                            const decCode = rowIdx * 16 + colIdx;
                            const entry = EXTENDED_ASCII_TABLE[decCode];
                            const isSelected = selectedEntry.dec === decCode;

                            let cellStyle = 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-750';
                            if (entry.category === 'control') {
                              cellStyle = 'bg-rose-950/40 text-rose-300 border-rose-900/60 hover:bg-rose-900/60';
                            } else if (entry.category === 'printable') {
                              cellStyle = 'bg-blue-950/30 text-blue-200 border-blue-900/50 hover:bg-blue-900/60';
                            } else {
                              cellStyle = 'bg-emerald-950/30 text-emerald-200 border-emerald-900/50 hover:bg-emerald-900/60';
                            }

                            if (isSelected) {
                              cellStyle = 'bg-amber-500 text-slate-950 font-black ring-2 ring-amber-300 z-10 scale-105 shadow-md';
                            }

                            return (
                              <td
                                key={lowNibble}
                                onClick={() => setSelectedEntry(entry)}
                                className={`p-1 border border-slate-800/80 cursor-pointer transition-all ${cellStyle}`}
                                title={`Dec: ${entry.dec} | Hex: 0x${entry.hex} | Bin: ${entry.bin} | Char: ${entry.display}`}
                              >
                                <div className="text-[11px] sm:text-xs font-bold truncate">
                                  {entry.display}
                                </div>
                                <div className={`text-[9px] ${isSelected ? 'text-slate-900' : 'text-slate-500'}`}>
                                  {entry.dec}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'converter' && (
              <div className="space-y-6">
                <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-amber-300 flex items-center gap-2">
                      <Terminal className="w-4 h-4" />
                      {isEn ? 'Live Text to ASCII Encoder' : 'Trình Mã Hoá Văn Bản ➔ Mã ASCII Trực Quan'}
                    </h4>
                    <span className="text-xs text-slate-400">
                      {isEn ? `Length: ${converterText.length} characters (${converterText.length * 8} bits)` : `Độ dài: ${converterText.length} kí tự (${converterText.length * 8} bits)`}
                    </span>
                  </div>

                  <input
                    type="text"
                    value={converterText}
                    onChange={(e) => setConverterText(e.target.value)}
                    placeholder={isEn ? "Enter text to encode (e.g. Informatics 10)..." : "Nhập văn bản cần mã hoá (vd: Tin hoc 10)..."}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-600 text-white font-mono text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />

                  {/* Character Breakdown */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      {isEn ? 'Byte-by-byte character decomposition:' : 'Phân rã từng byte kí tự:'}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {convertedCodes.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            const entry = EXTENDED_ASCII_TABLE[item.code % 256];
                            if (entry) setSelectedEntry(entry);
                          }}
                          className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-amber-400 cursor-pointer transition-colors space-y-1 text-center min-w-[70px]"
                        >
                          <div className="text-sm font-black text-amber-300">
                            {item.char === ' ' ? 'SPACE' : item.char}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400">
                            Dec: <strong className="text-white">{item.code}</strong>
                          </div>
                          <div className="text-[10px] font-mono text-indigo-300">
                            Hex: 0x{item.hex}
                          </div>
                          <div className="text-[9px] font-mono text-emerald-400">
                            {item.bin}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Byte stream copy */}
                  <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs space-y-1.5 border border-slate-800">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>{isEn ? 'Continuous binary bit stream:' : 'Dãy mã nhị phân liên tục (Bit stream):'}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(convertedCodes.map(c => c.bin).join(' '))}
                        className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? (isEn ? 'Copied' : 'Đã sao chép') : (isEn ? 'Copy bit stream' : 'Sao chép bit stream')}</span>
                      </button>
                    </div>
                    <div className="text-emerald-400 break-all select-all">
                      {convertedCodes.map(c => c.bin).join(' ')}
                    </div>
                  </div>
                </div>

                {/* Python Demo snippet */}
                <div className="bg-slate-800/60 rounded-2xl p-5 border border-slate-700/80 space-y-3">
                  <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wide">
                    <Code2 className="w-4 h-4" />
                    {isEn ? 'Python Programming Application (Lessons 16 – 32 Informatics 10)' : 'Ứng dụng trong lập trình Python (Bài 16 – 32 Tin học 10)'}
                  </div>
                  <pre className="p-3.5 rounded-xl bg-slate-950 text-slate-300 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
{`# 1. Chuyển kí tự sang mã ASCII:
code = ord('A')        # Output: 65
code_space = ord(' ')  # Output: 32

# 2. Chuyển mã số sang kí tự tương ứng:
char = chr(65)         # Output: 'A'
char_star = chr(42)    # Output: '*'

# 3. Mã hoá toàn bộ xâu kí tự sang mảng mã ASCII:
text = "${converterText}"
ascii_codes = [ord(c) for c in text]
print("Mã số:", ascii_codes)
# Output: [${convertedCodes.map(c => c.code).join(', ')}]`}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === 'search' && (
              <div className="space-y-4">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isEn ? "Search by decimal (e.g. 65), hex (0x41), binary, or character name..." : "Tìm theo số thập phân (vd: 65), Hex (0x41), nhị phân, hoặc tên kí tự..."}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {filteredList.map((entry) => {
                    const isSelected = selectedEntry.dec === entry.dec;
                    return (
                      <div
                        key={entry.dec}
                        onClick={() => setSelectedEntry(entry)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-500 shadow-md scale-[1.02]'
                            : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={`w-8 h-8 rounded-lg font-bold font-mono text-sm flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-slate-900 text-amber-300'
                          }`}>
                            {entry.display}
                          </span>
                          <div className="min-w-0">
                            <div className="font-bold truncate text-xs">
                              {isEn ? entry.nameEn : entry.nameVi}
                            </div>
                            <div className="text-[10px] opacity-70 font-mono">
                              Dec: {entry.dec} • Hex: 0x{entry.hex}
                            </div>
                          </div>
                        </div>
                        <span className="font-mono text-[10px] opacity-60 shrink-0">
                          {entry.bin}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Inspector Panel */}
          <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-slate-800 bg-slate-950 p-4 flex flex-col justify-between shrink-0 space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  {isEn ? 'Selected Character Details' : 'Chi tiết kí tự đã chọn'}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  selectedEntry.category === 'control'
                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                    : selectedEntry.category === 'printable'
                    ? 'bg-blue-950 text-blue-300 border border-blue-800'
                    : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                }`}>
                  {selectedEntry.category}
                </span>
              </div>

              {/* Big Character View */}
              <div className="flex items-center justify-center p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <div>
                  <div className="text-4xl sm:text-5xl font-mono font-black text-amber-400 mb-1">
                    {selectedEntry.display}
                  </div>
                  <div className="text-xs font-semibold text-slate-300">
                    {isEn ? selectedEntry.nameEn : selectedEntry.nameVi}
                  </div>
                  <div className="flex items-center justify-center gap-1.5 mt-1.5">
                    <span className="text-[11px] text-indigo-400 font-mono">({selectedEntry.nameEn})</span>
                    <button
                      type="button"
                      onClick={() => speak(selectedEntry.nameEn, 'en')}
                      className="p-1 rounded-md bg-indigo-950/60 hover:bg-indigo-900 text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
                      title={isEn ? "Listen to English pronunciation" : "Nghe phát âm tiếng Anh chuẩn"}
                    >
                      <Volume2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Parameter Matrix */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-0.5">
                  <span className="text-[10px] text-slate-500 font-medium">{isEn ? 'Decimal (Base 10)' : 'Hệ thập phân (Decimal)'}</span>
                  <div className="text-base font-bold font-mono text-white">
                    {selectedEntry.dec}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-0.5">
                  <span className="text-[10px] text-slate-500 font-medium">{isEn ? 'Hexadecimal (Base 16)' : 'Hệ thập lục phân (Hex)'}</span>
                  <div className="text-base font-bold font-mono text-indigo-400">
                    0x{selectedEntry.hex}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-0.5 col-span-2">
                  <span className="text-[10px] text-slate-500 font-medium">{isEn ? '8-bit Binary Byte' : 'Mã nhị phân 8-bit (Binary Byte)'}</span>
                  <div className="text-sm font-bold font-mono text-emerald-400 tracking-wider">
                    {selectedEntry.bin} ({selectedEntry.highNibble} {selectedEntry.lowNibble})
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-0.5">
                  <span className="text-[10px] text-slate-500 font-medium">{isEn ? '4 High Bits (Nibble)' : '4 bit cao (High)'}</span>
                  <div className="text-xs font-bold font-mono text-amber-300">
                    {selectedEntry.highNibble}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-0.5">
                  <span className="text-[10px] text-slate-500 font-medium">{isEn ? '4 Low Bits (Nibble)' : '4 bit thấp (Low)'}</span>
                  <div className="text-xs font-bold font-mono text-amber-300">
                    {selectedEntry.lowNibble}
                  </div>
                </div>
              </div>

              {/* Description Note */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400 leading-relaxed">
                {isEn ? `${selectedEntry.nameEn} — 8-bit extended ASCII character (code ${selectedEntry.dec}, hex 0x${selectedEntry.hex}, binary ${selectedEntry.bin}). Standardized in Textbook page 165.` : selectedEntry.descriptionVi}
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <button
                type="button"
                onClick={() => handleCopy(`Character: ${selectedEntry.display} | Dec: ${selectedEntry.dec} | Hex: 0x${selectedEntry.hex} | Bin: ${selectedEntry.bin}`)}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (isEn ? 'Copied!' : 'Đã sao chép') : (isEn ? 'Copy Character Data' : 'Sao chép thông tin')}</span>
              </button>

              <button
                type="button"
                onClick={handleOpenScan}
                className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/20"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{isEn ? 'View Textbook Page 165 Scan' : 'Xem bản in Trang 165 SGK'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
