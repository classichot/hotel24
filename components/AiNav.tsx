"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AI_ENGINES } from "@/lib/ai";
import { T } from "@/lib/i18n";

export function AiNav() {
  const path = usePathname();
  return (
    <div className="dist-nav">
      {AI_ENGINES.map((t) => (
        <Link key={t.href} href={t.href} className={path === t.href ? "on" : ""}>
          <T en={t.en.replace("AI ", "").replace(" + Action", "")} th={t.th} />
        </Link>
      ))}
    </div>
  );
}
