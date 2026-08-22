/** HOTEL24 RevenueOS — Autonomous AI Revenue Team.
 *  Agents think and explain. Engines calculate. Guardian controls risk.
 *  Execution writes rates, inventory and campaigns — an LLM never picks ฿4,900 alone.
 *  Phase 1: eight engines + Revenue Director. Seeded ensemble, not a live LightGBM.
 */

export type RevLevel = 0 | 1 | 2 | 3;
export type RevStatus = "pending" | "applied" | "dismissed" | "blocked";
export type RevRisk = "low" | "medium" | "high" | "blocked";
export type RevBrain = "demand" | "price" | "inventory" | "distribution" | "commercial";
export type RevAgent =
  | "director"
  | "demand"
  | "pricing"
  | "inventory"
  | "market"
  | "distribution"
  | "group"
  | "promotion"
  | "total"
  | "analyst"
  | "guardian"
  | "hunter";

export type RevWrite =
  | { kind: "rate"; room: string; dates: string[]; rate: number }
  | { kind: "minStay"; room: string; dates: string[]; minStay: number }
  | { kind: "allot"; from: string; to: string; rooms: number }
  | { kind: "benefit"; id: string }
  | { kind: "note" }
  | { kind: "block" };

export type RevDecision = {
  id: string;
  no: string;
  agent: RevAgent;
  brain: RevBrain;
  sev: "High" | "Medium" | "Low";
  dates: string;
  room?: string;
  oldBar?: number;
  newBar?: number;
  head: string;
  headTh: string;
  why: string;
  whyTh: string;
  does: string;
  doesTh: string;
  expected: number;
  confidence: number;
  risk: RevRisk;
  alternatives: { en: string; th: string }[];
  engines: string[];
  write: RevWrite;
  href?: string;
};

export const REV_LEVELS: { id: RevLevel; en: string; th: string; hint: string; hintTh: string }[] = [
  { id: 0, en: "L0 Insight", th: "L0 ดูอย่างเดียว", hint: "Recommend only. Nothing writes.", hintTh: "เสนออย่างเดียว ยังไม่เขียน" },
  { id: 1, en: "L1 Assisted", th: "L1 ช่วยตัดสิน", hint: "Director drafts a daily plan. You approve each write.", hintTh: "ผู้อำนวยการร่างแผนวัน คุณอนุมัติทีละรายการ" },
  { id: 2, en: "L2 Guardrailed", th: "L2 มีรั้ว", hint: "Default. Auto-executes inside Guardian limits.", hintTh: "ค่าเริ่มต้น ทำอัตโนมัติในรั้ว Guardian" },
  { id: 3, en: "L3 Autonomous", th: "L3 อัตโนมัติเต็ม", hint: "You set objective and floors. HOTEL24 does the job.", hintTh: "คุณตั้งเป้าและราคาพื้น HOTEL24 ทำต่อ" },
];

export const REV_AGENTS: {
  id: RevAgent;
  en: string;
  th: string;
  human: string;
  humanTh: string;
  phase: 1 | 2 | 3;
}[] = [
  { id: "director", en: "Revenue Director AI", th: "ผู้อำนวยการรายได้ AI", human: "Director of Revenue", humanTh: "ผู้อำนวยการรายได้", phase: 1 },
  { id: "demand", en: "Demand AI", th: "ดีมานด์ AI", human: "Forecasting analyst", humanTh: "นักพยากรณ์", phase: 1 },
  { id: "pricing", en: "Pricing AI", th: "ราคา AI", human: "Pricing RM", humanTh: "ผู้จัดการราคา", phase: 1 },
  { id: "inventory", en: "Inventory AI", th: "ห้องคงเหลือ AI", human: "Inventory manager", humanTh: "ผู้จัดการห้อง", phase: 1 },
  { id: "market", en: "Market Intelligence AI", th: "ตลาด AI", human: "Market analyst", humanTh: "นักวิเคราะห์ตลาด", phase: 1 },
  { id: "distribution", en: "Distribution AI", th: "ช่องทาง AI", human: "Distribution manager", humanTh: "ผู้จัดการช่องทาง", phase: 1 },
  { id: "guardian", en: "Revenue Guardian AI", th: "ผู้พิทักษ์รายได้", human: "Risk / controller", humanTh: "ควบคุมความเสี่ยง", phase: 1 },
  { id: "analyst", en: "Revenue Analyst AI", th: "นักวิเคราะห์รายได้", human: "Commercial analyst", humanTh: "นักวิเคราะห์พาณิชย์", phase: 1 },
  { id: "group", en: "Group Revenue AI", th: "กรุ๊ป AI", human: "Group RM", humanTh: "ผู้จัดการกรุ๊ป", phase: 2 },
  { id: "promotion", en: "Promotion AI", th: "โปรโมชัน AI", human: "Revenue + marketing", humanTh: "รายได้ + การตลาด", phase: 2 },
  { id: "total", en: "Total Revenue AI", th: "รายได้รวม AI", human: "Total revenue manager", humanTh: "ผู้จัดการรายได้รวม", phase: 3 },
  { id: "hunter", en: "Opportunity Hunter", th: "นักล่าโอกาส", human: "Commercial scout", humanTh: "สอดแนมรายได้", phase: 1 },
];

