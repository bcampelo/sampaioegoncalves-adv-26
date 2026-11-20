/* Conteúdo dos guias rápidos. Texto informativo; nada é enviado ou guardado.
   Normas citadas conferidas no texto: Decreto 6.514/2008 arts. 79 e 113; Lei 9.784/1999 art. 66;
   CPP art. 306; CF art. 5º, LXIII. */

export const WA = "5568992303880";

/* ---------- utilidades de data ---------- */
const DIAS = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
const pad = n => String(n).padStart(2, "0");
export const parseDate = s => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
export const fmtDate = d => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
export const fmtDia = d => DIAS[d.getDay()];
export const fmtHora = d => `${pad(d.getHours())}h${pad(d.getMinutes())}`;
export const hoje = () => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); };
export const addDias = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };
/* Lei 9.784/1999, art. 66: exclui o dia do começo, inclui o do vencimento, dias contínuos,
   e prorroga até o primeiro dia útil se cair em dia sem expediente. Feriados não entram na conta. */
export function prazoDias(ciencia, dias) {
  let f = addDias(ciencia, dias);
  while (f.getDay() === 0 || f.getDay() === 6) f = addDias(f, 1);
  return f;
}
export const isoHoje = () => { const n = new Date(); return `${n.getFullYear()}-${pad(n.getMonth() + 1)}-${pad(n.getDate())}`; };
export const isoAgora = () => { const n = new Date(); return `${isoHoje()}T${pad(n.getHours())}:${pad(n.getMinutes())}`; };

const L = (arr, v) => (arr.find(o => o.v === v) || {}).l || "";

/* ====================================================== AMBIENTAL */
const AMB_TIPO = [
  { v: "auto", l: "Auto de infração (multa)", d: "O papel fala em infração, multa ou penalidade." },
  { v: "embargo", l: "Termo de embargo ou interdição", d: "Mandou parar uma obra, roçado ou atividade na área." },
  { v: "apreensao", l: "Apreensão de produtos, animais ou equipamentos", d: "Levaram ou retiveram algo seu." },
  { v: "notificacao", l: "Notificação ou ofício", d: "Pede documentos, esclarecimentos ou providências." },
  { v: "nao", l: "Não sei o que é, só recebi um papel", d: "Tudo bem, vamos organizar o que fazer." },
];
const AMB_ORGAO = [
  { v: "federal", l: "IBAMA, ICMBio ou outro órgão federal" },
  { v: "estadual", l: "IMAC ou outro órgão do Estado" },
  { v: "municipal", l: "Prefeitura ou órgão do município" },
  { v: "nao", l: "Não sei qual órgão" },
];

