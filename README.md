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
### Descripción de carpetas

- **config/**: Configuración de la base de datos e inicialización.
- **controllers/**: Manejan las solicitudes HTTP y las respuestas.
- **middlewares/**: Validaciones y manejo centralizado de errores.
- **routes/**: Definen los endpoints de la API.
- **services/**: Contienen la lógica de negocio y consultas a la base de datos.
- **sql/**: Scripts SQL para crear y poblar la base de datos.
- **index.js**: Configuración principal de la aplicación Express.
- **server.js**: Punto de entrada para iniciar el servidor.