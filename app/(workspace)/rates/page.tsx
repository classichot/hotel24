"use client";

import Link from "next/link";
import { RATE_DAYS, RATE_GRID, RECS_SEED } from "@/lib/model";
import { PageHead } from "@/components/PageHead";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function RatesPage() {
  const { recState, applyRec, dismissRec, aiMode, setAiMode } = useStore();
  const pending = RECS_SEED.filter((r) => (recState[r.id] ?? "pending") === "pending");

  return (
    <div>
      <PageHead
        code="M-03 · Rate Manager + AI Revenue · MVP"
        kickerEn="Killer feature"
        kickerTh="จุดเด่น"
        titleEn="Rate & AI Revenue"
        titleTh="ราคาห้องและ AI รายได้"
        subEn="Seasonal pricing, minimum stay, stop-sell, occupancy pricing — plus recommendations the owner can actually approve."
        subTh="ราคาตามฤดูกาล ขั้นต่ำการเข้าพัก ปิดขาย และราคาตามอัตราเข้าพัก — พร้อมคำแนะนำที่เจ้าของกดอนุมัติได้"
        actions={
          <div className="seg">
            <label className="seg-opt">
              <input type="radio" name="aimode" checked={aiMode === "recommend"} onChange={() => setAiMode("recommend")} />
              <span><T en="Recommend only" th="เสนออย่างเดียว" /></span>
            </label>
            <label className="seg-opt">
              <input type="radio" name="aimode" checked={aiMode === "auto"} onChange={() => setAiMode("auto")} />
              <span><T en="Auto-apply" th="ปรับให้อัตโนมัติ" /></span>
            </label>
          </div>
        }
      />

      <div className="callout" style={{ marginTop: 16 }}>
        <strong>{aiMode === "auto" ? <T en="Auto-apply is on — AI pushes rates and tells you after." th="โหมดปรับอัตโนมัติ — AI ดันราคาแล้วบอกทีหลัง" /> : <T en="Recommend only — nothing changes until you approve." th="เสนออย่างเดียว — ไม่เปลี่ยนจนกว่าคุณจะอนุมัติ" />}</strong>
        {" "}
        <T en="AI monitors occupancy, booking pace, holidays, seasonality and competitor pricing. It never hides the reason." th="AI ดูอัตราเข้าพัก จังหวะจอง วันหยุด ฤดูกาล และราคาคู่แข่ง และไม่ซ่อนเหตุผล" />
        {" "}
        <Link href="/autopilot"><T en="Open Revenue Autopilot" th="เปิดออโตไพลอตรายได้" /> →</Link>
      </div>

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h"><T en="AI recommendations" th="คำแนะนำจาก AI" /> · {pending.length} <T en="waiting" th="รออนุมัติ" /></h5>
          {RECS_SEED.map((r) => {
            const st = recState[r.id] ?? "pending";
            return (
              <article key={r.id} className="rec-card">
                <div className="rec-meta">
                  <span className="tag tag-accent">{r.kind}</span>
                  <span className="text-muted" style={{ fontSize: 12 }}>{r.when}</span>
                  <span className="rec-impact">{r.impact}</span>
                </div>
                <h4>{r.head}</h4>
                <div className="rec-rate">
                  <span>{r.from}</span>
                  <span>→</span>
                  <strong>{r.to}</strong>
                  <em>{r.delta}</em>
                </div>
                <p><T en={r.why} th={r.whyTh} /></p>
                {st === "pending" ? (
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn btn-primary" onClick={() => applyRec(r.id)}><T en="Apply to 6 channels" th="ใช้กับ 6 ช่องทาง" /></button>
                    <button className="btn btn-secondary" onClick={() => dismissRec(r.id)}><T en="Dismiss today" th="ไม่ใช้วันนี้" /></button>
                  </div>
                ) : (
                  <span className={st === "applied" ? "tag tag-accent" : "tag tag-neutral"}>
                    {st === "applied"
                      ? (aiMode === "auto" ? <T en="Auto-applied · pushed to 6 channels" th="ปรับให้อัตโนมัติ · ดัน 6 ช่องทาง" /> : <T en="Applied · pushed to 6 channels" th="ใช้แล้ว · ดัน 6 ช่องทาง" />)
                      : <T en="Dismissed · AI will not re-suggest today" th="ยกเลิกแล้ว · AI จะไม่เสนอซ้ำวันนี้" />}
                  </span>
                )}
              </article>
            );
          })}
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="7-day rate grid" th="ตารางราคา 7 วัน" /></h5>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th><T en="Type" th="ห้อง" /></th>
                  {RATE_DAYS.map((d) => <th key={d} className="num">{d.replace(/^\w+ /, "")}</th>)}
                </tr>
              </thead>
              <tbody>
                {RATE_GRID.map((row) => (
                  <tr key={row.name}>
                    <td style={{ fontWeight: 700, whiteSpace: "nowrap" }}>{row.name}</td>
                    {row.cells.map((c, i) => (
                      <td key={i} className="num" style={{
                        color: c[1] === 1 ? "var(--color-hot-700)" : c[1] === 2 ? "var(--color-neutral-600)" : undefined,
                        fontWeight: c[1] === 1 ? 800 : 400,
                        fontFamily: c[1] ? "var(--font-heading)" : undefined,
                      }}>{c[0]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted" style={{ fontSize: 12, marginTop: 12 }}>
            <T en="Accent cells are AI-touched: weekend lift, Agoda last-minute, 2-night minimum, stop-sell. Apply queues ARI through the sync worker — the rate grid does not call OTAs itself." th="ช่องสีส้มคือจุดที่ AI แตะ: ขึ้นสุดสัปดาห์, นาทีสุดท้าย Agoda, ขั้นต่ำ 2 คืน, ปิดขาย กดใช้แล้วเข้าคิว ARI ผ่านตัวซิงก์ ตารางราคายิง OTA เองไม่ได้" />
          </p>
          <Link href="/inventory" className="btn btn-ghost" style={{ paddingLeft: 0, marginTop: 8 }}><T en="Open inventory & ARI" th="เปิดห้องคงเหลือและ ARI" /> →</Link>
          <div className="callout" style={{ marginTop: 16 }}>
            <T en="Managed Revenue Service — let the HOTEL24 team run rates for you. Monthly fee or performance-based." th="บริการจัดการรายได้ — ให้ทีม HOTEL24 ดูแลราคาให้ คิดรายเดือนหรือตามผลงาน" />
          </div>
        </aside>
      </div>
    </div>
  );
}
