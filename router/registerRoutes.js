const express = require('express');
const router = express.Router();

const {
	joiValidatorMiddleware
} = require('../middlewares/joiValidator.middleware');
const { registerApiSchema } = require('../validators/register');
const registerApi = require('../api/register');

router.post(
	'/register',
	joiValidatorMiddleware(registerApiSchema),
	registerApi.registerUser
);

module.exports = router;
