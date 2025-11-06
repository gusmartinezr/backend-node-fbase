# Backend Node.js con Firebase

Una API backend de Node.js construida con TypeScript, Express y Firebase Firestore, siguiendo principios de arquitectura limpia. Este proyecto proporciona endpoints RESTful para gestionar usuarios y tareas.

## Características

- **Gestión de Usuarios**: Crear usuarios y buscar usuarios por email
- **Gestión de Tareas**: Operaciones CRUD completas para tareas (Crear, Leer, Actualizar, Eliminar)
- **Arquitectura Limpia**: Organizado en capas de dominio, aplicación, datos y presentación
- **Validación**: Validación de solicitudes usando esquemas Zod
- **Integración con Firebase**: Usa Firestore como base de datos
- **TypeScript**: Soporte completo de TypeScript para seguridad de tipos
- **Manejo de Errores**: Middleware centralizado para manejo de errores

## Tecnologías Utilizadas

- **Entorno de Ejecución**: Node.js
- **Lenguaje**: TypeScript
- **Framework**: Express.js
- **Base de Datos**: Firebase Firestore
- **Validación**: Zod
- **Entorno**: dotenv con env-var

## Estructura del Proyecto

```
src/
├── domain/           # Lógica de negocio y entidades
├── application/      # Casos de uso y servicios
├── data/            # Capa de acceso a datos (repositorios, Firebase)
├── presentation/    # Controladores, rutas, middlewares
└── config/          # Archivos de configuración
```

## Endpoints de la API

### Verificación de Salud
- `GET /health` - Endpoint de verificación de salud

### Usuarios
- `GET /api/users?email={email}` - Buscar usuario por email
- `POST /api/users` - Crear un nuevo usuario

### Tareas
- `GET /api/tasks?userId={userId}` - Listar tareas de un usuario
- `POST /api/tasks` - Crear una nueva tarea
- `PUT /api/tasks/{id}` - Actualizar una tarea
- `DELETE /api/tasks/{id}` - Eliminar una tarea

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd backend-nodejs-fbase
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   - Crea un archivo `.env` en el directorio raíz con el siguiente contenido:

   ```env
   PORT=
   JWT_SECRET=
   FIREBASE_SERVICE_ACCOUNT_PATH=file.json
   FRONTEND_URL=
   ```

4. Configura Firebase:
   - Ve a la consola de Firebase (https://console.firebase.google.com/)
   - Crea un proyecto o selecciona uno existente
   - Ve a Configuración del proyecto > Cuentas de servicio
   - Genera una nueva clave privada y descarga el archivo JSON
   - Renombra el archivo descargado a `serviceAccountKey.json` y colócalo en el directorio raíz del proyecto
   - Habilita Firestore en tu proyecto Firebase

5. Construye el proyecto:
   ```bash
   npm run build
   ```

## Uso

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm run build
npm start
```

El servidor se iniciará en el puerto especificado en tus variables de entorno (por defecto: 5001).

## Variables de Entorno

Crea un archivo `.env` en el directorio raíz con las siguientes variables:

```
PORT=
JWT_SECRET=
FIREBASE_SERVICE_ACCOUNT_PATH=
FRONTEND_URL=
```

## Configuración de Firebase

1. Crea un proyecto en Firebase
2. Habilita Firestore
3. Genera una clave de cuenta de servicio y guárdala como `serviceAccountKey.json` en el directorio raíz
4. Configura las reglas de seguridad de Firestore según sea necesario

## Scripts

- `npm run dev` - Iniciar servidor de desarrollo con recarga automática
- `npm run build` - Construir el proyecto para producción
- `npm start` - Iniciar el servidor de producción

## Licencia

MIT
