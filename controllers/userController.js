class UserController{
    static login(req, res){
        res.render('login')
    }
    static register(req,res){
        res.render('registrasi')

    }

}

module.exports = UserController