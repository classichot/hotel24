export type Lang = "en" | "th";
export type Role = "owner" | "front" | "housekeeping";
export type ChannelKey = "direct" | "booking" | "agoda" | "airbnb" | "expedia" | "agent";
export type RecStatus = "pending" | "applied" | "dismissed";
export type HkStatus = 0 | 1 | 2 | 3;
export type AiMode = "recommend" | "auto";

export const CHANNELS: Record<ChannelKey, { en: string; th: string; ink: string; fg: string }> = {
  direct: { en: "Direct", th: "จองตรง", ink: "#ffdc2e", fg: "#201e1d" },
  booking: { en: "Booking.com", th: "Booking.com", ink: "#201e1d", fg: "#f8f4f4" },
  agoda: { en: "Agoda", th: "Agoda", ink: "#605d5d", fg: "#f8f4f4" },
  airbnb: { en: "Airbnb", th: "Airbnb", ink: "#7d7979", fg: "#f8f4f4" },
  expedia: { en: "Expedia", th: "Expedia", ink: "#bab6b6", fg: "#201e1d" },
  agent: { en: "Agent / TA", th: "เอเจนต์", ink: "#d7d3d3", fg: "#201e1d" },
};

export const HK_LABELS = [
  { en: "Dirty", th: "ยังไม่ทำ" },
  { en: "Cleaning", th: "กำลังทำ" },
  { en: "Inspect", th: "รอตรวจ" },
  { en: "Ready", th: "พร้อมขาย" },
] as const;

export const OWNER = {
  name: "Som P.",
  nameTh: "สม ประเสริฐ",
  email: "som@baantalay.com",
  role: "Owner",
  roleTh: "เจ้าของ",
  initials: "SP",
};

export const FRONT_USER = {
  name: "Mali S.",
  nameTh: "มาลี สุขใจ",
  email: "front@baantalay.com",
  role: "Front desk",
  roleTh: "แผนกต้อนรับ",
  initials: "MS",
};

export const PROPERTIES = [
  {
    id: "baantalay",
    name: "Baan Talay Boutique Resort",
    nameTh: "บ้านทะเล บูทีครีสอร์ต",
    loc: "Ao Nang, Krabi",
    locTh: "อ่าวนาง กระบี่",
    rooms: 42,
    occ: 82,
    adr: 2480,
    direct: 19,
    plan: "Growth",
  },
  {
    id: "hostel",
    name: "Talay Hostel Ao Nang",
    nameTh: "ทะเล โฮสเทล อ่าวนาง",
    loc: "Ao Nang, Krabi",
    locTh: "อ่าวนาง กระบี่",
    rooms: 24,
    occ: 91,
    adr: 640,
    direct: 34,
    plan: "Starter",
  },
  {
    id: "villas",
    name: "Villa Suan Lom",
    nameTh: "วิลล่าสวนลม",
    loc: "3 villas · Noppharat Thara",
    locTh: "3 วิลล่า · นพรัตน์ธารา",
    rooms: 3,
    occ: 64,
    adr: 9400,
    direct: 46,
    plan: "Multi-property",
  },
];

export const ROOM_TYPES = [
  { id: "garden", en: "Garden Deluxe", th: "ดีลักซ์สวน", count: 14, base: 2200 },
  { id: "pool", en: "Pool Access", th: "พูลแอคเซส", count: 10, base: 2900 },
  { id: "suite", en: "Sea View Suite", th: "สวีทวิวทะเล", count: 8, base: 4300 },
  { id: "loft", en: "Family Loft", th: "แฟมิลี่ลอฟท์", count: 6, base: 3400 },
  { id: "villa", en: "Beach Villa 2BR", th: "วิลล่าริมหาด", count: 4, base: 8900 },
];

export const CAL_DAYS = [
  { num: "19", dow: "WED" },
  { num: "20", dow: "THU" },
  { num: "21", dow: "FRI" },
  { num: "22", dow: "SAT" },
  { num: "23", dow: "SUN" },
  { num: "24", dow: "MON" },
  { num: "25", dow: "TUE" },
  { num: "26", dow: "WED" },
  { num: "27", dow: "THU" },
  { num: "28", dow: "FRI" },
  { num: "29", dow: "SAT" },
  { num: "30", dow: "SUN" },
  { num: "31", dow: "MON" },
  { num: "1 ก.ย.", dow: "TUE" },
];

