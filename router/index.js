'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { route } = require('./course');
const course = require('./course');


router.get('/', userController.home)
router.post('/register', userController.createUser)
router.get('/register/student', userController.registerStudent)
router.get('/register/teacher', userController.registerTeacher)
router.get('/login', userController.login);
router.post('/login', userController.postLogin);
router.get('/logout', userController.logout);

router.use((req, res, next) => {
    if(!req.session.userId){
        const error = 'Login first'
        res.redirect(`/login?error=${error}`)
    }else{
         next()
    }
  })

const student =  function (req, res, next){
    if(req.session.userId && req.session.role == 'student'){
        next()
    }else{
        const error = 'just student can be accses '
        res.redirect(`/login?error=${error}`)
    }
  }

  const teacher =  function (req, res, next){
    if(req.session.userId && req.session.role == 'teacher'){
        next()
    }else{
        const error = 'just teacher can be accses '
        res.redirect(`/login?error=${error}`)
    }
  }

router.get('/dashboard/:id', userController.dashboard);
router.use('/dashboard/course', course);
router.get('/teacher/:id',userController.viewTeacher)
router.get('/teacher/:id/add', teacher, userController.addCourse)
router.post('/teacher/:id/add', userController.createCourse)
router.get('/student/:id',userController.viewStudent)
router.get('/student/:id/edit',student,userController.editStudent)
router.post('/student/:id/edit',userController.updateStudent)


router.use('/course',course)

module.exports= router;