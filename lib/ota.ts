/** White-label channel manager — HOTEL24 stays the system of record. */

export type OtaId =
  | "booking"
  | "agoda"
  | "expedia"
  | "airbnb"
  | "trip"
  | "google"
  | "hotelbeds"
  | "klook"
  | "traveloka";

export type ConnStatus = "connected" | "connect" | "pending" | "paused";
export type JobKind = "ARI" | "RES" | "MAP" | "ACK";
export type JobStatus = "queued" | "retry" | "complete" | "failed" | "stale";
export type ResEvent = "NEW" | "MODIFIED" | "CANCELLED" | "NO SHOW";
export type PayKind = "Pay at Hotel" | "OTA Collect" | "Hotel Collect" | "VCC token" | "Deposit" | "Prepayment";
export type ConnectorVendor = "channex" | "staah" | "derbysoft";

export type OtaChannel = {
  id: OtaId;
  name: string;
  phase: 1 | 2 | 3;
  status: ConnStatus;
  health: number;
  lastSync: string;
  roomsMapped: number;
  roomsTotal: number;
  ratesMapped: number;
  ratesTotal: number;
  inventory: boolean;
  rates: boolean;
  restrictions: boolean;
  reservations: boolean;
  lastBooking: string;
  lastBookingAt: string;
  note: string;
  noteTh: string;
  pendingUpdates: number;
};

export type OTAConnector = {
  vendor: ConnectorVendor;
  createProperty(propertyId: string): string;
  createRoomType(roomId: string): string;
  createRatePlan(rateId: string): string;
  pushAvailability(roomId: string, date: string, avail: number): string;
  pushRates(roomId: string, date: string, rate: number): string;
  pushRestrictions(roomId: string, date: string, minStay: number, cta: boolean, ctd: boolean, stop: boolean): string;
  getReservation(otaResId: string): string;
  acknowledgeReservation(otaResId: string): string;
  getChannels(): OtaId[];
  connectChannel(id: OtaId): string;
  mapRoom(roomId: string, ota: OtaId, remote: string): string;
  mapRate(rateId: string, ota: OtaId, remote: string): string;
  getSyncStatus(id: OtaId): string;
};

export class ChannexConnector implements OTAConnector {
  vendor: ConnectorVendor = "channex";
  createProperty(propertyId: string) {
    return `channex.properties.create ${propertyId}`;
  }
  createRoomType(roomId: string) {
    return `channex.room_types.create ${roomId}`;
  }
  createRatePlan(rateId: string) {
    return `channex.rate_plans.create ${rateId}`;
  }
  pushAvailability(roomId: string, date: string, avail: number) {
    return `channex.ari.availability ${roomId} ${date}=${avail} (batched)`;
  }
  pushRates(roomId: string, date: string, rate: number) {
    return `channex.ari.rates ${roomId} ${date}=${rate} (batched)`;
  }
  pushRestrictions(roomId: string, date: string, minStay: number, cta: boolean, ctd: boolean, stop: boolean) {
    return `channex.ari.restrictions ${roomId} ${date} min=${minStay} cta=${cta ? 1 : 0} ctd=${ctd ? 1 : 0} stop=${stop ? 1 : 0}`;
  }
  getReservation(otaResId: string) {
    return `channex.bookings.get ${otaResId}`;
  }
  acknowledgeReservation(otaResId: string) {
    return `channex.bookings.ack ${otaResId}`;
  }
  getChannels(): OtaId[] {
    return OTA_CHANNELS.map((c) => c.id);
  }
  connectChannel(id: OtaId) {
    return `channex.channels.connect ${id}`;
  }
  mapRoom(roomId: string, ota: OtaId, remote: string) {
    return `channex.mapping.room ${roomId} → ${ota}:${remote}`;
  }
  mapRate(rateId: string, ota: OtaId, remote: string) {
    return `channex.mapping.rate ${rateId} → ${ota}:${remote}`;
  }
  getSyncStatus(id: OtaId) {
    return `channex.sync.status ${id}`;
  }
}

export const activeConnector: OTAConnector = new ChannexConnector();

