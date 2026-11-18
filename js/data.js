/* =========================================================
   FLUENT 90 — Conteúdo do curso
   Inglês profissional para quem já sabe o básico e precisa
   chegar à fluência para entrevistas e trabalho.
   ========================================================= */

const UNITS = [
  /* ---------------------------------------------------- 1 */
  {
    id: 1,
    title: "Introducing Yourself Professionally",
    titlePt: "Apresentação profissional",
    goal: "Se apresentar com segurança em 60 segundos: quem você é, o que faz e no que está trabalhando agora.",
    grammarTitle: "Present Simple × Present Continuous",
    grammar: `
      <p><strong>Present Simple</strong> = fatos, rotina, coisas permanentes.<br>
      <em>I <b>work</b> as a marketing analyst. She <b>manages</b> a team of five.</em></p>
      <p><strong>Present Continuous</strong> (am/is/are + -ing) = algo temporário ou acontecendo neste período.<br>
      <em>I'<b>m</b> currently <b>working</b> on a rebranding project. We'<b>re hiring</b> this month.</em></p>
      <div class="tip"><b>Dica de nativo:</b> verbos de estado (<i>know, need, want, believe, understand, like</i>) quase nunca vão para o -ing.
      Diga <em>"I <b>know</b> the answer"</em>, nunca <s>"I am knowing"</s>.</div>
      <div class="tip"><b>Erro clássico do brasileiro:</b> na 3ª pessoa o verbo ganha <b>-s</b>: <em>He work<b>s</b>, She want<b>s</b>, It depend<b>s</b></em>.
      Nativos percebem esse erro na hora.</div>`,
    phrases: [
      ["I work as a marketing analyst at a manufacturing company.", "Trabalho como analista de marketing em uma indústria."],
      ["I'm in charge of our digital campaigns.", "Sou responsável pelas nossas campanhas digitais."],
      ["I'm currently working on a rebranding project.", "Atualmente estou trabalhando em um projeto de rebranding."],
      ["My background is in advertising.", "Minha formação/experiência é em publicidade."],
      ["I specialize in data-driven marketing.", "Sou especialista em marketing orientado a dados."],
      ["What I enjoy most about my job is solving problems.", "O que mais gosto no meu trabalho é resolver problemas."],
      ["It's a pleasure to meet you.", "É um prazer conhecê-lo(a)."],
      ["I'd love to hear more about your team.", "Adoraria saber mais sobre a sua equipe."]
    ],
    exercises: [
      { type: "mc", q: "Right now, I ___ on a new campaign for our biggest client.", options: ["work", "am working", "works", "worked"], answer: 1, explain: "“Right now / currently” = ação em andamento → present continuous." },
      { type: "mc", q: "She ___ for a multinational company in São Paulo.", options: ["work", "is work", "works", "working"], answer: 2, explain: "Fato permanente, 3ª pessoa (she) → works." },
      { type: "fill", q: "I ___ (need) more time to finish the report.", answer: ["need"], explain: "Need é verbo de estado: não usa -ing." },
      { type: "mc", q: "Qual frase soa natural?", options: ["I am knowing a lot about SEO.", "I know a lot about SEO.", "I knowing a lot about SEO.", "I am know a lot about SEO."], answer: 1, explain: "Know é verbo de estado → present simple." },
      { type: "order", words: ["background", "My", "in", "is", "finance"], answer: "My background is in finance", explain: "“My background is in…” é a forma natural de falar da sua formação/área." },
      { type: "fill", q: "It ___ (depend) on the budget.", answer: ["depends"], explain: "3ª pessoa (it) → depends. E é depend ON, não “depend of”." }
    ],
    speaking: {
      prompt: "Apresente-se em 60 segundos: nome, cargo, empresa/área, o que você faz no dia a dia, um projeto atual e um ponto forte.",
      tips: ["Comece com o presente (quem é), passe pelo passado (de onde veio) e termine no futuro (o que busca).", "Use pelo menos uma frase no present continuous: “I'm currently…”.", "Fale devagar e com pausas. Clareza vale mais que velocidade."],
      model: "Hi, I'm Rafael. I work as a marketing analyst at a manufacturing company, where I'm in charge of our digital campaigns and lead generation. My background is in advertising, and I've been in this field for about six years. I'm currently working on a rebranding project that involves three different departments. What I enjoy most about my job is turning data into decisions. I'm now looking for an opportunity to work with international teams."
    }
  },
  /* ---------------------------------------------------- 2 */
  {
    id: 2,
    title: "Talking About Your Experience",
    titlePt: "Falando da sua experiência",
    goal: "Contar sua trajetória profissional sem confundir passado com experiência.",
    grammarTitle: "Present Perfect × Past Simple · for/since",
    grammar: `
      <p><strong>Past Simple</strong> = ação terminada, com tempo definido ou implícito.<br>
      <em>I <b>joined</b> the company <b>in 2020</b>. I <b>worked</b> at a startup <b>from 2017 to 2019</b>.</em></p>
      <p><strong>Present Perfect</strong> (have/has + particípio) = experiência sem data, ou algo que começou no passado e <u>continua até hoje</u>.<br>
      <em>I'<b>ve worked</b> here <b>since 2019</b>. I'<b>ve led</b> several international projects.</em></p>
      <div class="tip"><b>O erro nº 1 dos brasileiros:</b> <s>"I work here since 2019"</s>. Em inglês, algo que começou no passado e continua precisa do present perfect:
      <em>"I'<b>ve worked</b> here since 2019"</em> ou <em>"I'<b>ve been working</b> here since 2019"</em>.</div>
      <p><b>for</b> + duração (<i>for five years, for a month</i>) · <b>since</b> + ponto de início (<i>since 2019, since March, since I graduated</i>).</p>`,
    phrases: [
      ["I've worked in marketing for six years.", "Trabalho com marketing há seis anos."],
      ["I joined the company in 2020.", "Entrei na empresa em 2020."],
      ["Before that, I worked at a tech startup.", "Antes disso, trabalhei em uma startup de tecnologia."],
      ["I've led several cross-functional projects.", "Liderei vários projetos multidisciplinares."],
      ["I was promoted to coordinator in 2022.", "Fui promovido(a) a coordenador(a) em 2022."],
      ["I have hands-on experience with CRM tools.", "Tenho experiência prática com ferramentas de CRM."],
      ["I've never used that software, but I'm a fast learner.", "Nunca usei esse software, mas aprendo rápido."],
      ["Throughout my career, I've worked closely with sales teams.", "Ao longo da carreira, trabalhei próximo de times de vendas."]
    ],
    exercises: [
      { type: "mc", q: "I ___ at this company since 2019.", options: ["work", "worked", "have worked", "am working"], answer: 2, explain: "Começou no passado e continua (since) → present perfect." },
      { type: "mc", q: "I ___ to a conference in Chicago last year.", options: ["have gone", "went", "go", "have been going"], answer: 1, explain: "“Last year” = tempo terminado → past simple." },
      { type: "mc", q: "I've lived in Curitiba ___ three years.", options: ["since", "for", "during", "from"], answer: 1, explain: "Duração → for." },
      { type: "fill", q: "She ___ (be) promoted in 2022.", answer: ["was"], explain: "Data definida (2022) → past simple: was promoted." },
      { type: "fill", q: "We ___ (not / finish) the project yet.", answer: ["haven't finished", "have not finished"], explain: "“Yet” pede present perfect: haven't finished." },
      { type: "order", words: ["never", "I've", "with", "worked", "SAP"], answer: "I've never worked with SAP", explain: "Never fica entre have e o particípio." }
    ],
    speaking: {
      prompt: "Conte sua trajetória: onde começou (past simple), há quanto tempo está na área (present perfect + for/since) e duas experiências relevantes.",
      tips: ["Use datas com past simple: “In 2018, I…”.", "Use present perfect para experiência acumulada: “I've managed…”.", "Conecte com: Before that, After that, Then, Since then."],
      model: "I started my career in 2016 as an intern at an advertising agency. After two years, I moved to a tech startup, where I learned a lot about performance marketing. I joined my current company in 2020, and I was promoted to coordinator in 2022. Since then, I've led several cross-functional projects and I've managed a team of four people. Throughout my career, I've worked closely with sales, so I understand both sides of the funnel."
    }
  },
  /* ---------------------------------------------------- 3 */
  {
    id: 3,
    title: "Achievements and Results",
    titlePt: "Conquistas e resultados",
    goal: "Vender seus resultados com verbos de impacto e números falados corretamente.",
    grammarTitle: "Action verbs · números · by × to",
    grammar: `
      <p>Recrutadores americanos querem <b>resultados mensuráveis</b>. Troque <s>"I was responsible for sales"</s> por verbos de ação:</p>
      <p class="chips"><span>increased</span><span>reduced</span><span>launched</span><span>led</span><span>improved</span><span>streamlined</span><span>implemented</span><span>negotiated</span><span>built</span><span>delivered</span></p>
      <p><b>by × to</b>: <em>Sales increased <b>by</b> 30%</em> (a variação) · <em>Sales increased <b>to</b> $2 million</em> (o valor final).</p>
      <div class="tip"><b>Números:</b> <i>thousand, million, hundred</i> não vão para o plural depois de número: <em>two <b>thousand</b> leads</em> (não <s>thousands</s>).
      Decimais usam <b>ponto</b>: <em>2.5 million</em> = “two point five million”. Mil usa <b>vírgula</b>: 10,000.</div>`,
    phrases: [
      ["I increased engagement by 40% in six months.", "Aumentei o engajamento em 40% em seis meses."],
      ["We reduced operating costs by 15%.", "Reduzimos os custos operacionais em 15%."],
      ["I launched a campaign that generated two thousand leads.", "Lancei uma campanha que gerou duas mil leads."],
      ["I streamlined the approval process.", "Simplifiquei/agilizei o processo de aprovação."],
      ["The project resulted in a 20% increase in sales.", "O projeto resultou em um aumento de 20% nas vendas."],
      ["I managed a budget of half a million dollars.", "Gerenciei um orçamento de meio milhão de dólares."],
      ["One of my biggest achievements was cutting delivery time in half.", "Uma das minhas maiores conquistas foi reduzir o prazo de entrega pela metade."],
      ["I'm especially proud of how the team handled that crisis.", "Tenho orgulho especial de como o time lidou com aquela crise."]
    ],
    exercises: [
      { type: "mc", q: "Our revenue grew ___ 30% compared to last year.", options: ["in", "by", "to", "on"], answer: 1, explain: "Variação percentual → by." },
      { type: "mc", q: "We generated two ___ new leads.", options: ["thousands", "thousand", "thousands of", "thousand of"], answer: 1, explain: "Depois de um número: thousand, sem -s." },
      { type: "fill", q: "Last year we ___ (reduce) costs by 15%.", answer: ["reduced"], explain: "Last year → past simple." },
      { type: "mc", q: "Qual frase causa mais impacto numa entrevista?", options: ["I was responsible for the website.", "I worked on the website.", "I redesigned the website and increased conversions by 25%.", "I did things on the website."], answer: 2, explain: "Verbo de ação + resultado em número." },
      { type: "order", words: ["resulted", "The", "in", "project", "savings", "big"], answer: "The project resulted in big savings", explain: "Result IN = resultar em." },
      { type: "fill", q: "Como se lê 2.5M? “two ___ five million”", answer: ["point"], explain: "Decimal em inglês = point." }
    ],
    speaking: {
      prompt: "Fale de 2 conquistas profissionais. Para cada uma: o que você fez (verbo de ação) e o resultado em números.",
      tips: ["Fórmula: I + verbo de ação + o quê + resultado (by X%).", "Se não tiver número exato, use estimativa: “roughly”, “about”, “almost”.", "Termine com o impacto para a empresa."],
      model: "One of my biggest achievements was redesigning our lead nurturing process. I mapped the whole funnel, created automated email sequences and aligned the criteria with the sales team. As a result, our conversion rate increased by roughly 25% in four months. Another achievement was renegotiating contracts with our media suppliers, which reduced our costs by about 15% without losing reach."
    }
  },
  /* ---------------------------------------------------- 4 */
  {
    id: 4,
    title: "Your Role and Responsibilities",
    titlePt: "Seu cargo e responsabilidades",
    goal: "Descrever o que você faz usando collocations naturais e as preposições certas.",
    grammarTitle: "Make × Do · collocations · preposições",
    grammar: `
      <p><b>MAKE</b> = criar, produzir, decidir: <em>make a decision, make a plan, make a mistake, make progress, make a call, make money</em>.<br>
      <b>DO</b> = executar tarefas/atividades: <em>do research, do a report, do business, do your job, do an analysis</em>.</p>
      <p><b>Preposições que mais derrubam brasileiros:</b></p>
      <ul>
        <li>responsible <b>for</b> + -ing → <em>responsible for managing</em></li>
        <li>in charge <b>of</b> → <em>in charge of the budget</em></li>
        <li>report <b>to</b> → <em>I report to the CFO</em></li>
        <li>good <b>at</b> · experienced <b>in</b> · interested <b>in</b> · depend <b>on</b></li>
        <li>deal <b>with</b> / handle (sem preposição) → <em>I deal with suppliers / I handle complaints</em></li>
      </ul>
      <div class="tip"><b>Atenção:</b> depois de preposição o verbo vai para <b>-ing</b>: <em>I'm good at negotiat<b>ing</b></em>, <em>responsible for creat<b>ing</b></em>.</div>`,
    phrases: [
      ["I report directly to the marketing director.", "Reporto diretamente ao diretor de marketing."],
      ["I'm responsible for managing the annual budget.", "Sou responsável por gerenciar o orçamento anual."],
      ["I handle client requests and complaints.", "Cuido das solicitações e reclamações dos clientes."],
      ["I deal with suppliers on a daily basis.", "Lido com fornecedores diariamente."],
      ["My main duties include planning and reporting.", "Minhas principais funções incluem planejamento e relatórios."],
      ["I do a lot of data analysis.", "Faço muita análise de dados."],
      ["I work closely with the sales team.", "Trabalho em estreita colaboração com o time de vendas."],
      ["I make sure deadlines are met.", "Garanto que os prazos sejam cumpridos."]
    ],
    exercises: [
      { type: "mc", q: "As a manager, I have to ___ a lot of decisions.", options: ["do", "make", "take", "have"], answer: 1, explain: "Make a decision (no inglês americano)." },
      { type: "mc", q: "Before launching, we ___ some market research.", options: ["made", "did", "took", "got"], answer: 1, explain: "Do research." },
      { type: "fill", q: "I'm responsible ___ the social media accounts.", answer: ["for"], explain: "Responsible FOR." },
      { type: "fill", q: "I'm really good ___ negotiating.", answer: ["at"], explain: "Good AT + -ing." },
      { type: "fill", q: "I report ___ the CEO.", answer: ["to"], explain: "Report TO alguém." },
      { type: "mc", q: "Qual está correta?", options: ["I'm in charge for the team.", "I'm in charge of the team.", "I'm in charge with the team.", "I'm in charge on the team."], answer: 1, explain: "In charge OF." }
    ],
    speaking: {
      prompt: "Descreva seu cargo atual: a quem você reporta, 3 responsabilidades principais, com quem trabalha junto e um desafio da função.",
      tips: ["Use: I report to…, I'm responsible for + -ing…, I work closely with…", "Inclua pelo menos uma collocation com make e uma com do.", "Evite listar tarefas: mostre o porquê delas."],
      model: "I report directly to the marketing director. I'm responsible for planning our campaigns, managing the annual budget and reporting results to the leadership team. I do a lot of data analysis, so I can make better decisions about where to invest. I work closely with sales and product. The biggest challenge in my role is balancing short-term results with long-term brand building."
    }
  },
  /* ---------------------------------------------------- 5 */
  {
    id: 5,
    title: "Meetings: Opinions and Discussions",
    titlePt: "Reuniões: opiniões e discussões",
    goal: "Participar de reuniões: dar opinião, concordar, discordar com educação, interromper e pedir esclarecimento.",
    grammarTitle: "Linguagem diplomática (softening)",
    grammar: `
      <p>Americanos são diretos, mas <b>discordar sem suavizar soa agressivo</b>. Use “amortecedores”:</p>
      <ul>
        <li><b>Opinião:</b> <em>I think… / In my opinion… / From my perspective… / The way I see it…</em></li>
        <li><b>Concordar:</b> <em>I agree. / That's a good point. / Exactly. / I couldn't agree more.</em></li>
        <li><b>Discordar:</b> <em>I see your point, but… / I'm not sure I agree. / I see it a bit differently.</em></li>
        <li><b>Interromper:</b> <em>Sorry to interrupt, but… / Can I jump in here?</em></li>
        <li><b>Esclarecer:</b> <em>Just to make sure I understand… / Could you clarify what you mean by…?</em></li>
      </ul>
      <div class="tip"><b>Erro que entrega o brasileiro:</b> <s>"I am agree"</s>. Agree já é verbo: <em>"I agree"</em>, <em>"I don't agree"</em>.</div>`,
    phrases: [
      ["From my perspective, we should focus on retention.", "Do meu ponto de vista, devemos focar em retenção."],
      ["I see your point, but I see it a bit differently.", "Entendo seu ponto, mas vejo de um jeito um pouco diferente."],
      ["Sorry to interrupt, but can I add something?", "Desculpe interromper, mas posso acrescentar algo?"],
      ["Just to make sure I understand, you mean…?", "Só para ter certeza de que entendi, você quer dizer…?"],
      ["Could you clarify what you mean by that?", "Você poderia esclarecer o que quer dizer com isso?"],
      ["That's a fair point.", "É um ponto justo."],
      ["Let's circle back to that later.", "Vamos voltar a isso mais tarde."],
      ["Can we take this offline?", "Podemos tratar disso fora da reunião?"]
    ],
    exercises: [
      { type: "mc", q: "I ___ with you on this point.", options: ["am agree", "agree", "am agreeing", "agreeing"], answer: 1, explain: "Agree é verbo: I agree." },
      { type: "mc", q: "Qual é a forma mais educada de discordar do seu chefe?", options: ["You're wrong.", "No, that's not right.", "I see your point, but I'm not sure that's the best approach.", "I don't think so, no."], answer: 2, explain: "Reconheça antes de discordar." },
      { type: "fill", q: "Sorry to ___, but I have a quick question.", answer: ["interrupt"], explain: "Sorry to interrupt." },
      { type: "mc", q: "Para checar se você entendeu:", options: ["Repeat please.", "What?", "Just to make sure I understand, you want the report by Friday?", "I didn't understand nothing."], answer: 2, explain: "Paráfrase + confirmação é a forma profissional." },
      { type: "order", words: ["back", "Let's", "to", "that", "circle", "later"], answer: "Let's circle back to that later", explain: "Circle back = retomar um assunto depois." },
      { type: "fill", q: "I couldn't agree ___.", answer: ["more"], explain: "I couldn't agree more = concordo totalmente." }
    ],
    speaking: {
      prompt: "Simule uma reunião: seu gestor propõe cortar o orçamento de marketing pela metade. Dê sua opinião, reconheça o ponto dele e proponha uma alternativa.",
      tips: ["Reconheça → discorde → justifique → proponha.", "Use “I see your point, but…” e “What if we…?”.", "Termine com uma pergunta para envolver o outro."],
      model: "I see your point, and I understand we need to cut costs this quarter. But I'm not sure cutting the marketing budget in half is the best approach, because our paid campaigns generate about forty percent of our leads. What if we cut the channels with the lowest return first and keep the ones that are performing well? I can put together a quick analysis by Friday. Would that work for you?"
    }
  },
  /* ---------------------------------------------------- 6 */
  {
    id: 6,
    title: "Small Talk and Video Calls",
    titlePt: "Conversa informal e videochamadas",
    goal: "Quebrar o gelo, manter conversa leve e se virar em calls com problemas técnicos.",
    grammarTitle: "Perguntas com auxiliares · perguntas indiretas",
    grammar: `
      <p>Toda pergunta em inglês precisa de um <b>auxiliar</b> antes do sujeito:</p>
      <p><em><b>Do</b> you work remotely? · <b>Did</b> you have a good weekend? · <b>Have</b> you been there before? · <b>Are</b> you joining the call?</em></p>
      <p><b>Perguntas indiretas</b> soam mais educadas e <u>não invertem</u> a ordem:</p>
      <p><em>Where <b>is</b> the meeting? → Could you tell me where the meeting <b>is</b>?</em><br>
      <em>What time <b>does</b> it start? → Do you know what time it <b>starts</b>?</em></p>
      <div class="tip"><b>Small talk americano</b> segue um roteiro: pergunta leve → resposta curta + detalhe → devolve a pergunta. <em>"How was your weekend?" — "Pretty good! I went hiking. How about you?"</em></div>`,
    phrases: [
      ["How's it going?", "E aí, tudo certo?"],
      ["How was your weekend?", "Como foi seu fim de semana?"],
      ["Can you hear me okay?", "Você está me ouvindo bem?"],
      ["I think you're on mute.", "Acho que você está no mudo."],
      ["Sorry, you're breaking up a little.", "Desculpe, sua voz está cortando um pouco."],
      ["Let me share my screen.", "Deixa eu compartilhar minha tela."],
      ["Could you say that again, please?", "Você poderia repetir, por favor?"],
      ["Let's touch base next week.", "Vamos nos falar de novo semana que vem."]
    ],
    exercises: [
      { type: "mc", q: "Where ___ you go on vacation last year?", options: ["do", "did", "were", "have"], answer: 1, explain: "Pergunta no passado → did + verbo base." },
      { type: "mc", q: "Pergunta indireta correta:", options: ["Could you tell me where is the office?", "Could you tell me where the office is?", "Could you tell me where does the office is?", "Could you tell me the office where is?"], answer: 1, explain: "Em perguntas indiretas não há inversão." },
      { type: "fill", q: "I think you're ___ mute.", answer: ["on"], explain: "On mute." },
      { type: "mc", q: "Resposta natural para “How's it going?”", options: ["I'm going to the office.", "Pretty good, thanks! How about you?", "It goes.", "I am fine, thank you, and you?"], answer: 1, explain: "Curta, leve e devolve a pergunta." },
      { type: "fill", q: "___ you been to New York before?", answer: ["have"], explain: "Experiência → Have you been…?" },
      { type: "order", words: ["share", "Let", "my", "me", "screen"], answer: "Let me share my screen", explain: "Let me + verbo base." }
    ],
    speaking: {
      prompt: "Você entra numa call 2 minutos antes e só tem uma pessoa lá. Faça small talk por 1 minuto: cumprimente, pergunte do fim de semana, comente algo e faça a transição para a reunião.",
      tips: ["Perguntas abertas: How was…? What did you…?", "Responda com detalhe e devolva: How about you?", "Transição: Anyway, should we wait a couple more minutes for the others?"],
      model: "Hey, good morning! How's it going? … Nice. How was your weekend? … Oh, that sounds great. I actually stayed home and finally watched that series everyone's talking about. Have you seen it? … You should, it's really good. Anyway, I think we're still waiting for a couple of people. Should we give them two more minutes and then get started?"
    }
  },
  /* ---------------------------------------------------- 7 */
  {
    id: 7,
    title: "Professional Emails",
    titlePt: "E-mails profissionais",
    goal: "Escrever e-mails claros e naturais, sem traduzir expressões do português.",
    grammarTitle: "Estrutura de e-mail · pedidos educados",
    grammar: `
      <ol>
        <li><b>Saudação:</b> <em>Hi Sarah,</em> (padrão) · <em>Dear Mr. Lopez,</em> (formal)</li>
        <li><b>Propósito:</b> <em>I'm writing to… / I'm reaching out to… / Just following up on…</em></li>
        <li><b>Pedido:</b> <em>Could you please…? / Would you mind + -ing…? / I'd appreciate it if you could…</em></li>
        <li><b>Anexo:</b> <em>I've attached… / Please find the report attached.</em></li>
        <li><b>Fechamento:</b> <em>Let me know if you have any questions. / Looking forward to hearing from you.</em></li>
        <li><b>Despedida:</b> <em>Best, / Best regards, / Thanks,</em></li>
      </ol>
      <div class="tip"><b>Traduções literais para evitar:</b> <s>"I stay waiting your return"</s> → <em>"I look forward to hearing from you"</em>.
      <s>"Follow attached"</s> → <em>"Please see attached"</em>. <s>"Any doubt, I'm available"</s> → <em>"If you have any questions, feel free to reach out"</em>.</div>`,
    phrases: [
      ["I'm reaching out to schedule a quick call.", "Estou entrando em contato para agendar uma call rápida."],
      ["Just following up on my previous email.", "Só retomando meu e-mail anterior."],
      ["Could you please send me the updated figures?", "Você poderia me enviar os números atualizados?"],
      ["Would you mind reviewing this by Friday?", "Você se importaria de revisar isso até sexta?"],
      ["I've attached the proposal for your review.", "Anexei a proposta para sua análise."],
      ["If you have any questions, feel free to reach out.", "Se tiver qualquer dúvida, fique à vontade para me procurar."],
      ["I look forward to hearing from you.", "Aguardo seu retorno."],
      ["Sorry for the delay in getting back to you.", "Desculpe a demora em responder."]
    ],
    exercises: [
      { type: "mc", q: "Would you mind ___ the file again?", options: ["send", "to send", "sending", "sent"], answer: 2, explain: "Would you mind + -ing." },
      { type: "mc", q: "Tradução natural de “Aguardo retorno”:", options: ["I wait your return.", "I stay waiting your answer.", "I look forward to hearing from you.", "I am waiting you."], answer: 2, explain: "Look forward TO + -ing." },
      { type: "fill", q: "I'm writing ___ follow up on our meeting.", answer: ["to"], explain: "I'm writing TO + verbo (finalidade)." },
      { type: "fill", q: "I look forward to ___ (hear) from you.", answer: ["hearing"], explain: "Look forward to + -ing (o “to” aqui é preposição)." },
      { type: "mc", q: "Substituto natural para “Qualquer dúvida, estou à disposição”:", options: ["Any doubt, I'm at disposal.", "If you have any questions, feel free to reach out.", "Any doubts, call me.", "I'm in your disposition."], answer: 1, explain: "Em inglês, “doubt” é desconfiança; para e-mail use questions." },
      { type: "order", words: ["attached", "I've", "the", "proposal"], answer: "I've attached the proposal", explain: "Forma moderna e natural de falar de anexos." }
    ],
    speaking: {
      prompt: "Escreva (ou dite) um e-mail para um recrutador americano agradecendo a entrevista de ontem, reforçando seu interesse e perguntando sobre os próximos passos.",
      tips: ["Assunto curto: “Thank you – Marketing Manager interview”.", "3 parágrafos curtos: agradecimento, reforço do fit, próximos passos.", "Feche com “Best regards,” + nome."],
      model: "Hi Jennifer, Thank you for taking the time to speak with me yesterday. I really enjoyed learning more about the team and the plans for the Latin American market. Our conversation made me even more excited about the opportunity, especially the chance to lead the regional campaigns. Please let me know if you need any additional information from me. I look forward to hearing about the next steps. Best regards, Rafael"
    }
  },
  /* ---------------------------------------------------- 8 */
  {
    id: 8,
    title: "Problem Solving and Hypotheticals",
    titlePt: "Resolução de problemas e hipóteses",
    goal: "Discutir problemas, consequências e soluções usando condicionais.",
    grammarTitle: "Conditionals 0, 1 e 2 · unless · as long as",
    grammar: `
      <p><b>Zero</b> (verdade geral): <em>If the server <b>goes</b> down, the site <b>stops</b> working.</em></p>
      <p><b>First</b> (possibilidade real): <em>If we <b>miss</b> the deadline, the client <b>will cancel</b> the contract.</em></p>
      <p><b>Second</b> (hipótese/imaginário): <em>If I <b>were</b> the manager, I <b>would</b> hire two more people.</em></p>
      <div class="tip"><b>Nunca use will depois do if:</b> <s>"If it will rain"</s> → <em>"If it rains"</em>.
      E na hipótese, o padrão em contexto formal é <em>If I <b>were</b></em> (vale para todas as pessoas).</div>
      <p><b>unless</b> = a menos que (if… not): <em>Unless we cut costs, we won't hit our target.</em><br>
      <b>as long as</b> = desde que: <em>You can work remotely as long as you meet your goals.</em></p>`,
    phrases: [
      ["If we don't act now, we'll lose the client.", "Se não agirmos agora, vamos perder o cliente."],
      ["What would you do if you were in my position?", "O que você faria se estivesse no meu lugar?"],
      ["The main issue is a lack of communication.", "O principal problema é falta de comunicação."],
      ["One possible solution would be to hire a freelancer.", "Uma solução possível seria contratar um freelancer."],
      ["Let's weigh the pros and cons.", "Vamos pesar os prós e contras."],
      ["We need to get to the bottom of this.", "Precisamos chegar à raiz disso."],
      ["Unless we cut costs, we won't hit our target.", "A menos que cortemos custos, não vamos bater a meta."],
      ["I'd suggest we run a small test first.", "Eu sugeriria fazermos um teste pequeno primeiro."]
    ],
    exercises: [
      { type: "mc", q: "If we ___ the deadline, the client will be upset.", options: ["will miss", "miss", "missed", "would miss"], answer: 1, explain: "First conditional: if + presente, will + verbo." },
      { type: "mc", q: "If I ___ you, I would accept the offer.", options: ["am", "was being", "were", "will be"], answer: 2, explain: "Second conditional: If I were you." },
      { type: "fill", q: "If I had more budget, I ___ (hire) another designer.", answer: ["would hire", "'d hire"], explain: "Second conditional → would + verbo." },
      { type: "mc", q: "___ we fix this bug, the launch will be delayed.", options: ["If", "Unless", "As long as", "When"], answer: 1, explain: "Unless = se não." },
      { type: "fill", q: "You can leave early as ___ as you finish the report.", answer: ["long"], explain: "As long as = desde que." },
      { type: "order", words: ["the", "Let's", "pros", "weigh", "cons", "and"], answer: "Let's weigh the pros and cons", explain: "Expressão fixa: weigh the pros and cons." }
    ],
    speaking: {
      prompt: "Um cliente importante está insatisfeito com os atrasos. Explique o problema, a consequência se nada mudar (1st conditional) e o que você faria se tivesse autonomia total (2nd conditional).",
      tips: ["Estrutura: problema → causa → consequência → solução.", "Use “The main issue is…” e “One possible solution would be…”.", "Feche com uma recomendação clara: “I'd suggest we…”."],
      model: "The main issue is that our approval process takes too long, so we keep missing deadlines. If we don't fix this now, we'll probably lose the account at the end of the quarter. If I had full autonomy, I would cut the approval steps from five to two and give the project lead the final say. In the short term, I'd suggest we set up a weekly call with the client to rebuild their trust."
    }
  },
  /* ---------------------------------------------------- 9 */
  {
    id: 9,
    title: "Future Plans and Career Goals",
    titlePt: "Planos e objetivos de carreira",
    goal: "Falar de planos, metas e ambições de forma convincente.",
    grammarTitle: "Will × Going to × Present Continuous",
    grammar: `
      <p><b>Going to</b> = plano já decidido: <em>I'<b>m going to</b> apply for an MBA next year.</em></p>
      <p><b>Will</b> = decisão na hora, promessa, previsão: <em>I'<b>ll</b> send it right away. / AI <b>will</b> change marketing.</em></p>
      <p><b>Present Continuous</b> = compromisso marcado: <em>I'<b>m meeting</b> the recruiter on Monday.</em></p>
      <div class="tip"><b>Para entrevistas</b>, use expressões de ambição: <em>I'm looking to…, I'd like to…, My goal is to…, In five years, I see myself…, I'm aiming for…</em></div>`,
    phrases: [
      ["I'm looking to take on more leadership responsibilities.", "Busco assumir mais responsabilidades de liderança."],
      ["In five years, I see myself leading a regional team.", "Em cinco anos, me vejo liderando um time regional."],
      ["My goal is to work with international markets.", "Meu objetivo é trabalhar com mercados internacionais."],
      ["I'm going to start an MBA next year.", "Vou começar um MBA ano que vem."],
      ["I'm meeting the hiring manager on Monday.", "Vou me reunir com o gestor da vaga na segunda."],
      ["I'll get back to you by the end of the day.", "Te retorno até o fim do dia."],
      ["I'm aiming for a senior position.", "Estou mirando uma posição sênior."],
      ["I want to keep growing in this field.", "Quero continuar crescendo nessa área."]
    ],
    exercises: [
      { type: "mc", q: "— The phone is ringing! — Don't worry, I ___ get it.", options: ["am going to", "will", "am", "would"], answer: 1, explain: "Decisão na hora → will." },
      { type: "mc", q: "I've already decided: I ___ apply for the master's program.", options: ["will", "am going to", "would", "go"], answer: 1, explain: "Plano já decidido → going to." },
      { type: "fill", q: "I ___ (meet) the recruiter at 3 p.m. tomorrow.", answer: ["am meeting", "'m meeting", "i'm meeting"], explain: "Compromisso agendado → present continuous." },
      { type: "mc", q: "Resposta forte para “Where do you see yourself in five years?”", options: ["I don't know.", "In your chair!", "I see myself leading a team and owning a regional strategy.", "Maybe working, maybe not."], answer: 2, explain: "Concreta, ambiciosa e alinhada à vaga." },
      { type: "fill", q: "I'm looking ___ take on new challenges.", answer: ["to"], explain: "I'm looking to + verbo = busco/pretendo." },
      { type: "order", words: ["myself", "I", "see", "a", "leading", "team"], answer: "I see myself leading a team", explain: "See myself + -ing." }
    ],
    speaking: {
      prompt: "Responda: “Where do you see yourself in five years?” e “What are your plans for the next 12 months?”",
      tips: ["Mostre ambição, mas conecte com a empresa.", "Use going to para planos concretos.", "Evite respostas vagas ou piadas."],
      model: "In five years, I see myself leading a regional marketing team and owning the strategy for a key market. To get there, I'm going to keep developing my leadership and analytical skills. Over the next twelve months, my goal is to work on international projects and become fully confident communicating in English. That's actually one of the reasons I'm so interested in this position."
    }
  },
  /* ---------------------------------------------------- 10 */
  {
    id: 10,
    title: "Negotiating and Persuading",
    titlePt: "Negociar e persuadir",
    goal: "Negociar prazos, recursos e salário com diplomacia.",
    grammarTitle: "Modais para suavizar: could, would, might",
    grammar: `
      <p>Em negociação, modais deixam a frase <b>firme e educada</b> ao mesmo tempo:</p>
      <ul>
        <li><em><b>Would</b> it be possible to extend the deadline?</em></li>
        <li><em>We <b>might</b> be able to offer a discount.</em></li>
        <li><em><b>Could</b> we meet halfway?</em></li>
        <li><em>I'm afraid we <b>can't</b> go below that price.</em></li>
        <li><em>If you <b>could</b> commit to a year, we <b>could</b> lower the price.</em></li>
      </ul>
      <div class="tip"><b>Salário nos EUA:</b> nunca diga só um número sem contexto. Use:
      <em>"Based on my research and experience, I'm looking for something in the range of…"</em> e
      <em>"Is there any flexibility on…?"</em></div>`,
    phrases: [
      ["Would it be possible to extend the deadline?", "Seria possível estender o prazo?"],
      ["Is there any flexibility on the budget?", "Existe alguma flexibilidade no orçamento?"],
      ["I'm afraid we can't go below that price.", "Infelizmente não podemos baixar desse preço."],
      ["Could we meet halfway?", "Podemos chegar a um meio-termo?"],
      ["Based on my experience, I'm looking for something in the range of…", "Com base na minha experiência, busco algo na faixa de…"],
      ["That sounds reasonable.", "Isso parece razoável."],
      ["Let me think it over and get back to you.", "Deixa eu pensar e te retorno."],
      ["What if we split the project into two phases?", "E se dividíssemos o projeto em duas fases?"]
    ],
    exercises: [
      { type: "mc", q: "Forma mais diplomática:", options: ["Give me a discount.", "I want a discount.", "Would it be possible to get a discount?", "Discount, please."], answer: 2, explain: "Would it be possible… = pedido educado e firme." },
      { type: "fill", q: "I'm ___ we can't accept those terms.", answer: ["afraid"], explain: "I'm afraid = infelizmente (suaviza o “não”)." },
      { type: "mc", q: "Could we meet ___?", options: ["middle", "halfway", "in half", "the half"], answer: 1, explain: "Meet halfway = chegar a um meio-termo." },
      { type: "fill", q: "Is there any ___ on the start date?", answer: ["flexibility"], explain: "Any flexibility on…? = há margem para…?" },
      { type: "order", words: ["over", "Let", "think", "me", "it"], answer: "Let me think it over", explain: "Think it over = pensar com calma." },
      { type: "mc", q: "Qual NÃO é uma boa forma de falar de salário?", options: ["I'm looking for something in the range of…", "Based on market research…", "I need more money because I have bills.", "Is there any flexibility on the base salary?"], answer: 2, explain: "Justifique pelo valor de mercado e experiência, não por necessidades pessoais." }
    ],
    speaking: {
      prompt: "O recrutador oferece um salário 10% abaixo do que você quer. Agradeça, mostre entusiasmo, apresente sua faixa com justificativa e pergunte sobre flexibilidade ou benefícios.",
      tips: ["Comece positivo: “Thank you, I'm really excited about the offer.”", "Ancore na pesquisa de mercado e na sua experiência.", "Abra alternativas: bônus, revisão em 6 meses, benefícios."],
      model: "Thank you so much for the offer. I'm really excited about the role and the team. Based on my research and my experience leading similar projects, I was expecting something closer to the range of eighty-five to ninety thousand. Is there any flexibility on the base salary? If not, would it be possible to discuss a performance review after six months, or a signing bonus?"
    }
  },
  /* ---------------------------------------------------- 11 */
  {
    id: 11,
    title: "Phrasal Verbs at Work",
    titlePt: "Phrasal verbs no trabalho",
    goal: "Entender e usar os phrasal verbs que nativos falam o tempo todo no escritório.",
    grammarTitle: "Separáveis × inseparáveis",
    grammar: `
      <p>Phrasal verb = verbo + partícula, com sentido novo. Nativos usam <b>muito mais</b> phrasal verbs do que verbos “formais”: dizem <em>find out</em> em vez de <em>discover</em>, <em>set up</em> em vez de <em>organize</em>.</p>
      <p><b>Separáveis:</b> o objeto pode ir no meio. Se for <u>pronome</u>, <b>tem</b> que ir no meio:<br>
      <em>Set up the meeting ✔ · Set the meeting up ✔ · Set it up ✔ · <s>Set up it</s> ✘</em></p>
      <p><b>Inseparáveis:</b> o objeto vem sempre depois: <em>Look into the problem → Look into it.</em> <em>Deal with it.</em></p>
      <div class="tip"><b>Estratégia:</b> aprenda phrasal verbs <b>dentro de frases</b>, nunca em listas soltas. Por isso cada um aqui tem um exemplo para você repetir em voz alta.</div>`,
    phrases: [
      ["Let's set up a meeting for Thursday.", "Vamos marcar uma reunião para quinta."],
      ["I'll follow up with the client tomorrow.", "Vou dar seguimento com o cliente amanhã."],
      ["We need to figure out what went wrong.", "Precisamos descobrir o que deu errado."],
      ["I'll look into it and let you know.", "Vou verificar e te aviso."],
      ["They put off the launch until March.", "Eles adiaram o lançamento para março."],
      ["She came up with a great idea.", "Ela teve uma ótima ideia."],
      ["We ran out of time.", "Ficamos sem tempo."],
      ["Let's catch up after lunch.", "Vamos conversar/nos atualizar depois do almoço."]
    ],
    exercises: [
      { type: "mc", q: "The meeting? Don't worry, I'll ___.", options: ["set up it", "set it up", "it set up", "set up"], answer: 1, explain: "Pronome vai no meio: set it up." },
      { type: "mc", q: "The launch was ___ until next month.", options: ["put off", "put on", "put up", "put in"], answer: 0, explain: "Put off = adiar." },
      { type: "fill", q: "We need to figure ___ a better solution.", answer: ["out"], explain: "Figure out = descobrir/resolver." },
      { type: "fill", q: "We ran ___ of paper.", answer: ["out"], explain: "Run out of = ficar sem." },
      { type: "mc", q: "“Vou verificar isso” =", options: ["I'll look at it after.", "I'll look into it.", "I'll look for it.", "I'll look up it."], answer: 1, explain: "Look into = investigar/verificar." },
      { type: "fill", q: "She came ___ with a brilliant idea.", answer: ["up"], explain: "Come up with = ter (uma ideia), criar." }
    ],
    speaking: {
      prompt: "Conte como foi uma semana difícil no trabalho usando pelo menos 5 phrasal verbs desta aula.",
      tips: ["Use: set up, follow up, figure out, look into, put off, come up with, run out of.", "Conte em ordem: Monday… Then… By Friday…", "Grave e confira se os phrasal verbs foram reconhecidos."],
      model: "Last week was crazy. On Monday, we found out that a supplier had a problem, so the launch had to be put off. I set up an emergency meeting with the team to figure out what went wrong. My manager asked me to look into other suppliers, and by Wednesday we came up with a backup plan. We almost ran out of time, but on Friday I followed up with the client and everything was back on track."
    }
  },
  /* ---------------------------------------------------- 12 */
  {
    id: 12,
    title: "Job Interview Mastery",
    titlePt: "Domínio da entrevista de emprego",
    goal: "Responder perguntas comportamentais com o método STAR e conduzir a entrevista com confiança.",
    grammarTitle: "Método STAR + conectores narrativos",
    grammar: `
      <p>Perguntas como <em>"Tell me about a time when…"</em> pedem uma <b>história</b>. Use <b>STAR</b>:</p>
      <ul>
        <li><b>S – Situation:</b> contexto (past simple / past continuous). <em>Last year, we were launching a new product…</em></li>
        <li><b>T – Task:</b> seu papel. <em>My job was to…</em></li>
        <li><b>A – Action:</b> o que <u>você</u> fez (use <b>I</b>, não <i>we</i>). <em>I organized…, I negotiated…</em></li>
        <li><b>R – Result:</b> resultado com número + aprendizado. <em>As a result, …</em></li>
      </ul>
      <p><b>Conectores:</b> <em>At first, … · Then, … · Meanwhile, … · However, … · Eventually, … · As a result, … · Looking back, …</em></p>
      <div class="tip"><b>Ganhe tempo com naturalidade:</b> <em>"That's a great question." / "Let me think about that for a second."</em> Silêncio de 3 segundos é normal; “éééé” não é.</div>`,
    phrases: [
      ["That's a great question. Let me think about that for a second.", "Ótima pergunta. Deixa eu pensar um segundo."],
      ["Let me give you an example.", "Deixa eu te dar um exemplo."],
      ["My greatest strength is my ability to turn data into action.", "Meu maior ponto forte é transformar dados em ação."],
      ["One area I'm working on is public speaking.", "Uma área que estou desenvolvendo é falar em público."],
      ["As a result, we exceeded our target by 12%.", "Como resultado, superamos a meta em 12%."],
      ["What does success look like in this role?", "Como é o sucesso nessa função?"],
      ["What are the next steps in the process?", "Quais são os próximos passos do processo?"],
      ["I'm really excited about this opportunity.", "Estou muito animado(a) com essa oportunidade."]
    ],
    exercises: [
      { type: "mc", q: "No STAR, a parte “Action” deve focar em:", options: ["O que a empresa fez.", "O que o time fez (we).", "O que VOCÊ fez (I).", "O que o chefe pediu."], answer: 2, explain: "O recrutador quer saber da SUA contribuição." },
      { type: "mc", q: "Qual conector introduz o resultado?", options: ["Meanwhile", "As a result", "At first", "However"], answer: 1, explain: "As a result = como resultado." },
      { type: "fill", q: "That's a great question. Let me ___ about that for a second.", answer: ["think"], explain: "Ganha tempo com naturalidade." },
      { type: "mc", q: "Melhor pergunta para fazer ao final da entrevista:", options: ["How much vacation do I get?", "What does success look like in this role in the first 90 days?", "Did I get the job?", "No questions."], answer: 1, explain: "Mostra interesse em entregar resultado." },
      { type: "order", words: ["result", "As", "a", "we", "the", "exceeded", "target"], answer: "As a result we exceeded the target", explain: "Conector + resultado." },
      { type: "fill", q: "One area I'm ___ on is delegating more.", answer: ["working"], explain: "Fraseado positivo para “fraqueza”." }
    ],
    speaking: {
      prompt: "Responda com STAR: “Tell me about a time you had to deal with a tight deadline.” (1,5 a 2 minutos)",
      tips: ["S e T curtos (20%), Action longa (60%), Result com número (20%).", "Use “I”, não “we”, na parte de ação.", "Termine com um aprendizado: “Looking back, I learned…”."],
      model: "Last year, our biggest client moved a product launch forward by three weeks, so we had only ten days to deliver the whole campaign. As the project lead, my job was to make it happen without hurting quality. First, I broke the project into daily goals and cut everything that wasn't essential. Then I negotiated extra support from the design team and set up short check-ins every morning. As a result, we delivered on time and the campaign generated twenty percent more leads than the previous one. Looking back, I learned that clear priorities matter more than extra hours."
    }
  }
];

