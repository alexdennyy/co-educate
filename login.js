function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}
$(function() {
    var user = "";
    var pass = "";
    $("#log").click(function() {
        if($("#user").val() != "" && $("#pass").val() != "") {
            $("#error").html("");
            user = $("#user").val();
            pass = $("#pass").val();
            post('/contact/', {name: user,});

        } else {
            $("#error").html("<p style='color:red;margin:auto;width:50%'>*You must input a name and password!</p>");
        }
    });
    $("#new").click(function() {
        x = prompt("Enter your email to create a new user,\nor input nothing to go back");
        if(x != "") {
            user = x;
            pass = prompt("Enter your password\nMake sure you can remember it!");
            console.log(typeof(user));
            console.log(typeof(pass));
            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                data: {
                    "email": "yateslough@students.berkeley",
                    "password": "YatesIsCool"
                },
                dataType: 'json',
                success: function(data){
                    console.log("success");
                },
                error: function(){
                    alert("failed");
                },
                url: 'https://slkidsbackend.herokuapp.com/coeducate/api/users'
            });

        }
    })
});