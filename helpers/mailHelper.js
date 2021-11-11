const nodemailer = require('nodemailer');
const appConfig = require('../config/appConfig');
const logger = require('../utils/logger');

// auth
const fromMail = appConfig.mail.fromMail;
const transporter = nodemailer.createTransport({
	service: appConfig.mail.service,
	auth: {
		user: appConfig.mail.user,
		pass: appConfig.mail.password
	}
});

// send email
exports.sendMail = (toMail, subject, body) => {
	return new Promise((resolve, reject) => {
		try {
			// email options
			const mailOptions = {
				from: fromMail,
				to: toMail,
				subject: subject,
				text: body
			};

			transporter.sendMail(mailOptions, (error, response) => {
				if (error) {
					logger.error(error);
					reject(error);
				}
				resolve(response);
			});
		} catch (error) {
			logger.error(error);
			reject(error);
		}
	});
};
