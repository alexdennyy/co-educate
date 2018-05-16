$(function() {
    $("#add div svg circle").click(function() {
        //add a study set
        console.log("add");
        $("#add div svg").animate({"opacity":0.5},"100");
        $("#add div svg").animate({"opacity":1},"100");
    });
    $("#log").click(function() {
        console.log("switch");
    })
});