import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/studio", label: "Library" },
  { to: "/experiences", label: "Experiences" },
  { to: "/tools", label: "Tools" },
  { to: "/community", label: "Community" },
  { to: "/about", label: "About" },
  { to: "/journal", label: "Journal" },
  { to: "/reach-us", label: "Reach Us" },
] as const;

export function SiteNav() {
  return (
    <nav className="relative z-10 mx-auto flex max-w-7xl flex-row items-center justify-between px-8 py-6">
      <Link
        to="/"
        className="text-3xl tracking-tight text-foreground"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Lantern-Mind<sup className="text-xs">®</sup>
      </Link>

      <div className="hidden items-center gap-8 md:flex">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            activeOptions={{ exact: link.to === "/" }}
            activeProps={{ className: "text-sm text-foreground" }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {/* Language Switcher Placeholder */}
        <button className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            <path d="M2 12h20" />
          </svg>
          English
        </button>

        <Link
          to="/studio"
          className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground transition-transform hover:scale-[1.03]"
        >
          Begin Journey
        </Link>
      </div>
    </nav>
  );
}
