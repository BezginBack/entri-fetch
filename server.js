var express = require("express");
var app = express();
var parser = require("./models/parser.js");
var bodyParser = require("body-parser");

var request = require("request");
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
    parser.getData(url + q, function(data){
      res.render('index', {data: data});
    });
  } else {
    var data = {
      'title': 'Hello',
    };
    res.render('index', {data: data});
  }
  });

app.route("/entries")
  .post(function (req, res) {
  var newUrl = url + req.body.url;
  parser.getInfo(newUrl, function(info){
    if(info == 'end') {
      res.end();
    } else {
      res.write(info);
    }
  });
});

app.listen(process.env.PORT, function () {
  var date = new Date(Date.now());
  var time = date.toLocaleTimeString('en-US', { hour12: false });
  var day = date.toDateString();
  console.log('Server listening :\n', 'Port:', process.env.PORT, 'Time :', day + ' ' + time);
});
