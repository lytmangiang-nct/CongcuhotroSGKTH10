import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Shield,
  Search,
  Folder,
  HardDrive,
  FileCode,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Volume2,
  ArrowRight,
  ArrowLeft,
  Settings,
  HelpCircle,
  Sparkles,
  Table,
  Check,
  X,
  Layers,
  FileCheck
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section9AntivirusPractice: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    nextPage,
    prevPage,
    setOriginalPageTarget
  } = useBook();

  // Summary Table inspection state (SGK page 47)
  const [showTableAnswers, setShowTableAnswers] = useState(false);

  // Windows Defender Interactive Lab State (SGK pages 48-49)
  const [selectedScanMode, setSelectedScanMode] = useState<
    'quick' | 'full' | 'custom' | 'offline'
  >('quick');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scannedFilesCount, setScannedFilesCount] = useState(0);
  const [scanCompleted, setScanCompleted] = useState(false);
  const [threatDetected, setThreatDetected] = useState<string | null>(null);

  // Right-click context menu simulation (Hình 9.4)
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextScannedFolder, setContextScannedFolder] = useState<string | null>(null);

  const sectionSpeechVi =
    'Mục 2c và Thực hành: Phòng chống phần mềm độc hại bằng Windows Defender. Cần cẩn trọng khi sao chép tệp từ USB, không mở liên kết lạ trong tin nhắn và tuyệt đối không dùng phần mềm bẻ khóa. Hãy nắm vững bảng so sánh giữa virus, sâu máy tính và trojan theo Hộp ghi nhớ trang 47. Trong phần thực hành trang 48 và 49, học sinh làm quen với bảng điều khiển Windows Defender, phân biệt bốn chế độ quét: Quick scan, Full scan, Custom scan, và Windows Defender Offline scan; cùng thao tác quét nhanh thư mục bằng chuột phải.';
  const sectionSpeechEn =
    'Section 2c and Practical Lab: Malware Protection using Windows Defender. Exercise vigilance when copying files from external media, never click suspicious unsolicited links, and avoid cracked software. Master the comparative matrix differentiating viruses, worms, and trojans per the Page 47 Summary Box. In the practical lab on Pages 48 and 49, practice operating Windows Defender across four scan modes: Quick scan, Full scan, Custom scan, and Offline scan, alongside context-menu scanning.';

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

  // Scan simulation timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isScanning) {
      interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            setIsScanning(false);
            setScanCompleted(true);
            setThreatDetected(
              selectedScanMode === 'full' ? 'Trojan:Win32/Spyware.Keylogger (Đã cách ly)' : null
            );
            return 100;
          }
          setScannedFilesCount((c) => c + Math.floor(Math.random() * 450 + 120));
          return prev + 5;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isScanning, selectedScanMode]);

  const handleStartScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScannedFilesCount(0);
    setScanCompleted(false);
    setThreatDetected(null);
  };

  const handleResetScan = () => {
    setIsScanning(false);
    setScanProgress(0);
    setScannedFilesCount(0);
    setScanCompleted(false);
    setThreatDetected(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
            {bilingualMode === 'en' ? 'Section 2c & Practice • Textbook Pages 47–49' : 'Mục 2c & Thực hành • SGK Trang 47 - 49'}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            <BilingualText
              vi="PHÒNG CHỐNG MÃ ĐỘC & THỰC HÀNH WINDOWS DEFENDER"
              en="ANTIVIRUS DEFENSE & WINDOWS DEFENDER PRACTICE"
            />
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <BilingualText
              vi="Bảng so sánh 3 loại mã độc, 4 chế độ quét & Quét nhanh thư mục"
              en="3-Way Malware Comparison Table, 4 Scan Modes & Rapid Folder Scanning"
            />
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOriginalPageTarget(48)}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{bilingualMode === 'en' ? 'Textbook Page 48' : 'SGK Trang 48'}</span>
          </button>
        </div>
      </div>

      {/* Summary Box 2 (Hộp ghi nhớ trang 47) */}
      <div className="p-6 rounded-3xl bg-emerald-500/10 border-2 border-dashed border-emerald-500/60 text-slate-900 dark:text-slate-100 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <BilingualText
              inline
              vi="Hộp ghi nhớ trọng tâm (SGK Trang 47)"
              en="Core Summary Box (Textbook Page 47)"
            />
          </div>
          <button
            type="button"
            onClick={() =>
              speak(
                bilingualMode === 'en'
                  ? 'Key takeaways from page 47: Malware is software engineered with malicious intent to cause unauthorized and harmful impacts. Viruses and worms are infectious malware types; Trojans disguise themselves to steal confidential data and hijack system privileges. To prevent malware infections, never download unknown software or copy from unverified storage media. Always deploy and regularly update antivirus software to protect computer systems.'
                  : 'Ghi nhớ trọng tâm trang 47: Phần mềm độc hại là phần mềm viết ra với ý đồ xấu, gây ra các tác động không mong muốn. Virus và worm là các phần mềm độc hại có khả năng lây nhiễm; Trojan là phần mềm để ăn cắp thông tin và chiếm đoạt quyền trên máy. Để phòng ngừa, không lấy từ trên mạng hoặc sao chép qua các thiết bị nhớ những phần mềm không rõ nguồn gốc. Hãy sử dụng phần mềm diệt virus để bảo vệ máy tính.',
                bilingualMode === 'en' ? 'en' : 'vi'
              )
            }
            className="px-2.5 py-1 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
            title={bilingualMode === 'en' ? 'Listen to Summary' : 'Nghe toàn bộ ghi nhớ'}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{bilingualMode === 'en' ? 'Listen' : 'Nghe ghi nhớ'}</span>
          </button>
        </div>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 list-disc list-inside">
          <li>
            <BilingualText
              inline
              vi="Phần mềm độc hại là phần mềm viết ra với ý đồ xấu, gây ra các tác động không mong muốn."
              en="Malware is software engineered with malicious intent to cause unauthorized and harmful impacts."
            />
          </li>
          <li>
            <BilingualText
              inline
              vi="Virus và worm là các phần mềm độc hại có khả năng lây nhiễm; Trojan là phần mềm để ăn cắp thông tin và chiếm đoạt quyền trên máy."
              en="Viruses and worms are infectious malware types; Trojans disguise themselves to steal confidential data and hijack system privileges."
            />
          </li>
          <li>
            <BilingualText
              inline
              vi="Để phòng ngừa phần mềm độc hại, không lấy từ trên mạng hoặc sao chép qua các thiết bị nhớ những phần mềm mà mình không biết rõ. Khi nhận được email hay tin nhắn có liên kết, nếu không rõ về nguồn gốc thì không nên mở."
              en="To prevent malware infections, never download unknown software or copy from unverified storage media. Do not open email links from unknown or suspicious senders."
            />
          </li>
          <li>
            <BilingualText
              inline
              vi="Hãy sử dụng các phần mềm chống phần mềm độc hại để bảo vệ máy tính."
              en="Always deploy and regularly update antivirus/anti-malware software to protect computer systems."
            />
          </li>
        </ul>
      </div>

      {/* Comparative Matrix Table (SGK trang 47) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
            <Table className="w-5 h-5 text-emerald-600" />
            <span>
              {bilingualMode === 'en'
                ? 'Malware Comparison Matrix (SGK Page 47)'
                : 'Bảng tổng kết so sánh 3 loại phần mềm độc hại (SGK Trang 47)'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowTableAnswers(!showTableAnswers)}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 cursor-pointer"
          >
            {showTableAnswers
              ? (bilingualMode === 'en' ? 'Hide Comparison Answers' : 'Ẩn đáp án đối chiếu')
              : (bilingualMode === 'en' ? 'Show SGK Table Answers' : 'Hiện đáp án điền bảng SGK')}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-amber-100/70 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-b border-amber-200 dark:border-amber-800">
                <th className="p-3 font-bold rounded-tl-xl">
                  {bilingualMode === 'en' ? 'Malware Type' : 'Loại phần mềm'}
                </th>
                <th className="p-3 font-bold">
                  {bilingualMode === 'en' ? 'Software Completeness' : 'Tính hoàn chỉnh'}
                </th>
                <th className="p-3 font-bold">
                  {bilingualMode === 'en' ? 'Infection Mechanism' : 'Cơ chế lây nhiễm'}
                </th>
                <th className="p-3 font-bold rounded-tr-xl">
                  {bilingualMode === 'en' ? 'Primary Damage' : 'Tác hại chủ yếu'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {/* VIRUS */}
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-bold text-fuchsia-600 dark:text-fuchsia-400">Virus</td>
                <td className="p-3">
                  {showTableAnswers ? (
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {bilingualMode === 'en' ? (
                        <>
                          <strong>Incomplete</strong> (parasitic executable code segment)
                        </>
                      ) : (
                        <>
                          <strong>Không hoàn chỉnh</strong> (chỉ là đoạn mã độc ký sinh)
                        </>
                      )}
                    </span>
                  ) : (
                    <span className="font-mono text-amber-600">
                      {bilingualMode === 'en' ? '? (Click Show Answers)' : '? (Bấm hiện đáp án)'}
                    </span>
                  )}
                </td>
                <td className="p-3">
                  {showTableAnswers ? (
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {bilingualMode === 'en'
                        ? 'Must latch onto host executable to spread; loads into RAM on host execution to infect other files'
                        : 'Phải gắn vào một phần mềm chủ mới lây được; nạp vào RAM khi phần mềm chủ chạy để chèn sang tệp khác'}
                    </span>
                  ) : (
                    <span className="font-mono text-amber-600">
                      {bilingualMode === 'en' ? '? (Click Show Answers)' : '? (Bấm hiện đáp án)'}
                    </span>
                  )}
                </td>
                <td className="p-3">
                  {showTableAnswers ? (
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {bilingualMode === 'en'
                        ? 'Corrupts software, wipes storage files, degrades speed or paralyzes system'
                        : 'Làm hỏng phần mềm, xóa dữ liệu, làm chậm hoặc tê liệt máy'}
                    </span>
                  ) : (
                    <span className="font-mono text-amber-600">
                      {bilingualMode === 'en' ? '? (Click Show Answers)' : '? (Bấm hiện đáp án)'}
                    </span>
                  )}
                </td>
              </tr>

              {/* TROJAN */}
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-bold text-amber-600 dark:text-amber-400">Trojan</td>
                <td className="p-3">
                  {showTableAnswers ? (
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {bilingualMode === 'en' ? (
                        <strong>Standalone complete software</strong>
                      ) : (
                        <strong>Phần mềm hoàn chỉnh</strong>
                      )}
                    </span>
                  ) : (
                    <span className="font-mono text-amber-600">
                      {bilingualMode === 'en' ? '? (Click Show Answers)' : '? (Bấm hiện đáp án)'}
                    </span>
                  )}
                </td>
                <td className="p-3">
                  {showTableAnswers ? (
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {bilingualMode === 'en'
                        ? 'Does not self-replicate; disguises as benign utility to trick users into manual installation'
                        : 'Không tự lây lan; ngụy trang dưới vỏ bọc lành tính lừa người dùng tự cài đặt'}
                    </span>
                  ) : (
                    <span className="font-mono text-amber-600">
                      {bilingualMode === 'en' ? '? (Click Show Answers)' : '? (Bấm hiện đáp án)'}
                    </span>
                  )}
                </td>
                <td className="p-3">
                  {showTableAnswers ? (
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {bilingualMode === 'en'
                        ? 'Espionage & credential theft (Keyloggers), installs Backdoors, escalates admin privileges (Rootkits)'
                        : 'Nội gián ăn cắp tài khoản (Keylogger), mở cửa sau (Backdoor), chiếm quyền tối cao (Rootkit)'}
                    </span>
                  ) : (
                    <span className="font-mono text-amber-600">
                      {bilingualMode === 'en' ? '? (Click Show Answers)' : '? (Bấm hiện đáp án)'}
                    </span>
                  )}
                </td>
              </tr>

              {/* WORM */}
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">Worm</td>
                <td className="p-3">
                  {showTableAnswers ? (
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {bilingualMode === 'en' ? (
                        <strong>Standalone complete software</strong>
                      ) : (
                        <strong>Phần mềm hoàn chỉnh</strong>
                      )}
                    </span>
                  ) : (
                    <span className="font-mono text-amber-600">
                      {bilingualMode === 'en' ? '? (Click Show Answers)' : '? (Bấm hiện đáp án)'}
                    </span>
                  )}
                </td>
                <td className="p-3">
                  {showTableAnswers ? (
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {bilingualMode === 'en'
                        ? 'Autonomously self-replicates and spreads across network vulnerabilities (OS exploits or email links)'
                        : 'Tự nhân bản và tự lan truyền độc lập qua mạng bằng lỗ hổng bảo mật HĐH hoặc lừa link email'}
                    </span>
                  ) : (
                    <span className="font-mono text-amber-600">
                      {bilingualMode === 'en' ? '? (Click Show Answers)' : '? (Bấm hiện đáp án)'}
                    </span>
                  )}
                </td>
                <td className="p-3">
                  {showTableAnswers ? (
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {bilingualMode === 'en'
                        ? 'High-speed network congestion, converts machines into zombie botnets, ransomware extortion (WannaCry)'
                        : 'Lây lan siêu tốc làm tê liệt mạng, biến máy thành zombie botnet, mã hóa tống tiền (WannaCry)'}
                    </span>
                  ) : (
                    <span className="font-mono text-amber-600">
                      {bilingualMode === 'en' ? '? (Click Show Answers)' : '? (Bấm hiện đáp án)'}
                    </span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* PRACTICAL LAB: Windows Defender Interactive Console Simulator (Hình 9.1 - 9.3 SGK) */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-blue-400 font-bold uppercase tracking-wider">
                {bilingualMode === 'en'
                  ? 'Virtual Lab • Textbook Pages 48–49'
                  : 'Thực hành ảo SGK Trang 48 - 49'}
              </div>
              <div className="text-sm font-bold">
                Windows Security • Virus & threat protection Simulator
              </div>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-mono">
            Windows 10/11 Security Engine
          </span>
        </div>

        {/* Scan Mode Selector (Hình 9.3) */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-300">
            {bilingualMode === 'en'
              ? 'Select Scan Option (Figure 9.3 Page 49):'
              : 'Chọn kiểu quét trong Scan Options (Hình 9.3 Trang 49):'}
          </div>
          <div className="grid sm:grid-cols-4 gap-2.5">
            {[
              {
                id: 'quick' as const,
                title: bilingualMode === 'en' ? '1. Quick scan' : '1. Quick scan (Quét nhanh)',
                desc:
                  bilingualMode === 'en'
                    ? 'Scans high-risk critical folders (RAM, Program Files)'
                    : 'Quét các thư mục có nguy cơ cao (RAM, Program Files)'
              },
              {
                id: 'full' as const,
                title: bilingualMode === 'en' ? '2. Full scan' : '2. Full scan (Quét hết)',
                desc:
                  bilingualMode === 'en'
                    ? 'Checks all files and running programs on all hard drives'
                    : 'Quét toàn bộ mọi tệp và ổ đĩa cứng trên máy'
              },
              {
                id: 'custom' as const,
                title: bilingualMode === 'en' ? '3. Custom scan' : '3. Custom scan (Theo yêu cầu)',
                desc:
                  bilingualMode === 'en'
                    ? 'Specifies a target folder, file, or custom partition'
                    : 'Chỉ định một thư mục hoặc phân vùng cụ thể'
              },
              {
                id: 'offline' as const,
                title:
                  bilingualMode === 'en'
                    ? '4. Microsoft Defender Offline scan'
                    : '4. Offline scan (Ngoại tuyến)',
                desc:
                  bilingualMode === 'en'
                    ? 'Reboots machine to eradicate deeply rooted rootkits before OS loads'
                    : 'Khởi động lại máy để quét sâu trước khi HĐH load'
              }
            ].map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => {
                  setSelectedScanMode(mode.id);
                  handleResetScan();
                }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedScanMode === mode.id
                    ? 'bg-blue-600/30 border-blue-500 text-white shadow-md'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="font-bold text-xs mb-1">{mode.title}</div>
                <div className="text-[11px] opacity-80 leading-snug">{mode.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Scan Actions & Progress Console */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={isScanning}
                onClick={handleStartScan}
                className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-600/30"
              >
                <Play className="w-4 h-4" />
                <span>
                  {isScanning
                    ? (bilingualMode === 'en' ? 'Scanning system...' : 'Đang quét hệ thống...')
                    : (bilingualMode === 'en'
                        ? `Start Scan (${selectedScanMode.toUpperCase()})`
                        : `Bắt đầu quét (${selectedScanMode.toUpperCase()})`)}
                </span>
              </button>
              {(isScanning || scanCompleted) && (
                <button
                  type="button"
                  onClick={handleResetScan}
                  className="px-3 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{bilingualMode === 'en' ? 'Reset' : 'Đặt lại'}</span>
                </button>
              )}
            </div>

            <div className="text-xs font-mono text-slate-400">
              {bilingualMode === 'en' ? 'Files scanned: ' : 'Tệp đã kiểm tra: '}
              <span className="text-cyan-400 font-bold">
                {scannedFilesCount.toLocaleString()} {bilingualMode === 'en' ? 'files' : 'tệp'}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>{bilingualMode === 'en' ? 'Scan progress' : 'Tiến trình quét'}</span>
              <span>{scanProgress}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-150"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
          </div>

          {/* Result card */}
          {scanCompleted && (
            <div
              className={`p-4 rounded-2xl border text-xs space-y-2 animate-in fade-in ${
                threatDetected
                  ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                  : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {threatDetected ? (
                  <>
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>
                      {bilingualMode === 'en'
                        ? 'Active Malware Threat Detected!'
                        : 'Phát hiện mối nguy hiểm mã độc!'}
                    </span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>
                      {bilingualMode === 'en'
                        ? 'System Clean (No current threats found)'
                        : 'Hệ thống an toàn (No current threats found)'}
                    </span>
                  </>
                )}
              </div>
              <p className="text-slate-300 leading-relaxed">
                {threatDetected
                  ? (bilingualMode === 'en'
                      ? `Windows Defender detected: ${threatDetected}. Automatically quarantined and blocked access to the infected file.`
                      : `Windows Defender đã phát hiện: ${threatDetected}. Đã tự động cách ly và ngăn chặn truy cập vào tệp bị nhiễm.`)
                  : (bilingualMode === 'en'
                      ? `Completed ${selectedScanMode} scan. 0 threats detected on your computer.`
                      : `Đã hoàn thành lượt quét ${selectedScanMode}. 0 mối nguy cơ được phát hiện trên máy tính của bạn.`)}
              </p>
            </div>
          )}
        </div>

        {/* Context Menu Right-Click Simulation (Hình 9.4 SGK trang 49) */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <Folder className="w-4 h-4 text-amber-400" />
              <span>
                {bilingualMode === 'en'
                  ? 'Folder Context Menu Shortcut (Figure 9.4 Page 49)'
                  : 'Thao tác quét nhanh thư mục bằng chuột phải (Hình 9.4 Trang 49)'}
              </span>
            </div>
            <span className="text-[11px] text-slate-500">
              {bilingualMode === 'en' ? 'Click folder to test context scan' : 'Nhấp vào thư mục để thử'}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {['Downloads', 'TaiLieuLop10', 'USB_Drive_F'].map((folder) => (
              <div key={folder} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setContextScannedFolder(folder);
                    setShowContextMenu(true);
                  }}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 flex items-center gap-2 border border-slate-700 cursor-pointer"
                >
                  <Folder className="w-4 h-4 text-amber-400" />
                  <span>{folder}</span>
                </button>
              </div>
            ))}
          </div>

          {showContextMenu && contextScannedFolder && (
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs space-y-2 animate-in fade-in max-w-sm mt-2">
              <div className="text-[11px] text-slate-400">
                {bilingualMode === 'en'
                  ? `Right-click context menu on [${contextScannedFolder}]:`
                  : `Menu ngữ cảnh chuột phải trên thư mục [${contextScannedFolder}]:`}
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowContextMenu(false);
                  setSelectedScanMode('custom');
                  handleStartScan();
                }}
                className="w-full px-3 py-2 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-white font-bold flex items-center gap-2 text-left transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-cyan-300" />
                <span>Scan with Windows Defender...</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Pedagogical Prompts */}
      <TeacherPromptsWidget sectionIndex={4} lessonId={9} />

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={prevPage}
          className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'Previous' : 'Quay lại'}</span>
        </button>
        <button
          type="button"
          onClick={nextPage}
          className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-emerald-500/25"
        >
          <span>
            {bilingualMode === 'en'
              ? 'Section 5: Practice & Certificate'
              : 'Mục 5: Luyện tập, Vận dụng & Chứng nhận'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
