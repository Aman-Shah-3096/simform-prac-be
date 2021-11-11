const request = require('request');

module.exports = {
	get: function (url, queryParams, headers) {
		const getOptions = {
			method: 'GET',
			url: url,
			qs: queryParams,
			headers: headers
		};
		return new Promise((resolve, reject) => {
			request(getOptions, function (error, response, body) {
				if (error) {
					reject(error);
				}
				resolve(body);
			});
		});
	},

	post: function (url, requestBody, headers, isJSON) {
		const postOptions = {
			method: 'POST',
			url: url,
			headers: headers,
			json: isJSON
		};

		isJSON
			? (postOptions.body = requestBody)
			: (postOptions.form = requestBody);

		return new Promise((resolve, reject) => {
			request(postOptions, function (error, response, body) {
				if (error) {
					reject(error);
				}
				resolve(body);
			});
		});
	},

	delete: function (url, queryParams, headers) {
		const deleteOptions = {
			method: 'DELETE',
			url: url,
			qs: queryParams,
			headers: headers
		};
		return new Promise((resolve, reject) => {
			request(deleteOptions, function (error, response, body) {
				if (error) {
					reject(error);
				}
				resolve(body);
			});
		});
	}
};
