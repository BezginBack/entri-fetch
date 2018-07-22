var appUrl = window.location.origin;
$('document').ready(function(){
  var waitFunction = function(){
    
  };
  
  var ajaxFunction = function(url, data, wait, err, suc){
    $.ajax({
      type: 'post',
      url : url,
      data : data,
      beforeSend : wait,
      error : err,
      success : suc
    });
  };
  
  $('.continue').on('click', function(){
    $('.result').empty();
    var p = $('.continue').data('pagecounter');
    var url = appUrl + '/entries';
    alert(p);
    var interval = setInterval(function() {
      if(p > 0) {
        var data = {
          'url' : $('.continue').data('title') + "--" + $('.continue').data('id') + "?p=" + p
        };
        p--;
        ajaxFunction(url, data, waitFunction, function(err){
          console.log(err);
        }, function(res){
          console.log(res);
          $('.result').append(res);
        });
      } else {
        $('.result').append("<a href='" + appUrl + "'>mainpage</a>");
        clearInterval(interval);
      }
    }, 5000);
  });

  $('.mainpage').on('click', function(){
    document.location.href = appUrl;
  });
});