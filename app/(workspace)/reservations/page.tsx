"use client";

import Link from "next/link";
import { CAL_DAYS, CAL_ROWS, CHANNELS, OCC, ROOM_TYPES, UNASSIGNED } from "@/lib/model";
import { PageHead } from "@/components/PageHead";
import { WalkInDialog } from "@/components/WalkInDialog";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function ReservationsPage() {
  const { setWalkInOpen, setNewResOpen, calRange, setCalRange, assigned, autoAssign, shieldClosed, switchStatus, switchSource } = useStore();
  const days = calRange === "14" ? CAL_DAYS : CAL_DAYS;
  const leftover = UNASSIGNED.filter((u) => !assigned[u.g]);

  return (
    <div>
      <PageHead
        code="M-01 · Central Reservation · MVP"
        kickerEn="One calendar"
        kickerTh="ปฏิทินเดียว"
        titleEn="Reservation calendar"
        titleTh="ปฏิทินการจอง"
        subEn="OTA, direct, walk-in and agent bookings on one grid. Grey is OTA. Yellow is direct."
        subTh="OTA, จองตรง, วอล์กอิน และเอเจนต์อยู่ในปฏิทินเดียว — เทาคือ OTA เหลืองคือจองตรง"
        actions={
          <>
            <div className="seg">
              {(["14", "30", "month"] as const).map((r) => (
                <label key={r} className="seg-opt">
                  <input type="radio" name="calrange" checked={calRange === r} onChange={() => setCalRange(r)} />
                  <span>{r === "month" ? "Month" : r === "14" ? "14 วัน" : "30 วัน"}</span>
                </label>
              ))}
            </div>
            <button className="btn btn-secondary" onClick={() => setWalkInOpen(true)}><T en="Walk-in" th="วอล์กอิน" /></button>
            <button className="btn btn-primary" onClick={() => setNewResOpen(true)}><T en="New reservation" th="การจองใหม่" /></button>
          </>
        }
      />

      {switchStatus === "done" && (
        <div className="callout" style={{ marginTop: 16 }}>
          <strong><T en="Imported from" th="นำเข้าจาก" /> {switchSource === "hotelier" ? "Little Hotelier" : "Cloudbeds"}.</strong>{" "}
          <T en="Future reservations, room types and OTA mappings are on this calendar. Channel manager now writes from HOTEL24." th="การจองอนาคต ประเภทห้อง และ mapping OTA อยู่บนปฏิทินนี้แล้ว ตัวจัดการช่องทางเขียนจาก HOTEL24" />
          {" "}<Link href="/switch"><T en="View switch log" th="ดูบันทึกการย้าย" /> →</Link>
        </div>
      )}

      <div className="cal-layout">
        <div className="cal-board">
          <div className="cal-head">
            <div className="cal-stub"><T en="Room type" th="ประเภทห้อง" /></div>
            <div className="cal-days">
              {days.map((d, i) => (
                <div key={d.num} className="cal-day" style={{ background: i % 7 === 3 || i % 7 === 4 ? "var(--color-neutral-200)" : undefined }}>
                  <span className="cal-dow">{d.dow}</span>
                  <span className="cal-num">{d.num}</span>
                </div>
              ))}
            </div>
          </div>
          {CAL_ROWS.map((row) => {
            const type = ROOM_TYPES.find((t) => t.id === row.type)!;
            return (
              <div key={row.type} className="cal-row">
                <div className="cal-stub">
                  <strong>{type.en}</strong>
                  <span>{type.th} · {type.count} <T en="rooms" th="ห้อง" /></span>
                </div>
                <div className="cal-track">
                  {row.bars.map((b) => {
                    const ch = CHANNELS[b.k];
                    return (
                      <div
                        key={b.g + b.start}
                        className="cal-bar"
                        style={{
                          gridColumn: `${b.start} / span ${b.span}`,
                          background: ch.ink,
                          color: ch.fg,
                        }}
                        title={`${b.g} · ${ch.en}`}
                      >
                        <strong>{b.g}</strong>
                        {b.span >= 4 && <em>{ch.en}</em>}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div className="cal-row cal-occ">
            <div className="cal-stub"><T en="Occupancy" th="อัตราเข้าพัก" /></div>
            <div className="cal-days">
              {OCC.map((p, i) => (
                <div key={i} className="cal-day" style={{ color: p >= 90 ? "var(--color-hot-700)" : undefined, fontWeight: 800, fontFamily: "var(--font-heading)" }}>
                  {p}%
                </div>
              ))}
            </div>
          </div>
          <div className="cal-legend">
            <span className="cal-legend-k"><T en="Channel ink" th="สีช่องทาง" /></span>
            {(Object.keys(CHANNELS) as (keyof typeof CHANNELS)[]).map((k) => (
              <span key={k} className="cal-leg">
                <i style={{ background: CHANNELS[k].ink }} />
                {CHANNELS[k].en}
              </span>
            ))}
            <span className="text-muted" style={{ marginLeft: "auto" }}>
              <T en="Yellow = direct. Grey weights = OTA, by commission depth." th="เหลือง = จองตรง เทา = OTA ตามความลึกของค่าคอม" />
            </span>
          </div>
        </div>

        <aside className="cal-aside">
          <div className="panel">
            <div className="panel-body">
              <div className="page-kicker"><T en="Today · 19 Aug" th="วันนี้ · 19 ส.ค." /></div>
              <div className="today-grid">
                <div><div className="stat-val" style={{ fontSize: 26 }}>9</div><div className="stat-label"><T en="Arrivals" th="เข้าพัก" /></div></div>
                <div><div className="stat-val" style={{ fontSize: 26 }}>6</div><div className="stat-label"><T en="Departures" th="ออก" /></div></div>
                <div><div className="stat-val" style={{ fontSize: 26, color: "var(--color-accent-700)" }}>37/42</div><div className="stat-label"><T en="Occupied tonight" th="เข้าพักคืนนี้" /></div></div>
                <div><div className="stat-val" style={{ fontSize: 26 }}>4</div><div className="stat-label"><T en="Rooms not ready" th="ห้องยังไม่พร้อม" /></div></div>
              </div>
            </div>
          </div>

          {!shieldClosed.s1 && (
            <div className="panel shield-card">
              <div className="panel-body">
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <strong><T en="Overbooking Shield" th="ป้องกันขายเกิน" /></strong>
                  <span className="tag tag-accent" style={{ marginLeft: "auto" }}>1 high</span>
                </div>
                <p style={{ fontSize: 13, margin: 0 }}>
                  <T en="Family Loft has been unmapped on Expedia since 17 Aug 09:12 — 6 room-nights sold without inventory control." th="แฟมิลี่ลอฟท์ยังไม่ map บน Expedia ตั้งแต่ 17 ส.ค. 09:12 — ขายไป 6 คืนโดยไม่มีตัวควบคุมห้อง" />
                </p>
                <Link href="/channels" className="btn btn-primary" style={{ marginTop: 10 }}><T en="Fix mapping" th="แก้ mapping" /></Link>
              </div>
            </div>
          )}

          <div className="panel">
            <div className="panel-body">
              <div className="page-kicker"><T en="Unassigned" th="ยังไม่จัดห้อง" /></div>
              {leftover.length === 0 ? (
                <div className="text-muted" style={{ fontSize: 13 }}><T en="All arrivals assigned." th="จัดห้องครบแล้ว" /></div>
              ) : leftover.map((u) => (
                <div key={u.g} className="stack-row" style={{ display: "flex", gap: 8, fontSize: 13, padding: "8px 0", borderBottom: "1px solid var(--color-divider)" }}>
                  <strong>{u.g}</strong>
                  <span className="text-muted">{u.type}</span>
                  <span className="text-muted" style={{ marginLeft: "auto", fontSize: 11 }}>{u.ch}</span>
                </div>
              ))}
              {leftover.length > 0 && <button className="btn btn-ghost" style={{ marginTop: 8, paddingLeft: 0 }} onClick={autoAssign}><T en="Auto-assign all" th="จัดห้องอัตโนมัติ" /></button>}
            </div>
          </div>
        </aside>
      </div>
      <WalkInDialog />
    </div>
  );
}