export const REV_BRAINS = [
  { id: "demand" as const, href: "/rev-demand", en: "Demand Brain", th: "สมองดีมานด์", q: "Who will book, when, and how much?" },
  { id: "price" as const, href: "/rev-pricing", en: "Price Brain", th: "สมองราคา", q: "What should we charge?" },
  { id: "inventory" as const, href: "/rev-inventory", en: "Inventory Brain", th: "สมองห้อง", q: "Who should get scarce rooms?" },
  { id: "distribution" as const, href: "/rev-distribution", en: "Distribution Brain", th: "สมองช่องทาง", q: "Where should we sell?" },
  { id: "commercial" as const, href: "/revenue-os", en: "Commercial Brain", th: "สมองพาณิชย์", q: "How do we maximise total guest value?" },
];

export const REV_ENGINES = [
  { id: "forecast", brain: "demand", phase: 1, en: "Demand Forecast Engine", th: "เครื่องพยากรณ์ดีมานด์" },
  { id: "curve", brain: "demand", phase: 1, en: "Booking Curve + Pickup Engine", th: "เส้นโค้งจอง + ความเร็ว" },
  { id: "comp", brain: "demand", phase: 1, en: "Competitor Intelligence Engine", th: "ข่าวกรองคู่แข่ง" },
  { id: "event", brain: "demand", phase: 1, en: "Event Intelligence Engine", th: "ข่าวกรองอีเวนต์" },
  { id: "compress", brain: "demand", phase: 1, en: "Market Compression Engine", th: "เครื่องวัดการบีบตลาด" },
  { id: "price", brain: "price", phase: 1, en: "Dynamic Pricing Engine", th: "เครื่องตั้งราคาไดนามิก" },
  { id: "elastic", brain: "price", phase: 2, en: "Price Elasticity / WTP Engine", th: "ความยืดหยุ่นราคา / WTP" },
  { id: "twin", brain: "price", phase: 1, en: "Hotel Digital Twin Engine", th: "ฝาแฝดดิจิทัลโรงแรม" },
  { id: "inv", brain: "inventory", phase: 1, en: "Inventory Optimization Engine", th: "เครื่องจัดสรรห้อง" },
  { id: "overbook", brain: "inventory", phase: 2, en: "Overbooking Engine", th: "เครื่องขายเกินคำนวณ" },
  { id: "cancel", brain: "inventory", phase: 2, en: "Cancellation Prediction Engine", th: "เครื่องทำนายยกเลิก" },
  { id: "group", brain: "inventory", phase: 2, en: "Group Displacement Engine", th: "เครื่องวัดการเบียดแขกเดิน" },
  { id: "channel", brain: "distribution", phase: 1, en: "Channel Profitability Engine", th: "เครื่องกำไรต่อช่องทาง" },
  { id: "alloc", brain: "distribution", phase: 2, en: "Channel Allocation Engine", th: "เครื่องจัดสรรช่องทาง" },
  { id: "direct", brain: "distribution", phase: 2, en: "Direct Conversion Engine", th: "เครื่องแปลงจองตรง" },
  { id: "promo", brain: "distribution", phase: 2, en: "Promotion Optimization Engine", th: "เครื่องโปรโมชัน" },
  { id: "guard", brain: "commercial", phase: 1, en: "Revenue Guardian Engine", th: "เครื่องรั้วรายได้" },
  { id: "attr", brain: "commercial", phase: 2, en: "Revenue Attribution Engine", th: "เครื่องอธิบายรายได้" },
  { id: "guest", brain: "commercial", phase: 3, en: "Total Guest Value Engine", th: "เครื่องมูลค่าแขก" },
  { id: "upgrade", brain: "commercial", phase: 3, en: "Upgrade Engine", th: "เครื่องอัปเกรด" },
  { id: "experiment", brain: "commercial", phase: 3, en: "Experimentation Engine", th: "เครื่องทดลอง" },
];

