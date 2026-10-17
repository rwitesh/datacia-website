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

export interface LatestRelease {
  version: string;
  publishedAt: Date;
  notesUrl: string;
  installers: Partial<Record<Platform, ReleaseAsset>>;
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

function toAsset(asset: GitHubAsset): ReleaseAsset {
  return { name: asset.name, url: asset.browser_download_url, size: asset.size };
}

function parseRelease(data: GitHubRelease): LatestRelease {
  const installers: LatestRelease["installers"] = {};
  for (const [platform, pattern] of Object.entries(INSTALLER_PATTERNS) as [Platform, RegExp][]) {
    const match = data.assets.find((a) => pattern.test(a.name));
    if (match) installers[platform] = toAsset(match);
  }

  const checksums = data.assets.find((a) => a.name === "SHA256SUMS");

  return {
    version: data.tag_name.replace(/^v/, ""),
    publishedAt: new Date(data.published_at),
    notesUrl: data.html_url,
    installers,
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
