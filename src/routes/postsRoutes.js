const express = require('express');
const router = express.Router();

const postsController = require('../controllers/postsControllers');

const {
    validateIdParam,
    validatePostData
} = require('../middlewares/validateRequest');

router.get('/', postsController.getPosts);
router.get('/:id', validateIdParam, postsController.getPostById);
router.post('/', validatePostData, postsController.createPost);
router.put('/:id', validateIdParam, validatePostData, postsController.updatePost);
router.delete('/:id', validateIdParam, postsController.deletePost);

module.exports = router;