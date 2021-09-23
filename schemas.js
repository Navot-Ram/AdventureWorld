const Joi = require('joi');

module.exports.locusSchema = Joi.object({
    location: Joi.object({
        title: Joi.string().required(),
        session: Joi.number().required().min(0),
        // image: Joi.string().required(),
        city: Joi.string().required(),
        characters: Joi.array().min(1),
    }).required(),
    deleteImages: Joi.array(),
});


module.exports.storyTestSchema = Joi.object({
    story: Joi.object({
        title: Joi.string().required().max(80),
        rank: Joi.number().required(),
        body: Joi.string().required().max(255),
    }).required()
});
