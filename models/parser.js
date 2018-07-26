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
      pageData['title'] = 'EksiEntries';
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
    var cp = 1;
    if($(".pager").eq(0).data("currentpage")){
      cp = $(".pager").eq(0).data("currentpage");
    } 
    for(var j = 0 ; j < $(".entry-date").get().length; j++){
      callback("<div><span class='col-sm-1 col-lg-1'>" +
               (((cp-1)*10) + (1 + j)) +
               "</span><span class='col-sm-5 col-lg-5'>-" + 
               $(".entry-author").eq(j).text() + 
               "</span><span class='col-sm-1 col-lg-1'>-" +
               $('#entry-item-list').find('li').eq(j).data('favorite-count') + 
               "</span><span class='col-sm-5 col-lg-5'>-" + 
               $(".entry-date").eq(j).text() + "</span></div>");
    }
    callback('end');
  });
};