import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Shield,
  ShieldAlert,
  RotateCcw,
  Eye,
  Zap,
  Info,
  Maximize2,
  Bug,
  Lock,
  Layers
} from 'lucide-react';
import { useBook } from '../../context/BookContext';

export type Malware3DMode = 'overview' | 'trojan' | 'virus' | 'worm';

interface CyberDefense3DViewerProps {
  initialMode?: Malware3DMode;
}

export const CyberDefense3DViewer: React.FC<CyberDefense3DViewerProps> = ({
  initialMode = 'overview'
}) => {
  const { bilingualMode } = useBook();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeMode, setActiveMode] = useState<Malware3DMode>(initialMode);
  const [shieldActive, setShieldActive] = useState<boolean>(true);
  const [trojanOpen, setTrojanOpen] = useState<boolean>(false);
  const [inspectInfo, setInspectInfo] = useState<string>('overview');

  // Three.js mutable state refs
  const stateRef = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    frameId?: number;
    clock?: THREE.Clock;
    coreGroup?: THREE.Group;
    shieldMesh?: THREE.Mesh;
    trojanGroup?: THREE.Group;
    trojanHatch?: THREE.Mesh;
    trojanPayload?: THREE.Group;
    virusGroup?: THREE.Group;
    wormGroup?: THREE.Group;
    wormSegments: THREE.Mesh[];
    particles?: THREE.Points;
    targetCamPos: THREE.Vector3;
    targetLookAt: THREE.Vector3;
    isDragging: boolean;
    prevMousePos: { x: number; y: number };
    rotationOrbit: { x: number; y: number };
    zoomDistance: number;
  }>({
    targetCamPos: new THREE.Vector3(0, 4, 12),
    targetLookAt: new THREE.Vector3(0, 1, 0),
    isDragging: false,
    prevMousePos: { x: 0, y: 0 },
    rotationOrbit: { x: 0.3, y: 0.5 },
    zoomDistance: 12,
    wormSegments: []
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Clock setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070b19);
    scene.fog = new THREE.FogExp2(0x070b19, 0.035);

    const clock = new THREE.Clock();

    // 2. Camera setup
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 420;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 5, 12);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lighting setup
    const ambientLight = new THREE.AmbientLight(0x223355, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x60a5fa, 2.0);
    dirLight.position.set(6, 12, 8);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const redThreatLight = new THREE.PointLight(0xef4444, 2.5, 15);
    redThreatLight.position.set(-5, 3, 2);
    scene.add(redThreatLight);

    const cyanShieldLight = new THREE.PointLight(0x06b6d4, 2.0, 15);
    cyanShieldLight.position.set(0, 2, 0);
    scene.add(cyanShieldLight);

    // 5. Grid plane (cyber platform)
    const gridHelper = new THREE.GridHelper(24, 24, 0x1e3a8a, 0x0f172a);
    gridHelper.position.y = -0.01;
    scene.add(gridHelper);

    // 6. Central Host Computer Core (Digital Fortress)
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Computer Server Rack base
    const baseGeo = new THREE.CylinderGeometry(2.0, 2.3, 0.4, 32);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.2
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = 0.2;
    baseMesh.receiveShadow = true;
    coreGroup.add(baseMesh);

    // Server Towers
    const serverGeo = new THREE.BoxGeometry(0.8, 2.2, 0.8);
    const serverMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.6,
      roughness: 0.3
    });
    for (let i = 0; i < 3; i++) {
      const server = new THREE.Mesh(serverGeo, serverMat);
      server.position.set((i - 1) * 0.9, 1.4, 0);
      server.castShadow = true;
      server.receiveShadow = true;
      coreGroup.add(server);

      // Blinking status LEDs
      for (let led = 0; led < 4; led++) {
        const ledGeo = new THREE.BoxGeometry(0.1, 0.05, 0.02);
        const ledMat = new THREE.MeshBasicMaterial({
          color: led % 2 === 0 ? 0x10b981 : 0x38bdf8
        });
        const ledMesh = new THREE.Mesh(ledGeo, ledMat);
        ledMesh.position.set((i - 1) * 0.9, 0.8 + led * 0.35, 0.41);
        coreGroup.add(ledMesh);
      }
    }

    // Glowing Hologram Core Sphere
    const holoCoreGeo = new THREE.SphereGeometry(0.45, 16, 16);
    const holoCoreMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.8,
      wireframe: true
    });
    const holoCore = new THREE.Mesh(holoCoreGeo, holoCoreMat);
    holoCore.position.set(0, 3.0, 0);
    coreGroup.add(holoCore);

    // 7. Protective Firewall Shield Sphere (Tường lửa 3D)
    const shieldGeo = new THREE.IcosahedronGeometry(3.6, 2);
    const shieldMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0891b2,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.35,
      wireframe: true
    });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    shieldMesh.position.set(0, 1.6, 0);
    scene.add(shieldMesh);

    // 8. TROJAN HORSE 3D COMPOSITE MODEL (Mô hình Ngựa Gỗ thành Troa 3D)
    const trojanGroup = new THREE.Group();
    trojanGroup.position.set(5.5, 0, 1.5);
    scene.add(trojanGroup);

    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x92400e, // warm wood tone
      roughness: 0.8,
      metalness: 0.1
    });

    // Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.15, 16);
    wheelGeo.rotateZ(Math.PI / 2);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.9 });
    const wheelPositions = [
      [-0.8, 0.35, 0.7],
      [0.8, 0.35, 0.7],
      [-0.8, 0.35, -0.7],
      [0.8, 0.35, -0.7]
    ];
    wheelPositions.forEach((pos) => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.position.set(pos[0], pos[1], pos[2]);
      trojanGroup.add(wheel);
    });

    // Wooden cart platform
    const platformGeo = new THREE.BoxGeometry(2.0, 0.2, 1.6);
    const platform = new THREE.Mesh(platformGeo, woodMat);
    platform.position.y = 0.55;
    trojanGroup.add(platform);

    // 4 Legs
    const legGeo = new THREE.BoxGeometry(0.3, 1.2, 0.3);
    const legPositions = [
      [-0.6, 1.25, 0.5],
      [0.6, 1.25, 0.5],
      [-0.6, 1.25, -0.5],
      [0.6, 1.25, -0.5]
    ];
    legPositions.forEach((pos) => {
      const leg = new THREE.Mesh(legGeo, woodMat);
      leg.position.set(pos[0], pos[1], pos[2]);
      trojanGroup.add(leg);
    });

    // Hollow Horse Torso (Body)
    const bodyGeo = new THREE.BoxGeometry(1.6, 1.1, 1.2);
    const body = new THREE.Mesh(bodyGeo, woodMat);
    body.position.set(0, 2.2, 0);
    trojanGroup.add(body);

    // Horse Neck and Head
    const neckGeo = new THREE.BoxGeometry(0.4, 0.9, 0.5);
    neckGeo.rotateZ(-Math.PI / 6);
    const neck = new THREE.Mesh(neckGeo, woodMat);
    neck.position.set(-0.85, 2.8, 0);
    trojanGroup.add(neck);

    const headGeo = new THREE.BoxGeometry(0.7, 0.45, 0.45);
    const head = new THREE.Mesh(headGeo, woodMat);
    head.position.set(-1.25, 3.1, 0);
    trojanGroup.add(head);

    // Secret Hatch Door on the belly
    const hatchGeo = new THREE.BoxGeometry(0.8, 0.7, 0.05);
    const hatchMat = new THREE.MeshStandardMaterial({
      color: 0x78350f,
      roughness: 0.6
    });
    const trojanHatch = new THREE.Mesh(hatchGeo, hatchMat);
    trojanHatch.position.set(0, 2.2, 0.62);
    trojanGroup.add(trojanHatch);

    // Hidden Payload inside Trojan belly: Red Glowing Spyware / Keylogger Chip
    const trojanPayload = new THREE.Group();
    trojanPayload.position.set(0, 2.2, 0);
    trojanGroup.add(trojanPayload);

    const spyChipGeo = new THREE.BoxGeometry(0.4, 0.3, 0.4);
    const spyChipMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xdc2626,
      emissiveIntensity: 0.9,
      wireframe: true
    });
    const spyChip = new THREE.Mesh(spyChipGeo, spyChipMat);
    trojanPayload.add(spyChip);

    // Spyware radar antenae
    const antennaGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.5);
    const antennaMat = new THREE.MeshBasicMaterial({ color: 0xf87171 });
    const antenna = new THREE.Mesh(antennaGeo, antennaMat);
    antenna.position.set(0, 0.35, 0);
    trojanPayload.add(antenna);

    // 9. VIRUS 3D COMPOSITE (Ký sinh bám vào file máy chủ Host File .EXE)
    const virusGroup = new THREE.Group();
    virusGroup.position.set(-5.5, 2.0, 0);
    scene.add(virusGroup);

    // Floating Host Program File (.EXE block)
    const hostFileGeo = new THREE.BoxGeometry(1.6, 2.2, 0.3);
    const hostFileMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.6,
      roughness: 0.2
    });
    const hostFile = new THREE.Mesh(hostFileGeo, hostFileMat);
    virusGroup.add(hostFile);

    // Red Spiky Virus Capsid latching onto the file
    const virusCapsidGeo = new THREE.IcosahedronGeometry(0.45, 1);
    const virusCapsidMat = new THREE.MeshStandardMaterial({
      color: 0xd946ef,
      emissive: 0x9333ea,
      emissiveIntensity: 0.6,
      roughness: 0.3
    });
    const virusCapsid = new THREE.Mesh(virusCapsidGeo, virusCapsidMat);
    virusCapsid.position.set(0.6, 0.5, 0.25);
    virusGroup.add(virusCapsid);

    // Virus protein spikes radiating outward
    for (let s = 0; s < 10; s++) {
      const spikeGeo = new THREE.ConeGeometry(0.06, 0.25, 6);
      spikeGeo.rotateX(Math.PI / 2);
      const spikeMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e });
      const spike = new THREE.Mesh(spikeGeo, spikeMat);

      const phi = Math.acos(-1 + (2 * s) / 10);
      const theta = Math.sqrt(10 * Math.PI) * phi;
      spike.position.set(
        0.6 + 0.45 * Math.sin(phi) * Math.cos(theta),
        0.5 + 0.45 * Math.sin(phi) * Math.sin(theta),
        0.25 + 0.45 * Math.cos(phi)
      );
      spike.lookAt(0.6, 0.5, 0.25);
      virusGroup.add(spike);
    }

    // 10. WORM 3D MODEL (Sâu máy tính uốn lượn chui qua ống mạng Network Port)
    const wormGroup = new THREE.Group();
    wormGroup.position.set(0, 1.8, -5.5);
    scene.add(wormGroup);

    // Network Pipeline cylinder
    const pipeGeo = new THREE.CylinderGeometry(1.0, 1.0, 4.5, 16, 1, true);
    pipeGeo.rotateX(Math.PI / 2);
    const pipeMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const pipe = new THREE.Mesh(pipeGeo, pipeMat);
    wormGroup.add(pipe);

    // Multi-segment Autonomous Worm Body
    const wormSegments: THREE.Mesh[] = [];
    const segmentCount = 7;
    for (let seg = 0; seg < segmentCount; seg++) {
      const segGeo = new THREE.SphereGeometry(0.32 - seg * 0.02, 12, 12);
      const segMat = new THREE.MeshStandardMaterial({
        color: seg === 0 ? 0x22c55e : 0x16a34a,
        emissive: seg === 0 ? 0x15803d : 0x14532d,
        emissiveIntensity: 0.6,
        roughness: 0.4
      });
      const segment = new THREE.Mesh(segGeo, segMat);
      segment.position.set(0, 0, (seg - segmentCount / 2) * 0.45);
      wormGroup.add(segment);
      wormSegments.push(segment);
    }

    // 11. Ambient Floating Cyber Particles
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 180;
    const posArray = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount * 3; p += 3) {
      posArray[p] = (Math.random() - 0.5) * 20;
      posArray[p + 1] = Math.random() * 8;
      posArray[p + 2] = (Math.random() - 0.5) * 20;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.7
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Store references
    stateRef.current.scene = scene;
    stateRef.current.camera = camera;
    stateRef.current.renderer = renderer;
    stateRef.current.clock = clock;
    stateRef.current.coreGroup = coreGroup;
    stateRef.current.shieldMesh = shieldMesh;
    stateRef.current.trojanGroup = trojanGroup;
    stateRef.current.trojanHatch = trojanHatch;
    stateRef.current.trojanPayload = trojanPayload;
    stateRef.current.virusGroup = virusGroup;
    stateRef.current.wormGroup = wormGroup;
    stateRef.current.wormSegments = wormSegments;
    stateRef.current.particles = particles;

    // 12. Animation Loop with requestAnimationFrame
    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotating core hologram
      if (holoCore) {
        holoCore.rotation.y = elapsedTime * 0.8;
        holoCore.rotation.x = elapsedTime * 0.4;
      }

      // Shield pulse and rotation
      if (shieldMesh) {
        shieldMesh.rotation.y = elapsedTime * 0.15;
        if (shieldActive) {
          shieldMesh.scale.setScalar(1.0 + Math.sin(elapsedTime * 2.5) * 0.02);
        }
      }

      // Virus wriggling and floating
      if (virusGroup) {
        virusGroup.position.y = 2.0 + Math.sin(elapsedTime * 1.5) * 0.2;
        virusCapsid.rotation.y = elapsedTime * 1.2;
      }

      // Worm undulating motion (sine-wave crawl)
      wormSegments.forEach((seg, idx) => {
        seg.position.x = Math.sin(elapsedTime * 3 + idx * 0.6) * 0.25;
        seg.position.y = Math.cos(elapsedTime * 3 + idx * 0.6) * 0.15;
      });

      // Trojan hatch open/close animation
      if (trojanHatch) {
        const targetRotY = trojanOpen ? Math.PI / 2 : 0;
        trojanHatch.rotation.y += (targetRotY - trojanHatch.rotation.y) * 0.1;
      }

      // Smooth camera orbit positioning
      const state = stateRef.current;
      const radius = state.zoomDistance;
      const camX = radius * Math.sin(state.rotationOrbit.y) * Math.cos(state.rotationOrbit.x);
      const camY = radius * Math.sin(state.rotationOrbit.x);
      const camZ = radius * Math.cos(state.rotationOrbit.y) * Math.cos(state.rotationOrbit.x);

      // Lerp camera to target
      camera.position.lerp(new THREE.Vector3(camX, Math.max(camY, 1.2), camZ), 0.08);
      camera.lookAt(state.targetLookAt);

      renderer.render(scene, camera);
    };

    animate();
    stateRef.current.frameId = frameId;

    // 13. Drag to rotate controls
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
        0.1,
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
        6,
        Math.min(20, stateRef.current.zoomDistance + e.deltaY * 0.015)
      );
    };

    // Touch controls for mobile / tablet
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
        0.1,
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

    // 14. Cleanup memory on unmount
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

      // Recursive dispose
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

  // Update Shield state when toggled
  useEffect(() => {
    if (stateRef.current.shieldMesh) {
      stateRef.current.shieldMesh.visible = shieldActive;
    }
  }, [shieldActive]);

  // Update view mode camera angle presets
  const handleSelectMode = (mode: Malware3DMode) => {
    setActiveMode(mode);
    setInspectInfo(mode);

    const state = stateRef.current;
    if (mode === 'overview') {
      state.rotationOrbit = { x: 0.35, y: 0.6 };
      state.zoomDistance = 13;
      state.targetLookAt.set(0, 1.5, 0);
    } else if (mode === 'trojan') {
      state.rotationOrbit = { x: 0.25, y: 1.4 };
      state.zoomDistance = 7.5;
      state.targetLookAt.set(5.5, 2.0, 1.5);
    } else if (mode === 'virus') {
      state.rotationOrbit = { x: 0.3, y: -1.2 };
      state.zoomDistance = 7.0;
      state.targetLookAt.set(-5.5, 2.0, 0);
    } else if (mode === 'worm') {
      state.rotationOrbit = { x: 0.45, y: 3.1 };
      state.zoomDistance = 8.0;
      state.targetLookAt.set(0, 1.8, -5.5);
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
            <Shield className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>Three.js Interactive 3D Lab</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div className="text-sm font-bold text-white">
              {bilingualMode === 'en'
                ? 'Cyber Threat & Defense 3D Simulation'
                : 'Mô phỏng 3D: Căn phòng Pháo đài & Mã độc Không gian Mạng'}
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
            {bilingualMode === 'en' ? 'Overview' : 'Tổng quan'}
          </button>
          <button
            type="button"
            onClick={() => handleSelectMode('trojan')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'trojan'
                ? 'bg-amber-500 text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {bilingualMode === 'en' ? 'Trojan Horse 3D' : 'Ngựa Trojan 3D'}
          </button>
          <button
            type="button"
            onClick={() => handleSelectMode('virus')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'virus'
                ? 'bg-fuchsia-500 text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {bilingualMode === 'en' ? 'Virus .EXE 3D' : 'Virus ký sinh 3D'}
          </button>
          <button
            type="button"
            onClick={() => handleSelectMode('worm')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'worm'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {bilingualMode === 'en' ? 'Worm Tunnel 3D' : 'Sâu Worm 3D'}
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Viewport */}
      <div
        className="w-full h-[400px] sm:h-[480px] cursor-grab active:cursor-grabbing relative select-none overflow-hidden"
      >
        <div ref={containerRef} className="absolute inset-0 w-full h-full" />
        {/* Floating In-Scene Controls */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {/* Shield On/Off toggle */}
          <button
            type="button"
            onClick={() => setShieldActive(!shieldActive)}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer backdrop-blur-md ${
              shieldActive
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20'
                : 'bg-rose-500/20 border-rose-500/40 text-rose-300'
            }`}
          >
            {shieldActive ? (
              <>
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>
                  {bilingualMode === 'en'
                    ? 'Firewall Shield: ACTIVE'
                    : 'Tường lửa Khiên: ĐANG BẬT'}
                </span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>
                  {bilingualMode === 'en'
                    ? 'Firewall Shield: BYPASSED'
                    : 'Tường lửa: ĐÃ VÔ HIỆU HÓA'}
                </span>
              </>
            )}
          </button>

          {/* Trojan Hatch toggle when in Trojan mode or overview */}
          {(activeMode === 'trojan' || activeMode === 'overview') && (
            <button
              type="button"
              onClick={() => setTrojanOpen(!trojanOpen)}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer backdrop-blur-md ${
                trojanOpen
                  ? 'bg-amber-500/30 border-amber-400 text-amber-200'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>
                {trojanOpen
                  ? bilingualMode === 'en'
                    ? 'Belly Hatch: OPEN (Spyware exposed)'
                    : 'Khoang bụng: ĐÃ MỞ (Lộ gián điệp)'
                  : bilingualMode === 'en'
                    ? 'Open Trojan Belly Hatch'
                    : 'Mở nắp bụng Ngựa Trojan'}
              </span>
            </button>
          )}

          {/* Reset Camera button */}
          <button
            type="button"
            onClick={resetCamera}
            className="px-3 py-2 rounded-xl text-xs font-medium bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-2 transition-all cursor-pointer backdrop-blur-md"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>{bilingualMode === 'en' ? 'Reset Angle' : 'Đặt lại góc nhìn'}</span>
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
              <Shield className="w-4 h-4" />
              <span>
                {bilingualMode === 'en'
                  ? 'Core Digital Fortress Architecture'
                  : 'Kiến trúc Pháo đài Số & Ma trận Mối đe dọa'}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {bilingualMode === 'en'
                ? 'Central server rack represents your host computer operating system protected by an active Firewall / Antivirus shield. Surrounding it are the 3 major malware threats defined in Lesson 9: Trojan Horse (disguised infiltration), Virus (host file parasite), and Worm (autonomous network replicator).'
                : 'Tháp máy chủ trung tâm đại diện cho hệ điều hành máy tính được che chắn bởi màng bọc Tường lửa (Firewall) và Antivirus. Xung quanh là 3 nhóm hiểm họa mã độc SGK Bài 9: Ngựa Trojan (nội gián ngụy trang), Virus (ký sinh gắn vào tệp .exe) và Sâu Worm (tự lây lan độc lập qua mạng).'}
            </p>
          </div>
        )}

        {inspectInfo === 'trojan' && (
          <div className="space-y-1.5 animate-in fade-in">
            <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
              <Zap className="w-4 h-4" />
              <span>
                {bilingualMode === 'en'
                  ? 'Trojan Horse Anatomy (SGK Page 46)'
                  : 'Bóc tách Mã độc Trojan Horse - Ngựa thành Troa (SGK Trang 46)'}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {bilingualMode === 'en'
                ? 'Named after ancient Greek myth. Trojan disguises itself as harmless software or game. Inside its belly lies covert spyware payloads: Keylogger (stealing keystrokes), Backdoor (secret unauthorized remote access), or Rootkit (admin privilege seizure).'
                : 'Theo truyền thuyết Hy Lạp: Ngựa gỗ mang vỏ bọc quà tặng lành tính, nhưng bên trong khoang chứa gián điệp ngầm. Khi cài đặt, Trojan thực hiện hành vi nội gián như Keylogger (ghi trộm bàn phím), Backdoor (mở cửa sau vào máy), Rootkit (chiếm quyền kiểm soát tối cao).'}
            </p>
          </div>
        )}

        {inspectInfo === 'virus' && (
          <div className="space-y-1.5 animate-in fade-in">
            <div className="flex items-center gap-2 text-sm font-bold text-fuchsia-400">
              <Bug className="w-4 h-4" />
              <span>
                {bilingualMode === 'en'
                  ? 'Computer Virus Parasitic Infection (SGK Page 46)'
                  : 'Cơ chế Ký sinh của Virus Máy tính (SGK Trang 46)'}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {bilingualMode === 'en'
                ? 'A virus is NOT a standalone program. It consists of incomplete malicious code snippets that attach to a host file (such as .EXE or .DOCX). It only awakens and replicates when the infected host program is executed by the user.'
                : 'Virus KHÔNG phải là phần mềm hoàn chỉnh, mà chỉ là các đoạn mã độc phải gắn ký sinh vào một phần mềm máy chủ (như tệp .EXE). Khi người dùng chạy chương trình nhiễm, đoạn mã độc được nạp vào bộ nhớ và chèn vào các tệp khác để hoàn thành chu kỳ lây lan.'}
            </p>
          </div>
        )}

        {inspectInfo === 'worm' && (
          <div className="space-y-1.5 animate-in fade-in">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
              <Layers className="w-4 h-4" />
              <span>
                {bilingualMode === 'en'
                  ? 'Computer Worm Autonomous Propagation (SGK Page 46)'
                  : 'Sâu Máy tính Worm - Tự Nhân bản qua Mạng (SGK Trang 46)'}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {bilingualMode === 'en'
                ? 'Unlike a virus, a worm is a fully standalone program. It does not need a host file; it autonomously crawls through network ports and exploits operating system vulnerabilities. Infamous examples: Melissa (1999), Code Red (2001), and WannaCry (2017).'
                : 'Khác với virus, Worm là một phần mềm hoàn chỉnh độc lập. Để lây nhiễm, worm lợi dụng các lỗ hổng bảo mật của hệ điều hành hoặc lừa người dùng nhấp vào link ngầm trong email. Các thảm họa sâu máy tính nổi tiếng: Melissa (1999), Code Red (2001) và WannaCry (2017).'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
