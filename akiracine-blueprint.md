---
name: Referencia de diseño - akiracine.com
description: Análisis técnico completo de akiracine.com usado como blueprint para diseñar/clonar una web con el mismo look & feel cinematográfico
type: project
originSessionId: b518f16d-44c5-4036-b438-47eebe6e7d6e
---
# Referencia de diseño: akiracine.com

**Fecha de análisis**: 2026-04-20
**Propósito**: Blueprint para clonar/diseñar una web con este estilo cinematográfico usando IA.

**Why**: El usuario eligió esta web como referencia visual y técnica para un proyecto propio (probablemente Woltftech o sub-marca). Todo rediseño debe respetar este stack y estética salvo que el usuario indique lo contrario.
**How to apply**: Cuando el usuario pida "diseñar/clonar/hacer la web", arrancar desde este blueprint (stack, paleta, fuentes, preloader, rutas). No proponer alternativas radicales sin preguntar.

---

## Stack técnico detectado

| Componente | Tecnología |
|---|---|
| Framework | Nuxt.js (Vue SSR) |
| CMS | Prismic Headless (`akira.cdn.prismic.io/api/v2`) |
| Animación scroll | GSAP + ScrollTrigger |
| WebGL | OGL (librería ligera, no Three.js) |
| Utilidades | IntersectionObserver, requestAnimationFrame |
| Estilos | CSS Modules con hash scoped |
| Meta/SEO | vue-meta (data-n-head) |

**NO usa**: Lenis, Locomotive Scroll, Barba.js, jQuery, Three.js, Swiper, React, WordPress, Webflow.

## Rutas (router Nuxt)

```
/                      → Home
/about
/film-and-tv
/branded-content
/production
/casa-akira
/directors
/directors/:slug       (dinámica)
/preview, /prismic-preview
```

## Custom types Prismic (12)

Home, About, Menu, Footer, Directors, Director, Film and tv, Branded content, Production, Casa akira, Project, General.

## Preloader (inline en HTML, antes de hidratar Nuxt)

- Fondo viewport completo `#161614`
- Spinner **SpinKit `sk-circle`** (open source de Tobias Ahlin): 12 hijos `sk-circle1..12` con rotaciones de 30° acumulativas
- Keyframe `sk-circleBounceDelay`: `scale(0) ↔ scale(1)` en 1.2s infinito, delays escalonados de -0.1s a -1.1s → efecto onda circular
- Se oculta al montar Nuxt

## Paleta cromática

```
#161614  Fondo principal (negro cálido)
#e7e4da  Texto principal / cream
#b9925e  Acento dorado/tan (hover, CTAs)
#575757  Gris secundario
```

Overlay de grano/ruido: `/img/noise.webp` (+ fallback `.png`) para textura cinematográfica.

## Tipografías (self-hosted en `/fonts/`)

| Fuente | Uso |
|---|---|
| Monument Extended (Bold + Regular) | Títulos display, nav |
| Neue Haas Grotesk Text Std (Regular) | Cuerpo |
| Vanger (serif) | Acentos editoriales |
| Recife Text (Regular + Italic) | Itálicas editoriales |

**Alternativas libres** si no hay licencia Pangram Pangram: NB Architekt, Inter, Fraunces, PP Editorial New.

## Arquitectura de componentes (deducida de CSS Modules)

- `Navbar` fijo con `isFixed`/`isHidden` (hide on scroll down)
- `MenuToggle` + `Menu` overlay fullscreen con `isOpen`
- `Intro` con animación de entrada post-preloader
- `LoopText`/`LoopItem` → marquee infinito horizontal
- `DirectorIntro`/`Directors` grid
- `Mask`/`Shape`/`ShapeCircle` → transiciones con clip-path circular
- `ScrollPointer`, `BackTop`, `ArrowButton`, `MailtoButton`, `SocialLink`
- `Footer` + `Copyright`
- `Cursor` custom (probable agrandado sobre videos/CTAs)

## Sistema de animaciones

- Scroll-triggered con GSAP ScrollTrigger (reveals, parallax, pins)
- Scroll NATIVO (sin smooth-scroll library)
- IntersectionObserver para lazy-load + activar timelines
- WebGL con OGL para distorsión de imágenes/thumbnails (shaders)
- Transiciones de ruta Vue con máscara circular (clip-path)
- Easings: `power1`, `expo` (cinematográficos)
- Marquee infinito de texto
- Cursor custom

## SEO

- `<title>Akira</title>`, Open Graph 1200x630, Twitter card `summary_large_image`
- Preconnect a `akira.prismic.io`, `static.cdn.prismic.io`, `akira.cdn.prismic.io`
- Favicons 16/32/180
- Sin schema.org detectado

## Peso

- `index.html` 5.5 KB (shell SSR + preloader inline)
- JS bundles ~1.15 MB total
- CSS ~25 KB

## Receta de clonación con IA

```
Nuxt + Vue 3
├─ @nuxtjs/prismic
├─ gsap + ScrollTrigger
├─ ogl (WebGL)
├─ vue-meta
└─ CSS Modules scoped
```

**Orden de trabajo**:
1. Scaffold Nuxt con las 9 rutas
2. Modelar 12 custom types en Prismic
3. Preloader SpinKit inline en HTML
4. Cargar 4 fuentes self-hosted (o alternativas libres)
5. Aplicar paleta + overlay noise.webp
6. Construir componentes: Navbar hide-on-scroll, Menu fullscreen, Marquee, DirectorGrid, ProjectShowreel con cursor custom + hover video
7. ScrollTrigger para reveals con easing `expo.out`
8. OGL para distorsión WebGL en thumbnails
9. Transición de ruta con clip-path circle
