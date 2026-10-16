# Encore

Prototipo estático para organizar el repertorio, los eventos y los ensayos de una banda. No requiere instalación ni servidor: abre `index.html` o publícalo con GitHub Pages.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube `index.html` y `favicon.svg` (puedes incluir también este README).
2. En el repositorio, abre **Settings → Pages**.
3. En **Build and deployment**, selecciona **Deploy from a branch**, elige la rama principal y la carpeta **/(root)**, y guarda.
4. GitHub mostrará la dirección pública del sitio en esa misma sección.

También puedes poner los tres archivos en la raíz de un repositorio existente. Si los dejas dentro de una subcarpeta, GitHub Pages no los servirá desde la raíz del sitio.

## Datos y alcance

- Canciones, eventos, orden del setlist y notas de ensayo se guardan en `localStorage` del navegador. Los cambios no se sincronizan entre integrantes ni entre dispositivos.
- La búsqueda y las portadas son demostrativas. Los enlaces de YouTube y Songsterr llevan a resultados de búsqueda.
- La integración real de Gemini necesita un backend que mantenga la clave fuera del navegador y almacene las investigaciones ya realizadas. No pongas una clave API en este sitio estático.

## Archivos

- `index.html`: aplicación web completa.
- `favicon.svg`: icono de Encore para la pestaña del navegador.
