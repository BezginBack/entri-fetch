var express = require('express');
var app = express();
var request = require("request");

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get(/\w/, function (req, res) {
    res.writeHead(200, {"content-type" : "text/plain"});
    request('https://www.eksisozluk.com', function (err, page, body) {
      if (err) res.write(err);
      res.setEncoding("utf8");
      res.write(body);
      res.end();
    });    
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
