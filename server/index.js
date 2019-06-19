// 3rd party modules.
let express = require('express');
let bodyParser = require("body-parser");
let mongoose = require('mongoose');
let server = express();

// App modules.
const authTokenHttpRequestInterceptor = require("./http-interceptor/auth-token.http-request-interceptor");
// const mockDataHttpRequestInterceptor = require("./http-interceptor/mock-data.http-request-interceptor");
const authController = require("./auth/auth.controller");
const util = require("./util");
const config = require("./config.json");
let apiRoutes = require('./api-routes');

// Create the json-server and provide it our database file so it can create
// API routes to access our in-memory data.

mongoose.connect('mongodb://localhost/youtube');

var db = mongoose.connection;
mongoose.Promise = Promise;

server.use('/api', apiRoutes);

// Setup express request body parsing.
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

// Add a security filter to intercept and inspect requests for valid tokens.
server.use(authTokenHttpRequestInterceptor.intercept);

// Delay all mock data request.
// server.use(mockDataHttpRequestInterceptor.intercept);

// API routes.
server.use("/api/auth", authController);

// Start the server.
server.listen(config.port, () => {
  util.consoleReset();
  console.log(`----------------------------------------------------------------------`);
  console.log(`Running Auth API Server on: http://localhost:${config.port}`);
  console.log(`----------------------------------------------------------------------`);
  console.log("\n");
});