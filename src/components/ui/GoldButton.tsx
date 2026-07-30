import { forwardRef, type ReactNode } from "react";
import { cx } from "@/lib/utils";

type Variant = "solid" | "ghost";

interface GoldButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  children: ReactNode;
  icon?: ReactNode;
}

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-500 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900";

const variants: Record<Variant, string> = {
  solid:
    "bg-gradient-to-r from-gold-deep via-gold to-gold-light text-navy-950 shadow-[0_10px_30px_-12px_rgba(201,169,97,0.6)] hover:shadow-[0_16px_44px_-12px_rgba(201,169,97,0.75)] hover:-translate-y-0.5",
  ghost:
    "glass text-ink hover:border-gold/40 hover:text-gold hover:-translate-y-0.5",
};

export const GoldButton = forwardRef<HTMLAnchorElement, GoldButtonProps>(
  ({ variant = "solid", className, children, icon, ...props }, ref) => {
    return (
      <a ref={ref} className={cx(base, variants[variant], className)} {...props}>
        <span className="relative z-10 flex items-center gap-2.5">
          {children}
          {icon && (
            <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
              {icon}
            </span>
          )}
        </span>
        {variant === "solid" && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ mixBlendMode: "overlay" }}
          />
        )}
      </a>
    );
  }
);

GoldButton.displayName = "GoldButton";
