"use client";

import { PageHead } from "@/components/PageHead";
import { RevenueNav } from "@/components/RevenueNav";
import { T } from "@/lib/i18n";
import { TWIN_SCENARIOS } from "@/lib/revenueos";

export default function RevTwinPage() {
  return (
    <div>
      <PageHead
        code="ROS-07 · Hotel Digital Twin"
        kickerEn="What happens if I raise the rate 15%?"
        kickerTh="จะเกิดอะไรถ้าขึ้นราคา 15%"
        titleEn="Digital Twin"
        titleTh="ฝาแฝดดิจิทัล"
        subEn="Before the Director writes, the twin simulates hold / +11% / +29% on Garden Monday. Scenario B wins RevPAR and net. C looks aggressive and loses."
        subTh="ก่อนผู้อำนวยการเขียน ฝาแฝดจำลองคงราคา / +11% / +29% ของสวนวันจันทร์ สถานการณ์ B ชนะ RevPAR และสุทธิ C ดูแรงแต่แพ้"
      />
      <RevenueNav />

      <div className="callout" style={{ marginTop: 16 }}>
        <T en="This is a seeded twin on Baan Talay’s weekday Garden curve — Phase 1 wow, not a live Monte Carlo." th="ฝาแฝดชุดเมล็ดบนเส้นโค้งสวนวันธรรมดาของบ้านทะเล — เฟส 1 ที่ว้าว ไม่ใช่ Monte Carlo สด" />
      </div>

      <div className="table-wrap" style={{ marginTop: 16 }}>
        <table className="table">
          <thead>
            <tr>
              <th><T en="Scenario" th="สถานการณ์" /></th>
              <th className="num">Occ</th>
              <th className="num">ADR</th>
              <th className="num">RevPAR</th>
              <th className="num"><T en="Exp. net" th="สุทธิคาด" /></th>
            </tr>
          </thead>
          <tbody>
            {TWIN_SCENARIOS.map((s) => (
              <tr key={s.id} style={{ background: s.pick ? "color-mix(in srgb, var(--color-accent) 12%, transparent)" : undefined }}>
                <td>
                  <strong>{s.id}. <T en={s.en} th={s.th} /></strong>
                  {s.pick && <div className="text-muted" style={{ fontSize: 11 }}><T en="Director picks this" th="ผู้อำนวยการเลือกอันนี้" /></div>}
                </td>
                <td className="num">{s.occ}%</td>
                <td className="num">฿{s.adr.toLocaleString()}</td>
                <td className="num">฿{s.revpar.toLocaleString()}</td>
                <td className="num" style={{ fontWeight: 800, color: s.pick ? "var(--color-accent-700)" : undefined }}>฿{s.net.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
