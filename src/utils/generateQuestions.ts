import type { Question } from "../types/practice";

/**
 * Normaliza preguntas:
 * - Si no viene "type", lo convierte a "multiple" si tiene options, o "fill" si no tiene.
 * - Asegura correctAnswer string.
 */
export function generateQuestions(
  _difficulty: "basic" | "intermediate" | "advanced",
  questions: Question[]
): Question[] {
  return questions.map((q) => {
    const inferredType =
      q.type ??
      (q.pairs ? "match" : q.options && q.options.length > 0 ? "multiple" : "fill");

    return {
      ...q,
      type: inferredType,
      correctAnswer: String(q.correctAnswer ?? "")
    };
  });
}
