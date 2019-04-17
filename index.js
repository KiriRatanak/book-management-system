//Load express
const express = require('express')
const app = express()
const config = require('./common/config/env.config')
const UserRouter = require('./books/routes.config')

const bodyParser = require('body-parser')

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

app.use(bodyParser.json())

UserRouter.routeConfig(app)

app.listen(config.PORT,() => {
    console.log(`The books server is up and running on port ${config.PORT} -- Book buying app`)
})