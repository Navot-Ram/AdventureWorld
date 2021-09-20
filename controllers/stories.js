const Story = require('../models/story');
const Locus = require('../models/Locus');

module.exports.createStory = async (req, res) => {
    const location = await Locus.findById(req.params.id);
    const story = new Story(req.body.story);
    story.author = req.user._id;
    location.stories.push(story);
    await story.save();
    await location.save();
    req.flash('success', 'Another Howl for the Records');
    res.redirect(`/adventures/${location._id}`);
}

module.exports.deleteStory = async (req, res) => {
    const { id, storyId } = req.params;
    await Locus.findByIdAndUpdate(id, { $pull: { stories: storyId } });
    await Story.findByIdAndDelete(storyId);
    req.flash('success', 'Stricken from the Records');
    res.redirect(`/adventures/${id}`);
}