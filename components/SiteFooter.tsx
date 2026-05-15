import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-brand-deep/10 bg-brand-cream/40">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-8 text-sm text-brand-deep/70 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} DeKAA PicStudio. All rights reserved.</p>
        <nav className="flex items-center gap-5">
          <Link href="/privacy" className="hover:text-brand-deep">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-brand-deep">
            Terms of Service
          </Link>
          <a
            href="https://lin.ee/UR8KEUU"
            target="_blank"
            rel="noreferrer"
            className="hover:text-brand-deep"
          >
            Contact (LINE)
          </a>
        </nav>
      </div>
    </footer>
  );
}
