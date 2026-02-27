// src/grammar/components/GrammarHeader.tsx
import { FileText } from "lucide-react";

export function GrammarHeader() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <FileText className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Gramática Completa</h1>
      </div>

      <p className="text-lg text-gray-600">
        Domina todas las reglas gramaticales esenciales del inglés con explicaciones claras y ejemplos prácticos.
      </p>
    </div>
  );
}
