import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useBook } from '../../context/BookContext';
import { Sparkles, Globe, User, Calendar, Orbit, Zap } from 'lucide-react';

type LabMode = 'gravity_solar' | 'name_tokens' | 'calendar_wheel';

interface PlanetInfo {
  nameVi: string;
  nameEn: string;
  g: number;
  color: number;
  size: number;
  dist: number;
}

const PLANETS: PlanetInfo[] = [
  { nameVi: 'Mặt Trời', nameEn: 'Sun', g: 274.0, color: 0xf59e0b, size: 2.2, dist: 0 },
  { nameVi: 'Mặt Trăng', nameEn: 'Moon', g: 1.62, color: 0x94a3b8, size: 0.5, dist: 3.5 },
  { nameVi: 'Kim tinh', nameEn: 'Venus', g: 8.83, color: 0xeab308, size: 0.8, dist: 5.5 },
  { nameVi: 'Trái Đất', nameEn: 'Earth', g: 9.8, color: 0x38bdf8, size: 0.85, dist: 7.5 },
  { nameVi: 'Hoả tinh', nameEn: 'Mars', g: 3.711, color: 0xef4444, size: 0.6, dist: 9.5 },
  { nameVi: 'Mộc tinh', nameEn: 'Jupiter', g: 24.79, color: 0xd97706, size: 1.6, dist: 12.0 },
  { nameVi: 'Thổ tinh', nameEn: 'Saturn', g: 10.44, color: 0xfde047, size: 1.3, dist: 14.5 },
];

