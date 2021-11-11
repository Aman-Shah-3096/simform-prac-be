const UserModel = require('../models/UserModel');
const {
	sendSuccessResponse,
	sendErrorResponse
} = require('../utils/serverResponse');
const { HttpStatus } = require('../constants/httpStatus.enum');
const logger = require('../utils/logger');
const { isEmpty } = require('lodash');
const { filterUserData } = require('../utils/utilities');

// update user details
exports.updateUser = async (req, res) => {
	try {
		const data = req.body;
		const userId = req.params?.userId;

		if (userId !== req.payload.userId) {
			return sendErrorResponse(
				res,
				{
					message: 'You are not allowed to update details'
				},
				HttpStatus.FORBIDDEN
			);
		}

		const updateDetails = {
			firstName: data.firstName,
			lastName: data.lastName,
			profileImageUrl: data.profileImageUrl
		};
		const updatedUserData = await UserModel.updateUserDetails(
			{
				userId: userId
			},
			updateDetails
		);

		if (updatedUserData && !isEmpty(updatedUserData)) {
			return sendSuccessResponse(
				res,
				{
					data: filterUserData(updatedUserData) || {},
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
