import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DeKAA PicStudio",
  description:
    "DeKAA PicStudio enhances and upscales your photos and short videos with AI, then helps you publish them directly to TikTok.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/icon-192.png", sizes: "192x192" }],
  },
  metadataBase: new URL("https://dekaa-picstudio.vercel.app"),
  openGraph: {
    title: "DeKAA PicStudio",
    description: "AI image and video upscaling, with one-click TikTok publishing.",
    url: "https://dekaa-picstudio.vercel.app",
    siteName: "DeKAA PicStudio",
    images: ["/icon-512.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-brand-deep antialiased">{children}</body>
    </html>
  );
}
