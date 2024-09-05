// server/routes/tasks.js
const express = require('express');
const router = express.Router();
const FeedbackController = require('../controllers/feedbackController');

// Route definitions
router.post('/', FeedbackController.createFeedback); // Handle POST request
router.get('/:internId', FeedbackController.getFeedbackByInternId); // Handle GET request
router.put('/:id', FeedbackController.updateFeedback); // Handle PUT request
router.delete('/:id', FeedbackController.deleteFeedback); // Handle DELETE request

module.exports = router;
