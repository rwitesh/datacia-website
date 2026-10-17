import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const widths = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
} as const;

export function Container({
  className,
  width = "default",
  ...props
}: HTMLAttributes<HTMLDivElement> & { width?: keyof typeof widths }) {
  return <div className={cn("mx-auto w-full px-5 sm:px-8", widths[width], className)} {...props} />;
}
