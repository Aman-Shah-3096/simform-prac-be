const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const registerRoutes = require('./registerRoutes');
const resetPassRoutes = require('./resetPassRoutes');
const userRoutes = require('./userRoutes');
const uploadRoutes = require('./uploadRoutes');

router.use('/', authRoutes);

router.use('/', registerRoutes);

router.use('/reset-pass', resetPassRoutes);

router.use('/user', userRoutes);

router.use('/upload', uploadRoutes);

module.exports = router;
