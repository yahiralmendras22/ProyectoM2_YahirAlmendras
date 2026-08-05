const authorsService = require('../services/authorsServices.js');

async function getAuthors(req, res) {
    try {
        const authors = await authorsService.getAllAuthors();

        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function getAuthor(req, res) {
    try {
        const author = await authorsService.getAuthorById(
            req.params.id
        );

        if (!author) {
            return res.status(404).json({
                message: 'Autor no encontrado'
            });
        }

        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function createAuthor(req, res) {
    try {
        const { name, email, bio } = req.body;

        const author = await authorsService.createAuthor(
            name,
            email,
            bio
        );

        res.status(201).json(author);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function updateAuthor(req, res) {
    try {
        const { name, email, bio } = req.body;

        const author = await authorsService.updateAuthor(
            req.params.id,
            name,
            email,
            bio
        );

        if (!author) {
            return res.status(404).json({
                message: 'Autor no encontrado'
            });
        }

        res.status(200).json(author);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function deleteAuthor(req, res) {
    try {
        const author = await authorsService.deleteAuthor(
            req.params.id
        );

        if (!author) {
            return res.status(404).json({
                message: 'Autor no encontrado'
            });
        }

        res.status(200).json({
            message: 'Autor eliminado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
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