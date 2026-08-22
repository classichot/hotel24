"use client";

import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { PlaybookIndex } from "@/components/Playbook";
import { T } from "@/lib/i18n";
import { MENU_PLAYBOOKS, PLAYBOOK_GROUPS } from "@/lib/playbook";

export default function PlaybookPage() {
  return (
    <div>
      <PageHead
        code="PB-00 · How HOTEL24 works"
        kickerEn="Every menu has a playbook"
        kickerTh="ทุกเมนูมีเพลย์บุ๊ก"
        titleEn="Playbook"
        titleTh="เพลย์บุ๊ก"
        subEn="How to use each screen, and what every RevenueOS engine calculates, writes, and refuses. Seeded demo — an LLM never sets the rate."
        subTh="วิธีใช้แต่ละหน้าจอ และแต่ละเครื่องยนต์ RevenueOS คำนวณอะไร เขียนอะไร ปฏิเสธอะไร เดโมจำลอง — LLM ห้ามตั้งราคา"
      />

      <div className="stat-row" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div className="stat-cell">
          <div className="stat-label"><T en="Screens with a playbook" th="หน้าจอที่มีเพลย์บุ๊ก" /></div>
          <div className="stat-val">{Object.keys(MENU_PLAYBOOKS).length}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Official engines" th="เครื่องยนต์ทางการ" /></div>
          <div className="stat-val">16</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="LLM sets the rate?" th="LLM ตั้งราคา?" /></div>
          <div className="stat-val" style={{ fontSize: 22 }}>No</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label"><T en="Guardian still blocks" th="Guardian ยังบล็อก" /></div>
          <div className="stat-val" style={{ fontSize: 22 }}>฿500</div>
        </div>
      </div>

      <div className="split-main">
        <section className="col-pad border-r">
          <h5 className="sec-h"><T en="Every engine" th="ทุกเครื่องยนต์" /></h5>
          <PlaybookIndex />
        </section>
        <aside className="col-aside">
          <h5 className="sec-h"><T en="Every menu" th="ทุกเมนู" /></h5>
          {PLAYBOOK_GROUPS.map((g) => (
            <div key={g.en} style={{ marginBottom: 18 }}>
              <div className="text-muted" style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
                <T en={g.en} th={g.th} />
              </div>
              {g.hrefs.map((href) => {
                const b = MENU_PLAYBOOKS[href];
                if (!b) return null;
                return (
                  <Link key={href} href={href} className="ctx-row" style={{ textDecoration: "none", color: "inherit" }}>
                    <span>
                      <strong style={{ fontSize: 13 }}><T en={b.title} th={b.titleTh} /></strong>
                      <div className="text-muted" style={{ fontSize: 11 }}>{b.code}</div>
                    </span>
                    <span className="text-muted" style={{ fontSize: 12 }}>→</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
