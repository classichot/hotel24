import { NextResponse } from "next/server";
import { buildHotel24Json } from "@/lib/hap";

function originOf(req: Request) {
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "localhost:3000";
  const proto = req.headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export function GET(req: Request) {
  const url = new URL(req.url);
  const slug = url.searchParams.get("slug") || "baantalay";
  const body = buildHotel24Json(slug, originOf(req));
  return NextResponse.json(body, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=60",
    },
  });
}
