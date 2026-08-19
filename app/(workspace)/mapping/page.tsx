"use client";

import { ROOM_TYPES } from "@/lib/model";
import { DistNav } from "@/components/DistNav";
import { PageHead, statusCls } from "@/components/PageHead";
import { MAP_CHANNELS, type MapChannel } from "@/lib/ota";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

const HEADS: Record<MapChannel, string> = {
  booking: "Booking.com",
  agoda: "Agoda",
  expedia: "Expedia",
  airbnb: "Airbnb",
  trip: "Trip.com",
};

export default function MappingPage() {
  const { roomMaps, rateMaps, fixLoftMapping } = useStore();
  const loft = roomMaps.find((r) => r.roomId === "loft");
  const loftOpen = loft ? loft.expedia === "" : false;

  return (
    <div>
      <PageHead
        code="M-02b · OTA Mapping Engine"
        kickerEn="Canonical HOTEL24 rooms. Mapped to each OTA."
        kickerTh="ห้องต้นฉบับของ HOTEL24 แล้วค่อย map ไปแต่ละ OTA"
        titleEn="OTA mapping"
        titleTh="จับคู่ห้องและเรท"
        subEn="Do not model Booking.com rooms as your database. HOTEL24 owns room types, physical rooms and rate plans. Each OTA gets a map: hotel → OTA hotel, room type → OTA room, rate plan → OTA rate."
        subTh="อย่าใช้ห้องของ Booking.com เป็นฐานข้อมูลหลัก HOTEL24 เป็นเจ้าของประเภทห้อง ห้องจริง และเรท แต่ละ OTA มี map ของตัวเอง"
        actions={
          loftOpen
            ? <button className="btn btn-primary" onClick={fixLoftMapping}><T en="Map Family Loft on Expedia" th="map แฟมิลี่ลอฟท์บน Expedia" /></button>
            : <span className="tag tag-neutral"><T en="Expedia loft mapped" th="map ลอฟท์บน Expedia แล้ว" /></span>
        }
      />
      <DistNav />

      <div className="callout" style={{ marginTop: 16 }}>
        <strong><T en="Property map" th="จับคู่ที่พัก" /></strong>{" "}
        Baan Talay Boutique Resort → Booking.com 384921 · Agoda 772190 · Expedia 551028 · Airbnb 18 listings · Trip.com draft.
      </div>

      <h5 className="sec-h" style={{ marginTop: 22 }}><T en="Room types" th="ประเภทห้อง" /></h5>
      <div className="table-wrap">
        <table className="table map-table">
          <thead>
            <tr>
              <th>HOTEL24</th>
              {MAP_CHANNELS.map((k) => <th key={k}>{HEADS[k]}</th>)}
            </tr>
          </thead>
          <tbody>
            {roomMaps.map((r) => (
              <tr key={r.roomId}>
                <td>
                  <strong>{r.hotel24}</strong>
                  <div className="text-muted" style={{ fontSize: 11 }}>{ROOM_TYPES.find((t) => t.id === r.roomId)?.count} <T en="rooms" th="ห้อง" /></div>
                </td>
                {MAP_CHANNELS.map((k) => {
                  const v = r[k];
                  const empty = v === "";
                  return (
                    <td key={k} className={empty ? "map-empty" : undefined}>
                      {empty ? (
                        <button className="btn btn-primary" onClick={fixLoftMapping}><T en="Map now" th="map เลย" /></button>
                      ) : v}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h5 className="sec-h" style={{ marginTop: 28 }}><T en="Rate plans" th="เรท" /></h5>
      <div className="table-wrap">
        <table className="table map-table">
          <thead>
            <tr>
              <th>HOTEL24</th>
              {MAP_CHANNELS.map((k) => <th key={k}>{HEADS[k]}</th>)}
            </tr>
          </thead>
          <tbody>
            {rateMaps.map((r) => (
              <tr key={r.id}>
                <td style={{ fontWeight: 700 }}>{r.hotel24}</td>
                {MAP_CHANNELS.map((k) => <td key={k}>{r[k]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="split-main" style={{ marginTop: 8 }}>
        <section className="col-pad border-r">
          <h5 className="sec-h"><T en="Master, not OTA copies" th="ต้นฉบับ ไม่ใช่สำเนา OTA" /></h5>
          <p className="text-muted" style={{ fontSize: 14, lineHeight: 1.6, maxWidth: "58ch" }}>
            <T
              en="If Agoda calls Garden Deluxe a ‘Deluxe Garden’ and Expedia calls it a ‘Deluxe Room’, HOTEL24 still has one Garden Deluxe. Availability is calculated once, then pushed through the maps."
              th="ถ้า Agoda เรียก Garden Deluxe ว่า Deluxe Garden และ Expedia เรียก Deluxe Room HOTEL24 ยังมี Garden Deluxe อันเดียว คำนวณห้องว่างครั้งเดียว แล้วดันผ่าน map"
            />
          </p>
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="Unmapped = uncontrolled" th="ยังไม่ map = ควบคุมไม่ได้" /></h5>
          <p style={{ fontSize: 13 }}>
            {loftOpen
              ? <><span className={statusCls("Unmapped")}>Unmapped</span>{" "}<T en="Family Loft on Expedia is selling without inventory control." th="แฟมิลี่ลอฟท์บน Expedia ขายโดยที่ยังไม่ตัดห้องใน HOTEL24" /></>
              : <><span className={statusCls("Mapped")}>Mapped</span>{" "}<T en="All five room types are controlled on Expedia." th="ห้าประเภทห้องถูกควบคุมบน Expedia แล้ว" /></>}
          </p>
        </aside>
      </div>
    </div>
  );
}
