import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/studio", label: "Library" },
  { to: "/tools", label: "Tools" },
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
        Velorah<sup className="text-xs">®</sup>
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

      <Link
        to="/studio"
        className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground transition-transform hover:scale-[1.03]"
      >
        Begin Journey
      </Link>
    </nav>
  );
}
