"use client";

import { BENEFITS, PLACEMENTS, ROOM_TYPES } from "@/lib/model";
import { PageHead } from "@/components/PageHead";
import { thb } from "@/lib/format";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import Link from "next/link";

export default function DirectPage() {
  const { benefits, toggleBenefit } = useStore();

  return (
    <div>
      <PageHead
        code="M-10 · Direct Booking Engine + Booster · MVP"
        kickerEn="Killer feature"
        kickerTh="จุดเด่น"
        titleEn="Direct booking booster"
        titleTh="ดันการจองตรง"
        subEn="Mobile booking links for LINE OA, Facebook, Instagram, TikTok, Google Business Profile and lobby QR. Same public rate. Better inclusions."
        subTh="ลิงก์จองตรงสำหรับ LINE OA, Facebook, Instagram, TikTok, Google และ QR — ราคาเท่า OTA แต่ให้สิทธิพิเศษแทนส่วนลด"
        actions={
          <>
            <Link href="/agent-offers" className="btn btn-secondary"><T en="AI Direct Offers" th="ข้อเสนอตรงสำหรับ AI" /></Link>
            <Link href="/book/baantalay" className="btn btn-primary"><T en="Open guest booking page" th="เปิดหน้าจองของแขก" /></Link>
          </>
        }
      />

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h"><T en="Placements" th="จุดวางลิงก์" /></h5>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th><T en="Source" th="แหล่ง" /></th>
                  <th><T en="Link" th="ลิงก์" /></th>
                  <th className="num"><T en="Clicks" th="คลิก" /></th>
                  <th className="num"><T en="Bookings" th="การจอง" /></th>
                  <th className="num">RN</th>
                  <th className="num"><T en="Net" th="สุทธิ" /></th>
                </tr>
              </thead>
              <tbody>
                {PLACEMENTS.map((p) => (
                  <tr key={p.name}>
                    <td style={{ fontWeight: 700 }}>{p.name}</td>
                    <td className="text-muted" style={{ fontSize: 12 }}>{p.url}</td>
                    <td className="num">{p.clicks}</td>
                    <td className="num">{p.bookings}</td>
                    <td className="num">{p.rn}</td>
                    <td className="num">{thb(p.net)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="callout" style={{ marginTop: 16 }}>
            <T en="Do not undercut the OTA rate. Give breakfast, 14:00 checkout or free cancellation instead — the public price stays parity." th="ไม่ต้องตัดราคา OTA ให้สิทธิอาหารเช้า เช็คเอาท์ 14:00 หรือยกเลิกฟรีแทน ราคาหน้าเว็บยังเท่ากัน" />
          </div>
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="Direct benefits (not a discount)" th="สิทธิจองตรง (ไม่ใช่ส่วนลด)" /></h5>
          {BENEFITS.map((b) => (
            <label key={b.id} className="benefit">
              <input type="checkbox" checked={!!benefits[b.id]} onChange={() => toggleBenefit(b.id)} />
              <span>
                <strong><T en={b.text} th={b.textTh} /></strong>
                <span className="text-muted">{b.cost}</span>
              </span>
            </label>
          ))}
          <h5 className="sec-h" style={{ marginTop: 24 }}><T en="Parity rates" th="ราคาเท่า OTA" /></h5>
          {ROOM_TYPES.map((r) => (
            <div key={r.id} className="ctx-row">
              <span>{r.en}</span>
              <strong>{thb(r.base)} / night</strong>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
