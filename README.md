# Encore

Prototipo estático para organizar el repertorio, los eventos y los ensayos de una banda. No requiere instalación ni servidor: abre `index.html` o publícalo con GitHub Pages. El nombre de la banda se edita desde **Mi banda**. Al agregar una canción, escribe el título o artista y elige una sugerencia del catálogo; se completan el artista, álbum, género y portada.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube el contenido del ZIP conservando su estructura. `index.html` y `favicon.svg` deben quedar en la raíz; conserva también la carpeta `cloudflare-worker`.
2. En el repositorio, abre **Settings → Pages**.
3. En **Build and deployment**, selecciona **Deploy from a branch**, elige la rama principal y la carpeta **/(root)**, y guarda.
4. GitHub mostrará la dirección pública del sitio en esa misma sección.

También puedes poner los tres archivos en la raíz de un repositorio existente. Si los dejas dentro de una subcarpeta, GitHub Pages no los servirá desde la raíz del sitio.

## Datos y alcance

- Canciones, eventos, orden del setlist y notas de ensayo se guardan en `localStorage` del navegador. Los cambios no se sincronizan entre integrantes ni entre dispositivos.
- Las sugerencias y carátulas se consultan en el catálogo de iTunes/Apple. La búsqueda requiere conexión a internet. El idioma, tonalidad, BPM, afinación y equipo no los proporciona ese catálogo; se enriquecerán con el backend de Gemini.
- Los paneles de YouTube y Songsterr ya tienen espacio para incrustar los resultados; necesitan el backend de Encore configurado para poblarlos. YouTube requiere buscar con su Data API y después reproducir con el reproductor embebido. Songsterr debe integrarse con enlaces públicos o acceso autorizado; no se deben extraer datos automatizando su sitio.
- La integración de Gemini requiere un backend que guarde la clave en una variable secreta y almacene investigaciones completadas para reutilizarlas. Nunca pongas una clave API en este sitio estático.
- Los datos de la banda y las canciones siguen guardándose en `localStorage`: son locales a un navegador y no se sincronizan entre integrantes.

## Archivos

- `index.html`: aplicación web completa.
- `favicon.svg`: icono de Encore para la pestaña del navegador.
- `cloudflare-worker/`: backend listo para desplegar o adaptar al Worker que ya tienes.

## Conectar Cloudflare

Despliega el Worker incluido (o integra su código en tu Worker existente), vinculando KV como `SONG_CACHE` y el secreto `GEMINI_API_KEY`. Sigue `cloudflare-worker/README.md`. Después, abre Encore → **Mi banda** y pega la URL pública del Worker; ese es el único dato de Cloudflare que se introduce dentro de la app. Para los videos de YouTube, configura además el secreto opcional `YOUTUBE_API_KEY`. La búsqueda de Songsterr queda pendiente de una fuente autorizada.
