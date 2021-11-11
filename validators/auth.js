const Joi = require('joi');

exports.loginApiSchema = Joi.object({
	body: Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required()
	}).unknown(false)
}).unknown();
