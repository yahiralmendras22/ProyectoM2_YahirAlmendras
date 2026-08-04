# ProyectoM2_YahirAlmendras

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
│   │   └── commentsController.js
│   │
│   ├── middlewares/
│   │   ├── errorHandler.js
│   │   └── validateRequest.js
│   │
│   ├── routes/
│   │   ├── authorsRoutes.js
│   │   ├── postsRoutes.js
│   │   └── commentsRoutes.js
│   │
│   ├── services/
│   │   ├── authorsService.js
│   │   ├── postsService.js
│   │   └── commentsService.js
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
```