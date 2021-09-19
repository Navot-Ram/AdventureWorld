const express = require('express');
const catchAsync = require('../utils/catchAsync');
const Story = require('../models/story');
const Locus = require('../models/Locus');
const { isLoggedIn, isStoryAuth, validateStory } = require('../middleware');
const router = express.Router({ mergeParams: true });


//** Stories */

router.post('/', isLoggedIn, validateStory, catchAsync(async (req, res) => {
    const location = await Locus.findById(req.params.id);
    const story = new Story(req.body.story);
    story.author = req.user._id;
    location.stories.push(story);
    await story.save();
    await location.save();
    req.flash('success', 'Another Howl for the Records');
    res.redirect(`/adventures/${location._id}`);
}))

router.delete('/:storyId', isLoggedIn, isStoryAuth, catchAsync(async (req, res) => {
    const { id, storyId } = req.params;
    await Locus.findByIdAndUpdate(id, { $pull: { stories: storyId } });
    await Story.findByIdAndDelete(storyId);
    req.flash('success', 'Stricken from the Records');
    res.redirect(`/adventures/${id}`);
}))

module.exports = router;