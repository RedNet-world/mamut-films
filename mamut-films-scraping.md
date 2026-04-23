# Mamut Films — Scraping completo

**Fecha**: 2026-04-20
**Fuente**: https://mamutfilms.com.co/home/
**Método**: curl + WP REST API `/wp-json/` + análisis HTML

---

## 1. Empresa (datos corporativos)

| Campo | Valor |
|---|---|
| Razón social / marca | **Mamut Films** / *mamutfilms* |
| Descripción SEO | "productora cine comerciales videos sueños producción de cine" |
| Slogan | "Descubre la magia detrás del lente de MAMUT FILMS" |
| Fundación | **2017** |
| Sector | Productora audiovisual (publicidad + cine + series) |
| País | **Colombia** |
| Idioma sitio | es-CO |
| Web | https://mamutfilms.com.co |
| Email principal | **contacto@mamutfilms.com.co** |
| Email marketing | **marketing@mamutfilms.com.co** |
| Teléfono/WhatsApp | **+57 301 618 2658** |
| Copyright | © 2026 mamutfilms |

## 2. Stack técnico

- **CMS**: WordPress (page ID 2887 = home)
- **Tema**: **Astra**
- **Page builders**: Elementor + **Ultimate Addons for Gutenberg** (Spectra)
- **Plugins detectados**: All in One SEO Pack, Astra Sites, Omnisend (email marketing), Popup Maker, Spectra
- **Carrusel**: `sp-wp-carousel-free` (WP Carousel Free) con Swiper
- **Hosting**: Hostinger (LiteSpeed, PHP 8.2.30, CDN LiteSpeed Cache)
- **API**: REST pública habilitada en `/wp-json/`
- **Fuentes**: Google Fonts → **Roboto 400/500 + Montserrat 600/700 + Playfair Display 400**
- **Favicon**: `/wp-content/uploads/2025/08/cropped-Imagen-de-WhatsApp-2025-08-07-a-las-11.29.32_eb397687-32x32.jpg`
- **Usuarios WP**: `admi` (id 2) y `elkin.serna.h@gmail.com` (id 1 → admin)

## 3. Mapa del sitio (5 páginas + 5 posts)

### Páginas

| ID | Slug | Título menú | URL |
|---|---|---|---|
| 2887 | `home` | **INICIO** | `/home/` |
| 26 | `about` | **LO QUE HICIMOS** | `/about/` |
| 267 | `blog` | **NOSOTROS** | `/blog/` |
| 3050 | `lo-mas-reciente` | **PROYECTOS** | `/` |
| 3181 | `nuestros-servicios` | **SERVICIOS DE PRODUCCIÓN** | `/nuestros-servicios/` |

### Posts (fichas de directores/equipo)

| ID | Título | URL |
|---|---|---|
| 3157 | **Luis García** | `/luis-garcia/` |
| 1908 | **AUGUSTO CASTILLO** | `/think-tank-releases-new-photo-protection-concepts/` |
| 1907 | **JUAN DAVID BOTERO** | `/the-desolate-beauty-of-greenland/` |
| 1905 | **MATEO HINCAPIE** | `/essential-photography-teleconverters-for-wildlife/` |
| 255 | **HUGO RUBIANO** | `/landscape-photography-of-mauris-vitae-magna/` |

### Menú principal
`INICIO · LO QUE HICIMOS · NOSOTROS · PROYECTOS · SERVICIOS DE PRODUCCIÓN · +57 301 618 2658`

## 4. Equipo / personas

**Carolina Bermúdez** — **Productora General**. "Con una visión innovadora y una pasión por contar historias que inspiran, Carolina Bermúdez lidera Mamut Producciones como Productora General."

### Directores (posts)

