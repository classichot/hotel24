"use client";

import { useState } from "react";
import { AgiShell } from "@/components/AgiNav";
import { PageHead } from "@/components/PageHead";
import { AGI_GUEST_NEED, AGI_OFFERS } from "@/lib/agi";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function AgiDirectPage() {
  const { agiGuestOffer, setAgiGuestOffer, holdAgiOffer, confirmAgiGuest, agiHoldId, agiBooking, agiOn } = useStore();
  const [guest, setGuest] = useState("Alex Kim");
  const offer = AGI_OFFERS.find((o) => o.id === agiGuestOffer) ?? AGI_OFFERS[0];

  return (
    <div>
      <PageHead
        code="AGI-W3 · Agent Direct Negotiation"
        kickerEn="Your guest’s bot meets your hotel"
        kickerTh="บอทของแขกมาเจอโรงแรมคุณ"
        titleEn="Guest ChatGPT request"
        titleTh="คำขอ ChatGPT ของแขก"
        subEn="Live quote → hold → guest acceptance → PromptPay → confirmed reservation. HOTEL24 validates inventory and price. The hotel is merchant of record."
        subTh="ใบราคาสด → กันห้อง → แขกรับ → PromptPay → ยืนยันจอง HOTEL24 ตรวจห้องและราคา โรงแรมเป็นผู้ค้าตามกฎหมาย"
      />
      <AgiShell>
        <div className="callout" style={{ marginTop: 16 }}>
          <strong>{AGI_GUEST_NEED.who}</strong>
          <p style={{ margin: "8px 0 0" }}><T en={AGI_GUEST_NEED.ask} th={AGI_GUEST_NEED.askTh} /></p>
        </div>
        <div className="agent-hits" style={{ marginTop: 16 }}>
          {AGI_OFFERS.map((o) => (
            <article key={o.id} className={`agent-hit${agiGuestOffer === o.id ? " on" : ""}`}>
              <button type="button" className="agent-hit-pick" onClick={() => setAgiGuestOffer(o.id)}>
                <div className="agent-hit-body">
                  <div className="page-kicker">{o.fit}</div>
                  <strong>{o.room}</strong>
                  <div className="stat-val" style={{ color: "var(--color-accent-700)", fontSize: 22, marginTop: 8 }}>฿{o.total.toLocaleString()}</div>
                  <p className="text-muted" style={{ fontSize: 12 }}>
                    {o.nights} n · room ฿{o.roomThb.toLocaleString()} · breakfast ฿{o.breakfast.toLocaleString()} · transfer ฿{o.transfer.toLocaleString()} · {o.cancel}
                  </p>
                </div>
              </button>
            </article>
          ))}
        </div>
        <p className="text-muted" style={{ fontSize: 13, marginTop: 12 }}>
          <T en={`${offer.hotel} · under ฿18,000. Alternatives (longer stay, other cancel terms) stay inside commercial rules.`} th={`${offer.hotel} · ไม่เกิน ฿18,000 ทางเลือก (พักยาวขึ้น ยกเลิกแบบอื่น) อยู่ในกฎการค้า`} />
        </p>
        <div className="landing-cta">
          <button type="button" className="btn btn-primary" onClick={holdAgiOffer} disabled={!agiOn}>
            <T en="Hold 10 minutes" th="กันห้อง 10 นาที" />
          </button>
          <div className="field" style={{ minWidth: 200 }}>
            <label><T en="Guest name" th="ชื่อแขก" /></label>
            <input className="input" value={guest} onChange={(e) => setGuest(e.target.value)} />
          </div>
          <button type="button" className="btn btn-primary" onClick={() => confirmAgiGuest(guest)} disabled={!agiHoldId}>
            <T en="Confirm · PromptPay" th="ยืนยัน · PromptPay" />
          </button>
        </div>
        {agiHoldId && <p className="text-muted" style={{ fontSize: 12 }}>{agiHoldId} · <T en="expires 10 minutes · duplicate lock on" th="หมดอายุ 10 นาที · ล็อกกันจองซ้ำ" /></p>}
        {agiBooking && (
          <div className="callout" style={{ marginTop: 16 }}>
            <strong>{String(agiBooking.bookingId)}</strong>
            <p style={{ margin: "8px 0 0" }}>
              {String(agiBooking.guest)} · {String(agiBooking.room)} · ฿{Number(agiBooking.total).toLocaleString()} · <T en="OTA involved: no" th="มี OTA: ไม่" />
            </p>
          </div>
        )}
      </AgiShell>
    </div>
  );
}
