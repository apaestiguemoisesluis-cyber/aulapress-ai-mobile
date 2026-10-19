# AulaPress AI Mobile: instalación en Android y iPhone

## Paso 1: descargar y descomprimir

Descarga `AulaPress_AI_Mobile_v0.1.zip` desde ChatGPT. Descomprime el ZIP.

La carpeta contiene `index.html`, `styles.css`, `db.js`, `app.js`, `sw.js`, `manifest.webmanifest` y `icons/`.

## Paso 2: obtener un enlace HTTPS (una sola vez)

Esta app todavía no está alojada en internet. Para instalarla en teléfonos es necesario publicarla en un sitio con HTTPS. Puedes utilizar GitHub Pages:

1. Entra en `https://github.com` y crea un repositorio nuevo llamado `aulapress-ai-mobile`.
2. Sube **el contenido de la carpeta** `aulapress-ai-mobile-v0.1`, NO únicamente el archivo ZIP. `index.html` debe quedar en la raíz y los iconos dentro de `icons/`.
3. En tu repositorio ve a `Settings` → `Pages` y selecciona `Deploy from a branch`, rama `main`, carpeta `/ (root)`; guarda.
4. Espera a que GitHub Pages te ofrezca la dirección `https://TU-USUARIO.github.io/aulapress-ai-mobile/`.

**Si lo haces exclusivamente desde un teléfono:** utiliza GitHub desde el navegador en modo "Sitio de escritorio" para subir los archivos y configurar Pages. Es más laborioso que hacerlo desde una PC.

**La página publicada será pública**, pero los archivos de tus clases y el PDF de referencia se guardan en el navegador de cada dispositivo; no se cargan al repositorio ni a GitHub Pages.

## Paso 3: instalar en Android

1. Abre el enlace HTTPS de tu PWA con Google Chrome.
2. Abre el menú `⋮` → `Instalar aplicación` (o `Añadir a pantalla principal`).
3. Abre el icono **AulaPress** que aparece en tu inicio.

## Paso 4: instalar en iPhone

1. Abre **Safari** (no el navegador integrado de otra app).
2. Visita la misma dirección HTTPS.
3. Pulsa el icono **Compartir** → `Añadir a pantalla de inicio`.
4. Abre el icono **AulaPress** en la pantalla de inicio.

## Paso 5: probar las funciones

1. Abre **Cursos** → **Nuevo curso**; escribe la asignatura.
2. Abre el curso → **Elegir archivos** y selecciona PDF/PPTX.
3. En **Plantilla**, sube UNA VEZ el PDF final aprobado del libro de electromagnetismo.
4. En **Ajustes**, pulsa **Exportar copia** para descargar un `.json` de respaldo.
5. Si deseas repetir estos datos en otro teléfono, utiliza **Restaurar** y selecciona el `.json` (se reemplazará la biblioteca local de ese teléfono).

## Importante

La versión v0.1 **NO genera libros PDF automáticamente** y **NO sincroniza los materiales**. Su función es tener una biblioteca y plantilla A4 reales, almacenadas localmente, con interfaz móvil. El motor de OpenAI y la sincronización requieren un servidor con autenticación en la siguiente fase.

Evita borrar los datos del navegador sin exportar antes una copia de seguridad. Usa la misma instalación y el mismo navegador para conservar la biblioteca.
