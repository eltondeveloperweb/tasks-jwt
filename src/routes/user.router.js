const express = require('express');
const router  = express.Router();
const controller = require('../controllers/user.controller');
const verifyToken = require('../services/verifyToken');

router.get('/users', verifyToken, controller.getUserController);
router.post('/users', controller.createUserController);
router.post('/auth/users', controller.loginUserController);

module.exports = router;
