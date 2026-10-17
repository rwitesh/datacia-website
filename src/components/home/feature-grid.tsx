import type { LucideIcon } from "lucide-react";
import { Cpu, FolderTree, KeyRound, Laptop, Lock, Palette, RefreshCw } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

interface Tile {
  icon: LucideIcon;
  title: string;
  body: string;
  wide?: boolean;
}

const TILES: Tile[] = [
  {
    icon: Laptop,
    title: "Local-first, by design",
    body: "Connections go straight from your machine to your database. Nothing is proxied, nothing is uploaded, no account is needed.",
    wide: true,
  },
  {
    icon: Lock,
    title: "Encrypted credentials",
    body: "Saved passwords are encrypted with a key bound to your device.",
  },
  {
    icon: KeyRound,
    title: "SSH tunnelling",
    body: "Reach private databases through a bastion with a password or key.",
  },
  {
    icon: FolderTree,
    title: "History & saved queries",
    body: "Search past queries by text and date. Organise the keepers in folders.",
  },
  {
    icon: Palette,
    title: "Make it yours",
    body: "Light, dark or system theme with your choice of fonts and editor colours.",
  },
  {
    icon: RefreshCw,
    title: "Updates itself",
    body: "New versions download quietly in the background and install on restart.",
  },
  {
    icon: Cpu,
    title: "Universal builds",
    body: "Native on Apple Silicon and Intel Macs, and on x64 and ARM64 Windows. One download covers every machine.",
    wide: true,
  },
];

export function FeatureGrid() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Thoughtful details"
          title="Small things, done right."
          description="The quiet features you'll only notice because they're always there."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TILES.map(({ icon: Icon, title, body, wide }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.06} className={cn(wide && "lg:col-span-2")}>
              <SpotlightCard className="h-full p-7 sm:p-8">
                <div className="grid size-11 place-items-center rounded-xl border border-line bg-surface-raised">
                  <Icon className="size-5 text-accent" />
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted-foreground">{body}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
