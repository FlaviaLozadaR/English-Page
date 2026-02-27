// src/grammar/GrammarPage.tsx
import { useMemo, useState } from "react";
import { categories, topics } from "./data";
import { filterTopics } from "./utils/filterTopics";
import { GrammarHeader } from "./components/GrammarHeader";
import { GrammarFilters } from "./components/GrammarFilters";
import { GrammarTopicCard } from "./components/GrammarTopicCard";
import { EmptyState } from "./components/EmptyState";
import { SEO } from "../../shared/components/SEO";

export function GrammarPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  // SEO Meta Tags
  const seoComponent = (
    <SEO 
      title="Gramática Inglesa - Guía Completa y Ejercicios | English Learning"
      description="Aprende gramática inglesa de forma clara y práctica. Tiempos verbales, condicionales, voz pasiva, preposiciones y más con explicaciones detalladas y ejemplos."
      keywords="gramática inglesa, english grammar, tiempos verbales inglés, present perfect, past simple, conditional, passive voice"
      canonical="https://english-learning-platform.com/grammar"
    />
  );

  const filteredTopics = useMemo(
    () => filterTopics(topics, selectedCategory, searchTerm),
    [selectedCategory, searchTerm]
  );

  const toggleTopic = (id: number) => {
    setExpandedTopic((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {seoComponent}
      <div className="space-y-6">
      <GrammarHeader />

      <GrammarFilters
        categories={categories as unknown as string[]}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchTerm={searchTerm}
        onChangeSearchTerm={setSearchTerm}
      />

      <div className="space-y-4">
        {filteredTopics.map((topic) => (
          <GrammarTopicCard
            key={topic.id}
            topic={topic}
            expanded={expandedTopic === topic.id}
            onToggle={() => toggleTopic(topic.id)}
          />
        ))}
      </div>

      {filteredTopics.length === 0 && <EmptyState />}
    </div>
    </>
  );
}
