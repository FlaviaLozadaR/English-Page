# 🚀 English Learning Platform - Guía Rápida

## Desarrollo

```bash
npm run dev
```
Abre http://localhost:5173

## Build para Producción

```bash
npm run build
```

Este comando ejecuta:
1. **TypeScript compilation** → Verifica tipos
2. **Vite build** → Build optimizado con code splitting, compresión
3. **SSG Pre-render** → Genera HTML estático para todas las páginas

## Vista Previa del Build

```bash
npm run preview
```

Sirve los archivos del build en http://localhost:4173

## Comandos Adicionales

- `npm run build:fast` - Build sin SSG (más rápido para testing)
- `npm run prerender` - Solo ejecuta pre-renderizado
- `npm run analyze` - Analiza el tamaño del bundle

## 📁 Estructura del Build

```
dist/
├── index.html                    # Home (pre-renderizado)
├── reading/
│   └── index.html               # Reading page (pre-renderizado)
├── vocabulary/
│   └── index.html               # Vocabulary page (pre-renderizado)
├── grammar/
│   └── index.html               # Grammar page (pre-renderizado)
├── practice/
│   └── index.html               # Practice page (pre-renderizado)
├── quiz/
│   └── index.html               # Quiz page (pre-renderizado)
├── assets/
│   ├── js/
│   │   ├── vendor-react-*.js    # React chunk (~225KB → ~62KB brotli)
│   │   ├── vendor-ui-*.js       # UI components chunk
│   │   ├── vendor-icons-*.js    # Lucide icons chunk
│   │   └── [page]-*.js          # Lazy loaded pages
│   ├── css/
│   │   └── index-*.css          # CSS (~75KB → ~10KB brotli)
│   └── png/                     # Imágenes
├── sw.js                        # Service Worker (PWA)
├── workbox-*.js                 # Workbox runtime
├── manifest.webmanifest         # PWA manifest
├── robots.txt                   # SEO - instrucciones para crawlers
└── sitemap.xml                  # SEO - mapa del sitio
```

## 🎯 Optimizaciones Activas

### ✅ SSG (Static Site Generation)
- **6 páginas** pre-renderizadas con HTML estático
- Carga instantánea en primera visita
- Excelente para SEO

### ✅ Code Splitting
- **3 vendor chunks** separados
- Lazy loading automático por página
- Reducción ~70% en bundle inicial

### ✅ Compresión
- **Gzip** (~70% reducción)
- **Brotli** (~80% reducción, mejor que Gzip)
- Ambos formatos disponibles para el servidor

### ✅ PWA (Progressive Web App)
- Service Worker con cache inteligente
- Funciona offline
- Se puede "instalar" como app

### ✅ SEO Completo
- Meta tags optimizados por página
- Open Graph (Facebook, LinkedIn)
- Twitter Cards
- JSON-LD Structured Data
- sitemap.xml y robots.txt

### ✅ Performance Monitoring
- Web Vitals tracking (LCP, INP, CLS)
- Métricas en consola (desarrollo)
- Listo para analytics (producción)

## 📊 Resultados del Build

```
Bundle Size (gzip):
├── vendor-react: ~72KB (Core React)
├── vendor-ui: ~0.4KB (UI components)
├── vendor-icons: ~3.3KB (Icons)
├── index: ~6.6KB (Main app)
├── CSS: ~12.5KB (Styles)
└── Total inicial: ~95KB gzip

Con Brotli:
└── Total inicial: ~62KB brotli (35% más compresión)
```

## 🌐 Deploy

### Vercel (Recomendado)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```

### GitHub Pages
```bash
# Subir carpeta dist/
```

### Servidor Propio
1. Configurar servidor para servir archivos `.gz` y `.br`
2. Configurar headers de cache
3. Servir `dist/` como directorio raíz

## 📈 Verificar Rendimiento

1. **Lighthouse** (Chrome DevTools)
   - F12 → Lighthouse → Run audit
   - Esperar score ~95+

2. **PageSpeed Insights**
   - https://pagespeed.web.dev/
   - Ingresar URL

3. **Web Vitals (Consola)**
   - Abrir consola en desarrollo
   - Ver métricas en tiempo real

## 🔧 Configuración Adicional

Ver [OPTIMIZATIONS.md](./OPTIMIZATIONS.md) para documentación detallada.

---

**Nota:** Para máximo rendimiento, asegúrate de que tu servidor está configurado para servir archivos comprimidos (.gz y .br) con los headers correctos.