export const OCC = [76, 81, 88, 92, 90, 74, 68, 72, 79, 85, 91, 94, 88, 70];

export type CalBar = { k: ChannelKey; g: string; start: number; span: number };

export const CAL_ROWS: { type: string; bars: CalBar[] }[] = [
  {
    type: "garden",
    bars: [
      { k: "booking", g: "Müller, S.", start: 1, span: 3 },
      { k: "direct", g: "ชัยวัฒน์ ป.", start: 4, span: 2 },
      { k: "agoda", g: "Tanaka, H.", start: 7, span: 4 },
      { k: "expedia", g: "Novak, J.", start: 12, span: 3 },
    ],
  },
  {
    type: "pool",
    bars: [
      { k: "agoda", g: "Lim, W.", start: 1, span: 4 },
      { k: "direct", g: "สุดารัตน์ ก.", start: 6, span: 3 },
      { k: "booking", g: "Ivanov, A.", start: 10, span: 5 },
    ],
  },
  {
    type: "suite",
    bars: [
      { k: "airbnb", g: "Garcia, M.", start: 2, span: 5 },
      { k: "direct", g: "Chen, Y.", start: 8, span: 2 },
      { k: "agent", g: "TAT fam trip", start: 11, span: 3 },
    ],
  },
  {
    type: "loft",
    bars: [
      { k: "booking", g: "Weber, K.", start: 3, span: 4 },
      { k: "direct", g: "ณัฐพล ว.", start: 9, span: 4 },
    ],
  },
  {
    type: "villa",
    bars: [
      { k: "direct", g: "Al-Farsi, R.", start: 1, span: 6 },
      { k: "agoda", g: "Petrov, D.", start: 9, span: 5 },
    ],
  },
];

export const UNASSIGNED = [
  { g: "Petrov, D.", type: "Beach Villa 2BR", ch: "Agoda · 27 Aug" },
  { g: "Novak, J.", type: "Garden Deluxe", ch: "Expedia · 30 Aug" },
  { g: "TAT fam trip", type: "Sea View Suite ×2", ch: "Agent · 29 Aug" },
];

export const CHANNEL_STATUS = [
  { name: "Booking.com", status: "Connected", sync: "synced 2 min ago", mapped: "5 room types · 9 rate plans", note: "Reservations, cancellations and modifications flowing", noteHot: false, k: "booking" as ChannelKey },
  { name: "Agoda", status: "Connected", sync: "synced 2 min ago", mapped: "5 room types · 7 rate plans", note: "ARI push queued 11 min — retrying", noteHot: true, k: "agoda" as ChannelKey },
  { name: "Expedia", status: "Connected", sync: "synced 4 min ago", mapped: "4 room types · 6 rate plans", note: "Family Loft unmapped — inventory not controlled", noteHot: true, k: "expedia" as ChannelKey },
  { name: "Airbnb", status: "Connected", sync: "synced 6 min ago", mapped: "3 listings", note: "Villas and suites only", noteHot: false, k: "airbnb" as ChannelKey },
  { name: "Trip.com", status: "Pending", sync: "certification in progress", mapped: "Mapping drafted", note: "Provider onboarding · est. 2 weeks", noteHot: false, k: "agent" as ChannelKey },
  { name: "HOTEL24 Direct", status: "Live", sync: "real time", mapped: "All room types · all rate plans", note: "No commission · 85.5% net margin", noteHot: true, k: "direct" as ChannelKey },
];

