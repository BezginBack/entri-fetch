var express = require('express');
var app = express();
var request = require("request");
var jsdom = require("jsdom");
var { JSDOM } = jsdom;

function parseIt(body, page){
  var data = "";
  var dom = new JSDOM(body);
  var doc = dom.window.document;
  var url = page.request.uri.href;
  data += "<div>" + url + "</div>";
  var pageCounter = doc.getElementsByClassName("pager")[0].getAttribute("data-pagecount");
  data += "<div>" + pageCounter + "</div>";
  /*var nodeList = doc.getElementsByClassName("entry-date");
  for(var j = 0 ; j < nodeList.length; j++){
    html += "<div>" + nodeList[j].innerHTML + "</div>";
  }*/
  return data;
}

app.use(express.static('public'));

app.get("/", function (req, res) {
  if(req.query.search){
    var q = req.query.search;
    var data = "";
    var d = request('https://eksisozluk.com/' +q, function (err, page, body) {
       return body;
    });
    
    res.writeHead(200, {"content-type" : "text/html"});
    res.write(" " + d);
    res.end();
    
  } else {
    res.sendFile(__dirname + '/views/index.html');
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
