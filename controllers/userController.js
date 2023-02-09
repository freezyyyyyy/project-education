const { Class, User, Course, Profile } = require('../models');

class UserController {
    static login(req, res) {
        User.findAll({
            include: ['lectures']
        }).then(result => {
            res.send(result)
        }).catch(err => {
            res.send(err)
        });
        // res.render('login')
    }
    static register(req, res) {
        res.render('registrasi')
    }
}

module.exports = UserController