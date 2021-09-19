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