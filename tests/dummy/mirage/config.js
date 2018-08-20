export default function() {

	// These comments are here to help you get started. Feel free to delete them.

	/*
	  Config (with defaults).

	  Note: these only affect routes defined *after* them!
	*/

	// this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
	// this.namespace = '';    // make this `/api`, for example, if your API is namespaced
	// this.timing = 400;      // delay for each request, automatically set to 0 during testing

	/*
	  Shorthand cheatsheet:

	  this.get('/posts');
	  this.post('/posts');
	  this.get('/posts/:id');
	  this.put('/posts/:id'); // or this.patch
	  this.del('/posts/:id');

	  http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
	*/

	this.post('/query/hello', (schema, request) => {
		window.console.info(request.requestBody);
		return {
			"data": {
				"type": "hello",
				"id": "1",
				"attributes": {
					"title": "JSON API paints my bikeshed!"
				}
			},

		}
	});

	this.patch('/hellos/:id', (schema, request) => {
		window.console.info(request.requestBody);
		return {
			"data": {
				"type": "hello",
				"id": "1",
				"attributes": {
					"success": "ok"
				}
			},
		}
	})

	this.post('/bmauths/:id', (schema, request) => {
		return {
			"data": {
				"id": "5b7505b68fb8074eb73cecdf",
				"attributes": {
					"token": "978967bee38f4143e971cca697134919"
				},
				"type": "BMAuth",
				"relationships": {
					"phone": {
						"data": {
							"id": "5b7505b68fb8074eb73cece2",
							"type": "BMPhone"
						}
					},
					"profile": {
						"data": {
							"id": "5b7a343d8fb807633402a8d5",
							"type": "BMProfile"
						}
					},
					"wechat": {
						"data": {
							"id": "5b7505b68fb8074eb73cece3",
							"type": "BMWechat"
						}
					}
				}
			},
			"included": [
				{
					"attributes": {
						"name": ""
					},
					"id": "5b7a343d8fb807633402a8d4",
					"relationships": {
						"profiles": {
							"data": null
						}
					},
					"type": "BMCompany"
				},
				{
					"id": "5b7505b68fb8074eb73cece3",
					"attributes": {
						"name": "Alex",
						"openid": "",
						"photo": ""
					},
					"type": "BMWechat"
				},
				{
					"id": "5b7a343d8fb807633402a8d5",
					"attributes": {
						"screenname": "Alex",
						"screenphoto": ""
					},
					"relationships": {
						"company": {
							"data": {
								"id": "5b7a343d8fb807633402a8d4",
								"type": "BMCompany"
							}
						}
					},
					"type": "BMProfile"
				},
				{
					"attributes": {
						"phone": "13720200891"
					},
					"id": "5b7505b68fb8074eb73cece2",
					"type": "BMPhone"
				}
			]
		}
	})

	this.patch('/bmauths/:id', (schema, request) => {
		window.console.info(request.requestBody);
		return {
			"data": {
				"attributes": {
					"success": "ok"
				},
				"id": "5b7505b68fb8074eb73cecdf",
				"type": "bmauth"
			}
		}
	})

	this.get('/bmphones/:id', (schema, request) => {
		return {
			"data": {
				"attributes": {
					"phone": "13720200891"
				},
				"id": "5b7505b68fb8074eb73cece2",
				"type": "bmphone"
			}
		}
	})
}
