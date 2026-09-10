"use client";

import { AgiShell } from "@/components/AgiNav";
import { PageHead } from "@/components/PageHead";
import { botName } from "@/lib/agi";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function AgiRecordPage() {
  const { agiRecords } = useStore();
  return (
    <div>
      <PageHead
        code="AGI-08 · Shared Work Record"
        kickerEn="Another bot can continue"
        kickerTh="บอทอื่นรับงานต่อได้"
        titleEn="Shared work record"
        titleTh="สมุดงานร่วม"
        subEn="Plans, decisions, approvals, completed actions and results live in HOTEL24. Claude can review Grok’s evidence. Only one authorised workflow publishes."
        subTh="แผน การตัดสินใจ การอนุมัติ งานที่ทำ และผล อยู่ใน HOTEL24 Claude ตรวจหลักฐานของ Grok ได้ มีเวิร์กโฟลว์ที่ได้รับสิทธิ์ลงได้แค่หนึ่ง"
      />
      <AgiShell>
        {agiRecords.map((r) => (
          <article key={r.id} className="audit-row">
            <div className="rec-meta">
              <span className="tag tag-neutral">{botName(r.bot)}</span>
              <span className="tag tag-outline">{r.kind}</span>
              <span className="text-muted" style={{ fontSize: 12 }}>{r.t}</span>
              {r.observed && <span className="tag tag-neutral"><T en="Observed" th="สังเกตได้" /></span>}
            </div>
            <p style={{ margin: "8px 0 0" }}><T en={r.en} th={r.th} /></p>
          </article>
        ))}
      </AgiShell>
    </div>
  );
}