export const GUARDRAILS = [
  { id: "pct", en: "Never increase a rate more than 30% in one change", th: "ห้ามขึ้นราคาเกิน 30% ในครั้งเดียว", floor: true },
  { id: "floor", en: "Never sell below the hotel floor rate", th: "ห้ามขายต่ำกว่าราคาพื้น", floor: true },
  { id: "ob", en: "Never overbook above the owner threshold", th: "ห้ามขายเกินเพดานที่เจ้าของตั้ง", floor: true },
  { id: "close", en: "Never close every distribution channel at once", th: "ห้ามปิดทุกช่องทางพร้อมกัน", floor: true },
  { id: "parity", en: "Never undercut the public OTA rate on Direct", th: "ห้ามตัดราคา OTA บนจองตรง", floor: true },
  { id: "span", en: "Never change more than 14 future dates without a second check", th: "ห้ามเปลี่ยนเกิน 14 วันข้างหน้าโดยไม่ตรวจซ้ำ", floor: true },
  { id: "anomaly", en: "Block a 10× drop (฿500 instead of ฿5,000)", th: "บล็อกการตก 10 เท่า (฿500 แทน ฿5,000)", floor: true },
];

export const FLOOR_RATES: Record<string, number> = {
  garden: 1600,
  pool: 2200,
  suite: 3200,
  loft: 2600,
  villa: 7200,
};

export function guardDecision(d: RevDecision): { ok: true } | { ok: false; reason: string; reasonTh: string } {
  if (d.write.kind === "block" || d.risk === "blocked") {
    return { ok: false, reason: d.why, reasonTh: d.whyTh };
  }
  if (d.write.kind === "rate") {
    const floor = FLOOR_RATES[d.write.room] ?? 0;
    if (d.write.rate < floor) {
      return { ok: false, reason: `Below floor ฿${floor.toLocaleString()} for ${d.write.room}.`, reasonTh: `ต่ำกว่าพื้น ฿${floor.toLocaleString()}` };
    }
    if (d.oldBar && d.write.rate > d.oldBar * 1.3) {
      return { ok: false, reason: "Increase exceeds the 30% single-change cap.", reasonTh: "ขึ้นเกินเพดาน 30% ต่อครั้ง" };
    }
    if (d.oldBar && d.write.rate < d.oldBar * 0.2) {
      return { ok: false, reason: "Anomalous drop — Guardian treats this as a pricing error.", reasonTh: "ราคาตกผิดปกติ — Guardian ถือว่าเป็นข้อผิดพลาด" };
    }
    if (d.write.dates.length > 14) {
      return { ok: false, reason: "Too many dates in one write.", reasonTh: "วันที่ในคำสั่งเดียวมากเกินไป" };
    }
  }
  return { ok: true };
}

