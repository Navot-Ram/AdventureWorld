const express = require('express');
const catchAsync = require('../utils/catchAsync');
const methodOverride = require('method-override');
const Locus = require('../models/Locus');
const { characters } = require('../seeds/Sessions');
const router = express.Router({ mergeParams: true });
const { isLoggedIn, isAuthor, validateLocation } = require('../middleware');
const locations = require('../controllers/locations');


router.get('/', catchAsync(locations.index))

router.get('/new', isLoggedIn, locations.newAdventure)

router.post('/', isLoggedIn, validateLocation, catchAsync(locations.makeNewAdventure))

router.get('/:id', catchAsync(locations.showAdventure))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(locations.editAdventureForm))

router.put('/:id', isLoggedIn, isAuthor, validateLocation, catchAsync(locations.editAdventure))

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(locations.removeAdventure))

module.exports = router;