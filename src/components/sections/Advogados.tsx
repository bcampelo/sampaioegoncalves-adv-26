import { useState } from "react";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { LawyerModal } from "@/components/LawyerModal";
import { LAWYERS, type Lawyer } from "@/data/content";
import { cx } from "@/lib/utils";

export function Advogados() {
  const [active, setActive] = useState<Lawyer | null>(null);

  return (
    <section id="advogados" className="relative py-section">
      <div className="shell">
        <SectionHeading
          overline="Advogados"
          title="Quem conduz a"
          emphasis="sua causa."
          description="Uma equipe enxuta, em que você fala diretamente com quem decide o seu caso. Os dois sócios construíram carreira também na atuação junto ao Ministério Público, no Acre, antes de fundar um escritório completo — cada um à frente de uma especialidade central, e presente nas demais áreas quando o seu caso pede."
          className="max-w-3xl"
        />

        <div className="mt-20 flex flex-col gap-24 md:gap-28">
          {LAWYERS.map((lawyer, i) => {
            const SpecialtyIcon = lawyer.specialty.icon;
            const reversed = i % 2 === 1;
            return (
              <article
                key={lawyer.id}
                className={cx(
                  "flex flex-col gap-10 md:items-center md:gap-14",
                  reversed ? "md:flex-row-reverse" : "md:flex-row"
                )}
              >
                <Reveal
                  y={40}
                  className="md:w-5/12 md:shrink-0"
                >
                  <button
                    type="button"
                    onClick={() => setActive(lawyer)}
                    className="group relative block w-full overflow-hidden rounded-2xl"
                    aria-label={`Ver perfil de ${lawyer.name}`}
                    data-testid={`lawyer-card-${lawyer.id}`}
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                      <img
                        src={lawyer.photo}
                        alt={lawyer.name}
                        style={{ objectPosition: lawyer.photoPosition ?? "center top" }}
                        className="h-full w-full object-cover grayscale-[45%] transition-all duration-[900ms] ease-out-expo group-hover:scale-[1.03] group-hover:grayscale-0"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
                    </div>
                    <span className="pointer-events-none absolute inset-0 rounded-2xl border border-ink/10 transition-colors duration-500 group-hover:border-gold/30" />
                  </button>
                </Reveal>

                <Reveal
                  y={30}
                  delay={0.08}
                  className="flex flex-col items-start gap-5 md:w-7/12"
                >
                  <div className="flex flex-col gap-2">
                    <span className="overline">{lawyer.role}</span>
                    <h3 className="font-display text-4xl text-ink md:text-5xl">
                      {lawyer.name}
                    </h3>
                    <span className="text-sm text-ink-faint">{lawyer.oab}</span>
                  </div>

                  <p className="max-w-xl text-base leading-relaxed text-ink-muted">
                    {lawyer.summary}
                  </p>

                  <div className="flex items-center gap-3 pt-2 text-gold">
                    <SpecialtyIcon size={19} strokeWidth={1.5} />
                    <span className="font-display text-xl italic">
                      {lawyer.specialty.title}
                    </span>
                  </div>
                  <p className="max-w-xl text-sm text-ink-faint">
                    {lawyer.specialty.points.slice(0, 3).join("  ·  ")}
                  </p>

                  <button
                    type="button"
                    onClick={() => setActive(lawyer)}
                    className="group mt-2 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-ink/80 transition-colors duration-300 hover:text-gold"
                  >
                    Ver perfil completo
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-ink/20 transition-all duration-300 group-hover:rotate-90 group-hover:border-gold/50">
                      <Plus size={12} />
                    </span>
                  </button>
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>

      <LawyerModal lawyer={active} onClose={() => setActive(null)} />
    </section>
  );
}