const ambiental = {
  id: "ambiental",
  titulo: "Recebi um auto de infração, embargo ou notificação ambiental",
  intro: "Responda 3 ou 4 perguntas e veja o que fazer agora, o que reunir e como fica o seu prazo.",
  steps: [
    { id: "tipo", q: "O que você recebeu?", opts: AMB_TIPO },
    { id: "orgao", q: "Qual órgão entregou o papel?", hint: "Costuma estar escrito no alto do documento, ou no carimbo e na assinatura do fiscal.", opts: AMB_ORGAO },
    { id: "data", type: "date", q: "Em que dia você recebeu o papel?", hint: "É a data em que você tomou ciência, ou seja, o dia em que o fiscal entregou ou você assinou o recebimento.", skip: "Não lembro a data" },
    { id: "ativa", q: "A atividade ou a área embargada ainda está em uso?", when: a => a.tipo === "embargo", opts: [
      { v: "sim", l: "Sim, ainda estamos trabalhando lá" },
      { v: "nao", l: "Não, paramos" },
    ] },
  ],
  result(a) {
    const out = { alerts: [], todo: [], gather: [], avoid: [], deadline: null };
    const t = a.tipo, o = a.orgao;
    const nomeTipo = L(AMB_TIPO, t);
    out.title = t === "embargo" ? "Embargo: primeiro, a área" :
                t === "auto" ? "Auto de infração: o prazo é o ponto central" :
                t === "apreensao" ? "Apreensão: guarde o que comprova" :
                t === "notificacao" ? "Notificação: responda dentro do prazo escrito" : "Vamos organizar o que você recebeu";
    out.lead = "Este resultado é uma orientação geral. A análise do documento por um advogado é o que define o caminho certo para o seu caso.";

    const temAuto = t === "auto" || t === "nao";
    if (o === "federal" && temAuto && a.data) {
      const c = parseDate(a.data);
      const f = prazoDias(c, 20);
      const falta = Math.round((f - hoje()) / 86400000);
      out.deadline = {
        label: "Prazo de defesa, pela contagem simples (órgão federal)",
        date: `${fmtDate(f)}, ${fmtDia(f)}`,
        note: falta >= 0
          ? `Faltam ${falta} ${falta === 1 ? "dia" : "dias"}. A conta usa 20 dias corridos a partir da ciência (Decreto 6.514/2008, art. 113), sem contar o dia do recebimento, e passa para o próximo dia útil se cair em fim de semana (Lei 9.784/1999, art. 66). Feriados e o horário do protocolo podem mudar essa data, então confira com um advogado e com o próprio auto.`
          : `Pela conta simples, esse prazo já passou há ${Math.abs(falta)} ${Math.abs(falta) === 1 ? "dia" : "dias"}. Não desanime nem deixe para depois: procure um advogado hoje, porque pode haver algo a fazer, e quanto mais tempo passa, menos opções sobram.`,
        late: falta < 0,
      };
    } else if (temAuto && (o === "estadual" || o === "municipal" || o === "nao")) {
      out.alerts.push({ tone: "warn", title: "O prazo pode ser diferente", text: "Para órgãos estaduais e municipais, o prazo de defesa segue a regra de cada um. Procure no próprio auto ou no verso do papel onde o prazo está escrito, anote e mande uma foto para a gente. Se não achar, trate como urgente." });
    } else if (temAuto && o === "federal" && !a.data) {
      out.alerts.push({ tone: "warn", title: "Sem a data, não dá para calcular", text: "Na esfera federal, a defesa contra o auto de infração tem prazo de 20 dias, contados da data da ciência da autuação (Decreto 6.514/2008, art. 113). Procure a data em que você recebeu o papel e anote." });
    }
    if (t === "embargo") {
      out.alerts.push({ tone: "stop", title: "Não continue a atividade na área embargada", text: "No âmbito federal, descumprir embargo é uma infração à parte, com multa própria (Decreto 6.514/2008, art. 79). Mesmo que o embargo seja estadual ou municipal, o mais seguro é parar até um advogado analisar, porque continuar pode agravar a situação." + (a.ativa === "sim" ? " Como vocês ainda estão trabalhando lá, esse é o ponto mais urgente." : "") });
    }
    if (t === "notificacao") {
      out.alerts.push({ tone: "warn", title: "Veja o prazo escrito no documento", text: "Notificações costumam trazer um prazo para resposta. Anote a data limite e não deixe passar, mesmo que você ainda não tenha todos os documentos." });
    }
    if (t === "apreensao") {
      out.alerts.push({ tone: "warn", title: "Guarde o termo de apreensão", text: "O termo diz o que foi apreendido e onde ficou. Sem ele fica muito mais difícil pedir a devolução ou discutir a apreensão." });
    }

    out.todo = [
      "Guarde o documento inteiro e tire fotos nítidas de frente e verso, com todas as páginas.",
      "Anote o dia, a hora e quem entregou o papel.",
      "Procure o prazo escrito no documento e marque no calendário.",
      "Reúna os papéis da área e as provas de que você usa o local (veja a lista abaixo).",
      "Fale com um advogado antes de responder, assinar algo novo ou ir ao órgão.",
    ];
    out.gather = [
      "O documento recebido, completo (auto, termo ou notificação).",
      "Seus documentos pessoais (RG, CPF e comprovante de endereço).",
      "Papéis da terra: contrato, recibo, declaração, título ou CAR, o que existir.",
      "Fotos da área e localização (pode ser a do celular).",
      "Provas do uso da área: notas de venda, comprovantes, recibos de insumos.",
      "Outras notificações ou autos que já tenham chegado antes.",
    ];
    out.avoid = [
      "Ignorar o prazo ou deixar o papel guardado sem ler.",
      t === "embargo" ? "Continuar trabalhando na área embargada." : "Mexer na área ou nos bens antes de entender o que o órgão decidiu.",
      "Retirar por conta própria bens apreendidos ou lacrados.",
      "Postar o caso nas redes sociais ou comentar com quem não é da sua confiança.",
    ];
    out.summary = [
      `Recebi: ${nomeTipo.toLowerCase()}.`,
      o ? `Órgão: ${L(AMB_ORGAO, o).toLowerCase()}.` : "",
      a.data ? `Data da ciência: ${fmtDate(parseDate(a.data))}.` : "Não lembro a data da ciência.",
      out.deadline ? `Prazo estimado pela conta simples: ${out.deadline.date}.` : "",
      t === "embargo" ? (a.ativa === "sim" ? "A atividade ainda está em uso." : "A atividade já parou.") : "",
    ].filter(Boolean);
    return out;
  },
};

