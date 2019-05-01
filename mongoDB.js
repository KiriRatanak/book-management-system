/* eslint-disable linebreak-style */
const mongoose = require('mongoose')
const config = require('./common/config/env.config')
let URI = `mongodb://localhost:27017/${config.DB_NAME}?retryWrites=true`
module.exports = {
	mongoose,
	connect: () => {
		mongoose.Promise = Promise
		return mongoose.connect(URI, {useNewUrlParser: true})
	},
	disconnect: (done) => {
		mongoose.disconnect(done)
	},
}