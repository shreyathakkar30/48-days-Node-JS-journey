const user = require('../models/user')

async function handleUserSignup(req, res){
    const { name, email, password } = req.body
    await user.create({
        name,
        email,
        password,
    });
    return res.render("home");

}

module.exports = {
    handleUserSignup,
}