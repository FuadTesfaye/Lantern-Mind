import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Velorah" },
      { name: "description", content: "How we protect and manage your data." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title={
        <>
          Privacy <em className="not-italic text-muted-foreground">Policy</em>
        </>
      }
      intro="Your privacy is paramount. This policy explains how we handle your data with care and compliance."
    >
      <div className="prose-quiet liquid-glass max-w-4xl rounded-3xl p-8 md:p-12">
        <h2
          className="text-2xl text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          1. Data Minimization & Local Storage
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Many of the tools on Velorah, such as the Sleep Diary, Burnout Assessment, and Recovery
          Planner, run entirely in your browser. This means that{" "}
          <strong>no personal data from these tools is sent to our servers</strong>. It is stored
          locally on your device (using LocalStorage) to ensure maximum privacy.
        </p>

        <h2
          className="mt-10 text-2xl text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          2. Information We Collect
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          If you choose to create an account or interact with the community features, we collect
          only the minimal data necessary:
        </p>
        <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            <strong>Account Data:</strong> An email address and a securely hashed password.
          </li>
          <li>
            <strong>Profile Data:</strong> An optional pseudonym. We do not require your real name.
          </li>
          <li>
            <strong>User Content:</strong> Any stories, forum posts, or comments you choose to
            submit.
          </li>
        </ul>

        <h2
          className="mt-10 text-2xl text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          3. Anonymization and Safety
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          All user-submitted stories and posts are published anonymously by default. While our
          system records the author account internally to manage content, the public cannot see
          identifying details.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Our moderation team actively reviews content to remove any accidental personal identifiers
          before publication.
        </p>

        <h2
          className="mt-10 text-2xl text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          4. Emergency Intervention
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          While we prioritize privacy, user safety is our highest concern. If a post strongly
          indicates imminent risk of self-harm or harm to others, our moderators or automated
          systems may flag it. In rare, critical cases, we may use your account email to reach out
          with emergency resources.
        </p>

        <h2
          className="mt-10 text-2xl text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          5. Compliance and Security
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          We adhere to international data protection standards (such as GDPR). Sensitive data
          transmitted to our servers is encrypted in transit and at rest. We do not sell your
          personal data to third parties, advertisers, or data brokers.
        </p>

        <h2
          className="mt-10 text-2xl text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          6. Your Rights
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">You have the right to:</p>
        <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>Request a copy of the data we hold about you.</li>
          <li>Request the deletion of your account and all associated posts.</li>
          <li>Withdraw consent for data processing at any time.</li>
        </ul>

        <div className="mt-12 rounded-2xl bg-[var(--color-primary)]/5 p-6 border border-[var(--color-primary)]/20">
          <p className="text-sm text-[var(--color-primary)]/80">
            Last updated: August 2026. To exercise your data rights or ask a question, please
            contact us via the Reach Us page.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
