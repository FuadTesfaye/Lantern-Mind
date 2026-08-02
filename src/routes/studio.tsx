import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { CareNote } from "@/components/care-note";
import { taxonomy } from "@/content/taxonomy";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "The Studio — Velorah's Library of Clarity" },
      {
        name: "description",
        content:
          "The full framework: understand what's happening, rebuild the body, structure the day, and navigate your emotions.",
      },
      { property: "og:title", content: "The Studio — Velorah's Library of Clarity" },
      {
        property: "og:description",
        content:
          "A structured, compassionate path out of brain fog, which you can walk one step at a time.",
      },
    ],
  }),
  component: StudioPage,
});

function StudioPage() {
  return (
    <PageShell
      eyebrow="The Studio"
      title={
        <>
          A path you can walk{" "}
          <em className="not-italic text-muted-foreground">one step at a time.</em>
        </>
      }
      intro="Explore our library of evidence-based resources. Each section is written to help you understand your mind, rebuild your body, and navigate your daily life."
    >
      <Link
        to="/experiences"
        className="liquid-glass mb-5 grid gap-6 rounded-3xl px-8 py-10 transition-transform hover:scale-[1.005] md:grid-cols-[6rem_1fr] md:px-12"
      >
        <span className="text-sm tracking-[0.28em] text-muted-foreground">
          MAP
        </span>
        <span>
          <span
            className="block text-3xl leading-tight tracking-[-1px] text-foreground sm:text-4xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Lived Experiences{" "}
            <em className="not-italic text-muted-foreground">atlas.</em>
          </span>
          <span className="mt-4 block max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            A detailed map of trauma and shared human wounds — named with felt sense,
            not clinical boxes — so visitors can find the words they never had.
          </span>
          <span className="mt-6 block text-sm text-muted-foreground">
            6 domains · childhood, relational, systemic, inner, faith, purpose
          </span>
        </span>
      </Link>

      <div className="grid gap-5">
        {taxonomy.map((category, idx) => (
          <Link
            key={category.slug}
            to="/taxonomy/$slug"
            params={{ slug: category.slug }}
            className="liquid-glass grid gap-6 rounded-3xl px-8 py-10 transition-transform hover:scale-[1.005] md:grid-cols-[6rem_1fr] md:px-12"
          >
            <span className="text-sm tracking-[0.28em] text-muted-foreground">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <span>
              <span
                className="block text-3xl leading-tight tracking-[-1px] text-foreground sm:text-4xl"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {category.title.split(" ").slice(0, -1).join(" ")}{" "}
                <em className="not-italic text-muted-foreground">{category.title.split(" ").slice(-1)[0]}</em>
              </span>
              <span className="mt-4 block max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {category.summary}
              </span>
              <span className="mt-6 block text-sm text-muted-foreground">
                {category.topics.length} topics
              </span>
            </span>
          </Link>
        ))}
      </div>

      <CareNote />
    </PageShell>
  );
}
