import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/app/layouts/Layout";

import HomePage from "@/pages/home";

const GrammarPage = lazy(() => import("@/pages/Grammar.page").then((m) => ({ default: m.Grammar })));
const PracticePage = lazy(() => import("@/pages/Practice.page").then((m) => ({ default: m.Practice })));
const ReadingPage = lazy(() => import("@/pages/Reading.page").then((m) => ({ default: m.ReadingPage })));
const VocabularyPage = lazy(() => import("@/pages/Vocabulary.page").then((m) => ({ default: m.VocabularyPage })));
const QuizPage = lazy(() => import("@/pages/Quiz.page").then((m) => ({ default: m.QuizPage })));

const pageFallback = (
  <div className="mx-auto max-w-5xl rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-slate-600">
    Cargando...
  </div>
);

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/reading",
        element: <Suspense fallback={pageFallback}><ReadingPage /></Suspense>,
      },
      {
        path: "/vocabulary",
        element: <Suspense fallback={pageFallback}><VocabularyPage /></Suspense>,
      },
      {
        path: "/grammar",
        element: <Suspense fallback={pageFallback}><GrammarPage /></Suspense>,
      },
      {
        path: "/practice",
        element: <Suspense fallback={pageFallback}><PracticePage /></Suspense>,
      },
      {
        path: "/quiz",
        element: <Suspense fallback={pageFallback}><QuizPage /></Suspense>,
      },
    ],
  },
]);
