import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useBook } from '../../context/BookContext';
import {
  Sparkles,
  RotateCcw,
  Maximize2,
  Play,
  Pause,
  Cpu,
  HardDrive,
  Monitor,
  Binary,
  Layers,
  ArrowRight,
  Database
} from 'lucide-react';

type CycleStage = 'all' | 'input' | 'cpu' | 'storage' | 'output';

interface StageDetails {
  titleVi: string;
  titleEn: string;
  subVi: string;
  subEn: string;
  descVi: string;
  descEn: string;
  color: string;
}

const STAGE_DATA: Record<CycleStage, StageDetails> = {
  all: {
    titleVi: 'Toàn bộ Chu trình Xử lý Thông tin 4 Bước',
    titleEn: 'Complete 4-Step Information Processing Cycle',
    subVi: 'Dữ liệu thô (Input) → Xử lý logic (CPU) → Lưu trữ (Memory) → Kết quả hữu ích (Output)',
    subEn: 'Raw Data (Input) → Logic Compute (CPU) → Storage (Memory) → Useful Insights (Output)',
    descVi: 'Máy tính là công cụ tự động hóa quá trình xử lý thông tin: tiếp nhận dữ liệu từ thế giới thực, biến đổi theo thuật toán và tạo ra thông tin có ý nghĩa cho con người.',
    descEn: 'Computers automate the information processing pipeline: ingesting real-world data, transforming it via algorithms, and producing actionable knowledge for humans.',
    color: '#6366f1'
  },
  input: {
    titleVi: 'Bước 1: Thu nhận Dữ liệu (Input & Sensing)',
    titleEn: 'Step 1: Data Acquisition (Input & Sensing)',
    subVi: 'Bàn phím, chuột, camera, máy quét, microphone & cảm biến',
    subEn: 'Keyboards, mice, cameras, scanners, microphones & sensors',
    descVi: 'Chuyển đổi tín hiệu vật lý ngoài đời thực (âm thanh, ánh sáng, nhiệt độ, thao tác gõ phím) thành các dãy bit nhị phân (0 và 1) đưa vào máy tính.',
    descEn: 'Converts real-world physical phenomena (audio, light, temperature, keystrokes) into binary bitstreams (0s and 1s) for the computer.',
    color: '#06b6d4'
  },
  cpu: {
    titleVi: 'Bước 2: Xử lý Dữ liệu (Processing Unit / CPU)',
    titleEn: 'Step 2: Data Computation (Central Processing Unit)',
    subVi: 'Khối số học logic (ALU) & Khối điều khiển (CU)',
    subEn: 'Arithmetic Logic Unit (ALU) & Control Unit (CU)',
    descVi: 'Thực hiện hàng tỷ phép tính số học và so sánh logic mỗi giây dựa trên các câu lệnh của chương trình nhằm biến dữ liệu rời rạc thành thông tin có cấu trúc.',
    descEn: 'Executes billions of arithmetic and logical operations per second driven by program instructions, transforming disjointed data into structured information.',
    color: '#10b981'
  },
  storage: {
    titleVi: 'Bước 3: Lưu trữ Dữ liệu (Storage & Memory)',
    titleEn: 'Step 3: Data Storage & Memory Hierarchy',
    subVi: 'Bộ nhớ trong (RAM/ROM) và Bộ nhớ ngoài (SSD/HDD/Cloud)',
    subEn: 'Primary Storage (RAM/ROM) & Secondary Storage (SSD/HDD/Cloud)',
    descVi: 'Ghi nhớ dữ liệu tức thời để CPU truy xuất với tốc độ cực cao (RAM) hoặc lưu trữ vĩnh viễn trên ổ đĩa SSD/HDD để sử dụng lâu dài sau khi tắt máy.',
    descEn: 'Stores immediate data for ultra-low latency CPU retrieval (RAM) or permanently retains it on SSD/HDD flash arrays across power cycles.',
    color: '#f59e0b'
  },
  output: {
    titleVi: 'Bước 4: Xuất Thông tin (Output & Visualization)',
    titleEn: 'Step 4: Information Output & Visualization',
    subVi: 'Màn hình hiển thị, máy in, loa âm thanh & thiết bị điều khiển',
    subEn: 'Monitors, printers, speakers & automated actuators',
    descVi: 'Chuyển đổi thông tin nhị phân đã xử lý thành dạng mà con người có thể hiểu được (văn bản, đồ thị, hình ảnh, âm thanh) hoặc lệnh điều khiển cơ cấu chấp hành.',
    descEn: 'Renders processed binary data back into human-understandable formats (text, charts, visuals, audio) or actuation signals for physical robotics.',
    color: '#ec4899'
  }
};

