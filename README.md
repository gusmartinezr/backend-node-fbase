# Backend Node.js + Firebase Functions

Este proyecto es un backend desarrollado en Node.js con Express y TypeScript, desplegado como funciones serverless en Firebase Functions (2nd Gen / Cloud Run). Utiliza Firestore como base de datos y está preparado para integrarse con un frontend externo.

## Estructura principal

```
functions/
  src/
    app.ts            // Configuración y creación del Express app
    index.ts          // Exporta las funciones para Firebase
    config/
      envs.ts         // Manejo de variables de entorno
      firebase.singleton.ts // Inicialización de Firebase Admin
    data/
      firebase/
      repositories/
    presentation/
      routes/
      ...
  .env                // Variables locales (solo para desarrollo)
  serviceAccountKey.json // Credenciales Firebase (solo local/emulador)
  package.json        // Dependencias y scripts
firebase.json         // Configuración de Firebase
```

## Instalación y desarrollo

1. **Instalar dependencias:**
   ```sh
   cd functions
   yarn install
   ```

2. **Configurar variables de entorno:**
   - Crea un archivo `.env` en `functions/` con:
     ```
     JWT_SECRET=tu_clave_secreta
     FRONTEND_URL=http://localhost:4200,https://tu-frontend.com
     FIREBASE_SERVICE_ACCOUNT_PATH=serviceAccountKey.json # Solo para emulador/local
     ```
   - En producción, configura las variables con:
     ```sh
     firebase functions:config:set env.jwt_secret="tu_clave_secreta" env.frontend_url="http://localhost:4200,https://tu-frontend.com" env.firebase_service_account_path="serviceAccountKey.json"
     ```

3. **Compilar el proyecto:**
   ```sh
   cd functions
   yarn build
   ```

4. **Emular localmente:**
   ```sh
   firebase emulators:start --only functions
   ```

5. **Desplegar a Firebase:**
   ```sh
   firebase deploy --only functions
   ```

## Endpoints principales

- `/__health` : Healthcheck para Cloud Run/Firebase
- `/api/users` : Endpoints para usuarios
  - `GET /api/users/` — Buscar usuario por email
  - `POST /api/users/` — Crear usuario
- `/api/tasks` : Endpoints para tareas
  - `GET /api/tasks/` — Listar tareas
  - `POST /api/tasks/` — Crear tarea
  - `PUT /api/tasks/:id` — Actualizar tarea
  - `DELETE /api/tasks/:id` — Eliminar tarea

- Otros endpoints definidos en `AppRoutes.routes` (por ejemplo, manejo de 404)

## Notas importantes

- No uses `app.listen` en el código, Firebase maneja el puerto automáticamente.
- Las variables reservadas por Firebase no deben estar en `.env` en producción.
- Para hacer pública la función en Cloud Run, otorga el rol `roles/run.invoker` a `allUsers`.

## Troubleshooting

- Si ves errores de healthcheck, revisa los logs en Cloud Run.
- Si ves errores de variables de entorno, revisa la configuración en `.env` y en Firebase.
- Si el endpoint devuelve 403, revisa los permisos en Cloud Run.

## Comentarios de desarrollo

### Decisiones de diseño
- **Arquitectura modular:** El proyecto está organizado en capas (application, domain, data, presentation) siguiendo principios de Clean Architecture y DDD para facilitar la escalabilidad y el mantenimiento.
- **Express + Firebase Functions v2:** Se utiliza Express para la lógica HTTP y Firebase Functions v2 (Cloud Run) para el despliegue serverless, permitiendo mayor flexibilidad y compatibilidad con APIs REST.
- **Healthcheck dedicado:** Se implementa un endpoint `/__health` para facilitar la integración y monitoreo en Cloud Run.
- **Manejo de variables de entorno:** El sistema de configuración permite distinguir entre entorno local, emulador y producción, evitando el uso de variables reservadas y facilitando la portabilidad.
- **TypeScript:** Se emplea TypeScript para tipado estático, mejorando la calidad del código y la detección temprana de errores.

### Tecnologías utilizadas
- **Node.js** y **Express** para la API REST.
- **Firebase Functions v2 (Cloud Run)** para el despliegue serverless.
- **TypeScript** para el desarrollo principal.
- **Yarn** como gestor de dependencias.
- **Firebase Admin SDK** para interacción con Firestore y autenticación.
- **ESLint** para control de calidad y estilo de código.

### Comentarios relevantes
- El proyecto está preparado para funcionar tanto en local (usando emulador) como en producción en Firebase.
- Se recomienda mantener las variables sensibles fuera del repositorio y gestionarlas mediante el sistema de configuración de Firebase.
- El uso de extensiones `.js` explícitas en imports dinámicos es necesario para compatibilidad con Node16.
- El endpoint `/__health` es fundamental para el correcto funcionamiento en Cloud Run y debe mantenerse.
- La estructura modular permite agregar nuevas funcionalidades (usuarios, tareas, etc.) sin afectar el núcleo del sistema.

---
Para dudas o mejoras, contactar al autor o revisar la documentación oficial de Firebase Functions y Express.

## Licencia

Este proyecto no tiene licencia definida.
