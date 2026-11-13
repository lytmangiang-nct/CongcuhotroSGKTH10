export interface PythonSandboxSample {
  id: string;
  lessonId: number;
  titleVi: string;
  titleEn: string;
  descriptionVi: string;
  descriptionEn: string;
  starterCode: string;
  defaultStdin: string;
  hint1Vi: string;
  hint1En: string;
  hint2Vi: string;
  hint2En: string;
  hint3SolutionCode: string;
  hint3ExplanationVi: string;
  hint3ExplanationEn: string;
}

const PYTHON_SAMPLES_BY_LESSON: Record<number, PythonSandboxSample[]> = {
  16: [
    {
      id: 'py16-hello',
      lessonId: 16,
      titleVi: 'Bài 16 • Lệnh print() & phép tính cơ bản',
      titleEn: 'Lesson 16 • First print() & Arithmetic',
      descriptionVi: 'Sửa lỗi hoặc mở rộng chương trình in lời chào và diện tích hình chữ nhật kích thước a = 12, b = 5.',
      descriptionEn: 'Fix or extend the script to print a greeting and rectangle area for a = 12, b = 5.',
      starterCode: `# Bai 16: Lenh Python dau tien
a = 12
b = 5
dien_tich = a + b  # Hay kiem tra lai phep tinh dien tich!
print("Xin chao Tin hoc 10!")
print("Dien tich:", dien_tich)`,
      defaultStdin: '',
      hint1Vi: 'Xem lại dòng 4: biểu thức tính `dien_tich = a + b`.',
      hint1En: 'Check line 4: `dien_tich = a + b`.',
      hint2Vi: 'Diện tích hình chữ nhật bằng chiều dài nhân chiều rộng (`a * b`), không phải phép cộng.',
      hint2En: 'Rectangle area is width multiplied by height (`a * b`), not addition.',
      hint3SolutionCode: `a = 12
b = 5
dien_tich = a * b
print("Xin chao Tin hoc 10!")
print("Dien tich:", dien_tich)`,
      hint3ExplanationVi: 'Thay phép cộng `+` bằng phép nhân `*` để tính đúng diện tích bằng 60.',
      hint3ExplanationEn: 'Replace `+` with `*` to compute the area as 60.'
    }
  ],
  17: [
    {
      id: 'py17-circle',
      lessonId: 17,
      titleVi: 'Bài 17 • Chu vi & Diện tích hình tròn (Circle.py)',
      titleEn: 'Lesson 17 • Circle Perimeter & Area',
      descriptionVi: 'Tính chu vi C = 2 * pi * r và diện tích S = pi * r * r với bán kính r = 5.',
      descriptionEn: 'Compute perimeter C = 2 * pi * r and area S = pi * r * r for radius r = 5.',
      starterCode: `pi = 3.14
r = 5
C = 2 * pi * r
S = pi * r   # Con thieu r binh phuong!
print("Chu vi:", C)
print("Dien tich:", round(S, 2))`,
      defaultStdin: '',
      hint1Vi: 'Kiểm tra công thức ở dòng 4 tính biến `S`.',
      hint1En: 'Inspect line 4 where `S` is calculated.',
      hint2Vi: 'Diện tích hình tròn cần `r * r` hoặc `r ** 2`.',
      hint2En: 'Area requires `r * r` or `r ** 2`.',
      hint3SolutionCode: `pi = 3.14
r = 5
C = 2 * pi * r
S = pi * (r ** 2)
print("Chu vi:", C)
print("Dien tich:", round(S, 2))`,
      hint3ExplanationVi: 'Dùng `r ** 2` (luỹ thừa bậc 2) để tính S = 78.5.',
      hint3ExplanationEn: 'Use `r ** 2` to calculate S = 78.5.'
    }
  ],
  18: [
    {
      id: 'py18-seconds',
      lessonId: 18,
      titleVi: 'Bài 18 • Đọc dữ liệu input() & đổi số giây',
      titleEn: 'Lesson 18 • Reading input() & Converting Seconds',
      descriptionVi: 'Nhập tổng số giây từ `input()` (ô dữ liệu thử nghiệm), quy đổi ra giờ, phút, giây bằng // và %.',
      descriptionEn: 'Read total seconds via `input()` and convert into hours, minutes, seconds using // and %.',
      starterCode: `ss = input("Nhap tong so giay: ")
# Loi: input() tra ve xau (str), can chuyen sang int()!
gio = ss // 3600
con_lai = ss % 3600
phut = con_lai // 60
giay = con_lai % 60
print(gio, "gio", phut, "phut", giay, "giay")`,
      defaultStdin: '3665',
      hint1Vi: 'Xem lại dòng 1 và dòng 3: `ss` đang có kiểu xâu kí tự `str`.',
      hint1En: 'Inspect line 1 and line 3: `ss` is currently a `str`.',
      hint2Vi: 'Bọc `int(...)` quanh `input(...)` để ép kiểu số nguyên trước khi chia `//` và `%`.',
      hint2En: 'Wrap `input(...)` with `int(...)` before integer division `//` and modulo `%`.',
      hint3SolutionCode: `ss = int(input("Nhap tong so giay: "))
gio = ss // 3600
con_lai = ss % 3600
phut = con_lai // 60
giay = con_lai % 60
print(gio, "gio", phut, "phut", giay, "giay")`,
      hint3ExplanationVi: 'Hàm `input()` luôn trả về `str`; dùng `int(input(...))` để tính 3665s = 1 giờ 1 phút 5 giây.',
      hint3ExplanationEn: '`input()` returns a string; wrap it in `int(...)` so 3665s becomes 1h 1m 5s.'
    }
  ],
  19: [
    {
      id: 'py19-branching',
      lessonId: 19,
      titleVi: 'Bài 19 • Rẽ nhánh if / elif / else tính tiền điện',
      titleEn: 'Lesson 19 • if / elif / else Branching',
      descriptionVi: 'Nhập số kWh điện tiêu thụ và kiểm tra rẽ nhánh: dưới 50 số giá 1678, từ 51 đến 100 giá 1734.',
      descriptionEn: 'Read kWh usage and compute electricity cost across tiers using if/elif/else.',
      starterCode: `kwh = int(input("Nhap so kWh: "))
if kwh <= 50:
    tien = kwh * 1678
elif kwh <= 100:
    # Sua dong duoi de tinh dung 50 so dau * 1678 + phan vuot * 1734
    tien = kwh * 1734
else:
    tien = 50 * 1678 + 50 * 1734 + (kwh - 100) * 2014
print("Tien dien:", tien)`,
      defaultStdin: '75',
      hint1Vi: 'Kiểm tra dòng 6 trong nhánh `elif kwh <= 100:`.',
      hint1En: 'Check line 6 inside `elif kwh <= 100:`.',
      hint2Vi: 'Theo bậc thang, 50 số đầu vẫn tính giá 1678, chỉ phần `(kwh - 50)` mới nhân giá 1734.',
      hint2En: 'Only `(kwh - 50)` uses rate 1734; the first 50 units stay at 1678.',
      hint3SolutionCode: `kwh = int(input("Nhap so kWh: "))
if kwh <= 50:
    tien = kwh * 1678
elif kwh <= 100:
    tien = 50 * 1678 + (kwh - 50) * 1734
else:
    tien = 50 * 1678 + 50 * 1734 + (kwh - 100) * 2014
print("Tien dien:", tien)`,
      hint3ExplanationVi: 'Với 75 kWh: 50 * 1678 + 25 * 1734 = 127250 đồng.',
      hint3ExplanationEn: 'For 75 kWh: 50 * 1678 + 25 * 1734 = 127250.'
    }
  ],
  20: [
    {
      id: 'py20-for-divisors',
      lessonId: 20,
      titleVi: 'Bài 20 • Vòng lặp for đếm ước số thực sự của n',
      titleEn: 'Lesson 20 • Counting Proper Divisors with for',
      descriptionVi: 'Đếm số ước số thực sự (1 <= k < n) của số nguyên dương n.',
      descriptionEn: 'Count proper divisors (1 <= k < n) of positive integer n.',
      starterCode: `n = int(input("Nhap n: "))
dem = 0
for k in range(0, n):  # Chu y: range(0, n) bat dau tu 0 se gay loi chia cho 0!
    if n % k == 0:
        dem = dem + 1
print("So uoc thuc su:", dem)`,
      defaultStdin: '12',
      hint1Vi: 'Kiểm tra tham số bắt đầu của `range(0, n)` ở dòng 3.',
      hint1En: 'Look at the starting argument of `range(0, n)` on line 3.',
      hint2Vi: 'Ước số bắt đầu từ 1 nên dùng `range(1, n)` để tránh lỗi ZeroDivisionError `n % 0`.',
      hint2En: 'Divisors start at 1; change to `range(1, n)` to avoid division by zero.',
      hint3SolutionCode: `n = int(input("Nhap n: "))
dem = 0
for k in range(1, n):
    if n % k == 0:
        dem = dem + 1
print("So uoc thuc su:", dem)`,
      hint3ExplanationVi: 'Với n = 12, các ước thực sự là 1, 2, 3, 4, 6 -> kết quả là 5.',
      hint3ExplanationEn: 'For n = 12, proper divisors are 1, 2, 3, 4, 6 -> count is 5.'
    }
  ],
  21: [
    {
      id: 'py21-while-sum',
      lessonId: 21,
      titleVi: 'Bài 21 • Vòng lặp while & phòng tránh lặp vô hạn',
      titleEn: 'Lesson 21 • while Loop & Preventing Infinite Loops',
      descriptionVi: 'Tính tổng S = 1 + 8 + 15 + ... (mỗi bước tăng 7) khi k < 100. Hãy bổ sung lệnh tăng biến k để tránh lặp vô hạn!',
      descriptionEn: 'Compute S = 1 + 8 + 15 + ... while k < 100. Add the update step to prevent an infinite loop.',
      starterCode: `S = 0
k = 1
while k < 100:
    S = S + k
    # Thieu lenh cap nhat k! Thu an Chay hoac Dung neu lap vo han
print("Tong S =", S)`,
      defaultStdin: '',
      hint1Vi: 'Xem trong thân vòng lặp `while k < 100:` (dòng 4–5).',
      hint1En: 'Inspect the loop body under `while k < 100:` (lines 4–5).',
      hint2Vi: 'Thêm lệnh `k = k + 7` vào bên trong thân vòng lặp để điều kiện dừng đạt được.',
      hint2En: 'Add `k = k + 7` inside the loop body so `k` advances toward termination.',
      hint3SolutionCode: `S = 0
k = 1
while k < 100:
    S = S + k
    k = k + 7
print("Tong S =", S)`,
      hint3ExplanationVi: 'Nếu thiếu `k = k + 7`, vòng lặp vô hạn sẽ bị bộ bảo vệ Worker tự ngắt. Khi thêm `k = k + 7`, kết quả S = 750.',
      hint3ExplanationEn: 'Adding `k = k + 7` ensures the loop terminates cleanly with S = 750.'
    }
  ],
  22: [
    {
      id: 'py22-list-append',
      lessonId: 22,
      titleVi: 'Bài 22 • Tạo danh sách & thêm phần tử append()',
      titleEn: 'Lesson 22 • Lists & append() Method',
      descriptionVi: 'Nhập n và đọc n số vào danh sách A, sau đó in ra danh sách và tổng các phần tử.',
      descriptionEn: 'Read n items into list A with append(), then display A and its sum.',
      starterCode: `n = int(input("So phan tu: "))
A = []
for i in range(n):
    x = int(input())
    # Them x vao cuoi danh sach A tai day
print("Danh sach A:", A)
print("Tong:", sum(A))`,
      defaultStdin: '4\n5\n8\n2\n10',
      hint1Vi: 'Kiểm tra dòng 5 bên trong vòng lặp `for i in range(n):`.',
      hint1En: 'Check line 5 inside `for i in range(n):`.',
      hint2Vi: 'Gọi phương thức `A.append(x)` đúng mức thụt lề trong vòng lặp `for`.',
      hint2En: 'Call `A.append(x)` indented inside the `for` loop.',
      hint3SolutionCode: `n = int(input("So phan tu: "))
A = []
for i in range(n):
    x = int(input())
    A.append(x)
print("Danh sach A:", A)
print("Tong:", sum(A))`,
      hint3ExplanationVi: 'Mỗi vòng lặp gắn phần tử mới vào cuối danh sách A, tổng 5+8+2+10 = 25.',
      hint3ExplanationEn: 'Appending each input yields [5, 8, 2, 10] with sum 25.'
    }
  ],
  23: [
    {
      id: 'py23-list-ops',
      lessonId: 23,
      titleVi: 'Bài 23 • Toán tử in & thao tác trên danh sách',
      titleEn: 'Lesson 23 • Membership Operator in & List Ops',
      descriptionVi: 'Lọc các số dương từ danh sách A sang danh sách B.',
      descriptionEn: 'Filter positive numbers from list A into list B.',
      starterCode: `A = [-3, 5, 0, 8, -1, 12]
B = []
for x in A:
    if x < 0:  # Kiem tra lai dieu kien loc so duong (> 0)
        B.append(x)
print("So duong:", B)`,
      defaultStdin: '',
      hint1Vi: 'Xem biểu thức điều kiện tại dòng 4: `if x < 0:`.',
      hint1En: 'Look at the condition on line 4: `if x < 0:`.',
      hint2Vi: 'Số dương phải lớn hơn 0, đổi `<` thành `>`.',
      hint2En: 'Positive numbers are greater than zero: change `<` to `>`.',
      hint3SolutionCode: `A = [-3, 5, 0, 8, -1, 12]
B = []
for x in A:
    if x > 0:
        B.append(x)
print("So duong:", B)`,
      hint3ExplanationVi: 'Với điều kiện `x > 0`, danh sách B thu được `[5, 8, 12]`.',
      hint3ExplanationEn: 'Using `x > 0` filters B to `[5, 8, 12]`.'
    }
  ],
  24: [
    {
      id: 'py24-string-traverse',
      lessonId: 24,
      titleVi: 'Bài 24 • Xâu kí tự & duyệt từng kí tự',
      titleEn: 'Lesson 24 • String Traversal & Counting Digits',
      descriptionVi: 'Đếm có bao nhiêu chữ số (0–9) xuất hiện trong xâu kí tự s.',
      descriptionEn: 'Count how many digit characters (0–9) appear in string s.',
      starterCode: `s = input("Nhap xau s: ")
dem = 0
for ch in s:
    if ch >= "0" and ch <= "9":
        dem = dem + 0  # Sua lai buoc tang bien dem!
print("So chu so:", dem)`,
      defaultStdin: 'Tin10_KNTT_2025',
      hint1Vi: 'Kiểm tra phép gán tăng biến đếm ở dòng 5.',
      hint1En: 'Check the increment statement on line 5.',
      hint2Vi: 'Đổi `dem = dem + 0` thành `dem = dem + 1`.',
      hint2En: 'Change `dem = dem + 0` to `dem = dem + 1`.',
      hint3SolutionCode: `s = input("Nhap xau s: ")
dem = 0
for ch in s:
    if ch >= "0" and ch <= "9":
        dem = dem + 1
print("So chu so:", dem)`,
      hint3ExplanationVi: 'Xâu `"Tin10_KNTT_2025"` có 6 chữ số (1, 0, 2, 0, 2, 5).',
      hint3ExplanationEn: 'String `"Tin10_KNTT_2025"` contains 6 digits (1, 0, 2, 0, 2, 5).'
    }
  ],
  25: [
    {
      id: 'py25-split-join',
      lessonId: 25,
      titleVi: 'Bài 25 • Phương thức split(), find() và join()',
      titleEn: 'Lesson 25 • String Methods split(), find(), join()',
      descriptionVi: 'Tách xâu họ tên thành danh sách từ và nối lại bằng dấu gạch ngang "-".',
      descriptionEn: 'Split a full name into words and join them using a hyphen "-".',
      starterCode: `s = "Nguyen   Van   An"
ds = s.split()
ket_qua = " ".join(ds)  # Doi ki tu noi thanh "-" theo de bai
print("Danh sach tu:", ds)
print("Ket qua noi:", ket_qua)`,
      defaultStdin: '',
      hint1Vi: 'Xem xâu phân cách gọi phương thức `.join(ds)` ở dòng 3.',
      hint1En: 'Check the separator passed to `.join(ds)` on line 3.',
      hint2Vi: 'Thay `" ".join(ds)` bằng `"-".join(ds)`.',
      hint2En: 'Replace `" ".join(ds)` with `"-".join(ds)`.',
      hint3SolutionCode: `s = "Nguyen   Van   An"
ds = s.split()
ket_qua = "-".join(ds)
print("Danh sach tu:", ds)
print("Ket qua noi:", ket_qua)`,
      hint3ExplanationVi: '`s.split()` tự loại bỏ khoảng trắng thừa, rồi `"-".join(ds)` tạo `"Nguyen-Van-An"`.',
      hint3ExplanationEn: '`s.split()` strips extra spaces, then `"-".join(ds)` returns `"Nguyen-Van-An"`.'
    }
  ],
  26: [
    {
      id: 'py26-def-return',
      lessonId: 26,
      titleVi: 'Bài 26 • Định nghĩa hàm def & câu lệnh return',
      titleEn: 'Lesson 26 • Defining Functions with def & return',
      descriptionVi: 'Viết hàm `tong_uoc(n)` trả về tổng các ước thực sự của n.',
      descriptionEn: 'Complete function `tong_uoc(n)` to return the sum of proper divisors of n.',
      starterCode: `def tong_uoc(n):
    s = 0
    for i in range(1, n):
        if n % i == 0:
            s = s + i
    # Thieu lenh return s nen ham tra ve None!

print("Tong uoc cua 12:", tong_uoc(12))`,
      defaultStdin: '',
      hint1Vi: 'Kiểm tra phần cuối hàm `tong_uoc(n)` (dòng 6).',
      hint1En: 'Check the end of function `tong_uoc(n)` (line 6).',
      hint2Vi: 'Bổ sung câu lệnh `return s` cùng mức thụt lề với `for`.',
      hint2En: 'Add `return s` aligned with the `for` loop inside the function.',
      hint3SolutionCode: `def tong_uoc(n):
    s = 0
    for i in range(1, n):
        if n % i == 0:
            s = s + i
    return s

print("Tong uoc cua 12:", tong_uoc(12))`,
      hint3ExplanationVi: 'Với n = 12, `return s` trả về 1 + 2 + 3 + 4 + 6 = 16.',
      hint3ExplanationEn: 'Returning `s` outputs 1 + 2 + 3 + 4 + 6 = 16.'
    }
  ],
  27: [
    {
      id: 'py27-params-args',
      lessonId: 27,
      titleVi: 'Bài 27 • Tham số (Parameter) & Đối số (Argument)',
      titleEn: 'Lesson 27 • Function Parameters & Arguments',
      descriptionVi: 'Hoàn thiện hàm `tach_ten(ho_ten)` nhận tham số xâu và in ra Tên (từ cuối cùng).',
      descriptionEn: 'Complete `tach_ten(ho_ten)` to return the given name (last word).',
      starterCode: `def tach_ten(ho_ten):
    parts = ho_ten.split()
    return parts[0]  # parts[0] la Ho! Hay lay phan tu cuoi cung

print(tach_ten("Tran Minh Khoi"))`,
      defaultStdin: '',
      hint1Vi: 'Xem chỉ số phần tử trả về ở dòng 3: `parts[0]`.',
      hint1En: 'Check the index returned on line 3: `parts[0]`.',
      hint2Vi: 'Trong Python, phần tử cuối cùng của danh sách có chỉ số `-1` hoặc `len(parts) - 1`.',
      hint2En: 'The last element is indexed by `parts[-1]` or `parts[len(parts) - 1]`.',
      hint3SolutionCode: `def tach_ten(ho_ten):
    parts = ho_ten.split()
    return parts[-1]

print(tach_ten("Tran Minh Khoi"))`,
      hint3ExplanationVi: 'Với `"Tran Minh Khoi"`, `parts[-1]` trả về `"Khoi"`.',
      hint3ExplanationEn: 'For `"Tran Minh Khoi"`, `parts[-1]` evaluates to `"Khoi"`.'
    }
  ],
  28: [
    {
      id: 'py28-scope-global',
      lessonId: 28,
      titleVi: 'Bài 28 • Phạm vi biến Cục bộ vs Từ khoá global',
      titleEn: 'Lesson 28 • Local Scope vs global Keyword',
      descriptionVi: 'Cho biến toàn cục `t = 10`. Hãy dùng từ khoá `global` trong hàm `f(n)` để cập nhật `t = 2 * n + 1`.',
      descriptionEn: 'Use the `global` keyword inside `f(n)` so calling `f(1)` updates outer `t = 10` to `3`.',
      starterCode: `t = 10
def f(n):
    # Bo sung "global t" o day de thay doi bien toan cuc t
    t = 2 * n + 1

f(1)
print("Gia tri t sau khi goi f(1):", t)`,
      defaultStdin: '',
      hint1Vi: 'Xem dòng đầu tiên bên trong thân hàm `def f(n):`.',
      hint1En: 'Look at the first line inside `def f(n):`.',
      hint2Vi: 'Khai báo `global t` trước khi thực hiện phép gán `t = 2 * n + 1`.',
      hint2En: 'Declare `global t` before assigning `t = 2 * n + 1`.',
      hint3SolutionCode: `t = 10
def f(n):
    global t
    t = 2 * n + 1

f(1)
print("Gia tri t sau khi goi f(1):", t)`,
      hint3ExplanationVi: 'Không có `global t`, biến ngoài vẫn là 10; có `global t`, biến ngoài đổi thành 3.',
      hint3ExplanationEn: 'With `global t`, calling `f(1)` updates the global variable `t` from 10 to 3.'
    }
  ],
  29: [
    {
      id: 'py29-exceptions',
      lessonId: 29,
      titleVi: 'Bài 29 • Nhận biết & phòng tránh lỗi ngoại lệ',
      titleEn: 'Lesson 29 • Handling Exceptions Safely',
      descriptionVi: 'Thử chạy chương trình có lỗi `ZeroDivisionError` rồi dùng `if b == 0:` hoặc `try...except` để bảo vệ.',
      descriptionEn: 'Run the script triggering `ZeroDivisionError`, then guard it using `if b == 0:` or `try...except`.',
      starterCode: `a = 100
b = int(input("Nhap mau so b: "))
# Chuong trinh se bao loi neu b = 0! Hay them kiem tra an toan
kq = a / b
print("Ket qua:", kq)`,
      defaultStdin: '0',
      hint1Vi: 'Kiểm tra phép chia `a / b` ở dòng 4 khi đầu vào `b = 0`.',
      hint1En: 'Inspect `a / b` on line 4 when input `b` is `0`.',
      hint2Vi: 'Kiểm tra `if b == 0:` trước khi chia, hoặc bọc bằng `try: ... except ZeroDivisionError:`.',
      hint2En: 'Add `if b == 0:` guard before dividing or use `try ... except ZeroDivisionError:`.',
      hint3SolutionCode: `a = 100
b = int(input("Nhap mau so b: "))
if b == 0:
    print("Loi: Khong the chia cho 0!")
else:
    kq = a / b
    print("Ket qua:", kq)`,
      hint3ExplanationVi: 'Kiểm tra điều kiện biên `b == 0` giúp chương trình thông báo thân thiện thay vì dừng đột ngột.',
      hint3ExplanationEn: 'Checking the `b == 0` boundary prevents crashes and prints a safe message.'
    }
  ],
  30: [
    {
      id: 'py30-euclid-debug',
      lessonId: 30,
      titleVi: 'Bài 30 • Theo dõi biến trung gian tìm ƯCLN (Euclid)',
      titleEn: 'Lesson 30 • Intermediate Print Debugging (Euclid GCD)',
      descriptionVi: 'Quan sát biến trung gian m, n qua từng vòng lặp Euclid. Thử sửa giá trị m, n ban đầu hoặc thêm câu lệnh print debug.',
      descriptionEn: 'Trace intermediate variables m, n through Euclidean subtraction and print the final GCD.',
      starterCode: `m = 20
n = 16
k = 0
while m != n:
    k = k + 1
    if m < n:
        n = n - m
    else:
        m = m - n
    print("Vong lap", k, ":", m, n)
print("UCLN la:", m)`,
      defaultStdin: '',
      hint1Vi: 'Kiểm tra dòng 6–9 trong khối `if m < n:` xem phép trừ có giảm dần số lớn hơn không.',
      hint1En: 'Inspect lines 6–9 to ensure the larger variable is decremented.',
      hint2Vi: 'Dòng `print("Vong lap", k, ":", m, n)` giúp theo dõi biến tại mỗi lần lặp như bảng Breakpoint.',
      hint2En: 'Printing `(k, m, n)` each iteration mirrors a breakpoint watch table.',
      hint3SolutionCode: `m = 20
n = 16
k = 0
while m != n:
    k = k + 1
    if m < n:
        n = n - m
    else:
        m = m - n
    print("Vong lap", k, ":", m, n)
print("UCLN la:", m)`,
      hint3ExplanationVi: 'Thuật toán dừng ở vòng 4 khi m == n == 4, xuất ra ƯCLN là 4.',
      hint3ExplanationEn: 'The loop finishes at iteration 4 when m == n == 4.'
    }
  ],
  31: [
    {
      id: 'py31-prime-factors',
      lessonId: 31,
      titleVi: 'Bài 31 • Phân tích thừa số nguyên tố',
      titleEn: 'Lesson 31 • Prime Factorization',
      descriptionVi: 'Phân tích số tự nhiên n thành tích các thừa số nguyên tố.',
      descriptionEn: 'Decompose integer n into prime factors.',
      starterCode: `n = int(input("Nhap n: "))
k = 2
factors = []
while n > 1:
    if n % k == 0:
        factors.append(k)
        n = n // k
    else:
        k = k + 0  # Sua buoc tang k de tranh lap vo han!
print("Thua so nguyen to:", factors)`,
      defaultStdin: '60',
      hint1Vi: 'Xem dòng 9 trong nhánh `else:`: `k = k + 0`.',
      hint1En: 'Check line 9 inside the `else:` branch: `k = k + 0`.',
      hint2Vi: 'Khi n không chia hết cho k, tăng `k = k + 1`.',
      hint2En: 'When `n` is not divisible by `k`, increment `k = k + 1`.',
      hint3SolutionCode: `n = int(input("Nhap n: "))
k = 2
factors = []
while n > 1:
    if n % k == 0:
        factors.append(k)
        n = n // k
    else:
        k = k + 1
print("Thua so nguyen to:", factors)`,
      hint3ExplanationVi: 'Với n = 60, kết quả là `[2, 2, 3, 5]`.',
      hint3ExplanationEn: 'For n = 60, the prime factors are `[2, 2, 3, 5]`.'
    }
  ],
  32: [
    {
      id: 'py32-leap-year',
      lessonId: 32,
      titleVi: 'Bài 32 • Hàm nhuan(year) & tách họ tên',
      titleEn: 'Lesson 32 • Leap Year Check & Name Parsing',
      descriptionVi: 'Hoàn thiện hàm `nhuan(year)` trả về True nếu year chia hết 400 hoặc (chia hết 4 và không chia hết 100).',
      descriptionEn: 'Complete `nhuan(year)` returning True if leap year (`% 400 == 0` or `% 4 == 0 and % 100 != 0`).',
      starterCode: `def nhuan(year):
    # Sua dieu kien nam nhuan theo chuan lich thien van
    return year % 4 == 0

for y in [1900, 2000, 2024, 2025]:
    print(y, "nhuan?", nhuan(y))`,
      defaultStdin: '',
      hint1Vi: 'Kiểm tra biểu thức trả về tại dòng 3 với năm thế kỉ 1900.',
      hint1En: 'Inspect line 3 with century year 1900 (not a leap year!).',
      hint2Vi: 'Điều kiện đủ là `(year % 400 == 0) or (year % 4 == 0 and year % 100 != 0)`.',
      hint2En: 'Use `(year % 400 == 0) or (year % 4 == 0 and year % 100 != 0)`.',
      hint3SolutionCode: `def nhuan(year):
    return (year % 400 == 0) or (year % 4 == 0 and year % 100 != 0)

for y in [1900, 2000, 2024, 2025]:
    print(y, "nhuan?", nhuan(y))`,
      hint3ExplanationVi: '1900 chia hết cho 100 nhưng không chia hết cho 400 nên False; 2000 và 2024 là True.',
      hint3ExplanationEn: '1900 is False while 2000 and 2024 evaluate to True.'
    }
  ]
};