export const REV_DECISIONS: RevDecision[] = [
  {
    id: "ros-price-weekday",
    no: "RD-839201",
    agent: "pricing",
    brain: "price",
    sev: "High",
    dates: "24–25 Aug",
    room: "garden",
    oldBar: 1980,
    newBar: 2200,
    head: "Raise Garden Deluxe BAR ฿1,980 → ฿2,200 Mon–Tue",
    headTh: "ขึ้นดีลักซ์สวน ฿1,980 → ฿2,200 จันทร์–อังคาร",
    why: "Pickup +14pp vs weekday curve. Twin simulation: ฿2,200 maximises expected net, not competitor copy. Elasticity ฿1,980→฿2,200 historically cuts conversion only 3%.",
    whyTh: "จองเร็วกว่าเส้นโค้งวันธรรมดา 14 จุด ฝาแฝดชี้ว่า ฿2,200 สุทธิสูงสุด ไม่ได้ลอกคู่แข่ง ความยืดหยุ่นช่วงนี้เคยตัดคอนเวอร์ชันแค่ 3%",
    does: "Write Garden 24–25 Aug BAR ฿2,200 through the sync worker",
    doesTh: "เขียนดีลักซ์สวน 24–25 ส.ค. BAR ฿2,200 ผ่านตัวซิงก์",
    expected: 12400,
    confidence: 84,
    risk: "low",
    alternatives: [
      { en: "Hold ฿1,980 — leaves ~฿9,200 on the table", th: "คง ฿1,980 — ปล่อยเงินบนโต๊ะราว ฿9,200" },
      { en: "Jump to ฿2,550 — elasticity engine says −19% conversion", th: "กระโดด ฿2,550 — เครื่องยืดหยุ่นบอกคอนเวอร์ชัน −19%" },
    ],
    engines: ["forecast", "curve", "price", "twin", "guard"],
    write: { kind: "rate", room: "garden", dates: ["24 Aug", "25 Aug"], rate: 2200 },
    href: "/inventory",
  },
  {
    id: "ros-price-fri",
    no: "RD-839202",
    agent: "pricing",
    brain: "price",
    sev: "High",
    dates: "21 Aug",
    room: "pool",
    oldBar: 2900,
    newBar: 3400,
    head: "Raise Pool Access ฿2,900 → ฿3,400 Friday",
    headTh: "ขึ้นพูลแอคเซส ฿2,900 → ฿3,400 วันศุกร์",
    why: "Compression index 78. Four of six comp-set hotels lifted >12% in 12 hours. Forecast occupancy 94%. Expected RevPAR +6.8%.",
    whyTh: "ดัชนีบีบตลาด 78 คู่แข่ง 4 จาก 6 ขึ้นเกิน 12% ใน 12 ชม. พยากรณ์เข้าพัก 94% RevPAR คาด +6.8%",
    does: "Write Pool 21 Aug BAR ฿3,400",
    doesTh: "เขียนพูล 21 ส.ค. BAR ฿3,400",
    expected: 18600,
    confidence: 89,
    risk: "low",
    alternatives: [
      { en: "Keep ฿2,900 — sells out too early to late high-WTP demand", th: "คง ฿2,900 — ขายหมดก่อนดีมานด์จ่ายแพงช่วงท้าย" },
      { en: "฿3,800 — Twin says occupancy falls to 76% and RevPAR drops", th: "฿3,800 — ฝาแฝดบอกเข้าพักเหลือ 76% RevPAR ตก" },
    ],
    engines: ["compress", "comp", "forecast", "price", "twin", "guard"],
    write: { kind: "rate", room: "pool", dates: ["21 Aug"], rate: 3400 },
    href: "/inventory",
  },
  {
    id: "ros-inv-minlos",
    no: "RD-839203",
    agent: "inventory",
    brain: "inventory",
    sev: "Medium",
    dates: "24–25 Aug",
    room: "garden",
    head: "Apply MinLOS 2 on Garden Mon–Tue",
    headTh: "ใส่ขั้นต่ำ 2 คืนให้สวน จันทร์–อังคาร",
    why: "One-night guests on soft weekdays displace higher-value 3-night stays arriving for the weekend compression. Inventory engine protects length, not just price.",
    whyTh: "แขก 1 คืนวันธรรมดาเบียดการเข้าพัก 3 คืนที่มีค่ามากกว่าก่อนสุดสัปดาห์ที่ตลาดบีบ",
    does: "Set Garden 24–25 Aug min-stay = 2",
    doesTh: "ตั้งสวน 24–25 ส.ค. ขั้นต่ำ = 2",
    expected: 9800,
    confidence: 77,
    risk: "low",
    alternatives: [{ en: "Leave min-stay 1 and discount — Promotion AI rejected: this is a mix problem, not a price problem", th: "คงขั้นต่ำ 1 แล้วลดราคา — โปรโมชัน AI ปฏิเสธ: นี่เป็นปัญหาส่วนผสม ไม่ใช่ราคา" }],
    engines: ["curve", "inv", "guard"],
    write: { kind: "minStay", room: "garden", dates: ["24 Aug", "25 Aug"], minStay: 2 },
    href: "/inventory",
  },
  {
    id: "ros-dist-wholesale",
    no: "RD-839204",
    agent: "distribution",
    brain: "distribution",
    sev: "High",
    dates: "tonight → 25 Aug",
    head: "Close Expedia allotment. Hold the last Garden rooms for Direct.",
    headTh: "ปิดจัดสรร Expedia กันห้องสวนเหลือให้จองตรง",
    why: "Net ADR: Direct ฿2,244 vs Expedia after commission. Compression starting. Channel profitability engine: low-margin channel closes first — not Booking.com.",
    whyTh: "Net ADR จองตรง ฿2,244 สูงกว่า Expedia หลังคอม ตลาดเริ่มบีบ เครื่องกำไรช่องทางปิดช่องมาร์จินต่ำก่อน — ไม่ใช่ Booking.com",
    does: "Move Expedia’s 4 Garden rooms onto Direct",
    doesTh: "ย้ายห้องสวน 4 ห้องของ Expedia ไปจองตรง",
    expected: 16800,
    confidence: 86,
    risk: "medium",
    alternatives: [{ en: "Close Agoda instead — worse: Agoda still converts last-minute", th: "ปิด Agoda แทน — แย่กว่า Agoda ยังแปลงนาทีสุดท้ายได้" }],
    engines: ["channel", "compress", "guard"],
    write: { kind: "allot", from: "expedia", to: "direct", rooms: 4 },
    href: "/direct",
  },
  {
    id: "ros-direct-offer",
    no: "RD-839205",
    agent: "distribution",
    brain: "distribution",
    sev: "Medium",
    dates: "24 Aug",
    head: "Do not discount Monday. Attach breakfast on Direct.",
    headTh: "ห้ามลดราคาวันจันทร์ ติดอาหารเช้าบนจองตรง",
    why: "Promotion engine: occupancy is a mix/visibility problem, not a price problem. Same public rate as Agoda + breakfast is what Agent Direct already publishes.",
    whyTh: "เครื่องโปรโมชัน: เข้าพักอ่อนเพราะส่วนผสม/การมองเห็น ไม่ใช่ราคา ราคาหน้าเว็บเท่า Agoda + อาหารเช้า คือสิ่งที่ Agent Direct ปล่อยอยู่แล้ว",
    does: "Turn on Direct breakfast inclusion — no BAR cut",
    doesTh: "เปิดสิทธิ์อาหารเช้าจองตรง — ไม่ตัด BAR",
    expected: 6400,
    confidence: 72,
    risk: "low",
    alternatives: [
      { en: "20% discount — Twin: occupancy +4pp, net −฿18,200", th: "ลด 20% — ฝาแฝด: เข้าพัก +4 จุด สุทธิ −฿18,200" },
      { en: "฿20,000 ad campaign, no discount — Phase 2 Marketing AI", th: "โฆษณา ฿20,000 ไม่ลดราคา — การตลาด AI เฟส 2" },
    ],
    engines: ["promo", "direct", "twin", "guard"],
    write: { kind: "benefit", id: "b1" },
    href: "/agent-offers",
  },
  {
    id: "ros-group",
    no: "RD-839206",
    agent: "group",
    brain: "inventory",
    sev: "High",
    dates: "24–25 Aug",
    head: "Reject ABC Group at ฿2,700. Counter ฿3,550.",
    headTh: "ปฏิเสธกรุ๊ป ABC ที่ ฿2,700 เสนอ ฿3,550",
    why: "12 rooms × 2 nights at ฿2,700 displaces transient demand the forecast already holds at ฿2,200–฿3,400. Ancillary ฿18,000 does not cover displacement. Accept above ฿3,550.",
    whyTh: "12 ห้อง × 2 คืนที่ ฿2,700 เบียดดีมานด์เดินที่พยากรณ์ไว้ ฿2,200–฿3,400 รายได้อื่น ฿18,000 ไม่คุ้ม รับได้เมื่อเกิน ฿3,550",
    does: "Log reject + counter. No inventory written until sales accepts.",
    doesTh: "บันทึกปฏิเสธ + ราคาเสนอ ยังไม่เขียนห้องจนกว่าฝ่ายขายรับ",
    expected: 20400,
    confidence: 81,
    risk: "low",
    alternatives: [{ en: "Accept ฿2,700 + breakfast — displacement still negative", th: "รับ ฿2,700 + อาหารเช้า — การเบียดยังติดลบ" }],
    engines: ["forecast", "group", "guard"],
    write: { kind: "note" },
    href: "/revenue-os",
  },
  {
    id: "ros-upgrade",
    no: "RD-839207",
    agent: "total",
    brain: "commercial",
    sev: "Low",
    dates: "arrivals D-1",
    head: "Send suite upgrade +฿1,400 to 8 arrivals with WTP ≥ 70%",
    headTh: "ส่งอัปเกรดสวีท +฿1,400 ให้นักเดินทาง 8 รายที่ WTP ≥ 70%",
    why: "Upgrade engine: Guest A conversion 74%, Guest B 12%. Same offer is waste. Target the eight high-WTP folios only.",
    whyTh: "เครื่องอัปเกรด: แขก A แปลง 74% แขก B 12% ข้อเสนอเดียวกันคือการเสียของ ยิงเฉพาะ 8 โฟลิโอที่ WTP สูง",
    does: "Queue LINE / inbox upgrade offers. No rate-grid write.",
    doesTh: "คิวข้อเสนออัปเกรดใน LINE / กล่องข้อความ ไม่แตะตารางราคา",
    expected: 7840,
    confidence: 68,
    risk: "low",
    alternatives: [{ en: "Blast all 17 arrivals — conversion collapses, brand noise", th: "ยิงทั้ง 17 ราย — คอนเวอร์ชันพัง และรบกวนแบรนด์" }],
    engines: ["upgrade", "guest"],
    write: { kind: "note" },
    href: "/inbox",
  },
  {
    id: "ros-blocked",
    no: "RD-839299",
    agent: "guardian",
    brain: "commercial",
    sev: "High",
    dates: "19 Aug",
    room: "suite",
    oldBar: 3784,
    newBar: 500,
    head: "BLOCKED — Suite BAR ฿3,784 → ฿500",
    headTh: "บล็อก — สวีท ฿3,784 → ฿500",
    why: "A pricing-agent draft asked for ฿500. Floor is ฿3,200. 87% drop is an anomaly, not a strategy. Guardian is a separate agent. It does not propose rates — it only stops them.",
    whyTh: "ร่างของเอเจนต์ราคาขอ ฿500 ราคาพื้น ฿3,200 ตก 87% คือความผิดปกติ ไม่ใช่กลยุทธ์ Guardian เป็นเอเจนต์แยก ไม่เสนอราคา — ทำได้แค่หยุด",
    does: "No write. Decision stays on the ledger as blocked.",
    doesTh: "ไม่เขียน บันทึกในสมุดว่าถูกบล็อก",
    expected: 0,
    confidence: 99,
    risk: "blocked",
    alternatives: [{ en: "Human override requires typing the floor rate — not offered in this demo", th: "การฝ่าฝืนโดยคนต้องพิมพ์ราคาพื้น — เดโมนี้ไม่มี" }],
    engines: ["price", "guard"],
    write: { kind: "block" },
    href: "/rev-guardian",
  },
];

