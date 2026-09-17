# Arquitectura y evolución

Vite + React + TypeScript estricto + Tailwind CSS 4 + React Router. Componentes reutilizables: CTA, Heading, Brand, Art, Hero, ServiceCards, Process, Dashboard, Contact, Header y Footer. Datos compartidos en content.ts. Las vistas Landing utilizan parámetros validados contra catálogos; rutas desconocidas muestran 404.

La Home sigue el orden acordado: hero → proof bar → problemas → tensión emocional → proceso → portal → equipo → trabajo colegiado → testimonios → autoridad → legado → guía → FAQ → CTA/formulario → footer.

El formulario mantiene campos en memoria de la página y valida sólo el paso activo. No hay almacenamiento, peticiones ni afirmaciones falsas de envío. Las pestañas del portal cambian contenido ilustrativo; no ofrecen descargas ficticias.

Próximas etapas: separar páginas/componentes a medida que crezcan; CMS con contenido por idioma y región; API de intake; portal privado independiente con control de acceso y auditoría. Prerender/SSR para landings SEO. Publicación sujeta a contenido y canales operativos confirmados.

## Revisiones antes de publicar

Incorporar identidad final, fotografías y perfiles aprobados; corroborar 1979; obtener testimonios autorizados y resultados documentados; reemplazar guías por contenido revisado; conectar formulario; publicar avisos definitivos y canal de contacto; realizar auditoría de accesibilidad y SEO con contenido definitivo.
