var appUrl = window.location.origin;
$('document').ready(function(){
  var waitFunction = function(){
    //$('.wait').css({display: 'block'});
    $('.wait').fadeIn();
      var id = setInterval(function() {
        if($('.wait').css('display') == 'block'){
          $('.wait').animate({opacity: '0.1'}, 1000);
          $('.wait').animate({opacity: '0.9'}, 1000);
        } else {
          clearInterval(id);
        }
      }, 1000);    
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
    var p = $('.continue').data('pagecounter');
    var t = p;
    var titleId = $('.continue').data('title') + "--" + $('.continue').data('id')
    var url = appUrl + '/entries';
    $('.data').empty();
    $('title').html('EksiEntries | Result');
    var interval = setInterval(function() {
      if(p > 0) {
        var data = {
          'url' : titleId + "?p=" + (t - p + 1)
        };
        p--;
        ajaxFunction(url, data, waitFunction, function(err){
          console.log(err);
        }, function(res){
          $('.result').append(res);
        });
      } else {
        $('.result').append("<a href='" + appUrl + "'>Mainpage</a>");
        $('.wait').css({display: 'none'});
        clearInterval(interval);
      }
    }, 5000);
  });

  $('.mainpage').on('click', function(){
    document.location.href = appUrl;
  });
});