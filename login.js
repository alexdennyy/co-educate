$(function() {
    var user = "";
    var pass = "";
    $("#log").click(function() {
        if($("#user").val() != "" && $("#pass").val() != "") {
            $("#error p").text("");
            user = $("#user").val();
            pass = $("#pass").val();
            getUser(user,pass);
        } else {
            $("#error p").text("You must input a name and password!");
        }
    });
    $("#new").click(function() {
        x = prompt("Enter your email to create a new user,\nor input nothing to go back");
        if(x != "") {
            user = x;
            pass = prompt("Enter your password\nMake sure you can remember it!");
            createUser(user,pass);
        }
    })
});
function createUser(user,pass) {
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            "email": user,
            "password": pass
        }),
        dataType: 'json',
        success: function(data){
            console.log(data);
        },
        error: function(){
            alert("failed");
        },
        url: 'https://slkidsbackend.herokuapp.com/coeducate/api/users'
    });
}
function getUser(user,pass) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        success: function(data){
            if(data === null || pass != data.password) {
                $("#error p").text("That's not a valid user and/or password!");
            } else if(data.password === pass) {
                console.log(data);
                $("body").html("<img src=\"Loading_icon.gif\" alt=\"Loading...\" style=\"width:" + window.innerWidth + "px;height:auto;\">")
                window.location.replace("studyPlan.html?_id=" + data._id);
            }
        },
        error: function(){
            alert("failed");
        },
        url: 'https://slkidsbackend.herokuapp.com/coeducate/api/users/' + user
    });
}