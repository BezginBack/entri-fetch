var http = require('http'), fs = require("fs"), request = require("request");

var server = http.createServer(function(req, res){
   if (req.url === "/"){
    res.writeHead(200, {"content-type" : "text/plain"});
    
     
   }
});  


var listener = server.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


