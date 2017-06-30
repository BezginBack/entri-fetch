/*var http = require('http'), fs = require("fs"), request = require("request");
var express = require('express'), app = express();
var htmlFile;

fs.readFile('views/index.html', function(err, data) {
    if (err){
        throw err;
    }
    htmlFile = data;
});


var server = http.createServer(function(req, res){
   if (req.url === "/"){
    res.writeHead(200, {"content-type" : "text/html"});
    //fs.createReadStream("views/index.html").pipe(res);
    res.end(htmlFile); 
   } else {
     res.writeHead(200, {"content-type" : "text/plain"});
     request('https://www.eksisozluk.com' + req.url, function (err, response, body) {
      if (err) res.write(err);
      res.write(body);
      res.end(); 
    });
   }
}); 


var listener = server.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});*/


// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var request = require("request");

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/get", function (req, res) {
 res.writeHead(200, {"content-type" : "text/plain"});
     request('https://www.eksisozluk.com' + req.url, function (err, response, body) {
      if (err) res.write(err);
      res.write(body);
      res.end();
     }
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
