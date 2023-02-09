const { Class, User, Course, Profile } = require('../models');

class UserController {
    static login(req, res) {
        res.render('login')
    }
    static register(req, res) {
        res.render('registrasi')
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