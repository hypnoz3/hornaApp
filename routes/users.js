const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users')
const multer = require('multer');
const { storage } = require('../cloudinary');
const Application = require('../models/application');
const upload = multer({ storage });
const { isLoggedIn, isAuthor, validateCampground, checkProfileOwnership } = require('../middleware');


router.route('/register')
    .get(users.renderRegister)
    .post(upload.array('avatar'), catchAsync(users.register))

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.route('/users/:id')
    .get(catchAsync(users.userProfile))
    .put(isLoggedIn, upload.array('avatar'), catchAsync(users.updateUser))
    .delete(catchAsync(users.deleteUser))

router.get('/users/:id/edit', catchAsync(users.renderUserEditForm))

router.get('/logout', users.logout);

module.exports = router;