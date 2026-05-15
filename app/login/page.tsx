import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "DeKAA PicStudio — Sign in with TikTok",
};

export default function LoginPage() {
  return (
    <>
      <SiteHeader subtitle="Sign in" />
      <main className="mx-auto max-w-xl px-6 py-16">
        <h1 className="text-3xl font-extrabold text-brand-deep">Sign in to DeKAA PicStudio</h1>
        <p className="mt-3 text-brand-deep/75">
          Connect your TikTok account so we can publish your AI-enhanced videos to your feed or inbox.
          We use TikTok&rsquo;s official Login Kit — your credentials never reach our servers.
        </p>

        <div className="mt-8 rounded-2xl border border-brand-deep/10 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-teal">
            Permissions we&rsquo;ll request
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-brand-deep/80">
            <li>
              <strong>user.info.basic</strong> — your TikTok display name and avatar, used to show who
              is signed in.
            </li>
            <li>
              <strong>video.publish</strong> — upload an AI-enhanced video to your TikTok account when
              you press &quot;Post to TikTok&quot;.
            </li>
          </ul>

          <a
            href="/api/auth/tiktok"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-brand-deep px-6 py-3 font-semibold text-white hover:bg-brand-ink"
          >
            Continue with TikTok
          </a>

          <p className="mt-3 text-xs text-brand-deep/60">
            By continuing you agree to our{" "}
            <Link href="/terms" className="underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
