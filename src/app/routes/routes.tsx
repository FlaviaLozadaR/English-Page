import HomePage from "@/pages/home";
import { Grammar } from "@/pages/Grammar.page";
import { Practice } from "@/pages/Practice.page";
import { QuizPage } from "@/pages/Quiz.page";

export const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/grammar", element: <Grammar /> },
  { path: "/practice", element: <Practice /> },
  { path: "/quiz", element: <QuizPage /> },
];
