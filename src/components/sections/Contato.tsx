import { MessageCircle, Mail, Instagram, MapPin, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CONTACTS } from "@/data/content";
import { whatsappLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/utils";

interface ContactItem {
  icon: typeof MessageCircle;
  label: string;
  value: string;
  href: string;
}

const items: ContactItem[] = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: CONTACTS.whatsapp1.label,
    href: whatsappLink(CONTACTS.whatsapp1.raw, DEFAULT_WHATSAPP_MESSAGE),
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: CONTACTS.whatsapp2.label,
    href: whatsappLink(CONTACTS.whatsapp2.raw, DEFAULT_WHATSAPP_MESSAGE),
  },
  {
    icon: Mail,
    label: "E-mail",
    value: CONTACTS.email,
    href: `mailto:${CONTACTS.email}`,
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: `@${CONTACTS.instagram}`,
    href: CONTACTS.instagramUrl,
  },
];

export function Contato() {
  return (
    <section id="contato" className="relative py-section">
      <div className="shell">
        <SectionHeading
          overline="Contato"
          title="Vamos conversar sobre o"
          emphasis="seu caso."
          description="O primeiro atendimento é o começo de uma defesa cuidadosa. Fale diretamente com o escritório pelo canal que preferir."
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Cards de contato */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {items.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.label + item.value} y={30} delay={i * 0.07}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group glass flex h-full flex-col justify-between gap-8 rounded-2xl p-6 transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-gold/30"
                    data-testid={`contact-${item.label.toLowerCase()}-${i}`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-ink/12 bg-ink/[0.04] text-ink/60 transition-all duration-500 group-hover:border-gold/50 group-hover:bg-gold/5 group-hover:text-gold group-hover:shadow-[0_0_22px_-4px_rgba(201,169,97,0.6)]">
                        <Icon size={20} strokeWidth={1.5} />
                      </span>
                      <ArrowUpRight
                        size={18}
                        className="text-ink-faint transition-all duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
                      />
                    </div>
                    <div className="flex min-w-0 flex-col gap-1">
                      <span className="text-xs uppercase tracking-[0.2em] text-ink-faint">
                        {item.label}
                      </span>
                      <span className="break-words text-base text-ink transition-colors duration-300 group-hover:text-gold sm:text-lg">
                        {item.value}
                      </span>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>

          {/* Mapa + endereço */}
          <Reveal y={30} delay={0.1} className="flex flex-col">
            <div className="glass relative flex-1 overflow-hidden rounded-2xl">
              <iframe
                title="Localização do escritório"
                className="h-full min-h-[20rem] w-full"
                style={{ filter: "invert(92%) hue-rotate(180deg) contrast(0.9) brightness(0.95)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  CONTACTS.mapsQuery
                )}&z=15&output=embed`}
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/10" />
            </div>
            <div className="glass mt-4 flex items-start gap-3 rounded-2xl p-5">
              <MapPin size={18} className="mt-0.5 shrink-0 text-gold" />
              <p className="text-sm leading-relaxed text-ink-muted">
                {CONTACTS.address}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
