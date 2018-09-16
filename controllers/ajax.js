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
        var date = "";
        var edit = "";
        for (var i = 0; i < res.length; i++ ) {
            var dateBlock = res[i].date;
            if(dateBlock.split('~').length > 1) {
                date = dateBlock.split('~')[0];
                edit = dateBlock.split('~')[1];
            } else {
                date = res[i].date;
                edit = " - ";
            }
            
            block += "<div class='row contentbar'><span class='infobox numbox'>" + res[i].num + "</span>" +
                    "<span class='infobox authorbox'>-" + res[i].author + "</span>" +
                    "<span class='infobox favbox'>-" + res[i].favor + "</span>" +
                    "<span class='infobox entrydatebox'>-" + date + "</span>" +
                    "<span class='infobox editdatebox'>-" + edit + "</span></div>";

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
    
    var titleBar = "<div class='row titlebar'><span class='infobox numbox'>Num</span>" +
            "<span class='infobox authorbox'>-Author</span>" +
            "<span class='infobox favbox'>-Fav</span>" +
            "<span class='infobox entrydatebox'>-EntryDate</span>" +
            "<span class='infobox editdatebox'>-EditDate</span></div>";
    
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