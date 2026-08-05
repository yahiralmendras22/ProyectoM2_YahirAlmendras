function errorHandler(error, req, res, next) {
    console.error(error);

    if (error.type === 'entity.parse.failed') {
        return res.status(400).json({
            message: 'El JSON enviado no es válido'
        });
    }

    if (error.code === '23505') {
        return res.status(409).json({
            message: error.userMessage || 'El recurso ya existe'
        });
    }

    res.status(500).json({
        message: 'Error interno del servidor'
    });
}

module.exports = errorHandler;