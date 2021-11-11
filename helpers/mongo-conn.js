const mongoose = require('mongoose');
const logger = require('../utils/logger');
const appConfig = require('../config/appConfig');

const mongoConfig = appConfig.mongo;

mongoose.Promise = global.Promise;
let mongoString = `mongodb://`;

if (mongoConfig.username)
	mongoString += `${mongoConfig.username}:${mongoConfig.password}@${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.db}`;
else mongoString += `${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.db}`;

// connect to mongo db
mongoose
	.connect(mongoString, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	})
	.then(
		async () => {
			logger.info(`Mongo connected successfully.`);
		},
		(err) => {
			logger.error('Error while connecting to Mongo', err);
		}
	)
	.catch((err) => logger.error(err));
