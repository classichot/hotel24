"use client";

import Link from "next/link";
import { PMS_SOURCES, SWITCH_FLAGS, SWITCH_SAMPLE, SWITCH_STEPS, type PmsSource } from "@/lib/migrate";
import { PageHead, statusCls } from "@/components/PageHead";
import { thb } from "@/lib/format";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function SwitchPage() {
  const { switchSource, setSwitchSource, switchStatus, switchStep, startSwitch, resetSwitch, lang } = useStore();
  const src = PMS_SOURCES[switchSource];
  const running = switchStatus === "running";
  const done = switchStatus === "done";
  const pct = switchStep < 0 ? 0 : Math.round(((switchStep + 1) / SWITCH_STEPS.length) * 100);
  const sources = Object.keys(PMS_SOURCES) as PmsSource[];

  return (
    <div>
      <PageHead
        code="M-00 · Switch · Cloudbeds / Little Hotelier"
        kickerEn="One button"
        kickerTh="ปุ่มเดียว"
        titleEn="Switch to HOTEL24"
        titleTh="ย้ายมา HOTEL24"
        subEn="Move rooms, rates, OTA mappings, reservations, guests and folios from Cloudbeds or Little Hotelier. One button. HOTEL24 becomes the system of record."
        subTh="ย้ายห้อง ราคา mapping OTA การจอง แขก และโฟลิโอจาก Cloudbeds หรือ Little Hotelier ปุ่มเดียว HOTEL24 เป็นระบบจริง"
        actions={
          done ? (
            <>
              <Link href="/reservations" className="btn btn-primary"><T en="Open calendar" th="เปิดปฏิทิน" /></Link>
              <button className="btn btn-secondary" onClick={resetSwitch}><T en="Run again" th="ทำอีกครั้ง" /></button>
            </>
          ) : null
        }
      />

      <div className="callout" style={{ marginTop: 16 }}>
        <strong><T en="You do not re-type the hotel." th="ไม่ต้องคีย์โรงแรมใหม่" /></strong>{" "}
        <T
          en="HOTEL24 reads the old PMS over API, Shield checks duplicates and unmapped rooms, then the channel manager points here. The old PMS is left read-only for 30 days as an archive."
          th="HOTEL24 อ่านระบบเดิมผ่าน API, Shield ตรวจจองซ้ำและห้องที่ยังไม่ map แล้วตัวจัดการช่องทางชี้มาที่นี่ ระบบเดิมเหลือโหมดอ่านอย่างเดียว 30 วันเป็นคลัง"
        />
      </div>

      <div className="pms-pick">
        {sources.map((id) => {
          const p = PMS_SOURCES[id];
          const on = switchSource === id;
          return (
            <button
              key={id}
              type="button"
              className={`pms-card${on ? " on" : ""}`}
              disabled={running}
              onClick={() => setSwitchSource(id)}
            >
              <div className="pms-card-kicker">{p.maker}</div>
              <h3>{p.name}</h3>
              <p><T en={p.note} th={p.noteTh} /></p>
              <div className="pms-meta">
                {p.propertyId} · {p.rooms} <T en="rooms" th="ห้อง" /> · {p.historyYears} <T en="history" th="ประวัติ" />
              </div>
            </button>
          );
        })}
      </div>

      <div className="switch-hero">
        <div>
          <div className="page-kicker"><T en="Source" th="ระบบต้นทาง" /> · {src.name}</div>
          <div className="switch-property">{src.property}</div>
          <div className="text-muted" style={{ marginTop: 4 }}>{src.propertyId}</div>
        </div>
        <button
          className="btn btn-primary switch-go"
          disabled={running || done}
          onClick={startSwitch}
        >
          {running
            ? <T en={`Moving ${src.name}… ${pct}%`} th={`กำลังย้าย ${src.name}… ${pct}%`} />
            : done
              ? <T en={`${src.name} moved`} th={`ย้าย ${src.name} แล้ว`} />
              : <T en={`Move ${src.name} data to HOTEL24`} th={`ย้ายข้อมูล ${src.name} มา HOTEL24`} />}
        </button>
      </div>

      <div className="stat-row" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        {[
          { l: "Rooms / types", lt: "ห้อง / ประเภท", v: `${src.rooms} / ${src.types}` },
          { l: "Reservations", lt: "การจอง", v: String(src.reservations), s: `${src.roomNights} RN` },
          { l: "Guests", lt: "แขก", v: String(src.guests) },
          { l: "Open deposits", lt: "มัดจำค้าง", v: thb(src.deposits) },
        ].map((k) => (
          <div key={k.l} className="stat-cell">
            <div className="stat-label"><T en={k.l} th={k.lt} /></div>
            <div className="stat-val" style={{ fontSize: 26 }}>{k.v}</div>
            {k.s && <div className="stat-hint">{k.s}</div>}
          </div>
        ))}
      </div>

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h"><T en="What the button does" th="ปุ่มนี้ทำอะไรบ้าง" /></h5>
          <ol className="switch-steps">
            {SWITCH_STEPS.map((step, i) => {
              const state = done || switchStep > i ? "done" : switchStep === i && running ? "on" : "wait";
              return (
                <li key={step.id} className={`switch-step ${state}`}>
                  <span className="switch-n">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <strong><T en={step.en} th={step.th} /></strong>
                    <span className="text-muted"><T en={step.detail} th={step.detailTh} /></span>
                  </span>
                  <span className={state === "done" ? "tag tag-neutral" : state === "on" ? "tag tag-accent" : "tag tag-outline"}>
                    {state === "done" ? <T en="Moved" th="ย้ายแล้ว" /> : state === "on" ? <T en="Moving" th="กำลังย้าย" /> : <T en="Queued" th="รอคิว" />}
                  </span>
                </li>
              );
            })}
          </ol>
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="Records in this move" th="รายการที่ย้าย" /></h5>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th><T en="Kind" th="ชนิด" /></th>
                  <th><T en="In HOTEL24" th="ใน HOTEL24" /></th>
                </tr>
              </thead>
              <tbody>
                {SWITCH_SAMPLE[switchSource].map((r) => (
                  <tr key={r.item}>
                    <td className="text-muted">{r.kind}</td>
                    <td>
                      <strong>{r.item}</strong>
                      <div className="text-muted" style={{ fontSize: 11 }}>{r.src}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {(running && switchStep >= 7) || done ? (
            <div style={{ marginTop: 18 }}>
              <h5 className="sec-h" style={{ color: "var(--color-hot-700)" }}><T en="Shield on the import" th="Shield ตอนนำเข้า" /></h5>
              {SWITCH_FLAGS[switchSource].map((f) => (
                <div key={f.text} className="callout" style={{ marginBottom: 10 }}>
                  <span className={statusCls(f.sev)}>{f.sev}</span>
                  <p style={{ margin: "8px 0 0", fontSize: 13 }}><T en={f.text} th={f.textTh} /></p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted" style={{ fontSize: 13, marginTop: 16 }}>
              <T
                en="Excel, paper and LINE chats can be added after the PMS cut-over. This button is the Cloudbeds / Little Hotelier move."
                th="Excel กระดาษ และแชท LINE เพิ่มได้หลังตัดสลับ ปุ่มนี้ย้ายจาก Cloudbeds / Little Hotelier"
              />
            </p>
          )}
          {done && (
            <div className="callout" style={{ marginTop: 12 }}>
              <strong><T en="Cut over complete." th="ตัดสลับเสร็จแล้ว" /></strong>
              <p style={{ margin: "8px 0 0", fontSize: 13 }}>
                {lang === "th"
                  ? `${src.name} เป็นคลังอ่านอย่างเดียว 30 วัน · ตัวเชื่อมช่องทางชี้มาที่ HOTEL24 · การจองใหม่ไม่เข้า ${src.name}`
                  : `${src.name} is a 30-day read-only archive. Channel manager now points at HOTEL24. New reservations do not land in ${src.name}.`}
              </p>
              <p style={{ margin: "10px 0 0", fontSize: 13 }}>
                <T en="One-day path:" th="ย้ายในหนึ่งวัน:" />{" "}
                <Link href="/mapping"><T en="Map rooms/rates" th="map ห้อง/เรท" /></Link>
                {" · "}
                <Link href="/channels"><T en="Booking / Agoda / Expedia" th="Booking / Agoda / Expedia" /></Link>
                {" · "}
                <Link href="/inventory"><T en="Validate inventory" th="ตรวจห้องคงเหลือ" /></Link>
                {" · "}
                <Link href="/sync"><T en="Reconcile OTAs" th="กระทบยอด OTA" /></Link>
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
