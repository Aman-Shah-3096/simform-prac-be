const logger = require('../utils/logger');
const appConfig = require('../config/appConfig');
const {
	sendSuccessResponse,
	sendErrorResponse
} = require('../utils/serverResponse');
const { HttpStatus } = require('../constants/httpStatus.enum');
const { encryptPassword } = require('../helpers/bcrypt');
const UserModel = require('../models/UserModel');
const ResetPasswordModel = require('../models/ResetPasswordModel');
const uuid = require('uuid');
const { sendMail } = require('../helpers/mailHelper');
const { isEmpty } = require('lodash');

const appHost = appConfig.appHost;

// fetch reset password token data
exports.getTokenData = async (req, res) => {
	try {
		const token = req.params.token;
		const tokenData = await ResetPasswordModel.getTokenData(token);

		if (tokenData) {
			return sendSuccessResponse(
				res,
				{
					data: tokenData,
					message: 'Success'
				},
				HttpStatus.OK
			);
		}

		sendErrorResponse(
			res,
			{
				message: 'Internal Server Error'
			},
			HttpStatus.INTERNAL_SERVER_ERROR
		);
	} catch (error) {
		logger.error(error);

		sendErrorResponse(
			res,
			{
				message: 'Internal Server Error'
			},
			HttpStatus.INTERNAL_SERVER_ERROR
		);
	}
};

// save reset pass token data to db
exports.saveTokenData = async (req, res) => {
	try {
		const data = req.body;
		const token = uuid.v4();

		const tokenData = await ResetPasswordModel.saveTokenData({
			email: data.email,
			token: token,
			used: false,
			expiresAt: Date.now() + 3600000
		});

		if (tokenData && !isEmpty(tokenData)) {
			let resetLink = ``;
			if (['local', 'dev'].indexOf(appConfig.env) !== -1) {
				resetLink = `${appHost}/app/reset-password?token=${tokenData.token}`;
			} else {
				resetLink = `${appHost}/app/reset-password?token=${tokenData.token}`;
			}

			const mailResponse = await sendMail(
				data.email,
				`Simform Account - Reset password request`,
				`Hey,\n\nUse the below given link to reset your password for your Simform Account.\nPassword reset link: ${resetLink}`
			);

			if (mailResponse) {
				return sendSuccessResponse(
					res,
					{
						message:
							'Password reset link has been sent to given email address'
					},
					HttpStatus.OK
				);
			}
		}

		sendErrorResponse(
			res,
			{
				message: 'Internal Server Error'
			},
			HttpStatus.INTERNAL_SERVER_ERROR
		);
	} catch (error) {
		logger.error(error);

		sendErrorResponse(
			res,
			{
				message: 'Internal Server Error'
			},
			HttpStatus.INTERNAL_SERVER_ERROR
		);
	}
};

// reset account password
exports.resetPassword = async (req, res) => {
	try {
		const data = req.body;

		const tokenValid = await ResetPasswordModel.findOne({
			email: data.email,
			token: data.token,
			used: false,
			expiresAt: {
				$gt: Date.now()
			}
		});

		if (tokenValid && !isEmpty(tokenValid)) {
			const encryptedPass = await encryptPassword(data.newPassword);

			const respData = await UserModel.updateUserDetails(
				{ email: data.email },
				{
					password: encryptedPass
				}
			);

			await ResetPasswordModel.updateTokenData(
				{
					email: data.email,
					token: data.token
				},
				{ used: true }
			);

			if (respData) {
				return sendSuccessResponse(
					res,
					{
						message: 'Success'
					},
					HttpStatus.OK
				);
			} else {
				return sendErrorResponse(
					res,
					{
						message: 'Internal Server Error'
					},
					HttpStatus.INTERNAL_SERVER_ERROR
				);
			}
		}

		sendErrorResponse(
			res,
			{
				message: 'Token is either expired or invalid'
			},
			HttpStatus.BAD_REQUEST
		);
	} catch (error) {
		logger.error(error);
		sendErrorResponse(
			res,
			{
				message: 'Internal Server Error'
			},
			HttpStatus.INTERNAL_SERVER_ERROR
		);
	}
};
