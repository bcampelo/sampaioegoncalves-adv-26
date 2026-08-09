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
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_70%_at_50%_45%,rgba(5,10,20,0.82)_0%,rgba(5,10,20,0.55)_38%,transparent_68%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/40"
      />

      <div
        data-hero-content
        className="shell relative z-10 flex flex-col items-center gap-8 py-32 text-center md:py-40"
      >
        <img
          data-fade
          src="/logos/mark-gold.png"
          alt={SITE.monogram}
          className="h-12 w-auto md:h-16"
        />

        <h1 className="font-display text-display-xl font-medium leading-[1.05] text-ink">
          <span className="reveal-mask">
            <span data-hline className="inline-block">
              Sampaio{" "}
              <span className="text-gold-gradient italic">&amp;</span>{" "}
              Gonçalves
            </span>
          </span>
        </h1>

        <span data-fade className="overline">
          Advogados Associados
        </span>

        <p
          data-fade
          className="max-w-md text-base leading-relaxed text-ink-muted md:text-lg"
        >
          A defesa dos seus direitos, da terra à Justiça.
        </p>

        <div data-fade className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-gold/80">
          <span className="h-px w-6 bg-gold/50" />
          Sena Madureira — Acre
          <span className="h-px w-6 bg-gold/50" />
        </div>

        <div data-fade>
          <GoldButton
            href={whatsappLink(CONTACTS.whatsapp1.raw, DEFAULT_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            icon={<ArrowRight size={16} />}
            data-testid="hero-cta-whatsapp"
          >
            Fale com o escritório
          </GoldButton>
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
