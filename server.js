var express = require("express");
var app = express();
var parser = require("./models/parser.js");
var request = require("request");
var bodyParser = require("body-parser");
var cheerio = require("cheerio");

var url = "https://www.eksisozluk.com/";

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
      parser.getData(body, function(info){
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
  if (req.body.dataPagecounter > 0) {
  
  } else {
    var newUrl = url + req.body.dataPagetitle + "--" + req.body.dataPageid;
  }
  request(newUrl, function (err, page, body) {
    var $ = cheerio.load(body);
    for(var j = 0 ; j < $(".entry-date").get().length; j++){
      res.write(j + 1 + " . " + $(".entry-author").eq(j).text() + " - " + $(".entry-date").eq(j).text() + "</br>");
      if (j == $(".entry-date").get().length - 1){
        res.write("<a href='" + process.env.MAIN_URL + "'>mainpage?</a>");
      }
    }
    res.end();
  });          
});

app.listen(process.env.PORT, function () {
  var date = new Date(Date.now());
  var time = date.toLocaleTimeString('en-US', { hour12: false });
  var day = date.toDateString();
  console.log('Server listening :\n', 'Port:', process.env.PORT, 'Time :', day + ' ' + time);
});
