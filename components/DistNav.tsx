"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { T } from "@/lib/i18n";

const TABS = [
  { href: "/channels", en: "Connections", th: "ช่องทาง" },
  { href: "/mapping", en: "Mapping", th: "จับคู่" },
  { href: "/inventory", en: "Inventory & ARI", th: "ห้องคงเหลือ & ARI" },
  { href: "/sync", en: "Sync Service", th: "ซิงก์" },
];

export function DistNav() {
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