export const CONNECTORS: {
  vendor: ConnectorVendor;
  name: string;
  fit: 3 | 4 | 5;
  role: string;
  roleTh: string;
  status: "active" | "quote" | "future";
  note: string;
  noteTh: string;
}[] = [
  {
    vendor: "channex",
    name: "Channex",
    fit: 5,
    role: "Active white-label — HOTEL24 builds against this first",
    roleTh: "white-label ที่ใช้จริง — HOTEL24 สร้างบนตัวนี้ก่อน",
    status: "active",
    note: "API-first, does not sell to hotels. 61+ channels including Booking.com, Agoda, Expedia, Trip.com and Airbnb. HOTEL24 keeps the hotel relationship.",
    noteTh: "API-first ไม่ขายตรงให้โรงแรม มี 61+ ช่องทาง รวม Booking.com, Agoda, Expedia, Trip.com, Airbnb HOTEL24 เป็นเจ้าของความสัมพันธ์กับโรงแรม",
  },
  {
    vendor: "staah",
    name: "STAAH Su",
    fit: 4,
    role: "Private-label quote — Mapping API / iFrame, 200+ channels",
    roleTh: "ขอใบเสนอราคา private-label — Mapping API / iFrame, 200+ ช่องทาง",
    status: "quote",
    note: "Commercial comparison only. Same OTAConnector interface. Not live in this demo.",
    noteTh: "เทียบเชิงพาณิชย์เท่านั้น ใช้ interface เดียวกัน ยังไม่ต่อในเดโมนี้",
  },
  {
    vendor: "derbysoft",
    name: "DerbySoft",
    fit: 3,
    role: "Future enterprise — GDS / TMC / wholesale, 500+ channels",
    roleTh: "อนาคตองค์กร — GDS / TMC / wholesale, 500+ ช่องทาง",
    status: "future",
    note: "Keep for chains and international distribution. StaahConnector / DerbySoftConnector can replace ChannexConnector without rewriting PMS.",
    noteTh: "เก็บไว้สำหรับเชนและการกระจายต่างประเทศ เปลี่ยน connector ได้โดยไม่ต้องเขียน PMS ใหม่",
  },
];

export const RATE_PLANS = [
  { id: "bar", en: "BAR / Room Only", th: "ราคาห้องเปล่า", refundable: true },
  { id: "bf", en: "Breakfast", th: "รวมอาหารเช้า", refundable: true },
  { id: "nr", en: "Non-refundable", th: "ไม่คืนเงิน", refundable: false },
  { id: "promo", en: "Promotion", th: "โปรโมชัน", refundable: true },
];

export const PHYSICAL_ROOMS: { no: string; type: string; ooo: boolean; note: string; noteTh: string }[] = [
  { no: "101", type: "garden", ooo: false, note: "Assigned Müller", noteTh: "จัดให้ Müller" },
  { no: "102", type: "garden", ooo: false, note: "Cleaning", noteTh: "กำลังทำความสะอาด" },
  { no: "104", type: "garden", ooo: false, note: "Departed 09:40", noteTh: "ออก 09:40" },
  { no: "106", type: "garden", ooo: false, note: "Sellable", noteTh: "พร้อมขาย" },
  { no: "108", type: "garden", ooo: false, note: "Inspect", noteTh: "รอตรวจ" },
  { no: "201", type: "pool", ooo: false, note: "Occupied Lim", noteTh: "มีแขก Lim" },
  { no: "204", type: "pool", ooo: false, note: "Inspect", noteTh: "รอตรวจ" },
  { no: "207", type: "pool", ooo: false, note: "Arrival 14:20", noteTh: "เข้า 14:20" },
  { no: "209", type: "pool", ooo: true, note: "Aircon — maintenance", noteTh: "แอร์ — ซ่อมบำรุง" },
  { no: "301", type: "suite", ooo: false, note: "Sellable", noteTh: "พร้อมขาย" },
  { no: "305", type: "loft", ooo: false, note: "Weber tonight", noteTh: "Weber คืนนี้" },
  { no: "V2", type: "villa", ooo: false, note: "Al-Farsi", noteTh: "Al-Farsi" },
];

