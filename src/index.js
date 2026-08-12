const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();

// Swagger
const swaggerDocument = YAML.load('./docs/openapi.yaml');

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

// Middleware para entender JSON
app.use(express.json());

// Ruta de salud
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'API funcionando correctamente'
    });
});

// Rutas
const authorsRouter = require('./routes/authorsRoutes');
const postsRouter = require('./routes/postsRoutes');

// Enlaces de las rutas
app.use('/authors', authorsRouter);
app.use('/posts', postsRouter);

// Middleware de manejo de errores
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

module.exports = app;