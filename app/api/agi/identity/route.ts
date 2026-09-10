import { NextResponse } from "next/server";
import { AGI_KNOWLEDGE, AGI_RULES, AGI_VERSION, agiMcpManifest } from "@/lib/agi";

function originOf(req: Request) {
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "localhost:3000";
  const proto = req.headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export function GET(req: Request) {
  const origin = originOf(req);
  return NextResponse.json({
    spec: "hotel24-agi",
    version: AGI_VERSION,
    hotel: AGI_KNOWLEDGE.property,
    rules: AGI_RULES,
    mcp: agiMcpManifest(origin),
    note: "Owner agents and guest agents share this API. Permissions are enforced by HOTEL24. Not a certified Grok / Claude / ChatGPT listing.",
  }, { headers: { "Access-Control-Allow-Origin": "*" } });
}
