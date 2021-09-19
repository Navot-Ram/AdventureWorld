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

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const locus = await Locus.findById(req.params.id);
    if (!locus) {
        req.flash('error', 'No such place.');
        return res.redirect('/adventures');
    }
    const master = {
        loc: locus,
        char: characters
    }
    res.render('locations/edit', { master });
}))

router.put('/:id', isLoggedIn, isAuthor, validateLocation, catchAsync(async (req, res) => {
    const { id } = req.params;
    const loci = await Locus.findById(id);
    if (!loci) {
        req.flash('error', 'What is that place you speak of?');
        return res.redirect(`/adventures/${loci._id}`)
    }
    const local = await Locus.findByIdAndUpdate(id, { ...req.body.location });
    req.flash('success', 'Successfully updated your Adventure!');
    res.redirect(`/adventures/${loci._id}`)
}))


router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    const loci = await Locus.findById(id);
    if (!loci) {
        req.flash('error', 'What is that place you speak of?');
        return res.redirect(`/adventures/${loci._id}`)
    }
    await Locus.findByIdAndDelete(id);
    req.flash('success', 'Stricken from the Records');
    res.redirect('/adventures');
}))


module.exports = router;