const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

// CRUD operations for tasks
router.post('/tasks', taskController.create);
router.get('/tasks', taskController.findAll);
router.put('/tasks/:taskId', taskController.update);
router.delete('/tasks/:taskId', taskController.delete);

module.exports = router;