export const MAPPINGS_SEED = [
  { id: "m1", room: "Garden Deluxe", ch: "Booking.com", plan: "Deluxe Garden View — Standard / Non-ref", inv: "14", state: "Mapped" as const },
  { id: "m2", room: "Garden Deluxe", ch: "Agoda", plan: "Deluxe Garden — Breakfast included", inv: "14", state: "Mapped" as const },
  { id: "m3", room: "Pool Access", ch: "Booking.com", plan: "Pool Access Room — Standard", inv: "10", state: "Mapped" as const },
  { id: "m4", room: "Sea View Suite", ch: "Airbnb", plan: "Sea View Suite (entire unit)", inv: "8", state: "Mapped" as const },
  { id: "m5", room: "Family Loft", ch: "Expedia", plan: "— not mapped —", inv: "0 controlled", state: "Unmapped" as const },
  { id: "m6", room: "Beach Villa 2BR", ch: "Agoda", plan: "Two-Bedroom Beach Villa", inv: "4", state: "Mapped" as const },
  { id: "m7", room: "Beach Villa 2BR", ch: "Trip.com", plan: "Two-Bedroom Villa (draft)", inv: "held", state: "Pending" as const },
];

export const SHIELD_SEED = [
  { id: "s1", sev: "High" as const, when: "since 17 Aug 09:12", text: "Family Loft is unmapped on Expedia. Six room-nights sold without inventory control — one night is now oversold.", action: "Fix mapping and close tonight" },
  { id: "s2", sev: "Medium" as const, when: "11 min", text: "Agoda ARI push has been queued for 11 minutes; the usual round trip is 40 seconds. Rates may be stale on Agoda.", action: "Force re-push" },
  { id: "s3", sev: "Low" as const, when: "18 Aug 22:41", text: "Beach Villa 2BR was closed manually by som@baantalay with no reason recorded, then reopened 20 minutes later.", action: "View audit log" },
];

export const RECS_SEED = [
  {
    id: "r1",
    kind: "Rate increase",
    kindTh: "ขึ้นราคา",
    when: "Sat 22 – Sun 23 Aug",
    head: "Garden Deluxe, weekend",
    headTh: "ดีลักซ์สวน สุดสัปดาห์",
    from: "฿2,200",
    to: "฿2,550",
    delta: "+16%",
    impact: "+฿4,900",
    why: "Increase Deluxe Room from ฿2,200 to ฿2,550 this weekend because occupancy reached 82% and local demand is rising.",
    whyTh: "ขึ้นราคา Deluxe จาก ฿2,200 เป็น ฿2,550 เฉพาะสุดสัปดาห์นี้ เพราะห้องเต็ม 82% และความต้องการในกระบี่กำลังขึ้น",
  },
  {
    id: "r2",
    kind: "Minimum stay",
    kindTh: "ขั้นต่ำการเข้าพัก",
    when: "Mon 24 – Thu 27 Aug",
    head: "Pool Access, 2-night minimum",
    headTh: "พูลแอคเซส ขั้นต่ำ 2 คืน",
    from: "1 night",
    to: "2 nights",
    delta: "restriction",
    impact: "+฿6,200",
    why: "Single-night weekday bookings are cutting your calendar into gaps that three-night stays cannot fit into. Two nights minimum keeps the block sellable.",
    whyTh: "การจองคืนเดียวกลางสัปดาห์ทำให้ปฏิทินเป็นช่องว่างที่การเข้าพัก 3 คืนใส่ไม่ได้ ขั้นต่ำ 2 คืนจะเก็บช่วงนี้ขายได้",
  },
  {
    id: "r3",
    kind: "Last-minute",
    kindTh: "นาทีสุดท้าย",
    when: "Tonight, Agoda only",
    head: "Sea View Suite, −12% on Agoda",
    headTh: "สวีทวิวทะเล −12% บน Agoda",
    from: "฿4,300",
    to: "฿3,784",
    delta: "−12%",
    impact: "+฿7,300",
    why: "Four suites are unsold at 09:00 and Agoda converts your last-minute traffic about three times better than the other channels. Direct and Booking.com rates stay untouched.",
    whyTh: "สวีทยังว่าง 4 ห้องตอน 09:00 และ Agoda แปลงทราฟฟิกนาทีสุดท้ายได้ดีกว่าช่องทางอื่นราวสามเท่า ราคาจองตรงและ Booking.com ไม่เปลี่ยน",
  },
];

