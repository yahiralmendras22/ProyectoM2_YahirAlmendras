const authorsService = require('../services/authorsServices.js');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidId(id) {
    return Number.isInteger(Number(id)) && Number(id) > 0;
}

function validateAuthorInput(name, email) {
    const trimmedName = typeof name === 'string' ? name.trim() : '';
    const trimmedEmail = typeof email === 'string' ? email.trim() : '';

    if (!trimmedName) {
        return { error: 'El nombre es necesario' };
    }

    if (!trimmedEmail) {
        return { error: 'El email es necesario' };
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
        return { error: 'El email no tiene un formato válido' };
    }

    return { name: trimmedName, email: trimmedEmail };
}

async function getAuthors(req, res) {
    try {
        const authors = await authorsService.getAllAuthors();

        res.status(200).json(authors);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

async function getAuthor(req, res) {
    try {
        const { id } = req.params;

        if (!isValidId(id)) {
            return res.status(400).json({
                message: 'ID inválido'
            });
        }

        const author = await authorsService.getAuthorById(id);

        if (!author) {
            return res.status(404).json({
                message: 'Author no encontrado'
            });
        }

        res.status(200).json(author);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

async function createAuthor(req, res) {
    try {
        const { name, email, bio } = req.body;

        const validation = validateAuthorInput(name, email);

        if (validation.error) {
            return res.status(400).json({
                message: validation.error
            });
        }

        const author = await authorsService.createAuthor(
            validation.name,
            validation.email,
            bio
        );

        res.status(201).json(author);

    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({
                message: 'Este email ya está creado por otro autor'
            });
        }

        console.error(error);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

async function updateAuthor(req, res) {
    try {
        const { id } = req.params;
        const { name, email, bio } = req.body;

        if (!isValidId(id)) {
            return res.status(400).json({
                message: 'ID inválido'
            });
        }

        const validation = validateAuthorInput(name, email);

        if (validation.error) {
            return res.status(400).json({
                message: validation.error
            });
        }

        const author = await authorsService.updateAuthor(
            id,
            validation.name,
            validation.email,
            bio
        );

        if (!author) {
            return res.status(404).json({
                message: 'Author no encontrado'
            });
        }

        res.status(200).json(author);

    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({
                message: 'Este email ya está creado por otro author'
            });
        }

        console.error(error);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

async function deleteAuthor(req, res) {
    try {
        const { id } = req.params;

        if (!isValidId(id)) {
            return res.status(400).json({
                message: 'ID inválido'
            });
        }

        const author = await authorsService.deleteAuthor(id);

        if (!author) {
            return res.status(404).json({
                message: 'Author no encontrado'
            });
        }

        res.status(200).json({
            message: 'Author eliminado correctamente'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

module.exports = {
    getAuthors,
    getAuthor,
    createAuthor,
    updateAuthor,
    deleteAuthor
};