export const SolarSystem3DLab: React.FC = () => {
  const { bilingualMode } = useBook();
  const isVi = bilingualMode !== 'en';

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<LabMode>('gravity_solar');

  // Interactive inputs
  const [selectedPlanetIdx, setSelectedPlanetIdx] = useState<number>(3); // Earth by default
  const [userWeightKg, setUserWeightKg] = useState<number>(50);
  const [inputName, setInputName] = useState<string>('Nguyễn Thị Mai Hương');
  const [isLeapYear, setIsLeapYear] = useState<boolean>(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. SCENE & CAMERA
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060913);
    scene.fog = new THREE.FogExp2(0x060913, 0.03);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 10, 22);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 2. LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xffedd5, 3.5, 60);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    dirLight.position.set(10, 20, 15);
    scene.add(dirLight);

    // 3. DYNAMIC GROUP
    const dynamicGroup = new THREE.Group();
    scene.add(dynamicGroup);

    // Starfield particles in the background
    const starGeo = new THREE.BufferGeometry();
    const starCount = 300;
    const starCoords = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      starCoords[i] = (Math.random() - 0.5) * 80;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starCoords, 3));
    const starMat = new THREE.PointsMaterial({ color: 0x94a3b8, size: 0.15, transparent: true, opacity: 0.6 });
    const starMesh = new THREE.Points(starGeo, starMat);
    scene.add(starMesh);

    // BUILD ACTIVE 3D MODE
    if (activeMode === 'gravity_solar') {
      // MODE 1: SOLAR SYSTEM & PLANETARY GRAVITY
      PLANETS.forEach((p, idx) => {
        // Orbit ring
        if (p.dist > 0) {
          const orbitGeo = new THREE.RingGeometry(p.dist - 0.04, p.dist + 0.04, 64);
          const orbitMat = new THREE.MeshBasicMaterial({
            color: 0x334155,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.5,
          });
          const orbitMesh = new THREE.Mesh(orbitGeo, orbitMat);
          orbitMesh.rotation.x = Math.PI / 2;
          dynamicGroup.add(orbitMesh);
        }

        // Planet body
        const isSun = p.dist === 0;
        const planetGeo = isSun
          ? new THREE.SphereGeometry(p.size, 32, 32)
          : new THREE.SphereGeometry(p.size, 24, 24);

        const isSelected = idx === selectedPlanetIdx;
        const planetMat = new THREE.MeshStandardMaterial({
          color: p.color,
          emissive: isSun ? 0xf59e0b : isSelected ? p.color : 0x000000,
          emissiveIntensity: isSun ? 1.0 : isSelected ? 0.7 : 0.0,
          roughness: isSun ? 0.2 : 0.6,
          metalness: 0.2,
        });

        const planetMesh = new THREE.Mesh(planetGeo, planetMat);
        planetMesh.position.set(p.dist, 0, 0);
        dynamicGroup.add(planetMesh);

        // Saturn ring
        if (p.nameEn === 'Saturn') {
          const sRingGeo = new THREE.RingGeometry(1.6, 2.5, 32);
          const sRingMat = new THREE.MeshBasicMaterial({
            color: 0xe2e8f0,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.6,
          });
          const sRingMesh = new THREE.Mesh(sRingGeo, sRingMat);
          sRingMesh.rotation.x = Math.PI / 2.5;
          planetMesh.add(sRingMesh);
        }

        // Selected halo
        if (isSelected) {
          const haloGeo = new THREE.RingGeometry(p.size + 0.2, p.size + 0.4, 32);
          const haloMat = new THREE.MeshBasicMaterial({
            color: 0x38bdf8,
            side: THREE.DoubleSide,
          });
          const haloMesh = new THREE.Mesh(haloGeo, haloMat);
          haloMesh.rotation.x = Math.PI / 2;
          planetMesh.add(haloMesh);
        }
      });

      camera.position.set(0, 14, 20);
      camera.lookAt(0, 0, 0);
    } else if (activeMode === 'name_tokens') {
      // MODE 2: 3D FLOATING NAME SLICES
      const tokens = inputName.trim().split(/\s+/).filter(Boolean);
      const total = tokens.length;
      const spacing = 3.2;
      const startX = -((total - 1) * spacing) / 2;

      tokens.forEach((word, idx) => {
        const isSurname = idx === 0;
        const isGivenName = idx === total - 1;
        const isMiddle = !isSurname && !isGivenName;

        const posX = startX + idx * spacing;
        const boxGeo = new THREE.BoxGeometry(2.5, 1.4, 0.4);
        const boxMat = new THREE.MeshStandardMaterial({
          color: isSurname ? 0x10b981 : isGivenName ? 0xf59e0b : 0x06b6d4,
          emissive: isSurname ? 0x047857 : isGivenName ? 0xb45309 : 0x0891b2,
          emissiveIntensity: 0.5,
          roughness: 0.3,
          metalness: 0.3,
        });
        const boxMesh = new THREE.Mesh(boxGeo, boxMat);
        boxMesh.position.set(posX, Math.sin(idx * 0.8) * 0.6, 0);
        dynamicGroup.add(boxMesh);

        // Connecting energy laser between middle tokens
        if (idx < total - 1) {
          const nextX = startX + (idx + 1) * spacing;
          const beamGeo = new THREE.CylinderGeometry(0.04, 0.04, spacing, 8);
          const beamMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
          const beamMesh = new THREE.Mesh(beamGeo, beamMat);
          beamMesh.rotation.z = Math.PI / 2;
          beamMesh.position.set((posX + nextX) / 2, 0, 0);
          dynamicGroup.add(beamMesh);
        }
      });

      camera.position.set(0, 4, 14);
      camera.lookAt(0, 0, 0);
    } else if (activeMode === 'calendar_wheel') {
      // MODE 3: 3D PERPETUAL CALENDAR WHEEL
      const daysInMonths = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      const radius = 6.5;

      daysInMonths.forEach((days, idx) => {
        const angle = (idx / 12) * Math.PI * 2;
        const posX = Math.cos(angle) * radius;
        const posZ = Math.sin(angle) * radius;
        const height = (days - 27) * 0.9;

        const isFeb = idx === 1;
        const pillarGeo = new THREE.CylinderGeometry(0.5, 0.5, height, 16);
        const pillarMat = new THREE.MeshStandardMaterial({
          color: isFeb
            ? isLeapYear ? 0x10b981 : 0xf43f5e
            : days === 31 ? 0x38bdf8 : 0x818cf8,
          emissive: isFeb ? (isLeapYear ? 0x059669 : 0xe11d48) : 0x0f172a,
          emissiveIntensity: isFeb ? 0.8 : 0.3,
        });

        const pillarMesh = new THREE.Mesh(pillarGeo, pillarMat);
        pillarMesh.position.set(posX, height / 2, posZ);
        dynamicGroup.add(pillarMesh);
      });

      // Ground hub
      const hubGeo = new THREE.CylinderGeometry(2, 2.2, 0.4, 32);
      const hubMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.5 });
      const hubMesh = new THREE.Mesh(hubGeo, hubMat);
      hubMesh.position.set(0, 0, 0);
      dynamicGroup.add(hubMesh);

      camera.position.set(0, 11, 15);
      camera.lookAt(0, 1, 0);
    }

    // 4. ANIMATION LOOP
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Gentle continuous rotation
      dynamicGroup.rotation.y = elapsed * 0.15;

      renderer.render(scene, camera);
    };

    animate();

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
  }, [activeMode, selectedPlanetIdx, inputName, isLeapYear]);

  // Derived weight calculation
  const earthWeightN = userWeightKg * 9.8;
  const currentPlanet = PLANETS[selectedPlanetIdx];
  const planetWeightN = (earthWeightN * currentPlanet.g) / 9.8;

  return (
    <div className="relative bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* 3D CANVAS VIEWPORT */}
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[420px]" />

      {/* TOP CONTROLS & MODE SWITCHER */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1.5 p-1 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-700/80 shadow-lg">
          <button
            onClick={() => setActiveMode('gravity_solar')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeMode === 'gravity_solar'
                ? 'bg-teal-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{isVi ? '1. Trọng trường Hệ Mặt Trời' : '1. Planetary Gravity 3D'}</span>
          </button>
          <button
            onClick={() => setActiveMode('name_tokens')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeMode === 'name_tokens'
                ? 'bg-teal-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>{isVi ? '2. Tách Họ - Đệm - Tên' : '2. Name Dissector 3D'}</span>
          </button>
          <button
            onClick={() => setActiveMode('calendar_wheel')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeMode === 'calendar_wheel'
                ? 'bg-teal-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{isVi ? '3. Lịch vạn niên & Năm nhuận' : '3. Perpetual Calendar'}</span>
          </button>
        </div>

        <div className="pointer-events-auto hidden md:flex items-center gap-2 px-3 py-1 bg-slate-900/80 backdrop-blur-md rounded-full border border-slate-800 text-[11px] font-mono text-teal-300">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
          <span>Three.js Interactive Lab 32</span>
        </div>
      </div>

      {/* BOTTOM DYNAMIC BENCH CONTROLS */}
      <div className="absolute bottom-4 left-4 right-4 pointer-events-auto">
        <div className="p-3 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-700/80 shadow-xl flex flex-wrap items-center justify-between gap-3 text-xs">
          {activeMode === 'gravity_solar' && (
            <div className="flex flex-wrap items-center justify-between w-full gap-3">
              <div className="flex items-center gap-3">
                <span className="text-slate-400 font-mono">
                  {isVi ? 'Chọn thiên thể:' : 'Select Planet:'}
                </span>
                <div className="flex flex-wrap gap-1">
                  {PLANETS.map((p, idx) => (
                    <button
                      key={p.nameEn}
                      onClick={() => setSelectedPlanetIdx(idx)}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono transition-all ${
                        selectedPlanetIdx === idx
                          ? 'bg-teal-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {isVi ? p.nameVi : p.nameEn}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 font-mono">
                <div className="flex items-center gap-1.5">
                  <label className="text-slate-400">{isVi ? 'Khối lượng m:' : 'Mass m:'}</label>
                  <input
                    type="number"
                    value={userWeightKg}
                    onChange={(e) => setUserWeightKg(Number(e.target.value))}
                    className="w-14 px-1.5 py-0.5 bg-slate-950 border border-slate-700 rounded text-center text-teal-300 text-xs"
                  />
                  <span className="text-slate-400">kg</span>
                </div>
                <div className="px-2.5 py-1 rounded bg-teal-950/60 border border-teal-500/40 text-teal-300 font-bold">
                  P_{isVi ? currentPlanet.nameVi : currentPlanet.nameEn} = {planetWeightN.toFixed(1)} N (g = {currentPlanet.g} m/s²)
                </div>
              </div>
            </div>
          )}

          {activeMode === 'name_tokens' && (
            <div className="flex flex-wrap items-center justify-between w-full gap-3">
              <div className="flex items-center gap-2 flex-1 min-w-[240px]">
                <label className="text-slate-400 font-mono whitespace-nowrap">{isVi ? 'Họ và tên:' : 'Full name:'}</label>
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  className="flex-1 px-3 py-1 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="text-emerald-400">{isVi ? 'Họ: ' : 'Surname: '}{inputName.trim().split(/\s+/)[0] || '---'}</span>
                <span className="text-cyan-400">
                  {isVi ? 'Đệm: ' : 'Middle: '}{inputName.trim().split(/\s+/).slice(1, -1).join(' ') || (isVi ? '(Không có)' : '(None)')}
                </span>
                <span className="text-amber-400">
                  {isVi ? 'Tên: ' : 'Given name: '}{inputName.trim().split(/\s+/).slice(-1)[0] || '---'}
                </span>
              </div>
            </div>
          )}

          {activeMode === 'calendar_wheel' && (
            <div className="flex flex-wrap items-center justify-between w-full gap-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="text-slate-400 font-mono">{isVi ? 'Trạng thái năm:' : 'Year state:'}</span>
                <button
                  onClick={() => setIsLeapYear(!isLeapYear)}
                  className={`px-3 py-1 rounded-lg font-mono font-bold transition-all ${
                    isLeapYear
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-rose-500 text-white'
                  }`}
                >
                  {isLeapYear
                    ? (isVi ? 'Năm nhuận (Tháng 2 có 29 ngày)' : 'Leap Year (February has 29 days)')
                    : (isVi ? 'Năm thường (Tháng 2 có 28 ngày)' : 'Common Year (February has 28 days)')}
                </button>
              </div>

              <span className="text-teal-300 font-mono text-[11px]">
                {isLeapYear
                  ? (isVi ? 'thang[1] = 29 -> Tổng 366 ngày' : 'months[1] = 29 -> Total 366 days')
                  : (isVi ? 'thang[1] = 28 -> Tổng 365 ngày' : 'months[1] = 28 -> Total 365 days')}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
