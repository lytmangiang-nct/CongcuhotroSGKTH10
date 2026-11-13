import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useBook } from '../../context/BookContext';
import {
  RotateCcw,
  Sparkles,
  Layers,
  Eye,
  Maximize2,
  Radio,
  Car,
  Camera,
  Smartphone,
  Info,
  ShieldCheck,
  Cpu,
  Wifi,
  ScanLine
} from 'lucide-react';

type ModelType = 'camera' | 'car' | 'phone';

interface PartInfo {
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  roleVi: string;
  roleEn: string;
  icon: string;
}

const MODEL_INFO: Record<ModelType, Record<string, PartInfo>> = {
  camera: {
    sensor: {
      titleVi: 'Cảm biến hình ảnh & Hồng ngoại 4K',
      titleEn: '4K Optical & Infrared Image Sensor',
      descVi: 'Ghi lại luồng video chất lượng cao cả ngày lẫn đêm, cung cấp dữ liệu số đầu vào liên tục.',
      descEn: 'Captures high-resolution video streams day and night, supplying continuous digital input data.',
      roleVi: 'Cảm biến (Sensor) - Thu thập dữ liệu',
      roleEn: 'Sensor - Data Acquisition',
      icon: 'Camera'
    },
    processor: {
      titleVi: 'Vi xử lý AI & NPU nhúng (Edge AI)',
      titleEn: 'Embedded AI & NPU Processor (Edge AI)',
      descVi: 'Chạy mô hình học sâu (Deep Learning) trực tiếp tại thiết bị để nhận diện biển số, đo tốc độ xe và phát hiện vượt đèn đỏ.',
      descEn: 'Executes deep learning models on-device to recognize license plates, compute vehicle speed, and detect red-light violations.',
      roleVi: 'Bộ vi xử lý - Tự động ra quyết định',
      roleEn: 'Processor - Autonomous Decision Making',
      icon: 'Cpu'
    },
    network: {
      titleVi: 'Mô-đun truyền thông 4G/5G/IoT',
      titleEn: '4G/5G & IoT Wireless Module',
      descVi: 'Gửi kết quả vi phạm và siêu dữ liệu (metadata) về trung tâm điều hành giao thông thành phố tức thời.',
      descEn: 'Sends violation alerts and metadata in real-time to the central traffic management center.',
      roleVi: 'Kết nối mạng - Giao tiếp IoT',
      roleEn: 'Network - IoT Communication',
      icon: 'Wifi'
    }
  },
  car: {
    lidar: {
      titleVi: 'Cảm biến LiDAR & Radar 360°',
      titleEn: '360° LiDAR & Radar Sensor Puck',
      descVi: 'Phát hàng triệu xung laser mỗi giây để dựng bản đồ không gian 3D dạng đám mây điểm (point cloud) xung quanh xe.',
      descEn: 'Fires millions of laser pulses per second to generate real-time 3D point cloud maps of the surroundings.',
      roleVi: 'Cảm biến siêu âm & laser',
      roleEn: 'LiDAR & Ultrasonic Perception',
      icon: 'ScanLine'
    },
    computer: {
      titleVi: 'Máy tính tự hành kép (FSD Computer)',
      titleEn: 'Dual Autonomous Driving Supercomputer',
      descVi: 'Xử lý hàng terabyte dữ liệu cảm biến mỗi giây, dự đoán quỹ đạo người đi bộ và tính toán góc lái an toàn.',
      descEn: 'Processes terabytes of sensor data per second, predicting pedestrian trajectories and planning safe navigation paths.',
      roleVi: 'Bộ não AI xử lý tập trung',
      roleEn: 'AI Brain & Path Planning',
      icon: 'Cpu'
    },
    actuators: {
      titleVi: 'Hệ thống truyền động điện tử thông minh',
      titleEn: 'Smart Electric Drive & Actuators',
      descVi: 'Mô-tơ điện, hệ thống phanh tự động (AEB) và trợ lực lái điện tử nhận lệnh trực tiếp từ máy tính để điều khiển xe.',
      descEn: 'Electric powertrain, autonomous emergency braking (AEB), and steer-by-wire execute AI motion commands instantly.',
      roleVi: 'Cơ cấu chấp hành tự động',
      roleEn: 'Autonomous Actuators & Drive',
      icon: 'Car'
    }
  },
  phone: {
    soc: {
      titleVi: 'Chip bán dẫn SoC (CPU + GPU + NPU)',
      titleEn: 'SoC Semiconductor (CPU + GPU + NPU)',
      descVi: 'Tập hợp hàng chục tỷ bóng bán dẫn trên tiến trình nanomet, xử lý thuật toán nhiếp ảnh điện toán và trợ lý thông minh.',
      descEn: 'Houses tens of billions of nanometer transistors, handling computational photography and local neural inference.',
      roleVi: 'Bộ xử lý trung tâm đa nhân',
      roleEn: 'Central Multi-core Processor',
      icon: 'Cpu'
    },
    sensors: {
      titleVi: 'Cụm cảm biến đa tầng (Gia tốc, Con quay, LiDAR)',
      titleEn: 'Multi-Sensor Array (Accelerometer, Gyro, LiDAR)',
      descVi: 'Theo dõi chuyển động, vị trí GPS, nhận diện khuôn mặt 3D và điều chỉnh màn hình theo ngữ cảnh người dùng.',
      descEn: 'Tracks movement, GPS positioning, 3D facial recognition, and contextually adapts the display to user habits.',
      roleVi: 'Thu nhận tương tác môi trường',
      roleEn: 'Environmental & Motion Sensing',
      icon: 'Eye'
    },
    modem: {
      titleVi: 'Mô-đun 5G & Wi-Fi 6E/7 Đa băng tần',
      titleEn: 'Multi-Band 5G & Wi-Fi 6E/7 Modem',
      descVi: 'Đóng vai trò trung tâm điều khiển (Hub) kết nối các thiết bị Smart Home (đèn, máy lạnh, loa thông minh).',
      descEn: 'Acts as a smart home IoT hub, communicating seamlessly with lights, air conditioners, and voice assistants.',
      roleVi: 'Kết nối vạn vật (IoT Hub)',
      roleEn: 'Internet of Things Hub',
      icon: 'Wifi'
    }
  }
};

