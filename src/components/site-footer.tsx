import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="relative z-10 mx-auto w-full max-w-7xl px-8 pb-16 pt-24">
      <div className="liquid-glass rounded-3xl px-8 py-10">
        <p
          className="text-2xl tracking-tight text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Velorah<sup className="text-xs">®</sup>
        </p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          A quiet place for people rebuilding their attention, their memory, and their
          sense of themselves. Nothing here is sold, gated, or hurried.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <Link to="/studio" className="transition-colors hover:text-foreground">
            Library
          </Link>
          <Link to="/experiences" className="transition-colors hover:text-foreground">
            Experiences
          </Link>
          <Link to="/community" className="transition-colors hover:text-foreground">
            Community
          </Link>
          <Link to="/journal" className="transition-colors hover:text-foreground">
            Journal
          </Link>
          <Link to="/about" className="transition-colors hover:text-foreground">
            About
          </Link>
          <Link to="/reach-us" className="transition-colors hover:text-foreground">
            Reach Us
          </Link>
          <Link to="/terms" className="transition-colors hover:text-foreground">
            Terms
          </Link>
          <Link to="/privacy" className="transition-colors hover:text-foreground">
            Privacy
          </Link>
        </div>
        <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
          Educational writing only — not medical advice, not a diagnosis, not a
          substitute for care. If you are struggling badly, or thinking of harming
          yourself, please reach a doctor or a local crisis line today.
        </p>
      </div>
    </footer>
  );
}
