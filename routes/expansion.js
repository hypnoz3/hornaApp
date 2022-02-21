const catchAsync = require('../utils/catchAsync');
const express = require('express');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const router = express.Router();
const expansions = require('../controllers/expansions');

router.get('/', expansions.index);

router.get('/new', expansions.renderNewForm);

router.get('/:id', catchAsync(expansions.showExpansion));

router.post('/', upload.array('banner'), catchAsync(expansions.createExpansion));

module.exports = router;