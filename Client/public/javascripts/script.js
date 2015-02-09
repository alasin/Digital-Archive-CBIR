
function initAll() {
	//console.log(document.getElementById("searchBox").value);
	$.ajax({
	  type: "POST",
	  url: "/search",
	  data: { searchQuery: document.getElementById("searchBox").value}
	})
	  .done(function(data) {
	    //console.log(data);
	    //console.log(data.result);
	    for(var i=0; i<data.result.length;i++)
	    {
	      console.log("Image " + (i+1) + " Location: localhost:8080/uploads/" + data.result[i] + '\n');
	      var dummyId = "image" + (i+1);
	      var dummyLinkId = "link" + (i+1);
	      document.getElementById(dummyId).src= "http://localhost:8080/uploads/thumbs/" + data.result[i];
	      document.getElementById(dummyLinkId).href= "http://localhost:8080/uploads/" + data.result[i];
	    }
	    
	  });
}

function imageSearch() {
  
	$.ajax({
	  type: "POST",
	  url: "/searchImage",
	  data: { searchQuery: document.getElementById("imageFilename").src}
	})
	
	  .done(function(data) {
	    
	    
	    
	  });
}

	/*if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	}
	else {
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e) { }
		}
	}

	if (xhr) {
		xhr.onreadystatechange = settagsArray;
		xhr.open("GET", "tags.xml", true);
		xhr.send(null);
	}
	else {
		alert("Sorry, couldn't create an XMLHttpRequest");
	}
	
	document.getElementById("searchbutton").onclick = settagsArray;
	
}

function settagsArray() {
  if (xhr.readyState == 4) {
    if (xhr.status == 200) {
      if (xhr.responseXML) {
	var count = 0;
	var tagCount;
	var tagValue;
	//var tagsArray = new Array();
	var resultArray = new Array();
	
	var string = document.getElementById('search').value;
	string = string.toLowerCase();
	
	var basex = require('basex');
	var log = require(".../node_modules/basex/debug");

	// create session
	var session = new basex.Session();
	basex.debug_mode = false;
	// create query instance

	var inputquery = 'declare variable $stringList as xs:string external;' + 'for $node in doc("/media/kamikaze/Media/Work/Study/Project_32/Development/public/tags.xml")/images/image where $node/tag=tokenize($stringList, " ") return $node/source';
	
	//var inputquery = 'declare variable $stringList as xs:string external;' + ' return element { $stringList }';
	var query = session.query(inputquery);
	query.bind("stringList", string);

	query.results(log.print);
	
	// close query instance
	query.close();

	// close session
	session.close();

				  
			  
			  
				/*var count = 0;
				var tagCount;
				var tagValue;
				//var tagsArray = new Array();
				var resultArray = new Array();
				var allTags = xhr.responseXML.getElementsByTagName("image");
				var string = document.getElementById('search').value;
				var res = string.split(' ');
				//var print = '';
				string = string.toLowerCase();
				console.log("Tags searched: " + res);
				
				for (var i=0; i<allTags.length; i++) {
				      tagCount = allTags[i].getElementsByTagName("tag").length;
				      				      			      
				      for (var j=0; j<tagCount; j++)
				      {
					tagValue = allTags[i].getElementsByTagName("tag")[j].firstChild;
										
					if (tagValue)
					{
					  for (var k=0; k<res.length; k++)
					  {
					    if (tagValue.nodeValue == res[k]) {
					    resultArray[count] = allTags[i].getElementsByTagName("source")[0].firstChild;
					    var src = resultArray[count].nodeValue;
					    count = count+1;
					    
					    console.log("Image " + count + " Name: " + src);
					    console.log("Image " + count + " Location: localhost:8080/uploads/" + src);
					    				   
					    
					    break;
					    }
					  
					  }
					}
					
				      }
				      
				}
				
				console.log("Total " + count + " relevant images were found");
				
				//document.getElementById("display1").innerHTML = resultArray[0].nodeValue;
				//document.getElementById("display1").href = "localhost:8080/uploads/" + resultArray[0].nodeValue;
				//document.getElementById('display1').target="_blank";
				
				
			}
			
			
		}
		else {
			alert("There was a problem with the request " + xhr.status);
		}
	}
}*/
