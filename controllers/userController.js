const { Class, User, Course, Profile } = require('../models');

class UserController {

    static home(req,res){
        res.redirect('/login')
    }
    static login(req, res) {
        res.render('login')

    }
    static registerStudent(req, res) {
        res.render('registrasiStudent')
    }
    static registerTeacher(req, res) {
        res.render('registrasiTeacher')
    }

    static createUser(req,res){
        let {
            firstName,
            lastName,
            username,
            password,
            email,
            dateOfBirth,
            city,
            school,
            degree,
            university,
            role
        } = req.body
         User.create({username,password,email,role})
        
        .then(user=>{
            Profile.create({firstName,lastName,dateOfBirth,school,city,degree,university, UserId: user.id})
        })
        .then(()=> res.redirect('login'))
        .catch(e=>res.send(e))
    }

    static viewTeacher(req,res){
        const {id} = req.params
        User.findAll({
            include: [Profile,'lectures'],
            where:{
                id,
                'role': 'teacher',
            }
        })
        .then(teacher=> {  
            if(teacher.length === 0) throw ('teacher not found');
            res.render('teacherDetail',{teacher})
        })
        .catch(e=>res.send(e))
    }

    static addCourse(req,res){
        let {id} = req.params
        User.findByPk(id)
        .then(user => res.render('addCourse', {user}))
        .catch(e=>res.send(e))

    }
    static createCourse(req,res){
        const {id} = req.params;
        const {name,description,image,duration,category} = req.body
        Course.create({name,description,image,duration,category,TeacherId: id})
        .then(()=> res.redirect(`/teacher/${id}`))
        .catch(e=>res.send(e))
    }


    static dashboard(req, res) {
        User.findByPk(1, { include: ['courses', 'details'] })
            .then(user => {
                res.render('dashboard', { user });
            }).catch(err => {
                res.send(err);
            })
    }

    static courseDetail(req, res) {
        let { courseId } = req.params;

        Course.findByPk(+courseId, { include: { all: true, nested: true } })
            .then(course => {
                // res.send(course)
                res.render('courses', { course });
            }).catch(err => {
                res.send(err);
            })
    }
}

module.exports = UserController