// Load environment variables
const dotenv = require('dotenv');
dotenv.config();

const { json, urlencoded } = require('body-parser');
const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');
const { readFileSync } = require('fs');
const { Server } = require('http');
const passport = require('passport');
const swaggerJSDoc = require('swagger-jsdoc');
const { serve, setup } = require('swagger-ui-express');
const appConfig = require('./config/appConfig');
const swaggerDocs = require('./docs/swagger');
require('./helpers/basicAuthHelper');
require('./helpers/mongo-conn');
const apiRoutes = require('./router');
const logger = require('./utils/logger');

const app = express();

const env = appConfig.env;
const port = appConfig.port;
const ip = appConfig.ip;

let server;

// configure middlewares
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(
	fileUpload({
		limits: { fileSize: 5 * 1024 * 1024 }
	})
);

app.use(passport.initialize());
app.use(
	'/api-doc',
	serve,
	setup(
		swaggerJSDoc({
			swaggerDefinition: swaggerDocs.swaggerDefinition,
			apis: [`./router/*.js`]
		})
	)
);

app.use('/api', apiRoutes);

if (env === 'local' || env === 'dev') {
	// init http server
	server = Server(app);
} else {
	const privateKey = readFileSync(appConfig.sslCerts.key, 'utf8');
	const certificate = readFileSync(appConfig.sslCerts.cert, 'utf8');
	const sslOptions = { key: privateKey, cert: certificate };

	// init https server
	server = Server(sslOptions, app);
}

// start server
server.listen(port, ip, (err) => {
	if (err) throw new Error();
	logger.info(`Server listening on ${port} at ${ip}`);
});
