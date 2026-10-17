import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Sparkles } from "lucide-react";
import exportImg from "@/assets/export.webp";
import jsonImg from "@/assets/json.webp";
import queryImg from "@/assets/query.webp";
import scriptImg from "@/assets/script.webp";
import { EASE_APPLE, Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

interface ShotProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

/** A full macOS window capture; it already carries its own frame and shadow. */
function WindowShot({ src, alt, width, height }: ShotProps) {
  return <img src={src} alt={alt} width={width} height={height} className="w-full" loading="lazy" />;
}

/** A cropped panel, framed to sit alongside the window captures. */
function PanelShot({ src, alt, width, height, className }: ShotProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line-strong bg-surface p-1.5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      <img src={src} alt={alt} width={width} height={height} className="w-full rounded-[12px]" loading="lazy" />
    </div>
  );
}

function AssistantMock() {
  return (
    <div className="rounded-2xl border border-line-strong bg-surface p-5 font-mono text-[13px] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] sm:p-6">
      <div className="mb-5 flex items-center gap-2 text-xs text-muted-foreground">
        <Sparkles className="size-3.5 text-accent" />
        AI Assistant
      </div>
      <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-accent px-4 py-2.5 font-sans text-sm text-accent-foreground">
        Why is this query slow?
      </div>
      <div className="mt-4 max-w-[92%] rounded-2xl rounded-bl-md border border-line bg-surface-raised px-4 py-3 leading-relaxed">
        <p className="font-sans text-sm text-muted-foreground">
          <span className="text-foreground">orders</span> is scanned in full because{" "}
          <span className="text-accent">user_id</span> has no index. Add one:
        </p>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-background/60 p-3 text-[12px]">
          <span className="text-accent-violet">CREATE INDEX</span> idx_orders_user{"\n"}
          <span className="text-accent-violet">ON</span> orders (user_id);
        </pre>
      </div>
    </div>
  );
}

interface Chapter {
  eyebrow: string;
  title: string;
  body: string;
  visual: ReactNode;
}

const CHAPTERS: Chapter[] = [
  {
    eyebrow: "SQL editor",
    title: "Write. Format. Run.",
    body: "Syntax highlighting, autocomplete that knows your tables, one-key formatting and instant execution. Everything stays out of your way until you need it.",
    visual: (
      <WindowShot
        src={queryImg}
        alt="SQL editor with a JOIN query and its results below"
        width={1391}
        height={879}
      />
    ),
  },
  {
    eyebrow: "Script mode",
    title: "Whole migrations, one click.",
    body: "Break a script into blocks and run them in order. Each block reports its own status and timing, so you see exactly where things stand.",
    visual: <PanelShot src={scriptImg} alt="Script mode running three CREATE TABLE blocks" width={961} height={644} />,
  },
  {
    eyebrow: "Results & export",
    title: "Your data, any shape.",
    body: "A fast grid with sorting, resizing and cell selection. Copy or export the selection as JSON, CSV or a crisp PNG for your next doc.",
    visual: (
      <PanelShot
        src={exportImg}
        alt="Selected rows with the copy and export menu open"
        width={593}
        height={361}
        className="mx-auto max-w-xl"
      />
    ),
  },
  {
    eyebrow: "Row inspector",
    title: "See rows as JSON.",
    body: "Select any cells and a side panel shows them as clean JSON, ready to copy into a test, a ticket or an API call.",
    visual: <WindowShot src={jsonImg} alt="Orders table with selected rows shown as JSON in a side panel" width={1491} height={879} />,
  },
  {
    eyebrow: "AI assistant",
    title: "Ask in plain English.",
    body: "Generate SQL, explain plans and fix errors. The assistant reads your schema and runs read-only queries to check its answers. Use Anthropic, OpenAI, Gemini, OpenRouter, OpenCode or a local model, called straight from your machine.",
    visual: <AssistantMock />,
  },
];

function ChapterText({ chapter, index, onActive }: { chapter: Chapter; index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className="flex flex-col justify-center py-12 lg:min-h-[70vh] lg:py-0">
      <Reveal>
        <p className="text-sm font-semibold text-accent">{chapter.eyebrow}</p>
        <h3 className="text-display mt-3 text-3xl sm:text-4xl lg:text-5xl">{chapter.title}</h3>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-pretty text-muted-foreground">{chapter.body}</p>
      </Reveal>
      <Reveal delay={0.1} className="mt-10 lg:hidden">
        {chapter.visual}
      </Reveal>
    </div>
  );
}

/**
 * Apple-style scroll story: copy scrolls on the left while a pinned stage on
 * the right cross-fades to the chapter currently in the middle of the viewport.
 */
export function FeatureStory() {
  const [active, setActive] = useState(0);

  return (
    <section id="features" className="pt-24 pb-8 sm:pt-32">
      <Container width="wide">
        <SectionHeading
          eyebrow="Features"
          title={
            <>
              Every tool you reach for.
              <br />
              <span className="text-metal">None of the clutter.</span>
            </>
          }
          description="Every feature that used to sit behind a paywall is now included for everyone."
        />

        <div className="mt-16 grid gap-x-12 lg:mt-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.5fr)]">
          <div>
            {CHAPTERS.map((chapter, i) => (
              <ChapterText key={chapter.title} chapter={chapter} index={i} onActive={setActive} />
            ))}
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-0 flex h-svh items-center">
              <div className="relative w-full">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
                    transition={{ duration: 0.7, ease: EASE_APPLE }}
                  >
                    {CHAPTERS[active]?.visual}
                  </motion.div>
                </AnimatePresence>

                <ol className="mt-8 flex justify-center gap-2" aria-hidden="true">
                  {CHAPTERS.map((chapter, i) => (
                    <li
                      key={chapter.title}
                      className={cn(
                        "h-1.5 rounded-full bg-foreground/20 transition-all duration-500 ease-apple",
                        i === active ? "w-8 bg-foreground" : "w-1.5",
                      )}
                    />
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
