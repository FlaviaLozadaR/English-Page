import { useState } from "react";
import {
  Target,
  Search,
  X,
  ArrowRight,
  Clock,
  Type,
  Users,
  Zap,
  MessageCircle,
  Brain,
  Globe,
  Briefcase,
  Sparkles,
  ChevronRight,
  MapPin,
  BarChart,
  Award,
  Link as LinkIcon,
  Layers,
  TrendingUp,
  Coffee,
  BookOpen,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface PracticeTopic {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  levelsAvailable: number;
  totalQuestions: number;
  category: "practice" | "exam";
}

export default function PracticeNew() {
  const [selectedTopic, setSelectedTopic] = useState<PracticeTopic | null>(null);
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Todos");

  const topics: PracticeTopic[] = [
    {
      id: "parts-of-speech",
      title: "Partes de la Oración",
      description: "Nouns, verbs, adjectives, adverbs",
      icon: Type,
      color: "from-purple-500 to-pink-500",
      levelsAvailable: 3,
      totalQuestions: 30,
      category: "practice",
    },
    {
      id: "pronouns",
      title: "Pronombres",
      description: "Subject, object, possessive pronouns",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      levelsAvailable: 3,
      totalQuestions: 30,
      category: "practice",
    },
    {
      id: "verb-tenses",
      title: "Tiempos Verbales",
      description: "Present, past, future forms",
      icon: Clock,
      color: "from-green-500 to-teal-500",
      levelsAvailable: 3,
      totalQuestions: 30,
      category: "practice",
    },
    {
      id: "modal-verbs",
      title: "Verbos Modales",
      description: "Can, could, should, must, might",
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
      levelsAvailable: 3,
      totalQuestions: 30,
      category: "practice",
    },
    {
      id: "phrasal-verbs",
      title: "Phrasal Verbs",
      description: "Look up, give up, turn down",
      icon: MessageCircle,
      color: "from-red-500 to-pink-500",
      levelsAvailable: 3,
      totalQuestions: 30,
      category: "practice",
    },
    {
      id: "conditionals-zero",
      title: "Condicional Zero",
      description: "If + present, present",
      icon: Brain,
      color: "from-indigo-500 to-purple-500",
      levelsAvailable: 3,
      totalQuestions: 30,
      category: "practice",
    },
    {
      id: "conditionals-first",
      title: "First Conditional",
      description: "If + present, will + verb",
      icon: Brain,
      color: "from-violet-500 to-purple-500",
      levelsAvailable: 3,
      totalQuestions: 30,
      category: "practice",
    },
    {
      id: "conditionals-second",
      title: "Second Conditional",
      description: "If + past, would + verb",
      icon: Brain,
      color: "from-fuchsia-500 to-pink-500",
      levelsAvailable: 3,
      totalQuestions: 30,
      category: "practice",
    },
    {
      id: "conditionals-third",
      title: "Third Conditional",
      description: "If + past perfect, would have",
      icon: Brain,
      color: "from-purple-600 to-indigo-600",
      levelsAvailable: 3,
      totalQuestions: 30,
      category: "practice",
    },
    {
      id: "passive-voice",
      title: "Voz Pasiva",
      description: "Active to passive voice",
      icon: Globe,
      color: "from-cyan-500 to-blue-500",
      levelsAvailable: 3,
      totalQuestions: 30,
      category: "practice",
    },
    {
      id: "reported-speech",
      title: "Discurso Indirecto",
      description: "Direct to indirect speech",
      icon: Briefcase,
      color: "from-emerald-500 to-green-500",
      levelsAvailable: 3,
      totalQuestions: 30,
      category: "practice",
    },
    {
      id: "prepositions",
      title: "Preposiciones",
      description: "In, on, at, by, with",
      icon: MapPin,
      color: "from-amber-500 to-yellow-500",
      levelsAvailable: 3,
      totalQuestions: 30,
      category: "practice",
    },
    {
      id: "comparatives",
      title: "Comparativos y Superlativos",
      description: "Bigger, biggest, more, most",
      icon: BarChart,
      color: "from-rose-500 to-red-500",
      levelsAvailable: 3,
      totalQuestions: 30,
      category: "practice",
    },

    // EXÁMENES
    {
      id: "exam-verb-tenses-beginner",
      title: "Examen: Tiempos Verbales",
      description: "Presente simple, continuo y pasado",
      icon: Award,
      color: "from-blue-600 to-purple-600",
      levelsAvailable: 3,
      totalQuestions: 120,
      category: "exam",
    },
    {
      id: "exam-modals-conditionals",
      title: "Examen: Modales y Condicionales",
      description: "Can, should, must, condicionales 0-3",
      icon: Award,
      color: "from-purple-600 to-pink-600",
      levelsAvailable: 1,
      totalQuestions: 35,
      category: "exam",
    },
    {
      id: "exam-passive-voice",
      title: "Examen: Voz Pasiva",
      description: "Voz pasiva en todos los tiempos",
      icon: Award,
      color: "from-indigo-600 to-blue-600",
      levelsAvailable: 1,
      totalQuestions: 30,
      category: "exam",
    },
    {
      id: "exam-general-grammar",
      title: "Examen: Gramática General",
      description: "Todos los temas de gramática",
      icon: Award,
      color: "from-cyan-600 to-teal-600",
      levelsAvailable: 3,
      totalQuestions: 150,
      category: "exam",
    },
    {
      id: "exam-vocabulary",
      title: "Examen: Vocabulario",
      description: "Vocabulario básico y avanzado",
      icon: Award,
      color: "from-green-600 to-emerald-600",
      levelsAvailable: 3,
      totalQuestions: 100,
      category: "exam",
    },
  ];

  const filters = ["Todos", "Práctica", "Exámenes"];

  const filteredTopics = topics.filter((topic) => {
    const matchesSearch =
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === "Todos" ||
      (selectedFilter === "Práctica" && topic.category === "practice") ||
      (selectedFilter === "Exámenes" && topic.category === "exam");

    return matchesSearch && matchesFilter;
  });

  const handleTopicClick = (topic: PracticeTopic) => {
    setSelectedTopic(topic);
    setShowLevelModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Moderno */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl blur-2xl opacity-30"></div>
          <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform">
            <Target className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
        </div>

        <div className="text-center md:text-left flex-1">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
            <h1 className="text-2xl lg:text-3xl font-black text-gray-900">
              Práctica y Exámenes
            </h1>
            <Sparkles className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-base text-gray-600">
            Domina el inglés con ejercicios y evaluaciones completas
          </p>
        </div>
      </div>

      {/* Search y Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar temas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
                selectedFilter === filter
                  ? "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white shadow-lg shadow-blue-300/50"
                  : "bg-white border-2 border-gray-200 text-gray-700 hover:border-purple-300 hover:shadow-md"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTopics.map((topic) => {
          const Icon = topic.icon;
          const isExam = topic.category === "exam";

          return (
            <div
              key={topic.id}
              onClick={() => handleTopicClick(topic)}
              className={`group relative bg-white rounded-2xl p-5 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:-translate-y-1 ${
                isExam ? "border-2 border-purple-300" : ""
              }`}
            >
              {isExam && (
                <div className="absolute top-3 right-3">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                    EXAMEN
                  </span>
                </div>
              )}

              <div className="relative mb-4">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${topic.color} rounded-xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity`}
                ></div>
                <div
                  className={`relative w-12 h-12 bg-gradient-to-br ${topic.color} rounded-xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
              </div>

              <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
                {topic.title}
              </h3>

              <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                {topic.description}
              </p>

              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-bold ${
                    isExam
                      ? "bg-purple-100 text-purple-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {topic.levelsAvailable}{" "}
                  {topic.levelsAvailable === 1 ? "Nivel" : "Niveles"}
                </span>
                <span className="text-xs px-3 py-1 rounded-full font-bold bg-gray-100 text-gray-700">
                  {topic.totalQuestions}Q
                </span>
              </div>

              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          );
        })}
      </div>

      {filteredTopics.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-4">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg font-semibold">
            No se encontraron temas
          </p>
          <p className="text-gray-400 text-sm">
            Intenta con otro término de búsqueda
          </p>
        </div>
      )}

      {/* Modal */}
      {showLevelModal && selectedTopic && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 transform animate-in fade-in zoom-in duration-200">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${selectedTopic.color} rounded-xl shadow-lg flex items-center justify-center mb-3`}
                >
                  {(() => {
                    const Icon = selectedTopic.icon;
                    return (
                      <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                    );
                  })()}
                </div>
                <h2 className="text-xl font-black text-gray-900 mb-1">
                  {selectedTopic.title}
                </h2>
                <p className="text-sm text-gray-600">
                  {selectedTopic.description}
                </p>
              </div>

              <button
                onClick={() => setShowLevelModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-700 mb-3">
                Selecciona un nivel:
              </h3>

              {selectedTopic.levelsAvailable >= 1 && (
                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-between group">
                  <div className="text-left">
                    <div className="text-sm opacity-90">Nivel 1</div>
                    <div className="text-lg">Principiante</div>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              )}

              {selectedTopic.levelsAvailable >= 2 && (
                <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-between group">
                  <div className="text-left">
                    <div className="text-sm opacity-90">Nivel 2</div>
                    <div className="text-lg">Intermedio</div>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              )}

              {selectedTopic.levelsAvailable >= 3 && (
                <button className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-between group">
                  <div className="text-left">
                    <div className="text-sm opacity-90">Nivel 3</div>
                    <div className="text-lg">Avanzado</div>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total de preguntas:</span>
                <span className="font-bold text-gray-900">
                  {selectedTopic.totalQuestions}
                </span>
              </div>

              {selectedTopic.category === "exam" && (
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-600">Duración estimada:</span>
                  <span className="font-bold text-gray-900 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    45-90 min
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
