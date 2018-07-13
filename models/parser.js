var cheerio = require("cheerio");

exports.parseHtml = function(body, callback){
    var $ = cheerio.load(body);
    if($("#topic").data("not-found") == "true"){
      callback('no entry');
    } else {
      var pageCounter = $(".pager").eq(0).data("pagecount");
      callback(pageCounter);
    }
}