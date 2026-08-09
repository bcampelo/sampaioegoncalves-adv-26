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
          emphasis="confiança."
          description="Sampaio & Gonçalves Advogados Associados nasceu, em Sena Madureira, do compromisso de oferecer uma advocacia técnica, próxima e verdadeiramente dedicada a cada cliente. Nossa atuação tem foco especial em direito ambiental e agrário, área central para quem vive e trabalha na terra acreana, sustentada por um escritório completo, preparado para acompanhar o cliente em diversas frentes do direito em todo o Acre."
          className="max-w-3xl"
        />

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-3">
          {MANIFESTO.map((item, i) => (
            <Reveal
              key={item.num}
              y={28}
              delay={i * 0.08}
              className="group flex flex-col gap-5 border-t border-ink/10 pt-9 transition-colors duration-500 hover:border-gold/30"
            >
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
