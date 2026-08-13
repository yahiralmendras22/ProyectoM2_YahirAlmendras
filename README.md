# 🚀 Backend API - [MiniBlog API]

Esta es una API REST desarrollada con Node.js y Express.js, utilizando PostgreSQL como base de datos relacional. La API está completamente documentada de forma interactiva con Swagger UI y se encuentra desplegada en producción.

---

## 🛠️ Tecnologías Utilizadas

- **Entorno de ejecución:** Node.js
- **Framework Web:** Express.js
- **Base de Datos:** PostgreSQL
- **Testing:** Jest y Supertest
- **Driver de Conexión:** `pg` (Pool con soporte nativo de SSL y manejo de eventos)
- **Documentación de la API:** Swagger UI
- **Despliegue:** Railway

---
## Modelo de datos

**authors**: `id`, `name` (requerido), `email` (requerido, único), `bio`, `created_at`
**posts**: `id`, `author_id` (FK → authors.id), `title` (requerido), `content` (requerido), `published`, `created_at`

## Endpoints

### Authors
- `GET /authors` - Listar todos los autores
- `GET /authors/:id` - Obtener un autor específico
- `POST /authors` - Crear un nuevo autor
- `PUT /authors/:id` - Actualizar un autor existente
- `DELETE /authors/:id` - Eliminar un autor

### Posts
- `GET /posts` - Listar todos los posts
- `GET /posts/:id` - Obtener un post específico
- `GET /posts/author/:authorId` - Obtener posts de un autor (con detalle del autor)
- `POST /posts` - Crear un nuevo post
- `PUT /posts/:id` - Actualizar un post existente
- `DELETE /posts/:id` - Eliminar un post

### health
- `GET /health` - Para verifica

---

## ⚙️ Configuración e Instalación Local

Sigue estos pasos para clonar el repositorio y levantar el servidor en tu entorno de desarrollo local:

### 1. Clonar el repositorio
```bash
git clone https://github.com/yahiralmendras22/ProyectoM2_YahirAlmendras
cd ProyectoM2_YahirAlmendras
```

### 2. Instalar dependencias
Instala los paquetes necesarios de npm:
```bash
npm install
```

### 3. Configurar Variables de Entorno
Crea un archivo `.env` en la raíz de tu proyecto para gestionar de forma segura tus credenciales locales:

```env
PORT=3000

# Configuración de PostgreSQL local
DB_USER=tu_usuario_postgres
DB_PASSWORD=tu_contraseña_postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nombre_de_tu_base_de_datos

# En producción, Railway provee una única URL:
# DATABASE_URL=postgres://user:password@host:port/dbname
```

### 4. Inicializar la Base de Datos Local
Antes de correr el servidor, abre tu herramienta de administración de base de datos (ej. **pgAdmin 4**), entra al *Query Tool* de tu BD local y ejecuta:
1. El contenido de `src/sql/setup.sql` para construir las tablas de autores y publicaciones.
2. El contenido de `src/sql/seed.sql` para insertar los datos semilla iniciales.

### 5. Ejecutar el servidor

**Modo Desarrollo (con recarga automática):**
```bash
npm run dev
```

**Modo Producción:**
```bash
npm start
```
El servidor local correrá normalmente en `http://localhost:3000`.

---

## 🧪 Testing
 
Para ejecutar la suite de tests (Jest + Supertest):
 
```bash
npm test
```
 
---
 
## 📖 Documentación OpenAPI en local
 
Con el servidor local corriendo (`npm run dev` o `npm start`), la documentación interactiva de Swagger UI está disponible en:
 
```
http://localhost:3000/api-docs
```
 
Desde ahí también podés cambiar el servidor activo (local o producción) usando el selector **Servers** en la parte superior de la página.
 
---

## 📂 Estructura del proyecto

