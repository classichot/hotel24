"use client";

import Link from "next/link";
import { statusCls } from "@/components/PageHead";
import type { AiAction } from "@/lib/ai";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export function AiActionCard({ action }: { action: AiAction }) {
  const { aiState, applyAi, dismissAi } = useStore();
  const st = aiState[action.id] ?? "pending";

  return (
    <article className="rec-card">
      <div className="rec-meta">
        <span className={statusCls(action.sev)}>{action.sev}</span>
        <span className="tag tag-neutral"><T en={action.kind} th={action.kindTh} /></span>
        <span className="text-muted" style={{ fontSize: 12 }}>{action.when}</span>
        {action.impact && <span className="rec-impact">{action.impact}</span>}
      </div>
      <h4><T en={action.head} th={action.headTh} /></h4>
      <p><T en={action.why} th={action.whyTh} /></p>
      <p className="text-muted" style={{ fontSize: 13, marginTop: 6 }}>
        <T en={action.does} th={action.doesTh} />
      </p>
      {st === "pending" ? (
        <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
          <button className="btn btn-primary" onClick={() => applyAi(action.id)}>
            <T en="Approve" th="อนุมัติ" />
          </button>
          <button className="btn btn-secondary" onClick={() => dismissAi(action.id)}>
            <T en="Dismiss today" th="ไม่ใช้วันนี้" />
          </button>
          {action.href && (
            <Link href={action.href} className="btn btn-ghost" style={{ paddingLeft: 0 }}>
              <T en="Open screen" th="เปิดหน้าจอ" /> →
            </Link>
          )}
        </div>
      ) : (
        <span className={st === "applied" ? "tag tag-accent" : "tag tag-neutral"} style={{ marginTop: 12 }}>
          {st === "applied"
            ? <T en="Applied · written to HOTEL24 and queued to sync" th="ใช้แล้ว · เขียนลง HOTEL24 แล้วเข้าคิวซิงก์" />
            : <T en="Dismissed · will not re-suggest today" th="ยกเลิกแล้ว · จะไม่เสนอซ้ำวันนี้" />}
        </span>
      )}
    </article>
  );
}

export function AiActionList({ actions }: { actions: AiAction[] }) {
  if (!actions.length) {
    return (
      <p className="text-muted" style={{ padding: "18px 0" }}>
        <T en="Nothing waiting in this engine." th="เครื่องยนต์นี้ไม่มีรายการรอ" />
      </p>
    );
  }
  return (
    <>
      {actions.map((a) => (
        <AiActionCard key={a.id} action={a} />
      ))}
    </>
  );
}
