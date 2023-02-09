'use strict';

const course = require('express').Router();
const UserController = require('../controllers/userController');

course.get('/enroll', UserController.selectCourses);
course.get('/enroll/:userId/:courseId', UserController.selectCourses);
course.get('/details/:courseId', UserController.courseDetail);

module.exports = course;