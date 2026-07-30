import type { CSSProperties } from "react";

export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function whatsappLink(raw: string, message?: string): string {
  const base = `https://wa.me/${raw}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "Olá! Vim pelo site e gostaria de falar com o escritório.";

/** Perspectiva compartilhada para grades com tilt 3D. */
export const perspectiveWrap: CSSProperties = { perspective: "1400px" };
