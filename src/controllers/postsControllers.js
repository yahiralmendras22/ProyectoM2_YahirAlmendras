const postsService = require('../services/postsServices.js');

async function getPosts(req, res, next) {
    try {
        const posts = await postsService.getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
}

async function getPostById(req, res, next) {
    try {
        const { id } = req.params;
        const post = await postsService.getPostById(id);

        if (!post) {
            return res.status(404).json({
                message: 'Post no encontrado'
            });
        }

        res.status(200).json(post); 
    } catch (error) {
        next(error);
    }
}

async function createPost(req, res, next) {
    try {
        const { title, content, author_id, published } = req.body;
        const post = await postsService.createPost({ title, content, author_id, published });
        res.status(201).json(post);
    } catch (error) {
        if (error.code === '23503') {
            error.userMessage = 'El autor indicado no existe';
        }
        next(error);
    }
}

async function updatePost(req, res, next) {
    try {
        const { id } = req.params;
        const { title, content, author_id, published } = req.body;
        const post = await postsService.updatePost(id, { title, content, author_id, published });

        if (!post) {
            return res.status(404).json({
                message: 'Post no encontrado'
            });
        }

        res.status(200).json(post);
    } catch (error) {
        if (error.code === '23503') {
            error.userMessage = 'El autor indicado no existe';
        }
        next(error);
    }
}

async function deletePost(req, res, next) {
    try {
        const { id } = req.params;
        const post = await postsService.deletePost(id);

        if (!post) {
            return res.status(404).json({
                message: 'Post no encontrado'
            });
        }

        res.status(200).json({
            message: 'Post eliminado correctamente'
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
};