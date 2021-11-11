const express = require('express');
const router = express.Router();

const {
	joiValidatorMiddleware
} = require('../middlewares/joiValidator.middleware');
const authMiddleware = require('../middlewares/auth');
const { updateUserApiSchema } = require('../validators/register');
const userApi = require('../api/user');

router.put(
	'/:userId',
	authMiddleware.authenticateJWT,
	joiValidatorMiddleware(updateUserApiSchema),
	userApi.updateUser
);

module.exports = router;
