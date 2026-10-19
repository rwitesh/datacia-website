import { Fragment, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowUpRight, CircleAlert, ShieldCheck } from "lucide-react";
import { PLATFORM_ICON, type DownloadRouteState } from "@/components/download/download-button";
import { EASE_APPLE, Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useLatestRelease, type ReleaseStatus } from "@/hooks/useLatestRelease";
import { usePlatform } from "@/hooks/usePlatform";
import { PLATFORM_LABEL, PLATFORMS, type Platform } from "@/lib/platform";
import { formatBytes, formatReleaseDate, type LatestRelease } from "@/lib/releases";
import { LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";

const PLATFORM_DETAILS: Record<Platform, { requirement: string; format: string }> = {
  mac: { requirement: "Apple Silicon & Intel", format: "Disk image (.dmg)" },
  windows: { requirement: "Windows 10 or later · x64 & ARM64", format: "Installer (.exe)" },
};

const INSTALL_STEPS: Record<Platform, string[]> = {
  mac: [
    "Open the .dmg and drag DataCia into Applications.",
    "On first launch macOS may say it can't verify the developer.",
    "Open System Settings → Privacy & Security and choose Open Anyway. You only do this once.",
  ],
  windows: [
    "Run the installer. It installs for your user, so no admin rights are needed.",
    "If SmartScreen appears, choose More info.",
    "Then choose Run anyway. SmartScreen flags any app without a paid publisher certificate.",
  ],
};

/** Reads the one-shot "start this download" request and clears it from history. */
function useRequestedDownload(): Platform | null {
  const { pathname, state } = useLocation();
  const navigate = useNavigate();
  const [requested] = useState(() => (state as DownloadRouteState | null)?.start ?? null);

  // Drop the request from history so a reload doesn't download again.
  useEffect(() => {
    if (requested) navigate(pathname, { replace: true, state: null });
  }, [requested, pathname, navigate]);

  return requested;
}

function PlatformCard({
  platform,
  release,
  status,
  recommended,
}: {
  platform: Platform;
  release: LatestRelease | null;
  status: ReleaseStatus;
  recommended: boolean;
}) {
  const Icon = PLATFORM_ICON[platform];
  const asset = release?.installers[platform];
  const alternates = release?.alternates[platform] ?? [];
  const details = PLATFORM_DETAILS[platform];

  return (
    <div
      className={cn(
        "relative flex flex-col items-center rounded-2xl border bg-surface p-8 text-center transition-colors sm:p-10",
        recommended ? "border-accent/50 shadow-[0_0_0_1px_var(--accent),0_30px_80px_-40px_var(--accent)]" : "border-line",
      )}
    >
      {recommended && (
        <span className="absolute -top-3 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-accent-foreground">
          Recommended for you
        </span>
      )}
      <Icon className="size-12" />
      <h2 className="mt-6 text-2xl font-semibold tracking-tight">{PLATFORM_LABEL[platform]}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{details.requirement}</p>

      <a
        href={asset?.url ?? LINKS.latestRelease}
        {...(asset ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        className={cn(buttonVariants({ variant: recommended ? "primary" : "secondary", size: "lg" }), "mt-8 w-full")}
      >
        {asset || status === "loading" ? <ArrowDown /> : <ArrowUpRight />}
        {asset || status === "loading" ? `Download for ${PLATFORM_LABEL[platform]}` : "Get it on GitHub"}
      </a>

      <p className="mt-4 h-4 font-mono text-[11px] text-subtle-foreground">
        {asset
          ? `${alternates.length > 0 ? "Universal · " : ""}${details.format} · ${formatBytes(asset.size)}`
          : status === "loading"
            ? ""
            : details.format}
      </p>

      {alternates.length > 0 && (
        <p className="mt-3 text-xs text-muted-foreground">
          Other downloads:{" "}
          {alternates.map((alt, i) => (
            <Fragment key={alt.name}>
              {i > 0 && " · "}
              <span className="whitespace-nowrap">
                <a href={alt.url} title={alt.name} className="font-medium text-accent hover:underline">
                  {alt.label}
                </a>{" "}
                <span className="font-mono text-[11px] text-subtle-foreground">{formatBytes(alt.size)}</span>
              </span>
            </Fragment>
          ))}
        </p>
      )}
    </div>
  );
}

function StartedNotice({
  platform,
  release,
  status,
}: {
  platform: Platform;
  release: LatestRelease | null;
  status: ReleaseStatus;
}) {
  const asset = release?.installers[platform];
  const failed = status === "error" || (status === "ready" && !asset);

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_APPLE }}
      role="status"
      className={cn(
        "mx-auto mb-12 flex max-w-2xl items-center gap-3 rounded-2xl border px-5 py-4 text-sm",
        failed ? "border-danger/30 bg-danger/10" : "border-accent/30 bg-accent/10",
      )}
    >
      {failed ? (
        <>
          <CircleAlert className="size-5 shrink-0 text-danger" />
          <span className="flex-1">
            We couldn't reach GitHub just now. You can grab the installer from the{" "}
            <a href={LINKS.latestRelease} target="_blank" rel="noopener noreferrer" className="font-medium text-accent hover:underline">
              latest release
            </a>
            .
          </span>
        </>
      ) : (
        <>
          <ArrowDown className="size-5 shrink-0 animate-bounce text-accent" />
          <span className="flex-1">
            {asset ? (
              <>
                Your download of <span className="font-mono text-[13px]">{asset.name}</span> has started.{" "}
                <a href={asset.url} className="font-medium text-accent hover:underline">
                  Try again
                </a>
              </>
            ) : (
              "Preparing your download…"
            )}
          </span>
        </>
      )}
    </motion.div>
  );
}

