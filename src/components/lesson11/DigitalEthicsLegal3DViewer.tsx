import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  RotateCcw,
  Maximize2,
  ShieldCheck,
  Scale,
  Sparkles,
  Info,
  Layers,
  AlertTriangle,
  Award,
  Radio,
  FileCheck2,
  Lock
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

export const DigitalEthicsLegal3DViewer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { bilingualMode } = useBook();

  // Interactive state
  const [activePreset, setActivePreset] = useState<'balance' | 'shield' | 'radar' | 'risk'>('balance');
  const [balanceState, setBalanceState] = useState<'equal' | 'ethics_breach' | 'copyright_breach'>('equal');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [selectedNodeInfo, setSelectedNodeInfo] = useState<string | null>(null);

  // References for dynamic animation
  const beamGroupRef = useRef<THREE.Group | null>(null);
  const shieldMeshRef = useRef<THREE.Mesh | null>(null);
  const radarGroupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    if (!selectedNodeInfo) return;
    const getNodeText = (preset: 'balance' | 'shield' | 'radar' | 'risk', mode: 'vi' | 'en') => {
      if (preset === 'balance') {
        return mode === 'en'
          ? 'Dual Scales: Weighing Digital Ethics (Cyan) vs Statutory Law & Copyright (Gold). Balanced behavior creates harmonious online citizenship.'
          : 'Cán cân Công lý: Đạo đức số (Xanh ngọc) và Pháp luật & Bản quyền (Vàng kim). Hành vi chuẩn mực tạo nên sự hài hòa trên không gian số.';
      } else if (preset === 'shield') {
        return mode === 'en'
          ? 'Intellectual Property Shield (IP): Guarantees Moral Rights (integrity, attribution) & Economic Rights (distribution, licensing).'
          : 'Khiên Bản quyền & Sở hữu trí tuệ: Bảo vệ Quyền nhân thân (tên tác giả, tính toàn vẹn) và Quyền tài sản (sao chép, cấp phép sử dụng).';
      } else if (preset === 'radar') {
        return mode === 'en'
          ? 'Social Media Radar (Decision 874/QD-BTTTT): Scans digital information streams to promote positive content and filter viral misinformation.'
          : 'Radar Quy tắc Ứng xử (Quyết định 874/QĐ-BTTTT): Quét luồng thông tin mạng nhằm khuyến khích lan tỏa năng lượng tích cực và ngăn chặn tin giả.';
      } else {
        return mode === 'en'
          ? 'Cyber Risk Matrix: Visualizing liabilities under Decree 15/2020 (10–20M VND fine for fake news) and Decree 131/2013 (sanctions on software cracking).'
          : 'Mô phỏng Rủi ro & Chế tài: Xử phạt hành chính từ 10–20 triệu đồng (Nghị định 15/2020) cho tin giả và xử lý nghiêm hành vi bẻ khóa phần mềm (Nghị định 131/2013).';
      }
    };
    setSelectedNodeInfo(getNodeText(activePreset, bilingualMode));
  }, [bilingualMode, activePreset]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frameId = 0;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070b14);

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 520;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 8, 22);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.replaceChildren(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 50;
    controls.minDistance = 6;
    controls.maxPolarAngle = Math.PI / 2 + 0.1;
    controlsRef.current = controls;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffeedd, 1.8);
    dirLight1.position.set(12, 20, 15);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const cyanPointLight = new THREE.PointLight(0x06b6d4, 3, 30);
    cyanPointLight.position.set(-8, 6, 4);
    scene.add(cyanPointLight);

    const goldPointLight = new THREE.PointLight(0xf59e0b, 3, 30);
    goldPointLight.position.set(8, 6, 4);
    scene.add(goldPointLight);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(32, 32, 0x1e293b, 0x0f172a);
    gridHelper.position.y = -4;
    scene.add(gridHelper);

    // ==========================================
    // 1. THE CENTRAL PILLAR OF LAW & JUSTICE (Trụ Cột Pháp Luật)
    // ==========================================
    const pillarGroup = new THREE.Group();

    // Base pedestal
    const baseGeo = new THREE.CylinderGeometry(3.5, 4.2, 0.8, 32);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.25
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -3.6;
    baseMesh.receiveShadow = true;
    pillarGroup.add(baseMesh);

    // Golden decorative ring on pedestal
    const ringGeo = new THREE.TorusGeometry(3.7, 0.12, 16, 64);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.15,
      emissive: 0xd97706,
      emissiveIntensity: 0.3
    });
    const ringMesh = new THREE.Mesh(ringGeo, goldMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = -3.2;
    pillarGroup.add(ringMesh);

    // Main column
    const columnGeo = new THREE.CylinderGeometry(0.8, 1.1, 8.5, 32);
    const columnMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.7,
      roughness: 0.3
    });
    const columnMesh = new THREE.Mesh(columnGeo, columnMat);
    columnMesh.position.y = 1.0;
    columnMesh.castShadow = true;
    pillarGroup.add(columnMesh);

    // Pillar capital (Fulcrum sphere)
    const fulcrumGeo = new THREE.SphereGeometry(1.0, 32, 32);
    const fulcrumMesh = new THREE.Mesh(fulcrumGeo, goldMat);
    fulcrumMesh.position.y = 5.4;
    pillarGroup.add(fulcrumMesh);

    scene.add(pillarGroup);

    // ==========================================
    // 2. THE BALANCE BEAM & DUAL SCALES (Cán Cân Công Lý)
    // ==========================================
    const beamGroup = new THREE.Group();
    beamGroup.position.set(0, 5.4, 0);
    beamGroupRef.current = beamGroup;

    // Horizontal crossbeam
    const beamGeo = new THREE.BoxGeometry(14, 0.35, 0.5);
    const beamMesh = new THREE.Mesh(beamGeo, goldMat);
    beamGroup.add(beamMesh);

    // Left Scale: DIGITAL ETHICS (Đạo đức số - Cyan Plate)
    const leftScaleGroup = new THREE.Group();
    leftScaleGroup.position.set(-6.2, 0, 0);

    // Cords
    const cordMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.7 });
    for (let i = 0; i < 3; i++) {
      const angle = (i * Math.PI * 2) / 3;
      const x = Math.cos(angle) * 1.6;
      const z = Math.sin(angle) * 1.6;
      const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, -3.2, z)];
      const cordGeo = new THREE.BufferGeometry().setFromPoints(points);
      const cord = new THREE.Line(cordGeo, cordMat);
      leftScaleGroup.add(cord);
    }

    // Left Pan
    const panGeo = new THREE.CylinderGeometry(2.0, 1.5, 0.25, 32);
    const leftPanMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x0369a1,
      emissiveIntensity: 0.3
    });
    const leftPan = new THREE.Mesh(panGeo, leftPanMat);
    leftPan.position.y = -3.2;
    leftPan.castShadow = true;
    leftScaleGroup.add(leftPan);

    // Glowing Ethics Crystal on Left Pan
    const crystalGeo = new THREE.OctahedronGeometry(1.1, 0);
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.2,
      roughness: 0.1,
      emissive: 0x0284c7,
      emissiveIntensity: 0.8,
      wireframe: false
    });
    const crystal = new THREE.Mesh(crystalGeo, crystalMat);
    crystal.position.y = -2.3;
    leftScaleGroup.add(crystal);

    beamGroup.add(leftScaleGroup);

    // Right Scale: STATUTORY LAW & COPYRIGHT (Pháp luật & Bản quyền - Gold Plate)
    const rightScaleGroup = new THREE.Group();
    rightScaleGroup.position.set(6.2, 0, 0);

    // Right Cords
    const rightCordMat = new THREE.LineBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.7 });
    for (let i = 0; i < 3; i++) {
      const angle = (i * Math.PI * 2) / 3;
      const x = Math.cos(angle) * 1.6;
      const z = Math.sin(angle) * 1.6;
      const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, -3.2, z)];
      const cordGeo = new THREE.BufferGeometry().setFromPoints(points);
      const cord = new THREE.Line(cordGeo, rightCordMat);
      rightScaleGroup.add(cord);
    }

    // Right Pan
    const rightPanMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0xb45309,
      emissiveIntensity: 0.3
    });
    const rightPan = new THREE.Mesh(panGeo, rightPanMat);
    rightPan.position.y = -3.2;
    rightPan.castShadow = true;
    rightScaleGroup.add(rightPan);

    // Glowing Law & Copyright Crest on Right Pan
    const crestGeo = new THREE.DodecahedronGeometry(1.0, 0);
    const crestMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.3,
      roughness: 0.1,
      emissive: 0xd97706,
      emissiveIntensity: 0.8
    });
    const crest = new THREE.Mesh(crestGeo, crestMat);
    crest.position.y = -2.3;
    rightScaleGroup.add(crest);

    beamGroup.add(rightScaleGroup);
    scene.add(beamGroup);

    // ==========================================
    // 3. INTELLECTUAL PROPERTY SHIELD (Khiên Bản Quyền Số)
    // ==========================================
    const shieldGroup = new THREE.Group();
    shieldGroup.position.set(0, 0.5, 4.5);

    // Outer Hexagonal Shield
    const shieldShape = new THREE.Shape();
    const sSize = 2.4;
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const x = Math.cos(angle) * sSize;
      const y = Math.sin(angle) * sSize * 1.15;
      if (i === 0) shieldShape.moveTo(x, y);
      else shieldShape.lineTo(x, y);
    }
    shieldShape.closePath();

    const extrudeSettings = { depth: 0.3, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.1, bevelThickness: 0.1 };
    const shieldGeo = new THREE.ExtrudeGeometry(shieldShape, extrudeSettings);
    const shieldMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e3a8a,
      metalness: 0.6,
      roughness: 0.2,
      transmission: 0.5,
      transparent: true,
      opacity: 0.85,
      reflectivity: 0.9,
      clearcoat: 1.0,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.4
    });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    shieldMesh.rotation.y = Math.PI;
    shieldMeshRef.current = shieldMesh;
    shieldGroup.add(shieldMesh);

    // Golden "C" (Copyright symbol) in center of shield
    const cTorusGeo = new THREE.TorusGeometry(0.8, 0.15, 16, 48, Math.PI * 1.5);
    const cMesh = new THREE.Mesh(cTorusGeo, goldMat);
    cMesh.position.set(0, 0, -0.4);
    cMesh.rotation.z = Math.PI * 0.75;
    shieldGroup.add(cMesh);

    // Orbiting Moral Rights & Economic Rights Ribbons
    const ribbon1Geo = new THREE.TorusGeometry(3.3, 0.08, 16, 64);
    const moralMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.5
    });
    const ribbon1 = new THREE.Mesh(ribbon1Geo, moralMat);
    ribbon1.rotation.x = Math.PI / 3;
    shieldGroup.add(ribbon1);

    const ribbon2Geo = new THREE.TorusGeometry(3.6, 0.08, 16, 64);
    const ecoMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.5
    });
    const ribbon2 = new THREE.Mesh(ribbon2Geo, ecoMat);
    ribbon2.rotation.y = Math.PI / 3;
    shieldGroup.add(ribbon2);

    scene.add(shieldGroup);

    // ==========================================
    // 4. RADAR OF DIGITAL CODE OF CONDUCT (Radar 874/QĐ-BTTTT)
    // ==========================================
    const radarGroup = new THREE.Group();
    radarGroup.position.set(0, -3.8, 0);
    radarGroupRef.current = radarGroup;

    // Concentric scanning rings
    [5.5, 8.5, 11.5].forEach((radius, idx) => {
      const ringGeo = new THREE.RingGeometry(radius, radius + 0.1, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: idx === 0 ? 0x10b981 : idx === 1 ? 0x06b6d4 : 0x6366f1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45 - idx * 0.1
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      radarGroup.add(ring);
    });

    // Orbiting Data Nodes (Packets)
    const nodeGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const goodNodeMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.8
    });
    const badNodeMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xdc2626,
      emissiveIntensity: 0.8
    });
    const cautionNodeMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.8
    });

    const packetNodes: { mesh: THREE.Mesh; angle: number; radius: number; speed: number }[] = [];
    const samplePackets = [
      { radius: 6.0, speed: 0.015, mat: goodNodeMat, label: 'Chia sẻ thông tin tích cực / Gương người tốt' },
      { radius: 7.2, speed: -0.012, mat: badNodeMat, label: 'Tin giả Covid-19 / Phong tỏa 14 ngày (Phạt 10-20tr)' },
      { radius: 8.8, speed: 0.009, mat: goodNodeMat, label: 'Tôn trọng bản quyền tác giả / Mua Licence chuẩn' },
      { radius: 9.6, speed: -0.014, mat: badNodeMat, label: 'Bẻ khóa phần mềm (Crack) / Xâm phạm NĐ 131' },
      { radius: 10.8, speed: 0.008, mat: cautionNodeMat, label: 'Bình luận tranh luận MXH / Cần chuẩn mực đạo đức' },
      { radius: 11.8, speed: -0.011, mat: badNodeMat, label: 'Đăng video bạo lực học đường / Bắt nạt qua mạng' }
    ];

    samplePackets.forEach((p) => {
      const mesh = new THREE.Mesh(nodeGeo, p.mat);
      mesh.position.set(p.radius, 0.4, 0);
      radarGroup.add(mesh);
      packetNodes.push({ mesh, angle: Math.random() * Math.PI * 2, radius: p.radius, speed: p.speed });
    });

    scene.add(radarGroup);

    // Floating Ambient Particles
    const particleCount = 200;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 36;
      particlePositions[i + 1] = Math.random() * 18 - 3;
      particlePositions[i + 2] = (Math.random() - 0.5) * 36;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.15,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Animate Beam Tilt based on balanceState
      if (beamGroupRef.current) {
        let targetAngle = 0;
        if (balanceState === 'ethics_breach') {
          targetAngle = 0.22; // left pan goes down
        } else if (balanceState === 'copyright_breach') {
          targetAngle = -0.22; // right pan goes down
        }
        beamGroupRef.current.rotation.z += (targetAngle - beamGroupRef.current.rotation.z) * 0.08;
      }

      // Spin crystal & crest
      crystal.rotation.y = elapsedTime * 1.2;
      crystal.rotation.x = Math.sin(elapsedTime) * 0.3;
      crest.rotation.y = -elapsedTime * 1.2;
      crest.rotation.z = Math.cos(elapsedTime) * 0.3;

      // Pulse IP shield & rotate ribbons
      if (shieldMeshRef.current) {
        shieldMeshRef.current.rotation.y = Math.PI + Math.sin(elapsedTime * 0.6) * 0.15;
      }
      ribbon1.rotation.z = elapsedTime * 0.8;
      ribbon2.rotation.x = -elapsedTime * 0.7;

      // Rotate radar nodes
      packetNodes.forEach((node) => {
        node.angle += node.speed;
        node.mesh.position.x = Math.cos(node.angle) * node.radius;
        node.mesh.position.z = Math.sin(node.angle) * node.radius;
        node.mesh.position.y = 0.4 + Math.sin(elapsedTime * 3 + node.radius) * 0.25;
      });

      // Slowly rotate particles
      particles.rotation.y = elapsedTime * 0.04;

      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = 0.8;
      controls.update();

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      baseGeo.dispose();
      baseMat.dispose();
      ringGeo.dispose();
      goldMat.dispose();
      columnGeo.dispose();
      columnMat.dispose();
      fulcrumGeo.dispose();
      beamGeo.dispose();
      cordMat.dispose();
      panGeo.dispose();
      leftPanMat.dispose();
      crystalGeo.dispose();
      crystalMat.dispose();
      rightCordMat.dispose();
      rightPanMat.dispose();
      crestGeo.dispose();
      crestMat.dispose();
      shieldGeo.dispose();
      shieldMat.dispose();
      cTorusGeo.dispose();
      ribbon1Geo.dispose();
      moralMat.dispose();
      ribbon2Geo.dispose();
      ecoMat.dispose();
      nodeGeo.dispose();
      goodNodeMat.dispose();
      badNodeMat.dispose();
      cautionNodeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [balanceState, autoRotate]);

  // Camera preset transitions
  const applyPreset = (preset: 'balance' | 'shield' | 'radar' | 'risk') => {
    setActivePreset(preset);
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    const getNodeText = (preset: 'balance' | 'shield' | 'radar' | 'risk', mode: 'vi' | 'en') => {
      if (preset === 'balance') {
        return mode === 'en'
          ? 'Dual Scales: Weighing Digital Ethics (Cyan) vs Statutory Law & Copyright (Gold). Balanced behavior creates harmonious online citizenship.'
          : 'Cán cân Công lý: Đạo đức số (Xanh ngọc) và Pháp luật & Bản quyền (Vàng kim). Hành vi chuẩn mực tạo nên sự hài hòa trên không gian số.';
      } else if (preset === 'shield') {
        return mode === 'en'
          ? 'Intellectual Property Shield (IP): Guarantees Moral Rights (integrity, attribution) & Economic Rights (distribution, licensing).'
          : 'Khiên Bản quyền & Sở hữu trí tuệ: Bảo vệ Quyền nhân thân (tên tác giả, tính toàn vẹn) và Quyền tài sản (sao chép, cấp phép sử dụng).';
      } else if (preset === 'radar') {
        return mode === 'en'
          ? 'Social Media Radar (Decision 874/QD-BTTTT): Scans digital information streams to promote positive content and filter viral misinformation.'
          : 'Radar Quy tắc Ứng xử (Quyết định 874/QĐ-BTTTT): Quét luồng thông tin mạng nhằm khuyến khích lan tỏa năng lượng tích cực và ngăn chặn tin giả.';
      } else {
        return mode === 'en'
          ? 'Cyber Risk Matrix: Visualizing liabilities under Decree 15/2020 (10–20M VND fine for fake news) and Decree 131/2013 (sanctions on software cracking).'
          : 'Mô phỏng Rủi ro & Chế tài: Xử phạt hành chính từ 10–20 triệu đồng (Nghị định 15/2020) cho tin giả và xử lý nghiêm hành vi bẻ khóa phần mềm (Nghị định 131/2013).';
      }
    };

    if (preset === 'balance') {
      camera.position.set(0, 7, 20);
      controls.target.set(0, 3, 0);
    } else if (preset === 'shield') {
      camera.position.set(0, 1.5, 9.5);
      controls.target.set(0, 0.8, 4.5);
    } else if (preset === 'radar') {
      camera.position.set(0, 19, 0.1);
      controls.target.set(0, -3.5, 0);
    } else if (preset === 'risk') {
      camera.position.set(10, 4, 12);
      controls.target.set(3, 0, 0);
    }
    setSelectedNodeInfo(getNodeText(preset, bilingualMode));
    controls.update();
  };

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
      {/* 3D Header Bar */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-black">
            <Scale className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                <BilingualText
                  vi="Mô phỏng 3D WebGL • Bài 11 Tin học 10 KNTT"
                  en="3D WebGL Simulation • Lesson 11 Informatics 10"
                />
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white">
              <BilingualText
                vi="Mô hình 3D Cán cân Đạo đức, Pháp lý & Khiên Bản quyền số"
                en="3D Balance of Digital Ethics, Cyber Law & IP Shield"
              />
            </h3>
          </div>
        </div>

        {/* Balance Scenario Toggles */}
        <div className="flex items-center gap-1.5 bg-slate-800/90 p-1 rounded-2xl border border-slate-700/80 text-xs">
          <button
            type="button"
            onClick={() => setBalanceState('equal')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              balanceState === 'equal'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
            title={bilingualMode === 'en' ? 'Harmonious Equilibrium' : 'Trạng thái cân bằng chuẩn mực'}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>
              <BilingualText vi="Cân bằng hài hòa" en="Equilibrium" />
            </span>
          </button>
          <button
            type="button"
            onClick={() => setBalanceState('ethics_breach')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              balanceState === 'ethics_breach'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
            title={bilingualMode === 'en' ? 'Ethics breach simulation / Cyberbullying' : 'Mô phỏng vi phạm đạo đức / Bắt nạt qua mạng'}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>
              <BilingualText vi="Vi phạm đạo đức" en="Ethics Breach" />
            </span>
          </button>
          <button
            type="button"
            onClick={() => setBalanceState('copyright_breach')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              balanceState === 'copyright_breach'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
            title={bilingualMode === 'en' ? 'Copyright piracy simulation / Cracked software' : 'Mô phỏng vi phạm bản quyền / Crack phần mềm'}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>
              <BilingualText vi="Vi phạm bản quyền" en="Piracy Breach" />
            </span>
          </button>
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <div className="relative w-full h-[460px] sm:h-[520px] bg-slate-950">
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Floating Camera Preset Controller */}
        <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2 max-w-md">
          {[
            { id: 'balance', labelVi: 'Cán cân Công lý', labelEn: 'Scale of Justice', icon: Scale },
            { id: 'shield', labelVi: 'Khiên Bản quyền', labelEn: 'IP Shield', icon: ShieldCheck },
            { id: 'radar', labelVi: 'Radar 874/QĐ', labelEn: 'Conduct Radar', icon: Radio },
            { id: 'risk', labelVi: 'Rủi ro & Chế tài', labelEn: 'Cyber Liabilities', icon: AlertTriangle }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activePreset === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => applyPreset(item.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all backdrop-blur-md flex items-center gap-1.5 border cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600/90 text-white border-indigo-400 shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900/80 text-slate-300 border-slate-700/80 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>
                  <BilingualText vi={item.labelVi} en={item.labelEn} />
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Utility Buttons: Auto-rotate & Reset */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-2.5 rounded-xl border backdrop-blur-md text-xs transition-all cursor-pointer ${
              autoRotate
                ? 'bg-amber-500/30 text-amber-300 border-amber-500/50'
                : 'bg-slate-900/80 text-slate-400 border-slate-700 hover:text-white'
            }`}
            title={bilingualMode === 'en' ? 'Toggle 360° Auto-rotation' : 'Bật/Tắt tự động xoay 360°'}
          >
            <RotateCcw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </button>
          <button
            type="button"
            onClick={() => applyPreset('balance')}
            className="p-2.5 rounded-xl border border-slate-700 bg-slate-900/80 text-slate-300 hover:text-white backdrop-blur-md transition-all cursor-pointer"
            title={bilingualMode === 'en' ? 'Reset to Default Perspective' : 'Đặt lại góc nhìn mặc định'}
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Active Node Explanation Floating Box */}
        {selectedNodeInfo && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xl z-10 bg-slate-900/90 backdrop-blur-md p-3.5 rounded-2xl border border-indigo-500/40 shadow-xl text-xs text-slate-200 animate-fadeIn">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{selectedNodeInfo}</div>
            </div>
          </div>
        )}
      </div>

      {/* 3D Footer Legend Guide */}
      <div className="p-4 bg-slate-900/95 border-t border-slate-800 text-xs text-slate-400 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-sky-400 shrink-0 shadow-sm shadow-sky-400/50" />
          <span>
            <strong className="text-slate-200">
              {bilingualMode === 'en' ? 'Cyan Plate:' : 'Đĩa Xanh:'}
            </strong>{' '}
            {bilingualMode === 'en'
              ? 'Digital Ethics & Humanity (self-discipline, civility)'
              : 'Đạo đức số & Nhân văn (tự giác, không bêu riếu)'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-400 shrink-0 shadow-sm shadow-amber-400/50" />
          <span>
            <strong className="text-slate-200">
              {bilingualMode === 'en' ? 'Gold Plate:' : 'Đĩa Vàng:'}
            </strong>{' '}
            {bilingualMode === 'en'
              ? 'Statutory Law & Copyright (Cybersecurity Law, IP Law)'
              : 'Pháp luật & Bản quyền (Luật An ninh mạng, SHTT)'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-400 shrink-0 shadow-sm shadow-emerald-400/50" />
          <span>
            <strong className="text-slate-200">
              {bilingualMode === 'en' ? 'Radar 874:' : 'Radar 874:'}
            </strong>{' '}
            {bilingualMode === 'en'
              ? 'Healthy Information Flows & Digital Safety'
              : 'Luồng thông tin lành mạnh & An toàn số'}
          </span>
        </div>
      </div>
    </div>
  );
};
