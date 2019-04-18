/* eslint-disable no-console */
const mongoose = require('mongoose')
const config = require('../../common/config/env.config')

let bookSchema = new mongoose.Schema({
	//Title, author, numberPages, publisher, lang

	title: {
		type: String,
		require: true,
		lowercase: true
	},
	author: {
		type: String,
		require: true,
		lowercase: true
	},
	numberPages: {
		type: Number,
		require: false
	},
	publisher: {
		type: String,
		require: false,
		lowercase: true
	},
	lang: {
		type: String,
		require: false,
		lowercase: true
	},
	quantity: {
		type: Number,
		required: false
	},
	price: {
		type: Number,
		required: false
	}
})

const Book = mongoose.model('Book', bookSchema)

let URI = `mongodb://localhost:27017/${config.DB_NAME}?retryWrites=true`

mongoose
	.connect(URI, {useNewUrlParser: true})
	.then(() => {
		console.log('Database connected successfully...')
	})
	.catch((err) => {
		console.log(err)
		console.error('Database connection failed...')
	})

/*
* these functionalities are exposed to be used by the controller, 
* so the controller don't directly talk to the db
*/
exports.createBook = (bookData) => {
	//create new book instance by passing data to a model
	var book = new Book(bookData)
	return book.save()    
}


/* 
* TODO: 
* - After the completion of book service, refactor from promises to asyn await 
*/

exports.list = (perPage, page) => {
	return new Promise((resolve, reject) => {
		Book
			.find()
			.limit(perPage)
			.skip(perPage * page)
			.exec(function (err, books) {
				if(err) { reject(err) }
				else { resolve(books) }
			})
	})
}

exports.findByTitle = (perPage, page, bookTitle) => {
	return new Promise((resolve, reject) => {
		Book
			.find({ title: {$regex: bookTitle} })
			.limit(perPage)
			.skip(perPage * page)
			.exec(function (err, books) {
				if(err) { reject(err) }
				else { resolve(books) }
			})  
	}) 
}

exports.findByAuthor = (perPage, page, bookAuthor) => {
	return new Promise((resolve, reject) => {
		Book
			.find({ author: {$regex: bookAuthor} })
			.limit(perPage)
			.skip(perPage * page)
			.exec(function (err, books) {
				if(err) { reject(err) }
				else { resolve(books) }
			})  
	}) 
}

exports.findByPublisher = (perPage, page, bookPublisher) => {
	return new Promise((resolve, reject) => {
		Book
			.find({ publisher: {$regex: bookPublisher} })
			.limit(perPage)
			.skip(perPage * page)
			.exec(function (err, books) {
				if(err) { reject(err) }
				else { resolve(books) }
			})
	}) 
}

exports.patchBook = (id, bookData) => {
	return new Promise((resolve, reject) => {
		Book
			.findById(id, function(err, book) {
				if(err) { reject(err) }
				for (let i in bookData) {
					book[i] = bookData[i]
				}
				book
					.save(function(err, updatedBook) {
						if(err) { reject(err) }
						else { resolve(updatedBook) }
					})
			})
	})
}

exports.removeById = (bookId) => {
	return new Promise((resolve, reject) => {
		Book.deleteONe( {_id: bookId}, (err) => {
			if(err) { reject(err) }
			else { resolve(err) }
		})
	})
}