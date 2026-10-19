import { REPO } from "./site";
import type { Platform } from "./platform";

/**
 * Builds are published as GitHub Releases. We read the latest release from the
 * public GitHub API and link straight to the installer asset, so a click starts
 * the download without an intermediate page. If the API is unreachable (rate
 * limit, offline) callers fall back to the release page.
 */

export interface ReleaseAsset {
  name: string;
  url: string;
  size: number;
}

/** A single-architecture installer offered next to the universal one. */
export interface AlternateInstaller extends ReleaseAsset {
  label: string;
}

export interface LatestRelease {
  version: string;
  publishedAt: Date;
  notesUrl: string;
  installers: Partial<Record<Platform, ReleaseAsset>>;
  /** Smaller per-architecture installers; empty for releases before v2.3.0. */
  alternates: Record<Platform, AlternateInstaller[]>;
  checksumsUrl: string | null;
}

interface GitHubAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

interface GitHubRelease {
  tag_name: string;
  html_url: string;
  published_at: string;
  assets: GitHubAsset[];
}

/** Installer file names as produced by the app's release workflow. */
const INSTALLER_PATTERNS: Record<Platform, RegExp> = {
  mac: /-darwin-universal\.dmg$/,
  windows: /-windows-universal-installer\.exe$/,
};

/** Single-architecture installers, in display order. */
const ALTERNATE_PATTERNS: Record<Platform, { label: string; pattern: RegExp }[]> = {
  mac: [
    { label: "Apple Silicon", pattern: /-darwin-arm64\.dmg$/ },
    { label: "Intel", pattern: /-darwin-amd64\.dmg$/ },
  ],
  windows: [
    { label: "x64", pattern: /-windows-amd64-installer\.exe$/ },
    { label: "ARM64", pattern: /-windows-arm64-installer\.exe$/ },
  ],
};

function toAsset(asset: GitHubAsset): ReleaseAsset {
  return { name: asset.name, url: asset.browser_download_url, size: asset.size };
}

function parseRelease(data: GitHubRelease): LatestRelease {
  const installers: LatestRelease["installers"] = {};
  for (const [platform, pattern] of Object.entries(INSTALLER_PATTERNS) as [Platform, RegExp][]) {
    const match = data.assets.find((a) => pattern.test(a.name));
    if (match) installers[platform] = toAsset(match);
  }

  const alternates = { mac: [], windows: [] } as LatestRelease["alternates"];
  for (const [platform, options] of Object.entries(ALTERNATE_PATTERNS) as [Platform, typeof ALTERNATE_PATTERNS.mac][]) {
    for (const { label, pattern } of options) {
      const match = data.assets.find((a) => pattern.test(a.name));
      if (match) alternates[platform].push({ ...toAsset(match), label });
    }
  }

  const checksums = data.assets.find((a) => a.name === "SHA256SUMS");

  return {
    version: data.tag_name.replace(/^v/, ""),
    publishedAt: new Date(data.published_at),
    notesUrl: data.html_url,
    installers,
    alternates,
    checksumsUrl: checksums?.browser_download_url ?? null,
  };
}

let pending: Promise<LatestRelease> | null = null;

/** Fetches the latest release once per page load and shares the result. */
export function fetchLatestRelease(): Promise<LatestRelease> {
  pending ??= fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
    headers: { Accept: "application/vnd.github+json" },
  })
    .then((res) => {
      if (!res.ok) throw new Error(`GitHub responded with ${res.status}`);
      return res.json() as Promise<GitHubRelease>;
    })
    .then(parseRelease)
    .catch((error: unknown) => {
      pending = null; // allow a later retry
      throw error;
    });

  return pending;
}

export function formatBytes(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(mb >= 100 ? 0 : 1)} MB`;
}

export function formatReleaseDate(date: Date): string {
  return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}
