# Manual de instalación y entrega a desarrollo

## 1. Requisitos

Git, npm y Node.js compatible con Vite 7: 20.19+ o 22.12+. Para alinear el equipo, se propone Node 22 con un parche compatible actualizado. El desarrollo inicial se verificó con Node 25.8.1 y npm 10.9.2; no confundir esa máquina de autoría con un requisito obligatorio. No se requiere base de datos ni archivo `.env` para esta versión.

## 2. Obtener e instalar

Clonar la URL real que aparezca en el botón Code del repositorio y entrar en su carpeta. Si ya se dispone de la carpeta entregada, abrir una terminal en ella. Ejecutar:

```sh
node --version
npm --version
npm ci
npm run dev
```

`npm ci` instala exactamente el lockfile y falla si no coincide con package.json. El servidor se limita a 127.0.0.1 y normalmente abre el puerto 5173; consultar la salida por si está ocupado. Usar el navegador en esa dirección. Detener con Ctrl+C.

## 3. Comprobar

```sh
npm run build
npm run preview
```

`build` ejecuta TypeScript estricto y genera recursos estáticos con Vite. `preview` sirve el resultado para revisión local; no es servidor de producción. Revisar Home, una landing, URL directa recargada, página inexistente, formulario de prueba, menú móvil, FAQ y las tres pestañas del portal. No introducir información personal o expedientes reales.

## 4. Flujo del equipo

Crear una rama descriptiva por tarea. Actualizar código y manual relevante juntos. Crear PR con capturas si cambia la interfaz. Un revisor comprueba funcionalidad, accesibilidad, contenido y criterios del tablero. La aprobación de contenido jurídico corresponde al despacho. No añadir dependencias para efectos pequeños que puedan resolverse con CSS.

## 5. Despliegue futuro

El proveedor y dominio están pendientes de definición. Configuración común: instalación `npm ci`, compilación `npm run build`, directorio publicado `dist`, Node compatible. Configurar fallback de rutas de la SPA a `index.html` para que al abrir directamente `/ciudades/houston` no aparezca un 404 del alojamiento. Excluir de ese fallback las rutas de API y archivos inexistentes. Para SEO completo valorar prerender/SSR y 404 HTTP reales.

Separar desarrollo, staging y producción; el staging debe quedar restringido o no indexable. Activar TLS, dominio canónico, redirecciones, encabezados de seguridad y rollback a una versión anterior. Publicar sólo el artefacto de producción; nunca servir la raíz del repositorio, `.git`, `.env` ni el servidor de Vite de desarrollo. La publicación se ejecutará como tarea separada una vez confirmados proveedor, dominio y contenido.

## 6. Configuración e integraciones

La versión actual no consume variables de entorno. Cuando se implemente API, agregar un `.env.example` con nombres y valores públicos de ejemplo. Todo `VITE_*` llega al navegador: no guardar claves de correo, WhatsApp, CRM ni tokens allí. Los secretos viven en el gestor del backend o alojamiento y se inyectan en el servidor, no durante la compilación cliente.

## 7. Diagnóstico

| Síntoma | Revisar |
|---|---|
| npm ci falla por versiones | Node/npm y coincidencia package-lock/package.json |
| Puerto ocupado | Dirección alternativa mostrada por Vite o detener el servidor anterior |
| Ruta funciona navegando pero falla al recargar | Fallback SPA en alojamiento |
| Logo no aparece | Archivos de public/images/logos y raíz de publicación |
| Formulario no envía | Comportamiento esperado de la demo |
| Mi Expediente no pide acceso | Demo pública; no cargar información real |
| Página antigua | Caché del navegador/CDN y artefacto desplegado |

## 8. Entrega de una versión

Anotar commit desplegado, fecha, responsable, variables públicas, estado de integraciones y procedimiento de reversión. Mantener secretos fuera del registro. Medir con contenido real: legibilidad, contraste, navegación con teclado, red lenta y dispositivos móviles. Probar respaldo/restauración cuando exista almacenamiento.