export const OTA_CHANNELS: OtaChannel[] = [
  {
    id: "booking",
    name: "Booking.com",
    phase: 1,
    status: "connected",
    health: 100,
    lastSync: "23:14:32",
    roomsMapped: 5,
    roomsTotal: 5,
    ratesMapped: 9,
    ratesTotal: 9,
    inventory: true,
    rates: true,
    restrictions: true,
    reservations: true,
    lastBooking: "BK-92827193",
    lastBookingAt: "22:58",
    note: "Reservations, modifications and cancellations flowing.",
    noteTh: "การจอง แก้ไข และยกเลิกไหลเข้าแล้ว",
    pendingUpdates: 0,
  },
  {
    id: "agoda",
    name: "Agoda",
    phase: 1,
    status: "connected",
    health: 94,
    lastSync: "11 min ago",
    roomsMapped: 5,
    roomsTotal: 5,
    ratesMapped: 7,
    ratesTotal: 9,
    inventory: true,
    rates: true,
    restrictions: true,
    reservations: true,
    lastBooking: "AG-441902",
    lastBookingAt: "21:10",
    note: "3 rate updates pending. Usual round trip is 40 seconds.",
    noteTh: "รออัปเดตราคา 3 รายการ ปกติไป-กลับ 40 วินาที",
    pendingUpdates: 3,
  },
  {
    id: "expedia",
    name: "Expedia",
    phase: 1,
    status: "connected",
    health: 88,
    lastSync: "4 min ago",
    roomsMapped: 4,
    roomsTotal: 5,
    ratesMapped: 6,
    ratesTotal: 8,
    inventory: false,
    rates: true,
    restrictions: true,
    reservations: true,
    lastBooking: "EX-104821",
    lastBookingAt: "yesterday",
    note: "Family Loft unmapped — inventory not controlled.",
    noteTh: "แฟมิลี่ลอฟท์ยังไม่ map — ควบคุมห้องไม่ได้",
    pendingUpdates: 0,
  },
  {
    id: "airbnb",
    name: "Airbnb",
    phase: 2,
    status: "connected",
    health: 100,
    lastSync: "6 min ago",
    roomsMapped: 3,
    roomsTotal: 5,
    ratesMapped: 3,
    ratesTotal: 4,
    inventory: true,
    rates: true,
    restrictions: true,
    reservations: true,
    lastBooking: "AB-8850",
    lastBookingAt: "18 Aug",
    note: "Villas and suites listed as entire units.",
    noteTh: "วิลล่าและสวีทลงเป็นทั้งยูนิต",
    pendingUpdates: 0,
  },
  {
    id: "trip",
    name: "Trip.com",
    phase: 2,
    status: "pending",
    health: 0,
    lastSync: "—",
    roomsMapped: 1,
    roomsTotal: 5,
    ratesMapped: 1,
    ratesTotal: 4,
    inventory: false,
    rates: false,
    restrictions: false,
    reservations: false,
    lastBooking: "—",
    lastBookingAt: "—",
    note: "Onboarding through the white-label provider · est. 2 weeks, or connect now in this demo.",
    noteTh: "รอ onboarding ผ่านผู้ให้บริการ connectivity · ประมาณ 2 สัปดาห์ หรือกดเชื่อมในเดโมนี้",
    pendingUpdates: 0,
  },
  {
    id: "google",
    name: "Google Hotels",
    phase: 2,
    status: "connect",
    health: 0,
    lastSync: "—",
    roomsMapped: 0,
    roomsTotal: 5,
    ratesMapped: 0,
    ratesTotal: 4,
    inventory: false,
    rates: false,
    restrictions: false,
    reservations: false,
    lastBooking: "—",
    lastBookingAt: "—",
    note: "Phase 2. Free listing after Booking.com / Agoda / Expedia are live.",
    noteTh: "เฟส 2 เปิดหลัง Booking.com / Agoda / Expedia ทำงาน",
    pendingUpdates: 0,
  },
  {
    id: "hotelbeds",
    name: "Hotelbeds",
    phase: 3,
    status: "connect",
    health: 0,
    lastSync: "—",
    roomsMapped: 0,
    roomsTotal: 5,
    ratesMapped: 0,
    ratesTotal: 4,
    inventory: false,
    rates: false,
    restrictions: false,
    reservations: false,
    lastBooking: "—",
    lastBookingAt: "—",
    note: "Phase 3 wholesale / B2B.",
    noteTh: "เฟส 3 ขายส่ง / B2B",
    pendingUpdates: 0,
  },
  {
    id: "klook",
    name: "Klook",
    phase: 3,
    status: "connect",
    health: 0,
    lastSync: "—",
    roomsMapped: 0,
    roomsTotal: 5,
    ratesMapped: 0,
    ratesTotal: 4,
    inventory: false,
    rates: false,
    restrictions: false,
    reservations: false,
    lastBooking: "—",
    lastBookingAt: "—",
    note: "Phase 3 regional demand.",
    noteTh: "เฟส 3 ดีมานด์ภูมิภาค",
    pendingUpdates: 0,
  },
  {
    id: "traveloka",
    name: "Traveloka",
    phase: 3,
    status: "connect",
    health: 0,
    lastSync: "—",
    roomsMapped: 0,
    roomsTotal: 5,
    ratesMapped: 0,
    ratesTotal: 4,
    inventory: false,
    rates: false,
    restrictions: false,
    reservations: false,
    lastBooking: "—",
    lastBookingAt: "—",
    note: "Phase 3 SEA.",
    noteTh: "เฟส 3 เอเชียตะวันออกเฉียงใต้",
    pendingUpdates: 0,
  },
];

