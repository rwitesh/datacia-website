import { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, Apple, Monitor, ShieldAlert, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { NavBar } from "@/components/NavBar";
import Footer from "@/components/Footer";
import {
  getDownloadInfo,
  startDownload,
  type DownloadOS,
  osToDownloadParam,
} from "@/lib/download";

function getDownloadMessage(platform: string): string {
  switch (platform) {
    case "Mac":
      return "Your DataCia.dmg for macOS should start shortly.";
    case "Windows":
      return "Your DataCia.exe for Windows should start shortly.";
    case "Linux":
      return "Your DataCia download for Linux should start shortly.";
    default:
      return "Your DataCia download should start shortly.";
  }
}

const DownloadPage = () => {
  const location = useLocation();
  const platform = location.state?.platform as string | undefined;
  const isDownloading = Boolean(platform);
  const [loadingOS, setLoadingOS] = useState<DownloadOS | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [urlByOS, setUrlByOS] = useState<Partial<Record<DownloadOS, string>>>({});
  const hasAutoStartedRef = useRef(false);

  const handleDownload = async (os: DownloadOS) => {
    setError(null);
    const cached = urlByOS[os];
    if (cached) {
      startDownload(cached);
      return;
    }
    setLoadingOS(os);
    try {
      const { url } = await getDownloadInfo(os);
      setUrlByOS((prev) => ({ ...prev, [os]: url }));
      startDownload(url);
    } catch {
      setError("Unable to start download right now. Please try again in a moment.");
    } finally {
      setLoadingOS(null);
    }
  };

  useEffect(() => {
    if (!isDownloading) return;
    if (hasAutoStartedRef.current) return;
    const param = osToDownloadParam(platform ?? "");
    if (!param) return;
    hasAutoStartedRef.current = true;
    void handleDownload(param);
  }, [isDownloading, platform]);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Download Data<span className="text-primary">Cia</span>
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Available for macOS and Windows. Free to get started.
            </p>
          </motion.div>

          {/* Download area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10"
          >
            {isDownloading && !error ? (
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-10 text-center">
                <Loader2 className="mx-auto h-10 w-10 text-primary animate-spin mb-4" />
                <h2 className="font-mono text-base font-semibold text-foreground mb-1">
                  Your download is starting
                </h2>
                <p className="text-sm text-muted-foreground">
                  {getDownloadMessage(platform ?? "Unknown")}
                </p>
                <Link
                  to="/download"
                  replace
                  className="mt-4 inline-block text-xs font-mono text-primary hover:underline"
                >
                  Show all download options
                </Link>
              </div>
            ) : (
              <>
                {error && (
                  <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3">
                    <p className="text-xs font-mono text-destructive">{error}</p>
                  </div>
                )}
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* macOS */}
                  <div className="rounded-xl border border-border/20 bg-card/10 p-8 text-center hover:border-primary/30 transition-colors">
                    <Apple className="mx-auto h-9 w-9 text-foreground mb-4" />
                    <h2 className="font-mono text-base font-semibold text-foreground mb-1">
                      macOS
                    </h2>
                    <p className="text-xs text-muted-foreground mb-6">
                      Intel & Apple Silicon
                    </p>
                    <Button
                      className="w-full gap-2 glow-cyan font-mono cursor-pointer"
                      onClick={() => handleDownload("darwin")}
                      disabled={loadingOS !== null}
                    >
                      {loadingOS === "darwin" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                      {loadingOS === "darwin" ? "Preparing…" : "Download .dmg"}
                    </Button>
                  </div>

                  {/* Windows */}
                  <div className="rounded-xl border border-border/20 bg-card/10 p-8 text-center hover:border-primary/30 transition-colors">
                    <Monitor className="mx-auto h-9 w-9 text-foreground mb-4" />
                    <h2 className="font-mono text-base font-semibold text-foreground mb-1">
                      Windows
                    </h2>
                    <p className="text-xs text-muted-foreground mb-6">
                      Windows 10 and above
                    </p>
                    <Button
                      className="w-full gap-2 glow-cyan font-mono cursor-pointer"
                      onClick={() => handleDownload("windows")}
                      disabled={loadingOS !== null}
                    >
                      {loadingOS === "windows" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                      {loadingOS === "windows" ? "Preparing…" : "Download .exe"}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>

          {/* Security notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="rounded-xl border border-border/40 bg-card/10 p-8">
              <div className="flex items-start gap-3 mb-6">
                <ShieldAlert className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-mono text-sm font-semibold text-foreground">
                    Security warnings on first launch
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                    DataCia isn't enrolled in Apple or Microsoft's publisher programs yet. You may see a security prompt the first time you open it — that's expected. Here's how to open it in a few clicks.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* macOS */}
                <div className="rounded-lg border border-border/20 bg-secondary/10 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Apple className="h-4 w-4 text-foreground" />
                    <h4 className="font-mono text-sm font-semibold text-foreground">
                      macOS — Gatekeeper
                    </h4>
                  </div>
                  <ol className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="shrink-0 font-mono text-primary text-xs">1.</span>
                      <span>
                        <strong className="text-foreground">Right-click</strong> DataCia.app in Finder → select{" "}
                        <strong className="text-foreground">Open</strong>
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 font-mono text-primary text-xs">2.</span>
                      <span>
                        Click <strong className="text-foreground">Open</strong> in the dialog to confirm
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 font-mono text-primary text-xs">3.</span>
                      <span>
                        If that option doesn't appear, go to{" "}
                        <strong className="text-foreground">System Settings → Privacy & Security → Scroll to the bottom</strong>{" "}
                        and click <strong className="text-foreground">Allow Anyway</strong>
                      </span>
                    </li>
                  </ol>
                  <p className="mt-4 pt-4 border-t border-border/20 text-xs text-muted-foreground">
                    macOS remembers your choice — you only need to do this once.
                  </p>
                </div>

                {/* Windows */}
                <div className="rounded-lg border border-border/20 bg-secondary/10 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Monitor className="h-4 w-4 text-foreground" />
                    <h4 className="font-mono text-sm font-semibold text-foreground">
                      Windows — SmartScreen
                    </h4>
                  </div>
                  <ol className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="shrink-0 font-mono text-primary text-xs">1.</span>
                      <span>
                        Run the installer — when the SmartScreen dialog appears, click{" "}
                        <strong className="text-foreground">More info</strong>
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 font-mono text-primary text-xs">2.</span>
                      <span>
                        Click <strong className="text-foreground">Run anyway</strong> to proceed
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 font-mono text-primary text-xs">3.</span>
                      <span>
                        If no dialog appears, the installer will proceed automatically
                      </span>
                    </li>
                  </ol>
                  <p className="mt-4 pt-4 border-t border-border/20 text-xs text-muted-foreground">
                    SmartScreen flags any app without a publisher certificate — not a virus warning.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DownloadPage;