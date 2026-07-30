import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { X, Instagram, Linkedin, MessageCircle } from "lucide-react";
import type { Lawyer } from "@/data/content";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";

interface LawyerModalProps {
  lawyer: Lawyer | null;
  onClose: () => void;
}

export function LawyerModal({ lawyer, onClose }: LawyerModalProps) {
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const open = Boolean(lawyer);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      closeBtn.current?.focus();
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useGSAP(
    () => {
      if (!open) return;
      const reduce = prefersReducedMotion();
      const tl = gsap.timeline();
      tl.fromTo(
        root.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: reduce ? 0.01 : 0.3, ease: "power2.out" }
      );
      if (!reduce) {
        tl.fromTo(
          panel.current,
          { autoAlpha: 0, y: 40, scale: 0.98 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" },
          "-=0.15"
        )
          .fromTo(
            "[data-modal-stagger]",
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power3.out" },
            "-=0.25"
          )
          .fromTo(
            "[data-skill-bar]",
            { scaleX: 0 },
            {
              scaleX: (_i: number, t: HTMLElement) => Number(t.dataset.level) / 100,
              transformOrigin: "left",
              duration: 1,
              stagger: 0.1,
              ease: "power3.out",
            },
            "-=0.3"
          );
      } else {
        gsap.set(["[data-modal-stagger]"], { autoAlpha: 1, y: 0 });
        gsap.utils.toArray<HTMLElement>("[data-skill-bar]").forEach((b) => {
          gsap.set(b, { scaleX: Number(b.dataset.level) / 100, transformOrigin: "left" });
        });
      }
    },
    { scope: root, dependencies: [open, lawyer?.id] }
  );

  if (!lawyer) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[90] flex items-end justify-center p-0 opacity-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Perfil de ${lawyer.name}`}
    >
      <div
        className="absolute inset-0 bg-navy-950/80 backdrop-blur-md"
        onClick={onClose}
        aria-hidden
      />

      <div
        ref={panel}
        className="glass-strong relative z-10 max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl shadow-lift sm:rounded-3xl"
      >
        <button
          ref={closeBtn}
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full glass text-ink transition-colors duration-300 hover:text-gold"
          aria-label="Fechar"
          data-testid="modal-close"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-5">
          <div className="relative md:col-span-2">
            <div className="relative h-64 w-full overflow-hidden md:h-full md:min-h-[30rem]">
              <img
                src={lawyer.photo}
                alt={lawyer.name}
                style={{ objectPosition: lawyer.photoPosition ?? "center top" }}
                className="h-full w-full object-cover grayscale-[35%]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent md:bg-gradient-to-r md:from-transparent md:to-navy-900/40" />
            </div>
          </div>

          <div className="flex flex-col gap-6 p-7 md:col-span-3 md:p-10">
            <div data-modal-stagger className="flex flex-col gap-2">
              <span className="overline">{lawyer.role}</span>
              <h3 className="font-display text-4xl leading-tight text-ink">
                {lawyer.name}
              </h3>
              <span className="text-sm text-gold/80">{lawyer.oab}</span>
            </div>

            <p
              data-modal-stagger
              className="text-sm leading-relaxed text-ink-muted md:text-base"
            >
              {lawyer.bio}
            </p>

            <div data-modal-stagger className="flex flex-col gap-4">
              <span className="text-xs uppercase tracking-[0.2em] text-ink-faint">
                Especializações
              </span>
              {lawyer.skills.map((skill) => (
                <div key={skill.nome} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ink/85">{skill.nome}</span>
                    <span className="text-gold">{skill.nivel}%</span>
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-ink/10">
                    <div
                      data-skill-bar
                      data-level={skill.nivel}
                      className="h-full w-full origin-left rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-light"
                      style={{ transform: "scaleX(0)" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div data-modal-stagger className="mt-2 flex items-center gap-3">
              {lawyer.redes.whatsapp && (
                <a
                  href={lawyer.redes.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full glass text-ink transition-all duration-300 hover:border-gold/40 hover:text-gold"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={18} />
                </a>
              )}
              {lawyer.redes.instagram && (
                <a
                  href={lawyer.redes.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full glass text-ink transition-all duration-300 hover:border-gold/40 hover:text-gold"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
              )}
              {lawyer.redes.linkedin && lawyer.redes.linkedin !== "#" && (
                <a
                  href={lawyer.redes.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full glass text-ink transition-all duration-300 hover:border-gold/40 hover:text-gold"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
