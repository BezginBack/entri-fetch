var appUrl = window.location.origin;

$('document').ready(function(){
    var waitFunction = function(){
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
    
    var errFunction = function(err){
        console.log(err);
    };
    
    var successFunction = function(res){
        var block = "";
        for (var i = 0; i < res.length; i++ ) {
            block += "<div><span class='col-sm-1 col-lg-1'>" + res[i].num + "</span>" +
                    "<span class='col-sm-5 col-lg-5'>" + res[i].author + "</span>" +
                    "<span class='col-sm-1 col-lg-1'>" + res[i].favor + "</span>" +
                    "<span class='col-sm-5 col-lg-5'>" + res[i].date + "</span></div>";
        }
        $('.result').append(block);
    };
  
    var ajaxFunction = function(url, data, err, suc){
        $.ajax({
            type: 'get',
            url : url,
            data : data,
            error : err,
            success : suc
        });
    };
    
    var titleBar = "<div><span class='col-sm-1 col-lg-1'>Num</span>" +
            "<span class='col-sm-5 col-lg-5'>Author</span>" +
            "<span class='col-sm-1 col-lg-1'>Fav</span>" +
            "<span class='col-sm-5 col-lg-5'>Date</span></div>";
    
    var homeLink = "<div class='row text-center'><a href='" + appUrl + "'>Mainpage</a></div>";
  
    $('.continue').on('click', function(){
        waitFunction();
        var p = $('.continue').data('pagecounter');
        var t = p;
        var titleId = $('.continue').data('title') + "--" + $('.continue').data('id');
        var url = appUrl + '/api/entries';
        $('.data').empty();
        $('.result').append(titleBar);
        $('title').html('EksiEntries | Result');
        var interval = setInterval(function() {
            if(p > 0) {
                var data = {
                    'titleId' : titleId,
                    'p' : (t - p + 1)
                };
                p--;
                ajaxFunction(url, data, errFunction, successFunction);
            } else {
                $('.result').append(homeLink);
                $('.wait').css({display: 'none'});
                clearInterval(interval);
            }
        }, 5000);
    });

    $('.mainpage').on('click', function(){
        document.location.href = appUrl;
    });
});