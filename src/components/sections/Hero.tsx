import { lazy, Suspense, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ArrowRight } from "lucide-react";
import { GoldButton } from "@/components/ui/GoldButton";
import { CONTACTS, SITE } from "@/data/content";
import { whatsappLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE, DURATION } from "@/lib/motion";

const HeroScene = lazy(() =>
  import("@/components/three/HeroScene").then((m) => ({ default: m.HeroScene }))
);

export function Hero({ introReady }: { introReady: boolean }) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // Entrada cinética disparada quando o preloader termina.
  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const lines = el.querySelectorAll<HTMLElement>("[data-hline]");
      const fades = el.querySelectorAll<HTMLElement>("[data-fade]");

      if (reduced) {
        gsap.set([lines, fades], { yPercent: 0, opacity: 1, autoAlpha: 1 });
        return;
      }
      if (!introReady) {
        gsap.set(lines, { yPercent: 120 });
        gsap.set(fades, { autoAlpha: 0, y: 16 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: EASE.outStrong } });
      tl.to(lines, { yPercent: 0, duration: 1.15, stagger: 0.12 })
        .to(
          fades,
          { autoAlpha: 1, y: 0, duration: DURATION.md, stagger: 0.1 },
          "-=0.7"
        );
    },
    { scope: root, dependencies: [introReady, reduced] }
  );

  // Parallax de saída — o conteúdo recua como uma câmera dando pull-back.
  useGSAP(
    () => {
      if (reduced) return;
      gsap.to("[data-hero-content]", {
        yPercent: -14,
        opacity: 0.2,
        filter: "blur(2px)",
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
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
      id="inicio"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-radial-navy"
    >
      {/* Camada 3D — discreta, ao fundo */}
      {!reduced && (
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      )}

      {/* Vinheta reforçada: garante leitura do texto sobre o campo 3D */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(85%_70%_at_28%_45%,rgba(5,10,20,0.82)_0%,rgba(5,10,20,0.55)_38%,transparent_68%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/40"
      />

      <div
        data-hero-content
        className="shell relative z-10 flex flex-col items-start gap-9 py-32 md:py-40"
      >
        <div className="flex max-w-2xl flex-col items-start gap-9">
          <div data-fade className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold/60" />
            <span className="overline">{SITE.full}</span>
          </div>

          <h1 className="font-display text-display-xl font-medium text-ink">
            <span className="reveal-mask">
              <span data-hline className="inline-block">
                A defesa dos seus
              </span>
            </span>
            <span className="reveal-mask">
              <span data-hline className="inline-block">
                direitos com{" "}
                <span className="text-gold-gradient italic">excelência.</span>
              </span>
            </span>
          </h1>

          <p
            data-fade
            className="max-w-md text-base leading-relaxed text-ink-muted md:text-lg"
          >
            Ética, estratégia e proximidade em cada causa — do primeiro
            atendimento ao resultado.
          </p>

          <div
            data-fade
            className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8"
          >
            <GoldButton
              href={whatsappLink(CONTACTS.whatsapp1.raw, DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              icon={<ArrowRight size={16} />}
              data-testid="hero-cta-whatsapp"
            >
              Fale com o escritório
            </GoldButton>
            <a
              href="#areas"
              className="group inline-flex items-center gap-2 text-sm font-medium tracking-wide text-ink/70 transition-colors duration-300 hover:text-ink"
              data-testid="hero-cta-areas"
            >
              Áreas de atuação
              <ArrowRight
                size={14}
                className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Indicador de scroll — mínimo, sem texto */}
      <div
        data-fade
        className="pointer-events-none absolute bottom-9 left-1/2 z-10 -translate-x-1/2"
        aria-hidden
      >
        <div className="relative h-11 w-px overflow-hidden bg-ink/12">
          <span className="absolute inset-x-0 top-0 h-3 w-px animate-scroll-cue bg-gold" />
        </div>
      </div>
    </section>
  );
}
