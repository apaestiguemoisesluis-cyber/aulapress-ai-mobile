# AulaPress AI Mobile — v0.1

**Prototipo PWA funcional, privado y sin cuentas ni dependencias externas.** Preparado para Android, iPhone y navegador de escritorio.

## Qué funciona ahora

- Crear, renombrar, abrir y eliminar **cursos**.
- Subir **varios PDF y PPTX**, guardar archivos reales, asignarles etiquetas de sesión, visualizarlos (PDF), descargarlos y borrarlos.
- Guardar **una sola vez el PDF de referencia editorial**. Incluye un preset bloqueado de medidas A4 (210 × 297 mm), colores, sin numeración de páginas, fórmulas destacadas y solucionario en dos columnas.
- Conservar los archivos mediante **IndexedDB** entre visitas en el mismo navegador del dispositivo.
- **Exportar copia de seguridad JSON** con los archivos incluidos y **restaurarla** en otro dispositivo.
- Instalar como PWA desde Android Chrome y iPhone Safari al publicar en **HTTPS**.
- Interface adaptativa para pantalla estrecha y escritorio, con soporte para uso sin conexión **después de la primera carga** mediante service worker.

## Qué todavía NO hace

- No analiza diapositivas ni genera libros PDF todavía.
- No se conecta a OpenAI, ChatGPT Work ni a Supabase.
- No sincroniza dispositivos: los datos son locales hasta el próximo módulo de backend.
- No verifica que el PDF adjuntado como referencia tenga A4; la plantilla de dimensiones sí está preconfigurada.
- No contiene el PDF de libro de 10 páginas que aprobaste. Debes adjuntarlo **una vez** en `Plantilla editorial`.

No insertes claves API de OpenAI en archivos de esta PWA pública. Se integrarán únicamente en el futuro servidor backend.

## Prueba en computadora (sin instalar dependencias)

Se requiere Python 3 o cualquier servidor de archivos estáticos:

```bash
cd aulapress-ai-mobile-v0.1
python -m http.server 8765
```

Abre http://localhost:8765/index.html y crea un curso. Si modificas archivos y el navegador conserva una versión antigua, cierra la app y elimina sus datos de sitio para actualizar la caché de desarrollo.

> Abrir `index.html` directamente desde los archivos (`file://`) puede bloquear ciertas funciones de almacenamiento o instalación; es preferible utilizar un servidor HTTP.

## Instalar en Android e iPhone (necesita HTTPS)

La PWA requiere estar alojada en un enlace **https://** accesible desde el teléfono. Este ZIP **no es un APK ni un IPA**, y aquí no se ha publicado en un servidor.

### Publicación sencilla con GitHub Pages

1. Crea una cuenta o accede a [github.com](https://github.com/).
2. Crea un repositorio, por ejemplo `aulapress-ai-mobile` (público para GitHub Pages gratuito; **sólo el código será público, no tus diapositivas**, que permanecen en el dispositivo).
3. Descomprime este ZIP y sube **los archivos y la carpeta `icons/`** directamente a la raíz del repositorio. El archivo `index.html` tiene que estar en la raíz, no dentro de una carpeta extra.
4. Abre `Settings` → `Pages` → `Build and deployment` → `Deploy from a branch` → `main` → `/ (root)` → `Save`.
5. Cuando GitHub publique la web, abre `https://TU_USUARIO.github.io/aulapress-ai-mobile/` desde tu móvil.
6. **Android (Chrome):** menú `⋮` → `Instalar aplicación` o `Añadir a pantalla principal`.
7. **iPhone (Safari):** botón `Compartir` → `Añadir a pantalla de inicio`.

También puedes desplegar la carpeta en otros servicios de sitios estáticos con HTTPS como Netlify o Cloudflare Pages.

### Si solo dispones de teléfono

Puedes subir los archivos a GitHub desde el navegador del teléfono usando su interfaz web (puede ser más cómodo activar *Sitio de escritorio*). GitHub Pages sigue funcionando igual. Otra opción es que alguien con PC publique la carpeta; tú la usarás siempre desde el móvil.

## Flujo de uso

1. En **Cursos**, pulsa `Nuevo curso` y escribe el nombre.
2. Abre el curso → `Elegir archivos` → selecciona diapositivas PDF/PPTX desde tu teléfono. Límite sugerido por archivo: 60 MB.
3. Si necesitas, edita la etiqueta de sesión de cada archivo.
4. En **Plantilla**, sube **el PDF exacto que aprobaste**. Se guarda en IndexedDB.
5. En **Ajustes**, pulsa `Exportar copia`. Descarga un `.json` con archivos y plantilla incluidos y guárdalo fuera de la aplicación.
6. Si cambias de móvil, publica/abre la misma app y usa `Restaurar` con tu copia JSON.

## Datos y seguridad

Todos los materiales cargados se guardan localmente en `IndexedDB`. Ningún archivo se envía a OpenAI, GitHub ni a otro proveedor. La web publicada contiene solo HTML/CSS/JS e iconos. **El almacenamiento del navegador no es una copia fiable a largo plazo:** limpiar datos del sitio, reinstalar el navegador o cambiar de teléfono puede eliminar los archivos. Usa `Exportar copia` periódicamente.

No es una aplicación con contraseña ni almacenamiento remoto privado. Para sincronización entre dispositivos se incorporarán autenticación, Supabase Storage privado y políticas RLS en una futura versión. No cargues información altamente confidencial en un prototipo público sin backend y auditoría apropiados.

## Estructura

```text
index.html             interfaz
styles.css             tema visual y diseño móvil
db.js                  IndexedDB y operaciones transaccionales
app.js                 pantallas, formularios, archivos y backups
manifest.webmanifest  instalación de la app
sw.js                  caché de recursos para apertura sin conexión
icons/                 iconos Android e iOS
README.md              instrucciones
```

## Hitos siguientes

1. Supabase Auth (acceso único privado) + Storage para sincronización móvil/escritorio.
2. Worker Python para analizar fuentes PPTX/PDF.
3. Motor editorial fijo A4, fórmulas vectoriales y generación de PDF.
4. Integración de OpenAI **en el servidor** con presupuesto y validación de contenido.
