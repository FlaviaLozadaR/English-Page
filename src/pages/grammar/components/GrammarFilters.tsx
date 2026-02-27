// src/grammar/components/GrammarFilters.tsx
import { Search } from "lucide-react";

type Props = {
  categories: readonly string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchTerm: string;
  onChangeSearchTerm: (value: string) => void;
};

export function GrammarFilters({
  categories,
  selectedCategory,
  onSelectCategory,
  searchTerm,
  onChangeSearchTerm,
}: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar tema de gramática..."
          value={searchTerm}
          onChange={(e) => onChangeSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-lg transition-colors text-sm md:text-base ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
