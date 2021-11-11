const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const logger = require('../utils/logger');
const resetPassSchema = new Schema({
	email: String,
	token: String,
	used: {
		type: Boolean,
		default: false
	},
	expiresAt: {
		type: Number
	}
});
const ResetPasswordModel = mongoose.model('resetpasstokens', resetPassSchema);

ResetPasswordModel.getTokenData = async (token) => {
	try {
		const data = await ResetPasswordModel.findOne({ token });
		return data;
	} catch (error) {
		logger.error(error);
		return null;
	}
};

ResetPasswordModel.saveTokenData = async (doc) => {
	try {
		const data = await new ResetPasswordModel(doc);
		await data.save();
		return data;
	} catch (error) {
		logger.error(error);
		return null;
	}
};

ResetPasswordModel.updateTokenData = async (query, updateDoc) => {
	try {
		const data = await ResetPasswordModel.findOneAndUpdate(query, {
			$set: updateDoc
		});
		return data;
	} catch (error) {
		logger.error(error);
		return null;
	}
};

module.exports = ResetPasswordModel;
