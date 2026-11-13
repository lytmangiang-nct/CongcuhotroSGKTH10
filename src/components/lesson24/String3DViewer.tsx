import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useBook } from '../../context/BookContext';
import {
  Layers,
  Sparkles,
  Lock,
  Unlock,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Search,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Type
} from 'lucide-react';

type Mode3D = 'immutable_slots' | 'traversal_filter' | 'substring_scanner';

export const String3DViewer: React.FC = () => {
  const { bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';
  const mountRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode3D>('immutable_slots');
  const modeRef = useRef<Mode3D>(mode);
  modeRef.current = mode;

  // Mode 1: String & Immutability
  const [currentStr, setCurrentStr] = useState<string>('Thời khoá biểu');
  const currentStrRef = useRef<string>(currentStr);
  currentStrRef.current = currentStr;
  const [selectedCharIdx, setSelectedCharIdx] = useState<number>(0);
  const selectedCharIdxRef = useRef<number>(0);
  selectedCharIdxRef.current = selectedCharIdx;
  const [showTypeErrorLock, setShowTypeErrorLock] = useState<boolean>(false);
  const showTypeErrorLockRef = useRef<boolean>(false);
  showTypeErrorLockRef.current = showTypeErrorLock;

  // Mode 2: Traversal & Filtering
  const [filterStr, setFilterStr] = useState<string>('81723');
  const filterStrRef = useRef<string>(filterStr);
  filterStrRef.current = filterStr;
  const [scanIdx, setScanIdx] = useState<number>(0);
  const scanIdxRef = useRef<number>(0);
  scanIdxRef.current = scanIdx;
  const [filteredResult, setFilteredResult] = useState<string>('173');
  const [isScanningActive, setIsScanningActive] = useState<boolean>(true);
  const isScanningActiveRef = useRef<boolean>(true);
  isScanningActiveRef.current = isScanningActive;

  // Mode 3: Substring Finder "s1 in s2"
  const [parentStr, setParentStr] = useState<string>('ababcabca');
  const parentStrRef = useRef<string>(parentStr);
  parentStrRef.current = parentStr;
  const [querySub, setQuerySub] = useState<string>('abc');
  const querySubRef = useRef<string>(querySub);
  querySubRef.current = querySub;
  const [subMatchIdx, setSubMatchIdx] = useState<number>(2); // first found at index 2
  const subMatchIdxRef = useRef<number>(2);
  subMatchIdxRef.current = subMatchIdx;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 700;
    const height = container.clientHeight || 420;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1d);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 9, 21);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.3);
    dirLight.position.set(12, 24, 18);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x38bdf8, 2, 40);
    pointLight.position.set(0, 6, 6);
    scene.add(pointLight);

    // Floor Grid
    const grid = new THREE.GridHelper(36, 36, 0x1e293b, 0x0f172a);
    grid.position.y = -2.2;
    scene.add(grid);

    const group = new THREE.Group();
    scene.add(group);

    const textureCache = new Map<string, THREE.CanvasTexture>();

    const getCharTexture = (topText: string, char: string, bg: string, fg: string) => {
      const displayChar = char === ' ' ? '␣' : char;
      const key = `${topText}|${displayChar}|${bg}|${fg}`;
      if (textureCache.has(key)) return textureCache.get(key)!;

      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, 256, 256);

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 8;
        ctx.strokeRect(4, 4, 248, 248);

        // Top Index Label
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 30px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(topText, 128, 60);

        // Main Character
        ctx.fillStyle = fg;
        ctx.font = 'bold 88px monospace';
        ctx.fillText(displayChar, 128, 168);
      }
      const tex = new THREE.CanvasTexture(canvas);
      textureCache.set(key, tex);
      return tex;
    };

    let animationFrameId: number;
    const clock = new THREE.Clock();
    let scanTimer = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      camera.position.x = Math.sin(elapsed * 0.15) * 2;
      camera.lookAt(0, 0, 0);

      // Clean group children
      while (group.children.length > 0) {
        const obj = group.children[0];
        group.remove(obj);
        if ((obj as any).geometry) (obj as any).geometry.dispose();
      }

      const curMode = modeRef.current;

      if (curMode === 'immutable_slots') {
        // Mode 1: Character Slots & Immutability Shield
        const str = currentStrRef.current;
        const total = str.length;
        const spacing = Math.min(1.8, 26 / Math.max(total, 1));
        const startX = -((total - 1) * spacing) / 2;
        const selIdx = selectedCharIdxRef.current;
        const isLocked = showTypeErrorLockRef.current;

        for (let idx = 0; idx < total; idx++) {
          const ch = str[idx];
          const x = startX + idx * spacing;
          const isSel = idx === selIdx;

          // Pedestal Base
          const baseGeo = new THREE.BoxGeometry(spacing * 0.85, 0.3, 1.8);
          const baseMat = new THREE.MeshStandardMaterial({
            color: isSel ? (isLocked ? 0xef4444 : 0x06b6d4) : 0x1e293b,
            metalness: 0.5,
            roughness: 0.3
          });
          const baseMesh = new THREE.Mesh(baseGeo, baseMat);
          baseMesh.position.set(x, -2, 0);
          group.add(baseMesh);

          // Character Box
          const boxSize = spacing * 0.8;
          const boxGeo = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
          const tex = getCharTexture(
            `s[${idx}]`,
            ch,
            isSel ? (isLocked ? '#7f1d1d' : '#083344') : '#0f172a',
            isSel ? (isLocked ? '#f87171' : '#22d3ee') : '#94a3b8'
          );
          const boxMat = new THREE.MeshBasicMaterial({ map: tex });
          const boxMesh = new THREE.Mesh(boxGeo, boxMat);
          const bounce = isSel ? Math.sin(elapsed * 4) * 0.2 + 0.3 : 0;
          boxMesh.position.set(x, bounce, 0);
          group.add(boxMesh);
        }

        // Lock / Immutable Shield above selected slot
        if (isLocked) {
          const targetX = startX + selIdx * spacing;
          const shieldGeo = new THREE.TorusGeometry(1.2, 0.15, 12, 32);
          const shieldMat = new THREE.MeshStandardMaterial({
            color: 0xef4444,
            emissive: 0x991b1b,
            emissiveIntensity: 0.8
          });
          const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
          shieldMesh.position.set(targetX, 2.5, 0);
          shieldMesh.rotation.y = elapsed * 2;
          group.add(shieldMesh);
        }
      } else if (curMode === 'traversal_filter') {
        // Mode 2: Scanner & Digit Filter "81723" -> "173"
        const str = filterStrRef.current;
        const total = str.length;
        const spacing = 2.4;
        const startX = -((total - 1) * spacing) / 2;
        const curScan = scanIdxRef.current;

        for (let idx = 0; idx < total; idx++) {
          const ch = str[idx];
          const x = startX + idx * spacing;
          const isScanning = idx === curScan;
          const isOdd = parseInt(ch, 10) % 2 !== 0;

          const boxGeo = new THREE.BoxGeometry(1.8, 1.8, 1.8);
          const tex = getCharTexture(
            `i=${idx}`,
            ch,
            isScanning ? (isOdd ? '#065f46' : '#7f1d1d') : '#0f172a',
            isScanning ? (isOdd ? '#34d399' : '#f87171') : '#94a3b8'
          );
          const boxMat = new THREE.MeshBasicMaterial({ map: tex });
          const boxMesh = new THREE.Mesh(boxGeo, boxMat);
          boxMesh.position.set(x, 0, 0);
          group.add(boxMesh);
        }

        // Laser scanner head
        const scannerX = startX + curScan * spacing;
        const scannerGeo = new THREE.CylinderGeometry(0.8, 1.2, 0.4, 16);
        const scannerMat = new THREE.MeshStandardMaterial({
          color: 0x10b981,
          emissive: 0x059669,
          emissiveIntensity: 0.6
        });
        const scannerMesh = new THREE.Mesh(scannerGeo, scannerMat);
        scannerMesh.position.set(scannerX, 3.2, 0);
        group.add(scannerMesh);

        // Light beam
        const beamGeo = new THREE.CylinderGeometry(0.1, 0.9, 2.5, 16);
        const beamMat = new THREE.MeshBasicMaterial({
          color: 0x34d399,
          transparent: true,
          opacity: 0.4
        });
        const beamMesh = new THREE.Mesh(beamGeo, beamMat);
        beamMesh.position.set(scannerX, 1.7, 0);
        group.add(beamMesh);

        if (isScanningActiveRef.current) {
          scanTimer += delta;
          if (scanTimer > 1.2) {
            scanTimer = 0;
            setScanIdx(prev => (prev + 1) % total);
          }
        }
      } else {
        // Mode 3: Substring Scanner s1 in s2
        const pStr = parentStrRef.current;
        const total = pStr.length;
        const spacing = 1.8;
        const startX = -((total - 1) * spacing) / 2;
        const matchIdx = subMatchIdxRef.current;
        const subLen = querySubRef.current.length;

        for (let idx = 0; idx < total; idx++) {
          const ch = pStr[idx];
          const x = startX + idx * spacing;
          const isMatched = matchIdx >= 0 && idx >= matchIdx && idx < matchIdx + subLen;

          const boxGeo = new THREE.BoxGeometry(1.4, 1.4, 1.4);
          const tex = getCharTexture(
            `s[${idx}]`,
            ch,
            isMatched ? '#065f46' : '#1e1b4b',
            isMatched ? '#34d399' : '#38bdf8'
          );
          const boxMat = new THREE.MeshBasicMaterial({ map: tex });
          const boxMesh = new THREE.Mesh(boxGeo, boxMat);
          const bounce = isMatched ? Math.sin(elapsed * 5) * 0.2 + 0.3 : 0;
          boxMesh.position.set(x, bounce, 0);
          group.add(boxMesh);
        }

        // Bounding window around matched substring
        if (matchIdx >= 0) {
          const winCenterX = startX + (matchIdx + (subLen - 1) / 2) * spacing;
          const bracketGeo = new THREE.BoxGeometry(subLen * spacing + 0.2, 2.2, 2.2);
          const bracketMat = new THREE.MeshBasicMaterial({
            color: 0x10b981,
            wireframe: true
          });
          const bracketMesh = new THREE.Mesh(bracketGeo, bracketMat);
          bracketMesh.position.set(winCenterX, 0.4, 0);
          group.add(bracketMesh);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      textureCache.forEach(t => t.dispose());
      textureCache.clear();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Immutability simulation trigger
  const handleAttemptMutation = () => {
    setShowTypeErrorLock(true);
    setTimeout(() => {
      setShowTypeErrorLock(false);
    }, 3500);
  };

  const handleSearchSubstring = (sub: string) => {
    setQuerySub(sub);
    const idx = parentStr.indexOf(sub);
    setSubMatchIdx(idx);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
      {/* 3D Header Controls */}
      <div className="p-4 bg-slate-950/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-600/30 text-cyan-400 flex items-center justify-center">
            <Type className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-white text-sm flex items-center gap-2">
              <span>{isEn ? '3D WebGL Simulation: Python String Data Type (Lesson 24)' : 'Mô Phỏng 3D WebGL: Kiểu Dữ Liệu Xâu Kí Tự (Bài 24)'}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-cyan-500/20 text-cyan-300 font-mono">
                {mode === 'immutable_slots' && `len = ${currentStr.length}`}
                {mode === 'traversal_filter' && '81723 -> 173'}
                {mode === 'substring_scanner' && `s1="${querySub}"`}
              </span>
            </div>
            <div className="text-xs text-slate-400">
              {mode === 'immutable_slots' && (isEn ? 'Mode 1: Character memory slots 0..len-1 & testing immutability (TypeError)' : 'Chế độ 1: Ô nhớ ký tự 0..len-1 & kiểm chứng tính bất biến (TypeError)')}
              {mode === 'traversal_filter' && (isEn ? 'Mode 2: Traversal reader for ch in s & odd digits filter (Consolidation 1)' : 'Chế độ 2: Đầu đọc duyệt for ch in s & bộ lọc số lẻ (Củng cố 1)')}
              {mode === 'substring_scanner' && (isEn ? 'Mode 3: Substring sensor "s1 in s2" & contiguous pattern matcher' : 'Chế độ 3: Kính soi xâu con "s1 in s2" & đối sánh mẫu liên tiếp')}
            </div>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setMode('immutable_slots')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'immutable_slots'
                ? 'bg-cyan-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isEn ? '1. Memory & Immutability' : '1. Ô Nhớ & Bất Biến'}
          </button>
          <button
            onClick={() => setMode('traversal_filter')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'traversal_filter'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isEn ? '2. Traverse & Filter' : '2. Duyệt & Lọc Xâu'}
          </button>
          <button
            onClick={() => setMode('substring_scanner')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'substring_scanner'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isEn ? '3. Substring (in)' : '3. Xâu Con (in)'}
          </button>
        </div>
      </div>

      {/* WebGL Canvas Viewport */}
      <div className="relative w-full h-[360px] sm:h-[400px] overflow-hidden select-none bg-slate-950">
        <div ref={mountRef} className="absolute inset-0 w-full h-full" />

        {/* HUD Mode 1 */}
        {mode === 'immutable_slots' && (
          <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md p-3 rounded-2xl border border-slate-800 text-xs text-white space-y-1.5 pointer-events-none z-10 max-w-sm shadow-xl">
            <div className="font-mono font-bold text-cyan-400">
              s = "{currentStr}"
            </div>
            <div className="text-[11px] text-slate-300">
              • {isEn ? 'Length:' : 'Độ dài:'} <span className="font-mono text-emerald-400 font-bold">{currentStr.length}</span> (len(s))
            </div>
            <div className="text-[11px] text-slate-300">
              • {isEn ? 'Selected:' : 'Đang chọn:'} <span className="font-mono text-amber-300 font-bold">s[{selectedCharIdx}] = '{currentStr[selectedCharIdx] === ' ' ? ' ' : currentStr[selectedCharIdx]}'</span>
            </div>
            {showTypeErrorLock && (
              <div className="text-[11px] font-mono text-rose-400 font-bold pt-1 border-t border-slate-800 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>TypeError: 'str' object does not support item assignment</span>
              </div>
            )}
          </div>
        )}

        {/* HUD Mode 2 */}
        {mode === 'traversal_filter' && (
          <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md p-3 rounded-2xl border border-slate-800 text-xs text-white space-y-1.5 pointer-events-none z-10 max-w-xs shadow-xl">
            <div className="font-mono font-bold text-emerald-400">
              s = "{filterStr}" {isEn ? '(Consolidation 1 - Page 121)' : '(Củng cố 1 - Trang 121)'}
            </div>
            <div className="text-[11px] text-slate-300">
              • {isEn ? 'Traversing:' : 'Đang duyệt:'} <span className="font-mono text-amber-300 font-bold">ch = '{filterStr[scanIdx]}'</span> ({isEn ? 'at' : 'tại'} i = {scanIdx})
            </div>
            <div className="text-[11px] text-slate-300">
              • {isEn ? 'Check:' : 'Kiểm tra:'} <span className="font-mono text-cyan-300 font-bold">int('{filterStr[scanIdx]}') % 2 != 0</span>
              {' -> '}
              {parseInt(filterStr[scanIdx], 10) % 2 !== 0 ? (
                <span className="text-emerald-400 font-bold">True ({isEn ? 'Keep' : 'Lấy'})</span>
              ) : (
                <span className="text-rose-400 font-bold">False ({isEn ? 'Skip' : 'Bỏ'})</span>
              )}
            </div>
            <div className="text-[11px] text-emerald-300 pt-1 border-t border-slate-800 font-mono font-bold">
              {isEn ? 'Accumulated result:' : 'skq tích luỹ:'} "{filteredResult}"
            </div>
          </div>
        )}

        {/* HUD Mode 3 */}
        {mode === 'substring_scanner' && (
          <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md p-3 rounded-2xl border border-slate-800 text-xs text-white space-y-1.5 pointer-events-none z-10 max-w-xs shadow-xl">
            <div className="font-mono font-bold text-indigo-400">
              s2 = "{parentStr}"
            </div>
            <div className="text-[11px] text-slate-300">
              • {isEn ? 'Substring expression:' : 'Biểu thức xâu con:'} <span className="font-mono text-amber-300 font-bold">"{querySub}" in s2</span>
            </div>
            <div className="text-[11px] font-bold">
              {subMatchIdx >= 0 ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {isEn ? `Result: True (Found at index ${subMatchIdx})` : `Kết quả: True (Xuất hiện tại vị trí ${subMatchIdx})`}
                </span>
              ) : (
                <span className="text-rose-400 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> {isEn ? 'Result: False (Substring not found)' : 'Kết quả: False (Không tìm thấy xâu con)'}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Bottom Control Toolbar */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        {mode === 'immutable_slots' && (
          <div className="flex flex-wrap items-center gap-3 w-full justify-between">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">{isEn ? 'Select character:' : 'Chọn kí tự:'}</span>
              <div className="flex items-center gap-1 overflow-x-auto max-w-full sm:max-w-xs md:max-w-md py-1">
                {Array.from(currentStr).map((ch, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedCharIdx(idx)}
                    className={`px-2 py-0.5 rounded font-mono font-bold text-xs shrink-0 cursor-pointer ${
                      selectedCharIdx === idx
                        ? 'bg-cyan-500 text-slate-950 shadow'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    [{idx}]
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAttemptMutation}
                className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer shadow"
                title={isEn ? "Try assigning s[0] = 'A' to verify TypeError" : "Thử gán s[0] = 'A' để kiểm chứng lỗi TypeError"}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isEn ? `Try assign s[${selectedCharIdx}] = 'A'` : `Thử gán s[${selectedCharIdx}] = 'A'`}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentStr('Thời khoá biểu');
                  setSelectedCharIdx(0);
                  setShowTypeErrorLock(false);
                }}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                title={isEn ? "Restore" : "Khôi phục"}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {mode === 'traversal_filter' && (
          <div className="flex flex-wrap items-center gap-3 w-full justify-between">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">{isEn ? 'String s:' : 'Xâu s:'}</span>
              <input
                type="text"
                value={filterStr}
                onChange={e => {
                  setFilterStr(e.target.value);
                  const filtered = Array.from(e.target.value)
                    .filter(c => !isNaN(Number(c)) && Number(c) % 2 !== 0)
                    .join('');
                  setFilteredResult(filtered);
                }}
                className="bg-slate-900 border border-slate-700 text-white font-mono text-xs px-2 py-1 rounded-lg w-28 focus:outline-none"
              />
              <span className="text-emerald-400 font-mono font-bold">
                skq = "{filteredResult}"
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsScanningActive(v => !v)}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl transition-all"
              >
                {isScanningActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isScanningActive ? (isEn ? 'Pause scanning' : 'Tạm dừng quét') : (isEn ? 'Resume scanning' : 'Tiếp tục quét')}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setFilterStr('81723');
                  setScanIdx(0);
                  setFilteredResult('173');
                }}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {mode === 'substring_scanner' && (
          <div className="flex flex-wrap items-center gap-2.5 w-full justify-between">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-slate-400">{isEn ? 'Test substring:' : 'Thử xâu con:'}</span>
              {['abc', 'abcabc', 'abcabca', 'abc123', '10'].map(sub => (
                <button
                  key={sub}
                  type="button"
                  onClick={() => handleSearchSubstring(sub)}
                  className={`px-2 py-1 rounded-lg font-mono text-xs font-bold transition-all ${
                    querySub === sub
                      ? 'bg-indigo-600 text-white shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  "{sub}" in s2
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={querySub}
                onChange={e => handleSearchSubstring(e.target.value)}
                placeholder={isEn ? "Enter substring" : "Tự nhập xâu con"}
                className="bg-slate-900 border border-slate-700 text-white font-mono text-xs px-2 py-1 rounded-lg w-28 focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
