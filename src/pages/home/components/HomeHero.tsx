import {
  ArrowRight,
  Award,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "@/shared/figma/ImageWithFallback";

export function HomeHero() {
  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center py-6 sm:py-8 lg:py-16">
      {/* Left Column */}
      <div className="space-y-6 order-2 lg:order-1">
        <div className="inline-flex flex-wrap items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 px-4 py-2 rounded-full">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span className="text-xs sm:text-sm font-semibold text-gray-800 text-center sm:text-left">
            🚀 Nivel Internacional: Domina el TOEFL y Rompe Fronteras
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
          Aprende Inglés de Forma{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 animate-gradient">
            Efectiva
          </span>
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
          Domina el inglés con lecciones interactivas, ejercicios prácticos y recursos diseñados para tu éxito. Alcanza tus metas profesionales y académicas.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 sm:pt-4">
          <Link
            to="/reading"
            className="group relative w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            Empezar Ahora
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/quiz"
            className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all text-center"
          >
            Evalúa tu Nivel
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pt-2 sm:pt-4">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white"></div>
            </div>
            <span className="text-sm font-semibold text-gray-700">
              +10K estudiantes activos
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-700 ml-1">4.9/5</span>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="relative order-1 lg:order-2">
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full opacity-20 animate-pulse delay-150"></div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1758521541622-d1e6be8c39bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHN0dWRlbnQlMjBsZWFybmluZyUyMGxhcHRvcCUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzcwMTcxNjE4fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Happy student learning with laptop"
              className="w-full h-auto"
            />
          </div>

          <div className="absolute top-4 sm:top-8 -left-3 sm:-left-6 bg-white rounded-2xl shadow-xl p-3 sm:p-4 animate-float">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold">Progreso</p>
                <p className="text-lg font-black text-gray-900">+47%</p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 sm:bottom-8 -right-3 sm:-right-6 bg-white rounded-2xl shadow-xl p-3 sm:p-4 animate-float-delayed">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold">Certificado</p>
                <p className="text-lg font-black text-gray-900">TOEFL</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
