"use client";

import { AgiShell } from "@/components/AgiNav";
import { PageHead } from "@/components/PageHead";
import { T } from "@/lib/i18n";
import { useStore } from "@/lib/store";

const EVENTS = [
  { t: "06:02", en: "Weekday Sep pace −18% vs last year", th: "จังหวะกลางสัปดาห์ ก.ย. −18% เทียบปีที่แล้ว", run: "m-rev" },
  { t: "07:40", en: "Garden 24 Aug cancelled · 2 nights", th: "สวน 24 ส.ค. ยกเลิก · 2 คืน", run: "m-recover" },
  { t: "08:15", en: "Weekend occ 96% · four rooms still dirty", th: "สุดสัปดาห์ 96% · 4 ห้องยังสกปรก", run: "m-weekend" },
  { t: "08:44", en: "Tour24 group enquiry 12 rooms landed", th: "คำถามกรุ๊ป Tour24 12 ห้องเข้ามา", run: "m-group" },
];

export default function AgiMonitorPage() {
  const { agiOn, agiPaused, runAgiMission, agiConns } = useStore();
  return (
    <div>
      <PageHead
        code="AGI-07 · Continuous Monitoring"
        kickerEn="Not only while the chat is open"
        kickerTh="ไม่ใช่แค่ตอนแชทยังเปิด"
        titleEn="Continuous monitoring"
        titleTh="เฝ้าต่อเนื่อง"
        subEn="HOTEL24 detects events and runs authorised workflows through a supported agent runtime. Pause stops the runtime."
        subTh="HOTEL24 จับเหตุแล้วรันเวิร์กโฟลว์ที่ได้รับสิทธิ์ผ่านรันไทม์เอเจนต์ที่รองรับ หยุดแล้วรันไทม์หยุด"
      />
      <AgiShell>
        <div className="callout" style={{ marginTop: 16 }}>
          <T
            en={agiOn && !agiPaused ? "Runtime is armed on this demo clock. Events below are seeded morning detections." : "Runtime is dark while AGI Mode is off or paused."}
            th={agiOn && !agiPaused ? "รันไทม์ติดอาวุธบนนาฬิกาเดโมนี้ เหตุด้านล่างคือการจับเช้าแบบจำลอง" : "รันไทม์มืดขณะโหมด AGI ปิดหรือหยุด"}
          />
        </div>
        {EVENTS.map((e) => (
          <div key={e.t} className="audit-row">
            <strong>{e.t}</strong>
            <p style={{ margin: "4px 0 8px" }}><T en={e.en} th={e.th} /></p>
            <button type="button" className="btn btn-secondary" onClick={() => runAgiMission(e.run)} disabled={!agiOn || agiPaused || agiConns.grok !== "live"}>
              <T en="Run authorised workflow" th="รันเวิร์กโฟลว์ที่ได้รับสิทธิ์" />
            </button>
          </div>
        ))}
      </AgiShell>
    </div>
  );
}
