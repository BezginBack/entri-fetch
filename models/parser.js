var cheerio = require("cheerio");

exports.parseHtml = function(body, callback){
    var $ = cheerio.load(body);
    if( $("#topic").eq(0).data("not-found") == true ){
      callback('no entry');
    } else {
      var pageCounter = $(".pager").eq(0).data("pagecount");
      var title = $("#title").eq(0).data("slug")
      var title = $("#title").eq(0).data("slug")
      callback(pageCounter);
    }
}