const securitySchemes = require('./schemas/security');
const codes = require('./schemas/codes');
const authSchemas = require('./schemas/auth');
const registerSchemas = require('./schemas/register');
const resetPassSchemas = require('./schemas/resetPass');
const userSchemas = require('./schemas/user');
const uploadSchemas = require('./schemas/upload');

module.exports = {
	swaggerDefinition: {
		openapi: '3.0.2',
		info: {
			title: 'Simform',
			description: 'Simform APIs',
			version: '1.0.0',
			contact: {
				name: '',
				email: '',
				url: ''
			}
		},
		consumes: ['application/json'],
		produces: ['application/json'],
		components: {
			securitySchemes,
			schemas: codes
		},
		paths: {
			...authSchemas,
			...registerSchemas,
			...resetPassSchemas,
			...userSchemas,
			...uploadSchemas
		}
	}
};
