var express = require('express');
var app = express();
var request = require("request");
var jsdom = require("jsdom");
var { JSDOM } = jsdom;

function parseIt(q){
  var html = "";
  request('https://eksisozluk.com/', function (err, page, body) {
    if (err) return err;
    /*var dom = new JSDOM(body);
    var doc = dom.window.document;
    var url = page.request.uri.href;
    html += "<div>" + url + "</div>";
    var pageCounter = doc.getElementsByClassName("pager")[0].getAttribute("data-pagecount");
    html += "<div>" + pageCounter + "</div>";
    var nodeList = doc.getElementsByClassName("entry-date");
    for(var j = 0 ; j < nodeList.length; j++){
      html += "<div>" + nodeList[j].innerHTML + "</div>";
    }*/
    html = body;
    return html;
  });
}

var options = {
  url: 'https://eksisozluk.com/'
};

function callback(err, page, body) {
  if (!err && page.statusCode == 200) {
    return body.title;
  }
}

app.use(express.static('public'));

app.get("/", function (req, res) {
  if(req.query.search){
    var q = req.query.search;
    res.writeHead(200, {"content-type" : "text/html"});
    res.write(" " + request(options, callback));
    res.end();
  } else {
    res.sendFile(__dirname + '/views/index.html');
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
