const uuid = require('uuid');
const {
	sendSuccessResponse,
	sendErrorResponse
} = require('../utils/serverResponse');
const { HttpStatus } = require('../constants/httpStatus.enum');
const logger = require('../utils/logger');
const appConfig = require('../config/appConfig');
const awsHelper = require('../helpers/awsHelper');

// upload file to aws s3
exports.uploadToS3 = async (req, res) => {
	try {
		const profileImageData = req.files?.profileImage || null;

		const fileUrl = await awsHelper.uploadFile({
			Key: `${appConfig.env}/${uuid.v4()}_${profileImageData.name.replace(
				/[^A-Za-z.0-9]/g,
				''
			)}`,
			ContentType: profileImageData.mimetype,
			Body: profileImageData.data,
			Bucket: appConfig.aws.s3.bucketName
		});

		if (fileUrl) {
			return sendSuccessResponse(
				res,
				{
					data: fileUrl,
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
