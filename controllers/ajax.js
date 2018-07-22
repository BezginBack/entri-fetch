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
    /*var data = {
      'dataPagecounter' : $('.continue').data('pagecounter'),
      'dataPagetitle' : $('.continue').data('title'),
      'dataPageid' : $('.continue').data('id')
    };
    var url = appUrl + '/entries';
    ajaxFunction(url, data, waitFunction, function(err){
      console.log(err);
    }, function(res){
      console.log(res);
      $('.result').html(res);
    });*/
    var p = $('.continue').data('pagecounter');
    var interval = setInterval(function(str1, str2) {
  console.log(str1 + " " + str2);
}, 1000, "Hello.", "How are you?");
    var data = {
      'url' : $('.continue').data('title') + "--" + $('.continue').data('id') + "?p=" + p
    };
    var url = appUrl + '/entries';
    ajaxFunction(url, data, waitFunction, function(err){
      console.log(err);
    }, function(res){
      console.log(res);
      $('.result').empty();
      $('.result').append(res);
      $('.result').append("<a href='" + appUrl + "'>mainpage</a>");
    });
  });

  $('.mainpage').on('click', function(){
    document.location.href = appUrl;
  });
});