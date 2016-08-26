var server = require('http').createServer(serverHandler).listen(3100),
	http = require('http'),
	fs = require('fs'),
	url = require('url'),
	path = require('path'),
	querystring = require('querystring'),
	formidable = require('formidable'),
	util = require('util');

function serverHandler(req, res){
	var pathExt = path.extname(path.basename(req.url));
	var urlSearch = url.parse(req.url).search;

	if (req.method == 'POST') {
		var form = new formidable.IncomingForm();
		form.parse(req, function(err, fields, files) {
			console.log(JSON.stringify(fields));
			res.end(JSON.stringify(fields));
		});
	}

	if (req.url == '/news.json') {
		fs.readFile('.' + req.url, function(err, data) {
			res.end(data);
		});
	}

	if (req.url == '/success.json') {
		fs.readFile('.' + req.url, function(err, data) {
			res.end(data);
		});
	}

	if (url.parse(pathExt).pathname == ".css") {
		fs.readFile('.' + req.url, function(err, data) {
			res.writeHead(200,{
				'Content-Type': 'text/css'
			});
			res.end(data);
		});
	} else if (url.parse(pathExt).pathname == ".js"){
		fs.readFile('.' + req.url, function(err, data) {
			res.writeHead(200,{
				'Content-Type': 'text/javascript'
			});
			res.end(data);
		});
	} else if (url.parse(pathExt).pathname == ".png") {
		fs.readFile('.' + req.url, function(err, data) {
			res.end(data);
		});
	} else if (req.url == "/favicon.ico") {
		res.writeHead(200, {'Content-Type': 'image/x-icon'} );
	} else if (req.url == "/"){
		fs.readFile('index.html','utf-8',function(err, data) {
			res.writeHead(200,{
				'Content-Type': 'text/html; charset = utf-8'
			});
			res.end(data);
		});
	}

	console.log(req);
};







