
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
	    
	    console.log("Done");
	    
	  });
}

