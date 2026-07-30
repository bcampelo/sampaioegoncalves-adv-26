import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useIsTouch } from "@/hooks/useMediaQuery";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/** Efeito magnético sutil: o elemento é atraído levemente pelo cursor. */
export function Magnetic({ children, strength = 0.25, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || isTouch || prefersReducedMotion()) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });

      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        xTo(relX * strength);
        yTo(relY * strength);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: ref, dependencies: [isTouch, strength] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
