import { WordsReveal } from "./WordsReveal";
import { Reveal } from "./Reveal";
import { cx } from "@/lib/utils";

interface SectionHeadingProps {
  overline: string;
  title: string;
  emphasis?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/** Cabeçalho de seção padronizado: overline + título serif + descrição. */
export function SectionHeading({
  overline,
  title,
  emphasis,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={cx(
        "flex flex-col gap-6",
        centered ? "items-center text-center" : "items-start",
        className
      )}
    >
      <Reveal className="flex items-center gap-3" y={18} blur>
        <span className="h-px w-8 bg-gold/60" />
        <span className="overline">{overline}</span>
      </Reveal>

      <h2
        className={cx(
          "font-display text-display-md font-medium text-ink",
          centered ? "max-w-3xl" : "max-w-4xl"
        )}
      >
        <WordsReveal text={title} onScroll stagger={0.06} blur />
        {emphasis && (
          <>
            {" "}
            <WordsReveal
              text={emphasis}
              onScroll
              stagger={0.06}
              delay={0.08}
              blur
              wordClassName="text-gold-gradient italic"
            />
          </>
        )}
      </h2>

      {description && (
        <Reveal
          as="p"
          y={22}
          delay={0.1}
          blur
          className={cx(
            "text-base leading-relaxed text-ink-muted md:text-lg",
            centered ? "max-w-2xl" : "max-w-xl"
          )}
        >
          {description}
        </Reveal>
      )}
    </div>
  );
}
