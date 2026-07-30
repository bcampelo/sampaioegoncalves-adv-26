import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useIsTouch } from "@/hooks/useMediaQuery";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { cx } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
}

/**
 * Tilt 3D suave seguindo o cursor + reflexo dourado que acompanha a posição.
 * Desativado em touch e reduced-motion.
 */
export function TiltCard({ children, className, max = 5 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();

  useGSAP(
    () => {
      const el = ref.current;
      const glare = glareRef.current;
      if (!el || isTouch || prefersReducedMotion()) return;

      const rotX = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3.out" });
      const rotY = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3.out" });

      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        rotY((px - 0.5) * max * 2);
        rotX((0.5 - py) * max * 2);
        if (glare) {
          gsap.to(glare, {
            opacity: 1,
            background: `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(201,169,97,0.18), transparent 55%)`,
            duration: 0.4,
          });
        }
      };
      const onLeave = () => {
        rotX(0);
        rotY(0);
        if (glare) gsap.to(glare, { opacity: 0, duration: 0.5 });
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: ref, dependencies: [isTouch, max] }
  );

  return (
    <div
      ref={ref}
      className={cx("preserve-3d relative", className)}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
      <div
        ref={glareRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0"
      />
    </div>
  );
}
