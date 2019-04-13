//Load express
const express = require('express')
const app = express()

const version = 'v1'
const PRE_URL = `/api/${version}`
const BookController = require('./controller/books.controller')
const PORT = 3000

const bodyParser = require('body-parser')

app.use(bodyParser.json())


//Functionalities: add, update, remove, list all, search

app.get(`${PRE_URL}/`,(req,res) => {
    res.send("This is the books buying service version 1.0...")
})


//Create a book
app.post(`${PRE_URL}/book`, [
    BookController.insert
])


//Search & retrieve books methods
app.get(`${PRE_URL}/books`, (req, res) => {
    if(req.query.title) { BookController.getByTitle(req, res) }
    else if(req.query.author) { BookController.getByAuthor(req, res) }
    else if(req.query.publisher) { BookController.getByPublisher(req, res) }
})
    
app.patch(`${PRE_URL}/book/:id`, [
    BookController.patchBookById
])

app.delete(`${PRE_URL}/book/:id`, [
    BookController.removeById
])

app.listen(PORT,() => {
    console.log(`The books server is up and running on port ${PORT} -- Book buying app`)
})

