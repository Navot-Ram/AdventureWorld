const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isStoryAuth, validateStory } = require('../middleware');
const ExpressError = require('../utils/ExpressError');
const story = require('../models/story');
const locus = require('../models/Locus');
const stories = require('../controllers/stories');

router.post('/', isLoggedIn, validateStory, catchAsync(stories.createStory))

router.delete('/:storyId', isLoggedIn, isStoryAuth, catchAsync(stories.deleteStory))

module.exports = router;