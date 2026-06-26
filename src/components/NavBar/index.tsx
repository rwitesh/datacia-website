import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.webp";

export function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

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
    <nav className="fixed top-0 left-0 right-10 z-50 bg-background/80 backdrop-blur-xl">
      <div className="flex justify-between items-center h-14 mt-2">
        <Link
          to="/"
          onClick={onLogoClick}
          className="flex items-center gap-2 ml-16 text-foreground text-2xl font-bold cursor-pointer"
        >
          <img
            src={logo}
            alt="DataCia"
            className="h-14 w-auto object-contain"
          />
          <span>
            Data<span className="text-primary">Cia</span>
          </span>
        </Link>

        <div className="container mx-auto flex justify-end items-center h-16 gap-8">
          <Link to="/#features" onClick={onFeaturesClick} className="text-foreground">
            Features
          </Link>
          <Link to="/pricing" className="text-foreground">
            Pricing
          </Link>
          <Link to="/#support" onClick={onSupportClick} className="text-foreground">
            Support
          </Link>
          {/* <Link to="/" className="text-foreground">
            About
          </Link> */}
        </div>
      </div>
    </nav>
  );
}
