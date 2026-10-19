import logo from "@/assets/logo.webp";
import { DownloadButton } from "@/components/download/download-button";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { useLatestRelease } from "@/hooks/useLatestRelease";
import { formatReleaseDate } from "@/lib/releases";

export function FinalCta() {
  const { release } = useLatestRelease();

  return (
    <section className="relative overflow-hidden py-28 sm:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(40%_50%_at_50%_100%,color-mix(in_srgb,var(--accent-violet)_22%,transparent),transparent)]"
      />
      <Container className="text-center">
        <Reveal>
          <img src={logo} alt="" width={88} height={88} className="mx-auto size-22 drop-shadow-[0_20px_40px_rgba(79,157,255,0.35)]" />
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-display mt-10 text-5xl sm:text-7xl">
            Get <span className="text-gradient">DataCia.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-md text-lg text-muted-foreground">
            Free. No sign-up. No trial.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex justify-center">
            <DownloadButton />
          </div>
          <p className="mt-5 h-5 text-[13px] text-subtle-foreground">
            {release && `Version ${release.version} · Released ${formatReleaseDate(release.publishedAt)}`}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
