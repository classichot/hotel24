"use client";

import { PAYMENTS } from "@/lib/model";
import { PageHead } from "@/components/PageHead";
import { thb } from "@/lib/format";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

const INVOICES = [
  { no: "INV-2608-118", guest: "Al-Farsi, R.", ch: "Direct", amt: 53400, status: "Deposit ฿12,400 open" },
  { no: "INV-2608-117", guest: "Müller, S.", ch: "Booking.com", amt: 6600, status: "Prepaid · receipt issued" },
  { no: "INV-2608-116", guest: "Weber, K.", ch: "Booking.com", amt: 13600, status: "Prepaid" },
  { no: "RC-2608-214", guest: "Walk-in · 106", ch: "Direct", amt: 2200, status: "PromptPay · receipt" },
];

export default function FinancePage() {
  const { audit } = useStore();
  const cash = PAYMENTS.reduce((s, p) => s + p.amt, 0);

  return (
    <div>
      <PageHead
        code="M-12 · Finance · MVP light"
        kickerEn="Invoice · receipt · deposit · refund"
        kickerTh="ใบแจ้งหนี้ · ใบเสร็จ · มัดจำ · คืนเงิน"
        titleEn="Finance"
        titleTh="การเงิน"
        subEn="Daily reconciliation for the front desk. Full accounting, restaurant POS and procurement wait for a later phase."
        subTh="กระทบยอดรายวันสำหรับเคาน์เตอร์ บัญชีเต็ม ร้านอาหาร และจัดซื้อไว้เฟสถัดไป"
      />

      <div className="stat-row" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div className="stat-cell">
          <div className="stat-label"><T en="Today in" th="รับวันนี้" /></div>
          <div className="stat-val">{thb(cash)}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Cash short 18 Aug" th="เงินสดขาด 18 ส.ค." /></div>
          <div className="stat-val" style={{ color: "var(--color-accent-700)" }}>−฿1,200</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Open deposits" th="มัดจำค้าง" /></div>
          <div className="stat-val">฿12,400</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Refunds MTD" th="คืนเงินเดือนนี้" /></div>
          <div className="stat-val">฿18,700</div>
        </div>
      </div>

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h"><T en="Invoices & receipts" th="ใบแจ้งหนี้และใบเสร็จ" /></h5>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th><T en="Guest" th="แขก" /></th>
                  <th><T en="Channel" th="ช่องทาง" /></th>
                  <th className="num"><T en="Amount" th="จำนวน" /></th>
                  <th><T en="Status" th="สถานะ" /></th>
                </tr>
              </thead>
              <tbody>
                {INVOICES.map((r) => (
                  <tr key={r.no}>
                    <td style={{ fontWeight: 700 }}>{r.no}</td>
                    <td>{r.guest}</td>
                    <td>{r.ch}</td>
                    <td className="num">{thb(r.amt)}</td>
                    <td>{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="Reconciliation trail" th="ร่องรอยกระทบยอด" /></h5>
          {audit.filter((a) => /PromptPay|cash|Walk-in|Collected/i.test(a.what)).slice(0, 6).map((e, i) => (
            <div key={i} className="audit-row">
              <div className="text-muted" style={{ fontSize: 10 }}>{e.t}</div>
              <div style={{ fontSize: 13 }}>{e.what}</div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
