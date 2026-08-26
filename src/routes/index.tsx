import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { taxonomy } from "@/content/taxonomy";
import { articles } from "@/content/articles";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
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

      {/* Bold Artistic Quote Section */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 py-20 md:py-28">
        <Card className="liquid-glass relative overflow-hidden rounded-[2.5rem] p-8 md:p-20 text-center border-border/40 shadow-[0_40px_100px_-20px_rgba(14,165,233,0.08)]">
          <div className="relative z-10 flex flex-col items-center">
            <Badge
              variant="outline"
              className="mb-8 rounded-full border-border/60 bg-background/40 px-4 py-1 text-xs tracking-widest text-muted-foreground uppercase"
            >
              Core Principle
            </Badge>
            <Quote className="h-10 w-10 text-primary/30 mb-6" />
            <blockquote
              className="text-2xl sm:text-4xl md:text-5xl font-normal leading-[1.2] tracking-tight text-foreground"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              The people who help others for decades aren't the ones who ignore their own wounds.
              <br />
              <br />
              <span className="italic text-primary/90">
                They're the ones who gradually heal enough that their wounds stop controlling them.
              </span>
            </blockquote>
          </div>
        </Card>
      </section>

      {/* Featured Journal Cards */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-8 pb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Badge
              variant="outline"
              className="rounded-full px-3 py-0.5 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3"
            >
              The Journal
            </Badge>
            <h2
              className="text-4xl font-normal leading-[1.02] tracking-[-1.4px] sm:text-5xl"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Notes on <em className="not-italic text-muted-foreground">living.</em>
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-xl">
              Slow, compassionate explorations of feeling, neuroscience, and actionable daily
              recovery.
            </p>
          </div>
          <Button
            asChild
            variant="ghost"
            className="self-start md:self-auto group gap-2 text-muted-foreground hover:text-foreground"
          >
            <Link to="/journal">
              Read all entries{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Card
              key={article.slug}
              className="liquid-glass group rounded-3xl border-border/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:bg-foreground/5 flex flex-col justify-between"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant="secondary" className="rounded-full text-xs font-normal">
                    {article.section}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{article.readingTime} read</span>
                </div>
                <CardTitle
                  className="text-2xl text-foreground font-normal leading-snug tracking-tight group-hover:text-primary transition-colors"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {article.title}{" "}
                  {article.em ? (
                    <em className="not-italic text-muted-foreground">{article.em}</em>
                  ) : null}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-6 flex-1">
                <CardDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {article.dek}
                </CardDescription>
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between px-2 text-xs uppercase tracking-widest text-foreground font-medium group-hover:bg-primary/10"
                >
                  <Link to="/journal/$slug" params={{ slug: article.slug }}>
                    <span>Read piece</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Your Journey Taxonomy Section */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Badge
              variant="outline"
              className="rounded-full px-3 py-0.5 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3"
            >
              Your Journey
            </Badge>
            <h2
              className="text-4xl font-normal leading-[1.02] tracking-[-1.4px] sm:text-5xl"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Evidence-based ways to{" "}
              <em className="not-italic text-muted-foreground">rebuild and recover.</em>
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-xl">
              A structured framework mapping out how the mind, body, and daily rhythms interact.
            </p>
          </div>
          <Button
            asChild
            variant="ghost"
            className="self-start md:self-auto group gap-2 text-muted-foreground hover:text-foreground"
          >
            <Link to="/experiences">
              View experience atlas{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {taxonomy.map((category, idx) => (
            <Card
              key={category.slug}
              className="liquid-glass group rounded-3xl border-border/40 transition-all duration-300 hover:scale-[1.01] hover:border-primary/40 hover:bg-foreground/5 flex flex-col justify-between"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <Badge
                    variant="outline"
                    className="text-xs uppercase tracking-wider text-muted-foreground"
                  >
                    0{idx + 1} · {category.name}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {category.topics.length} {category.topics.length === 1 ? "topic" : "topics"}
                  </span>
                </div>
                <CardTitle
                  className="text-2xl leading-tight tracking-tight text-foreground mt-2"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {category.title.split(" ").slice(0, -1).join(" ")}{" "}
                  <em className="not-italic text-muted-foreground">
                    {category.title.split(" ").slice(-1)[0]}
                  </em>
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-6 flex-1">
                <CardDescription className="text-sm leading-relaxed text-muted-foreground mb-4">
                  {category.summary}
                </CardDescription>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {category.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic.slug}
                      className="inline-block rounded-full bg-foreground/5 border border-border/30 px-2.5 py-0.5 text-[11px] text-muted-foreground"
                    >
                      {topic.title.split("—")[0].trim()}
                    </span>
                  ))}
                  {category.topics.length > 3 && (
                    <span className="inline-block rounded-full bg-foreground/5 border border-border/30 px-2 py-0.5 text-[11px] text-muted-foreground">
                      +{category.topics.length - 3} more
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between px-2 text-xs uppercase tracking-widest text-foreground font-medium group-hover:bg-primary/10"
                >
                  <Link to="/taxonomy/$slug" params={{ slug: category.slug }}>
                    <span>Explore Section</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Interactive Tools Section */}
      <TooltipProvider>
        <section className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-8 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <Badge
                variant="outline"
                className="rounded-full px-3 py-0.5 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3"
              >
                Active Recovery
              </Badge>
              <h2
                className="text-4xl font-normal leading-[1.02] tracking-[-1.4px] sm:text-5xl"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Tools to <em className="not-italic text-muted-foreground">ground yourself.</em>
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Practical, interactive exercises to map your nervous system, track your rest, and
                plan your recovery. All data stays 100% on your device.
              </p>
            </div>
            <Button
              asChild
              variant="ghost"
              className="self-start md:self-auto group gap-2 text-muted-foreground hover:text-foreground"
            >
              <Link to="/tools">
                View all instruments{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Main Feature: Brain Map */}
            <Card className="liquid-glass group md:col-span-2 rounded-3xl border-border/40 p-2 transition-all duration-300 hover:border-primary/40 overflow-hidden relative flex flex-col justify-between">
              <CardHeader className="p-6 sm:p-8 relative z-10">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="rounded-2xl bg-primary/10 border border-primary/20 p-3 w-fit text-primary">
                    <BrainCircuit className="h-7 w-7" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="rounded-full text-xs">
                      Interactive Visual Map
                    </Badge>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge
                          variant="outline"
                          className="cursor-help text-xs text-muted-foreground"
                        >
                          Private
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        Runs 100% in your browser. Zero cloud tracking.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <CardTitle
                  className="text-3xl text-foreground font-normal tracking-tight mb-3"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Interactive Brain & Nervous System Map
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                  Explore the regions of your mind affected by chronic stress and burnout. Learn the
                  neuroscience behind brain fog and emotional dysregulation through a gentle visual
                  atlas.
                </CardDescription>
              </CardHeader>
              <CardFooter className="p-6 sm:p-8 pt-0 relative z-10">
                <Button asChild className="rounded-full px-6 group/btn">
                  <Link to="/tools">
                    <span>Open Interactive Map</span>
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
              {/* Subtle ambient light */}
              <div className="absolute right-0 bottom-0 w-80 h-80 bg-primary/10 blur-[90px] rounded-full -mr-20 -mb-20 pointer-events-none" />
            </Card>

            {/* Burnout Assessment */}
            <Card className="liquid-glass group rounded-3xl border-border/40 transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="rounded-2xl bg-rose-500/10 border border-rose-500/20 p-3 text-rose-400">
                    <HeartPulse className="h-6 w-6" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Assessment
                  </Badge>
                </div>
                <CardTitle
                  className="text-2xl text-foreground font-normal tracking-tight"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Burnout Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                  Assess your current nervous system state and receive gentle, evidence-based
                  recommendations for pacing and recovery.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between px-2 text-xs uppercase tracking-widest text-foreground font-medium group-hover:bg-primary/10"
                >
                  <Link to="/tools">
                    <span>Take Quiz</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Recovery Planner */}
            <Card className="liquid-glass group rounded-3xl border-border/40 transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-3 text-amber-400">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Rhythm Planner
                  </Badge>
                </div>
                <CardTitle
                  className="text-2xl text-foreground font-normal tracking-tight"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Daily Recovery Planner
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                  Build a compassionate daily rhythm that respects your energy limits and guards
                  against cognitive overwhelm.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between px-2 text-xs uppercase tracking-widest text-foreground font-medium group-hover:bg-primary/10"
                >
                  <Link to="/tools">
                    <span>Plan Rhythm</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Sleep Diary */}
            <Card className="liquid-glass group rounded-3xl border-border/40 transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="rounded-2xl bg-indigo-500/10 border border-indigo-500/20 p-3 text-indigo-400">
                    <Moon className="h-6 w-6" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Sleep Tracker
                  </Badge>
                </div>
                <CardTitle
                  className="text-2xl text-foreground font-normal tracking-tight"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Sleep Diary
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                  Track your rest quality and sleep anchors securely. Zero cloud sync — all records
                  stay safely on your local device.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between px-2 text-xs uppercase tracking-widest text-foreground font-medium group-hover:bg-primary/10"
                >
                  <Link to="/tools">
                    <span>Log Sleep</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Focus Timer */}
            <Card className="liquid-glass group rounded-3xl border-border/40 transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-emerald-400">
                    <Timer className="h-6 w-6" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Gentle Focus
                  </Badge>
                </div>
                <CardTitle
                  className="text-2xl text-foreground font-normal tracking-tight"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Focus & Breath Timer
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                  Practice low-pressure deep work blocks with built-in breath grounding cycles to
                  prevent attention exhaustion.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between px-2 text-xs uppercase tracking-widest text-foreground font-medium group-hover:bg-primary/10"
                >
                  <Link to="/tools">
                    <span>Start Timer</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </TooltipProvider>

      {/* Philosophy Section */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-8 py-20">
        <Card className="liquid-glass rounded-3xl border-border/40 p-8 md:p-16 text-center">
          <Badge
            variant="outline"
            className="rounded-full px-4 py-1 text-xs uppercase tracking-[0.25em] text-muted-foreground mb-6"
          >
            Our Philosophy
          </Badge>
          <blockquote
            className="max-w-3xl mx-auto text-2xl sm:text-4xl md:text-5xl font-normal leading-[1.2] tracking-tight text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            "Healing is not about erasing the past. It is about building a nervous system capable of
            holding it, while remaining{" "}
            <em className="not-italic text-primary/90">present for today.</em>"
          </blockquote>

          <Separator className="my-12 bg-border/40 max-w-3xl mx-auto" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
            <Card className="bg-foreground/[0.02] border-border/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-medium text-foreground">No Quick Fixes</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We don't promise overnight transformations. True recovery is slow, cyclical, and
                requires immense patience with yourself.
              </p>
            </Card>

            <Card className="bg-foreground/[0.02] border-border/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                  <Microscope className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-medium text-foreground">Evidence-Based</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our tools and essays are grounded in modern neuroscience, somatics, and
                trauma-informed care protocols.
              </p>
            </Card>

            <Card className="bg-foreground/[0.02] border-border/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                  <HeartHandshake className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-medium text-foreground">Always Free & Safe</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Education about your own mind is never gated behind paywalls or data harvesting.
                Trust is everything.
              </p>
            </Card>
          </div>
        </Card>
      </section>

      {/* Community Voices Section */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-8 py-20 border-t border-border/20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Badge
              variant="outline"
              className="rounded-full px-3 py-0.5 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3 flex items-center gap-1.5 w-fit"
            >
              <MessageCircle className="w-3.5 h-3.5 text-primary" /> Live Community
            </Badge>
            <h2
              className="text-4xl font-normal leading-[1.02] tracking-[-1.4px] sm:text-5xl"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Voices of <em className="not-italic text-muted-foreground">recovery.</em>
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-lg">
              Read stories shared anonymously by others navigating similar terrain. You are not
              alone in this.
            </p>
          </div>
          <Button
            asChild
            variant="ghost"
            className="self-start md:self-auto group gap-2 text-muted-foreground hover:text-foreground"
          >
            <Link to="/community">
              Enter community space{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {voicesLoading ? (
            [1, 2, 3].map((i) => (
              <Card
                key={i}
                className="liquid-glass rounded-3xl border-border/30 p-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-20 rounded-full" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>
                  <Skeleton className="h-7 w-3/4" />
                  <Skeleton className="h-20 w-full" />
                </div>
                <Skeleton className="h-4 w-24 mt-6" />
              </Card>
            ))
          ) : !recentVoices || recentVoices.length === 0 ? (
            <Card className="col-span-full liquid-glass rounded-3xl p-12 text-center border-border/30">
              <CardContent className="flex flex-col items-center justify-center p-0">
                <MessageCircle className="h-10 w-10 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground max-w-md text-sm leading-relaxed mb-6">
                  The community space is quiet right now. Be the first to share your reflections
                  anonymously.
                </p>
                <Button asChild className="rounded-full">
                  <Link to="/community">Post anonymously</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            recentVoices.map((voice) => (
              <Card
                key={voice.slug}
                className="liquid-glass group rounded-3xl border-border/40 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 flex flex-col justify-between"
              >
                <CardHeader className="p-0 pb-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs text-muted-foreground">
                      {new Date(voice.published_at).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6 border border-border/60">
                        <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-medium">
                          {voice.author?.charAt(0)?.toUpperCase() || "A"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-foreground/80 font-medium">{voice.author}</span>
                    </div>
                  </div>
                  <CardTitle
                    className="text-xl text-foreground font-normal leading-snug group-hover:text-primary transition-colors"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {voice.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 pb-6 flex-1">
                  <CardDescription className="text-sm text-muted-foreground leading-relaxed italic line-clamp-4">
                    "{voice.excerpt}"
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-0 pt-2">
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between px-2 text-xs uppercase tracking-widest text-foreground font-medium group-hover:bg-primary/10"
                  >
                    <Link to="/community/$slug" params={{ slug: voice.slug }}>
                      <span>Read story</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-8 pb-20">
        <Card className="liquid-glass rounded-3xl border-border/40 p-8 sm:p-14 md:p-16 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-xl">
              <Badge
                variant="outline"
                className="rounded-full px-3 py-0.5 text-xs uppercase tracking-wider text-muted-foreground mb-4"
              >
                Begin With One Step
              </Badge>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.08] tracking-tight text-foreground"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Start with one night of sleep.{" "}
                <em className="not-italic text-primary/90">The rest can wait until morning.</em>
              </h2>
            </div>
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 py-6 text-base font-medium shadow-lg hover:scale-[1.02] transition-transform shrink-0"
            >
              <Link to="/taxonomy/$slug" params={{ slug: "rebuild" }}>
                <span>Begin here</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
          {/* Ambient light accent */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        </Card>
      </section>

      <SiteFooter />
    </div>
  );
}
