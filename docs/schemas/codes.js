module.exports = {
	200: {
		type: 'object',
		properties: {
			isError: {
				type: 'boolean',
				description: 'Indicates whether an error has occured or not',
				example: false
			},
			message: {
				type: 'string',
				description: 'Response message',
				example: 'Success'
			},
			data: {
				type: 'array',
				description: 'Response data',
				example: []
			}
		}
	},
	201: {
		type: 'object',
		properties: {
			isError: {
				type: 'boolean',
				description: 'Indicates whether an error has occured or not',
				example: false
			},
			message: {
				type: 'string',
				description: 'Response message',
				example: 'Resource created'
			},
			data: {
				type: 'array',
				description: 'Response data',
				example: []
			}
		}
	},
	400: {
		type: 'object',
		properties: {
			isError: {
				type: 'boolean',
				description: 'Indicates whether an error has occured or not',
				example: true
			},
			message: {
				type: 'string',
				description: 'Response message',
				example: 'Bad Request'
			}
		}
	},
	401: {
		type: 'object',
		properties: {
			isError: {
				type: 'boolean',
				description: 'Indicates whether an error has occured or not',
				example: true
			},
			message: {
				type: 'string',
				description: 'Response message',
				example: 'Authentication failed'
			}
		}
	},
	403: {
		type: 'object',
		properties: {
			isError: {
				type: 'boolean',
				description: 'Indicates whether an error has occured or not',
				example: true
			},
			message: {
				type: 'string',
				description: 'Response message',
				example: 'Forbidden'
			}
		}
	},
	404: {
		type: 'object',
		properties: {
			isError: {
				type: 'boolean',
				description: 'Indicates whether an error has occured or not',
				example: true
			},
			message: {
				type: 'string',
				description: 'Response message',
				example: 'Resource not found'
			}
		}
	},
	500: {
		type: 'object',
		properties: {
			isError: {
				type: 'boolean',
				description: 'Indicates whether an error has occured or not',
				example: true
			},
			message: {
				type: 'string',
				description: 'Response message',
				example: 'Internal server error'
			}
		}
	}
};
