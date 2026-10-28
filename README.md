# Encore

Sitio estático para gestionar repertorio, eventos y ensayos de una banda.

## Publicar en GitHub Pages

1. Sube `index.html` y `favicon.svg` a la raíz del repositorio.
2. En GitHub abre **Settings → Pages** y selecciona **Deploy from a branch**, tu rama principal y `/(root)`.
3. Configura APInex en **Mi banda** si quieres buscar equipo original en fuentes web.

## Equipo original

La búsqueda consulta APInex Web Search y pide al modelo sintetizar únicamente atribuciones de equipo original por guitarrista, incluyendo únicamente datos vinculados por las fuentes a esa canción o a su álbum/época; omite equipo general del artista sin ese vínculo. No propone bloques HX Stomp ni recomendaciones de tono. Se guardan fuentes enlazadas junto a la canción para reducir búsquedas repetidas. La búsqueda web y la llamada al modelo pueden tener cuotas distintas.

La clave API, URL base y modelo APInex se configuran en **Mi banda** y se guardan en el almacenamiento local del navegador. GitHub Pages no protege una clave que se usa desde el cliente. La llamada directa también depende de que APInex acepte CORS desde el sitio.

## StemDeck integrado

El apartado StemDeck incrusta `https://192.168.100.29:8443/mobile/` directamente. El equipo que hospeda StemDeck debe estar encendido y accesible por la red local. La documentación oficial indica que la conexión móvil usa HTTPS y un certificado generado localmente; cada dispositivo debe confiar en ese certificado una vez. [Configuración oficial](https://github.com/stemdeckapp/stemdeck/blob/main/docs/configuration.md).

No hay un permiso de navegador que Encore pueda otorgar para permitir un iframe. Si el servidor devuelve `X-Frame-Options: DENY`/`SAMEORIGIN` o una política CSP `frame-ancestors` que excluye Encore, el administrador del servidor o proxy debe retirar ese bloqueo o permitir el origen HTTPS exacto de GitHub Pages. No uses `*` para sitios públicos. [Cómo funcionan estas cabeceras](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Frame-Options).

## Apariencia y datos

En **Mi banda → Apariencia** se elige tema claro, oscuro o automático y el color de acento. El acento se aplica a botones, navegación, superficies resaltadas, icono y favicon. El panel lateral permanece pegado al borde izquierdo y se adapta a escritorio y móvil. Inicio muestra una vista breve del siguiente ensayo y evento; al pulsarlas se abre el ensayo completo o el setlist del evento.

Nombre, logo, repertorio, eventos, ensayos, preferencias e investigaciones se guardan localmente en el navegador; no se sincronizan automáticamente entre dispositivos.
