import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { CONTACTS } from "@/data/content";
import { whatsappLink, DEFAULT_WHATSAPP_MESSAGE, cx } from "@/lib/utils";

/** Botão flutuante de WhatsApp — surge após sair do hero. */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappLink(CONTACTS.whatsapp1.raw, DEFAULT_WHATSAPP_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      data-testid="floating-whatsapp"
      className={cx(
        "group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full glass text-ink shadow-glass transition-all duration-500 ease-out-expo hover:-translate-y-0.5 hover:text-navy-950 hover:shadow-[0_12px_30px_-8px_rgba(201,169,97,0.6)]",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      )}
    >
      <span className="absolute inset-0 scale-90 rounded-full bg-gradient-to-br from-gold via-gold-light to-gold-deep opacity-0 transition-all duration-500 ease-out-expo group-hover:scale-100 group-hover:opacity-100" />
      <MessageCircle size={22} className="relative transition-transform duration-500 ease-out-expo group-hover:scale-105" />
    </a>
  );
}
