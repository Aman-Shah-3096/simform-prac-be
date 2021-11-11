const bcrypt = require('bcrypt');
const logger = require('../utils/logger');

// Hashes the password
const encryptPassword = async (password) => {
	try {
		const salt = await bcrypt.genSalt(10);
		return bcrypt.hash(password, salt);
	} catch (error) {
		logger.log('ERROR: ', error);
		return null;
	}
};

// Verifies the hash password with plain password
const verifyPassword = async (password, hash) => {
	try {
		return bcrypt.compare(password, hash);
	} catch (error) {
		logger.log('ERROR: ', error);
		return null;
	}
};

module.exports = { encryptPassword, verifyPassword };
