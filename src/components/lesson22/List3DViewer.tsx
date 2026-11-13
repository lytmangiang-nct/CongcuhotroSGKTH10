import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useBook } from '../../context/BookContext';
import {
  Layers,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Info,
  Plus,
  Trash2,
  ArrowRight,
  Maximize2,
  CheckCircle,
  Hash
} from 'lucide-react';

type Mode3D = 'memory_slots' | 'traversal_scanner' | 'append_physics';

interface ListElement {
  id: string;
  value: any;
  type: 'int' | 'float' | 'str' | 'bool';
  color: number;
}

export const List3DViewer: React.FC = () => {
  const { bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';
  const mountRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode3D>('memory_slots');
  const modeRef = useRef<Mode3D>(mode);
  modeRef.current = mode;

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const isPlayingRef = useRef<boolean>(true);
  isPlayingRef.current = isPlaying;

  // State for interactive list in 3D
  const [elements, setElements] = useState<ListElement[]>([
    { id: '1', value: 1, type: 'int', color: 0x3b82f6 },
    { id: '2', value: 0, type: 'int', color: 0x0ea5e9 },
    { id: '3', value: 'One', type: 'str', color: 0xf59e0b },
    { id: '4', value: 9, type: 'int', color: 0x10b981 },
    { id: '5', value: 15, type: 'int', color: 0x8b5cf6 },
    { id: '6', value: 'Two', type: 'str', color: 0xec4899 },
    { id: '7', value: true, type: 'bool', color: 0x06b6d4 }
  ]);
  const elementsRef = useRef<ListElement[]>(elements);
  elementsRef.current = elements;

  // Selected slot for inspection
  const [selectedIdx, setSelectedIdx] = useState<number>(2);
  const selectedIdxRef = useRef<number>(selectedIdx);
  selectedIdxRef.current = selectedIdx;

  // Traversal state
  const [scanIdx, setScanIdx] = useState<number>(0);
  const scanIdxRef = useRef<number>(0);
  scanIdxRef.current = scanIdx;

  const [traversalSum, setTraversalSum] = useState<number>(0);
  const [traversalCount, setTraversalCount] = useState<number>(0);

  // Input for new element
  const [newElemVal, setNewElemVal] = useState<string>('100');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 700;
    const height = container.clientHeight || 420;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090d16);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 8, 18);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(10, 20, 15);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x38bdf8, 2, 50);
    pointLight.position.set(0, 5, 5);
    scene.add(pointLight);

    // Floor grid
    const gridHelper = new THREE.GridHelper(30, 30, 0x1e293b, 0x0f172a);
    gridHelper.position.y = -2;
    scene.add(gridHelper);

    // Dynamic 3D Objects Group
    const group = new THREE.Group();
    scene.add(group);

    // Cache textures so we don't recreate them on every single frame
    const textureCache = new Map<string, THREE.CanvasTexture>();

    // Helper to generate text canvas texture
    const getTextTexture = (text: string, sub: string, bgColor: string, textColor: string) => {
      const key = `${text}|${sub}|${bgColor}|${textColor}`;
      if (textureCache.has(key)) {
        return textureCache.get(key)!;
      }
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, 256, 256);

        // Border
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 8;
        ctx.strokeRect(4, 4, 248, 248);

        // Sub text (Index or Type)
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 32px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(sub, 128, 64);

        // Main text (Value)
        ctx.fillStyle = textColor;
        ctx.font = 'bold 64px monospace';
        ctx.fillText(text.length > 6 ? text.substring(0, 5) + '…' : text, 128, 150);
      }
      const tex = new THREE.CanvasTexture(canvas);
      textureCache.set(key, tex);
      return tex;
    };

    let animationFrameId: number;
    let clock = new THREE.Clock();
    let scanTimer = 0;

    // Render loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth camera oscillation
      camera.position.x = Math.sin(elapsed * 0.2) * 1.5;
      camera.lookAt(0, 0, 0);

      // Mode-specific scene rebuild & updates
      // Clear dynamic meshes
      while (group.children.length > 0) {
        const obj = group.children[0];
        group.remove(obj);
        if ((obj as any).geometry) (obj as any).geometry.dispose();
      }

      const currentList = elementsRef.current;
      const total = currentList.length;
      const spacing = 2.4;
      const startX = -((total - 1) * spacing) / 2;
      const curMode = modeRef.current;
      const curSelected = selectedIdxRef.current;
      const curScan = scanIdxRef.current;

      if (curMode === 'memory_slots') {
        // Mode 1: 3D Memory Slots
        currentList.forEach((elem, idx) => {
          const x = startX + idx * spacing;
          const isSel = idx === curSelected;

          // Slot Pedestal Base
          const baseGeo = new THREE.BoxGeometry(2, 0.4, 2);
          const baseMat = new THREE.MeshStandardMaterial({
            color: isSel ? 0xf59e0b : 0x1e293b,
            metalness: 0.5,
            roughness: 0.2
          });
          const baseMesh = new THREE.Mesh(baseGeo, baseMat);
          baseMesh.position.set(x, -1.8, 0);
          group.add(baseMesh);

          // Element Block with Texture
          const boxGeo = new THREE.BoxGeometry(1.8, 1.8, 1.8);
          const tex = getTextTexture(
            String(elem.value),
            `i = ${idx}`,
            isSel ? '#f59e0b' : '#1e1b4b',
            isSel ? '#000000' : '#38bdf8'
          );
          const materials = [
            new THREE.MeshStandardMaterial({ color: elem.color, metalness: 0.3, roughness: 0.4 }),
            new THREE.MeshStandardMaterial({ color: elem.color, metalness: 0.3, roughness: 0.4 }),
            new THREE.MeshStandardMaterial({ color: 0x64748b }), // top
            new THREE.MeshStandardMaterial({ color: 0x0f172a }), // bottom
            new THREE.MeshBasicMaterial({ map: tex }), // front
            new THREE.MeshStandardMaterial({ color: elem.color })
          ];
          const boxMesh = new THREE.Mesh(boxGeo, materials);
          const floatY = isSel ? Math.sin(elapsed * 4) * 0.2 + 0.3 : 0;
          boxMesh.position.set(x, floatY, 0);
          group.add(boxMesh);

          // Index tag floating pin
          const pinGeo = new THREE.ConeGeometry(0.2, 0.5, 8);
          const pinMat = new THREE.MeshBasicMaterial({ color: isSel ? 0xf59e0b : 0x38bdf8 });
          const pinMesh = new THREE.Mesh(pinGeo, pinMat);
          pinMesh.rotation.x = Math.PI;
          pinMesh.position.set(x, 1.6 + floatY, 0);
          group.add(pinMesh);
        });
      } else if (curMode === 'traversal_scanner') {
        // Mode 2: Scanner Head & Traversal
        currentList.forEach((elem, idx) => {
          const x = startX + idx * spacing;
          const isScanning = idx === curScan;

          const boxGeo = new THREE.BoxGeometry(1.8, 1.8, 1.8);
          const tex = getTextTexture(
            String(elem.value),
            `A[${idx}]`,
            isScanning ? '#10b981' : '#0f172a',
            isScanning ? '#ffffff' : '#94a3b8'
          );
          const boxMat = new THREE.MeshBasicMaterial({ map: tex });
          const boxMesh = new THREE.Mesh(boxGeo, boxMat);
          boxMesh.position.set(x, 0, 0);
          group.add(boxMesh);
        });

        // Overhead Laser Scanner
        if (isPlayingRef.current) {
          scanTimer += delta;
          if (scanTimer > 1.2) {
            scanTimer = 0;
            setScanIdx(prev => {
              const next = (prev + 1) % currentList.length;
              const currentVal = currentList[next]?.value;
              if (typeof currentVal === 'number' && currentVal > 0) {
                setTraversalSum(s => s + currentVal);
                setTraversalCount(c => c + 1);
              }
              return next;
            });
          }
        }

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
      } else {
        // Mode 3: Append & Concatenation Physics
        currentList.forEach((elem, idx) => {
          const x = startX + idx * spacing;
          const boxGeo = new THREE.BoxGeometry(1.8, 1.8, 1.8);
          const boxMat = new THREE.MeshStandardMaterial({
            color: elem.color,
            metalness: 0.4,
            roughness: 0.3
          });
          const boxMesh = new THREE.Mesh(boxGeo, boxMat);
          boxMesh.position.set(x, 0, 0);
          group.add(boxMesh);

          // Connector line between adjacent boxes
          if (idx < total - 1) {
            const linkGeo = new THREE.CylinderGeometry(0.15, 0.15, spacing - 1.8, 8);
            const linkMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0 });
            const linkMesh = new THREE.Mesh(linkGeo, linkMat);
            linkMesh.rotation.z = Math.PI / 2;
            linkMesh.position.set(x + spacing / 2, 0, 0);
            group.add(linkMesh);
          }
        });

        // Dropping block animation for append
        const dropY = Math.max(0, 6 - (elapsed % 3) * 3);
        const tailX = startX + total * spacing;
        const appendGeo = new THREE.BoxGeometry(1.8, 1.8, 1.8);
        const appendMat = new THREE.MeshStandardMaterial({
          color: 0xec4899,
          roughness: 0.2,
          metalness: 0.6
        });
        const appendMesh = new THREE.Mesh(appendGeo, appendMat);
        appendMesh.position.set(tailX, dropY, 0);
        appendMesh.rotation.y = elapsed * 2;
        group.add(appendMesh);

        // Arrow indicating append direction
        const arrowHelper = new THREE.ArrowHelper(
          new THREE.Vector3(0, -1, 0),
          new THREE.Vector3(tailX, 7, 0),
          2,
          0xec4899
        );
        group.add(arrowHelper);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
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
      textureCache.forEach(tex => tex.dispose());
      textureCache.clear();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Handler to append element in 3D
  const handleAppend = () => {
    let parsed: any = newElemVal.trim();
    let type: 'int' | 'float' | 'str' | 'bool' = 'str';

    if (!isNaN(Number(parsed)) && parsed !== '') {
      if (parsed.includes('.')) {
        parsed = parseFloat(parsed);
        type = 'float';
      } else {
        parsed = parseInt(parsed, 10);
        type = 'int';
      }
    } else if (parsed.toLowerCase() === 'true' || parsed.toLowerCase() === 'false') {
      parsed = parsed.toLowerCase() === 'true';
      type = 'bool';
    }

    const newElem: ListElement = {
      id: Math.random().toString(),
      value: parsed,
      type,
      color: type === 'int' ? 0x3b82f6 : type === 'str' ? 0xf59e0b : 0x10b981
    };

    setElements(prev => [...prev, newElem]);
  };

  // Handler to delete at index
  const handleDeleteSelected = () => {
    if (elements.length <= 1) return;
    setElements(prev => prev.filter((_, idx) => idx !== selectedIdx));
    setSelectedIdx(prev => Math.max(0, Math.min(prev, elements.length - 2)));
  };

  // Reset to textbook initial example
  const handleReset = () => {
    setElements([
      { id: '1', value: 1, type: 'int', color: 0x3b82f6 },
      { id: '2', value: 0, type: 'int', color: 0x0ea5e9 },
      { id: '3', value: 'One', type: 'str', color: 0xf59e0b },
      { id: '4', value: 9, type: 'int', color: 0x10b981 },
      { id: '5', value: 15, type: 'int', color: 0x8b5cf6 },
      { id: '6', value: 'Two', type: 'str', color: 0xec4899 },
      { id: '7', value: true, type: 'bool', color: 0x06b6d4 }
    ]);
    setSelectedIdx(2);
    setScanIdx(0);
    setTraversalSum(0);
    setTraversalCount(0);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
      {/* 3D Viewer Header Controls */}
      <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-400 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-white text-sm flex items-center gap-2">
              <span>{isEn ? '3D WebGL Simulation: Python List Data Type' : 'Mô Phỏng 3D WebGL: Kiểu Dữ Liệu Danh Sách (List)'}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-indigo-500/20 text-indigo-300 font-mono">
                len(A) = {elements.length}
              </span>
            </div>
            <div className="text-xs text-slate-400">
              {mode === 'memory_slots' && (isEn ? 'Mode 1: Memory registers, index 0..len-1 and element access A[i]' : 'Chế độ 1: Thanh ghi ô nhớ, chỉ số index 0..len-1 và truy cập A[i]')}
              {mode === 'traversal_scanner' && (isEn ? 'Mode 2: Laser scanner traversing for i in range(len(A)) & cumulative sum' : 'Chế độ 2: Đầu đọc Laser duyệt for i in range(len(A)) & tính toán luỹ kế')}
              {mode === 'append_physics' && (isEn ? 'Mode 3: Method A.append() and block sequence concatenation [+]' : 'Chế độ 3: Phương thức A.append() và phép ghép nối dải khối [+]')}
            </div>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setMode('memory_slots')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'memory_slots'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isEn ? '1. Memory & Index' : '1. Ô nhớ & Chỉ số'}
          </button>
          <button
            onClick={() => setMode('traversal_scanner')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'traversal_scanner'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isEn ? '2. For Loop Traversal' : '2. Duyệt for loop'}
          </button>
          <button
            onClick={() => setMode('append_physics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'append_physics'
                ? 'bg-pink-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isEn ? '3. append() & Concat +' : '3. append() & Ghép +'}
          </button>
        </div>
      </div>

      {/* WebGL Canvas Viewport with isolated mount div */}
      <div className="relative w-full h-[360px] sm:h-[400px] overflow-hidden select-none bg-slate-950">
        {/* Dedicated Three.js canvas mount point - completely empty, never manipulated by React */}
        <div ref={mountRef} className="absolute inset-0 w-full h-full" />

        {/* Floating HUD overlay - isolated from Three.js container */}
        <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md p-3 rounded-2xl border border-slate-800/80 text-xs text-white space-y-1.5 pointer-events-none z-10 max-w-xs shadow-xl">
          <div className="font-mono font-bold text-indigo-400 flex items-center justify-between">
            <span>A = [{elements.map(e => (typeof e.value === 'string' ? `'${e.value}'` : String(e.value))).join(', ')}]</span>
          </div>
          <div className="text-[11px] text-slate-300">
            • {isEn ? 'List length:' : 'Độ dài danh sách:'} <span className="font-mono text-emerald-400 font-bold">{elements.length}</span> {isEn ? '(from len(A))' : '(từ len(A))'}
          </div>
          <div className="text-[11px] text-slate-300">
            • {isEn ? 'Valid index range:' : 'Vùng chỉ số hợp lệ:'} <span className="font-mono text-amber-400 font-bold">0 .. {elements.length - 1}</span>
          </div>
          {selectedIdx < elements.length && (
            <div className="text-[11px] text-sky-300 pt-1 border-t border-slate-800">
              {isEn ? 'Selected:' : 'Đang chọn:'} <strong>A[{selectedIdx}]</strong> = <span className="font-mono">{String(elements[selectedIdx].value)}</span> ({elements[selectedIdx].type})
            </div>
          )}
        </div>

        {/* Mode 2 HUD: Accumulator */}
        {mode === 'traversal_scanner' && (
          <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md p-3 rounded-2xl border border-slate-800/80 text-xs text-white space-y-1 z-10 shadow-xl">
            <div className="text-emerald-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isEn ? 'Scanning:' : 'Đang quét:'} i = {scanIdx} (A[{scanIdx}] = {String(elements[scanIdx]?.value)})</span>
            </div>
            <div className="text-slate-300 text-[11px]">
              {isEn ? 'Sum of numbers > 0:' : 'Tổng các số > 0:'} <span className="font-mono text-amber-400 font-bold">{traversalSum}</span>
            </div>
            <div className="text-slate-300 text-[11px]">
              {isEn ? 'Count of numbers > 0:' : 'Số lượng số > 0:'} <span className="font-mono text-cyan-400 font-bold">{traversalCount}</span>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Bottom Control Toolbar */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Slot navigation buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
          <span className="text-slate-400 font-medium whitespace-nowrap mr-1">{isEn ? 'Indices:' : 'Chỉ số:'}</span>
          {elements.map((elem, idx) => (
            <button
              key={elem.id}
              onClick={() => setSelectedIdx(idx)}
              className={`px-2.5 py-1 rounded-lg font-mono font-bold transition-all ${
                selectedIdx === idx
                  ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              [{idx}]
            </button>
          ))}
        </div>

        {/* Actions: Append, Delete, Reset */}
        <div className="flex items-center gap-2 ml-auto">
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl px-2 py-1">
            <input
              type="text"
              value={newElemVal}
              onChange={e => setNewElemVal(e.target.value)}
              placeholder={isEn ? "New value" : "Giá trị mới"}
              className="bg-transparent text-white font-mono text-xs w-20 focus:outline-none"
            />
            <button
              onClick={handleAppend}
              className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-1 rounded-lg font-semibold transition-all"
              title={isEn ? "A.append(value)" : "A.append(giá trị)"}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>append()</span>
            </button>
          </div>

          <button
            onClick={handleDeleteSelected}
            disabled={elements.length <= 1}
            className="flex items-center gap-1 bg-rose-600/30 hover:bg-rose-600 text-rose-300 hover:text-white px-3 py-1.5 rounded-xl font-semibold border border-rose-500/30 transition-all disabled:opacity-40"
            title={`del A[${selectedIdx}]`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>del A[{selectedIdx}]</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-xl font-semibold transition-all"
            title={isEn ? "Restore original list" : "Khôi phục danh sách ban đầu"}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isEn ? 'Reset' : 'Khôi phục'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
