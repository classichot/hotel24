"use client";

import { AgiShell } from "@/components/AgiNav";
import { PageHead } from "@/components/PageHead";
import { AGI_KNOWLEDGE, AGI_RULES } from "@/lib/agi";
import { T } from "@/lib/i18n";

export default function AgiKnowledgePage() {
  return (
    <div>
      <PageHead
        code="AGI-02 · Hotel Knowledge Profile"
        kickerEn="Constraints the bot must not invent"
        kickerTh="ข้อจำกัดที่บอทห้ามคิดเอง"
        titleEn="Hotel knowledge profile"
        titleTh="โปรไฟล์ความรู้โรงแรม"
        subEn="Room types, occupancy, children, amenities, SOPs, brand tone, commercial rules and approved exceptions — the same file every authorised bot reads."
        subTh="ประเภทห้อง ที่นั่ง เด็ก สิ่งอำนวย SOP น้ำเสียงแบรนด์ กฎการค้า และข้อยกเว้นที่อนุมัติ — ไฟล์เดียวที่บอทที่ได้รับสิทธิ์อ่าน"
      />
      <AgiShell>
        <div className="callout" style={{ marginTop: 16 }}>{AGI_KNOWLEDGE.commercial}</div>
        <div className="table-wrap" style={{ marginTop: 16 }}>
          <table className="table">
            <thead>
              <tr>
                <th><T en="Room" th="ห้อง" /></th>
                <th className="num"><T en="Occ." th="ที่นั่ง" /></th>
                <th><T en="Children" th="เด็ก" /></th>
                <th className="num"><T en="Floor" th="ราคาพื้น" /></th>
              </tr>
            </thead>
            <tbody>
              {AGI_KNOWLEDGE.rooms.map((r) => (
                <tr key={r.id}>
                  <td>{r.en}</td>
                  <td className="num">{r.occ}</td>
                  <td>{r.child}</td>
                  <td className="num">฿{r.rate.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid-2" style={{ marginTop: 20 }}>
          <section>
            <h5 className="sec-h"><T en="SOPs" th="SOP" /></h5>
            <ul className="playbook-steps">{AGI_KNOWLEDGE.sops.map((s) => <li key={s}>{s}</li>)}</ul>
            <h5 className="sec-h"><T en="Tone" th="น้ำเสียง" /></h5>
            <p>{AGI_KNOWLEDGE.tone}</p>
          </section>
          <section>
            <h5 className="sec-h"><T en="Amenities · children" th="สิ่งอำนวย · เด็ก" /></h5>
            <p>{AGI_KNOWLEDGE.children}</p>
            <ul className="playbook-steps">{AGI_KNOWLEDGE.amenities.map((s) => <li key={s}>{s}</li>)}</ul>
            <h5 className="sec-h"><T en="Exceptions" th="ข้อยกเว้น" /></h5>
            <ul className="playbook-steps">{AGI_KNOWLEDGE.exceptions.map((s) => <li key={s}>{s}</li>)}</ul>
            <p className="text-muted" style={{ fontSize: 12 }}>Promo cap ฿{AGI_RULES.promoCapThb.toLocaleString()} · ask before cancel policy · weekend {AGI_RULES.protectedDates.join(" / ")} protected.</p>
          </section>
        </div>
      </AgiShell>
    </div>
  );
}
