import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "DeKAA PicStudio Terms of Service",
  description:
    "The terms that govern your use of the DeKAA PicStudio website and AI image and video enhancement service.",
};

const LAST_UPDATED = "May 15, 2026";

export default function TermsPage() {
  return (
    <>
      <SiteHeader subtitle="Terms of Service" />
      <main className="mx-auto max-w-3xl px-6 py-14">
        <h1 className="text-4xl font-extrabold text-brand-deep">
          DeKAA PicStudio Terms of Service
        </h1>
        <p className="mt-2 text-sm text-brand-deep/60">Last updated: {LAST_UPDATED}</p>

        <div className="prose prose-slate mt-8 max-w-none text-brand-deep/85">
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the DeKAA
            PicStudio website at{" "}
            <a href="https://dekaa-picstudio.vercel.app">dekaa-picstudio.vercel.app</a> and the
            related AI image and video enhancement services (the &ldquo;Service&rdquo;). By
            accessing or using the Service you agree to be bound by these Terms.
          </p>

          <h2>1. Eligibility and account</h2>
          <p>
            You must be at least 13 years old, and old enough to form a binding contract in your
            country, to use the Service. The Service authenticates you through TikTok&rsquo;s
            official Login Kit; you are responsible for keeping your TikTok account secure.
          </p>

          <h2>2. Description of the Service</h2>
          <p>
            DeKAA PicStudio uses artificial-intelligence models to upscale and enhance still images
            and short videos. With your explicit consent, the Service can upload an enhanced video
            to your own TikTok account using the TikTok Content Posting API.
          </p>

          <h2>3. Your content</h2>
          <p>
            You retain all rights to the images and videos you upload (&ldquo;Your Content&rdquo;).
            You grant us a limited, non-exclusive license to process Your Content solely to provide
            the Service and to deliver the enhanced result back to you, including, when you choose,
            uploading the enhanced video to your TikTok account through the Content Posting API.
          </p>

          <h2>4. Acceptable use</h2>
          <p>You agree not to use the Service to:</p>
          <ul>
            <li>Upload content you do not have the right to use;</li>
            <li>
              Upload content that is unlawful, infringing, defamatory, sexually explicit involving
              minors, or otherwise prohibited by TikTok&rsquo;s Community Guidelines;
            </li>
            <li>
              Attempt to gain unauthorized access to other users&rsquo; accounts or to our systems;
            </li>
            <li>Use the Service to send spam or to interfere with normal operation;</li>
            <li>
              Reverse engineer, scrape, or otherwise misuse the Service or the underlying TikTok
              APIs.
            </li>
          </ul>

          <h2>5. TikTok integration</h2>
          <p>
            When you connect your TikTok account, you authorize DeKAA PicStudio to publish content
            to your TikTok account on your behalf using the Content Posting API. You can revoke this
            authorization at any time from your TikTok account settings or by signing out of the
            Service. Your use of TikTok is also subject to TikTok&rsquo;s own terms.
          </p>

          <h2>6. Fees</h2>
          <p>
            The current Service is offered to early users free of charge or via credits that may be
            issued from time to time. We may introduce paid plans in the future, in which case the
            applicable fees will be disclosed before you incur any charge.
          </p>

          <h2>7. Intellectual property</h2>
          <p>
            All software, design, trademarks and content on the DeKAA PicStudio website, other than
            Your Content, are owned by DeKAA PicStudio or its licensors and are protected by
            applicable laws. You may not copy or redistribute them without prior written consent.
          </p>

          <h2>8. Disclaimers</h2>
          <p>
            The Service is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis
            without warranties of any kind, whether express or implied. We do not guarantee that the
            Service will be uninterrupted, error-free, or that AI enhancements will be suitable for
            every use case.
          </p>

          <h2>9. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, DeKAA PicStudio will not be liable for any
            indirect, incidental, special, consequential or punitive damages arising out of or in
            connection with your use of the Service.
          </p>

          <h2>10. Termination</h2>
          <p>
            You may stop using the Service at any time. We may suspend or terminate your access if
            you violate these Terms, or if required by applicable law, with notice where practical.
          </p>

          <h2>11. Changes</h2>
          <p>
            We may update these Terms from time to time. We will post the updated Terms on this page
            with a new &ldquo;Last updated&rdquo; date. Continued use after changes means you accept
            the updated Terms.
          </p>

          <h2>12. Governing law</h2>
          <p>
            These Terms are governed by the laws of the Kingdom of Thailand, without regard to its
            conflict-of-laws principles. Any dispute will be submitted to the competent courts of
            Bangkok, Thailand.
          </p>

          <h2>13. Contact</h2>
          <p>
            Questions about these Terms can be sent to{" "}
            <a href="mailto:hello@dekaapicstudio.com">hello@dekaapicstudio.com</a> or via our
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
