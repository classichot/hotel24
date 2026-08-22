/** Seven AI killer features — HOTEL24 proposes, the owner (or autopilot) applies. */

import type { RecStatus } from "./model";

export type AiEngine = "gm" | "autopilot" | "agent" | "recon" | "reputation" | "migrate" | "brief";
export type AiEffect =
  | "fix-loft"
  | "force-agoda"
  | "collect-unpaid"
  | "hk-priority"
  | "file-tm30"
  | "move-209"
  | "ack-cash"
  | "apply-r1"
  | "apply-r2"
  | "apply-r3"
  | "alloc-direct"
  | "send-transfer"
  | "early-checkin"
  | "apply-mod"
  | "webhook-new"
  | "run-reconcile"
  | "merge-dup"
  | "staff-brief"
  | "hk-102"
  | "send-reply"
  | "tag-finance"
  | "start-switch";

export type AiAction = {
  id: string;
  engine: AiEngine;
  brief: boolean;
  sev: "High" | "Medium" | "Low";
  kind: string;
  kindTh: string;
  when: string;
  head: string;
  headTh: string;
  why: string;
  whyTh: string;
  does: string;
  doesTh: string;
  impact?: string;
  href?: string;
  effect: AiEffect;
};

export const AI_ENGINES: {
  id: AiEngine;
  href: string;
  n: string;
  en: string;
  th: string;
  value: string;
}[] = [
  { id: "gm", href: "/gm", n: "01", en: "AI General Manager", th: "GM อัตโนมัติ", value: "5" },
  { id: "autopilot", href: "/autopilot", n: "02", en: "Revenue + Channel Autopilot", th: "ออโตไพลอตรายได้และช่องทาง", value: "5" },
  { id: "agent", href: "/agent", n: "03", en: "AI Reservation / Guest Agent", th: "เอเจนต์จองและแขก", value: "5" },
  { id: "recon", href: "/reconcile", n: "04", en: "AI OTA Reconciliation", th: "กระทบยอด OTA ด้วย AI", value: "5" },
  { id: "reputation", href: "/reputation", n: "05", en: "AI Reputation → Operations", th: "รีวิว → งานปฏิบัติการ", value: "4" },
  { id: "migrate", href: "/migrate", n: "06", en: "AI Migration Agent", th: "เอเจนต์ย้ายระบบ", value: "5" },
  { id: "brief", href: "/line", n: "07", en: "Owner Morning Brief + Action", th: "สรุปเช้า + ปุ่มอนุมัติ", value: "5" },
];

