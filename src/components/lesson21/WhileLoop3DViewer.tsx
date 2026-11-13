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
  Layers,
  Activity,
  Sliders,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Zap,
  Droplets,
  Grid
} from 'lucide-react';
import { PredictSimulateExplain } from '../PredictSimulateExplain';

interface WhileLoop3DViewerProps {
  initialMode?: 'vortex' | 'structures' | 'realworld';
}

type WhilePreset = 'hd1_sum' | 'ex1_squares' | 'ex2_steps' | 'break_demo' | 'infinite_hazard';

export const WhileLoop3DViewer: React.FC<WhileLoop3DViewerProps> = ({ initialMode = 'vortex' }) => {
  const { bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<'vortex' | 'structures' | 'realworld'>(initialMode);

  // Vortex Simulation States
  const [preset, setPreset] = useState<WhilePreset>('hd1_sum');
  const [currentK, setCurrentK] = useState<number>(1);
  const [accumS, setAccumS] = useState<number>(0);
  const [loopCount, setLoopCount] = useState<number>(0);
  const [isConditionTrue, setIsConditionTrue] = useState<boolean>(true);
  const [isLoopHalted, setIsLoopHalted] = useState<boolean>(false);
  const [isBreakTriggered, setIsBreakTriggered] = useState<boolean>(false);
  const [isInfiniteAlarm, setIsInfiniteAlarm] = useState<boolean>(false);

  // Playback control
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);

  // Real-world & Matrix Mode State
  const [bucketWater, setBucketWater] = useState<number>(0); // 0 to 10
  const [maxCapacity, setMaxCapacity] = useState<number>(10);
  const [asciiIndex, setAsciiIndex] = useState<number>(65); // 65 'A' to 90 'Z'

  // Three.js object references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const packetMeshRef = useRef<THREE.Mesh | null>(null);
  const gateMeshRef = useRef<THREE.Mesh | null>(null);
  const waterMeshRef = useRef<THREE.Mesh | null>(null);
  const animFrameIdRef = useRef<number>(0);

  // Reset function for presets
  const handleResetSimulation = (chosenPreset: WhilePreset = preset) => {
    setIsPlaying(false);
    setIsLoopHalted(false);
    setIsBreakTriggered(false);
    setIsInfiniteAlarm(false);
    setLoopCount(0);

    if (chosenPreset === 'hd1_sum') {
      setCurrentK(1);
      setAccumS(0);
      setIsConditionTrue(true);
    } else if (chosenPreset === 'ex1_squares') {
      setCurrentK(1);
      setAccumS(0);
      setIsConditionTrue(true);
    } else if (chosenPreset === 'ex2_steps') {
      setCurrentK(2);
      setAccumS(0);
      setIsConditionTrue(true);
    } else if (chosenPreset === 'break_demo') {
      setCurrentK(0);
      setAccumS(0);
      setIsConditionTrue(true);
    } else if (chosenPreset === 'infinite_hazard') {
      setCurrentK(1);
      setAccumS(10);
      setIsConditionTrue(true);
      setIsInfiniteAlarm(true);
    }
  };

  useEffect(() => {
    handleResetSimulation(preset);
  }, [preset, activeMode]);

  // Step Forward Logic
  const handleStepForward = () => {
    if (isLoopHalted) return;

    if (preset === 'hd1_sum') {
      // while k < 100: S = S + k; k = k + 7
      if (currentK < 100) {
        setAccumS((prev) => prev + currentK);
        const nextK = currentK + 7;
        setCurrentK(nextK);
        setLoopCount((prev) => prev + 1);
        if (nextK >= 100) {
          setIsConditionTrue(false);
          setIsLoopHalted(true);
          setIsPlaying(false);
        }
      }
    } else if (preset === 'ex1_squares') {
      // while k*k < 100: S = S + k*k; k = k + 1
      if (currentK * currentK < 100) {
        setAccumS((prev) => prev + currentK * currentK);
        const nextK = currentK + 1;
        setCurrentK(nextK);
        setLoopCount((prev) => prev + 1);
        if (nextK * nextK >= 100) {
          setIsConditionTrue(false);
          setIsLoopHalted(true);
          setIsPlaying(false);
        }
      }
    } else if (preset === 'ex2_steps') {
      // while k < 50: print(k); k = k + 3
      if (currentK < 50) {
        const nextK = currentK + 3;
        setCurrentK(nextK);
        setLoopCount((prev) => prev + 1);
        if (nextK >= 50) {
          setIsConditionTrue(false);
          setIsLoopHalted(true);
          setIsPlaying(false);
        }
      }
    } else if (preset === 'break_demo') {
      // for k in range(10): if k == 5: break
      if (currentK < 10) {
        if (currentK === 5) {
          setIsBreakTriggered(true);
          setIsLoopHalted(true);
          setIsPlaying(false);
        } else {
          setCurrentK((prev) => prev + 1);
          setLoopCount((prev) => prev + 1);
        }
      }
    } else if (preset === 'infinite_hazard') {
      // while k > 0: k = k + 1 (Infinite!)
      setCurrentK((prev) => prev + 1);
      setLoopCount((prev) => prev + 1);
      setIsInfiniteAlarm(true);
      if (loopCount > 35) {
        // Cap for safety
        setIsPlaying(false);
      }
    }
  };

  // Auto-play timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !isLoopHalted) {
      const delayMs = Math.max(150, 900 / speed);
      interval = setInterval(() => {
        handleStepForward();
      }, delayMs);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isLoopHalted, currentK, preset, loopCount, speed]);

  // Three.js Mount and Setup
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId = 0;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 440;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x060913);
    scene.fog = new THREE.FogExp2(0x060913, 0.03);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    cameraRef.current = camera;
    if (activeMode === 'vortex') {
      camera.position.set(0, 8, 12);
      camera.lookAt(0, 0, 0);
    } else if (activeMode === 'structures') {
      camera.position.set(0, 7, 14);
      camera.lookAt(0, 0, 0);
    } else {
      camera.position.set(0, 6, 12);
      camera.lookAt(0, 0, 0);
    }

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambLight);

    const dirLight = new THREE.DirectionalLight(0x818cf8, 2.0);
    dirLight.position.set(10, 15, 10);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const glowLight = new THREE.PointLight(0x38bdf8, 2.5, 25);
    glowLight.position.set(0, 3, 0);
    scene.add(glowLight);

    // Floor Grid
    const grid = new THREE.GridHelper(30, 30, 0x1e293b, 0x0f172a);
    grid.position.y = -1.2;
    scene.add(grid);

    // BUILD MODE SPECIFIC ASSETS
    if (activeMode === 'vortex') {
      // Main Loop Torus Track
      const loopRadius = 4.2;
      const tubeRadius = 0.18;
      const torusGeo = new THREE.TorusGeometry(loopRadius, tubeRadius, 24, 80);
      const torusMat = new THREE.MeshStandardMaterial({
        color: 0x334155,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x1e293b,
        emissiveIntensity: 0.4
      });
      const torusMesh = new THREE.Mesh(torusGeo, torusMat);
      torusMesh.rotation.x = Math.PI / 2;
      scene.add(torusMesh);

      // Exit Branching Track (when condition is False)
      const exitCurve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 0, -loopRadius),
        new THREE.Vector3(3, 0, -loopRadius - 2),
        new THREE.Vector3(7, 0, -loopRadius - 3)
      );
      const exitGeo = new THREE.TubeGeometry(exitCurve, 30, 0.16, 16, false);
      const exitMat = new THREE.MeshStandardMaterial({
        color: 0xef4444,
        emissive: 0x991b1b,
        emissiveIntensity: 0.4
      });
      const exitMesh = new THREE.Mesh(exitGeo, exitMat);
      scene.add(exitMesh);

      // Sentinel Decision Gate at top of loop (Z = -loopRadius)
      const gateGeo = new THREE.CylinderGeometry(0.8, 0.8, 1.2, 32);
      const gateMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x059669,
        emissiveIntensity: 0.8,
        metalness: 0.5,
        roughness: 0.3
      });
      const gateMesh = new THREE.Mesh(gateGeo, gateMat);
      gateMesh.position.set(0, 0.4, -loopRadius);
      scene.add(gateMesh);
      gateMeshRef.current = gateMesh;

      // Gate holographic sensor beam
      const beamGeo = new THREE.CylinderGeometry(0.9, 0.9, 2.5, 32, 1, true);
      const beamMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide
      });
      const beamMesh = new THREE.Mesh(beamGeo, beamMat);
      beamMesh.position.set(0, 1.0, -loopRadius);
      scene.add(beamMesh);

      // Data Packet Traveler
      const packetGeo = new THREE.SphereGeometry(0.38, 24, 24);
      const packetMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 1.0,
        metalness: 0.3,
        roughness: 0.1
      });
      const packet = new THREE.Mesh(packetGeo, packetMat);
      packet.position.set(0, 0, loopRadius);
      scene.add(packet);
      packetMeshRef.current = packet;

      // Inner Pulse Reactor Core
      const coreGeo = new THREE.IcosahedronGeometry(1.2, 1);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x6366f1,
        emissive: 0x4f46e5,
        emissiveIntensity: 0.4,
        wireframe: true
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      scene.add(core);

    } else if (activeMode === 'structures') {
      // 3 BASIC CONTROL STRUCTURES IN 3D
      // Left: 1. Tuần tự (Sequential linear stack)
      const seqGroup = new THREE.Group();
      seqGroup.position.set(-6, 0, 0);
      scene.add(seqGroup);

      for (let i = 0; i < 3; i++) {
        const boxGeo = new THREE.BoxGeometry(2.2, 0.6, 1.4);
        const boxMat = new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          emissive: 0x0369a1,
          emissiveIntensity: 0.3
        });
        const box = new THREE.Mesh(boxGeo, boxMat);
        box.position.y = 2 - i * 1.2;
        seqGroup.add(box);
      }

      // Middle: 2. Rẽ nhánh (Selection split)
      const selGroup = new THREE.Group();
      selGroup.position.set(0, 0, 0);
      scene.add(selGroup);

      // Diamond decision
      const diamondGeo = new THREE.OctahedronGeometry(1.0);
      const diamondMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        emissive: 0xd97706,
        emissiveIntensity: 0.5
      });
      const diamond = new THREE.Mesh(diamondGeo, diamondMat);
      diamond.position.y = 1.8;
      selGroup.add(diamond);

      // Branch 1 & Branch 2 boxes
      const leftBranchGeo = new THREE.BoxGeometry(1.4, 0.6, 1.2);
      const leftBranchMat = new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x047857, emissiveIntensity: 0.3 });
      const leftBranch = new THREE.Mesh(leftBranchGeo, leftBranchMat);
      leftBranch.position.set(-1.6, 0, 0);
      selGroup.add(leftBranch);

      const rightBranch = new THREE.Mesh(leftBranchGeo, new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xb91c1c, emissiveIntensity: 0.3 }));
      rightBranch.position.set(1.6, 0, 0);
      selGroup.add(rightBranch);

      // Right: 3. Lặp (Loop structure)
      const loopGroup = new THREE.Group();
      loopGroup.position.set(6, 0, 0);
      scene.add(loopGroup);

      const smallTorusGeo = new THREE.TorusGeometry(1.6, 0.15, 16, 50);
      const smallTorusMat = new THREE.MeshStandardMaterial({ color: 0x8b5cf6, emissive: 0x6d28d9, emissiveIntensity: 0.4 });
      const smallTorus = new THREE.Mesh(smallTorusGeo, smallTorusMat);
      smallTorus.rotation.x = Math.PI / 2;
      loopGroup.add(smallTorus);

      const loopBoxGeo = new THREE.BoxGeometry(1.8, 0.6, 1.0);
      const loopBoxMat = new THREE.MeshStandardMaterial({ color: 0xa855f7, emissive: 0x7e22ce, emissiveIntensity: 0.3 });
      const loopBox = new THREE.Mesh(loopBoxGeo, loopBoxMat);
      loopBox.position.set(0, 0.3, 1.6);
      loopGroup.add(loopBox);

    } else if (activeMode === 'realworld') {
      // REAL WORLD WATER BUCKET SIMULATOR (SGK Cột B Khởi động)
      // Glass Cylinder Water Reservoir
      const glassGeo = new THREE.CylinderGeometry(2.0, 2.0, 4.0, 32, 1, true);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.3,
        roughness: 0.1,
        transmission: 0.9,
        thickness: 0.5
      });
      const glass = new THREE.Mesh(glassGeo, glassMat);
      glass.position.set(-3.5, 1.0, 0);
      scene.add(glass);

      // Water fluid level
      const waterHeight = Math.max(0.1, (bucketWater / maxCapacity) * 3.8);
      const waterGeo = new THREE.CylinderGeometry(1.9, 1.9, waterHeight, 32);
      const waterMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.1,
        metalness: 0.1,
        transparent: true,
        opacity: 0.85
      });
      const water = new THREE.Mesh(waterGeo, waterMat);
      water.position.set(-3.5, -1.0 + waterHeight / 2, 0);
      scene.add(water);
      waterMeshRef.current = water;

      // ASCII Matrix Display on Right (3 rows: 10, 10, 6)
      const asciiGroup = new THREE.Group();
      asciiGroup.position.set(2.5, 0, 0);
      scene.add(asciiGroup);

      const totalChars = 26; // 'A' to 'Z'
      for (let i = 0; i < totalChars; i++) {
        const row = Math.floor(i / 10);
        const col = i % 10;
        const x = (col - 4.5) * 0.7;
        const y = (1 - row) * 0.8;

        const charTileGeo = new THREE.BoxGeometry(0.55, 0.55, 0.1);
        const isEmitted = (65 + i) <= asciiIndex;
        const tileMat = new THREE.MeshStandardMaterial({
          color: isEmitted ? 0x10b981 : 0x1e293b,
          emissive: isEmitted ? 0x059669 : 0x000000,
          emissiveIntensity: isEmitted ? 0.6 : 0
        });
        const tile = new THREE.Mesh(charTileGeo, tileMat);
        tile.position.set(x, y + 1.2, 0);
        asciiGroup.add(tile);
      }
    }

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Vortex Mode Motion
      if (activeMode === 'vortex') {
        const loopRadius = 4.2;

        if (!isLoopHalted) {
          // Packet revolves in circle
          const speedFactor = isPlaying ? speed * 1.8 : 0.8;
          const angle = elapsed * speedFactor;
          const px = Math.sin(angle) * loopRadius;
          const pz = Math.cos(angle) * loopRadius;

          if (packetMeshRef.current) {
            packetMeshRef.current.position.set(px, 0.2 + Math.sin(elapsed * 4) * 0.1, pz);
          }
        } else {
          // If halted, packet slides off onto exit track
          if (packetMeshRef.current) {
            packetMeshRef.current.position.x += 0.05;
            packetMeshRef.current.position.z -= 0.02;
          }
        }

        // Color gate according to status
        if (gateMeshRef.current) {
          const mat = gateMeshRef.current.material as THREE.MeshStandardMaterial;
          if (isInfiniteAlarm) {
            // Flash red alarm
            mat.color.setHex(Math.sin(elapsed * 10) > 0 ? 0xef4444 : 0x7f1d1d);
            mat.emissive.setHex(0xdc2626);
            mat.emissiveIntensity = 1.0;
          } else if (isBreakTriggered) {
            mat.color.setHex(0xf59e0b);
            mat.emissive.setHex(0xd97706);
          } else if (isLoopHalted) {
            mat.color.setHex(0xef4444);
            mat.emissive.setHex(0x991b1b);
          } else {
            mat.color.setHex(0x10b981);
            mat.emissive.setHex(0x059669);
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();
    animFrameIdRef.current = animId;

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, [activeMode, preset, isLoopHalted, isBreakTriggered, isInfiniteAlarm, speed, bucketWater, maxCapacity, asciiIndex]);

  // Real-world water pouring step
  const handlePourBucket = () => {
    if (bucketWater < maxCapacity) {
      setBucketWater((prev) => Math.min(maxCapacity, prev + 1));
    }
  };

  const handleDrainBucket = () => {
    setBucketWater(0);
  };

  // ASCII Step
  const handleNextAscii = () => {
    if (asciiIndex < 90) {
      setAsciiIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      {/* Simulation Header */}
      <div className="p-3 sm:p-4 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-100 text-sm sm:text-base">
                {isEn ? '3D While Loop & 3 Control Structures Lab' : 'Phòng Thí Nghiệm Vòng Lặp While & 3 Cấu Trúc Lập Trình 3D'}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Interactive WebGL
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              {isEn
                ? '3D simulation of pre-condition checks, halting sensor, infinite loop traps, and break statements'
                : 'Mô phỏng 3D cơ chế kiểm tra điều kiện trước, cảm biến dừng, bẫy lặp vô hạn và lệnh break'}
            </p>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setActiveMode('vortex')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === 'vortex'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isEn ? '1. While Loop Vortex' : '1. Vòng Xoáy Lặp While'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('structures')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === 'structures'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isEn ? '2. 3 Basic Structures' : '2. 3 Cấu Trúc Cơ Bản'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('realworld')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === 'realworld'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>{isEn ? '3. Water Bucket & ASCII' : '3. Xô Nước & Mã ASCII'}</span>
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Area */}
      <div className="relative w-full h-[360px] sm:h-[440px] bg-slate-950 overflow-hidden">
        {/* Dedicated 3D Canvas mount point */}
        <div ref={containerRef} className="absolute inset-0 w-full h-full" />

        {/* HUD Overlay for Vortex Mode */}
        {activeMode === 'vortex' && (
          <div className="absolute top-3 left-3 right-3 flex flex-wrap items-start justify-between gap-2 pointer-events-none">
            {/* Live Registers Panel */}
            <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 shadow-xl max-w-xs">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2 border-b border-slate-800 pb-1">
                <span>{isEn ? 'REAL-TIME VARIABLE REGISTERS' : 'THANH GHI BIẾN THỜI GIAN THỰC'}</span>
                <span className="font-mono text-indigo-400">{isEn ? `Cycle ${loopCount}` : `Chu kỳ ${loopCount}`}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">{isEn ? 'Control variable (k)' : 'Biến điều khiển (k)'}</span>
                  <span className="font-mono text-lg font-black text-amber-400">
                    {currentK}
                  </span>
                </div>
                <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">{isEn ? 'Accumulated sum (S)' : 'Tổng tích luỹ (S)'}</span>
                  <span className="font-mono text-lg font-black text-emerald-400">
                    {accumS}
                  </span>
                </div>
              </div>

              {/* Condition Status Badge */}
              <div className={`mt-2 p-1.5 rounded-lg text-[11px] font-mono flex items-center gap-1.5 ${
                isInfiniteAlarm
                  ? 'bg-rose-950/90 text-rose-300 border border-rose-700 animate-pulse'
                  : isBreakTriggered
                  ? 'bg-amber-950/90 text-amber-300 border border-amber-700'
                  : isLoopHalted
                  ? 'bg-rose-950/90 text-rose-300 border border-rose-700'
                  : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
              }`}>
                {isInfiniteAlarm ? (
                  <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                ) : isBreakTriggered ? (
                  <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                ) : isLoopHalted ? (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                ) : (
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                <span>
                  {isInfiniteAlarm
                    ? (isEn ? 'WARNING: INFINITE LOOP (k > 0 is always True!)' : 'CẢNH BÁO: LẶP VÔ HẠN (k > 0 luôn Đúng!)')
                    : isBreakTriggered
                    ? (isEn ? 'BREAK STATEMENT: Exited immediately at k == 5' : 'LỆNH BREAK: Thoát ngay khi k == 5')
                    : isLoopHalted
                    ? (isEn ? 'Condition False -> Loop halted' : 'Điều kiện False -> Ngắt vòng lặp')
                    : (isEn ? 'Condition True -> Continue loop' : 'Điều kiện True -> Tiếp tục lặp')}
                </span>
              </div>
            </div>

            {/* Current Active Python Code Snippet */}
            <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 shadow-xl text-xs font-mono max-w-sm hidden md:block">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 font-sans font-bold">
                {isEn ? 'Corresponding Python snippet' : 'Mã nguồn thực thi tương ứng'}
              </div>
              {preset === 'hd1_sum' && (
                <pre className="text-slate-200">
                  <span className="text-amber-400">S</span> = 0; <span className="text-sky-400">k</span> = 1{'\n'}
                  <span className="text-indigo-400">while</span> <span className="text-emerald-400">k &lt; 100</span>:{'\n'}
                  {'    '}<span className="text-slate-400">S = S + k</span>{'\n'}
                  {'    '}<span className="text-amber-400">k = k + 7</span>{'\n'}
                  <span className="text-slate-500">{isEn ? '# Stops when k = 106, S = 750' : '# Dừng khi k = 106, S = 750'}</span>
                </pre>
              )}
              {preset === 'ex1_squares' && (
                <pre className="text-slate-200">
                  <span className="text-amber-400">S</span> = 0; <span className="text-sky-400">k</span> = 1{'\n'}
                  <span className="text-indigo-400">while</span> <span className="text-emerald-400">k*k &lt; 100</span>:{'\n'}
                  {'    '}<span className="text-slate-400">S = S + k*k</span>{'\n'}
                  {'    '}<span className="text-amber-400">k = k + 1</span>{'\n'}
                  <span className="text-slate-500">{isEn ? '# Sum 1² + 2² + ... + 9²' : '# Tổng 1² + 2² + ... + 9²'}</span>
                </pre>
              )}
              {preset === 'ex2_steps' && (
                <pre className="text-slate-200">
                  <span className="text-sky-400">k</span> = 2{'\n'}
                  <span className="text-indigo-400">while</span> <span className="text-emerald-400">k &lt; 50</span>:{'\n'}
                  {'    '}<span className="text-emerald-400">print</span>(k, end = <span className="text-amber-300">" "</span>){'\n'}
                  {'    '}<span className="text-amber-400">k = k + 3</span>
                </pre>
              )}
              {preset === 'break_demo' && (
                <pre className="text-slate-200">
                  <span className="text-indigo-400">for</span> k <span className="text-indigo-400">in</span> <span className="text-sky-400">range</span>(10):{'\n'}
                  {'    '}<span className="text-emerald-400">print</span>(k, end = <span className="text-amber-300">" "</span>){'\n'}
                  {'    '}<span className="text-indigo-400">if</span> k == 5:{'\n'}
                  {'        '}<span className="text-rose-400 font-bold">break</span>  <span className="text-slate-500">{isEn ? '# Exit now' : '# Thoát ngay'}</span>
                </pre>
              )}
              {preset === 'infinite_hazard' && (
                <pre className="text-rose-300 bg-rose-950/40 p-1.5 rounded">
                  <span className="text-sky-400">k</span> = 1{'\n'}
                  <span className="text-rose-400 font-bold">while k &gt; 0:</span>{'\n'}
                  {'    '}<span className="text-slate-300">print(k)</span>{'\n'}
                  {'    '}<span className="text-slate-500">{isEn ? '# Forgot k = k - 1! Infinite loop!' : '# Quên lệnh k = k - 1! Lặp mãi mãi!'}</span>
                </pre>
              )}
            </div>
          </div>
        )}

        {/* Infinite Loop Alarm Banner */}
        {activeMode === 'vortex' && isInfiniteAlarm && (
          <div className="absolute inset-x-4 bottom-4 mx-auto max-w-lg bg-rose-950/90 border border-rose-600 text-rose-200 p-3 rounded-xl shadow-2xl flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0 animate-bounce" />
            <div className="text-xs">
              <span className="font-bold text-sm block text-rose-300">
                {isEn ? 'HAZARDOUS TRAP: INFINITE LOOP (NOTE 1 TEXTBOOK P.109)' : 'BẪY NGUY HIỂM: LẶP VÔ HẠN (LƯU Ý 1 SGK TRANG 109)'}
              </span>
              {isEn
                ? 'Because the condition k > 0 is always true and no statement inside decreases k, the loop will run endlessly and freeze the program!'
                : 'Vì điều kiện k > 0 luôn đúng và trong thân vòng lặp không có lệnh làm giảm k, chương trình sẽ chạy vô tận và treo máy!'}
            </div>
          </div>
        )}
      </div>

      {/* Control Panels below 3D canvas */}
      <div className="p-3 sm:p-4 bg-slate-900 border-t border-slate-800">
        {activeMode === 'vortex' && (
          <div className="flex flex-col gap-3">
            {/* Presets Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                {isEn ? 'Lesson 21 Textbook Scenarios:' : 'Kịch bản SGK Bài 21:'}
              </span>
              <div className="flex flex-wrap gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => setPreset('hd1_sum')}
                  className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-all ${
                    preset === 'hd1_sum' ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {isEn ? 'Act 1: k < 100 (S=750)' : 'HĐ 1: k < 100 (S=750)'}
                </button>
                <button
                  type="button"
                  onClick={() => setPreset('ex1_squares')}
                  className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-all ${
                    preset === 'ex1_squares' ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {isEn ? 'Ex 1: k² < 100' : 'Ví dụ 1: k² < 100'}
                </button>
                <button
                  type="button"
                  onClick={() => setPreset('ex2_steps')}
                  className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-all ${
                    preset === 'ex2_steps' ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {isEn ? 'Ex 2: Step sequence of 3' : 'Ví dụ 2: Dãy bước 3'}
                </button>
                <button
                  type="button"
                  onClick={() => setPreset('break_demo')}
                  className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-all ${
                    preset === 'break_demo' ? 'bg-amber-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {isEn ? 'Note 2: break statement' : 'Lưu ý 2: Lệnh break'}
                </button>
                <button
                  type="button"
                  onClick={() => setPreset('infinite_hazard')}
                  className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-all ${
                    preset === 'infinite_hazard' ? 'bg-rose-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {isEn ? '⚠️ Infinite loop trap' : '⚠️ Bẫy lặp vô hạn'}
                </button>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlaying((v) => !v)}
                  disabled={isLoopHalted}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                    isLoopHalted
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : isPlaying
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
                  disabled={isLoopHalted || isPlaying}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all"
                  title={isEn ? 'Next loop step' : 'Bước lặp tiếp theo'}
                >
                  <SkipForward className="w-4 h-4 text-indigo-400" />
                  <span>{isEn ? 'Next Step' : 'Bước Tiếp'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleResetSimulation(preset)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer transition-all"
                  title={isEn ? 'Reset from beginning' : 'Đặt lại từ đầu'}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Speed Controller */}
              <div className="flex items-center gap-2 text-xs">
                <FastForward className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-400">{isEn ? 'Speed:' : 'Tốc độ:'}</span>
                <button
                  type="button"
                  onClick={() => setSpeed((s) => (s === 1 ? 2 : s === 2 ? 3 : 1))}
                  className="px-2.5 py-1 rounded bg-slate-800 text-indigo-300 font-mono font-bold hover:bg-slate-700 cursor-pointer"
                >
                  {speed}x
                </button>
              </div>
            </div>
          </div>
        )}

        {activeMode === 'structures' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-sky-400 uppercase tracking-wider block">
                {isEn ? '1. Sequential Structure' : '1. Cấu Trúc Tuần Tự'}
              </span>
              <p className="text-slate-400">
                {isEn
                  ? 'Statements execute sequentially from top to bottom continuously (variable assignment, input, print).'
                  : 'Các lệnh thực hiện tuần tự từ trên xuống dưới một cách liên tục (gán biến, input, print).'}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-amber-400 uppercase tracking-wider block">
                {isEn ? '2. Branching Structure' : '2. Cấu Trúc Rẽ Nhánh'}
              </span>
              <p className="text-slate-400">
                {isEn
                  ? 'Executes a block of statements depending on whether a condition is true or false (if, if-else statements).'
                  : 'Thực hiện khối lệnh phụ thuộc vào điều kiện đúng hay sai (câu lệnh if, if-else).'}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-violet-400 uppercase tracking-wider block">
                {isEn ? '3. Loop Structure' : '3. Cấu Trúc Lặp'}
              </span>
              <p className="text-slate-400">
                {isEn
                  ? 'Repeatedly executes a statement block (for loop with known iterations, while loop governed by conditions).'
                  : 'Thực hiện lặp đi lặp lại một khối lệnh (câu lệnh for với số lần biết trước, while theo điều kiện).'}
              </p>
            </div>
          </div>
        )}

        {activeMode === 'realworld' && (
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Water Bucket controls */}
            <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <Droplets className="w-4 h-4 text-sky-400" />
              <span className="text-slate-300 font-semibold">
                {isEn ? `Water Container (${bucketWater}/${maxCapacity} buckets):` : `Thùng nước (${bucketWater}/${maxCapacity} xô):`}
              </span>
              <button
                type="button"
                onClick={handlePourBucket}
                disabled={bucketWater >= maxCapacity}
                className="px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white font-bold cursor-pointer"
              >
                {bucketWater >= maxCapacity
                  ? (isEn ? 'Container Full (Halt)' : 'Đã đầy thùng (Dừng)')
                  : (isEn ? '+ Pour 1 bucket' : '+ Đổ 1 xô nước')}
              </button>
              <button
                type="button"
                onClick={handleDrainBucket}
                className="p-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
                title={isEn ? 'Drain container' : 'Đổ sạch thùng'}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* ASCII Matrix Step */}
            <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <Grid className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300 font-semibold">
                {isEn
                  ? `ASCII Table ('${String.fromCharCode(asciiIndex)}' - Code ${asciiIndex}):`
                  : `Bảng ASCII ('${String.fromCharCode(asciiIndex)}' - Mã ${asciiIndex}):`}
              </span>
              <button
                type="button"
                onClick={handleNextAscii}
                disabled={asciiIndex >= 90}
                className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold cursor-pointer"
              >
                {isEn ? '+ Print next character' : '+ In chữ tiếp theo'}
              </button>
              <button
                type="button"
                onClick={() => setAsciiIndex(65)}
                className="p-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
                title={isEn ? "Reset to 'A'" : "Khởi tạo lại 'A'"}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Predict - Simulate - Explain Integration */}
      <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800">
        <PredictSimulateExplain
          theme="dark"
          titleVi="Dự đoán vòng lặp while trước khi chạy"
          titleEn="Predict while-Loop Outcome Before Running"
          promptVi="Với kịch bản HĐ 1 (S = 0; k = 1; while k < 100: S = S + k; k = k + 7), sau khi vòng lặp kết thúc thì k bằng bao nhiêu?"
          promptEn="For Act 1 (S = 0; k = 1; while k < 100: S = S + k; k = k + 7), what is the value of k right after the loop terminates?"
          options={[
            { id: 'k99', labelVi: 'k = 99', labelEn: 'k = 99' },
            { id: 'k100', labelVi: 'k = 100', labelEn: 'k = 100' },
            { id: 'k106', labelVi: 'k = 106 (và S = 750)', labelEn: 'k = 106 (and S = 750)' },
            { id: 'k92', labelVi: 'k = 92', labelEn: 'k = 92' }
          ]}
          correctOptionId="k106"
          hasSimulationCompleted={loopCount > 0 || isLoopHalted}
          actualOutcomeVi={`Chu kỳ ${loopCount}: k = ${currentK}, S = ${accumS}`}
          actualOutcomeEn={`Cycle ${loopCount}: k = ${currentK}, S = ${accumS}`}
          explanationVi="Mỗi vòng tăng k thêm 7 (1, 8, 15, ..., 99). Khi k = 99 (< 100 đúng), chương trình cộng S rồi tăng k = 99 + 7 = 106. Lúc này điều kiện 106 < 100 sai nên vòng lặp mới dừng lại."
          explanationEn="Each step increments k by 7 (1, 8, ..., 99). When k = 99, it adds to S and updates k = 99 + 7 = 106. Now 106 < 100 is False so the loop halts."
          onRunDirectly={() => {
            setActiveMode('vortex');
            setPreset('hd1_sum');
            setIsPlaying(true);
          }}
        />
      </div>
    </div>
  );
};
