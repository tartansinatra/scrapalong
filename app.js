var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

results = []

//  THIS WILL SCRAPE THE HTML FROM THE CODECLAN WEBSITE
// request('http://codeclan.com/about/', function(err, response, html){
//   if(!err && response.statusCode == 200){
//     console.log(html);
//   }
// });

request('http://codeclan.com/about/', function(err, response, html){
  if(!err && response.statusCode == 200){
    var loader = cheerio.load(html);
    loader('div.team-image').each(function(i, element){
      var url = loader(this).attr('style');
      results.push(url);
    });

    for(result of results){
      console.log('Result:', result.substring(22, result.length-2))
    };
    console.log("Finished scraping. There are " + results.length + " results.");

    var getTheURLS = results.map(function(result){
      return result.substring(22, result.length-2)
    })
    // //now looping over urls in results array. We use .pipe to put it into a string
    for (var i = 0; i < getTheURLS.length; i++) {
      request(getTheURLS[i]).pipe(fs.createWriteStream('resultsAreHere/' + i + '.jpg'));
//The line above tells the scraper where to put the results... in this case in a folder called 'results'
    };
  }
});
