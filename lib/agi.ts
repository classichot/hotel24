/** HOTEL24 AGI Mode — authorised external agents receive an objective,
 *  work across modules, execute permitted actions, and report.
 *  Distinct from normal AI (helps a user inside HOTEL24).
 *  HOTEL24 validates prices, inventory, limits and commits. Seeded demo. */

export const AGI_VERSION = "0.1.0";

export type AgiBot = "grok" | "claude" | "chatgpt";
export type AgiScope = "owner" | "guest";
export type AgiLevel = 0 | 1 | 2;
export type AgiConn = "off" | "testing" | "live" | "paused" | "revoked";
export type AgiMissionStatus = "draft" | "running" | "awaiting" | "blocked" | "done" | "paused";
export type AgiRecordKind = "plan" | "decision" | "approval" | "action" | "result" | "handover" | "block" | "note";

export const AGI_LEVELS: { id: AgiLevel; en: string; th: string; hint: string; hintTh: string }[] = [
  { id: 0, en: "A0 Analyse only", th: "A0 วิเคราะห์อย่างเดียว", hint: "Read context. Write nothing.", hintTh: "อ่านบริบท ห้ามเขียน" },
  { id: 1, en: "A1 Prepare for approval", th: "A1 เตรียมรออนุมัติ", hint: "Draft the plan. You commit.", hintTh: "ร่างแผน คุณเป็นคนลง" },
  { id: 2, en: "A2 Execute within limits", th: "A2 ลงมือในกรอบ", hint: "Act inside floor, budget and ask-rules.", hintTh: "ทำได้ในราคาพื้น งบ และกฎที่ต้องถาม" },
];

export const AGI_BOTS: {
  id: AgiBot;
  seq: number;
  en: string;
  th: string;
  scope: AgiScope[];
  approach: string;
  approachTh: string;
  docs: string;
  demo: string;
  demoTh: string;
}[] = [
  {
    id: "grok",
    seq: 1,
    en: "Grok Bot",
    th: "Grok Bot",
    scope: ["owner"],
    approach: "HOTEL24 connector / MCP first. Grok documents connector and browser use; the Grok API also supports remote MCP. Native one-click is not promised until onboarding is validated.",
    approachTh: "ตัวเชื่อม HOTEL24 / MCP ก่อน Grok มีเอกสารคอนเนกเตอร์และเบราว์เซอร์ API รองรับ MCP ระยะไกล ยังไม่สัญญาติดตั้งคลิกเดียวจนกว่าจะตรวจออนบอร์ด",
    docs: "https://docs.x.ai/grok-bot/computer-and-apps",
    demo: "Review next month’s booking pace and prepare a recovery mission.",
    demoTh: "ตรวจจังหวะจองเดือนหน้า แล้วร่างภารกิจกู้ห้องกลางสัปดาห์",
  },
  {
    id: "claude",
    seq: 2,
    en: "Claude / Cowork",
    th: "Claude / Cowork",
    scope: ["owner"],
    approach: "Remote MCP connector with authenticated hotel access. Claude documents custom connectors, including Cowork.",
    approachTh: "คอนเนกเตอร์ MCP ระยะไกลพร้อมสิทธิ์โรงแรม Claude รองรับคอนเนกเตอร์รวม Cowork",
    docs: "https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities",
    demo: "Review this group enquiry and prepare three profitable package options.",
    demoTh: "ตรวจคำขอกรุ๊ป แล้วร่างแพ็กเกจกำไรสามแบบ",
  },
  {
    id: "chatgpt",
    seq: 3,
    en: "ChatGPT / Work",
    th: "ChatGPT / Work",
    scope: ["owner", "guest"],
    approach: "MCP-based plugin plus optional hotel views. Calling a model API inside HOTEL24 is a different integration from connecting the owner’s existing bot.",
    approachTh: "ปลั๊กอิน MCP พร้อมมุมมองโรงแรมถ้ามี การเรียก API โมเดลใน HOTEL24 คนละเรื่องกับการต่อบอทที่เจ้าของใช้อยู่",
    docs: "https://developers.openai.com/plugins",
    demo: "Show today’s hotel exceptions and resolve the tasks within my authority.",
    demoTh: "โชว์ข้อยกเว้นวันนี้ แล้วปิดงานที่อยู่ในอำนาจ",
  },
];

