"use client";

import { AgiShell } from "@/components/AgiNav";
import { PageHead } from "@/components/PageHead";
import { AGI_WEEKEND } from "@/lib/agi";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function AgiGmPage() {
  const { runAgiMission, approveAgiMission, agiMissions, agiConns } = useStore();
  const st = agiMissions["m-weekend"] ?? "draft";
  const blocked = AGI_WEEKEND.filter((r) => !r.ready);
  return (
    <div>
      <PageHead
        code="AGI-W1 · AI General Manager"
        kickerEn="Run this mission for my hotel"
        kickerTh="รันภารกิจนี้ให้โรงแรมฉัน"
        titleEn="Weekend full-house"
        titleTh="บ้านเต็มสุดสัปดาห์"
        subEn="One objective across departments. Physical work still goes to hotel staff. You see what is ready, what is blocked, who is responsible, and what needs your decision."
        subTh="วัตถุประสงค์เดียวข้ามแผนก งานกายภาพยังไปที่พนักงาน คุณเห็นอะไรพร้อม อะไรติด ใครรับ และอะไรต้องคุณตัดสิน"
        actions={
          <button type="button" className="btn btn-primary" onClick={() => runAgiMission("m-weekend")} disabled={agiConns.grok !== "live"}>
            <T en="Assign to Grok" th="มอบให้ Grok" />
          </button>
        }
      />
      <AgiShell>
        <div className="stat-row" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          <div className="stat-cell">
            <div className="stat-label"><T en="Ready" th="พร้อม" /></div>
            <div className="stat-val">{AGI_WEEKEND.filter((r) => r.ready).length}</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label"><T en="Blocked" th="ติด" /></div>
            <div className="stat-val" style={{ color: "var(--color-hot-700)" }}>{blocked.length}</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label"><T en="Needs owner" th="ต้องเจ้าของ" /></div>
            <div className="stat-val" style={{ fontSize: 18 }}>209 aircon</div>
          </div>
        </div>
        {AGI_WEEKEND.map((r) => (
          <div key={r.k} className="switch-step">
            <span className="switch-n">{r.ready ? "OK" : "!"}</span>
            <div>
              <strong><T en={r.k} th={r.kt} /></strong>
              <span className="text-muted" style={{ display: "block", fontSize: 13 }}>{r.note}</span>
            </div>
            <span className="text-muted">{r.who}</span>
          </div>
        ))}
        {st === "awaiting" && (
          <button type="button" className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => approveAgiMission("m-weekend")}>
            <T en="Approve Grok’s prep plan" th="อนุมัติแผนเตรียมของ Grok" />
          </button>
        )}
      </AgiShell>
    </div>
  );
}
