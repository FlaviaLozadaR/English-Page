import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import viteCompression from "vite-plugin-compression";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react({
      // Optimizaciones de React
      babel: {
        plugins: [
          // Remove PropTypes en producción
          ["transform-react-remove-prop-types", { removeImport: true }],
        ],
      },
      // Fast Refresh optimizado
      fastRefresh: true,
    }),
    
    // PWA Plugin - Mejora rendimiento con Service Worker y Cache
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt", "apple-touch-icon.png"],
      // Estrategia de actualización
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg}"],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3MB
      manifest: {
        name: "English Learning Platform",
        short_name: "English Learning",
        description: "Plataforma completa para aprender inglés",
        theme_color: "#2563eb",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      devOptions: {
        enabled: false,
        type: "module",
      },
      workbox: {
        // Estrategias de cache para diferentes tipos de recursos
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 año
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 año
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
              },
            },
          },
          {
            urlPattern: /^https:\/\/.*\.(?:js|css)$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "static-resources",
            },
          },
        ],
      },
    }),
    
    // Gzip compression para archivos estáticos
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 10240, // Solo comprimir archivos > 10KB
      deleteOriginFile: false,
    }),
    
    // Brotli compression (mejor que gzip, ~20% más compresión)
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 10240,
      deleteOriginFile: false,
    }),
  ],
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
  build: {
    // Optimizaciones de build
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Eliminar console.log en producción
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info"], // Eliminar funciones específicas
      },
      mangle: {
        safari10: true, // Compatibilidad con Safari 10
      },
    },
    
    rollupOptions: {
      output: {
        // Code splitting por chunks - Mejora tiempo de carga inicial
        manualChunks: {
          // Vendor chunk - Librerías externas que rara vez cambian
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          
          // UI Components chunk - Radix UI components
          "vendor-ui": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-tabs",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-select",
            "@radix-ui/react-popover",
          ],
          
          // Icons chunk
          "vendor-icons": ["lucide-react"],
        },
        
        // Nombres de archivo optimizados con hash para cache busting
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
    
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
      "react-helmet-async",
    ],
    exclude: ["@vite/client", "@vite/env"],
    // Optimizar dependencias en paralelo
    esbuildOptions: {
      target: "es2020",
      logLevel: "info",
    },
  },
  
  // Performance hints
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
    legalComments: "none",
    treeShaking: truelo
    sourcemap: false,
    
    // Optimizar CSS
    cssCodeSplit: true,
    
    // Reportar tamaño de chunks comprimidos
    reportCompressedSize: true,
  },
  
  // Optimización de dependencias - Pre-bundle en dev
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "lucide-react",
    ],
    exclude: ["@vite/client", "@vite/env"],
  },
  
  // Server config para desarrollo
  server: {
    port: 5173,
    strictPort: false,
    open: false,
    cors: true,
  },
  
  // Preview config
  preview: {
    port: 4173,
    strictPort: false,
  },
});
