import axios from "axios";

const DOWNLOAD_API_BASE = "https://api.datacia.app";

export type DownloadOS = "darwin" | "windows";

export function osToDownloadParam(os: string): DownloadOS | null {
  const s = os.toLowerCase();
  if (s.includes("mac") || s === "darwin") return "darwin";
  if (s.includes("win")) return "windows";
  return null;
}

/** Fetch download link from api.datacia.app. */
export async function getDownloadInfo(
  os: DownloadOS,
  arch = "universal"
): Promise<{ version: string; url: string }> {
  const { data } = await axios.get<{ version?: string; url?: string }>(
    `${DOWNLOAD_API_BASE}/download`,
    { params: { os, arch } }
  );
  if (typeof data?.url !== "string") throw new Error("Invalid response");
  return {
    version: typeof data.version === "string" ? data.version : "latest",
    url: data.url,
  };
}

export function startDownload(url: string): void {
  const a = document.createElement("a");
  a.href = url;
  a.download = "";
  a.click();
}
