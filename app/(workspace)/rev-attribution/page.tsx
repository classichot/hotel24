"use client";

import { PageHead } from "@/components/PageHead";
import { Phase2Nav } from "@/components/Phase2Nav";
import { T } from "@/lib/i18n";
import { ATTRIBUTION, WHY_DOWN } from "@/lib/revenueos";

export default function RevAttributionPage() {
  const vsBudget = WHY_DOWN.reduce((n, r) => n + r.n, 0);
  return (
    <div>
      <PageHead
        code="ROS-18 · Engine 16"
        kickerEn="16 · Revenue Attribution Engine"
        kickerTh="16 · เครื่องอธิบายรายได้"
        titleEn="Why it moved"
        titleTh="ทำไมรายได้ขยับ"
        subEn="Explains the variance. Does not write ARI. Next month is 8.7% below budget — Singapore demand, OTA visibility, then corporate."
        subTh="อธิบายส่วนต่าง ไม่เขียน ARI เดือนหน้าต่ำกว่างบ 8.7% — ดีมานด์สิงคโปร์ การมองเห็น OTA แล้วคอร์ปอเรต"
      />
      <Phase2Nav />

      <div className="stat-row" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div className="stat-cell">
          <div className="stat-label"><T en="Vs budget" th="เทียบงบ" /></div>
          <div className="stat-val" style={{ fontSize: 22, color: "var(--color-hot-700)" }}>{vsBudget.toFixed(1)}%</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Singapore demand" th="ดีมานด์สิงคโปร์" /></div>
          <div className="stat-val" style={{ fontSize: 22 }}>−4.1</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="OTA visibility" th="การมองเห็น OTA" /></div>
          <div className="stat-val" style={{ fontSize: 22 }}>−2.3</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Writes ARI?" th="เขียน ARI?" /></div>
          <div className="stat-val" style={{ fontSize: 22 }}>No</div>
        </div>
      </div>

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h">16 · <T en="Next month versus budget" th="เดือนหน้าเทียบงบ" /></h5>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th><T en="Driver" th="ตัวขับ" /></th>
                  <th className="num">pp</th>
                </tr>
              </thead>
              <tbody>
                {WHY_DOWN.map((r) => (
                  <tr key={r.k}>
                    <td style={{ fontWeight: 700 }}>{r.k}</td>
                    <td className="num" style={{ fontWeight: 800, color: r.n < 0 ? "var(--color-hot-700)" : "var(--color-accent-700)" }}>
                      {r.n > 0 ? "+" : ""}{r.n}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h5 className="sec-h" style={{ marginTop: 24 }}><T en="Last month contribution" th="ส่วนร่วมเดือนที่แล้ว" /></h5>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th><T en="Engine / mix" th="เครื่องยนต์ / ส่วนผสม" /></th>
                  <th className="num">฿</th>
                </tr>
              </thead>
              <tbody>
                {ATTRIBUTION.map((a) => (
                  <tr key={a.k}>
                    <td>{a.k}</td>
                    <td className="num" style={{ fontWeight: 800, color: a.n < 0 ? "var(--color-hot-700)" : "var(--color-accent-700)" }}>
                      {a.n > 0 ? "+" : ""}฿{a.n.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="What this is for" th="เครื่องนี้เพื่ออะไร" /></h5>
          <p className="text-muted" style={{ fontSize: 13 }}>
            <T
              en="The Director cannot learn if every miss is ‘the market’. Attribution splits market, price, mix, channel, promo, cancel, group, Direct and upsell. Seeded variance — not a live econometric model."
              th="ผู้อำนวยการเรียนรู้ไม่ได้ถ้าทุกส่วนต่างคือ ‘ตลาด’ เครื่องนี้แยกตลาด ราคา ส่วนผสม ช่องทาง โปร ยกเลิก กรุ๊ป จองตรง และอัปเซล ส่วนต่างจำลอง — ไม่ใช่โมเดลเศรษฐมิติจริง"
            />
          </p>
        </aside>
      </div>
    </div>
  );
}
