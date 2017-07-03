var express = require('express');
var app = express();
var request = require("request");
var url = require("url");

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get(/\w/, function (req, res) {
    res.writeHead(200, {"content-type" : "text/plain"});
    if(req.query.search){
      request('https://www.eksisozluk.com/'+req.query.search, function (err, page, body) {
        if (err) res.write(err);
        res.write(body);
        res.end();
      });
    }    
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
