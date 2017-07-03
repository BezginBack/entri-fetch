var express = require('express');
var app = express();
var request = require("request");
var jsdom = require("jsdom");
var { JSDOM } = jsdom;

var parseIt = function(body){
  var op = "";
  var dom = new JSDOM(body);
  var doc = dom.window.document;
  var nodeList = doc.getElementById("entry-list").childNodes;
  for(var i = 0 ; i < nodeList.length; i++){
    op += nodeList[i];
  }
  return op;
};

app.use(express.static('public'));

app.get("/", function (req, res) {
  if(req.query.search){
    request('https://www.eksisozluk.com/' + req.query.search, function (err, page, body) {
      if (err) res.write(err);
      res.writeHead(200, {"content-type" : "text/plain"});
      res.charset = "utf-8";
      res.write(" " + parseIt(body));
      res.end();
    });
  } else {
    res.sendFile(__dirname + '/views/index.html');
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
