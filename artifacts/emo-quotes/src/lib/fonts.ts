export type FontStyleId = "default" | "fraktur" | "boldFraktur" | "script" | "bold" | "italic" | "monospace";

export interface FontStyleOption {
  id: FontStyleId;
  label: string;
  preview: string;
}

const ranges = {
  upper: { start: 0x41, end: 0x5a },
  lower: { start: 0x61, end: 0x7a },
  digit: { start: 0x30, end: 0x39 },
};

function buildMap(upperStart: number, lowerStart: number, digitStart?: number): Record<string, string> {
  const map: Record<string, string> = {};
  for (let i = 0; i <= 25; i++) {
    map[String.fromCodePoint(ranges.upper.start + i)] = String.fromCodePoint(upperStart + i);
    map[String.fromCodePoint(ranges.lower.start + i)] = String.fromCodePoint(lowerStart + i);
  }
  if (digitStart !== undefined) {
    for (let i = 0; i <= 9; i++) {
      map[String.fromCodePoint(ranges.digit.start + i)] = String.fromCodePoint(digitStart + i);
    }
  }
  return map;
}

const FRAKTUR = buildMap(0x1d504, 0x1d51e);
const FRAKTUR_OVERRIDES: Record<string, string> = {
  C: "ℭ", H: "ℌ", I: "ℑ", R: "ℜ", Z: "ℨ",
};
Object.assign(FRAKTUR, FRAKTUR_OVERRIDES);

const BOLD_FRAKTUR = buildMap(0x1d56c, 0x1d586);
const SCRIPT = buildMap(0x1d4d0, 0x1d4ea);
const BOLD = buildMap(0x1d400, 0x1d41a, 0x1d7ce);
const ITALIC = buildMap(0x1d434, 0x1d44e);
const ITALIC_OVERRIDES: Record<string, string> = { h: "ℎ" };
Object.assign(ITALIC, ITALIC_OVERRIDES);
const MONOSPACE = buildMap(0x1d670, 0x1d68a, 0x1d7f6);

const MAPS: Record<Exclude<FontStyleId, "default">, Record<string, string>> = {
  fraktur: FRAKTUR,
  boldFraktur: BOLD_FRAKTUR,
  script: SCRIPT,
  bold: BOLD,
  italic: ITALIC,
  monospace: MONOSPACE,
};

export function transformText(text: string, style: FontStyleId): string {
  if (style === "default") return text;
  const map = MAPS[style];
  let out = "";
  for (const ch of text) {
    out += map[ch] ?? ch;
  }
  return out;
}

export const FONT_STYLES: FontStyleOption[] = [
  { id: "default", label: "Plain", preview: "Aa" },
  { id: "fraktur", label: "Gothic", preview: transformText("Aa", "fraktur") },
  { id: "boldFraktur", label: "Black Letter", preview: transformText("Aa", "boldFraktur") },
  { id: "script", label: "Script", preview: transformText("Aa", "script") },
  { id: "italic", label: "Italic", preview: transformText("Aa", "italic") },
  { id: "bold", label: "Bold", preview: transformText("Aa", "bold") },
  { id: "monospace", label: "Mono", preview: transformText("Aa", "monospace") },
];
