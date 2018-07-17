var appUrl = window.location.origin;
$('document').ready(function(){
  var data = {
    'info' : 'info'
  };
  var waitFunction = function(){
    
  };
  $('.continue').on('click', function(){
    console.log(appUrl);
    $.ajax({
      type: 'post',
      url : appUrl + '/entries',
      data : data,
      dataType : 'json',
      beforeSend : waitFunction,
      error : function(err){
             
      },
      success : function(res){
          
      }
    });  
  });
});