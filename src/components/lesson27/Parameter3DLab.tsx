import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Play, RotateCcw, Sparkles, Layers, Sliders, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useBook } from '../../context/BookContext';

export const Parameter3DLab: React.FC = () => {
  const { bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';

  const mountRef = useRef<HTMLDivElement>(null);
  const [labMode, setLabMode] = useState<'docking' | 'merge' | 'transformer'>('docking');

  // Mode 1: Docking Station State
  const [argCount, setArgCount] = useState<number>(3); // 3 match, 2 too few, 4 too many, 99 undefined
  const [dockingStatus, setDockingStatus] = useState<string>('Match: 3 Args -> 3 Params (OK)');

  // Mode 2: Merge String State
  const [mergeS1, setMergeS1] = useState<string>('1111');
  const [mergeS2, setMergeS2] = useState<string>('0000');
  const [mergedResult, setMergedResult] = useState<string>('10101010');

  // Mode 3: Transformer State
  const [sampleText, setSampleText] = useState<string>('Tran Quang Minh');
  const [flagC, setFlagC] = useState<number>(0);

  // Scene references
  const animFrameIdRef = useRef<number | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const dynamicGroupRef = useRef<THREE.Group | null>(null);
  const rootGroupRef = useRef<THREE.Group | null>(null);

  // Recalculate merge string
  useEffect(() => {
    let res = '';
    const l1 = mergeS1.length;
    const l2 = mergeS2.length;
    const minL = Math.min(l1, l2);
    for (let i = 0; i < minL; i++) {
      res += mergeS1[i] + mergeS2[i];
    }
    if (l1 < l2) {
      res += mergeS2.slice(minL);
    } else if (l2 < l1) {
      res += mergeS1.slice(minL);
    }
    setMergedResult(res);
  }, [mergeS1, mergeS2]);

  // Rebuild 3D objects inside dynamicGroup
  const rebuildDynamicGroup = useCallback(() => {
    const dynamicGroup = dynamicGroupRef.current;
    if (!dynamicGroup) return;

    while (dynamicGroup.children.length > 0) {
      const obj = dynamicGroup.children[0];
      dynamicGroup.remove(obj);
      if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
      if ((obj as THREE.Mesh).material) {
        const mat = (obj as THREE.Mesh).material;
        if (Array.isArray(mat)) mat.forEach(m => m.dispose());
        else mat.dispose();
      }
    }

    if (labMode === 'docking') {
      // PARAMETER DOCKING LAB: 3 Docking Ports in Function Body f(a, b, c)
      const baseGeo = new THREE.BoxGeometry(8, 0.6, 3);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0x1e1b4b,
        metalness: 0.8,
        roughness: 0.2
      });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      baseMesh.position.set(0, -1, 0);
      dynamicGroup.add(baseMesh);

      // 3 Parameter Slots: a (-2.4), b (0), c (2.4)
      const paramColors = [0xec4899, 0xa855f7, 0x3b82f6];
      for (let i = 0; i < 3; i++) {
        const xPos = (i - 1) * 2.4;
        const portGeo = new THREE.CylinderGeometry(0.8, 0.9, 0.8, 24);
        const portMat = new THREE.MeshStandardMaterial({
          color: paramColors[i],
          metalness: 0.5,
          roughness: 0.3,
          wireframe: false
        });
        const port = new THREE.Mesh(portGeo, portMat);
        port.position.set(xPos, -0.4, 0);
        dynamicGroup.add(port);

        // Ring indicator
        const ringGeo = new THREE.TorusGeometry(0.85, 0.05, 12, 32);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x67e8f9 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.set(xPos, 0.05, 0);
        dynamicGroup.add(ring);
      }

      // Argument Capsules (Falling/Floating in based on argCount)
      const capsuleCount = argCount === 99 ? 3 : argCount;
      const isMismatch = argCount !== 3;
      const isUndefined = argCount === 99;

      for (let i = 0; i < capsuleCount; i++) {
        const xPos = (i - (capsuleCount - 1) / 2) * 2.2;
        const capGeo = new THREE.CapsuleGeometry(0.35, 0.6, 8, 16);
        const capMat = new THREE.MeshStandardMaterial({
          color: isUndefined ? 0xef4444 : isMismatch ? 0xf59e0b : 0x10b981,
          metalness: 0.3,
          roughness: 0.2,
          emissive: isUndefined ? 0x7f1d1d : isMismatch ? 0x78350f : 0x064e3b,
          emissiveIntensity: 0.6
        });
        const cap = new THREE.Mesh(capGeo, capMat);
        cap.position.set(xPos, 1.8, 0);
        dynamicGroup.add(cap);

        // Connecting energy beam to ports
        if (!isMismatch && !isUndefined) {
          const beamGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.8, 8);
          const beamMat = new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.7 });
          const beam = new THREE.Mesh(beamGeo, beamMat);
          beam.position.set((i - 1) * 2.4, 0.8, 0);
          dynamicGroup.add(beam);
        }
      }

    } else if (labMode === 'merge') {
      // MERGE STRING INTERLEAVING SHUTTLE
      const track1Geo = new THREE.BoxGeometry(6, 0.2, 0.8);
      const track1Mat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.6 });
      const track1 = new THREE.Mesh(track1Geo, track1Mat);
      track1.position.set(-2, 1.2, -1.2);
      dynamicGroup.add(track1);

      const track2Geo = new THREE.BoxGeometry(6, 0.2, 0.8);
      const track2Mat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.6 });
      const track2 = new THREE.Mesh(track2Geo, track2Mat);
      track2.position.set(-2, 1.2, 1.2);
      dynamicGroup.add(track2);

      const shuttleGeo = new THREE.OctahedronGeometry(1.1);
      const shuttleMat = new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        metalness: 0.7,
        roughness: 0.2,
        wireframe: false
      });
      const shuttle = new THREE.Mesh(shuttleGeo, shuttleMat);
      shuttle.position.set(1.5, 1.2, 0);
      dynamicGroup.add(shuttle);

      const outPipeGeo = new THREE.CylinderGeometry(0.5, 0.5, 5, 20);
      const outPipeMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.7,
        metalness: 0.5
      });
      const outPipe = new THREE.Mesh(outPipeGeo, outPipeMat);
      outPipe.rotation.z = Math.PI / 2;
      outPipe.position.set(4.5, 1.2, 0);
      dynamicGroup.add(outPipe);

      for (let i = 0; i < 6; i++) {
        const orbGeo = new THREE.SphereGeometry(0.22, 16, 16);
        const isS1 = i % 2 === 0;
        const orbMat = new THREE.MeshStandardMaterial({
          color: isS1 ? 0x38bdf8 : 0xfbbf24,
          emissive: isS1 ? 0x0284c7 : 0xd97706,
          emissiveIntensity: 0.8
        });
        const orb = new THREE.Mesh(orbGeo, orbMat);
        orb.position.set(2.5 + i * 0.7, 1.2, 0);
        dynamicGroup.add(orb);
      }

    } else {
      // TRANSFORMER GATEWAY LAB (upper vs lower)
      const prismGeo = new THREE.ConeGeometry(1.8, 3, 3);
      const prismMat = new THREE.MeshStandardMaterial({
        color: flagC === 0 ? 0xf59e0b : 0x06b6d4,
        metalness: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.75,
        wireframe: false
      });
      const prism = new THREE.Mesh(prismGeo, prismMat);
      prism.rotation.z = Math.PI / 2;
      prism.position.set(0, 0.6, 0);
      dynamicGroup.add(prism);

      const ringGeo = new THREE.TorusGeometry(1.6, 0.08, 16, 48);
      const ringMat = new THREE.MeshBasicMaterial({
        color: flagC === 0 ? 0xfef08a : 0x67e8f9
      });
      const ring1 = new THREE.Mesh(ringGeo, ringMat);
      ring1.position.set(0, 0.6, 0);
      dynamicGroup.add(ring1);

      for (let i = 0; i < 4; i++) {
        const nodeGeo = new THREE.BoxGeometry(0.35, 0.35, 0.35);
        const nodeMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        node.position.set(-3.5 + i * 0.7, 0.6, 0);
        dynamicGroup.add(node);
      }

      for (let i = 0; i < 4; i++) {
        const outGeo = new THREE.BoxGeometry(0.45, 0.45, 0.45);
        const outMat = new THREE.MeshStandardMaterial({
          color: flagC === 0 ? 0xfbbf24 : 0x22d3ee,
          emissive: flagC === 0 ? 0xb45309 : 0x0e7490,
          emissiveIntensity: 0.9
        });
        const outNode = new THREE.Mesh(outGeo, outMat);
        outNode.position.set(1.6 + i * 0.8, 0.6, 0);
        dynamicGroup.add(outNode);
      }
    }
  }, [labMode, argCount, flagC]);

  // Mount-only Three.js Scene Setup with comfortable reframing
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 340;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x070b14);

    // Reframed camera with wider z-distance and slight elevation so all 3 docking ports & outer capsules stay in frame
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 4.2, 14.5);
    camera.lookAt(0, 0.3, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xa855f7, 2.2);
    dirLight1.position.set(6, 10, 8);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x06b6d4, 1.8);
    dirLight2.position.set(-6, -6, 5);
    scene.add(dirLight2);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    rootGroupRef.current = rootGroup;

    // Grid Floor
    const gridHelper = new THREE.GridHelper(18, 18, 0x3b82f6, 0x1e293b);
    gridHelper.position.y = -2.2;
    rootGroup.add(gridHelper);

    // Dynamic meshes group
    const dynamicGroup = new THREE.Group();
    rootGroup.add(dynamicGroup);
    dynamicGroupRef.current = dynamicGroup;

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Gentle orbital pivot
      rootGroup.rotation.y = Math.sin(elapsed * 0.4) * 0.12;

      renderer.render(scene, camera);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    // Resize Handler
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

  // Update dynamic meshes whenever labMode, argCount, or flagC changes
  useEffect(() => {
    rebuildDynamicGroup();
  }, [rebuildDynamicGroup]);

  return (
    <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl p-4 sm:p-6 space-y-4">
      {/* Top Header & Mode Selectors */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span>{isEn ? '3D Parameter & Argument Pipeline Simulation' : 'Mô Phỏng 3D Truyền Tham Số & Đối Số'}</span>
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            {isEn
              ? 'Real-time WebGL engine visualizing argument docking, interleaving strings, and transform gateway.'
              : 'Công nghệ WebGL tương tác trực quan hóa cơ chế truyền đối số vào tham số và các bài toán hàm SGK.'}
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-2xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setLabMode('docking')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              labMode === 'docking'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isEn ? '1. Docking Station' : '1. Cầu truyền đối số'}
          </button>
          <button
            onClick={() => setLabMode('merge')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              labMode === 'merge'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isEn ? '2. merge_str Loom' : '2. Máy dệt xâu'}
          </button>
          <button
            onClick={() => setLabMode('transformer')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              labMode === 'transformer'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isEn ? '3. Case Gateway' : '3. Lăng kính hoa/thường'}
          </button>
        </div>
      </div>

      {/* 3D Canvas Box */}
      <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/70">
        <div ref={mountRef} className="absolute inset-0 w-full h-full" />

        {/* Overlay HUD Badges */}
        <div className="absolute top-3 left-3 pointer-events-none space-y-1">
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900/90 text-purple-300 border border-purple-500/30 backdrop-blur-md">
            {labMode === 'docking' && 'f(a, b, c) <- [Args]'}
            {labMode === 'merge' && 'merge_str(s1, s2) Loom'}
            {labMode === 'transformer' && `change(ho_ten, c=${flagC})`}
          </span>
        </div>

        {/* Bottom Mode Indicators */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs pointer-events-none">
          <span className="text-[11px] text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-lg backdrop-blur-md border border-slate-800">
            {labMode === 'docking' && (
              argCount === 3
                ? (isEn ? '✅ Perfect 3:3 mapping' : '✅ Ánh xạ 3:3 hoàn hảo')
                : argCount === 99
                ? (isEn ? '❌ NameError: Undefined variable' : '❌ NameError: Biến chưa gán')
                : (isEn ? '⚠️ TypeError: Argument count mismatch' : '⚠️ TypeError: Lệch số lượng đối số')
            )}
            {labMode === 'merge' && (isEn ? `Interleave: "${mergeS1}" + "${mergeS2}" => "${mergedResult}"` : `Đan xen: "${mergeS1}" + "${mergeS2}" => "${mergedResult}"`)}
            {labMode === 'transformer' && (flagC === 0 ? (isEn ? '✨ c=0 -> ho_ten.upper()' : '✨ c=0 -> ho_ten.upper()') : (isEn ? '🔹 c!=0 -> ho_ten.lower()' : '🔹 c!=0 -> ho_ten.lower()'))}
          </span>
          <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
            Three.js WebGL Engine
          </span>
        </div>
      </div>

      {/* Interactive Mode Control Panel */}
      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
        {labMode === 'docking' && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <span>{isEn ? 'Function Definition: def f(a, b, c): return a + b + c' : 'Khai báo hàm: def f(a, b, c): return a + b + c'}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {isEn
                  ? 'Choose the argument list to see how Python maps values or raises errors.'
                  : 'Chọn các trường hợp truyền đối số để quan sát ánh xạ giá trị vào 3 tham số a, b, c theo SGK trang 131–132.'}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => {
                  setArgCount(3);
                  setDockingStatus(isEn ? 'Match: 3 Args -> 3 Params (OK)' : 'Khớp: 3 đối số -> 3 tham số (OK)');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  argCount === 3
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                f(10, 20, 5)
              </button>
              <button
                onClick={() => {
                  setArgCount(2);
                  setDockingStatus(isEn ? 'TypeError: takes 3 positional arguments but 2 were given' : 'TypeError: thiếu đối số c');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  argCount === 2
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                f(10, 20)
              </button>
              <button
                onClick={() => {
                  setArgCount(4);
                  setDockingStatus(isEn ? 'TypeError: takes 3 positional arguments but 4 were given' : 'TypeError: thừa đối số thứ 4');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  argCount === 4
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                f(1, 2, 3, 4)
              </button>
              <button
                onClick={() => {
                  setArgCount(99);
                  setDockingStatus(isEn ? "NameError: name 'a' is not defined" : "NameError: tên biến 'a' chưa được định nghĩa");
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  argCount === 99
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {isEn ? 'f(a, b, c) [unassigned]' : 'f(a, b, c) [chưa gán]'}
              </button>
            </div>
          </div>
        )}

        {labMode === 'merge' && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <label className="text-slate-400 font-mono">s1:</label>
              <input
                type="text"
                value={mergeS1}
                onChange={(e) => setMergeS1(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-white font-mono w-28 text-center"
              />
              <label className="text-slate-400 font-mono ml-2">s2:</label>
              <input
                type="text"
                value={mergeS2}
                onChange={(e) => setMergeS2(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-white font-mono w-28 text-center"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-mono">merge_str:</span>
              <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono font-bold border border-emerald-500/30">
                "{mergedResult}"
              </span>
            </div>
          </div>
        )}

        {labMode === 'transformer' && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <label className="text-slate-400 font-mono">ho_ten:</label>
              <input
                type="text"
                value={sampleText}
                onChange={(e) => setSampleText(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-white w-40 text-center"
              />
              <label className="text-slate-400 font-mono ml-2">c:</label>
              <button
                onClick={() => setFlagC(flagC === 0 ? 1 : 0)}
                className={`px-3 py-1 rounded-lg font-mono font-bold transition-all cursor-pointer ${
                  flagC === 0 ? 'bg-amber-500 text-slate-950' : 'bg-cyan-600 text-white'
                }`}
              >
                c = {flagC} ({flagC === 0 ? 'UPPER' : 'lower'})
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-mono">{isEn ? 'Result:' : 'Kết quả:'}</span>
              <span className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                "{flagC === 0 ? sampleText.toUpperCase() : sampleText.toLowerCase()}"
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
