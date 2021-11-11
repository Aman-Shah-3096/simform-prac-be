const TAG = 'User';

module.exports = {
	'/api/user/{userId}': {
		put: {
			tags: [TAG],
			description: 'API for updating user details',
			security: [
				{
					access_token: []
				}
			],
			parameters: [
				{
					name: 'userId',
					in: 'path',
					description: 'User ID',
					schema: {
						type: 'string'
					},
					style: 'simple',
					example: 'abcd-efgh',
					required: true
				}
			],
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
									example: 'Test',
									require: false
								},
								lastName: {
									type: 'string',
									description: 'Last Name',
									example: 'User',
									require: false
								},
								profileImageUrl: {
									type: 'string',
									description: 'Profile Image Url',
									example:
										'http://google.com?image=example.png',
									require: false
								}
							}
						}
					}
				}
			},
			responses: {
				200: {
					description: 'User details updated successfully',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								$ref: '#/components/schemas/200'
							}
						}
					}
				},
				403: {
					description: 'Action forbidden',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								$ref: '#/components/schemas/403'
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
