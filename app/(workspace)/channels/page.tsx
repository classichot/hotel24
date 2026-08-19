"use client";

import { CHANNELS, CHANNEL_STATUS, SHIELD_SEED } from "@/lib/model";
import { PageHead, statusCls } from "@/components/PageHead";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import Link from "next/link";

export default function ChannelsPage() {
  const { mappings, fixLoftMapping, forceAgoda, agodaRetry, shieldClosed, closeShield, audit, switchStatus, switchSource } = useStore();

  return (
    <div>
      <PageHead
        code="M-02 · Channel Manager · via white-label connectivity"
        kickerEn="Do not certify every OTA yourself"
        kickerTh="ไม่ต้องไป certification ทีละ OTA"
        titleEn="Channel manager"
        titleTh="ตัวจัดการช่องทาง"
        subEn="HOTEL24 PMS → Channex white-label → Booking.com, Agoda, Expedia, Airbnb, Trip.com. Inventory, rates, restrictions, cancellations and reservations in one map."
        subTh="HOTEL24 PMS → ผู้ให้บริการ connectivity แบบ white-label → Booking.com, Agoda, Expedia, Airbnb, Trip.com"
        actions={<span className="tag tag-neutral">Channex · 60+ channels</span>}
      />

      {switchStatus === "done" && (
        <div className="callout" style={{ marginTop: 16 }}>
          <strong><T en="Channel manager now writes from HOTEL24." th="ตัวจัดการช่องทางเขียนจาก HOTEL24 แล้ว" /></strong>{" "}
          <T
            en={`${switchSource === "hotelier" ? "Little Hotelier" : "Cloudbeds"} mappings were imported. New ARI does not go back to the old PMS.`}
            th={`${switchSource === "hotelier" ? "Little Hotelier" : "Cloudbeds"} mapping ถูกนำเข้าแล้ว ARI ใหม่ไม่กลับไประบบเดิม`}
          />
          {" "}<Link href="/switch"><T en="Switch log" th="บันทึกการย้าย" /> →</Link>
        </div>
      )}

      <div className="stat-row" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        <div className="stat-cell">
          <div className="stat-label"><T en="Connected" th="เชื่อมแล้ว" /></div>
          <div className="stat-val">5</div>
          <div className="stat-hint">Booking · Agoda · Expedia · Airbnb · Direct</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Pending onboarding" th="รอ onboarding" /></div>
          <div className="stat-val">1</div>
          <div className="stat-hint">Trip.com · est. 2 weeks</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Shield open" th="Shield ที่ยังเปิด" /></div>
          <div className="stat-val" style={{ color: "var(--color-accent-700)" }}>{SHIELD_SEED.filter((s) => !shieldClosed[s.id]).length}</div>
          <div className="stat-hint"><T en="Unmapped loft + delayed ARI" th="ลอฟท์ยังไม่ map + ARI ช้า" /></div>
        </div>
      </div>

      <div className="split-main" style={{ marginTop: 8 }}>
        <section className="col-pad border-r">
          <h5 className="sec-h"><T en="Channels" th="ช่องทาง" /></h5>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th><T en="Channel" th="ช่องทาง" /></th>
                  <th><T en="Status" th="สถานะ" /></th>
                  <th><T en="Sync" th="ซิงก์" /></th>
                  <th><T en="Mapping" th="การจับคู่" /></th>
                  <th><T en="Note" th="หมายเหตุ" /></th>
                </tr>
              </thead>
              <tbody>
                {CHANNEL_STATUS.map((c) => (
                  <tr key={c.name}>
                    <td>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                        <i style={{ width: 10, height: 10, background: CHANNELS[c.k].ink, display: "inline-block" }} />
                        <strong>{c.name}</strong>
                      </span>
                    </td>
                    <td><span className={statusCls(c.status)}>{c.status}</span></td>
                    <td className="text-muted" style={{ fontSize: 12 }}>{c.name === "Agoda" && agodaRetry ? "synced 1.4s ago" : c.sync}</td>
                    <td style={{ fontSize: 13 }}>{c.mapped}</td>
                    <td style={{ fontSize: 12, color: c.noteHot && !(c.name === "Agoda" && agodaRetry) ? "var(--color-accent-700)" : undefined }}>
                      {c.name === "Agoda" && agodaRetry ? "ARI ack received" : c.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h5 className="sec-h" style={{ marginTop: 28 }}><T en="Room / rate mapping" th="จับคู่ห้องและเรท" /></h5>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>HOTEL24</th>
                  <th><T en="Channel" th="ช่องทาง" /></th>
                  <th><T en="Channel room / rate plan" th="ห้อง / เรทบนช่องทาง" /></th>
                  <th><T en="Inventory" th="ห้องคงเหลือ" /></th>
                  <th><T en="State" th="สถานะ" /></th>
                </tr>
              </thead>
              <tbody>
                {mappings.map((m) => (
                  <tr key={m.id}>
                    <td style={{ fontWeight: 700 }}>{m.room}</td>
                    <td>{m.ch}</td>
                    <td>{m.plan}</td>
                    <td className="num">{m.inv}</td>
                    <td>
                      <span className={statusCls(m.state)}>{m.state}</span>
                      {m.state === "Unmapped" && (
                        <button className="btn btn-primary" style={{ marginLeft: 8 }} onClick={fixLoftMapping}><T en="Map now" th="map เลย" /></button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="col-aside">
          <div>
            <h5 className="sec-h" style={{ color: "var(--color-accent-700)" }}><T en="Overbooking Shield" th="ป้องกันขายเกิน" /></h5>
            {SHIELD_SEED.filter((s) => !shieldClosed[s.id]).map((s) => (
              <div key={s.id} className="callout" style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                  <span className={statusCls(s.sev)}>{s.sev}</span>
                  <span className="text-muted" style={{ fontSize: 11 }}>{s.when}</span>
                </div>
                <div style={{ fontSize: 13 }}>{s.text}</div>
                {s.id === "s1" && <button className="btn btn-primary" style={{ marginTop: 10 }} onClick={fixLoftMapping}><T en="Fix mapping and close tonight" th="แก้ mapping และปิดคืนนี้" /></button>}
                {s.id === "s2" && <button className="btn btn-primary" style={{ marginTop: 10 }} onClick={forceAgoda}><T en="Force re-push" th="ดัน ARI ใหม่" /></button>}
                {s.id === "s3" && <button className="btn btn-secondary" style={{ marginTop: 10 }} onClick={() => closeShield("s3")}><T en="View audit log" th="ดู audit log" /></button>}
              </div>
            ))}
            {SHIELD_SEED.every((s) => shieldClosed[s.id]) && (
              <div className="text-muted" style={{ fontSize: 13 }}><T en="No open inventory conflicts." th="ไม่มีห้องขัดกันที่ยังเปิดอยู่" /></div>
            )}
            <Link href="/rates" className="btn btn-ghost" style={{ paddingLeft: 0, marginTop: 8 }}><T en="Open rate manager" th="เปิดตัวจัดการราคา" /> →</Link>
          </div>
          <div>
            <h5 className="sec-h"><T en="Audit log" th="บันทึกการเปลี่ยนแปลง" /></h5>
            <div style={{ borderTop: "2px solid var(--color-divider)" }}>
              {audit.slice(0, 8).map((e, i) => (
                <div key={i} className="audit-row">
                  <div className="text-muted" style={{ fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase" }}>{e.t} · {e.kind}</div>
                  <div style={{ fontWeight: 700, fontSize: 12 }}>{e.who}</div>
                  <div style={{ fontSize: 12 }}>{e.what}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
