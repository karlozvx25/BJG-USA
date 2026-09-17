# BJG USA — México sigue cerca

Sitio de Bufete Jurídico Guadarrama para mexicanos que viven en Estados Unidos y necesitan atender asuntos jurídicos **en México**. La promesa central es **certeza a distancia**: comprender qué ocurre, quién atiende el asunto y cuál es el siguiente paso.

## Estado de esta entrega

Primera versión funcional del frontend. Incluye la Home completa, seis categorías de problemas, cinco ciudades configurables, combinaciones ciudad/servicio, formulario demo de tres pasos, FAQ, guías editoriales provisionales y Mi Expediente interactivo. Los logos originales del despacho ya están incorporados.

**No hay recepción real de formularios, base de datos, autenticación, pagos, CRM, analítica, integración de correo ni WhatsApp.** La demo no guarda ni envía los datos introducidos. No es un portal seguro para expedientes reales. Fotografías, perfiles, testimonios y resultados permanecen pendientes de aprobación. Las guías son borradores. No se ha desplegado un sitio público.

## Inicio rápido

Con Node compatible instalado, desde la raíz del repositorio:

```sh
npm ci
npm run dev
```

Abrir http://127.0.0.1:5173. Para validar producción:

```sh
npm run build
npm run preview
```

La salida está en `dist/`. La instalación reproducible utiliza `package-lock.json`; no subir `node_modules` ni `dist` al repositorio.

## Manuales para el equipo

| Documento | Contenido |
|---|---|
| [Instalación](docs/INSTALACION.md) | Requisitos, puesta en marcha, build, despliegue y diagnóstico |
| [Objetivo y branding](docs/ESTRATEGIA-Y-BRANDING.md) | Mercado, propuesta, narrativa, decisiones visuales y conversión |
| [Decisiones técnicas](docs/DECISIONES-TECNICAS.md) | Stack, rutas, componentes, límites y evolución |
| [Sistema visual](docs/SISTEMA-VISUAL.md) | Paleta, tipografías y composición |
| [Logos](docs/LOGOS.md) | Procedencia, variantes y tratamiento |
| [Seguridad](docs/SEGURIDAD.md) | Código público del navegador, secretos, API, expedientes y CI |
| [Integraciones](docs/INTEGRACIONES-Y-MARKETING.md) | Redes, correo, WhatsApp, CRM y campañas |
| [Plan Kanban](docs/PLAN-KANBAN.md) | Fases, dependencias y criterios de aceptación |
| [Arquitectura inicial](docs/ARQUITECTURA.md) | Organización actual y evolución |

## Por qué se construyó así

1. **Navegación por problemas:** el visitante reconoce propiedades, herencias, poderes, familia y empresas sin conocer ramas del derecho.
2. **Un CTA principal:** «Cuéntanos tu caso» mantiene un objetivo claro a lo largo de la página.
3. **Proceso visible:** el portal demo y los pasos convierten la promesa de transparencia en una experiencia comprensible.
4. **Prueba honesta:** se reservan espacios para evidencia real; no se inventan personas, testimonios ni cifras.
5. **Escalabilidad territorial:** una plantilla y catálogos permiten contextualizar ciudades y servicios sin duplicar toda la web.
6. **Interfaz editorial:** navy, marfil, serif y espacios amplios equilibran autoridad y cercanía; el burgundy dirige la acción.
7. **Frontend independiente:** permite revisar la experiencia antes de recibir datos jurídicos o conectar servicios con credenciales.

## Mapa técnico

```text
src/
  main.tsx       Arranque, router y fuentes locales
  App.tsx        Componentes reutilizables, páginas y rutas
  content.ts     Servicios, ciudades, FAQ, pasos y guías
  styles.css     Tailwind 4, tokens y estilos responsive
public/images/logos/  Seis originales suministrados por Drive
docs/                 Manuales y plan de evolución
```

Rutas: `/`, `/servicios/:service`, `/ciudades/:city`, `/:city/:service`, `/mi-expediente`, `/guia/:id`, `/legal`. Valores desconocidos muestran una página 404 del cliente. Ejemplo: `/houston/herencias-mexico`. La infraestructura futura debe devolver estados HTTP y metadatos apropiados para SEO.

## Validación y contribuciones

Se verificaron compilación TypeScript/Vite, recorrido del formulario, pestañas del expediente, FAQ, rutas y anchos móviles de 320 y 390 px. Esto no equivale a una auditoría integral de accesibilidad o seguridad. Actualmente no existe suite automatizada de pruebas.

Trabajar mediante ramas y pull requests. Incluir problema, cambio, captura móvil/escritorio cuando proceda y validaciones. Antes de integrar, ejecutar `npm ci` y `npm run build`. No modificar `package-lock.json` manualmente. Revisar dependencias y licencias al actualizarlas.

El repositorio no concede una licencia abierta sobre código, marca, fotografías o contenido. La licencia de distribución deberá acordarse con el titular. No incorporar material de clientes sin autorización.
