exports.tagSearch = function(req, res)
{
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

    var resultArray = query.results(function(err, resultArray)
    {
        if (err)
            console.log("Error: " + err);
        else
        {
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
