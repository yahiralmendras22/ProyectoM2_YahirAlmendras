const express = require('express');
const app = express();

// Middleware para entender JSON
app.use(express.json());

// RUTAS CORREGIDAS (Sin el "./src/")
const authorsRouter = require('./routes/authorsRoutes');

// Enlaces de las rutas
app.use('/authors', authorsRouter);


const errorHandler = require('./middlewares/errorHandler');

app.use(errorHandler);


module.exports = app;