const Joi = require('joi');

exports.saveTokenApiSchema = Joi.object({
	body: Joi.object({
		email: Joi.string().email().required()
	}).unknown(false)
}).unknown();

exports.resetPasswordApiSchema = Joi.object({
	body: Joi.object({
		email: Joi.string().email().required(),
		newPassword: Joi.string().required(),
		token: Joi.string().required()
	}).unknown(false)
}).unknown();
