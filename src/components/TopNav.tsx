import { Hexagon } from "lucide-react";

const navLinks = [
  { label: "VALIDATION HISTORY", href: "#" },
  { label: "PROXY LIBRARY", href: "#" },
  { label: "DOCS", href: "#" },
];

const TopNav = () => {
  return (
    <nav className="w-full bg-foreground text-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <Hexagon className="h-6 w-6 text-primary" />
          <div className="flex flex-col leading-tight">
            <span className="font-['Playfair_Display',serif] text-lg font-semibold tracking-wide">
              Virtual Persona
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-background/60">
              Hypothesis Validation Platform
            </span>
          </div>
        </div>

        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] uppercase tracking-[0.18em] text-background/50 transition-colors hover:text-background/90"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
