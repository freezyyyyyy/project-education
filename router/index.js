'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const course = require('./course');

router.get('/', userController.dashboard);
router.get('/login', userController.login);
router.get('/register', userController.register);

router.use('/course', course);

module.exports= router;