import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { NAV_LINKS, SITE, CONTACTS } from "@/data/content";
import { whatsappLink, DEFAULT_WHATSAPP_MESSAGE, cx } from "@/lib/utils";
import { GoldButton } from "@/components/ui/GoldButton";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out-expo",
        scrolled
          ? "glass-strong border-b border-ink/10 py-3"
          : "border-b border-transparent py-5"
      )}
    >
      <nav className="shell flex items-center justify-between">
        <a
          href="#inicio"
          className="group flex items-center gap-2.5"
          data-testid="nav-logo"
          aria-label={SITE.full}
        >
          <img
            src="/logos/mark-gold.png"
            alt={SITE.monogram}
            className="h-8 w-auto md:h-9"
          />
          <span className="hidden text-sm font-medium tracking-wide text-ink/85 sm:block">
            {SITE.name}
          </span>
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-sm text-ink/75 transition-colors duration-300 hover:text-ink"
                data-testid={`nav-link-${link.href.replace("#", "")}`}
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 ease-out-expo group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <GoldButton
            href={whatsappLink(CONTACTS.whatsapp1.raw, DEFAULT_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            className="px-5 py-2.5"
            icon={<MessageCircle size={15} />}
            data-testid="nav-cta"
          >
            Fale conosco
          </GoldButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full glass text-ink lg:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          data-testid="nav-menu-toggle"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Overlay mobile */}
      <div
        className={cx(
          "fixed inset-0 z-40 flex flex-col justify-center bg-navy-950/97 backdrop-blur-xl transition-all duration-500 ease-out-expo lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <ul className="shell flex flex-col gap-2">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className={cx(
                  "block border-b border-ink/10 py-5 font-display text-4xl text-ink transition-all duration-500",
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                )}
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
              >
                <span className="mr-3 text-sm text-gold align-super">
                  0{i + 1}
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="shell mt-10">
          <GoldButton
            href={whatsappLink(CONTACTS.whatsapp1.raw, DEFAULT_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            icon={<MessageCircle size={16} />}
          >
            Fale conosco
          </GoldButton>
        </div>
      </div>
    </header>
  );
}
