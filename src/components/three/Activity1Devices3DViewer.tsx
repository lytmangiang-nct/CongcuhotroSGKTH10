import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useBook } from '../../context/BookContext';
import {
  Sparkles,
  RotateCcw,
  Maximize2,
  Clock,
  Smartphone,
  Video,
  Camera,
  CheckCircle2,
  XCircle,
  Wifi,
  WifiOff,
  Bot,
  UserCheck,
  Eye,
  ShieldCheck
} from 'lucide-react';

export type Activity1DeviceId = 'clock' | 'phone' | 'camera' | 'cam_digital';

export interface Activity1DeviceData {
  id: Activity1DeviceId;
  figure: string;
  nameVi: string;
  nameEn: string;
  isSmart: boolean;
  hasNetwork: boolean;
  isAutonomous: boolean;
  reasonVi: string;
  reasonEn: string;
  keyFeatureVi: string;
  keyFeatureEn: string;
  color: string;
}

export const ACTIVITY1_DEVICES: Record<Activity1DeviceId, Activity1DeviceData> = {
  clock: {
    id: 'clock',
    figure: 'Hình 2.1a',
    nameVi: 'Đồng hồ lịch vạn niên điện tử',
    nameEn: 'Perpetual Calendar Digital Clock',
    isSmart: false,
    hasNetwork: false,
    isAutonomous: false,
    reasonVi: 'Chỉ hiển thị giờ và ngày tháng theo mạch đếm định sẵn; hoàn toàn không có kết nối mạng và không tự thích ứng hay tương tác với môi trường.',
    reasonEn: 'Only counts and displays time/date via fixed hardware circuits; lacks network connectivity and cannot adapt or communicate.',
    keyFeatureVi: 'Mạch điện tử cố định • Không có kết nối mạng • Không tự chủ',
    keyFeatureEn: 'Fixed electronic logic • No network • No autonomy',
    color: '#64748b'
  },
  phone: {
    id: 'phone',
    figure: 'Hình 2.1b',
    nameVi: 'Điện thoại di động thông minh (Smartphone)',
    nameEn: 'Smartphone Mobile Device',
    isSmart: true,
    hasNetwork: true,
    isAutonomous: true,
    reasonVi: 'Là hệ thống xử lí thông tin tự chủ có hệ điều hành, tích hợp cảm biến đa dạng, kết nối 4G/5G/Wi-Fi/Bluetooth và tự động xử lí dữ liệu.',
    reasonEn: 'An autonomous information processing system running a full OS, multi-sensor suite, 4G/5G/Wi-Fi/Bluetooth, and automated processing.',
    keyFeatureVi: 'Hệ điều hành • Đa cảm biến • Kết nối 5G/Wi-Fi • Hoạt động tự chủ',
    keyFeatureEn: 'Operating System • Multi-sensor • 5G/Wi-Fi • Autonomous',
    color: '#3b82f6'
  },
  camera: {
    id: 'camera',
    figure: 'Hình 2.1c',
    nameVi: 'Camera giám sát kết nối Internet (Smart IP Camera)',
    nameEn: 'Internet-Connected Smart IP Camera',
    isSmart: true,
    hasNetwork: true,
    isAutonomous: true,
    reasonVi: 'Tự động truyền dữ liệu qua Internet, tích hợp thuật toán AI phát hiện chuyển động để tự kích hoạt ghi hình và gửi cảnh báo về điện thoại người dùng.',
    reasonEn: 'Transmits data autonomously over the Internet, using AI motion-detection algorithms to trigger recordings and instant user alerts.',
    keyFeatureVi: 'Thuật toán phát hiện chuyển động • Tự gửi cảnh báo • Kết nối Internet',
    keyFeatureEn: 'Motion detection algorithm • Autonomous alerts • Internet-connected',
    color: '#10b981'
  },
  cam_digital: {
    id: 'cam_digital',
    figure: 'Hình 2.1d',
    nameVi: 'Máy ảnh số cơ bản (Standalone Digital Camera)',
    nameEn: 'Standalone Digital Camera',
    isSmart: false,
    hasNetwork: false,
    isAutonomous: false,
    reasonVi: 'Không hoạt động tự chủ, phụ thuộc hoàn toàn vào con người bấm nút chụp và không có kết nối mạng để tự động trao đổi dữ liệu.',
    reasonEn: 'Does not operate autonomously; entirely dependent on direct human shutter clicks and lacks independent network data sharing.',
    keyFeatureVi: 'Cần người bấm nút chụp • Lưu trữ thẻ nhớ cục bộ • Không tự kết nối mạng',
    keyFeatureEn: 'Requires manual shutter clicks • Local SD card storage • No network',
    color: '#f59e0b'
  }
};

