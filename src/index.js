const express = require('express');
const app = express();

// Middleware para entender JSON
app.use(express.json());

// RUTAS CORREGIDAS (Sin el "./src/")
const authorsRouter = require('./routes/authorsRoutes');
const postsRouter = require('./routes/postsRoutes');

// Enlaces de las rutas
app.use('/authors', authorsRouter);
app.use('/posts', postsRouter);


const errorHandler = require('./middlewares/errorHandler');

app.use(errorHandler);


module.exports = app;