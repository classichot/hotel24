"use client";

import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { RevDecisionList } from "@/components/RevDecisionList";
import { RevenueNav } from "@/components/RevenueNav";
import { T } from "@/lib/i18n";
import { REV_DECISIONS } from "@/lib/revenueos";
import { useStore } from "@/lib/store";

export default function RevInventoryPage() {
  const { ari, allotment } = useStore();
  const garden = ari.garden ?? [];
  const decisions = REV_DECISIONS.filter((d) => d.brain === "inventory");
  return (
    <div>
      <PageHead
        code="ROS-04 · Inventory Brain"
        kickerEn="Who should get scarce rooms?"
        kickerTh="ใครควรได้ห้องที่ขาด"
        titleEn="Inventory Brain"
        titleTh="สมองห้อง"
        subEn="MinLOS, protection, stop-sell and group displacement often beat a price change. Overbooking and cancellation scores are Phase 2 — the ledger already refuses a cheap group."
        subTh="ขั้นต่ำ การกันห้อง ปิดขาย และการเบียดกรุ๊ปมักคุ้มกว่าการเปลี่ยนราคา ขายเกินและคะแนนยกเลิกเป็นเฟส 2 — สมุดนี้ปฏิเสธกรุ๊ปถูกอยู่แล้ว"
      />
      <RevenueNav />

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h"><T en="Garden ARI · live store" th="ARI สวน · คลังจริง" /></h5>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th><T en="Date" th="วันที่" /></th>
                  <th className="num">Avail</th>
                  <th className="num">BAR</th>
                  <th className="num">MinLOS</th>
                </tr>
              </thead>
              <tbody>
                {garden.map((r) => (
                  <tr key={r.date}>
                    <td>{r.date} {r.dow}</td>
                    <td className="num">{r.avail}</td>
                    <td className="num" style={{ fontWeight: 800 }}>฿{r.rate.toLocaleString()}</td>
                    <td className="num">{r.minStay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <RevDecisionList decisions={decisions} />
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="Allotment now" th="จัดสรรตอนนี้" /></h5>
          {Object.entries(allotment).map(([k, n]) => (
            <div key={k} className="ctx-row">
              <span>{k}</span>
              <strong style={{ color: k === "direct" ? "var(--color-accent-700)" : undefined }}>{n}</strong>
            </div>
          ))}
          <div className="callout" style={{ marginTop: 16 }}>
            <T
              en="10 Garden rooms left on a compressing Friday should not go to a ฿2,700 group. Late demand around ฿3,400–฿5,500 is already in the forecast."
              th="สวนเหลือ 10 ห้องวันศุกร์ที่ตลาดบีบ ไม่ควรให้กรุ๊ป ฿2,700 ดีมานด์ท้าย ฿3,400–฿5,500 อยู่ในพยากรณ์แล้ว"
            />
          </div>
          <Link href="/inventory" className="btn btn-ghost" style={{ paddingLeft: 0, marginTop: 12 }}>
            <T en="Full ARI grid" th="ตาราง ARI เต็ม" /> →
          </Link>
        </aside>
      </div>
    </div>
  );
}
