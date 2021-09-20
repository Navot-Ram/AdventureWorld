const { locusSchema, storyTestSchema } = require('./schemas');
const Locus = require('./models/Locus');
const Story = require('./models/story');
const ExpressError = require('./utils/ExpressError');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalURL;
        req.flash('error', 'You must be signed in to speak.')
        return res.redirect('/login');
    }
    next();
}

module.exports.validateLocation = (req, res, next) => {
    const { error } = locusSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const locus = await Locus.findById(id);
    if (!locus.author.equals(req.user._id)) {
        req.flash('error', 'You are not the Holwer now! Silence!');
        return res.redirect(`/adventures/${locus._id}`)
    }
    next();
}

module.exports.isStoryAuth = async (req, res, next) => {
    const { id, storyId } = req.params;
    const story = await Story.findById(storyId);
    if (!story.author.equals(req.user._id)) {
        req.flash('error', 'You are not the Holwer now! Silence!');
        return res.redirect(`/adventures/${id}`)
    }
    next();
}

module.exports.validateStory = (req, res, next) => {
    const { error } = storyTestSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}