export const AI_ACTIONS: AiAction[] = [
  {
    id: "gm-loft",
    engine: "gm",
    brief: true,
    sev: "High",
    kind: "Overbooking",
    kindTh: "ขายเกิน",
    when: "since 17 Aug",
    head: "Family Loft is uncontrolled on Expedia",
    headTh: "แฟมิลี่ลอฟท์บน Expedia ยังไม่มีตัวคุมห้อง",
    why: "Six room-nights sold without a map. Tonight is oversold. The GM will map Family Loft → Expedia Family Loft and close the type for tonight.",
    whyTh: "ขายไป 6 คืนโดยยังไม่ map คืนนี้ขายเกิน GM จะ map แล้วปิดประเภทนี้คืนนี้",
    does: "Map loft · close Shield · queue ARI",
    doesTh: "map ลอฟท์ · ปิด Shield · คิว ARI",
    impact: "Stop oversell",
    href: "/mapping",
    effect: "fix-loft",
  },
  {
    id: "gm-unpaid",
    engine: "gm",
    brief: true,
    sev: "High",
    kind: "Cash",
    kindTh: "เงินสด",
    when: "arriving today",
    head: "฿16,810 unpaid on two arrivals",
    headTh: "ค้างชำระ ฿16,810 จากแขกเข้า 2 ราย",
    why: "ชัยวัฒน์ ฿4,410 (14:20) and Al-Farsi ฿12,400 (16:00). Collect PromptPay before keys, or the evening recon will miss it again.",
    whyTh: "ชัยวัฒน์ ฿4,410 (14:20) และ Al-Farsi ฿12,400 (16:00) เก็บ PromptPay ก่อนมอบกุญแจ",
    does: "Collect both balances · PromptPay",
    doesTh: "เก็บทั้งสองยอด · PromptPay",
    impact: "฿16,810",
    href: "/front-desk",
    effect: "collect-unpaid",
  },
  {
    id: "gm-rooms",
    engine: "gm",
    brief: true,
    sev: "High",
    kind: "Housekeeping",
    kindTh: "แม่บ้าน",
    when: "before 14:00",
    head: "Four rooms still blocking arrivals",
    headTh: "4 ห้องยังขวางแขกเข้า",
    why: "104, 207, 311 and V2 are dirty. First arrival that needs a clean room is 14:00. Push them to Cleaning now so inspect can finish by 13:30.",
    whyTh: "104, 207, 311 และ V2 ยังไม่ทำ แขกแรกที่ต้องห้องพร้อมคือ 14:00 ดันเข้ากำลังทำทันที",
    does: "Advance 104 / 207 / 311 / V2 to Cleaning",
    doesTh: "เลื่อน 104 / 207 / 311 / V2 เป็นกำลังทำ",
    href: "/housekeeping",
    effect: "hk-priority",
  },
  {
    id: "gm-209",
    engine: "gm",
    brief: true,
    sev: "High",
    kind: "Complaint",
    kindTh: "คำร้องเรียน",
    when: "06:25",
    head: "Move room 209 — aircon, two nights left",
    headTh: "ย้ายห้อง 209 — แอร์เสีย เหลือ 2 คืน",
    why: "Guest asked for a move or a partial refund. Refunds are outside AI authority. Suite 301 is Ready. Offer the move; keep the folio whole.",
    whyTh: "แขกขอย้ายหรือคืนเงินบางส่วน การคืนเงินอยู่นอกอำนาจ AI ห้อง 301 พร้อมขาย เสนอย้าย โฟลิโอไม่ต้องคืน",
    does: "Assign 301 · notify HK · close 209 to maintenance",
    doesTh: "จัด 301 · แจ้งแม่บ้าน · ปิด 209 ซ่อม",
    href: "/inbox",
    effect: "move-209",
  },
  {
    id: "gm-agoda",
    engine: "gm",
    brief: true,
    sev: "Medium",
    kind: "Distribution",
    kindTh: "กระจายห้อง",
    when: "11 min stale",
    head: "Agoda ARI has not acked for 12 minutes",
    headTh: "Agoda ยังไม่ ack ARI มา 12 นาที",
    why: "Usual round trip is 40 seconds. Pause extra rate pushes and force the queued availability now.",
    whyTh: "ปกติไปกลับ 40 วินาที หยุดดันราคาเพิ่ม แล้วบังคับดันห้องที่ค้าง",
    does: "Force Agoda ARI re-push",
    doesTh: "บังคับดัน ARI Agoda",
    href: "/sync",
    effect: "force-agoda",
  },
  {
    id: "gm-tm30",
    engine: "gm",
    brief: false,
    sev: "Medium",
    kind: "Compliance",
    kindTh: "กฎหมาย",
    when: "within 24 h",
    head: "File TM30 for three foreign arrivals",
    headTh: "ยื่น TM30 แขกต่างชาติ 3 ราย",
    why: "Garcia and Al-Farsi still need a passport scan. Weber is ready. File the batch once scans are in — Immigration wants it within 24 hours of check-in.",
    whyTh: "Garcia กับ Al-Farsi ยังไม่ได้สแกนพาสปอร์ต Weber พร้อม ยื่นชุดเมื่อสแกนครบ ตม. ต้องการภายใน 24 ชั่วโมงหลังเช็คอิน",
    does: "Scan pending passports · file TM30 batch",
    doesTh: "สแกนพาสปอร์ตที่ค้าง · ยื่น TM30 ชุด",
    href: "/compliance",
    effect: "file-tm30",
  },
  {
    id: "gm-cash",
    engine: "gm",
    brief: true,
    sev: "Medium",
    kind: "Finance",
    kindTh: "การเงิน",
    when: "18 Aug close",
    head: "Front desk cash is ฿1,200 short",
    headTh: "เงินสดหน้าเคาน์เตอร์ขาด ฿1,200",
    why: "Evening recon on 18 Aug did not match. Flag it on the owner brief. Do not silently write it off.",
    whyTh: "กระทบยอดเย็น 18 ส.ค. ไม่ตรง ติดบนสรุปเช้า ห้ามตัดบัญชีเงียบ ๆ",
    does: "Log exception on Finance · keep it open",
    doesTh: "บันทึกข้อผิดปกติที่การเงิน · ยังไม่ปิด",
    href: "/finance",
    effect: "ack-cash",
  },
  {
    id: "ap-r1",
    engine: "autopilot",
    brief: true,
    sev: "High",
    kind: "Rate",
    kindTh: "ราคา",
    when: "Sat 22 – Sun 23",
    head: "Garden Deluxe ฿2,200 → ฿2,550",
    headTh: "ดีลักซ์สวน ฿2,200 → ฿2,550",
    why: "Occupancy reached 82% and Krabi weekend demand is rising. Lift BAR on all channels. Reason stays on the audit.",
    whyTh: "ห้องเต็ม 82% ความต้องการสุดสัปดาห์กระบี่กำลังขึ้น ยก BAR ทุกช่องทาง เหตุผลอยู่ในบันทึก",
    does: "Write ARI ฿2,550 · queue all connected OTAs",
    doesTh: "เขียน ARI ฿2,550 · คิวทุก OTA ที่เชื่อม",
    impact: "+฿4,900",
    href: "/inventory",
    effect: "apply-r1",
  },
  {
    id: "ap-r2",
    engine: "autopilot",
    brief: false,
    sev: "Medium",
    kind: "Restriction",
    kindTh: "ข้อจำกัด",
    when: "Mon 24 – Thu 27",
    head: "Pool Access 2-night minimum",
    headTh: "พูลแอคเซส ขั้นต่ำ 2 คืน",
    why: "Single weekday nights are fragmenting the week. Two-night minimum keeps a three-night stay sellable.",
    whyTh: "จองคืนเดียวกลางสัปดาห์ทำให้สัปดาห์ขาดช่วง ขั้นต่ำ 2 คืนเก็บบล็อก 3 คืนไว้ขายได้",
    does: "Set min-stay 2 · push restrictions",
    doesTh: "ตั้งขั้นต่ำ 2 · ดันข้อจำกัด",
    impact: "+฿6,200",
    href: "/inventory",
    effect: "apply-r2",
  },
  {
    id: "ap-r3",
    engine: "autopilot",
    brief: false,
    sev: "Medium",
    kind: "Last-minute",
    kindTh: "นาทีสุดท้าย",
    when: "Tonight · Agoda only",
    head: "Sea View Suite −12% on Agoda",
    headTh: "สวีทวิวทะเล −12% บน Agoda",
    why: "Four suites unsold at 09:00. Agoda converts last-minute about 3× better. Direct and Booking.com stay at BAR.",
    whyTh: "สวีทว่าง 4 ห้องตอน 09:00 Agoda แปลงนาทีสุดท้ายได้ดีกว่าประมาณ 3 เท่า จองตรงกับ Booking.com ยัง BAR",
    does: "Agoda-only rate ฿3,784 · other channels untouched",
    doesTh: "ราคา Agoda ฿3,784 · ช่องทางอื่นไม่แตะ",
    impact: "+฿7,300",
    href: "/profit",
    effect: "apply-r3",
  },
  {
    id: "ap-alloc",
    engine: "autopilot",
    brief: false,
    sev: "High",
    kind: "Allocation",
    kindTh: "จัดสรรห้อง",
    when: "rest of August",
    head: "Move 4 Garden rooms off Agoda onto Direct",
    headTh: "ย้าย Garden 4 ห้องออกจาก Agoda มาจองตรง",
    why: "Agoda sold 1.8× more room-nights than direct last month and still left ฿751 less net per night after commission and promos. Hold four rooms for LINE / GBP.",
    whyTh: "Agoda ขายคืนมากกว่าจองตรง 1.8 เท่า แต่สุทธิต่ำกว่า ฿751 ต่อคืน กัน 4 ห้องให้ LINE / GBP",
    does: "Allotment Agoda 12→8 · Direct 14→18 · stop-sell those 4 on Agoda",
    doesTh: "จัดสรร Agoda 12→8 · จองตรง 14→18 · ปิดขาย 4 ห้องบน Agoda",
    impact: "+฿3,004 / night held",
    href: "/direct",
    effect: "alloc-direct",
  },
  {
    id: "ag-transfer",
    engine: "agent",
    brief: false,
    sev: "Low",
    kind: "LINE",
    kindTh: "LINE",
    when: "09:04",
    head: "Confirm Krabi airport pickup · H24-8841",
    headTh: "ยืนยันรถรับสนามบินกระบี่ · H24-8841",
    why: "ชัยวัฒน์ asked in Thai. Transfer is ฿800, van, 14:00, name board. Agent can book it. Refunds it cannot.",
    whyTh: "ชัยวัฒน์ถามเป็นไทย รถตู้ ฿800 รับ 14:00 มีป้ายชื่อ เอเจนต์จองได้ คืนเงินไม่ได้",
    does: "Add transfer to folio · send LINE in Thai",
    doesTh: "เพิ่มรถรับที่โฟลิโอ · ส่ง LINE เป็นไทย",
    href: "/inbox",
    effect: "send-transfer",
  },
  {
    id: "ag-early",
    engine: "agent",
    brief: false,
    sev: "Low",
    kind: "WhatsApp",
    kindTh: "WhatsApp",
    when: "08:47",
    head: "Early check-in 11:00 · Müller · room 101",
    headTh: "เช็คอิน 11:00 · Müller · ห้อง 101",
    why: "Room 101 is Ready. Policy: free before 12:00 when the room is clean. Agent holds it from 11:00.",
    whyTh: "ห้อง 101 พร้อมขาย นโยบาย: ฟรีก่อน 12:00 ถ้าห้องสะอาด เอเจนต์กันห้องตั้งแต่ 11:00",
    does: "Hold 101 from 11:00 · reply on WhatsApp",
    doesTh: "กัน 101 ตั้งแต่ 11:00 · ตอบ WhatsApp",
    href: "/inbox",
    effect: "early-checkin",
  },
  {
    id: "ag-extend",
    engine: "agent",
    brief: false,
    sev: "Medium",
    kind: "Booking.com",
    kindTh: "Booking.com",
    when: "modification",
    head: "Weber asked to stay 20–23 Aug, not 20–22",
    headTh: "Weber ขออยู่ 20–23 ส.ค. จาก 20–22",
    why: "OTA modification, not a new booking. Agent applies MODIFIED, recalculates loft inventory, pushes ARI.",
    whyTh: "เป็นการแก้จาก OTA ไม่ใช่จองใหม่ เอเจนต์ใส่ MODIFIED คำนวณห้องลอฟท์ใหม่ แล้วดัน ARI",
    does: "Apply modification · loft 22 Aug −1 · re-push",
    doesTh: "ใช้การแก้ · ลอฟท์ 22 ส.ค. −1 · ดันใหม่",
    href: "/sync",
    effect: "apply-mod",
  },
  {
    id: "ag-new",
    engine: "agent",
    brief: false,
    sev: "Medium",
    kind: "Agoda",
    kindTh: "Agoda",
    when: "inbound",
    head: "Create reservation from Agoda webhook",
    headTh: "สร้างการจองจาก webhook Agoda",
    why: "NEW reservation must land in HOTEL24, drop garden availability 24–25 Aug, then push every OTA. Agent does not wait for the front desk to type it.",
    whyTh: "จองใหม่ต้องเข้า HOTEL24 ลดห้องสวน 24–25 ส.ค. แล้วดันทุก OTA เอเจนต์ไม่รอให้เคาน์เตอร์คีย์",
    does: "NEW · ack · inventory −1 · ARI to all",
    doesTh: "จองใหม่ · ack · ห้อง −1 · ARI ทุกช่อง",
    href: "/sync",
    effect: "webhook-new",
  },
  {
    id: "rc-trip",
    engine: "recon",
    brief: false,
    sev: "High",
    kind: "Mismatch",
    kindTh: "ไม่ตรง",
    when: "every 3 h",
    head: "Trip.com Garden 20 Aug shows 2 — HOTEL24 has 3",
    headTh: "Trip.com สวน 20 ส.ค. ว่าง 2 — HOTEL24 มี 3",
    why: "Automatic reconciliation: detect, force ARI, recheck. If it fails, raise a distribution alert instead of hoping the extranet catches up.",
    whyTh: "กระทบยอดอัตโนมัติ: จับ บังคับ ARI ตรวจซ้ำ ถ้าไม่ผ่านค่อยเตือน ไม่รอให้ออกเน็ตตาม",
    does: "Auto-resync Trip.com availability = 3",
    doesTh: "ซิงก์ Trip.com ว่าง = 3",
    href: "/sync",
    effect: "run-reconcile",
  },
  {
    id: "rc-agoda",
    engine: "recon",
    brief: false,
    sev: "Medium",
    kind: "Stale ARI",
    kindTh: "ARI ค้าง",
    when: "11 min",
    head: "Agoda availability job still in retry",
    headTh: "งานว่างบน Agoda ยังอยู่ใน retry",
    why: "Same stale push the GM already sees. Recon owns the retry queue; applying here or on GM closes both.",
    whyTh: "งานค้างชุดเดียวกับที่ GM เห็น Recon เป็นเจ้าของคิว retry กดที่นี่หรือที่ GM ปิดทั้งคู่",
    does: "Retry job · mark complete on ack",
    doesTh: "retry งาน · ปิดเมื่อได้ ack",
    href: "/sync",
    effect: "force-agoda",
  },
  {
    id: "rc-dup",
    engine: "recon",
    brief: false,
    sev: "Medium",
    kind: "Duplicate",
    kindTh: "จองซ้ำ",
    when: "import",
    head: "Müller exists as Cloudbeds 7F92A1 and H24-8802",
    headTh: "Müller มีทั้ง Cloudbeds 7F92A1 และ H24-8802",
    why: "Same guest, same dates, two IDs. Keep HOTEL24 H24-8802 as system of record. Archive the Cloudbeds id on the guest.",
    whyTh: "แขกคนเดียว วันที่เดียว สองเลข เก็บ H24-8802 เป็นต้นฉบับ เลข Cloudbeds เก็บที่โปรไฟล์แขก",
    does: "Merge · keep H24-8802 · audit both ids",
    doesTh: "รวม · เก็บ H24-8802 · บันทึกทั้งสองเลข",
    href: "/reservations",
    effect: "merge-dup",
  },
  {
    id: "rp-ac",
    engine: "reputation",
    brief: false,
    sev: "High",
    kind: "Google 2★",
    kindTh: "Google 2★",
    when: "06:40",
    head: "Review: aircon in 209 ‘did not sleep’",
    headTh: "รีวิว: แอร์ห้อง 209 นอนไม่หลับ",
    why: "Same guest who messaged on LINE. Reputation engine opens maintenance, offers 301, and drafts a public reply only after the move.",
    whyTh: "แขกคนเดียวกับที่ทัก LINE เครื่องยนต์รีวิวเปิดงานซ่อม เสนอย้าย 301 และร่างตอบสาธารณะหลังย้าย",
    does: "Ops ticket + room move (same as GM)",
    doesTh: "เปิดงานปฏิบัติการ + ย้ายห้อง (ชุดเดียวกับ GM)",
    href: "/housekeeping",
    effect: "move-209",
  },
  {
    id: "rp-breakfast",
    engine: "reputation",
    brief: false,
    sev: "Medium",
    kind: "Agoda 3★",
    kindTh: "Agoda 3★",
    when: "yesterday",
    head: "Slow breakfast service — three mentions this week",
    headTh: "อาหารเช้าช้า — พูดถึง 3 ครั้งสัปดาห์นี้",
    why: "Not a room defect. Brief the F&B lead: two extra hands 08:00–09:30 until occupancy drops under 75%.",
    whyTh: "ไม่ใช่ห้องเสีย บรีฟหัวหน้าอาหาร: เพิ่ม 2 คน 08:00–09:30 จนกว่าเข้าพักต่ำกว่า 75%",
    does: "Staff briefing · no public refund",
    doesTh: "บรีฟพนักงาน · ไม่คืนเงินสาธารณะ",
    href: "/dashboard",
    effect: "staff-brief",
  },
  {
    id: "rp-noise",
    engine: "reputation",
    brief: false,
    sev: "Low",
    kind: "Booking.com 3★",
    kindTh: "Booking.com 3★",
    when: "18 Aug",
    head: "Noise from 102 during late clean",
    headTh: "เสียงจาก 102 ตอนเก็บห้องดึก",
    why: "Housekeeping ran a late turnover next to an in-house guest. Tag 102: no vacuum after 21:00 when 101 is occupied.",
    whyTh: "แม่บ้านเก็บห้องดึกติดแขกที่ยังอยู่ ติดป้าย 102: ห้ามดูดฝุ่นหลัง 21:00 ถ้า 101 มีแขก",
    does: "HK rule on 102 · add to board note",
    doesTh: "กฎแม่บ้านที่ 102 · ติดโน้ตบนกระดาน",
    href: "/housekeeping",
    effect: "hk-102",
  },
  {
    id: "rp-reply",
    engine: "reputation",
    brief: false,
    sev: "Low",
    kind: "Reply",
    kindTh: "ตอบรีวิว",
    when: "after ops",
    head: "Draft public replies in EN / TH",
    headTh: "ร่างตอบสาธารณะ EN / TH",
    why: "Do not apologise with a refund in public. Acknowledge, say what changed (301 move, breakfast staffing), invite a LINE follow-up.",
    whyTh: "ห้ามขอโทษด้วยการคืนเงินในที่สาธารณะ รับเรื่อง บอกว่าแก้อะไร (ย้าย 301, คนอาหารเช้า) ชวนต่อบน LINE",
    does: "Queue three replies · owner can edit",
    doesTh: "คิวตอบ 3 รายการ · เจ้าของแก้ได้",
    effect: "send-reply",
  },
  {
    id: "mg-loft",
    engine: "migrate",
    brief: false,
    sev: "High",
    kind: "Map",
    kindTh: "จับคู่",
    when: "Cloudbeds import",
    head: "Propose Family Loft → Expedia Family Loft (96%)",
    headTh: "เสนอแฟมิลี่ลอฟท์ → Expedia Family Loft (96%)",
    why: "Cloudbeds left this unmapped too. The agent matches on occupancy, bed count and the Expedia listing name. Accept before cut-over or Shield stays red.",
    whyTh: "Cloudbeds ก็ยังไม่ map เอเจนต์จับจากจำนวนคน เตียง และชื่อลิสต์ Expedia รับก่อนตัดสลับ ไม่งั้น Shield ยังแดง",
    does: "Accept map · same as Connection Center fix",
    doesTh: "รับ map · ชุดเดียวกับปุ่มที่ศูนย์ช่องทาง",
    href: "/mapping",
    effect: "fix-loft",
  },
  {
    id: "mg-dup",
    engine: "migrate",
    brief: false,
    sev: "Medium",
    kind: "Conflict",
    kindTh: "ชนกัน",
    when: "reservations",
    head: "Same Müller stay, two source ids",
    headTh: "การเข้าพัก Müller เดียวกัน สองเลขต้นทาง",
    why: "Migration must not create a double room-night. Merge before the channel manager points here.",
    whyTh: "การย้ายห้ามสร้างคืนห้องซ้ำ รวมก่อนที่ตัวจัดการช่องทางจะชี้มาที่นี่",
    does: "Merge into H24-8802",
    doesTh: "รวมเป็น H24-8802",
    href: "/switch",
    effect: "merge-dup",
  },
  {
    id: "mg-tax",
    engine: "migrate",
    brief: false,
    sev: "Low",
    kind: "Folio",
    kindTh: "โฟลิโอ",
    when: "Little Hotelier / Cloudbeds",
    head: "Two hotel-collect rates have no tax split",
    headTh: "เรท hotel collect 2 รายการยังไม่แยกภาษี",
    why: "Tag for Finance. Do not block cut-over. Thai tax invoice still needs the split after go-live.",
    whyTh: "ติดป้ายให้การเงิน ไม่บล็อกตัดสลับ ใบกำกับภาษียังต้องแยกหลังเปิดใช้",
    does: "Tag Finance · continue switch",
    doesTh: "ติดป้ายการเงิน · ไปต่อได้",
    href: "/finance",
    effect: "tag-finance",
  },
  {
    id: "mg-go",
    engine: "migrate",
    brief: false,
    sev: "High",
    kind: "Cut over",
    kindTh: "ตัดสลับ",
    when: "when maps accepted",
    head: "Cut over — HOTEL24 becomes the system of record",
    headTh: "ตัดสลับ — HOTEL24 เป็นระบบจริง",
    why: "Rooms, rates, maps, reservations, guests and folios are staged. Channel manager points here. Old PMS stays read-only 30 days.",
    whyTh: "ห้อง ราคา map การจอง แขก โฟลิโอพร้อมแล้ว ตัวจัดการช่องทางชี้มาที่นี่ ระบบเดิมอ่านอย่างเดียว 30 วัน",
    does: "Run the one-button switch",
    doesTh: "กดปุ่มย้ายระบบ",
    href: "/switch",
    effect: "start-switch",
  },
];

