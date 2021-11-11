const express = require('express');
const router = express.Router();

const uploadApi = require('../api/upload');

router.post('/', uploadApi.uploadToS3);

module.exports = router;
