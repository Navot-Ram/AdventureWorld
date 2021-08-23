const Joi = require('joi');

module.exports.locusSchema = Joi.object({
    location: Joi.object({
        title: Joi.string().required(),
        session: Joi.number().required().min(0),
        image: Joi.string().required(),
        city: Joi.string().required(),
        characters: Joi.array().min(1),
    }).required()
});

