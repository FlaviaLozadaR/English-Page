import { BookOpen, Languages, MessageSquare } from "lucide-react";

export function StatsSection() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-10"></div>
      <div className="relative backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl p-6 sm:p-10 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
              <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                9
              </div>
            </div>
            <p className="text-gray-700 font-semibold">Lecturas de Comprensión</p>
            <p className="text-sm text-gray-500">3 Niveles de Dificultad</p>
          </div>

          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Languages className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600" />
              <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
                120
              </div>
            </div>
            <p className="text-gray-700 font-semibold">Verbos Esenciales</p>
            <p className="text-sm text-gray-500">Más Usados en Inglés</p>
          </div>

          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
              <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">
                1K+
              </div>
            </div>
            <p className="text-gray-700 font-semibold">Preguntas de Práctica</p>
            <p className="text-sm text-gray-500">87 Tests Interactivos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
