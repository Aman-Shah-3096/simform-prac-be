const TAG = 'Auth';

module.exports = {
	'/api/login': {
		post: {
			tags: [TAG],
			description: 'API for logging in to portal',
			requestBody: {
				description: 'credentials',
				content: {
					'application/json': {
						schema: {
							type: 'object',
							properties: {
								email: {
									type: 'string',
									description: 'Registered Email ID',
									example: 'user@gmail.com'
								},
								password: {
									type: 'string',
									description: 'Password',
									example: 'user123'
								}
							}
						}
					}
				}
			},
			responses: {
				200: {
					description: 'Login successful',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								$ref: '#/components/schemas/200'
							}
						}
					}
				},
				401: {
					description: 'Authentication failed',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								$ref: '#/components/schemas/401'
							}
						}
					}
				},
				500: {
					description: 'Internal server error',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								$ref: '#/components/schemas/500'
							}
						}
					}
				}
			}
		}
	},
	'/api/logout': {
		get: {
			tags: [TAG],
			description: 'API for logging out from portal',
			security: [
				{
					access_token: []
				}
			],
			responses: {
				200: {
					description: 'Logout successful',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								$ref: '#/components/schemas/200'
							}
						}
					}
				},
				401: {
					description: 'Authentication failed',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								$ref: '#/components/schemas/401'
							}
						}
					}
				},
				500: {
					description: 'Internal server error',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								$ref: '#/components/schemas/500'
							}
						}
					}
				}
			}
		}
	}
};
