const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const users = require('../controllers/users');


router.route('/register')
    .get(users.registerForm)
    .post(catchAsync(users.registerUser))

router.route('/login')
    .get(users.userLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.userLoginLogic)

router.get('/logout', users.userLogout)


module.exports = router;