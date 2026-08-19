"use client";

import { ROOM_TYPES } from "@/lib/model";
import { DistNav } from "@/components/DistNav";
import { PageHead } from "@/components/PageHead";
import { PHYSICAL_ROOMS, RATE_PLANS } from "@/lib/ota";
import { thb } from "@/lib/format";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function InventoryPage() {
  const { ari, invType, setInvType, pushAri, lang } = useStore();
  const rows = ari[invType] ?? [];
  const type = ROOM_TYPES.find((t) => t.id === invType) ?? ROOM_TYPES[0];
  const today = rows[0];
  const rooms = PHYSICAL_ROOMS.filter((r) => r.type === invType);

  return (
    <div>
      <PageHead
        code="M-02c · Central Inventory + ARI Engine"
        kickerEn="The heart of HOTEL24"
        kickerTh="หัวใจของ HOTEL24"
        titleEn="Inventory & ARI"
        titleTh="ห้องคงเหลือและ ARI"
        subEn="Availability, rates and restrictions are calculated on the HOTEL24 master, then queued to the sync worker. The browser never calls the connectivity provider."
        subTh="ความว่าง ราคา และข้อจำกัดคำนวณบนต้นฉบับ HOTEL24 แล้วเข้าคิวไปที่ตัวซิงก์ เบราว์เซอร์ไม่ได้ยิงไปที่ผู้ให้บริการโดยตรง"
        actions={<button className="btn btn-primary" onClick={pushAri}><T en="Push ARI to connected OTAs" th="ดัน ARI ไป OTA ที่เชื่อมแล้ว" /></button>}
      />
      <DistNav />

      <div className="seg" style={{ marginTop: 16, flexWrap: "wrap" }}>
        {ROOM_TYPES.map((t) => (
          <button key={t.id} type="button" className={`seg-opt${invType === t.id ? " on" : ""}`} onClick={() => setInvType(t.id)}>
            <span>{lang === "th" ? t.th : t.en}</span>
          </button>
        ))}
      </div>

      {today && (
        <div className="stat-row" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
          <div className="stat-cell">
            <div className="stat-label">{today.date} · {type.en}</div>
            <div className="stat-val">{today.total}</div>
            <div className="stat-hint"><T en="Total rooms" th="ห้องทั้งหมด" /></div>
          </div>
          <div className="stat-cell">
            <div className="stat-label"><T en="Occupied" th="มีแขก" /></div>
            <div className="stat-val">{today.occupied}</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label"><T en="Maintenance" th="ซ่อมบำรุง" /></div>
            <div className="stat-val">{today.maint}</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label"><T en="Available" th="ว่างขาย" /></div>
            <div className="stat-val" style={{ color: "var(--color-accent-700)" }}>{today.avail}</div>
            <div className="stat-hint"><T en="This number is what every OTA should show" th="ตัวเลขนี้คือสิ่งที่ทุก OTA ต้องแสดง" /></div>
          </div>
          <div className="stat-cell">
            <div className="stat-label"><T en="BAR tonight" th="ราคาคืนนี้" /></div>
            <div className="stat-val" style={{ fontSize: 26 }}>{thb(today.rate)}</div>
          </div>
        </div>
      )}

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h"><T en="ARI calendar" th="ปฏิทิน ARI" /> · {type.en}</h5>
          <p className="text-muted" style={{ fontSize: 12, marginBottom: 10 }}>
            <T en="ARI = Availability, Rates, Inventory / restrictions. CTA = closed to arrival. CTD = closed to departure." th="ARI = ความว่าง ราคา ข้อจำกัด CTA = ปิดการเข้า CTD = ปิดการออก" />
          </p>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th><T en="Date" th="วันที่" /></th>
                  <th className="num"><T en="Avail." th="ว่าง" /></th>
                  <th className="num"><T en="Rate" th="ราคา" /></th>
                  <th className="num"><T en="Min" th="ขั้นต่ำ" /></th>
                  <th className="num"><T en="Max" th="สูงสุด" /></th>
                  <th>CTA</th>
                  <th>CTD</th>
                  <th><T en="Stop" th="ปิดขาย" /></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.date}>
                    <td><strong>{r.date}</strong> <span className="text-muted">{r.dow}</span></td>
                    <td className="num" style={{ fontWeight: 800 }}>{r.avail}</td>
                    <td className="num">{thb(r.rate)}</td>
                    <td className="num">{r.minStay}</td>
                    <td className="num">{r.maxStay}</td>
                    <td>{r.cta ? <span className="tag tag-accent">Yes</span> : "No"}</td>
                    <td>{r.ctd ? <span className="tag tag-accent">Yes</span> : "No"}</td>
                    <td>{r.stop ? <span className="tag tag-outline">Stop-sell</span> : "Open"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted" style={{ fontSize: 13, marginTop: 12, maxWidth: "62ch" }}>
            <T
              en="Change a rate here → HOTEL24 DB → event queue → OTA sync worker → white-label API → Booking.com / Agoda / Expedia / Trip.com / Airbnb. Failed pushes retry. They do not fire one HTTP call per keystroke."
              th="เปลี่ยนราคาที่นี่ → ฐานข้อมูล HOTEL24 → คิว → ตัวซิงก์ → API white-label → OTA ถ้าส่งไม่สำเร็จจะ retry ไม่ยิง HTTP ทุกครั้งที่กด"
            />
          </p>
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="Property master" th="ต้นฉบับที่พัก" /></h5>
          <div className="master-block">
            <div className="page-kicker">Property</div>
            <strong>Baan Talay Boutique Resort</strong>
            <div className="text-muted" style={{ fontSize: 12 }}>Ao Nang · 42 rooms · 5 types</div>
          </div>
          <div className="master-block">
            <div className="page-kicker"><T en="Rate plans" th="เรท" /></div>
            {RATE_PLANS.map((p) => (
              <div key={p.id} style={{ fontSize: 13, padding: "4px 0" }}>{lang === "th" ? p.th : p.en}</div>
            ))}
          </div>
          <div className="master-block">
            <div className="page-kicker"><T en="Physical rooms" th="ห้องจริง" /> · {type.en}</div>
            <div className="table-wrap">
              <table className="table">
                <tbody>
                  {rooms.map((r) => (
                    <tr key={r.no}>
                      <td style={{ fontWeight: 700 }}>{r.no}</td>
                      <td className="text-muted">{lang === "th" ? r.noteTh : r.note}</td>
                      <td>{r.ooo ? <span className="tag tag-outline">OOO</span> : null}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
