"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BedDouble,
  CalendarDays,
  Check,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Shield,
  Sparkles,
  X,
} from "lucide-react";
import { FRONT_USER, OWNER, PROPERTIES, TODAY, TODAY_TH } from "@/lib/model";
import { pendingCount } from "@/lib/ai";
import { pendingRev } from "@/lib/revenueos";
import { useStore } from "@/lib/store";
import { ScreenPlaybook } from "@/components/Playbook";
import { LangToggle } from "@/components/LangToggle";
import { ModeToggle } from "@/components/ModeToggle";
import { T, pick } from "@/lib/i18n";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

const NAV = [
  {
    group: { en: "Agent Direct", th: "Agent Direct" },
    items: [
      { href: "/agent-direct", en: "AI identity", th: "ตัวตน AI" },
      { href: "/gateway", en: "Agent Gateway", th: "เกตเวย์เอเจนต์" },
      { href: "/registry", en: "AI Registry", th: "ทะเบียน AI" },
      { href: "/agent-offers", en: "Direct Offers", th: "ข้อเสนอตรง" },
      { href: "/aeo", en: "AEO", th: "AEO" },
      { href: "/hap", en: "HAP spec", th: "สเปก HAP" },
    ],
  },
  {
    group: { en: "RevenueOS", th: "RevenueOS" },
    items: [
      { href: "/rev-engines", en: "Phase 1 · 8 engines", th: "เฟส 1 · 8 เครื่องยนต์" },
      { href: "/rev-phase2", en: "Phase 2 · 8 engines", th: "เฟส 2 · 8 เครื่องยนต์" },
      { href: "/revenue-os", en: "Director", th: "ผู้อำนวยการ" },
      { href: "/rev-demand", en: "Demand Brain", th: "สมองดีมานด์" },
      { href: "/rev-pricing", en: "Price Brain", th: "สมองราคา" },
      { href: "/rev-inventory", en: "Inventory Brain", th: "สมองห้อง" },
      { href: "/rev-distribution", en: "Distribution Brain", th: "สมองช่องทาง" },
      { href: "/rev-guardian", en: "Guardian", th: "ผู้พิทักษ์" },
      { href: "/rev-twin", en: "Digital Twin", th: "ฝาแฝดดิจิทัล" },
      { href: "/rev-decisions", en: "Decision ledger", th: "สมุดตัดสิน" },
    ],
  },
  {
    group: { en: "AI", th: "AI" },
    items: [
      { href: "/gm", en: "AI General Manager", th: "GM อัตโนมัติ" },
      { href: "/autopilot", en: "Revenue Autopilot", th: "ออโตไพลอตรายได้" },
      { href: "/agent", en: "Guest Agent", th: "เอเจนต์แขก" },
      { href: "/reconcile", en: "OTA Reconcile", th: "กระทบยอด OTA" },
      { href: "/reputation", en: "Reputation Ops", th: "รีวิว → ปฏิบัติการ" },
      { href: "/migrate", en: "Migration Agent", th: "เอเจนต์ย้ายระบบ" },
      { href: "/line", en: "Morning Brief", th: "สรุปเช้า + ปุ่ม" },
    ],
  },
  {
    group: { en: "Operate", th: "หน้างาน" },
    items: [
      { href: "/reservations", en: "Reservations", th: "ปฏิทินการจอง" },
      { href: "/front-desk", en: "Front Desk", th: "เช็คอิน–เช็คเอาท์" },
      { href: "/housekeeping", en: "Housekeeping", th: "แม่บ้าน" },
      { href: "/inbox", en: "Guest Inbox", th: "กล่องข้อความแขก" },
    ],
  },
  {
    group: { en: "Revenue", th: "รายได้" },
    items: [
      { href: "/rates", en: "Rate & AI Revenue", th: "ราคาห้อง & AI" },
      { href: "/profit", en: "OTA Profit", th: "กำไรจริงต่อช่องทาง" },
      { href: "/direct", en: "Direct Booking", th: "จองตรง" },
    ],
  },
  {
    group: { en: "Distribution", th: "กระจายห้อง" },
    items: [
      { href: "/channels", en: "Connection Center", th: "ศูนย์ช่องทาง" },
      { href: "/mapping", en: "OTA Mapping", th: "จับคู่ OTA" },
      { href: "/inventory", en: "Inventory & ARI", th: "ห้องคงเหลือ & ARI" },
      { href: "/sync", en: "OTA Sync", th: "ซิงก์ OTA" },
    ],
  },
  {
    group: { en: "Oversight", th: "เจ้าของกิจการ" },
    items: [
      { href: "/dashboard", en: "Owner Dashboard", th: "ภาพรวมเจ้าของ" },
      { href: "/playbook", en: "Playbook", th: "เพลย์บุ๊ก" },
      { href: "/compliance", en: "Compliance TM30", th: "TM30 & PDPA" },
      { href: "/finance", en: "Finance", th: "เงินสดและใบเสร็จ" },
      { href: "/switch", en: "Switch from PMS", th: "ย้ายจากระบบเดิม" },
    ],
  },
];

