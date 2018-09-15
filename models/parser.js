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
        if (err) return;
        var $ = cheerio.load(body);
        var cp = 1;
        if($(".pager").eq(0).data("currentpage")){
            cp = $(".pager").eq(0).data("currentpage");
        }
        var infoArr = [];
        for(var j = 0; j < $(".entry-date").get().length; j++){
            var info = {
                num : (((cp-1)*10) + (1 + j)),
                author : $(".entry-author").eq(j).text(),
                favor : $('#entry-item-list').find('li').eq(j).data('favorite-count'),
                date : $(".entry-date").eq(j).text()
            };
            infoArr[j] = info;
        }
        callback(infoArr);
    });
};
