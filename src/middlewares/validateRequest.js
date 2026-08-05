const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateAuthorId(req, res, next) {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        return res.status(400).json({
            message: 'ID inválido'
        });
    }

    next();
}

function validateAuthorData(req, res, next) {
    const { name, email } = req.body;

    const trimmedName = typeof name === 'string'
        ? name.trim()
        : '';

    const trimmedEmail = typeof email === 'string'
        ? email.trim()
        : '';

    if (!trimmedName) {
        return res.status(400).json({
            message: 'El nombre es necesario'
        });
    }

    if (!trimmedEmail) {
        return res.status(400).json({
            message: 'El email es necesario'
        });
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
        return res.status(400).json({
            message: 'El email no tiene un formato válido'
        });
    }

    req.body.name = trimmedName;
    req.body.email = trimmedEmail;

    next();
}

module.exports = {
    validateAuthorId,
    validateAuthorData
};