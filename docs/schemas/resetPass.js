const TAG = 'Reset Password';

module.exports = {
	'/api/reset-pass/{token}': {
		get: {
			tags: [TAG],
			description: 'API for getting reset token data',
			security: [
				{
					access_token: []
				}
			],
			parameters: [
				{
					name: 'token',
					in: 'path',
					description: 'reset token',
					schema: {
						type: 'string'
					},
					style: 'simple',
					example: 'abcd-efgh',
					required: true
				}
			],
			responses: {
				200: {
					description: 'Success',
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
	'/api/reset-pass': {
		post: {
			tags: [TAG],
			description: 'API for generating and sending reset link.',
			security: [
				{
					access_token: []
				}
			],
			requestBody: {
				description: 'request body',
				content: {
					'application/json': {
						schema: {
							type: 'object',
							properties: {
								email: {
									type: 'string',
									description: 'Email ID',
									example: 'user@gmail.com',
									required: true
								}
							}
						}
					}
				}
			},
			responses: {
				200: {
					description: 'Success',
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
		},
		put: {
			tags: [TAG],
			description: 'API for resetting password.',
			security: [
				{
					access_token: []
				}
			],
			requestBody: {
				description: 'request body',
				content: {
					'application/json': {
						schema: {
							type: 'object',
							properties: {
								token: {
									type: 'string',
									description: 'Reset token',
									example: 'abcd-efgh',
									required: true
								},
								email: {
									type: 'string',
									description: 'Email ID',
									example: 'user@gmail.com',
									required: true
								},
								newPassword: {
									type: 'string',
									description: 'New password',
									example: 'user@123',
									required: true
								}
							}
						}
					}
				}
			},
			responses: {
				200: {
					description: 'Success',
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
