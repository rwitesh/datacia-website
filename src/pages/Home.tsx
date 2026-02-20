import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import HeroSection from "@/components/Hero";
import DatabaseStrip from "@/components/DatabaseStrip";
import FeaturesSection from "@/components/Features";
import Footer from "@/components/Footer";

export function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash !== "#features") return;
    const el = document.getElementById("features");
    if (!el) return;
    const id = requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(id);
  }, [hash]);

  return (
    <div>
      <NavBar />
      <HeroSection />
      <DatabaseStrip />
      <FeaturesSection />
      <Footer />
    </div>
  );
}