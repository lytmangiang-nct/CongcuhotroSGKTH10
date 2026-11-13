import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useBook } from '../../context/BookContext';
import {
  RotateCcw,
  Maximize2,
  Minimize2,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Play,
  Pause,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Triangle,
  Terminal,
  Cpu,
  Layers,
  HelpCircle
} from 'lucide-react';

interface IOTypePipeline3DViewerProps {
  initialMode?: 'pipeline' | 'type_lab' | 'heron_time';
}

export const IOTypePipeline3DViewer: React.FC<IOTypePipeline3DViewerProps> = ({
  initialMode = 'pipeline'
}) => {
  const { bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<'pipeline' | 'type_lab' | 'heron_time'>(initialMode);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [pipelineStep, setPipelineStep] = useState<number>(1); // 0 to 4
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [customInput, setCustomInput] = useState<string>('123');
  const [targetType, setTargetType] = useState<'int' | 'float' | 'str' | 'bool'>('int');

  // Heron 3D state
  const [sideA, setSideA] = useState<number>(3);
  const [sideB, setSideB] = useState<number>(4);
  const [sideC, setSideC] = useState<number>(5);

  // Time converter state
  const [totalSeconds, setTotalSeconds] = useState<number>(100000);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const reqIdRef = useRef<number | null>(null);
  const modeGroupRef = useRef<THREE.Group | null>(null);
  const animTimeRef = useRef<number>(0);

  // Mouse interaction
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const rotRef = useRef({ x: 0.35, y: 0.6 });

  // Type Lab Presets from SGK Trang 97 - 100
  const typePresets = [
    {
      input: '"123"',
      typeFn: 'int("123")',
      target: 'int' as const,
      status: 'valid' as const,
      resultVal: '123',
      resultType: "<class 'int'>",
      noteVi: 'Hợp lệ! Xâu chỉ chứa số nguyên được chuyển đổi trực tiếp thành số 123.',
      noteEn: 'Valid! Integer-only string is converted directly to integer 123.'
    },
    {
      input: '12.6',
      typeFn: 'int(12.6)',
      target: 'int' as const,
      status: 'valid' as const,
      resultVal: '12',
      resultType: "<class 'int'>",
      noteVi: 'Hợp lệ! int() cắt bỏ phần thập phân (.6) của số thực và lấy phần nguyên 12.',
      noteEn: 'Valid! int() truncates decimal part (.6) of float and retains integer 12.'
    },
    {
      input: '"10.35"',
      typeFn: 'int("10.35")',
      target: 'int' as const,
      status: 'error' as const,
      resultVal: 'ValueError',
      resultType: 'Exception',
      noteVi: "LỖI! int() không chuyển đổi được xâu chứa số thực trực tiếp. Cần dùng int(float('10.35')).",
      noteEn: "ERROR! int() cannot convert a string with decimal point directly. Use int(float('10.35'))."
    },
    {
      input: '"12+45"',
      typeFn: 'int("12+45")',
      target: 'int' as const,
      status: 'error' as const,
      resultVal: 'ValueError',
      resultType: 'Exception',
      noteVi: "LỖI! int() chỉ chuyển xâu ghi số trực tiếp, KHÔNG thực hiện tính toán biểu thức trong xâu!",
      noteEn: "ERROR! int() only parses numeric strings directly, it does NOT evaluate math expressions!"
    },
    {
      input: '"15.0"',
      typeFn: 'float("15.0")',
      target: 'float' as const,
      status: 'valid' as const,
      resultVal: '15.0',
      resultType: "<class 'float'>",
      noteVi: 'Hợp lệ! Chuyển xâu biểu diễn số thực thành số thực 15.0.',
      noteEn: 'Valid! Converts floating-point string representation to float 15.0.'
    },
    {
      input: '13+1',
      typeFn: 'float(13+1)',
      target: 'float' as const,
      status: 'valid' as const,
      resultVal: '14.0',
      resultType: "<class 'float'>",
      noteVi: 'Hợp lệ! Tính 13 + 1 = 14 rồi ép sang số thực thành 14.0.',
      noteEn: 'Valid! Computes 13 + 1 = 14 and casts to float 14.0.'
    },
    {
      input: '13 != 8 + 5',
      typeFn: 'type(13 != 8 + 5)',
      target: 'bool' as const,
      status: 'valid' as const,
      resultVal: 'False',
      resultType: "<class 'bool'>",
      noteVi: 'Hợp lệ! 8 + 5 = 13. Phép so sánh 13 != 13 cho kết quả False kiểu bool.',
      noteEn: 'Valid! 8 + 5 = 13. Comparison 13 != 13 yields boolean False.'
    },
    {
      input: '"15 + 20 - 7"',
      typeFn: 'type("15 + 20 - 7")',
      target: 'str' as const,
      status: 'valid' as const,
      resultVal: "'15 + 20 - 7'",
      resultType: "<class 'str'>",
      noteVi: 'Hợp lệ! Đặt trong cặp dấu ngoặc kép được Python coi là xâu kí tự nguyên bản.',
      noteEn: 'Valid! Enclosed in quotation marks, treated by Python as a literal str.'
    }
  ];

  const currentPreset = typePresets[selectedPresetIndex];

  // Pipeline Step Details
  const pipelineSteps = [
    {
      step: 1,
      titleVi: 'Bàn phím & Lệnh input()',
      titleEn: 'Keyboard & input() Command',
      descVi: 'Người dùng gõ dữ liệu từ thiết bị vào chuẩn. Lệnh input() tiếp nhận.',
      descEn: 'User types data from standard input. input() function receives it.',
      tag: 'input("Prompt string:")',
      color: '#38bdf8'
    },
    {
      step: 2,
      titleVi: 'Bộ đệm Chuỗi kí tự (str)',
      titleEn: 'String Character Buffer (str)',
      descVi: 'QUAN TRỌNG: Giá trị input() trả về LUÔN LUÔN là xâu kí tự (str), có dấu nháy bao bọc.',
      descEn: 'CRITICAL: input() ALWAYS returns a string (str), enclosed in quotes.',
      tag: "Buffer data: '123' (str)",
      color: '#ec4899'
    },
    {
      step: 3,
      titleVi: 'Lò chuyển kiểu int() / float()',
      titleEn: 'Type Casting Chamber int() / float()',
      descVi: 'Bộ vi xử lý ép kiểu chuỗi thành số nguyên hoặc số thực. Kiểm tra cú pháp cơ số 10.',
      descEn: 'Casts string to integer or float. Validates base-10 numerical syntax.',
      tag: 'm = int(...) or float(...)',
      color: '#eab308'
    },
    {
      step: 4,
      titleVi: 'Ô nhớ RAM & Biến lưu trữ',
      titleEn: 'RAM Cell & Variable Storage',
      descVi: 'Giá trị đã chuyển đổi kiểu được cất vào địa chỉ vùng nhớ định danh bởi tên biến.',
      descEn: 'Converted value is stored at memory address referenced by variable identifier.',
      tag: 'RAM Address: 0x7FFE20 [123]',
      color: '#10b981'
    },
    {
      step: 5,
      titleVi: 'Màn hình & Lệnh print()',
      titleEn: 'Display Screen & print() Command',
      descVi: 'Lệnh print() xuất dữ liệu, định dạng thông báo hoặc kết quả tính toán ra màn hình.',
      descEn: 'print() outputs values, formatted messages, or computation results to display.',
      tag: 'print("Result:", m * 2)',
      color: '#8b5cf6'
    }
  ];

  // Heron calculation helper
  const isTriangleValid = sideA + sideB > sideC && sideB + sideC > sideA && sideC + sideA > sideB;
  const semiP = (sideA + sideB + sideC) / 2;
  const heronArea = isTriangleValid
    ? Math.sqrt(Math.max(0, semiP * (semiP - sideA) * (semiP - sideB) * (semiP - sideC)))
    : 0;

  // Time conversion helper
  const days = Math.floor(totalSeconds / 86400);
  const remDay = totalSeconds % 86400;
  const hours = Math.floor(remDay / 3600);
  const remHour = remDay % 3600;
  const minutes = Math.floor(remHour / 60);
  const seconds = remHour % 60;

  // Three.js Scene Setup & Loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x070b19);

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 480;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 5.5, 18);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

    const bluePoint = new THREE.PointLight(0x38bdf8, 2, 25);
    bluePoint.position.set(-6, 3, 2);
    scene.add(bluePoint);

    const amberPoint = new THREE.PointLight(0xf59e0b, 2, 25);
    amberPoint.position.set(0, 3, 2);
    scene.add(amberPoint);

    const purplePoint = new THREE.PointLight(0xa855f7, 2, 25);
    purplePoint.position.set(6, 3, 2);
    scene.add(purplePoint);

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
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      animTimeRef.current += 0.02;
      const t = animTimeRef.current;

      if (modeGroupRef.current) {
        // Smooth camera damping or auto rotation
        if (!isDraggingRef.current && isPlaying) {
          rotRef.current.y += 0.002;
        }
        modeGroupRef.current.rotation.y = rotRef.current.y;
        modeGroupRef.current.rotation.x = rotRef.current.x;

        // Animate particles or crystals inside modeGroup
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

  // Build Mode 3D Geometries whenever activeMode or relevant states change
  useEffect(() => {
    const group = modeGroupRef.current;
    if (!group) return;

    // Clear previous objects
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
    }

    if (activeMode === 'pipeline') {
      // 1. Build Pipeline Mode
      // Stations:
      // Station 0: Keyboard (x = -7)
      // Station 1: String Buffer Capsule (x = -3.5)
      // Station 2: Type Transformer Chamber (x = 0)
      // Station 3: Memory Cell (x = 3.5)
      // Station 4: Monitor Screen (x = 7)

      // Fiber optic laser rail
      const railGeo = new THREE.CylinderGeometry(0.08, 0.08, 15, 16);
      railGeo.rotateZ(Math.PI / 2);
      const railMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.8,
        roughness: 0.2
      });
      const railMesh = new THREE.Mesh(railGeo, railMat);
      railMesh.position.set(0, 0, 0);
      group.add(railMesh);

      // Station 0: 3D Cyber Keyboard
      const kbGroup = new THREE.Group();
      kbGroup.position.set(-6.5, 0, 0);
      const kbBaseGeo = new THREE.BoxGeometry(2.4, 0.4, 2);
      const kbBaseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.2 });
      const kbBase = new THREE.Mesh(kbBaseGeo, kbBaseMat);
      kbGroup.add(kbBase);

      // Keycaps
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 4; c++) {
          const keyGeo = new THREE.BoxGeometry(0.35, 0.2, 0.35);
          const isSpecial = r === 1 && c === 2;
          const keyMat = new THREE.MeshStandardMaterial({
            color: isSpecial ? 0x38bdf8 : 0x475569,
            emissive: isSpecial ? 0x0284c7 : 0x0f172a,
            emissiveIntensity: isSpecial ? 0.9 : 0.1
          });
          const keyMesh = new THREE.Mesh(keyGeo, keyMat);
          keyMesh.position.set(-0.6 + c * 0.45, 0.25, -0.45 + r * 0.45);
          if (isSpecial) {
            keyMesh.userData = {
              animate: (t: number) => {
                keyMesh.position.y = 0.25 + Math.sin(t * 6) * 0.06;
              }
            };
          }
          kbGroup.add(keyMesh);
        }
      }
      group.add(kbGroup);

      // Station 1: String Buffer Capsule (Hộp chuỗi str)
      const capsuleGroup = new THREE.Group();
      capsuleGroup.position.set(-3.2, 0, 0);
      const capGeo = new THREE.CapsuleGeometry(0.65, 0.9, 16, 16);
      const capMat = new THREE.MeshPhysicalMaterial({
        color: 0xec4899,
        transmission: 0.75,
        opacity: 0.9,
        transparent: true,
        roughness: 0.1,
        ior: 1.5,
        emissive: 0xbe185d,
        emissiveIntensity: 0.3
      });
      const capMesh = new THREE.Mesh(capGeo, capMat);
      capsuleGroup.add(capMesh);

      // Floating quotes indicator inside capsule
      const innerBallGeo = new THREE.DodecahedronGeometry(0.35, 0);
      const innerBallMat = new THREE.MeshStandardMaterial({
        color: 0xf472b6,
        emissive: 0xdb2777,
        emissiveIntensity: 0.8,
        wireframe: true
      });
      const innerBall = new THREE.Mesh(innerBallGeo, innerBallMat);
      innerBall.userData = {
        animate: (t: number) => {
          innerBall.rotation.y = t * 1.5;
          innerBall.rotation.x = t * 0.8;
        }
      };
      capsuleGroup.add(innerBall);
      group.add(capsuleGroup);

      // Station 2: Type Transformer Chamber (Lò Luyện Ép Kiểu int/float)
      const chamberGroup = new THREE.Group();
      chamberGroup.position.set(0.1, 0, 0);
      const chamberRingGeo = new THREE.TorusGeometry(1.2, 0.12, 16, 32);
      const chamberRingMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        emissive: 0xd97706,
        emissiveIntensity: 0.7,
        metalness: 0.9
      });
      const ring1 = new THREE.Mesh(chamberRingGeo, chamberRingMat);
      ring1.userData = {
        animate: (t: number) => {
          ring1.rotation.z = t * 1.2;
          ring1.rotation.y = t * 0.8;
        }
      };
      chamberGroup.add(ring1);

      const ring2 = new THREE.Mesh(chamberRingGeo, chamberRingMat);
      ring2.rotation.x = Math.PI / 2;
      ring2.userData = {
        animate: (t: number) => {
          ring2.rotation.x = t * 1.0;
          ring2.rotation.z = -t * 0.7;
        }
      };
      chamberGroup.add(ring2);

      // Central Energy Core
      const coreGeo = new THREE.OctahedronGeometry(0.55, 0);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0xfef08a,
        emissive: 0xeab308,
        emissiveIntensity: 1.0
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      core.userData = {
        animate: (t: number) => {
          core.rotation.y = -t * 2;
          const s = 1 + Math.sin(t * 4) * 0.15;
          core.scale.set(s, s, s);
        }
      };
      chamberGroup.add(core);
      group.add(chamberGroup);

      // Station 3: Memory Cell (Ô nhớ RAM)
      const memGroup = new THREE.Group();
      memGroup.position.set(3.4, 0, 0);
      const memBoxGeo = new THREE.BoxGeometry(1.4, 1.4, 1.4);
      const memBoxMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x059669,
        emissiveIntensity: 0.4,
        roughness: 0.3,
        metalness: 0.5,
        wireframe: true
      });
      const memBox = new THREE.Mesh(memBoxGeo, memBoxMat);
      memGroup.add(memBox);

      const memCoreGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);
      const memCoreMat = new THREE.MeshStandardMaterial({
        color: 0x34d399,
        emissive: 0x10b981,
        emissiveIntensity: 0.8
      });
      const memCore = new THREE.Mesh(memCoreGeo, memCoreMat);
      memGroup.add(memCore);
      group.add(memGroup);

      // Station 4: Holographic Output Screen (Màn hình print())
      const monGroup = new THREE.Group();
      monGroup.position.set(6.6, 0, 0);
      const screenGeo = new THREE.BoxGeometry(1.8, 1.2, 0.1);
      const screenMat = new THREE.MeshPhysicalMaterial({
        color: 0x8b5cf6,
        emissive: 0x6d28d9,
        emissiveIntensity: 0.7,
        roughness: 0.2
      });
      const screenMesh = new THREE.Mesh(screenGeo, screenMat);
      monGroup.add(screenMesh);

      // Stand
      const standGeo = new THREE.CylinderGeometry(0.08, 0.12, 1.2, 16);
      const standMat = new THREE.MeshStandardMaterial({ color: 0x334155 });
      const standMesh = new THREE.Mesh(standGeo, standMat);
      standMesh.position.y = -0.9;
      monGroup.add(standMesh);
      group.add(monGroup);

      // Active Traveling Packet
      const packetGeo = new THREE.SphereGeometry(0.32, 16, 16);
      const packetMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 1.2
      });
      const packetMesh = new THREE.Mesh(packetGeo, packetMat);
      packetMesh.userData = {
        animate: (t: number) => {
          // Loop packet from x = -6.5 to x = 6.6
          const p = (t * 0.8) % 5; // 0 to 5
          const posX = -6.5 + p * 2.62;
          packetMesh.position.x = posX;
          packetMesh.position.y = 0.2 + Math.sin(t * 8) * 0.1;

          // Color change based on stage:
          // stage 1: blue (raw)
          // stage 2: pink (str)
          // stage 3: yellow (casting)
          // stage 4: green (ram)
          // stage 5: purple (screen)
          if (posX < -4.5) {
            packetMat.color.setHex(0x38bdf8);
            packetMat.emissive.setHex(0x0284c7);
          } else if (posX < -1.5) {
            packetMat.color.setHex(0xec4899);
            packetMat.emissive.setHex(0xbe185d);
          } else if (posX < 1.8) {
            packetMat.color.setHex(0xfacc15);
            packetMat.emissive.setHex(0xca8a04);
          } else if (posX < 5.0) {
            packetMat.color.setHex(0x10b981);
            packetMat.emissive.setHex(0x059669);
          } else {
            packetMat.color.setHex(0x8b5cf6);
            packetMat.emissive.setHex(0x6d28d9);
          }
        }
      };
      group.add(packetMesh);
    } else if (activeMode === 'type_lab') {
      // 2. Type Lab: Crystal Transformer & Error Reactor
      const isError = currentPreset.status === 'error';

      // Reactor pedestal
      const pedGeo = new THREE.CylinderGeometry(3.5, 4, 0.6, 32);
      const pedMat = new THREE.MeshStandardMaterial({
        color: isError ? 0x450a0a : 0x0f172a,
        metalness: 0.8,
        roughness: 0.3
      });
      const pedestal = new THREE.Mesh(pedGeo, pedMat);
      pedestal.position.y = -1.8;
      group.add(pedestal);

      // Warning laser grid or safe containment ring
      const ringGeo = new THREE.TorusGeometry(3.2, 0.08, 16, 64);
      const ringMat = new THREE.MeshStandardMaterial({
        color: isError ? 0xef4444 : 0x10b981,
        emissive: isError ? 0xdc2626 : 0x059669,
        emissiveIntensity: 1.0
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -1.4;
      group.add(ring);

      // Center Crystal
      const crystalGeo = new THREE.OctahedronGeometry(1.8, 0);
      const crystalMat = new THREE.MeshPhysicalMaterial({
        color: isError ? 0xef4444 : 0x06b6d4,
        emissive: isError ? 0x991b1b : 0x0891b2,
        emissiveIntensity: isError ? 1.4 : 0.8,
        transmission: 0.6,
        opacity: 0.85,
        transparent: true,
        roughness: 0.1,
        metalness: 0.1
      });
      const crystal = new THREE.Mesh(crystalGeo, crystalMat);
      crystal.position.y = 0.5;
      crystal.userData = {
        animate: (t: number) => {
          crystal.rotation.y = t * (isError ? 3.0 : 0.8);
          crystal.rotation.x = isError ? Math.sin(t * 12) * 0.2 : t * 0.3;
          if (isError) {
            // Pulse rapidly
            const s = 1.0 + Math.sin(t * 20) * 0.18;
            crystal.scale.set(s, s, s);
          } else {
            crystal.scale.set(1, 1, 1);
          }
        }
      };
      group.add(crystal);

      // 4 orbiting satellite prisms representing (int, float, str, bool)
      const types = [
        { name: 'int', color: 0x3b82f6, offset: 0 },
        { name: 'float', color: 0x10b981, offset: Math.PI / 2 },
        { name: 'str', color: 0xec4899, offset: Math.PI },
        { name: 'bool', color: 0xf59e0b, offset: (3 * Math.PI) / 2 }
      ];

      types.forEach((item) => {
        const satGeo = new THREE.IcosahedronGeometry(0.4, 0);
        const satMat = new THREE.MeshStandardMaterial({
          color: item.color,
          emissive: item.color,
          emissiveIntensity: 0.8
        });
        const satMesh = new THREE.Mesh(satGeo, satMat);
        satMesh.userData = {
          animate: (t: number) => {
            const rad = 3.4;
            const angle = t * 0.7 + item.offset;
            satMesh.position.x = Math.cos(angle) * rad;
            satMesh.position.z = Math.sin(angle) * rad;
            satMesh.position.y = 0.5 + Math.sin(t * 2 + item.offset) * 0.5;
            satMesh.rotation.y = t * 2;
          }
        };
        group.add(satMesh);
      });

      // Sparks or warning shield in error mode
      if (isError) {
        const shieldGeo = new THREE.SphereGeometry(2.6, 24, 24);
        const shieldMat = new THREE.MeshBasicMaterial({
          color: 0xff0000,
          wireframe: true,
          transparent: true,
          opacity: 0.4
        });
        const shield = new THREE.Mesh(shieldGeo, shieldMat);
        shield.position.y = 0.5;
        shield.userData = {
          animate: (t: number) => {
            shield.rotation.y = -t * 2;
            shield.rotation.z = t * 1.5;
          }
        };
        group.add(shield);
      }
    } else if (activeMode === 'heron_time') {
      // 3. Heron's Triangle & Time Converter 3D Lab
      // Left side: 3D Triangle with vertices A, B, C (x = -3.5)
      // Right side: 3D Chronometer Clock Rings (x = 4.0)

      const triangleGroup = new THREE.Group();
      triangleGroup.position.set(-3.5, 0, 0);

      if (isTriangleValid) {
        // Construct 2D/3D triangle vertices from sides a, b, c
        // A is at (0, 0), B is at (c, 0)
        // C is at (cosA * b, sinA * b)
        // by law of cosines: cosA = (b^2 + c^2 - a^2) / (2*b*c)
        const cosA = (sideB * sideB + sideC * sideC - sideA * sideA) / (2 * sideB * sideC);
        const sinA = Math.sqrt(Math.max(0, 1 - cosA * cosA));
        const scale = 0.65;

        // Centering
        const pA = new THREE.Vector3(-1.8, -1.2, 0);
        const pB = new THREE.Vector3(-1.8 + sideC * scale, -1.2, 0);
        const pC = new THREE.Vector3(-1.8 + sideB * cosA * scale, -1.2 + sideB * sinA * scale, 0);

        // Triangle Mesh
        const triGeo = new THREE.BufferGeometry();
        const verts = new Float32Array([
          pA.x, pA.y, pA.z,
          pB.x, pB.y, pB.z,
          pC.x, pC.y, pC.z
        ]);
        triGeo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
        triGeo.computeVertexNormals();

        const triMat = new THREE.MeshStandardMaterial({
          color: 0x06b6d4,
          emissive: 0x0891b2,
          emissiveIntensity: 0.5,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.85
        });
        const triMesh = new THREE.Mesh(triGeo, triMat);
        triangleGroup.add(triMesh);

        // Edge wire tubes
        const edges = [
          [pA, pB, 0x38bdf8],
          [pB, pC, 0x10b981],
          [pC, pA, 0xf59e0b]
        ] as const;

        edges.forEach(([v1, v2, color]) => {
          const path = new THREE.LineCurve3(v1, v2);
          const tubeGeo = new THREE.TubeGeometry(path, 10, 0.06, 8, false);
          const tubeMat = new THREE.MeshStandardMaterial({
            color,
            emissive: color,
            emissiveIntensity: 0.7
          });
          const tube = new THREE.Mesh(tubeGeo, tubeMat);
          triangleGroup.add(tube);
        });

        // Vertex spheres
        [pA, pB, pC].forEach((pos, idx) => {
          const vGeo = new THREE.SphereGeometry(0.18, 16, 16);
          const vMat = new THREE.MeshStandardMaterial({
            color: idx === 0 ? 0xffffff : idx === 1 ? 0x38bdf8 : 0xec4899,
            emissive: 0xffffff,
            emissiveIntensity: 0.5
          });
          const vMesh = new THREE.Mesh(vGeo, vMat);
          vMesh.position.copy(pos);
          triangleGroup.add(vMesh);
        });
      } else {
        // Invalid triangle warning sign
        const warnGeo = new THREE.TetrahedronGeometry(1.2, 0);
        const warnMat = new THREE.MeshStandardMaterial({
          color: 0xef4444,
          emissive: 0xdc2626,
          emissiveIntensity: 1.0,
          wireframe: true
        });
        const warnMesh = new THREE.Mesh(warnGeo, warnMat);
        warnMesh.userData = {
          animate: (t: number) => {
            warnMesh.rotation.y = t * 2;
          }
        };
        triangleGroup.add(warnMesh);
      }
      group.add(triangleGroup);

      // Right Side: 3D Chronometer Orbiting Rings (Time Converter)
      const clockGroup = new THREE.Group();
      clockGroup.position.set(3.8, 0, 0);

      // Days Outer Ring (86400s)
      const dayRingGeo = new THREE.TorusGeometry(2.4, 0.08, 16, 64);
      const dayRingMat = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        emissive: 0x1d4ed8,
        emissiveIntensity: 0.7
      });
      const dayRing = new THREE.Mesh(dayRingGeo, dayRingMat);
      dayRing.userData = {
        animate: (t: number) => {
          dayRing.rotation.z = t * 0.15;
          dayRing.rotation.y = t * 0.1;
        }
      };
      clockGroup.add(dayRing);

      // Hours Ring (3600s)
      const hrRingGeo = new THREE.TorusGeometry(1.8, 0.07, 16, 48);
      const hrRingMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x059669,
        emissiveIntensity: 0.7
      });
      const hrRing = new THREE.Mesh(hrRingGeo, hrRingMat);
      hrRing.userData = {
        animate: (t: number) => {
          hrRing.rotation.x = t * 0.3;
          hrRing.rotation.y = -t * 0.2;
        }
      };
      clockGroup.add(hrRing);

      // Minutes Ring (60s)
      const minRingGeo = new THREE.TorusGeometry(1.2, 0.06, 16, 32);
      const minRingMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        emissive: 0xd97706,
        emissiveIntensity: 0.8
      });
      const minRing = new THREE.Mesh(minRingGeo, minRingMat);
      minRing.userData = {
        animate: (t: number) => {
          minRing.rotation.y = t * 0.7;
          minRing.rotation.z = -t * 0.5;
        }
      };
      clockGroup.add(minRing);

      // Central Seconds Pendulum Core
      const secCoreGeo = new THREE.SphereGeometry(0.5, 16, 16);
      const secCoreMat = new THREE.MeshStandardMaterial({
        color: 0xec4899,
        emissive: 0xdb2777,
        emissiveIntensity: 1.0
      });
      const secCore = new THREE.Mesh(secCoreGeo, secCoreMat);
      secCore.userData = {
        animate: (t: number) => {
          const s = 1 + Math.sin(t * 10) * 0.15;
          secCore.scale.set(s, s, s);
        }
      };
      clockGroup.add(secCore);
      group.add(clockGroup);
    }
  }, [activeMode, selectedPresetIndex, sideA, sideB, sideC, totalSeconds, isTriangleValid]);

  const handleResetCamera = () => {
    rotRef.current = { x: 0.35, y: 0.6 };
    if (cameraRef.current) {
      if (activeMode === 'pipeline') {
        cameraRef.current.position.set(0, 5.5, 18);
      } else if (activeMode === 'type_lab') {
        cameraRef.current.position.set(0, 4.5, 15);
      } else {
        cameraRef.current.position.set(0, 5, 16);
      }
      cameraRef.current.lookAt(0, 0, 0);
    }
  };

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'w-full h-[620px]'
      }`}
    >
      {/* 1. Header Toolbar */}
      <div className="absolute top-0 inset-x-0 z-10 flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Cpu className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white">
                {isEn ? 'Lesson 18 3D Simulation: Input/Output & Type Casting' : 'Mô phỏng 3D Bài 18: Các lệnh vào ra & Ép kiểu'}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                WebGL Three.js
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {isEn ? 'Explore I/O pipeline, type casting chamber, and ValueError detection radar' : 'Khám phá đường ống I/O, lò chuyển kiểu dữ liệu và radar phát hiện lỗi ValueError'}
            </p>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-950/70 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveMode('pipeline')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeMode === 'pipeline'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isEn ? '1. I/O Pipeline' : '1. Đường ống I/O'}</span>
          </button>
          <button
            onClick={() => setActiveMode('type_lab')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeMode === 'type_lab'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{isEn ? '2. Type Casting & Error Radar' : '2. Máy ép kiểu & Báo lỗi'}</span>
          </button>
          <button
            onClick={() => setActiveMode('heron_time')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeMode === 'heron_time'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Triangle className="w-3.5 h-3.5" />
            <span>{isEn ? '3. Heron Triangle & Seconds Converter' : '3. Tam giác Heron & Đổi giây'}</span>
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

      {/* 2. Isolated WebGL Three.js Canvas Container (Crucial: Empty div to prevent removeChild crash) */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />

      {/* 3. Interactive Floating Overlays based on Active Mode */}
      {activeMode === 'pipeline' && (
        <div className="absolute bottom-4 inset-x-4 z-10 flex flex-col gap-2">
          {/* Station Pipeline Stages */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {pipelineSteps.map((s) => (
              <div
                key={s.step}
                onClick={() => setPipelineStep(s.step)}
                className={`cursor-pointer p-2.5 rounded-xl border backdrop-blur-md transition-all ${
                  pipelineStep === s.step
                    ? 'bg-slate-900/90 border-cyan-500 ring-2 ring-cyan-500/20 shadow-lg'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-slate-300">
                    {isEn ? `Station ${s.step}` : `Trạm ${s.step}`}
                  </span>
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                </div>
                <div className="text-xs font-semibold text-white truncate mb-1">
                  {isEn ? s.titleEn : s.titleVi}
                </div>
                <div className="text-[10px] text-slate-400 line-clamp-2">
                  {isEn ? s.descEn : s.descVi}
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Selected Step Banner */}
          <div className="p-3 bg-slate-900/85 backdrop-blur-md rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-200">
                  {isEn ? pipelineSteps[pipelineStep - 1].titleEn : pipelineSteps[pipelineStep - 1].titleVi}:
                </span>{' '}
                <span className="text-xs text-slate-300">
                  {isEn ? pipelineSteps[pipelineStep - 1].descEn : pipelineSteps[pipelineStep - 1].descVi}
                </span>
                <div className="mt-0.5 font-mono text-[11px] text-cyan-300 font-bold">
                  {isEn ? 'Equivalent Python Syntax: ' : 'Cú pháp Python tương ứng: '}{pipelineSteps[pipelineStep - 1].tag}
                </div>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400">
              <span>{isEn ? 'Drag mouse to rotate 360°' : 'Chuột kéo để xoay 360°'}</span>
            </div>
          </div>
        </div>
      )}

      {activeMode === 'type_lab' && (
        <div className="absolute bottom-4 inset-x-4 z-10 flex flex-col gap-2">
          {/* Preset Buttons from SGK */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-semibold text-slate-400 whitespace-nowrap mr-1">
              {isEn ? 'Textbook Examples:' : 'Ví dụ SGK:'}
            </span>
            {typePresets.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPresetIndex(idx)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                  selectedPresetIndex === idx
                    ? item.status === 'error'
                      ? 'bg-rose-500/30 text-rose-300 border border-rose-500 ring-2 ring-rose-500/20'
                      : 'bg-cyan-500/30 text-cyan-200 border border-cyan-400 ring-2 ring-cyan-500/20'
                    : 'bg-slate-900/70 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {item.typeFn}
              </button>
            ))}
          </div>

          {/* Test Status Banner */}
          <div
            className={`p-3.5 rounded-xl border backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-3 ${
              currentPreset.status === 'error'
                ? 'bg-rose-950/70 border-rose-500/50'
                : 'bg-slate-900/85 border-slate-800'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-lg mt-0.5 ${
                  currentPreset.status === 'error'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                {currentPreset.status === 'error' ? (
                  <AlertTriangle className="w-5 h-5 animate-bounce" />
                ) : (
                  <CheckCircle2 className="w-5 h-5" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-white">
                    {currentPreset.typeFn}
                  </span>
                  <span className="text-xs text-slate-400">→</span>
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                      currentPreset.status === 'error'
                        ? 'bg-rose-500/30 text-rose-300'
                        : 'bg-emerald-500/30 text-emerald-300'
                    }`}
                  >
                    {currentPreset.resultVal}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {currentPreset.resultType}
                  </span>
                </div>
                <p
                  className={`text-xs mt-1 ${
                    currentPreset.status === 'error' ? 'text-rose-200 font-medium' : 'text-slate-300'
                  }`}
                >
                  {isEn ? currentPreset.noteEn : currentPreset.noteVi}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-center">
              <span className="text-[11px] px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 font-mono">
                {isEn ? 'Section 2 - Textbook Pages 98–99' : 'Mục 2 - SGK Trang 98–99'}
              </span>
            </div>
          </div>
        </div>
      )}

      {activeMode === 'heron_time' && (
        <div className="absolute bottom-4 inset-x-4 z-10 grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Left Panel: Heron Triangle Controls */}
          <div className="p-3.5 bg-slate-900/85 backdrop-blur-md rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Triangle className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-white">
                  {isEn ? 'Application 2: Heron Triangle Area' : 'Vận dụng 2: Công thức Heron Tam Giác'}
                </span>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                  isTriangleValid
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}
              >
                {isTriangleValid
                  ? (isEn ? 'Triangle Inequality VALID' : 'BĐT Tam giác HỢP LỆ')
                  : (isEn ? 'NOT a valid triangle' : 'KHÔNG tạo thành tam giác')}
              </span>
            </div>

            {/* Sliders for a, b, c */}
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div>
                <label className="text-[10px] text-slate-400">{isEn ? 'Side a:' : 'Cạnh a:'} {sideA}</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={sideA}
                  onChange={(e) => setSideA(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400">{isEn ? 'Side b:' : 'Cạnh b:'} {sideB}</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={sideB}
                  onChange={(e) => setSideB(parseFloat(e.target.value))}
                  className="w-full accent-emerald-400 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400">{isEn ? 'Side c:' : 'Cạnh c:'} {sideC}</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={sideC}
                  onChange={(e) => setSideC(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Computed Output */}
            <div className="flex items-center justify-between text-xs font-mono bg-slate-950/70 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400">
                {isEn ? 'Perimeter P = ' : 'Chu vi C = '}<strong className="text-cyan-300">{(sideA + sideB + sideC).toFixed(1)}</strong>, p ={' '}
                <strong className="text-emerald-300">{semiP.toFixed(2)}</strong>
              </span>
              <span className="text-slate-300">
                {isEn ? 'Area S = ' : 'Diện tích S = '}{' '}
                <strong className="text-amber-300">{isTriangleValid ? heronArea.toFixed(2) : '---'}</strong>
              </span>
            </div>
          </div>

          {/* Right Panel: Time Converter Controls */}
          <div className="p-3.5 bg-slate-900/85 backdrop-blur-md rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold text-white">
                  {isEn ? 'Application 1: Convert Seconds (ss) to Days/Hours/Mins/Secs' : 'Vận dụng 1: Đổi giây ss sang Ngày / Giờ / Phút / Giây'}
                </span>
              </div>
              <span className="text-[10px] font-mono text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded border border-purple-500/30">
                {isEn ? 'Operators // and %' : 'Phép toán // và %'}
              </span>
            </div>

            {/* Quick Presets or Slider */}
            <div className="flex items-center gap-2 mb-2">
              <input
                type="number"
                min="0"
                max="10000000"
                value={totalSeconds}
                onChange={(e) => setTotalSeconds(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-28 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs font-mono text-white"
              />
              <span className="text-xs text-slate-400">{isEn ? 'seconds (ss)' : 'giây (ss)'}</span>
              <div className="flex gap-1 ml-auto">
                <button
                  onClick={() => setTotalSeconds(3665)}
                  className="px-2 py-0.5 rounded text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  3665s
                </button>
                <button
                  onClick={() => setTotalSeconds(100000)}
                  className="px-2 py-0.5 rounded text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  100,000s
                </button>
                <button
                  onClick={() => setTotalSeconds(86400)}
                  className="px-2 py-0.5 rounded text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  {isEn ? '1 day' : '1 ngày'}
                </button>
              </div>
            </div>

            {/* Results decomposition */}
            <div className="grid grid-cols-4 gap-1.5 text-center font-mono">
              <div className="p-1.5 bg-blue-500/10 border border-blue-500/30 rounded">
                <div className="text-[10px] text-blue-300">{isEn ? 'Days (// 86400)' : 'Ngày (// 86400)'}</div>
                <div className="text-sm font-bold text-blue-200">{days}</div>
              </div>
              <div className="p-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded">
                <div className="text-[10px] text-emerald-300">{isEn ? 'Hours (// 3600)' : 'Giờ (// 3600)'}</div>
                <div className="text-sm font-bold text-emerald-200">{hours}</div>
              </div>
              <div className="p-1.5 bg-amber-500/10 border border-amber-500/30 rounded">
                <div className="text-[10px] text-amber-300">{isEn ? 'Mins (// 60)' : 'Phút (// 60)'}</div>
                <div className="text-sm font-bold text-amber-200">{minutes}</div>
              </div>
              <div className="p-1.5 bg-pink-500/10 border border-pink-500/30 rounded">
                <div className="text-[10px] text-pink-300">{isEn ? 'Secs rem (% 60)' : 'Giây còn (% 60)'}</div>
                <div className="text-sm font-bold text-pink-200">{seconds}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
