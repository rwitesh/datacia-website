import { ArrowUpRight } from "lucide-react";
import { LINKS } from "@/lib/site";

export function AnnouncementBar() {
  return (
    <a
      href={LINKS.repo}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-9 items-center justify-center gap-2 overflow-hidden border-b border-line bg-surface px-4 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,var(--accent),var(--accent-violet),transparent)] opacity-60"
      />
      <span className="rounded-full bg-accent/15 px-2 py-px text-[11px] font-semibold text-accent">New</span>
      <span className="truncate">
        DataCia is <span className="font-medium text-foreground">free and open source</span>
        <span className="hidden sm:inline">. Star it on GitHub.</span>
      </span>
      <ArrowUpRight className="size-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}
