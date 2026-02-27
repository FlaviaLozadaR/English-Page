// src/grammar/components/GrammarTopicCard.tsx
import { ChevronDown, ChevronUp } from "lucide-react";
import type { GrammarTopic } from "../types";
import { getCategoryColor } from "../utils/categoryColors";

type Props = {
  topic: GrammarTopic;
  expanded: boolean;
  onToggle: () => void;
};

export function GrammarTopicCard({ topic, expanded, onToggle }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-4 md:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4 text-left">
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{topic.title}</h3>
            <span className={`text-xs px-3 py-1 rounded-full ${getCategoryColor(topic.category)}`}>
              {topic.category}
            </span>
          </div>
        </div>

        {expanded ? (
          <ChevronUp className="w-6 h-6 text-gray-400" />
        ) : (
          <ChevronDown className="w-6 h-6 text-gray-400" />
        )}
      </button>

      {expanded && (
        <div className="p-4 md:p-6 pt-0 space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
            <p className="text-gray-700">{topic.explanation}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Reglas:</h4>
            <ul className="space-y-2">
              {topic.rules.map((rule, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-700">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Ejemplos:</h4>
            <div className="grid md:grid-cols-2 gap-3">
              {topic.examples.map((example, index) => (
                <div key={index} className="bg-white border border-gray-200 p-4 rounded-lg">
                  <p className="text-gray-900 font-medium mb-1">{example.english}</p>
                  <p className="text-gray-600 text-sm">{example.spanish}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
