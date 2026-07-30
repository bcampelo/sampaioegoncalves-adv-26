# Sampaio & Gonçalves — Site Institucional (Projeto Versa)

Site institucional premium do escritório **Sampaio & Gonçalves Advogados
Associados** (Sena Madureira — AC). Experiência escura, editorial e imersiva:
hero 3D em WebGL, motion cinematográfico guiado por scroll e arquitetura
front-end limpa.

## Stack

- **React 18** + **TypeScript** + **Vite 5**
- **Tailwind CSS 3** (design tokens em `tailwind.config.ts`)
- **GSAP** + ScrollTrigger (timelines, reveals, parallax, tilt)
- **Three.js** + **@react-three/fiber** + **drei** + **postprocessing** (hero 3D)
- **Lenis** (smooth scroll) · **lucide-react** (ícones)

## Rodando localmente

```bash
npm install
npm run dev      # http://localhost:5173
```

Build de produção:

```bash
npm run build    # verifica tipos e gera /dist
npm run preview  # serve o build
```

> Requer Node 18+.

## Estrutura

```
src/
  data/content.ts          # TODO o conteúdo editável (contatos, advogados, áreas…)
  lib/                     # gsap setup + utils
  hooks/                   # useReducedMotion, useMediaQuery
  providers/SmoothScroll   # Lenis + sync com ScrollTrigger
  components/
    layout/                # Navbar, Footer
    sections/              # Hero, Sobre, Areas, Advogados, Contato
    three/                 # HeroScene (Canvas), GoldField (shader)
    ui/                    # primitivas: Reveal, WordsReveal, GoldButton, TiltCard,
                           #   Counter, Marquee, Cursor, Preloader, FloatingWhatsApp…
    LawyerModal.tsx
MASTER.md                  # design system (fonte de verdade dos tokens)
```

## Como editar o conteúdo

Tudo em **`src/data/content.ts`** — sem tocar em layout:

- **Contatos** (`CONTACTS`): WhatsApp, e-mail, Instagram, endereço.
- **Advogados** (`LAWYERS`): nome, cargo, foto, OAB, bio, especializações (skill bars), redes.
  - Substitua `photo` (hoje `/lawyers/*.svg`, placeholders) pelas **fotos reais**
    em `public/lawyers/`.
- **Áreas de atuação** (`PRACTICE_AREAS`): ícone (lucide), título, descrição.
- **Estatísticas** (`STATS`) e **Manifesto** (`MANIFESTO`).

## Acessibilidade & performance

- Respeita `prefers-reduced-motion` (desliga parallax, WebGL e reveals pesados).
- Foco visível (`focus-visible` dourado) em elementos interativos.
- Three.js carregado sob demanda (code-split) e desabilitado em reduced-motion.
- Imagens `loading="lazy"`, chunks separados (three / gsap).

## Pendências de conteúdo (para o cliente)

- [ ] Fotos profissionais, bios reais, números de OAB e especializações dos advogados.
- [ ] Depoimentos (seção prevista, hoje oculta) quando aprovados.
- [ ] Imagem OpenGraph (`og:image`) para compartilhamento.
