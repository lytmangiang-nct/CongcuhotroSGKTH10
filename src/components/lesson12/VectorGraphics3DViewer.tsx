import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useBook } from '../../context/BookContext';
import {
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Eye,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Palette,
  Maximize2,
  Sliders,
  Grid,
  Info
} from 'lucide-react';

interface VectorGraphics3DViewerProps {
  initialMode?: 'compare' | 'layers' | 'flag';
}

export const VectorGraphics3DViewer: React.FC<VectorGraphics3DViewerProps> = ({
  initialMode = 'compare'
}) => {
  const { bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';
  const mountRef = useRef<HTMLDivElement>(null);

  // UI Interactive States
  const [activeTab, setActiveTab] = useState<'compare' | 'layers' | 'flag'>(initialMode);
  const [zoomFactor, setZoomFactor] = useState<number>(1);
  const [layerSeparation, setLayerSeparation] = useState<number>(1.2);
  const [starLayerPosition, setStarLayerPosition] = useState<'above' | 'below'>('above');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);
  const [selectedPetalColor, setSelectedPetalColor] = useState<string>('#e11d48'); // rose-600
  const [selectedStrokeColor, setSelectedStrokeColor] = useState<string>('#9f1239'); // rose-800

  // Animation frame reference
  const frameRef = useRef<number>(0);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rootGroupRef = useRef<THREE.Group | null>(null);

  // Dynamic mesh references for interactivity
  const bitmapGridGroupRef = useRef<THREE.Group | null>(null);
  const vectorCurveGroupRef = useRef<THREE.Group | null>(null);
  const layerStackGroupRef = useRef<THREE.Group | null>(null);
  const flagRectMeshRef = useRef<THREE.Mesh | null>(null);
  const flagStarMeshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0b1120); // Deep slate dark space
    scene.fog = new THREE.FogExp2(0x0b1120, 0.035);

    // 2. Camera Setup
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 420;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 4.5, 9.5);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const mainSpot = new THREE.SpotLight(0xffffff, 2.5);
    mainSpot.position.set(6, 12, 8);
    mainSpot.angle = Math.PI / 4;
    mainSpot.penumbra = 0.4;
    mainSpot.castShadow = true;
    scene.add(mainSpot);

    const cyanRim = new THREE.DirectionalLight(0x06b6d4, 1.2);
    cyanRim.position.set(-8, 4, -4);
    scene.add(cyanRim);

    const amberFill = new THREE.PointLight(0xf59e0b, 1.5, 20);
    amberFill.position.set(0, -2, 4);
    scene.add(amberFill);

    // 5. Root Animation Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    rootGroupRef.current = rootGroup;

    // Grid Floor
    const gridHelper = new THREE.GridHelper(16, 16, 0x3b82f6, 0x1e293b);
    gridHelper.position.y = -2.2;
    scene.add(gridHelper);

    // -------------------------------------------------------------
    // SUB-SCENE A: BITMAP VS VECTOR COMPARISON (Cosmos Flower Hình 12.1 & 12.2)
    // -------------------------------------------------------------
    const compareGroup = new THREE.Group();
    compareGroup.name = 'compareSubScene';
    rootGroup.add(compareGroup);

    // Left Platform: Bitmap Pixel Grid
    const bitmapGroup = new THREE.Group();
    bitmapGroup.position.set(-3.6, 0, 0);
    bitmapGridGroupRef.current = bitmapGroup;
    compareGroup.add(bitmapGroup);

    // Base card for Bitmap
    const bitmapBaseGeo = new THREE.BoxGeometry(3.2, 0.2, 3.2);
    const bitmapBaseMat = new THREE.MeshStandardMaterial({
      color: 0x1e1b4b,
      roughness: 0.3,
      metalness: 0.6,
      wireframe: false
    });
    const bitmapBase = new THREE.Mesh(bitmapBaseGeo, bitmapBaseMat);
    bitmapBase.position.y = -0.15;
    bitmapGroup.add(bitmapBase);

    // Construct 8x8 Voxel Grid simulating pixelation (Flower pattern)
    const gridSize = 10;
    const voxelGeo = new THREE.BoxGeometry(0.24, 0.24, 0.24);
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const distFromCenter = Math.hypot(r - gridSize / 2 + 0.5, c - gridSize / 2 + 0.5);
        let colorHex = 0x0f172a; // dark background
        let heightVal = 0.08;

        if (distFromCenter < 1.4) {
          colorHex = 0xfacc15; // yellow pistil
          heightVal = 0.35;
        } else if (distFromCenter < 4.2 && (r === c || r + c === gridSize - 1 || r === 4 || r === 5 || c === 4 || c === 5)) {
          colorHex = 0xe11d48; // rose petal pixels
          heightVal = 0.25;
        } else if (distFromCenter < 3.8) {
          colorHex = 0xbe123c;
          heightVal = 0.18;
        }

        const voxelMat = new THREE.MeshStandardMaterial({
          color: colorHex,
          roughness: 0.4,
          metalness: 0.2
        });
        const voxel = new THREE.Mesh(voxelGeo, voxelMat);
        voxel.position.set((c - gridSize / 2 + 0.5) * 0.28, heightVal / 2, (r - gridSize / 2 + 0.5) * 0.28);
        voxel.scale.set(1, heightVal / 0.24, 1);
        bitmapGroup.add(voxel);
      }
    }

    // Right Platform: Vector Mathematical Smooth Surface
    const vectorGroup = new THREE.Group();
    vectorGroup.position.set(3.6, 0, 0);
    vectorCurveGroupRef.current = vectorGroup;
    compareGroup.add(vectorGroup);

    const vectorBase = new THREE.Mesh(bitmapBaseGeo, new THREE.MeshStandardMaterial({
      color: 0x064e3b,
      roughness: 0.3,
      metalness: 0.6
    }));
    vectorBase.position.y = -0.15;
    vectorGroup.add(vectorBase);

    // Smooth Vector Flower Shape
    const flowerCenterGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.18, 32);
    const flowerCenterMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.2, metalness: 0.3 });
    const flowerCenter = new THREE.Mesh(flowerCenterGeo, flowerCenterMat);
    flowerCenter.position.y = 0.1;
    vectorGroup.add(flowerCenter);

    // 8 Smooth Elliptical Petals (Constructed parametrically)
    const petalGeo = new THREE.CylinderGeometry(0.2, 0.12, 1.3, 24);
    petalGeo.scale(1, 0.15, 1);
    const petalMat = new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      roughness: 0.25,
      metalness: 0.1
    });

    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const petal = new THREE.Mesh(petalGeo, petalMat);
      petal.position.set(Math.cos(angle) * 0.8, 0.05, Math.sin(angle) * 0.8);
      petal.rotation.y = -angle + Math.PI / 2;
      vectorGroup.add(petal);
    }

    // Vector Bézier Curve Path Visualization (Cyan orbital spline)
    const curve = new THREE.EllipseCurve(0, 0, 1.45, 1.45, 0, 2 * Math.PI, false, 0);
    const points = curve.getPoints(64);
    const splineGeo = new THREE.BufferGeometry().setFromPoints(
      points.map((p) => new THREE.Vector3(p.x, 0.2, p.y))
    );
    const splineMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 });
    const splineLine = new THREE.Line(splineGeo, splineMat);
    vectorGroup.add(splineLine);

    // Vector Anchor Nodes (Bézier handle boxes)
    const nodeGeo = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2;
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(Math.cos(a) * 1.45, 0.2, Math.sin(a) * 1.45);
      vectorGroup.add(node);
    }

    // -------------------------------------------------------------
    // SUB-SCENE B: 3D EXPLODED LAYER STACKING (Hoạt động 3 & Cờ đỏ sao vàng)
    // -------------------------------------------------------------
    const layerStackGroup = new THREE.Group();
    layerStackGroup.name = 'layersSubScene';
    layerStackGroup.position.set(0, 0, 0);
    layerStackGroupRef.current = layerStackGroup;
    rootGroup.add(layerStackGroup);

    // Layer 0: Inkscape Canvas & Page Border (Trang in chữ nhật)
    const canvasSheetGeo = new THREE.BoxGeometry(4.8, 0.05, 3.6);
    const canvasSheetMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.9,
      metalness: 0.1,
      transparent: true,
      opacity: 0.85
    });
    const canvasSheet = new THREE.Mesh(canvasSheetGeo, canvasSheetMat);
    canvasSheet.position.y = -1.2;
    layerStackGroup.add(canvasSheet);

    // Page border line
    const pageBorderEdges = new THREE.EdgesGeometry(canvasSheetGeo);
    const pageBorderLine = new THREE.LineSegments(pageBorderEdges, new THREE.LineBasicMaterial({ color: 0x64748b }));
    canvasSheet.add(pageBorderLine);

    // Layer 1: Red Flag Field (Hình chữ nhật đỏ tỉ lệ 2:3)
    const redRectGeo = new THREE.BoxGeometry(3.6, 0.06, 2.4);
    const redRectMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626, // red-600
      roughness: 0.3,
      metalness: 0.1
    });
    const redRectMesh = new THREE.Mesh(redRectGeo, redRectMat);
    redRectMesh.position.y = 0;
    flagRectMeshRef.current = redRectMesh;
    layerStackGroup.add(redRectMesh);

    // Layer 2: 5-Pointed Golden Star (Ngôi sao vàng 5 cánh theo Hình 12.6)
    const starShape = new THREE.Shape();
    const starPoints = 5;
    const outerRadius = 0.75;
    const innerRadius = 0.75 * 0.4; // Spoke ratio 0.4 per SGK p. 68
    for (let i = 0; i < starPoints * 2; i++) {
      const r = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / starPoints - Math.PI / 2;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      if (i === 0) starShape.moveTo(x, y);
      else starShape.lineTo(x, y);
    }
    starShape.closePath();

    const starExtrudeSettings = { depth: 0.08, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.02, bevelThickness: 0.02 };
    const starGeo = new THREE.ExtrudeGeometry(starShape, starExtrudeSettings);
    starGeo.rotateX(Math.PI / 2);
    const starMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15, // yellow-400
      roughness: 0.2,
      metalness: 0.4
    });
    const starMesh = new THREE.Mesh(starGeo, starMat);
    starMesh.position.y = 1.0;
    flagStarMeshRef.current = starMesh;
    layerStackGroup.add(starMesh);

    // Guide Connector Struts (Connecting the 3D layers)
    const strutGeo = new THREE.CylinderGeometry(0.02, 0.02, 2.8, 8);
    const strutMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.4 });
    const cornerPositions = [
      [-1.8, -1.2],
      [1.8, -1.2],
      [-1.8, 1.2],
      [1.8, 1.2]
    ];
    cornerPositions.forEach(([cx, cz]) => {
      const strut = new THREE.Mesh(strutGeo, strutMat);
      strut.position.set(cx, 0, cz);
      layerStackGroup.add(strut);
    });

    // -------------------------------------------------------------
    // Mouse Interaction: Smooth Orbit Rotation
    // -------------------------------------------------------------
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationX = 0.25;
    let targetRotationY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !rootGroupRef.current) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;
      targetRotationX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotationX));
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Handle Resize
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 6. Animation Render Loop
    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      if (rootGroupRef.current) {
        if (autoRotate && !isDragging) {
          targetRotationY += 0.004;
        }
        rootGroupRef.current.rotation.y += (targetRotationY - rootGroupRef.current.rotation.y) * 0.08;
        rootGroupRef.current.rotation.x += (targetRotationX - rootGroupRef.current.rotation.x) * 0.08;
      }

      renderer.render(scene, camera);
    };

    frameId = requestAnimationFrame(animate);
    frameRef.current = frameId;

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      // Memory cleanup
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Sync mode changes
  useEffect(() => {
    if (!rootGroupRef.current) return;
    const compareGroup = rootGroupRef.current.getObjectByName('compareSubScene');
    const layersGroup = rootGroupRef.current.getObjectByName('layersSubScene');

    if (compareGroup && layersGroup) {
      if (activeTab === 'compare') {
        compareGroup.visible = true;
        layersGroup.visible = false;
      } else {
        compareGroup.visible = false;
        layersGroup.visible = true;
      }
    }
  }, [activeTab]);

  // Sync Zoom effect in Comparison mode
  useEffect(() => {
    if (!bitmapGridGroupRef.current || !vectorCurveGroupRef.current) return;
    const scaleVal = zoomFactor;
    // For bitmap, scale expands and reveals pixelated blocks
    bitmapGridGroupRef.current.scale.set(scaleVal, scaleVal, scaleVal);
    vectorCurveGroupRef.current.scale.set(scaleVal, scaleVal, scaleVal);
  }, [zoomFactor]);

  // Sync Layer Separation and Stacking order in Layers mode
  useEffect(() => {
    if (!flagStarMeshRef.current || !flagRectMeshRef.current) return;

    if (starLayerPosition === 'above') {
      // Star is on top layer (visible)
      flagStarMeshRef.current.position.y = 0.5 * layerSeparation;
      flagRectMeshRef.current.position.y = -0.5 * layerSeparation;
    } else {
      // Star is on bottom layer (obscured behind red rectangle)
      flagStarMeshRef.current.position.y = -0.5 * layerSeparation;
      flagRectMeshRef.current.position.y = 0.5 * layerSeparation;
    }
  }, [layerSeparation, starLayerPosition]);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex flex-col">
      {/* Top Interactive Toolbar */}
      <div className="p-3.5 sm:p-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 z-10 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-rose-600 flex items-center justify-center text-white shadow-md">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
              <span>{isEn ? '3D Simulation: Vector Graphics vs Bitmap & Layer Z-Order' : 'Mô phỏng 3D: Đồ hoạ Vectơ vs Bitmap & Cơ chế Xếp lớp (Z-Order)'}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                WebGL 3D
              </span>
            </h4>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              {isEn ? 'Cosmos flower zoom comparison (Figures 12.1 & 12.2) and national flag 3D layer explosion (Figure 12.6)' : 'Trực quan hóa hoa Cosmos (Hình 12.1 & 12.2) và cơ chế tách lớp Quốc kì Việt Nam (Hình 12.6)'}
            </p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('compare')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'compare'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>{isEn ? 'Bitmap vs Vector' : 'Bitmap vs Vectơ'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('layers')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'layers'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isEn ? '3D Layer Stacking (Z-Order)' : 'Tách lớp 3D (Z-Order)'}</span>
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div
        className="w-full h-[360px] sm:h-[420px] cursor-grab active:cursor-grabbing relative select-none overflow-hidden"
      >
        <div ref={mountRef} className="absolute inset-0 w-full h-full" />
        {/* On-Canvas Overlay Badges */}
        {activeTab === 'compare' ? (
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <div className="px-3 py-1.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-rose-500/50 text-rose-300 text-xs font-bold shadow-lg">
              {isEn ? '◀ BITMAP RASTER GRAPHICS: Discrete pixel grid, pixelates on zoom' : '◀ ĐỒ HOẠ ĐIỂM ẢNH (BITMAP): Lưới Pixel rời rạc, vỡ hạt khi zoom'}
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-sky-500/50 text-sky-300 text-xs font-bold shadow-lg">
              {isEn ? 'VECTOR GRAPHICS: Infinitely smooth mathematical splines ▶' : 'ĐỒ HOẠ VECTƠ: Đường cong toán học mượt mà vô tận ▶'}
            </div>
          </div>
        ) : (
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <div className="px-3 py-1.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-amber-500/50 text-amber-300 text-xs font-bold shadow-lg">
              {isEn
                ? `Flag of Vietnam Lab: ${starLayerPosition === 'above' ? '✓ Golden Star on Top Layer' : '✗ Star Obscured (Lower Layer)'}`
                : `Thực hành Quốc kì Việt Nam: ${starLayerPosition === 'above' ? '✓ Ngôi sao ở Lớp Trên' : '✗ Ngôi sao bị Che Khuất (Lớp Dưới)'}`}
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700 text-slate-300 text-xs font-mono">
              {isEn ? 'Z-Stack Axis: Canvas → Red Field → Golden Star' : 'Trục Z-Stack: Canvas → Nền đỏ → Sao vàng'}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Interactive Controls */}
      <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        {activeTab === 'compare' ? (
          /* Controls for Compare Mode */
          <div className="flex flex-wrap items-center gap-4 w-full justify-between">
            <div className="flex items-center gap-3">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <ZoomIn className="w-4 h-4 text-rose-400" />
                {isEn ? 'Magnifier Zoom Level (Figure 12.2):' : 'Mức Phóng To Kính Lúp (Hình 12.2 SGK):'}
              </span>
              <div className="flex items-center gap-1.5">
                {[1, 1.4, 1.8, 2.2].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setZoomFactor(lvl)}
                    className={`px-2.5 py-1 rounded-lg font-mono font-bold transition cursor-pointer ${
                      zoomFactor === lvl
                        ? 'bg-rose-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {lvl}x
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAutoRotate(!autoRotate)}
                className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  autoRotate
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{autoRotate ? (isEn ? 'Stop 360° Rotation' : 'Dừng xoay 360°') : (isEn ? 'Auto Rotate' : 'Tự động xoay')}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Controls for Layer Stacking Mode */
          <div className="flex flex-wrap items-center gap-4 w-full justify-between">
            <div className="flex items-center gap-3">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-amber-400" />
                {isEn ? '3D Spatial Layer Separation (Z-Explode):' : 'Độ Tách Lớp Không Gian 3D (Z-Explode):'}
              </span>
              <input
                type="range"
                min="0.1"
                max="2.5"
                step="0.1"
                value={layerSeparation}
                onChange={(e) => setLayerSeparation(parseFloat(e.target.value))}
                className="w-32 accent-amber-500 cursor-pointer"
              />
              <span className="font-mono text-amber-400 font-bold">{layerSeparation.toFixed(1)}x</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">
                {isEn ? 'Golden Star Z-Index:' : 'Thứ tự lớp sao vàng:'}
              </span>
              <button
                type="button"
                onClick={() => setStarLayerPosition('above')}
                className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  starLayerPosition === 'above'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>{isEn ? 'Raise to Top (Layer Up)' : 'Đưa lên trên (Raise to Top)'}</span>
              </button>

              <button
                type="button"
                onClick={() => setStarLayerPosition('below')}
                className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  starLayerPosition === 'below'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <ArrowDown className="w-3.5 h-3.5" />
                <span>{isEn ? 'Lower to Bottom (Layer Down)' : 'Hạ xuống dưới (Lower to Bottom)'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
