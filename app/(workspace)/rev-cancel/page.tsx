"use client";

import { PageHead, statusCls } from "@/components/PageHead";
import { Phase2Nav } from "@/components/Phase2Nav";
import { RevDecisionList } from "@/components/RevDecisionList";
import { T } from "@/lib/i18n";
import { CANCEL_BOOKINGS, REV_DECISIONS } from "@/lib/revenueos";

export default function RevCancelPage() {
  const decisions = REV_DECISIONS.filter((d) => d.id === "ros-cancel-lim");
  const hot = CANCEL_BOOKINGS.filter((b) => b.score >= 40).length;
  return (
    <div>
      <PageHead
        code="ROS-11 · Engine 09"
        kickerEn="09 · Cancellation Prediction Engine"
        kickerTh="09 · เครื่องทำนายยกเลิก"
        titleEn="Cancel risk"
        titleTh="เสี่ยงยกเลิก"
        subEn="Per-reservation cancel probability. Soft inventory for the overbooking engine — not a room you re-sell at BAR."
        subTh="โอกาสยกเลิกต่อการจอง ห้องนิ่มให้เครื่องขายเกิน — ไม่ใช่ห้องที่ปล่อย BAR ซ้ำทันที"
      />
      <Phase2Nav />

      <div className="stat-row" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div className="stat-cell">
          <div className="stat-label"><T en="Folios scored" th="โฟลิโอที่ให้คะแนน" /></div>
          <div className="stat-val">{CANCEL_BOOKINGS.length}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Watch list" th="รายการเฝ้า" /></div>
          <div className="stat-val" style={{ color: "var(--color-hot-700)" }}>{hot}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label">H24-8860</div>
          <div className="stat-val" style={{ fontSize: 22 }}>67%</div>
          <div className="stat-hint">Lim · Agoda · refundable</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="LLM sets the score?" th="LLM ให้คะแนน?" /></div>
          <div className="stat-val" style={{ fontSize: 22 }}>No</div>
        </div>
      </div>

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h">09 · <T en="Reservation cancel scores" th="คะแนนยกเลิกต่อการจอง" /></h5>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th><T en="Guest" th="แขก" /></th>
                  <th><T en="Channel" th="ช่องทาง" /></th>
                  <th className="num">Lead</th>
                  <th><T en="Refund" th="คืนเงิน" /></th>
                  <th className="num"><T en="Risk" th="เสี่ยง" /></th>
                </tr>
              </thead>
              <tbody>
                {CANCEL_BOOKINGS.map((b) => (
                  <tr key={b.id} style={{ background: b.score >= 40 ? "color-mix(in srgb, var(--color-hot-700) 8%, transparent)" : undefined }}>
                    <td style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>{b.id}</td>
                    <td>
                      {b.guest}
                      <div className="text-muted" style={{ fontSize: 11 }}>{b.room} · {b.why}</div>
                    </td>
                    <td>{b.ch}</td>
                    <td className="num">{b.lead}d</td>
                    <td><span className={statusCls(b.refund ? "Pending" : "Verified")}>{b.refund ? "yes" : "no"}</span></td>
                    <td className="num" style={{ fontWeight: 800, color: b.score >= 40 ? "var(--color-hot-700)" : undefined }}>{b.score}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <RevDecisionList decisions={decisions} />
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="What the engine uses" th="เครื่องใช้ข้อมูลอะไร" /></h5>
          <p className="text-muted" style={{ fontSize: 13 }}>
            <T
              en="Channel, lead time, refundable flag, price vs the guest’s last stays, and house history. Seeded scores — not a live LightGBM model."
              th="ช่องทาง lead time คืนเงินได้ ราคาเทียบสามครั้งก่อน และประวัติบ้าน คะแนนจำลอง — ไม่ใช่โมเดล LightGBM จริง"
            />
          </p>
          <p className="text-muted" style={{ fontSize: 13, marginTop: 12 }}>
            <T
              en="Lim is 0.67 of a room-night for Friday wash. Engine 10 may overbook against him. Do not list the same room at BAR until he cancels."
              th="Lim นับเป็น 0.67 คืนสำหรับห้องที่อาจว่างวันศุกร์ เครื่อง 10 ขายเกินทับเขาได้ อย่าปล่อยห้องเดียวกันที่ BAR จนกว่าเขายกเลิก"
            />
          </p>
        </aside>
      </div>
    </div>
  );
}
