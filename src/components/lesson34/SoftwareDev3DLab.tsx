import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, Briefcase, RotateCw, ZoomIn, Info, CheckCircle2, Sparkles, Sliders, Code2, Users, Cpu, ShieldAlert, GitBranch, ArrowRight } from 'lucide-react';
import { useBook } from '../../context/BookContext';

interface SoftwareDev3DLabProps {
  initialMode?: 'sdlc' | 'roles' | 'tech_stack';
}

export const SoftwareDev3DLab: React.FC<SoftwareDev3DLabProps> = ({
  initialMode = 'sdlc'
}) => {
  const { bilingualMode } = useBook();
  const isVi = bilingualMode !== 'en';

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<'sdlc' | 'roles' | 'tech_stack'>(initialMode);

  // SDLC Wheel state
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [isRotating, setIsRotating] = useState<boolean>(true);

  // Roles state
  const [activeRoleId, setActiveRoleId] = useState<'engineer' | 'developer' | 'pm'>('engineer');

  // Tech stack state
  const [activeTechIndex, setActiveTechIndex] = useState<number>(0);

  // Three.js internal refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const sdlcStages = [
    {
      id: 1,
      nameVi: '1. Điều tra khảo sát (Survey & Requirements)',
      nameEn: '1. Requirement Surveying',
      shortVi: 'Khảo sát',
      shortEn: 'Survey',
      color: 0xef4444, // Red
      roleVi: 'Chuyên viên phân tích nghiệp vụ (Business Analyst - BA)',
      roleEn: 'Business Analyst (BA)',
      outputVi: 'Hồ sơ yêu cầu người dùng (User Requirements Document / BRD)',
      outputEn: 'User Requirements Document (BRD / URD)',
      costMultiplierVi: '1x (Chi phí sửa lỗi rẻ nhất)',
      costMultiplierEn: '1x (Lowest bug fix cost)',
      descVi: 'Tiếp xúc trực tiếp với khách hàng, tìm hiểu quy trình nghiệp vụ thực tế, ghi nhận các khó khăn và xác định mục tiêu của hệ thống phần mềm.',
      descEn: 'Engage directly with customers, observe real-world business workflows, identify pain points, and define software objectives.'
    },
    {
      id: 2,
      nameVi: '2. Phân tích hệ thống (Systems Analysis)',
      nameEn: '2. Systems Analysis',
      shortVi: 'Phân tích',
      shortEn: 'Analysis',
      color: 0x10b981, // Green
      roleVi: 'Kĩ sư phân tích hệ thống (System Analyst)',
      roleEn: 'System Analyst',
      outputVi: 'Tài liệu đặc tả yêu cầu phần mềm (SRS - Software Requirement Specification)',
      outputEn: 'Software Requirement Specification (SRS document)',
      costMultiplierVi: '5x chi phí sửa lỗi',
      costMultiplierEn: '5x bug fix cost',
      descVi: 'Mô hình hóa các yêu cầu, phân tích ca sử dụng (Use Cases), xây dựng luồng dữ liệu (Data Flow) và ràng buộc phi chức năng (bảo mật, hiệu năng).',
      descEn: 'Formalize requirements into models, analyze use cases, construct data flow diagrams, and define non-functional constraints (security, performance).'
    },
    {
      id: 3,
      nameVi: '3. Thiết kế hệ thống (Systems Design)',
      nameEn: '3. Systems Design',
      shortVi: 'Thiết kế',
      shortEn: 'Design',
      color: 0xf59e0b, // Amber
      roleVi: 'Kiến trúc sư phần mềm (Software Architect)',
      roleEn: 'Software Architect',
      outputVi: 'Bản thiết kế kiến trúc, lược đồ CSDL (ERD), thiết kế API và giao diện UI/UX',
      outputEn: 'Architecture blueprints, Database Schema (ERD), API specs, and UI/UX mockups',
      costMultiplierVi: '10x chi phí sửa lỗi',
      costMultiplierEn: '10x bug fix cost',
      descVi: 'Định hình kiến trúc tổng thể, phân rã các module, thiết kế lược đồ cơ sở dữ liệu quan hệ, giao diện tương tác và giải thuật tối ưu.',
      descEn: 'Design overall system architecture, decompose modules, structure relational databases, build interface designs, and optimize algorithms.'
    },
    {
      id: 4,
      nameVi: '4. Lập trình (Implementation & Coding)',
      nameEn: '4. Implementation & Coding',
      shortVi: 'Lập trình',
      shortEn: 'Coding',
      color: 0x8b5cf6, // Purple
      roleVi: 'Lập trình viên (Programmer / Software Developer)',
      roleEn: 'Programmer / Software Developer',
      outputVi: 'Mã nguồn chương trình (Source Code) và Cơ sở dữ liệu hoạt động',
      outputEn: 'Program source code and operational databases',
      costMultiplierVi: '20x chi phí sửa lỗi',
      costMultiplierEn: '20x bug fix cost',
      descVi: 'Dựa vào tài liệu thiết kế, các lập trình viên sử dụng ngôn ngữ lập trình (Python, Java, TypeScript, C++) để viết code và tạo lập CSDL chức năng.',
      descEn: 'Guided by design documents, developers use programming languages (Python, Java, TypeScript, C++) to write code and implement database functions.'
    },
    {
      id: 5,
      nameVi: '5. Kiểm thử (Testing & QA)',
      nameEn: '5. Testing & Quality Assurance',
      shortVi: 'Kiểm thử',
      shortEn: 'Testing',
      color: 0x3b82f6, // Blue
      roleVi: 'Kĩ sư kiểm thử chất lượng (QA / QC / Test Engineer)',
      roleEn: 'QA / Test Engineer',
      outputVi: 'Kịch bản kiểm thử (Test Cases) và Báo cáo lỗi (Bug Reports)',
      outputEn: 'Test cases, test suites, and bug tracking reports',
      costMultiplierVi: '50x chi phí sửa lỗi',
      costMultiplierEn: '50x bug fix cost',
      descVi: 'Phát hiện và loại bỏ các lỗi cú pháp, lỗi logic, kiểm tra bảo mật, kiểm tra khả năng chịu tải cao và kiểm tra tính thân thiện của giao diện.',
      descEn: 'Detect and eliminate syntax and logic errors, perform security audits, conduct load and stress tests, and verify user interface usability.'
    },
    {
      id: 6,
      nameVi: '6. Chuyển giao (Deployment & Handover)',
      nameEn: '6. Deployment & Handover',
      shortVi: 'Chuyển giao',
      shortEn: 'Deploy',
      color: 0x64748b, // Slate
      roleVi: 'Kĩ sư triển khai & Vận hành (DevOps / Deployment Engineer)',
      roleEn: 'DevOps / Deployment Engineer',
      outputVi: 'Hệ thống vận hành chính thức, dữ liệu khởi tạo, tài liệu hướng dẫn sử dụng',
      outputEn: 'Live production system, initialized database, and user manuals',
      costMultiplierVi: '70x chi phí sửa lỗi',
      costMultiplierEn: '70x bug fix cost',
      descVi: 'Cài đặt phần mềm lên máy chủ đám mây, khởi tạo dữ liệu ban đầu, đào tạo tập huấn cho người dùng cuối và chính thức nghiệm thu bàn giao.',
      descEn: 'Deploy software to cloud servers, seed initial data, conduct end-user training, and complete official acceptance handover.'
    },
    {
      id: 7,
      nameVi: '7. Bảo trì (Maintenance & Evolution)',
      nameEn: '7. Software Maintenance',
      shortVi: 'Bảo trì',
      shortEn: 'Maintain',
      color: 0x06b6d4, // Cyan
      roleVi: 'Đội ngũ Kĩ sư bảo trì & Hỗ trợ kỹ thuật (Maintenance Engineers)',
      roleEn: 'Maintenance Engineers',
      outputVi: 'Các bản vá lỗi (Patches), bản cập nhật tính năng mới (Updates v2.0, v3.0)',
      outputEn: 'Bug patches and major feature releases (Updates v2.0, v3.0)',
      costMultiplierVi: '100x chi phí nếu lỗi từ khâu phân tích!',
      costMultiplierEn: '100x cost if error originated in analysis stage!',
      descVi: 'Khắc phục sự cố phát sinh trong thực tế, nâng cấp tính năng mới và cải tiến giao diện. Đây là điểm khởi đầu cho một vòng đời phát triển phần mềm mới!',
      descEn: 'Resolve operational incidents in production, upgrade features, and refine user experience. This marks the start of the next software cycle!'
    }
  ];

  const roleProfiles = {
    engineer: {
      titleVi: 'Kĩ sư phần mềm (Software Architect / Engineer)',
      titleEn: 'Software Architect / Systems Engineer',
      analogyVi: 'Ví như "Kiến trúc sư trưởng" trong công trình xây dựng (SGK Trang 162)',
      analogyEn: 'Analogous to the Chief Architect in building construction (Page 162)',
      color: 0x3b82f6,
      focusVi: 'Thiết kế kiến trúc hệ thống, tổ chức CSDL, lựa chọn giải thuật và công nghệ',
      focusEn: 'System architecture, data modeling, algorithm selection, technology evaluation',
      keyTraitsVi: 'Hiểu biết sâu sắc nghiệp vụ ứng dụng, tư duy toán học, logic trừu tượng, tầm nhìn bao quát',
      keyTraitsEn: 'Deep domain business comprehension, mathematical rigor, architectural abstraction'
    },
    developer: {
      titleVi: 'Lập trình viên (Programmer / Coder)',
      titleEn: 'Programmer / Software Developer',
      analogyVi: 'Ví như "Thợ xây bậc cao" trực tiếp đặt từng viên gạch mã lệnh (SGK Trang 162)',
      analogyEn: 'Analogous to Master Builders laying each brick of source code (Page 162)',
      color: 0x8b5cf6,
      focusVi: 'Viết mã lệnh (coding), xây dựng chức năng, gỡ rối (debugging), tích hợp API',
      focusEn: 'Writing executable code, implementing functional modules, debugging, API integration',
      keyTraitsVi: 'Cẩn thận, tỉ mỉ, làm chủ môi trường lập trình và ngôn ngữ (Python, Java, C++, JS)',
      keyTraitsEn: 'Meticulous attention to detail, mastery of programming languages and IDE tools'
    },
    pm: {
      titleVi: 'Người quản trị dự án (Project Manager - PM)',
      titleEn: 'Software Project Manager (PM)',
      analogyVi: 'Hoạt động có tính bao trùm lên toàn bộ 7 công đoạn sản xuất (SGK Trang 161)',
      analogyEn: 'Overarching governance spanning all 7 software lifecycle stages (Page 161)',
      color: 0xf59e0b,
      focusVi: 'Lập kế hoạch tiến độ, điều phối nhân sự, tài chính, kiểm soát chất lượng và rủi ro',
      focusEn: 'Milestone planning, engineering squad coordination, budget, QA and risk control',
      keyTraitsVi: 'Tầm nhìn công nghệ, kỹ năng lãnh đạo, điều phối nguồn lực, giám sát tiến độ',
      keyTraitsEn: 'Strategic vision, leadership, resource allocation, cross-functional orchestration'
    }
  };

  const techBranches = [
    {
      id: 'web_cloud',
      nameVi: 'Web & Điện toán đám mây (Web & Cloud Backend)',
      nameEn: 'Web & Cloud Backend Systems',
      tech: 'Python (Django/FastAPI), Node.js, AWS, Docker, PostgreSQL',
      color: 0x3b82f6,
      demandVi: 'Cực cao (99%)',
      demandEn: 'Extremely High (99%)',
      salaryVi: '18 – 45 triệu VNĐ/tháng',
      salaryEn: '$800 – $2,000 / month',
      descVi: 'Xây dựng hạ tầng xử lý dữ liệu lớn, API microservices và lưu trữ phân tán cho hàng triệu người dùng.',
      descEn: 'Build large-scale data processing infrastructures, microservices APIs, and distributed cloud storage for millions of users.'
    },
    {
      id: 'ui_frontend',
      nameVi: 'Giao diện người dùng (UI / Frontend Development)',
      nameEn: 'UI / Frontend Development',
      tech: 'React, TypeScript, Next.js, Tailwind CSS, Vue',
      color: 0xec4899,
      demandVi: 'Rất cao (96%)',
      demandEn: 'Very High (96%)',
      salaryVi: '15 – 35 triệu VNĐ/tháng',
      salaryEn: '$700 – $1,500 / month',
      descVi: 'Tạo ra các giao diện trực quan, mượt mà, tương tác phản hồi tức thì và đáp ứng mọi kích thước màn hình.',
      descEn: 'Create intuitive, responsive, seamless web and desktop interfaces across all screen form factors.'
    },
    {
      id: 'ai_ml',
      nameVi: 'Trí tuệ nhân tạo & Máy học (AI / Machine Learning)',
      nameEn: 'AI & Machine Learning Engineering',
      tech: 'Python, PyTorch, TensorFlow, LLMs, Computer Vision',
      color: 0x10b981,
      demandVi: 'Tăng trưởng bùng nổ (98%)',
      demandEn: 'Explosive Growth (98%)',
      salaryVi: '25 – 60 triệu VNĐ/tháng',
      salaryEn: '$1,100 – $2,600 / month',
      descVi: 'Phát triển các mô hình học máy thông minh có khả năng nhận dạng giọng nói, thị giác máy tính và phân tích dự đoán.',
      descEn: 'Develop intelligent machine learning models for speech recognition, computer vision, and predictive analytics.'
    },
    {
      id: 'mobile_app',
      nameVi: 'Ứng dụng di động (Mobile App Development)',
      nameEn: 'Mobile App Engineering',
      tech: 'Flutter, React Native, Swift (iOS), Kotlin (Android)',
      color: 0x06b6d4,
      demandVi: 'Rất cao (95%)',
      demandEn: 'Very High (95%)',
      salaryVi: '18 – 40 triệu VNĐ/tháng',
      salaryEn: '$800 – $1,800 / month',
      descVi: 'Phát triển các ứng dụng thông minh trên điện thoại và máy tính bảng phục vụ đời sống, tài chính, giao hàng.',
      descEn: 'Build smart native and cross-platform apps on mobile and tablet devices for lifestyle, finance, and logistics.'
    },
    {
      id: 'game_dev',
      nameVi: 'Phát triển Games (Game Development)',
      nameEn: 'Game Development & Graphics',
      tech: 'Unity, Unreal Engine, C#, C++, 3D Shaders',
      color: 0xf59e0b,
      demandVi: 'Năng động (92%)',
      demandEn: 'Dynamic (92%)',
      salaryVi: '16 – 38 triệu VNĐ/tháng',
      salaryEn: '$700 – $1,600 / month',
      descVi: 'Xây dựng thế giới trò chơi điện tử 2D/3D sống động, xử lý vật lý mô phỏng và mạng đa người chơi thời gian thực.',
      descEn: 'Build immersive 2D/3D video game worlds, physics simulations, and real-time multiplayer networking.'
    },
    {
      id: 'blockchain',
      nameVi: 'Chuỗi khối & Bảo mật (BlockChain & Web3)',
      nameEn: 'BlockChain & Web3 Security',
      tech: 'Solidity, Rust, Cryptography, Smart Contracts',
      color: 0x8b5cf6,
      demandVi: 'Chuyên biệt cao (90%)',
      demandEn: 'High Specialization (90%)',
      salaryVi: '30 – 70 triệu VNĐ/tháng',
      salaryEn: '$1,300 – $3,000 / month',
      descVi: 'Hợp đồng thông minh phân tán, xác thực dữ liệu phi tập trung và giải pháp bảo mật mật mã học hiện đại.',
      descEn: 'Develop distributed smart contracts, decentralized consensus verification, and modern cryptographic solutions.'
    }
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clean old elements
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const width = container.clientWidth;
    const height = container.clientHeight || 460;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1d);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3.5, 7.8);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x60a5fa, 2.5, 15);
    pointLight.position.set(-4, 3, 3);
    scene.add(pointLight);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    groupRef.current = rootGroup;

    if (activeMode === 'sdlc') {
      // 3D 7-Segment SDLC Heptagon Wheel
      const radius = 2.5;
      const count = 7;
      const segmentArc = (Math.PI * 2) / count;

      sdlcStages.forEach((stage, i) => {
        const startAngle = i * segmentArc;
        const endAngle = (i + 1) * segmentArc;
        const isCurrent = activeStageIndex === i;

        // Custom Torus / Arc segment
        const shape = new THREE.Shape();
        const innerR = 1.6;
        const outerR = isCurrent ? 2.85 : 2.6;

        const arcSegments = 16;
        for (let j = 0; j <= arcSegments; j++) {
          const theta = startAngle + (j / arcSegments) * (endAngle - startAngle);
          const x = Math.cos(theta) * outerR;
          const y = Math.sin(theta) * outerR;
          if (j === 0) shape.moveTo(x, y);
          else shape.lineTo(x, y);
        }
        for (let j = arcSegments; j >= 0; j--) {
          const theta = startAngle + (j / arcSegments) * (endAngle - startAngle);
          const x = Math.cos(theta) * innerR;
          const y = Math.sin(theta) * innerR;
          shape.lineTo(x, y);
        }
        shape.closePath();

        const extrudeSettings = {
          depth: isCurrent ? 0.45 : 0.28,
          bevelEnabled: true,
          bevelSegments: 3,
          steps: 1,
          bevelSize: 0.04,
          bevelThickness: 0.04
        };

        const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        const mat = new THREE.MeshStandardMaterial({
          color: stage.color,
          roughness: 0.3,
          metalness: 0.4,
          emissive: stage.color,
          emissiveIntensity: isCurrent ? 0.6 : 0.1
        });

        const mesh = new THREE.Mesh(geom, mat);
        mesh.rotation.x = Math.PI / 2.3;
        mesh.position.y = isCurrent ? 0.2 : 0;
        rootGroup.add(mesh);

        // Marker sphere on each segment
        const midAngle = startAngle + segmentArc / 2;
        const markerR = (innerR + outerR) / 2;
        const mx = Math.cos(midAngle) * markerR;
        const my = Math.sin(midAngle) * markerR;

        const sphereGeo = new THREE.SphereGeometry(isCurrent ? 0.18 : 0.12, 16, 16);
        const sphereMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const sphere = new THREE.Mesh(sphereGeo, sphereMat);
        sphere.position.set(mx, my, isCurrent ? 0.3 : 0.15);
        mesh.add(sphere);
      });

      // Central Hub: Project Management (SGK Trang 161)
      const hubGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.4, 32);
      const hubMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.2,
        metalness: 0.8,
        emissive: 0x3b82f6,
        emissiveIntensity: 0.25
      });
      const hub = new THREE.Mesh(hubGeo, hubMat);
      hub.position.y = 0.1;
      rootGroup.add(hub);

      // Overarching umbrella ring hovering above
      const umbrellaGeo = new THREE.TorusGeometry(3.1, 0.06, 16, 64);
      const umbrellaMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.7 });
      const umbrellaRing = new THREE.Mesh(umbrellaGeo, umbrellaMat);
      umbrellaRing.rotation.x = Math.PI / 2.3;
      umbrellaRing.position.y = 0.8;
      rootGroup.add(umbrellaRing);
    } else if (activeMode === 'roles') {
      // 3 Pillars Architecture: Software Engineer, Developer, PM
      const pillars = [
        { id: 'engineer', x: -2.3, color: 0x3b82f6, height: 2.2, label: 'Architect' },
        { id: 'developer', x: 0, color: 0x8b5cf6, height: 1.8, label: 'Coder' },
        { id: 'pm', x: 2.3, color: 0xf59e0b, height: 2.6, label: 'Manager' }
      ];

      pillars.forEach((p) => {
        const isSelected = activeRoleId === p.id;
        const cylGeo = new THREE.CylinderGeometry(0.7, 0.8, p.height, 32);
        const cylMat = new THREE.MeshStandardMaterial({
          color: p.color,
          roughness: 0.3,
          metalness: 0.6,
          emissive: p.color,
          emissiveIntensity: isSelected ? 0.7 : 0.2
        });
        const pillarMesh = new THREE.Mesh(cylGeo, cylMat);
        pillarMesh.position.set(p.x, p.height / 2 - 1.2, 0);
        rootGroup.add(pillarMesh);

        // Floating Iconic Badge above Pillar
        const badgeGeo = new THREE.IcosahedronGeometry(0.35, 1);
        const badgeMat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          roughness: 0.1,
          metalness: 0.9,
          emissive: isSelected ? p.color : 0x000000,
          emissiveIntensity: 0.5
        });
        const badgeMesh = new THREE.Mesh(badgeGeo, badgeMat);
        badgeMesh.position.set(p.x, p.height - 1.2 + 0.6, 0);
        rootGroup.add(badgeMesh);

        // Connecting energy beam between pillars
        if (p.x < 2) {
          const beamPts = [
            new THREE.Vector3(p.x, 0.5, 0),
            new THREE.Vector3(p.x + 2.3, 0.5, 0)
          ];
          const beamGeo = new THREE.BufferGeometry().setFromPoints(beamPts);
          const beamMat = new THREE.LineBasicMaterial({ color: 0x64748b, transparent: true, opacity: 0.6 });
          const beam = new THREE.Line(beamGeo, beamMat);
          rootGroup.add(beam);
        }
      });
    } else {
      // Tech Stack Constellation (6 Branches)
      const centerGeo = new THREE.IcosahedronGeometry(0.8, 2);
      const centerMat = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        roughness: 0.1,
        metalness: 0.8,
        emissive: 0x2563eb,
        emissiveIntensity: 0.4
      });
      const centerCore = new THREE.Mesh(centerGeo, centerMat);
      rootGroup.add(centerCore);

      const count = techBranches.length;
      techBranches.forEach((tech, i) => {
        const angle = (i / count) * Math.PI * 2;
        const r = 2.7;
        const x = Math.cos(angle) * r;
        const z = Math.sin(angle) * r;
        const y = Math.sin(angle * 3) * 0.4;

        const isCur = activeTechIndex === i;

        const orbGeo = new THREE.SphereGeometry(isCur ? 0.45 : 0.3, 24, 24);
        const orbMat = new THREE.MeshStandardMaterial({
          color: tech.color,
          roughness: 0.2,
          metalness: 0.5,
          emissive: tech.color,
          emissiveIntensity: isCur ? 0.8 : 0.2
        });
        const orb = new THREE.Mesh(orbGeo, orbMat);
        orb.position.set(x, y, z);
        rootGroup.add(orb);

        // Beam
        const beamPts = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, z)];
        const beamGeo = new THREE.BufferGeometry().setFromPoints(beamPts);
        const beamMat = new THREE.LineBasicMaterial({
          color: tech.color,
          transparent: true,
          opacity: isCur ? 0.9 : 0.3
        });
        const beam = new THREE.Line(beamGeo, beamMat);
        rootGroup.add(beam);
      });
    }

    // Animation Loop
    let angle = 0;
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      if (rootGroup && isRotating) {
        if (activeMode === 'sdlc') {
          rootGroup.rotation.y += 0.003;
        } else if (activeMode === 'tech_stack') {
          rootGroup.rotation.y += 0.005;
        } else if (activeMode === 'roles') {
          angle += 0.008;
          rootGroup.rotation.y = Math.sin(angle) * 0.2;
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

    window.addEventListener('resize', handleResize);
    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(handleResize) : null;
    if (resizeObserver) {
      resizeObserver.observe(container);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [activeMode, activeStageIndex, activeRoleId, activeTechIndex, isRotating, isVi]);

  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl my-6 flex flex-col">
      {/* Top Header / Mode Switcher */}
      <div className="bg-slate-950/80 p-3 sm:p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                {isVi ? 'Phòng thí nghiệm 3D WebGL' : '3D WebGL Software Studio'}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-950 text-blue-300 border border-blue-800">
                Three.js Interactive
              </span>
            </div>
            <h4 className="font-bold text-white text-base">
              {isVi ? 'Vòng Đời Phát Triển & Bản Đồ Kĩ Sư Phần Mềm 3D' : '3D SDLC Wheel & Software Engineering Explorer'}
            </h4>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveMode('sdlc')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeMode === 'sdlc'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>{isVi ? '1. Vòng đời 7 Công đoạn 3D' : '1. 3D 7-Stage SDLC'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('roles')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeMode === 'roles'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{isVi ? '2. Ba Trụ Cột Nhân Lực 3D' : '2. 3 Core Roles'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('tech_stack')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeMode === 'tech_stack'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>{isVi ? '3. Hệ Sinh Thái Công Nghệ 4.0' : '3. Industry 4.0 Tech'}</span>
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Canvas Container */}
      <div className="relative w-full h-[450px] bg-slate-950">
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Floating Contextual Overlay */}
        <div className="absolute top-3 left-3 pointer-events-none flex flex-col gap-1.5 max-w-sm">
          <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-2.5 shadow-xl text-xs text-slate-300">
            {activeMode === 'sdlc' && (
              <div>
                <p className="font-bold text-blue-400 mb-1 flex items-center gap-1">
                  <GitBranch className="w-3.5 h-3.5" />
                  {isVi ? '7 Công đoạn Sản xuất Phần mềm (SGK Trang 160)' : '7 Foundational SDLC Stages'}
                </p>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {isVi
                    ? 'Bánh xe 7 phân đoạn khép kín được bao trùm bởi hoạt động Quản trị dự án (vành đai trung tâm). Bấm vào từng công đoạn bên dưới để xem chi tiết vai trò, tài liệu đầu ra và chi phí sửa lỗi.'
                    : 'A 7-stage closed cycle governed by central Project Management. Click stages below to inspect outputs, personnel, and error cost escalation.'}
                </p>
              </div>
            )}
            {activeMode === 'roles' && (
              <div>
                <p className="font-bold text-purple-400 mb-1 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {isVi ? 'Kiến trúc sư vs Thợ xây (SGK Trang 162)' : 'Architect vs Master Builder'}
                </p>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {isVi
                    ? 'So sánh kinh điển: Kĩ sư phần mềm (thiết kế kiến trúc) vs Lập trình viên (viết mã thực thi) vs Quản trị dự án (điều phối tiến độ & nguồn lực).'
                    : 'The classic paradigm: Software Engineer (Architect) vs Programmer (Builder) vs Project Manager (Coordinator).'}
                </p>
              </div>
            )}
            {activeMode === 'tech_stack' && (
              <div>
                <p className="font-bold text-emerald-400 mb-1 flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5" />
                  {isVi ? '6 Nhánh Nghề Nghiệp Phần Mềm 4.0 (SGK Trang 163)' : '6 Software Domains in Industry 4.0'}
                </p>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {isVi
                    ? 'Khám phá các lĩnh vực việc làm bùng nổ: AI/ML, Cloud Backend, UI/UX, Mobile App, Game Dev và Blockchain tại Việt Nam.'
                    : 'Explore burgeoning career avenues: AI/ML, Cloud Systems, UI Frontend, Mobile, Games, and Blockchain in Vietnam.'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Rotate Toggle in Canvas */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsRotating(!isRotating)}
            className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
            <span>{isRotating ? (isVi ? 'Tạm dừng xoay' : 'Pause Orbit') : (isVi ? 'Tự động xoay' : 'Auto Orbit')}</span>
          </button>
        </div>
      </div>

      {/* Control Panel Below Canvas */}
      <div className="p-4 bg-slate-950/95 border-t border-slate-800">
        {activeMode === 'sdlc' && (
          <div className="space-y-3">
            {/* 7 Stage Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5">
              {sdlcStages.map((stage, idx) => (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveStageIndex(idx)}
                  className={`p-2 rounded-xl text-left transition-all border cursor-pointer ${
                    activeStageIndex === idx
                      ? 'bg-slate-800 border-blue-500 shadow-md text-white ring-1 ring-blue-500/40'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: `#${stage.color.toString(16).padStart(6, '0')}` }}
                    />
                    <span className="text-[11px] font-bold truncate">
                      {isVi ? stage.shortVi : stage.shortEn}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono block">
                    {isVi ? `Bước ${stage.id}` : `Stage ${stage.id}`}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Stage Detail Card */}
            {sdlcStages[activeStageIndex] && (
              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs grid grid-cols-1 md:grid-cols-3 gap-3 animate-in fade-in">
                <div>
                  <span className="text-slate-500 font-medium block mb-0.5">
                    {isVi ? 'Nhân sự đảm nhiệm chính:' : 'Responsible Role:'}
                  </span>
                  <p className="font-bold text-blue-300">
                    {isVi ? sdlcStages[activeStageIndex].roleVi : sdlcStages[activeStageIndex].roleEn}
                  </p>
                  <span className="text-slate-500 font-medium block mt-2 mb-0.5">
                    {isVi ? 'Sản phẩm đầu ra (Deliverable):' : 'Stage Deliverable:'}
                  </span>
                  <p className="text-slate-200 font-medium">
                    {isVi ? sdlcStages[activeStageIndex].outputVi : sdlcStages[activeStageIndex].outputEn}
                  </p>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">
                      {isVi ? 'Mô tả công việc chuẩn SGK Trang 160 – 161:' : 'Textbook Description:'}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-800">
                      ⚠️ {isVi ? sdlcStages[activeStageIndex].costMultiplierVi : sdlcStages[activeStageIndex].costMultiplierEn}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {isVi ? sdlcStages[activeStageIndex].descVi : sdlcStages[activeStageIndex].descEn}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeMode === 'roles' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {(['engineer', 'developer', 'pm'] as const).map((rId) => {
                const profile = roleProfiles[rId];
                const isSelected = activeRoleId === rId;
                return (
                  <button
                    key={rId}
                    type="button"
                    onClick={() => setActiveRoleId(rId)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-800 border-purple-500 text-white shadow-md ring-2 ring-purple-500/20'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: `#${profile.color.toString(16).padStart(6, '0')}` }}
                      />
                      <span className="font-bold text-xs sm:text-sm text-white">{isVi ? profile.titleVi.split('(')[0] : profile.titleEn.split('/')[0]}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{isVi ? profile.analogyVi : profile.analogyEn}</p>
                  </button>
                );
              })}
            </div>

            {/* Role Profile Deep Inspection */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-slate-500 font-medium block mb-1">
                  {isVi ? 'Trọng tâm công việc (Focus):' : 'Core Responsibilities:'}
                </span>
                <p className="text-slate-200 leading-relaxed font-medium">
                  {isVi ? roleProfiles[activeRoleId].focusVi : roleProfiles[activeRoleId].focusEn}
                </p>
              </div>
              <div>
                <span className="text-slate-500 font-medium block mb-1">
                  {isVi ? 'Tố chất & Kĩ năng then chốt (SGK Trang 162):' : 'Key Prerequisites & Traits:'}
                </span>
                <p className="text-slate-200 leading-relaxed font-medium">
                  {isVi ? roleProfiles[activeRoleId].keyTraitsVi : roleProfiles[activeRoleId].keyTraitsEn}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeMode === 'tech_stack' && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {techBranches.map((tech, idx) => (
                <button
                  key={tech.id}
                  type="button"
                  onClick={() => setActiveTechIndex(idx)}
                  className={`p-2 rounded-xl text-left transition-all border cursor-pointer ${
                    activeTechIndex === idx
                      ? 'bg-slate-800 border-emerald-500 shadow-md text-white'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: `#${tech.color.toString(16).padStart(6, '0')}` }}
                    />
                    <span className="text-[11px] font-bold truncate">
                      {isVi ? tech.nameVi.split('(')[0] : tech.nameEn.split('(')[0]}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono block">
                    {isVi ? tech.demandVi : tech.demandEn}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Tech Detail Card */}
            {techBranches[activeTechIndex] && (
              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <span className="text-slate-500 font-medium block mb-0.5">
                    {isVi ? 'Công nghệ & Ngôn ngữ tiêu biểu:' : 'Technology & Frameworks:'}
                  </span>
                  <p className="font-mono font-bold text-amber-300">
                    {techBranches[activeTechIndex].tech}
                  </p>
                </div>
                <div>
                  <span className="text-slate-500 font-medium block mb-0.5">
                    {isVi ? 'Mô tả chuyên môn:' : 'Domain Specialization:'}
                  </span>
                  <p className="text-slate-200">
                    {isVi ? techBranches[activeTechIndex].descVi : techBranches[activeTechIndex].descEn}
                  </p>
                </div>
                <div>
                  <span className="text-slate-500 font-medium block mb-0.5">
                    {isVi ? 'Thu nhập tham khảo thị trường Việt Nam:' : 'Estimated Salary Range in Vietnam:'}
                  </span>
                  <p className="font-mono font-bold text-emerald-400">
                    {isVi ? techBranches[activeTechIndex].salaryVi : techBranches[activeTechIndex].salaryEn}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
