import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Play, WifiOff, History, Zap } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const TYPED = "SELECT country, COUNT(*)";
const SUGGESTION = " AS customers\nFROM customers\nGROUP BY country\nORDER BY customers DESC;";

const KEYWORDS = /\b(SELECT|FROM|GROUP BY|ORDER BY|AS|DESC|COUNT)\b/g;

/** Minimal SQL keyword highlighter for the demo snippet. */
function highlight(sql: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of sql.matchAll(KEYWORDS)) {
    const index = match.index ?? 0;
    if (index > last) parts.push(sql.slice(last, index));
    parts.push(
      <span key={index} className="text-accent-violet">
        {match[0]}
      </span>,
    );
    last = index + match[0].length;
  }
  if (last < sql.length) parts.push(sql.slice(last));
  return parts;
}

type Phase = "typing" | "suggesting" | "accepting" | "accepted";

/** Drives the type → suggest → accept loop while the editor is on screen. */
function useGhostLoop(running: boolean) {
  const [typed, setTyped] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    if (!running) return;

    let timer: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      timer =
        typed < TYPED.length
          ? setTimeout(() => setTyped((n) => n + 1), 70)
          : setTimeout(() => setPhase("suggesting"), 350);
    } else if (phase === "suggesting") {
      timer = setTimeout(() => setPhase("accepting"), 1600);
    } else if (phase === "accepting") {
      timer = setTimeout(() => setPhase("accepted"), 350);
    } else {
      timer = setTimeout(() => {
        setTyped(0);
        setPhase("typing");
      }, 3200);
    }
    return () => clearTimeout(timer);
  }, [running, phase, typed]);

  return { typed, phase };
}

function Editor() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const loop = useGhostLoop(inView && !reduceMotion);

  const typed = reduceMotion ? TYPED.length : loop.typed;
  const phase: Phase = reduceMotion ? "accepted" : loop.phase;
  const showGhost = phase !== "typing";
  const accepted = phase === "accepted";

  return (
    <div ref={ref} className="overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)]">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex gap-2" aria-hidden="true">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="font-mono text-xs text-subtle-foreground">Query 1 · chinook.db</span>
        <span className="inline-flex items-center gap-1.5 rounded-md bg-success/15 px-2 py-1 text-[11px] font-medium text-success">
          <Play className="size-3 fill-current" /> Run
        </span>
      </div>

      <div className="relative min-h-[220px] p-5 font-mono text-[13px] leading-7 sm:p-6 sm:text-[15px]">
        <pre className="whitespace-pre-wrap">
          <code>
            {highlight(TYPED.slice(0, typed))}
            {showGhost && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className={cn(
                  "transition-colors duration-300",
                  accepted ? "text-foreground" : "text-subtle-foreground italic",
                )}
              >
                {accepted ? highlight(SUGGESTION) : SUGGESTION}
              </motion.span>
            )}
            <span className="animate-caret ml-px inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-accent" />
          </code>
        </pre>

        <AnimatePresence>
          {(phase === "suggesting" || phase === "accepting") && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="absolute right-5 bottom-5 flex items-center gap-2 font-sans text-xs text-muted-foreground"
            >
              <motion.kbd
                animate={phase === "accepting" ? { scale: 0.9, backgroundColor: "var(--accent)" } : { scale: 1 }}
                className="rounded-md border border-line-strong bg-surface-raised px-2 py-1 font-mono text-[11px] text-foreground"
              >
                Tab
              </motion.kbd>
              to accept
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const POINTS = [
  { icon: History, title: "Learns from you", body: "Suggestions come from the queries you've actually run." },
  { icon: WifiOff, title: "Fully offline", body: "It runs on your machine, with no cloud and no API key." },
  { icon: Zap, title: "One keystroke", body: "Press Tab to accept, keep typing to ignore." },
];

export function GhostDemo() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_40%_at_50%_60%,color-mix(in_srgb,var(--accent)_10%,transparent),transparent)]"
      />
      <Container>
        <SectionHeading
          eyebrow="Inline suggestions"
          title={
            <>
              Finishes your thoughts.
              <br />
              <span className="text-gradient">Before you do.</span>
            </>
          }
        />

        <Reveal delay={0.1} className="mx-auto mt-16 max-w-3xl">
          <Editor />
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-4xl gap-10 sm:grid-cols-3">
          {POINTS.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={0.1 + i * 0.08} className="text-center sm:text-left">
              <Icon className="mx-auto size-5 text-accent sm:mx-0" />
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
