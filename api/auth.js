const logger = require('../utils/logger');
const jwtHelper = require('../helpers/jwtHelper');
const UserModel = require('../models/UserModel');
const {
	sendSuccessResponse,
	sendErrorResponse
} = require('../utils/serverResponse');
const { HttpStatus } = require('../constants/httpStatus.enum');
const { TOKEN_VALIDITY_PERIOD } = require('../constants/common');

// authenticate user
exports.authUser = (req, res) => {
	try {
		const { userId } = req.user;
		const payload = {
			userId,
			expiration: Date.now() + TOKEN_VALIDITY_PERIOD
		};

		jwtHelper
			.signJWT(payload)
			.then(async (token) => {
				let userProfile = await UserModel.getUserDetails({
					userId
				});

				userProfile = userProfile.toObject
					? userProfile.toObject()
					: userProfile;
				delete userProfile.password;

				return sendSuccessResponse(
					res,
					{
						message: 'Success',
						token,
						data: userProfile
					},
					HttpStatus.OK
				);
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
	} catch (error) {
		logger.error(error);

		return sendErrorResponse(
			res,
			{
				message: 'Internal Server Error'
			},
			HttpStatus.INTERNAL_SERVER_ERROR
		);
	}
};

// logout user
exports.logoutUser = (req, res) => {
	try {
		req.logout();

		return sendSuccessResponse(
			res,
			{
				message: 'Logged out successfully'
			},
			HttpStatus.OK
		);
	} catch (err) {
		logger.error(err);

		return sendErrorResponse(
			res,
			{
				message: 'Internal Server Error'
			},
			HttpStatus.INTERNAL_SERVER_ERROR
		);
	}
};
