const URL = require('url');
const appConfig = require('../config/appConfig');

// Parse url and set query in req.query
exports.ParseQueryStringMiddleware = (req, res, next) => {
	const env = appConfig.env;
	const port = appConfig.port;
	const ip = appConfig.ip;
	const baseUrl = `${
		env === 'local' || env === 'dev' ? 'http' : 'https'
	}://${ip}:${port}`;

	const url = new URL(req.url, baseUrl);
	const queryParams = new URLSearchParams(url.search);
	req.query = queryParams;

	next();
};
