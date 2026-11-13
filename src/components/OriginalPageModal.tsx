import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Info,
  ShieldCheck,
  ChevronDown,
  Check
} from 'lucide-react';
import { useBook } from '../context/BookContext';

export interface SgkPageItem {
  pageNumber: number;
  category: 'frontmatter' | 'lesson';
  label: string;
  badge: string;
  title: string;
  src: string;
  desc: string;
  keyTopics: string[];
  sectionPageIndex?: number; // Optional index in PAGE_SECTIONS
}

export const SGK_PAGES: SgkPageItem[] = [
  {
    pageNumber: 0,
    category: 'frontmatter',
    label: 'Bìa 1',
    badge: 'Bìa chính',
    title: 'Bìa chính: Sách giáo khoa Tin học 10 (KNTT)',
    src: '/assets/aistudio/image_012abbac.png',
    desc: 'Bìa chính thức Sách giáo khoa Tin học 10 • Bộ sách Kết nối tri thức với cuộc sống • Bộ Giáo dục và Đào tạo • NXB Giáo dục Việt Nam',
    keyTopics: ['Bộ Giáo dục và Đào tạo', 'Tổng Chủ biên: Phạm Thế Long', 'Chủ biên: Đào Kiến Quốc', 'Tác giả: Bùi Việt Hà, Lê Chí Ngọc, Lê Kim Thư', 'NXB Giáo dục Việt Nam']
  },
  {
    pageNumber: 1,
    category: 'frontmatter',
    label: 'Trang 1',
    badge: 'Bìa lót',
    title: 'Trang 1: Trang bìa lót & Cơ quan xuất bản',
    src: '/assets/aistudio/image_cf29d42a.png',
    desc: 'Trang bìa lót ghi nhận đầy đủ danh mục tác giả biên soạn, cơ quan chỉ đạo và nhà xuất bản phát hành chính thức',
    keyTopics: ['GS.TSKH Phạm Thế Long (Tổng Chủ biên)', 'PGS.TS Đào Kiến Quốc (Chủ biên)', 'ThS Bùi Việt Hà, TS Lê Chí Ngọc, ThS Lê Kim Thư', 'Nhà xuất bản Giáo dục Việt Nam']
  },
  {
    pageNumber: 2,
    category: 'frontmatter',
    label: 'Trang 2',
    badge: 'Hướng dẫn',
    title: 'Trang 2: Hướng dẫn sử dụng sách & Kí hiệu ICT/CS',
    src: '/assets/aistudio/image_beb6062c.png',
    desc: 'Quy chuẩn 9 phần bài học (Mục tiêu, Khởi động, Hoạt động, Bài học, Ghi nhớ, Câu hỏi, Thực hành, Luyện tập, Vận dụng) • Định hướng Tin học ứng dụng ICT & Khoa học máy tính CS • Lời kêu gọi giữ gìn sách',
    keyTopics: ['9 thành phần sư phạm thống nhất', 'Nhánh Tin học ứng dụng (ICT - Xanh lơ)', 'Nhánh Khoa học máy tính (CS - Xanh ngọc)', 'Thông điệp bảo quản, giữ gìn sách giáo khoa']
  },
  {
    pageNumber: 3,
    category: 'frontmatter',
    label: 'Trang 3',
    badge: 'Lời nói đầu',
    title: 'Trang 3: Lời nói đầu & 6 Chủ đề môn Tin học 10',
    src: '/assets/aistudio/image_0339bbbe.png',
    desc: 'Thư gửi các em học sinh lớp 10 • Tiếp cận Chương trình GDPT 2018 • Ngôn ngữ lập trình hiện đại Python • Toàn bộ 6 chủ đề của môn học',
    keyTopics: ['Chương trình GDPT 2018 (Thông tư 32)', 'Tiếp cận ngôn ngữ lập trình Python', '6 Chủ đề xuyên suốt cả năm học', 'Chủ đề 1: Máy tính và xã hội tri thức']
  },
  {
    pageNumber: 4,
    category: 'frontmatter',
    label: 'Trang 4',
    badge: 'Mục lục 1',
    title: 'Trang 4: Mục lục SGK (Chủ đề 1 đến Chủ đề 4)',
    src: '/assets/aistudio/image_fe501e56.png',
    desc: 'Mục lục chính thức SGK Tin học 10 (Phần 1) • Chủ đề 1: Máy tính và xã hội tri thức (Bài 1 – 7, Tr. 6) • Chủ đề 2: Mạng máy tính và Internet (Bài 8 – 10, Tr. 38) • Chủ đề 3: Đạo đức, pháp luật và văn hoá trong môi trường số (Bài 11, Tr. 55) • Chủ đề 4: Ứng dụng tin học (Bài 12 – 15, Tr. 63)',
    keyTopics: ['Chủ đề 1: Máy tính và xã hội tri thức (Trang 6)', 'Chủ đề 2: Mạng máy tính và Internet (Trang 38)', 'Chủ đề 3: Đạo đức, pháp luật và văn hoá trong môi trường số (Trang 55)', 'Chủ đề 4: Ứng dụng tin học (Trang 63)']
  },
  {
    pageNumber: 5,
    category: 'frontmatter',
    label: 'Trang 5',
    badge: 'Mục lục 2',
    title: 'Trang 5: Mục lục SGK (Chủ đề 5, Chủ đề 6, Phụ lục & Thuật ngữ)',
    src: '/assets/aistudio/image_c65e3cfb.png',
    desc: 'Mục lục chính thức SGK Tin học 10 (Phần 2) • Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính - Lập trình Python (Bài 16 – 32, Tr. 86) • Chủ đề 6: Hướng nghiệp với tin học (Bài 33 – 34, Tr. 156) • Phụ lục (Tr. 165) • Bảng giải thích thuật ngữ (Tr. 166)',
    keyTopics: ['Chủ đề 5: Giải quyết vấn đề với máy tính - Lập trình Python (Trang 86)', 'Chủ đề 6: Hướng nghiệp với tin học (Trang 156)', 'Phụ lục tra cứu (Trang 165)', 'Bảng giải thích thuật ngữ Tin học (Trang 166)']
  },
  {
    pageNumber: 6,
    category: 'lesson',
    label: 'Trang 6',
    badge: 'Khởi động & 1.a',
    title: 'Trang 6: Khởi động & Quá trình xử lí thông tin',
    src: '/assets/aistudio/image_521c167d.png',
    desc: 'Chủ đề 1: Máy tính và xã hội tri thức • Bài 1: Thông tin và xử lí thông tin • Mục tiêu bài học • 1. Thông tin và dữ liệu: a) Quá trình xử lí thông tin (Hình 1.1)',
    keyTopics: ['Mục tiêu bài học', 'Khái niệm Tin học', '3 bước: Tiếp nhận → Xử lí → Đưa ra kết quả', 'Hình 1.1 Quá trình xử lí thông tin'],
    sectionPageIndex: 1
  },
  {
    pageNumber: 7,
    category: 'lesson',
    label: 'Trang 7',
    badge: '1.b Phân biệt',
    title: 'Trang 7: Phân biệt dữ liệu và thông tin',
    src: '/assets/aistudio/image_5c01a19e.png',
    desc: '1.b Phân biệt dữ liệu và thông tin • Hoạt động 1 (Bài ghi của An, Minh, Khoa) • Hộp ghi nhớ định nghĩa thông tin và dữ liệu • Tính toàn vẹn của thông tin',
    keyTopics: ['Hoạt động 1 (An, Minh, Khoa)', 'Định nghĩa Thông tin & Dữ liệu', 'Tính độc lập tương đối', 'Tính toàn vẹn của thông tin'],
    sectionPageIndex: 2
  },
  {
    pageNumber: 8,
    category: 'lesson',
    label: 'Trang 8',
    badge: '2. Đơn vị lưu trữ',
    title: 'Trang 8: Đơn vị lưu trữ dữ liệu & Bảng 1.1',
    src: '/assets/aistudio/image_470c68e1.png',
    desc: 'Câu hỏi củng cố 1 & 2 cuối mục 1 • Mục 2: Đơn vị lưu trữ dữ liệu (Khái niệm Byte, bội của Byte) • Bảng 1.1 Các đơn vị lưu trữ dữ liệu (từ bit đến Yottabyte) • Bài tập củng cố 1 & 2 cuối mục 2',
    keyTopics: ['Câu hỏi 1-2 cuối mục 1', 'Định nghĩa Byte (8 bit)', 'Bảng 1.1: B, KB, MB, GB, TB, PB, EB, ZB, YB', 'Bài tập quy đổi đơn vị (3 MB, 2 GB, 2048 B)'],
    sectionPageIndex: 3
  },
  {
    pageNumber: 9,
    category: 'lesson',
    label: 'Trang 9',
    badge: '3. Thiết bị số',
    title: 'Trang 9: Lưu trữ, xử lí và truyền thông bằng thiết bị số',
    src: '/assets/aistudio/image_9915278d.png',
    desc: 'Mục 3: Thiết bị số • Hoạt động 2 (Đồng hồ, nhiệt kế, router wifi, thẻ nhớ, laptop) • Hình 1.2 Thiết bị số và thiết bị không thuộc loại số • Ưu điểm về lưu trữ • Ưu điểm về xử lí (siêu máy tính, dự báo thời tiết)',
    keyTopics: ['Hoạt động 2 (Phân loại thiết bị)', 'Hình 1.2: Analog vs Digital', 'Ưu điểm lưu trữ (Ổ cứng 2 TB = thư viện đại học)', 'Ưu điểm xử lí (Siêu máy tính & tính toán liên tục)'],
    sectionPageIndex: 4
  },
  {
    pageNumber: 10,
    category: 'lesson',
    label: 'Trang 10',
    badge: 'Luyện tập & Vận dụng',
    title: 'Trang 10: Truyền thông, Hộp ghi nhớ, Luyện tập & Vận dụng',
    src: '/assets/aistudio/image_834e0734.png',
    desc: 'Ưu điểm về truyền thông (Telex 60 từ/phút vs Cáp quang) • Hộp ghi nhớ 4 ưu điểm thiết bị số • Câu hỏi củng cố 1-2 mục 3 • Luyện tập 1 (Tính GPA) & Luyện tập 2 (Ảnh số thẻ nhớ Hình 1.3) • Vận dụng 1 (CCCD gắn chip) & Vận dụng 2 (Cách mạng máy ảnh số)',
    keyTopics: ['Ưu điểm truyền thông (Cáp quang tốc độ cao)', 'Hộp ghi nhớ (Trang 10): 4 ưu điểm vượt trội', 'Luyện tập 1 (GPA) & Luyện tập 2 (Hình 1.3 thẻ nhớ)', 'Vận dụng 1 (CCCD gắn chip) & Vận dụng 2 (Máy ảnh số)'],
    sectionPageIndex: 5
  },
  {
    pageNumber: 11,
    category: 'lesson',
    label: 'Trang 11',
    badge: 'Bài 2 • Tr. 11',
    title: 'Trang 11: Bài 2 • Khởi động & 1. Thiết bị thông minh (Hình 2.1)',
    src: '/assets/aistudio/image_474175bc.png',
    desc: 'Bài 2: Vai trò của thiết bị thông minh và tin học đối với xã hội • 4 mục tiêu bài học • Khởi động: Khái niệm "smart" • Hoạt động 1: Nhận biết thiết bị thông minh (Hình 2.1: Đồng hồ vạn niên, điện thoại, camera, máy ảnh)',
    keyTopics: ['Mục tiêu Bài 2', 'Khởi động (Từ "smart")', 'Hoạt động 1 (Hình 2.1)', 'Khái niệm hệ thống xử lí thông tin tự chủ']
  },
  {
    pageNumber: 12,
    category: 'lesson',
    label: 'Trang 12',
    badge: 'Bài 2 • Tr. 12',
    title: 'Trang 12: Hình 2.2 Các thời kì CMCN & Nền kinh tế tri thức',
    src: '/assets/aistudio/image_ae4545b7.png',
    desc: '1b. Vai trò của thiết bị thông minh trong CMCN 4.0 • Hình 2.2 Dòng thời gian 4 thời kì cách mạng công nghiệp • Hệ thống thực - ảo CPS • Nền kinh tế tri thức và cơ cấu giá trị smartphone',
    keyTopics: ['Hình 2.2 Các thời kì CMCN (1.0 đến 4.0)', 'Hệ thống kết hợp thực - ảo (CPS)', 'Nền kinh tế tri thức', 'Giá trị tri thức/phần mềm > 50%']
  },
  {
    pageNumber: 13,
    category: 'lesson',
    label: 'Trang 13',
    badge: 'Bài 2 • Tr. 13',
    title: 'Trang 13: IoT, Hộp ghi nhớ 1, Hình 2.3 & 2. Các thành tựu của Tin học',
    src: '/assets/aistudio/image_d3db82a0.png',
    desc: 'Internet of Things (IoT) • Hộp ghi nhớ 1 định nghĩa thiết bị thông minh & IoT • Câu hỏi củng cố 1 (Hình 2.3 Cân điện tử, đồng hồ bluetooth, máy tính cầm tay) & Câu 2 • Mục 2: Các thành tựu của tin học (Quản lí & Tự động hoá)',
    keyTopics: ['Định nghĩa IoT (Internet of Things)', 'Hộp ghi nhớ 1 (Trang 13)', 'Câu hỏi củng cố (Hình 2.3)', 'Quản lí và Tự động hoá']
  },
  {
    pageNumber: 14,
    category: 'lesson',
    label: 'Trang 14',
    badge: 'Bài 2 • Tr. 14',
    title: 'Trang 14: Đóng góp của Tin học & Thành tựu HĐH, Internet, FORTRAN',
    src: '/assets/aistudio/image_ee627b46.png',
    desc: 'Đóng góp khoa học kỹ thuật, thay đổi cách làm việc (chế bản điện tử, máy ảnh số, dạy học online) & giao tiếp cộng đồng (mạng xã hội) • 2b. Thành tựu phát triển: Hệ điều hành OS/360 (1964), TCP/IP (1983), WWW (1992), Ngôn ngữ bậc cao FORTRAN (1957)',
    keyTopics: ['5 lĩnh vực đóng góp xã hội', 'Hệ điều hành OS/360 (1964)', 'Internet TCP/IP (1983) & WWW (1992)', 'Ngôn ngữ bậc cao FORTRAN (1957)']
  },
  {
    pageNumber: 15,
    category: 'lesson',
    label: 'Trang 15',
    badge: 'Bài 2 • Tr. 15',
    title: 'Trang 15: Hệ quản trị CSDL, Hộp ghi nhớ 2, Luyện tập & Vận dụng',
    src: '/assets/aistudio/image_a00c56aa.png',
    desc: 'Hệ quản trị CSDL (DBMS thập niên 60 và CSDL bảng sau 1970) • AI và Big Data • Hộp ghi nhớ 2 • Luyện tập 1 & 2 (Nhận dạng hình ảnh, Tin học văn phòng) • Vận dụng 1 & 2 (Camera giám sát giao thông, Xe tự hành 4.0)',
    keyTopics: ['Hệ quản trị CSDL (DBMS)', 'Hộp ghi nhớ 2 (Trang 15)', 'Luyện tập (Nhận dạng ảnh & Văn phòng)', 'Vận dụng (Camera giao thông & Xe tự hành)']
  },
  {
    pageNumber: 16,
    category: 'lesson',
    label: 'Bài 3 • Tr. 16',
    badge: 'Bài 3 • Tr. 16',
    title: 'Trang 16: Bài 3 • Mục tiêu, Khởi động & 1. Phân loại thông tin (Hình 3.1 & 3.2)',
    src: '/assets/aistudio/image_df9bc522.png',
    desc: 'Bài 3: Một số kiểu dữ liệu và dữ liệu văn bản • 3 mục tiêu bài học • Khởi động mã hoá nhị phân • Hoạt động 1 Phân tích thẻ CCCD (Hình 3.1) • Hình 3.2 Sơ đồ phân loại các kiểu dữ liệu (Văn bản, Số, Lôgic, Đa phương tiện)',
    keyTopics: ['Mục tiêu Bài 3', 'Hoạt động 1: Căn cước công dân (Hình 3.1)', 'Hình 3.2: 4 nhóm kiểu dữ liệu', 'Khái niệm biểu diễn thông tin']
  },
  {
    pageNumber: 17,
    category: 'lesson',
    label: 'Bài 3 • Tr. 17',
    badge: 'Bài 3 • Tr. 17',
    title: 'Trang 17: Hộp ghi nhớ 1, Câu hỏi 1-2 & 2. Bảng mã ASCII (Chuẩn 7-bit & 8-bit)',
    src: '/assets/aistudio/image_94a3c474.png',
    desc: 'Hộp ghi nhớ 1 • Câu hỏi củng cố 1 (Số CCCD) & Câu hỏi 2 (Số thực) • 2. Biểu diễn dữ liệu văn bản • Hoạt động 2: 26 chữ cái tiếng Anh vs 134 ký tự tiếng Việt có dấu • a) Bảng mã ASCII 7-bit (128 ký tự) & ASCII mở rộng 8-bit (256 ký tự) • b) Bảng mã Unicode',
    keyTopics: ['Hộp ghi nhớ 1 (Trang 17)', 'Câu hỏi củng cố (Số CCCD là kiểu văn bản)', 'Hoạt động 2 (134 nguyên âm có dấu & đ/Đ)', 'Bảng mã ASCII 7 bit & 8 bit', 'Ví dụ mã nhị phân ký tự A: 01000001']
  },
  {
    pageNumber: 18,
    category: 'lesson',
    label: 'Bài 3 • Tr. 18',
    badge: 'Bài 3 • Tr. 18',
    title: 'Trang 18: Unicode, Tiêu chuẩn TCVN 6909:2001, UTF-8 & c) Số hoá văn bản',
    src: '/assets/aistudio/image_989585c1.png',
    desc: 'Bảng mã quốc tế Unicode • Tiêu chuẩn TCVN 6909:2001 (Bộ mã tiếng Việt 16-bit) • Quy định bắt buộc UTF-8 năm 2017 (1-3 byte cho tiếng Việt) • c) Số hoá văn bản bằng Word/Writer và Nhận dạng tiếng nói • Hộp ghi nhớ 2 • Câu hỏi 1 (Ký tự S, G, K) & Câu hỏi 2 (UTF-8 tiếng Việt 1-3 byte)',
    keyTopics: ['Unicode tiêu chuẩn quốc tế', 'TCVN 6909:2001 & Bắt buộc UTF-8 năm 2017', 'Độ dài byte UTF-8 (tiếng Việt: 1-3 byte)', 'Số hoá văn bản & Nhận dạng tiếng nói', 'Hộp ghi nhớ 2 (Trang 18)', 'Mã ký tự S, G, K']
  },
  {
    pageNumber: 19,
    category: 'lesson',
    label: 'Bài 3 • Tr. 19',
    badge: 'Bài 3 • Tr. 19',
    title: 'Trang 19: Luyện tập 1 (GPLX), Luyện tập 2 (Unicode), Vận dụng 1 (VSCII) & 2 (Phông chữ)',
    src: '/assets/aistudio/image_eb142238.png',
    desc: 'Luyện tập 1: Ghép nối kiểu dữ liệu Giấy phép lái xe (GPLX) • Luyện tập 2: Vì sao cần xây dựng bảng mã Unicode (Đáp án C) • Vận dụng 1: Bảng mã VSCII / TCVN 5712:1993 • Vận dụng 2: Phông chữ tiếng Việt Unicode',
    keyTopics: ['Luyện tập 1: Phân loại thông tin Giấy phép lái xe', 'Luyện tập 2: Mục đích xây dựng Unicode', 'Vận dụng 1: Bảng mã VSCII (TCVN 5712:1993)', 'Vận dụng 2: Phông chữ hiển thị tiếng Việt Unicode']
  },
  {
    pageNumber: 20,
    category: 'lesson',
    label: 'Bài 4 • Tr. 20',
    badge: 'Bài 4 • Tr. 20',
    title: 'Trang 20: Bài 4 • Mục tiêu, Khởi động, 1. Hệ nhị phân & Hoạt động 1',
    src: '/assets/aistudio/image_f404f3c3.png',
    desc: 'Bài 4: Hệ nhị phân và dữ liệu số nguyên • 2 mục tiêu bài học • Khởi động: Phân tích theo luỹ thừa 10 (513) và luỹ thừa 2 (13 = 1101₂) • 1. Hệ nhị phân và biểu diễn số nguyên • Hoạt động 1: Biểu diễn 19 = 16 + 2 + 1 = 10011₂ • a) Đặc điểm hệ nhị phân (cơ số 2, bit, trọng số gấp 2 lần) • b) Đổi sang nhị phân',
    keyTopics: ['Mục tiêu Bài 4', 'Khởi động (Luỹ thừa 10 vs Luỹ thừa 2)', 'Hoạt động 1 (Biểu diễn 19 = 10011₂)', 'Khái niệm Bit (Binary digit)', 'Trọng số vị trí luỹ thừa của 2']
  },
  {
    pageNumber: 21,
    category: 'lesson',
    label: 'Bài 4 • Tr. 21',
    badge: 'Bài 4 • Tr. 21',
    title: 'Trang 21: Hình 4.1 Chia 2 liên tiếp, 1c. Biểu diễn số nguyên (Mã thuận, bù 1, bù 2) & Ghi nhớ 1',
    src: '/assets/aistudio/image_5286ccea.png',
    desc: 'Hình 4.1: Thuật toán chia 2 liên tiếp lấy số dư ngược (19 = 10011₂; 620 sang 16-bit) • c) Biểu diễn số nguyên: Dấu phẩy tĩnh và dấu phẩy động • Số nguyên không dấu (1 byte 0..255; 2 byte 0..65535) • Số nguyên có dấu: Bit dấu (0: +, 1: -); Mã thuận, Mã bù 1, Mã bù 2 (+19 và -19) • Hộp Ghi nhớ 1 • Câu hỏi củng cố 1 (13, 155, 76) & Câu hỏi 2 (110011₂, 10011011₂, 1001110₂)',
    keyTopics: ['Hình 4.1 Thuật toán chia 2 liên tiếp', 'Dấu phẩy tĩnh vs Dấu phẩy động', 'Số nguyên không dấu (0 đến 255)', 'Bit dấu (0: dương, 1: âm)', 'Mã thuận, Mã bù 1, Mã bù 2 (-19)', 'Hộp Ghi nhớ 1 (Trang 21)']
  },
  {
    pageNumber: 22,
    category: 'lesson',
    label: 'Bài 4 • Tr. 22',
    badge: 'Bài 4 • Tr. 22',
    title: 'Trang 22: 2. Phép tính số học, Bảng 4.1, Hình 4.2 (Phép cộng) & Hình 4.3 (Phép nhân)',
    src: '/assets/aistudio/image_8a26b0f7.png',
    desc: '2. Các phép tính số học trong hệ nhị phân • Hoạt động 2: Phép tính nhị phân (27 + 26 = 53; 13 × 5 = 65) • a) Bảng 4.1: Bảng cộng (1 + 1 = 10₂) và Bảng nhân (1 × 1 = 1) • b) Phép cộng hai số nhị phân (Hình 4.2: 11011₂ + 11010₂ = 110101₂) • c) Phép nhân hai số nhị phân (Hình 4.3: 1101₂ × 101₂ = 1000001₂)',
    keyTopics: ['Hoạt động 2 (27+26 và 13×5)', 'Bảng 4.1 Bảng cộng & Bảng nhân', 'Quy tắc 1+1=10 (viết 0 nhớ 1)', 'Hình 4.2 Phép cộng nhị phân', 'Hình 4.3 Phép nhân nhị phân']
  },
  {
    pageNumber: 23,
    category: 'lesson',
    label: 'Bài 4 • Tr. 23',
    badge: 'Bài 4 • Tr. 23',
    title: 'Trang 23: Hộp Ghi nhớ 2, Câu hỏi, Hình 4.4 Quy trình 3 bước, Luyện tập & Vận dụng',
    src: '/assets/aistudio/image_0a35d6d6.png',
    desc: 'Hộp Ghi nhớ 2 • Câu hỏi củng cố (101101₂ + 11001₂; 100111₂ × 1011₂) • Hình 4.4 Quy trình tính toán máy tính 3 bước (1. Mã hoá → 2. Xử lí ALU → 3. Giải mã) • Luyện tập 1: Phép cộng (125+17, 250+175, 75+112) • Luyện tập 2: Phép nhân (15×6, 11×9, 125×4) • Vận dụng 1: Đổi phần thập phân số thực sang nhị phân (nhân 2) • Vận dụng 2: Khám phá mã bù 2 trong ALU',
    keyTopics: ['Hộp Ghi nhớ 2 (Trang 23)', 'Hình 4.4 Quy trình tính toán 3 bước', 'Luyện tập 1: Phép cộng 3 bước', 'Luyện tập 2: Phép nhân 3 bước', 'Vận dụng 1: Phân số thập phân sang nhị phân', 'Vận dụng 2: Mã bù 2 trong ALU']
  },
  {
    pageNumber: 24,
    category: 'lesson',
    label: 'Bài 5 • Tr. 24',
    badge: 'Bài 5 • Tr. 24',
    title: 'Trang 24: Bài 5 • Dữ liệu lôgic, Mục tiêu, George Boole & 1. Các phép toán lôgic',
    src: '/assets/aistudio/image_d29d64c5.png',
    desc: 'Bài 5: Dữ liệu lôgic • 2 mục tiêu bài học • Khởi động: George Boole (1815-1864) và đại số Boole (1854) • 1. Các phép toán lôgic cơ bản • Hoạt động 1: Mệnh đề dự báo thời tiết Đúng/Sai • Khái niệm lôgic mệnh đề & Chân trị',
    keyTopics: ['Mục tiêu Bài 5', 'George Boole & Đại số Boole (1854)', 'Hoạt động 1: Đúng/Sai dự báo thời tiết', 'Lôgic mệnh đề & Giá trị chân lý (Đúng/Sai)']
  },
  {
    pageNumber: 25,
    category: 'lesson',
    label: 'Bài 5 • Tr. 25',
    badge: 'Bài 5 • Tr. 25',
    title: 'Trang 25: Bảng 5.2 Chân trị phép toán AND, OR, XOR, NOT & Hình 5.2 Toạ độ hình vuông',
    src: '/assets/aistudio/image_c1409c5c.png',
    desc: 'Bảng 5.1 & Bảng 5.2: Bảng chân trị các phép toán lôgic AND (Phép hội), OR (Phép tuyển), XOR (Phép tuyển loại trừ), NOT (Phép phủ định) • Ví dụ kiểm tra điểm trong hình vuông (Hình 5.2): (x ≥ 1) AND (x ≤ 3) AND (y ≥ 1) AND (y ≤ 3)',
    keyTopics: ['Phép hội AND (&, ∧)', 'Phép tuyển OR (|, ∨)', 'Phép tuyển loại trừ XOR (⊕)', 'Phép phủ định NOT (~, ¬)', 'Bảng 5.2 Chân trị', 'Hình 5.2 Miền trong hình vuông']
  },
  {
    pageNumber: 26,
    category: 'lesson',
    label: 'Bài 5 • Tr. 26',
    badge: 'Bài 5 • Tr. 26',
    title: 'Trang 26: Phép toán dãy bit (Hình 5.3), Ghi nhớ 1, Củng cố & 2. Biểu diễn dữ liệu lôgic',
    src: '/assets/aistudio/image_c6020aef.png',
    desc: 'Hình 5.3: Các phép toán lôgic bitwise trên dãy bit • Hộp Ghi nhớ 1 • Câu hỏi củng cố 1 (Bitwise NOT, AND, OR, XOR trên dãy 1100 và 1010) • Câu hỏi củng cố 2 (Bảng 5.3 - Chỉ ra phương án sai) • 2. Biểu diễn dữ liệu lôgic • Hoạt động 2: Biểu diễn 1 bit trong máy tính (1: Đúng, 0: Sai)',
    keyTopics: ['Phép toán lôgic trên dãy bit (Hình 5.3)', 'Hộp Ghi nhớ 1 (Trang 26)', 'Câu hỏi củng cố 1 & 2 (Bảng 5.3)', 'Hoạt động 2: Biểu diễn dữ liệu lôgic 1 bit']
  },
  {
    pageNumber: 27,
    category: 'lesson',
    label: 'Bài 5 • Tr. 27',
    badge: 'Bài 5 • Tr. 27',
    title: 'Trang 27: Hộp Ghi nhớ 2, Mạch điện lôgic Hình 5.5-5.6, Luyện tập & Vận dụng',
    src: '/assets/aistudio/image_c9ef3a25.png',
    desc: 'Quy ước trong Python (True/False) & các ngôn ngữ C/C++ • Hộp Ghi nhớ 2 • Câu hỏi củng cố (1 byte chứa 8 giá trị lôgic) • Hình 5.5 Mạch điện nối tiếp (Cổng AND) & Hình 5.6 Mạch điện song song (Cổng OR) • Luyện tập 1 (Hình 5.4 Mệnh đề logic) • Luyện tập 2 (p AND NOT p = 0; p OR NOT p = 1) • Vận dụng a & b (Mạch điện công tắc)',
    keyTopics: ['Hộp Ghi nhớ 2 (Trang 27)', 'Hình 5.5 Mạch nối tiếp (Cổng AND)', 'Hình 5.6 Mạch song song (Cổng OR)', 'Luyện tập 1 & 2', 'Vận dụng (Mạch điện công tắc)']
  },
  {
    pageNumber: 28,
    category: 'lesson',
    label: 'Bài 6 • Tr. 28',
    badge: 'Bài 6 • Tr. 28',
    title: 'Trang 28: Bài 6 • Dữ liệu âm thanh & hình ảnh, Mục tiêu, Khởi động & 1. Biểu diễn âm thanh',
    src: '/assets/aistudio/image_6966de21.png',
    desc: 'Bài 6: Dữ liệu âm thanh và hình ảnh • 3 mục tiêu bài học • Khởi động số hoá dữ liệu tương tự liên tục • 1. Biểu diễn âm thanh: Hoạt động 1 Lấy mẫu âm thanh • a) Số hoá âm thanh bằng phương pháp điều chế mã xung (Pulse Code Modulation - PCM) • Bước 1 (Lấy mẫu & Chu kì lấy mẫu T) • Bước 2 (Lượng tử hoá biên độ)',
    keyTopics: ['Mục tiêu Bài 6', 'Khởi động (Tín hiệu tương tự vs Tín hiệu số)', 'Hoạt động 1 (Microphone & Sóng âm)', 'Phương pháp điều chế mã xung PCM', 'Bước 1: Lấy mẫu & Chu kì lấy mẫu (T)', 'Bước 2: Lượng tử hoá biên độ']
  },
  {
    pageNumber: 29,
    category: 'lesson',
    label: 'Bài 6 • Tr. 29',
    badge: 'Bài 6 • Tr. 29',
    title: 'Trang 29: Bước 3 PCM, Mạch ADC/DAC, Tốc độ bit, 1b. Định dạng âm thanh (.wav, .mp3) & Ghi nhớ 1',
    src: '/assets/aistudio/image_0b832a25.png',
    desc: 'Bước 3 PCM (Biểu diễn nhị phân) • Mạch biến đổi ADC và DAC • Khái niệm Tốc độ bit (Bit-rate, Kb/s) • 1b. Định dạng lưu trữ âm thanh: Định dạng không nén WAV (PCM gốc) vs Định dạng nén MP3 (nhỏ hơn ~10 lần) • Hộp Ghi nhớ 1 • Câu hỏi củng cố 1 (Chu kì lấy mẫu tăng) & Câu hỏi 2 (Tại sao MP3 phổ biến)',
    keyTopics: ['Bước 3: Chuỗi bit nhị phân PCM', 'Mạch biến đổi ADC và DAC', 'Tốc độ bit (Bit-rate, bps, Kb/s)', 'Định dạng .wav (PCM không nén)', 'Định dạng .mp3 (Nén có mất mát ~1/10)', 'Hộp Ghi nhớ 1 (Trang 29)', 'Câu hỏi củng cố 1 & 2']
  },
  {
    pageNumber: 30,
    category: 'lesson',
    label: 'Bài 6 • Tr. 30',
    badge: 'Bài 6 • Tr. 30',
    title: 'Trang 30: 2. Biểu diễn hình ảnh, Hoạt động 2 (Phối màu RGB) & a) Hệ màu RGB, Điểm ảnh (Pixel)',
    src: '/assets/aistudio/image_5164377a.png',
    desc: '2. Biểu diễn hình ảnh • Hoạt động 2: Phối màu (Đỏ, Xanh lá, Xanh dương) • Mô hình màu cộng (Additive color model) • Điểm ảnh (Pixel - Picture element) • Độ sâu màu (Bit depth) • 3 phân cấp: Ảnh màu 24 bit (True Color 16,7 triệu màu), Ảnh đen trắng ghi xám 8 bit (256 mức) và Ảnh đen trắng thuần tuý 1 bit (2 mức)',
    keyTopics: ['Hoạt động 2: Phối màu cộng RGB', 'Điểm ảnh (Pixel - Picture element)', 'Độ sâu màu (Bit depth)', 'Ảnh màu 24 bit (256³ ≈ 16,7 triệu màu)', 'Ảnh ghi xám 8 bit (256 sắc độ)', 'Ảnh đen trắng 1 bit (0: đen, 1: trắng)']
  },
  {
    pageNumber: 31,
    category: 'lesson',
    label: 'Bài 6 • Tr. 31',
    badge: 'Bài 6 • Tr. 31',
    title: 'Trang 31: Hình 6.8 (Ảnh màu vs Ảnh xám), Biểu diễn ảnh Bitmap, Các định dạng tệp & Ghi nhớ 2',
    src: '/assets/aistudio/image_6af65a53.png',
    desc: 'Hình 6.8: So sánh trực quan ảnh màu RGB và ảnh xám • Biểu diễn ảnh bitmap: Lưới ma trận các điểm ảnh pixel • Định dạng .bmp (Bitmap không nén, tệp rất lớn) • Định dạng .jpeg / .jpg (Nén có mất mát, rất nhẹ, phổ biến web) • Định dạng .png (Nén không mất mát, sắc nét, hỗ trợ nền trong suốt) • Hộp Ghi nhớ 2 • Câu hỏi củng cố 1 (Hệ màu RGB 8-bit tạo 16,7 triệu màu)',
    keyTopics: ['Hình 6.8 So sánh ảnh màu và ảnh xám', 'Biểu diễn ảnh bitmap (Raster)', 'Định dạng .bmp (Windows Bitmap)', 'Định dạng .jpeg (Nén mất mát, tối ưu web)', 'Định dạng .png (Nén không mất mát, nền trong suốt)', 'Hộp Ghi nhớ 2 (Trang 31)', 'Câu hỏi củng cố 1 (Mã hoá RGB 24 bit)']
  },
  {
    pageNumber: 32,
    category: 'lesson',
    label: 'Bài 6 • Tr. 32',
    badge: 'Bài 6 • Tr. 32',
    title: 'Trang 32: Câu hỏi 2 (.jpeg), Luyện tập 1 (Bảng LED), Luyện tập 2 (CD 650MB), Vận dụng 1 & 2',
    src: '/assets/aistudio/image_b40d0b5c.png',
    desc: 'Câu hỏi củng cố 2 (Vì sao JPEG phổ biến) • Luyện tập 1: Hình 6.9 Bảng quảng cáo đèn LED (Mỗi bóng là 1 pixel, cần 1 bit) • Luyện tập 2: Đĩa CD dung lượng 650 MB tốc độ bit 1411 Kb/s phát liên tục ~63 phút • Vận dụng 1: Chất lượng nghe nhạc trực tuyến 128 Kbps, 320 Kbps hay Lossless • Vận dụng 2: Lưu logo bằng Paint nên chọn BMP, JPEG hay PNG',
    keyTopics: ['Câu hỏi 2: Ưu điểm định dạng JPEG', 'Luyện tập 1: Hình 6.9 Bảng LED 1-bit', 'Luyện tập 2: Tính thời gian đĩa CD 650 MB (1411 Kbps)', 'Vận dụng 1: Các mức chất lượng nhạc số', 'Vận dụng 2: Định dạng PNG tối ưu cho biểu trưng logo']
  },
  {
    pageNumber: 33,
    category: 'lesson',
    label: 'Bài 7 • Tr. 33',
    badge: 'Bài 7 • Tr. 33',
    title: 'Trang 33: Bài 7 • Thiết bị số thông dụng, Mục tiêu, Khởi động & 1. Trợ thủ số cá nhân (PDA)',
    src: '/assets/aistudio/image_fc787572.png',
    desc: 'Bài 7: Thực hành sử dụng thiết bị số thông dụng • 3 mục tiêu bài học • Khởi động Hình 7.1: Nhận biết một số thiết bị số hỗ trợ cá nhân (Tablet, E-reader, Smartphone, Smartwatch) • 1. Trợ thủ số cá nhân: Hoạt động 1 Tìm hiểu thiết bị trợ thủ số cá nhân • Định nghĩa PDA (Personal Digital Assistant) • Chức năng sơ khai (Sổ lịch, đồng hồ báo thức, danh bạ, to-do list, ghi nhớ, máy tính bỏ túi) • Hình 7.2: Màn hình PDA',
    keyTopics: ['Mục tiêu Bài 7', 'Khởi động Hình 7.1: Thiết bị hỗ trợ cá nhân', '1. Trợ thủ số cá nhân (PDA)', 'Hoạt động 1: Tìm hiểu thiết bị PDA', 'Chức năng cơ bản của PDA ban đầu', 'Hình 7.2: Màn hình PDA'],
    sectionPageIndex: 0
  },
  {
    pageNumber: 34,
    category: 'lesson',
    label: 'Bài 7 • Tr. 34',
    badge: 'Bài 7 • Tr. 34',
    title: 'Trang 34: Sự hội tụ PDA trên iOS/Android, Hộp Ghi nhớ 1, Củng cố & 2. Nhiệm vụ 1 Phần cứng Smartphone',
    src: '/assets/aistudio/image_7059d3a6.png',
    desc: 'PDA hiện đại tích hợp đa phương tiện, Wi-Fi, Bluetooth, thẻ nhớ • Hai hệ điều hành di động chủ đạo: iOS (Apple) và Android (Google) • Hộp Ghi nhớ 1 (Nhỏ gọn, kết nối mạng) • Câu hỏi củng cố (Kết nối nào không phổ biến: Hồng ngoại) • 2. Thực hành sử dụng thiết bị số cá nhân (Hình 7.3: iPhone, Android, iPad, Tablet) • Nhiệm vụ 1: Nhận biết các nút bấm vật lí (Hình 7.4: Nút khoá/nguồn, nút tăng/giảm âm lượng)',
    keyTopics: ['Hội tụ công nghệ trên iOS và Android', 'Hộp Ghi nhớ 1 (Đặc điểm PDA)', 'Câu hỏi củng cố (Hồng ngoại không phổ biến)', 'Hình 7.3: Các thiết bị thông minh', 'Nhiệm vụ 1: Nhận biết nút bấm vật lí (Hình 7.4)', 'Nút khoá màn hình & Phím âm lượng'],
    sectionPageIndex: 1
  },
  {
    pageNumber: 35,
    category: 'lesson',
    label: 'Bài 7 • Tr. 35',
    badge: 'Bài 7 • Tr. 35',
    title: 'Trang 35: Nhiệm vụ 2 (Hình 7.5 Màn hình chính, Thanh điều hướng) & Nhiệm vụ 3 (Biểu tượng ứng dụng)',
    src: '/assets/aistudio/image_0139545c.png',
    desc: 'Nhiệm vụ 2: Làm quen màn hình làm việc • Hình 7.5: Màn hình chính (Thanh trạng thái, biểu tượng app, tiện ích thời tiết, thanh truy cập nhanh Dock) • Thanh điều hướng ảo (Navigation Bar: Nút Quay lại - Back, nút Home, nút Tổng quan - Overview) • Thao tác vuốt cảm ứng • Nhiệm vụ 3: Khám phá biểu tượng các ứng dụng có sẵn và cài thêm',
    keyTopics: ['Nhiệm vụ 2: Màn hình chính smartphone', 'Hình 7.5 Giải phẫu màn hình chính', 'Thanh trạng thái & Thanh truy cập nhanh (Dock)', 'Thanh điều hướng: Back, Home, Tổng quan (Overview)', 'Thao tác cử chỉ vuốt chạm cảm ứng', 'Nhiệm vụ 3: Biểu tượng ứng dụng (App icons)'],
    sectionPageIndex: 3
  },
  {
    pageNumber: 36,
    category: 'lesson',
    label: 'Bài 7 • Tr. 36',
    badge: 'Bài 7 • Tr. 36',
    title: 'Trang 36: Chức năng thiết yếu, Hình 7.6 Ứng dụng & Nhiệm vụ 4 Quản lí tệp (Hình 7.7 Thư mục DCIM)',
    src: '/assets/aistudio/image_a2138ec8.png',
    desc: 'Chức năng thiết yếu: Gọi điện, Nhắn tin, Danh bạ • Ứng dụng học tập & Lưu trữ đám mây (Zoom, Teams, Meet, Drive, OneDrive) • Hình 7.6: Một số ứng dụng trên điện thoại • Nhiệm vụ 4: Tìm ứng dụng quản lí tệp (Files, File Manager) • Cấu trúc cây thư mục phân cấp • Hình 7.7: Đường dẫn mở tệp ảnh chụp (Bộ nhớ trong → DCIM → Camera)',
    keyTopics: ['Chức năng thiết yếu (Gọi điện, Nhắn tin, Danh bạ)', 'Hình 7.6: Ứng dụng điện thoại thông minh', 'Lưu trữ đám mây (Google Drive, OneDrive)', 'Nhiệm vụ 4: Quản lí tệp trên điện thoại', 'Cấu trúc thư mục phân cấp hình cây', 'Hình 7.7: Thư mục DCIM và Camera'],
    sectionPageIndex: 4
  },
  {
    pageNumber: 37,
    category: 'lesson',
    label: 'Bài 7 • Tr. 37',
    badge: 'Bài 7 • Tr. 37',
    title: 'Trang 37: Hình 7.8 Thao tác tệp (Chạm giữ lâu), Luyện tập 1-2 & Vận dụng 1-2-3',
    src: '/assets/aistudio/image_edd6992a.png',
    desc: 'Hình 7.8: Thao tác chạm và giữ lâu (Long Press) để Di chuyển, Sao chép, Chia sẻ, Xoá tệp và thư mục • Luyện tập 1: Điểm khác biệt smartphone vs điện thoại thường (Có hệ điều hành & cài ứng dụng) • Luyện tập 2: Thực hành chụp ảnh, tìm trong DCIM và xoá • Vận dụng 1: Kết nối cáp USB sao chép ảnh sang PC • Vận dụng 2: Lưu trữ ảnh lên đám mây • Vận dụng 3: Gửi ảnh qua phần mềm học trực tuyến Zoom',
    keyTopics: ['Hình 7.8: Thao tác chạm giữ lâu (Long press)', 'Thao tác tệp: Di chuyển, Sao chép, Chia sẻ, Xoá', 'Luyện tập 1: Smartphone có hệ điều hành', 'Luyện tập 2: Chụp ảnh, tìm trong DCIM và xoá', 'Vận dụng 1: Sao chép ảnh sang máy tính qua USB', 'Vận dụng 2: Lưu trữ ảnh lên đám mây', 'Vận dụng 3: Gửi ảnh qua ứng dụng trực tuyến Zoom'],
    sectionPageIndex: 5
  },
  {
    pageNumber: 38,
    category: 'lesson',
    label: 'Bài 8 • Tr. 38',
    badge: 'Bài 8 • Tr. 38',
    title: 'Trang 38: Bài 8 • Chủ đề 2: Mạng máy tính & Internet, Mục tiêu, Hình 8.1 & Hoạt động 1',
    src: '/assets/aistudio/image_d77cec79.png',
    desc: 'Chủ đề 2: Mạng máy tính và Internet • Bài 8: Mạng máy tính trong cuộc sống hiện đại • 3 mục tiêu bài học • Khởi động Hình 8.1: Mô hình mạng cục bộ (Thiết bị đầu cuối vs Thiết bị kết nối Hub/Switch/Router, Cổng LAN vs Cổng Internet) • 1. Mạng LAN và Internet: Hoạt động 1 (Phạm vi sử dụng & Kết nối trên smartphone) • Mạng cục bộ LAN vs Mạng diện rộng WAN',
    keyTopics: ['Chủ đề 2: Mạng máy tính và Internet', 'Mục tiêu Bài 8', 'Hình 8.1 Mô hình mạng cục bộ', 'Thiết bị đầu cuối vs Thiết bị kết nối', 'Phân biệt Cổng LAN vs Cổng Internet', 'Hoạt động 1: Mạng LAN vs Internet', 'Phân loại LAN vs WAN'],
    sectionPageIndex: 0
  },
  {
    pageNumber: 39,
    category: 'lesson',
    label: 'Bài 8 • Tr. 39',
    badge: 'Bài 8 • Tr. 39',
    title: 'Trang 39: Hình 8.2 Mô hình Internet, Bảng so sánh LAN vs Internet & 2. Vai trò của Internet',
    src: '/assets/aistudio/image_3623dbc6.png',
    desc: 'Nguyên lí Router chuyển tiếp gói tin ra Internet • Hình 8.2: Mô hình của Internet (Mạng của các mạng) • Quyền sở hữu LAN vs Internet • Bảng so sánh Mạng cục bộ vs Internet (Phạm vi quy mô, Cách kết nối, Quyền sở hữu) • Câu hỏi củng cố Nhà cung cấp dịch vụ Internet ISP (Viettel, FPT, VNPT) • 2. Vai trò của Internet: Giao tiếp cộng đồng & Giáo dục đào tạo',
    keyTopics: ['Nguyên lí định tuyến của Router', 'Hình 8.2 Mô hình của Internet', 'Bảng so sánh LAN vs Internet', 'Nhà cung cấp dịch vụ Internet (ISP)', '2. Vai trò của Internet', 'Giao tiếp cộng đồng & Giáo dục'],
    sectionPageIndex: 1
  },
  {
    pageNumber: 40,
    category: 'lesson',
    label: 'Bài 8 • Tr. 40',
    badge: 'Bài 8 • Tr. 40',
    title: 'Trang 40: Hộp Ghi nhớ 1, Câu hỏi củng cố (Giải trí, Y tế) & 3. Điện toán đám mây (Hoạt động 2)',
    src: '/assets/aistudio/image_880f4886.png',
    desc: 'Hộp Ghi nhớ 1 (Kho tri thức khổng lồ, kết nối giao tiếp, biến đổi sâu sắc xã hội) • Câu hỏi 1: Internet với giải trí • Câu hỏi 2: Internet với bảo vệ sức khoẻ • 3. Điện toán đám mây • a) Khái niệm về điện toán đám mây: Hoạt động 2 (Mua hay sử dụng thuê bao: Ví dụ 1 bạn An lưu ảnh Google Drive/Dropbox; Ví dụ 2 cô Bình soạn thảo Google Docs) • Định nghĩa Dịch vụ điện toán đám mây (Cloud Computing)',
    keyTopics: ['Hộp Ghi nhớ 1 (Trang 40)', 'Internet trong giải trí & Y tế sức khoẻ', '3. Điện toán đám mây', 'Hoạt động 2: Mua hay sử dụng thuê bao?', 'Ví dụ bạn An (IaaS) & Cô Bình (SaaS)', 'Định nghĩa dịch vụ điện toán đám mây'],
    sectionPageIndex: 2
  },
  {
    pageNumber: 41,
    category: 'lesson',
    label: 'Bài 8 • Tr. 41',
    badge: 'Bài 8 • Tr. 41',
    title: 'Trang 41: 3b. Các loại dịch vụ đám mây (SaaS, PaaS, IaaS), Lợi ích, Ghi nhớ 2 & Củng cố',
    src: '/assets/aistudio/image_11092398.png',
    desc: 'b) Các loại dịch vụ đám mây cơ bản: SaaS (Software as a Service - Google Docs, Zoom), PaaS (Platform as a Service - Bản đồ số Google Maps, CSDL), IaaS (Infrastructure as a Service - Dropbox, Google Drive máy chủ và lưu trữ) • c) Lợi ích của dịch vụ đám mây (Tính mềm dẻo sẵn sàng cao, Chất lượng cao, Kinh tế hơn) • Hộp Ghi nhớ 2 (Trang 41) • Câu hỏi củng cố 1 (Báo điện tử) • Câu hỏi củng cố 2 (Gmail là dịch vụ đám mây)',
    keyTopics: ['Mô hình dịch vụ SaaS, PaaS, IaaS', 'Lợi ích: Mềm dẻo, Chất lượng cao, Kinh tế', 'Hộp Ghi nhớ 2 (Trang 41)', 'Câu hỏi 1: Báo điện tử không phải đám mây', 'Câu hỏi 2: Gmail là dịch vụ đám mây SaaS'],
    sectionPageIndex: 3
  },
  {
    pageNumber: 42,
    category: 'lesson',
    label: 'Bài 8 • Tr. 42',
    badge: 'Bài 8 • Tr. 42',
    title: 'Trang 42: 4. Kết nối vạn vật (IoT), Hoạt động 3, Lợi ích & Hình 8.4 Thu phí không dừng RFID',
    src: '/assets/aistudio/image_169f0661.png',
    desc: '4. Kết nối vạn vật (Internet of Things - IoT) • Hoạt động 3: Công tơ điện tử làm việc như thế nào? (Hình 8.3 Công tơ điện tử) • Định nghĩa IoT: Liên kết các thiết bị thông minh tự động thu thập và xử lí dữ liệu • Lợi ích của IoT (Thu thập diện rộng, liên tục thời gian thực, tiết kiệm chi phí) • Ví dụ 1: Thu phí không dừng trên đường cao tốc • Hình 8.4: Thẻ RFID gắn trên kính ô tô giúp tự động thu phí',
    keyTopics: ['4. Kết nối vạn vật (IoT)', 'Hoạt động 3: Công tơ điện tử thông minh', 'Định nghĩa Internet of Things (IoT)', 'Lợi ích của IoT trong CMCN 4.0', 'Ví dụ 1: Thu phí không dừng cao tốc', 'Hình 8.4: Công nghệ thẻ RFID'],
    sectionPageIndex: 4
  },
  {
    pageNumber: 43,
    category: 'lesson',
    label: 'Bài 8 • Tr. 43',
    badge: 'Bài 8 • Tr. 43',
    title: 'Trang 43: Ví dụ 2 Nhà thông minh (Hình 8.5), Hộp Ghi nhớ 3, Luyện tập 1-2 & Vận dụng 1-2',
    src: '/assets/aistudio/image_88a66e86.png',
    desc: 'Ví dụ 2: Nhà thông minh (Smart home) - Hình 8.5: Cảm biến điều hòa, đèn, khóa nhận diện khuôn mặt điều khiển từ xa qua smartphone • Hộp Ghi nhớ 3 (IoT là nội dung chủ chốt của CMCN 4.0) • Câu hỏi củng cố (Thiết bị IoT không nhất thiết chỉ nối qua Internet) • Luyện tập 1 (Ích lợi thu phí không dừng ETC) • Luyện tập 2 (Facebook, YouTube là dịch vụ đám mây) • Vận dụng 1 (Đám mây doanh nghiệp Việt Nam) • Vận dụng 2 (Hộp đen xe tải gửi GPS mỗi 30s)',
    keyTopics: ['Ví dụ 2: Nhà thông minh (Smart home)', 'Hình 8.5 Nhà thông minh điều khiển qua smartphone', 'Hộp Ghi nhớ 3 (Trang 43)', 'Luyện tập 1: Ích lợi thu phí không dừng ETC', 'Luyện tập 2: Mạng xã hội là dịch vụ đám mây', 'Vận dụng 1: Điện toán đám mây Việt Nam', 'Vận dụng 2: Hộp đen giám sát hành trình xe'],
    sectionPageIndex: 5
  },
  {
    pageNumber: 44,
    category: 'lesson',
    label: 'Bài 9 • Tr. 44',
    badge: 'Bài 9 • Tr. 44',
    title: 'Trang 44: Bài 9 • An toàn trên không gian mạng, Khởi động, Hoạt động 1 & 1. Một số nguy cơ trên mạng',
    src: '/assets/aistudio/image_0fd20f7e.png',
    desc: 'Chủ đề 2: Mạng máy tính và Internet • Bài 9: An toàn trên không gian mạng • 3 mục tiêu bài học • Khởi động: Tự bảo vệ trong môi trường mở • 1. Một số nguy cơ trên mạng: Hoạt động 1 (Kết bạn, Xem tin tức, Tải phần mềm) • Tin giả và tin phản văn hoá • Lừa đảo trên mạng (Lập Facebook giả mạo vay tiền) • Lộ thông tin cá nhân (Tên, SĐT, ngân hàng) • Hộp Các biện pháp bảo vệ thông tin cá nhân (Cẩn trọng Wi-Fi công cộng)',
    keyTopics: ['Chủ đề 2: Mạng máy tính và Internet', 'Mục tiêu Bài 9', 'Khởi động môi trường mở', 'Hoạt động 1: Nguy cơ trên mạng', 'Tin giả & tin phản văn hoá', 'Lừa đảo mạo danh Facebook', 'Lộ thông tin cá nhân', 'Biện pháp bảo vệ & Cảnh báo Wi-Fi công cộng'],
    sectionPageIndex: 0
  },
  {
    pageNumber: 45,
    category: 'lesson',
    label: 'Bài 9 • Tr. 45',
    badge: 'Bài 9 • Tr. 45',
    title: 'Trang 45: Bắt nạt mạng (5 biện pháp), Nghiện mạng, Hộp Ghi nhớ 1, Củng cố & 2. Phần mềm độc hại',
    src: '/assets/aistudio/image_0b1ca2f0.png',
    desc: 'Bắt nạt trên không gian mạng (Xỉ vả, lăng nhục, tống tiền, nguyên nhân tâm lý) • Hộp Một số biện pháp phòng chống bắt nạt (Không kết bạn dễ dãi, không tranh luận, lưu bằng chứng, chia sẻ người lớn, báo công an) • Nghiện mạng (Game, sức khỏe) • Hộp Ghi nhớ 1 (Trang 45) • Câu hỏi củng cố 1 & 2 • 2. Phần mềm độc hại: Hoạt động 2 (Virus máy tính và malware)',
    keyTopics: ['Bắt nạt trên không gian mạng', '5 biện pháp phòng chống bắt nạt', 'Nghiện mạng & sức khỏe', 'Hộp Ghi nhớ 1 (Trang 45)', 'Câu hỏi củng cố (Lộ mật khẩu, lừa đảo)', '2. Phần mềm độc hại (Malware)', 'Hoạt động 2: Phân loại mã độc'],
    sectionPageIndex: 1
  },
  {
    pageNumber: 46,
    category: 'lesson',
    label: 'Bài 9 • Tr. 46',
    badge: 'Bài 9 • Tr. 46',
    title: 'Trang 46: 2a. Cơ chế Virus, Worm, Trojan & 2b. Tác hại mã độc (Melissa, Code Red, WannaCry, DoS)',
    src: '/assets/aistudio/image_c6bf9cf4.png',
    desc: '2a. Tìm hiểu về virus, trojan, worm và cơ chế hoạt động • Virus: Đoạn mã độc ký sinh gắn vào phần mềm khác • Worm: Phần mềm hoàn chỉnh tự lây qua mạng và lỗ hổng HĐH • Trojan (Ngựa thành Troa): Phần mềm nội gián ngụy trang (Spyware, Keylogger, Backdoor, Rootkit) • 2b. Tác hại của phần mềm độc hại: 3 thảm họa sâu máy tính (Melissa 1999, Code Red 2001, WannaCry 2017) • Tấn công từ chối dịch vụ (DoS / DDoS) huy động đội quân ngầm botnet',
    keyTopics: ['Virus máy tính (Ký sinh gắn file)', 'Sâu máy tính Worm (Tự lây lan)', 'Trojan Horse (Nội gián ngụy trang)', 'Spyware, Keylogger, Backdoor, Rootkit', 'Sâu Melissa, Code Red, WannaCry', 'Tấn công từ chối dịch vụ (DoS / DDoS)'],
    sectionPageIndex: 2
  },
  {
    pageNumber: 47,
    category: 'lesson',
    label: 'Bài 9 • Tr. 47',
    badge: 'Bài 9 • Tr. 47',
    title: 'Trang 47: 2c. Phòng chống mã độc, Hộp Ghi nhớ 2, Bảng so sánh 3 loại malware & Thực hành Windows Defender',
    src: '/assets/aistudio/image_ce63ed24.png',
    desc: '2c. Phòng chống phần mềm độc hại: Cẩn trọng USB/thẻ nhớ, không dùng phần mềm bẻ khóa crack, không click link lạ, dùng Antivirus & Firewall • Hộp Ghi nhớ 2 (Trang 47) • Bảng tổng kết ba loại phần mềm độc hại (Virus vs Trojan vs Worm) • THỰC HÀNH: Dùng phần mềm phòng chống virus Windows Defender (Kaspersky, AVG, Avast, McAfee, BKAV, Windows Defender)',
    keyTopics: ['2c. Phòng chống phần mềm độc hại', 'Hộp Ghi nhớ 2 (Trang 47)', 'Bảng so sánh Virus - Trojan - Worm', 'Các phần mềm diệt virus & Firewall', 'Thực hành Windows Defender (Win 10/11)'],
    sectionPageIndex: 4
  },
  {
    pageNumber: 48,
    category: 'lesson',
    label: 'Bài 9 • Tr. 48',
    badge: 'Bài 9 • Tr. 48',
    title: 'Trang 48: Thực hành Nhiệm vụ 1: Thiết lập và truy cập Windows Security (Hình 9.1 & Hình 9.2)',
    src: '/assets/aistudio/image_59aca2a0.png',
    desc: 'Nhiệm vụ: Thiết lập các lựa chọn và quét virus với Windows Defender • Bước 1: Start → Setting → Windows Security → Virus & threat protection (Hình 9.1 Truy cập chức năng bảo vệ chống virus) • Bước 2: Quan sát cửa sổ Hình 9.2 (Current threats, Thông báo nguy cơ, Quét nhanh Quick scan, Kiểu quét Scan options, Lịch sử quét Threat history)',
    keyTopics: ['Nhiệm vụ thiết lập quét virus', 'Bước 1: Mở Windows Security (Hình 9.1)', 'Bước 2: Giao diện Virus & threat protection', 'Hình 9.2 Chức năng bảo vệ và nguy cơ', 'Current threats & Scan options'],
    sectionPageIndex: 4
  },
  {
    pageNumber: 49,
    category: 'lesson',
    label: 'Bài 9 • Tr. 49',
    badge: 'Bài 9 • Tr. 49',
    title: 'Trang 49: 4 Chế độ quét (Hình 9.3), Quét chuột phải (Hình 9.4), Luyện tập 1-2 & Vận dụng 1-2',
    src: '/assets/aistudio/image_2248b2f4.png',
    desc: 'Bước 3: Quét virus • 4 lựa chọn trong Scan options (Hình 9.3: 1. Quick scan, 2. Full scan, 3. Custom scan, 4. Windows Defender Offline scan) • Quét nhanh thư mục từ chuột phải (Hình 9.4: Scan with Windows Defender...) • Luyện tập 1: Nguy cơ mất an toàn mạng xã hội • Luyện tập 2: Các trường hợp nhiễm mã độc và cách phòng chống • Vận dụng 1: Cách thức tấn công DoS • Vận dụng 2: Tìm hiểu về một worm và tác hại',
    keyTopics: ['4 kiểu quét trong Scan options (Hình 9.3)', 'Quét nhanh thư mục chuột phải (Hình 9.4)', 'Luyện tập 1: Nguy cơ mạng xã hội', 'Luyện tập 2: Trường hợp nhiễm mã độc', 'Vận dụng 1: Tấn công từ chối dịch vụ DoS', 'Vận dụng 2: Khám phá sâu máy tính (Worm)'],
    sectionPageIndex: 5
  },
  {
    pageNumber: 50,
    category: 'lesson',
    label: 'Trang 50',
    badge: 'Nhiệm vụ 1: Bước 1-2',
    title: 'Trang 50: Mục tiêu, Khởi động & Nhiệm vụ 1: Giao diện Google Translate',
    src: '/assets/aistudio/image_0d6ece89.png',
    desc: 'Chủ đề 2: Mạng máy tính và Internet • Bài 10: Thực hành khai thác tài nguyên trên Internet • Mục tiêu bài học (Phần mềm dịch, kho học liệu mở) • Khởi động (Phần mềm luyện 4 kỹ năng nghe, nói, đọc, viết) • Nhiệm vụ 1: Sử dụng phần mềm dịch đa ngữ Google Translate (translate.google.com) • Hình 10.1: Giao diện dịch đa ngữ (Khung ngôn ngữ nguồn, khung ngôn ngữ đích, nút hoán đổi ⇄) • Bước 2: Xác định ngôn ngữ nguồn và ngôn ngữ đích',
    keyTopics: ['Mục tiêu bài 10 (Trang 50)', 'Khởi động: Phần mềm luyện 4 kỹ năng ngoại ngữ', 'Nhiệm vụ 1: translate.google.com', 'Hình 10.1: Giao diện dịch đa ngữ', 'Ngôn ngữ nguồn & Ngôn ngữ đích', 'Nút hoán đổi ⇄'],
    sectionPageIndex: 0
  },
  {
    pageNumber: 51,
    category: 'lesson',
    label: 'Trang 51',
    badge: 'Nhiệm vụ 1: Bước 3',
    title: 'Trang 51: Chọn ngôn ngữ & 3 phương thức nhập văn bản dịch',
    src: '/assets/aistudio/image_e2c2d1f7.png',
    desc: 'Hình 10.2: Chọn ngôn ngữ làm việc (Danh sách hơn 100 ngôn ngữ, thanh tìm kiếm ngôn ngữ) • Bước 3: Nhập văn bản để dịch • Cách 1: Nhập trực tiếp văn bản vào khung ngôn ngữ nguồn (Hình 10.3) • Cách 2: Nhập bằng giọng nói qua micro (Hình 10.4: Câu trích tiểu thuyết Thép đã tôi thế đấy của Ostrovski sang tiếng Nga)',
    keyTopics: ['Hình 10.2: Danh sách ngôn ngữ Google Translate', 'Cách 1: Nhập trực tiếp văn bản (Hình 10.3)', 'Cách 2: Nhập bằng giọng nói (Micro)', 'Trích dẫn Ostrovski: Thép đã tôi thế đấy (Hình 10.4)', 'Nhận diện giọng nói tiếng Việt → Nga'],
    sectionPageIndex: 1
  },
  {
    pageNumber: 52,
    category: 'lesson',
    label: 'Trang 52',
    badge: 'Nhiệm vụ 1: Dịch tệp',
    title: 'Trang 52: Nghe phát âm 2 tốc độ, Dịch tệp tài liệu & Kết quả bảng tính',
    src: '/assets/aistudio/image_efc3e1c6.png',
    desc: 'Biểu tượng chiếc loa (🔊) phát âm: Nháy lần 1 tốc độ bình thường, nháy lần 2 tốc độ chậm hơn • Cách 3: Nhập từ một tệp (Tài liệu: Word, Excel, PowerPoint, PDF) • Nút "Tìm tệp trên máy tính của bạn" (Hình 10.5) • Bước 4: Sao chép kết quả dịch vào tệp văn bản (Ctrl+C, Ctrl+V) • Lưu ý về bản dịch máy cần hoàn thiện • Hình 10.6: Kết quả dịch bảng tính Excel từ tiếng Anh sang tiếng Việt • Nhiệm vụ 2: Khai thác kho học liệu mở trên Internet',
    keyTopics: ['Biểu tượng chiếc loa: 2 tốc độ đọc (1.0x & chậm)', 'Cách 3: Dịch tệp tài liệu (Word, Excel, PPTX, PDF)', 'Hình 10.5: Tải tệp SPARE PATHS RESERVE.xlsx', 'Bước 4: Sao chép kết quả dịch (Ctrl+C, Ctrl+V)', 'Hình 10.6: Dịch bảng tính Anh - Việt', 'Bản dịch máy có thể chưa trau chuốt, cần rà soát'],
    sectionPageIndex: 2
  },
  {
    pageNumber: 53,
    category: 'lesson',
    label: 'Trang 53',
    badge: 'Nhiệm vụ 2: iGiaoDuc',
    title: 'Trang 53: Khái niệm OER (MIT 2002) & Cây phân cấp igiaoduc.vn',
    src: '/assets/aistudio/image_01487d64.png',
    desc: 'Nhiệm vụ 2: Hướng dẫn khai thác học liệu mở • Phong trào học liệu mở OER khởi đầu từ Viện Công nghệ Massachusetts (MIT) năm 2002 • Giới thiệu Kho học liệu số của Bộ GD&ĐT tại địa chỉ https://igiaoduc.vn • Cấu trúc cây 3 cấp: Cấp 1 (Học liệu, SGK, Dư địa chí), Cấp 2 (Khối 10), Cấp 3 (Môn học: Đại số, Hình học, Tin học...) • Bước 1: Truy cập igiaoduc.vn chọn Bài giảng điện tử • Bước 2: Chọn lớp (Lớp 10) và chọn môn học (Hình 10.7: Danh mục môn học Khối 10)',
    keyTopics: ['Học liệu mở OER (MIT 2002)', 'Kho học liệu Bộ GD&ĐT: igiaoduc.vn', 'Cấu trúc cây phân cấp 3 tầng', 'Bước 1: Chọn Bài giảng điện tử', 'Bước 2: Chọn Lớp 10 và môn học', 'Hình 10.7: Danh mục môn học Khối 10'],
    sectionPageIndex: 3
  },
  {
    pageNumber: 54,
    category: 'lesson',
    label: 'Trang 54',
    badge: 'Bước 3 & Luyện tập',
    title: 'Trang 54: Xem bài giảng trực tuyến, Luyện tập & Vận dụng',
    src: '/assets/aistudio/image_b46d4ce7.png',
    desc: 'Bước 3: Xem bài giảng • Hình 10.8: Danh mục bài giảng môn Toán (Đại số 10) • Nút "Học trực tuyến" • Hình 10.9: Giao diện xem video bài giảng truyền hình số hóa • Luyện tập 1: Dịch đoạn văn 3-4 câu 2 chiều và nhận xét độ chính xác • Luyện tập 2: Luyện phát âm từ mới tiếng Anh qua micro • Luyện tập 3: Tìm xem video Tin học 10 trên igiaoduc.vn • Vận dụng 1: Dịch tệp văn bản Word hoặc bảng tính Excel • Vận dụng 2: Khám phá thêm các kho học liệu mở khác (ViOLET, Khan Academy, MIT OCW)',
    keyTopics: ['Bước 3: Xem bài giảng (Hình 10.8)', 'Nút "Học trực tuyến" & Video bài giảng (Hình 10.9)', 'Luyện tập 1: Dịch văn bản 2 chiều & Nhận xét', 'Luyện tập 2: Luyện phát âm qua micro', 'Luyện tập 3: Xem bài giảng Tin học 10 igiaoduc.vn', 'Vận dụng 1: Dịch tệp Word/Excel', 'Vận dụng 2: Khám phá các kho OER khác'],
    sectionPageIndex: 4
  },
  {
    pageNumber: 55,
    category: 'lesson',
    label: 'Bài 11 • Tr. 55',
    badge: 'Bài 11 • Tr. 55',
    title: 'Trang 55: Bài 11 • Ứng xử trên môi trường số, Khởi động & Hoạt động 1',
    src: '/assets/aistudio/image_ed8f1bfa.png',
    desc: 'Chủ đề 3: Đạo đức, pháp luật và văn hoá trong môi trường số • Bài 11: Ứng xử trên môi trường số. Nghĩa vụ tôn trọng bản quyền • Mục tiêu bài học • Khởi động: Phân biệt vi phạm đạo đức vs vi phạm pháp luật • 1. Những vấn đề đạo đức, pháp luật và văn hoá: Hoạt động 1 (Tình huống bạo lực học đường và quay clip đưa lên mạng)',
    keyTopics: ['Chủ đề 3: Đạo đức, pháp luật và văn hoá trong môi trường số', 'Mục tiêu Bài 11', 'Khởi động: Vi phạm đạo đức vs Pháp luật', 'Hoạt động 1: Đánh nhau và quay video tung lên mạng', 'Yếu tố Internet làm trầm trọng sự việc'],
    sectionPageIndex: 0
  },
  {
    pageNumber: 56,
    category: 'lesson',
    label: 'Bài 11 • Tr. 56',
    badge: 'Bài 11 • Tr. 56',
    title: 'Trang 56: 7 Hành vi xấu trên mạng, Yếu tố không gian mạng & Hộp Ghi nhớ 1',
    src: '/assets/aistudio/image_75a49214.png',
    desc: 'Phân tích trách nhiệm hình sự (đủ 16 tuổi) và vi phạm đạo đức • 7 loại hành vi xấu khi giao tiếp trên mạng: Đưa tin không phù hợp, Công bố thông tin cá nhân/tổ chức trái phép, Thư rác/tin nhắn rác, Vi phạm bản quyền, Bắt nạt qua mạng, Lừa đảo qua mạng, Ứng xử thiếu văn hoá • Đặc thù không gian mạng (Giao tiếp gián tiếp, ẩn danh, không biên giới, lưu trữ lâu dài) • Hộp Ghi nhớ 1 (Trang 56)',
    keyTopics: ['Trách nhiệm hình sự từ 16 tuổi', '7 hành vi xấu trên không gian mạng', 'Đặc thù giao tiếp gián tiếp và ẩn danh', 'Tác động phát tán nhanh, rộng, lưu trữ lâu dài', 'Hộp Ghi nhớ 1 (Trang 56)'],
    sectionPageIndex: 1
  },
  {
    pageNumber: 57,
    category: 'lesson',
    label: 'Bài 11 • Tr. 57',
    badge: 'Bài 11 • Tr. 57',
    title: 'Trang 57: Câu hỏi củng cố, 2. Một số quy định pháp lí & Điều 12 Luật CNTT',
    src: '/assets/aistudio/image_a6b72521.png',
    desc: 'Câu hỏi củng cố: Tranh luận trên Facebook & Gửi thư điện tử • 2. Một số quy định pháp lí đối với người dùng trên mạng: a) Các văn bản quy phạm pháp luật (Luật GDĐT 2005, Luật CNTT 2006, Luật An ninh mạng 2018, Luật Hình sự 2017; Nghị định 90/2008, 72/2013, 15/2020; Quyết định 874/QĐ-BTTTT 2021) • Hoạt động 2: Hành vi đưa tin lên mạng • b) Quy định pháp luật: Điều 12 Khoản 2 Luật CNTT cấm 5 mục đích thông tin',
    keyTopics: ['Câu hỏi củng cố: Tranh luận & Gửi email', 'Các luật và nghị định quản lý CNTT tại Việt Nam', 'Hoạt động 2: Chia sẻ tin bịa đặt dịch bệnh', 'Điều 12 Khoản 2 Luật Công nghệ Thông tin 2006', '5 mục đích thông tin bị cấm'],
    sectionPageIndex: 2
  },
  {
    pageNumber: 58,
    category: 'lesson',
    label: 'Bài 11 • Tr. 58',
    badge: 'Bài 11 • Tr. 58',
    title: 'Trang 58: Điều 8 Luật An ninh mạng, Điều 101 Nghị định 15 & Bộ quy tắc QĐ 874',
    src: '/assets/aistudio/image_8cdc0124.png',
    desc: 'Điều 8 Khoản 1 Luật An ninh mạng (6 nhóm hành vi cấm) • Điều 101 Khoản 1 Nghị định 15/2020/NĐ-CP (8 nhóm vi phạm bưu chính, viễn thông, mạng xã hội kèm mức phạt 10-20 triệu VNĐ) • Quyết định 874/QĐ-BTTTT (Bộ quy tắc ứng xử trên mạng xã hội) • Hộp Các nguyên tắc để nâng cao tính an toàn khi chia sẻ thông tin trên môi trường số',
    keyTopics: ['Điều 8 Khoản 1 Luật An ninh mạng 2018', 'Điều 101 Khoản 1 Nghị định 15/2020/NĐ-CP (Phạt 10-20 triệu VNĐ)', 'Quyết định số 874/QĐ-BTTTT Bộ Quy tắc ứng xử', '4 nguyên tắc an toàn khi chia sẻ thông tin'],
    sectionPageIndex: 2
  },
  {
    pageNumber: 59,
    category: 'lesson',
    label: 'Bài 11 • Tr. 59',
    badge: 'Bài 11 • Tr. 59',
    title: 'Trang 59: Hộp Ghi nhớ 2, Câu hỏi Covid-19 & 3. Quyền tác giả (Luật SHTT 2019)',
    src: '/assets/aistudio/image_f7d1fcad.png',
    desc: 'Hộp Ghi nhớ 2 (Xem xét quy định pháp luật và chuẩn mực đạo đức) • Câu hỏi củng cố 1 (Đăng lịch trình Covid-19 sai sự thật) • Câu hỏi 2 (Quảng cáo thuốc sai sự thật Điều 101 NĐ 15) • 3. Quyền tác giả và bản quyền: a) Quyền tác giả • Hoạt động 3: Tìm hiểu quyền tác giả • Định nghĩa quyền tác giả và tác phẩm phái sinh • Luật Sở hữu trí tuệ 2019: Quyền nhân thân (Điều 19) vs Quyền tài sản (Điều 20) • Khác biệt bản chất giữa Quyền tác giả và Bản quyền thương mại',
    keyTopics: ['Hộp Ghi nhớ 2 (Trang 59)', 'Câu hỏi 1: Lịch trình giả Covid-19', 'Câu hỏi 2: Quảng cáo thuốc giả mạo', '3. Quyền tác giả và bản quyền', 'Hoạt động 3: Tìm hiểu quyền tác giả', 'Luật Sở hữu trí tuệ 2019', 'Quyền nhân thân vs Quyền tài sản', 'Quyền tác giả vs Bản quyền thương mại'],
    sectionPageIndex: 3
  },
  {
    pageNumber: 60,
    category: 'lesson',
    label: 'Bài 11 • Tr. 60',
    badge: 'Bài 11 • Tr. 60',
    title: 'Trang 60: 3b. Vi phạm bản quyền sản phẩm tin học (Hoạt động 4 & 8 Hành vi vi phạm)',
    src: '/assets/aistudio/image_f6364b89.png',
    desc: 'Thuật ngữ chính thức trong pháp luật Việt Nam: Quyền tác giả • b) Vi phạm bản quyền đối với các sản phẩm tin học • Hoạt động 4: Tình huống 1 Hoàng & USB nhạc; Tình huống 2 Lan & Đĩa CD phần mềm cài máy bạn • 8 Hành vi vi phạm bản quyền đối với tác phẩm số: Mạo danh tác giả, Công bố không phép, Sửa chữa cắt xén, Dùng phần mềm lậu, Phá khóa (crack), Làm và phân phối bản phái sinh lậu, Chiếm đoạt mã nguồn, Đăng tải không xin phép',
    keyTopics: ['Hoạt động 4: Hoàng & Lan vi phạm bản quyền', '8 Hành vi vi phạm bản quyền đối với sản phẩm số', 'Mạo danh tác giả', 'Phá khóa phần mềm (Crack)', 'Sử dụng phần mềm lậu', 'Chiếm đoạt mã phần mềm công ty'],
    sectionPageIndex: 4
  },
  {
    pageNumber: 61,
    category: 'lesson',
    label: 'Bài 11 • Tr. 61',
    badge: 'Bài 11 • Tr. 61',
    title: 'Trang 61: 3c. Tôn trọng bản quyền trong tin học, Nghị định 131 & Hộp Ghi nhớ 3',
    src: '/assets/aistudio/image_97e47baa.png',
    desc: 'c) Tôn trọng bản quyền trong tin học: Phân biệt Mua bản quyền (Toàn quyền kinh doanh như Google mua YouTube) vs Mua quyền sử dụng Licence (Chỉ dùng theo số máy quy định như Microsoft, Adobe) • Đặc tính sản phẩm số: Dễ sao chép giá rẻ, dễ phát tán quy mô lớn • Chế tài xử phạt theo Nghị định 131/2013/NĐ-CP (Truyền đạt, sao chép trái phép, cố ý bẻ khóa crack) • Hộp Ghi nhớ 3 (Trang 61)',
    keyTopics: ['Mua bản quyền vs Mua quyền sử dụng (Licence)', 'Google mua YouTube vs Mua bản quyền Windows/Office', 'Đặc tính sản phẩm số (Dễ sao chép, dễ phát tán)', 'Nghị định 131/2013/NĐ-CP xử phạt vi phạm bản quyền', 'Hộp Ghi nhớ 3 (Trang 61)'],
    sectionPageIndex: 4
  },
  {
    pageNumber: 62,
    category: 'lesson',
    label: 'Bài 11 • Tr. 62',
    badge: 'Bài 11 • Tr. 62',
    title: 'Trang 62: Câu hỏi kiểm tra nhanh, Luyện tập 1-2 & Vận dụng 1-2',
    src: '/assets/aistudio/image_9dbccfbd.png',
    desc: 'Câu hỏi củng cố 1 (Hành vi vi phạm bản quyền: Sao chép đĩa, chia sẻ tài khoản học, bẻ khóa crack) • Câu hỏi 2 (Ví dụ vi phạm bản quyền tin học) • Luyện tập 1: Đánh giá 3 quan điểm đưa tin lên mạng (Không phải tin giả, Không hại cá nhân ai, Không vi phạm luật) • Luyện tập 2: Phân tích vụ chia sẻ tin phong tỏa TP.HCM 14 ngày Covid-19 • Vận dụng 1: Nhận xét xúc phạm người khác (Vi phạm đạo đức hay pháp luật) • Vận dụng 2: Bác bỏ quan niệm "không biết là không có lỗi" của Bình khi dùng phần mềm bẻ khóa crack',
    keyTopics: ['Câu hỏi 1 & 2: Nhận diện vi phạm bản quyền', 'Luyện tập 1: Đánh giá 3 quan điểm đưa tin lên mạng', 'Luyện tập 2: Chia sẻ lại tin giả phong tỏa Covid-19', 'Vận dụng 1: Đăng nhận xét xúc phạm người khác', 'Vận dụng 2: "Không biết là không có lỗi" khi dùng phần mềm bẻ khóa'],
    sectionPageIndex: 5
  },
  {
    pageNumber: 63,
    category: 'lesson',
    label: 'Bài 12 • Tr. 63',
    badge: 'Bài 12 • Tr. 63',
    title: 'Trang 63: Chủ đề 4 • Bài 12: Phần mềm thiết kế đồ hoạ • Mục tiêu & Khởi động 12.1a vs 12.1b',
    src: '/assets/aistudio/image_1665c415.png',
    desc: 'Chủ đề 4: Ứng dụng tin học • Bài 12: Phần mềm thiết kế đồ hoạ • Mục tiêu bài học (Khái niệm thiết kế đồ hoạ, phân biệt vector và bitmap, sử dụng Inkscape) • Khởi động: Quan sát ảnh chụp hoa cúc Hình 12.1a và hình vẽ hoa vector Hình 12.1b • 1. Thiết kế đồ hoạ: Hoạt động 1 (So sánh ảnh chụp và hình vẽ bằng phần mềm) • Định nghĩa Thiết kế đồ hoạ (Graphic design) • Khái niệm đồ hoạ điểm ảnh (bitmap - pixel) và đồ hoạ vecto (vector - phương trình toán học)',
    keyTopics: ['Chủ đề 4: Ứng dụng tin học (Trang 63)', 'Bài 12: Phần mềm thiết kế đồ hoạ', 'Mục tiêu bài học', 'Khởi động: Hình 12.1a (ảnh chụp) vs 12.1b (hình vẽ)', 'Hoạt động 1: So sánh ảnh chụp và hình vẽ', 'Định nghĩa Graphic Design', 'Đồ hoạ điểm ảnh (bitmap) vs Đồ hoạ vecto (vector)'],
    sectionPageIndex: 0
  },
  {
    pageNumber: 64,
    category: 'lesson',
    label: 'Bài 12 • Tr. 64',
    badge: 'Bài 12 • Tr. 64',
    title: 'Trang 64: Hình 12.2 Kính lúp, Bảng so sánh Bitmap vs Vector, Hộp Ghi nhớ 1 & 2. Phần mềm đồ hoạ',
    src: '/assets/aistudio/image_5f20f404.png',
    desc: 'Hình 12.2: Phóng to một phần ảnh gốc (Bitmap vỡ hạt răng cưa vs Vector trơn mịn) • Bảng so sánh giữa đồ hoạ điểm ảnh và đồ hoạ vecto (5 tiêu chí: định nghĩa, phù hợp ứng dụng, ảnh hưởng phóng to, kích thước tệp, khả năng chuyển đổi) • Hộp Ghi nhớ 1 (Trang 64) • Câu hỏi củng cố 1 & 2 • 2. Phần mềm đồ hoạ: Hoạt động 2 (Thiết kế logo bóng đá) • Phân loại: Phần mềm vector (Illustrator, CorelDRAW, Inkscape) vs Phần mềm xử lí bitmap (Photoshop, GIMP)',
    keyTopics: ['Hình 12.2: Kính lúp phóng to đối chiếu', 'Bảng so sánh 5 tiêu chí Bitmap vs Vector', 'Hộp Ghi nhớ 1 (Trang 64)', 'Câu hỏi củng cố (Ảnh chụp & Thiết kế logo)', '2. Phần mềm đồ hoạ', 'Hoạt động 2: Thiết kế logo đội bóng', 'Illustrator, CorelDRAW, Inkscape vs Photoshop, GIMP'],
    sectionPageIndex: 1
  },
  {
    pageNumber: 65,
    category: 'lesson',
    label: 'Bài 12 • Tr. 65',
    badge: 'Bài 12 • Tr. 65',
    title: 'Trang 65: Phần mềm miễn phí Inkscape/GIMP, Link tải & Hình 12.3 Màn hình làm việc Inkscape 1.0.1',
    src: '/assets/aistudio/image_b8157529.png',
    desc: 'Inkscape và GIMP là phần mềm miễn phí mã nguồn mở • a) Tải và cài đặt phần mềm: inkscape.org/release/inkscape-1.0/ (Windows 32/64 bits, MacOS...) • b) Giao diện của Inkscape: Khởi động bằng biểu tượng Inkscape trên desktop • Hình 12.3: Màn hình làm việc Inkscape 1.0.1 với 10 thành phần giao diện (Thanh bảng chọn, Thanh điều khiển thuộc tính, Hộp thoại lệnh, Các nút lệnh nhanh, Trang in, Vùng làm việc, Hộp công cụ, Bảng màu, Thanh trạng thái, Thanh thiết lập chế độ kết dính) • Giải thích chi tiết 5 thành phần đầu tiên',
    keyTopics: ['Phần mềm mã nguồn mở miễn phí (FOSS)', 'Tải Inkscape tại inkscape.org', 'Hình 12.3: Giao diện Inkscape 1.0.1', '10 thành phần giao diện chuẩn', 'Thanh bảng chọn (Menu bar)', 'Hộp công cụ (Tool box)', 'Thanh điều khiển thuộc tính (Tool control bar)', 'Vùng làm việc (Canvas) & Trang in', 'Bảng màu (Color Palette)', 'Thanh trạng thái (Status bar)'],
    sectionPageIndex: 2
  },
  {
    pageNumber: 66,
    category: 'lesson',
    label: 'Bài 12 • Tr. 66',
    badge: 'Bài 12 • Tr. 66',
    title: 'Trang 66: Hộp Ghi nhớ 2, Câu hỏi củng cố, 3. Đối tượng đồ hoạ & Hộp công cụ Hình 12.4',
    src: '/assets/aistudio/image_c6b74da9.png',
    desc: 'Hộp Ghi nhớ 2 (Inkscape là phần mềm mã nguồn mở để tạo và chỉnh sửa vector) • Câu hỏi củng cố 1 (Bộ nhận diện thương hiệu) & 2 (Vùng vẽ canvas) • 3. Các đối tượng đồ hoạ của hình vẽ: Đối tượng hình khối cơ bản (chữ nhật, vuông, tròn, elip, đa giác, sao, xoắn ốc...) • Hoạt động 3: Đĩa dưa hấu và quả cam trên bàn (Nguyên tắc lớp xếp chồng đối tượng) • Các bước vẽ hình đơn giản: 1. Chọn công cụ; 2. Kéo thả chuột; 3. Đổi thuộc tính • Hình 12.4: Một số công cụ trên Hộp công cụ (Select F1, Edit paths F2, Zoom F3, Rectangles F4, Ellipses F5, Stars/Polygons *, Draw Bézier curves Shift+F6) • Hai chế độ điều khiển khi nháy chuột 1 lần (co giãn kích thước) và 2 lần (xoay đối tượng quanh tâm)',
    keyTopics: ['Hộp Ghi nhớ 2 (Trang 66)', 'Câu hỏi củng cố 1 & 2', '3. Các đối tượng đồ hoạ của hình vẽ', 'Hoạt động 3: Đĩa quả & Thứ tự lớp xếp chồng', '3 bước vẽ hình cơ bản trong Inkscape', 'Hình 12.4: Chi tiết Hộp công cụ & Phím tắt (F1 - F5, *)', 'Công cụ Select (F1): Co giãn vs Xoay quanh tâm'],
    sectionPageIndex: 3
  },
  {
    pageNumber: 67,
    category: 'lesson',
    label: 'Bài 12 • Tr. 67',
    badge: 'Bài 12 • Tr. 67',
    title: 'Trang 67: Màu Fill & Stroke, Định dạng tệp .svg, Hộp Ghi nhớ 3 & Thực hành Nhiệm vụ 1',
    src: '/assets/aistudio/image_29949fef.png',
    desc: 'Thiết lập màu tô (Fill) và màu viền (Stroke) từ Bảng màu: Nháy chuột = Fill, Giữ Shift + nháy chuột = Stroke, Nháy vào ô vuông dấu X = Bỏ màu • Lưu tệp: File → Save (Ctrl+S), phần mở rộng mặc định là .svg (Scalable Vector Graphics) • Hộp Ghi nhớ 3 (Trang 67) • Câu hỏi củng cố: Đổi màu tô/viền • THỰC HÀNH: Nhiệm vụ 1: Vẽ một bông hoa (Hình 12.5) với cánh hoa sao chép Ctrl+D và xoay quanh tâm • Nhiệm vụ 2: Vẽ lá cờ Tổ quốc Việt Nam (Hình 12.6) - Bước 1 vẽ ngôi sao 5 cánh vàng (Corners: 5, Spoke ratio: 0.4)',
    keyTopics: ['Quy tắc gán màu: Nháy = Fill, Shift+Nháy = Stroke', 'Bỏ màu bằng ô gạch chéo X', 'Lưu tệp SVG (Ctrl+S)', 'Hộp Ghi nhớ 3 (Trang 67)', 'Thực hành Nhiệm vụ 1: Vẽ bông hoa (Hình 12.5)', 'Kỹ thuật Duplicate (Ctrl+D) & Xoay tâm', 'Nhiệm vụ 2: Vẽ lá cờ Tổ quốc Việt Nam (Hình 12.6)', 'Tham số Ngôi sao: Corners = 5, Spoke ratio = 0.4'],
    sectionPageIndex: 4
  },
  {
    pageNumber: 68,
    category: 'lesson',
    label: 'Bài 12 • Tr. 68',
    badge: 'Bài 12 • Tr. 68',
    title: 'Trang 68: Hoàn thiện Cờ đỏ sao vàng, Luyện tập 1-2 & Vận dụng 1-2 (Quốc kỳ & Hình thú)',
    src: '/assets/aistudio/image_23a16764.png',
    desc: 'Nhiệm vụ 2 (tiếp): Vẽ hình chữ nhật màu đỏ tỉ lệ 2:3, hạ hình chữ nhật xuống dưới ngôi sao bằng lệnh Object → Lower to bottom (Phím End) • Luyện tập 1: Thao tác đổi màu hình tròn (Đỏ, Vàng, Cam, Shift+Đỏ) • Luyện tập 2: Vị trí công cụ Create 3D boxes trong Hộp công cụ • Vận dụng 1: Vẽ quốc kỳ Thái Lan, Lào, Myanmar, Anh (Hình 12.7) • Vận dụng 2: Ghép hình con chó và con hươu nhỏ từ các khối cơ bản (Hình 12.8)',
    keyTopics: ['Hoàn thiện Cờ đỏ sao vàng (Hình chữ nhật 2:3 đỏ)', 'Lệnh Lower to bottom (Phím End) xếp lớp Z-order', 'Luyện tập 1: Thao tác màu Fill và Stroke', 'Luyện tập 2: Công cụ hộp lập phương 3D (Hộp công cụ)', 'Vận dụng 1: Vẽ quốc kỳ 4 nước (Thái Lan, Lào, Myanmar, Anh)', 'Vận dụng 2: Ghép hình động vật con chó, con hươu (Hình 12.8)'],
    sectionPageIndex: 5
  },
  {
    pageNumber: 69,
    category: 'lesson',
    label: 'Bài 13 • Tr. 69',
    badge: 'Bài 13 • Tr. 69',
    title: 'Trang 69: Bài 13: Bổ sung các đối tượng đồ hoạ • Mục tiêu & Khởi động Hình 13.1 Miếng dưa hấu',
    src: '/assets/aistudio/image_2a77aba7.png',
    desc: 'Chủ đề 4: Ứng dụng tin học • Bài 13: Bổ sung các đối tượng đồ hoạ • 2 mục tiêu bài học (Tạo/điều chỉnh đối tượng đơn giản; Thực hiện phép ghép trong Inkscape) • Khởi động: Quan sát miếng dưa hấu Hình 13.1 & xác định thứ tự lớp xếp chồng • 1. Các đối tượng hình khối: Hoạt động 1 (Các biến thể hình sao Hình 13.2) • Bảng thuộc tính cơ bản của một số hình có sẵn (W, H, Rx, Ry cho hình chữ nhật; Rx, Ry, Start, End cho hình elip/cung)',
    keyTopics: ['Mục tiêu Bài 13 (Trang 69)', 'Khởi động: Hình 13.1 Miếng dưa hấu & Thứ tự lớp', '1. Các đối tượng hình khối', 'Hoạt động 1: 4 biến thể hình sao (Hình 13.2)', 'Bảng thuộc tính: W, H, Rx, Ry, Start, End'],
    sectionPageIndex: 0
  },
  {
    pageNumber: 70,
    category: 'lesson',
    label: 'Bài 13 • Tr. 70',
    badge: 'Bài 13 • Tr. 70',
    title: 'Trang 70: Bảng thuộc tính Sao/Đa giác, Hộp Ghi nhớ 1 & 2. Thiết lập màu tô, màu vẽ (Hình 13.4)',
    src: '/assets/aistudio/image_67be1e11.png',
    desc: 'Bảng thuộc tính tiếp: Corners, Rounded, Spoke ratio, Randomized • Hộp Ghi nhớ 1 (Trang 70) • Câu hỏi củng cố (Làm cong cánh sao bằng Rounded) • 2. Thiết lập màu tô, màu vẽ và tô màu cho đối tượng: Hoạt động 2 (So sánh 5 kiểu tô màu Hình 13.3) • Hộp thoại Fill and Stroke (Hình 13.4) với 3 trang: Fill, Stroke paint, Stroke style • Ý nghĩa 6 nút kiểu tô (Không màu, Đồng nhất, Linear gradient, Radial gradient, Hoa văn, Huỷ đặt)',
    keyTopics: ['Bảng thuộc tính: Corners, Rounded, Spoke ratio, Randomized', 'Hộp Ghi nhớ 1 (Trang 70)', 'Câu hỏi: Thay đổi tham số Rounded để làm cong cánh sao', '2. Thiết lập màu tô, màu vẽ và tô màu cho đối tượng', 'Hoạt động 2: 5 kiểu tô màu (Hình 13.3)', 'Hộp thoại Fill and Stroke (Hình 13.4) & 3 tab'],
    sectionPageIndex: 1
  },
  {
    pageNumber: 71,
    category: 'lesson',
    label: 'Bài 13 • Tr. 71',
    badge: 'Bài 13 • Tr. 71',
    title: 'Trang 71: Chỉnh sửa Gradient, Opacity, Hộp Ghi nhớ 2 & 3. Các phép ghép đối tượng (Menu Path)',
    src: '/assets/aistudio/image_e41d0bcb.png',
    desc: 'Chỉnh màu gradient bằng công cụ cây bút/Gradient • Công cụ chấm màu (Eyedropper) • Giá trị Opacity và Alpha (A) • Hộp Ghi nhớ 2 (Trang 71) • Câu hỏi củng cố 1 (Chọn trang Stroke style để chỉnh nét đứt) & 2 (Chọn biểu tượng cây bút để chỉnh gradient) • 3. Các phép ghép đối tượng đồ hoạ: Hoạt động 3 (Ghép 1 hình vuông và 2 hình tròn thành trái tim Hình 13.5) • 6 phép ghép trong menu Path: Hợp (Union Ctrl++), Hiệu (Difference Ctrl+-), Giao (Intersection Ctrl+*), Hiệu đối xứng (Exclusion Ctrl+^), Chia (Division Ctrl+/)',
    keyTopics: ['Chỉnh gradient bằng bút/Gradient tool', 'Độ trong suốt Opacity & Giá trị Alpha (A)', 'Hộp Ghi nhớ 2 (Trang 71)', 'Câu hỏi 1 (Tab Stroke style) & Câu hỏi 2 (Biểu tượng cây bút)', '3. Các phép ghép đối tượng đồ hoạ', 'Hoạt động 3: Ghép hình trái tim (Hình 13.5)', '5 phép ghép đầu tiên trong menu Path'],
    sectionPageIndex: 2
  },
  {
    pageNumber: 72,
    category: 'lesson',
    label: 'Bài 13 • Tr. 72',
    badge: 'Bài 13 • Tr. 72',
    title: 'Trang 72: Phép Cắt (Cut Path), Hình 13.6, Hộp Ghi nhớ 3 & Thực hành Nhiệm vụ 1: Vẽ logo',
    src: '/assets/aistudio/image_cbb9ad90.png',
    desc: 'Phép Cắt (Cut Path, Ctrl+Alt+/): Cắt nét viền hình dưới thành các đoạn mở • Hình 13.6: Minh họa trực quan kết quả 6 phép ghép trên hình vuông và hình tròn • Hộp Ghi nhớ 3 (Trang 72) • Câu hỏi củng cố (Ghép hình đám mây Hình 13.7 bằng phép Hợp/Union) • THỰC HÀNH: Nhiệm vụ 1: Vẽ logo từ các hình kỷ hà (Hình 13.8) gồm 3 cung tròn lồng nhau xoay 120 độ',
    keyTopics: ['Phép Cắt Cut Path (Ctrl+Alt+/)', 'Hình 13.6: Kết quả 6 phép ghép đồ hoạ', 'Hộp Ghi nhớ 3 (Trang 72)', 'Câu hỏi: Ghép đám mây Hình 13.7 bằng Union', 'Thực hành Nhiệm vụ 1: Vẽ logo 3 cung tròn (Hình 13.8)'],
    sectionPageIndex: 3
  },
  {
    pageNumber: 73,
    category: 'lesson',
    label: 'Bài 13 • Tr. 73',
    badge: 'Bài 13 • Tr. 73',
    title: 'Trang 73: Hình 13.9 Các bước vẽ logo, Nhiệm vụ 2: Vẽ cây & Nhiệm vụ 3: Hình cầu 3D Radial Gradient',
    src: '/assets/aistudio/image_fb5a7fd3.png',
    desc: 'Hình 13.9: Các bước vẽ logo (a: hình tròn; b: mở cung tròn Arc; c: tăng Stroke width; d: nhân bản Ctrl+D và xoay 120 độ; e: hoàn thiện màu) • Nhiệm vụ 2: Vẽ hình cây (Hình 13.10 & 13.11a-f) bằng kết hợp Difference khoét thân cây và Union gộp tán lá • Nhiệm vụ 3: Vẽ hình cầu 3D có độ sâu bằng Radial Gradient (Hình 13.12 & 13.13a-c: Vẽ hình tròn, chọn Radial gradient, chỉnh tâm sáng lệch góc trên bên trái)',
    keyTopics: ['Hình 13.9: 5 bước vẽ logo cung tròn', 'Nhiệm vụ 2: Vẽ hình cây (Hình 13.10 & 13.11)', 'Dùng Difference khoét eo thân cây', 'Dùng Union hợp nhất toàn bộ cây', 'Nhiệm vụ 3: Vẽ hình cầu 3D (Hình 13.12 & 13.13)', 'Tô màu chuyển sắc toả tròn Radial Gradient', 'Kéo tâm sáng tạo bóng khối 3 chiều'],
    sectionPageIndex: 4
  },
  {
    pageNumber: 74,
    category: 'lesson',
    label: 'Bài 13 • Tr. 74',
    badge: 'Bài 13 • Tr. 74',
    title: 'Trang 74: Bước 4 Hoàn thiện hình cầu, Luyện tập 1-3 & Vận dụng 1-2 (Dưa hấu & Khối không gian)',
    src: '/assets/aistudio/image_9ad20852.png',
    desc: 'Bước 4: Hoàn thiện hình cầu 3D • Luyện tập 1: Vẽ bông hoa Hình 13.14 từ hình sao bo góc Rounded • Luyện tập 2: Vẽ quân bích Hình 13.15 bằng ghép trái tim ngược và chân đế bằng phép Union • Luyện tập 3: Vẽ chùm bóng bay Hình 13.16 gồm nhiều quả bóng elip có vệt phản quang ánh sáng • Vận dụng 1: Vẽ hoàn thiện miếng dưa hấu Hình 13.1 • Vận dụng 2: Vẽ các hình khối trong không gian 3 chiều có bóng đổ',
    keyTopics: ['Bước 4: Hoàn thiện hình cầu 3D', 'Luyện tập 1: Vẽ bông hoa Hình 13.14 (Rounded)', 'Luyện tập 2: Vẽ quân bích Hình 13.15 (Union)', 'Luyện tập 3: Vẽ chùm bóng bay Hình 13.16 (Highlight)', 'Vận dụng 1: Vẽ miếng dưa hấu nhiều lớp Hình 13.1', 'Vận dụng 2: Vẽ hình khối không gian 3D'],
    sectionPageIndex: 5
  },
  {
    pageNumber: 75,
    category: 'lesson',
    label: 'Bài 14 • Tr. 75',
    badge: 'Bài 14 • Tr. 75',
    title: 'Trang 75: Bài 14: Làm việc với đối tượng đường và văn bản • Mục tiêu & 1. Đối tượng dạng đường',
    src: '/assets/aistudio/image_a84a029e.png',
    desc: 'Chủ đề 4: Ứng dụng tin học • Bài 14: Làm việc với đối tượng đường và văn bản • 3 mục tiêu bài học • Khởi động: Số điểm xác định đường thẳng, parabol, đoạn cong • 1. Làm quen với đối tượng dạng đường: Hoạt động 1 (So sánh hai hình chữ nhật Hình 14.1) • Đối tượng hình khối vs đối tượng tự do dạng đường • Hình 14.2: Biến đổi hình khối sang đường • Hình 14.3: Cấu trúc 4 điểm của một đoạn cong Bézier',
    keyTopics: ['Mục tiêu Bài 14 (Trang 75)', 'Khởi động: Điểm xác định đường thẳng/parabol', '1. Làm quen với đối tượng dạng đường', 'Hoạt động 1: So sánh hai hình chữ nhật (Hình 14.1)', 'Hình khối vs Đối tượng đường tự do', 'Hình 14.2: Biến đổi hình khối sang đường', 'Hình 14.3: Cấu trúc đoạn cong Bézier (4 điểm)'],
    sectionPageIndex: 0
  },
  {
    pageNumber: 76,
    category: 'lesson',
    label: 'Bài 14 • Tr. 76',
    badge: 'Bài 14 • Tr. 76',
    title: 'Trang 76: 4 Bước vẽ Pen, Hộp Ghi nhớ 1, Củng cố & 2. Sử dụng công cụ tinh chỉnh đường',
    src: '/assets/aistudio/image_cd28f9e2.png',
    desc: '4 bước vẽ đối tượng đường bằng Pen (Shift+F6) • Hộp Ghi nhớ 1 (Trang 76) • Câu hỏi củng cố (Dùng Rectangles hay Pen để vẽ HCN bo tròn góc) • 2. Sử dụng công cụ tinh chỉnh đường: Hoạt động 2 (Nhận dạng điểm neo trên hình trái tim Hình 14.4) • Điểm neo trơn (smooth nodes) vs điểm neo góc (corner nodes) • Công cụ tinh chỉnh điểm F2 • Hình 14.5: Điểm chỉ hướng và đường chỉ hướng',
    keyTopics: ['4 bước vẽ đối tượng đường bằng Pen (Shift+F6)', 'Hộp Ghi nhớ 1 (Trang 76)', 'Câu hỏi củng cố: Vẽ HCN bo tròn góc', '2. Sử dụng công cụ tinh chỉnh đường', 'Hoạt động 2: Nhận dạng điểm neo (Hình 14.4)', 'Neo trơn (smooth) vs Neo góc (corner)', 'Hình 14.5: Điểm chỉ hướng & đường chỉ hướng'],
    sectionPageIndex: 1
  },
  {
    pageNumber: 77,
    category: 'lesson',
    label: 'Bài 14 • Tr. 77',
    badge: 'Bài 14 • Tr. 77',
    title: 'Trang 77: Đặc điểm neo trơn, 3 bước chỉnh sửa, Hình 14.6 Thanh thuộc tính & Hộp Ghi nhớ 2',
    src: '/assets/aistudio/image_2d786a63.png',
    desc: 'Điểm neo trơn có hai đường chỉ hướng luôn cùng phương • 3 bước thực hiện chỉnh sửa điểm neo bằng F2 • Hình 14.6: Các biểu tượng trên thanh điều khiển thuộc tính (Thêm điểm, Bỏ điểm, Gộp điểm, Tách điểm, Thêm liên kết, Bỏ liên kết, Chuyển đổi loại điểm neo, Chuyển khối thành đường) • Hộp Ghi nhớ 2 (Trang 77) • Câu hỏi củng cố (Hình 14.7: Có mấy đoạn cong, xác định neo trơn và neo góc)',
    keyTopics: ['Đặc điểm neo trơn (cùng phương)', '3 bước chỉnh sửa điểm neo bằng F2', 'Hình 14.6: 8 nhóm nút lệnh thanh điều khiển thuộc tính', 'Path -> Object to Path (Shift+Ctrl+C)', 'Hộp Ghi nhớ 2 (Trang 77)', 'Câu hỏi củng cố Hình 14.7: Xác định neo trơn và neo góc'],
    sectionPageIndex: 2
  },
  {
    pageNumber: 78,
    category: 'lesson',
    label: 'Bài 14 • Tr. 78',
    badge: 'Bài 14 • Tr. 78',
    title: 'Trang 78: 3. Đối tượng văn bản, Hoạt động 3, Công cụ Text (A/F8) & Hình 14.9-14.10',
    src: '/assets/aistudio/image_d73722d0.png',
    desc: '3. Đối tượng văn bản: Hoạt động 3 (So sánh cách trình bày chữ nằm ngang vs uốn lượn Hình 14.8) • Công cụ Text (A hoặc F8) • Hình 14.9: Thanh điều khiển thuộc tính định dạng phông chữ, cỡ chữ, kiểu dáng, căn lề, khoảng cách dòng • Hình 14.10: 5 ô điều chỉnh cụm kí tự (Letter spacing, Word spacing, dx, dy, Rotation) • Ví dụ dịch chuyển và xoay cụm kí tự "ĐIỆN", "NƯỚC"',
    keyTopics: ['3. Đối tượng văn bản', 'Hoạt động 3: Chữ thẳng vs Chữ uốn lượn (Hình 14.8)', 'Công cụ Text (A hoặc F8)', 'Hình 14.9: Định dạng font, size, style, spacing', 'Hình 14.10: 5 ô điều chỉnh cụm kí tự (dx, dy, xoay)', 'Bảng hiệu ứng dịch chuyển cụm từ ĐIỆN NƯỚC'],
    sectionPageIndex: 3
  },
  {
    pageNumber: 79,
    category: 'lesson',
    label: 'Bài 14 • Tr. 79',
    badge: 'Bài 14 • Tr. 79',
    title: 'Trang 79: Text Put on Path, Hộp Ghi nhớ 3, Củng cố & Thực hành Nhiệm vụ 1 (Vẽ chiếc lá)',
    src: '/assets/aistudio/image_10cbf5cd.png',
    desc: 'Lệnh Text -> Remove Manual Kerns • Lệnh Text -> Put on Path (Đặt chữ theo đường) • Lệnh Text -> Remove from Path (Hủy đặt chữ theo đường) • Hộp Ghi nhớ 3 (Trang 79) • Câu hỏi củng cố (Chỉ ra phát biểu sai về văn bản) • THỰC HÀNH: Nhiệm vụ 1: Vẽ chiếc lá (Hình 14.11) • Bước 1: Vẽ hình chữ nhật và chuyển thành đường (Object to Path)',
    keyTopics: ['Lệnh Text -> Put on Path (Đặt chữ theo đường)', 'Lệnh Text -> Remove from Path (Hủy đặt chữ)', 'Text -> Remove Manual Kerns', 'Hộp Ghi nhớ 3 (Trang 79)', 'Câu hỏi củng cố: Phát biểu sai về văn bản', 'Thực hành Nhiệm vụ 1: Vẽ chiếc lá (Hình 14.11)', 'Bước 1: Vẽ hình chữ nhật và chuyển thành đường'],
    sectionPageIndex: 4
  },
  {
    pageNumber: 80,
    category: 'lesson',
    label: 'Bài 14 • Tr. 80',
    badge: 'Bài 14 • Tr. 80',
    title: 'Trang 80: Hoàn thiện chiếc lá, Nhiệm vụ 2: Viết chữ theo dải cờ (Hình 14.13 & 14.14)',
    src: '/assets/aistudio/image_a8ed4674.png',
    desc: 'Nhiệm vụ 1 (tiếp): Bước 2 chọn 2 điểm đối diện và xoá; Bước 3 chuyển 2 điểm còn lại thành neo trơn; Bước 4 uốn cong mép lá; Bước 5 vẽ gân lá; Bước 6 tô màu hoàn thiện (Hình 14.12a-e) • Nhiệm vụ 2: Viết chữ theo khuôn dạng của hình (Dải cờ trang trí "CHÚC MỪNG NĂM MỚI!" Hình 14.13) • 6 bước thực hiện chi tiết (Hình 14.14a-f)',
    keyTopics: ['Nhiệm vụ 1: Các bước 2 đến 6 hoàn thiện lá (Hình 14.12)', 'Nhiệm vụ 2: Viết chữ theo khuôn dạng hình (Hình 14.13)', 'Dải cờ tiệc tùng: CHÚC MỪNG NĂM MỚI!', 'Hình 14.14: 6 bước tạo cờ uốn lượn và gắn chữ Put on Path', 'Quy tắc ẩn nét đường dẫn (No paint)'],
    sectionPageIndex: 4
  },
  {
    pageNumber: 82,
    category: 'lesson',
    label: 'Bài 15 • Tr. 82',
    badge: 'Bài 15 • Tr. 82',
    title: 'Trang 82: Bài 15: Hoàn thiện hình ảnh đồ hoạ • Mục tiêu, Khởi động & Nhiệm vụ 1: Vẽ nền',
    src: '/assets/aistudio/image_4212cb6f.png',
    desc: 'Chủ đề 4: Ứng dụng tin học • Bài 15: Hoàn thiện hình ảnh đồ hoạ • Mục tiêu bài học: Tạo sản phẩm số hữu ích (logo, banner, áp phích, poster, thiệp) • Khởi động: Tờ rơi Hội sách Hà Nội (Hình 15.1) phân rã 6 nhóm đối tượng (Nền, Cờ tam giác, Sách và giá sách, Văn bản, Bóng hội thoại, Vách ngăn nét đứt) • Hướng dẫn Nhiệm vụ 1: Vẽ nền bước 1 và 2',
    keyTopics: ['Mục tiêu Bài 15: Tạo sản phẩm số thực tế', 'Khởi động: Phân tích tờ rơi Hội sách Hà Nội (Hình 15.1)', '6 nhóm đối tượng cấu thành bản vẽ', 'Nhiệm vụ 1: Vẽ nền (Bước 1 vẽ HCN xanh, Bước 2 vẽ và nhân bản dãy tam giác)'],
    sectionPageIndex: 0
  },
  {
    pageNumber: 83,
    category: 'lesson',
    label: 'Bài 15 • Tr. 83',
    badge: 'Bài 15 • Tr. 83',
    title: 'Trang 83: Nhiệm vụ 1 (Hình 15.2), Nhiệm vụ 2: Dây cờ tam giác (Hình 15.3) & Nhiệm vụ 3: Vẽ sách (Hình 15.4)',
    src: '/assets/aistudio/image_8ddd6f21.png',
    desc: 'Nhiệm vụ 1: Bước 3 Union tam giác, Bước 4 Difference khoét mép răng cưa (Hình 15.2c), Bước 5 lồng ghép HCN vàng (Hình 15.2d-e) • Nhiệm vụ 2: Dây cờ tam giác (Bước 1 cắt tam giác dư, Bước 2 Group và co dãn, Bước 3 Ungroup tô màu xen kẽ Hình 15.3) • Nhiệm vụ 3: Vẽ sách và giá sách (Bước 1 vẽ gáy sách HCN, Bước 2 thêm dải rìa gradient tạo gáy cong 3D Hình 15.4a-b)',
    keyTopics: ['Nhiệm vụ 1: Phép Difference khoét mép răng cưa (Hình 15.2)', 'Nhiệm vụ 2: Dây cờ tam giác (Group -> Co dãn -> Ungroup Hình 15.3)', 'Nhiệm vụ 3: Vẽ sách và giá sách', 'Thủ thuật tô gradient mép rìa tạo gáy sách cong 3D (Hình 15.4)'],
    sectionPageIndex: 1
  },
  {
    pageNumber: 84,
    category: 'lesson',
    label: 'Bài 15 • Tr. 84',
    badge: 'Bài 15 • Tr. 84',
    title: 'Trang 84: Nhiệm vụ 3 (tiếp), Nhiệm vụ 4: Văn bản, Nhiệm vụ 5: Bóng hội thoại & Nhiệm vụ 6: Vách ngăn nét đứt',
    src: '/assets/aistudio/image_b4eb77af.png',
    desc: 'Nhiệm vụ 3: Bước 3-5 vạch trang trí, nhân bản nhiều quyển sách nghiêng và giá sách nằm ngang Hình 15.4c-d • Nhiệm vụ 4: Nhập độc lập các khối văn bản (Hình 15.5) • Nhiệm vụ 5: Vẽ bóng hội thoại bằng Union elip + tam giác (Hình 15.6a-c) • Nhiệm vụ 6: Vẽ vách ngăn nét đứt bằng Pen + Fill and Stroke -> Stroke style -> Dashes (Hình 15.7)',
    keyTopics: ['Nhiệm vụ 3: Nhân bản sách nghiêng & Giá sách nằm ngang', 'Nhiệm vụ 4: Nhập các khối văn bản độc lập (Hình 15.5)', 'Nhiệm vụ 5: Bóng hội thoại Union elip + tam giác (Hình 15.6)', 'Nhiệm vụ 6: Vách ngăn nét đứt Width 1.000 mm Dashes (Hình 15.7)'],
    sectionPageIndex: 2
  },
  {
    pageNumber: 85,
    category: 'lesson',
    label: 'Bài 15 • Tr. 85',
    badge: 'Bài 15 • Tr. 85',
    title: 'Trang 85: Nhiệm vụ 7: Xuất PNG (Hình 15.8), Luyện tập 1-2 (Thiệp, Logo) & Vận dụng (Bãi biển mùa hè)',
    src: '/assets/aistudio/image_42c93b58.png',
    desc: 'Nhiệm vụ 7: Xuất tệp PNG (File -> Export PNG Image / Shift+Ctrl+E Hình 15.8): Export area (Page, Drawing, Selection, Custom), Image size, dpi 200–300 cho in ấn, Filename & Export • Luyện tập 1: Vẽ thiệp sinh nhật (Hình 15.9) bóng bay, ruy băng • Luyện tập 2: Logo tiết kiệm điện/nước • Vận dụng: Minh họa bãi biển mùa hè (Hình 15.10) với sóng Bézier, ô dù và bóng tròn',
    keyTopics: ['Nhiệm vụ 7: Hộp thoại Export PNG Image (Shift+Ctrl+E)', '4 vùng xuất: Page, Drawing, Selection, Custom', 'Chuẩn độ phân giải in ấn 200–300 dpi', 'Luyện tập 1: Thiệp chúc mừng sinh nhật (Hình 15.9)', 'Luyện tập 2: Logo tiết kiệm điện nước', 'Vận dụng: Bức tranh bãi biển mùa hè (Hình 15.10)'],
    sectionPageIndex: 4
  },
  {
    pageNumber: 86,
    category: 'lesson',
    label: 'Bài 16 • Tr. 86',
    badge: 'Bài 16 • Tr. 86',
    title: 'Trang 86: Bài 16: Ngôn ngữ lập trình bậc cao và Python • Mục tiêu, Khởi động (Hình 16.1) & 1. Ngôn ngữ bậc cao',
    src: '/assets/aistudio/image_cd1c95ac.png',
    desc: 'Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính • Bài 16: Ngôn ngữ lập trình bậc cao và Python • 3 mục tiêu bài học • Khởi động: Hình 16.1 so sánh 3 cấp độ ngôn ngữ (Mã máy, Hợp ngữ Assembly, Ngôn ngữ Python) • 1. Ngôn ngữ lập trình bậc cao: Hoạt động 1, vai trò của chương trình dịch (compiler/interpreter)',
    keyTopics: ['Chủ đề 5: Giải quyết vấn đề với máy tính', 'Mục tiêu Bài 16', 'Hình 16.1: So sánh Mã máy vs Hợp ngữ vs Python', 'Hoạt động 1: Ngôn ngữ lập trình là gì', 'Khái niệm ngôn ngữ bậc cao', 'Vai trò của chương trình dịch'],
    sectionPageIndex: 0
  },
  {
    pageNumber: 87,
    category: 'lesson',
    label: 'Bài 16 • Tr. 87',
    badge: 'Bài 16 • Tr. 87',
    title: 'Trang 87: Lịch sử Python (Guido van Rossum 1991), Hộp Ghi nhớ 1 & 2. Môi trường Python (Hình 16.2)',
    src: '/assets/aistudio/image_375b5357.png',
    desc: 'Lịch sử Python do Guido van Rossum (Hà Lan) tạo ra và ra mắt năm 1991 • Các ưu thế: cú pháp đơn giản, đa nền tảng, mã nguồn mở, AI và dữ liệu • Hộp Ghi nhớ 1 (Trang 87) • Câu hỏi củng cố (Viết bằng ngôn ngữ bậc cao dễ nhất) • 2. Môi trường lập trình Python: Hoạt động 2, Hình 16.2 Màn hình IDLE Shell 3.9.1 với dấu nhắc >>>, a) Chế độ gõ lệnh trực tiếp',
    keyTopics: ['Guido van Rossum (Hà Lan, 1991)', 'Hộp Ghi nhớ 1 (Trang 87)', 'Câu hỏi củng cố: Ngôn ngữ bậc cao', '2. Môi trường lập trình Python', 'Hình 16.2: Màn hình IDLE Shell 3.9.1', 'Dấu nhắc lệnh >>> của Python', 'a) Chế độ gõ lệnh trực tiếp'],
    sectionPageIndex: 1
  },
  {
    pageNumber: 88,
    category: 'lesson',
    label: 'Bài 16 • Tr. 88',
    badge: 'Bài 16 • Tr. 88',
    title: 'Trang 88: b) Chế độ soạn thảo (Hình 16.3), Hộp Ghi nhớ 2 & 3. Một số lệnh Python đầu tiên',
    src: '/assets/aistudio/image_5c21d9bb.png',
    desc: 'b) Chế độ soạn thảo: File/New File mở cửa sổ Bai1.py (Hình 16.3), lưu và chạy F5 • Hộp Ghi nhớ 2 (Trang 88) • Câu hỏi củng cố 1 (Dấu nhắc vs con trỏ) & 2 (So sánh trực tiếp vs soạn thảo) • 3. Một số lệnh Python đầu tiên: Hoạt động 3, Ví dụ 1 kiểu số nguyên, số thực, xâu kí tự và Ví dụ 2 các phép toán +, -, *, /',
    keyTopics: ['b) Chế độ soạn thảo (Hình 16.3 Bai1.py)', 'Hộp Ghi nhớ 2 (Trang 88)', 'Câu hỏi 1: Dấu nhắc >>> không phải con trỏ', 'Câu hỏi 2: So sánh trực tiếp vs soạn thảo', '3. Một số lệnh Python đầu tiên', 'Ví dụ 1: int (5), float (2.6), str ("học sinh lớp 10")', 'Ví dụ 2: Phép toán +, -, *, /'],
    sectionPageIndex: 2
  },
  {
    pageNumber: 89,
    category: 'lesson',
    label: 'Bài 16 • Tr. 89',
    badge: 'Bài 16 • Tr. 89',
    title: 'Trang 89: Ví dụ 3 Hàm print(), Hộp Ghi nhớ 3, Củng cố & Thực hành tạo Bai1.py',
    src: '/assets/aistudio/image_1e838612.png',
    desc: 'Ví dụ 3: Hàm print() in 1 giá trị, nhiều giá trị và biểu thức • Cú pháp print(v1, v2, ..., vn) • Hộp Ghi nhớ 3 (Trang 89) • Câu hỏi củng cố 1 (5/2 = 2.5 float, 12+1.5 = 13.5) & 2 (13+10*3/2-3*2 = 22.0) • THỰC HÀNH: Nhiệm vụ tạo chương trình Bai1.py in "Xin chào!", ý nghĩa ký hiệu # là dòng chú thích • Hướng dẫn Bước 1 mở IDLE',
    keyTopics: ['Ví dụ 3: Hàm print() đa năng', 'Cú pháp print(v1, v2, ..., vn)', 'Hộp Ghi nhớ 3 (Trang 89)', 'Câu hỏi 1: Kết quả & Kiểu dữ liệu 5/2, 12+1.5', 'Câu hỏi 2: Kết quả biểu thức có phép chia 22.0', 'Thực hành: Bai1.py print("Xin chào!")', 'Ký hiệu # bắt đầu dòng chú thích'],
    sectionPageIndex: 3
  },
  {
    pageNumber: 90,
    category: 'lesson',
    label: 'Bài 16 • Tr. 90',
    badge: 'Bài 16 • Tr. 90',
    title: 'Trang 90: Các bước 2-6 thực hành (Hình 16.4), Luyện tập 1-3 & Vận dụng 1-2 (Bảng cửu chương)',
    src: '/assets/aistudio/image_d64ed2e6.png',
    desc: 'Bước 2-6 thực hành: File/New, nhập mã Hình 16.4, File/Save Ctrl+S, Run Module F5, lệnh thoát quit()/exit() • Luyện tập 1: Tính 4 biểu thức trực tiếp • Luyện tập 2: Lỗi cú pháp 3+*5 và lồng ngoặc kép • Luyện tập 3: Lệnh print tích số và tuổi • Vận dụng 1: Xâu ba nháy kép """...""" xuống dòng • Vận dụng 2: Bảng nhân phạm vi 10',
    keyTopics: ['Hình 16.4: Cửa sổ soạn thảo Bai1.py', 'Bước 4 lưu Ctrl+S, Bước 5 chạy F5', 'Bước 6 kết thúc phiên bằng quit() / exit()', 'Luyện tập 1: Tính biểu thức trực tiếp', 'Luyện tập 2: Sửa lỗi cú pháp SyntaxError', 'Luyện tập 3: Lệnh print() có tham số', 'Vận dụng 1: Xâu ba nháy kép """..."""', 'Vận dụng 2: Bảng cửu chương nhân'],
    sectionPageIndex: 4
  },
  {
    pageNumber: 91,
    category: 'lesson',
    label: 'Bài 17 • Tr. 91',
    badge: 'Bài 17 • Tr. 91',
    title: 'Trang 91: Bài 17: Biến và lệnh gán • Mục tiêu, Khởi động & 1. Biến và lệnh gán',
    src: '/assets/aistudio/image_840e0458.png',
    desc: 'Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính • Bài 17: Biến và lệnh gán • 2 mục tiêu bài học • Khởi động: So sánh biến trong đại số và lập trình • 1. Biến và lệnh gán: Hoạt động 1 tìm hiểu biến n = 5, n, n + 3 • Định nghĩa biến là định danh vùng nhớ • Cú pháp lệnh gán: <biến> = <giá trị>',
    keyTopics: ['Mục tiêu Bài 17', 'Khởi động: Biến trong Đại số vs Lập trình', 'Hoạt động 1: Khái niệm biến và gán n = 5', 'Định nghĩa biến (vùng nhớ lưu trữ dữ liệu)', 'Cú pháp lệnh gán: <biến> = <giá trị>', 'Khởi tạo và xác định kiểu tự động'],
    sectionPageIndex: 0
  },
  {
    pageNumber: 92,
    category: 'lesson',
    label: 'Bài 17 • Tr. 92',
    badge: 'Bài 17 • Tr. 92',
    title: 'Trang 92: Tránh lỗi kiểu khác nhau, Biểu thức <biến> = <biểu thức> & Gán đồng thời',
    src: '/assets/aistudio/image_1e420ea0.png',
    desc: 'Tránh phép toán giữa số và xâu (z = x + y báo lỗi TypeError) • Cú pháp gán tổng quát: <biến> = <biểu thức> • Gán đồng thời 1 giá trị: x = y = 1 • Phép tính luỹ thừa z = (x+y)**x • Tên biến có ý nghĩa: ten = "Hoài Nam" • Cú pháp gán nhiều giá trị đồng thời: <var1>, <var2> = <gt1>, <gt2>',
    keyTopics: ['Tránh lỗi TypeError giữa số và xâu', 'Cú pháp tổng quát: <biến> = <biểu thức>', 'Gán đồng thời 1 giá trị (x = y = 1)', 'Phép tính luỹ thừa (x+y)**x', 'Tên biến có ý nghĩa', 'Cú pháp gán đồng thời nhiều biến (x,y,z = 10,5,1)'],
    sectionPageIndex: 1
  },
  {
    pageNumber: 93,
    category: 'lesson',
    label: 'Bài 17 • Tr. 93',
    badge: 'Bài 17 • Tr. 93',
    title: 'Trang 93: Hộp Ghi nhớ 1, Câu hỏi 1-3 & 2. Các phép toán trên số (//, %, ** phải sang trái)',
    src: '/assets/aistudio/image_b4498783.png',
    desc: 'Hộp Ghi nhớ 1: Định nghĩa biến, cú pháp lệnh gán, 3 quy tắc đặt tên biến • Câu hỏi củng cố 1 (Tên biến hợp lệ: _name, xyzABC), Câu 2 (x = 104.0, y = 99), Câu 3 (a=5, b=-1) • 2. Các phép toán trên một số kiểu dữ liệu cơ bản: Hoạt động 2, Ví dụ 1 trên số: thương nguyên //, số dư %, luỹ thừa ** thực hiện từ PHẢI SANG TRÁI',
    keyTopics: ['Hộp Ghi nhớ 1 (Trang 93)', '3 quy tắc đặt tên biến (chữ cái/số/_, không bắt đầu bằng số, phân biệt hoa thường)', 'Câu hỏi củng cố 1, 2, 3', '2. Phép toán trên dữ liệu kiểu số', 'Phép chia lấy phần nguyên (//) & lấy số dư (%)', 'Đặc biệt: Luỹ thừa ** thực hiện từ PHẢI SANG TRÁI (4**2**3 = 65536)'],
    sectionPageIndex: 1
  },
  {
    pageNumber: 94,
    category: 'lesson',
    label: 'Bài 17 • Tr. 94',
    badge: 'Bài 17 • Tr. 94',
    title: 'Trang 94: Thứ tự ưu tiên toán tử, Phép toán trên xâu (+ nối, * lặp) & Hộp Ghi nhớ 2',
    src: '/assets/aistudio/image_72747f63.png',
    desc: 'Thứ tự ưu tiên các phép toán: ngoặc (), luỹ thừa **, nhân/chia/thương nguyên/số dư, cộng/trừ • Ví dụ 2: Phép toán trên xâu kí tự (+ nối xâu, * lặp xâu, xâu rỗng với n<=0) • Kết hợp số thực và nguyên sinh số thực • Hộp Ghi nhớ 2 (Trang 94) • Câu hỏi củng cố 1 ((12-10//2)**2 - 1 = 48) & Câu 2 ("010" và "100000")',
    keyTopics: ['Thứ tự ưu tiên phép tính toán học', 'Phép toán trên xâu: + (nối xâu)', 'Phép toán trên xâu: * (lặp xâu)', 'Xâu nhân n <= 0 cho xâu rỗng', 'Hộp Ghi nhớ 2 (Trang 94)', 'Câu hỏi củng cố 1 & 2'],
    sectionPageIndex: 2
  },
  {
    pageNumber: 95,
    category: 'lesson',
    label: 'Bài 17 • Tr. 95',
    badge: 'Bài 17 • Tr. 95',
    title: 'Trang 95: 3. Từ khoá (Keywords), Bảng 33 từ khoá, Hộp Ghi nhớ 3 & Thực hành Nhiệm vụ 1',
    src: '/assets/aistudio/image_73067206.png',
    desc: '3. Từ khoá: Hoạt động 3 phân biệt biến và từ khoá (if = 12, with = "Độ rộng" báo SyntaxError) • Bảng 33 từ khoá trong Python 3.x • Hộp Ghi nhớ 3 (Trang 95) • Câu hỏi củng cố (Tên biến hợp lệ: _if, nolocal, true) • THỰC HÀNH: Tạo và làm việc với biến • Nhiệm vụ 1: 4 phép tính biểu thức a, b, c, d',
    keyTopics: ['3. Từ khoá trong Python', 'Lỗi gán trùng từ khoá (SyntaxError)', 'Bảng 33 từ khoá chuẩn Python 3.x', 'Hộp Ghi nhớ 3 (Trang 95)', 'Câu hỏi củng cố từ khoá', 'Thực hành Nhiệm vụ 1: 4 biểu thức toán'],
    sectionPageIndex: 3
  },
  {
    pageNumber: 96,
    category: 'lesson',
    label: 'Bài 17 • Tr. 96',
    badge: 'Bài 17 • Tr. 96',
    title: 'Trang 96: Nhiệm vụ 2 (HinhTron.py), Luyện tập 1-2 & Vận dụng 1-2 (Đổi giây & Hoán vị x,y)',
    src: '/assets/aistudio/image_1e927c46.png',
    desc: 'Nhiệm vụ 2: Chương trình HinhTron.py tính chu vi (2*R*pi) và diện tích (pi*R*R) với R = 4.5, pi = 3.14 • Luyện tập 1: Lỗi tên biến 123a bắt đầu bằng số • Luyện tập 2: In xâu nốt nhạc ("đô rê mi "*3 + "pha son la si đô "*2) • Vận dụng 1: Đổi 684 500 giây sang ngày, giờ, phút, giây • Vận dụng 2: Hoán vị hai biến bằng x, y = y, x',
    keyTopics: ['Nhiệm vụ 2: Chương trình HinhTron.py', 'Luyện tập 1: Lỗi tên biến bắt đầu bằng số', 'Luyện tập 2: In chuỗi nốt nhạc lặp và nối', 'Vận dụng 1: Đổi số giây sang ngày, giờ, phút, giây (// và %)', 'Vận dụng 2: Hoán vị hai biến cực nhanh (x, y = y, x)'],
    sectionPageIndex: 4
  },
  {
    pageNumber: 97,
    category: 'lesson',
    label: 'Bài 18 • Tr. 97',
    badge: 'Bài 18 • Tr. 97',
    title: 'Trang 97: Bài 18 • Các lệnh vào ra đơn giản, Khởi động, Mục 1 & Hoạt động 1',
    src: '/assets/aistudio/image_7553c44a.png',
    desc: 'Bài 18: Các lệnh vào ra đơn giản • Mục tiêu: Lệnh vào ra & chuyển đổi kiểu • Khởi động: Hộp thoại nhập tên đầy đủ & viết tắt • 1. Các lệnh vào ra đơn giản: Hoạt động 1 tìm hiểu lệnh input() • input() nhận dữ liệu từ bàn phím và LUÔN cho kết quả là xâu kí tự (str) • Lệnh print() xuất ra màn hình',
    keyTopics: ['Mục tiêu Bài 18', 'Khởi động nhập tên (Hộp thoại)', '1. Các lệnh vào ra đơn giản', 'Hoạt động 1: Lệnh input()', 'Cú pháp: <biến> = input(<Dòng thông báo>)', 'Lệnh print() xuất dữ liệu'],
    sectionPageIndex: 0
  },
  {
    pageNumber: 98,
    category: 'lesson',
    label: 'Bài 18 • Tr. 98',
    badge: 'Bài 18 • Tr. 98',
    title: 'Trang 98: Hộp Ghi nhớ 1, 2. Chuyển đổi kiểu dữ liệu, Hoạt động 2 (Hàm type()) & Kiểu bool',
    src: '/assets/aistudio/image_0babf724.png',
    desc: 'Hộp Ghi nhớ 1 (input() và print()) • 2. Chuyển đổi kiểu dữ liệu cơ bản của Python • Hoạt động 2: Nhận biết kiểu dữ liệu của biến với n, x, s = 10, 1.8, "One" • Hàm type() nhận biết int, float, str • Kiểu dữ liệu lôgic (bool: True/False) • Hộp Ghi nhớ 2A (Trang 98) • Câu hỏi kiểm tra kiểu và giá trị 4 biểu thức',
    keyTopics: ['Hộp Ghi nhớ 1 (Trang 98)', '2. Chuyển đổi kiểu dữ liệu cơ bản', 'Hoạt động 2: Hàm type()', 'Gán đồng thời n, x, s', 'Kiểu lôgic (bool: True/False)', 'Hộp Ghi nhớ 2A (Trang 98)', 'Câu hỏi kiểm tra kiểu giá trị (str, bool)'],
    sectionPageIndex: 1
  },
  {
    pageNumber: 99,
    category: 'lesson',
    label: 'Bài 18 • Tr. 99',
    badge: 'Bài 18 • Tr. 99',
    title: 'Trang 99: Các lệnh int(), float(), str(), Lỗi ValueError, Ghi nhớ 2B & Hoạt động 4',
    src: '/assets/aistudio/image_9b251dee.png',
    desc: 'Lệnh int() (cắt thập phân 12.6 -> 12, lỗi với "10.35") • Lệnh float() (8 -> 8.0, "10.23" -> 10.23) • Lệnh str() • Chú ý: int(), float() chỉ chuyển xâu ghi số trực tiếp, không chuyển xâu công thức (int("12+45") gây ValueError) • Hộp Ghi nhớ 2B (Trang 99) • Câu 1-2 củng cố • Hoạt động 4: Nhập số từ bàn phím',
    keyTopics: ['Hàm chuyển đổi int(), float(), str()', 'Lỗi ValueError với xâu số thực vào int', 'Chú ý quan trọng: Xâu biểu thức toán (12+45) gây ValueError', 'Hộp Ghi nhớ 2B (Trang 99)', 'Câu hỏi củng cố 1 & 2', 'Hoạt động 4: Nhập số từ bàn phím'],
    sectionPageIndex: 2
  },
  {
    pageNumber: 100,
    category: 'lesson',
    label: 'Bài 18 • Tr. 100',
    badge: 'Bài 18 • Tr. 100',
    title: 'Trang 100: Lồng int(input()) & float(input()), Thực hành 1-2, Luyện tập & Vận dụng (Giây & Heron)',
    src: '/assets/aistudio/image_e03f0f7b.png',
    desc: 'Lồng int(input()) và float(input()) • Câu hỏi dùng x = input() để nhập số là sai • Thực hành: Nhiệm vụ 1 nhập m, n, p tính tổng; Nhiệm vụ 2 nhập tên và tuổi học sinh • Luyện tập 1 (int("12+45") và float("123,5.5") báo lỗi); Luyện tập 2 giải thích vì sao cần float(input()) • Vận dụng 1: Đổi giây ss sang ngày, giờ, phút, giây • Vận dụng 2: Tính diện tích tam giác Heron',
    keyTopics: ['Kỹ thuật lồng int(input()) và float(input())', 'Thực hành Nhiệm vụ 1: Tổng ba số m+n+p', 'Thực hành Nhiệm vụ 2: Tên và tuổi học sinh', 'Luyện tập 1: Nhận diện lệnh báo lỗi', 'Luyện tập 2: Giải thích float(input())', 'Vận dụng 1: Đổi số giây sang ngày/giờ/phút/giây', 'Vận dụng 2: Công thức Heron tam giác S = sqrt(p(p-a)(p-b)(p-c))'],
    sectionPageIndex: 3
  },
  {
    pageNumber: 101,
    category: 'lesson',
    label: 'Bài 19 • Tr. 101',
    badge: 'Bài 19 • Tr. 101',
    title: 'Trang 101: Bài 19 • Câu lệnh rẽ nhánh if, Khởi động & 1. Biểu thức lôgic',
    src: '/assets/aistudio/image_a612f7e9.png',
    desc: 'Bài 19: Câu lệnh rẽ nhánh if • Mục tiêu: Phép toán lôgic & Sử dụng lệnh if • Khởi động: Tình huống thời tiết đi chơi vs ở nhà (Hình 19.1 Sơ đồ rẽ nhánh) • 1. Biểu thức lôgic: Hoạt động 1, toán tử quan hệ (<, <=, >, >=, ==, !=), so sánh xâu kí tự phân biệt hoa thường, phép toán and, or, not',
    keyTopics: ['Mục tiêu Bài 19', 'Khởi động (Hình 19.1 Sơ đồ rẽ nhánh)', '1. Biểu thức lôgic (Hoạt động 1)', 'Kiểu dữ liệu bool (True/False)', 'Toán tử quan hệ số học & so sánh xâu', '3 phép toán lôgic: and, or, not'],
    sectionPageIndex: 0
  },
  {
    pageNumber: 102,
    category: 'lesson',
    label: 'Bài 19 • Tr. 102',
    badge: 'Bài 19 • Tr. 102',
    title: 'Trang 102: Bảng chân trị and/or/not, Ghi nhớ 1 & 2. Lệnh if dạng thiếu',
    src: '/assets/aistudio/image_2578bcd9.png',
    desc: '3 Bảng chân trị phép toán and, or, not • Ví dụ tính biến lôgic a, b, c với x=10, y=5, z=9 • Hộp Ghi nhớ 1 (Trang 102) • Câu hỏi củng cố 1 (100%4 == 0) & 2 (111//5 != 20 or 20%3 != 0) • 2. Lệnh if: Hoạt động 2 (Kiểm tra n > 0) • Câu lệnh rẽ nhánh dạng thiếu (Hình 19.2), dấu hai chấm ":" và thụt lề',
    keyTopics: ['3 Bảng chân trị: and, or, not', 'Ví dụ tính biến lôgic a, b, c', 'Hộp Ghi nhớ 1 (Trang 102)', 'Câu hỏi củng cố 1 & 2 (Trang 102)', 'Hoạt động 2: Cấu trúc if trong Python', 'Lệnh if dạng thiếu (Hình 19.2)', 'Quy tắc lùi lề (Indentation) & Dấu ":"'],
    sectionPageIndex: 1
  },
  {
    pageNumber: 103,
    category: 'lesson',
    label: 'Bài 19 • Tr. 103',
    badge: 'Bài 19 • Tr. 103',
    title: 'Trang 103: Lệnh if dạng đủ, Ghi nhớ 2 & Thực hành Nhiệm vụ 1 (Số chẵn/lẻ)',
    src: '/assets/aistudio/image_6d477957.png',
    desc: 'Câu lệnh rẽ nhánh dạng đủ (Hình 19.3) if...else • Ví dụ in giá trị tuyệt đối |a - b| • Chú ý thụt lề 1 tab/4 dấu cách trong Python • Hộp Ghi nhớ 2 (Trang 103) • Câu hỏi kiểm tra k <= 0 • THỰC HÀNH: Nhiệm vụ 1 kiểm tra số n nhập từ bàn phím là số chẵn hay số lẻ (n%2 == 0)',
    keyTopics: ['Lệnh if dạng đủ (Hình 19.3)', 'Ví dụ giá trị tuyệt đối |a - b|', 'Quy tắc thụt lề bắt buộc của Python', 'Hộp Ghi nhớ 2 (Trang 103)', 'Câu hỏi kiểm tra số nguyên dương k <= 0', 'Thực hành Nhiệm vụ 1: Kiểm tra chẵn lẻ (n%2 == 0)'],
    sectionPageIndex: 2
  },
  {
    pageNumber: 104,
    category: 'lesson',
    label: 'Bài 19 • Tr. 104',
    badge: 'Bài 19 • Tr. 104',
    title: 'Trang 104: Thực hành 2 (Tiền điện luỹ kế), Luyện tập 1-2 & Vận dụng (Cam & Năm nhuận)',
    src: '/assets/aistudio/image_e085daf6.png',
    desc: 'Thực hành Nhiệm vụ 2: Tính tiền điện sinh hoạt luỹ kế 3 bậc (k <= 50; 50 < k <= 100; k > 100) dùng hàm round(t) • Luyện tập 1: Viết biểu thức khoảng, ngoài đoạn, hợp khoảng • Luyện tập 2: Tìm m, n thoả mãn biểu thức • Vận dụng 1: Bán cam siêu thị < 5kg vs >= 5kg • Vận dụng 2: Kiểm tra năm nhuận (n%400 == 0 or (n%4 == 0 and n%100 != 0))',
    keyTopics: ['Thực hành Nhiệm vụ 2: Tính tiền điện sinh hoạt luỹ kế 3 bậc', 'Hàm round(t) làm tròn số thực', 'Luyện tập 1: Biểu thức khoảng và đoạn số học', 'Luyện tập 2: Tìm giá trị biến m, n chia hết', 'Vận dụng 1: Tính tiền mua cam siêu thị', 'Vận dụng 2: Thuật toán kiểm tra năm nhuận'],
    sectionPageIndex: 3
  },
  {
    pageNumber: 105,
    category: 'lesson',
    label: 'Bài 20 • Tr. 105',
    badge: 'Bài 20 • Tr. 105',
    title: 'Trang 105: Bài 20 • Câu lệnh lặp for, Khởi động, HĐ 1 & Cú pháp lệnh for',
    src: '/assets/aistudio/image_8347e1a3.png',
    desc: 'Bài 20: Câu lệnh lặp for • Mục tiêu: Ý nghĩa range() & Chức năng lệnh lặp for • Khởi động: Tình huống điểm danh 30 học sinh và đếm số chia hết cho 3 trong khoảng 1..50 • Khái niệm cấu trúc lặp • 1. Lệnh lặp for: Hoạt động 1 làm quen lệnh for tính tổng 0..9 (S=45) • Cú pháp for <i> in range(n): và Sơ đồ khối Hình 20.1',
    keyTopics: ['Mục tiêu Bài 20', 'Khởi động: Cấu trúc lặp trong cuộc sống', 'Hoạt động 1: Tính tổng 0..9 với for k in range(10)', 'Cú pháp chuẩn for <i> in range(n):', 'Hình 20.1: Sơ đồ khối vòng lặp for'],
    sectionPageIndex: 0
  },
  {
    pageNumber: 106,
    category: 'lesson',
    label: 'Bài 20 • Tr. 106',
    badge: 'Bài 20 • Tr. 106',
    title: 'Trang 106: Ví dụ 1-2, Ghi nhớ 1, Củng cố & 2. Lệnh tạo vùng giá trị range()',
    src: '/assets/aistudio/image_b2ef154b.png',
    desc: 'Ví dụ 1: Tính tổng các số tự nhiên chẵn nhỏ hơn n (k%2 == 0) • Ví dụ 2: Đếm số các số nguyên nhỏ hơn n và là bội của 3 (k%3 == 0) • Hộp Ghi nhớ 1 (Trang 106) • Câu hỏi củng cố so sánh S với 1+2+...+n • 2. Lệnh range: Hoạt động 2 tìm hiểu range(3, 10) và range(0, 15) • Tham số end = " " trong print() • Cú pháp range(stop) và range(start, stop)',
    keyTopics: ['Ví dụ 1: Tổng số chẵn (k%2 == 0)', 'Ví dụ 2: Đếm bội số 3 (k%3 == 0)', 'Hộp Ghi nhớ 1 (Trang 106)', 'Hoạt động 2: Vùng giá trị range()', 'Tham số end = " " in hàng ngang', 'Cú pháp range(stop) & range(start, stop)', 'Dãy rỗng range(100, 1)'],
    sectionPageIndex: 1
  },
  {
    pageNumber: 107,
    category: 'lesson',
    label: 'Bài 20 • Tr. 107',
    badge: 'Bài 20 • Tr. 107',
    title: 'Trang 107: Hộp Ghi nhớ 2, Củng cố a-d, Thực hành 1-2, Luyện tập & Vận dụng',
    src: '/assets/aistudio/image_146b13a5.png',
    desc: 'Hộp Ghi nhớ 2 (Trang 107) • Câu hỏi củng cố biểu diễn dãy bằng range() (a: 1..50, b: 5..10, c: 0,1, d: 10) • THỰC HÀNH: Nhiệm vụ 1 in các ước số của n theo hàng ngang; Nhiệm vụ 2 đếm số các ước số thực sự của n (k < n) • LUYỆN TẬP: 1. Đoạn code in S*S; 2. Tính giai thừa n! • VẬN DỤNG: 1. Tính chuỗi điều hoà 1 + 1/2 + ... + 1/n; 2. Tính tổng lập phương 1³ + 2³ + ... + n³',
    keyTopics: ['Hộp Ghi nhớ 2 (Trang 107)', 'Củng cố: Biểu diễn dãy số bằng range()', 'Thực hành Nhiệm vụ 1: UocSo.py', 'Thực hành Nhiệm vụ 2: DemUocThucSu.py (k < n)', 'Luyện tập 1 (S*S) & Luyện tập 2 (Giai thừa n!)', 'Vận dụng 1 (Chuỗi điều hoà) & Vận dụng 2 (Tổng lập phương)'],
    sectionPageIndex: 2
  },
  {
    pageNumber: 108,
    category: 'lesson',
    label: 'Bài 21 • Tr. 108',
    badge: 'Bài 21 • Tr. 108',
    title: 'Trang 108: Bài 21: Câu lệnh lặp while • Khởi động & 1. Lệnh lặp while',
    src: '/assets/aistudio/image_8795f4ec.png',
    desc: 'Bài 21: Câu lệnh lặp while • Mục tiêu: Giải bài toán lặp với số lần không biết trước; Ba cấu trúc lập trình cơ bản • Khởi động: Bảng so sánh Cột A (Lặp biết trước) vs Cột B (Lặp chưa biết trước) • 1. Lệnh lặp while: Hoạt động 1 (Tính tổng S=0, k=1; while k < 100: S = S + k; k = k + 7 cho kết quả 750) • Cú pháp while <điều kiện>: <khối lệnh> • Sơ đồ khối Hình 21.1',
    keyTopics: ['Mục tiêu Bài 21', 'Khởi động (Cột A vs Cột B)', 'Hoạt động 1: Tính tổng cấp số cộng S = 750', 'Cú pháp lệnh while', 'Sơ đồ khối Hình 21.1', 'Thụt lề khối lệnh lặp (1 tab / 4 dấu cách)'],
    sectionPageIndex: 0
  },
  {
    pageNumber: 109,
    category: 'lesson',
    label: 'Bài 21 • Tr. 109',
    badge: 'Bài 21 • Tr. 109',
    title: 'Trang 109: Ví dụ 1-2, Ghi nhớ 1, Củng cố 1-2, Lưu ý lặp vô hạn & break, 2. Cấu trúc lập trình',
    src: '/assets/aistudio/image_af030b02.png',
    desc: 'Ví dụ 1: Tính tổng bình phương k*k < 100 • Ví dụ 2: In dãy cách đều 3 đơn vị k < 50 (2, 5, 8, ..., 47) • Hộp Ghi nhớ 1 (Trang 109) • Câu hỏi củng cố 1 (Kiểm tra trước hay sau) & Câu hỏi 2 (Viết chương trình tính tổng chẵn 2+4+...+100) • Lưu ý 1: Cảnh báo lặp vô hạn do điều kiện • Lưu ý 2: Lệnh break ngắt vòng lặp • 2. Cấu trúc lập trình: Hoạt động 2 (Các cấu trúc lập trình cơ bản)',
    keyTopics: ['Ví dụ 1: Tổng bình phương k*k < 100', 'Ví dụ 2: In dãy số k < 50', 'Hộp Ghi nhớ 1 (Trang 109)', 'Câu hỏi củng cố 1 & 2 (Tổng chẵn)', 'Lưu ý 1: Tránh lặp vô hạn', 'Lưu ý 2: Lệnh break thoát vòng lặp', 'Mục 2: Cấu trúc lập trình cơ bản'],
    sectionPageIndex: 1
  },
  {
    pageNumber: 110,
    category: 'lesson',
    label: 'Bài 21 • Tr. 110',
    badge: 'Bài 21 • Tr. 110',
    title: 'Trang 110: 3 Cấu trúc cơ bản, Ghi nhớ 2, Thực hành 1-2, Luyện tập 1-2 & Vận dụng',
    src: '/assets/aistudio/image_e7a67261.png',
    desc: '3 cấu trúc lập trình cơ bản: Tuần tự, Rẽ nhánh, Lặp • Hộp Ghi nhớ 2 (Trang 110) • THỰC HÀNH: Nhiệm vụ 1 viết chương trình in dãy số tự nhiên từ 1 đến 100 trên hàng ngang; Nhiệm vụ 2 in dãy chữ cái A đến Z thành 3 hàng ngang bằng chr(k) và i%10 == 0 • LUYỆN TẬP: 1. Phần tử lớn nhất < 100 của dãy 1, 4, 7, 10...; 2. Đếm số chia hết cho 5 hoặc chia cho 3 dư 1 trong 100 số đầu • VẬN DỤNG: In ma trận 10x10 các số từ 1 đến 100',
    keyTopics: ['3 Cấu trúc cơ bản: Tuần tự, Rẽ nhánh, Lặp', 'Hộp Ghi nhớ 2 (Trang 110)', 'Thực hành Nhiệm vụ 1: In 1..100 hàng ngang', 'Thực hành Nhiệm vụ 2: In A..Z 3 hàng bằng chr()', 'Luyện tập 1: Phần tử lớn nhất < 100', 'Luyện tập 2: Đếm số chia hết cho 5 hoặc mod 3 = 1', 'Vận dụng: Ma trận 10x10'],
    sectionPageIndex: 2
  },
  {
    pageNumber: 111,
    category: 'lesson',
    label: 'Bài 22 • Tr. 111',
    badge: 'Bài 22 • Tr. 111',
    title: 'Trang 111: Bài 22: Kiểu dữ liệu danh sách • Khởi động & 1. Khởi tạo list',
    src: '/assets/aistudio/image_7daf280d.png',
    desc: 'Bài 22: Kiểu dữ liệu danh sách • Mục tiêu: Khởi tạo, truy cập list; Duyệt bằng for; Thực hành phương thức • Khởi động: So sánh kiểu dữ liệu cơ bản vs mảng/danh sách • 1. Kiểu dữ liệu danh sách: Hoạt động 1 (Khởi tạo, truy cập, thay đổi, xoá) • Ví dụ 1: A = [1, 2, 3, 4, 5], B = [1.5, 2, "Python", "List", 0], A[0]=1, B[2]=\'Python\' • Cú pháp <tên list> = [<v1>, <v2>, ..., <vn>] • Ví dụ 2: Hàm len(A)',
    keyTopics: ['Mục tiêu Bài 22', 'Khởi động (Dữ liệu danh sách thường gặp)', 'Hoạt động 1: Khởi tạo list', 'Cú pháp cặp ngoặc vuông []', 'Chỉ số bắt đầu từ 0', 'Khác biệt list Python chứa nhiều kiểu dữ liệu', 'Hàm len(A)'],
    sectionPageIndex: 0
  },
  {
    pageNumber: 112,
    category: 'lesson',
    label: 'Bài 22 • Tr. 112',
    badge: 'Bài 22 • Tr. 112',
    title: 'Trang 112: Gán A[1], Lệnh del, Danh sách rỗng, Ghép (+), Ghi nhớ 1, Củng cố 1-2 & 2. Duyệt',
    src: '/assets/aistudio/image_df592a80.png',
    desc: 'Thay đổi giá trị bằng lệnh gán A[1] = "One" • Xoá phần tử bằng lệnh del A[4] • Ví dụ 3: Tạo danh sách rỗng a = [] (len = 0) • Phép ghép danh sách (+) [1, 2] + [3, 4, 5, 6] • Hộp Ghi nhớ 1 (Trang 112) • Câu hỏi củng cố 1 (A[0], A[2], A[7], A[len(A)]) & Câu hỏi 2 (A+[10], del A[0], [100]+A, A[1]*25) • 2. Duyệt các phần tử của danh sách: Hoạt động 2 & Ví dụ 1 (for i in range(len(A)))',
    keyTopics: ['Gán thay đổi A[1] = "One"', 'Lệnh del A[4]', 'Danh sách rỗng a = []', 'Phép ghép danh sách (+)', 'Hộp Ghi nhớ 1 (Trang 112)', 'Chỉ số 0 đến len()-1', 'Củng cố 1: Lỗi IndexError A[len(A)]', 'Mục 2: Duyệt for i in range(len(A))'],
    sectionPageIndex: 1
  },
  {
    pageNumber: 113,
    category: 'lesson',
    label: 'Bài 22 • Tr. 113',
    badge: 'Bài 22 • Tr. 113',
    title: 'Trang 113: Ví dụ 2 Duyệt range(2, 5), Ghi nhớ 2, Củng cố & 3. Phương thức append()',
    src: '/assets/aistudio/image_e0608da2.png',
    desc: 'Ví dụ 2: Duyệt một phần danh sách for i in range(2, 5) • Hộp Ghi nhớ 2 (Trang 113) • Câu hỏi củng cố: 1a tính tổng số dương, 1b đếm số dương, 2 in các số chẵn • 3. Thêm phần tử vào danh sách: Khái niệm phương thức (method) • Hoạt động 3 & Ví dụ: A.append(10) • Hộp Ghi nhớ 3 (Trang 113): Cú pháp <danh sách>.<phương thức> và append() • Câu hỏi củng cố 1 (độ dài tăng 1) & 2 (A.append(100) rồi del A[1])',
    keyTopics: ['Ví dụ 2: Duyệt range(2, 5)', 'Hộp Ghi nhớ 2 (Trang 113)', 'Củng cố: Tính tổng S và đếm C số dương', 'Củng cố: In số chẵn', 'Khái niệm Phương thức (Method)', 'Phương thức A.append()', 'Hộp Ghi nhớ 3 (Trang 113)', 'Củng cố append(100) rồi del A[1]'],
    sectionPageIndex: 2
  },
  {
    pageNumber: 114,
    category: 'lesson',
    label: 'Bài 22 • Tr. 114',
    badge: 'Bài 22 • Tr. 114',
    title: 'Trang 114: Thực hành 1-2, Luyện tập 1-2 & Vận dụng (Tìm Max/Min)',
    src: '/assets/aistudio/image_793599c7.png',
    desc: 'THỰC HÀNH: Nhiệm vụ 1 nhập n học sinh vào dsLop bằng append() và in ra mỗi tên trên một dòng; Nhiệm vụ 2 nhập dãy số tính tổng T, trung bình cộng T/n và in trên cùng một hàng • LUYỆN TẬP: 1. Xoá phần tử cuối cùng del A[len(A)-1]; 2. Thêm vào đầu danh sách A = [x] + A • VẬN DỤNG: Viết chương trình tìm giá trị và chỉ số của phần tử lớn nhất và nhỏ nhất của dãy A',
    keyTopics: ['Thực hành NV1: dsLop.append(name)', 'str(i+1) thông báo nhập', 'Thực hành NV2: Dãy số, Tổng T, Trung bình T/n', 'Luyện tập 1: del A[len(A)-1]', 'Luyện tập 2: Thêm vào đầu A = [x] + A', 'Vận dụng: Thuật toán tìm Max/Min và chỉ số'],
    sectionPageIndex: 3
  },
  {
    pageNumber: 115,
    category: 'lesson',
    label: 'Bài 23 • Tr. 115',
    badge: 'Bài 23 • Tr. 115',
    title: 'Trang 115: Bài 23 • Mục tiêu, Khởi động & 1. Duyệt danh sách với toán tử in',
    src: '/assets/aistudio/image_30c3f86a.png',
    desc: 'Bài 23: Một số lệnh làm việc với dữ liệu danh sách • Mục tiêu: Duyệt bằng toán tử in, thực hiện phương thức danh sách • Khởi động: Xoá nhanh, chèn đầu/giữa, kiểm tra phần tử • 1. Duyệt danh sách với toán tử in: Hoạt động 1 • Ví dụ 1: 2 in A -> True, 10 in A -> False • Ví dụ 2: for k in A: print(k) • Hộp Ghi nhớ 1 (Trang 115)',
    keyTopics: ['Mục tiêu Bài 23', 'Khởi động: 3 câu hỏi danh sách', 'Hoạt động 1: Toán tử in', 'Ví dụ 1: 2 in A (True), 10 in A (False)', 'Cú pháp <giá trị> in <danh sách>', 'Ví dụ 2: Duyệt trực tiếp for k in A', 'Hộp Ghi nhớ 1 (Trang 115)'],
    sectionPageIndex: 0
  },
  {
    pageNumber: 116,
    category: 'lesson',
    label: 'Bài 23 • Tr. 116',
    badge: 'Bài 23 • Tr. 116',
    title: 'Trang 116: Câu hỏi củng cố 1-2 & 2. Một số lệnh: clear(), remove(), insert()',
    src: '/assets/aistudio/image_913379e5.png',
    desc: 'Câu hỏi củng cố 1 (1 in A -> False vs "01" in A -> True) & 2 (Ý nghĩa in trong for i in range(10)) • 2. Một số lệnh làm việc với danh sách: Hoạt động 2 • Ví dụ 1: Lệnh clear() xoá sạch về rỗng [] • Ví dụ 2: Lệnh remove(value) và lỗi ValueError • Ví dụ 3: Lệnh insert(index, value) và quy tắc ngoài biên k < 0 chèn đầu, k > len() chèn cuối',
    keyTopics: ['Củng cố 1: 1 in A (False) vs "01" in A (True)', 'Củng cố 2: Từ khoá in trong for i in range(10)', 'Ví dụ 1: Phương thức clear()', 'Ví dụ 2: Phương thức remove() & ValueError', 'Ví dụ 3: Phương thức insert(index, value)', 'Quy tắc ngoài biên: k < 0 chèn đầu, k > len() chèn cuối'],
    sectionPageIndex: 1
  },
  {
    pageNumber: 117,
    category: 'lesson',
    label: 'Bài 23 • Tr. 117',
    badge: 'Bài 23 • Tr. 117',
    title: 'Trang 117: Ghi nhớ 2 Bảng 4 phương thức, Củng cố 1-2 & Thực hành NV1, NV2',
    src: '/assets/aistudio/image_8bf99dc7.png',
    desc: 'Ví dụ 3 (tiếp): A.insert(100, 2) • Hộp Ghi nhớ 2 (Trang 117): Bảng 4 phương thức append, insert, clear, remove • Câu hỏi củng cố 1 (append(1) và insert(0,1) khi A rỗng) & 2 (A.insert(3, 5)) • THỰC HÀNH: Nhiệm vụ 1 nhập n học sinh in thứ tự ngược bằng dsLop.insert(0, name) • Nhiệm vụ 2 xoá số âm bằng while và remove(A[i])',
    keyTopics: ['Hộp Ghi nhớ 2: Bảng 4 phương thức danh sách', 'Củng cố 1: append(1) vs insert(0, 1) khi rỗng', 'Củng cố 2: Tìm lệnh insert(3, 5)', 'Thực hành NV1: In ngược học sinh (insert(0, name))', 'Thực hành NV2: Xoá số âm bằng while và remove'],
    sectionPageIndex: 2
  },
  {
    pageNumber: 118,
    category: 'lesson',
    label: 'Bài 23 • Tr. 118',
    badge: 'Bài 23 • Tr. 118',
    title: 'Trang 118: Thực hành NV3 Mẫu [1, 2, 3], Luyện tập 1-2 & Vận dụng 1-2 (Số chẵn & Fibonacci)',
    src: '/assets/aistudio/image_9a3e41f4.png',
    desc: 'Nhiệm vụ 2 (tiếp): Tại sao không tăng i khi xoá A[i] • Nhiệm vụ 3: Tìm vị trí đầu tiên của mẫu ba số hạng liên tiếp [1, 2, 3] • LUYỆN TẬP: 1. Chèn vị trí (insert(1, 1), chèn 3 và 4 liền nhau); 2. Xoá phần tử chính giữa (1 nếu lẻ, 2 nếu chẵn) • VẬN DỤNG: 1. Tạo và in n số tự nhiên chẵn đầu tiên; 2. Tạo và in n số hạng đầu tiên của dãy Fibonacci',
    keyTopics: ['NV2: Không tăng i vì phần tử dồn trái', 'NV3: Tìm mẫu 3 số hạng liên tiếp [1, 2, 3]', 'Luyện tập 1: Chèn số 1 sau 1 & Chèn 3, 4', 'Luyện tập 2: Xoá phần tử chính giữa lẻ/chẵn', 'Vận dụng 1: Dãy n số tự nhiên chẵn', 'Vận dụng 2: Dãy Fibonacci F0=0, F1=1'],
    sectionPageIndex: 3
  },
  {
    pageNumber: 119,
    category: 'lesson',
    label: 'Bài 24 • Tr. 119',
    badge: 'Bài 24 • Tr. 119',
    title: 'Trang 119: Bài 24 • Mục tiêu, Khởi động & 1. Xâu là một dãy các kí tự',
    src: '/assets/aistudio/image_99d59005.png',
    desc: 'Bài 24: Xâu kí tự • Mục tiêu: Hiểu xâu kí tự cơ bản, thực hiện lệnh for xử lí xâu • Khởi động: 3 cách tạo xâu (nháy kép "...", nháy đơn \'...\', 3 nháy """..."""), trích kí tự và đếm số kí tự • 1. Xâu là một dãy các kí tự: Hoạt động 1 • Ví dụ 1: len(s) = 14, s[0] = "T", s[10] = "b" • Ví dụ 2: So sánh list d[0]="A" vs xâu s[0]="A" gây TypeError: str object does not support item assignment',
    keyTopics: ['Mục tiêu Bài 24', 'Khởi động: 3 kiểu nháy xâu', '1. Xâu là dãy các kí tự', 'Ví dụ 1: len(s) và chỉ số s[0], s[10]', 'Ví dụ 2: So sánh xâu và danh sách', 'TypeError: str object does not support item assignment'],
    sectionPageIndex: 0
  },
  {
    pageNumber: 120,
    category: 'lesson',
    label: 'Bài 24 • Tr. 120',
    badge: 'Bài 24 • Tr. 120',
    title: 'Trang 120: Tính bất biến, Ghi nhớ 1, Củng cố 1-2 & 2. Lệnh duyệt kí tự của xâu',
    src: '/assets/aistudio/image_d8626cb5.png',
    desc: 'Tính bất biến (immutable), không có kiểu kí tự riêng, xâu rỗng empty = "" • Hộp Ghi nhớ 1 (Trang 120): Xâu Unicode, không thay đổi từng kí tự, chỉ số 0 đến len()-1 • Câu hỏi củng cố 1 (Xác định tính hợp lệ) & 2 (Độ dài xâu: 13, 15, 10) • 2. Lệnh duyệt kí tự của xâu: Hoạt động 2 • Duyệt chỉ số for i in range(len(s)) vs Duyệt trực tiếp for ch in s • Chú ý toán tử in kiểm tra xâu con',
    keyTopics: ['Tính bất biến (immutable)', 'Xâu rỗng empty = ""', 'Hộp Ghi nhớ 1 (Trang 120)', 'Củng cố 1 & 2: Xâu hợp lệ và hàm len()', '2. Lệnh duyệt kí tự của xâu', 'Hoạt động 2: 2 cách duyệt bằng for', 'Toán tử in kiểm tra xâu con'],
    sectionPageIndex: 1
  },
  {
    pageNumber: 121,
    category: 'lesson',
    label: 'Bài 24 • Tr. 121',
    badge: 'Bài 24 • Tr. 121',
    title: 'Trang 121: Ghi nhớ 2, Củng cố 1-2 & Thực hành NV1, NV2 (Cách 1: Duyệt chỉ số)',
    src: '/assets/aistudio/image_96b50a99.png',
    desc: 'Hộp Ghi nhớ 2 (Trang 121): Duyệt bằng for, s1 in s2 trả về True nếu s1 là xâu con • Câu hỏi củng cố 1: Lọc số lẻ s="81723" ra skq="173" • Câu hỏi củng cố 2: s1="abc", s2="ababcabca" kiểm tra s1 in s2, s1+s1 in s2 • THỰC HÀNH: Nhiệm vụ 1 nhập n học sinh vào ds_lop bằng append và in ra • Nhiệm vụ 2 kiểm tra xâu chứa "10" bằng Cách 1 duyệt chỉ số range(len(S)-1)',
    keyTopics: ['Hộp Ghi nhớ 2 (Trang 121)', 'Củng cố 1: Lọc số lẻ skq="173"', 'Củng cố 2: Kiểm tra xâu con s1 in s2', 'Thực hành NV1: Nhập và in danh sách học sinh', 'Thực hành NV2: Kiểm tra xâu chứa "10"', 'Cách 1: Duyệt cặp kí tự S[i] và S[i+1]'],
    sectionPageIndex: 2
  },
  {
    pageNumber: 122,
    category: 'lesson',
    label: 'Bài 24 • Tr. 122',
    badge: 'Bài 24 • Tr. 122',
    title: 'Trang 122: NV2 (Cách 2: Toán tử in), Luyện tập 1-2 & Vận dụng 1-2',
    src: '/assets/aistudio/image_cd10b143.png',
    desc: 'Nhiệm vụ 2 (tiếp): Cách 2 dùng toán tử in kiểm tra s10 in S ngắn gọn • LUYỆN TẬP: 1. Trích 3 kí tự đầu tiên S[0]+S[1]+S[2]; 2. Viết chương trình kiểm tra S có chứa chữ số không • VẬN DỤNG: 1. Chèn xâu s1 vào giữa s2 tại vị trí len(s2)//2; 2. Đếm số bạn tên "Hương" trong danh sách bằng toán tử in',
    keyTopics: ['Cách 2: Toán tử in (if s10 in S)', 'Luyện tập 1: Trích 3 kí tự đầu tiên', 'Luyện tập 2: Phát hiện chữ số trong xâu', 'Vận dụng 1: Chèn xâu s1 vào giữa s2 (len(s2)//2)', 'Vận dụng 2: Đếm tên "Hương" bằng toán tử in'],
    sectionPageIndex: 3
  },
  {
    pageNumber: 123,
    category: 'lesson',
    label: 'Bài 25 • Tr. 123',
    badge: 'Bài 25 • Tr. 123',
    title: 'Trang 123: Bài 25 • Mục tiêu, Khởi động & 1. Xâu con và Lệnh tìm vị trí xâu con',
    src: '/assets/aistudio/image_b6ce310e.png',
    desc: 'Bài 25: Một số lệnh làm việc với xâu kí tự • Mục tiêu bài học • Khởi động: Bài toán tìm kiếm xâu con c="Trường Sơn" trong m="Bước chân trên dải Trường Sơn" • 1. Xâu con và lệnh tìm vị trí xâu con: Hoạt động 1 • Ví dụ 1: Toán tử in kiểm tra True/False • Ví dụ 2: Lệnh find() tìm vị trí xuất hiện (b trả về 1, 12 trả về 9, AB trả về -1)',
    keyTopics: ['Mục tiêu Bài 25', 'Khởi động: Bài toán tìm kiếm xâu con', '1. Xâu con và lệnh tìm vị trí xâu con', 'Ví dụ 1: Toán tử in kiểm tra xâu con', 'Ví dụ 2: Lệnh find() & giá trị -1 khi không tìm thấy'],
    sectionPageIndex: 0
  },
  {
    pageNumber: 124,
    category: 'lesson',
    label: 'Bài 25 • Tr. 124',
    badge: 'Bài 25 • Tr. 124',
    title: 'Trang 124: Cú pháp find(sub, start), Ghi nhớ 1, Củng cố 1-2 & 2. Lệnh split()',
    src: '/assets/aistudio/image_a1031d1a.png',
    desc: 'Cú pháp đơn và cú pháp đầy đủ của lệnh find() với tham số start • Ví dụ 3: Tìm sub="Đà Nẵng" trong xâu các thành phố (find(sub)=9, find(sub,10)=-1) • Hộp Ghi nhớ 1 (Trang 124) • Câu hỏi củng cố 1 ("010" in "001100" -> False) & 2 ("ababababab".find("ab", 4) -> 4) • 2. Một số lệnh thường dùng với xâu kí tự: Hoạt động 2 • Ví dụ 1: Lệnh split() tách từ mặc định và theo dấu phẩy ","',
    keyTopics: ['Cú pháp đầy đủ: s.find(sub, start)', 'Ví dụ 3: s.find("Đà Nẵng", 10) -> -1', 'Hộp Ghi nhớ 1 (Trang 124)', 'Củng cố 1 ("010" in "001100")', 'Củng cố 2 ("ababababab".find("ab", 4))', '2. Một số lệnh thường dùng với xâu kí tự', 'Ví dụ 1: Lệnh split() tách danh sách từ'],
    sectionPageIndex: 1
  },
  {
    pageNumber: 125,
    category: 'lesson',
    label: 'Bài 25 • Tr. 125',
    badge: 'Bài 25 • Tr. 125',
    title: 'Trang 125: Lệnh join(), Ghi nhớ 2, Củng cố & Thực hành NV1 (Nhập dãy số)',
    src: '/assets/aistudio/image_d6dfe037.png',
    desc: 'Quy tắc lệnh split() • Ví dụ 2: Lệnh join() nối danh sách thành xâu (" ".join(A) và ",".join(B)) • Tác dụng ngược giữa split() và join() • Hộp Ghi nhớ 2 (Trang 125) • Câu hỏi củng cố: Thay dấu phẩy bằng dấu cách trong xâu "gà,vịt,chó,lợn,ngựa,cá" • THỰC HÀNH: Nhiệm vụ 1: Nhập nhiều số nguyên từ bàn phím cách nhau bởi dấu cách, đếm số lượng và in hàng ngang',
    keyTopics: ['Ví dụ 2: Lệnh join() nối danh sách thành xâu', 'Cú pháp: "<kí tự nối>".join(<danh sách>)', 'Hộp Ghi nhớ 2 (Trang 125)', 'Củng cố: " ".join(s.split(","))', 'Thực hành Nhiệm vụ 1: Nhập dãy số nguyên', 's.split() & nline.append(int(x))'],
    sectionPageIndex: 2
  },
  {
    pageNumber: 126,
    category: 'lesson',
    label: 'Bài 25 • Tr. 126',
    badge: 'Bài 25 • Tr. 126',
    title: 'Trang 126: Thực hành NV2, NV3, Luyện tập 1-2 & Vận dụng 1-2 (ƯCLN & Đếm tên)',
    src: '/assets/aistudio/image_ee4042d4.png',
    desc: 'Nhiệm vụ 2: Chuẩn hoá khoảng trắng văn bản (" ".join(sline)) • Nhiệm vụ 3: Nhập n học sinh, in danh sách theo 2 cột: Cột 1 là Tên (sline[m]), Cột 2 là Họ đệm (" ".join(sline)) • LUYỆN TẬP: 1. Tính tổng các số cách nhau bởi dấu cách; 2. Tách tên và họ đệm người dùng • VẬN DỤNG: 1. Tìm ƯCLN của 2 số cách nhau bởi dấu cách; 2. Đếm số bạn cùng tên trong lớp',
    keyTopics: ['Thực hành NV2: Chuẩn hoá khoảng trắng', 'Thực hành NV3: Tách họ tên 2 cột (ten, hodem)', 'Luyện tập 1: Tính tổng dãy số cách nhau bởi dấu cách', 'Luyện tập 2: Tách họ tên người dùng', 'Vận dụng 1: Tìm ƯCLN của 2 số (Euclid)', 'Vận dụng 2: Đếm số bạn cùng tên trong lớp'],
    sectionPageIndex: 3
  },
  {
    pageNumber: 127,
    category: 'lesson',
    label: 'Bài 26 • Tr. 127',
    badge: 'Bài 26 • Tr. 127',
    title: 'Trang 127: Bài 26 • Hàm trong Python • Mục tiêu, Khởi động & 1. Một số hàm thiết kế sẵn',
    src: '/assets/aistudio/image_b25831db.png',
    desc: 'Bài 26: Hàm trong Python • Mục tiêu bài học • Khởi động: Bản chất chương trình con và lý do gom khối lệnh thành hàm trong ngôn ngữ lập trình bậc cao • 1. Một số hàm thiết kế sẵn của Python • Hoạt động 1: Điểm chung của các câu lệnh Bảng 26.1 • 15 hàm thiết kế sẵn chuẩn Python (abs, len, range, bool, float, list, round, chr, input, ord, str, divmod, int, print, type) • Dấu ngoặc đơn và tham số của hàm',
    keyTopics: ['Mục tiêu Bài 26', 'Khởi động: Bản chất chương trình con', '1. Một số hàm thiết kế sẵn của Python', 'Bảng 26.1: 15 hàm chuẩn Python', 'Cặp ngoặc đơn và danh sách tham số', 'Ví dụ int("52"), type(y), input()'],
    sectionPageIndex: 0
  },
  {
    pageNumber: 128,
    category: 'lesson',
    label: 'Bài 26 • Tr. 128',
    badge: 'Bài 26 • Tr. 128',
    title: 'Trang 128: Cú pháp gọi hàm, Ghi nhớ 1, Củng cố & 2. Thiết lập các hàm tự định nghĩa',
    src: '/assets/aistudio/image_1fef09b5.png',
    desc: 'Cú pháp câu lệnh gọi hàm: <tên hàm>(<danh sách tham số hàm>) • Hộp Ghi nhớ 1 (Trang 128) • Câu hỏi củng cố: Mô tả tham số & giá trị trả lại của float(), str(), len(), list() • 2. Thiết lập các hàm tự định nghĩa • Hoạt động 2: Cách thiết lập hàm • Ví dụ 1: Hàm có trả lại giá trị inc(n) với return n+1 • Ví dụ 2: Hàm không trả lại giá trị thong_bao(msg) • Hộp Ghi nhớ 2: Từ khoá def, tên hàm, dấu ":" và thụt lề',
    keyTopics: ['Cú pháp gọi hàm: <tên hàm>(<tham số>)', 'Hộp Ghi nhớ 1 (Trang 128)', 'Củng cố: float(), str(), len(), list()', '2. Thiết lập các hàm tự định nghĩa', 'Hoạt động 2: Cách viết hàm', 'Ví dụ 1: def inc(n) return n+1', 'Ví dụ 2: def thong_bao(msg)', 'Hộp Ghi nhớ 2: Từ khoá def & thụt lề'],
    sectionPageIndex: 1
  },
  {
    pageNumber: 129,
    category: 'lesson',
    label: 'Bài 26 • Tr. 129',
    badge: 'Bài 26 • Tr. 129',
    title: 'Trang 129: Cú pháp hàm có/không return, Ghi nhớ 3, Củng cố & Thực hành NV1, NV2',
    src: '/assets/aistudio/image_e5e060b4.png',
    desc: 'Cú pháp chi tiết hàm có trả lại giá trị (return <giá trị>) vs hàm không trả lại giá trị (return hoặc không return) • Hộp Ghi nhớ 3 (Trang 129) • Câu hỏi củng cố: Phân tích cách thiết lập & chức năng của Nhap_xau() và Inday(n) • THỰC HÀNH: Thiết lập hàm trong Python • Nhiệm vụ 1: Viết hàm meeting() nhập họ tên và đưa lời chào • Nhiệm vụ 2: Viết hàm prime(n) kiểm tra số nguyên tố bằng thuật toán đếm ước thực sự (từ 1 đến n-1) với C == 1',
    keyTopics: ['Cú pháp hàm có return <giá trị>', 'Cú pháp hàm không return (None)', 'Hộp Ghi nhớ 3 (Trang 129)', 'Củng cố: Hàm Nhap_xau() và Inday(n)', 'Thực hành NV1: Hàm meeting() chào hỏi', 'Thực hành NV2: Hàm prime(n) kiểm tra số nguyên tố', 'Thuật toán đếm ước thực sự C == 1'],
    sectionPageIndex: 2
  },
  {
    pageNumber: 130,
    category: 'lesson',
    label: 'Bài 26 • Tr. 130',
    badge: 'Bài 26 • Tr. 130',
    title: 'Trang 130: NV2 (tiếp), Luyện tập 1-2 & Vận dụng 1-2 (Đa lệnh return & Đếm chữ)',
    src: '/assets/aistudio/image_eda3cd95.png',
    desc: 'Nhiệm vụ 2 (tiếp): Thân vòng lặp while k < n và điều kiện if C == 1 • LUYỆN TẬP: 1. Viết hàm in các ước nguyên tố của n (sử dụng hàm prime()); 2. Viết hàm numbers(s) đếm số các chữ số trong xâu • VẬN DỤNG: 1. Đa lệnh return & kỹ thuật thoát sớm (early return) trong prime(n); 2. Nhập xâu, thông báo tổng số chữ số và tổng số chữ cái tiếng Anh với hàm riêng cho mỗi yêu cầu',
    keyTopics: ['Vòng lặp while k < n trong prime(n)', 'Luyện tập 1: In ước nguyên tố của n', 'Luyện tập 2: Hàm numbers(s) đếm chữ số', 'Vận dụng 1: Đa lệnh return & thoát sớm', 'Tối ưu tốc độ với return False ngay', 'Vận dụng 2: Hai hàm đếm chữ số & chữ cái tiếng Anh'],
    sectionPageIndex: 3
  },
  {
    pageNumber: 131,
    category: 'lesson',
    label: 'Bài 27 • Tr. 131',
    badge: 'Bài 27 • Tr. 131',
    title: 'Trang 131: Bài 27 • Tham số của hàm • Mục tiêu, Khởi động & 1. Tham số và đối số',
    src: '/assets/aistudio/image_256e10ac.png',
    desc: 'Bài 27: Tham số của hàm • Mục tiêu bài học • Khởi động: Phân biệt tham số (parameter) và đối số (argument) qua f_sum(a,b,c) và f_sum(10,x,y) • 1. Tham số và đối số của hàm • Hoạt động 1: Phân biệt tham số và đối số • Ví dụ: Cách truyền dữ liệu qua tham số (Dòng 1 đến 12) • Lời gọi f(1,2,3), f(x,y,z) và lỗi NameError khi gọi f(a,b,c)',
    keyTopics: ['Mục tiêu Bài 27', 'Khởi động: Tham số vs Đối số', '1. Tham số và đối số của hàm', 'Hoạt động 1: Phân biệt tham số và đối số', 'Ví dụ trang 131: Cách truyền dữ liệu', 'f(1,2,3) & f(x,y,z)', 'Lỗi NameError: name "a" is not defined'],
    sectionPageIndex: 0
  },
  {
    pageNumber: 132,
    category: 'lesson',
    label: 'Bài 27 • Tr. 132',
    badge: 'Bài 27 • Tr. 132',
    title: 'Trang 132: Giải thích Dòng 1-10, Ghi nhớ 1, Củng cố 1-2 & 2. Cách sử dụng chương trình con',
    src: '/assets/aistudio/image_59bad7e2.png',
    desc: 'Giải thích chi tiết 4 dòng gọi hàm • Hộp Ghi nhớ 1 (Trang 132): Tham số dùng như biến trong hàm, Đối số là giá trị truyền vào khi gọi hàm, Số lượng đối số bằng số lượng tham số • Câu hỏi củng cố 1 (1 tham số nhưng gọi 2 đối số) & 2 (f(10, a) có lỗi không) • 2. Cách sử dụng chương trình con: Hoạt động 2 (Khi nào nên dùng hàm?) • Ví dụ 1: Viết hàm prime(n) để kiểm tra số nguyên tố',
    keyTopics: ['Giải thích chi tiết dòng 1, 3, 6, 10', 'Hộp Ghi nhớ 1 (Trang 132)', 'Quy tắc số lượng đối số khớp tham số', 'Củng cố 1: Lỗi thừa đối số (TypeError)', 'Củng cố 2: f(10, a) và điều kiện lỗi NameError', '2. Cách sử dụng chương trình con', 'Ví dụ 1: Tái sử dụng hàm prime(n)'],
    sectionPageIndex: 1
  },
  {
    pageNumber: 133,
    category: 'lesson',
    label: 'Bài 27 • Tr. 133',
    badge: 'Bài 27 • Tr. 133',
    title: 'Trang 133: Chương trình chính prime(n), Ví dụ 2 tongduong(A), Ghi nhớ 2 & Củng cố 1-2',
    src: '/assets/aistudio/image_43cf7279.png',
    desc: 'Chương trình chính in các số nguyên tố <= n • Ví dụ 2: Hàm tongduong(A) tính tổng các số hạng dương của hai dãy A và B • Hộp Ghi nhớ 2 (Trang 133): 4 ưu điểm của chương trình con (phân chia bài toán lớn, làm việc nhóm, cấu trúc rõ ràng, dễ hiệu chỉnh nâng cấp) • Câu hỏi củng cố 1: In số nguyên tố trong khoảng [m, n] • Câu hỏi củng cố 2: Nêu bài toán thực tế dùng hàm',
    keyTopics: ['Chương trình chính duyệt for k in range(1, n+1)', 'Ví dụ 2: Hàm tongduong(A)', 'Tính tổng số dương cho cả 2 dãy A và B', 'Hộp Ghi nhớ 2 (Trang 133)', '3 ưu điểm vượt trội của chương trình con', 'Củng cố 1: In số nguyên tố từ m đến n', 'Củng cố 2: Bài toán thực tế sử dụng hàm'],
    sectionPageIndex: 2
  },
  {
    pageNumber: 134,
    category: 'lesson',
    label: 'Bài 27 • Tr. 134',
    badge: 'Bài 27 • Tr. 134',
    title: 'Trang 134: Thực hành • NV1 f_sum(A, b), NV2 f_dem(msg, sep) & NV3 merge_str(s1, s2)',
    src: '/assets/aistudio/image_57c4d531.png',
    desc: 'THỰC HÀNH: Truyền giá trị cho đối số của hàm • Nhiệm vụ 1: Thiết lập hàm f_sum(A, b) tính tổng danh sách A (b=0 tính hết, b!=0 chỉ tính số dương) • Nhiệm vụ 2: Thiết lập hàm f_dem(msg, sep) đếm từ dùng lệnh split(sep) • Nhiệm vụ 3: Thiết lập hàm merge_str(s1, s2) gộp hai xâu theo cách đan xen từng kí tự',
    keyTopics: ['Thực hành: Truyền giá trị cho đối số', 'Nhiệm vụ 1: Hàm f_sum(A, b) với cờ điều kiện', 'Nhiệm vụ 2: Hàm f_dem(msg, sep) đếm từ', 'Tách từ bằng split(sep) và đếm bằng len()', 'Nhiệm vụ 3: Hàm merge_str(s1, s2) đan xen xâu'],
    sectionPageIndex: 3
  },
  {
    pageNumber: 135,
    category: 'lesson',
    label: 'Bài 27 • Tr. 135',
    badge: 'Bài 27 • Tr. 135',
    title: 'Trang 135: NV3 (tiếp), Luyện tập 1-2 & Vận dụng 1-2 (ƯCLN & Đổi hoa thường)',
    src: '/assets/aistudio/image_0dd1b2bf.png',
    desc: 'Nhiệm vụ 3 (tiếp): Thuật toán đan xen kí tự và chắp nối phần còn lại của xâu dài hơn • LUYỆN TẬP: 1. Hàm power(a, b, c) tính (a+b)^c; 2. Nhập 2 số cách nhau bởi dấu cách và tính tổng dùng hàm • VẬN DỤNG: 1. Tìm ƯCLN của 2 số cách nhau bởi dấu phẩy dùng hàm; 2. Hàm change(ho_ten, c) trả lại chữ in hoa nếu c=0 và chữ thường nếu c!=0 dùng s.upper() và s.lower()',
    keyTopics: ['Code chi tiết merge_str(s1, s2)', 'Luyện tập 1: Hàm power(a, b, c) -> (a+b)^c', 'Luyện tập 2: Tính tổng 2 số cách nhau dấu cách dùng hàm', 'Vận dụng 1: Tìm ƯCLN 2 số dùng giải thuật Euclid trong hàm', 'Vận dụng 2: Hàm change(ho_ten, c) với s.upper() và s.lower()'],
    sectionPageIndex: 3
  },
  {
    pageNumber: 136,
    category: 'lesson',
    label: 'Bài 28 • Tr. 136',
    badge: 'Bài 28 • Tr. 136',
    title: 'Trang 136: Bài 28 • Phạm vi của biến • Mục tiêu, Khởi động & 1. Biến khai báo trong hàm',
    src: '/assets/aistudio/image_e6a3978e.png',
    desc: 'Bài 28: Phạm vi của biến • Mục tiêu bài học • Khởi động: Hai câu hỏi về khả năng sử dụng biến ngoài hàm trong hàm và biến trong hàm ngoài hàm • 1. Phạm vi của biến khai báo trong hàm • Hoạt động 1: Biến khai báo bên trong một hàm chỉ được sử dụng bên trong hàm đó • Ví dụ: Hàm func(a, b) với n = 10, a = a*2, b = a+b • Biến n ngoài hàm gây lỗi NameError',
    keyTopics: ['Mục tiêu Bài 28', 'Khởi động: 2 câu hỏi phạm vi biến', '1. Phạm vi của biến khai báo trong hàm', 'Hoạt động 1: Tính địa phương của biến', 'Ví dụ func(a, b): a, b ngoài hàm không đổi', 'Lỗi NameError: name "n" is not defined khi gọi ngoài hàm'],
    sectionPageIndex: 0
  },
  {
    pageNumber: 137,
    category: 'lesson',
    label: 'Bài 28 • Tr. 137',
    badge: 'Bài 28 • Tr. 137',
    title: 'Trang 137: Hộp Ghi nhớ 1, Củng cố 1-2 & 2. Phạm vi của biến khai báo ngoài hàm',
    src: '/assets/aistudio/image_a46ee10c.png',
    desc: 'Hộp Ghi nhớ 1 (Trang 137): Trong Python tất cả biến khai báo bên trong hàm đều có tính địa phương (cục bộ), không có hiệu lực ở bên ngoài hàm • Câu hỏi củng cố 1 (f(1, 2) và f(10, 20) không đổi a, b ngoài hàm) • Câu hỏi củng cố 2 (Cho phép khai báo biến trong hàm trùng tên biến ngoài hàm) • 2. Phạm vi của biến khai báo ngoài hàm • Hoạt động 2 • Ví dụ 1: Gán t = n + 1 không đổi t ngoài hàm • Ví dụ 2: Hàm đọc giá trị biến toàn cục N = 10',
    keyTopics: ['Hộp Ghi nhớ 1 (Trang 137)', 'Tính địa phương (cục bộ) của biến trong hàm', 'Củng cố 1: f(1, 2) a, b ngoài hàm giữ nguyên', 'Củng cố 2: Biến trong hàm trùng tên biến ngoài hàm', '2. Phạm vi của biến khai báo ngoài hàm', 'Ví dụ 1: Gán lại biến tạo biến cục bộ mới', 'Ví dụ 2: Đọc giá trị biến toàn cục N'],
    sectionPageIndex: 1
  },
  {
    pageNumber: 138,
    category: 'lesson',
    label: 'Bài 28 • Tr. 138',
    badge: 'Bài 28 • Tr. 138',
    title: 'Trang 138: Từ khoá global, Hộp Ghi nhớ 2, Củng cố & Thực hành NV1: Hàm Select(A, x)',
    src: '/assets/aistudio/image_dad1db21.png',
    desc: 'Lưu ý từ khoá global để thay đổi giá trị biến toàn cục từ trong hàm: global <biến> (Ví dụ hàm f(n) có global t; t = 2*n+1 làm thay đổi t = 11) • Hộp Ghi nhớ 2 (Trang 138) • Câu hỏi củng cố tính print(a + n) với n=10 ra 16 • THỰC HÀNH: Thiết lập các hàm có chứa biến cục bộ • Nhiệm vụ 1: Thiết lập hàm Select(A, x) lọc các phần tử của A có giá trị lớn hơn hoặc bằng x',
    keyTopics: ['Từ khoá global: cú pháp & quy tắc', 'Ví dụ thay đổi biến toàn cục t với global t', 'Hộp Ghi nhớ 2 (Trang 138)', 'Củng cố tính toán f(1, 2) với n = 10', 'Thực hành: Thiết lập hàm có biến cục bộ', 'Nhiệm vụ 1: Hàm Select(A, x) lọc phần tử >= x'],
    sectionPageIndex: 2
  },
  {
    pageNumber: 139,
    category: 'lesson',
    label: 'Bài 28 • Tr. 139',
    badge: 'Bài 28 • Tr. 139',
    title: 'Trang 139: Thực hành NV2: Tach_tu(Str, c) & NV3: Nhập dãy, tách số dương B và âm C',
    src: '/assets/aistudio/image_2e0d1cd4.png',
    desc: 'Nhiệm vụ 2: Thiết lập hàm Tach_tu(Str, c) chuyển đổi chữ in hoa nếu c=0 (Str.upper()), chữ in thường nếu c=1 (Str.lower()), chữ in hoa đầu từ nếu c=2 (Str.title()) • Nhiệm vụ 3: Viết chương trình nhập dãy số nguyên, tách thành hai danh sách B (số dương) và C (số âm) với các hàm chuyên biệt Nhap_Dulieu(), getB(A), getC(A)',
    keyTopics: ['Nhiệm vụ 2: Hàm Tach_tu(Str, c)', '3 phương thức xâu: upper(), lower(), title()', 'Nhiệm vụ 3: Tách số dương B và số âm C', 'Thiết kế chương trình con module hoá', 'Hàm Nhap_Dulieu() & getB(A), getC(A)'],
    sectionPageIndex: 3
  },
  {
    pageNumber: 140,
    category: 'lesson',
    label: 'Bài 28 • Tr. 140',
    badge: 'Bài 28 • Tr. 140',
    title: 'Trang 140: NV3 (tiếp), Luyện tập 1-2 & Vận dụng 1-2 (cList, Tach_day, ƯCLN & Ngày tháng)',
    src: '/assets/aistudio/image_7d5e123f.png',
    desc: 'Nhiệm vụ 3 (tiếp): Gọi các hàm trong chương trình chính • LUYỆN TẬP: 1. Hàm tạo cList gồm các kí tự đầu của các xâu trong sList; 2. Hàm Tach_day(A) tách phần tử ở chỉ số chẵn vào B và chỉ số lẻ vào C • VẬN DỤNG: 1. Hàm nhận m, n trả về bộ đôi ƯCLN và BCNN qua công thức ƯCLN * BCNN = m * n; 2. Chương trình nhập day, month, year kiểm tra tính hợp lệ của ngày tháng năm (năm nhuận)',
    keyTopics: ['Nhiệm vụ 3: Chương trình chính pipeline', 'Luyện tập 1: cList trích xuất kí tự đầu của sList', 'Luyện tập 2: Hàm Tach_day(A) tách chỉ số chẵn lẻ', 'Vận dụng 1: Bộ đôi (ƯCLN, BCNN) return ucln, bcnn', 'Vận dụng 2: Kiểm tra ngày tháng năm hợp lệ & năm nhuận'],
    sectionPageIndex: 4
  },
  {
    pageNumber: 141,
    category: 'lesson',
    label: 'Bài 29 • Tr. 141',
    badge: 'Bài 29 • Tr. 141',
    title: 'Trang 141: Bài 29 • Nhận biết lỗi chương trình • Mục tiêu, Khởi động & 1. Nhận biết lỗi',
    src: '/assets/aistudio/image_6f7d4303.png',
    desc: 'Bài 29: Nhận biết lỗi chương trình • 2 mục tiêu bài học • Khởi động Hình 29.1 (Input -> Chương trình -> Output) • 1. Nhận biết lỗi chương trình • Hoạt động 1: Nhận biết và phân biệt một số loại lỗi của chương trình • Trường hợp 1: while True print("Hello") -> SyntaxError: invalid syntax • Trường hợp 2: n = int(input()) nhập 1.5 -> ValueError: invalid literal • Trường hợp 3: A = [1,3,10,0], for i in range(5): print(A[i])',
    keyTopics: ['Mục tiêu Bài 29', 'Khởi động: Hình 29.1 Dòng dữ liệu & Vị trí lỗi', '1. Nhận biết lỗi chương trình', 'Hoạt động 1: 4 trường hợp lỗi', 'Trường hợp 1: SyntaxError', 'Trường hợp 2: ValueError khi nhập 1.5 vào int', 'Trường hợp 3: A[range(5)] khi len=4'],
    sectionPageIndex: 0
  },
  {
    pageNumber: 142,
    category: 'lesson',
    label: 'Bài 29 • Tr. 142',
    badge: 'Bài 29 • Tr. 142',
    title: 'Trang 142: Trường hợp 4, Giải thích chi tiết, Hộp Ghi nhớ (3 loại lỗi) & Củng cố 1-2',
    src: '/assets/aistudio/image_d42ab5f8.png',
    desc: 'Báo lỗi IndexError: list index out of range của Trường hợp 3 • Trường hợp 4: Tính tổng 3 số nguyên dương s = 0; for i in range(3): s += i; print(s) -> 3 (kết quả đúng là 6 vì range(3) sinh 0,1,2 - Lỗi lôgic) • Giải thích chi tiết 4 trường hợp • Hộp Ghi nhớ (Trang 142): 3 loại lỗi chính (Cú pháp SyntaxError, Ngoại lệ Exceptions/Runtime, và Lỗi lôgic) • Câu hỏi củng cố 1 (gõ sai cú pháp) & 2 (sắp xếp mảng ra sai thứ tự)',
    keyTopics: ['IndexError: list index out of range', 'Trường hợp 4: Lỗi lôgic tính tổng với range(3)', 'Giải thích 4 trường hợp lỗi', 'Hộp Ghi nhớ (Trang 142): 3 loại lỗi chính', 'Củng cố 1: Lỗi cú pháp', 'Củng cố 2: Lỗi lôgic sắp xếp dãy'],
    sectionPageIndex: 1
  },
  {
    pageNumber: 143,
    category: 'lesson',
    label: 'Bài 29 • Tr. 143',
    badge: 'Bài 29 • Tr. 143',
    title: 'Trang 143: 2. Một số lỗi ngoại lệ thường gặp, Bảng 7 mã lỗi, Củng cố & Thực hành NV1',
    src: '/assets/aistudio/image_5c928d25.png',
    desc: '2. Một số lỗi ngoại lệ thường gặp • Hoạt động 2: Nhận biết một số lỗi ngoại lệ thường gặp • Bảng tra cứu 7 mã lỗi: ZeroDivisionError, IndexError, NameError, TypeError, ValueError, IndentationError, SyntaxError • Câu hỏi củng cố: Xác định mã lỗi của a) A[1.5], b) int("abc"), c) "10"*3.5, d) 12 + x(10) • THỰC HÀNH: Lập trình và kiểm tra khả năng sinh lỗi khi chạy chương trình • Nhiệm vụ 1: Nhập m, n cách nhau bởi dấu cách, in tổng, hiệu, thương',
    keyTopics: ['2. Một số lỗi ngoại lệ thường gặp', 'Bảng tra cứu 7 mã lỗi ngoại lệ', 'ZeroDivisionError, IndexError, NameError', 'TypeError, ValueError, IndentationError', 'Củng cố: a) TypeError, b) ValueError, c) TypeError, d) NameError', 'Thực hành: Nhiệm vụ 1 (Tổng, hiệu, thương m, n)'],
    sectionPageIndex: 2
  },
  {
    pageNumber: 144,
    category: 'lesson',
    label: 'Bài 29 • Tr. 144',
    badge: 'Bài 29 • Tr. 144',
    title: 'Trang 144: Thực hành NV2, Luyện tập 1-2 & Vận dụng 1-2 (Ước thực sự & NameError)',
    src: '/assets/aistudio/image_ae53e3fd.png',
    desc: 'Nhiệm vụ 1 (tiếp): Code chi tiết & gợi ý 3 khả năng sinh lỗi (ValueError, IndexError, ZeroDivisionError) • Nhiệm vụ 2: Nhập số tự nhiên n và n số nguyên vào danh sách A, gợi ý khả năng sinh lỗi • LUYỆN TẬP: 1. Dự đoán lỗi của range(1, len(A)+1) (IndexError) và s1+s2 (TypeError); 2. Khảo sát 3 lỗi của gttb = sum(A)/len(A) (ZeroDivisionError, TypeError, NameError) • VẬN DỤNG: 1. Nhập n, in danh sách các ước số thực sự của n & kiểm tra sinh lỗi; 2. Viết code sinh NameError',
    keyTopics: ['Nhiệm vụ 1 (tiếp): 3 kịch bản lỗi m, n', 'Nhiệm vụ 2: Nhập n và mảng A', 'Luyện tập 1: Dự đoán IndexError & TypeError', 'Luyện tập 2: 3 lỗi của sum(A)/len(A)', 'Vận dụng 1: Ước số thực sự của n & kiểm thử lỗi', 'Vận dụng 2: Chương trình sinh NameError'],
    sectionPageIndex: 3
  },
  {
    pageNumber: 145,
    category: 'lesson',
    label: 'Bài 30 • Tr. 145',
    badge: 'Bài 30 • Tr. 145',
    title: 'Trang 145: Bài 30 • Kiểm thử và gỡ lỗi chương trình • Mục tiêu, Khởi động & 1. Phương pháp kiểm thử',
    src: '/assets/aistudio/image_85676d4a.png',
    desc: 'Bài 30: Kiểm thử và gỡ lỗi chương trình • Mục tiêu: Biết phương pháp kiểm thử và gỡ lỗi đơn giản • Khởi động: Lỗi tiềm ẩn (bug) khi chương trình không dừng nhưng kết quả sai • 1. Một vài phương pháp kiểm thử chương trình • Hoạt động: Khám phá phương pháp & công cụ kiểm thử • a) Quan sát mã lỗi Runtime và bắt lỗi ngoại lệ • b) Kiểm thử chương trình với các bộ dữ liệu test (nhiều bộ test, bộ test ngẫu nhiên, bộ test vùng biên 0 <= x, y <= 1, giá trị n cực lớn)',
    keyTopics: ['Mục tiêu Bài 30', 'Khởi động: Lỗi tiềm ẩn (bug)', '1. Một vài phương pháp kiểm thử', 'Hoạt động: Công cụ & chức năng kiểm thử', 'a) Quan sát mã lỗi Runtime & bắt ngoại lệ', 'b) Kiểm thử với các bộ dữ liệu test', 'Bộ test ngẫu nhiên & Bộ test vùng biên'],
    sectionPageIndex: 0
  },
  {
    pageNumber: 146,
    category: 'lesson',
    label: 'Bài 30 • Tr. 146',
    badge: 'Bài 30 • Tr. 146',
    title: 'Trang 146: In biến trung gian, Điểm dừng Breakpoint, Hộp Ghi nhớ & 2. Ví dụ Euclid',
    src: '/assets/aistudio/image_14828e2d.png',
    desc: 'c) In các thông số trung gian (bổ sung lệnh print() in các biến y1, y2,...) • d) Sử dụng công cụ break point (điểm dừng) • Hộp Ghi nhớ (Trang 146): 4 phương pháp kiểm thử (in biến trung gian, sinh bộ test, điểm dừng breakpoint, quan sát mã lỗi runtime) • Câu hỏi củng cố: Mục đích của kiểm thử & Vai trò của in giá trị trung gian • 2. Ví dụ minh hoạ: Thuật toán tìm ƯCLN của hai số tự nhiên m, n bằng phép trừ Euclid (gcd(m, m) = m; nếu n > m: gcd(m, n-m); nếu n < m: gcd(m-n, n))',
    keyTopics: ['c) In các thông số trung gian print()', 'd) Sử dụng công cụ break point', 'Hộp Ghi nhớ (Trang 146): 4 phương pháp kiểm thử', 'Củng cố: Mục đích test & biến trung gian', '2. Ví dụ minh hoạ: Thuật toán Euclid', 'Nguyên lý toán học của phép trừ Euclid'],
    sectionPageIndex: 1
  },
  {
    pageNumber: 147,
    category: 'lesson',
    label: 'Bài 30 • Tr. 147',
    badge: 'Bài 30 • Tr. 147',
    title: 'Trang 147: Cách 1 (In trung gian), Cách 2 (Đặt Breakpoint) & Bảng theo dõi m, n',
    src: '/assets/aistudio/image_27b284bb.png',
    desc: 'Chương trình tìm ƯCLN của 20 và 16 • Cách 1: In giá trị các biến trung gian (bổ sung biến đếm k và print("Vòng lặp", k, ":", m, n); Console output: Vòng lặp 1: 4 16; Vòng lặp 2: 4 12; Vòng lặp 3: 4 8; Vòng lặp 4: 4 4 -> ƯCLN là 4) • Cách 2: Sử dụng công cụ điểm dừng (break point) thiết lập tại dòng 4 (while m != n:) • Chạy chế độ gỡ lỗi (Debug) và theo dõi bảng biến m, n',
    keyTopics: ['Cách 1: In giá trị biến trung gian', 'Biến đếm vòng lặp k & print() theo dõi', 'Kết quả 4 vòng lặp: (20,16) -> (4,4)', 'Cách 2: Sử dụng điểm dừng (break point)', 'Thiết lập breakpoint tại dòng 4 while m != n', 'Theo dõi bảng giá trị m, n trong Debugger'],
    sectionPageIndex: 2
  },
  {
    pageNumber: 148,
    category: 'lesson',
    label: 'Bài 30 • Tr. 148',
    badge: 'Bài 30 • Tr. 148',
    title: 'Trang 148: Bảng theo dõi Breakpoint, Luyện tập 1-2 & Vận dụng 1-2 (Sắp xếp chèn & Bộ test)',
    src: '/assets/aistudio/image_b57e34c4.png',
    desc: 'Bảng theo dõi giá trị biến m, n qua 5 lần dừng tại Breakpoint (Lần 1: 20, 16; Lần 2: 4, 16; Lần 3: 4, 12; Lần 4: 4, 8; Lần 5: 4, 4 - thoát vòng lặp) • LUYỆN TẬP: 1. Giải thích lỗi ZeroDivisionError và cách khắc phục; 2. Sửa lỗi chương trình m=input(), n=input(), print(m+n) nối chuỗi thành cộng số • VẬN DỤNG: 1. Phát hiện và sửa 2 lỗi trong chương trình sắp xếp chèn Insertion Sort (range(len(A)-1) và while j > 1); 2. Việc kiểm thử bằng bộ test có bảo đảm tìm ra hết lỗi không? Vì sao?',
    keyTopics: ['Bảng theo dõi biến qua 5 lần dừng Breakpoint', 'Luyện tập 1: Giải thích & xử lý ZeroDivisionError', 'Luyện tập 2: Ép kiểu int() khắc phục nối chuỗi input()', 'Vận dụng 1: Sửa 2 lỗi trong sắp xếp chèn', 'Vận dụng 2: Giới hạn của bộ test (Nguyên lý Dijkstra)'],
    sectionPageIndex: 3
  },
  {
    pageNumber: 149,
    category: 'lesson',
    label: 'Bài 31 • Tr. 149',
    badge: 'Bài 31 • Tr. 149',
    title: 'Trang 149: Bài 31 • Mục tiêu bài học & Nhiệm vụ 1: Phân tích số ra thừa số nguyên tố',
    src: '/assets/aistudio/image_002d27d3.png',
    desc: 'Bài 31: Thực hành viết chương trình đơn giản • Mục tiêu: Viết chương trình đơn giản & gỡ rối bằng debug (breakpoint, step-by-step) • Nhiệm vụ 1: Viết chương trình nhập số tự nhiên n, kiểm tra n có phải số nguyên tố hay không; nếu là hợp số thì in ra phân tích n thành tích thừa số nguyên tố; chú ý số 1 không là nguyên tố và cũng không là hợp số • Hướng dẫn: Dùng danh sách NT, n=1 thì NT rỗng, n>1 thì len(NT)==1 là nguyên tố, len(NT)>1 là hợp số dạng n = p1 * p2 * ... * pk • Mã nguồn phantichnt.py',
    keyTopics: ['Mục tiêu Bài 31', 'Nhiệm vụ 1: Phân tích thừa số nguyên tố', 'Chú ý số 1: không nguyên tố, không hợp số', 'Quy tắc danh sách NT: len(NT)==0, ==1, >1', 'Mã nguồn phantichnt.py'],
    sectionPageIndex: 0
  },
  {
    pageNumber: 150,
    category: 'lesson',
    label: 'Bài 31 • Tr. 150',
    badge: 'Bài 31 • Tr. 150',
    title: 'Trang 150: Điểm dừng dòng 20, Bảng theo dõi n=100 & Nhiệm vụ 2: Phương trình bậc hai',
    src: '/assets/aistudio/image_70edd4d6.png',
    desc: 'Chạy chương trình với công cụ debug, thiết lập điểm dừng breakpoint tại dòng 20 (m = m // k) • Bảng theo dõi các biến k, m, n, NT với n = 100 qua 4 lần dừng (k=2: m=100, NT=[2]; k=2: m=50, NT=[2,2]; k=5: m=25, NT=[2,2,5]; k=5: m=5, NT=[2,2,5,5] -> 100 = 2x2x5x5) • Nhiệm vụ 2: Viết chương trình nhập ba số thực a, b, c và tìm nghiệm của phương trình bậc hai ax² + bx + c = 0 xét đầy đủ các trường hợp (a=b=c=0; a=b=0,c!=0; a=0,b!=0; a!=0 theo delta)',
    keyTopics: ['Điểm dừng tại dòng 20 (m = m // k)', 'Bảng theo dõi biến n=100 qua 4 lần dừng', 'Thông báo kết quả: 100 = 2 × 2 × 5 × 5', 'Nhiệm vụ 2: Giải phương trình bậc hai ax² + bx + c = 0', '4 trường hợp biện luận toán học'],
    sectionPageIndex: 1
  },
  {
    pageNumber: 151,
    category: 'lesson',
    label: 'Bài 31 • Tr. 151',
    badge: 'Bài 31 • Tr. 151',
    title: 'Trang 151: Thiết kế hàm NhapDL, GiaiPT1, Rút gọn if...elif...else & giaipt.py',
    src: '/assets/aistudio/image_e855113f.png',
    desc: 'Thiết kế chương trình thông qua các hàm: NhapDL() nhập a, b, c; GiaiPT1(b, c) giải phương trình bậc nhất bx + c = 0; GiaiPT2(a, b, c) giải phương trình bậc hai • Mô hình cấu trúc rẽ nhánh mở rộng: Chuyển đổi if...else lồng nhau thụt lề bậc thang sang cú pháp phẳng if...elif...else gọn gàng • Chương trình giaipt.py: def sqrt(x), def NhapDL(), def GiaiPT1(b, c)',
    keyTopics: ['Thiết kế chương trình qua các hàm', 'Hàm NhapDL() & GiaiPT1(b, c)', 'Mô hình rút gọn if...elif...else', 'Tránh thụt lề bậc thang sâu', 'Định nghĩa hàm sqrt(x) qua x**0.5'],
    sectionPageIndex: 2
  },
  {
    pageNumber: 152,
    category: 'lesson',
    label: 'Bài 31 • Tr. 152',
    badge: 'Bài 31 • Tr. 152',
    title: 'Trang 152: Hàm GiaiPT2, Luyện tập 1-2 & Vận dụng 1-2 (Năm nhuận XXI & Euclid modulo)',
    src: '/assets/aistudio/image_7ee65fb2.png',
    desc: 'Hàm GiaiPT2(a, b, c) gọi GiaiPT1 khi a==0 và biện luận delta khi a!=0 • Chương trình chính a,b,c = NhapDL(); GiaiPT2(a,b,c) • LUYỆN TẬP: 1. Vòng lặp kiểm tra nhập số thực dương a > 0 bắt nhập lại khi sai; 2. In bảng cửu chương 2 hàng (hàng 1: bảng 1..5; hàng 2: bảng 6..10) • VẬN DỤNG: 1. Đếm số năm nhuận từ Y1 đến Y2 và tính thế kỉ XXI (2001-2100 có 24 năm nhuận); 2. Thuật toán Euclid modulo UCLN(a, b) = UCLN(b, a % b)',
    keyTopics: ['Hàm GiaiPT2(a, b, c) & biệt thức delta', 'Luyện tập 1: Vòng lặp bắt buộc nhập a > 0', 'Luyện tập 2: In bảng cửu chương 2 hàng', 'Vận dụng 1: Tính 24 năm nhuận thế kỉ XXI (2001-2100)', 'Vận dụng 2: Thuật toán Euclid modulo UCLN(a, b)'],
    sectionPageIndex: 3
  },
  {
    pageNumber: 153,
    category: 'lesson',
    label: 'Bài 32 • Tr. 153',
    badge: 'Bài 32 • Tr. 153',
    title: 'Trang 153: Bài 32 • Ôn tập lập trình Python • NV1: Họ tên & NV2: Trọng lượng hành tinh',
    src: '/assets/aistudio/image_816e715e.png',
    desc: 'Bài 32: Ôn tập lập trình Python • Mục tiêu bài học & giải bài toán liên môn • Nhiệm vụ 1: Nhập họ tên đầy đủ, tách riêng họ, tên, đệm bằng lệnh split() và " ".join(slist[1:n-1]) • Nhiệm vụ 2: Tính trọng lượng P (Newton) trên Trái Đất và hành tinh khác theo công thức P = m * g',
    keyTopics: ['Mục tiêu Bài 32', 'Giải bài toán liên môn', 'Nhiệm vụ 1: Tách họ, tên, đệm', 'Lát cắt danh sách " ".join(slist[1:n-1])', 'Nhiệm vụ 2: Trọng lượng trên hành tinh khác', 'Công thức định luật II Newton P = m * g'],
    sectionPageIndex: 0
  },
  {
    pageNumber: 154,
    category: 'lesson',
    label: 'Bài 32 • Tr. 154',
    badge: 'Bài 32 • Tr. 154',
    title: 'Trang 154: NV2: Mã nguồn weight.py & NV3: Kiểm tra tính hợp lệ ngày, tháng, năm',
    src: '/assets/aistudio/image_e2917418.png',
    desc: 'Nhiệm vụ 2 (tiếp): Công thức quy đổi P = P0 * g / 9.8 • Mảng 6 thiên thể planet & mảng trọng lực gravities = [1.62, 3.711, 8.83, 24.79, 10.44, 274.0] • Chương trình weight.py • Nhiệm vụ 3: Nhập ngày, tháng, năm khuôn dạng dd-mm-yyyy và kiểm tra tính hợp lệ • Hướng dẫn: Mảng thang 12 tháng, cập nhật năm nhuận tháng 2 có 29 ngày',
    keyTopics: ['Công thức P = P0 * g / 9.8', '6 thiên thể: Mặt Trăng, Hoả tinh, Kim tinh...', 'Hàm string(w) định dạng danh sách', 'Chương trình weight.py', 'Nhiệm vụ 3: Thẩm định ngày tháng năm', 'Mảng ngày tháng & cập nhật năm nhuận'],
    sectionPageIndex: 1
  },
  {
    pageNumber: 155,
    category: 'lesson',
    label: 'Bài 32 • Tr. 155',
    badge: 'Bài 32 • Tr. 155',
    title: 'Trang 155: Mã nguồn date.py, Luyện tập & Vận dụng 1, 2, 3 (Excel, 89 kí tự & O(√n))',
    src: '/assets/aistudio/image_3df8b47e.png',
    desc: 'Chương trình date.py: Hàm nhuan(year), cập nhật thang[1]=29, kiểm tra điều kiện biên ngày tháng năm • LUYỆN TẬP: Nhập n học sinh và sắp xếp theo bảng chữ cái • VẬN DỤNG: 1. Hệ thống ngày tuần tự bảng tính điện tử từ 1-1-1900; 2. Sắp xếp học sinh ưu tiên Tên -> Họ -> Đệm theo bảng 89 kí tự tiếng Việt có dấu chuẩn SGK; 3. Tối ưu hoá căn bậc hai nguyên tố O(√n) chỉ xét k <= √n',
    keyTopics: ['Chương trình date.py & hàm nhuan(year)', 'Luyện tập: Sắp xếp danh sách học sinh', 'Vận dụng 1: Số ngày tuần tự bảng tính từ 1-1-1900', 'Vận dụng 2: Bảng 89 kí tự tiếng Việt (Tên -> Họ -> Đệm)', 'Vận dụng 3: Tối ưu căn bậc hai số nguyên tố O(√n)'],
    sectionPageIndex: 2
  },
  {
    pageNumber: 156,
    category: 'lesson',
    label: 'Bài 33 • Tr. 156',
    badge: 'Bài 33 • Tr. 156',
    title: 'Trang 156: Bài 33: Nghề thiết kế đồ hoạ máy tính • Mục tiêu, Khởi động (Hình 33.1) & 1. Khái niệm',
    src: '/assets/aistudio/image_9cd40ea8.png',
    desc: 'Chủ đề 6: Hướng nghiệp với Tin học • Bài 33: Nghề thiết kế đồ hoạ máy tính • 3 mục tiêu bài học • Khởi động: Hình 33.1 Phân tích 4 nghề (Thợ may, Phát thanh viên, Kiến trúc sư, Thư kí) • 1. Khái niệm về thiết kế đồ hoạ: Hoạt động 1, định nghĩa dàn dựng bố cục, chỉnh sửa hình ảnh, lựa chọn màu sắc, 5 thành phần hình ảnh',
    keyTopics: ['Chủ đề 6: Hướng nghiệp với Tin học', 'Mục tiêu Bài 33', 'Hình 33.1: 4 nghề nghiệp', 'Kiến trúc sư liên quan trực tiếp đồ hoạ', 'Định nghĩa thiết kế đồ hoạ', '5 thành phần cấu tạo hình ảnh'],
    sectionPageIndex: 0
  },
  {
    pageNumber: 157,
    category: 'lesson',
    label: 'Bài 33 • Tr. 157',
    badge: 'Bài 33 • Tr. 157',
    title: 'Trang 157: 3 Lợi ích to lớn, Áp phích du lịch (Hình 33.2), Ghi nhớ 1 & 2. Kiến thức, kĩ năng',
    src: '/assets/aistudio/image_97ff6059.png',
    desc: 'Lịch sử phát triển thiết kế đồ hoạ từ thời xa xưa đến thời đại máy tính • 3 Lợi ích: Xây dựng hình ảnh chuyên nghiệp, Trải nghiệm độc giả ấn tượng, Tăng hiệu quả tiếp thị/doanh thu • Hình 33.2 Áp phích quảng bá du lịch Việt Nam • Hộp Ghi nhớ 1 (Trang 157) • Câu hỏi củng cố Hình 33.1 • 2. Kiến thức, kĩ năng cần có: Hoạt động 2, các phần mềm đồ họa (Photoshop, CorelDraw, GIMP, InDesign, AutoCAD, SolidWorks)',
    keyTopics: ['3 Lợi ích thiết kế đồ hoạ', 'Hình 33.2: Áp phích du lịch Việt Nam', 'Hộp Ghi nhớ 1 (Trang 157)', 'Củng cố Hình 33.1 (Kiến trúc sư)', '2. Kiến thức, kĩ năng cần có', 'Hệ thống phần mềm đồ hoạ', 'Kiến thức công nghệ in ấn'],
    sectionPageIndex: 1
  },
  {
    pageNumber: 158,
    category: 'lesson',
    label: 'Bài 33 • Tr. 158',
    badge: 'Bài 33 • Tr. 158',
    title: 'Trang 158: Kiến thức liên ngành, 7 tố chất, Ghi nhớ 2, Củng cố & 3. Học tập và việc làm',
    src: '/assets/aistudio/image_e9e23b33.png',
    desc: 'Kiến thức liên ngành (toán học, vật lí, nghệ thuật, xã hội, ngoại ngữ) • Hộp Ghi nhớ 2 (Trang 158): 7 tố chất & kĩ năng của người thiết kế • Câu hỏi củng cố: Phân tích 4 lựa chọn (A, B, C, D) trong đó B & D là cốt lõi • 3. Học tập và việc làm trong ngành thiết kế đồ hoạ: Hoạt động 3, cơ sở đào tạo (trung tâm nghề, ĐH/CĐ mĩ thuật, kiến trúc, thiết kế, CNTT)',
    keyTopics: ['Kiến thức liên ngành (Toán, Lý, Nghệ thuật)', 'Hộp Ghi nhớ 2 (Trang 158)', '7 tố chất cốt lõi của nhà thiết kế', 'Củng cố Mục 2: Cảm nhận cái đẹp & thành thạo phần mềm', '3. Học tập và việc làm', 'Cơ sở đào tạo ĐH/CĐ tại Việt Nam'],
    sectionPageIndex: 2
  },
  {
    pageNumber: 159,
    category: 'lesson',
    label: 'Bài 33 • Tr. 159',
    badge: 'Bài 33 • Tr. 159',
    title: 'Trang 159: Hướng nghiệp số, Nhu cầu việc làm, Ghi nhớ 3, Luyện tập 1-2 & Vận dụng 1-2',
    src: '/assets/aistudio/image_50ea640a.png',
    desc: 'Tìm kiếm việc làm số qua Google, LinkedIn, Vietnamworks với các từ khoá chuẩn • Cơ hội việc làm đa dạng: Agency, đài truyền hình, xưởng phim, tự mở studio, làm freelance tại nhà • Hộp Ghi nhớ 3 (Trang 159) • LUYỆN TẬP: 1. Thao tác thiết kế (Đáp án D: Tạo ra, lựa chọn, sắp xếp); 2. Đơn vị làm việc sau khi tốt nghiệp • VẬN DỤNG: 1. Kênh thông tin việc làm; 2. Công dụng phần mềm Illustrator, Photoshop, InDesign, AutoCAD',
    keyTopics: ['Từ khoá hướng nghiệp số', 'Cơ hội việc làm đa dạng & Freelance', 'Hộp Ghi nhớ 3 (Trang 159)', 'Luyện tập 1: Thao tác thiết kế đồ hoạ (D)', 'Luyện tập 2: Nơi làm việc sau tốt nghiệp', 'Vận dụng 1: Kênh tuyển dụng trực tuyến', 'Vận dụng 2: Công dụng Photoshop, Illustrator, InDesign, AutoCAD'],
    sectionPageIndex: 3
  },
  {
    pageNumber: 160,
    category: 'lesson',
    label: 'Bài 34 • Tr. 160',
    badge: 'Bài 34 • Tr. 160',
    title: 'Trang 160: Bài 34: Nghề phát triển phần mềm • Mục tiêu, Khởi động, 1. Phát triển phần mềm là gì? & Hình lục giác 7 công đoạn SDLC',
    src: '/assets/aistudio/image_00a5f350.png',
    desc: 'Chủ đề 6: Hướng nghiệp với Tin học • Bài 34: Nghề phát triển phần mềm • 2 mục tiêu bài học • Khởi động: Phát triển phần mềm không chỉ là viết mã lệnh • 1. Phát triển phần mềm là gì?: Hoạt động 1 (Bài tập vài chục dòng vs Phần mềm công nghiệp hàng vạn/hàng triệu dòng lệnh do nhóm người thực hiện) • Hình lục giác 7 công đoạn: 1. Điều tra khảo sát; 2. Phân tích hệ thống; 3. Thiết kế hệ thống; 4. Lập trình; 5. Kiểm thử; 6. Chuyển giao; 7. Bảo trì',
    keyTopics: ['Chủ đề 6: Hướng nghiệp với Tin học', 'Mục tiêu Bài 34', 'Khởi động: Bản chất phát triển phần mềm', 'Hoạt động 1: Phần mềm công nghiệp quy mô lớn', 'Hình lục giác 7 công đoạn SDLC', 'Khảo sát, Phân tích, Thiết kế, Lập trình, Kiểm thử, Chuyển giao, Bảo trì'],
    sectionPageIndex: 0
  },
  {
    pageNumber: 161,
    category: 'lesson',
    label: 'Bài 34 • Tr. 161',
    badge: 'Bài 34 • Tr. 161',
    title: 'Trang 161: Bảo trì, Quản trị dự án bao trùm, Ghi nhớ 1, Củng cố & 2. Kiến thức, kĩ năng người phát triển phần mềm',
    src: '/assets/aistudio/image_af1b1dc4.png',
    desc: 'Công đoạn 7 Bảo trì mở ra vòng đời mới • Hoạt động bao trùm toàn bộ: Quản trị dự án phần mềm (lập kế hoạch, nhân sự, tài chính, kiểm soát chất lượng) • Khái niệm Software Developer • Hộp Ghi nhớ 1 (Trang 161) • Câu hỏi củng cố Mục 1 (Đáp án C: Quá trình gồm nhiều công việc có thể lặp đi lặp lại) • 2. Kiến thức, kĩ năng của người phát triển phần mềm: Hoạt động 2, 3 hoạt động chính (Lập trình; Phân tích/thiết kế/kiểm thử/bảo trì; Quản trị dự án) • Khái niệm và yêu cầu của Lập trình viên',
    keyTopics: ['Công đoạn 7: Bảo trì phần mềm', 'Quản trị dự án phần mềm bao trùm', 'Định nghĩa Software Developer', 'Hộp Ghi nhớ 1 (Trang 161)', 'Câu hỏi củng cố Mục 1 (Đáp án C)', '3 hoạt động chính trong phát triển', 'Vị trí Lập trình viên (Programmer)'],
    sectionPageIndex: 1
  },
  {
    pageNumber: 162,
    category: 'lesson',
    label: 'Bài 34 • Tr. 162',
    badge: 'Bài 34 • Tr. 162',
    title: 'Trang 162: Kĩ sư phần mềm (Kiến trúc sư vs Thợ xây), Người quản trị dự án & Hộp Ghi nhớ 2',
    src: '/assets/aistudio/image_20d04b20.png',
    desc: 'Phẩm chất lập trình viên (thuật toán, cấu trúc dữ liệu, cẩn thận, tỉ mỉ) • Khái niệm Kĩ sư phần mềm (Software Engineer): tổ chức làm phần mềm, phân tích nghiệp vụ • Phép so sánh kinh điển: Kĩ sư phần mềm vs Lập trình viên tương tự như Kiến trúc sư vs Thợ xây trong xây dựng • Người quản trị dự án (PM): tầm nhìn, quy trình, xu hướng, tổ chức, điều phối, giám sát • Hộp Ghi nhớ 2 (Trang 162): 3 vị trí nhân sự nòng cốt và tố chất',
    keyTopics: ['Tố chất của Lập trình viên', 'Kĩ sư phần mềm (Software Engineer)', 'So sánh Kiến trúc sư vs Thợ xây', 'Người quản trị dự án (Project Manager)', 'Hộp Ghi nhớ 2 (Trang 162)', '3 vị trí nhân sự nòng cốt'],
    sectionPageIndex: 2
  },
  {
    pageNumber: 163,
    category: 'lesson',
    label: 'Bài 34 • Tr. 163',
    badge: 'Bài 34 • Tr. 163',
    title: 'Trang 163: Bài tập ghép đôi tố chất & 3. Công việc phát triển phần mềm (6 lĩnh vực & Nhu cầu STEM 4.0)',
    src: '/assets/aistudio/image_66664eba.png',
    desc: 'Bài tập ghép đôi hoạt động phát triển với tố chất (1-acd Lập trình; 2-bce Phân tích & thiết kế; 3-eg Quản trị dự án) • 3. Công việc phát triển phần mềm: Hoạt động 3, đào tạo nghề/đại học • 6 lĩnh vực nghề nghiệp: Lập trình ứng dụng, Phát triển UI, Web & Cloud/Hệ thống, AI/Máy học, Phát triển Game, Ứng dụng di động (Mobile) • Nhu cầu nhân lực STEM và CMCN 4.0 tại Việt Nam (FPT, Viettel, VNPT...)',
    keyTopics: ['Bài tập ghép đôi tố chất (Trang 163)', '1) Lập trình: a, c, d', '2) Phân tích thiết kế: b, c, e', '3) Quản trị dự án: e, g', '6 lĩnh vực nghề nghiệp phần mềm', 'Nhu cầu STEM & CMCN 4.0 tại VN'],
    sectionPageIndex: 2
  },
  {
    pageNumber: 164,
    category: 'lesson',
    label: 'Bài 34 • Tr. 164',
    badge: 'Bài 34 • Tr. 164',
    title: 'Trang 164: Kênh tuyển dụng số, Ghi nhớ 3, Củng cố, Luyện tập 1-3 & Vận dụng 1-3',
    src: '/assets/aistudio/image_1dcb70a6.png',
    desc: 'Kênh tuyển dụng trực tuyến: TopDev, Vietnamworks, LinkedIn • Hộp Ghi nhớ 3 (Trang 164) • Câu hỏi củng cố 1 (Cơ hội việc làm tương lai) & Câu 2 (Vị trí việc làm sinh viên CNTT) • LUYỆN TẬP: 1. Mô tả 7 công đoạn SDLC; 2. Môn học chuẩn bị (Toán, Tin, Anh); 3. Liệt kê phần mềm ứng dụng • VẬN DỤNG: 1. Trường ĐH đào tạo CNTT & khối thi A00, A01, D01; 2. Trung tâm dạy nghề & khóa học; 3. Doanh nghiệp phần mềm địa phương & chương trình Fresher',
    keyTopics: ['Kênh tuyển dụng số: TopDev, Vietnamworks, LinkedIn', 'Hộp Ghi nhớ 3 (Trang 164)', 'Củng cố 1 & 2', 'Luyện tập 1: Quy trình 7 công đoạn SDLC', 'Luyện tập 2: Chuẩn bị môn Toán, Tin, Anh', 'Luyện tập 3: Phần mềm ứng dụng', 'Vận dụng 1: Đại học & Khối thi A00, A01, D01', 'Vận dụng 2: Trung tâm dạy nghề', 'Vận dụng 3: Doanh nghiệp phần mềm & Fresher'],
    sectionPageIndex: 3
  },
  {
    pageNumber: 165,
    category: 'lesson',
    label: 'Phụ lục • Tr. 165',
    badge: 'Phụ lục • Tr. 165',
    title: 'Trang 165: Phụ lục: Bảng mã ASCII mở rộng (Extended ASCII Table - 256 mã: 0 đến 255)',
    src: '/assets/aistudio/image_892dc72d.png',
    desc: 'Phụ lục sách giáo khoa: Bảng mã ASCII mở rộng dạng ma trận 16x16 (256 kí tự: 0 – 255) • Hàng tương ứng 4 bit cao (0000 đến 1111), Cột tương ứng 4 bit thấp (0000 đến 1111) • 32 kí tự điều khiển (NULL, SOH, STX... US), phím cách, chữ số 0-9, chữ cái in hoa A-Z, chữ cái in thường a-z, DEL (127), và 128 kí tự mở rộng 8-bit (Ç, ü, é...)',
    keyTopics: ['Phụ lục SGK Tin học 10', 'Bảng mã ASCII mở rộng 8-bit', 'Ma trận 16x16 (0000 đến 1111)', 'Mã điều khiển 0–31 & DEL 127', 'Kí tự in chuẩn 32–126', 'Kí tự mở rộng 128–255']
  },
  {
    pageNumber: 166,
    category: 'lesson',
    label: 'Thuật ngữ • Tr. 166',
    badge: 'Thuật ngữ • Tr. 166',
    title: 'Trang 166: Bảng giải thích thuật ngữ (Từ Biến đến Màu vẽ)',
    src: '/assets/aistudio/image_d6a2e169.png',
    desc: 'Bảng giải thích thuật ngữ Tin học 10 theo thứ tự bảng chữ cái: Biến (Variable - Tr. 91), Dịch vụ đám mây (Cloud Service - Tr. 41), Điểm chỉ hướng (Node handles - Tr. 76), Điểm neo (Nodes - Tr. 76), Điều chế mã xung (PCM - Tr. 28), Độ sâu màu (Bit depth - Tr. 30), Đối số (Argument - Tr. 131), Đối tượng dạng đường (Paths - Tr. 75), Đường chỉ hướng (Direction lines - Tr. 76), Hàm (Function - Tr. 127), Kết nối vạn vật (IoT - Tr. 12), Kiểm thử (Test - Tr. 145), Kiểu dữ liệu (Data type - Tr. 88), Màu tô (Fill color - Tr. 65), Màu vẽ (Stroke color - Tr. 65)',
    keyTopics: ['Bảng giải thích thuật ngữ Trang 166', 'Biến & Kiểu dữ liệu & Đối số & Hàm', 'Đồ họa Vectơ: Điểm neo, Điểm chỉ hướng, Màu tô, Màu vẽ', 'Số hóa: Điều chế PCM, Độ sâu màu, IoT, Dịch vụ đám mây']
  },
  {
    pageNumber: 167,
    category: 'lesson',
    label: 'Thuật ngữ • Tr. 167',
    badge: 'Thuật ngữ • Tr. 167',
    title: 'Trang 167: Bảng giải thích thuật ngữ (tiếp theo: Từ Lớp đến Virus)',
    src: '/assets/aistudio/image_9b024086.png',
    desc: 'Bảng giải thích thuật ngữ Tin học 10 (tiếp theo): Lớp (Layer - Tr. 66), Lỗi ngoại lệ (Exception error - Tr. 141), Lỗi trong khi đang chạy (Runtime error - Tr. 142), Lỗi chương trình (Bug) và gỡ lỗi (Debug - Tr. 141), Phần mềm độc hại (Malware - Tr. 45), Phần mềm nội gián (Trojan - Tr. 46), Phương thức (Method - Tr. 113), Sâu máy tính (Worm - Tr. 46), Tham số (Parameters - Tr. 131), Thiết bị số (Tr. 6), Thiết bị thông minh (Tr. 11), Tốc độ bit (Bit rate - Tr. 29), Từ khoá (Keyword - Tr. 91), Virus (Tr. 46)',
    keyTopics: ['Bảng giải thích thuật ngữ Trang 167', 'Lỗi ngoại lệ & Lỗi runtime & Bug & Debug', 'An toàn mạng: Malware, Trojan, Worm, Virus', 'Khái niệm Thiết bị số, Thiết bị thông minh, Tốc độ bit, Từ khoá']
  },
  {
    pageNumber: 168,
    category: 'frontmatter',
    label: 'Xuất bản • Tr. 168',
    badge: 'Xuất bản • Tr. 168',
    title: 'Trang 168: Lời cảm ơn, Chịu trách nhiệm xuất bản, Ban biên tập, Bản quyền © 2022 NXB GDVN & ISBN',
    src: '/assets/aistudio/image_8828d44e.png',
    desc: 'Trang cuối sách giáo khoa: Lời cảm ơn tác giả tư liệu trích dẫn • Chịu trách nhiệm xuất bản: Chủ tịch HĐTV Nguyễn Đức Thái, Tổng Giám đốc Hoàng Lê Bách • Chịu trách nhiệm nội dung: Tổng biên tập Phạm Vĩnh Thái • Biên tập nội dung & mĩ thuật & thiết kế sách & sửa bản in & chế bản • Bản quyền © (2022) thuộc Nhà xuất bản Giáo dục Việt Nam • Thông tin xuất bản: Mã số G1HHXI001H22, khổ 19 x 26.5 cm, Số ĐKXB 183-2022/CXBIPH/13-62/GD, ISBN 978-604-0-31089-7',
    keyTopics: ['Lời cảm ơn của NXB Giáo dục Việt Nam', 'Chịu trách nhiệm xuất bản & Ban biên tập', 'Bản quyền © (2022) NXB GDVN', 'Mã số sách G1HHXI001H22 & Khổ 19 x 26.5 cm', 'Mã số ISBN: 978-604-0-31089-7']
  }
];

