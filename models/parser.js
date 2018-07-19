var cheerio = require("cheerio");

exports.getData = function(body, callback){
  var $ = cheerio.load(body);
  if( $("#topic").eq(0).data("not-found") == true ){
    callback('no entry');
  } else {
    var pageInfo = {
      'pageCounter' : $(".pager").eq(0).data("pagecount"),
      'dataTitle' : $("#title").eq(0).data("slug"),
      'dataId' : $("#title").eq(0).data("id")
    };
    callback(pageInfo);
  }
};

exports.getInfo = function(body, callback){
  var $ = cheerio.load(body);
  for(var j = 0 ; j < $(".entry-date").get().length; j++){
    callback(j + 1 + " . " + $(".entry-author").eq(j).text() + " - " + $(".entry-date").eq(j).text() + "</br>");
  }
};