import { NextResponse } from "next/server";
import { HAP_HOTELS } from "@/lib/hap";

function originOf(req: Request) {
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "localhost:3000";
  const proto = req.headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

/** Verified hotel registry — agents query this instead of scraping. */
export function GET(req: Request) {
  const url = new URL(req.url);
  const city = (url.searchParams.get("city") || "").toLowerCase();
  const origin = originOf(req);
  const hotels = HAP_HOTELS.filter((h) => {
    if (city && !h.city.toLowerCase().includes(city) && !h.cityTh.includes(url.searchParams.get("city") || "")) return false;
    return h.verification.identity;
  }).map((h) => ({
    id: h.id,
    name: h.name,
    nameTh: h.nameTh,
    city: h.city,
    area: h.area,
    rooms: h.rooms,
    verification: h.verification,
    identity: `${origin}/.well-known/hotel24.json?slug=${h.slug}`,
    from: cheapest(h),
    currency: "THB",
  }));
  return NextResponse.json(
    { registry: "registry.hotel24.com", count: hotels.length, hotels },
    { headers: { "Access-Control-Allow-Origin": "*" } }
  );
}

function cheapest(h: (typeof HAP_HOTELS)[number]) {
  return h.roomsTypes.reduce((m, r) => Math.min(m, r.rate), Infinity);
}