export const AGI_ACTIONS: {
  id: string;
  en: string;
  th: string;
  scope: AgiScope;
  minLevel: AgiLevel;
  ask: boolean;
  floor?: boolean;
}[] = [
  { id: "read_context", en: "Read live hotel context", th: "อ่านบริบทโรงแรมสด", scope: "owner", minLevel: 0, ask: false },
  { id: "assign_mission", en: "Receive an objective", th: "รับวัตถุประสงค์", scope: "owner", minLevel: 1, ask: false },
  { id: "propose_rate", en: "Propose a rate or restriction", th: "เสนอราคาหรือข้อจำกัด", scope: "owner", minLevel: 1, ask: false, floor: true },
  { id: "publish_rate", en: "Publish a rate within floor", th: "ลงราคาในราคาพื้น", scope: "owner", minLevel: 2, ask: false, floor: true },
  { id: "promo_spend", en: "Spend approved promotion budget", th: "ใช้งบโปรที่อนุมัติ", scope: "owner", minLevel: 2, ask: false },
  { id: "change_cancel", en: "Change cancellation policy", th: "เปลี่ยนนโยบายยกเลิก", scope: "owner", minLevel: 1, ask: true },
  { id: "assign_task", en: "Assign work to staff", th: "มอบงานให้พนักงาน", scope: "owner", minLevel: 2, ask: false },
  { id: "guest_message", en: "Send approved guest message", th: "ส่งข้อความแขกที่อนุมัติ", scope: "owner", minLevel: 1, ask: false },
  { id: "quote", en: "Issue a live quote", th: "ออกใบราคา", scope: "guest", minLevel: 0, ask: false },
  { id: "hold", en: "Hold inventory (expires)", th: "กันห้อง (หมดอายุ)", scope: "guest", minLevel: 1, ask: false },
  { id: "book", en: "Confirm reservation after pay", th: "ยืนยันจองหลังชำระ", scope: "guest", minLevel: 2, ask: false },
  { id: "recover_cancel", en: "Run cancellation recovery", th: "กู้ห้องที่ยกเลิก", scope: "owner", minLevel: 2, ask: false },
  { id: "group_block", en: "Hold a group room block", th: "กันบล็อกกรุ๊ป", scope: "owner", minLevel: 1, ask: false },
];

export const AGI_RULES = {
  floorThb: 2200,
  promoCapThb: 10000,
  maxDailyMovePct: 8,
  holdMinutes: 10,
  quoteMinutes: 15,
  askAlways: ["change_cancel"],
  protectedDates: ["22 Aug", "23 Aug"],
};

export const AGI_KNOWLEDGE = {
  property: "Baan Talay Boutique Resort",
  rooms: [
    { id: "garden", en: "Garden Deluxe", occ: 2, child: "1 child under 12 on existing bedding", rate: 2200 },
    { id: "pool", en: "Pool Access", occ: 2, child: "No extra bed", rate: 2900 },
    { id: "suite", en: "Sea View Suite", occ: 2, child: "1 extra bed ฿800", rate: 4300 },
    { id: "loft", en: "Family Loft", occ: 4, child: "2 children included", rate: 3800 },
  ],
  amenities: ["Breakfast on Direct", "Parking", "Airport transfer ฿800", "Late checkout 14:00 on Direct"],
  children: "Under 12 share existing bedding on Garden and Loft. Extra bed only on Suite.",
  tone: "Paper, lacquer red, no emoji. Thai owners first. Hotel owns the guest.",
  sops: ["Refunds outside agent authority", "TM30 within 24h of foreign check-in", "Keys after PromptPay on unpaid arrivals"],
  commercial: `Public BAR never under ฿${AGI_RULES.floorThb.toLocaleString()}. Promo spend ≤ ฿${AGI_RULES.promoCapThb.toLocaleString()}. Ask before cancellation policy. Weekend 22–23 Aug is protected.`,
  exceptions: ["Owner comp nights", "Travel-agent allotment already contracted"],
};

export const AGI_CONTEXT = {
  asOf: "19 Aug 09:14 +07",
  freshness: {
    availability: "40s",
    reservations: "live",
    pace: "06:00 snapshot",
    cancellations: "2 min",
    readiness: "09:02 HK board",
    channels: "Agoda ack 12 min stale",
    costs: "yesterday close",
  },
  occupancy: { today: 82, weekdaySep: 54, weekend: 96 },
  availability: { garden: 3, pool: 1, suite: 4, loft: 0 },
  pace: "Weekday Sep pickup −18% vs last year. Weekend already compressed.",
  cancels: { last24h: 2, roomNights: 3, window: "6 days" },
  readiness: { dirty: 4, ooo: 1, ready: 37 },
  channels: { directNet: 2576, agodaNet: 1493, bookingNet: 1776 },
  costs: { variableNight: 420, breakfast: 180, transfer: 800 },
};

