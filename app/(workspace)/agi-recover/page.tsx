"use client";

import { AgiShell } from "@/components/AgiNav";
import { PageHead } from "@/components/PageHead";
import { AGI_RECOVER } from "@/lib/agi";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function AgiRecoverPage() {
  const { runAgiMission, approveAgiMission, agiMissions, agiConns } = useStore();
  const st = agiMissions["m-recover"] ?? "draft";
  const r = AGI_RECOVER;
  return (
    <div>
      <PageHead
        code="AGI-W4 · Cancellation Recovery"
        kickerEn="Recover the opportunity"
        kickerTh="กู้โอกาส"
        titleEn="Cancellation recovery"
        titleTh="กู้ห้องที่ยกเลิก"
        subEn="Release inventory, offer upgrades, contact the waitlist within permission. A replacement booking is recorded. It does not prove the agent caused it."
        subTh="ปล่อยห้อง เสนออัปเกรด ติดต่อลิสต์รอในสิทธิ์ที่อนุญาต บันทึกการจองทดแทน ไม่ได้พิสูจน์ว่าเอเจนต์เป็นสาเหตุ"
        actions={
          <button type="button" className="btn btn-primary" onClick={() => runAgiMission("m-recover")} disabled={agiConns.chatgpt !== "live"}>
            <T en="Assign to ChatGPT" th="มอบให้ ChatGPT" />
          </button>
        }
      />
      <AgiShell>
        <div className="stat-row" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          <div className="stat-cell">
            <div className="stat-label"><T en="Cancelled" th="ยกเลิก" /></div>
            <div className="stat-val" style={{ fontSize: 20 }}>{r.cancelled.room}</div>
            <div className="stat-hint">{r.cancelled.dates} · ฿{r.cancelled.lost.toLocaleString()}</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label"><T en="Replacement (observed)" th="ทดแทน (สังเกตได้)" /></div>
            <div className="stat-val" style={{ fontSize: 20 }}>{r.replacement.guest}</div>
            <div className="stat-hint">฿{r.replacement.net.toLocaleString()} net</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label"><T en="Attributed to agent?" th="โยงเป็นฝีมือเอเจนต์?" /></div>
            <div className="stat-val" style={{ fontSize: 22 }}>No</div>
          </div>
        </div>
        <h5 className="sec-h" style={{ marginTop: 16 }}><T en="Actions taken" th="สิ่งที่ทำ" /></h5>
        <ul className="playbook-steps">{r.actions.map((a) => <li key={a}>{a}</li>)}</ul>
        <p className="text-muted" style={{ fontSize: 13 }}><T en={r.caution} th={r.cautionTh} /></p>
        {st === "awaiting" && (
          <button type="button" className="btn btn-primary" onClick={() => approveAgiMission("m-recover")}>
            <T en="Accept recovery record" th="รับบันทึกการกู้" />
          </button>
        )}
      </AgiShell>
    </div>
  );
}
