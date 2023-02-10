'use strict';

const course = require('express').Router();
const UserController = require('../controllers/userController');

const student =  function (req, res, next){
    if(req.session.userId && req.session.role == 'student'){
        next()
    }else{
        const error = 'just student can be accses '
        res.redirect(`/login?error=${error}`)
    }
  }

course.get('/:id/enroll', UserController.selectCourses);
course.get('/:id/enroll/:courseId', student,  UserController.enroll);
course.get('/:id/details/:courseId', UserController.courseDetail);
course.get('/:id/details/:courseId/unenroll', UserController.unenRoll);

module.exports = course;