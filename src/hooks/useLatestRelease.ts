import { useEffect, useState } from "react";
import { fetchLatestRelease, type LatestRelease } from "@/lib/releases";

type State =
  | { status: "loading"; release: null }
  | { status: "ready"; release: LatestRelease }
  | { status: "error"; release: null };

export function useLatestRelease(): State {
  const [state, setState] = useState<State>({ status: "loading", release: null });

  useEffect(() => {
    let active = true;
    fetchLatestRelease()
      .then((release) => active && setState({ status: "ready", release }))
      .catch(() => active && setState({ status: "error", release: null }));
    return () => {
      active = false;
    };
  }, []);

  return state;
}
