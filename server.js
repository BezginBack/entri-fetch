var express = require("express");
var app = express();
var request = require("request");
var async = require("async");
var cheerio = require("cheerio");


function parseIt(url, callback){
  var data = [];
  request(url, function (err, page, body) {
    if (!err && page.statusCode == 200) {
      var $ = cheerio.load(body);
      if ($("#topic")){
        if($("#topic").data("not-found") == null){
          var url = page.request.uri.href;
          //data += "<div>" + url + "</div>";
          if($(".pager")[0]){
            var pageCounter = $(".pager").data("pagecount");
            //data += "<div>" + pageCounter + "</div>";
          }
          var q = async.queue(function (task, done) {
            request(task.url, function (err, page, body2){
              var $ = cheerio.load(body2);
              var nodeList2 = $(".entry-date");
              var nodeList3 = $(".entry-author");
              for(var j = 0 ; j < nodeList2.length; j++){
                  data.push("<div>" + task.id + " ~ "+ nodeList3[j].innerHTML + " ~ " + nodeList2[j].innerHTML + "</div>");
              }
              done();
              callback(null, data);
            }); 
          }, 1);
          for(var i = 1; i <= pageCounter; i++) {
            q.push({url: url+"?p="+i, id: i});
          }    
        }
      }
      //callback(null, data);
    } else {
      callback(null, "error or bad search");
    }
  });
}


app.use(express.static('public'));

app.get("/", function (req, res) {
  if(req.query.search){
    var q = req.query.search;
    var url = 'https://eksisozluk.com/' + q;
    res.writeHead(200, {"content-type" : "text/html"});
    parseIt(url, function(err, data){
      if(err) res.end(err);
      for(var i = 0; i < data.length; i++){
        res.write(data[i]);  
      }
    });
    //res.end();
  } else {
    res.sendFile(__dirname + '/views/index.html');
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
