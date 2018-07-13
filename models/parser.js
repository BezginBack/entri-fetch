var cheerio = require("cheerio");

exports.parseHtml = function(body, callback){
    var $ = cheerio.load(body);
    if($("#topic").data("not-found") == "true"){
      callback("err", null);
    } else {
      var pageCounter = parseInt($(".pager").eq(0).data("pagecount"));
      callback(null, pageCounter);
    }
}