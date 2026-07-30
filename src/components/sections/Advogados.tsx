import { useState } from "react";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { LawyerModal } from "@/components/LawyerModal";
import { LAWYERS, type Lawyer } from "@/data/content";

export function Advogados() {
  const [active, setActive] = useState<Lawyer | null>(null);

  return (
    <section id="advogados" className="relative py-section">
      <div className="shell">
        <SectionHeading
          overline="Advogados"
          title="Quem conduz a"
          emphasis="sua causa."
          description="Uma equipe enxuta e experiente, em que você fala diretamente com quem cuida do seu caso. Duas especialidades principais sustentam um escritório completo — cada sócio também atua nas demais áreas quando o seu caso pede."
          className="max-w-3xl"
        />

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
          {LAWYERS.map((lawyer, i) => {
            const SpecialtyIcon = lawyer.specialty.icon;
            return (
              <Reveal key={lawyer.id} y={30} delay={i * 0.08}>
                <div className="glass-strong relative flex h-full flex-col gap-6 rounded-3xl p-8 md:p-9">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/5 text-gold">
                      <SpecialtyIcon size={22} strokeWidth={1.4} />
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="overline text-gold">
                        Especialidade principal
                      </span>
                      <h3 className="font-display text-2xl text-ink md:text-3xl">
                        {lawyer.specialty.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {lawyer.specialty.points.map((point) => (
                      <span
                        key={point}
                        className="glass rounded-full px-3.5 py-1.5 text-xs text-ink/80"
                      >
                        {point}
                      </span>
                    ))}
                  </div>

                  <p className="mt-auto text-xs text-ink-faint">
                    {lawyer.name} também atua nas demais áreas do escritório
                    quando necessário.
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {LAWYERS.map((lawyer, i) => (
            <Reveal key={lawyer.id} y={40} delay={i * 0.1}>
              <button
                type="button"
                onClick={() => setActive(lawyer)}
                className="group relative block w-full overflow-hidden rounded-3xl text-left"
                data-testid={`lawyer-card-${lawyer.id}`}
                aria-label={`Ver perfil de ${lawyer.name}`}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/10] md:aspect-[4/5]">
                  <img
                    src={lawyer.photo}
                    alt={lawyer.name}
                    style={{ objectPosition: lawyer.photoPosition ?? "center top" }}
                    className="h-full w-full object-cover grayscale-[45%] transition-all duration-[900ms] ease-out-expo group-hover:scale-[1.04] group-hover:grayscale-0"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                </div>

                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-7 md:p-8">
                  <div className="flex flex-col gap-1.5">
                    <span className="overline text-gold">{lawyer.role}</span>
                    <h3 className="font-display text-3xl text-ink md:text-4xl">
                      {lawyer.name}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {lawyer.tags.map((tag) => (
                      <span
                        key={tag}
                        className="glass rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide text-ink/85"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gold opacity-0 transition-all duration-500 ease-out-expo group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/40">
                      <Plus size={14} />
                    </span>
                    Ver perfil completo
                  </div>
                </div>

                <span className="pointer-events-none absolute inset-0 rounded-3xl border border-ink/10 transition-colors duration-500 group-hover:border-gold/30" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <LawyerModal lawyer={active} onClose={() => setActive(null)} />
    </section>
  );
}
