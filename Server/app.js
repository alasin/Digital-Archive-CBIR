var express = require('express');
var routes = require('./routes');
var path = require('path');
var libxmljs = require("libxmljs");
var fs = require('fs');
var im = require('imagemagick-native');

var app = express()

/// Include the express body parser
app.configure(function() {
    app.use(express.bodyParser());
});

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', routes.index);

var xmlDoc, dummy, elem;

// Post files
app.post('/upload', function(req, res) {

    fs.readFile(req.files.image.path, function(err, data) {
        var imageName = req.files.image.name

        if (!imageName) {
            console.log("There was an error")
            res.redirect("/");
            res.end();

        } else {
            var newPath = "../Database/fullsize/" + imageName;
            var thumbPath = "../Database/thumbs/" + imageName;

            // Write file to Database/fullsize and Database/thumbs folder
            fs.writeFile(newPath, data, function(err) {

                var locationtag = req.body.locationtag.toLowerCase();
                var periodtag = req.body.periodtag.toLowerCase();
                var styletag = req.body.styletag.toLowerCase();
                var themetag = req.body.themetag.toLowerCase();
                var objecttag = req.body.objecttag.toLowerCase();
                var count = 0;

                fs.writeFileSync(thumbPath, im.convert({
                    srcData: fs.readFileSync(newPath),
                    width: 100,
                    height: 100,
                    resizeStyle: 'aspectfill', // is the default, or 'aspectfit' or 'fill'
                    gravity: 'Center' // optional: position crop area when using 'aspectfill'
                }));

                fs.readFile('../Database/tags.xml', 'utf8', function(err, data) {
                    console.log(thumbPath)
                    if (err)
                        throw err;

                    console.log(data);
                    xmlDoc = libxmljs.parseXml(data);
                    var rootnode = xmlDoc.root();
                    elem = new libxmljs.Element(xmlDoc, 'image');
                    dummy = rootnode.addChild(elem);
                    dummy = elem.addChild(new libxmljs.Element(xmlDoc, 'location', locationtag));
                    dummy = elem.addChild(new libxmljs.Element(xmlDoc, 'period', periodtag));
                    dummy = elem.addChild(new libxmljs.Element(xmlDoc, 'style', styletag));
                    dummy = elem.addChild(new libxmljs.Element(xmlDoc, 'theme', themetag));
                    dummy = elem.addChild(new libxmljs.Element(xmlDoc, 'object', objecttag));

                    dummy = elem.addChild(new libxmljs.Element(xmlDoc, 'source', imageName));

                    console.log(xmlDoc.toString());

                    fs.writeFile('../Database/tags.xml', xmlDoc.toString(), function(err) {
                        if (err)
                            throw err;
                        console.log('Updated!');
                    });
                });

                res.redirect("/uploads/" + imageName);
            });
        }
    });
});

/// Show files
app.get('/uploads/:file', function(req, res) {
    file = req.params.file;
    var img = fs.readFileSync("../Database/fullsize/" + file);
    res.writeHead(200, {
        'Content-Type': 'image/jpg'
    });
    res.end(img, 'binary');
});

app.get('/uploads/thumbs/:file', function(req, res) {
    file = req.params.file;
    var img = fs.readFileSync("../Database/thumbs/" + file);
    res.writeHead(200, {
        'Content-Type': 'image/jpg'
    });
    res.end(img, 'binary');
});

app.listen(8080)
