const AWS = require('aws-sdk');
const appConfig = require('../config/appConfig');

// initialize and configure AWS object
AWS.config.credentials = new AWS.Credentials({
	accessKeyId: appConfig.aws.accessKeyId || '',
	secretAccessKey: appConfig.aws.secretAccessKey || ''
});
AWS.config.region = appConfig.aws.region;

// uploads file to configured S3 bucket as per the params
const uploadFile = async (params) => {
	const s3 = new AWS.S3();
	const uploadS3 = s3.upload({
		partSize: 5 * 1024 * 1024,
		...params
	});

	const awsS3Response = await uploadS3.promise();
	return awsS3Response.Location;
};

module.exports = { uploadFile };
