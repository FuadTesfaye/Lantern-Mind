import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { taxonomy } from "@/content/taxonomy";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { BrainCircuit, Moon, HeartPulse, Sparkles, MessageCircle } from "lucide-react";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lantern-Mind® — You are not broken. You are not alone." },
      {
        name: "description",
        content:
          "Your mind isn’t your enemy. You’re not broken – you’re just overwhelmed. Learn why you feel foggy, anxious or tired, and discover evidence-based ways to recover focus, memory, and motivation.",
      },
      {
        property: "og:title",
        content: "Lantern-Mind® — Your mind isn't your enemy.",
      },
      {
        property: "og:description",
        content:
          "Evidence-based tips and support for focus, memory, mood, and meaning. There is a way forward, step by step.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { data: recentVoices, isLoading: voicesLoading } = useQuery({
    queryKey: ["recent_voices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("community_posts")
        .select("slug, title, excerpt, author, published_at")
        .eq("status", "Approved")
        .order("published_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      return data || [];
    },
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        <video
          className="absolute inset-0 z-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>

        <SiteNav />

        <div className="relative z-10 flex flex-col items-center px-6 py-[90px] pb-40 pt-32 text-center">
          <h1
            className="animate-fade-rise max-w-7xl text-5xl font-normal leading-[0.95] tracking-[-2.46px] sm:text-7xl md:text-8xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Your mind isn't your <em className="not-italic text-muted-foreground">enemy.</em> You're
            not broken – you're just{" "}
            <em className="not-italic text-muted-foreground">overwhelmed.</em>
          </h1>

          <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Learn why you feel foggy, anxious or tired, and discover evidence-based ways to recover
            focus, memory, and motivation.
          </p>

          <Link
            to="/studio"
            className="liquid-glass animate-fade-rise-delay-2 mt-12 cursor-pointer rounded-full px-14 py-5 text-base text-foreground transition-transform hover:scale-[1.03]"
          >
            Begin Journey
          </Link>
        </div>
      </section>

      {/* Bold Artistic Quote Section */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-8 py-20 md:py-32">
        <div className="liquid-glass relative overflow-hidden rounded-[3rem] p-12 md:p-20 text-center border border-border/30 shadow-2xl shadow-foreground/5 before:absolute before:inset-0 before:bg-gradient-to-br before:from-foreground/5 before:to-transparent">
          <div className="relative z-10">
            <span
              className="text-6xl text-foreground/20 leading-none absolute -top-8 -left-4"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              "
            </span>
            <h2
              className="text-3xl md:text-5xl font-medium leading-[1.15] tracking-tight text-foreground"
              style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}
            >
              The people who help others for decades aren't the ones who ignore their own wounds.
              <br />
              <br />
              <span className="text-foreground/70">
                They're the ones who gradually heal enough that their wounds stop controlling them.
              </span>
            </h2>
          </div>
        </div>
      </section>

      {/* Featured Journal Cards */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-8 pb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">The Journal</p>
            <h2
              className="mt-4 max-w-2xl text-4xl font-normal leading-[1.02] tracking-[-1.4px] sm:text-5xl"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Notes on <em className="not-italic text-muted-foreground">living.</em>
            </h2>
          </div>
          <Link
            to="/journal"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors border-b border-border pb-1"
          >
            Read all entries →
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/journal/$slug"
            params={{ slug: "fog-and-focus" }}
            className="liquid-glass group rounded-3xl p-8 transition-all hover:-translate-y-2 hover:bg-foreground/5 border border-border/40 flex flex-col min-h-[320px]"
          >
            <span className="text-xs text-muted-foreground mb-6 block">April 12</span>
            <h3
              className="text-2xl text-foreground mb-4 leading-snug"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              On the architecture of brain fog
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              Why forgetting isn't a failure of character, but a physiological response to
              overwhelm.
            </p>
            <span className="text-xs uppercase tracking-widest text-foreground font-medium group-hover:underline mt-8 block">
              Read →
            </span>
          </Link>

          <Link
            to="/journal/$slug"
            params={{ slug: "grief-in-the-body" }}
            className="liquid-glass group rounded-3xl p-8 transition-all hover:-translate-y-2 hover:bg-foreground/5 border border-border/40 flex flex-col min-h-[320px]"
          >
            <span className="text-xs text-muted-foreground mb-6 block">March 28</span>
            <h3
              className="text-2xl text-foreground mb-4 leading-snug"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Where grief settles
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              Tracing the physical map of emotional loss through the nervous system.
            </p>
            <span className="text-xs uppercase tracking-widest text-foreground font-medium group-hover:underline mt-8 block">
              Read →
            </span>
          </Link>

          <Link
            to="/journal/$slug"
            params={{ slug: "rest-as-resistance" }}
            className="liquid-glass group rounded-3xl p-8 transition-all hover:-translate-y-2 hover:bg-foreground/5 border border-border/40 flex flex-col min-h-[320px]"
          >
            <span className="text-xs text-muted-foreground mb-6 block">March 15</span>
            <h3
              className="text-2xl text-foreground mb-4 leading-snug"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Rest as resistance
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              The radical act of doing absolutely nothing when the world demands everything.
            </p>
            <span className="text-xs uppercase tracking-widest text-foreground font-medium group-hover:underline mt-8 block">
              Read →
            </span>
          </Link>

          <Link
            to="/journal/$slug"
            params={{ slug: "the-myth-of-closure" }}
            className="liquid-glass group rounded-3xl p-8 transition-all hover:-translate-y-2 hover:bg-foreground/5 border border-border/40 flex flex-col min-h-[320px]"
          >
            <span className="text-xs text-muted-foreground mb-6 block">February 02</span>
            <h3
              className="text-2xl text-foreground mb-4 leading-snug"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              The myth of closure
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              Why we should stop looking for an ending, and start looking for integration.
            </p>
            <span className="text-xs uppercase tracking-widest text-foreground font-medium group-hover:underline mt-8 block">
              Read →
            </span>
          </Link>
        </div>
      </section>

      {/* Your Journey Taxonomy Section */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-8 py-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
              Your Journey
            </p>
            <h2
              className="mt-4 max-w-2xl text-4xl font-normal leading-[1.02] tracking-[-1.4px] sm:text-5xl"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Evidence-based ways to{" "}
              <em className="not-italic text-muted-foreground">rebuild and recover.</em>
            </h2>
          </div>
          <Link
            to="/experiences"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors border-b border-border pb-1"
          >
            View full experience map →
          </Link>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {taxonomy.map((category) => (
            <Link
              key={category.slug}
              to="/taxonomy/$slug"
              params={{ slug: category.slug }}
              className="liquid-glass group flex flex-col rounded-3xl px-8 py-10 transition-all hover:scale-[1.01] hover:bg-foreground/5 border border-border/40 hover:border-border/60"
            >
              <span className="text-xs tracking-[0.28em] text-muted-foreground uppercase">
                {category.name}
              </span>
              <span
                className="mt-6 text-2xl leading-tight tracking-tight text-foreground"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {category.title.split(" ").slice(0, -1).join(" ")}{" "}
                <em className="not-italic text-muted-foreground">
                  {category.title.split(" ").slice(-1)[0]}
                </em>
              </span>
              <span className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {category.summary}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-8 py-20">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Active Recovery
          </p>
          <h2
            className="mt-4 text-4xl font-normal leading-[1.02] tracking-[-1.4px] sm:text-5xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Tools to <em className="not-italic text-muted-foreground">ground yourself.</em>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Practical, interactive exercises to help you map your nervous system, track your rest,
            and plan your recovery — all saved locally on your device for complete privacy.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* Main Feature */}
          <Link
            to="/tools"
            className="liquid-glass group md:col-span-2 rounded-3xl p-8 md:p-12 transition-all hover:scale-[1.01] border border-border/40 overflow-hidden relative"
          >
            <div className="relative z-10 w-full md:w-2/3">
              <BrainCircuit className="h-8 w-8 text-muted-foreground mb-6" />
              <h3
                className="text-2xl text-foreground mb-3"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Interactive Brain Map
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                Explore the regions of your mind affected by trauma and stress. Learn the science
                behind brain fog and emotional dysregulation in a gentle, visual way.
              </p>
              <span className="text-xs uppercase tracking-widest text-foreground font-medium group-hover:underline">
                Open Map →
              </span>
            </div>
            {/* Decorative background element */}
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full -mr-20 -mb-20 pointer-events-none" />
          </Link>

          {/* Secondary Features */}
          <Link
            to="/tools"
            className="liquid-glass group rounded-3xl p-8 transition-all hover:scale-[1.01] border border-border/40 flex flex-col"
          >
            <Moon className="h-6 w-6 text-muted-foreground mb-6" />
            <h3
              className="text-xl text-foreground mb-3"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Sleep Diary
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              Track your rest quality securely. No cloud sync, just your data on your device.
            </p>
            <span className="text-xs uppercase tracking-widest text-foreground font-medium group-hover:underline mt-6">
              Log Sleep →
            </span>
          </Link>

          <Link
            to="/tools"
            className="liquid-glass group rounded-3xl p-8 transition-all hover:scale-[1.01] border border-border/40 flex flex-col"
          >
            <HeartPulse className="h-6 w-6 text-muted-foreground mb-6" />
            <h3
              className="text-xl text-foreground mb-3"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Burnout Quiz
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              Assess your current nervous system state and get gentle recommendations.
            </p>
            <span className="text-xs uppercase tracking-widest text-foreground font-medium group-hover:underline mt-6">
              Take Quiz →
            </span>
          </Link>

          <Link
            to="/tools"
            className="liquid-glass group rounded-3xl p-8 transition-all hover:scale-[1.01] border border-border/40 flex flex-col"
          >
            <Sparkles className="h-6 w-6 text-muted-foreground mb-6" />
            <h3
              className="text-xl text-foreground mb-3"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Recovery Planner
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              Build a personalized daily rhythm that respects your energy limits.
            </p>
            <span className="text-xs uppercase tracking-widest text-foreground font-medium group-hover:underline mt-6">
              Plan Day →
            </span>
          </Link>

          <div className="liquid-glass md:col-span-1 lg:col-span-1 rounded-3xl p-8 flex flex-col items-center justify-center text-center border border-border/40">
            <h3
              className="text-xl text-foreground mb-3"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              More coming soon.
            </h3>
            <p className="text-xs text-muted-foreground">
              We are constantly building new ways to support your journey.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-8 py-20">
        <div className="liquid-glass rounded-3xl p-12 md:p-24 text-center border border-border/20 flex flex-col items-center">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground mb-8">
            Our Philosophy
          </p>
          <h2
            className="max-w-3xl text-3xl font-normal leading-[1.2] tracking-[-1.2px] sm:text-5xl text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            "Healing is not about erasing the past. It is about building a nervous system capable of
            holding it, while remaining{" "}
            <em className="not-italic text-muted-foreground">present for today.</em>"
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto">
            <div>
              <h4 className="text-lg font-medium text-foreground mb-2">No Quick Fixes</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We don't promise overnight transformations. True recovery is slow, cyclical, and
                requires immense patience with yourself.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-foreground mb-2">Evidence-Based</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our tools are grounded in modern neuroscience, somatics, and trauma-informed care
                protocols.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-foreground mb-2">Always Free</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Access to education about your own mind shouldn't be gated behind a paywall. The
                core platform will remain free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Voices Section */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-8 py-28 border-t border-border/20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground flex items-center gap-2">
              <MessageCircle className="w-3 h-3" /> Live Community
            </p>
            <h2
              className="mt-4 max-w-2xl text-4xl font-normal leading-[1.02] tracking-[-1.4px] sm:text-5xl"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Voices of <em className="not-italic text-muted-foreground">recovery.</em>
            </h2>
            <p className="mt-4 text-sm text-muted-foreground max-w-lg">
              Read recent stories shared anonymously by others navigating similar terrain. You are
              not alone in this.
            </p>
          </div>
          <Link
            to="/community"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors border-b border-border pb-1 shrink-0"
          >
            Enter the community space →
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {voicesLoading ? (
            [1, 2, 3].map((i) => (
              <div
                key={i}
                className="liquid-glass rounded-3xl p-8 h-64 animate-pulse border border-border/20"
              />
            ))
          ) : recentVoices?.length === 0 ? (
            <div className="col-span-full liquid-glass rounded-3xl p-12 text-center text-muted-foreground">
              <p>The community space is quiet right now. Be the first to share your voice.</p>
              <Link to="/community" className="inline-block mt-4 text-foreground underline text-sm">
                Post anonymously
              </Link>
            </div>
          ) : (
            recentVoices?.map((voice) => (
              <Link
                key={voice.slug}
                to="/community/$slug"
                params={{ slug: voice.slug }}
                className="liquid-glass group flex flex-col rounded-3xl p-8 transition-all hover:-translate-y-1 hover:bg-foreground/5 border border-border/40"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs text-muted-foreground">
                    {new Date(voice.published_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="text-xs bg-foreground/10 px-2 py-1 rounded-full text-foreground/80">
                    — {voice.author}
                  </span>
                </div>
                <h3
                  className="text-xl text-foreground mb-4 leading-snug group-hover:text-muted-foreground transition-colors"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {voice.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  "{voice.excerpt}"
                </p>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-8 pb-20">
        <div className="liquid-glass flex flex-col items-start gap-8 rounded-3xl px-8 py-16 md:flex-row md:items-center md:justify-between md:px-16 border border-border/40">
          <h2
            className="max-w-xl text-3xl font-normal leading-[1.05] tracking-[-1.2px] sm:text-4xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Start with one night of sleep.{" "}
            <em className="not-italic text-muted-foreground">The rest can wait until morning.</em>
          </h2>
          <Link
            to="/taxonomy/$slug"
            params={{ slug: "rebuild" }}
            className="liquid-glass shrink-0 cursor-pointer rounded-full px-10 py-4 text-sm font-medium text-foreground transition-all hover:bg-foreground hover:text-background"
          >
            Begin here
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
