import { useMemo } from "react";
import { detectPlatform, type Platform } from "@/lib/platform";

export function usePlatform(): Platform | null {
  return useMemo(detectPlatform, []);
}