interface Activity1Devices3DViewerProps {
  selectedDeviceId: Activity1DeviceId;
  onSelectDevice: (id: Activity1DeviceId) => void;
  userChoices?: Record<string, boolean>;
  onMakeChoice?: (id: string, isSmart: boolean) => void;
  showResults?: boolean;
}

export const Activity1Devices3DViewer: React.FC<Activity1Devices3DViewerProps> = ({
  selectedDeviceId,
  onSelectDevice,
  userChoices = {},
  onMakeChoice,
  showResults = false
}) => {
  const { bilingualMode } = useBook();
  const mountRef = useRef<HTMLDivElement>(null);

  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [showNetworkWave, setShowNetworkWave] = useState<boolean>(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRootRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  const animatedPartsRef = useRef<{
    clockColon?: THREE.Mesh;
    phoneWaveRing?: THREE.Group;
    cameraPtzHead?: THREE.Group;
    cameraScanBeam?: THREE.Mesh;
    cameraLed?: THREE.Mesh;
    cameraLensRing?: THREE.Mesh;
  }>({});

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 420;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfcfdff);
    scene.fog = new THREE.FogExp2(0xfcfdff, 0.025);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(3.8, 2.8, 4.8);

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
    rendererRef.current = renderer;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2.2;
    controls.maxDistance = 10;
    controls.maxPolarAngle = Math.PI / 2 + 0.05;
    controls.target.set(0, 0.5, 0);
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 9, 6);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xe0e7ff, 0.7);
    fillLight.position.set(-5, 4, -4);
    scene.add(fillLight);

    // Grid Floor
    const grid = new THREE.GridHelper(14, 28, 0xc7d2fe, 0xe2e8f0);
    grid.position.y = -0.01;
    scene.add(grid);

    const floorGeo = new THREE.CircleGeometry(7, 48);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.95
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Model Root
    const modelRoot = new THREE.Group();
    scene.add(modelRoot);
    modelRootRef.current = modelRoot;

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

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (autoRotate && modelRoot) {
        modelRoot.rotation.y += 0.006;
      }

      const anim = animatedPartsRef.current;

      // Clock blinking colon dots
      if (anim.clockColon) {
        anim.clockColon.visible = Math.floor(elapsed * 2) % 2 === 0;
      }

      // Phone pulsing wireless rings
      if (anim.phoneWaveRing) {
        anim.phoneWaveRing.visible = showNetworkWave;
        anim.phoneWaveRing.children.forEach((ring, idx) => {
          const s = ((elapsed * 1.5 + idx * 0.5) % 2.5) + 0.3;
          ring.scale.set(s, s, s);
          const mat = (ring as THREE.Mesh).material as THREE.MeshBasicMaterial;
          if (mat) mat.opacity = Math.max(0, 0.7 - s * 0.28);
        });
      }

      // Camera smart PTZ movement & scanning beam
      if (anim.cameraPtzHead) {
        anim.cameraPtzHead.rotation.y = Math.sin(elapsed * 1.2) * 0.5;
      }
      if (anim.cameraScanBeam) {
        anim.cameraScanBeam.visible = showNetworkWave;
        const beamPulse = 1 + Math.sin(elapsed * 4) * 0.1;
        anim.cameraScanBeam.scale.set(beamPulse, 1, beamPulse);
      }
      if (anim.cameraLed) {
        const mat = anim.cameraLed.material as THREE.MeshBasicMaterial;
        if (mat) mat.opacity = 0.5 + Math.sin(elapsed * 5) * 0.5;
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

  // Rebuild 3D Model when selectedDeviceId changes
  useEffect(() => {
    const root = modelRootRef.current;
    if (!root) return;

    while (root.children.length > 0) {
      const child = root.children[0];
      root.remove(child);
      if ((child as THREE.Mesh).geometry) (child as THREE.Mesh).geometry.dispose();
    }
    animatedPartsRef.current = {};

    // -------------------------------------------------------------------------
    // MODEL A: DIGITAL PERPETUAL CALENDAR CLOCK (Đồng hồ lịch vạn niên)
    // -------------------------------------------------------------------------
    if (selectedDeviceId === 'clock') {
      const g = new THREE.Group();

      const woodFrameMat = new THREE.MeshStandardMaterial({
        color: 0x475569,
        roughness: 0.6
      });
      const displayGlassMat = new THREE.MeshStandardMaterial({
        color: 0x090d16,
        roughness: 0.2
      });
      const ledGreenMat = new THREE.MeshStandardMaterial({
        color: 0x22c55e,
        emissive: 0x16a34a,
        emissiveIntensity: 1.2
      });
      const ledRedMat = new THREE.MeshStandardMaterial({
        color: 0xef4444,
        emissive: 0xdc2626,
        emissiveIntensity: 1.0
      });

      // Frame
      const frameGeo = new THREE.BoxGeometry(2.4, 1.5, 0.35);
      const frame = new THREE.Mesh(frameGeo, woodFrameMat);
      frame.position.y = 0.9;
      frame.castShadow = true;
      g.add(frame);

      // Display Area
      const dispGeo = new THREE.BoxGeometry(2.1, 1.2, 0.05);
      const disp = new THREE.Mesh(dispGeo, displayGlassMat);
      disp.position.set(0, 0.9, 0.16);
      g.add(disp);

      // Digital 7-segment clock digits simulation (10:24)
      [-0.6, -0.2, 0.2, 0.6].forEach((dx, idx) => {
        const digGeo = new THREE.BoxGeometry(0.24, 0.45, 0.02);
        const dig = new THREE.Mesh(digGeo, ledGreenMat);
        dig.position.set(dx, 1.1, 0.2);
        g.add(dig);
      });

      // Blinking Colon Dots between digits
      const colonGroup = new THREE.Group();
      [-0.06, 0.06].forEach((cy) => {
        const dotGeo = new THREE.BoxGeometry(0.04, 0.04, 0.02);
        const dot = new THREE.Mesh(dotGeo, ledGreenMat);
        dot.position.set(0, 1.1 + cy, 0.2);
        colonGroup.add(dot);
      });
      g.add(colonGroup);
      animatedPartsRef.current.clockColon = colonGroup as unknown as THREE.Mesh;

      // Calendar Date & Temperature segments (23/10/2026 - 28°C)
      for (let i = 0; i < 5; i++) {
        const calGeo = new THREE.BoxGeometry(0.18, 0.16, 0.02);
        const cal = new THREE.Mesh(calGeo, ledRedMat);
        cal.position.set(-0.6 + i * 0.3, 0.65, 0.2);
        g.add(cal);
      }

      // Desk Stand Legs
      [-0.7, 0.7].forEach((lx) => {
        const legGeo = new THREE.BoxGeometry(0.12, 0.3, 0.5);
        const leg = new THREE.Mesh(legGeo, woodFrameMat);
        leg.position.set(lx, 0.15, 0);
        g.add(leg);
      });

      // Black Power Cord at the back (indicating physical wall connection, no wireless autonomy)
      const cordGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.2, 12);
      cordGeo.rotateX(Math.PI / 3);
      const cordMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 });
      const cord = new THREE.Mesh(cordGeo, cordMat);
      cord.position.set(0, 0.4, -0.4);
      g.add(cord);

      root.add(g);
    }

    // -------------------------------------------------------------------------
    // MODEL B: SMARTPHONE (Điện thoại thông minh)
    // -------------------------------------------------------------------------
    else if (selectedDeviceId === 'phone') {
      const g = new THREE.Group();
      g.position.y = 0.8;

      const frameMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.9,
        roughness: 0.15
      });
      const screenMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        metalness: 0.8,
        roughness: 0.1,
        emissive: 0x0369a1,
        emissiveIntensity: 0.4
      });

      // Phone Body
      const bodyGeo = new THREE.BoxGeometry(1.3, 2.6, 0.12);
      const body = new THREE.Mesh(bodyGeo, frameMat);
      body.castShadow = true;
      g.add(body);

      // Screen
      const scrGeo = new THREE.BoxGeometry(1.22, 2.5, 0.02);
      const scr = new THREE.Mesh(scrGeo, screenMat);
      scr.position.z = 0.06;
      g.add(scr);

      // UI HUD elements on screen
      const hudGeo = new THREE.PlaneGeometry(1.0, 2.2);
      const hudMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.35
      });
      const hud = new THREE.Mesh(hudGeo, hudMat);
      hud.position.z = 0.075;
      g.add(hud);

      // Camera Island
      const camIslandGeo = new THREE.BoxGeometry(0.42, 0.52, 0.04);
      const camIsland = new THREE.Mesh(camIslandGeo, frameMat);
      camIsland.position.set(-0.35, 0.85, -0.07);
      g.add(camIsland);

      // Lenses
      const lensMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, metalness: 0.9 });
      [-0.1, 0.1].forEach((ly) => {
        const lensGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.04, 20);
        lensGeo.rotateX(Math.PI / 2);
        const lens = new THREE.Mesh(lensGeo, lensMat);
        lens.position.set(-0.35, 0.85 + ly, -0.09);
        g.add(lens);
      });

      // Wireless Radiation Waves (Wi-Fi 6 / 5G / IoT)
      const waveGroup = new THREE.Group();
      waveGroup.position.set(0, 0, 0);
      for (let i = 0; i < 3; i++) {
        const ringGeo = new THREE.TorusGeometry(0.9 + i * 0.4, 0.015, 12, 48);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x3b82f6,
          transparent: true,
          opacity: 0.6
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        waveGroup.add(ring);
      }
      g.add(waveGroup);
      animatedPartsRef.current.phoneWaveRing = waveGroup;

      g.rotation.x = 0.2;
      g.rotation.y = -0.25;

      root.add(g);
    }

    // -------------------------------------------------------------------------
    // MODEL C: INTERNET SMART CAMERA (Camera giám sát kết nối Internet)
    // -------------------------------------------------------------------------
    else if (selectedDeviceId === 'camera') {
      const g = new THREE.Group();

      const whiteMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.2,
        roughness: 0.2
      });
      const darkMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        metalness: 0.8,
        roughness: 0.2
      });
      const lensGlassMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        metalness: 0.95,
        roughness: 0.05
      });

      // Wall / Table Mount Base
      const baseGeo = new THREE.CylinderGeometry(0.65, 0.75, 0.25, 32);
      const base = new THREE.Mesh(baseGeo, whiteMat);
      base.position.y = 0.125;
      base.castShadow = true;
      g.add(base);

      // Wi-Fi Antenna
      const antBaseGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.1, 16);
      const antBase = new THREE.Mesh(antBaseGeo, darkMat);
      antBase.position.set(0.4, 0.25, -0.3);
      g.add(antBase);

      const antStickGeo = new THREE.CylinderGeometry(0.02, 0.025, 1.2, 16);
      antStickGeo.translate(0, 0.6, 0);
      const antStick = new THREE.Mesh(antStickGeo, darkMat);
      antStick.position.set(0.4, 0.25, -0.3);
      antStick.rotation.z = -0.15;
      g.add(antStick);

      // Connected Green LED
      const ledGeo = new THREE.SphereGeometry(0.035, 12, 12);
      const ledMat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true });
      const led = new THREE.Mesh(ledGeo, ledMat);
      led.position.set(0, 0.2, 0.68);
      g.add(led);
      animatedPartsRef.current.cameraLed = led;

      // Rotating PTZ Camera Head
      const ptzHead = new THREE.Group();
      ptzHead.position.set(0, 0.95, 0);

      // Spherical Camera Ball
      const ballGeo = new THREE.SphereGeometry(0.65, 32, 32);
      const ball = new THREE.Mesh(ballGeo, whiteMat);
      ball.castShadow = true;
      ptzHead.add(ball);

      // Black Optical Faceplate
      const faceGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.1, 32);
      faceGeo.rotateX(Math.PI / 2);
      const face = new THREE.Mesh(faceGeo, darkMat);
      face.position.set(0, 0, 0.58);
      ptzHead.add(face);

      // Center Optical Lens
      const lensRimGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.08, 24);
      lensRimGeo.rotateX(Math.PI / 2);
      const lensRim = new THREE.Mesh(lensRimGeo, darkMat);
      lensRim.position.set(0, 0, 0.64);
      ptzHead.add(lensRim);

      const lensGlassGeo = new THREE.SphereGeometry(0.14, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);
      lensGlassGeo.rotateX(-Math.PI / 2);
      const lensGlass = new THREE.Mesh(lensGlassGeo, lensGlassMat);
      lensGlass.position.set(0, 0, 0.66);
      ptzHead.add(lensGlass);

      // Dynamic AI Motion-Detection Alert Cone
      const coneGeo = new THREE.ConeGeometry(1.6, 3.8, 32, 1, true);
      coneGeo.rotateX(Math.PI / 2);
      coneGeo.translate(0, 0, 1.9);
      const coneMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide
      });
      const cone = new THREE.Mesh(coneGeo, coneMat);
      cone.position.set(0, 0, 0.68);
      ptzHead.add(cone);
      animatedPartsRef.current.cameraScanBeam = cone;

      g.add(ptzHead);
      animatedPartsRef.current.cameraPtzHead = ptzHead;

      root.add(g);
    }

    // -------------------------------------------------------------------------
    // MODEL D: STANDALONE DIGITAL CAMERA (Máy ảnh số cơ bản)
    // -------------------------------------------------------------------------
    else if (selectedDeviceId === 'cam_digital') {
      const g = new THREE.Group();
      g.position.y = 0.7;

      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0x334155,
        metalness: 0.8,
        roughness: 0.3
      });
      const gripMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.9
      });
      const lensMetalMat = new THREE.MeshStandardMaterial({
        color: 0x64748b,
        metalness: 0.9,
        roughness: 0.2
      });
      const lensGlassMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        metalness: 0.95,
        roughness: 0.05
      });
      const shutterBtnMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        metalness: 0.95,
        roughness: 0.1
      });

      // Camera Main Body Box
      const bodyGeo = new THREE.BoxGeometry(2.1, 1.3, 0.7);
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.castShadow = true;
      g.add(body);

      // Rubber Handgrip
      const gripGeo = new THREE.BoxGeometry(0.35, 1.25, 0.75);
      const grip = new THREE.Mesh(gripGeo, gripMat);
      grip.position.set(0.9, 0, 0.02);
      g.add(grip);

      // Protruding Optical Zoom Lens Barrel
      const barrelGeo = new THREE.CylinderGeometry(0.48, 0.52, 0.65, 32);
      barrelGeo.rotateX(Math.PI / 2);
      const barrel = new THREE.Mesh(barrelGeo, lensMetalMat);
      barrel.position.set(-0.25, 0, 0.55);
      barrel.castShadow = true;
      g.add(barrel);

      const glassGeo = new THREE.SphereGeometry(0.38, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);
      glassGeo.rotateX(-Math.PI / 2);
      const glass = new THREE.Mesh(glassGeo, lensGlassMat);
      glass.position.set(-0.25, 0, 0.85);
      g.add(glass);

      // Physical Shutter Button on Top (Nhấn chụp thủ công)
      const shutterGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.1, 24);
      const shutter = new THREE.Mesh(shutterGeo, shutterBtnMat);
      shutter.position.set(0.7, 0.7, 0.1);
      g.add(shutter);

      // Mode Dial Wheel
      const dialGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.08, 24);
      const dial = new THREE.Mesh(dialGeo, bodyMat);
      dial.position.set(0.35, 0.69, -0.1);
      g.add(dial);

      // Xenon Flash Window
      const flashGeo = new THREE.BoxGeometry(0.32, 0.15, 0.05);
      const flashMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 });
      const flash = new THREE.Mesh(flashGeo, flashMat);
      flash.position.set(-0.65, 0.45, 0.36);
      g.add(flash);

      // Rear LCD Screen
      const lcdGeo = new THREE.BoxGeometry(1.3, 0.95, 0.02);
      const lcdMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2 });
      const lcd = new THREE.Mesh(lcdGeo, lcdMat);
      lcd.position.set(-0.2, 0, -0.36);
      g.add(lcd);

      g.rotation.y = 0.15;
      root.add(g);
    }
  }, [selectedDeviceId]);

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      controlsRef.current.target.set(0, 0.5, 0);
    }
  };

  const devInfo = ACTIVITY1_DEVICES[selectedDeviceId];
  const userChoice = userChoices[selectedDeviceId];
  const isCorrect = userChoice === devInfo.isSmart;

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden my-4">
      {/* Top Header with Device Switcher */}
      <div className="px-5 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-amber-50/70 via-white to-amber-50/70">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-xs font-black text-sm"
            style={{ backgroundColor: devInfo.color }}
          >
            {devInfo.figure.split(' ')[1]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
                {bilingualMode === 'en' ? 'Activity 1 • 3D Inspection' : 'Mô hình 3D Hoạt động 1 (Hình 2.1 SGK)'}
              </span>
              <span className="text-xs text-slate-500 font-medium">Trang 11 SGK</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
              {bilingualMode === 'en' ? devInfo.nameEn : devInfo.nameVi}
            </h3>
          </div>
        </div>

        {/* 4 Device Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80 overflow-x-auto max-w-full">
          {(['clock', 'phone', 'camera', 'cam_digital'] as Activity1DeviceId[]).map((id) => {
            const isSelected = selectedDeviceId === id;
            const item = ACTIVITY1_DEVICES[id];
            const iconMap = {
              clock: Clock,
              phone: Smartphone,
              camera: Video,
              cam_digital: Camera
            };
            const ItemIcon = iconMap[id];

            return (
              <button
                key={id}
                type="button"
                onClick={() => onSelectDevice(id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ItemIcon className="w-3.5 h-3.5" style={{ color: item.color }} />
                <span>{item.figure.split(' ')[1]}</span>
                <span className="hidden sm:inline">
                  {bilingualMode === 'en' ? item.nameEn.split(' ')[0] : item.nameVi.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 3D Canvas */}
      <div className="relative w-full h-[380px] sm:h-[440px] bg-gradient-to-b from-[#fcfdff] via-white to-slate-50 cursor-grab active:cursor-grabbing select-none overflow-hidden">
        <div ref={mountRef} className="w-full h-full" />

        {/* Floating Top-Left Status Pills */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5">
          <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/90 shadow-2xs flex items-center gap-2 text-xs">
            {devInfo.hasNetwork ? (
              <span className="flex items-center gap-1 text-emerald-700 font-bold">
                <Wifi className="w-3.5 h-3.5" />
                <span>{bilingualMode === 'en' ? 'Network: Wireless Connected' : 'Mạng: Có kết nối'}</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-slate-500 font-semibold">
                <WifiOff className="w-3.5 h-3.5" />
                <span>{bilingualMode === 'en' ? 'Network: Standalone Offline' : 'Mạng: Không có kết nối'}</span>
              </span>
            )}
          </div>

          <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/90 shadow-2xs flex items-center gap-2 text-xs">
            {devInfo.isAutonomous ? (
              <span className="flex items-center gap-1 text-indigo-700 font-bold">
                <Bot className="w-3.5 h-3.5" />
                <span>{bilingualMode === 'en' ? 'Autonomy: Automated' : 'Hoạt động: Tự chủ có thuật toán'}</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-slate-500 font-semibold">
                <UserCheck className="w-3.5 h-3.5" />
                <span>{bilingualMode === 'en' ? 'Autonomy: Manual trigger' : 'Hoạt động: Phụ thuộc con người'}</span>
              </span>
            )}
          </div>
        </div>

        {/* Floating Top-Right Controls */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          {/* Toggle Auto Rotation */}
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all shadow-xs border cursor-pointer ${
              autoRotate
                ? 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white'
            }`}
            title="Tự động xoay mô hình 3D"
          >
            <RotateCcw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} />
          </button>

          {/* Toggle Wireless/Sensor visualization */}
          {(devInfo.hasNetwork || devInfo.id === 'camera') && (
            <button
              type="button"
              onClick={() => setShowNetworkWave(!showNetworkWave)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 shadow-xs border cursor-pointer ${
                showNetworkWave
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white'
              }`}
              title="Bật/Tắt hiển thị sóng mạng hoặc tia quét"
            >
              <Wifi className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {showNetworkWave ? (bilingualMode === 'en' ? 'Signals On' : 'Tín hiệu số') : (bilingualMode === 'en' ? 'Signals Off' : 'Ẩn tín hiệu')}
              </span>
            </button>
          )}

          {/* Reset Camera */}
          <button
            type="button"
            onClick={handleResetCamera}
            className="p-1.5 rounded-xl bg-white/90 text-slate-700 border border-slate-200 hover:bg-white backdrop-blur-md shadow-xs transition-all cursor-pointer"
            title="Đặt lại góc nhìn chuẩn"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Floating Bottom Quick-Answer Bar on the 3D Canvas */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-md">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xs text-slate-900">
              {bilingualMode === 'en' ? 'Is this a smart device?' : 'Thiết bị này có phải là thiết bị thông minh?'}
            </span>
            <span className="text-xs text-slate-400 font-mono">({devInfo.figure})</span>
          </div>

          <div className="flex items-center gap-2">
            {onMakeChoice && (
              <>
                <button
                  type="button"
                  onClick={() => onMakeChoice(selectedDeviceId, true)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    userChoice === true
                      ? 'bg-emerald-600 text-white shadow-xs scale-105'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{bilingualMode === 'en' ? 'Yes, it is' : 'Đúng (Là TB thông minh)'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onMakeChoice(selectedDeviceId, false)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    userChoice === false
                      ? 'bg-rose-600 text-white shadow-xs scale-105'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>{bilingualMode === 'en' ? 'No, it is not' : 'Sai (Không phải)'}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Explanatory Assessment Card */}
      <div className="p-5 bg-white border-t border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: devInfo.color }}
              />
              <h4 className="text-sm sm:text-base font-bold text-slate-900">
                {bilingualMode === 'en' ? devInfo.nameEn : devInfo.nameVi}
              </h4>
              <span className="text-xs text-slate-500 font-mono">({devInfo.figure})</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {bilingualMode === 'en' ? devInfo.reasonEn : devInfo.reasonVi}
            </p>

            {showResults && (
              <div
                className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                  isCorrect
                    ? 'bg-emerald-50 text-emerald-950 border-emerald-200'
                    : 'bg-rose-50 text-rose-950 border-rose-200'
                }`}
              >
                {isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-bold">
                    {isCorrect
                      ? (bilingualMode === 'en' ? '✓ Correct! ' : '✓ Đúng! ')
                      : (bilingualMode === 'en' ? '✗ Incorrect. ' : '✗ Chưa đúng. ')}
                  </span>
                  <span>
                    {devInfo.isSmart
                      ? (bilingualMode === 'en'
                        ? 'This is a Smart Device because it operates autonomously and connects to networks.'
                        : 'Đây là Thiết bị thông minh vì có khả năng hoạt động tự chủ và kết nối trao đổi dữ liệu qua mạng.')
                      : (bilingualMode === 'en'
                        ? 'This is NOT a Smart Device because it lacks network connectivity and autonomous adaptation.'
                        : 'Đây KHÔNG phải là Thiết bị thông minh vì thiếu kết nối mạng và không hoạt động tự chủ.')}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/70 flex flex-col justify-center space-y-1.5">
            <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
              {bilingualMode === 'en' ? 'Distinguishing Feature' : 'Đặc trưng nhận diện SGK'}
            </div>
            <p className="text-xs font-semibold text-slate-800">
              {bilingualMode === 'en' ? devInfo.keyFeatureEn : devInfo.keyFeatureVi}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