export type AgiMission = {
  id: string;
  bot: AgiBot;
  en: string;
  th: string;
  objective: string;
  objectiveTh: string;
  deadline: string;
  budget: number;
  measure: string;
  measureTh: string;
  permitted: string[];
  href: string;
};

export const AGI_MISSIONS: AgiMission[] = [
  {
    id: "m-rev",
    bot: "grok",
    en: "Weekday revenue recovery",
    th: "กู้รายได้กลางสัปดาห์",
    objective: "Improve next month’s weekday bookings. Keep room rates above ฿2,200, spend no more than ฿10,000 on promotion, and ask me before changing cancellation policies.",
    objectiveTh: "เพิ่มการจองกลางสัปดาห์เดือนหน้า ราคาไม่ต่ำกว่า ฿2,200 งบโปรไม่เกิน ฿10,000 และถามก่อนเปลี่ยนนโยบายยกเลิก",
    deadline: "30 Aug",
    budget: 10000,
    measure: "Weekday occupancy +8 pts · contribution after commission",
    measureTh: "เข้าพักกลางสัปดาห์ +8 จุด · ส่วนสมทบหลังคอม",
    permitted: ["read_context", "propose_rate", "promo_spend", "assign_mission"],
    href: "/agi-revenue",
  },
  {
    id: "m-weekend",
    bot: "grok",
    en: "Weekend full-house prep",
    th: "เตรียมบ้านเต็มสุดสัปดาห์",
    objective: "Prepare the hotel for this weekend’s fully booked period.",
    objectiveTh: "เตรียมโรงแรมสำหรับบ้านเต็มสุดสัปดาห์นี้",
    deadline: "22 Aug 12:00",
    budget: 0,
    measure: "Arrivals ready · no unassigned rooms · exceptions on one board",
    measureTh: "แขกเข้าพร้อม · ไม่มีห้องไร้คนรับ · ข้อยกเว้นบนกระดานเดียว",
    permitted: ["read_context", "assign_task", "guest_message"],
    href: "/agi-gm",
  },
  {
    id: "m-recover",
    bot: "chatgpt",
    en: "Cancellation recovery",
    th: "กู้ห้องที่ยกเลิก",
    objective: "Recover the opportunity automatically when rooms cancel.",
    objectiveTh: "กู้โอกาสอัตโนมัติเมื่อมีห้องยกเลิก",
    deadline: "same day",
    budget: 4000,
    measure: "Replacement nights · net recorded separately from causation",
    measureTh: "คืนทดแทน · สุทธิแยกจากการอ้างว่าเป็นสาเหตุ",
    permitted: ["read_context", "recover_cancel", "guest_message"],
    href: "/agi-recover",
  },
  {
    id: "m-group",
    bot: "claude",
    en: "Group deal desk",
    th: "โต๊ะดีลกรุ๊ป",
    objective: "Turn a 12-room tour enquiry into an executable booking.",
    objectiveTh: "เปลี่ยนคำถามกรุ๊ป 12 ห้องเป็นจองที่ลงได้",
    deadline: "hold 48h",
    budget: 0,
    measure: "Three packages · displacement checked · block expiry",
    measureTh: "แพ็กเกจสามแบบ · ตรวจการเบียด · บล็อกหมดอายุ",
    permitted: ["read_context", "group_block", "propose_rate"],
    href: "/agi-group",
  },
];

export type AgiRecord = {
  id: string;
  t: string;
  bot: AgiBot | "hotel24";
  missionId?: string;
  kind: AgiRecordKind;
  en: string;
  th: string;
  observed: boolean;
};

export const AGI_RECORD_SEED: AgiRecord[] = [
  { id: "r0", t: "19 Aug 06:02", bot: "hotel24", kind: "note", en: "AGI Mode layer created. Normal AI still proposes inside the console until you turn AGI Mode on.", th: "สร้างชั้น AGI Mode แล้ว AI ปกติยังเสนอในคอนโซลจนกว่าคุณจะเปิดโหมด AGI", observed: true },
];

export const AGI_WEEKEND = [
  { k: "Arrivals Fri–Sun", kt: "แขกเข้า ศ–อา", ready: true, who: "Front", note: "38 arrivals · 2 unpaid" },
  { k: "Room readiness", kt: "ห้องพร้อม", ready: false, who: "HK", note: "104 / 207 / 311 / V2 still dirty" },
  { k: "Maintenance", kt: "ซ่อม", ready: false, who: "Owner", note: "209 aircon OOO — decide move vs stay" },
  { k: "Transfers", kt: "รถรับส่ง", ready: true, who: "Guest agent", note: "3 airport runs booked" },
  { k: "Staffing", kt: "คนเข้ากะ", ready: true, who: "F&B", note: "+2 breakfast 08:00–09:30" },
  { k: "Special requests", kt: "คำขอพิเศษ", ready: true, who: "Inbox", note: "Late checkout × 4 on Direct" },
];

