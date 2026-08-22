"use client";

import { useState } from "react";
import { SAMPLE_QUERIES } from "@/lib/hap";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

type HotelHit = {
  hotelId: string;
  name: string;
  city: string;
  area: string;
  directPrice: number;
  available: boolean;
  breakfast: boolean;
  parking: boolean;
  cancellation: string;
  directBenefit: string[];
  photo?: string;
  roomPhoto?: string;
  roomName?: string;
  lat?: number;
  lng?: number;
  map?: string;
  mapUrl?: string;
};

type Ranked = {
  hotelId: string;
  name: string;
  area: string;
  rate: number;
  room: string;
  refundable: boolean;
  inclusions: string[];
  photo?: string;
  roomPhoto?: string;
  map?: string;
  mapUrl?: string;
};

async function invoke(tool: string, args: Record<string, unknown>) {
  const res = await fetch("/api/hap/invoke", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tool, arguments: args }),
  });
  return res.json() as Promise<{ ok: boolean; result: Record<string, unknown> }>;
}

function MediaStage({
  photo,
  roomPhoto,
  map,
  mapUrl,
  hotel,
  room,
}: {
  photo?: string;
  roomPhoto?: string;
  map?: string;
  mapUrl?: string;
  hotel?: string;
  room?: string;
}) {
  if (!photo && !roomPhoto && !map) return null;
  return (
    <div className="agent-stage">
      {photo && (
        <figure>
          <img src={photo} alt="" />
          <figcaption className="agent-stage-cap"><T en="Property" th="โรงแรม" />{hotel ? ` · ${hotel}` : ""}</figcaption>
        </figure>
      )}
      {roomPhoto && (
        <figure>
          <img src={roomPhoto} alt="" />
          <figcaption className="agent-stage-cap"><T en="Room" th="ห้อง" />{room ? ` · ${room}` : ""}</figcaption>
        </figure>
      )}
      {map && (
        <figure>
          <iframe title={hotel ? `${hotel} map` : "Map"} src={map} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <figcaption className="agent-stage-cap">
            {mapUrl ? (
              <a href={mapUrl} target="_blank" rel="noreferrer"><T en="Open map" th="เปิดแผนที่" /></a>
            ) : (
              <T en="Map" th="แผนที่" />
            )}
          </figcaption>
        </figure>
      )}
    </div>
  );
}

