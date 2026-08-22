/** Hotel Agent Protocol (HAP) — HOTEL24 Agent Direct.
 *  Open spec on top of Schema.org, MCP, ACP and UCP.
 *  HOTEL24 stays the merchant of record. OTAs are one channel, not the centre.
 */

export const HAP_VERSION = "0.1.0";
export const HAP_SPEC = "https://hotel24.local/hap";

export type HapToolName =
  | "search_hotels"
  | "search_availability"
  | "get_room_types"
  | "get_live_rate"
  | "get_direct_offer"
  | "get_cancellation_policy"
  | "compare_rooms"
  | "create_room_hold"
  | "create_booking"
  | "modify_booking"
  | "cancel_booking"
  | "get_directions"
  | "get_facilities"
  | "ask_hotel"
  | "get_hotel_identity";

export type HapRoom = {
  id: string;
  en: string;
  th: string;
  occupancy: number;
  rate: number;
  agodaRate: number;
  avail: number;
  refundable: boolean;
  photo: string;
};

export function mapEmbed(lat: number, lng: number, span = 0.012) {
  return `https://www.openstreetmap.org/export/embed.html?bbox=${lng - span},${lat - span},${lng + span},${lat + span}&layer=mapnik&marker=${lat},${lng}`;
}

export function mapOpen(lat: number, lng: number) {
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`;
}

export function mediaUrl(src: string, origin = "") {
  if (src.startsWith("http")) return src;
  return `${origin}${src}`;
}

export type HapHotel = {
  id: string;
  slug: string;
  name: string;
  nameTh: string;
  city: string;
  cityTh: string;
  area: string;
  areaTh: string;
  lat: number;
  lng: number;
  rooms: number;
  quiet: boolean;
  parking: boolean;
  lateCheckin: boolean;
  lateCheckout: boolean;
  breakfast: boolean;
  welcomeDrink: boolean;
  kind: "boutique" | "hostel" | "villa";
  description: string;
  descriptionTh: string;
  checkIn: string;
  checkOut: string;
  languages: string[];
  website: string;
  photos: string[];
  roomsTypes: HapRoom[];
  reviews: { score: number; count: number };
  cancel: { en: string; th: string; freeHours: number };
  verification: {
    identity: boolean;
    bank: boolean;
    property: boolean;
    direct: boolean;
    inventory: boolean;
    rates: boolean;
    cancelApi: boolean;
    aiBooking: boolean;
  };
};

export type HapHold = {
  holdId: string;
  hotelId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guest?: string;
  expires: string;
  status: "held" | "converted" | "expired";
};

export type HapBooking = {
  bookingId: string;
  holdId?: string;
  hotelId: string;
  roomId: string;
  guest: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  total: number;
  tax: number;
  commission: 0;
  pay: "PromptPay" | "Card token";
  status: "confirmed" | "modified" | "cancelled";
  channel: "HOTEL24 Agent Direct";
};

const g = globalThis as unknown as {
  __hapHolds?: Map<string, HapHold>;
  __hapBooks?: Map<string, HapBooking>;
};
function holds() {
  if (!g.__hapHolds) g.__hapHolds = new Map();
  return g.__hapHolds;
}
function books() {
  if (!g.__hapBooks) g.__hapBooks = new Map();
  return g.__hapBooks;
}

export const HAP_HOTELS: HapHotel[] = [
  {
    id: "H24-TH-KBV-00000042",
    slug: "baantalay",
    name: "Baan Talay Boutique Resort",
    nameTh: "บ้านทะเล บูทีครีสอร์ต",
    city: "Krabi",
    cityTh: "กระบี่",
    area: "Ao Nang",
    areaTh: "อ่าวนาง",
    lat: 8.0416,
    lng: 98.8356,
    rooms: 42,
    quiet: true,
    parking: true,
    lateCheckin: true,
    lateCheckout: true,
    breakfast: true,
    welcomeDrink: true,
    kind: "boutique",
    description: "42-room boutique resort, Ao Nang beach road. Independent. HOTEL24 is the system of record.",
    descriptionTh: "รีสอร์ตบูทีค 42 ห้อง ถนนหาดอ่าวนาง อิสระ HOTEL24 เป็นระบบต้นฉบับ",
    checkIn: "14:00",
    checkOut: "12:00",
    languages: ["th", "en"],
    website: "/book/baantalay",
    photos: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=70"],
    roomsTypes: [
      { id: "garden", en: "Garden Deluxe", th: "ดีลักซ์สวน", occupancy: 2, rate: 2200, agodaRate: 2200, avail: 3, refundable: true, photo: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=70" },
      { id: "pool", en: "Pool Access", th: "พูลแอคเซส", occupancy: 2, rate: 2900, agodaRate: 2900, avail: 1, refundable: true, photo: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=70" },
      { id: "suite", en: "Sea View Suite", th: "สวีทวิวทะเล", occupancy: 2, rate: 4300, agodaRate: 4300, avail: 4, refundable: true, photo: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=70" },
    ],
    reviews: { score: 9.2, count: 418 },
    cancel: { en: "Free cancellation until 24 hours before arrival.", th: "ยกเลิกฟรีก่อนเข้าพัก 24 ชั่วโมง", freeHours: 24 },
    verification: { identity: true, bank: true, property: true, direct: true, inventory: true, rates: true, cancelApi: true, aiBooking: true },
  },
  {
    id: "H24-TH-CNX-00001872",
    slug: "nimman-house",
    name: "The Nimman House",
    nameTh: "เดอะ นิมมาน เฮาส์",
    city: "Chiang Mai",
    cityTh: "เชียงใหม่",
    area: "Nimman",
    areaTh: "นิมมาน",
    lat: 18.7965,
    lng: 98.9673,
    rooms: 28,
    quiet: true,
    parking: true,
    lateCheckin: true,
    lateCheckout: true,
    breakfast: true,
    welcomeDrink: true,
    kind: "boutique",
    description: "Quiet courtyard boutique, 4 minutes walk from Nimmanhaemin. Parking on site. Direct offer includes breakfast and 14:00 checkout.",
    descriptionTh: "บูทีคลานบ้านเงียบ เดิน 4 นาทีถึงนิมมานเหมินทร์ มีที่จอดรถ ข้อเสนอตรงรวมอาหารเช้าและเช็คเอาท์ 14:00",
    checkIn: "14:00",
    checkOut: "12:00",
    languages: ["th", "en", "zh"],
    website: "/book/baantalay",
    photos: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=70"],
    roomsTypes: [
      { id: "courtyard", en: "Courtyard Deluxe", th: "ดีลักซ์ลานบ้าน", occupancy: 2, rate: 2950, agodaRate: 2950, avail: 4, refundable: true, photo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=70" },
      { id: "garden", en: "Garden Suite", th: "สวีทสวน", occupancy: 3, rate: 3400, agodaRate: 3400, avail: 2, refundable: true, photo: "https://images.unsplash.com/photo-1578683010236-d716f4a3f77b?auto=format&fit=crop&w=900&q=70" },
    ],
    reviews: { score: 9.4, count: 186 },
    cancel: { en: "Free cancellation until 24 hours before arrival.", th: "ยกเลิกฟรีก่อนเข้าพัก 24 ชั่วโมง", freeHours: 24 },
    verification: { identity: true, bank: true, property: true, direct: true, inventory: true, rates: true, cancelApi: true, aiBooking: true },
  },
  {
    id: "H24-TH-CNX-00001904",
    slug: "wat-gate-loft",
    name: "Wat Gate Loft",
    nameTh: "วัดเกต ลอฟท์",
    city: "Chiang Mai",
    cityTh: "เชียงใหม่",
    area: "Wat Gate",
    areaTh: "วัดเกต",
    lat: 18.7883,
    lng: 99.0050,
    rooms: 18,
    quiet: true,
    parking: true,
    lateCheckin: true,
    lateCheckout: false,
    breakfast: true,
    welcomeDrink: false,
    kind: "boutique",
    description: "River loft rooms east of the old city. Parking yes. Non-refundable direct rate.",
    descriptionTh: "ลอฟท์ริมน้ำฝั่งตะวันออกของเมืองเก่า มีที่จอด เรทตรงไม่คืนเงิน",
    checkIn: "15:00",
    checkOut: "11:00",
    languages: ["th", "en"],
    website: "/book/baantalay",
    photos: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=70"],
    roomsTypes: [
      { id: "loft", en: "River Loft", th: "ลอฟท์ริมน้ำ", occupancy: 2, rate: 3200, agodaRate: 3200, avail: 3, refundable: false, photo: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=900&q=70" },
    ],
    reviews: { score: 8.7, count: 94 },
    cancel: { en: "Non-refundable.", th: "ไม่คืนเงิน", freeHours: 0 },
    verification: { identity: true, bank: true, property: true, direct: true, inventory: true, rates: true, cancelApi: true, aiBooking: true },
  },
  {
    id: "H24-TH-KBV-00000024",
    slug: "talay-hostel",
    name: "Talay Hostel Ao Nang",
    nameTh: "ทะเล โฮสเทล อ่าวนาง",
    city: "Krabi",
    cityTh: "กระบี่",
    area: "Ao Nang",
    areaTh: "อ่าวนาง",
    lat: 8.036,
    lng: 98.822,
    rooms: 24,
    quiet: false,
    parking: false,
    lateCheckin: true,
    lateCheckout: false,
    breakfast: true,
    welcomeDrink: false,
    kind: "hostel",
    description: "24-bed hostel, Ao Nang. Starter property on the same HOTEL24 graph.",
    descriptionTh: "โฮสเทล 24 ห้อง อ่าวนาง ที่พัก Starter บนกราฟ HOTEL24 ชุดเดียวกัน",
    checkIn: "14:00",
    checkOut: "11:00",
    languages: ["th", "en"],
    website: "/book/baantalay",
    photos: ["https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=70"],
    roomsTypes: [
      { id: "dorm", en: "4-bed mixed dorm", th: "ดอร์มรวม 4 เตียง", occupancy: 1, rate: 640, agodaRate: 640, avail: 6, refundable: true, photo: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=70" },
    ],
    reviews: { score: 8.1, count: 312 },
    cancel: { en: "Free until 48 hours before.", th: "ฟรีก่อน 48 ชั่วโมง", freeHours: 48 },
    verification: { identity: true, bank: false, property: true, direct: true, inventory: true, rates: true, cancelApi: true, aiBooking: true },
  },
  {
    id: "H24-TH-KBV-00000003",
    slug: "suan-lom",
    name: "Villa Suan Lom",
    nameTh: "วิลล่าสวนลม",
    city: "Krabi",
    cityTh: "กระบี่",
    area: "Noppharat Thara",
    areaTh: "นพรัตน์ธารา",
    lat: 8.044,
    lng: 98.812,
    rooms: 3,
    quiet: true,
    parking: true,
    lateCheckin: true,
    lateCheckout: true,
    breakfast: true,
    welcomeDrink: true,
    kind: "villa",
    description: "Three private villas. Direct is the main channel.",
    descriptionTh: "วิลล่าส่วนตัว 3 หลัง จองตรงเป็นช่องทางหลัก",
    checkIn: "15:00",
    checkOut: "12:00",
    languages: ["th", "en"],
    website: "/book/baantalay",
    photos: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=70"],
    roomsTypes: [
      { id: "villa", en: "Beach Villa 2BR", th: "วิลล่าริมหาด", occupancy: 6, rate: 8900, agodaRate: 8900, avail: 1, refundable: true, photo: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=70" },
    ],
    reviews: { score: 9.6, count: 41 },
    cancel: { en: "Free until 7 days before.", th: "ฟรีก่อน 7 วัน", freeHours: 168 },
    verification: { identity: true, bank: true, property: true, direct: true, inventory: true, rates: true, cancelApi: true, aiBooking: true },
  },
];

export function hotelBySlug(slug: string) {
  return HAP_HOTELS.find((h) => h.slug === slug) ?? HAP_HOTELS[0];
}

export function hotelById(id: string) {
  return HAP_HOTELS.find((h) => h.id === id);
}

export function directOffer(h: HapHotel, room: HapRoom) {
  return {
    channel: "HOTEL24 Direct",
    rate: room.rate,
    agodaRate: room.agodaRate,
    inclusions: [
      h.breakfast ? "Breakfast included" : "Room only",
      h.lateCheckout ? "Late checkout 14:00" : "Standard checkout",
      h.welcomeDrink ? "Welcome drink" : null,
      room.refundable ? `Free cancel ${h.cancel.freeHours}h` : "Non-refundable",
    ].filter(Boolean),
    why: "Same public rate as Agoda. Better total value on Direct — the agent can see the inclusions without a promo code.",
    whyTh: "ราคาหน้าเว็บเท่า Agoda แต่จองตรงได้อะไรมากกว่า — เอเจนต์เห็นสิทธิ์โดยไม่ต้องมีโค้ด",
  };
}

export function buildHotel24Json(slug = "baantalay", origin = "") {
  const h = hotelBySlug(slug);
  const base = origin || "";
  return {
    spec: "hotel-agent-protocol",
    specVersion: HAP_VERSION,
    publisher: "HOTEL24",
    verifiedId: h.id,
    name: h.name,
    nameTh: h.nameTh,
    officialWebsite: `${base}${h.website}`,
    location: {
      city: h.city,
      area: h.area,
      country: "TH",
      latitude: h.lat,
      longitude: h.lng,
    },
    description: h.description,
    amenities: {
      parking: h.parking,
      breakfast: h.breakfast,
      lateCheckin: h.lateCheckin,
      lateCheckout: h.lateCheckout,
      quiet: h.quiet,
    },
    roomTypes: h.roomsTypes.map((r) => ({
      id: r.id,
      name: r.en,
      occupancy: r.occupancy,
      liveRate: r.rate,
      availability: r.avail,
      photo: mediaUrl(r.photo, base),
    })),
    photos: h.photos.map((p) => mediaUrl(p, base)),
    checkIn: h.checkIn,
    checkOut: h.checkOut,
    policies: { cancellation: h.cancel.en, languages: h.languages },
    reviews: h.reviews,
    endpoints: {
      liveAvailability: `${base}/api/hap/invoke`,
      liveRate: `${base}/api/hap/invoke`,
      directOffers: `${base}/api/hap/invoke`,
      booking: `${base}/api/hap/invoke`,
      modify: `${base}/api/hap/invoke`,
      cancel: `${base}/api/hap/invoke`,
      paymentCheckout: `${base}${h.website}`,
      mcp: `${base}/api/hap/mcp`,
      identity: `${base}/.well-known/hotel24.json`,
    },
    verification: h.verification,
    adapters: ["schema.org", "mcp", "acp", "ucp", "oai-searchbot"],
  };
}

export function buildJsonLd(slug = "baantalay", origin = "") {
  const h = hotelBySlug(slug);
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: h.name,
    identifier: h.id,
    url: `${origin}${h.website}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: h.area,
      addressRegion: h.city,
      addressCountry: "TH",
    },
    image: h.photos[0],
    photo: h.photos,
    geo: { "@type": "GeoCoordinates", latitude: h.lat, longitude: h.lng },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: h.reviews.score,
      reviewCount: h.reviews.count,
      bestRating: 10,
    },
    checkinTime: h.checkIn,
    checkoutTime: h.checkOut,
    amenityFeature: [
      h.parking && { "@type": "LocationFeatureSpecification", name: "Parking", value: true },
      h.breakfast && { "@type": "LocationFeatureSpecification", name: "Breakfast", value: true },
    ].filter(Boolean),
    makesOffer: h.roomsTypes.map((r) => ({
      "@type": "Offer",
      name: r.en,
      price: r.rate,
      priceCurrency: "THB",
      availability: r.avail > 0 ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
      image: r.photo,
    })),
  };
}

