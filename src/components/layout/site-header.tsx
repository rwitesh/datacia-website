import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.webp";
import { GitHubIcon } from "@/components/icons/brand";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EASE_APPLE } from "@/components/motion/reveal";
import { LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Features", to: "/#features" },
  { label: "Open Source", to: "/#open-source" },
  { label: "Download", to: "/download" },
] as const;

export function SiteHeader() {
  const { pathname, hash } = useLocation();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  // Close the mobile menu on any navigation.
  useEffect(() => setMenuOpen(false), [pathname, hash]);

  return (
    <header className="sticky top-0 z-50">
      <AnnouncementBar />
      <nav
        aria-label="Primary"
        className={cn(
          "border-b transition-[background-color,border-color] duration-500",
          scrolled || menuOpen ? "glass border-line" : "border-transparent bg-transparent",
        )}
      >
        <Container width="wide" className="flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 text-[17px] font-semibold tracking-tight">
            <img src={logo} alt="" className="size-7" width={28} height={28} />
            DataCia
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "text-[13px] text-muted-foreground transition-colors hover:text-foreground",
                      isActive && !item.to.includes("#") && "text-foreground",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={LINKS.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="DataCia on GitHub"
              className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
            >
              <GitHubIcon className="size-[18px]" />
            </a>
            <Link to="/download" className={cn(buttonVariants({ size: "sm" }), "hidden sm:inline-flex")}>
              Download
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="grid size-9 place-items-center rounded-full text-foreground md:hidden"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </Container>

        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.ul
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE_APPLE }}
              className="overflow-hidden md:hidden"
            >
              <Container className="flex flex-col pb-6">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.4, ease: EASE_APPLE }}
                    className="border-b border-line last:border-none"
                  >
                    <Link to={item.to} className="block py-4 text-2xl font-semibold tracking-tight">
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </Container>
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
