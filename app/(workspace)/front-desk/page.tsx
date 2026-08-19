"use client";

import { useState } from "react";
import { ARRIVALS_SEED, CHANNELS, DEPARTURES, PAYMENTS } from "@/lib/model";
import { PageHead, statusCls } from "@/components/PageHead";
import { thb } from "@/lib/format";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import Link from "next/link";

export default function FrontDeskPage() {
  const { checked, checkIn, collectDue, scanPassport, scanned } = useStore();
  const [open, setOpen] = useState<string | null>(null);
  const guest = ARRIVALS_SEED.find((a) => a.id === open);

  return (
    <div>
      <PageHead
        code="M-05 · Front Desk PMS · MVP"
        kickerEn="Check-in / out"
        kickerTh="เช็คอิน–เช็คเอาท์"
        titleEn="Front desk"
        titleTh="แผนกต้อนรับ"
        subEn="Room assignment, deposits, payments and guest profiles. Passport scan queues TM30 automatically."
        subTh="จัดห้อง มัดจำ ชำระเงิน และประวัติแขก · พาสปอร์ตเข้า TM30 อัตโนมัติ"
        actions={<Link href="/housekeeping" className="btn btn-secondary"><T en="Housekeeping board" th="กระดานแม่บ้าน" /></Link>}
      />

      <div className="stat-row" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        {PAYMENTS.map((p) => (
          <div key={p.what} className="stat-cell">
            <div className="stat-label">{p.what}</div>
            <div className="stat-val" style={{ fontSize: 22, color: p.amt < 0 ? "var(--color-hot-700)" : undefined }}>{thb(p.amt)}</div>
          </div>
        ))}
      </div>

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h"><T en="Arrivals today" th="แขกเข้าวันนี้" /></h5>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th><T en="Guest" th="แขก" /></th>
                  <th><T en="Channel" th="ช่องทาง" /></th>
                  <th><T en="Room" th="ห้อง" /></th>
                  <th className="num"><T en="Nights" th="คืน" /></th>
                  <th><T en="Balance" th="ยอดค้าง" /></th>
                  <th>ETA</th>
                  <th><T en="Docs" th="เอกสาร" /></th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {ARRIVALS_SEED.map((a) => {
                  const done = checked[a.id];
                  const docOk = a.docOk || scanned[a.id];
                  return (
                    <tr key={a.id} className={done ? "done-row" : undefined}>
                      <td>
                        <strong>{a.name}</strong>
                        <div className="text-muted" style={{ fontSize: 11 }}>{a.pax} · {a.res}</div>
                      </td>
                      <td>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                          <i style={{ width: 8, height: 8, background: CHANNELS[a.k].ink, display: "inline-block" }} />
                          {CHANNELS[a.k].en}
                        </span>
                      </td>
                      <td>{a.room}</td>
                      <td className="num">{a.nights}</td>
                      <td style={{ color: a.due > 0 ? "var(--color-hot-700)" : undefined, fontWeight: 700 }}>{a.bal}</td>
                      <td>{a.eta}</td>
                      <td><span className={statusCls(docOk ? "Ready" : "Awaiting scan")}>{docOk ? a.doc : "Scan needed · TM30"}</span></td>
                      <td>
                        {done ? <span className="tag tag-neutral"><T en="In house" th="เข้าพักแล้ว" /></span> : (
                          <button className="btn btn-primary" onClick={() => setOpen(a.id)}><T en="Check in" th="เช็คอิน" /></button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <h5 className="sec-h" style={{ marginTop: 28 }}><T en="Departures" th="แขกออก" /></h5>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th><T en="Guest" th="แขก" /></th>
                  <th><T en="Room" th="ห้อง" /></th>
                  <th><T en="Folio" th="โฟลิโอ" /></th>
                  <th><T en="Extras" th="เพิ่ม" /></th>
                  <th><T en="Status" th="สถานะ" /></th>
                </tr>
              </thead>
              <tbody>
                {DEPARTURES.map((d) => (
                  <tr key={d.name}>
                    <td style={{ fontWeight: 700 }}>{d.name}</td>
                    <td>{d.room}</td>
                    <td>{d.folio}</td>
                    <td className="text-muted">{d.extras}</td>
                    <td><span className={d.open ? "tag tag-accent" : "tag tag-neutral"}>{d.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <aside className="col-aside">
          <div className="callout">
            <strong><T en="Passport → TM30" th="พาสปอร์ต → TM30" /></strong>
            <p style={{ margin: "8px 0 0", fontSize: 13 }}>
              <T en="Scan or photograph the passport page. OCR fills name, nationality, document number and dates — then queues the record for TM30 within 24 h." th="สแกนหรือถ่ายหน้าพาสปอร์ต OCR กรอกชื่อ สัญชาติ เลขเอกสาร และวันที่ แล้วเข้าคิว TM30 ภายใน 24 ชม." />
            </p>
            <Link href="/compliance" className="btn btn-ghost" style={{ paddingLeft: 0, marginTop: 8 }}><T en="Open TM30 batch" th="เปิดชุด TM30" /> →</Link>
          </div>
        </aside>
      </div>

      {guest && (
        <div className="dialog-backdrop" onClick={() => setOpen(null)}>
          <div className="dialog" style={{ width: "min(520px, 100%)" }} onClick={(e) => e.stopPropagation()}>
            <div className="dialog-title">{guest.name}</div>
            <div className="text-muted" style={{ fontSize: 13 }}>{CHANNELS[guest.k].en} · {guest.nights} nights · {guest.pax}</div>
            <div className="field" style={{ marginTop: 12 }}>
              <label><T en="Assigned room" th="ห้องที่จัด" /></label>
              <input className="input" defaultValue={guest.room} />
            </div>
            {!guest.docOk && !scanned[guest.id] && (
              <button className="btn btn-secondary" type="button" onClick={() => scanPassport(guest.id)}><T en="Scan passport for TM30" th="สแกนพาสปอร์ตสำหรับ TM30" /></button>
            )}
            <label className="radio" style={{ marginTop: 8 }}>
              <input type="checkbox" defaultChecked />
              <span className="dot" />
              <span style={{ fontSize: 13 }}><T en="File TM30 automatically within 24 h" th="แจ้งที่พักคนต่างชาติอัตโนมัติภายใน 24 ชม." /></span>
            </label>
            {guest.due > 0 && (
              <button className="btn btn-secondary" type="button" onClick={() => collectDue(guest.id)}><T en="Collect" th="เก็บเงิน" /> {guest.bal} · PromptPay</button>
            )}
            <div className="dialog-actions">
              <button className="btn btn-secondary" type="button" onClick={() => setOpen(null)}><T en="Cancel" th="ยกเลิก" /></button>
              <button className="btn btn-primary" type="button" onClick={() => { checkIn(guest.id); setOpen(null); }}><T en="Complete check-in" th="เช็คอินเสร็จ" /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