export const HAP_TOOLS: {
  name: HapToolName;
  description: string;
  input: Record<string, string>;
}[] = [
  { name: "search_hotels", description: "Find verified HOTEL24 hotels by city, area, budget, amenities.", input: { city: "string?", area: "string?", maxThb: "number?", parking: "boolean?", lateCheckin: "boolean?", quiet: "boolean?", kind: "string?" } },
  { name: "search_availability", description: "Live availability for a hotel and date range.", input: { hotelId: "string", checkIn: "string", checkOut: "string" } },
  { name: "get_room_types", description: "Canonical HOTEL24 room types — not OTA room names.", input: { hotelId: "string" } },
  { name: "get_live_rate", description: "Current BAR in THB for a room type.", input: { hotelId: "string", roomId: "string" } },
  { name: "get_direct_offer", description: "Direct rate plus inclusions vs the OTA public rate.", input: { hotelId: "string", roomId: "string" } },
  { name: "get_cancellation_policy", description: "Cancellation window for Direct.", input: { hotelId: "string", roomId: "string?" } },
  { name: "compare_rooms", description: "Rank two or more verified hotels for the same stay.", input: { hotelIds: "string[]", maxThb: "number?" } },
  { name: "create_room_hold", description: "Hold a room 10 minutes. Does not charge.", input: { hotelId: "string", roomId: "string", checkIn: "string", checkOut: "string", nights: "number?" } },
  { name: "create_booking", description: "Convert a hold (or book immediately) into a Direct reservation. Hotel owns the guest.", input: { holdId: "string?", hotelId: "string?", roomId: "string?", guest: "string", checkIn: "string?", checkOut: "string?" } },
  { name: "modify_booking", description: "Change dates on a Direct booking and recalculate inventory.", input: { bookingId: "string", checkOut: "string" } },
  { name: "cancel_booking", description: "Cancel a Direct booking and restore availability.", input: { bookingId: "string" } },
  { name: "get_directions", description: "Coordinates and a one-line approach.", input: { hotelId: "string" } },
  { name: "get_facilities", description: "Parking, breakfast, late check-in/out, quiet.", input: { hotelId: "string" } },
  { name: "ask_hotel", description: "Policy answers (check-in, parking, breakfast). Refunds escalate — not answered here.", input: { hotelId: "string", question: "string" } },
  { name: "get_hotel_identity", description: "The hotel24.json identity document.", input: { hotelId: "string?", slug: "string?" } },
];

