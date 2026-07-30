import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MANIFESTO } from "@/data/content";

export function Sobre() {
  return (
    <section id="sobre" className="relative py-section">
      <div className="shell">
        <SectionHeading
          overline="O Escritório"
          title="Uma banca construída sobre"
          emphasis="princípios."
          description="Sampaio & Gonçalves Advogados Associados nasceu do compromisso de oferecer uma advocacia técnica, próxima e verdadeiramente dedicada a cada cliente."
          className="max-w-3xl"
        />

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-3">
          {MANIFESTO.map((item, i) => (
            <Reveal
              key={item.num}
              y={28}
              delay={i * 0.08}
              className="group flex flex-col gap-4 border-t border-ink/10 pt-8 transition-colors duration-500 hover:border-gold/30"
            >
              <span className="font-display text-2xl text-gold/70">
                {item.num}
              </span>
              <h3 className="font-display text-3xl text-ink md:text-4xl">
                {item.title}
              </h3>
              <p className="max-w-md text-base leading-relaxed text-ink-muted">
                {item.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
