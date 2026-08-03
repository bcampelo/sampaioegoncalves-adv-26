import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { PRACTICE_AREAS } from "@/data/content";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { perspectiveWrap } from "@/lib/utils";
import { EASE, DURATION, STAGGER } from "@/lib/motion";

export function Areas() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-area-card]");
      if (prefersReducedMotion()) {
        gsap.set(cards, { autoAlpha: 1, y: 0 });
        return;
      }
      ScrollTrigger.batch(cards, {
        start: "top 88%",
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: DURATION.md,
            ease: EASE.out,
            stagger: STAGGER.base,
            overwrite: true,
          }),
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="areas" className="relative py-section">
      <div className="shell">
        <SectionHeading
          overline="Áreas de Atuação"
          title="Soluções jurídicas para"
          emphasis="cada demanda."
          description="Duas grandes especialidades — Ambiental/Agrário e Criminal — sustentadas por um escritório completo, com atuação técnica em todas as frentes do direito."
          className="max-w-3xl"
        />

        <div
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          style={perspectiveWrap}
        >
          {PRACTICE_AREAS.map((area) => {
            const Icon = area.icon;
            return (
              <div
                key={area.title}
                data-area-card
                className="opacity-0 [transform:translateY(36px)]"
              >
                <TiltCard className="group h-full">
                  <div className="glass relative flex h-full flex-col gap-6 overflow-hidden rounded-2xl p-7 transition-colors duration-500 group-hover:border-gold/25">
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-ink/12 bg-ink/[0.04] text-ink/60 transition-all duration-500 group-hover:border-gold/50 group-hover:bg-gold/5 group-hover:text-gold group-hover:shadow-[0_0_24px_-4px_rgba(201,169,97,0.6)]">
                      <Icon size={24} strokeWidth={1.4} />
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <h3 className="font-display text-2xl text-ink">
                        {area.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-ink-muted">
                        {area.desc}
                      </p>
                      {area.partner && (
                        <p className="mt-1 text-xs uppercase tracking-[0.15em] text-gold/80">
                          Sócio responsável — {area.partner}
                        </p>
                      )}
                    </div>
                    <div className="mt-auto h-px w-0 bg-gradient-to-r from-gold to-transparent transition-all duration-500 ease-out-expo group-hover:w-full" />
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
