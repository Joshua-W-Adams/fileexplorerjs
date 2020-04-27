/*!
 * Express.js Test Server
 * Simple web server to test module on
 * (c) 2020 Joshua Adams
 */

/* ============================== Import Modules ============================ */

const http = require('http');
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const busboy = require('connect-busboy'); //middleware for form/file upload

/* ================================ Variables =============================== */

// environment port required so heroku can assign express a port to run on
const PORT = process.env.PORT || 80;

/* ============================= Private Methods ============================ */

function _getFile(filename, filepath, res) {
	// get file extension
	var ext = path.extname(filename);
	// list of valid file extensions that can be returned to the client.
	var validExtensions = {
		'.html' : 'text/html',
		'.js': 'application/javascript',
		'.css': 'text/css',
		'.txt': 'text/plain',
		'.jpg': 'image/jpeg',
		'.gif': 'image/gif',
		'.png': 'image/png',
		'.woff': 'application/font-woff',
		'.woff2': 'application/font-woff2'
	};
	// MIME = media / content type.
	var mimeType = validExtensions[ext];
	var validMimeType = (mimeType != undefined);
	if (validMimeType) {
		// Reads the entire contents of a file and outputs as a text string
		fs.readFile(filepath + filename, function(err, contents) {
			if(!err) {
				res.setHeader('Content-Length', contents.length);
				res.setHeader('Content-Type', mimeType);
				// 200 = http OK code
				res.statusCode = 200;
				// send the file contents to the client
				res.end(contents);
			} else {
				// 404 = file not found error
				res.writeHead(404);
				res.end();
			}
		});
	} else {
		// 415 = Unsupported Media Type
		res.writeHead(415);
		res.end();
	}
}

/* ============================== Public Methods ============================ */

function init() {
  // Initialise / construct instance of express server
  const app = express();
	// support parsing of binary file data (form) streams
	app.use(busboy());
	// support parsing of application/json type post data
	app.use(bodyParser.json());
	// support parsing of application/x-www-form-urlencoded post data
	app.use(bodyParser.urlencoded({ extended: true }));
  // Create http server to re-direct all HTTP traffic to HTTPS encrypted server
  const httpServer = http.createServer(app).listen(PORT, function() {
      console.log(Date() + ': Web server started at localhost:' + PORT);
  })
  // Configure express.js to serve static files (that dont change).
  // i.e. all files in directories specified below.
  app.use('/', express.static(__dirname + './../../'));
  // Root server path route
  app.get('/', function (req, res) {
    var filename = '/index.html',
        filepath = __dirname;
    // Return the requested file to the client
    _getFile(filename, filepath, res);
  })
	// add additional apis for file system management
	const ftp = require('./api-ftp.js');
	app.use('/api/ftp', ftp.router);
  return httpServer;
}

/* =========================== Export Public APIs =========================== */

module.exports = {
  init
};
