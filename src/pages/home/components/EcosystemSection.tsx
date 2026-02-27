import { Users } from "lucide-react";
import { ImageWithFallback } from "@/shared/figma/ImageWithFallback";
import type { EcosystemTool } from "../types";

type Props = {
  ecosystemTools: EcosystemTool[];
};

export function EcosystemSection({ ecosystemTools }: Props) {
  return (
    <div className="space-y-10">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
          <Users className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-bold text-purple-900">
            Ecosistema de Aprendizaje
          </span>
        </div>

        <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900">
          Potencia tu estudio: Nos integramos con tus herramientas favoritas
        </h2>

        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          English Learning es el centro de tu ecosistema de aprendizaje
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-8 max-w-6xl mx-auto">
        {ecosystemTools.map((tool, index) => (
          <div key={index} className="group flex flex-col items-center gap-4 cursor-pointer">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
              <ImageWithFallback
                src={tool.image}
                alt={tool.name}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-base sm:text-lg font-bold text-gray-900 text-center">
              {tool.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