export const HAP_GRAPH = [
  "Hotels",
  "Rooms",
  "Availability",
  "Rates",
  "Amenities",
  "Location",
  "Policies",
  "Reviews",
  "Direct offers",
  "Booking capabilities",
  "Verified identity",
] as const;

export const RANKING_SIGNALS = [
  { id: "verified", en: "HOTEL24 verified identity — agents do not scrape the open web", th: "ตัวตนที่ยืนยันแล้ว — เอเจนต์ไม่ขูดเว็บมั่ว" },
  { id: "live", en: "Inventory and rates live on the hotel graph", th: "ห้องคงเหลือและราคาสดบนกราฟโรงแรม" },
  { id: "book", en: "Direct booking / hold / cancel APIs actually work", th: "API จอง กันห้อง ยกเลิก ใช้ได้จริง" },
  { id: "value", en: "Direct offer vs OTA public rate — inclusions, not a discount code", th: "ข้อเสนอตรงเทียบ OTA — สิทธิ์เพิ่ม ไม่ใช่โค้ดส่วนลด" },
  { id: "cancel", en: "Free-cancellation window on Direct", th: "ช่วงยกเลิกฟรีของจองตรง" },
  { id: "fit", en: "Amenity match: parking, quiet, late check-in, breakfast", th: "สิ่งอำนวยความสะดวกตรง: ที่จอด เงียบ เช็คอินสาย อาหารเช้า" },
  { id: "geo", en: "Distance to the requested area", th: "ระยะถึงย่านที่ขอ" },
];