export const getLessonPythonSamples = (lessonId: number): PythonSandboxSample[] => {
  if (PYTHON_SAMPLES_BY_LESSON[lessonId]) {
    return PYTHON_SAMPLES_BY_LESSON[lessonId];
  }
  // Fallback for Python lessons 16..32 without explicit override or any other lesson
  return [
    {
      id: `py-default-${lessonId}`,
      lessonId,
      titleVi: `Bài ${lessonId} • Không gian thực hành Python`,
      titleEn: `Lesson ${lessonId} • Guided Python Sandbox`,
      descriptionVi: 'Thử nghiệm viết mã Python, nhập dữ liệu đầu vào (input) và kiểm tra kết quả thực thi cô lập.',
      descriptionEn: 'Write Python snippets, supply `input()` test data, and run in an isolated Web Worker.',
      starterCode: `name = input("Nhap ten: ")
n = int(input("Nhap so n: "))
tong = 0
for i in range(1, n + 1):
    tong = tong + i
print("Chao", name, "- Tong 1..", n, "=", tong)`,
      defaultStdin: 'Minh\n10',
      hint1Vi: 'Kiểm tra lời gọi `input()` theo đúng thứ tự các dòng trong ô Dữ liệu đầu vào.',
      hint1En: 'Verify each `input()` call matches one line in the Test Input box.',
      hint2Vi: 'Dùng `int(input())` khi cần thực hiện phép toán số học trên dữ liệu nhập.',
      hint2En: 'Wrap `input()` with `int(...)` before performing arithmetic.',
      hint3SolutionCode: `name = input("Nhap ten: ")
n = int(input("Nhap so n: "))
tong = 0
for i in range(1, n + 1):
    tong = tong + i
print("Chao", name, "- Tong 1..", n, "=", tong)`,
      hint3ExplanationVi: 'Chương trình đọc 2 dòng dữ liệu đầu vào (tên và số nguyên n) rồi tính tổng từ 1 đến n.',
      hint3ExplanationEn: 'Reads name and integer n from stdin, then prints the cumulative sum 1..n.'
    }
  ];
};

export const hasPythonPlaygroundForLesson = (lessonId: number): boolean => {
  return lessonId >= 16 && lessonId <= 32;
};
