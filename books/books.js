//Load express
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Book = require('./Book.js')

const version = 'v1'
const PRE_URL = `/api/${version}`

const PORT = 3000

app.use(bodyParser.json())

//Load mongoose
const mongoose = require('mongoose')
mongoose
    .connect('mongodb+srv://buy-book-admin:root1234@cluster0-khtqt.mongodb.net/books_storage?retryWrites=true', {useNewUrlParser: true})
    .then(() => {
        console.log('Database connected successfully...')
    })
    .catch((err) => {
        console.error('Database connection failed...')
    })


//Functionalities: add, update, remove, list all, search

app.get(`${PRE_URL}/`,(req,res) => {
    res.send("This is the books buying service version 1.0...")
})


//Create a book
app.post(`${PRE_URL}/book`, (req, res) => {
    var newBook = {
        title: req.body.title,
        author: req.body.author,
        numberPages: req.body.numberPages,
        publisher: req.body.publisher,
        lang: req.body.lang,
        quantity: req.body.quantity,
        price: req.body.price
    }

    //create new book instance by passing data to a model
    var book = new Book(newBook)
    book
        .save()
        .then(() => { console.log("New book created!") })
        .catch((err) => { if(err) {throw err} })

    res.status(200).send({
        success: 'true',
        message: 'New book created successfully!',
        book
     })
    
})


//Search & retrieve books methods
app.get(`${PRE_URL}/books`, (req,res) => {

    let isTitle = false
    let isAuthor = false
    let isPublisher = false
    let isAll = true

    let author = req.query.author
    let title = req.query.title
    let publisher = req.query.publisher
       
    if (author != undefined) {
        isAuthor = true
        searchByAuthor(req,res,author) 
    }

    if (title != undefined) {
        isTitle = true
        searchByTitle(req,res,title)
    }

    if (publisher != undefined) {
        isPublisher = true
        searchByPublisher(req,res,publisher)
    }
    
    isAll = !(isTitle || isAuthor || isPublisher)

    console.log(isAll)

    if (isAll) {
        Book
        .find()
        .then((books) => {
            console.log(books)
            res.status(200).send({
                success: 'true',
                message: 'books retrieved successfully',
                books: books
            })
        })
        .catch((err) => { if(err) {throw err} }) 
    }  
})

//Retreive books based on title
function searchByTitle(req,res,title) {
    Book
        .find({ title: {$regex: title} })
        .then((books) => {
            if(books) { 
                res.status(200).send({
                    success: 'true',
                    message: 'books found',
                    books: books
                })
            }
            else { res.send('No book found!') }
        })
        .catch((err) => { console.log(err) })
}

// Retreive books based on author
function searchByAuthor (req,res,author) {
    Book
        .find({ author: {$regex: author} })
        .then((book) => {
            if(book != null) { res.json(book) }
            else { res.send('No book found!') }
        })
        .catch((err) => { console.log(err) })
}

// Retrieve books based on publisher
function searchByPublisher(req,res,publisher) {
    Book
        .find({ publisher: {$regex:publisher} })
        .then((book) => {
            if(book) { res.json(book) }
            else { res.send('No book found!') }
        })
        .catch((err) => { console.log(err) })
}

app.listen(PORT,() => {
    console.log(`The books server is up and running on port ${PORT} -- Book buying app`)
})

