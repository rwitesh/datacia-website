import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import SignupForm from "@/components/SignupForm";
import appImg from "@/assets/app.webp";

export type OS = "Windows" | "Mac" | "Linux" | "Android" | "iOS" | "Unknown";

export function detectOS(): OS {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const platform = window.navigator.platform.toLowerCase();

  if (platform.includes("win")) return "Windows";
  if (platform.includes("mac")) return "Mac";
  if (platform.includes("linux")) return "Linux";

  if (/android/.test(userAgent)) return "Android";
  if (/iphone|ipad|ipod/.test(userAgent)) return "iOS";

  return "Unknown";
}

const HeroSection = () => {
  const os = detectOS();

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-grid">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/3 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[150px] animate-pulse-glow" />
      <div
        className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-accent/6 blur-[130px] animate-pulse-glow"
        style={{ animationDelay: "2s" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/3 blur-[200px]" />

      <div className="container relative z-10 mx-auto px-4 pt-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-5 py-2"
          >
            <Terminal className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-mono text-primary tracking-wide">
              The future of database tooling
            </span>
          </motion.div>

          <h1 className="mx-auto max-w-4xl text-5xl font-semibold tracking-tight text-foreground sm:text-7xl lg:text-8xl leading-[0.95]">
            The database client <br className="hidden sm:block" />
            that lets you <span className="text-primary text-glow">focus.</span>
          </h1>

          <p className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed sm:text-xl">
            One powerful desktop app for popular relational databases.
            Local-first. AI-assisted. No cloud lock-in.
          </p>

          {/* Download CTA — uncomment when downloads are ready and remove SignupForm below */}
          <div className="mt-12 flex flex-col items-center justify-center gap-3">
            <Link to="/download" state={{ platform: os }}>
              <Button
                size="lg"
                className="gap-2 glow-cyan font-mono px-10 py-6 text-sm cursor-pointer"
              >
                <Download className="h-4 w-4" />
                Download for {os}
              </Button>
            </Link>
            <Link
              to="/download"
              className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
            >
              Other platforms →
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground font-mono"
          >
            <span>Free to start</span>
            <span className="h-3 w-px bg-border/50" />
            <span>macOS & Windows</span>
            <span className="h-3 w-px bg-border/50" />
            <span>No account required</span>
          </motion.div>

          {/* <div className="mt-12 flex flex-col items-center justify-center">
            <SignupForm />
          </div> */}
        </motion.div>

        {/* Hero mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="mx-auto mt-24 w-[80vw]"
        >
          <div className="rounded-2xl border border-border/30 bg-card/60 p-1.5 glow-border backdrop-blur-sm overflow-hidden">
            <img
              src={appImg}
              alt="DataCIa app"
              className="w-full rounded-xl object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>

  );
};

export default HeroSection;
