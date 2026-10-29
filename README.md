# Encore

Sitio estático para gestionar repertorio, eventos y ensayos de una banda. No integra GPT, Gemini, APInex ni búsqueda web de IA. La información musical de cada canción proviene de la API de búsqueda de iTunes de Apple; los datos de la banda, eventos, ensayos y notas se guardan en el navegador.

## Publicar en GitHub Pages

1. Sube `index.html`, `favicon.svg` y `README.md` a la raíz del repositorio.
2. En GitHub abre **Settings → Pages** y selecciona **Deploy from a branch**, tu rama principal y `/(root)`.
3. Abre el sitio y usa **＋ Añadir canción** para buscar por título o artista y seleccionar un resultado de iTunes.

## Canciones e iTunes

La portada, título, artista, álbum, género, fecha de lanzamiento, duración, número de pista/disco, país de tienda, clasificación de contenido, precio y enlaces provienen del resultado de iTunes cuando estén disponibles. Repertorio muestra estos datos y permite ordenarlos de forma ascendente o descendente, además de filtrar por género y artista/banda. El idioma se quitó. iTunes no proporciona tonalidad, BPM ni afinación, por eso esos campos ya no aparecen. Algunas canciones no tienen todos los metadatos o imagen disponibles.

La vista de canción puede mostrar una vista previa de audio de iTunes y un enlace a Apple Music/iTunes si la respuesta los incluye. No se requiere clave de API.

## Eventos y setlists

Eventos ofrece vista de lista y calendario mensual. Los días con ensayo aparecen marcados; cada evento muestra cuántos días faltan y cuántos ensayos programados quedan antes de su fecha. Desde el evento puedes abrir su setlist, añadir/quitar canciones, arrastrar para ordenarlas y usar **Imprimir setlist**. El botón abre la impresión del navegador, donde puedes elegir **Guardar como PDF**; el diseño ajusta el tamaño de los títulos para aprovechar una hoja A4.

Al pulsar una canción del setlist se abre su hoja de estructura/letra. Puedes escribir o pegar contenido propio, insertar etiquetas de secciones arrastrándolas o tocándolas, subrayar texto y añadir anotaciones. La información se guarda localmente por canción.

## Ensayos

Hay ensayos recurrentes los martes y jueves a las 20:00. El calendario permite mover sesiones entre días, editar nombre/hora/lugar, cancelarlas o agregar fechas especiales. Cada ensayo mantiene su lista de canciones y notas propias. Desde Repertorio, **＋ ensayo** pregunta a qué sesión agregar la canción. Inicio muestra la próxima fecha futura.

## StemDeck

El apartado StemDeck incrusta `https://192.168.100.29:8443/mobile/`. El equipo debe estar encendido y accesible desde la misma red o VPN. StemDeck usa HTTPS local y un certificado propio que cada dispositivo debe confiar una vez. [Configuración oficial](https://github.com/stemdeckapp/stemdeck/blob/main/docs/configuration.md).

Si StemDeck bloquea el iframe, el servidor o proxy debe permitir el origen HTTPS exacto de GitHub Pages en `Content-Security-Policy: frame-ancestors` y no enviar `X-Frame-Options: DENY` o `SAMEORIGIN`.

## Apariencia y almacenamiento

En **Mi banda → Apariencia** se elige tema claro, oscuro o automático, además del color de acento. Repertorio, logo, banda, eventos, ensayos, letras/estructuras y preferencias se guardan localmente en este navegador y no se sincronizan automáticamente. Las claves y los campos locales de IA heredados se eliminan al abrir esta versión.
