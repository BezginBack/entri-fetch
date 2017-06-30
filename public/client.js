// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  console.log('hello world :o');
  
  $.get('/dreams', function(dreams) {
    dreams.forEach(function(dream) {
      $('<li></li>').text(dream).appendTo('ul#dreams');
    });
  });

  $('form').submit(function(event) {
    event.preventDefault();
    var dream = $('input').val();
    $.post('/dreams?' + $.param({dream: dream}), function() {
      $('<li></li>').text(dream).appendTo('ul#dreams');
      $('input').val('');
      $('input').focus();
    });
  });

});

$(document).ready(function(){
   
  $(".flick").on("click", function(){
        var result = fetch("https://www.eksisozluk.com/", {
      mode: "no-cors",
      method: "get"
    });
    result
      .then(function(response) {
        alert("response " + response);
        return response.getHeader();
      })
      .then(function(text) {
        alert("got text " + text);
      })
      .catch(function(ex) {
        alert("failed " + ex);
      });
    
    
    
  });
});
