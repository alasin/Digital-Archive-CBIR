var fs = require('fs');
var pythonshell = require('python-shell');
var tempFile = require('tmp');


exports.searchImage = function(req, res)
{
  console.log(req.files.image.path)
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
	  
	  tempFile.file({ template: '/home/kamikaze/Digital_Archive/Client/temp/tmp-XXXXXX.jpg' }, function _tempFileCreated(err, path, fd)
	  {
	      if (err) 
		  throw err;
	      
	      fs.writeFile(path, data, function (err)
	      {
		  //console.log("Temp File created");
		  if(err)
		      throw err;
	      });
	  });
	  
	  var newPath = "temp/" + imageName;
	  var tempPath = "/home/kamikaze/Digital_Archive/Client/" + newPath;
	  fs.writeFile(newPath, data, function (err)
	  {
	      //console.log("Temp File created");
	      if(err)
		  throw err;
	      
	      
	  });
	  
	  var options = 
	  {
	      mode: 'text',
	      scriptPath: '/home/kamikaze/Digital_Archive',
	      args: ['/home/kamikaze/Digital_Archive/Database', '/home/kamikaze/Digital_Archive/Database/color.xml', tempPath]
	  }
	  
	  pythonshell.run('search.py', options, function(err, results) 
	  {
	      if (err)
		  throw err;
	      
	      //console.log('results: %j', results);
	      for(var i=0; i<results.length; i++)
	      {
		  associativeArray[results[i]] = i;
	      }
	      
	      console.log(associativeArray);
	      res.send(results);
	  });
      }
      
  });
  
}

exports.searchImageDropzone = function(req, res)
{
  console.log(req.files.file.path)
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
	  
	  tempFile.file({ template: '/home/kamikaze/Digital_Archive/Client/temp/tmp-XXXXXX.jpg' }, function _tempFileCreated(err, path, fd)
	  {
	      if (err) 
		  throw err;
	      
	      fs.writeFile(path, data, function (err)
	      {
		  //console.log("Temp File created");
		  if(err)
		      throw err;
	      });
	  });
	  
	  var newPath = "temp/" + imageName;
	  var tempPath = "/home/kamikaze/Digital_Archive/Client/" + newPath;
	  fs.writeFile(newPath, data, function (err)
	  {
	      //console.log("Temp File created");
	      if(err)
		  throw err;
	      
	      
	  });
	  
	  var options = 
	  {
	      mode: 'text',
	      scriptPath: '/home/kamikaze/Digital_Archive',
	      args: ['/home/kamikaze/Digital_Archive/Database', '/home/kamikaze/Digital_Archive/Database/color.xml', tempPath]
	  }
	  
	  pythonshell.run('search.py', options, function(err, results) 
	  {
	      if (err)
		  throw err;
	      
	      //console.log('results: %j', results);
	      for(var i=0; i<results.length; i++)
	      {
		  associativeArray[results[i]] = i;
	      }
	      
	      console.log(associativeArray);
	      res.send(results);
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
	string = string.toLowerCase();
	var splitstring = string.split(' ');
	console.log(splitstring);
	var basex = require('basex');
	var log = require("../node_modules/basex/debug");

	 // create session
	var session = new basex.Session();
	basex.debug_mode = false;
	// create query instance
	
	var inputquery = 'declare variable $stringList as xs:string external;' + 'for $node in doc("/home/kamikaze/Digital_Archive/Database/tags.xml")/images/image where $node/tag=tokenize($stringList, " ") return $node/source/text()';
	//var secondquery = 'for $img in (for $node in doc("/home/kamikaze/Digital_Archive/Database/colornew.xml")/images/item return $node)/image/item[type="str"] return ($img/image/item/text())';
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
		
};