export interface BookSection {
  id: string;
  name: string;
  shortLabel: string;
  startPage: number;
  endPage: number;
}

export const BOOK_SECTIONS: BookSection[] = [
  { id: 'frontmatter', name: 'Xuất bản, Lời nói đầu & Mục lục', shortLabel: 'Mục lục & Bìa', startPage: 0, endPage: 5 },
  { id: 'lesson1', name: 'Bài 1: Thông tin và xử lí thông tin', shortLabel: 'Bài 1', startPage: 6, endPage: 10 },
  { id: 'lesson2', name: 'Bài 2: Vai trò của thiết bị thông minh và tin học', shortLabel: 'Bài 2', startPage: 11, endPage: 15 },
  { id: 'lesson3', name: 'Bài 3: Một số kiểu dữ liệu và lưu trữ trong máy tính', shortLabel: 'Bài 3', startPage: 16, endPage: 19 },
  { id: 'lesson4', name: 'Bài 4: Hệ nhị phân và dữ liệu số nguyên', shortLabel: 'Bài 4', startPage: 20, endPage: 23 },
  { id: 'lesson5', name: 'Bài 5: Dữ liệu logic', shortLabel: 'Bài 5', startPage: 24, endPage: 27 },
  { id: 'lesson6', name: 'Bài 6: Dữ liệu âm thanh và hình ảnh', shortLabel: 'Bài 6', startPage: 28, endPage: 32 },
  { id: 'lesson7', name: 'Bài 7: Thực hành sử dụng thiết bị số thông dụng', shortLabel: 'Bài 7', startPage: 33, endPage: 37 },
  { id: 'lesson8', name: 'Bài 8: Mạng máy tính trong cuộc sống hiện đại', shortLabel: 'Bài 8', startPage: 38, endPage: 43 },
  { id: 'lesson9', name: 'Bài 9: An toàn trên không gian mạng', shortLabel: 'Bài 9', startPage: 44, endPage: 49 },
  { id: 'lesson10', name: 'Bài 10: Thực hành khai thác tài nguyên trên Internet', shortLabel: 'Bài 10', startPage: 50, endPage: 54 },
  { id: 'lesson11', name: 'Bài 11: Ứng xử trên môi trường số. Tôn trọng bản quyền', shortLabel: 'Bài 11', startPage: 55, endPage: 62 },
  { id: 'lesson12', name: 'Bài 12: Phần mềm thiết kế đồ hoạ', shortLabel: 'Bài 12', startPage: 63, endPage: 68 },
  { id: 'lesson13', name: 'Bài 13: Bổ sung các đối tượng đồ hoạ', shortLabel: 'Bài 13', startPage: 69, endPage: 74 },
  { id: 'lesson14', name: 'Bài 14: Làm việc với đối tượng đường và văn bản', shortLabel: 'Bài 14', startPage: 75, endPage: 80 },
  { id: 'lesson15', name: 'Bài 15: Hoàn thiện hình ảnh đồ hoạ', shortLabel: 'Bài 15', startPage: 82, endPage: 85 },
  { id: 'lesson16', name: 'Bài 16: Ngôn ngữ lập trình bậc cao và Python', shortLabel: 'Bài 16', startPage: 86, endPage: 90 },
  { id: 'lesson17', name: 'Bài 17: Biến và lệnh gán', shortLabel: 'Bài 17', startPage: 91, endPage: 96 },
  { id: 'lesson18', name: 'Bài 18: Các lệnh vào ra đơn giản', shortLabel: 'Bài 18', startPage: 97, endPage: 100 },
  { id: 'lesson19', name: 'Bài 19: Câu lệnh rẽ nhánh if', shortLabel: 'Bài 19', startPage: 101, endPage: 104 },
  { id: 'lesson20', name: 'Bài 20: Câu lệnh lặp for', shortLabel: 'Bài 20', startPage: 105, endPage: 107 },
  { id: 'lesson21', name: 'Bài 21: Câu lệnh lặp while', shortLabel: 'Bài 21', startPage: 108, endPage: 110 },
  { id: 'lesson22', name: 'Bài 22: Kiểu dữ liệu danh sách', shortLabel: 'Bài 22', startPage: 111, endPage: 114 },
  { id: 'lesson23', name: 'Bài 23: Một số lệnh làm việc với dữ liệu danh sách', shortLabel: 'Bài 23', startPage: 115, endPage: 118 },
  { id: 'lesson24', name: 'Bài 24: Xâu kí tự', shortLabel: 'Bài 24', startPage: 119, endPage: 122 },
  { id: 'lesson25', name: 'Bài 25: Một số lệnh làm việc với xâu kí tự', shortLabel: 'Bài 25', startPage: 123, endPage: 126 },
  { id: 'lesson26', name: 'Bài 26: Hàm trong Python', shortLabel: 'Bài 26', startPage: 127, endPage: 130 },
  { id: 'lesson27', name: 'Bài 27: Tham số của hàm', shortLabel: 'Bài 27', startPage: 131, endPage: 135 },
  { id: 'lesson28', name: 'Bài 28: Phạm vi của biến', shortLabel: 'Bài 28', startPage: 136, endPage: 140 },
  { id: 'lesson29', name: 'Bài 29: Nhận biết lỗi chương trình', shortLabel: 'Bài 29', startPage: 141, endPage: 144 },
  { id: 'lesson30', name: 'Bài 30: Kiểm thử và gỡ lỗi chương trình', shortLabel: 'Bài 30', startPage: 145, endPage: 148 },
  { id: 'lesson31', name: 'Bài 31: Thực hành viết chương trình đơn giản', shortLabel: 'Bài 31', startPage: 149, endPage: 152 },
  { id: 'lesson32', name: 'Bài 32: Ôn tập lập trình Python', shortLabel: 'Bài 32', startPage: 153, endPage: 155 },
  { id: 'lesson33', name: 'Bài 33: Nghề quản trị cơ sở dữ liệu', shortLabel: 'Bài 33', startPage: 156, endPage: 159 },
  { id: 'lesson34', name: 'Bài 34: Nghề phát triển phần mềm', shortLabel: 'Bài 34', startPage: 160, endPage: 164 },
  { id: 'backmatter', name: 'Phụ lục tra cứu, Thuật ngữ & Xuất bản', shortLabel: 'Phụ lục & Thuật ngữ', startPage: 165, endPage: 168 }
];

