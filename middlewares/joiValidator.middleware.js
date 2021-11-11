const { JoiErrorHandler } = require('./joiErrorHandler.middleware');

// Bind joi schema with joi validator middleware to validate request object
exports.joiValidatorMiddleware = (schema) => {
	return _joiValidator.bind({ schema });
};

// Middleware for validating joi schema
async function _joiValidator(req, res, next) {
	try {
		const schema = this.schema;
		await schema.validateAsync(req);
		next();
	} catch (error) {
		// handle joi validation errors
		JoiErrorHandler(error, req, res, next);
	}
}
