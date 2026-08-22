"use client";

import { PageHead, statusCls } from "@/components/PageHead";
import { RevenueNav } from "@/components/RevenueNav";
import { T } from "@/lib/i18n";
import { ATTRIBUTION, LOOP, REV_DECISIONS } from "@/lib/revenueos";
import { useStore } from "@/lib/store";

export default function RevDecisionsPage() {
  const { revState, audit } = useStore();
  const ros = audit.filter((a) => /Revenue|Guardian|RevenueOS/.test(a.who));
  return (
    <div>
      <PageHead
        code="ROS-08 · Commercial ledger"
        kickerEn="Every decision is recorded"
        kickerTh="ทุกการตัดสินใจถูกบันทึก"
        titleEn="Decision ledger"
        titleTh="สมุดตัดสินใจ"
        subEn="Old BAR, new BAR, engines called, expected impact, Guardian result. The learning loop starts here: observe → predict → decide → act → measure → learn."
        subTh="BAR เดิม BAR ใหม่ เครื่องยนต์ที่เรียก ผลกระทบที่คาด ผล Guardian วงจรเรียนรู้เริ่มที่นี่"
      />
      <RevenueNav />

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h"><T en="Revenue decisions" th="การตัดสินใจรายได้" /></h5>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th><T en="Action" th="งาน" /></th>
                  <th className="num"><T en="Old" th="เดิม" /></th>
                  <th className="num"><T en="New" th="ใหม่" /></th>
                  <th className="num">฿</th>
                  <th><T en="Status" th="สถานะ" /></th>
                </tr>
              </thead>
              <tbody>
                {REV_DECISIONS.map((d) => {
                  const st = d.risk === "blocked" ? "blocked" : (revState[d.id] ?? "pending");
                  return (
                    <tr key={d.id}>
                      <td style={{ fontFamily: "var(--font-heading)", fontSize: 12 }}>{d.no}</td>
                      <td>{d.head}</td>
                      <td className="num">{d.oldBar ? `฿${d.oldBar.toLocaleString()}` : "—"}</td>
                      <td className="num">{d.newBar ? `฿${d.newBar.toLocaleString()}` : "—"}</td>
                      <td className="num">{d.expected ? `+${d.expected.toLocaleString()}` : "—"}</td>
                      <td><span className={statusCls(st === "applied" ? "Verified" : st === "blocked" ? "High" : "Pending")}>{st}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <h5 className="sec-h" style={{ marginTop: 24 }}><T en="Why last month moved" th="ทำไมเดือนที่แล้วขยับ" /></h5>
          <div className="table-wrap">
            <table className="table">
              <tbody>
                {ATTRIBUTION.map((a) => (
                  <tr key={a.k}>
                    <td>{a.k}</td>
                    <td className="num" style={{ color: a.n < 0 ? "var(--color-hot-700)" : "var(--color-accent-700)", fontWeight: 800 }}>
                      {a.n > 0 ? "+" : ""}฿{a.n.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="Learning loop" th="วงจรเรียนรู้" /></h5>
          {LOOP.map((s, i) => (
            <div key={s} className="ctx-row">
              <span>{i + 1}. {s}</span>
            </div>
          ))}
          <h5 className="sec-h" style={{ marginTop: 24 }}><T en="Audit from this PMS" th="บันทึกจาก PMS นี้" /></h5>
          {ros.length === 0 && <p className="text-muted" style={{ fontSize: 13 }}><T en="No RevenueOS writes yet this session." th="ยังไม่มีการเขียนจาก RevenueOS ในรอบนี้" /></p>}
          {ros.slice(0, 8).map((a, i) => (
            <div key={`${a.what}-${i}`} className="ctx-row" style={{ alignItems: "flex-start" }}>
              <span>
                <strong>{a.who}</strong>
                <div className="text-muted" style={{ fontSize: 11 }}>{a.what}</div>
              </span>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