/* -------- Teste de nivelamento (CEFR aproximado) -------- */
const PLACEMENT = [
  { lvl: "A1", q: "She ___ a doctor.", options: ["are", "is", "am", "be"], answer: 1 },
  { lvl: "A1", q: "___ you like coffee?", options: ["Are", "Does", "Do", "Is"], answer: 2 },
  { lvl: "A2", q: "I ___ to the cinema yesterday.", options: ["go", "went", "gone", "have gone"], answer: 1 },
  { lvl: "A2", q: "There aren't ___ apples left.", options: ["some", "any", "no", "a"], answer: 1 },
  { lvl: "A2", q: "He is ___ than his brother.", options: ["more tall", "tallest", "taller", "more taller"], answer: 2 },
  { lvl: "B1", q: "I've lived here ___ 2015.", options: ["for", "since", "from", "in"], answer: 1 },
  { lvl: "B1", q: "If it rains tomorrow, we ___ at home.", options: ["stay", "would stay", "will stay", "stayed"], answer: 2 },
  { lvl: "B1", q: "I'm not used to ___ up so early.", options: ["get", "getting", "got", "have got"], answer: 1 },
  { lvl: "B1", q: "She asked me where ___.", options: ["did I live", "I lived", "do I live", "I am live"], answer: 1 },
  { lvl: "B1", q: "The report ___ by the manager yesterday.", options: ["wrote", "was written", "has written", "is writing"], answer: 1 },
  { lvl: "B2", q: "If I ___ more time, I would learn Japanese.", options: ["have", "had", "will have", "would have"], answer: 1 },
  { lvl: "B2", q: "I wish I ___ that to my boss.", options: ["didn't say", "hadn't said", "haven't said", "don't say"], answer: 1 },
  { lvl: "B2", q: "By the time we arrived, the meeting ___.", options: ["already started", "has already started", "had already started", "was already start"], answer: 2 },
  { lvl: "B2", q: "He denied ___ the documents.", options: ["to take", "take", "taking", "took"], answer: 2 },
  { lvl: "B2", q: "We need to ___ a solution before Friday.", options: ["come up with", "come out of", "come across to", "come down on"], answer: 0 },
  { lvl: "C1", q: "Hardly ___ when the phone rang.", options: ["I had sat down", "had I sat down", "I sat down", "did I sat down"], answer: 1 },
  { lvl: "C1", q: "Had I known about the problem, I ___ differently.", options: ["would act", "will have acted", "would have acted", "had acted"], answer: 2 },
  { lvl: "C1", q: "It's high time we ___ a decision.", options: ["make", "made", "will make", "are making"], answer: 1 },
  { lvl: "C1", q: "The proposal was turned ___ by the board.", options: ["off", "down", "over", "out"], answer: 1 },
  { lvl: "C1", q: "Not only ___ late, but he also forgot the slides.", options: ["he was", "was he", "he is", "did he"], answer: 1 }
];

