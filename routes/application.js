const express = require('express');
const router = express.Router();
const Application = require('../models/application');
const applications = require('../controllers/applications');
const { isLoggedIn } = require('../middleware');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const User = require('../models/user');


router.get('/', applications.index)

router.get('/new', applications.renderNewForm)

router.get('/:id', catchAsync(applications.showApplication));

router.post('/', isLoggedIn, catchAsync(applications.createApplication));

module.exports = router;