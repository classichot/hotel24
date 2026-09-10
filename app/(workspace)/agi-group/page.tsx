"use client";

import { AgiShell } from "@/components/AgiNav";
import { PageHead } from "@/components/PageHead";
import { AGI_GROUP } from "@/lib/agi";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function AgiGroupPage() {
  const { runAgiMission, approveAgiMission, agiMissions, agiConns } = useStore();
  const st = agiMissions["m-group"] ?? "draft";
  return (
    <div>
      <PageHead
        code="AGI-W5 · Group Deal Desk"
        kickerEn="Enquiry to executable booking"
        kickerTh="จากคำถามสู่จองที่ลงได้"
        titleEn="Group deal desk"
        titleTh="โต๊ะดีลกรุ๊ป"
        subEn="Claude checks capacity, models displacement, prepares three packages, and holds a 48-hour block. A future TOUR24 operator can use the same workflow."
        subTh="Claude ตรวจความจุ โมเดลการเบียด ร่างแพ็กเกจสามแบบ และกันบล็อก 48 ชั่วโมง ตัวดำเนินการ TOUR24 ในอนาคตใช้เวิร์กโฟลว์เดียวกันได้"
        actions={
          <button type="button" className="btn btn-primary" onClick={() => runAgiMission("m-group")} disabled={agiConns.claude !== "live"}>
            <T en="Assign to Claude" th="มอบให้ Claude" />
          </button>
        }
      />
      <AgiShell>
        <p style={{ marginTop: 16 }}>{AGI_GROUP.enquiry}</p>
        <div className="table-wrap" style={{ marginTop: 12 }}>
          <table className="table">
            <thead>
              <tr>
                <th><T en="Package" th="แพ็กเกจ" /></th>
                <th className="num"><T en="Rooms" th="ห้อง" /></th>
                <th className="num"><T en="Total" th="รวม" /></th>
                <th className="num"><T en="Displacement" th="การเบียด" /></th>
                <th />
              </tr>
            </thead>
            <tbody>
              {AGI_GROUP.packages.map((p) => (
                <tr key={p.id} style={p.pick ? { background: "color-mix(in srgb, var(--color-accent) 10%, transparent)" } : undefined}>
                  <td><T en={p.en} th={p.th} /></td>
                  <td className="num">{p.rooms}</td>
                  <td className="num">฿{p.total.toLocaleString()}</td>
                  <td className="num">฿{p.displace.toLocaleString()}</td>
                  <td>{p.pick ? <T en="Recommended" th="แนะนำ" /> : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {st === "awaiting" && (
          <button type="button" className="btn btn-primary" style={{ marginTop: 12 }} onClick={() => approveAgiMission("m-group")}>
            <T en="Hold package B for 48 hours" th="กันแพ็กเกจ B 48 ชั่วโมง" />
          </button>
        )}
      </AgiShell>
    </div>
  );
}
