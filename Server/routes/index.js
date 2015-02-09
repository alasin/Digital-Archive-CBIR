
exports.index = function(req, res){
  res.render('index');
};

/*exports.search = function(req, res){
  	var count = 0;
	var tagCount;
	var tagValue;
	//var tagsArray = new Array();
	var resultArray = new Array();
	//console.log(req.body);
	var string = req.body.searchQuery;
	string = string.toLowerCase();
	var splitstring = string.split(' ');
	console.log(splitstring);
	var basex = require('basex');
	var log = require("../node_modules/basex/debug");

	 // create session
	var session = new basex.Session();
	basex.debug_mode = false;
	// create query instance
	
	var inputquery = 'declare variable $stringList as xs:string external;' + 'for $node in doc("/home/kamikaze/Development/public/tags.xml")/images/image where $node/tag=tokenize($stringList, " ") return $node/source/text()';
	
	//var inputquery = 'declare variable $stringList as xs:string external;' + ' return element { $stringList }';
	var query = session.query(inputquery);
	query.bind("stringList", string);

	//var result = query.results(log.print);
	
	var resultArray = query.results(function(err, resultArray){
	  if (err) {
	    console.log("Error: " + err);
	  } else {
	    res.send(resultArray);
	    console.log(resultArray);
	  }  
	  	  
	});
		
	// close query instance
	query.close();

	// close session
	session.close();

	//res.end();
		
};*/


