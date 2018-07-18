var express = require("express");
var app = express();
var parser = require("./models/parser.js");
var request = require("request");
var bodyParser = require("body-parser");

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

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/views', express.static(__dirname + '/views'));
app.use('/controllers', express.static(__dirname + '/controllers'));
app.set('view engine', 'pug')

app.route("/")
  .get(function (req, res) {
  if(req.query.search){
    var q = '/' + req.query.search; 
    var data = {};
    request(url + q, function (err, page, body) {
      if (err) res.send(err);
      parser.parseHtml(body, function(info){
          data = {
            'isSearched': true,
            'title': 'Result',
            'content': {
              'pageCounter' : info.pageCounter,
              'dataTitle' : info.dataTitle,
              'dataId' : info.dataId                
            }
          };
        res.render('index', {data: data});
      });
    });
  } else {
    data = {
        'title': 'Hello',
    };
    res.render('index', {data: data});
  }
  });

app.route("/entries")
  .post(function (req, res) {
    var post = {
      'count' : req.body.dataPagecounter,
      'title' : req.body.dataPagetitle,
      'id' : req.body.dataPageid,
    };
    res.send(post);
});

app.listen(process.env.PORT, function () {
  var date = new Date(Date.now());
  var time = date.toLocaleTimeString('en-US', { hour12: false });
  var day = date.toDateString();
  console.log('Server listening :\n', 'Port:', process.env.PORT, 'Time :', day + ' ' + time);
});
