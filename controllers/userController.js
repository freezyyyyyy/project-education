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
        let {id} = req.params
        id = +id
        User.findAll({
            include: ["details",'lectures'],
            where:{
                id,
                'role': 'teacher',
            }
        })
        .then(teacher=> {  
            if(teacher.length === 0) throw ('teacher not found');
            res.render('teacherDetail',{teacher})
            // res.send(teacher)
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
        const {id} = req.params
        User.findByPk(id, { include: ['courses', 'details'] })
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

    static viewStudent(req,res){
        const {id} = req.params
        User.findAll({
            include: ["details",'courses'],
            where:{
                id,
                'role': 'student'
            }
        })
        .then(student=> {  
            if(student.length === 0) throw ('student not found');
            res.render('studentDetail',{student})
            
        })
        .catch(e=>res.send(e))
        
    }
    static editStudent(req,res){
        const {id} = req.params
        Profile.findAll({
            where:{
                'UserId':`${id}`,
            }
        })
        .then(student=> res.render('editStudent',{student}))
        .catch(e=>res.send(e))
    }
    static updateStudent(req,res){
        const{id} = req.params
        const {firstName,lastName,dateOfBirth,city,school} = req.body
        Profile.update({firstName,lastName,dateOfBirth,city,school},{
            where:{'UserId':`${id}`}
        })
        .then(()=>res.redirect(`/student/${id}`))
        .catch(e=>req.send(e))
    }

    static selectCourses(req, res){
        Course.findAll().then(courses => {
            res.render('selectCourse', {courses});
        }).catch(err => {
            res.send(err);
        });
    }

    static enroll(req, res){
        {  }
        res.send('hehe');
    }

    static unenRoll(req, res){

    }
}

module.exports = UserController