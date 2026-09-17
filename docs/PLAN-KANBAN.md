# Plan Kanban — BJG USA

## Organización del tablero

Columnas de estado: **Backlog → Listo → En curso → En revisión → Hecho**; usar **Bloqueado** cuando falta un insumo o decisión. Las fases son un campo separado, no columnas de estado: una tarea de seguridad puede estar bloqueada mientras avanza contenido.

Fases: F1 Contenido; F2 Experiencia; F3 Seguridad; F4 Canales; F5 Marketing; F6 Lanzamiento. Priorizar seguridad e intake antes de captación real. Limitar En curso a la capacidad efectiva del equipo. Cada tarjeta debe tener responsable, fase, dependencia, resultado esperado y evidencia de aceptación. No asignar fechas ni personas sin acuerdo.

## Definición de Hecho

Código revisado, build correcto, criterios de aceptación comprobados, documentación actualizada, revisión móvil/accesibilidad cuando aplica y responsable que valida. Una integración demo no cuenta como producción. Una campaña preparada no cuenta como publicada.

## Tareas

### F1 · Validar contenido e identidad

- Fase: F1 Contenido
- Estado inicial: Backlog
- Alcance: Confirmar fecha 1979, servicios, cobertura por ciudad, credenciales, responsables y avisos.
- Aceptación: Contenido aprobado por el despacho; no quedan cifras ni ubicaciones sin respaldo.
- Dependencias: Ninguna

### F1 · Incorporar fotografías y testimonios reales

- Fase: F1 Contenido
- Estado inicial: Backlog
- Alcance: Recibir fotos del equipo, oficina, archivo histórico y testimonios autorizados. Sustituir placeholders; generar tamaños web y textos alternativos.
- Aceptación: Permisos de uso registrados; imágenes responsive sin deformación; testimonios con subtítulos y datos aprobados.
- Dependencias: Validar contenido e identidad

### F2 · Afinar efectos y microinteracciones

- Fase: F2 Experiencia
- Estado inicial: Backlog
- Alcance: Implementar entradas sobrias de secciones y estados del proceso, revisar hover, foco, header y Connection Line.
- Aceptación: Reduced-motion respetado; contenido visible sin animación; ninguna interacción bloquea lectura o formulario.
- Dependencias: Validar contenido e identidad

### F2 · Animaciones, video y rendimiento móvil

- Fase: F2 Experiencia
- Estado inicial: Backlog
- Alcance: Integrar video subtitulado, lazy loading, dimensiones estables, imágenes WebP/AVIF y presupuesto de rendimiento.
- Aceptación: Sin reproducción sonora automática; controles accesibles; revisar LCP, CLS e INP con contenido real y red lenta.
- Dependencias: Fotografías y testimonios

### F2 · Auditoría de accesibilidad y navegación

- Fase: F2 Experiencia
- Estado inicial: Backlog
- Alcance: Revisar contraste, tipografía auxiliar, teclado, lector de pantalla, foco, errores y rutas móviles.
- Aceptación: Recorrido completo sin ratón; formularios anuncian errores; controles táctiles legibles; evidencia en PR.
- Dependencias: Efectos y fotografías

### F3 · Proteger repositorio, secretos y entrega

- Fase: F3 Seguridad
- Estado inicial: Backlog
- Alcance: Revisar visibilidad con titular; configurar acceso mínimo, MFA, revisión por PR, escaneo de secretos y build CI. No intentar ocultar JS del navegador.
- Aceptación: No secretos en fuente/bundle; sólo dist se publica; reglas y responsable documentados; no .git/.env en alojamiento.
- Dependencias: Ninguna

### F3 · API segura para recibir casos

- Fase: F3 Seguridad
- Estado inicial: Backlog
- Alcance: Crear endpoint con validación servidor, rate limiting, antispam, idempotencia, registro mínimo y retención.
- Aceptación: Confirmación sólo tras recepción; reintentos sin duplicados; pruebas de entradas inválidas y abuso.
- Dependencias: Avisos aprobados y arquitectura backend

### F3 · Portal privado y seguridad de documentos

