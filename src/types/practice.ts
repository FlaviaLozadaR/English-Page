import type { LucideIcon } from "lucide-react";

export type QuestionType = "multiple" | "fill" | "match";

export type MatchPair = {
  left: string;
  right: string;
};

export type Question = {
  type?: QuestionType; // si no viene, asumimos "multiple"
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  pairs?: MatchPair[];
};

export type Test = {
  id: number;
  level: "Fácil" | "Intermedio" | "Difícil";
  description: string;
  questions: Question[];
};

export type PracticeCategory = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string; // tailwind gradient class string
  tests: Test[];
};

export type Exam = {
  id: number;
  title: string;
  description: string;
  questions: number;
  duration: number;
  level: "Principiante" | "Intermedio" | "Avanzado";
  topics: string[];
};

export type ViewMode = "categories" | "tests" | "test-active" | "exams";
