const express = require('express');
const router = express.Router();

const {
	joiValidatorMiddleware
} = require('../middlewares/joiValidator.middleware');
const { loginApiSchema } = require('../validators/auth');
const authMiddleware = require('../middlewares/auth');
const authApi = require('../api/auth');

router.post(
	'/login',
	authMiddleware.authenticateRequest,
	joiValidatorMiddleware(loginApiSchema),
	authApi.authUser
);

router.get('/logout', authMiddleware.authenticateJWT, authApi.logoutUser);

module.exports = router;
