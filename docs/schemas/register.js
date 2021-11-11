const TAG = 'Register';

module.exports = {
	'/api/register': {
		post: {
			tags: [TAG],
			description: 'API for registering user on portal',
			requestBody: {
				description: 'request body',
				content: {
					'application/json': {
						schema: {
							type: 'object',
							properties: {
								firstName: {
									type: 'string',
									description: 'First Name',
									example: 'Test'
								},
								lastName: {
									type: 'string',
									description: 'Last Name',
									example: 'User'
								},
								email: {
									type: 'string',
									description: 'Email ID',
									example: 'user@gmail.com'
								},
								password: {
									type: 'string',
									description: 'Password',
									example: 'user123'
								},
								profileImageUrl: {
									type: 'string',
									description: 'Profile Image Url',
									example:
										'http://google.com?image=example.png'
								}
							}
						}
					}
				}
			},
			responses: {
				201: {
					description: 'Registered successfully',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								$ref: '#/components/schemas/201'
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
