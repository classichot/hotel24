"use client";

import { PageHead } from "@/components/PageHead";
import { Phase2Nav } from "@/components/Phase2Nav";
import { RevDecisionList } from "@/components/RevDecisionList";
import { T } from "@/lib/i18n";
import { ALLOC_STATES, REV_DECISIONS } from "@/lib/revenueos";
import { useStore } from "@/lib/store";

export default function RevAllocPage() {
  const { allotment } = useStore();
  const decisions = REV_DECISIONS.filter((d) => d.id === "ros-alloc-booking");
  return (
    <div>
      <PageHead
        code="ROS-15 · Engine 13"
        kickerEn="13 · Channel Allocation Engine"
        kickerTh="13 · เครื่องจัดสรรช่องทาง"
        titleEn="Who holds the last rooms"
        titleTh="ใครกันห้องท้าย"
        subEn="How many rooms Booking / Agoda / Direct may hold as demand compresses. Last rooms go to the highest Net ADR. Booking stays open."
        subTh="Booking / Agoda / จองตรง กันห้องได้กี่ห้องเมื่อตลาดบีบ ห้องท้ายไปช่อง Net ADR สูงสุด Booking ยังเปิด"
      />
      <Phase2Nav />

      <div className="stat-row" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div className="stat-cell">
          <div className="stat-label">Booking.com</div>
          <div className="stat-val">{allotment.booking ?? 12}</div>
          <div className="stat-hint"><T en="Live allotment" th="จัดสรรจริง" /></div>
        </div>
        <div className="stat-cell">
          <div className="stat-label">Direct</div>
          <div className="stat-val" style={{ color: "var(--color-accent-700)" }}>{allotment.direct ?? 14}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label">Expedia</div>
          <div className="stat-val">{allotment.expedia ?? 4}</div>
          <div className="stat-hint"><T en="Closed in compression" th="ปิดเมื่อตลาดบีบ" /></div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Close every OTA?" th="ปิดทุก OTA?" /></div>
          <div className="stat-val" style={{ fontSize: 22 }}>No</div>
        </div>
      </div>

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h">13 · <T en="Allocation by market state" th="จัดสรรตามสภาวะตลาด" /></h5>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th><T en="State" th="สภาวะ" /></th>
                  <th className="num">Booking</th>
                  <th className="num">Agoda</th>
                  <th className="num">Expedia</th>
                  <th className="num">Direct</th>
                  <th><T en="Rule" th="กฎ" /></th>
                </tr>
              </thead>
              <tbody>
                {ALLOC_STATES.map((s) => (
                  <tr key={s.state} style={{ background: "pick" in s && s.pick ? "color-mix(in srgb, var(--color-accent) 12%, transparent)" : undefined }}>
                    <td style={{ fontWeight: 800 }}>{s.state}</td>
                    <td className="num">{s.booking}</td>
                    <td className="num">{s.agoda}</td>
                    <td className="num">{s.expedia}</td>
                    <td className="num" style={{ fontWeight: 800, color: "var(--color-accent-700)" }}>{s.direct}</td>
                    <td className="text-muted" style={{ fontSize: 12 }}>{s.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <RevDecisionList decisions={decisions} />
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="Live house allotment" th="จัดสรรบ้านตอนนี้" /></h5>
          {Object.entries(allotment).map(([k, n]) => (
            <div key={k} className="ctx-row">
              <span>{k}</span>
              <strong style={{ color: k === "direct" ? "var(--color-accent-700)" : undefined }}>{n}</strong>
            </div>
          ))}
          <p className="text-muted" style={{ fontSize: 13, marginTop: 12 }}>
            <T
              en="Compression pick: Booking 12→8, Direct 14→18. Guardian: never close every distribution channel at once."
              th="เลือกตอนตลาดบีบ: Booking 12→8 จองตรง 14→18 Guardian: ห้ามปิดทุกช่องทางพร้อมกัน"
            />
          </p>
        </aside>
      </div>
    </div>
  );
}
