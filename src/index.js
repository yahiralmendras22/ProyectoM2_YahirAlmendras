const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'MiniBlog API funcionando'
    });
});

const authorsRoutes = require('./src/routes/authorsRoutes');

app.use('/authors', authorsRoutes);

module.exports = app;