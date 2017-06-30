var http = require('http'), fs = require("fs"), request = require("request");

var server = http.createServer(function(req, res){
   if (req.url === "/"){
    res.writeHead(200, {"content-type" : "text/plain"});
    request('https://www.eksisozluk.com', function (err, response, body) {
      if (err) res.write(err);
      res.write(body);
      res.end(); 
    });
   } else {
     //res.writeHead(200, {"content-type" : "text/plain"});
     request('https://www.xhamster.com', function (err, response, body) {
      if (err) res.write(err);
      res.write(body);
      res.end(); 
    });
   }
});  


var listener = server.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


