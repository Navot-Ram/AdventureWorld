const Locus = require('../models/Locus');
const { characters } = require('../seeds/Sessions');
const cloudinary = require('cloudinary').v2;

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
mbxGeocoding({ accessToken: mapBoxToken });

module.exports.index = async (req, res) => {
    const loci = await Locus.find({});
    res.render('locations/index', { loci });
}
module.exports.newAdventure = (req, res) => {
    res.render('./locations/new', { characters });
}

module.exports.makeNewAdventure = async (req, res, next) => {
    const loci = new Locus(req.body.location);
    loci.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
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
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    loci.images.push(...imgs);
    await loci.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await loci.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
    };
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
    for (let img of loci.images) {
        await cloudinary.uploader.destroy(img.filename);
    }

    await Locus.findByIdAndDelete(id);
    req.flash('success', 'Stricken from the Records');
    res.redirect('/adventures');
}