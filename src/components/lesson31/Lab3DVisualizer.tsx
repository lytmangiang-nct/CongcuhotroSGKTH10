import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useBook } from '../../context/BookContext';
import { Sparkles, Maximize2, RotateCcw, Play, Layers, Compass, HelpCircle } from 'lucide-react';

type LabMode = 'prime_tree' | 'parabola_3d' | 'leap_ring';

export const Lab3DVisualizer: React.FC = () => {
  const { bilingualMode } = useBook();
  const isVi = bilingualMode !== 'en';

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<LabMode>('prime_tree');

  // Parameters for Prime Tree
  const [sampleN, setSampleN] = useState<number>(100);

  // Parameters for Parabola 3D
  const [paramA, setParamA] = useState<number>(1);
  const [paramB, setParamB] = useState<number>(-3);
  const [paramC, setParamC] = useState<number>(2);

  // Calculated delta
  const delta = paramB * paramB - 4 * paramA * paramC;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070b14);
    scene.fog = new THREE.FogExp2(0x070b14, 0.035);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 8, 18);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    dirLight.position.set(10, 20, 15);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x10b981, 2.5, 50);
    pointLight.position.set(-10, -5, -5);
    scene.add(pointLight);

    // DYNAMIC GROUP
    const dynamicGroup = new THREE.Group();
    scene.add(dynamicGroup);

    // GRID FLOOR
    const grid = new THREE.GridHelper(24, 24, 0x1e293b, 0x0f172a);
    grid.position.y = -4;
    scene.add(grid);

    // ----------------------------------------------------
    // BUILD SCENE ACCORDING TO activeMode
    // ----------------------------------------------------
    if (activeMode === 'prime_tree') {
      // 1. PRIME FACTORIZATION TREE / SPIRAL
      let tempM = sampleN;
      let k = 2;
      const factors: number[] = [];
      while (tempM > 1) {
        while (tempM % k !== 0) {
          k++;
        }
        factors.push(k);
        tempM = Math.floor(tempM / k);
      }

      // Central root node for n
      const rootGeo = new THREE.IcosahedronGeometry(1.6, 2);
      const rootMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        wireframe: true,
        emissive: 0x0284c7,
        emissiveIntensity: 0.6,
      });
      const rootMesh = new THREE.Mesh(rootGeo, rootMat);
      rootMesh.position.set(0, 4, 0);
      dynamicGroup.add(rootMesh);

      // Inner glowing core
      const coreGeo = new THREE.SphereGeometry(1.0, 16, 16);
      const coreMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      rootMesh.add(coreMesh);

      // Create branch nodes for each prime factor
      const totalFactors = Math.max(1, factors.length);
      factors.forEach((p, idx) => {
        const angle = (idx / totalFactors) * Math.PI * 2;
        const radius = 5.5;
        const posX = Math.cos(angle) * radius;
        const posZ = Math.sin(angle) * radius;
        const posY = -1 - (idx % 2) * 1.5;

        // Factor node
        const nodeGeo = new THREE.DodecahedronGeometry(0.9, 1);
        const nodeMat = new THREE.MeshStandardMaterial({
          color: p === 2 ? 0x10b981 : p === 3 ? 0xf59e0b : p === 5 ? 0xec4899 : 0x8b5cf6,
          metalness: 0.3,
          roughness: 0.2,
          emissive: 0x10b981,
          emissiveIntensity: 0.4,
        });
        const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
        nodeMesh.position.set(posX, posY, posZ);
        dynamicGroup.add(nodeMesh);

        // Connector beam
        const curve = new THREE.LineCurve3(
          new THREE.Vector3(0, 4, 0),
          new THREE.Vector3(posX, posY, posZ)
        );
        const tubeGeo = new THREE.TubeGeometry(curve, 20, 0.08, 8, false);
        const tubeMat = new THREE.MeshBasicMaterial({
          color: 0x06b6d4,
          transparent: true,
          opacity: 0.7,
        });
        const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
        dynamicGroup.add(tubeMesh);
      });

      camera.position.set(0, 6, 16);
      camera.lookAt(0, 0, 0);
    } else if (activeMode === 'parabola_3d') {
      // 2. PARABOLA 3D IN DISCRIMINANT SPACE
      const a = paramA === 0 ? 0.001 : paramA;
      const b = paramB;
      const c = paramC;

      // Curve points
      const points: THREE.Vector3[] = [];
      const numPoints = 80;
      const minX = -6;
      const maxX = 6;
      for (let i = 0; i <= numPoints; i++) {
        const x = minX + (i / numPoints) * (maxX - minX);
        const y = a * x * x + b * x + c;
        if (y >= -8 && y <= 12) {
          points.push(new THREE.Vector3(x, y - 1, 0));
        }
      }

      if (points.length > 2) {
        const curve = new THREE.CatmullRomCurve3(points);
        const tubeGeo = new THREE.TubeGeometry(curve, 100, 0.15, 12, false);
        const tubeMat = new THREE.MeshStandardMaterial({
          color: delta > 0 ? 0x10b981 : delta === 0 ? 0xf59e0b : 0xf43f5e,
          emissive: delta > 0 ? 0x059669 : delta === 0 ? 0xd97706 : 0xe11d48,
          emissiveIntensity: 0.7,
        });
        const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
        dynamicGroup.add(tubeMesh);
      }

      // X-Axis Line (y = 0 in math -> y = -1 in scene)
      const axisGeo = new THREE.CylinderGeometry(0.06, 0.06, 16, 16);
      const axisMat = new THREE.MeshBasicMaterial({ color: 0x94a3b8 });
      const axisMesh = new THREE.Mesh(axisGeo, axisMat);
      axisMesh.rotation.z = Math.PI / 2;
      axisMesh.position.set(0, -1, 0);
      dynamicGroup.add(axisMesh);

      // Y-Axis
      const yAxisGeo = new THREE.CylinderGeometry(0.06, 0.06, 14, 16);
      const yAxisMesh = new THREE.Mesh(yAxisGeo, axisMat);
      yAxisMesh.position.set(0, 4, 0);
      dynamicGroup.add(yAxisMesh);

      // Roots marker spheres if delta >= 0
      if (delta >= 0 && a !== 0) {
        const r1 = (-b + Math.sqrt(delta)) / (2 * a);
        const r2 = (-b - Math.sqrt(delta)) / (2 * a);

        [r1, r2].forEach((rootX) => {
          if (rootX >= -8 && rootX <= 8) {
            const rootGeo = new THREE.SphereGeometry(0.4, 16, 16);
            const rootMat = new THREE.MeshStandardMaterial({
              color: 0x38bdf8,
              emissive: 0x0284c7,
              emissiveIntensity: 1.0,
            });
            const rootMesh = new THREE.Mesh(rootGeo, rootMat);
            rootMesh.position.set(rootX, -1, 0);
            dynamicGroup.add(rootMesh);

            // Ring beacon around root
            const ringGeo = new THREE.RingGeometry(0.5, 0.7, 24);
            const ringMat = new THREE.MeshBasicMaterial({
              color: 0x38bdf8,
              side: THREE.DoubleSide,
            });
            const ringMesh = new THREE.Mesh(ringGeo, ringMat);
            ringMesh.rotation.x = Math.PI / 2;
            ringMesh.position.set(rootX, -1, 0);
            dynamicGroup.add(ringMesh);
          }
        });
      }

      camera.position.set(0, 3, 14);
      camera.lookAt(0, 1, 0);
    } else if (activeMode === 'leap_ring') {
      // 3. CENTURY LEAP-YEAR 3D CHRONO-RING (2001 - 2100)
      const totalYears = 100;
      const radius = 7.5;

      for (let y = 1; y <= totalYears; y++) {
        const year = 2000 + y;
        const angle = (y / totalYears) * Math.PI * 2;
        const posX = Math.cos(angle) * radius;
        const posZ = Math.sin(angle) * radius;

        const isLeap = (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
        const isYear2100 = year === 2100;

        const beadGeo = new THREE.SphereGeometry(isLeap || isYear2100 ? 0.35 : 0.12, 12, 12);
        const beadMat = new THREE.MeshStandardMaterial({
          color: isYear2100
            ? 0xf43f5e // Year 2100 Warning (Not leap)
            : isLeap
            ? 0x10b981 // Leap year
            : 0x475569, // Ordinary year
          emissive: isYear2100 ? 0xe11d48 : isLeap ? 0x059669 : 0x1e293b,
          emissiveIntensity: isLeap || isYear2100 ? 0.8 : 0.2,
        });

        const beadMesh = new THREE.Mesh(beadGeo, beadMat);
        beadMesh.position.set(posX, isLeap ? 0.5 : 0, posZ);
        dynamicGroup.add(beadMesh);
      }

      // Orbital Ring Base
      const ringGeo = new THREE.TorusGeometry(radius, 0.06, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x334155,
        transparent: true,
        opacity: 0.6,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      dynamicGroup.add(ringMesh);

      camera.position.set(0, 12, 16);
      camera.lookAt(0, 0, 0);
    }

    // ANIMATION LOOP
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle rotation of the dynamic 3D group
      dynamicGroup.rotation.y = elapsedTime * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [activeMode, sampleN, paramA, paramB, paramC, delta]);

  return (
    <div className="relative bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* 3D CANVAS VIEWPORT */}
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[420px]" />

      {/* TOP CONTROLS & MODE SWITCHER */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1.5 p-1 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-700/80 shadow-lg">
          <button
            onClick={() => setActiveMode('prime_tree')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeMode === 'prime_tree'
                ? 'bg-teal-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isVi ? '1. Thừa số nguyên tố 3D' : '1. Prime Tree 3D'}</span>
          </button>
          <button
            onClick={() => setActiveMode('parabola_3d')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeMode === 'parabola_3d'
                ? 'bg-teal-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{isVi ? '2. Parabol & Nghiệm Δ' : '2. Parabola & Δ Roots'}</span>
          </button>
          <button
            onClick={() => setActiveMode('leap_ring')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeMode === 'leap_ring'
                ? 'bg-teal-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isVi ? '3. Thế kỷ XXI & Năm nhuận' : '3. 21st Century Leap Ring'}</span>
          </button>
        </div>

        <div className="pointer-events-auto hidden md:flex items-center gap-2 px-3 py-1 bg-slate-900/80 backdrop-blur-md rounded-full border border-slate-800 text-[11px] font-mono text-teal-300">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
          <span>WebGL 3D Interactive Lab</span>
        </div>
      </div>

      {/* BOTTOM PARAMETER CONTROLS */}
      <div className="absolute bottom-4 left-4 right-4 pointer-events-auto">
        <div className="p-3 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-700/80 shadow-xl flex flex-wrap items-center justify-between gap-3 text-xs">
          {activeMode === 'prime_tree' && (
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-slate-400 font-mono">
                {isVi ? 'Số tự nhiên n:' : 'Natural number n:'}
              </span>
              <div className="flex gap-1.5">
                {[12, 45, 100, 126, 360].map((val) => (
                  <button
                    key={val}
                    onClick={() => setSampleN(val)}
                    className={`px-2.5 py-1 rounded font-mono text-xs transition-all ${
                      sampleN === val
                        ? 'bg-teal-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    n = {val}
                  </button>
                ))}
              </div>
              <span className="text-teal-400 font-mono text-[11px] ml-auto sm:ml-2">
                {sampleN === 100 ? (isVi ? '(Ví dụ SGK: 2×2×5×5)' : '(Textbook sample: 2×2×5×5)') : ''}
              </span>
            </div>
          )}

          {activeMode === 'parabola_3d' && (
            <div className="flex flex-wrap items-center gap-4 w-full justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-slate-400">ax² + bx + c = 0:</span>
                <div className="flex items-center gap-2 font-mono">
                  <label className="text-slate-400">a:</label>
                  <input
                    type="number"
                    value={paramA}
                    onChange={(e) => setParamA(Number(e.target.value))}
                    className="w-12 px-1.5 py-0.5 bg-slate-950 border border-slate-700 rounded text-center text-teal-300 text-xs"
                  />
                  <label className="text-slate-400">b:</label>
                  <input
                    type="number"
                    value={paramB}
                    onChange={(e) => setParamB(Number(e.target.value))}
                    className="w-12 px-1.5 py-0.5 bg-slate-950 border border-slate-700 rounded text-center text-amber-300 text-xs"
                  />
                  <label className="text-slate-400">c:</label>
                  <input
                    type="number"
                    value={paramC}
                    onChange={(e) => setParamC(Number(e.target.value))}
                    className="w-12 px-1.5 py-0.5 bg-slate-950 border border-slate-700 rounded text-center text-rose-300 text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono">
                <span className="text-slate-400">Δ = {delta}:</span>
                <span
                  className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                    delta > 0
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                      : delta === 0
                      ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                      : 'bg-rose-950 text-rose-300 border border-rose-500/40'
                  }`}
                >
                  {delta > 0
                    ? isVi ? '2 nghiệm phân biệt' : '2 distinct roots'
                    : delta === 0
                    ? isVi ? 'Nghiệm kép' : 'Double root'
                    : isVi ? 'Vô nghiệm' : 'No real roots'}
                </span>
              </div>
            </div>
          )}

          {activeMode === 'leap_ring' && (
            <div className="flex flex-wrap items-center justify-between w-full text-xs gap-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                  <span className="text-slate-300">
                    {isVi ? '24 năm nhuận (Chia hết cho 4)' : '24 Leap Years (Divisible by 4)'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50" />
                  <span className="text-slate-300">
                    {isVi ? 'Năm 2100: KHÔNG nhuận (%100==0 & %400!=0)' : 'Year 2100: NOT leap (%100==0 & %400!=0)'}
                  </span>
                </div>
              </div>
              <span className="font-mono text-teal-300 text-[11px]">
                {isVi ? 'Thế kỷ XXI (2001 - 2100): Tổng cộng 24 năm nhuận' : '21st Century (2001 - 2100): Exactly 24 leap years'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