export const ALLOTMENT_SEED: { id: string; en: string; th: string; rooms: number }[] = [
  { id: "direct", en: "HOTEL24 Direct", th: "จองตรง", rooms: 14 },
  { id: "booking", en: "Booking.com", th: "Booking.com", rooms: 12 },
  { id: "agoda", en: "Agoda", th: "Agoda", rooms: 12 },
  { id: "expedia", en: "Expedia", th: "Expedia", rooms: 4 },
];

export const RECON_GRID = [
  { ota: "Booking.com", date: "20 Aug", type: "Garden Deluxe", hotel24: 3, remote: 3, ok: true },
  { ota: "Agoda", date: "20 Aug", type: "Garden Deluxe", hotel24: 3, remote: 3, ok: true },
  { ota: "Expedia", date: "20 Aug", type: "Garden Deluxe", hotel24: 3, remote: 3, ok: true },
  { ota: "Trip.com", date: "20 Aug", type: "Garden Deluxe", hotel24: 3, remote: 2, ok: false },
  { ota: "Airbnb", date: "20 Aug", type: "Sea View Suite", hotel24: 3, remote: 3, ok: true },
];

export const REVIEWS = [
  {
    id: "rv1",
    src: "Google",
    score: 2,
    when: "06:40",
    guest: "In-house · 209",
    en: "Aircon did not cool all night. Could not sleep. Asked to move.",
    th: "แอร์ไม่เย็นทั้งคืน นอนไม่ได้ ขอย้ายห้อง",
    topic: "Aircon · 209",
  },
  {
    id: "rv2",
    src: "Agoda",
    score: 3,
    when: "18 Aug",
    guest: "Lim, W.",
    en: "Room fine. Breakfast queue was 25 minutes. Only two staff.",
    th: "ห้องโอเค คิวอาหารเช้า 25 นาที มีพนักงานสองคน",
    topic: "Breakfast staffing",
  },
  {
    id: "rv3",
    src: "Booking.com",
    score: 3,
    when: "18 Aug",
    guest: "Müller, S.",
    en: "Nice garden room. Vacuum next door after 21:00.",
    th: "ห้องสวนดี เสียงดูดฝุ่นห้องข้างหลัง 21:00",
    topic: "Late HK · 102",
  },
  {
    id: "rv4",
    src: "Google",
    score: 5,
    when: "17 Aug",
    guest: "Chen, Y.",
    en: "Late checkout as promised. Will book direct next time.",
    th: "เช็คเอาท์สายตามที่สัญญา จะจองตรงครั้งหน้า",
    topic: "Direct benefit",
  },
];