/* ====================================================== CRIMINAL */
const CRI_SIT = [
  { v: "flagrante", l: "Alguém foi preso em flagrante", d: "A prisão aconteceu agora ou nos últimos dias." },
  { v: "intimacao", l: "Recebi uma intimação para depor", d: "Fui chamado na delegacia ou no fórum." },
  { v: "processo", l: "Fui citado em um processo criminal", d: "Recebi uma ação ou tenho audiência marcada." },
  { v: "mandado", l: "Existe mandado de prisão ou receio de ser preso", d: "Alguém foi procurado pela polícia." },
  { v: "execucao", l: "Um familiar foi condenado", d: "Quero saber sobre a execução da pena." },
];

const criminal = {
  id: "criminal",
  titulo: "Alguém foi preso ou fui chamado pela polícia ou pela Justiça",
  intro: "Escolha a sua situação e veja o que fazer nas próximas horas, o que levar e o que evitar.",
  steps: [
    { id: "sit", q: "Qual é a situação?", opts: CRI_SIT },
    { id: "quando", type: "datetime", q: "Quando a pessoa foi presa?", hint: "Dia e hora aproximados. Se não souber, pode pular.", skip: "Não sei", when: a => a.sit === "flagrante" },
    { id: "adv", q: "A pessoa presa já tem advogado?", when: a => a.sit === "flagrante", opts: [
      { v: "sim", l: "Sim, já foi avisado" },
      { v: "nao", l: "Ainda não" },
    ] },
    { id: "data", type: "date", q: "Qual a data marcada no papel?", hint: "Dia do depoimento, da audiência ou do prazo que consta no documento. Se não houver, pule.", skip: "Não tem data", when: a => a.sit === "intimacao" || a.sit === "processo" },
  ],
  result(a) {
    const out = { alerts: [], todo: [], gather: [], avoid: [], deadline: null };
    const s = a.sit;
    out.lead = "Este resultado é uma orientação geral e não substitui um advogado. Em matéria criminal o tempo pesa, então não espere para pedir ajuda.";
    if (s === "flagrante") {
      out.title = "Prisão em flagrante: o que a família pode fazer agora";
      if (a.quando) {
        const p = new Date(a.quando); const lim = new Date(p.getTime() + 24 * 3600 * 1000);
        const h = (Date.now() - p.getTime()) / 3600000;
        out.deadline = {
          label: "Limite de 24 horas da prisão",
          date: `${fmtDate(lim)}, ${fmtDia(lim)}, ${fmtHora(lim)}`,
          note: (h < 0 ? "A hora informada ainda não chegou, confira o horário. " : h <= 24 ? `Já se passaram cerca de ${Math.floor(h)} horas. ` : `Já se passaram cerca de ${Math.floor(h)} horas. `) +
            "Em até 24 horas da prisão, o auto de prisão deve ser encaminhado ao juiz e a nota de culpa entregue ao preso (CPP, art. 306, §§ 1º e 2º), e a audiência de custódia é prevista nesse mesmo prazo. As regras da audiência mudaram recentemente na lei, por isso o advogado confere o que vale agora.",
          late: h > 24,
        };
      }
      out.alerts.push({ tone: "stop", title: "Procure um advogado agora", text: "A lei manda comunicar a prisão e o local ao juiz, ao Ministério Público e à família ou a quem a pessoa indicar. Se ela não informar o nome de um advogado, a cópia do auto vai para a Defensoria Pública (CPP, art. 306)." + (a.adv === "nao" ? " Como ainda não há advogado, o ideal é contratar e avisar a autoridade o quanto antes." : "") });
      out.todo = [
        "Anote o nome completo da pessoa, o local onde ela está e o horário da prisão.",
        "Contrate um advogado e passe o nome dele para a autoridade que mantém a pessoa presa.",
        "Separe comprovante de endereço fixo e de trabalho, que podem ser úteis na audiência.",
        "Peça ao advogado para acompanhar a audiência de custódia e explique o que a família sabe do caso.",
        "Mantenha o celular por perto, o escritório ou o advogado vai precisar falar com você.",
      ];
      out.gather = [
        "Documentos pessoais da pessoa presa.",
        "Comprovante de residência atual.",
        "Comprovante de trabalho ou de renda, se houver.",
        "Nome da delegacia ou unidade onde está e horário da prisão.",
        "Qualquer papel que já tenha sido entregue à família.",
      ];
      out.avoid = [
        "Deixar a pessoa prestar depoimento sem advogado.",
        "Assinar papéis sem ler ou sem entender.",
        "Comentar os fatos por telefone, mensagens ou redes sociais.",
        "Pagar a quem prometa resolver rápido ou garantir resultado.",
      ];
    } else if (s === "intimacao") {
      out.title = "Intimação para depor: prepare-se antes";
      if (a.data) out.alerts.push({ tone: "warn", title: `Data no papel: ${fmtDate(parseDate(a.data))}`, text: "Marque no calendário e procure um advogado antes dessa data. Ir sem orientação é o erro mais comum." });
      out.alerts.push({ tone: "warn", title: "Veja em que condição você foi chamado", text: "A intimação costuma dizer se você vai como testemunha, vítima ou investigado. Isso muda a orientação. O direito ao silêncio é garantido pela Constituição (art. 5º, LXIII), e o ideal é esperar o advogado antes de responder." });
      out.todo = ["Guarde a intimação e fotografe frente e verso.", "Veja a data, o horário, o local e a condição em que você foi chamado.", "Procure um advogado antes do dia marcado e leve o documento.", "Anote tudo o que você lembra sobre os fatos, só para você e o advogado, com datas e nomes."];
      out.gather = ["A intimação ou ofício recebido.", "Documentos pessoais.", "Mensagens, fotos ou papéis relacionados aos fatos.", "Nome de testemunhas que possam ajudar."];
      out.avoid = ["Ir à delegacia sem saber em que condição foi chamado.", "Responder perguntas sem advogado.", "Combinar versão com outras pessoas.", "Apagar mensagens ou documentos."];
    } else if (s === "processo") {
      out.title = "Processo criminal: não deixe o prazo passar";
      if (a.data) out.alerts.push({ tone: "warn", title: `Data no papel: ${fmtDate(parseDate(a.data))}`, text: "Leve o documento a um advogado o quanto antes. O mandado ou a citação traz o prazo para responder, e perder esse prazo prejudica a defesa." });
      out.todo = ["Guarde a citação, o mandado e qualquer documento do processo.", "Anote o número do processo e a vara ou o juízo.", "Veja o prazo escrito e a data de audiência, se houver.", "Procure um advogado antes de responder ou de comparecer."];
      out.gather = ["Citação, mandado ou intimações recebidas.", "Número do processo.", "Documentos pessoais e comprovantes de residência e trabalho.", "Tudo o que ajude a contar a sua versão: mensagens, fotos, testemunhas."];
      out.avoid = ["Ignorar a citação.", "Faltar a audiência sem avisar o advogado.", "Falar do caso nas redes sociais.", "Apagar provas."];
    } else if (s === "mandado") {
      out.title = "Mandado de prisão ou receio de prisão";
      out.alerts.push({ tone: "stop", title: "Fale com um advogado hoje", text: "O advogado consegue verificar se existe mesmo um mandado, em que processo e quais opções existem no seu caso. Quanto antes essa conversa acontecer, mais caminhos ficam abertos." });
      out.todo = ["Anote o que você sabe: quem procurou, onde e quando.", "Fale com um advogado para consultar o processo.", "Reúna comprovantes de residência fixa e de trabalho.", "Deixe a família informada sobre quem é o advogado."];
      out.gather = ["Documentos pessoais.", "Comprovante de residência e de trabalho.", "Número do processo, se souber.", "Qualquer papel ou ligação recebida da polícia ou da Justiça."];
      out.avoid = ["Decidir sozinho o que fazer sem ouvir um advogado.", "Comentar o assunto por mensagens ou nas redes.", "Seguir conselho de quem prometa resolver rápido."];
    } else {
      out.title = "Execução penal: acompanhe os direitos do condenado";
      out.alerts.push({ tone: "warn", title: "Cada benefício tem os seus requisitos", text: "Progressão de regime e outros benefícios estão previstos na Lei de Execução Penal (Lei 7.210/1984), e cada um tem as suas condições. O advogado confere em que ponto a pena está e o que já pode ser pedido." });
      out.todo = ["Anote o número do processo de execução e o local onde a pessoa cumpre a pena.", "Reúna o que mostre trabalho, estudo e bom comportamento, se houver.", "Leve tudo a um advogado para ver se já existe algum pedido possível."];
      out.gather = ["Número do processo e dados da condenação.", "Documentos do preso e da família.", "Comprovantes de trabalho, estudo ou remição.", "Comprovante de endereço para onde a pessoa iria, em caso de benefício."];
      out.avoid = ["Pagar a quem prometa soltar rápido.", "Deixar de comparecer em atos marcados pela Justiça.", "Perder prazos por falta de acompanhamento."];
    }
    out.summary = [`Situação: ${L(CRI_SIT, s).toLowerCase()}.`, a.quando ? `Prisão em ${fmtDate(new Date(a.quando))} às ${fmtHora(new Date(a.quando))}.` : "", a.adv ? (a.adv === "sim" ? "Já há advogado avisado." : "Ainda não há advogado.") : "", a.data ? `Data no papel: ${fmtDate(parseDate(a.data))}.` : ""].filter(Boolean);
    return out;
  },
};

