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
};

type Ranked = {
  hotelId: string;
  name: string;
  area: string;
  rate: number;
  room: string;
  refundable: boolean;
  inclusions: string[];
};

async function invoke(tool: string, args: Record<string, unknown>) {
  const res = await fetch("/api/hap/invoke", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tool, arguments: args }),
  });
  return res.json() as Promise<{ ok: boolean; result: Record<string, unknown> }>;
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

      {step !== "ask" && (
        <div className="table-wrap" style={{ marginTop: 8 }}>
          <table className="table">
            <thead>
              <tr>
                <th><T en="Hotel" th="โรงแรม" /></th>
                <th className="num"><T en="Direct" th="จองตรง" /></th>
                <th><T en="Avail." th="ว่าง" /></th>
                <th><T en="Breakfast" th="อาหารเช้า" /></th>
                <th><T en="Parking" th="ที่จอด" /></th>
                <th><T en="Cancel" th="ยกเลิก" /></th>
                <th><T en="Direct benefit" th="สิทธิ์จองตรง" /></th>
              </tr>
            </thead>
            <tbody>
              {hits.map((h) => (
                <tr key={h.hotelId} style={{ background: h.hotelId === winner ? "color-mix(in srgb, var(--color-accent) 12%, transparent)" : undefined }}>
                  <td>
                    <strong>{h.name}</strong>
                    <div className="text-muted" style={{ fontSize: 11 }}>{h.area}, {h.city}</div>
                  </td>
                  <td className="num" style={{ fontWeight: 800, color: "var(--color-accent-700)" }}>฿{h.directPrice.toLocaleString()}</td>
                  <td>{h.available ? "Yes" : "No"}</td>
                  <td>{h.breakfast ? "Included" : "—"}</td>
                  <td>{h.parking ? "Yes" : "—"}</td>
                  <td className="text-muted" style={{ fontSize: 12 }}>{h.cancellation}</td>
                  <td className="text-muted" style={{ fontSize: 12 }}>{h.directBenefit.join(" · ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {step === "results" && ranked[0] && (
        <div className="callout" style={{ marginTop: 16 }}>
          <strong><T en="Hotel A looks best." th="โรงแรมนี้เหมาะสุด" /></strong>{" "}
          {ranked[0].name} · ฿{ranked[0].rate.toLocaleString()} · {ranked[0].inclusions.join(" · ")}
          <div style={{ marginTop: 12 }}>
            <button className="btn btn-primary" disabled={busy} onClick={holdWinner}>
              <T en="Book it — create_quote() → hold_room()" th="จอง — create_quote() → hold_room()" />
            </button>
          </div>
        </div>
      )}

      {step === "hold" && hold && (
        <div className="callout" style={{ marginTop: 16 }}>
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
