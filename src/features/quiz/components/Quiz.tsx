import { useEffect, useMemo, useState } from "react";
import { PenTool, Clock, Award, TrendingUp } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: "Fácil" | "Medio" | "Difícil";
  level: string;
}

export function Quiz() {
  const QUIZ_SECONDS = 300; // 5 minutes

  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUIZ_SECONDS);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions: Question[] = useMemo(
    () => [
      {
        id: 1,
        question: "If I ___ you, I wouldn't have accepted that job offer.",
        options: ["was", "were", "had been", "would be"],
        correctAnswer: 2,
        difficulty: "Difícil",
        level: "B2",
      },
      {
        id: 2,
        question: "By the time we arrive, the movie ___ for 20 minutes.",
        options: ["will start", "will be starting", "will have been starting", "will have started"],
        correctAnswer: 2,
        difficulty: "Difícil",
        level: "C1",
      },
      {
        id: 3,
        question: "She insisted ___ the meeting despite being ill.",
        options: ["to attend", "on attending", "attend", "attended"],
        correctAnswer: 1,
        difficulty: "Medio",
        level: "B2",
      },
      {
        id: 4,
        question: "The company is thought ___ over 500 employees next year.",
        options: ["to hire", "hiring", "to be hiring", "will hire"],
        correctAnswer: 0,
        difficulty: "Difícil",
        level: "C1",
      },
      {
        id: 5,
        question: "___ hard you try, you won't be able to finish it in time.",
        options: ["However", "Whatever", "Whichever", "Whenever"],
        correctAnswer: 0,
        difficulty: "Difícil",
        level: "C1",
      },
      {
        id: 6,
        question: "I wish I ___ more attention in class when I was younger.",
        options: ["paid", "had paid", "would pay", "have paid"],
        correctAnswer: 1,
        difficulty: "Difícil",
        level: "B2",
      },
      {
        id: 7,
        question: "The project, ___ completion is expected next month, has been delayed.",
        options: ["which", "whose", "that", "who"],
        correctAnswer: 1,
        difficulty: "Medio",
        level: "B1",
      },
      {
        id: 8,
        question: "No sooner ___ the door than the phone rang.",
        options: ["I had opened", "had I opened", "I opened", "did I open"],
        correctAnswer: 1,
        difficulty: "Difícil",
        level: "C1",
      },
      {
        id: 9,
        question: "She's been working here ___ 2015.",
        options: ["for", "since", "from", "during"],
        correctAnswer: 1,
        difficulty: "Fácil",
        level: "A2",
      },
      {
        id: 10,
        question: "Had we known about the traffic, we ___ earlier.",
        options: ["would leave", "would have left", "will leave", "left"],
        correctAnswer: 1,
        difficulty: "Difícil",
        level: "B2",
      },
      {
        id: 11,
        question: "The report needs ___ before the meeting.",
        options: ["to finish", "finishing", "finished", "finish"],
        correctAnswer: 1,
        difficulty: "Medio",
        level: "B1",
      },
      {
        id: 12,
        question: "Not only ___ the exam, but she also got the highest score.",
        options: ["she passed", "did she pass", "she did pass", "passed she"],
        correctAnswer: 1,
        difficulty: "Difícil",
        level: "C1",
      },
      {
        id: 13,
        question: "I would rather you ___ me the truth from the beginning.",
        options: ["tell", "told", "had told", "have told"],
        correctAnswer: 2,
        difficulty: "Difícil",
        level: "C1",
      },
      {
        id: 14,
        question: "The building ___ renovated when the fire broke out.",
        options: ["was being", "has been", "had been", "is being"],
        correctAnswer: 0,
        difficulty: "Medio",
        level: "B2",
      },
      {
        id: 15,
        question: "___ I understand your point, I still disagree with your conclusion.",
        options: ["Despite", "Although", "However", "In spite"],
        correctAnswer: 1,
        difficulty: "Medio",
        level: "B1",
      },
      {
        id: 16,
        question: "Little ___ that his life was about to change forever.",
        options: ["he knew", "did he know", "he did know", "knew he"],
        correctAnswer: 1,
        difficulty: "Difícil",
        level: "C1",
      },
      {
        id: 17,
        question: "The teacher made us ___ the entire chapter.",
        options: ["to rewrite", "rewrite", "rewriting", "rewrote"],
        correctAnswer: 1,
        difficulty: "Medio",
        level: "B1",
      },
      {
        id: 18,
        question: "It's high time we ___ action on this matter.",
        options: ["take", "took", "taken", "have taken"],
        correctAnswer: 1,
        difficulty: "Difícil",
        level: "C1",
      },
      {
        id: 19,
        question: "I'm not used to ___ so early in the morning.",
        options: ["wake up", "waking up", "woke up", "have woken up"],
        correctAnswer: 1,
        difficulty: "Medio",
        level: "B1",
      },
      {
        id: 20,
        question: "Scarcely ___ the presentation when questions started pouring in.",
        options: ["I had finished", "had I finished", "I finished", "did I finish"],
        correctAnswer: 1,
        difficulty: "Difícil",
        level: "C2",
      },
    ],
    []
  );

  // ✅ TIMER REAL
  useEffect(() => {
    if (!quizStarted || quizCompleted) return;

    const interval = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(interval);
          setQuizCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [quizStarted, quizCompleted]);

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setTimeLeft(QUIZ_SECONDS);
    setQuizCompleted(false);
  };

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore((s) => s + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((q) => q + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    const ss = s < 10 ? `0${s}` : `${s}`;
    return `${m}:${ss}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil":
        return "bg-green-100 text-green-700";
      case "Medio":
        return "bg-yellow-100 text-yellow-700";
      case "Difícil":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getEnglishLevel = () => {
    const percentage = (score / questions.length) * 100;

    if (percentage >= 90) {
      return {
        level: "C2",
        name: "Maestría",
        color: "from-purple-600 to-pink-600",
        description:
          "Tienes un dominio excepcional del inglés. Puedes comprender y expresarte con precisión en cualquier contexto, incluso en situaciones complejas y abstractas.",
      };
    } else if (percentage >= 80) {
      return {
        level: "C1",
        name: "Avanzado",
        color: "from-blue-600 to-purple-600",
        description:
          "Tu nivel de inglés es avanzado. Puedes comunicarte con fluidez y espontaneidad, comprender textos complejos y expresar ideas con claridad sobre temas diversos.",
      };
    } else if (percentage >= 65) {
      return {
        level: "B2",
        name: "Intermedio Alto",
        color: "from-green-600 to-blue-600",
        description:
          "Tienes un nivel intermedio-alto. Puedes entender las ideas principales de textos complejos, interactuar con fluidez y producir textos claros sobre temas variados.",
      };
    } else if (percentage >= 50) {
      return {
        level: "B1",
        name: "Intermedio",
        color: "from-yellow-600 to-green-600",
        description:
          "Tu nivel es intermedio. Puedes comprender los puntos principales en situaciones cotidianas, desenvolverte en viajes y expresar opiniones sobre temas conocidos.",
      };
    } else if (percentage >= 35) {
      return {
        level: "A2",
        name: "Elemental",
        color: "from-orange-600 to-yellow-600",
        description:
          "Tienes un nivel elemental. Puedes comunicarte en tareas simples y cotidianas, comprender frases habituales y describir aspectos de tu entorno inmediato.",
      };
    } else {
      return {
        level: "A1",
        name: "Principiante",
        color: "from-red-600 to-orange-600",
        description:
          "Estás en nivel principiante. Puedes comprender y usar expresiones básicas, presentarte e interactuar de forma simple cuando tu interlocutor habla despacio.",
      };
    }
  };

  // ✅ Pantalla inicial
  if (!quizStarted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-12 text-center space-y-8">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <PenTool className="w-12 h-12 text-blue-600" />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Quiz de Evaluación</h1>
            <p className="text-xl text-gray-600">Evalúa tu nivel de inglés con nuestro quiz completo</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">{questions.length}</div>
              <div className="text-sm text-gray-600">Preguntas</div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-6 h-6 text-purple-600" />
                <div className="text-3xl font-bold text-purple-600">5</div>
              </div>
              <div className="text-sm text-gray-600">Minutos</div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-sm text-gray-600">Todos los Niveles</div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg max-w-2xl mx-auto">
            <h3 className="font-semibold text-gray-900 mb-3">Instrucciones:</h3>
            <ul className="text-left text-gray-600 space-y-2">
              <li>• Responde {questions.length} preguntas de inglés</li>
              <li>• Las preguntas incluyen gramática, vocabulario y comprensión</li>
              <li>• Tienes 5 minutos para completar el quiz</li>
              <li>• Al final recibirás tu puntuación y nivel estimado</li>
            </ul>
          </div>

          <button
            onClick={startQuiz}
            className="bg-blue-600 text-white px-12 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
          >
            Comenzar Quiz
          </button>
        </div>
      </div>
    );
  }

  // ✅ Resultados
  if (quizCompleted) {
    const percentage = (score / questions.length) * 100;
    const levelInfo = getEnglishLevel();

    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-12 text-center space-y-8">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Award className="w-16 h-16 text-blue-600" />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">¡Quiz Completado!</h1>
            <p className="text-xl text-gray-600">Has finalizado el test de evaluación</p>
          </div>

          <div className={`bg-gradient-to-r ${levelInfo.color} rounded-2xl p-10 text-white shadow-xl`}>
            <div className="text-7xl font-bold mb-4">{levelInfo.level}</div>
            <div className="text-3xl font-semibold mb-6">{levelInfo.name}</div>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed">{levelInfo.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {score}/{questions.length}
              </div>
              <div className="text-sm text-gray-600">Puntuación Total</div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">{score}</div>
              <div className="text-sm text-gray-600">Respuestas Correctas</div>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="text-4xl font-bold text-purple-600 mb-2">{percentage.toFixed(0)}%</div>
              <div className="text-sm text-gray-600">Precisión</div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg max-w-2xl mx-auto">
            <h3 className="font-semibold text-gray-900 mb-3">
              Marco Común Europeo de Referencia (MCER):
            </h3>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className={`p-2 rounded ${levelInfo.level === "A1" ? "bg-red-100 font-semibold" : "bg-white"}`}>
                A1 - Principiante
              </div>
              <div className={`p-2 rounded ${levelInfo.level === "A2" ? "bg-orange-100 font-semibold" : "bg-white"}`}>
                A2 - Elemental
              </div>
              <div className={`p-2 rounded ${levelInfo.level === "B1" ? "bg-yellow-100 font-semibold" : "bg-white"}`}>
                B1 - Intermedio
              </div>
              <div className={`p-2 rounded ${levelInfo.level === "B2" ? "bg-green-100 font-semibold" : "bg-white"}`}>
                B2 - Intermedio Alto
              </div>
              <div className={`p-2 rounded ${levelInfo.level === "C1" ? "bg-blue-100 font-semibold" : "bg-white"}`}>
                C1 - Avanzado
              </div>
              <div className={`p-2 rounded ${levelInfo.level === "C2" ? "bg-purple-100 font-semibold" : "bg-white"}`}>
                C2 - Maestría
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={startQuiz}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Intentar de Nuevo
            </button>
            <button
              onClick={() => {
                setQuizStarted(false);
                setQuizCompleted(false);
                setTimeLeft(QUIZ_SECONDS);
                setScore(0);
                setCurrentQuestion(0);
                setSelectedAnswer(null);
              }}
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header con progreso + timer */}
      <div className="bg-white p-6 rounded-lg shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Pregunta {currentQuestion + 1} de {questions.length}
          </span>

          <div className="flex items-center gap-3">
            <span className={`text-xs px-3 py-1 rounded-full ${getDifficultyColor(question.difficulty)}`}>
              {question.difficulty}
            </span>

            <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Tarjeta pregunta */}
      <div className="bg-white p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">{question.question}</h2>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                selectedAnswer === index ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === index ? "border-blue-600 bg-blue-600" : "border-gray-300"
                  }`}
                >
                  {selectedAnswer === index && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className="text-gray-900">{option}</span>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {currentQuestion < questions.length - 1 ? "Siguiente Pregunta" : "Finalizar Quiz"}
        </button>
      </div>
    </div>
  );
}
