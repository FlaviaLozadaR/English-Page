import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { FeatureItem } from "../types";

type Props = {
  features: FeatureItem[];
};

export function FeatureGrid({ features }: Props) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">
          Todo lo que necesitas en un solo lugar
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Herramientas diseñadas para acelerar tu aprendizaje
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <Link
              key={index}
              to={feature.link}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity`}
              ></div>

              <div className="relative p-6 sm:p-8 space-y-4 flex flex-col items-center text-center">
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                </div>

                <div className="flex items-center justify-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                  <span>Explorar</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
