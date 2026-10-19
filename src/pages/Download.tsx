import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowUpRight, ChevronDown, CircleAlert, ShieldCheck } from "lucide-react";
import { PLATFORM_ICON, type DownloadRouteState } from "@/components/download/download-button";
import { EASE_APPLE, Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useLatestRelease, type ReleaseStatus } from "@/hooks/useLatestRelease";
import { useArch, usePlatform } from "@/hooks/usePlatform";
import { PLATFORM_LABEL, PLATFORMS, type Arch, type Platform } from "@/lib/platform";
import { formatBytes, formatReleaseDate, type Build, type LatestRelease, type ReleaseAsset } from "@/lib/releases";
import { LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";

const PLATFORM_DETAILS: Record<Platform, { requirement: string; format: string }> = {
  mac: { requirement: "Apple Silicon & Intel", format: "Disk image (.dmg)" },
  windows: { requirement: "Windows 10 or later · x64 & ARM64", format: "Installer (.exe)" },
};

/** Builds in the order the picker lists them. */
const BUILD_OPTIONS: Record<Platform, { build: Build; label: string; hint: string }[]> = {
  mac: [
    { build: "arm64", label: "Apple Silicon", hint: "M1 and later" },
    { build: "amd64", label: "Intel", hint: "Intel-based Macs" },
    { build: "universal", label: "Universal", hint: "Any Mac" },
  ],
  windows: [
    { build: "amd64", label: "x64", hint: "Most Windows PCs" },
    { build: "arm64", label: "ARM64", hint: "Snapdragon PCs" },
    { build: "universal", label: "Universal", hint: "Any PC" },
  ],
};

/** Offer the visitor's own architecture when we know it; universal runs everywhere otherwise. */
function defaultBuild(installers: Partial<Record<Build, ReleaseAsset>>, arch: Arch | null | undefined): Build {
  return arch && installers[arch] ? arch : "universal";
}

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
  arch,
}: {
  platform: Platform;
  release: LatestRelease | null;
  status: ReleaseStatus;
  recommended: boolean;
  /** The visitor's architecture on their own platform; `null` for the other one. */
  arch: Arch | null | undefined;
}) {
  const Icon = PLATFORM_ICON[platform];
  const details = PLATFORM_DETAILS[platform];
  const installers = release?.installers[platform] ?? {};
  const options = BUILD_OPTIONS[platform].filter((option) => installers[option.build]);
  const [choice, setChoice] = useState<Build | null>(null);

  const fallback = defaultBuild(installers, arch);
  const build = choice ?? fallback;
  const asset = installers[build];
  const label = BUILD_OPTIONS[platform].find((option) => option.build === build)!.label;
  const pending = status === "loading" || arch === undefined;
  // The card already names the OS, so with a choice of builds the button names the build.
  const action =
    options.length < 2 || pending
      ? `Download for ${PLATFORM_LABEL[platform]}`
      : build === "universal"
        ? "Download Universal"
        : `Download for ${label}`;

  // Only explain the default on the visitor's own platform, and only while it's selected.
  const note =
    build !== fallback || arch === undefined || options.length < 2 || !recommended
      ? null
      : arch && build === arch
        ? `Matched to your ${platform === "mac" ? "Mac" : "PC"}.`
        : `We couldn't detect your ${platform === "mac" ? "Mac's chip" : "PC's processor"}, so this is the universal build.`;

  return (
    <div
      className={cn(
        "relative flex flex-col items-center rounded-2xl border bg-surface p-6 text-center transition-colors sm:p-10",
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

      {options.length > 1 && !pending && (
        <div className="relative mt-8 w-full">
          <select
            aria-label={`${PLATFORM_LABEL[platform]} build`}
            value={build}
            onChange={(event) => setChoice(event.target.value as Build)}
            className="h-11 w-full cursor-pointer appearance-none truncate rounded-full border border-line-strong bg-foreground/[0.04] pr-10 pl-5 text-[13px] text-foreground sm:text-sm transition-colors hover:bg-foreground/[0.09] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {options.map((option) => (
              <option key={option.build} value={option.build}>
                {option.label} · {option.hint} · {formatBytes(installers[option.build]!.size)}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      )}

      <a
        href={asset?.url ?? LINKS.latestRelease}
        {...(asset ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        className={cn(
          buttonVariants({ variant: recommended ? "primary" : "secondary", size: "lg" }),
          options.length > 1 && !pending ? "mt-3" : "mt-8",
          "w-full px-5",
        )}
      >
        {asset || pending ? <ArrowDown /> : <ArrowUpRight />}
        {asset || pending ? action : "Get it on GitHub"}
      </a>

      <p className="mt-4 h-4 font-mono text-[11px] text-subtle-foreground">
        {asset && !pending ? `${details.format} · ${formatBytes(asset.size)}` : pending ? "" : details.format}
      </p>
      {note && <p className="mt-2 text-xs text-balance text-muted-foreground">{note}</p>}
    </div>
  );
}

function StartedNotice({ asset, status }: { asset: ReleaseAsset | null | undefined; status: ReleaseStatus }) {
  const failed = status === "error" || asset === null;

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
  const arch = useArch(detected);
  const requested = useRequestedDownload();
  const startedRef = useRef(false);

  // The requested installer: `undefined` until the release and architecture are known, `null` if missing.
  const requestedArch = requested === detected ? arch : null;
  const requestedInstallers = requested && release?.installers[requested];
  const requestedAsset =
    requestedInstallers && requestedArch !== undefined
      ? (requestedInstallers[defaultBuild(requestedInstallers, requestedArch)] ?? null)
      : status === "error"
        ? null
        : undefined;

  // Start the requested installer as soon as its URL is known.
  useEffect(() => {
    if (!requestedAsset || startedRef.current) return;
    startedRef.current = true;
    window.location.assign(requestedAsset.url);
  }, [requestedAsset]);

  const highlighted = requested ?? detected;

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(50%_50%_at_50%_0%,color-mix(in_srgb,var(--accent)_16%,transparent),transparent)]"
      />

      <Container className="py-20 sm:py-28">
        <AnimatePresence>{requested && <StartedNotice asset={requestedAsset} status={status} />}</AnimatePresence>

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

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {PLATFORMS.map((platform, i) => (
            <Reveal key={platform} immediate delay={0.15 + i * 0.08}>
              <PlatformCard
                platform={platform}
                release={release}
                status={status}
                recommended={platform === highlighted}
                arch={platform === detected ? arch : null}
              />
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
