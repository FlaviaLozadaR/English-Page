import {
  BookOpen,
  Languages,
  MessageSquare,
  PenTool,
} from "lucide-react";

import duolingoImg from "@/shared/assets/images/duolingo.png";
import babbelImg from "@/shared/assets/images/babbel.png";
import busuuImg from "@/shared/assets/images/busuu.png";
import memriseImg from "@/shared/assets/images/memrise.png";
import mondlyImg from "@/shared/assets/images/mondly.png";
import xeropanImg from "@/shared/assets/images/xeropan.png";

import type { FeatureItem, EcosystemTool } from "./types";

export const features: FeatureItem[] = [
  {
    icon: BookOpen,
    title: "Reading Comprehension",
    description: "Mejora tu comprensión lectora con textos en inglés de todos los niveles",
    link: "/reading",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Languages,
    title: "Vocabulario Esencial",
    description: "Amplía tu vocabulario con las palabras más importantes del inglés",
    link: "/vocabulary",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: MessageSquare,
    title: "Práctica Interactiva",
    description: "Refuerza lo aprendido con ejercicios prácticos y divertidos",
    link: "/practice",
    color: "from-green-500 to-green-600",
  },
  {
    icon: PenTool,
    title: "Evalúa tu Progreso",
    description: "Realiza quizzes para medir tu avance y conocimientos",
    link: "/quiz",
    color: "from-orange-500 to-orange-600",
  },
];

export const ecosystemTools: EcosystemTool[] = [
  {
    name: "Duolingo",
    image: duolingoImg,
    description: "Práctica integral (vocabulario, gramática y conversación)",
  },
  {
    name: "Babbel",
    image: babbelImg,
    description: "Lecciones más estructuradas, útiles para aprender frases reales",
  },
  {
    name: "Busuu",
    image: busuuImg,
    description: "Permite practicar con hablantes nativos y recibir correcciones",
  },
  {
    name: "Memrise",
    image: memriseImg,
    description: "Usa videos de hablantes nativos y repetición para memorizar",
  },
  {
    name: "Mondly",
    image: mondlyImg,
    description: "Buenas lecciones para principiantes centradas en conversaciones",
  },
  {
    name: "Xeropan",
    image: xeropanImg,
    description: "Tiene lecciones con videos y bots conversacionales para practicar",
  },
];
