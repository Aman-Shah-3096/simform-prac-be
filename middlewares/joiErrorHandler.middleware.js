const Joi = require('joi');

const { sendErrorResponse } = require('../utils/serverResponse');
const { HttpStatus } = require('../constants/httpStatus.enum');
const logger = require('../utils/logger');

// Handle joi validation errors
exports.JoiErrorHandler = (error, req, res, next) => {
	if (!(error instanceof Joi.ValidationError)) {
		next(error);
		return;
	}
	const errorBody = {
		message: error.message,
		data: {}
	};
	logger.error('Error: ', error.stack);

	return sendErrorResponse(res, errorBody, HttpStatus.BAD_REQUEST);
};
