# KAIZO Code Academy

Escuela interactiva de programación diseñada **mobile-first** para aprender desde cero construyendo y practicando.

## Método

Cada lección sigue este ciclo:

1. Entender la idea en lenguaje sencillo.
2. Ver un ejemplo pequeño.
3. Responder una pregunta.
4. Escribir código.
5. Conectarlo con un proyecto real.
6. Explicarlo con tus propias palabras.
7. Repasarlo más adelante.

## Ruta actual

- Fundamentos de la web
- HTML
- CSS
- JavaScript: variables y condicionales
- Git y GitHub
- Boss 1: contador interactivo
- DOM y eventos
- Depuración de errores
- JSON y datos
- APIs y fetch
- Supabase y backend
- Seguridad
- PWA y móvil
- Boss final: mini aplicación

## Funciones de estudio

- XP, niveles y progreso
- Racha de estudio
- Objetivo diario
- Sesiones de 15 minutos
- Repaso inteligente
- Glosario
- Notas por lección
- Laboratorio HTML/CSS/JavaScript
- Guardado local
- PWA instalable
- Cache offline básico

## Publicación

El sitio se publica mediante GitHub Pages desde la rama `main`.

## Filosofía

No memorizar por memorizar. La meta es poder leer código, modificarlo, probarlo, entender qué salió mal y construir pequeñas aplicaciones con criterio.

## Android APK

El repositorio incluye un workflow de GitHub Actions que genera automáticamente una APK de prueba con Capacitor 8.5.2.

- App ID: `com.kaizo.codeacademy`
- App name: `KAIZO Code Academy`
- Build: Android debug APK
- Source: los mismos archivos de la versión web
- El contenido web se empaqueta dentro de la aplicación, por lo que no depende de cargar GitHub Pages para arrancar.

Workflow: `.github/workflows/android-apk.yml`