export const AGI_RECOVER = {
  cancelled: { guest: "Lim, W.", room: "Garden Deluxe", nights: 2, dates: "24–26 Aug", lost: 4400 },
  actions: ["Released inventory to Direct + Booking.com", "Offered Suite upgrade to in-house Chen (declined)", "Waitlist SMS to two LINE OA guests — permission on file"],
  replacement: { guest: "waitlist · S. Patel", room: "Garden Deluxe", nights: 2, net: 3960, observed: true },
  caution: "A replacement booking is recorded. It does not prove the agent caused it.",
  cautionTh: "บันทึกการจองทดแทนแล้ว ไม่ได้พิสูจน์ว่าเอเจนต์เป็นสาเหตุ",
};

export const AGI_GROUP = {
  enquiry: "Tour24 operator · 12 Garden · 18–21 Sep · breakfast + two transfers · budget ฿280,000",
  packages: [
    { id: "g-a", en: "Rack + breakfast", th: "ราคาหน้า + อาหารเช้า", rooms: 12, total: 264000, displace: 18400, pick: false },
    { id: "g-b", en: "Net ฿6,800 / room with 2 transfers", th: "สุทธิ ฿6,800 / ห้อง รวมรถ 2 เที่ยว", rooms: 12, total: 244800, displace: 6200, pick: true },
    { id: "g-c", en: "10 rooms only — protect weekend shoulder", th: "10 ห้อง — กันไหล่สุดสัปดาห์", rooms: 10, total: 204000, displace: 0, pick: false },
  ],
};

export const AGI_SIM = {
  plan: "Grok: reduce weekday BAR 8% on Garden Mon–Thu September.",
  planTh: "Grok: ลด BAR กลางสัปดาห์ 8% สวน จ–พฤ กันยายน",
  hotel24: { from: 2200, proposed: 2024, blocked: true, reason: "Floor ฿2,200. 8% of 2,200 is ฿2,024 — Guardian / AGI rules refuse." },
  claude: "Assumptions treat elasticity as −1.1 from a 2024 weekday sample. No competitor move observed this week. Protected weekend dates are untouched. I would not publish below the floor.",
  claudeTh: "สมมติความยืดหยุ่น −1.1 จากตัวอย่างกลางสัปดาห์ 2024 สัปดาห์นี้ไม่เห็นคู่แข่งขยับ วันสุดสัปดาห์ที่กันไว้ไม่แตะ จะไม่ลงต่ำกว่าราคาพื้น",
};

export const AGI_GUEST_NEED = {
  who: "Traveller ChatGPT",
  ask: "Find a Chiang Mai or Krabi hotel for two adults and two children, with breakfast and airport transfer, within ฿18,000.",
  askTh: "หาโรงแรมเชียงใหม่หรือกระบี่ สำหรับผู้ใหญ่ 2 เด็ก 2 รวมอาหารเช้าและรถรับส่ง สนามบิน งบไม่เกิน ฿18,000",
};

export const AGI_OFFERS = [
  {
    id: "o-loft",
    hotel: "Baan Talay Boutique Resort",
    room: "Family Loft",
    nights: 2,
    roomThb: 7600,
    breakfast: 720,
    transfer: 800,
    total: 9120,
    cancel: "Free until 48h",
    fit: "2 adults + 2 children on one room",
  },
  {
    id: "o-two",
    hotel: "Baan Talay Boutique Resort",
    room: "Garden Deluxe × 2",
    nights: 2,
    roomThb: 8800,
    breakfast: 1440,
    transfer: 800,
    total: 11040,
    cancel: "Free until 48h",
    fit: "Two connecting gardens if Family Loft is sold",
  },
];

export type AgiArgs = Record<string, unknown>;

function str(a: AgiArgs, k: string) {
  return String(a[k] ?? "");
}

const holds = new Map<string, { holdId: string; offerId: string; expires: string }>();

