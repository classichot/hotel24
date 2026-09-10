"use client";

import { AgiShell } from "@/components/AgiNav";
import { PageHead } from "@/components/PageHead";
import { AGI_ACTIONS, AGI_LEVELS, AGI_RULES } from "@/lib/agi";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function AgiAutonomyPage() {
  const { agiLevel, setAgiLevel, propertyId } = useStore();
  return (
    <div>
      <PageHead
        code="AGI-06 · Autonomy Controls"
        kickerEn="Each hotel chooses the delegation"
        kickerTh="แต่ละโรงแรมเลือกเองว่าจะมอบแค่ไหน"
        titleEn="Autonomy controls"
        titleTh="ตัวควบคุมอำนาจ"
        subEn="Three levels: analyse only; prepare for approval; execute within agreed limits. Configure by action and property. Cancellation policy always asks."
        subTh="สามระดับ: วิเคราะห์อย่างเดียว เตรียมรออนุมัติ ลงมือในกรอบที่ตกลง ตั้งตามการกระทำและโรงแรม นโยบายยกเลิกต้องถามเสมอ"
      />
      <AgiShell>
        <div className="seg" style={{ flexWrap: "wrap", margin: "16px 0" }}>
          {AGI_LEVELS.map((l) => (
            <button key={l.id} type="button" className={`seg-opt${agiLevel === l.id ? " on" : ""}`} onClick={() => setAgiLevel(l.id)}>
              <span>{l.en}</span>
            </button>
          ))}
        </div>
        <div className="grid-3">
          {AGI_LEVELS.map((l) => (
            <article key={l.id} className="module-cell" style={agiLevel === l.id ? { outline: "2px solid var(--color-accent)" } : undefined}>
              <strong>A{l.id} · <T en={l.en} th={l.th} /></strong>
              <span><T en={l.hint} th={l.hintTh} /></span>
            </article>
          ))}
        </div>
        <h5 className="sec-h" style={{ marginTop: 24 }}><T en={`Limits on ${propertyId}`} th={`กรอบบน ${propertyId}`} /></h5>
        <ul className="playbook-steps">
          <li><T en={`Minimum rate ฿${AGI_RULES.floorThb.toLocaleString()}`} th={`ราคาต่ำสุด ฿${AGI_RULES.floorThb.toLocaleString()}`} /></li>
          <li><T en={`Promotion budget ฿${AGI_RULES.promoCapThb.toLocaleString()}`} th={`งบโปร ฿${AGI_RULES.promoCapThb.toLocaleString()}`} /></li>
          <li><T en={`Max daily move ${AGI_RULES.maxDailyMovePct}%`} th={`ขยับสูงสุดต่อวัน ${AGI_RULES.maxDailyMovePct}%`} /></li>
          <li><T en={`Protected dates: ${AGI_RULES.protectedDates.join(", ")}`} th={`วันที่กันไว้: ${AGI_RULES.protectedDates.join(", ")}`} /></li>
          <li><T en="Ask before cancellation policy — not configurable." th="ถามก่อนเปลี่ยนนโยบายยกเลิก — ปรับไม่ได้" /></li>
        </ul>
        <p className="text-muted" style={{ fontSize: 13 }}>
          {AGI_ACTIONS.filter((a) => a.ask).map((a) => a.id).join(", ")}{" "}
          <T en="always escalate. RevenueOS L2 is a different brake on a different layer." th="ส่งต่อเสมอ RevenueOS L2 คือเบรกคนละชั้น" />
        </p>
      </AgiShell>
    </div>
  );
}
