const config = require('../common/config/env.config')
const BookController = require('./controller/books.controller')
const ENDPOINT = config.appEndpoint + config.version

exports.routeConfig = (app) => {

	app.get(`${ENDPOINT}/`,(req,res) => {
		res.send('This is the books buying service version 1.0...')
	})

	//Create a book
	app.post(`${ENDPOINT}/book`, [
		BookController.insert
	])

	//Search & retrieve books methods
	app.get(`${ENDPOINT}/books`, (req, res) => {
		if(req.query.title) { BookController.getByTitle(req, res) }
		else if(req.query.author) { BookController.getByAuthor(req, res) }
		else if(req.query.publisher) { BookController.getByPublisher(req, res) }
		else { BookController.list(req, res) }
	})
		
	app.patch(`${ENDPOINT}/book/:id`, [
		BookController.patchBookById
	])

	app.delete(`${ENDPOINT}/book/:id`, [
		BookController.removeById
	])
}


