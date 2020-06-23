const express = require('express');
const jwt = require('jsonwebtoken');
const router  = express.Router();
const controller = require('../controllers/task.controller');
const verifyToken = require('../services/verifyToken');

router.get('/tasks', verifyToken, controller.getTaskController);
router.post('/tasks', verifyToken, controller.createTaskController);

module.exports = router;
