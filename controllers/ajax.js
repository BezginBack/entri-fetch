var appUrl = window.location.origin;
$('document').ready(function(){
  var waitFunction = function(){
    
  };
  $('.continue').on('click', function(){
    var data = {
    
    };
    $.ajax({
      type: 'post',
      url : appUrl + '/entries',
      data : 'info',
      dataType : 'json',
      beforeSend : waitFunction,
      error : function(err){
          console.log(err);
      },
      success : function(res){
          console.log(res);
      }
    });  
  });
});