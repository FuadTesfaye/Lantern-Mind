import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/reach-us")({
  head: () => ({
    meta: [
      { title: "Reach Us — write to Velorah" },
      {
        name: "description",
        content:
          "Write to Velorah with a question, a correction, or your own story. Replies are slow and human. Urgent distress needs a doctor or a crisis line.",
      },
      { property: "og:title", content: "Reach Us — write to Velorah" },
      {
        property: "og:description",
        content:
          "A quiet inbox. Questions, corrections, and stories welcome. Replies are slow and human.",
      },
    ],
  }),
  component: ReachUsPage,
});

function ReachUsPage() {
  return (
    <PageShell
      eyebrow="Reach Us"
      title={
        <>
          Say what you need to say.{" "}
          <em className="not-italic text-muted-foreground">
            There is no rush here.
          </em>
        </>
      }
      intro="One inbox, read by a person. Questions about a pillar, a correction to something we got wrong, or just an account of your own fog — all of it is welcome, and none of it is stored anywhere else."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="liquid-glass rounded-3xl px-8 py-12 md:px-12">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Write to
          </p>
          <a
            href="mailto:hello@velorah.studio"
            className="mt-6 block text-3xl leading-tight tracking-[-1px] text-foreground transition-opacity hover:opacity-80 sm:text-4xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            hello@velorah.studio
          </a>
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
            Replies usually take a few days. Nothing you send is added to a list, sold,
            or answered by a machine.
          </p>
        </div>

        <div className="liquid-glass rounded-3xl px-8 py-12 md:px-12">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            If it is urgent
          </p>
          <p
            className="mt-6 text-2xl leading-snug tracking-[-0.5px] text-foreground/90 sm:text-3xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Please don't wait for an email.
          </p>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            If you are in crisis, or thinking about harming yourself, contact your local
            emergency number or a crisis line in your country now. This site is
            educational writing; it cannot see you, and it cannot help quickly enough.
            A doctor or a crisis counsellor can.
          </p>
        </div>
      </div>

      <div className="liquid-glass mt-5 rounded-3xl px-8 py-12 md:px-12">
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
          What helps a reply
        </p>
        <ul className="mt-6 max-w-2xl space-y-4 text-base leading-loose text-muted-foreground">
          <li className="border-l border-border/60 pl-5">
            Which pillar or article you are writing about.
          </li>
          <li className="border-l border-border/60 pl-5">
            What you have already tried, and for how long.
          </li>
          <li className="border-l border-border/60 pl-5">
            What you are actually hoping for — an answer, a correction, or simply to be
            read.
          </li>
        </ul>
      </div>
    </PageShell>
  );
}
