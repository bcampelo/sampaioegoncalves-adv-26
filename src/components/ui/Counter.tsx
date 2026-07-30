import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";

interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

/** Conta de 0 até target ao entrar na viewport, sem dependências externas. */
export function Counter({ target, suffix = "", duration = 2 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        el.textContent = `${target}${suffix}`;
        return;
      }
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = `${Math.round(obj.val)}${suffix}`;
        },
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} aria-label={`${target}${suffix}`}>
      0{suffix}
    </span>
  );
}
