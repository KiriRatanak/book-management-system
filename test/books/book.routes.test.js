/* eslint-disable no-console */
/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../../index')
const mongodb = require('../../mongoDB')
const config = require('../../common/config/env.config')
const ENDPOINT = config.appEndpoint + config.version

/*=================TEST VALUES====================*/
const limit = 10
const page = 0
exports.testParams = `limit=${limit}&page=${page}`
/*================================================*/

describe('acessing the root path', () => {
	test('it should respond with status code 200', async () => {
		await request(app)
			.get(`${ENDPOINT}/`)
			.expect(200)
	})
})

describe('testing various requests of the application', () => {
	/*Create database connection */
	beforeAll(() => {
		mongodb.connect()
	})

	/*===========================================================================
	POST & DELETE REQUEST: Create new book and Delete the book at the same time
	===========================================================================*/
	test('it should create new book with required keys only', async () => {
		const newBook = {
			'title': 'Thr3e',
			'author': 'Ted Dekker',
			'genres': ['thriller','crime','horror']
		}
		const res = await request(app)
			.post(`${ENDPOINT}/book`)
			.send(newBook)
		const testID = res.body.book._id

		expect(res.status).toBe(200)

		await request(app)
			.delete(`${ENDPOINT}/book/${testID}`)
			.expect(200)
	}) 
	/*==================END of POST & DELETE REQUEST TESTs:====================*/


	/*===========================================================================
	GET REQUESTS:
	=============================================================================
	1. Get all books test
	2. Get books based on title
	3. Get books based on author
	4. Get books based on publisher
	===========================================================================*/

	/*Retrieve all books*/
	test('it should get the books based on the given limit and page', async () => {
		const res = await request(app).get(`${ENDPOINT}/books?${this.testParams}`)
		const numberOfBooks = res.body.books ? res.body.books.length:0
		expect(numberOfBooks).toBeLessThanOrEqual(limit)
		expect(res.status).toBe(200)
	})

	/*Retrieve book by title*/
	test('it should get the books based on the given title', async () => {
		const testTitle = 'thr3e'
		const testParams = this.testParams + `&title=${testTitle}`
		const res = await request(app).get(`${ENDPOINT}/books?${testParams}`)
		const body = res.body
		const numberOfBooks = body.books ? body.books.length:0
		
		body.books.map((book) => {
			expect(book.title.toLowerCase()).toContain(testTitle)
		})
		expect(numberOfBooks).toBeLessThanOrEqual(limit)
		expect(res.status).toBe(200)
	})

	/*Retrieve book by author*/
	test('it should get the books based on the given author', async () => {
		const testAuthor = 'ted'
		const testParams = this.testParams + `&author=${testAuthor}`
		const res = await request(app).get(`${ENDPOINT}/books?${testParams}`)
		const body = res.body
		const numberOfBooks =  body.books ? body.books.length:0
		
		body.books.map((book) => {
			expect(book.author.toLowerCase()).toContain(testAuthor)
		})
		expect(numberOfBooks).toBeLessThanOrEqual(limit)
		expect(res.status).toBe(200)
	})

	/*Retrieve book by publisher*/
	test('it should get the books based on the given publisher', async () => {
		const testPublisher = 'berkly'
		const testParams = this.testParams + `&publisher=${testPublisher}`
		const res = await request(app).get(`${ENDPOINT}/books?${testParams}`)
		const body = res.body
		const numberOfBooks =  body.books ? body.books.length:0
		
		body.books.map((book) => {
			expect(book.publisher.toLowerCase()).toContain(testPublisher)
		})
		expect(numberOfBooks).toBeLessThanOrEqual(limit)
		expect(res.status).toBe(200)
	})
	/*========================END of GET REQUEST TESTs:========================*/
	

	/*===========================================================================
	PATCH REQUEST: Edit a book based on ID
	===========================================================================*/	
	test('it should change the value of object of the given ID', async () => {
		const resBeforePatch = await request(app).get(`${ENDPOINT}/books?${this.testParams}`)
		const bodyBeforePatch = resBeforePatch.body
		const titleBeforePatch = bodyBeforePatch.books[3].title
		const testID = bodyBeforePatch.books[3]._id
		const testTitle = 'Test'
		const resAfterPatch = await request(app)
			.patch(`${ENDPOINT}/book/${testID}`)
			.send({ 'title': testTitle })
		const bodyAfterPatch = resAfterPatch.body
		const titleAfterPatch = bodyAfterPatch.book.title

		expect(resBeforePatch.status).toBe(200)
		expect(resAfterPatch.status).toBe(200)
		expect(titleAfterPatch).toEqual(testTitle)

		await request(app)
			.patch(`${ENDPOINT}/book/${testID}`)
			.send({ 'title': titleBeforePatch })
	})
	/*======================END of PATCH REQUEST TEST:========================*/

	/*Run after all the test to close the database connection */
	afterAll((done) =>{
		mongodb.disconnect(done)
	})
})


