import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useBook } from '../../context/BookContext';
import {
  Sparkles,
  RotateCcw,
  Maximize2,
  Play,
  Pause,
  Layers,
  Flame,
  Zap,
  Monitor,
  Cpu,
  Bot,
  Radio,
  ArrowRight,
  ShieldCheck,
  Info
} from 'lucide-react';

export type RevolutionEra = 1 | 2 | 3 | 4;

interface EraDetail {
  era: RevolutionEra;
  titleVi: string;
  titleEn: string;
  timeVi: string;
  timeEn: string;
  milestoneVi: string;
  milestoneEn: string;
  modelNameVi: string;
  modelNameEn: string;
  descVi: string;
  descEn: string;
  impactVi: string;
  impactEn: string;
  color: string;
}

const ERA_DETAILS: Record<RevolutionEra, EraDetail> = {
  1: {
    era: 1,
    titleVi: 'CMCN lần thứ nhất (1.0)',
    titleEn: '1st Industrial Revolution (1.0)',
    timeVi: 'Cuối thế kỉ XVIII – đầu thế kỉ XIX',
    timeEn: 'Late 18th – Early 19th Century',
    milestoneVi: 'Động cơ hơi nước & Cơ giới hóa',
    milestoneEn: 'Steam Power & Mechanization',
    modelNameVi: 'Mô hình Động cơ hơi nước & Bánh đà cơ khí James Watt',
    modelNameEn: 'James Watt Mechanical Steam Engine & Flywheel',
    descVi: 'Động cơ hơi nước chuyển hóa nhiệt năng thành cơ năng chuyển động quay, thay thế sức người và súc vật, mở ra kỷ nguyên nhà máy dệt và tàu hỏa đường sắt.',
    descEn: 'Steam engines transformed thermal energy into continuous mechanical rotational power, replacing muscle power and igniting the factory and railway era.',
    impactVi: 'Chuyển đổi từ sản xuất thủ công phân tán sang nền sản xuất cơ khí hóa quy mô lớn.',
    impactEn: 'Transitioned economies from agrarian manual crafting to mechanized factory manufacturing.',
    color: '#d97706'
  },
  2: {
    era: 2,
    titleVi: 'CMCN lần thứ hai (2.0)',
    titleEn: '2nd Industrial Revolution (2.0)',
    timeVi: 'Cuối thế kỉ XIX – đầu thế kỉ XX',
    timeEn: 'Late 19th – Early 20th Century',
    milestoneVi: 'Năng lượng điện & Dây chuyền sản xuất hàng loạt',
    milestoneEn: 'Electrical Energy & Mass Assembly Lines',
    modelNameVi: 'Dây chuyền Băng tải Công nghiệp & Động cơ điện Dynamo',
    modelNameEn: 'Industrial Assembly Line Conveyor & Electric Motor',
    descVi: 'Điện năng và dây chuyền lắp ráp liên tục cho phép sản xuất hàng loạt sản phẩm đồng nhất với chi phí thấp và tốc độ vượt trội.',
    descEn: 'Widespread electrical grids and moving assembly lines enabled high-speed, cost-efficient mass production of standardized goods.',
    impactVi: 'Công nghiệp bùng nổ, thúc đẩy giao thông vận tải, liên lạc điện tín và sự phát triển của các đô thị hiện đại.',
    impactEn: 'Explosive industrial expansion, urban electrification, telecommunications, and assembly-line economics.',
    color: '#2563eb'
  },
  3: {
    era: 3,
    titleVi: 'CMCN lần thứ ba (3.0)',
    titleEn: '3rd Industrial Revolution (3.0)',
    timeVi: 'Nửa sau thế kỉ XX – đầu thế kỉ XXI',
    timeEn: 'Late 20th – Early 21st Century',
    milestoneVi: 'Máy tính điện tử, Bán dẫn & Kỷ nguyên Tin học',
    milestoneEn: 'Electronic Computers, Semiconductors & Automation',
    modelNameVi: 'Trạm máy tính cá nhân (PC cổ điển) & Vi mạch bán dẫn',
    modelNameEn: 'Classic Desktop Computer Workstation & Silicon Microchips',
    descVi: 'Sự ra đời của bóng bán dẫn, máy tính điện tử và mạng Internet giúp tự động hóa quá trình tính toán, lưu trữ dữ liệu và giải phóng con người khỏi các công việc trí tuệ lặp đi lặp lại.',
    descEn: 'Transistors, microprocessors, and the Internet automated calculations and data processing, elevating human intellectual productivity.',
    impactVi: 'Tin học trở thành ngành khoa học nền tảng, tạo ra công nghiệp phần mềm và toàn cầu hóa thông tin.',
    impactEn: 'Informatics became a foundational science, spawning global software industries and digital workflows.',
    color: '#059669'
  },
  4: {
    era: 4,
    titleVi: 'CMCN lần thứ tư (4.0)',
    titleEn: '4th Industrial Revolution (4.0)',
    timeVi: 'Đầu thế kỉ XXI – Hiện nay',
    timeEn: 'Early 21st Century – Present Day',
    milestoneVi: 'IoT, AI & Hệ thống thực - ảo (Cyber-Physical Systems)',
    milestoneEn: 'IoT, AI & Cyber-Physical Systems (CPS)',
    modelNameVi: 'Cánh tay Robot công nghiệp AI & Mạng lưới IoT Đám mây',
    modelNameEn: '6-Axis AI Industrial Robotic Arm & IoT Holographic Cloud',
    descVi: 'Thiết bị thông minh kết hợp AI, dữ liệu lớn (Big Data) và điện toán đám mây cho phép máy móc tự học hỏi, tự thích nghi và kết nối vạn vật qua mạng Internet (IoT).',
    descEn: 'Smart devices fuse AI, big data, and cloud computing so machines learn, adapt, and autonomously communicate over IoT networks.',
    impactVi: 'Xóa mờ ranh giới giữa thế giới thực và thế giới số, hình thành kinh tế tri thức và xã hội thông minh.',
    impactEn: 'Fuses digital, physical, and biological spheres, driving the knowledge economy and autonomous smart societies.',
    color: '#7c3aed'
  }
};

