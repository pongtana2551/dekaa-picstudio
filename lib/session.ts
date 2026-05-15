import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export interface TikTokSession {
  open_id?: string;
  display_name?: string;
  avatar_url?: string;
  access_token?: string;
  refresh_token?: string;
  expires_at?: number;
  oauth_state?: string;
}

function getPassword(): string {
  const pw = process.env.SESSION_PASSWORD;
  if (!pw || pw.length < 32) {
    throw new Error(
      "SESSION_PASSWORD env var is required and must be at least 32 characters long.",
    );
  }
  return pw;
}

export function sessionOptions(): SessionOptions {
  return {
    password: getPassword(),
    cookieName: "dekaa_session",
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    },
  };
}

export async function getSession() {
  return getIronSession<TikTokSession>(cookies(), sessionOptions());
}
