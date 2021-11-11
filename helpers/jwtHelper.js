const jwt = require('jsonwebtoken');
const appConfig = require('../config/appConfig');

// verify jwt
exports.verifyJWT = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(
			token,
			appConfig.session_secret,
			function (err, decoded) {
				if (err) return reject(err);
				resolve(decoded);
			}
		);
	});
};

// sign a jwt
exports.signJWT = (payload) => {
	return new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			appConfig.session_secret,
			{ algorithm: 'HS256' },
			(err, token) => {
				if (err) return reject(err);
				resolve(token);
			}
		);
	});
};
