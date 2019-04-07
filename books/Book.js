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

module.exports = mongoose.model("Book", bookSchema)
