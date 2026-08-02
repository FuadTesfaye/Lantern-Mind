import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Velorah" },
      { name: "description", content: "Terms of Service and Medical Disclaimer." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title={
        <>
          Terms of <em className="not-italic text-muted-foreground">Service</em>
        </>
      }
      intro="Please read these terms carefully. By using Velorah, you agree to these terms."
    >
      <div className="prose-quiet liquid-glass max-w-4xl rounded-3xl p-8 md:p-12">
        <h2
          className="text-2xl text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          1. Medical Disclaimer (Not Therapy)
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Velorah is an educational and peer-support platform.{" "}
          <strong>
            It is not a substitute for professional medical advice, diagnosis, or treatment.
          </strong>{" "}
          The content provided—including assessments, trackers, articles, and community stories—is
          intended for general information and self-help purposes only.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          If you are experiencing a medical emergency, thoughts of self-harm, or suicidal ideation,
          please immediately call your local emergency services or a crisis helpline.
        </p>

        <h2
          className="mt-10 text-2xl text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          2. Faith-Based Content
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Our platform integrates Islamic spiritual guidance alongside evidence-based psychological
          principles. This content is provided for spiritual solace and personal reflection. It does
          not replace clinical therapy. We draw from respected scholarship, but individual
          interpretations of faith may vary.
        </p>

        <h2
          className="mt-10 text-2xl text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          3. Community and User Conduct
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Velorah hosts community forums and anonymous story sharing. To maintain a safe
          environment, you agree not to:
        </p>
        <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>Post content that is abusive, harassing, or discriminatory.</li>
          <li>Share graphic descriptions of self-harm, violence, or explicit material.</li>
          <li>Provide medical or psychiatric diagnoses to other users.</li>
          <li>Share personal identifying information (yours or others) in public forums.</li>
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          We reserve the right to remove any content and terminate accounts that violate these
          community guidelines without prior notice.
        </p>

        <h2
          className="mt-10 text-2xl text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          4. Privacy and Anonymity
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          We prioritize your privacy. Community stories and forum posts are published anonymously by
          default unless you choose otherwise. However, maintaining absolute anonymity online cannot
          be guaranteed. Please refer to our{" "}
          <a href="/privacy" className="text-[var(--color-primary)] hover:underline">
            Privacy Policy
          </a>{" "}
          for detailed information on how we handle your data.
        </p>

        <h2
          className="mt-10 text-2xl text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          5. Intellectual Property
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          All original content, including articles, brain map designs, and taxonomy structures, are
          the property of Velorah. You may not reproduce, distribute, or create derivative works
          from our content without explicit permission.
        </p>

        <h2
          className="mt-10 text-2xl text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          6. Changes to Terms
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          We may update these terms periodically to reflect changes in our platform or legal
          requirements. Continued use of Velorah after such changes constitutes acceptance of the
          new terms.
        </p>

        <div className="mt-12 rounded-2xl bg-[var(--color-primary)]/5 p-6 border border-[var(--color-primary)]/20">
          <p className="text-sm text-[var(--color-primary)]/80">
            Last updated: August 2026. For questions regarding these terms, please contact us via
            the Reach Us page.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
