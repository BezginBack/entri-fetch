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
  if (req.body.dataPagecounter > 0) {
    //for(var i = 1; i <= req.body.dataPagecounter; i++){
      //var newUrl = url + req.body.dataPagetitle + "--" + req.body.dataPageid + "?p=" + i;
    //}
    var p = req.body.dataPagecounter;
    var interval = setInterval(function() {
      if (p > 0){
        //console.log(url + req.body.dataPagetitle + "--" + req.body.dataPageid + "?p=" + p);
        res.write(url + req.body.dataPagetitle + "--" + req.body.dataPageid + "?p=" + p);
        p--;
      } else {
        res.end();
        clearInterval(interval);
      }
    }, 5000);
  } else {
    var newUrl = url + req.body.dataPagetitle + "--" + req.body.dataPageid;
    parser.getInfo(newUrl, function(info){
      if(info == 'end') {
        res.write("<a href='" + process.env.MAIN_URL + "'>mainpage</a>");
        res.end();
      } else {
        res.write(info);
      }
    });       
  }
});

app.listen(process.env.PORT, function () {
  var date = new Date(Date.now());
  var time = date.toLocaleTimeString('en-US', { hour12: false });
  var day = date.toDateString();
  console.log('Server listening :\n', 'Port:', process.env.PORT, 'Time :', day + ' ' + time);
});
