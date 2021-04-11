const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

module.exports.applicationSchema = Joi.object({
    application: Joi.object({
        playstyle: Joi.string().required().escapeHTML(),
    }).required()
});


module.exports.commentSchema = Joi.object({
    comments: Joi.object({
        body: Joi.string().required().escapeHTML()
    }).required()

})