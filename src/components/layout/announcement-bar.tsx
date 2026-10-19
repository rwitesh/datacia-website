import { useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { LINKS } from "@/lib/site";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative border-b border-line bg-surface">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,var(--accent),var(--accent-violet),transparent)] opacity-60"
      />
      <a
        href={LINKS.repo}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-9 items-center justify-center gap-2 overflow-hidden px-12 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
      >
        <span className="rounded-full bg-accent/15 px-2 py-px text-[11px] font-semibold text-accent">New</span>
        <span className="truncate">
          DataCia is <span className="font-medium text-foreground">free and open source</span>
          <span className="hidden sm:inline">. Star it, fork it, make it better.</span>
        </span>
        <ArrowUpRight className="size-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className="absolute top-1/2 right-3 grid size-6 -translate-y-1/2 place-items-center rounded-full text-subtle-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}
