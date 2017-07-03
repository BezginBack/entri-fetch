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
  var url = page.request.uri.href;
  html += "<div>" + url + "</div>";
  var pageCounter = doc.getElementsByClassName("pager")[0].getAttribute("data-pagecount");
  html += "<div>" + pageCounter + "</div>";
  
  
  
  for(var i = 1 ; i <= pageCounter; i++){
    request(url+'?p='+i, function (err2, page2, body2) {
      var dom2 = new JSDOM(body2);
      var doc2 = dom2.window.document;
      var nodeList = doc2.getElementsByClassName("entry-date");
      for(var j = 0 ; j < nodeList.length; j++){
        html += "<div>" + nodeList[j].innerHTML + "</div>";
      } 
    });
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
