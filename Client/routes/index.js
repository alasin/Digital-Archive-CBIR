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
                for(var i = 0; i < results.length; i++)
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
                    for(var i = 0; i < results.length; i++)
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
    // console.log(req.files.file.path)
    var tempPath = req.files.file.path;

    fs.readFile(req.files.file.path, function (err, data)
    {
        var response;
        var imageName = req.files.file.name;

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
                for(var i = 0; i < results.length; i++)
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
                    for(var i = 0; i < results.length; i++)
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

exports.index = function(req, res)
{
    res.render('index');
};