export function pendingRev(state: Record<string, RevStatus>) {
  return REV_DECISIONS.filter((d) => d.risk !== "blocked" && (state[d.id] ?? "pending") === "pending");
}

export function revImpact(state: Record<string, RevStatus>, which: "pending" | "applied" | "open") {
  return REV_DECISIONS.filter((d) => {
    const s = d.risk === "blocked" ? "blocked" : (state[d.id] ?? "pending");
    if (which === "applied") return s === "applied";
    if (which === "open") return s === "pending";
    return s === "pending" || s === "applied";
  }).reduce((n, d) => n + d.expected, 0);
}

export const FORECAST = [
  { date: "19 Aug", rooms: 42, demand: 39, occ: 88, status: "strong" as const, conf: "High" },
  { date: "20 Aug", rooms: 42, demand: 38, occ: 86, status: "strong" as const, conf: "High" },
  { date: "21 Aug", rooms: 42, demand: 44, occ: 94, status: "compression" as const, conf: "High" },
  { date: "22 Aug", rooms: 42, demand: 48, occ: 97, status: "compression" as const, conf: "High" },
  { date: "23 Aug", rooms: 42, demand: 41, occ: 91, status: "strong" as const, conf: "High" },
  { date: "24 Aug", rooms: 42, demand: 31, occ: 68, status: "normal" as const, conf: "Med" },
  { date: "25 Aug", rooms: 42, demand: 28, occ: 62, status: "soft" as const, conf: "Med" },
];

