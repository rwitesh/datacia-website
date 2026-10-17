import { useRef, type HTMLAttributes, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * Card with a soft accent glow that follows the pointer. The position is
 * written to CSS custom properties, so no React re-render happens on move.
 */
export function SpotlightCard({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    node.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={cn(
        "group/spot relative isolate overflow-hidden rounded-xl border border-line bg-surface",
        "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:opacity-0 before:transition-opacity before:duration-500",
        "before:bg-[radial-gradient(420px_circle_at_var(--spot-x)_var(--spot-y),color-mix(in_srgb,var(--accent)_16%,transparent),transparent_70%)]",
        "hover:before:opacity-100",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
