const TAG = 'Upload';

module.exports = {
	'/api/upload': {
		post: {
			tags: [TAG],
			description: 'API for uploading file to s3',
			requestBody: {
				description: 'request body',
				content: {
					'multipart/form-data': {
						schema: {
							type: 'object',
							properties: {
								profileImage: {
									type: 'string',
									description: 'Profile Image Data',
									format: 'binary'
								}
							}
						}
					}
				}
			},
			responses: {
				200: {
					description: 'File uploaded successfully',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								$ref: '#/components/schemas/200'
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
