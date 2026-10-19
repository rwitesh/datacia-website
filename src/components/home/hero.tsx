import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import appLightImg from "@/assets/app-light.webp";
import appImg from "@/assets/app.webp";
import { DownloadButton } from "@/components/download/download-button";
import { GitHubIcon } from "@/components/icons/brand";
import { EASE_APPLE, Reveal } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/split-words";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useLatestRelease } from "@/hooks/useLatestRelease";
import { LINKS } from "@/lib/site";

function ReleasePill() {
  const { release } = useLatestRelease();

  return (
    <a
      href={release?.notesUrl ?? LINKS.releases}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 py-1 pr-3 pl-1 text-[13px] text-muted-foreground transition-colors hover:border-line-strong hover:text-foreground"
    >
      <span className="rounded-full bg-foreground px-2 py-0.5 text-[11px] font-semibold text-background">
        Free
      </span>
      Open source{release && <span className="font-mono text-xs text-subtle-foreground">v{release.version}</span>}
      <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

type Appearance = "dark" | "light";

const SHOWCASE: Record<Appearance, { src: string; label: string }> = {
  dark: { src: appImg, label: "Dark" },
  light: { src: appLightImg, label: "Light" },
};

function AppearanceSwitch({ value, onChange }: { value: Appearance; onChange: (next: Appearance) => void }) {
  return (
    <div role="radiogroup" aria-label="App appearance" className="inline-flex rounded-full border border-line bg-surface p-1">
      {(Object.keys(SHOWCASE) as Appearance[]).map((key) => (
        <button
          key={key}
          type="button"
          role="radio"
          aria-checked={value === key}
          onClick={() => onChange(key)}
          className="relative rounded-full px-4 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors aria-checked:text-background"
        >
          {value === key && (
            <motion.span
              layoutId="appearance-pill"
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
              className="absolute inset-0 rounded-full bg-foreground"
            />
          )}
          <span className="relative">{SHOWCASE[key].label}</span>
        </button>
      ))}
    </div>
  );
}

/**
 * App screenshot that tilts up from a perspective and settles flat as you
 * scroll, with a switch to preview the light and dark themes.
 */
function HeroShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [appearance, setAppearance] = useState<Appearance>("dark");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  const rotateX = useTransform(progress, [0, 1], [24, 0]);
  const scale = useTransform(progress, [0, 1], [0.88, 1]);
  const glow = useTransform(progress, [0, 1], [0.25, 0.7]);

  return (
    <div ref={ref} className="relative mx-auto mt-20 max-w-6xl [perspective:1600px] sm:mt-24">
      <motion.div
        aria-hidden="true"
        style={{ opacity: glow }}
        className="absolute inset-x-[10%] top-[12%] -z-10 h-2/3 rounded-full bg-[radial-gradient(closest-side,var(--accent),transparent)] blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.5, ease: EASE_APPLE }}
      >
        {/* Both themes share one grid cell so switching never shifts layout. */}
        <motion.div style={{ rotateX, scale, transformOrigin: "center top" }} className="grid">
          {(Object.keys(SHOWCASE) as Appearance[]).map((key) => (
            <motion.img
              key={key}
              src={SHOWCASE[key].src}
              alt={`DataCia in ${key} mode showing the customers table of a SQLite database`}
              aria-hidden={appearance !== key}
              width={1491}
              height={879}
              initial={false}
              animate={{ opacity: appearance === key ? 1 : 0 }}
              transition={{ duration: 0.6, ease: EASE_APPLE }}
              className="w-full [grid-area:1/1]"
            />
          ))}
        </motion.div>
        <div className="mt-6 flex justify-center">
          <AppearanceSwitch value={appearance} onChange={setAppearance} />
        </div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-16 sm:pt-24 sm:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(60%_50%_at_50%_0%,color-mix(in_srgb,var(--accent-violet)_18%,transparent),transparent)]"
      />

      <Container className="text-center">
        <Reveal immediate>
          <ReleasePill />
        </Reveal>

        <h1 className="text-display mx-auto mt-8 max-w-5xl text-[44px] sm:text-7xl md:text-[88px]">
          <SplitWords text="Your databases." className="block" delay={0.1} />
          <SplitWords text="Beautifully fast." className="text-gradient animate-shimmer block" delay={0.3} />
        </h1>

        <Reveal immediate delay={0.55}>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl">
            An AI-assisted database client that runs on your machine. Free and open source.
          </p>
        </Reveal>

        <Reveal immediate delay={0.7}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <DownloadButton />
            <a
              href={LINKS.repo}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              <GitHubIcon />
              Star on GitHub
            </a>
          </div>
          <p className="mt-5 text-[13px] text-subtle-foreground">macOS &amp; Windows · Free · No account</p>
        </Reveal>

        <HeroShowcase />
      </Container>
    </section>
  );
}
