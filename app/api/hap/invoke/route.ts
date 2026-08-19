import { NextResponse } from "next/server";
import { invokeHap } from "@/lib/hap";

function originOf(req: Request) {
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "localhost:3000";
  const proto = req.headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function OPTIONS() {
  return new NextResponse(null, { headers: cors });
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { tool?: string; name?: string; arguments?: Record<string, unknown> };
  const name = body.tool || body.name || "";
  const result = invokeHap(name, body.arguments || {}, originOf(req));
  return NextResponse.json({ ok: !("error" in (result as object) && (result as { error?: string }).error), tool: name, result }, { headers: cors });
}

export function GET(req: Request) {
  const url = new URL(req.url);
  const name = url.searchParams.get("tool") || "";
  const args: Record<string, unknown> = {};
  url.searchParams.forEach((v, k) => {
    if (k !== "tool") args[k] = v === "true" ? true : v === "false" ? false : Number(v) || v;
  });
  const result = invokeHap(name, args, originOf(req));
  return NextResponse.json({ tool: name, result }, { headers: cors });
}