export const SmartDevice3DViewer: React.FC = () => {
  const { bilingualMode } = useBook();
  const mountRef = useRef<HTMLDivElement>(null);

  // Model & Interaction state
  const [activeModel, setActiveModel] = useState<ModelType>('camera');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [showScanningBeam, setShowScanningBeam] = useState<boolean>(true);
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [activePartKey, setActivePartKey] = useState<string>('sensor');

  // Animation frame and Three references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const dynamicObjectsRef = useRef<{
    scannerCone?: THREE.Mesh;
    radarRings?: THREE.Group;
    lidarPuck?: THREE.Group;
    phoneWaves?: THREE.Group;
    wheels?: THREE.Mesh[];
    carChassis?: THREE.Group;
    cameraBody?: THREE.Group;
    phoneBody?: THREE.Group;
    partsMap?: Record<string, THREE.Object3D>;
  }>({});

  // Sync active part key when model changes
  useEffect(() => {
    if (activeModel === 'camera') setActivePartKey('sensor');
    else if (activeModel === 'car') setActivePartKey('lidar');
    else setActivePartKey('soc');
  }, [activeModel]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      return;
    }

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 450;

    // 1. Scene setup with clean studio white-to-slate lighting
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfbfcfe);
    sceneRef.current = scene;

    // Subtle atmospheric fog
    scene.fog = new THREE.FogExp2(0xfbfcfe, 0.028);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(4.5, 3.2, 5.5);

    // 3. Renderer setup
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

    // Replace child canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2.5;
    controls.maxDistance = 14;
    controls.maxPolarAngle = Math.PI / 2 + 0.05; // don't go too far underground
    controls.target.set(0, 0.6, 0);
    controlsRef.current = controls;

    // 5. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(6, 9, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdbeafe, 0.8);
    fillLight.position.set(-6, 5, -4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x6366f1, 0.7);
    rimLight.position.set(0, 4, -7);
    scene.add(rimLight);

    // Circular shadow catcher grid
    const gridHelper = new THREE.GridHelper(16, 32, 0xc7d2fe, 0xe2e8f0);
    gridHelper.position.y = -0.01;
    scene.add(gridHelper);

    const groundGeo = new THREE.CircleGeometry(10, 64);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.95,
      metalness: 0.05
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Root model holder
    const modelRoot = new THREE.Group();
    scene.add(modelRoot);
    modelGroupRef.current = modelRoot;

    // Resize handler with ResizeObserver
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

    // Clock for animation
    const clock = new THREE.Clock();

    // Animation Loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Model auto-rotation when user is not manually dragging
      if (autoRotate && modelRoot) {
        modelRoot.rotation.y += 0.005;
      }

      // Dynamic animations based on active objects
      const dyn = dynamicObjectsRef.current;

      // 1. Scanning cone pulse for camera
      if (dyn.scannerCone) {
        dyn.scannerCone.visible = showScanningBeam;
        const scalePulse = 1 + Math.sin(elapsedTime * 4) * 0.08;
        dyn.scannerCone.scale.set(scalePulse, 1, scalePulse);
      }

      // 2. LiDAR revolving puck and radar rings for car
      if (dyn.lidarPuck) {
        dyn.lidarPuck.rotation.y = elapsedTime * 8;
      }
      if (dyn.radarRings) {
        dyn.radarRings.visible = showScanningBeam;
        dyn.radarRings.children.forEach((ring, idx) => {
          const s = ((elapsedTime * 1.5 + idx * 0.6) % 3) + 0.2;
          ring.scale.set(s, s, s);
          const mat = (ring as THREE.Mesh).material as THREE.MeshBasicMaterial;
          if (mat) {
            mat.opacity = Math.max(0, 0.8 - s * 0.25);
          }
        });
      }

      // 3. Spinning wheels when autoRotate is on
      if (dyn.wheels && autoRotate) {
        dyn.wheels.forEach((wheel) => {
          wheel.rotation.x += 0.03;
        });
      }

      // 4. Phone wireless wave emissions
      if (dyn.phoneWaves) {
        dyn.phoneWaves.visible = showScanningBeam;
        dyn.phoneWaves.children.forEach((wave, idx) => {
          const s = ((elapsedTime * 1.8 + idx * 0.5) % 2.5) + 0.3;
          wave.scale.set(s, s, s);
          const mat = (wave as THREE.Mesh).material as THREE.MeshBasicMaterial;
          if (mat) {
            mat.opacity = Math.max(0, 0.7 - s * 0.28);
          }
        });
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

  // Effect to rebuild procedural 3D model whenever activeModel or exploded state changes
  useEffect(() => {
    const modelRoot = modelGroupRef.current;
    if (!modelRoot) return;

    // Clear existing model children
    while (modelRoot.children.length > 0) {
      const obj = modelRoot.children[0];
      modelRoot.remove(obj);
      if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
    }
    dynamicObjectsRef.current = {};

    const partsMap: Record<string, THREE.Object3D> = {};

    // ----------------------------------------------------
    // BUILD 1: SMART AI TRAFFIC CAMERA
    // ----------------------------------------------------
    if (activeModel === 'camera') {
      const cameraGroup = new THREE.Group();
      cameraGroup.position.set(0, 0, 0);

      // Materials
      const poleMat = new THREE.MeshStandardMaterial({
        color: 0x475569,
        metalness: 0.8,
        roughness: 0.25
      });
      const housingMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.3,
        roughness: 0.15
      });
      const darkHousingMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.6,
        roughness: 0.3
      });
      const lensGlassMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        metalness: 0.95,
        roughness: 0.05
      });
      const heatsinkMat = new THREE.MeshStandardMaterial({
        color: 0x6366f1,
        metalness: 0.7,
        roughness: 0.3
      });

      // 1. Support Post & Base
      const baseGeo = new THREE.CylinderGeometry(0.5, 0.6, 0.15, 32);
      const base = new THREE.Mesh(baseGeo, poleMat);
      base.position.y = 0.075;
      base.castShadow = true;
      cameraGroup.add(base);

      const poleGeo = new THREE.CylinderGeometry(0.09, 0.1, 2.2, 32);
      const pole = new THREE.Mesh(poleGeo, poleMat);
      pole.position.y = 1.15;
      pole.castShadow = true;
      cameraGroup.add(pole);

      // Arm bracket
      const bracketArmGeo = new THREE.BoxGeometry(0.12, 0.12, 0.8);
      const bracketArm = new THREE.Mesh(bracketArmGeo, poleMat);
      bracketArm.position.set(0, 2.15, 0.35);
      cameraGroup.add(bracketArm);

      // 2. Camera Enclosure Housing (Sensor & Edge AI Unit)
      const headGroup = new THREE.Group();
      headGroup.position.set(0, 2.05, 0.75);
      headGroup.rotation.x = 0.25; // tilt downwards looking at road

      const bodyGeo = new THREE.BoxGeometry(0.55, 0.45, 1.1);
      const body = new THREE.Mesh(bodyGeo, housingMat);
      body.castShadow = true;
      headGroup.add(body);

      // Sunshield visor on top
      const visorGeo = new THREE.BoxGeometry(0.62, 0.04, 1.25);
      const visor = new THREE.Mesh(visorGeo, darkHousingMat);
      visor.position.set(0, 0.25, 0.05);
      headGroup.add(visor);

      // Front Faceplate
      const faceGeo = new THREE.BoxGeometry(0.5, 0.4, 0.05);
      const face = new THREE.Mesh(faceGeo, darkHousingMat);
      face.position.set(0, 0, 0.56);
      headGroup.add(face);

      // Main Optical Lens (Sensor hotspot)
      const lensGroup = new THREE.Group();
      lensGroup.position.set(0, 0, 0.58);
      const lensRimGeo = new THREE.CylinderGeometry(0.14, 0.15, 0.12, 32);
      lensRimGeo.rotateX(Math.PI / 2);
      const lensRim = new THREE.Mesh(lensRimGeo, darkHousingMat);
      lensGroup.add(lensRim);

      const lensGlassGeo = new THREE.SphereGeometry(0.12, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
      lensGlassGeo.rotateX(-Math.PI / 2);
      const lensGlass = new THREE.Mesh(lensGlassGeo, lensGlassMat);
      lensGlass.position.z = 0.05;
      lensGroup.add(lensGlass);
      headGroup.add(lensGroup);
      partsMap['sensor'] = lensGroup;

      // Infrared & LiDAR array dots around lens
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const irDotGeo = new THREE.SphereGeometry(0.022, 12, 12);
        const irMat = new THREE.MeshStandardMaterial({
          color: 0xef4444,
          emissive: 0xef4444,
          emissiveIntensity: 0.8
        });
        const irDot = new THREE.Mesh(irDotGeo, irMat);
        irDot.position.set(Math.cos(angle) * 0.18, Math.sin(angle) * 0.18, 0.58);
        headGroup.add(irDot);
      }

      // AI Processor Heatsink (Processor hotspot)
      const processorGroup = new THREE.Group();
      processorGroup.position.set(0, isExploded ? 0.65 : 0, -0.3);

      const heatsinkGeo = new THREE.BoxGeometry(0.48, 0.38, 0.25);
      const heatsink = new THREE.Mesh(heatsinkGeo, heatsinkMat);
      heatsink.castShadow = true;
      processorGroup.add(heatsink);

      // Glowing NPU AI core logo
      const chipBadgeGeo = new THREE.BoxGeometry(0.2, 0.2, 0.02);
      const chipBadgeMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x10b981,
        emissiveIntensity: 0.9
      });
      const chipBadge = new THREE.Mesh(chipBadgeGeo, chipBadgeMat);
      chipBadge.position.set(0, 0, -0.13);
      processorGroup.add(chipBadge);

      headGroup.add(processorGroup);
      partsMap['processor'] = processorGroup;

      // Network 5G Antenna & status (Network hotspot)
      const networkGroup = new THREE.Group();
      networkGroup.position.set(0.24, isExploded ? 0.45 : 0.22, -0.3);

      const antBaseGeo = new THREE.CylinderGeometry(0.025, 0.03, 0.06, 16);
      const antBase = new THREE.Mesh(antBaseGeo, darkHousingMat);
      networkGroup.add(antBase);

      const antStickGeo = new THREE.CylinderGeometry(0.012, 0.015, 0.45, 16);
      antStickGeo.translate(0, 0.22, 0);
      const antStick = new THREE.Mesh(antStickGeo, darkHousingMat);
      networkGroup.add(antStick);

      // Pulsing green connected LED
      const ledGeo = new THREE.SphereGeometry(0.02, 12, 12);
      const ledMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x10b981,
        emissiveIntensity: 1
      });
      const led = new THREE.Mesh(ledGeo, ledMat);
      led.position.set(-0.48, 0, 0);
      networkGroup.add(led);

      headGroup.add(networkGroup);
      partsMap['network'] = networkGroup;

      // Dynamic AI Scanning Cone (Frustum beam)
      const coneGeo = new THREE.ConeGeometry(1.8, 4.2, 32, 1, true);
      coneGeo.rotateX(Math.PI / 2);
      coneGeo.translate(0, 0, 2.1);
      const coneMat = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.24,
        side: THREE.DoubleSide
      });
      const scannerCone = new THREE.Mesh(coneGeo, coneMat);
      scannerCone.position.set(0, 0, 0.6);
      headGroup.add(scannerCone);
      dynamicObjectsRef.current.scannerCone = scannerCone;

      // Simulated license plate target on the road
      const targetGeo = new THREE.PlaneGeometry(1.2, 0.6);
      targetGeo.rotateX(-Math.PI / 2);
      const targetMat = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        wireframe: true
      });
      const scanTarget = new THREE.Mesh(targetGeo, targetMat);
      scanTarget.position.set(0, -2.0, 3.2);
      headGroup.add(scanTarget);

      cameraGroup.add(headGroup);
      modelRoot.add(cameraGroup);
    }

    // ----------------------------------------------------
    // BUILD 2: AUTONOMOUS ELECTRIC VEHICLE (SMART CAR)
    // ----------------------------------------------------
    else if (activeModel === 'car') {
      const carGroup = new THREE.Group();
      carGroup.position.set(0, 0.2, 0);

      // Materials
      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0x2563eb,
        metalness: 0.7,
        roughness: 0.2
      });
      const glassMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        metalness: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.85
      });
      const rubberMat = new THREE.MeshStandardMaterial({
        color: 0x18181b,
        roughness: 0.8
      });
      const alloyMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        metalness: 0.9,
        roughness: 0.2
      });
      const sensorMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x10b981,
        emissiveIntensity: 0.6
      });

      // 1. Lower Chassis
      const chassisGeo = new THREE.BoxGeometry(1.6, 0.45, 3.4);
      const chassis = new THREE.Mesh(chassisGeo, bodyMat);
      chassis.position.y = 0.35;
      chassis.castShadow = true;
      carGroup.add(chassis);

      // 2. Cabin & Windshield (Exploded view moves roof up)
      const cabinGroup = new THREE.Group();
      cabinGroup.position.set(0, isExploded ? 1.1 : 0.68, -0.15);

      const cabinGeo = new THREE.BoxGeometry(1.35, 0.48, 1.8);
      const cabin = new THREE.Mesh(cabinGeo, glassMat);
      cabin.castShadow = true;
      cabinGroup.add(cabin);

      // Aerodynamic roof top
      const roofGeo = new THREE.BoxGeometry(1.25, 0.08, 1.6);
      const roof = new THREE.Mesh(roofGeo, bodyMat);
      roof.position.y = 0.26;
      cabinGroup.add(roof);

      // FSD Supercomputer located inside chassis (Computer hotspot)
      const computerGroup = new THREE.Group();
      computerGroup.position.set(0, -0.1, 0.2);
      const compBoxGeo = new THREE.BoxGeometry(0.7, 0.12, 0.45);
      const compMat = new THREE.MeshStandardMaterial({
        color: 0x0ea5e9,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x0369a1,
        emissiveIntensity: 0.4
      });
      const compBox = new THREE.Mesh(compBoxGeo, compMat);
      computerGroup.add(compBox);
      cabinGroup.add(computerGroup);
      partsMap['computer'] = computerGroup;

      carGroup.add(cabinGroup);

      // 3. Roof LiDAR Sensor (LiDAR hotspot)
      const lidarGroup = new THREE.Group();
      lidarGroup.position.set(0, isExploded ? 1.6 : 1.05, -0.1);

      const lidarBaseGeo = new THREE.CylinderGeometry(0.18, 0.2, 0.1, 32);
      const lidarBase = new THREE.Mesh(lidarBaseGeo, alloyMat);
      lidarGroup.add(lidarBase);

      const lidarPuckGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.14, 32);
      const lidarPuck = new THREE.Mesh(lidarPuckGeo, sensorMat);
      lidarPuck.position.y = 0.1;
      lidarGroup.add(lidarPuck);
      dynamicObjectsRef.current.lidarPuck = lidarGroup;

      carGroup.add(lidarGroup);
      partsMap['lidar'] = lidarGroup;

      // Radar Range Rings around car
      const radarRings = new THREE.Group();
      radarRings.position.set(0, 0.3, 0);
      for (let i = 0; i < 3; i++) {
        const ringGeo = new THREE.RingGeometry(1.8, 1.86, 48);
        ringGeo.rotateX(-Math.PI / 2);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x10b981,
          transparent: true,
          opacity: 0.6,
          side: THREE.DoubleSide
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        radarRings.add(ring);
      }
      carGroup.add(radarRings);
      dynamicObjectsRef.current.radarRings = radarRings;

      // 4. Wheels & Smart Actuators (Actuators hotspot)
      const wheelPositions = [
        [-0.85, 0.25, 1.05],
        [0.85, 0.25, 1.05],
        [-0.85, 0.25, -1.05],
        [0.85, 0.25, -1.05]
      ];
      const wheels: THREE.Mesh[] = [];
      const actuatorsGroup = new THREE.Group();

      wheelPositions.forEach(([x, y, z]) => {
        const wheelHub = new THREE.Group();
        wheelHub.position.set(isExploded ? (x > 0 ? x + 0.35 : x - 0.35) : x, y, z);

        const tireGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.22, 24);
        tireGeo.rotateZ(Math.PI / 2);
        const tire = new THREE.Mesh(tireGeo, rubberMat);
        tire.castShadow = true;
        wheelHub.add(tire);

        const rimGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.24, 16);
        rimGeo.rotateZ(Math.PI / 2);
        const rim = new THREE.Mesh(rimGeo, alloyMat);
        wheelHub.add(rim);

        actuatorsGroup.add(wheelHub);
        wheels.push(tire);
      });

      dynamicObjectsRef.current.wheels = wheels;
      carGroup.add(actuatorsGroup);
      partsMap['actuators'] = actuatorsGroup;

      // LED Headlights
      const headlightMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 1.5
      });
      [-0.55, 0.55].forEach((hx) => {
        const hlGeo = new THREE.BoxGeometry(0.25, 0.08, 0.05);
        const hl = new THREE.Mesh(hlGeo, headlightMat);
        hl.position.set(hx, 0.42, 1.71);
        carGroup.add(hl);
      });

      modelRoot.add(carGroup);
    }

    // ----------------------------------------------------
    // BUILD 3: SMARTPHONE & IOT GATEWAY
    // ----------------------------------------------------
    else if (activeModel === 'phone') {
      const phoneGroup = new THREE.Group();
      phoneGroup.position.set(0, 0.8, 0);

      const frameMat = new THREE.MeshStandardMaterial({
        color: 0x334155,
        metalness: 0.9,
        roughness: 0.15
      });
      const glassFrontMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        metalness: 0.8,
        roughness: 0.1,
        emissive: 0x0369a1,
        emissiveIntensity: 0.35
      });
      const backGlassMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        metalness: 0.3,
        roughness: 0.1
      });
      const socMat = new THREE.MeshStandardMaterial({
        color: 0x6366f1,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x4f46e5,
        emissiveIntensity: 0.6
      });

      // 1. Chassis Body Frame
      const frameGeo = new THREE.BoxGeometry(1.4, 2.8, 0.12);
      const frame = new THREE.Mesh(frameGeo, frameMat);
      frame.castShadow = true;
      phoneGroup.add(frame);

      // Back cover (moves backward in exploded view)
      const backCoverGeo = new THREE.BoxGeometry(1.38, 2.78, 0.02);
      const backCover = new THREE.Mesh(backCoverGeo, backGlassMat);
      backCover.position.set(0, 0, isExploded ? -0.4 : -0.065);
      phoneGroup.add(backCover);

      // Front OLED Screen (moves forward in exploded view)
      const screenGeo = new THREE.BoxGeometry(1.34, 2.72, 0.02);
      const screen = new THREE.Mesh(screenGeo, glassFrontMat);
      screen.position.set(0, 0, isExploded ? 0.45 : 0.065);
      phoneGroup.add(screen);

      // UI HUD elements on the screen
      const hudGeo = new THREE.PlaneGeometry(1.1, 2.2);
      const hudMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.4
      });
      const hud = new THREE.Mesh(hudGeo, hudMat);
      hud.position.set(0, 0, isExploded ? 0.47 : 0.078);
      phoneGroup.add(hud);

      // 2. SoC Silicon Chip inside (SoC hotspot)
      const socGroup = new THREE.Group();
      socGroup.position.set(0, 0.3, isExploded ? 0.15 : 0);

      const socChipGeo = new THREE.BoxGeometry(0.5, 0.5, 0.04);
      const socChip = new THREE.Mesh(socChipGeo, socMat);
      socGroup.add(socChip);

      // Gold bonding pins
      const pinMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 1 });
      const pinRingGeo = new THREE.BoxGeometry(0.56, 0.56, 0.02);
      const pinRing = new THREE.Mesh(pinRingGeo, pinMat);
      socGroup.add(pinRing);

      phoneGroup.add(socGroup);
      partsMap['soc'] = socGroup;

      // 3. Multi-Sensor Triple Camera Array (Sensor hotspot)
      const sensorGroup = new THREE.Group();
      sensorGroup.position.set(-0.35, isExploded ? 0.95 : 0.9, isExploded ? -0.55 : -0.1);

      const islandGeo = new THREE.BoxGeometry(0.5, 0.6, 0.06);
      const island = new THREE.Mesh(islandGeo, frameMat);
      sensorGroup.add(island);

      // 3 camera lenses
      const lensMat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        metalness: 0.9,
        roughness: 0.1
      });
      [
        [-0.12, 0.15],
        [-0.12, -0.15],
        [0.12, 0.0]
      ].forEach(([lx, ly]) => {
        const lensRimGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.04, 24);
        lensRimGeo.rotateX(Math.PI / 2);
        const rim = new THREE.Mesh(lensRimGeo, frameMat);
        rim.position.set(lx, ly, -0.04);
        sensorGroup.add(rim);

        const glassGeo = new THREE.SphereGeometry(0.06, 16, 16);
        const glass = new THREE.Mesh(glassGeo, lensMat);
        glass.position.set(lx, ly, -0.05);
        sensorGroup.add(glass);
      });

      phoneGroup.add(sensorGroup);
      partsMap['sensors'] = sensorGroup;

      // 4. Wireless 5G / IoT Gateway Waves (Modem hotspot)
      const modemGroup = new THREE.Group();
      modemGroup.position.set(0, -1.0, 0);

      const phoneWaves = new THREE.Group();
      for (let i = 0; i < 3; i++) {
        const waveGeo = new THREE.TorusGeometry(0.6 + i * 0.4, 0.015, 12, 48);
        const waveMat = new THREE.MeshBasicMaterial({
          color: 0x3b82f6,
          transparent: true,
          opacity: 0.6
        });
        const wave = new THREE.Mesh(waveGeo, waveMat);
        phoneWaves.add(wave);
      }
      modemGroup.add(phoneWaves);
      dynamicObjectsRef.current.phoneWaves = phoneWaves;

      phoneGroup.add(modemGroup);
      partsMap['modem'] = modemGroup;

      // Slight tilt for best isometric presentation
      phoneGroup.rotation.x = 0.2;
      phoneGroup.rotation.y = -0.3;

      modelRoot.add(phoneGroup);
    }

    dynamicObjectsRef.current.partsMap = partsMap;
  }, [activeModel, isExploded]);

  // Reset 3D camera view
  const handleResetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      controlsRef.current.target.set(0, 0.6, 0);
    }
    if (modelGroupRef.current) {
      modelGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  const currentPartInfo = MODEL_INFO[activeModel][activePartKey] || Object.values(MODEL_INFO[activeModel])[0];

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden my-6">
      {/* Top Header with Model Switcher */}
      <div className="px-5 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-slate-50/80 via-white to-slate-50/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-2xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700">
                {bilingualMode === 'en' ? 'Interactive 3D Simulation' : 'Mô hình 3D tương tác trực quan'}
              </span>
              <span className="text-xs text-slate-400 font-medium">Three.js WebGL</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
              {bilingualMode === 'en'
                ? 'Deconstructing Smart Devices & Autonomous Systems'
                : 'Khám phá Cấu trúc Bên trong Thiết bị Thông minh'}
            </h3>
          </div>
        </div>

        {/* Model Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80">
          <button
            type="button"
            onClick={() => setActiveModel('camera')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeModel === 'camera'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>{bilingualMode === 'en' ? 'AI Camera' : 'Camera AI'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveModel('car')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeModel === 'car'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>{bilingualMode === 'en' ? 'Autonomous Car' : 'Xe tự hành'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveModel('phone')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeModel === 'phone'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>{bilingualMode === 'en' ? 'Smartphone & IoT' : 'Smartphone & IoT'}</span>
          </button>
        </div>
      </div>

      {/* Main 3D Canvas + Overlay Controls */}
      <div className="relative w-full h-[400px] sm:h-[480px] bg-gradient-to-b from-[#fbfcfe] via-white to-slate-50 cursor-grab active:cursor-grabbing select-none overflow-hidden">
        {/* Three.js Canvas Container */}
        <div ref={mountRef} className="w-full h-full" />

        {/* Floating Top-Left Interactive Legend / Instruction */}
        <div className="absolute top-4 left-4 pointer-events-none bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-2 text-xs text-slate-600">
          <Eye className="w-3.5 h-3.5 text-indigo-600" />
          <span>
            {bilingualMode === 'en'
              ? 'Drag to rotate 360° • Scroll to zoom • Click parts below to inspect'
              : 'Kéo chuột để xoay 360° • Cuộn chuột để phóng to/thu nhỏ'}
          </span>
        </div>

        {/* Floating Top-Right Tool Buttons */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          {/* Toggle Auto Rotation */}
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 shadow-xs border cursor-pointer ${
              autoRotate
                ? 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white'
            }`}
            title="Bật/Tắt tự động xoay"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">
              {autoRotate ? (bilingualMode === 'en' ? 'Rotating' : 'Đang xoay') : (bilingualMode === 'en' ? 'Rotate' : 'Tự xoay')}
            </span>
          </button>

          {/* Toggle Sensor & Scanning Beam */}
          <button
            type="button"
            onClick={() => setShowScanningBeam(!showScanningBeam)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 shadow-xs border cursor-pointer ${
              showScanningBeam
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white'
            }`}
            title="Bật/Tắt tia quét cảm biến"
          >
            <Radio className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {showScanningBeam
                ? (bilingualMode === 'en' ? 'Sensors Active' : 'Tia cảm biến')
                : (bilingualMode === 'en' ? 'Sensors Off' : 'Ẩn tia quét')}
            </span>
          </button>

          {/* Toggle Exploded View */}
          <button
            type="button"
            onClick={() => setIsExploded(!isExploded)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 shadow-xs border cursor-pointer ${
              isExploded
                ? 'bg-amber-600 text-white border-amber-500'
                : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white'
            }`}
            title="Mở rộng bóc tách linh kiện bên trong"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isExploded
                ? (bilingualMode === 'en' ? 'Assembled' : 'Lắp ghép')
                : (bilingualMode === 'en' ? 'Exploded View' : 'Bóc tách linh kiện')}
            </span>
          </button>

          {/* Reset Camera View */}
          <button
            type="button"
            onClick={handleResetView}
            className="p-1.5 rounded-xl bg-white/90 text-slate-700 border border-slate-200 hover:bg-white backdrop-blur-md shadow-xs transition-all cursor-pointer"
            title="Đặt lại góc nhìn chuẩn"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Floating Component Inspector Pill */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-md">
          {/* Part Selector Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {Object.entries(MODEL_INFO[activeModel]).map(([key, info]) => {
              const isSelected = activePartKey === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActivePartKey(key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{bilingualMode === 'en' ? info.titleEn.split(' ')[0] : info.titleVi.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Part Classification Badge */}
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-100 shrink-0">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>{bilingualMode === 'en' ? currentPartInfo.roleEn : currentPartInfo.roleVi}</span>
          </div>
        </div>
      </div>

      {/* Detail Explanatory Card Below Canvas */}
      <div className="p-5 bg-white border-t border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h4 className="text-sm sm:text-base font-bold text-slate-900">
                {bilingualMode === 'en' ? currentPartInfo.titleEn : currentPartInfo.titleVi}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {bilingualMode === 'en' ? currentPartInfo.descEn : currentPartInfo.descVi}
            </p>
          </div>

          <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-200/70 flex flex-col justify-center">
            <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1">
              {bilingualMode === 'en' ? 'Key Concept (SGK Tin học 10)' : 'Điểm cốt lõi SGK Tin 10'}
            </div>
            <p className="text-xs font-medium text-slate-700">
              {bilingualMode === 'en'
                ? 'Smart devices possess autonomy by combining sensors, embedded microprocessors, and network interconnectivity.'
                : 'Thiết bị thông minh có khả năng tự chủ nhờ phối hợp cảm biến, bộ vi xử lý nhúng và khả năng kết nối mạng.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
