const express = require('express');
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', userController.home)
router.get('/login', userController.login)
router.get('/register/student', userController.registerStudent)
router.get('/register/teacher', userController.registerTeacher)
router.post('/register', userController.createUser)
router.get('/teacher/:id',userController.viewTeacher)
router.get('/teacher/:id/add', userController.addCourse)
router.post('/teacher/:id/add', userController.createCourse)


module.exports= router;