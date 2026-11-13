import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Sparkles, Play, RotateCcw, ShieldAlert, Zap, Globe, Layers, Eye, Info } from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { PredictSimulateExplain } from '../PredictSimulateExplain';

export const Scope3DLab: React.FC = () => {
  const { bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';

  const mountRef = useRef<HTMLDivElement>(null);
  const [labMode, setLabMode] = useState<'local_vs_global' | 'global_keyword' | 'sieve'>('local_vs_global');

  // Mode 1: Local vs Global State
  const [funcExecuted, setFuncExecuted] = useState<boolean>(false);
  const [attemptAccessN, setAttemptAccessN] = useState<boolean>(false);

  // Mode 2: Global Keyword State
  const [useGlobalKeyword, setUseGlobalKeyword] = useState<boolean>(true);
  const [globalTValue, setGlobalTValue] = useState<number>(10);
  const [globalNParam, setGlobalNParam] = useState<number>(1);
  const [globalRan, setGlobalRan] = useState<boolean>(false);

  // Mode 3: Even/Odd Index Sieve State (Default with A = [9, 2, 7, 4, 6])
  const [sieveInput, setSieveInput] = useState<string>('9, 2, 7, 4, 6');
  const [evenList, setEvenList] = useState<number[]>([9, 7, 6]);
  const [oddList, setOddList] = useState<number[]>([2, 4]);

  // Three.js Scene References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rootGroupRef = useRef<THREE.Group | null>(null);
  const dynamicGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Recalculate Sieve lists synchronously whenever sieveInput changes
  useEffect(() => {
    const arr = sieveInput
      .split(',')
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n));
    const evens: number[] = [];
    const odds: number[] = [];
    for (let i = 0; i < arr.length; i++) {
      if (i % 2 === 0) evens.push(arr[i]);
      else odds.push(arr[i]);
    }
    setEvenList(evens);
    setOddList(odds);
  }, [sieveInput]);

  // Rebuild 3D objects inside dynamic group without tearing down WebGL canvas
  const rebuildDynamicGroup = useCallback(() => {
    const dynamicGroup = dynamicGroupRef.current;
    if (!dynamicGroup) return;

    // Dispose old children
    while (dynamicGroup.children.length > 0) {
      const obj = dynamicGroup.children[0];
      dynamicGroup.remove(obj);
      if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
      if ((obj as THREE.Mesh).material) {
        const mat = (obj as THREE.Mesh).material;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat.dispose();
      }
    }

    if (labMode === 'local_vs_global') {
      // MODE 1: GLOBAL DOME vs LOCAL CHAMBER
      // Outer translucent sphere: Global Realm
      const domeGeo = new THREE.SphereGeometry(5.2, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2);
      const domeMat = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        wireframe: true,
        transparent: true,
        opacity: 0.22
      });
      const dome = new THREE.Mesh(domeGeo, domeMat);
      dome.position.y = -2.2;
      dynamicGroup.add(dome);

      // Global variable orbs (outside the inner room)
      // a = 1 (amber)
      const aGeo = new THREE.SphereGeometry(0.55, 20, 20);
      const aMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        emissive: 0xb45309,
        emissiveIntensity: 0.7
      });
      const aMesh = new THREE.Mesh(aGeo, aMat);
      aMesh.position.set(-3.8, 0.5, 1.2);
      dynamicGroup.add(aMesh);

      // b = 2 (emerald)
      const bGeo = new THREE.SphereGeometry(0.55, 20, 20);
      const bMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x064e3b,
        emissiveIntensity: 0.7
      });
      const bMesh = new THREE.Mesh(bGeo, bMat);
      bMesh.position.set(3.8, 0.5, 1.2);
      dynamicGroup.add(bMesh);

      // Inner Function Chamber: Glass box representing func(a, b)
      const chamberGeo = new THREE.BoxGeometry(3.8, 3.2, 3.2);
      const chamberMat = new THREE.MeshStandardMaterial({
        color: funcExecuted ? 0xa855f7 : 0x475569,
        transparent: true,
        opacity: funcExecuted ? 0.45 : 0.22,
        roughness: 0.1,
        metalness: 0.8
      });
      const chamber = new THREE.Mesh(chamberGeo, chamberMat);
      chamber.position.set(0, -0.6, 0);
      dynamicGroup.add(chamber);

      // Inside Chamber: Local variables (n, local a, local b)
      if (funcExecuted) {
        // n = 10 (purple glowing crystal in center)
        const nGeo = new THREE.OctahedronGeometry(0.6);
        const nMat = new THREE.MeshStandardMaterial({
          color: 0xec4899,
          emissive: 0x9d174d,
          emissiveIntensity: 0.95
        });
        const nMesh = new THREE.Mesh(nGeo, nMat);
        nMesh.position.set(0, -0.5, 0);
        dynamicGroup.add(nMesh);

        // Local a (modified to a*2)
        const locAGeo = new THREE.SphereGeometry(0.38, 16, 16);
        const locAMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0xd97706 });
        const locAMesh = new THREE.Mesh(locAGeo, locAMat);
        locAMesh.position.set(-1.1, -0.6, 0.6);
        dynamicGroup.add(locAMesh);

        // Local b (modified to a+b)
        const locBGeo = new THREE.SphereGeometry(0.38, 16, 16);
        const locBMat = new THREE.MeshStandardMaterial({ color: 0x34d399, emissive: 0x059669 });
        const locBMesh = new THREE.Mesh(locBGeo, locBMat);
        locBMesh.position.set(1.1, -0.6, 0.6);
        dynamicGroup.add(locBMesh);
      }
    } else if (labMode === 'global_keyword') {
      // MODE 2: GLOBAL TUNNEL BRIDGE
      // Outer global variable: t
      const tGeo = new THREE.SphereGeometry(0.75, 24, 24);
      const tMat = new THREE.MeshStandardMaterial({
        color: useGlobalKeyword && globalRan ? 0xa855f7 : 0x38bdf8,
        emissive: useGlobalKeyword && globalRan ? 0x7e22ce : 0x0284c7,
        emissiveIntensity: 0.85
      });
      const tMesh = new THREE.Mesh(tGeo, tMat);
      tMesh.position.set(0, 2.6, 0);
      dynamicGroup.add(tMesh);

      // Local Chamber below
      const roomGeo = new THREE.BoxGeometry(4.2, 2.4, 3);
      const roomMat = new THREE.MeshStandardMaterial({
        color: 0x1e1b4b,
        transparent: true,
        opacity: 0.5,
        metalness: 0.7
      });
      const room = new THREE.Mesh(roomGeo, roomMat);
      room.position.set(0, -1, 0);
      dynamicGroup.add(room);

      // Bridge Cylinder if useGlobalKeyword is ON
      if (useGlobalKeyword) {
        const bridgeGeo = new THREE.CylinderGeometry(0.14, 0.14, 2.4, 16);
        const bridgeMat = new THREE.MeshBasicMaterial({
          color: 0xd946ef,
          transparent: true,
          opacity: 0.9
        });
        const bridge = new THREE.Mesh(bridgeGeo, bridgeMat);
        bridge.position.set(0, 0.9, 0);
        dynamicGroup.add(bridge);

        // Pulse rings
        const ringGeo = new THREE.TorusGeometry(0.35, 0.05, 12, 24);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0xfbcfe8 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.set(0, 1.2, 0);
        dynamicGroup.add(ring);
      } else {
        // Disconnected barrier
        const barrierGeo = new THREE.BoxGeometry(3.6, 0.18, 2.5);
        const barrierMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
        const barrier = new THREE.Mesh(barrierGeo, barrierMat);
        barrier.position.set(0, 0.25, 0);
        dynamicGroup.add(barrier);
      }
    } else {
      // MODE 3: EVEN / ODD INDEX SIEVE MILL (Tach_day)
      // Input Conveyor (top center)
      const inConveyorGeo = new THREE.BoxGeometry(5.2, 0.25, 1.1);
      const inConveyorMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.6 });
      const inConveyor = new THREE.Mesh(inConveyorGeo, inConveyorMat);
      inConveyor.position.set(0, 2.1, 0);
      dynamicGroup.add(inConveyor);

      // Splitter Prism Hub
      const splitterGeo = new THREE.ConeGeometry(1.0, 1.7, 4);
      const splitterMat = new THREE.MeshStandardMaterial({ color: 0x8b5cf6, metalness: 0.8 });
      const splitter = new THREE.Mesh(splitterGeo, splitterMat);
      splitter.rotation.x = Math.PI;
      splitter.position.set(0, 0.9, 0);
      dynamicGroup.add(splitter);

      // Track B: Even Indices (Emerald, Left) - positioned comfortably above floor
      const trackBGeo = new THREE.BoxGeometry(4.8, 0.22, 0.9);
      const trackBMat = new THREE.MeshStandardMaterial({ color: 0x059669 });
      const trackB = new THREE.Mesh(trackBGeo, trackBMat);
      trackB.position.set(-3.0, -0.5, 0);
      dynamicGroup.add(trackB);

      // Track C: Odd Indices (Cyan, Right)
      const trackCGeo = new THREE.BoxGeometry(4.8, 0.22, 0.9);
      const trackCMat = new THREE.MeshStandardMaterial({ color: 0x0284c7 });
      const trackC = new THREE.Mesh(trackCGeo, trackCMat);
      trackC.position.set(3.0, -0.5, 0);
      dynamicGroup.add(trackC);

      // Even & Odd 3D Cubes based on current lists
      const maxCubesToShow = 5;
      const visibleEvens = evenList.slice(0, maxCubesToShow);
      const visibleOdds = oddList.slice(0, maxCubesToShow);

      visibleEvens.forEach((val, i) => {
        const cGeo = new THREE.BoxGeometry(0.48, 0.48, 0.48);
        const cMat = new THREE.MeshStandardMaterial({ color: 0x34d399, emissive: 0x064e3b });
        const cMesh = new THREE.Mesh(cGeo, cMat);
        cMesh.position.set(-1.8 - i * 0.72, -0.15, 0);
        dynamicGroup.add(cMesh);
      });

      visibleOdds.forEach((val, i) => {
        const cGeo = new THREE.BoxGeometry(0.48, 0.48, 0.48);
        const cMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x075985 });
        const cMesh = new THREE.Mesh(cGeo, cMat);
        cMesh.position.set(1.8 + i * 0.72, -0.15, 0);
        dynamicGroup.add(cMesh);
      });
    }
  }, [labMode, funcExecuted, useGlobalKeyword, globalRan, evenList, oddList]);

  // Mount-only Three.js setup with generous bottom clearance
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 340;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x070b14);

    // Frame camera with ample bottom space so both branches B and C are 100% visible
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 4.0, 14.0);
    camera.lookAt(0, 0.2, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xa855f7, 2.5);
    dirLight1.position.set(6, 10, 8);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x06b6d4, 2.0);
    dirLight2.position.set(-6, -5, 6);
    scene.add(dirLight2);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    rootGroupRef.current = rootGroup;

    // Floor Grid Helper (lowered to leave room for conveyor tracks)
    const grid = new THREE.GridHelper(18, 18, 0x6366f1, 0x1e293b);
    grid.position.y = -2.2;
    rootGroup.add(grid);

    // Dynamic Group
    const dynamicGroup = new THREE.Group();
    rootGroup.add(dynamicGroup);
    dynamicGroupRef.current = dynamicGroup;

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Gentle orbital pivot
      rootGroup.rotation.y = Math.sin(elapsed * 0.3) * 0.12;

      renderer.render(scene, camera);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    // Responsive Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        const dom = rendererRef.current.domElement;
        if (dom && dom.parentNode) dom.parentNode.removeChild(dom);
      }
    };
  }, []);

  // Update dynamic meshes on state change
  useEffect(() => {
    rebuildDynamicGroup();
  }, [rebuildDynamicGroup]);

  // Trigger global test run
  const handleRunGlobal = () => {
    if (useGlobalKeyword) {
      const newT = 2 * globalNParam + 1;
      setGlobalTValue(newT);
      setGlobalRan(true);
    } else {
      // Without global, outer t remains 10
      setGlobalRan(true);
    }
  };

  const handleResetGlobal = () => {
    setGlobalTValue(10);
    setGlobalRan(false);
  };

  return (
    <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl p-4 sm:p-6 space-y-4">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span>{isEn ? '3D Variable Scope Simulation Laboratory' : 'Phòng Thí Nghiệm 3D: Không Gian & Phạm Vi Biến'}</span>
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            {isEn
              ? 'Visualize memory realms: local function chambers, global sky domes, and global keyword quantum bridges.'
              : 'Trực quan hóa không gian bộ nhớ: phòng cục bộ trong hàm, vòm trời toàn cục và cầu nối từ khoá global.'}
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-2xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setLabMode('local_vs_global')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              labMode === 'local_vs_global'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isEn ? '1. Local vs Global' : '1. Cục bộ vs Toàn cục'}
          </button>
          <button
            onClick={() => setLabMode('global_keyword')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              labMode === 'global_keyword'
                ? 'bg-fuchsia-600 text-white shadow-md shadow-fuchsia-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isEn ? '2. global Bridge' : '2. Cầu nối global'}
          </button>
          <button
            onClick={() => setLabMode('sieve')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              labMode === 'sieve'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isEn ? '3. Even/Odd Index Sieve' : '3. Sàng chỉ số chẵn/lẻ'}
          </button>
        </div>
      </div>

      {/* 3D Canvas Box */}
      <div className="relative w-full h-72 sm:h-84 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/70">
        <div ref={mountRef} className="absolute inset-0 w-full h-full" />

        {/* Overlay HUD Badges */}
        <div className="absolute top-3 left-3 pointer-events-none space-y-1">
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900/90 text-purple-300 border border-purple-500/30 backdrop-blur-md">
            {labMode === 'local_vs_global' && (isEn ? 'Scope: Local [func] & Global [Main]' : 'Phạm vi: Cục bộ [Hàm func] & Toàn cục [Chương trình chính]')}
            {labMode === 'global_keyword' && (useGlobalKeyword ? (isEn ? '"global t" keyword: Quantum Bridge ON' : 'Từ khoá "global t": Cầu nối lượng tử BẬT') : (isEn ? 'No "global t": Bridge Blocked' : 'Không có "global t": Cầu nối bị chặn'))}
            {labMode === 'sieve' && (isEn ? 'Tach_day(A): Even indices B & Odd indices C' : 'Tach_day(A): Lọc chỉ số chẵn B & chỉ số lẻ C')}
          </span>
        </div>

        {/* Bottom Mode Indicators */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs pointer-events-none">
          <span className="text-[11px] text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded-lg backdrop-blur-md border border-slate-800">
            {labMode === 'local_vs_global' && (funcExecuted ? (isEn ? '✨ Function running: local n=10, a=2, b=4' : '✨ Hàm đang chạy: local n=10, a=2, b=4') : (isEn ? '💤 Idle: Global a=1, b=2' : '💤 Hàm nghỉ: Biến ngoài a=1, b=2'))}
            {labMode === 'global_keyword' && (isEn ? `Outer variable t = ${globalTValue}` : `Biến ngoài t = ${globalTValue}`)}
            {labMode === 'sieve' && (
              isEn
                ? `Even indices B: [${evenList.join(', ')}] | Odd indices C: [${oddList.join(', ')}]`
                : `Chỉ số chẵn B: [${evenList.join(', ')}] | Chỉ số lẻ C: [${oddList.join(', ')}]`
            )}
          </span>
          <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
            Three.js WebGL Scope Engine
          </span>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
        {labMode === 'local_vs_global' && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <div className="font-bold text-white font-mono">
                {isEn ? 'SGK Page 136 Example: def func(a, b): n = 10; a = a*2; b = a+b' : 'Ví dụ SGK Trang 136: def func(a, b): n = 10; a = a*2; b = a+b'}
              </div>
              <p className="text-[11px] text-slate-400">
                {isEn
                  ? 'Main program: a = 1; b = 2. Execute the function to see local variables live, then vanish upon return.'
                  : 'Chương trình chính: a = 1; b = 2. Bấm gọi hàm để xem biến cục bộ hoạt động rồi tự hủy khi hàm kết thúc.'}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => {
                  setFuncExecuted(!funcExecuted);
                  setAttemptAccessN(false);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  funcExecuted
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {funcExecuted ? (isEn ? 'Finish func(a, b)' : 'Kết thúc func(a, b)') : (isEn ? 'Call func(a, b)' : 'Gọi func(a, b)')}
              </button>

              <button
                onClick={() => setAttemptAccessN(true)}
                className="px-3 py-1.5 rounded-xl font-bold bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-500/40 transition-all cursor-pointer"
              >
                {isEn ? 'Try print(n) outside' : 'Thử lệnh: print(n) ở ngoài'}
              </button>
            </div>
          </div>
        )}

        {labMode === 'local_vs_global' && attemptAccessN && (
          <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs font-mono text-rose-300 animate-in fade-in space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-rose-400">
              <ShieldAlert className="w-4 h-4" />
              <span>Traceback (most recent call last):</span>
            </div>
            <div>File "&lt;pyshell#11&gt;", line 1, in &lt;module&gt;</div>
            <div className="font-bold">NameError: name 'n' is not defined</div>
            <p className="text-[11px] text-slate-400 font-sans">
              ➜ <strong>{isEn ? 'SGK Scoping Rule:' : 'Giải thích SGK:'}</strong>{' '}
              {isEn
                ? 'Variable n was declared exclusively inside func(), so it is strictly local. In the outer global scope, n does not exist!'
                : 'Biến n chỉ được khai báo trong hàm func nên có tính địa phương (cục bộ). Ngoài hàm, biến n hoàn toàn không tồn tại!'}
            </p>
          </div>
        )}

        {labMode === 'global_keyword' && (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="font-bold text-white flex items-center gap-2 font-mono">
                  <span>Page 138: def f(n): {useGlobalKeyword ? 'global t;' : ''} t = 2*n + 1</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {isEn
                    ? 'Initial outer t = 10. When global t is ON, calling f(1) directly updates outer t to 3!'
                    : 'Ban đầu biến ngoài t = 10. Khi có từ khóa global, hàm làm thay đổi biến ngoài thành 3!'}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => {
                    setUseGlobalKeyword(!useGlobalKeyword);
                    handleResetGlobal();
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    useGlobalKeyword
                      ? 'bg-fuchsia-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {useGlobalKeyword
                    ? (isEn ? 'With global t (ON)' : 'Có global t (BẬT)')
                    : (isEn ? 'Without global t (OFF)' : 'Không có global t (TẮT)')}
                </button>

                <button
                  onClick={handleRunGlobal}
                  className="px-3 py-1.5 rounded-xl font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isEn ? 'Call f(1)' : 'Gọi f(1)'}</span>
                </button>

                <button
                  onClick={handleResetGlobal}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
                  title="Reset"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Crucial Scoping Explanation */}
            <div className="flex items-start gap-2 p-2.5 rounded-xl bg-fuchsia-950/30 border border-fuchsia-500/30 text-xs text-slate-300">
              <Info className="w-4 h-4 text-fuchsia-400 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                <strong>{isEn ? 'Essential Rule:' : 'Nguyên tắc then chốt:'}</strong>{' '}
                {isEn
                  ? 'The global keyword is strictly required when re-binding or assigning (t = ...) to a module-level variable inside a function. Reading a global variable normally does NOT require the global keyword.'
                  : 'Từ khoá global chỉ bắt buộc khi cần gán lại giá trị (t = ...) cho biến cấp mô-đun (toàn cục) bên trong hàm. Việc đọc giá trị biến toàn cục thông thường không cần từ khoá global.'}
              </p>
            </div>
          </div>
        )}

        {labMode === 'sieve' && (
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <label className="text-slate-400 font-mono">
                  {isEn ? 'List A:' : 'Danh sách A:'}
                </label>
                <input
                  type="text"
                  value={sieveInput}
                  onChange={(e) => setSieveInput(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-white font-mono flex-1 sm:w-64"
                  placeholder="9, 2, 7, 4, 6"
                />
                <button
                  type="button"
                  onClick={() => setSieveInput('9, 2, 7, 4, 6')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 font-mono cursor-pointer"
                >
                  {isEn ? 'Sample SGK' : 'Mẫu SGK'}
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-mono font-bold">
                  {isEn ? 'Even indices B' : 'Chỉ số chẵn B'}: [{evenList.join(', ')}]
                </span>
                <span className="text-cyan-400 font-mono font-bold">
                  {isEn ? 'Odd indices C' : 'Chỉ số lẻ C'}: [{oddList.join(', ')}]
                </span>
              </div>
            </div>

            {/* Dynamic 3D Display Count Indicator */}
            <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800">
              <span>
                {isEn
                  ? `3D View: Showing ${Math.min(evenList.length, 5)}/${evenList.length} items on Even Track B, and ${Math.min(oddList.length, 5)}/${oddList.length} items on Odd Track C.`
                  : `Mô hình 3D: Đang hiển thị ${Math.min(evenList.length, 5)}/${evenList.length} phần tử nhánh Chỉ số chẵn B, và ${Math.min(oddList.length, 5)}/${oddList.length} phần tử nhánh Chỉ số lẻ C.`}
              </span>
              <span className="font-mono text-emerald-400 font-semibold">
                {isEn ? 'Zero-based Indexing' : 'Chỉ số tính từ 0 (0, 2, 4,... & 1, 3, 5,...)'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Predict - Simulate - Explain Integration */}
      <PredictSimulateExplain
        theme="dark"
        titleVi="Dự đoán phạm vi biến: Từ khóa global t"
        titleEn="Scope Prediction: Effect of global t"
        promptVi="Cho biến ngoài t = 10 và hàm f(n) gán t = 2*n + 1. Nếu BẬT 'global t' và gọi f(1), giá trị biến t bên ngoài hàm sau đó sẽ là bao nhiêu?"
        promptEn="Given outer t = 10 and f(n) assigning t = 2*n + 1. When 'global t' is ON and f(1) runs, what is the outer value of t afterwards?"
        options={[
          { id: 't10', labelVi: 't vẫn bằng 10 (không đổi)', labelEn: 't stays 10 (unchanged)' },
          { id: 't3', labelVi: 't thay đổi thành 3', labelEn: 't changes to 3' },
          { id: 't11', labelVi: 't thay đổi thành 11', labelEn: 't changes to 11' },
          { id: 'err', labelVi: 'Báo lỗi NameError', labelEn: 'Raises NameError' }
        ]}
        correctOptionId="t3"
        hasSimulationCompleted={globalRan || funcExecuted}
        actualOutcomeVi={
          labMode === 'global_keyword'
            ? `t ngoài = ${globalTValue} (${useGlobalKeyword ? 'Có global t' : 'Không có global t'})`
            : funcExecuted
            ? 'local n = 10 bên trong func(a, b)'
            : 'Đã chạy mô phỏng'
        }
        actualOutcomeEn={
          labMode === 'global_keyword'
            ? `Outer t = ${globalTValue} (${useGlobalKeyword ? 'global t ON' : 'global t OFF'})`
            : funcExecuted
            ? 'local n = 10 inside func(a, b)'
            : 'Simulation ran'
        }
        explanationVi="Khi khai báo global t trong hàm f(n), lệnh t = 2*1 + 1 sẽ ghi đè trực tiếp vào biến toàn cục t ở chương trình chính làm t đổi từ 10 thành 3. Nếu bỏ global t, Python tạo biến t cục bộ riêng và biến t bên ngoài giữ nguyên 10."
        explanationEn="With global t declared inside f(n), assigning t = 2*1 + 1 updates the module-level t from 10 to 3. Without global t, a separate local t is created and outer t stays 10."
        onRunDirectly={() => {
          setLabMode('global_keyword');
          setUseGlobalKeyword(true);
          setGlobalTValue(2 * globalNParam + 1);
          setGlobalRan(true);
        }}
      />
    </div>
  );
};
