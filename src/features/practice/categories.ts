// src/features/practice/categories.ts (ejemplo)

import { MapPin, BarChart } from "lucide-react";
// ⬆️ deja estos imports arriba SIEMPRE

// Importa tus tipos y helpers según tu proyecto
// Ajusta estas rutas si en tu proyecto están distintas:
import type { PracticeCategory } from "../../types/practice";
import { generateQuestions } from "../../utils/generateQuestions";

export const categories: PracticeCategory[] = [
  {
    id: "prepositions",
    title: "Preposiciones",
    description: "In, on, at, by, for, to - tiempo y lugar",
    icon: MapPin,
    color: "from-pink-500 to-rose-500",
    tests: [
      {
        id: 1,
        level: "Fácil",
        description: "In, On, At (tiempo)",
        questions: generateQuestions("basic", [
          { question: "I wake up ___ 7am", options: ["in", "on", "at", "by"], correctAnswer: "at", explanation: "At = hora exacta" },
          { question: "My birthday is ___ July", options: ["in", "on", "at", "by"], correctAnswer: "in", explanation: "In = meses" },
          { question: "We meet ___ Monday", options: ["in", "on", "at", "by"], correctAnswer: "on", explanation: "On = días" },
          { type: "fill", question: "I was born ___ 2001", correctAnswer: "in", explanation: "In = años" },
          { question: "The party is ___ night", options: ["in", "on", "at", "by"], correctAnswer: "at", explanation: "At night" }
        ])
      },
      {
        id: 2,
        level: "Intermedio",
        description: "Preposiciones de lugar",
        questions: generateQuestions("intermediate", [
          { question: "The book is ___ the table", options: ["in", "on", "at", "by"], correctAnswer: "on", explanation: "On = sobre superficie" },
          { question: "She is ___ the room", options: ["in", "on", "at", "by"], correctAnswer: "in", explanation: "In = dentro" },
          { question: "He is waiting ___ the door", options: ["in", "on", "at", "by"], correctAnswer: "at", explanation: "At = punto específico" },
          { type: "fill", question: "She lives ___ London", correctAnswer: "in", explanation: "In = ciudades/países" },
          { question: "I sat ___ her", options: ["in", "on", "at", "by"], correctAnswer: "by", explanation: "By = al lado de" }
        ])
      }
    ]
  },

  {
    id: "comparatives",
    title: "Comparativos y Superlativos",
    description: "Comparative, superlative, as...as",
    icon: BarChart,
    color: "from-amber-500 to-orange-500",
    tests: [
      {
        id: 1,
        level: "Fácil",
        description: "Comparatives básicos",
        questions: generateQuestions("basic", [
          { question: "She is ___ than me", options: ["tall", "taller", "tallest", "more tall"], correctAnswer: "taller", explanation: "-er para adjetivos cortos" },
          { question: "This book is ___ than that one", options: ["interesting", "more interesting", "most interesting", "interestinger"], correctAnswer: "more interesting", explanation: "More + adjetivo largo" },
          { type: "fill", question: "My car is ___ than yours (fast)", correctAnswer: "faster", explanation: "Fast → faster" },
          { question: "Math is ___ than history", options: ["difficult", "more difficult", "most difficult", "difficulter"], correctAnswer: "more difficult", explanation: "More + adjetivo largo" },
          { type: "fill", question: "Today is ___ than yesterday (cold)", correctAnswer: "colder", explanation: "Cold → colder" }
        ])
      },
      {
        id: 2,
        level: "Intermedio",
        description: "Superlatives y as...as",
        questions: generateQuestions("intermediate", [
          { question: "She is the ___ girl in class", options: ["tall", "taller", "tallest", "more tall"], correctAnswer: "tallest", explanation: "-est para superlativo" },
          { question: "This is the ___ movie I've seen", options: ["better", "best", "good", "more good"], correctAnswer: "best", explanation: "Good → best (irregular)" },
          { type: "fill", question: "This is the ___ day of my life (happy)", correctAnswer: "happiest", explanation: "Happy → happiest" },
          { question: "She is ___ as her sister", options: ["as tall", "taller", "tallest", "more tall"], correctAnswer: "as tall", explanation: "As...as = igualdad" },
          { type: "fill", question: "This exam is the ___ (difficult)", correctAnswer: "most difficult", explanation: "Most + adjetivo largo" }
        ])
      }
    ]
  }
];