export const BOOKING_CURVE = [
  { d: "D-90", normal: 8, current: 9 },
  { d: "D-60", normal: 18, current: 21 },
  { d: "D-30", normal: 32, current: 41 },
  { d: "D-21", normal: 38, current: 52 },
  { d: "D-14", normal: 51, current: 64 },
  { d: "D-7", normal: 68, current: 79 },
  { d: "D-3", normal: 81, current: 88 },
  { d: "D-1", normal: 89, current: 94 },
];

export const PICKUP = [
  { window: "1h", n: 2, vs: "+2 vs forecast" },
  { window: "6h", n: 5, vs: "+3 vs same weekday" },
  { window: "24h", n: 11, vs: "+37% vs expected" },
  { window: "3d", n: 28, vs: "+14pp vs curve" },
  { window: "7d", n: 46, vs: "ahead of LY" },
];

export const ACCELERATION = { score: 81, label: "compression / surge", labelTh: "ตลาดบีบ / พุ่ง" };

export const COMP_SET = [
  { name: "Ao Nang Cliff Beach", bar: 4200, move: "+18%", sold: false, los: 2 },
  { name: "Centara Ao Nang", bar: 5100, move: "+22%", sold: true, los: 2 },
  { name: "Red Ginger Chic", bar: 3600, move: "+9%", sold: false, los: 1 },
  { name: "The Tubkaak", bar: 8900, move: "+4%", sold: false, los: 2 },
  { name: "Holiday Inn Ao Nang", bar: 3900, move: "+21%", sold: true, los: 2 },
  { name: "Pakasai Resort", bar: 2800, move: "0%", sold: false, los: 1 },
];

