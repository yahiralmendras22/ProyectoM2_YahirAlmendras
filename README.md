# 🚀 Backend API - [MiniBlog API]

Esta es una API REST desarrollada con Node.js y Express.js, utilizando PostgreSQL como base de datos relacional. La API está completamente documentada de forma interactiva con Swagger UI y se encuentra desplegada en producción.

---

## 🛠️ Tecnologías Utilizadas

- **Entorno de ejecución:** Node.js
- **Framework Web:** Express.js
- **Base de Datos:** PostgreSQL
- **Documentación de la API:** Swagger UI
- **Despliegue:** Railway

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

### 4. Ejecutar el servidor
**Modo Desarrollo:**
```bash
npm run dev
```

**Modo Producción:**
```bash
npm start
```
El servidor local correrá normalmente en http://localhost:3000.

---


## Estructura del proyecto

```text
ProyectoM2-YahirAlmendras/
│
├── src/
│   ├── config/
│   │   ├── dbConnect.js
│   │   └── initDb.js
│   │
│   ├── controllers/
│   │   ├── authorsController.js
│   │   ├── postsController.js
│   │
│   ├── middlewares/
│   │   ├── errorHandler.js
│   │   └── validateRequest.js
│   │
│   ├── routes/
│   │   ├── authorsRoutes.js
│   │   ├── postsRoutes.js
│   │
│   ├── services/
│   │   ├── authorsService.js
│   │   ├── postsService.js
│   │
│   ├── sql/
│   │   ├── setup.sql
│   │   └── seed.sql
│   │
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

El proyecto se encuentra alojado y desplegado de manera continua.

- **URL Base de la API:** https://proyectom2yahiralmendras-production.up.railway.app/api-docs/

---

## ✒️ Autor

- **Yahir Almendras** - GitHub: yahiralmendras22