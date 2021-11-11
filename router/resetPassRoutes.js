const express = require('express');
const router = express.Router();

const {
	joiValidatorMiddleware
} = require('../middlewares/joiValidator.middleware');
const {
	saveTokenApiSchema,
	resetPasswordApiSchema
} = require('../validators/resetPassword');

const resetPassApi = require('../api/resetPass');

router.get('/:token', resetPassApi.getTokenData);

router.post(
	'/',
	joiValidatorMiddleware(saveTokenApiSchema),
	resetPassApi.saveTokenData
);

router.put(
	'/',
	joiValidatorMiddleware(resetPasswordApiSchema),
	resetPassApi.resetPassword
);

module.exports = router;
