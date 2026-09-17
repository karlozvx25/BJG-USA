# Integraciones y campaña de marketing

## Objetivo y orden

Construir primero contacto confiable, después atribución y finalmente adquisición. No activar campañas hacia un formulario demo. El presupuesto, cuentas, dominios, números, proveedor de CRM y responsables todavía deben confirmarse. Este manual describe implementación futura; no se han creado campañas ni enviado mensajes.

## 1. Identidad digital y redes sociales

Confirmar URLs oficiales de Facebook, Instagram, LinkedIn y otros canales elegidos; no inferir usuarios. Añadir enlaces accesibles al footer con nombres claros. Preparar imagen Open Graph de marca y metadatos propios por landing, URL canónica y favicon aprobado. Verificar que la vista previa no recorte el búho ni incluya información de clientes.

Los enlaces simples no requieren SDK. Si se integra publicación o mensajes, conectar cuentas empresariales con permisos mínimos mediante OAuth y guardar tokens sólo en servidor. Probar con activos de prueba; documentar revocación y renovación. No activar píxeles por el solo hecho de incluir enlaces sociales.

## 2. Correo de atención

Confirmar dominio y buzón del equipo; configurar SPF, DKIM y DMARC con el proveedor elegido. Una API de backend recibe el formulario, crea el lead y encola notificación; el navegador nunca posee credenciales SMTP/API. Separar correo transaccional de suscripción comercial.

Usar remitente del dominio verificado y Reply-To validado, no inyectar libremente cabeceras desde el usuario. Notificar un identificador y enlace seguro al CRM, sin copiar la narración jurídica completa. Procesar rebotes, entregas, reintentos e idempotencia. No mostrar «enviado» cuando sólo se hizo clic. Definir responsable, horario y plazo real de respuesta antes de prometerlos.

## 3. WhatsApp

Etapa inicial: confirmar número empresarial en formato internacional y publicar enlace wa.me con mensaje genérico, sin detalles jurídicos ni PII en la URL. El clic abre una conversación; no prueba envío ni recepción y no debe contabilizarse como lead recibido.

Etapa operativa: evaluar WhatsApp Business Platform/Cloud API o proveedor autorizado. Configurar cuenta y número, permisos, tokens en backend, webhooks HTTPS, verificación de firma, deduplicación y cola de entrega. Registrar autorización de contacto y revisar reglas vigentes de plantillas y ventanas de conversación antes de envíos proactivos. No incluir expedientes en campañas o recordatorios.

Referencia de implementación a validar al integrar: https://developers.facebook.com/docs/whatsapp/cloud-api/overview

## 4. CRM

Definir etapas: nuevo → contactado → calificado → consulta → propuesta → contratación → cierre. Mapear nombre, canal, ciudad, categoría, consentimiento y origen autorizado. Separar el expediente jurídico del registro de marketing. Definir responsable de cada lead y alertas por falta de atención.

La API debe generar ID estable y deduplicar reintentos. Guardar webhooks procesados, reintentos con backoff y fallos para revisión. La descripción jurídica no se envía a herramientas publicitarias ni se coloca en parámetros URL. El CRM es fuente de verdad para calificación y resultado, no el botón del sitio.

## 5. Medición

Elegir plataforma con el equipo. Propuesta de eventos sin PII: view_service, intake_start, intake_step, intake_accepted, whatsapp_click y consultation_booked. intake_accepted requiere aceptación real del backend. appointment/contratación se reportan sólo desde estados comprobados. Aplicar deduplicación entre browser y servidor cuando corresponda.

Definir utm_source, utm_medium, utm_campaign, utm_content con nomenclatura consistente por ciudad y servicio; nunca incluir nombre, correo, diagnóstico o expediente. Conservar origen sólo con política de datos aprobada. Controlar etiquetas según consentimiento aplicable, evitar duplicación y revisar solicitudes de red.

GA4/Tag Manager, Google Ads y Meta Pixel/Conversions API son opciones de implementación, no dependencias actuales. Configurar cuentas, propiedad, dominio y permisos antes de activar etiquetas. La conversión servidor no exime consentimiento ni permite transmitir datos jurídicos. Documentación: https://developers.google.com/tag-platform/gtagjs y https://developers.facebook.com/docs/marketing-api/conversions-api/

## 6. Lanzamiento por ciudad y servicio

Comenzar con una ciudad y un servicio de capacidad confirmada. Alinear anuncio, landing, canal, equipo y seguimiento. Definir objetivo y presupuesto autorizado antes de publicar. Revisar políticas vigentes de la plataforma para servicios legales, segmentación y datos antes de lanzar; la redacción final corresponde al despacho.

Preparar fotografías autorizadas, mensajes consistentes y guías revisadas. Evitar promesas de resultados, presencia física inexistente y personalización basada en situaciones sensibles. Validar experiencia móvil, velocidad, envío, respuesta y atribución con leads ficticios identificados.

## 7. Criterios para invertir y escalar

Go/no-go: formulario operativo, responsable asignado, consentimiento/avisos, analítica comprobada, landings revisadas, presupuesto y piezas aprobadas. Seguir tasa de contacto recibido, porcentaje calificado, tiempo de respuesta, costo por lead calificado, consultas y contrataciones. No hay objetivos numéricos fijados sin línea base.

Revisar por cohorte ciudad/servicio/canal. Probar una variable por experimento (copy, orden, CTA), registrar hipótesis y periodo. Escalar sólo si la operación puede atender más demanda. Mantener opciones de desactivar etiquetas, pausar anuncios y revertir una landing sin afectar el portal.
