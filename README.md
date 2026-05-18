# 🎨 Samu Pico | Portafolio

Mi portafolio web como diseñador gráfico, creador de contenido, fotógrafo y productor audiovisual en Bogotá.

## 🧭 Intento del proyecto

El portafolio está diseñado como una pieza de identidad digital, no como una galería genérica. La intención es mostrar trabajo creativo en cuatro lenguajes distintos, manteniendo una experiencia coherente:

- 📱 `Redes sociales`: contenido seriado, pensado por cliente y por ritmo visual.
- 🎨 `Diseño`: proyectos con más peso conceptual y posibilidad de caso de estudio.
- 🎬 `Video`: piezas reproducibles desde una grilla rápida con modal.
- 📷 `Fotografía`: sets visuales que se exploran como galería.

El sitio combina una estética editorial con navegación de portfolio. La prioridad no es solo mostrar piezas bonitas, sino dar contexto: cliente, proceso, rol, herramientas, reto y solución cuando el proyecto lo permite.

## 🧠 Modelo mental

La app separa tres cosas que normalmente terminan mezcladas:

| Capa | Responsabilidad |
| --- | --- |
| 🖼️ Contenido | Imágenes, videos y `info.json` viven en Cloudflare R2. |
| 🧩 Interfaz | React decide cómo presentar cada tipo de contenido. |
| 🧭 Narrativa | Los casos de estudio convierten carpetas del bucket en historias navegables. |

Esto permite que el portafolio crezca sin convertir el código en una lista interminable de imports manuales. El repo define el sistema; el bucket define el material publicado.

## 🏗️ Arquitectura

```txt
src/
  App.jsx                     # Shell global: providers, router, loading, cursor y utilidades fijas
  main.jsx                    # Entry point + HelmetProvider
  components/                 # Bloques de interfaz: Hero, About, Projects, Contact, CaseStudy
  components/shared/          # Piezas reutilizables: galería, video embed, skeleton, wrappers
  context/                    # Tema e idioma
  hooks/useSupabaseStorage.js # Carga de carpetas, proyectos, videos y URLs firmadas desde R2
  lib/supabase.js             # Cliente S3 compatible con Cloudflare R2
  pages/                      # Vistas por sección y página de proyecto
  styles/                     # Base visual, animaciones y estilos compartidos
```

> 💡 El nombre `supabase` quedó como herencia del desarrollo, pero la implementación actual habla con R2 usando el SDK S3.

### Flujo de render

1. `App.jsx` monta los providers globales (`ThemeProvider`, `LanguageProvider`, `HelmetProvider`) y configura React Router.
2. La home presenta el manifiesto visual del portfolio: hero, presentación, áreas creativas y contacto.
3. Cada sección (`/redes`, `/diseno`, `/video`, `/foto`) usa hooks de contenido para pedir datos al bucket.
4. Cuando un proyecto tiene `info.json`, puede abrirse en `/proyecto/:section/:projectId`.
5. `Proyecto.jsx` transforma la data cruda del bucket al formato que espera `CaseStudy`.
6. `CaseStudy` arma la narrativa: hero, metadata, overview, reto, proceso, solución, resultados, herramientas y galería.

## 🗃️ Sistema de contenido

El bucket funciona como CMS liviano. La estructura de carpetas define qué aparece en cada sección:

```txt
Portfolio/
  redes/
    cliente-a/
      pieza-1.jpg
      pieza-2.jpg
      info.json
  diseno/
    proyecto-x/
      cover.jpg
      banner.jpg
      mockup.jpg
      info.json
  foto/
    sesion-y/
      001.jpg
      002.jpg
  video/
    videos.json
```

### 📝 `info.json`

`info.json` es el puente entre galería y caso de estudio. Si existe, la app puede enriquecer el proyecto con contexto narrativo.

Campos principales:

- 🏷️ Identidad: `title`, `tagline`, `category`, `client`
- 🧾 Metadata: `year`, `duration`, `role`, `tools`
- 🖼️ Imágenes clave: `coverImage`, `bannerImage`, `challengeImage`, `solutionImage`
- 📖 Historia: `overview`, `challenge`, `process`, `solution`, `results`

Decisión importante: las imágenes no se referencian desde el repo, sino por nombre dentro de la carpeta del proyecto. Así el contenido sigue siendo portable dentro del bucket y el código solo interpreta convenciones.

### 🎬 Videos

La sección de video lee `video/videos.json`. Cada entrada puede traer título, cliente, categoría, thumbnail y URL. Si el video es de YouTube y faltan título o thumbnail, la app intenta resolverlos vía oEmbed; si no, usa un fallback de thumbnail por ID.

## 🎛️ Decisiones de sistema

