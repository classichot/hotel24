"use client";

import type { ReactNode } from "react";
import { T } from "@/lib/i18n";

export function PageHead({
  code,
  kickerEn,
  kickerTh,
  titleEn,
  titleTh,
  subEn,
  subTh,
  actions,
}: {
  code?: string;
  kickerEn: string;
  kickerTh: string;
  titleEn: ReactNode;
  titleTh: ReactNode;
  subEn: ReactNode;
  subTh: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="page-head">
      <div>
        {code && <div className="spec-code">{code}</div>}
        <div className="page-kicker"><T en={kickerEn} th={kickerTh} /></div>
        <h2><T en={titleEn} th={titleTh} /></h2>
        <div className="page-sub"><T en={subEn} th={subTh} /></div>
      </div>
      {actions && <div style={{ marginLeft: "auto", display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>{actions}</div>}
    </div>
  );
}

export function statusCls(status: string) {
  if (status === "Mapped" || status === "Connected" || status === "Live" || status === "Filed" || status === "Ready" || status === "Prepaid") return "tag tag-neutral";
  if (status === "Pending" || status === "AI drafted" || status === "Medium") return "tag tag-accent";
  if (status === "Unmapped" || status === "High" || status === "Escalated" || status === "Awaiting scan") return "tag tag-outline";
  return "tag tag-neutral";
}
