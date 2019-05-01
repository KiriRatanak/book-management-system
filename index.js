/* eslint-disable no-console */

/*==============================================================================
* TODO: 
* | After the completion of book service, refactor from promises to asyn await 
* |	Creating unit test
==============================================================================*/

/*============================================================================================
* NOTE:
* | The code has been refactored.
* | Previously, the app and the server is in the same file, but now they have been seperated
* | They are seperated because 'jest' only need the app object not the server as well
* DATE: 18-04-2019
============================================================================================*/

const express = require('express')

const app = express()

const UserRouter = require('./books/routes.config')

const bodyParser = require('body-parser')

app.use(bodyParser.json())

UserRouter.routeConfig(app)

module.exports = app