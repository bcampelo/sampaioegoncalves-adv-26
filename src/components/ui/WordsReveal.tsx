import { useRef, type ElementType } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { cx } from "@/lib/utils";
import { EASE, DURATION, STAGGER } from "@/lib/motion";

interface WordsRevealProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** classe aplicada a cada palavra (útil para gradiente por ênfase) */
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  /** dispara ao entrar na viewport; se false, anima no mount (hero) */
  onScroll?: boolean;
  start?: string;
  /** leve desfoque inicial que dissolve junto do reveal (profundidade sutil) */
  blur?: boolean;
}

/**
 * Divide o texto em palavras, cada uma dentro de uma máscara (overflow hidden),
 * e revela com translateY + stagger. Base do "kinetic reveal" editorial.
 */
export function WordsReveal({
  text,
  as,
  className,
  wordClassName,
  delay = 0,
  stagger = STAGGER.loose,
  onScroll = false,
  start = "top 85%",
  blur = false,
}: WordsRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? "span") as ElementType;
  const words = text.split(" ");

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = el.querySelectorAll<HTMLElement>("[data-word]");
      if (prefersReducedMotion()) {
        gsap.set(el, { opacity: 1 });
        gsap.set(targets, { yPercent: 0, opacity: 1, filter: "blur(0px)" });
        return;
      }
      gsap.set(el, { opacity: 1 });
      gsap.fromTo(
        targets,
        { yPercent: 118, opacity: 0, filter: blur ? "blur(8px)" : "blur(0px)" },
        {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: DURATION.lg,
          ease: EASE.outStrong,
          stagger,
          delay,
          ...(onScroll
            ? { scrollTrigger: { trigger: el, start, once: true } }
            : {}),
        }
      );
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={cx("opacity-0", className)}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-flex overflow-hidden align-bottom"
          style={{ marginRight: "0.24em", lineHeight: 1.05, paddingBottom: "0.08em" }}
        >
          <span data-word className={cx("inline-block", wordClassName)}>
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
