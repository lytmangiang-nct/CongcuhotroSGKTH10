export interface AsciiEntry {
  dec: number;
  hex: string;
  bin: string;
  highNibble: string;
  lowNibble: string;
  display: string;
  nameVi: string;
  nameEn: string;
  category: 'control' | 'printable' | 'extended';
  descriptionVi?: string;
}

// 256-cell Extended ASCII Table matching Textbook Page 165 (Bảng mã ASCII mở rộng)
const CONTROL_LABELS: Record<number, { display: string; nameVi: string; nameEn: string }> = {
  0: { display: 'NULL', nameVi: 'Kí tự rỗng (Null)', nameEn: 'Null character' },
  1: { display: 'SOH', nameVi: 'Bắt đầu tiêu đề (Start of Header)', nameEn: 'Start of Heading' },
  2: { display: 'STX', nameVi: 'Bắt đầu văn bản (Start of Text)', nameEn: 'Start of Text' },
  3: { display: 'ETX', nameVi: 'Kết thúc văn bản (End of Text)', nameEn: 'End of Text' },
  4: { display: 'EOT', nameVi: 'Kết thúc truyền (End of Transmission)', nameEn: 'End of Transmission' },
  5: { display: 'ENQ', nameVi: 'Hỏi đáp (Enquiry)', nameEn: 'Enquiry' },
  6: { display: 'ACK', nameVi: 'Xác nhận (Acknowledge)', nameEn: 'Acknowledge' },
  7: { display: 'BELL', nameVi: 'Chuông báo (Bell)', nameEn: 'Bell' },
  8: { display: 'BS', nameVi: 'Lùi một kí tự (Backspace)', nameEn: 'Backspace' },
  9: { display: 'HT', nameVi: 'Tab ngang (Horizontal Tab)', nameEn: 'Horizontal Tab' },
  10: { display: 'LF', nameVi: 'Xuống dòng (Line Feed)', nameEn: 'Line Feed' },
  11: { display: 'VT', nameVi: 'Tab dọc (Vertical Tab)', nameEn: 'Vertical Tab' },
  12: { display: 'FF', nameVi: 'Đầu trang mới (Form Feed)', nameEn: 'Form Feed' },
  13: { display: 'CR', nameVi: 'Về đầu dòng (Carriage Return)', nameEn: 'Carriage Return' },
  14: { display: 'SO', nameVi: 'Chuyển ngoài (Shift Out)', nameEn: 'Shift Out' },
  15: { display: 'SI', nameVi: 'Chuyển trong (Shift In)', nameEn: 'Shift In' },
  16: { display: 'DLE', nameVi: 'Thoát liên kết dữ liệu (Data Link Escape)', nameEn: 'Data Link Escape' },
  17: { display: 'DC1', nameVi: 'Điều khiển thiết bị 1 (Device Control 1)', nameEn: 'Device Control 1' },
  18: { display: 'DC2', nameVi: 'Điều khiển thiết bị 2 (Device Control 2)', nameEn: 'Device Control 2' },
  19: { display: 'DC3', nameVi: 'Điều khiển thiết bị 3 (Device Control 3)', nameEn: 'Device Control 3' },
  20: { display: 'DC4', nameVi: 'Điều khiển thiết bị 4 (Device Control 4)', nameEn: 'Device Control 4' },
  21: { display: 'NAK', nameVi: 'Phủ nhận (Negative Acknowledge)', nameEn: 'Negative Acknowledge' },
  22: { display: 'SYN', nameVi: 'Nhàn đồng bộ (Synchronous Idle)', nameEn: 'Synchronous Idle' },
  23: { display: 'ETB', nameVi: 'Kết thúc khối truyền (End of Trans. Block)', nameEn: 'End of Trans. Block' },
  24: { display: 'CAN', nameVi: 'Huỷ bỏ (Cancel)', nameEn: 'Cancel' },
  25: { display: 'EM', nameVi: 'Kết thúc môi trường (End of Medium)', nameEn: 'End of Medium' },
  26: { display: 'SUB', nameVi: 'Thay thế (Substitute)', nameEn: 'Substitute' },
  27: { display: 'ESC', nameVi: 'Thoát (Escape)', nameEn: 'Escape' },
  28: { display: 'FS', nameVi: 'Ngăn cách tệp (File Separator)', nameEn: 'File Separator' },
  29: { display: 'GS', nameVi: 'Ngăn cách nhóm (Group Separator)', nameEn: 'Group Separator' },
  30: { display: 'RS', nameVi: 'Ngăn cách bản ghi (Record Separator)', nameEn: 'Record Separator' },
  31: { display: 'US', nameVi: 'Ngăn cách đơn vị (Unit Separator)', nameEn: 'Unit Separator' },
  127: { display: 'DEL', nameVi: 'Xoá (Delete)', nameEn: 'Delete' }
};