export const RATE_DAYS = ["Wed 19", "Thu 20", "Fri 21", "Sat 22", "Sun 23", "Mon 24", "Tue 25"];

export const RATE_GRID: { name: string; cells: [string, 0 | 1 | 2][] }[] = [
  { name: "Garden Deluxe", cells: [["฿2,200", 0], ["฿2,200", 0], ["฿2,200", 0], ["฿2,550", 1], ["฿2,550", 1], ["฿1,980", 0], ["฿1,980", 0]] },
  { name: "Pool Access", cells: [["฿2,900", 0], ["฿2,900", 0], ["฿2,900", 0], ["฿3,300", 0], ["฿3,300", 0], ["2 nights", 1], ["2 nights", 1]] },
  { name: "Sea View Suite", cells: [["฿3,784", 1], ["฿4,300", 0], ["฿4,300", 0], ["฿4,800", 0], ["฿4,800", 0], ["฿4,300", 0], ["฿4,300", 0]] },
  { name: "Family Loft", cells: [["฿3,400", 0], ["฿3,400", 0], ["฿3,400", 0], ["฿3,900", 0], ["฿3,900", 0], ["Stop-sell", 2], ["฿3,400", 0]] },
  { name: "Beach Villa 2BR", cells: [["฿8,900", 0], ["฿8,900", 0], ["฿8,900", 0], ["฿9,800", 0], ["฿9,800", 0], ["฿8,900", 0], ["฿8,900", 0]] },
];

export const PROFIT_ROWS = [
  { ch: "Booking.com", k: "booking" as ChannelKey, rn: 412, gross: 1046000, comm: -156900, promo: -52300, pay: -15700, tax: -68400, cancel: -21000, ads: 0 },
  { ch: "Agoda", k: "agoda" as ChannelKey, rn: 356, gross: 872000, comm: -148240, promo: -87200, pay: -13100, tax: -57000, cancel: -34900, ads: 0 },
  { ch: "HOTEL24 Direct", k: "direct" as ChannelKey, rn: 198, gross: 520000, comm: 0, promo: -26000, pay: -10400, tax: -34000, cancel: -5200, ads: 0 },
  { ch: "Airbnb", k: "airbnb" as ChannelKey, rn: 96, gross: 243000, comm: -36450, promo: 0, pay: -3600, tax: -15900, cancel: -7300, ads: 0 },
  { ch: "Expedia", k: "expedia" as ChannelKey, rn: 74, gross: 181000, comm: -32580, promo: -9050, pay: -2700, tax: -11800, cancel: -6300, ads: 0 },
  { ch: "Agent / TA", k: "agent" as ChannelKey, rn: 58, gross: 121000, comm: -24200, promo: 0, pay: 0, tax: -7900, cancel: 0, ads: 0 },
];

export function profitNet(r: (typeof PROFIT_ROWS)[number]) {
  return r.gross + r.comm + r.promo + r.pay + r.tax + r.cancel + r.ads;
}

export const ROOMS_SEED = [
  { no: "104", type: "Garden Deluxe", s: 0 as HkStatus, staff: "มาลี", note: "Departed 09:40 · arrival 14:00" },
  { no: "207", type: "Pool Access", s: 0 as HkStatus, staff: "—", note: "Late checkout 13:00, then clean" },
  { no: "311", type: "Sea View Suite", s: 0 as HkStatus, staff: "—", note: "Guest requested no service yesterday" },
  { no: "V2", type: "Beach Villa 2BR", s: 0 as HkStatus, staff: "สมชาย", note: "Deep clean · 4 h · arrival 16:00" },
  { no: "102", type: "Garden Deluxe", s: 1 as HkStatus, staff: "มาลี", note: "Started 09:05" },
  { no: "209", type: "Pool Access", s: 1 as HkStatus, staff: "ปราณี", note: "Aircon complaint — maintenance notified" },
  { no: "305", type: "Family Loft", s: 1 as HkStatus, staff: "สมชาย", note: "Extra bed + cot" },
  { no: "108", type: "Garden Deluxe", s: 2 as HkStatus, staff: "หัวหน้าแม่บ้าน", note: "Awaiting inspection" },
  { no: "204", type: "Pool Access", s: 2 as HkStatus, staff: "หัวหน้าแม่บ้าน", note: "Re-clean: bathroom" },
  { no: "101", type: "Garden Deluxe", s: 3 as HkStatus, staff: "", note: "Sellable · assigned to S. Müller" },
  { no: "106", type: "Garden Deluxe", s: 3 as HkStatus, staff: "", note: "Sellable" },
  { no: "301", type: "Sea View Suite", s: 3 as HkStatus, staff: "", note: "Sellable · upgrade candidate" },
  { no: "302", type: "Sea View Suite", s: 3 as HkStatus, staff: "", note: "Sellable" },
  { no: "V1", type: "Beach Villa 2BR", s: 3 as HkStatus, staff: "", note: "Sellable · 3-night minimum" },
];

