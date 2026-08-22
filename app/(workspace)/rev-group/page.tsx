"use client";

import { PageHead, statusCls } from "@/components/PageHead";
import { Phase2Nav } from "@/components/Phase2Nav";
import { RevDecisionList } from "@/components/RevDecisionList";
import { T } from "@/lib/i18n";
import { GROUP_RFPS, REV_DECISIONS } from "@/lib/revenueos";

export default function RevGroupPage() {
  const decisions = REV_DECISIONS.filter((d) => d.id === "ros-group");
  return (
    <div>
      <PageHead
        code="ROS-14 · Engine 12"
        kickerEn="12 · Group Displacement Engine"
        kickerTh="12 · เครื่องวัดการเบียดแขกเดิน"
        titleEn="Group RFPs"
        titleTh="ใบขอกรุ๊ป"
        subEn="Group revenue + F&B minus displaced transient minus cost. ABC at ฿2,700 is a reject. Accept above ฿3,550."
        subTh="รายได้กรุ๊ป + อาหาร ลบแขกเดินที่เบียด ลบต้นทุน ABC ที่ ฿2,700 คือปฏิเสธ รับได้เมื่อเกิน ฿3,550"
      />
      <Phase2Nav />

      <div className="stat-row" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div className="stat-cell">
          <div className="stat-label">ABC</div>
          <div className="stat-val" style={{ fontSize: 22, color: "var(--color-hot-700)" }}>REJECT</div>
          <div className="stat-hint">฿2,700 · 12 rooms</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Displacement" th="มูลค่าเบียด" /></div>
          <div className="stat-val" style={{ fontSize: 22 }}>฿33,600</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Counter" th="ราคาเสนอ" /></div>
          <div className="stat-val" style={{ fontSize: 22 }}>฿3,550</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Net if accepted" th="สุทธิถ้ารับ" /></div>
          <div className="stat-val" style={{ fontSize: 22, color: "var(--color-hot-700)" }}>−฿8,600</div>
        </div>
      </div>

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h">12 · <T en="Displacement ledger" th="สมุดเบียด" /></h5>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th><T en="RFP" th="ใบขอ" /></th>
                  <th className="num"><T en="Rooms" th="ห้อง" /></th>
                  <th className="num"><T en="Offer" th="เสนอ" /></th>
                  <th className="num">F&B</th>
                  <th className="num"><T en="Displace" th="เบียด" /></th>
                  <th className="num">Net</th>
                  <th><T en="Verdict" th="คำตัดสิน" /></th>
                </tr>
              </thead>
              <tbody>
                {GROUP_RFPS.map((g) => (
                  <tr key={g.id} style={{ background: g.verdict === "REJECT" ? "color-mix(in srgb, var(--color-hot-700) 8%, transparent)" : undefined }}>
                    <td>
                      <strong>{g.name}</strong>
                      <div className="text-muted" style={{ fontSize: 11 }}>{g.dates} · {g.nights}n</div>
                    </td>
                    <td className="num">{g.rooms}</td>
                    <td className="num">{g.offer ? `฿${g.offer.toLocaleString()}` : "comp"}</td>
                    <td className="num">฿{g.fb.toLocaleString()}</td>
                    <td className="num">฿{g.displace.toLocaleString()}</td>
                    <td className="num" style={{ fontWeight: 800, color: g.net < 0 ? "var(--color-hot-700)" : "var(--color-accent-700)" }}>
                      {g.net < 0 ? "−" : "+"}฿{Math.abs(g.net).toLocaleString()}
                    </td>
                    <td><span className={statusCls(g.verdict === "REJECT" ? "High" : "Verified")}>{g.verdict}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <RevDecisionList decisions={decisions} />
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="Formula" th="สูตร" /></h5>
          <p className="text-muted" style={{ fontSize: 13 }}>
            <T
              en="Group room revenue + F&B − displaced transient (already in the forecast at ฿2,200–฿3,400) − cost. No inventory is written until sales accepts the counter."
              th="รายได้ห้องกรุ๊ป + อาหาร − แขกเดินที่เบียด (อยู่ในพยากรณ์แล้วที่ ฿2,200–฿3,400) − ต้นทุน ยังไม่เขียนห้องจนกว่าฝ่ายขายรับราคาเสนอ"
            />
          </p>
        </aside>
      </div>
    </div>
  );
}