- 🔐 `URLs firmadas por defecto`: el sistema asume contenido privado y genera URLs temporales desde R2. También permite base pública con `VITE_R2_FORCE_SIGNED=false`.
- ⚡ `Precarga progresiva`: los covers se precargan primero; el resto de imágenes se precarga por lotes para que la navegación se sienta más fluida sin saturar la red.
- 🧯 `Error boundaries`: la app envuelve la experiencia con `ErrorBoundary` para evitar que un fallo puntual tumbe toda la interfaz.
- 🌗 `Tema persistente`: el modo claro/oscuro se guarda en `localStorage` y se refleja en `html.dark`, dejando que CSS variables hagan el resto.
- 🌎 `Idioma en contexto`: ES/EN vive en `LanguageContext`, suficiente para una interfaz pequeña sin meter una capa pesada de i18n.
- 🧭 `SPA en Vercel`: `vercel.json` reescribe todas las rutas hacia `index.html`, necesario para URLs internas como `/proyecto/diseno/...`.
- 🧬 `Componentes especializados`: cada sección tiene un layout propio porque cada disciplina se consume distinto. No se fuerza una sola tarjeta universal para todo.

## 🖌️ Dirección visual

La interfaz mezcla dos tonos tipográficos:

- `Luxurious Script`: gesto expresivo, firma visual, sensación manual/editorial.
- `Lexend`: estructura, lectura y contraste contemporáneo.

La combinación aparece en títulos grandes como `DISEÑO`, `VIDEO`, `FOTOGRAFÍA` y `REDES SOCIALES`, donde algunas letras se tratan como acentos visuales. Esto hace que la navegación misma se sienta parte de la marca, no solo un menú.

### Paleta

La base visual usa fondos cálidos y rojos profundos:

- `--background`: superficie cálida tipo papel.
- `--text`: lectura principal.
- `--primary`, `--secondary`, `--accent`: familia roja para marca, interacción y énfasis.
- `html.dark`: invierte el sistema sin cambiar la estructura de componentes.

La decisión no busca neutralidad SaaS. Busca una identidad más personal, con contraste fuerte, calor y presencia gráfica.

## 🧱 Decisiones de interfaz

- 🏠 `Hero`: ocupa la primera pantalla, usa composición centrada con líneas finas, gradiente de salida y espacio para una escena Spline/Lottie. Funciona como entrada de marca antes que como simple encabezado.
- 🧭 `Listado de proyectos`: las áreas creativas son filas grandes, casi editoriales. El hover desplaza, cambia color y revela dirección de navegación.
- 📱 `Redes`: usa carruseles infinitos por cliente porque el contenido de social media se entiende mejor como volumen, ritmo y repetición.
- 🎨 `Diseño`: alterna composición izquierda/derecha para que cada proyecto respire como pieza individual.
- 🎬 `Video`: usa grilla 16:9 con botón de play grande; la interacción se siente inmediata y reconocible.
- 📷 `Fotografía`: usa masonry para respetar proporciones distintas y dar una lectura más orgánica.
- 📚 `CaseStudy`: estructura editorial con hero full-screen, metadata en grilla, secciones numeradas, galería y navegación al siguiente proyecto.
- 🖱️ `Cursor custom`: refuerza la sensación de pieza interactiva en desktop y se desactiva en dispositivos táctiles.

## 🎞️ Movimiento y feedback

El movimiento está usado como lenguaje de transición, no como decoración suelta:

- `AnimatePresence` suaviza cambios de ruta.
- Los elementos entran con opacidad y desplazamiento leve.
- Hover states revelan intención: abrir proyecto, reproducir video, ampliar imagen o navegar.
- Se respeta `prefers-reduced-motion` reduciendo animaciones globales.
- Varias capas usan `translate3d`, `will-change` y `contain` para mantener animaciones fluidas.

## 🧩 Rutas y experiencia

| Ruta | Experiencia |
| --- | --- |
| `/` | 🏠 Presentación general y acceso a las disciplinas. |
| `/redes` | 📱 Carruseles por cliente con opción de caso de estudio. |
| `/diseno` | 🎨 Proyectos visuales con layout alternado. |
| `/video` | 🎬 Biblioteca de videos con reproducción modal. |
| `/foto` | 📷 Sets fotográficos en masonry + galería. |
| `/proyecto/:section/:projectId` | 📚 Caso de estudio generado desde `info.json`. |
| `*` | 🧩 404 integrada al sistema visual. |

## 🧰 Stack elegido

- React + Vite para una app rápida, simple y enfocada en UI.
- React Router para rutas internas y casos de estudio deep-linkeables.
- Motion para transiciones y microinteracciones.
- React Helmet Async para metadata SEO.
- AWS SDK S3 contra Cloudflare R2 para leer contenido externo.
- CSS modular por componente/página, con variables globales para tema.

## 🔮 Lectura del repo

Este repo funciona como un sistema de publicación personal: el código define cómo se ve y se comporta el portafolio; el bucket define qué obra está publicada. Esa separación es la decisión central. Permite que el sitio no dependa de redeploys para cada actualización de contenido y, al mismo tiempo, conserva una dirección visual muy específica en lugar de delegarla a un CMS genérico.
