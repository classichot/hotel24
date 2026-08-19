"use client";

import Link from "next/link";
import { AgentNav } from "@/components/AgentNav";
import { PageHead } from "@/components/PageHead";
import { HAP_HOTELS, directOffer } from "@/lib/hap";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function AgentOffersPage() {
  const { benefits, toggleBenefit } = useStore();
  const hotel = HAP_HOTELS[0];
  const room = hotel.roomsTypes[0];
  const offer = directOffer(hotel, room);

  return (
    <div>
      <PageHead
        code="AD-04 · AI Direct Offers"
        kickerEn="Give agents a reason to pick Direct"
        kickerTh="ให้เอเจนต์มีเหตุผลเลือกจองตรง"
        titleEn="AI Direct Offers"
        titleTh="ข้อเสนอตรงสำหรับ AI"
        subEn="Same public rate as Agoda. Extra value the agent can read: breakfast, late checkout, welcome drink. No promo code for the traveler to hunt."
        subTh="ราคาหน้าเว็บเท่า Agoda สิทธิ์เพิ่มที่เอเจนต์อ่านได้: อาหารเช้า เช็คเอาท์สาย เครื่องดื่มต้อนรับ ผู้เดินทางไม่ต้องไปหาโค้ด"
        actions={<Link href="/direct" className="btn btn-secondary"><T en="Human placements" th="จุดวางลิงก์คน" /></Link>}
      />
      <AgentNav />

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h">Garden Deluxe · {hotel.name}</h5>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th><T en="Channel" th="ช่องทาง" /></th>
                  <th className="num"><T en="Rate" th="ราคา" /></th>
                  <th><T en="What the agent sees" th="สิ่งที่เอเจนต์เห็น" /></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Agoda</td>
                  <td className="num">฿{room.agodaRate.toLocaleString()}</td>
                  <td className="text-muted">Room only</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 800, color: "var(--color-accent-700)" }}>HOTEL24 Direct</td>
                  <td className="num" style={{ fontWeight: 800, color: "var(--color-accent-700)" }}>฿{room.rate.toLocaleString()}</td>
                  <td>{offer.inclusions.join(" · ")}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="callout" style={{ marginTop: 16 }}>
            <T en="The agent can conclude: the hotel’s direct offer provides better total value." th="เอเจนต์สรุปได้ว่าข้อเสนอตรงของโรงแรมคุ้มกว่าโดยรวม" />
          </div>
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="Inclusions the agent reads" th="สิทธิ์ที่เอเจนต์อ่าน" /></h5>
          {[
            { id: "b1", en: "Breakfast for two", th: "อาหารเช้า 2 ท่าน" },
            { id: "b2", en: "14:00 late checkout", th: "เช็คเอาท์ 14:00" },
            { id: "b3", en: "Free cancel 24h", th: "ยกเลิกฟรี 24 ชม." },
            { id: "b4", en: "Welcome drink", th: "เครื่องดื่มต้อนรับ" },
          ].map((b) => (
            <label key={b.id} className="benefit">
              <input type="checkbox" checked={!!benefits[b.id]} onChange={() => toggleBenefit(b.id)} />
              <span><strong><T en={b.en} th={b.th} /></strong></span>
            </label>
          ))}
          <p className="text-muted" style={{ fontSize: 12, marginTop: 16 }}>
            <T en="Do not undercut the OTA rate. The public price stays parity." th="ไม่ตัดราคา OTA ราคาหน้าเว็บยังเท่ากัน" />
          </p>
        </aside>
      </div>
    </div>
  );
}