export const EVENTS = [
  { name: "Krabi Half Marathon", nameTh: "คราบี่ฮาล์ฟมาราธอน", when: "23 Aug", km: 1.4, attend: 6000, hist: 19, impact: 14 },
  { name: "Ao Nang Food Week", nameTh: "สัปดาห์อาหารอ่าวนาง", when: "21–24 Aug", km: 0.4, attend: 12000, hist: 11, impact: 8 },
  { name: "School holiday (TH)", nameTh: "ปิดเทอมไทย", when: "through 31 Aug", km: 0, attend: 0, hist: 7, impact: 6 },
];

export const COMPRESSION = { market: "Ao Nang, Krabi", date: "21 Aug", score: 78, soldOut: 2, velocity: 16 };

export const PRICE_LADDER = [
  { price: 1980, rooms: 22, net: 39200, pick: false },
  { price: 2100, rooms: 20, net: 39900, pick: false },
  { price: 2200, rooms: 19, net: 41800, pick: true },
  { price: 2400, rooms: 16, net: 38400, pick: false },
  { price: 2550, rooms: 14, net: 35700, pick: false },
];

export const ELASTICITY = [
  { from: 1980, to: 2200, conv: -3, note: "Safe step. Historical breakpoint not reached." },
  { from: 2200, to: 2550, conv: -11, note: "Weekend only, under compression." },
  { from: 2550, to: 2900, conv: -19, note: "Breakpoint. Do not jump here on a soft Monday." },
];

export const CHANNEL_NET = [
  { ch: "Booking.com", adr: 2160, net: 1776, fee: "18%" },
  { ch: "Agoda", adr: 2244, net: 1493, fee: "22% + promo" },
  { ch: "Expedia", adr: 2446, net: 1680, fee: "18%" },
  { ch: "Direct", adr: 2626, net: 2244, fee: "payment only" },
  { ch: "Agent Direct", adr: 2626, net: 2576, fee: "1.9%" },
];

export const TWIN_SCENARIOS = [
  { id: "A", en: "Hold ฿1,980", th: "คง ฿1,980", occ: 74, adr: 1980, revpar: 1465, net: 39200 },
  { id: "B", en: "+11% → ฿2,200", th: "+11% → ฿2,200", occ: 68, adr: 2200, revpar: 1496, net: 41800, pick: true },
  { id: "C", en: "+29% → ฿2,550", th: "+29% → ฿2,550", occ: 54, adr: 2550, revpar: 1377, net: 35700 },
];

