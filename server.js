var express = require("express");
var app = express();
var request = require("request");
var async = require("async");
var cheerio = require("cheerio");
var rp = require("request-promise");
var jsdom = require('jsdom');
var { JSDOM } = jsdom;
var dom = new JSDOM();

function parseIt(url, callback){
  var data = "";
  var arr = [];
  request(url, function (err, page, body) {
    if (!err && page.statusCode == 200) {
      var $ = cheerio.load(body);
      if($("#topic").data("not-found") == "true"){
        callback(null, "err");
      } else {
        //var url = page.request.uri.href;
        var url = "https://www.eksisozluk.com/" + $("#title").eq(0).data("slug") + "--" + $("#title").eq(0).data("id");
        var pageCounter = parseInt($(".pager").eq(0).data("pagecount"));
        if(pageCounter > 0){
          var pages = [];
          for(var i = 1; i <= pageCounter; i++) {
            pages.push(url+"?p="+i);
          }
          async.mapLimit(pages, 10, function(url, done) {
            request(url, function(error, response, html) {
              var $ = cheerio.load(html);
              for(var j = 0 ; j < $(".entry-date").get().length; j++){
                arr.push($(".entry-author").eq(j).text());
                data += "<div>" + $(".entry-author").eq(j).text() + " ~ " + $(".entry-date").eq(j).text() + "</div>";
              }
              done(error, response);
            });
          }, function(err, results) {
            data += "<div>" + arr.length + " entry are shown.</div>";
            callback(null, data);
          });
        } else {
          for(var k = 0 ; k < $(".entry-date").get().length; k++){
            arr.push($(".entry-author").eq(k).text());
            data += "<div>" + $(".entry-author").eq(k).text() + " ~ " + $(".entry-date").eq(k).text() + "</div>";
          }
          data += "<div>" + arr.length + " entry are shown.</div>";
          callback(null, data);
        }
      }
    } else {
      callback(null, "err");
    }
  });
}


app.use(express.static('public'));

app.get("/", function (req, res) {
  if(req.query.search){
    var q = req.query.search;
    //var url = 'https://eksisozluk.com/' + q;
    var url = 'https://poll-maker-bezginback.c9users.io';
    res.writeHead(200, {"content-type" : "text/plain"});
    //parseIt(url, function(err, data){
      //if(err) res.end(err);
      //if(data == "err") res.end("error or bad search");
      //res.write(data);
      //if(data[data.length-7] == ".") res.end();
    //});
    res.end(dom.url);
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
