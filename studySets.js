$(function() {
     var studySets = getCollection();
    for(var i in studySets) {
        console.log(studySets[i]);
        var save = $("#allSets").html();
        $("#allSets").html(save + "<div value='" + i + "' class='studySets'>" + studySets[i][0] + "<br><a href=" + studySets[i][2] + "class='studySets'>" + studySets[i][1] +"</a></div>");
        $("#studySets").click(function() {

        });
    }
    $("#add div svg").click(function() {

        //add a study set
        console.log("add");
        $("#add div svg").animate({"opacity":0.5},"100");
        $("#add div svg").animate({"opacity":1},"100");
    });
    $("#switch").click(function() {
        window.open("http://localhost:63342/co-educate/login.html?_ijt=63eu0isfj72ephhlgtdcujtpsl","_self")
    })
});
function getCollection() {
    return [["study set 1","preview", "https://www.miniclip.com/games/agar-io/en/#t-n-G"], ["study set 2","preview23dknf", "https://www.miniclip.com/games/diepio/en/#t-404-U"]];
}