/* ====================================================== CÍVEL */
const CIV_TIPO = [
  { v: "contrato", l: "Alguém não cumpriu um contrato ou combinado", d: "Compra, venda, serviço, aluguel, empréstimo." },
  { v: "dano", l: "Sofri um prejuízo causado por outra pessoa ou empresa", d: "Quero saber se posso pedir indenização." },
  { v: "imovel", l: "Tenho um problema com imóvel ou terreno", d: "Compra sem escritura, vizinho, posse." },
  { v: "cobranca", l: "Estou sendo cobrado de algo que não reconheço", d: "Ou preciso cobrar alguém que me deve." },
];
const civil = {
  id: "civil",
  titulo: "Preciso resolver um problema de contrato, dívida, imóvel ou indenização",
  intro: "Responda 2 perguntas e veja o que reunir e por onde começar.",
  steps: [
    { id: "tipo", q: "Qual é o seu problema?", opts: CIV_TIPO },
    { id: "prova", q: "Você tem algo por escrito sobre o caso?", hint: "Contrato, recibo, nota, comprovante, mensagens de aplicativo, e-mails.", opts: [
      { v: "sim", l: "Sim, tenho bastante coisa" },
      { v: "pouco", l: "Tenho só algumas coisas" },
      { v: "nao", l: "Foi tudo combinado de palavra" },
    ] },
    { id: "tempo", q: "Há quanto tempo isso aconteceu?", hint: "Existem prazos para entrar com ação, e eles variam conforme o tipo de caso.", opts: [
      { v: "recente", l: "Menos de 1 ano" },
      { v: "medio", l: "Entre 1 e 3 anos" },
      { v: "antigo", l: "Mais de 3 anos" },
    ] },
  ],
  result(a) {
    const out = { alerts: [], todo: [], gather: [], avoid: [], deadline: null };
    const t = a.tipo;
    out.title = t === "contrato" ? "Contrato descumprido: reúna o que foi combinado" : t === "dano" ? "Prejuízo causado por outra pessoa: a prova é o centro" : t === "imovel" ? "Imóvel ou terreno: comece pelos documentos" : "Cobrança: confira o valor e a origem";
    out.lead = "Este resultado é uma orientação geral. O advogado analisa o seu caso e diz se existe base para agir e por qual caminho.";
    if (a.prova === "nao") out.alerts.push({ tone: "warn", title: "Contrato de palavra também vale, mas é mais difícil provar", text: "A lei não exige forma especial para a maioria dos contratos (Código Civil, art. 107). Na prática, mensagens, transferências, testemunhas e fotos viram a prova do combinado, então comece a juntar tudo agora." });
    if (a.tempo === "antigo") out.alerts.push({ tone: "warn", title: "Procure um advogado logo", text: "Quanto mais tempo passa, maior o risco de o prazo para entrar com ação ter terminado. O prazo varia de caso a caso e só um advogado, olhando os fatos, consegue dizer se ainda dá tempo." });
    if (t === "imovel") out.alerts.push({ tone: "warn", title: "Recibo não é o mesmo que escritura", text: "Em regra, a propriedade de um imóvel só passa de uma pessoa para outra com o registro no cartório (Código Civil, art. 1.245). Se a terra for rural, a regularização também passa por órgãos como INCRA e ITERACRE, e essa parte é com a nossa área ambiental e agrária." });
    if (t === "dano") out.alerts.push({ tone: "warn", title: "Nem todo aborrecimento gera indenização", text: "Quem causa dano a outro pode ter de reparar (Código Civil, arts. 186 e 927), mas o valor e o direito dependem das provas e das circunstâncias." });
    out.todo = [
      "Junte tudo o que existe sobre o caso em uma pasta, física ou no celular.",
      "Faça uma linha do tempo curta: o que foi combinado, o que aconteceu e em que dia.",
      "Anote o nome e o contato de quem participou ou viu.",
      "Não apague conversas, mesmo as que pareçam ruins para você.",
      "Leve tudo a um advogado antes de responder, pagar ou assinar qualquer coisa.",
    ];
    out.gather = ["Documentos pessoais.", "Contrato, recibo, nota fiscal ou comprovante de pagamento.", "Conversas de aplicativo, e-mails e áudios relacionados.", "Fotos, orçamentos e comprovantes do prejuízo.", t === "imovel" ? "Documentos do imóvel e de quem vendeu." : "Dados completos da outra parte (nome, CPF ou CNPJ, endereço)."];
    out.avoid = ["Pagar ou assinar acordo sem entender.", "Apagar conversas e documentos.", "Combinar valores só de palavra de novo.", "Esperar mais, se o caso já é antigo."];
    out.summary = [`Caso: ${L(CIV_TIPO, t).toLowerCase()}.`, `Provas por escrito: ${a.prova === "sim" ? "sim" : a.prova === "pouco" ? "algumas" : "quase nenhuma"}.`, `Tempo desde o fato: ${a.tempo === "recente" ? "menos de 1 ano" : a.tempo === "medio" ? "entre 1 e 3 anos" : "mais de 3 anos"}.`];
    return out;
  },
};

