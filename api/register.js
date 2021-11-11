const uuid = require('uuid');
const UserModel = require('../models/UserModel');
const {
	sendSuccessResponse,
	sendErrorResponse
} = require('../utils/serverResponse');
const { HttpStatus } = require('../constants/httpStatus.enum');
const logger = require('../utils/logger');
const { isEmpty } = require('lodash');
const { encryptPassword } = require('../helpers/bcrypt');
const { filterUserData } = require('../utils/utilities');

// register user
exports.registerUser = async (req, res) => {
	try {
		const data = req.body;

		const alreadyExists = await UserModel.findOne({
			email: data.email
		});

		if (alreadyExists && !isEmpty(alreadyExists)) {
			return sendErrorResponse(
				res,
				{
					message: 'Email id already registered'
				},
				HttpStatus.BAD_REQUEST
			);
		}

		const userData = await UserModel.saveUserDetails({
			userId: uuid.v4(),
			...data,
			password: await encryptPassword(data.password)
		});

		if (userData && !isEmpty(userData)) {
			return sendSuccessResponse(
				res,
				{
					data: filterUserData(userData),
					message: 'Success'
				},
				HttpStatus.CREATED
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