**Luis García** — Director, guionista y productor.
- Largometraje en preproducción: *Son las penas* (2026, Laima Productions)
- Documental *Ajeno* (2024, Telepacífico / Lacña Cine)
- Serie doc *El cuerpo que habito* — Ganador MinTIC 2024
- Serie *Abrazo de un sereno* — Ganador MinTIC 2024
- Serie *La ventanita del gato* — Ganador MinTIC 2022
- Corto *Irene* — Selección Oficial Festival de Cine de Nancy, Francia 2017
- Comerciales para: **Adidas, H&M, Vans, Bancolombia, Hugo Boss, Levi's, Burger King, Bavaria**

**Augusto Castillo** — Director audiovisual, +5 años. Spots publicitarios, documentales, series web.

**Juan David Botero** — Director audiovisual en ascenso.

**Mateo Hincapié** (escrito "Incapie" en el slug) — Casi 15 años en cine publicitario. Experto en niños, animales, comida, autos, humor sutil. Trabajó en **Colombia, Ecuador, Guatemala, Costa Rica, EE.UU., México**.

**Hugo Rubiano** — Director, +5 años. Spots, documentales, series web.

## 5. Servicios (catálogo comercial)

1. **VIDEOS INSTITUCIONALES** — Imagen corporativa, valores y misión.
2. **COMERCIALES** (TV) — Captación de atención, reconocimiento de marca.
3. **SERIES** — Contenido de alta calidad, producción en marcha.
4. **CREATIVIDAD** — Contenido innovador que refleja personalidad de marca.
5. **FLEXIBILIDAD** — Adaptación a necesidades y presupuesto.

Tagline comercial: *"Mamut Films: creando contenido que inspira y emociona. Contactanos para colaborar en tu próximo proyecto."*

Cita interna: *"Somos un equipo de soñadores, de creadores, de innovadores. Juntos, podemos lograr grandes cosas."*

## 6. Reconocimientos (según página About)

- Premio Mejor Cortometraje en [Festival de Cine] *(genérico, placeholder)*
- Nominación Mejor Documental en [Festival de Documentales]
- Reconocimiento a la Excelencia en Producción Audiovisual

**Nota**: la página About tiene placeholders sin rellenar — oportunidad de mejora.

## 7. Redes sociales

| Red | URL |
|---|---|
| Instagram | https://www.instagram.com/mamutfilms/ |
| Facebook | https://www.facebook.com/Mamutfilms (locale es_LA) |
| YouTube | https://www.youtube.com/@MamutFilms |

No se detectó TikTok, Vimeo ni LinkedIn propios.

## 8. Inventario de media (114 archivos totales en librería WP)

### Videos (15 × MP4, todos H.264 1080p self-hosted)
```
/wp-content/uploads/2025/05/REEL_MAMUT_2025_V1_0516.mp4                ← Reel oficial 2025
/wp-content/uploads/2025/08/Ultima-Milla-I-Inter-Rapidisimo-Dia-del-Nino-2025-Inter-Rapidisimo-1080p-h264.mp4  ← Comercial Inter Rapidísimo
/wp-content/uploads/2025/04/Juan-David-Botero.mp4                      ← Reel Juan David Botero
/wp-content/uploads/2025/06/Pago-servicios-D´cut.mp4                   ← Campaña D'cut (Pagos)
/wp-content/uploads/2025/06/Obligaciones-D´cut.mp4                     ← Campaña D'cut (Obligaciones)
/wp-content/uploads/2025/06/Compras-D´cut.mp4                          ← Campaña D'cut (Compras)
/wp-content/uploads/2025/06/Apuestas-D-cut.mp4                         ← Campaña D'cut (Apuestas)
/wp-content/uploads/2025/08/Video-de-WhatsApp-2025-08-07_11.39.17_0ca82a4c.mp4
/wp-content/uploads/2025/07/Video-de-WhatsApp-2025-07-30_14.05.06_066206a8.mp4
/wp-content/uploads/2025/04/Video-de-WhatsApp-2025-07-30_14.05.06_066206a8.mp4
/wp-content/uploads/2025/04/Video-de-WhatsApp-2025-07-30_14.05.06_066206a8-1.mp4
/wp-content/uploads/2025/04/AQMnDNzGqOCjNcIBfyj2zmWVi4...rgKgf7Sauz.mp4   ← Hero/bg video home
/wp-content/uploads/2025/04/AQMySsA_LhcJ64dOmYNMsk_dQOccMVHRrV...6oSZ.mp4
/wp-content/uploads/2025/04/AQMySsA_...-1.mp4
/wp-content/uploads/2025/04/AQMySsA_...-2.mp4
```
**Clientes identificables por los videos**: Inter Rapidísimo, D'cut.

