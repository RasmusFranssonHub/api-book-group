const express = require('express');
const reviewController = require('../controllers/reviewController');
const { verifyToken } = require('../middleware/verifyToken');

const router = express.Router();

router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getReviewById);
router.post('/', reviewController.createReview);
router.patch('/:id', verifyToken, reviewController.updateReview);
router.delete('/:id', verifyToken, reviewController.deleteReview);

module.exports = router;