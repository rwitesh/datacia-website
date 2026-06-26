import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.webp";

export function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const [isOpen, setIsOpen] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onLogoClick = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      scrollToTop();
      if (location.hash) navigate("/", { replace: true });
    }
    setIsOpen(false);
  };

  const onFeaturesClick = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      scrollToSection("features");
      navigate("/#features", { replace: true });
    }
  };

  const onSupportClick = (e: React.MouseEvent) => {
    // If the Support section exists on the current page, scroll to it.
    // Otherwise, fall back to navigating to /#support (Home) which scrolls.
    if (document.getElementById("support")) {
      e.preventDefault();
      scrollToSection("support");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & brand */}
          <Link
            to="/"
            onClick={onLogoClick}
            className="flex items-center gap-2 text-foreground text-xl sm:text-2xl font-bold cursor-pointer select-none"
          >
            <img
              src={logo}
              alt="DataCia Logo"
              className="h-8 sm:h-9 w-auto object-contain"
            />
            <span>
              Data<span className="text-primary">Cia</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/#features"
              onClick={onFeaturesClick}
              className="text-sm font-medium text-foreground/95 hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="text-sm font-medium text-foreground/95 hover:text-primary transition-colors"
            >
              Pricing
            </Link>
            <Link
              to="/#support"
              onClick={onSupportClick}
              className="text-sm font-medium text-foreground/95 hover:text-primary transition-colors"
            >
              Support
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-foreground/5 hover:text-primary transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {isOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl px-4 py-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <Link
            to="/#features"
            onClick={(e) => {
              onFeaturesClick(e);
              setIsOpen(false);
            }}
            className="block py-2.5 px-3 rounded-lg text-base font-medium text-foreground/90 hover:text-primary hover:bg-foreground/5 transition-all"
          >
            Features
          </Link>
          <Link
            to="/pricing"
            onClick={() => setIsOpen(false)}
            className="block py-2.5 px-3 rounded-lg text-base font-medium text-foreground/90 hover:text-primary hover:bg-foreground/5 transition-all"
          >
            Pricing
          </Link>
          <Link
            to="/#support"
            onClick={(e) => {
              onSupportClick(e);
              setIsOpen(false);
            }}
            className="block py-2.5 px-3 rounded-lg text-base font-medium text-foreground/90 hover:text-primary hover:bg-foreground/5 transition-all"
          >
            Support
          </Link>
        </div>
      )}
    </nav>
  );
}

