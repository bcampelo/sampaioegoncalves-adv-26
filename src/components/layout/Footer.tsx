import { Instagram, MessageCircle, Mail } from "lucide-react";
import { SITE, CONTACTS, NAV_LINKS } from "@/data/content";
import { whatsappLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-gold/15 bg-navy-950 pt-20 pb-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
      />

      <div className="shell">
        <div className="flex flex-col gap-14 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <span className="font-display text-5xl italic tracking-tight text-gold-gradient">
              {SITE.monogram}
            </span>
            <p className="mt-5 text-sm leading-relaxed text-ink-muted">
              {SITE.full}. Advocacia de excelência com ética, estratégia e
              proximidade em {SITE.city}.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={whatsappLink(CONTACTS.whatsapp1.raw, DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full glass text-ink transition-colors duration-300 hover:text-gold"
                aria-label="WhatsApp"
              >
                <MessageCircle size={17} />
              </a>
              <a
                href={CONTACTS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full glass text-ink transition-colors duration-300 hover:text-gold"
                aria-label="Instagram"
              >
                <Instagram size={17} />
              </a>
              <a
                href={`mailto:${CONTACTS.email}`}
                className="flex h-10 w-10 items-center justify-center rounded-full glass text-ink transition-colors duration-300 hover:text-gold"
                aria-label="E-mail"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:gap-20">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-ink-faint">
                Navegação
              </span>
              <ul className="mt-5 flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-ink/75 transition-colors duration-300 hover:text-gold"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-ink-faint">
                Contato
              </span>
              <ul className="mt-5 flex flex-col gap-3 text-sm text-ink/75">
                <li>{CONTACTS.whatsapp1.label}</li>
                <li>{CONTACTS.whatsapp2.label}</li>
                <li className="break-all">{CONTACTS.email}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="hairline mt-16" />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-ink-faint sm:flex-row">
          <p>
            © {year} {SITE.full}. Todos os direitos reservados.
          </p>
          <p>OAB/AC — Advocacia regularmente inscrita.</p>
        </div>

        <p className="mt-4 text-center text-[0.7rem] text-ink-faint/60 sm:text-left">
          Site desenvolvido por{" "}
          <a
            href="https://instagram.com/campelodev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-faint/60 underline decoration-ink-faint/30 underline-offset-2 transition-colors duration-300 hover:text-ink-muted"
          >
            @campelodev
          </a>
        </p>
      </div>
    </footer>
  );
}
