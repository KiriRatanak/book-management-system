const mongoose = require("mongoose")

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

const Book = mongoose.model("Book", bookSchema)

const password = 'root1234'

let URI = `mongodb+srv://buy-book-admin:${password}@cluster0-khtqt.mongodb.net/test?retryWrites=true`


mongoose
    .connect(URI, {useNewUrlParser: true})
    .then(() => {
        console.log('Database connected successfully...')
    })
    .catch((err) => {
        console.log(err)
        console.error('Database connection failed...')
    })

exports.createBook = (bookData) => {
    //create new book instance by passing data to a model
    var book = new Book(bookData)
    return book
                .save()
                .then(() => { console.log("New book created!") })
                .catch((err) => { if(err) {throw err} })    
}

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
        Book.remove( {_id: bookId}, (err) => {
            if(err) { reject(err) }
            else { resolve(err) }
        })
    })
}