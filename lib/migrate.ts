export type PmsSource = "cloudbeds" | "hotelier";
export type SwitchStatus = "idle" | "running" | "done";

export const PMS_SOURCES: Record<
  PmsSource,
  {
    id: PmsSource;
    name: string;
    maker: string;
    makerTh: string;
    note: string;
    noteTh: string;
    property: string;
    propertyId: string;
    rooms: number;
    types: number;
    rates: number;
    mappings: number;
    reservations: number;
    roomNights: number;
    guests: number;
    folios: number;
    deposits: number;
    hkOpen: number;
    historyYears: string;
  }
> = {
  cloudbeds: {
    id: "cloudbeds",
    name: "Cloudbeds",
    maker: "Cloudbeds PMS + myallocator",
    makerTh: "Cloudbeds PMS + myallocator",
    note: "Pulls rooms, rates, mappings, reservations, guests and folios through the Cloudbeds API. Channel manager stays live until HOTEL24 cuts over.",
    noteTh: "ดึงห้อง ราคา mapping การจอง แขก และโฟลิโอผ่าน Cloudbeds API ตัวจัดการช่องทางยังทำงานจนกว่า HOTEL24 จะตัดสลับ",
    property: "Baan Talay Boutique Resort",
    propertyId: "CB-384921",
    rooms: 42,
    types: 5,
    rates: 11,
    mappings: 9,
    reservations: 186,
    roomNights: 612,
    guests: 428,
    folios: 186,
    deposits: 186400,
    hkOpen: 7,
    historyYears: "24 months",
  },
  hotelier: {
    id: "hotelier",
    name: "Little Hotelier",
    maker: "Little Hotelier / SiteMinder",
    makerTh: "Little Hotelier / SiteMinder",
    note: "Pulls the Little Hotelier property, channel mappings and the SiteMinder reservation inbox. Direct-booking engine and extras come across as rate plans.",
    noteTh: "ดึงที่พัก Little Hotelier, mapping ช่องทาง และกล่องจอง SiteMinder หน้าจองตรงและสิทธิพิเศษถูกแปลงเป็นเรท",
    property: "Baan Talay Boutique Resort",
    propertyId: "LH-KRABI-041",
    rooms: 42,
    types: 5,
    rates: 8,
    mappings: 7,
    reservations: 154,
    roomNights: 498,
    guests: 301,
    folios: 154,
    deposits: 142200,
    hkOpen: 5,
    historyYears: "18 months",
  },
};

export const SWITCH_STEPS = [
  {
    id: "connect",
    en: "Connect the old PMS",
    th: "เชื่อมระบบเดิม",
    detail: "Read-only API. Nothing writes back until you cut over.",
    detailTh: "อ่านอย่างเดียว ยังไม่เขียนกลับจนกว่าจะตัดสลับ",
    audit: "Opened read-only session on the source PMS",
  },
  {
    id: "rooms",
    en: "Rooms and room types",
    th: "ห้องและประเภทห้อง",
    detail: "Physical rooms, types, occupancy and amenities.",
    detailTh: "ห้องจริง ประเภท จำนวนคน และสิ่งอำนวยความสะดวก",
    audit: "Imported room types and physical rooms",
  },
  {
    id: "rates",
    en: "Rates and restrictions",
    th: "ราคาและข้อจำกัด",
    detail: "Seasonal rates, min-stay, CTA/CTD, stop-sell.",
    detailTh: "ราคาตามฤดูกาล ขั้นต่ำ CTA/CTD ปิดขาย",
    audit: "Imported rate plans and restrictions",
  },
  {
    id: "maps",
    en: "OTA channel mappings",
    th: "mapping ช่องทาง OTA",
    detail: "Room × rate plan on Booking.com, Agoda, Expedia, Airbnb.",
    detailTh: "ห้อง × เรทบน Booking.com, Agoda, Expedia, Airbnb",
    audit: "Imported OTA room and rate mappings",
  },
  {
    id: "res",
    en: "Reservations",
    th: "การจอง",
    detail: "In-house, arrivals, future 90 days, cancellations.",
    detailTh: "แขกในโรงแรม แขกเข้า อนาคต 90 วัน และการยกเลิก",
    audit: "Imported reservations (in-house, future, cancelled)",
  },
  {
    id: "guests",
    en: "Guest profiles",
    th: "ประวัติแขก",
    detail: "Names, documents, stay history, LINE / email.",
    detailTh: "ชื่อ เอกสาร ประวัติเข้าพัก LINE / อีเมล",
    audit: "Imported guest profiles and stay history",
  },
  {
    id: "folios",
    en: "Folios, deposits, payments",
    th: "โฟลิโอ มัดจำ การชำระ",
    detail: "Open balances, PromptPay / card / cash, refunds.",
    detailTh: "ยอดค้าง PromptPay / บัตร / เงินสด คืนเงิน",
    audit: "Imported folios, deposits and payment records",
  },
  {
    id: "shield",
    en: "Overbooking Shield check",
    th: "ตรวจด้วย Overbooking Shield",
    detail: "Duplicates, unmapped rooms, conflicting inventory.",
    detailTh: "จองซ้ำ ห้องยังไม่ map จำนวนห้องขัดกัน",
    audit: "Shield scanned the imported inventory",
  },
  {
    id: "cut",
    en: "Cut over — HOTEL24 is live",
    th: "ตัดสลับ — HOTEL24 เป็นระบบจริง",
    detail: "Channel manager points here. Validate Booking/Agoda/Expedia inventory, then the old PMS goes read-only.",
    detailTh: "ตัวจัดการช่องทางชี้มาที่นี่ ตรวจห้องบน Booking/Agoda/Expedia แล้วระบบเดิมเป็นโหมดอ่านอย่างเดียว",
    audit: "Cut over complete — HOTEL24 is the system of record · ARI writes from HOTEL24",
  },
];

