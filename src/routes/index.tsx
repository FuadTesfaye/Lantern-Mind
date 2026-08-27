import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { taxonomy } from "@/content/taxonomy";
import { articles } from "@/content/articles";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import {
  Tilt,
  TiltCard,
  ClippedCircle,
  AnimatedList,
  MotionAccordion,
  GradualBlur,
} from "@/components/unlumen-ui";
import {
  BrainCircuit,
  Moon,
  HeartPulse,
  Sparkles,
  MessageCircle,
  Timer,
  ArrowRight,
  ShieldCheck,
  Microscope,
  HeartHandshake,
  Quote,
  Compass,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

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

  const philosophyItems = [
    {
      icon: <ShieldCheck className="size-5 text-primary" />,
      question: "No Quick Fixes or False Promises",
      answer:
        "We do not promise overnight recovery or magic supplements. True cognitive recovery is biological, gradual, and built primarily through consistent sleep, low-pressure focus, and pacing.",
    },
    {
      icon: <Microscope className="size-5 text-primary" />,
      question: "Evidence-Based & Trauma-Informed",
      answer:
        "All our instruments and essays are grounded in neuroscience, somatic physiology, and established clinical recovery guidelines. We explain why your brain responds the way it does in plain language.",
    },
    {
      icon: <HeartHandshake className="size-5 text-primary" />,
      question: "100% Free, Private & Zero Cloud Tracking",
      answer:
        "Essential mental health education must never be gated behind paywalls or sold to ad networks. Your interactive assessments and logs stay strictly on your local device.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/25">
      <GradualBlur position="top" />

      {/* Sticky Site Navigation */}
      <SiteNav />

      {/* Hero Section — Preserved intact */}
      <section className="relative min-h-screen overflow-hidden -mt-16 sm:-mt-20">
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

        <div className="relative z-10 flex flex-col items-center px-6 py-[90px] pb-40 pt-36 sm:pt-40 text-center">
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

        {/* Animated Wavy Divider */}
        <div className="absolute bottom-0 left-0 right-0 z-20 w-full overflow-hidden leading-none pointer-events-none">
          <svg
            className="relative block w-full h-16 sm:h-24 md:h-32 text-background"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z"
              className="fill-current opacity-50 animate-pulse"
            ></path>
            <path
              d="M0,20 C200,100 450,10 700,70 C950,130 1100,30 1200,60 L1200,120 L0,120 Z"
              className="fill-current"
            ></path>
          </svg>
        </div>
      </section>

      {/* Unlumen Core Principle Tilt Spotlight Card */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 py-20 md:py-28">
        <Tilt
          rotationFactor={6}
          className="group relative overflow-hidden rounded-3xl border border-border bg-surface p-8 sm:p-14 md:p-16 text-center shadow-2xl transition-all duration-300 hover:border-foreground/20"
        >
          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-1 text-xs font-mono tracking-widest text-primary uppercase mb-8">
              <span className="size-1.5 rounded-full bg-primary" />
              <span>Core Principle</span>
            </div>

            <Quote className="h-9 w-9 text-primary/40 mb-6 group-hover:scale-110 transition-transform" />

            <blockquote
              className="text-2xl sm:text-4xl md:text-5xl font-normal leading-[1.22] tracking-tight text-foreground max-w-3xl"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              The people who help others for decades aren't the ones who ignore their own wounds.
              <br />
              <br />
              <span className="italic text-primary">
                They're the ones who gradually heal enough that their wounds stop controlling them.
              </span>
            </blockquote>
          </div>

          <ClippedCircle circleClassName="bg-primary/20" circleSize={700} />
        </Tilt>
      </section>

      {/* The Journal Section — Redesigned with Unlumen TiltCards */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-8 pb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-mono uppercase tracking-widest text-primary mb-3">
              <BookOpen className="size-3.5" />
              <span>The Journal</span>
            </div>
            <h2
              className="text-4xl font-normal leading-[1.02] tracking-[-1.4px] sm:text-5xl"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Notes on <em className="not-italic text-muted-foreground">living.</em>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl">
              Slow, compassionate explorations of feeling, neuroscience, and actionable daily
              recovery.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="self-start md:self-auto rounded-full border-border bg-surface hover:bg-card gap-2 text-foreground font-medium"
          >
            <Link to="/journal">
              <span>Read all entries</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <TiltCard
              key={article.slug}
              title={
                <span>
                  {article.title}{" "}
                  {article.em ? (
                    <em className="not-italic text-muted-foreground">{article.em}</em>
                  ) : null}
                </span>
              }
              description={article.dek}
              price={article.section}
              badgeLabel={article.readingTime}
              badgeVariant="primary"
              footerSlot={
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between px-2 text-xs uppercase tracking-wider text-foreground font-semibold hover:bg-primary/10"
                >
                  <Link to="/journal/$slug" params={{ slug: article.slug }}>
                    <span>Read piece</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              }
            />
          ))}
        </div>
      </section>

      {/* Your Journey Framework Section — Unlumen Cards */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-8 py-20 border-t border-border/40">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-mono uppercase tracking-widest text-primary mb-3">
              <Compass className="size-3.5" />
              <span>Your Framework</span>
            </div>
            <h2
              className="text-4xl font-normal leading-[1.02] tracking-[-1.4px] sm:text-5xl"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Evidence-based ways to{" "}
              <em className="not-italic text-muted-foreground">rebuild and recover.</em>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl">
              A structured roadmap mapping out how the mind, body, and daily rhythms interact.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="self-start md:self-auto rounded-full border-border bg-surface hover:bg-card gap-2 text-foreground font-medium"
          >
            <Link to="/experiences">
              <span>View experience atlas</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {taxonomy.map((category, idx) => (
            <TiltCard
              key={category.slug}
              price={`0${idx + 1}`}
              badgeLabel={`${category.topics.length} topics`}
              badgeVariant="neutral"
              title={
                <span>
                  {category.title.split(" ").slice(0, -1).join(" ")}{" "}
                  <em className="not-italic text-muted-foreground">
                    {category.title.split(" ").slice(-1)[0]}
                  </em>
                </span>
              }
              description={category.summary}
              footerSlot={
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {category.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic.slug}
                        className="inline-block rounded-full bg-foreground/5 border border-border/50 px-2.5 py-0.5 text-[11px] text-muted-foreground font-mono"
                      >
                        {topic.title.split("—")[0].trim()}
                      </span>
                    ))}
                    {category.topics.length > 3 && (
                      <span className="inline-block rounded-full bg-foreground/5 border border-border/50 px-2 py-0.5 text-[11px] text-muted-foreground font-mono">
                        +{category.topics.length - 3} more
                      </span>
                    )}
                  </div>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between px-2 text-xs uppercase tracking-wider text-foreground font-semibold hover:bg-primary/10 mt-2"
                  >
                    <Link to="/taxonomy/$slug" params={{ slug: category.slug }}>
                      <span>Explore Section</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              }
            />
          ))}
        </div>
      </section>

      {/* Interactive Tools Section */}
      <TooltipProvider>
        <section className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-8 py-20 border-t border-border/40">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-mono uppercase tracking-widest text-primary mb-3">
                <Sparkles className="size-3.5" />
                <span>Active Instruments</span>
              </div>
              <h2
                className="text-4xl font-normal leading-[1.02] tracking-[-1.4px] sm:text-5xl"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Tools to <em className="not-italic text-muted-foreground">ground yourself.</em>
              </h2>
              <p className="mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-muted-foreground">
                Practical, interactive exercises to map your nervous system, track your rest, and
                plan your recovery. All data stays 100% on your device.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="self-start md:self-auto rounded-full border-border bg-surface hover:bg-card gap-2 text-foreground font-medium"
            >
              <Link to="/tools">
                <span>View all instruments</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Main Feature: Brain Map */}
            <Tilt
              rotationFactor={5}
              className="group md:col-span-2 rounded-3xl border border-border bg-surface p-8 sm:p-10 transition-all duration-300 hover:border-foreground/30 relative flex flex-col justify-between overflow-hidden shadow-xl"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="rounded-2xl bg-primary/10 border border-primary/20 p-3 w-fit text-primary group-hover:scale-105 transition-transform">
                    <BrainCircuit className="h-7 w-7" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-primary/15 border border-primary/30 px-3 py-0.5 text-xs text-primary font-mono font-medium">
                      Interactive Visual Map
                    </span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-help rounded-full border border-border bg-card px-2.5 py-0.5 text-xs font-mono text-muted-foreground">
                          Private
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="rounded-xl border border-border bg-surface p-2 text-xs text-foreground">
                        Runs 100% in your browser. Zero cloud tracking.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                <h3
                  className="text-2xl sm:text-3xl text-foreground font-normal tracking-tight mb-3"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Interactive Brain & Nervous System Map
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
                  Explore the regions of your mind affected by chronic stress and burnout. Learn the
                  neuroscience behind brain fog and emotional dysregulation through a gentle visual atlas.
                </p>
              </div>

              <div className="relative z-10 mt-8">
                <Button asChild className="rounded-full px-7 py-5 font-medium bg-primary text-primary-foreground hover:opacity-95 shadow-md">
                  <Link to="/tools">
                    <span>Open Interactive Map</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>

              <ClippedCircle circleClassName="bg-primary/20" circleSize={650} />
            </Tilt>

            {/* Burnout Assessment */}
            <TiltCard
              price="Assessment"
              badgeLabel="Pacing"
              badgeVariant="warning"
              title="Burnout Assessment"
              description="Assess your current nervous system state and receive gentle, evidence-based recommendations for pacing and recovery."
              headerSlot={
                <div className="flex items-center justify-between mb-2">
                  <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-2.5 text-rose-400">
                    <HeartPulse className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">5 min check</span>
                </div>
              }
              footerSlot={
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between px-2 text-xs uppercase tracking-wider text-foreground font-semibold hover:bg-primary/10"
                >
                  <Link to="/tools">
                    <span>Take Quiz</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              }
            />

            {/* Daily Recovery Planner */}
            <TiltCard
              price="Rhythm"
              badgeLabel="Pacing"
              badgeVariant="primary"
              title="Daily Recovery Planner"
              description="Build a compassionate daily rhythm that respects your energy limits and guards against cognitive overwhelm."
              headerSlot={
                <div className="flex items-center justify-between mb-2">
                  <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-2.5 text-amber-400">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">Energy pacing</span>
                </div>
              }
              footerSlot={
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between px-2 text-xs uppercase tracking-wider text-foreground font-semibold hover:bg-primary/10"
                >
                  <Link to="/tools">
                    <span>Plan Rhythm</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              }
            />

            {/* Sleep Diary */}
            <TiltCard
              price="Sleep"
              badgeLabel="Anchor"
              badgeVariant="neutral"
              title="Sleep Diary & Circadian Anchor"
              description="Track your rest quality and sleep anchors securely. Zero cloud sync — all records stay safely on your local device."
              headerSlot={
                <div className="flex items-center justify-between mb-2">
                  <div className="rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-2.5 text-indigo-400">
                    <Moon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">Local storage</span>
                </div>
              }
              footerSlot={
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between px-2 text-xs uppercase tracking-wider text-foreground font-semibold hover:bg-primary/10"
                >
                  <Link to="/tools">
                    <span>Log Sleep</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              }
            />

            {/* Focus Timer */}
            <TiltCard
              price="Focus"
              badgeLabel="Gentle"
              badgeVariant="success"
              title="Focus & Breath Timer"
              description="Practice low-pressure deep work blocks with built-in breath grounding cycles to prevent attention exhaustion."
              headerSlot={
                <div className="flex items-center justify-between mb-2">
                  <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-2.5 text-emerald-400">
                    <Timer className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">Low pressure</span>
                </div>
              }
              footerSlot={
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between px-2 text-xs uppercase tracking-wider text-foreground font-semibold hover:bg-primary/10"
                >
                  <Link to="/tools">
                    <span>Start Timer</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              }
            />
          </div>
        </section>
      </TooltipProvider>

      {/* Philosophy Section — Unlumen MotionAccordion */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 md:px-8 py-20 border-t border-border/40">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1 text-xs font-mono uppercase tracking-widest text-primary mb-4">
            <span className="size-1.5 rounded-full bg-primary" />
            <span>Our Foundation</span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-normal leading-tight text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            What we believe about healing.
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            Healing is not about erasing the past. It is about building a nervous system capable of holding it, while remaining present for today.
          </p>
        </div>

        <MotionAccordion items={philosophyItems} defaultOpenIndex={0} />
      </section>

      {/* Community Voices Section — Unlumen AnimatedList */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-8 py-20 border-t border-border/40">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-mono uppercase tracking-widest text-primary mb-3">
              <MessageCircle className="size-3.5" />
              <span>Live Community Space</span>
            </div>
            <h2
              className="text-4xl font-normal leading-[1.02] tracking-[-1.4px] sm:text-5xl"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Voices of <em className="not-italic text-muted-foreground">recovery.</em>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-lg">
              Read stories shared anonymously by others navigating similar terrain. You are not alone in this.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="self-start md:self-auto rounded-full border-border bg-surface hover:bg-card gap-2 text-foreground font-medium"
          >
            <Link to="/community">
              <span>Enter community space</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {voicesLoading ? (
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-3xl border border-border bg-surface p-7 space-y-4"
              >
                <Skeleton className="h-4 w-20 rounded-full" />
                <Skeleton className="h-6 w-3/4 rounded-full" />
                <Skeleton className="h-16 w-full rounded-2xl" />
              </div>
            ))}
          </div>
        ) : !recentVoices || recentVoices.length === 0 ? (
          <div className="rounded-3xl border border-border bg-surface p-12 text-center">
            <MessageCircle className="h-10 w-10 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground max-w-md mx-auto text-sm leading-relaxed mb-6">
              The community space is quiet right now. Be the first to share your reflections anonymously.
            </p>
            <Button asChild className="rounded-full bg-primary text-primary-foreground">
              <Link to="/community">Post anonymously</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {recentVoices.map((voice) => (
              <TiltCard
                key={voice.slug}
                title={voice.title}
                description={<span className="italic">"{voice.excerpt}"</span>}
                headerSlot={
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-mono text-muted-foreground">
                      {new Date(voice.published_at).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6 border border-border">
                        <AvatarFallback className="text-[10px] bg-primary/15 text-primary font-semibold">
                          {voice.author?.charAt(0)?.toUpperCase() || "A"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-foreground/80 font-medium">{voice.author}</span>
                    </div>
                  </div>
                }
                footerSlot={
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between px-2 text-xs uppercase tracking-wider text-foreground font-semibold hover:bg-primary/10"
                  >
                    <Link to="/community/$slug" params={{ slug: voice.slug }}>
                      <span>Read story</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                }
              />
            ))}
          </div>
        )}
      </section>

      {/* Closing CTA Banner */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-8 pb-20">
        <Tilt
          rotationFactor={4}
          className="rounded-3xl border border-border bg-surface p-8 sm:p-14 md:p-16 relative overflow-hidden shadow-2xl"
        >
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1 text-xs font-mono uppercase tracking-widest text-primary mb-4">
                <CheckCircle2 className="size-3.5" />
                <span>Begin With One Step</span>
              </div>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.08] tracking-tight text-foreground"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Start with one night of sleep.{" "}
                <em className="not-italic text-primary">The rest can wait until morning.</em>
              </h2>
            </div>
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 py-6 text-base font-medium shadow-lg hover:opacity-95 transition-all shrink-0 bg-primary text-primary-foreground"
            >
              <Link to="/taxonomy/$slug" params={{ slug: "rebuild" }}>
                <span>Begin here</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          <ClippedCircle circleClassName="bg-primary/15" circleSize={800} />
        </Tilt>
      </section>

      <SiteFooter />
      <GradualBlur position="bottom" />
    </div>
  );
}