const LEVELS = {
  A1: { name: "A1 · Iniciante", text: "Você reconhece o básico, mas ainda trava em frases simples. Faça as unidades 1 a 4 com calma, repetindo cada frase-chave em voz alta várias vezes. Priorize flashcards e shadowing no nível fácil." },
  A2: { name: "A2 · Básico", text: "Você se vira em situações simples. O grande salto agora é dominar os tempos verbais (unidades 1–3) e ganhar vocabulário de trabalho. Faça o ciclo completo todos os dias: flashcards + aula + shadowing." },
  B1: { name: "B1 · Intermediário", text: "Você já se comunica, mas com erros e hesitação. É aqui que muita gente estaciona. Seu foco: falar MUITO (shadowing e simulador de entrevista diários) e corrigir os erros típicos de brasileiro." },
  B2: { name: "B2 · Intermediário avançado", text: "Você já tem base para trabalhar em inglês. Falta naturalidade e confiança sob pressão. Foque nas unidades 5, 8, 10 e 12, no simulador de entrevista e em imersão diária com conteúdo nativo sem legenda." },
  C1: { name: "C1 · Avançado", text: "Excelente base gramatical. Seu trabalho agora é polimento: pronúncia, phrasal verbs, expressões idiomáticas e fluência em entrevistas. Use o simulador cronometrado e grave-se todos os dias." }
};

