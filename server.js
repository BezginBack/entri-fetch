var express = require('express');
var app = express();
var request = require("request");
var jsdom = require("jsdom");
var { JSDOM } = jsdom;

var parseIt = function(body, page){
  var html = "";
  var dom = new JSDOM(body);
  var doc = dom.window.document;
  var loc = dom.window.location;
  html += "<div>" + page.request.uri.href + "</div>";
  var pageCounter = doc.getElementsByClassName("pager").getData("pagecount");
  html += "<div>" + pageCounter + "</div>";
  var nodeList = doc.getElementsByClassName("entry-date");
  for(var i = 0 ; i < nodeList.length; i++){
    html += "<div>" + nodeList[i].innerHTML + "</div>";
  }
  return html;
};

app.use(express.static('public'));

app.get("/", function (req, res) {
  if(req.query.search){
    request('https://www.eksisozluk.com/' + req.query.search, function (err, page, body) {
      if (err) res.write(err);
      res.writeHead(200, {"content-type" : "text/html"});
      res.charset = "utf-8";
      res.write(parseIt(body, page));
      res.end();
    });
  } else {
    res.sendFile(__dirname + '/views/index.html');
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
