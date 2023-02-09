'use strict';

const course = require('express').Router();
const UserController = require('../controllers/userController');

course.get('/details/:courseId', UserController.courseDetail);

module.exports = course;