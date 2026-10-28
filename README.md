# Encore

Sitio estático para gestionar el repertorio, eventos y ensayos de una banda.

## Publicar en GitHub Pages

1. Sube `index.html` y `favicon.svg` a la raíz del repositorio.
2. En GitHub abre **Settings → Pages** y selecciona **Deploy from a branch**, tu rama principal y `/(root)`.
3. Abre Encore → **Mi banda**, pega tu clave APInex y elige **Guardar clave**.

## APInex y privacidad

- Usa el endpoint compatible con OpenAI `https://api.apinex.bond/v1/chat/completions` y el modelo `free/gpt-6-luna`.
- En cada investigación, la app busca fuentes con la herramienta APInex Web Search y pasa esos extractos al modelo. La búsqueda web y la inferencia pueden tener cuotas o cargos propios de APInex; confirma las condiciones actuales de tu cuenta.
- La clave se guarda en `localStorage` de este navegador y no se publica en GitHub ni se manda a Cloudflare. El navegador la incluye en solicitudes directas a APInex, así que alguien con acceso a ese navegador puede inspeccionarla.
- Resultados de investigación se guardan con las canciones en el almacenamiento local para no repetir la búsqueda en este navegador. Para volver a investigar, elimina la canción y vuelve a agregarla, o borra sus datos del navegador.
- Las sugerencias y carátulas se consultan en iTunes/Apple.

La conexión directa desde GitHub Pages depende de que APInex permita solicitudes CORS desde el origen de tu sitio. La opción **Probar conexión** ayuda a detectarlo. Si el navegador bloquea CORS, hará falta un proxy; sin proxy no se puede ocultar una clave en una app web pública.

## Datos locales y medios

Repertorio, banda, eventos, ensayos, notas, clave e investigaciones se guardan localmente en el navegador; no se sincronizan entre integrantes. Los resultados embebidos de YouTube y Songsterr requieren una integración de medios aparte y no se resuelven con la API de chat.
