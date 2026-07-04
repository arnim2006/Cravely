const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// All comment routes are protected (users must be logged in as Foodie or Partner)
// Using authUserMiddleware to verify the user JWT session first

// POST /api/comments/:foodId -> Add comment
router.post('/:foodId', authMiddleware.authUserMiddleware, commentsController.createComment);

// GET /api/comments/:foodId -> Get all comments
router.get('/:foodId', authMiddleware.authUserMiddleware, commentsController.getComments);

// DELETE /api/comments/:commentId -> Delete comment
router.delete('/:commentId', authMiddleware.authUserMiddleware, commentsController.deleteComment);

module.exports = router;