export function agiMcpManifest(origin: string) {
  return {
    name: "hotel24-agi-mode",
    version: AGI_VERSION,
    description: "HOTEL24 AGI Mode — owner missions and guest shopping on one permissioned API. HOTEL24 commits. Agents propose.",
    scopes: ["owner", "guest"],
    tools: [
      { name: "agi_status", description: "Is AGI Mode on, and which bots are live." },
      { name: "get_hotel_context", description: "Live occupancy, pace, readiness, channels — with freshness." },
      { name: "get_knowledge_profile", description: "Rooms, children, SOPs, commercial rules." },
      { name: "list_missions", description: "Open objectives, budgets, permitted actions." },
      { name: "assign_mission", description: "Give an authorised owner bot an objective." },
      { name: "propose_rate", description: "Draft a rate. HOTEL24 checks the floor." },
      { name: "quote_package", description: "Guest-scope complete offer with breakfast/transfer." },
      { name: "hold_offer", description: "10-minute inventory hold. No charge." },
      { name: "confirm_booking", description: "Convert a hold after payment. Hotel owns the guest." },
      { name: "read_work_record", description: "Shared plans, decisions, approvals — another bot can continue." },
    ],
    invoke: `${origin}/api/agi/invoke`,
    identity: `${origin}/.well-known/hotel24-agi.json`,
    note: "Permissions are enforced by HOTEL24. Guest tools never see owner missions. Not a certified Grok / Claude / ChatGPT listing.",
  };
}

export function invokeAgi(name: string, args: AgiArgs = {}, ctx: { on: boolean; level: AgiLevel; paused: boolean }) {
  if (!ctx.on) return { error: "agi_mode_off", message: "AGI Mode is off. Normal AI still works inside HOTEL24." };
  if (ctx.paused && name !== "agi_status") return { error: "agi_paused", message: "Owner paused AGI Mode. No agent may act." };

  switch (name) {
    case "agi_status":
      return { on: ctx.on, paused: ctx.paused, level: ctx.level, version: AGI_VERSION, bots: AGI_BOTS.map((b) => b.id) };
    case "get_hotel_context":
      return { ...AGI_CONTEXT };
    case "get_knowledge_profile":
      return { ...AGI_KNOWLEDGE, rules: AGI_RULES };
    case "list_missions":
      return { missions: AGI_MISSIONS };
    case "assign_mission": {
      if (ctx.level < 1) return { error: "level_a0", message: "A0 Analyse only — mission recorded, nothing assigned." };
      return { ok: true, missionId: str(args, "missionId") || "m-rev", status: ctx.level >= 2 ? "running" : "awaiting" };
    }
    case "propose_rate": {
      const rate = Number(args.rate) || 0;
      if (rate > 0 && rate < AGI_RULES.floorThb) {
        return { error: "floor", blocked: true, floor: AGI_RULES.floorThb, requested: rate, message: "HOTEL24 refused. Floor is ฿2,200." };
      }
      return { ok: true, status: ctx.level >= 2 ? "queued" : "awaiting_approval", rate: rate || 2200 };
    }
    case "quote_package":
      return { quotes: AGI_OFFERS, expires: `${AGI_RULES.quoteMinutes} minutes`, merchant: "the hotel" };
    case "hold_offer": {
      const offerId = str(args, "offerId") || "o-loft";
      const holdId = `HOLD-AGI-${Date.now().toString(36).toUpperCase()}`;
      holds.set(holdId, { holdId, offerId, expires: `${AGI_RULES.holdMinutes} minutes` });
      return { holdId, offerId, expires: `${AGI_RULES.holdMinutes} minutes`, next: "confirm_booking" };
    }
    case "confirm_booking": {
      const holdId = str(args, "holdId");
      const hold = holdId ? holds.get(holdId) : undefined;
      const offer = AGI_OFFERS.find((o) => o.id === (hold?.offerId || str(args, "offerId") || "o-loft")) ?? AGI_OFFERS[0];
      return {
        bookingId: `H24-AGI-${Date.now().toString(36).toUpperCase()}`,
        hotel: offer.hotel,
        room: offer.room,
        total: offer.total,
        commission: 0,
        otaInvolved: false,
        merchantOfRecord: offer.hotel,
        guest: str(args, "guest") || "ChatGPT traveller",
      };
    }
    case "read_work_record":
      return { records: AGI_RECORD_SEED };
    default:
      return { error: "unknown_tool" };
  }
}

export function contrib(rate: number) {
  const commission = Math.round(rate * 0.18);
  return rate - commission - AGI_CONTEXT.costs.variableNight;
}

export function botName(id: AgiBot | "hotel24") {
  if (id === "hotel24") return "HOTEL24";
  return AGI_BOTS.find((b) => b.id === id)?.en ?? id;
}
