var request = require("request");
var cheerio = require("cheerio");

exports.getData = function(url, callback){
  request(url, function (err, page, body){
    var pageData = {
      'isSearched': true,
    };
    if (err) {
      pageData['title'] = 'Error';
      pageData['content'] = err;
    } else {
      pageData['title'] = 'Result';
      var $ = cheerio.load(body);
      if( $("#topic").eq(0).data("not-found") != true ){
        pageData['content'] = {
          'pageCounter' : $(".pager").eq(0).data("pagecount"),
          'dataTitle' : $("#title").eq(0).data("slug"),
          'dataId' : $("#title").eq(0).data("id")
        };
      }
    }
    callback(pageData);
  });
};

exports.getInfo = function(url, callback){
  request(url, function (err, page, body){
    if (err) callback(err);
    //var $ = cheerio.load(body);
    //for(var j = 0 ; j < $(".entry-date").get().length; j++){
      //callback(j) //$(".entry-author").eq(j).text());
    //}
    callback("ok");
  });
};