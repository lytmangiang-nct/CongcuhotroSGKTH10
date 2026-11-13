import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useBook } from '../../context/BookContext';
import {
  RotateCcw,
  Maximize2,
  Minimize2,
  Box,
  Layers,
  ShieldAlert,
  Repeat,
  Cpu,
  Sparkles,
  Info,
  CheckCircle2,
  XCircle,
  Play
} from 'lucide-react';

interface VariableMemory3DViewerProps {
  initialMode?: 'memory' | 'operators' | 'keywords' | 'swap';
}

export const VariableMemory3DViewer: React.FC<VariableMemory3DViewerProps> = ({
  initialMode = 'memory'
}) => {
  const { bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<'memory' | 'operators' | 'keywords' | 'swap'>(initialMode);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframe, setWireframe] = useState(false);

  // Interactive states for 3D modes
  const [selectedVarIndex, setSelectedVarIndex] = useState<number>(0);
  const [testIdentifier, setTestIdentifier] = useState<string>('_name');
  const [scannerResult, setScannerResult] = useState<{ valid: boolean; reasonVi: string; reasonEn: string }>({
    valid: true,
    reasonVi: 'Hợp lệ! Bắt đầu bằng dấu gạch dưới và chỉ chứa chữ cái.',
    reasonEn: 'Valid! Begins with an underscore and contains only letters.'
  });
  const [swapState, setSwapState] = useState<{ x: number; y: number; swapped: boolean }>({
    x: 10,
    y: 7,
    swapped: false
  });

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const reqIdRef = useRef<number | null>(null);
  const modeGroupRef = useRef<THREE.Group | null>(null);
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const rotRef = useRef({ x: 0.35, y: 0.6 });

  // Mode 0: Memory Cells
  const memoryCells = [
    { name: 'n', type: 'int', val: '5', addr: '0x7FFE20', color: 0x3b82f6 },
    { name: 'x', type: 'float', val: '104.0', addr: '0x7FFE28', color: 0x10b981 },
    { name: 'y', type: 'int', val: '99', addr: '0x7FFE30', color: 0xf59e0b },
    { name: 'ten', type: 'str', val: '"Hoài Nam"', addr: '0x7FFE38', color: 0xec4899 },
    { name: 'R', type: 'float', val: '4.5', addr: '0x7FFE40', color: 0x8b5cf6 },
    { name: 'pi', type: 'float', val: '3.14', addr: '0x7FFE48', color: 0x06b6d4 }
  ];

  // Identifiers to test in Mode 2
  const sampleIdentifiers = [
    { id: '_name', valid: true, reasonVi: 'Hợp lệ: Bắt đầu bằng dấu gạch dưới và chứa chữ cái.', reasonEn: 'Valid: Starts with an underscore and contains letters.' },
    { id: '12abc', valid: false, reasonVi: 'Lỗi: Tên biến không được phép bắt đầu bằng chữ số (0-9).', reasonEn: 'SyntaxError: Variable name cannot start with a digit (0-9).' },
    { id: 'global', valid: false, reasonVi: 'Lỗi: Trùng với từ khoá "global" được Python dành riêng.', reasonEn: 'SyntaxError: Conflicts with Python reserved keyword "global".' },
    { id: 'xyzABC', valid: true, reasonVi: 'Hợp lệ: Chỉ gồm chữ cái, phân biệt chữ hoa và chữ thường.', reasonEn: 'Valid: Letters only, case-sensitive.' },
    { id: 'My country', valid: false, reasonVi: 'Lỗi: Tên biến không được chứa dấu cách (khoảng trắng).', reasonEn: 'SyntaxError: Variable name cannot contain spaces.' },
    { id: 'm123&b', valid: false, reasonVi: 'Lỗi: Tên biến không được chứa ký tự đặc biệt như "&".', reasonEn: 'SyntaxError: Variable name cannot contain special symbol "&".' },
    { id: 'true', valid: true, reasonVi: 'Hợp lệ: Python phân biệt hoa thường ("True" mới là từ khoá, "true" hợp lệ).', reasonEn: 'Valid: Python is case-sensitive ("True" is a keyword, lowercase "true" is valid).' },
    { id: '_if', valid: true, reasonVi: 'Hợp lệ: Bắt đầu bằng gạch dưới, không trùng chính xác với từ khoá "if".', reasonEn: 'Valid: Starts with underscore, not identical to reserved keyword "if".' }
  ];

  const handleTestIdentifier = (item: { id: string; valid: boolean; reasonVi: string; reasonEn: string }) => {
    setTestIdentifier(item.id);
    setScannerResult({ valid: item.valid, reasonVi: item.reasonVi, reasonEn: item.reasonEn });
  };

  const handleToggleSwap = () => {
    setSwapState((prev) => ({
      x: prev.y,
      y: prev.x,
      swapped: !prev.swapped
    }));
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x070b19);

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 480;

    // 2. Camera: Position adjusted per mode to prevent clipping
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    if (activeMode === 'memory') {
      camera.position.set(0, 5.5, 19);
    } else if (activeMode === 'operators') {
      camera.position.set(0, 5, 18);
    } else if (activeMode === 'keywords') {
      camera.position.set(0, 7.5, 18);
    } else {
      camera.position.set(0, 4.5, 16);
    }
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x60a5fa, 2.0);
    dirLight1.position.set(10, 20, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf472b6, 1.2);
    dirLight2.position.set(-10, -10, -10);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x38bdf8, 3, 25);
    pointLight.position.set(0, 4, 0);
    scene.add(pointLight);

    // 5. Grid plane floor
    const gridHelper = new THREE.GridHelper(24, 24, 0x38bdf8, 0x1e293b);
    gridHelper.position.y = -3;
    scene.add(gridHelper);

    // 6. Build Mode Content
    const modeGroup = new THREE.Group();
    modeGroupRef.current = modeGroup;
    scene.add(modeGroup);

    buildCurrentModeScene(modeGroup, activeMode, wireframe, selectedVarIndex, swapState);

    // 7. Mouse Orbit interaction
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - prevMouseRef.current.x;
      const dy = e.clientY - prevMouseRef.current.y;
      rotRef.current.y += dx * 0.008;
      rotRef.current.x += dy * 0.008;
      rotRef.current.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 3, rotRef.current.x));
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch Support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prevMouseRef.current.x;
      const dy = e.touches[0].clientY - prevMouseRef.current.y;
      rotRef.current.y += dx * 0.008;
      rotRef.current.x += dy * 0.008;
      prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (newW > 0 && newH > 0) {
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      }
    });
    resizeObserver.observe(container);

    // 8. Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (autoRotate && !isDraggingRef.current) {
        rotRef.current.y += delta * 0.35;
      }

      if (modeGroupRef.current) {
        modeGroupRef.current.rotation.x = rotRef.current.x;
        modeGroupRef.current.rotation.y = rotRef.current.y;

        // Custom pulsing animation per mode
        const time = clock.getElapsedTime();
        const pulseMesh = modeGroupRef.current.getObjectByName('pulseBeacon');
        if (pulseMesh) {
          const s = 1 + Math.sin(time * 3) * 0.15;
          pulseMesh.scale.set(s, s, s);
        }

        const dataParticles = modeGroupRef.current.getObjectByName('dataParticles') as THREE.Points;
        if (dataParticles) {
          dataParticles.rotation.y += delta * 0.5;
        }

        const swapCube1 = modeGroupRef.current.getObjectByName('swapCubeX');
        const swapCube2 = modeGroupRef.current.getObjectByName('swapCubeY');
        if (swapCube1 && swapCube2) {
          swapCube1.rotation.y += delta * 0.8;
          swapCube2.rotation.y += delta * 0.8;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      resizeObserver.disconnect();
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      if (container && renderer.domElement && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activeMode, wireframe, selectedVarIndex, swapState, autoRotate]);

  // Procedural Builder for 4 Modes
  const buildCurrentModeScene = (
    group: THREE.Group,
    mode: 'memory' | 'operators' | 'keywords' | 'swap',
    isWireframe: boolean,
    varIndex: number,
    currentSwap: { x: number; y: number; swapped: boolean }
  ) => {
    // Clear previous children cleanly
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
      if ((obj as THREE.Mesh).material) {
        const mat = (obj as THREE.Mesh).material;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat.dispose();
      }
    }

    if (mode === 'memory') {
      // MODE 0: RAM Memory Bank & Dynamic Variable Binding
      // A motherboard RAM bus with 6 memory slots
      const boardGeo = new THREE.BoxGeometry(16, 0.4, 8);
      const boardMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.3,
        metalness: 0.8,
        wireframe: isWireframe
      });
      const board = new THREE.Mesh(boardGeo, boardMat);
      board.position.y = -2;
      group.add(board);

      // Gold memory trace bus
      const busGeo = new THREE.BoxGeometry(14, 0.05, 0.3);
      const busMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.2 });
      const bus1 = new THREE.Mesh(busGeo, busMat);
      bus1.position.set(0, -1.78, 1.5);
      group.add(bus1);
      const bus2 = new THREE.Mesh(busGeo, busMat);
      bus2.position.set(0, -1.78, -1.5);
      group.add(bus2);

      // 6 Memory cells
      memoryCells.forEach((cell, idx) => {
        const xOffset = (idx - 2.5) * 2.5;

        // Base socket
        const socketGeo = new THREE.BoxGeometry(2, 0.3, 3);
        const socketMat = new THREE.MeshStandardMaterial({
          color: 0x1e293b,
          roughness: 0.5,
          wireframe: isWireframe
        });
        const socket = new THREE.Mesh(socketGeo, socketMat);
        socket.position.set(xOffset, -1.8, 0);
        group.add(socket);

        // Memory Data Block (Cylinder/Octahedron/Box depending on type)
        let blockGeo: THREE.BufferGeometry;
        if (cell.type === 'int') {
          blockGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
        } else if (cell.type === 'float') {
          blockGeo = new THREE.OctahedronGeometry(0.85);
        } else {
          blockGeo = new THREE.CylinderGeometry(0.7, 0.7, 1.3, 16);
        }

        const isSelected = idx === varIndex;
        const blockMat = new THREE.MeshStandardMaterial({
          color: cell.color,
          metalness: isSelected ? 0.9 : 0.4,
          roughness: isSelected ? 0.1 : 0.4,
          wireframe: isWireframe,
          emissive: isSelected ? cell.color : 0x000000,
          emissiveIntensity: isSelected ? 0.6 : 0
        });

        const block = new THREE.Mesh(blockGeo, blockMat);
        block.position.set(xOffset, -0.7, 0);
        group.add(block);

        // Floating Identifier Tag Badge above active cell
        const tagGeo = new THREE.SphereGeometry(0.35, 16, 16);
        const tagMat = new THREE.MeshStandardMaterial({
          color: isSelected ? 0xffffff : 0x94a3b8,
          metalness: 0.8,
          roughness: 0.2,
          emissive: isSelected ? 0x38bdf8 : 0x000000,
          emissiveIntensity: isSelected ? 0.8 : 0
        });
        const tag = new THREE.Mesh(tagGeo, tagMat);
        tag.position.set(xOffset, 1.6, 0);
        if (isSelected) tag.name = 'pulseBeacon';
        group.add(tag);

        // Glowing Pointer Ray / Laser line from variable name to memory block
        const points = [new THREE.Vector3(xOffset, 1.2, 0), new THREE.Vector3(xOffset, 0, 0)];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        const lineMat = new THREE.LineBasicMaterial({
          color: isSelected ? 0x38bdf8 : 0x475569,
          linewidth: isSelected ? 3 : 1
        });
        const line = new THREE.Line(lineGeo, lineMat);
        group.add(line);
      });
    } else if (mode === 'operators') {
      // MODE 1: Python Operator Precedence Tower
      // Tier 1 (Peak): ** Exponentiation (Right to Left Associativity)
      const topCylinderGeo = new THREE.CylinderGeometry(1.5, 2.0, 1.2, 32);
      const topMat = new THREE.MeshStandardMaterial({
        color: 0xf97316,
        metalness: 0.8,
        roughness: 0.2,
        wireframe: isWireframe,
        emissive: 0xea580c,
        emissiveIntensity: 0.4
      });
      const topCylinder = new THREE.Mesh(topCylinderGeo, topMat);
      topCylinder.position.y = 2.4;
      topCylinder.name = 'pulseBeacon';
      group.add(topCylinder);

      // Exponentiation icon ring
      const ringGeo = new THREE.TorusGeometry(2.3, 0.12, 16, 64);
      const ringMat = new THREE.MeshStandardMaterial({ color: 0xfde047, metalness: 0.9, roughness: 0.1 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.y = 2.4;
      ring.rotation.x = Math.PI / 2;
      group.add(ring);

      // Tier 2 (Middle): *, /, //, % (Left to Right)
      const midCylinderGeo = new THREE.CylinderGeometry(2.8, 3.6, 1.4, 32);
      const midMat = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        metalness: 0.7,
        roughness: 0.3,
        wireframe: isWireframe
      });
      const midCylinder = new THREE.Mesh(midCylinderGeo, midMat);
      midCylinder.position.y = 0.8;
      group.add(midCylinder);

      // 4 Orbital Satellite Spheres for *, /, //, %
      const satColors = [0x60a5fa, 0x06b6d4, 0x10b981, 0x8b5cf6];
      satColors.forEach((col, i) => {
        const ang = (i * Math.PI) / 2;
        const satGeo = new THREE.SphereGeometry(0.4, 16, 16);
        const satMat = new THREE.MeshStandardMaterial({ color: col, metalness: 0.8, roughness: 0.2 });
        const sat = new THREE.Mesh(satGeo, satMat);
        sat.position.set(Math.cos(ang) * 4.2, 0.8, Math.sin(ang) * 4.2);
        group.add(sat);
      });

      // Tier 3 (Base): +, - (Lowest priority arithmetic)
      const baseCylinderGeo = new THREE.CylinderGeometry(4.2, 5.2, 1.6, 32);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0x6366f1,
        metalness: 0.6,
        roughness: 0.4,
        wireframe: isWireframe
      });
      const baseCylinder = new THREE.Mesh(baseCylinderGeo, baseMat);
      baseCylinder.position.y = -1.0;
      group.add(baseCylinder);

      // Right-to-Left Exponentiation Arrow Conduit in 3D
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(3.2, 3.6, 0),
        new THREE.Vector3(0, 4.8, 1.5),
        new THREE.Vector3(-3.2, 3.6, 0)
      );
      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.12, 8, false);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: 0x22c55e,
        metalness: 0.9,
        roughness: 0.1,
        emissive: 0x16a34a,
        emissiveIntensity: 0.6
      });
      const tube = new THREE.Mesh(tubeGeo, tubeMat);
      group.add(tube);
    } else if (mode === 'keywords') {
      // MODE 2: Keyword Firewall & Variable Scanner
      // Outer Circular Firewall Cylinders representing 35 Python keywords
      const firewallCount = 20;
      for (let i = 0; i < firewallCount; i++) {
        const angle = (i / firewallCount) * Math.PI * 2;
        const radius = 5.5;
        const postGeo = new THREE.CylinderGeometry(0.18, 0.18, 4, 16);
        const postMat = new THREE.MeshStandardMaterial({
          color: 0xef4444,
          metalness: 0.9,
          roughness: 0.1,
          emissive: 0xdc2626,
          emissiveIntensity: 0.4,
          wireframe: isWireframe
        });
        const post = new THREE.Mesh(postGeo, postMat);
        post.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
        group.add(post);
      }

      // Firewall Energy Ring Barrier
      const ringBarrierGeo = new THREE.TorusGeometry(5.5, 0.08, 16, 64);
      const ringBarrierMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
      const ringBarrier = new THREE.Mesh(ringBarrierGeo, ringBarrierMat);
      ringBarrier.position.y = 1.2;
      ringBarrier.rotation.x = Math.PI / 2;
      group.add(ringBarrier);

      // Central Scanner Pedestal
      const pedestalGeo = new THREE.CylinderGeometry(2, 2.5, 1, 32);
      const pedestalMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.8,
        roughness: 0.3,
        wireframe: isWireframe
      });
      const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
      pedestal.position.y = -1.5;
      group.add(pedestal);

      // Tested Variable Crystal
      const crystalGeo = new THREE.DodecahedronGeometry(1.2);
      const isValid = scannerResult.valid;
      const crystalMat = new THREE.MeshStandardMaterial({
        color: isValid ? 0x10b981 : 0xf43f5e,
        metalness: 0.8,
        roughness: 0.1,
        emissive: isValid ? 0x059669 : 0xe11d48,
        emissiveIntensity: 0.7,
        wireframe: isWireframe
      });
      const crystal = new THREE.Mesh(crystalGeo, crystalMat);
      crystal.position.y = 0.5;
      crystal.name = 'pulseBeacon';
      group.add(crystal);

      // Vertical Laser Scanner beam
      const laserGeo = new THREE.CylinderGeometry(0.04, 0.04, 5, 8);
      const laserMat = new THREE.MeshBasicMaterial({ color: isValid ? 0x34d399 : 0xf87171 });
      const laser = new THREE.Mesh(laserGeo, laserMat);
      laser.position.set(0, 0.5, 0);
      group.add(laser);
    } else if (mode === 'swap') {
      // MODE 3: Simultaneous Assignment Orbital Swap: x, y = y, x
      // Two dual data orbs revolving on an infinity double-ring
      const trackGeo = new THREE.TorusGeometry(3.5, 0.08, 16, 64);
      const trackMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.9, roughness: 0.1 });
      const track = new THREE.Mesh(trackGeo, trackMat);
      track.rotation.x = Math.PI / 3;
      group.add(track);

      // Variable X (Orb 1)
      const xPos = currentSwap.swapped ? 3.2 : -3.2;
      const yPos = currentSwap.swapped ? -3.2 : 3.2;

      const cubeXGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
      const cubeXMat = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x2563eb,
        emissiveIntensity: 0.4,
        wireframe: isWireframe
      });
      const cubeX = new THREE.Mesh(cubeXGeo, cubeXMat);
      cubeX.position.set(xPos, 0, 0);
      cubeX.name = 'swapCubeX';
      group.add(cubeX);

      // Variable Y (Orb 2)
      const cubeYGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
      const cubeYMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x059669,
        emissiveIntensity: 0.4,
        wireframe: isWireframe
      });
      const cubeY = new THREE.Mesh(cubeYGeo, cubeYMat);
      cubeY.position.set(yPos, 0, 0);
      cubeY.name = 'swapCubeY';
      group.add(cubeY);

      // Central Unpacking Core / Connector
      const coreGeo = new THREE.SphereGeometry(0.8, 24, 24);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        metalness: 0.9,
        roughness: 0.1,
        emissive: 0x9333ea,
        emissiveIntensity: 0.6
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      core.name = 'pulseBeacon';
      group.add(core);

      // Connector Beam between X and Y
      const pts = [cubeX.position, core.position, cubeY.position];
      const beamGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const beamMat = new THREE.LineBasicMaterial({ color: 0xc084fc, linewidth: 2 });
      const beam = new THREE.Line(beamGeo, beamMat);
      group.add(beam);
    }
  };

  const handleResetCamera = () => {
    rotRef.current = { x: 0.35, y: 0.6 };
    if (cameraRef.current) {
      if (activeMode === 'memory') {
        cameraRef.current.position.set(0, 5.5, 19);
      } else if (activeMode === 'operators') {
        cameraRef.current.position.set(0, 5, 18);
      } else if (activeMode === 'keywords') {
        cameraRef.current.position.set(0, 7.5, 18);
      } else {
        cameraRef.current.position.set(0, 4.5, 16);
      }
      cameraRef.current.lookAt(0, 0, 0);
    }
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex flex-col my-6 font-sans">
      {/* Top Header / Mode Switcher */}
      <div className="p-4 sm:p-5 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-indigo-400">
              {isEn ? 'WebGL 3D Simulation • Lesson 17 Python' : 'Mô phỏng 3D WebGL • Bài 17 SGK Tin học 10'}
            </div>
            <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
              <span>{isEn ? 'Visualizing Python Variables, RAM Pointers, Operators & Keywords' : 'Trực quan hoá Biến, Bộ nhớ RAM, Toán tử & Từ khoá Python'}</span>
            </h3>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs font-bold gap-1">
          <button
            type="button"
            onClick={() => setActiveMode('memory')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'memory'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isEn ? '1. RAM & Variable Pointer' : '1. Bộ nhớ & Con trỏ Biến'}</span>
            <span className="sm:hidden">{isEn ? 'RAM' : 'Ô nhớ'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('operators')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'operators'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isEn ? '2. Operator Pyramid (**)' : '2. Tháp Toán tử (**)'}</span>
            <span className="sm:hidden">{isEn ? 'Operators' : 'Toán tử'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('keywords')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'keywords'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isEn ? '3. Keyword Firewall' : '3. Tường lửa Từ khóa'}</span>
            <span className="sm:hidden">{isEn ? 'Keywords' : 'Từ khóa'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('swap')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'swap'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Repeat className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isEn ? '4. Variable Swap (x, y = y, x)' : '4. Tráo đổi (x, y = y, x)'}</span>
            <span className="sm:hidden">{isEn ? 'Swap' : 'Tráo đổi'}</span>
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Viewport */}
      <div
        className={`relative w-full ${isFullscreen ? 'h-screen' : 'h-[340px] sm:h-[420px] lg:h-[460px]'} cursor-grab active:cursor-grabbing bg-radial from-slate-900 to-slate-950 overflow-hidden`}
      >
        {/* Dedicated WebGL Canvas Container - strictly no React children */}
        <div ref={containerRef} className="absolute inset-0 w-full h-full" />

        {/* Floating Controls HUD */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-2.5 rounded-xl backdrop-blur-md border transition-all cursor-pointer ${
              autoRotate
                ? 'bg-indigo-600/80 border-indigo-400 text-white shadow-md'
                : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:text-white'
            }`}
            title={isEn ? 'Toggle Auto-Rotate' : 'Bật/Tắt tự động xoay'}
          >
            <RotateCcw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </button>

          <button
            type="button"
            onClick={() => setWireframe(!wireframe)}
            className={`p-2.5 rounded-xl backdrop-blur-md border transition-all cursor-pointer ${
              wireframe
                ? 'bg-emerald-600/80 border-emerald-400 text-white'
                : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:text-white'
            }`}
            title={isEn ? 'Toggle Wireframe Mode' : 'Bật/Tắt chế độ khung lưới (Wireframe)'}
          >
            <Box className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleResetCamera}
            className="p-2.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
            title={isEn ? 'Reset Camera View' : 'Đặt lại góc nhìn camera'}
          >
            <Sparkles className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
            title={isEn ? 'Fullscreen' : 'Toàn màn hình'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Interactive Mode Control Panel (placed below canvas on mobile / docked cleanly) */}
      <div className="p-3 sm:p-4 bg-slate-900/95 border-t border-slate-800 z-10">

        {/* Interactive Mode Overlays (HUD) */}
        {activeMode === 'memory' && (
          <div className="bg-slate-900/90 border border-slate-800 p-3 sm:p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <div className="text-slate-400 flex items-center gap-1.5 font-bold">
                <Info className="w-3.5 h-3.5 text-indigo-400" />
                <span>{isEn ? 'Click any variable to inspect its RAM address and dynamic type:' : 'Nhấp chọn biến để kiểm tra vùng nhớ RAM và kiểu dữ liệu động (Trang 91–92):'}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {memoryCells.map((cell, idx) => (
                  <button
                    key={cell.name}
                    type="button"
                    onClick={() => setSelectedVarIndex(idx)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                      selectedVarIndex === idx
                        ? 'bg-indigo-600 text-white ring-2 ring-indigo-400 shadow-lg'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {cell.name} = {cell.val}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
              <span className="text-slate-400">{isEn ? 'Address: ' : 'Địa chỉ: '}</span>
              <span className="text-amber-400">{memoryCells[selectedVarIndex].addr}</span> |{' '}
              <span className="text-slate-400">{isEn ? 'Type: ' : 'Kiểu: '}</span>
              <span className="text-emerald-400">{memoryCells[selectedVarIndex].type}</span>
            </div>
          </div>
        )}

        {activeMode === 'operators' && (
          <div className="bg-slate-900/90 border border-slate-800 p-3 sm:p-4 rounded-2xl text-xs space-y-1.5">
            <div className="text-amber-300 font-bold flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>{isEn ? 'Operator Precedence and Right-to-Left Exponentiation (**):' : 'Quy tắc ưu tiên và Tính kết hợp Phải-sang-Trái của lũy thừa (SGK Trang 93–94):'}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-300">
              <div className="p-2 rounded-xl bg-slate-950/80 border border-orange-500/30">
                <span className="font-extrabold text-orange-400">{isEn ? 'Top (Highest):' : 'Đỉnh (Cao nhất):'}</span> {isEn ? 'Power ' : 'Lũy thừa '}
                <code className="text-amber-300 font-mono">**</code> {isEn ? '(evaluates RIGHT to LEFT: 4**2**3 = 65536)' : '(tính từ PHẢI sang TRÁI: 4**2**3 = 65536)'}
              </div>
              <div className="p-2 rounded-xl bg-slate-950/80 border border-blue-500/30">
                <span className="font-extrabold text-blue-400">{isEn ? 'Middle:' : 'Giữa:'}</span>{' '}
                <code className="text-cyan-300 font-mono">* , / , // , %</code> {isEn ? '(left to right)' : '(trái sang phải)'}
              </div>
              <div className="p-2 rounded-xl bg-slate-950/80 border border-indigo-500/30">
                <span className="font-extrabold text-indigo-400">{isEn ? 'Base (Lowest):' : 'Đáy:'}</span>{' '}
                <code className="text-indigo-300 font-mono">+ , -</code> {isEn ? '(left to right)' : '(trái sang phải)'}
              </div>
            </div>
          </div>
        )}

        {activeMode === 'keywords' && (
          <div className="bg-slate-900/90 border border-slate-800 p-3 sm:p-4 rounded-2xl space-y-2 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-slate-300 font-bold flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>{isEn ? 'Identifier Validator & Keyword Firewall:' : 'Thử nghiệm máy quét Tên biến với Tường lửa Từ khoá (SGK Trang 93 & 95):'}</span>
              </div>
              <div className="flex items-center gap-1 font-mono text-xs">
                {scannerResult.valid ? (
                  <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {isEn ? 'Valid Identifier' : 'Hợp lệ'}
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" /> {isEn ? 'SyntaxError Detected' : 'Báo lỗi SyntaxError'}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {sampleIdentifiers.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTestIdentifier(item)}
                  className={`px-2.5 py-1 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                    testIdentifier === item.id
                      ? item.valid
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-rose-600 text-white shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {item.id}
                </button>
              ))}
            </div>

            <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-[11px]">
              <span className="font-bold text-slate-200">{isEn ? 'Textbook Analysis: ' : 'Phân tích SGK: '}</span>
              {isEn ? scannerResult.reasonEn : scannerResult.reasonVi}
            </div>
          </div>
        )}

        {activeMode === 'swap' && (
          <div className="bg-slate-900/90 border border-slate-800 p-3 sm:p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <div className="text-purple-300 font-bold flex items-center gap-1.5">
                <Repeat className="w-4 h-4 text-purple-400" />
                <span>{isEn ? 'Simultaneous Python Assignment: Swap 2 variables in 1 line:' : 'Kỳ quan Gán đồng thời Python: Tráo đổi hai biến trong 1 câu lệnh (Vận dụng 2 - Trang 96)'}</span>
              </div>
              <div className="font-mono text-xs text-slate-300">
                <span className="text-blue-400">x = {swapState.x}</span>,{' '}
                <span className="text-emerald-400">y = {swapState.y}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleToggleSwap}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-black text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-purple-600/30"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{isEn ? 'Run statement: x, y = y, x' : 'Chạy lệnh: x, y = y, x'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