// SGK Page 165 exact character table mapping (Codes 128 to 255)
const EXTENDED_CHARS_SGK: Record<number, string> = {
  128: 'Ç', 129: 'ü', 130: 'é', 131: 'â', 132: 'ä', 133: 'à', 134: 'å', 135: 'ç',
  136: 'ê', 137: 'ë', 138: 'è', 139: 'ï', 140: 'î', 141: 'ì', 142: 'Ä', 143: 'Å',
  144: 'É', 145: 'æ', 146: 'Æ', 147: 'ô', 148: 'ö', 149: 'ò', 150: 'û', 151: 'ù',
  152: 'ÿ', 153: 'Ö', 154: 'Ü', 155: 'ø', 156: '£', 157: 'Ø', 158: '×', 159: 'ƒ',
  160: 'á', 161: 'í', 162: 'ó', 163: 'ú', 164: 'ñ', 165: 'Ñ', 166: 'ª', 167: 'º',
  168: '¿', 169: '®', 170: '¬', 171: '½', 172: '¼', 173: '¡', 174: '«', 175: '»',
  176: '░', 177: '▒', 178: '▓', 179: '│', 180: '┤', 181: 'Á', 182: 'Â', 183: 'À',
  184: '©', 185: '╣', 186: '║', 187: '╗', 188: '╝', 189: '¢', 190: '¥', 191: '┐',
  192: '└', 193: '┴', 194: '┬', 195: '├', 196: '─', 197: '┼', 198: 'ã', 199: 'Ã',
  200: '╚', 201: '╔', 202: '╩', 203: '╦', 204: '╠', 205: '═', 206: '╬', 207: '¤',
  208: 'ð', 209: 'Ð', 210: 'Ê', 211: 'Ë', 212: 'È', 213: 'ı', 214: 'Í', 215: 'Î',
  216: 'Ï', 217: '┘', 218: '┌', 219: '█', 220: '▄', 221: '¦', 222: 'Ì', 223: '▀',
  224: 'Ó', 225: 'ß', 226: 'Ô', 227: 'Ò', 228: 'õ', 229: 'Õ', 230: 'µ', 231: 'þ',
  232: 'Þ', 233: 'Ú', 234: 'Û', 235: 'Ù', 236: 'ý', 237: 'Ý', 238: '¯', 239: '´',
  240: '≡', 241: '±', 242: '‗', 243: '¾', 244: '¶', 245: '§', 246: '÷', 247: '¸',
  248: '°', 249: '¨', 250: '·', 251: '¹', 252: '³', 253: '²', 254: '■', 255: ' '
};

export const NIBBLES = [
  '0000', '0001', '0010', '0011',
  '0100', '0101', '0110', '0111',
  '1000', '1001', '1010', '1011',
  '1100', '1101', '1110', '1111'
];

export const EXTENDED_ASCII_TABLE: AsciiEntry[] = Array.from({ length: 256 }, (_, i) => {
  const dec = i;
  const hex = dec.toString(16).toUpperCase().padStart(2, '0');
  const bin = dec.toString(2).padStart(8, '0');
  const highNibble = bin.slice(0, 4);
  const lowNibble = bin.slice(4, 8);

  if (CONTROL_LABELS[dec]) {
    const item = CONTROL_LABELS[dec];
    return {
      dec,
      hex,
      bin,
      highNibble,
      lowNibble,
      display: item.display,
      nameVi: item.nameVi,
      nameEn: item.nameEn,
      category: 'control',
      descriptionVi: `Kí tự điều khiển hệ thống (Control Code #${dec}). Dùng trong truyền tin, ngắt dòng, báo hiệu phần cứng.`
    };
  }

  if (dec >= 32 && dec <= 126) {
    const char = dec === 32 ? 'SPACE' : String.fromCharCode(dec);
    return {
      dec,
      hex,
      bin,
      highNibble,
      lowNibble,
      display: char,
      nameVi: dec === 32 ? 'Dấu cách (Space)' : `Kí tự chuẩn '${char}'`,
      nameEn: dec === 32 ? 'Space character' : `Standard character '${char}'`,
      category: 'printable',
      descriptionVi: `Kí tự in được chuẩn ASCII 7-bit cơ bản. Python: ord('${dec === 32 ? ' ' : char}') = ${dec}.`
    };
  }

  // Extended ASCII (128-255)
  const char = EXTENDED_CHARS_SGK[dec] || String.fromCharCode(dec);
  return {
    dec,
    hex,
    bin,
    highNibble,
    lowNibble,
    display: char,
    nameVi: `Kí tự mở rộng '${char}'`,
    nameEn: `Extended ASCII character '${char}'`,
    category: 'extended',
    descriptionVi: `Bảng mã ASCII mở rộng 8-bit (SGK Trang 165). Dùng cho kí tự có dấu châu Âu, kí tự vẽ khung (Box drawing), và kí hiệu toán học.`
  };
});
