import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { MANIFESTO, STATS } from "@/data/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Sobre() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // Parallax entre camadas: os cards de stat sobem em ritmo diferente do texto.
  useGSAP(
    () => {
      if (reduced) return;
      gsap.to("[data-parallax-stats]", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <section
      ref={root}
      id="sobre"
      className="relative py-section"
    >
      <div className="shell grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
        {/* Coluna do manifesto */}
        <div className="lg:col-span-7">
          <SectionHeading
            overline="O Escritório"
            title="Uma banca construída sobre"
            emphasis="princípios."
            description="Sampaio & Gonçalves Advogados Associados nasceu do compromisso de oferecer uma advocacia técnica, próxima e verdadeiramente dedicada a cada cliente."
          />

          <div className="mt-14 flex flex-col gap-px">
            {MANIFESTO.map((item, i) => (
              <Reveal
                key={item.num}
                y={28}
                delay={i * 0.06}
                className="group relative flex flex-col gap-3 border-t border-ink/10 py-8 transition-colors duration-500 hover:border-gold/30 md:flex-row md:gap-10"
              >
                <div className="flex w-full items-baseline gap-4 md:w-56 md:shrink-0">
                  <span className="font-display text-2xl text-gold/70">
                    {item.num}
                  </span>
                  <h3 className="font-display text-3xl text-ink md:text-4xl">
                    {item.title}
                  </h3>
                </div>
                <p className="max-w-md text-base leading-relaxed text-ink-muted">
                  {item.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Coluna dos números */}
        <div className="lg:col-span-5">
          <div
            data-parallax-stats
            className="grid grid-cols-2 gap-4 lg:sticky lg:top-28"
          >
            {STATS.map((stat, i) => (
              <Reveal
                key={stat.label}
                y={30}
                delay={i * 0.08}
                className="glass flex flex-col justify-between gap-6 rounded-2xl p-6 md:p-7"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_16px_2px_rgba(201,169,97,0.6)]" />
                <div>
                  <div className="font-display text-5xl text-gold-gradient md:text-6xl">
                    <Counter target={stat.target} suffix={stat.suffix} />
                  </div>
                  <p className="mt-2 text-sm leading-snug text-ink-muted">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
