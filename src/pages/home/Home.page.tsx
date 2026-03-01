import { HomeHero } from "./components/HomeHero";
import { FeatureGrid } from "./components/FeatureGrid";
import { StatsSection } from "./components/StatsSection";
import { EcosystemSection } from "./components/EcosystemSection";
import { ContactSection } from "./components/ContactSection";
import { HomeFooter } from "./components/HomeFooter";
import { features, ecosystemTools } from "./data";
import { SEO } from "../../shared/components/SEO";

export function HomePage() {
  return (
    <>
      <SEO 
        title="English Learning Platform - Aprende Inglés Online Gratis | Curso Completo 2026"
        description="Plataforma líder para aprender inglés online GRATIS. Ejercicios de reading, vocabulario, gramática y quizzes interactivos. +10,000 estudiantes nos respaldan. Mejora tu inglés desde nivel básico a avanzado con métodos probados."
        keywords="aprender inglés gratis, curso de inglés online, english learning, vocabulario inglés, gramática inglesa, reading comprehension, practice english, quizzes inglés, ejercicios inglés online, curso de inglés 2026, mejor plataforma inglés"
        canonical="https://english-learning-platform.com/"
        type="website"
        breadcrumbs={[
          { name: 'Inicio', url: 'https://english-learning-platform.com/' }
        ]}
        faq={[
          {
            question: '¿Es completamente gratis aprender inglés en esta plataforma?',
            answer: 'Sí, nuestra plataforma es 100% gratuita. Ofrecemos acceso ilimitado a todos los ejercicios de reading, vocabulario, gramática y quizzes sin ningún costo.'
          },
          {
            question: '¿Qué nivel de inglés necesito para empezar?',
            answer: 'Nuestra plataforma está diseñada para todos los niveles, desde principiantes hasta avanzados. Puedes comenzar desde cero o mejorar tus habilidades existentes.'
          },
          {
            question: '¿Cuánto tiempo necesito para mejorar mi inglés?',
            answer: 'Con práctica constante de 30 minutos diarios, podrás ver mejoras significativas en 3-6 meses. La clave está en la consistencia y práctica regular.'
          },
          {
            question: '¿Ofrecen certificados al completar los cursos?',
            answer: 'Actualmente nos enfocamos en proporcionar la mejor experiencia de aprendizaje. Los certificados están en desarrollo para futuros lanzamientos.'
          }
        ]}
      />
      <main className="space-y-14 sm:space-y-20">
        <HomeHero />
        <FeatureGrid features={features} />
        <StatsSection />
        <EcosystemSection ecosystemTools={ecosystemTools} />
        <ContactSection />
        <HomeFooter />
      </main>
    </>
  );
}