### Imágenes clave (99 imágenes: 65 JPG + 31 PNG + 2 SVG + 1 WEBP)

**Logos/marca**:
- `/2025/08/cropped-Imagen_de_WhatsApp_2025-08-07_..._eb397687-removebg-preview.png` (logo 471×157, sin fondo)
- `/2025/04/logo_mamut-removebg-preview.png`
- `/2025/04/logo-mamut.jpg`

**Retratos del equipo** (usados en carrusel home y fichas):
- `luis-garcia-D.jpg` (562px), `/2025/08/Luis-Garcia.jpg`
- `AUGUSTO.jpg`, `AUGUSTO-1.jpg`, `AUGUSTO-2.jpg`, `AUGUSTO-3.jpg`
- `Juan-David-Botero.jpg` (1024×778)
- `MATEO.jpg`, `MATEO-1-scaled.jpg`
- `HUGO.jpg`, `HUGO-1.jpg`
- `FELIPE.jpg`, `FELIPE-1.jpg` *(Felipe — sin post propio aún)*
- `KILO.jpg`, `KILO-1.jpg` *(Kilo — sin post)*
- `SANTIAGO.jpg` *(Santiago — sin post)*
- `caro.png`, `cro-scaled.jpg` *(Carolina Bermúdez)*

**Reels/BTS**:
- `reel-castillo-scaled.jpg`
- `historias.jpg` / `historias-1024x834.jpg`
- `aaaaaaaaaaaaaaaaaaaaaaaaa.jpg` *(placeholder)*
- `Autoretrato-en-habitacion-luminosa.png`

**Assets residuales del template Astra Sites** (demos sin limpiar):
- `/2019/06/*` — banners, fotógrafos, clientes stock
- `/2020/02/about-01.jpg`, `home-banner-03/04.jpg`
- `/2020/11/blog-05`, `blog-06`, `happy-free-image.jpg`
- `/2021/03/flower.png`, `animal.png`, `hearts.png`, `camera.png`, `drink.png`, `birthday-party.png`
- `/2018/12/blog07-09*`
- `/2019/06/eric-logo.svg`, `primari01-logo.svg`, `customer-03/04/05/06.png`, `pic01-04-free-img.jpg`
- `/2022/12/demo-screenshot.jpg`

## 9. Textos completos por página

### HOME (/home/)
> **MAMUT PRODUCTORA AUDIOVISUAL** — Descubre la magia detrás del lente de MAMUT FILMS.
> **MAMUT** es una productora audiovisual dedicada a la publicidad y el cine, que de manera inteligente desarrolla ideas que se vuelven piezas inolvidables para los distintos lenguajes artísticos, de información y entretenimiento. Constituidos desde el año 2.017, tenemos la capacidad de hacer tus proyectos, incluso tus sueños realidad.
> Nuestro propósito es materializar historias que nacen de la imaginación. Establecidos como empresa desde 2017, en Mamut creemos que las artes son un recurso único e infinito para dar buena-vida a las ideas.
> La verdadera grandeza de los proyectos está dada por su impacto positivo en los demás. Sólo la calidad técnica y humana nos permite ir más allá, para pensar en grande y producir enormemente.
> **¿Tienes una idea, un sueño o una pasión que deseas compartir con el mundo?** En Mamut, creemos que cada historia es única y merece ser contada de manera especial.
> **LOS QUE ESTAMOS EN MAMUT** — Y juntos hacemos que las historias cobren vida. [carrusel: Luis García · Augusto Castillo · Juan David Botero · Mateo Hincapié · Hugo Rubiano — CTA "La historia continúa"]
> **SERVICIOS** — PRODUCCIÓN AUDIOVISUAL DE ALTA CALIDAD [Videos Institucionales · Comerciales · Series · Creatividad · Flexibilidad]
> **LISTO PARA EMPEZAR** — Contáctanos para discutir tus necesidades y objetivos.
> **NUESTROS CLIENTES** — "Somos un equipo de soñadores, de creadores, de innovadores…"