export const HAP_FLOW = [
  { tool: "search_hotels", alias: "discover", en: "Agent queries the verified registry", th: "เอเจนต์ถามทะเบียนที่ยืนยันแล้ว" },
  { tool: "compare_rooms", alias: "rank", en: "Rank by verified + value + fit", th: "เรียงจากยืนยัน + คุณค่า + ความตรง" },
  { tool: "get_direct_offer", alias: "create_quote()", en: "Same public rate. Extra inclusions the agent can read.", th: "ราคาหน้าเว็บเท่ากัน สิทธิ์เพิ่มที่เอเจนต์อ่านได้" },
  { tool: "create_room_hold", alias: "hold_room()", en: "Hold 10 minutes. No charge. Inventory decremented.", th: "กันห้อง 10 นาที ไม่คิดเงิน ตัดห้องคงเหลือ" },
  { tool: "create_booking", alias: "book_room()", en: "Confirm into the hotel PMS. Hotel owns the guest.", th: "ยืนยันเข้า PMS ของโรงแรม โรงแรมเป็นเจ้าของแขก" },
];

export const HAP_ALIASES: Record<string, HapToolName> = {
  create_quote: "get_direct_offer",
  hold_room: "create_room_hold",
  book_room: "create_booking",
};

export const HAP_ADAPTERS = [
  { id: "schema", name: "Schema.org JSON-LD", role: "Hotel + Offer structured data", status: "live" as const },
  { id: "mcp", name: "Model Context Protocol", role: "Callable tools for any MCP client", status: "live" as const },
  { id: "acp", name: "OpenAI Agentic Commerce Protocol", role: "Structured merchant feed + Travel category", status: "mapped" as const },
  { id: "ucp", name: "Google Universal Commerce Protocol", role: "Agent commerce checkout on the hotel site", status: "mapped" as const },
  { id: "oai", name: "OAI-SearchBot / GPTBot", role: "AI search crawl, robots controlled by HOTEL24", status: "live" as const },
  { id: "aeo", name: "AEO — Agent Engine Optimization", role: "llms.txt, hotel24.json, sitemaps, JSON-LD", status: "live" as const },
];

