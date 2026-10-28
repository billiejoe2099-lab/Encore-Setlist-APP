# Encore

Sitio estático para gestionar el repertorio, eventos y ensayos de una banda.

## Publicar en GitHub Pages

1. Sube `index.html` y `favicon.svg` a la raíz del repositorio.
2. En GitHub abre **Settings → Pages** y selecciona **Deploy from a branch**, tu rama principal y `/(root)`.
3. Abre Encore → **Mi banda** y configura la clave API, URL base y modelo de APInex. Para videos embebidos, configura también la clave de YouTube Data API.

## APInex y privacidad

- Los campos de **Mi banda** permiten cambiar la clave, URL base y modelo. De inicio usan `https://api.apinex.bond/v1` y `free/gpt-6-luna`.
- La app prueba e investiga por `POST /v1/chat/completions` con formato OpenAI-compatible.
- La búsqueda web está apagada por defecto. Si se activa, APInex Web Search puede tener cuota separada; al apagarla, la llamada va directamente a Chat Completions y no incluye fuentes web verificadas.
- La clave se guarda en `localStorage` de este navegador y no se publica en GitHub ni se manda a Cloudflare. El navegador la incluye en solicitudes directas a APInex, así que alguien con acceso a ese navegador podría inspeccionarla.
- Las investigaciones se guardan con las canciones localmente para evitar repetirlas en este navegador.
- Las sugerencias y carátulas se consultan en iTunes/Apple.
- La ficha admite hasta tres guitarristas y separa el equipo de cada uno. Las equivalencias HX Stomp se limitan a nombres de bloques conocidos; si no hay coincidencia permitida, muestra **Sin equivalente claro**.

La conexión desde GitHub Pages depende de que APInex permita solicitudes CORS desde el origen del sitio. **Probar conexión** ayuda a detectarlo. Si el navegador bloquea CORS, hará falta un proxy; una clave en una app web pública no queda protegida por completo.

## Videos de YouTube

Guarda una clave de YouTube Data API en **Mi banda**. Se buscan videos embebibles y se filtran por el título de la canción y palabras que identifiquen covers con tabs o backing tracks; después se ordenan por vistas y se muestran en la ficha. Este filtro reduce resultados ajenos, aunque YouTube no verifica que el contenido real coincida con el título. Restringe la clave en Google Cloud a YouTube Data API y al dominio de tu sitio. [Búsqueda](https://developers.google.com/youtube/v3/docs/search/list) · [estadísticas](https://developers.google.com/youtube/v3/docs/videos/list).

## Logo de banda

En **Mi banda** puedes subir el logo. Se reduce a un tamaño práctico y se guarda localmente; si no hay imagen, el icono usa la inicial del nombre de la banda.

## Datos locales

Repertorio, banda, logo, eventos, ensayos, notas, claves e investigaciones se guardan en el navegador y no se sincronizan entre integrantes. La lista de Songsterr requiere una integración de medios aparte.
