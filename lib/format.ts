export function thb(n: number, compact = false) {
  const abs = Math.abs(n);
  const sign = n < 0 ? "−" : "";
  if (compact) {
    if (abs >= 1_000_000) {
      const m = abs / 1_000_000;
      return `${sign}฿${m >= 10 ? m.toFixed(2) : m.toFixed(2)}M`;
    }
    if (abs >= 1_000) return `${sign}฿${Math.round(abs / 1000)}K`;
  }
  return `${sign}฿${abs.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

export function F(v: number, dashZero = false) {
  if (v === 0 && dashZero) return "—";
  const n = Math.round(Math.abs(v)).toLocaleString("en-US");
  return v < 0 ? `(${n})` : n;
}

export function pct(n: number, digits = 1) {
  return `${(n * 100).toFixed(digits)}%`;
}

export type ThemeKey = "light" | "dark" | "bw";

const LIGHT = {
  "--color-bg": "#f3f2f2",
  "--color-surface": "#eae9e9",
  "--color-text": "#201e1d",
  "--color-divider": "color-mix(in srgb, #201e1d 40%, transparent)",
  "--color-accent": "#ffdc2e",
  "--color-accent-100": "#fffce8",
  "--color-accent-200": "#fff6b8",
  "--color-accent-300": "#ffec7a",
  "--color-accent-400": "#ffe24a",
  "--color-accent-500": "#ffdc2e",
  "--color-accent-600": "#ffd000",
  "--color-accent-700": "#8a7200",
  "--color-accent-800": "#6b5800",
  "--color-accent-900": "#403400",
  "--color-neutral-100": "#f8f4f4",
  "--color-neutral-200": "#eae7e7",
  "--color-neutral-300": "#d7d3d3",
  "--color-neutral-400": "#bab6b6",
  "--color-neutral-500": "#9b9797",
  "--color-neutral-600": "#7d7979",
  "--color-neutral-700": "#605d5d",
  "--color-neutral-800": "#444141",
  "--color-neutral-900": "#2d2b2b",
  "--color-hot": "#ff6a3c",
  "--color-hot-700": "#b33a16",
  "--color-warn": "#8a5a00",
  "--color-ok": "#1aa35c",
  "--sig-red": "#ff6a3c",
  "--sig-amber": "#8a5a00",
  "--color-signal": "#ffdc2e",
  "--color-signal-200": "color-mix(in oklab, #ffdc2e 18%, #f3f2f2)",
  "--color-signal-400": "color-mix(in oklab, #ffdc2e 48%, #f3f2f2)",
  "--color-signal-700": "#8a7200",
  "--color-on-accent": "#201e1d",
  "--color-on-hot": "#201e1d",
  "--color-ink": "#201e1d",
  "--color-paper": "#f8f4f4",
  "--shadow-md": "0 3px 10px color-mix(in srgb, #2d2b2b 16%, transparent)",
  "--shadow-lg": "0 12px 32px color-mix(in srgb, #2d2b2b 22%, transparent)",
};

export const THEMES = {
  light: { name: "Light", scheme: "light", vars: LIGHT },
  dark: {
    name: "Dark",
    scheme: "dark",
    vars: {
      "--color-bg": "#161413",
      "--color-surface": "#1e1c1b",
      "--color-text": "#f8f4f4",
      "--color-divider": "color-mix(in srgb, #f8f4f4 20%, transparent)",
      "--color-accent": "#ffe24a",
      "--color-accent-100": "#2a2610",
      "--color-accent-200": "#3d3614",
      "--color-accent-300": "#8a7200",
      "--color-accent-400": "#ffd000",
      "--color-accent-500": "#ffdc2e",
      "--color-accent-600": "#fff6b8",
      "--color-accent-700": "#fff6b8",
      "--color-accent-800": "#fffce8",
      "--color-accent-900": "#fffef5",
      "--color-neutral-100": "#1e1c1b",
      "--color-neutral-200": "#262322",
      "--color-neutral-300": "#3a3736",
      "--color-neutral-400": "#555151",
      "--color-neutral-500": "#7d7979",
      "--color-neutral-600": "#bab6b6",
      "--color-neutral-700": "#d7d3d3",
      "--color-neutral-800": "#eae7e7",
      "--color-neutral-900": "#f8f4f4",
      "--color-hot": "#ff8f6a",
      "--color-hot-700": "#ffbda6",
      "--color-warn": "#f7b52a",
      "--color-ok": "#3ee87a",
      "--sig-red": "#ff8f6a",
      "--sig-amber": "#f7b52a",
      "--color-signal": "#ffe24a",
      "--color-signal-200": "color-mix(in oklab, #ffe24a 22%, #161413)",
      "--color-signal-400": "color-mix(in oklab, #ffe24a 50%, #161413)",
      "--color-signal-700": "#fff6b8",
      "--color-on-accent": "#201e1d",
      "--color-on-hot": "#201e1d",
      "--color-ink": "#f8f4f4",
      "--color-paper": "#201e1d",
      "--shadow-md": "0 3px 10px color-mix(in srgb, #000 40%, transparent)",
      "--shadow-lg": "0 12px 32px color-mix(in srgb, #000 50%, transparent)",
    },
  },
  bw: {
    name: "B/W",
    scheme: "light",
    vars: {
      "--color-bg": "#ffffff",
      "--color-surface": "#f3f3f3",
      "--color-text": "#111111",
      "--color-divider": "color-mix(in srgb, #111111 22%, transparent)",
      "--color-accent": "#111111",
      "--color-accent-100": "#f2f2f2",
      "--color-accent-200": "#e4e4e4",
      "--color-accent-300": "#c8c8c8",
      "--color-accent-400": "#9a9a9a",
      "--color-accent-500": "#6a6a6a",
      "--color-accent-600": "#2c2c2c",
      "--color-accent-700": "#1a1a1a",
      "--color-accent-800": "#111111",
      "--color-accent-900": "#000000",
      "--color-neutral-100": "#f7f7f7",
      "--color-neutral-200": "#ececec",
      "--color-neutral-300": "#d6d6d6",
      "--color-neutral-400": "#b3b3b3",
      "--color-neutral-500": "#8f8f8f",
      "--color-neutral-600": "#6e6e6e",
      "--color-neutral-700": "#525252",
      "--color-neutral-800": "#333333",
      "--color-neutral-900": "#111111",
      "--color-hot": "#000000",
      "--color-warn": "#6e6e6e",
      "--color-ok": "#111111",
      "--sig-red": "#000000",
      "--sig-amber": "#6e6e6e",
      "--color-signal": "#111111",
      "--color-signal-200": "#ececec",
      "--color-signal-400": "#b3b3b3",
      "--color-signal-700": "#111111",
      "--color-on-accent": "#ffffff",
      "--color-ink": "#111111",
      "--color-paper": "#ffffff",
      "--shadow-md": "0 3px 10px color-mix(in srgb, #111 16%, transparent)",
      "--shadow-lg": "0 12px 32px color-mix(in srgb, #111 22%, transparent)",
    },
  },
} as const;

export function normalizeTheme(v: string | null): ThemeKey {
  if (v === "dark" || v === "bw" || v === "light") return v;
  return "light";
}
