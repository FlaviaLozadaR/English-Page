import type { LucideIcon } from "lucide-react";
import {
  Type,
  Users,
  Clock,
  Zap,
  MessageCircle,
  Brain,
  Globe,
  Briefcase,
  MapPin,
  BarChart,
  Award,
} from "lucide-react";

export type PracticeTopicCategory = "practice" | "exam";

export interface PracticeTopic {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string; // tailwind gradient classes: "from-x to-y"
  levelsAvailable: number;
  totalQuestions: number;
  category: PracticeTopicCategory;
}

export const TOPIC_FILTERS = ["Todos", "Práctica", "Exámenes"] as const;
export type TopicFilter = (typeof TOPIC_FILTERS)[number];

export const TOPICS: PracticeTopic[] = [
  // PRÁCTICA
  {
    id: "parts-of-speech",
    title: "Partes de la Oración",
    description: "Nouns, verbs, adjectives, adverbs",
    icon: Type,
    color: "from-purple-500 to-pink-500",
    levelsAvailable: 3,
    totalQuestions: 30,
    category: "practice",
  },
  {
    id: "pronouns",
    title: "Pronombres",
    description: "Subject, object, possessive pronouns",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    levelsAvailable: 3,
    totalQuestions: 30,
    category: "practice",
  },
  {
    id: "verb-tenses",
    title: "Tiempos Verbales",
    description: "Present, past, future forms",
    icon: Clock,
    color: "from-green-500 to-teal-500",
    levelsAvailable: 3,
    totalQuestions: 30,
    category: "practice",
  },
  {
    id: "modal-verbs",
    title: "Verbos Modales",
    description: "Can, could, should, must, might",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    levelsAvailable: 3,
    totalQuestions: 30,
    category: "practice",
  },
  {
    id: "phrasal-verbs",
    title: "Phrasal Verbs",
    description: "Look up, give up, turn down",
    icon: MessageCircle,
    color: "from-red-500 to-pink-500",
    levelsAvailable: 3,
    totalQuestions: 30,
    category: "practice",
  },
  {
    id: "conditionals-zero",
    title: "Condicional Zero",
    description: "If + present, present",
    icon: Brain,
    color: "from-indigo-500 to-purple-500",
    levelsAvailable: 3,
    totalQuestions: 30,
    category: "practice",
  },
  {
    id: "conditionals-first",
    title: "First Conditional",
    description: "If + present, will + verb",
    icon: Brain,
    color: "from-violet-500 to-purple-500",
    levelsAvailable: 3,
    totalQuestions: 30,
    category: "practice",
  },
  {
    id: "conditionals-second",
    title: "Second Conditional",
    description: "If + past, would + verb",
    icon: Brain,
    color: "from-fuchsia-500 to-pink-500",
    levelsAvailable: 3,
    totalQuestions: 30,
    category: "practice",
  },
  {
    id: "conditionals-third",
    title: "Third Conditional",
    description: "If + past perfect, would have",
    icon: Brain,
    color: "from-purple-600 to-indigo-600",
    levelsAvailable: 3,
    totalQuestions: 30,
    category: "practice",
  },
  {
    id: "passive-voice",
    title: "Voz Pasiva",
    description: "Active to passive voice",
    icon: Globe,
    color: "from-cyan-500 to-blue-500",
    levelsAvailable: 3,
    totalQuestions: 30,
    category: "practice",
  },
  {
    id: "reported-speech",
    title: "Discurso Indirecto",
    description: "Direct to indirect speech",
    icon: Briefcase,
    color: "from-emerald-500 to-green-500",
    levelsAvailable: 3,
    totalQuestions: 30,
    category: "practice",
  },
  {
    id: "prepositions",
    title: "Preposiciones",
    description: "In, on, at, by, with",
    icon: MapPin,
    color: "from-amber-500 to-yellow-500",
    levelsAvailable: 3,
    totalQuestions: 30,
    category: "practice",
  },
  {
    id: "comparatives",
    title: "Comparativos y Superlativos",
    description: "Bigger, biggest, more, most",
    icon: BarChart,
    color: "from-rose-500 to-red-500",
    levelsAvailable: 3,
    totalQuestions: 30,
    category: "practice",
  },

  // EXÁMENES
  {
    id: "exam-verb-tenses-beginner",
    title: "Examen: Tiempos Verbales",
    description: "Presente simple, continuo y pasado",
    icon: Award,
    color: "from-blue-600 to-purple-600",
    levelsAvailable: 3,
    totalQuestions: 120,
    category: "exam",
  },
  {
    id: "exam-modals-conditionals",
    title: "Examen: Modales y Condicionales",
    description: "Can, should, must, condicionales 0-3",
    icon: Award,
    color: "from-purple-600 to-pink-600",
    levelsAvailable: 1,
    totalQuestions: 35,
    category: "exam",
  },
  {
    id: "exam-passive-voice",
    title: "Examen: Voz Pasiva",
    description: "Voz pasiva en todos los tiempos",
    icon: Award,
    color: "from-indigo-600 to-blue-600",
    levelsAvailable: 1,
    totalQuestions: 30,
    category: "exam",
  },
  {
    id: "exam-general-grammar",
    title: "Examen: Gramática General",
    description: "Todos los temas de gramática",
    icon: Award,
    color: "from-cyan-600 to-teal-600",
    levelsAvailable: 3,
    totalQuestions: 150,
    category: "exam",
  },
  {
    id: "exam-vocabulary",
    title: "Examen: Vocabulario",
    description: "Vocabulario básico y avanzado",
    icon: Award,
    color: "from-green-600 to-emerald-600",
    levelsAvailable: 3,
    totalQuestions: 100,
    category: "exam",
  },
];
