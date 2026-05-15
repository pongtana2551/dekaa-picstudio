import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { exchangeCodeForToken, fetchUserInfo } from "@/lib/tiktok";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  const session = await getSession();
  const expectedState = session.oauth_state;
  session.oauth_state = undefined;

  if (error) {
    await session.save();
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error)}`, req.url));
  }
  if (!code || !state || !expectedState || state !== expectedState) {
    await session.save();
    return NextResponse.redirect(new URL("/login?error=invalid_state", req.url));
  }

  try {
    const token = await exchangeCodeForToken(code);
    let displayName: string | undefined;
    let avatarUrl: string | undefined;
    try {
      const user = await fetchUserInfo(token.access_token);
      displayName = user.display_name;
      avatarUrl = user.avatar_url;
    } catch {
      // user.info.basic may be sandbox-limited; tolerate missing profile
    }

    session.open_id = token.open_id;
    session.display_name = displayName;
    session.avatar_url = avatarUrl;
    session.access_token = token.access_token;
    session.refresh_token = token.refresh_token;
    session.expires_at = Date.now() + token.expires_in * 1000;
    await session.save();

    return NextResponse.redirect(new URL("/dashboard", req.url));
  } catch (e) {
    await session.save();
    const message = e instanceof Error ? e.message : "token_exchange_failed";
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(message)}`, req.url),
    );
  }
}