export const ComputingCycle3DViewer: React.FC = () => {
  const { bilingualMode } = useBook();
  const mountRef = useRef<HTMLDivElement>(null);

  const [activeStage, setActiveStage] = useState<CycleStage>('all');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [autoRotate, setAutoRotate] = useState<boolean>(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const particlesRef = useRef<THREE.InstancedMesh | null>(null);
  const stageHighlightsRef = useRef<Record<string, THREE.Mesh>>({});

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 450;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfcfdff);
    scene.fog = new THREE.FogExp2(0xfcfdff, 0.025);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 5.2, 7.2);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    rendererRef.current = renderer;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3;
    controls.maxDistance = 14;
    controls.maxPolarAngle = Math.PI / 2 + 0.05;
    controls.target.set(0, 0.3, 0);
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 10, 6);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xe0e7ff, 0.8);
    fillLight.position.set(-5, 4, -5);
    scene.add(fillLight);

    // Grid Floor
    const grid = new THREE.GridHelper(16, 32, 0xc7d2fe, 0xe2e8f0);
    grid.position.y = -0.01;
    scene.add(grid);

    // Motherboard Main PCB Platform
    const pcbGeo = new THREE.BoxGeometry(8.2, 0.12, 3.8);
    const pcbMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.6,
      roughness: 0.35
    });
    const pcb = new THREE.Mesh(pcbGeo, pcbMat);
    pcb.position.y = 0.06;
    pcb.receiveShadow = true;
    scene.add(pcb);

    // Motherboard Circuit Traces (Gold / Cyan Lines)
    const traceGeo = new THREE.PlaneGeometry(7.8, 3.4);
    traceGeo.rotateX(-Math.PI / 2);
    const traceMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const traces = new THREE.Mesh(traceGeo, traceMat);
    traces.position.y = 0.125;
    scene.add(traces);

    // -------------------------------------------------------------------------
    // PROCEDURAL HARDWARE BLOCKS (4 STAGES)
    // -------------------------------------------------------------------------

    // A. STAGE 1: INPUT UNIT (X = -2.8)
    const inputGroup = new THREE.Group();
    inputGroup.position.set(-2.8, 0.12, 0);

    // Keyboard chassis
    const kbChassisGeo = new THREE.BoxGeometry(1.6, 0.14, 1.4);
    const kbChassisMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4 });
    const kbChassis = new THREE.Mesh(kbChassisGeo, kbChassisMat);
    kbChassis.position.y = 0.07;
    kbChassis.castShadow = true;
    inputGroup.add(kbChassis);

    // Keys grid
    const keyGeo = new THREE.BoxGeometry(0.18, 0.08, 0.18);
    const keyMat = new THREE.MeshStandardMaterial({ color: 0x0ea5e9, roughness: 0.2 });
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 5; c++) {
        const k = new THREE.Mesh(keyGeo, keyMat);
        k.position.set(-0.48 + c * 0.24, 0.16, -0.36 + r * 0.24);
        inputGroup.add(k);
      }
    }

    // Input sensor dome
    const sensorDomeGeo = new THREE.SphereGeometry(0.2, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const sensorDomeMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.7
    });
    const sensorDome = new THREE.Mesh(sensorDomeGeo, sensorDomeMat);
    sensorDome.position.set(0.5, 0.14, 0);
    inputGroup.add(sensorDome);

    // Stage 1 Highlight ring
    const ring1Geo = new THREE.RingGeometry(1.0, 1.1, 32);
    ring1Geo.rotateX(-Math.PI / 2);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, side: THREE.DoubleSide });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.position.y = 0.13;
    inputGroup.add(ring1);
    stageHighlightsRef.current['input'] = ring1;

    scene.add(inputGroup);

    // B. STAGE 2: CPU PROCESSOR (X = -0.9)
    const cpuGroup = new THREE.Group();
    cpuGroup.position.set(-0.9, 0.12, 0);

    // CPU Socket
    const socketGeo = new THREE.BoxGeometry(1.4, 0.08, 1.4);
    const socketMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
    const socket = new THREE.Mesh(socketGeo, socketMat);
    socket.position.y = 0.04;
    socket.castShadow = true;
    cpuGroup.add(socket);

    // Silicon Substrate
    const subGeo = new THREE.BoxGeometry(1.15, 0.05, 1.15);
    const subMat = new THREE.MeshStandardMaterial({ color: 0x047857, roughness: 0.3 });
    const sub = new THREE.Mesh(subGeo, subMat);
    sub.position.y = 0.1;
    cpuGroup.add(sub);

    // Copper Heat Spreader (IHS)
    const ihsGeo = new THREE.BoxGeometry(0.9, 0.12, 0.9);
    const ihsMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.85,
      roughness: 0.2
    });
    const ihs = new THREE.Mesh(ihsGeo, ihsMat);
    ihs.position.y = 0.18;
    ihs.castShadow = true;
    cpuGroup.add(ihs);

    // Glowing Logic Core Hologram
    const coreHoloGeo = new THREE.BoxGeometry(0.5, 0.02, 0.5);
    const coreHoloMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x10b981,
      emissiveIntensity: 1.2
    });
    const coreHolo = new THREE.Mesh(coreHoloGeo, coreHoloMat);
    coreHolo.position.y = 0.25;
    cpuGroup.add(coreHolo);

    // Stage 2 Highlight ring
    const ring2Geo = new THREE.RingGeometry(0.95, 1.05, 32);
    ring2Geo.rotateX(-Math.PI / 2);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.position.y = 0.13;
    cpuGroup.add(ring2);
    stageHighlightsRef.current['cpu'] = ring2;

    scene.add(cpuGroup);

    // C. STAGE 3: MEMORY & STORAGE (X = 0.9)
    const storageGroup = new THREE.Group();
    storageGroup.position.set(0.9, 0.12, 0);

    // Dual RAM Sticks
    const ramPcbGeo = new THREE.BoxGeometry(0.1, 0.7, 1.4);
    const ramMat = new THREE.MeshStandardMaterial({
      color: 0x4338ca,
      metalness: 0.6,
      roughness: 0.3
    });
    [-0.25, 0.25].forEach((rx) => {
      const ramStick = new THREE.Mesh(ramPcbGeo, ramMat);
      ramStick.position.set(rx, 0.35, 0);
      ramStick.castShadow = true;
      storageGroup.add(ramStick);

      // Gold fingers
      const goldFingersGeo = new THREE.BoxGeometry(0.12, 0.08, 1.3);
      const goldMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9 });
      const gold = new THREE.Mesh(goldFingersGeo, goldMat);
      gold.position.set(rx, 0.06, 0);
      storageGroup.add(gold);
    });

    // NVMe SSD Platter Cylinder in between
    const ssdPlatterGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.25, 24);
    const ssdMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0xb45309,
      emissiveIntensity: 0.5
    });
    const ssdPlatter = new THREE.Mesh(ssdPlatterGeo, ssdMat);
    ssdPlatter.position.set(0, 0.2, 0);
    storageGroup.add(ssdPlatter);

    // Stage 3 Highlight ring
    const ring3Geo = new THREE.RingGeometry(0.95, 1.05, 32);
    ring3Geo.rotateX(-Math.PI / 2);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, side: THREE.DoubleSide });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.position.y = 0.13;
    storageGroup.add(ring3);
    stageHighlightsRef.current['storage'] = ring3;

    scene.add(storageGroup);

    // D. STAGE 4: OUTPUT DISPLAY UNIT (X = 2.8)
    const outputGroup = new THREE.Group();
    outputGroup.position.set(2.8, 0.12, 0);

    // Monitor stand
    const standBaseGeo = new THREE.BoxGeometry(0.8, 0.06, 0.6);
    const standMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.3 });
    const standBase = new THREE.Mesh(standBaseGeo, standMat);
    standBase.position.y = 0.03;
    outputGroup.add(standBase);

    const standPoleGeo = new THREE.BoxGeometry(0.12, 0.8, 0.1);
    const standPole = new THREE.Mesh(standPoleGeo, standMat);
    standPole.position.set(0, 0.45, -0.15);
    outputGroup.add(standPole);

    // Screen bezel & Display
    const bezelGeo = new THREE.BoxGeometry(1.6, 1.1, 0.08);
    const bezel = new THREE.Mesh(bezelGeo, standMat);
    bezel.position.set(0, 0.95, 0);
    bezel.castShadow = true;
    outputGroup.add(bezel);

    // Screen Glass showing colorful analytics visualization
    const screenGeo = new THREE.PlaneGeometry(1.48, 0.98);
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      emissive: 0xdb2777,
      emissiveIntensity: 0.8,
      roughness: 0.1
    });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.set(0, 0.95, 0.045);
    outputGroup.add(screen);

    // Chart hologram bars
    for (let b = 0; b < 4; b++) {
      const barGeo = new THREE.BoxGeometry(0.18, 0.2 + b * 0.12, 0.04);
      const barMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 0.8
      });
      const bar = new THREE.Mesh(barGeo, barMat);
      bar.position.set(-0.4 + b * 0.26, 0.8 + (0.2 + b * 0.12) / 2, 0.08);
      outputGroup.add(bar);
    }

    // Stage 4 Highlight ring
    const ring4Geo = new THREE.RingGeometry(1.0, 1.1, 32);
    ring4Geo.rotateX(-Math.PI / 2);
    const ring4Mat = new THREE.MeshBasicMaterial({ color: 0xec4899, side: THREE.DoubleSide });
    const ring4 = new THREE.Mesh(ring4Geo, ring4Mat);
    ring4.position.y = 0.13;
    outputGroup.add(ring4);
    stageHighlightsRef.current['output'] = ring4;

    scene.add(outputGroup);

    // -------------------------------------------------------------------------
    // ANIMATED DATA HIGHWAY PARTICLES (Flowing -3.0 to +3.0)
    // -------------------------------------------------------------------------
    const particleCount = 48;
    const particleGeo = new THREE.BoxGeometry(0.07, 0.07, 0.07);
    const particleMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const instancedParticles = new THREE.InstancedMesh(particleGeo, particleMat, particleCount);
    const dummy = new THREE.Object3D();

    const particlePositions: { x: number; y: number; z: number; speed: number }[] = [];
    for (let i = 0; i < particleCount; i++) {
      particlePositions.push({
        x: -3.2 + (i / particleCount) * 6.4,
        y: 0.2 + Math.sin(i) * 0.05,
        z: (Math.random() - 0.5) * 0.6,
        speed: 1.2 + Math.random() * 0.6
      });
    }

    scene.add(instancedParticles);
    particlesRef.current = instancedParticles;

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h, false);
        }
      }
    });
    resizeObserver.observe(container);

    const clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (autoRotate) {
        scene.rotation.y += 0.005;
      }

      // Animate flowing binary particles along the pipeline
      if (isPlaying && instancedParticles) {
        for (let i = 0; i < particleCount; i++) {
          const p = particlePositions[i];
          p.x += delta * p.speed;
          if (p.x > 3.2) {
            p.x = -3.2;
          }
          dummy.position.set(p.x, p.y + Math.sin(elapsed * 4 + i) * 0.03, p.z);
          dummy.rotation.x = elapsed * 2 + i;
          dummy.rotation.y = elapsed * 3;
          dummy.scale.setScalar(0.8 + Math.sin(elapsed * 5 + i) * 0.2);
          dummy.updateMatrix();
          instancedParticles.setMatrixAt(i, dummy.matrix);
        }
        instancedParticles.instanceMatrix.needsUpdate = true;
      }

      // Pulsing highlight rings
      Object.entries(stageHighlightsRef.current).forEach(([k, ringMesh]) => {
        const isCurrentActive = activeStage === 'all' || activeStage === k;
        ringMesh.visible = isCurrentActive;
        if (isCurrentActive) {
          const s = 1 + Math.sin(elapsed * 3) * 0.05;
          ringMesh.scale.set(s, s, s);
        }
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Center camera on chosen stage
  useEffect(() => {
    if (!controlsRef.current) return;
    const controls = controlsRef.current;

    if (activeStage === 'input') {
      controls.target.set(-2.8, 0.4, 0);
    } else if (activeStage === 'cpu') {
      controls.target.set(-0.9, 0.4, 0);
    } else if (activeStage === 'storage') {
      controls.target.set(0.9, 0.4, 0);
    } else if (activeStage === 'output') {
      controls.target.set(2.8, 0.6, 0);
    } else {
      controls.target.set(0, 0.3, 0);
    }
  }, [activeStage]);

  const currentInfo = STAGE_DATA[activeStage];

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden my-6">
      {/* Top Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-slate-50/80 via-white to-slate-50/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 shadow-2xs">
            <Binary className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-100 text-cyan-800">
                {bilingualMode === 'en' ? 'Interactive 3D Simulation' : 'Mô hình 3D Chu trình Tin học'}
              </span>
              <span className="text-xs text-slate-400 font-medium">Three.js Pipeline</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
              {bilingualMode === 'en'
                ? 'Information Processing Pipeline & Hardware Architecture'
                : 'Chu trình Xử lý Thông tin & Kiến trúc Phần cứng Máy tính'}
            </h3>
          </div>
        </div>

        {/* Step Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80 overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setActiveStage('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeStage === 'all'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{bilingualMode === 'en' ? 'All Steps' : 'Toàn bộ 4 Bước'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveStage('input')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeStage === 'input'
                ? 'bg-white text-cyan-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-500" />
            <span>1. {bilingualMode === 'en' ? 'Input' : 'Thu nhận'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveStage('cpu')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeStage === 'cpu'
                ? 'bg-white text-emerald-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>2. {bilingualMode === 'en' ? 'CPU' : 'Xử lý (CPU)'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveStage('storage')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeStage === 'storage'
                ? 'bg-white text-amber-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>3. {bilingualMode === 'en' ? 'Storage' : 'Lưu trữ'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveStage('output')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeStage === 'output'
                ? 'bg-white text-pink-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-pink-500" />
            <span>4. {bilingualMode === 'en' ? 'Output' : 'Xuất thông tin'}</span>
          </button>
        </div>
      </div>

      {/* Main 3D Canvas */}
      <div className="relative w-full h-[390px] sm:h-[460px] bg-gradient-to-b from-[#fcfdff] via-white to-slate-50 cursor-grab active:cursor-grabbing select-none overflow-hidden">
        <div ref={mountRef} className="w-full h-full" />

        {/* Floating Top Controls */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          {/* Play/Pause Data Flow */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 shadow-xs border cursor-pointer ${
              isPlaying
                ? 'bg-cyan-600 text-white border-cyan-500'
                : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white'
            }`}
            title="Tạm dừng / Chạy luồng dữ liệu hạt nhị phân"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">
              {isPlaying ? (bilingualMode === 'en' ? 'Data Flowing' : 'Luồng dữ liệu') : (bilingualMode === 'en' ? 'Paused' : 'Tạm dừng')}
            </span>
          </button>

          {/* Auto Rotate */}
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all shadow-xs border cursor-pointer ${
              autoRotate
                ? 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white'
            }`}
            title="Tự động xoay"
          >
            <RotateCcw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} />
          </button>

          {/* Reset Camera */}
          <button
            type="button"
            onClick={() => {
              if (controlsRef.current) {
                controlsRef.current.reset();
                controlsRef.current.target.set(0, 0.3, 0);
              }
              setActiveStage('all');
            }}
            className="p-1.5 rounded-xl bg-white/90 text-slate-700 border border-slate-200 hover:bg-white backdrop-blur-md shadow-xs transition-all cursor-pointer"
            title="Đặt lại toàn cảnh"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Hardware Pipeline Breadcrumb */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-2.5 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-md overflow-x-auto text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-lg bg-cyan-100 text-cyan-800 font-bold">1. Input</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 font-bold">2. CPU</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="px-2 py-0.5 rounded-lg bg-amber-100 text-amber-800 font-bold">3. Memory</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="px-2 py-0.5 rounded-lg bg-pink-100 text-pink-800 font-bold">4. Output</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-slate-500 font-medium">
            <Binary className="w-3.5 h-3.5 text-cyan-600" />
            <span>{bilingualMode === 'en' ? 'Binary stream (bits 0 & 1)' : 'Dãy bit nhị phân (0 và 1)'}</span>
          </div>
        </div>
      </div>

      {/* Explanatory Details */}
      <div className="p-5 bg-white border-t border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-1.5">
            <h4 className="text-sm sm:text-base font-bold text-slate-900">
              {bilingualMode === 'en' ? currentInfo.titleEn : currentInfo.titleVi}
            </h4>
            <div className="text-xs font-semibold text-indigo-600">
              {bilingualMode === 'en' ? currentInfo.subEn : currentInfo.subVi}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
              {bilingualMode === 'en' ? currentInfo.descEn : currentInfo.descVi}
            </p>
          </div>

          <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-200/70 flex flex-col justify-center">
            <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1">
              {bilingualMode === 'en' ? 'Core Exam Fact' : 'Ghi nhớ trọng tâm'}
            </div>
            <p className="text-xs font-medium text-slate-700">
              {bilingualMode === 'en'
                ? 'Information is the meaningful result gained from processing raw data through compute and logic.'
                : 'Thông tin là ý nghĩa được rút ra sau khi dữ liệu thô được tiếp nhận và xử lý qua các phép toán logic.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
