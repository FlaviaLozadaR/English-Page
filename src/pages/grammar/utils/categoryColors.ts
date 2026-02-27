// src/grammar/utils/categoryColors.ts
export function getCategoryColor(category: string) {
  const colors: Record<string, string> = {
    Presente: "bg-blue-100 text-blue-700",
    Pasado: "bg-purple-100 text-purple-700",
    Futuro: "bg-green-100 text-green-700",
    Modales: "bg-orange-100 text-orange-700",
    Condicionales: "bg-pink-100 text-pink-700",
    "Voz Pasiva": "bg-teal-100 text-teal-700",
    "Discurso Indirecto": "bg-rose-100 text-rose-700",
    "Artículos": "bg-indigo-100 text-indigo-700",
    Pronombres: "bg-cyan-100 text-cyan-700",
    Preposiciones: "bg-yellow-100 text-yellow-700",
    Comparativos: "bg-red-100 text-red-700",
    Conectores: "bg-violet-100 text-violet-700",
    Preguntas: "bg-fuchsia-100 text-fuchsia-700",
    Estructura: "bg-lime-100 text-lime-700",
    "Phrasal Verbs": "bg-amber-100 text-amber-700",
    Adjetivos: "bg-emerald-100 text-emerald-700",
  };

  return colors[category] || "bg-gray-100 text-gray-700";
}