interface IndustrialRevolutions3DViewerProps {
  initialEra?: RevolutionEra;
  onEraSelect?: (era: RevolutionEra) => void;
}

export const IndustrialRevolutions3DViewer: React.FC<IndustrialRevolutions3DViewerProps> = ({
  initialEra = 4,
  onEraSelect
}) => {
  const { bilingualMode } = useBook();
  const mountRef = useRef<HTMLDivElement>(null);

  const [activeEra, setActiveEra] = useState<RevolutionEra>(initialEra);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [showWireframe, setShowWireframe] = useState<boolean>(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Dynamic animation handles
  const animatedRefs = useRef<{
    // Era 1
    flywheel?: THREE.Mesh;
    pistonRod?: THREE.Mesh;
    steamPuffs?: THREE.Group;
    // Era 2
    conveyorRollers?: THREE.Mesh[];
    conveyorBoxes?: THREE.Mesh[];
    electricSparks?: THREE.Group;
    // Era 3
    screenTextScan?: THREE.Mesh;
    floppyDisc?: THREE.Mesh;
    // Era 4
    robotJoint1?: THREE.Group;
    robotJoint2?: THREE.Group;
    robotGripper?: THREE.Group;
    laserBeam?: THREE.Mesh;
    iotCloudRing?: THREE.Group;
  }>({});

  const handleEraChange = (era: RevolutionEra) => {
    setActiveEra(era);
    if (onEraSelect) {
      onEraSelect(era);
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 450;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfcfdff);
    scene.fog = new THREE.FogExp2(0xfcfdff, 0.025);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(4.2, 3.2, 5.2);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2.5;
    controls.maxDistance = 12;
    controls.maxPolarAngle = Math.PI / 2 + 0.05;
    controls.target.set(0, 0.6, 0);
    controlsRef.current = controls;

    // 5. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(6, 10, 6);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xdbeafe, 0.7);
    fillLight.position.set(-6, 5, -4);
    scene.add(fillLight);

    // Studio Grid & Floor
    const grid = new THREE.GridHelper(16, 32, 0xc7d2fe, 0xe2e8f0);
    grid.position.y = -0.01;
    scene.add(grid);

    const floorGeo = new THREE.CircleGeometry(8, 64);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.95,
      metalness: 0.05
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Model root group
    const modelRoot = new THREE.Group();
    scene.add(modelRoot);
    modelGroupRef.current = modelRoot;

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h, false);
        }
      }
    });
    resizeObserver.observe(container);

    const clock = new THREE.Clock();

    // Animation Loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (autoRotate && modelRoot) {
        modelRoot.rotation.y += 0.005;
      }

      if (isPlaying) {
        const anim = animatedRefs.current;

        // 1.0 Steam Engine animation: Spinning flywheel & oscillating piston
        if (anim.flywheel) {
          anim.flywheel.rotation.z -= 0.05;
        }
        if (anim.pistonRod) {
          anim.pistonRod.position.x = 0.65 + Math.sin(elapsed * 4) * 0.22;
        }
        if (anim.steamPuffs) {
          anim.steamPuffs.children.forEach((puff, idx) => {
            const pSpeed = (elapsed * 1.5 + idx * 0.4) % 2.0;
            puff.position.y = 2.2 + pSpeed * 0.8;
            puff.scale.setScalar(0.2 + pSpeed * 0.3);
            const m = (puff as THREE.Mesh).material as THREE.MeshBasicMaterial;
            if (m) m.opacity = Math.max(0, 0.6 - pSpeed * 0.3);
          });
        }

        // 2.0 Assembly Line animation: Rolling conveyor and moving parts
        if (anim.conveyorRollers) {
          anim.conveyorRollers.forEach((r) => {
            r.rotation.x += 0.04;
          });
        }
        if (anim.conveyorBoxes) {
          anim.conveyorBoxes.forEach((box, i) => {
            box.position.z = -1.6 + ((elapsed * 1.2 + i * 1.1) % 3.2);
          });
        }
        if (anim.electricSparks) {
          const sparkScale = 0.8 + Math.sin(elapsed * 12) * 0.3;
          anim.electricSparks.scale.set(sparkScale, sparkScale, sparkScale);
        }

        // 3.0 Classic PC animation: CRT scanline shimmer
        if (anim.screenTextScan) {
          anim.screenTextScan.position.y = 0.85 + Math.sin(elapsed * 3) * 0.18;
        }

        // 4.0 Robot Arm & IoT animation: Articulated joint motion & floating cloud
        if (anim.robotJoint1 && anim.robotJoint2) {
          anim.robotJoint1.rotation.y = Math.sin(elapsed * 1.2) * 0.6;
          anim.robotJoint2.rotation.z = Math.sin(elapsed * 1.8) * 0.35 + 0.3;
        }
        if (anim.robotGripper) {
          const grip = 0.04 + Math.sin(elapsed * 2.5) * 0.03;
          anim.robotGripper.children[0].position.x = -grip;
          anim.robotGripper.children[1].position.x = grip;
        }
        if (anim.laserBeam) {
          const beamPulse = 0.6 + Math.sin(elapsed * 6) * 0.3;
          (anim.laserBeam.material as THREE.MeshBasicMaterial).opacity = beamPulse;
        }
        if (anim.iotCloudRing) {
          anim.iotCloudRing.rotation.y = elapsed * 0.6;
          anim.iotCloudRing.rotation.x = Math.sin(elapsed * 0.4) * 0.2;
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Rebuild 3D procedural model upon activeEra change
  useEffect(() => {
    const root = modelGroupRef.current;
    if (!root) return;

    // Clean previous children
    while (root.children.length > 0) {
      const child = root.children[0];
      root.remove(child);
      if ((child as THREE.Mesh).geometry) (child as THREE.Mesh).geometry.dispose();
    }
    animatedRefs.current = {};

    // -------------------------------------------------------------------------
    // ERA 1: JAMES WATT STEAM ENGINE & MECHANIZATION (CMCN 1.0)
    // -------------------------------------------------------------------------
    if (activeEra === 1) {
      const g = new THREE.Group();

      const ironMat = new THREE.MeshStandardMaterial({
        color: 0x334155,
        metalness: 0.85,
        roughness: 0.3,
        wireframe: showWireframe
      });
      const copperMat = new THREE.MeshStandardMaterial({
        color: 0xd97706,
        metalness: 0.9,
        roughness: 0.25,
        wireframe: showWireframe
      });
      const brassMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        metalness: 0.95,
        roughness: 0.2,
        wireframe: showWireframe
      });
      const brickMat = new THREE.MeshStandardMaterial({
        color: 0x78350f,
        roughness: 0.9,
        wireframe: showWireframe
      });

      // 1. Brick / Stone Foundation Base
      const baseGeo = new THREE.BoxGeometry(3.6, 0.3, 2.2);
      const base = new THREE.Mesh(baseGeo, brickMat);
      base.position.y = 0.15;
      base.castShadow = true;
      g.add(base);

      // 2. Copper Steam Boiler (Nồi hơi súp-le hình trụ)
      const boilerGeo = new THREE.CylinderGeometry(0.65, 0.65, 2.0, 32);
      boilerGeo.rotateZ(Math.PI / 2);
      const boiler = new THREE.Mesh(boilerGeo, copperMat);
      boiler.position.set(-0.8, 0.95, 0);
      boiler.castShadow = true;
      g.add(boiler);

      // Boiler end caps
      [-1.8, 0.2].forEach((bx) => {
        const capGeo = new THREE.SphereGeometry(0.65, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        capGeo.rotateZ(bx < 0 ? -Math.PI / 2 : Math.PI / 2);
        const cap = new THREE.Mesh(capGeo, copperMat);
        cap.position.set(bx, 0.95, 0);
        g.add(cap);
      });

      // Boiler Pressure Gauge (Đồng hồ áp suất)
      const gaugeGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.05, 24);
      gaugeGeo.rotateX(Math.PI / 2);
      const gauge = new THREE.Mesh(gaugeGeo, brassMat);
      gauge.position.set(-0.8, 1.75, 0.4);
      g.add(gauge);

      // 3. Tall Smokestack (Ống khói hơi nước)
      const stackGeo = new THREE.CylinderGeometry(0.16, 0.2, 1.3, 24);
      const stack = new THREE.Mesh(stackGeo, ironMat);
      stack.position.set(-1.4, 2.0, 0);
      stack.castShadow = true;
      g.add(stack);

      // Animated Steam Puffs from chimney
      const steamGroup = new THREE.Group();
      steamGroup.position.set(-1.4, 0, 0);
      for (let s = 0; s < 3; s++) {
        const puffGeo = new THREE.SphereGeometry(0.2, 16, 16);
        const puffMat = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.5
        });
        const puff = new THREE.Mesh(puffGeo, puffMat);
        steamGroup.add(puff);
      }
      g.add(steamGroup);
      animatedRefs.current.steamPuffs = steamGroup;

      // 4. Reciprocating Piston Cylinder (Xi lanh chuyển động qua lại)
      const cylGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.8, 24);
      cylGeo.rotateZ(Math.PI / 2);
      const cyl = new THREE.Mesh(cylGeo, ironMat);
      cyl.position.set(0.65, 0.8, 0);
      cyl.castShadow = true;
      g.add(cyl);

      // Piston Rod
      const rodGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.9, 16);
      rodGeo.rotateZ(Math.PI / 2);
      const rod = new THREE.Mesh(rodGeo, brassMat);
      rod.position.set(0.65, 0.8, 0);
      g.add(rod);
      animatedRefs.current.pistonRod = rod;

      // 5. Giant Flywheel (Bánh đà cơ khí lớn truyền lực)
      const wheelHubGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.15, 24);
      wheelHubGeo.rotateX(Math.PI / 2);
      const flywheel = new THREE.Mesh(wheelHubGeo, ironMat);
      flywheel.position.set(1.3, 1.1, 0);

      const rimGeo = new THREE.TorusGeometry(0.9, 0.08, 16, 48);
      const rim = new THREE.Mesh(rimGeo, ironMat);
      flywheel.add(rim);

      // Spokes on flywheel
      for (let sp = 0; sp < 6; sp++) {
        const spAngle = (sp / 6) * Math.PI * 2;
        const spGeo = new THREE.BoxGeometry(0.05, 1.7, 0.05);
        spGeo.rotateZ(spAngle);
        const spoke = new THREE.Mesh(spGeo, ironMat);
        flywheel.add(spoke);
      }
      g.add(flywheel);
      animatedRefs.current.flywheel = flywheel;

      // Heavy Iron Pedestal Pillars
      const pillarGeo = new THREE.BoxGeometry(0.2, 1.1, 0.2);
      const pillar1 = new THREE.Mesh(pillarGeo, ironMat);
      pillar1.position.set(1.3, 0.55, -0.2);
      const pillar2 = new THREE.Mesh(pillarGeo, ironMat);
      pillar2.position.set(1.3, 0.55, 0.2);
      g.add(pillar1);
      g.add(pillar2);

      root.add(g);
    }

    // -------------------------------------------------------------------------
    // ERA 2: INDUSTRIAL ASSEMBLY LINE & ELECTRICAL DYNAMO (CMCN 2.0)
    // -------------------------------------------------------------------------
    else if (activeEra === 2) {
      const g = new THREE.Group();

      const steelMat = new THREE.MeshStandardMaterial({
        color: 0x475569,
        metalness: 0.9,
        roughness: 0.2,
        wireframe: showWireframe
      });
      const beltMat = new THREE.MeshStandardMaterial({
        color: 0x18181b,
        roughness: 0.8,
        wireframe: showWireframe
      });
      const copperCoilMat = new THREE.MeshStandardMaterial({
        color: 0xea580c,
        metalness: 0.8,
        roughness: 0.3,
        wireframe: showWireframe
      });
      const partMat = new THREE.MeshStandardMaterial({
        color: 0x2563eb,
        metalness: 0.6,
        roughness: 0.3,
        wireframe: showWireframe
      });

      // 1. Assembly Conveyor Bed
      const bedGeo = new THREE.BoxGeometry(1.0, 0.15, 3.8);
      const bed = new THREE.Mesh(bedGeo, beltMat);
      bed.position.set(-0.4, 0.7, 0);
      bed.castShadow = true;
      g.add(bed);

      // Conveyor Legs
      [-1.4, 0, 1.4].forEach((lz) => {
        const legGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.7, 16);
        const legL = new THREE.Mesh(legGeo, steelMat);
        legL.position.set(-0.85, 0.35, lz);
        const legR = new THREE.Mesh(legGeo, steelMat);
        legR.position.set(0.05, 0.35, lz);
        g.add(legL);
        g.add(legR);
      });

      // Rotating Rollers along the conveyor
      const rollers: THREE.Mesh[] = [];
      for (let r = 0; r < 8; r++) {
        const rz = -1.6 + (r / 7) * 3.2;
        const rollerGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.95, 16);
        rollerGeo.rotateZ(Math.PI / 2);
        const roller = new THREE.Mesh(rollerGeo, steelMat);
        roller.position.set(-0.4, 0.78, rz);
        g.add(roller);
        rollers.push(roller);
      }
      animatedRefs.current.conveyorRollers = rollers;

      // Moving standardized industrial parts on conveyor
      const boxes: THREE.Mesh[] = [];
      for (let b = 0; b < 3; b++) {
        const boxGeo = new THREE.BoxGeometry(0.42, 0.35, 0.45);
        const box = new THREE.Mesh(boxGeo, partMat);
        box.position.set(-0.4, 1.0, -1.2 + b * 1.1);
        box.castShadow = true;
        g.add(box);
        boxes.push(box);
      }
      animatedRefs.current.conveyorBoxes = boxes;

      // 2. High-Voltage Electric Motor & Dynamo (Động cơ điện & Máy phát điện)
      const dynamoGroup = new THREE.Group();
      dynamoGroup.position.set(1.2, 0.65, 0);

      const dynamoBaseGeo = new THREE.BoxGeometry(0.9, 0.2, 1.2);
      const dynamoBase = new THREE.Mesh(dynamoBaseGeo, steelMat);
      dynamoGroup.add(dynamoBase);

      const motorHousingGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.9, 24);
      motorHousingGeo.rotateX(Math.PI / 2);
      const motorHousing = new THREE.Mesh(motorHousingGeo, steelMat);
      motorHousing.position.y = 0.4;
      dynamoGroup.add(motorHousing);

      // Visible copper electromagnetic coils
      const coilGeo = new THREE.TorusGeometry(0.35, 0.06, 16, 32);
      const coil1 = new THREE.Mesh(coilGeo, copperCoilMat);
      coil1.position.set(0, 0.4, -0.2);
      const coil2 = new THREE.Mesh(coilGeo, copperCoilMat);
      coil2.position.set(0, 0.4, 0.2);
      dynamoGroup.add(coil1);
      dynamoGroup.add(coil2);

      // Electrical Pylon with insulator bells
      const pylonGeo = new THREE.CylinderGeometry(0.04, 0.06, 1.2, 16);
      const pylon = new THREE.Mesh(pylonGeo, steelMat);
      pylon.position.set(0, 1.3, 0);
      dynamoGroup.add(pylon);

      // Ceramic insulator discs
      for (let i = 0; i < 3; i++) {
        const insGeo = new THREE.CylinderGeometry(0.12, 0.08, 0.05, 16);
        const ins = new THREE.Mesh(insGeo, steelMat);
        ins.position.set(0, 1.0 + i * 0.15, 0);
        dynamoGroup.add(ins);
      }

      // Glowing blue electric spark arc
      const sparkGroup = new THREE.Group();
      sparkGroup.position.set(0, 1.9, 0);
      const sparkGeo = new THREE.OctahedronGeometry(0.15, 0);
      const sparkMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const spark = new THREE.Mesh(sparkGeo, sparkMat);
      sparkGroup.add(spark);
      dynamoGroup.add(sparkGroup);
      animatedRefs.current.electricSparks = sparkGroup;

      g.add(dynamoGroup);
      root.add(g);
    }

    // -------------------------------------------------------------------------
    // ERA 3: RETRO DESKTOP PC & SILICON CHIP (CMCN 3.0)
    // -------------------------------------------------------------------------
    else if (activeEra === 3) {
      const g = new THREE.Group();

      const retroBeigeMat = new THREE.MeshStandardMaterial({
        color: 0xe2d9cc,
        roughness: 0.5,
        wireframe: showWireframe
      });
      const crtScreenMat = new THREE.MeshStandardMaterial({
        color: 0x022c22,
        roughness: 0.1,
        emissive: 0x064e3b,
        emissiveIntensity: 0.5,
        wireframe: showWireframe
      });
      const siliconMat = new THREE.MeshStandardMaterial({
        color: 0x065f46,
        roughness: 0.3,
        wireframe: showWireframe
      });

      // 1. Desk Surface
      const deskGeo = new THREE.BoxGeometry(3.6, 0.15, 2.4);
      const deskMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.7 });
      const desk = new THREE.Mesh(deskGeo, deskMat);
      desk.position.y = 0.08;
      g.add(desk);

      // 2. Desktop PC Tower Unit (Case máy tính cổ điển)
      const towerGeo = new THREE.BoxGeometry(0.7, 1.8, 1.5);
      const tower = new THREE.Mesh(towerGeo, retroBeigeMat);
      tower.position.set(1.2, 1.05, 0);
      tower.castShadow = true;
      g.add(tower);

      // 5.25" and 3.5" Floppy Disk Slots
      [-0.2, 0.1, 0.4].forEach((fy) => {
        const slotGeo = new THREE.BoxGeometry(0.5, 0.04, 0.02);
        const slotMat = new THREE.MeshBasicMaterial({ color: 0x1f2937 });
        const slot = new THREE.Mesh(slotGeo, slotMat);
        slot.position.set(1.2, 1.05 + fy, 0.76);
        g.add(slot);
      });

      // Power / HDD blinking LED
      const ledGeo = new THREE.SphereGeometry(0.025, 12, 12);
      const ledMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
      const led = new THREE.Mesh(ledGeo, ledMat);
      led.position.set(1.4, 0.65, 0.76);
      g.add(led);

      // 3. Curved CRT Monitor (Màn hình bóng hình CRT)
      const monitorGroup = new THREE.Group();
      monitorGroup.position.set(-0.3, 0.95, 0);

      const monitorCaseGeo = new THREE.BoxGeometry(1.6, 1.3, 1.2);
      const monitorCase = new THREE.Mesh(monitorCaseGeo, retroBeigeMat);
      monitorCase.castShadow = true;
      monitorGroup.add(monitorCase);

      // Screen Glass
      const screenGlassGeo = new THREE.PlaneGeometry(1.28, 0.98);
      const screenGlass = new THREE.Mesh(screenGlassGeo, crtScreenMat);
      screenGlass.position.set(0, 0.05, 0.61);
      monitorGroup.add(screenGlass);

      // Glowing Green Scanline / Binary Command Line
      const scanlineGeo = new THREE.PlaneGeometry(1.1, 0.04);
      const scanMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
      const scan = new THREE.Mesh(scanlineGeo, scanMat);
      scan.position.set(0, 0.05, 0.62);
      monitorGroup.add(scan);
      animatedRefs.current.screenTextScan = scan;

      // Monitor Swivel Stand
      const standGeo = new THREE.CylinderGeometry(0.3, 0.4, 0.18, 24);
      const stand = new THREE.Mesh(standGeo, retroBeigeMat);
      stand.position.set(0, -0.74, 0);
      monitorGroup.add(stand);

      g.add(monitorGroup);

      // 4. Mechanical Keyboard & Mouse
      const kbGeo = new THREE.BoxGeometry(1.3, 0.08, 0.5);
      const kb = new THREE.Mesh(kbGeo, retroBeigeMat);
      kb.position.set(-0.3, 0.2, 0.8);
      g.add(kb);

      const mouseGeo = new THREE.BoxGeometry(0.18, 0.08, 0.28);
      const mouse = new THREE.Mesh(mouseGeo, retroBeigeMat);
      mouse.position.set(0.65, 0.2, 0.8);
      g.add(mouse);

      // 5. Huge Silicon Microchip on display beside PC
      const chipGeo = new THREE.BoxGeometry(0.6, 0.08, 0.6);
      const chip = new THREE.Mesh(chipGeo, siliconMat);
      chip.position.set(-1.3, 0.2, -0.4);
      g.add(chip);

      // Gold pins on chip
      const pinMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9 });
      for (let p = 0; p < 8; p++) {
        const px = -0.25 + (p / 7) * 0.5;
        [-0.32, 0.32].forEach((pz) => {
          const pinGeo = new THREE.BoxGeometry(0.03, 0.04, 0.08);
          const pin = new THREE.Mesh(pinGeo, pinMat);
          pin.position.set(-1.3 + px, 0.18, -0.4 + pz);
          g.add(pin);
        });
      }

      root.add(g);
    }

    // -------------------------------------------------------------------------
    // ERA 4: AI INDUSTRIAL ROBOT ARM & IOT CLOUD CPS (CMCN 4.0)
    // -------------------------------------------------------------------------
    else if (activeEra === 4) {
      const g = new THREE.Group();

      const chassisMat = new THREE.MeshStandardMaterial({
        color: 0x7c3aed,
        metalness: 0.8,
        roughness: 0.25,
        wireframe: showWireframe
      });
      const darkJointMat = new THREE.MeshStandardMaterial({
        color: 0x18181b,
        metalness: 0.9,
        roughness: 0.2,
        wireframe: showWireframe
      });
      const accentMat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        emissive: 0x0891b2,
        emissiveIntensity: 0.7,
        wireframe: showWireframe
      });

      // 1. Heavy Robot Pedestal Base
      const baseGeo = new THREE.CylinderGeometry(0.6, 0.7, 0.25, 32);
      const base = new THREE.Mesh(baseGeo, darkJointMat);
      base.position.y = 0.125;
      base.castShadow = true;
      g.add(base);

      // Glowing edge status ring
      const ringGeo = new THREE.TorusGeometry(0.62, 0.03, 16, 48);
      ringGeo.rotateX(Math.PI / 2);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
      const statusRing = new THREE.Mesh(ringGeo, ringMat);
      statusRing.position.y = 0.25;
      g.add(statusRing);

      // 2. Joint 1: Turntable
      const joint1Group = new THREE.Group();
      joint1Group.position.set(0, 0.25, 0);

      const turntableGeo = new THREE.CylinderGeometry(0.42, 0.45, 0.35, 32);
      const turntable = new THREE.Mesh(turntableGeo, chassisMat);
      turntable.position.y = 0.175;
      turntable.castShadow = true;
      joint1Group.add(turntable);

      // 3. Lower Arm
      const lowerArmGeo = new THREE.BoxGeometry(0.3, 1.2, 0.3);
      const lowerArm = new THREE.Mesh(lowerArmGeo, chassisMat);
      lowerArm.position.set(0, 0.85, 0);
      lowerArm.castShadow = true;
      joint1Group.add(lowerArm);

      // Elbow joint actuator
      const elbowGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.45, 24);
      elbowGeo.rotateZ(Math.PI / 2);
      const elbow = new THREE.Mesh(elbowGeo, darkJointMat);
      elbow.position.set(0, 1.45, 0);
      joint1Group.add(elbow);

      // 4. Joint 2: Forearm
      const joint2Group = new THREE.Group();
      joint2Group.position.set(0, 1.45, 0);

      const forearmGeo = new THREE.BoxGeometry(0.24, 1.1, 0.24);
      forearmGeo.translate(0, 0.55, 0);
      const forearm = new THREE.Mesh(forearmGeo, chassisMat);
      forearm.castShadow = true;
      joint2Group.add(forearm);

      // Wrist joint
      const wristGeo = new THREE.SphereGeometry(0.18, 24, 24);
      const wrist = new THREE.Mesh(wristGeo, darkJointMat);
      wrist.position.set(0, 1.15, 0);
      joint2Group.add(wrist);

      // 5. Two-Finger Servo Gripper End-Effector
      const gripperGroup = new THREE.Group();
      gripperGroup.position.set(0, 1.3, 0);

      const fingerGeo = new THREE.BoxGeometry(0.06, 0.3, 0.08);
      const fingerL = new THREE.Mesh(fingerGeo, darkJointMat);
      fingerL.position.set(-0.06, 0.15, 0);
      const fingerR = new THREE.Mesh(fingerGeo, darkJointMat);
      fingerR.position.set(0.06, 0.15, 0);
      gripperGroup.add(fingerL);
      gripperGroup.add(fingerR);

      // Smart Smart-Item being inspected (Glowing AI Data Cube)
      const dataCubeGeo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      const dataCube = new THREE.Mesh(dataCubeGeo, accentMat);
      dataCube.position.set(0, 0.15, 0);
      gripperGroup.add(dataCube);

      // AI Laser Scanner Cone from gripper down to cube
      const laserGeo = new THREE.ConeGeometry(0.18, 0.4, 16, 1, true);
      laserGeo.rotateX(Math.PI);
      const laserMat = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide
      });
      const laser = new THREE.Mesh(laserGeo, laserMat);
      laser.position.set(0, -0.05, 0);
      gripperGroup.add(laser);
      animatedRefs.current.laserBeam = laser;

      joint2Group.add(gripperGroup);
      animatedRefs.current.robotGripper = gripperGroup;

      joint1Group.add(joint2Group);
      animatedRefs.current.robotJoint2 = joint2Group;

      g.add(joint1Group);
      animatedRefs.current.robotJoint1 = joint1Group;

      // 6. Holographic IoT Cyber-Physical System Cloud Globe & Nodes
      const iotCloud = new THREE.Group();
      iotCloud.position.set(0, 1.6, 0);

      for (let ring = 0; ring < 2; ring++) {
        const cloudRingGeo = new THREE.RingGeometry(1.6 + ring * 0.4, 1.63 + ring * 0.4, 48);
        cloudRingGeo.rotateX(ring === 0 ? Math.PI / 4 : -Math.PI / 4);
        const cloudRingMat = new THREE.MeshBasicMaterial({
          color: 0xa855f7,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.4
        });
        const cRing = new THREE.Mesh(cloudRingGeo, cloudRingMat);
        iotCloud.add(cRing);
      }

      // Orbiting IoT Node Spheres (Sensors, Edge, Cloud)
      for (let n = 0; n < 6; n++) {
        const nAngle = (n / 6) * Math.PI * 2;
        const nodeGeo = new THREE.SphereGeometry(0.08, 16, 16);
        const nodeMat = new THREE.MeshStandardMaterial({
          color: n % 2 === 0 ? 0x06b6d4 : 0xec4899,
          emissive: n % 2 === 0 ? 0x06b6d4 : 0xec4899,
          emissiveIntensity: 0.8
        });
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        node.position.set(Math.cos(nAngle) * 1.8, Math.sin(nAngle * 2) * 0.4, Math.sin(nAngle) * 1.8);
        iotCloud.add(node);
      }

      g.add(iotCloud);
      animatedRefs.current.iotCloudRing = iotCloud;

      root.add(g);
    }
  }, [activeEra, showWireframe]);

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      controlsRef.current.target.set(0, 0.6, 0);
    }
  };

  const currentEraData = ERA_DETAILS[activeEra];

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden my-6">
      {/* Top Header with Era Selector */}
      <div className="px-5 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-slate-50/80 via-white to-slate-50/80">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-sm font-black text-sm"
            style={{ backgroundColor: currentEraData.color }}
          >
            {activeEra}.0
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: currentEraData.color }}
              >
                {bilingualMode === 'en' ? 'Interactive 3D Simulation' : 'Mô hình 3D Lịch sử 4 Cuộc CMCN'}
              </span>
              <span className="text-xs text-slate-400 font-medium">SGK Trang 12 – 13</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
              {bilingualMode === 'en'
                ? 'The 4 Industrial Revolutions in Human History'
                : 'Tiến trình 4 Cuộc Cách mạng Công nghiệp'}
            </h3>
          </div>
        </div>

        {/* 4 Revolution Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80 overflow-x-auto max-w-full">
          {([1, 2, 3, 4] as RevolutionEra[]).map((eraNum) => {
            const isSelected = activeEra === eraNum;
            const eraItem = ERA_DETAILS[eraNum];
            return (
              <button
                key={eraNum}
                type="button"
                onClick={() => handleEraChange(eraNum)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: eraItem.color }}
                />
                <span>{eraNum}.0 {bilingualMode === 'en' ? eraItem.milestoneEn.split(' ')[0] : eraItem.milestoneVi.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 3D Canvas */}
      <div className="relative w-full h-[400px] sm:h-[480px] bg-gradient-to-b from-[#fcfdff] via-white to-slate-50 cursor-grab active:cursor-grabbing select-none overflow-hidden">
        {/* Canvas Mount Container */}
        <div ref={mountRef} className="w-full h-full" />

        {/* Floating Top-Left Model Name Badge */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-2.5 text-xs">
          <div
            className="w-2.5 h-2.5 rounded-full animate-ping"
            style={{ backgroundColor: currentEraData.color }}
          />
          <div>
            <div className="font-bold text-slate-900">
              {bilingualMode === 'en' ? currentEraData.modelNameEn : currentEraData.modelNameVi}
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              {bilingualMode === 'en' ? currentEraData.timeEn : currentEraData.timeVi}
            </div>
          </div>
        </div>

        {/* Floating Top-Right Tool Buttons */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          {/* Play/Pause Motion */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 shadow-xs border cursor-pointer ${
              isPlaying
                ? 'bg-slate-900 text-white border-slate-800'
                : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white'
            }`}
            title="Tạm dừng / Tiếp tục chuyển động cơ khí"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">
              {isPlaying ? (bilingualMode === 'en' ? 'Running' : 'Đang chạy') : (bilingualMode === 'en' ? 'Paused' : 'Tạm dừng')}
            </span>
          </button>

          {/* Toggle Auto Rotation */}
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all shadow-xs border cursor-pointer ${
              autoRotate
                ? 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white'
            }`}
            title="Tự động xoay 360°"
          >
            <RotateCcw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} />
          </button>

          {/* Toggle Wireframe / X-ray Mode */}
          <button
            type="button"
            onClick={() => setShowWireframe(!showWireframe)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 shadow-xs border cursor-pointer ${
              showWireframe
                ? 'bg-amber-600 text-white border-amber-500'
                : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white'
            }`}
            title="Chế độ khung dây cấu tạo"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {showWireframe ? (bilingualMode === 'en' ? 'Solid' : 'Đặc') : (bilingualMode === 'en' ? 'Wireframe' : 'Khung dây')}
            </span>
          </button>

          {/* Reset Camera View */}
          <button
            type="button"
            onClick={handleResetCamera}
            className="p-1.5 rounded-xl bg-white/90 text-slate-700 border border-slate-200 hover:bg-white backdrop-blur-md shadow-xs transition-all cursor-pointer"
            title="Đặt lại góc nhìn chuẩn"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Timeline Indicator Bar */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-2.5 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-md overflow-x-auto text-xs">
          <div className="flex items-center gap-2">
            {([1, 2, 3, 4] as RevolutionEra[]).map((e) => (
              <React.Fragment key={e}>
                <button
                  type="button"
                  onClick={() => handleEraChange(e)}
                  className={`px-2.5 py-1 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeEra === e
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: ERA_DETAILS[e].color }}
                  />
                  <span>{e}.0</span>
                </button>
                {e < 4 && <ArrowRight className="w-3.5 h-3.5 text-slate-300" />}
              </React.Fragment>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-slate-500 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>
              {bilingualMode === 'en'
                ? 'Drag to rotate • Scroll to zoom in/out'
                : 'Kéo chuột để xoay 360° • Cuộn chuột để zoom'}
            </span>
          </div>
        </div>
      </div>

      {/* Detail Explanatory Card Below Canvas */}
      <div className="p-5 bg-white border-t border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: currentEraData.color }}
              />
              <h4 className="text-base sm:text-lg font-bold text-slate-900">
                {bilingualMode === 'en' ? currentEraData.titleEn : currentEraData.titleVi}:{' '}
                <span className="font-semibold text-slate-700">
                  {bilingualMode === 'en' ? currentEraData.milestoneEn : currentEraData.milestoneVi}
                </span>
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {bilingualMode === 'en' ? currentEraData.descEn : currentEraData.descVi}
            </p>

            <div className="pt-1 flex items-start gap-2 text-xs text-slate-700 bg-slate-50/80 p-3 rounded-xl border border-slate-200/60">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900">
                  {bilingualMode === 'en' ? 'Key Social Impact: ' : 'Tác động xã hội: '}
                </span>
                <span>{bilingualMode === 'en' ? currentEraData.impactEn : currentEraData.impactVi}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/70 flex flex-col justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1">
                {bilingualMode === 'en' ? 'Textbook Takeaway (SGK p. 12-13)' : 'Điểm cốt lõi SGK Tin 10'}
              </div>
              <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                {activeEra === 4
                  ? (bilingualMode === 'en'
                    ? 'Smart devices and IoT systems form the essential core of Industry 4.0, combining cyber computing with physical machinery.'
                    : 'Thiết bị thông minh và hệ thống IoT đóng vai trò nòng cốt trong CMCN 4.0, kết hợp không gian số và máy móc vật lý.')
                  : (bilingualMode === 'en'
                    ? `Revolution ${activeEra}.0 established critical foundations enabling later computational revolutions.`
                    : `CMCN ${activeEra}.0 đã đặt nền móng then chốt dẫn tới sự ra đời của kỷ nguyên máy tính và tự động hóa.`)}
              </p>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>{bilingualMode === 'en' ? 'Timeline' : 'Thời gian'}</span>
              <span className="font-bold text-slate-700">
                {bilingualMode === 'en' ? currentEraData.timeEn : currentEraData.timeVi}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
