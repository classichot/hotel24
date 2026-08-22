"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { T } from "@/lib/i18n";

const TABS = [
  { href: "/rev-engines", en: "8 engines", th: "8 เครื่องยนต์" },
  { href: "/rev-phase2", en: "Phase 2", th: "เฟส 2" },
  { href: "/revenue-os", en: "Director", th: "ผู้อำนวยการ" },
  { href: "/rev-demand", en: "Demand", th: "ดีมานด์" },
  { href: "/rev-pricing", en: "Price", th: "ราคา" },
  { href: "/rev-inventory", en: "Inventory", th: "ห้อง" },
  { href: "/rev-distribution", en: "Distribution", th: "ช่องทาง" },
  { href: "/rev-guardian", en: "Guardian", th: "รั้ว" },
  { href: "/rev-twin", en: "Digital Twin", th: "ฝาแฝด" },
  { href: "/rev-decisions", en: "Ledger", th: "สมุดตัดสิน" },
];

const PHASE2 = ["/rev-phase2", "/rev-cancel", "/rev-overbook", "/rev-elasticity", "/rev-group", "/rev-alloc", "/rev-promo", "/rev-convert", "/rev-attribution"];

export function RevenueNav() {
  const path = usePathname();
  return (
    <div className="dist-nav">
      {TABS.map((t) => {
        const on = t.href === "/rev-phase2" ? PHASE2.includes(path) : path === t.href;
        return (
          <Link key={t.href} href={t.href} className={on ? "on" : ""}>
            <T en={t.en} th={t.th} />
          </Link>
        );
      })}
    </div>
  );
}
