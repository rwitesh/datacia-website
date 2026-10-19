import { useEffect, useMemo, useState } from "react";
import { detectArch, detectPlatform, type Arch, type Platform } from "@/lib/platform";

export function usePlatform(): Platform | null {
  return useMemo(detectPlatform, []);
}

/** The visitor's CPU architecture: `undefined` while detecting, `null` if unknown. */
export function useArch(platform: Platform | null): Arch | null | undefined {
  const [arch, setArch] = useState<Arch | null | undefined>(platform ? undefined : null);

  useEffect(() => {
    if (!platform) return;
    let active = true;
    detectArch(platform)
      .catch(() => null)
      .then((result) => active && setArch(result));
    return () => {
      active = false;
    };
  }, [platform]);

  return arch;
}
