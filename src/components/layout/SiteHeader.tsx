import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = location.pathname === "/";
  const overHero = isHome && !scrolled;

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border text-foreground"
          : isHome
            ? "bg-gradient-to-b from-black/50 to-transparent text-white"
            : "bg-background/90 backdrop-blur-md border-b border-border text-foreground",
      )}
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2.5">
            <LogoMark inverted={overHero} />
            <span className="font-display text-lg tracking-tight hidden sm:inline">
              Renaissance Meetings & Special Events
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-sm font-semibold">
            {NAV.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "relative px-4 py-2 transition-colors",
                    active
                      ? overHero
                        ? "text-white"
                        : "text-foreground"
                      : overHero
                        ? "text-white/75 hover:text-white"
                        : "text-foreground/70 hover:text-foreground",
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-3 right-3 -bottom-0.5 h-[3px] rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <a
            href={`mailto:${SITE.emails[1]}`}
            className={cn(
              "group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors",
              overHero
                ? "bg-white text-ink hover:bg-accent hover:text-accent-foreground"
                : "bg-foreground text-background hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <span>Contact Us</span>
            <ArrowCircle />
          </a>
        </div>
      </div>
    </motion.header>
  );
}

function ArrowCircle() {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-background/15 transition-colors group-hover:bg-foreground/15">
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </span>
  );
}

export function LogoMark({ className, inverted }: { className?: string; inverted?: boolean }) {
  return (
    <span
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-full font-display transition-colors",
        inverted ? "bg-white text-[#06369c]" : "bg-foreground text-background",
        className,
      )}
      aria-hidden
    >
      <span className="text-base leading-none">R</span>
    </span>
  );
}
