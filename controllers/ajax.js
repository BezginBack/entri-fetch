var appUrl = window.location.origin;
$('document').ready(function(){
  var waitFunction = function(){
    
  };
  $('.continue').on('click', function(){
    var data = {
      'dataPagecounter' : $('.continue').data('pagecounter'),
      'dataPagetitle' : $('.continue').data('title'),
      'dataPageid' : $('.continue').data('id')
    };
    $.ajax({
      type: 'post',
      url : appUrl + '/entries',
      data : data,
      //dataType : 'json',
      beforeSend : waitFunction,
      error : function(err){
        console.log(err);
        $('.result').html(err);
      },
      success : function(res){
        console.log(res);
        //$('.result').html(res);
      }
    });  
  });
  $('.mainpage').on('click', function(){
    document.location.href = appUrl;
  });
});