/* -------- Simulador de entrevista -------- */
const INTERVIEW = [
  { q: "Tell me about yourself.", pt: "Fale sobre você.", tips: ["Estrutura Presente → Passado → Futuro.", "60 a 90 segundos. Nada de vida pessoal.", "Termine conectando com a vaga."], model: "I'm a marketing professional with six years of experience, currently working as a marketing coordinator at a manufacturing company, where I lead our digital campaigns. I started my career in advertising, then moved into performance marketing, which taught me to make decisions based on data. Recently, I led a rebranding project that increased our inbound leads by thirty percent. Now I'm looking for a role where I can work with international markets, and that's why this position caught my attention." },
  { q: "Why do you want to work here?", pt: "Por que você quer trabalhar aqui?", tips: ["Mostre que pesquisou a empresa.", "Conecte algo da empresa com algo seu.", "Evite falar de salário ou benefícios."], model: "I've been following your company for a while, and I really admire how you've expanded into Latin America while keeping a strong brand. I also read about your focus on data-driven marketing, which is exactly what I enjoy doing. I believe my experience with regional campaigns could add real value, and I'd love to grow in a company with an international culture." },
  { q: "Why are you leaving your current job?", pt: "Por que você está saindo do seu emprego atual?", tips: ["Nunca fale mal da empresa atual.", "Foque no que você BUSCA, não no que foge.", "Seja breve e positivo."], model: "I've learned a lot in my current company and I'm grateful for the opportunities I had there. However, I feel I've reached a point where I'm ready for bigger challenges, especially working with international teams. This role offers exactly that kind of growth." },
  { q: "What are your greatest strengths?", pt: "Quais são seus maiores pontos fortes?", tips: ["Escolha 1 ou 2 forças relevantes para a vaga.", "Prove com um exemplo rápido.", "Evite clichês sem prova (“I'm a hard worker”)."], model: "I'd say my greatest strength is my ability to turn data into action. For example, last year I noticed that most of our leads were coming from a channel we were barely investing in. I presented the numbers to my manager, we shifted part of the budget, and our cost per lead dropped by twenty percent." },
  { q: "What is your greatest weakness?", pt: "Qual é sua maior fraqueza?", tips: ["Fraqueza real, mas não crítica para a vaga.", "Mostre o que você já está fazendo para melhorar.", "Fórmula: One area I'm working on is… so I've started…"], model: "One area I'm working on is delegating. In the past, I tended to do too much myself because I wanted everything to be perfect. I realized that was slowing the team down, so I've started setting clear expectations and trusting people with more ownership. It's made a big difference in both my workload and the team's growth." },
  { q: "Tell me about a time you faced a challenge at work.", pt: "Conte sobre um desafio que enfrentou no trabalho.", tips: ["Use STAR.", "Ação com “I”.", "Resultado com número + aprendizado."], model: "Last year, our main supplier went out of business two weeks before a big launch. My task was to find an alternative without delaying the campaign. I contacted five suppliers in two days, negotiated faster delivery with one of them and adjusted our timeline with the team. As a result, we launched only two days late and stayed within budget. I learned the importance of always having a backup plan." },
  { q: "Tell me about a time you worked under pressure.", pt: "Conte sobre uma vez em que trabalhou sob pressão.", tips: ["Mostre calma e método, não heroísmo.", "Fale como priorizou.", "Feche com resultado."], model: "During our Black Friday campaign, our website crashed on the busiest day. While the IT team fixed the problem, I was responsible for communication. I quickly paused all paid ads to avoid wasting budget, posted updates on our social channels and prepared a special offer for the following day. As a result, we recovered most of the sales and actually received positive comments about our transparency." },
  { q: "Describe a conflict with a coworker and how you handled it.", pt: "Descreva um conflito com um colega e como lidou com ele.", tips: ["Não culpe a outra pessoa.", "Mostre escuta e iniciativa.", "Resultado: relação melhor + trabalho entregue."], model: "A colleague from sales and I disagreed about lead quality. He felt marketing was sending bad leads, and I felt sales wasn't following up fast enough. Instead of arguing over email, I invited him for a coffee to understand his side. We agreed on a shared definition of a qualified lead and set up a weekly fifteen-minute check-in. Within two months, our conversion rate improved and we became good partners." },
  { q: "Where do you see yourself in five years?", pt: "Onde você se vê em cinco anos?", tips: ["Ambição alinhada à empresa.", "Fale de habilidades e impacto, não só de cargo.", "Mostre que quer ficar e crescer ali."], model: "In five years, I see myself in a leadership position, managing a team and owning the marketing strategy for a key region. I want to become an expert in international markets, and I believe this company is the right place to grow in that direction." },
  { q: "Why should we hire you?", pt: "Por que deveríamos contratar você?", tips: ["Resuma: experiência + resultado + fit.", "Use requisitos da vaga.", "Confiança, sem arrogância."], model: "You're looking for someone who can lead campaigns, work with data and collaborate with sales. That's exactly what I've been doing for the past six years. I've increased leads by thirty percent, reduced costs and built strong relationships with sales teams. On top of that, I'm genuinely excited about your expansion plans, and I'm ready to contribute from day one." },
  { q: "What are your salary expectations?", pt: "Qual sua pretensão salarial?", tips: ["Pesquise a faixa antes.", "Dê uma faixa, não um número único.", "Mostre abertura para o pacote completo."], model: "Based on my research and my experience, I'm looking for something in the range of seventy to eighty thousand dollars a year. That said, I'm open to discussing the full compensation package, including benefits and growth opportunities." },
  { q: "Tell me about a mistake you made.", pt: "Conte sobre um erro que você cometeu.", tips: ["Erro real e não catastrófico.", "Assuma a responsabilidade.", "Foque no que aprendeu e mudou."], model: "Early in my career, I sent a campaign email to the wrong customer list. I noticed it within an hour, told my manager immediately and sent a short apology email to the affected customers. Since then, I've always used a checklist and asked a colleague to review every send. It was a small mistake, but it taught me a lot about attention to detail and owning my mistakes." },
  { q: "How do you prioritize your work?", pt: "Como você prioriza seu trabalho?", tips: ["Cite um método (impacto × urgência).", "Mencione comunicação com stakeholders.", "Dê um exemplo concreto."], model: "I usually start my week by listing everything on my plate and ranking it by impact and urgency. High impact tasks get my mornings, when I'm most focused. If two urgent requests compete, I talk to the stakeholders to align expectations instead of guessing. For example, last month I had two launches on the same week, so I negotiated a three-day shift for one of them, and both went smoothly." },
  { q: "What's your biggest professional achievement?", pt: "Qual sua maior conquista profissional?", tips: ["Escolha algo relevante para a vaga.", "Use números.", "Mostre seu papel específico."], model: "My biggest achievement was leading our company's rebranding. I coordinated three departments and two external agencies over eight months. I created the timeline, managed the budget and presented progress to the board every month. After the launch, our brand awareness grew by twenty-five percent and inbound leads increased by thirty percent." },
  { q: "Do you have any questions for us?", pt: "Você tem alguma pergunta para nós?", tips: ["SEMPRE tenha 2 ou 3 perguntas.", "Pergunte sobre sucesso, time e desafios.", "Deixe salário e férias para depois da oferta."], model: "Yes, I do, thank you. What does success look like in this role in the first ninety days? And what are the biggest challenges the team is facing right now? Finally, what are the next steps in the process?" }
];

