var appUrl = window.location.origin;
$('document').ready(function(){
  var data = {
    'info' : 'info'
  };
  var waitFunction = function(){
    
  };
  $('.continue').on('click', function(){
    $.ajax({
      type: 'post',
      url : appUrl + '/entries',
      data : data,
      dataType : 'json',
      //beforeSend : waitFunction,
      error : function(err){
          console.log(err);
      },
      success : function(res){
          console.log(res);
      }
    });  
  });
});