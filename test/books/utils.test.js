/* eslint-disable no-undef */
const req = require('supertest')
const  app = require('../../index')
const config = require('../../common/config/env.config')
// const mongoose = require('mongoose')
const ENDPOINT = config.appEndpoint + config.version
// const URI = `mongodb://localhost:27017/${config.DB_NAME}?retryWrites=true`


describe('acessing the root path', () => {
	test('it should respond with status code 200', async () => {
		const res = await req(app).get(`${ENDPOINT}/`)
		expect(res.status).toBe(200)
	})
})


