


$(document).ready(function(){
   
  $(".flick").on("click", function(){
   
  var request = require('request');
request('https://www.eksisozluk.com/fi', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  alert('body: ' + body); // Print the HTML for the Google homepage.
});
    
    
    
  });
});
