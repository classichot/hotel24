"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { T } from "@/lib/i18n";

const TABS = [
  { href: "/agent-direct", en: "Identity", th: "ตัวตน AI" },
  { href: "/gateway", en: "Gateway", th: "เกตเวย์" },
  { href: "/registry", en: "Registry", th: "ทะเบียน" },
  { href: "/agent-offers", en: "Direct Offers", th: "ข้อเสนอตรง" },
  { href: "/aeo", en: "AEO", th: "AEO" },
  { href: "/hap", en: "HAP spec", th: "สเปก HAP" },
];

export function AgentNav() {
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
