var express = require("express");
var app = express();
var request = require("request");
var jsdom = require("jsdom");
var { JSDOM } = jsdom;
var async = require("async");

/*
function parseIt(url, callback){
  var data = "";
  request(url, function (err, page, body) {
    if (!err && page.statusCode == 200) {
      var dom = new JSDOM(body);
      var doc = dom.window.document;
      if (doc.getElementById("topic")){
        if(doc.getElementById("topic").getAttribute("data-not-found") == null){
          var url = page.request.uri.href;
          //data += "<div>" + url + "</div>";
          //if(doc.getElementsByClassName("pager")[0]){
            //var pageCounter = doc.getElementsByClassName("pager")[0].getAttribute("data-pagecount");
            //data += "<div>" + pageCounter + "</div>";
          //}
          //var nodeList = doc.getElementsByClassName("entry-date");
          //for(var j = 0 ; j < nodeList.length; j++){
            //data += "<div>" + nodeList[j].innerHTML + "</div>";
          //}
          
        }
      }
      callback(null, data);
    } else {
      callback(null, "error or bad search");
    }
  });
}
*/


var q = async.queue(function (task, done) {
    request(task.url, function(err, res, body) {
        if (!err && res.statusCode == 200) {
          done();
        }
    });
}, 5);

q.push({url: "https://eksisozluk.com/"});

app.use(express.static('public'));

app.get("/", function (req, res) {
  if(req.query.search){
    var q = req.query.search;
    var url = 'https://eksisozluk.com/' + q;
    res.writeHead(200, {"content-type" : "text/plain"});
    //parseIt(url, function(err, data){
      //if(err) res.end(err);
      //res.write(data);
      //res.end();
    //});
  } else {
    res.sendFile(__dirname + '/views/index.html');
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
