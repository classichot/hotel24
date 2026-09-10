"use client";

import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export function AgiToggle({ compact = false }: { compact?: boolean }) {
  const { agiOn, setAgiOn } = useStore();
  return (
    <div className={`seg agi-toggle${compact ? " compact" : ""}`} role="group" aria-label="AGI Mode">
      <button type="button" className={`seg-opt${!agiOn ? " on" : ""}`} onClick={() => setAgiOn(false)}>
        <span><T en="AGI off" th="ปิด AGI" /></span>
      </button>
      <button type="button" className={`seg-opt${agiOn ? " on" : ""}`} onClick={() => setAgiOn(true)}>
        <span><T en="AGI Mode" th="โหมด AGI" /></span>
      </button>
    </div>
  );
}
