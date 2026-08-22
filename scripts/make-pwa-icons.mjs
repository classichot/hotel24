/** Generate HOTEL24 PWA PNGs (no extra deps). */
import { deflateSync } from "zlib";
import { mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const INK = [32, 30, 29, 255];
const RED = [207, 27, 23, 255];
const PAPER = [248, 244, 244, 255];

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  return ~c >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const t = Buffer.from(type);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([t, data])));
  return Buffer.concat([len, t, data, crc]);
}

function png(w, h, pixel) {
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (w * 4 + 1)] = 0;
    for (let x = 0; x < w; x++) {
      const [r, g, b, a] = pixel(x, y);
      const o = y * (w * 4 + 1) + 1 + x * 4;
      raw[o] = r;
      raw[o + 1] = g;
      raw[o + 2] = b;
      raw[o + 3] = a;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function fill(set, x0, y0, x1, y1, color) {
  const xa = Math.max(0, Math.round(Math.min(x0, x1)));
  const xb = Math.round(Math.max(x0, x1));
  const ya = Math.max(0, Math.round(Math.min(y0, y1)));
  const yb = Math.round(Math.max(y0, y1));
  for (let y = ya; y < yb; y++) {
    for (let x = xa; x < xb; x++) set(x, y, color);
  }
}

function paintMark(size, { bg, fg, accent, pad = 0.22, mark = true }) {
  const grid = Array.from({ length: size * size }, () => bg);
  const set = (x, y, color) => {
    if (x < 0 || y < 0 || x >= size || y >= size) return;
    grid[y * size + x] = color;
  };
  const p = size * pad;
  const bar = size * 0.145;
  const gap = size * 0.22;
  const left = p;
  const right = p + bar + gap;
  const top = p;
  const bot = size - p;
  const midY = size * 0.45;
  const midH = size * 0.12;
  fill(set, left, top, left + bar, bot, fg);
  fill(set, right, top, right + bar, bot, fg);
  fill(set, left, midY, right + bar, midY + midH, fg);
  if (mark) {
    const s = size * 0.155;
    const m = size * 0.09;
    fill(set, size - m - s, m, size - m, m + s, accent);
  }
  return (x, y) => grid[y * size + x];
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
mkdirSync(join(root, "icons"), { recursive: true });

const standard = (size) => png(size, size, paintMark(size, { bg: INK, fg: PAPER, accent: RED, pad: 0.22, mark: true }));
const maskable = (size) => png(size, size, paintMark(size, { bg: RED, fg: PAPER, accent: RED, pad: 0.28, mark: false }));

writeFileSync(join(root, "icons", "icon-192.png"), standard(192));
writeFileSync(join(root, "icons", "icon-512.png"), standard(512));
writeFileSync(join(root, "icons", "maskable-512.png"), maskable(512));
writeFileSync(join(root, "apple-touch-icon.png"), standard(180));
writeFileSync(join(root, "icons", "icon.svg"), `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#201e1d"/>
  <rect x="22" y="3" width="7" height="7" fill="#cf1b17"/>
  <rect x="7" y="7" width="4.4" height="18" fill="#f8f4f4"/>
  <rect x="16.6" y="7" width="4.4" height="18" fill="#f8f4f4"/>
  <rect x="7" y="14.2" width="14" height="3.6" fill="#f8f4f4"/>
</svg>
`);

console.log("Wrote PWA icons to public/icons and apple-touch-icon.png");
