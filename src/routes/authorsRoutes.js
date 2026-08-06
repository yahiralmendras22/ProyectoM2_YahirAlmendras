const express = require('express');
const router = express.Router();

const authorsController = require('../controllers/authorsControllers');

const {
    validateIdParam,
    validateAuthorData
} = require('../middlewares/validateRequest');

router.get('/', authorsController.getAuthors);
router.get('/:id', validateIdParam, authorsController.getAuthorById);
router.post('/', validateAuthorData, authorsController.createAuthor);
router.put('/:id', validateIdParam, validateAuthorData, authorsController.updateAuthor);
router.delete('/:id', validateIdParam, authorsController.deleteAuthor);

module.exports = router;