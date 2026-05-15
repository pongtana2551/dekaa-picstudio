# DeKAA PicStudio — TikTok Integration

Public website for the DeKAA PicStudio service. Provides:

- A clear product landing page.
- "Login with TikTok" via the official Login Kit.
- A signed-in dashboard for uploading an AI-enhanced video and posting it to TikTok through the Content Posting API.
- Privacy Policy and Terms of Service pages required for the TikTok app review.

## Local development

```bash
npm install
cp .env.example .env.local
# fill TIKTOK_CLIENT_KEY / TIKTOK_CLIENT_SECRET / SESSION_PASSWORD
npm run dev
```

Open http://localhost:3000 and click **Login with TikTok**.

When running locally, set `TIKTOK_REDIRECT_URI=http://localhost:3000/api/auth/callback` and add the same URI in the TikTok developer portal redirect URIs.

## Deploying to Vercel

1. Push this folder to a GitHub repo.
2. Import the repo on Vercel (Project name: `dekaa-picstudio`).
3. Set the following Environment Variables on the Vercel project (Production):
   - `TIKTOK_CLIENT_KEY`
   - `TIKTOK_CLIENT_SECRET`
   - `TIKTOK_REDIRECT_URI=https://dekaa-picstudio.vercel.app/api/auth/callback`
   - `TIKTOK_POST_MODE=INBOX` (use `DIRECT` only after audit is approved)
   - `SESSION_PASSWORD` — 32+ random characters (e.g. `openssl rand -hex 32`)
4. Deploy. Verify the live URL is `https://dekaa-picstudio.vercel.app`.

## TikTok developer portal — required settings

| Field                | Value                                                          |
| -------------------- | -------------------------------------------------------------- |
| App name             | DeKAA PicStudio                                                |
| App icon             | `public/icon-1024.png` (same image as `/logo.png` on the site) |
| Website URL          | https://dekaa-picstudio.vercel.app                             |
| Terms of Service URL | https://dekaa-picstudio.vercel.app/terms                       |
| Privacy Policy URL   | https://dekaa-picstudio.vercel.app/privacy                     |
| Redirect URI         | https://dekaa-picstudio.vercel.app/api/auth/callback           |
| Scopes               | `user.info.basic`, `video.publish`                             |
