import { useEffect, useState } from "react";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
} from "lucide-react";
import { SEO } from "../shared/components/SEO";

interface Verb {
  id: number;
  present: string;
  past: string;
  participle: string;
  spanish: string;
  category: string;
  example: string;
}

export function VocabularyPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // SEO Meta Tags
  const seoComponent = (
    <SEO 
      title="Vocabulario en Inglés - Verbos Irregulares y Más | English Learning"
      description="Aprende y practica vocabulario en inglés. Lista completa de verbos irregulares, verbos regulares y vocabulario esencial con ejemplos prácticos."
      keywords="vocabulario inglés, verbos irregulares inglés, irregular verbs, verbos regulares, english vocabulary, aprender palabras inglés"
      canonical="https://english-learning-platform.com/vocabulary"
    />
  );

  const verbs: Verb[] = [
    // VERBOS IRREGULARES MÁS COMUNES (A-D)
    { id: 1, present: "be", past: "was/were", participle: "been", spanish: "ser/estar", category: "Irregular", example: "I am happy / I was happy / I have been happy" },
    { id: 2, present: "have", past: "had", participle: "had", spanish: "tener", category: "Irregular", example: "I have a car / I had a car / I have had a car" },
    { id: 3, present: "do", past: "did", participle: "done", spanish: "hacer", category: "Irregular", example: "I do homework / I did homework / I have done homework" },
    { id: 4, present: "say", past: "said", participle: "said", spanish: "decir", category: "Irregular", example: "I say hello / I said hello / I have said hello" },
    { id: 5, present: "go", past: "went", participle: "gone", spanish: "ir", category: "Irregular", example: "I go home / I went home / I have gone home" },
    { id: 6, present: "get", past: "got", participle: "got/gotten", spanish: "obtener/conseguir", category: "Irregular", example: "I get a gift / I got a gift / I have gotten a gift" },
    { id: 7, present: "make", past: "made", participle: "made", spanish: "hacer/crear", category: "Irregular", example: "I make dinner / I made dinner / I have made dinner" },
    { id: 8, present: "know", past: "knew", participle: "known", spanish: "saber/conocer", category: "Irregular", example: "I know him / I knew him / I have known him" },
    { id: 9, present: "think", past: "thought", participle: "thought", spanish: "pensar", category: "Irregular", example: "I think so / I thought so / I have thought about it" },
    { id: 10, present: "take", past: "took", participle: "taken", spanish: "tomar/llevar", category: "Irregular", example: "I take the bus / I took the bus / I have taken the bus" },
    { id: 11, present: "see", past: "saw", participle: "seen", spanish: "ver", category: "Irregular", example: "I see you / I saw you / I have seen you" },
    { id: 12, present: "come", past: "came", participle: "come", spanish: "venir", category: "Irregular", example: "I come here / I came here / I have come here" },
    { id: 13, present: "want", past: "wanted", participle: "wanted", spanish: "querer", category: "Regular", example: "I want this / I wanted this / I have wanted this" },
    { id: 14, present: "give", past: "gave", participle: "given", spanish: "dar", category: "Irregular", example: "I give a gift / I gave a gift / I have given a gift" },
    { id: 15, present: "use", past: "used", participle: "used", spanish: "usar", category: "Regular", example: "I use my phone / I used my phone / I have used my phone" },
    { id: 16, present: "find", past: "found", participle: "found", spanish: "encontrar", category: "Irregular", example: "I find it / I found it / I have found it" },
    { id: 17, present: "tell", past: "told", participle: "told", spanish: "decir/contar", category: "Irregular", example: "I tell you / I told you / I have told you" },
    { id: 18, present: "ask", past: "asked", participle: "asked", spanish: "preguntar", category: "Regular", example: "I ask questions / I asked questions / I have asked questions" },
    { id: 19, present: "work", past: "worked", participle: "worked", spanish: "trabajar", category: "Regular", example: "I work here / I worked here / I have worked here" },
    { id: 20, present: "call", past: "called", participle: "called", spanish: "llamar", category: "Regular", example: "I call you / I called you / I have called you" },
    
    // VERBOS IRREGULARES (E-L)
    { id: 21, present: "try", past: "tried", participle: "tried", spanish: "intentar", category: "Regular", example: "I try hard / I tried hard / I have tried hard" },
    { id: 22, present: "feel", past: "felt", participle: "felt", spanish: "sentir", category: "Irregular", example: "I feel good / I felt good / I have felt good" },
    { id: 23, present: "become", past: "became", participle: "become", spanish: "convertirse", category: "Irregular", example: "I become better / I became better / I have become better" },
    { id: 24, present: "leave", past: "left", participle: "left", spanish: "dejar/salir", category: "Irregular", example: "I leave now / I left yesterday / I have left already" },
    { id: 25, present: "put", past: "put", participle: "put", spanish: "poner", category: "Irregular", example: "I put it here / I put it there / I have put it away" },
    { id: 26, present: "mean", past: "meant", participle: "meant", spanish: "significar", category: "Irregular", example: "I mean it / I meant it / I have meant it" },
    { id: 27, present: "keep", past: "kept", participle: "kept", spanish: "mantener/guardar", category: "Irregular", example: "I keep promises / I kept my promise / I have kept it" },
    { id: 28, present: "let", past: "let", participle: "let", spanish: "dejar/permitir", category: "Irregular", example: "I let you go / I let you go / I have let you go" },
    { id: 29, present: "begin", past: "began", participle: "begun", spanish: "comenzar", category: "Irregular", example: "I begin now / I began yesterday / I have begun" },
    { id: 30, present: "seem", past: "seemed", participle: "seemed", spanish: "parecer", category: "Regular", example: "I seem tired / I seemed tired / I have seemed tired" },
    { id: 31, present: "help", past: "helped", participle: "helped", spanish: "ayudar", category: "Regular", example: "I help people / I helped you / I have helped many" },
    { id: 32, present: "show", past: "showed", participle: "shown/showed", spanish: "mostrar", category: "Irregular", example: "I show you / I showed you / I have shown you" },
    { id: 33, present: "hear", past: "heard", participle: "heard", spanish: "oír/escuchar", category: "Irregular", example: "I hear you / I heard you / I have heard about it" },
    { id: 34, present: "play", past: "played", participle: "played", spanish: "jugar/tocar", category: "Regular", example: "I play soccer / I played yesterday / I have played before" },
    { id: 35, present: "run", past: "ran", participle: "run", spanish: "correr", category: "Irregular", example: "I run fast / I ran yesterday / I have run a marathon" },
    { id: 36, present: "move", past: "moved", participle: "moved", spanish: "mover/mudarse", category: "Regular", example: "I move here / I moved last year / I have moved twice" },
    { id: 37, present: "like", past: "liked", participle: "liked", spanish: "gustar", category: "Regular", example: "I like it / I liked it / I have always liked it" },
    { id: 38, present: "live", past: "lived", participle: "lived", spanish: "vivir", category: "Regular", example: "I live here / I lived there / I have lived in Paris" },
    { id: 39, present: "believe", past: "believed", participle: "believed", spanish: "creer", category: "Regular", example: "I believe you / I believed you / I have believed in you" },
    { id: 40, present: "bring", past: "brought", participle: "brought", spanish: "traer", category: "Irregular", example: "I bring lunch / I brought lunch / I have brought food" },
    
    // VERBOS IRREGULARES (M-S)
    { id: 41, present: "happen", past: "happened", participle: "happened", spanish: "suceder/pasar", category: "Regular", example: "It happens / It happened / It has happened before" },
    { id: 42, present: "write", past: "wrote", participle: "written", spanish: "escribir", category: "Irregular", example: "I write daily / I wrote a book / I have written emails" },
    { id: 43, present: "sit", past: "sat", participle: "sat", spanish: "sentarse", category: "Irregular", example: "I sit here / I sat there / I have sat all day" },
    { id: 44, present: "stand", past: "stood", participle: "stood", spanish: "estar de pie", category: "Irregular", example: "I stand up / I stood up / I have stood for hours" },
    { id: 45, present: "lose", past: "lost", participle: "lost", spanish: "perder", category: "Irregular", example: "I lose often / I lost my keys / I have lost weight" },
    { id: 46, present: "pay", past: "paid", participle: "paid", spanish: "pagar", category: "Irregular", example: "I pay rent / I paid cash / I have paid already" },
    { id: 47, present: "meet", past: "met", participle: "met", spanish: "conocer/encontrarse", category: "Irregular", example: "I meet people / I met her / I have met him before" },
    { id: 48, present: "include", past: "included", participle: "included", spanish: "incluir", category: "Regular", example: "I include you / I included you / I have included everyone" },
    { id: 49, present: "continue", past: "continued", participle: "continued", spanish: "continuar", category: "Regular", example: "I continue / I continued / I have continued working" },
    { id: 50, present: "set", past: "set", participle: "set", spanish: "establecer/poner", category: "Irregular", example: "I set goals / I set the table / I have set records" },
    { id: 51, present: "learn", past: "learned/learnt", participle: "learned/learnt", spanish: "aprender", category: "Regular", example: "I learn fast / I learned English / I have learned a lot" },
    { id: 52, present: "change", past: "changed", participle: "changed", spanish: "cambiar", category: "Regular", example: "I change / I changed / I have changed my mind" },
    { id: 53, present: "lead", past: "led", participle: "led", spanish: "liderar/guiar", category: "Irregular", example: "I lead the team / I led yesterday / I have led before" },
    { id: 54, present: "understand", past: "understood", participle: "understood", spanish: "entender", category: "Irregular", example: "I understand / I understood / I have understood it" },
    { id: 55, present: "watch", past: "watched", participle: "watched", spanish: "ver/mirar", category: "Regular", example: "I watch TV / I watched a movie / I have watched it" },
    { id: 56, present: "follow", past: "followed", participle: "followed", spanish: "seguir", category: "Regular", example: "I follow you / I followed you / I have followed the rules" },
    { id: 57, present: "stop", past: "stopped", participle: "stopped", spanish: "parar/detener", category: "Regular", example: "I stop here / I stopped there / I have stopped smoking" },
    { id: 58, present: "create", past: "created", participle: "created", spanish: "crear", category: "Regular", example: "I create art / I created this / I have created content" },
    { id: 59, present: "speak", past: "spoke", participle: "spoken", spanish: "hablar", category: "Irregular", example: "I speak English / I spoke to him / I have spoken publicly" },
    { id: 60, present: "read", past: "read", participle: "read", spanish: "leer", category: "Irregular", example: "I read books / I read yesterday / I have read it" },
    
    // VERBOS IRREGULARES (T-W) Y REGULARES IMPORTANTES
    { id: 61, present: "spend", past: "spent", participle: "spent", spanish: "gastar/pasar tiempo", category: "Irregular", example: "I spend money / I spent $50 / I have spent too much" },
    { id: 62, present: "grow", past: "grew", participle: "grown", spanish: "crecer/cultivar", category: "Irregular", example: "I grow plants / I grew up here / I have grown taller" },
    { id: 63, present: "open", past: "opened", participle: "opened", spanish: "abrir", category: "Regular", example: "I open the door / I opened it / I have opened it" },
    { id: 64, present: "walk", past: "walked", participle: "walked", spanish: "caminar", category: "Regular", example: "I walk daily / I walked home / I have walked 5 miles" },
    { id: 65, present: "win", past: "won", participle: "won", spanish: "ganar", category: "Irregular", example: "I win often / I won the game / I have won prizes" },
    { id: 66, present: "teach", past: "taught", participle: "taught", spanish: "enseñar", category: "Irregular", example: "I teach English / I taught yesterday / I have taught for years" },
    { id: 67, present: "offer", past: "offered", participle: "offered", spanish: "ofrecer", category: "Regular", example: "I offer help / I offered my seat / I have offered advice" },
    { id: 68, present: "remember", past: "remembered", participle: "remembered", spanish: "recordar", category: "Regular", example: "I remember / I remembered you / I have remembered everything" },
    { id: 69, present: "consider", past: "considered", participle: "considered", spanish: "considerar", category: "Regular", example: "I consider it / I considered it / I have considered your offer" },
    { id: 70, present: "appear", past: "appeared", participle: "appeared", spanish: "aparecer", category: "Regular", example: "I appear calm / I appeared nervous / I have appeared on TV" },
    { id: 71, present: "buy", past: "bought", participle: "bought", spanish: "comprar", category: "Irregular", example: "I buy groceries / I bought a car / I have bought gifts" },
    { id: 72, present: "serve", past: "served", participle: "served", spanish: "servir", category: "Regular", example: "I serve food / I served dinner / I have served customers" },
    { id: 73, present: "die", past: "died", participle: "died", spanish: "morir", category: "Regular", example: "Plants die / It died / Many have died" },
    { id: 74, present: "send", past: "sent", participle: "sent", spanish: "enviar", category: "Irregular", example: "I send emails / I sent a letter / I have sent messages" },
    { id: 75, present: "build", past: "built", participle: "built", spanish: "construir", category: "Irregular", example: "I build houses / I built a wall / I have built a business" },
    { id: 76, present: "stay", past: "stayed", participle: "stayed", spanish: "quedarse/permanecer", category: "Regular", example: "I stay here / I stayed home / I have stayed overnight" },
    { id: 77, present: "fall", past: "fell", participle: "fallen", spanish: "caer", category: "Irregular", example: "I fall sometimes / I fell down / I have fallen twice" },
    { id: 78, present: "cut", past: "cut", participle: "cut", spanish: "cortar", category: "Irregular", example: "I cut paper / I cut my hair / I have cut vegetables" },
    { id: 79, present: "reach", past: "reached", participle: "reached", spanish: "alcanzar/llegar", category: "Regular", example: "I reach goals / I reached the top / I have reached my limit" },
    { id: 80, present: "kill", past: "killed", participle: "killed", spanish: "matar", category: "Regular", example: "Time kills / It killed him / Many have been killed" },
    
    // VERBOS ADICIONALES MUY COMUNES
    { id: 81, present: "raise", past: "raised", participle: "raised", spanish: "levantar/criar", category: "Regular", example: "I raise my hand / I raised $1000 / I have raised children" },
    { id: 82, present: "pass", past: "passed", participle: "passed", spanish: "pasar/aprobar", category: "Regular", example: "I pass the test / I passed the exam / I have passed the course" },
    { id: 83, present: "sell", past: "sold", participle: "sold", spanish: "vender", category: "Irregular", example: "I sell products / I sold my car / I have sold everything" },
    { id: 84, present: "decide", past: "decided", participle: "decided", spanish: "decidir", category: "Regular", example: "I decide now / I decided yesterday / I have decided to go" },
    { id: 85, present: "return", past: "returned", participle: "returned", spanish: "regresar/devolver", category: "Regular", example: "I return home / I returned it / I have returned safely" },
    { id: 86, present: "explain", past: "explained", participle: "explained", spanish: "explicar", category: "Regular", example: "I explain clearly / I explained it / I have explained everything" },
    { id: 87, present: "hope", past: "hoped", participle: "hoped", spanish: "esperar (desear)", category: "Regular", example: "I hope so / I hoped for better / I have always hoped" },
    { id: 88, present: "develop", past: "developed", participle: "developed", spanish: "desarrollar", category: "Regular", example: "I develop apps / I developed skills / I have developed habits" },
    { id: 89, present: "carry", past: "carried", participle: "carried", spanish: "llevar/cargar", category: "Regular", example: "I carry bags / I carried it / I have carried heavy loads" },
    { id: 90, present: "break", past: "broke", participle: "broken", spanish: "romper", category: "Irregular", example: "I break rules / I broke my phone / I have broken promises" },
    { id: 91, present: "receive", past: "received", participle: "received", spanish: "recibir", category: "Regular", example: "I receive emails / I received a gift / I have received awards" },
    { id: 92, present: "agree", past: "agreed", participle: "agreed", spanish: "estar de acuerdo", category: "Regular", example: "I agree / I agreed with you / I have agreed to help" },
    { id: 93, present: "support", past: "supported", participle: "supported", spanish: "apoyar", category: "Regular", example: "I support you / I supported him / I have supported the team" },
    { id: 94, present: "hit", past: "hit", participle: "hit", spanish: "golpear/pegar", category: "Irregular", example: "I hit the ball / I hit it / I have hit my target" },
    { id: 95, present: "produce", past: "produced", participle: "produced", spanish: "producir", category: "Regular", example: "I produce content / I produced a video / I have produced results" },
    { id: 96, present: "eat", past: "ate", participle: "eaten", spanish: "comer", category: "Irregular", example: "I eat healthy / I ate lunch / I have eaten already" },
    { id: 97, present: "cover", past: "covered", participle: "covered", spanish: "cubrir", category: "Regular", example: "I cover costs / I covered it / I have covered everything" },
    { id: 98, present: "catch", past: "caught", participle: "caught", spanish: "atrapar/coger", category: "Irregular", example: "I catch the bus / I caught a cold / I have caught fish" },
    { id: 99, present: "draw", past: "drew", participle: "drawn", spanish: "dibujar", category: "Irregular", example: "I draw pictures / I drew a map / I have drawn comics" },
    { id: 100, present: "choose", past: "chose", participle: "chosen", spanish: "elegir", category: "Irregular", example: "I choose wisely / I chose this / I have chosen my path" },
    
    // VERBOS IRREGULARES IMPORTANTES ADICIONALES
    { id: 101, present: "wear", past: "wore", participle: "worn", spanish: "usar/llevar puesto", category: "Irregular", example: "I wear glasses / I wore a suit / I have worn this before" },
    { id: 102, present: "fly", past: "flew", participle: "flown", spanish: "volar", category: "Irregular", example: "I fly often / I flew to Paris / I have flown many times" },
    { id: 103, present: "forget", past: "forgot", participle: "forgotten", spanish: "olvidar", category: "Irregular", example: "I forget names / I forgot my keys / I have forgotten passwords" },
    { id: 104, present: "ride", past: "rode", participle: "ridden", spanish: "montar/andar", category: "Irregular", example: "I ride my bike / I rode a horse / I have ridden motorcycles" },
    { id: 105, present: "drink", past: "drank", participle: "drunk", spanish: "beber", category: "Irregular", example: "I drink water / I drank coffee / I have drunk tea" },
    { id: 106, present: "throw", past: "threw", participle: "thrown", spanish: "lanzar/tirar", category: "Irregular", example: "I throw balls / I threw it away / I have thrown parties" },
    { id: 107, present: "sing", past: "sang", participle: "sung", spanish: "cantar", category: "Irregular", example: "I sing daily / I sang a song / I have sung in public" },
    { id: 108, present: "swim", past: "swam", participle: "swum", spanish: "nadar", category: "Irregular", example: "I swim well / I swam yesterday / I have swum in the ocean" },
    { id: 109, present: "drive", past: "drove", participle: "driven", spanish: "conducir/manejar", category: "Irregular", example: "I drive safely / I drove home / I have driven trucks" },
    { id: 110, present: "wake", past: "woke", participle: "woken", spanish: "despertar", category: "Irregular", example: "I wake up early / I woke at 6 AM / I have woken up late" },
    { id: 111, present: "hold", past: "held", participle: "held", spanish: "sostener/mantener", category: "Irregular", example: "I hold it / I held the baby / I have held meetings" },
    { id: 112, present: "steal", past: "stole", participle: "stolen", spanish: "robar", category: "Irregular", example: "Thieves steal / Someone stole my bike / My wallet has been stolen" },
    { id: 113, present: "tear", past: "tore", participle: "torn", spanish: "rasgar/romper", category: "Irregular", example: "I tear paper / I tore my shirt / I have torn documents" },
    { id: 114, present: "freeze", past: "froze", participle: "frozen", spanish: "congelar", category: "Irregular", example: "I freeze food / It froze overnight / The lake has frozen" },
    { id: 115, present: "bite", past: "bit", participle: "bitten", spanish: "morder", category: "Irregular", example: "Dogs bite / It bit me / I have been bitten by mosquitoes" },
    { id: 116, present: "hide", past: "hid", participle: "hidden", spanish: "esconder", category: "Irregular", example: "I hide things / I hid the keys / I have hidden money" },
    { id: 117, present: "shake", past: "shook", participle: "shaken", spanish: "sacudir/agitar", category: "Irregular", example: "I shake hands / I shook the bottle / I have shaken it well" },
    { id: 118, present: "hang", past: "hung", participle: "hung", spanish: "colgar", category: "Irregular", example: "I hang pictures / I hung the coat / I have hung decorations" },
    { id: 119, present: "blow", past: "blew", participle: "blown", spanish: "soplar", category: "Irregular", example: "I blow candles / The wind blew / The balloon has blown away" },
    { id: 120, present: "rise", past: "rose", participle: "risen", spanish: "subir/elevarse", category: "Irregular", example: "I rise early / The sun rose / Prices have risen" },
  ];

  const categories = ["Todos", "Regular", "Irregular"];

  const filteredVerbs = verbs.filter(verb => {
    const matchesCategory = selectedCategory === "Todos" || verb.category === selectedCategory;
    const matchesSearch = 
      verb.present.toLowerCase().includes(searchTerm.toLowerCase()) ||
      verb.past.toLowerCase().includes(searchTerm.toLowerCase()) ||
      verb.participle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      verb.spanish.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredVerbs.length / itemsPerPage);
  const currentVerbs = filteredVerbs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <>
      {seoComponent}
      <div className="space-y-4 sm:space-y-6">
      {/* Header con diseño moderno */}
      <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl blur-2xl opacity-30"></div>
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform">
            <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2.5} />
          </div>
        </div>
        
        <div className="text-center md:text-left">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 mb-1">Verbos más Usados</h1>
          <p className="text-sm sm:text-base text-gray-600">Los 120 verbos más comunes en inglés con sus tres formas</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            placeholder="Buscar verbo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 bg-white transition-colors"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-600 mb-4">
        Mostrando {filteredVerbs.length} de {verbs.length} verbos
      </div>

      {/* Info Box */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl border border-blue-200 mb-6 shadow-md">
        <p className="text-xs sm:text-sm text-gray-700">
          <strong>💡 Tip:</strong> Los verbos <span className="text-blue-600 font-semibold">irregulares</span> cambian su forma en pasado y participio. 
          Los <span className="text-purple-600 font-semibold">regulares</span> añaden "-ed" en pasado y participio.
        </p>
      </div>

      {/* Verbs Grid - 4 columns with compact design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentVerbs.map((verb) => (
          <div 
            key={verb.id}
            className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl p-4 sm:p-5 transition-all duration-300 hover:scale-105 hover:-translate-y-1 overflow-hidden"
          >
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity ${
              verb.category === "Irregular" 
                ? "from-blue-500 to-cyan-500" 
                : "from-purple-500 to-pink-500"
            }`}></div>
            
            <div className="relative z-10">
              {/* Header with 3D badges */}
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <div className={`absolute inset-0 rounded-full blur-md opacity-30 ${
                    verb.category === "Irregular"
                      ? "bg-blue-500"
                      : "bg-purple-500"
                  }`}></div>
                  <span className={`relative text-[10px] sm:text-xs px-3 py-1.5 rounded-full font-black shadow-lg ${
                    verb.category === "Irregular"
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                      : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  }`}>
                    {verb.category === "Irregular" ? "IRREGULAR" : "REGULAR"}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full shadow-sm">
                  {verb.spanish}
                </span>
              </div>
              
              {/* Verb forms with modern cards */}
              <div className="space-y-3 mb-4">
                <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-3 shadow-md border border-gray-100">
                  <div className="text-xs font-black text-gray-500 mb-1 tracking-wide">PRESENTE</div>
                  <div className="text-lg sm:text-xl font-black text-gray-900">{verb.present}</div>
                </div>
                
                <div className="relative bg-gradient-to-br from-blue-50 to-white rounded-2xl p-3 shadow-md border border-blue-100">
                  <div className="text-xs font-black text-blue-600 mb-1 tracking-wide">PASADO</div>
                  <div className="text-lg sm:text-xl font-black text-blue-700">{verb.past}</div>
                </div>
                
                <div className="relative bg-gradient-to-br from-purple-50 to-white rounded-2xl p-3 shadow-md border border-purple-100">
                  <div className="text-xs font-black text-purple-600 mb-1 tracking-wide">PARTICIPIO</div>
                  <div className="text-lg sm:text-xl font-black text-purple-700">{verb.participle}</div>
                </div>
              </div>

              {/* Example with blur background */}
              <div className="relative bg-gradient-to-br from-gray-50 to-white backdrop-blur-sm p-3 rounded-2xl border border-gray-100 shadow-sm">
                <div className="text-xs font-black text-gray-500 mb-1.5 tracking-wide">EJEMPLO</div>
                <div className="text-[11px] sm:text-xs text-gray-700 leading-relaxed">{verb.example}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredVerbs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-sm sm:text-lg">No se encontraron verbos que coincidan con tu búsqueda</p>
        </div>
      )}

      {/* Pagination - Enhanced */}
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            title="Primera página"
          >
            <ChevronLeft className="w-4 h-4 inline" />
            <ChevronLeft className="w-4 h-4 inline -ml-3" />
          </button>
          
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold hidden sm:inline">Anterior</span>
          </button>
          
          <div className="flex flex-wrap items-center gap-2 px-2 sm:px-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
              // Show first page, last page, current page, and adjacent pages
              if (
                page === 1 || 
                page === totalPages || 
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg font-bold transition-all text-sm sm:text-base ${
                      currentPage === page
                        ? "bg-blue-600 text-white shadow-lg scale-110"
                        : "bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:bg-blue-50"
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return <span key={page} className="text-gray-400">...</span>;
              }
              return null;
            })}
          </div>
          
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1"
          >
            <span className="font-semibold hidden sm:inline">Siguiente</span>
            <ChevronRight className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            title="Última página"
          >
            <ChevronRight className="w-4 h-4 inline" />
            <ChevronRight className="w-4 h-4 inline -ml-3" />
          </button>
          
          <div className="w-full sm:w-auto text-center sm:ml-4 text-xs sm:text-sm text-gray-600 font-semibold">
            Página {currentPage} de {totalPages}
          </div>
        </div>
      )}
    </div>
    </>
  );
}