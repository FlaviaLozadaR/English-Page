import { useState } from "react";
import {
  BookOpen,
  CheckCircle,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { SEO } from "../shared/components/SEO";

interface Question {
  id: number;
  question: string;
  type: "true-false" | "multiple-choice";
  options?: string[];
  correctAnswer: string;
}

interface Reading {
  id: number;
  title: string;
  level: "Fácil" | "Intermedio" | "Difícil";
  text: string;
  questions: Question[];
}

export function ReadingPage() {
  const [selectedReading, setSelectedReading] = useState<Reading | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  // SEO Meta Tags
  const seoComponent = (
    <SEO 
      title="Reading Comprehension - Mejora tu Lectura en Inglés | English Learning"
      description="Practica reading comprehension en inglés con textos adaptados a tu nivel. Ejercicios interactivos de lectura con preguntas para mejorar tu comprensión lectora."
      keywords="reading comprehension, comprensión lectora inglés, textos en inglés, leer en inglés, ejercicios de lectura, practice reading"
      canonical="https://english-learning-platform.com/reading"
    />
  );
  const [selectedLevel, setSelectedLevel] = useState("Todos");

  const readings: Reading[] = [
    // EASY READINGS
    {
      id: 1,
      title: "My Daily Routine",
      level: "Fácil",
      text: `My name is Sarah and I am a student. Every day I wake up at 7:00 AM. I brush my teeth and wash my face. Then I eat breakfast with my family. I usually have cereal and orange juice.

After breakfast, I go to school. My classes start at 8:30 AM. I study English, Math, Science, and History. My favorite subject is English because I love reading books.

At 12:00 PM, I have lunch with my friends. We talk and laugh together. After lunch, I have two more classes. School finishes at 3:00 PM.

When I get home, I do my homework. Then I watch TV or play video games. At 7:00 PM, we have dinner as a family. I usually go to bed at 10:00 PM.

I love my daily routine because it's simple and organized.`,
      questions: [
        {
          id: 1,
          question: "Sarah wakes up at 8:00 AM.",
          type: "true-false",
          correctAnswer: "False"
        },
        {
          id: 2,
          question: "Sarah's favorite subject is English.",
          type: "true-false",
          correctAnswer: "True"
        },
        {
          id: 3,
          question: "What time does Sarah have lunch?",
          type: "multiple-choice",
          options: ["11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM"],
          correctAnswer: "12:00 PM"
        },
        {
          id: 4,
          question: "What does Sarah do after school?",
          type: "multiple-choice",
          options: ["She plays sports", "She does homework", "She goes shopping", "She sleeps"],
          correctAnswer: "She does homework"
        },
        {
          id: 5,
          question: "School finishes at 3:00 PM.",
          type: "true-false",
          correctAnswer: "True"
        }
      ]
    },
    {
      id: 2,
      title: "The Weekend Market",
      level: "Fácil",
      text: `Every Saturday morning, there is a big market in my town. The market is open from 8:00 AM to 2:00 PM. Many people go there to buy fresh food and other things.

You can find many different products at the market. There are fruits like apples, bananas, and oranges. There are also vegetables like tomatoes, carrots, and lettuce. Some vendors sell meat, fish, and cheese.

My mother and I go to the market every week. We buy fresh vegetables and fruits. Sometimes we buy flowers too. The flowers are beautiful and colorful.

The market is always very busy and noisy. People talk loudly and laugh. Children run around and play. Street musicians play guitars and sing songs. I love the energy and atmosphere of the market.

The best thing about the market is that everything is fresh and the prices are good. It's much better than shopping at the supermarket.`,
      questions: [
        {
          id: 1,
          question: "The market is open on Sunday.",
          type: "true-false",
          correctAnswer: "False"
        },
        {
          id: 2,
          question: "What time does the market close?",
          type: "multiple-choice",
          options: ["12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM"],
          correctAnswer: "2:00 PM"
        },
        {
          id: 3,
          question: "You can buy flowers at the market.",
          type: "true-false",
          correctAnswer: "True"
        },
        {
          id: 4,
          question: "What makes the market special according to the text?",
          type: "multiple-choice",
          options: ["It's quiet", "Everything is fresh with good prices", "It's small", "It's indoors"],
          correctAnswer: "Everything is fresh with good prices"
        },
        {
          id: 5,
          question: "The narrator goes to the market with her father.",
          type: "true-false",
          correctAnswer: "False"
        }
      ]
    },
    {
      id: 3,
      title: "My Best Friend",
      level: "Fácil",
      text: `I want to tell you about my best friend. His name is Tom and he is 15 years old, just like me. We have been friends since elementary school. That means we have known each other for more than 8 years!

Tom is very tall and has short black hair. He always wears a big smile on his face. He is a very friendly and funny person. He makes everyone laugh with his jokes and stories.

Tom loves sports, especially basketball. He plays on our school's basketball team. He practices every day after school. He is very good at it and has won many medals and trophies.

We do many things together. We play video games, watch movies, and go to the park. Sometimes we study together too. Tom is very smart and helps me with my Math homework.

What I like most about Tom is that he is always honest and kind. He is a loyal friend and I know I can trust him. I'm very lucky to have a friend like Tom.`,
      questions: [
        {
          id: 1,
          question: "Tom and the narrator have been friends for 8 years.",
          type: "true-false",
          correctAnswer: "True"
        },
        {
          id: 2,
          question: "What sport does Tom play?",
          type: "multiple-choice",
          options: ["Soccer", "Tennis", "Basketball", "Baseball"],
          correctAnswer: "Basketball"
        },
        {
          id: 3,
          question: "Tom has long blonde hair.",
          type: "true-false",
          correctAnswer: "False"
        },
        {
          id: 4,
          question: "What subject does Tom help with?",
          type: "multiple-choice",
          options: ["English", "Math", "Science", "History"],
          correctAnswer: "Math"
        },
        {
          id: 5,
          question: "The narrator thinks Tom is honest and kind.",
          type: "true-false",
          correctAnswer: "True"
        }
      ]
    },

    // INTERMEDIATE READINGS
    {
      id: 4,
      title: "The Benefits of Learning a Second Language",
      level: "Intermedio",
      text: `Learning a second language is one of the most valuable skills you can develop. In today's globalized world, being bilingual or multilingual opens many doors both professionally and personally.

From a career perspective, knowing multiple languages makes you a more competitive candidate in the job market. Many international companies prefer employees who can communicate with clients and partners in different countries. Studies show that bilingual employees often earn higher salaries than their monolingual counterparts.

Beyond professional benefits, learning a language also improves cognitive abilities. Research has demonstrated that bilingual people have better memory, problem-solving skills, and multitasking abilities. They can switch between tasks more efficiently and are often more creative thinkers.

Learning a language also provides cultural benefits. When you learn a language, you also learn about the culture, traditions, and way of thinking of the people who speak it. This cultural awareness makes you more open-minded and empathetic toward others.

Additionally, speaking multiple languages allows you to travel more easily and connect with people from different backgrounds. You can make friends around the world and experience cultures more authentically.

Finally, learning a language keeps your brain healthy as you age. Studies suggest that bilingual people may delay the onset of dementia and Alzheimer's disease by several years compared to monolingual individuals.`,
      questions: [
        {
          id: 1,
          question: "Bilingual employees often earn higher salaries.",
          type: "true-false",
          correctAnswer: "True"
        },
        {
          id: 2,
          question: "According to the text, what cognitive benefit do bilingual people have?",
          type: "multiple-choice",
          options: ["Better eyesight", "Better memory and problem-solving", "Stronger muscles", "Faster typing"],
          correctAnswer: "Better memory and problem-solving"
        },
        {
          id: 3,
          question: "Learning a language only provides professional benefits.",
          type: "true-false",
          correctAnswer: "False"
        },
        {
          id: 4,
          question: "What health benefit is mentioned in the text?",
          type: "multiple-choice",
          options: ["Better sleep", "Stronger immune system", "May delay dementia", "Lower blood pressure"],
          correctAnswer: "May delay dementia"
        },
        {
          id: 5,
          question: "Learning a language helps you understand different cultures.",
          type: "true-false",
          correctAnswer: "True"
        },
        {
          id: 6,
          question: "What does being bilingual NOT provide according to the text?",
          type: "multiple-choice",
          options: ["Career advantages", "Cultural awareness", "Physical strength", "Cognitive benefits"],
          correctAnswer: "Physical strength"
        }
      ]
    },
    {
      id: 5,
      title: "The Impact of Social Media",
      level: "Intermedio",
      text: `Social media has revolutionized the way we communicate and interact with each other. Platforms like Facebook, Instagram, Twitter, and TikTok have become integral parts of our daily lives, connecting billions of people worldwide.

On the positive side, social media allows us to stay connected with friends and family regardless of distance. We can share important moments, photos, and updates instantly. It has also become a powerful tool for businesses to reach customers and for individuals to build personal brands and careers.

Social media has also played a crucial role in social movements and raising awareness about important issues. Campaigns for human rights, environmental protection, and social justice have gained momentum through these platforms, allowing people to organize and mobilize quickly.

However, social media also has significant drawbacks. Many experts worry about its impact on mental health, particularly among young people. Studies have linked excessive social media use to increased anxiety, depression, and low self-esteem. The constant comparison with others and the pressure to present a perfect life online can be damaging.

Privacy is another major concern. Social media companies collect vast amounts of personal data, which can be used for targeted advertising or even sold to third parties. There have been numerous scandals involving data breaches and misuse of personal information.

Additionally, social media has become a breeding ground for misinformation and fake news. False information can spread rapidly, influencing public opinion and even election results. The echo chamber effect, where users only see content that confirms their existing beliefs, has contributed to increased polarization in society.

Finding a balance is key. While social media offers many benefits, it's important to use it mindfully and be aware of its potential negative effects.`,
      questions: [
        {
          id: 1,
          question: "Social media has helped social movements and awareness campaigns.",
          type: "true-false",
          correctAnswer: "True"
        },
        {
          id: 2,
          question: "What mental health issue is linked to excessive social media use?",
          type: "multiple-choice",
          options: ["Better mood", "Increased energy", "Increased anxiety and depression", "Improved sleep"],
          correctAnswer: "Increased anxiety and depression"
        },
        {
          id: 3,
          question: "Social media companies never collect personal data.",
          type: "true-false",
          correctAnswer: "False"
        },
        {
          id: 4,
          question: "What is the 'echo chamber effect'?",
          type: "multiple-choice",
          options: ["Hearing your own voice", "Seeing only content that confirms your beliefs", "Better acoustics", "More followers"],
          correctAnswer: "Seeing only content that confirms your beliefs"
        },
        {
          id: 5,
          question: "The text suggests that social media only has positive effects.",
          type: "true-false",
          correctAnswer: "False"
        },
        {
          id: 6,
          question: "According to the text, what is important when using social media?",
          type: "multiple-choice",
          options: ["Using it constantly", "Finding a balance and being mindful", "Avoiding it completely", "Sharing everything"],
          correctAnswer: "Finding a balance and being mindful"
        }
      ]
    },
    {
      id: 6,
      title: "Sustainable Living",
      level: "Intermedio",
      text: `Sustainable living refers to making lifestyle choices that reduce our negative impact on the environment. As climate change and environmental degradation become increasingly urgent issues, many people are adopting more sustainable practices in their daily lives.

One of the easiest ways to live more sustainably is to reduce waste. This means following the three Rs: Reduce, Reuse, and Recycle. Reducing consumption means buying only what you need and avoiding single-use plastics. Reusing items instead of throwing them away extends their life and reduces waste. Recycling properly ensures that materials can be processed and turned into new products.

Energy conservation is another important aspect of sustainable living. Simple actions like turning off lights when leaving a room, using energy-efficient appliances, and adjusting thermostats can significantly reduce energy consumption. Installing solar panels, while more expensive initially, can provide clean renewable energy and reduce electricity bills over time.

Transportation choices also play a major role in sustainability. Using public transportation, carpooling, biking, or walking instead of driving alone reduces carbon emissions. Electric vehicles are becoming more accessible and offer a cleaner alternative to traditional gasoline-powered cars.

Food choices matter too. Eating locally-sourced and seasonal foods reduces the carbon footprint associated with transportation. Reducing meat consumption, particularly beef, can have a significant environmental impact since livestock farming produces substantial greenhouse gas emissions.

Water conservation is often overlooked but equally important. Taking shorter showers, fixing leaks promptly, and using water-efficient fixtures can save thousands of gallons of water annually.

While individual actions are important, systemic change is also necessary. Supporting companies and politicians who prioritize environmental protection, and advocating for stronger environmental policies, can create broader impact.

Sustainable living doesn't mean completely changing your lifestyle overnight. Small, consistent changes add up over time and contribute to a healthier planet for future generations.`,
      questions: [
        {
          id: 1,
          question: "The three Rs stand for Reduce, Reuse, and Recycle.",
          type: "true-false",
          correctAnswer: "True"
        },
        {
          id: 2,
          question: "Which food choice has a significant environmental impact according to the text?",
          type: "multiple-choice",
          options: ["Eating more fish", "Reducing beef consumption", "Eating more bread", "Drinking more coffee"],
          correctAnswer: "Reducing beef consumption"
        },
        {
          id: 3,
          question: "Installing solar panels is always cheap and easy.",
          type: "true-false",
          correctAnswer: "False"
        },
        {
          id: 4,
          question: "What is NOT mentioned as a way to conserve energy?",
          type: "multiple-choice",
          options: ["Turning off lights", "Using energy-efficient appliances", "Exercising more", "Adjusting thermostats"],
          correctAnswer: "Exercising more"
        },
        {
          id: 5,
          question: "Water conservation includes taking shorter showers and fixing leaks.",
          type: "true-false",
          correctAnswer: "True"
        },
        {
          id: 6,
          question: "According to the text, what is necessary besides individual actions?",
          type: "multiple-choice",
          options: ["Nothing else is needed", "Systemic change and policy advocacy", "Moving to another country", "Complaining online"],
          correctAnswer: "Systemic change and policy advocacy"
        }
      ]
    },

    // DIFFICULT READINGS
    {
      id: 7,
      title: "The Evolution of Artificial Intelligence",
      level: "Difícil",
      text: `Artificial Intelligence (AI) has evolved from a theoretical concept in the mid-20th century to one of the most transformative technologies of our time. The journey began in 1956 at the Dartmouth Conference, where the term "artificial intelligence" was first coined, and researchers optimistically predicted that machines would soon match human intelligence.

The early decades of AI research, often called the "golden years," were characterized by significant enthusiasm but limited practical results. Early AI systems could solve algebra problems and prove geometric theorems, but they struggled with tasks that humans found trivial, such as recognizing faces or understanding natural language. This led to periods of reduced funding and interest, known as "AI winters," when progress stalled and skepticism grew.

The renaissance of AI began in the 1990s and accelerated dramatically in the 2010s, driven by three key factors: exponential growth in computing power, the availability of massive datasets, and breakthroughs in machine learning algorithms, particularly deep learning. Deep learning, inspired by the structure of the human brain, uses artificial neural networks with multiple layers to process and learn from data in increasingly sophisticated ways.

Today, AI applications permeate our daily lives, often invisibly. Virtual assistants like Siri and Alexa use natural language processing to understand and respond to our queries. Recommendation algorithms on Netflix and Spotify analyze our preferences to suggest content. Autonomous vehicles use computer vision and sensor fusion to navigate roads. In healthcare, AI systems can detect diseases from medical images with accuracy rivaling or exceeding human specialists.

However, the rapid advancement of AI also raises profound ethical and societal questions. Algorithmic bias is a significant concern—AI systems can perpetuate or even amplify existing societal biases present in their training data. For instance, facial recognition systems have shown higher error rates for people with darker skin tones, and hiring algorithms have discriminated against certain demographic groups.

Job displacement is another pressing issue. As AI systems become more capable, they can automate tasks previously performed by humans, potentially eliminating millions of jobs in sectors like transportation, manufacturing, and even white-collar professions like law and medicine. While new jobs will likely be created, the transition period could be disruptive and unequal.

Privacy concerns are paramount in an age where AI systems require vast amounts of data to function effectively. The collection, storage, and analysis of personal data raise questions about consent, security, and the potential for surveillance and manipulation.

Perhaps most controversially, some researchers and thinkers worry about the development of artificial general intelligence (AGI)—AI systems with human-level intelligence across all domains. While AGI remains theoretical and its timeline uncertain, its potential impact could be unprecedented, raising existential questions about human purpose, autonomy, and even survival.

Despite these challenges, many experts believe that with proper governance, ethical guidelines, and inclusive development, AI can be a powerful force for good—addressing climate change, curing diseases, and solving complex problems that have eluded humanity for generations. The key lies not in the technology itself, but in how we choose to develop and deploy it.`,
      questions: [
        {
          id: 1,
          question: "The term 'artificial intelligence' was first coined at the Dartmouth Conference in 1956.",
          type: "true-false",
          correctAnswer: "True"
        },
        {
          id: 2,
          question: "What were the three key factors that drove AI's renaissance according to the text?",
          type: "multiple-choice",
          options: [
            "Better computers, more money, smarter people",
            "Computing power growth, massive datasets, and machine learning breakthroughs",
            "Government support, public interest, and university research",
            "Social media, smartphones, and the internet"
          ],
          correctAnswer: "Computing power growth, massive datasets, and machine learning breakthroughs"
        },
        {
          id: 3,
          question: "Early AI systems could easily recognize faces and understand natural language.",
          type: "true-false",
          correctAnswer: "False"
        },
        {
          id: 4,
          question: "What is 'algorithmic bias'?",
          type: "multiple-choice",
          options: [
            "When algorithms work too fast",
            "When AI systems perpetuate or amplify societal biases from training data",
            "When computers prefer certain brands",
            "When AI systems refuse to work"
          ],
          correctAnswer: "When AI systems perpetuate or amplify societal biases from training data"
        },
        {
          id: 5,
          question: "Deep learning is inspired by the structure of the human brain.",
          type: "true-false",
          correctAnswer: "True"
        },
        {
          id: 6,
          question: "According to the text, what is AGI?",
          type: "multiple-choice",
          options: [
            "A type of computer chip",
            "Artificial General Intelligence with human-level intelligence across all domains",
            "A programming language",
            "A robot company"
          ],
          correctAnswer: "Artificial General Intelligence with human-level intelligence across all domains"
        },
        {
          id: 7,
          question: "The text suggests AI only has negative consequences for society.",
          type: "true-false",
          correctAnswer: "False"
        }
      ]
    },
    {
      id: 8,
      title: "The Psychology of Decision Making",
      level: "Difícil",
      text: `Human decision-making is far more complex and irrational than we typically assume. For decades, economists operated under the assumption that humans are rational actors who make decisions by carefully weighing costs and benefits. However, groundbreaking research by psychologists Daniel Kahneman and Amos Tversky in the 1970s challenged this notion, giving birth to the field of behavioral economics and revealing systematic patterns in how humans actually make decisions.

Kahneman and Tversky proposed that humans use two distinct systems of thinking. System 1 is fast, automatic, and intuitive—it operates with little conscious effort and is responsible for snap judgments and gut feelings. System 2 is slow, deliberate, and logical—it requires conscious effort and is engaged for complex calculations and careful analysis. While System 2 is capable of rational thought, System 1 dominates most of our daily decisions, leading to predictable biases and errors.

One of the most influential concepts they introduced is loss aversion—the tendency for people to prefer avoiding losses over acquiring equivalent gains. Research consistently shows that the pain of losing $100 is psychologically about twice as powerful as the pleasure of gaining $100. This asymmetry influences countless decisions, from investment strategies to whether we accept job offers or end relationships.

The availability heuristic is another cognitive bias that affects judgment. People tend to overestimate the likelihood of events that easily come to mind, often because they're recent, dramatic, or emotionally charged. For example, after seeing news coverage of airplane crashes, people typically overestimate the danger of air travel, even though statistically it remains one of the safest forms of transportation.

Anchoring is a bias where initial information disproportionately influences subsequent judgments. In negotiations, the first number mentioned—even if arbitrary—often serves as an anchor that shapes the final outcome. Real estate agents, car dealers, and skilled negotiators exploit this bias regularly.

Confirmation bias describes our tendency to seek, interpret, and remember information that confirms our preexisting beliefs while dismissing contradictory evidence. This bias is particularly problematic in the age of social media, where algorithms create echo chambers that reinforce our existing views, making it increasingly difficult to encounter diverse perspectives.

The framing effect demonstrates that how information is presented dramatically affects decisions. People respond differently to "90% survival rate" versus "10% mortality rate," even though these describe identical outcomes. Politicians, marketers, and media outlets leverage framing to influence public opinion and consumer behavior.

Understanding these biases doesn't make us immune to them—they're hardwired into our cognitive architecture. However, awareness can help us recognize when we might be falling prey to systematic errors in judgment. In critical decisions, deliberately engaging System 2 thinking, seeking diverse perspectives, considering alternative explanations, and being mindful of how information is framed can lead to better outcomes.

Organizations and policymakers are increasingly incorporating insights from behavioral economics to design better systems. "Nudges"—small changes in how choices are presented—can significantly influence behavior without restricting freedom. For example, making organ donation opt-out rather than opt-in dramatically increases donation rates, and automatically enrolling employees in retirement savings plans with the option to opt out substantially improves participation.

The study of decision-making continues to evolve, with researchers exploring how emotions, social context, culture, and even physical states like hunger or fatigue affect our choices. As we uncover more about the intricate mechanisms underlying human judgment, we gain valuable tools for making better decisions both individually and collectively.`,
      questions: [
        {
          id: 1,
          question: "Kahneman and Tversky confirmed that humans always make rational decisions.",
          type: "true-false",
          correctAnswer: "False"
        },
        {
          id: 2,
          question: "What is System 1 thinking?",
          type: "multiple-choice",
          options: [
            "Slow, deliberate, and logical thinking",
            "Fast, automatic, and intuitive thinking",
            "Mathematical calculations",
            "Learning a new skill"
          ],
          correctAnswer: "Fast, automatic, and intuitive thinking"
        },
        {
          id: 3,
          question: "Loss aversion means the pain of losing is psychologically more powerful than the pleasure of gaining.",
          type: "true-false",
          correctAnswer: "True"
        },
        {
          id: 4,
          question: "What is the 'availability heuristic'?",
          type: "multiple-choice",
          options: [
            "Buying things that are available in stores",
            "Overestimating likelihood of events that easily come to mind",
            "Making decisions based on price",
            "Choosing the first option presented"
          ],
          correctAnswer: "Overestimating likelihood of events that easily come to mind"
        },
        {
          id: 5,
          question: "Confirmation bias makes us seek information that contradicts our beliefs.",
          type: "true-false",
          correctAnswer: "False"
        },
        {
          id: 6,
          question: "What is a 'nudge' in behavioral economics?",
          type: "multiple-choice",
          options: [
            "Physically pushing someone",
            "Small changes in how choices are presented to influence behavior",
            "A type of cognitive bias",
            "A mathematical formula"
          ],
          correctAnswer: "Small changes in how choices are presented to influence behavior"
        },
        {
          id: 7,
          question: "Understanding cognitive biases makes us completely immune to them.",
          type: "true-false",
          correctAnswer: "False"
        },
        {
          id: 8,
          question: "According to the framing effect, how information is presented affects decisions.",
          type: "true-false",
          correctAnswer: "True"
        }
      ]
    },
    {
      id: 9,
      title: "The Future of Space Exploration",
      level: "Difícil",
      text: `Humanity stands at the threshold of a new era in space exploration, driven by technological innovation, commercial investment, and renewed scientific ambition. The landscape of space activity has transformed dramatically from the government-dominated Space Race of the Cold War era to today's dynamic ecosystem involving private companies, international partnerships, and increasingly ambitious goals.

The commercialization of space represents perhaps the most significant shift. Companies like SpaceX, Blue Origin, and Virgin Galactic have not only made space more accessible but have fundamentally altered the economics of spaceflight. SpaceX's development of reusable rockets, particularly the Falcon 9 and Falcon Heavy, has reduced launch costs by an order of magnitude. The company's Starship, currently in development, promises even more dramatic cost reductions and aims to make Mars colonization feasible within decades.

The Artemis program, NASA's ambitious initiative to return humans to the Moon by the mid-2020s, represents a crucial stepping stone toward deeper space exploration. Unlike the Apollo missions, which were primarily about demonstrating technological superiority, Artemis aims to establish a sustainable lunar presence. The Lunar Gateway, a space station orbiting the Moon, will serve as a staging point for lunar surface missions and a testbed for technologies needed for Mars exploration.

Mars remains the ultimate prize for human space exploration. Multiple robotic missions, including NASA's Perseverance rover and China's Zhurong rover, are currently exploring the Martian surface, searching for signs of past life and preparing for future human missions. The challenges of sending humans to Mars are formidable: the journey takes approximately seven months, cosmic radiation poses serious health risks, and astronauts would need to be largely self-sufficient for years in a hostile environment.

Beyond Mars, the outer solar system holds tantalizing possibilities. Europa, a moon of Jupiter, and Enceladus, a moon of Saturn, both harbor subsurface oceans that could potentially support life. Upcoming missions like Europa Clipper and potential future missions to Enceladus aim to investigate these intriguing worlds. Titan, Saturn's largest moon, with its thick atmosphere and liquid methane lakes, represents another fascinating target for exploration.

The search for exoplanets—planets orbiting other stars—has revolutionized our understanding of planetary systems. The Kepler and TESS space telescopes have identified thousands of exoplanets, including many in their stars' habitable zones where liquid water could exist. The James Webb Space Telescope, launched in 2021, can analyze exoplanet atmospheres for biosignatures—chemical indicators that could suggest the presence of life.

Space-based resources represent another frontier with enormous potential. Asteroids contain vast quantities of valuable metals like platinum, nickel, and rare earth elements. While asteroid mining remains largely theoretical, several companies are developing technologies to make it economically viable. Water ice on the Moon and asteroids could be converted into rocket fuel, enabling a self-sustaining space economy that doesn't depend on launching everything from Earth.

However, space exploration faces significant challenges beyond the technical. The proliferation of satellites has created a growing space debris problem, with thousands of defunct satellites and fragments posing collision risks. The Kessler Syndrome—a cascade of collisions creating more debris—is a genuine concern that could make certain orbits unusable. International cooperation and regulation are essential but complicated by geopolitical tensions and competing national interests.

Ethical questions also abound. Who owns celestial bodies and their resources? How do we prevent contamination of potentially life-bearing worlds with Earth microorganisms? Should we terraform Mars, fundamentally altering another planet to suit human needs? How do we ensure that the benefits of space exploration are shared equitably rather than concentrated among wealthy nations and corporations?

Despite these challenges, the momentum behind space exploration continues to build. As technology advances, costs decrease, and public interest grows, the dream of humanity becoming a multi-planetary species inches closer to reality. Whether driven by scientific curiosity, commercial opportunity, or the need to secure humanity's long-term survival, our expansion into the cosmos represents one of the most profound endeavors in human history.`,
      questions: [
        {
          id: 1,
          question: "Private companies have made space exploration more accessible and changed its economics.",
          type: "true-false",
          correctAnswer: "True"
        },
        {
          id: 2,
          question: "What is the primary difference between Apollo and Artemis missions?",
          type: "multiple-choice",
          options: [
            "Artemis is cheaper than Apollo",
            "Apollo was about technological superiority, Artemis aims for sustainable lunar presence",
            "Artemis only uses robots",
            "Apollo went to Mars, Artemis goes to the Moon"
          ],
          correctAnswer: "Apollo was about technological superiority, Artemis aims for sustainable lunar presence"
        },
        {
          id: 3,
          question: "The journey to Mars takes approximately seven days.",
          type: "true-false",
          correctAnswer: "False"
        },
        {
          id: 4,
          question: "Which moons are mentioned as having subsurface oceans that could potentially support life?",
          type: "multiple-choice",
          options: [
            "Phobos and Deimos",
            "Europa and Enceladus",
            "Io and Callisto",
            "Triton and Nereid"
          ],
          correctAnswer: "Europa and Enceladus"
        },
        {
          id: 5,
          question: "The James Webb Space Telescope can analyze exoplanet atmospheres for biosignatures.",
          type: "true-false",
          correctAnswer: "True"
        },
        {
          id: 6,
          question: "What is the Kessler Syndrome?",
          type: "multiple-choice",
          options: [
            "A disease astronauts get in space",
            "A cascade of satellite collisions creating more debris",
            "A type of rocket engine",
            "A theory about black holes"
          ],
          correctAnswer: "A cascade of satellite collisions creating more debris"
        },
        {
          id: 7,
          question: "Space exploration only faces technical challenges, not ethical ones.",
          type: "true-false",
          correctAnswer: "False"
        },
        {
          id: 8,
          question: "What valuable materials are mentioned as being found in asteroids?",
          type: "multiple-choice",
          options: [
            "Gold and diamonds",
            "Platinum, nickel, and rare earth elements",
            "Coal and oil",
            "Silicon and aluminum"
          ],
          correctAnswer: "Platinum, nickel, and rare earth elements"
        }
      ]
    }
  ];

  const levels = ["Todos", "Fácil", "Intermedio", "Difícil"];

  const filteredReadings = readings.filter(reading => 
    selectedLevel === "Todos" || reading.level === selectedLevel
  );

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setUserAnswers({});
    setShowResults(false);
  };

  const handleBackToList = () => {
    setSelectedReading(null);
    setUserAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    if (!selectedReading) return { correct: 0, total: 0, percentage: 0 };
    
    const correct = selectedReading.questions.filter(
      q => userAnswers[q.id] === q.correctAnswer
    ).length;
    const total = selectedReading.questions.length;
    const percentage = Math.round((correct / total) * 100);
    
    return { correct, total, percentage };
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Fácil": return "text-green-600 bg-green-100";
      case "Intermedio": return "text-yellow-600 bg-yellow-100";
      case "Difícil": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getLevelColorModern = (level: string) => {
    switch (level) {
      case "Fácil": return "bg-gradient-to-r from-green-400 to-green-600 text-white";
      case "Intermedio": return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
      case "Difícil": return "bg-gradient-to-r from-red-400 to-red-600 text-white";
      default: return "bg-gradient-to-r from-gray-400 to-gray-600 text-white";
    }
  };

  // Reading List View
  if (!selectedReading) {
    return (
      <div className="space-y-6 sm:space-y-8">
        {/* Header with 3D Icon */}
        <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* 3D Book Illustration */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl blur-2xl opacity-30"></div>
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform">
              <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2.5} />
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900">Reading Comprehension</h1>
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-sm sm:text-base text-gray-600">Lee textos fascinantes y responde preguntas de comprensión</p>
          </div>
        </div>

        {/* Level Filter - Modern Pills */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
          {levels.map(level => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 ${
                selectedLevel === level
                  ? "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white shadow-lg shadow-blue-300/50"
                  : "bg-white border-2 border-gray-200 text-gray-700 hover:border-purple-300 hover:shadow-md"
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Readings Grid - Floating Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredReadings.map(reading => (
            <div
              key={reading.id}
              onClick={() => setSelectedReading(reading)}
              className="group relative bg-white rounded-3xl p-5 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:-translate-y-2 flex flex-col h-full overflow-hidden"
            >
              {/* Gradient background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                {/* Level Badge with 3D effect */}
                <div className="flex items-center justify-between mb-5">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-r ${
                      reading.level === "Fácil" 
                        ? "from-green-400 to-green-600" 
                        : reading.level === "Intermedio"
                        ? "from-yellow-400 to-yellow-600"
                        : "from-red-400 to-red-600"
                    } rounded-full blur-md opacity-40`}></div>
                    <span className={`relative text-xs px-4 py-2 rounded-full font-bold shadow-lg ${getLevelColorModern(reading.level)}`}>
                      {reading.level}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                    <BookOpen className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-xs font-bold text-gray-700">{reading.questions.length}Q</span>
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-base sm:text-lg font-black text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all leading-tight min-h-[2.5rem] sm:min-h-[3rem]">
                  {reading.title}
                </h3>
                
                {/* Preview text */}
                <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed flex-grow line-clamp-3">
                  {reading.text.substring(0, 120)}...
                </p>
                
                {/* CTA Button */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity"></div>
                  <button className="relative w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 sm:py-3.5 rounded-2xl text-xs sm:text-sm font-black shadow-lg hover:shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-2">
                    <span>Comenzar Lectura</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReadings.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-4">
              <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm sm:text-lg font-semibold">No hay lecturas disponibles para este nivel</p>
          </div>
        )}
      </div>
    );
  }

  // Reading Content View
  const score = showResults ? calculateScore() : null;

  return (
    <>
      {seoComponent}
      <div className="space-y-6 max-w-4xl mx-auto px-4 sm:px-0">
      {/* Back Button */}
      <button
        onClick={handleBackToList}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm sm:text-base"
      >
        ← Volver a la lista
      </button>

      {/* Reading Header */}
      <div className="bg-white rounded-lg border-2 border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
          <span className={`text-xs px-3 py-1 rounded-full font-bold ${getLevelColor(selectedReading.level)}`}>
            {selectedReading.level}
          </span>
          <span className="text-xs sm:text-sm text-gray-600">{selectedReading.questions.length} preguntas</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{selectedReading.title}</h2>
      </div>

      {/* Reading Text */}
      <div className="bg-white rounded-lg border-2 border-gray-200 p-5 sm:p-8">
        <div className="prose max-w-none">
          {selectedReading.text.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Questions */}
      <div className="bg-white rounded-lg border-2 border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Preguntas de Comprensión</h3>
        
        <div className="space-y-6">
          {selectedReading.questions.map((question, index) => (
            <div key={question.id} className="border-b border-gray-200 pb-6 last:border-b-0">
              <p className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">
                {index + 1}. {question.question}
              </p>

              {question.type === "true-false" ? (
                <div className="space-y-2">
                  {["True", "False"].map(option => (
                    <label
                      key={option}
                      className={`flex items-start sm:items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        userAnswers[question.id] === option
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      } ${
                        showResults && option === question.correctAnswer
                          ? "border-green-500 bg-green-50"
                          : ""
                      } ${
                        showResults && userAnswers[question.id] === option && option !== question.correctAnswer
                          ? "border-red-500 bg-red-50"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        checked={userAnswers[question.id] === option}
                        onChange={() => !showResults && handleAnswerSelect(question.id, option)}
                        disabled={showResults}
                        className="w-4 h-4"
                      />
                      <span className="font-medium text-sm sm:text-base">{option}</span>
                      {showResults && option === question.correctAnswer && (
                        <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                      )}
                      {showResults && userAnswers[question.id] === option && option !== question.correctAnswer && (
                        <XCircle className="w-5 h-5 text-red-600 ml-auto" />
                      )}
                    </label>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {question.options?.map(option => (
                    <label
                      key={option}
                      className={`flex items-start sm:items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        userAnswers[question.id] === option
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      } ${
                        showResults && option === question.correctAnswer
                          ? "border-green-500 bg-green-50"
                          : ""
                      } ${
                        showResults && userAnswers[question.id] === option && option !== question.correctAnswer
                          ? "border-red-500 bg-red-50"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        checked={userAnswers[question.id] === option}
                        onChange={() => !showResults && handleAnswerSelect(question.id, option)}
                        disabled={showResults}
                        className="w-4 h-4"
                      />
                      <span className="text-xs sm:text-sm">{option}</span>
                      {showResults && option === question.correctAnswer && (
                        <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                      )}
                      {showResults && userAnswers[question.id] === option && option !== question.correctAnswer && (
                        <XCircle className="w-5 h-5 text-red-600 ml-auto" />
                      )}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Results */}
        {showResults && score && (
          <div className="mt-6 p-5 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Resultados</h4>
            <p className="text-sm sm:text-lg text-gray-700 mb-1">
              Respuestas correctas: <span className="font-bold text-green-600">{score.correct}</span> de {score.total}
            </p>
            <p className="text-xl sm:text-2xl font-black text-blue-600">
              Puntuación: {score.percentage}%
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          {!showResults ? (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(userAnswers).length !== selectedReading.questions.length}
              className="w-full sm:flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Enviar Respuestas
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="w-full sm:flex-1 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Reintentar
            </button>
          )}
        </div>
      </div>
    </div>
    </>
  );
}