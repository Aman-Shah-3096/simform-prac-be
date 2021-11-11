const logger = require('./logger');

// Send success response
exports.sendSuccessResponse = (res, body, statusCode, headers = {}) => {
	res.setHeader('Content-Type', 'application/json');
	res.writeHead(statusCode, headers);
	res.end(JSON.stringify({ isError: false, ...body }));
};

// Send error response
exports.sendErrorResponse = (res, body, statusCode, headers = {}) => {
	// logging all service errors
	logger.error(body);
	res.setHeader('Content-Type', 'application/json');
	res.writeHead(statusCode, headers);
	res.end(JSON.stringify({ isError: true, ...body }));
};
