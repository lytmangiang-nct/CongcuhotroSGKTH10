import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Play, Pause, RotateCcw, Cpu, Sparkles, CheckCircle2, ShieldAlert, ArrowRight, Zap } from 'lucide-react';
import { useBook } from '../../context/BookContext';

export const Function3DLab: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';

  const [activeMode, setActiveMode] = useState<'machine' | 'primeEngine' | 'earlyReturn'>('machine');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const isPlayingRef = useRef<boolean>(true);
  isPlayingRef.current = isPlaying;

  // Machine state
  const [selectedFunc, setSelectedFunc] = useState<'inc' | 'abs' | 'thong_bao'>('inc');
  const [machineInputVal, setMachineInputVal] = useState<number>(3);

  // Prime Engine state
  const [primeInputN, setPrimeInputN] = useState<number>(7);

  // Early Return test state
  const [earlyTestN, setEarlyTestN] = useState<number>(9);

  // Three.js scene refs
  const animFrameIdRef = useRef<number | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);

  // Helper to create texture canvas with text
  const createTextTexture = (text: string, bgColor: string, textColor: string, subText?: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, 256, 256);

      ctx.strokeStyle = textColor;
      ctx.lineWidth = 10;
      ctx.strokeRect(6, 6, 244, 244);

      ctx.fillStyle = textColor;
      ctx.font = 'bold 64px "Courier New", monospace, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 128, subText ? 100 : 128);

      if (subText) {
        ctx.fillStyle = '#cbd5e1';
        ctx.font = 'bold 32px sans-serif';
        ctx.fillText(subText, 128, 185);
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  };

  const rebuild3DScene = useCallback(() => {
    const group = groupRef.current;
    if (!group) return;

    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
      if ((obj as THREE.Mesh).material) {
        const mat = (obj as THREE.Mesh).material;
        if (Array.isArray(mat)) mat.forEach(m => m.dispose());
        else mat.dispose();
      }
    }

    if (activeMode === 'machine') {
      // 3D Function Black Box Machine
      const machineGeo = new THREE.BoxGeometry(4.2, 3.2, 2.8);
      const machineMat = new THREE.MeshStandardMaterial({
        color: 0x1e1b4b,
        roughness: 0.3,
        metalness: 0.6
      });
      const machine = new THREE.Mesh(machineGeo, machineMat);
      machine.position.set(0, 0.4, 0);
      group.add(machine);

      // Glass Window on Machine
      const glassGeo = new THREE.PlaneGeometry(3.2, 2.2);
      const glassMat = new THREE.MeshStandardMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.45,
        roughness: 0.1
      });
      const glass = new THREE.Mesh(glassGeo, glassMat);
      glass.position.set(0, 0.4, 1.42);
      group.add(glass);

      // Function Core Inside (Glowing Core)
      const coreGeo = new THREE.IcosahedronGeometry(0.8, 1);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        wireframe: true
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      coreMesh.name = 'functionCore';
      coreMesh.position.set(0, 0.4, 0);
      group.add(coreMesh);

      // Left Input Pipeline
      const inPipeGeo = new THREE.CylinderGeometry(0.4, 0.4, 3, 16);
      const pipeMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7 });
      const inPipe = new THREE.Mesh(inPipeGeo, pipeMat);
      inPipe.rotation.z = Math.PI / 2;
      inPipe.position.set(-3.2, 0.4, 0);
      group.add(inPipe);

      // Input Value Cube
      let inputLabel = String(machineInputVal);
      let outputLabel = String(machineInputVal + 1);
      if (selectedFunc === 'abs') {
        inputLabel = String(machineInputVal);
        outputLabel = String(Math.abs(machineInputVal));
      } else if (selectedFunc === 'thong_bao') {
        inputLabel = '"Minh"';
        outputLabel = 'None';
      }

      const inCubeTexture = createTextTexture(inputLabel, '#0369a1', '#38bdf8', isEn ? 'parameter' : 'tham số');
      const inCube = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 1.2, 1.2),
        new THREE.MeshStandardMaterial({ map: inCubeTexture })
      );
      inCube.position.set(-5.2, 0.4, 0);
      group.add(inCube);

      // Right Output Pipeline
      const outPipe = inPipe.clone();
      outPipe.position.set(3.2, 0.4, 0);
      group.add(outPipe);

      // Output Value Cube (Return Value)
      const outCubeTexture = createTextTexture(outputLabel, '#065f46', '#34d399', 'return');
      const outCube = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 1.2, 1.2),
        new THREE.MeshStandardMaterial({ map: outCubeTexture })
      );
      outCube.position.set(5.2, 0.4, 0);
      group.add(outCube);

      // Machine Title Plaque
      const plaqueCanvas = document.createElement('canvas');
      plaqueCanvas.width = 400;
      plaqueCanvas.height = 100;
      const pctx = plaqueCanvas.getContext('2d');
      if (pctx) {
        pctx.fillStyle = '#0f172a';
        pctx.fillRect(0, 0, 400, 100);
        pctx.strokeStyle = '#a855f7';
        pctx.lineWidth = 4;
        pctx.strokeRect(2, 2, 396, 96);
        pctx.fillStyle = '#f1f5f9';
        pctx.font = 'bold 28px monospace';
        pctx.textAlign = 'center';
        const fnName = selectedFunc === 'inc' ? 'def inc(n): return n+1' : selectedFunc === 'abs' ? 'def abs(x): return |x|' : 'def thong_bao(msg): print()';
        pctx.fillText(fnName, 200, 58);
      }
      const plaqueTex = new THREE.CanvasTexture(plaqueCanvas);
      const plaque = new THREE.Mesh(
        new THREE.PlaneGeometry(3.6, 0.9),
        new THREE.MeshBasicMaterial({ map: plaqueTex, side: THREE.DoubleSide })
      );
      plaque.position.set(0, 2.5, 0);
      group.add(plaque);

    } else if (activeMode === 'primeEngine') {
      // 3D Prime Engine Simulator (Nhiệm vụ 2 trang 129)
      const n = primeInputN;
      let C = 0;
      for (let k = 1; k < n; k++) {
        if (n % k === 0) {
          C++;
        }
      }
      const isPrime = C === 1;

      // Central Number Platform
      const cylGeo = new THREE.CylinderGeometry(1.6, 1.8, 1, 32);
      const cylMat = new THREE.MeshStandardMaterial({
        color: isPrime ? 0x065f46 : 0x7f1d1d,
        roughness: 0.3
      });
      const platform = new THREE.Mesh(cylGeo, cylMat);
      platform.position.set(0, -0.5, 0);
      group.add(platform);

      // Hologram of candidate n
      const nTexture = createTextTexture(
        `n = ${n}`,
        isPrime ? '#064e3b' : '#7f1d1d',
        isPrime ? '#34d399' : '#f87171',
        isEn ? (isPrime ? 'PRIME' : 'COMPOSITE') : (isPrime ? 'SỐ NGUYÊN TỐ' : 'HỢP SỐ')
      );
      const nMesh = new THREE.Mesh(
        new THREE.BoxGeometry(2.2, 1.4, 0.8),
        new THREE.MeshStandardMaterial({ map: nTexture })
      );
      nMesh.position.set(0, 1.2, 0);
      group.add(nMesh);

      // Divisor Tally Cubes around platform
      const totalK = Math.min(n - 1, 10);
      for (let k = 1; k <= totalK; k++) {
        const isDivisor = n % k === 0;
        const angle = ((k - 1) / totalK) * Math.PI * 2;
        const radius = 3.6;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        const kTexture = createTextTexture(
          `k=${k}`,
          isDivisor ? '#047857' : '#1e293b',
          isDivisor ? '#34d399' : '#94a3b8',
          isDivisor ? (isEn ? 'Divisor! (C++)' : 'Ước! (C++)') : (isEn ? 'Not divisor' : 'không chia hết')
        );
        const kMesh = new THREE.Mesh(
          new THREE.BoxGeometry(0.9, 0.9, 0.9),
          new THREE.MeshStandardMaterial({ map: kTexture })
        );
        kMesh.position.set(x, 0.2, z);
        group.add(kMesh);
      }

      // Counter Banner
      const cBanner = document.createElement('canvas');
      cBanner.width = 540;
      cBanner.height = 100;
      const ctx = cBanner.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, 540, 100);
        ctx.strokeStyle = isPrime ? '#10b981' : '#ef4444';
        ctx.lineWidth = 4;
        ctx.strokeRect(2, 2, 536, 96);
        ctx.fillStyle = isPrime ? '#34d399' : '#f87171';
        ctx.font = 'bold 28px monospace';
        ctx.textAlign = 'center';
        const bannerStr = isEn
          ? `C = ${C} proper divisors -> return ${isPrime ? 'True' : 'False'}`
          : `C = ${C} ước thực sự -> return ${isPrime ? 'True' : 'False'}`;
        ctx.fillText(bannerStr, 270, 60);
      }
      const cMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(5.4, 1.1),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(cBanner), side: THREE.DoubleSide })
      );
      cMesh.position.set(0, 2.7, 0);
      group.add(cMesh);

    } else if (activeMode === 'earlyReturn') {
      // 3 Exit Gates (Vận dụng 1 trang 130)
      const n = earlyTestN;
      let exitGate = 3;

      if (n < 2) {
        exitGate = 1;
      } else {
        for (let k = 2; k < n; k++) {
          if (n % k === 0) {
            exitGate = 2;
            break;
          }
        }
      }

      // 3 Portals
      const gates = [
        {
          id: 1,
          label: isEn ? 'Gate 1: n < 2' : 'Cổng 1: n < 2',
          desc: 'return False',
          x: -4.5,
          active: exitGate === 1,
          color: 0xf59e0b
        },
        {
          id: 2,
          label: isEn ? 'Gate 2: n % k == 0' : 'Cổng 2: n % k == 0',
          desc: isEn ? 'return False (Early)' : 'return False (Thoát sớm)',
          x: 0,
          active: exitGate === 2,
          color: 0xef4444
        },
        {
          id: 3,
          label: isEn ? 'Gate 3: Prime Confirmed' : 'Cổng 3: Duyệt xong',
          desc: isEn ? 'return True' : 'return True (Nguyên tố)',
          x: 4.5,
          active: exitGate === 3,
          color: 0x10b981
        }
      ];

      gates.forEach(gate => {
        // Portal Ring
        const ringGeo = new THREE.TorusGeometry(1.4, 0.12, 16, 32);
        const ringMat = new THREE.MeshStandardMaterial({
          color: gate.active ? gate.color : 0x334155,
          emissive: gate.active ? gate.color : 0x000000,
          emissiveIntensity: gate.active ? 0.6 : 0
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.set(gate.x, 0.8, 0);
        group.add(ring);

        // Label Plaque
        const pCanvas = document.createElement('canvas');
        pCanvas.width = 300;
        pCanvas.height = 120;
        const pctx = pCanvas.getContext('2d');
        if (pctx) {
          pctx.fillStyle = gate.active ? '#1e1b4b' : '#0f172a';
          pctx.fillRect(0, 0, 300, 120);
          pctx.strokeStyle = gate.active ? '#38bdf8' : '#475569';
          pctx.lineWidth = 4;
          pctx.strokeRect(2, 2, 296, 114);
          pctx.fillStyle = '#ffffff';
          pctx.font = 'bold 24px monospace';
          pctx.textAlign = 'center';
          pctx.fillText(gate.label, 150, 48);
          pctx.fillStyle = gate.active ? '#34d399' : '#94a3b8';
          pctx.font = 'bold 20px monospace';
          pctx.textAlign = 'center';
          pctx.fillText(gate.desc, 150, 90);
        }
        const plaque = new THREE.Mesh(
          new THREE.PlaneGeometry(2.4, 1.0),
          new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(pCanvas), side: THREE.DoubleSide })
        );
        plaque.position.set(gate.x, 2.7, 0);
        group.add(plaque);
      });

      // Moving Test Capsule entering the active gate
      const activeX = gates.find(g => g.active)?.x || 0;
      const capsuleGeo = new THREE.SphereGeometry(0.5, 16, 16);
      const capsuleMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7 });
      const capsule = new THREE.Mesh(capsuleGeo, capsuleMat);
      capsule.name = 'testCapsule';
      capsule.position.set(activeX, 0.8, 0);
      group.add(capsule);
    }
  }, [activeMode, selectedFunc, machineInputVal, primeInputN, earlyTestN, isEn]);

  // Mount-only Three.js setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 420;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x090d16);
    scene.fog = new THREE.FogExp2(0x090d16, 0.025);

    const grid = new THREE.GridHelper(36, 36, 0x38bdf8, 0x1e293b);
    grid.position.y = -2;
    scene.add(grid);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 5, 16);
    camera.lookAt(0, 0.5, 0);
    cameraRef.current = camera;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 1.2);
    dirLight1.position.set(8, 12, 8);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 0.9);
    dirLight2.position.set(-8, 10, -5);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x10b981, 1.8, 18);
    pointLight.position.set(0, 3, 2);
    scene.add(pointLight);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    groupRef.current = mainGroup;

    let angle = 0;
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      if (isPlayingRef.current && groupRef.current) {
        angle += 0.015;

        const core = groupRef.current.getObjectByName('functionCore');
        if (core) {
          core.rotation.x = angle;
          core.rotation.y = angle * 1.5;
        }

        const capsule = groupRef.current.getObjectByName('testCapsule');
        if (capsule) {
          capsule.position.z = Math.sin(angle * 3) * 0.8;
        }

        if (cameraRef.current) {
          cameraRef.current.position.x = Math.sin(angle * 0.3) * 1.2;
          cameraRef.current.position.y = 5 + Math.cos(angle * 0.2) * 0.4;
          cameraRef.current.lookAt(0, 0.5, 0);
        }
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
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

  // Rebuild 3D objects whenever configuration changes
  useEffect(() => {
    rebuild3DScene();
  }, [rebuild3DScene]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl flex flex-col my-6">
      {/* 3D Canvas Mount Point */}
      <div className="relative w-full h-[380px] sm:h-[440px] bg-radial from-slate-900 via-slate-950 to-slate-950">
        <div ref={mountRef} className="absolute inset-0 w-full h-full" />

        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2 pointer-events-none">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 backdrop-blur-md flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            {isEn ? '3D WebGL Python Function Lab' : 'Phòng Thí Nghiệm Hàm Python 3D WebGL'}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md">
            {isEn ? 'Lesson 26 SGK pp. 127 – 130' : 'Bài 26 SGK Tr. 127 – 130'}
          </span>
        </div>

        {/* Play/Pause & Reset */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-700/60 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title={isPlaying ? (isEn ? 'Pause rotation' : 'Tạm dừng quay') : (isEn ? 'Resume rotation' : 'Tiếp tục quay')}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-400" />}
          </button>
          <button
            type="button"
            onClick={() => {
              if (cameraRef.current) {
                cameraRef.current.position.set(0, 5, 16);
                cameraRef.current.lookAt(0, 0.5, 0);
              }
              rebuild3DScene();
            }}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title={isEn ? 'Reset view' : 'Đặt lại góc nhìn'}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Control Console */}
      <div className="p-4 bg-slate-900/95 border-t border-slate-800 flex flex-col gap-3">
        {/* Mode Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveMode('machine')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeMode === 'machine'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>{isEn ? '1. Function Pipeline Machine' : '1. Cỗ Máy Xử Lý Hàm (Black Box)'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('primeEngine')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeMode === 'primeEngine'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>{isEn ? '2. Prime Checker prime(n)' : '2. Động Cơ Số Nguyên Tố prime(n)'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('earlyReturn')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeMode === 'earlyReturn'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>{isEn ? '3. Early Return Optimizer' : '3. Lò Soi Thoát Sớm return'}</span>
          </button>
        </div>

        {/* Mode Specific Controls */}
        {activeMode === 'machine' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800/80 items-center">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold text-slate-400">
                {isEn ? 'Select Sample Function:' : 'Chọn hàm mẫu SGK:'}
              </label>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => setSelectedFunc('inc')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold cursor-pointer ${
                    selectedFunc === 'inc' ? 'bg-purple-600 text-white font-bold' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  inc(n)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFunc('abs')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold cursor-pointer ${
                    selectedFunc === 'abs' ? 'bg-purple-600 text-white font-bold' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  abs(x)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFunc('thong_bao')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold cursor-pointer ${
                    selectedFunc === 'thong_bao' ? 'bg-purple-600 text-white font-bold' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  thong_bao(msg)
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                <span>{isEn ? 'Input argument:' : 'Giá trị tham số truyền vào:'}</span>
                <span className="font-mono text-purple-300 font-bold">{machineInputVal}</span>
              </div>
              <input
                type="range"
                min="-20"
                max="20"
                value={machineInputVal}
                onChange={(e) => setMachineInputVal(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
              <div className="text-slate-500 text-[10px]">{isEn ? 'Mechanism:' : 'Cơ chế:'}</div>
              <div>Input ➔ <code>def {selectedFunc}</code> ➔ Return</div>
            </div>
          </div>
        )}

        {activeMode === 'primeEngine' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80 items-center">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span>{isEn ? 'Number n to test for primality:' : 'Kiểm tra số tự nhiên n:'}</span>
                <span className="text-emerald-400 font-mono font-bold text-sm">n = {primeInputN}</span>
              </div>
              <input
                type="range"
                min="2"
                max="25"
                value={primeInputN}
                onChange={(e) => setPrimeInputN(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
              <span className="text-emerald-400 font-bold">{isEn ? 'Task 2 Page 129:' : 'Nhiệm vụ 2 trang 129:'}</span>
              <div className="text-[11px] text-slate-400">
                {isEn
                  ? 'Count proper divisors k in [1, n-1]. n is prime iff C == 1.'
                  : 'Đếm số ước thực sự k ∈ [1, n-1]. n là nguyên tố ⟺ C = 1.'}
              </div>
            </div>
          </div>
        )}

        {activeMode === 'earlyReturn' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80 items-center">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span>{isEn ? 'Candidate number n (Vận dụng 1):' : 'Thử nghiệm số n (Vận dụng 1):'}</span>
                <span className="text-amber-400 font-mono font-bold text-sm">n = {earlyTestN}</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={earlyTestN}
                onChange={(e) => setEarlyTestN(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
              <span className="text-amber-400 font-bold">{isEn ? 'Application 1 Page 130:' : 'Vận dụng 1 trang 130:'}</span>
              <div className="text-[11px] text-slate-400">
                {earlyTestN < 2
                  ? (isEn ? 'Exits immediately at Gate 1 (n < 2 -> return False)' : 'Thoát ngay ở Cổng 1 (n < 2 -> return False)')
                  : earlyTestN % 2 === 0 && earlyTestN > 2
                  ? (isEn ? 'Exits immediately at Gate 2 when k=2 (even -> return False)' : `Thoát ngay ở Cổng 2 khi gặp k=2 (chia hết cho 2 -> return False)`)
                  : (isEn ? 'Safely traverses to Gate 3 (Prime confirmed)' : 'Duyệt an toàn qua Cổng 3')}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
