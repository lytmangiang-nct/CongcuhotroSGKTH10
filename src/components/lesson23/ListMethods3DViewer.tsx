import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useBook } from '../../context/BookContext';
import {
  Layers,
  Sparkles,
  Plus,
  Trash2,
  RotateCcw,
  Search,
  CheckCircle2,
  XCircle,
  HelpCircle,
  TrendingUp,
  AlertTriangle,
  Play,
  Pause
} from 'lucide-react';

type Mode3D = 'in_operator' | 'four_methods' | 'pattern_fibonacci';

interface SlotItem {
  id: string;
  value: any;
  color: number;
}

export const ListMethods3DViewer: React.FC = () => {
  const { bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';
  const mountRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode3D>('in_operator');
  const modeRef = useRef<Mode3D>(mode);
  modeRef.current = mode;

  // Mode 1: in operator state
  const [inList, setInList] = useState<any[]>([1, 2, 3, 4, 5]);
  const inListRef = useRef<any[]>(inList);
  inListRef.current = inList;
  const [inQuery, setInQuery] = useState<string>('2');
  const [inResult, setInResult] = useState<boolean | null>(true);
  const [scanStep, setScanStep] = useState<number>(1);
  const scanStepRef = useRef<number>(1);
  scanStepRef.current = scanStep;
  const [isAutoScanning, setIsAutoScanning] = useState<boolean>(true);
  const isAutoScanningRef = useRef<boolean>(true);
  isAutoScanningRef.current = isAutoScanning;

  // Mode 2: 4 methods state
  const [methodList, setMethodList] = useState<SlotItem[]>([
    { id: '1', value: 1, color: 0x3b82f6 },
    { id: '2', value: 2, color: 0x0ea5e9 },
    { id: '3', value: 6, color: 0x10b981 },
    { id: '4', value: 10, color: 0x8b5cf6 }
  ]);
  const methodListRef = useRef<SlotItem[]>(methodList);
  methodListRef.current = methodList;

  const [insertIdx, setInsertIdx] = useState<number>(2);
  const [insertVal, setInsertVal] = useState<string>('5');
  const [removeVal, setRemoveVal] = useState<string>('2');
  const [appendVal, setAppendVal] = useState<string>('99');
  const [statusMsg, setStatusMsg] = useState<{ textVi: string; textEn: string; isError?: boolean }>({
    textVi: 'A ban đầu: [1, 2, 6, 10]',
    textEn: 'Initial A: [1, 2, 6, 10]'
  });

  // Mode 3: Subsequence pattern & Fibonacci
  const [subMode, setSubMode] = useState<'pattern' | 'fibonacci'>('pattern');
  const subModeRef = useRef<'pattern' | 'fibonacci'>('pattern');
  subModeRef.current = subMode;

  const [patternArray, setPatternArray] = useState<number[]>([
    0, 4, 0, 1, 2, 3, 8, 9, 0, 1, 2, 3, 17, -16, 0, 1, 2
  ]);
  const patternArrayRef = useRef<number[]>(patternArray);
  patternArrayRef.current = patternArray;

  const [windowIdx, setWindowIdx] = useState<number>(3); // matched at index 3: [1, 2, 3]
  const windowIdxRef = useRef<number>(3);
  windowIdxRef.current = windowIdx;

  const [fibCount, setFibCount] = useState<number>(8);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 700;
    const height = container.clientHeight || 420;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1d);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 9, 20);
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

    const getSlotTexture = (topText: string, mainText: string, bg: string, fg: string) => {
      const key = `${topText}|${mainText}|${bg}|${fg}`;
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

        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 30px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(topText, 128, 60);

        ctx.fillStyle = fg;
        ctx.font = 'bold 64px monospace';
        ctx.fillText(mainText.length > 5 ? mainText.substring(0, 4) + '…' : mainText, 128, 155);
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

      // Camera gentle sway
      camera.position.x = Math.sin(elapsed * 0.15) * 2;
      camera.lookAt(0, 0, 0);

      // Clean group children
      while (group.children.length > 0) {
        const obj = group.children[0];
        group.remove(obj);
        if ((obj as any).geometry) (obj as any).geometry.dispose();
      }

      const curMode = modeRef.current;

      if (curMode === 'in_operator') {
        // Mode 1: Membership Gate & Direct Traversal
        const list = inListRef.current;
        const total = list.length;
        const spacing = 2.4;
        const startX = -((total - 1) * spacing) / 2;

        list.forEach((val, idx) => {
          const x = startX + idx * spacing;
          const isScanning = idx === scanStepRef.current;

          // Pedestal base
          const baseGeo = new THREE.BoxGeometry(2, 0.35, 2);
          const baseMat = new THREE.MeshStandardMaterial({
            color: isScanning ? 0x10b981 : 0x1e293b,
            metalness: 0.6,
            roughness: 0.2
          });
          const baseMesh = new THREE.Mesh(baseGeo, baseMat);
          baseMesh.position.set(x, -2, 0);
          group.add(baseMesh);

          // Element Block
          const boxGeo = new THREE.BoxGeometry(1.8, 1.8, 1.8);
          const tex = getSlotTexture(
            `A[${idx}]`,
            String(val),
            isScanning ? '#065f46' : '#1e1b4b',
            isScanning ? '#34d399' : '#38bdf8'
          );
          const boxMat = new THREE.MeshBasicMaterial({ map: tex });
          const boxMesh = new THREE.Mesh(boxGeo, boxMat);
          const bounce = isScanning ? Math.sin(elapsed * 5) * 0.25 + 0.3 : 0;
          boxMesh.position.set(x, bounce, 0);
          group.add(boxMesh);
        });

        // Sensor Arch Gate hovering over scanStep
        const targetX = startX + scanStepRef.current * spacing;
        const archGeo = new THREE.TorusGeometry(1.5, 0.15, 12, 32, Math.PI);
        const archMat = new THREE.MeshStandardMaterial({
          color: 0x10b981,
          emissive: 0x059669,
          emissiveIntensity: 0.8
        });
        const archMesh = new THREE.Mesh(archGeo, archMat);
        archMesh.position.set(targetX, 2.2, 0);
        group.add(archMesh);

        // Holographic vertical laser line
        const beamGeo = new THREE.CylinderGeometry(0.08, 0.08, 4, 16);
        const beamMat = new THREE.MeshBasicMaterial({
          color: 0x34d399,
          transparent: true,
          opacity: 0.5 + Math.sin(elapsed * 6) * 0.2
        });
        const beamMesh = new THREE.Mesh(beamGeo, beamMat);
        beamMesh.position.set(targetX, 1, 0);
        group.add(beamMesh);

        if (isAutoScanningRef.current) {
          scanTimer += delta;
          if (scanTimer > 1.4) {
            scanTimer = 0;
            setScanStep(prev => (prev + 1) % list.length);
          }
        }
      } else if (curMode === 'four_methods') {
        // Mode 2: Four Operations (insert, remove, clear, append)
        const list = methodListRef.current;
        const total = list.length;
        const spacing = 2.4;
        const startX = total > 0 ? -((total - 1) * spacing) / 2 : 0;

        list.forEach((item, idx) => {
          const x = startX + idx * spacing;
          const boxGeo = new THREE.BoxGeometry(1.8, 1.8, 1.8);
          const tex = getSlotTexture(`i = ${idx}`, String(item.value), '#0f172a', '#f59e0b');
          const materials = [
            new THREE.MeshStandardMaterial({ color: item.color, roughness: 0.3 }),
            new THREE.MeshStandardMaterial({ color: item.color, roughness: 0.3 }),
            new THREE.MeshStandardMaterial({ color: 0x475569 }),
            new THREE.MeshStandardMaterial({ color: 0x0f172a }),
            new THREE.MeshBasicMaterial({ map: tex }),
            new THREE.MeshStandardMaterial({ color: item.color })
          ];
          const boxMesh = new THREE.Mesh(boxGeo, materials);
          boxMesh.position.set(x, 0, 0);
          group.add(boxMesh);

          // Connector line between adjacent boxes
          if (idx < total - 1) {
            const linkGeo = new THREE.CylinderGeometry(0.12, 0.12, spacing - 1.8, 8);
            const linkMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
            const linkMesh = new THREE.Mesh(linkGeo, linkMat);
            linkMesh.rotation.z = Math.PI / 2;
            linkMesh.position.set(x + spacing / 2, 0, 0);
            group.add(linkMesh);
          }
        });

        // Out-of-bounds pointer indicator markers
        const headX = total > 0 ? startX - spacing : -1.5;
        const tailX = total > 0 ? startX + total * spacing : 1.5;

        // Head marker: k < 0 prepends
        const headPinGeo = new THREE.ConeGeometry(0.3, 0.7, 8);
        const headPinMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x0891b2 });
        const headPin = new THREE.Mesh(headPinGeo, headPinMat);
        headPin.rotation.x = Math.PI;
        headPin.position.set(headX, 2.5, 0);
        group.add(headPin);

        // Tail marker: k > len() appends
        const tailPin = headPin.clone();
        tailPin.position.set(tailX, 2.5, 0);
        group.add(tailPin);
      } else {
        // Mode 3: Subsequence Pattern Matcher & Fibonacci
        if (subModeRef.current === 'pattern') {
          // Sliding window of size 3 on patternArray
          const arr = patternArrayRef.current;
          const total = arr.length;
          const spacing = 1.3;
          const startX = -((total - 1) * spacing) / 2;
          const win = windowIdxRef.current;

          arr.forEach((v, idx) => {
            const x = startX + idx * spacing;
            const inWindow = idx >= win && idx < win + 3;
            const isMatch = win === 3 || win === 9; // [1, 2, 3] occurrences

            const boxGeo = new THREE.BoxGeometry(1.0, 1.0, 1.0);
            const boxMat = new THREE.MeshStandardMaterial({
              color: inWindow ? (isMatch ? 0x10b981 : 0xf59e0b) : 0x334155,
              metalness: 0.3,
              roughness: 0.4
            });
            const boxMesh = new THREE.Mesh(boxGeo, boxMat);
            const elevate = inWindow ? 0.8 : 0;
            boxMesh.position.set(x, elevate, 0);
            group.add(boxMesh);
          });

          // Sliding Bracket Frame around [win, win+1, win+2]
          const bracketCenterX = startX + (win + 1) * spacing;
          const bracketGeo = new THREE.BoxGeometry(spacing * 3, 1.6, 1.6);
          const bracketMat = new THREE.MeshBasicMaterial({
            color: win === 3 || win === 9 ? 0x10b981 : 0x38bdf8,
            wireframe: true
          });
          const bracketMesh = new THREE.Mesh(bracketGeo, bracketMat);
          bracketMesh.position.set(bracketCenterX, 0.8, 0);
          group.add(bracketMesh);
        } else {
          // Fibonacci Spiral Tower
          const fibs = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];
          const count = Math.min(fibCount, fibs.length);
          for (let i = 0; i < count; i++) {
            const val = fibs[i];
            const size = Math.max(0.7, Math.log2(val + 1) * 0.6);
            const angle = i * 0.55;
            const radius = 1.8 + i * 0.7;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const y = (i - count / 2) * 0.9;

            const boxGeo = new THREE.BoxGeometry(size, size, size);
            const boxMat = new THREE.MeshStandardMaterial({
              color: i < 2 ? 0x0ea5e9 : 0xec4899,
              metalness: 0.4,
              roughness: 0.2
            });
            const boxMesh = new THREE.Mesh(boxGeo, boxMat);
            boxMesh.position.set(x, y, z);
            boxMesh.rotation.y = elapsed + i;
            group.add(boxMesh);
          }
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
  }, [fibCount]);

  // Method Handlers
  const handleTestIn = () => {
    const val = isNaN(Number(inQuery)) ? inQuery : Number(inQuery);
    const exists = inList.includes(val);
    setInResult(exists);
    if (exists) {
      const idx = inList.indexOf(val);
      setScanStep(idx);
    }
  };

  const handleAppend = () => {
    const parsed = isNaN(Number(appendVal)) ? appendVal : Number(appendVal);
    const newItem: SlotItem = {
      id: Math.random().toString(),
      value: parsed,
      color: 0xec4899
    };
    setMethodList(prev => [...prev, newItem]);
    setStatusMsg({
      textVi: `Đã thực hiện: A.append(${parsed}) -> Thêm vào cuối!`,
      textEn: `Executed: A.append(${parsed}) -> Appended to end!`
    });
  };

  const handleInsert = () => {
    const k = parseInt(String(insertIdx), 10);
    const v = isNaN(Number(insertVal)) ? insertVal : Number(insertVal);
    const newItem: SlotItem = {
      id: Math.random().toString(),
      value: v,
      color: 0xf59e0b
    };

    setMethodList(prev => {
      const copy = [...prev];
      if (k < 0) {
        // Prepends to head
        copy.unshift(newItem);
        setStatusMsg({
          textVi: `Chỉ số k = ${k} < 0: Python tự động chèn vào đầu danh sách (vị trí 0)!`,
          textEn: `Index k = ${k} < 0: Python automatically prepends to index 0!`
        });
      } else if (k >= copy.length) {
        // Appends to tail
        copy.push(newItem);
        setStatusMsg({
          textVi: `Chỉ số k = ${k} > len(): Python tự động chèn vào cuối danh sách!`,
          textEn: `Index k = ${k} > len(): Python automatically appends to the end!`
        });
      } else {
        copy.splice(k, 0, newItem);
        setStatusMsg({
          textVi: `Đã chèn giá trị ${v} vào chỉ số ${k}, các phần tử sau dồn sang phải!`,
          textEn: `Inserted value ${v} at index ${k}, succeeding elements shifted right!`
        });
      }
      return copy;
    });
  };

  const handleRemove = () => {
    const v = isNaN(Number(removeVal)) ? removeVal : Number(removeVal);
    const idx = methodList.findIndex(item => item.value === v);
    if (idx === -1) {
      setStatusMsg({
        textVi: `ValueError: list.remove(x): ${v} not in list (Phát sinh lỗi ngoại lệ)`,
        textEn: `ValueError: list.remove(x): ${v} not in list (Exception raised)`,
        isError: true
      });
      return;
    }

    setMethodList(prev => prev.filter((_, i) => i !== idx));
    setStatusMsg({
      textVi: `Đã xoá phần tử đầu tiên có giá trị ${v} tại chỉ số ${idx}!`,
      textEn: `Removed first occurrence of value ${v} at index ${idx}!`
    });
  };

  const handleClear = () => {
    setMethodList([]);
    setStatusMsg({
      textVi: 'Đã thực hiện A.clear() -> Danh sách trở thành rỗng []!',
      textEn: 'Executed A.clear() -> List became empty []!'
    });
  };

  const handleResetMethods = () => {
    setMethodList([
      { id: '1', value: 1, color: 0x3b82f6 },
      { id: '2', value: 2, color: 0x0ea5e9 },
      { id: '3', value: 6, color: 0x10b981 },
      { id: '4', value: 10, color: 0x8b5cf6 }
    ]);
    setStatusMsg({
      textVi: 'Khôi phục danh sách chuẩn SGK: A = [1, 2, 6, 10]',
      textEn: 'Restored standard textbook list: A = [1, 2, 6, 10]'
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
      {/* 3D Header Controls */}
      <div className="p-4 bg-slate-950/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-600/30 text-teal-400 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-white text-sm flex items-center gap-2">
              <span>{isEn ? '3D WebGL Simulation: Python List Operations (Lesson 23)' : 'Mô Phỏng 3D WebGL: Các Lệnh Thao Tác Danh Sách (Bài 23)'}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-teal-500/20 text-teal-300 font-mono">
                {mode === 'in_operator' && `len = ${inList.length}`}
                {mode === 'four_methods' && `len = ${methodList.length}`}
                {mode === 'pattern_fibonacci' && (subMode === 'pattern' ? 'p = [1, 2, 3]' : `n = ${fibCount}`)}
              </span>
            </div>
            <div className="text-xs text-slate-400">
              {mode === 'in_operator' && (isEn ? 'Mode 1: IN operator sensor gate & direct traversal for k in A' : 'Chế độ 1: Cổng cảm biến toán tử IN & duyệt trực tiếp for k in A')}
              {mode === 'four_methods' && (isEn ? 'Mode 2: The 4 Core Methods: insert(k, x), remove(x), clear(), append(x)' : 'Chế độ 2: Bộ tứ phương thức: insert(k, x), remove(x), clear(), append(x)')}
              {mode === 'pattern_fibonacci' && (isEn ? 'Mode 3: Pattern matching loupe [1, 2, 3] & 3D Fibonacci tower' : 'Chế độ 3: Kính soi đối sánh mẫu [1, 2, 3] & Tháp Fibonacci 3D')}
            </div>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setMode('in_operator')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'in_operator'
                ? 'bg-teal-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isEn ? '1. in Operator' : '1. Toán tử in'}
          </button>
          <button
            onClick={() => setMode('four_methods')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'four_methods'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isEn ? '2. 4 Methods' : '2. Bộ 4 Phương Thức'}
          </button>
          <button
            onClick={() => setMode('pattern_fibonacci')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'pattern_fibonacci'
                ? 'bg-pink-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isEn ? '3. Patterns & Fibonacci' : '3. Tìm Mẫu & Fibonacci'}
          </button>
        </div>
      </div>

      {/* WebGL Canvas Viewport with isolated mount div */}
      <div className="relative w-full h-[360px] sm:h-[400px] overflow-hidden select-none bg-slate-950">
        <div ref={mountRef} className="absolute inset-0 w-full h-full" />

        {/* HUD Overlay Mode 1 */}
        {mode === 'in_operator' && (
          <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md p-3 rounded-2xl border border-slate-800 text-xs text-white space-y-1.5 pointer-events-none z-10 max-w-xs shadow-xl">
            <div className="font-mono font-bold text-teal-400">
              A = [{inList.join(', ')}]
            </div>
            <div className="text-[11px] text-slate-300">
              • {isEn ? 'Test expression:' : 'Biểu thức kiểm tra:'} <span className="font-mono text-amber-300 font-bold">{inQuery} in A</span>
            </div>
            <div className="text-[11px] flex items-center gap-1.5">
              • {isEn ? 'Boolean result:' : 'Kết quả boolean:'}
              {inResult === true ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> True ({isEn ? 'Present in list' : 'Có trong danh sách'})
                </span>
              ) : inResult === false ? (
                <span className="text-rose-400 font-bold flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> False ({isEn ? 'Not in list' : 'Không có trong A'})
                </span>
              ) : (
                <span className="text-slate-400">{isEn ? 'Not tested' : 'Chưa kiểm tra'}</span>
              )}
            </div>
            <div className="text-[11px] text-cyan-300 pt-1 border-t border-slate-800">
              {isEn ? 'Direct iteration:' : 'Duyệt trực tiếp:'} <span className="font-mono">k = {inList[scanStep]}</span> ({isEn ? 'at' : 'tại'} A[{scanStep}])
            </div>
          </div>
        )}

        {/* HUD Overlay Mode 2 */}
        {mode === 'four_methods' && (
          <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md p-3 rounded-2xl border border-slate-800 text-xs text-white space-y-1.5 pointer-events-none z-10 max-w-sm shadow-xl">
            <div className="font-mono font-bold text-indigo-400">
              A = [{methodList.map(m => String(m.value)).join(', ')}]
            </div>
            <div className="text-[11px] text-slate-300">
              • {isEn ? 'Current length:' : 'Độ dài hiện tại:'} <span className="font-mono text-emerald-400 font-bold">{methodList.length}</span> (len(A))
            </div>
            <div className={`text-[11px] font-medium ${statusMsg.isError ? 'text-rose-400' : 'text-amber-300'}`}>
              • {isEn ? 'Status:' : 'Trạng thái:'} {isEn ? statusMsg.textEn : statusMsg.textVi}
            </div>
            <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
              {isEn ? '* Boundary rule: k < 0 inserts at head; k > len() inserts at end.' : '* Quy tắc ngoài biên: k < 0 chèn đầu; k > len() chèn cuối.'}
            </div>
          </div>
        )}

        {/* HUD Overlay Mode 3 */}
        {mode === 'pattern_fibonacci' && (
          <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md p-3 rounded-2xl border border-slate-800 text-xs text-white space-y-1.5 pointer-events-none z-10 max-w-xs shadow-xl">
            {subMode === 'pattern' ? (
              <>
                <div className="font-mono font-bold text-emerald-400">
                  {isEn ? 'Search pattern: p = [1, 2, 3]' : 'Mẫu tìm kiếm: p = [1, 2, 3]'}
                </div>
                <div className="text-[11px] text-slate-300">
                  • {isEn ? '3-element inspection window:' : 'Cửa sổ kiểm tra 3 phần tử:'} <span className="font-mono text-cyan-300">i = {windowIdx}</span>
                </div>
                <div className="text-[11px] text-slate-300">
                  • {isEn ? 'Window values:' : 'Giá trị cửa sổ:'} <span className="font-mono text-amber-300">[{patternArray.slice(windowIdx, windowIdx + 3).join(', ')}]</span>
                </div>
                <div className="text-[11px] font-bold">
                  {windowIdx === 3 || windowIdx === 9 ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {isEn ? `Pattern matched at index ${windowIdx}!` : `Khớp mẫu tại vị trí ${windowIdx}!`}
                    </span>
                  ) : (
                    <span className="text-slate-400">{isEn ? 'Pattern mismatch' : 'Không khớp mẫu'}</span>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="font-mono font-bold text-pink-400">
                  {isEn ? 'Fibonacci Sequence: F(n) = F(n-1) + F(n-2)' : 'Dãy Fibonacci: F(n) = F(n-1) + F(n-2)'}
                </div>
                <div className="text-[11px] text-slate-300">
                  • {isEn ? 'Base values: F0 = 0, F1 = 1' : 'Khởi đầu: F0 = 0, F1 = 1'}
                </div>
                <div className="text-[11px] text-emerald-400 font-mono">
                  {isEn ? 'Sequence:' : 'Dãy:'} [0, 1, 1, 2, 3, 5, 8, 13].slice(0, {fibCount})
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Interactive Bottom Control Toolbar */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        {mode === 'in_operator' && (
          <div className="flex flex-wrap items-center gap-3 w-full justify-between">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">{isEn ? 'Test:' : 'Kiểm tra:'}</span>
              <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1">
                <input
                  type="text"
                  value={inQuery}
                  onChange={e => setInQuery(e.target.value)}
                  placeholder={isEn ? "Value" : "Giá trị"}
                  className="bg-transparent text-white font-mono text-xs w-16 focus:outline-none"
                />
                <button
                  onClick={handleTestIn}
                  className="flex items-center gap-1 bg-teal-600 hover:bg-teal-500 text-white px-2 py-0.5 rounded-lg font-semibold transition-all cursor-pointer"
                >
                  <Search className="w-3 h-3" />
                  <span>x in A</span>
                </button>
              </div>

              <div className="flex items-center gap-1 ml-2">
                <button
                  onClick={() => { setInQuery('2'); setInResult(true); setScanStep(1); }}
                  className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px]"
                >
                  2 in A ({isEn ? 'Book' : 'SGK'})
                </button>
                <button
                  onClick={() => { setInQuery('10'); setInResult(false); }}
                  className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px]"
                >
                  10 in A ({isEn ? 'Book' : 'SGK'})
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAutoScanning(v => !v)}
                className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl transition-all"
              >
                {isAutoScanning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isAutoScanning ? (isEn ? 'Pause for traversal' : 'Tạm dừng duyệt for') : (isEn ? 'Resume for traversal' : 'Tiếp tục duyệt for')}</span>
              </button>
              <button
                onClick={() => { setInList([1, 2, 3, 4, 5]); setScanStep(0); setInQuery('2'); setInResult(true); }}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                title={isEn ? "Restore" : "Khôi phục"}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {mode === 'four_methods' && (
          <div className="flex flex-wrap items-center gap-2.5 w-full justify-between">
            {/* Insert Control */}
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl px-2 py-1">
              <span className="text-slate-400 text-[11px]">k:</span>
              <input
                type="number"
                value={insertIdx}
                onChange={e => setInsertIdx(parseInt(e.target.value, 10))}
                className="bg-transparent text-amber-400 font-mono text-xs w-10 focus:outline-none"
              />
              <span className="text-slate-400 text-[11px]">val:</span>
              <input
                type="text"
                value={insertVal}
                onChange={e => setInsertVal(e.target.value)}
                className="bg-transparent text-white font-mono text-xs w-12 focus:outline-none"
              />
              <button
                onClick={handleInsert}
                className="bg-amber-600 hover:bg-amber-500 text-white px-2 py-0.5 rounded-lg font-semibold transition-all cursor-pointer"
                title="A.insert(k, val)"
              >
                insert(k, v)
              </button>
            </div>

            {/* Remove Control */}
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl px-2 py-1">
              <span className="text-slate-400 text-[11px]">val:</span>
              <input
                type="text"
                value={removeVal}
                onChange={e => setRemoveVal(e.target.value)}
                className="bg-transparent text-white font-mono text-xs w-12 focus:outline-none"
              />
              <button
                onClick={handleRemove}
                className="bg-rose-600 hover:bg-rose-500 text-white px-2 py-0.5 rounded-lg font-semibold transition-all cursor-pointer"
                title="A.remove(val)"
              >
                remove(v)
              </button>
            </div>

            {/* Append Control */}
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl px-2 py-1">
              <input
                type="text"
                value={appendVal}
                onChange={e => setAppendVal(e.target.value)}
                className="bg-transparent text-white font-mono text-xs w-12 focus:outline-none"
              />
              <button
                onClick={handleAppend}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-0.5 rounded-lg font-semibold transition-all cursor-pointer"
                title="A.append(val)"
              >
                append(v)
              </button>
            </div>

            {/* Clear & Reset */}
            <div className="flex items-center gap-1.5 ml-auto">
              <button
                onClick={handleClear}
                className="flex items-center gap-1 bg-slate-800 hover:bg-rose-900/60 text-rose-300 px-2.5 py-1.5 rounded-xl font-semibold border border-rose-500/30 transition-all cursor-pointer"
                title={isEn ? "A.clear() empties array" : "A.clear() xoá sạch mảng"}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>clear()</span>
              </button>
              <button
                onClick={handleResetMethods}
                className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer"
                title={isEn ? "Reset [1, 2, 6, 10]" : "Khôi phục [1, 2, 6, 10]"}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isEn ? 'Book' : 'SGK'}</span>
              </button>
            </div>
          </div>
        )}

        {mode === 'pattern_fibonacci' && (
          <div className="flex flex-wrap items-center gap-3 w-full justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSubMode('pattern')}
                className={`px-3 py-1.5 rounded-xl font-semibold text-xs ${
                  subMode === 'pattern' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {isEn ? 'Pattern Loupe [1, 2, 3] (Task 3)' : 'Soi mẫu [1, 2, 3] (NV3)'}
              </button>
              <button
                onClick={() => setSubMode('fibonacci')}
                className={`px-3 py-1.5 rounded-xl font-semibold text-xs ${
                  subMode === 'fibonacci' ? 'bg-pink-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {isEn ? 'Fibonacci Tower (Ex 2)' : 'Tháp Fibonacci (VD2)'}
              </button>
            </div>

            {subMode === 'pattern' ? (
              <div className="flex items-center gap-2">
                <span className="text-slate-400">{isEn ? 'Shift loupe i:' : 'Dịch khung soi i:'}</span>
                <button
                  onClick={() => setWindowIdx(prev => Math.max(0, prev - 1))}
                  className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-mono"
                >
                  {isEn ? '← Prev' : '← Trước'}
                </button>
                <span className="font-mono text-amber-300 px-2">i = {windowIdx}</span>
                <button
                  onClick={() => setWindowIdx(prev => Math.min(patternArray.length - 3, prev + 1))}
                  className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-mono"
                >
                  {isEn ? 'Next →' : 'Sau →'}
                </button>
                <button
                  onClick={() => setWindowIdx(3)}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px]"
                >
                  {isEn ? 'Jump to pattern (i=3)' : 'Nhảy tới mẫu (i=3)'}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-slate-400">{isEn ? 'Terms n:' : 'Số hạng n:'}</span>
                <input
                  type="range"
                  min="3"
                  max="10"
                  value={fibCount}
                  onChange={e => setFibCount(parseInt(e.target.value, 10))}
                  className="w-24 accent-pink-500"
                />
                <span className="font-mono text-pink-400 font-bold">{fibCount} {isEn ? 'terms' : 'số hạng'}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