```text
ProyectoM2-YahirAlmendras/
│
├── docs/
│   └── openapi.yaml          
│
├── src/
│   ├── config/
│   │   ├── dbConnect.js      
│   │   └── initDb.js          
│   │
│   ├── controllers/
│   │   ├── authorsController.js 
│   │   └── postsController.js  
│   │
│   ├── middlewares/
│   │   ├── errorHandler.js    
│   │   └── validateRequest.js 
│   │
│   ├── routes/
│   │   ├── authorsRoutes.js   
│   │   └── postsRoutes.js     
│   │
│   ├── services/
│   │   ├── authorsService.js 
│   │   └── postsService.js    
│   ├── sql/
│   │   ├── setup.sql        
│   │   └── seed.sql         
│   └── index.js             
│
├── .env                      
├── .env.example              
├── .gitignore                 
├── package.json              
├── package-lock.json           
├── README.md                 
└── server.js                  
```

### Descripción de carpetas y archivos

#### docs
- `openapi.yaml`: Plano arquitectónico y especificación estandarizada de OpenAPI. Define las rutas, parámetros y respuestas requeridas para estructurar la interfaz interactiva de Swagger UI.

#### src/config
- `dbConnect.js`: Configuración y conexión a PostgreSQL.
- `initDb.js`: Inicialización de la base de datos.

#### src/controllers
Gestionan las solicitudes HTTP y las respuestas de la API.

#### src/middlewares
Contienen validaciones y manejo centralizado de errores.

#### src/routes
Definen los endpoints de la API.

#### src/services
Implementan la lógica de negocio y las consultas a la base de datos.

#### src/sql
- `setup.sql`: Creación de tablas y relaciones.
- `seed.sql`: Datos iniciales de prueba.

### src/index 
- `index.js`: Configura de forma integral el esqueleto de la aplicación Express, integrando los traductores JSON, enrutadores de recursos, documentación Swagger y el middleware de errores global.

#### Archivos raíz
- `.env`: Variables de entorno locales.
- `.env.example`: Ejemplo de configuración requerida.
- `.gitignore`: Archivos y carpetas ignorados por Git.
- `package.json`: Dependencias y scripts del proyecto.
- `package-lock.json`: Versiones exactas de dependencias instaladas.
- `README.md`: Documentación del proyecto.
- `server.js`: Punto de entrada para iniciar el servidor.

---

## 🚀 Despliegue en Producción
 
El proyecto está desplegado en Railway con despliegue continuo: cada push a la rama principal del repositorio dispara un nuevo build y deploy automáticamente.
 
### Variables de entorno necesarias en Railway
 
```env
DATABASE_URL=postgres://usuario:contraseña@host:puerto/nombre_bd
PORT=8080
```
 
Railway provee `DATABASE_URL` automáticamente al conectar un servicio de Postgres al proyecto, junto con dos formas de acceso a la base:
 
- **URL interna** (`postgres.railway.internal`): usada para la comunicación entre servicios dentro de la misma red privada de Railway. Más rápida, pero solo accesible desde otros servicios del mismo proyecto.
- **URL pública** (mediante el TCP Proxy, con host tipo `*.proxy.rlwy.net` y un puerto distinto al 5432): usada para conectarse a la base desde fuera de Railway (por ejemplo, desde tu máquina local con pgAdmin o `psql`).
### URLs de producción
 
- **URL Base de la API:** https://proyectom2yahiralmendras-production.up.railway.app
- **Documentación interactiva (Swagger UI):** https://proyectom2yahiralmendras-production.up.railway.app/api-docs/
---
 
## 🤖 Uso de AI (Artificial Intelligence)

Durante el desarrollo trabaje con Clauda AI y ChatGPT como herramienta en estas cosas:

- Ordenamiento en la arquitectura y diseño de la base datos.
- Generar la documentacion OpenApi.
- Analizar y corregir errores de codigo.
- Ayuda en resolver inconvenientes con el deployment en Railway.
- Ayuda con la creación de jest y supertest.

👉 [Ver Carpeta de Documentación Captura de AI](./documentación)

---

## ✒️ Autor

- **Yahir Almendras** - GitHub: yahiralmendras22