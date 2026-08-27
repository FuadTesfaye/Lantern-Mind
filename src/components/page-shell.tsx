import type { ReactNode } from "react";
import { SiteNav } from "./site-nav";
import { SiteFooter } from "./site-footer";
import { GradualBlur } from "./unlumen-ui/gradual-blur";

type PageShellProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  children: ReactNode;
};

export function PageShell({ eyebrow, title, intro, children }: PageShellProps) {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-primary/20">
      {/* Top & Bottom Gradual Blur overlays from Unlumen UI */}
      <GradualBlur position="top" />

      <div>
        <SiteNav />

        <header className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 pb-12 pt-12 md:pt-20">
          {eyebrow ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/80 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-primary mb-4">
              <span className="size-1.5 rounded-full bg-primary" />
              <span>{eyebrow}</span>
            </div>
          ) : null}
          <h1
            className="animate-fade-rise max-w-4xl text-4xl font-normal leading-[1.02] tracking-[-1.5px] text-foreground sm:text-6xl md:text-7xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {title}
          </h1>
          {intro ? (
            <p className="animate-fade-rise-delay mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {intro}
            </p>
          ) : null}
        </header>

        <main className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 pb-20">{children}</main>
      </div>

      <SiteFooter />
      <GradualBlur position="bottom" />
    </div>
  );
}