export function AgentPlayground({ onBooked }: { onBooked?: (booking: Record<string, unknown>) => void }) {
  const { lang, flash } = useStore();
  const [q, setQ] = useState(SAMPLE_QUERIES[0]);
  const [step, setStep] = useState<"ask" | "results" | "hold" | "booked">("ask");
  const [busy, setBusy] = useState(false);
  const [hits, setHits] = useState<HotelHit[]>([]);
  const [ranked, setRanked] = useState<Ranked[]>([]);
  const [winner, setWinner] = useState<string>("");
  const [hold, setHold] = useState<Record<string, unknown> | null>(null);
  const [booking, setBooking] = useState<Record<string, unknown> | null>(null);
  const [guest, setGuest] = useState("Alex Kim");

  async function search() {
    setBusy(true);
    try {
      const found = await invoke("search_hotels", q.args);
      const hotels = (found.result.hotels as HotelHit[]) || [];
      setHits(hotels);
      const cmp = await invoke("compare_rooms", { hotelIds: hotels.map((h) => h.hotelId), maxThb: q.args.maxThb });
      setRanked(((cmp.result.ranked as Ranked[]) || []).slice(0, 3));
      setWinner(String(cmp.result.winner || hotels[0]?.hotelId || ""));
      setStep("results");
    } finally {
      setBusy(false);
    }
  }

  async function holdWinner() {
    const id = winner || hits[0]?.hotelId;
    if (!id) return;
    setBusy(true);
    try {
      const types = await invoke("get_room_types", { hotelId: id });
      const rooms = (types.result.rooms as { id: string }[]) || [];
      const roomId = rooms[0]?.id;
      const quote = await invoke("get_direct_offer", { hotelId: id, roomId });
      const h = await invoke("create_room_hold", {
        hotelId: id,
        roomId,
        checkIn: "22 Aug",
        checkOut: "23 Aug",
        nights: 1,
      });
      setHold({ ...h.result, offer: quote.result });
      setStep("hold");
    } finally {
      setBusy(false);
    }
  }

  async function book() {
    if (!hold) return;
    setBusy(true);
    try {
      const b = await invoke("create_booking", { holdId: hold.holdId, guest });
      setBooking(b.result);
      setStep("booked");
      onBooked?.(b.result);
      flash("Agent Direct booking confirmed · hotel owns the guest");
    } finally {
      setBusy(false);
    }
  }

  const pick = ranked.find((r) => r.hotelId === winner) || ranked[0];

  return (
    <div>
      <div className="seg" style={{ flexWrap: "wrap", marginBottom: 12 }}>
        {SAMPLE_QUERIES.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`seg-opt${q.id === s.id ? " on" : ""}`}
            onClick={() => { setQ(s); setStep("ask"); setHold(null); setBooking(null); }}
          >
            <span>{s.id === "cnx" ? "Chiang Mai" : "Ao Nang"}</span>
          </button>
        ))}
      </div>
      <p style={{ fontSize: 16, margin: "0 0 16px", maxWidth: 640 }}>
        {lang === "th" ? q.th : q.en}
      </p>
      {step === "ask" && (
        <button className="btn btn-primary" disabled={busy} onClick={search}>
          {busy ? <T en="Querying HOTEL24 Agent Gateway…" th="กำลังถามเกตเวย์ HOTEL24…" /> : <T en="Ask the agent" th="ถามเอเจนต์" />}
        </button>
      )}

      {step !== "ask" && hits.length > 0 && (
        <>
          <p className="agent-media-note">
            <T
              en="Property photo, room photo and OpenStreetMap come back on the same search payload. Demo uses stock stills — live PMS media uses these same fields."
              th="รูปโรงแรม รูปห้อง และแผนที่ OpenStreetMap กลับมากับผลค้นหาเดียวกัน เดโมใช้ภาพสำรอง — PMS จริงใช้ฟิลด์ชุดนี้"
            />
          </p>
          <div className="agent-hits">
            {hits.map((h) => {
              const on = h.hotelId === winner;
              return (
                <article key={h.hotelId} className={`agent-hit${on ? " on" : ""}`}>
                  <button type="button" className="agent-hit-pick" onClick={() => setWinner(h.hotelId)}>
                    {h.photo && <img className="agent-hit-photo" src={h.photo} alt="" />}
                    <div className="agent-hit-body">
                      <div className="page-kicker" style={{ marginBottom: 6 }}>
                        {on ? <T en="Recommended" th="แนะนำ" /> : h.available ? <T en="Available" th="ว่าง" /> : <T en="Sold out" th="เต็ม" />}
                      </div>
                      <strong>{h.name}</strong>
                      <div className="text-muted" style={{ fontSize: 12, marginTop: 4 }}>{h.area}, {h.city}</div>
                      <div className="stat-val" style={{ color: "var(--color-accent-700)", fontSize: 22, marginTop: 8 }}>
                        ฿{h.directPrice.toLocaleString()}
                      </div>
                      <div className="agent-hit-room">
                        {h.roomPhoto && <img src={h.roomPhoto} alt="" />}
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700 }}>{h.roomName}</div>
                          <div className="text-muted" style={{ fontSize: 12 }}>
                            {h.breakfast ? <T en="Breakfast" th="อาหารเช้า" /> : "—"}
                            {" · "}
                            {h.parking ? <T en="Parking" th="ที่จอด" /> : <T en="No parking" th="ไม่มีที่จอด" />}
                          </div>
                        </div>
                      </div>
                      <div className="text-muted" style={{ fontSize: 12 }}>{h.cancellation}</div>
                      <div className="text-muted" style={{ fontSize: 12, marginTop: 4 }}>{h.directBenefit.join(" · ")}</div>
                    </div>
                  </button>
                  {on && h.map && (
                    <>
                      <iframe className="agent-map" title={`${h.name} map`} src={h.map} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                      {h.mapUrl && (
                        <a className="agent-map-link" href={h.mapUrl} target="_blank" rel="noreferrer">
                          <T en="Open map" th="เปิดแผนที่" />
                        </a>
                      )}
                    </>
                  )}
                </article>
              );
            })}
          </div>
        </>
      )}

      {step === "results" && pick && (
        <div className="callout" style={{ marginTop: 16 }}>
          <strong><T en="Hotel A looks best." th="โรงแรมนี้เหมาะสุด" /></strong>{" "}
          {pick.name} · ฿{pick.rate.toLocaleString()} · {pick.room} · {pick.inclusions.join(" · ")}
          <div style={{ marginTop: 12 }}>
            <button className="btn btn-primary" disabled={busy} onClick={holdWinner}>
              <T en="Book it — create_quote() → hold_room()" th="จอง — create_quote() → hold_room()" />
            </button>
          </div>
        </div>
      )}

      {step === "hold" && hold && (
        <div className="callout" style={{ marginTop: 16 }}>
          <MediaStage
            photo={String(hold.photo || "")}
            roomPhoto={String(hold.roomPhoto || "")}
            map={String(hold.map || "")}
            mapUrl={String(hold.mapUrl || "")}
            hotel={String(hold.hotel || "")}
            room={String(hold.room || "")}
          />
          <strong>{String(hold.holdId)}</strong>
          <p style={{ margin: "8px 0 0", fontSize: 13 }}>
            {String(hold.hotel)} · {String(hold.room)} · ฿{Number(hold.rate).toLocaleString()} · expires {String(hold.expires)}
          </p>
          <p className="text-muted" style={{ fontSize: 12, margin: "8px 0 0" }}>
            <T en="Room is held. Booking.com is not in this path." th="กันห้องแล้ว เส้นทางนี้ไม่มี Booking.com" />
          </p>
          <div className="field" style={{ marginTop: 12, maxWidth: 280 }}>
            <label><T en="Guest name" th="ชื่อแขก" /></label>
            <input className="input" value={guest} onChange={(e) => setGuest(e.target.value)} />
          </div>
          <button className="btn btn-primary" style={{ marginTop: 12 }} disabled={busy} onClick={book}>
            <T en="Confirm — book_room() → hotel PMS" th="ยืนยัน — book_room() → PMS ของโรงแรม" />
          </button>
        </div>
      )}

      {step === "booked" && booking && (
        <div className="callout" style={{ marginTop: 16 }}>
          <MediaStage
            photo={String(booking.photo || "")}
            roomPhoto={String(booking.roomPhoto || "")}
            map={String(booking.map || "")}
            mapUrl={String(booking.mapUrl || "")}
            hotel={String(booking.hotel || "")}
            room={String(booking.room || "")}
          />
          <strong>{String(booking.bookingId)}</strong>
          <p style={{ margin: "8px 0 0", fontSize: 13 }}>
            {String(booking.guest)} · {String(booking.hotel)} · {String(booking.room)} · ฿{Number(booking.total).toLocaleString()} · PromptPay
          </p>
          <p style={{ margin: "8px 0 0", fontSize: 13 }}>
            <T en="Merchant of record: the hotel. OTA involved: no. Commission: ฿0." th="ผู้ค้าตามกฎหมายคือโรงแรม ไม่ผ่าน OTA ค่าคอม ฿0" />
          </p>
        </div>
      )}
    </div>
  );
}
