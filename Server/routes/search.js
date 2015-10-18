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
};
