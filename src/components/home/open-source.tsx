import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Bug, Check, Copy, GitPullRequest, Star } from "lucide-react";
import { GitHubIcon } from "@/components/icons/brand";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { LINKS, REPO_URL } from "@/lib/site";

const CLONE_COMMAND = `git clone ${REPO_URL}.git`;

interface Action {
  icon: LucideIcon;
  title: string;
  body: string;
  cta: string;
  href: string;
}

const ACTIONS: Action[] = [
  {
    icon: Star,
    title: "Star the repo",
    body: "The simplest way to say thanks, and it helps other engineers find DataCia.",
    cta: "Star on GitHub",
    href: LINKS.repo,
  },
  {
    icon: GitPullRequest,
    title: "Send a pull request",
    body: "New engines, editor features, fixes and docs are all welcome. The dev guide gets you building in minutes.",
    cta: "Read the dev guide",
    href: LINKS.development,
  },
  {
    icon: Bug,
    title: "Report an issue",
    body: "Found a bug or have an idea? Open an issue and help shape what ships next.",
    cta: "Open an issue",
    href: LINKS.newIssue,
  },
];

function CloneCommand() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CLONE_COMMAND);
      setCopied(true);
    } catch {
      // Clipboard access can be denied; the command stays selectable.
    }
  };

  return (
    <div className="mx-auto flex max-w-xl items-center gap-3 rounded-full border border-line-strong bg-surface py-1.5 pr-1.5 pl-5 font-mono text-[13px] shadow-sm">
      <span className="text-subtle-foreground select-none">$</span>
      <code className="min-w-0 flex-1 truncate">{CLONE_COMMAND}</code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy command"}
        className="grid size-8 shrink-0 place-items-center rounded-full bg-foreground text-background transition-transform active:scale-90"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "check" : "copy"}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}

export function OpenSource() {
  return (
    <section id="open-source" className="theme-light bg-background py-24 text-foreground sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Open source"
          title={
            <>
              Free. Open. <span className="text-gradient">Yours.</span>
            </>
          }
          description="DataCia started as a paid app. Today every feature is free for everyone, and the full source is on GitHub — so it can keep getting better with your help."
        />

        <Reveal delay={0.15} className="mt-10">
          <div className="flex flex-col items-center gap-6">
            <a
              href={LINKS.repo}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "contrast", size: "lg" })}
            >
              <GitHubIcon />
              rwitesh/datacia
            </a>
            <div className="w-full">
              <CloneCommand />
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {ACTIONS.map(({ icon: Icon, title, body, cta, href }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <SpotlightCard className="h-full">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col p-7 sm:p-8"
                >
                  <Icon className="size-6 text-accent" />
                  <h3 className="mt-6 text-lg font-semibold tracking-tight">{title}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted-foreground">{body}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent">
                    {cta}
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
