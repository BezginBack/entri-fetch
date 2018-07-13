var express = require("express");
var app = express();
var request = require("request");
var async = require("async");
var cheerio = require("cheerio");
var rp = require("request-promise");
var jsdom = require('jsdom');
var { JSDOM } = jsdom;
var dom = new JSDOM();

var url = "https://www.eksisozluk.com/";

/*function parseIt(url, callback){
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
}*/


app.use(express.static('public'));

app.route("/")
    .get(function (req, res) {
    request(url, function (err, page, body) {
      res.send(body);
    });
  });

app.listen(process.env.PORT, function () {
  var date = new Date(Date.now());
  var time = date.toLocaleTimeString('en-US', { hour12: false });
  var day = date.toDateString();
  console.log('Server listening :\n', 'Port:', process.env.PORT, 'Time :', day + ' ' + time);
});
