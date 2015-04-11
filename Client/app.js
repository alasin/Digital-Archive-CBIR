var express = require('express');
var routes = require('./routes');
var path = require('path');
var libxmljs = require("libxmljs");
var fs = require('fs');
var im = require('imagemagick');

/*var basex = require('basex');
var s = new basex.Session();

var inputquery = 'for $node in doc("./public/tags.xml")/image return $node';
s.execute("XQUERY for $node in doc('tags.xml')/images/image/tag return $node");
s.close();*/

//var loadXMLdoc = require('./routes/loadXMLdoc');
var app = express()

/// Include the express body parser
app.configure(function () {
  app.use(express.bodyParser());
});

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', routes.index);
app.post('/search', routes.search);
app.post('/searchImage', routes.searchImage);

var xmlDoc, dummy, elem;

/// Show files
app.get('/uploads/:file', function (req, res){
	//console.log("Inside fullsize");
	file = req.params.file;
	var img = fs.readFileSync("../Database/fullsize/" + file);
	res.writeHead(200, {'Content-Type': 'image/jpg' });
	res.end(img, 'binary');

});

app.get('/uploads/thumbs/:file', function (req, res){
	//console.log("Inside thumbs");
	file = req.params.file;
	var img = fs.readFileSync("../Database/thumbs/" + file);
	res.writeHead(200, {'Content-Type': 'image/jpg' });
	res.end(img, 'binary');

});

app.post('/searchImageDropzone', routes.uploadAutoPic);


app.listen(8000)