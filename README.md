# MAMUT FILMS

> Sitio web oficial de **Mamut Films** — productora audiovisual colombiana especializada en publicidad y cine, con sede en Bogotá desde 2017.

![Logo Mamut Films](./mamut%20logo.png)

---

## Acerca del proyecto

Este repositorio contiene el código fuente del sitio institucional de Mamut Films: una pieza estática (HTML + CSS + JS vanilla) con estética cinematográfica, inspirada en el blueprint visual y técnico de referencias como *akiracine.com*. El sitio presenta la trayectoria, servicios, proyectos y el equipo creativo de la productora.

## Stack técnico

| Capa          | Tecnología                                     |
| ------------- | ---------------------------------------------- |
| Marcado       | HTML5 semántico                                |
| Estilos       | CSS3 (custom properties, grid, flex)           |
| Interacción   | JavaScript vanilla (sin frameworks)            |
| Tipografías   | Google Fonts — Archivo Black, Inter, Playfair Display |
| Hospedaje     | Sitio estático (compatible con cualquier CDN / hosting estático) |

Sin dependencias de build. El sitio se sirve tal cual desde cualquier servidor HTTP.

## Estructura

```
Mamut/
├── index.html                    Home
├── proyectos.html                Portafolio de proyectos
├── servicios.html                Servicios generales
├── servicios/
│   ├── videos-institucionales.html
│   ├── comerciales.html
│   └── series.html
├── nosotros.html                 Sobre la productora
├── lo-que-hicimos.html           Trayectoria
├── contacto.html                 Formulario / datos de contacto
├── equipo/                       Perfiles del equipo
│   ├── augusto-castillo.html
│   ├── carolina-bermudez.html
│   ├── hugo-rubiano.html
│   ├── juan-david-botero.html
│   ├── luis-garcia.html
│   └── mateo-hincapie.html
├── assets/
│   ├── css/                      Hojas de estilo
│   └── js/                       Scripts del cliente
├── akiracine-blueprint.md        Referencia de diseño
├── mamut-films-scraping.md       Notas de contenido/investigación
└── mamut logo.png                Identidad visual
```

## Ejecución local

Al ser un sitio estático, basta con servir el directorio con cualquier servidor HTTP simple:

```bash
# Opción 1 — Python
python3 -m http.server 8080

# Opción 2 — Node (npx)
npx serve .

# Opción 3 — PHP
php -S localhost:8080
```

Luego abrir <http://localhost:8080>.

## Secciones principales

- **Inicio** — hero cinematográfico, showreel y propuesta de valor.
- **Proyectos** — portafolio audiovisual realizado.
- **Servicios** — videos institucionales, comerciales y series.
- **Nosotros** — historia, misión y visión de Mamut Films.
- **Trayectoria** — clientes, premios y recorrido desde 2017.
- **Equipo** — perfiles individuales del staff creativo.
- **Contacto** — canales directos y formulario.

## Identidad visual

- **Paleta base**: negro cálido, crema y acentos dorados.
- **Tono**: cinematográfico, editorial, contemporáneo.
- **Tipografías display**: Archivo Black y Playfair Display.
- **Cuerpo**: Inter en pesos 300–600.

## Estado

Proyecto en desarrollo activo. Las iteraciones posteriores incluirán:

- Integración de showreel con reproductor embebido.
- Optimización de imágenes (WebP/AVIF) y lazy-loading.
- Micro-animaciones scroll-driven.
- Formulario de contacto conectado a un backend SMTP.
- Auditoría SEO + Core Web Vitals.

## Licencia

© Mamut Films. Todos los derechos reservados. El contenido gráfico, tipográfico y editorial es propiedad de Mamut Films; el código del sitio se publica con fines de referencia y portafolio.

## Créditos

Sitio desarrollado por **RedNet** para Mamut Films.
