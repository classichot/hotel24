"use client";

import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { RevDecisionList } from "@/components/RevDecisionList";
import { RevenueNav } from "@/components/RevenueNav";
import { T } from "@/lib/i18n";
import { ELASTICITY, isPhase2Decision, PRICE_LADDER, REV_DECISIONS } from "@/lib/revenueos";

export default function RevPricingPage() {
  const decisions = REV_DECISIONS.filter((d) => d.brain === "price" && d.risk !== "blocked" && !isPhase2Decision(d.id));
  return (
    <div>
      <PageHead
        code="ROS-03 · Engine 05"
        kickerEn="05 · Dynamic Pricing Engine"
        kickerTh="05 · เครื่องตั้งราคาไดนามิก"
        titleEn="Price Brain"
        titleTh="สมองราคา"
        subEn="Engine 05 simulates a ladder and picks the highest expected net — not competitor +/− ฿100. The LLM only explains the pick."
        subTh="เครื่อง 05 จำลองบันไดราคาแล้วเลือกสุทธิคาดสูงสุด — ไม่ใช่คู่แข่ง +/− ฿100 LLM อธิบายการเลือกเท่านั้น"
      />
      <RevenueNav />

      <div className="callout" style={{ marginTop: 16 }}>
        <T
          en="Garden Mon–Tue: ฿2,200 wins ฿41,800 expected net. ฿2,550 looks ‘stronger’ and loses. That is the point of the twin."
          th="สวน จ–อ: ฿2,200 ชนะสุทธิคาด ฿41,800 ฿2,550 ดูแรงกว่าแต่แพ้ นั่นคือจุดของฝาแฝด"
        />
      </div>

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h"><T en="Dynamic pricing ladder · Garden 24 Aug" th="บันไดราคา · สวน 24 ส.ค." /></h5>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th className="num"><T en="Price" th="ราคา" /></th>
                  <th className="num"><T en="Exp. rooms" th="ห้องคาด" /></th>
                  <th className="num"><T en="Exp. net" th="สุทธิคาด" /></th>
                </tr>
              </thead>
              <tbody>
                {PRICE_LADDER.map((r) => (
                  <tr key={r.price} style={{ background: r.pick ? "color-mix(in srgb, var(--color-accent) 12%, transparent)" : undefined }}>
                    <td className="num" style={{ fontWeight: r.pick ? 800 : 400, color: r.pick ? "var(--color-accent-700)" : undefined }}>฿{r.price.toLocaleString()}</td>
                    <td className="num">{r.rooms}</td>
                    <td className="num" style={{ fontWeight: r.pick ? 800 : 400 }}>฿{r.net.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h5 className="sec-h" style={{ marginTop: 24 }}><T en="Learned elasticity" th="ความยืดหยุ่นที่เรียนรู้" /></h5>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th><T en="Step" th="ช่วง" /></th>
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
          <h5 className="sec-h"><T en="Why ฿2,200" th="ทำไม ฿2,200" /></h5>
          <p className="text-muted" style={{ fontSize: 13 }}>
            <T
              en="Not because Ao Nang Cliff Beach is ฿4,200. Because expected profitability at this hotel, this weekday, this elasticity, is highest here."
              th="ไม่ใช่เพราะ Ao Nang Cliff Beach อยู่ ฿4,200 แต่เพราะกำไรคาดที่โรงแรมนี้ วันธรรมดานี้ ความยืดหยุ่นนี้ สูงสุดตรงนี้"
            />
          </p>
          <div className="ctx-row"><span>Confidence</span><strong>84%</strong></div>
          <div className="ctx-row"><span>RevPAR vs hold</span><strong>+฿31</strong></div>
          <div className="ctx-row"><span>Guardian</span><strong>+11% &lt; 30% cap</strong></div>
          <Link href="/rev-elasticity" className="btn btn-ghost" style={{ paddingLeft: 0, marginTop: 12 }}>
            <T en="11 · WTP / elasticity" th="11 · WTP / ความยืดหยุ่น" /> →
          </Link>
        </aside>
      </div>
    </div>
  );
}
