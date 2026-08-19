"use client";

import { TM30_SEED } from "@/lib/model";
import { PageHead, statusCls } from "@/components/PageHead";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function CompliancePage() {
  const { tm30Filed, fileTm30, scanned, scanPassport } = useStore();

  return (
    <div>
      <PageHead
        code="M-11 · Thailand Compliance · MVP"
        kickerEn="Passport · TM30 · PDPA"
        kickerTh="พาสปอร์ต · TM30 · PDPA"
        titleEn="Thailand compliance"
        titleTh="การปฏิบัติตามกฎหมายไทย"
        subEn="Passport capture, TM30 preparation, PDPA controls and tax-document support — work foreign PMS products do not do."
        subTh="พาสปอร์ต, แจ้งที่พักคนต่างชาติ TM30, PDPA และเอกสารภาษี — งานที่ระบบต่างชาติไม่ทำให้"
        actions={
          tm30Filed
            ? <span className="tag tag-neutral">Filed 19 Aug 09:14 · ref TM30-2026-0819-014</span>
            : <button className="btn btn-primary" onClick={fileTm30}><T en="File TM30 batch" th="ยื่น TM30 แบบชุด" /></button>
        }
      />

      <div className="table-wrap" style={{ marginTop: 8 }}>
        <table className="table">
          <thead>
            <tr>
              <th><T en="Guest" th="แขก" /></th>
              <th><T en="Nationality" th="สัญชาติ" /></th>
              <th><T en="Document" th="เอกสาร" /></th>
              <th><T en="Arrival" th="เข้า" /></th>
              <th><T en="Departure" th="ออก" /></th>
              <th>TM30</th>
              <th><T en="PDPA consent" th="ความยินยอม PDPA" /></th>
              <th />
            </tr>
          </thead>
          <tbody>
            {TM30_SEED.map((r) => {
              const scannedOk = r.scanned || scanned[r.id];
              const state = !scannedOk ? "Awaiting scan" : tm30Filed && r.ready ? "Filed" : r.ready ? "Ready" : "Queued";
              return (
                <tr key={r.id}>
                  <td style={{ fontWeight: 700 }}>{r.name}</td>
                  <td>{r.nat}</td>
                  <td>{scannedOk ? (r.doc === "Scan pending" ? "OCR · captured 09:14" : r.doc) : r.doc}</td>
                  <td>{r.arr}</td>
                  <td>{r.dep}</td>
                  <td><span className={statusCls(state)}>{state}</span></td>
                  <td className="text-muted" style={{ fontSize: 12 }}>{r.consent}</td>
                  <td>
                    {!scannedOk && <button className="btn btn-secondary" onClick={() => scanPassport(r.id)}><T en="Scan" th="สแกน" /></button>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-muted" style={{ fontSize: 12, marginTop: 10, maxWidth: "76ch" }}>
        <T
          en="TM30 notification is filed through Thailand Immigration's online residence-notification system within 24 hours of arrival. HOTEL24 queues the record at check-in, batches the filing, and keeps the receipt against the reservation."
          th="การแจ้งที่พักคนต่างชาติ TM30 ยื่นผ่านระบบออนไลน์ของสำนักงานตรวจคนเข้าเมืองภายใน 24 ชั่วโมงหลังเข้าพัก HOTEL24 เข้าคิวตอนเช็คอิน ยื่นเป็นชุด และเก็บใบรับไว้กับการจอง"
        />
      </p>

      <div className="split-main" style={{ marginTop: 8 }}>
        <section className="col-pad border-r">
          <h5 className="sec-h">PDPA</h5>
          {[
            { k: "Passport image retention", kt: "เก็บรูปพาสปอร์ต", v: "90 days after checkout", n: "Then only the TM30 receipt and document number are kept" },
            { k: "Consent capture", kt: "เก็บความยินยอม", v: "At booking, both languages", n: "Direct engine and OTA imports both record a basis" },
            { k: "Access log", kt: "บันทึกการเข้าถึง", v: "12 views this week", n: "Front desk 9 · owner 2 · support 1 (with approval)" },
            { k: "Staff permissions", kt: "สิทธิ์พนักงาน", v: "4 roles", n: "Housekeeping cannot open guest documents" },
          ].map((p) => (
            <div key={p.k} className="ctx-row" style={{ alignItems: "flex-start" }}>
              <span><T en={p.k} th={p.kt} /><div className="text-muted" style={{ fontSize: 11, textTransform: "none", letterSpacing: 0, fontWeight: 400 }}>{p.n}</div></span>
              <strong>{p.v}</strong>
            </div>
          ))}
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="Tax documents" th="เอกสารภาษี" /></h5>
          {[
            { k: "Tax invoices issued", kt: "ใบกำกับภาษีที่ออก", v: "38 · ฿1.9M" },
            { k: "Receipts", kt: "ใบเสร็จ", v: "214" },
            { k: "WHT on OTA fees", kt: "ภาษีหัก ณ ที่จ่ายค่าธรรมเนียม OTA", v: "prepared" },
            { k: "Daily reconciliation", kt: "กระทบยอดรายวัน", v: "18 of 19 days clean" },
          ].map((p) => (
            <div key={p.k} className="ctx-row">
              <span><T en={p.k} th={p.kt} /></span>
              <strong>{p.v}</strong>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