export const ARRIVALS_SEED = [
  { id: "a1", name: "Sofia Müller", pax: "2 adults · DE", k: "booking" as ChannelKey, room: "Garden Deluxe 101", nights: 3, bal: "Prepaid", due: 0, eta: "11:00", doc: "Passport on file", docOk: true, res: "H24-8802" },
  { id: "a2", name: "ชัยวัฒน์ ประเสริฐ", pax: "2 adults · TH", k: "direct" as ChannelKey, room: "Pool Access 207", nights: 3, bal: "฿4,410 due", due: 4410, eta: "14:20", doc: "Thai ID", docOk: true, res: "H24-8841" },
  { id: "a3", name: "Marco Garcia", pax: "2 adults · ES", k: "airbnb" as ChannelKey, room: "Sea View Suite 301", nights: 5, bal: "Prepaid", due: 0, eta: "15:00", doc: "Scan needed · TM30", docOk: false, res: "H24-8850" },
  { id: "a4", name: "Rashid Al-Farsi", pax: "4 adults 2 children · OM", k: "direct" as ChannelKey, room: "Beach Villa V2", nights: 6, bal: "฿12,400 due", due: 12400, eta: "16:00", doc: "Scan needed · TM30", docOk: false, res: "H24-8818" },
  { id: "a5", name: "Katharina Weber", pax: "2 adults 1 child · AT", k: "booking" as ChannelKey, room: "Family Loft 305", nights: 4, bal: "Prepaid", due: 0, eta: "18:30", doc: "Passport on file", docOk: true, res: "H24-8833" },
  { id: "a6", name: "Lim Wei Jie", pax: "2 adults · SG", k: "agoda" as ChannelKey, room: "Pool Access 204", nights: 2, bal: "Prepaid", due: 0, eta: "21:10", doc: "Scan needed · TM30", docOk: false, res: "H24-8860" },
];

export const DEPARTURES = [
  { name: "Chen, Yu-Ting", room: "302 · Sea View Suite", folio: "฿14,800 settled", extras: "Minibar ฿420 · spa ฿1,800", status: "Ready to close", open: false },
  { name: "Suda K.", room: "106 · Garden Deluxe", folio: "฿6,600 settled", extras: "—", status: "Departed 09:40", open: false },
  { name: "Novak, J.", room: "104 · Garden Deluxe", folio: "฿1,240 open", extras: "Late checkout 13:00", status: "Balance open", open: true },
  { name: "Petrov, D.", room: "V1 · Beach Villa", folio: "฿26,700 settled", extras: "Transfer ฿800", status: "Ready to close", open: false },
];

export const PAYMENTS = [
  { what: "PromptPay · deposits", amt: 24600 },
  { what: "Card · balances", amt: 38100 },
  { what: "Cash · walk-in", amt: 4800 },
  { what: "Refunds issued", amt: -2900 },
];

export type Msg = { who: string; time: string; side: "guest" | "staff" | "ai"; text: string; sub?: string };

