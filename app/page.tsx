import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6">
        <section className="grid gap-10 py-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-teal">
              AI Image &amp; Video Upscaling
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight text-brand-deep sm:text-5xl">
              Make your blurry product photos and clips look professional — then post them to TikTok.
            </h1>
            <p className="mt-5 text-lg text-brand-deep/75">
              DeKAA PicStudio enhances low-resolution images and short videos using AI, then publishes
              the upscaled result straight to your TikTok account via the official Content Posting API.
              Built for online sellers who need crisp visuals fast.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/login"
                className="rounded-full bg-brand-deep px-6 py-3 font-semibold text-white shadow-sm hover:bg-brand-ink"
              >
                Login with TikTok
              </Link>
              <a
                href="https://lin.ee/UR8KEUU"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-brand-deep/30 px-6 py-3 font-semibold text-brand-deep hover:border-brand-deep"
              >
                Talk to us on LINE
              </a>
            </div>
            <p className="mt-4 text-xs text-brand-deep/60">
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
          <div className="flex justify-center">
            <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-3xl bg-gradient-to-br from-brand-cream to-white p-6 shadow-lg ring-1 ring-brand-deep/10">
              <Image
                src="/logo.png"
                alt="DeKAA PicStudio logo"
                fill
                className="object-contain p-8"
                priority
              />
            </div>
          </div>
        </section>

        <section className="grid gap-6 py-8 sm:grid-cols-3">
          {[
            {
              title: "1. Connect TikTok",
              body: "Sign in once with your TikTok account using the official Login Kit. We never see your password.",
            },
            {
              title: "2. Upload & enhance",
              body: "Drop in a low-res photo or short clip. Our AI upscales detail, sharpens edges and rebuilds faces.",
            },
            {
              title: "3. Post to TikTok",
              body: "Send the enhanced video straight to your TikTok inbox or feed via the Content Posting API.",
            },
          ].map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-brand-deep/10 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-brand-deep">{step.title}</h3>
              <p className="mt-2 text-sm text-brand-deep/75">{step.body}</p>
            </div>
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
