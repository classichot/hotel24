"use client";

import Link from "next/link";
import { SHIELD_SEED } from "@/lib/model";
import { DistNav } from "@/components/DistNav";
import { PageHead, statusCls } from "@/components/PageHead";
import { CONNECTORS, healthTone, type OtaId } from "@/lib/ota";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

function connLabel(status: string) {
  if (status === "connected") return "Connected";
  if (status === "pending") return "Pending";
  if (status === "paused") return "Paused";
  return "Connect";
}

export default function ChannelsPage() {
  const {
    otaChannels, selectedOta, setSelectedOta, connectChannel, syncNow, pauseAgoda,
    fixLoftMapping, forceAgoda, shieldClosed, audit, switchStatus, switchSource, lang,
  } = useStore();
  const ch = otaChannels.find((c) => c.id === selectedOta) ?? otaChannels[0];
  const live = otaChannels.filter((c) => c.status === "connected" || c.status === "paused").length;
  const phase1 = otaChannels.filter((c) => c.phase === 1 && (c.status === "connected" || c.status === "paused")).length;
  const tone = healthTone(ch.health, ch.status);

  return (
    <div>
      <PageHead
        code="M-02 · OTA Connectivity Service · white-label channel manager"
        kickerEn="Not a travel Demand API"
        kickerTh="ไม่ใช่ Demand API ของ OTA"
        titleEn="Connection Center"
        titleTh="ศูนย์เชื่อมช่องทาง"
        subEn="HOTEL24 is the system of record. Rooms, rates and reservations live here. A white-label channel manager (Channex behind the scenes) talks to Booking.com, Agoda, Expedia and the rest. The hotel never leaves this screen."
        subTh="HOTEL24 เป็นระบบจริง ห้อง ราคา และการจองอยู่ที่นี่ ผู้ให้บริการ connectivity แบบ white-label คุยกับ Booking.com, Agoda, Expedia โรงแรมไม่ต้องออกจากหน้านี้"
        actions={<span className="tag tag-neutral"><T en="61+ channels · 1 integration" th="61+ ช่องทาง · เชื่อมครั้งเดียว" /></span>}
      />
      <DistNav />

      {switchStatus === "done" && (
        <div className="callout" style={{ marginTop: 16 }}>
          <strong><T en="Cut over complete." th="ตัดสลับแล้ว" /></strong>{" "}
          <T
            en={`${switchSource === "hotelier" ? "Little Hotelier" : "Cloudbeds"} is archive-only. Booking.com, Agoda and Expedia now write from HOTEL24.`}
            th={`${switchSource === "hotelier" ? "Little Hotelier" : "Cloudbeds"} เป็นคลังอย่างเดียว Booking.com, Agoda และ Expedia เขียนจาก HOTEL24 แล้ว`}
          />
        </div>
      )}

      <div className="stat-row" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div className="stat-cell">
          <div className="stat-label"><T en="Live OTAs" th="OTA ที่ทำงาน" /></div>
          <div className="stat-val">{live}</div>
          <div className="stat-hint"><T en="of 9 in the Thailand roadmap" th="จาก 9 ช่องทางในแผนไทย" /></div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Phase 1 (mandatory)" th="เฟส 1 (ต้องมี)" /></div>
          <div className="stat-val">{phase1}/3</div>
          <div className="stat-hint">Booking · Agoda · Expedia</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Shield open" th="Shield ที่ยังเปิด" /></div>
          <div className="stat-val" style={{ color: "var(--color-hot-700)" }}>{SHIELD_SEED.filter((s) => !shieldClosed[s.id]).length}</div>
          <div className="stat-hint"><T en="Unmapped loft + delayed ARI" th="ลอฟท์ยังไม่ map + ARI ช้า" /></div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Connector" th="ตัวเชื่อม" /></div>
          <div className="stat-val" style={{ fontSize: 22 }}>Channex</div>
          <div className="stat-hint"><T en="Invisible to the hotel" th="โรงแรมไม่เห็นชื่อนี้" /></div>
        </div>
      </div>

      <div className="split-main" style={{ marginTop: 8 }}>
        <section className="col-pad border-r">
          <h5 className="sec-h"><T en="Channels" th="ช่องทาง" /></h5>
          <div className="ota-list">
            {otaChannels.map((c) => {
              const t = healthTone(c.health, c.status);
              return (
                <button
                  key={c.id}
                  type="button"
                  className={`ota-row${selectedOta === c.id ? " on" : ""}`}
                  onClick={() => setSelectedOta(c.id)}
                >
                  <span className={`health-dot ${t}`} />
                  <span>
                    <strong>{c.name}</strong>
                    <span className="text-muted" style={{ display: "block", fontSize: 11 }}>
                      {c.status === "connected" || c.status === "paused"
                        ? `${c.roomsMapped}/${c.roomsTotal} rooms · ${c.ratesMapped}/${c.ratesTotal} rates`
                        : lang === "th" ? c.noteTh : c.note}
                    </span>
                  </span>
                  <span className={statusCls(connLabel(c.status))}>{connLabel(c.status)}</span>
                  {(c.status === "connected" || c.status === "paused") && (
                    <span className="ota-health-n">{c.health}%</span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        <aside className="col-aside">
          <h5 className="sec-h">{ch.name}</h5>
          <div className="conn-detail">
            <div><span><T en="Status" th="สถานะ" /></span><strong>{connLabel(ch.status)}</strong></div>
            <div><span><T en="Last sync" th="ซิงก์ล่าสุด" /></span><strong>{ch.lastSync}</strong></div>
            <div><span><T en="Rooms mapped" th="ห้องที่ map" /></span><strong>{ch.roomsMapped}/{ch.roomsTotal}</strong></div>
            <div><span><T en="Rate plans mapped" th="เรทที่ map" /></span><strong>{ch.ratesMapped}/{ch.ratesTotal}</strong></div>
            <div><span><T en="Inventory" th="ห้องคงเหลือ" /></span><strong>{ch.inventory ? "Synced" : "—"}</strong></div>
            <div><span><T en="Rates" th="ราคา" /></span><strong>{ch.rates ? "Synced" : "—"}</strong></div>
            <div><span><T en="Restrictions" th="ข้อจำกัด" /></span><strong>{ch.restrictions ? "Synced" : "—"}</strong></div>
            <div><span><T en="Reservations" th="การจอง" /></span><strong>{ch.reservations ? "Connected" : "—"}</strong></div>
            <div><span><T en="Last booking" th="จองล่าสุด" /></span><strong>{ch.lastBooking} · {ch.lastBookingAt}</strong></div>
          </div>
          <p className="text-muted" style={{ fontSize: 13, marginTop: 12 }}><T en={ch.note} th={ch.noteTh} /></p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
            {(ch.status === "connect" || ch.status === "pending") && (
              <button className="btn btn-primary" onClick={() => connectChannel(ch.id as OtaId)}>
                <T en={`Connect ${ch.name}`} th={`เชื่อม ${ch.name}`} />
              </button>
            )}
            {(ch.status === "connected" || ch.status === "paused") && (
              <button className="btn btn-secondary" onClick={() => syncNow(ch.id as OtaId)}><T en="Sync now" th="ซิงก์ตอนนี้" /></button>
            )}
            {ch.id === "agoda" && ch.pendingUpdates > 0 && ch.status !== "paused" && (
              <>
                <button className="btn btn-primary" onClick={forceAgoda}><T en="Force re-push" th="ดัน ARI ใหม่" /></button>
                <button className="btn btn-secondary" onClick={pauseAgoda}><T en="Pause extra rate pushes" th="หยุดดันราคาเพิ่ม" /></button>
              </>
            )}
            {ch.id === "expedia" && ch.roomsMapped < ch.roomsTotal && (
              <button className="btn btn-primary" onClick={fixLoftMapping}><T en="Map Family Loft" th="map แฟมิลี่ลอฟท์" /></button>
            )}
            <Link href="/mapping" className="btn btn-ghost" style={{ paddingLeft: 0 }}><T en="View mapping" th="ดูการจับคู่" /> →</Link>
            <Link href="/sync" className="btn btn-ghost" style={{ paddingLeft: 0 }}><T en="View logs" th="ดูบันทึก" /> →</Link>
          </div>

          {tone === "warn" && (
            <div className="callout" style={{ marginTop: 16 }}>
              <strong>{ch.name}</strong>
              <p style={{ margin: "8px 0 0", fontSize: 13 }}>
                {lang === "th"
                  ? `ซิงก์ ARI สำเร็จล่าสุด ${ch.lastSync}. มีอัปเดตรอ ${ch.pendingUpdates} รายการ.`
                  : `Last successful ARI sync: ${ch.lastSync}. ${ch.pendingUpdates} updates pending.`}
              </p>
            </div>
          )}

          <h5 className="sec-h" style={{ marginTop: 28 }}><T en="Overbooking Shield" th="ป้องกันขายเกิน" /></h5>
          {SHIELD_SEED.filter((s) => !shieldClosed[s.id]).map((s) => (
            <div key={s.id} className="callout" style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                <span className={statusCls(s.sev)}>{s.sev}</span>
                <span className="text-muted" style={{ fontSize: 11 }}>{s.when}</span>
              </div>
              <div style={{ fontSize: 13 }}>{s.text}</div>
              {s.id === "s1" && <button className="btn btn-primary" style={{ marginTop: 10 }} onClick={fixLoftMapping}><T en="Fix mapping and close tonight" th="แก้ mapping และปิดคืนนี้" /></button>}
              {s.id === "s2" && <button className="btn btn-primary" style={{ marginTop: 10 }} onClick={forceAgoda}><T en="Force re-push" th="ดัน ARI ใหม่" /></button>}
            </div>
          ))}

          <h5 className="sec-h" style={{ marginTop: 22 }}><T en="Provider (HOTEL24 only)" th="ผู้ให้บริการ (ทีม HOTEL24)" /></h5>
          <p className="text-muted" style={{ fontSize: 12, marginBottom: 10 }}>
            <T en="Hotels never see this. OTAConnector lets STAAH or DerbySoft replace Channex later." th="โรงแรมไม่เห็นส่วนนี้ OTAConnector ทำให้เปลี่ยนเป็น STAAH หรือ DerbySoft ได้ภายหลัง" />
          </p>
          {CONNECTORS.map((p) => (
            <div key={p.vendor} className="connector-row">
              <strong>{p.name}</strong>
              <span className={statusCls(p.status === "active" ? "Live" : p.status === "quote" ? "Pending" : "Connect")}>
                {p.status === "active" ? "Active" : p.status === "quote" ? "Quote" : "Future"}
              </span>
              <div className="text-muted" style={{ fontSize: 12 }}><T en={p.role} th={p.roleTh} /></div>
            </div>
          ))}

          <h5 className="sec-h" style={{ marginTop: 22 }}><T en="Audit" th="บันทึก" /></h5>
          {audit.slice(0, 6).map((e, i) => (
            <div key={i} className="audit-row">
              <div className="text-muted" style={{ fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase" }}>{e.t} · {e.kind}</div>
              <div style={{ fontWeight: 700, fontSize: 12 }}>{e.who}</div>
              <div style={{ fontSize: 12 }}>{e.what}</div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
