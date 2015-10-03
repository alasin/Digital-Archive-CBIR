exports.search = function(req, res) {
  	var count = 0;
	var tagCount;
	var tagValue;
	//var tagsArray = new Array();
	var resultArray = new Array();

	var string = req.body.searchBox;
	string = string.toLowerCase();
	var splitstring = string.split(' ');
	console.log(splitstring);
	res.end();

	/*console.log("Tags searched: " + res);

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

		console.log("Total " + count + " relevant images were found");*/
};