### ABOUT / LO QUE HICIMOS (/about/)
> **La trayectoria de Mamut Films: una historia de pasión y creatividad.** Mamut Films es una productora audiovisual que ha estado creando contenido de alta calidad desde el año 2017.
> **Nuestros inicios** — Nació de la pasión y visión de sus fundadores…
> **Crecimiento y evolución** — Spots publicitarios, documentales, series web, películas.
> **Logros**: Premio Mejor Cortometraje, Nominación Mejor Documental, Reconocimiento a la Excelencia *(placeholders sin rellenar)*
> **AMOR POR LO QUE HACEMOS** — Pasión y dedicación en cada proyecto. **Carolina Bermúdez · Productora General**.

### SERVICIOS (/nuestros-servicios/)
> **VIDEOS INSTITUCIONALES · COMERCIALES · SERIES** (3 bloques con el mismo copy que la home).

### NOSOTROS / Blog (/blog/)
> **Nuestro equipo · EQUIPO MAMUT FILMS** — Compuesto por profesionales apasionados por lo audiovisual. [Listado con fecha: Luis García 13-ago-2025, Augusto Castillo 29-abr-2025, Juan David Botero 29-abr-2025, Mateo Incapié 29-abr-2025, Hugo Rubiano 29-abr-2025]

### PROYECTOS (/)
> Carrusel Swiper con proyectos (ID `sp-wp-carousel-free-id-3078`, color acento **#178087** teal).

## 10. SEO / Schema.org

- `@type: Organization` — name "mamutfilms", logo 471×157
- `@type: WebSite` — inLanguage "es-CO"
- `@type: WebPage` — date published 2025-04-29, modified 2025-04-30
- `@type: BreadcrumbList`
- `@type: ImageObject`

Meta description: *"MAMUT PRODUCTORA AUDIOVISUAL Descubre la magia detrás del lente…"*
Open Graph presente. Sin Twitter Card custom.

## 11. Categorías del blog

| ID | Slug | Nombre | Posts |
|---|---|---|---|
| 1 | uncategorized | Uncategorized | 2 |
| 2 | events | Events | 0 |
| 3 | fashion | Fashion | 0 |
| 4 | nature | Nature | 1 |
| 5 | wedding | Wedding | 2 |

*(categorías residuales del template original, sin sentido para una productora audiovisual)*

## 12. Observaciones críticas para rediseño

1. **Slugs de posts no coinciden con el contenido** (p.ej. `/the-desolate-beauty-of-greenland/` es la ficha de Juan David Botero) — heredados del template demo, hacen daño al SEO.
2. **Página About tiene placeholders** sin rellenar (`[Festival de Cine]`, `[Organización]`).
3. **Categorías del blog inadecuadas** (wedding, fashion) — reemplazar por comerciales/documental/serie/cortometraje.
4. **Archivos con caracteres especiales** `D´cut` y `Imagen de WhatsApp` mezclados — limpieza de uploads pendiente.
5. **Assets demo del template Astra** (2018-2022) aún ocupando espacio.
6. **Carrusel con color teal `#178087`** que choca con la identidad "cine" (debería ser sobrio, blanco/negro).
7. **Clientes mencionados en bio de Luis García** (Adidas, H&M, Vans, Bancolombia, Hugo Boss, Levi's, Burger King, Bavaria) — no aparecen como logotipos en "Nuestros Clientes". Oportunidad enorme.
8. **Miembros con foto pero sin ficha**: Felipe, Kilo, Santiago, Carolina → completar.
