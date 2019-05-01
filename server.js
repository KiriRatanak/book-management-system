/* eslint-disable no-console */

const mongodb = require('./mongoDB')
const app = require('./index')
const config = require('./common/config/env.config')

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Credentials', 'true')
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
	res.header('Access-Control-Expose-Headers', 'Content-Length')
	res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range')
	if (req.method === 'OPTIONS') {
		return res.send(200)
	} else {
		return next()
	}
})

app.listen(config.PORT,() => {
	console.log(`The books server is up and running on port ${config.PORT} -- Book buying app`)
	mongodb
		.connect()
		.then(() => {
			console.log('Database connected successfully...')
		})
		.catch((err) => {
			console.log(err)
			console.error('Database connection failed...')
		})
})
