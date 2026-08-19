"use client";

import { HK_LABELS, MAINTENANCE } from "@/lib/model";
import { PageHead } from "@/components/PageHead";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import Link from "next/link";

export default function HousekeepingPage() {
  const { rooms, advanceRoom } = useStore();
  const blocking = rooms.filter((r) => r.s < 3).length;

  return (
    <div>
      <PageHead
        code="M-07 · Housekeeping · MVP"
        kickerEn="Room status"
        kickerTh="สถานะห้อง"
        titleEn="Housekeeping board"
        titleTh="กระดานแม่บ้าน"
        subEn="Dirty → cleaning → inspect → ready. Rooms still not ready are pushed to the owner's LINE brief at 12:30."
        subTh="ยังไม่ทำ → กำลังทำ → รอตรวจ → พร้อมขาย ห้องที่ไม่พร้อมถูกส่งเข้า LINE เจ้าของตอน 12:30"
        actions={
          <span className="tag tag-accent">{blocking} <T en="blocking arrivals" th="ห้องขวางแขกเข้า" /></span>
        }
      />

      <div className="hk-board">
        {HK_LABELS.map((st, i) => {
          const col = rooms.filter((r) => r.s === i);
          return (
            <section key={st.en} className="hk-col">
              <header>
                <strong><T en={st.en} th={st.th} /></strong>
                <span>{col.length}</span>
              </header>
              {col.map((r) => (
                <button key={r.no} type="button" className="hk-card" onClick={() => advanceRoom(r.no)}>
                  <div className="hk-no">{r.no}</div>
                  <div className="hk-type">{r.type}</div>
                  {r.staff && <div className="text-muted" style={{ fontSize: 11 }}>{r.staff}</div>}
                  <div className="text-muted" style={{ fontSize: 12, marginTop: 6 }}>{r.note}</div>
                </button>
              ))}
            </section>
          );
        })}
      </div>

      <div className="split-main" style={{ marginTop: 8 }}>
        <section className="col-pad">
          <h5 className="sec-h"><T en="Maintenance" th="ซ่อมบำรุง" /></h5>
          {MAINTENANCE.map((m) => (
            <div key={m.no} className="stack-row" style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: "1px solid var(--color-divider)" }}>
              <strong>{m.no}</strong>
              <span>{m.what}</span>
              <span className="text-muted" style={{ marginLeft: "auto" }}>{m.age}</span>
            </div>
          ))}
          <p className="text-muted" style={{ fontSize: 12, marginTop: 12 }}>
            <T en="Arrivals from 14:00. Rooms still not ready are pushed to the owner's LINE brief at 12:30." th="แขกเข้าตั้งแต่ 14:00 ห้องที่ไม่พร้อมถูกส่งเข้าสรุป LINE ตอน 12:30" />
          </p>
          <Link href="/line" className="btn btn-ghost" style={{ paddingLeft: 0 }}><T en="Open LINE owner mode" th="เปิดโหมดเจ้าของบน LINE" /> →</Link>
        </section>
      </div>
    </div>
  );
}
