"use client";

import { useState } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "uploading"; pct: number }
  | { kind: "publishing"; publish_id: string }
  | { kind: "success"; publish_id: string; mode: string }
  | { kind: "error"; message: string };

export default function PostForm() {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setStatus({ kind: "error", message: "Please choose a video file." });
      return;
    }
    setStatus({ kind: "uploading", pct: 0 });

    try {
      // 1. Ask our server to init the TikTok upload session
      const initRes = await fetch("/api/post-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          video_size: file.size,
          caption,
        }),
      });
      const init = await initRes.json();
      if (!initRes.ok) throw new Error(init.error ?? "Failed to init upload");

      const { upload_url, publish_id, mode } = init;

      // 2. PUT the video bytes directly to TikTok's upload URL
      await uploadToTikTok(upload_url, file, (pct) =>
        setStatus({ kind: "uploading", pct }),
      );

      setStatus({ kind: "publishing", publish_id });

      // 3. Poll our server for publish status
      const final = await pollStatus(publish_id);
      setStatus({ kind: "success", publish_id, mode: final.mode ?? mode });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setStatus({ kind: "error", message });
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-brand-deep/10 bg-white p-6 shadow-sm">
      <div>
        <label className="block text-sm font-semibold text-brand-deep">Video file (MP4)</label>
        <input
          type="file"
          accept="video/mp4"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="mt-2 block w-full rounded border border-brand-deep/20 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-brand-deep">Caption</label>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows={3}
          maxLength={2200}
          placeholder="Add a caption for your TikTok post…"
          className="mt-2 block w-full rounded border border-brand-deep/20 px-3 py-2 text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={status.kind === "uploading" || status.kind === "publishing"}
        className="w-full rounded-full bg-brand-deep px-6 py-3 font-semibold text-white hover:bg-brand-ink disabled:opacity-60"
      >
        {status.kind === "uploading"
          ? `Uploading… ${status.pct}%`
          : status.kind === "publishing"
            ? "Publishing to TikTok…"
            : "Post to TikTok"}
      </button>

      <StatusBanner status={status} />
    </form>
  );
}

function StatusBanner({ status }: { status: Status }) {
  if (status.kind === "idle") return null;
  if (status.kind === "error") {
    return (
      <p className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {status.message}
      </p>
    );
  }
  if (status.kind === "success") {
    return (
      <div className="rounded border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        <p className="font-semibold">Sent to TikTok!</p>
        <p className="mt-1">
          {status.mode === "INBOX"
            ? "Open the TikTok app to find your draft in the inbox and tap Post."
            : "Your video has been published to your TikTok feed."}
        </p>
        <p className="mt-1 text-xs text-emerald-700/70">publish_id: {status.publish_id}</p>
      </div>
    );
  }
  return (
    <p className="rounded border border-brand-deep/20 bg-brand-cream px-4 py-3 text-sm text-brand-deep">
      {status.kind === "uploading"
        ? `Uploading to TikTok… ${status.pct}%`
        : `Publishing… (id: ${status.publish_id})`}
    </p>
  );
}

function uploadToTikTok(url: string, file: File, onProgress: (pct: number) => void) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url);
    xhr.setRequestHeader("Content-Type", "video/mp4");
    xhr.setRequestHeader(
      "Content-Range",
      `bytes 0-${file.size - 1}/${file.size}`,
    );
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else reject(new Error(`TikTok upload failed (${xhr.status})`));
    };
    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.send(file);
  });
}

async function pollStatus(publishId: string): Promise<{ status: string; mode?: string }> {
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 2000));
    const res = await fetch(`/api/post-video?publish_id=${encodeURIComponent(publishId)}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "status_poll_failed");
    if (data.status === "PUBLISH_COMPLETE" || data.status === "SEND_TO_USER_INBOX") {
      return { status: data.status, mode: data.mode };
    }
    if (data.status === "FAILED") {
      throw new Error(`TikTok publish failed: ${data.fail_reason ?? "unknown"}`);
    }
  }
  throw new Error("Timed out waiting for TikTok to finish processing the video.");
}