/* -------- Erros clássicos de brasileiros -------- */
const MISTAKES = [
  { wrong: "I have 30 years.", right: "I'm 30 (years old).", why: "Idade em inglês usa o verbo BE, não HAVE." },
  { wrong: "I am agree with you.", right: "I agree with you.", why: "Agree já é verbo. Não precisa de “am”." },
  { wrong: "I work here since 2019.", right: "I've worked here since 2019.", why: "Começou no passado e continua → present perfect." },
  { wrong: "People is very friendly.", right: "People are very friendly.", why: "People é plural." },
  { wrong: "It depends of the client.", right: "It depends on the client.", why: "Depend ON." },
  { wrong: "Can I make a question?", right: "Can I ask a question?", why: "Em inglês se “pergunta” (ask) uma pergunta." },
  { wrong: "Explain me the process.", right: "Explain the process to me.", why: "Explain não aceita objeto direto de pessoa logo depois." },
  { wrong: "He said me that…", right: "He told me that… / He said that…", why: "Tell + pessoa; say sem pessoa (ou say TO someone)." },
  { wrong: "Actually, I work at a bank.", right: "Currently, I work at a bank.", why: "Actually = na verdade. Atualmente = currently / nowadays." },
  { wrong: "I pretend to study abroad.", right: "I intend / plan to study abroad.", why: "Pretend = fingir (falso cognato)." },
  { wrong: "Eventually I travel for work.", right: "Occasionally I travel for work.", why: "Eventually = no fim das contas. Eventualmente = occasionally / sometimes." },
  { wrong: "My parents came to my party. (= parentes)", right: "My relatives came to my party.", why: "Parents = pai e mãe. Parentes = relatives." },
  { wrong: "I need some informations.", right: "I need some information.", why: "Information, advice, feedback, equipment e knowledge são incontáveis: sem -s." },
  { wrong: "We discussed about the budget.", right: "We discussed the budget.", why: "Discuss não leva “about”." },
  { wrong: "I'm going to the home.", right: "I'm going home.", why: "Home sem artigo e sem “to” depois de go/come/get." },
  { wrong: "I didn't went to the meeting.", right: "I didn't go to the meeting.", why: "Depois de did/didn't, verbo na forma base." },
  { wrong: "I studied for two years ago.", right: "I studied two years ago. / I studied for two years.", why: "Ago = atrás (tempo passado). For = duração." },
  { wrong: "I'm living here for two years.", right: "I've been living here for two years.", why: "Duração até agora → present perfect continuous." },
  { wrong: "On the weekend I stayed in home.", right: "On the weekend I stayed home.", why: "Stay home (AmE) / stay at home." },
  { wrong: "Is possible to send me the file?", right: "Could you send me the file?", why: "Inglês exige sujeito (It is…) e pedidos soam melhor com Could you…?" },
  { wrong: "I assisted the game on TV.", right: "I watched the game on TV.", why: "Assist = ajudar. Assistir = watch." },
  { wrong: "Lend me your pen? I'll borrow it back later.", right: "Can I borrow your pen? / Can you lend me your pen?", why: "Borrow = pegar emprestado. Lend = emprestar para alguém." },
  { wrong: "Our company has a big library of products.", right: "Our company has a large portfolio of products.", why: "Library = biblioteca. Livraria = bookstore. Para produtos: portfolio / range." },
  { wrong: "The meeting was very funny.", right: "The meeting was a lot of fun. / The meeting was very productive.", why: "Funny = engraçado (que faz rir). Fun = divertido." },
  { wrong: "I have a doubt about the report.", right: "I have a question about the report.", why: "Doubt = dúvida de desconfiança. Para perguntar, use question." },
  { wrong: "Facebook-i, Linkedin-i, Whatsapp-i", right: "Facebook, LinkedIn, WhatsApp (terminando seco na consoante)", why: "Brasileiros acrescentam “i” no fim das palavras. Termine na consoante: “book”, “-din”, “-app”." }
];

/* -------- Pronúncia -------- */
const PRONUNCIATION = [
  {
    title: "O som do TH",
    text: "Não existe em português. Coloque a ponta da língua entre os dentes e sopre. Pode ser surdo (/θ/ think) ou vozeado (/ð/ this). Não troque por F, T, S ou D.",
    pairs: [["think", "sink"], ["three", "tree"], ["thank", "tank"], ["they", "day"], ["though", "dough"], ["with", "wit"]],
    sentences: ["I think the three of them thought about it.", "Thank you for the thorough report.", "They thought this was the third option."]
  },
  {
    title: "Final -ED: /t/, /d/ ou /ɪd/",
    text: "O -ED quase nunca é uma sílaba extra! Só vira /ɪd/ depois de T ou D (wanted, needed). Depois de sons surdos (p, k, s, sh, ch, f) soa /t/: worked = “workt”. Nos demais, /d/: called = “calld”.",
    pairs: [["worked", "wanted"], ["helped", "needed"], ["called", "started"], ["finished", "decided"], ["increased", "created"], ["launched", "reported"]],
    sentences: ["I worked on it and finished it yesterday.", "We increased sales and reduced costs.", "She started the project and decided to hire two people."]
  },
  {
    title: "Vogais curtas × longas",
    text: "Em inglês, vogal curta e longa mudam o sentido. O /ɪ/ curto (ship) é mais relaxado e rápido que o /iː/ longo (sheep). Brasileiros costumam falar tudo como “i” longo.",
    pairs: [["ship", "sheep"], ["live", "leave"], ["sit", "seat"], ["fill", "feel"], ["full", "fool"], ["bit", "beat"]],
    sentences: ["Please leave the room if you don't live here.", "Can you fill the form? I feel it's too long.", "Sit in this seat, please."]
  },
  {
    title: "Sem o “i” no final",
    text: "Palavras que terminam em consoante devem terminar seco. “Big” não é “bigui”, “job” não é “jobi”, “Google” não é “Googou”. Segure a consoante e pare.",
    pairs: [["big", "bigger"], ["job", "jobs"], ["work", "worker"], ["stop", "stopped"], ["back", "background"], ["chat", "chatted"]],
    sentences: ["I got a big job at Google.", "Check the Facebook and LinkedIn ads.", "Stop by my desk at six."]
  },
  {
    title: "Word stress (sílaba tônica)",
    text: "Errar a sílaba tônica atrapalha mais a compreensão do que errar um som. Atenção a estas palavras de trabalho que brasileiros costumam acentuar errado.",
    pairs: [["deVELop", "COMpany"], ["eCONomy", "ecoNOMic"], ["PHOtograph", "phoTOGraphy"], ["ANalyze", "aNALysis"], ["MARketing", "MANagement"], ["CONtent (noun)", "conTENT (adj.)"]],
    sentences: ["We need to develop a new strategy for the company.", "The analysis shows the economy is growing.", "Management approved the marketing plan."]
  },
  {
    title: "Fala conectada (como nativos realmente falam)",
    text: "Nativos juntam palavras. Você não precisa falar assim, mas PRECISA entender. going to → “gonna”, want to → “wanna”, got to → “gotta”, what do you → “whaddaya”, did you → “didja”, let me → “lemme”.",
    pairs: [["going to", "gonna"], ["want to", "wanna"], ["got to", "gotta"], ["let me", "lemme"], ["did you", "didja"], ["kind of", "kinda"]],
    sentences: ["What are you going to do about it?", "Did you get a chance to look at it?", "I want to let you know that I've got to leave early."]
  }
];

