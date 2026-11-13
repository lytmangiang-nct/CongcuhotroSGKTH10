import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Play, Pause, RotateCcw, Search, Scissors, Link2, Sparkles, UserCheck } from 'lucide-react';
import { useBook } from '../../context/BookContext';

export const StringMethods3DViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';

  const [activeMode, setActiveMode] = useState<'find' | 'splitJoin' | 'nameSplit'>('find');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [searchTarget, setSearchTarget] = useState<string>('Đà Nẵng');
  const [startParam, setStartParam] = useState<number>(0);
  const [splitSeparator, setSplitSeparator] = useState<string>(' ');
  const [joinConnector, setJoinConnector] = useState<string>(' - ');
  const [splitJoinPhase, setSplitJoinPhase] = useState<'joined' | 'splitting' | 'split' | 'joining'>('joined');
  const [studentNameInput, setStudentNameInput] = useState<string>('Trần Thị Mai Hương');
  const [findResult, setFindResult] = useState<{ index: number; found: boolean }>({ index: 9, found: true });

  // Animation frame ref
  const animFrameIdRef = useRef<number | null>(null);
  const isPlayingRef = useRef<boolean>(isPlaying);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Scene state refs for 3D objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);

  // Calculate find result when search target or startParam changes
  useEffect(() => {
    const parent = "Hà Nội - Đà Nẵng - Hồ Chí Minh";
    const idx = parent.indexOf(searchTarget, startParam);
    setFindResult({
      index: idx,
      found: idx !== -1
    });
  }, [searchTarget, startParam]);

  const initThreeScene = useCallback(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 420;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x090d16);

    // Subtle grid and fog
    scene.fog = new THREE.FogExp2(0x090d16, 0.025);

    const grid = new THREE.GridHelper(40, 40, 0x38bdf8, 0x1e293b);
    grid.position.y = -2;
    scene.add(grid);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 6, 17);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 1.2);
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf59e0b, 0.8);
    dirLight2.position.set(-10, 10, -5);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xa855f7, 2, 20);
    pointLight.position.set(0, 4, 3);
    scene.add(pointLight);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // Group for mode-specific objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    groupRef.current = mainGroup;

    // Handle resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Helper to create text canvas texture
  const createTextTexture = (text: string, bgColor: string, textColor: string, subText?: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, 256, 256);

      // Border glow
      ctx.strokeStyle = textColor;
      ctx.lineWidth = 10;
      ctx.strokeRect(5, 5, 246, 246);

      // Main Text
      ctx.fillStyle = textColor;
      ctx.font = 'bold 88px "Courier New", monospace, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 128, subText ? 105 : 128);

      // Subtitle if available (e.g. index)
      if (subText) {
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 42px sans-serif';
        ctx.fillText(subText, 128, 195);
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  };

  // Build 3D objects based on active mode
  const rebuild3DScene = useCallback(() => {
    const group = groupRef.current;
    if (!group) return;

    // Clear previous children
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

    if (activeMode === 'find') {
      // String: "Hà Nội - Đà Nẵng - Hồ Chí Minh" (length: 29)
      const text = "Hà Nội - Đà Nẵng - Hồ Chí Minh";
      const cubeSize = 0.65;
      const gap = 0.12;
      const totalWidth = text.length * (cubeSize + gap);
      const startX = -totalWidth / 2 + cubeSize / 2;

      const targetIdx = text.indexOf(searchTarget, startParam);
      const targetLen = searchTarget.length;

      // Create character cubes
      text.split('').forEach((char, i) => {
        const isMatched = targetIdx !== -1 && i >= targetIdx && i < targetIdx + targetLen;
        const isSkipped = i < startParam;

        const bgColor = isMatched ? '#059669' : isSkipped ? '#1e293b' : '#0f172a';
        const txtColor = isMatched ? '#34d399' : isSkipped ? '#64748b' : '#38bdf8';
        const texture = createTextTexture(char === ' ' ? '␣' : char, bgColor, txtColor, `[${i}]`);

        const geo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
        const mats = [
          new THREE.MeshStandardMaterial({ color: isMatched ? 0x059669 : 0x1e293b }),
          new THREE.MeshStandardMaterial({ color: isMatched ? 0x059669 : 0x1e293b }),
          new THREE.MeshStandardMaterial({ color: isMatched ? 0x10b981 : 0x334155 }),
          new THREE.MeshStandardMaterial({ color: 0x0f172a }),
          new THREE.MeshStandardMaterial({ map: texture, emissive: isMatched ? 0x064e3b : 0x000000 }),
          new THREE.MeshStandardMaterial({ color: 0x0f172a }),
        ];

        const mesh = new THREE.Mesh(geo, mats);
        mesh.position.set(startX + i * (cubeSize + gap), isMatched ? 0.3 : 0, 0);
        mesh.userData = { originalY: isMatched ? 0.3 : 0, isMatched, index: i };
        group.add(mesh);
      });

      // Add Laser Scanner Platform
      const laserGroup = new THREE.Group();
      laserGroup.name = 'laserScanner';

      const ringGeo = new THREE.TorusGeometry(0.7, 0.05, 16, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      laserGroup.add(ring);

      const beamGeo = new THREE.CylinderGeometry(0.04, 0.04, 3, 16);
      const beamMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.y = 1.5;
      laserGroup.add(beam);

      // Holographic search badge
      const badgeGeo = new THREE.PlaneGeometry(3, 1.2);
      const badgeCanvas = document.createElement('canvas');
      badgeCanvas.width = 300;
      badgeCanvas.height = 120;
      const bctx = badgeCanvas.getContext('2d');
      if (bctx) {
        bctx.fillStyle = targetIdx !== -1 ? '#064e3b' : '#7f1d1d';
        bctx.fillRect(0, 0, 300, 120);
        bctx.strokeStyle = targetIdx !== -1 ? '#10b981' : '#ef4444';
        bctx.lineWidth = 6;
        bctx.strokeRect(3, 3, 294, 114);
        bctx.fillStyle = '#ffffff';
        bctx.font = 'bold 28px monospace';
        bctx.textAlign = 'center';
        bctx.fillText(`find("${searchTarget}", ${startParam})`, 150, 48);
        bctx.fillStyle = targetIdx !== -1 ? '#34d399' : '#f87171';
        bctx.font = 'bold 36px monospace';
        bctx.fillText(`-> ${targetIdx}`, 150, 95);
      }
      const badgeTexture = new THREE.CanvasTexture(badgeCanvas);
      const badgeMat = new THREE.MeshBasicMaterial({ map: badgeTexture, transparent: true, side: THREE.DoubleSide });
      const badgeMesh = new THREE.Mesh(badgeGeo, badgeMat);
      badgeMesh.position.set(0, 3.2, 0);
      laserGroup.add(badgeMesh);

      // Position laser at target or start
      const targetPos = targetIdx !== -1
        ? startX + (targetIdx + targetLen / 2 - 0.5) * (cubeSize + gap)
        : startX + text.length * (cubeSize + gap);
      laserGroup.position.set(targetPos, 0, 0);

      group.add(laserGroup);

    } else if (activeMode === 'splitJoin') {
      // Split / Join demonstration with tokens
      const sentence = splitSeparator === ','
        ? ['gà', 'vịt', 'chó', 'lợn', 'ngựa', 'cá']
        : ['Tiên', 'học', 'lễ', 'hậu', 'học', 'văn'];

      const blockWidth = 1.8;
      const spacing = splitJoinPhase === 'split' || splitJoinPhase === 'splitting' ? 2.5 : 2.0;
      const totalW = sentence.length * spacing;
      const startX = -totalW / 2 + blockWidth / 2;

      sentence.forEach((word, idx) => {
        const geo = new THREE.BoxGeometry(blockWidth, 1.2, 0.8);
        const texture = createTextTexture(word, '#1e1b4b', '#a78bfa', `sline[${idx}]`);
        const mats = [
          new THREE.MeshStandardMaterial({ color: 0x312e81 }),
          new THREE.MeshStandardMaterial({ color: 0x312e81 }),
          new THREE.MeshStandardMaterial({ color: 0x4338ca }),
          new THREE.MeshStandardMaterial({ color: 0x1e1b4b }),
          new THREE.MeshStandardMaterial({ map: texture }),
          new THREE.MeshStandardMaterial({ color: 0x1e1b4b })
        ];
        const mesh = new THREE.Mesh(geo, mats);
        mesh.position.set(startX + idx * spacing, 0, 0);
        mesh.userData = { word, idx, targetX: startX + idx * spacing };
        group.add(mesh);

        // Connector bead if not last
        if (idx < sentence.length - 1) {
          const beadGeo = new THREE.SphereGeometry(0.22, 16, 16);
          const beadMat = new THREE.MeshStandardMaterial({
            color: splitJoinPhase === 'split' ? 0xef4444 : 0x10b981,
            emissive: splitJoinPhase === 'split' ? 0x7f1d1d : 0x064e3b
          });
          const bead = new THREE.Mesh(beadGeo, beadMat);
          bead.position.set(startX + idx * spacing + spacing / 2, 0, 0);
          group.add(bead);
        }
      });

      // Upper Header banner showing Python expression
      const bannerGeo = new THREE.PlaneGeometry(9, 1.4);
      const bCanvas = document.createElement('canvas');
      bCanvas.width = 600;
      bCanvas.height = 100;
      const ctx = bCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, 600, 100);
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 4;
        ctx.strokeRect(2, 2, 596, 96);
        ctx.fillStyle = '#a5b4fc';
        ctx.font = 'bold 24px monospace';
        ctx.textAlign = 'center';
        const expr = splitJoinPhase === 'split'
          ? `s.split("${splitSeparator}") -> [${sentence.map(w => `'${w}'`).join(', ')}]`
          : `"${joinConnector}".join(sline) -> '${sentence.join(joinConnector)}'`;
        ctx.fillText(expr, 300, 58);
      }
      const bTexture = new THREE.CanvasTexture(bCanvas);
      const bMat = new THREE.MeshBasicMaterial({ map: bTexture, transparent: true, side: THREE.DoubleSide });
      const bMesh = new THREE.Mesh(bannerGeo, bMat);
      bMesh.position.set(0, 2.6, 0);
      group.add(bMesh);

    } else if (activeMode === 'nameSplit') {
      // Name separation line (Nhiệm vụ 3 trang 126)
      const words = studentNameInput.trim().split(/\s+/);
      const lastName = words[words.length - 1] || '';
      const middleFirst = words.slice(0, words.length - 1).join(' ');

      // Two destination baskets/platforms in 3D
      // Left Platform: Họ Đệm (Middle & Surname)
      const hodemGeo = new THREE.BoxGeometry(4.8, 0.4, 3);
      const hodemMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, emissive: 0x0f172a });
      const hodemPlatform = new THREE.Mesh(hodemGeo, hodemMat);
      hodemPlatform.position.set(-3.5, -1.2, 0);
      group.add(hodemPlatform);

      // Right Platform: Tên (First/Given Name)
      const tenGeo = new THREE.BoxGeometry(3.2, 0.4, 3);
      const tenMat = new THREE.MeshStandardMaterial({ color: 0x065f46, emissive: 0x022c22 });
      const tenPlatform = new THREE.Mesh(tenGeo, tenMat);
      tenPlatform.position.set(3.5, -1.2, 0);
      group.add(tenPlatform);

      // Hovering label for Họ Đệm
      const hodemLabelTexture = createTextTexture(middleFirst || '(trống)', '#172554', '#60a5fa', 'hodem = " ".join(sline)');
      const hMesh = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.4, 0.6), new THREE.MeshStandardMaterial({ map: hodemLabelTexture }));
      hMesh.position.set(-3.5, 0.3, 0);
      group.add(hMesh);

      // Hovering label for Tên
      const tenLabelTexture = createTextTexture(lastName || '(trống)', '#064e3b', '#34d399', 'ten = sline[len-1]');
      const tMesh = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.4, 0.6), new THREE.MeshStandardMaterial({ map: tenLabelTexture }));
      tMesh.position.set(3.5, 0.3, 0);
      group.add(tMesh);

      // Conveyor belt in the center background
      const conveyorGeo = new THREE.BoxGeometry(10, 0.2, 1.5);
      const conveyorMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.8 });
      const conveyor = new THREE.Mesh(conveyorGeo, conveyorMat);
      conveyor.position.set(0, -1.5, -2);
      group.add(conveyor);

      // Overhead split robot indicator
      const robotGeo = new THREE.ConeGeometry(0.5, 0.8, 16);
      const robotMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xb45309 });
      const robot = new THREE.Mesh(robotGeo, robotMat);
      robot.rotation.x = Math.PI;
      robot.position.set(0, 2.8, 0);
      group.add(robot);
    }
  }, [activeMode, searchTarget, startParam, splitSeparator, joinConnector, splitJoinPhase, studentNameInput]);

  // Main animation loop
  useEffect(() => {
    initThreeScene();
    rebuild3DScene();

    let angle = 0;
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      if (isPlayingRef.current && groupRef.current) {
        angle += 0.008;

        // Gentle floating effect on meshes
        groupRef.current.children.forEach((child, idx) => {
          if (child.name === 'laserScanner') {
            // Pulse laser
            child.position.y = Math.sin(angle * 3) * 0.15;
          } else if (child.userData && child.userData.isMatched) {
            child.position.y = child.userData.originalY + Math.sin(angle * 4 + idx) * 0.08;
          }
        });

        // Subtle camera orbit for dynamic feel
        if (cameraRef.current) {
          cameraRef.current.position.x = Math.sin(angle * 0.5) * 1.5;
          cameraRef.current.position.y = 6 + Math.cos(angle * 0.3) * 0.5;
          cameraRef.current.lookAt(0, 0.5, 0);
        }
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
        const dom = rendererRef.current.domElement;
        if (dom && dom.parentNode) {
          dom.parentNode.removeChild(dom);
        }
      }
    };
  }, [initThreeScene]);

  // Trigger rebuild when dependencies change
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
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 backdrop-blur-md flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            {isEn ? '3D WebGL String Methods Laboratory' : 'Phòng thí nghiệm 3D Các Phương thức Xâu'}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md">
            {isEn ? 'Lesson 25 Textbook pp. 123 – 126' : 'Bài 25 SGK Tr. 123 – 126'}
          </span>
        </div>

        {/* Live Status Hologram for find() mode */}
        {activeMode === 'find' && (
          <div className="absolute bottom-3 left-3 bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 backdrop-blur-md text-xs font-mono shadow-xl max-w-sm">
            <div className="text-slate-400 mb-1">
              {isEn ? 'Parent String S (Length: 29):' : 'Xâu mẹ S (Độ dài: 29):'}
            </div>
            <div className="text-amber-300 font-bold mb-2 truncate">
              "Hà Nội - Đà Nẵng - Hồ Chí Minh"
            </div>
            <div className="flex items-center justify-between gap-3 pt-1 border-t border-slate-800">
              <span className="text-slate-300">
                S.find("{searchTarget}", {startParam}) =
              </span>
              <span className={`px-2 py-0.5 rounded font-black text-sm ${
                findResult.found ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
              }`}>
                {findResult.index}
              </span>
            </div>
          </div>
        )}

        {/* Animation Play/Pause & Reset */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-700/60 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title={isPlaying ? (isEn ? 'Pause 3D orbit' : 'Tạm dừng quay') : (isEn ? 'Resume 3D orbit' : 'Tiếp tục quay')}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-400" />}
          </button>
          <button
            type="button"
            onClick={() => {
              if (cameraRef.current) {
                cameraRef.current.position.set(0, 6, 17);
                cameraRef.current.lookAt(0, 0, 0);
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
            onClick={() => setActiveMode('find')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeMode === 'find'
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>{isEn ? '1. find() Laser Scanner' : '1. Tia Laser find() & Vị trí'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('splitJoin')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeMode === 'splitJoin'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Scissors className="w-4 h-4" />
            <span>{isEn ? '2. split() & join() Station' : '2. Trạm Tách & Nối: split() và join()'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('nameSplit')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeMode === 'nameSplit'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>{isEn ? '3. Name Splitter (Task 3)' : '3. Băng chuyền Tách Họ Đệm & Tên (NV3)'}</span>
          </button>
        </div>

        {/* Mode Specific Controls */}
        {activeMode === 'find' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-800/80 items-center">
            {/* Quick target buttons */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold text-slate-400">
                {isEn ? 'Target Substring:' : 'Chọn xâu con tìm kiếm:'}
              </label>
              <div className="flex items-center gap-1.5 flex-wrap">
                {['Đà Nẵng', 'Hà Nội', 'Hồ Chí Minh', 'Hải Phòng'].map((target) => (
                  <button
                    key={target}
                    type="button"
                    onClick={() => setSearchTarget(target)}
                    className={`px-2 py-1 rounded-lg text-xs font-mono font-semibold cursor-pointer transition-colors ${
                      searchTarget === target
                        ? 'bg-sky-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    "{target}"
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold text-slate-400">
                {isEn ? 'Or type substring:' : 'Hoặc gõ xâu con tuỳ ý:'}
              </label>
              <input
                type="text"
                value={searchTarget}
                onChange={(e) => setSearchTarget(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white font-mono focus:border-sky-500 outline-hidden"
                placeholder={isEn ? "Enter search substring..." : "Nhập từ cần tìm..."}
              />
            </div>

            {/* Start parameter slider */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                <span>{isEn ? 'Start Index (start):' : 'Vị trí bắt đầu (start):'}</span>
                <span className="font-mono text-sky-400 font-bold">{startParam}</span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                value={startParam}
                onChange={(e) => setStartParam(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>

            {/* Educational note on start parameter */}
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-[11px] text-slate-300">
              {startParam > 9 && searchTarget === 'Đà Nẵng' ? (
                <span className="text-amber-400">
                  ⚠️ <strong>start = {startParam} &gt; 9</strong>: {isEn
                    ? <>Searching after index 9 misses "Đà Nẵng", returns <strong>-1</strong>!</>
                    : <>Tìm sau vị trí 9 nên không còn gặp "Đà Nẵng", kết quả trả về <strong>-1</strong>!</>}
                </span>
              ) : (
                <span>
                  💡 <code>s.find(sub, start)</code>: {isEn ? 'Start searching from index ' : 'Bắt đầu tìm từ vị trí '}<code>start</code>.
                </span>
              )}
            </div>
          </div>
        )}

        {activeMode === 'splitJoin' && (
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-400 font-semibold">
                {isEn ? 'Sample text:' : 'Mẫu câu SGK:'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setSplitSeparator(' ');
                  setJoinConnector(' ');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                  splitSeparator === ' ' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {isEn ? 'Example 1: "Tiên học lễ hậu học văn"' : 'Ví dụ 1: "Tiên học lễ hậu học văn"'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSplitSeparator(',');
                  setJoinConnector(', ');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                  splitSeparator === ',' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {isEn ? 'Reinforce: "gà,vịt,chó,lợn,ngựa,cá"' : 'Củng cố: "gà,vịt,chó,lợn,ngựa,cá"'}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSplitJoinPhase(splitJoinPhase === 'split' ? 'joined' : 'split')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {splitJoinPhase === 'split' ? (
                  <>
                    <Link2 className="w-4 h-4" />
                    <span>{isEn ? `Rejoin: "${joinConnector}".join(sline)` : `Nối lại: "${joinConnector}".join(sline)`}</span>
                  </>
                ) : (
                  <>
                    <Scissors className="w-4 h-4" />
                    <span>{isEn ? `Split: s.split("${splitSeparator === ' ' ? '' : splitSeparator}")` : `Tách xâu: s.split("${splitSeparator === ' ' ? '' : splitSeparator}")`}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {activeMode === 'nameSplit' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800/80 items-center">
            <div className="sm:col-span-2 flex flex-col gap-1">
              <label className="text-[11px] font-semibold text-slate-400">
                {isEn ? 'Student full name to decompose:' : 'Nhập họ tên học sinh cần tách (Nhiệm vụ 3):'}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={studentNameInput}
                  onChange={(e) => setStudentNameInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white font-mono focus:border-emerald-500 outline-hidden"
                  placeholder={isEn ? "Example: Nguyen Van An" : "Ví dụ: Nguyễn Văn An"}
                />
                <button
                  type="button"
                  onClick={() => setStudentNameInput('Nguyễn Thị Thuỳ Dương')}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 cursor-pointer whitespace-nowrap"
                >
                  {isEn ? 'Sample 2' : 'Mẫu 2'}
                </button>
                <button
                  type="button"
                  onClick={() => setStudentNameInput('Võ Huỳnh')}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 cursor-pointer whitespace-nowrap"
                >
                  {isEn ? 'Sample 3' : 'Mẫu 3'}
                </button>
              </div>
            </div>

            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-[11px] text-slate-300">
              <div className="text-emerald-400 font-bold mb-0.5">
                {isEn ? 'Col 1 (Given Name): ' : 'Cột 1 (Tên): '}<code>sline[len-1]</code>
              </div>
              <div className="text-sky-400 font-bold">
                {isEn ? 'Col 2 (Surname/Middle): ' : 'Cột 2 (Họ đệm): '}<code>" ".join(sline[:len-1])</code>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
