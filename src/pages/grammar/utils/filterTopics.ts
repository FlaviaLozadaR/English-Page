// src/grammar/utils/filterTopics.ts
import type { GrammarTopic } from "../types";

export function filterTopics(
  topics: GrammarTopic[],
  selectedCategory: string,
  searchTerm: string
) {
  const q = searchTerm.trim().toLowerCase();

  return topics.filter((topic) => {
    const matchesCategory = selectedCategory === "Todos" || topic.category === selectedCategory;

    if (!q) return matchesCategory;

    const matchesSearch =
      topic.title.toLowerCase().includes(q) || topic.explanation.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });
}