export const MEETING = [
  { agent: "demand" as const, en: "24 Aug pickup is 14pp ahead of the weekday curve. 21 Aug is compression — expected occupancy 94%.", th: "24 ส.ค. จองนำเส้นโค้งวันธรรมดา 14 จุด 21 ส.ค. ตลาดบีบ — คาดเข้าพัก 94%" },
  { agent: "market" as const, en: "Two of six comp-set hotels sold out overnight. Four raised rates >12% in 12 hours.", th: "คู่แข่ง 2 จาก 6 เต็มคืนนี้ สี่รายขึ้นราคาเกิน 12% ใน 12 ชม." },
  { agent: "pricing" as const, en: "Recommend Garden Mon–Tue +11% to ฿2,200 and Pool Friday to ฿3,400. Twin picks B, not C.", th: "เสนอสวน จ–อ +11% เป็น ฿2,200 และพูลวันศุกร์ ฿3,400 ฝาแฝดเลือก B ไม่ใช่ C" },
  { agent: "inventory" as const, en: "Recommend MinLOS 2 on Garden 24–25 Aug. Protect weekend length of stay.", th: "เสนอขั้นต่ำ 2 คืนสวน 24–25 ส.ค. กันความยาวเข้าพักสุดสัปดาห์" },
  { agent: "distribution" as const, en: "Close Expedia allotment. Do not discount Monday — attach breakfast on Direct.", th: "ปิดจัดสรร Expedia ห้ามลดวันจันทร์ — ติดอาหารเช้าบนจองตรง" },
  { agent: "group" as const, en: "Reject ABC Group ฿2,700. Counter ฿3,550. Displacement is negative below that.", th: "ปฏิเสธกรุ๊ป ABC ฿2,700 เสนอ ฿3,550 ต่ำกว่านั้นการเบียดติดลบ" },
  { agent: "guardian" as const, en: "Approved six writes. Blocked the ฿500 Suite draft. Nothing closes every channel.", th: "อนุมัติการเขียน 6 รายการ บล็อกร่างสวีท ฿500 ไม่มีการปิดทุกช่องทาง" },
  { agent: "director" as const, en: "Approved. Estimated incremental contribution +฿84,300. Suite ฿500 never reached execution.", th: "อนุมัติแล้ว คาดกำไรเพิ่ม +฿84,300 สวีท ฿500 ไม่ถึงชั้นลงมือ" },
];

export const OPPORTUNITIES = [
  { en: "8 arrivals can take a suite upgrade at +฿1,400 (WTP ≥ 70%)", th: "แขกเข้า 8 รายรับอัปเกรดสวีท +฿1,400 ได้ (WTP ≥ 70%)", value: 7840 },
  { en: "Monday Garden is underpriced vs weekday pace", th: "สวนวันจันทร์ราคาต่ำกว่าจังหวะจองวันธรรมดา", value: 12400 },
  { en: "Agoda promo is cannibalising full-price Direct", th: "โปร Agoda กินจองตรงราคาเต็ม", value: 16800 },
  { en: "ABC Group ฿2,700 is 21% below displacement value", th: "กรุ๊ป ABC ฿2,700 ต่ำกว่ามูลค่าการเบียด 21%", value: 20400 },
  { en: "Pool Friday will sell out too early at ฿2,900", th: "พูลวันศุกร์จะหมดเร็วเกินไปที่ ฿2,900", value: 18600 },
  { en: "3-night guests out-earn 1-night guests this window", th: "แขก 3 คืนคุ้มกว่าแขก 1 คืนในช่วงนี้", value: 9800 },
  { en: "Expedia net ADR trails Direct by ฿564", th: "Net ADR ของ Expedia ต่ำกว่าจองตรง ฿564", value: 16800 },
  { en: "Breakfast-on-Direct beats a 10% Monday discount", th: "อาหารเช้าบนจองตรงชนะส่วนลดวันจันทร์ 10%", value: 6400 },
];

export const ATTRIBUTION = [
  { k: "Pricing", n: 170000 },
  { k: "Demand growth", n: 210000 },
  { k: "Direct conversion", n: 90000 },
  { k: "Upselling", n: 52000 },
  { k: "Cancellation", n: -40000 },
];

export const LOOP = ["Observe", "Predict", "Decide", "Act", "Measure", "Learn", "Update model"] as const;

export function agentName(id: RevAgent) {
  return REV_AGENTS.find((a) => a.id === id)?.en ?? id;
}