type Args = Record<string, unknown>;

function str(a: Args, k: string) {
  const v = a[k];
  return typeof v === "string" ? v : "";
}
function num(a: Args, k: string) {
  const v = a[k];
  return typeof v === "number" ? v : Number(v) || 0;
}
function bool(a: Args, k: string) {
  return a[k] === true || a[k] === "true";
}

function cheapest(h: HapHotel) {
  return h.roomsTypes.reduce((m, r) => Math.min(m, r.rate), Infinity);
}

function cheapestRoom(h: HapHotel) {
  return [...h.roomsTypes].sort((a, b) => a.rate - b.rate)[0];
}

function mediaOf(h: HapHotel, room?: HapRoom) {
  const r = room ?? cheapestRoom(h);
  return {
    photo: h.photos[0] || "",
    roomPhoto: r?.photo || "",
    roomName: r?.en || "",
    lat: h.lat,
    lng: h.lng,
    map: mapEmbed(h.lat, h.lng),
    mapUrl: mapOpen(h.lat, h.lng),
  };
}

export function invokeHap(name: string, args: Args = {}, origin = "") {
  const resolved = HAP_ALIASES[name] || name;
  switch (resolved as HapToolName) {
    case "search_hotels": {
      const city = str(args, "city").toLowerCase();
      const area = str(args, "area").toLowerCase();
      const max = num(args, "maxThb") || 1e9;
      const list = HAP_HOTELS.filter((h) => {
        if (city && !h.city.toLowerCase().includes(city) && !h.cityTh.includes(str(args, "city"))) return false;
        if (area && !h.area.toLowerCase().includes(area) && !h.areaTh.includes(str(args, "area"))) return false;
        if (bool(args, "parking") && !h.parking) return false;
        if (bool(args, "lateCheckin") && !h.lateCheckin) return false;
        if (bool(args, "quiet") && !h.quiet) return false;
        if (cheapest(h) > max) return false;
        if (str(args, "kind") && h.kind !== str(args, "kind")) return false;
        return h.verification.aiBooking;
      });
      return {
        count: list.length,
        hotels: list.map((h) => {
          const room = cheapestRoom(h);
          const offer = directOffer(h, room);
          return {
            hotelId: h.id,
            name: h.name,
            city: h.city,
            area: h.area,
            directPrice: room.rate,
            available: room.avail > 0,
            breakfast: h.breakfast,
            parking: h.parking,
            cancellation: h.cancel.en,
            directBenefit: offer.inclusions,
            verification: h.id,
            ...mediaOf(h, room),
          };
        }),
      };
    }
    case "search_availability": {
      const h = hotelById(str(args, "hotelId"));
      if (!h) return { error: "hotel_not_found" };
      return {
        hotelId: h.id,
        checkIn: str(args, "checkIn") || "open",
        checkOut: str(args, "checkOut") || "open",
        rooms: h.roomsTypes.map((r) => ({ roomId: r.id, name: r.en, avail: r.avail, rate: r.rate, photo: r.photo })),
      };
    }
    case "get_room_types": {
      const h = hotelById(str(args, "hotelId"));
      if (!h) return { error: "hotel_not_found" };
      return { hotelId: h.id, rooms: h.roomsTypes };
    }
    case "get_live_rate": {
      const h = hotelById(str(args, "hotelId"));
      const r = h?.roomsTypes.find((x) => x.id === str(args, "roomId")) ?? h?.roomsTypes[0];
      if (!h || !r) return { error: "not_found" };
      return { hotelId: h.id, roomId: r.id, currency: "THB", rate: r.rate, agodaRate: r.agodaRate };
    }
    case "get_direct_offer": {
      const h = hotelById(str(args, "hotelId"));
      const r = h?.roomsTypes.find((x) => x.id === str(args, "roomId")) ?? h?.roomsTypes[0];
      if (!h || !r) return { error: "not_found" };
      return { hotelId: h.id, room: r.en, ...directOffer(h, r), ...mediaOf(h, r) };
    }
    case "get_cancellation_policy": {
      const h = hotelById(str(args, "hotelId"));
      if (!h) return { error: "hotel_not_found" };
      return { hotelId: h.id, ...h.cancel };
    }
    case "compare_rooms": {
      const ids = (Array.isArray(args.hotelIds) ? args.hotelIds : []) as string[];
      const picked = (ids.length ? ids.map(hotelById) : HAP_HOTELS.filter((h) => h.city === "Chiang Mai")).filter(Boolean) as HapHotel[];
      const ranked = picked
        .map((h) => {
          const room = [...h.roomsTypes].sort((a, b) => a.rate - b.rate)[0];
          const score =
            (h.quiet ? 2 : 0) +
            (h.parking ? 2 : 0) +
            (h.lateCheckin ? 2 : 0) +
            (h.lateCheckout ? 2 : 0) +
            (h.breakfast ? 1 : 0) +
            (room.refundable ? 2 : 0) +
            h.reviews.score / 5 -
            room.rate / 5000;
          return { hotelId: h.id, name: h.name, area: h.area, rate: room.rate, room: room.en, refundable: room.refundable, inclusions: directOffer(h, room).inclusions, score, ...mediaOf(h, room) };
        })
        .sort((a, b) => b.score - a.score);
      return { winner: ranked[0]?.hotelId, ranked };
    }
    case "create_room_hold": {
      const h = hotelById(str(args, "hotelId"));
      const r = h?.roomsTypes.find((x) => x.id === str(args, "roomId")) ?? h?.roomsTypes[0];
      if (!h || !r) return { error: "not_found" };
      if (r.avail < 1) return { error: "sold_out" };
      const holdId = `HOLD-${Date.now().toString(36).toUpperCase()}`;
      const rec: HapHold = {
        holdId,
        hotelId: h.id,
        roomId: r.id,
        checkIn: str(args, "checkIn") || "22 Aug",
        checkOut: str(args, "checkOut") || "23 Aug",
        nights: num(args, "nights") || 1,
        expires: "10 minutes",
        status: "held",
      };
      holds().set(holdId, rec);
      r.avail -= 1;
      return { ...rec, rate: r.rate, hotel: h.name, room: r.en, next: "create_booking", ...mediaOf(h, r) };
    }
    case "create_booking": {
      let hold = str(args, "holdId") ? holds().get(str(args, "holdId")) : undefined;
      const h = hotelById(hold?.hotelId || str(args, "hotelId"));
      const r = h?.roomsTypes.find((x) => x.id === (hold?.roomId || str(args, "roomId"))) ?? h?.roomsTypes[0];
      if (!h || !r) return { error: "not_found" };
      if (!hold) {
        if (r.avail < 1) return { error: "sold_out" };
        r.avail -= 1;
      } else {
        hold.status = "converted";
      }
      const bookingId = `H24-AG-${Date.now().toString(36).toUpperCase()}`;
      const nights = hold?.nights || 1;
      const rec: HapBooking = {
        bookingId,
        holdId: hold?.holdId,
        hotelId: h.id,
        roomId: r.id,
        guest: str(args, "guest") || "AI traveler",
        checkIn: hold?.checkIn || str(args, "checkIn") || "22 Aug",
        checkOut: hold?.checkOut || str(args, "checkOut") || "23 Aug",
        nights,
        total: r.rate * nights,
        tax: Math.round(r.rate * nights * 0.07),
        commission: 0,
        pay: "PromptPay",
        status: "confirmed",
        channel: "HOTEL24 Agent Direct",
      };
      books().set(bookingId, rec);
      return {
        ...rec,
        hotel: h.name,
        room: r.en,
        ...mediaOf(h, r),
        merchantOfRecord: h.name,
        otaInvolved: false,
        message: "The hotel owns this guest. Booking.com was not involved.",
      };
    }
    case "modify_booking": {
      const b = books().get(str(args, "bookingId"));
      if (!b || b.status === "cancelled") return { error: "booking_not_found" };
      b.checkOut = str(args, "checkOut") || b.checkOut;
      b.status = "modified";
      return { ...b };
    }
    case "cancel_booking": {
      const b = books().get(str(args, "bookingId"));
      if (!b) return { error: "booking_not_found" };
      b.status = "cancelled";
      const h = hotelById(b.hotelId);
      const r = h?.roomsTypes.find((x) => x.id === b.roomId);
      if (r) r.avail += 1;
      return { ...b, inventoryRestored: true };
    }
    case "get_directions": {
      const h = hotelById(str(args, "hotelId"));
      if (!h) return { error: "hotel_not_found" };
      return { hotelId: h.id, lat: h.lat, lng: h.lng, map: mapEmbed(h.lat, h.lng), mapUrl: mapOpen(h.lat, h.lng), text: `${h.area}, ${h.city}, Thailand` };
    }
    case "get_facilities": {
      const h = hotelById(str(args, "hotelId"));
      if (!h) return { error: "hotel_not_found" };
      return { hotelId: h.id, parking: h.parking, breakfast: h.breakfast, lateCheckin: h.lateCheckin, lateCheckout: h.lateCheckout, quiet: h.quiet, languages: h.languages };
    }
    case "ask_hotel": {
      const h = hotelById(str(args, "hotelId")) ?? HAP_HOTELS[0];
      const q = str(args, "question").toLowerCase();
      if (/refund|compensate|เงินคืน/.test(q)) {
        return { hotelId: h.id, answer: "Refunds are outside agent authority. Escalate to the hotel.", escalate: true };
      }
      if (/park/.test(q)) return { hotelId: h.id, answer: h.parking ? "On-site parking is included." : "No on-site parking." };
      if (/breakfast|เช้า/.test(q)) return { hotelId: h.id, answer: h.breakfast ? "Breakfast is included on Direct." : "Breakfast is not included." };
      if (/check-?in|เข้า/.test(q)) return { hotelId: h.id, answer: `Check-in from ${h.checkIn}. Late check-in is ${h.lateCheckin ? "available" : "not guaranteed"}.` };
      return { hotelId: h.id, answer: h.description };
    }
    case "get_hotel_identity": {
      const slug = str(args, "slug") || hotelById(str(args, "hotelId"))?.slug || "baantalay";
      return buildHotel24Json(slug, origin);
    }
    default:
      return { error: "unknown_tool", tools: HAP_TOOLS.map((t) => t.name) };
  }
}

