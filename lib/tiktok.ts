export const TIKTOK_AUTHORIZE_URL = "https://www.tiktok.com/v2/auth/authorize/";
export const TIKTOK_TOKEN_URL = "https://open.tiktokapis.com/v2/oauth/token/";
export const TIKTOK_USER_INFO_URL = "https://open.tiktokapis.com/v2/user/info/";
export const TIKTOK_POST_INIT_INBOX_URL =
  "https://open.tiktokapis.com/v2/post/publish/inbox/video/init/";
export const TIKTOK_POST_INIT_DIRECT_URL =
  "https://open.tiktokapis.com/v2/post/publish/video/init/";
export const TIKTOK_POST_STATUS_URL =
  "https://open.tiktokapis.com/v2/post/publish/status/fetch/";

export const SCOPES = ["user.info.basic", "video.publish"] as const;

export function tiktokConfig() {
  const clientKey = process.env.TIKTOK_CLIENT_KEY;
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET;
  const redirectUri = process.env.TIKTOK_REDIRECT_URI;
  if (!clientKey || !clientSecret || !redirectUri) {
    throw new Error(
      "TIKTOK_CLIENT_KEY, TIKTOK_CLIENT_SECRET and TIKTOK_REDIRECT_URI must be set.",
    );
  }
  return { clientKey, clientSecret, redirectUri };
}

export function buildAuthorizeUrl(state: string): string {
  const { clientKey, redirectUri } = tiktokConfig();
  const params = new URLSearchParams({
    client_key: clientKey,
    scope: SCOPES.join(","),
    response_type: "code",
    redirect_uri: redirectUri,
    state,
  });
  return `${TIKTOK_AUTHORIZE_URL}?${params.toString()}`;
}

export interface TikTokTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
  open_id: string;
  scope: string;
  token_type: string;
}

export async function exchangeCodeForToken(code: string): Promise<TikTokTokenResponse> {
  const { clientKey, clientSecret, redirectUri } = tiktokConfig();
  const body = new URLSearchParams({
    client_key: clientKey,
    client_secret: clientSecret,
    code,
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
  });

  const res = await fetch(TIKTOK_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-cache",
    },
    body,
  });
  const data = (await res.json()) as TikTokTokenResponse & {
    error?: string;
    error_description?: string;
  };
  if (!res.ok || (data as { error?: string }).error) {
    throw new Error(
      `TikTok token exchange failed: ${data.error ?? res.status} ${data.error_description ?? ""}`,
    );
  }
  return data;
}

export async function refreshAccessToken(refreshToken: string): Promise<TikTokTokenResponse> {
  const { clientKey, clientSecret } = tiktokConfig();
  const body = new URLSearchParams({
    client_key: clientKey,
    client_secret: clientSecret,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });
  const res = await fetch(TIKTOK_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const data = (await res.json()) as TikTokTokenResponse & { error?: string };
  if (!res.ok || data.error) {
    throw new Error(`TikTok token refresh failed: ${data.error ?? res.status}`);
  }
  return data;
}

export async function fetchUserInfo(accessToken: string): Promise<{
  open_id: string;
  display_name: string;
  avatar_url: string;
}> {
  const url = new URL(TIKTOK_USER_INFO_URL);
  url.searchParams.set("fields", "open_id,display_name,avatar_url");
  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await res.json();
  if (!res.ok || !data?.data?.user) {
    throw new Error(`TikTok user info failed: ${data?.error?.message ?? res.status}`);
  }
  return data.data.user;
}
