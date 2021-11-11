const Joi = require('joi');

exports.registerApiSchema = Joi.object({
	body: Joi.object({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required(),
		profileImageUrl: Joi.string().required()
	}).unknown(false)
}).unknown();

exports.updateUserApiSchema = Joi.object({
	body: Joi.object({
		firstName: Joi.string().optional(),
		lastName: Joi.string().optional(),
		profileImageUrl: Joi.string().optional()
	}).unknown(false)
}).unknown();
