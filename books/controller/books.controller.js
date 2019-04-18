const BookModel = require('../model/books.model')


//check if limit is not 0 and smaller than 100, then return the limit and page number
function checkPage(req) {
    
	//if the limit is > 100 then set it to 10 by default
	let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10
	let page = 0
	if (req.query) {
		if (req.query.page) {
			req.query.page = parseInt(req.query.page)
			page = Number.isInteger(req.query.page) ? req.query.page : 0
		}
	}
	return [limit, page]
}

exports.insert = (req, res) => {
	var newBook = {
		title: req.body.title,
		author: req.body.author,
		numberPages: req.body.numberPages,
		publisher: req.body.publisher,
		lang: req.body.lang,
		quantity: req.body.quantity,
		price: req.body.price
	}

	BookModel.createBook(newBook)
		.then((book) => {
			res.status(200).send({
				success: 'true',
				message: 'New book created successfully!',
				book
			})
		})
		.catch((err) => {
			res.status(400).send({
				success: 'false',
				status: '400',
				message: err
			})
		})
}

exports.list = (req, res) => {
	let pagination = checkPage(req)
	let limit = pagination[0]
	let page = pagination[1]

	BookModel
		.list(limit,page)
		.then((books) => {
			res.status(200).send({
				success: 'true',
				status: 200,
				message: 'books retrieved successfully',
				books: books
			})
		})
		.catch((err) => {
			res.status(400).send({
				success: 'false',
				status: '400',
				message: 'Bad request'
			})
		})
}

exports.getByTitle = (req, res) => {
	let pagination = checkPage(req)
	let limit = pagination[0]
	let page = pagination[1]

	BookModel
		.findByTitle(limit, page, req.query.title)
		.then((books) => {
			res.status(200).send({
				success: 'true',
				status: 200,
				message: 'books retrieved successfully',
				books: books
			})
		})
		.catch((err) => {
			res.status(400).send({
				success: 'false',
				status: '400',
				message: 'Bad request',
				error: err
			})
		})
}

exports.getByAuthor = (req, res) => {
	let pagination = checkPage(req)
	let limit = pagination[0]
	let page = pagination[1]

	BookModel
		.findByAuthor(limit, page, req.query.author)
		.then((books) => {
			res.status(200).send({
				success: 'true',
				status: 200,
				message: 'books retrieved successfully',
				books: books
			})
		})
		.catch((err) => {
			res.status(400).send({
				success: 'false',
				status: '400',
				message: 'Bad request',
				error: err
			})
		})
}

exports.getByPublisher = (req, res) => {
	let pagination = checkPage(req)
	let limit = pagination[0]
	let page = pagination[1]

	BookModel
		.findByPublisher(limit, page, req.query.publisher)
		.then((books) => {
			res.status(200).send({
				success: 'true',
				status: 200,
				message: 'books retrieved successfully',
				books: books
			})
		})
		.catch((err) => {
			res.status(400).send({
				success: 'false',
				status: '400',
				message: 'Bad request',
				error: err
			})
		})
}

exports.patchBookById = (req, res) => {
	var updatedBook = {
		title: req.body.title,
		author: req.body.author,
		numberPages: req.body.numberPages,
		publisher: req.body.publisher,
		lang: req.body.lang,
		quantity: req.body.quantity,
		price: req.body.price
	}

	BookModel
		.patchBook(req.params.id, updatedBook)
		.then((book) => {
			res.status(200).send({
				success: 'true',
				status: 200,
				message: 'updated successfully',
				book: book
			})
		})
		.catch((err) => {
			res.status(400).send({
				success: 'false',
				status: '400',
				message: 'Bad request',
				error: err
			})
		})
}

exports.removeById = (req, res) => {
	BookModel
		.removeById(req.params.id) 
		.then((result) => {
			res.status(200).send({
				success: 'true',
				status: 200,
				message: 'removed successfully',
				book: result
			})
		})
		.catch((err) => {
			res.status(404).send({
				success: 'false',
				status: 404,
				message: 'no book found!',
				error: err
			})
		})
}