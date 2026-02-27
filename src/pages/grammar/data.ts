// src/grammar/data.ts
import type { GrammarTopic } from "./types";

export const categories = [
  "Todos",
  "Presente",
  "Pasado",
  "Futuro",
  "Modales",
  "Condicionales",
  "Voz Pasiva",
  "Discurso Indirecto",
  "Artículos",
  "Pronombres",
  "Preposiciones",
  "Comparativos",
  "Conectores",
  "Preguntas",
  "Estructura",
  "Phrasal Verbs",
  "Adjetivos",
] as const;

export const topics: GrammarTopic[] = [
  // TIEMPOS VERBALES - PRESENTE
  {
    id: 1,
    title: "Present Simple",
    category: "Presente",
    explanation:
      "El presente simple se usa para expresar acciones habituales, verdades generales y situaciones permanentes.",
    rules: [
      "Afirmativo: Sujeto + verbo (añadir -s/-es en tercera persona)",
      "Negativo: Sujeto + don't/doesn't + verbo base",
      "Pregunta: Do/Does + sujeto + verbo base?",
    ],
    examples: [
      { english: "I work every day", spanish: "Trabajo todos los días" },
      { english: "She works in a hospital", spanish: "Ella trabaja en un hospital" },
      { english: "They don't like pizza", spanish: "No les gusta la pizza" },
      { english: "Do you speak English?", spanish: "¿Hablas inglés?" },
    ],
  },
  {
    id: 2,
    title: "Present Continuous",
    category: "Presente",
    explanation:
      "El presente continuo se usa para acciones que están ocurriendo en el momento o acciones temporales.",
    rules: [
      "Estructura: Sujeto + am/is/are + verbo-ing",
      "Negativo: Sujeto + am/is/are + not + verbo-ing",
      "Pregunta: Am/Is/Are + sujeto + verbo-ing?",
    ],
    examples: [
      { english: "I am studying now", spanish: "Estoy estudiando ahora" },
      { english: "She is eating lunch", spanish: "Ella está almorzando" },
      { english: "They are not working today", spanish: "No están trabajando hoy" },
      { english: "Are you watching TV?", spanish: "¿Estás viendo TV?" },
    ],
  },
  {
    id: 3,
    title: "Present Perfect",
    category: "Presente",
    explanation:
      "El presente perfecto se usa para acciones que comenzaron en el pasado y continúan en el presente, o tienen relevancia actual.",
    rules: [
      "Estructura: Sujeto + have/has + past participle",
      "Negativo: Sujeto + haven't/hasn't + past participle",
      "Pregunta: Have/Has + sujeto + past participle?",
      "Palabras clave: just, already, yet, ever, never, for, since",
    ],
    examples: [
      { english: "I have lived here for 5 years", spanish: "He vivido aquí durante 5 años" },
      { english: "She has just finished", spanish: "Ella acaba de terminar" },
      { english: "Have you ever been to Paris?", spanish: "¿Alguna vez has estado en París?" },
      { english: "They haven't seen that movie yet", spanish: "Ellos no han visto esa película todavía" },
    ],
  },
  {
    id: 4,
    title: "Present Perfect Continuous",
    category: "Presente",
    explanation:
      "Se usa para enfatizar la duración de una acción que comenzó en el pasado y continúa o acaba de terminar.",
    rules: [
      "Estructura: Sujeto + have/has + been + verbo-ing",
      "Negativo: Sujeto + haven't/hasn't + been + verbo-ing",
      "Pregunta: Have/Has + sujeto + been + verbo-ing?",
      "Énfasis en la duración con 'for' y 'since'",
    ],
    examples: [
      { english: "I have been studying for 3 hours", spanish: "He estado estudiando durante 3 horas" },
      { english: "She has been working here since 2020", spanish: "Ella ha estado trabajando aquí desde 2020" },
      { english: "How long have you been waiting?", spanish: "¿Cuánto tiempo has estado esperando?" },
    ],
  },

  // TIEMPOS VERBALES - PASADO
  {
    id: 5,
    title: "Simple Past",
    category: "Pasado",
    explanation:
      "El pasado simple se usa para acciones completadas en un tiempo específico del pasado.",
    rules: [
      "Verbos regulares: verbo + -ed",
      "Verbos irregulares: forma específica (go→went, see→saw)",
      "Negativo: Sujeto + didn't + verbo base",
      "Pregunta: Did + sujeto + verbo base?",
    ],
    examples: [
      { english: "I visited London last year", spanish: "Visité Londres el año pasado" },
      { english: "She didn't go to the party", spanish: "Ella no fue a la fiesta" },
      { english: "Did you see that movie?", spanish: "¿Viste esa película?" },
      { english: "They played soccer yesterday", spanish: "Ellos jugaron fútbol ayer" },
    ],
  },
  {
    id: 6,
    title: "Past Continuous",
    category: "Pasado",
    explanation:
      "Se usa para acciones que estaban en progreso en un momento específico del pasado.",
    rules: [
      "Estructura: Sujeto + was/were + verbo-ing",
      "Negativo: Sujeto + wasn't/weren't + verbo-ing",
      "Pregunta: Was/Were + sujeto + verbo-ing?",
      "Usado con 'while' para acciones simultáneas",
    ],
    examples: [
      { english: "I was sleeping when you called", spanish: "Estaba durmiendo cuando llamaste" },
      { english: "They were watching TV at 8 PM", spanish: "Estaban viendo TV a las 8 PM" },
      { english: "While she was cooking, I was cleaning", spanish: "Mientras ella cocinaba, yo limpiaba" },
    ],
  },
  {
    id: 7,
    title: "Past Perfect",
    category: "Pasado",
    explanation: "Se usa para una acción que ocurrió antes de otra acción en el pasado.",
    rules: [
      "Estructura: Sujeto + had + past participle",
      "Negativo: Sujeto + hadn't + past participle",
      "Pregunta: Had + sujeto + past participle?",
      "Indica qué acción fue primero",
    ],
    examples: [
      { english: "She had left when I arrived", spanish: "Ella se había ido cuando llegué" },
      { english: "I had never seen snow before", spanish: "Nunca había visto nieve antes" },
      { english: "They had finished before we started", spanish: "Ellos habían terminado antes de que empezáramos" },
    ],
  },

  // TIEMPOS VERBALES - FUTURO
  {
    id: 8,
    title: "Future with Will",
    category: "Futuro",
    explanation:
      "Se usa para predicciones, promesas, decisiones espontáneas y ofrecimientos.",
    rules: [
      "Estructura: Sujeto + will + verbo base",
      "Negativo: Sujeto + won't + verbo base",
      "Pregunta: Will + sujeto + verbo base?",
      "Contracción: I'll, you'll, he'll, etc.",
    ],
    examples: [
      { english: "I will help you tomorrow", spanish: "Te ayudaré mañana" },
      { english: "It will rain later", spanish: "Lloverá más tarde" },
      { english: "She won't come to the party", spanish: "Ella no vendrá a la fiesta" },
      { english: "Will you marry me?", spanish: "¿Te casarás conmigo?" },
    ],
  },
  {
    id: 9,
    title: "Future with Going to",
    category: "Futuro",
    explanation:
      "Se usa para planes decididos e intenciones, y predicciones basadas en evidencia.",
    rules: [
      "Estructura: Sujeto + am/is/are + going to + verbo base",
      "Negativo: Sujeto + am/is/are + not going to + verbo base",
      "Pregunta: Am/Is/Are + sujeto + going to + verbo base?",
      "Indica planes o evidencia visible",
    ],
    examples: [
      { english: "I am going to visit my parents", spanish: "Voy a visitar a mis padres" },
      { english: "Look at those clouds! It's going to rain", spanish: "¡Mira esas nubes! Va a llover" },
      { english: "She is not going to study law", spanish: "Ella no va a estudiar derecho" },
    ],
  },
  {
    id: 10,
    title: "Future Continuous",
    category: "Futuro",
    explanation:
      "Se usa para acciones que estarán en progreso en un momento específico del futuro.",
    rules: [
      "Estructura: Sujeto + will be + verbo-ing",
      "Negativo: Sujeto + won't be + verbo-ing",
      "Pregunta: Will + sujeto + be + verbo-ing?",
      "Común con expresiones de tiempo futuro",
    ],
    examples: [
      { english: "This time tomorrow, I'll be flying to Paris", spanish: "A esta hora mañana, estaré volando a París" },
      { english: "She will be working at 5 PM", spanish: "Ella estará trabajando a las 5 PM" },
      { english: "Will you be using the car tomorrow?", spanish: "¿Estarás usando el auto mañana?" },
    ],
  },

  // VERBOS MODALES
  {
    id: 11,
    title: "Modal Verbs: Can & Could",
    category: "Modales",
    explanation:
      "Can expresa habilidad y permiso en presente. Could es el pasado de can y también expresa posibilidad.",
    rules: [
      "Can: habilidad presente, permiso",
      "Could: habilidad pasada, peticiones corteses, posibilidad",
      "Estructura: Sujeto + can/could + verbo base",
      "No lleva 's' en tercera persona",
    ],
    examples: [
      { english: "I can swim", spanish: "Sé nadar" },
      { english: "She could play piano when she was young", spanish: "Ella podía tocar piano cuando era joven" },
      { english: "Can I help you?", spanish: "¿Puedo ayudarte?" },
      { english: "Could you pass the salt?", spanish: "¿Podrías pasarme la sal?" },
    ],
  },
  {
    id: 12,
    title: "Modal Verbs: Should & Must",
    category: "Modales",
    explanation:
      "Should expresa consejo/recomendación. Must expresa obligación fuerte o deducción.",
    rules: [
      "Should: consejos, recomendaciones",
      "Must: obligación fuerte, deducción lógica",
      "Mustn't: prohibición",
      "Don't have to: falta de obligación",
    ],
    examples: [
      { english: "You should see a doctor", spanish: "Deberías ver a un doctor" },
      { english: "I must finish this today", spanish: "Debo terminar esto hoy" },
      { english: "You mustn't smoke here", spanish: "No debes fumar aquí" },
      { english: "You don't have to come", spanish: "No tienes que venir" },
    ],
  },
  {
    id: 13,
    title: "Modal Verbs: May, Might & Would",
    category: "Modales",
    explanation:
      "May/Might expresan posibilidad. Would se usa en condicionales y para peticiones corteses.",
    rules: [
      "May/Might: posibilidad (might es menos probable)",
      "May: permiso formal",
      "Would: condicional, peticiones corteses",
      "Would like: querer (forma cortés)",
    ],
    examples: [
      { english: "It might rain tomorrow", spanish: "Podría llover mañana" },
      { english: "May I use your phone?", spanish: "¿Puedo usar tu teléfono?" },
      { english: "I would like some water", spanish: "Me gustaría un poco de agua" },
      { english: "Would you help me?", spanish: "¿Me ayudarías?" },
    ],
  },

  // CONDICIONALES
  {
    id: 14,
    title: "Zero Conditional",
    category: "Condicionales",
    explanation:
      "El zero conditional se usa para verdades generales, hechos científicos y situaciones que siempre son verdad.",
    rules: [
      "Estructura: If + present simple, present simple",
      "También: When + present simple, present simple",
      "Usado para leyes naturales, hechos universales",
      "El resultado siempre ocurre si se cumple la condición",
    ],
    examples: [
      { english: "If you heat water to 100°C, it boils", spanish: "Si calientas agua a 100°C, hierve" },
      { english: "If it rains, the ground gets wet", spanish: "Si llueve, el suelo se moja" },
      { english: "When you mix blue and yellow, you get green", spanish: "Cuando mezclas azul y amarillo, obtienes verde" },
      { english: "If you don't eat, you get hungry", spanish: "Si no comes, te da hambre" },
    ],
  },
  {
    id: 15,
    title: "First Conditional",
    category: "Condicionales",
    explanation:
      "El first conditional se usa para situaciones reales y posibles en el futuro.",
    rules: [
      "Estructura: If + present simple, will + infinitive",
      "También puede usar: may, might, can en lugar de will",
      "La condición es posible y realista",
      "Usado para predicciones, promesas, advertencias, amenazas",
    ],
    examples: [
      { english: "If it rains tomorrow, we'll stay home", spanish: "Si llueve mañana, nos quedaremos en casa" },
      { english: "If you study hard, you will pass the exam", spanish: "Si estudias duro, aprobarás el examen" },
      { english: "If I see her, I'll tell her the news", spanish: "Si la veo, le diré las noticias" },
      { english: "If you don't hurry, you'll miss the bus", spanish: "Si no te apuras, perderás el autobús" },
    ],
  },
  {
    id: 16,
    title: "Second Conditional",
    category: "Condicionales",
    explanation:
      "El second conditional se usa para situaciones hipotéticas, improbables o imaginarias en el presente o futuro.",
    rules: [
      "Estructura: If + past simple, would + infinitive",
      "También: could, might en lugar de would",
      "Con el verbo 'be' se usa 'were' para todas las personas",
      "La condición es improbable o imaginaria",
      "Usado para consejos, situaciones hipotéticas",
    ],
    examples: [
      { english: "If I were rich, I would travel the world", spanish: "Si fuera rico, viajaría por el mundo" },
      { english: "If I had a car, I would drive to work", spanish: "Si tuviera un auto, manejaría al trabajo" },
      { english: "If she knew the answer, she would tell you", spanish: "Si ella supiera la respuesta, te la diría" },
      { english: "If I were you, I wouldn't do that", spanish: "Si yo fuera tú, no haría eso" },
    ],
  },
  {
    id: 17,
    title: "Third Conditional",
    category: "Condicionales",
    explanation:
      "El third conditional se usa para situaciones pasadas que no ocurrieron (situaciones irreales en el pasado).",
    rules: [
      "Estructura: If + past perfect, would have + past participle",
      "También: could have, might have",
      "Usado para lamentaciones, críticas sobre el pasado",
      "La situación ya pasó y no se puede cambiar",
      "Expresa arrepentimiento o especulación sobre el pasado",
    ],
    examples: [
      { english: "If I had known, I would have helped you", spanish: "Si hubiera sabido, te habría ayudado" },
      { english: "If she had studied harder, she would have passed", spanish: "Si ella hubiera estudiado más, habría aprobado" },
      { english: "If we had left earlier, we wouldn't have missed the train", spanish: "Si hubiéramos salido antes, no habríamos perdido el tren" },
      { english: "If they had invited me, I would have gone to the party", spanish: "Si me hubieran invitado, habría ido a la fiesta" },
    ],
  },

  // VOZ PASIVA (y TODO el resto)
  // ⬇️ Pega aquí SIN CAMBIAR el resto de tus objetos (18...81)
  // Para que quede idéntico, copiá desde tu archivo original y pegalo aquí debajo.
  // (Lo dejé así para no arriesgar a que se pierda algo por corte de chat.)
];
