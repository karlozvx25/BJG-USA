# Seguridad: qué proteger y cómo

## El código del navegador es visible

HTML, CSS, JavaScript y recursos entregados al navegador pueden inspeccionarse. Minificar, ofuscar o deshabilitar clic derecho no los convierte en secretos. Un repositorio privado limita acceso al código fuente de trabajo, pero no oculta el JavaScript publicado. Los source maps no son necesarios para que el navegador ejecute la página; evitar publicarlos reduce exposición de estructura original, no constituye autorización.

Las variables VITE_* se incluyen en código cliente. Nunca colocar allí claves privadas, credenciales de proveedor, tokens de administración o claves de cifrado. Referencia: https://vite.dev/guide/env-and-mode

## Estado real

Este frontend no tiene backend ni recibe expedientes. No existe sistema de seguridad del portal implementado. Las siguientes medidas son requisitos para producción y tareas del tablero, no garantías actuales.

## Repositorio y entrega

Mantener privado si el titular quiere restringir el código de trabajo. Acceso mínimo por persona, MFA, revisión por PR y protección de rama según disponibilidad. Excluir .env, node_modules, dist, logs, llaves y documentos de clientes. Secretos en un gestor autorizado, rotables y separados por entorno. Si una clave se filtra, revocarla; borrarla del último commit no la elimina del historial.

CI con permisos mínimos, dependencias auditadas y revisiones de actualizaciones; escaneo de secretos cuando el plan/herramientas lo permitan. Publicar sólo dist, nunca .git ni servidor de desarrollo. Source maps desactivados en producción salvo entrega privada a un servicio de diagnóstico controlado.

## API y formulario

Validar esquema y tamaños en servidor; limitar frecuencia; antispam; idempotencia; errores sin detalles internos. CORS limitado ayuda a navegadores pero no autentica peticiones. CSRF cuando se usan cookies de sesión; escape de contenido para prevenir XSS. Definir retención, eliminación y avisos antes de recepción real.

## Portal privado

Autenticación mantenida por proveedor/servicio adecuado, sesiones seguras y MFA para personal. Cada petición debe verificar usuario, rol y pertenencia al expediente en servidor. Nunca confiar en esconder enlaces ni en un ID difícil de adivinar. Pruebas negativas: un cliente A no puede leer documentos, mensajes ni URLs de B.

Almacenamiento privado con URLs firmadas de corta duración, límites de tipo/tamaño, revisión de archivos y registros de acceso. Cifrado en tránsito y reposo, copias de seguridad y restauración probada. Evitar contenido jurídico en logs, analítica, correos y mensajes de WhatsApp; usar avisos que remitan al portal autenticado.

## Cabeceras y operación

TLS y HSTS después de validar dominio; CSP ajustada a recursos reales, frame-ancestors, nosniff, Referrer-Policy y Permissions-Policy. Probar CSP en staging antes de exigirla, especialmente al integrar marketing. Monitorización de fallos sin datos sensibles, alertas operativas y responsable de incidentes.

## Aceptación de seguridad

- No hay secretos en repositorio ni bundle.
- Acceso a staging y producción documentado.
- Autorización por expediente comprobada con dos usuarios.
- URLs privadas expiran; no se publican listados de documentos.
- Se probaron reintentos, abuso del formulario y restauración.
- Avisos y tratamiento de datos revisados por el despacho.
- El equipo distingue controles implementados de tareas pendientes.

Base para revisión de aplicaciones: https://owasp.org/www-project-application-security-verification-standard/
