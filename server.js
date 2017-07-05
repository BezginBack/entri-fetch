var express = require("express");
var app = express();
var request = require("request");
var async = require("async");
var cheerio = require("cheerio");

function parseIt(url, callback){
  var data = "";
  var arr = [];
  request(url, function (err, page, body) {
    if (!err && page.statusCode == 200) {
      var $ = cheerio.load(body);
      if($("#topic").data("not-found") == "true"){
        callback(null, "err");
      } else {
        var url = page.request.uri.href;
        var pageCounter = parseInt($(".pager").eq(0).data("pagecount"));
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
    var url = 'https://eksisozluk.com/' + q;
    res.writeHead(200, {"content-type" : "text/html"});
    parseIt(url, function(err, data){
      if(err) res.end(err);
      if(data == "err") res.end("error or bad search");
      res.write(data);
      if(data[data.length-1] == ".") res.end();
    });
  } else {
    res.sendFile(__dirname + '/views/index.html');
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