export const ROOM_MAPS = [
  {
    roomId: "garden",
    hotel24: "Garden Deluxe",
    booking: "Deluxe Garden View",
    agoda: "Deluxe Garden",
    expedia: "Deluxe Room",
    airbnb: "—",
    trip: "Garden Deluxe",
  },
  {
    roomId: "pool",
    hotel24: "Pool Access",
    booking: "Pool Access Room",
    agoda: "Pool Access",
    expedia: "Pool Access",
    airbnb: "—",
    trip: "Pool Access",
  },
  {
    roomId: "suite",
    hotel24: "Sea View Suite",
    booking: "Sea View Suite",
    agoda: "Ocean Suite",
    expedia: "Suite Sea View",
    airbnb: "Sea View Suite (entire unit)",
    trip: "Sea View Suite",
  },
  {
    roomId: "loft",
    hotel24: "Family Loft",
    booking: "Family Loft",
    agoda: "Family Loft",
    expedia: "",
    airbnb: "—",
    trip: "Family Loft (draft)",
  },
  {
    roomId: "villa",
    hotel24: "Beach Villa 2BR",
    booking: "Two-Bedroom Beach Villa",
    agoda: "Two-Bedroom Beach Villa",
    expedia: "Beach Villa 2BR",
    airbnb: "Beach Villa (entire home)",
    trip: "Two-Bedroom Villa (draft)",
  },
];

export const RATE_MAPS = [
  { id: "bar", hotel24: "BAR / Room Only", booking: "Standard", agoda: "Flexible", expedia: "Best Available", airbnb: "Nightly", trip: "Retail" },
  { id: "bf", hotel24: "Breakfast", booking: "Breakfast included", agoda: "Breakfast included", expedia: "Breakfast", airbnb: "—", trip: "Breakfast" },
  { id: "nr", hotel24: "Non-refundable", booking: "Non Refundable", agoda: "Saver", expedia: "Non Refund", airbnb: "Non-refund", trip: "Non-refund" },
  { id: "promo", hotel24: "Promotion", booking: "Secret deal", agoda: "Agoda Special", expedia: "Member rate", airbnb: "—", trip: "Promo" },
];

export const MAP_CHANNELS = ["booking", "agoda", "expedia", "airbnb", "trip"] as const;
export type MapChannel = (typeof MAP_CHANNELS)[number];

export type AriRow = {
  date: string;
  dow: string;
  total: number;
  occupied: number;
  maint: number;
  avail: number;
  rate: number;
  minStay: number;
  maxStay: number;
  cta: boolean;
  ctd: boolean;
  stop: boolean;
  closed: boolean;
};

