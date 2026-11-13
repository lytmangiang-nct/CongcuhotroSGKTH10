import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Sparkles,
  RotateCw,
  Eye,
  Sliders,
  Maximize2,
  Minimize2,
  Compass,
  Play,
  Pause,
  Layers,
  Wand2,
  Type,
  Flower2
} from 'lucide-react';
import { BilingualText } from '../BilingualText';
import { useBook } from '../../context/BookContext';

export const BezierCurves3DViewer: React.FC = () => {
  const { bilingualMode } = useBook();
  const containerRef = useRef<HTMLDivElement>(null);

  // Simulation mode
  const [activeMode, setActiveMode] = useState<'bezier' | 'textOnPath' | 'leafBanner'>('bezier');

  // Mode 1: Bézier parameters
  const [nodeType, setNodeType] = useState<'smooth' | 'corner'>('smooth');
  const [handle1X, setHandle1X] = useState<number>(-1.5);
  const [handle1Y, setHandle1Y] = useState<number>(2.2);
  const [handle1Z, setHandle1Z] = useState<number>(0.8);
  const [handle2X, setHandle2X] = useState<number>(1.5);
  const [handle2Y, setHandle2Y] = useState<number>(2.0);
  const [handle2Z, setHandle2Z] = useState<number>(-0.8);

  // Mode 2: Text on path parameters
  const [textSpacing, setTextSpacing] = useState<number>(1.2);
  const [waveFrequency, setWaveFrequency] = useState<number>(1.5);
  const [waveAmplitude, setWaveAmplitude] = useState<number>(1.4);

  // Viewport states
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isPlayingAnim, setIsPlayingAnim] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090d16);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 3, 9);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 1.8);
    dirLight1.position.set(6, 10, 8);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf43f5e, 1.2);
    dirLight2.position.set(-6, -4, -6);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x10b981, 1.5, 20);
    pointLight.position.set(0, 2, 3);
    scene.add(pointLight);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(12, 24, 0x334155, 0x1e293b);
    gridHelper.position.y = -2;
    scene.add(gridHelper);

    // Root Group for dynamic elements
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // ==========================================
    // BUILD MODE 1: 3D BÉZIER SCULPTOR
    // ==========================================
    const buildBezierScene = () => {
      const p0 = new THREE.Vector3(-3.5, -0.5, 0);
      const p1 = new THREE.Vector3(p0.x + handle1X, p0.y + handle1Y, p0.z + handle1Z);
      const p3 = new THREE.Vector3(3.5, -0.5, 0);
      // If smooth, handle 2 can optionally be symmetric or controlled
      const p2 =
        nodeType === 'smooth'
          ? new THREE.Vector3(p3.x - handle1X, p3.y + handle1Y, p3.z - handle1Z)
          : new THREE.Vector3(p3.x + handle2X, p3.y + handle2Y, p3.z + handle2Z);

      // Curve
      const curve = new THREE.CubicBezierCurve3(p0, p1, p2, p3);
      const points = curve.getPoints(80);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);
      const curveMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        linewidth: 4
      });
      const curveLine = new THREE.Line(curveGeo, curveMat);
      rootGroup.add(curveLine);

      // Thick extruded tube around curve
      const tubeGeo = new THREE.TubeGeometry(curve, 80, 0.08, 12, false);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.3,
        metalness: 0.2,
        wireframe: wireframe
      });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      tubeMesh.castShadow = true;
      rootGroup.add(tubeMesh);

      // Tangent Rods (Lines connecting Endpoints to Direction Handles)
      const rod1Geo = new THREE.BufferGeometry().setFromPoints([p0, p1]);
      const rod1Mat = new THREE.LineDashedMaterial({ color: 0xf59e0b, dashSize: 0.2, gapSize: 0.1 });
      const rod1 = new THREE.Line(rod1Geo, rod1Mat);
      rod1.computeLineDistances();
      rootGroup.add(rod1);

      const rod2Geo = new THREE.BufferGeometry().setFromPoints([p3, p2]);
      const rod2Mat = new THREE.LineDashedMaterial({ color: 0xf59e0b, dashSize: 0.2, gapSize: 0.1 });
      const rod2 = new THREE.Line(rod2Geo, rod2Mat);
      rod2.computeLineDistances();
      rootGroup.add(rod2);

      // Anchor End Nodes P0 & P3 (Solid emerald spheres)
      const anchorGeo = new THREE.SphereGeometry(0.22, 24, 24);
      const anchorMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.2 });

      const node0 = new THREE.Mesh(anchorGeo, anchorMat);
      node0.position.copy(p0);
      rootGroup.add(node0);

      const node3 = new THREE.Mesh(anchorGeo, anchorMat);
      node3.position.copy(p3);
      rootGroup.add(node3);

      // Direction Handles P1 & P2 (Amber diamond/sphere)
      const handleGeo =
        nodeType === 'smooth'
          ? new THREE.SphereGeometry(0.18, 16, 16)
          : new THREE.OctahedronGeometry(0.2, 0);
      const handleMat = new THREE.MeshStandardMaterial({
        color: nodeType === 'smooth' ? 0xf59e0b : 0xf43f5e,
        roughness: 0.3
      });

      const handle1Mesh = new THREE.Mesh(handleGeo, handleMat);
      handle1Mesh.position.copy(p1);
      rootGroup.add(handle1Mesh);

      const handle2Mesh = new THREE.Mesh(handleGeo, handleMat);
      handle2Mesh.position.copy(p2);
      rootGroup.add(handle2Mesh);

      // Traveling sphere marker along curve
      const travelGeo = new THREE.SphereGeometry(0.15, 16, 16);
      const travelMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const travelMesh = new THREE.Mesh(travelGeo, travelMat);
      rootGroup.add(travelMesh);

      // Store reference to curve for animation loop
      (rootGroup as any)._curve = curve;
      (rootGroup as any)._travelMesh = travelMesh;
    };

    // ==========================================
    // BUILD MODE 2: 3D KINETIC TEXT ON PATH (Text / Put on Path)
    // ==========================================
    const buildTextOnPathScene = () => {
      // 3D Spline Path
      const splinePoints = [
        new THREE.Vector3(-4.5, -0.8 * waveAmplitude, -1.5),
        new THREE.Vector3(-2.2, 1.5 * waveAmplitude, 0.8),
        new THREE.Vector3(0, -0.6 * waveAmplitude, 1.2),
        new THREE.Vector3(2.2, 1.6 * waveAmplitude, -0.6),
        new THREE.Vector3(4.5, -0.5 * waveAmplitude, 0.5)
      ];
      const pathCurve = new THREE.CatmullRomCurve3(splinePoints);
      pathCurve.curveType = 'centripetal';

      // Tube representing the guide curve
      const tubeGeo = new THREE.TubeGeometry(pathCurve, 100, 0.05, 12, false);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: 0x64748b,
        roughness: 0.5,
        wireframe: wireframe
      });
      const tube = new THREE.Mesh(tubeGeo, tubeMat);
      rootGroup.add(tube);

      // Kinetic Character Glyphs following path
      const sampleText =
        bilingualMode === 'en'
          ? 'CONNECTING KNOWLEDGE • INFORMATICS 10 • LESSON 14: PATHS & TEXT'
          : 'KẾT NỐI TRI THỨC • TIN HỌC 10 • BÀI 14: ĐƯỜNG & VĂN BẢN';
      const chars = sampleText.split('');
      const charCount = Math.min(chars.length, 36);

      const charMaterials = [
        new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2 }),
        new THREE.MeshStandardMaterial({ color: 0x34d399, roughness: 0.2 }),
        new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.2 }),
        new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.2 })
      ];

      const charMeshes: THREE.Mesh[] = [];

      for (let i = 0; i < charCount; i++) {
        // Create 3D rectangular badge representing each glyph
        const badgeGeo = new THREE.BoxGeometry(0.32, 0.42, 0.08);
        const mat = charMaterials[i % charMaterials.length];
        const mesh = new THREE.Mesh(badgeGeo, mat);
        mesh.castShadow = true;
        rootGroup.add(mesh);
        charMeshes.push(mesh);
      }

      (rootGroup as any)._pathCurve = pathCurve;
      (rootGroup as any)._charMeshes = charMeshes;
      (rootGroup as any)._charCount = charCount;
    };

    // ==========================================
    // BUILD MODE 3: 3D PROCEDURAL LEAF & BANNER
    // ==========================================
    const buildLeafBannerScene = () => {
      // 1. Procedural 3D Leaf Surface
      const leafShape = new THREE.Shape();
      leafShape.moveTo(0, -2);
      // Right flank: smooth swelling curve to pointed apex (0, 2.2)
      leafShape.bezierCurveTo(2.2, -1.2, 2.4, 1.2, 0, 2.2);
      // Left flank: mirror curve back down to bottom stalk
      leafShape.bezierCurveTo(-2.4, 1.2, -2.2, -1.2, 0, -2);

      const extrudeSettings = {
        steps: 2,
        depth: 0.15,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.04,
        bevelSegments: 4
      };

      const leafGeo = new THREE.ExtrudeGeometry(leafShape, extrudeSettings);
      const leafMat = new THREE.MeshStandardMaterial({
        color: 0x16a34a,
        roughness: 0.35,
        metalness: 0.1,
        wireframe: wireframe
      });
      const leafMesh = new THREE.Mesh(leafGeo, leafMat);
      leafMesh.position.set(-2, 0, 0);
      leafMesh.rotation.z = 0.15;
      leafMesh.castShadow = true;
      rootGroup.add(leafMesh);

      // Central stem vein
      const stemCurve = new THREE.LineCurve3(
        new THREE.Vector3(-2, -2.4, 0.08),
        new THREE.Vector3(-2, 2.2, 0.08)
      );
      const stemGeo = new THREE.TubeGeometry(stemCurve, 20, 0.04, 8, false);
      const stemMat = new THREE.MeshStandardMaterial({ color: 0x86efac, roughness: 0.3 });
      const stemMesh = new THREE.Mesh(stemGeo, stemMat);
      rootGroup.add(stemMesh);

      // 2. Festive 3D Banners along Arched Bézier Curve (Task 2)
      const bannerArch = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0.5, 0.5, 0),
        new THREE.Vector3(2.8, 2.6, 0.8),
        new THREE.Vector3(5.0, 0.5, 0)
      );

      const archTube = new THREE.TubeGeometry(bannerArch, 40, 0.03, 8, false);
      const archMesh = new THREE.Mesh(
        archTube,
        new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
      );
      rootGroup.add(archMesh);

      // Triangle Pennants hanging from arch
      const pennantColors = [0xef4444, 0x3b82f6, 0x10b981, 0xf59e0b, 0x8b5cf6];
      for (let i = 0; i < 7; i++) {
        const t = (i + 0.5) / 7;
        const pt = bannerArch.getPoint(t);
        const triShape = new THREE.Shape();
        triShape.moveTo(-0.25, 0);
        triShape.lineTo(0.25, 0);
        triShape.lineTo(0, -0.6);
        triShape.closePath();

        const triGeo = new THREE.ShapeGeometry(triShape);
        const triMat = new THREE.MeshStandardMaterial({
          color: pennantColors[i % pennantColors.length],
          side: THREE.DoubleSide
        });
        const triMesh = new THREE.Mesh(triGeo, triMat);
        triMesh.position.copy(pt);
        triMesh.rotation.y = Math.sin(t * Math.PI) * 0.2;
        rootGroup.add(triMesh);
      }
    };

    // Construct according to activeMode
    if (activeMode === 'bezier') {
      buildBezierScene();
    } else if (activeMode === 'textOnPath') {
      buildTextOnPathScene();
    } else {
      buildLeafBannerScene();
    }

    // Interactive Drag Orbit
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      rootGroup.rotation.y += deltaX * 0.008;
      rootGroup.rotation.x += deltaY * 0.008;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation loop
    let frameId = 0;
    let animClock = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      if (autoRotate && !isDragging) {
        rootGroup.rotation.y += 0.004;
      }

      if (isPlayingAnim) {
        animClock += 0.015;

        // Animate traveling sphere in Mode 1
        if (activeMode === 'bezier' && (rootGroup as any)._curve && (rootGroup as any)._travelMesh) {
          const t = (Math.sin(animClock * 1.5) + 1) / 2;
          const pos = (rootGroup as any)._curve.getPoint(t);
          (rootGroup as any)._travelMesh.position.copy(pos);
        }

        // Animate flowing characters in Mode 2
        if (
          activeMode === 'textOnPath' &&
          (rootGroup as any)._pathCurve &&
          (rootGroup as any)._charMeshes
        ) {
          const curve: THREE.CatmullRomCurve3 = (rootGroup as any)._pathCurve;
          const meshes: THREE.Mesh[] = (rootGroup as any)._charMeshes;
          const count: number = (rootGroup as any)._charCount;

          meshes.forEach((mesh, idx) => {
            const rawT = (animClock * 0.2 + (idx * textSpacing) / count) % 1;
            const t = rawT < 0 ? rawT + 1 : rawT;
            const pos = curve.getPoint(t);
            const tangent = curve.getTangent(t);
            mesh.position.copy(pos);
            mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tangent);
          });
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
      renderer.dispose();
    };
  }, [
    activeMode,
    nodeType,
    handle1X,
    handle1Y,
    handle1Z,
    handle2X,
    handle2Y,
    handle2Z,
    textSpacing,
    waveFrequency,
    waveAmplitude,
    wireframe,
    autoRotate,
    isPlayingAnim
  ]);

  return (
    <div
      className={`relative w-full rounded-3xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[520px] my-6'
      }`}
    >
      {/* 3D WebGL Canvas */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Floating Header & Mode Selector */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-700 shadow-lg">
          <div className="p-1.5 rounded-xl bg-cyan-500/20 text-cyan-400">
            <Compass className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Three.js 3D Bézier & Text Engine</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <p className="text-[10px] text-slate-400 font-mono">
              Inkscape Node & Kinetic Text Lab
            </p>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-1 pointer-events-auto bg-slate-900/90 backdrop-blur-md p-1 rounded-2xl border border-slate-700 shadow-lg">
          <button
            onClick={() => setActiveMode('bezier')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeMode === 'bezier'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>
              <BilingualText vi="Đường cong Bézier" en="Bézier Sculptor" />
            </span>
          </button>

          <button
            onClick={() => setActiveMode('textOnPath')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeMode === 'textOnPath'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>
              <BilingualText vi="Chữ uốn theo đường" en="Text on Path" />
            </span>
          </button>

          <button
            onClick={() => setActiveMode('leafBanner')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeMode === 'leafBanner'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Flower2 className="w-3.5 h-3.5" />
            <span>
              <BilingualText vi="Chiếc lá & Cờ tiệc" en="Leaf & Banners" />
            </span>
          </button>
        </div>

        {/* Viewport Action Buttons */}
        <div className="flex items-center gap-1.5 pointer-events-auto bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-1.5 rounded-xl text-xs transition-colors ${
              autoRotate ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:text-white'
            }`}
            title="Auto Rotate"
          >
            <RotateCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsPlayingAnim(!isPlayingAnim)}
            className={`p-1.5 rounded-xl text-xs transition-colors ${
              isPlayingAnim ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'
            }`}
            title="Toggle Animation"
          >
            {isPlayingAnim ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setWireframe(!wireframe)}
            className={`p-1.5 rounded-xl text-xs transition-colors ${
              wireframe ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:text-white'
            }`}
            title="Wireframe"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white transition-colors"
            title="Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Bottom Floating Interactive Controller Panel */}
      <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
        <div className="pointer-events-auto max-w-xl mx-auto bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl border border-slate-700/80 shadow-2xl space-y-3">
          {/* Mode 1 Controls */}
          {activeMode === 'bezier' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                <span className="font-bold text-white flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  <BilingualText
                    vi="Loại điểm neo & Cần chỉ hướng:"
                    en="Node Type & Tangent Handles:"
                  />
                </span>
                <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-xl">
                  <button
                    onClick={() => setNodeType('smooth')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                      nodeType === 'smooth'
                        ? 'bg-cyan-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <BilingualText vi="Neo trơn (Smooth)" en="Smooth Node" />
                  </button>
                  <button
                    onClick={() => setNodeType('corner')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                      nodeType === 'corner'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <BilingualText vi="Neo góc (Corner)" en="Corner Node" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 font-semibold mb-1">
                    <span>
                      <BilingualText vi="Độ căng cần 1 (Height Y):" en="Handle 1 Tension (Height Y):" />
                    </span>
                    <span className="font-mono text-cyan-400">{handle1Y.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="4.0"
                    step="0.1"
                    value={handle1Y}
                    onChange={(e) => setHandle1Y(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-slate-300 font-semibold mb-1">
                    <span>
                      <BilingualText vi="Độ lệch 3D Z-Offset:" en="3D Z offset:" />
                    </span>
                    <span className="font-mono text-cyan-400">{handle1Z.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="-2.0"
                    max="2.0"
                    step="0.1"
                    value={handle1Z}
                    onChange={(e) => setHandle1Z(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Mode 2 Controls */}
          {activeMode === 'textOnPath' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                <span className="font-bold text-white flex items-center gap-2">
                  <Type className="w-3.5 h-3.5 text-indigo-400" />
                  <BilingualText
                    vi="Thông số Text/Put on Path & Khoảng cách kí tự:"
                    en="Text on Path Spacing & Curve Geometry:"
                  />
                </span>
                <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded-md border border-indigo-800">
                  Text / Put on Path
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 font-semibold mb-1">
                    <span>
                      <BilingualText vi="Khoảng cách kí tự (Kerning):" en="Character Spacing (Kerning):" />
                    </span>
                    <span className="font-mono text-indigo-400">{textSpacing.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.6"
                    max="2.2"
                    step="0.1"
                    value={textSpacing}
                    onChange={(e) => setTextSpacing(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-slate-300 font-semibold mb-1">
                    <span>
                      <BilingualText vi="Biên độ sóng (Wave Amp):" en="Wave Amplitude (Wave Amp):" />
                    </span>
                    <span className="font-mono text-indigo-400">{waveAmplitude.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2.5"
                    step="0.1"
                    value={waveAmplitude}
                    onChange={(e) => setWaveAmplitude(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Mode 3 Controls */}
          {activeMode === 'leafBanner' && (
            <div className="flex items-center justify-between text-xs">
              <div>
                <h4 className="font-bold text-white">
                  <BilingualText
                    vi="Nhiệm vụ 1 & 2: Vẽ chiếc lá & Cờ tiệc"
                    en="Lab 1 & 2: Leaf & Banners on Path"
                  />
                </h4>
                <p className="text-[11px] text-slate-400">
                  <BilingualText
                    vi="Biến đổi hình khối sang đường (Object to Path) & uốn cong dải cờ"
                    en="Object to Path node sculpting & festoon pennants alignment"
                  />
                </p>
              </div>
              <button
                onClick={() => setWireframe(!wireframe)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-md"
              >
                <BilingualText
                  vi={wireframe ? 'Tô bề mặt' : 'Khung lưới Wireframe'}
                  en={wireframe ? 'Shaded Surface' : 'Wireframe Grid'}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
