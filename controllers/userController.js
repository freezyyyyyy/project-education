const { Class, User, Course, Profile } = require('../models');
const bcrypt = require('bcryptjs');


class UserController {

    static home(req, res) {
        res.redirect('/login')
    }
    static login(req, res) {
        const { error } = req.query
        res.render('login', { error })

    }
    static postLogin(req, res) {
        const { username, password } = req.body
        console.log(req.body);
        User.findOne({ where: { username } })
            .then(user => {

                if (user) {
                    const validPass = bcrypt.compareSync(user.password, password);
                    if (validPass || password == user.password) {

                        req.session.userId = user.id;
                        req.session.role = user.role;

                        return res.redirect(`/dashboard/${user.id}`)
                    } else {
                        const error = "Invalid Password"
                        res.redirect(`/login?error=${error}`)
                    }
                } else {
                    const error = "Invalid Username"
                    res.redirect(`/login?error=${error}`)
                }
            })
            .catch(e => res.send(e))


    }
    static registerStudent(req, res) {
        res.render('registrasiStudent')
    }
    static registerTeacher(req, res) {
        res.render('registrasiTeacher')
    }

    static logout(req, res) {
        req.session.destroy(err => {
            if (err) {
                res.send(err)
            } else {
                res.redirect('/login')
            }
        })
    }

    static createUser(req, res) {
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
        User.create({ username, password, email, role })

            .then(user => {
                Profile.create({ firstName, lastName, dateOfBirth, school, city, degree, university, UserId: user.id })
            })
            .then(() => res.redirect('login'))
            .catch(e => {
                if (e.name === "SequelizeValidationError") {
                    e = e.errors.map(er => {
                        er = er.message;
                        return er;
                    })
                    
                    res.send(e)

                }  else {
                    res.send(e)
                }
                
            })
    }

    static viewTeacher(req, res) {
        let { id } = req.params
        id = +id
        User.findAll({
            include: ["details", 'lectures'],
            where: {
                id,
                'role': 'teacher',
            }
        })
            .then(teacher => {
                if (teacher.length === 0) throw ('teacher not found');
                res.render('teacherDetail', { teacher })
                // res.send(teacher)
            })
            .catch(e => res.send(e))
    }

    static addCourse(req, res) {
        let { id } = req.params
        User.findByPk(id)
            .then(user => res.render('addCourse', { user }))
            .catch(e => res.send(e))

    }
    static createCourse(req, res) {
        const { id } = req.params;
        const { name, description, image, duration, category } = req.body
        Course.create({ name, description, image, duration, category, TeacherId: id })
            .then(() => res.redirect(`/teacher/${id}`))
            .catch(e => res.send(e))
    }


    static dashboard(req, res) {
        const { id } = req.params
        User.findByPk(id, { include: ['courses', 'details'] })
            .then(user => {
                res.render('dashboard', { user, id });
            }).catch(err => {
                res.send(err);
            })
    }

    static courseDetail(req, res) {
        let { courseId, id } = req.params;

        Course.findByPk(+courseId, { include: { all: true, nested: true } })
            .then(course => {
                // res.send(course)
                res.render('courses', { course, courseId, id });
            }).catch(err => {
                res.send(err);
            })
    }

    static viewStudent(req, res) {
        const { id } = req.params
        User.findAll({
            include: ["details", 'courses'],
            where: {
                id,
                'role': 'student'
            }
        })
            .then(student => {
                if (student.length === 0) throw ('student not found');
                res.render('studentDetail', { student })

            })
            .catch(e => res.send(e))

    }
    static editStudent(req, res) {
        const { id } = req.params
        Profile.findAll({
            where: {
                'UserId': `${id}`,
            }
        })
            .then(student => res.render('editStudent', { student }))
            .catch(e => res.send(e))
    }
    static updateStudent(req, res) {
        const { id } = req.params
        const { firstName, lastName, dateOfBirth, city, school } = req.body
        Profile.update({ firstName, lastName, dateOfBirth, city, school }, {
            where: { 'UserId': `${id}` }
        })
            .then(() => res.redirect(`/student/${id}`))
            .catch(e => res.send(e))
    }

    static selectCourses(req, res) {
        const { id } = req.params;
        const { sort , filter } = req.query;

        const opt = {};

        if (sort) {
            opt.order = [[`${sort}`],]
        }

        if (filter) {
            opt.where = {
                category: filter
            }
        }

        Course.findAll(opt).then(courses => {
            res.render('selectCourse', { courses, id });
        }
        ).catch(err => {
            res.send(err);
        });
    }

    static enroll(req, res) {
        const {id, courseId} = req.params
        Class.create({
            StudentId: id,
            CourseId: courseId
        }).then(
            res.redirect(`/dashboard/${id}`)
        ).catch(err => {
            res.send(err)
        })
    }

    static unenRoll(req, res) {
        const {id, courseId} = req.params

        Class.destroy({
            where: {
                StudentId: id,
                CourseId: courseId
            }
        }).then(
            res.redirect(`/dashboard/${id}`)
        ).catch(err => {
            res.send(err)
        })
    }
    
}

module.exports = UserController