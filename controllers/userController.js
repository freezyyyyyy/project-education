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
                res.render('dashboard', {user});
            })
    }
}

module.exports = UserController