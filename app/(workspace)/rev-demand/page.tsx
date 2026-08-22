"use client";

import { PageHead, statusCls } from "@/components/PageHead";
import { RevenueNav } from "@/components/RevenueNav";
import { T } from "@/lib/i18n";
import { ACCELERATION, BOOKING_CURVE, COMPRESSION, COMP_SET, EVENTS, FORECAST, PICKUP } from "@/lib/revenueos";

export default function RevDemandPage() {
  return (
    <div>
      <PageHead
        code="ROS-02 · Demand Brain"
        kickerEn="Who will book, when, and how much?"
        kickerTh="ใครจะจอง เมื่อไหร่ และเท่าไหร่"
        titleEn="Demand Brain"
        titleTh="สมองดีมานด์"
        subEn="Forecast, booking curve, pickup velocity, competitor signals, events and compression. Ensemble of pace + event + competitor + seasonal baseline — not a live LightGBM."
        subTh="พยากรณ์ เส้นโค้งจอง ความเร็วคู่แข่ง อีเวนต์ และการบีบตลาด ชุดรวมจังหวะ + อีเวนต์ + คู่แข่ง + ฤดูกาล — ไม่ใช่ LightGBM สด"
      />
      <RevenueNav />

      <div className="stat-row" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div className="stat-cell">
          <div className="stat-label"><T en="Acceleration" th="ความเร่งดีมานด์" /></div>
          <div className="stat-val">{ACCELERATION.score}</div>
          <div className="stat-hint"><T en={ACCELERATION.label} th={ACCELERATION.labelTh} /></div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Compression" th="ดัชนีบีบตลาด" /></div>
          <div className="stat-val" style={{ color: "var(--color-hot-700)" }}>{COMPRESSION.score}</div>
          <div className="stat-hint">{COMPRESSION.market} · {COMPRESSION.date}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="21 Aug status" th="สถานะ 21 ส.ค." /></div>
          <div className="stat-val" style={{ fontSize: 22 }}>94%</div>
          <div className="stat-hint">COMPRESSION</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="D-21 vs curve" th="D-21 เทียบเส้นโค้ง" /></div>
          <div className="stat-val" style={{ fontSize: 22 }}>+14pp</div>
          <div className="stat-hint">52% vs 38%</div>
        </div>
      </div>

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h"><T en="Demand forecast · hotel × date" th="พยากรณ์ดีมานด์ · โรงแรม × วันที่" /></h5>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th><T en="Arrival" th="วันเข้า" /></th>
                  <th className="num"><T en="Demand" th="ดีมานด์" /></th>
                  <th className="num"><T en="Rooms" th="ห้อง" /></th>
                  <th className="num">Occ</th>
                  <th><T en="Status" th="สถานะ" /></th>
                </tr>
              </thead>
              <tbody>
                {FORECAST.map((f) => (
                  <tr key={f.date}>
                    <td style={{ fontWeight: 700 }}>{f.date}</td>
                    <td className="num">{f.demand}</td>
                    <td className="num">{f.rooms}</td>
                    <td className="num">{f.occ}%</td>
                    <td><span className={statusCls(f.status === "compression" ? "High" : "Mapped")}>{f.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h5 className="sec-h" style={{ marginTop: 24 }}><T en="Booking curve · 22 Aug weekend" th="เส้นโค้งจอง · สุดสัปดาห์ 22 ส.ค." /></h5>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Lead</th>
                  <th className="num"><T en="Normal occ" th="เข้าพักปกติ" /></th>
                  <th className="num"><T en="Now" th="ตอนนี้" /></th>
                </tr>
              </thead>
              <tbody>
                {BOOKING_CURVE.map((c) => (
                  <tr key={c.d}>
                    <td>{c.d}</td>
                    <td className="num">{c.normal}%</td>
                    <td className="num" style={{ fontWeight: 800, color: c.current > c.normal ? "var(--color-accent-700)" : undefined }}>{c.current}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="Pickup velocity" th="ความเร็วการจอง" /></h5>
          {PICKUP.map((p) => (
            <div key={p.window} className="ctx-row">
              <span>{p.window}</span>
              <span><strong>{p.n}</strong> <span className="text-muted" style={{ fontSize: 11 }}>{p.vs}</span></span>
            </div>
          ))}
          <h5 className="sec-h" style={{ marginTop: 24 }}><T en="Comp set · last 12h" th="คู่แข่ง · 12 ชม.ล่าสุด" /></h5>
          {COMP_SET.map((c) => (
            <div key={c.name} className="ctx-row" style={{ alignItems: "flex-start" }}>
              <span>
                {c.name}
                <div className="text-muted" style={{ fontSize: 11 }}>{c.sold ? "Sold out" : `BAR ฿${c.bar.toLocaleString()}`}</div>
              </span>
              <strong style={{ color: c.move.startsWith("+") ? "var(--color-accent-700)" : undefined }}>{c.move}</strong>
            </div>
          ))}
          <h5 className="sec-h" style={{ marginTop: 24 }}><T en="Events" th="อีเวนต์" /></h5>
          {EVENTS.map((e) => (
            <div key={e.name} className="ctx-row" style={{ alignItems: "flex-start" }}>
              <span>
                <T en={e.name} th={e.nameTh} />
                <div className="text-muted" style={{ fontSize: 11 }}>{e.when} · {e.km} km · impact +{e.impact}%</div>
              </span>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
