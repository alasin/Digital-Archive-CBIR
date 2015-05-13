var fs = require('fs');
var pythonshell = require('python-shell');
//var tempFile = require('tmp');


exports.searchImage = function(req, res)
{
  console.log(req.files.image.path)
  var tempPath = req.files.image.path;
  fs.readFile(req.files.image.path, function (err, data) 
  {
      var response;
      var imageName = req.files.image.name;
      
      //console.log(imageName)
      // If there's an error
    
      if(!imageName)
      {
	  console.log("There was an error")
	  res.redirect("/");
	  res.end();
      } 
      else
      {
	  var associativeArray = {};
	  var associativeArrayFinal = new Array();
	  var finalArray = new Array();
	  
	  /*var newPath = "temp/" + imageName;
	  var tempPath = "../Client/" + newPath;
	  fs.writeFile(newPath, data, function (err)
	  {
	      //console.log("Temp File created");
	      if(err)
		  throw err;
	      
	      
	  });*/
	  
	  var options = 
	  {
	      mode: 'text',
	      scriptPath: '../ColorExtraction',
	      args: ['../Database', '../Database/color.xml', tempPath]
	  }
	  
	  pythonshell.run('search.py', options, function(err, results) 
	  {
	      if (err)
		  throw err;
	      
	      //console.log('results: %j', results);
	      for(var i=0; i<results.length; i++)
		  associativeArray[results[i]] = i;
	     	      
	      console.log(associativeArray);
	      //res.send(results);
	      
	      
	      var options = 
	      {
		mode: 'text',
		scriptPath: '../SIFTExtraction',
		args: ['../Database', tempPath]
	      }
	      
	      pythonshell.run('searchsift.py', options, function(err, results)
	      {
		  if (err)
		    throw err;
		  
		  //console.log('results: %j', results);
		  for(var i=0; i<results.length; i++)
		  {
		      var x = i + associativeArray[results[i]];
		      if ((x-i) >= 0)
			  associativeArrayFinal.push({name: results[i], val: x});
		      else
			  associativeArrayFinal.push({name: results[i], val: 20});	// Hard-coded
		  }
		  
		  associativeArrayFinal.sort(function(a,b) 
		  {
		      return a.val - b.val;
		  });
		  
		  len = associativeArrayFinal.length;
			    
		  for (var j = 0; j < len; j++)
		      finalArray[j] = associativeArrayFinal[j].name;
			
		  console.log(associativeArrayFinal);
		  //console.log(finalArray);
		  res.send(finalArray);
		});
	      
	  });
	  
      }
      
  });
  
}

exports.searchImageDropzone = function(req, res)
{
  console.log(req.files.file.path)
  var tempPath = req.files.file.path;

  fs.readFile(req.files.file.path, function (err, data) 
  {
      var response;
      var imageName = req.files.file.name;
      
      //console.log(imageName)
      // If there's an error
    
      if(!imageName)
      {
	  console.log("There was an error")
	  res.redirect("/");
	  res.end();
      } 
      else
      {
	  var associativeArray = {};
	  var associativeArrayFinal = new Array();
	  var finalArray = new Array();
	  
	  /*var newPath = "temp/" + imageName;
	  var tempPath = "../Client/" + newPath;
	  fs.writeFile(newPath, data, function (err)
	  {
	      //console.log("Temp File created");
	      if(err)
		  throw err;
	      
	      
	  });*/
	  
	  var options = 
	  {
	      mode: 'text',
	      scriptPath: '../ColorExtraction',
	      args: ['../Database', '../Database/color.xml', tempPath]
	  }
	  
	  pythonshell.run('search.py', options, function(err, results) 
	  {
	      if (err)
		  throw err;
	      
	      //console.log('results: %j', results);
	      for(var i=0; i<results.length; i++)
		  associativeArray[results[i]] = i;
	     	      
	      console.log(associativeArray);
	      //res.send(results);
	      
	      
	      var options = 
	      {
		mode: 'text',
		scriptPath: '../SIFTExtraction',
		args: ['../Database', tempPath]
	      }
	      
	      pythonshell.run('searchsift.py', options, function(err, results)
	      {
		  if (err)
		    throw err;
		  
		  //console.log('results: %j', results);
		  for(var i=0; i<results.length; i++)
		  {
		      var x = i + associativeArray[results[i]];
		      if ((x-i) >= 0)
			  associativeArrayFinal.push({name: results[i], val: x});
		      else
			  associativeArrayFinal.push({name: results[i], val: 20});	// Hard-coded
		  }
		  
		  associativeArrayFinal.sort(function(a,b) 
		  {
		      return a.val - b.val;
		  });
		  
		  len = associativeArrayFinal.length;
			    
		  for (var j = 0; j < len; j++)
		      finalArray[j] = associativeArrayFinal[j].name;
			
		  console.log(associativeArrayFinal);
		  //console.log(finalArray);
		  res.send(finalArray);
		});
	      
	  });
	  
	  
      }
      
  });
  
}
    
exports.index = function(req, res){
  res.render('index');
};

exports.search = function(req, res){
  	var count = 0;
	var tagCount;
	var tagValue;
	//var tagsArray = new Array();
	var resultArray = new Array();
	//console.log(req.body);
	var string = req.body.searchQuery;
	var searchType = req.body.searchType;
	console.log(searchType);
	string = string.toLowerCase();
	var splitstring = string.split(' ');
	console.log(splitstring);
	var basex = require('basex');
	var log = require("../node_modules/basex/debug");

	 // create session
	var session = new basex.Session();
	basex.debug_mode = false;
	// create query instance
	
	var inputquery = 'declare variable $stringList as xs:string external;' + 'declare variable $searchTag as xs:string external;' + 'for $node in doc("/home/kamikaze/Digital_Archive/Database/tags.xml")/images/image where $node/'+ searchType + '=tokenize($stringList, " ") return $node/source/text()';
	//var inputquery = 'declare variable $stringList as xs:string external;' + 'for $node in doc("/home/kamikaze/Digital_Archive/Database/tags.xml")/images/image where $node/tag=tokenize($stringList, " ") return $node/source/text()';
	//var secondquery = 'for $img in (for $node in doc("/home/kamikaze/Digital_Archive/Database/colornew.xml")/images/item return $node)/image/item[type="str"] return ($img/image/item/text())';
	//var inputquery = 'declare variable $stringList as xs:string external;' + ' return element { $stringList }';
	var query = session.query(inputquery);
	query.bind("stringList", string);
	query.bind("searchTag", searchType);

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
		
};
