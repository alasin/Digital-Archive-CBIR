function locationSearch() {
	//console.log(document.getElementById("searchBox").value);
	$.ajax({
	  type: "POST",
	  url: "/search",
	  data: { searchQuery: document.getElementById("locationSearchBox").value, searchType: "location"}
	})
	.done(function(data) {
		//console.log(data);
	    //console.log(data.result);
	    for(var i = 0; i < data.result.length; i++) {
	      	console.log("Image " + (i+1) + " Location: localhost:8080/uploads/" + data.result[i] + '\n');
	      	var dummyId = "image" + (i+1);
	      	var dummyLinkId = "link" + (i+1);
	      	document.getElementById(dummyId).src = "http://localhost:8080/uploads/thumbs/" + data.result[i];
	      	document.getElementById(dummyLinkId).href = "http://localhost:8080/uploads/" + data.result[i];
	    }

	    for(var i=data.result.length; i<=11;i++) {
	      	//console.log("Image " + (i+1) + " Location: localhost:8080/uploads/" + data.result[i] + '\n');
	      	var dummyId = "image" + (i+1);
	      	var dummyLinkId = "link" + (i+1);
	      	document.getElementById(dummyId).src = "";
	      	document.getElementById(dummyLinkId).href = "";
	    }
	});
}

function objectSearch() {
	//console.log(document.getElementById("searchBox").value);
	$.ajax({
	  type: "POST",
	  url: "/search",
	  data: { searchQuery: document.getElementById("objectSearchBox").value, searchType: "object"}
	})
	.done(function(data) {
	    //console.log(data);
	    //console.log(data.result);
	    for(var i = 0; i < data.result.length; i++) {
			console.log("Image " + (i+1) + " Location: localhost:8080/uploads/" + data.result[i] + '\n');
			var dummyId = "image" + (i+1);
			var dummyLinkId = "link" + (i+1);
			document.getElementById(dummyId).src = "http://localhost:8080/uploads/thumbs/" + data.result[i];
			document.getElementById(dummyLinkId).href = "http://localhost:8080/uploads/" + data.result[i];
	    }

	    for(var i = data.result.length; i <= 11; i++) {
			//console.log("Image " + (i+1) + " Location: localhost:8080/uploads/" + data.result[i] + '\n');
	      	var dummyId = "image" + (i+1);
	      	var dummyLinkId = "link" + (i+1);
	      	document.getElementById(dummyId).src = "";
	      	document.getElementById(dummyLinkId).href = "";
	    }
	});
}

function themeSearch() {
	//console.log(document.getElementById("searchBox").value);
	$.ajax({
	  type: "POST",
	  url: "/search",
	  data: { searchQuery: document.getElementById("themeSearchBox").value, searchType: "theme"}
	})
	.done(function(data) {
	    //console.log(data);
	    //console.log(data.result);
	    for(var i = 0; i < data.result.length; i++) {
			console.log("Image " + (i+1) + " Location: localhost:8080/uploads/" + data.result[i] + '\n');
			var dummyId = "image" + (i+1);
	      	var dummyLinkId = "link" + (i+1);
	      	document.getElementById(dummyId).src = "http://localhost:8080/uploads/thumbs/" + data.result[i];
	      	document.getElementById(dummyLinkId).href = "http://localhost:8080/uploads/" + data.result[i];
	    }

	    for(var i = data.result.length; i <= 11; i++) {
			//console.log("Image " + (i+1) + " Location: localhost:8080/uploads/" + data.result[i] + '\n');
	      	var dummyId = "image" + (i+1);
	      	var dummyLinkId = "link" + (i+1);
	      	document.getElementById(dummyId).src = "";
	      	document.getElementById(dummyLinkId).href = "";
	    }
	});
}

function styleSearch() {
	//console.log(document.getElementById("searchBox").value);
	$.ajax({
	  type: "POST",
	  url: "/search",
	  data: { searchQuery: document.getElementById("styleSearchBox").value, searchType: "style"}
	})
	.done(function(data) {
	    //console.log(data);
	    //console.log(data.result);
	    for(var i = 0; i < data.result.length; i++) {
			console.log("Image " + (i+1) + " Location: localhost:8080/uploads/" + data.result[i] + '\n');
	      	var dummyId = "image" + (i+1);
	      	var dummyLinkId = "link" + (i+1);
	      	document.getElementById(dummyId).src = "http://localhost:8080/uploads/thumbs/" + data.result[i];
	      	document.getElementById(dummyLinkId).href = "http://localhost:8080/uploads/" + data.result[i];
	    }

	    for(var i = data.result.length; i <= 11; i++) {
			//console.log("Image " + (i+1) + " Location: localhost:8080/uploads/" + data.result[i] + '\n');
	      	var dummyId = "image" + (i+1);
	      	var dummyLinkId = "link" + (i+1);
	      	document.getElementById(dummyId).src = "";
	      	document.getElementById(dummyLinkId).href = "";
	    }
	});
}

function imageSearch() {

	//var formData = new FormData(document.getElementById("form1"));
	var formData = new FormData();
	//console.log(document.getElementById("imageFilename").files.length);
	formData.append("image", document.getElementById("imageFilename").files[0])
	//console.log(formData)
	//console.log("10")
	$.ajax({
	  type: "POST",
	  url: "/searchImage",
	  data: formData,
	  processData: false,
	  contentType: false
	  //data: { searchQuery: document.getElementById("imageFilename").src}
	})
	.done(function(data) {

	    console.log(data);
	    for(var i = 0; i < data.length; i++) {
	      //console.log("Image " + (i+1) + " Location: localhost:8080/uploads/" + data.result[i] + '\n');
	      var dummyId = "image" + (i+1)*100;
	      var dummyLinkId = "link" + (i+1)*100;
	      //console.log(dummyId);
	      //console.log(dummyLinkId);
	      //console.log(data[i]);
	      document.getElementById(dummyId).src = "http://localhost:8080/uploads/thumbs/" + data[i];
	      document.getElementById(dummyLinkId).href = "http://localhost:8080/uploads/" + data[i];
	    }

	});
}

Dropzone.options.form2 = {
	init: function() {
		this.on("success", function(file, data) {
			//console.log("Success");
			//console.log(data);
			for(var i = 0; i < data.length; i++) {
				//console.log("Image " + (i+1) + " Location: localhost:8080/uploads/" + data.result[i] + '\n');
				var dummyId = "image" + (i+1)*100;
				var dummyLinkId = "link" + (i+1)*100;
				//console.log(dummyId);
				//console.log(dummyLinkId);
				//console.log(data[i]);
				document.getElementById(dummyId).src = "http://localhost:8080/uploads/thumbs/" + data[i];
				document.getElementById(dummyLinkId).href = "http://localhost:8080/uploads/" + data[i];
			}
		});
	}
};