export const ARI_BY_TYPE: Record<string, AriRow[]> = {
  garden: [
    { date: "19 Aug", dow: "WED", total: 14, occupied: 11, maint: 0, avail: 3, rate: 2200, minStay: 1, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
    { date: "20 Aug", dow: "THU", total: 14, occupied: 11, maint: 0, avail: 3, rate: 2500, minStay: 1, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
    { date: "21 Aug", dow: "FRI", total: 14, occupied: 12, maint: 0, avail: 2, rate: 2800, minStay: 2, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
    { date: "22 Aug", dow: "SAT", total: 14, occupied: 12, maint: 1, avail: 1, rate: 2550, minStay: 2, maxStay: 14, cta: true, ctd: false, stop: false, closed: false },
    { date: "23 Aug", dow: "SUN", total: 14, occupied: 11, maint: 0, avail: 3, rate: 2550, minStay: 2, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
    { date: "24 Aug", dow: "MON", total: 14, occupied: 8, maint: 1, avail: 5, rate: 1980, minStay: 1, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
    { date: "25 Aug", dow: "TUE", total: 14, occupied: 7, maint: 0, avail: 7, rate: 1980, minStay: 1, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
  ],
  pool: [
    { date: "19 Aug", dow: "WED", total: 10, occupied: 8, maint: 1, avail: 1, rate: 2900, minStay: 1, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
    { date: "20 Aug", dow: "THU", total: 10, occupied: 8, maint: 1, avail: 1, rate: 2900, minStay: 1, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
    { date: "21 Aug", dow: "FRI", total: 10, occupied: 9, maint: 0, avail: 1, rate: 2900, minStay: 2, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
    { date: "22 Aug", dow: "SAT", total: 10, occupied: 9, maint: 0, avail: 1, rate: 3300, minStay: 2, maxStay: 14, cta: false, ctd: true, stop: false, closed: false },
    { date: "23 Aug", dow: "SUN", total: 10, occupied: 8, maint: 0, avail: 2, rate: 3300, minStay: 2, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
    { date: "24 Aug", dow: "MON", total: 10, occupied: 6, maint: 0, avail: 4, rate: 2900, minStay: 2, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
    { date: "25 Aug", dow: "TUE", total: 10, occupied: 5, maint: 0, avail: 5, rate: 2900, minStay: 2, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
  ],
  suite: [
    { date: "19 Aug", dow: "WED", total: 8, occupied: 4, maint: 0, avail: 4, rate: 3784, minStay: 1, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
    { date: "20 Aug", dow: "THU", total: 8, occupied: 5, maint: 0, avail: 3, rate: 4300, minStay: 1, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
    { date: "21 Aug", dow: "FRI", total: 8, occupied: 5, maint: 0, avail: 3, rate: 4300, minStay: 1, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
    { date: "22 Aug", dow: "SAT", total: 8, occupied: 6, maint: 0, avail: 2, rate: 4800, minStay: 1, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
    { date: "23 Aug", dow: "SUN", total: 8, occupied: 6, maint: 0, avail: 2, rate: 4800, minStay: 1, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
    { date: "24 Aug", dow: "MON", total: 8, occupied: 4, maint: 0, avail: 4, rate: 4300, minStay: 1, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
    { date: "25 Aug", dow: "TUE", total: 8, occupied: 3, maint: 0, avail: 5, rate: 4300, minStay: 1, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
  ],
  loft: [
    { date: "19 Aug", dow: "WED", total: 6, occupied: 4, maint: 0, avail: 2, rate: 3400, minStay: 1, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
    { date: "20 Aug", dow: "THU", total: 6, occupied: 5, maint: 0, avail: 1, rate: 3400, minStay: 1, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
    { date: "21 Aug", dow: "FRI", total: 6, occupied: 5, maint: 0, avail: 1, rate: 3400, minStay: 1, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
    { date: "22 Aug", dow: "SAT", total: 6, occupied: 5, maint: 0, avail: 1, rate: 3900, minStay: 1, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
    { date: "23 Aug", dow: "SUN", total: 6, occupied: 4, maint: 0, avail: 2, rate: 3900, minStay: 1, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
    { date: "24 Aug", dow: "MON", total: 6, occupied: 3, maint: 0, avail: 3, rate: 3400, minStay: 1, maxStay: 14, cta: false, ctd: false, stop: true, closed: false },
    { date: "25 Aug", dow: "TUE", total: 6, occupied: 3, maint: 0, avail: 3, rate: 3400, minStay: 1, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
  ],
  villa: [
    { date: "19 Aug", dow: "WED", total: 4, occupied: 3, maint: 0, avail: 1, rate: 8900, minStay: 3, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
    { date: "20 Aug", dow: "THU", total: 4, occupied: 3, maint: 0, avail: 1, rate: 8900, minStay: 3, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
    { date: "21 Aug", dow: "FRI", total: 4, occupied: 3, maint: 0, avail: 1, rate: 8900, minStay: 3, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
    { date: "22 Aug", dow: "SAT", total: 4, occupied: 3, maint: 0, avail: 1, rate: 9800, minStay: 3, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
    { date: "23 Aug", dow: "SUN", total: 4, occupied: 2, maint: 0, avail: 2, rate: 9800, minStay: 3, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
    { date: "24 Aug", dow: "MON", total: 4, occupied: 2, maint: 0, avail: 2, rate: 8900, minStay: 3, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
    { date: "25 Aug", dow: "TUE", total: 4, occupied: 1, maint: 0, avail: 3, rate: 8900, minStay: 3, maxStay: 14, cta: false, ctd: false, stop: false, closed: false },
  ],
};

export type SyncJob = {
  id: string;
  kind: JobKind;
  channel: string;
  payload: string;
  payloadTh: string;
  status: JobStatus;
  attempts: number;
  age: string;
};

export const QUEUE_SEED: SyncJob[] = [
  {
    id: "q1",
    kind: "ARI",
    channel: "Agoda",
    payload: "Garden Deluxe 20–25 Aug rates + availability",
    payloadTh: "ดีลักซ์สวน 20–25 ส.ค. ราคาและความว่าง",
    status: "retry",
    attempts: 3,
    age: "11 min",
  },
  {
    id: "q2",
    kind: "ARI",
    channel: "Booking.com",
    payload: "Weekend BAR ฿2,550 · batched",
    payloadTh: "BAR สุดสัปดาห์ ฿2,550 · รวมชุด",
    status: "complete",
    attempts: 1,
    age: "2 min",
  },
  {
    id: "q3",
    kind: "RES",
    channel: "Booking.com",
    payload: "NEW BK-92827193 Müller 19–22 Aug",
    payloadTh: "จองใหม่ BK-92827193 Müller 19–22 ส.ค.",
    status: "complete",
    attempts: 1,
    age: "16 min",
  },
  {
    id: "q4",
    kind: "ARI",
    channel: "Trip.com",
    payload: "Garden Deluxe 20 Aug availability = 3",
    payloadTh: "ดีลักซ์สวน 20 ส.ค. ว่าง = 3",
    status: "stale",
    attempts: 1,
    age: "held",
  },
  {
    id: "q5",
    kind: "MAP",
    channel: "Expedia",
    payload: "Family Loft still unmapped",
    payloadTh: "แฟมิลี่ลอฟท์ยังไม่ map",
    status: "failed",
    attempts: 1,
    age: "2 days",
  },
];

export type InboundRes = {
  id: string;
  otaId: string;
  channel: string;
  event: ResEvent;
  guest: string;
  room: string;
  rate: string;
  checkIn: string;
  checkOut: string;
  price: number;
  tax: number;
  commission: number;
  pay: PayKind;
  status: string;
  statusTh: string;
};

export const INBOUND_SEED: InboundRes[] = [
  {
    id: "H24-8802",
    otaId: "BK-92827193",
    channel: "Booking.com",
    event: "NEW",
    guest: "Sofia Müller",
    room: "Garden Deluxe",
    rate: "BAR",
    checkIn: "19 Aug",
    checkOut: "22 Aug",
    price: 7650,
    tax: 535,
    commission: 1148,
    pay: "OTA Collect",
    status: "Confirmed · inventory reduced",
    statusTh: "ยืนยันแล้ว · ตัดห้องแล้ว",
  },
  {
    id: "H24-8833",
    otaId: "BK-8833104",
    channel: "Booking.com",
    event: "NEW",
    guest: "Katharina Weber",
    room: "Family Loft",
    rate: "Breakfast",
    checkIn: "20 Aug",
    checkOut: "22 Aug",
    price: 13600,
    tax: 952,
    commission: 2040,
    pay: "OTA Collect",
    status: "Modification pending from Booking.com",
    statusTh: "รอแก้ไขจาก Booking.com",
  },
  {
    id: "H24-8860",
    otaId: "AG-441902",
    channel: "Agoda",
    event: "NEW",
    guest: "Lim Wei Jie",
    room: "Pool Access",
    rate: "BAR",
    checkIn: "19 Aug",
    checkOut: "21 Aug",
    price: 5800,
    tax: 406,
    commission: 986,
    pay: "VCC token",
    status: "Prepaid · token only, no PAN stored",
    statusTh: "ชำระแล้ว · เก็บโทเคน ไม่เก็บเลขบัตร",
  },
  {
    id: "H24-8818",
    otaId: "DIR-8818",
    channel: "HOTEL24 Direct",
    event: "NEW",
    guest: "Rashid Al-Farsi",
    room: "Beach Villa 2BR",
    rate: "Breakfast",
    checkIn: "19 Aug",
    checkOut: "25 Aug",
    price: 53400,
    tax: 3738,
    commission: 0,
    pay: "Deposit",
    status: "Hotel collect · PromptPay deposit ฿12,400",
    statusTh: "โรงแรมเก็บ · มัดจำ PromptPay ฿12,400",
  },
];

export const WEBHOOK_NEW: InboundRes = {
  id: "H24-9108",
  otaId: "AG-9108841",
  channel: "Agoda",
  event: "NEW",
  guest: "Park Ji-woo",
  room: "Garden Deluxe",
  rate: "Non-refundable",
  checkIn: "24 Aug",
  checkOut: "26 Aug",
  price: 3960,
  tax: 277,
  commission: 673,
  pay: "VCC token",
  status: "Webhook received · inventory reduced · ARI queued",
  statusTh: "รับ webhook แล้ว · ตัดห้อง · คิว ARI",
};

export const PAY_KINDS: { id: PayKind; en: string; th: string; pci: string; pciTh: string }[] = [
  { id: "Pay at Hotel", en: "Pay at Hotel", th: "จ่ายที่โรงแรม", pci: "PromptPay / cash at desk. No card data in HOTEL24.", pciTh: "PromptPay / เงินสดที่เคาน์เตอร์ ไม่เก็บข้อมูลบัตรใน HOTEL24" },
  { id: "OTA Collect", en: "OTA Collect", th: "OTA เก็บเงิน", pci: "OTA remits net. HOTEL24 stores amount and commission only.", pciTh: "OTA โอนสุทธิ HOTEL24 เก็บยอดและค่าคอมเท่านั้น" },
  { id: "Hotel Collect", en: "Hotel Collect", th: "โรงแรมเก็บเงิน", pci: "Charge at stay. Tokenised terminal — never raw PAN.", pciTh: "เก็บตอนเข้าพัก เครื่องรูดแบบโทเคน — ไม่เก็บเลขบัตรดิบ" },
  { id: "VCC token", en: "Virtual card (token)", th: "บัตรเสมือน (โทเคน)", pci: "Expedia/Agoda VCC via payment gateway. Token only.", pciTh: "VCC จาก Expedia/Agoda ผ่านเกตเวย์ เก็บโทเคนอย่างเดียว" },
  { id: "Deposit", en: "Deposit", th: "มัดจำ", pci: "Partial prepay. Remainder at hotel.", pciTh: "มัดจำบางส่วน ที่เหลือจ่ายที่โรงแรม" },
  { id: "Prepayment", en: "Prepayment", th: "ชำระล่วงหน้า", pci: "Full prepay. Receipt in Finance. No PAN.", pciTh: "ชำระเต็ม ใบเสร็จอยู่ที่การเงิน ไม่มีเลขบัตร" },
];

export const RECONCILE_SEED = [
  { channel: "Booking.com", expected: 3, actual: 3, ok: true },
  { channel: "Agoda", expected: 3, actual: 3, ok: true },
  { channel: "Expedia", expected: 3, actual: 3, ok: true },
  { channel: "Trip.com", expected: 3, actual: 2, ok: false },
];

export function cloneChannels(): OtaChannel[] {
  return OTA_CHANNELS.map((c) => ({ ...c }));
}

export function cloneRoomMaps() {
  return ROOM_MAPS.map((r) => ({ ...r }));
}

export function cloneRateMaps() {
  return RATE_MAPS.map((r) => ({ ...r }));
}

export function cloneQueue(): SyncJob[] {
  return QUEUE_SEED.map((j) => ({ ...j }));
}

export function cloneInbound(): InboundRes[] {
  return INBOUND_SEED.map((r) => ({ ...r }));
}

export function cloneAri(): Record<string, AriRow[]> {
  const next: Record<string, AriRow[]> = {};
  for (const key of Object.keys(ARI_BY_TYPE)) {
    next[key] = ARI_BY_TYPE[key].map((r) => ({ ...r }));
  }
  return next;
}

export function healthTone(n: number, status: ConnStatus) {
  if (status === "connect" || status === "pending") return "off";
  if (status === "paused" || n < 95) return "warn";
  return "ok";
}

export function jobLabel(s: JobStatus) {
  if (s === "complete") return "Complete";
  if (s === "retry") return "Retry";
  if (s === "stale") return "Stale";
  if (s === "failed") return "Failed";
  return "Queued";
}
