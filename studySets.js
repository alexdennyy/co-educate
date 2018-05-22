$(function() {
     var studySets = getCollection();
    for(var i in studySets) {
        console.log(studySets[i]);
        var save = $("#allSets").html();
        $("#allSets").html(save + "<div value='" + i + "' class='studySets'>" + studySets[i][0] + "  <div class='studySets'>" + studySets[i][1] +"</div></div>");
        $("#studySets").click(function() {

        });
    }
    $("#add div svg").click(function() {

        //add a study set
        console.log("add");
        $("#add div svg").animate({"opacity":0.5},"100");
        $("#add div svg").animate({"opacity":1},"100");
    });
    $("#log").click(function() {
        console.log("switch");
    })
});
function getCollection() {
    return [["study set 1","preview", "link"], ["study set 2","preview23dknf", "link"]];
}