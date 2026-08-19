import { NextResponse } from "next/server";
import { hapMcpManifest } from "@/lib/hap";

function originOf(req: Request) {
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "localhost:3000";
  const proto = req.headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export function GET(req: Request) {
  return NextResponse.json(hapMcpManifest(originOf(req)), {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
}
