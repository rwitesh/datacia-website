import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";
import { AppleIcon, WindowsIcon } from "@/components/icons/brand";
import { buttonVariants, type ButtonVariantProps } from "@/components/ui/button";
import { usePlatform } from "@/hooks/usePlatform";
import { PLATFORM_LABEL, type Platform } from "@/lib/platform";
import { cn } from "@/lib/utils";

export const PLATFORM_ICON: Record<Platform, typeof AppleIcon> = {
  mac: AppleIcon,
  windows: WindowsIcon,
};

/** State passed to /download to start the installer download on arrival. */
export interface DownloadRouteState {
  start?: Platform;
}

/**
 * Primary call to action. On a supported desktop it starts the right installer
 * via the download page; everywhere else it opens the download page.
 */
export function DownloadButton({ size = "lg", variant, className }: ButtonVariantProps & { className?: string }) {
  const platform = usePlatform();
  const classes = cn(buttonVariants({ size, variant }), className);

  if (!platform) {
    return (
      <Link to="/download" className={classes}>
        <ArrowDown />
        Download
      </Link>
    );
  }

  const Icon = PLATFORM_ICON[platform];
  const state: DownloadRouteState = { start: platform };

  return (
    <Link to="/download" state={state} className={classes}>
      <Icon />
      Download for {PLATFORM_LABEL[platform]}
    </Link>
  );
}
