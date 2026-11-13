import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useBook } from '../../context/BookContext';
import {
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  Activity,
  ShieldAlert,
  StepForward,
  CheckCircle,
  Eye,
  Sliders
} from 'lucide-react';
import { PredictSimulateExplain } from '../PredictSimulateExplain';

interface Debugger3DLabProps {
  initialMode?: 'breakpoint' | 'boundary' | 'euclid';
}

export const Debugger3DLab: React.FC<Debugger3DLabProps> = ({ initialMode = 'breakpoint' }) => {
  const { bilingualMode, teachSimCommand, setTeachSimSnapshot } = useBook();
  const isVi = bilingualMode !== 'en';

  const mountRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<'breakpoint' | 'boundary' | 'euclid'>(initialMode);

  // Euclid mode step state: 0 -> (20, 16); 1 -> (4, 16); 2 -> (4, 12); 3 -> (4, 8); 4 -> (4, 4)
  const [euclidStep, setEuclidStep] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const euclidStepsData = [
    { step: 0, m: 20, n: 16, noteVi: 'Khởi tạo: m = 20, n = 16', noteEn: 'Initial: m = 20, n = 16' },
    { step: 1, m: 4, n: 16, noteVi: 'Vòng lặp 1: m > n -> m = m - n = 4', noteEn: 'Step 1: m > n -> m = m - n = 4' },
    { step: 2, m: 4, n: 12, noteVi: 'Vòng lặp 2: m < n -> n = n - m = 12', noteEn: 'Step 2: m < n -> n = n - m = 12' },
    { step: 3, m: 4, n: 8, noteVi: 'Vòng lặp 3: m < n -> n = n - m = 8', noteEn: 'Step 3: m < n -> n = n - m = 8' },
    { step: 4, m: 4, n: 4, noteVi: 'Vòng lặp 4: m < n -> n = n - m = 4. Kết thúc lặp!', noteEn: 'Step 4: m == n == 4. Loop terminates!' }
  ];

  // Breakpoint mode line pointer
  const [activeLine, setActiveLine] = useState<number>(4);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = window.setInterval(() => {
      if (activeMode === 'euclid') {
        setEuclidStep((s) => {
          if (s >= euclidStepsData.length - 1) {
            setIsAutoPlaying(false);
            return s;
          }
          return s + 1;
        });
      } else if (activeMode === 'breakpoint') {
        setActiveLine((l) => (l >= 9 ? 1 : l + 1));
      }
    }, 1150);
    return () => window.clearInterval(timer);
  }, [activeMode, euclidStepsData.length, isAutoPlaying]);

  useEffect(() => {
    if (!teachSimCommand) return;
    const { type } = teachSimCommand;
    if (type === 'pause') {
      setIsAutoPlaying(false);
    } else if (type === 'play') {
      setIsAutoPlaying(true);
    } else if (type === 'step') {
      setIsAutoPlaying(false);
      if (activeMode === 'euclid') {
        setEuclidStep((s) => Math.min(euclidStepsData.length - 1, s + 1));
      } else {
        setActiveLine((l) => (l >= 9 ? 1 : l + 1));
      }
    } else if (type === 'step_back') {
      setIsAutoPlaying(false);
      if (activeMode === 'euclid') {
        setEuclidStep((s) => Math.max(0, s - 1));
      } else {
        setActiveLine((l) => (l <= 1 ? 9 : l - 1));
      }
    } else if (type === 'reset') {
      setIsAutoPlaying(false);
      setEuclidStep(0);
      setActiveLine(4);
    } else if (type === 'mode:breakpoint') {
      setIsAutoPlaying(false);
      setActiveMode('breakpoint');
      setActiveLine(4);
    } else if (type === 'mode:boundary') {
      setIsAutoPlaying(false);
      setActiveMode('boundary');
    } else if (type === 'mode:euclid') {
      setIsAutoPlaying(false);
      setActiveMode('euclid');
      setEuclidStep(0);
    }
  }, [activeMode, euclidStepsData.length, teachSimCommand]);

  useEffect(() => {
    const labelEn =
      activeMode === 'euclid'
        ? `Euclid Step ${euclidStep}: m=${euclidStepsData[euclidStep].m}, n=${euclidStepsData[euclidStep].n}`
        : activeMode === 'boundary'
        ? 'Boundary Radar: 0 <= x, y <= 1'
        : `Breakpoint Chamber: Line ${activeLine}`;
    const labelVi =
      activeMode === 'euclid'
        ? `Bước Euclid ${euclidStep}: m=${euclidStepsData[euclidStep].m}, n=${euclidStepsData[euclidStep].n}`
        : activeMode === 'boundary'
        ? 'Radar Vùng Biên: 0 <= x, y <= 1'
        : `Điểm dừng: Dòng ${activeLine}`;
    setTeachSimSnapshot({
      status: isAutoPlaying ? 'running' : 'paused',
      labelEn,
      labelVi
    });
  }, [activeLine, activeMode, euclidStep, isAutoPlaying, setTeachSimSnapshot]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 600;
    const height = mount.clientHeight || 420;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070c18);
    sceneRef.current = scene;

    // Grid Floor
    const grid = new THREE.GridHelper(26, 26, 0x38bdf8, 0x1e293b);
    grid.position.y = -2;
    scene.add(grid);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 6, 16);
    camera.lookAt(0, 0, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x06b6d4, 1.8);
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xec4899, 1.2);
    dirLight2.position.set(-10, 8, -6);
    scene.add(dirLight2);

    // Mode Objects Container
    const modeGroup = new THREE.Group();
    scene.add(modeGroup);

    // Build specific 3D structure according to activeMode
    if (activeMode === 'breakpoint') {
      // 9 Floating code line slabs (like an IDE text editor in 3D)
      const numLines = 9;
      for (let i = 1; i <= numLines; i++) {
        const yPos = 3.6 - (i - 1) * 0.7;
        const isBreakpointLine = i === 4;
        const isCurrentActive = i === activeLine;

        // Line slab
        const slabGeo = new THREE.BoxGeometry(7.5, 0.45, 0.2);
        const slabMat = new THREE.MeshStandardMaterial({
          color: isCurrentActive ? 0x0284c7 : isBreakpointLine ? 0x991b1b : 0x1e293b,
          roughness: 0.3,
          metalness: 0.6,
          emissive: isCurrentActive ? 0x0369a1 : isBreakpointLine ? 0x7f1d1d : 0x0f172a,
          emissiveIntensity: isCurrentActive ? 0.6 : 0.2
        });
        const slab = new THREE.Mesh(slabGeo, slabMat);
        slab.position.set(0, yPos, 0);
        slab.name = `lineSlab_${i}`;
        modeGroup.add(slab);

        // Breakpoint indicator ball at Line 4
        if (isBreakpointLine) {
          const bpGeo = new THREE.SphereGeometry(0.3, 16, 16);
          const bpMat = new THREE.MeshStandardMaterial({
            color: 0xef4444,
            roughness: 0.1,
            metalness: 0.9,
            emissive: 0xef4444,
            emissiveIntensity: 0.9
          });
          const bpMesh = new THREE.Mesh(bpGeo, bpMat);
          bpMesh.position.set(-4.2, yPos, 0);
          bpMesh.name = 'bpOrb';
          modeGroup.add(bpMesh);

          // Glowing pulse ring around breakpoint
          const bpRingGeo = new THREE.RingGeometry(0.4, 0.6, 24);
          const bpRingMat = new THREE.MeshBasicMaterial({
            color: 0xf87171,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8
          });
          const bpRing = new THREE.Mesh(bpRingGeo, bpRingMat);
          bpRing.position.set(-4.2, yPos, 0.05);
          bpRing.name = 'bpPulseRing';
          modeGroup.add(bpRing);
        }

        // Pointer Arrow if current active
        if (isCurrentActive) {
          const arrowGeo = new THREE.ConeGeometry(0.25, 0.6, 8);
          const arrowMat = new THREE.MeshStandardMaterial({
            color: 0x38bdf8,
            emissive: 0x38bdf8,
            emissiveIntensity: 0.8
          });
          const arrow = new THREE.Mesh(arrowGeo, arrowMat);
          arrow.rotation.z = -Math.PI / 2;
          arrow.position.set(-4.2, yPos, 0);
          arrow.name = 'execArrow';
          modeGroup.add(arrow);
        }
      }

      // Memory inspection hologram card on the right
      const cardGeo = new THREE.BoxGeometry(4.2, 5.2, 0.1);
      const cardMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.2,
        metalness: 0.8,
        wireframe: true
      });
      const card = new THREE.Mesh(cardGeo, cardMat);
      card.position.set(6.2, 0.8, 0);
      card.name = 'watchCard';
      modeGroup.add(card);
    } else if (activeMode === 'boundary') {
      // 3D Boundary Plane: 0 <= x, y <= 1 (scaled by factor of 5)
      const planeGeo = new THREE.PlaneGeometry(8, 8);
      const planeMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide
      });
      const plane = new THREE.Mesh(planeGeo, planeMat);
      plane.rotation.x = -Math.PI / 2;
      plane.position.y = -1.9;
      modeGroup.add(plane);

      // 4 Edge Beacons: (0,0), (0,1), (1,0), (1,1)
      const corners = [
        { x: -4, z: 4, label: '(0, 0)' },
        { x: -4, z: -4, label: '(0, 1)' },
        { x: 4, z: 4, label: '(1, 0)' },
        { x: 4, z: -4, label: '(1, 1)' }
      ];

      corners.forEach((c, idx) => {
        const beaconGeo = new THREE.CylinderGeometry(0.3, 0.4, 2.2, 12);
        const beaconMat = new THREE.MeshStandardMaterial({
          color: 0xf59e0b,
          roughness: 0.2,
          metalness: 0.8,
          emissive: 0xd97706,
          emissiveIntensity: 0.7
        });
        const beacon = new THREE.Mesh(beaconGeo, beaconMat);
        beacon.position.set(c.x, -0.8, c.z);
        beacon.name = `beacon_${idx}`;
        modeGroup.add(beacon);

        // Warning beacon ring
        const ringGeo = new THREE.RingGeometry(0.7, 1.1, 16);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xf59e0b,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.6
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.set(c.x, -1.88, c.z);
        ring.rotation.x = -Math.PI / 2;
        modeGroup.add(ring);
      });

      // Interior random test points
      const pCount = 35;
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        pPos[i * 3] = (Math.random() - 0.5) * 7.2;
        pPos[i * 3 + 1] = -1.8;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 7.2;
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.2 });
      const pSystem = new THREE.Points(pGeo, pMat);
      modeGroup.add(pSystem);

      // Rotating Radar Scanner
      const radarGeo = new THREE.CylinderGeometry(0.1, 0.1, 3.5, 8);
      const radarMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
      const radarArm = new THREE.Mesh(radarGeo, radarMat);
      radarArm.position.set(0, 0, 0);
      radarArm.name = 'radarArm';
      modeGroup.add(radarArm);
    } else {
      // Mode: Euclid Subtraction 3D Towers
      const currentData = euclidStepsData[euclidStep];
      const scaleH = 0.22;

      // Tower M
      const mH = Math.max(0.6, currentData.m * scaleH);
      const mGeo = new THREE.CylinderGeometry(1.2, 1.4, mH, 16);
      const mMat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        roughness: 0.2,
        metalness: 0.8,
        emissive: 0x0891b2,
        emissiveIntensity: 0.4
      });
      const towerM = new THREE.Mesh(mGeo, mMat);
      towerM.position.set(-3.2, -2 + mH / 2, 0);
      towerM.name = 'towerM';
      modeGroup.add(towerM);

      // Tower N
      const nH = Math.max(0.6, currentData.n * scaleH);
      const nGeo = new THREE.CylinderGeometry(1.2, 1.4, nH, 16);
      const nMat = new THREE.MeshStandardMaterial({
        color: 0xf43f5e,
        roughness: 0.2,
        metalness: 0.8,
        emissive: 0xe11d48,
        emissiveIntensity: 0.4
      });
      const towerN = new THREE.Mesh(nGeo, nMat);
      towerN.position.set(3.2, -2 + nH / 2, 0);
      towerN.name = 'towerN';
      modeGroup.add(towerN);

      // Equilibrium bridge when m == n
      if (currentData.m === currentData.n) {
        const bridgeGeo = new THREE.CylinderGeometry(0.2, 0.2, 6.4, 8);
        const bridgeMat = new THREE.MeshStandardMaterial({
          color: 0x10b981,
          emissive: 0x10b981,
          emissiveIntensity: 0.8
        });
        const bridge = new THREE.Mesh(bridgeGeo, bridgeMat);
        bridge.rotation.z = Math.PI / 2;
        bridge.position.set(0, -2 + mH, 0);
        bridge.name = 'eqBridge';
        modeGroup.add(bridge);
      }
    }

    // 5. Animation loop
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Subtle camera motion
      camera.position.x = Math.sin(elapsed * 0.12) * 2;
      camera.lookAt(0, 0, 0);

      if (activeMode === 'breakpoint') {
        const bpRing = modeGroup.getObjectByName('bpPulseRing');
        if (bpRing) {
          const s = 1 + Math.sin(elapsed * 4) * 0.15;
          bpRing.scale.set(s, s, 1);
        }
        const watchCard = modeGroup.getObjectByName('watchCard');
        if (watchCard) {
          watchCard.rotation.y = Math.sin(elapsed * 0.8) * 0.1;
        }
      } else if (activeMode === 'boundary') {
        const arm = modeGroup.getObjectByName('radarArm');
        if (arm) {
          arm.rotation.y += delta * 1.5;
        }
      } else {
        const bridge = modeGroup.getObjectByName('eqBridge');
        if (bridge) {
          bridge.rotation.x += delta * 1.5;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      modeGroup.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else if (obj.material) {
            obj.material.dispose();
          }
        }
      });
    };
  }, [activeMode, activeLine, euclidStep]);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl">
      {/* 3D Canvas Mount */}
      <div className="relative w-full h-[400px] md:h-[480px]">
        <div ref={mountRef} className="absolute inset-0 w-full h-full" />

        {/* Top Control Bar */}
        <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
          {/* Mode Tabs */}
          <div className="inline-flex bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-slate-700 shadow-lg">
            <button
              onClick={() => setActiveMode('breakpoint')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeMode === 'breakpoint'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              {isVi ? '1. Buồng Điểm Dừng (Breakpoint)' : '1. Breakpoint Chamber'}
            </button>
            <button
              onClick={() => setActiveMode('boundary')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeMode === 'boundary'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              {isVi ? '2. Radar Dữ Liệu Vùng Biên' : '2. Boundary Test Radar'}
            </button>
            <button
              onClick={() => setActiveMode('euclid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeMode === 'euclid'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              {isVi ? '3. Động Cơ Bước Trừ Euclid' : '3. Euclid Subtraction'}
            </button>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur text-xs font-mono text-cyan-300 border border-cyan-500/30 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Debugger 3D Visualizer</span>
          </div>
        </div>

        {/* Bottom Context Panel */}
        <div className="absolute bottom-4 left-4 right-4 pointer-events-auto">
          {activeMode === 'breakpoint' && (
            <div className="bg-slate-900/90 backdrop-blur p-4 rounded-xl border border-slate-700 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-rose-400 font-bold mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  {isVi ? 'Điểm dừng tại Dòng 4: while m != n:' : 'Breakpoint at Line 4: while m != n:'}
                </div>
                <p className="text-xs text-slate-300 max-w-lg">
                  {isVi
                    ? 'Chương trình tạm dừng trước mỗi chu kỳ lặp để lập trình viên thanh tra giá trị các biến trung gian m, n, k trong bộ nhớ.'
                    : 'Program execution pauses at Line 4 prior to every while-iteration to let developers inspect m, n, k variables.'}
                </p>
              </div>

              {/* Line Stepping & Play/Pause Controls */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-slate-400 font-mono">Dòng: {activeLine}</span>
                <button
                  type="button"
                  onClick={() => setIsAutoPlaying((p) => !p)}
                  className={`px-3 py-1.5 rounded-lg text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isAutoPlaying ? 'bg-amber-600 hover:bg-amber-500' : 'bg-emerald-600 hover:bg-emerald-500'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  {isAutoPlaying ? (isVi ? 'Dừng' : 'Pause') : (isVi ? 'Chạy' : 'Run')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setActiveLine((l) => (l >= 9 ? 1 : l + 1));
                  }}
                  className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <StepForward className="w-3.5 h-3.5" />
                  {isVi ? 'Bước Kế Tiếp (Step)' : 'Step Over'}
                </button>
              </div>
            </div>
          )}

          {activeMode === 'boundary' && (
            <div className="bg-slate-900/90 backdrop-blur p-4 rounded-xl border border-slate-700 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400 mb-1">
                  {isVi ? '4 Điểm kiểm thử vùng biên cực hạn: 0 <= x, y <= 1' : '4 Critical Boundary Coordinates: 0 <= x, y <= 1'}
                </h4>
                <p className="text-xs text-slate-300">
                  {isVi
                    ? 'Thực tế phát triển phần mềm cho thấy: phần lớn bug nghiêm trọng (ZeroDivision, OutOfBounds) luôn ẩn náu ở các điểm biên (0,0), (0,1), (1,0), (1,1).'
                    : 'Real-world software testing proves that high-severity bugs concentrate at boundary limits.'}
                </p>
              </div>

              <div className="flex gap-2 text-xs font-mono">
                <span className="px-2 py-1 rounded bg-amber-950/80 border border-amber-700 text-amber-300 font-bold">(0, 0)</span>
                <span className="px-2 py-1 rounded bg-amber-950/80 border border-amber-700 text-amber-300 font-bold">(0, 1)</span>
                <span className="px-2 py-1 rounded bg-amber-950/80 border border-amber-700 text-amber-300 font-bold">(1, 0)</span>
                <span className="px-2 py-1 rounded bg-amber-950/80 border border-amber-700 text-amber-300 font-bold">(1, 1)</span>
              </div>
            </div>
          )}

          {activeMode === 'euclid' && (
            <div className="bg-slate-900/90 backdrop-blur p-4 rounded-xl border border-slate-700 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 font-mono text-xs mb-1">
                  <span className="text-cyan-400 font-bold">Tháp m = {euclidStepsData[euclidStep].m}</span>
                  <span className="text-rose-400 font-bold">Tháp n = {euclidStepsData[euclidStep].n}</span>
                  {euclidStepsData[euclidStep].m === euclidStepsData[euclidStep].n && (
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold">
                      ƯCLN = 4
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300">
                  {isVi ? euclidStepsData[euclidStep].noteVi : euclidStepsData[euclidStep].noteEn}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAutoPlaying((p) => !p)}
                  className={`px-3 py-1.5 rounded-lg text-white text-xs font-bold flex items-center gap-1 cursor-pointer ${
                    isAutoPlaying ? 'bg-amber-600 hover:bg-amber-500' : 'bg-emerald-600 hover:bg-emerald-500'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  {isAutoPlaying ? (isVi ? 'Dừng' : 'Pause') : (isVi ? 'Chạy' : 'Run')}
                </button>
                <button
                  type="button"
                  disabled={euclidStep === 0}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setEuclidStep((s) => Math.max(0, s - 1));
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-bold cursor-pointer"
                >
                  {isVi ? 'Lùi' : 'Back'}
                </button>
                <button
                  type="button"
                  disabled={euclidStep === euclidStepsData.length - 1}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setEuclidStep((s) => Math.min(euclidStepsData.length - 1, s + 1));
                  }}
                  className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <StepForward className="w-3.5 h-3.5" />
                  {isVi ? 'Trừ tiếp' : 'Next Step'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setEuclidStep(0);
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                  title="Reset"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Predict - Simulate - Explain Footer Panel */}
      <div className="p-4 bg-slate-900/95 border-t border-slate-800">
        <PredictSimulateExplain
          theme="dark"
          titleVi="Dự đoán mô phỏng 3D: Gỡ lỗi Euclid & Breakpoint"
          titleEn="3D Simulation Prediction: Euclid & Breakpoint Debugger"
          promptVi="Khi chuyển sang mô hình Tháp Trừ Euclid (m = 20, n = 16) và bấm 'Trừ tiếp' đến trạng thái cân bằng, cầu nối xanh (m == n) xuất hiện ở giá trị nào?"
          promptEn="In the Euclid Subtraction Towers mode (m = 20, n = 16), at what height does the green equilibrium bridge (m == n) appear?"
          options={[
            { id: 'b2', labelVi: 'Tháp m = n = 2 (ƯCLN = 2)', labelEn: 'Towers m = n = 2 (GCD = 2)' },
            { id: 'b4', labelVi: 'Tháp m = n = 4 (ƯCLN = 4)', labelEn: 'Towers m = n = 4 (GCD = 4)' },
            { id: 'b8', labelVi: 'Tháp m = n = 8 (ƯCLN = 8)', labelEn: 'Towers m = n = 8 (GCD = 8)' },
            { id: 'none', labelVi: 'Không bao giờ bằng nhau', labelEn: 'Towers never equalize' }
          ]}
          correctOptionId="b4"
          hasSimulationCompleted={euclidStep >= 4 || (activeMode === 'breakpoint' && activeLine !== 4)}
          actualOutcomeVi={
            activeMode === 'euclid'
              ? `Bước ${euclidStep}: m = ${euclidStepsData[euclidStep].m}, n = ${euclidStepsData[euclidStep].n}`
              : `Đang dừng tại dòng ${activeLine}`
          }
          actualOutcomeEn={
            activeMode === 'euclid'
              ? `Step ${euclidStep}: m = ${euclidStepsData[euclidStep].m}, n = ${euclidStepsData[euclidStep].n}`
              : `Stopped at Line ${activeLine}`
          }
          explanationVi="Sau 4 lần trừ luân phiên (20→4 rồi n: 16→12→8→4), hai tháp m và n đạt chiều cao bằng nhau tại 4 (ƯCLN(20, 16) = 4), giúp nhận diện nhanh trạng thái dừng của vòng lặp."
          explanationEn="After 4 subtraction steps (m: 20→4, then n: 16→12→8→4), both towers match at height 4 (GCD = 4), marking loop termination."
          onRunDirectly={() => {
            setActiveMode('euclid');
            setEuclidStep(4);
          }}
        />
      </div>
    </div>
  );
};
