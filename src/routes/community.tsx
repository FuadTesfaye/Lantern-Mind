import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community & Stories — Velorah" },
      {
        name: "description",
        content:
          "Anonymous stories of recovery, discussion forums, and community support.",
      },
    ],
  }),
  component: CommunityPage,
});

const stories = [
  {
    id: 1,
    title: "Ahmed's Journey – Burnout to Balance",
    excerpt: "I thought it was just laziness. I couldn't focus on Salah, I couldn't read a page without my mind wandering. Turns out, it was severe burnout from working 60-hour weeks. Here is how I set boundaries...",
    author: "Anonymous Brother",
    tags: ["Burnout", "Faith"],
    date: "2 days ago",
  },
  {
    id: 2,
    title: "Zahra's Story – Overcoming Trauma",
    excerpt: "The nightmares wouldn't stop. I felt completely detached from my family. Taking the first step to speak to a counselor felt impossible, but reading the stories here gave me the courage...",
    author: "Z.M.",
    tags: ["Trauma", "Anxiety"],
    date: "1 week ago",
  },
];

const forumTopics = [
  {
    id: 1,
    title: "How do you maintain focus during Tahajjud when exhausted?",
    replies: 24,
    category: "Faith & Practice",
    lastActive: "Just now",
  },
  {
    id: 2,
    title: "Tips for dealing with brain fog at university?",
    replies: 15,
    category: "Cognitive Recovery",
    lastActive: "1 hour ago",
  },
  {
    id: 3,
    title: "Finding a culturally competent therapist in the UK",
    replies: 42,
    category: "Resources",
    lastActive: "3 hours ago",
  },
];

function CommunityPage() {
  return (
    <PageShell
      eyebrow="Community & Support"
      title={
        <>
          You are not <em className="not-italic text-muted-foreground">alone.</em>
        </>
      }
      intro="A safe, moderated space to share your journey and learn from others. All stories are anonymous. We enforce strict guidelines to ensure a supportive environment."
    >
      <div className="grid gap-12 lg:grid-cols-2">
        
        {/* Anonymous Stories */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2
              className="text-3xl text-foreground"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Stories of Recovery
            </h2>
            <button className="text-sm text-[var(--color-primary)] hover:underline">
              Submit a Story
            </button>
          </div>
          
          <div className="space-y-4">
            {stories.map((story) => (
              <article
                key={story.id}
                className="liquid-glass group rounded-2xl p-6 transition-transform hover:scale-[1.01]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{story.date}</p>
                  <div className="flex gap-2">
                    {story.tags.map((t) => (
                      <span key={t} className="rounded-full bg-[var(--color-primary)]/10 px-2 py-0.5 text-xs text-[var(--color-primary)]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="mt-3 text-lg font-medium text-foreground/90 group-hover:text-[var(--color-primary)]">
                  {story.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {story.excerpt}
                </p>
                <p className="mt-4 text-xs font-medium text-foreground/60">— {story.author}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Discussion Forums */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2
              className="text-3xl text-foreground"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Discussion Forums
            </h2>
            <button className="text-sm text-[var(--color-primary)] hover:underline">
              View All Topics
            </button>
          </div>

          <div className="liquid-glass rounded-3xl p-2">
            <div className="divide-y divide-border/40">
              {forumTopics.map((topic) => (
                <div key={topic.id} className="group p-4 transition-colors hover:bg-foreground/5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">
                        {topic.category}
                      </p>
                      <h4 className="mt-1 text-base font-medium text-foreground/90 group-hover:text-[var(--color-primary)]">
                        {topic.title}
                      </h4>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                      {topic.replies} replies
                    </span>
                    <span>Active {topic.lastActive}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-2 p-4 text-center border-t border-border/40">
              <button className="rounded-full bg-foreground/10 px-6 py-2 text-sm text-foreground hover:bg-foreground/20 transition-colors">
                Start a Discussion
              </button>
            </div>
          </div>
          
          <div className="mt-6 rounded-2xl border border-border/40 bg-foreground/5 p-5 text-sm text-muted-foreground">
            <strong>Community Guidelines:</strong> No harassment, hate speech, or graphic details of self-harm. Disagreements must be civil. Do not post personal identifying information.
          </div>
        </section>

      </div>
    </PageShell>
  );
}
