// Script para pre-renderizar páginas estáticas (SSG)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Rutas a pre-renderizar
const routes = [
  '/',
  '/reading',
  '/vocabulary',
  '/grammar',
  '/practice',
  '/quiz',
];

// Template HTML base
const createHTML = (route: string, title: string, description: string) => {
  const baseHTML = fs.readFileSync(path.resolve(__dirname, 'dist/index.html'), 'utf-8');
  
  // Reemplazar meta tags con información específica de la ruta para mejorar SEO y Core web vitals
  return baseHTML
    .replace(
      /<title>.*?<\/title>/,
      `<title>${title}</title>`
    )
    .replace(
      /<meta name="description" content=".*?">/,
      `<meta name="description" content="${description}">`
    )
    .replace(
      /<link rel="canonical" href=".*?">/,
      `<link rel="canonical" href="https://english-learning-platform.com${route}">`
    );
};

// Metadata para cada ruta
const routeMetadata: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'English Learning Platform - Aprende Inglés Online de Forma Efectiva',
    description: 'Plataforma completa para aprender inglés con ejercicios de reading, vocabulario, gramática, quizzes interactivos y práctica guiada.',
  },
  '/reading': {
    title: 'Reading Comprehension - Mejora tu Lectura en Inglés | English Learning',
    description: 'Practica reading comprehension en inglés con textos adaptados a tu nivel. Ejercicios interactivos de lectura.',
  },
  '/vocabulary': {
    title: 'Vocabulario en Inglés - Verbos Irregulares y Más | English Learning',
    description: 'Aprende y practica vocabulario en inglés. Lista completa de verbos irregulares y vocabulario esencial.',
  },
  '/grammar': {
    title: 'Gramática Inglesa - Guía Completa y Ejercicios | English Learning',
    description: 'Aprende gramática inglesa de forma clara y práctica. Tiempos verbales, condicionales, voz pasiva y más.',
  },
  '/practice': {
    title: 'Práctica de Inglés - Ejercicios Interactivos | English Learning',
    description: 'Practica inglés con ejercicios interactivos adaptados a tu nivel. Mejora tus habilidades de forma efectiva.',
  },
  '/quiz': {
    title: 'Quiz de Inglés - Pon a Prueba tu Nivel | English Learning',
    description: 'Evalúa tu nivel de inglés con nuestros quizzes interactivos. Tests de gramática, vocabulario y comprensión.',
  },
};

// Pre-renderizar rutas
async function prerender() {
  console.log('🚀 Iniciando pre-renderizado de páginas estáticas...\n');
  
  const distPath = path.resolve(__dirname, 'dist');
  
  if (!fs.existsSync(distPath)) {
    console.error('❌ Error: El directorio dist no existe. Ejecuta "npm run build" primero.');
    process.exit(1);
  }
  
  for (const route of routes) {
    try {
      const metadata = routeMetadata[route] || routeMetadata['/'];
      const html = createHTML(route, metadata.title, metadata.description);
      
      // Determinar ruta del archivo
      let filePath;
      if (route === '/') {
        filePath = path.join(distPath, 'index.html');
      } else {
        // Crear directorio para la ruta
        const routeDir = path.join(distPath, route.slice(1)); // Quitar el / inicial
        if (!fs.existsSync(routeDir)) {
          fs.mkdirSync(routeDir, { recursive: true });
        }
        filePath = path.join(routeDir, 'index.html');
      }
      
      // Escribir HTML
      fs.writeFileSync(filePath, html);
      const displayPath = route === '/' ? 'index.html' : `${route}/index.html`;
      console.log(`✅ Pre-renderizado: ${route} -> ${displayPath}`);
    } catch (error) {
      console.error(`❌ Error al pre-renderizar ${route}:`, error);
    }
  }
  
  console.log('\n🎉 Pre-renderizado completado exitosamente!\n');
}

prerender();
