/** Vocabulário de motion compartilhado — mesmo ritmo/curva em toda a interface. */

export const EASE = {
  out: "power3.out",
  outSoft: "power2.out",
  outStrong: "power4.out",
  inOut: "power2.inOut",
} as const;

export const DURATION = {
  xs: 0.4,
  sm: 0.6,
  md: 0.9,
  lg: 1.2,
} as const;

export const STAGGER = {
  tight: 0.06,
  base: 0.09,
  loose: 0.12,
} as const;

/** Ponto de entrada padrão para reveals de scroll (ScrollTrigger start). */
export const REVEAL_START = "top 86%";
