"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { T } from "@/lib/i18n";

const TABS = [
  { href: "/revenue-os", en: "Director", th: "ผู้อำนวยการ" },
  { href: "/rev-demand", en: "Demand", th: "ดีมานด์" },
  { href: "/rev-pricing", en: "Price", th: "ราคา" },
  { href: "/rev-inventory", en: "Inventory", th: "ห้อง" },
  { href: "/rev-distribution", en: "Distribution", th: "ช่องทาง" },
  { href: "/rev-guardian", en: "Guardian", th: "รั้ว" },
  { href: "/rev-twin", en: "Digital Twin", th: "ฝาแฝด" },
  { href: "/rev-decisions", en: "Ledger", th: "สมุดตัดสิน" },
];

export function RevenueNav() {
  const path = usePathname();
  return (
    <div className="dist-nav">
      {TABS.map((t) => (
        <Link key={t.href} href={t.href} className={path === t.href ? "on" : ""}>
          <T en={t.en} th={t.th} />
        </Link>
      ))}
    </div>
  );
}
