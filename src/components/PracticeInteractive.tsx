import { useMemo, useState } from "react";
import {
  Target,
  Search,
  Award,
  ArrowRight,
  CheckCircle,
  XCircle,
  FileText,
  Clock
} from "lucide-react";

import type { Exam, PracticeCategory, Test, ViewMode } from "../types/practice";
import { categories, exams, examFilters, filters } from "../data/practiceData";

export default function PracticeInteractive() {
  const [view, setView] = useState<ViewMode>("categories");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<(typeof filters)[number]>("Todos");
  const [selectedExamFilter, setSelectedExamFilter] =
    useState<(typeof examFilters)[number]>("Todos");

  const [selectedCategory, setSelectedCategory] = useState<PracticeCategory | null>(null);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Match state (por pregunta)
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const matchesSearch =
        category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        selectedFilter === "Todos" ||
        category.title.includes(selectedFilter) ||
        category.description.toLowerCase().includes(selectedFilter.toLowerCase());

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, selectedFilter]);

  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      const matchesSearch =
        exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter = selectedExamFilter === "Todos" || exam.level === selectedExamFilter;

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, selectedExamFilter]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Fácil":
      case "Principiante":
        return "bg-green-100 text-green-700";
      case "Intermedio":
        return "bg-yellow-100 text-yellow-700";
      case "Difícil":
      case "Avanzado":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleCategoryClick = (category: PracticeCategory) => {
    setSelectedCategory(category);
    setView("tests");
  };

  const handleTestClick = (test: Test) => {
    setSelectedTest(test);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setShowResults(false);
    setMatchedPairs(new Set());
    setSelectedLeft(null);
    setSelectedRight(null);
    setView("test-active");
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answer;
    setUserAnswers(newAnswers);
  };

  const handleMatchClick = (index: number, side: "left" | "right") => {
    if (!selectedTest) return;
    const question = selectedTest.questions[currentQuestion];
    if (question.type !== "match" || !question.pairs) return;

    if (side === "left") {
      setSelectedLeft(index);
      if (selectedRight !== null) {
        const pairKey = `${index}-${selectedRight}`;
        setMatchedPairs(new Set(matchedPairs).add(pairKey));
        setSelectedLeft(null);
        setSelectedRight(null);
      }
    } else {
      setSelectedRight(index);
      if (selectedLeft !== null) {
        const pairKey = `${selectedLeft}-${index}`;
        setMatchedPairs(new Set(matchedPairs).add(pairKey));
        setSelectedLeft(null);
        setSelectedRight(null);
      }
    }
  };

  const handleNext = () => {
    if (selectedTest && currentQuestion < selectedTest.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setMatchedPairs(new Set());
      setSelectedLeft(null);
      setSelectedRight(null);
    }
  };

  const handleFinish = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    if (!selectedTest) return 0;
    let correct = 0;

    selectedTest.questions.forEach((q, i) => {
      if (q.type === "match") {
        if (matchedPairs.size === (q.pairs?.length ?? 0)) correct++;
      } else {
        const userAnswer = userAnswers[i]?.trim().toLowerCase();
        const correctAnswer = q.correctAnswer.trim().toLowerCase();
        if (userAnswer === correctAnswer) correct++;
      }
    });

    return Math.round((correct / selectedTest.questions.length) * 100);
  };

  const handleBack = () => {
    if (view === "test-active") {
      setView("tests");
      setSelectedTest(null);
      setShowResults(false);
      setUserAnswers([]);
      setCurrentQuestion(0);
      setMatchedPairs(new Set());
      setSelectedLeft(null);
      setSelectedRight(null);
    } else if (view === "tests") {
      setSelectedCategory(null);
      setView("categories");
    } else if (view === "exams") {
      setView("categories");
    }
  };

  const currentQ = selectedTest ? selectedTest.questions[currentQuestion] : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Target className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Práctica Interactiva</h1>
            <p className="text-gray-600">
              {view === "categories"
                ? "Selecciona una categoría para practicar"
                : view === "tests"
                ? `${selectedCategory?.title} - Elige un test`
                : view === "test-active"
                ? `${selectedTest?.description ?? ""}`
                : "Exámenes completos de inglés"}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {view !== "categories" && (
            <button
              onClick={handleBack}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              ← Volver
            </button>
          )}

          {view !== "test-active" && (
            <button
              onClick={() => {
                setView(view === "exams" ? "categories" : "exams");
                setSearchTerm("");
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {view === "exams" ? "Ver Prácticas" : "Ver Exámenes"}
            </button>
          )}
        </div>
      </div>

      {/* Search and Filter */}
      {view !== "tests" && view !== "test-active" && (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={view === "exams" ? "Buscar examen..." : "Buscar categoría..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            />
          </div>

          <select
            value={view === "exams" ? selectedExamFilter : selectedFilter}
            onChange={(e) =>
              view === "exams"
                ? setSelectedExamFilter(e.target.value as any)
                : setSelectedFilter(e.target.value as any)
            }
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
          >
            {(view === "exams" ? examFilters : filters).map((filter) => (
              <option key={filter} value={filter}>
                {filter}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Categories View */}
      {view === "categories" && (
        <>
          <div className="text-sm text-gray-600 mb-4">
            Mostrando {filteredCategories.length} de {categories.length} categorías
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                  className="group relative bg-white rounded-xl shadow-md border-2 border-gray-200 hover:border-blue-500 transition-all p-6 text-left overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity`}
                  />
                  <div className="relative">
                    <Icon className="w-12 h-12 mb-4 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{category.description}</p>

                    {/* Conteo rápido por nivel */}
                    <div className="flex items-center gap-2 text-sm flex-wrap">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
                        {category.tests.filter((t) => t.level === "Fácil").length} Fácil
                      </span>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                        {category.tests.filter((t) => t.level === "Intermedio").length} Intermedio
                      </span>
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full">
                        {category.tests.filter((t) => t.level === "Difícil").length} Difícil
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Tests View */}
      {view === "tests" && selectedCategory && (
        <div className="space-y-6">
          <div className={`bg-gradient-to-br ${selectedCategory.color} p-8 rounded-xl text-white`}>
            {(() => {
              const Icon = selectedCategory.icon;
              return <Icon className="w-12 h-12 mb-3" />;
            })()}
            <h2 className="text-2xl font-bold mb-2">{selectedCategory.title}</h2>
            <p className="text-white/90">{selectedCategory.description}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedCategory.tests.map((test) => (
              <div
                key={test.id}
                onClick={() => handleTestClick(test)}
                className="bg-white rounded-xl shadow-md border-2 border-gray-200 hover:border-blue-500 transition-all p-6 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`text-sm px-3 py-1 rounded-full font-medium ${getLevelColor(test.level)}`}>
                    {test.level}
                  </span>
                  <Award className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">Test {test.id}</h3>
                <p className="text-gray-600 text-sm mb-4">{test.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{test.questions.length} preguntas</span>
                  <span className="px-4 py-2 bg-blue-600 text-white rounded-lg group-hover:bg-blue-700 transition-colors">
                    Comenzar
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Test View */}
      {view === "test-active" && selectedTest && !showResults && currentQ && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Pregunta {currentQuestion + 1} de {selectedTest.questions.length}
                </span>
                <span className={`text-sm px-3 py-1 rounded-full ${getLevelColor(selectedTest.level)}`}>
                  {selectedTest.level}
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${((currentQuestion + 1) / selectedTest.questions.length) * 100}%`
                  }}
                />
              </div>
            </div>

            {/* Question */}
            {currentQ.type === "multiple" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">{currentQ.question}</h3>
                <div className="space-y-3">
                  {currentQ.options?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        userAnswers[currentQuestion] === option
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-300 hover:border-blue-400 bg-white"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentQ.type === "fill" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">{currentQ.question}</h3>
                <input
                  type="text"
                  value={userAnswers[currentQuestion] || ""}
                  onChange={(e) => handleAnswer(e.target.value)}
                  placeholder="Escribe tu respuesta..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>
            )}

            {currentQ.type === "match" && currentQ.pairs && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{currentQ.question}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    {currentQ.pairs.map((pair, index) => (
                      <button
                        key={index}
                        onClick={() => handleMatchClick(index, "left")}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                          selectedLeft === index
                            ? "border-blue-600 bg-blue-50"
                            : Array.from(matchedPairs).some((p) => p.startsWith(`${index}-`))
                            ? "border-green-500 bg-green-50"
                            : "border-gray-300 hover:border-blue-400 bg-white"
                        }`}
                      >
                        {pair.left}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {currentQ.pairs.map((pair, index) => (
                      <button
                        key={index}
                        onClick={() => handleMatchClick(index, "right")}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                          selectedRight === index
                            ? "border-blue-600 bg-blue-50"
                            : Array.from(matchedPairs).some((p) => p.endsWith(`-${index}`))
                            ? "border-green-500 bg-green-50"
                            : "border-gray-300 hover:border-blue-400 bg-white"
                        }`}
                      >
                        {pair.right}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>

              {currentQuestion < selectedTest.questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  Siguiente
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleFinish}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  Finalizar
                  <CheckCircle className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Results View */}
      {view === "test-active" && showResults && selectedTest && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <Award className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">¡Test Completado!</h2>
              <p className="text-gray-600">Has terminado el test. Aquí están tus resultados:</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-8">
              <div className="text-center">
                <div className="text-6xl font-bold text-blue-600 mb-2">{calculateScore()}%</div>
                <p className="text-gray-700 text-lg">
                  {calculateScore() >= 80
                    ? "¡Excelente trabajo!"
                    : calculateScore() >= 60
                    ? "Buen trabajo"
                    : "Sigue practicando"}
                </p>
              </div>
            </div>

            {/* Review */}
            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-bold text-gray-900">Revisión de Respuestas:</h3>
              {selectedTest.questions.map((q, i) => {
                const userAnswer = userAnswers[i]?.trim().toLowerCase();
                const correctAnswer = q.correctAnswer.trim().toLowerCase();
                const isCorrect =
                  q.type === "match"
                    ? matchedPairs.size === (q.pairs?.length ?? 0)
                    : userAnswer === correctAnswer;

                return (
                  <div
                    key={i}
                    className={`p-4 rounded-lg border-2 ${
                      isCorrect ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      )}

                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 mb-1">
                          Pregunta {i + 1}: {q.question}
                        </p>

                        {q.type !== "match" && (
                          <>
                            <p className="text-sm text-gray-700">
                              Tu respuesta:{" "}
                              <span className={isCorrect ? "text-green-700" : "text-red-700"}>
                                {userAnswers[i] || "(sin respuesta)"}
                              </span>
                            </p>
                            {!isCorrect && (
                              <p className="text-sm text-gray-700">
                                Respuesta correcta:{" "}
                                <span className="text-green-700 font-medium">{q.correctAnswer}</span>
                              </p>
                            )}
                          </>
                        )}

                        {q.explanation && (
                          <p className="text-sm text-gray-600 mt-2 italic">💡 {q.explanation}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setView("tests");
                  setSelectedTest(null);
                  setShowResults(false);
                  setUserAnswers([]);
                  setCurrentQuestion(0);
                  setMatchedPairs(new Set());
                }}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Ver Otros Tests
              </button>

              <button
                onClick={() => {
                  setShowResults(false);
                  setUserAnswers([]);
                  setCurrentQuestion(0);
                  setMatchedPairs(new Set());
                }}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reintentar Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exams View */}
      {view === "exams" && (
        <>
          <div className="text-sm text-gray-600 mb-4">
            Mostrando {filteredExams.length} de {exams.length} exámenes
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredExams.map((exam: Exam) => (
              <div
                key={exam.id}
                className="bg-white rounded-xl shadow-md border-2 border-gray-200 hover:border-blue-500 transition-all p-6 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`text-sm px-3 py-1 rounded-full font-medium ${getLevelColor(exam.level)}`}>
                    {exam.level}
                  </span>
                  <FileText className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{exam.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{exam.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FileText className="w-4 h-4" />
                    <span>{exam.questions} preguntas</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{exam.duration} minutos</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {exam.topics.slice(0, 3).map((topic, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                      {topic}
                    </span>
                  ))}
                  {exam.topics.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                      +{exam.topics.length - 3}
                    </span>
                  )}
                </div>

                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Comenzar Examen
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Empty */}
      {((view === "categories" && filteredCategories.length === 0) ||
        (view === "exams" && filteredExams.length === 0)) && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No se encontraron {view === "exams" ? "exámenes" : "categorías"} que coincidan con tu búsqueda
          </p>
        </div>
      )}
    </div>
  );
}