export default function DownloadPage() {
  const { status, release } = useLatestRelease();
  const detected = usePlatform();
  const requested = useRequestedDownload();
  const startedRef = useRef(false);

  // Start the requested installer as soon as its URL is known.
  useEffect(() => {
    const url = requested && release?.installers[requested]?.url;
    if (!url || startedRef.current) return;
    startedRef.current = true;
    window.location.assign(url);
  }, [requested, release]);

  const highlighted = requested ?? detected;

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(50%_50%_at_50%_0%,color-mix(in_srgb,var(--accent)_16%,transparent),transparent)]"
      />

      <Container className="py-20 sm:py-28">
        <AnimatePresence>{requested && <StartedNotice platform={requested} release={release} status={status} />}</AnimatePresence>

        <div className="text-center">
          <Reveal immediate>
            <h1 className="text-display text-5xl sm:text-7xl">
              Download <span className="text-gradient">DataCia</span>
            </h1>
          </Reveal>
          <Reveal immediate delay={0.08}>
            <p className="mt-6 min-h-7 text-lg text-balance text-muted-foreground">
              {release ? (
                <>
                  Version {release.version} · {formatReleaseDate(release.publishedAt)} ·{" "}
                  <a href={release.notesUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    What's new
                  </a>
                </>
              ) : (
                "Free and open source. Distributed through GitHub Releases."
              )}
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
          {PLATFORMS.map((platform, i) => (
            <Reveal key={platform} immediate delay={0.15 + i * 0.08}>
              <PlatformCard platform={platform} release={release} status={status} recommended={platform === highlighted} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-24 max-w-4xl">
          <h2 className="text-display text-center text-3xl sm:text-4xl">First launch</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
            DataCia isn't signed with a paid Apple or Microsoft certificate yet, so your OS asks once before opening it.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {PLATFORMS.map((platform) => {
              const Icon = PLATFORM_ICON[platform];
              return (
                <div key={platform} className="surface p-7 sm:p-8">
                  <div className="flex items-center gap-2.5">
                    <Icon className="size-5" />
                    <h3 className="font-semibold">{PLATFORM_LABEL[platform]}</h3>
                  </div>
                  <ol className="mt-6 space-y-4">
                    {INSTALL_STEPS[platform].map((step, i) => (
                      <li key={step} className="flex gap-4 text-[15px] leading-relaxed text-muted-foreground">
                        <span className="grid size-6 shrink-0 place-items-center rounded-full border border-line-strong font-mono text-[11px] text-foreground">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal className="mx-auto mt-16 flex max-w-4xl flex-col items-center justify-center gap-x-8 gap-y-3 text-sm sm:flex-row">
          {release?.checksumsUrl && (
            <a href={release.checksumsUrl} className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
              <ShieldCheck className="size-4" /> Verify with SHA256SUMS
            </a>
          )}
          <a href={LINKS.releases} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
            All releases ↗
          </a>
          <a href={LINKS.development} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
            Build from source ↗
          </a>
        </Reveal>
      </Container>
    </div>
  );
}
