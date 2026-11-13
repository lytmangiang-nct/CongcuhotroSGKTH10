import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useBook } from '../../context/BookContext';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  FastForward,
  Sparkles,
  Info,
  Layers,
  Activity,
  Sliders,
  CheckCircle,
  XCircle,
  Hash,
  ArrowRight
} from 'lucide-react';

interface LoopFor3DViewerProps {
  initialMode?: 'carousel' | 'range' | 'tower';
}

type SimPreset = 'sum' | 'even' | 'mult3' | 'divisors' | 'cubes';

export const LoopFor3DViewer: React.FC<LoopFor3DViewerProps> = ({ initialMode = 'carousel' }) => {
  const { bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<'carousel' | 'range' | 'tower'>(initialMode);

  // Carousel Mode States
  const [preset, setPreset] = useState<SimPreset>('sum');
  const [loopN, setLoopN] = useState<number>(10);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [accValue, setAccValue] = useState<number>(0);
  const [conditionMet, setConditionMet] = useState<boolean | null>(null);

  // Range Mode States
  const [rangeStart, setRangeStart] = useState<number>(0);
  const [rangeStop, setRangeStop] = useState<number>(10);
  const [rangeStep, setRangeStep] = useState<number>(1);

  // Tower Mode States
  const [towerN, setTowerN] = useState<number>(6);
  const [towerType, setTowerType] = useState<'cubes' | 'divisors' | 'harmonic'>('cubes');

  // Animation and scene refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const nodeMeshesRef = useRef<THREE.Mesh[]>([]);
  const coreMeshRef = useRef<THREE.Mesh | null>(null);
  const towerGroupRef = useRef<THREE.Group | null>(null);
  const rangeGroupRef = useRef<THREE.Group | null>(null);

  // Compute logic for current step in carousel
  const computeStepResult = (k: number, currentAcc: number, modePreset: SimPreset, n: number) => {
    switch (modePreset) {
      case 'sum': // Hoạt động 1: S = S + k
        return { isCondition: true, newAcc: currentAcc + k, label: `S = ${currentAcc} + ${k} = ${currentAcc + k}` };
      case 'even': // Ví dụ 1: if k % 2 == 0: S = S + k
        const isEven = k % 2 === 0;
        return {
          isCondition: isEven,
          newAcc: isEven ? currentAcc + k : currentAcc,
          label: isEven
            ? (isEn ? `${k} is even: S = ${currentAcc} + ${k} = ${currentAcc + k}` : `${k} chẵn: S = ${currentAcc} + ${k} = ${currentAcc + k}`)
            : (isEn ? `${k} is odd: Skipped (S = ${currentAcc})` : `${k} lẻ: Bỏ qua (giữ S = ${currentAcc})`)
        };
      case 'mult3': // Ví dụ 2: if k % 3 == 0: C = C + 1
        const isMult3 = k % 3 === 0;
        return {
          isCondition: isMult3,
          newAcc: isMult3 ? currentAcc + 1 : currentAcc,
          label: isMult3
            ? (isEn ? `${k} is multiple of 3: C = ${currentAcc} + 1 = ${currentAcc + 1}` : `${k} chia hết cho 3: C = ${currentAcc} + 1 = ${currentAcc + 1}`)
            : (isEn ? `${k} not multiple of 3: Keep C` : `${k} không chia hết cho 3: Giữ nguyên C`)
        };
      case 'divisors': // Thực hành 1: if n % k == 0 (with k from 1 to n)
        const isDiv = k > 0 && n % k === 0;
        return {
          isCondition: isDiv,
          newAcc: isDiv ? currentAcc + 1 : currentAcc,
          label: isDiv
            ? (isEn ? `${n} is divisible by ${k} -> Divisor!` : `${n} chia hết cho ${k} -> Ước số!`)
            : (isEn ? `${n} not divisible by ${k}` : `${n} không chia hết cho ${k}`)
        };
      case 'cubes': // Vận dụng 2: S = S + k^3
        const cubeVal = k * k * k;
        return {
          isCondition: true,
          newAcc: currentAcc + cubeVal,
          label: `S = ${currentAcc} + ${k}³ (${cubeVal}) = ${currentAcc + cubeVal}`
        };
    }
  };

  // Reset simulation when preset or loopN changes
  const handleReset = () => {
    setCurrentStep(0);
    setAccValue(0);
    setConditionMet(null);
    setIsPlaying(false);
  };

  useEffect(() => {
    handleReset();
  }, [preset, loopN, activeMode]);

  // Stepping forward
  const handleStepForward = () => {
    const maxSteps = preset === 'divisors' ? loopN + 1 : loopN;
    const startVal = preset === 'divisors' ? 1 : 0;
    
    if (currentStep < (maxSteps - startVal)) {
      const k = startVal + currentStep;
      const res = computeStepResult(k, accValue, preset, loopN);
      setAccValue(res.newAcc);
      setConditionMet(res.isCondition);
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };

  // Auto-play interval
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      const intervalMs = Math.max(250, 1200 / playbackSpeed);
      timer = setInterval(() => {
        const maxSteps = preset === 'divisors' ? loopN : loopN;
        if (currentStep < maxSteps) {
          handleStepForward();
        } else {
          setIsPlaying(false);
        }
      }, intervalMs);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentStep, loopN, accValue, preset, playbackSpeed]);

  // Setup Three.js scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId = 0;

    // Dimensions
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x090d16);
    scene.fog = new THREE.FogExp2(0x090d16, 0.025);

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    cameraRef.current = camera;
    if (activeMode === 'carousel') {
      camera.position.set(0, 7.5, 12);
      camera.lookAt(0, 0, 0);
    } else if (activeMode === 'range') {
      camera.position.set(0, 9, 14);
      camera.lookAt(0, 0, 0);
    } else {
      camera.position.set(0, 8, 13);
      camera.lookAt(0, 1, 0);
    }

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    dirLight.position.set(10, 18, 10);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const accentLight = new THREE.PointLight(0xf59e0b, 2.5, 30);
    accentLight.position.set(-8, 6, -5);
    scene.add(accentLight);

    // Floor grid
    const gridHelper = new THREE.GridHelper(30, 30, 0x1e293b, 0x0f172a);
    gridHelper.position.y = -1.2;
    scene.add(gridHelper);

    // BUILD OBJECTS BASED ON ACTIVE MODE
    nodeMeshesRef.current = [];

    if (activeMode === 'carousel') {
      // 1. Central Rotating Mechanical Spindle
      const coreGeo = new THREE.CylinderGeometry(1.4, 1.8, 1.2, 32);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x0284c7,
        emissiveIntensity: 0.2
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      coreMesh.position.y = 0;
      scene.add(coreMesh);
      coreMeshRef.current = coreMesh;

      // Core glowing energy ring
      const ringGeo = new THREE.TorusGeometry(1.9, 0.08, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      scene.add(ringMesh);

      // Execution Chamber Marker (Front center)
      const chamberGeo = new THREE.BoxGeometry(2.2, 0.2, 2.2);
      const chamberMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        emissive: 0x10b981,
        emissiveIntensity: 0.3,
        roughness: 0.4
      });
      const chamber = new THREE.Mesh(chamberGeo, chamberMat);
      chamber.position.set(0, -0.6, 4.2);
      scene.add(chamber);

      // Chamber holographic beam
      const beamGeo = new THREE.CylinderGeometry(1.2, 1.2, 3, 32, 1, true);
      const beamMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set(0, 0.9, 4.2);
      scene.add(beam);

      // Carousel Iteration Nodes
      const totalNodes = loopN;
      const radius = 4.2;

      for (let i = 0; i < totalNodes; i++) {
        const angle = (i / totalNodes) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        const nodeGroup = new THREE.Group();
        nodeGroup.position.set(x, 0, z);

        // Node Cylinder Pod
        const podGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.8, 16);
        const podMat = new THREE.MeshStandardMaterial({
          color: 0x334155,
          metalness: 0.5,
          roughness: 0.3
        });
        const pod = new THREE.Mesh(podGeo, podMat);
        pod.castShadow = true;
        nodeGroup.add(pod);

        // Top cap indicator
        const capGeo = new THREE.SphereGeometry(0.35, 16, 16);
        const capMat = new THREE.MeshStandardMaterial({
          color: 0x64748b,
          emissive: 0x0284c7,
          emissiveIntensity: 0.1
        });
        const cap = new THREE.Mesh(capGeo, capMat);
        cap.position.y = 0.45;
        nodeGroup.add(cap);

        scene.add(nodeGroup);
        nodeMeshesRef.current.push(pod);
      }
    } else if (activeMode === 'range') {
      // Range Mode: 3D Number Line Runway
      const rangeGroup = new THREE.Group();
      scene.add(rangeGroup);
      rangeGroupRef.current = rangeGroup;

      const minVal = -2;
      const maxVal = 20;
      const spacing = 1.0;

      // Runway base
      const runwayGeo = new THREE.BoxGeometry((maxVal - minVal + 2) * spacing, 0.4, 2.5);
      const runwayMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });
      const runway = new THREE.Mesh(runwayGeo, runwayMat);
      runway.position.set(((maxVal + minVal) / 2) * spacing, -0.2, 0);
      runway.receiveShadow = true;
      rangeGroup.add(runway);

      // Pylons for each number
      for (let val = minVal; val <= maxVal; val++) {
        const x = val * spacing;
        const inRange = val >= rangeStart && val < rangeStop;
        const isStopBoundary = val === rangeStop;

        const pylonGeo = new THREE.CylinderGeometry(0.3, 0.35, inRange ? 1.4 : 0.6, 16);
        const pylonMat = new THREE.MeshStandardMaterial({
          color: inRange ? 0x059669 : isStopBoundary ? 0xdc2626 : 0x334155,
          emissive: inRange ? 0x10b981 : isStopBoundary ? 0xef4444 : 0x000000,
          emissiveIntensity: inRange ? 0.6 : isStopBoundary ? 0.7 : 0.05,
          metalness: 0.4,
          roughness: 0.3
        });
        const pylon = new THREE.Mesh(pylonGeo, pylonMat);
        pylon.position.set(x, inRange ? 0.5 : 0.1, 0);
        rangeGroup.add(pylon);

        // Highlight marker on top of active in-range pylons
        if (inRange) {
          const markerGeo = new THREE.SphereGeometry(0.18, 16, 16);
          const markerMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
          const marker = new THREE.Mesh(markerGeo, markerMat);
          marker.position.set(x, 1.4, 0);
          rangeGroup.add(marker);
        }
      }
    } else if (activeMode === 'tower') {
      // Tower Mode: Accumulator voxel blocks
      const towerGroup = new THREE.Group();
      scene.add(towerGroup);
      towerGroupRef.current = towerGroup;

      if (towerType === 'cubes') {
        // Stack cubes with sizes corresponding to 1^3, 2^3, ..., n^3
        let currentY = 0;
        for (let i = 1; i <= towerN; i++) {
          const size = 0.5 + i * 0.28;
          const cubeGeo = new THREE.BoxGeometry(size, size, size);
          const colors = [0x38bdf8, 0x10b981, 0xf59e0b, 0xec4899, 0x8b5cf6, 0x06b6d4];
          const cubeMat = new THREE.MeshStandardMaterial({
            color: colors[(i - 1) % colors.length],
            metalness: 0.3,
            roughness: 0.2,
            emissive: colors[(i - 1) % colors.length],
            emissiveIntensity: 0.15
          });
          const cube = new THREE.Mesh(cubeGeo, cubeMat);
          cube.position.set(0, currentY + size / 2, 0);
          cube.castShadow = true;
          towerGroup.add(cube);
          currentY += size + 0.1;
        }
      } else if (towerType === 'divisors') {
        // Show row of tested numbers, highlight actual divisors of 12
        const nTarget = 12;
        for (let i = 1; i <= nTarget; i++) {
          const isDivisor = nTarget % i === 0;
          const x = (i - (nTarget + 1) / 2) * 1.0;
          const pillarGeo = new THREE.CylinderGeometry(0.3, 0.3, isDivisor ? 2.2 : 0.6, 16);
          const pillarMat = new THREE.MeshStandardMaterial({
            color: isDivisor ? 0x10b981 : 0x475569,
            emissive: isDivisor ? 0x059669 : 0x000000,
            emissiveIntensity: isDivisor ? 0.5 : 0
          });
          const pillar = new THREE.Mesh(pillarGeo, pillarMat);
          pillar.position.set(x, isDivisor ? 1.1 : 0.3, 0);
          towerGroup.add(pillar);
        }
      }
    }

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slow idle rotation in tower or range
      if (activeMode === 'tower' && towerGroupRef.current) {
        towerGroupRef.current.rotation.y = Math.sin(elapsedTime * 0.4) * 0.4;
      }

      if (activeMode === 'carousel') {
        // Rotate the central spindle slowly
        if (coreMeshRef.current) {
          coreMeshRef.current.rotation.y += 0.005;
        }

        // Color the nodes according to current execution step
        const startVal = preset === 'divisors' ? 1 : 0;
        nodeMeshesRef.current.forEach((mesh, idx) => {
          const kVal = startVal + idx;
          const cap = mesh.parent?.children[1] as THREE.Mesh | undefined;

          if (idx < currentStep) {
            // Already processed
            mesh.material = new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x059669, emissiveIntensity: 0.3 });
            if (cap) (cap.material as THREE.MeshStandardMaterial).color.setHex(0x34d399);
          } else if (idx === currentStep) {
            // Currently active
            mesh.material = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xd97706, emissiveIntensity: 0.8 });
            if (cap) (cap.material as THREE.MeshStandardMaterial).color.setHex(0xfbbf24);
            mesh.scale.set(1.2, 1.2, 1.2);
          } else {
            // Pending
            mesh.material = new THREE.MeshStandardMaterial({ color: 0x334155 });
            if (cap) (cap.material as THREE.MeshStandardMaterial).color.setHex(0x64748b);
            mesh.scale.set(1.0, 1.0, 1.0);
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, [activeMode, loopN, preset, currentStep, rangeStart, rangeStop, rangeStep, towerN, towerType]);

  // Range array for preview
  const getRangeValues = (start: number, stop: number, step: number) => {
    const arr: number[] = [];
    if (step <= 0) return arr;
    for (let i = start; i < stop; i += step) {
      arr.push(i);
      if (arr.length > 50) break; // safety
    }
    return arr;
  };

  const currentRangeItems = getRangeValues(rangeStart, rangeStop, rangeStep);
  const isEmptyRange = rangeStart >= rangeStop;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      {/* Simulation Header */}
      <div className="p-3 sm:p-4 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-violet-500/20 text-violet-400 border border-violet-500/30 flex items-center justify-center shrink-0">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-100 text-sm sm:text-base">
                {isEn ? '3D For Loop & range() Lab' : 'Phòng Thí Nghiệm Vòng Lặp For & Hàm range() 3D'}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                Interactive WebGL
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              {isEn
                ? '3D simulation of loop variable k, condition checks, and range() value sequences'
                : 'Mô phỏng 3D cơ chế luân chuyển biến lặp k, kiểm tra điều kiện và tạo vùng giá trị range()'}
            </p>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setActiveMode('carousel')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === 'carousel'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isEn ? '1. For Loop Carousel' : '1. Băng chuyền Vòng lặp For'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('range')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === 'range'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{isEn ? '2. range() Runway' : '2. Đường băng range()'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('tower')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === 'tower'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isEn ? '3. 3D Accumulator Tower' : '3. Tháp Lũy Kế 3D'}</span>
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Area */}
      <div className="relative w-full h-[360px] sm:h-[440px] bg-slate-950 overflow-hidden">
        {/* Dedicated 3D Canvas mount point */}
        <div ref={containerRef} className="absolute inset-0 w-full h-full" />

        {/* HUD Overlay for Carousel Mode */}
        {activeMode === 'carousel' && (
          <div className="absolute top-3 left-3 right-3 flex flex-wrap items-start justify-between gap-2 pointer-events-none">
            {/* Live Registers Panel */}
            <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 shadow-xl max-w-xs">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2 border-b border-slate-800 pb-1">
                <span>{isEn ? 'REAL-TIME VARIABLE REGISTERS' : 'THANH GHI BIẾN THỜI GIAN THỰC'}</span>
                <span className="font-mono text-violet-400">Step {currentStep}/{loopN}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">{isEn ? 'Loop variable (k)' : 'Biến lặp (k)'}</span>
                  <span className="font-mono text-lg font-black text-amber-400">
                    {currentStep < loopN ? currentStep : 'Done'}
                  </span>
                </div>
                <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">
                    {preset === 'mult3' || preset === 'divisors'
                      ? (isEn ? 'Counter (C)' : 'Bộ đếm (C)')
                      : (isEn ? 'Accumulator (S)' : 'Tích luỹ (S)')}
                  </span>
                  <span className="font-mono text-lg font-black text-emerald-400">
                    {accValue}
                  </span>
                </div>
              </div>
              {/* Condition status badge */}
              {conditionMet !== null && (
                <div className={`mt-2 p-1.5 rounded-lg text-[11px] font-mono flex items-center gap-1.5 ${
                  conditionMet
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                    : 'bg-rose-950/80 text-rose-300 border border-rose-800'
                }`}>
                  {conditionMet ? <CheckCircle className="w-3.5 h-3.5 shrink-0" /> : <XCircle className="w-3.5 h-3.5 shrink-0" />}
                  <span>
                    {conditionMet
                      ? (isEn ? 'Condition met -> Updated' : 'Thoả điều kiện -> Cập nhật')
                      : (isEn ? 'Condition failed -> Skipped' : 'Không thoả -> Bỏ qua')}
                  </span>
                </div>
              )}
            </div>

            {/* Current Active Python Code Snippet */}
            <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 shadow-xl text-xs font-mono max-w-sm hidden md:block">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 font-sans font-bold">
                {isEn ? 'Executing Python snippet' : 'Mã lệnh Python đang thực thi'}
              </div>
              {preset === 'sum' && (
                <pre className="text-slate-200">
                  <span className="text-amber-400">S</span> = 0{'\n'}
                  <span className="text-violet-400">for</span> k <span className="text-violet-400">in</span> <span className="text-sky-400">range</span>({loopN}):{'\n'}
                  {'    '}<span className="text-emerald-400">S = S + k</span>
                </pre>
              )}
              {preset === 'even' && (
                <pre className="text-slate-200">
                  <span className="text-amber-400">S</span> = 0{'\n'}
                  <span className="text-violet-400">for</span> k <span className="text-violet-400">in</span> <span className="text-sky-400">range</span>({loopN}):{'\n'}
                  {'    '}<span className="text-violet-400">if</span> k % 2 == 0:{'\n'}
                  {'        '}<span className="text-emerald-400">S = S + k</span>
                </pre>
              )}
              {preset === 'mult3' && (
                <pre className="text-slate-200">
                  <span className="text-amber-400">C</span> = 0{'\n'}
                  <span className="text-violet-400">for</span> k <span className="text-violet-400">in</span> <span className="text-sky-400">range</span>({loopN}):{'\n'}
                  {'    '}<span className="text-violet-400">if</span> k % 3 == 0:{'\n'}
                  {'        '}<span className="text-emerald-400">C = C + 1</span>
                </pre>
              )}
              {preset === 'divisors' && (
                <pre className="text-slate-200">
                  <span className="text-violet-400">for</span> k <span className="text-violet-400">in</span> <span className="text-sky-400">range</span>(1, {loopN} + 1):{'\n'}
                  {'    '}<span className="text-violet-400">if</span> {loopN} % k == 0:{'\n'}
                  {'        '}<span className="text-emerald-400">print</span>(k, end = <span className="text-amber-300">" "</span>)
                </pre>
              )}
              {preset === 'cubes' && (
                <pre className="text-slate-200">
                  <span className="text-amber-400">S</span> = 0{'\n'}
                  <span className="text-violet-400">for</span> k <span className="text-violet-400">in</span> <span className="text-sky-400">range</span>(1, {loopN} + 1):{'\n'}
                  {'    '}<span className="text-emerald-400">S = S + k**3</span>
                </pre>
              )}
            </div>
          </div>
        )}

        {/* Empty range warning in Mode 2 */}
        {activeMode === 'range' && isEmptyRange && (
          <div className="absolute inset-x-4 top-4 mx-auto max-w-md bg-rose-950/90 border border-rose-700 text-rose-200 p-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
            <XCircle className="w-6 h-6 text-rose-400 shrink-0" />
            <div>
              <div className="font-bold text-sm">
                {isEn ? 'EMPTY RANGE DETECTED' : 'VÙNG GIÁ TRỊ RỖNG (EMPTY RANGE)'}
              </div>
              <p className="text-xs text-rose-300">
                {isEn
                  ? `Since start (${rangeStart}) ≥ stop (${rangeStop}), range(${rangeStart}, ${rangeStop}) produces 0 elements! The loop will not iterate.`
                  : `Vì start (${rangeStart}) ≥ stop (${rangeStop}), range(${rangeStart}, ${rangeStop}) không tạo ra bất kỳ phần tử nào! Vòng lặp sẽ không chạy lần nào.`}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Control Panels below 3D canvas */}
      <div className="p-3 sm:p-4 bg-slate-900 border-t border-slate-800">
        {activeMode === 'carousel' && (
          <div className="flex flex-col gap-3">
            {/* Presets Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                {isEn ? 'Textbook Scenario:' : 'Kịch bản SGK:'}
              </span>
              <div className="flex flex-wrap gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => setPreset('sum')}
                  className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-all ${
                    preset === 'sum' ? 'bg-violet-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {isEn ? 'Act 1: Sum 0..9 (S=45)' : 'HĐ 1: Tổng 0..9 (S=45)'}
                </button>
                <button
                  type="button"
                  onClick={() => setPreset('even')}
                  className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-all ${
                    preset === 'even' ? 'bg-violet-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {isEn ? 'Ex 1: Even Numbers' : 'Ví dụ 1: Số chẵn'}
                </button>
                <button
                  type="button"
                  onClick={() => setPreset('mult3')}
                  className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-all ${
                    preset === 'mult3' ? 'bg-violet-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {isEn ? 'Ex 2: Multiples of 3' : 'Ví dụ 2: Bội số của 3'}
                </button>
                <button
                  type="button"
                  onClick={() => setPreset('divisors')}
                  className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-all ${
                    preset === 'divisors' ? 'bg-violet-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {isEn ? 'Practice: Divisors' : 'Thực hành: Ước số'}
                </button>
                <button
                  type="button"
                  onClick={() => setPreset('cubes')}
                  className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-all ${
                    preset === 'cubes' ? 'bg-violet-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {isEn ? 'Apply 2: Sum of Cubes' : 'Vận dụng 2: Tổng lập phương'}
                </button>
              </div>
            </div>

            {/* Playback Controls & Sliders */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlaying((v) => !v)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                    isPlaying
                      ? 'bg-amber-600 hover:bg-amber-500 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? (isEn ? 'Pause' : 'Tạm Dừng') : (isEn ? 'Auto Play' : 'Chạy Tự Động')}</span>
                </button>

                <button
                  type="button"
                  onClick={handleStepForward}
                  disabled={currentStep >= loopN || isPlaying}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all"
                  title={isEn ? 'Step forward one cycle' : 'Bước tiếp một chu kỳ'}
                >
                  <SkipForward className="w-4 h-4 text-violet-400" />
                  <span>{isEn ? 'Next Step' : 'Bước Tiếp'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer transition-all"
                  title={isEn ? 'Reset from start' : 'Đặt lại từ đầu'}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Sliders: N and Speed */}
              <div className="flex items-center gap-4 flex-wrap text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">{isEn ? 'Iterations n:' : 'Số vòng n:'}</span>
                  <input
                    type="range"
                    min="4"
                    max="15"
                    value={loopN}
                    onChange={(e) => setLoopN(Number(e.target.value))}
                    disabled={isPlaying}
                    className="w-24 accent-violet-500 cursor-pointer"
                  />
                  <span className="font-mono font-bold text-violet-400 w-5">{loopN}</span>
                </div>

                <div className="flex items-center gap-2">
                  <FastForward className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-400">{isEn ? 'Speed:' : 'Tốc độ:'}</span>
                  <button
                    type="button"
                    onClick={() => setPlaybackSpeed((s) => (s === 1 ? 2 : s === 2 ? 3 : 1))}
                    className="px-2 py-0.5 rounded bg-slate-800 text-violet-300 font-mono font-bold hover:bg-slate-700 cursor-pointer"
                  >
                    {playbackSpeed}x
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeMode === 'range' && (
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Start Slider */}
              <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400 font-semibold">{isEn ? 'Parameter start (Beginning):' : 'Tham số start (Bắt đầu):'}</span>
                  <span className="font-mono font-bold text-emerald-400">{rangeStart}</span>
                </div>
                <input
                  type="range"
                  min="-2"
                  max="15"
                  value={rangeStart}
                  onChange={(e) => setRangeStart(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Stop Slider */}
              <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400 font-semibold">{isEn ? 'Parameter stop (End bound - 1):' : 'Tham số stop (Điểm dừng - 1):'}</span>
                  <span className="font-mono font-bold text-rose-400">{rangeStop}</span>
                </div>
                <input
                  type="range"
                  min="-2"
                  max="20"
                  value={rangeStop}
                  onChange={(e) => setRangeStop(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>

              {/* Presets Quick Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => { setRangeStart(0); setRangeStop(10); }}
                  className="px-2 py-1 rounded-lg text-xs bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
                >
                  range(10)
                </button>
                <button
                  type="button"
                  onClick={() => { setRangeStart(3); setRangeStop(10); }}
                  className="px-2 py-1 rounded-lg text-xs bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
                >
                  range(3, 10)
                </button>
                <button
                  type="button"
                  onClick={() => { setRangeStart(1); setRangeStop(11); }}
                  className="px-2 py-1 rounded-lg text-xs bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
                >
                  range(1, 11)
                </button>
                <button
                  type="button"
                  onClick={() => { setRangeStart(10); setRangeStop(2); }}
                  className="px-2 py-1 rounded-lg text-xs bg-rose-950/60 text-rose-300 border border-rose-800 hover:bg-rose-900 cursor-pointer"
                >
                  range(10, 2) [{isEn ? 'Empty' : 'Rỗng'}]
                </button>
              </div>
            </div>

            {/* Generated Range Output Bar */}
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono text-violet-400 font-bold">
                  range({rangeStart}, {rangeStop})
                </span>
                <ArrowRight className="w-4 h-4 text-slate-600" />
                <span className="text-slate-400">{isEn ? `Result (${currentRangeItems.length} items):` : `Kết quả (${currentRangeItems.length} số):`}</span>
                <span className="font-mono text-emerald-300 font-bold">
                  {isEmptyRange ? (isEn ? '[ ] (Empty range)' : '[ ] (Vùng rỗng)') : currentRangeItems.join(', ')}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                {isEmptyRange ? (isEn ? 'Loop will not iterate' : 'Vòng lặp không lặp') : (isEn ? `Iterations = ${currentRangeItems.length}` : `Số lần lặp = ${currentRangeItems.length}`)}
              </div>
            </div>
          </div>
        )}

        {activeMode === 'tower' && (
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-semibold">{isEn ? 'Analysis mode:' : 'Chế độ phân tích:'}</span>
              <button
                type="button"
                onClick={() => setTowerType('cubes')}
                className={`px-3 py-1.5 rounded-lg cursor-pointer font-medium ${
                  towerType === 'cubes' ? 'bg-amber-600 text-white font-bold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {isEn ? 'Apply 2: Sum of cubes 1³ + 2³ + ... + n³' : 'Vận dụng 2: Tổng lập phương 1³ + 2³ + ... + n³'}
              </button>
              <button
                type="button"
                onClick={() => setTowerType('divisors')}
                className={`px-3 py-1.5 rounded-lg cursor-pointer font-medium ${
                  towerType === 'divisors' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {isEn ? 'Practice: Divisor sieve n = 12' : 'Thực hành: Sàng ước số n = 12'}
              </button>
            </div>

            {towerType === 'cubes' && (
              <div className="flex items-center gap-2">
                <span className="text-slate-400">{isEn ? 'Value of n:' : 'Giá trị n:'}</span>
                <input
                  type="range"
                  min="3"
                  max="8"
                  value={towerN}
                  onChange={(e) => setTowerN(Number(e.target.value))}
                  className="w-24 accent-amber-500 cursor-pointer"
                />
                <span className="font-mono font-bold text-amber-400">{towerN}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
