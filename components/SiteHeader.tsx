import Image from "next/image";
import Link from "next/link";

export default function SiteHeader({ subtitle }: { subtitle?: string }) {
  return (
    <header className="border-b border-brand-deep/10 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="DeKAA PicStudio"
            width={44}
            height={44}
            priority
            className="rounded-md"
          />
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-bold text-brand-deep">DeKAA PicStudio</span>
            {subtitle ? (
              <span className="text-xs text-brand-deep/60">{subtitle}</span>
            ) : (
              <span className="text-xs text-brand-deep/60">
                AI Image &amp; Video Upscaling
              </span>
            )}
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          <Link href="/" className="text-brand-deep/70 hover:text-brand-deep">
            Home
          </Link>
          <Link href="/privacy" className="text-brand-deep/70 hover:text-brand-deep">
            Privacy
          </Link>
          <Link href="/terms" className="text-brand-deep/70 hover:text-brand-deep">
            Terms
          </Link>
          <Link
            href="/login"
            className="rounded-full bg-brand-deep px-4 py-2 font-semibold text-white hover:bg-brand-ink"
          >
            Login with TikTok
          </Link>
        </nav>
      </div>
    </header>
  );
}
