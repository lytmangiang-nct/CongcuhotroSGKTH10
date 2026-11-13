import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useBook } from '../../context/BookContext';
import {
  RotateCcw,
  Maximize2,
  Minimize2,
  ArrowRight,
  GitBranch,
  Play,
  Pause,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Zap,
  Layers,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Split,
  ChevronRight
} from 'lucide-react';

interface BranchingDecision3DViewerProps {
  initialMode?: 'decision_tree' | 'logic_gates' | 'leap_electric';
}

export const BranchingDecision3DViewer: React.FC<BranchingDecision3DViewerProps> = ({
  initialMode = 'decision_tree'
}) => {
  const { bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<'decision_tree' | 'logic_gates' | 'leap_electric'>(initialMode);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // Mode 1: Decision Branching Presets
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [isConditionTrue, setIsConditionTrue] = useState<boolean>(true);

  // Mode 2: Logic Gates State
  const [activeGate, setActiveGate] = useState<'AND' | 'OR' | 'NOT'>('AND');
  const [inputX, setInputX] = useState<boolean>(true);
  const [inputY, setInputY] = useState<boolean>(false);

  // Mode 3: Leap Year & Electricity State
  const [subTabMode3, setSubTabMode3] = useState<'electricity' | 'leap_year'>('electricity');
  const [kwhValue, setKwhValue] = useState<number>(75);
  const [yearValue, setYearValue] = useState<number>(2024);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const reqIdRef = useRef<number | null>(null);
  const modeGroupRef = useRef<THREE.Group | null>(null);
  const animTimeRef = useRef<number>(0);

  // Mouse interaction
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const rotRef = useRef({ x: 0.35, y: 0.5 });

  // Decision Tree Presets from Textbook (Trang 101 - 104)
  const decisionPresets = [
    {
      id: 'weather',
      titleVi: 'Khởi động: Dự báo thời tiết (Hình 19.1)',
      titleEn: 'Warm-up: Weather Forecast (Fig 19.1)',
      sgkPage: isEn ? 'Page 101' : 'Trang 101 SGK',
      conditionTextVi: 'Trời không mưa?',
      conditionTextEn: 'Is it not raining?',
      trueBranchVi: 'Đi chơi cùng bạn (Lệnh 1)',
      trueBranchEn: 'Go out with friends (Cmd 1)',
      falseBranchVi: 'Ở nhà làm bài tập (Lệnh 2)',
      falseBranchEn: 'Stay home and do homework (Cmd 2)',
      code: 'if troi_khong_mua:\n    di_choi_cung_ban()\nelse:\n    o_nha_lam_bai_tap()',
      defaultVal: true
    },
    {
      id: 'single_if',
      titleVi: 'Lệnh if dạng thiếu: Kiểm tra n > 0 (Hình 19.2)',
      titleEn: 'One-way if statement: Test n > 0 (Fig 19.2)',
      sgkPage: isEn ? 'Page 102' : 'Trang 102 SGK',
      conditionTextVi: 'n > 0?',
      conditionTextEn: 'n > 0?',
      trueBranchVi: 'In: "n là số lớn hơn 0"',
      trueBranchEn: 'Print: "n is greater than 0"',
      falseBranchVi: 'Bỏ qua (Chuyển lệnh kế tiếp)',
      falseBranchEn: 'Skip (Pass to next statement)',
      code: 'if n > 0:\n    print("n là số lớn hơn 0")',
      defaultVal: true
    },
    {
      id: 'abs_diff',
      titleVi: 'Lệnh if dạng đủ: Trị tuyệt đối |a - b| (Hình 19.3)',
      titleEn: 'Two-way if-else: Absolute difference |a - b| (Fig 19.3)',
      sgkPage: isEn ? 'Page 103' : 'Trang 103 SGK',
      conditionTextVi: 'a > b?',
      conditionTextEn: 'a > b?',
      trueBranchVi: 'print(a - b)',
      trueBranchEn: 'print(a - b)',
      falseBranchVi: 'print(b - a)',
      falseBranchEn: 'print(b - a)',
      code: 'if a > b:\n    print(a - b)\nelse:\n    print(b - a)',
      defaultVal: false
    },
    {
      id: 'even_odd',
      titleVi: 'Nhiệm vụ 1: Kiểm tra chẵn hay lẻ',
      titleEn: 'Task 1: Even or Odd Checker',
      sgkPage: isEn ? 'Page 103' : 'Trang 103 SGK',
      conditionTextVi: 'n % 2 == 0?',
      conditionTextEn: 'n % 2 == 0?',
      trueBranchVi: 'print("Số đã nhập là số chẵn.")',
      trueBranchEn: 'print("Entered number is even.")',
      falseBranchVi: 'print("Số đã nhập là số lẻ.")',
      falseBranchEn: 'print("Entered number is odd.")',
      code: 'if n % 2 == 0:\n    print("Số đã nhập là số chẵn.")\nelse:\n    print("Số đã nhập là số lẻ.")',
      defaultVal: true
    },
    {
      id: 'orange_market',
      titleVi: 'Vận dụng 1: Giá bán cam siêu thị',
      titleEn: 'Application 1: Supermarket Orange Pricing',
      sgkPage: isEn ? 'Page 104' : 'Trang 104 SGK',
      conditionTextVi: 'kg < 5?',
      conditionTextEn: 'kg < 5?',
      trueBranchVi: 'Giá 12 000 đ/kg (tien = kg * 12000)',
      trueBranchEn: 'Price 12,000 VND/kg (tien = kg * 12000)',
      falseBranchVi: 'Giá 10 000 đ/kg (tien = kg * 10000)',
      falseBranchEn: 'Price 10,000 VND/kg (tien = kg * 10000)',
      code: 'if kg < 5:\n    tien = kg * 12000\nelse:\n    tien = kg * 10000',
      defaultVal: true
    }
  ];

  const currentPreset = decisionPresets[selectedPresetIndex];

  // Logic calculation for Mode 2
  const gateOutput =
    activeGate === 'AND'
      ? inputX && inputY
      : activeGate === 'OR'
      ? inputX || inputY
      : !inputX;

  // Leap Year calculation for Mode 3
  const isLeapYear = yearValue % 400 === 0 || (yearValue % 4 === 0 && yearValue % 100 !== 0);

  // Electricity calculation for Mode 3
  const calcElectricityBill = (k: number) => {
    let bill = 0;
    if (k <= 50) {
      bill = k * 1.678;
    } else if (k <= 100) {
      bill = 50 * 1.678 + (k - 50) * 1.734;
    } else {
      bill = 50 * 1.678 + 50 * 1.734 + (k - 100) * 2.014;
    }
    return Math.round(bill * 100) / 100;
  };
  const electricBill = calcElectricityBill(kwhValue);

  // Three.js Scene Setup & Loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x060914);

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    if (activeMode === 'decision_tree') {
      camera.position.set(0, 8.5, 17);
      camera.lookAt(0, 0.5, 0.5);
      rotRef.current = { x: 0.38, y: 0.45 };
    } else if (activeMode === 'logic_gates') {
      camera.position.set(0, 4.5, 14);
      camera.lookAt(0, 0, 0);
      rotRef.current = { x: 0.15, y: 0.05 };
    } else {
      camera.position.set(0, 6.5, 15.5);
      camera.lookAt(0, 0.5, 0);
      rotRef.current = { x: 0.28, y: 0.35 };
    }
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(12, 18, 10);
    scene.add(dirLight);

    const greenPoint = new THREE.PointLight(0x10b981, 2.2, 30);
    greenPoint.position.set(5, 4, 3);
    scene.add(greenPoint);

    const bluePoint = new THREE.PointLight(0x38bdf8, 2.2, 30);
    bluePoint.position.set(-5, 4, 3);
    scene.add(bluePoint);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(30, 30, 0x1e293b, 0x0f172a);
    gridHelper.position.y = -2;
    scene.add(gridHelper);

    // Dynamic mode group
    const modeGroup = new THREE.Group();
    scene.add(modeGroup);
    modeGroupRef.current = modeGroup;

    // Mouse handlers for smooth 3D rotation
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - prevMouseRef.current.x;
      const dy = e.clientY - prevMouseRef.current.y;
      rotRef.current.y += dx * 0.008;
      rotRef.current.x = Math.max(-0.6, Math.min(1.0, rotRef.current.x + dy * 0.008));
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);
    const ro = new ResizeObserver(() => handleResize());
    ro.observe(container);

    // Animation Loop
    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      animTimeRef.current += 0.02;
      const t = animTimeRef.current;

      if (modeGroupRef.current) {
        if (!isDraggingRef.current && isPlaying) {
          rotRef.current.y += 0.002;
        }
        modeGroupRef.current.rotation.y = rotRef.current.y;
        modeGroupRef.current.rotation.x = rotRef.current.x;

        modeGroupRef.current.traverse((child) => {
          if (child.userData?.animate) {
            child.userData.animate(t);
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();
    reqIdRef.current = animId;

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isPlaying]);

  // Build Mode 3D Geometries
  useEffect(() => {
    const group = modeGroupRef.current;
    if (!group) return;

    // Clear previous geometries
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
    }

    if (activeMode === 'decision_tree') {
      // 1. Build Decision Branching Railroad
      // Source track coming from back (z: -7 -> z: 0)
      const srcTrackGeo = new THREE.CylinderGeometry(0.1, 0.1, 7, 16);
      srcTrackGeo.rotateX(Math.PI / 2);
      const srcTrackMat = new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        emissive: 0x475569,
        emissiveIntensity: 0.5
      });
      const srcTrack = new THREE.Mesh(srcTrackGeo, srcTrackMat);
      srcTrack.position.set(0, 0, -3.5);
      group.add(srcTrack);

      // Central Diamond Condition Gate <Điều kiện> (at origin x: 0, y: 0.6, z: 0)
      const diamondGroup = new THREE.Group();
      diamondGroup.position.set(0, 0.6, 0);

      const diamondGeo = new THREE.OctahedronGeometry(1.2, 0);
      const diamondMat = new THREE.MeshPhysicalMaterial({
        color: isConditionTrue ? 0x10b981 : 0x38bdf8,
        emissive: isConditionTrue ? 0x059669 : 0x0284c7,
        emissiveIntensity: 0.9,
        transmission: 0.6,
        transparent: true,
        opacity: 0.85,
        roughness: 0.2
      });
      const diamondMesh = new THREE.Mesh(diamondGeo, diamondMat);
      diamondMesh.userData = {
        animate: (t: number) => {
          diamondMesh.rotation.y = t * 1.5;
          diamondMesh.rotation.z = Math.sin(t * 3) * 0.15;
        }
      };
      diamondGroup.add(diamondMesh);

      // Rotating protective rings around condition diamond
      const gateRingGeo = new THREE.TorusGeometry(1.6, 0.08, 16, 32);
      const gateRingMat = new THREE.MeshStandardMaterial({
        color: 0xfacc15,
        emissive: 0xca8a04,
        emissiveIntensity: 0.8,
        wireframe: true
      });
      const gateRing = new THREE.Mesh(gateRingGeo, gateRingMat);
      gateRing.userData = {
        animate: (t: number) => {
          gateRing.rotation.x = t * 1.2;
          gateRing.rotation.y = t * 0.9;
        }
      };
      diamondGroup.add(gateRing);
      group.add(diamondGroup);

      // Branch 1: True / Đúng Track (curves to x: 5, z: 6)
      const trueCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1.5, 0, 2),
        new THREE.Vector3(3.5, 0, 4),
        new THREE.Vector3(5.0, 0, 6)
      ]);
      const trueTrackGeo = new THREE.TubeGeometry(trueCurve, 20, 0.12, 8, false);
      const trueTrackMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: isConditionTrue ? 0x059669 : 0x064e3b,
        emissiveIntensity: isConditionTrue ? 1.2 : 0.2
      });
      const trueTrack = new THREE.Mesh(trueTrackGeo, trueTrackMat);
      group.add(trueTrack);

      // Terminal Block 1 (True action)
      const block1Geo = new THREE.BoxGeometry(2.4, 1.2, 1.4);
      const block1Mat = new THREE.MeshStandardMaterial({
        color: 0x064e3b,
        emissive: isConditionTrue ? 0x10b981 : 0x047857,
        emissiveIntensity: isConditionTrue ? 0.8 : 0.2,
        roughness: 0.3
      });
      const block1 = new THREE.Mesh(block1Geo, block1Mat);
      block1.position.set(5.0, 0.6, 6.2);
      group.add(block1);

      // Branch 2: False / Sai Track (curves to x: -5, z: 6)
      const falseCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-1.5, 0, 2),
        new THREE.Vector3(-3.5, 0, 4),
        new THREE.Vector3(-5.0, 0, 6)
      ]);
      const falseTrackGeo = new THREE.TubeGeometry(falseCurve, 20, 0.12, 8, false);
      const falseTrackMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: !isConditionTrue ? 0x0284c7 : 0x082f49,
        emissiveIntensity: !isConditionTrue ? 1.2 : 0.2
      });
      const falseTrack = new THREE.Mesh(falseTrackGeo, falseTrackMat);
      group.add(falseTrack);

      // Terminal Block 2 (False action)
      const block2Geo = new THREE.BoxGeometry(2.4, 1.2, 1.4);
      const block2Mat = new THREE.MeshStandardMaterial({
        color: 0x082f49,
        emissive: !isConditionTrue ? 0x38bdf8 : 0x0284c7,
        emissiveIntensity: !isConditionTrue ? 0.8 : 0.2,
        roughness: 0.3
      });
      const block2 = new THREE.Mesh(block2Geo, block2Mat);
      block2.position.set(-5.0, 0.6, 6.2);
      group.add(block2);

      // Traveling Decision Packet
      const packetGeo = new THREE.SphereGeometry(0.35, 16, 16);
      const packetMat = new THREE.MeshStandardMaterial({
        color: isConditionTrue ? 0x34d399 : 0x7dd3fc,
        emissive: isConditionTrue ? 0x10b981 : 0x0284c7,
        emissiveIntensity: 1.5
      });
      const packet = new THREE.Mesh(packetGeo, packetMat);
      packet.userData = {
        animate: (t: number) => {
          const progress = (t * 0.6) % 1; // 0 to 1
          if (progress < 0.4) {
            // Approaching gate
            const frac = progress / 0.4;
            packet.position.set(0, 0.4, -6 + frac * 6);
          } else {
            // Moving down chosen branch
            const frac = (progress - 0.4) / 0.6;
            const chosenCurve = isConditionTrue ? trueCurve : falseCurve;
            const pt = chosenCurve.getPoint(frac);
            packet.position.set(pt.x, pt.y + 0.4, pt.z);
          }
        }
      };
      group.add(packet);
    } else if (activeMode === 'logic_gates') {
      // 2. Logic Gates Chamber (AND, OR, NOT)
      // Input Terminal X (x = -3.5, y = 1.5)
      const inXGeo = new THREE.BoxGeometry(1.2, 0.8, 0.8);
      const inXMat = new THREE.MeshStandardMaterial({
        color: inputX ? 0x10b981 : 0xef4444,
        emissive: inputX ? 0x059669 : 0x991b1b,
        emissiveIntensity: 0.8
      });
      const inX = new THREE.Mesh(inXGeo, inXMat);
      inX.position.set(-4.5, 1.2, 0);
      group.add(inX);

      // Input Terminal Y (x = -3.5, y = -1.5) - only for AND/OR
      if (activeGate !== 'NOT') {
        const inYGeo = new THREE.BoxGeometry(1.2, 0.8, 0.8);
        const inYMat = new THREE.MeshStandardMaterial({
          color: inputY ? 0x10b981 : 0xef4444,
          emissive: inputY ? 0x059669 : 0x991b1b,
          emissiveIntensity: 0.8
        });
        const inY = new THREE.Mesh(inYGeo, inYMat);
        inY.position.set(-4.5, -1.2, 0);
        group.add(inY);
      }

      // Central Logic Gate Prism
      const gateBodyGeo = new THREE.CylinderGeometry(1.4, 1.6, 2.5, 6);
      gateBodyGeo.rotateZ(Math.PI / 2);
      const gateBodyMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.8,
        roughness: 0.2
      });
      const gateBody = new THREE.Mesh(gateBodyGeo, gateBodyMat);
      gateBody.position.set(0, 0, 0);
      group.add(gateBody);

      // Gate Symbol Ring
      const ringGeo = new THREE.TorusGeometry(1.5, 0.1, 16, 32);
      const ringMat = new THREE.MeshStandardMaterial({
        color: gateOutput ? 0x10b981 : 0xef4444,
        emissive: gateOutput ? 0x059669 : 0xdc2626,
        emissiveIntensity: 1.0
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(0, 0, 0);
      ring.userData = {
        animate: (t: number) => {
          ring.rotation.y = t * 1.5;
        }
      };
      group.add(ring);

      // Output Terminal Q (x = 4.5, y = 0)
      const outQGeo = new THREE.BoxGeometry(1.5, 1.2, 1.2);
      const outQMat = new THREE.MeshStandardMaterial({
        color: gateOutput ? 0x10b981 : 0xef4444,
        emissive: gateOutput ? 0x059669 : 0xdc2626,
        emissiveIntensity: 1.0
      });
      const outQ = new THREE.Mesh(outQGeo, outQMat);
      outQ.position.set(4.5, 0, 0);
      group.add(outQ);

      // Laser Streams from inputs to Gate
      const laserXGeo = new THREE.CylinderGeometry(0.06, 0.06, 3.8, 8);
      laserXGeo.rotateZ(Math.PI / 2);
      const laserXMat = new THREE.MeshStandardMaterial({
        color: inputX ? 0x34d399 : 0xf87171,
        emissive: inputX ? 0x10b981 : 0xef4444,
        emissiveIntensity: 1.5
      });
      const laserX = new THREE.Mesh(laserXGeo, laserXMat);
      laserX.position.set(-2.0, 0.8, 0);
      group.add(laserX);

      if (activeGate !== 'NOT') {
        const laserYGeo = new THREE.CylinderGeometry(0.06, 0.06, 3.8, 8);
        laserYGeo.rotateZ(Math.PI / 2);
        const laserYMat = new THREE.MeshStandardMaterial({
          color: inputY ? 0x34d399 : 0xf87171,
          emissive: inputY ? 0x10b981 : 0xef4444,
          emissiveIntensity: 1.5
        });
        const laserY = new THREE.Mesh(laserYGeo, laserYMat);
        laserY.position.set(-2.0, -0.8, 0);
        group.add(laserY);
      }

      // Output laser stream to Q
      const laserOutGeo = new THREE.CylinderGeometry(0.1, 0.1, 3.4, 8);
      laserOutGeo.rotateZ(Math.PI / 2);
      const laserOutMat = new THREE.MeshStandardMaterial({
        color: gateOutput ? 0x34d399 : 0xf87171,
        emissive: gateOutput ? 0x10b981 : 0xef4444,
        emissiveIntensity: 1.8
      });
      const laserOut = new THREE.Mesh(laserOutGeo, laserOutMat);
      laserOut.position.set(2.4, 0, 0);
      group.add(laserOut);
    } else if (activeMode === 'leap_electric') {
      if (subTabMode3 === 'electricity') {
        // 3A. Electricity 3-Tier Ladder
        // 3 tiers:
        // Tier 1: 0 - 50 kWh (x = -4)
        // Tier 2: 51 - 100 kWh (x = 0)
        // Tier 3: > 100 kWh (x = 4)

        const tiers = [
          { name: 'Bậc 1 (≤ 50)', price: '1.678k', color: 0x38bdf8, active: kwhValue > 0, height: Math.min(2.5, (kwhValue / 50) * 2.5) },
          { name: 'Bậc 2 (51–100)', price: '1.734k', color: 0xf59e0b, active: kwhValue > 50, height: kwhValue > 50 ? Math.min(2.5, ((kwhValue - 50) / 50) * 2.5) : 0.1 },
          { name: 'Bậc 3 (> 100)', price: '2.014k', color: 0xef4444, active: kwhValue > 100, height: kwhValue > 100 ? Math.min(2.5, ((kwhValue - 100) / 50) * 2.5) : 0.1 }
        ];

        tiers.forEach((t, i) => {
          const posX = -4.2 + i * 4.2;

          // Glass container cylinder
          const containerGeo = new THREE.CylinderGeometry(1.2, 1.2, 3, 24);
          const containerMat = new THREE.MeshPhysicalMaterial({
            color: 0x334155,
            transmission: 0.8,
            transparent: true,
            opacity: 0.4,
            roughness: 0.1
          });
          const tube = new THREE.Mesh(containerGeo, containerMat);
          tube.position.set(posX, 0.5, 0);
          group.add(tube);

          // Fluid Fill
          const fillGeo = new THREE.CylinderGeometry(1.15, 1.15, Math.max(0.1, t.height), 24);
          const fillMat = new THREE.MeshStandardMaterial({
            color: t.color,
            emissive: t.color,
            emissiveIntensity: t.active ? 0.8 : 0.1
          });
          const fill = new THREE.Mesh(fillGeo, fillMat);
          fill.position.set(posX, -1.0 + t.height / 2, 0);
          group.add(fill);
        });
      } else {
        // 3B. Leap Year 3D Earth Globe & Orbit
        const earthGeo = new THREE.SphereGeometry(2.0, 32, 32);
        const earthMat = new THREE.MeshStandardMaterial({
          color: isLeapYear ? 0x0284c7 : 0x475569,
          emissive: isLeapYear ? 0x0369a1 : 0x1e293b,
          emissiveIntensity: 0.6,
          roughness: 0.4
        });
        const earth = new THREE.Mesh(earthGeo, earthMat);
        earth.userData = {
          animate: (t: number) => {
            earth.rotation.y = t * (isLeapYear ? 1.0 : 0.3);
          }
        };
        group.add(earth);

        // Orbital Day 366 / 365 Ring
        const orbitGeo = new THREE.TorusGeometry(3.6, 0.08, 16, 64);
        const orbitMat = new THREE.MeshStandardMaterial({
          color: isLeapYear ? 0x10b981 : 0xf59e0b,
          emissive: isLeapYear ? 0x059669 : 0xd97706,
          emissiveIntensity: 1.0
        });
        const orbit = new THREE.Mesh(orbitGeo, orbitMat);
        orbit.rotation.x = Math.PI / 2.3;
        orbit.userData = {
          animate: (t: number) => {
            orbit.rotation.z = t * 0.8;
          }
        };
        group.add(orbit);

        // Satellite Moon / Calendar node
        const moonGeo = new THREE.SphereGeometry(0.4, 16, 16);
        const moonMat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          emissive: isLeapYear ? 0x34d399 : 0xfde047,
          emissiveIntensity: 1.2
        });
        const moon = new THREE.Mesh(moonGeo, moonMat);
        moon.userData = {
          animate: (t: number) => {
            const rad = 3.6;
            moon.position.x = Math.cos(t * 1.5) * rad;
            moon.position.z = Math.sin(t * 1.5) * rad;
            moon.position.y = Math.sin(t * 1.5) * 0.8;
          }
        };
        group.add(moon);
      }
    }
  }, [activeMode, selectedPresetIndex, isConditionTrue, activeGate, inputX, inputY, gateOutput, subTabMode3, kwhValue, yearValue, isLeapYear]);

  const handleResetCamera = () => {
    if (activeMode === 'decision_tree') {
      rotRef.current = { x: 0.38, y: 0.45 };
      if (cameraRef.current) {
        cameraRef.current.position.set(0, 8.5, 17);
        cameraRef.current.lookAt(0, 0.5, 0.5);
      }
    } else if (activeMode === 'logic_gates') {
      rotRef.current = { x: 0.15, y: 0.05 };
      if (cameraRef.current) {
        cameraRef.current.position.set(0, 4.5, 14);
        cameraRef.current.lookAt(0, 0, 0);
      }
    } else {
      rotRef.current = { x: 0.28, y: 0.35 };
      if (cameraRef.current) {
        cameraRef.current.position.set(0, 6.5, 15.5);
        cameraRef.current.lookAt(0, 0.5, 0);
      }
    }
  };

  // Re-calibrate camera framing smoothly when activeMode changes
  useEffect(() => {
    handleResetCamera();
  }, [activeMode]);

  return (
    <div
      className={`rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl transition-all duration-300 flex flex-col ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : 'w-full'
      }`}
    >
      {/* 1. Header Toolbar */}
      <div className="shrink-0 z-10 flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <GitBranch className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white">
                {isEn ? 'Lesson 19 3D Simulation: If Branching & Logic Gates' : 'Mô phỏng 3D Bài 19: Rẽ nhánh if & Biểu thức lôgic'}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                Three.js WebGL
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {isEn
                ? 'Visualizing 3D decision forks, AND / OR / NOT logic gates, and leap-year / electricity billing algorithms'
                : 'Trực quan hoá sơ đồ ngã ba rẽ nhánh, cổng lôgic AND / OR / NOT và ứng dụng năm nhuận / tiền điện'}
            </p>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-950/70 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveMode('decision_tree')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeMode === 'decision_tree'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Split className="w-3.5 h-3.5" />
            <span>{isEn ? '1. Decision Fork' : '1. Ngã ba rẽ nhánh'}</span>
          </button>
          <button
            onClick={() => setActiveMode('logic_gates')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeMode === 'logic_gates'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isEn ? '2. Logic Gates (and/or/not)' : '2. Cổng Lôgic (and/or/not)'}</span>
          </button>
          <button
            onClick={() => setActiveMode('leap_electric')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeMode === 'leap_electric'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{isEn ? '3. Electricity & Leap Year' : '3. Tiền điện & Năm nhuận'}</span>
          </button>
        </div>

        {/* Viewport Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? (isEn ? 'Pause rotation' : 'Tạm dừng xoay') : (isEn ? 'Resume rotation' : 'Tiếp tục xoay')}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={handleResetCamera}
            title={isEn ? 'Reset view' : 'Đặt lại góc nhìn'}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? (isEn ? 'Exit fullscreen' : 'Thu nhỏ') : (isEn ? 'Fullscreen' : 'Toàn màn hình')}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 2. Isolated WebGL Three.js Canvas (Dedicated Unobstructed Viewport) */}
      <div className="relative w-full overflow-hidden bg-slate-950 flex-1 min-h-[300px]">
        <div
          ref={containerRef}
          className={`w-full ${isFullscreen ? 'h-full' : 'h-[340px] sm:h-[380px] md:h-[420px]'}`}
        />
        <div className="absolute top-2 left-3 pointer-events-none text-[10px] text-slate-400 font-mono flex items-center gap-1.5 bg-slate-950/70 border border-slate-800/80 px-2 py-0.5 rounded backdrop-blur">
          <span>{isEn ? 'Drag to rotate • Scroll to zoom' : 'Kéo chuột để xoay 3D • Cuộn chuột để zoom'}</span>
        </div>
      </div>

      {/* 3. Docked Controls Below Canvas (Zero Viewport Occlusion) */}
      <div className="p-3 sm:p-4 bg-slate-900/95 border-t border-slate-800 shrink-0">
        {activeMode === 'decision_tree' && (
          <div className="flex flex-col gap-2.5">
            {/* Preset Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs font-semibold text-slate-400 whitespace-nowrap mr-1">
                {isEn ? 'Textbook Examples:' : 'Ví dụ SGK:'}
              </span>
              {decisionPresets.map((preset, idx) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    setSelectedPresetIndex(idx);
                    setIsConditionTrue(preset.defaultVal);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                    selectedPresetIndex === idx
                      ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400 ring-2 ring-emerald-500/20'
                      : 'bg-slate-900/70 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {isEn ? preset.titleEn.split(':')[0] : preset.titleVi.split(':')[0]}
                </button>
              ))}
            </div>

            {/* Interactive Decision Control Box */}
            <div className="p-3 sm:p-4 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">
                    {isEn ? currentPreset.titleEn : currentPreset.titleVi}
                  </span>
                  <span className="text-[10px] font-mono bg-slate-800 text-cyan-300 px-2 py-0.5 rounded">
                    {currentPreset.sgkPage}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
                  <span className="text-slate-400">{isEn ? 'Test Condition:' : 'Điều kiện kiểm tra:'}</span>
                  <span className="font-mono font-bold text-amber-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                    {isEn ? currentPreset.conditionTextEn : currentPreset.conditionTextVi}
                  </span>
                  <span className="text-slate-400">{isEn ? '→ Current State:' : '→ Kết quả hiện tại:'}</span>
                  <span
                    className={`font-mono font-bold px-2 py-0.5 rounded ${
                      isConditionTrue ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    }`}
                  >
                    {isConditionTrue ? (isEn ? 'TRUE (Đúng)' : 'ĐÚNG (True)') : (isEn ? 'FALSE (Sai)' : 'SAI (False)')}
                  </span>
                </div>
              </div>

              {/* Toggle Condition Switch */}
              <div className="flex items-center gap-3 self-end md:self-center">
                <span className="text-xs text-slate-300 font-medium">
                  {isEn ? 'Toggle condition:' : 'Đổi giá trị điều kiện:'}
                </span>
                <button
                  onClick={() => setIsConditionTrue(!isConditionTrue)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-md ${
                    isConditionTrue
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      : 'bg-sky-600 hover:bg-sky-500 text-white'
                  }`}
                >
                  <span>
                    {isEn
                      ? `Switch to ${isConditionTrue ? 'False' : 'True'}`
                      : `Chuyển sang ${isConditionTrue ? 'Sai (False)' : 'Đúng (True)'}`}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeMode === 'logic_gates' && (
          <div className="flex flex-col gap-2.5">
            {/* Gate Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">
                {isEn ? 'Select logical operator:' : 'Chọn toán tử lôgic:'}
              </span>
              {(['AND', 'OR', 'NOT'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setActiveGate(g)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition ${
                    activeGate === g
                      ? 'bg-sky-500/30 text-sky-200 border border-sky-400'
                      : 'bg-slate-900/70 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {isEn ? `${g} operator` : `Phép toán ${g.toLowerCase()}`}
                </button>
              ))}
            </div>

            {/* Interactive Inputs & Truth Table Card */}
            <div className="p-3 sm:p-4 bg-slate-950/80 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
              {/* Input Toggles */}
              <div className="md:col-span-5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-mono">{isEn ? 'Input X:' : 'Đầu vào X:'}</span>
                  <button
                    onClick={() => setInputX(!inputX)}
                    className={`px-3 py-1 rounded font-mono font-bold text-xs transition ${
                      inputX ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50' : 'bg-rose-500/30 text-rose-300 border border-rose-500/50'
                    }`}
                  >
                    X = {inputX ? 'True' : 'False'}
                  </button>
                </div>

                {activeGate !== 'NOT' && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-mono">{isEn ? 'Input Y:' : 'Đầu vào Y:'}</span>
                    <button
                      onClick={() => setInputY(!inputY)}
                      className={`px-3 py-1 rounded font-mono font-bold text-xs transition ${
                        inputY ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50' : 'bg-rose-500/30 text-rose-300 border border-rose-500/50'
                      }`}
                    >
                      Y = {inputY ? 'True' : 'False'}
                    </button>
                  </div>
                )}
              </div>

              {/* Output Display */}
              <div className="md:col-span-7 flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono">
                <div>
                  <span className="text-slate-400">{isEn ? 'Expression Result: ' : 'Kết quả biểu thức: '}</span>
                  <span className="text-white font-bold">
                    {activeGate === 'NOT'
                      ? `not ${inputX}`
                      : `${inputX} ${activeGate.toLowerCase()} ${inputY}`}
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded font-bold text-sm ${
                    gateOutput
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}
                >
                  → {gateOutput ? 'True' : 'False'}
                </span>
              </div>
            </div>
          </div>
        )}

        {activeMode === 'leap_electric' && (
          <div className="flex flex-col gap-2.5">
            {/* Sub-tab switch */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSubTabMode3('electricity')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  subTabMode3 === 'electricity'
                    ? 'bg-amber-500/30 text-amber-200 border border-amber-400'
                    : 'bg-slate-900/70 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {isEn ? 'Task 2: Tiered Electricity Billing' : 'Nhiệm vụ 2: Tính tiền điện sinh hoạt luỹ kế'}
              </button>
              <button
                onClick={() => setSubTabMode3('leap_year')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  subTabMode3 === 'leap_year'
                    ? 'bg-sky-500/30 text-sky-200 border border-sky-400'
                    : 'bg-slate-900/70 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {isEn ? 'Application 2: Astronomical Leap Year Algorithm' : 'Vận dụng 2: Thuật toán năm nhuận thiên văn'}
              </button>
            </div>

            {/* Interactive controls */}
            {subTabMode3 === 'electricity' ? (
              <div className="p-3 sm:p-4 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
                <div className="space-y-1.5 flex-1 w-full">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">
                      {isEn ? 'Electricity consumption k (kWh):' : 'Điện năng tiêu thụ k (kWh):'}
                    </span>
                    <span className="font-mono font-bold text-amber-300 bg-slate-900 px-2 py-0.5 rounded">
                      {kwhValue} kWh
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={kwhValue}
                    onChange={(e) => setKwhValue(parseInt(e.target.value) || 0)}
                    className="w-full accent-amber-400 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-right shrink-0">
                  <div className="text-slate-400 text-[10px]">
                    {isEn ? 'Total payable bill: round(t)' : 'Tiền điện phải trả: round(t)'}
                  </div>
                  <div className="text-amber-300 font-bold text-base">
                    {electricBill.toLocaleString(isEn ? 'en-US' : 'vi-VN')} {isEn ? 'thousand VND' : 'nghìn đồng'}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 sm:p-4 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <label className="text-xs text-slate-300">{isEn ? 'Enter year n:' : 'Nhập năm n:'}</label>
                  <input
                    type="number"
                    value={yearValue}
                    onChange={(e) => setYearValue(parseInt(e.target.value) || 0)}
                    className="w-28 px-3 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-white"
                  />
                  <div className="flex gap-1">
                    {[2000, 1900, 2024, 2026].map((yr) => (
                      <button
                        key={yr}
                        onClick={() => setYearValue(yr)}
                        className="px-2 py-0.5 text-[10px] rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono"
                      >
                        {yr}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-300">{isEn ? 'Conclusion:' : 'Kết luận:'}</span>
                  <span
                    className={`px-3 py-1 rounded font-bold text-xs font-mono ${
                      isLeapYear
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    }`}
                  >
                    {isLeapYear
                      ? (isEn ? `Year ${yearValue} IS A LEAP YEAR (366 days)` : `Năm ${yearValue} LÀ NĂM NHUẬN (366 ngày)`)
                      : (isEn ? `Year ${yearValue} IS NOT A LEAP YEAR (365 days)` : `Năm ${yearValue} KHÔNG PHẢI NĂM NHUẬN (365 ngày)`)}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
