/** HOTEL24 RevenueOS — Autonomous AI Revenue Team.
 *  Agents think and explain. Engines calculate. Guardian controls risk.
 *  Execution writes rates, inventory and campaigns — an LLM never picks ฿4,900 alone.
 *  Phase 1: eight engines + Director. Phase 2: eight more so the hotel can run autonomously.
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
  | { kind: "overbook"; date: string; sellLimit: number }
  | { kind: "offer"; id: string }
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
  {
    id: "forecast", brain: "demand" as const, phase: 1 as const, n: "01", href: "/rev-demand",
    en: "Demand Forecast Engine", th: "เครื่องพยากรณ์ดีมานด์",
    does: "Occupancy, bookings, cancellations, room-type / segment / channel demand per arrival date.",
    doesTh: "เข้าพัก การจอง ยกเลิก ดีมานด์ต่อประเภทห้อง / เซ็กเมนต์ / ช่องทาง ต่อวันเข้า",
    output: "21 Aug · demand 44 RN · occ 94% · COMPRESSION · confidence High",
  },
  {
    id: "curve", brain: "demand" as const, phase: 1 as const, n: "02", href: "/rev-demand",
    en: "Booking Curve + Pickup Engine", th: "เส้นโค้งจอง + ความเร็ว",
    does: "Where occupancy should be at D-90…D-1, plus bookings in the last 1h / 6h / 24h / 3d / 7d. Demand Acceleration Score 0–100.",
    doesTh: "เข้าพักควรอยู่ตรงไหนที่ D-90…D-1 และจองใน 1 ชม. / 6 ชม. / 24 ชม. / 3 วัน / 7 วัน คะแนนเร่งดีมานด์ 0–100",
    output: "22 Aug D-21 = 52% vs normal 38% · acceleration 81 · surge",
  },
  {
    id: "comp", brain: "demand" as const, phase: 1 as const, n: "03", href: "/rev-demand",
    en: "Competitor Intelligence Engine", th: "ข่าวกรองคู่แข่ง",
    does: "Comp-set BAR, sold-out, LOS, 12-hour price velocity — signals, not a raw rate shop.",
    doesTh: "BAR คู่แข่ง เต็ม LOS ความเร็วราคา 12 ชม. — เป็นสัญญาณ ไม่ใช่แค่ตารางราคา",
    output: "4 of 6 raised >12% in 12h · 2 sold out overnight",
  },
  {
    id: "event", brain: "demand" as const, phase: 1 as const, n: "04", href: "/rev-demand",
    en: "Event Intelligence Engine", th: "ข่าวกรองอีเวนต์",
    does: "Concerts, races, holidays, food weeks. Event Demand Impact Score for Pricing AI.",
    doesTh: "คอนเสิร์ต วิ่ง วันหยุด สัปดาห์อาหาร คะแนนผลกระทบให้นักราคา AI",
    output: "Krabi Half Marathon · 2.1 km · historical +19% · hotel impact +14%",
  },
  {
    id: "price", brain: "price" as const, phase: 1 as const, n: "05", href: "/rev-pricing",
    en: "Dynamic Pricing Engine", th: "เครื่องตั้งราคาไดนามิก",
    does: "Simulates a rate ladder. Picks the price with the highest expected net — not competitor +/− ฿100.",
    doesTh: "จำลองบันไดราคา เลือกสุทธิคาดสูงสุด — ไม่ใช่คู่แข่ง +/− ฿100",
    output: "Garden Mon ฿2,200 wins ฿41,800 net · ฿2,550 looks stronger and loses",
  },
  {
    id: "inv", brain: "inventory" as const, phase: 1 as const, n: "06", href: "/rev-inventory",
    en: "Inventory Optimization Engine", th: "เครื่องจัดสรรห้อง",
    does: "Open/close, MinLOS, protection, stop-sell, channel allotment. Sometimes beats a price change.",
    doesTh: "เปิด/ปิด ขั้นต่ำ กันห้อง ปิดขาย จัดสรรช่องทาง บางครั้งคุ้มกว่าการเปลี่ยนราคา",
    output: "MinLOS 2 on Garden 24–25 Aug · protect weekend length of stay",
  },
  {
    id: "channel", brain: "distribution" as const, phase: 1 as const, n: "07", href: "/rev-distribution",
    en: "Channel Profitability Engine", th: "เครื่องกำไรต่อช่องทาง",
    does: "Net ADR after commission, promo, payment, ads. Direct / Agent Direct vs OTA.",
    doesTh: "Net ADR หลังคอม โปร การชำระ โฆษณา จองตรง / Agent Direct เทียบ OTA",
    output: "Agent Direct net ฿2,576 · Agoda ฿1,493 · close Expedia first in compression",
  },
  {
    id: "guard", brain: "commercial" as const, phase: 1 as const, n: "08", href: "/rev-guardian",
    en: "Revenue Guardian Engine", th: "เครื่องรั้วรายได้",
    does: "Separate agent. Caps, floors, overbook, parity, anomaly. A ฿500 Suite draft never reaches ARI.",
    doesTh: "เอเจนต์แยก เพดาน พื้น ขายเกิน พาร์ตี้ ความผิดปกติ ร่างสวีท ฿500 ไม่ถึง ARI",
    output: "BLOCKED RD-839299 · Suite ฿3,784 → ฿500 · below floor ฿3,200",
  },
  {
    id: "cancel", brain: "inventory" as const, phase: 2 as const, n: "09", href: "/rev-cancel",
    en: "Cancellation Prediction Engine", th: "เครื่องทำนายยกเลิก",
    does: "Per-reservation cancel probability: channel, lead time, refundable, price deviation, history.",
    doesTh: "โอกาสยกเลิกต่อการจอง: ช่องทาง lead time คืนเงินได้ ส่วนเบี่ยงเบนราคา ประวัติ",
    output: "H24-8860 Lim · Agoda · refundable · 67% cancel risk",
  },
  {
    id: "overbook", brain: "inventory" as const, phase: 2 as const, n: "10", href: "/rev-overbook",
    en: "Overbooking Engine", th: "เครื่องขายเกินคำนวณ",
    does: "Cancel + no-show vs walk-cost. Optimal sell limit. Guardian caps rooms above physical.",
    doesTh: "ยกเลิก + no-show เทียบต้นทุนวอล์ก เพดานขายที่เหมาะ Guardian จำกัดห้องเกินของจริง",
    output: "21 Aug · 44 on the books · 3.2 expected wash · sell 45 / 42 physical",
  },
  {
    id: "elastic", brain: "price" as const, phase: 2 as const, n: "11", href: "/rev-elasticity",
    en: "Price Elasticity / WTP Engine", th: "ความยืดหยุ่นราคา / WTP",
    does: "Learned conversion drop per price step, by segment, nationality, channel, lead time.",
    doesTh: "คอนเวอร์ชันที่ตกต่อขั้นราคา ตามเซ็กเมนต์ สัญชาติ ช่องทาง lead time",
    output: "฿1,980→฿2,200 = −3% · ฿2,550→฿2,900 = −19% breakpoint",
  },
  {
    id: "group", brain: "inventory" as const, phase: 2 as const, n: "12", href: "/rev-group",
    en: "Group Displacement Engine", th: "เครื่องวัดการเบียดแขกเดิน",
    does: "Group revenue + F&B − displaced transient − cost. Reject / accept-above / counter.",
    doesTh: "รายได้กรุ๊ป + อาหาร − แขกเดินที่เบียด − ต้นทุน ปฏิเสธ / รับเมื่อเกิน / เสนอราคา",
    output: "ABC 12 rooms · reject ฿2,700 · accept above ฿3,550 · counter ฿3,550",
  },
  {
    id: "alloc", brain: "distribution" as const, phase: 2 as const, n: "13", href: "/rev-alloc",
    en: "Channel Allocation Engine", th: "เครื่องจัดสรรช่องทาง",
    does: "How many rooms Booking / Agoda / Direct may hold as demand compresses.",
    doesTh: "Booking / Agoda / จองตรง กันห้องได้กี่ห้องเมื่อตลาดบีบ",
    output: "Compression: Booking 12→8 · Direct 14→18 · Expedia already closed",
  },
  {
    id: "promo", brain: "distribution" as const, phase: 2 as const, n: "14", href: "/rev-promo",
    en: "Promotion Optimization Engine", th: "เครื่องโปรโมชัน",
    does: "Is the problem PRICE or DEMAND? Simulate 20% off vs ads vs breakfast vs Stay 3 Pay 2.",
    doesTh: "ปัญหาคือราคาหรือดีมานด์ จำลองลด 20% เทียบโฆษณา เทียบอาหารเช้า เทียบพัก 3 จ่าย 2",
    output: "Monday = demand/mix, not price · Option C (breakfast, no cut) wins",
  },
  {
    id: "direct", brain: "distribution" as const, phase: 2 as const, n: "15", href: "/rev-convert",
    en: "Direct Conversion Engine", th: "เครื่องแปลงจองตรง",
    does: "Abandoned searches and price-sensitive sessions get an inclusion — not a BAR cut. Feeds Agent Direct.",
    doesTh: "เซสชันที่ทิ้งตะกร้าและอ่อนไหวราคาได้สิทธิ์ — ไม่ตัด BAR ต่อเข้า Agent Direct",
    output: "Sydney mobile · D-18 · 71% convert if free-cancel attached",
  },
  {
    id: "attr", brain: "commercial" as const, phase: 2 as const, n: "16", href: "/rev-attribution",
    en: "Revenue Attribution Engine", th: "เครื่องอธิบายรายได้",
    does: "Why revenue moved: market, price, mix, channel, promo, cancel, group, direct, upsell.",
    doesTh: "ทำไมรายได้ขยับ: ตลาด ราคา ส่วนผสม ช่องทาง โปร ยกเลิก กรุ๊ป จองตรง อัปเซล",
    output: "Next month −8.7% vs budget · SG demand −4.1 · OTA visibility −2.3 · corporate −1.5",
  },
  { id: "compress", brain: "demand" as const, phase: 2 as const, n: "", href: "/rev-demand", en: "Market Compression Engine", th: "เครื่องวัดการบีบตลาด", does: "Supporting signal on Demand Brain — not one of the official eight.", doesTh: "สัญญาณเสริมบนสมองดีมานด์ — ไม่ใช่หนึ่งในแปดทางการ", output: "Ao Nang 21 Aug = 78/100" },
  { id: "twin", brain: "price" as const, phase: 3 as const, n: "", href: "/rev-twin", en: "Hotel Digital Twin Engine", th: "ฝาแฝดดิจิทัลโรงแรม", does: "Simulate hold / +11% / +29% before the Director writes.", doesTh: "จำลองคงราคา / +11% / +29% ก่อนผู้อำนวยการเขียน", output: "Scenario B RevPAR ฿1,496 wins" },
  { id: "guest", brain: "commercial" as const, phase: 3 as const, n: "", href: "/revenue-os", en: "Total Guest Value Engine", th: "เครื่องมูลค่าแขก", does: "Room + F&B + spa + transfer per guest.", doesTh: "ห้อง + อาหาร + สปา + รถต่อแขก", output: "Phase 3" },
  { id: "upgrade", brain: "commercial" as const, phase: 3 as const, n: "", href: "/revenue-os", en: "Upgrade Engine", th: "เครื่องอัปเกรด", does: "Who gets the +฿1,400 suite offer (WTP ≥ 70%).", doesTh: "ใครได้ข้อเสนอสวีท +฿1,400 (WTP ≥ 70%)", output: "Phase 3" },
  { id: "experiment", brain: "commercial" as const, phase: 3 as const, n: "", href: "/rev-decisions", en: "Experimentation Engine", th: "เครื่องทดลอง", does: "A/B and bandits: ฿4,400 vs ฿4,600, breakfast vs 10% off.", doesTh: "A/B และแบนดิต: ฿4,400 เทียบ ฿4,600 อาหารเช้าเทียบลด 10%", output: "Phase 3" },
];

export const PHASE1_ENGINES = REV_ENGINES.filter((e) => e.phase === 1 && e.n);
export const PHASE2_ENGINES = REV_ENGINES.filter((e) => e.phase === 2 && e.n);

export const PHYSICAL_ROOMS = 42;
export const OVERBOOK_CAP = 4;

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
  if (d.write.kind === "overbook") {
    if (d.write.sellLimit - PHYSICAL_ROOMS > OVERBOOK_CAP) {
      return {
        ok: false,
        reason: `Sell limit ${d.write.sellLimit} is more than ${OVERBOOK_CAP} rooms above the ${PHYSICAL_ROOMS}-room house.`,
        reasonTh: `เพดานขาย ${d.write.sellLimit} เกินบ้าน ${PHYSICAL_ROOMS} ห้องมากกว่า ${OVERBOOK_CAP} ห้อง`,
      };
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
      { en: "฿20,000 ad campaign, no discount — engine 14 already lost this", th: "โฆษณา ฿20,000 ไม่ลดราคา — เครื่อง 14 แพ้ตัวนี้แล้ว" },
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
    href: "/rev-group",
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
  {
    id: "ros-cancel-lim",
    no: "RD-839301",
    agent: "inventory",
    brain: "inventory",
    sev: "High",
    dates: "H24-8860",
    head: "Watch Lim Wei Jie — 67% cancel risk. Do not re-sell the room at BAR yet.",
    headTh: "เฝ้า Lim Wei Jie — เสี่ยงยกเลิก 67% อย่าปล่อยห้องนี้ที่ BAR ทันที",
    why: "Agoda, refundable, 21-day lead, rate 8% above his last three stays. Cancellation engine: treat as soft inventory for overbooking, not as a firm room-night.",
    whyTh: "Agoda คืนเงินได้ lead 21 วัน ราคาสูงกว่าสามครั้งก่อน 8% เครื่องยกเลิก: นับเป็นห้องนิ่มสำหรับขายเกิน ไม่ใช่คืนที่แน่นอน",
    does: "Flag the reservation. Overbooking engine may count 0.67 of this room as wash.",
    doesTh: "ติดธงการจอง เครื่องขายเกินนับ 0.67 ของห้องนี้เป็นที่อาจว่าง",
    expected: 2900,
    confidence: 80,
    risk: "low",
    alternatives: [{ en: "Re-sell now at BAR — walk risk if he shows", th: "ขายซ้ำที่ BAR ตอนนี้ — เสี่ยงวอล์กถ้าเขาเข้าจริง" }],
    engines: ["cancel", "overbook", "guard"],
    write: { kind: "note" },
    href: "/rev-cancel",
  },
  {
    id: "ros-overbook-fri",
    no: "RD-839302",
    agent: "inventory",
    brain: "inventory",
    sev: "High",
    dates: "21 Aug",
    head: "Set Friday sell limit to 45 on a 42-room house.",
    headTh: "ตั้งเพดานขายวันศุกร์ที่ 45 จากบ้าน 42 ห้อง",
    why: "44 already on the books. Expected wash 3.2 (cancel 2.1 + no-show 1.1). Empty-room cost ฿2,200 exceeds walk-cost at 45. Guardian cap is +4.",
    whyTh: "จองแล้ว 44 คาดว่าง 3.2 (ยกเลิก 2.1 + no-show 1.1) ต้นทุนห้องว่าง ฿2,200 สูงกว่าวอล์กที่ 45 เพดาน Guardian คือ +4",
    does: "Write sell limit 45 for 21 Aug. Do not touch BAR.",
    doesTh: "เขียนเพดานขาย 45 สำหรับ 21 ส.ค. ไม่แตะ BAR",
    expected: 8800,
    confidence: 83,
    risk: "medium",
    alternatives: [{ en: "Stay at 42 — leaves ~฿8,800 of wash unsold", th: "คง 42 — ปล่อยห้องที่คาดว่างไม่ขายราว ฿8,800" }],
    engines: ["cancel", "overbook", "forecast", "guard"],
    write: { kind: "overbook", date: "21 Aug", sellLimit: 45 },
    href: "/rev-overbook",
  },
  {
    id: "ros-overbook-block",
    no: "RD-839398",
    agent: "guardian",
    brain: "inventory",
    sev: "High",
    dates: "21 Aug",
    head: "BLOCKED — sell limit 52 on a 42-room house",
    headTh: "บล็อก — เพดานขาย 52 จากบ้าน 42 ห้อง",
    why: "An inventory draft asked for +10 rooms. Owner cap is +4. Walk-cost at 52 exceeds empty-room savings. Guardian refuses.",
    whyTh: "ร่างห้องขอ +10 เพดานเจ้าของคือ +4 ต้นทุนวอล์กที่ 52 สูงกว่าการกันห้องว่าง Guardian ปฏิเสธ",
    does: "No write.",
    doesTh: "ไม่เขียน",
    expected: 0,
    confidence: 99,
    risk: "blocked",
    alternatives: [],
    engines: ["overbook", "guard"],
    write: { kind: "overbook", date: "21 Aug", sellLimit: 52 },
    href: "/rev-overbook",
  },
  {
    id: "ros-elastic-hold",
    no: "RD-839303",
    agent: "pricing",
    brain: "price",
    sev: "Medium",
    dates: "24 Aug",
    head: "Do not jump Garden Monday to ฿2,550. Breakpoint is −19%.",
    headTh: "ห้ามกระโดดสวนวันจันทร์ไป ฿2,550 จุดหักคือ −19%",
    why: "WTP engine: leisure / mobile / Agoda at D-7 dies at ฿2,550 on a soft weekday. The +11% step to ฿2,200 is the learned safe move.",
    whyTh: "เครื่อง WTP: เที่ยว / มือถือ / Agoda ที่ D-7 ตายที่ ฿2,550 ในวันธรรมดาอ่อน ขั้น +11% ไป ฿2,200 คือขั้นที่ปลอดภัย",
    does: "Keep the Phase 1 ฿2,200 write. Log the breakpoint so Pricing AI cannot jump.",
    doesTh: "คงการเขียนเฟส 1 ที่ ฿2,200 บันทึกจุดหักไว้ไม่ให้เอเจนต์ราคากระโดด",
    expected: 6100,
    confidence: 88,
    risk: "low",
    alternatives: [{ en: "Match weekend BAR ฿2,550 — Twin already lost this", th: "เทียบ BAR สุดสัปดาห์ ฿2,550 — ฝาแฝดแพ้ไปแล้ว" }],
    engines: ["elastic", "price", "twin", "guard"],
    write: { kind: "note" },
    href: "/rev-elasticity",
  },
  {
    id: "ros-alloc-booking",
    no: "RD-839304",
    agent: "distribution",
    brain: "distribution",
    sev: "High",
    dates: "21–23 Aug",
    head: "Cut Booking.com Garden allotment 12 → 8. Hold four more for Direct.",
    headTh: "ตัดจัดสรรสวนบน Booking.com 12 → 8 กันอีก 4 ห้องให้จองตรง",
    why: "Compression. Channel allocation: last rooms go to the highest Net ADR. Booking stays open — we do not close every OTA.",
    whyTh: "ตลาดบีบ เครื่องจัดสรร: ห้องท้ายไปช่อง Net ADR สูงสุด Booking ยังเปิด — ไม่ปิดทุก OTA",
    does: "Move 4 Garden rooms Booking → Direct",
    doesTh: "ย้ายสวน 4 ห้องจาก Booking ไปจองตรง",
    expected: 14200,
    confidence: 85,
    risk: "medium",
    alternatives: [{ en: "Close Booking entirely — Guardian: never close all distribution", th: "ปิด Booking ทั้งก้อน — Guardian: ห้ามปิดทุกช่องทาง" }],
    engines: ["alloc", "channel", "compress", "guard"],
    write: { kind: "allot", from: "booking", to: "direct", rooms: 4 },
    href: "/rev-alloc",
  },
  {
    id: "ros-promo-c",
    no: "RD-839305",
    agent: "promotion",
    brain: "distribution",
    sev: "High",
    dates: "24–25 Aug",
    head: "Monday is a DEMAND problem. Run Option C — breakfast, no discount.",
    headTh: "วันจันทร์เป็นปัญหาดีมานด์ ใช้ตัวเลือก C — อาหารเช้า ไม่ลดราคา",
    why: "20% off: occ +4pp, net −฿18,200. ฿20k ads: slow. Stay 3 Pay 2: cannibalises weekend. Breakfast on Direct: +฿6,400 and keeps parity.",
    whyTh: "ลด 20%: เข้าพัก +4 จุด สุทธิ −฿18,200 โฆษณา ฿20k: ช้า พัก 3 จ่าย 2: กินสุดสัปดาห์ อาหารเช้าบนจองตรง: +฿6,400 และรักษาพาร์ตี้",
    does: "Lock Option C. Enable Direct breakfast inclusion.",
    doesTh: "ล็อกตัวเลือก C เปิดสิทธิ์อาหารเช้าจองตรง",
    expected: 6400,
    confidence: 79,
    risk: "low",
    alternatives: [{ en: "Option A 20% off — occupancy vanity, profit loss", th: "ตัวเลือก A ลด 20% — เข้าพักสวย กำไรหาย" }],
    engines: ["promo", "direct", "twin", "guard"],
    write: { kind: "benefit", id: "b1" },
    href: "/rev-promo",
  },
  {
    id: "ros-convert-sydney",
    no: "RD-839306",
    agent: "distribution",
    brain: "distribution",
    sev: "Medium",
    dates: "session S-4419",
    head: "Recover the Sydney abandoned search with free-cancel — not a cheaper BAR.",
    headTh: "ดึงเซสชันซิดนีย์ที่ทิ้งด้วยยกเลิกฟรี — ไม่ใช่ BAR ที่ถูกกว่า",
    why: "Mobile, D-18, Garden 24 Aug, dropped on payment. Conversion engine: 71% if flexible cancel is attached. A ฿200 cut only matches Agoda.",
    whyTh: "มือถือ D-18 สวน 24 ส.ค. ทิ้งตอนจ่าย เครื่องแปลง: 71% ถ้ายกเลิกยืดหยุ่น ตัด ฿200 แค่ไปเท่า Agoda",
    does: "Send the Direct recovery offer on session S-4419.",
    doesTh: "ส่งข้อเสนอจองตรงกู้เซสชัน S-4419",
    expected: 4180,
    confidence: 71,
    risk: "low",
    alternatives: [{ en: "Undercut Agoda ฿200 — parity violation, Guardian would block a public cut", th: "ตัด Agoda ฿200 — ผิดพาร์ตี้ Guardian จะบล็อกการตัดราคาหน้าเว็บ" }],
    engines: ["direct", "promo", "guard"],
    write: { kind: "offer", id: "S-4419" },
    href: "/rev-convert",
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

export const CANCEL_BOOKINGS = [
  { id: "H24-8860", guest: "Lim Wei Jie", ch: "Agoda", room: "Pool Access", lead: 21, refund: true, score: 67, why: "OTA · long lead · refundable · +8% vs his last stays" },
  { id: "H24-8802", guest: "Sofia Müller", ch: "Booking.com", room: "Garden Deluxe", lead: 4, refund: false, score: 11, why: "Non-refund · short lead · prepaid" },
  { id: "H24-8841", guest: "ชัยวัฒน์ ประเสริฐ", ch: "Direct", room: "Pool Access", lead: 6, refund: true, score: 18, why: "Direct · Thai ID · PromptPay due — rarely walks" },
  { id: "H24-8850", guest: "Marco Garcia", ch: "Airbnb", room: "Sea View Suite", lead: 28, refund: true, score: 41, why: "Long lead · Airbnb flexible" },
  { id: "H24-8818", guest: "Rashid Al-Farsi", ch: "Direct", room: "Beach Villa", lead: 12, refund: false, score: 9, why: "Villa deposit · Direct · family" },
  { id: "H24-8833", guest: "Katharina Weber", ch: "Booking.com", room: "Family Loft", lead: 9, refund: true, score: 29, why: "Refundable Booking · mid lead" },
];

export const OVERBOOK_DAYS = [
  { date: "21 Aug", physical: 42, confirmed: 44, pCancel: 2.1, pNoShow: 1.1, wash: 3.2, empty: 2200, walk: 6800, sell: 45, pick: true },
  { date: "22 Aug", physical: 42, confirmed: 41, pCancel: 1.4, pNoShow: 0.6, wash: 2.0, empty: 2550, walk: 7200, sell: 43, pick: false },
  { date: "24 Aug", physical: 42, confirmed: 28, pCancel: 1.8, pNoShow: 0.4, wash: 2.2, empty: 1980, walk: 5400, sell: 42, pick: false },
];

export const WTP_SEGMENTS = [
  { seg: "Leisure / mobile / Agoda", lead: "D-7", step: "฿2,200 → ฿2,550", conv: -19, note: "Weekday breakpoint" },
  { seg: "Leisure / desktop / Direct", lead: "D-14", step: "฿1,980 → ฿2,200", conv: -3, note: "Safe step" },
  { seg: "Corporate / TH", lead: "D-21", step: "฿2,200 → ฿2,400", conv: -6, note: "Negotiated ceiling near ฿2,400" },
  { seg: "Family / villa", lead: "D-30", step: "฿8,900 → ฿9,800", conv: -8, note: "Weekend only" },
  { seg: "CN / Booking.com", lead: "D-3", step: "฿2,900 → ฿3,400", conv: -7, note: "Compression Friday" },
];

export const GROUP_RFPS = [
  { id: "ABC", name: "ABC Incentive", rooms: 12, nights: 2, dates: "24–25 Aug", offer: 2700, fb: 18000, transient: 52800, displace: 33600, net: -8600, verdict: "REJECT", counter: 3550, accept: 3550 },
  { id: "TAT", name: "TAT fam trip", rooms: 4, nights: 2, dates: "29–30 Aug", offer: 0, fb: 12000, transient: 17600, displace: 8800, net: 3200, verdict: "ACCEPT", counter: 0, accept: 0 },
  { id: "OIL", name: "Oman crew", rooms: 8, nights: 5, dates: "Sep 2–6", offer: 3100, fb: 45000, transient: 124000, displace: 62000, net: 107000, verdict: "ACCEPT", counter: 0, accept: 3100 },
];

export const ALLOC_STATES = [
  { state: "Weak", booking: 12, agoda: 12, expedia: 4, direct: 14, note: "Open every channel." },
  { state: "Normal", booking: 12, agoda: 10, expedia: 2, direct: 16, note: "Start pulling low-margin." },
  { state: "Compression", booking: 8, agoda: 8, expedia: 0, direct: 18, note: "Close wholesaler. Protect Direct.", pick: true },
  { state: "Surge", booking: 6, agoda: 6, expedia: 0, direct: 22, note: "Last rooms to Direct / Agent Direct." },
];

export const PROMO_OPTIONS = [
  { id: "A", en: "20% discount", th: "ลด 20%", occ: 4, net: -18200, pick: false },
  { id: "B", en: "10% discount", th: "ลด 10%", occ: 2, net: -7400, pick: false },
  { id: "C", en: "No discount + breakfast", th: "ไม่ลด + อาหารเช้า", occ: 1, net: 6400, pick: true },
  { id: "D", en: "฿20,000 ad campaign", th: "โฆษณา ฿20,000", occ: 2, net: -4200, pick: false },
  { id: "E", en: "Stay 3 Pay 2", th: "พัก 3 จ่าย 2", occ: 3, net: -9100, pick: false },
];

export const CONVERT_SESSIONS = [
  { id: "S-4419", src: "Google / Sydney / mobile", dates: "24–25 Aug", room: "Garden Deluxe", drop: "payment", p: 71, offer: "Free cancel 24h", offerTh: "ยกเลิกฟรี 24 ชม." },
  { id: "S-4420", src: "LINE OA / BKK / iOS", dates: "22 Aug", room: "Pool Access", drop: "rate", p: 44, offer: "Late checkout 14:00", offerTh: "เช็คเอาท์ 14:00" },
  { id: "S-4408", src: "Agent Direct / SG", dates: "21 Aug", room: "Garden Deluxe", drop: "none", p: 88, offer: "Already converting", offerTh: "กำลังแปลงอยู่แล้ว" },
];

export const WHY_DOWN = [
  { k: "Singapore demand weaker", n: -4.1 },
  { k: "OTA visibility down", n: -2.3 },
  { k: "Lost corporate", n: -1.5 },
  { k: "Other", n: -0.8 },
];

export const PHASE2_ACTIONS = ["ros-cancel-lim", "ros-overbook-fri", "ros-elastic-hold", "ros-group", "ros-alloc-booking", "ros-promo-c", "ros-convert-sydney"] as const;

export function isPhase2Decision(id: string) {
  return (PHASE2_ACTIONS as readonly string[]).includes(id) || id === "ros-overbook-block";
}

export function phase2Writes() {
  return REV_DECISIONS.filter((d) => (PHASE2_ACTIONS as readonly string[]).includes(d.id));
}

export const LOOP = ["Observe", "Predict", "Decide", "Act", "Measure", "Learn", "Update model"] as const;

export function agentName(id: RevAgent) {
  return REV_AGENTS.find((a) => a.id === id)?.en ?? id;
}
