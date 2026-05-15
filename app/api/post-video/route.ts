import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import {
  TIKTOK_POST_INIT_DIRECT_URL,
  TIKTOK_POST_INIT_INBOX_URL,
  TIKTOK_POST_STATUS_URL,
  refreshAccessToken,
} from "@/lib/tiktok";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODE = (process.env.TIKTOK_POST_MODE ?? "INBOX").toUpperCase() as "INBOX" | "DIRECT";

async function ensureAccessToken() {
  const session = await getSession();
  if (!session.access_token || !session.refresh_token) return null;
  if (session.expires_at && session.expires_at < Date.now() + 60_000) {
    const refreshed = await refreshAccessToken(session.refresh_token);
    session.access_token = refreshed.access_token;
    session.refresh_token = refreshed.refresh_token;
    session.expires_at = Date.now() + refreshed.expires_in * 1000;
    await session.save();
  }
  return session.access_token!;
}

export async function POST(req: NextRequest) {
  const accessToken = await ensureAccessToken();
  if (!accessToken) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }

  const body = (await req.json()) as { video_size?: number; caption?: string };
  if (!body.video_size || body.video_size <= 0) {
    return NextResponse.json({ error: "video_size required" }, { status: 400 });
  }

  const chunkSize = body.video_size; // single-chunk upload
  const initUrl = MODE === "DIRECT" ? TIKTOK_POST_INIT_DIRECT_URL : TIKTOK_POST_INIT_INBOX_URL;

  const initBody: Record<string, unknown> = {
    source_info: {
      source: "FILE_UPLOAD",
      video_size: body.video_size,
      chunk_size: chunkSize,
      total_chunk_count: 1,
    },
  };
  if (MODE === "DIRECT") {
    initBody.post_info = {
      title: (body.caption ?? "").slice(0, 2200),
      privacy_level: "SELF_ONLY",
      disable_duet: false,
      disable_comment: false,
      disable_stitch: false,
    };
  }

  const initRes = await fetch(initUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(initBody),
  });
  const initData = await initRes.json();
  if (!initRes.ok || initData?.error?.code !== "ok") {
    return NextResponse.json(
      {
        error:
          initData?.error?.message ??
          `TikTok init failed with status ${initRes.status}`,
      },
      { status: 502 },
    );
  }
  return NextResponse.json({
    upload_url: initData.data.upload_url,
    publish_id: initData.data.publish_id,
    mode: MODE,
  });
}

export async function GET(req: NextRequest) {
  const accessToken = await ensureAccessToken();
  if (!accessToken) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }
  const publishId = new URL(req.url).searchParams.get("publish_id");
  if (!publishId) {
    return NextResponse.json({ error: "publish_id required" }, { status: 400 });
  }
  const res = await fetch(TIKTOK_POST_STATUS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ publish_id: publishId }),
  });
  const data = await res.json();
  if (!res.ok || data?.error?.code !== "ok") {
    return NextResponse.json(
      { error: data?.error?.message ?? `status check failed (${res.status})` },
      { status: 502 },
    );
  }
  return NextResponse.json({
    status: data.data.status,
    fail_reason: data.data.fail_reason,
    mode: MODE,
    publicaly_available_post_id: data.data.publicaly_available_post_id,
  });
}
