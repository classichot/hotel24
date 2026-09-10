"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

const FOUNDATION = [
  { href: "/agi", en: "Layer", th: "ชั้นนี้" },
  { href: "/agi-connect", en: "Connect", th: "ต่อบอท" },
  { href: "/agi-knowledge", en: "Knowledge", th: "ความรู้โรงแรม" },
  { href: "/agi-context", en: "Live context", th: "บริบทสด" },
  { href: "/agi-missions", en: "Missions", th: "ภารกิจ" },
  { href: "/agi-tools", en: "Tools", th: "เครื่องมือ" },
  { href: "/agi-autonomy", en: "Autonomy", th: "อำนาจ" },
  { href: "/agi-monitor", en: "Monitor", th: "เฝ้า" },
  { href: "/agi-record", en: "Work record", th: "สมุดงาน" },
];

const WOW = [
  { href: "/agi-demo", en: "Sales demo", th: "เดโมขาย" },
  { href: "/agi-gm", en: "Weekend GM", th: "GM สุดสัปดาห์" },
  { href: "/agi-revenue", en: "Revenue mission", th: "ภารกิจรายได้" },
  { href: "/agi-direct", en: "Guest bot", th: "บอทแขก" },
  { href: "/agi-recover", en: "Recovery", th: "กู้ห้อง" },
  { href: "/agi-group", en: "Group desk", th: "โต๊ะกรุ๊ป" },
  { href: "/agi-sim", en: "Simulate", th: "จำลอง" },
];

export function AgiNav() {
  const path = usePathname();
  const { agiOn } = useStore();
  const tabs = agiOn ? [...FOUNDATION, ...WOW] : FOUNDATION.slice(0, 1);
  return (
    <div className="dist-nav agi-nav">
      {tabs.map((t) => (
        <Link key={t.href} href={t.href} className={path === t.href ? "on" : ""}>
          <T en={t.en} th={t.th} />
        </Link>
      ))}
    </div>
  );
}

export function AgiOffGate() {
  const { setAgiOn } = useStore();
  return (
    <div className="agi-gate">
      <div className="page-kicker"><T en="AGI Mode is off" th="โหมด AGI ปิดอยู่" /></div>
      <h3><T en="This layer is dark." th="ชั้นนี้ปิดไฟ" /></h3>
      <p>
        <T
          en="Normal AI still helps you tap Approve inside HOTEL24. AGI Mode is the separate layer where Grok, Claude or ChatGPT receives an objective, works across modules, and reports. Turn it on to test connections and run missions."
          th="AI ปกติยังช่วยคุณกดอนุมัติใน HOTEL24 โหมด AGI คือชั้นแยก ที่ Grok Claude หรือ ChatGPT รับวัตถุประสงค์ ทำงานข้ามโมดูล แล้วรายงาน เปิดเพื่อทดสอบการต่อและรันภารกิจ"
        />
      </p>
      <button type="button" className="btn btn-primary" onClick={() => setAgiOn(true)}>
        <T en="Turn AGI Mode on" th="เปิดโหมด AGI" />
      </button>
    </div>
  );
}

export function AgiShell({ children, locked = true }: { children: React.ReactNode; locked?: boolean }) {
  const { agiOn, agiPaused } = useStore();
  return (
    <div className={`agi-layer${agiOn ? " on" : ""}${agiPaused ? " paused" : ""}`}>
      <AgiNav />
      {locked && !agiOn ? <AgiOffGate /> : children}
    </div>
  );
}
