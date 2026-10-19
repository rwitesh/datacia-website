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

/** CPU architectures DataCia ships single-architecture builds for. */
export type Arch = "arm64" | "amd64";

type UADataWithHints = { getHighEntropyValues?: (hints: string[]) => Promise<{ architecture?: string }> };

/**
 * Best-effort guess of the visitor's CPU architecture. Returns `null` when we
 * can't tell confidently, in which case the universal build is the safe pick.
 */
export async function detectArch(platform: Platform): Promise<Arch | null> {
  const uaData = (navigator as Navigator & { userAgentData?: UADataWithHints }).userAgentData;
  try {
    // Chromium reports the real architecture, including "arm" on Apple Silicon.
    const { architecture } = (await uaData?.getHighEntropyValues?.(["architecture", "bitness"])) ?? {};
    if (architecture === "arm") return "arm64";
    if (architecture === "x86") return "amd64";
  } catch {
    // Hints were refused; fall through to the heuristics below.
  }

  if (platform === "windows") return /arm64|aarch64/i.test(navigator.userAgent) ? "arm64" : "amd64";

  // Safari and Firefox always claim an Intel Mac, but the GPU name gives Apple Silicon away.
  try {
    const gl = document.createElement("canvas").getContext("webgl");
    const info = gl?.getExtension("WEBGL_debug_renderer_info");
    const renderer = String(gl?.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER) ?? "");
    if (/apple (m\d|gpu)/i.test(renderer)) return "arm64";
    if (/intel|amd|radeon/i.test(renderer)) return "amd64";
  } catch {
    // No WebGL; we can't tell.
  }
  return null;
}
