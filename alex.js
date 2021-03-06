var juneDays = "<li class='prevMonth'></li><li class='prevMonth'></li><li class='prevMonth'></li><li class='prevMonth'></li><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li><li>11</li><li>12</li><li>13</li><li>14</li><li>15</li><li>16</li><li>17</li><li>18</li><li>19</li><li>20</li><li>21</li><li>22</li><li>23</li><li>24</li><li>25</li><li>26</li><li>27</li><li>28</li><li>29</li><li>30</li>"
var mayDays = "<li class='prevMonth'></li><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li><li>11</li><li>12</li><li>13</li><li>14</li><li>15</li><li>16</li><li>17</li><li>18</li><li>19</li><li>20</li><li>21</li><li>22</li><li>23</li><li>24</li><li>25</li><li>26</li><li>27</li><li>28</li><li>29</li><li>30</li><li>31</li>"
var events = [];
var monthDisplayed;
var USER_ID;

function event(eventType, eventName, eventDay, eventMonth) {
    this.eventType = eventType;
    this.eventName = eventName;
    this.eventDay = eventDay;
    this.eventMonth = eventMonth;
}
$(function() {

    //testing query string params
    USER_ID = (getParameterByName("_id"));
    $("#pushDeadlineButton").on("click", function(){
        pushDeadline();
    });
    loadPage(5);
    $(".prev").hide();
    events.push(new event("deadline", "Homework Check", 22, 5));
    events.push(new event("deadline", "Homework Check", 26, 4));
    events.push(new event("test", "Math Test", 29, 4));
    findUpcomingDeadlines();
    searchEvents();

    loadJuneCalendar();
    loadPage(5);

    $(".resourcesButton").on("click", function(){
        $(".calendarWrapper").hide();
    })
    $(".calendarButton").on("click", function(){
        $(".calendarWrapper").show();
    })

    $(".month .next").on("click", function () {
        loadJuneCalendar();
        loadPage(5);
    });
    $(".month .prev").on("click", function () {
        loadMayCalendar();
        loadPage(4);
    });

});
function loadPage(sMonth) {
    console.log(events);
    var date = new Date();
    if(sMonth == "") {
        var month = date.getMonth();
    } else {
        var month = sMonth;
    }
    if(month == 4){
        loadMayCalendar();
    } else if (month == 5){
        loadJuneCalendar()
    }

    findUpcomingDeadlines(date.getDate(), month);
    if(monthDisplayed == date.getMonth()) {
        determineDate();
    }
    buildDeadlineAdder();
    $(".days li span").on("mouseover", function(){
        console.log("ys");
        var day = $(this).html();
        $(".hoverDateSelected").html(convertMonthToName(monthDisplayed) + " " + day);
        for(var i = 0; i < events.length; i++){
            if(events[i].eventMonth == monthDisplayed){
                day = parseInt(day);
                if(events[i].eventDay == day){
                    $(".hoverDateEvents").html(events[i].eventName);
                    $(".hoverDate").show();
                    console.log("event found");
                }
            }
        }
    });
    $(".days li span").on("mouseleave", function(){
        $(".hoverDate").hide();
    });
}
function pushDeadline() {
    var deadlineType = $("#selectDeadlineTypes").val();
    var deadlineName = $("#deadlineName").val();
    var deadlineDay = $("#selectDeadlineDay").val();
    var deadlineMonth = $("#selectDeadlineMonth").val();
    console.log(deadlineName);
    var x = true;
    // for(var i in events) {
    //     if($("#deadlineName") == events[i].eventName) {
    //         x = false;
    //     }
    // }
    if ($("#deadlineName").val() != "") {
        events.push(new event(deadlineType, deadlineName, deadlineDay, deadlineMonth));
        loadPage(monthDisplayed);
        findUpcomingDeadlines();
        $("#selectDeadlineMonth").val(deadlineMonth);
        $("#selectDeadlineDay").val(deadlineDay);
        $("#deadlineName").val(deadlineName);
        $("#selectDeadlineTypes").val(deadlineType);
    }
}

function daysInMonthz(month, year){
    return new Date(year, month, 0).getDate();
}

function findUpcomingDeadlines(){
    var date = new Date();
    var currentMonth = date.getMonth();
    var currentDay = date.getDate();
    $(".deadlines").html("<div id='deadlineTitle'>Upcoming Deadlines</div>  ");
    for(var i = currentDay; i < (currentDay + 7); i++){
        for(var t = 0; t < events.length; t++){
            if(events[t].eventMonth == currentMonth){
                if(events[t].eventDay == i){
                    console.log(events[t].eventName);
                    $(".deadlines").append("<p>"+ events[t].eventName +"<div class='deadlineDate'>" + convertMonthToName(currentMonth) + " " + events[t].eventDay + "</div></p>")
                }
            }
        }
    }
}
function buildDeadlineAdder(){
    var date = new Date();
    var month = date.getMonth();
    var daysInMonth = daysInMonthz(month, 2018);
    console.log(daysInMonth);
    $("#selectDeadlineDay").html("");
    for(var i = 1; i <= daysInMonth; i++){
        $("#selectDeadlineDay").append("<option value=" + i+ ">" + i + "</option>");
    }
}
function loadJuneCalendar(){
    monthDisplayed = 5;
    $(".selectedMonth").html("June<br><span style='font-size:18px'>2018</span>");
    $(".days").html(juneDays);
    $(".month .next").hide();
    $(".month .prev").show();
    $(".days li").css("margin-right", "4px");
    searchEvents();

}

function loadMayCalendar(){
    monthDisplayed = 4;
    $(".selectedMonth").html("May<br><span style='font-size:18px'>2018</span>");
    $(".days").html(mayDays);
    $(".month .prev").hide();
    $(".month .next").show();
    $(".days li").css("margin-right", "4px");
    determineDate();
    searchEvents();
}

function determineDate(){
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    if(month == monthDisplayed) {
        for (var i = 0; i <= 31; i++) {
            if ($(".days li:nth-child(" + i + ")").html() == day) {
                $(".days li:nth-child(" + i + ")").html("<span class='active'>" + (i - 4) + "</span>")
            }
        }
    }
}

function convertMonthToName(monthNumber){
    if(monthNumber == 4){
        return "May";
    }
    if(monthNumber == 5){
        return "June"
    }
}

function searchEvents(){
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    for(var i = 0; i < events.length; i++){
        if(monthDisplayed == events[i].eventMonth){
            for(var t = 0; t < 31; t++){
                if($(".days li:nth-child("+ t +")").html() == events[i].eventDay){
                    if(events[i].eventType == "deadline") {
                        $(".days li:nth-child(" + t + ")").html("<span class='deadline'>" + events[i].eventDay + "</span>")
                    }
                    if(events[i].eventType == "test"){
                        $(".days li:nth-child(" + t + ")").html("<span class='test'>" + events[i].eventDay + "</span>")
                    }
                    if(events[i].eventType == "group"){
                        $(".days li:nth-child(" + t + ")").html("<span class='group'>" + events[i].eventDay + "</span>")
                    }
                }
            }
        }
    }
}

//get user info!!!!
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}