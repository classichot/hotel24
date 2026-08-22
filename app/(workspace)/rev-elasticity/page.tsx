"use client";

import { PageHead } from "@/components/PageHead";
import { Phase2Nav } from "@/components/Phase2Nav";
import { RevDecisionList } from "@/components/RevDecisionList";
import { T } from "@/lib/i18n";
import { ELASTICITY, REV_DECISIONS, WTP_SEGMENTS } from "@/lib/revenueos";

export default function RevElasticityPage() {
  const decisions = REV_DECISIONS.filter((d) => d.id === "ros-elastic-hold");
  return (
    <div>
      <PageHead
        code="ROS-13 · Engine 11"
        kickerEn="11 · Price Elasticity / WTP Engine"
        kickerTh="11 · ความยืดหยุ่นราคา / WTP"
        titleEn="Willingness to pay"
        titleTh="ความเต็มใจจ่าย"
        subEn="Learned conversion drop per price step. Pricing AI may not jump Garden Monday to ฿2,550 — breakpoint is −19%."
        subTh="คอนเวอร์ชันที่ตกต่อขั้นราคา เอเจนต์ราคาห้ามกระโดดสวนวันจันทร์ไป ฿2,550 — จุดหักคือ −19%"
      />
      <Phase2Nav />

      <div className="stat-row" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div className="stat-cell">
          <div className="stat-label"><T en="Safe step" th="ขั้นปลอดภัย" /></div>
          <div className="stat-val" style={{ fontSize: 22 }}>−3%</div>
          <div className="stat-hint">฿1,980 → ฿2,200</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Breakpoint" th="จุดหัก" /></div>
          <div className="stat-val" style={{ fontSize: 22, color: "var(--color-hot-700)" }}>−19%</div>
          <div className="stat-hint">฿2,550 → ฿2,900</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Segments" th="เซ็กเมนต์" /></div>
          <div className="stat-val">{WTP_SEGMENTS.length}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="LLM picks ฿2,550?" th="LLM เลือก ฿2,550?" /></div>
          <div className="stat-val" style={{ fontSize: 22 }}>No</div>
        </div>
      </div>

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h">11 · <T en="Segment willingness to pay" th="ความเต็มใจจ่ายต่อเซ็กเมนต์" /></h5>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th><T en="Segment" th="เซ็กเมนต์" /></th>
                  <th>Lead</th>
                  <th><T en="Step" th="ขั้น" /></th>
                  <th className="num">Δ conv</th>
                  <th><T en="Note" th="หมายเหตุ" /></th>
                </tr>
              </thead>
              <tbody>
                {WTP_SEGMENTS.map((s) => (
                  <tr key={s.seg} style={{ background: s.conv <= -19 ? "color-mix(in srgb, var(--color-hot-700) 8%, transparent)" : undefined }}>
                    <td style={{ fontWeight: 700 }}>{s.seg}</td>
                    <td>{s.lead}</td>
                    <td>{s.step}</td>
                    <td className="num" style={{ fontWeight: 800, color: s.conv <= -15 ? "var(--color-hot-700)" : undefined }}>{s.conv}%</td>
                    <td className="text-muted" style={{ fontSize: 12 }}>{s.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h5 className="sec-h" style={{ marginTop: 24 }}><T en="House ladder (feeds engine 05)" th="บันไดบ้าน (ป้อนเครื่อง 05)" /></h5>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th><T en="Step" th="ขั้น" /></th>
                  <th className="num">Δ conv</th>
                  <th><T en="Note" th="หมายเหตุ" /></th>
                </tr>
              </thead>
              <tbody>
                {ELASTICITY.map((e) => (
                  <tr key={e.from}>
                    <td>฿{e.from.toLocaleString()} → ฿{e.to.toLocaleString()}</td>
                    <td className="num">{e.conv}%</td>
                    <td className="text-muted" style={{ fontSize: 12 }}>{e.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <RevDecisionList decisions={decisions} />
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="Why hold ฿2,200" th="ทำไมคง ฿2,200" /></h5>
          <p className="text-muted" style={{ fontSize: 13 }}>
            <T
              en="Leisure / mobile / Agoda at D-7 dies on a soft weekday at ฿2,550. Twin already lost scenario C. This engine only logs the breakpoint so Pricing AI cannot jump."
              th="เที่ยว / มือถือ / Agoda ที่ D-7 ตายในวันธรรมดาอ่อนที่ ฿2,550 ฝาแฝดแพ้สถานการณ์ C แล้ว เครื่องนี้บันทึกจุดหัก ไม่ให้เอเจนต์ราคากระโดด"
            />
          </p>
        </aside>
      </div>
    </div>
  );
}
