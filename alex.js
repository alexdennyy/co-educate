$(function() {
    determineDate();
});

function determineDate(){
    var date = new Date();
    var day = date.getDate();
    for(var i = 0; i < 31; i++){
        if($(".days li:nth-child("+ i +")").html() == day){
            $(".days li:nth-child("+ i +")").html("<span class='active'>" + (i - 1) + "</span>")
        }
    }
}