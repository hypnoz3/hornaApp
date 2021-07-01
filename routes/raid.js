const Raid = require('../models/raid');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const catchAsync = require('../utils/catchAsync');
const express = require('express');
const router = express.Router({ mergeParams: true });
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const raids = require('../controllers/raids');

router.get('/', raids.index);

router.get('/new', raids.renderNewForm);

router.get('/:id', catchAsync(raids.showRaid));

router.post('/', upload.array('banner'), catchAsync(raids.createRaid));

module.exports = router;