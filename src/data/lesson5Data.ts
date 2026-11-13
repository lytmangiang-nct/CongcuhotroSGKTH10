import { TermDefinition } from './lessonData';
import { QuizQuestion } from './lesson2Data';

export const LESSON_5_GLOSSARY: TermDefinition[] = [
  {
    id: 'proposition',
    termEn: 'Proposition / Statement',
    termVi: 'Mệnh đề',
    ipa: '/ˌprɒp.əˈzɪʃ.ən/',
    definitionVi: 'Khẳng định có tính chất hoặc đúng hoặc sai, không thể vừa đúng vừa sai hoặc không xác định được tính đúng sai.',
    definitionEn: 'A declarative sentence or statement that is either definitively true or false, but cannot be both or undetermined.',
    exampleVi: '"Hà Nội là Thủ đô của Việt Nam" là mệnh đề đúng; "9 là số nguyên tố" là mệnh đề sai.',
    exampleEn: '"Hanoi is the capital of Vietnam" is a true proposition; "9 is a prime number" is a false proposition.',
    sgkContext: 'Mục 1a - Trang 24 SGK Tin học 10'
  },
  {
    id: 'truth-value',
    termEn: 'Truth Value / Logic Value',
    termVi: 'Giá trị chân lí (Giá trị lôgic)',
    ipa: '/truːθ ˈvæl.juː/',
    definitionVi: 'Giá trị xác định tính đúng hay sai của một mệnh đề. Trong đại số lôgic và tin học, giá trị "Đúng" (True) tương ứng với 1, và "Sai" (False) tương ứng với 0.',
    definitionEn: 'The value indicating the truth or falsehood of a proposition. In Boolean algebra and computer science, "True" is encoded as 1 and "False" as 0.',
    exampleVi: 'Mệnh đề 3 > 5 có giá trị chân lí là Sai (0). Mệnh đề 2 × 3 = 6 có giá trị chân lí là Đúng (1).',
    exampleEn: 'The statement 3 > 5 has truth value False (0). The statement 2 × 3 = 6 has truth value True (1).',
    sgkContext: 'Mục 1a - Trang 24 SGK Tin học 10'
  },
  {
    id: 'boolean-variable',
    termEn: 'Boolean Variable / Logic Quantity',
    termVi: 'Đại lượng lôgic (Biến lôgic)',
    ipa: '/ˈbuː.li.ən ˈveə.ri.ə.bəl/',
    definitionVi: 'Đại lượng chỉ có thể nhận một trong hai giá trị chân lí là Đúng (1) hoặc Sai (0).',
    definitionEn: 'A variable that can take only one of two truth values: True (1) or False (0).',
    exampleVi: 'Biến p = True hoặc p = 1 trong ngôn ngữ lập trình Python.',
    exampleEn: 'Variable p = True or p = 1 in Python programming.',
    sgkContext: 'Mục 1a - Trang 24 SGK Tin học 10'
  },
  {
    id: 'and-operation',
    termEn: 'AND Operation (Logical Conjunction)',
    termVi: 'Phép toán AND (Phép nhân lôgic / Hội)',
    ipa: '/ænd ˌɒp.ərˈeɪ.ʃən/',
    definitionVi: 'Phép toán lôgic giữa hai mệnh đề p và q, ký hiệu p AND q. Mệnh đề p AND q chỉ đúng khi CẢ HAI mệnh đề p và q đều đúng.',
    definitionEn: 'A logical operation between two propositions p and q, denoted p AND q. The statement p AND q is true IF AND ONLY IF both p and q are true.',
    exampleVi: '1 AND 1 = 1; 1 AND 0 = 0; 0 AND 1 = 0; 0 AND 0 = 0.',
    exampleEn: '1 AND 1 = 1; 1 AND 0 = 0; 0 AND 1 = 0; 0 AND 0 = 0.',
    sgkContext: 'Mục 1b - Trang 25 SGK Tin học 10 (Bảng 5.2)'
  },
  {
    id: 'or-operation',
    termEn: 'OR Operation (Logical Disjunction)',
    termVi: 'Phép toán OR (Phép cộng lôgic / Tuyển)',
    ipa: '/ɔːr ˌɒp.ərˈeɪ.ʃən/',
    definitionVi: 'Phép toán lôgic giữa hai mệnh đề p và q, ký hiệu p OR q. Mệnh đề p OR q đúng khi ÍT NHẤT MỘT trong hai mệnh đề p hoặc q đúng; chỉ sai khi cả hai cùng sai.',
    definitionEn: 'A logical operation between two propositions p and q, denoted p OR q. The statement p OR q is true if AT LEAST ONE of p or q is true; it is false only when both are false.',
    exampleVi: '1 OR 1 = 1; 1 OR 0 = 1; 0 OR 1 = 1; 0 OR 0 = 0.',
    exampleEn: '1 OR 1 = 1; 1 OR 0 = 1; 0 OR 1 = 1; 0 OR 0 = 0.',
    sgkContext: 'Mục 1b - Trang 25 SGK Tin học 10 (Bảng 5.2)'
  },
  {
    id: 'xor-operation',
    termEn: 'XOR Operation (Exclusive OR)',
    termVi: 'Phép toán XOR (Phép cộng loại trừ lôgic)',
    ipa: '/ˌeks ˈɔːr ˌɒp.ərˈeɪ.ʃən/',
    definitionVi: 'Phép toán lôgic p XOR q chỉ cho giá trị đúng khi p và q có giá trị KHÁC NHAU (một đúng, một sai); cho giá trị sai khi p và q có cùng giá trị.',
    definitionEn: 'A logical operation that evaluates to true IF AND ONLY IF the operands have DIFFERENT truth values (one true, one false); evaluates to false if both operands are identical.',
    exampleVi: '1 XOR 0 = 1; 0 XOR 1 = 1; 1 XOR 1 = 0; 0 XOR 0 = 0.',
    exampleEn: '1 XOR 0 = 1; 0 XOR 1 = 1; 1 XOR 1 = 0; 0 XOR 0 = 0.',
    sgkContext: 'Mục 1b - Trang 25 SGK Tin học 10 (Bảng 5.2)'
  },
  {
    id: 'not-operation',
    termEn: 'NOT Operation (Logical Negation)',
    termVi: 'Phép toán NOT (Phép phủ định lôgic)',
    ipa: '/nɒt ˌɒp.ərˈeɪ.ʃən/',
    definitionVi: 'Phép toán một ngôi đảo ngược giá trị chân lí: NOT p cho giá trị đúng nếu p sai, và cho giá trị sai nếu p đúng.',
    definitionEn: 'A unary logical operation that inverts truth value: NOT p is true if p is false, and false if p is true.',
    exampleVi: 'NOT 1 = 0; NOT 0 = 1. Nếu p là "Hùng khéo tay" thì NOT p là "Hùng không khéo tay".',
    exampleEn: 'NOT 1 = 0; NOT 0 = 1. If p is "Hung is dexterous", NOT p is "Hung is not dexterous".',
    sgkContext: 'Mục 1b - Trang 25 SGK Tin học 10 (Bảng 5.2)'
  },
  {
    id: 'truth-table',
    termEn: 'Truth Table',
    termVi: 'Bảng chân lí (Bảng giá trị lôgic)',
    ipa: '/truːθ ˈteɪ.bəl/',
    definitionVi: 'Bảng toán học thể hiện đầy đủ các trường hợp giá trị chân lí đầu vào của các biến và kết quả tương ứng của biểu thức lôgic.',
    definitionEn: 'A mathematical table showing all possible truth values for input variables and the resulting truth value of logic expressions.',
    exampleVi: 'Bảng 5.2 SGK Trang 25 liệt kê chân lí của AND, OR, XOR và NOT qua 4 bộ giá trị (1,1; 1,0; 0,1; 0,0).',
    exampleEn: 'Table 5.2 on Page 25 lists truth values for AND, OR, XOR, and NOT across 4 input combinations.',
    sgkContext: 'Mục 1b - Trang 25 SGK Tin học 10 (Bảng 5.2)'
  },
  {
    id: 'bitwise-logic',
    termEn: 'Bitwise Logical Operations',
    termVi: 'Phép toán lôgic trên dãy bit',
    ipa: '/ˈbɪt.waɪz ˈlɒdʒ.ɪ.kəl ˌɒp.ərˈeɪ.ʃənz/',
    definitionVi: 'Phép toán thực hiện thao tác lôgic (AND, OR, XOR, NOT) đồng thời trên từng cặp bit tương ứng tại cùng một vị trí của hai dãy bit (hoặc hai byte).',
    definitionEn: 'Logical operations performed concurrently on corresponding individual bits at each position across two binary sequences (or bytes).',
    exampleVi: '10010011 OR 00100010 = 10110011 (Hình 5.3 SGK Trang 26).',
    exampleEn: '10010011 OR 00100010 = 10110011 (Figure 5.3 Page 26).',
    sgkContext: 'Mục 1b - Trang 26 SGK Tin học 10 (Hình 5.3)'
  },
  {
    id: 'logic-circuit',
    termEn: 'Logic Circuit / Switching Circuit',
    termVi: 'Mạch điện lôgic (Mạch công tắc)',
    ipa: '/ˈlɒdʒ.ɪk ˈsɜː.kɪt/',
    definitionVi: 'Mạch điện tử mô phỏng các hàm lôgic bằng công tắc hoặc cổng bán dẫn. Công tắc mắc nối tiếp tương ứng phép AND; công tắc mắc song song tương ứng phép OR.',
    definitionEn: 'Electronic circuitry implementing Boolean logic. Switches in series implement the AND operation; switches in parallel implement the OR operation.',
    exampleVi: 'Hình 5.5: Hai công tắc K1, K2 mắc nối tiếp ➔ Đèn = K1 AND K2. Hình 5.6: K1, K2 mắc song song ➔ Đèn = K1 OR K2.',
    exampleEn: 'Figure 5.5: Series switches K1, K2 ➔ Lamp = K1 AND K2. Figure 5.6: Parallel switches ➔ Lamp = K1 OR K2.',
    sgkContext: 'Mục Vận dụng - Trang 27 SGK Tin học 10 (Hình 5.5 & 5.6)'
  }
];

