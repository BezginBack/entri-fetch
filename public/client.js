
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/cool-file.js');
}

$(document).ready(function(){
   
  $(".flick").on("click", function(){
   
    var result = fetch("https://www.eksisozluk.com", {
      mode: "no-cors",
      method: "get"
    });
    result
      .then(function(response) {
        alert("response " + response);
        return response.headers.get("strict-transport-security");
      })
      .then(function(text) {
        alert("got text " + text);
      })
      .catch(function(ex) {
        alert("failed " + ex);
      });
    
    
    
  });
});
