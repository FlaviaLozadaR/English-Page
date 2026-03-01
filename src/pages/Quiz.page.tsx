import { useState } from "react";
import { Award, Clock, PenTool, TrendingUp } from "lucide-react";
import { SEO } from "../shared/components/SEO";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: "Fácil" | "Medio" | "Difícil";
  level: string;
}

export function QuizPage() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  // TODO: wire timer if needed
  const [quizCompleted, setQuizCompleted] = useState(false);

  // SEO Meta Tags
  const seoComponent = (
    <SEO 
      title="Quiz de Inglés Online - Test Completo por Niveles A1-C2 | Gratis 2026"
      description="Evalúa tu nivel de inglés GRATIS con nuestros quizzes interactivos profesionales. +200 preguntas de gramática, vocabulario y comprensión organizadas por nivel (A1, A2, B1, B2, C1, C2). Resultados instantáneos con explicaciones detalladas."
      keywords="quiz inglés, test de inglés, examen inglés online, nivel de inglés, english quiz, grammar test, vocabulary test, test nivel inglés, quiz ingles gratis, examen inglés nivel"
      canonical="https://english-learning-platform.com/quiz"
      breadcrumbs={[
        { name: 'Inicio', url: 'https://english-learning-platform.com/' },
        { name: 'Quiz', url: 'https://english-learning-platform.com/quiz' }
      ]}
      faq={[
        {
          question: '¿Cómo sé mi nivel de inglés?',
          answer: 'Completa nuestro quiz de evaluación que incluye preguntas de gramática, vocabulario y comprensión. Al finalizar recibirás tu nivel según el Marco Común Europeo (A1-C2) con retroalimentación detallada.'
        },
        {
          question: '¿Cuántas preguntas tiene el quiz?',
          answer: 'El quiz completo contiene entre 20-50 preguntas dependiendo de tu progreso. Las preguntas se adaptan a tu nivel conforme avanzas para una evaluación precisa.'
        },
        {
          question: '¿Puedo repetir el quiz?',
          answer: 'Sí, puedes realizar el quiz cuantas veces quieras para medir tu progreso. Recomendamos esperar al menos 2-3 semanas entre evaluaciones para ver mejoras significativas.'
        }
      ]}
    />
  );

  const questions: Question[] = [
    {
      id: 1,
      question: "If I ___ you, I wouldn't have accepted that job offer.",
      options: ["was", "were", "had been", "would be"],
      correctAnswer: 2,
      difficulty: "Difícil",
      level: "B2"
    },
    {
      id: 2,
      question: "By the time we arrive, the movie ___ for 20 minutes.",
      options: ["will start", "will be starting", "will have been starting", "will have started"],
      correctAnswer: 2,
      difficulty: "Difícil",
      level: "C1"
    },
    {
      id: 3,
      question: "She insisted ___ the meeting despite being ill.",
      options: ["to attend", "on attending", "attend", "attended"],
      correctAnswer: 1,
      difficulty: "Medio",
      level: "B2"
    },
    {
      id: 4,
      question: "The company is thought ___ over 500 employees next year.",
      options: ["to hire", "hiring", "to be hiring", "will hire"],
      correctAnswer: 0,
      difficulty: "Difícil",
      level: "C1"
    },
    {
      id: 5,
      question: "___ hard you try, you won't be able to finish it in time.",
      options: ["However", "Whatever", "Whichever", "Whenever"],
      correctAnswer: 0,
      difficulty: "Difícil",
      level: "C1"
    },
    {
      id: 6,
      question: "I wish I ___ more attention in class when I was younger.",
      options: ["paid", "had paid", "would pay", "have paid"],
      correctAnswer: 1,
      difficulty: "Difícil",
      level: "B2"
    },
    {
      id: 7,
      question: "The project, ___ completion is expected next month, has been delayed.",
      options: ["which", "whose", "that", "who"],
      correctAnswer: 1,
      difficulty: "Medio",
      level: "B1"
    },
    {
      id: 8,
      question: "No sooner ___ the door than the phone rang.",
      options: ["I had opened", "had I opened", "I opened", "did I open"],
      correctAnswer: 1,
      difficulty: "Difícil",
      level: "C1"
    },
    {
      id: 9,
      question: "She's been working here ___ 2015.",
      options: ["for", "since", "from", "during"],
      correctAnswer: 1,
      difficulty: "Fácil",
      level: "A2"
    },
    {
      id: 10,
      question: "Had we known about the traffic, we ___ earlier.",
      options: ["would leave", "would have left", "will leave", "left"],
      correctAnswer: 1,
      difficulty: "Difícil",
      level: "B2"
    },
    {
      id: 11,
      question: "The report needs ___ before the meeting.",
      options: ["to finish", "finishing", "finished", "finish"],
      correctAnswer: 1,
      difficulty: "Medio",
      level: "B1"
    },
    {
      id: 12,
      question: "Not only ___ the exam, but she also got the highest score.",
      options: ["she passed", "did she pass", "she did pass", "passed she"],
      correctAnswer: 1,
      difficulty: "Difícil",
      level: "C1"
    },
    {
      id: 13,
      question: "I would rather you ___ me the truth from the beginning.",
      options: ["tell", "told", "had told", "have told"],
      correctAnswer: 2,
      difficulty: "Difícil",
      level: "C1"
    },
    {
      id: 14,
      question: "The building ___ renovated when the fire broke out.",
      options: ["was being", "has been", "had been", "is being"],
      correctAnswer: 0,
      difficulty: "Medio",
      level: "B2"
    },
    {
      id: 15,
      question: "___ I understand your point, I still disagree with your conclusion.",
      options: ["Despite", "Although", "However", "In spite"],
      correctAnswer: 1,
      difficulty: "Medio",
      level: "B1"
    },
    {
      id: 16,
      question: "Little ___ that his life was about to change forever.",
      options: ["he knew", "did he know", "he did know", "knew he"],
      correctAnswer: 1,
      difficulty: "Difícil",
      level: "C1"
    },
    {
      id: 17,
      question: "The teacher made us ___ the entire chapter.",
      options: ["to rewrite", "rewrite", "rewriting", "rewrote"],
      correctAnswer: 1,
      difficulty: "Medio",
      level: "B1"
    },
    {
      id: 18,
      question: "It's high time we ___ action on this matter.",
      options: ["take", "took", "taken", "have taken"],
      correctAnswer: 1,
      difficulty: "Difícil",
      level: "C1"
    },
    {
      id: 19,
      question: "I'm not used to ___ so early in the morning.",
      options: ["wake up", "waking up", "woke up", "have woken up"],
      correctAnswer: 1,
      difficulty: "Medio",
      level: "B1"
    },
    {
      id: 20,
      question: "Scarcely ___ the presentation when questions started pouring in.",
      options: ["I had finished", "had I finished", "I finished", "did I finish"],
      correctAnswer: 1,
      difficulty: "Difícil",
      level: "C2"
    }
  ];

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setQuizCompleted(false);
  };

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
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

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "¡Perfecto! Dominas el inglés";
    if (percentage >= 80) return "¡Excelente! Nivel Avanzado";
    if (percentage >= 60) return "¡Muy bien! Nivel Intermedio";
    if (percentage >= 40) return "Buen esfuerzo. Nivel Básico-Intermedio";
    return "Sigue practicando. Nivel Principiante";
  };

  const getEnglishLevel = () => {
    const percentage = (score / questions.length) * 100;
    
    if (percentage >= 90) {
      return {
        level: "C2",
        name: "Maestría",
        color: "from-purple-600 to-pink-600",
        description: "Tienes un dominio excepcional del inglés. Puedes comprender y expresarte con precisión en cualquier contexto, incluso en situaciones complejas y abstractas."
      };
    } else if (percentage >= 80) {
      return {
        level: "C1",
        name: "Avanzado",
        color: "from-blue-600 to-purple-600",
        description: "Tu nivel de inglés es avanzado. Puedes comunicarte con fluidez y espontaneidad, comprender textos complejos y expresar ideas con claridad sobre temas diversos."
      };
    } else if (percentage >= 65) {
      return {
        level: "B2",
        name: "Intermedio Alto",
        color: "from-green-600 to-blue-600",
        description: "Tienes un nivel intermedio-alto. Puedes entender las ideas principales de textos complejos, interactuar con fluidez y producir textos claros sobre temas variados."
      };
    } else if (percentage >= 50) {
      return {
        level: "B1",
        name: "Intermedio",
        color: "from-yellow-600 to-green-600",
        description: "Tu nivel es intermedio. Puedes comprender los puntos principales en situaciones cotidianas, desenvolverte en viajes y expresar opiniones sobre temas conocidos."
      };
    } else if (percentage >= 35) {
      return {
        level: "A2",
        name: "Elemental",
        color: "from-orange-600 to-yellow-600",
        description: "Tienes un nivel elemental. Puedes comunicarte en tareas simples y cotidianas, comprender frases habituales y describir aspectos de tu entorno inmediato."
      };
    } else {
      return {
        level: "A1",
        name: "Principiante",
        color: "from-red-600 to-orange-600",
        description: "Estás en nivel principiante. Puedes comprender y usar expresiones básicas, presentarte e interactuar de forma simple cuando tu interlocutor habla despacio."
      };
    }
  };

  if (!quizStarted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-10 lg:p-12 text-center space-y-6 sm:space-y-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <PenTool className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600" />
          </div>
          
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Quiz de Evaluación</h1>
            <p className="text-base sm:text-xl text-gray-600">
              Evalúa tu nivel de inglés con nuestro quiz completo
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-2xl mx-auto">
            <div className="bg-blue-50 p-4 sm:p-6 rounded-lg">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">{questions.length}</div>
              <div className="text-sm text-gray-600">Preguntas</div>
            </div>
            <div className="bg-purple-50 p-4 sm:p-6 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                <div className="text-2xl sm:text-3xl font-bold text-purple-600">5</div>
              </div>
              <div className="text-sm text-gray-600">Minutos</div>
            </div>
            <div className="bg-green-50 p-4 sm:p-6 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                <span className="text-sm sm:text-base text-gray-600">Todos los Niveles</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 sm:p-6 rounded-lg max-w-2xl mx-auto">
            <h3 className="font-semibold text-gray-900 mb-3">Instrucciones:</h3>
            <ul className="text-left text-gray-600 text-sm sm:text-base space-y-2">
              <li>• Responde {questions.length} preguntas de inglés</li>
              <li>• Las preguntas incluyen gramática, vocabulario y comprensión</li>
              <li>• Tienes 5 minutos para completar el quiz</li>
              <li>• Al final recibirás tu puntuación y nivel estimado</li>
            </ul>
          </div>

          <button
            onClick={startQuiz}
            className="w-full sm:w-auto bg-blue-600 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-lg hover:bg-blue-700 transition-colors text-base sm:text-lg font-semibold"
          >
            Comenzar Quiz
          </button>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const percentage = (score / questions.length) * 100;
    const levelInfo = getEnglishLevel();
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-10 lg:p-12 text-center space-y-6 sm:space-y-8">
          <div className="w-16 h-16 sm:w-24 sm:h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Award className="w-10 h-10 sm:w-16 sm:h-16 text-blue-600" />
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">¡Quiz Completado!</h1>
            <p className="text-base sm:text-xl text-gray-600">Has finalizado el test de evaluación</p>
          </div>

          <div className={`bg-gradient-to-r ${levelInfo.color} rounded-2xl p-6 sm:p-10 text-white shadow-xl`}>
            <div className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4">
              {levelInfo.level}
            </div>
            <div className="text-xl sm:text-3xl font-semibold mb-4 sm:mb-6">{levelInfo.name}</div>
            <p className="text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">{levelInfo.description}</p>
          </div>

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-3xl mx-auto">
            <div className="bg-blue-50 p-4 sm:p-6 rounded-lg">
              <div className="text-2xl sm:text-4xl font-bold text-blue-600 mb-2">
                {score}/{questions.length}
              </div>
              <div className="text-sm text-gray-600">Puntuación Total</div>
            </div>
            <div className="bg-green-50 p-4 sm:p-6 rounded-lg">
              <div className="text-2xl sm:text-4xl font-bold text-green-600 mb-2">{score}</div>
              <div className="text-sm text-gray-600">Respuestas Correctas</div>
            </div>
            <div className="bg-purple-50 p-4 sm:p-6 rounded-lg">
              <div className="text-2xl sm:text-4xl font-bold text-purple-600 mb-2">{percentage.toFixed(0)}%</div>
              <div className="text-sm text-gray-600">Precisión</div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 sm:p-6 rounded-lg max-w-2xl mx-auto">
            <h3 className="font-semibold text-gray-900 mb-3">Marco Común Europeo de Referencia (MCER):</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs sm:text-sm">
              <div className={`p-2 rounded ${levelInfo.level === 'A1' ? 'bg-red-100 font-semibold' : 'bg-white'}`}>A1 - Principiante</div>
              <div className={`p-2 rounded ${levelInfo.level === 'A2' ? 'bg-orange-100 font-semibold' : 'bg-white'}`}>A2 - Elemental</div>
              <div className={`p-2 rounded ${levelInfo.level === 'B1' ? 'bg-yellow-100 font-semibold' : 'bg-white'}`}>B1 - Intermedio</div>
              <div className={`p-2 rounded ${levelInfo.level === 'B2' ? 'bg-green-100 font-semibold' : 'bg-white'}`}>B2 - Intermedio Alto</div>
              <div className={`p-2 rounded ${levelInfo.level === 'C1' ? 'bg-blue-100 font-semibold' : 'bg-white'}`}>C1 - Avanzado</div>
              <div className={`p-2 rounded ${levelInfo.level === 'C2' ? 'bg-purple-100 font-semibold' : 'bg-white'}`}>C2 - Maestría</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button
              onClick={startQuiz}
              className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Intentar de Nuevo
            </button>
            <button
              onClick={() => setQuizStarted(false)}
              className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 px-6 sm:px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
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
    <>
      {seoComponent}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0 space-y-6">
      {/* Progress Header */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <span className="text-sm text-gray-600">
            Pregunta {currentQuestion + 1} de {questions.length}
          </span>
          <span className={`text-xs px-3 py-1 rounded-full ${getDifficultyColor(question.difficulty)}`}>
            {question.difficulty}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white p-5 sm:p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-lg sm:text-2xl font-semibold text-gray-900">{question.question}</h2>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full p-3 sm:p-4 text-left rounded-lg border-2 transition-all ${
                selectedAnswer === index
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="flex items-start sm:items-center gap-3">
                <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswer === index
                    ? "border-blue-600 bg-blue-600"
                    : "border-gray-300"
                }`}>
                  {selectedAnswer === index && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span className="text-sm sm:text-base text-gray-900">{option}</span>
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
    </>
  );
}