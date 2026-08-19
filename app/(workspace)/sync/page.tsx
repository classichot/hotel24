"use client";

import { DistNav } from "@/components/DistNav";
import { PageHead, statusCls } from "@/components/PageHead";
import { PAY_KINDS, RECONCILE_SEED, healthTone, jobLabel } from "@/lib/ota";
import { thb } from "@/lib/format";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function SyncPage() {
  const {
    otaChannels, jobs, inbound, retryJob, receiveWebhook, applyModification, applyCancellation,
    runReconcile, reconcile, tripActual, pauseAgoda, forceAgoda, lang,
  } = useStore();
  const live = otaChannels.filter((c) => c.status === "connected" || c.status === "paused");
  const openJobs = jobs.filter((j) => j.status !== "complete").length;
  const agoda = otaChannels.find((c) => c.id === "agoda");

  return (
    <div>
      <PageHead
        code="M-02d · OTA Sync Service"
        kickerEn="Never call the provider from the browser"
        kickerTh="ห้ามยิงผู้ให้บริการจากเบราว์เซอร์"
        titleEn="Sync, queue, health"
        titleTh="ซิงก์ คิว และสุขภาพช่องทาง"
        subEn="Frontend → HOTEL24 API → reservation / inventory DB → OTA Sync Service → white-label connector → OTAs. Queue, retry, reconcile, alert."
        subTh="หน้าจอ → API ของ HOTEL24 → ฐานจอง/ห้อง → บริการซิงก์ OTA → ตัวเชื่อม white-label → OTA มีคิว retry กระทบยอด และเตือน"
        actions={
          <>
            <button className="btn btn-primary" onClick={receiveWebhook}><T en="Simulate Agoda booking" th="จำลองจองจาก Agoda" /></button>
            <button className="btn btn-secondary" onClick={runReconcile} disabled={reconcile === "resolved"}><T en="Run reconciliation" th="กระทบยอดห้อง" /></button>
          </>
        }
      />
      <DistNav />

      {agoda && agoda.pendingUpdates > 0 && agoda.status !== "paused" && (
        <div className="callout" style={{ marginTop: 16 }}>
          <strong><T en="Agoda inventory has not successfully synchronized for 12 minutes." th="ห้องบน Agoda ซิงก์ไม่สำเร็จมา 12 นาที" /></strong>{" "}
          <T en="HOTEL24 can pause extra rate changes and retry." th="HOTEL24 หยุดดันราคาเพิ่มแล้ว retry ได้" />
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button className="btn btn-primary" onClick={forceAgoda}><T en="Retry now" th="retry ตอนนี้" /></button>
            <button className="btn btn-secondary" onClick={pauseAgoda}><T en="Pause extra pushes" th="หยุดดันเพิ่ม" /></button>
          </div>
        </div>
      )}

      <div className="stat-row" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div className="stat-cell">
          <div className="stat-label"><T en="Queue open" th="งานในคิว" /></div>
          <div className="stat-val" style={{ color: openJobs ? "var(--color-hot-700)" : undefined }}>{openJobs}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Inbound events" th="เหตุการณ์เข้า" /></div>
          <div className="stat-val">{inbound.length}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Trip.com vs HOTEL24" th="Trip.com กับ HOTEL24" /></div>
          <div className="stat-val" style={{ fontSize: 26 }}>{tripActual} / 3</div>
          <div className="stat-hint">{reconcile === "resolved" ? <T en="Resolved" th="แก้แล้ว" /> : <T en="Mismatch" th="ไม่ตรง" />}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Reconcile" th="กระทบยอด" /></div>
          <div className="stat-val" style={{ fontSize: 22 }}>{reconcile === "running" ? "…" : reconcile === "resolved" ? "OK" : "Open"}</div>
        </div>
      </div>

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h"><T en="Connection health" th="สุขภาพการเชื่อม" /></h5>
          <div className="health-grid">
            {live.map((c) => (
              <div key={c.id} className="health-card">
                <span className={`health-dot ${healthTone(c.health, c.status)}`} />
                <strong>{c.name}</strong>
                <span className="health-pct">{c.health}%</span>
                <div className="text-muted" style={{ fontSize: 11 }}>{c.lastSync} · {c.pendingUpdates} <T en="pending" th="รอคิว" /></div>
              </div>
            ))}
          </div>

          <h5 className="sec-h" style={{ marginTop: 24 }}><T en="Event queue" th="คิวงาน" /></h5>
          <p className="text-muted" style={{ fontSize: 12, marginBottom: 8 }}>
            <T en="Hotel change → HOTEL24 DB → queue → worker → connector. Rate-limited and batched." th="โรงแรมเปลี่ยน → ฐาน HOTEL24 → คิว → ตัวทำงาน → ตัวเชื่อม จำกัดเรทและส่งเป็นชุด" />
          </p>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th><T en="Kind" th="ชนิด" /></th>
                  <th><T en="Channel" th="ช่องทาง" /></th>
                  <th><T en="Payload" th="รายการ" /></th>
                  <th><T en="State" th="สถานะ" /></th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {jobs.map((j) => (
                  <tr key={j.id}>
                    <td>{j.kind}</td>
                    <td>{j.channel}</td>
                    <td>
                      {lang === "th" ? j.payloadTh : j.payload}
                      <div className="text-muted" style={{ fontSize: 11 }}>{j.attempts} <T en="attempts" th="ครั้ง" /> · {j.age}</div>
                    </td>
                    <td><span className={statusCls(jobLabel(j.status))}>{jobLabel(j.status)}</span></td>
                    <td>
                      {j.status !== "complete" && (
                        <button className="btn btn-secondary" onClick={() => (j.id === "q4" ? runReconcile() : retryJob(j.id))}>
                          <T en="Retry" th="ลองใหม่" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h5 className="sec-h" style={{ marginTop: 24 }}><T en="Reservation receiver" th="ตัวรับการจอง" /></h5>
          <p className="text-muted" style={{ fontSize: 12, marginBottom: 8 }}>
            <T en="Guest books Agoda → Agoda → connector webhook → HOTEL24 creates the reservation, reduces inventory, pushes availability to every OTA." th="แขกจอง Agoda → Agoda → webhook → HOTEL24 สร้างการจอง ตัดห้อง แล้วดันความว่างไปทุก OTA" />
          </p>
          <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
            <button className="btn btn-secondary" onClick={applyModification}><T en="Apply Booking.com modification" th="ใช้การแก้ไขจาก Booking.com" /></button>
            <button className="btn btn-secondary" onClick={applyCancellation}><T en="Apply Agoda cancellation" th="ใช้การยกเลิกจาก Agoda" /></button>
          </div>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>HOTEL24</th>
                  <th>OTA</th>
                  <th><T en="Event" th="เหตุการณ์" /></th>
                  <th><T en="Guest / stay" th="แขก / ค้างคืน" /></th>
                  <th className="num"><T en="Net path" th="ยอด" /></th>
                  <th><T en="Pay" th="ชำระ" /></th>
                </tr>
              </thead>
              <tbody>
                {inbound.map((r) => (
                  <tr key={r.id + r.event + r.checkOut}>
                    <td style={{ fontWeight: 700 }}>{r.id}</td>
                    <td>
                      {r.otaId}
                      <div className="text-muted" style={{ fontSize: 11 }}>{r.channel}</div>
                    </td>
                    <td><span className={statusCls(r.event)}>{r.event}</span></td>
                    <td>
                      {r.guest}
                      <div className="text-muted" style={{ fontSize: 11 }}>{r.room} · {r.checkIn}–{r.checkOut} · {r.rate}</div>
                      <div className="text-muted" style={{ fontSize: 11 }}>{lang === "th" ? r.statusTh : r.status}</div>
                    </td>
                    <td className="num">{thb(r.price)}<div className="text-muted" style={{ fontSize: 11 }}>tax {thb(r.tax)} · comm {thb(r.commission)}</div></td>
                    <td>{r.pay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="col-aside">
          <h5 className="sec-h"><T en="Automatic reconciliation" th="กระทบยอดอัตโนมัติ" /></h5>
          <p className="text-muted" style={{ fontSize: 12, marginBottom: 10 }}>
            <T en="Garden Deluxe · 20 Aug · HOTEL24 availability = 3" th="ดีลักซ์สวน · 20 ส.ค. · HOTEL24 ว่าง = 3" />
          </p>
          {RECONCILE_SEED.map((r) => {
            const actual = r.channel === "Trip.com" ? tripActual : r.actual;
            const ok = actual === r.expected;
            return (
              <div key={r.channel} className="recon-row">
                <span className={`health-dot ${ok ? "ok" : "warn"}`} />
                <strong>{r.channel}</strong>
                <span className="text-muted">{ok ? <T en="match" th="ตรง" /> : <T en="mismatch" th="ไม่ตรง" />} · {actual}</span>
              </div>
            );
          })}
          {reconcile !== "resolved" && (
            <div className="callout" style={{ marginTop: 12 }}>
              <strong><T en="Mismatch detected" th="พบจำนวนไม่ตรง" /></strong>
              <p style={{ margin: "8px 0 0", fontSize: 13 }}>
                <T en="Trip.com expected 3, actual 2. Auto-resync, recheck, then alert if it still fails." th="Trip.com ควรเป็น 3 แต่เป็น 2 ส่งใหม่ ตรวจซ้ำ ถ้ายังไม่ตรงจึงเตือน" />
              </p>
              <button className="btn btn-primary" style={{ marginTop: 10 }} onClick={runReconcile} disabled={reconcile === "running"}>
                {reconcile === "running" ? <T en="Resyncing…" th="กำลังส่งใหม่…" /> : <T en="Auto-resync Trip.com" th="ส่งใหม่ไป Trip.com" />}
              </button>
            </div>
          )}
          {reconcile === "resolved" && (
            <div className="callout" style={{ marginTop: 12 }}>
              <strong><T en="Resolved." th="แก้แล้ว" /></strong>
              <p style={{ margin: "8px 0 0", fontSize: 13 }}><T en="Trip.com now shows 3. You do not have to worry whether OTA inventory is correct." th="Trip.com แสดง 3 แล้ว ไม่ต้องมานั่งลุ้นว่าห้องบน OTA ถูกหรือไม่" /></p>
            </div>
          )}

          <h5 className="sec-h" style={{ marginTop: 24 }}><T en="Payments — no raw cards" th="การชำระ — ไม่เก็บเลขบัตร" /></h5>
          {PAY_KINDS.map((p) => (
            <div key={p.id} className="pay-row">
              <strong>{lang === "th" ? p.th : p.en}</strong>
              <div className="text-muted" style={{ fontSize: 12 }}><T en={p.pci} th={p.pciTh} /></div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