/* -------- Shadowing / ditado -------- */
const SENTENCES = [
  // easy
  { lvl: 1, en: "Nice to meet you. I've heard a lot about you.", pt: "Prazer em conhecê-lo. Ouvi falar muito de você." },
  { lvl: 1, en: "I work in marketing and I love what I do.", pt: "Trabalho com marketing e amo o que faço." },
  { lvl: 1, en: "Could you say that again, please?", pt: "Você poderia repetir, por favor?" },
  { lvl: 1, en: "Let me check and get back to you.", pt: "Deixa eu verificar e te retorno." },
  { lvl: 1, en: "Sorry, I'm running a few minutes late.", pt: "Desculpe, estou alguns minutos atrasado." },
  { lvl: 1, en: "How was your weekend?", pt: "Como foi seu fim de semana?" },
  { lvl: 1, en: "I think you're on mute.", pt: "Acho que você está no mudo." },
  { lvl: 1, en: "Thanks for your help today.", pt: "Obrigado pela ajuda hoje." },
  { lvl: 1, en: "What time works best for you?", pt: "Que horário funciona melhor para você?" },
  { lvl: 1, en: "I'll send you the file right away.", pt: "Te mando o arquivo agora mesmo." },
  { lvl: 1, en: "Can we talk about this tomorrow?", pt: "Podemos falar disso amanhã?" },
  { lvl: 1, en: "That sounds like a great idea.", pt: "Parece uma ótima ideia." },
  // medium
  { lvl: 2, en: "I've been working in this field for about six years.", pt: "Trabalho nessa área há cerca de seis anos." },
  { lvl: 2, en: "Just to make sure I understand, you need it by Friday?", pt: "Só para confirmar, você precisa disso até sexta?" },
  { lvl: 2, en: "I see your point, but I see it a bit differently.", pt: "Entendo seu ponto, mas vejo um pouco diferente." },
  { lvl: 2, en: "We need to figure out what went wrong with the launch.", pt: "Precisamos descobrir o que deu errado no lançamento." },
  { lvl: 2, en: "I'm responsible for managing the budget and the team.", pt: "Sou responsável por gerenciar o orçamento e o time." },
  { lvl: 2, en: "Would it be possible to push the deadline to next week?", pt: "Seria possível adiar o prazo para a próxima semana?" },
  { lvl: 2, en: "I'll look into it and let you know by the end of the day.", pt: "Vou verificar e te aviso até o fim do dia." },
  { lvl: 2, en: "Our sales increased by twenty percent last quarter.", pt: "Nossas vendas aumentaram 20% no último trimestre." },
  { lvl: 2, en: "I'm currently working on a project with the sales team.", pt: "Atualmente trabalho num projeto com o time de vendas." },
  { lvl: 2, en: "What does success look like in this role?", pt: "Como é o sucesso nessa função?" },
  { lvl: 2, en: "Let's set up a quick call to go over the details.", pt: "Vamos marcar uma call rápida para revisar os detalhes." },
  { lvl: 2, en: "If we don't act now, we're going to lose the client.", pt: "Se não agirmos agora, vamos perder o cliente." },
  // hard
  { lvl: 3, en: "That's a great question. Let me think about that for a second.", pt: "Ótima pergunta. Deixa eu pensar um segundo." },
  { lvl: 3, en: "Based on my experience, I'm looking for something in the range of eighty thousand.", pt: "Com base na minha experiência, busco algo na faixa de 80 mil." },
  { lvl: 3, en: "As a result, we exceeded our target by twelve percent and cut costs in half.", pt: "Como resultado, superamos a meta em 12% e cortamos custos pela metade." },
  { lvl: 3, en: "If I were in your position, I would probably wait until the end of the quarter.", pt: "Se eu estivesse na sua posição, provavelmente esperaria o fim do trimestre." },
  { lvl: 3, en: "I really enjoyed our conversation and I'm excited about the next steps.", pt: "Gostei muito da conversa e estou animado com os próximos passos." },
  { lvl: 3, en: "One area I'm working on is delegating more and trusting the team.", pt: "Uma área que estou desenvolvendo é delegar mais e confiar no time." },
  { lvl: 3, en: "We came up with a backup plan just in case the supplier didn't deliver.", pt: "Criamos um plano B caso o fornecedor não entregasse." },
  { lvl: 3, en: "Throughout my career, I've worked closely with people from different cultures.", pt: "Ao longo da carreira, trabalhei com pessoas de culturas diferentes." },
  { lvl: 3, en: "I'm looking for an opportunity where I can have a real impact on the business.", pt: "Busco uma oportunidade em que eu possa ter impacto real no negócio." },
  { lvl: 3, en: "What would you say are the biggest challenges the team is facing right now?", pt: "Quais você diria que são os maiores desafios do time agora?" },
  { lvl: 3, en: "I was going to call you, but I got caught up in back-to-back meetings.", pt: "Eu ia te ligar, mas fiquei preso em reuniões seguidas." },
  { lvl: 3, en: "We should have tested it before rolling it out to all of our customers.", pt: "Deveríamos ter testado antes de lançar para todos os clientes." }
];

/* -------- Decks de flashcards extras -------- */
const PHRASAL_VERBS = [
  ["set up", "We need to set up a meeting with the client.", "marcar / configurar / montar"],
  ["follow up (on)", "I'm following up on the proposal I sent last week.", "dar seguimento"],
  ["figure out", "I can't figure out why the numbers don't match.", "descobrir / entender / resolver"],
  ["look into", "I'll look into the issue this afternoon.", "investigar / verificar"],
  ["put off", "Let's not put off this decision any longer.", "adiar"],
  ["come up with", "She came up with a creative solution.", "ter (ideia) / criar"],
  ["run out of", "We're running out of time.", "ficar sem"],
  ["catch up", "Let's catch up over coffee next week.", "colocar o papo em dia / se atualizar"],
  ["bring up", "I'd like to bring up a quick point.", "mencionar / trazer à tona"],
  ["carry out", "We carried out a survey with 500 customers.", "realizar / executar"],
  ["point out", "He pointed out a mistake in the report.", "apontar / destacar"],
  ["go over", "Let's go over the numbers one more time.", "revisar"],
  ["back up", "Do you have data to back up that claim?", "sustentar / apoiar / fazer backup"],
  ["take on", "I'm ready to take on more responsibility.", "assumir"],
  ["turn down", "They turned down our proposal.", "recusar"],
  ["deal with", "I deal with difficult clients every day.", "lidar com"],
  ["fill in (for)", "Can you fill in for me at the meeting?", "substituir"],
  ["get back to", "I'll get back to you by Monday.", "retornar (contato)"],
  ["reach out (to)", "Feel free to reach out if you need anything.", "entrar em contato"],
  ["sort out", "We need to sort out the contract issues.", "resolver / organizar"],
  ["roll out", "We'll roll out the new system in June.", "implementar / lançar gradualmente"],
  ["wrap up", "Let's wrap up the meeting here.", "encerrar / finalizar"],
  ["step down", "The CEO stepped down last month.", "renunciar / deixar o cargo"],
  ["lay off", "The company laid off 200 employees.", "demitir (corte)"],
  ["hand in", "Please hand in your report by Friday.", "entregar"],
  ["keep up with", "It's hard to keep up with all the emails.", "acompanhar o ritmo"],
  ["phase out", "We're phasing out the old product line.", "descontinuar aos poucos"],
  ["drop by", "Feel free to drop by my office anytime.", "dar uma passada"],
  ["move forward (with)", "Let's move forward with option B.", "seguir em frente com"],
  ["think over", "I need to think it over before I decide.", "pensar com calma"]
];

const BUSINESS_VOCAB = [
  ["deadline", "The deadline is next Friday.", "prazo final"],
  ["stakeholder", "We need to align with all the stakeholders.", "parte interessada"],
  ["outcome", "What was the outcome of the meeting?", "resultado / desfecho"],
  ["goal / target", "We hit our sales target this month.", "meta"],
  ["revenue", "Our revenue grew by 15%.", "receita / faturamento"],
  ["profit", "The company made a record profit.", "lucro"],
  ["budget", "We're over budget on this project.", "orçamento"],
  ["lead", "The campaign generated 500 new leads.", "potencial cliente / lead"],
  ["hiring manager", "The hiring manager will call you tomorrow.", "gestor da vaga"],
  ["résumé / resume", "Please send us your resume.", "currículo (EUA)"],
  ["job opening", "There's a job opening in the finance team.", "vaga de emprego"],
  ["to apply for", "I'm applying for a senior position.", "candidatar-se a"],
  ["skills", "What skills do you bring to the team?", "habilidades"],
  ["workload", "My workload has doubled this year.", "carga de trabalho"],
  ["to meet a deadline", "We worked overtime to meet the deadline.", "cumprir um prazo"],
  ["to be on track", "The project is on track.", "estar dentro do planejado"],
  ["bottleneck", "Approval is our biggest bottleneck.", "gargalo"],
  ["insight", "The survey gave us great insights.", "percepção / descoberta valiosa"],
  ["to leverage", "We can leverage our existing customer base.", "aproveitar / alavancar"],
  ["accountable", "Who is accountable for the results?", "responsável (que responde por)"],
  ["ownership", "I like to take ownership of my projects.", "senso de dono / responsabilidade"],
  ["feedback", "Thanks for the feedback. It's really helpful.", "retorno / feedback (incontável)"],
  ["to touch base", "Let's touch base on Monday.", "se falar rapidamente / alinhar"],
  ["heads-up", "Just a heads-up: the meeting moved to 3 p.m.", "aviso prévio"],
  ["follow-up", "I'll send a follow-up email.", "acompanhamento / retorno"],
  ["agenda", "What's on the agenda today?", "pauta (de reunião)"],
  ["quarter (Q1, Q2…)", "Sales were strong in the last quarter.", "trimestre"],
  ["benefits", "The benefits include health insurance.", "benefícios"],
  ["salary range", "What's the salary range for this role?", "faixa salarial"],
  ["remote / hybrid", "It's a hybrid role, three days in the office.", "remoto / híbrido"]
];

/* -------- Escrita: temas diários -------- */
const WRITING_PROMPTS = [
  "Describe your current job and a typical workday.",
  "Write about a professional achievement you're proud of. Use numbers.",
  "Write a short email asking your manager for a day off next week.",
  "What would you do if you were the CEO of your company for one day?",
  "Describe a problem you solved at work using the STAR method.",
  "Write a follow-up email after a job interview.",
  "What are your career goals for the next three years?",
  "Describe your ideal job and the company you would like to work for.",
  "Write about a mistake you made and what you learned from it.",
  "Explain a process you know well (step by step) to a new colleague.",
  "Give your opinion: is remote work better than working in an office?",
  "Write a LinkedIn 'About' section for yourself in English.",
  "Describe a difficult conversation you had at work and how you handled it.",
  "Write an email to a client explaining that a delivery will be delayed.",
  "Tell the story of how you chose your profession."
];

