'use strict';

const course = require('express').Router();
const UserController = require('../controllers/userController');

course.get('/:id/enroll', UserController.selectCourses);
course.get('/:id/enroll/:courseId', UserController.enroll);
course.get('/:id/details/:courseId', UserController.courseDetail);
course.get('/:id/details/:courseId/unenroll', UserController.unenRoll);

module.exports = course;