# MASTER — Design System · Sampaio & Gonçalves (Projeto Versa)

Fonte única de verdade do sistema visual. Todo token usado no código nasce aqui.
Implementação em `tailwind.config.ts` (tokens) + `src/index.css` (variáveis CSS e utilitários).

---

## Teses

**Visual** — Interface escura editorial premium: base navy profunda com dourado
champagne como único acento, contraste tipográfico forte entre Cormorant
Garamond (display serif, leve, gigante) e Plus Jakarta Sans (corpo),
espaçamento muito generoso, superfícies quase planas com profundidade por
camadas e glassmorphism sutil.

**Interação** — Motion cinematográfico guiado por scroll: reveals com máscara
direcional (nada de fade genérico), stagger, parallax multicamada e câmera 3D
no hero (partículas douradas WebGL reagindo a mouse/scroll). 200–600ms com
easing power-out para UI, progress-based no scroll. Hover com scale sutil +
brilho. Proibido: bounce elástico, ease-in em entradas, animar width/height.
Tudo respeita `prefers-reduced-motion`.

---

## Cores

| Token            | Hex / valor                | Uso                                   |
| ---------------- | -------------------------- | ------------------------------------- |
| `navy.950`       | `#050A14`                  | Footer, cortina do preloader          |
| `navy.900`       | `#0A1220`                  | Fundo principal                       |
| `navy.800`       | `#0D1A30`                  | Superfícies elevadas                  |
| `navy.700`       | `#0F1E3D`                  | Gradientes de profundidade            |
| `gold.deep`      | `#A8863F`                  | Início do gradiente dourado           |
| `gold` (DEFAULT) | `#C9A961`                  | Acento primário, ícones, hairlines    |
| `gold.light`     | `#D4AF37`                  | Brilho do gradiente                   |
| `gold.soft`      | `#E8D9A8`                  | Highlight de partículas               |
| `ink` (DEFAULT)  | `#F5F3EC`                  | Texto principal (contraste alto)      |
| `ink.muted`      | `rgba(245,243,236,0.66)`   | Texto de apoio                        |
| `ink.faint`      | `rgba(245,243,236,0.40)`   | Legendas, overlines discretas         |

Gradiente dourado assinatura: `linear-gradient(105deg,#A8863F,#D4AF37,#F0E2B6,#C9A961,#A8863F)`
(classe `.text-gold-gradient`).

Contraste: `ink` sobre `navy.900` ≈ 15:1; `gold` sobre `navy.900` ≈ 6.5:1 — ambos AA/AAA.

---

## Tipografia

- **Display:** `"Cormorant Garamond"`, pesos 400/500/600, itálico para ênfase.
- **Corpo:** `"Plus Jakarta Sans"`, pesos 300–700.

Escala fluida (clamp):

| Token          | clamp                          | Uso                    |
| -------------- | ------------------------------ | ---------------------- |
| `display-xl`   | `clamp(3rem, 9vw, 8.5rem)`     | H1 do hero             |
| `display-lg`   | `clamp(2.5rem, 6vw, 5rem)`     | Títulos de impacto     |
| `display-md`   | `clamp(2rem, 4vw, 3.25rem)`    | Títulos de seção (H2)  |

Overline: `0.72rem`, uppercase, `letter-spacing: 0.28em`, dourado.

---

## Espaçamento & layout

- Base 8px. `shell` = `max-width: 88rem` + padding lateral fluido `clamp(1.25rem, 4vw, 3.5rem)`.
- Ritmo vertical de seção: `py-section` = `clamp(6rem, 12vw, 11rem)`.
- Raios: cards `1rem–1.5rem` (rounded-2xl/3xl), pills `full`.

---

## Sombras & superfícies

- `.glass` — `rgba(245,243,236,0.035)` + `blur(18px)` + borda `rgba(245,243,236,0.09)`.
- `.glass-strong` — navy translúcido para navbar/modal.
- `shadow-glass`, `shadow-gold-glow`, `shadow-lift` — elevação e brilho dourado.

---

## Motion tokens

| Papel               | Duração    | Easing                              |
| ------------------- | ---------- | ----------------------------------- |
| Microinteração      | 300–500ms  | `ease-out-expo` cubic(0.16,1,0.3,1) |
| Reveal de entrada   | 0.9–1.15s  | `power3.out` / `power4.out` (GSAP)  |
| Scroll / parallax   | progress   | `none` (scrub)                      |
| Modal               | 300–500ms  | `power3.out`                        |

Stagger padrão: 0.06–0.12s. Regra dos 5 estados em elementos interativos:
default, hover, focus (`ring-gold`), active, disabled.

---

## Componentes-base

Botão (`GoldButton`) · Card glass · Card com tilt 3D (`TiltCard`) · Chip/badge ·
Link com sublinhado animado · Contador (`Counter`) · Reveal / WordsReveal ·
Cursor dourado · Marquee editorial · Preloader · Modal de advogado.
