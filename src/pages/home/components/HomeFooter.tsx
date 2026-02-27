import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export function HomeFooter() {
  return (
    <div className="w-full border-t border-gray-200 pt-10 pb-8 px-8 md:px-12 lg:px-16">
      <div className="w-full space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center md:text-left">
          <div className="space-y-3">
            <h4 className="font-bold text-gray-900 flex items-center justify-center md:justify-start gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              English Learning
            </h4>
            <p className="text-sm text-gray-600">
              Plataforma completa para aprender inglés de forma efectiva y alcanzar tus metas profesionales y académicas.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-gray-900">Enlaces Rápidos</h4>
            <div className="flex flex-col space-y-2 text-sm">
              <Link to="/reading" className="text-gray-600 hover:text-blue-600 transition-colors">
                Reading Comprehension
              </Link>
              <Link to="/vocabulary" className="text-gray-600 hover:text-blue-600 transition-colors">
                Vocabulario
              </Link>
              <Link to="/practice" className="text-gray-600 hover:text-blue-600 transition-colors">
                Práctica
              </Link>
              <Link to="/quiz" className="text-gray-600 hover:text-blue-600 transition-colors">
                Quizzes
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-gray-900">Recursos</h4>
            <div className="flex flex-col space-y-2 text-sm">
              <Link to="/grammar" className="text-gray-600 hover:text-blue-600 transition-colors">
                Gramática
              </Link>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                Sobre Nosotros
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contacto
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                Política de Privacidad
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} English Learning Platform. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Diseñado con ❤️ para estudiantes de inglés en todo el mundo
          </p>
        </div>
      </div>
    </div>
  );
}
