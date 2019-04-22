/* eslint-disable no-console */
/* eslint-disable no-undef */
const request = require('supertest')
const  app = require('../../index')
const config = require('../../common/config/env.config')
const BookController = require('../../books/controller/books.controller')
// const mongoose = require('mongoose')
const ENDPOINT = config.appEndpoint + config.version
// const URI = `mongodb://localhost:27017/${config.DB_NAME}?retryWrites=true`


describe('acessing the root path', () => {
	test('it should respond with status code 200', async () => {
		const res = await request(app).get(`${ENDPOINT}/`)
		expect(res.status).toBe(200)
	})
})

describe('create a new book', () => {
	test('it should create new book with required keys only', async () => {
		const newBook = {
			'title': 'Thr3e',
			'author': 'Ted Dekker',
			'genres': ['thriller','crime','horror']
		}
		
		const response = await request(app).post(`${ENDPOINT}/book`, () => {
			var req = {
				body : {newBook}
			}
			var res = {}
			BookController.insert(req,res)
		})

		expect(response.status).toBe(200)
		

	})
})


