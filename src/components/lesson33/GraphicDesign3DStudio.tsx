import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, Briefcase, Printer, Eye, RotateCw, ZoomIn, Info, CheckCircle2, Sparkles, Sliders } from 'lucide-react';
import { useBook } from '../../context/BookContext';

interface GraphicDesign3DStudioProps {
  initialMode?: 'layers' | 'career_tree' | 'print_press';
}

export const GraphicDesign3DStudio: React.FC<GraphicDesign3DStudioProps> = ({
  initialMode = 'layers'
}) => {
  const { bilingualMode } = useBook();
  const isVi = bilingualMode !== 'en';

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<'layers' | 'career_tree' | 'print_press'>(initialMode);
  
  // Layer Stack controls
  const [layerSpread, setLayerSpread] = useState<number>(1.2);
  const [colorMode, setColorMode] = useState<'RGB' | 'CMYK'>('RGB');
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number | null>(null);

  // Career Tree controls
  const [activeCareerIndex, setActiveCareerIndex] = useState<number>(0);

  // Print controls
  const [dpiSetting, setDpiSetting] = useState<number>(300);
  const [galleryLight, setGalleryLight] = useState<'warm' | 'daylight' | 'cyber'>('warm');

  // Animation & three refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const careerNodes = [
    {
      id: 'branding',
      titleVi: 'Thiết kế Nhận diện thương hiệu (Brand Identity)',
      titleEn: 'Brand Identity & Logo Design',
      software: 'Illustrator, CorelDraw, Photoshop',
      color: 0xf59e0b,
      skillsVi: 'Sáng tạo logo, hệ thống màu sắc, kiểu chữ đồng bộ, tư duy biểu tượng',
      skillsEn: 'Logo crafting, color systems, unified typography, iconographic symbolism',
      workplaceVi: 'Agency thiết kế, công ty xây dựng thương hiệu, chuyên viên nội bộ tập đoàn',
      workplaceEn: 'Design agencies, brand consultancy firms, corporate in-house studios',
      demandVi: 'Rất cao (98%)',
      demandEn: 'Very High (98%)'
    },
    {
      id: 'uiux',
      titleVi: 'Thiết kế Giao diện số (UI/UX Design)',
      titleEn: 'Digital UI/UX & Web Design',
      software: 'Figma, Adobe XD, Photoshop, Illustrator',
      color: 0x3b82f6,
      skillsVi: 'Bố cục màn hình, trải nghiệm người dùng, thiết kế đáp ứng (Responsive), wireframing',
      skillsEn: 'Screen layouts, user experience, responsive web/app systems, wireframing',
      workplaceVi: 'Công ty công nghệ, xưởng phần mềm, startup, ngân hàng số',
      workplaceEn: 'Tech companies, software development studios, startups, digital banking',
      demandVi: 'Cực cao (99%)',
      demandEn: 'Extremely High (99%)'
    },
    {
      id: 'print',
      titleVi: 'Thiết kế In ấn & Xuất bản (Editorial & Print)',
      titleEn: 'Print & Editorial Publishing Design',
      software: 'InDesign, Scribus, Photoshop, Illustrator',
      color: 0x10b981,
      skillsVi: 'Dàn trang sách báo, hiểu biết công nghệ in ấn, hệ màu CMYK, khổ giấy chuẩn',
      skillsEn: 'Editorial typography, prepress mastery, CMYK offset calibration, bleed & trim',
      workplaceVi: 'Toà soạn báo chí, nhà xuất bản, xưởng in bao bì công nghiệp',
      workplaceEn: 'Newspaper publishing houses, editorial offices, industrial packaging print shops',
      demandVi: 'Ổn định (90%)',
      demandEn: 'Stable (90%)'
    },
    {
      id: 'advertising',
      titleVi: 'Đồ hoạ Quảng cáo & Truyền thông (Advertising)',
      titleEn: 'Marketing & Advertising Graphics',
      software: 'Photoshop, Illustrator, Canva Pro, Premiere',
      color: 0xec4899,
      skillsVi: 'Áp phích truyền thông, banner mạng xã hội, tờ rơi tiếp thị, tâm lý khách hàng',
      skillsEn: 'Promo posters, social media key visuals, marketing collateral, consumer psychology',
      workplaceVi: 'Công ty truyền thông quảng cáo, sàn thương mại điện tử, agency sự kiện',
      workplaceEn: 'Media advertising agencies, e-commerce platforms, event management firms',
      demandVi: 'Rất cao (96%)',
      demandEn: 'Very High (96%)'
    },
    {
      id: 'motion3d',
      titleVi: 'Thiết kế 3D & Hoạt hình (3D & Motion Graphics)',
      titleEn: '3D Animation & Motion Design',
      software: 'Blender, Maya, Cinema 4D, After Effects',
      color: 0x8b5cf6,
      skillsVi: 'Dựng hình 3D, tạo chuyển động, vật liệu chiếu sáng, kỹ xảo điện ảnh',
      skillsEn: '3D polygon modeling, keyframing, shader lighting, visual cinematography',
      workplaceVi: 'Xưởng phim hoạt hình, studio game, đài truyền hình, công ty hiệu ứng',
      workplaceEn: 'Animation studios, game production houses, television broadcasting, VFX companies',
      demandVi: 'Tăng trưởng nhanh (94%)',
      demandEn: 'Rapid Growth (94%)'
    },
    {
      id: 'cad_arch',
      titleVi: 'Đồ hoạ Kĩ thuật & Kiến trúc (CAD & Architectural)',
      titleEn: 'CAD & Technical Architectural Drafting',
      software: 'AutoCAD, SolidWorks, Revit, SketchUp',
      color: 0x06b6d4,
      skillsVi: 'Bản vẽ mặt bằng kĩ thuật, phối cảnh 3D công trình, tiêu chuẩn cơ khí chính xác',
      skillsEn: 'Technical floor drafting, 3D architectural perspective, precision mechanics',
      workplaceVi: 'Văn phòng kiến trúc sư (Hình 33.1), công ty cơ khí, nhà thầu xây dựng',
      workplaceEn: 'Architectural firms (Fig 33.1), mechanical engineering companies, construction contractors',
      demandVi: 'Bền vững (92%)',
      demandEn: 'Sustainable (92%)'
    }
  ];

  const layerDefinitions = [
    {
      nameVi: 'Lớp 0: Nền & Bảng màu (Background Canvas)',
      nameEn: 'Layer 0: Background Canvas & Color Field',
      descVi: 'Màu nền gradient mặt trời mọc rực rỡ tượng trưng cho buổi sáng Việt Nam',
      descEn: 'Warm sunrise color field evoking fresh Vietnamese morning hues',
      color: 0xfbbf24
    },
    {
      nameVi: 'Lớp 1: Hình khối Vector (Vector Architectural Silhouettes)',
      nameEn: 'Layer 1: Vector Heritage Silhouettes',
      descVi: 'Đường nét Tháp Rùa Hồ Gươm và cảnh quan danh thắng kiến trúc',
      descEn: 'Vector contours of Turtle Tower, pagoda eaves, and landscape contours',
      color: 0xe11d48
    },
    {
      nameVi: 'Lớp 2: Nhân vật & Ảnh chụp nghệ thuật (Illustrations & Subjects)',
      nameEn: 'Layer 2: Illustrative & Photographic Focal Subjects',
      descVi: 'Hình ảnh cô gái nón lá chèo thuyền buồm trên sông và đài sen',
      descEn: 'Conical hat rower on traditional sampan and blooming lotus blossom',
      color: 0x0ea5e9
    },
    {
      nameVi: 'Lớp 3: Nghệ thuật Kiểu chữ (Typography Headlines)',
      nameEn: 'Layer 3: Typographic Hierarchy & Slogan',
      descVi: 'Tiêu đề chữ "VIETNAM - Vẻ đẹp bất tận" với phông chữ đặc trưng thanh lịch',
      descEn: 'Headline typography "VIETNAM - Timeless Charm" with elegant kerning',
      color: 0xffffff
    },
    {
      nameVi: 'Lớp 4: Nhận diện & Điểm nhấn (Brand Accents & Seals)',
      nameEn: 'Layer 4: Brand Badges, Star & Seals',
      descVi: 'Ngôi sao vàng truyền thống, logo du lịch quốc gia và khung viền ấn phẩm',
      descEn: 'National gold star insignia, tourism mark, and publication bleed border',
      color: 0xfacc15
    }
  ];

  // Canvas 2D texture helpers
  const createPosterLayerTexture = (layerIdx: number, mode: 'RGB' | 'CMYK', dpi: number): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    // Simulate resolution scale by DPI
    const res = dpi >= 300 ? 512 : dpi >= 150 ? 256 : 128;
    canvas.width = res;
    canvas.height = Math.round(res * 1.414); // A4 proportion
    const ctx = canvas.getContext('2d');

    if (!ctx) return new THREE.CanvasTexture(canvas);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const isCMYK = mode === 'CMYK';

    if (layerIdx === 0) {
      // Layer 0: Gradient Background
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      if (isCMYK) {
        grad.addColorStop(0, '#f2e3c6');
        grad.addColorStop(0.5, '#e8985e');
        grad.addColorStop(1, '#2f6575');
      } else {
        grad.addColorStop(0, '#fef08a');
        grad.addColorStop(0.4, '#fb923c');
        grad.addColorStop(1, '#0284c7');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Sun disc
      ctx.beginPath();
      ctx.arc(canvas.width * 0.75, canvas.height * 0.25, canvas.width * 0.18, 0, Math.PI * 2);
      ctx.fillStyle = isCMYK ? '#e69500' : '#f59e0b';
      ctx.fill();
    } else if (layerIdx === 1) {
      // Layer 1: Vector Pagoda & Mountain Silhouettes
      ctx.fillStyle = isCMYK ? 'rgba(35, 75, 45, 0.9)' : 'rgba(21, 128, 61, 0.95)';
      // Stylized tower
      const cx = canvas.width * 0.78;
      const cy = canvas.height * 0.65;
      const w = canvas.width * 0.22;
      ctx.fillRect(cx - w / 2, cy - w * 0.6, w, w * 0.6);
      ctx.fillRect(cx - w * 0.35, cy - w * 1.1, w * 0.7, w * 0.5);
      ctx.beginPath();
      ctx.moveTo(cx - w * 0.5, cy - w * 1.1);
      ctx.lineTo(cx + w * 0.5, cy - w * 1.1);
      ctx.lineTo(cx, cy - w * 1.5);
      ctx.closePath();
      ctx.fill();

      // Distant mountains
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.7);
      ctx.lineTo(canvas.width * 0.3, canvas.height * 0.52);
      ctx.lineTo(canvas.width * 0.6, canvas.height * 0.68);
      ctx.lineTo(canvas.width, canvas.height * 0.62);
      ctx.lineTo(canvas.width, canvas.height * 0.75);
      ctx.lineTo(0, canvas.height * 0.75);
      ctx.closePath();
      ctx.fillStyle = isCMYK ? 'rgba(40, 60, 80, 0.7)' : 'rgba(30, 64, 175, 0.75)';
      ctx.fill();
    } else if (layerIdx === 2) {
      // Layer 2: Sampan boat, conical hat & water lotus
      const bx = canvas.width * 0.45;
      const by = canvas.height * 0.72;
      // Boat
      ctx.beginPath();
      ctx.ellipse(bx, by, canvas.width * 0.32, canvas.height * 0.04, -0.05, 0, Math.PI * 2);
      ctx.fillStyle = isCMYK ? '#222930' : '#1e293b';
      ctx.fill();

      // Person in red shirt with conical hat
      ctx.beginPath();
      ctx.arc(bx - canvas.width * 0.05, by - canvas.height * 0.05, canvas.width * 0.04, 0, Math.PI * 2);
      ctx.fillStyle = isCMYK ? '#b83b3b' : '#dc2626';
      ctx.fill();

      // Conical hat
      ctx.beginPath();
      ctx.moveTo(bx - canvas.width * 0.12, by - canvas.height * 0.05);
      ctx.lineTo(bx + canvas.width * 0.02, by - canvas.height * 0.05);
      ctx.lineTo(bx - canvas.width * 0.05, by - canvas.height * 0.12);
      ctx.closePath();
      ctx.fillStyle = isCMYK ? '#d4b26f' : '#fde047';
      ctx.fill();

      // Water ripples & lotus
      ctx.strokeStyle = isCMYK ? '#4682b4' : '#38bdf8';
      ctx.lineWidth = Math.max(1, Math.round(res / 150));
      ctx.beginPath();
      ctx.arc(bx, by + 15, canvas.width * 0.35, 0.1, Math.PI * 0.9);
      ctx.stroke();
    } else if (layerIdx === 3) {
      // Layer 3: Typography "VIETNAM" & Slogan
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur = Math.round(res / 60);

      const titleSize = Math.round(canvas.width * 0.13);
      ctx.font = `900 ${titleSize}px sans-serif`;
      ctx.fillText('VIETNAM', canvas.width / 2, canvas.height * 0.18);

      ctx.shadowBlur = 0;
      const subSize = Math.round(canvas.width * 0.042);
      ctx.font = `italic 600 ${subSize}px sans-serif`;
      ctx.fillStyle = isCMYK ? '#f8eedb' : '#fef08a';
      ctx.fillText(isVi ? 'Vẻ đẹp bất tận • Timeless Charm' : 'Timeless Charm • Endless Beauty', canvas.width / 2, canvas.height * 0.23);
    } else if (layerIdx === 4) {
      // Layer 4: National gold star & decorative border
      ctx.strokeStyle = isCMYK ? '#e5ad35' : '#facc15';
      ctx.lineWidth = Math.max(2, Math.round(res / 100));
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

      // Gold star icon
      const sx = canvas.width * 0.25;
      const sy = canvas.height * 0.35;
      ctx.fillStyle = isCMYK ? '#e53e3e' : '#ef4444';
      ctx.fillRect(sx - 18, sy - 12, 36, 24);
      ctx.fillStyle = isCMYK ? '#f6e05e' : '#fde047';
      ctx.beginPath();
      ctx.arc(sx, sy, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clean old canvas if any
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const width = container.clientWidth;
    const height = container.clientHeight || 480;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090d16);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 8, 6);
    scene.add(dirLight);

    const coloredPoint = new THREE.PointLight(
      galleryLight === 'warm' ? 0xf59e0b : galleryLight === 'cyber' ? 0x06b6d4 : 0x60a5fa,
      2.5,
      15
    );
    coloredPoint.position.set(-3, 3, 4);
    scene.add(coloredPoint);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    groupRef.current = rootGroup;

    // Build scene based on active mode
    if (activeMode === 'layers') {
      // Build 5 separate planes floating along Z axis
      const planeGeo = new THREE.PlaneGeometry(2.4, 2.4 * 1.414);
      const layerMeshes: THREE.Mesh[] = [];

      layerDefinitions.forEach((def, i) => {
        const texture = createPosterLayerTexture(i, colorMode, dpiSetting);
        const mat = new THREE.MeshStandardMaterial({
          map: texture,
          transparent: true,
          opacity: selectedLayerIndex === null ? 0.95 : selectedLayerIndex === i ? 1.0 : 0.25,
          roughness: 0.25,
          metalness: 0.1,
          side: THREE.DoubleSide
        });

        const mesh = new THREE.Mesh(planeGeo, mat);
        // Position along Z axis
        const zPos = (i - 2) * layerSpread;
        mesh.position.set(0, 0, zPos);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        rootGroup.add(mesh);
        layerMeshes.push(mesh);

        // Add subtle bounding wireframe for design grid inspection
        const edges = new THREE.EdgesGeometry(planeGeo);
        const lineMat = new THREE.LineBasicMaterial({
          color: def.color,
          transparent: true,
          opacity: 0.6
        });
        const wireframe = new THREE.LineSegments(edges, lineMat);
        mesh.add(wireframe);
      });

      // Angled isometric camera view
      rootGroup.rotation.y = -0.45;
      rootGroup.rotation.x = 0.2;
    } else if (activeMode === 'career_tree') {
      // Central Node: Computer Graphic Designer
      const centerGeo = new THREE.IcosahedronGeometry(0.7, 2);
      const centerMat = new THREE.MeshStandardMaterial({
        color: 0xec4899,
        roughness: 0.2,
        metalness: 0.8,
        emissive: 0xdb2777,
        emissiveIntensity: 0.3
      });
      const centerMesh = new THREE.Mesh(centerGeo, centerMat);
      rootGroup.add(centerMesh);

      // Orbit ring
      const orbitCurve = new THREE.EllipseCurve(0, 0, 2.8, 2.8, 0, 2 * Math.PI, false, 0);
      const orbitPoints = orbitCurve.getPoints(64);
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(
        orbitPoints.map((p) => new THREE.Vector3(p.x, p.y, 0))
      );
      const orbitMat = new THREE.LineBasicMaterial({ color: 0x475569, transparent: true, opacity: 0.4 });
      const orbitLine = new THREE.Line(orbitGeo, orbitMat);
      orbitLine.rotation.x = Math.PI / 2.3;
      rootGroup.add(orbitLine);

      // 6 Career Nodes around orbit
      const count = careerNodes.length;
      careerNodes.forEach((node, i) => {
        const angle = (i / count) * Math.PI * 2;
        const radius = 2.8;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(angle * 2) * 0.4;

        const isSelected = activeCareerIndex === i;

        const nodeGeo = new THREE.SphereGeometry(isSelected ? 0.42 : 0.3, 24, 24);
        const nodeMat = new THREE.MeshStandardMaterial({
          color: node.color,
          roughness: 0.2,
          metalness: 0.5,
          emissive: node.color,
          emissiveIntensity: isSelected ? 0.8 : 0.2
        });
        const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
        nodeMesh.position.set(x, y, z);
        rootGroup.add(nodeMesh);

        // Connecting energy beam to center
        const beamPoints = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, z)];
        const beamGeo = new THREE.BufferGeometry().setFromPoints(beamPoints);
        const beamMat = new THREE.LineBasicMaterial({
          color: node.color,
          transparent: true,
          opacity: isSelected ? 0.9 : 0.35,
          linewidth: isSelected ? 2 : 1
        });
        const beamLine = new THREE.Line(beamGeo, beamMat);
        rootGroup.add(beamLine);

        // Satellites for software badges
        const satGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);
        const satMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const satMesh = new THREE.Mesh(satGeo, satMat);
        satMesh.position.set(x + 0.35, y + 0.35, z);
        rootGroup.add(satMesh);
      });
    } else {
      // print_press / 3D Gallery Pedestal
      // Gallery Pedestal Base
      const baseGeo = new THREE.CylinderGeometry(1.5, 1.8, 0.4, 32);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.4,
        metalness: 0.6
      });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      baseMesh.position.set(0, -1.8, 0);
      rootGroup.add(baseMesh);

      // Glass frame holding the completed poster
      const frameGeo = new THREE.BoxGeometry(2.6, 2.6 * 1.414, 0.08);
      const frameMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.1,
        metalness: 0.9
      });
      const frameMesh = new THREE.Mesh(frameGeo, frameMat);
      frameMesh.position.set(0, 0.2, 0);
      rootGroup.add(frameMesh);

      // Poster canvas on front face
      const posterCanvas = document.createElement('canvas');
      posterCanvas.width = 512;
      posterCanvas.height = Math.round(512 * 1.414);
      const pctx = posterCanvas.getContext('2d');
      if (pctx) {
        // Draw combined poster
        [0, 1, 2, 3, 4].forEach((idx) => {
          const layerTex = createPosterLayerTexture(idx, colorMode, dpiSetting);
          if (layerTex.image) {
            pctx.drawImage(layerTex.image, 0, 0, posterCanvas.width, posterCanvas.height);
          }
        });
      }
      const posterTex = new THREE.CanvasTexture(posterCanvas);
      const printMat = new THREE.MeshStandardMaterial({
        map: posterTex,
        roughness: 0.3,
        metalness: 0.05
      });
      const posterMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.45, 2.45 * 1.414), printMat);
      posterMesh.position.set(0, 0.2, 0.05);
      rootGroup.add(posterMesh);

      // Spotlights overhead
      const spotLight = new THREE.SpotLight(0xfff5e6, 3);
      spotLight.position.set(0, 4, 3);
      spotLight.angle = Math.PI / 4;
      spotLight.penumbra = 0.4;
      scene.add(spotLight);
    }

    // Animation loop
    let angle = 0;
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      if (rootGroup) {
        if (activeMode === 'career_tree') {
          rootGroup.rotation.y += 0.005;
        } else if (activeMode === 'print_press') {
          angle += 0.008;
          rootGroup.rotation.y = Math.sin(angle) * 0.35;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 460;
      if (w <= 0 || h <= 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    window.addEventListener('resize', handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [activeMode, layerSpread, colorMode, selectedLayerIndex, activeCareerIndex, dpiSetting, galleryLight, isVi]);

  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl my-6 flex flex-col">
      {/* Top Header / Mode Switcher */}
      <div className="bg-slate-950/80 p-3 sm:p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                {isVi ? 'Phòng thí nghiệm 3D WebGL' : '3D WebGL Laboratory'}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-rose-950 text-rose-300 border border-rose-800">
                Three.js Interactive
              </span>
            </div>
            <h4 className="font-bold text-white text-base">
              {isVi ? 'Studio Thiết Kế Đồ Hoạ & Bản Đồ Nghề Nghiệp 3D' : 'Graphic Design Studio & 3D Career Navigator'}
            </h4>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveMode('layers')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeMode === 'layers'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isVi ? '1. Bố cục Đa tầng 3D' : '1. 3D Layer Stack'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('career_tree')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeMode === 'career_tree'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>{isVi ? '2. Bản đồ Kĩ năng 3D' : '2. 3D Career Constellation'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('print_press')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeMode === 'print_press'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{isVi ? '3. Thử nghiệm In ấn 3D' : '3. 3D Print Exhibition'}</span>
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Canvas Container */}
      <div className="relative w-full h-[460px] bg-slate-950">
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Floating Contextual Badges / Help overlay */}
        <div className="absolute top-3 left-3 pointer-events-none flex flex-col gap-1.5 max-w-sm">
          <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-2.5 shadow-xl text-xs text-slate-300">
            {activeMode === 'layers' && (
              <div>
                <p className="font-bold text-rose-400 mb-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {isVi ? 'Phân rã Đa tầng Hình ảnh (SGK Trang 156)' : 'Exploded Layer Decomposition'}
                </p>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {isVi
                    ? 'Hình ảnh đồ hoạ gồm nhiều thành phần: Văn bản, vector, ảnh chụp, màu sắc. Người thiết kế lựa chọn, vẽ, cắt, ghép và xếp lớp để tạo thông điệp truyền thông.'
                    : 'Graphic visuals comprise text, vector shapes, photographs, and colors layered seamlessly to convey powerful promotional messages.'}
                </p>
              </div>
            )}
            {activeMode === 'career_tree' && (
              <div>
                <p className="font-bold text-blue-400 mb-1 flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  {isVi ? '6 Chuyên ngành & Hướng nghiệp (SGK Trang 158 – 159)' : '6 Career Trajectories & Skill Nodes'}
                </p>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {isVi
                    ? 'Nhấp chọn từng vệ tinh quỹ đạo để xem bộ kĩ năng, công cụ phần mềm chuyên dụng và cơ hội việc làm tương ứng trong kỷ nguyên số.'
                    : 'Click orbit nodes to inspect specialized software suites, core prerequisites, and industry employment avenues.'}
                </p>
              </div>
            )}
            {activeMode === 'print_press' && (
              <div>
                <p className="font-bold text-emerald-400 mb-1 flex items-center gap-1">
                  <Printer className="w-3.5 h-3.5" />
                  {isVi ? 'Phòng trưng bày Áp phích & Tiêu chuẩn In ấn' : 'Poster Gallery & Printing Resolution'}
                </p>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {isVi
                    ? 'Mô phỏng áp phích quảng bá du lịch Việt Nam (Hình 33.2 SGK). Kiểm tra sự khác biệt giữa hệ màu CMYK/RGB và độ phân giải 72 DPI vs 300 DPI.'
                    : 'Simulate Vietnam Tourism Poster (Fig 33.2). Observe real-world distinctions between RGB vs CMYK color spaces and 72 DPI vs 300 DPI prepress output.'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Floating Quick Action in Canvas */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          {activeMode === 'layers' && (
            <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 text-xs font-mono text-slate-300 flex items-center gap-2">
              <span className="text-slate-400">{isVi ? 'Bóc tách:' : 'Spread:'}</span>
              <span className="text-rose-400 font-bold">{layerSpread.toFixed(1)}x</span>
            </div>
          )}
          {activeMode === 'print_press' && (
            <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 text-xs font-mono text-emerald-400 flex items-center gap-2">
              <span>{dpiSetting} DPI</span>
              <span className="text-slate-500">•</span>
              <span>{colorMode}</span>
            </div>
          )}
        </div>
      </div>

      {/* Control Panel Below Canvas */}
      <div className="p-4 bg-slate-950/95 border-t border-slate-800">
        {activeMode === 'layers' && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Slider for Layer Spread */}
              <div className="flex-1 min-w-[240px]">
                <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-rose-400" />
                    {isVi ? 'Khoảng cách phân rã các lớp (Explosion Distance):' : 'Layer Separation Distance:'}
                  </span>
                  <span className="font-mono text-rose-400 font-bold">{layerSpread.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2.5"
                  step="0.1"
                  value={layerSpread}
                  onChange={(e) => setLayerSpread(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>0.0x ({isVi ? 'Ghép phẳng 2D' : 'Flat 2D'})</span>
                  <span>1.2x ({isVi ? 'Cân bằng 3D' : 'Balanced'})</span>
                  <span>2.5x ({isVi ? 'Bóc tách cực đại' : 'Max Exploded'})</span>
                </div>
              </div>

              {/* Color Mode Toggle */}
              <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 font-medium px-1">
                  {isVi ? 'Hệ màu:' : 'Color Space:'}
                </span>
                <button
                  type="button"
                  onClick={() => setColorMode('RGB')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    colorMode === 'RGB'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  RGB ({isVi ? 'Màn hình' : 'Screen'})
                </button>
                <button
                  type="button"
                  onClick={() => setColorMode('CMYK')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    colorMode === 'CMYK'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  CMYK ({isVi ? 'In ấn' : 'Print'})
                </button>
              </div>
            </div>

            {/* Layer Selection Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={() => setSelectedLayerIndex(null)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedLayerIndex === null
                    ? 'bg-slate-700 text-white border border-slate-500'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {isVi ? 'Hiển thị tất cả lớp' : 'Show All Layers'}
              </button>
              {layerDefinitions.map((layer, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedLayerIndex(idx)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedLayerIndex === idx
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: `#${layer.color.toString(16).padStart(6, '0')}` }}
                  />
                  <span>
                    {isVi
                      ? layer.nameVi.split('(')[0].trim()
                      : layer.nameEn.split('&')[0].trim()}
                  </span>
                </button>
              ))}
            </div>

            {selectedLayerIndex !== null && (
              <div className="p-3 bg-slate-900/90 rounded-xl border border-rose-500/30 text-xs text-slate-300 animate-in fade-in">
                <span className="font-bold text-rose-400 mr-2">
                  {isVi ? layerDefinitions[selectedLayerIndex].nameVi : layerDefinitions[selectedLayerIndex].nameEn}:
                </span>
                <span>
                  {isVi ? layerDefinitions[selectedLayerIndex].descVi : layerDefinitions[selectedLayerIndex].descEn}
                </span>
              </div>
            )}
          </div>
        )}

        {activeMode === 'career_tree' && (
          <div className="space-y-3">
            {/* Career Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {careerNodes.map((node, idx) => (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setActiveCareerIndex(idx)}
                  className={`p-2 rounded-xl text-left transition-all border cursor-pointer ${
                    activeCareerIndex === idx
                      ? 'bg-slate-800 border-rose-500 shadow-md text-white'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: `#${node.color.toString(16).padStart(6, '0')}` }}
                    />
                    <span className="text-[11px] font-bold truncate">
                      {isVi ? node.titleVi.split('(')[0] : node.titleEn.split('&')[0]}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono block">
                    {isVi ? node.demandVi : node.demandEn}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Career Detail Card */}
            {careerNodes[activeCareerIndex] && (
              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <span className="text-slate-500 font-medium block mb-0.5">
                    {isVi ? 'Phần mềm chuyên dụng (SGK Trang 157):' : 'Specialized Software Suite:'}
                  </span>
                  <p className="font-mono font-bold text-amber-300">
                    {careerNodes[activeCareerIndex].software}
                  </p>
                </div>
                <div>
                  <span className="text-slate-500 font-medium block mb-0.5">
                    {isVi ? 'Kĩ năng & Tố chất cốt lõi (SGK Trang 158):' : 'Core Prerequisites & Aptitudes:'}
                  </span>
                  <p className="text-slate-200">
                    {isVi ? careerNodes[activeCareerIndex].skillsVi : careerNodes[activeCareerIndex].skillsEn}
                  </p>
                </div>
                <div>
                  <span className="text-slate-500 font-medium block mb-0.5">
                    {isVi ? 'Môi trường làm việc (SGK Trang 159):' : 'Employment Workplaces:'}
                  </span>
                  <p className="text-slate-200">
                    {isVi ? careerNodes[activeCareerIndex].workplaceVi : careerNodes[activeCareerIndex].workplaceEn}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeMode === 'print_press' && (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-300">
                {isVi ? 'Độ phân giải bản in:' : 'Prepress Resolution:'}
              </span>
              <div className="flex gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
                {[72, 150, 300].map((dpi) => (
                  <button
                    key={dpi}
                    type="button"
                    onClick={() => setDpiSetting(dpi)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      dpiSetting === dpi
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {dpi} DPI{' '}
                    {dpi === 72
                      ? isVi
                        ? '(Màn hình Web)'
                        : '(Web)'
                      : dpi === 150
                      ? isVi
                        ? '(Bản nháp)'
                        : '(Draft)'
                      : isVi
                      ? '(Chuẩn in ấn)'
                      : '(Print Standard)'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-300">
                {isVi ? 'Ánh sáng phòng trưng bày:' : 'Gallery Mood:'}
              </span>
              <div className="flex gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
                {(['warm', 'daylight', 'cyber'] as const).map((mood) => (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => setGalleryLight(mood)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      galleryLight === mood
                        ? 'bg-slate-700 text-white font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {mood === 'warm'
                      ? isVi
                        ? 'Ấm áp'
                        : 'Warm'
                      : mood === 'daylight'
                      ? isVi
                        ? 'Ban ngày'
                        : 'Daylight'
                      : 'Cyber'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
