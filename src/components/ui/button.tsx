import { cva, type VariantProps } from "class-variance-authority";

/**
 * Button styles for <a>, router <Link> and <button>. Apply `buttonVariants` to
 * the element directly so navigation stays semantic.
 */
export const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium",
    "transition-[background-color,color,box-shadow,transform] duration-300 ease-apple",
    "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:size-[1.05em] [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-foreground shadow-[0_8px_24px_-12px_var(--accent)] hover:brightness-110",
        contrast: "bg-foreground text-background hover:bg-foreground/85",
        secondary:
          "border border-line-strong bg-foreground/[0.04] text-foreground hover:bg-foreground/[0.09]",
      },
      size: {
        sm: "h-8 px-3.5 text-[13px]",
        md: "h-10 px-5 text-sm",
        lg: "h-12 px-7 text-[15px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