export const OriginalPageModal: React.FC = () => {
  const {
    showOriginalModal,
    setShowOriginalModal,
    originalPageTarget,
    setOriginalPageTarget,
    setCurrentPage,
    setShowCopyrightModal,
    bilingualMode
  } = useBook();

  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showKeyPoints, setShowKeyPoints] = useState<boolean>(true);
  const [pageInput, setPageInput] = useState<string>('');

  // Find index in SGK_PAGES matching originalPageTarget
  const targetPageNum = typeof originalPageTarget === 'number' ? originalPageTarget : 6;
  const currentItemIndex = SGK_PAGES.findIndex((p) => p.pageNumber === targetPageNum);
  const safeIndex = currentItemIndex !== -1 ? currentItemIndex : 4; // default to page 6
  const current = SGK_PAGES[safeIndex] || SGK_PAGES[4];

  // Sync page input display when page target changes
  useEffect(() => {
    setPageInput(String(targetPageNum));
  }, [targetPageNum]);

  // Active section automatically determined by targetPageNum
  const activeSection = useMemo(() => {
    return (
      BOOK_SECTIONS.find(
        (s) => targetPageNum >= s.startPage && targetPageNum <= s.endPage
      ) || BOOK_SECTIONS[0]
    );
  }, [targetPageNum]);

  // Pages belonging to the active section for the clean micro-ribbon
  const sectionPages = useMemo(() => {
    return SGK_PAGES.filter(
      (p) => p.pageNumber >= activeSection.startPage && p.pageNumber <= activeSection.endPage
    );
  }, [activeSection]);

  const handlePrev = useCallback(() => {
    if (safeIndex > 0) {
      setOriginalPageTarget(SGK_PAGES[safeIndex - 1].pageNumber);
      setZoomLevel(1);
    }
  }, [safeIndex, setOriginalPageTarget]);

  const handleNext = useCallback(() => {
    if (safeIndex < SGK_PAGES.length - 1) {
      setOriginalPageTarget(SGK_PAGES[safeIndex + 1].pageNumber);
      setZoomLevel(1);
    }
  }, [safeIndex, setOriginalPageTarget]);

  // Keyboard navigation
  useEffect(() => {
    if (!showOriginalModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowOriginalModal(false);
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showOriginalModal, handlePrev, handleNext, setShowOriginalModal]);

  if (!showOriginalModal) return null;

  const handleJumpToSection = (sectionIndex?: number) => {
    if (typeof sectionIndex === 'number') {
      setCurrentPage(sectionIndex);
      setShowOriginalModal(false);
    }
  };

  const handleOpenCopyrightInfo = () => {
    setShowOriginalModal(false);
    setShowCopyrightModal(true);
  };

  const handlePageInputSubmit = () => {
    const num = parseInt(pageInput.trim(), 10);
    if (!isNaN(num)) {
      const match = SGK_PAGES.find((p) => p.pageNumber === num);
      if (match) {
        setOriginalPageTarget(match.pageNumber);
        setZoomLevel(1);
        return;
      }
    }
    setPageInput(String(targetPageNum));
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 text-white rounded-2xl w-full max-w-6xl h-[94vh] flex flex-col shadow-2xl border border-slate-700/80 overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between gap-3 bg-slate-900/95 shrink-0">
          {/* Title & Page details */}
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border shadow-xs ${
              current.category === 'frontmatter'
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
            }`}>
              {current.category === 'frontmatter' ? <ShieldCheck className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-sm sm:text-base text-slate-100 truncate">
                  {current.title}
                </h3>
                <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full shadow-xs ${
                  current.category === 'frontmatter'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-amber-500 text-slate-950'
                }`}>
                  {current.label}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate max-w-xl hidden sm:block">
                {current.desc}
              </p>
            </div>
          </div>

          {/* Action Tools: Jump to Interactive, Key Points, Copyright, Zoom & Close */}
          <div className="flex items-center gap-1.5 shrink-0">
            {typeof current.sectionPageIndex === 'number' && (
              <button
                type="button"
                onClick={() => handleJumpToSection(current.sectionPageIndex)}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer mr-1 hover:scale-105 active:scale-95"
                title={bilingualMode === 'en' ? 'Open interactive lesson and exercises' : 'Mở bài học tương tác đối chiếu'}
              >
                <span>{bilingualMode === 'en' ? 'Interactive Lesson' : 'Vào bài học tương tác'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowKeyPoints((v) => !v)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer border ${
                showKeyPoints
                  ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/40 font-semibold'
                  : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title={bilingualMode === 'en' ? 'Toggle key concepts summary' : 'Bật/tắt thanh tóm tắt nội dung đối chiếu'}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">{bilingualMode === 'en' ? 'Key Points' : 'Điểm kiến thức'}</span>
            </button>

            <button
              type="button"
              onClick={handleOpenCopyrightInfo}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-emerald-300 hover:text-emerald-200 hover:bg-emerald-950/60 border border-emerald-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
              title={bilingualMode === 'en' ? 'View textbook authors, publisher, and legal copyright dossier' : 'Xem đầy đủ hồ sơ tác giả, NXB và tuyên ngôn bản quyền pháp lý'}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">{bilingualMode === 'en' ? 'Copyright & Authors' : 'Bản quyền & Tác giả'}</span>
            </button>

            <div className="w-px h-5 bg-slate-700/80 mx-1 hidden sm:block" />

            {/* Compact Zoom Cluster */}
            <div className="flex items-center bg-slate-800/80 rounded-lg border border-slate-700/60 p-0.5">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(0.6, Number((z - 0.2).toFixed(1))))}
                className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer transition-colors"
                title={bilingualMode === 'en' ? 'Zoom Out (-)' : 'Thu nhỏ (-)'}
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono text-slate-200 w-11 text-center select-none font-bold">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(2.8, Number((z + 0.2).toFixed(1))))}
                className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer transition-colors"
                title={bilingualMode === 'en' ? 'Zoom In (+)' : 'Phóng to (+)'}
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(1)}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-700 cursor-pointer transition-colors"
                title={bilingualMode === 'en' ? 'Reset 100%' : 'Khôi phục 100%'}
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            <div className="w-px h-5 bg-slate-700/80 mx-1" />

            <button
              type="button"
              onClick={() => setShowOriginalModal(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-rose-900/50 transition-colors cursor-pointer"
              title={bilingualMode === 'en' ? 'Close (Esc)' : 'Đóng (Esc)'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Streamlined Scientific Navigation Bar (Single cohesive row) */}
        <div className="bg-slate-800/90 px-3 sm:px-4 py-2 border-b border-slate-700/60 flex flex-wrap items-center justify-between gap-2.5 text-xs shrink-0">
          {/* Left: Lesson Selector Dropdown */}
          <div className="flex items-center gap-2 min-w-0 flex-1 sm:flex-initial">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold shrink-0">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline text-slate-300">{bilingualMode === 'en' ? 'Lesson:' : 'Bài học:'}</span>
            </div>
            <div className="relative min-w-0">
              <select
                value={activeSection.id}
                onChange={(e) => {
                  const sec = BOOK_SECTIONS.find((s) => s.id === e.target.value);
                  if (sec) {
                    setOriginalPageTarget(sec.startPage);
                    setZoomLevel(1);
                  }
                }}
                className="bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-100 rounded-lg px-2.5 py-1.5 pr-8 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/50 cursor-pointer appearance-none truncate max-w-[240px] sm:max-w-xs md:max-w-sm"
                title={bilingualMode === 'en' ? 'Select lesson/section' : 'Chọn bài học hoặc mục lục'}
              >
                {BOOK_SECTIONS.map((sec) => (
                  <option key={sec.id} value={sec.id} className="bg-slate-900 text-white">
                    {sec.name} (Tr. {sec.startPage} – {sec.endPage})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Center: Stepper & Quick Page Jump */}
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-2 py-1 rounded-lg border border-slate-700/60 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              disabled={safeIndex <= 0}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors"
              title={bilingualMode === 'en' ? 'Previous page (Left arrow)' : 'Trang trước (Phím ←)'}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1 font-mono text-slate-300">
              <span className="text-[11px] text-slate-400 font-sans">{bilingualMode === 'en' ? 'Page' : 'Trang'}</span>
              <input
                type="text"
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handlePageInputSubmit();
                }}
                onBlur={handlePageInputSubmit}
                className="w-10 text-center font-bold bg-slate-800 border border-slate-700 focus:border-amber-500 rounded py-0.5 text-amber-300 text-xs focus:outline-hidden"
                title={bilingualMode === 'en' ? 'Type page number & Enter' : 'Nhập số trang rồi nhấn Enter'}
              />
              <span className="text-slate-500">/</span>
              <span className="text-xs text-slate-400">168</span>
            </div>
            <button
              type="button"
              onClick={handleNext}
              disabled={safeIndex >= SGK_PAGES.length - 1}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors"
              title={bilingualMode === 'en' ? 'Next page (Right arrow)' : 'Trang sau (Phím →)'}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Pages in Current Lesson (Micro-ribbon) */}
          <div className="flex items-center gap-1 overflow-x-auto py-0.5 max-w-full">
            <span className="text-[11px] text-slate-400 shrink-0 hidden md:inline mr-1">
              {bilingualMode === 'en' ? 'Lesson pages:' : 'Trang bài:'}
            </span>
            {sectionPages.map((p) => {
              const isActive = current.pageNumber === p.pageNumber;
              return (
                <button
                  key={p.pageNumber}
                  type="button"
                  onClick={() => {
                    setOriginalPageTarget(p.pageNumber);
                    setZoomLevel(1);
                  }}
                  className={`px-2 py-1 rounded-md text-xs font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-1 ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/80'
                  }`}
                  title={`${p.label}: ${p.title}`}
                >
                  <span>Tr. {p.pageNumber}</span>
                  <span className={`text-[10px] hidden lg:inline opacity-80 ${isActive ? 'text-slate-950 font-bold' : 'text-slate-400'}`}>
                    ({p.badge})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Collapsible Key Topics Badge Bar for Instant Verification */}
        {showKeyPoints && current.keyTopics && current.keyTopics.length > 0 && (
          <div className="bg-slate-900/90 px-4 py-2 border-b border-slate-800 flex items-center justify-between gap-3 text-xs flex-wrap shrink-0 animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="flex items-center gap-2 flex-wrap min-w-0">
              <span className="text-amber-400 font-semibold flex items-center gap-1.5 shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
                {bilingualMode === 'en' ? `Key Concepts (${current.label}):` : `Nội dung cốt lõi đối chiếu (${current.label}):`}
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {current.keyTopics.map((topic, i) => (
                  <span
                    key={i}
                    className="bg-slate-800 border border-slate-700/80 text-slate-200 px-2.5 py-0.5 rounded-md text-[11px] font-medium"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Image Viewer Stage (Maximum vertical height!) */}
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-950/95 relative select-none">
          {/* Arrow Navigation: Previous Page */}
          {safeIndex > 0 && (
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 backdrop-blur-md text-white hover:bg-amber-500 hover:text-slate-950 transition-all shadow-2xl border border-slate-700/80 z-20 cursor-pointer group hover:scale-110 active:scale-95"
              title={bilingualMode === 'en' ? `Go to ${SGK_PAGES[safeIndex - 1].label} (← Arrow)` : `Chuyển về ${SGK_PAGES[safeIndex - 1].label} (Phím ←)`}
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>
          )}

          {/* Arrow Navigation: Next Page */}
          {safeIndex < SGK_PAGES.length - 1 && (
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 backdrop-blur-md text-white hover:bg-amber-500 hover:text-slate-950 transition-all shadow-2xl border border-slate-700/80 z-20 cursor-pointer group hover:scale-110 active:scale-95"
              title={bilingualMode === 'en' ? `Go to ${SGK_PAGES[safeIndex + 1].label} (→ Arrow)` : `Chuyển tới ${SGK_PAGES[safeIndex + 1].label} (Phím →)`}
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}

          {/* Interactive Zoomable Image */}
          <div
            className="transition-transform duration-200 flex justify-center items-center max-w-full max-h-full"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'center center'
            }}
          >
            <img
              src={current.src}
              alt={current.title}
              className="max-h-[76vh] w-auto max-w-[92vw] sm:max-w-none object-contain rounded-xl shadow-2xl border border-slate-800 bg-white"
              loading="eager"
            />
          </div>
        </div>

        {/* Footer info & Navigation Helper */}
        <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-300">
              {bilingualMode === 'en'
                ? 'Informatics 10 Textbook (Knowledge Connection • Vietnam Education Publishing House)'
                : 'Sách Giáo Khoa Tin học 10 (Bộ Kết nối tri thức với cuộc sống • NXB Giáo dục Việt Nam)'}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span>{bilingualMode === 'en' ? 'Use arrow keys ← / → to flip pages' : 'Dùng phím mũi tên ← / → để lật trang'}</span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span>{bilingualMode === 'en' ? 'Esc key to close' : 'Phím Esc để thoát'}</span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <Check className="w-3 h-3" />
              {bilingualMode === 'en' ? 'Original Textbook Scans' : 'Bản chụp scan gốc đối chứng'}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