export function hapMcpManifest(origin: string) {
  return {
    name: "hotel24-agent-direct",
    version: HAP_VERSION,
    description: "HOTEL24 Agent Gateway — search, quote, hold and book verified hotels. The hotel owns the guest.",
    tools: HAP_TOOLS.map((t) => ({
      name: t.name,
      description: t.description,
      inputSchema: { type: "object", properties: Object.fromEntries(Object.entries(t.input).map(([k, v]) => [k, { type: v.replace("?", "") }])) },
    })),
    invoke: `${origin}/api/hap/invoke`,
  };
}

export const SAMPLE_QUERIES = [
  {
    id: "cnx",
    en: "Find me a quiet boutique hotel in Chiang Mai near Nimman, under ฿3,500, with parking and late check-in. I don't care which booking website.",
    th: "หาโรงแรมบูทีคเงียบ ๆ ในเชียงใหม่ใกล้นิมมาน ไม่เกิน ฿3,500 มีที่จอดรถและเช็คอินสาย ไม่สนว่าจองผ่านเว็บไหน",
    args: { city: "Chiang Mai", maxThb: 3500, parking: true, lateCheckin: true, quiet: true, kind: "boutique" },
  },
  {
    id: "kbv",
    en: "Ao Nang boutique, parking, breakfast included, book direct.",
    th: "บูทีคอ่าวนาง มีที่จอด รวมอาหารเช้า จองตรง",
    args: { city: "Krabi", area: "Ao Nang", parking: true, kind: "boutique" },
  },
];
