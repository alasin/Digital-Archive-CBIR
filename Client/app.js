var express = require('express');
var routes = require('./routes');
var search = require('./routes/search')
var path = require('path');
var fs = require('fs');

var app = express()

/// Include the express body parser
app.configure(function() {
    app.use(express.bodyParser());
});

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', routes.index);
app.post('/search', search.tagSearch);
app.post('/searchImage', search.imageSearch);
app.post('/searchImageDropzone', search.imageSearchDropzone);

var xmlDoc, dummy, elem;
/// Show files
app.get('/uploads/:file', function(req, res) {
    //console.log("Inside fullsize");
    file = req.params.file;
    var img = fs.readFileSync("../Database/fullsize/" + file);
    res.writeHead(200, {
        'Content-Type': 'image/jpg'
    });
    res.end(img, 'binary');
});

app.get('/uploads/thumbs/:file', function(req, res) {
    //console.log("Inside thumbs");
    file = req.params.file;
    var img = fs.readFileSync("../Database/thumbs/" + file);
    res.writeHead(200, {
        'Content-Type': 'image/jpg'
    });
    res.end(img, 'binary');
});

app.listen(8080)
