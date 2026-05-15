import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { getSession } from "@/lib/session";
import { buildAuthorizeUrl } from "@/lib/tiktok";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const state = crypto.randomBytes(24).toString("hex");
  const session = await getSession();
  session.oauth_state = state;
  await session.save();
  return NextResponse.redirect(buildAuthorizeUrl(state));
}
