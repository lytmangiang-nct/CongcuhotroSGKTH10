import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useBook } from '../../context/BookContext';
import {
  AlertTriangle,
  Bug,
  ShieldAlert,
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  Activity,
  CheckCircle2,
  XCircle,
  Info
} from 'lucide-react';

interface ErrorLabProps {
  initialMode?: 'pillars' | 'radar' | 'defense';
}

export const Error3DLab: React.FC<ErrorLabProps> = ({ initialMode = 'pillars' }) => {
  const { bilingualMode } = useBook();
  const isVi = bilingualMode !== 'en';

  const mountRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<'pillars' | 'radar' | 'defense'>(initialMode);
  const [selectedException, setSelectedException] = useState<number>(0);
  const [pipelineState, setPipelineState] = useState<'idle' | 'running' | 'syntax_fail' | 'val_fail' | 'zero_fail' | 'success'>('idle');

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modeGroupRef = useRef<THREE.Group | null>(null);
  const animFrameId = useRef<number | null>(null);

  const exceptionsList = [
    {
      name: 'ZeroDivisionError',
      color: 0xef4444,
      descVi: 'Phép chia hoặc lấy phần dư cho 0 (10 / 0, a % 0).',
      descEn: 'Division or modulo by zero (10 / 0, a % 0).',
      snippet: 'x = 10 / 0\n# ZeroDivisionError: division by zero'
    },
    {
      name: 'IndexError',
      color: 0xf97316,
      descVi: 'Chỉ số danh sách ngoài phạm vi (A[10] khi danh sách chỉ có len=4).',
      descEn: 'List index out of range (A[10] when list len=4).',
      snippet: 'A = [1, 2, 3]\nprint(A[5]) # IndexError: list index out of range'
    },
    {
      name: 'NameError',
      color: 0xa855f7,
      descVi: 'Tên biến hoặc hàm chưa từng được gán giá trị hay định nghĩa.',
      descEn: 'Variable or function name has not been bound or defined.',
      snippet: 'print(diem_so)\n# NameError: name \'diem_so\' is not defined'
    },
    {
      name: 'TypeError',
      color: 0x3b82f6,
      descVi: 'Toán tử hoặc hàm áp dụng cho kiểu dữ liệu không phù hợp (chuỗi + số, A[1.5]).',
      descEn: 'Operation applied to inappropriate data type (str + int, A[1.5]).',
      snippet: 's = "Tuổi: " + 16\n# TypeError: can only concatenate str (not "int") to str'
    },
    {
      name: 'ValueError',
      color: 0xeab308,
      descVi: 'Giá trị đối số không hợp lệ để chuyển đổi (ví dụ: int("1.5"), int("abc")).',
      descEn: 'Inappropriate argument value for conversion (e.g. int("1.5"), int("abc")).',
      snippet: 'n = int("1.55")\n# ValueError: invalid literal for int() with base 10'
    },
    {
      name: 'IndentationError',
      color: 0xec4899,
      descVi: 'Thụt lề khối lệnh sai quy tắc hoặc không thẳng hàng (phát hiện khi phân tích cú pháp).',
      descEn: 'Misaligned or missing indentation level (caught at parse stage).',
      snippet: 'if True:\nprint("Hello") # IndentationError: expected an indented block'
    },
    {
      name: 'SyntaxError',
      color: 0xd946ef,
      descVi: 'Sai quy tắc ngữ pháp của ngôn ngữ (quên dấu :, sai từ khoá; trình thông dịch dừng trước khi chạy).',
      descEn: 'Grammatical language syntax violation (missing colon, keyword typo; halts before run).',
      snippet: 'while True print("Hi")\n# SyntaxError: invalid syntax'
    }
  ];

  // Rebuild mode meshes without destroying WebGL context
  const rebuildModeGroup = useCallback(() => {
    const modeGroup = modeGroupRef.current;
    if (!modeGroup) return;

    // Clear old meshes
    while (modeGroup.children.length > 0) {
      const obj = modeGroup.children[0];
      modeGroup.remove(obj);
      if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
      if ((obj as THREE.Mesh).material) {
        const mat = (obj as THREE.Mesh).material;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat.dispose();
      }
    }

    if (activeMode === 'pillars') {
      // 3 Pillars representing the 3 main error types:
      // Pillar 1: Syntax Error (Red Wall)
      const wallGeo = new THREE.BoxGeometry(3, 4.5, 0.8);
      const wallMat = new THREE.MeshStandardMaterial({
        color: 0xef4444,
        roughness: 0.3,
        metalness: 0.7,
        emissive: 0x7f1d1d,
        emissiveIntensity: 0.4
      });
      const wall = new THREE.Mesh(wallGeo, wallMat);
      wall.position.set(-6, 0.25, 0);
      modeGroup.add(wall);

      // Warning sign atop wall
      const coneGeo = new THREE.ConeGeometry(0.8, 1.2, 4);
      const coneMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, wireframe: true });
      const cone = new THREE.Mesh(coneGeo, coneMat);
      cone.position.set(-6, 3.2, 0);
      cone.rotation.y = Math.PI / 4;
      modeGroup.add(cone);

      // Pillar 2: Runtime Exception (Yellow Pit & Hazard Ring)
      const pitGeo = new THREE.CylinderGeometry(2, 2.4, 3, 16, 1, true);
      const pitMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        wireframe: true,
        emissive: 0xb45309,
        emissiveIntensity: 0.5
      });
      const pit = new THREE.Mesh(pitGeo, pitMat);
      pit.position.set(0, -0.5, 0);
      modeGroup.add(pit);

      // Floating core inside pit
      const coreGeo = new THREE.OctahedronGeometry(1.1);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0xfbbf24,
        roughness: 0.2,
        metalness: 0.8,
        emissive: 0xd97706,
        emissiveIntensity: 0.7
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      core.position.set(0, 0.5, 0);
      core.name = 'runtimeCore';
      modeGroup.add(core);

      // Pillar 3: Logic Error Mirage (Purple floating crystal pyramid)
      const logicGeo = new THREE.TetrahedronGeometry(1.8);
      const logicMat = new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        roughness: 0.1,
        metalness: 0.9,
        emissive: 0x6b21a8,
        emissiveIntensity: 0.6
      });
      const logicMesh = new THREE.Mesh(logicGeo, logicMat);
      logicMesh.position.set(6, 0.5, 0);
      logicMesh.name = 'logicCrystal';
      modeGroup.add(logicMesh);

      // Orbiting rings around mirage
      const ringGeo = new THREE.TorusGeometry(2.3, 0.06, 8, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xc084fc });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(6, 0.5, 0);
      ring.rotation.x = Math.PI / 3;
      ring.name = 'logicRing';
      modeGroup.add(ring);

      // Particle execution line traversing towards pillars
      const pCount = 80;
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        pPos[i * 3] = (Math.random() - 0.5) * 16;
        pPos[i * 3 + 1] = Math.random() * 2 - 1;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.12 });
      const pSystem = new THREE.Points(pGeo, pMat);
      pSystem.name = 'particles';
      modeGroup.add(pSystem);
    } else if (activeMode === 'radar') {
      // 7 Diagnostic Prisms in a circular ring
      const numPrisms = 7;
      const radius = 6.5;
      const curSelected = selectedException;

      for (let i = 0; i < numPrisms; i++) {
        const angle = (i / numPrisms) * Math.PI * 2;
        const px = Math.cos(angle) * radius;
        const pz = Math.sin(angle) * radius;

        const isSel = i === curSelected;
        const item = exceptionsList[i];

        const prismGeo = new THREE.CylinderGeometry(0.5, 0.7, 2.2, 6);
        const prismMat = new THREE.MeshStandardMaterial({
          color: item.color,
          roughness: 0.2,
          metalness: 0.8,
          emissive: item.color,
          emissiveIntensity: isSel ? 0.95 : 0.25
        });
        const prism = new THREE.Mesh(prismGeo, prismMat);
        prism.position.set(px, isSel ? 0.4 : 0, pz);
        prism.name = `prism_${i}`;
        modeGroup.add(prism);

        // Ground halo under each prism
        const haloGeo = new THREE.RingGeometry(0.8, 1.25, 16);
        const haloMat = new THREE.MeshBasicMaterial({
          color: item.color,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: isSel ? 0.85 : 0.2
        });
        const halo = new THREE.Mesh(haloGeo, haloMat);
        halo.position.set(px, -1.9, pz);
        halo.rotation.x = -Math.PI / 2;
        modeGroup.add(halo);
      }

      // Center Hub: Radar Core (takes color of currently selected exception)
      const hubGeo = new THREE.SphereGeometry(1.6, 24, 24);
      const hubMat = new THREE.MeshStandardMaterial({
        color: exceptionsList[curSelected].color,
        roughness: 0.1,
        metalness: 0.9,
        wireframe: true,
        emissive: exceptionsList[curSelected].color,
        emissiveIntensity: 0.5
      });
      const hub = new THREE.Mesh(hubGeo, hubMat);
      hub.position.set(0, 0.5, 0);
      hub.name = 'radarHub';
      modeGroup.add(hub);

      // Radar scanning beam
      const beamGeo = new THREE.ConeGeometry(radius, 0.1, 32, 1, true, 0, Math.PI / 4);
      const beamMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set(0, -1.8, 0);
      beam.rotation.x = -Math.PI / 2;
      beam.name = 'scannerBeam';
      modeGroup.add(beam);
    } else {
      // Mode: Defense Pipeline
      // 5 Pipeline Gates: Input (0) -> Syntax Gate (1) -> Type/Value Gate (2) -> Zero/Bounds Gate (3) -> Output (4)
      const gates = [
        { x: -7, name: 'Input', color: 0x64748b },
        { x: -3.5, name: 'Syntax', color: 0xef4444 },
        { x: 0, name: 'Type/Value', color: 0xeab308 },
        { x: 3.5, name: 'Zero/Bounds', color: 0x3b82f6 },
        { x: 7, name: 'Output', color: 0x10b981 }
      ];

      gates.forEach((g) => {
        let isGateActive = false;
        if (pipelineState === 'syntax_fail' && g.name === 'Syntax') isGateActive = true;
        if (pipelineState === 'val_fail' && g.name === 'Type/Value') isGateActive = true;
        if (pipelineState === 'zero_fail' && g.name === 'Zero/Bounds') isGateActive = true;
        if (pipelineState === 'success' && g.name === 'Output') isGateActive = true;

        const gGeo = new THREE.TorusGeometry(1.4, isGateActive ? 0.22 : 0.14, 12, 24);
        const gMat = new THREE.MeshStandardMaterial({
          color: g.color,
          roughness: 0.3,
          metalness: 0.7,
          emissive: g.color,
          emissiveIntensity: isGateActive ? 0.95 : 0.3
        });
        const gateMesh = new THREE.Mesh(gGeo, gMat);
        gateMesh.position.set(g.x, 0, 0);
        gateMesh.name = `gate_${g.name}`;
        modeGroup.add(gateMesh);
      });

      // Conveyor Rails
      const railGeo = new THREE.CylinderGeometry(0.1, 0.1, 16, 8);
      const railMat = new THREE.MeshStandardMaterial({ color: 0x334155 });
      const rail1 = new THREE.Mesh(railGeo, railMat);
      rail1.rotation.z = Math.PI / 2;
      rail1.position.set(0, -1.2, 0.6);
      modeGroup.add(rail1);

      const rail2 = new THREE.Mesh(railGeo, railMat);
      rail2.rotation.z = Math.PI / 2;
      rail2.position.set(0, -1.2, -0.6);
      modeGroup.add(rail2);

      // Packet traveling through conveyor
      const packetGeo = new THREE.BoxGeometry(0.9, 0.9, 0.9);
      let pCol = 0x38bdf8;
      if (pipelineState === 'syntax_fail') pCol = 0xef4444;
      if (pipelineState === 'val_fail') pCol = 0xeab308;
      if (pipelineState === 'zero_fail') pCol = 0xf97316;
      if (pipelineState === 'success') pCol = 0x10b981;

      const packetMat = new THREE.MeshStandardMaterial({
        color: pCol,
        roughness: 0.2,
        metalness: 0.8,
        emissive: pCol,
        emissiveIntensity: 0.75
      });
      const packet = new THREE.Mesh(packetGeo, packetMat);
      packet.name = 'packetMesh';

      let targetX = -7;
      if (pipelineState === 'running') targetX = -4.5;
      if (pipelineState === 'syntax_fail') targetX = -3.5;
      if (pipelineState === 'val_fail') targetX = 0;
      if (pipelineState === 'zero_fail') targetX = 3.5;
      if (pipelineState === 'success') targetX = 7;

      packet.position.set(targetX, 0, 0);
      modeGroup.add(packet);
    }
  }, [activeMode, selectedException, pipelineState]);

  // Mount-only Three.js setup
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 600;
    const height = mount.clientHeight || 420;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1d);
    sceneRef.current = scene;

    // Grid floor
    const grid = new THREE.GridHelper(26, 26, 0x38bdf8, 0x1e293b);
    grid.position.y = -2;
    scene.add(grid);

    // Camera setup with comfortable wide angle
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 6.5, 16);
    camera.lookAt(0, 0.2, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 1.8);
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf43f5e, 1.2);
    dirLight2.position.set(-10, 10, -8);
    scene.add(dirLight2);

    const modeGroup = new THREE.Group();
    scene.add(modeGroup);
    modeGroupRef.current = modeGroup;

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Camera subtle orbit
      camera.position.x = Math.sin(elapsed * 0.15) * 1.8;
      camera.lookAt(0, 0.2, 0);

      const mg = modeGroupRef.current;
      if (mg) {
        const core = mg.getObjectByName('runtimeCore');
        if (core) {
          core.rotation.y += delta * 1.5;
          core.rotation.x += delta * 0.8;
          core.position.y = 0.5 + Math.sin(elapsed * 3) * 0.25;
        }

        const logic = mg.getObjectByName('logicCrystal');
        if (logic) {
          logic.rotation.y -= delta * 1.2;
          logic.rotation.z += delta * 0.5;
          logic.position.y = 0.5 + Math.cos(elapsed * 2) * 0.2;
        }

        const ring = mg.getObjectByName('logicRing');
        if (ring) {
          ring.rotation.z += delta * 0.9;
        }

        const p = mg.getObjectByName('particles') as THREE.Points | undefined;
        if (p) {
          p.rotation.y += delta * 0.2;
        }

        const hub = mg.getObjectByName('radarHub');
        if (hub) {
          hub.rotation.y += delta * 0.8;
          hub.rotation.x += delta * 0.4;
        }

        const beam = mg.getObjectByName('scannerBeam');
        if (beam) {
          beam.rotation.z += delta * 1.5;
        }

        const packet = mg.getObjectByName('packetMesh');
        if (packet) {
          packet.rotation.x += delta * 1.8;
          packet.rotation.y += delta * 1.4;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mount || !rendererRef.current || !cameraRef.current) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        const dom = rendererRef.current.domElement;
        if (dom && dom.parentNode) dom.parentNode.removeChild(dom);
      }
    };
  }, []);

  // Update 3D meshes on mode/exception/pipeline change
  useEffect(() => {
    rebuildModeGroup();
  }, [rebuildModeGroup]);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl">
      {/* 3D Canvas Mount Point */}
      <div className="relative w-full h-[400px] md:h-[480px]">
        <div ref={mountRef} className="absolute inset-0 w-full h-full" />

        {/* Top Control Overlay */}
        <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
          {/* Mode Selector Tabs */}
          <div className="inline-flex bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-slate-700 shadow-lg">
            <button
              onClick={() => setActiveMode('pillars')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeMode === 'pillars'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              {isVi ? '1. Ba Trụ Cột Lỗi' : '1. Three Error Pillars'}
            </button>
            <button
              onClick={() => setActiveMode('radar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeMode === 'radar'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              {isVi ? '2. Radar 7 Lỗi Ngoại Lệ' : '2. Seven Exceptions Radar'}
            </button>
            <button
              onClick={() => setActiveMode('defense')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeMode === 'defense'
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              {isVi ? '3. Băng Chuyền Kiểm Soát' : '3. Defense Pipeline'}
            </button>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur text-xs font-mono text-cyan-300 border border-cyan-500/30 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>WebGL 3D Interactive Lab</span>
          </div>
        </div>

        {/* Bottom Context Panel */}
        <div className="absolute bottom-4 left-4 right-4 pointer-events-auto">
          {activeMode === 'pillars' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl bg-rose-950/85 backdrop-blur border border-rose-700/80 text-rose-100 text-xs shadow-lg">
                <div className="font-bold flex items-center gap-1.5 text-rose-300 mb-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  1. {isVi ? 'Lỗi Cú Pháp (SyntaxError)' : 'Syntax Error (SyntaxError)'}
                </div>
                <p className="text-[11px] text-slate-200 leading-tight">
                  {isVi
                    ? 'Vi phạm quy tắc ngôn ngữ. Trình thông dịch phát hiện và dừng ngay trước khi thực thi mã.'
                    : 'Grammar violation. Python detects it and halts immediately before code execution.'}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/85 backdrop-blur border border-amber-700/80 text-amber-100 text-xs shadow-lg">
                <div className="font-bold flex items-center gap-1.5 text-amber-300 mb-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  2. {isVi ? 'Lỗi Ngoại Lệ (Runtime Error)' : 'Runtime Exception'}
                </div>
                <p className="text-[11px] text-slate-200 leading-tight">
                  {isVi
                    ? 'Xuất hiện khi đang chạy: chia cho 0, ép kiểu sai, chỉ số danh sách ngoài phạm vi.'
                    : 'Raised while running: zero division, invalid cast, or list index out of range.'}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-purple-950/85 backdrop-blur border border-purple-700/80 text-purple-100 text-xs shadow-lg">
                <div className="font-bold flex items-center gap-1.5 text-purple-300 mb-1">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  3. {isVi ? 'Lỗi Lôgic / Ngữ Nghĩa' : 'Logic / Semantic Error'}
                </div>
                <p className="text-[11px] text-slate-200 leading-tight">
                  {isVi
                    ? 'Chương trình chạy thông suốt không crash, nhưng tính toán sai lệch so với yêu cầu bài toán.'
                    : 'Runs without crash, but outputs incorrect results due to flaws in algorithm formula.'}
                </p>
              </div>
            </div>
          )}

          {activeMode === 'radar' && (
            <div className="bg-slate-900/95 backdrop-blur p-4 rounded-xl border border-slate-700 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-3.5 h-3.5 rounded-full"
                    style={{ backgroundColor: `#${exceptionsList[selectedException].color.toString(16).padStart(6, '0')}` }}
                  />
                  <h4 className="font-bold text-sm text-white font-mono">
                    {exceptionsList[selectedException].name}
                  </h4>
                </div>
                <p className="text-xs text-slate-200 font-medium">
                  {isVi ? exceptionsList[selectedException].descVi : exceptionsList[selectedException].descEn}
                </p>
              </div>

              {/* Code Snippet Box */}
              <div className="bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 font-mono text-xs text-amber-300 max-w-sm overflow-x-auto shrink-0 shadow-inner">
                <pre>{exceptionsList[selectedException].snippet}</pre>
              </div>

              {/* Quick Exception Selectors */}
              <div className="flex flex-wrap gap-1">
                {exceptionsList.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedException(idx)}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${
                      selectedException === idx
                        ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {item.name.replace('Error', '')}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeMode === 'defense' && (
            <div className="bg-slate-900/95 backdrop-blur p-4 rounded-xl border border-slate-700 shadow-xl flex flex-col md:flex-row items-center justify-between gap-3">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-1.5">
                  {isVi ? 'Thử nghiệm bơm lỗi vào băng chuyền thực thi:' : 'Inject faults into execution pipeline:'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setPipelineState('syntax_fail')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                      pipelineState === 'syntax_fail'
                        ? 'bg-rose-600 text-white border-rose-400 shadow-md'
                        : 'bg-rose-950/70 hover:bg-rose-900 text-rose-200 border-rose-700'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5 text-rose-400" />
                    {isVi ? 'Lỗi Cú pháp' : 'Syntax Fault'}
                  </button>
                  <button
                    onClick={() => setPipelineState('val_fail')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                      pipelineState === 'val_fail'
                        ? 'bg-amber-600 text-white border-amber-400 shadow-md'
                        : 'bg-amber-950/70 hover:bg-amber-900 text-amber-200 border-amber-700'
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    {isVi ? 'Lỗi Giá trị (int("1.5"))' : 'ValueError'}
                  </button>
                  <button
                    onClick={() => setPipelineState('zero_fail')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                      pipelineState === 'zero_fail'
                        ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                        : 'bg-blue-950/70 hover:bg-blue-900 text-blue-200 border-blue-700'
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-blue-400" />
                    {isVi ? 'Lỗi Chia cho 0' : 'ZeroDivision'}
                  </button>
                  <button
                    onClick={() => setPipelineState('success')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                      pipelineState === 'success'
                        ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                        : 'bg-emerald-950/70 hover:bg-emerald-900 text-emerald-200 border-emerald-700'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {isVi ? 'Chạy An Toàn' : 'Clean Run'}
                  </button>
                  <button
                    onClick={() => setPipelineState('idle')}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                    title={isVi ? 'Đặt lại băng chuyền' : 'Reset pipeline'}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="text-right text-xs font-mono">
                <span className="text-slate-400 block mb-0.5">{isVi ? 'Trạng thái băng chuyền:' : 'Gate Verdict:'}</span>
                {pipelineState === 'idle' && (
                  <span className="text-slate-300">{isVi ? 'Sẵn sàng nhận gói lệnh' : 'Ready for input packet'}</span>
                )}
                {pipelineState === 'syntax_fail' && (
                  <span className="text-rose-400 font-bold">
                    {isVi ? 'Dừng ngay tại Cổng 1: SyntaxError (Trình phân tích cú pháp)' : 'Halted at Gate 1: SyntaxError (Parser stage)'}
                  </span>
                )}
                {pipelineState === 'val_fail' && (
                  <span className="text-amber-400 font-bold">
                    {isVi ? 'Chặn tại Cổng 2: ValueError (Ép kiểu không hợp lệ)' : 'Blocked at Gate 2: ValueError (Invalid cast)'}
                  </span>
                )}
                {pipelineState === 'zero_fail' && (
                  <span className="text-blue-400 font-bold">
                    {isVi ? 'Chặn tại Cổng 3: ZeroDivisionError (Chia cho 0)' : 'Blocked at Gate 3: ZeroDivisionError (Div by zero)'}
                  </span>
                )}
                {pipelineState === 'success' && (
                  <span className="text-emerald-400 font-bold">
                    {isVi ? 'Vượt qua tất cả cổng: Thành công (200 OK)' : 'Passed all gates cleanly: Success (200 OK)'}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
