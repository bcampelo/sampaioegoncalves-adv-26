import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { SITE } from "@/data/content";

/**
 * Cortina de abertura com monograma S&G. Ao terminar, sobe revelando o site
 * e dispara onComplete para o Hero iniciar sua entrada.
 */
export function Preloader({ onComplete }: { onComplete: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        onComplete();
        setDone(true);
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => setDone(true),
      });

      tl.fromTo(
        ".pl-mono",
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, ease: "power4.out" }
      )
        .fromTo(
          ".pl-line",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.1, ease: "power2.inOut" },
          "-=0.5"
        )
        .fromTo(
          ".pl-label",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.8"
        )
        .to(".pl-inner", { opacity: 0, duration: 0.5, ease: "power2.in" }, "+=0.35")
        .add(() => onComplete(), ">-0.15")
        .to(".pl-panel", {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
          stagger: 0.06,
        });
    },
    { scope: root }
  );

  if (done) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100]" aria-hidden>
      <div className="absolute inset-0 flex">
        <div className="pl-panel h-full w-1/2 bg-navy-950" />
        <div className="pl-panel h-full w-1/2 bg-navy-950" />
      </div>

      <div className="pl-inner absolute inset-0 flex flex-col items-center justify-center">
        <div className="overflow-hidden">
          <img
            src="/logos/mark-gold.png"
            alt={SITE.monogram}
            className="pl-mono h-20 w-auto md:h-28"
          />
        </div>
        <div className="pl-line mt-6 h-px w-40 origin-left bg-gradient-to-r from-transparent via-gold to-transparent md:w-56" />
        <div className="pl-label mt-5 overline text-ink-faint">
          Advogados Associados
        </div>
      </div>
    </div>
  );
}
