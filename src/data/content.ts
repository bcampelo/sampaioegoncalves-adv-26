import {
  Scale,
  Briefcase,
  HeartHandshake,
  Gavel,
  Building2,
  ShieldCheck,
  Sprout,
  Leaf,
  type LucideIcon,
} from "lucide-react";

/* ============================================================
   DADOS DO SITE — EDITE AQUI
   Todo o conteúdo é estático. Para adicionar advogado ou área,
   basta acrescentar um objeto ao array. Nenhuma mudança de
   layout é necessária.
   ============================================================ */

export const SITE = {
  name: "Sampaio & Gonçalves",
  full: "Sampaio & Gonçalves Advogados Associados",
  monogram: "S&G",
  tagline: "Advocacia de excelência",
  city: "Sena Madureira — Acre",
} as const;

export const CONTACTS = {
  whatsapp1: { label: "(68) 99230-3880", raw: "5568992303880" },
  whatsapp2: { label: "(68) 99217-3865", raw: "5568992173865" },
  email: "sampaioegoncalves.adv@outlook.com",
  instagram: "sampaioegoncalves.adv",
  instagramUrl: "https://instagram.com/sampaioegoncalves.adv",
  address:
    "R. Augusto Vasconcelos, Nº 591, Sala 01, Centro, Sena Madureira — AC, 69900-970",
  mapsQuery: "R. Augusto Vasconcelos, 591, Sena Madureira - AC, 69900-970",
} as const;

export interface PracticeArea {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    icon: Scale,
    title: "Direito Civil",
    desc: "Contratos, responsabilidade civil e a defesa firme dos seus direitos patrimoniais.",
  },
  {
    icon: Briefcase,
    title: "Direito Trabalhista",
    desc: "Relações de trabalho, verbas rescisórias e defesa técnica em reclamações.",
  },
  {
    icon: HeartHandshake,
    title: "Direito de Família",
    desc: "Divórcios, guarda, pensão e sucessões conduzidos com sensibilidade e discrição.",
  },
  {
    icon: Gavel,
    title: "Direito Penal",
    desc: "Defesa criminal estratégica e combativa em todas as instâncias.",
  },
  {
    icon: Building2,
    title: "Direito Empresarial",
    desc: "Consultoria societária, contratos e assessoria contínua para o seu negócio.",
  },
  {
    icon: ShieldCheck,
    title: "Direito Previdenciário",
    desc: "Aposentadorias, benefícios e revisões junto ao INSS com acompanhamento próximo.",
  },
  {
    icon: Sprout,
    title: "Direito Agrário",
    desc: "Regularização fundiária, posse, propriedade rural e conflitos de terra.",
  },
  {
    icon: Leaf,
    title: "Direito Ambiental",
    desc: "Licenciamento, defesa em autos de infração e compliance ambiental.",
  },
];

export interface Skill {
  nome: string;
  nivel: number;
}

export interface Lawyer {
  id: string;
  name: string;
  role: string;
  photo: string;
  /** CSS object-position value applied to `photo` (object-fit: cover) — tunes vertical
   *  framing per photo so lawyers with different original framing/headroom read as
   *  proportional to each other in the grid. Defaults to "center top" if omitted. */
  photoPosition?: string;
  oab: string;
  tags: string[];
  bio: string;
  skills: Skill[];
  redes: {
    instagram?: string;
    linkedin?: string;
    whatsapp?: string;
  };
}

/* Fotos são placeholders elegantes (retratos escuros e sóbrios).
   Substitua `photo` pelas fotografias profissionais reais. */
export const LAWYERS: Lawyer[] = [
  {
    id: "gabriel",
    name: "Dr. Gabriel Sampaio Gonçalves",
    role: "Sócio-fundador",
    photo: "/lawyers/gabriel.jpg",
    photoPosition: "center 50%",
    oab: "OAB/AC 0000",
    tags: ["Civil", "Empresarial", "Família", "Ambiental"],
    bio: "Sócio-fundador do escritório, o Dr. Gabriel construiu sua trajetória sobre os pilares da ética e da estratégia. Com atuação destacada em Direito Civil e Empresarial, dedica-se a oferecer soluções jurídicas personalizadas, unindo rigor técnico e proximidade com o cliente. [Texto de exemplo — substitua pela biografia real.]",
    skills: [
      { nome: "Direito Civil", nivel: 95 },
      { nome: "Direito Empresarial", nivel: 90 },
      { nome: "Direito de Família", nivel: 85 },
      { nome: "Direito Ambiental", nivel: 80 },
    ],
    redes: {
      instagram: "https://instagram.com/sampaioegoncalves.adv",
      linkedin: "#",
      whatsapp: "https://wa.me/5568992303880",
    },
  },
  {
    id: "junior",
    name: "Dr. Junior Sampaio",
    role: "Advogado Associado",
    photo: "/lawyers/junior.jpg",
    oab: "OAB/AC 0000",
    tags: ["Trabalhista", "Penal", "Previdenciário"],
    bio: "Advogado associado com sólida atuação no contencioso, o Dr. Junior é reconhecido pela combatividade e pelo compromisso com resultados. Especializado em Direito Trabalhista e Penal, atua com foco na defesa firme e na busca incansável pelos interesses de seus clientes. [Texto de exemplo — substitua pela biografia real.]",
    skills: [
      { nome: "Direito Trabalhista", nivel: 92 },
      { nome: "Direito Penal", nivel: 88 },
      { nome: "Direito Previdenciário", nivel: 80 },
    ],
    redes: {
      instagram: "https://instagram.com/sampaioegoncalves.adv",
      linkedin: "#",
      whatsapp: "https://wa.me/5568992173865",
    },
  },
];

export interface Stat {
  target: number;
  suffix: string;
  label: string;
}

export const STATS: Stat[] = [
  { target: 2, suffix: "+", label: "Anos de atuação" },
  { target: 8, suffix: "", label: "Áreas de especialização" },
  { target: 250, suffix: "+", label: "Clientes atendidos" },
  { target: 98, suffix: "%", label: "Índice de satisfação" },
];

export interface ManifestoItem {
  num: string;
  title: string;
  text: string;
}

export const MANIFESTO: ManifestoItem[] = [
  {
    num: "01",
    title: "Ética",
    text: "Atuamos com integridade absoluta. A confiança do cliente é o alicerce de cada decisão que tomamos.",
  },
  {
    num: "02",
    title: "Estratégia",
    text: "Cada caso é único. Desenhamos caminhos jurídicos precisos, antecipando cenários e protegendo interesses.",
  },
  {
    num: "03",
    title: "Proximidade",
    text: "Atendimento personalizado e humano. Você fala diretamente com quem cuida da sua causa.",
  },
];

export const MARQUEE_TERMS = [
  "Excelência Jurídica",
  "Compromisso",
  "Ética",
  "Resultados",
  "Estratégia",
  "Confiança",
] as const;

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Início", href: "#inicio" },
  { label: "Escritório", href: "#sobre" },
  { label: "Áreas", href: "#areas" },
  { label: "Advogados", href: "#advogados" },
  { label: "Contato", href: "#contato" },
];

/* Depoimentos ocultos até aprovação do cliente. */
export const TESTIMONIALS: never[] = [];
