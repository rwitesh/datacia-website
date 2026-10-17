import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

/**
 * On every navigation: jump to the `#hash` target if there is one, otherwise
 * start the new page at the top. Keyed on `location.key` so clicking the same
 * hash link twice still scrolls.
 */
function useScrollOnNavigate() {
  const { hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const frame = requestAnimationFrame(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [hash, key]);
}

export function PageShell({ children }: { children: ReactNode }) {
  useScrollOnNavigate();

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
