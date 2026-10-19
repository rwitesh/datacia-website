import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";
import { AppleIcon, WindowsIcon } from "@/components/icons/brand";
import { buttonVariants, type ButtonVariantProps } from "@/components/ui/button";
import type { Platform } from "@/lib/platform";
import { cn } from "@/lib/utils";

export const PLATFORM_ICON: Record<Platform, typeof AppleIcon> = {
  mac: AppleIcon,
  windows: WindowsIcon,
};

/**
 * Primary call to action. It opens the download page, which picks the right
 * installer for the visitor's OS and CPU and lets them choose another build.
 */
export function DownloadButton({ size = "lg", variant, className }: ButtonVariantProps & { className?: string }) {
  return (
    <Link to="/download" className={cn(buttonVariants({ size, variant }), className)}>
      <ArrowDown />
      Download
    </Link>
  );
}
