# Band Repertorio

Una aplicación web para gestionar el repertorio de tu banda, eventos, ensayos y notas por canción.

## Características

- **Repertorio**: Busca canciones por título/artista, muestra portada de álbum y agrega al repertorio.
- **Eventos**: Crea eventos pasados o futuros con fecha, hora, ubicación y asigna canciones.
- **Ensayos**: Crea sesiones de ensayo y asigna canciones para practicar.
- **Detalles de canción**: Al hacer clic en una canción, verás información como tonalidad, BPM, afinación y equipo de cada guitarrista (amplificadores, pedales de drive, modulación, delay, etc.).
- **Notas por canción**: (Por implementar) espacio para anotar qué falta por ensayar.
- **Interfaz minimalista**: Diseño limpio, moderno y visual, inspirado en Apple Music y Apple Notes.
- **Persistencia**: Los datos se guardan en el almacenamiento local del navegador.
- **Icono**: Incluye un ícono musical para la aplicación.

## Despliegue en GitHub Pages

1. Sube todo el contenido de esta carpeta a un repositorio de GitHub (por ejemplo, `band-repertorio`).
2. En la configuración del repositorio, ve a **Pages** y selecciona la rama `main` (o `master`) y la carpeta `/ (root)`.
3. GitHub generará un sitio web en `https://<tu-usuario>.github.io/band-repertorio/`.

## Uso

### Editar el nombre de la banda
- En el encabezado, escribe el nombre de tu banda y haz clic en **Guardar**.

### Agregar canciones al repertorio
1. En la sección **Repertorio**, escribe el nombre de una canción o artista en el campo de búsqueda.
2. Aparecerán sugerencias con portada de álbum, título y artista.
3. Haz clic en una canción para seleccionarla.
4. La canción se agregará automáticamente al repertorio y se mostrará en la lista.
5. Puedes hacer clic en cualquier canción del repertorio para ver sus detalles en un popup.

### Agregar canciones a eventos o ensayos
1. Selecciona una canción del repertorio (clic en la canción).
2. Los botones **Agregar a evento** y **Agregar a ensayo** se activarán.
3. Haz clic en el botón correspondiente para asignar la canción a un evento o ensayo (funcionalidad básica; se puede mejorar seleccionando el evento/ensayo específico).

### Crear eventos y ensayos
1. Ve a la sección **Eventos** o **Ensayos**.
2. Haz clic en **+ Nuevo evento** o **+ Nuevo ensayo**.
3. Completa los datos solicitados (nombre, fecha, hora opcional, ubicación opcional).
4. El evento/ensayo aparecerá en la lista.
5. Haz clic en un evento/ensayo para ver sus detalles y las canciones asignadas.

### Configuración de la API de Gemini
- La aplicación usa la API de Gemini para obtener detalles avanzados de las canciones (como tonalidad, BPM, afinación y equipo).
- En la sección **Ajustes**, ingresa tu clave de API de Gemini.
- **Nota**: La implementación actual incluye una función de ejemplo (mock) que devuelve datos de muestra. Para usar la API real, deberás reemplazar la función `fetchGeminiDetails` en `script.js` por una llamada auténtica a la API de Gemini.

## Próximos pasos / Mejoras posibles

- Implementar selección específica de evento/ensayo al agregar una canción.
- Arrastrar y soltar para reordenar canciones dentro de un evento o ensayo.
- Sección de "Ensayar canción" con videos de tabs de YouTube, backing tracks y enlaces a Songsterr.
- Nota por canción para marcar lo que falta por ensayar.
- Sincronización con la nube (opcional).
- Soporte para múltiples guitarras y bajos.
- Exportar/importar datos como JSON.

## Desarrollo local

Para probar la aplicación localmente, simplemente abre `index.html` en tu navegador (se recomienda usar un servidor local para evitar problemas de CORS, por ejemplo:

```bash
# Si tienes Python instalado
python -m http.server 8000

# Luego abre http://localhost:8000 en tu navegador
```