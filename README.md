# Encore

Sitio estático para gestionar el repertorio, eventos y ensayos de una banda.

## Publicar en GitHub Pages

1. Sube `index.html` y `favicon.svg` a la raíz del repositorio.
2. En GitHub abre **Settings → Pages** y selecciona **Deploy from a branch**, tu rama principal y `/(root)`.
3. Abre Encore → **Mi banda** y configura la clave API, URL base y modelo de APInex. Para videos embebidos, configura también la clave de YouTube Data API.

## APInex y privacidad

- Los campos de **Mi banda** permiten cambiar la clave, URL base y modelo. De inicio usan `https://api.apinex.bond/v1` y `free/gpt-6-luna`.
- La app prueba e investiga por `POST /v1/chat/completions` con formato OpenAI-compatible.
- La búsqueda web está apagada por defecto; se puede activar en **Mi banda**, pero puede requerir saldo aparte del modelo. Al apagarla, la llamada va directamente a Chat Completions y el resultado no incluye fuentes web verificadas.
- En cada investigación, la app busca fuentes con la herramienta APInex Web Search y pasa esos extractos al modelo. La búsqueda web y la inferencia pueden tener cuotas o cargos propios de APInex; confirma las condiciones actuales de tu cuenta.
- La clave se guarda en `localStorage` de este navegador y no se publica en GitHub ni se manda a Cloudflare. El navegador la incluye en solicitudes directas a APInex, así que alguien con acceso a ese navegador puede inspeccionarla.
- Resultados de investigación se guardan con las canciones en el almacenamiento local para no repetir la búsqueda en este navegador. Para volver a investigar, elimina la canción y vuelve a agregarla, o borra sus datos del navegador.
- Las sugerencias y carátulas se consultan en iTunes/Apple.

La conexión directa desde GitHub Pages depende de que APInex permita solicitudes CORS desde el origen de tu sitio. La opción **Probar conexión** ayuda a detectarlo. Si el navegador bloquea CORS, hará falta un proxy; sin proxy no se puede ocultar una clave en una app web pública.

## YouTube

Guarda una clave de YouTube Data API en **Mi banda**. La app busca videos de guitarra o backing tracks que permiten incrustación, solicita sus vistas y los presenta dentro de la ficha. Restringe la clave en Google Cloud a YouTube Data API y al dominio de tu sitio. La API permite filtrar videos embebibles y ordenar por vistas. [Documentación de búsqueda](https://developers.google.com/youtube/data/reference/rest/v3/search/list), [estadísticas de videos](https://developers.google.com/youtube/data/reference/rest/v3/videos/list).

## Datos locales y medios

Repertorio, banda, eventos, ensayos, notas, clave e investigaciones se guardan localmente en el navegador; no se sincronizan entre integrantes. Los resultados embebidos de YouTube y Songsterr requieren una integración de medios aparte y no se resuelven con la API de chat.
