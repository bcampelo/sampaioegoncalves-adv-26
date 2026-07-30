import { Fragment } from "react";
import { MARQUEE_TERMS } from "@/data/content";

/** Ribbon editorial em movimento contínuo (CSS puro, sem lib). */
export function Marquee() {
  const items = [...MARQUEE_TERMS, ...MARQUEE_TERMS];

  return (
    <div
      className="relative overflow-hidden border-y border-ink/10 py-10 md:py-14"
      aria-hidden
    >
      <div className="flex w-max animate-marquee-x whitespace-nowrap will-change-transform">
        {items.map((term, i) => (
          <Fragment key={i}>
            <span className="px-8 font-display text-4xl italic text-ink/15 md:text-6xl">
              {term}
            </span>
            <span className="flex items-center text-gold/30" aria-hidden>
              <span className="block h-1.5 w-1.5 rotate-45 bg-gold/30" />
            </span>
          </Fragment>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-navy-900 to-transparent md:w-48" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-navy-900 to-transparent md:w-48" />
    </div>
  );
}