/* -------- Rotina diária -------- */
const DAILY_TASKS = [
  { id: "cards", label: "Revisar flashcards", min: 15, link: "#flashcards", desc: "Repetição espaçada: o algoritmo decide o que você precisa rever." },
  { id: "lesson", label: "Aula da semana", min: 15, link: "lesson", desc: "Gramática aplicada, frases-chave e exercícios." },
  { id: "shadow", label: "Shadowing / pronúncia", min: 10, link: "#shadowing", desc: "Ouça, repita junto, grave e compare." },
  { id: "dictation", label: "Ditado ou listening", min: 5, link: "#listening", desc: "Treine o ouvido: um diálogo de trabalho ou 5 frases de ditado." },
  { id: "speak", label: "Falar: simulador ou tarefa da aula", min: 10, link: "#entrevista", desc: "Pelo menos 3 minutos falando em voz alta." },
  { id: "immersion", label: "Imersão (fora do app)", min: 20, link: "#metodo", desc: "Podcast, série ou YouTube em inglês. Marque quando fizer." },
  { id: "writing", label: "Escrita curta", min: 5, link: "#escrita", desc: "5 a 8 frases sobre o tema do dia." }
];

/* ---------------- LISTENING: diálogos de trabalho ----------------
   a = voz 1 (feminina), b = voz 2. Você faz o papel de "b" no role-play. */
