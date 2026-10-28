# Encore

Sitio estático para gestionar el repertorio, eventos y ensayos de una banda. Los datos y preferencias se guardan en el navegador.

## Publicar en GitHub Pages

1. Sube `index.html`, `favicon.svg` y `README.md` a la raíz del repositorio.
2. En GitHub abre **Settings → Pages** y selecciona **Deploy from a branch**, tu rama principal y `/(root)`.
3. En **Mi banda**, configura APInex si quieres usar los datos musicales automáticos o el chat.

## Datos musicales y APInex

Al agregar una canción nueva, Encore hace una sola llamada directa a `POST /v1/chat/completions` con el modelo configurado (por defecto `free/gpt-6-luna`) para sugerir tonalidad, BPM, afinación y un contexto breve. No usa herramientas de búsqueda web ni hace llamadas automáticas para canciones ya guardadas. El botón ↻ permite actualizar manualmente esos datos. La precisión puede variar: el modelo indica cuando un dato no está confirmado.

El chat de cada canción se guarda localmente. La clave APInex también se guarda en el navegador y se envía desde el navegador al proveedor; GitHub Pages no puede ocultarla de quien inspeccione ese navegador. La conexión requiere que APInex permita CORS desde el sitio publicado. Si el proveedor devuelve “insufficient balance”, revisa el estado de la clave, el acceso al modelo y los límites de tu cuenta APInex.

## Eventos y setlists

Eventos ofrece vista de lista y calendario mensual. Los días con ensayo aparecen marcados; cada evento muestra cuántos días faltan y cuántos ensayos programados quedan antes de su fecha. Desde el evento puedes abrir su setlist, añadir/quitar canciones, arrastrar para ordenarlas y usar **Imprimir setlist**. El botón abre la impresión del navegador, donde puedes elegir **Guardar como PDF**; el diseño ajusta el tamaño de los títulos para aprovechar una hoja A4.

Al pulsar una canción del setlist se abre su hoja de estructura/letra. Puedes escribir o pegar contenido propio, insertar etiquetas de secciones arrastrándolas o tocándolas, subrayar texto y añadir anotaciones. Este contenido se guarda localmente por canción.

## Ensayos

Hay ensayos recurrentes los martes y jueves a las 20:00. El calendario permite mover sesiones entre días, editar nombre/hora/lugar, cancelarlas o agregar fechas especiales. Cada ensayo mantiene su lista de canciones y notas propias. Desde Repertorio, **＋ ensayo** pregunta a qué sesión agregar la canción. Inicio muestra la próxima fecha futura.

## StemDeck

El apartado StemDeck incrusta `https://192.168.100.29:8443/mobile/`. El equipo debe estar encendido y accesible desde la misma red o VPN. StemDeck usa HTTPS local y un certificado propio que cada dispositivo debe confiar una vez. [Configuración oficial](https://github.com/stemdeckapp/stemdeck/blob/main/docs/configuration.md).

Si StemDeck bloquea el iframe, el servidor o proxy debe permitir el origen HTTPS exacto de GitHub Pages en `Content-Security-Policy: frame-ancestors` y no enviar `X-Frame-Options: DENY` o `SAMEORIGIN`.

## Apariencia y almacenamiento

En **Mi banda → Apariencia** se elige tema claro, oscuro o automático, además del color de acento. Repertorio, logo, banda, eventos, ensayos, letras/estructuras, preferencias, datos musicales y chats se guardan localmente en este navegador y no se sincronizan automáticamente.
