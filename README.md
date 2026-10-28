# Encore

Sitio estático para gestionar repertorio, eventos y ensayos de una banda.

## Publicar en GitHub Pages

1. Sube `index.html` y `favicon.svg` a la raíz del repositorio.
2. En GitHub abre **Settings → Pages** y selecciona **Deploy from a branch**, tu rama principal y `/(root)`.
3. En **Mi banda**, configura APInex para investigar equipo y conversar sobre canciones.

## APInex: equipo y chat por canción

Agregar una canción no inicia consultas de IA. En su ficha, **Investigar rig** busca referencias sobre equipo original de esa grabación/álbum; **Rehacer investigación** vuelve a consultar fuentes. La app no recomienda HX Stomp ni genera cadenas de efectos. Cada canción guarda su propia investigación y su chat localmente en este navegador.

La investigación usa dos solicitudes manuales: APInex Web Search y después Chat Completions. El chat por canción usa solo Chat Completions y no busca en la web. La app identifica cuál solicitud fue rechazada y muestra el mensaje de APInex. Aunque el modelo `free/gpt-6-luna` aparezca como gratuito, revisa en APInex el límite gratuito, saldo y disponibilidad de Web Search; son solicitudes distintas. La clave, URL base y modelo se guardan en `localStorage`. GitHub Pages no puede proteger una clave que se usa en el navegador; además APInex debe permitir CORS desde el sitio.

## Ensayos

El calendario genera sesiones recurrentes los martes y jueves a las 17:00. Permite recorrer los meses con botones o deslizando, agregar ensayos especiales y cancelar fechas individuales. Inicio calcula el siguiente ensayo desde la fecha actual y muestra una vista breve de la cola de canciones.

## StemDeck integrado

El apartado StemDeck incrusta `https://192.168.100.29:8443/mobile/`. El equipo debe estar encendido y accesible desde la misma red o VPN. StemDeck usa HTTPS local y un certificado propio; cada dispositivo debe confiar en ese certificado una vez. [Configuración oficial](https://github.com/stemdeckapp/stemdeck/blob/main/docs/configuration.md).

No hay un permiso de navegador que Encore pueda otorgar para habilitar un iframe. Si StemDeck envía `X-Frame-Options: DENY`/`SAMEORIGIN` o una política CSP `frame-ancestors` que excluye Encore, el servidor o proxy debe permitir el origen HTTPS exacto de GitHub Pages. [Referencia de cabeceras de marco](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Frame-Options).

## Apariencia y datos

En **Mi banda → Apariencia** se elige tema claro, oscuro o automático, más el color de acento. Los campos del tema oscuro usan fondo oscuro y texto claro. El acento sigue botones, navegación, superficies resaltadas, icono y favicon; el panel lateral se adapta a la ventana. Repertorio, banda, logo, eventos, ensayos, preferencias, investigación y chats se guardan en el navegador y no se sincronizan automáticamente.
