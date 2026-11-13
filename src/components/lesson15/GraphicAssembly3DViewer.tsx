import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Layers,
  RotateCw,
  Box,
  Eye,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Sliders,
  Sparkles,
  Info,
  Sun,
  BookOpen
} from 'lucide-react';
import { useBook } from '../../context/BookContext';

export const GraphicAssembly3DViewer: React.FC = () => {
  const { bilingualMode } = useBook();
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Simulation state
  const [activeMode, setActiveMode] = useState<'poster' | 'boolean' | 'beach'>('poster');
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [layerExplosion, setLayerExplosion] = useState<number>(0.35); // 0 (flat 2D) to 1 (fully separated in 3D)
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // References to dynamic scene objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const posterGroupRef = useRef<THREE.Group | null>(null);
  const booleanGroupRef = useRef<THREE.Group | null>(null);
  const beachGroupRef = useRef<THREE.Group | null>(null);
  const layerMeshesRef = useRef<THREE.Object3D[]>([]);
  const animTimeRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);
  const posterTexturesRef = useRef<{
    headerCanvas: HTMLCanvasElement;
    headerTex: THREE.CanvasTexture;
    b1Canvas: HTMLCanvasElement;
    b1Tex: THREE.CanvasTexture;
    b2Canvas: HTMLCanvasElement;
    b2Tex: THREE.CanvasTexture;
    schedCanvas: HTMLCanvasElement;
    schedTex: THREE.CanvasTexture;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0f172a); // slate-900

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 8.5);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.replaceChildren(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff8e7, 1.6);
    dirLight.position.set(6, 10, 8);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.6);
    fillLight.position.set(-6, -3, 4);
    scene.add(fillLight);

    // 5. Construct Groups
    const posterGroup = new THREE.Group();
    const booleanGroup = new THREE.Group();
    const beachGroup = new THREE.Group();
    posterGroupRef.current = posterGroup;
    booleanGroupRef.current = booleanGroup;
    beachGroupRef.current = beachGroup;

    scene.add(posterGroup);
    scene.add(booleanGroup);
    scene.add(beachGroup);

    // ========================================================================
    // BUILD MODE 1: 3D HANOI BOOK FAIR POSTER (EXPLODED Z-ORDER LAYERS)
    // ========================================================================
    const layers: THREE.Object3D[] = [];

    // Helper: Canvas texture for labels
    const createTextTexture = (
      text: string,
      fontSize: number = 42,
      textColor: string = '#ffffff',
      bgColor: string = 'transparent',
      fontWeight: string = 'bold',
      width: number = 512,
      height: number = 128
    ) => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        if (bgColor !== 'transparent') {
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, width, height);
        }
        ctx.fillStyle = textColor;
        ctx.font = `${fontWeight} ${fontSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, width / 2, height / 2);
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    };

    // LAYER 0: Background Canvas (Top Gold + Bottom Blue with Sawtooth Cutout)
    const layer0Group = new THREE.Group();
    layer0Group.name = 'Layer 0: Background Canvas';

    // Top Gold Block
    const goldGeo = new THREE.PlaneGeometry(3.6, 2.2);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // amber-500
      roughness: 0.3,
      metalness: 0.1,
      side: THREE.DoubleSide
    });
    const goldMesh = new THREE.Mesh(goldGeo, goldMat);
    goldMesh.position.set(0, 1.25, 0);
    layer0Group.add(goldMesh);

    // Bottom Blue Sawtooth Block (created via Shape with multiple triangular teeth)
    const blueShape = new THREE.Shape();
    const w = 3.6;
    const h = 2.4;
    const x0 = -w / 2;
    const y0 = -2.35;
    const teethCount = 10;
    const toothW = w / teethCount;
    const toothH = 0.22;

    // Outer perimeter: bottom-left -> bottom-right -> up right -> sawtooth top -> down left
    blueShape.moveTo(x0, y0);
    blueShape.lineTo(x0 + w, y0);
    blueShape.lineTo(x0 + w, y0 + h - toothH);
    for (let i = teethCount - 1; i >= 0; i--) {
      const tx = x0 + i * toothW;
      blueShape.lineTo(tx + toothW / 2, y0 + h);
      blueShape.lineTo(tx, y0 + h - toothH);
    }
    blueShape.lineTo(x0, y0);

    const blueExtrudeGeo = new THREE.ShapeGeometry(blueShape);
    const blueMat = new THREE.MeshStandardMaterial({
      color: 0x0d9488, // teal-600 / cyan
      roughness: 0.35,
      side: THREE.DoubleSide
    });
    const blueMesh = new THREE.Mesh(blueExtrudeGeo, blueMat);
    layer0Group.add(blueMesh);

    posterGroup.add(layer0Group);
    layers.push(layer0Group);

    // LAYER 1: Bookshelf & 3D Book Spines
    const layer1Group = new THREE.Group();
    layer1Group.name = 'Layer 1: Books & Shelf';

    // Shelf base
    const shelfGeo = new THREE.BoxGeometry(3.2, 0.12, 0.25);
    const shelfMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.6 }); // brown
    const shelfMesh = new THREE.Mesh(shelfGeo, shelfMat);
    shelfMesh.position.set(0, -0.65, 0);
    layer1Group.add(shelfMesh);

    // Row of Books with curved spines
    const bookColors = [0x0284c7, 0xdc2626, 0xe11d48, 0x16a34a, 0x9333ea, 0xd97706, 0x2563eb];
    const bookWidths = [0.28, 0.24, 0.3, 0.22, 0.26, 0.25, 0.28];
    const bookHeights = [1.2, 1.45, 1.35, 1.1, 1.4, 1.25, 1.3];
    let startX = -1.25;

    bookColors.forEach((color, idx) => {
      const bw = bookWidths[idx];
      const bh = bookHeights[idx];
      const bookGeo = new THREE.BoxGeometry(bw, bh, 0.15);
      const bookMat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.25,
        metalness: 0.15
      });
      const bookMesh = new THREE.Mesh(bookGeo, bookMat);
      // Slight slant on 3rd and 6th book for realistic look
      const rotZ = idx === 2 ? 0.08 : idx === 5 ? -0.06 : 0;
      bookMesh.rotation.z = rotZ;
      bookMesh.position.set(startX + bw / 2, -0.65 + bh / 2 + 0.06, 0);

      // Gold / Yellow spine ribbon detail
      const stripeGeo = new THREE.BoxGeometry(bw * 1.02, 0.08, 0.16);
      const stripeMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.2 });
      const stripe1 = new THREE.Mesh(stripeGeo, stripeMat);
      stripe1.position.set(0, bh * 0.3, 0);
      bookMesh.add(stripe1);

      const stripe2 = new THREE.Mesh(stripeGeo, stripeMat);
      stripe2.position.set(0, -bh * 0.3, 0);
      bookMesh.add(stripe2);

      layer1Group.add(bookMesh);
      startX += bw + 0.06;
    });

    posterGroup.add(layer1Group);
    layers.push(layer1Group);

    // LAYER 2: Triangular Pennant Bunting Chain
    const layer2Group = new THREE.Group();
    layer2Group.name = 'Layer 2: Pennant Bunting';

    const pennantColors = [0x1e3a8a, 0xf97316, 0x06b6d4, 0xef4444, 0x0d9488, 0x1e293b, 0xf97316, 0x06b6d4];
    const pCount = pennantColors.length;
    const pSpan = 3.6;
    const pWidth = pSpan / pCount;
    const pHeight = 0.55;

    for (let i = 0; i < pCount; i++) {
      const triShape = new THREE.Shape();
      triShape.moveTo(-pWidth / 2, pHeight / 2);
      triShape.lineTo(pWidth / 2, pHeight / 2);
      triShape.lineTo(0, -pHeight / 2);
      triShape.closePath();

      const triGeo = new THREE.ShapeGeometry(triShape);
      const triMat = new THREE.MeshStandardMaterial({
        color: pennantColors[i],
        roughness: 0.3,
        side: THREE.DoubleSide
      });
      const triMesh = new THREE.Mesh(triGeo, triMat);
      triMesh.position.set(-pSpan / 2 + (i + 0.5) * pWidth, 2.05, 0);
      layer2Group.add(triMesh);
    }

    posterGroup.add(layer2Group);
    layers.push(layer2Group);

    // LAYER 3: Speech Bubble Callouts ("Vào cửa tự do" & "Giảm giá tới 70%")
    const layer3Group = new THREE.Group();
    layer3Group.name = 'Layer 3: Speech Bubbles';

    // Bubble 1: Left Cyan ("Vào cửa tự do")
    const bubble1Shape = new THREE.Shape();
    bubble1Shape.absellipse(0, 0, 0.45, 0.32, 0, Math.PI * 2, false, 0);
    // Add tail
    bubble1Shape.moveTo(0.15, -0.25);
    bubble1Shape.lineTo(0.3, -0.42);
    bubble1Shape.lineTo(0.02, -0.28);
    const bubble1Geo = new THREE.ShapeGeometry(bubble1Shape);
    const bubble1Mat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      roughness: 0.25,
      side: THREE.DoubleSide
    });
    const bubble1Mesh = new THREE.Mesh(bubble1Geo, bubble1Mat);
    bubble1Mesh.position.set(-1.15, 0.45, 0);

    // Dynamic billboard canvas creation for reactive bilingual updates
    const isEnInitial = bilingualMode === 'en';

    // 1. Text on Bubble 1 ("VÀO CỬA TỰ DO" / "FREE ADMISSION")
    const b1Canvas = document.createElement('canvas');
    b1Canvas.width = 256;
    b1Canvas.height = 128;
    const b1ctx = b1Canvas.getContext('2d');
    if (b1ctx) {
      b1ctx.fillStyle = '#ffffff';
      b1ctx.font = 'bold 36px sans-serif';
      b1ctx.textAlign = 'center';
      b1ctx.textBaseline = 'middle';
      if (isEnInitial) {
        b1ctx.fillText('FREE', 128, 44);
        b1ctx.fillText('ADMISSION', 128, 84);
      } else {
        b1ctx.fillText('VÀO CỬA', 128, 44);
        b1ctx.fillText('TỰ DO', 128, 84);
      }
    }
    const b1Tex = new THREE.CanvasTexture(b1Canvas);
    b1Tex.needsUpdate = true;
    const b1TextGeo = new THREE.PlaneGeometry(0.7, 0.35);
    const b1TextMat = new THREE.MeshBasicMaterial({ map: b1Tex, transparent: true });
    const b1TextMesh = new THREE.Mesh(b1TextGeo, b1TextMat);
    b1TextMesh.position.set(0, 0, 0.02);
    bubble1Mesh.add(b1TextMesh);
    layer3Group.add(bubble1Mesh);

    // 2. Bubble 2: Right Teal ("GIẢM GIÁ TỚI 70%" / "UP TO 70% OFF")
    const bubble2Shape = new THREE.Shape();
    bubble2Shape.absellipse(0, 0, 0.5, 0.35, 0, Math.PI * 2, false, 0);
    // Add tail
    bubble2Shape.moveTo(-0.15, -0.28);
    bubble2Shape.lineTo(-0.32, -0.45);
    bubble2Shape.lineTo(-0.02, -0.32);
    const bubble2Geo = new THREE.ShapeGeometry(bubble2Shape);
    const bubble2Mat = new THREE.MeshStandardMaterial({
      color: 0x0f766e,
      roughness: 0.25,
      side: THREE.DoubleSide
    });
    const bubble2Mesh = new THREE.Mesh(bubble2Geo, bubble2Mat);
    bubble2Mesh.position.set(1.15, -0.25, 0);

    const b2Canvas = document.createElement('canvas');
    b2Canvas.width = 256;
    b2Canvas.height = 128;
    const b2ctx = b2Canvas.getContext('2d');
    if (b2ctx) {
      b2ctx.fillStyle = '#fef08a';
      b2ctx.font = 'bold 36px sans-serif';
      b2ctx.textAlign = 'center';
      b2ctx.textBaseline = 'middle';
      if (isEnInitial) {
        b2ctx.fillText('UP TO', 128, 44);
        b2ctx.fillText('70% OFF', 128, 84);
      } else {
        b2ctx.fillText('Giảm giá', 128, 44);
        b2ctx.fillText('tới 70%', 128, 84);
      }
    }
    const b2Tex = new THREE.CanvasTexture(b2Canvas);
    b2Tex.needsUpdate = true;
    const b2TextGeo = new THREE.PlaneGeometry(0.75, 0.38);
    const b2TextMat = new THREE.MeshBasicMaterial({ map: b2Tex, transparent: true });
    const b2TextMesh = new THREE.Mesh(b2TextGeo, b2TextMat);
    b2TextMesh.position.set(0, 0, 0.02);
    bubble2Mesh.add(b2TextMesh);
    layer3Group.add(bubble2Mesh);

    posterGroup.add(layer3Group);
    layers.push(layer3Group);

    // LAYER 4: Event Schedule & Dashed Stroke Divider
    const layer4Group = new THREE.Group();
    layer4Group.name = 'Layer 4: Event Schedule & Dashed Stroke';

    // Dashed divider line (constructed of small line segments)
    const dashCount = 8;
    const dashLen = 0.08;
    const gapLen = 0.06;
    const totalH = dashCount * dashLen + (dashCount - 1) * gapLen;
    const startY = -1.45 + totalH / 2;

    for (let i = 0; i < dashCount; i++) {
      const segY = startY - i * (dashLen + gapLen);
      const dashGeo = new THREE.BoxGeometry(0.025, dashLen, 0.015);
      const dashMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const dashMesh = new THREE.Mesh(dashGeo, dashMat);
      dashMesh.position.set(0, segY, 0);
      layer4Group.add(dashMesh);
    }

    // Schedule Text Billboard (Left: TIME/THỜI GIAN, Right: LOCATION/ĐỊA ĐIỂM)
    const schedCanvas = document.createElement('canvas');
    schedCanvas.width = 1024;
    schedCanvas.height = 360;
    const sctx = schedCanvas.getContext('2d');
    if (sctx) {
      sctx.fillStyle = 'rgba(255,255,255,0)';
      sctx.fillRect(0, 0, 1024, 360);

      // Left Column
      sctx.fillStyle = '#fef08a';
      sctx.font = 'bold 44px sans-serif';
      sctx.textAlign = 'center';
      sctx.fillText(isEnInitial ? 'TIME' : 'THỜI GIAN', 240, 70);

      sctx.fillStyle = '#ffffff';
      sctx.font = '34px sans-serif';
      sctx.fillText(isEnInitial ? '8:00 – 21:00' : '8H – 21H', 240, 160);
      sctx.fillText(isEnInitial ? 'Oct 12 – 17, 2030' : '12 – 17/10/2030', 240, 230);

      // Right Column
      sctx.fillStyle = '#fef08a';
      sctx.font = 'bold 44px sans-serif';
      sctx.textAlign = 'center';
      sctx.fillText(isEnInitial ? 'LOCATION' : 'ĐỊA ĐIỂM', 784, 70);

      sctx.fillStyle = '#ffffff';
      sctx.font = '34px sans-serif';
      sctx.fillText(isEnInitial ? 'Thang Long Imperial Citadel' : 'Hoàng thành Thăng Long', 784, 150);
      sctx.fillText(isEnInitial ? '19C Hoang Dieu,' : '19C Hoàng Diệu,', 784, 210);
      sctx.fillText(isEnInitial ? 'Ba Dinh, Hanoi' : 'Ba Đình, Hà Nội', 784, 270);
    }
    const schedTex = new THREE.CanvasTexture(schedCanvas);
    schedTex.needsUpdate = true;
    const schedGeo = new THREE.PlaneGeometry(3.2, 1.15);
    const schedMat = new THREE.MeshBasicMaterial({ map: schedTex, transparent: true });
    const schedMesh = new THREE.Mesh(schedGeo, schedMat);
    schedMesh.position.set(0, -1.45, 0);
    layer4Group.add(schedMesh);

    posterGroup.add(layer4Group);
    layers.push(layer4Group);

    // LAYER 5: Main Header Typography ("HỘI SÁCH HÀ NỘI" / "HANOI BOOK FAIR")
    const layer5Group = new THREE.Group();
    layer5Group.name = 'Layer 5: Header Typography';

    const headerCanvas = document.createElement('canvas');
    headerCanvas.width = 1024;
    headerCanvas.height = 180;
    const hctx = headerCanvas.getContext('2d');
    if (hctx) {
      hctx.fillStyle = '#1e3a8a';
      hctx.font = '900 68px sans-serif';
      hctx.textAlign = 'center';
      hctx.textBaseline = 'middle';
      hctx.fillText(
        isEnInitial ? 'HANOI BOOK FAIR' : 'HỘI SÁCH HÀ NỘI',
        512,
        90
      );
    }
    const headerTex = new THREE.CanvasTexture(headerCanvas);
    headerTex.needsUpdate = true;
    const headerGeo = new THREE.PlaneGeometry(3.2, 0.65);
    const headerMat = new THREE.MeshBasicMaterial({ map: headerTex, transparent: true });
    const headerMesh = new THREE.Mesh(headerGeo, headerMat);
    headerMesh.position.set(0, 1.35, 0);
    layer5Group.add(headerMesh);

    posterGroup.add(layer5Group);
    layers.push(layer5Group);

    // Cache textures into ref for seamless live updates on language toggle without resetting 3D scene
    posterTexturesRef.current = {
      headerCanvas,
      headerTex,
      b1Canvas,
      b1Tex,
      b2Canvas,
      b2Tex,
      schedCanvas,
      schedTex
    };

    layerMeshesRef.current = layers;

    // ========================================================================
    // BUILD MODE 2: BOOLEAN FORGE & SPEECH BUBBLE ANIMATION (FIG 15.2 & 15.6)
    // ========================================================================
    // 2a. Sawtooth stamp subtraction
    const blockA = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 1.6, 0.2),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3 })
    );
    blockA.position.set(-1.8, -0.3, 0);
    booleanGroup.add(blockA);

    // Sawtooth cutter block
    const cutterGroup = new THREE.Group();
    cutterGroup.position.set(-1.8, 0.9, 0);
    for (let k = 0; k < 6; k++) {
      const tooth = new THREE.Mesh(
        new THREE.ConeGeometry(0.2, 0.45, 4),
        new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 })
      );
      tooth.rotation.z = Math.PI;
      tooth.position.set(-1.0 + k * 0.4, 0, 0);
      cutterGroup.add(tooth);
    }
    booleanGroup.add(cutterGroup);

    // Label for Boolean 1
    const diffLabelTex = createTextTexture('Path / Difference (Ctrl + -)', 36, '#38bdf8', 'transparent', 'bold', 512, 100);
    const diffLabelMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1.8, 0.35),
      new THREE.MeshBasicMaterial({ map: diffLabelTex, transparent: true })
    );
    diffLabelMesh.position.set(-1.8, -1.35, 0);
    booleanGroup.add(diffLabelMesh);

    // 2b. Speech Bubble Union (Ellipse + Triangle)
    const bubbleBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.85, 0.85, 0.15, 32),
      new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.25 })
    );
    bubbleBase.rotation.x = Math.PI / 2;
    bubbleBase.position.set(1.8, 0.2, 0);
    booleanGroup.add(bubbleBase);

    const bubblePointer = new THREE.Mesh(
      new THREE.ConeGeometry(0.35, 0.75, 3),
      new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.25 })
    );
    bubblePointer.rotation.z = -Math.PI / 3;
    bubblePointer.position.set(1.4, -0.5, 0);
    booleanGroup.add(bubblePointer);

    const unionLabelTex = createTextTexture('Path / Union (Ctrl + +)', 36, '#34d399', 'transparent', 'bold', 512, 100);
    const unionLabelMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1.8, 0.35),
      new THREE.MeshBasicMaterial({ map: unionLabelTex, transparent: true })
    );
    unionLabelMesh.position.set(1.8, -1.35, 0);
    booleanGroup.add(unionLabelMesh);

    // ========================================================================
    // BUILD MODE 3: 3D BEACH SCENE DIORAMA (APPLICATION TASK FIG 15.10)
    // ========================================================================
    // Sand ground
    const sandGeo = new THREE.CylinderGeometry(3.6, 3.8, 0.3, 32);
    const sandMat = new THREE.MeshStandardMaterial({ color: 0xfde047, roughness: 0.85 }); // yellow-300
    const sandMesh = new THREE.Mesh(sandGeo, sandMat);
    sandMesh.position.set(0, -1.2, 0);
    beachGroup.add(sandMesh);

    // Blue Sea Curved Waves (Nested disc segments with blue tones)
    const waveGeo1 = new THREE.TorusGeometry(2.4, 0.12, 16, 50, Math.PI);
    const waveMat1 = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2 });
    const wave1 = new THREE.Mesh(waveGeo1, waveMat1);
    wave1.rotation.x = Math.PI / 2;
    wave1.position.set(0, -1.0, -0.6);
    beachGroup.add(wave1);

    const waveGeo2 = new THREE.TorusGeometry(2.8, 0.14, 16, 50, Math.PI);
    const waveMat2 = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.25 });
    const wave2 = new THREE.Mesh(waveGeo2, waveMat2);
    wave2.rotation.x = Math.PI / 2;
    wave2.position.set(0, -1.02, -1.1);
    beachGroup.add(wave2);

    // Multicolored Beach Umbrella Parasol
    const umbrellaGroup = new THREE.Group();
    umbrellaGroup.position.set(-1.0, -0.2, 0.4);

    // Umbrella pole
    const poleGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.8, 12);
    const poleMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.rotation.z = -0.15;
    umbrellaGroup.add(pole);

    // Umbrella canopy with radial alternating colored cone wedges
    const canopyGeo = new THREE.ConeGeometry(1.2, 0.65, 8, 1, true);
    const canopyMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      roughness: 0.3,
      side: THREE.DoubleSide
    });
    const canopy = new THREE.Mesh(canopyGeo, canopyMat);
    canopy.position.set(0.12, 0.85, 0);
    canopy.rotation.z = -0.15;
    umbrellaGroup.add(canopy);
    beachGroup.add(umbrellaGroup);

    // Striped Beach Ball
    const ballGeo = new THREE.SphereGeometry(0.35, 24, 24);
    const ballMat = new THREE.MeshStandardMaterial({
      color: 0xe11d48, // rose-600
      roughness: 0.15,
      metalness: 0.1
    });
    const ballMesh = new THREE.Mesh(ballGeo, ballMat);
    ballMesh.position.set(1.1, -0.72, 0.7);
    beachGroup.add(ballMesh);

    // Fluffy Sun & Clouds
    const sunGeo = new THREE.SphereGeometry(0.55, 16, 16);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunMesh.position.set(2.4, 2.0, -1.5);
    beachGroup.add(sunMesh);

    // Mouse drag interaction variables
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      const currentGroup =
        activeMode === 'poster'
          ? posterGroup
          : activeMode === 'boolean'
          ? booleanGroup
          : beachGroup;

      currentGroup.rotation.y += deltaX * 0.008;
      currentGroup.rotation.x = Math.max(-0.6, Math.min(0.6, currentGroup.rotation.x + deltaY * 0.008));
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation Loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      if (isPlaying) {
        animTimeRef.current += 0.016;
      }
      const t = animTimeRef.current;

      // Mode visibility
      posterGroup.visible = activeMode === 'poster';
      booleanGroup.visible = activeMode === 'boolean';
      beachGroup.visible = activeMode === 'beach';

      // Auto rotation
      if (isAutoRotate && !isDragging) {
        const activeGroup =
          activeMode === 'poster'
            ? posterGroup
            : activeMode === 'boolean'
            ? booleanGroup
            : beachGroup;
        activeGroup.rotation.y = Math.sin(t * 0.4) * 0.35;
      }

      // Mode 1: Exploded Layer positioning along Z
      if (activeMode === 'poster') {
        const zStep = layerExplosion * 0.75;
        layers.forEach((layer, idx) => {
          const targetZ = (idx - 2.5) * zStep;
          layer.position.z = THREE.MathUtils.lerp(layer.position.z, targetZ, 0.1);

          // Focus effect
          if (selectedLayerIndex !== null) {
            const isTarget = selectedLayerIndex === idx;
            layer.scale.setScalar(isTarget ? 1.08 : 0.85);
          } else {
            layer.scale.setScalar(1.0);
          }
        });
      }

      // Mode 2: Boolean animation
      if (activeMode === 'boolean') {
        cutterGroup.position.y = 0.5 + Math.sin(t * 2) * 0.4;
        bubblePointer.position.x = 1.4 + Math.sin(t * 1.5) * 0.15;
      }

      // Mode 3: Beach animations
      if (activeMode === 'beach') {
        wave1.position.y = -1.0 + Math.sin(t * 2) * 0.04;
        wave2.position.y = -1.02 + Math.cos(t * 1.8) * 0.05;
        ballMesh.rotation.y += 0.015;
        ballMesh.position.y = -0.72 + Math.abs(Math.sin(t * 3)) * 0.12;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      renderer.dispose();
    };
  }, [activeMode, isPlaying, isAutoRotate, layerExplosion, selectedLayerIndex]);

  // Update wireframe on material changes
  useEffect(() => {
    if (!sceneRef.current) return;
    sceneRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => (m.wireframe = isWireframe));
        } else if (child.material) {
          child.material.wireframe = isWireframe;
        }
      }
    });
  }, [isWireframe]);

  // Update poster textures when bilingualMode changes without rebuilding 3D scene
  useEffect(() => {
    if (!posterTexturesRef.current) return;
    const { headerCanvas, headerTex, b1Canvas, b1Tex, b2Canvas, b2Tex, schedCanvas, schedTex } =
      posterTexturesRef.current;
    const isEn = bilingualMode === 'en';

    // Header
    const hctx = headerCanvas.getContext('2d');
    if (hctx) {
      hctx.clearRect(0, 0, headerCanvas.width, headerCanvas.height);
      hctx.fillStyle = '#1e3a8a';
      hctx.font = '900 68px sans-serif';
      hctx.textAlign = 'center';
      hctx.textBaseline = 'middle';
      hctx.fillText(isEn ? 'HANOI BOOK FAIR' : 'HỘI SÁCH HÀ NỘI', 512, 90);
    }
    headerTex.needsUpdate = true;

    // Bubble 1
    const b1ctx = b1Canvas.getContext('2d');
    if (b1ctx) {
      b1ctx.clearRect(0, 0, b1Canvas.width, b1Canvas.height);
      b1ctx.fillStyle = '#ffffff';
      b1ctx.font = 'bold 36px sans-serif';
      b1ctx.textAlign = 'center';
      b1ctx.textBaseline = 'middle';
      if (isEn) {
        b1ctx.fillText('FREE', 128, 44);
        b1ctx.fillText('ADMISSION', 128, 84);
      } else {
        b1ctx.fillText('VÀO CỬA', 128, 44);
        b1ctx.fillText('TỰ DO', 128, 84);
      }
    }
    b1Tex.needsUpdate = true;

    // Bubble 2
    const b2ctx = b2Canvas.getContext('2d');
    if (b2ctx) {
      b2ctx.clearRect(0, 0, b2Canvas.width, b2Canvas.height);
      b2ctx.fillStyle = '#fef08a';
      b2ctx.font = 'bold 36px sans-serif';
      b2ctx.textAlign = 'center';
      b2ctx.textBaseline = 'middle';
      if (isEn) {
        b2ctx.fillText('UP TO', 128, 44);
        b2ctx.fillText('70% OFF', 128, 84);
      } else {
        b2ctx.fillText('Giảm giá', 128, 44);
        b2ctx.fillText('tới 70%', 128, 84);
      }
    }
    b2Tex.needsUpdate = true;

    // Schedule
    const sctx = schedCanvas.getContext('2d');
    if (sctx) {
      sctx.clearRect(0, 0, schedCanvas.width, schedCanvas.height);
      // Left Column
      sctx.fillStyle = '#fef08a';
      sctx.font = 'bold 44px sans-serif';
      sctx.textAlign = 'center';
      sctx.fillText(isEn ? 'TIME' : 'THỜI GIAN', 240, 70);

      sctx.fillStyle = '#ffffff';
      sctx.font = '34px sans-serif';
      sctx.fillText(isEn ? '8:00 – 21:00' : '8H – 21H', 240, 160);
      sctx.fillText(isEn ? 'Oct 12 – 17, 2030' : '12 – 17/10/2030', 240, 230);

      // Right Column
      sctx.fillStyle = '#fef08a';
      sctx.font = 'bold 44px sans-serif';
      sctx.textAlign = 'center';
      sctx.fillText(isEn ? 'LOCATION' : 'ĐỊA ĐIỂM', 784, 70);

      sctx.fillStyle = '#ffffff';
      sctx.font = '34px sans-serif';
      sctx.fillText(isEn ? 'Thang Long Imperial Citadel' : 'Hoàng thành Thăng Long', 784, 150);
      sctx.fillText(isEn ? '19C Hoang Dieu,' : '19C Hoàng Diệu,', 784, 210);
      sctx.fillText(isEn ? 'Ba Dinh, Hanoi' : 'Ba Đình, Hà Nội', 784, 270);
    }
    schedTex.needsUpdate = true;
  }, [bilingualMode]);

  const resetView = () => {
    if (posterGroupRef.current) {
      posterGroupRef.current.rotation.set(0, 0, 0);
    }
    if (booleanGroupRef.current) {
      booleanGroupRef.current.rotation.set(0, 0, 0);
    }
    if (beachGroupRef.current) {
      beachGroupRef.current.rotation.set(0, 0, 0);
    }
    setSelectedLayerIndex(null);
  };

  const layerNamesVi = [
    '0. Nền răng cưa Union/Difference (Vàng & Xanh)',
    '1. Dãy sách gáy cong 3D & Giá sách',
    '2. Dây cờ tam giác đa sắc (Pennants)',
    '3. Hai bóng hội thoại (Vào cửa & Giảm giá)',
    '4. Vách ngăn nét đứt & Thời gian/Địa điểm',
    '5. Tiêu đề HỘI SÁCH HÀ NỘI'
  ];

  const layerNamesEn = [
    '0. Sawtooth Canvas (Gold & Blue Union/Difference)',
    '1. 3D Curved Spine Books & Wooden Shelf',
    '2. Multicolored Pennant Bunting Banner',
    '3. Two Speech Bubble Callouts (Free Entry & 70% Off)',
    '4. Dashed Stroke Divider & Event Metadata',
    '5. Headline Typography (HANOI BOOK FAIR)'
  ];

  return (
    <div
      className={`relative w-full rounded-3xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[540px] sm:h-[620px]'
      }`}
    >
      {/* 3D WebGL Canvas */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Floating Control Bar */}
      <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700 shadow-xl pointer-events-auto">
          <button
            type="button"
            onClick={() => {
              setActiveMode('poster');
              setSelectedLayerIndex(null);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'poster'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{bilingualMode === 'en' ? 'Exploded Poster 3D' : 'Phân rã Áp phích 3D (Hình 15.1)'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveMode('boolean');
              setSelectedLayerIndex(null);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'boolean'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>{bilingualMode === 'en' ? 'Boolean & Callouts' : 'Răng cưa & Bóng hội thoại (15.2, 15.6)'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveMode('beach');
              setSelectedLayerIndex(null);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'beach'
                ? 'bg-gradient-to-r from-sky-500 to-blue-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>{bilingualMode === 'en' ? 'Beach Diorama 3D' : 'Bãi biển Mùa hè (Hình 15.10)'}</span>
          </button>
        </div>

        {/* Global Action Tools */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700 shadow-xl pointer-events-auto">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title={isPlaying ? 'Pause Animation' : 'Play Animation'}
          >
            {isPlaying ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
          </button>

          <button
            type="button"
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            className={`p-1.5 rounded-xl transition-colors ${
              isAutoRotate ? 'text-amber-400 bg-amber-400/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Auto Rotate"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsWireframe(!isWireframe)}
            className={`p-1.5 rounded-xl transition-colors ${
              isWireframe ? 'text-cyan-400 bg-cyan-400/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Toggle Wireframe"
          >
            <Box className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={resetView}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-xs font-bold"
            title="Reset Orientation"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mode-Specific Bottom Parameter Drawer */}
      <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
        {activeMode === 'poster' && (
          <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-700/90 shadow-2xl pointer-events-auto space-y-2.5 max-w-2xl mx-auto">
            <div className="flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-200">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>
                  {bilingualMode === 'en'
                    ? 'Explode Z-Order Depth (2D Flatten ↔ 3D Stratification):'
                    : 'Độ giãn tách lớp không gian Z (2D phẳng ↔ 3D phân tầng):'}
                </span>
              </div>
              <span className="font-mono font-bold text-amber-400 text-xs">
                {Math.round(layerExplosion * 100)}%
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {bilingualMode === 'en' ? '2D Flat' : 'Phẳng 2D'}
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={layerExplosion}
                onChange={(e) => setLayerExplosion(parseFloat(e.target.value))}
                className="w-full accent-amber-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {bilingualMode === 'en' ? '3D Exploded' : 'Tách 3D'}
              </span>
            </div>

            {/* Quick Layer Highlighter Badges */}
            <div className="pt-1.5 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[11px] pb-0.5">
              <span className="text-slate-400 font-bold shrink-0">
                {bilingualMode === 'en' ? 'Inspect Layer:' : 'Xem từng lớp:'}
              </span>
              {(bilingualMode === 'en' ? layerNamesEn : layerNamesVi).map((name, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedLayerIndex(selectedLayerIndex === idx ? null : idx)}
                  className={`px-2 py-0.5 rounded-lg font-semibold shrink-0 transition-all cursor-pointer ${
                    selectedLayerIndex === idx
                      ? 'bg-amber-500 text-slate-950 font-black'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  L{idx}
                </button>
              ))}
              {selectedLayerIndex !== null && (
                <button
                  type="button"
                  onClick={() => setSelectedLayerIndex(null)}
                  className="px-2 py-0.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 font-bold shrink-0"
                >
                  {bilingualMode === 'en' ? 'Show All' : 'Hiện tất cả'}
                </button>
              )}
            </div>
          </div>
        )}

        {activeMode === 'boolean' && (
          <div className="p-3 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-700/90 shadow-2xl pointer-events-auto max-w-xl mx-auto flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {bilingualMode === 'en'
                  ? 'Demonstrating Sawtooth Cutout (Difference) and Speech Bubble Assembly (Union).'
                  : 'Minh hoạ đục rãnh răng cưa bằng Difference và hàn mép bóng hội thoại bằng Union.'}
              </span>
            </div>
            <span className="font-mono text-emerald-400 font-bold">
              {bilingualMode === 'en' ? 'TB p. 83 & 84' : 'SGK Tr. 83 & 84'}
            </span>
          </div>
        )}

        {activeMode === 'beach' && (
          <div className="p-3 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-700/90 shadow-2xl pointer-events-auto max-w-xl mx-auto flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
              <span>
                {bilingualMode === 'en'
                  ? 'Application Task (Fig 15.10): Summer Beach composition with waves, parasol & striped ball.'
                  : 'Bài Vận dụng (Hình 15.10): Tác phẩm bãi biển mùa hè với sóng lượn Bézier, ô dù và bóng tròn.'}
              </span>
            </div>
            <span className="font-mono text-sky-400 font-bold">
              {bilingualMode === 'en' ? 'TB p. 85' : 'SGK Tr. 85'}
            </span>
          </div>
        )}
      </div>

      {/* Floating Instructions Helper */}
      <div className="absolute top-16 left-3 pointer-events-none hidden md:block">
        <div className="p-2.5 rounded-xl bg-slate-900/80 backdrop-blur-sm border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <div className="font-bold text-slate-200 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-indigo-400" />
            <span>{bilingualMode === 'en' ? '3D Navigation Guide' : 'Hướng dẫn tương tác 3D'}</span>
          </div>
          <div>• {bilingualMode === 'en' ? 'Left click + drag to orbit rotate' : 'Nhấp chuột trái + kéo để xoay'}</div>
          <div>• {bilingualMode === 'en' ? 'Scroll to zoom in / out' : 'Cuộn chuột để phóng to / thu nhỏ'}</div>
          <div>• {bilingualMode === 'en' ? 'Drag slider below to explode layers' : 'Kéo thanh trượt để tách lớp 3D'}</div>
        </div>
      </div>
    </div>
  );
};