export const THREADS = [
  {
    id: "t1",
    name: "ชัยวัฒน์ ประเสริฐ",
    channel: "LINE",
    time: "09:04",
    state: "AI drafted",
    preview: "ขอรถรับที่สนามบินกระบี่ 14:00 ได้ไหมครับ",
    meta: "Direct booking · 22–25 Aug · Pool Access",
    lang: "Thai",
    draft: "สวัสดีครับคุณชัยวัฒน์ รับที่สนามบินกระบี่เวลา 14:00 ได้ครับ รถตู้ปรับอากาศ 800 บาทต่อเที่ยว (ไม่เกิน 4 ท่าน) คนขับจะรอที่ประตูผู้โดยสารขาเข้าพร้อมป้ายชื่อ ยืนยันให้เลยไหมครับ",
    messages: [
      { who: "ชัยวัฒน์", time: "09:01", side: "guest" as const, text: "สวัสดีครับ ขอรถรับที่สนามบินกระบี่ 14:00 วันที่ 22 ได้ไหมครับ" },
      { who: "AI Concierge", time: "09:01", side: "ai" as const, text: "Matched to reservation #H24-8841 · transfer price list · 2 adults", sub: "AI recognised the guest from the LINE profile and pulled the reservation." },
    ] as Msg[],
    context: [
      { k: "Reservation", v: "H24-8841" },
      { k: "Channel", v: "Direct · LINE OA" },
      { k: "Stay", v: "22–25 Aug · 3 nights" },
      { k: "Room", v: "Pool Access" },
      { k: "Balance", v: "฿4,410 due" },
      { k: "Guest value", v: "3rd stay · ฿38,200 lifetime" },
    ],
  },
  {
    id: "t2",
    name: "Sofia Müller",
    channel: "WhatsApp",
    time: "08:47",
    state: "AI drafted",
    preview: "Can we check in at 11am? Flight lands early.",
    meta: "Booking.com · 19–22 Aug · Garden Deluxe",
    lang: "English",
    draft: "Good morning Sofia — room 101 is already clean, so an 11:00 check-in is fine at no charge. Breakfast runs until 10:30 if you would like to eat on arrival. Shall I hold the room from 11:00?",
    messages: [
      { who: "Sofia Müller", time: "08:47", side: "guest" as const, text: "Can we check in at 11am? Our flight lands at 09:50." },
      { who: "AI Concierge", time: "08:47", side: "ai" as const, text: "Room 101 is Ready. Early check-in policy: free before 12:00 when the room is clean.", sub: "Checked live room status before drafting." },
    ] as Msg[],
    context: [
      { k: "Reservation", v: "H24-8802" },
      { k: "Channel", v: "Booking.com" },
      { k: "Stay", v: "19–22 Aug · 3 nights" },
      { k: "Room", v: "101 · Garden Deluxe" },
      { k: "Balance", v: "Prepaid" },
      { k: "Commission", v: "15% · ฿1,046 net loss vs direct" },
    ],
  },
  {
    id: "t3",
    name: "A. Ivanov",
    channel: "Booking.com",
    time: "07:58",
    state: "AI answered",
    preview: "Do you have a crib for a 1-year-old?",
    meta: "Booking.com · 28 Aug–1 Sep · Pool Access",
    lang: "English",
    draft: "",
    messages: [
      { who: "A. Ivanov", time: "07:56", side: "guest" as const, text: "Do you have a crib for a 1-year-old?" },
      { who: "AI Concierge", time: "07:57", side: "staff" as const, text: "Yes — a cot is free of charge and I have added it to your reservation. Housekeeping will set it up before check-in." },
      { who: "A. Ivanov", time: "07:58", side: "guest" as const, text: "Perfect, thank you." },
    ] as Msg[],
    context: [
      { k: "Reservation", v: "H24-8863" },
      { k: "Channel", v: "Booking.com" },
      { k: "Stay", v: "28 Aug–1 Sep · 4 nights" },
      { k: "Room", v: "Pool Access" },
      { k: "Balance", v: "Pay on arrival" },
      { k: "Note", v: "Cot requested · added" },
    ],
  },
  {
    id: "t4",
    name: "Tanaka Hiroshi",
    channel: "Agoda",
    time: "ย.",
    state: "Closed by AI",
    preview: "Breakfast hours? / 朝食の時間",
    meta: "Agoda · 25–29 Aug · Garden Deluxe",
    lang: "Japanese → Thai",
    draft: "",
    messages: [
      { who: "Tanaka Hiroshi", time: "22:14", side: "guest" as const, text: "朝食は何時からですか。" },
      { who: "AI Concierge", time: "22:14", side: "staff" as const, text: "朝食は 7:00〜10:30、ビーチ側のレストランでご用意しています。", sub: "Answered in Japanese, logged in Thai for staff." },
    ] as Msg[],
    context: [
      { k: "Reservation", v: "H24-8829" },
      { k: "Channel", v: "Agoda" },
      { k: "Stay", v: "25–29 Aug · 4 nights" },
      { k: "Room", v: "Garden Deluxe" },
      { k: "Balance", v: "Prepaid" },
      { k: "Language", v: "Japanese" },
    ],
  },
  {
    id: "t5",
    name: "ห้อง 209 · คำร้องเรียน",
    channel: "LINE",
    time: "06:30",
    state: "Escalated",
    preview: "แอร์ไม่เย็นทั้งคืน ขอย้ายห้องหรือคืนเงินบางส่วน",
    meta: "Direct · in house · Pool Access 209",
    lang: "Thai",
    draft: "",
    messages: [
      { who: "แขกห้อง 209", time: "06:24", side: "guest" as const, text: "แอร์ไม่เย็นทั้งคืน นอนไม่ได้เลยครับ ขอย้ายห้องหรือคืนเงินบางส่วนได้ไหม" },
      { who: "AI Concierge", time: "06:25", side: "ai" as const, text: "Compensation and refunds are outside AI authority — escalated to the duty manager and pushed to Owner Mode on LINE.", sub: "Maintenance ticket opened for 209 at 06:25." },
    ] as Msg[],
    context: [
      { k: "Reservation", v: "H24-8790" },
      { k: "Channel", v: "Direct" },
      { k: "Room", v: "209 · Pool Access" },
      { k: "Nights left", v: "2" },
      { k: "Paid", v: "฿7,440" },
      { k: "Risk", v: "Review score · repeat guest" },
    ],
  },
];

