const User = require('../models/User');


module.exports.registerForm = (req, res) => {
    res.render('./users/register');
}

module.exports.registerUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to the Pack!');
            res.redirect('/adventures');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}
module.exports.userLogin = (req, res) => {
    res.render('./users/login');
}

module.exports.userLogout = (req, res) => {
    req.logout();
    req.flash('succes', 'You Left.');
    req.flash('error', 'Sticking around?');
    res.redirect('/adventures');
}

module.exports.userLoginLogic = (req, res) => {
    req.flash('success', 'Welcome back to the Pack.');
    const redirectUrl = req.session.returnTo || '/adventures';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}