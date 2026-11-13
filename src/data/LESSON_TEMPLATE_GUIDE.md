# HỆ THỐNG QUY CHUẨN ĐỒNG BỘ KHI THÊM BÀI MỚI (MASTER LESSON SPECIFICATION)
**Dự án: Công cụ hỗ trợ SGK Tin học 10 Kết nối tri thức với cuộc sống (KNTT)**

Tài liệu này được ghi nhớ và áp dụng bắt buộc cho mọi yêu cầu thêm bài học mới vào hệ thống. Mọi bài học từ Bài 1 đến Bài 34 đều tuân thủ 100% cấu trúc, tính năng và quy chuẩn kỹ thuật dưới đây.

---

## 1. MẪU PROMPT CHUẨN CỦA HỆ THỐNG (SYSTEM MASTER PROMPT)

Khi người dùng yêu cầu thêm bài học mới (ví dụ Bài 7, Bài 8,...), hệ thống tự động kích hoạt và thực thi đầy đủ các hạng mục theo mẫu prompt sau:

```markdown
Thực hiện thêm [BÀI SỐ]: [TÊN TIẾNG VIỆT] ([TÊN TIẾNG ANH]), thuộc [TÊN CHỦ ĐỀ] (Trang [X] – [Y] SGK Tin học 10 KNTT) với đầy đủ các tính năng của hệ thống:

1. BẢN QUÉT GỐC SGK (OriginalPageModal.tsx):
   - Nạp các ảnh chụp SGK đính kèm từ trang [X] đến trang [Y] vào SGK_PAGES.
   - Bổ sung 'lesson[SỐ]' vào filterCategory type và danh sách nút bấm lọc.

2. CẤU TRÚC 6 PHẦN HỌC BẮT BUỘC (src/components/lesson[SỐ]/):
   - Section 0: Section[SỐ]Overview.tsx (Mục tiêu, Khởi động, Hoạt động 1 tương tác).
   - Section 1: Section[SỐ]Part1A.tsx (Mục 1a SGK + Phòng thí nghiệm ảo/Sandbox).
   - Section 2: Section[SỐ]Part1B.tsx (Mục 1b SGK + Hộp Ghi nhớ 1 + Câu hỏi củng cố SGK ẩn/hiện).
   - Section 3: Section[SỐ]Part2A.tsx (Mục 2a SGK + Widget thực hành tương tác).
   - Section 4: Section[SỐ]Part2B.tsx (Mục 2b SGK + Hộp Ghi nhớ 2 + Câu hỏi củng cố SGK).
   - Section 5: Section[SỐ]PracticeApply.tsx (Luyện tập 1-2, Vận dụng 1-2, Quiz 10 câu & Thẻ Chứng chỉ).

3. TỆP DỮ LIỆU ĐI KÈM (src/data/lesson[SỐ]Data.ts):
   - LESSON_[SỐ]_QUIZ_QUESTIONS: Đúng 10 câu trắc nghiệm song ngữ (Vi/En), 4 phương án, có giải thích trích dẫn SGK.
   - LESSON_[SỐ]_GLOSSARY: Đúng 10 thuật ngữ cốt lõi theo interface TermDefinition (dùng trường ipa, không dùng pronunciation).

4. GỢI Ý SƯ PHẠM CHO GIÁO VIÊN (src/data/teacherPromptsData.ts):
   - Bổ sung TEACHER_PROMPTS_LESSON_[SỐ] cho cả 6 phần học (sectionIndex từ 0 đến 5).
   - Đăng ký vào bảng TEACHER_PROMPTS_BY_LESSON.

5. ĐỒNG BỘ ĐIỀU HƯỚNG & HỆ THỐNG:
   - src/data/lessonsRegistry.tsx: Đăng ký bài vào LESSONS_REGISTRY (certPrefix: 'KNTT10-B[SỐ]').
   - src/data/curriculumData.ts: Đổi trạng thái bài học thành status: 'active', tag 'Đã hoàn thiện'.
   - src/components/Header.tsx: Cập nhật quick switcher pills và dropdown grid.
   - src/components/BookCoverPage.tsx: Cập nhật grid thẻ bài học trên trang bìa.
   - TableOfContents & FullTableOfContentsPage: Hiển thị dạng Dropdown Accordion tinh gọn.

6. QUY CHUẨN KỸ THUẬT & KIỂM THỬ:
   - Song ngữ 100%: Chế độ 'en' không để sót tiếng Việt.
   - TTS Web Speech API: Nút 'Listen in English' và phát âm tiếng Việt.
   - Widget giáo viên: Cú pháp chuẩn <TeacherPromptsWidget sectionIndex={X} lessonId={[SỐ]} />.
   - Điều kiện cấp chứng chỉ: isAllSectionsComplete && certificate && certificate.score >= 8.
   - Chạy compile_applet và lint_applet đạt 0 lỗi.
```

