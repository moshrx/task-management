const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// User progress
router.get('/users/:userId/progress', userController.getUserProgress);

module.exports = router;