export const MIGRATE_MAPS = [
  { hotel24: "Garden Deluxe", src: "Cloudbeds Deluxe Garden", ota: "Booking.com Deluxe Garden View", conf: 99, state: "Ready" },
  { hotel24: "Garden Deluxe", src: "Cloudbeds Deluxe Garden", ota: "Agoda Deluxe Garden", conf: 98, state: "Ready" },
  { hotel24: "Pool Access", src: "Cloudbeds Pool Access", ota: "Booking.com Pool Access Room", conf: 97, state: "Ready" },
  { hotel24: "Family Loft", src: "Cloudbeds Family Loft", ota: "Expedia — unmapped", conf: 96, state: "Needs accept" },
  { hotel24: "Beach Villa 2BR", src: "Cloudbeds 2BR Villa", ota: "Agoda Two-Bedroom Beach Villa", conf: 94, state: "Ready" },
  { hotel24: "BAR / Room Only", src: "Cloudbeds BAR", ota: "Booking.com Standard", conf: 93, state: "Ready" },
];

export function actionsFor(engine: AiEngine) {
  if (engine === "brief") return AI_ACTIONS.filter((a) => a.brief);
  return AI_ACTIONS.filter((a) => a.engine === engine);
}

export function pendingCount(state: Record<string, RecStatus>, engine?: AiEngine) {
  const list = engine ? actionsFor(engine) : AI_ACTIONS;
  return list.filter((a) => (state[a.id] ?? "pending") === "pending").length;
}

export function highPending(state: Record<string, RecStatus>) {
  return AI_ACTIONS.filter((a) => a.sev === "High" && (state[a.id] ?? "pending") === "pending").length;
}

export function gmQueue(state: Record<string, RecStatus>) {
  return AI_ACTIONS.filter((a) => a.engine === "gm" && (state[a.id] ?? "pending") === "pending");
}

export function gmHighQueue(state: Record<string, RecStatus>) {
  return gmQueue(state).filter((a) => a.sev === "High");
}
