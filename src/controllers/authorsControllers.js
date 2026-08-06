//Authors Controllers//

const authorsService = require('../services/authorsServices.js');

async function getAuthors(req, res, next) {
    try {
        const authors = await authorsService.getAllAuthors();
        res.status(200).json(authors);
    } catch (error) {
        next(error);
    }
}

async function getAuthorById(req, res, next) {
    try {
        const { id } = req.params;
        const author = await authorsService.getAuthorById(id);

        if (!author) {
            return res.status(404).json({
                message: 'Autor no encontrado'
            });
        }

        res.status(200).json(author);
    } catch (error) {
        next(error);
    }
}

async function createAuthor(req, res, next) {
    try {
        const { name, email, bio } = req.body;
        const author = await authorsService.createAuthor({ name, email, bio });
        res.status(201).json(author);
    } catch (error) {
        if (error.code === '23505') {
            error.userMessage = 'Este email ya está creado por otro autor';
        }
        next(error);
    }
}

async function updateAuthor(req, res, next) {
    try {
        const { id } = req.params;
        const { name, email, bio } = req.body;
        const author = await authorsService.updateAuthor(id, { name, email, bio });

        if (!author) {
            return res.status(404).json({
                message: 'Autor no encontrado'
            });
        }

        res.status(200).json(author);
    } catch (error) {
        if (error.code === '23505') {
            error.userMessage = 'Este email ya está creado por otro autor';
        }
        next(error);
    }
}

async function deleteAuthor(req, res, next) {
    try {
        const { id } = req.params;
        const author = await authorsService.deleteAuthor(id);

        if (!author) {
            return res.status(404).json({
                message: 'Autor no encontrado'
            });
        }

        res.status(200).json({
            message: 'Autor eliminado correctamente'
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};