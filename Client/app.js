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
//app.post('/searchImage', routes.searchImage);

var xmlDoc, dummy, elem;

// Post files

/*app.post('/upload', function(req, res) {

	fs.readFile(req.files.image.path, function (err, data) {

		var imageName = req.files.image.name

		/// If there's an error
		if(!imageName){

			console.log("There was an error")
			res.redirect("/");
			res.end();

		} else {

		  var newPath = "../Database/fullsize/" + imageName;
		  var thumbPath = "../Database/thumbs/" + imageName;

		  /// write file to uploads/fullsize folder
		  fs.writeFile(newPath, data, function (err) {

		  	var tag1 = req.body.tag1;
		  	var tag2 = req.body.tag2;
			var tag3 = req.body.tag3; 
		  	var tag4 = req.body.tag4;
			var count = 0;
			
			im.resize({
				  srcPath: newPath,
				  dstPath: thumbPath,
				  width:   100,
				  height:  100
				}, function(err, stdout, stderr){
				  if (err) throw err;
				  console.log('resized image to fit within 100x100px');
				});

			
			fs.readFile('../Database/tags.xml', 'utf8', function (err, data) {
			  
			  if (err) 
			    throw err;
			  console.log(data);
			  xmlDoc = libxmljs.parseXml(data);
			  var rootnode = xmlDoc.root();
			  elem = new libxmljs.Element(xmlDoc, 'image');
			  dummy = rootnode.addChild(elem);
			  dummy = elem.addChild(new libxmljs.Element(xmlDoc, 'tag', tag1));
			  dummy = elem.addChild(new libxmljs.Element(xmlDoc, 'tag', tag2));
			  dummy = elem.addChild(new libxmljs.Element(xmlDoc, 'tag', tag3));
			  dummy = elem.addChild(new libxmljs.Element(xmlDoc, 'tag', tag4));
			  dummy = elem.addChild(new libxmljs.Element(xmlDoc, 'source', imageName));
			  			  
			  console.log(xmlDoc.toString());
			  
			  fs.writeFile('../Database/tags.xml', xmlDoc.toString(), function (err) {
			  
			    if (err) 
			      throw err;
			    console.log('Updated!');
			  });
			  
			});
			
			res.redirect("/uploads/" + imageName);
			
		  });
		}
	});
});*/

/// Show files
app.get('/uploads/:file', function (req, res){
	file = req.params.file;
	var img = fs.readFileSync("../Database/fullsize/" + file);
	res.writeHead(200, {'Content-Type': 'image/jpg' });
	res.end(img, 'binary');

});

app.get('/uploads/thumbs/:file', function (req, res){
	file = req.params.file;
	var img = fs.readFileSync("../Database/thumbs/" + file);
	res.writeHead(200, {'Content-Type': 'image/jpg' });
	res.end(img, 'binary');

});


app.listen(8080)