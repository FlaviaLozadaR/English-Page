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
        title="English Learning Platform - Aprende Inglés Online de Forma Efectiva"
        description="Plataforma completa para aprender inglés con ejercicios de reading comprehension, vocabulario, gramática, quizzes interactivos y práctica guiada. Alcanza tus metas profesionales y académicas."
        keywords="aprender inglés, english learning, vocabulario inglés, gramática inglesa, reading comprehension, practice english, quizzes inglés, ejercicios inglés online, curso de inglés gratis"
        canonical="https://english-learning-platform.com/"
        type="website"
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