const DIALOGUES = [
  {
    id: 1, lvl: 1, title: "Recruiter screening call", titlePt: "Ligação de triagem com a recrutadora",
    context: "Uma recrutadora americana liga para um candidato brasileiro depois de ver o currículo dele.",
    speakers: { a: "Sarah · recrutadora", b: "Lucas · candidato" },
    lines: [
      ["a", "Hi, is this Lucas? This is Sarah from BrightPath Recruiting. Is now still a good time to talk?", "Oi, é o Lucas? Aqui é a Sarah, da BrightPath Recruiting. Ainda é um bom momento para conversarmos?"],
      ["b", "Hi Sarah, yes, perfect timing. Thanks for calling.", "Oi Sarah, sim, momento perfeito. Obrigado por ligar."],
      ["a", "Great. So, I saw your application for the marketing analyst position. Can you tell me a little about your current role?", "Ótimo. Então, vi sua candidatura para a vaga de analista de marketing. Pode me contar um pouco sobre sua função atual?"],
      ["b", "Sure. I'm a marketing coordinator at a retail company. I manage our social media campaigns and I analyze the results every week.", "Claro. Sou coordenador de marketing em uma empresa de varejo. Gerencio nossas campanhas de redes sociais e analiso os resultados toda semana."],
      ["a", "Nice. And how long have you been there?", "Legal. E há quanto tempo você está lá?"],
      ["b", "I've been there for about four years.", "Estou lá há uns quatro anos."],
      ["a", "Okay. The role is fully remote, but the team is based in Chicago, so you'd work mostly on Central Time. Would that be a problem?", "Certo. A vaga é 100% remota, mas o time fica em Chicago, então você trabalharia principalmente no fuso Central. Isso seria um problema?"],
      ["b", "Not at all. The time difference is only two or three hours, so it works well for me.", "De jeito nenhum. A diferença de fuso é de só duas ou três horas, então funciona bem para mim."],
      ["a", "Perfect. The next step is a video interview with the hiring manager. Are you available next Tuesday afternoon?", "Perfeito. A próxima etapa é uma entrevista por vídeo com o gestor da vaga. Você está disponível na próxima terça à tarde?"],
      ["b", "Yes, Tuesday afternoon works. Could you send me the details by email?", "Sim, terça à tarde dá certo. Você poderia me mandar os detalhes por e-mail?"],
      ["a", "Of course. I'll send you an invite today. Talk soon!", "Claro. Vou te mandar um convite hoje. Até breve!"],
      ["b", "Thank you, Sarah. Have a great day.", "Obrigado, Sarah. Tenha um ótimo dia."]
    ],
    questions: [
      { q: "What is Lucas's current job?", options: ["Marketing analyst", "Marketing coordinator", "Recruiter", "Sales manager"], answer: 1, explain: "Ele diz: “I'm a marketing coordinator at a retail company.” Analista é a vaga que ele quer." },
      { q: "How long has he worked there?", options: ["About two years", "About three hours", "About four years", "Since Tuesday"], answer: 2, explain: "“I've been there for about four years.” Present perfect + for = tempo até hoje." },
      { q: "Where is the team based?", options: ["São Paulo", "Chicago", "New York", "Anywhere, it's remote"], answer: 1, explain: "“The team is based in Chicago.” Be based in = ficar sediado em." },
      { q: "What is the next step?", options: ["An English test", "A video interview with the hiring manager", "He starts working on Tuesday", "He sends his résumé again"], answer: 1, explain: "“The next step is a video interview with the hiring manager.”" }
    ]
  },
  {
    id: 2, lvl: 1, title: "Daily stand-up meeting", titlePt: "Reunião diária rápida do time",
    context: "Reunião de 10 minutos em que cada pessoa diz o que fez ontem, o que vai fazer hoje e o que está travando.",
    speakers: { a: "Emily · gestora", b: "Rafael · analista" },
    lines: [
      ["a", "Morning, everyone. Let's keep it quick. Rafael, do you want to start?", "Bom dia, pessoal. Vamos ser rápidos. Rafael, quer começar?"],
      ["b", "Sure. Yesterday I finished the dashboard for the sales team. Today I'm going to test it with real data.", "Claro. Ontem terminei o dashboard do time de vendas. Hoje vou testá-lo com dados reais."],
      ["a", "Great. Any blockers?", "Ótimo. Algum impedimento?"],
      ["b", "Yes, one. I still don't have access to the customer database. I asked IT on Monday, but they haven't answered yet.", "Sim, um. Ainda não tenho acesso ao banco de dados de clientes. Pedi para a TI na segunda, mas eles ainda não responderam."],
      ["a", "Okay, I'll follow up with them after this meeting. Anything else?", "Ok, vou cobrar eles depois desta reunião. Mais alguma coisa?"],
      ["b", "No, that's it. Oh, actually, I'll be out on Friday afternoon. I have a doctor's appointment.", "Não, é isso. Ah, na verdade, vou estar fora na sexta à tarde. Tenho consulta médica."],
      ["a", "No problem. Just add it to the team calendar, please.", "Sem problema. Só coloque no calendário do time, por favor."],
      ["b", "Will do. Thanks, Emily.", "Pode deixar. Obrigado, Emily."]
    ],
    questions: [
      { q: "What did Rafael finish yesterday?", options: ["A sales report", "The dashboard for the sales team", "The customer database", "The team calendar"], answer: 1, explain: "“Yesterday I finished the dashboard for the sales team.”" },
      { q: "What is his blocker?", options: ["He is sick", "He doesn't have access to the customer database", "The dashboard has errors", "IT deleted his data"], answer: 1, explain: "Blocker = o que impede o trabalho. “I still don't have access to the customer database.”" },
      { q: "What will Emily do?", options: ["Follow up with IT", "Test the dashboard", "Cancel Friday's meeting", "Call the doctor"], answer: 0, explain: "“I'll follow up with them.” Follow up = cobrar, dar seguimento." },
      { q: "Why will Rafael be out on Friday?", options: ["He's on vacation", "He has a doctor's appointment", "He has a training", "He has a client meeting"], answer: 1, explain: "Appointment = consulta/horário marcado." }
    ]
  },
  {
    id: 3, lvl: 1, title: "Video call: tech issues and small talk", titlePt: "Chamada de vídeo: problemas técnicos e conversa inicial",
    context: "O começo de uma call com uma cliente dos EUA: problemas de conexão e aquela conversa rápida antes de começar.",
    speakers: { a: "Nicole · cliente", b: "Carlos · consultor" },
    lines: [
      ["a", "Hi Carlos! Can you hear me okay?", "Oi Carlos! Está me ouvindo bem?"],
      ["b", "Hi Nicole! Yes, I can hear you, but your video is frozen.", "Oi Nicole! Sim, estou te ouvindo, mas seu vídeo está travado."],
      ["a", "Oh, sorry. My connection is a bit unstable today. Let me turn off my camera for a second.", "Ah, desculpa. Minha conexão está meio instável hoje. Deixa eu desligar a câmera um instante."],
      ["b", "No worries. Now your audio is much better.", "Sem problema. Agora seu áudio está bem melhor."],
      ["a", "Great. So, how's the weather down there in Brazil?", "Ótimo. E aí, como está o tempo aí no Brasil?"],
      ["b", "It's really hot! It's summer here, about thirty-five degrees. How about Boston?", "Está muito quente! Aqui é verão, uns trinta e cinco graus. E em Boston?"],
      ["a", "Freezing! We had snow all weekend. I'm so jealous.", "Congelando! Nevou o fim de semana inteiro. Que inveja."],
      ["b", "You should come visit! Okay, should we get started? I'll share my screen.", "Você devia vir visitar! Bom, vamos começar? Vou compartilhar minha tela."],
      ["a", "Sounds good. I can see your screen now.", "Combinado. Já estou vendo sua tela."],
      ["b", "Perfect. So, the first slide shows our results from last month.", "Perfeito. Então, o primeiro slide mostra nossos resultados do mês passado."]
    ],
    questions: [
      { q: "What's wrong with Nicole's video?", options: ["It's frozen", "There's no sound", "It's too dark", "It's the wrong person"], answer: 0, explain: "“Your video is frozen.” Frozen = travado/congelado." },
      { q: "What does Nicole do to fix the problem?", options: ["She turns off her camera", "She restarts her computer", "She calls him on the phone", "She leaves the call"], answer: 0, explain: "“Let me turn off my camera for a second.” Turn off = desligar." },
      { q: "What's the weather like in Boston?", options: ["Hot", "Rainy", "Snowy and freezing", "Sunny"], answer: 2, explain: "“Freezing! We had snow all weekend.”" },
      { q: "How does Carlos start the meeting?", options: ["He shares his screen", "He sends an email", "He turns on his camera", "He ends the call"], answer: 0, explain: "“I'll share my screen.” Muito usado em reuniões online." }
    ]
  },
  {
    id: 4, lvl: 1, title: "First day at a new job", titlePt: "Primeiro dia no emprego novo",
    context: "A colega responsável pela integração recebe o novo funcionário e explica como vai ser o dia.",
    speakers: { a: "Jessica · colega de integração", b: "Gabriel · novo funcionário" },
    lines: [
      ["a", "Welcome to the team, Gabriel! I'm Jessica, your onboarding buddy. How was the commute?", "Bem-vindo ao time, Gabriel! Sou a Jessica, sua parceira de integração. Como foi o trajeto?"],
      ["b", "Thanks, Jessica! It was fine, only twenty minutes by train.", "Obrigado, Jessica! Foi tranquilo, só vinte minutos de trem."],
      ["a", "Good. So, this morning you'll set up your laptop and your accounts. IT will meet you at eleven.", "Que bom. Então, hoje de manhã você vai configurar seu notebook e suas contas. A TI vai te encontrar às onze."],
      ["b", "Okay. And who should I talk to if I have questions about my tasks?", "Certo. E com quem eu falo se tiver dúvidas sobre minhas tarefas?"],
      ["a", "Your manager, David, but he's traveling until Wednesday. In the meantime, you can always ask me.", "Com seu gestor, o David, mas ele está viajando até quarta. Enquanto isso, pode sempre perguntar para mim."],
      ["b", "That's great, thank you. Is there a team lunch today?", "Ótimo, obrigado. Tem almoço com o time hoje?"],
      ["a", "Yes, we're going out at twelve thirty to welcome you. It's on the company.", "Sim, vamos sair ao meio-dia e meia para te dar as boas-vindas. A empresa paga."],
      ["b", "Oh, that's so nice! Do I need to bring anything to the meeting this afternoon?", "Ah, que legal! Preciso levar alguma coisa para a reunião da tarde?"],
      ["a", "Just your laptop and a notebook. It's an intro to our main clients and tools.", "Só o notebook e um caderno. É uma introdução aos nossos principais clientes e ferramentas."],
      ["b", "Perfect. I'm really excited to get started.", "Perfeito. Estou muito animado para começar."]
    ],
    questions: [
      { q: "How did Gabriel get to work?", options: ["By car", "By bus", "By train", "On foot"], answer: 2, explain: "“Only twenty minutes by train.” Commute = trajeto casa-trabalho." },
      { q: "When will IT meet him?", options: ["At eleven", "At twelve thirty", "In twenty minutes", "On Wednesday"], answer: 0, explain: "“IT will meet you at eleven.”" },
      { q: "Why can't he ask his manager today?", options: ["He's sick", "He's traveling", "He's in a meeting", "He left the company"], answer: 1, explain: "“He's traveling until Wednesday.”" },
      { q: "What does “It's on the company” mean?", options: ["The company pays", "Lunch is at the office", "It's mandatory", "It's on the calendar"], answer: 0, explain: "“It's on me / on the company” = eu pago / a empresa paga." }
    ]
  },
  {
    id: 5, lvl: 2, title: "Rescheduling a client call", titlePt: "Remarcando uma call com cliente",
    context: "Uma cliente liga para mudar o horário da reunião e pede material extra.",
    speakers: { a: "Megan · cliente", b: "Bruno · gerente de contas" },
    lines: [
      ["a", "Hi Bruno, it's Megan from Northwind. I'm calling about our call on Thursday.", "Oi Bruno, é a Megan, da Northwind. Estou ligando sobre nossa call de quinta."],
      ["b", "Hi Megan. Is everything okay?", "Oi Megan. Está tudo bem?"],
      ["a", "Yes, but something came up, and I won't be able to make it at ten. Could we push it back to the afternoon?", "Sim, mas surgiu um imprevisto e não vou conseguir às dez. Podemos passar para a tarde?"],
      ["b", "Let me check my calendar. I'm tied up until two, but I'm free from two thirty on.", "Deixa eu ver minha agenda. Estou ocupado até as duas, mas fico livre a partir das duas e meia."],
      ["a", "Two thirty works for me. Can we also make it forty-five minutes instead of thirty? I'd like my finance director to join us.", "Duas e meia funciona para mim. Podemos também fazer em quarenta e cinco minutos em vez de trinta? Quero que minha diretora financeira participe."],
      ["b", "Sure, that makes sense. Should I prepare anything specific for her?", "Claro, faz sentido. Devo preparar algo específico para ela?"],
      ["a", "It would be great if you could bring the updated pricing and the timeline for phase two.", "Seria ótimo se você pudesse trazer os preços atualizados e o cronograma da fase dois."],
      ["b", "No problem. I'll send you a new invite and share the deck by Wednesday, so you have time to review it.", "Sem problema. Vou te mandar um novo convite e compartilhar a apresentação até quarta, para você ter tempo de revisar."],
      ["a", "Perfect. Thanks for being so flexible.", "Perfeito. Obrigada por ser tão flexível."],
      ["b", "Anytime. Talk to you on Thursday.", "Imagina. Nos falamos na quinta."]
    ],
    questions: [
      { q: "Why is Megan calling?", options: ["To cancel the project", "To change the time of the call", "To ask for a discount", "To complain about the deck"], answer: 1, explain: "“Could we push it back to the afternoon?” Push back = adiar." },
      { q: "What time will the new call start?", options: ["10:00", "2:00", "2:30", "4:30"], answer: 2, explain: "“Two thirty works for me.”" },
      { q: "What does “I'm tied up until two” mean?", options: ["I'm busy until two", "I'm free until two", "I'm late until two", "I'm tired until two"], answer: 0, explain: "Be tied up = estar ocupado, enrolado com outra coisa." },
      { q: "When will Bruno share the deck?", options: ["Today", "By Wednesday", "On Thursday", "After the call"], answer: 1, explain: "“I'll share the deck by Wednesday.” By = até (prazo)." }
    ]
  },
  {
    id: 6, lvl: 2, title: "Feedback from your manager", titlePt: "Feedback da gestora",
    context: "A gestora dá um feedback sobre a apresentação de ontem: um elogio e um ponto de melhoria.",
    speakers: { a: "Rachel · gestora", b: "Pedro · analista" },
    lines: [
      ["a", "Pedro, do you have a minute? I wanted to give you some feedback on yesterday's presentation.", "Pedro, tem um minuto? Queria te dar um feedback sobre a apresentação de ontem."],
      ["b", "Sure, of course.", "Claro, com certeza."],
      ["a", "First of all, the content was excellent. The data was clear and the client loved the recommendations.", "Antes de tudo, o conteúdo estava excelente. Os dados estavam claros e o cliente adorou as recomendações."],
      ["b", "Thank you, that's great to hear.", "Obrigado, que bom ouvir isso."],
      ["a", "One thing I'd like you to work on is timing. You had twenty minutes, and you went over by almost ten.", "Um ponto que eu gostaria que você trabalhasse é o tempo. Você tinha vinte minutos e passou quase dez."],
      ["b", "Yeah, I noticed that too. I think I spent too long on the first section.", "É, eu também percebi. Acho que demorei demais na primeira parte."],
      ["a", "Exactly. Next time, try to rehearse with a timer, and keep the details in the appendix in case they ask.", "Exatamente. Na próxima, tente ensaiar com um cronômetro e deixe os detalhes no apêndice, caso perguntem."],
      ["b", "That's a good idea. Would you be willing to watch a dry run before the next one?", "Boa ideia. Você toparia assistir a um ensaio antes da próxima?"],
      ["a", "Absolutely. Just put thirty minutes on my calendar the day before.", "Com certeza. É só marcar trinta minutos na minha agenda no dia anterior."],
      ["b", "I will. Thanks for the feedback, Rachel.", "Pode deixar. Obrigado pelo feedback, Rachel."]
    ],
    questions: [
      { q: "What did Rachel like about the presentation?", options: ["The timing", "The content and the recommendations", "The slide design", "The jokes"], answer: 1, explain: "“The content was excellent… the client loved the recommendations.”" },
      { q: "What does Pedro need to work on?", options: ["He went over time", "His data was wrong", "He arrived late", "He spoke too fast"], answer: 0, explain: "“You went over by almost ten.” Go over = ultrapassar (o tempo)." },
      { q: "How long was the presentation supposed to be?", options: ["Ten minutes", "Twenty minutes", "Thirty minutes", "Forty-five minutes"], answer: 1, explain: "“You had twenty minutes.”" },
      { q: "What is a “dry run”?", options: ["A practice run, a rehearsal", "A short meeting", "A coffee break", "A written report"], answer: 0, explain: "Dry run = ensaio, teste antes da apresentação real." }
    ]
  },
  {
    id: 7, lvl: 3, title: "Project delay: options for the client", titlePt: "Atraso no projeto: opções para a cliente",
    context: "O gerente de projeto explica um atraso e negocia alternativas com a cliente.",
    speakers: { a: "Karen · cliente", b: "Thiago · gerente de projeto" },
    lines: [
      ["a", "Thiago, I just saw the status report. Are we really two weeks behind?", "Thiago, acabei de ver o relatório de status. Estamos mesmo duas semanas atrasados?"],
      ["b", "I'm afraid so, Karen. The supplier delivered the components late, and that affected the whole testing phase.", "Infelizmente sim, Karen. O fornecedor entregou os componentes atrasados, e isso afetou toda a fase de testes."],
      ["a", "That's a problem. We promised the launch to our board for March first.", "Isso é um problema. Prometemos o lançamento para a diretoria em primeiro de março."],
      ["b", "I understand. That's why I wanted to talk about options. We can keep the date if we reduce the scope of the first release.", "Entendo. Por isso queria falar sobre opções. Podemos manter a data se reduzirmos o escopo da primeira versão."],
      ["a", "What would we lose?", "O que perderíamos?"],
      ["b", "The reporting module would come in a second release, about three weeks later. Everything else would be ready on time.", "O módulo de relatórios viria numa segunda versão, umas três semanas depois. Todo o resto ficaria pronto no prazo."],
      ["a", "Hmm. And what about the extra cost?", "Hmm. E o custo extra?"],
      ["b", "There's no extra cost for that option. If you need everything on March first, we'd have to add two developers, and that would increase the budget by about fifteen percent.", "Não há custo extra nessa opção. Se vocês precisarem de tudo em primeiro de março, teríamos que colocar mais dois desenvolvedores, e isso aumentaria o orçamento em uns quinze por cento."],
      ["a", "Okay. Let me run this by my team, and I'll get back to you by Friday.", "Certo. Deixa eu levar isso para o meu time e te dou um retorno até sexta."],
      ["b", "Sounds good. I'll send you a summary of both options in writing today.", "Combinado. Vou te mandar hoje um resumo das duas opções por escrito."]
    ],
    questions: [
      { q: "Why is the project late?", options: ["Two developers quit", "The supplier delivered late", "The client changed the scope", "The budget was cut"], answer: 1, explain: "“The supplier delivered the components late.”" },
      { q: "What is the first option?", options: ["Cancel the launch", "Launch on time without the reporting module", "Launch three weeks later with everything", "Hire a new supplier"], answer: 1, explain: "Reduzir o escopo: o módulo de relatórios fica para uma segunda versão." },
      { q: "How much would it cost to add two developers?", options: ["Nothing", "About 15% more", "Double the budget", "About 50% more"], answer: 1, explain: "“Increase the budget by about fifteen percent.”" },
      { q: "What does “Let me run this by my team” mean?", options: ["I'll discuss it with my team first", "I'll run a race with my team", "My team will do the work", "I'll replace my team"], answer: 0, explain: "Run something by someone = consultar alguém antes de decidir." }
    ]
  },
  {
    id: 8, lvl: 3, title: "Final interview: your questions and salary", titlePt: "Entrevista final: suas perguntas e salário",
    context: "Fim de uma entrevista com a gestora da vaga: perguntas do candidato, pretensão salarial e próximos passos.",
    speakers: { a: "Laura · gestora da vaga", b: "Felipe · candidato" },
    lines: [
      ["a", "So, Felipe, we're almost out of time. Do you have any questions for me?", "Então, Felipe, estamos quase sem tempo. Você tem alguma pergunta para mim?"],
      ["b", "Yes, a couple. What would success look like in this role after the first six months?", "Sim, algumas. Como seria o sucesso nesta função depois dos primeiros seis meses?"],
      ["a", "Good question. Mainly, we'd expect you to own the onboarding process for new clients and reduce churn in the first ninety days.", "Boa pergunta. Principalmente, esperaríamos que você fosse dono do processo de integração de novos clientes e reduzisse o cancelamento nos primeiros noventa dias."],
      ["b", "That's very aligned with what I do in my current job. We cut early churn by almost twenty percent last year.", "Isso tem tudo a ver com o que faço no meu trabalho atual. Reduzimos o cancelamento inicial em quase vinte por cento no ano passado."],
      ["a", "That's impressive. And just to be transparent, what are your salary expectations?", "Impressionante. E só para sermos transparentes, qual é sua pretensão salarial?"],
      ["b", "Based on my research and my experience, I'm looking for something in the range of eighty-five to ninety-five thousand a year. But I'm open to discussing the full package.", "Com base na minha pesquisa e na minha experiência, busco algo na faixa de oitenta e cinco a noventa e cinco mil por ano. Mas estou aberto a discutir o pacote completo."],
      ["a", "That's within our range. We also offer a bonus and a learning budget.", "Está dentro da nossa faixa. Também oferecemos bônus e um orçamento para estudos."],
      ["b", "That sounds great. What are the next steps in the process?", "Parece ótimo. Quais são os próximos passos do processo?"],
      ["a", "We're wrapping up interviews this week, and we'll get back to all candidates by next Wednesday.", "Estamos finalizando as entrevistas esta semana e daremos retorno a todos os candidatos até a próxima quarta."],
      ["b", "Perfect. Thank you for your time, Laura. I really enjoyed our conversation.", "Perfeito. Obrigado pelo seu tempo, Laura. Gostei muito da nossa conversa."]
    ],
    questions: [
      { q: "What would success look like in the role?", options: ["Hiring a new team", "Owning client onboarding and reducing early churn", "Doubling sales in six months", "Managing the learning budget"], answer: 1, explain: "“Own the onboarding process for new clients and reduce churn in the first ninety days.”" },
      { q: "What did Felipe achieve last year?", options: ["He cut early churn by almost 20%", "He increased sales by 20%", "He hired twenty people", "He onboarded ninety clients"], answer: 0, explain: "“We cut early churn by almost twenty percent last year.”" },
      { q: "What salary range did Felipe ask for?", options: ["$58,000–$59,000", "$85,000–$95,000", "$80,000–$90,000", "$95,000–$105,000"], answer: 1, explain: "Eighty-five (85) to ninety-five (95) thousand. Cuidado com fifteen/fifty e nineteen/ninety." },
      { q: "When will Felipe hear back?", options: ["This week", "By next Wednesday", "In ninety days", "In six months"], answer: 1, explain: "“We'll get back to all candidates by next Wednesday.” Get back to = dar retorno." }
    ]
  }
];
