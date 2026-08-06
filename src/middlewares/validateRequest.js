// Validate Request Middleware//

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateIdParam(req, res, next) {
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

function validatePostData(req, res, next) {
    const { title, content, author_id } = req.body;

    const trimmedTitle = typeof title === 'string' ? title.trim() : '';
    const trimmedContent = typeof content === 'string' ? content.trim() : '';

    if (!trimmedTitle) {
        return res.status(400).json({
            message: 'El título es necesario'
        });
    }

    if (!trimmedContent) {
        return res.status(400).json({
            message: 'El contenido es necesario'
        });
    }

    if (!Number.isInteger(Number(author_id)) || Number(author_id) <= 0) {
        return res.status(400).json({
            message: 'El author_id es necesario y debe ser válido'
        });
    }

    req.body.title = trimmedTitle;
    req.body.content = trimmedContent;
    req.body.author_id = Number(author_id);

    next();
}

module.exports = {
    validateIdParam,
    validateAuthorData,
    validatePostData
};