- Fase: F3 Seguridad
- Estado inicial: Backlog
- Alcance: Implementar autenticación, autorización por expediente, roles, almacenamiento privado, URLs firmadas, auditoría y recuperación.
- Aceptación: Usuario A no puede leer recursos de B; URLs expiran; pruebas de acceso y restauración aprobadas.
- Dependencias: Arquitectura backend y política de datos

### F4 · Conectar correo del despacho

- Fase: F4 Canales
- Estado inicial: Backlog
- Alcance: Confirmar buzón/dominio, configurar SPF/DKIM/DMARC y servicio de notificación desde backend con reintentos.
- Aceptación: Entrega, rebotes y errores probados; sin credenciales cliente ni narrativa jurídica completa en correo.
- Dependencias: API segura

### F4 · Conectar WhatsApp empresarial

- Fase: F4 Canales
- Estado inicial: Backlog
- Alcance: Confirmar número; enlace de conversación genérico y, si se aprueba, Cloud API con webhooks, firma y cola.
- Aceptación: Clic diferenciado de lead; reglas/consentimientos revisados; secretos servidor; responsable de atención definido.
- Dependencias: Número y proceso de atención confirmados

### F4 · Integrar redes sociales y vistas compartidas

- Fase: F4 Canales
- Estado inicial: Backlog
- Alcance: Confirmar perfiles oficiales e incorporar enlaces, Open Graph, imagen social y metadatos por landing.
- Aceptación: Enlaces reales y accesibles; preview correcto; ningún SDK ni píxel se activa sin decisión de medición.
- Dependencias: Identidad y perfiles oficiales

### F4 · Integrar CRM y seguimiento comercial

- Fase: F4 Canales
- Estado inicial: Backlog
- Alcance: Definir proveedor, etapas, campos, responsables, deduplicación y seguimiento de leads. Separar datos jurídicos de marketing.
- Aceptación: Un lead de prueba recorre el embudo; reintentos controlados; origen y responsable registrados.
- Dependencias: API segura y política de datos

### F5 · Medición, consentimiento y atribución

- Fase: F5 Marketing
- Estado inicial: Backlog
- Alcance: Definir eventos/UTM; integrar analítica y conversiones aprobadas; excluir PII y deduplicar browser/servidor.
- Aceptación: Eventos comprobados en red/debug; intake_accepted sólo tras backend; revocación de consentimiento probada.
- Dependencias: CRM, API y revisión de privacidad

### F5 · SEO y landings por ciudad/servicio

- Fase: F5 Marketing
- Estado inicial: Backlog
- Alcance: Redactar contenido original, guías revisadas, canonical, sitemap, metadata y evaluar prerender/SSR.
- Aceptación: Sin oficinas inventadas; URLs recargan; HTTP/SEO revisado; cada landing tiene contenido y CTA operativo.
- Dependencias: Contenido validado

### F5 · Preparar campaña piloto

- Fase: F5 Marketing
- Estado inicial: Backlog
- Alcance: Elegir ciudad/servicio de capacidad confirmada, piezas, mensajes, presupuesto, cuentas y objetivos de leads calificados.
- Aceptación: Presupuesto y piezas aprobados; prueba extremo a extremo; no se lanza tráfico a demo.
- Dependencias: Canales, medición, SEO y operación listos

### F6 · Lanzamiento, monitorización y mejora

- Fase: F6 Lanzamiento
- Estado inicial: Backlog
- Alcance: Confirmar alojamiento/dominio; staging, TLS, cabeceras, rollback y monitoreo. Evaluar resultados por ciudad/servicio/canal.
- Aceptación: Checklist go/no-go firmado por responsables; versión trazable; rollback probado; revisión de leads y respuesta.
- Dependencias: Seguridad, contenido, integraciones y campaña aprobados

## Importación / continuidad

El archivo kanban-items.json conserva todas las tarjetas para crear o recuperar el tablero sin perder criterios. GitHub Projects requiere acceso adicional al repositorio; las tareas también se registran como issues. La vista debe usar layout Board agrupado por Status, con campo Fase para ordenar el trabajo. Referencia: https://docs.github.com/en/issues/planning-and-tracking-with-projects/customizing-views-in-your-project
