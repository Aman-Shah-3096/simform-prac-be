module.exports = {
	env: process.env.ENVIRONMENT,
	session_secret: process.env.SESSION_SECRET,
	ip: process.env.HOST,
	port: process.env.PORT,
	appHost: process.env.APP_HOST,

	// SSL configurations
	sslCerts: {
		key: '',
		cert: ''
	},

	// Mongo configurations
	mongo: {
		db: process.env.MONGO_DB,
		host: process.env.MONGO_HOST,
		port: process.env.MONGO_PORT,
		username: process.env.MONGO_USERNAME,
		password: process.env.MONGO_PASSWORD
	},

	// Mail configurations
	mail: {
		service: process.env.MAIL_SERVICE,
		user: process.env.MAIL_USER,
		password: process.env.MAIL_PASSWORD,
		fromMail: process.env.MAIL_FROM
	},

	// AWS configurations
	aws: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		region: process.env.AWS_REGION,

		// s3 config
		s3: {
			bucketName: process.env.AWS_S3_BUCKETNAME
		}
	}
};
