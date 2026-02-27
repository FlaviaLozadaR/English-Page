import { useState } from "react";
import { 
  Target, Search, Award, FileText,
  Type, Users, Clock, Zap, MessageCircle, Brain, Globe, 
  Briefcase, Coffee, BookOpen, CheckCircle, XCircle, ArrowRight,
  TrendingUp, Link as LinkIcon, Layers, MapPin, BarChart, HelpCircle, List
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  type: "multiple" | "fill" | "match";
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  pairs?: { left: string; right: string }[];
}

interface Test {
  id: number;
  level: "Fácil" | "Intermedio" | "Difícil";
  questions: Question[];
  description: string;
}

interface PracticeCategory {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  tests: Test[];
}

interface Exam {
  id: number;
  title: string;
  description: string;
  questions: number;
  duration: number;
  level: "Principiante" | "Intermedio" | "Avanzado";
  topics: string[];
}

const generateQuestions = (pattern: string, data: any[]): Question[] => {
  return data.map((item, index) => ({
    id: index + 1,
    type: item.type || "multiple",
    question: item.question,
    options: item.options,
    correctAnswer: item.correctAnswer,
    explanation: item.explanation,
    pairs: item.pairs,
  }));
};

export function Practice() {
  const [view, setView] = useState<"categories" | "tests" | "test-active" | "exams" | "exam-active">("categories");
  const [selectedCategory, setSelectedCategory] = useState<PracticeCategory | null>(null);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [selectedExamFilter, setSelectedExamFilter] = useState("Todos");
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [examCurrentQuestion, setExamCurrentQuestion] = useState(0);
  const [examAnswers, setExamAnswers] = useState<string[]>([]);
  const [examShowResults, setExamShowResults] = useState(false);

  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());

  const categories: PracticeCategory[] = [
    // 1. PARTES DE LA ORACIÓN
    {
      id: "parts-of-speech",
      title: "Partes de la Oración",
      description: "Nouns, verbs, adjectives, adverbs",
      icon: Type,
      color: "from-purple-500 to-pink-500",
      tests: [
        {
          id: 1,
          level: "Fácil",
          description: "Identificar sustantivos y verbos básicos",
          questions: generateQuestions("basic", [
            { question: "En 'The dog runs fast', ¿qué es 'dog'?", options: ["Noun", "Verb", "Adjective", "Adverb"], correctAnswer: "Noun", explanation: "Dog es un sustantivo (animal)" },
            { question: "En 'She sings beautifully', ¿qué es 'sings'?", options: ["Noun", "Verb", "Adjective", "Adverb"], correctAnswer: "Verb", explanation: "Sings es un verbo (acción)" },
            { question: "¿Qué palabra es un verbo?", options: ["Table", "Run", "Beautiful", "Quickly"], correctAnswer: "Run", explanation: "Run es una acción" },
            { type: "fill", question: "En 'The CAT sleeps', la palabra CAT es un ___", correctAnswer: "noun", explanation: "Cat es un sustantivo" },
            { question: "¿Cuál es un sustantivo?", options: ["Jump", "Happy", "Book", "Slowly"], correctAnswer: "Book", explanation: "Book es un objeto" },
            { type: "fill", question: "En 'They PLAY soccer', PLAY es un ___", correctAnswer: "verb", explanation: "Play es una acción" },
            { question: "En 'The teacher explains', ¿qué es 'teacher'?", options: ["Noun", "Verb", "Adjective", "Adverb"], correctAnswer: "Noun", explanation: "Teacher es una persona" },
            { question: "¿Qué palabra es un verbo?", options: ["Car", "Write", "Big", "Very"], correctAnswer: "Write", explanation: "Write es una acción" },
            { type: "fill", question: "En 'I EAT pizza', EAT es un ___", correctAnswer: "verb", explanation: "Eat es una acción" },
            { question: "En 'The water is cold', ¿qué es 'water'?", options: ["Noun", "Verb", "Adjective", "Adverb"], correctAnswer: "Noun", explanation: "Water es una cosa" }
          ])
        },
        {
          id: 2,
          level: "Fácil",
          description: "Reconocer adjetivos y adverbios simples",
          questions: generateQuestions("basic", [
            { question: "En 'The BEAUTIFUL house', ¿qué es 'beautiful'?", options: ["Noun", "Verb", "Adjective", "Adverb"], correctAnswer: "Adjective", explanation: "Beautiful describe al sustantivo" },
            { question: "En 'She runs QUICKLY', ¿qué es 'quickly'?", options: ["Noun", "Verb", "Adjective", "Adverb"], correctAnswer: "Adverb", explanation: "Quickly describe el verbo" },
            { type: "fill", question: "En 'The RED car', RED es un ___", correctAnswer: "adjective", explanation: "Red describe el auto" },
            { question: "¿Cuál es un adjetivo?", options: ["Happy", "Run", "Quickly", "Very"], correctAnswer: "Happy", explanation: "Happy describe sentimientos" },
            { question: "En 'He speaks SOFTLY', ¿qué es 'softly'?", options: ["Noun", "Verb", "Adjective", "Adverb"], correctAnswer: "Adverb", explanation: "Softly describe cómo habla" },
            { type: "fill", question: "En 'The TALL man', TALL es un ___", correctAnswer: "adjective", explanation: "Tall describe al hombre" },
            { question: "¿Cuál palabra describe CÓMO?", options: ["Big", "Slowly", "Dog", "Run"], correctAnswer: "Slowly", explanation: "Slowly es adverbio" },
            { question: "En 'The SMALL cat', ¿qué es 'small'?", options: ["Noun", "Verb", "Adjective", "Adverb"], correctAnswer: "Adjective", explanation: "Small describe tamaño" },
            { type: "fill", question: "En 'She sings BEAUTIFULLY', BEAUTIFULLY es un ___", correctAnswer: "adverb", explanation: "Beautifully describe cómo canta" },
            { question: "¿Cuál describe un sustantivo?", options: ["Quickly", "Nice", "Very", "Run"], correctAnswer: "Nice", explanation: "Nice es adjetivo" }
          ])
        },
        {
          id: 3,
          level: "Intermedio",
          description: "Diferenciar entre tipos de sustantivos",
          questions: generateQuestions("intermediate", [
            { question: "¿Qué tipo de sustantivo es 'London'?", options: ["Common", "Proper", "Abstract", "Collective"], correctAnswer: "Proper", explanation: "London es nombre propio" },
            { question: "¿Qué tipo es 'happiness'?", options: ["Concrete", "Abstract", "Proper", "Collective"], correctAnswer: "Abstract", explanation: "Happiness no se toca" },
            { question: "¿Qué tipo es 'team'?", options: ["Common", "Proper", "Abstract", "Collective"], correctAnswer: "Collective", explanation: "Team es grupo" },
            { type: "fill", question: "'Apple' es sustantivo ___ (común/propio)", correctAnswer: "común", explanation: "Apple es común" },
            { question: "¿Cuál es abstracto?", options: ["Table", "Love", "Dog", "Car"], correctAnswer: "Love", explanation: "Love no se toca" },
            { question: "¿Qué tipo es 'Mary'?", options: ["Common", "Proper", "Abstract", "Collective"], correctAnswer: "Proper", explanation: "Mary es nombre propio" },
            { question: "¿Cuál es colectivo?", options: ["Book", "Family", "Sadness", "Spain"], correctAnswer: "Family", explanation: "Family es grupo" },
            { type: "fill", question: "'Courage' es sustantivo ___", correctAnswer: "abstracto", explanation: "Courage es cualidad" },
            { question: "¿Cuál es concreto?", options: ["Chair", "Freedom", "Hope", "Justice"], correctAnswer: "Chair", explanation: "Chair se toca" },
            { question: "¿Qué tipo es 'police'?", options: ["Common", "Proper", "Abstract", "Collective"], correctAnswer: "Collective", explanation: "Police es grupo" },
            { question: "¿Cuál es abstracto?", options: ["Tree", "Intelligence", "River", "Mountain"], correctAnswer: "Intelligence", explanation: "Intelligence no tiene forma" },
            { type: "fill", question: "'Microsoft' es sustantivo ___", correctAnswer: "propio", explanation: "Microsoft es nombre de empresa" },
            { question: "¿Cuál es colectivo?", options: ["Student", "Class", "Anger", "Paris"], correctAnswer: "Class", explanation: "Class es grupo de estudiantes" },
            { question: "¿Qué tipo es 'honesty'?", options: ["Concrete", "Abstract", "Proper", "Collective"], correctAnswer: "Abstract", explanation: "Honesty es cualidad" },
            { question: "¿Cuál NO es propio?", options: ["John", "city", "France", "Monday"], correctAnswer: "city", explanation: "City es común" }
          ])
        },
        {
          id: 4,
          level: "Intermedio",
          description: "Uso correcto de adverbios de frecuencia",
          questions: generateQuestions("intermediate", [
            { question: "¿Dónde va 'always'? I ___ go", options: ["I go always", "I always go", "Always I go", "I go to always"], correctAnswer: "I always go", explanation: "Adverbio antes del verbo" },
            { question: "Ordena: She / late / is / never", options: ["She never is late", "She is never late", "Never she is late", "She is late never"], correctAnswer: "She is never late", explanation: "Con be: después del verbo" },
            { type: "fill", question: "I ___ eat breakfast (100%)", correctAnswer: "always", explanation: "Always = 100%" },
            { question: "¿Cuál significa 'nunca'?", options: ["Always", "Usually", "Never", "Sometimes"], correctAnswer: "Never", explanation: "Never = 0%" },
            { question: "Ordena: They / play / often / soccer", options: ["They often play soccer", "They play often soccer", "Often they play soccer", "They play soccer often"], correctAnswer: "They often play soccer", explanation: "Often antes del verbo" },
            { type: "fill", question: "She ___ drinks coffee (50%)", correctAnswer: "sometimes", explanation: "Sometimes = 50%" },
            { question: "¿Cuál es correcto?", options: ["He goes usually", "He usually goes", "Usually he goes", "He goes to usually"], correctAnswer: "He usually goes", explanation: "Usually antes del verbo" },
            { question: "Con 'be', ¿dónde va el adverbio?", options: ["Antes del be", "Después del be", "Al final", "Al inicio"], correctAnswer: "Después del be", explanation: "Be + adverbio" },
            { type: "fill", question: "We ___ go there (10%)", correctAnswer: "rarely", explanation: "Rarely = 10%" },
            { question: "¿Cuál es 90%?", options: ["Always", "Usually", "Sometimes", "Never"], correctAnswer: "Usually", explanation: "Usually = 90%" },
            { question: "Ordena: am / I / tired / often", options: ["I am often tired", "I often am tired", "Often I am tired", "I am tired often"], correctAnswer: "I am often tired", explanation: "Be + adverbio" },
            { type: "fill", question: "They ___ arrive on time (75%)", correctAnswer: "often", explanation: "Often = 75%" },
            { question: "¿Cuál es correcto?", options: ["She is always happy", "She always is happy", "Always she is happy", "She is happy always"], correctAnswer: "She is always happy", explanation: "Be + adverbio" },
            { question: "¿Dónde NO va el adverbio?", options: ["Antes del verbo", "Después de be", "Entre verbo y objeto", "Al inicio"], correctAnswer: "Entre verbo y objeto", explanation: "NUNCA entre verbo y objeto" },
            { type: "fill", question: "He is ___ late (0%)", correctAnswer: "never", explanation: "Never = 0%" }
          ])
        },
        {
          id: 5,
          level: "Difícil",
          description: "Análisis completo de oraciones",
          questions: generateQuestions("advanced", [
            { question: "En 'The extremely tall player runs very quickly', ¿cuántos adverbios hay?", options: ["1", "2", "3", "4"], correctAnswer: "2", explanation: "Extremely y very" },
            { question: "En 'Running quickly is healthy', ¿qué es 'running'?", options: ["Verb", "Noun (gerund)", "Adjective", "Adverb"], correctAnswer: "Noun (gerund)", explanation: "Running es sujeto" },
            { question: "¿Qué es 'broken' en 'The broken window'?", options: ["Verb", "Noun", "Adjective", "Adverb"], correctAnswer: "Adjective", explanation: "Broken describe ventana" },
            { type: "fill", question: "En 'She is a teacher', 'teacher' es sustantivo ___", correctAnswer: "predicativo", explanation: "Va después de be" },
            { question: "En 'I want to go', ¿qué es 'to go'?", options: ["Verb", "Infinitive", "Gerund", "Participle"], correctAnswer: "Infinitive", explanation: "To go es infinitivo" },
            { question: "¿Qué parte NO está en 'The dog barks loudly'?", options: ["Article", "Noun", "Verb", "Adjective"], correctAnswer: "Adjective", explanation: "No hay adjetivo" },
            { question: "En 'Eating vegetables is important', ¿qué es 'eating'?", options: ["Continuous", "Gerund", "Participle", "Infinitive"], correctAnswer: "Gerund", explanation: "Eating es sujeto" },
            { type: "fill", question: "En 'The sleeping baby', sleeping es un ___", correctAnswer: "adjective", explanation: "Participio como adjetivo" },
            { question: "¿Cuántos verbos? 'She wants to study and work'", options: ["1", "2", "3", "4"], correctAnswer: "3", explanation: "Wants, study, work" },
            { question: "En 'The quickly running man', ¿qué es 'quickly'?", options: ["Adjective", "Adverb", "Adverb modifying participle", "Noun"], correctAnswer: "Adverb modifying participle", explanation: "Modifica running" },
            { question: "¿Qué es 'well' en 'He is well'?", options: ["Adverb", "Adjective", "Noun", "Verb"], correctAnswer: "Adjective", explanation: "Well = salud" },
            { type: "fill", question: "En 'Swimming is fun', swimming es ___", correctAnswer: "gerund", explanation: "Swimming es sujeto" },
            { question: "En 'The man walking his dog', ¿qué es 'walking'?", options: ["Main verb", "Gerund", "Participle", "Infinitive"], correctAnswer: "Participle", explanation: "Participio describe hombre" },
            { question: "¿Qué es 'fast'? 'He runs fast' vs 'a fast car'", options: ["Ambos adverbs", "Ambos adjectives", "Adverb, adjective", "Adjective, adverb"], correctAnswer: "Adverb, adjective", explanation: "Fast cambia según contexto" },
            { question: "En 'I enjoy reading books', ¿qué es 'reading'?", options: ["Continuous", "Gerund", "Infinitive", "Participle"], correctAnswer: "Gerund", explanation: "Reading es objeto" },
            { type: "fill", question: "En 'The written letter', written es ___", correctAnswer: "adjective", explanation: "Participio pasado como adjetivo" },
            { question: "¿Cuántos sustantivos? 'The teacher gave the student a book'", options: ["1", "2", "3", "4"], correctAnswer: "3", explanation: "Teacher, student, book" },
            { question: "En 'He made me happy', ¿qué es 'happy'?", options: ["Adverb", "Object complement", "Subject complement", "Object"], correctAnswer: "Object complement", explanation: "Complementa objeto" },
            { type: "fill", question: "En 'I go running every day', running es ___", correctAnswer: "gerund", explanation: "Gerundio después de go" },
            { question: "¿Qué falta en 'The dog ___ loudly'?", options: ["Noun", "Verb", "Adjective", "Adverb"], correctAnswer: "Verb", explanation: "Falta verbo principal" }
          ])
        },
        {
          id: 6,
          level: "Difícil",
          description: "Casos especiales y excepciones",
          questions: generateQuestions("advanced", [
            { type: "match", question: "Une cada palabra con su función:", pairs: [
              { left: "Well (He is well)", right: "Adjective" },
              { left: "Well (He speaks well)", right: "Adverb" },
              { left: "Fast (A fast car)", right: "Adjective" },
              { left: "Fast (He runs fast)", right: "Adverb" },
              { left: "Early (Early morning)", right: "Adjective" }
            ], correctAnswer: "" },
            { question: "¿Qué es 'that' en 'The book that I read'?", options: ["Demonstrative", "Relative pronoun", "Conjunction", "Determiner"], correctAnswer: "Relative pronoun", explanation: "That conecta cláusulas" },
            { question: "¿Qué es 'that' en 'I know that you're tired'?", options: ["Relative", "Conjunction", "Demonstrative", "Determiner"], correctAnswer: "Conjunction", explanation: "That conecta oraciones" },
            { type: "fill", question: "En 'Police are coming', 'police' es singular o plural: ___", correctAnswer: "plural", explanation: "Police es plural" },
            { question: "¿Qué es 'down' en 'He walked down the street'?", options: ["Adverb", "Preposition", "Adjective", "Verb"], correctAnswer: "Preposition", explanation: "Down muestra dirección" },
            { question: "¿Qué es 'down' en 'Sit down'?", options: ["Preposition", "Adverb particle", "Adjective", "Noun"], correctAnswer: "Adverb particle", explanation: "Down modifica sit" },
            { type: "fill", question: "En 'The news is good', 'news' es singular o plural: ___", correctAnswer: "singular", explanation: "News es singular" },
            { question: "¿Qué es 'like' en 'He looks like his father'?", options: ["Verb", "Preposition", "Conjunction", "Adjective"], correctAnswer: "Preposition", explanation: "Like = similar to" },
            { question: "¿Qué es 'like' en 'I like pizza'?", options: ["Preposition", "Verb", "Conjunction", "Adjective"], correctAnswer: "Verb", explanation: "Like es el verbo principal" },
            { type: "fill", question: "En 'Measles is dangerous', 'measles' es singular o plural: ___", correctAnswer: "singular", explanation: "Measles es singular" },
            { question: "¿Qué es 'up' en 'Look up the word'?", options: ["Preposition", "Adverb particle", "Adjective", "Conjunction"], correctAnswer: "Adverb particle", explanation: "Up forma phrasal verb" },
            { question: "¿Qué es 'before' en 'I arrived before him'?", options: ["Conjunction", "Preposition", "Adverb", "Noun"], correctAnswer: "Preposition", explanation: "Before + objeto" },
            { question: "¿Qué es 'before' en 'I left before you arrived'?", options: ["Preposition", "Conjunction", "Adverb", "Verb"], correctAnswer: "Conjunction", explanation: "Before conecta cláusulas" },
            { type: "fill", question: "En 'Furniture is expensive', 'furniture' es contable o incontable: ___", correctAnswer: "incontable", explanation: "Furniture es incontable" },
            { question: "¿Qué es 'either' en 'Either option is fine'?", options: ["Pronoun", "Determiner", "Adverb", "Conjunction"], correctAnswer: "Determiner", explanation: "Either + sustantivo" },
            { question: "¿Qué es 'either' en 'I don't like it either'?", options: ["Determiner", "Adverb", "Conjunction", "Pronoun"], correctAnswer: "Adverb", explanation: "Either = tampoco" },
            { type: "fill", question: "En 'Mathematics is difficult', 'mathematics' es singular o plural: ___", correctAnswer: "singular", explanation: "Mathematics es singular" },
            { question: "¿Qué es 'only' en 'I only have $5'?", options: ["Adjective", "Adverb", "Conjunction", "Preposition"], correctAnswer: "Adverb", explanation: "Only modifica verbo" },
            { question: "¿Qué es 'only' en 'He's an only child'?", options: ["Adverb", "Adjective", "Noun", "Verb"], correctAnswer: "Adjective", explanation: "Only describe child" },
            { type: "fill", question: "En 'The people are happy', 'people' es singular o plural: ___", correctAnswer: "plural", explanation: "People es plural" }
          ])
        }
      ]
    },
    // 2. PRONOMBRES
    {
      id: "pronouns",
      title: "Pronombres",
      description: "Subject, object, possessive, reflexive",
      icon: Users,
      color: "from-green-500 to-emerald-500",
      tests: [
        {
          id: 1,
          level: "Fácil",
          description: "Pronombres personales básicos",
          questions: generateQuestions("basic", [
            { question: "¿Cuál es el pronombre para 'María'?", options: ["He", "She", "It", "They"], correctAnswer: "She", explanation: "She para mujeres" },
            { question: "___ am a student", options: ["I", "You", "He", "She"], correctAnswer: "I", explanation: "I = yo" },
            { type: "fill", question: "___ is my brother (él)", correctAnswer: "he", explanation: "He = él" },
            { question: "¿Cuál usamos para 'the book'?", options: ["He", "She", "It", "They"], correctAnswer: "It", explanation: "It para cosas" },
            { question: "___ are my friends (ellos)", options: ["He", "She", "It", "They"], correctAnswer: "They", explanation: "They = ellos" },
            { type: "fill", question: "___ are a teacher (tú)", correctAnswer: "you", explanation: "You = tú" },
            { question: "¿Cuál para 'John and I'?", options: ["I", "You", "We", "They"], correctAnswer: "We", explanation: "We = nosotros" },
            { question: "___ is raining", options: ["He", "She", "It", "They"], correctAnswer: "It", explanation: "It para clima" },
            { type: "fill", question: "___ is my mother (ella)", correctAnswer: "she", explanation: "She = ella" },
            { question: "¿Cuál para 'the students'?", options: ["He", "She", "It", "They"], correctAnswer: "They", explanation: "They = plural" }
          ])
        },
        {
          id: 2,
          level: "Fácil",
          description: "Pronombres posesivos simples",
          questions: generateQuestions("basic", [
            { question: "This is ___ book (mi)", options: ["my", "mine", "I", "me"], correctAnswer: "my", explanation: "My + sustantivo" },
            { question: "That car is ___ (de él)", options: ["he", "his", "him", "he's"], correctAnswer: "his", explanation: "His solo" },
            { type: "fill", question: "Is this ___ pen? (tu)", correctAnswer: "your", explanation: "Your + sustantivo" },
            { question: "___ name is Mary (de ella)", options: ["She", "Her", "Hers", "She's"], correctAnswer: "Her", explanation: "Her + sustantivo" },
            { question: "The book is ___ (mío)", options: ["my", "mine", "I", "me"], correctAnswer: "mine", explanation: "Mine solo" },
            { type: "fill", question: "___ house is big (nuestro)", correctAnswer: "our", explanation: "Our + sustantivo" },
            { question: "These are ___ books (de ellos)", options: ["they", "their", "theirs", "them"], correctAnswer: "their", explanation: "Their + sustantivo" },
            { question: "The dog wagged ___ tail", options: ["it", "its", "it's", "its'"], correctAnswer: "its", explanation: "Its sin apóstrofe" },
            { type: "fill", question: "Is this yours or ___? (de ella)", correctAnswer: "hers", explanation: "Hers solo" },
            { question: "___ parents are doctors (mis)", options: ["I", "My", "Mine", "Me"], correctAnswer: "My", explanation: "My + sustantivo" }
          ])
        },
        {
          id: 3,
          level: "Intermedio",
          description: "Pronombres objeto y reflexivos",
          questions: generateQuestions("intermediate", [
            { question: "She loves ___ (a mí)", options: ["I", "me", "my", "mine"], correctAnswer: "me", explanation: "Me = objeto" },
            { question: "I saw ___ yesterday (a él)", options: ["he", "his", "him", "himself"], correctAnswer: "him", explanation: "Him = objeto" },
            { type: "fill", question: "I hurt ___ playing soccer", correctAnswer: "myself", explanation: "Myself = reflexivo" },
            { question: "She made the cake by ___", options: ["she", "her", "hers", "herself"], correctAnswer: "herself", explanation: "Herself = reflexivo" },
            { question: "Can you help ___? (nosotros)", options: ["we", "us", "our", "ours"], correctAnswer: "us", explanation: "Us = objeto" },
            { type: "fill", question: "They enjoyed ___ (ellos mismos)", correctAnswer: "themselves", explanation: "Themselves = reflexivo" },
            { question: "Tell ___ the truth (a mí)", options: ["I", "me", "my", "myself"], correctAnswer: "me", explanation: "Me = objeto" },
            { question: "He cut ___ with a knife", options: ["he", "him", "his", "himself"], correctAnswer: "himself", explanation: "Himself = reflexivo" },
            { type: "fill", question: "Look at ___! (a ti mismo)", correctAnswer: "yourself", explanation: "Yourself = reflexivo" },
            { question: "I bought ___ a gift (para mí)", options: ["I", "me", "my", "myself"], correctAnswer: "myself", explanation: "Myself = reflexivo" },
            { question: "We can do it ___", options: ["we", "us", "our", "ourselves"], correctAnswer: "ourselves", explanation: "Ourselves = reflexivo" },
            { type: "fill", question: "The cat licked ___ (a sí mismo)", correctAnswer: "itself", explanation: "Itself = reflexivo" },
            { question: "Give ___ the book (a ella)", options: ["she", "her", "hers", "herself"], correctAnswer: "her", explanation: "Her = objeto" },
            { question: "Did you make this ___? (tú mismo)", options: ["you", "your", "yours", "yourself"], correctAnswer: "yourself", explanation: "Yourself = énfasis" },
            { type: "fill", question: "They blamed ___ (a ellos mismos)", correctAnswer: "themselves", explanation: "Themselves = reflexivo" }
          ])
        },
        {
          id: 4,
          level: "Intermedio",
          description: "Diferencias my vs mine",
          questions: generateQuestions("intermediate", [
            { type: "match", question: "Une pronombres equivalentes:", pairs: [
              { left: "My (+ noun)", right: "Mine (alone)" },
              { left: "Your (+ noun)", right: "Yours (alone)" },
              { left: "His (+ noun)", right: "His (alone)" },
              { left: "Her (+ noun)", right: "Hers (alone)" },
              { left: "Our (+ noun)", right: "Ours (alone)" }
            ], correctAnswer: "" },
            { question: "This is ___ car / This car is ___", options: ["my / mine", "mine / my", "my / my", "mine / mine"], correctAnswer: "my / mine", explanation: "My + sustantivo / Mine solo" },
            { type: "fill", question: "That book is ___ (mío - sin sustantivo)", correctAnswer: "mine", explanation: "Mine solo" },
            { question: "___ dog / The dog is ___", options: ["Your / yours", "Yours / your", "Your / your", "Yours / yours"], correctAnswer: "Your / yours", explanation: "Your + sustantivo / Yours solo" },
            { question: "¿Cuál es INCORRECTO?", options: ["My book", "Mine book", "The book is mine", "This is mine"], correctAnswer: "Mine book", explanation: "NUNCA mine + sustantivo" },
            { type: "fill", question: "These are ___ keys (tus - con sustantivo)", correctAnswer: "your", explanation: "Your + sustantivo" },
            { question: "___ house vs The house is ___ (de ellos)", options: ["Their / theirs", "Theirs / their", "Their / their", "Theirs / theirs"], correctAnswer: "Their / theirs", explanation: "Their + sustantivo / Theirs solo" },
            { question: "Is this pen ___ or ___? (tuyo / mío)", options: ["your / my", "yours / mine", "your / mine", "yours / my"], correctAnswer: "yours / mine", explanation: "Ambos sin sustantivo" },
            { type: "fill", question: "___ idea is better than ___ (mi / tuya)", correctAnswer: "my yours", explanation: "My + sustantivo / yours solo" },
            { question: "¿Cuál es CORRECTO?", options: ["Hers car", "Her car", "Her's car", "Hers's car"], correctAnswer: "Her car", explanation: "Her + sustantivo" },
            { question: "That bag is ___ (de ella - solo)", options: ["her", "hers", "her's", "hers'"], correctAnswer: "hers", explanation: "Hers sin apóstrofe" },
            { type: "fill", question: "A friend of ___ (un amigo mío)", correctAnswer: "mine", explanation: "Of + mine" },
            { question: "___ parents vs Parents of ___ (mis)", options: ["My / mine", "Mine / my", "My / my", "Mine / mine"], correctAnswer: "My / mine", explanation: "My + sustantivo / of + mine" },
            { question: "Which is ___? (tuyo)", options: ["your", "yours", "your's", "yours'"], correctAnswer: "yours", explanation: "Yours solo" },
            { type: "fill", question: "It's not ___ problem, it's ___ (mi / tuyo)", correctAnswer: "my yours", explanation: "My + sustantivo / yours solo" }
          ])
        },
        {
          id: 5,
          level: "Difícil",
          description: "Pronombres relativos y demostrativos",
          questions: generateQuestions("advanced", [
            { question: "The man ___ called you is here", options: ["who", "which", "what", "whose"], correctAnswer: "who", explanation: "Who para personas" },
            { question: "The book ___ you lent me is great", options: ["who", "which", "what", "whose"], correctAnswer: "which", explanation: "Which para cosas" },
            { type: "fill", question: "The girl ___ bag was stolen (cuyo)", correctAnswer: "whose", explanation: "Whose = posesión" },
            { question: "___ is this? (¿Qué es esto?)", options: ["What", "Which", "Who", "That"], correctAnswer: "What", explanation: "What para qué cosa" },
            { question: "___ do you prefer, tea or coffee?", options: ["What", "Which", "Who", "That"], correctAnswer: "Which", explanation: "Which para elegir" },
            { type: "fill", question: "___ is my car (este - cerca)", correctAnswer: "this", explanation: "This = este" },
            { question: "___ are my keys (estos - cerca)", options: ["This", "That", "These", "Those"], correctAnswer: "These", explanation: "These = estos" },
            { question: "___ is her house (esa - lejos)", options: ["This", "That", "These", "Those"], correctAnswer: "That", explanation: "That = esa" },
            { type: "fill", question: "___ are my friends (esos - lejos)", correctAnswer: "those", explanation: "Those = esos" },
            { question: "The city ___ I was born is beautiful", options: ["who", "which", "where", "when"], correctAnswer: "where", explanation: "Where para lugares" },
            { question: "The day ___ we met was sunny", options: ["who", "which", "where", "when"], correctAnswer: "when", explanation: "When para tiempo" },
            { type: "fill", question: "The reason ___ he left (por qué)", correctAnswer: "why", explanation: "Why para razones" },
            { question: "The man ___ I met was friendly", options: ["who/whom", "which", "what", "whose"], correctAnswer: "who/whom", explanation: "Who para personas objeto" },
            { question: "___ is the difference?", options: ["What", "Which", "Who", "Whose"], correctAnswer: "What", explanation: "What the difference" },
            { type: "fill", question: "I'll take ___ one (este)", correctAnswer: "this", explanation: "This one" },
            { question: "The house, ___ is old, needs repairs", options: ["that", "which", "who", "what"], correctAnswer: "which", explanation: "Which con comas" },
            { question: "___ car is faster? (comparando)", options: ["What", "Which", "Who", "That"], correctAnswer: "Which", explanation: "Which para comparar" },
            { type: "fill", question: "Everything ___ he said was true", correctAnswer: "that", explanation: "That después de everything" },
            { question: "The woman to ___ I spoke", options: ["who", "whom", "which", "that"], correctAnswer: "whom", explanation: "Whom formal" },
            { question: "___ would you like? (sin opciones)", options: ["What", "Which", "Who", "That"], correctAnswer: "What", explanation: "What sin opciones" }
          ])
        },
        {
          id: 6,
          level: "Difícil",
          description: "Uso avanzado en contexto",
          questions: generateQuestions("advanced", [
            { question: "Between you and ___, I think she's wrong", options: ["I", "me", "myself", "mine"], correctAnswer: "me", explanation: "Me después de preposición" },
            { question: "It was ___ who called (énfasis)", options: ["I", "me", "my", "mine"], correctAnswer: "I", explanation: "I después de 'it was'" },
            { type: "fill", question: "He is taller than ___ (yo - formal)", correctAnswer: "I", explanation: "Than I (formal)" },
            { question: "___ going? (¿Quién va?)", options: ["Who's", "Whose", "Who", "Whom"], correctAnswer: "Who's", explanation: "Who's = who is" },
            { question: "___ book is this? (¿De quién?)", options: ["Who's", "Whose", "Who", "Whom"], correctAnswer: "Whose", explanation: "Whose = de quién" },
            { type: "fill", question: "Each student must bring ___ own book (neutral)", correctAnswer: "their", explanation: "Their singular neutral" },
            { question: "The team won ___ match (equipo)", options: ["it's", "its", "their", "theirs"], correctAnswer: "its", explanation: "Its para team" },
            { question: "Neither John nor Mary brought ___ book", options: ["his", "her", "their", "its"], correctAnswer: "their", explanation: "Their para neither...nor" },
            { type: "fill", question: "The committee made ___ decision", correctAnswer: "its", explanation: "Its para committee" },
            { question: "Everyone should do ___ best", options: ["his", "their", "his or her", "its"], correctAnswer: "their", explanation: "Their para everyone" },
            { question: "Is this ___? (¿Es tuyo?)", options: ["your", "yours", "your's", "yours'"], correctAnswer: "yours", explanation: "Yours sin apóstrofe" },
            { type: "fill", question: "Nobody raised ___ hand (nadie)", correctAnswer: "their", explanation: "Their para nobody" },
            { question: "___ to blame? (¿Quién?)", options: ["Who is", "Whom is", "Whose is", "Who's"], correctAnswer: "Who is", explanation: "Who is en preguntas" },
            { question: "For ___ did you buy this? (formal)", options: ["who", "whom", "whose", "what"], correctAnswer: "whom", explanation: "Whom formal" },
            { type: "fill", question: "Let's keep this between ___ (nosotros)", correctAnswer: "us", explanation: "Between us" },
            { question: "The car ___ is very fast (posesión)", options: ["it's", "its", "its'", "it is"], correctAnswer: "its", explanation: "Its sin apóstrofe" },
            { question: "Anyone can do it if ___ tries", options: ["he", "they", "he or she", "it"], correctAnswer: "they", explanation: "Singular they" },
            { type: "fill", question: "We enjoyed ___ (pasarlo bien)", correctAnswer: "ourselves", explanation: "Enjoy ourselves" },
            { question: "Help ___ to some cake (sírvete)", options: ["you", "your", "yourself", "yours"], correctAnswer: "yourself", explanation: "Help yourself" },
            { question: "Pride ___ on quality", options: ["us", "ourselves", "ourself", "ours"], correctAnswer: "ourselves", explanation: "Pride ourselves" }
          ])
        }
      ]
    },
    // 3. PRESENTE SIMPLE
    {
      id: "present-simple",
      title: "Presente Simple",
      description: "Hábitos, rutinas, verdades universales",
      icon: Clock,
      color: "from-blue-500 to-cyan-500",
      tests: [
        {
          id: 1,
          level: "Fácil",
          description: "Formación básica afirmativa",
          questions: generateQuestions("basic", [
            { question: "I ___ to school every day", options: ["go", "goes", "going", "to go"], correctAnswer: "go", explanation: "I + verbo base" },
            { type: "fill", question: "We ___ English (estudiar)", correctAnswer: "study", explanation: "We + verbo base" },
            { question: "They ___ pizza", options: ["like", "likes", "liking", "to like"], correctAnswer: "like", explanation: "They + verbo base" },
            { type: "fill", question: "You ___ fast (correr)", correctAnswer: "run", explanation: "You + verbo base" },
            { question: "I ___ water every day", options: ["drink", "drinks", "drinking", "drinked"], correctAnswer: "drink", explanation: "I + verbo base" },
            { type: "fill", question: "We ___ in Mexico (vivir)", correctAnswer: "live", explanation: "We + verbo base" },
            { question: "You ___ English very well", options: ["speak", "speaks", "speaking", "to speak"], correctAnswer: "speak", explanation: "You + verbo base" },
            { type: "fill", question: "They ___ breakfast (comer)", correctAnswer: "eat", explanation: "They + verbo base" },
            { question: "I ___ my homework", options: ["do", "does", "doing", "to do"], correctAnswer: "do", explanation: "I + verbo base" },
            { type: "fill", question: "We ___ soccer (jugar)", correctAnswer: "play", explanation: "We + verbo base" }
          ])
        },
        {
          id: 2,
          level: "Fácil",
          description: "Tercera persona singular (-s/-es)",
          questions: generateQuestions("basic", [
            { question: "She ___ to music", options: ["listen", "listens", "listening", "listened"], correctAnswer: "listens", explanation: "She + verb + s" },
            { type: "fill", question: "He ___ every day (trabajar)", correctAnswer: "works", explanation: "He + verb + s" },
            { question: "It ___ at 7 AM", options: ["start", "starts", "starting", "started"], correctAnswer: "starts", explanation: "It + verb + s" },
            { type: "fill", question: "She ___ English (estudiar)", correctAnswer: "studies", explanation: "y → ies" },
            { question: "He ___ to school", options: ["go", "goes", "going", "gos"], correctAnswer: "goes", explanation: "go → goes" },
            { type: "fill", question: "The dog ___ loudly (ladrar)", correctAnswer: "barks", explanation: "The dog + verb + s" },
            { question: "Maria ___ TV", options: ["watch", "watchs", "watches", "watching"], correctAnswer: "watches", explanation: "ch + es" },
            { type: "fill", question: "He ___ breakfast (comer)", correctAnswer: "eats", explanation: "He + verb + s" },
            { question: "It ___ in winter", options: ["snow", "snows", "snowing", "snowed"], correctAnswer: "snows", explanation: "It + verb + s" },
            { type: "fill", question: "She ___ the dishes (lavar)", correctAnswer: "washes", explanation: "wash + es" }
          ])
        },
        {
          id: 3,
          level: "Intermedio",
          description: "Negativo e interrogativo",
          questions: generateQuestions("intermediate", [
            { question: "I ___ like coffee", options: ["don't", "doesn't", "not", "am not"], correctAnswer: "don't", explanation: "I + don't + verbo base" },
            { type: "fill", question: "She ___ speak French (negativo)", correctAnswer: "doesn't", explanation: "She + doesn't" },
            { question: "___ you play tennis?", options: ["Do", "Does", "Are", "Is"], correctAnswer: "Do", explanation: "Do + you" },
            { type: "fill", question: "___ he work here? (pregunta)", correctAnswer: "does", explanation: "Does + he" },
            { question: "They ___ eat meat", options: ["don't", "doesn't", "not", "aren't"], correctAnswer: "don't", explanation: "They + don't" },
            { type: "fill", question: "He ___ like pizza (negativo)", correctAnswer: "doesn't", explanation: "He + doesn't" },
            { question: "___ she live here?", options: ["Do", "Does", "Is", "Are"], correctAnswer: "Does", explanation: "Does + she" },
            { type: "fill", question: "We ___ watch TV (negativo)", correctAnswer: "don't", explanation: "We + don't" },
            { question: "___ they speak Spanish?", options: ["Do", "Does", "Are", "Is"], correctAnswer: "Do", explanation: "Do + they" },
            { type: "fill", question: "It ___ rain here (negativo)", correctAnswer: "doesn't", explanation: "It + doesn't" },
            { question: "She ___ work on Sundays", options: ["don't", "doesn't", "not", "isn't"], correctAnswer: "doesn't", explanation: "She + doesn't" },
            { type: "fill", question: "___ you like chocolate? (pregunta)", correctAnswer: "do", explanation: "Do + you" },
            { question: "I ___ understand", options: ["don't", "doesn't", "not", "am not"], correctAnswer: "don't", explanation: "I + don't" },
            { type: "fill", question: "___ it work properly?", correctAnswer: "does", explanation: "Does + it" },
            { question: "They ___ know the answer", options: ["don't", "doesn't", "not", "aren't"], correctAnswer: "don't", explanation: "They + don't" }
          ])
        },
        {
          id: 4,
          level: "Intermedio",
          description: "Adverbios de frecuencia",
          questions: generateQuestions("intermediate", [
            { question: "I ___ go to the gym", options: ["always", "am always", "always am", "be always"], correctAnswer: "always", explanation: "Adverbio antes del verbo" },
            { type: "fill", question: "She is ___ late (nunca)", correctAnswer: "never", explanation: "Be + adverbio" },
            { question: "They ___ play soccer", options: ["often", "are often", "often are", "be often"], correctAnswer: "often", explanation: "Adverbio antes del verbo" },
            { type: "fill", question: "He ___ drinks coffee (usualmente)", correctAnswer: "usually", explanation: "Usually antes del verbo" },
            { question: "We are ___ happy", options: ["usually", "usually are", "are usually", "be usually"], correctAnswer: "usually", explanation: "Be + adverbio" },
            { type: "fill", question: "I ___ eat breakfast (a veces)", correctAnswer: "sometimes", explanation: "Sometimes antes del verbo" },
            { question: "She is ___ on time", options: ["always", "always is", "is always", "be always"], correctAnswer: "always", explanation: "Be + always" },
            { type: "fill", question: "They ___ go there (raramente)", correctAnswer: "rarely", explanation: "Rarely antes del verbo" },
            { question: "He ___ watches TV", options: ["never", "doesn't never", "don't never", "no never"], correctAnswer: "never", explanation: "Never solo" },
            { type: "fill", question: "We are ___ tired (frecuentemente)", correctAnswer: "often", explanation: "Be + often" },
            { question: "I ___ forget my keys", options: ["sometimes", "am sometimes", "sometimes am", "be sometimes"], correctAnswer: "sometimes", explanation: "Sometimes antes del verbo" },
            { type: "fill", question: "She ___ cooks at home (always)", correctAnswer: "always", explanation: "Always antes del verbo" },
            { question: "They are ___ busy", options: ["usually", "usually are", "are usually", "be usually"], correctAnswer: "usually", explanation: "Be + usually" },
            { type: "fill", question: "He is ___ angry (never)", correctAnswer: "never", explanation: "Be + never" },
            { question: "We ___ have lunch at 12", options: ["usually", "are usually", "usually are", "be usually"], correctAnswer: "usually", explanation: "Usually antes del verbo" }
          ])
        },
        {
          id: 5,
          level: "Difícil",
          description: "Casos especiales y verbos irregulares",
          questions: generateQuestions("advanced", [
            { question: "He ___ to work by bus", options: ["go", "goes", "gos", "going"], correctAnswer: "goes", explanation: "go → goes" },
            { type: "fill", question: "She ___ her homework (hacer)", correctAnswer: "does", explanation: "do → does" },
            { question: "It ___ three bedrooms", options: ["have", "has", "haves", "having"], correctAnswer: "has", explanation: "have → has" },
            { type: "fill", question: "Water ___ at 100°C (hervir)", correctAnswer: "boils", explanation: "Verdad universal" },
            { question: "The sun ___ in the east", options: ["rise", "rises", "risis", "rising"], correctAnswer: "rises", explanation: "Verdad universal" },
            { type: "fill", question: "She ___ grammar (teach)", correctAnswer: "teaches", explanation: "teach + es" },
            { question: "He ___ the guitar", options: ["play", "plays", "playes", "playing"], correctAnswer: "plays", explanation: "play + s" },
            { type: "fill", question: "The class ___ at 9 (comenzar)", correctAnswer: "starts", explanation: "The class + verb + s" },
            { question: "She ___ English and French", options: ["speak", "speaks", "speakes", "speaking"], correctAnswer: "speaks", explanation: "speak + s" },
            { type: "fill", question: "He ___ hard (trabajar)", correctAnswer: "works", explanation: "work + s" },
            { question: "The train ___ at 7 PM", options: ["leave", "leaves", "leafs", "leaving"], correctAnswer: "leaves", explanation: "leave + s" },
            { type: "fill", question: "She ___ a new car (tener)", correctAnswer: "has", explanation: "have → has" },
            { question: "He ___ to the gym daily", options: ["go", "goes", "gos", "going"], correctAnswer: "goes", explanation: "go → goes" },
            { type: "fill", question: "It ___ a lot here (llover)", correctAnswer: "rains", explanation: "rain + s" },
            { question: "She always ___ her best", options: ["do", "does", "dos", "doing"], correctAnswer: "does", explanation: "do → does" },
            { type: "fill", question: "The movie ___ two hours (durar)", correctAnswer: "lasts", explanation: "last + s" },
            { question: "Earth ___ around the sun", options: ["move", "moves", "movis", "moving"], correctAnswer: "moves", explanation: "Verdad científica" },
            { type: "fill", question: "He ___ Spanish (teach)", correctAnswer: "teaches", explanation: "teach + es" },
            { question: "She ___ her car every week", options: ["wash", "washs", "washes", "washing"], correctAnswer: "washes", explanation: "wash + es" },
            { type: "fill", question: "The shop ___ at 9 (open)", correctAnswer: "opens", explanation: "open + s" }
          ])
        },
        {
          id: 6,
          level: "Difícil",
          description: "Presente simple vs continuo",
          questions: generateQuestions("advanced", [
            { type: "match", question: "Une cada uso con su tiempo:", pairs: [
              { left: "Rutina diaria", right: "Present Simple" },
              { left: "Ahora mismo", right: "Present Continuous" },
              { left: "Verdad universal", right: "Present Simple" },
              { left: "Acción temporal", right: "Present Continuous" },
              { left: "Hábito", right: "Present Simple" }
            ], correctAnswer: "" },
            { question: "I ___ coffee every morning (hábito)", options: ["drink", "am drinking", "drinks", "drinking"], correctAnswer: "drink", explanation: "Hábito = simple" },
            { question: "I ___ coffee right now (ahora)", options: ["drink", "am drinking", "drinks", "drinking"], correctAnswer: "am drinking", explanation: "Ahora = continuous" },
            { type: "fill", question: "She usually ___ at 7, but today she ___ at 8 (wake up)", correctAnswer: "wakes up is waking up", explanation: "Usually = simple / today = continuous" },
            { question: "Water ___ at 100°C (fact)", options: ["boil", "boils", "is boiling", "are boiling"], correctAnswer: "boils", explanation: "Hecho científico" },
            { question: "The water ___. Turn off the stove!", options: ["boil", "boils", "is boiling", "boiling"], correctAnswer: "is boiling", explanation: "Acción en progreso" },
            { type: "fill", question: "He ___ in London, but this week he ___ in Paris (live/stay)", correctAnswer: "lives is staying", explanation: "Permanente = simple / temporal = continuous" },
            { question: "I ___ you're right (agree)", options: ["think", "am thinking", "thinks", "thinking"], correctAnswer: "think", explanation: "State verb" },
            { question: "What ___ about? (pensar activamente)", options: ["do you think", "are you thinking", "you think", "you thinking"], correctAnswer: "are you thinking", explanation: "Proceso mental" },
            { type: "fill", question: "I ___ you (love)", correctAnswer: "love", explanation: "State verb" },
            { question: "She ___ for her exam (estudiar ahora)", options: ["study", "studies", "is studying", "studying"], correctAnswer: "is studying", explanation: "Ahora = continuous" },
            { question: "She ___ every day (estudiar rutina)", options: ["study", "studies", "is studying", "studying"], correctAnswer: "studies", explanation: "Rutina = simple" },
            { type: "fill", question: "I ___ this tastes good (think = opinar)", correctAnswer: "think", explanation: "Opinar = state verb" },
            { question: "He ___ English (saber)", options: ["know", "knows", "is knowing", "knowing"], correctAnswer: "knows", explanation: "Know = state verb" },
            { question: "They ___ a house (have = poseer)", options: ["have", "has", "are having", "having"], correctAnswer: "have", explanation: "Posesión = state verb" },
            { question: "They ___ dinner (have = comer ahora)", options: ["have", "has", "are having", "having"], correctAnswer: "are having", explanation: "Comer = acción" },
            { type: "fill", question: "The earth ___ around the sun (move)", correctAnswer: "moves", explanation: "Hecho científico" },
            { question: "I ___ a shower (take ahora)", options: ["take", "takes", "am taking", "taking"], correctAnswer: "am taking", explanation: "Ahora = continuous" },
            { question: "I ___ a shower every morning (rutina)", options: ["take", "takes", "am taking", "taking"], correctAnswer: "take", explanation: "Rutina = simple" },
            { type: "fill", question: "This book ___ to me (belong)", correctAnswer: "belongs", explanation: "Belong = state verb" }
          ])
        }
      ]
    },
    // 4. PRESENTE CONTINUO
    {
      id: "present-continuous",
      title: "Presente Continuo",
      description: "Acciones en progreso ahora",
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
      tests: [
        {
          id: 1,
          level: "Fácil",
          description: "Formación básica con -ing",
          questions: generateQuestions("basic", [
            { question: "I ___ studying now", options: ["is", "am", "are", "be"], correctAnswer: "am", explanation: "I am + verb-ing" },
            { type: "fill", question: "She ___ working (estar)", correctAnswer: "is", explanation: "She is + verb-ing" },
            { question: "They ___ playing soccer", options: ["is", "am", "are", "be"], correctAnswer: "are", explanation: "They are + verb-ing" },
            { type: "fill", question: "We ___ watching TV (estar)", correctAnswer: "are", explanation: "We are + verb-ing" },
            { question: "He ___ reading a book", options: ["is", "am", "are", "be"], correctAnswer: "is", explanation: "He is + verb-ing" },
            { type: "fill", question: "I ___ eating dinner (comer)", correctAnswer: "am", explanation: "I am + verb-ing" },
            { question: "You ___ talking too much", options: ["is", "am", "are", "be"], correctAnswer: "are", explanation: "You are + verb-ing" },
            { type: "fill", question: "It ___ raining (llover)", correctAnswer: "is", explanation: "It is + verb-ing" },
            { question: "We ___ learning English", options: ["is", "am", "are", "be"], correctAnswer: "are", explanation: "We are + verb-ing" },
            { type: "fill", question: "They ___ running (correr)", correctAnswer: "are", explanation: "They are + verb-ing" }
          ])
        },
        {
          id: 2,
          level: "Fácil",
          description: "Verbos comunes en -ing",
          questions: generateQuestions("basic", [
            { question: "I am ___ (go)", options: ["go", "going", "goin", "goes"], correctAnswer: "going", explanation: "go → going" },
            { type: "fill", question: "She is ___ (run)", correctAnswer: "running", explanation: "run → running (dobla consonante)" },
            { question: "They are ___ (play)", options: ["play", "playing", "plaing", "playes"], correctAnswer: "playing", explanation: "play → playing" },
            { type: "fill", question: "We are ___ (swim)", correctAnswer: "swimming", explanation: "swim → swimming (dobla consonante)" },
            { question: "He is ___ (read)", options: ["read", "reading", "readding", "reads"], correctAnswer: "reading", explanation: "read → reading" },
            { type: "fill", question: "I am ___ (write)", correctAnswer: "writing", explanation: "write → writing (pierde e)" },
            { question: "You are ___ (sleep)", options: ["sleep", "sleeping", "slepping", "sleeps"], correctAnswer: "sleeping", explanation: "sleep → sleeping" },
            { type: "fill", question: "It is ___ (rain)", correctAnswer: "raining", explanation: "rain → raining" },
            { question: "We are ___ (study)", options: ["study", "studying", "studiing", "studies"], correctAnswer: "studying", explanation: "study → studying" },
            { type: "fill", question: "They are ___ (sit)", correctAnswer: "sitting", explanation: "sit → sitting (dobla consonante)" }
          ])
        },
        {
          id: 3,
          level: "Intermedio",
          description: "Negativo e interrogativo",
          questions: generateQuestions("intermediate", [
            { question: "I ___ not working", options: ["is", "am", "are", "be"], correctAnswer: "am", explanation: "I am not + verb-ing" },
            { type: "fill", question: "She ___ not studying (negativo)", correctAnswer: "is", explanation: "She is not" },
            { question: "___ you listening?", options: ["Is", "Am", "Are", "Be"], correctAnswer: "Are", explanation: "Are you + verb-ing?" },
            { type: "fill", question: "___ he sleeping? (pregunta)", correctAnswer: "is", explanation: "Is he + verb-ing?" },
            { question: "They ___ not coming", options: ["is", "am", "are", "be"], correctAnswer: "are", explanation: "They are not" },
            { type: "fill", question: "We ___ not playing (negativo)", correctAnswer: "are", explanation: "We are not" },
            { question: "___ she working today?", options: ["Is", "Am", "Are", "Be"], correctAnswer: "Is", explanation: "Is she + verb-ing?" },
            { type: "fill", question: "He ___ not eating (negativo)", correctAnswer: "is", explanation: "He is not" },
            { question: "___ they watching TV?", options: ["Is", "Am", "Are", "Be"], correctAnswer: "Are", explanation: "Are they + verb-ing?" },
            { type: "fill", question: "I ___ not going (negativo)", correctAnswer: "am", explanation: "I am not" },
            { question: "It ___ not raining", options: ["is", "am", "are", "be"], correctAnswer: "is", explanation: "It is not" },
            { type: "fill", question: "___ you coming? (pregunta)", correctAnswer: "are", explanation: "Are you + verb-ing?" },
            { question: "She ___ not reading", options: ["is", "am", "are", "be"], correctAnswer: "is", explanation: "She is not" },
            { type: "fill", question: "___ it working?", correctAnswer: "is", explanation: "Is it + verb-ing?" },
            { question: "We ___ not talking", options: ["is", "am", "are", "be"], correctAnswer: "are", explanation: "We are not" }
          ])
        },
        {
          id: 4,
          level: "Intermedio",
          description: "Verbos que no usan continuo",
          questions: generateQuestions("intermediate", [
            { question: "I ___ you (love - state verb)", options: ["love", "am loving", "loves", "loving"], correctAnswer: "love", explanation: "Love NO usa continuous" },
            { type: "fill", question: "She ___ English (know - state verb)", correctAnswer: "knows", explanation: "Know NO usa continuous" },
            { question: "They ___ a car (have - poseer)", options: ["have", "are having", "has", "having"], correctAnswer: "have", explanation: "Have = posesión NO usa continuous" },
            { type: "fill", question: "I ___ you're right (think - opinión)", correctAnswer: "think", explanation: "Think = opinión NO usa continuous" },
            { question: "He ___ to me (belong)", options: ["belong", "is belonging", "belongs", "belonging"], correctAnswer: "belongs", explanation: "Belong NO usa continuous" },
            { type: "fill", question: "We ___ chocolate (like)", correctAnswer: "like", explanation: "Like NO usa continuous" },
            { question: "She ___ the answer (know)", options: ["know", "is knowing", "knows", "knowing"], correctAnswer: "knows", explanation: "Know NO usa continuous" },
            { type: "fill", question: "It ___ good (smell - opinión)", correctAnswer: "smells", explanation: "Smell = opinión NO usa continuous" },
            { question: "I ___ what you mean (understand)", options: ["understand", "am understanding", "understands", "understanding"], correctAnswer: "understand", explanation: "Understand NO usa continuous" },
            { type: "fill", question: "He ___ help (need)", correctAnswer: "needs", explanation: "Need NO usa continuous" },
            { question: "They ___ two children (have - poseer)", options: ["have", "are having", "has", "having"], correctAnswer: "have", explanation: "Have = posesión NO usa continuous" },
            { type: "fill", question: "I ___ her name (remember)", correctAnswer: "remember", explanation: "Remember NO usa continuous" },
            { question: "She ___ tired (feel - estado)", options: ["feel", "is feeling", "feels", "feeling"], correctAnswer: "feels", explanation: "Feel = estado NO usa continuous" },
            { type: "fill", question: "We ___ a car (own)", correctAnswer: "own", explanation: "Own NO usa continuous" },
            { question: "It ___ to my brother (belong)", options: ["belong", "is belonging", "belongs", "belonging"], correctAnswer: "belongs", explanation: "Belong NO usa continuous" }
          ])
        },
        {
          id: 5,
          level: "Difícil",
          description: "Presente continuo para futuro",
          questions: generateQuestions("advanced", [
            { question: "I ___ tomorrow (leave - futuro planificado)", options: ["leave", "am leaving", "leaves", "will leave"], correctAnswer: "am leaving", explanation: "Continuous para planes definidos" },
            { type: "fill", question: "She ___ to London next week (fly)", correctAnswer: "is flying", explanation: "Continuous para futuro planificado" },
            { question: "They ___ us tonight (visit - plan)", options: ["visit", "are visiting", "visits", "will visit"], correctAnswer: "are visiting", explanation: "Continuous para plan definido" },
            { type: "fill", question: "We ___ dinner at 8 PM (have - plan)", correctAnswer: "are having", explanation: "Continuous para plan" },
            { question: "He ___ his exam tomorrow (take - futuro)", options: ["take", "is taking", "takes", "will take"], correctAnswer: "is taking", explanation: "Continuous para futuro planificado" },
            { type: "fill", question: "I ___ my friend later (meet - plan)", correctAnswer: "am meeting", explanation: "Continuous para cita" },
            { question: "What ___ this weekend? (you do)", options: ["do you do", "are you doing", "you do", "you doing"], correctAnswer: "are you doing", explanation: "Continuous para planes futuros" },
            { type: "fill", question: "They ___ married next month (get)", correctAnswer: "are getting", explanation: "Continuous para futuro definido" },
            { question: "She ___ to Paris tomorrow (go - futuro)", options: ["go", "is going", "goes", "will go"], correctAnswer: "is going", explanation: "Continuous para plan" },
            { type: "fill", question: "We ___ the house next year (sell)", correctAnswer: "are selling", explanation: "Continuous para futuro planificado" },
            { question: "When ___ ? (you leave)", options: ["do you leave", "are you leaving", "you leave", "you leaving"], correctAnswer: "are you leaving", explanation: "Continuous para futuro" },
            { type: "fill", question: "I ___ my parents this Sunday (visit)", correctAnswer: "am visiting", explanation: "Continuous para plan definido" },
            { question: "They ___ a party on Saturday (have - futuro)", options: ["have", "are having", "has", "will have"], correctAnswer: "are having", explanation: "Continuous para evento planificado" },
            { type: "fill", question: "He ___ for a new job (look - temporal)", correctAnswer: "is looking", explanation: "Continuous para situación temporal" },
            { question: "Where ___ for vacation? (you go)", options: ["do you go", "are you going", "you go", "you going"], correctAnswer: "are you going", explanation: "Continuous para planes" },
            { type: "fill", question: "She ___ at home this week (stay)", correctAnswer: "is staying", explanation: "Continuous para temporal" },
            { question: "I ___ my parents next weekend (visit)", options: ["visit", "am visiting", "visits", "will visit"], correctAnswer: "am visiting", explanation: "Continuous para plan" },
            { type: "fill", question: "We ___ to Spain in July (travel)", correctAnswer: "are traveling", explanation: "Continuous para futuro" },
            { question: "The movie ___ at 7 PM (start - schedule)", options: ["start", "is starting", "starts", "will start"], correctAnswer: "starts", explanation: "Simple para horarios fijos" },
            { type: "fill", question: "They ___ tomorrow morning (arrive)", correctAnswer: "are arriving", explanation: "Continuous para futuro planificado" }
          ])
        },
        {
          id: 6,
          level: "Difícil",
          description: "Usos avanzados y expresiones",
          questions: generateQuestions("advanced", [
            { question: "You ___ always complaining! (fastidio)", options: ["is", "am", "are", "be"], correctAnswer: "are", explanation: "Always + continuous = fastidio" },
            { type: "fill", question: "He ___ always losing his keys! (irritación)", correctAnswer: "is", explanation: "Always + continuous = irritación" },
            { question: "She ___ forever talking! (exageración)", options: ["is", "am", "are", "be"], correctAnswer: "is", explanation: "Forever + continuous = exageración" },
            { type: "fill", question: "I ___ tired of waiting (getting)", correctAnswer: "am getting", explanation: "Getting + adj = cambio gradual" },
            { question: "The weather ___ worse (get - cambio)", options: ["get", "is getting", "gets", "will get"], correctAnswer: "is getting", explanation: "Continuous para cambio gradual" },
            { type: "fill", question: "It ___ dark (get - cambio)", correctAnswer: "is getting", explanation: "Getting = volviéndose" },
            { question: "People ___ more health-conscious (become)", options: ["become", "are becoming", "becomes", "will become"], correctAnswer: "are becoming", explanation: "Continuous para tendencia" },
            { type: "fill", question: "Prices ___ higher (get)", correctAnswer: "are getting", explanation: "Continuous para cambio gradual" },
            { question: "Technology ___ faster (develop - tendencia)", options: ["develop", "is developing", "develops", "will develop"], correctAnswer: "is developing", explanation: "Continuous para cambio continuo" },
            { type: "fill", question: "The population ___ rapidly (grow)", correctAnswer: "is growing", explanation: "Continuous para tendencia" },
            { question: "You ___ constantly interrupting me!", options: ["is", "am", "are", "be"], correctAnswer: "are", explanation: "Constantly + continuous = irritación" },
            { type: "fill", question: "She ___ better at English (get)", correctAnswer: "is getting", explanation: "Getting better = mejorando" },
            { question: "I ___ more and more tired (feel)", options: ["feel", "am feeling", "feels", "will feel"], correctAnswer: "am feeling", explanation: "Continuous para cambio" },
            { type: "fill", question: "He ___ constantly asking questions!", correctAnswer: "is", explanation: "Constantly + continuous = fastidio" },
            { question: "The world ___ smaller (get - metáfora)", options: ["get", "is getting", "gets", "will get"], correctAnswer: "is getting", explanation: "Continuous para cambio percibido" },
            { type: "fill", question: "I ___ older (get)", correctAnswer: "am getting", explanation: "Getting older = envejeciendo" },
            { question: "She ___ always borrowing my things!", options: ["is", "am", "are", "be"], correctAnswer: "is", explanation: "Always + continuous = irritación" },
            { type: "fill", question: "Costs ___ higher and higher (go)", correctAnswer: "are going", explanation: "Continuous para aumento continuo" },
            { question: "I ___ increasingly worried (become)", options: ["become", "am becoming", "becomes", "will become"], correctAnswer: "am becoming", explanation: "Continuous para cambio gradual" },
            { type: "fill", question: "Life ___ more expensive (get)", correctAnswer: "is getting", explanation: "Getting = volviéndose" }
          ])
        }
      ]
    },
    // 5. PASADO SIMPLE
    {
      id: "past-simple",
      title: "Pasado Simple",
      description: "Acciones completadas en el pasado",
      icon: Globe,
      color: "from-red-500 to-rose-500",
      tests: [
        {
          id: 1,
          level: "Fácil",
          description: "Verbos regulares (-ed)",
          questions: generateQuestions("basic", [
            { question: "I ___ yesterday (work)", options: ["work", "worked", "working", "works"], correctAnswer: "worked", explanation: "work + ed" },
            { type: "fill", question: "She ___ to music (listen)", correctAnswer: "listened", explanation: "listen + ed" },
            { question: "They ___ soccer (play)", options: ["play", "played", "playing", "plays"], correctAnswer: "played", explanation: "play + ed" },
            { type: "fill", question: "We ___ English (study)", correctAnswer: "studied", explanation: "y → ied" },
            { question: "He ___ his homework (finish)", options: ["finish", "finished", "finishing", "finishes"], correctAnswer: "finished", explanation: "finish + ed" },
            { type: "fill", question: "I ___ TV last night (watch)", correctAnswer: "watched", explanation: "watch + ed" },
            { question: "She ___ me (help)", options: ["help", "helped", "helping", "helps"], correctAnswer: "helped", explanation: "help + ed" },
            { type: "fill", question: "They ___ to school (walk)", correctAnswer: "walked", explanation: "walk + ed" },
            { question: "We ___ at home (stay)", options: ["stay", "stayed", "staying", "stays"], correctAnswer: "stayed", explanation: "stay + ed" },
            { type: "fill", question: "He ___ the door (close)", correctAnswer: "closed", explanation: "close + d" }
          ])
        },
        {
          id: 2,
          level: "Fácil",
          description: "Verbos irregulares comunes",
          questions: generateQuestions("basic", [
            { question: "I ___ to London last year (go)", options: ["go", "goed", "went", "gone"], correctAnswer: "went", explanation: "go → went" },
            { type: "fill", question: "She ___ a movie (see)", correctAnswer: "saw", explanation: "see → saw" },
            { question: "They ___ pizza (eat)", options: ["eat", "eated", "ate", "eaten"], correctAnswer: "ate", explanation: "eat → ate" },
            { type: "fill", question: "We ___ English (speak)", correctAnswer: "spoke", explanation: "speak → spoke" },
            { question: "He ___ the answer (know)", options: ["know", "knowed", "knew", "known"], correctAnswer: "knew", explanation: "know → knew" },
            { type: "fill", question: "I ___ a book (read)", correctAnswer: "read", explanation: "read → read (pronunciación diferente)" },
            { question: "She ___ a letter (write)", options: ["write", "writed", "wrote", "written"], correctAnswer: "wrote", explanation: "write → wrote" },
            { type: "fill", question: "They ___ to music (listen → hear)", correctAnswer: "heard", explanation: "hear → heard" },
            { question: "We ___ home (come)", options: ["come", "comed", "came", "camed"], correctAnswer: "came", explanation: "come → came" },
            { type: "fill", question: "He ___ the bus (take)", correctAnswer: "took", explanation: "take → took" }
          ])
        },
        {
          id: 3,
          level: "Intermedio",
          description: "Negativo e interrogativo con did",
          questions: generateQuestions("intermediate", [
            { question: "I ___ go yesterday", options: ["don't", "didn't", "doesn't", "not"], correctAnswer: "didn't", explanation: "didn't + verbo base" },
            { type: "fill", question: "She ___ work last week (negativo)", correctAnswer: "didn't", explanation: "didn't + verbo base" },
            { question: "___ you see the movie?", options: ["Do", "Does", "Did", "Done"], correctAnswer: "Did", explanation: "Did + sujeto + verbo base?" },
            { type: "fill", question: "___ he come? (pregunta)", correctAnswer: "did", explanation: "Did + verbo base?" },
            { question: "They ___ eat meat", options: ["don't", "didn't", "doesn't", "not"], correctAnswer: "didn't", explanation: "didn't + verbo base" },
            { type: "fill", question: "We ___ go to the party (negativo)", correctAnswer: "didn't", explanation: "didn't + verbo base" },
            { question: "___ she call you?", options: ["Do", "Does", "Did", "Done"], correctAnswer: "Did", explanation: "Did + sujeto + verbo base?" },
            { type: "fill", question: "He ___ study (negativo)", correctAnswer: "didn't", explanation: "didn't + verbo base" },
            { question: "___ they arrive on time?", options: ["Do", "Does", "Did", "Done"], correctAnswer: "Did", explanation: "Did + verbo base?" },
            { type: "fill", question: "I ___ see him (negativo)", correctAnswer: "didn't", explanation: "didn't + verbo base" },
            { question: "She ___ know the answer", options: ["don't", "didn't", "doesn't", "not"], correctAnswer: "didn't", explanation: "didn't + verbo base" },
            { type: "fill", question: "___ you like it? (pregunta)", correctAnswer: "did", explanation: "Did + verbo base?" },
            { question: "We ___ understand", options: ["don't", "didn't", "doesn't", "not"], correctAnswer: "didn't", explanation: "didn't + verbo base" },
            { type: "fill", question: "___ it work?", correctAnswer: "did", explanation: "Did + verbo base?" },
            { question: "They ___ finish", options: ["don't", "didn't", "doesn't", "not"], correctAnswer: "didn't", explanation: "didn't + verbo base" }
          ])
        },
        {
          id: 4,
          level: "Intermedio",
          description: "Was/Were y to be en pasado",
          questions: generateQuestions("intermediate", [
            { question: "I ___ at home yesterday", options: ["is", "am", "was", "were"], correctAnswer: "was", explanation: "I was" },
            { type: "fill", question: "She ___ tired (estar)", correctAnswer: "was", explanation: "She was" },
            { question: "They ___ happy", options: ["is", "am", "was", "were"], correctAnswer: "were", explanation: "They were" },
            { type: "fill", question: "We ___ in London (estar)", correctAnswer: "were", explanation: "We were" },
            { question: "He ___ sick", options: ["is", "am", "was", "were"], correctAnswer: "was", explanation: "He was" },
            { type: "fill", question: "You ___ late (estar)", correctAnswer: "were", explanation: "You were" },
            { question: "It ___ cold", options: ["is", "am", "was", "were"], correctAnswer: "was", explanation: "It was" },
            { type: "fill", question: "I ___ not ready (negativo)", correctAnswer: "was", explanation: "I was not" },
            { question: "She ___ not there", options: ["is", "am", "was", "were"], correctAnswer: "was", explanation: "She was not" },
            { type: "fill", question: "They ___ not happy (negativo)", correctAnswer: "were", explanation: "They were not" },
            { question: "___ you at the party?", options: ["Is", "Am", "Was", "Were"], correctAnswer: "Were", explanation: "Were you?" },
            { type: "fill", question: "___ he angry? (pregunta)", correctAnswer: "was", explanation: "Was he?" },
            { question: "___ they at school?", options: ["Is", "Am", "Was", "Were"], correctAnswer: "Were", explanation: "Were they?" },
            { type: "fill", question: "It ___ not expensive (negativo)", correctAnswer: "was", explanation: "It was not" },
            { question: "We ___ not tired", options: ["is", "am", "was", "were"], correctAnswer: "were", explanation: "We were not" }
          ])
        },
        {
          id: 5,
          level: "Difícil",
          description: "Verbos irregulares avanzados",
          questions: generateQuestions("advanced", [
            { question: "I ___ my keys (lose)", options: ["losed", "losted", "lost", "lose"], correctAnswer: "lost", explanation: "lose → lost" },
            { type: "fill", question: "She ___ a mistake (make)", correctAnswer: "made", explanation: "make → made" },
            { question: "They ___ the truth (tell)", options: ["telled", "told", "tell", "telling"], correctAnswer: "told", explanation: "tell → told" },
            { type: "fill", question: "We ___ a new car (buy)", correctAnswer: "bought", explanation: "buy → bought" },
            { question: "He ___ English (teach)", options: ["teached", "taught", "teach", "teaching"], correctAnswer: "taught", explanation: "teach → taught" },
            { type: "fill", question: "I ___ my promise (keep)", correctAnswer: "kept", explanation: "keep → kept" },
            { question: "She ___ the race (win)", options: ["wined", "won", "win", "winning"], correctAnswer: "won", explanation: "win → won" },
            { type: "fill", question: "They ___ the problem (understand)", correctAnswer: "understood", explanation: "understand → understood" },
            { question: "We ___ all day (sleep)", options: ["sleeped", "slept", "sleep", "sleeping"], correctAnswer: "slept", explanation: "sleep → slept" },
            { type: "fill", question: "He ___ a song (sing)", correctAnswer: "sang", explanation: "sing → sang" },
            { question: "I ___ my bike (ride)", options: ["rided", "rode", "ride", "riding"], correctAnswer: "rode", explanation: "ride → rode" },
            { type: "fill", question: "She ___ the answer (forget)", correctAnswer: "forgot", explanation: "forget → forgot" },
            { question: "They ___ in the pool (swim)", options: ["swimmed", "swam", "swim", "swimming"], correctAnswer: "swam", explanation: "swim → swam" },
            { type: "fill", question: "We ___ him the news (tell)", correctAnswer: "told", explanation: "tell → told" },
            { question: "He ___ the door (shut)", options: ["shutted", "shut", "shuted", "shutting"], correctAnswer: "shut", explanation: "shut → shut (no cambia)" },
            { type: "fill", question: "I ___ my phone (lose)", correctAnswer: "lost", explanation: "lose → lost" },
            { question: "She ___ a letter (send)", options: ["sended", "sent", "send", "sending"], correctAnswer: "sent", explanation: "send → sent" },
            { type: "fill", question: "They ___ at the joke (laugh)", correctAnswer: "laughed", explanation: "laugh + ed (regular)" },
            { question: "We ___ a movie (choose)", options: ["choosed", "chose", "choose", "choosing"], correctAnswer: "chose", explanation: "choose → chose" },
            { type: "fill", question: "He ___ his coat (wear)", correctAnswer: "wore", explanation: "wear → wore" }
          ])
        },
        {
          id: 6,
          level: "Difícil",
          description: "Pasado simple vs continuo",
          questions: generateQuestions("advanced", [
            { type: "match", question: "Une situación con tiempo verbal:", pairs: [
              { left: "Acción completada", right: "Past Simple" },
              { left: "Acción en progreso", right: "Past Continuous" },
              { left: "Acción interrumpida", right: "Past Continuous + Simple" },
              { left: "Dos acciones simultáneas", right: "Past Continuous" },
              { left: "Secuencia de acciones", right: "Past Simple" }
            ], correctAnswer: "" },
            { question: "I ___ when you called (study - en progreso)", options: ["studied", "was studying", "am studying", "study"], correctAnswer: "was studying", explanation: "Acción en progreso = continuous" },
            { question: "She ___ at 8 PM (arrive - completada)", options: ["arrived", "was arriving", "is arriving", "arrive"], correctAnswer: "arrived", explanation: "Acción completada = simple" },
            { type: "fill", question: "They ___ when it ___ to rain (walk / start)", correctAnswer: "were walking started", explanation: "Continuous + simple" },
            { question: "What ___ when I saw you? (you do)", options: ["did you do", "were you doing", "do you do", "are you doing"], correctAnswer: "were you doing", explanation: "Acción en progreso" },
            { question: "I ___ the book and ___ to sleep (finish / go)", options: ["finished, went", "was finishing, was going", "finish, go", "am finishing, am going"], correctAnswer: "finished, went", explanation: "Secuencia = ambos simple" },
            { type: "fill", question: "While I ___, he ___ TV (cook / watch)", correctAnswer: "was cooking was watching", explanation: "Acciones simultáneas = ambos continuous" },
            { question: "The sun ___ when we woke up (shine)", options: ["shined", "was shining", "is shining", "shine"], correctAnswer: "was shining", explanation: "Acción en progreso en el pasado" },
            { type: "fill", question: "I ___ my keys while I ___ (lose / run)", correctAnswer: "lost was running", explanation: "Simple + continuous" },
            { question: "She ___ when she ___ the news (cry - acción corta)", options: ["cried, heard", "was crying, heard", "cried, was hearing", "was crying, was hearing"], correctAnswer: "was crying, heard", explanation: "Continuous + simple" },
            { type: "fill", question: "While they ___, I ___ (talk / arrive)", correctAnswer: "were talking arrived", explanation: "Continuous + simple" },
            { question: "It ___ all day yesterday (rain - todo el día)", options: ["rained", "was raining", "is raining", "rain"], correctAnswer: "was raining", explanation: "Duración larga = continuous" },
            { type: "fill", question: "He ___ and then he ___ (wake up / shower)", correctAnswer: "woke up showered", explanation: "Secuencia = ambos simple" },
            { question: "I ___ him while I ___ for the bus (see / wait)", options: ["saw, waited", "was seeing, was waiting", "saw, was waiting", "was seeing, waited"], correctAnswer: "saw, was waiting", explanation: "Simple + continuous" },
            { type: "fill", question: "What ___ when the lights went out? (you / do)", correctAnswer: "were you doing", explanation: "Acción en progreso cuando otra interrumpe" },
            { question: "She ___ dinner when I called (make)", options: ["made", "was making", "is making", "make"], correctAnswer: "was making", explanation: "Acción en progreso" },
            { type: "fill", question: "First I ___, then I ___ (eat / leave)", correctAnswer: "ate left", explanation: "Secuencia = simple" },
            { question: "The phone ___ while I ___ (ring / shower)", options: ["rang, showered", "was ringing, was showering", "rang, was showering", "was ringing, showered"], correctAnswer: "rang, was showering", explanation: "Simple interrumpe continuous" },
            { type: "fill", question: "They ___ cards when I ___ (play / arrive)", correctAnswer: "were playing arrived", explanation: "Continuous + simple" },
            { question: "I ___ three times yesterday (fall - acción repetida)", options: ["fell", "was falling", "am falling", "fall"], correctAnswer: "fell", explanation: "Acción repetida específica = simple" },
            { type: "fill", question: "He ___ TV all evening (watch - duración)", correctAnswer: "was watching", explanation: "Duración específica = continuous" }
          ])
        }
      ]
    },
    // 6. VERBOS MODALES
    {
      id: "modal-verbs",
      title: "Verbos Modales",
      description: "Can, could, should, must, may, might, would",
      icon: Brain,
      color: "from-cyan-500 to-blue-500",
      tests: [
        {
          id: 1,
          level: "Fácil",
          description: "Can para habilidad presente",
          questions: generateQuestions("basic", [
            { question: "I ___ swim", options: ["can", "cans", "to can", "caning"], correctAnswer: "can", explanation: "Can + verbo base" },
            { type: "fill", question: "She ___ speak English", correctAnswer: "can", explanation: "Can (sin -s en tercera persona)" },
            { question: "They ___ play soccer", options: ["can", "cans", "to can", "could"], correctAnswer: "can", explanation: "Can = habilidad presente" },
            { type: "fill", question: "We ___ help you", correctAnswer: "can", explanation: "Can = capacidad" },
            { question: "He ___ drive a car", options: ["can", "cans", "to can", "could"], correctAnswer: "can", explanation: "Can (no lleva -s)" },
            { type: "fill", question: "I ___ see the mountain", correctAnswer: "can", explanation: "Can = habilidad" },
            { question: "___ you speak French?", options: ["Can", "Cans", "To can", "Could"], correctAnswer: "Can", explanation: "Can en pregunta" },
            { type: "fill", question: "She ___ not swim", correctAnswer: "can", explanation: "Can not / cannot" },
            { question: "We ___ hear the music", options: ["can", "cans", "to can", "could"], correctAnswer: "can", explanation: "Can = capacidad" },
            { type: "fill", question: "They ___ run fast", correctAnswer: "can", explanation: "Can + verbo base" }
          ])
        },
        {
          id: 2,
          level: "Fácil",
          description: "Should para consejos",
          questions: generateQuestions("basic", [
            { question: "You ___ study more", options: ["should", "shoulds", "to should", "shoulding"], correctAnswer: "should", explanation: "Should = consejo" },
            { type: "fill", question: "He ___ eat healthy food", correctAnswer: "should", explanation: "Should + verbo base" },
            { question: "We ___ go to the doctor", options: ["should", "shoulds", "to should", "must"], correctAnswer: "should", explanation: "Should = recomendación" },
            { type: "fill", question: "She ___ rest more", correctAnswer: "should", explanation: "Should (sin -s)" },
            { question: "They ___ be careful", options: ["should", "shoulds", "to should", "could"], correctAnswer: "should", explanation: "Should = consejo" },
            { type: "fill", question: "I ___ not do that", correctAnswer: "should", explanation: "Should not" },
            { question: "___ I call him?", options: ["Should", "Shoulds", "To should", "Must"], correctAnswer: "Should", explanation: "Should en pregunta" },
            { type: "fill", question: "You ___ drink water", correctAnswer: "should", explanation: "Should = consejo" },
            { question: "He ___ apologize", options: ["should", "shoulds", "to should", "must"], correctAnswer: "should", explanation: "Should = debería" },
            { type: "fill", question: "We ___ save money", correctAnswer: "should", explanation: "Should = recomendación" }
          ])
        },
        {
          id: 3,
          level: "Intermedio",
          description: "Must vs Have to",
          questions: generateQuestions("intermediate", [
            { question: "I ___ finish this (obligación)", options: ["must", "have to", "musts", "has to"], correctAnswer: "must", explanation: "Must = obligación personal" },
            { type: "fill", question: "She ___ to go to work", correctAnswer: "has", explanation: "Has to = obligación externa" },
            { question: "You ___ wear a seatbelt", options: ["must", "have to", "musts", "has to"], correctAnswer: "must", explanation: "Must = ley" },
            { type: "fill", question: "They ___ to arrive early", correctAnswer: "have", explanation: "Have to = obligación" },
            { question: "He ___ study harder", options: ["must", "have to", "musts", "has to"], correctAnswer: "must", explanation: "Must = debe" },
            { type: "fill", question: "We ___ not smoke here", correctAnswer: "must", explanation: "Must not = prohibición" },
            { question: "She ___ to take medicine", options: ["must", "have to", "musts", "has to"], correctAnswer: "has to", explanation: "Has to (tercera persona)" },
            { type: "fill", question: "You ___ not be late", correctAnswer: "must", explanation: "Must not" },
            { question: "I don't ___ go", options: ["must", "have to", "musts", "has to"], correctAnswer: "have to", explanation: "Don't have to = no necesario" },
            { type: "fill", question: "He ___ not eat meat", correctAnswer: "must", explanation: "Must not = prohibición" },
            { question: "We ___ to be at 8", options: ["must", "have to", "musts", "has to"], correctAnswer: "have to", explanation: "Have to = obligación" },
            { type: "fill", question: "She ___ be tired", correctAnswer: "must", explanation: "Must = deducción" },
            { question: "You ___ to pay taxes", options: ["must", "have to", "musts", "has to"], correctAnswer: "have to", explanation: "Have to = obligación legal" },
            { type: "fill", question: "They ___ to wear uniforms", correctAnswer: "have", explanation: "Have to = regla" },
            { question: "This ___ be the place", options: ["must", "have to", "musts", "has to"], correctAnswer: "must", explanation: "Must = conclusión" }
          ])
        },
        {
          id: 4,
          level: "Intermedio",
          description: "Could (pasado y peticiones)",
          questions: generateQuestions("intermediate", [
            { question: "I ___ swim when I was 5", options: ["can", "could", "cans", "coulds"], correctAnswer: "could", explanation: "Could = habilidad pasada" },
            { type: "fill", question: "___ you help me?", correctAnswer: "could", explanation: "Could = petición cortés" },
            { question: "She ___ speak French as a child", options: ["can", "could", "cans", "coulds"], correctAnswer: "could", explanation: "Could = habilidad pasada" },
            { type: "fill", question: "We ___ not find it", correctAnswer: "could", explanation: "Could not = no pudimos" },
            { question: "___ I ask something?", options: ["Can", "Could", "Cans", "Coulds"], correctAnswer: "Could", explanation: "Could = más cortés" },
            { type: "fill", question: "They ___ play piano then", correctAnswer: "could", explanation: "Could = capacidad pasada" },
            { question: "He ___ run fast before", options: ["can", "could", "cans", "coulds"], correctAnswer: "could", explanation: "Could = antes" },
            { type: "fill", question: "___ you open the window?", correctAnswer: "could", explanation: "Could = petición" },
            { question: "I ___ see her yesterday", options: ["can", "could", "cans", "coulds"], correctAnswer: "could", explanation: "Could = pude" },
            { type: "fill", question: "She ___ not come", correctAnswer: "could", explanation: "Could not" },
            { question: "We ___ hear the noise", options: ["can", "could", "cans", "coulds"], correctAnswer: "could", explanation: "Could = pudimos" },
            { type: "fill", question: "___ I borrow your pen?", correctAnswer: "could", explanation: "Could = permiso" },
            { question: "They ___ solve it", options: ["can", "could", "cans", "coulds"], correctAnswer: "could", explanation: "Could = lograron" },
            { type: "fill", question: "He ___ not understand", correctAnswer: "could", explanation: "Could not" },
            { question: "___ you tell me the time?", options: ["Can", "Could", "Cans", "Coulds"], correctAnswer: "Could", explanation: "Could = más educado" }
          ])
        },
        {
          id: 5,
          level: "Difícil",
          description: "May, Might, Would",
          questions: generateQuestions("advanced", [
            { question: "It ___ rain tomorrow", options: ["may", "might", "must", "will"], correctAnswer: "may", explanation: "May = posibilidad 50%" },
            { type: "fill", question: "She ___ come (quizás)", correctAnswer: "might", explanation: "Might = posibilidad menor" },
            { question: "I ___ travel if I had money", options: ["will", "would", "may", "must"], correctAnswer: "would", explanation: "Would = hipótesis" },
            { type: "fill", question: "___ I use your phone?", correctAnswer: "may", explanation: "May = permiso formal" },
            { question: "He ___ be late", options: ["may", "might", "must", "will"], correctAnswer: "might", explanation: "Might = podría" },
            { type: "fill", question: "___ you like coffee?", correctAnswer: "would", explanation: "Would = ofrecimiento" },
            { question: "They ___ not agree", options: ["may", "might", "must", "will"], correctAnswer: "might", explanation: "Might not" },
            { type: "fill", question: "I ___ go if I were you", correctAnswer: "would", explanation: "Would = consejo" },
            { question: "She ___ know the answer", options: ["may", "might", "must", "will"], correctAnswer: "may", explanation: "May = quizás" },
            { type: "fill", question: "What ___ you do?", correctAnswer: "would", explanation: "Would = qué harías" },
            { question: "___ I leave early?", options: ["May", "Might", "Must", "Will"], correctAnswer: "May", explanation: "May = permiso" },
            { type: "fill", question: "It ___ snow tonight", correctAnswer: "might", explanation: "Might = menos probable" },
            { question: "I ___ prefer tea", options: ["will", "would", "may", "must"], correctAnswer: "would", explanation: "Would = preferiría" },
            { type: "fill", question: "They ___ be at home", correctAnswer: "may", explanation: "May = quizás" },
            { question: "He ___ have told her", options: ["may", "might", "must", "will"], correctAnswer: "might", explanation: "Might have" }
          ])
        },
        {
          id: 6,
          level: "Difícil",
          description: "Modales perfectos",
          questions: generateQuestions("advanced", [
            { type: "match", question: "Une el modal con su uso:", pairs: [
              { left: "Should have", right: "Arrepentimiento" },
              { left: "Could have", right: "Posibilidad pasada" },
              { left: "Must have", right: "Deducción pasada" },
              { left: "Might have", right: "Posibilidad pasada" },
              { left: "Would have", right: "Condicional pasado" }
            ], correctAnswer: "" },
            { question: "You ___ have told me!", options: ["should", "could", "must", "would"], correctAnswer: "should", explanation: "Should have = deberías haber" },
            { type: "fill", question: "He ___ have forgotten", correctAnswer: "must", explanation: "Must have = debe haber" },
            { question: "I ___ have helped you", options: ["should", "could", "must", "would"], correctAnswer: "could", explanation: "Could have = podría haber" },
            { type: "fill", question: "She ___ have left", correctAnswer: "might", explanation: "Might have = quizás" },
            { question: "They ___ have arrived", options: ["should", "could", "must", "would"], correctAnswer: "must", explanation: "Must have = deben haber" },
            { type: "fill", question: "We ___ have won if...", correctAnswer: "would", explanation: "Would have = habríamos" },
            { question: "You ___ not have done that", options: ["should", "could", "must", "would"], correctAnswer: "should", explanation: "Should not have = crítica" },
            { type: "fill", question: "He ___ have been joking", correctAnswer: "must", explanation: "Must have been" },
            { question: "I ___ have called earlier", options: ["should", "could", "must", "would"], correctAnswer: "should", explanation: "Should have = arrepentimiento" }
          ])
        },
        {
          id: 7,
          level: "Difícil",
          description: "Shall, Ought to, Dare, Need",
          questions: generateQuestions("advanced", [
            { question: "___ we dance?", options: ["Shall", "Should", "Will", "Would"], correctAnswer: "Shall", explanation: "Shall = sugerencia (UK formal)" },
            { type: "fill", question: "You ___ to see a doctor", correctAnswer: "ought", explanation: "Ought to = should (formal)" },
            { question: "How ___ you say that!", options: ["dare", "do dare", "dares", "to dare"], correctAnswer: "dare", explanation: "Dare = atreverse (enfático)" },
            { type: "fill", question: "You ___ not worry", correctAnswer: "need", explanation: "Need not = no necesitas" },
            { question: "___ I bring anything?", options: ["Shall", "Should", "Will", "Would"], correctAnswer: "Shall", explanation: "Shall I = ofrecimiento" },
            { type: "fill", question: "He ___ to apologize", correctAnswer: "ought", explanation: "Ought to = debería" },
            { question: "You ___ not do that!", options: ["dare", "do dare", "dares", "to dare"], correctAnswer: "dare", explanation: "Dare not = no te atrevas" },
            { type: "fill", question: "___ I continue?", correctAnswer: "shall", explanation: "Shall = pedir permiso formal" },
            { question: "We ___ to be grateful", options: ["ought", "oughts", "to ought", "oughting"], correctAnswer: "ought", explanation: "Ought to + infinitive" },
            { type: "fill", question: "You ___ not come if you're busy", correctAnswer: "need", explanation: "Need not = no necesitas" }
          ])
        },
        {
          id: 8,
          level: "Difícil",
          description: "Used to vs Would (hábitos pasados)",
          questions: generateQuestions("advanced", [
            { question: "I ___ live in Paris", options: ["used to", "would", "use to", "using to"], correctAnswer: "used to", explanation: "Used to = estado pasado permanente" },
            { type: "fill", question: "She ___ play piano every day", correctAnswer: "would", explanation: "Would = hábito repetido pasado" },
            { question: "We ___ be friends", options: ["used to", "would", "use to", "using to"], correctAnswer: "used to", explanation: "Used to = estado pasado" },
            { type: "fill", question: "He ___ visit us on Sundays", correctAnswer: "would", explanation: "Would = acción habitual pasada" },
            { question: "There ___ be a shop here", options: ["used to", "would", "use to", "using to"], correctAnswer: "used to", explanation: "Used to = existía antes" },
            { type: "fill", question: "I ___ to smoke", correctAnswer: "used", explanation: "Used to = hábito pasado abandonado" },
            { question: "They ___ go to the beach", options: ["used to", "would", "use to", "using to"], correctAnswer: "would", explanation: "Would = acción repetida pasada" },
            { type: "fill", question: "She ___ to have long hair", correctAnswer: "used", explanation: "Used to = estado pasado" },
            { question: "He ___ tell us stories", options: ["used to", "would", "use to", "using to"], correctAnswer: "would", explanation: "Would = hábito narrativo" },
            { type: "fill", question: "We ___ to live here", correctAnswer: "used", explanation: "Used to = vivíamos antes" }
          ])
        },
        {
          id: 9,
          level: "Difícil",
          description: "Modales de deducción y especulación",
          questions: generateQuestions("advanced", [
            { type: "match", question: "Une el modal con el nivel de certeza:", pairs: [
              { left: "Must be", right: "100% seguro (positivo)" },
              { left: "Can't be", right: "100% seguro (negativo)" },
              { left: "May/Might be", right: "50% posible" },
              { left: "Could be", right: "Posibilidad" },
              { left: "Should be", right: "Esperado/probable" }
            ], correctAnswer: "" },
            { question: "He ___ be at home (estoy seguro)", options: ["must", "can't", "may", "should"], correctAnswer: "must", explanation: "Must = certeza positiva" },
            { type: "fill", question: "She ___ be tired after that trip", correctAnswer: "must", explanation: "Must = deducción lógica" },
            { question: "That ___ be true (imposible)", options: ["must", "can't", "may", "should"], correctAnswer: "can't", explanation: "Can't = imposible/certeza negativa" },
            { type: "fill", question: "He ___ be lying (no es posible)", correctAnswer: "can't", explanation: "Can't be = no puede ser" },
            { question: "It ___ rain tomorrow (50%)", options: ["must", "can't", "may", "will"], correctAnswer: "may", explanation: "May = posibilidad 50%" },
            { type: "fill", question: "She ___ be at work (quizás)", correctAnswer: "might", explanation: "Might = posibilidad menor" },
            { question: "They ___ be here by 6 (espero)", options: ["must", "can't", "may", "should"], correctAnswer: "should", explanation: "Should = lo esperado" },
            { type: "fill", question: "This ___ be the right way", correctAnswer: "could", explanation: "Could = podría ser" },
            { question: "He ___ have left already (seguro)", options: ["must", "can't", "may", "should"], correctAnswer: "must", explanation: "Must have = debe haber" }
          ])
        }
      ]
    },
    // 7. CONDICIONALES  
    {
      id: "conditionals",
      title: "Condicionales",
      description: "Zero, First, Second, Third conditional",
      icon: TrendingUp,
      color: "from-purple-500 to-indigo-500",
      tests: [
        {
          id: 1,
          level: "Fácil",
          description: "Zero Conditional",
          questions: generateQuestions("basic", [
            { question: "If you ___ water, it boils", options: ["heat", "heats", "will heat", "heated"], correctAnswer: "heat", explanation: "Zero: if + present, present" },
            { type: "fill", question: "If it ___, grass gets wet", correctAnswer: "rains", explanation: "Verdad general" },
            { question: "Water ___ if you cool it", options: ["freeze", "freezes", "will freeze", "froze"], correctAnswer: "freezes", explanation: "Resultado siempre igual" },
            { type: "fill", question: "If you ___ ice, it melts", correctAnswer: "heat", explanation: "Hecho científico" },
            { question: "Plants ___ if they don't get water", options: ["die", "dies", "will die", "died"], correctAnswer: "die", explanation: "Verdad general" },
            { type: "fill", question: "If you mix blue and yellow, you ___ green", correctAnswer: "get", explanation: "Resultado siempre igual" },
            { question: "If you ___ exercise, you get tired", options: ["do", "does", "will do", "did"], correctAnswer: "do", explanation: "Verdad general" },
            { type: "fill", question: "Metal ___ if you heat it", correctAnswer: "expands", explanation: "Hecho científico" },
            { question: "If it ___, we get wet", options: ["rain", "rains", "will rain", "rained"], correctAnswer: "rains", explanation: "Verdad general" },
            { type: "fill", question: "You ___ hungry if you don't eat", correctAnswer: "get", explanation: "Resultado predecible" }
          ])
        },
        {
          id: 2,
          level: "Fácil",
          description: "First Conditional",
          questions: generateQuestions("basic", [
            { question: "If it ___ tomorrow, I'll stay home", options: ["rain", "rains", "will rain", "rained"], correctAnswer: "rains", explanation: "First: if + present, will" },
            { type: "fill", question: "I ___ call you if I need help", correctAnswer: "will", explanation: "Will + verbo" },
            { question: "If you study, you ___ pass", options: ["pass", "passes", "will pass", "passed"], correctAnswer: "will pass", explanation: "Will en consecuencia" },
            { type: "fill", question: "She ___ be happy if she wins", correctAnswer: "will", explanation: "Will + be" },
            { question: "If we ___, we'll be late", options: ["don't hurry", "won't hurry", "didn't hurry", "doesn't hurry"], correctAnswer: "don't hurry", explanation: "Present en if" },
            { type: "fill", question: "They ___ come if you invite them", correctAnswer: "will", explanation: "Will + verbo" },
            { question: "If he ___ me, I'll help", options: ["ask", "asks", "will ask", "asked"], correctAnswer: "asks", explanation: "Present después de if" },
            { type: "fill", question: "We ___ miss the train if we don't run", correctAnswer: "will", explanation: "Will en resultado" },
            { question: "If I ___ time, I'll visit", options: ["have", "has", "will have", "had"], correctAnswer: "have", explanation: "Present después de if" },
            { type: "fill", question: "You ___ regret it if you don't go", correctAnswer: "will", explanation: "Will + regret" }
          ])
        },
        {
          id: 3,
          level: "Intermedio",
          description: "Second Conditional",
          questions: generateQuestions("intermediate", [
            { question: "If I ___ rich, I would travel", options: ["am", "was", "were", "will be"], correctAnswer: "were", explanation: "Second: if + past, would" },
            { type: "fill", question: "I ___ buy a car if I had money", correctAnswer: "would", explanation: "Would en consecuencia" },
            { question: "If she ___ harder, she would pass", options: ["study", "studies", "studied", "will study"], correctAnswer: "studied", explanation: "Past después de if" },
            { type: "fill", question: "He ___ help if he could", correctAnswer: "would", explanation: "Would + verbo" },
            { question: "If I ___ you, I would accept", options: ["am", "was", "were", "will be"], correctAnswer: "were", explanation: "If I were you" },
            { type: "fill", question: "We ___ go if we had time", correctAnswer: "would", explanation: "Would en resultado" },
            { question: "If they ___ the answer, they'd tell us", options: ["know", "knows", "knew", "will know"], correctAnswer: "knew", explanation: "Past en if" },
            { type: "fill", question: "She ___ be happy if she won", correctAnswer: "would", explanation: "Would + be" },
            { question: "If we ___ closer, we could visit", options: ["live", "lives", "lived", "will live"], correctAnswer: "lived", explanation: "Past en condición" },
            { type: "fill", question: "I ___ not do that if I were you", correctAnswer: "would", explanation: "Would not" }
          ])
        },
        {
          id: 4,
          level: "Intermedio",
          description: "First vs Second",
          questions: generateQuestions("intermediate", [
            { type: "match", question: "Une con el condicional:", pairs: [
              { left: "Posible futuro", right: "First" },
              { left: "Improbable ahora", right: "Second" },
              { left: "If I see him, I'll tell", right: "First" },
              { left: "If I saw him, I'd tell", right: "Second" },
              { left: "If I were you", right: "Second" }
            ], correctAnswer: "" },
            { question: "If I ___ her number, I'll call (posible)", options: ["find", "found", "will find", "would find"], correctAnswer: "find", explanation: "First = posible" },
            { question: "If I ___ her number, I'd call (no tengo)", options: ["find", "found", "will find", "would find"], correctAnswer: "found", explanation: "Second = no tengo" },
            { type: "fill", question: "If it ___ tomorrow, we'll cancel", correctAnswer: "rains", explanation: "First = posible" },
            { question: "If I ___ a million, I'd travel", options: ["win", "won", "will win", "would win"], correctAnswer: "won", explanation: "Second = improbable" },
            { type: "fill", question: "I ___ tell you if I knew", correctAnswer: "would", explanation: "Second = no sé" },
            { question: "If she ___ me, I'll help (posible)", options: ["ask", "asked", "will ask", "would ask"], correctAnswer: "ask", explanation: "First = podría pedir" }
          ])
        },
        {
          id: 5,
          level: "Difícil",
          description: "Third Conditional",
          questions: generateQuestions("advanced", [
            { question: "If I ___ known, I would have helped", options: ["have", "had", "has", "would have"], correctAnswer: "had", explanation: "Third: if + past perfect, would have" },
            { type: "fill", question: "I ___ have come if you had invited me", correctAnswer: "would", explanation: "Would have en consecuencia" },
            { question: "If she ___ studied, she would have passed", options: ["have", "had", "has", "would have"], correctAnswer: "had", explanation: "Past perfect en if" },
            { type: "fill", question: "They ___ have won if they had tried", correctAnswer: "would", explanation: "Would have + participle" },
            { question: "If we ___ left earlier, we wouldn't have missed it", options: ["have", "had", "has", "would have"], correctAnswer: "had", explanation: "Past perfect en if" },
            { type: "fill", question: "She ___ have been angry if she had known", correctAnswer: "would", explanation: "Would have been" }
          ])
        },
        {
          id: 6,
          level: "Difícil",
          description: "Mixed y casos especiales",
          questions: generateQuestions("advanced", [
            { type: "match", question: "Une estructuras:", pairs: [
              { left: "Zero", right: "if + present, present" },
              { left: "First", right: "if + present, will" },
              { left: "Second", right: "if + past, would" },
              { left: "Third", right: "if + past perfect, would have" },
              { left: "Mixed", right: "if + past perfect, would" }
            ], correctAnswer: "" },
            { question: "If I had studied, I ___ be a doctor (mixed)", options: ["will", "would", "had", "have"], correctAnswer: "would", explanation: "Mixed: pasado→presente" },
            { type: "fill", question: "I wish I ___ taller", correctAnswer: "were", explanation: "Wish + past" },
            { question: "I wish I ___ studied harder", options: ["have", "had", "has", "would have"], correctAnswer: "had", explanation: "Wish + past perfect" }
          ])
        },
        {
          id: 7,
          level: "Difícil",
          description: "Condicionales mixtos y variaciones",
          questions: generateQuestions("advanced", [
            { question: "If I were rich, I ___ have bought that house (mixed)", options: ["will", "would", "had", "have"], correctAnswer: "would", explanation: "Pasado irreal → resultado presente: would" },
            { type: "fill", question: "If he had studied, he ___ be a doctor now", correctAnswer: "would", explanation: "Mixed: past perfect → would (ahora)" },
            { question: "If I ___ you, I wouldn't have done that", options: ["am", "was", "were", "be"], correctAnswer: "were", explanation: "Presente irreal + past perfect" },
            { type: "fill", question: "If I ___ known, I would tell you now", correctAnswer: "had", explanation: "Mixed: had known → would tell" },
            { question: "She ___ be happier if she had accepted", options: ["will", "would", "had", "has"], correctAnswer: "would", explanation: "Mixed conditional" },
            { type: "fill", question: "If you ___ so lazy, you would have finished", correctAnswer: "weren't", explanation: "Weren't (estado presente) → past perfect" },
            { question: "If I had listened, I ___ understand now", options: ["will", "would", "had", "have"], correctAnswer: "would", explanation: "Past action → present result" },
            { type: "fill", question: "If she ___ more careful, she wouldn't have fallen", correctAnswer: "were", explanation: "Were (carácter) → wouldn't have" },
            { question: "I ___ be tired if I had slept well", options: ["won't", "wouldn't", "hadn't", "haven't"], correctAnswer: "wouldn't", explanation: "Mixed: past → present" },
            { type: "fill", question: "If they ___ earlier, they would be here", correctAnswer: "had left", explanation: "Had left → would be (ahora)" }
          ])
        },
        {
          id: 8,
          level: "Difícil",
          description: "Unless, Provided, As long as",
          questions: generateQuestions("advanced", [
            { question: "I'll go ___ it rains", options: ["unless", "if", "provided", "as long"], correctAnswer: "unless", explanation: "Unless = a menos que (if not)" },
            { type: "fill", question: "You can go ___ that you return early", correctAnswer: "provided", explanation: "Provided that = siempre que" },
            { question: "___ you help me, I'll help you", options: ["Unless", "If", "Provided", "As long"], correctAnswer: "If", explanation: "If = si (condición positiva)" },
            { type: "fill", question: "I'll come ___ long as you're there", correctAnswer: "as", explanation: "As long as = mientras que" },
            { question: "We'll fail ___ we study", options: ["unless", "if", "provided", "as long"], correctAnswer: "unless", explanation: "Unless = a menos que estudiemos" },
            { type: "fill", question: "You can stay ___ you're quiet", correctAnswer: "provided", explanation: "Provided = con la condición de que" },
            { question: "___ you study, you won't pass", options: ["Unless", "If", "Provided", "As long"], correctAnswer: "Unless", explanation: "Unless = si no estudias" },
            { type: "fill", question: "I'll wait ___ long as it takes", correctAnswer: "as", explanation: "As long as = todo el tiempo que" },
            { question: "She'll come ___ she's busy", options: ["unless", "if", "provided", "as long"], correctAnswer: "unless", explanation: "Unless = a menos que esté" },
            { type: "fill", question: "___ that you apologize, it's fine", correctAnswer: "provided", explanation: "Provided that = siempre que" }
          ])
        },
        {
          id: 9,
          level: "Difícil",
          description: "If only, Suppose, Imagine",
          questions: generateQuestions("advanced", [
            { question: "If only I ___ taller!", options: ["am", "was", "were", "be"], correctAnswer: "were", explanation: "If only + past = ojalá (presente irreal)" },
            { type: "fill", question: "If only I ___ studied harder!", correctAnswer: "had", explanation: "If only + past perfect = ojalá hubiera" },
            { question: "___ you won the lottery, what would you do?", options: ["Suppose", "If only", "Unless", "Provided"], correctAnswer: "Suppose", explanation: "Suppose = supón que (hipótesis)" },
            { type: "fill", question: "If only she ___ here now", correctAnswer: "were", explanation: "If only + were = ojalá estuviera" },
            { question: "___ we had more time!", options: ["If only", "Suppose", "Unless", "Provided"], correctAnswer: "If only", explanation: "If only = ojalá tuviéramos" },
            { type: "fill", question: "___ you could fly, where would you go?", correctAnswer: "suppose", explanation: "Suppose = supón que pudieras" },
            { question: "If only I ___ listened to you!", options: ["have", "had", "has", "having"], correctAnswer: "had", explanation: "If only + past perfect (arrepentimiento)" },
            { type: "fill", question: "___ you were rich, what would you buy?", correctAnswer: "imagine", explanation: "Imagine = imagina que" },
            { question: "If only they ___ come!", options: ["will", "would", "shall", "should"], correctAnswer: "would", explanation: "If only + would = ojalá vinieran" },
            { type: "fill", question: "___ I hadn't said that!", correctAnswer: "if only", explanation: "If only + past perfect (lamento)" }
          ])
        }
      ]
    },
    // 8. VOZ PASIVA
    {
      id: "passive-voice",
      title: "Voz Pasiva",
      description: "Be + past participle",
      icon: Layers,
      color: "from-green-500 to-teal-500",
      tests: [
        {
          id: 1,
          level: "Fácil",
          description: "Presente Simple Pasivo",
          questions: generateQuestions("basic", [
            { question: "English ___ in many countries", options: ["speak", "speaks", "is spoken", "are spoken"], correctAnswer: "is spoken", explanation: "Pasivo: is/are + past participle" },
            { type: "fill", question: "These cars ___ in Japan", correctAnswer: "are made", explanation: "Plural = are made" },
            { question: "The office ___ every day", options: ["clean", "cleans", "is cleaned", "are cleaned"], correctAnswer: "is cleaned", explanation: "Singular = is cleaned" },
            { type: "fill", question: "Spanish ___ in 20 countries", correctAnswer: "is spoken", explanation: "Singular = is spoken" },
            { question: "The letters ___ every morning", options: ["deliver", "delivers", "is delivered", "are delivered"], correctAnswer: "are delivered", explanation: "Plural = are delivered" },
            { type: "fill", question: "This book ___ by millions", correctAnswer: "is read", explanation: "Singular = is read" },
            { question: "The windows ___ once a week", options: ["wash", "washes", "is washed", "are washed"], correctAnswer: "are washed", explanation: "Plural = are washed" },
            { type: "fill", question: "Coffee ___ in Brazil", correctAnswer: "is grown", explanation: "Singular = is grown" },
            { question: "The emails ___ daily", options: ["send", "sends", "is sent", "are sent"], correctAnswer: "are sent", explanation: "Plural = are sent" },
            { type: "fill", question: "This room ___ for meetings", correctAnswer: "is used", explanation: "Singular = is used" }
          ])
        },
        {
          id: 2,
          level: "Fácil",
          description: "Pasado Simple Pasivo",
          questions: generateQuestions("basic", [
            { question: "The house ___ in 1990", options: ["build", "built", "was built", "were built"], correctAnswer: "was built", explanation: "Pasado pasivo: was/were + past participle" },
            { type: "fill", question: "The letter ___ yesterday", correctAnswer: "was written", explanation: "Singular = was written" },
            { question: "The thieves ___ by police", options: ["catch", "caught", "was caught", "were caught"], correctAnswer: "were caught", explanation: "Plural = were caught" },
            { type: "fill", question: "The movie ___ by Spielberg", correctAnswer: "was directed", explanation: "Singular = was directed" },
            { question: "I ___ in Mexico", options: ["bear", "born", "was born", "were born"], correctAnswer: "was born", explanation: "I = was born" },
            { type: "fill", question: "The windows ___ during the storm", correctAnswer: "were broken", explanation: "Plural = were broken" },
            { question: "The book ___ last year", options: ["publish", "published", "was published", "were published"], correctAnswer: "was published", explanation: "Singular = was published" },
            { type: "fill", question: "The emails ___ this morning", correctAnswer: "were sent", explanation: "Plural = were sent" },
            { question: "The painting ___ for millions", options: ["sell", "sold", "was sold", "were sold"], correctAnswer: "was sold", explanation: "Singular = was sold" },
            { type: "fill", question: "The students ___ for their work", correctAnswer: "were praised", explanation: "Plural = were praised" }
          ])
        },
        {
          id: 3,
          level: "Intermedio",
          description: "Continuo Pasivo",
          questions: generateQuestions("intermediate", [
            { question: "The house ___ now", options: ["is building", "is being built", "was being built", "are being built"], correctAnswer: "is being built", explanation: "Continuo pasivo: is/are being + past participle" },
            { type: "fill", question: "The car ___ at the moment", correctAnswer: "is being repaired", explanation: "Is being + past participle" },
            { question: "A bridge ___", options: ["is constructing", "is being constructed", "was being constructed", "are being constructed"], correctAnswer: "is being constructed", explanation: "Present continuous passive" },
            { type: "fill", question: "The room ___ when I arrived", correctAnswer: "was being cleaned", explanation: "Pasado: was/were being + past participle" },
            { question: "The documents ___ yesterday", options: ["is being reviewed", "are being reviewed", "was being reviewed", "were being reviewed"], correctAnswer: "were being reviewed", explanation: "Plural pasado = were being" }
          ])
        },
        {
          id: 4,
          level: "Intermedio",
          description: "Perfecto Pasivo",
          questions: generateQuestions("intermediate", [
            { question: "The work ___", options: ["has finished", "has been finished", "have been finished", "had been finished"], correctAnswer: "has been finished", explanation: "Perfecto pasivo: has/have been + past participle" },
            { type: "fill", question: "The book ___", correctAnswer: "has been published", explanation: "Has been + past participle" },
            { question: "The emails ___", options: ["has sent", "has been sent", "have been sent", "had been sent"], correctAnswer: "have been sent", explanation: "Plural = have been sent" },
            { type: "fill", question: "The house ___ before we arrived", correctAnswer: "had been sold", explanation: "Past perfect pasivo" },
            { question: "The project ___ by December", options: ["has completed", "has been completed", "have been completed", "had been completed"], correctAnswer: "had been completed", explanation: "Past perfect passive" }
          ])
        },
        {
          id: 5,
          level: "Difícil",
          description: "Futuro y Modales Pasivo",
          questions: generateQuestions("advanced", [
            { question: "The project ___ next month", options: ["will complete", "will be completed", "is completed", "was completed"], correctAnswer: "will be completed", explanation: "Futuro pasivo: will be + past participle" },
            { type: "fill", question: "The meeting ___", correctAnswer: "is going to be cancelled", explanation: "Going to pasivo" },
            { question: "The work ___ tomorrow", options: ["can do", "can be done", "could be done", "must be done"], correctAnswer: "can be done", explanation: "Modal pasivo: modal + be + past participle" },
            { type: "fill", question: "The problem ___ soon", correctAnswer: "should be solved", explanation: "Should be + past participle" },
            { question: "This ___ by Friday", options: ["must finish", "must be finished", "will finish", "is finished"], correctAnswer: "must be finished", explanation: "Must be + past participle" }
          ])
        },
        {
          id: 6,
          level: "Difícil",
          description: "Pasiva con dos objetos",
          questions: generateQuestions("advanced", [
            { type: "match", question: "Une activa con pasiva:", pairs: [
              { left: "They gave me a prize", right: "I was given a prize" },
              { left: "She sent him a letter", right: "He was sent a letter" },
              { left: "We told them truth", right: "They were told truth" },
              { left: "Someone stole my car", right: "My car was stolen" },
              { left: "People speak English", right: "English is spoken" }
            ], correctAnswer: "" },
            { question: "I ___ a prize", options: ["gave", "was given", "have given", "will give"], correctAnswer: "was given", explanation: "Persona como sujeto" },
            { type: "fill", question: "He ___ a letter", correctAnswer: "was sent", explanation: "Was sent a letter" },
            { question: "My wallet ___", options: ["stole", "was stolen", "has stolen", "will steal"], correctAnswer: "was stolen", explanation: "Was stolen (agente desconocido)" }
          ])
        },
        {
          id: 7,
          level: "Difícil",
          description: "Pasiva con modales (can be, should be, must be)",
          questions: generateQuestions("advanced", [
            { question: "This ___ done immediately", options: ["can be", "can being", "can been", "can to be"], correctAnswer: "can be", explanation: "Modal + be + past participle" },
            { type: "fill", question: "The problem ___ be solved", correctAnswer: "can", explanation: "Can be + past participle" },
            { question: "It ___ finished by tomorrow", options: ["should be", "should being", "should been", "should to be"], correctAnswer: "should be", explanation: "Should be + past participle" },
            { type: "fill", question: "This ___ be cleaned", correctAnswer: "must", explanation: "Must be + participle" },
            { question: "The letter ___ sent today", options: ["must be", "must being", "must been", "must to be"], correctAnswer: "must be", explanation: "Must be + sent" },
            { type: "fill", question: "It ___ be repaired soon", correctAnswer: "should", explanation: "Should be + repaired" },
            { question: "This ___ done better", options: ["could be", "could being", "could been", "could to be"], correctAnswer: "could be", explanation: "Could be + done" },
            { type: "fill", question: "The work ___ be completed", correctAnswer: "will", explanation: "Will be + completed" },
            { question: "It ___ seen from here", options: ["can be", "can being", "can been", "can to be"], correctAnswer: "can be", explanation: "Can be + seen" },
            { type: "fill", question: "This ___ be checked", correctAnswer: "should", explanation: "Should be + checked" }
          ])
        },
        {
          id: 8,
          level: "Difícil",
          description: "Pasiva con verbos de reporte (say, believe, think)",
          questions: generateQuestions("advanced", [
            { question: "He ___ to be very rich", options: ["is said", "is saying", "says", "said"], correctAnswer: "is said", explanation: "Is said to be = se dice que es" },
            { type: "fill", question: "She is ___ to be the best", correctAnswer: "believed", explanation: "Is believed to be = se cree que" },
            { question: "They ___ to have left", options: ["are thought", "are thinking", "think", "thought"], correctAnswer: "are thought", explanation: "Are thought to have = se piensa que han" },
            { type: "fill", question: "It is ___ that he's innocent", correctAnswer: "believed", explanation: "It is believed that = se cree que" },
            { question: "The man ___ to be dangerous", options: ["is said", "is saying", "says", "said"], correctAnswer: "is said", explanation: "Is said to be = se dice que" },
            { type: "fill", question: "It is ___ that she won", correctAnswer: "reported", explanation: "It is reported that = se informa que" },
            { question: "He ___ to have stolen the money", options: ["is believed", "is believing", "believes", "believed"], correctAnswer: "is believed", explanation: "Is believed to have = se cree que robó" },
            { type: "fill", question: "She is ___ to be brilliant", correctAnswer: "considered", explanation: "Is considered to be = se considera que" },
            { question: "It ___ that they arrived", options: ["is reported", "is reporting", "reports", "reported"], correctAnswer: "is reported", explanation: "It is reported that = se informa que" },
            { type: "fill", question: "He is ___ to know the truth", correctAnswer: "thought", explanation: "Is thought to = se piensa que" }
          ])
        },
        {
          id: 9,
          level: "Difícil",
          description: "Pasiva con get y have (causativa)",
          questions: generateQuestions("advanced", [
            { question: "I ___ my hair cut yesterday", options: ["had", "have", "got", "get"], correctAnswer: "had", explanation: "Had + objeto + past participle (causativa)" },
            { type: "fill", question: "She ___ her car repaired", correctAnswer: "got", explanation: "Got = causativa (alguien lo hizo por ella)" },
            { question: "We ___ the house painted", options: ["had", "have", "having", "to have"], correctAnswer: "had", explanation: "Had + house + painted" },
            { type: "fill", question: "He ___ hurt in the accident", correctAnswer: "got", explanation: "Got hurt = resultó herido" },
            { question: "I need to ___ my watch fixed", options: ["get", "got", "getting", "to get"], correctAnswer: "get", explanation: "Get + objeto + past participle" },
            { type: "fill", question: "She ___ her bike stolen", correctAnswer: "had", explanation: "Had + stolen = se lo robaron (desafortunado)" },
            { question: "They ___ their house broken into", options: ["had", "have", "having", "to have"], correctAnswer: "had", explanation: "Had + house + broken into (sufrieron)" },
            { type: "fill", question: "I'm going to ___ my eyes tested", correctAnswer: "get", explanation: "Get + eyes + tested (servicio)" },
            { question: "He ___ fired from his job", options: ["got", "get", "getting", "to get"], correctAnswer: "got", explanation: "Got fired = fue despedido" },
            { type: "fill", question: "We ___ the roof fixed last week", correctAnswer: "had", explanation: "Had + roof + fixed (causativa)" }
          ])
        }
      ]
    },
    // 9. CONECTORES
    {
      id: "connectors",
      title: "Conectores",
      description: "And, but, so, because, although - Linking words",
      icon: LinkIcon,
      color: "from-purple-500 to-pink-500",
      tests: [
        {
          id: 1,
          level: "Fácil",
          description: "Conectores básicos: and, but, or",
          questions: generateQuestions("basic", [
            { question: "I like tea ___ coffee", options: ["and", "but", "or", "so"], correctAnswer: "and", explanation: "And = y (adición)" },
            { type: "fill", question: "She is smart ___ kind", correctAnswer: "and", explanation: "And = y (dos cualidades positivas)" },
            { question: "I'm tired ___ I'm happy", options: ["and", "but", "or", "so"], correctAnswer: "but", explanation: "But = pero (contraste)" },
            { type: "fill", question: "Do you want tea ___ coffee?", correctAnswer: "or", explanation: "Or = o (opción)" },
            { question: "It's cold ___ sunny", options: ["and", "but", "or", "so"], correctAnswer: "but", explanation: "But = pero (contraste clima)" },
            { type: "fill", question: "I like pizza ___ pasta", correctAnswer: "and", explanation: "And = y (dos cosas que me gustan)" },
            { question: "Red ___ blue?", options: ["and", "but", "or", "so"], correctAnswer: "or", explanation: "Or = o (elección)" },
            { type: "fill", question: "He's tall ___ thin", correctAnswer: "and", explanation: "And = y (dos características)" },
            { question: "I want to go ___ I'm busy", options: ["and", "but", "or", "so"], correctAnswer: "but", explanation: "But = pero (contraste deseo/realidad)" },
            { type: "fill", question: "Stay ___ go?", correctAnswer: "or", explanation: "Or = o (alternativa)" }
          ])
        },
        {
          id: 2,
          level: "Fácil",
          description: "Conectores de causa-efecto: so, because",
          questions: generateQuestions("basic", [
            { question: "I was tired ___ I slept", options: ["so", "because", "but", "and"], correctAnswer: "so", explanation: "So = entonces (resultado)" },
            { type: "fill", question: "I slept ___ I was tired", correctAnswer: "because", explanation: "Because = porque (causa)" },
            { question: "It was raining ___ I took an umbrella", options: ["so", "because", "but", "and"], correctAnswer: "so", explanation: "So = entonces (consecuencia)" },
            { type: "fill", question: "I took an umbrella ___ it was raining", correctAnswer: "because", explanation: "Because = porque (razón)" },
            { question: "She studied hard ___ she passed", options: ["so", "because", "but", "and"], correctAnswer: "so", explanation: "So = por eso (resultado)" },
            { type: "fill", question: "She passed ___ she studied hard", correctAnswer: "because", explanation: "Because = porque" },
            { question: "I was hungry ___ I ate", options: ["so", "because", "but", "and"], correctAnswer: "so", explanation: "So = entonces" },
            { type: "fill", question: "I ate ___ I was hungry", correctAnswer: "because", explanation: "Because = porque" },
            { question: "It's cold ___ wear a jacket", options: ["so", "because", "but", "and"], correctAnswer: "so", explanation: "So = por eso (consejo)" },
            { type: "fill", question: "I'm staying home ___ I'm sick", correctAnswer: "because", explanation: "Because = porque (razón)" }
          ])
        },
        {
          id: 3,
          level: "Intermedio",
          description: "Conectores de contraste: although, however, despite",
          questions: generateQuestions("intermediate", [
            { question: "___ it was raining, we went out", options: ["Although", "However", "So", "Because"], correctAnswer: "Although", explanation: "Although = aunque (contraste)" },
            { type: "fill", question: "It was raining. ___, we went out", correctAnswer: "However", explanation: "However = sin embargo (contraste entre oraciones)" },
            { question: "___ the rain, we went out", options: ["Despite", "Although", "However", "Because"], correctAnswer: "Despite", explanation: "Despite + noun = a pesar de" },
            { type: "fill", question: "___ he's rich, he's not happy", correctAnswer: "although", explanation: "Although = aunque" },
            { question: "He's rich. ___, he's not happy", options: ["However", "Although", "So", "Because"], correctAnswer: "However", explanation: "However = sin embargo" },
            { type: "fill", question: "___ his wealth, he's not happy", correctAnswer: "despite", explanation: "Despite + noun = a pesar de" },
            { question: "___ she was tired, she continued working", options: ["Although", "However", "So", "Because"], correctAnswer: "Although", explanation: "Although = aunque" },
            { type: "fill", question: "She was tired. ___, she continued", correctAnswer: "however", explanation: "However = sin embargo" },
            { question: "___ being tired, she continued", options: ["Despite", "Although", "However", "Because"], correctAnswer: "Despite", explanation: "Despite + -ing = a pesar de" },
            { type: "fill", question: "___ I tried hard, I failed", correctAnswer: "although", explanation: "Although = aunque" }
          ])
        },
        {
          id: 4,
          level: "Intermedio",
          description: "Conectores de adición y secuencia",
          questions: generateQuestions("intermediate", [
            { type: "match", question: "Une el conector con su uso:", pairs: [
              { left: "First", right: "Primero" },
              { left: "Then", right: "Luego/Entonces" },
              { left: "Finally", right: "Finalmente" },
              { left: "Also/Too", right: "También" },
              { left: "Moreover", right: "Además" }
            ], correctAnswer: "" },
            { question: "___, I woke up", options: ["First", "Then", "Finally", "Also"], correctAnswer: "First", explanation: "First = primero (secuencia)" },
            { type: "fill", question: "___, I had breakfast", correctAnswer: "then", explanation: "Then = luego (segundo paso)" },
            { question: "___, I went to work", options: ["First", "Then", "Finally", "Also"], correctAnswer: "Finally", explanation: "Finally = finalmente (último paso)" },
            { type: "fill", question: "I like tea. I ___ like coffee", correctAnswer: "also", explanation: "Also = también (adición)" },
            { question: "I can swim. ___, I can dive", options: ["Moreover", "However", "So", "But"], correctAnswer: "Moreover", explanation: "Moreover = además (adición formal)" },
            { type: "fill", question: "She's smart. ___, she's hardworking", correctAnswer: "moreover", explanation: "Moreover = además" },
            { question: "I speak English. I speak Spanish, ___", options: ["too", "however", "so", "but"], correctAnswer: "too", explanation: "Too = también (al final)" },
            { type: "fill", question: "___, mix the ingredients", correctAnswer: "first", explanation: "First = primero (instrucciones)" },
            { question: "___, add water", options: ["First", "Next", "Finally", "However"], correctAnswer: "Next", explanation: "Next = a continuación" },
            { type: "fill", question: "___, bake for 20 minutes", correctAnswer: "finally", explanation: "Finally = finalmente" }
          ])
        },
        {
          id: 5,
          level: "Difícil",
          description: "Conectores de condición y propósito",
          questions: generateQuestions("advanced", [
            { question: "___ you study, you'll pass", options: ["If", "Unless", "Although", "Despite"], correctAnswer: "If", explanation: "If = si (condición positiva)" },
            { type: "fill", question: "___ you study, you won't pass", correctAnswer: "unless", explanation: "Unless = a menos que (condición negativa)" },
            { question: "I'll go ___ it rains", options: ["unless", "if", "although", "despite"], correctAnswer: "unless", explanation: "Unless = a menos que" },
            { type: "fill", question: "I study ___ to pass", correctAnswer: "in order", explanation: "In order to = para (propósito)" },
            { question: "I'll call you ___ I arrive", options: ["when", "if", "although", "despite"], correctAnswer: "when", explanation: "When = cuando (tiempo futuro)" },
            { type: "fill", question: "I work hard ___ earn money", correctAnswer: "to", explanation: "To + infinitive = para (propósito)" },
            { question: "___ you need help, call me", options: ["If", "Unless", "Although", "Despite"], correctAnswer: "If", explanation: "If = si (ofrecimiento)" },
            { type: "fill", question: "___ case you forget, here's my number", correctAnswer: "in", explanation: "In case = en caso de que" },
            { question: "I saved money ___ to buy a car", options: ["in order", "although", "however", "because"], correctAnswer: "in order", explanation: "In order to = con el fin de" },
            { type: "fill", question: "Take an umbrella ___ it rains", correctAnswer: "in case", explanation: "In case = por si acaso" }
          ])
        },
        {
          id: 6,
          level: "Difícil",
          description: "Conectores avanzados mixtos",
          questions: generateQuestions("advanced", [
            { type: "match", question: "Une el conector con su categoría:", pairs: [
              { left: "Nevertheless", right: "Contraste (sin embargo)" },
              { left: "Therefore", right: "Consecuencia (por lo tanto)" },
              { left: "Meanwhile", right: "Tiempo simultáneo (mientras tanto)" },
              { left: "Otherwise", right: "Alternativa (de lo contrario)" },
              { left: "Whereas", right: "Comparación/contraste (mientras que)" }
            ], correctAnswer: "" },
            { question: "It was difficult. ___, I finished it", options: ["Nevertheless", "Therefore", "Meanwhile", "Otherwise"], correctAnswer: "Nevertheless", explanation: "Nevertheless = sin embargo (formal)" },
            { type: "fill", question: "I was tired. ___, I went to bed", correctAnswer: "therefore", explanation: "Therefore = por lo tanto (formal)" },
            { question: "I was cooking. ___, he was watching TV", options: ["Meanwhile", "Therefore", "Nevertheless", "Otherwise"], correctAnswer: "Meanwhile", explanation: "Meanwhile = mientras tanto" },
            { type: "fill", question: "Study hard, ___ you'll fail", correctAnswer: "otherwise", explanation: "Otherwise = de lo contrario" },
            { question: "I like tea, ___ she prefers coffee", options: ["whereas", "therefore", "meanwhile", "otherwise"], correctAnswer: "whereas", explanation: "Whereas = mientras que (contraste)" },
            { type: "fill", question: "He's rich, ___ he's unhappy", correctAnswer: "yet", explanation: "Yet = sin embargo" },
            { question: "I'm busy. ___, I'll help you", options: ["Nevertheless", "Therefore", "Meanwhile", "Otherwise"], correctAnswer: "Nevertheless", explanation: "Nevertheless = sin embargo" },
            { type: "fill", question: "It rained. ___, the match was cancelled", correctAnswer: "consequently", explanation: "Consequently = en consecuencia" },
            { question: "Leave now, ___ you'll be late", options: ["otherwise", "therefore", "meanwhile", "whereas"], correctAnswer: "otherwise", explanation: "Otherwise = o si no" },
            { type: "fill", question: "I was sleeping. ___, they were partying", correctAnswer: "meanwhile", explanation: "Meanwhile = mientras tanto" }
          ])
        }
      ]
    },
    // 10. PREGUNTAS
    {
      id: "questions",
      title: "Formación de Preguntas",
      description: "Wh-questions, Yes/No questions, Tag questions",
      icon: HelpCircle,
      color: "from-indigo-500 to-blue-500",
      tests: [
        {
          id: 1,
          level: "Fácil",
          description: "Yes/No questions con BE",
          questions: generateQuestions("basic", [
            { question: "___ you happy?", options: ["Are", "Do", "Is", "Does"], correctAnswer: "Are", explanation: "Are + you = ¿Estás?" },
            { type: "fill", question: "___ she a teacher?", correctAnswer: "is", explanation: "Is + she = ¿Es ella?" },
            { question: "___ they students?", options: ["Are", "Do", "Is", "Does"], correctAnswer: "Are", explanation: "Are + they = ¿Son ellos?" },
            { type: "fill", question: "___ he at home?", correctAnswer: "is", explanation: "Is + he = ¿Está él?" },
            { question: "___ I late?", options: ["Am", "Do", "Is", "Does"], correctAnswer: "Am", explanation: "Am + I = ¿Estoy?" },
            { type: "fill", question: "___ we ready?", correctAnswer: "are", explanation: "Are + we = ¿Estamos?" },
            { question: "___ it cold?", options: ["Is", "Are", "Do", "Does"], correctAnswer: "Is", explanation: "Is + it = ¿Está (el clima)?" },
            { type: "fill", question: "___ you tired?", correctAnswer: "are", explanation: "Are + you = ¿Estás?" },
            { question: "___ she your friend?", options: ["Is", "Are", "Do", "Does"], correctAnswer: "Is", explanation: "Is + she = ¿Es ella?" },
            { type: "fill", question: "___ they from Spain?", correctAnswer: "are", explanation: "Are + they = ¿Son ellos?" }
          ])
        },
        {
          id: 2,
          level: "Fácil",
          description: "Yes/No questions con DO/DOES",
          questions: generateQuestions("basic", [
            { question: "___ you like pizza?", options: ["Do", "Are", "Does", "Is"], correctAnswer: "Do", explanation: "Do + you + verb = presente simple" },
            { type: "fill", question: "___ she speak English?", correctAnswer: "does", explanation: "Does + she + verb" },
            { question: "___ they work here?", options: ["Do", "Are", "Does", "Is"], correctAnswer: "Do", explanation: "Do + they + verb" },
            { type: "fill", question: "___ he live in Paris?", correctAnswer: "does", explanation: "Does + he + verb" },
            { question: "___ you play tennis?", options: ["Do", "Are", "Does", "Is"], correctAnswer: "Do", explanation: "Do + you + verb" },
            { type: "fill", question: "___ it rain a lot here?", correctAnswer: "does", explanation: "Does + it + verb" },
            { question: "___ we need tickets?", options: ["Do", "Are", "Does", "Is"], correctAnswer: "Do", explanation: "Do + we + verb" },
            { type: "fill", question: "___ she want coffee?", correctAnswer: "does", explanation: "Does + she + verb" },
            { question: "___ they know the answer?", options: ["Do", "Are", "Does", "Is"], correctAnswer: "Do", explanation: "Do + they + verb" },
            { type: "fill", question: "___ he study hard?", correctAnswer: "does", explanation: "Does + he + verb" }
          ])
        },
        {
          id: 3,
          level: "Intermedio",
          description: "Wh-questions básicas: What, Where, When, Who",
          questions: generateQuestions("intermediate", [
            { question: "___ is your name?", options: ["What", "Where", "When", "Who"], correctAnswer: "What", explanation: "What = qué/cuál (información)" },
            { type: "fill", question: "___ do you live?", correctAnswer: "where", explanation: "Where = dónde (lugar)" },
            { question: "___ is your birthday?", options: ["What", "Where", "When", "Who"], correctAnswer: "When", explanation: "When = cuándo (tiempo)" },
            { type: "fill", question: "___ is that man?", correctAnswer: "who", explanation: "Who = quién (persona)" },
            { question: "___ do you do?", options: ["What", "Where", "When", "Who"], correctAnswer: "What", explanation: "What do you do = ¿A qué te dedicas?" },
            { type: "fill", question: "___ are you from?", correctAnswer: "where", explanation: "Where are you from = ¿De dónde eres?" },
            { question: "___ were you born?", options: ["What", "Where", "When", "Who"], correctAnswer: "When", explanation: "When = cuándo (nacimiento)" },
            { type: "fill", question: "___ is your teacher?", correctAnswer: "who", explanation: "Who = quién (identificar persona)" },
            { question: "___ time is it?", options: ["What", "Where", "When", "Who"], correctAnswer: "What", explanation: "What time = qué hora" },
            { type: "fill", question: "___ is the party?", correctAnswer: "when", explanation: "When = cuándo (evento)" }
          ])
        },
        {
          id: 4,
          level: "Intermedio",
          description: "Wh-questions: Why, How, Which",
          questions: generateQuestions("intermediate", [
            { question: "___ are you sad?", options: ["Why", "How", "Which", "What"], correctAnswer: "Why", explanation: "Why = por qué (razón)" },
            { type: "fill", question: "___ are you?", correctAnswer: "how", explanation: "How are you = ¿Cómo estás?" },
            { question: "___ book do you want?", options: ["Why", "How", "Which", "What"], correctAnswer: "Which", explanation: "Which = cuál (elección entre opciones)" },
            { type: "fill", question: "___ did you do that?", correctAnswer: "why", explanation: "Why = por qué" },
            { question: "___ old are you?", options: ["Why", "How", "Which", "What"], correctAnswer: "How", explanation: "How old = cuántos años" },
            { type: "fill", question: "___ one do you prefer?", correctAnswer: "which", explanation: "Which one = cuál (de estos)" },
            { question: "___ didn't you come?", options: ["Why", "How", "Which", "What"], correctAnswer: "Why", explanation: "Why = por qué (razón de no venir)" },
            { type: "fill", question: "___ much does it cost?", correctAnswer: "how", explanation: "How much = cuánto (precio)" },
            { question: "___ way should we go?", options: ["Why", "How", "Which", "What"], correctAnswer: "Which", explanation: "Which way = qué camino" },
            { type: "fill", question: "___ many people came?", correctAnswer: "how", explanation: "How many = cuántos (cantidad)" }
          ])
        },
        {
          id: 5,
          level: "Difícil",
          description: "Tag questions",
          questions: generateQuestions("advanced", [
            { question: "You're happy, ___ you?", options: ["aren't", "don't", "isn't", "doesn't"], correctAnswer: "aren't", explanation: "Are → aren't (positivo → negativo)" },
            { type: "fill", question: "She can swim, ___ she?", correctAnswer: "can't", explanation: "Can → can't (tag negativo)" },
            { question: "They don't work here, ___ they?", options: ["do", "don't", "are", "aren't"], correctAnswer: "do", explanation: "Don't → do (negativo → positivo)" },
            { type: "fill", question: "He isn't late, ___ he?", correctAnswer: "is", explanation: "Isn't → is (negativo → positivo)" },
            { question: "You like coffee, ___ you?", options: ["don't", "aren't", "doesn't", "isn't"], correctAnswer: "don't", explanation: "Like → don't (presente simple)" },
            { type: "fill", question: "She won't come, ___ she?", correctAnswer: "will", explanation: "Won't → will (negativo → positivo)" },
            { question: "It's cold, ___ it?", options: ["isn't", "doesn't", "don't", "aren't"], correctAnswer: "isn't", explanation: "Is → isn't (tag negativo)" },
            { type: "fill", question: "They can't hear us, ___ they?", correctAnswer: "can", explanation: "Can't → can (negativo → positivo)" },
            { question: "We should go, ___ we?", options: ["shouldn't", "don't", "aren't", "doesn't"], correctAnswer: "shouldn't", explanation: "Should → shouldn't (tag negativo)" },
            { type: "fill", question: "You haven't seen it, ___ you?", correctAnswer: "have", explanation: "Haven't → have (negativo → positivo)" }
          ])
        },
        {
          id: 6,
          level: "Difícil",
          description: "Preguntas indirectas y avanzadas",
          questions: generateQuestions("advanced", [
            { type: "match", question: "Une la pregunta directa con la indirecta:", pairs: [
              { left: "Where is he?", right: "Can you tell me where he is?" },
              { left: "What time is it?", right: "Do you know what time it is?" },
              { left: "Why did she leave?", right: "I wonder why she left" },
              { left: "How much does it cost?", right: "Could you tell me how much it costs?" },
              { left: "Is he coming?", right: "Do you know if he's coming?" }
            ], correctAnswer: "" },
            { question: "Do you know where ___?", options: ["is he", "he is", "does he", "he does"], correctAnswer: "he is", explanation: "Pregunta indirecta: orden normal" },
            { type: "fill", question: "Can you tell me what time ___ is?", correctAnswer: "it", explanation: "Pregunta indirecta: it is (no is it)" },
            { question: "I wonder why ___", options: ["did she leave", "she left", "she did leave", "left she"], correctAnswer: "she left", explanation: "I wonder + orden normal" },
            { type: "fill", question: "Do you know if he ___ coming?", correctAnswer: "is", explanation: "If = si (pregunta indirecta Yes/No)" },
            { question: "Could you tell me how much ___?", options: ["does it cost", "it costs", "costs it", "it does cost"], correctAnswer: "it costs", explanation: "Pregunta indirecta: orden de statement" },
            { type: "fill", question: "I don't know where ___ lives", correctAnswer: "she", explanation: "Where she lives (no where does she live)" },
            { question: "Can you tell me when ___?", options: ["does the train leave", "the train leaves", "leaves the train", "the train does leave"], correctAnswer: "the train leaves", explanation: "Pregunta indirecta: orden normal" },
            { type: "fill", question: "Do you have any idea what ___ wants?", correctAnswer: "he", explanation: "What he wants (orden normal)" },
            { question: "I wonder whether ___", options: ["is she coming", "she is coming", "she coming is", "coming she is"], correctAnswer: "she is coming", explanation: "Whether = si (formal)" },
            { type: "fill", question: "Could you explain why ___ late?", correctAnswer: "you're", explanation: "Why you're late (no why are you)" }
          ])
        }
      ]
    },
    // 11. ESTRUCTURA DE ORACIONES
    {
      id: "sentence-structure",
      title: "Estructura de Oraciones",
      description: "Word order, subject-verb agreement, clauses",
      icon: List,
      color: "from-cyan-500 to-teal-500",
      tests: [
        {
          id: 1,
          level: "Fácil",
          description: "Orden básico: Sujeto + Verbo + Objeto",
          questions: generateQuestions("basic", [
            { question: "Orden correcto:", options: ["I like pizza", "Pizza like I", "Like I pizza", "I pizza like"], correctAnswer: "I like pizza", explanation: "SVO: Sujeto + Verbo + Objeto" },
            { type: "fill", question: "Ordena: plays / football / he → He ___ ___", correctAnswer: "plays football", explanation: "Verbo + Objeto" },
            { question: "Orden correcto:", options: ["She reads books", "Books reads she", "Reads she books", "She books reads"], correctAnswer: "She reads books", explanation: "SVO: She + reads + books" },
            { type: "fill", question: "Ordena: water / drink / they → They ___ ___", correctAnswer: "drink water", explanation: "Verbo + Objeto" },
            { question: "Orden correcto:", options: ["We speak English", "English speak we", "Speak we English", "We English speak"], correctAnswer: "We speak English", explanation: "SVO básico" },
            { type: "fill", question: "Ordena: the car / drives / she → She ___ the car", correctAnswer: "drives", explanation: "Verbo entre sujeto y objeto" },
            { question: "Orden correcto:", options: ["He eats breakfast", "Breakfast eats he", "Eats he breakfast", "He breakfast eats"], correctAnswer: "He eats breakfast", explanation: "SVO: He + eats + breakfast" },
            { type: "fill", question: "Ordena: music / listen to / I → I ___ to music", correctAnswer: "listen", explanation: "Verbo + preposición + objeto" },
            { question: "Orden correcto:", options: ["They watch TV", "TV watch they", "Watch they TV", "They TV watch"], correctAnswer: "They watch TV", explanation: "SVO simple" },
            { type: "fill", question: "Ordena: a book / reads / she → She ___ a book", correctAnswer: "reads", explanation: "Verbo + artículo + objeto" }
          ])
        },
        {
          id: 2,
          level: "Fácil",
          description: "Posición de adverbios de frecuencia",
          questions: generateQuestions("basic", [
            { question: "I ___ go to the gym", options: ["always", "go always", "always to", "to always"], correctAnswer: "always", explanation: "Adverbio antes del verbo principal" },
            { type: "fill", question: "She is ___ late", correctAnswer: "always", explanation: "Después del verbo BE" },
            { question: "They ___ eat breakfast", options: ["never", "eat never", "never to", "to never"], correctAnswer: "never", explanation: "Adverbio antes del verbo" },
            { type: "fill", question: "He ___ happy", correctAnswer: "is always", explanation: "BE + adverbio" },
            { question: "We ___ watch TV", options: ["sometimes", "watch sometimes", "sometimes to", "to sometimes"], correctAnswer: "sometimes", explanation: "Adverbio antes del verbo" },
            { type: "fill", question: "I am ___ tired", correctAnswer: "often", explanation: "Después de BE: am often" },
            { question: "She ___ drinks coffee", options: ["usually", "drinks usually", "usually to", "to usually"], correctAnswer: "usually", explanation: "Adverbio antes del verbo principal" },
            { type: "fill", question: "They are ___ busy", correctAnswer: "usually", explanation: "Después de BE" },
            { question: "I ___ play tennis", options: ["rarely", "play rarely", "rarely to", "to rarely"], correctAnswer: "rarely", explanation: "Adverbio antes del verbo" },
            { type: "fill", question: "He is ___ on time", correctAnswer: "seldom", explanation: "Después de BE: is seldom" }
          ])
        },
        {
          id: 3,
          level: "Intermedio",
          description: "Orden con objetos directos e indirectos",
          questions: generateQuestions("intermediate", [
            { question: "I gave ___ the book", options: ["him", "to him", "for him", "him to"], correctAnswer: "him", explanation: "Objeto indirecto + objeto directo (sin preposición)" },
            { type: "fill", question: "I gave the book ___ him", correctAnswer: "to", explanation: "Objeto directo + to + objeto indirecto" },
            { question: "She sent ___ a letter", options: ["me", "to me", "for me", "me to"], correctAnswer: "me", explanation: "Objeto indirecto primero" },
            { type: "fill", question: "She sent a letter ___ me", correctAnswer: "to", explanation: "Con preposición TO" },
            { question: "He bought ___ a present", options: ["her", "to her", "for her", "her to"], correctAnswer: "her", explanation: "Objeto indirecto sin preposición" },
            { type: "fill", question: "He bought a present ___ her", correctAnswer: "for", explanation: "Bought...for (comprado para)" },
            { question: "I'll make ___ dinner", options: ["you", "to you", "for you", "you to"], correctAnswer: "you", explanation: "Objeto indirecto directo" },
            { type: "fill", question: "I'll make dinner ___ you", correctAnswer: "for", explanation: "Make...for" },
            { question: "She told ___ the truth", options: ["me", "to me", "for me", "me to"], correctAnswer: "me", explanation: "Tell + objeto indirecto directo" },
            { type: "fill", question: "Show the picture ___ them", correctAnswer: "to", explanation: "Show...to" }
          ])
        },
        {
          id: 4,
          level: "Intermedio",
          description: "Concordancia Sujeto-Verbo",
          questions: generateQuestions("intermediate", [
            { question: "Everyone ___ here", options: ["is", "are", "be", "am"], correctAnswer: "is", explanation: "Everyone = singular (is)" },
            { type: "fill", question: "The team ___ playing well", correctAnswer: "is", explanation: "Team = singular colectivo" },
            { question: "Neither of them ___ ready", options: ["is", "are", "be", "am"], correctAnswer: "is", explanation: "Neither = singular (is)" },
            { type: "fill", question: "Each student ___ a book", correctAnswer: "has", explanation: "Each = singular (has, no have)" },
            { question: "The news ___ good", options: ["is", "are", "be", "am"], correctAnswer: "is", explanation: "News = singular (is)" },
            { type: "fill", question: "Both students ___ smart", correctAnswer: "are", explanation: "Both = plural (are)" },
            { question: "Every child ___ a toy", options: ["has", "have", "having", "had"], correctAnswer: "has", explanation: "Every = singular (has)" },
            { type: "fill", question: "None of the water ___ clean", correctAnswer: "is", explanation: "None + incontable = singular" },
            { question: "The police ___ coming", options: ["are", "is", "be", "am"], correctAnswer: "are", explanation: "Police = plural (are)" },
            { type: "fill", question: "Mathematics ___ difficult", correctAnswer: "is", explanation: "Mathematics = singular (is)" }
          ])
        },
        {
          id: 5,
          level: "Difícil",
          description: "Cláusulas relativas y complejas",
          questions: generateQuestions("advanced", [
            { question: "The man ___ lives here is my teacher", options: ["who", "which", "whose", "where"], correctAnswer: "who", explanation: "Who = persona (sujeto)" },
            { type: "fill", question: "The book ___ I read was good", correctAnswer: "that", explanation: "That/which = cosa (objeto)" },
            { question: "The house ___ I grew up is for sale", options: ["where", "which", "who", "whose"], correctAnswer: "where", explanation: "Where = lugar" },
            { type: "fill", question: "The girl ___ bag is red is my sister", correctAnswer: "whose", explanation: "Whose = posesión" },
            { question: "The reason ___ I called is important", options: ["why", "which", "who", "where"], correctAnswer: "why", explanation: "Why = razón" },
            { type: "fill", question: "The day ___ we met was special", correctAnswer: "when", explanation: "When = tiempo" },
            { question: "The woman ___ you met is my boss", options: ["who", "which", "whose", "where"], correctAnswer: "who", explanation: "Who/that = persona (objeto, se puede omitir)" },
            { type: "fill", question: "The car ___ he drives is expensive", correctAnswer: "that", explanation: "That/which = cosa (se puede omitir)" },
            { question: "The restaurant ___ we ate was great", options: ["where", "which", "who", "whose"], correctAnswer: "where", explanation: "Where = lugar" },
            { type: "fill", question: "The boy ___ brother I know is tall", correctAnswer: "whose", explanation: "Whose = posesión (de quién)" }
          ])
        },
        {
          id: 6,
          level: "Difícil",
          description: "Inversión y estructuras especiales",
          questions: generateQuestions("advanced", [
            { type: "match", question: "Une la estructura con su uso:", pairs: [
              { left: "Never have I seen", right: "Inversión negativa (énfasis)" },
              { left: "Not only...but also", right: "Doble énfasis" },
              { left: "Had I known", right: "Inversión en condicional (formal)" },
              { left: "So do I", right: "Acuerdo positivo" },
              { left: "Neither do I", right: "Acuerdo negativo" }
            ], correctAnswer: "" },
            { question: "Never ___ such a beautiful place", options: ["have I seen", "I have seen", "seen I have", "I seen have"], correctAnswer: "have I seen", explanation: "Never + inversión (have I)" },
            { type: "fill", question: "Rarely ___ we go to the cinema", correctAnswer: "do", explanation: "Rarely + inversión (do we)" },
            { question: "Not only is he smart, ___ also kind", options: ["but", "and", "or", "so"], correctAnswer: "but", explanation: "Not only...but also" },
            { type: "fill", question: "I like coffee. So ___ I", correctAnswer: "do", explanation: "So do I = yo también" },
            { question: "I don't like tea. ___ do I", options: ["Neither", "So", "Also", "Too"], correctAnswer: "Neither", explanation: "Neither do I = yo tampoco" },
            { type: "fill", question: "Only then ___ I realize the truth", correctAnswer: "did", explanation: "Only then + inversión (did I)" },
            { question: "___ had I arrived when it started raining", options: ["Hardly", "Hard", "Harder", "Hardest"], correctAnswer: "Hardly", explanation: "Hardly had I = apenas había" },
            { type: "fill", question: "Little ___ he know what would happen", correctAnswer: "did", explanation: "Little did he = poco sabía (inversión)" },
            { question: "___ should you tell anyone", options: ["Under no circumstances", "Under circumstances", "In no circumstances", "In circumstances"], correctAnswer: "Under no circumstances", explanation: "Under no circumstances = bajo ninguna circunstancia" },
            { type: "fill", question: "Seldom ___ we see such talent", correctAnswer: "do", explanation: "Seldom + inversión (do we)" }
          ])
        }
      ]
    }
  ];

  const exams: Exam[] = [
    {
      id: 1,
      title: "Examen de Tiempos Verbales - Principiante",
      description: "Presente simple, presente continuo y pasado simple",
      questions: 30,
      duration: 45,
      level: "Principiante",
      topics: ["Presente", "Pasado"]
    },
    {
      id: 2,
      title: "Examen de Tiempos Verbales - Intermedio",
      description: "Presente perfecto, pasado perfecto y futuro",
      questions: 40,
      duration: 60,
      level: "Intermedio",
      topics: ["Presente", "Pasado", "Futuro"]
    },
    {
      id: 3,
      title: "Examen de Tiempos Verbales - Avanzado",
      description: "Todos los tiempos verbales incluyendo perfectos continuos",
      questions: 50,
      duration: 75,
      level: "Avanzado",
      topics: ["Presente", "Pasado", "Futuro"]
    },
    {
      id: 4,
      title: "Examen de Modales y Condicionales",
      description: "Can, should, must, condicionales 0-3",
      questions: 35,
      duration: 50,
      level: "Intermedio",
      topics: ["Modales", "Condicionales"]
    },
    {
      id: 5,
      title: "Examen de Voz Pasiva",
      description: "Voz pasiva en todos los tiempos",
      questions: 30,
      duration: 45,
      level: "Intermedio",
      topics: ["Voz Pasiva"]
    },
    {
      id: 6,
      title: "Examen de Gramática General - Principiante",
      description: "Presente, pasado, artículos, pronombres",
      questions: 40,
      duration: 60,
      level: "Principiante",
      topics: ["Presente", "Pasado", "Artículos", "Pronombres"]
    },
    {
      id: 7,
      title: "Examen de Gramática General - Intermedio",
      description: "Perfectos, modales, pasiva, comparativos",
      questions: 50,
      duration: 75,
      level: "Intermedio",
      topics: ["Presente", "Futuro", "Modales", "Comparativos"]
    },
    {
      id: 8,
      title: "Examen de Gramática General - Avanzado",
      description: "Todos los temas de gramática",
      questions: 60,
      duration: 90,
      level: "Avanzado",
      topics: ["Todos"]
    },
    {
      id: 9,
      title: "Examen de Vocabulario - Principiante",
      description: "Vocabulario básico: comida, trabajo, viajes",
      questions: 30,
      duration: 40,
      level: "Principiante",
      topics: ["Vocabulario"]
    },
    {
      id: 10,
      title: "Examen de Vocabulario - Intermedio",
      description: "Vocabulario intermedio con phrasal verbs",
      questions: 40,
      duration: 55,
      level: "Intermedio",
      topics: ["Vocabulario", "Phrasal Verbs"]
    },
    {
      id: 11,
      title: "Examen de Discurso Indirecto",
      description: "Reported speech completo",
      questions: 30,
      duration: 45,
      level: "Intermedio",
      topics: ["Discurso Indirecto"]
    },
    {
      id: 12,
      title: "Examen Integral de Inglés",
      description: "Evaluación completa de todos los conocimientos",
      questions: 100,
      duration: 120,
      level: "Avanzado",
      topics: ["Todos"]
    }
  ];

  const filters = ["Todos", "Presente", "Pasado", "Futuro", "Modales", "Condicionales", "Voz Pasiva", "Vocabulario", "Phrasal Verbs"];
  const examFilters = ["Todos", "Principiante", "Intermedio", "Avanzado"];

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "Todos" || 
                         category.title.includes(selectedFilter) || 
                         category.description.toLowerCase().includes(selectedFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedExamFilter === "Todos" || exam.level === selectedExamFilter;
    return matchesSearch && matchesFilter;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Fácil":
      case "Principiante":
        return "bg-green-100 text-green-700";
      case "Intermedio":
        return "bg-yellow-100 text-yellow-700";
      case "Difícil":
      case "Avanzado":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleCategoryClick = (category: PracticeCategory) => {
    setSelectedCategory(category);
    setView("tests");
  };

  const handleTestClick = (test: Test) => {
    setSelectedTest(test);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setShowResults(false);
    setMatchedPairs(new Set());
    setSelectedLeft(null);
    setSelectedRight(null);
    setView("test-active");
  };

  const handleExamClick = (exam: Exam) => {
    setSelectedExam(exam);
  };

  const buildExamQuestions = (exam: Exam) => {
    const allQuestions = categories.flatMap((category) =>
      category.tests.flatMap((test) => test.questions)
    );

    const pool = exam.topics.includes("Todos")
      ? allQuestions
      : categories.flatMap((category) => {
          const matchesTopic = exam.topics.some(
            (topic) =>
              category.title.toLowerCase().includes(topic.toLowerCase()) ||
              category.description.toLowerCase().includes(topic.toLowerCase())
          );

          return matchesTopic
            ? category.tests.flatMap((test) => test.questions)
            : [];
        });

    return (pool.length ? pool : allQuestions)
      .slice(0, exam.questions)
      .map((question, index) => ({
        ...question,
        id: question.id ?? index + 1,
        type: question.type ?? "multiple",
      }));
  };

  const handleExamStart = (exam: Exam) => {
    setSelectedExam(exam);
    setExamQuestions(buildExamQuestions(exam));
    setExamCurrentQuestion(0);
    setExamAnswers([]);
    setExamShowResults(false);
    setMatchedPairs(new Set());
    setSelectedLeft(null);
    setSelectedRight(null);
    setView("exam-active");
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answer;
    setUserAnswers(newAnswers);
  };

  const handleMatchClick = (index: number, side: "left" | "right") => {
    if (!selectedTest) return;
    const question = selectedTest.questions[currentQuestion];
    if (question.type !== "match" || !question.pairs) return;

    if (side === "left") {
      setSelectedLeft(index);
      if (selectedRight !== null) {
        const pairKey = `${index}-${selectedRight}`;
        setMatchedPairs(new Set(matchedPairs).add(pairKey));
        setSelectedLeft(null);
        setSelectedRight(null);
      }
    } else {
      setSelectedRight(index);
      if (selectedLeft !== null) {
        const pairKey = `${selectedLeft}-${index}`;
        setMatchedPairs(new Set(matchedPairs).add(pairKey));
        setSelectedLeft(null);
        setSelectedRight(null);
      }
    }
  };

  const handleNext = () => {
    if (selectedTest && currentQuestion < selectedTest.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setMatchedPairs(new Set());
      setSelectedLeft(null);
      setSelectedRight(null);
    }
  };

  const handleFinish = () => {
    setShowResults(true);
  };

  const handleExamAnswer = (answer: string) => {
    const newAnswers = [...examAnswers];
    newAnswers[examCurrentQuestion] = answer;
    setExamAnswers(newAnswers);
  };

  const handleExamNext = () => {
    if (examCurrentQuestion < examQuestions.length - 1) {
      setExamCurrentQuestion(examCurrentQuestion + 1);
      setMatchedPairs(new Set());
      setSelectedLeft(null);
      setSelectedRight(null);
    } else {
      setExamShowResults(true);
    }
  };

  const calculateScore = () => {
    if (!selectedTest) return 0;
    let correct = 0;
    selectedTest.questions.forEach((q, i) => {
      if (q.type === "match") {
        if (matchedPairs.size === q.pairs?.length) correct++;
      } else {
        const userAnswer = userAnswers[i]?.trim().toLowerCase();
        const correctAnswer = q.correctAnswer.trim().toLowerCase();
        if (userAnswer === correctAnswer) correct++;
      }
    });
    return Math.round((correct / selectedTest.questions.length) * 100);
  };

  const calculateExamScore = () => {
    let correct = 0;
    examQuestions.forEach((q, i) => {
      if (q.type === "match") {
        if (matchedPairs.size === q.pairs?.length) correct++;
      } else {
        const userAnswer = examAnswers[i]?.trim().toLowerCase();
        const correctAnswer = q.correctAnswer.trim().toLowerCase();
        if (userAnswer === correctAnswer) correct++;
      }
    });
    return examQuestions.length ? Math.round((correct / examQuestions.length) * 100) : 0;
  };

  const handleBack = () => {
    if (view === "test-active") {
      setView("tests");
      setSelectedTest(null);
    } else if (view === "tests") {
      setSelectedCategory(null);
      setView("categories");
    } else if (view === "exams" || view === "exam-active") {
      setView("categories");
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-start gap-3">
          <Target className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Práctica Interactiva</h1>
            <p className="text-sm sm:text-base text-gray-600">
              {view === "categories" ? "Selecciona una categoría para practicar" : 
               view === "tests" ? `${selectedCategory?.title} - Elige un test` :
               view === "test-active" ? `${selectedTest?.description}` :
               view === "exam-active" ? `${selectedExam?.description ?? "Examen"}` :
               "Exámenes completos de inglés"}
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          {view !== "categories" && (
            <button
              onClick={handleBack}
              className="px-4 py-2 text-sm sm:text-base border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
            >
              ← Volver
            </button>
          )}
          {view !== "test-active" && view !== "exam-active" && (
            <button
              onClick={() => {
                setView(view === "exams" ? "categories" : "exams");
                setSearchTerm("");
              }}
              className="px-4 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
            >
              {view === "exams" ? "Ver Prácticas" : "Ver Exámenes"}
            </button>
          )}
        </div>
      </div>

      {/* Search and Filter */}
      {view !== "tests" && view !== "test-active" && view !== "exam-active" && (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder={view === "exams" ? "Buscar examen..." : "Buscar categoría..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            />
          </div>
          <select
            value={view === "exams" ? selectedExamFilter : selectedFilter}
            onChange={(e) => view === "exams" ? setSelectedExamFilter(e.target.value) : setSelectedFilter(e.target.value)}
            className="w-full md:w-auto px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
          >
            {(view === "exams" ? examFilters : filters).map(filter => (
              <option key={filter} value={filter}>{filter}</option>
            ))}
          </select>
        </div>
      )}

      {/* Categories View */}
      {view === "categories" && (
        <>
          <div className="text-sm text-gray-600 mb-4">
            Mostrando {filteredCategories.length} de {categories.length} categorías
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                  className="group relative bg-white rounded-xl shadow-md border-2 border-gray-200 hover:border-blue-500 transition-all p-4 sm:p-6 text-left overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                  <div className="relative">
                    <Icon className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-blue-600" />
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                    <div className="flex items-center gap-2 text-xs sm:text-sm flex-wrap">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
                        2 Fácil
                      </span>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                        2 Intermedio
                      </span>
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full">
                        2 Difícil
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Tests View */}
      {view === "tests" && selectedCategory && (
        <div className="space-y-6">
          <div className={`bg-gradient-to-br ${selectedCategory.color} p-5 sm:p-8 rounded-xl text-white`}>
            {(() => {
              const Icon = selectedCategory.icon;
              return <Icon className="w-10 h-10 sm:w-12 sm:h-12 mb-3" />;
            })()}
            <h2 className="text-xl sm:text-2xl font-bold mb-2">{selectedCategory.title}</h2>
            <p className="text-sm sm:text-base text-white/90">{selectedCategory.description}</p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {selectedCategory.tests.map((test) => (
              <div
                key={test.id}
                onClick={() => handleTestClick(test)}
                className="bg-white rounded-xl shadow-md border-2 border-gray-200 hover:border-blue-500 transition-all p-4 sm:p-6 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`text-xs sm:text-sm px-3 py-1 rounded-full font-medium ${getLevelColor(test.level)}`}>
                    {test.level}
                  </span>
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                  Test {test.id}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{test.description}</p>
                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                  <span>{test.questions.length} preguntas</span>
                  <span className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg group-hover:bg-blue-700 transition-colors">
                    Comenzar
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Test View */}
      {view === "test-active" && selectedTest && !showResults && (
        <div className="max-w-4xl mx-auto px-4 sm:px-0">
          <div className="bg-white rounded-xl shadow-lg p-5 sm:p-8">
            {/* Progress */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Pregunta {currentQuestion + 1} de {selectedTest.questions.length}
                </span>
                <span className={`text-xs sm:text-sm px-3 py-1 rounded-full ${getLevelColor(selectedTest.level)}`}>
                  {selectedTest.level}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${((currentQuestion + 1) / selectedTest.questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            {(() => {
              const question = selectedTest.questions[currentQuestion];
              
              if (question.type === "multiple") {
                return (
                  <div className="space-y-6">
                    <h3 className="text-base sm:text-xl font-bold text-gray-900">{question.question}</h3>
                    <div className="space-y-3">
                      {question.options?.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswer(option)}
                          className={`w-full p-3 sm:p-4 rounded-lg border-2 text-left text-sm sm:text-base transition-all ${
                            userAnswers[currentQuestion] === option
                              ? "border-blue-600 bg-blue-50"
                              : "border-gray-300 hover:border-blue-400 bg-white"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              } else if (question.type === "fill") {
                return (
                  <div className="space-y-6">
                    <h3 className="text-base sm:text-xl font-bold text-gray-900">{question.question}</h3>
                    <input
                      type="text"
                      value={userAnswers[currentQuestion] || ""}
                      onChange={(e) => handleAnswer(e.target.value)}
                      placeholder="Escribe tu respuesta..."
                      className="w-full px-4 py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  </div>
                );
              } else if (question.type === "match" && question.pairs) {
                return (
                  <div className="space-y-6">
                    <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-4">{question.question}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-3">
                        {question.pairs.map((pair, index) => (
                          <button
                            key={index}
                            onClick={() => handleMatchClick(index, "left")}
                            className={`w-full p-3 sm:p-4 rounded-lg border-2 text-left text-sm sm:text-base transition-all ${
                              selectedLeft === index
                                ? "border-blue-600 bg-blue-50"
                                : Array.from(matchedPairs).some(p => p.startsWith(`${index}-`))
                                ? "border-green-500 bg-green-50"
                                : "border-gray-300 hover:border-blue-400 bg-white"
                            }`}
                          >
                            {pair.left}
                          </button>
                        ))}
                      </div>
                      <div className="space-y-3">
                        {question.pairs.map((pair, index) => (
                          <button
                            key={index}
                            onClick={() => handleMatchClick(index, "right")}
                            className={`w-full p-3 sm:p-4 rounded-lg border-2 text-left text-sm sm:text-base transition-all ${
                              selectedRight === index
                                ? "border-blue-600 bg-blue-50"
                                : Array.from(matchedPairs).some(p => p.endsWith(`-${index}`))
                                ? "border-green-500 bg-green-50"
                                : "border-gray-300 hover:border-blue-400 bg-white"
                            }`}
                          >
                            {pair.right}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })()}

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-8">
              <button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="w-full sm:w-auto px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              {currentQuestion < selectedTest.questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  Siguiente
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleFinish}
                  className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  Finalizar
                  <CheckCircle className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Results View */}
      {view === "test-active" && showResults && selectedTest && (
        <div className="max-w-4xl mx-auto px-4 sm:px-0">
          <div className="bg-white rounded-xl shadow-lg p-5 sm:p-8">
            <div className="text-center mb-8">
              <Award className="w-16 h-16 sm:w-20 sm:h-20 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">¡Test Completado!</h2>
              <p className="text-sm sm:text-base text-gray-600">Has terminado el test. Aquí están tus resultados:</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-5 sm:p-8 mb-8">
              <div className="text-center">
                <div className="text-4xl sm:text-6xl font-bold text-blue-600 mb-2">
                  {calculateScore()}%
                </div>
                <p className="text-gray-700 text-sm sm:text-lg">
                  {calculateScore() >= 80 ? "¡Excelente trabajo!" : calculateScore() >= 60 ? "Buen trabajo" : "Sigue practicando"}
                </p>
              </div>
            </div>

            {/* Review */}
            <div className="space-y-4 mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Revisión de Respuestas:</h3>
              {selectedTest.questions.map((q, i) => {
                const userAnswer = userAnswers[i]?.trim().toLowerCase();
                const correctAnswer = q.correctAnswer.trim().toLowerCase();
                const isCorrect = q.type === "match" ? matchedPairs.size === q.pairs?.length : userAnswer === correctAnswer;
                
                return (
                  <div key={i} className={`p-4 rounded-lg border-2 ${isCorrect ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}>
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Pregunta {i + 1}: {q.question}</p>
                        {q.type !== "match" && (
                          <>
                            <p className="text-xs sm:text-sm text-gray-700">Tu respuesta: <span className={isCorrect ? "text-green-700" : "text-red-700"}>{userAnswers[i] || "(sin respuesta)"}</span></p>
                            {!isCorrect && <p className="text-xs sm:text-sm text-gray-700">Respuesta correcta: <span className="text-green-700 font-medium">{q.correctAnswer}</span></p>}
                          </>
                        )}
                        {q.explanation && (
                          <p className="text-xs sm:text-sm text-gray-600 mt-2 italic">💡 {q.explanation}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => {
                  setView("tests");
                  setSelectedTest(null);
                  setShowResults(false);
                  setUserAnswers([]);
                  setCurrentQuestion(0);
                }}
                className="w-full sm:flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Ver Otros Tests
              </button>
              <button
                onClick={() => {
                  setShowResults(false);
                  setUserAnswers([]);
                  setCurrentQuestion(0);
                  setMatchedPairs(new Set());
                }}
                className="w-full sm:flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reintentar Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exams View */}
      {view === "exams" && (
        <>
          <div className="text-sm text-gray-600 mb-4">
            Mostrando {filteredExams.length} de {exams.length} exámenes
          </div>
          {selectedExam && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-start justify-between gap-4">
              <div>
                <p className="text-sm text-blue-700 font-semibold">Examen seleccionado</p>
                <p className="text-base sm:text-lg font-bold text-blue-900">{selectedExam.title}</p>
                <p className="text-sm text-blue-800">{selectedExam.description}</p>
              </div>
              <button
                onClick={() => setSelectedExam(null)}
                className="px-3 py-2 text-sm rounded-md border border-blue-300 text-blue-700 hover:bg-blue-100 transition-colors w-full sm:w-auto"
              >
                Cerrar
              </button>
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {filteredExams.map((exam) => (
              <div
                key={exam.id}
                onClick={() => handleExamClick(exam)}
                className="bg-white rounded-xl shadow-md border-2 border-gray-200 hover:border-blue-500 transition-all p-4 sm:p-6 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`text-xs sm:text-sm px-3 py-1 rounded-full font-medium ${getLevelColor(exam.level)}`}>
                    {exam.level}
                  </span>
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {exam.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{exam.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FileText className="w-4 h-4" />
                    <span>{exam.questions} preguntas</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{exam.duration} minutos</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {exam.topics.slice(0, 3).map((topic, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                      {topic}
                    </span>
                  ))}
                  {exam.topics.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                      +{exam.topics.length - 3}
                    </span>
                  )}
                </div>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    handleExamStart(exam);
                  }}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Comenzar Examen
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {view === "exam-active" && selectedExam && examQuestions.length > 0 && !examShowResults && (
        <div className="max-w-4xl mx-auto px-4 sm:px-0">
          <div className="bg-white rounded-xl shadow-lg p-5 sm:p-8">
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Pregunta {examCurrentQuestion + 1} de {examQuestions.length}
                </span>
                <span className={`text-xs sm:text-sm px-3 py-1 rounded-full ${getLevelColor(selectedExam.level)}`}>
                  {selectedExam.level}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${((examCurrentQuestion + 1) / examQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {(() => {
              const question = examQuestions[examCurrentQuestion];

              if (question.type === "multiple") {
                return (
                  <div className="space-y-6">
                    <h3 className="text-base sm:text-xl font-bold text-gray-900">{question.question}</h3>
                    <div className="space-y-3">
                      {question.options?.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleExamAnswer(option)}
                          className={`w-full p-3 sm:p-4 rounded-lg border-2 text-left text-sm sm:text-base transition-all ${
                            examAnswers[examCurrentQuestion] === option
                              ? "border-blue-600 bg-blue-50"
                              : "border-gray-300 hover:border-blue-400 bg-white"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              }

              if (question.type === "fill") {
                return (
                  <div className="space-y-6">
                    <h3 className="text-base sm:text-xl font-bold text-gray-900">{question.question}</h3>
                    <input
                      type="text"
                      value={examAnswers[examCurrentQuestion] || ""}
                      onChange={(e) => handleExamAnswer(e.target.value)}
                      className="w-full px-4 py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      placeholder="Escribe tu respuesta..."
                    />
                  </div>
                );
              }

              if (question.type === "match" && question.pairs) {
                return (
                  <div className="space-y-6">
                    <h3 className="text-base sm:text-xl font-bold text-gray-900">{question.question}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-3">
                        {question.pairs.map((pair, index) => (
                          <button
                            key={`left-${index}`}
                            onClick={() => handleMatchClick(index, "left")}
                            className={`w-full p-3 sm:p-4 rounded-lg border-2 text-left text-sm sm:text-base transition-all ${
                              selectedLeft === index
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-300 hover:border-blue-400 bg-white"
                            }`}
                          >
                            {pair.left}
                          </button>
                        ))}
                      </div>
                      <div className="space-y-3">
                        {question.pairs.map((pair, index) => (
                          <button
                            key={`right-${index}`}
                            onClick={() => handleMatchClick(index, "right")}
                            className={`w-full p-3 sm:p-4 rounded-lg border-2 text-left text-sm sm:text-base transition-all ${
                              selectedRight === index
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-300 hover:border-blue-400 bg-white"
                            }`}
                          >
                            {pair.right}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return null;
            })()}

            <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-8">
              <button
                onClick={() => setExamCurrentQuestion(Math.max(0, examCurrentQuestion - 1))}
                disabled={examCurrentQuestion === 0}
                className="w-full sm:w-auto px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              <button
                onClick={handleExamNext}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                {examCurrentQuestion < examQuestions.length - 1 ? "Siguiente" : "Finalizar"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {view === "exam-active" && selectedExam && examShowResults && (
        <div className="max-w-4xl mx-auto px-4 sm:px-0">
          <div className="bg-white rounded-xl shadow-lg p-5 sm:p-8">
            <div className="text-center mb-8">
              <Award className="w-16 h-16 sm:w-20 sm:h-20 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">¡Examen Completado!</h2>
              <p className="text-sm sm:text-base text-gray-600">Estos son tus resultados:</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-5 sm:p-8 mb-8">
              <div className="text-center">
                <div className="text-4xl sm:text-6xl font-bold text-blue-600 mb-2">
                  {calculateExamScore()}%
                </div>
                <p className="text-gray-700 text-sm sm:text-lg">
                  {calculateExamScore() >= 80
                    ? "¡Excelente trabajo!"
                    : calculateExamScore() >= 60
                      ? "Buen trabajo"
                      : "Sigue practicando"}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => {
                  setView("exams");
                  setExamShowResults(false);
                  setExamAnswers([]);
                  setExamCurrentQuestion(0);
                }}
                className="w-full sm:flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Ver Otros Examenes
              </button>
              <button
                onClick={() => {
                  if (selectedExam) {
                    handleExamStart(selectedExam);
                  }
                }}
                className="w-full sm:flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reintentar Examen
              </button>
            </div>
          </div>
        </div>
      )}

      {((view === "categories" && filteredCategories.length === 0) || (view === "exams" && filteredExams.length === 0)) && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No se encontraron {view === "exams" ? "exámenes" : "categorías"} que coincidan con tu búsqueda
          </p>
        </div>
      )}
    </div>
  );
}