export const MAINTENANCE = [
  { no: "209", what: "Aircon not cooling", age: "3 h" },
  { no: "V2", what: "Pool light out", age: "1 d" },
  { no: "311", what: "Shower pressure", age: "2 d" },
];

export const PACE = [
  { d: "19", now: 88, last: 74 },
  { d: "20", now: 81, last: 70 },
  { d: "21", now: 88, last: 79 },
  { d: "22", now: 92, last: 86 },
  { d: "23", now: 90, last: 84 },
  { d: "24", now: 74, last: 66 },
  { d: "25", now: 68, last: 61 },
  { d: "26", now: 72, last: 64 },
  { d: "27", now: 79, last: 68 },
  { d: "28", now: 85, last: 72 },
  { d: "29", now: 91, last: 88 },
  { d: "30", now: 94, last: 90 },
  { d: "31", now: 88, last: 71 },
  { d: "1", now: 70, last: 58 },
];

export const PLACEMENTS = [
  { name: "LINE Official Account", url: "book.hotel24.co/baantalay?s=line", clicks: "1,204", bookings: "38", rn: "104", net: 212400 },
  { name: "Google Business Profile", url: "…?s=gbp", clicks: "941", bookings: "27", rn: "61", net: 141800 },
  { name: "Instagram bio", url: "…?s=ig", clicks: "612", bookings: "11", rn: "19", net: 46200 },
  { name: "TikTok", url: "…?s=tt", clicks: "388", bookings: "6", rn: "9", net: 21100 },
  { name: "QR · lobby, transfers, breakfast card", url: "…?s=qr", clicks: "176", bookings: "9", rn: "14", net: 22900 },
];

