# Encore

Sitio estático para gestionar repertorio, eventos y ensayos de una banda.

## Publicar en GitHub Pages

1. Sube `index.html` y `favicon.svg` a la raíz del repositorio.
2. En GitHub abre **Settings → Pages** y selecciona **Deploy from a branch**, tu rama principal y `/(root)`.
3. En **Mi banda**, configura APInex si quieres investigar rigs o conversar sobre canciones.

## APInex (Chat Completions directo)

La app usa únicamente `POST /v1/chat/completions` con el modelo configurado —por defecto `free/gpt-6-luna`— para investigar o conversar. No llama a herramientas de búsqueda web. Agregar una canción no consume llamadas; la investigación requiere pulsar **Investigar rig**. Después se puede usar **Rehacer investigación** para volver a consultar el modelo. Como no se consulta la web, las atribuciones pueden quedar sin confirmar y el modelo debe indicar incertidumbre.

El chat de cada canción se guarda en `localStorage` junto a esa canción. La clave APInex también se guarda localmente y se envía desde el navegador; GitHub Pages no puede ocultar una clave usada desde el cliente. La conexión depende de que APInex permita CORS desde el origen del sitio. Si Chat Completions devuelve “insufficient balance”, confirma en la cuenta de APInex el acceso a `free/gpt-6-luna`, el límite diario y el estado de la clave.

## Ensayos

Hay ensayos recurrentes los martes y jueves a las 20:00. El calendario cambia de mes con sus botones; puedes arrastrar un ensayo a otro día, editar nombre/hora/lugar, cancelarlo o agregar una fecha especial. Cada ensayo mantiene su propia lista de canciones y notas por canción. Desde Repertorio, **＋ ensayo** pregunta a qué fecha agregar la canción. Inicio muestra la próxima fecha futura y las canciones de esa sesión.

## StemDeck

El apartado StemDeck incrusta `https://192.168.100.29:8443/mobile/`. El equipo debe estar encendido y accesible desde la misma red o VPN. StemDeck usa HTTPS local y un certificado propio que cada dispositivo debe confiar una vez. [Configuración oficial](https://github.com/stemdeckapp/stemdeck/blob/main/docs/configuration.md).

Si StemDeck bloquea el iframe, el servidor o proxy debe permitir el origen HTTPS exacto de GitHub Pages en `Content-Security-Policy: frame-ancestors` y no enviar `X-Frame-Options: DENY` o `SAMEORIGIN`.

## Apariencia y almacenamiento

En **Mi banda → Apariencia** se elige tema claro, oscuro o automático, más el color de acento. Repertorio, logo, banda, eventos, ensayos, preferencias, investigación y chats se guardan localmente en este navegador y no se sincronizan automáticamente.
