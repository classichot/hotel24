import { NextResponse } from "next/server";
import { invokeAgi } from "@/lib/agi";

function originHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-HOTEL24-Scope",
  };
}

export function OPTIONS() {
  return new NextResponse(null, { headers: originHeaders() });
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as {
    tool?: string;
    name?: string;
    arguments?: Record<string, unknown>;
    on?: boolean;
    level?: 0 | 1 | 2;
    paused?: boolean;
  };
  const name = body.tool || body.name || "";
  const result = invokeAgi(name, body.arguments || {}, {
    on: body.on !== false,
    level: body.level === 0 || body.level === 2 ? body.level : 1,
    paused: Boolean(body.paused),
  });
  return NextResponse.json({ ok: !("error" in (result as object) && (result as { error?: string }).error), tool: name, result }, { headers: originHeaders() });
}

export function GET(req: Request) {
  const url = new URL(req.url);
  const name = url.searchParams.get("tool") || "agi_status";
  const result = invokeAgi(name, {}, { on: true, level: 1, paused: false });
  return NextResponse.json({ tool: name, result }, { headers: originHeaders() });
}
