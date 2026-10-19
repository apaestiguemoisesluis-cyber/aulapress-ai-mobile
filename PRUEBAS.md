# Pruebas de AulaPress AI Mobile v0.1

## Pruebas realizadas

- JavaScript: `node --check` en `app.js`, `db.js` y `sw.js`: **sin errores de sintaxis**.
- Validación básica de archivos HTML, CSS, manifiesto e iconos: **presentes y enlazados**.
- Vista simulada móvil de 390 px, renderizada en Chromium: **generada**.
- Flujo de interfaz con un almacén simulado en Playwright: **creación de curso, carga de PDF, edición de etiqueta de sesión, guardado de la plantilla, exportación de JSON, eliminación de archivo y restauración posterior**: **correcto y sin errores JavaScript**.

## Pruebas pendientes al publicar

- Verificar el almacenamiento real IndexedDB en Android Chrome y Safari para iPhone: el navegador automatizado disponible aquí restringe las navegaciones a orígenes de prueba, por lo que la comprobación del flujo se hizo con un almacenamiento simulado.
- Verificar instalación de PWA desde dirección HTTPS real y modo offline en ambos teléfonos.
- Verificar capacidades de almacenamiento con PDF/PPTX grandes en dispositivos reales.

Esta primera versión es un **prototipo utilizable** y no representa un motor de producción académica conectado a OpenAI.
