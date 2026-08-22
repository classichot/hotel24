"use client";

import Link from "next/link";
import { statusCls } from "@/components/PageHead";
import { T } from "@/lib/i18n";
import type { RevDecision, RevStatus } from "@/lib/revenueos";
import { useStore } from "@/lib/store";

function statusOf(d: RevDecision, state: Record<string, RevStatus>): RevStatus {
  if (d.risk === "blocked") return "blocked";
  return state[d.id] ?? "pending";
}

export function RevDecisionCard({ decision: d }: { decision: RevDecision }) {
  const { revState, applyRev, dismissRev, revLevel } = useStore();
  const st = statusOf(d, revState);
  const tag = st === "applied" ? "Verified" : st === "blocked" ? "High" : st === "dismissed" ? "Pending" : "Live";

  return (
    <article className="rec-card">
      <div className="rec-meta">
        <span className={statusCls(d.sev === "High" || st === "blocked" ? "High" : "Mapped")}>{d.agent}</span>
        <span className="text-muted">{d.no} · {d.dates}</span>
        <span className={statusCls(tag)}>{st}</span>
      </div>
      <h3 style={{ fontSize: 18, margin: "8px 0 6px" }}><T en={d.head} th={d.headTh} /></h3>
      <p className="text-muted" style={{ fontSize: 13, margin: "0 0 8px" }}><T en={d.why} th={d.whyTh} /></p>
      <div className="rec-impact">
        <span>{d.confidence}% <T en="confidence" th="ความมั่นใจ" /></span>
        {d.expected > 0 && <strong style={{ color: "var(--color-accent-700)" }}>+฿{d.expected.toLocaleString()}</strong>}
      </div>
      <p style={{ fontSize: 13, margin: "8px 0 0" }}><T en={d.does} th={d.doesTh} /></p>
      <p className="text-muted" style={{ fontSize: 11, margin: "6px 0 0" }}>
        {d.engines.join(" → ")}
      </p>
      {st === "pending" && (
        <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
          <button className="btn btn-primary" onClick={() => applyRev(d.id)} disabled={revLevel === 0}>
            {revLevel === 0 ? <T en="L0 — no write" th="L0 — ไม่เขียน" /> : <T en="Approve write" th="อนุมัติการเขียน" />}
          </button>
          <button className="btn btn-ghost" onClick={() => dismissRev(d.id)}><T en="Dismiss" th="ไม่ทำ" /></button>
          {d.href && <Link href={d.href} className="btn btn-secondary"><T en="Open screen" th="เปิดหน้าจอ" /></Link>}
        </div>
      )}
    </article>
  );
}

export function RevDecisionList({ decisions }: { decisions: RevDecision[] }) {
  return (
    <div>
      {decisions.map((d) => (
        <RevDecisionCard key={d.id} decision={d} />
      ))}
    </div>
  );
}