export const BENEFITS = [
  { id: "b1", text: "Breakfast for two included", textTh: "อาหารเช้า 2 ท่าน", cost: "Cost ฿180/night · vs 15% commission ฿330" },
  { id: "b2", text: "14:00 late checkout, guaranteed", textTh: "เช็คเอาท์ 14:00 รับประกัน", cost: "No cash cost when occupancy < 90%" },
  { id: "b3", text: "Free cancellation until 3 days before", textTh: "ยกเลิกฟรีก่อน 3 วัน", cost: "Matches OTA flexible rate" },
  { id: "b4", text: "Airport transfer at cost", textTh: "รถรับส่งสนามบินราคาทุน", cost: "Cost ฿800 · charged separately" },
];

export const TM30_SEED = [
  { id: "tm1", name: "Sofia Müller", nat: "Germany", doc: "C01X9F823 · exp 2031", arr: "19 Aug 11:00", dep: "22 Aug", ready: true, scanned: true, consent: "Booking form · 12 Jul" },
  { id: "tm2", name: "Marco Garcia", nat: "Spain", doc: "Scan pending", arr: "19 Aug 15:00", dep: "24 Aug", ready: false, scanned: false, consent: "Airbnb · 2 Aug" },
  { id: "tm3", name: "Rashid Al-Farsi", nat: "Oman", doc: "Scan pending", arr: "19 Aug 16:00", dep: "25 Aug", ready: false, scanned: false, consent: "Direct · 30 Jul" },
  { id: "tm4", name: "Katharina Weber", nat: "Austria", doc: "P4482911 · exp 2029", arr: "19 Aug 18:30", dep: "23 Aug", ready: true, scanned: true, consent: "Booking.com · 9 Aug" },
  { id: "tm5", name: "Lim Wei Jie", nat: "Singapore", doc: "E7719234 · exp 2033", arr: "19 Aug 21:10", dep: "21 Aug", ready: true, scanned: true, consent: "Agoda · 14 Aug" },
  { id: "tm6", name: "Tanaka Hiroshi", nat: "Japan", doc: "TK9920841 · exp 2030", arr: "25 Aug", dep: "29 Aug", ready: false, scanned: true, consent: "Agoda · 1 Aug" },
];

export const AUDIT_SEED = [
  { t: "19 Aug 09:12", who: "HOTEL24 · Channel Manager", what: "Agoda ARI push queued (retry 3)", kind: "system" },
  { t: "19 Aug 07:02", who: "AI Revenue Manager", what: "Proposed Garden Deluxe ฿2,200 → ฿2,550 · Sat–Sun", kind: "ai" },
  { t: "18 Aug 22:41", who: "som@baantalay", what: "Stop-sell Beach Villa 2BR — no reason recorded", kind: "manual" },
  { t: "18 Aug 23:01", who: "som@baantalay", what: "Reopened Beach Villa 2BR", kind: "manual" },
  { t: "18 Aug 16:20", who: "HOTEL24 · Overbooking Shield", what: "Family Loft / Expedia unmapped · 6 room-nights uncontrolled", kind: "shield" },
  { t: "18 Aug 14:08", who: "Channex white-label", what: "Imported Booking.com H24-8802 Müller 19–22 Aug", kind: "system" },
  { t: "18 Aug 11:44", who: "front@baantalay", what: "Walk-in Garden Deluxe 106 · PromptPay ฿2,200", kind: "manual" },
];

export const PLANS = [
  { name: "HOTEL24 Starter", who: "Up to 15 rooms", whoTh: "ไม่เกิน 15 ห้อง", price: "฿990–1,490 / month" },
  { name: "HOTEL24 Growth", who: "16–50 rooms", whoTh: "16–50 ห้อง", price: "฿2,490–3,490 / month" },
  { name: "HOTEL24 Pro", who: "51–100 rooms", whoTh: "51–100 ห้อง", price: "฿4,900–7,900 / month" },
  { name: "Multi-property", who: "Hotel and villa groups", whoTh: "กลุ่มโรงแรมและวิลล่า", price: "Custom" },
];

export const TODAY = "Wed 19 Aug 2026 · 09:12";
export const TODAY_TH = "พ. 19 ส.ค. 2569 · 09:12";
