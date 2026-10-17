/** Desktop platforms DataCia ships builds for. */
export type Platform = "mac" | "windows";

export const PLATFORMS: readonly Platform[] = ["mac", "windows"];

export const PLATFORM_LABEL: Record<Platform, string> = {
  mac: "macOS",
  windows: "Windows",
};

/**
 * Best-effort guess of the visitor's desktop platform. Returns `null` for
 * Linux, mobile and anything else we don't build for.
 */
export function detectPlatform(): Platform | null {
  if (typeof navigator === "undefined") return null;

  const nav = navigator as Navigator & { userAgentData?: { platform?: string; mobile?: boolean } };
  if (nav.userAgentData?.mobile) return null;

  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod|android/.test(ua)) return null;

  const platform = (nav.userAgentData?.platform ?? navigator.platform ?? "").toLowerCase();
  if (platform.includes("mac")) return "mac";
  if (platform.includes("win")) return "windows";
  return null;
}