export const LESSON_5_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: 'Nhà toán học nào người Anh được coi là người đặt nền móng cho đại số lôgic và mạch điện tử máy tính?',
    questionEn: 'Which British mathematician is credited with founding Boolean algebra, foundational to computer digital circuits?',
    optionsVi: ['George Boole (1815 – 1864)', 'Alan Turing (1912 – 1954)', 'Charles Babbage (1791 – 1871)', 'John von Neumann (1903 – 1957)'],
    optionsEn: ['George Boole (1815 – 1864)', 'Alan Turing (1912 – 1954)', 'Charles Babbage (1791 – 1871)', 'John von Neumann (1903 – 1957)'],
    correctIndex: 0,
    explanationVi: 'Hình 5.1 SGK Trang 24: Nhà toán học người Anh George Boole (1815 – 1864) đã xây dựng nên đại số lôgic với các phép toán trên yếu tố "đúng", "sai".',
    explanationEn: 'Figure 5.1 SGK Page 24: British mathematician George Boole (1815 – 1864) developed Boolean algebra operating on truth values True and False.'
  },
  {
    id: 2,
    questionVi: 'Khẳng định nào dưới đây là một "mệnh đề" theo định nghĩa trong tin học và toán học?',
    questionEn: 'Which of the following statements is a "proposition" according to its definition in computing and mathematics?',
    optionsVi: [
      '"Hà Nội là Thủ đô của Việt Nam"',
      '"Thời tiết hôm nay đẹp quá!"',
      '"Bạn có thích học Tin học không?"',
      '"Hãy làm bài tập về nhà ngay!"'
    ],
    optionsEn: [
      '"Hanoi is the capital of Vietnam"',
      '"The weather today is so beautiful!"',
      '"Do you like studying Informatics?"',
      '"Do your homework right now!"'
    ],
    correctIndex: 0,
    explanationVi: 'Theo SGK Trang 24: Mệnh đề là một khẳng định có tính chất hoặc đúng hoặc sai. Câu cảm thán, câu hỏi và câu mệnh lệnh không phải là mệnh đề.',
    explanationEn: 'According to SGK Page 24: A proposition is a declarative statement that is definitively either true or false. Exclamations, questions, and commands are not propositions.'
  },
  {
    id: 3,
    questionVi: 'Trong đại số lôgic và tin học, hai giá trị chân lí "Đúng" và "Sai" được quy ước tương ứng với các con số nào?',
    questionEn: 'In Boolean algebra and computer science, what numeric values represent the truth values "True" and "False"?',
    optionsVi: [
      'Đúng là 1, Sai là 0',
      'Đúng là 0, Sai là 1',
      'Đúng là 1, Sai là -1',
      'Đúng là 2, Sai là 1'
    ],
    optionsEn: [
      'True is 1, False is 0',
      'True is 0, False is 1',
      'True is 1, False is -1',
      'True is 2, False is 1'
    ],
    correctIndex: 0,
    explanationVi: 'Theo SGK Trang 24: Để ngắn gọn, người ta thường biểu diễn các giá trị lôgic "Đúng" và "Sai" tương ứng là 1 và 0.',
    explanationEn: 'According to SGK Page 24: Conventionally, logic truth values "True" and "False" are represented by binary 1 and 0 respectively.'
  },
  {
    id: 4,
    questionVi: 'Phép toán p AND q chỉ cho giá trị Đúng (1) trong trường hợp nào?',
    questionEn: 'Under what condition does the logical operation p AND q yield True (1)?',
    optionsVi: [
      'Khi cả hai mệnh đề p và q đều Đúng (1)',
      'Khi chỉ cần ít nhất một trong hai mệnh đề p hoặc q Đúng',
      'Khi p và q có giá trị chân lí khác nhau',
      'Khi cả hai mệnh đề p và q đều Sai (0)'
    ],
    optionsEn: [
      'When both propositions p and q are True (1)',
      'When at least one of p or q is True',
      'When p and q have different truth values',
      'When both propositions p and q are False (0)'
    ],
    correctIndex: 0,
    explanationVi: 'Theo Bảng 5.2 SGK Trang 25: p AND q chỉ có giá trị đúng nếu cả p và q đều đúng (1 AND 1 = 1, các trường hợp khác đều bằng 0).',
    explanationEn: 'According to Table 5.2 Page 25: p AND q is true if and only if both p and q are true (1 AND 1 = 1; all other combinations yield 0).'
  },
  {
    id: 5,
    questionVi: 'Phép toán p OR q cho giá trị Sai (0) khi nào?',
    questionEn: 'When does the logical operation p OR q evaluate to False (0)?',
    optionsVi: [
      'Khi cả hai mệnh đề p và q đều Sai (0)',
      'Khi cả hai mệnh đề p và q đều Đúng (1)',
      'Khi p đúng và q sai',
      'Khi p sai và q đúng'
    ],
    optionsEn: [
      'When both propositions p and q are False (0)',
      'When both propositions p and q are True (1)',
      'When p is true and q is false',
      'When p is false and q is true'
    ],
    correctIndex: 0,
    explanationVi: 'Theo Bảng 5.2 SGK Trang 25: p OR q chỉ có giá trị sai khi cả p và q đều sai (0 OR 0 = 0). Chỉ cần ít nhất một mệnh đề đúng thì p OR q cho giá trị đúng.',
    explanationEn: 'According to Table 5.2 Page 25: p OR q evaluates to false only when both p and q are false (0 OR 0 = 0).'
  },
  {
    id: 6,
    questionVi: 'Phép toán lôgic p XOR q (cộng loại trừ) cho giá trị Đúng (1) khi nào?',
    questionEn: 'When does the logic operation p XOR q (exclusive OR) evaluate to True (1)?',
    optionsVi: [
      'Khi p và q có giá trị chân lí khác nhau (một đúng, một sai)',
      'Khi p và q có giá trị chân lí giống nhau',
      'Khi cả p và q cùng bằng 1',
      'Khi cả p và q cùng bằng 0'
    ],
    optionsEn: [
      'When p and q have different truth values (one true, one false)',
      'When p and q have identical truth values',
      'When both p and q are equal to 1',
      'When both p and q are equal to 0'
    ],
    correctIndex: 0,
    explanationVi: 'Theo SGK Trang 25: p XOR q là mệnh đề có giá trị sai khi p và q có giá trị như nhau, và có giá trị đúng khi p và q có giá trị khác nhau (1 XOR 0 = 1; 0 XOR 1 = 1).',
    explanationEn: 'According to SGK Page 25: p XOR q is true when p and q have different truth values, and false when they are identical.'
  },
  {
    id: 7,
    questionVi: 'Trong một biểu thức lôgic không có dấu ngoặc, thứ tự ưu tiên thực hiện các phép toán như thế nào?',
    questionEn: 'In a Boolean expression without parentheses, what is the operator precedence order?',
    optionsVi: [
      'Phép NOT thực hiện trước, sau đó đến các phép AND và OR thực hiện tuần tự từ trái sang phải',
      'Phép AND thực hiện trước, sau đó đến OR, cuối cùng là NOT',
      'Phép OR thực hiện trước, sau đó đến AND và NOT',
      'Tất cả các phép toán có độ ưu tiên ngang nhau và làm từ phải sang trái'
    ],
    optionsEn: [
      'NOT is evaluated first, followed by AND and OR from left to right',
      'AND is evaluated first, followed by OR, and finally NOT',
      'OR is evaluated first, followed by AND and NOT',
      'All operators have equal priority evaluated right to left'
    ],
    correctIndex: 0,
    explanationVi: 'Theo SGK Trang 25: Trong một biểu thức lôgic, phép toán đặt trong dấu ngoặc có độ ưu tiên cao nhất. Nếu không có dấu ngoặc thì phép phủ định NOT được thực hiện trước. Các phép toán AND và OR có độ ưu tiên ngang nhau, được thực hiện tuần tự từ trái sang phải.',
    explanationEn: 'According to SGK Page 25: Parentheses have highest precedence. Without parentheses, NOT is executed first, followed by AND and OR from left to right.'
  },
  {
    id: 8,
    questionVi: 'Trong bài toán củng cố 2 (Bảng 5.3 SGK Trang 26), phương án nào dưới đây cho kết quả SAI đối với biểu thức p AND NOT q?',
    questionEn: 'In Question 2 (Table 5.3 SGK Page 26), which option presents an INCORRECT result for the expression p AND NOT q?',
    optionsVi: [
      'Phương án C: p = 0, q = 0 cho kết quả bằng 1',
      'Phương án A: p = 0, q = 1 cho kết quả bằng 0',
      'Phương án B: p = 1, q = 0 cho kết quả bằng 1',
      'Phương án D: p = 1, q = 1 cho kết quả bằng 0'
    ],
    optionsEn: [
      'Option C: p = 0, q = 0 results in 1',
      'Option A: p = 0, q = 1 results in 0',
      'Option B: p = 1, q = 0 results in 1',
      'Option D: p = 1, q = 1 results in 0'
    ],
    correctIndex: 0,
    explanationVi: 'Khi p = 0, q = 0 thì NOT q = 1. Khi đó p AND NOT q = 0 AND 1 = 0. Do Bảng 5.3 ghi kết quả là 1 nên Phương án C là phương án có kết quả sai!',
    explanationEn: 'When p = 0 and q = 0, NOT q = 1, giving p AND NOT q = 0 AND 1 = 0. Because Table 5.3 lists it as 1, Option C is incorrect.'
  },
  {
    id: 9,
    questionVi: 'Để biểu diễn một đại lượng dữ liệu lôgic trong bộ nhớ máy tính, cần tối thiểu bao nhiêu bit?',
    questionEn: 'What is the minimum number of bits required to store a logical data value in computer memory?',
    optionsVi: ['Chỉ cần 1 bit (1 cho Đúng, 0 cho Sai)', 'Cần 1 byte (8 bit)', 'Cần 2 byte (16 bit)', 'Cần 4 byte (32 bit)'],
    optionsEn: ['Only 1 bit (1 for True, 0 for False)', 'Requires 1 byte (8 bits)', 'Requires 2 bytes (16 bits)', 'Requires 4 bytes (32 bits)'],
    correctIndex: 0,
    explanationVi: 'Theo Hộp Ghi nhớ mục 2 (SGK Trang 27): Chỉ cần 1 bit để biểu diễn dữ liệu lôgic, bit có giá trị bằng 1 cho giá trị đúng và bit có giá trị bằng 0 cho giá trị sai.',
    explanationEn: 'According to Memorization Box 2 (SGK Page 27): Only 1 bit is fundamentally required to represent logic data: 1 for True, 0 for False.'
  },
  {
    id: 10,
    questionVi: 'Trong mạch điện có hai công tắc K1, K2 nối với bóng đèn, mạch mắc nối tiếp (Hình 5.5) và mắc song song (Hình 5.6) tương ứng với các phép toán lôgic nào?',
    questionEn: 'In electrical circuits with switches K1 and K2 wired to a lamp, what logical operations correspond to series (Fig 5.5) and parallel (Fig 5.6) connections?',
    optionsVi: [
      'Mắc nối tiếp tương ứng với K1 AND K2; Mắc song song tương ứng với K1 OR K2',
      'Mắc nối tiếp tương ứng với K1 OR K2; Mắc song song tương ứng với K1 AND K2',
      'Cả hai kiểu mắc đều tương ứng với phép XOR',
      'Mắc nối tiếp tương ứng với phép NOT; Mắc song song tương ứng với phép AND'
    ],
    optionsEn: [
      'Series connection corresponds to K1 AND K2; Parallel connection corresponds to K1 OR K2',
      'Series connection corresponds to K1 OR K2; Parallel connection corresponds to K1 AND K2',
      'Both wiring configurations correspond to XOR',
      'Series connection corresponds to NOT; Parallel connection corresponds to AND'
    ],
    correctIndex: 0,
    explanationVi: 'Theo mục Vận dụng (SGK Trang 27): Mắc nối tiếp cần cả K1 và K2 cùng đóng thì đèn mới sáng ➔ Đèn = K1 AND K2. Mắc song song chỉ cần một trong hai công tắc đóng là đèn sáng ➔ Đèn = K1 OR K2.',
    explanationEn: 'According to SGK Page 27 Application: Switches in series require both closed for current to flow (K1 AND K2). Switches in parallel require either one closed (K1 OR K2).'
  }
];
