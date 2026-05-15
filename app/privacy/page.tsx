import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "DeKAA PicStudio Privacy Policy",
  description:
    "How DeKAA PicStudio collects, uses, and protects information when you connect your TikTok account.",
};

const LAST_UPDATED = "May 15, 2026";

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader subtitle="Privacy Policy" />
      <main className="mx-auto max-w-3xl px-6 py-14">
        <h1 className="text-4xl font-extrabold text-brand-deep">
          DeKAA PicStudio Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-brand-deep/60">Last updated: {LAST_UPDATED}</p>

        <div className="prose prose-slate mt-8 max-w-none text-brand-deep/85">
          <p>
            This Privacy Policy describes how DeKAA PicStudio (&ldquo;DeKAA PicStudio&rdquo;,
            &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses, stores and shares information when
            you use our website at{" "}
            <a href="https://dekaa-picstudio.vercel.app">dekaa-picstudio.vercel.app</a> and the
            related image and video enhancement services (the &ldquo;Service&rdquo;).
          </p>

          <h2>1. Information we collect</h2>
          <p>When you use the Service we may collect the following information:</p>
          <ul>
            <li>
              <strong>TikTok account information.</strong> When you choose to &ldquo;Login with
              TikTok&rdquo;, TikTok shares with us your TikTok open ID, display name and avatar
              through the official TikTok Login Kit. We never see or store your TikTok password.
            </li>
            <li>
              <strong>OAuth tokens.</strong> TikTok issues us an access token and refresh token so
              that we can publish content to your TikTok account on your behalf. These tokens are
              stored in an encrypted, HTTP-only session cookie on your device and on our server-side
              session store.
            </li>
            <li>
              <strong>Media you upload.</strong> Images and short videos that you upload for
              enhancement are processed on our servers. We retain the original and enhanced files
              only for as long as needed to deliver the result and the related TikTok upload, and
              they are deleted within 30 days.
            </li>
            <li>
              <strong>Technical logs.</strong> Standard request logs (IP address, browser type,
              timestamps) so we can keep the Service secure and reliable.
            </li>
          </ul>

          <h2>2. How we use information</h2>
          <ul>
            <li>To authenticate you through TikTok Login Kit.</li>
            <li>
              To process the images and videos you upload and return the AI-enhanced result to you.
            </li>
            <li>
              To upload your enhanced video to your own TikTok account using the TikTok Content
              Posting API, only when you explicitly press &ldquo;Post to TikTok&rdquo;.
            </li>
            <li>To monitor and improve service quality and detect abuse.</li>
          </ul>

          <h2>3. How we share information</h2>
          <p>
            We do not sell your personal information. We share information only with:
          </p>
          <ul>
            <li>
              <strong>TikTok</strong>, through its official OAuth and Content Posting API, when you
              choose to post content;
            </li>
            <li>
              <strong>Cloud infrastructure providers</strong> (such as Vercel for hosting) that
              process data on our behalf under appropriate contractual safeguards;
            </li>
            <li>
              <strong>Authorities</strong>, when required by law or to protect the safety of users.
            </li>
          </ul>

          <h2>4. Data retention</h2>
          <p>
            OAuth tokens are retained for as long as your TikTok connection is active. You can
            disconnect at any time by signing out, or by revoking DeKAA PicStudio&rsquo;s access in
            your TikTok account settings, in which case we delete the associated tokens within 7
            days. Uploaded media is deleted within 30 days.
          </p>

          <h2>5. Your rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal information by
            contacting us through the channels below. If you are based in the EU or UK, you also
            have rights under the GDPR including the right to lodge a complaint with your local
            supervisory authority.
          </p>

          <h2>6. Security</h2>
          <p>
            We use HTTPS for all traffic, store OAuth tokens in encrypted form, and limit internal
            access on a need-to-know basis. No method of transmission over the internet is 100%
            secure, but we work to protect your information using industry-standard safeguards.
          </p>

          <h2>7. Children</h2>
          <p>
            DeKAA PicStudio is not directed to children under 13 and we do not knowingly collect
            personal information from them.
          </p>

          <h2>8. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will post the updated policy on
            this page with a new &ldquo;Last updated&rdquo; date.
          </p>

          <h2>9. Contact us</h2>
          <p>
            Questions or requests about this Privacy Policy can be sent to{" "}
            <a href="mailto:privacy@dekaapicstudio.com">privacy@dekaapicstudio.com</a> or via our
            official LINE channel at{" "}
            <a href="https://lin.ee/UR8KEUU" target="_blank" rel="noreferrer">
              @dekaapicstudio
            </a>
            .
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
