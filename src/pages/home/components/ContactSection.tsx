import { Mail, Send } from "lucide-react";

export function ContactSection() {
  return (
    <section className="w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 px-8 md:px-12 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            ¿Tienes alguna pregunta?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Estamos aquí para ayudarte en tu proceso de aprendizaje. No dudes en contactarnos.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-gray-100">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Contáctanos por Email
              </h3>
              <p className="text-gray-600 mb-4">
                Responderemos lo antes posible a tus consultas
              </p>
              <a
                href="mailto:desarrollolozada@gmail.com"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors group"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                desarrollolozada@gmail.com
              </a>
            </div>

            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <a
                href="mailto:desarrollolozada@gmail.com"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Send className="w-5 h-5" />
                Enviar Email
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600 mb-1">24/7</div>
                <div className="text-sm text-gray-600">Soporte disponible</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 mb-1">&lt; 24h</div>
                <div className="text-sm text-gray-600">Tiempo de respuesta</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 mb-1">100%</div>
                <div className="text-sm text-gray-600">Atención personalizada</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            También puedes seguirnos en nuestras redes sociales para contenido educativo diario
          </p>
        </div>
      </div>
    </section>
  );
}
