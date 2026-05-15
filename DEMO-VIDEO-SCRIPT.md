# TikTok App Review — Demo Video Script

Reviewer requirement (verbatim):

> The demo video should show the complete end-to-end flow of the integrations
> with TikTok. Please demonstrate with sandbox. All selected products and scopes
> must be clearly demonstrated in the video.

We selected exactly **two scopes**, so the video must visibly exercise both:

| Scope             | How the video proves it                                              |
| ----------------- | -------------------------------------------------------------------- |
| `user.info.basic` | Dashboard header shows the signed-in user's display name and avatar. |
| `video.publish`   | An MP4 is uploaded and lands in the TikTok account's draft inbox.    |

Target length: **90–150 seconds**. Resolution: at least **1280×720**.

## What you need before recording

1. The TikTok app is created in the developer portal with status **Sandbox**.
2. Your TikTok account (`@dekaapicstudio`) is added under **Sandbox > Members**
   so it can authorize a sandbox app. Without this, TikTok will reject the
   OAuth attempt.
3. Vercel environment variables are filled in with the real `TIKTOK_CLIENT_KEY`
   and `TIKTOK_CLIENT_SECRET`, and the site has been redeployed.
4. A short sample MP4 (10–30 seconds, < 50 MB) to upload during the demo. The
   existing `creator_p1_seller.mp4` in the project root works.
5. A screen recorder. Recommended (Windows):
   - **Xbox Game Bar** (built-in: press `Win + G`). Records the active window
     to `Videos\Captures\` as MP4.
   - **OBS Studio** if you need narration + webcam picture-in-picture.

## Storyboard (read this out loud, or burn captions in afterwards)

### Scene 1 — Website tour (0:00–0:20)

1. Open Edge/Chrome in a clean window. Navigate to
   `https://dekaa-picstudio.vercel.app`.
2. **Point with your cursor at the browser tab** — the favicon shows the DeKAA
   whale logo. Reviewer requirement: favicon visible on tab.
3. **Point at the header** — the DeKAA logo + "DeKAA PicStudio" text are at
   the top-left.
4. Click the **Privacy** link in the header. Show the page title
   `"DeKAA PicStudio Privacy Policy"` at the top of the page.
5. Click **Terms**. Show the page title
   `"DeKAA PicStudio Terms of Service"`.
6. Click the DeKAA logo to return home.

### Scene 2 — Initiate login (0:20–0:35)

7. On the homepage, click the **"Login with TikTok"** button in the header
   (or in the hero CTA).
8. On `/login`, briefly point at the **"Permissions we'll request"** list —
   `user.info.basic` and `video.publish`. Reviewer requirement: scopes
   declared.
9. Click **"Continue with TikTok"**.

### Scene 3 — TikTok OAuth authorize (0:35–0:55)

10. The browser is now on `https://www.tiktok.com/v2/auth/authorize/...`.
    Show this URL clearly in the address bar.
11. Authorize the app with the TikTok sandbox member account
    (`@dekaapicstudio`).
12. The browser redirects back to
    `https://dekaa-picstudio.vercel.app/api/auth/callback?code=...` and then
    to `/dashboard`.

### Scene 4 — Dashboard proves `user.info.basic` (0:55–1:05)

13. The dashboard shows the user card with the **TikTok display name** and
    **avatar** from the sandbox account. **Point at it** — this is the
    `user.info.basic` scope being used.

### Scene 5 — Upload & publish to prove `video.publish` (1:05–1:50)

14. Click the **video file** input and pick the sample MP4
    (`creator_p1_seller.mp4`).
15. Type a short caption, e.g.
    `"AI-upscaled product clip — DeKAA PicStudio sandbox demo"`.
16. Click **"Post to TikTok"**.
17. The button shows `"Uploading… NN%"` while the bytes go directly to
    TikTok's upload URL. Wait until it switches to `"Publishing to TikTok…"`
    and then to the green success banner.
18. **Point at the success banner** — it says
    `"Open the TikTok app to find your draft in the inbox and tap Post."`
    plus a `publish_id`.

### Scene 6 — Verify on TikTok (1:50–2:10)

19. Switch to the **TikTok mobile app** on your phone (with the same
    `@dekaapicstudio` account signed in). The phone screen can be filmed
    directly or mirrored.
20. Open the **Inbox** → **From DeKAA PicStudio** notification. Tap it.
21. Show the uploaded video appearing in the drafts/inbox. Do **not** tap
    Post — reviewers only need to see that the API delivered the file.

### Scene 7 — Sign out (2:10–end)

22. Switch back to the browser. Click **"Sign out"** on the dashboard.
23. You're returned to the homepage. End the recording.

## Submission upload

- File: MP4, H.264, max 50 MB.
- In the TikTok developer portal review form, upload this video to the
  **Demo Video** field.
- In the **Note for reviewer** textbox, paste the line:

  > End-to-end sandbox flow on https://dekaa-picstudio.vercel.app .
  > Scenes 4 and 5 demonstrate `user.info.basic` and `video.publish` respectively.
  > No other scopes are requested.
