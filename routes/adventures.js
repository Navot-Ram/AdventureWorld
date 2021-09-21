const express = require('express');
const catchAsync = require('../utils/catchAsync');
const router = express.Router({ mergeParams: true });
const { isLoggedIn, isAuthor, validateLocation } = require('../middleware');
const locations = require('../controllers/locations');
const multer = require('multer')
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(locations.index))
    .post(isLoggedIn, upload.array('location[image]'), validateLocation, catchAsync(locations.makeNewAdventure))

router.get('/new', isLoggedIn, locations.newAdventure)

router.route('/:id')
    .get(catchAsync(locations.showAdventure))
    .put(isLoggedIn, isAuthor, upload.array('location[image]'), validateLocation, catchAsync(locations.editAdventure))
    .delete(isLoggedIn, isAuthor, catchAsync(locations.removeAdventure))


router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(locations.editAdventureForm))

module.exports = router;