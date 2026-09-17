# Decisiones técnicas y límites

| Decisión | Motivo | Límite y evolución |
|---|---|---|
| Vite 7 | Arranque rápido y build estático simple | La SPA requiere fallback; SEO territorial podrá necesitar prerender/SSR |
| React 19 | Componentes y estados de interfaz reutilizables | No sustituye API, autorización ni backend |
| TypeScript estricto | Detectar inconsistencias antes del build | Tipos no validan entradas externas en tiempo de ejecución |
| Tailwind 4 + CSS | Tokens compartidos y control editorial | Predomina CSS propio; consolidar estilos al crecer |
| React Router | Reutilizar rutas ciudad/servicio | El 404 actual es visual del cliente, no necesariamente HTTP |
| Catálogos en content.ts | Evitar duplicación inicial | Migrar a CMS tipado cuando haya autores y versiones |
| App.tsx con componentes | Primera entrega autocontenida y revisable | Separar pages/components/features antes de ampliar portal e integraciones |
| Fontsource | Fuentes locales sin petición a Google Fonts | Limitar subconjuntos/pesos si se optimiza tamaño |
| Lucide | Iconos consistentes con texto | Revisar nombres accesibles e iconos decorativos |
| CSS para efectos | Menor coste para interacciones sencillas | Añadir librerías sólo si hay una necesidad concreta |
| Formulario en memoria | Revisar flujo sin procesar datos personales | No es intake de producción; requiere API y validación servidor |
| Dashboard demo | Probar narrativa de transparencia | No incluye autenticación ni archivos reales |
| PNG originales | Preservar material de marca recibido | Solicitar SVG y optimizar derivados conservando originales |

## Organización actual

main.tsx configura BrowserRouter y carga estilos/fuentes. App.tsx contiene layout, páginas y componentes. content.ts centraliza servicios, ciudades, preguntas y textos. styles.css define composición, breakpoints y reduced-motion. La UI está adaptada a móvil; la hoja actual utiliza reglas base y overrides, no un sistema exclusivamente min-width.

La plantilla Landing valida slugs contra los catálogos. Crear una ciudad añade una ruta funcional, pero no genera automáticamente investigación, contenido original ni metadatos SEO. Las guías actuales son placeholders editoriales y no deben venderse como artículos terminados.

## Estados y accesibilidad

Menú móvil con aria-expanded, enlace para saltar a contenido, etiquetas y fieldsets en formulario, progress, FAQ nativa y pestañas con roles/teclado. El formulario conserva campos montados y activa requisitos por paso. La finalización indica que no hay envío. Auditar con lector de pantalla y contenido final; revisar tamaño de etiquetas auxiliares, contraste, foco al navegar y objetivos táctiles. No afirmar conformidad WCAG certificada.

## Contrato propuesto de intake (no implementado)

El cliente enviará JSON validado a una API propia por HTTPS. El servidor debe validar longitud, campos permitidos y antispam, generar un identificador idempotente, persistir el lead con acceso limitado y encolar notificaciones. Mostrar confirmación sólo tras aceptación real; ante error conservar entrada en memoria y permitir reintento sin duplicar leads. Separar datos de marketing de documentos jurídicos.

## Entornos, entrega y calidad

Lockfile para instalaciones reproducibles. Ramas y PR para cambios. La compilación actual valida TypeScript y empaquetado; no demuestra seguridad ni sustituye pruebas funcionales. Añadir pruebas de integración cuando se conecten API y autenticación, especialmente accesos entre usuarios y errores de envío. Medir rendimiento con fotografías finales y rastreadores activados bajo consentimiento.

Despliegue previsto como artefacto estático dist con CDN/TLS y rutas configuradas; el proveedor no está decidido. El portal real puede evolucionar como aplicación separada con API y almacenamiento privados. No mezclar administración del despacho con el bundle público.
