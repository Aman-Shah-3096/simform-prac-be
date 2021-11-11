exports.filterUserData = (userData) => {
	return {
		userId: userData.userId,
		firstName: userData.firstName,
		lastName: userData.lastName,
		email: userData.email,
		profileImageUrl: userData.profileImageUrl,
		isDeleted: userData.isDeleted,
		deletedAt: userData.deletedAt,
		createdAt: userData.createdAt,
		updatedAt: userData.updatedAt
	};
};
