import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  RotateCcw,
  Sparkles,
  Layers,
  Sun,
  Maximize2,
  Sliders,
  Shapes,
  Scissors,
  CheckCircle2,
  Eye,
  Info
} from 'lucide-react';
import { BilingualText } from '../BilingualText';

type ViewMode = 'boolean' | 'sphere' | 'star';
type BooleanOp = 'union' | 'difference' | 'intersection' | 'exclusion' | 'division' | 'cut_path';

export const BooleanGeometry3DViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  // Active viewing tab
  const [activeMode, setActiveMode] = useState<ViewMode>('boolean');

  // Mode 1: Boolean parameters
  const [selectedOp, setSelectedOp] = useState<BooleanOp>('difference');
  const [explodeOffset, setExplodeOffset] = useState<number>(0.3);
  const [wireframe, setWireframe] = useState<boolean>(false);

  // Mode 2: Sphere lighting parameters (Task 3)
  const [lightAngle, setLightAngle] = useState<number>(45);
  const [spotIntensity, setSpotIntensity] = useState<number>(1.2);
  const [roughness, setRoughness] = useState<number>(0.35);

  // Mode 3: Parametric Star parameters (Hoạt động 1 & Luyện tập 1)
  const [starCorners, setStarCorners] = useState<number>(5);
  const [starSpokeRatio, setStarSpokeRatio] = useState<number>(0.4);
  const [starRounded, setStarRounded] = useState<number>(0.0);
  const [starExtrude, setStarExtrude] = useState<number>(0.4);

  // Auto-rotation toggle
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  // References for live update
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const dynamicGroupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Rotation drag state
  const isDraggingRef = useRef<boolean>(false);
  const prevMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotRef = useRef<{ x: number; y: number }>({ x: 0.35, y: -0.45 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software GL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || 640;
    const height = container.clientHeight || 420;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 2.2, 5.8);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSoftwareGl ? 1 : 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Dynamic subject group
    const dynamicGroup = new THREE.Group();
    scene.add(dynamicGroup);
    dynamicGroupRef.current = dynamicGroup;

    // Lighting rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff7ed, 1.8);
    dirLight.position.set(4, 6, 5);
    dirLight.castShadow = !isSoftwareGl;
    scene.add(dirLight);

    const blueRimLight = new THREE.DirectionalLight(0x38bdf8, 1.0);
    blueRimLight.position.set(-5, -2, -3);
    scene.add(blueRimLight);

    // Floor shadow catcher grid
    const grid = new THREE.GridHelper(8, 16, 0x94a3b8, 0xe2e8f0);
    grid.position.y = -1.4;
    scene.add(grid);

    // Animation loop
    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      if (autoRotate && !isDraggingRef.current) {
        rotRef.current.y += 0.006;
      }

      if (dynamicGroupRef.current) {
        dynamicGroupRef.current.rotation.x = rotRef.current.x;
        dynamicGroupRef.current.rotation.y = rotRef.current.y;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Mouse drag handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - prevMouseRef.current.x;
      const dy = e.clientY - prevMouseRef.current.y;
      rotRef.current.y += dx * 0.008;
      rotRef.current.x = Math.max(-1.2, Math.min(1.2, rotRef.current.x + dy * 0.008));
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Touch handlers for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prevMouseRef.current.x;
      const dy = e.touches[0].clientY - prevMouseRef.current.y;
      rotRef.current.y += dx * 0.008;
      rotRef.current.x = Math.max(-1.2, Math.min(1.2, rotRef.current.x + dy * 0.008));
      prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    dom.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    // Resize listener
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      dom.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);

      // Dispose scene
      scene.clear();
      renderer.dispose();
    };
  }, []);

  // Update 3D Geometry when mode or parameters change
  useEffect(() => {
    const group = dynamicGroupRef.current;
    if (!group) return;

    // Clear previous children
    while (group.children.length > 0) {
      const child = group.children[0] as THREE.Mesh;
      group.remove(child);
      if (child.geometry) child.geometry.dispose();
      if (Array.isArray(child.material)) {
        child.material.forEach((m) => m.dispose());
      } else if (child.material) {
        child.material.dispose();
      }
    }

    if (activeMode === 'boolean') {
      // ---------------------------------------------------------------
      // MODE 1: 3D BOOLEAN OPERATIONS STUDIO (Hình 13.6 SGK Trang 72)
      // Base: Red/Orange Rounded Box (Bottom Layer)
      // Cutter: Blue/Cyan Cylinder/Sphere (Top Layer)
      // ---------------------------------------------------------------
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0xe11d48, // Rose Red (Màu lớp dưới)
        roughness: 0.3,
        metalness: 0.1,
        wireframe: wireframe
      });

      const cutterMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7, // Sky Blue (Màu lớp trên)
        roughness: 0.3,
        metalness: 0.1,
        transparent: true,
        opacity: selectedOp === 'difference' || selectedOp === 'cut_path' ? 0.35 : 0.85,
        wireframe: wireframe
      });

      const goldMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b, // Amber gold for intersection/result
        roughness: 0.25,
        metalness: 0.2,
        wireframe: wireframe
      });

      if (selectedOp === 'union') {
        // Path -> Union (Ctrl + +): Merged smooth composite
        const boxGeo = new THREE.BoxGeometry(1.8, 1.8, 0.45);
        const boxMesh = new THREE.Mesh(boxGeo, baseMat);
        boxMesh.position.set(-0.35, -0.2, 0);
        group.add(boxMesh);

        const circleGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.46, 32);
        circleGeo.rotateX(Math.PI / 2);
        const circleMesh = new THREE.Mesh(circleGeo, baseMat);
        circleMesh.position.set(0.45, 0.3, 0);
        group.add(circleMesh);
      } else if (selectedOp === 'difference') {
        // Path -> Difference (Ctrl + -): Red box punched out by cutter
        // Procedurally construct punched block via Shape + Hole
        const shape = new THREE.Shape();
        shape.moveTo(-1.1, -1.1);
        shape.lineTo(1.1, -1.1);
        shape.lineTo(1.1, 1.1);
        shape.lineTo(-1.1, 1.1);
        shape.closePath();

        const hole = new THREE.Path();
        const holeR = 0.8;
        hole.absarc(0.45, 0.45, holeR, 0, Math.PI * 2, true);
        shape.holes.push(hole);

        const extrudeSettings = { depth: 0.4, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.05, bevelThickness: 0.05 };
        const punchedGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        punchedGeo.center();
        const punchedMesh = new THREE.Mesh(punchedGeo, baseMat);
        group.add(punchedMesh);

        // Ghost cutter cylinder showing subtraction process
        const ghostGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.8, 32);
        ghostGeo.rotateX(Math.PI / 2);
        const ghostMesh = new THREE.Mesh(ghostGeo, cutterMat);
        ghostMesh.position.set(0.45, 0.45, 0.5 + explodeOffset * 1.5);
        group.add(ghostMesh);
      } else if (selectedOp === 'intersection') {
        // Path -> Intersection (Ctrl + *): Only shared intersecting lens
        const lensGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.45, 32, 1, false, 0, Math.PI / 1.3);
        lensGeo.rotateX(Math.PI / 2);
        lensGeo.center();
        const lensMesh = new THREE.Mesh(lensGeo, goldMat);
        group.add(lensMesh);

        // Ghost outlines
        const ghostWireMat = new THREE.MeshBasicMaterial({ color: 0x94a3b8, wireframe: true, transparent: true, opacity: 0.3 });
        const ghostBox = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.8, 0.4), ghostWireMat);
        ghostBox.position.set(-0.3, -0.3, 0);
        group.add(ghostBox);
        const ghostCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.42, 32), ghostWireMat);
        ghostCyl.rotateX(Math.PI / 2);
        ghostCyl.position.set(0.3, 0.3, 0);
        group.add(ghostCyl);
      } else if (selectedOp === 'exclusion') {
        // Path -> Exclusion (Ctrl + ^): Outer parts kept, central intersection hollowed
        const leftShape = new THREE.Shape();
        leftShape.moveTo(-1.2, -1.0);
        leftShape.lineTo(-0.1, -1.0);
        leftShape.lineTo(-0.1, 1.0);
        leftShape.lineTo(-1.2, 1.0);
        leftShape.closePath();
        const leftMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(leftShape, { depth: 0.35, bevelEnabled: false }), baseMat);
        leftMesh.position.x = -explodeOffset * 0.5;
        group.add(leftMesh);

        const rightCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.35, 32, 1, false, Math.PI * 0.4, Math.PI * 1.2), cutterMat);
        rightCyl.rotateX(Math.PI / 2);
        rightCyl.position.set(0.4 + explodeOffset * 0.5, 0.2, 0);
        group.add(rightCyl);
      } else if (selectedOp === 'division') {
        // Path -> Division (Ctrl + /): Sliced into 2 split segments
        const seg1Geo = new THREE.BoxGeometry(1.2, 1.8, 0.4);
        const seg1Mesh = new THREE.Mesh(seg1Geo, baseMat);
        seg1Mesh.position.set(-0.7 - explodeOffset * 0.8, 0, 0);
        group.add(seg1Mesh);

        const seg2Geo = new THREE.CylinderGeometry(0.8, 0.8, 0.4, 32);
        seg2Geo.rotateX(Math.PI / 2);
        const seg2Mesh = new THREE.Mesh(seg2Geo, cutterMat);
        seg2Mesh.position.set(0.7 + explodeOffset * 0.8, 0, 0);
        group.add(seg2Mesh);
      } else if (selectedOp === 'cut_path') {
        // Path -> Cut Path (Ctrl + Alt + /): Open detached strokes
        const curve1 = new THREE.LineCurve3(new THREE.Vector3(-1.2, -1.0, 0), new THREE.Vector3(-1.2, 1.0, 0));
        const curve2 = new THREE.LineCurve3(new THREE.Vector3(-1.2, 1.0, 0), new THREE.Vector3(0.3, 1.0, 0));
        const tubeGeo1 = new THREE.TubeGeometry(curve1, 10, 0.05, 8, false);
        const tubeGeo2 = new THREE.TubeGeometry(curve2, 10, 0.05, 8, false);
        const lineMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2 });
        group.add(new THREE.Mesh(tubeGeo1, lineMat));
        group.add(new THREE.Mesh(tubeGeo2, lineMat));

        const arcCurve = new THREE.ArcCurve(0.3, 0.3, 0.8, 0, Math.PI * 1.5, false);
        const points = arcCurve.getPoints(32).map((p) => new THREE.Vector3(p.x, p.y, 0));
        const arcPath = new THREE.CatmullRomCurve3(points);
        const arcTube = new THREE.TubeGeometry(arcPath, 32, 0.05, 8, false);
        const arcMat = new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.2 });
        group.add(new THREE.Mesh(arcTube, arcMat));
      }
    } else if (activeMode === 'sphere') {
      // ---------------------------------------------------------------
      // MODE 2: RADIAL GRADIENT & SHADING SPHERE (Nhiệm vụ 3 SGK Trang 73)
      // Visualizing highlight, core shadow, and ambient reflection
      // ---------------------------------------------------------------
      const sphereGeo = new THREE.SphereGeometry(1.4, 64, 64);

      // Custom physical shader simulating Inkscape Radial Gradient depth
      const sphereMat = new THREE.MeshPhysicalMaterial({
        color: 0x1e293b, // Dark navy base shadow
        emissive: 0x0f172a,
        roughness: roughness,
        metalness: 0.1,
        clearcoat: 0.6,
        clearcoatRoughness: 0.2,
        wireframe: wireframe
      });

      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      sphereMesh.position.set(0, 0.1, 0);
      group.add(sphereMesh);

      // Highlight focal spot (mimicking Inkscape Gradient Pin)
      const rad = (lightAngle * Math.PI) / 180;
      const spotX = Math.cos(rad) * 0.7;
      const spotY = Math.sin(rad) * 0.7;
      const spotZ = 1.25;

      const spotGeo = new THREE.SphereGeometry(0.18 * spotIntensity, 16, 16);
      const spotMat = new THREE.MeshBasicMaterial({ color: 0xfffbeb });
      const spotMesh = new THREE.Mesh(spotGeo, spotMat);
      spotMesh.position.set(spotX, spotY, spotZ);
      group.add(spotMesh);

      // Shadow disc on bottom
      const discGeo = new THREE.CylinderGeometry(1.6, 1.8, 0.05, 32);
      const discMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.8 });
      const discMesh = new THREE.Mesh(discGeo, discMat);
      discMesh.position.set(0, -1.38, 0);
      group.add(discMesh);

      // Yellow backdrop frame (matching Hình 13.12)
      const frameGeo = new THREE.BoxGeometry(3.6, 3.6, 0.08);
      const frameMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.4 });
      const frameMesh = new THREE.Mesh(frameGeo, frameMat);
      frameMesh.position.set(0, 0, -1.45);
      group.add(frameMesh);
    } else if (activeMode === 'star') {
      // ---------------------------------------------------------------
      // MODE 3: PARAMETRIC STAR & POLYGON STUDIO (Hoạt động 1 & Luyện tập 1)
      // Generates mathematically parameterized star with Rounded smoothing
      // ---------------------------------------------------------------
      const starShape = new THREE.Shape();
      const n = Math.max(3, starCorners);
      const outerR = 1.4;
      const innerR = 1.4 * starSpokeRatio;
      const totalPoints = n * 2;

      const rawPoints: { x: number; y: number }[] = [];
      for (let i = 0; i < totalPoints; i++) {
        const angle = (i * Math.PI) / n - Math.PI / 2;
        const r = i % 2 === 0 ? outerR : innerR;
        rawPoints.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r });
      }

      // If rounded > 0, blend corners with cubic bezier tangents
      if (starRounded > 0.05) {
        starShape.moveTo(rawPoints[0].x, rawPoints[0].y);
        for (let i = 0; i < totalPoints; i++) {
          const curr = rawPoints[i];
          const next = rawPoints[(i + 1) % totalPoints];
          const midX = (curr.x + next.x) * 0.5;
          const midY = (curr.y + next.y) * 0.5;
          const cpX = midX * (1 - starRounded * 0.4);
          const cpY = midY * (1 - starRounded * 0.4);
          starShape.quadraticCurveTo(cpX, cpY, next.x, next.y);
        }
      } else {
        starShape.moveTo(rawPoints[0].x, rawPoints[0].y);
        for (let i = 1; i < totalPoints; i++) {
          starShape.lineTo(rawPoints[i].x, rawPoints[i].y);
        }
        starShape.closePath();
      }

      const extrudeSettings = {
        depth: starExtrude,
        bevelEnabled: true,
        bevelSegments: 4,
        steps: 1,
        bevelSize: 0.06,
        bevelThickness: 0.06
      };

      const starGeo = new THREE.ExtrudeGeometry(starShape, extrudeSettings);
      starGeo.center();

      const starMat = new THREE.MeshStandardMaterial({
        color: starRounded > 0.3 ? 0xe11d48 : 0xf59e0b, // Red petal if flower, Amber if sharp star
        roughness: 0.25,
        metalness: 0.15,
        wireframe: wireframe
      });

      const starMesh = new THREE.Mesh(starGeo, starMat);
      group.add(starMesh);

      // Add center yellow pollen circle if flower-like (Luyện tập 1)
      if (starRounded > 0.2) {
        const centerCircleGeo = new THREE.CylinderGeometry(0.45, 0.45, starExtrude + 0.16, 32);
        centerCircleGeo.rotateX(Math.PI / 2);
        const centerCircleMat = new THREE.MeshStandardMaterial({
          color: 0xfacc15,
          roughness: 0.3,
          metalness: 0.1
        });
        const centerMesh = new THREE.Mesh(centerCircleGeo, centerCircleMat);
        centerMesh.position.z = 0.05;
        group.add(centerMesh);
      }
    }
  }, [
    activeMode,
    selectedOp,
    explodeOffset,
    wireframe,
    lightAngle,
    spotIntensity,
    roughness,
    starCorners,
    starSpokeRatio,
    starRounded,
    starExtrude
  ]);

  const handleResetCamera = () => {
    rotRef.current = { x: 0.35, y: -0.45 };
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 2.2, 5.8);
      cameraRef.current.lookAt(0, 0, 0);
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col space-y-0">
      {/* Top Header Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-900/90">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
            <Shapes className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-extrabold uppercase tracking-wider border border-indigo-500/30">
                Three.js WebGL 3D Lab
              </span>
              <span className="text-xs text-slate-400 font-mono">Bài 13 SGK Trang 69–74</span>
            </div>
            <h3 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
              <BilingualText
                vi="Mô phỏng 3D: Phép Ghép Hình Học & Tô Màu Khối"
                en="3D Simulation: Boolean Operations & Volumetric Shading"
              />
            </h3>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/60 text-xs font-bold">
          <button
            onClick={() => setActiveMode('boolean')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === 'boolean'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>
              <BilingualText vi="6 Phép ghép (Path)" en="6 Boolean Ops" />
            </span>
          </button>

          <button
            onClick={() => setActiveMode('sphere')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === 'sphere'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>
              <BilingualText vi="Khối cầu 3D (NV 3)" en="3D Sphere (Task 3)" />
            </span>
          </button>

          <button
            onClick={() => setActiveMode('star')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === 'star'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              <BilingualText vi="Tham số Sao / Hoa" en="Parametric Star" />
            </span>
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Area */}
      <div className="relative w-full h-[380px] sm:h-[440px] bg-radial from-slate-800 to-slate-950 flex items-center justify-center overflow-hidden">
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Floating Quick Action Overlay */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={() => setWireframe(!wireframe)}
            className={`p-2 rounded-xl text-xs font-semibold backdrop-blur-md transition-all border ${
              wireframe
                ? 'bg-indigo-600/60 border-indigo-400 text-white'
                : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:text-white'
            }`}
            title="Bật/tắt khung dây wireframe"
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-2 rounded-xl text-xs font-semibold backdrop-blur-md transition-all border ${
              autoRotate
                ? 'bg-emerald-600/60 border-emerald-400 text-white'
                : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:text-white'
            }`}
            title="Tự động xoay quanh tâm"
          >
            <RotateCcw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleResetCamera}
            className="p-2 rounded-xl text-xs font-semibold bg-slate-900/60 border border-slate-700/60 text-slate-300 hover:text-white backdrop-blur-md"
            title="Khôi phục góc nhìn chuẩn"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Instructional Callout */}
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto max-w-md p-3 rounded-2xl bg-slate-900/80 border border-slate-700/60 backdrop-blur-md text-xs text-slate-300 space-y-1 shadow-lg pointer-events-none">
          <div className="font-bold text-white flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>
              {activeMode === 'boolean'
                ? selectedOp === 'union'
                  ? 'Phép hợp (Union - Ctrl++): Gộp liền tất cả các hình'
                  : selectedOp === 'difference'
                  ? 'Phép hiệu (Difference - Ctrl+-): Hình trên đục thủng hình dưới'
                  : selectedOp === 'intersection'
                  ? 'Phép giao (Intersection - Ctrl+*): Giữ phần chung trùng nhau'
                  : selectedOp === 'exclusion'
                  ? 'Phép hiệu đối xứng (Exclusion - Ctrl+^): Phần giao bị rỗng'
                  : selectedOp === 'division'
                  ? 'Phép chia (Division - Ctrl+/): Cắt hình dưới thành các mảng rời'
                  : 'Phép cắt (Cut Path - Ctrl+Alt+/): Tách rời các đoạn đường viền'
                : activeMode === 'sphere'
                ? 'Nhiệm vụ 3: Màu chuyển Radial gradient tạo cảm giác nổi khối 3D'
                : 'Hoạt động 1: Tăng giá trị Rounded biến cánh nhọn thành cánh hoa'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">
            {activeMode === 'boolean'
              ? 'Kéo giữ chuột để xoay 360 độ quan sát vết cắt xuyên tâm không gian ba chiều.'
              : activeMode === 'sphere'
              ? 'Tùy chỉnh góc chiếu sáng để quan sát vùng sáng (Highlight) và vùng tối (Core Shadow).'
              : 'Điều chỉnh Corners và Rounded để quan sát thuật toán uốn cong đỉnh hình học.'}
          </p>
        </div>
      </div>

      {/* Interactive Control Console */}
      <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800">
        {activeMode === 'boolean' && (
          <div className="space-y-4">
            {/* 6 Operation Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {[
                { id: 'union', labelVi: 'Hợp (Union)', labelEn: 'Union', shortcut: 'Ctrl ++', color: 'from-blue-600 to-indigo-600' },
                { id: 'difference', labelVi: 'Hiệu (Difference)', labelEn: 'Difference', shortcut: 'Ctrl +-', color: 'from-rose-600 to-red-600' },
                { id: 'intersection', labelVi: 'Giao (Intersection)', labelEn: 'Intersection', shortcut: 'Ctrl +*', color: 'from-amber-600 to-yellow-600' },
                { id: 'exclusion', labelVi: 'Hiệu ĐX (Exclusion)', labelEn: 'Exclusion', shortcut: 'Ctrl +^', color: 'from-purple-600 to-indigo-600' },
                { id: 'division', labelVi: 'Chia (Division)', labelEn: 'Division', shortcut: 'Ctrl +/', color: 'from-emerald-600 to-teal-600' },
                { id: 'cut_path', labelVi: 'Cắt (Cut Path)', labelEn: 'Cut Path', shortcut: 'Ctrl +Alt+/', color: 'from-cyan-600 to-blue-600' }
              ].map((op) => (
                <button
                  key={op.id}
                  onClick={() => setSelectedOp(op.id as BooleanOp)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedOp === op.id
                      ? `bg-gradient-to-br ${op.color} text-white border-transparent shadow-lg scale-[1.02]`
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
                  }`}
                >
                  <div className="text-xs font-bold leading-tight truncate">
                    <BilingualText vi={op.labelVi} en={op.labelEn} />
                  </div>
                  <div className="text-[10px] font-mono text-slate-300/80 mt-1">
                    {op.shortcut}
                  </div>
                </button>
              ))}
            </div>

            {/* Subtraction/Explosion Slider */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-400" />
                <span className="font-semibold text-slate-300">
                  <BilingualText
                    vi="Khoảng cách tách lớp bóc tách dao cắt (Z-Offset):"
                    en="Cutter separation distance (Z-Offset):"
                  />
                </span>
                <span className="font-mono text-indigo-400 font-bold">{explodeOffset.toFixed(2)}m</span>
              </div>
              <input
                type="range"
                min="0"
                max="1.5"
                step="0.05"
                value={explodeOffset}
                onChange={(e) => setExplodeOffset(parseFloat(e.target.value))}
                className="w-full sm:w-64 accent-indigo-500 cursor-pointer"
              />
            </div>
          </div>
        )}

        {activeMode === 'sphere' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Slider 1: Light Angle */}
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span className="font-semibold">Góc chiếu sáng (Light Angle):</span>
                <span className="font-mono text-amber-400 font-bold">{lightAngle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                step="5"
                value={lightAngle}
                onChange={(e) => setLightAngle(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Slider 2: Spot Intensity */}
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span className="font-semibold">Độ sáng điểm tụ (Highlight):</span>
                <span className="font-mono text-amber-400 font-bold">{spotIntensity.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.1"
                value={spotIntensity}
                onChange={(e) => setSpotIntensity(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Slider 3: Material Roughness */}
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span className="font-semibold">Độ nhám bề mặt (Roughness):</span>
                <span className="font-mono text-amber-400 font-bold">{roughness.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.9"
                step="0.05"
                value={roughness}
                onChange={(e) => setRoughness(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>
        )}

        {activeMode === 'star' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Slider 1: Corners */}
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span className="font-semibold">Số cánh (Corners):</span>
                <span className="font-mono text-rose-400 font-bold">{starCorners}</span>
              </div>
              <input
                type="range"
                min="3"
                max="16"
                step="1"
                value={starCorners}
                onChange={(e) => setStarCorners(parseInt(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>

            {/* Slider 2: Spoke ratio */}
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span className="font-semibold">Tỉ lệ nan hoa (Spoke):</span>
                <span className="font-mono text-rose-400 font-bold">{starSpokeRatio.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.85"
                step="0.02"
                value={starSpokeRatio}
                onChange={(e) => setStarSpokeRatio(parseFloat(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>

            {/* Slider 3: Rounded Curvature (KEY CONCEPT) */}
            <div className="p-3 rounded-2xl bg-rose-950/40 border border-rose-700/60 space-y-1.5 text-xs">
              <div className="flex justify-between items-center text-rose-200">
                <span className="font-bold">Độ cong đỉnh (Rounded):</span>
                <span className="font-mono text-rose-300 font-black">{starRounded.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="0.8"
                step="0.05"
                value={starRounded}
                onChange={(e) => setStarRounded(parseFloat(e.target.value))}
                className="w-full accent-rose-400 cursor-pointer"
              />
            </div>

            {/* Slider 4: Extrude depth */}
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span className="font-semibold">Độ dày khối 3D (Depth):</span>
                <span className="font-mono text-rose-400 font-bold">{starExtrude.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={starExtrude}
                onChange={(e) => setStarExtrude(parseFloat(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