/* ====================================================== PREVIDENCIÁRIO */
const PRE_TIPO = [
  { v: "aposentadoria", l: "Quero me aposentar", d: "Por idade, tempo de contribuição ou outra regra." },
  { v: "saude", l: "Não consigo trabalhar por motivo de saúde", d: "Auxílio por incapacidade." },
  { v: "pensao", l: "Perdi alguém que sustentava a família", d: "Pensão por morte." },
  { v: "maternidade", l: "Estou grávida ou tive filho recentemente", d: "Salário-maternidade." },
  { v: "bpc", l: "Sou idoso ou tenho deficiência e a renda da casa é baixa", d: "Benefício assistencial (BPC)." },
  { v: "negativa", l: "O INSS negou o meu pedido", d: "Quero entender se dá para recorrer." },
  { v: "revisao", l: "Já recebo e acho que o valor está errado", d: "Revisão de benefício." },
];
const BEN = { aposentadoria: "Aposentadoria", saude: "Auxílio por incapacidade", pensao: "Pensão por morte", maternidade: "Salário-maternidade", bpc: "Benefício assistencial (BPC)", negativa: "Recurso contra negativa do INSS", revisao: "Revisão de benefício" };
const previdenciario = {
  id: "previdenciario",
  titulo: "Preciso de um benefício do INSS ou o meu pedido foi negado",
  intro: "Responda 2 ou 3 perguntas e veja o que reunir antes de pedir ou recorrer.",
  steps: [
    { id: "tipo", q: "O que você precisa?", opts: PRE_TIPO },
    { id: "rural", q: "Você trabalha ou já trabalhou em atividade rural ou extrativista?", hint: "Roçado, seringa, castanha, pesca, criação, agricultura familiar.", opts: [
      { v: "sim", l: "Sim, sempre ou na maior parte da vida" },
      { v: "mista", l: "Um pouco no campo e um pouco na cidade" },
      { v: "nao", l: "Não" },
    ] },
    { id: "data", type: "date", q: "Qual a data da carta de indeferimento?", hint: "Está escrito na carta que o INSS enviou ou no aplicativo Meu INSS. O prazo para recorrer também costuma estar nela.", skip: "Não tenho a carta", when: a => a.tipo === "negativa" },
  ],
  result(a) {
    const out = { alerts: [], todo: [], gather: [], avoid: [], deadline: null };
    const t = a.tipo;
    out.title = `${BEN[t]}: o que reunir antes de começar`;
    out.lead = "Cada benefício tem regras próprias de idade, carência e contribuição. Este resultado mostra por onde começar, e só a análise do seu histórico diz se você tem direito.";
    if (t === "negativa") out.alerts.push({ tone: "warn", title: "Veja o prazo na carta de indeferimento", text: "Em geral é possível recorrer, na via administrativa e, dependendo do caso, na Justiça. O prazo para recorrer vem indicado na própria carta, então leia e anote a data limite" + (a.data ? ` (a carta é de ${fmtDate(parseDate(a.data))}).` : ".") });
    if (a.rural !== "nao") out.alerts.push({ tone: "warn", title: "Trabalho rural e extrativista tem comprovação própria", text: "A lei prevê regras específicas para quem trabalha no campo, e a prova costuma vir de documentos variados, muitas vezes em nome de outra pessoa da família. Quanto antes você juntar, melhor." });
    out.todo = [
      "Faça (ou peça) o extrato do CNIS no Meu INSS para ver o que o INSS já registrou do seu trabalho.",
      "Junte carteira de trabalho, carnês e qualquer papel que mostre os períodos trabalhados.",
      t === "saude" ? "Reúna laudos, atestados, receitas e exames mais recentes." : t === "pensao" ? "Separe a certidão de óbito e os documentos que mostrem a relação com quem faleceu." : t === "maternidade" ? "Separe certidão de nascimento ou documento da gestação e comprovantes de trabalho ou contribuição." : t === "bpc" ? "Separe documentos de todos que moram na casa e comprovantes da renda familiar." : t === "negativa" ? "Guarde a carta de indeferimento e o número do requerimento." : t === "revisao" ? "Separe a carta de concessão e o histórico de pagamentos do benefício." : "Confira se há períodos de trabalho que não aparecem no CNIS.",
      "Leve tudo a um advogado antes de fazer ou refazer o pedido, para escolher o benefício certo.",
    ];
    out.gather = ["Documentos pessoais (RG, CPF e comprovante de endereço).", "Extrato CNIS e carteira de trabalho.", a.rural !== "nao" ? "Documentos que mostrem a atividade rural ou extrativista ao longo dos anos." : "Carnês e comprovantes de contribuição.", t === "negativa" || t === "revisao" ? "Carta de indeferimento ou de concessão." : "Laudos e documentos específicos do benefício.", "Dados de conta ou senha do Meu INSS (somente você deve guardar a senha, não mande para ninguém)."];
    out.avoid = ["Fazer o pedido às pressas, só para ver o que acontece.", "Pagar a quem prometa benefício garantido.", "Entregar a senha do Meu INSS a terceiros.", "Deixar passar o prazo para recorrer."];
    out.summary = [`Preciso de: ${BEN[t].toLowerCase()}.`, a.rural === "sim" ? "Trabalho em atividade rural ou extrativista." : a.rural === "mista" ? "Trabalho parte no campo e parte na cidade." : "", a.data ? `Carta de indeferimento de ${fmtDate(parseDate(a.data))}.` : ""].filter(Boolean);
    return out;
  },
};

export const GUIAS = { ambiental, criminal, civil, previdenciario };
