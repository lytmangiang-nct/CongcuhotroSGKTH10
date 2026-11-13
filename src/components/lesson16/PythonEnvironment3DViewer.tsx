import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  RotateCcw,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Box,
  Layers,
  Sparkles,
  Terminal,
  Cpu,
  Code2,
  FileCode,
  Info
} from 'lucide-react';
import { useBook } from '../../context/BookContext';

export const PythonEnvironment3DViewer: React.FC = () => {
  const { bilingualMode } = useBook();
  const mountRef = useRef<HTMLDivElement>(null);

  // Viewer modes:
  // 1: 3-Tier Language Pipeline (Figure 16.1: Machine code -> Assembly -> Python)
  // 2: Dual-Mode IDLE Workstation (Figure 16.2 Shell vs Figure 16.3 Editor)
  // 3: Dynamic Data Types & Memory Reactor (Pages 88-89: int, float, str, arithmetic)
  const [activeMode, setActiveMode] = useState<'tiers' | 'dual' | 'memory'>('tiers');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeInspector, setActiveInspector] = useState<string | null>(null);

  // Interactive controls
  const [compilationProgress, setCompilationProgress] = useState<number>(0.65);
  const [interactiveCommand, setInteractiveCommand] = useState<string>('print("Xin chào!")');
  const [runSignal, setRunSignal] = useState<number>(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 480;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1d);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 5, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(24, 24, 0x38bdf8, 0x1e293b);
    gridHelper.position.y = -2;
    scene.add(gridHelper);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(8, 14, 10);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const cyanPoint = new THREE.PointLight(0x06b6d4, 2, 18);
    cyanPoint.position.set(-6, 3, 2);
    scene.add(cyanPoint);

    const amberPoint = new THREE.PointLight(0xf59e0b, 2, 18);
    amberPoint.position.set(6, 3, 2);
    scene.add(amberPoint);

    // Root groups for each mode
    const tiersGroup = new THREE.Group();
    const dualGroup = new THREE.Group();
    const memoryGroup = new THREE.Group();
    scene.add(tiersGroup);
    scene.add(dualGroup);
    scene.add(memoryGroup);

    // ==========================================
    // 1. BUILD MODE 1: 3-TIER LANGUAGE HIERARCHY
    // ==========================================
    // Tier 1: Machine Language Binary Column (Left)
    const machineColGeo = new THREE.CylinderGeometry(1.4, 1.6, 3.8, 16);
    const machineColMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.4,
      metalness: 0.8,
      wireframe: wireframe
    });
    const machineCol = new THREE.Mesh(machineColGeo, machineColMat);
    machineCol.position.set(-5.5, 0, 0);
    tiersGroup.add(machineCol);

    // Binary rings around Machine column
    const binaryRings: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const ringGeo = new THREE.TorusGeometry(1.65, 0.05, 8, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(-5.5, -1.2 + i * 0.9, 0);
      ring.rotation.x = Math.PI / 2;
      tiersGroup.add(ring);
      binaryRings.push(ring);
    }

    // Tier 2: Assembly Language Column (Center)
    const asmColGeo = new THREE.BoxGeometry(2.4, 4.4, 2.4);
    const asmColMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.3,
      metalness: 0.7,
      wireframe: wireframe
    });
    const asmCol = new THREE.Mesh(asmColGeo, asmColMat);
    asmCol.position.set(0, 0.3, 0);
    tiersGroup.add(asmCol);

    // Tier 3: Python High-Level Column (Right) - Golden glowing pedestal
    const pyColGeo = new THREE.CylinderGeometry(1.6, 1.8, 5.0, 6);
    const pyColMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      roughness: 0.2,
      metalness: 0.5,
      wireframe: wireframe
    });
    const pyCol = new THREE.Mesh(pyColGeo, pyColMat);
    pyCol.position.set(5.5, 0.6, 0);
    tiersGroup.add(pyCol);

    // Python Logo Emblem atop Python pedestal (Blue & Yellow interlocking shapes)
    const pySnake1Geo = new THREE.TorusGeometry(0.8, 0.28, 16, 24, Math.PI * 1.3);
    const pySnake1Mat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.3 });
    const pySnake1 = new THREE.Mesh(pySnake1Geo, pySnake1Mat);
    pySnake1.position.set(5.5, 3.6, 0);
    pySnake1.rotation.z = Math.PI / 4;
    tiersGroup.add(pySnake1);

    const pySnake2Geo = new THREE.TorusGeometry(0.8, 0.28, 16, 24, Math.PI * 1.3);
    const pySnake2Mat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.3 });
    const pySnake2 = new THREE.Mesh(pySnake2Geo, pySnake2Mat);
    pySnake2.position.set(5.5, 3.6, 0);
    pySnake2.rotation.z = Math.PI + Math.PI / 4;
    tiersGroup.add(pySnake2);

    // Conduit Arc Bridge (representing Compiler / Interpreter translating high-level to machine)
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(5.5, 2.5, 0),
      new THREE.Vector3(2.5, 4.5, 1.5),
      new THREE.Vector3(0, 4.0, 2.0),
      new THREE.Vector3(-2.8, 4.2, 1.5),
      new THREE.Vector3(-5.5, 2.2, 0)
    ]);
    const conduitGeo = new THREE.TubeGeometry(curve, 32, 0.12, 8, false);
    const conduitMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.3,
      metalness: 0.9,
      emissive: 0x059669,
      emissiveIntensity: 0.4
    });
    const conduit = new THREE.Mesh(conduitGeo, conduitMat);
    tiersGroup.add(conduit);

    // Animated particles along compiler conduit
    const particleCount = 20;
    const particleGeo = new THREE.SphereGeometry(0.12, 8, 8);
    const particleMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
    const particles: THREE.Mesh[] = [];
    for (let i = 0; i < particleCount; i++) {
      const p = new THREE.Mesh(particleGeo, particleMat);
      tiersGroup.add(p);
      particles.push(p);
    }

    // ==========================================
    // 2. BUILD MODE 2: DUAL-MODE IDLE WORKSTATION
    // ==========================================
    // Central Workstation Desk
    const deskGeo = new THREE.BoxGeometry(10, 0.4, 5);
    const deskMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4, metalness: 0.6 });
    const desk = new THREE.Mesh(deskGeo, deskMat);
    desk.position.set(0, -1, 0);
    dualGroup.add(desk);

    // Monitor 1 (Left): Interactive Prompt IDLE Shell (>>>)
    const monFrameGeo = new THREE.BoxGeometry(4.2, 3.2, 0.2);
    const monFrameMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2 });
    const mon1Frame = new THREE.Mesh(monFrameGeo, monFrameMat);
    mon1Frame.position.set(-2.8, 1.4, 0);
    mon1Frame.rotation.y = 0.2;
    dualGroup.add(mon1Frame);

    const screen1Geo = new THREE.PlaneGeometry(3.9, 2.9);
    const screen1Mat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
    const screen1 = new THREE.Mesh(screen1Geo, screen1Mat);
    screen1.position.set(-2.8, 1.4, 0.11);
    screen1.rotation.y = 0.2;
    dualGroup.add(screen1);

    // Stand 1
    const stand1Geo = new THREE.CylinderGeometry(0.15, 0.25, 1.6);
    const stand1Mat = new THREE.MeshStandardMaterial({ color: 0x64748b });
    const stand1 = new THREE.Mesh(stand1Geo, stand1Mat);
    stand1.position.set(-2.8, -0.2, 0);
    dualGroup.add(stand1);

    // Monitor 2 (Right): Script Editor (Bai1.py)
    const mon2Frame = new THREE.Mesh(monFrameGeo, monFrameMat);
    mon2Frame.position.set(2.8, 1.4, 0);
    mon2Frame.rotation.y = -0.2;
    dualGroup.add(mon2Frame);

    const screen2Geo = new THREE.PlaneGeometry(3.9, 2.9);
    const screen2Mat = new THREE.MeshBasicMaterial({ color: 0x4f46e5 });
    const screen2 = new THREE.Mesh(screen2Geo, screen2Mat);
    screen2.position.set(2.8, 1.4, 0.11);
    screen2.rotation.y = -0.2;
    dualGroup.add(screen2);

    // Stand 2
    const stand2 = new THREE.Mesh(stand1Geo, stand1Mat);
    stand2.position.set(2.8, -0.2, 0);
    dualGroup.add(stand2);

    // Holographic Python prompt beacon
    const beaconGeo = new THREE.OctahedronGeometry(0.6, 0);
    const beaconMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      wireframe: true,
      emissive: 0x0284c7,
      emissiveIntensity: 0.8
    });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.set(-2.8, 3.4, 0);
    dualGroup.add(beacon);

    // Holographic F5 Run Rocket beacon
    const f5Geo = new THREE.ConeGeometry(0.5, 1.0, 6);
    const f5Mat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.6
    });
    const f5Beacon = new THREE.Mesh(f5Geo, f5Mat);
    f5Beacon.position.set(2.8, 3.4, 0);
    dualGroup.add(f5Beacon);

    // ==========================================
    // 3. BUILD MODE 3: DATA TYPES & MEMORY VAULT
    // ==========================================
    // Integer Vault (Left)
    const intBoxGeo = new THREE.BoxGeometry(2, 2, 2);
    const intBoxMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.6,
      roughness: 0.2,
      wireframe: wireframe
    });
    const intBox = new THREE.Mesh(intBoxGeo, intBoxMat);
    intBox.position.set(-4.5, 0.5, 0);
    memoryGroup.add(intBox);

    // Float Vault (Center) - Crystal Octahedron
    const floatGeo = new THREE.OctahedronGeometry(1.5, 0);
    const floatMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      metalness: 0.8,
      roughness: 0.1,
      wireframe: wireframe,
      transparent: true,
      opacity: 0.9
    });
    const floatMesh = new THREE.Mesh(floatGeo, floatMat);
    floatMesh.position.set(0, 0.8, 0);
    memoryGroup.add(floatMesh);

    // String Chain (Right) - Series of connected letter glyph cubes
    const strGroup = new THREE.Group();
    strGroup.position.set(4.5, 0.5, 0);
    memoryGroup.add(strGroup);

    const glyphBoxes: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const gBoxGeo = new THREE.BoxGeometry(0.7, 0.7, 0.7);
      const gBoxMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        metalness: 0.4,
        roughness: 0.3
      });
      const gBox = new THREE.Mesh(gBoxGeo, gBoxMat);
      gBox.position.set(-1.2 + i * 0.8, 0, 0);
      strGroup.add(gBox);
      glyphBoxes.push(gBox);
    }

    // Memory Bus Conduit connecting types
    const busGeo = new THREE.BoxGeometry(11, 0.15, 0.4);
    const busMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.9 });
    const bus = new THREE.Mesh(busGeo, busMat);
    bus.position.set(0, -1.2, 0);
    memoryGroup.add(bus);

    // Visibility toggling
    tiersGroup.visible = activeMode === 'tiers';
    dualGroup.visible = activeMode === 'dual';
    memoryGroup.visible = activeMode === 'memory';

    // Interactive Orbiting & Mouse Dragging
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.005;
      targetRotationX = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, targetRotationX));
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support
    let touchStartX = 0;
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - touchStartX;
        const deltaY = e.touches[0].clientY - touchStartY;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;

        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.005;
      }
    };
    domElement.addEventListener('touchstart', onTouchStart);
    domElement.addEventListener('touchmove', onTouchMove);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Auto rotation
      if (autoRotate && !isDragging) {
        targetRotationY += 0.004;
      }

      // Smooth camera damping
      scene.rotation.y += (targetRotationY - scene.rotation.y) * 0.08;
      scene.rotation.x += (targetRotationX - scene.rotation.x) * 0.08;

      // Animate Mode 1: Compiler particles along conduit
      if (activeMode === 'tiers') {
        particles.forEach((p, idx) => {
          const t = (elapsed * 0.25 + idx / particleCount) % 1;
          const pos = curve.getPoint(1 - t); // Flow from Python (right) to Machine code (left)
          p.position.copy(pos);
        });

        // Rotate Python logo snakes
        pySnake1.rotation.z += 0.01;
        pySnake2.rotation.z += 0.01;

        // Pulse binary rings
        binaryRings.forEach((r, idx) => {
          r.rotation.z += 0.01 * (idx % 2 === 0 ? 1 : -1);
        });
      }

      // Animate Mode 2: Workstation Beacons
      if (activeMode === 'dual') {
        beacon.rotation.y += 0.02;
        beacon.position.y = 3.4 + Math.sin(elapsed * 3) * 0.15;

        f5Beacon.rotation.y += 0.03;
        f5Beacon.position.y = 3.4 + Math.cos(elapsed * 3) * 0.15;
      }

      // Animate Mode 3: Memory Vault Objects
      if (activeMode === 'memory') {
        intBox.rotation.x += 0.01;
        intBox.rotation.y += 0.015;

        floatMesh.rotation.y += 0.02;
        floatMesh.rotation.z += 0.01;
        floatMesh.position.y = 0.8 + Math.sin(elapsed * 2) * 0.2;

        glyphBoxes.forEach((gb, idx) => {
          gb.rotation.y += 0.02;
          gb.position.y = Math.sin(elapsed * 3 + idx) * 0.15;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Window Resize Handling
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 480;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      domElement.removeEventListener('touchmove', onTouchMove);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Geometry and Material disposal
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, [activeMode, autoRotate, wireframe, runSignal]);

  const handleResetCamera = () => {
    setAutoRotate(true);
  };

  return (
    <div
      className={`relative w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[540px]'
      }`}
    >
      {/* 3D Canvas Mount Point */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Floating Control Bar */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-700/80 pointer-events-auto shadow-lg">
          <button
            onClick={() => setActiveMode('tiers')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeMode === 'tiers'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>{bilingualMode === 'en' ? '3 Language Tiers (Fig 16.1)' : '3 Cấp độ ngôn ngữ (H.16.1)'}</span>
          </button>

          <button
            onClick={() => setActiveMode('dual')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeMode === 'dual'
                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>{bilingualMode === 'en' ? 'IDLE Workstation (H.16.2–3)' : 'Môi trường IDLE (H.16.2–3)'}</span>
          </button>

          <button
            onClick={() => setActiveMode('memory')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeMode === 'memory'
                ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>{bilingualMode === 'en' ? 'Data Types & Memory' : 'Kiểu dữ liệu & Bộ nhớ'}</span>
          </button>
        </div>

        {/* Viewport Utilities */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-700/80 pointer-events-auto shadow-lg">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-2 rounded-xl text-xs font-bold transition-colors ${
              autoRotate ? 'text-blue-400 bg-blue-500/10' : 'text-slate-400 hover:text-white'
            }`}
            title={
              autoRotate
                ? bilingualMode === 'en'
                  ? 'Stop Auto-rotation'
                  : 'Dừng tự xoay'
                : bilingualMode === 'en'
                ? 'Enable Auto-rotation'
                : 'Bật tự xoay 3D'
            }
          >
            {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setWireframe(!wireframe)}
            className={`p-2 rounded-xl text-xs font-bold transition-colors ${
              wireframe ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400 hover:text-white'
            }`}
            title={bilingualMode === 'en' ? 'Toggle Wireframe' : 'Bật/Tắt khung lưới (Wireframe)'}
          >
            <Layers className="w-4 h-4" />
          </button>

          <button
            onClick={handleResetCamera}
            className="p-2 rounded-xl text-slate-400 hover:text-white transition-colors"
            title={bilingualMode === 'en' ? 'Reset Camera View' : 'Đặt lại góc nhìn'}
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl text-slate-400 hover:text-white transition-colors"
            title={
              isFullscreen
                ? bilingualMode === 'en'
                  ? 'Exit Fullscreen'
                  : 'Thu nhỏ'
                : bilingualMode === 'en'
                ? 'Fullscreen'
                : 'Toàn màn hình'
            }
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mode-specific Interactive HUD Overlay at Bottom */}
      <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
        {activeMode === 'tiers' && (
          <div className="p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-white max-w-2xl pointer-events-auto space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-blue-400 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>
                  {bilingualMode === 'en'
                    ? 'FIGURE 16.1: HIGH-LEVEL TO MACHINE CODE TRANSLATION PIPELINE'
                    : 'HÌNH 16.1: TIẾN TRÌNH DỊCH TỪ BẬC CAO SANG MÃ MÁY'}
                </span>
              </span>
              <span className="text-[11px] text-emerald-400 font-mono">
                {bilingualMode === 'en' ? 'Compiler Conduit Active' : 'Luồng chương trình dịch đang chạy'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[11px] pt-1 border-t border-slate-800 text-slate-300">
              <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <span className="font-bold text-blue-400 block mb-0.5">
                  {bilingualMode === 'en' ? '1. Machine Code' : '1. Ngôn ngữ máy'}
                </span>
                <span className="font-mono text-[10px] text-slate-400">
                  {bilingualMode === 'en' ? '01101101 (Binary 0-1)' : '01101101 (Nhị phân 0-1)'}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <span className="font-bold text-amber-400 block mb-0.5">
                  {bilingualMode === 'en' ? '2. Assembly' : '2. Hợp ngữ (Assembly)'}
                </span>
                <span className="font-mono text-[10px] text-slate-400">
                  {bilingualMode === 'en' ? 'LDA, STA, JMP (Mnemonics)' : 'LDA, STA, JMP (Gợi nhớ)'}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <span className="font-bold text-emerald-400 block mb-0.5">
                  {bilingualMode === 'en' ? '3. Python (High-level)' : '3. Python (Bậc cao)'}
                </span>
                <span className="font-mono text-[10px] text-slate-400">print(), for, input()</span>
              </div>
            </div>
          </div>
        )}

        {activeMode === 'dual' && (
          <div className="p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-white max-w-2xl pointer-events-auto space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>
                  {bilingualMode === 'en'
                    ? '2 PYTHON PROGRAMMING MODES (FIGURES 16.2 & 16.3)'
                    : '2 CHẾ ĐỘ LẬP TRÌNH PYTHON (HÌNH 16.2 & 16.3)'}
                </span>
              </span>
              <button
                onClick={() => setRunSignal((s) => s + 1)}
                className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>{bilingualMode === 'en' ? 'Press F5 (Run)' : 'Nhấn F5 (Chạy mã)'}</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-800/60">
                <span className="font-bold text-cyan-300 block mb-1">
                  {bilingualMode === 'en'
                    ? 'Left Screen: IDLE Shell (Interactive)'
                    : 'Màn hình trái: IDLE Shell (Trực tiếp)'}
                </span>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {bilingualMode === 'en'
                    ? 'Type commands right after the >>> prompt and press Enter for instant output.'
                    : 'Gõ lệnh ngay sau dấu nhắc >>> và Enter để nhận kết quả tức thì.'}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-800/60">
                <span className="font-bold text-indigo-300 block mb-1">
                  {bilingualMode === 'en'
                    ? 'Right Screen: Script Editor (Bai1.py)'
                    : 'Màn hình phải: Soạn thảo (Bai1.py)'}
                </span>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {bilingualMode === 'en'
                    ? 'Write multi-line code, save as a .py file, and press F5 to execute sequentially.'
                    : 'Viết nhiều dòng lệnh, lưu tệp .py rồi bấm F5 để thực thi tuần tự.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeMode === 'memory' && (
          <div className="p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-white max-w-2xl pointer-events-auto space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-2">
                <Box className="w-4 h-4 text-amber-400" />
                <span>
                  {bilingualMode === 'en'
                    ? 'PYTHON DATA TYPES & DYNAMIC MEMORY (PAGES 88–89)'
                    : 'QUẢN LÝ KIỂU DỮ LIỆU & BỘ NHỚ ĐỘNG PYTHON (TRANG 88–89)'}
                </span>
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Dynamic Typing</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs pt-1 border-t border-slate-800">
              <div className="p-2 rounded-xl bg-amber-950/30 border border-amber-800/50">
                <span className="font-bold text-amber-400 block mb-0.5">
                  {bilingualMode === 'en' ? 'Gold Cube: int' : 'Khối Vàng: int'}
                </span>
                <span className="text-[11px] text-slate-300 font-mono">
                  5, 12, 105 ({bilingualMode === 'en' ? 'Integer' : 'Số nguyên'})
                </span>
              </div>
              <div className="p-2 rounded-xl bg-cyan-950/30 border border-cyan-800/50">
                <span className="font-bold text-cyan-400 block mb-0.5">
                  {bilingualMode === 'en' ? 'Crystal: float' : 'Pha Lê: float'}
                </span>
                <span className="text-[11px] text-slate-300 font-mono">
                  2.6, 2.5, 22.0 ({bilingualMode === 'en' ? 'Float' : 'Số thực'})
                </span>
              </div>
              <div className="p-2 rounded-xl bg-emerald-950/30 border border-emerald-800/50">
                <span className="font-bold text-emerald-400 block mb-0.5">
                  {bilingualMode === 'en' ? 'Pearl Chain: str' : 'Chuỗi Hạt: str'}
                </span>
                <span className="text-[11px] text-slate-300 font-mono">
                  {bilingualMode === 'en' ? "'Hello!' (String)" : "'Xin chào!' (Xâu ký tự)"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
