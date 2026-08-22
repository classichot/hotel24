"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { T } from "@/lib/i18n";

const TABS = [
  { href: "/rev-phase2", en: "Phase 2", th: "เฟส 2" },
  { href: "/rev-cancel", en: "09 Cancel", th: "09 ยกเลิก" },
  { href: "/rev-overbook", en: "10 Overbook", th: "10 ขายเกิน" },
  { href: "/rev-elasticity", en: "11 WTP", th: "11 WTP" },
  { href: "/rev-group", en: "12 Group", th: "12 กรุ๊ป" },
  { href: "/rev-alloc", en: "13 Alloc", th: "13 จัดสรร" },
  { href: "/rev-promo", en: "14 Promo", th: "14 โปร" },
  { href: "/rev-convert", en: "15 Direct", th: "15 จองตรง" },
  { href: "/rev-attribution", en: "16 Why", th: "16 ทำไม" },
];

export function Phase2Nav() {
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
