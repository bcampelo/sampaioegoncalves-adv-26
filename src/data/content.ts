import {
  Scale,
  Gavel,
  ShieldCheck,
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
  /** Sócio responsável pela área — exibido apenas nas duas grandes especialidades. */
  partner?: string;
  /** Marca a especialidade principal do escritório, com destaque visual na grade. */
  featured?: boolean;
}

/* A primeira área é a especialidade principal do escritório — prioridade
   estratégica atual —, com destaque visual e o sócio responsável. As
   demais mantêm o escritório completo, cobrindo o restante da demanda
   jurídica do cliente. */
export const PRACTICE_AREAS: PracticeArea[] = [
  {
    icon: Leaf,
    title: "Direito Ambiental e Agrário",
    desc: "Defendemos posseiros, produtores rurais e comunidades extrativistas em processos de regularização fundiária junto ao INCRA e ao ITERACRE, defesa administrativa perante o IMAC, usucapião extrajudicial, consultoria preventiva e assessoria contínua ao produtor rural. Também atuamos em conflitos envolvendo assentamentos e reservas extrativistas.",
    partner: "Dr. Gabriel Sampaio Gonçalves",
    featured: true,
  },
  {
    icon: Gavel,
    title: "Direito Criminal",
    desc: "Defesa técnica em todas as fases do processo penal, da investigação ao julgamento. Atuamos em audiências de custódia, impetração de habeas corpus, tribunal do júri e execução penal, unindo o rigor de quem já esteve do outro lado do processo — experiência construída também na atuação junto ao Ministério Público — à atenção humana que cada acusado merece diante da Justiça.",
    partner: "Dr. Elandio Chaves Sampaio Junior",
  },
  {
    icon: Scale,
    title: "Direito Civil",
    desc: "Contratos, responsabilidade civil e a defesa firme dos seus direitos patrimoniais.",
  },
  {
    icon: ShieldCheck,
    title: "Direito Previdenciário",
    desc: "Aposentadorias, benefícios e revisões junto ao INSS com acompanhamento próximo.",
  },
];

export interface Skill {
  nome: string;
  nivel: number;
}

export interface Specialty {
  icon: LucideIcon;
  title: string;
  points: string[];
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
  /** Especialidade principal do sócio, com maior destaque no site. */
  specialty: Specialty;
  tags: string[];
  /** Parágrafo curto (2-3 frases), tom editorial — usado na seção Advogados. */
  summary: string;
  /** Perfil completo — usado no modal. */
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
    oab: "OAB/AC nº 6.095",
    specialty: {
      icon: Leaf,
      title: "Direito Ambiental e Agrário",
      points: [
        "Regularização fundiária junto ao INCRA e ao ITERACRE",
        "Defesa administrativa perante o IMAC",
        "Usucapião extrajudicial",
        "Consultoria preventiva e assessoria ao produtor rural",
        "Conflitos em assentamentos e reservas extrativistas",
      ],
    },
    tags: ["Ambiental", "Agrário", "Civil"],
    summary:
      "Natural de Sena Madureira, o Dr. Gabriel iniciou a carreira no Ministério Público de Rio Branco antes de se dedicar à advocacia. Hoje conduz a área de Direito Ambiental e Agrário do escritório, ao lado de posseiros, produtores rurais e comunidades extrativistas de todo o Acre.",
    bio: "Natural de Sena Madureira/AC, advogado desde 2022, com passagem pelo Ministério Público de Rio Branco no início da carreira, o Dr. Gabriel é o sócio responsável pela área de Direito Ambiental e Agrário do escritório — defendendo posseiros, produtores rurais e comunidades extrativistas em processos de regularização fundiária junto ao INCRA e ao ITERACRE, defesa administrativa perante o IMAC, usucapião extrajudicial, consultoria preventiva e assessoria contínua ao produtor rural. Também atua em conflitos envolvendo assentamentos e reservas extrativistas, além de integrar o atendimento das demais áreas do escritório.",
    skills: [
      { nome: "Direito Ambiental", nivel: 95 },
      { nome: "Direito Agrário", nivel: 92 },
      { nome: "Direito Civil", nivel: 85 },
    ],
    redes: {
      instagram: "https://instagram.com/sampaioegoncalves.adv",
      linkedin: "#",
      whatsapp: "https://wa.me/5568992303880",
    },
  },
  {
    id: "junior",
    name: "Dr. Elandio Chaves Sampaio Junior",
    role: "Sócio-fundador",
    photo: "/lawyers/junior.jpg",
    oab: "OAB/AC nº 6.966",
    specialty: {
      icon: Gavel,
      title: "Direito Criminal",
      points: [
        "Audiências de custódia",
        "Habeas corpus",
        "Tribunal do júri",
        "Execução penal",
        "Defesa em processos criminais",
      ],
    },
    tags: ["Criminal", "Previdenciário"],
    summary:
      "Natural de Sena Madureira, o Dr. Elandio (Júnior) iniciou a trajetória no Ministério Público de Sena Madureira antes de se dedicar à advocacia. Hoje conduz a área Criminal do escritório, com atuação firme em audiências de custódia, habeas corpus, júri e execução penal.",
    bio: "Natural de Sena Madureira/AC, advogado desde 2022, com passagem pelo Ministério Público de Sena Madureira no início da carreira, o Dr. Elandio é o sócio responsável pela área Criminal do escritório — atuando em audiências de custódia, habeas corpus, tribunal do júri, execução penal e defesa em processos criminais. Também integra o atendimento das demais áreas do escritório, com o mesmo compromisso técnico e combatividade em cada caso.",
    skills: [
      { nome: "Direito Criminal", nivel: 95 },
      { nome: "Direito Previdenciário", nivel: 80 },
    ],
    redes: {
      instagram: "https://instagram.com/sampaioegoncalves.adv",
      linkedin: "#",
      whatsapp: "https://wa.me/5568992173865",
    },
  },
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
    text: "Você fala diretamente com quem cuida do seu caso, do primeiro contato até o desfecho.",
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
  { label: "Advogados", href: "#advogados" },
  { label: "Áreas", href: "#areas" },
  { label: "Escritório", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

/* Depoimentos ocultos até aprovação do cliente. */
export const TESTIMONIALS: never[] = [];
