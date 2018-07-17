var cheerio = require("cheerio");

exports.parseHtml = function(body, callback){
  var $ = cheerio.load(body);
  if( $("#topic").eq(0).data("not-found") == true ){
    callback('no entry');
  } else {
    var pageInfo = {
      'pageCounter' : $(".pager").eq(0).data("pagecount"),
      'dataTitle' : $("#title").eq(0).data("title"),
      'dataId' : $("#title").eq(0).data("id")
    };
    callback(pageInfo);
  }
}