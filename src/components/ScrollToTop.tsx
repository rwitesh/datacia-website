import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls the window to top whenever the route pathname changes.
 * Ensures pricing (and other pages) always show from the top when navigated to.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
