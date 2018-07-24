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
    var $ = cheerio.load(body);
    for(var j = 0 ; j < $(".entry-date").get().length; j++){
      callback("<span class='col-sm-6'>" + 
               $(".entry-author").eq(j).text() + 
               "</span><span class='col-sm-2'></span><span class='col-sm-4'>" + 
               $(".entry-date").eq(j).text() + "</span>");
    }
    callback('end');
  });
};