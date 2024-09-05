// server/routes/tasks.js
const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');

// Route definitions
router.post('/', TaskController.createTask); // Handle POST request
router.get('/:internId', TaskController.getTasksByInternId); // Handle GET request
router.put('/:id', TaskController.updateTask); // Handle PUT request
router.delete('/:id', TaskController.deleteTask); // Handle DELETE request

module.exports = router;
