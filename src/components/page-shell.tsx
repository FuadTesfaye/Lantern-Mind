import type { ReactNode } from "react";
import { SiteNav } from "./site-nav";
import { SiteFooter } from "./site-footer";

type PageShellProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  children: ReactNode;
};

/**
 * Every page other than home opens on the still navy field — no video —
 * so the site stays a place of rest.
 */
export function PageShell({ eyebrow, title, intro, children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <header className="relative z-10 mx-auto max-w-7xl px-8 pb-16 pt-16 md:pt-24">
        {eyebrow ? (
          <p className="animate-fade-rise text-xs uppercase tracking-[0.28em] text-muted-foreground">
            {eyebrow}
          </p>
        ) : null}
        <h1
          className="animate-fade-rise mt-6 max-w-4xl text-4xl font-normal leading-[0.98] tracking-[-1.6px] text-foreground sm:text-6xl md:text-7xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          {title}
        </h1>
        {intro ? (
          <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {intro}
          </p>
        ) : null}
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-8">{children}</main>

      <SiteFooter />
    </div>
  );
}