const TABS = [
  { href: "/gm", label: "GM", icon: Sparkles },
  { href: "/reservations", label: "Cal", icon: CalendarDays },
  { href: "/front-desk", label: "Desk", icon: BedDouble },
  { href: "/inbox", label: "Inbox", icon: MessageSquare },
  { href: "/dashboard", label: "Owner", icon: LayoutDashboard },
];

function isActive(path: string, href: string) {
  return path === href || path.startsWith(href + "/");
}

export function AppShell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const {
    logout, toast, navOpen, setNavOpen, lang, role, propertyId, setPropertyId,
    search, setSearch, aiMode, recState, shieldClosed, switchStatus, otaChannels, aiState, agentReady, revState,
  } = useStore();
  const user = role === "front" || role === "housekeeping" ? FRONT_USER : OWNER;
  const property = PROPERTIES.find((p) => p.id === propertyId) ?? PROPERTIES[0];
  const [picker, setPicker] = useState(false);
  const pending = Object.values(recState).filter((s) => s === "applied").length;
  const shieldOpen = !shieldClosed.s1;
  const otaWarn = otaChannels.some((c) => c.pendingUpdates > 0 || (c.status === "connected" && c.health < 100) || c.status === "paused");
  const gmOpen = pendingCount(aiState);

  useEffect(() => { setNavOpen(false); }, [path, setNavOpen]);

  return (
    <div className="shell">
      <div className={`sidebar-backdrop${navOpen ? " open" : ""}`} onClick={() => setNavOpen(false)} />
      <aside className={`sidebar ink-sidebar${navOpen ? " open" : ""}`}>
        <div className="ink-brand">
          <div>
            <div className="ink-mark">HOTEL<span>24</span></div>
            <div className="ink-kicker">AI Hotel Operating System</div>
            <div className="ink-kicker" style={{ opacity: 0.45 }}>VIBE24 series</div>
          </div>
          <button className="icon-btn menu-btn ink-icon" onClick={() => setNavOpen(false)} aria-label="Close menu"><X size={18} /></button>
        </div>
        <div className="ink-start">
          <div className="ink-start-kicker"><T en="Start here" th="เริ่มที่นี่" /></div>
          <Link href="/switch" className="btn btn-start btn-block" onClick={() => setNavOpen(false)}>
            <span className="btn-start-mark" aria-hidden>→</span>
            {switchStatus === "done"
              ? <T en="PMS switched" th="ย้ายระบบแล้ว" />
              : <T en="Switch to HOTEL24" th="ย้ายมา HOTEL24" />}
          </Link>
        </div>
        <nav style={{ flex: 1, overflow: "auto", padding: "8px 0" }}>
          {NAV.map((g) => (
            <div key={g.group.en}>
              <div className="ink-group">{pick(lang, g.group)}</div>
              {g.items.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setNavOpen(false)} className={`ink-nav${isActive(path, item.href) ? " active" : ""}`}>
                  <span className="ink-bar" />
                  <span>
                    <span className="ink-en">{item.en}</span>
                    <span className="ink-th">{item.th}</span>
                  </span>
                  {item.href === "/rates" && pending < 3 && aiMode === "recommend" && <span className="ink-dot" />}
                  {item.href === "/gm" && gmOpen > 0 && <span className="ink-dot" />}
                  {item.href === "/agent-direct" && !agentReady && <span className="ink-dot" />}
                  {item.href === "/revenue-os" && pendingRev(revState).length > 0 && <span className="ink-dot" />}
                  {item.href === "/line" && pendingCount(aiState, "brief") > 0 && <span className="ink-dot" />}
                  {item.href === "/channels" && (shieldOpen || otaWarn) && <span className="ink-dot" />}
                  {item.href === "/sync" && otaWarn && <span className="ink-dot" />}
                  {item.href === "/switch" && switchStatus !== "done" && <span className="ink-dot" />}
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <div className="ink-foot">
          Connectivity: white-label · 61+ channels<br />Agent Direct · RevenueOS · hotel owns the guest
        </div>
      </aside>

      <div className="shell-main">
        <header className="topbar">
          <button className="icon-btn menu-btn" onClick={() => setNavOpen(true)} aria-label="Open menu"><Menu size={20} /></button>
          <div className="prop-switch" style={{ position: "relative" }}>
            <button type="button" className="prop-btn" onClick={() => setPicker((v) => !v)}>
              <span className="prop-dot" />
              <span>
                <strong>{lang === "th" ? property.nameTh : property.name}</strong>
                <span>{lang === "th" ? `${property.locTh} · ${property.rooms} ห้อง · 3 properties` : `${property.loc} · ${property.rooms} rooms · 3 properties`}</span>
              </span>
              <span style={{ opacity: 0.5, fontSize: 11 }}>▾</span>
            </button>
            {picker && (
              <div className="prop-menu">
                {PROPERTIES.map((p) => (
                  <button key={p.id} type="button" onClick={() => { setPropertyId(p.id); setPicker(false); }}>
                    <strong>{lang === "th" ? p.nameTh : p.name}</strong>
                    <span>{p.occ}% occ · ADR ฿{p.adr.toLocaleString()}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="topbar-date header-hide-sm"><T en={TODAY} th={TODAY_TH} /></div>
          <div className="header-actions" style={{ marginLeft: "auto" }}>
            <span className="tag tag-neutral header-hide-sm" style={{ gap: 6 }}>
              <span style={{ width: 6, height: 6, background: "var(--color-accent-700)", display: "inline-block" }} />
              {otaWarn
                ? <T en="OTA sync needs attention" th="ซิงก์ OTA ต้องตรวจ" />
                : <T en="All channels synced · 2 min" th="ซิงก์ทุกช่องทาง · 2 นาที" />}
            </span>
            <span className="tag tag-accent header-hide-sm">AI: {aiMode === "auto" ? "auto-apply" : "recommend"}</span>
            <input className="input header-hide-sm" type="search" placeholder={lang === "th" ? "ค้นหาการจอง แขก ห้อง…" : "Search reservation, guest, room…"} value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: 220 }} />
            <LangToggle />
            <ModeToggle compact />
            <span className="avatar">{user.initials}</span>
            <button title="Sign out" className="icon-btn" onClick={() => { logout(); router.push("/login"); }}><LogOut size={16} /></button>
          </div>
        </header>
        <main className="page-main">
          <ScreenPlaybook />
          {children}
        </main>
      </div>

      <nav className="bottom-nav no-print">
        {TABS.map((t) => {
          const Icon = t.icon;
          return (
            <Link key={t.href} href={t.href} className={isActive(path, t.href) ? "active" : ""}>
              <Icon size={18} />
              {t.label}
            </Link>
          );
        })}
      </nav>
      {toast && (
        <div className="toast">
          <Check size={16} color="var(--color-accent-400)" />
          {toast}
        </div>
      )}
      {shieldOpen && path !== "/channels" && path !== "/mapping" && (
        <Link href="/channels" className="shield-fab no-print">
          <Shield size={14} />
          <T en="Overbooking Shield · 1 high" th="ป้องกันขายเกิน · 1 สูง" />
        </Link>
      )}
    </div>
  );
}
