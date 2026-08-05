const express = require('express');
const router = express.Router();

const authorsController = require('../controllers/authorsControllers');

const {
    validateAuthorId,
    validateAuthorData
} = require('../middlewares/validateRequest');

router.get('/', authorsController.getAuthors);
router.get('/:id', validateAuthorId, authorsController.getAuthorById);
router.post('/', validateAuthorData, authorsController.createAuthor);
router.put('/:id', validateAuthorId, validateAuthorData, authorsController.updateAuthor);
router.delete('/:id', validateAuthorId, authorsController.deleteAuthor);

module.exports = router;