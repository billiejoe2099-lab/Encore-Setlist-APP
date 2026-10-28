# Encore

Sitio estático para gestionar el repertorio, eventos y ensayos de una banda.

## Publicar en GitHub Pages

1. Sube `index.html` y `favicon.svg` a la raíz del repositorio.
2. En GitHub abre **Settings → Pages** y selecciona **Deploy from a branch**, tu rama principal y `/(root)`.
3. En **Mi banda**, configura APInex para investigación con IA y YouTube Data API para videos.

## Investigación de equipo y tono

La ficha consulta resultados web mediante APInex y pide al modelo que contraste Equipboard, entrevistas, rig rundowns y foros. Genera una posible cadena por guitarrista, atribuye evidencia e incertidumbre y propone un punto de partida descriptivo por bloque HX Stomp. Se conserva la envoltura JSON que permite mostrar los datos de forma legible; los bloques se validan contra la lista HX y no se aceptan nombres desconocidos. Los resultados quedan guardados con la canción en este navegador para evitar búsquedas repetidas.

En **Mi banda** se editan la clave API, URL base y modelo APInex. El valor inicial es `https://api.apinex.bond/v1` y `free/gpt-6-luna`. La clave se guarda localmente y se envía desde el navegador a APInex; quien tenga acceso al navegador puede inspeccionarla. El acceso directo desde GitHub Pages depende de CORS. La búsqueda web puede tener cuota propia.

## YouTube

Guarda una clave de YouTube Data API en **Mi banda**. Los resultados se normalizan sin distinguir mayúsculas, minúsculas ni acentos; se filtran por canción y se priorizan guitarra/covers con tabs o guitar backing tracks antes de ordenar por vistas. La API no garantiza que un video esté correctamente etiquetado. [Búsqueda](https://developers.google.com/youtube/v3/docs/search/list) · [estadísticas](https://developers.google.com/youtube/v3/docs/videos/list).

## StemDeck

El apartado **StemDeck** carga `https://192.168.100.29:8443/mobile/` en un marco y ofrece abrirlo en otra pestaña. El dispositivo debe estar accesible en la misma red. El navegador puede exigir confiar en el certificado HTTPS local y StemDeck puede impedir la inserción mediante políticas de marcos; en ese caso, usa el botón de nueva pestaña.

## Apariencia y almacenamiento

En **Mi banda → Apariencia** se elige modo claro, oscuro o automático, además del color de acento. El favicon y el icono de Encore siguen el acento. El diseño se adapta a móvil y escritorio. El nombre, logo, repertorio, eventos, ensayos, preferencias e investigaciones se guardan localmente en el navegador y no se sincronizan entre integrantes. Songsterr sigue necesitando una integración propia.
