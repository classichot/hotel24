"use client";

import { AgiShell } from "@/components/AgiNav";
import { PageHead } from "@/components/PageHead";
import { AGI_SIM } from "@/lib/agi";
import { T } from "@/lib/i18n";

export default function AgiSimPage() {
  return (
    <div>
      <PageHead
        code="AGI-W6 · Simulation and handover"
        kickerEn="Test it, then let another bot review"
        kickerTh="ลองก่อน แล้วให้บอทอื่นตรวจ"
        titleEn="Simulate, then hand over"
        titleTh="จำลอง แล้วส่งต่อ"
        subEn="Grok proposes. Claude reviews the same recorded evidence. HOTEL24’s calculations and rules remain authoritative. Agreement between models is a review aid — not a commit."
        subTh="Grok เสนอ Claude ตรวจหลักฐานชุดเดียวกัน การคำนวณและกฎของ HOTEL24 ยังเป็นตัวจริง ความเห็นตรงกันของโมเดลเป็นแค่ตัวช่วยตรวจ — ไม่ใช่การลง"
      />
      <AgiShell>
        <div className="agi-compare" style={{ marginTop: 16 }}>
          <article>
            <div className="page-kicker">Grok</div>
            <h4><T en={AGI_SIM.plan} th={AGI_SIM.planTh} /></h4>
            <p><T en={`Proposed ฿${AGI_SIM.hotel24.proposed.toLocaleString()} from ฿${AGI_SIM.hotel24.from.toLocaleString()}.`} th={`เสนอ ฿${AGI_SIM.hotel24.proposed.toLocaleString()} จาก ฿${AGI_SIM.hotel24.from.toLocaleString()}`} /></p>
          </article>
          <article>
            <div className="page-kicker">Claude</div>
            <h4><T en="Review of the same record" th="ตรวจสมุดชุดเดียวกัน" /></h4>
            <p><T en={AGI_SIM.claude} th={AGI_SIM.claudeTh} /></p>
          </article>
        </div>
        <div className="callout" style={{ marginTop: 16 }}>
          <strong>HOTEL24</strong>
          {" · "}
          {AGI_SIM.hotel24.reason}
          {" · "}
          <T en="Blocked. Only one authorised workflow may publish, and this one did not pass the floor." th="บล็อก มีเวิร์กโฟลว์ที่ได้รับสิทธิ์ลงได้แค่หนึ่ง และอันนี้ไม่ผ่านราคาพื้น" />
        </div>
      </AgiShell>
    </div>
  );
}
