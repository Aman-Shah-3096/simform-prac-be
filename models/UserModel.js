const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const logger = require('../utils/logger');
const userSchema = new Schema(
	{
		userId: String,
		firstName: String,
		lastName: String,
		profileImageUrl: String,
		email: {
			type: String,
			unique: true
		},
		password: String,
		isDeleted: { type: Boolean, required: false, default: false },
		deletedAt: { type: Number, required: false, default: null }
	},
	{
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt'
		}
	}
);
const UserModel = mongoose.model('users', userSchema);

UserModel.getUsersCount = async () => {
	try {
		const usersCount = await UserModel.countDocuments();
		return usersCount;
	} catch (error) {
		logger.error(error);
		return null;
	}
};

UserModel.getUsers = async (query = {}, options = {}) => {
	try {
		const users = await UserModel.find(query, {}, options).sort({
			createdAt: -1
		});
		return users;
	} catch (error) {
		logger.error(error);
		return null;
	}
};

UserModel.getUserDetails = async (query) => {
	try {
		const user = await UserModel.findOne(query);
		return user;
	} catch (error) {
		logger.error(error);
		return null;
	}
};

UserModel.saveUserDetails = async (doc) => {
	try {
		const data = await new UserModel(doc);
		await data.save();
		return data;
	} catch (error) {
		logger.error(error);
		return null;
	}
};

UserModel.updateUserDetails = async (query, updateDoc) => {
	try {
		const data = await UserModel.findOneAndUpdate(
			query,
			{
				$set: updateDoc
			},
			{
				new: true
			}
		);
		return data;
	} catch (error) {
		logger.error(error);
		return null;
	}
};

UserModel.deleteUserDetails = async (userId) => {
	try {
		const data = await UserModel.findOneAndUpdate(
			{ userId },
			{
				$set: {
					isDeleted: true,
					deletedAt: Date.now()
				}
			},
			{
				new: true
			}
		);
		return data;
	} catch (error) {
		logger.error(error);
		return null;
	}
};

module.exports = UserModel;
