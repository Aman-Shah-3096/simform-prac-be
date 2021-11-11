const passport = require('passport');
const jwtHelper = require('../helpers/jwtHelper');
const logger = require('../utils/logger');
const { HttpStatus } = require('../constants/httpStatus.enum');
const { sendErrorResponse } = require('../utils/serverResponse');

const authenticateRequest = (req, res, next) => {
	if (req.isAuthenticated()) next();
	else {
		passport.authenticate('local', (err, user, info) => {
			if (err) next(err);

			if (user) {
				req.logIn(user, function (err) {
					if (err) return next(err);
					next();
				});
			} else {
				return sendErrorResponse(
					res,
					{
						message: info.message ? info.message : info
					},
					HttpStatus.UNAUTHORIZED
				);
			}
		})(req, res, next);
	}
};

const authenticateJWT = (req, res, next) => {
	const accessToken = req.headers?.access_token;

	if (!accessToken) {
		return sendErrorResponse(
			res,
			{
				message: 'Authentication failed'
			},
			HttpStatus.UNAUTHORIZED
		);
	}

	jwtHelper
		.verifyJWT(accessToken)
		.then(async (data) => {
			if (data && data.userId && data.expiration > Date.now()) {
				req.payload = data;
				next();
			} else {
				return sendErrorResponse(
					res,
					{
						message: 'Token is either invalid or expired'
					},
					HttpStatus.UNAUTHORIZED
				);
			}
		})
		.catch((err) => {
			logger.error(err);

			return sendErrorResponse(
				res,
				{
					message: 'Internal Server Error'
				},
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		});
};

module.exports = { authenticateRequest, authenticateJWT };
