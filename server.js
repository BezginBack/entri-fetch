var http = require('http'), fs = require("fs"), request = require("request");
var express = require('express'), app = express();
var 
fs.readFile('./AppClient.html', function(err, data) {
    if (err){
        throw err;
    }
    htmlFile = data;
});


var server = http.createServer(function(req, res){
   if (req.url === "/"){
    res.writeHead(200, {"content-type" : "text/html"});
    fs.createReadStream("views/index.html").pipe(res);
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
});


