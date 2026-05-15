import { redirect } from "next/navigation";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PostForm from "./PostForm";
import { getSession } from "@/lib/session";

export const metadata = {
  title: "DeKAA PicStudio — Dashboard",
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session.access_token) {
    redirect("/login");
  }

  return (
    <>
      <SiteHeader subtitle="Dashboard" />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="flex items-center gap-4 rounded-2xl border border-brand-deep/10 bg-white p-5 shadow-sm">
          {session.avatar_url ? (
            <Image
              src={session.avatar_url}
              alt={session.display_name ?? "TikTok user"}
              width={56}
              height={56}
              className="rounded-full"
              unoptimized
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-deep/10 text-brand-deep">
              {(session.display_name ?? "?").slice(0, 1).toUpperCase()}
            </div>
          )}
          <div className="flex-1">
            <p className="text-sm text-brand-deep/60">Signed in to TikTok as</p>
            <p className="text-lg font-bold text-brand-deep">
              {session.display_name ?? "TikTok user"}
            </p>
            <p className="text-xs text-brand-deep/50">open_id: {session.open_id}</p>
          </div>
          <form action="/api/auth/logout" method="post">
            <button
              type="submit"
              className="rounded-full border border-brand-deep/30 px-4 py-2 text-sm font-semibold text-brand-deep hover:border-brand-deep"
            >
              Sign out
            </button>
          </form>
        </div>

        <section className="mt-10">
          <h1 className="text-3xl font-extrabold text-brand-deep">
            Upload and post an enhanced video
          </h1>
          <p className="mt-2 text-brand-deep/75">
            Choose a short MP4 video. We send it to your TikTok account through the official
            Content Posting API. In sandbox mode the video lands in your TikTok inbox for you to
            review and publish from the app.
          </p>
          <div className="mt-6">
            <PostForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
