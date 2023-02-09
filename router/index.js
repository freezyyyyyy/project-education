'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { route } = require('./course');
const course = require('./course');

router.get('/', userController.home)
router.get('/dashboard', userController.dashboard);
router.get('/login', userController.login);
router.use('/course', course);
router.get('/register/student', userController.registerStudent)
router.get('/register/teacher', userController.registerTeacher)
router.post('/register', userController.createUser)
router.get('/teacher/:id',userController.viewTeacher)
router.get('/teacher/:id/add', userController.addCourse)
router.post('/teacher/:id/add', userController.createCourse)

router.use('/course',course)

module.exports= router;