---

## 2. BẢNG CHECKLIST 8 HẠNG MỤC BẮT BUỘC

| STT | Hạng mục hệ thống | Vị trí file | Nội dung nghiệm thu |
| :--- | :--- | :--- | :--- |
| **1** | **6 Section Components** | `src/components/lesson[X]/` | Gồm Overview, 4 phần lý thuyết + sandbox, PracticeApply |
| **2** | **Bộ dữ liệu Quiz & Glossary** | `src/data/lesson[X]Data.ts` | 10 câu trắc nghiệm song ngữ + 10 thuật ngữ có `ipa` |
| **3** | **Đăng ký Lesson Registry** | `src/data/lessonsRegistry.tsx` | Đăng ký key `[X]`, component, badge, chứng chỉ |
| **4** | **Bản quét SGK gốc** | `src/components/OriginalPageModal.tsx` | Nạp ảnh, thêm category `lesson[X]`, gán keyTopics |
| **5** | **Gợi ý Sư phạm Giáo viên** | `src/data/teacherPromptsData.ts` | Khai báo `TEACHER_PROMPTS_LESSON_[X]` (6 sections) |
| **6** | **Trạng thái Khung phân phối** | `src/data/curriculumData.ts` | Chuyển `ready_for_content` ➔ `active` ('Đã hoàn thiện') |
| **7** | **Menu & Dropdown Tinh gọn** | `Header.tsx`, `BookCoverPage.tsx` | Dropdown Accordion, quick pills, số cột grid |
| **8** | **Kiểm thử Clean Build** | Linter & Compiler | 0 lỗi TypeScript, 0 lỗi build Vite |

---

## 3. CÁC QUY CHUẨN KỸ THUẬT & TRÁNH LỖI (GOTCHAS)

1. **Props `TeacherPromptsWidget`:**
   - Luôn sử dụng: `<TeacherPromptsWidget sectionIndex={X} lessonId={Y} />` với `X` từ 0 đến 5.
   - Không truyền các props không tồn tại như `lessonNumber`, `sectionTitle`, `learningObjectives`.

2. **Interface `TermDefinition`:**
   - Thuộc tính phiên âm quốc tế là `ipa: string;` (không dùng `pronunciation`).
   - Import từ: `import { TermDefinition } from './lessonData';`
   - Import QuizQuestion từ: `import { QuizQuestion } from './lesson2Data';`

3. **Điều kiện mở khóa Chứng chỉ (`CertificateModal`):**
   - Chỉ mở khóa khi thỏa mãn đồng thời:
     ```typescript
     isCertificateEarned = isAllSectionsComplete && certificate && certificate.score >= 8;
     ```

4. **Trải nghiệm Dropdown Accordion Mục lục:**
   - Trên `FullTableOfContentsPage` và `TableOfContents`: Mặc định chỉ mở bài học đang học hiện tại để giao diện luôn tinh gọn, không bị dài và rối mắt. Cung cấp nút mở rộng/thu gọn tất cả cho người dùng.

5. **Chế độ hiển thị song ngữ (`bilingualMode`):**
   - Hỗ trợ 3 chế độ: `vi`, `en`, `bilingual`.
   - Khi ở chế độ `en`, tất cả các tiêu đề, bài giảng, nhãn nút, giải thích đều phải là tiếng Anh tự nhiên, chuẩn thuật ngữ CS/ICT.