export const SWITCH_SAMPLE = {
  cloudbeds: [
    { kind: "Room type", item: "Garden Deluxe × 14", src: "Cloudbeds room type 104–118" },
    { kind: "Rate plan", item: "BAR / Non-ref / Breakfast", src: "Cloudbeds rate plans 3" },
    { kind: "Mapping", item: "Deluxe Garden View — Booking.com", src: "myallocator map #BKG-DLX" },
    { kind: "Reservation", item: "H24-8802 Müller 19–22 Aug", src: "Cloudbeds res 7F92A1" },
    { kind: "Reservation", item: "H24-8841 ชัยวัฒน์ 22–25 Aug", src: "Cloudbeds res 7F94C2 · direct" },
    { kind: "Guest", item: "Sofia Müller · DE · passport on file", src: "Cloudbeds guest 22911" },
    { kind: "Folio", item: "Al-Farsi deposit ฿12,400 open", src: "Cloudbeds folio 8841" },
  ],
  hotelier: [
    { kind: "Room type", item: "Garden Deluxe × 14", src: "Little Hotelier room type Deluxe" },
    { kind: "Rate plan", item: "Standard / Flexible", src: "Little Hotelier rate 2" },
    { kind: "Mapping", item: "Pool Access — Agoda", src: "SiteMinder map AG-POOL" },
    { kind: "Reservation", item: "H24-8802 Müller 19–22 Aug", src: "LH res LH-104821" },
    { kind: "Reservation", item: "H24-8850 Garcia 19–24 Aug", src: "LH res LH-104902 · Airbnb" },
    { kind: "Guest", item: "Marco Garcia · ES · scan pending", src: "Little Hotelier guest" },
    { kind: "Folio", item: "Weber prepaid ฿13,600", src: "LH invoice LH-INV-331" },
  ],
};

export const SWITCH_FLAGS = {
  cloudbeds: [
    { sev: "Medium", text: "Family Loft is unmapped on Expedia in Cloudbeds too — Shield will keep it closed tonight.", textTh: "แฟมิลี่ลอฟท์ยังไม่ map บน Expedia ใน Cloudbeds เช่นกัน — Shield จะปิดคืนนี้ไว้" },
    { sev: "Low", text: "12 guest emails are missing. Concierge will still match on reservation number.", textTh: "อีเมลแขกหาย 12 ราย Concierge ยังจับคู่ด้วยเลขการจองได้" },
  ],
  hotelier: [
    { sev: "Medium", text: "Little Hotelier held 2 rate plans as ‘hotel collect’ with no tax split — HOTEL24 tagged them for Finance.", textTh: "Little Hotelier มีเรท hotel collect 2 รายการที่ยังไม่แยกภาษี — HOTEL24 ติดป้ายให้การเงิน" },
    { sev: "Low", text: "Housekeeping statuses were not in Little Hotelier. Rooms default to Inspect until the board is walked.", textTh: "Little Hotelier ไม่มีสถานะแม่บ้าน ห้องถูกตั้งเป็นรอตรวจจนกว่าจะเดินตรวจ" },
  ],
};
