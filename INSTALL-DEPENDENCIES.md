# 📦 Instalación de Dependencias

## Dependencias Faltantes

Para que todas las optimizaciones funcionen correctamente, instala las siguientes dependencias:

```bash
# Dependencias de producción
npm install react-helmet-async

# Dependencias de desarrollo (ya deberían estar instaladas)
npm install --save-dev vite-plugin-compression vite-plugin-pwa
```

## Verificar package.json

Tu `package.json` debe incluir:

```json
{
  "dependencies": {
    "react-helmet-async": "^2.0.5",
    // ... otras dependencias
  },
  "devDependencies": {
    "vite-plugin-compression": "latest",
    "vite-plugin-pwa": "latest",
    // ... otras dependencias
  }
}
```

## Si hay problemas con web-vitals

Si `web-vitals` no está instalado:

```bash
npm install web-vitals
```

## Build y Test

```bash
# Limpiar node_modules y package-lock
rm -rf node_modules package-lock.json

# Reinstalar todo
npm install

# Build
npm run build

# Preview
npm run preview
```

## Troubleshooting

### Error: "Cannot find module 'react-helmet-async'"
```bash
npm install react-helmet-async --save
```

### Error: "Cannot find module 'web-vitals'"
```bash
npm install web-vitals --save
```

### Errores de TypeScript
```bash
# Limpiar cache de TypeScript
rm -rf node_modules/.vite
npm run build
```

## Listo ✅

Una vez instaladas todas las dependencias, tu aplicación estará lista para:
- SEO completo
- Performance optimizado  
- PWA funcional
- Analytics integrado
