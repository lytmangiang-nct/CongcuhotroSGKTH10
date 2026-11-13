import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Globe,
  Languages,
  BookOpen,
  Sparkles,
  Maximize2,
  RotateCcw,
  Zap,
  FileText,
  School,
  Share2
} from 'lucide-react';
import { useBook } from '../../context/BookContext';

export type Resource3DMode = 'overview' | 'translation' | 'repository' | 'mit';

interface GlobalResource3DViewerProps {
  initialMode?: Resource3DMode;
}

export const GlobalResource3DViewer: React.FC<GlobalResource3DViewerProps> = ({
  initialMode = 'overview'
}) => {
  const { bilingualMode } = useBook();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeMode, setActiveMode] = useState<Resource3DMode>(initialMode);
  const [isTranslating, setIsTranslating] = useState<boolean>(true);
  const [inspectInfo, setInspectInfo] = useState<string>('overview');

  const stateRef = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    frameId?: number;
    clock?: THREE.Clock;
    globeGroup?: THREE.Group;
    earthMesh?: THREE.Mesh;
    wireMesh?: THREE.Mesh;
    orbitRing1?: THREE.Mesh;
    orbitRing2?: THREE.Mesh;
    neuralCore?: THREE.Mesh;
    translateStation?: THREE.Group;
    repoStation?: THREE.Group;
    mitStation?: THREE.Group;
    docScannerGroup?: THREE.Group;
    scanLaser?: THREE.Mesh;
    streamParticles?: THREE.Points;
    targetLookAt: THREE.Vector3;
    rotationOrbit: { x: number; y: number };
    zoomDistance: number;
    isDragging: boolean;
    prevMousePos: { x: number; y: number };
  }>({
    targetLookAt: new THREE.Vector3(0, 0, 0),
    rotationOrbit: { x: 0.35, y: 0.5 },
    zoomDistance: 13,
    isDragging: false,
    prevMousePos: { x: 0, y: 0 }
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Clock
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060c1c);
    scene.fog = new THREE.FogExp2(0x060c1c, 0.035);

    const clock = new THREE.Clock();

    // 2. Camera
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 440;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 5, 13);

    // 3. WebGL Renderer with tone mapping
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x223859, 1.4);
    scene.add(ambientLight);

    const mainSun = new THREE.DirectionalLight(0x38bdf8, 2.2);
    mainSun.position.set(10, 15, 10);
    scene.add(mainSun);

    const accentPurple = new THREE.PointLight(0xa855f7, 2.0, 18);
    accentPurple.position.set(-6, -2, -4);
    scene.add(accentPurple);

    const emeraldLight = new THREE.PointLight(0x10b981, 2.2, 16);
    emeraldLight.position.set(5, 3, -3);
    scene.add(emeraldLight);

    // 5. Central Digital Knowledge Globe
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Solid inner planet sphere
    const earthGeo = new THREE.SphereGeometry(3.0, 32, 32);
    const earthMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.7,
      metalness: 0.3
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earthMesh);

    // Digital Wireframe Grid Shell
    const wireGeo = new THREE.SphereGeometry(3.05, 24, 24);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wireMesh);

    // Holographic Neural Core inside
    const neuralCoreGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const neuralCoreMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.9,
      wireframe: true
    });
    const neuralCore = new THREE.Mesh(neuralCoreGeo, neuralCoreMat);
    globeGroup.add(neuralCore);

    // Orbital Rings around Globe
    const ringGeo1 = new THREE.TorusGeometry(4.4, 0.03, 16, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.5
    });
    const orbitRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    orbitRing1.rotation.x = Math.PI / 3;
    globeGroup.add(orbitRing1);

    const ringGeo2 = new THREE.TorusGeometry(4.8, 0.02, 16, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.4
    });
    const orbitRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    orbitRing2.rotation.x = -Math.PI / 4;
    orbitRing2.rotation.y = Math.PI / 6;
    globeGroup.add(orbitRing2);

    // 6. STATION 1: Google Neural Translation Hub
    const translateStation = new THREE.Group();
    translateStation.position.set(-4.6, 2.2, 1.8);
    scene.add(translateStation);

    // Station Base
    const stBaseGeo = new THREE.CylinderGeometry(0.7, 0.8, 0.3, 16);
    const stBaseMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.2
    });
    const stBase = new THREE.Mesh(stBaseGeo, stBaseMat);
    translateStation.add(stBase);

    // Glowing Translation Portal Prism
    const prismGeo = new THREE.OctahedronGeometry(0.65, 0);
    const prismMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      emissive: 0x2563eb,
      emissiveIntensity: 0.8,
      wireframe: true
    });
    const prismMesh = new THREE.Mesh(prismGeo, prismMat);
    prismMesh.position.y = 0.9;
    translateStation.add(prismMesh);

    // Dual language satellite nodes (Source: VI, Target: EN)
    const satGeo = new THREE.SphereGeometry(0.2, 12, 12);
    const satSrcMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xdc2626,
      emissiveIntensity: 0.7
    });
    const satTgtMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.7
    });

    const satSrc = new THREE.Mesh(satGeo, satSrcMat);
    satSrc.position.set(-0.7, 1.4, 0);
    translateStation.add(satSrc);

    const satTgt = new THREE.Mesh(satGeo, satTgtMat);
    satTgt.position.set(0.7, 1.4, 0);
    translateStation.add(satTgt);

    // 7. STATION 2: Vietnam National Repository (Kho học liệu số igiaoduc.vn)
    const repoStation = new THREE.Group();
    repoStation.position.set(4.8, 2.0, 1.2);
    scene.add(repoStation);

    // Tiered Digital Library Tower
    const towerGeo = new THREE.CylinderGeometry(0.5, 0.7, 1.6, 6);
    const towerMat = new THREE.MeshStandardMaterial({
      color: 0x065f46,
      metalness: 0.6,
      roughness: 0.3
    });
    const towerMesh = new THREE.Mesh(towerGeo, towerMat);
    towerMesh.position.y = 0.8;
    repoStation.add(towerMesh);

    // Holographic Open Book on top
    const bookGeo = new THREE.BoxGeometry(0.8, 0.1, 0.6);
    const bookMat = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      emissive: 0x059669,
      emissiveIntensity: 0.8
    });
    const bookMesh = new THREE.Mesh(bookGeo, bookMat);
    bookMesh.position.set(0, 1.8, 0);
    bookMesh.rotation.z = Math.PI / 12;
    repoStation.add(bookMesh);

    // 8. STATION 3: MIT 2002 Historical OER Pioneer Hub
    const mitStation = new THREE.Group();
    mitStation.position.set(0, -3.8, 3.2);
    scene.add(mitStation);

    const mitBaseGeo = new THREE.BoxGeometry(1.2, 0.3, 1.2);
    const mitBaseMat = new THREE.MeshStandardMaterial({
      color: 0x831843,
      roughness: 0.4
    });
    const mitBase = new THREE.Mesh(mitBaseGeo, mitBaseMat);
    mitStation.add(mitBase);

    const pillarGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.0, 8);
    const pillarMat = new THREE.MeshStandardMaterial({ color: 0xf472b6 });
    for (let i = 0; i < 4; i++) {
      const px = (i % 2 === 0 ? 1 : -1) * 0.4;
      const pz = (i < 2 ? 1 : -1) * 0.4;
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.set(px, 0.65, pz);
      mitStation.add(pillar);
    }

    const beaconGeo = new THREE.SphereGeometry(0.3, 16, 16);
    const beaconMat = new THREE.MeshStandardMaterial({
      color: 0xfb7185,
      emissive: 0xe11d48,
      emissiveIntensity: 1.0
    });
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.position.y = 1.35;
    mitStation.add(beaconMesh);

    // 9. Document Holo-Scanner (Mô phỏng tệp Word / Excel đang được quét dịch)
    const docScannerGroup = new THREE.Group();
    docScannerGroup.position.set(0, 3.8, -3.0);
    scene.add(docScannerGroup);

    const docSheetGeo = new THREE.BoxGeometry(1.4, 2.0, 0.04);
    const docSheetMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.65,
      roughness: 0.2
    });
    const docSheet = new THREE.Mesh(docSheetGeo, docSheetMat);
    docScannerGroup.add(docSheet);

    // Glowing emerald scan line
    const laserGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.6, 8);
    laserGeo.rotateZ(Math.PI / 2);
    const laserMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const scanLaser = new THREE.Mesh(laserGeo, laserMat);
    docScannerGroup.add(scanLaser);

    // 10. Neural Data Stream Particles (Luồng hạt ánh sáng di chuyển)
    const particleCount = 150;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 16;
      particlePos[i + 1] = (Math.random() - 0.5) * 12;
      particlePos[i + 2] = (Math.random() - 0.5) * 16;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.09,
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.8
    });
    const streamParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(streamParticles);

    // Store state in ref
    stateRef.current.scene = scene;
    stateRef.current.camera = camera;
    stateRef.current.renderer = renderer;
    stateRef.current.clock = clock;
    stateRef.current.globeGroup = globeGroup;
    stateRef.current.earthMesh = earthMesh;
    stateRef.current.wireMesh = wireMesh;
    stateRef.current.orbitRing1 = orbitRing1;
    stateRef.current.orbitRing2 = orbitRing2;
    stateRef.current.neuralCore = neuralCore;
    stateRef.current.translateStation = translateStation;
    stateRef.current.repoStation = repoStation;
    stateRef.current.mitStation = mitStation;
    stateRef.current.docScannerGroup = docScannerGroup;
    stateRef.current.scanLaser = scanLaser;
    stateRef.current.streamParticles = streamParticles;

    // 11. Animation Loop with requestAnimationFrame
    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate Globe
      if (globeGroup) {
        globeGroup.rotation.y = elapsedTime * 0.15;
      }

      // Rotate inner neural core
      if (neuralCore) {
        neuralCore.rotation.x = elapsedTime * 0.5;
        neuralCore.rotation.y = elapsedTime * 0.7;
      }

      // Pulse and bob Translation Station
      if (translateStation) {
        translateStation.position.y = 2.2 + Math.sin(elapsedTime * 2.0) * 0.15;
        prismMesh.rotation.y = elapsedTime * 1.5;
      }

      // Bob Repo Station
      if (repoStation) {
        repoStation.position.y = 2.0 + Math.cos(elapsedTime * 1.8) * 0.12;
        bookMesh.rotation.y = elapsedTime * 0.8;
      }

      // Move scan laser up and down
      if (scanLaser) {
        scanLaser.position.y = Math.sin(elapsedTime * 3.0) * 0.9;
      }

      // Particles orbit
      if (streamParticles) {
        streamParticles.rotation.y = elapsedTime * 0.08;
      }

      // Camera orbital positioning with lerp
      const state = stateRef.current;
      const radius = state.zoomDistance;
      const camX = radius * Math.sin(state.rotationOrbit.y) * Math.cos(state.rotationOrbit.x);
      const camY = radius * Math.sin(state.rotationOrbit.x);
      const camZ = radius * Math.cos(state.rotationOrbit.y) * Math.cos(state.rotationOrbit.x);

      camera.position.lerp(new THREE.Vector3(camX, Math.max(camY, 1.0), camZ), 0.08);
      camera.lookAt(state.targetLookAt);

      renderer.render(scene, camera);
    };

    animate();
    stateRef.current.frameId = frameId;

    // 12. Mouse & Touch Controls
    const handleMouseDown = (e: MouseEvent) => {
      stateRef.current.isDragging = true;
      stateRef.current.prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!stateRef.current.isDragging) return;
      const deltaX = e.clientX - stateRef.current.prevMousePos.x;
      const deltaY = e.clientY - stateRef.current.prevMousePos.y;

      stateRef.current.rotationOrbit.y -= deltaX * 0.008;
      stateRef.current.rotationOrbit.x = Math.max(
        0.05,
        Math.min(1.4, stateRef.current.rotationOrbit.x + deltaY * 0.008)
      );

      stateRef.current.prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      stateRef.current.isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      stateRef.current.zoomDistance = Math.max(
        7,
        Math.min(22, stateRef.current.zoomDistance + e.deltaY * 0.015)
      );
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        stateRef.current.isDragging = true;
        stateRef.current.prevMousePos = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!stateRef.current.isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - stateRef.current.prevMousePos.x;
      const deltaY = e.touches[0].clientY - stateRef.current.prevMousePos.y;

      stateRef.current.rotationOrbit.y -= deltaX * 0.008;
      stateRef.current.rotationOrbit.x = Math.max(
        0.05,
        Math.min(1.4, stateRef.current.rotationOrbit.x + deltaY * 0.008)
      );

      stateRef.current.prevMousePos = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    };

    const handleTouchEnd = () => {
      stateRef.current.isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domElement.addEventListener('wheel', handleWheel, { passive: false });
    domElement.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    });
    resizeObserver.observe(container);

    // 13. Clean memory on unmount
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      resizeObserver.disconnect();

      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElement.removeEventListener('wheel', handleWheel);
      domElement.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);

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
      if (domElement && domElement.parentNode === container) {
        container.removeChild(domElement);
      }
    };
  }, []);

  const handleSelectMode = (mode: Resource3DMode) => {
    setActiveMode(mode);
    setInspectInfo(mode);

    const state = stateRef.current;
    if (mode === 'overview') {
      state.rotationOrbit = { x: 0.35, y: 0.5 };
      state.zoomDistance = 13;
      state.targetLookAt.set(0, 0, 0);
    } else if (mode === 'translation') {
      state.rotationOrbit = { x: 0.25, y: 1.1 };
      state.zoomDistance = 7.5;
      state.targetLookAt.set(-4.6, 2.2, 1.8);
    } else if (mode === 'repository') {
      state.rotationOrbit = { x: 0.3, y: -0.9 };
      state.zoomDistance = 8.0;
      state.targetLookAt.set(4.8, 2.0, 1.2);
    } else if (mode === 'mit') {
      state.rotationOrbit = { x: 0.65, y: 2.8 };
      state.zoomDistance = 8.5;
      state.targetLookAt.set(0, -3.8, 3.2);
    }
  };

  const resetCamera = () => {
    handleSelectMode('overview');
  };

  return (
    <div className="relative rounded-3xl overflow-hidden border border-slate-700/60 bg-slate-950 shadow-2xl flex flex-col">
      {/* 3D Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 z-10 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Globe className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>Three.js Interactive 3D Lab</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div className="text-sm font-bold text-white">
              {bilingualMode === 'en'
                ? 'Global Internet Resource & Knowledge Sphere'
                : 'Mô phỏng 3D: Quả cầu Mạng Tri thức & Học liệu số Toàn cầu'}
            </div>
          </div>
        </div>

        {/* View Mode Switcher Pills */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-2xl border border-slate-700">
          <button
            type="button"
            onClick={() => handleSelectMode('overview')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'overview'
                ? 'bg-cyan-500 text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {bilingualMode === 'en' ? 'Overview' : 'Toàn cầu'}
          </button>
          <button
            type="button"
            onClick={() => handleSelectMode('translation')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'translation'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {bilingualMode === 'en' ? 'Translate AI Node' : 'Trạm Dịch máy 3D'}
          </button>
          <button
            type="button"
            onClick={() => handleSelectMode('repository')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'repository'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {bilingualMode === 'en' ? 'igiaoduc.vn Hub' : 'Kho học liệu số 3D'}
          </button>
          <button
            type="button"
            onClick={() => handleSelectMode('mit')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'mit'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {bilingualMode === 'en' ? 'MIT 2002 OER' : 'Trạm MIT 2002 3D'}
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Viewport */}
      <div
        className="w-full h-[400px] sm:h-[480px] cursor-grab active:cursor-grabbing relative select-none overflow-hidden"
      >
        <div ref={containerRef} className="absolute inset-0 w-full h-full" />
        {/* Floating Quick Action Buttons */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {/* Neural Beam Toggle */}
          <button
            type="button"
            onClick={() => setIsTranslating(!isTranslating)}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer backdrop-blur-md ${
              isTranslating
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <Zap className={`w-4 h-4 ${isTranslating ? 'text-cyan-400 animate-bounce' : 'text-slate-400'}`} />
            <span>
              {isTranslating
                ? bilingualMode === 'en'
                  ? 'Neural Translation Stream: ACTIVE'
                  : 'Luồng dữ liệu dịch nơ-ron: ĐANG CHẠY'
                : bilingualMode === 'en'
                  ? 'Enable Neural Stream'
                  : 'Kích hoạt luồng nơ-ron'}
            </span>
          </button>

          {/* Reset Camera button */}
          <button
            type="button"
            onClick={resetCamera}
            className="px-3 py-2 rounded-xl text-xs font-medium bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-2 transition-all cursor-pointer backdrop-blur-md"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>{bilingualMode === 'en' ? 'Reset Orbit' : 'Đặt lại góc nhìn'}</span>
          </button>
        </div>

        {/* Orbit Hint Watermark */}
        <div className="absolute bottom-3 left-4 text-[11px] text-slate-400/80 pointer-events-none flex items-center gap-1.5 bg-slate-900/60 px-2.5 py-1 rounded-lg backdrop-blur-xs border border-slate-800">
          <Maximize2 className="w-3 h-3 text-cyan-400" />
          <span>
            {bilingualMode === 'en'
              ? 'Click & drag to rotate 360° • Scroll to zoom'
              : 'Giữ chuột / vuốt để xoay 360° • Lăn chuột để phóng to / thu nhỏ'}
          </span>
        </div>
      </div>

      {/* Dynamic Inspector Detail Card Footer */}
      <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 text-slate-200">
        {inspectInfo === 'overview' && (
          <div className="space-y-1.5 animate-in fade-in">
            <div className="flex items-center gap-2 text-sm font-bold text-cyan-400">
              <Globe className="w-4 h-4" />
              <span>
                {bilingualMode === 'en'
                  ? 'Global Internet Resource Matrix (Lesson 10 SGK)'
                  : 'Ma trận Tài nguyên & Dịch vụ Internet phục vụ học tập (Bài 10 SGK)'}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {bilingualMode === 'en'
                ? 'Central digital globe interconnects the two pillars of modern online learning: (1) Machine Translation platforms (Google Translate) enabling cross-lingual communication; and (2) Open Educational Resources (OER) pioneered by MIT in 2002 and deployed in Vietnam via igiaoduc.vn.'
                : 'Quả cầu số trung tâm kết nối hai trụ cột tài nguyên Internet phục vụ học tập theo SGK Bài 10: (1) Phần mềm dịch đa ngữ Google Translate hỗ trợ phát triển 4 kỹ năng nghe, nói, đọc, viết ngoại ngữ; và (2) Kho học liệu mở (OER) bắt nguồn từ MIT năm 2002 và kho học liệu số Quốc gia igiaoduc.vn của Bộ Giáo dục và Đào tạo.'}
            </p>
          </div>
        )}

        {inspectInfo === 'translation' && (
          <div className="space-y-1.5 animate-in fade-in">
            <div className="flex items-center gap-2 text-sm font-bold text-blue-400">
              <Languages className="w-4 h-4" />
              <span>
                {bilingualMode === 'en'
                  ? 'Neural Machine Translation Hub: Google Translate (Page 50–52)'
                  : 'Trạm Dịch máy Đa ngữ: Google Translate (SGK Trang 50 – 52)'}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {bilingualMode === 'en'
                ? 'Features bidirectional linguistic processing: Text input, Voice speech-to-text dictation (Microphone), and Full Document translation (.docx, .xlsx, .pptx, .pdf). Built-in Text-to-Speech (TTS) speaker reads at standard and slower speeds to refine pronunciation.'
                : 'Hỗ trợ chuyển đổi ngôn ngữ nguồn sang ngôn ngữ đích qua 3 phương thức: Nhập trực tiếp văn bản; Nhập bằng giọng nói qua micro thu âm; và Dịch nguyên tệp tài liệu (Word, Excel, PowerPoint, PDF). Tích hợp loa phát âm 2 tốc độ giúp luyện kỹ năng nghe và nói ngoại ngữ.'}
            </p>
          </div>
        )}

        {inspectInfo === 'repository' && (
          <div className="space-y-1.5 animate-in fade-in">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
              <BookOpen className="w-4 h-4" />
              <span>
                {bilingualMode === 'en'
                  ? 'Vietnam National Educational Repository: igiaoduc.vn (Page 53–54)'
                  : 'Kho học liệu số Giáo dục Việt Nam: igiaoduc.vn (SGK Trang 53 – 54)'}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {bilingualMode === 'en'
                ? 'Developed by Vietnam Ministry of Education and Training. Features a 3-tier hierarchical directory tree: Tier 1 (Digital Assets, Textbooks, Topography), Tier 2 (Grade 10), and Tier 3 (Subjects like Algebra 10, Computer Science, Literature), providing streaming video lectures and multimedia slides.'
                : 'Kho học liệu số trực tuyến của Bộ GD&ĐT với hàng vạn bài giảng mở. Cấu trúc cây thư mục 3 cấp: Cấp 1 (Học liệu số, SGK, Dư địa chí) ➔ Cấp 2 (Khối Lớp 10) ➔ Cấp 3 (Môn học: Đại số 10, Tin học, Ngữ văn). Nháy "Học trực tuyến" để theo dõi video bài giảng và bài trình chiếu.'}
            </p>
          </div>
        )}

        {inspectInfo === 'mit' && (
          <div className="space-y-1.5 animate-in fade-in">
            <div className="flex items-center gap-2 text-sm font-bold text-rose-400">
              <School className="w-4 h-4" />
              <span>
                {bilingualMode === 'en'
                  ? 'MIT OpenCourseWare 2002 Pioneer Hub (Page 53)'
                  : 'Trạm Lịch sử: Khởi nguồn Học liệu mở MIT 2002 (SGK Trang 53)'}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {bilingualMode === 'en'
                ? 'In 2002, the Massachusetts Institute of Technology (MIT) made history by releasing all course curricula and lecture materials online completely free of charge. This catalyzed the worldwide Open Educational Resources (OER) revolution, democratizing knowledge access.'
                : 'Năm 2002, Viện Công nghệ Massachusetts (MIT, Mỹ) đưa toàn bộ nội dung giảng dạy lên Internet để sử dụng miễn phí. Sự kiện này đã mở ra cơ hội tiếp cận tri thức mới với chi phí thấp và truyền cảm hứng cho hàng loạt quốc gia xây dựng kho học liệu số công cộng.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
