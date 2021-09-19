const Locus = require('../models/Locus');
const { characters } = require('../seeds/Sessions');

module.exports.index = async (req, res) => {
    const loci = await Locus.find({});
    res.render('locations/index', { loci });
}
module.exports.newAdventure = (req, res) => {
    res.render('./locations/new', { characters });
}

module.exports.makeNewAdventure = async (req, res) => {
    const loci = new Locus(req.body.location);
    loci.author = req.user._id;
    await loci.save();
    req.flash('success', 'Your Adventure is now Recorded!');
    res.redirect(`/adventures/${loci._id}`)
}

module.exports.showAdventure = async (req, res) => {
    const locus = await Locus.findById(req.params.id).populate({
        path: 'stories',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!locus) {
        req.flash('error', 'No such place.');
        return res.redirect('/adventures');
    }
    res.render('locations/location', { locus });
}

module.exports.editAdventureForm = async (req, res) => {
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
}

module.exports.editAdventure = async (req, res) => {
    const { id } = req.params;
    const loci = await Locus.findById(id);
    if (!loci) {
        req.flash('error', 'What is that place you speak of?');
        return res.redirect(`/adventures/${loci._id}`)
    }
    const local = await Locus.findByIdAndUpdate(id, { ...req.body.location });
    req.flash('success', 'Successfully updated your Adventure!');
    res.redirect(`/adventures/${loci._id}`)
}

module.exports.removeAdventure = async (req, res) => {
    const { id } = req.params;
    const loci = await Locus.findById(id);
    if (!loci) {
        req.flash('error', 'What is that place you speak of?');
        return res.redirect(`/adventures/${loci._id}`)
    }
    await Locus.findByIdAndDelete(id);
    req.flash('success', 'Stricken from the Records');
    res.redirect('/adventures');
}