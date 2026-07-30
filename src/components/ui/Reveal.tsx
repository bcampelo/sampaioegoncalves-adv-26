import { useRef, type ElementType, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { cx } from "@/lib/utils";
import { EASE, DURATION, REVEAL_START } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** deslocamento vertical inicial em px */
  y?: number;
  delay?: number;
  duration?: number;
  /** ponto do ScrollTrigger (start) */
  start?: string;
  once?: boolean;
  /** leve desfoque inicial que dissolve junto do reveal (profundidade sutil) */
  blur?: boolean;
}

/**
 * Revela um bloco ao entrar na viewport: sobe + fade com easing power-out.
 * Sem fade genérico solto — combina translate + opacidade curta.
 */
export function Reveal({
  children,
  as,
  className,
  y = 34,
  delay = 0,
  duration = DURATION.md,
  start = REVEAL_START,
  once = true,
  blur = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? "div") as ElementType;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        gsap.set(el, { opacity: 1, y: 0, filter: "blur(0px)" });
        return;
      }
      gsap.fromTo(
        el,
        { autoAlpha: 0, y, filter: blur ? "blur(10px)" : "blur(0px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration,
          delay,
          ease: EASE.out,
          scrollTrigger: { trigger: el, start, once },
        }
      );
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={cx("opacity-0", className)}>
      {children}
    </Tag>
  );
}
