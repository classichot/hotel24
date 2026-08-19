"use client";

import { useStore } from "@/lib/store";

export function LangToggle() {
  const { lang, setLang } = useStore();
  return (
    <div className="seg" role="group" aria-label="Language">
      {([
        { id: "en" as const, label: "EN" },
        { id: "th" as const, label: "ไทย" },
      ]).map((o) => (
        <label key={o.id} className="seg-opt">
          <input type="radio" name="lang" checked={lang === o.id} onChange={() => setLang(o.id)} />
          <span>{o.label}</span>
        </label>
      ))}
    </div>
  );
}
